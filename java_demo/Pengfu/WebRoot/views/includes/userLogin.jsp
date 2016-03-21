<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<style>
	.user-login{
		position:relative;
		width:100%;
		margin-top: 10px;
	}
	.user-login .u-l-photo{
		position:absolute;
		top:0;left:0;
		width:60px;
		height:60px;
		border-radius:50%;
		line-height: 60px;
		text-align: center;
		color:white;
		font-size: 30px;
		background-color: #ccc;
	}
	.user-login .u-l-right{
		padding-left: 70px;
	}
	.user-login .u-l-right .line{
		height:20px;
		line-height: 20px;
		font-size: 12px;
		margin: 0;
	}
	.user-login .u-l-footer{
		padding-top: 10px;
	}
	.user-login .u-l-footer .ajbtn{
		position:relative;
		width:50%;
		height:30px;
		float:left;
	}
	.user-login .u-l-footer .href{
		width:90%;
		height: 30px;
		display:block;
		margin:0 auto;
		border-radius:2px;
		background-color: #f04848;
		color:white;
		text-align: center;
		line-height: 30px;
	}
	.user-login .u-l-footer .href.blue{
		background-color: #2e76a8;
	}
</style>

<div class="user-login">
	<div class="u-l-photo glyphicon glyphicon-user"></div>
	<div class="u-l-right">
		<p class="line">Hi 你好</p>
		<p class="line">
			<a href="">登陆</a>
			,发现更多精彩
		</p>
		<p class="line">二货俱乐部</p>
	</div>
	<div class="u-l-footer clearfix">
		<div class="ajbtn">
			<a class="href" href="">签到领积分</a>
		</div>
		<div class="ajbtn">
			<a class="href blue" href="">积分兑换</a>
		</div>
	</div>
</div>