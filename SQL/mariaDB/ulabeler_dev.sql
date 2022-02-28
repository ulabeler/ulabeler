-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- ホスト: db
-- 生成日時: 2022 年 2 月 21 日 07:56
-- サーバのバージョン： 5.7.37
-- PHP のバージョン: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `ulabeler_dev`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `administrator`
--

CREATE TABLE `administrator` (
  `id` varchar(15) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `base_category`
--

CREATE TABLE `base_category` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `name_category` varchar(45) NOT NULL,
  `name_subcategory` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `base_category`
--

INSERT INTO `base_category` (`id`, `vendor_id`, `name_category`, `name_subcategory`) VALUES
(1, 1, 'ペットボトル', 'ペットボトル'),
(2, 1, '皿', '皿'),
(3, 1, 'スマホケース', 'iPhone12 mini'),
(4, 1, 'スマホケース', 'iPhone12'),
(5, 1, 'スマホケース', 'iPhone12 Pro'),
(6, 1, 'スマホケース', 'iPhone12 Pro Max'),
(7, 1, 'スマホケース', 'iPhone11'),
(8, 1, 'スマホケース', 'iPhone11 Pro'),
(9, 1, 'スマホケース', 'iPhone8/SE(第二世代)'),
(10, 1, 'スマホケース', 'iPhone7'),
(11, 1, 'スマホケース', 'Xperia Z5'),
(12, 1, 'スマホケース', 'iPhone13'),
(13, 1, 'スマホケース', 'iPhone13 Pro'),
(14, 1, 'スマホケース', 'iPhone13 Pro Max'),
(15, 1, 'お弁当箱', 'お弁当箱'),
(16, 1, 'サーフボード', 'サーフボード'),
(17, 1, '腕時計', '腕時計'),
(18, 1, 'トートバッグ', 'トートバッグ'),
(19, 1, '靴', '靴'),
(20, 1, 'チロルチョコ', 'チロルチョコ'),
(21, 1, 'スマホケース', 'iPhone13 mini');

-- --------------------------------------------------------

--
-- テーブルの構造 `base_settings`
--

CREATE TABLE `base_settings` (
  `id` int(11) NOT NULL,
  `object_path` varchar(255) NOT NULL,
  `base_tex_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `category_settings`
--

CREATE TABLE `category_settings` (
  `name` varchar(45) NOT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `category_settings`
--

INSERT INTO `category_settings` (`name`, `thumbnail_path`, `created_at`) VALUES
('iPhone11', NULL, '2021-11-29 14:47:00'),
('iPhone11 Pro', NULL, '2021-11-29 14:47:00'),
('iPhone12', NULL, '2021-11-29 14:47:00'),
('iPhone12 mini', NULL, '2021-11-29 14:47:00'),
('iPhone12 Pro', NULL, '2021-11-29 14:47:00'),
('iPhone12 Pro Max', NULL, '2021-11-29 14:47:00'),
('iPhone13', NULL, '2021-11-29 14:47:00'),
('iPhone13 mini', NULL, NULL),
('iPhone13 Pro', NULL, '2021-11-29 14:47:00'),
('iPhone13 Pro Max', NULL, '2021-11-29 14:47:00'),
('iPhone13mini', NULL, NULL),
('iPhone7', NULL, '2021-11-29 14:47:00'),
('iPhone8/SE(第二世代)', NULL, '2021-11-29 14:47:00'),
('Xperia Z5', NULL, '2021-11-29 14:47:00'),
('お弁当箱', NULL, '2021-11-29 14:47:00'),
('サーフボード', NULL, '2021-11-29 14:47:00'),
('チロルチョコ', NULL, '2021-11-29 14:47:00'),
('トートバッグ', NULL, '2021-11-29 14:47:00'),
('ペットボトル', NULL, '2021-11-29 14:47:00'),
('皿', NULL, '2021-11-29 14:47:00'),
('腕時計', NULL, '2021-11-29 14:47:00'),
('靴', NULL, '2021-11-29 14:47:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `delivery_address`
--

CREATE TABLE `delivery_address` (
  `user_id` varchar(15) NOT NULL,
  `updated_at` datetime NOT NULL,
  `zip_code` char(7) NOT NULL,
  `address` varchar(255) NOT NULL,
  `familyname` varchar(15) NOT NULL,
  `firstname` varchar(15) NOT NULL,
  `familyname_furigana` varchar(45) NOT NULL,
  `firstname_furigana` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `delivery_address`
--

INSERT INTO `delivery_address` (`user_id`, `updated_at`, `zip_code`, `address`, `familyname`, `firstname`, `familyname_furigana`, `firstname_furigana`) VALUES
('user1', '2022-02-21 07:41:14', '1880013', '東京都西東京市向台町', 'タカハシ', 'リョウタ', '', '');

-- --------------------------------------------------------

--
-- テーブルの構造 `delivery_status`
--

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
  `updated_at` datetime DEFAULT NULL COMMENT 'ユーザー購入履歴/管理画面で対象ページアクセスしたときに入れる'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `favorited_user`
--

CREATE TABLE `favorited_user` (
  `favorite_from` varchar(15) NOT NULL,
  `favorite_to` varchar(15) NOT NULL,
  `favorited_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `favorited_user_number`
--

CREATE TABLE `favorited_user_number` (
  `favorited_to_id` varchar(15) NOT NULL,
  `number` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `favorited_work`
--

CREATE TABLE `favorited_work` (
  `favorite_from` varchar(15) NOT NULL,
  `favorite_to` char(12) NOT NULL,
  `favorited_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `favorited_work_number`
--

CREATE TABLE `favorited_work_number` (
  `favorited_to_id` char(12) NOT NULL,
  `number` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `favorited_work_number`
--

INSERT INTO `favorited_work_number` (`favorited_to_id`, `number`) VALUES
('075ca3abed20', 0),
('2af3bd03cd1c', 0),
('70c1b0f0dd81', 0),
('7bcd780bbbe9', 0),
('e1094112f537', 0);

-- --------------------------------------------------------

--
-- テーブルの構造 `inquiry`
--

CREATE TABLE `inquiry` (
  `id` int(11) NOT NULL,
  `user_id` varchar(15) NOT NULL,
  `category` tinyint(4) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(45) NOT NULL,
  `mail_address` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL COMMENT '「受付済み」\n「対応中」\n「対応済み」',
  `reply` text,
  `replyed_by_user_id` varchar(15) NOT NULL COMMENT '運営対応者id\n',
  `posted_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL COMMENT '対応中、とか対応済み、とかそういうのを入れる'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `mail_confirmation`
--

CREATE TABLE `mail_confirmation` (
  `user_id` varchar(15) NOT NULL,
  `datetime_issue` datetime NOT NULL,
  `mailaddress_new` varchar(255) DEFAULT NULL,
  `token_confirmation` char(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `password_reset`
--

CREATE TABLE `password_reset` (
  `id` varchar(15) NOT NULL,
  `datetime_issue` datetime NOT NULL,
  `temp_password` varchar(255) NOT NULL,
  `token` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `purchase_history`
--

CREATE TABLE `purchase_history` (
  `id` varchar(20) NOT NULL,
  `user_id` varchar(15) NOT NULL,
  `items` json NOT NULL,
  `number_invoice` varchar(20) NOT NULL,
  `purchased_at` datetime DEFAULT NULL,
  `payment_method` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `reported_to_user_id` varchar(15) NOT NULL,
  `reported_from_user_id` varchar(15) NOT NULL,
  `category_id` tinyint(4) NOT NULL,
  `reported_description` text NOT NULL,
  `reported_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `sample_images`
--

CREATE TABLE `sample_images` (
  `id` int(11) NOT NULL,
  `sample_images_path` varchar(255) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `stamp_settings`
--

CREATE TABLE `stamp_settings` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `unit_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `stamp_settings`
--

INSERT INTO `stamp_settings` (`id`, `name`, `img_path`, `unit_price`) VALUES
(1, 'flower', '/images/stamps/flower.png', 15),
(2, 'lemon', '/images/stamps/lemon.png', 15),
(3, 'apple', '/images/stamps/apple.png', 15),
(4, 'doughnut', '/images/stamps/doughnut.png', 15);

-- --------------------------------------------------------

--
-- テーブルの構造 `user`
--

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
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `mailaddress`, `icon_path`, `self_introduction`, `cardnumber`, `name_card`, `expiration`, `created_at`, `deleted_at`) VALUES
('ulabeler', 'ゆーざー', 'u', 'ulabeler.07@gmail.com', NULL, 'よろ', '4485805109814218', 'HAL TARO', '0822', '2021-11-29 17:34:00', NULL),
('user1', 'user1', 'user1', 'user@icloud.com', NULL, NULL, '1111111111111111', 'sample', '', '2022-02-21 07:20:45', NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `vendor`
--

INSERT INTO `vendor` (`id`, `name`) VALUES
(1, 'HAL東京');

-- --------------------------------------------------------

--
-- テーブルの構造 `work`
--

CREATE TABLE `work` (
  `id` char(12) NOT NULL,
  `created_by_user_id` varchar(15) NOT NULL,
  `base_category_id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `work_tex_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `flag_public` tinyint(4) DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `hashtag` varchar(60) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `num_of_images` tinyint(4) DEFAULT '0',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `work`
--

INSERT INTO `work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `hashtag`, `introduction`, `num_of_images`, `create_at`) VALUES
('06cd36182afc', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG', 'https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22'),
('075ca3abed20', 'user1', 17, 'sample', 'd0dec62c-909e-4261-85a8-f1e3b755aa38', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, '2022-02-21 07:45:55'),
('2ade79b60637', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG', 'https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, '2022-02-02 04:29:22'),
('2af3bd03cd1c', 'user1', 18, 'dd', '1ce98f08-b202-4ad2-9e0b-63ee098e26c5', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, '2022-02-21 07:35:04'),
('3433777e8916', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png', 'https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22'),
('4bfa18cdfe55', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG', 'https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22'),
('6e96f7131583', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png', 'https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, '2022-02-02 04:29:22'),
('70c1b0f0dd81', 'user1', 18, 'sample', '571f11db-bc56-4ca3-9823-a451763b227a', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, '2022-02-21 07:41:26'),
('7bcd780bbbe9', 'user1', 17, 'sample', '2ce86be5-c402-4473-9417-1aac77e961ff', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, '2022-02-21 07:49:07'),
('81edff70d7d3', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG', 'https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22'),
('b7edc32c2dc0', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG', 'https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, '2022-02-02 04:29:22'),
('b9e5c437d684', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG', 'https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, '2022-02-02 04:29:22'),
('d0a01b45a9f0', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG', 'https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, '2022-02-02 04:29:22'),
('d74dfadaec92', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png', 'https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, '2022-02-02 04:29:22'),
('db8e43171e68', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG', 'https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22'),
('e1094112f537', 'user1', 17, 'sample', 'df673960-7c2d-4012-a532-106e80eb5366', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, '2022-02-21 07:37:03'),
('edf5aa0c1078', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG', 'https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22'),
('fca90358cdec', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG', 'https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, '2022-02-02 04:31:22');

-- --------------------------------------------------------

--
-- テーブルの構造 `work_used_stamps`
--

CREATE TABLE `work_used_stamps` (
  `work_id` char(12) NOT NULL,
  `stamp_settings_id` int(11) NOT NULL,
  `num_used` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `base_category`
--
ALTER TABLE `base_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendor_id` (`vendor_id`),
  ADD KEY `category_settings_name` (`name_subcategory`);

--
-- テーブルのインデックス `base_settings`
--
ALTER TABLE `base_settings`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `category_settings`
--
ALTER TABLE `category_settings`
  ADD PRIMARY KEY (`name`);

--
-- テーブルのインデックス `delivery_address`
--
ALTER TABLE `delivery_address`
  ADD PRIMARY KEY (`user_id`,`updated_at`);

--
-- テーブルのインデックス `delivery_status`
--
ALTER TABLE `delivery_status`
  ADD PRIMARY KEY (`purchase_record_id`);

--
-- テーブルのインデックス `favorited_user`
--
ALTER TABLE `favorited_user`
  ADD PRIMARY KEY (`favorite_from`,`favorite_to`),
  ADD KEY `user_id_fav_user_to` (`favorite_to`);

--
-- テーブルのインデックス `favorited_user_number`
--
ALTER TABLE `favorited_user_number`
  ADD PRIMARY KEY (`favorited_to_id`);

--
-- テーブルのインデックス `favorited_work`
--
ALTER TABLE `favorited_work`
  ADD PRIMARY KEY (`favorite_from`,`favorite_to`),
  ADD KEY `work_id_fav_work` (`favorite_to`);

--
-- テーブルのインデックス `favorited_work_number`
--
ALTER TABLE `favorited_work_number`
  ADD PRIMARY KEY (`favorited_to_id`);

--
-- テーブルのインデックス `inquiry`
--
ALTER TABLE `inquiry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_inq` (`user_id`),
  ADD KEY `admin_id_inq` (`replyed_by_user_id`);

--
-- テーブルのインデックス `mail_confirmation`
--
ALTER TABLE `mail_confirmation`
  ADD PRIMARY KEY (`user_id`,`datetime_issue`);

--
-- テーブルのインデックス `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`,`datetime_issue`);

--
-- テーブルのインデックス `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_purchase` (`user_id`);

--
-- テーブルのインデックス `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_report_to` (`reported_to_user_id`),
  ADD KEY `user_id_report_from` (`reported_from_user_id`);

--
-- テーブルのインデックス `sample_images`
--
ALTER TABLE `sample_images`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `stamp_settings`
--
ALTER TABLE `stamp_settings`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_work` (`created_by_user_id`),
  ADD KEY `category_id` (`base_category_id`);

--
-- テーブルのインデックス `work_used_stamps`
--
ALTER TABLE `work_used_stamps`
  ADD PRIMARY KEY (`work_id`,`stamp_settings_id`),
  ADD KEY `id_stamp` (`stamp_settings_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `base_category`
--
ALTER TABLE `base_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- テーブルの AUTO_INCREMENT `base_settings`
--
ALTER TABLE `base_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `inquiry`
--
ALTER TABLE `inquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `sample_images`
--
ALTER TABLE `sample_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `stamp_settings`
--
ALTER TABLE `stamp_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルの AUTO_INCREMENT `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `base_category`
--
ALTER TABLE `base_category`
  ADD CONSTRAINT `category_settings_name` FOREIGN KEY (`name_subcategory`) REFERENCES `category_settings` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `base_settings`
--
ALTER TABLE `base_settings`
  ADD CONSTRAINT `T_category_id` FOREIGN KEY (`id`) REFERENCES `base_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `delivery_address`
--
ALTER TABLE `delivery_address`
  ADD CONSTRAINT `user_id_delivery_addr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `delivery_status`
--
ALTER TABLE `delivery_status`
  ADD CONSTRAINT `purchase_record_id` FOREIGN KEY (`purchase_record_id`) REFERENCES `purchase_history` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `favorited_user`
--
ALTER TABLE `favorited_user`
  ADD CONSTRAINT `user_id_fav_user_from` FOREIGN KEY (`favorite_from`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id_fav_user_to` FOREIGN KEY (`favorite_to`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `favorited_user_number`
--
ALTER TABLE `favorited_user_number`
  ADD CONSTRAINT `user_id_favnum_user` FOREIGN KEY (`favorited_to_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `favorited_work`
--
ALTER TABLE `favorited_work`
  ADD CONSTRAINT `user_id_fav_work` FOREIGN KEY (`favorite_from`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `work_id_fav_work` FOREIGN KEY (`favorite_to`) REFERENCES `work` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `favorited_work_number`
--
ALTER TABLE `favorited_work_number`
  ADD CONSTRAINT `favorited_to_id` FOREIGN KEY (`favorited_to_id`) REFERENCES `work` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `inquiry`
--
ALTER TABLE `inquiry`
  ADD CONSTRAINT `admin_id_inq` FOREIGN KEY (`replyed_by_user_id`) REFERENCES `administrator` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id_inq` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `mail_confirmation`
--
ALTER TABLE `mail_confirmation`
  ADD CONSTRAINT `user_id_main_confim` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `password_reset`
--
ALTER TABLE `password_reset`
  ADD CONSTRAINT `user_id_pass_reset` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD CONSTRAINT `user_id_purchase` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `user_id_report_from` FOREIGN KEY (`reported_from_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id_report_to` FOREIGN KEY (`reported_to_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `work`
--
ALTER TABLE `work`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`base_category_id`) REFERENCES `base_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id_work` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `work_used_stamps`
--
ALTER TABLE `work_used_stamps`
  ADD CONSTRAINT `id_stamp` FOREIGN KEY (`stamp_settings_id`) REFERENCES `stamp_settings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_work` FOREIGN KEY (`work_id`) REFERENCES `work` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
