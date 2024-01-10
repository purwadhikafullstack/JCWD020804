import Property from '../models/property';
import Room from '../models/room';

export const getAllProperty = async (req, res) => {
  try {
    const result = await Property.findAll();
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
};

export const getProperty = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, sortBy = 'name', sortOrder = 'asc', propertyName, category } = req.query;

    const filterOptions = {
      where: {
        isRented: false,
      },
    };

    if (propertyName) {
      filterOptions.where.name = {
        [Op.iLike]: `%${propertyName}%`,
      };
    }

    if (category) {
      filterOptions.where.category = {
        [Op.iLike]: `%${category}%`,
      };
    }

    const orderOptions = [
      [sortBy, sortOrder.toUpperCase()],
    ];

    const result = await Property.findAndCountAll({
      ...filterOptions,
      order: orderOptions,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(result.count / pageSize);

    res.status(200).send({
      result: result.rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'gagal mendapatkan data' });
  }
}; 

export const getPropertyById = async (req, res) => {
  try {
    const result = await Property.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Room,
          where: { PropertyId: req.params.id },
        },
      ],
    });

    res.status(200).send({ result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

export const createSampleData = async () => {
  console.log('Successfully create new sample data');
};
