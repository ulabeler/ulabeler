CREATE DATABASE  IF NOT EXISTS `ulabeler_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ulabeler_dev`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: ulabeler_dev
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id` varchar(15) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_category`
--

DROP TABLE IF EXISTS `base_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `name_category` varchar(45) NOT NULL,
  `name_subcategory` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id_idx` (`vendor_id`),
  KEY `category_settings_name_idx` (`name_subcategory`),
  CONSTRAINT `category_settings_name` FOREIGN KEY (`name_subcategory`) REFERENCES `category_settings` (`name`),
  CONSTRAINT `vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_category`
--

LOCK TABLES `base_category` WRITE;
/*!40000 ALTER TABLE `base_category` DISABLE KEYS */;
INSERT INTO `base_category` VALUES (1,1,'ペットボトル','ペットボトル'),(2,1,'皿','皿'),(3,1,'スマホケース','iPhone12 mini'),(4,1,'スマホケース','iPhone12'),(5,1,'スマホケース','iPhone12 Pro'),(6,1,'スマホケース','iPhone12 Pro Max'),(7,1,'スマホケース','iPhone11'),(8,1,'スマホケース','iPhone11 Pro'),(9,1,'スマホケース','iPhone8/SE(第二世代)'),(10,1,'スマホケース','iPhone7'),(11,1,'スマホケース','Xperia Z5'),(12,1,'スマホケース','iPhone13'),(13,1,'スマホケース','iPhone13 Pro'),(14,1,'スマホケース','iPhone13 Pro Max'),(15,1,'お弁当箱','お弁当箱'),(16,1,'サーフボード','サーフボード'),(17,1,'腕時計','腕時計'),(18,1,'トートバッグ','トートバッグ'),(19,1,'靴','靴'),(20,1,'チロルチョコ','チロルチョコ');
/*!40000 ALTER TABLE `base_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_settings`
--

DROP TABLE IF EXISTS `base_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `object_path` varchar(255) NOT NULL,
  `base_tex_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) NOT NULL,
  `unit_price` int NOT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `object_path_UNIQUE` (`object_path`),
  UNIQUE KEY `thumbnail_path_UNIQUE` (`thumbnail_path`),
  CONSTRAINT `T_category_id` FOREIGN KEY (`id`) REFERENCES `base_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_settings`
--

LOCK TABLES `base_settings` WRITE;
/*!40000 ALTER TABLE `base_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_settings`
--

DROP TABLE IF EXISTS `category_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_settings` (
  `name` varchar(45) NOT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_settings`
--

LOCK TABLES `category_settings` WRITE;
/*!40000 ALTER TABLE `category_settings` DISABLE KEYS */;
INSERT INTO `category_settings` VALUES ('iPhone11',NULL,'2021-11-29 14:47:00'),('iPhone11 Pro',NULL,'2021-11-29 14:47:00'),('iPhone12',NULL,'2021-11-29 14:47:00'),('iPhone12 mini',NULL,'2021-11-29 14:47:00'),('iPhone12 Pro',NULL,'2021-11-29 14:47:00'),('iPhone12 Pro Max',NULL,'2021-11-29 14:47:00'),('iPhone13',NULL,'2021-11-29 14:47:00'),('iPhone13 Pro',NULL,'2021-11-29 14:47:00'),('iPhone13 Pro Max',NULL,'2021-11-29 14:47:00'),('iPhone7',NULL,'2021-11-29 14:47:00'),('iPhone8/SE(第二世代)',NULL,'2021-11-29 14:47:00'),('Xperia Z5',NULL,'2021-11-29 14:47:00'),('お弁当箱',NULL,'2021-11-29 14:47:00'),('サーフボード',NULL,'2021-11-29 14:47:00'),('チロルチョコ',NULL,'2021-11-29 14:47:00'),('トートバッグ',NULL,'2021-11-29 14:47:00'),('ペットボトル',NULL,'2021-11-29 14:47:00'),('皿',NULL,'2021-11-29 14:47:00'),('腕時計',NULL,'2021-11-29 14:47:00'),('靴',NULL,'2021-11-29 14:47:00');
/*!40000 ALTER TABLE `category_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_address`
--

DROP TABLE IF EXISTS `delivery_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_address` (
  `user_id` varchar(15) NOT NULL,
  `updated_at` datetime NOT NULL,
  `zip_code` char(7) NOT NULL,
  `address` varchar(255) NOT NULL,
  `familyname` varchar(15) NOT NULL,
  `firstname` varchar(15) NOT NULL,
  `familyname_furigana` varchar(45) NOT NULL,
  `firstname_furigana` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`,`updated_at`),
  CONSTRAINT `user_id_delivery_addr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_address`
--

LOCK TABLES `delivery_address` WRITE;
/*!40000 ALTER TABLE `delivery_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_status`
--

DROP TABLE IF EXISTS `delivery_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_status` (
  `purchase_record_id` varchar(20) NOT NULL,
  `datetime_scheduled` varchar(20) DEFAULT NULL COMMENT '配送予定日時\n例)\n08/30　08:00-12:00',
  `current_status` varchar(45) DEFAULT NULL,
  `zip_code` char(7) DEFAULT NULL,
  `address` varchar(255) NOT NULL COMMENT '住所',
  `familyname` varchar(15) NOT NULL,
  `firstname` varchar(15) NOT NULL,
  `familyname_furigana` varchar(45) DEFAULT NULL,
  `firstname_furigana` varchar(45) DEFAULT NULL,
  `datetime_results` datetime DEFAULT NULL COMMENT '配送実績日時',
  `updated_at` datetime DEFAULT NULL COMMENT 'ユーザー購入履歴/管理画面で対象ページアクセスしたときに入れる',
  PRIMARY KEY (`purchase_record_id`),
  CONSTRAINT `purchase_record_id` FOREIGN KEY (`purchase_record_id`) REFERENCES `purchase_history` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_status`
--

LOCK TABLES `delivery_status` WRITE;
/*!40000 ALTER TABLE `delivery_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorited_user`
--

DROP TABLE IF EXISTS `favorited_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorited_user` (
  `favorite_from` varchar(15) NOT NULL,
  `favorite_to` varchar(15) NOT NULL,
  `favorited_at` datetime NOT NULL,
  PRIMARY KEY (`favorite_from`,`favorite_to`),
  KEY `user_id_fav_user_to_idx` (`favorite_to`),
  CONSTRAINT `user_id_fav_user_from` FOREIGN KEY (`favorite_from`) REFERENCES `user` (`id`),
  CONSTRAINT `user_id_fav_user_to` FOREIGN KEY (`favorite_to`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorited_user`
--

LOCK TABLES `favorited_user` WRITE;
/*!40000 ALTER TABLE `favorited_user` DISABLE KEYS */;
INSERT INTO `favorited_user` VALUES ('na2na','ulabeler','2022-02-26 15:15:52'),('ulabeler','2na2','2022-02-25 16:08:01'),('ulabeler','apple','2022-02-26 08:42:54'),('ulabeler','kobayasi','2022-02-26 08:43:09'),('ulabeler','orange','2022-02-26 08:45:13'),('ulabeler','pineapple','2022-02-26 08:45:19'),('ulabeler','ulabeler','2022-02-25 16:51:24'),('ulabeler','yama','2022-02-26 08:45:24'),('ulabeler','yamada','2022-02-26 08:45:30'),('ulabeler','yamafuji','2022-02-26 08:45:36');
/*!40000 ALTER TABLE `favorited_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorited_user_number`
--

DROP TABLE IF EXISTS `favorited_user_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorited_user_number` (
  `favorited_to_id` varchar(15) NOT NULL,
  `number` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`favorited_to_id`),
  CONSTRAINT `user_id_favnum_user` FOREIGN KEY (`favorited_to_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorited_user_number`
--

LOCK TABLES `favorited_user_number` WRITE;
/*!40000 ALTER TABLE `favorited_user_number` DISABLE KEYS */;
INSERT INTO `favorited_user_number` VALUES ('2na2',1),('apple',1),('kobayasi',1),('na2na',0),('nagarebosi',0),('orange',1),('pineapple',1),('ulabeler',2),('yama',1),('yamada',1),('yamafuji',1);
/*!40000 ALTER TABLE `favorited_user_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorited_work`
--

DROP TABLE IF EXISTS `favorited_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorited_work` (
  `favorite_from` varchar(15) NOT NULL,
  `favorite_to` char(12) NOT NULL,
  `favorited_at` datetime NOT NULL,
  PRIMARY KEY (`favorite_from`,`favorite_to`),
  KEY `F_work_ID_idx` (`favorite_to`),
  CONSTRAINT `user_id_fav_work` FOREIGN KEY (`favorite_from`) REFERENCES `user` (`id`),
  CONSTRAINT `work_id_fav_work` FOREIGN KEY (`favorite_to`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorited_work`
--

LOCK TABLES `favorited_work` WRITE;
/*!40000 ALTER TABLE `favorited_work` DISABLE KEYS */;
INSERT INTO `favorited_work` VALUES ('na2na','06cd36182afc','2022-02-26 22:12:12'),('na2na','2ade79b60637','2022-02-26 15:14:12'),('na2na','4bfa18cdfe55','2022-02-26 22:12:11'),('na2na','6e96f7131583','2022-02-26 22:12:09'),('na2na','81edff70d7d3','2022-02-26 22:12:11'),('na2na','b7edc32c2dc0','2022-02-26 22:12:49'),('na2na','b9e5c437d684','2022-02-26 22:12:51'),('na2na','db8e43171e68','2022-02-26 15:14:08'),('na2na','edf5aa0c1078','2022-02-26 17:08:44'),('na2na','fca90358cdec','2022-02-26 15:14:10'),('ulabeler','2ade79b60637','2022-02-25 15:16:27'),('ulabeler','3433777e8916','2022-02-26 15:01:15'),('ulabeler','4bfa18cdfe55','2022-02-25 15:33:54'),('ulabeler','b7edc32c2dc0','2022-02-23 03:28:02'),('ulabeler','b9e5c437d684','2022-02-25 04:44:11'),('ulabeler','db8e43171e68','2022-02-25 15:30:08'),('ulabeler','fca90358cdec','2022-02-25 15:29:29');
/*!40000 ALTER TABLE `favorited_work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorited_work_number`
--

DROP TABLE IF EXISTS `favorited_work_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorited_work_number` (
  `favorited_to_id` char(12) NOT NULL,
  `number` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`favorited_to_id`),
  CONSTRAINT `favorited_to_id` FOREIGN KEY (`favorited_to_id`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorited_work_number`
--

LOCK TABLES `favorited_work_number` WRITE;
/*!40000 ALTER TABLE `favorited_work_number` DISABLE KEYS */;
INSERT INTO `favorited_work_number` VALUES ('06cd36182afc',1),('2ade79b60637',2),('3433777e8916',1),('4bfa18cdfe55',2),('6e96f7131583',1),('81edff70d7d3',1),('b7edc32c2dc0',2),('b9e5c437d684',2),('d0a01b45a9f0',0),('d74dfadaec92',0),('db8e43171e68',2),('edf5aa0c1078',1),('fca90358cdec',2);
/*!40000 ALTER TABLE `favorited_work_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiry`
--

DROP TABLE IF EXISTS `inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(15) NOT NULL,
  `category` tinyint NOT NULL,
  `description` text NOT NULL,
  `name` varchar(45) NOT NULL,
  `mail_address` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL COMMENT '「受付済み」\n「対応中」\n「対応済み」',
  `reply` text,
  `replyed_by_user_id` varchar(15) NOT NULL COMMENT '運営対応者id\n',
  `posted_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL COMMENT '対応中、とか対応済み、とかそういうのを入れる',
  PRIMARY KEY (`id`),
  KEY `id_user_idx` (`user_id`),
  KEY `admin_id_inq_idx` (`replyed_by_user_id`),
  CONSTRAINT `admin_id_inq` FOREIGN KEY (`replyed_by_user_id`) REFERENCES `administrator` (`id`),
  CONSTRAINT `user_id_inq` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiry`
--

LOCK TABLES `inquiry` WRITE;
/*!40000 ALTER TABLE `inquiry` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_confirmation`
--

DROP TABLE IF EXISTS `mail_confirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail_confirmation` (
  `user_id` varchar(15) NOT NULL,
  `datetime_issue` datetime NOT NULL,
  `mailaddress_new` varchar(255) DEFAULT NULL,
  `token_confirmation` char(4) NOT NULL,
  PRIMARY KEY (`user_id`,`datetime_issue`),
  KEY `F_user_ID_idx` (`user_id`),
  CONSTRAINT `user_id_main_confim` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_confirmation`
--

LOCK TABLES `mail_confirmation` WRITE;
/*!40000 ALTER TABLE `mail_confirmation` DISABLE KEYS */;
INSERT INTO `mail_confirmation` VALUES ('ulabeler','2022-02-20 02:21:40','na2na@na2na.dev','0908');
/*!40000 ALTER TABLE `mail_confirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset`
--

DROP TABLE IF EXISTS `password_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset` (
  `id` varchar(15) NOT NULL,
  `datetime_issue` datetime NOT NULL,
  `temp_password` varchar(255) NOT NULL,
  `token` char(32) NOT NULL,
  PRIMARY KEY (`id`,`datetime_issue`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  CONSTRAINT `user_id_pass_reset` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset`
--

LOCK TABLES `password_reset` WRITE;
/*!40000 ALTER TABLE `password_reset` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_history`
--

DROP TABLE IF EXISTS `purchase_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_history` (
  `id` varchar(20) NOT NULL,
  `user_id` varchar(15) NOT NULL,
  `items` json NOT NULL,
  `number_invoice` varchar(20) NOT NULL,
  `purchased_at` datetime DEFAULT NULL,
  `payment_method` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_Index` (`user_id`),
  CONSTRAINT `user_id_purchase` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_history`
--

LOCK TABLES `purchase_history` WRITE;
/*!40000 ALTER TABLE `purchase_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reported_to_user_id` varchar(15) NOT NULL,
  `reported_from_user_id` varchar(15) NOT NULL,
  `category_id` tinyint NOT NULL,
  `reported_description` text NOT NULL,
  `reported_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `F_user_ID_idx1` (`reported_to_user_id`),
  KEY `user_id_report_from_idx` (`reported_from_user_id`),
  CONSTRAINT `user_id_report_from` FOREIGN KEY (`reported_from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_id_report_to` FOREIGN KEY (`reported_to_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'ulabeler','na2na',2,'食欲を誘う非常に悪質な表現','2022-02-08 01:52:21');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_images`
--

DROP TABLE IF EXISTS `sample_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sample_images_path` varchar(255) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_images`
--

LOCK TABLES `sample_images` WRITE;
/*!40000 ALTER TABLE `sample_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `sample_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stamp_settings`
--

DROP TABLE IF EXISTS `stamp_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stamp_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `unit_price` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stamp_settings`
--

LOCK TABLES `stamp_settings` WRITE;
/*!40000 ALTER TABLE `stamp_settings` DISABLE KEYS */;
INSERT INTO `stamp_settings` VALUES (1,'flower','/images/stamps/flower.png',15),(2,'lemon','/images/stamps/lemon.png',15),(3,'apple','/images/stamps/apple.png',15),(4,'doughnut','/images/stamps/doughnut.png',15);
/*!40000 ALTER TABLE `stamp_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(15) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mailaddress` varchar(255) NOT NULL,
  `icon_path` varchar(255) DEFAULT NULL,
  `self_introduction` text,
  `cardnumber` char(16) DEFAULT NULL,
  `name_card` varchar(45) DEFAULT NULL,
  `expiration` char(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mailaddress_UNIQUE` (`mailaddress`),
  KEY `name_idx` (`name`),
  KEY `mailaddress_idx` (`mailaddress`),
  KEY `id_idx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2na2','2na2','$2b$10$V5oRKJNbhAUSzPLHYnfSn.a8SsUxuYkWlLuB.9aojGqWSGzPfTC4.','2na2@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-25 02:56:54',NULL),('apple','りんご','$2b$10$Qpwt77mBHR1kKdAMiOA34ek/8ida.2bOd3uT.hVUxLTG9l/1jCgfu','apple@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-25 16:58:44',NULL),('kobayasi','しょーちゃん','$2b$10$jh7B5dqQ7g0oAfcY7xXIMOTlamyq42x/TxKA989Qq6sGj7WmYgNPO','kobayasi@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:45:02',NULL),('na2na','なずな','$2b$10$4Xz2Prm2AyS.NMwjL.w5RuvWtCuV1FiQQUoEPNsw0K.PeJSuSZ.1a','na2na@na2na.dev','https://mediaulabeler.na2na.website/media/icon/c0537141-b852-4171-8ab8-f09a38ddbabc.webp','にゃーん',NULL,NULL,NULL,'2022-02-08 00:41:52',NULL),('nagarebosi','赤ちゃん','$2b$10$2Zgei.4ZUGbjTJadIIg/v.6D92DOpLClnx5lg8X9flHEIz.6ty9UK','nagarebosi@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:45:34',NULL),('orange','みかん','$2b$10$UlSnJdB5mrIt/oqEzTIDKOiIQZqeZSuVEf6J2WlOpVzDtum2BxNHm','orange@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:43:36',NULL),('pineapple','食べたい','$2b$10$Icoa61qogxcWD9jfJduWK.Wal0kflJnZzUC760gEouIbxuk1TyeYO','pineapple@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:50:55',NULL),('ulabeler','ゆーらべらー','$2b$10$uquoNVSt/zHP9gUh5pCjCOMVytrjGRX1pBLj6OIUSRvHPs2U7ITXC','develop@na2na.dev','https://mediaulabeler.na2na.website/media/icon/eccb410b-1559-4bdb-b77d-8594022347ef.webp','わーーーーーーーーーーーーーーーーーーーーーーーーーーー\nわーーーーーーーーーーーーーーーーーーーーーーーーーーー','4485805109814218','HAL TARO','0822','2021-11-29 17:34:00',NULL),('yama','山','$2b$10$5yB3XM.C7hWYpVG/mCpgIO7nvEGa8/oCFBhpG0f77qxSlFiTiZKCm','yama@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:45:59',NULL),('yamada','たろう','$2b$10$oruXr9ASfqPw4NPIO3KqEeuIIYZI9s3XK6dG/8T.BkVujcSKcj2Xa','yamada@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:44:28',NULL),('yamafuji','富士山','$2b$10$pJm96bQgYVhhaoDmgacCcOuqIUQtEd5BlrFWxkn.f3jl2zSN.HIwO','yamafuji@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:47:10',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'HAL東京');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work` (
  `id` char(12) NOT NULL,
  `created_by_user_id` varchar(15) NOT NULL,
  `base_category_id` int NOT NULL,
  `name` varchar(40) NOT NULL,
  `work_tex_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) NOT NULL,
  `flag_public` tinyint NOT NULL,
  `unit_price` decimal(10,0) NOT NULL,
  `hashtag` varchar(60) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `num_of_images` tinyint DEFAULT '0',
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `thumbnail_path_UNIQUE` (`thumbnail_path`),
  UNIQUE KEY `work_tex_path_UNIQUE` (`work_tex_path`),
  KEY `F_user_ID_idx` (`created_by_user_id`),
  KEY `F_hashtag_idx` (`hashtag`),
  KEY `category_id_idx` (`base_category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`base_category_id`) REFERENCES `base_category` (`id`),
  CONSTRAINT `user_id_work` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work`
--

LOCK TABLES `work` WRITE;
/*!40000 ALTER TABLE `work` DISABLE KEYS */;
INSERT INTO `work` VALUES ('06cd36182afc','ulabeler',1,'ひまわりのスマホ','https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG','https://mediaulabeler.na2na.website/media/icon/5ec02478-34bb-4838-9f33-a6009f7d9ea2.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('2ade79b60637','ulabeler',1,'ふかふかのおふとんMk.Ⅱ','https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG','https://mediaulabeler.na2na.website/media/icon/6045c8f7-2bbd-4ff1-9af4-8b5b83dc6315.webp',1,600,'[\"#Sony\",\"#α\"]','おふとんが好きなので作りました\r\n',0,'2022-02-02 04:29:22'),('3433777e8916','na2na',1,'ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png','https://mediaulabeler.na2na.website/media/icon/8c542136-9d97-487f-82b0-d35c7b55b3fb.webp',0,700,'[]','ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('4bfa18cdfe55','ulabeler',1,'ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG','https://mediaulabeler.na2na.website/media/icon/a2a9725f-762e-43ef-bad5-93b78e86ffaa.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('6e96f7131583','ulabeler',1,'ひまわりのペットボトル','https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png','https://mediaulabeler.na2na.website/media/icon/c0537141-b852-4171-8ab8-f09a38ddbabc.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('81edff70d7d3','ulabeler',1,'ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG','https://mediaulabeler.na2na.website/media/icon/c7288faf-87e2-4c87-a5e1-f91f6febd1d1.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('b7edc32c2dc0','ulabeler',1,'ひまわりのペットボトル','https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG','https://mediaulabeler.na2na.website/media/icon/cb926201-f13b-4423-8333-da0791e2c947.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('b9e5c437d684','ulabeler',1,'ひまわりのペットボトル','https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG','https://mediaulabeler.na2na.website/media/icon/4d8aa7b7-5da5-4a49-9ade-9709eeece4a3.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('d0a01b45a9f0','ulabeler',1,'ひまわりのペットボトル','https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG','https://mediaulabeler.na2na.website/media/icon/703c78cd-1a35-4695-94fb-7113cb95507c.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('d74dfadaec92','ulabeler',1,'ひまわりのペットボトル','https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png','https://mediaulabeler.na2na.website/media/icon/5964c2d5-b1f6-4f13-a8c2-4889c88654f5.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('db8e43171e68','ulabeler',1,'ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG','https://mediaulabeler.na2na.website/media/icon/b1455744-f982-4f4f-94a1-5740806516dc.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('edf5aa0c1078','ulabeler',1,'ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG','https://mediaulabeler.na2na.website/media/icon/3ce560fc-f2b9-42ba-a4ea-bcace3082a8a.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('fca90358cdec','ulabeler',1,'ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG','https://mediaulabeler.na2na.website/media/icon/eeffec33-7dd1-4582-86fa-a468f1dbf124.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22');
/*!40000 ALTER TABLE `work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_used_stamps`
--

DROP TABLE IF EXISTS `work_used_stamps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_used_stamps` (
  `work_id` char(12) NOT NULL,
  `stamp_settings_id` int NOT NULL,
  `num_used` int DEFAULT NULL,
  PRIMARY KEY (`work_id`,`stamp_settings_id`),
  KEY `id_stamp_idx` (`stamp_settings_id`),
  CONSTRAINT `id_stamp` FOREIGN KEY (`stamp_settings_id`) REFERENCES `stamp_settings` (`id`),
  CONSTRAINT `id_work` FOREIGN KEY (`work_id`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_used_stamps`
--

LOCK TABLES `work_used_stamps` WRITE;
/*!40000 ALTER TABLE `work_used_stamps` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_used_stamps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-26 23:08:23
