-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2023 at 03:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `demoorders`
--

CREATE TABLE `demoorders` (
  `orderid` int(7) NOT NULL,
  `buyerid` int(10) NOT NULL,
  `productid` int(10) NOT NULL,
  `shipping_addr` varchar(150) NOT NULL,
  `proddetail` varchar(250) NOT NULL,
  `totamt` int(10) NOT NULL,
  `paymethod` varchar(20) NOT NULL,
  `orderstatus` varchar(20) NOT NULL,
  `orderdate` datetime NOT NULL,
  `sellerid` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `demoorders`
--

INSERT INTO `demoorders` (`orderid`, `buyerid`, `productid`, `shipping_addr`, `proddetail`, `totamt`, `paymethod`, `orderstatus`, `orderdate`, `sellerid`) VALUES
(1, 3, 13, 'hhsdfhd', 'Handmade Wooden Train Set (376 x 1)', 414, 'payonorder', 'yet to be delivered', '2023-12-16 18:00:38', 3),
(2, 5, 14, 'hhsdfhd', 'Handmade Wooden Marble Run (450 x 1)', 495, 'payonorder', 'yet to be delivered', '2023-12-16 18:45:34', 3),
(3, 3, 15, 'hhsdfhd', 'Handmade Wooden Dollhouse (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-16 18:45:34', 3),
(6, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 11:39:42', NULL),
(7, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 11:45:50', NULL),
(8, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 11:47:00', NULL),
(9, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 11:51:23', NULL),
(10, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 11:53:47', NULL),
(11, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 12:05:07', NULL),
(12, 3, 7, 'hhsdfhd,', 'Hand-painted Ceramic Bowl (250 x 1)', 275, 'payonorder', 'yet to be delivered', '2023-12-21 12:06:41', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `demoorders`
--
ALTER TABLE `demoorders`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `buyerid` (`buyerid`),
  ADD KEY `productid` (`productid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `demoorders`
--
ALTER TABLE `demoorders`
  MODIFY `orderid` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `demoorders`
--
ALTER TABLE `demoorders`
  ADD CONSTRAINT `buyerid` FOREIGN KEY (`buyerid`) REFERENCES `demouser2` (`buyerid`),
  ADD CONSTRAINT `productid` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
