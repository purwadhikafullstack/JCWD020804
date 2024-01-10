import Transaction from '../models/transaction';

export const getAllData = async () => {
  return await Transaction.findAll();
};

export const getDataById = async () => {
  return { name: 'data' };
};

export const createTransaction = async (
  checkinDate,
  checkoutDate,
  totalPrice,
) => {
  try {
    const expiredTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // Contoh: Expired dalam 2 jam
    const booking = await Transaction.create({
      checkinDate,
      checkoutDate,
      totalPrice,
      status: 'menunggu pembayaran',
      expiredTime,
      userId,
      roomId,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating booking');
  }
};
