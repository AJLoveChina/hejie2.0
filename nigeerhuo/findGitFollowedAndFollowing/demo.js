/**
 * Created by hejie2.0
 * Coding love on 2017/3/22.
 */
var list = document.querySelectorAll("#js-pjax-container > div > div.col-9.float-left.pl-2 > div.js-repo-filter.position-relative > div .link-gray.pl-1");
var arr = [];
list.forEach(function (item) {
    arr.push(item.innerText);
});
console.log(arr);
console.log(JSON.stringify(arr));
