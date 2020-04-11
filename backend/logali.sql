-- MySQL Script generated by MySQL Workbench
-- Wed Mar 11 17:15:06 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema logali
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema logali
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `logali` DEFAULT CHARACTER SET utf8 ;
USE `logali` ;

-- -----------------------------------------------------
-- Table `logali`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `geoLocX` FLOAT NOT NULL,
  `geoLocY` FLOAT NOT NULL,
  `zipCode` INT NULL,
  `number` INT NULL,
  `street` VARCHAR(45) NULL,
  `neighborhood` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `createdAt` VARCHAR(20) NULL,
  `updatedAt` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logali`.`typeScheduling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`typeScheduling` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logali`.`statusScheduling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`statusScheduling` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logali`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `login` VARCHAR(20) NOT NULL,
  `password` VARCHAR(28) NOT NULL,
  `rateAVG` INT NOT NULL DEFAULT 0,
  `createdAt` VARCHAR(20) NOT NULL,
  `updatedAt` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_user_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `logali`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logali`.`scheduling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`scheduling` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `typeSchedulingId` INT NOT NULL,
  `statusSchedulingId` INT NOT NULL,
  `workerId` INT NULL,
  `dateTime` VARCHAR(20) NOT NULL,
  `observation` VARCHAR(200) NULL,
  `createdAt` VARCHAR(20) NOT NULL,
  `updatedAt` VARCHAR(20) NULL,
  `deletedAt` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_scheduling_typeScheduling_idx` (`typeSchedulingId` ASC),
  INDEX `fk_scheduling_statusScheduling1_idx` (`statusSchedulingId` ASC),
  INDEX `fk_scheduling_user1_idx` (`userId` ASC),
  INDEX `fk_scheduling_user2_idx` (`workerId` ASC),
  CONSTRAINT `fk_scheduling_typeScheduling`
    FOREIGN KEY (`typeSchedulingId`)
    REFERENCES `logali`.`typeScheduling` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduling_statusScheduling1`
    FOREIGN KEY (`statusSchedulingId`)
    REFERENCES `logali`.`statusScheduling` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduling_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `logali`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduling_user2`
    FOREIGN KEY (`workerId`)
    REFERENCES `logali`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logali`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `raterId` INT NOT NULL,
  `ratedId` INT NOT NULL,
  `rate` FLOAT NOT NULL,
  `observation` VARCHAR(160) NULL,
  `createdAt` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rating_user1_idx` (`raterId` ASC),
  INDEX `fk_rating_user2_idx` (`ratedId` ASC),
  CONSTRAINT `fk_rating_user1`
    FOREIGN KEY (`raterId`)
    REFERENCES `logali`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_user2`
    FOREIGN KEY (`ratedId`)
    REFERENCES `logali`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logali`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logali`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `senderId` INT NOT NULL,
  `recieverId` INT NOT NULL,
  `message` VARCHAR(200) NOT NULL,
  `createdAt` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_user1_idx` (`senderId` ASC),
  INDEX `fk_messages_user2_idx` (`recieverId` ASC),
  CONSTRAINT `fk_messages_user1`
    FOREIGN KEY (`senderId`)
    REFERENCES `logali`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_user2`
    FOREIGN KEY (`recieverId`)
    REFERENCES `logali`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;