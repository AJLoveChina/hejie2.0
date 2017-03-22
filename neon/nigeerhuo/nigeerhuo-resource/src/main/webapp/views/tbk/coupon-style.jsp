<style>
.alert.coupons-title{
	padding:10px 15px;
	margin:0;
}
.show-hidden-coupons{
	  text-align: center;
    color: #999;
    font-weight: bold;
    padding: 0px 0 10px;
    cursor:pointer;
}
.show-hidden-coupons .status-a{
	display: none;
}
.show-hidden-coupons .status-b{
	display:block;
}
.show-hidden-coupons.is-zhedie .status-b{
	display:none;
}
.show-hidden-coupons.is-zhedie .status-a{
	display:block;
}
.coupons{}
.coupons.coupons-hide-more{
	max-height:620px;
	overflow: hidden;
}
.coupons .coupon{
	padding:8px 5px;
	height:310px;
	overflow: hidden;
}
.coupon{}
.coupon .inside{
	position:relative;
	height:294px;
	border-color: #c7c7c7;
    border-style: solid;
    border-width: 1px 1px 3px 1px;
    border-radius: 4px;
    background-color: #fff;
    padding:0;
    margin-right:5px;
}
.coupon .inside:hover{
	border-color:#adadad;
}
.coupon .img-wrap{
	height:150px;
	overflow:hidden;
}
.coupon .img-wrap .img{}
.coupon .pad-10{
	padding: 0 10px;
}
.coupon .font12{
	font-size:12px;
}
.coupon .title{
    line-height: 15px;
    height: 45px;
    color: #0072bc;
    height:45px;
    overflow: hidden;
    margin:4px 0 6px;
}
.coupon .shopname{
	color:#ccc;
	margin-bottom:6px;
	height:20px;
	overflow:hidden;
}
.coupon .denomination{
    font-style: normal;
    font-weight: 700;
    color: #60a430;
    font-size: 15px;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-top: 1px solid #e5e5e5;
    height: 33px;
    padding-top:6px;
    text-align: center;
}
.coupon .user-callback{
    background-color: #fcfcfc;
    color: #c7c7c7;
    border-radius: 0 0 4px 4px;
    border-top: 1px solid #D6D6D6
}
.coupon .user-callback .btn-click{
	text-align: center;
	display: inline-block;
	height:25px;
	line-height:25px;
	cursor:pointer;
}
.coupon .user-callback .btn-click:hover{
	color:#0072bc;
}
.coupon .user-callback .b-icon{}
.coupon .user-callback .num{}
.coupon .user-callback .likes{
	width:48%;
	border-right:1px solid #ccc;
}
.coupon .user-callback .dislikes{
	width:48%;
}
.coupon.click-show-more{
	text-align: center;
	cursor:pointer;
}
.coupon .click-info{
	position:absolute;
	left:0;bottom:0;
	width:100%;
	height: 60px;
	background-color: #fcfcfc;
	border-top:1px solid #D6D6D6;
	color:#666;
	line-height: 30px;
}
.coupon .icon-info{
	padding-top:60px;
}
.coupon .icon-info .aj-icon{
	font-size:70px;
	color:#aaa;
}


</style>
