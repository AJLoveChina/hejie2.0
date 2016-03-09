CREATE TABLE `joke` (
  `joke_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT '',
  `content` text,
  `stamps` varchar(200) DEFAULT NULL,
  `likes` int(10) unsigned DEFAULT '0',
  `dislike` int(10) unsigned DEFAULT '0',
  `url` varchar(200) DEFAULT '',
  `has_get_image` tinyint(4) DEFAULT '0',
  `jokeType` tinyint(4) DEFAULT NULL,
  `jokeStatus` tinyint(4) DEFAULT '0',
  `dateEntered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(30) DEFAULT NULL,
  `userPersonalPageUrl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`joke_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13311 DEFAULT CHARSET=utf8;


CREATE TABLE tiezi(
	tiezi_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	parent_id INT UNSIGNED NOT NULL DEFAULT 0,
	title VARCHAR(200) DEFAULT "",
	content TEXT,
	tiezi_date TIMESTAMP,
	date_entered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(tiezi_id)
)


CREATE TABLE topic(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	tname VARCHAR(30),
	watchIndex INT,
	PRIMARY KEY (id)
) ENGINE = InnoDB,CHARSET = utf8;
