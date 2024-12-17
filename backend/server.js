const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Middleware untuk membaca data JSON

// Koneksi ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Ganti dengan password MySQL Anda
  database: "uas_ketinggian_air", // Ganti dengan nama database Anda
  timezone: "Asia/Jakarta",
});

// Koneksi ke database
db.connect((err) => {
  if (err) throw err;
  console.log("Database terhubung...");
});

// ==========================================
// API untuk Rekam
// ==========================================
// Endpoint untuk menerima data jarak dari ESP32
app.post("/api/rekam", (req, res) => {
  const { jarak } = req.body;

  // Validasi input
  if (!jarak && jarak !== 0) {
    return res.status(400).json({ message: "Data jarak tidak ditemukan!" });
  }

  // Waktu dan tanggal saat ini dari server
  const waktu = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Jakarta",
  });
  const sekarang = new Date();
  const tanggal = new Date(
    sekarang.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  )
    .toISOString()
    .split("T")[0];

  // Query untuk mencari warna dan pesan berdasarkan jarak
  const querySetting = `
      SELECT warna, pesan 
      FROM setting 
      WHERE ? BETWEEN range_min AND range_max
      LIMIT 1
    `;

  db.query(querySetting, [jarak], (err, results) => {
    if (err) {
      console.error("Error query setting:", err);
      return res.status(500).json({ message: "Gagal mengambil data setting." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Jarak tidak sesuai dengan range yang ada." });
    }

    const { warna, pesan } = results[0];

    // Query untuk menyimpan data ke tabel rekam
    const queryRekam = `
        INSERT INTO rekam (waktu, tanggal, jarak, warna, pesan)
        VALUES (?, ?, ?, ?, ?)
      `;

    db.query(
      queryRekam,
      [waktu, tanggal, jarak, warna, pesan],
      (err, result) => {
        if (err) {
          console.error("Error query rekam:", err);
          return res.status(500).json({ message: "Gagal menyimpan data." });
        }

        return res.status(200).json({
          message: "Data berhasil disimpan.",
          data: {
            waktu,
            tanggal,
            jarak,
            warna,
            pesan,
          },
        });
      }
    );
  });
});

// GET untuk mendapatkan seluruh rekaman
app.get("/api/rekam", (req, res) => {
  const query = "SELECT * FROM rekam";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching rekam data:", err);
      return res.status(500).json({ message: "Gagal mendapatkan data rekam." });
    }
    res.status(200).json(results);
  });
});

// GET untuk mendapatkan rekaman berdasarkan ID
app.get("/api/rekam/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM rekam WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching rekam data:", err);
      return res.status(500).json({ message: "Gagal mendapatkan data rekam." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Rekam tidak ditemukan." });
    }
    res.status(200).json(results[0]);
  });
});

// ==========================================
// API untuk Setting
// ==========================================

// POST untuk menambahkan data setting baru
app.post("/api/setting", (req, res) => {
  const { warna, range_min, range_max, pesan } = req.body;

  if (!warna || !range_min || !range_max || !pesan) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  const query =
    "INSERT INTO setting (warna, range_min, range_max, pesan) VALUES (?, ?, ?, ?)";

  db.query(query, [warna, range_min, range_max, pesan], (err, result) => {
    if (err) {
      console.error("Error inserting setting:", err);
      return res.status(500).json({ message: "Gagal menyimpan data setting." });
    }
    res.status(201).json({ message: "Setting berhasil ditambahkan." });
  });
});

// GET untuk mendapatkan seluruh data setting
app.get("/api/setting", (req, res) => {
  const query = "SELECT * FROM setting";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching setting data:", err);
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan data setting." });
    }
    res.status(200).json(results);
  });
});

// GET untuk mendapatkan data setting berdasarkan ID
app.get("/api/setting/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM setting WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching setting data:", err);
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan data setting." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Setting tidak ditemukan." });
    }
    res.status(200).json(results[0]);
  });
});

// PUT untuk mengupdate data setting berdasarkan ID
app.put("/api/setting/:id", (req, res) => {
  const { id } = req.params;
  const { warna, range_min, range_max, pesan } = req.body;

  if (!warna || !range_min || !range_max || !pesan) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  const query =
    "UPDATE setting SET warna = ?, range_min = ?, range_max = ?, pesan = ? WHERE id = ?";

  db.query(query, [warna, range_min, range_max, pesan, id], (err, result) => {
    if (err) {
      console.error("Error updating setting:", err);
      return res
        .status(500)
        .json({ message: "Gagal memperbarui data setting." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Setting tidak ditemukan." });
    }
    res.status(200).json({ message: "Setting berhasil diperbarui." });
  });
});

// DELETE untuk menghapus data setting berdasarkan ID
app.delete("/api/setting/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM setting WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting setting:", err);
      return res.status(500).json({ message: "Gagal menghapus data setting." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Setting tidak ditemukan." });
    }
    res.status(200).json({ message: "Setting berhasil dihapus." });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
