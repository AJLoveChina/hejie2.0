CREATE TABLE `item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT '' UNIQUE,
  `title` varchar(200) DEFAULT '',
  `summary` text,
  `content` text,
  `stamps` varchar(200) DEFAULT NULL,
  `likes` int(10) unsigned DEFAULT '0',
  `dislikes` int(10) unsigned DEFAULT '0',
  `hasGetImage` tinyint(4) DEFAULT '0',
  `itype` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `username` varchar(30) DEFAULT NULL,
  `userPersonalPageUrl` varchar(200) DEFAULT NULL,
  `backgroundInformation` text,
  `dateEntered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB,DEFAULT CHARSET=utf8;