import Property from '../models/property';
import Room from '../models/room';


export const getAllRoomByProperty = async (req, res) => {
  try {
    const { propertyName } = req.query;

    const whereCondition = {};
    if (propertyName) {
      whereCondition.name = propertyName;
    }

    const result = await Property.findAll({
      where: {
        UserId: req.user.id,
        ...whereCondition,
      },
      include: [
        {
          model: Room,
        },
      ],
    });

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Gagal mendapatkan data' });
  }
};

export const addRoom = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let file = null;
    if (req?.file) {
      const fileName = req?.file?.filename;
      const URL = process.env.VITE_IMAGE_URL;

      file = `${URL}${fileName}`;
    }
    const result = await Room.create({
      name,
      description,
      picture: file,
      PropertyId: req.params.id,
      price,
    });

    return res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteRoom = async (req, res) => {
    try {
      const roomId = req.params.id;
  
      await Room.destroy({
        where: { id: roomId },
      });
  
      res.status(200).send('kamar yang terkait berhasil dihapus');
    } catch (err) {
      console.error(err);
      res.status(400).send({ err: err.message });
    }
  };

export const editRoom = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    await Room.update(
      {
        name,
        description,
        price,
      },

      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.status(200).send('Room has been update');
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
};
