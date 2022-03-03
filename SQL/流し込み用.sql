USE `ulabeler_dev`;

LOCK TABLES `base_category` WRITE;
/*!40000 ALTER TABLE `base_category` DISABLE KEYS */;
INSERT INTO `base_category` VALUES (1,1,'ペットボトル','ペットボトル'),(2,1,'皿','皿'),(3,1,'スマホケース','iPhone12 mini'),(4,1,'スマホケース','iPhone12'),(5,1,'スマホケース','iPhone12 Pro'),(6,1,'スマホケース','iPhone12 Pro Max'),(7,1,'スマホケース','iPhone11'),(8,1,'スマホケース','iPhone11 Pro'),(9,1,'スマホケース','iPhone8/SE(第二世代)'),(10,1,'スマホケース','iPhone7'),(11,1,'スマホケース','Xperia Z5'),(12,1,'スマホケース','iPhone13'),(13,1,'スマホケース','iPhone13 Pro'),(14,1,'スマホケース','iPhone13 Pro Max'),(15,1,'お弁当箱','お弁当箱'),(16,1,'サーフボード','サーフボード'),(17,1,'腕時計','腕時計'),(18,1,'トートバッグ','トートバッグ'),(19,1,'靴','靴'),(20,1,'チロルチョコ','チロルチョコ');
/*!40000 ALTER TABLE `base_category` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `category_settings` WRITE;
/*!40000 ALTER TABLE `category_settings` DISABLE KEYS */;
INSERT INTO `category_settings` VALUES ('iPhone11',NULL,'2021-11-29 14:47:00'),('iPhone11 Pro',NULL,'2021-11-29 14:47:00'),('iPhone12',NULL,'2021-11-29 14:47:00'),('iPhone12 mini',NULL,'2021-11-29 14:47:00'),('iPhone12 Pro',NULL,'2021-11-29 14:47:00'),('iPhone12 Pro Max',NULL,'2021-11-29 14:47:00'),('iPhone13',NULL,'2021-11-29 14:47:00'),('iPhone13 Pro',NULL,'2021-11-29 14:47:00'),('iPhone13 Pro Max',NULL,'2021-11-29 14:47:00'),('iPhone7',NULL,'2021-11-29 14:47:00'),('iPhone8/SE(第二世代)',NULL,'2021-11-29 14:47:00'),('Xperia Z5',NULL,'2021-11-29 14:47:00'),('お弁当箱',NULL,'2021-11-29 14:47:00'),('サーフボード',NULL,'2021-11-29 14:47:00'),('チロルチョコ',NULL,'2021-11-29 14:47:00'),('トートバッグ',NULL,'2021-11-29 14:47:00'),('ペットボトル',NULL,'2021-11-29 14:47:00'),('皿',NULL,'2021-11-29 14:47:00'),('腕時計',NULL,'2021-11-29 14:47:00'),('靴',NULL,'2021-11-29 14:47:00');
/*!40000 ALTER TABLE `category_settings` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `favorited_user` WRITE;
/*!40000 ALTER TABLE `favorited_user` DISABLE KEYS */;
INSERT INTO `favorited_user` VALUES ('na2na','ulabeler','2022-02-26 15:15:52'),('ulabeler','2na2','2022-02-25 16:08:01'),('ulabeler','apple','2022-02-26 08:42:54'),('ulabeler','kobayasi','2022-02-26 08:43:09'),('ulabeler','orange','2022-02-26 08:45:13'),('ulabeler','pineapple','2022-02-26 08:45:19'),('ulabeler','ulabeler','2022-02-25 16:51:24'),('ulabeler','yama','2022-02-26 08:45:24'),('ulabeler','yamada','2022-02-26 08:45:30'),('ulabeler','yamafuji','2022-02-26 08:45:36');
/*!40000 ALTER TABLE `favorited_user` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `favorited_user_number` WRITE;
/*!40000 ALTER TABLE `favorited_user_number` DISABLE KEYS */;
INSERT INTO `favorited_user_number` VALUES ('2na2',1),('apple',1),('kobayasi',1),('na2na',0),('nagarebosi',0),('orange',1),('pineapple',1),('ulabeler',2),('yama',1),('yamada',1),('yamafuji',1);
/*!40000 ALTER TABLE `favorited_user_number` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `favorited_work` WRITE;
/*!40000 ALTER TABLE `favorited_work` DISABLE KEYS */;
INSERT INTO `favorited_work` VALUES ('na2na','06cd36182afc','2022-02-26 23:31:00'),('na2na','2ade79b60637','2022-02-26 23:19:14'),('na2na','3433777e8916','2022-02-27 01:09:10'),('na2na','6e96f7131583','2022-02-26 23:18:18'),('na2na','81edff70d7d3','2022-02-26 23:25:05'),('na2na','b7edc32c2dc0','2022-02-26 22:12:49'),('na2na','b9e5c437d684','2022-02-26 22:12:51'),('na2na','db8e43171e68','2022-02-26 23:24:25'),('na2na','edf5aa0c1078','2022-02-26 23:17:28'),('na2na','fca90358cdec','2022-02-26 23:16:22'),('ulabeler','2ade79b60637','2022-02-25 15:16:27'),('ulabeler','3433777e8916','2022-02-26 15:01:15'),('ulabeler','4bfa18cdfe55','2022-02-25 15:33:54'),('ulabeler','b7edc32c2dc0','2022-02-23 03:28:02'),('ulabeler','b9e5c437d684','2022-02-25 04:44:11'),('ulabeler','db8e43171e68','2022-02-25 15:30:08'),('ulabeler','fca90358cdec','2022-02-25 15:29:29');
/*!40000 ALTER TABLE `favorited_work` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `favorited_work_number` WRITE;
/*!40000 ALTER TABLE `favorited_work_number` DISABLE KEYS */;
INSERT INTO `favorited_work_number` VALUES ('06cd36182afc',1),('2ade79b60637',2),('3433777e8916',2),('4bfa18cdfe55',1),('6e96f7131583',1),('81edff70d7d3',1),('b7edc32c2dc0',2),('b9e5c437d684',2),('d0a01b45a9f0',0),('d74dfadaec92',0),('db8e43171e68',2),('edf5aa0c1078',1),('fca90358cdec',2);
/*!40000 ALTER TABLE `favorited_work_number` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `inquiry` WRITE;
/*!40000 ALTER TABLE `inquiry` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiry` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `mail_confirmation` WRITE;
/*!40000 ALTER TABLE `mail_confirmation` DISABLE KEYS */;
INSERT INTO `mail_confirmation` VALUES ('ulabeler','2022-02-20 02:21:40','na2na@na2na.dev','0908');
/*!40000 ALTER TABLE `mail_confirmation` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'ulabeler','na2na',2,'食欲を誘う非常に悪質な表現','2022-02-08 01:52:21');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `stamp_settings` WRITE;
/*!40000 ALTER TABLE `stamp_settings` DISABLE KEYS */;
INSERT INTO `stamp_settings` VALUES (1,'flower','/images/stamps/flower.png',15),(2,'lemon','/images/stamps/lemon.png',15),(3,'apple','/images/stamps/apple.png',15),(4,'doughnut','/images/stamps/doughnut.png',15);
/*!40000 ALTER TABLE `stamp_settings` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2na2','2na2','$2b$10$V5oRKJNbhAUSzPLHYnfSn.a8SsUxuYkWlLuB.9aojGqWSGzPfTC4.','2na2@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-25 02:56:54',NULL),('apple','りんご','$2b$10$Qpwt77mBHR1kKdAMiOA34ek/8ida.2bOd3uT.hVUxLTG9l/1jCgfu','apple@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-25 16:58:44',NULL),('kobayasi','しょーちゃん','$2b$10$jh7B5dqQ7g0oAfcY7xXIMOTlamyq42x/TxKA989Qq6sGj7WmYgNPO','kobayasi@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:45:02',NULL),('na2na','なずな','$2b$10$4Xz2Prm2AyS.NMwjL.w5RuvWtCuV1FiQQUoEPNsw0K.PeJSuSZ.1a','na2na@na2na.dev','https://mediaulabeler.na2na.website/media/icon/08a6f660-aa31-42e5-9dcb-05d0805c3215.webp','にゃーん',NULL,NULL,NULL,'2022-02-08 00:41:52',NULL),('nagarebosi','赤ちゃん','$2b$10$2Zgei.4ZUGbjTJadIIg/v.6D92DOpLClnx5lg8X9flHEIz.6ty9UK','nagarebosi@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:45:34',NULL),('orange','みかん','$2b$10$UlSnJdB5mrIt/oqEzTIDKOiIQZqeZSuVEf6J2WlOpVzDtum2BxNHm','orange@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:43:36',NULL),('pineapple','食べたい','$2b$10$Icoa61qogxcWD9jfJduWK.Wal0kflJnZzUC760gEouIbxuk1TyeYO','pineapple@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:50:55',NULL),('ulabeler','ゆーらべらー','$2b$10$uquoNVSt/zHP9gUh5pCjCOMVytrjGRX1pBLj6OIUSRvHPs2U7ITXC','develop@na2na.dev','https://mediaulabeler.na2na.website/media/icon/eccb410b-1559-4bdb-b77d-8594022347ef.webp','わーーーーーーーーーーーーーーーーーーーーーーーーーーー\nわーーーーーーーーーーーーーーーーーーーーーーーーーーー','4485805109814218','HAL TARO','0822','2021-11-29 17:34:00',NULL),('yama','山','$2b$10$5yB3XM.C7hWYpVG/mCpgIO7nvEGa8/oCFBhpG0f77qxSlFiTiZKCm','yama@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:45:59',NULL),('yamada','たろう','$2b$10$oruXr9ASfqPw4NPIO3KqEeuIIYZI9s3XK6dG/8T.BkVujcSKcj2Xa','yamada@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:44:28',NULL),('yamafuji','富士山','$2b$10$pJm96bQgYVhhaoDmgacCcOuqIUQtEd5BlrFWxkn.f3jl2zSN.HIwO','yamafuji@na2na.dev','https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png',NULL,NULL,NULL,NULL,'2022-02-26 07:47:10',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'HAL東京');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `work` WRITE;
/*!40000 ALTER TABLE `work` DISABLE KEYS */;
INSERT INTO `work` VALUES ('06cd36182afc','ulabeler',1,'ひまわりのスマホ','https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG','https://mediaulabeler.na2na.website/media/icon/5ec02478-34bb-4838-9f33-a6009f7d9ea2.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('2ade79b60637','na2na',1,'ふかふかのおふとんMk.Ⅱ','https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG','https://mediaulabeler.na2na.website/media/icon/6045c8f7-2bbd-4ff1-9af4-8b5b83dc6315.webp',1,600,'[\"#Sony\", \"#α\"]','おふとんが好きなので作りました\r\n',0,'2022-02-02 04:29:22'),('3433777e8916','na2na',1,'1ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png','https://mediaulabeler.na2na.website/media/icon/8c542136-9d97-487f-82b0-d35c7b55b3fb.webp',0,700,'[]','ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('4bfa18cdfe55','ulabeler',1,'2ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG','https://mediaulabeler.na2na.website/media/icon/a2a9725f-762e-43ef-bad5-93b78e86ffaa.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('6e96f7131583','ulabeler',1,'3ひまわりのペットボトル','https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png','https://mediaulabeler.na2na.website/media/icon/c0537141-b852-4171-8ab8-f09a38ddbabc.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('81edff70d7d3','ulabeler',1,'4ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG','https://mediaulabeler.na2na.website/media/icon/c7288faf-87e2-4c87-a5e1-f91f6febd1d1.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('b7edc32c2dc0','ulabeler',1,'5ひまわりのペットボトル','https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG','https://mediaulabeler.na2na.website/media/icon/cb926201-f13b-4423-8333-da0791e2c947.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('b9e5c437d684','ulabeler',1,'6ひまわりのペットボトル','https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG','https://mediaulabeler.na2na.website/media/icon/4d8aa7b7-5da5-4a49-9ade-9709eeece4a3.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('d0a01b45a9f0','ulabeler',1,'7ひまわりのペットボトル','https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG','https://mediaulabeler.na2na.website/media/icon/703c78cd-1a35-4695-94fb-7113cb95507c.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('d74dfadaec92','na2na',1,'8ひまわりのペットボトル','https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png','https://mediaulabeler.na2na.website/media/icon/5964c2d5-b1f6-4f13-a8c2-4889c88654f5.webp',1,600,NULL,'ひまわりが大好きなので作りました。いぇい',0,'2022-02-02 04:29:22'),('db8e43171e68','ulabeler',1,'9ひまわりのペットボトル2','https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG','https://mediaulabeler.na2na.website/media/icon/b1455744-f982-4f4f-94a1-5740806516dc.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('edf5aa0c1078','ulabeler',1,'aひまわりのペットボトル2','https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG','https://mediaulabeler.na2na.website/media/icon/3ce560fc-f2b9-42ba-a4ea-bcace3082a8a.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22'),('fca90358cdec','ulabeler',1,'bひまわりのペットボトル2','https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG','https://mediaulabeler.na2na.website/media/icon/eeffec33-7dd1-4582-86fa-a468f1dbf124.webp',1,700,NULL,'ひまわりが大好きなので作りました。',0,'2022-02-02 04:31:22');
/*!40000 ALTER TABLE `work` ENABLE KEYS */;
UNLOCK TABLES;

-- 注文履歴
INSERT INTO `ulabeler_dev`.`purchase_history` (`id`, `user_id`, `purchased_at`, `payment_method`) VALUES ('5e33cf927358', 'na2na', '2022-02-27 12:29:22', 'クレジットカード');
INSERT INTO `ulabeler_dev`.`purchase_history` (`id`, `user_id`, `purchased_at`, `payment_method`) VALUES ('dbd446585adf', 'na2na', '2022-02-26 12:29:22', 'クレジットカード');

INSERT INTO `ulabeler_dev`.`purchased_history_item` (`purchase_history_id`, `work_id`, `quantity`) VALUES ('5e33cf927358', '2ade79b60637', '3');
INSERT INTO `ulabeler_dev`.`purchased_history_item` (`purchase_history_id`, `work_id`, `quantity`) VALUES ('5e33cf927358', 'b9e5c437d684', '2');
INSERT INTO `ulabeler_dev`.`purchased_history_item` (`purchase_history_id`, `work_id`, `quantity`) VALUES ('dbd446585adf', 'b9e5c437d684', '10');
INSERT INTO `ulabeler_dev`.`purchased_history_item` (`purchase_history_id`, `work_id`, `quantity`) VALUES ('dbd446585adf', '2ade79b60637', '20');

INSERT INTO `ulabeler_dev`.`base_category` (`id`, `vendor_id`, `name_category`, `name_subcategory`) VALUES ('21', '1', 'スマホケース', 'iPhone13 mini');
INSERT INTO `ulabeler_dev`.`base_category` (`id`, `vendor_id`, `name_category`, `name_subcategory`) VALUES ('22', '1', 'スマホケース', 'iPhone7');

INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('1', '/images/object/pet500.png', '/images/object/pet500.png', '200', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('2', '/images/object/saucer2.png', '/images/object/saucer2.png', '500', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('3', '/images/object/iphone12 mini.png', '/images/object/iphone12 mini.png', '1200', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('4', '/images/object/iphone12.png', '/images/object/iphone12.png', '1200', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('5', '/images/object/iphone12 pro.png', '/images/object/iphone12 pro.png', '1300', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('6', '/images/object/iphone12 promax', '/images/object/iphone12 promax', '1300', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('7', '/images/object/iphone11.png', '/images/object/iphone11.png', '1100', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('8', '/images/object/iphone11 pro.png', '/images/object/iphone11 pro.png', '1200', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('12', '/images/object/iphone13.png', '/images/object/iphone13.png', '1400', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('13', '/images/object/iphone13 pro.png', '/images/object/iphone13 pro.png', '1400', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('14', '/images/object/iphone13 promax.png', '/images/object/iphone13 promax.png', '1400', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('17', '/images/object/watch.png', '/images/object/watch.png', '1400', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('20', '/images/object/tirol.png', '/images/object/tirol.png', '20', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('21', '/images/object/iphone13 mini.png', '/images/object/iphone13 mini.png', '1400', '2022-03-01 04:31:22');
INSERT INTO `ulabeler_dev`.`base_settings` (`id`, `base_tex_path`, `thumbnail_path`, `unit_price`, `created_at`) VALUES ('22', '/images/object/iphone7.png', '/images/object/iphone7.png', '1100', '2022-03-01 04:31:22');
