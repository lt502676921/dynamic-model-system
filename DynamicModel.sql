/*
 Navicat Premium Data Transfer

 Source Server         : oreo
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : DynamicModel

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 08/10/2022 14:42:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hideInMenu` tinyint(1) NOT NULL DEFAULT '0',
  `hideChildrenInMenu` tinyint(1) NOT NULL DEFAULT '0',
  `flatMenu` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (5, 0, 'admin-list', 'icon-user', '/basic-list/api/admins', 0, 0, 0, 1, '2020-10-14 16:02:58', '2020-10-15 10:45:48', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (6, 5, 'add', '', '/basic-list/api/admins/add', 1, 0, 0, 1, '2020-10-14 16:04:00', '2020-10-23 22:53:15', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (7, 5, 'edit', '', '/basic-list/api/admins/:id', 1, 0, 0, 1, '2020-10-14 16:04:29', '2020-10-23 22:53:10', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (14, 0, 'menu-list', 'icon-menu', '/basic-list/api/menus', 1, 0, 0, 1, '2020-10-14 16:09:14', '2020-10-15 10:47:46', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (15, 14, 'add', '', '/basic-list/api/menus/add', 1, 0, 0, 1, '2020-10-14 16:09:26', '2020-10-14 16:09:47', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (16, 14, 'edit', '', '/basic-list/api/menus/:id', 1, 0, 0, 1, '2020-10-14 16:09:49', '2020-10-14 16:10:04', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (19, 0, 'model-list', 'icon-appstore', '/basic-list/api/models', 0, 0, 0, 1, '2020-10-15 12:59:07', '2020-10-17 23:32:43', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (20, 19, 'add', '', '/basic-list/api/models/add', 1, 0, 0, 1, '2020-10-15 13:02:33', '2020-10-17 23:32:50', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (21, 19, 'edit', '', '/basic-list/api/models/:id', 1, 0, 0, 1, '2020-10-15 13:03:19', '2020-10-15 13:03:32', NULL);
INSERT INTO `menu` (`id`, `parent_id`, `name`, `icon`, `path`, `hideInMenu`, `hideChildrenInMenu`, `flatMenu`, `status`, `create_time`, `update_time`, `delete_time`) VALUES (22, 19, 'design', '', '/basic-list/api/models/design/:id', 1, 0, 0, 1, '2020-10-15 13:06:00', '2020-10-15 13:55:11', NULL);
COMMIT;

-- ----------------------------
-- Table structure for model
-- ----------------------------
DROP TABLE IF EXISTS `model`;
CREATE TABLE `model` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `route_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of model
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delete_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `nickname`, `avatar`, `create_time`, `update_time`, `delete_time`, `status`) VALUES (1, 'admin', '5a278dcdf8979ee4be6077b607cfe484', 'admin', '', 'https://joeschmoe.io/api/v1/random', '2022-10-08 13:44:58', '2022-10-08 13:44:58', '2022-10-08 13:44:58', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
