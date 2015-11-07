<?php

include("../app/words.php");
use \Ajlovechina\Word;

class Upload {
    public function get($id, $num) {
        $rows = [];
        $w = new Word();
        while($num --) {
            array_push($rows, $w->getById($id));
            $id ++;
        }
        echo json_encode($rows);
    }
    public function getOne($id) {
        $w = new Word();
        echo json_encode($w->getById($id));
    }
}
$id = (int)$_GET["id"];
//$num = isset($_GET["num"]) ? $_GET["num"] : 1;

$up = new Upload();
$up->getOne($id);


?>