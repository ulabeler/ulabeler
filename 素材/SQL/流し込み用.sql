INSERT INTO `ulabeler_dev`.`vendor` (`name`) VALUES ('HAL東京');

INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('皿', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('ペットボトル', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone12 mini', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone12', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone12 Pro', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone12 Pro Max', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone11', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone11 Pro', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone8/SE(第二世代)', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone7', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('Xperia Z5', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone13', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone13 Pro', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('iPhone13 Pro Max', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('お弁当箱', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('サーフボード', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('腕時計', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('トートバッグ', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('靴', '2021-11-29 14:47');
INSERT INTO `ulabeler_dev`.`category_settings` (`name`, `created_at`) VALUES ('チロルチョコ', '2021-11-29 14:47');


INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'ペットボトル', 'ペットボトル');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', '皿', '皿');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone12 mini');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone12');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone12 Pro');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone12 Pro Max');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone11');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone11 Pro');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone8/SE(第二世代)');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone7');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'Xperia Z5');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone13');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone13 Pro');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'スマホケース', 'iPhone13 Pro Max');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'お弁当箱', 'お弁当箱');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'サーフボード', 'サーフボード');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', '腕時計', '腕時計');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'トートバッグ', 'トートバッグ');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', '靴', '靴');
INSERT INTO `ulabeler_dev`.`base_category` (`vendor_id`, `name_category`, `name_subcategory`) VALUES ('1', 'チロルチョコ', 'チロルチョコ');

-- user追加
INSERT INTO `ulabeler_dev`.`user` (`id`, `name`, `password`, `mailaddress`, `self_introduction`, `cardnumber`, `name_card`, `expiration`, `created_at`) VALUES ('user', 'ゆーざー', 'user', 'ulabeler.07@gmail.com', 'よろ', '4485805109814218', 'HAL TARO', '0822', '2021-11-29 17:34');
