import Property from '../models/property';
import Room from '../models/room';
import Transaction from '../models/transaction';
import User from '../models/user';
import Review from '../models/review';
import { Op } from 'sequelize';

// Update your backend controller:

export const getTransactionByTenant = async (req, res) => {
  try {
    const { statusFilter } = req.query;
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

    const result = await Transaction.findAll({
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
    });

    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

//user dashboard

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
        startDate.setHours(0, 0, 0, 0); // Set jam ke awal hari
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999); // Set jam ke akhir hari

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
          model: Review, // Tambahkan relasi dengan model Review
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
  console.log(req.body);
  try {
    const result = await Review.create({
      rating,
      user_review: comment,
      UserId: req.user.id,
      TransactionId,
      PropertyId,
    });
    res.status(200).send( result );
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};