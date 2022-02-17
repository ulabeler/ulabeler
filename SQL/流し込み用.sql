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

-- user追加;

INSERT INTO `ulabeler_dev`.`user` (`id`, `name`, `password`, `mailaddress`, `self_introduction`, `cardnumber`, `name_card`, `expiration`, `created_at`) VALUES ('ulabeler', 'ゆーざー', '$2b$10$uquoNVSt/zHP9gUh5pCjCOMVytrjGRX1pBLj6OIUSRvHPs2U7ITXC', 'develop@na2na.dev', 'よろ', '4485805109814218', 'HAL TARO', '0822', '2021-11-29 17:34');

-- スタンプ関係;

INSERT INTO `ulabeler_dev`.`stamp_settings` (`name`, `img_path`, `unit_price`) VALUES ('flower', '/images/stamps/flower.png', '15');
INSERT INTO `ulabeler_dev`.`stamp_settings` (`name`, `img_path`, `unit_price`) VALUES ('lemon', '/images/stamps/lemon.png', '15');
INSERT INTO `ulabeler_dev`.`stamp_settings` (`name`, `img_path`, `unit_price`) VALUES ('apple', '/images/stamps/apple.png', '15');
INSERT INTO `ulabeler_dev`.`stamp_settings` (`name`, `img_path`, `unit_price`) VALUES ('doughnut', '/images/stamps/doughnut.png', '15');

-- 作品関係
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('2ade79b60637', 'ulabeler', '1', 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG', 'https://misskey.na2na.dev/media/media/da1a5df8-cc98-4230-a23c-0347957ad6e7.JPG', '1', '600', 'ひまわりが大好きなので作りました。いぇい', '0', '2022-02-02 04:29:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('4bfa18cdfe55', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG', 'https://misskey.na2na.dev/media/media/24bd6f2a-f0a3-4e16-8485-da8b74cb4317.JPG', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('6e96f7131583', 'ulabeler', '1', 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png', 'https://misskey.na2na.dev/media/media/327f7bae-2ccb-491a-b777-e3bcb9351f8e.png', '1', '600', 'ひまわりが大好きなので作りました。いぇい', '0', '2022-02-02 04:29:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('3433777e8916', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png', 'https://misskey.na2na.dev/media/media/37671b5d-c5de-49c9-a302-a46be0f9cbc5.png', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('d74dfadaec92', 'ulabeler', '1', 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png', 'https://misskey.na2na.dev/media/media/1d98fa0c-9272-496b-af4b-270bbb69c2dd.png', '1', '600', 'ひまわりが大好きなので作りました。いぇい', '0', '2022-02-02 04:29:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('fca90358cdec', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG', 'https://misskey.na2na.dev/media/media/b59dbe32-e27a-46cb-82a2-bac54c26c4a5.JPG', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('d0a01b45a9f0', 'ulabeler', '1', 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG', 'https://misskey.na2na.dev/media/media/891a8ef4-6b9d-45c2-976b-1caafaeab790.JPG', '1', '600', 'ひまわりが大好きなので作りました。いぇい', '0', '2022-02-02 04:29:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('db8e43171e68', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG', 'https://misskey.na2na.dev/media/media/21a83a6e-6ada-4307-8b66-c80fa7b96d92.JPG', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('edf5aa0c1078', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG', 'https://misskey.na2na.dev/media/media/40150283-3199-4f9a-ac17-5ef6184d0ab0.JPG', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('b9e5c437d684', 'ulabeler', '1', 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG', 'https://misskey.na2na.dev/media/media/aa433992-50ca-449f-b20c-9e659c5e51ff.JPG', '1', '600', 'ひまわりが大好きなので作りました。いぇい', '0', '2022-02-02 04:29:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('81edff70d7d3', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG', 'https://misskey.na2na.dev/media/media/382669d5-1f83-4333-963f-c0099bc27965.JPG', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('b7edc32c2dc0', 'ulabeler', '1', 'ひまわりのペットボトル', 'https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG', 'https://misskey.na2na.dev/media/media/9bb92400-ea69-4930-9789-dec734f7be22.JPG', '1', '600', 'ひまわりが大好きなので作りました。いぇい', '0', '2022-02-02 04:29:22');
INSERT INTO `ulabeler_dev`.`work` (`id`, `created_by_user_id`, `base_category_id`, `name`, `work_tex_path`, `thumbnail_path`, `flag_public`, `unit_price`, `introduction`, `num_of_images`, `create_at`) VALUES ('06cd36182afc', 'ulabeler', '1', 'ひまわりのペットボトル2', 'https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG', 'https://misskey.na2na.dev/media/media/c4a2793e-20ac-497f-864c-ef5e9ce1e6f8.JPG', '1', '700', 'ひまわりが大好きなので作りました。', '0', '2022-02-02 04:31:22');

-- お気に入り数関係
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('2ade79b60637', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('4bfa18cdfe55', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('6e96f7131583', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('3433777e8916', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('d74dfadaec92', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('fca90358cdec', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('d0a01b45a9f0', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('db8e43171e68', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('edf5aa0c1078', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('b9e5c437d684', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('81edff70d7d3', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('b7edc32c2dc0', '0');
INSERT INTO `ulabeler_dev`.`favorited_work_number` (`favorited_to_id`, `number`) VALUES ('06cd36182afc', '0');
