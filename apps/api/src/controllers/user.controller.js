import fs from 'fs';
import handlebars from 'handlebars';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { transporter } from '../middleware/transporter';
import path from 'path';

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const isEmailExist = await User.findOne({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      return res.status(400).send('Email has been used');
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

    const data = fs.readFileSync(
      path.join(__dirname, '../../web/verifiedakun.html'),
      'utf-8',
    );
    const tempCompile = handlebars.compile(data);
    const tempResult = tempCompile({
      createdAt: newUser.createdAt,
      name: newUser.name,
      username: username,
      link: `${process.env.VITE_BE_URL}verify/${newUser.id}`,
    });

    await transporter.sendMail({
      from: 'masn40208@gmail.com',
      to: email,
      subject: 'Email Confirmation',
      html: tempResult,
    });

    return res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

export const login = async (req) => {
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

export const verify = async (req, res) => {
  try {
    const { isVerified } = req.body;
    const result = await User.update(
      { isVerified },
      { where: { id: req.params.id } },
    );

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

export const becomeTenant = async (req, res) => {
  try {
    const { no_ktp } = req.body;

    await User.update(
      {
        isTenant: true,
        no_ktp,
        foto_ktp: req.file?.filename,
      },
      {
        where: {
          id: req.user.id,
        },
      },
    );

    res.status(200).send({ message: 'success' });
  } catch (error) {
    res.status(500).send('NO!');
  }
};

export const userRegisterWithGoogle = async (req, res) => {
  try {
    const { googleUserData } = req.body;

    const findUser = await User.findOne({
      where: {
        firebaseUID: googleUserData?.uid,
      },
    });

    if (findUser == null) {
      const result = await User.create({
        name: googleUserData.displayName.split(' ')[0] || '',
        username: googleUserData.displayName.split(' ')[1] || '',
        email: googleUserData.email,
        picture: googleUserData.photoURL,

        firebaseUID: googleUserData.uid,

        isVerified: true,
      });

      let payload = { id: result.id };

      const token = jwt.sign(payload, 'LogIn', { expiresIn: `1h` });

      return res.status(200).send({
        message: 'Successfully registering new user with Google Account',
        result: result,
        token,
      });
    } else {
      let payload = { id: findUser.id };
      const token = jwt.sign(payload, 'LogIn', { expiresIn: `1h` });

      return res.status(200).send({
        message: 'Success Signing in with Google Account',
        result: findUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, username, link } = req.body;

    const data = fs.readFileSync('./web/resetpassword.html', 'utf-8');
    const tempCompile = await handlebars.compile(data);

    const tempResult = tempCompile({
      createdAt: new Date(),
      email: email,
      username: username,
      link: link,
    });

    await transporter.sendMail({
      from: 'masn40208@gmail.com',
      to: email,
      subject: 'Email Confirmation',
      html: tempResult,
    });
    res.status(200).send({ message: 'Email has been send' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};
export const updateUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          email: email,
        },
      },
    );
    res.status(200).send('Profile22');
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, username } = req.body;
    const isVerified = req.body.email ? false : true;
    
    let file = null;
    if (req?.file) {
      const fileName = req?.file?.filename;
      const URL = process.env.VITE_IMAGE_URL;
      file = `${URL}/${fileName}`;
    }
    await User.update(
      {
        name,
        username,
        picture: file,
        isVerified: isVerified,
      },

      {
        where: {
          id: req.user.id,
        },
      },
    );

    res.status(200).send('Profile');
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
};

export const editEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isVerified = email ? false : true;

    await User.update(
      {
        email,
        isVerified: isVerified,
      },

      {
        where: {
          id: req.user.id,
        },
      },
    );

    const data = fs.readFileSync(
      path.join(__dirname, '../../web/verifiedakun.html'),
      'utf-8',
    );
    const tempCompile = handlebars.compile(data);
    const tempResult = tempCompile({
      name: user.name,
      username: user.username,
      link: `${process.env.VITE_BE_URL}verify/${user.id}`,
    });

    await transporter.sendMail({
      from: 'masn40208@gmail.com',
      to: email,
      subject: 'Email Confirmation',
      html: tempResult,
    });

    res.status(200).send('Email updated successfully');
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};
