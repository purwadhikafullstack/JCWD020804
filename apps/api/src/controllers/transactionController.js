import Property from '../models/property';
import Room from '../models/room';
import Transaction from '../models/transaction';
import User from '../models/user';

export const getTransactionByTenant = async (req, res) => {
  try {
    const result = await Transaction.findAll({
      include: [
        {model: User},
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
    });
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};
export const getTransactionByUser = async (req, res) => {
  try {
    const result = await Transaction.findAll({
      where: { UserId: req.user.id},
      include: [
        {
          model: Room,
          include: [
            {
              model: Property,
            },
          ],
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
        { status: 'pembayaran berhasil'},
        { where: { id } }
      );
      res.status(200).send({message: 'pembayaran diterima'});
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  };

  export const rejectTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
      await Transaction.update(
        { status: 'transaksi dibatalkan'},
        { where: { id } }
      );
      res.status(200).send({message: 'transaksi dibatalkan'});
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  };
