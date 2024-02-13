import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../helper/api';

const AddHotelForm = ({ addHotel }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');

  const daerah = [
    {
      id: 1,
      nama: 'Aceh',
      kota: [
        'Kabupaten Aceh Barat',
        'Kabupaten Aceh Barat Daya',
        'Kabupaten Aceh Besar',
        'Kabupaten Aceh Jaya',
        'Kabupaten Aceh Selatan',
        'Kabupaten Aceh Singkil',
        'Kabupaten Aceh Tamiang',
        'Kabupaten Aceh Tengah',
        'Kabupaten Aceh Tenggara',
        'Kabupaten Aceh Timur',
        'Kabupaten Aceh Utara',
        'Kabupaten Aceh Meriah',
        'Kabupaten Bireuen',
        'Kabupaten Gayo Lues',
        'Kabupaten Nagan Raya',
        'Kabupaten Pidie',
        'Kabupaten Pidie Jaya',
        'Kabupaten Simuelue',
        'Kota Banda Aceh',
        'Kota Langsa',
        'Kota Lhokseumawe',
        'Kota Sabang',
        'Kota Subulussalam',
      ],
    },
    {
      id: 2,
      nama: 'Sumatera Utara',
      kota: [
        'Kabupaten Asahan',
        'Kabupaten Batu Bara',
        'Kabupaten Dairi',
        'Kabupaten Deli Serdang',
        'Kabupaten Humbang Hasundutan',
        'Kabupaten Karo',
        'Kabupaten Labuhanbatu',
        'Kabupaten Labuanbatu Selatan',
        'Kabupaten Labuhanbatu Utara',
        'Kabupaten Langkat',
        'Kabupaten Mandailing Natal',
        'Kabupaten Nias',
        'Kabupaten Nias Barat',
        'Kabupaten Nias Selatan',
        'Kabupaten Nias Utara',
        'Kabupaten Padang Lawas',
        'Kabupaten Padang Lawas Utara',
        'Kabupaten Pakpak Bharat',
        'Kabupaten Samosir',
        'Kabupaten Serdang Bedagai',
        'Kabupaten Simalungun',
        'Kabupaten Tapanuli Selatan',
        'Kabupaten Tapanuli Tengah',
        'Kabupaten Tapanuli Utara',
        'Kabupaten Toba',
        'Kabupaten Binjai',
        'Kota Binjai',
        'Kota Gunungsitoli',
        'Kota Medan',
        'Kota Padangsidimpuan',
        'Kota Pematangsiantar',
        'Kota Sibolga',
        'Kota Sibolga',
        'Kota Tanjungbalai',
        'Kota Tebing Tinggi',
      ],
    },
    {
      id: 3,
      nama: 'Sumatera Barat',
      kota: [
        'Kabupaten Agam',
        'Kabupaten Dharmasraya',
        'Kabupaten Kepulauan Mentawai',
        'Kabupaten Lima Puluh Kota',
        'Kabupaten Padang Pariaman',
        'Kabupaten Pasaman',
        'Kabupaten Pasaman Barat',
        'Kabupaten Pesisir Selatan',
        'Kabupaten Sijunjung',
        'Kabupaten Solok',
        'Kabupaten Solok Selatan',
        'Kabupaten Tanah Datar',
        'Kota Bukittinggi',
        'Kota Padang',
        'Kota Padang Panjang',
        'Kota Pariaman',
        'Kota Payakumbuh',
        'Kota Sawahlunto',
        'Kota Solok',
      ],
    },
    {
      id: 4,
      nama: 'Riau',
      kota: [
        'Kabupaten Bengkalis',
        'Kabupaten Indragiri Hilir',
        'Kabupaten Indragiri Hulu',
        'Kabupaten Kampar',
        'Kabupaten Kepulauan Meranti',
        'Kabupaten Kuantan Singingi',
        'Kabupaten Pelalawan',
        'Kabupaten Rokan Hilir',
        'Kabupaten Rokan Hulu',
        'Kabupaten Siak',
        'Kota Dumai',
        'Kota Pekanbaru',
      ],
    },
    {
      id: 5,
      nama: 'Kepulauan Riau',
      kota: [
        'Kabupaten Bintan',
        'Kabupaten Karimun',
        'Kabupaten Kepulauan Anambas',
        'Kabupaten Lingga',
        'Kabupaten Natuna',
        'Kabupaten Batam',
        'Kota Batam',
        'Kota Tanjungpinang',
      ],
    },
    {
      id: 6,
      nama: 'Jambi',
      kota: [
        'Kabupaten Batanghari',
        'Kabupaten Bungo',
        'Kabupaten Kerinci',
        'Kabupaten Merangin',
        'Kabupaten Muaro Jambi',
        'Kabupaten Sarolangun',
        'Kabupaten Tanjung Jabung Barat',
        'Kabupaten Tanjung Jabung Timur',
        'Kabupaten Tebo',
        'Kota Jambi',
        'Kota Sungai Penuh',
      ],
    },
    {
      id: 7,
      nama: 'Bengkulu',
      kota: [
        'Kabupaten Bengkulu Selatan',
        'Kabupaten Bengkulu Tengah',
        'Kabupaten Bengkulu Utara',
        'Kabupaten Kaur',
        'Kabupaten Kepahiang',
        'Kabupaten Lebong',
        'Kabupaten Mukomuko',
        'Kabupaten Rejang Lebong',
        'Kabupaten Seluma',
        'Kota Bengkulu',
      ],
    },

    {
      id: 8,
      nama: 'Sumatera Selatan',
      kota: [
        'Kabupaten Banyuasin',
        'Kabupaten Empang Lawang',
        'Kabupaten Lahat',
        'Kabupaten Muara Enim',
        'Kabupaten Musi Banyuasin',
        'Kabupaten Musi Rawas',
        'Kabupaten Musi Rawas Utara',
        'Kabupaten Ogan Ilir',
        'Kabupaten Ogan Komering Ulu',
        'Kabupaten Ogan Komering Ulu',
        'Kabupaten Ogan Komering Ulu Timur',
        'Kabupaten Ogan Komering Ulu Selatan',
        'Kabupaten Penukal Abab Lematang Ilir',
        'Kota Lubuk Linggau',
        'Kota Pagaralam',
        'Kota Palembang',
        'Kota Prabumulih',
      ],
    },
    {
      id: 9,
      nama: 'Lampung',
      kota: [
        'Kabupaten Lampung Barat',
        'Kabupaten Lampung Selatan',
        'Kabupaten Lampung Tengah',
        'Kabupaten Lampung Timur',
        'Kabupaten Lampung Utara',
        'Kabupaten Mesuji',
        'Kabupaten Pesawaran',
        'Kabupaten Pesisir Barat',
        'Kabupaten Pringsewu',
        'Kabupaten Tanggamus',
        'Kabupaten Tulang Bawang',
        'Kabupaten Tulang Bawang Barat',
        'Kabupaten Way Kanan',
        'Kota Bandar Lampung',
        'Kota Metro',
      ],
    },
    {
      id: 10,
      nama: 'Kepulauan Bangka Belitung',
      kota: [
        'Kabupaten Bangka',
        'Kabupaten Bangka Barat',
        'Kabupaten Bangka Selatan',
        'Kabupaten Bangka Tengah',
        'Kabupaten Belitung',
        'Kabupaten Belitung Timur',
        'Kota Pangkalpinang',
      ],
    },
    {
      id: 11,
      nama: 'Banten',
      kota: [
        'Kabupaten Lebak',
        'Kabupaten Padeglang',
        'Kabupaten Serang',
        'Kabupaten Tanggerang',
        'Kota Cilegon',
        'Kota Serang',
        'Kota Tanggerang',
        'Kota Tanggerang Selatan',
      ],
    },
    {
      id: 12,
      nama: 'Jawa Barat',
      kota: [
        'Kabupaten Bandung',
        'Kabupaten Bandung Barat',
        'Kabupaten Bekasi',
        'Kabupaten Bogor',
        'Kabupaten Ciamis',
        'Kabupaten Cianjur',
        'Kabupaten Cirebon',
        'Kabupaten Garut',
        'Kabupaten Indramayu',
        'Kabupaten Karawang',
        'Kabupaten Kuningan',
        'Kabupaten Majalengka',
        'Kabupaten Pengandaran',
        'Kabupaten Purwakarta',
        'Kabupaten Subang',
        'Kabupaten Sukabumi',
        'Kabupaten Sumedang',
        'Kabupaten Tasikmalaya',
        'Kota Bandung',
        'Kota Banjar',
        'Kota Bekasi',
        'Kota Bogor',
        'Kota Cimahi',
        'Kota Cirebon',
        'Kota Depok',
        'Kota Sukabumi',
        'Kota Tasikmalaya',
      ],
    },
    {
      id: 13,
      nama: 'Jawa Tengah',
      kota: [
        'Kabupaten Banjarnegara',
        'Kabupaten Banyumas',
        'Kabupaten Batang',
        'Kabupaten Blora',
        'Kabupaten Boyolali',
        'Kabupaten Boyolali',
        'Kabupaten Brebes',
        'Kabupaten Cilacap',
        'Kabupaten Demak',
        'Kabupaten Grobogan',
        'Kabupaten Jepara',
        'Kabupaten Karanganyar',
        'Kabupaten Kendal ',
        'Kabupaten Klaten',
        'Kabupaten Kudus',
        'Kabupaten Magelang',
        'Kabupaten Pati',
        'Kabupaten Pekalongan',
        'Kabupaten Pemalang',
        'Kabupaten Purbalingga',
        'Kabupaten Purworejo',
        'Kabupaten Rembang',
        'Kabupaten Semarang',
        'Kabupaten Sragen',
        'Kabupaten Sukoharjo',
        'Kabupaten Tegal',
        'Kabupaten Temanggung',
        'Kabupaten Wonogiri',
        'Kabupaten Wonosobo',
        'Kota Salatiga',
        'Kota Semarang',
        'Kota Surakarta',
        'Kota Tegal',
      ],
    },
    {
      id: 14,
      nama: 'D.I Yogyakarta',
      kota: [
        'Kabupaten Bantul',
        'Kabupaten Gunungkidul',
        'Kabupaten Kulon Progo',
        'Kabupaten Sleman',
        'Kota Yogyakarta',
      ],
    },
    {
      id: 15,
      nama: 'Jawa Timur',
      kota: [
        'Kabupaten Bangkalan',
        'Kabupaten Banyuwangi',
        'Kabupaten Blitar',
        'Kabupaten Bojonegoro',
        'Kabupaten Bondowoso',
        'Kabupaten Gresik',
        'Kabupaten Jember',
        'Kabupaten Jombang',
        'Kabupaten Kediri',
        'Kabupaten Lamongan',
        'Kabupaten Lumajang',
        'Kabupaten Madiun',
        'Kabupaten Magelan',
        'Kabupaten Malang',
        'Kabupaten Mojokerto',
        'Kabupaten Nganjuk',
        'Kabupaten Pacitan',
        'Kabupaten Pamekasan',
        'Kabupaten Pasuruan',
        'Kabupaten Ponorogo',
        'Kabupaten Probolinggo',
        'Kabupaten Sampang',
        'Kabupaten Sidoarjo',
        'Kabupaten Situbondo',
        'Kabupaten Sumenep',
        'Kabupaten Trenggalek',
        'Kabupaten Tuban',
        'Kabupaten Tulungagung',
        'Kota Blitar',
        'Kota Kediri',
        'Kota Madiun',
        'Kota Malang',
        'Kota Mojokerto',
        'Kota Pasuruan',
        'Kota Probolinggo',
        'Kota Surabaya',
      ],
    },
    {
      id: 16,
      nama: 'Bali',
      kota: [
        'Kabupaten Badung',
        'Kabupaten Bangli',
        'Kabupaten Buleleng',
        'Kabupaten Gianyar',
        'Kabupaten Jembrana',
        'Kabupaten Karangasem',
        'Kabupaten Klungkung',
        'Kabupaten Tabanan',
        'Kota Denpasar',
      ],
    },
    {
      id: 17,
      nama: 'NTB',
      kota: [
        'Kabupaten Bima',
        'Kabupaten Dompu',
        'Kabupaten Lombok Barat',
        'Kabupaten Lombok Tengah',
        'Kabupaten Lombok Timur',
        'Kabupaten Lombok Utara',
        'Kabupaten Sumbawa',
        'Kabupaten Sumbawa Barat',
        'Kota Bima',
        'Kota Mataram',
      ],
    },
    {
      id: 18,
      nama: 'NTT',
      kota: [
        'Kabupaten Alor',
        'Kabupaten Belu',
        'Kabupaten Flores Timur',
        'Kabupaten Kupang',
        'Kabupaten Lembata',
        'Kabupaten Malaka',
        'Kabupaten Manggarai',
        'Kabupaten Manggarai Timur',
        'Kabupaten Nagekeo',
        'Kabupaten Ngada',
        'Kabupaten Sabu Raijua',
        'Kabupaten Sikka',
        'Kabupaten Sumba Barat',
        'Kabupaten Sumba Barat Daya',
        'Kabupaten Sumba Tengah',
        'Kabupaten Sumba Timur',
        'Kabupaten Sumba Timor Tengah Selatan',
        'Kabupaten Timor Tengah Utara',
        'Kota Kupang',
      ],
    },
    {
      id: 19,
      nama: 'Kalimantan Barat',
      kota: [
        'Kabupaten Bengkayang',
        'Kabupaten Kapuas Hulu',
        'Kabupaten Kayong Utara',
        'Kabupaten Ketapang',
        'Kabupaten Kubu Raya',
        'Kabupaten Landak',
        'Kabupaten Melawi',
        'Kabupaten Mempawah',
        'Kabupaten Sambas',
        'Kabupaten Sanggau',
        'Kabupaten Sekadau',
        'Kabupaten Sintang',
        'Kota Singkawang',
        'Kota Pontianak',
      ],
    },
    {
      id: 20,
      nama: 'Kalimatan Tengah',
      kota: [
        'Kabupaten Barito Selatan',
        'Kabupaten Barito Timur',
        'Kabupaten Barito Utara',
        'Kabupaten Gunung Mas',
        'Kabupaten Katingan',
        'Kabupaten Kotawaringin Barat',
        'Kabupaten Kotawaringin Barat',
        'Kabupaten Kotawaringin Timur',
        'Kabupaten Lamandau',
        'Kabupaten Murung Raya',
        'Kabupaten Pulang Pisau',
        'Kabupaten Seruyan',
        'Kabupaten Sukamara',
        'Kota Palangka Raya',
      ],
    },
    {
      id: 21,
      nama: 'Kalimantan Selatan',
      kota: [
        'Kabupaten Balangan',
        'Kabupaten Banjar',
        'Kabupaten Barito Kuala',
        'Kabupaten Sungai Selatan',
        'Kabupaten Hulu Sungai Tengah',
        'Kabupaten Hulu Sungai Utara',
        'Kabupaten Kotabaru',
        'Kabupaten Tabalong',
        'Kabupaten Tanah Bumbu',
        'Kabupaten Tanah Laut',
        'Kabupaten Tapin',
        'Kota BanjarBaru',
        'Kota Banjarmasin',
      ],
    },
    {
      id: 22,
      nama: 'Kalimantan Timur',
      kota: [
        'Kabupaten Berau',
        'Kabupaten Kutai Barat',
        'Kabupaten Kutai Kartanegara',
        'Kabupaten Kutai Timur',
        'Kabupaten Mahakam Ulu',
        'Kabupaten Paser',
        'Kabupaten Penajam Paser Utara',
        'Kota Balikpapan',
        'Kota Bontang',
        'Kota Nusantara',
        'Kota Samarinda',
      ],
    },
    {
      id: 23,
      nama: 'Kalimantan Utara',
      kota: [
        'Kabupaten Bulungan',
        'Kabupaten Malinau',
        'Kabupaten Nunukan',
        'Kabupaten Tana Tidung',
        'Kota Tarakan',
      ],
    },
    {
      id: 24,
      nama: 'Sulawesi Selatan',
      kota: [
        'Kabupaten Bantaeng',
        'Kabupaten Barru',
        'Kabupaten Bone',
        'Kabupaten Bulukumba',
        'Kabupaten Enrekang',
        'Kabupaten Gowa',
        'Kabupaten Jeneponto',
        'Kabupaten Kepulauan Selayar',
        'Kabupaten Luwu',
        'Kabupaten Luwu Timur',
        'Kabupaten Luwu Utara',
        'Kabupaten Maros',
        'Kabupaten Pangkajene dan Kepulauan',
        'Kabupaten Pinrang',
        'Kabupaten Sidenreng Rappang',
        'Kabupaten Sinjai',
        'Kabupaten Soppeng',
        'Kabupaten Takalar',
        'Kabupaten Tana Toraja',
        'Kabupaten Wajo',
        'Kota Makassar',
        'Kota Palopo',
        'Kota Parepare',
      ],
    },
    {
      id: 25,
      nama: 'Sulawesi Tenggara',
      kota: [
        'Kabupaten Bombana',
        'Kabupaten Buton',
        'Kabupaten Buton Selatan',
        'Kabupaten Buton Tengah',
        'Kabupaten Buton Utara',
        'Kabupaten Kolaka',
        'Kabupaten Kolaka Utara',
        'Kabupaten Konawe',
        'Kabupaten Konawe Kepulauan',
        'Kabupaten Konawe Selatan',
        'Kabupaten Konawe Utara',
        'Kabupaten Muna',
        'Kabupaten Muna Barat',
        'Kabupaten Wakatobi',
        'Kota Baubau',
        'Kota Kendari',
      ],
    },
    {
      id: 26,
      nama: 'Sulawesi Barat',
      kota: [
        'Kabupaten Majene',
        'Kabupaten Mamasa',
        'Kabupaten Mamuju',
        'Kabupaten Mamuju Tengah',
        'Kabupaten Pasangkayu',
        'Kabupaten Polewali Mandar',
      ],
    },
    {
      id: 27,
      nama: 'Sulawesi Tenggara',
      kota: [
        'Kabupaten Baanggai',
        'Kabupaten Banggai Kepulauan',
        'Kabupaten Banggai Laut',
        'Kabupaten Buol',
        'Kabupaten Donggala',
        'Kabupaten Morowali',
        'Kabupaten Morolawi Utara',
        'Kabupaten Parigi Moutong',
        'Kabupaten Poso ',
        'Kabupaten Sigi',
        'Kabupaten Tojo Una-una',
        'Kabupaten Tolitoli',
        'Kota Palu',
      ],
    },
    {
      id: 28,
      nama: 'Gorontalo',
      kota: [
        'Kabupaten Boalemo',
        'Kabupaten Bone Bolango',
        'Kabupaten Gorontalo',
        'Kabupaten Gorontalo Utara',
        'Kabupaten Pohuwato',
        'Kota Gorontalo',
      ],
    },
    {
      id: 29,
      nama: 'Sulawesi Utara',
      kota: [
        'Kabupaten Bolaang Mongondow',
        'Kabupaten Bolaang Mongondow Selatan',
        'Kabupaten Bolaang Mongondow Timur',
        'Kabupaten Bolaang Mongondow Utara',
        'Kabupaten Kepulauan Sangihe',
        'Kabupaten Kepulauan Siau Tagulandang Biaro',
        'Kabupaten Kepulauan Talaud',
        'Kabupaten Minahasa',
        'Kabupaten Minahasa Selatan',
        'Kabupaten Minahasa Tenggara',
        'Kabupaten Minahasa Utara',
        'Kota Bitung',
        'Kota Kotamobagu',
        'Kota Manado',
        'Kota Tomohon',
      ],
    },
    {
      id: 30,
      nama: 'Maluku',
      kota: [
        'Kabupaten Buru',
        'Kabupaten Buru Selatan',
        'Kabupaten Kepulauan Aru',
        'Kabupaten Kepulauan Tanimbar',
        'Kabupaten Maluku Barat Daya',
        'Kabupaten Maluku Tengah',
        'Kabupaten Maluku Tenggara',
        'Kabupaten Seram Bagian Barat',
        'Kabupaten Seram Bagian Timur',
        'Kota Ambon',
        'Kota Tual',
      ],
    },
    {
      id: 31,
      nama: 'Maluku Utara',
      kota: [
        'Kabupaten Halmahera Barat',
        'Kabupaten Halmahera Selatan	',
        'Kabupaten Halmahera Tengah',
        'Kabupaten Halmahera Timur',
        'Kabupaten Halmahera Utara',
        'Kabupaten Pulau Morotai',
        'Kota Ternate',
        'Kota Tidore Kepulauan',
      ],
    },
    {
      id: 32,
      nama: 'Papua Barat',
      kota: [
        'Kabupaten Fakfak',
        'Kabupaten Kaimana',
        'Kabupaten Manokwari',
        'Kabupaten Manokwari Selatan',
        'Kabupaten Pegunungan Arfak',
        'Kabupaten Teluk Bintuni',
        'Kabupaten Teluk Wondama',
      ],
    },
    {
      id: 33,
      nama: 'Papua',
      kota: [
        'Kabupaten Biak Numfor',
        'Kabupaten Jayapura',
        'Kabupaten Keerom',
        'Kabupaten Kepulauan Yapen',
        'Kabupaten Mamberamo Raya',
        'Kabupaten Sarmi',
        'Kabupaten Supiori',
        'Kabupaten Waropen',
        'Kota Jayapura',
      ],
    },
    {
      id: 34,
      nama: 'Papua Tengah',
      kota: [
        'Kabupaten Deiyai',
        'Kabupaten Dogiyai',
        'Kabupaten Intan Jaya',
        'Kabupaten Mimika',
        'Kabupaten Nabire',
        'Kabupaten Paniai',
        'Kabupaten Puncak',
        'Kabupaten Puncak Jaya',
      ],
    },
    {
      id: 35,
      nama: 'Papua Pegunungan',
      kota: [
        'Kabupaten Jayawijaya',
        'Kabupaten Lanny Jaya',
        'Kabupaten Mamberamo Tengah',
        'Kabupaten Nduga',
        'Kabupaten Pegunungan Bintang',
        'Kabupaten Tolikara',
        'Kabupaten Yalimo',
        'Kabupaten Yahukimo',
      ],
    },
    {
      id: 36,
      nama: 'Papua Selatan',
      kota: [
        'Kabupaten Asmat',
        'Kabupaten Boven Digoel',
        'Kabupaten Mappi',
        'Kabupaten Merauke',
      ],
    },
    {
      id: 37,
      nama: 'Papua Barat Daya',
      kota: [
        'Kabupaten Maybrat',
        'Kabupaten Raja Ampat',
        'Kabupaten Sorong',
        'Kabupaten Sorong Selatan',
        'Kabupaten Tambrauw',
        'Kota Sorong',
      ],
    },
    {
      id: 38,
      nama: 'Jakarta',
      kota: [
        'Kabupaten Administrasi Kepulauan Seribu',
        'Kota Administrasi Jakarta Barat',
        'Kota Administrasi Jakarta Pusat',
        'Kota Administrasi Jakarta Selatan',
        'Kota Administrasi Jakarta Timur',
        'Kota Administrasi Jakarta Utara',
      ],
    },
  ];
  const handleProvinceChange = (event) => {
    const selectedProvinceValue = event.target.value;
    setSelectedProvince(selectedProvinceValue);

    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    const selectedCityValue = event.target.value;
    setSelectedCity(selectedCityValue);
  };

  const handleCategoriesChange = (event) => {
    const selectedCategoriesValue = event.target.value;
    setSelectedCategories(selectedCategoriesValue);
  };

  const filteredCities =
    daerah.find((prov) => prov.nama === selectedProvince)?.kota || [];
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      picture: '',
      city: '',
      province: '',
      Categories: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('The hotel name must be filled in'),
      description: Yup.string().required('description cannot be empty'),
      picture: Yup.mixed().test(
        'fileSize',
        'Photo size is too large (max 1 MB)',
        (value) => {
          if (!value) return true;
          return value.size <= 1 * 1024 * 1024;
        },
      ),
    }),

    onSubmit: async (values) => {
      const data = new FormData();

      try {
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('city', selectedCity);
        data.append('province', selectedProvince);
        data.append('Categories', selectedCategories);
        data.append('picture', values.picture);

        const response = await api.post('property/add-properties', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const notif = () => {
          toast.success('Your property listing has been successfully added.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            onClose: () => {
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            },
          });
        };

        navigate('/list-property');
        notif();
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border mx-auto">
      <h1>{selectedCity}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name Hotel:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lokasi"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700"
          >
            Province:
          </label>
          <select
            id="province"
            name="province"
            onChange={handleProvinceChange}
            value={selectedProvince}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select Province</option>
            {daerah.map((data) => (
              <option key={data.nama} value={data.nama}>
                {data.nama}
              </option>
            ))}
          </select>

          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City:
          </label>
          <select
            id="city"
            name="city"
            onChange={handleCityChange}
            value={selectedCity}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select City</option>
            {filteredCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="picture"
            className="block text-sm font-medium text-gray-700"
          >
            Your Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue('picture', event.currentTarget.files[0]);
              formik.setFieldTouched('picture', true);
            }}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.ktpImage && formik.errors.ktpImage
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.picture && formik.errors.picture && (
            <p className="text-red-500 text-sm">{formik.errors.picture}</p>
          )}
        </div>
        {formik.values.picture && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Preview Your Picture
            </label>
            <img
              src={URL.createObjectURL(formik.values.picture)}
              alt="Preview KTP"
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="Categories"
            className="block text-sm font-medium text-gray-700"
          >
            Categories:
          </label>
          <select
            id="Categories"
            name="Categories"
            onChange={handleCategoriesChange}
            value={selectedCategories}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select Categories</option>

            <option value="Hotel">Hotel</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>

          {formik.touched.Categories && formik.errors.Categories ? (
            <div className="text-red-500 text-sm">
              {formik.errors.Categories}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AddHotelForm;
