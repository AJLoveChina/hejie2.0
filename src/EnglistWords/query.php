<?php
include('app/words.php');
use \Ajlovechina\Word;

class Query {
    public $url = "http://dict.youdao.com/fsearch?client=deskdict&keyfrom=chrome.extension&pos=-1&doctype=xml&xmlVersion=3.2&dogVersion=1.0&vendor=unknown&appVer=3.1.17.4208&le=eng&q=";
    public function ajax () {
        $w = new Word();
        $w->get(1, 1000);
    }
    public function queryById ($id) {
        $s_id = (int)$id;
        $w = new Word();
        echo $w->queryById($s_id);
    }
    public function select () {
        $w = new Word();
        $rows = $w->selectLatest(100);
//        foreach($rows as $key=>$val) {
//            echo $val["w_desc"]."<hr>";
//        }
        echo json_encode($rows);
    }

}

set_time_limit(0);
$q = new Query();
if (isset($_GET["id"])) {
    $q->queryById($_GET['id']);
} else if (isset($_GET['select'])){
    //$q->ajax();
    $q->select();
}


?>