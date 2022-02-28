-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- ホスト: db
-- 生成日時: 2022 年 2 月 28 日 13:04
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
(21, 1, 'スマホケース', 'iPhone13 mini'),
(22, 1, 'スマホケース', 'iPhone7');

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
('user1', '2022-02-27 06:39:53', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ'),
('user1', '2022-02-27 07:12:29', '', '', '', '', '', '');

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

--
-- テーブルのデータのダンプ `delivery_status`
--

INSERT INTO `delivery_status` (`purchase_record_id`, `datetime_scheduled`, `current_status`, `zip_code`, `address`, `familyname`, `firstname`, `familyname_furigana`, `firstname_furigana`, `datetime_results`, `updated_at`) VALUES
('16f072279021', NULL, '未発送', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ', NULL, NULL),
('5e2c77cd471f', NULL, '未発送', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ', NULL, NULL),
('86681cb59afb', NULL, '未発送', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ', NULL, NULL),
('98eedc4b5a9a', NULL, '未発送', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ', NULL, NULL),
('ae60b7a53b27', NULL, '未発送', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ', NULL, NULL),
('e0c764d6ff8c', NULL, '未発送', '', '', '', '', '', '', NULL, NULL),
('ec926503d4c7', '2022:2:30 18時～20時', '未発送', '1880013', '東京都新宿区１丁目', 'タカハシ', 'リョウタ', 'タカハシ', 'リョウタ', NULL, NULL);

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
('06442a93abe9', 0),
('075ca3abed20', 0),
('0a69b446d622', 0),
('0ae79c35d5d9', 0),
('0f0ce02ebf2b', 0),
('107364614914', 0),
('12b30555aa19', 0),
('16ee5657d239', 0),
('183bcef13935', 0),
('1f6e1208b160', 0),
('204e8c3b0540', 0),
('21a29c06ade2', 0),
('264e1e2d11ec', 0),
('2af3bd03cd1c', 0),
('2b571a82d83c', 0),
('3354c38bdfa4', 0),
('33e49d42aeb5', 0),
('3470f20d89bc', 0),
('34e467936236', 0),
('3509822c79fb', 0),
('371d028d9e6b', 0),
('3d4f2496214e', 0),
('3dc74e75e653', 0),
('3e5eacad8b26', 0),
('43a8b69caf20', 0),
('49469ff69d18', 0),
('494dbeb5aac7', 0),
('4d1f0e983e2a', 0),
('4ec21f586f63', 0),
('58a726bde300', 0),
('58adbfe628d2', 0),
('5d743f414b3a', 0),
('60d68066193b', 0),
('62d29336a620', 0),
('6ba2f64bd76f', 0),
('6c377fa9a79f', 0),
('6ca819e4d3dd', 0),
('706237345bce', 0),
('70c1b0f0dd81', 0),
('723fd587fc2c', 0),
('7503ec1349d3', 0),
('766f4c12fad7', 0),
('78985f18d4fd', 0),
('7b753c97b559', 0),
('7bbffbd4f611', 0),
('7bcd780bbbe9', 0),
('7fe80931b5c6', 0),
('82e45e8a0d8a', 0),
('854c9b511408', 0),
('867336c474b5', 0),
('8912a6f5a4a7', 0),
('8949383edf66', 0),
('89f7c88f0695', 0),
('913162837cbc', 0),
('91714323f408', 0),
('9564dcfb3170', 0),
('98a686b7d439', 0),
('9c15b9638bbc', 0),
('9daf16fe146c', 0),
('9ea11bc22605', 0),
('a0b360b90abf', 0),
('a11d79303ca4', 0),
('a44986907ed4', 0),
('a783e833d769', 0),
('a88daf7f68ff', 0),
('aa3853f17d56', 0),
('ab49e0d6a14c', 0),
('ac937c45a764', 0),
('ac958ebaf277', 0),
('aeb44ff12a92', 0),
('b7c460246e4a', 0),
('bae559c26cc1', 0),
('be237f1d115e', 0),
('bf8607cbd467', 0),
('c25e07b907e9', 0),
('c55d7dae1fa7', 0),
('ce7d7ddddf08', 0),
('cfc5227e52e8', 0),
('d25177f5aa00', 0),
('d9786c55eae6', 0),
('df7279b88588', 0),
('e0cad19a06d7', 0),
('e1094112f537', 0),
('e1b99f09a020', 0),
('e6348957eee7', 0),
('eb1473c1a9ad', 0),
('eeb9592d88dd', 0),
('f0be4ab2c25b', 0),
('f17bb0d83b13', 0),
('f2df38484dc8', 0),
('f61739857782', 0),
('f83ea71c6e50', 0),
('f9278e48bb30', 0);

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
-- テーブルの構造 `purchased_history_item`
--

CREATE TABLE `purchased_history_item` (
  `purchase_history_id` varchar(20) NOT NULL,
  `work_id` char(12) NOT NULL,
  `quantity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `purchased_history_item`
--

INSERT INTO `purchased_history_item` (`purchase_history_id`, `work_id`, `quantity`) VALUES
('86681cb59afb', '8949383edf66', 1),
('e0c764d6ff8c', '91714323f408', 1),
('ec926503d4c7', '8949383edf66', 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `purchase_history`
--

CREATE TABLE `purchase_history` (
  `id` varchar(20) NOT NULL,
  `user_id` varchar(15) NOT NULL,
  `number_invoice` varchar(20) DEFAULT NULL,
  `purchased_at` datetime DEFAULT NULL,
  `payment_method` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `purchase_history`
--

INSERT INTO `purchase_history` (`id`, `user_id`, `number_invoice`, `purchased_at`, `payment_method`) VALUES
('16f072279021', 'user1', NULL, '2022-02-27 06:39:53', 'card'),
('5e2c77cd471f', 'user1', NULL, '2022-02-27 06:55:45', 'card'),
('86681cb59afb', 'user1', NULL, '2022-02-27 07:06:00', 'paypay'),
('98eedc4b5a9a', 'user1', NULL, '2022-02-27 07:02:47', 'paypay'),
('ae60b7a53b27', 'user1', NULL, '2022-02-27 06:55:45', 'card'),
('e0c764d6ff8c', 'user1', NULL, '2022-02-27 07:47:23', 'card'),
('ec926503d4c7', 'user1', NULL, '2022-02-27 07:06:00', 'paypay');

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
('user1', 'user1', 'user1', 'user@icloud.com', NULL, NULL, '', '', '', '2022-02-21 07:20:45', NULL);

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
  `purchase_flg` tinyint(4) DEFAULT NULL,
  `num_of_images` tinyint(4) DEFAULT '0',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `work`
--

INSERT INTO `work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `hashtag`, `introduction`, `purchase_flg`, `num_of_images`, `create_at`) VALUES
('030299ef714f', 'user1', 17, NULL, 'd4b7efbe-ee03-4308-b3b9-914628e3f98d', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-22 02:42:18'),
('06442a93abe9', 'user1', 18, NULL, '4e765651-11f1-4a70-a8e0-30ce4cd0e444', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:21:24'),
('06cd36182afc', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG', 'https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22'),
('075ca3abed20', 'user1', 17, 'sample', 'd0dec62c-909e-4261-85a8-f1e3b755aa38', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-21 07:45:55'),
('0a69b446d622', 'user1', 17, NULL, 'dbe0b457-2cbe-4c55-ae73-e9339c53b9f9', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:33:29'),
('0ae79c35d5d9', 'user1', 17, 'sample', '99a45ffe-f2d6-46f9-90cb-09ac6bb87208', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:09:41'),
('0f0ce02ebf2b', 'user1', 17, 'sample', '74ab2033-ac9d-4058-89e5-4d89219a8700', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-26 12:05:27'),
('107364614914', 'user1', 17, 'sample', '4be024aa-4248-4f60-a85f-b944497141bc', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:13:14'),
('12b30555aa19', 'user1', 2, NULL, '33e99252-c589-4ebe-8f7e-094f8a0ee2f5', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-22 09:25:47'),
('16ee5657d239', 'user1', 17, 'sample', 'da9c3ee8-d34c-4d1a-b60a-94aa74dc2f68', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:03:51'),
('183bcef13935', 'user1', 17, 'sample', 'd4eefffe-ec2f-4cc1-90a9-c499fe5e566c', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:35:55'),
('1f6e1208b160', 'user1', 17, 'sample', 'bf80ab07-d3c6-4184-bad7-4edcd8466924', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 07:03:13'),
('204e8c3b0540', 'user1', 17, 'sample', '67d02c2c-0a14-47e9-97a5-3f2dccc64f44', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:54:36'),
('21a29c06ade2', 'user1', 17, 'sample', '3306d08b-d851-4f2d-a784-c5b6b78fb0c4', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:36:55'),
('264e1e2d11ec', 'user1', 17, NULL, 'e0128c05-d80f-45b5-8a70-343c55ccd709', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-22 03:04:57'),
('2ade79b60637', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG', 'https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, 0, '2022-02-02 04:29:22'),
('2af3bd03cd1c', 'user1', 18, 'dd', '1ce98f08-b202-4ad2-9e0b-63ee098e26c5', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-21 07:35:04'),
('2b571a82d83c', 'user1', 17, 'sampel', 'c58d4b7d-43fd-4030-9cd0-c0ba4e08a41b', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-25 13:30:44'),
('3354c38bdfa4', 'user1', 20, 'sample', '976ddfdb-e366-4a76-9ba2-74701eed94da', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:56:14'),
('33e49d42aeb5', 'user1', 2, 'sample', '553b37e9-6597-49dd-9fa5-9f08142d2b20', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:11:24'),
('3433777e8916', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png', 'https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22'),
('3470f20d89bc', 'user1', 17, 'sample', '1cda6342-10e9-4743-83ed-7f41564cbcfe', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:16:09'),
('34e467936236', 'user1', 17, 'sample', 'c3278d72-11ef-467b-8e74-b5c91fd14578', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:56:36'),
('3509822c79fb', 'user1', 17, 'sample', 'ad3e32bc-2504-4209-b3b5-dab45d09334b', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:17:31'),
('371d028d9e6b', 'user1', 17, NULL, 'cb8cb6c9-8021-45f6-bdf8-4665240be90d', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:29:36'),
('3d4f2496214e', 'user1', 17, 'sample', 'f746e83d-6a1f-4831-a7ef-f1879bd36eda', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:00:44'),
('3dc74e75e653', 'user1', 17, 'sample', '4edb924f-132c-4182-b128-280e19434062', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 06:44:18'),
('3e5eacad8b26', 'user1', 17, NULL, '67af6a63-b92d-4b3a-9638-26826ef52c92', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:30:41'),
('43a8b69caf20', 'user1', 18, NULL, 'e0209cbd-fac6-4cbc-b6b4-2fede87c5ee0', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-22 02:20:24'),
('49469ff69d18', 'user1', 17, 'りんご', 'f8acdaee-0eaf-4114-9b17-c6c5313a645d', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:31:51'),
('494dbeb5aac7', 'user1', 17, 'samplw', 'bd686e0c-e793-40f0-b7ea-98ec94da765a', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-25 06:35:20'),
('4bfa18cdfe55', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG', 'https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22'),
('4d1f0e983e2a', 'user1', 2, 'sample', '4a269567-d12e-4669-9bfd-bf24cfe14119', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 04:44:27'),
('4ec21f586f63', 'user1', 17, 'sample', '00dff320-6f39-43f8-a24f-dfd48982196e', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 06:58:35'),
('58a726bde300', 'user1', 17, 'sample', '0b7daa91-ca8f-4fdd-bed5-4651d98f0b47', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-26 12:22:24'),
('58adbfe628d2', 'user1', 17, 'sample', '8d67bc15-0712-475f-91ef-b86f2cdd49c5', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:17:16'),
('5d743f414b3a', 'user1', 17, NULL, '89832ba7-4fca-4c07-8ff2-d2ee765630d4', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:19:39'),
('60d68066193b', 'user1', 17, 'sample', '83d9fb18-9501-4354-876c-b219832d9618', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:30:46'),
('62d29336a620', 'user1', 2, 'sample', 'a9c141fc-c5d1-465a-9765-ba2874b456de', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:59:48'),
('6ba2f64bd76f', 'user1', 17, 'sample', '063fc7f8-8e20-4401-a2b1-af752b2d1867', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 02:55:40'),
('6c377fa9a79f', 'user1', 20, 'sample', '4a63c5cd-8b53-4a3e-947e-ed7c2f4a8e5f', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 06:26:21'),
('6ca819e4d3dd', 'user1', 18, NULL, 'b646dc4e-511a-4a52-94ae-5a31df2f0e05', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-22 02:20:11'),
('6e96f7131583', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png', 'https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, 0, '2022-02-02 04:29:22'),
('706237345bce', 'user1', 18, 'sample', '2131cc33-67c4-40c2-a0d6-ab576c8201e9', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 06:56:04'),
('70c1b0f0dd81', 'user1', 18, 'sample', '571f11db-bc56-4ca3-9823-a451763b227a', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-21 07:41:26'),
('723fd587fc2c', 'user1', 17, NULL, 'ef65b3ab-b592-468c-866f-612953e0044b', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 07:30:58'),
('7503ec1349d3', 'user1', 17, NULL, '9bd73e08-9b49-4c1e-aab1-f851865a9428', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:26:33'),
('766f4c12fad7', 'user1', 17, 'sample', 'c240bc37-6642-4e0f-9f5c-082d623e2112', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:33:17'),
('78985f18d4fd', 'user1', 17, NULL, '86b21e73-b6fd-4a2b-9c05-333787535087', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:23:11'),
('7b753c97b559', 'user1', 17, NULL, '2a379566-84bf-478f-8b67-17185c9513d1', NULL, NULL, NULL, NULL, NULL, 1, 0, '2022-02-28 08:12:09'),
('7bbffbd4f611', 'user1', 17, 'sample', '8c1fb2ac-6af4-43c3-83ed-a8e6fc2dfdb4', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:28:35'),
('7bcd780bbbe9', 'user1', 17, 'sample', '2ce86be5-c402-4473-9417-1aac77e961ff', NULL, 1, NULL, 'ハッシュタグ,', '150文字以内\r\n\r\n#ハッシュタグ', 0, 0, '2022-02-21 07:49:07'),
('7fe80931b5c6', 'user1', 17, NULL, '65507dad-1072-4ec4-87ad-6eced1b83a4c', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:25:25'),
('81edff70d7d3', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG', 'https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22'),
('82e45e8a0d8a', 'user1', 17, 'sample', 'c41268cf-b5d8-415d-8afc-e1b58a8ae472', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:33:47'),
('854c9b511408', 'user1', 2, 'りんご', '495dec27-72a2-4f01-8bc0-14d43825f0ee', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:14:00'),
('867336c474b5', 'user1', 17, 'sample', '12b023e1-93f4-4150-b016-3b7ad374f97a', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-22 03:20:21'),
('8912a6f5a4a7', 'user1', 18, 'sample', 'b85f12c5-5b2c-4335-bc7b-86ee18275378', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-21 08:06:13'),
('8949383edf66', 'user1', 17, 'sample', '17210fd2-37fa-44ed-8c9c-af1485605d12', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 07:06:15'),
('89f7c88f0695', 'user1', 2, 'sample', '7a0b04cb-3de7-4681-a079-96697fc9c5ec', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-25 06:54:51'),
('913162837cbc', 'user1', 20, 'りんご', 'b003cabf-f5c1-4c97-bcd8-44ed8bc42c0f', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-22 09:58:25'),
('91714323f408', 'user1', 17, 'sample', '59cd9608-cf10-4f47-a22d-fba393d32c9d', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 07:48:09'),
('9564dcfb3170', 'user1', 17, 'りんご', 'c52accb5-d1f0-4196-86e8-f4920a3cbc30', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:47:52'),
('98a686b7d439', 'user1', 17, NULL, '26e85005-c67e-4c45-a779-08162aa41a44', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:27:49'),
('9c15b9638bbc', 'user1', 20, 'sample', '686355b9-64bb-4ce0-9d54-13876c7fc52c', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 03:39:55'),
('9daf16fe146c', 'user1', 1, 'sample', '6b77597a-6adc-436f-9c34-dd5f6a83d542', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 04:52:51'),
('9ea11bc22605', 'user1', 18, 'sample', '930f6154-e3a3-47c6-8420-06f08f73fceb', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-22 02:55:47'),
('a0b360b90abf', 'user1', 17, 'sample', 'a7463aee-c2f3-4a6e-b6f1-770e151100a6', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 1, 0, '2022-02-28 08:18:16'),
('a11d79303ca4', 'user1', 17, 'sample', '537ae987-3b6e-428e-9304-3deec3018ed2', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:29:48'),
('a44986907ed4', 'user1', 17, NULL, '5cbefd46-d54e-40a6-96d9-cb3be1ed30e6', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 07:32:44'),
('a783e833d769', 'user1', 17, 'りんご', '92f02c1f-131e-4fe4-af36-2123491dacf1', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:24:55'),
('a88daf7f68ff', 'user1', 17, 'sample', 'b333d6f0-6b7f-42ef-be82-0caf9d88fdd3', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:58:32'),
('aa3853f17d56', 'user1', 17, NULL, 'af7abc19-f2e3-4c33-bcb2-7f98b554d369', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:22:11'),
('ab49e0d6a14c', 'user1', 17, 'りんご', '68673faa-069a-48bb-b3cf-55eed707613f', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:35:04'),
('ac937c45a764', 'user1', 17, 'sample', 'ba66915c-3a54-4fb5-b664-e2c2a7172b1e', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:44:52'),
('ac958ebaf277', 'user1', 22, 'sample', 'd69d5620-1bd9-47ee-be40-7d4289d41f4b', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-25 13:24:35'),
('aeb44ff12a92', 'user1', 17, 'sample', '3b831e5a-b396-4d3c-bb1d-7cdbc3f9ce3c', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:52:20'),
('b7c460246e4a', 'user1', 17, 'sample', '80385257-df12-4fdc-b2dd-3c0523730bcd', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:58:04'),
('b7edc32c2dc0', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG', 'https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, 0, '2022-02-02 04:29:22'),
('b9e5c437d684', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG', 'https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, 0, '2022-02-02 04:29:22'),
('bae559c26cc1', 'user1', 17, 'sample', 'b39e517a-2d87-4c17-a557-7645cf319ed6', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 05:08:42'),
('be237f1d115e', 'user1', 17, 'sample', 'cf09be1b-72cc-4dde-9755-0e58950bd4a2', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:20:53'),
('bf8607cbd467', 'user1', 17, 'sample', '4f6fb1f8-9a0c-49a2-8400-953fc2457db3', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 07:13:02'),
('c25e07b907e9', 'user1', 17, 'sample', '76876115-7291-4c8d-9e5d-ac74c1099dd6', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-22 02:46:59'),
('c55d7dae1fa7', 'user1', 17, 'dd', '0b567a3d-81ba-482f-8e83-4638028c863e', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-22 03:21:52'),
('ce7d7ddddf08', 'user1', 20, NULL, '3e99d1fd-6f23-465e-af73-79b8a9747357', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:35:27'),
('cfc5227e52e8', 'user1', 20, 'さｍｐぇ', 'edfb7198-223d-432d-8288-ceec2b66f18c', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-22 03:08:33'),
('d0a01b45a9f0', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG', 'https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, 0, '2022-02-02 04:29:22'),
('d25177f5aa00', 'user1', 17, 'sample', '0e7d4ead-a90a-4cc9-b697-3aeabcb0fa12', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 04:56:29'),
('d74dfadaec92', 'ulabeler', 1, 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png', 'https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png', 1, '600', NULL, 'ひまわりが大好きなので作りました。いぇい', 0, 0, '2022-02-02 04:29:22'),
('d9786c55eae6', 'user1', 17, NULL, '1ec0935e-6a1f-4c81-b55d-f59a908d44f2', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:24:24'),
('db8e43171e68', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG', 'https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22'),
('df7279b88588', 'user1', 17, NULL, 'b63048e1-a1e1-4684-a270-32b501c66d58', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-27 03:13:57'),
('e0cad19a06d7', 'user1', 17, 'sample', 'c6ff325b-8295-4975-8004-f415ad651a04', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 03:58:36'),
('e1094112f537', 'user1', 17, 'sample', 'df673960-7c2d-4012-a532-106e80eb5366', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-21 07:37:03'),
('e1b99f09a020', 'user1', 17, 'sample', '68d28741-03d8-4a95-b96a-35075e7e0610', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:32:36'),
('e6348957eee7', 'user1', 17, 'sample', '2456522c-cb7f-4d3c-b889-04ad3d4e8a4e', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:14:17'),
('eb1473c1a9ad', 'user1', 17, 'sample', 'ca482ba7-b9ca-4079-b022-4d319c5acbb3', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:18:53'),
('edf5aa0c1078', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG', 'https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22'),
('eeb9592d88dd', 'user1', 1, 'sample', 'ecd6bd76-2a7a-4803-82e4-1eae9b43b856', NULL, 1, NULL, 'ハッシュタグ,', '150文字以\r\n\r\n#ハッシュタグ', 0, 0, '2022-02-21 08:04:43'),
('f0be4ab2c25b', 'user1', 17, NULL, '8997d49e-ea4e-48de-a7f4-742f0bfc173e', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-22 03:04:04'),
('f17bb0d83b13', 'user1', 17, 'sample', 'bb2bba36-c505-428c-b697-a7d3c3e20f49', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 03:37:01'),
('f2df38484dc8', 'user1', 17, NULL, 'c8f48712-0ba6-4a52-888d-ab6c36639db0', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-02-25 06:10:06'),
('f61739857782', 'user1', 17, 'smple', 'be3c824d-7e6b-4287-b728-89ff0669165c', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-26 11:26:57'),
('f83ea71c6e50', 'user1', 17, 'sample', '3f977fc3-e8fc-4027-ba70-45f9c5c05090', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-27 04:48:36'),
('f9278e48bb30', 'user1', 17, 'sample', 'f68ac943-3e41-43c3-a471-5903ad7f0e85', NULL, 1, NULL, '', '150文字以内#ハッシュタグ', 0, 0, '2022-02-24 10:40:42'),
('fca90358cdec', 'ulabeler', 1, 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG', 'https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG', 1, '700', NULL, 'ひまわりが大好きなので作りました。', 0, 0, '2022-02-02 04:31:22');

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
-- テーブルのインデックス `purchased_history_item`
--
ALTER TABLE `purchased_history_item`
  ADD PRIMARY KEY (`purchase_history_id`,`work_id`),
  ADD KEY `work_id` (`work_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
-- テーブルの制約 `purchased_history_item`
--
ALTER TABLE `purchased_history_item`
  ADD CONSTRAINT `purchase_history_id` FOREIGN KEY (`purchase_history_id`) REFERENCES `purchase_history` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `work_id` FOREIGN KEY (`work_id`) REFERENCES `work` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD CONSTRAINT `user_id_purchase` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

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
