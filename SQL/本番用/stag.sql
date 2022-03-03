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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_category`
--

LOCK TABLES `base_category` WRITE;
/*!40000 ALTER TABLE `base_category` DISABLE KEYS */;
INSERT INTO `base_category` VALUES (1,1,'ペットボトル','ペットボトル'),(2,1,'皿','皿'),(3,1,'スマホケース','iPhone12 mini'),(4,1,'スマホケース','iPhone12'),(5,1,'スマホケース','iPhone12 Pro'),(6,1,'スマホケース','iPhone12 Pro Max'),(7,1,'スマホケース','iPhone11'),(8,1,'スマホケース','iPhone11 Pro'),(9,1,'スマホケース','iPhone8/SE(第二世代)'),(10,1,'スマホケース','iPhone7'),(11,1,'スマホケース','Xperia Z5'),(12,1,'スマホケース','iPhone13'),(13,1,'スマホケース','iPhone13 Pro'),(14,1,'スマホケース','iPhone13 Pro Max'),(15,1,'お弁当箱','お弁当箱'),(16,1,'サーフボード','サーフボード'),(17,1,'腕時計','腕時計'),(18,1,'トートバッグ','トートバッグ'),(19,1,'靴','靴'),(20,1,'チロルチョコ','チロルチョコ'),(21,1,'スマホケース','iPhone13 mini'),(22,1,'スマホケース','iPhone7'),(23,1,'トートバッグ','トートバッグ');
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
  `object_path` varchar(255) DEFAULT NULL,
  `base_tex_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) NOT NULL,
  `unit_price` int NOT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `T_category_id` FOREIGN KEY (`id`) REFERENCES `base_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_settings`
--

LOCK TABLES `base_settings` WRITE;
/*!40000 ALTER TABLE `base_settings` DISABLE KEYS */;
INSERT INTO `base_settings` VALUES (1,NULL,'/images/object/pet500.png','/images/object/pet500.png',200,'2022-03-01 04:31:22',NULL),(2,NULL,'/images/object/saucer2.png','/images/object/saucer2.png',500,'2022-03-01 04:31:22',NULL),(3,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1200,'2022-03-01 04:31:22',NULL),(4,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1200,'2022-03-01 04:31:22',NULL),(5,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1300,'2022-03-01 04:31:22',NULL),(6,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1300,'2022-03-01 04:31:22',NULL),(7,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1100,'2022-03-01 04:31:22',NULL),(8,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1200,'2022-03-01 04:31:22',NULL),(12,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1400,'2022-03-01 04:31:22',NULL),(13,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1400,'2022-03-01 04:31:22',NULL),(14,NULL,'/images/object/iphone13.png','/images/object/iphone13.png',1400,'2022-03-01 04:31:22',NULL),(17,NULL,'/images/object/watch.png','/images/object/watch.png',1400,'2022-03-01 04:31:22',NULL),(20,NULL,'/images/object/tirol.png','/images/object/tirol.png',20,'2022-03-01 04:31:22',NULL),(21,NULL,'/images/object/iphone13 mini.png','/images/object/iphone13.png',1400,'2022-03-01 04:31:22',NULL),(22,NULL,'/images/object/iphone7.png','/images/object/iphone7.png',1100,'2022-03-01 04:31:22',NULL),(23,NULL,'/images/object/bag.png','/images/object/bag.png',1200,'2022-03-01 04:31:22',NULL);
/*!40000 ALTER TABLE `base_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `workId` char(12) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `quantity` smallint NOT NULL,
  PRIMARY KEY (`workId`,`userId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `workId` FOREIGN KEY (`workId`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
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
  `datetime_scheduled` varchar(20) DEFAULT NULL COMMENT '配送予定日時\\\\n例)\\\\n08/30　08:00-12:00',
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
  `description` json NOT NULL,
  `name` varchar(45) NOT NULL,
  `mail_address` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL COMMENT '「受付済み」\\\\n「対応中」\\\\n「対応済み」',
  `reply` json DEFAULT NULL,
  `replyed_by_user_id` varchar(15) NOT NULL COMMENT '運営対応者id\\\\n',
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
  `number_invoice` varchar(20) DEFAULT NULL,
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
-- Table structure for table `purchased_history_item`
--

DROP TABLE IF EXISTS `purchased_history_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchased_history_item` (
  `purchase_history_id` varchar(20) NOT NULL,
  `work_id` char(12) NOT NULL,
  `quantity` smallint NOT NULL,
  PRIMARY KEY (`purchase_history_id`,`work_id`),
  KEY `work_id_idx` (`work_id`),
  CONSTRAINT `purchase_history_id` FOREIGN KEY (`purchase_history_id`) REFERENCES `purchase_history` (`id`),
  CONSTRAINT `work_id` FOREIGN KEY (`work_id`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchased_history_item`
--

LOCK TABLES `purchased_history_item` WRITE;
/*!40000 ALTER TABLE `purchased_history_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchased_history_item` ENABLE KEYS */;
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
-- Table structure for table `tempdeliverysettings`
--

DROP TABLE IF EXISTS `tempdeliverysettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempdeliverysettings` (
  `userId` varchar(15) NOT NULL,
  `estimatedDeliveryDate` datetime NOT NULL,
  `estimatedDeliveryTimeCategory` varchar(45) NOT NULL,
  `effectiveDate` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempdeliverysettings`
--

LOCK TABLES `tempdeliverysettings` WRITE;
/*!40000 ALTER TABLE `tempdeliverysettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `tempdeliverysettings` ENABLE KEYS */;
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
  `hashtag` json DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `num_of_images` tinyint DEFAULT '0',
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `thumbnail_path_UNIQUE` (`thumbnail_path`),
  UNIQUE KEY `work_tex_path_UNIQUE` (`work_tex_path`),
  KEY `F_user_ID_idx` (`created_by_user_id`),
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

-- Dump completed on 2022-03-04  6:09:26
