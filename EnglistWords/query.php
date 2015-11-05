<?php
include('app/words.php');
use \Ajlovechina\Word;

class Query {
    public $url = "http://dict.youdao.com/fsearch?client=deskdict&keyfrom=chrome.extension&pos=-1&doctype=xml&xmlVersion=3.2&dogVersion=1.0&vendor=unknown&appVer=3.1.17.4208&le=eng&q=";
    public function ajax () {
        $w = new Word();
            $w->get(785378, 1000);
    }
}

set_time_limit(0);
$q = new Query();
$q->ajax();

?>