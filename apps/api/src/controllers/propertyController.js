import Property from '../models/property';
import Review from '../models/review';
import Room from '../models/room';
import User from '../models/user';
import Property_category from '../models/property_category';
import Location from '../models/location';
import Transaction from '../models/transaction';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

export const getPropertyById = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    const propertyId = req.params.id;

    const result = await Property.findOne({
      where: { id: propertyId },
      include: [
        {
          model: Room,
          include: [
            {
              model: Transaction,

              where: {
                [Op.or]: [
                  {
                    checkIn: {
                      [Op.between]: [new Date(checkIn), new Date(checkOut)],
                    },
                  },
                  {
                    checkOut: {
                      [Op.between]: [new Date(checkIn), new Date(checkOut)],
                    },
                  },
                ],
              },
              required: false,
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
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

export const getReviewProperty = async (req, res) => {
  try {
    const { propertyName } = req.query;

    const whereCondition = {};
    if (propertyName) {
      whereCondition.name = propertyName;
    }

    const result = await Property.findAll({
      where: {
        userId: req.user.id,
        ...whereCondition,
      },
      include: [{ model: Review, include: [{ model: User }] }],
    });
    res.status(200).send({ result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

export const getAllProperty = async (req, res) => {
  try {
    const { category, query } = req.query;

    let whereCondition = {};
    let categoryCondition = {};

    if (query) {
      whereCondition = {
        ...whereCondition,
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Property.name')),
            'LIKE',
            `%${query.toLowerCase()}%`,
          ),
        ],
      };
    }

    if (category) {
      categoryCondition = {
        model: Property_category,
        where: { categories: category },
      };
    } else {
      categoryCondition = {
        model: Property_category,
      };
    }

    const queryOptions = {
      where: whereCondition,
      include: [
        { model: Location },
        { model: Room },
        { model: Review },
        categoryCondition,
      ],
    };

    const result = await Property.findAll(queryOptions);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

export const getAllPropertyTenant = async (req, res) => {
  try {
    const result = await Property.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: Location,
        },
        {
          model: Property_category,
        },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

export const addProperty = async (req, res) => {
  try {
    const { name, description, city, province, Categories, } = req.body;

    const newLocation = await Location.create({ city, province });
    
    let category = await Property_category.findOne({ where: { Categories } });
    if (!category) {
      category = await Property_category.create({ Categories });
    }

    const property = await Property.create({
      name,
      description,
      picture: req.file?.filename,
      PropertyCategoryId: category.id,
      LocationId: newLocation.id,
      UserId: req.user.id,
    });

    return res.status(201).json(property);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};


export const editProperty = async (req, res) => {
  try {
    const { name, description, city, province, Categories, picture } = req.body;

    const newLocation = await Location.create({ city, province });

    let category = await Property_category.findOne({ where: { Categories } });
    if (!category) {
      category = await Property_category.create({ Categories });
    }

    await Property.update(
      {
        name,
        description,
        picture: req.file?.filename,
        PropertyCategoryId: category.id,
        LocationId: newLocation.id,
      },

      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.status(200).send('Property');
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    await Property.destroy({
      where: { id: propertyId },
    });

    res.status(200).send('Properti dan kamar yang terkait berhasil dihapus');
  } catch (err) {
    console.error(err);
    res.status(400).send({ err: err.message });
  }
};
