

# **Grafik Rekam dan Setting**

📊 **Aplikasi visualisasi data rekam dan pengaturan berbasis web** menggunakan **Chart.js** dan **Bootstrap**. Aplikasi ini mengambil data dari API dan menampilkannya dalam bentuk grafik interaktif serta menampilkan notifikasi **alert** ketika data berada dalam rentang tertentu.

---

## **Fitur Utama** 🚀

1. **Visualisasi Data**: Data _rekam_ ditampilkan dalam grafik garis yang interaktif menggunakan **Chart.js**.
2. **Pengaturan Dinamis**: Data _setting_ ditampilkan dalam format yang rapi dengan **Bootstrap**.
4. **Responsif dan Menarik**: Desain responsif menggunakan **Bootstrap**.

---

## **Tampilan Aplikasi** 🖥️
![Grafik Rekam](frontend/screenshot/grafik.png)

## **Teknologi yang Digunakan** 🛠️

- **Frontend**: HTML, CSS, JavaScript
- **Library**:
  - [Chart.js](https://www.chartjs.org/)
  - [Bootstrap 5](https://getbootstrap.com/)
- **Backend**: Node.js (API untuk data rekam dan setting)

---

## **Struktur Folder** 📂

```plaintext
📁 project-grafik-rekam
│
├── 📄 index.html       # Halaman utama
├── 📁 assets
│   ├── 📄 style.css    # File CSS kustom (opsional)
│   └── 📄 script.js    # File JavaScript untuk fetch API dan Chart.js
│
└── 📁 api
    └── 📄 server.js    # Backend sederhana menggunakan Node.js
```

Instalasi
1. Clone Repository
Clone repository ini ke lokal Anda:

bash
Copy code
git clone https://github.com/username/project-grafik-rekam.git
cd project-grafik-rekam
2. Install Dependency
Jalankan perintah berikut untuk menginstal semua dependencies Node.js:

bash
Copy code
npm install
3. Jalankan Server API
Jalankan server Node.js dengan perintah:

bash
Copy code
node server.js
API akan berjalan di:
http://localhost:3000/api/rekam
http://localhost:3000/api/setting

Struktur Folder
php
Copy code
📂 project-grafik-rekam
├── 📂 public
│   ├── index.html           # Halaman utama dengan Chart.js dan Bootstrap
│   └── 📂 assets
│       └── style.css        # File CSS tambahan
├── server.js                # File utama server Node.js
├── package.json             # Dependencies
└── README.md                # Dokumentasi proyek
Contoh Data API
1. Endpoint Rekam
URL: http://localhost:3000/api/rekam
Response JSON:

json
Copy code
[
  {
    "id": 1,
    "waktu": "20:21:47",
    "tanggal": "2024-12-17T00:00:00.000Z",
    "jarak": 3.31,
    "warna": "hijau",
    "pesan": "Masih Batas Aman"
  },
  {
    "id": 2,
    "waktu": "20:22:10",
    "tanggal": "2024-12-17T00:00:00.000Z",
    "jarak": 4.55,
    "warna": "kuning",
    "pesan": "Hati-Hati"
  },
  {
    "id": 3,
    "waktu": "20:22:31",
    "tanggal": "2024-12-17T00:00:00.000Z",
    "jarak": 6.7,
    "warna": "merah",
    "pesan": "Di Luar Batas Aman"
  }
]
2. Endpoint Setting
URL: http://localhost:3000/api/setting
Response JSON:

json
Copy code
[
  {
    "warna": "hijau",
    "range_min": 0,
    "range_max": 4,
    "pesan": "Masih Batas Aman"
  },
  {
    "warna": "kuning",
    "range_min": 4.1,
    "range_max": 5.5,
    "pesan": "Hati-Hati"
  },
  {
    "warna": "merah",
    "range_min": 5.6,
    "range_max": 10,
    "pesan": "Di Luar Batas Aman"
  }
]