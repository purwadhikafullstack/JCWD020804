import Property from '../models/property';
import Room from '../models/room';
import Property_category from '../models/property_category';
import Location from '../models/location';


export const getAllProperty = async (req, res) => {
  try {
    const result = await Property.findAll();
    res.status(200).send({ result });
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
    const { city } = req.body;

    // Cek apakah lokasi sudah ada
    const existingLocation = await Location.findOne({ where: { city } });
    if (existingLocation) {
      return res.status(400).json({ message: 'Location already exists' });
    }

    // Tambah lokasi baru
    const newLocation = await Location.create({ city });
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
    const existingCategory = await Property_category.findOne({ where: { name } });
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
    const { name, description, price, categoryName, locationName, userId } = req.body;

    // Pastikan user sudah ada di database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Buat kategori jika belum ada
    let category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      category = await Category.create({ name: categoryName });
    }

    // Buat lokasi jika belum ada
    let location = await Location.findOne({ where: { name: locationName } });
    if (!location) {
      location = await Location.create({ name: locationName });
    }

    // Tambah properti dengan relasi ke kategori, lokasi, dan user
    const property = await Property.create({
      name,
      description,
      price,
      categoryId: category.id,
      locationId: location.id,
      userId: req.user.id,
    });

    return res.status(201).json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
