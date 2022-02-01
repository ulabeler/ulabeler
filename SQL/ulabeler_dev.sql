-- MySQL Workbench Forward Engineering
-- 開発用

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ulabeler_dev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ulabeler_dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ulabeler_dev` DEFAULT CHARACTER SET utf8mb4 ;
USE `ulabeler_dev` ;

-- -----------------------------------------------------
-- Table `ulabeler_dev`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`user` (
  `id` VARCHAR(15) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `mailaddress` VARCHAR(255) NOT NULL,
  `icon_path` VARCHAR(255) NULL,
  `self_introduction` TEXT(450) NULL,
  `cardnumber` CHAR(16) NULL,
  `name_card` VARCHAR(45) NULL,
  `expiration` CHAR(4) NULL,
  `created_at` DATETIME NOT NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `name_idx` (`name` ASC) VISIBLE,
  INDEX `mailaddress_idx` (`mailaddress` ASC) VISIBLE,
  INDEX `id_idx` (`id` ASC) VISIBLE,
  UNIQUE INDEX `mailaddress_UNIQUE` (`mailaddress` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`delivery_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`delivery_address` (
  `user_id` VARCHAR(15) NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `zip_code` CHAR(7) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `familyname` VARCHAR(15) NOT NULL,
  `firstname` VARCHAR(15) NOT NULL,
  `familyname_furigana` VARCHAR(45) NOT NULL,
  `firstname_furigana` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`, `updated_at`),
  CONSTRAINT `user_id_delivery_addr`
    FOREIGN KEY (`user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`vendor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`category_settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`category_settings` (
  `name` VARCHAR(45) NOT NULL,
  `thumbnail_path` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`base_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`base_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vendor_id` INT NOT NULL,
  `name_category` VARCHAR(45) NOT NULL,
  `name_subcategory` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `vendor_id_idx` (`vendor_id` ASC) VISIBLE,
  INDEX `category_settings_name_idx` (`name_subcategory` ASC) VISIBLE,
  CONSTRAINT `vendor_id`
    FOREIGN KEY (`vendor_id`)
    REFERENCES `ulabeler_dev`.`vendor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_settings_name`
    FOREIGN KEY (`name_subcategory`)
    REFERENCES `ulabeler_dev`.`category_settings` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`work`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`work` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_by_user_id` VARCHAR(15) NOT NULL,
  `base_category_id` INT NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `work_tex_path` VARCHAR(255) NOT NULL,
  `thumbnail_path` VARCHAR(255) NOT NULL,
  `flag_public` TINYINT NOT NULL,
  `unit_price` DECIMAL NOT NULL,
  `hashtag` VARCHAR(60) NULL,
  `introduction` VARCHAR(255) NULL,
  `num_of_images` TINYINT NULL DEFAULT 0,
  `create_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `F_user_ID_idx` (`created_by_user_id` ASC) VISIBLE,
  INDEX `F_hashtag_idx` (`hashtag` ASC) VISIBLE,
  INDEX `category_id_idx` (`base_category_id` ASC) VISIBLE,
  UNIQUE INDEX `thumbnail_path_UNIQUE` (`thumbnail_path` ASC) VISIBLE,
  UNIQUE INDEX `work_tex_path_UNIQUE` (`work_tex_path` ASC) VISIBLE,
  CONSTRAINT `user_id_work`
    FOREIGN KEY (`created_by_user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_id`
    FOREIGN KEY (`base_category_id`)
    REFERENCES `ulabeler_dev`.`base_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`purchase_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`purchase_history` (
  `id` VARCHAR(20) NOT NULL,
  `user_id` VARCHAR(15) NOT NULL,
  `items` JSON NOT NULL,
  `number_invoice` VARCHAR(20) NOT NULL,
  `purchased_at` DATETIME NULL,
  `payment_method` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_Index` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id_purchase`
    FOREIGN KEY (`user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`favorited_work`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`favorited_work` (
  `favorite_from` VARCHAR(15) NOT NULL,
  `favorite_to` INT NOT NULL,
  `favorited_at` DATETIME NOT NULL,
  PRIMARY KEY (`favorite_from`, `favorite_to`),
  INDEX `F_work_ID_idx` (`favorite_to` ASC) VISIBLE,
  CONSTRAINT `user_id_fav_work`
    FOREIGN KEY (`favorite_from`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `work_id_fav_work`
    FOREIGN KEY (`favorite_to`)
    REFERENCES `ulabeler_dev`.`work` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`base_settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`base_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `object_path` VARCHAR(255) NOT NULL,
  `base_tex_path` VARCHAR(255) NOT NULL,
  `thumbnail_path` VARCHAR(255) NOT NULL,
  `unit_price` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `object_path_UNIQUE` (`object_path` ASC) VISIBLE,
  UNIQUE INDEX `thumbnail_path_UNIQUE` (`thumbnail_path` ASC) VISIBLE,
  CONSTRAINT `T_category_id`
    FOREIGN KEY (`id`)
    REFERENCES `ulabeler_dev`.`base_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`stamp_settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`stamp_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `img_path` VARCHAR(255) NOT NULL,
  `unit_price` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`favorited_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`favorited_user` (
  `favorite_from` VARCHAR(15) NOT NULL,
  `favorite_to` VARCHAR(15) NOT NULL,
  `favorited_at` DATETIME NOT NULL,
  PRIMARY KEY (`favorite_from`, `favorite_to`),
  INDEX `user_id_fav_user_to_idx` (`favorite_to` ASC) VISIBLE,
  CONSTRAINT `user_id_fav_user_from`
    FOREIGN KEY (`favorite_from`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id_fav_user_to`
    FOREIGN KEY (`favorite_to`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reported_to_user_id` VARCHAR(15) NOT NULL,
  `reported_from_user_id` VARCHAR(15) NOT NULL,
  `category_id` TINYINT NOT NULL,
  `reported_description` TEXT(600) NOT NULL,
  `reported_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `F_user_ID_idx1` (`reported_to_user_id` ASC) VISIBLE,
  INDEX `user_id_report_from_idx` (`reported_from_user_id` ASC) VISIBLE,
  CONSTRAINT `user_id_report_to`
    FOREIGN KEY (`reported_to_user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id_report_from`
    FOREIGN KEY (`reported_from_user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`mail_confirmation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`mail_confirmation` (
  `user_id` VARCHAR(15) NOT NULL,
  `datetime_issue` DATETIME NOT NULL,
  `mailaddress_new` VARCHAR(255) NULL,
  `token_confirmation` CHAR(4) NOT NULL,
  PRIMARY KEY (`user_id`, `datetime_issue`),
  INDEX `F_user_ID_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id_main_confim`
    FOREIGN KEY (`user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`password_reset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`password_reset` (
  `id` VARCHAR(15) NOT NULL,
  `datetime_issue` DATETIME NOT NULL,
  `temp_password` VARCHAR(255) NOT NULL,
  `token` CHAR(32) NOT NULL,
  PRIMARY KEY (`id`, `datetime_issue`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  CONSTRAINT `user_id_pass_reset`
    FOREIGN KEY (`id`)
    REFERENCES `ulabeler`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`work_used_stamps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`work_used_stamps` (
  `work_id` INT NOT NULL,
  `stamp_settings_id` INT NOT NULL,
  `num_used` INT NULL,
  PRIMARY KEY (`work_id`, `stamp_settings_id`),
  INDEX `id_stamp_idx` (`stamp_settings_id` ASC) VISIBLE,
  CONSTRAINT `id_work`
    FOREIGN KEY (`work_id`)
    REFERENCES `ulabeler_dev`.`work` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_stamp`
    FOREIGN KEY (`stamp_settings_id`)
    REFERENCES `ulabeler_dev`.`stamp_settings` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`administrator` (
  `id` VARCHAR(15) NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`inquiry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`inquiry` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(15) NOT NULL,
  `category` TINYINT NOT NULL,
  `description` TEXT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `mail_address` VARCHAR(255) NOT NULL,
  `status` VARCHAR(45) NOT NULL COMMENT '「受付済み」\n「対応中」\n「対応済み」',
  `reply` TEXT NULL,
  `replyed_by_user_id` VARCHAR(15) NOT NULL COMMENT '運営対応者id\n',
  `posted_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL COMMENT '対応中、とか対応済み、とかそういうのを入れる',
  PRIMARY KEY (`id`),
  INDEX `id_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `admin_id_inq_idx` (`replyed_by_user_id` ASC) VISIBLE,
  CONSTRAINT `user_id_inq`
    FOREIGN KEY (`user_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `admin_id_inq`
    FOREIGN KEY (`replyed_by_user_id`)
    REFERENCES `ulabeler_dev`.`administrator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`delivery_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`delivery_status` (
  `purchase_record_id` VARCHAR(20) NOT NULL,
  `datetime_scheduled` VARCHAR(20) NULL COMMENT '配送予定日時\n例)\n08/30　08:00-12:00',
  `current_status` VARCHAR(45) NULL,
  `zip_code` CHAR(7) NULL,
  `address` VARCHAR(255) NOT NULL COMMENT '住所',
  `familyname` VARCHAR(15) NOT NULL,
  `firstname` VARCHAR(15) NOT NULL,
  `familyname_furigana` VARCHAR(45) NULL,
  `firstname_furigana` VARCHAR(45) NULL,
  `datetime_results` DATETIME NULL COMMENT '配送実績日時',
  `updated_at` DATETIME NULL COMMENT 'ユーザー購入履歴/管理画面で対象ページアクセスしたときに入れる',
  PRIMARY KEY (`purchase_record_id`),
  CONSTRAINT `purchase_record_id`
    FOREIGN KEY (`purchase_record_id`)
    REFERENCES `ulabeler_dev`.`purchase_history` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`sample_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`sample_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sample_images_path` VARCHAR(255) NULL,
  `added_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`favorited_user_number`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`favorited_user_number` (
  `favorited_to_id` VARCHAR(15) NOT NULL,
  `number` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`favorited_to_id`),
  CONSTRAINT `user_id_favnum_user`
    FOREIGN KEY (`favorited_to_id`)
    REFERENCES `ulabeler_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ulabeler_dev`.`favorited_work_number`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulabeler_dev`.`favorited_work_number` (
  `favorited_to_id` INT NOT NULL,
  `number` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`favorited_to_id`),
  CONSTRAINT `favorited_to_id`
    FOREIGN KEY (`favorited_to_id`)
    REFERENCES `ulabeler_dev`.`work` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER 'ulabeler' IDENTIFIED BY 'ulabeler';

GRANT ALL ON `ulabeler_dev`.* TO 'ulabeler';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
