-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2023 at 02:24 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sekawan_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `penempatan_tambang` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `nama`, `penempatan_tambang`, `createdAt`, `updatedAt`) VALUES
(1, 'suyono', 1, '2023-07-06 13:52:28', '2023-07-06 13:52:28'),
(2, 'sutoyo', 2, '2023-07-06 13:52:46', '2023-07-06 13:52:46'),
(3, 'karjo', 3, '2023-07-06 13:53:10', '2023-07-06 13:53:10'),
(4, 'dono', 4, '2023-07-06 13:53:28', '2023-07-06 13:53:28'),
(5, 'suhadi', 5, '2023-07-06 13:53:42', '2023-07-06 13:53:42'),
(6, 'sumarli', 6, '2023-07-06 13:53:56', '2023-07-06 13:53:56');

-- --------------------------------------------------------

--
-- Table structure for table `kantors`
--

CREATE TABLE `kantors` (
  `id` int(11) NOT NULL,
  `nama_kantor` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kantors`
--

INSERT INTO `kantors` (`id`, `nama_kantor`, `alamat`, `createdAt`, `updatedAt`) VALUES
(1, 'Kantor pusat', 'Jl. in aja dulu', '2023-07-05 18:00:07', '2023-07-05 18:00:07'),
(2, 'kantor cabang', 'Jl. sma org lain', '2023-07-06 08:31:56', '2023-07-06 08:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `pegawais`
--

CREATE TABLE `pegawais` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `penempatan` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','official','superadmin') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pegawais`
--

INSERT INTO `pegawais` (`id`, `nama`, `penempatan`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'alvin', 1, 'alvin', '$2b$08$Ec.f2IskTSFQja.ZoLS1iuKok3oCsSaVNsN3jwMnAdjS7DjGR8AUC', 'superadmin', '2023-07-05 16:13:11', '2023-07-05 16:13:11'),
(4, 'adhe', 2, 'adhe', '$2b$08$IE.BmGZ9cR3I03yWgb86Ku4tCZx6/wxQgq/x4dnVWbxE.rQ7u3SiS', 'admin', '2023-07-06 08:32:13', '2023-07-06 08:51:12'),
(7, 'devin', 1, 'devin', '$2b$08$6cyntgCIuQPMVzJuQ8AjNuQAgM9C5wfcvQRP1607oM5q5W0u3qQwW', 'official', '2023-07-07 06:15:41', '2023-07-07 06:15:41');

-- --------------------------------------------------------

--
-- Table structure for table `pemesanans`
--

CREATE TABLE `pemesanans` (
  `id` int(11) NOT NULL,
  `pemesan` int(11) NOT NULL,
  `penyetuju` int(11) DEFAULT NULL,
  `unit` int(11) NOT NULL,
  `driver` int(11) NOT NULL,
  `tambang` int(11) NOT NULL,
  `tgl_pesan` date NOT NULL,
  `tgl_disetujui` date DEFAULT NULL,
  `tgl_kembali` date DEFAULT NULL,
  `status_pesan` enum('menunggu','disetujui','tidak_disetujui') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pemesanans`
--

INSERT INTO `pemesanans` (`id`, `pemesan`, `penyetuju`, `unit`, `driver`, `tambang`, `tgl_pesan`, `tgl_disetujui`, `tgl_kembali`, `status_pesan`, `createdAt`, `updatedAt`) VALUES
(3, 1, 7, 2, 1, 1, '2023-07-07', '2023-07-07', NULL, 'disetujui', '2023-07-07 08:24:57', '2023-07-07 08:25:24');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('10230117023021-create-kantor.js'),
('20230117022531-create-pegawai.js'),
('30230117022858-create-tambang.js'),
('40230117022858-create-driver.js'),
('40230117022858-create-unit.js'),
('40230117023349-create-pemesanan.js');

-- --------------------------------------------------------

--
-- Table structure for table `tambangs`
--

CREATE TABLE `tambangs` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tambangs`
--

INSERT INTO `tambangs` (`id`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 'tambang 1', '2023-07-06 13:05:17', '2023-07-06 13:05:17'),
(2, 'tambang 2', '2023-07-06 13:05:30', '2023-07-06 13:05:30'),
(3, 'tambang 3', '2023-07-06 13:05:37', '2023-07-06 13:05:37'),
(4, 'tambang 4', '2023-07-06 13:29:19', '2023-07-06 13:29:19'),
(5, 'tambang 5', '2023-07-06 13:29:25', '2023-07-06 13:29:25'),
(6, 'tambang 6', '2023-07-06 13:29:29', '2023-07-06 13:29:29');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `nomor_unit` varchar(255) NOT NULL,
  `nama_model` varchar(255) NOT NULL,
  `jenis_BBM` enum('bensin','diesel') DEFAULT NULL,
  `jenis_angkutan` enum('orang','barang') DEFAULT NULL,
  `status` enum('tersedia','dipakai') DEFAULT NULL,
  `average_BBM` int(11) NOT NULL,
  `service` int(11) NOT NULL,
  `terakhir_service` date NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pemakaian` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `nomor_unit`, `nama_model`, `jenis_BBM`, `jenis_angkutan`, `status`, `average_BBM`, `service`, `terakhir_service`, `image`, `createdAt`, `updatedAt`, `pemakaian`) VALUES
(2, 'S 147 VIN', 'Toyota Hilux', 'diesel', 'barang', '', 8, 3, '0000-00-00', 'img-1688653762577.png', '2023-07-06 14:29:22', '2023-07-07 08:25:24', 1),
(3, 'S 47 VIN', 'Toyota Hilux', 'diesel', 'barang', 'tersedia', 8, 3, '0000-00-00', 'img-1688701724007.png', '2023-07-07 03:48:44', '2023-07-07 03:48:44', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penempatan_tambang` (`penempatan_tambang`);

--
-- Indexes for table `kantors`
--
ALTER TABLE `kantors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pegawais`
--
ALTER TABLE `pegawais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penempatan` (`penempatan`);

--
-- Indexes for table `pemesanans`
--
ALTER TABLE `pemesanans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pemesan` (`pemesan`),
  ADD KEY `penyetuju` (`penyetuju`),
  ADD KEY `unit` (`unit`),
  ADD KEY `driver` (`driver`),
  ADD KEY `tambang` (`tambang`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tambangs`
--
ALTER TABLE `tambangs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kantors`
--
ALTER TABLE `kantors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pegawais`
--
ALTER TABLE `pegawais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pemesanans`
--
ALTER TABLE `pemesanans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tambangs`
--
ALTER TABLE `tambangs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`penempatan_tambang`) REFERENCES `tambangs` (`id`);

--
-- Constraints for table `pegawais`
--
ALTER TABLE `pegawais`
  ADD CONSTRAINT `pegawais_ibfk_1` FOREIGN KEY (`penempatan`) REFERENCES `kantors` (`id`);

--
-- Constraints for table `pemesanans`
--
ALTER TABLE `pemesanans`
  ADD CONSTRAINT `pemesanans_ibfk_1` FOREIGN KEY (`pemesan`) REFERENCES `pegawais` (`id`),
  ADD CONSTRAINT `pemesanans_ibfk_2` FOREIGN KEY (`penyetuju`) REFERENCES `pegawais` (`id`),
  ADD CONSTRAINT `pemesanans_ibfk_3` FOREIGN KEY (`unit`) REFERENCES `units` (`id`),
  ADD CONSTRAINT `pemesanans_ibfk_4` FOREIGN KEY (`driver`) REFERENCES `drivers` (`id`),
  ADD CONSTRAINT `pemesanans_ibfk_5` FOREIGN KEY (`tambang`) REFERENCES `tambangs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
