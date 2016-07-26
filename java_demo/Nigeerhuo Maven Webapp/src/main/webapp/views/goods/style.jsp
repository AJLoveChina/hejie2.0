<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<style>

.aj-grid-list{
	position:relative;
	height:370px!important;
}
.aj-grid-list .aj-header{
	position:relative;
	width:100%;height:29px;
	border-bottom:1px dashed rgb(232, 232, 232);
	margin-bottom:4px;margin-top:5px;
}
.aj-grid-list .aj-logo{
	position:absolute;
	bottom:0;left:0;
}
.aj-grid-list .aj-mall-left{
	left:15px;right:auto;
}
.aj-grid-list .itemUserInfo{
	margin-bottom:5px!important;overflow:visible!important;
	display:inline-block!important;
}
.aj-grid-list .itemUserInfo .rankTitle{
	padding-left:5px;color:#999;text-decoration:none;
}
.aj-grid-list .itemUserInfo .rankTitle .aj-hour{
	color:#7bb12f;padding:0 2px;width:120px;
}
.aj-grid-list .aj-desc-wrap{
	height:60px;margin-bottom:5px;position:relative;
}
.aj-grid-list .aj-desc-wrap .aj-desc{
	height:60px;line-height:20px;
	margin-bottom:0!important;
}
.aj-grid-list .picBox{
	margin-bottom:5px!important;
	margin-top:0px!important;
}
.aj-grid-list .haitao-coupons-list{
	height:30px!important;
	position:absolute;
	top:40px;left:0;
}
.aj-grid-list .haitao-coupons-list li{
	margin-top:0!important;
}
.aj-grid-list  .zan_fav_com{
	padding-top:4px!important;
}
.aj-grid-list a.zan i,.aj-grid-list a.comment i{
	margin-right:0!important;
}
.aj-grid-list .zan_fav_com a{
	margin-right:0!important;
}
/* .aj-grid-list .aj-s-yan-only{
	background-image:url(http://www.quanmama.com/AdminImageUpload/5257485home_icon.png);
	background-position:0 -203px;
	width:20px;height:20px;
	position:relative;
	top:3px;
	float:left;
} */
.aj-grid-list .aj-s-yan-only{
 	width:20px;height:20px;
	position:relative;
	top:3px;
	float:left;
    font-size:20px;
}
.aj-grid-list .aj-s-yan-only[rank="1"]{
    color:rgb(102, 20, 5);
}
.aj-grid-list .aj-s-yan-only[rank="2"]{
    color:rgb(139, 0, 0);
}
.aj-grid-list .aj-s-yan-only[rank="3"]{
    color:rgb(160, 0, 0);
}
.aj-grid-list .aj-s-yan-only[rank="4"]{
    color:rgb(173, 64, 0);
}
.aj-grid-list .aj-s-yan-only[rank="5"]{
    color:rgb(152, 100, 5);
}
.aj-grid-list .aj-s-yan-only[rank="6"]{
    color:rgb(102, 120, 5);
}
.aj-grid-list .aj-s-yan-only[rank="7"]{
    color:rgb(102, 140, 5);
}
.aj-grid-list .aj-s-yan-only[rank="8"]{
    color:rgb(102, 160, 5);
}
.aj-grid-list .aj-s-yan-only[rank="9"]{
    color:rgb(102, 180, 5);
}
.aj-grid-list .aj-s-yan-only[rank="10"]{
    color:rgb(102, 200, 5);
}
.aj-grid-list .itemUserInfo{
	cursor:pointer;
}
.aj-grid-list .itemUserInfo:hover .aj-zhishi{
	display:block;
	opacity:1;
	filter:alpha(opacity=100);
}
.aj-grid-list .aj-zhishi{
	position:absolute;
	display:block;
	top:-36px;left:-7px;
	font-size:12px;
	padding:6px 3px;
	min-width:100px;height:18px;line-height:18px;
	border:1px solid rgb(217, 217, 214);
	background-color:white;
	text-align:center;
	border-radius:2px;
	color:rgb(51, 51, 51);
	display:none;
	opacity:0;
	filter:alpha(opacity=0);
	white-space:nowrap;
}
.aj-grid-list .aj-zhishi.aj-pian-left{
	left:-37px;
}
.aj-grid-list .aj-zhishi:before{
	border-right:7px solid rgba(0, 0, 0, 0);
	border-bottom:7px solid rgba(0, 0, 0, 0);
	border-top:7px solid rgb(217, 217, 214);
	border-left:7px solid rgba(0, 0, 0, 0);
	bottom:-14px;
	left:39px;
	position:absolute;
	content:'';
}
.aj-grid-list  .aj-zhishi:after{
	border-right:6px solid rgba(0, 0, 0, 0);
	border-bottom:6px solid rgba(0, 0, 0, 0);
	border-top:6px solid rgb(255, 255, 255);
	border-left:6px solid rgba(0, 0, 0, 0);
	bottom:-12px;
	left:40px;
	position:absolute;
	content:'';	
}
.aj-grid-list .aj-roll-wrap{
	height:20px;line-height:20px;position:absolute;top:3px;right:0;
}
.aj-grid-list .aj-roll-wrap .aj-percent{
	position:absolute;
	left:3px;
	float:left;color:white;
}
.aj-grid-list .aj-roll{
	position:relative;
	display:inline-block;
	width:50px;height:15px;
	margin:2px 4px 0 0;
	background-color:#ccc;
	overflow:hidden;
	float:left;border:1px solid #ccc;border-radius:2px;
}
.aj-grid-list .aj-roll-wrap:hover .aj-zhishi{
	display:block;
	opacity:1;
	filter:alpha(opacity=100);
}
.aj-grid-list .aj-roll .aj-inside{
	position:absolute;
	top:0;
	display:block;
	width:100%;height:15px;
}
.aj-grid-list .aj-roll .aj-inside[rank="1"]{
	background-color:rgb(102, 20, 5);
	right:90%;
}
.aj-grid-list .aj-roll .aj-inside[rank="2"]{
	background-color:rgb(139, 0, 0);
	right:80%;
}
.aj-grid-list .aj-roll .aj-inside[rank="3"]{
	background-color:rgb(160, 0, 0);
	right:70%;
}
.aj-grid-list .aj-roll .aj-inside[rank="4"]{
	background-color:rgb(173, 64, 0);
	right:60%;
}
.aj-grid-list .aj-roll .aj-inside[rank="5"]{
	background-color:rgb(152, 100, 5);
	right:50%;
}
.aj-grid-list .aj-roll .aj-inside[rank="6"]{
	background-color:rgb(102, 120, 5);
	right:40%;
}
.aj-grid-list .aj-roll .aj-inside[rank="7"]{
	background-color:rgb(102, 140, 5);
	right:30%;
}
.aj-grid-list .aj-roll .aj-inside[rank="8"]{
	background-color:rgb(102, 160, 5);
	right:20%;
}
.aj-grid-list .aj-roll .aj-inside[rank="9"]{
	background-color:rgb(102, 180, 5);
	right:10%;
}
.aj-grid-list .aj-roll .aj-inside[rank="10"]{
	background-color:rgb(102, 200, 5);
	right:0;
}
.aj-grid-list .zan_fav_com .icon-cai2{
	display:inline-block;
	width:20px;height:16px;
	background-image:url(http://www.quanmama.com/AdminImageUpload/5257485home_icon.png);
	background-position:-209px -219px;
	position:relative;top:2px;
}
.aj-grid-list .item_buy_mall{
	position:relative;
}
.aj-grid-list .item_buy_mall .directLink{
	position:absolute;top:3px;right:0;
}

.aj-grid-list .aj-stamps{
	float:right;
	display:block;
	width:auto!important;
	margin:5px 15px 0 0;
}
.aj-grid-list .aj-stamps.aj-none{
	opacity:0;
	filter:alpha(opacity=0);
}
.aj-grid-list .aj-stamps-x{
	height:20px;
	overflow:hidden;
	text-align:center;
	padding:0!important;
}
.aj-grid-list .aj-stamps .aj-stamp{
	position:relative;
	display:inline-block;
	width:18px;height:18px;
	line-height:18px;
	text-align:center;
	margin-left:4px;
	margin-right:0!important;
	color:white;
	border-radius:2px;
	display: none;
}
.aj-grid-list .aj-stamps-x .aj-stamp{
	float:left;
}
.aj-grid-list .aj-stamps .aj-stamp[rank="1"]{
	opacity:1;
	filter:alpha(opacity=100);
}
.aj-grid-list .aj-stamps .aj-stamp[rank="2"]{
	opacity:0.7;
	filter:alpha(opacity=70);
}
.aj-grid-list .aj-stamps .aj-stamp[rank="3"]{
	opacity:0.4;
	filter:alpha(opacity=40);
}
.aj-grid-list .aj-stamps .aj-stamp[rank="4"]{
	opacity:0.2;
	filter:alpha(opacity=20);
}
.aj-grid-list .aj-stamps .aj-yan{
	background-color:rgb(20, 174, 24);
	border:1px solid rgb(20, 174, 24);
}
.aj-grid-list .aj-stamps .aj-hot{
	background-color:rgb(255, 78, 0);
	border:1px solid rgb(255, 78, 0);
}
.aj-grid-list .aj-stamps .aj-jian{
	background-color:rgb(49, 144, 232);
	border:1px solid rgb(49, 144, 232);
}
.aj-grid-list .aj-stamps .aj-new{
	background-color:rgb(231, 89, 89);
	border:1px solid rgb(231, 89, 89);
}
.aj-grid-list .aj-stamps-x .aj-stamp .aj-info{
	display:none;
}

/*----------*/


.discovery_list li.list
        {
            border: 1px solid #dcdcdc;
            float: left;
            height: 470px;
            margin: 0 2px 16px;
            padding-bottom: 0;
            position: relative;
            width: 230px;
        }
        
          .discovery_list li.lipinkalist
        {
            border: 1px solid #dcdcdc;
            float: left;
            height: 350px;
            margin: 0 2px 16px;
            padding-bottom: 0;
            position: relative;
            width: 230px;
        }
        
.discovery_list li:hover {
	-webkit-box-shadow:#ccc 0 2px 5px;
	-moz-box-shadow:#ccc 0 2px 5px;
	box-shadow:#ccc 0 2px 5px;
	border-color:#f04848
}
.discovery_list a.picBox {
	display:block;
	width:100%;
	height:200px;
	margin:15px auto 12px;
	text-align:center;
	overflow:hidden
}

.discovery_list a.picBox
{
    margin-bottom:15px;
}
    
.discovery_list .listItem,.show_list .listItem {
	padding:0 15px;
	font-size:12px
}
.discovery_list .itemName {
	height:60px;
	line-height:20px;
	overflow:hidden;
	margin-bottom:8px;
	font-size:14px;
	padding-left:0;
	font-weight:bold
}
.discovery_list .itemName .red {
	display:block;
	height:20px;
	line-height:20px;
	overflow:hidden
}
.discovery_list .itemName .black {
	max-height:40px;
	display:block;
	line-height:20px;
	overflow:hidden
}
.discovery_list .rankAvatar {
	width:128px
}
/* INFO AJ 2015-09-20 img middle*/
.discovery_list .aj-grid-list .picBox
{
    font-size : 0;
}
.discovery_list .aj-grid-list .picBox:before
{
    content:'';
    display:inline-block;
    width:0;height:100%;
    margin-left:-1px;
    vertical-align:middle;    
}
.discovery_list .aj-grid-list .picBox img
{
    vertical-align:middle;
}

.discovery_list .mall_word,.discovery_list .mall_time_word {
	color:#5188a6;
	display:block;
	filter:alpha(opacity=100);
	-moz-opacity:1;
	opacity:1;
	position:relative
}
.discovery_list .mall_time_word {
	color:#999
}
.discovery_list .mall_bg {
	width:100%;
	height:24px;
	background-color:#f5f5f5;
	filter:alpha(opacity=50);
	-moz-opacity:.5;
	opacity:.5;
	display:block;
	-webkit-border-radius:2px;
	-moz-border-radius:2px;
	-ms-border-radius:2px;
	-o-border-radius:2px;
	border-radius:2px;
	position:absolute;
	right:0;
	top:0
}
.discovery_list a.directLink {
	width:72px;
	height:28px;
	line-height:28px;
	display:inline-block;
	background-color:#f04848;
	color:#fff;
	text-align:center;
	-webkit-border-radius:2px;
	-moz-border-radius:2px;
	-ms-border-radius:2px;
	-o-border-radius:2px;
	border-radius:2px
}
.discovery_list .zan_fav_com {
	height:24px;
	float:left;
	padding-top:1px;
	color:#f04848;
	font-weight: bold;
}
.discovery_list .zan_fav_com a {
	padding-left:1px;
	margin-right:10px
}
.discovery_list .time {
	width:66px;
	height:26px;
	overflow:hidden;
	text-align:right
}

@media(max-width:900px) {
	.discovery_list li.list{
		width:48%!important;
		border:0 1% 10px!important;
	}
}
.aj-grid-list .reserev-price{
	font-size:12px;color:#aaa;
	text-decoration: line-through;
	font-weight:normal;
}

</style>