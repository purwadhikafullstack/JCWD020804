import Property from '../models/property';
import Room from '../models/room';
import Transaction from '../models/transaction';

export const getAllData = async (req, res) => {
  try {
    const result = await Transaction.findAll();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const result = await Transaction.findOne({
      where: { id: req.params.id,
      UserId: req.user.id}, // Menambahkan kriteria pencarian berdasarkan ID Property
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
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};



export const createBooking = async (req, res) => {
  try {
    const { checkIn, checkOut, total_price, total_night, RoomId } = req.body;

    const booking = await Transaction.create({
      checkIn,
      checkOut,
      total_price,
      total_night,
      UserId: req.user.id,
      RoomId,
    });
    res.status(200).send({ id: booking.id, message: 'Booking success' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Error creating booking' });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { payment_method } = req.body;

    // Ensure that the transaction with the given ID exists and belongs to the corresponding user
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    // Determine whether the status should be updated based on the payment_method value
    let updatedStatus = transaction.status;

    if (payment_method === 'otomatis') {
      updatedStatus = 'pembayaran berhasil';
    } else if (payment_method === 'bank transfer') {
      updatedStatus = 'menunggu pembayaran';
    }

    // Add this before the update operation
    console.log('Payment Method:', payment_method);
    console.log('Status:', updatedStatus);

    // Update the transaction with payment information and status
    await transaction.update({
      payment_method,
      status: updatedStatus,
    });

    // Set a timer for 1 hour to check and update the status if needed
    setTimeout(async () => {
      const updatedTransaction = await Transaction.findOne({
        where: { id: transaction.id, status: 'menunggu pembayaran' },
      });

      if (updatedTransaction) {
        // Update status to 'transaksi dibatalkan' if it's still 'menunggu pembayaran'
        await Transaction.update({ status: 'transaksi dibatalkan' }, { where: { id: transaction.id } });
        console.log(`Payment for Transaction ID ${transaction.id} canceled after 1 hour.`);
      }
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    res.status(200).send({ message: 'Payment success' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Error processing payment' });
  }
};


export const UploadPayment = async (req, res) => {
  try {
    const payment = await Transaction.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });
    await payment.update({
      status: req.body.status || 'menunggu konfirmasi',
      bukti_pembayaran: req.file?.path,
    });
    res.status(200).send('success upload payment');
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Error upload payment' });
  }
};

export const CancelBooking = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    })
    await transaction.update({
      status: 'transaksi dibatalkan',
    });
    res.status(200).send('success cancel booking');
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Error cancel booking' })
  }
}