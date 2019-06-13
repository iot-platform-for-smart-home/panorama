/*
 Navicat Premium Data Transfer

 Source Server         : first
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : expressjs

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 12/06/2019 21:19:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `deviceId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `deviceName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `deviceType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `manufacture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imageLoc1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imageLoc2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sceneId` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`deviceId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES ('3fc046b0-3bf6-11e9-8fc2-67fbc94ac784', '台灯三', 'switch', '4.545', '0.456', 'Gantch', 'FB56-ZSW04KJ1.0', 'on.png', 'off.png', 3, 1);
INSERT INTO `device` VALUES ('3fc88410-3bf6-11e9-8fc2-67fbc94ac784', '台灯四', 'switch', '4.703', '0.471', 'Gantch', 'FB56-ZSW04KJ1.0', 'on.png', 'off.png', 3, 1);
INSERT INTO `device` VALUES ('3fd0e880-3bf6-11e9-8fc2-67fbc94ac784', '台灯一', 'switch', '4.190', '0.406', 'Gantch', 'FB56-ZSW04KJ1.0', 'on.png', 'off.png', 3, 1);
INSERT INTO `device` VALUES ('4f248da0-3bf6-11e9-8fc2-67fbc94ac784', '台灯二', 'switch', '4.342', '0.445', 'Gantch', 'FB56-ZSW04KJ1.0', 'on.png', 'off.png', 3, 1);
INSERT INTO `device` VALUES ('7b35c440-43df-11e9-8fc2-67fbc94ac784', '左侧窗帘', 'curtain', '6.267', '0.260', 'Gantch', 'FB56-CUR15SB1.1', 'curtainOpen.png', 'curtainClose.png', 1, 2);
INSERT INTO `device` VALUES ('87592310-e800-11e8-9f99-b5f037671c32', 'PM2.5', 'PM2.5', '4.639', '0.036', 'Gantch', 'FZB5606L        ', 'pm2.5.png', 'pm2.5.png', 3, 3);
INSERT INTO `device` VALUES ('9486fd00-f6dd-11e8-82b7-adcfa1bb02b4', '插座', 'outlet', '4.521', '0.173', 'Gantch', 'FB56+SKT14AL1.6', 'Outlet-open.png', 'Outlet-close.png', 3, 1);
INSERT INTO `device` VALUES ('d5129840-e34e-11e8-9f99-b5f037671c32', '办公室灯', 'switch', '1.495', '-0.37', 'Gantch', 'FB56-ZSW01KJ1.7', 'lamp-on.png', 'lamp-off.png', 5, 1);
INSERT INTO `device` VALUES ('dfa683a0-398b-11e9-8fc2-67fbc94ac784', '右侧窗帘', 'curtain', '0.626', '0.226', 'Gantch', 'FB56-CUR15SB1.1', 'curtainOpen.png', 'curtainClose.png', 1, 2);

-- ----------------------------
-- Table structure for device_copy1
-- ----------------------------
DROP TABLE IF EXISTS `device_copy1`;
CREATE TABLE `device_copy1`  (
  `deviceId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `deviceName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `deviceType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `manufacture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imageLoc1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imageLoc2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sceneId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`deviceId`, `sceneId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of device_copy1
-- ----------------------------
INSERT INTO `device_copy1` VALUES ('3fd0e880-3bf6-11e9-8fc2-67fbc94ac784', '台灯一', 'switch', '4.258', '0.410', 'Gantch', 'FB56-ZSW04KJ1.0', 'on.png', 'off.png', '1560306178103', 1);
INSERT INTO `device_copy1` VALUES ('4f248da0-3bf6-11e9-8fc2-67fbc94ac784', '台灯二', 'switch', '4.408', '0.427', 'Gantch', 'FB56-ZSW04KJ1.0', 'on.png', 'off.png', '1560306178103', 1);
INSERT INTO `device_copy1` VALUES ('7b35c440-43df-11e9-8fc2-67fbc94ac784', '左侧窗帘', 'curtain', '0.019', '0.243', 'Gantch', 'FB56-CUR15SB1.1', 'curtainOpen.png', 'curtainClose.png', '1', 2);
INSERT INTO `device_copy1` VALUES ('87592310-e800-11e8-9f99-b5f037671c32', 'pm2.5', 'switch', '4.585', '0.157', 'Gantch', 'FZB5606L        ', 'pm2.5.png', 'pm2.5.png', '1560306178103', 3);
INSERT INTO `device_copy1` VALUES ('9486fd00-f6dd-11e8-82b7-adcfa1bb02b4', '插座', 'outlet', '4.371', '0.171', 'Gantch', 'FB56+SKT14AL1.6', 'Outlet-open.png', 'Outlet-close.png', '1560306178103', 1);

-- ----------------------------
-- Table structure for marker
-- ----------------------------
DROP TABLE IF EXISTS `marker`;
CREATE TABLE `marker`  (
  `markerId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sceneId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`markerId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of marker
-- ----------------------------
INSERT INTO `marker` VALUES ('1560306178103To1', '6.167665973607597', '-0.13533364567108852', '1560306178103');
INSERT INTO `marker` VALUES ('1560306178103To1560344518513', '2.2021108252816335', '-0.08688513591609648', '1560306178103');
INSERT INTO `marker` VALUES ('1560344518513To1560306178103', '3.0621315868048895', '-0.4318804751072145', '1560344518513');
INSERT INTO `marker` VALUES ('1560344518513To1560344547899', '5.3125410693909005', '0.15702388945156498', '1560344518513');
INSERT INTO `marker` VALUES ('1560344547899To1560344518513', '3.2144873663685214', '0.08258441138780759', '1560344547899');
INSERT INTO `marker` VALUES ('1To1560306178103', '3.1896644915582004', '-0.13214345492316304', '1');

-- ----------------------------
-- Table structure for scene
-- ----------------------------
DROP TABLE IF EXISTS `scene`;
CREATE TABLE `scene`  (
  `sceneId` bigint(255) NOT NULL,
  `img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`sceneId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of scene
-- ----------------------------
INSERT INTO `scene` VALUES (1, '1.JPG');
INSERT INTO `scene` VALUES (1560306178103, '3.JPG');
INSERT INTO `scene` VALUES (1560344518513, '4.JPG');
INSERT INTO `scene` VALUES (1560344547899, '5.JPG');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pass_word` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2015211552', 123);
INSERT INTO `user` VALUES ('ball', 2);
INSERT INTO `user` VALUES ('ccc', 123);
INSERT INTO `user` VALUES ('ingram', 14);
INSERT INTO `user` VALUES ('科比', 81);
INSERT INTO `user` VALUES ('荣保国', 123456);
INSERT INTO `user` VALUES ('荣帅', 24);

-- ----------------------------
-- Table structure for user_copy1
-- ----------------------------
DROP TABLE IF EXISTS `user_copy1`;
CREATE TABLE `user_copy1`  (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pass_word` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_copy1
-- ----------------------------
INSERT INTO `user_copy1` VALUES ('Kobe', 24);
INSERT INTO `user_copy1` VALUES ('荣帅', 24);

SET FOREIGN_KEY_CHECKS = 1;
