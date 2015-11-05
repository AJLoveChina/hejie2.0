<?php

class Word {
	public $w_val, $w_desc, $w_md5;
	protected  $dbc, $table;
	function __construct () {
		$this->dbc = mysql_connect("localhost", 'name', '123');
		mysql_select_db("test", $this->dbc);
		$this->table = "words";
	}
	public function set($word) {
		$s_w = trim($word);
		$this->w_val = $s_w;
		$this->w_desc = "";
		$this->w_md5 = md5($s_w);
	}
	public function upload() {
		$query = sprintf("INSERT INTO %s (w_val, w_desc, w_md5) VALUES('%s', '%s', '%s')",
					$this->table, $this->w_val, $this->w_desc, $this->w_md5);
		if (mysql_query($query, $this->dbc)) {
			return true;
		} else {
			return false;
		}
	}
}

class ajReadFile {
	public $fileName;
	protected $word;
	function __construct(){
		$this->word = new Word();
	}
	public function read() {
		$fp = fopen($this->fileName, 'r');
		if ($fp) {
			while(($line = fgets($fp)) !== false) {
				$this->word->set($line);
				if ($this->word->upload()) {
					echo $line."-OK<br>";
				}
			}
			fclose($fp);
		} else {
			$this->error();
		}
	}
	public function error(){
		return "error";
	}
}

$arf = new ajReadFile();
$arf->fileName = "words.txt";
$arf->read();


?>