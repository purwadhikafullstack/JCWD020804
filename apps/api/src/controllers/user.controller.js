// Import library yang dibutuhkan
import fs from 'fs';
import handlebars from 'handlebars';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Pengaturan transporter untuk nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Ganti dengan email Anda
    pass: 'your-password', // Ganti dengan kata sandi email Anda
  },
});

export const createUser = async (req) => {
  try {
    const { name, username, email, password } = req.body;
    const isEmailExist = await User.findOne({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      return 'Email has been used';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      isTenant: false,
      isVerified: false,
    });

    // Ubah path file verifiedakun.html sesuai dengan struktur proyek Anda
    const data = fs.readFileSync('./path/to/verifiedakun.html', 'utf-8');
    const tempCompile = handlebars.compile(data);
    const tempResult = tempCompile({
      createdAt: newUser.createdAt,
      name: newUser.name,
      username: username,
      link: `http://localhost:3000/verify/${newUser.id}`,
    });

    // Konfigurasi email yang akan dikirim
    await transporter.sendMail({
      from: 'amanhidayat39@gmail.com',
      to: email,
      subject: 'Email Confirmation',
      html: tempResult,
    });

    return { result: newUser };
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

export const login = async (req, res) => {
  try {
    let isUserExist;

    const { email, password } = req.body;

    isUserExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isUserExist) {
      return { error: 'Email not found', status: 'er', code: 400 };
    }

    const passwordMatch = await bcrypt.compare(password, isUserExist.password);

    if (!passwordMatch) {
      return { error: 'Wrong Password', status: 'er', code: 400 };
    }

    // Buat token JWT
    const payload = { id: isUserExist.id };
    const token = jwt.sign(payload, 'LogIn');

    return {
      message: 'Logged in successfully',
      result: isUserExist,
      token,
    };
  } catch (error) {
    console.error('error', error);
    return { error: 'Internal Server Error', status: 'er', code: 500 };
  }
};

export const keepLogin = async (req, res) => {
  try {
    const result = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Internal Server Error' });
  }
};
