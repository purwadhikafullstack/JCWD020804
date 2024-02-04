import Property from '../models/property';
import Room from '../models/room';
import Property_category from '../models/property_category';
import Location from '../models/location';

export const getAllProperty = async (req, res) => {
  try {
    const result = await Property.findAll({
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

export const getAllPropertyTenant = async (req, res) => {
  console.log(req.user.id, 'ini user');
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

export const getPropertyById = async (req, res) => {
  try {
    const result = await Property.findOne({
      where: { id: req.params.id }, // Menambahkan kriteria pencarian berdasarkan ID Property
      include: [
        {
          model: Room,
          where: { PropertyId: req.params.id }, // Menambahkan kriteria pencarian berdasarkan ID Property
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

//menambah location
export const addLocation = async (req, res) => {
  try {
    const { city, province } = req.body;

    // Cek apakah lokasi sudah ada
    // const existingLocation = await Location.findOne({ where: { city} });
    // if (existingLocation) {
    //   return res.status(400).json({ message: 'Location already exists' });
    // }

    // Tambah lokasi baru
    const newLocation = await Location.create({ city, province });

    return res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//menambah categorye
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Cek apakah kategori sudah ada
    const existingCategory = await Property_category.findOne({
      where: { name },
    });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Tambah kategori baru
    const newCategory = await Property_category.create({ name });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk menambah properti
export const addProperty = async (req, res) => {
  try {
    const { name, description, city, province, Categories, picture } = req.body;
    console.log(req.body, 'ini body');

    const newLocation = await Location.create({ city, province });
    console.log(newLocation);

    let category = await Property_category.findOne({ where: { Categories } });
    if (!category) {
      category = await Property_category.create({ Categories });
    }

    const property = await Property.create({
      name,
      description,
      picture: req.file?.path,
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

export const getProperty = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      propertyName,
      category,
    } = req.query;

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

    const orderOptions = [[sortBy, sortOrder.toUpperCase()]];

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
        picture: req.file?.path,
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

    console.log(`Menghapus properti dengan ID: ${propertyId}`);

    await Property.destroy({
      where: { id: propertyId },
    });

    res.status(200).send('Properti dan kamar yang terkait berhasil dihapus');
  } catch (err) {
    console.error(err);
    res.status(400).send({ err: err.message });
  }
};
