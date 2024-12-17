-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 17 Des 2024 pada 17.17
-- Versi server: 8.0.30
-- Versi PHP: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas_ketinggian_air`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `rekam`
--

CREATE TABLE `rekam` (
  `id` int NOT NULL,
  `waktu` time NOT NULL,
  `tanggal` date NOT NULL,
  `jarak` float NOT NULL,
  `warna` varchar(10) NOT NULL,
  `pesan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `rekam`
--

INSERT INTO `rekam` (`id`, `waktu`, `tanggal`, `jarak`, `warna`, `pesan`) VALUES
(1, '20:21:47', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(2, '20:22:10', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(3, '20:22:21', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(4, '20:22:31', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(5, '20:22:41', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(6, '20:22:51', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(7, '20:23:01', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(8, '20:23:11', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(9, '20:23:22', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(10, '20:23:32', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(11, '20:23:42', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(12, '20:23:53', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(13, '20:24:03', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(14, '20:24:13', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(15, '20:24:23', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(16, '20:24:33', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(17, '20:24:43', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(18, '20:24:53', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(19, '20:25:03', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(20, '20:25:14', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(21, '20:25:24', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(22, '20:25:34', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(23, '20:25:44', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(24, '20:25:54', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(25, '20:26:04', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(26, '20:26:15', '2024-12-17', 3.31, 'hijau', 'Masih Batas Aman'),
(27, '22:40:01', '2024-12-17', 2.98, 'hijau', 'Masih Batas Aman'),
(28, '22:40:12', '2024-12-17', 2.98, 'hijau', 'Masih Batas Aman'),
(29, '22:40:22', '2024-12-17', 2.98, 'hijau', 'Masih Batas Aman'),
(30, '22:40:32', '2024-12-17', 2.98, 'hijau', 'Masih Batas Aman');

-- --------------------------------------------------------

--
-- Struktur dari tabel `setting`
--

CREATE TABLE `setting` (
  `id` int NOT NULL,
  `warna` varchar(10) NOT NULL,
  `range_min` float NOT NULL,
  `range_max` float NOT NULL,
  `pesan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `setting`
--

INSERT INTO `setting` (`id`, `warna`, `range_min`, `range_max`, `pesan`) VALUES
(1, 'hijau', 2, 4, 'Masih Batas Aman'),
(2, 'kuning', 1.99, 1, 'Hati - hati'),
(3, 'merah', 0.99, 0.55, 'Bahaya!');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `rekam`
--
ALTER TABLE `rekam`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `rekam`
--
ALTER TABLE `rekam`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
