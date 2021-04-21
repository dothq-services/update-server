
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dotupdate` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `dotupdate`;
DROP TABLE IF EXISTS `releases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `releases` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `product` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `channel` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `locale` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `target` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `version` int(11) NOT NULL DEFAULT '0',
  `displayVersion` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `buildID` varchar(255) NOT NULL DEFAULT '0',
  `whatsNewURL` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `releaseNotesURL` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `releaseFileURL` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `releaseFileChecksum` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `releaseFileSize` int(11) NOT NULL DEFAULT '0',
  `releaseType` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='DotUpdate Releases';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `releases` WRITE;
/*!40000 ALTER TABLE `releases` DISABLE KEYS */;
INSERT INTO `releases` VALUES (0,'Dot-2.0a1','dot','release','en-GB','WINNT_x86_x64','1.0a1','Dot 1.0a1',20210103,'https://new.dothq.co','https://new.dothq.co','https://new.dothq.co/download','760982375vnm9082067mnv2923765v0932v7mnvc965t2',12345,'minor');
/*!40000 ALTER TABLE `releases` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `target-aliases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `target-aliases` (
  `target` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `alias` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`target`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='DotUpdate Target Aliases';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `target-aliases` WRITE;
/*!40000 ALTER TABLE `target-aliases` DISABLE KEYS */;
/*!40000 ALTER TABLE `target-aliases` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `targets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `targets` (
  `name` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `displayname` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='DotUpdate Targets';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `targets` WRITE;
/*!40000 ALTER TABLE `targets` DISABLE KEYS */;
/*!40000 ALTER TABLE `targets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

