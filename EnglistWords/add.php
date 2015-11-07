<?php

include("app/words.php");
use \Ajlovechina\Word;



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

set_time_limit(0);
if (isset($_GET["add"])) {
	$arf = new ajReadFile();
	$arf->fileName = "words.txt";
	$arf->read();
}


?>