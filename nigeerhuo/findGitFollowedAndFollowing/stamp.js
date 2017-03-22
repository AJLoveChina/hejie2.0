/**
 * Created by hejie2.0
 * Coding love on 2017/3/22.
 */
var list = ["sixiong","ichabodphp","watano","kalasoo","chiahaolu","beanlee","OldPanda","Acvrock","leonguo","jiangzhuo","uniquexiaobai","NoBey","shangraochq","yc2prime","ZachBergh","liyv1314","Liaoer","Ryan-Page","crackeer","emitle","hbzs","whqet","staugur","ql9075","qiaoyunrui","ChenLi0830","desperadoray","NoahDragon","crossoverJie","Mayweiwang","GoldLen","ctolib","SkyeTang","OlayChe","40huo","Galaxy21Yang","0532","Slahser","Lunsqby","Raincal","jiangli373","sherylynn","liangxiaojuan","ppxu","CoderZhuXH","ty4z2008","EPyutao","StrangeClow","Haidy-Cao","Doris-ys","Liujy1994","Poppy-flower","henry-yanrui","libp","potatoch","tingfeng-key","dallasbule","whdcumt","XiaTian007","jukieq","thx2332","JackLiim","qinix","benjaminwhx","stoked-zz","PeytonsProfile","riyasmohamedmr","shoshindes","conanli","codersaiful","Yzchen1994","huxinxing","jinglei1995","cusspvz","mssalvo","ChangWenbiao"];
console.log(list.length);


var these = document.querySelectorAll("#js-pjax-container > div > div.col-9.float-left.pl-2 > div.js-repo-filter.position-relative > div .link-gray.pl-1");

these.forEach(function (item) {

    if (list.indexOf(item.innerText) == -1) {
        item.innerHTML = item.innerText + "<b>WOQU!!!!!!</b>"
    }

})