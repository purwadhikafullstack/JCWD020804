import Property from '../models/property';
import Room from '../models/room';
import Transaction from '../models/transaction';
import User from '../models/user';
import Review from '../models/review';
import { Op } from 'sequelize';
import fs from 'fs';
import transporter from '../middleware/transporter';
import handlebars from 'handlebars';
import { createPDF } from '../document/detailOrder';
import { Sequelize } from 'sequelize';
import path from 'path';

export const getTransactionByTenant = async (req, res) => {
  try {
    const { statusFilter, page = 1, limit = 10 } = req.query;
    let whereClause = {};

    if (statusFilter) {
      switch (statusFilter) {
        case 'onProcess':
          whereClause = {
            status: { [Op.in]: ['menunggu pembayaran', 'menunggu konfirmasi'] },
          };
          break;
        case 'onGoing':
          whereClause = {
            status: 'pembayaran berhasil',
            checkIn: { [Op.gt]: new Date() },
          };
          break;
        case 'cancel':
          whereClause = { status: 'transaksi dibatalkan' };
          break;
        default:
          break;
      }
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Transaction.findAndCountAll({
      include: [
        { model: User },
        {
          model: Room,
          include: [
            {
              model: Property,
              where: { userId: req.user.id },
            },
          ],
        },
      ],
      where: whereClause,
      limit: parseInt(limit),
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).send({
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalItems: count,
      items: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

export const getTransactionByUser = async (req, res) => {
  try {
    const { status, search, date } = req.query;
    let whereClause = { UserId: req.user.id };

    if (status) {
      if (status === 'ongoing') {
        whereClause = {
          ...whereClause,
          status: 'Pembayaran Berhasil',
          checkIn: { [Op.gt]: new Date() },
        };
      } else if (status === 'completed') {
        whereClause = {
          ...whereClause,
          status: 'Pembayaran Berhasil',
          checkIn: { [Op.lte]: new Date() },
        };
      }
    }

    if (search || date) {
      whereClause[Op.or] = [];

      if (search) {
        whereClause[Op.or].push({
          id: {
            [Op.like]: `%${search}%`,
          },
        });
      }

      if (date) {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        whereClause[Op.or].push({
          checkIn: {
            [Op.between]: [startDate, endDate],
          },
        });
      }
    }

    const result = await Transaction.findAll({
      where: whereClause,
      include: [
        {
          model: Room,
          include: [
            {
              model: Property,
              include: [
                {
                  model: User,
                },
              ],
            },
          ],
        },
        {
          model: Review,
        },
      ],
    });

    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

export const approveTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.update(
      { status: 'pembayaran berhasil' },
      { where: { id } },
    );
    const transaction = await Transaction.findOne({
      where: { id },
      include: [
        {
          model: Room,
          include: [
            {
              model: Property,
            },
          ],
        },
        {
          model: User,
        },
      ],
    });
    const pdfFilename = 'BookingConfirmation.pdf';
    createPDF(pdfFilename, transaction);

    const data = fs.readFileSync(
      path.join(__dirname, '../../web/bookingDetail.html'),
      'utf-8',
    );
    const tempCompile = handlebars.compile(data);
    const tempResult = tempCompile({
      name: transaction.User.name,
      Hotel: transaction.Room.Property.name,
      CheckIn: transaction.checkIn,
      Room: transaction.Room.name,
    });

    await transporter.sendMail({
      from: 'masn40208@gmail.com',
      to: transaction.User.email,
      subject: 'Booking Information',
      html: tempResult,
      attachments: [
        {
          filename: pdfFilename,
          path: `./${pdfFilename}`,
          contentType: 'application/pdf',
        },
      ],
    });
    res.status(200).send({ message: 'pembayaran diterima' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const rejectTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.update(
      { status: 'menunggu pembayaran' },
      { where: { id } },
    );
    res.status(200).send({ message: 'menunggu pembayaran' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const cancelTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.update(
      { status: 'transaksi dibatalkan' },
      { where: { id } },
    );
    res.status(200).send({ message: 'transaksi dibatalkan' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const ratingUser = async (req, res) => {
  const { rating, comment, TransactionId, PropertyId } = req.body;
  
  try {
    const result = await Review.create({
      rating,
      user_review: comment,
      UserId: req.user.id,
      TransactionId,
      PropertyId,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const ratingReplyTenant = async (req, res) => {
  const { replyContent, reviewId } = req.body;

  if (!replyContent || !reviewId) {
    return res
      .status(400)
      .send({ message: 'Missing reply content or review ID.' });
  }

  try {
    const review = await Review.findOne({ where: { id: reviewId } });

    if (!review) {
      return res.status(404).send({ message: 'Review not found.' });
    }

    await Review.update(
      { tenant_reply: replyContent },
      { where: { id: reviewId } },
    );

    const updatedReview = await Review.findOne({ where: { id: reviewId } });

    res.status(200).send(updatedReview);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: 'An error occurred while updating the review reply.' });
  }
};

export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, page = 1 } = req.query;

    const limit = 7;
    const offset = (page - 1) * limit;

    const whereCondition = {};
    if (startDate && endDate) {
      whereCondition.checkIn = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const { count, rows } = await Transaction.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Room,
          include: [
            {
              model: Property,
              where: { userId: req.user.id },
              attributes: ['name'],
              include: [{ model: User, attributes: ['name'] }],
            },
          ],
          attributes: ['name', 'price'],
        },
      ],
      where: whereCondition,
      limit,
      offset,
      distinct: true,
    });

    const totalRevenue = await Transaction.sum('total_price', {
      where: whereCondition,
      include: [
        {
          model: Room,
          include: [
            {
              model: Property,
              where: { userId: req.user.id },
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    });

    res.status(200).json({
      transactions: rows,
      totalRevenue,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching sales report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRoomReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const rooms = await Room.findAll({
      include: [
        {
          model: Property,
          where: { UserId: userId },
          include: [
            {
              model: User,
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'name',
        [
          Sequelize.fn('COUNT', Sequelize.col('Transactions.id')),
          'total_stays',
        ],
        [
          Sequelize.fn('SUM', Sequelize.col('Transactions.total_price')),
          'total_revenue',
        ],
      ],
      group: ['Room.id'],
      includeIgnoreAttributes: false,
      subQuery: false,
      include: [
        {
          model: Transaction,
          attributes: [],
          where: {
            status: 'pembayaran berhasil',
          },
        },
      ],
    });

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching room report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
