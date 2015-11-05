<?php
namespace Ajlovechina;

class Word {
    public $w_id, $w_val, $w_desc, $w_md5;
    protected  $dbc, $table;
    public $url = "http://dict.youdao.com/fsearch?client=deskdict&keyfrom=chrome.extension&pos=-1&doctype=xml&xmlVersion=3.2&dogVersion=1.0&vendor=unknown&appVer=3.1.17.4208&le=eng&q=";
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
    public function tishi () {
        echo 123;
    }
    public function ajax () {
        $data = file_get_contents($this->url.$this->w_val);
        if ($data) {
            return $data;
        } else {
            return "Error";
        }
    }
    public function get($begin, $num) {
        $step = 0;
        $query = sprintf("SELECT w_id, w_val, w_desc, w_md5, w_date_entered
                FROM %s WHERE w_id >= %d AND w_desc = '' LIMIT %d", $this->table, $begin, $num);
        $results = mysql_query($query, $this->dbc);
        $rows = [];
        if ($results) {
            while($row = mysql_fetch_array($results)) {
                array_push($rows, $row);
            }
        }

        for ($index = 0, $len = count($rows); $index < $len; $index ++ ) {
            $step ++;
            if ($step === 10) {
                $step = 0;
                echo "Sleep 2 seconds...";
                sleep(2);
            }
            $this->w_id = $rows[$index]['w_id'];
            $this->w_val = $rows[$index]['w_val'];
            $this->w_desc = mysql_real_escape_string($this->ajax());
            echo $this->w_desc."<br>";
            $this->save();
        }
    }
    public function save () {
        $query = sprintf("UPDATE %s SET w_desc = '%s' WHERE w_id = %d LIMIT 1",
            $this->table, $this->w_desc, $this->w_id);
        if (mysql_query($query, $this->dbc)) {
            return true;
        } else {
            return false;
        }
    }
}

?>