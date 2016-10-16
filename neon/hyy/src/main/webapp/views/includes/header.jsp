<%@page import="ajax.model.safe.User"%>
<%@page import="ajax.tools.Tools"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getRequestURL().toString();
	String title = (String)request.getAttribute("title");
	String description = (String) request.getAttribute("description");
	String keywords = (String) request.getAttribute("keywords");
	boolean isAdmin = User.isAdmin(request, response);
	
	if (title == null || title.equals("")) {
		title = "你个二货, 二货的俱乐部.生活不该只有眼前的苟且-你个二货,礼物の物语";
	} else {
		title += "-你个二货,礼物の物语";
	}
	
	if (description == null || description.equals("")) {
		description = "二货君与上千家店铺合作每天推出物美价廉的礼物,礼物在于情谊不在贵重.我们每天精挑细选生日礼物,情侣礼物,创意礼物,用最低的价格购买最心仪的礼物.对的,生活不会只有眼前的苟且,二货君与你同在.";
	}
	
	if (keywords == null || keywords.equals("")) {
		keywords = "礼物,生日礼物,情侣礼物,情人节礼物,母亲节礼物,父亲节礼物,生日礼物送什么,生日礼物女生,创意礼物,儿童节礼物,七夕礼物,圣诞节礼物,中秋节礼物,万圣节礼物,平安夜礼物,元旦礼物,春节礼物";
	}
	boolean isLocal = Tools.isLocal(path);
	request.setAttribute("isLocal", isLocal);
	
	List<PageType> pageTypes = PageType.getPageTypeShowOnNavBar();
	request.setAttribute("pageTypes", pageTypes);
	PageType currentPageType = PageType.getCurrentPage(path + "?" + request.getQueryString());
 %>
<!DOCTYPE html>
<html>
<head lang="en">
	<link rel="dns-prefetch" href="http://images.nigeerhuo.com">
	<link rel="dns-prefetch" href="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="description" content="<%=description%>">
    <meta name="keywords" content="<%=keywords %>">
    <link rel="shortcut icon" type="image/x-icon" href="http://images.nigeerhuo.com/images/web/pic/favicon.ico" />
    <meta property="qc:admins" content="7712403257661755205763757" />
    <meta name="google-signin-client_id" content="724523861492-9q9uh77mcrajedcgggb90qva3u3j7sm8.apps.googleusercontent.com">
    <meta name="mobile-agent" content="format=html5;url=http://wap.nigeerhuo.com/">
    <title><%=title %></title>
    <%@ include file="/views/includes/resource_server.jsp" %>
</head>
<body>

<%
	if (isAdmin) {
%>
	<style>
		#aj-admin-jump-btn{
			position: fixed;
			bottom:0;
			left:0;
			z-index:1001;
		}
	</style>

	<div id="aj-admin-jump-btn">
		<span class="glyphicon glyphicon-user"></span>
		<a href="/admin/list">管理员界面</a>
	</div>
<%	
	}
 %>
<div id="aj-header">
    <div class="clearfix">
    	<!--[if IE 8]>
    		<style>
    			#aj-header .container-fluid .navbar-header{
	    			display:inline-block;float:left;
	    		}
	    		#aj-header .aj-one-line{
	    			float:left;display:inline-block;margin-left:21px;
	    		}
    		</style>
    	<![endif]-->
        <div class="aj-b-a clearfix" style="display:inline-block;float:left;">
            <div style="display: inline-block;height: 50px;overflow: hidden;float:left;">
            	<a href="<%=UrlRoute.HOME%>">
            		 <img src="<%=UrlRoute.OSS_PUBLIC.getUrl() %>images/web/pic/dot.jpg" data-lazy="web/pic/logo.PNG" class="aj-lazy" height="70px " alt="你个二货"/>
            	</a>
            </div>
           	<div class="logotext aj-transition-all">你个二货</div>
        </div>
        
        
       <div class="aj-b-a aj-one-line">
       		<script>
       			$(function () {
       				try {
       					$("#aj-header .line-inside").find(".ali").each(function () {
	       					if ($(this).attr("page-url-id") == $(this).parents(".aul").attr("cur-page-url-id")) {
	       						$(this).addClass("select");
	       					}
	       				});
	       				/* if ($(document.body).width() < 800) {
	       					$("#aj-header").css("width", $(document.body	).css("width"));
	       				} */
       				}catch(ex){}
       			});
       		</script>
			<div class="line-inside">
				<ul class="aul" cur-page-url-id="<%=currentPageType.getId() %>">
					<c:forEach items="${pageTypes }" var="pageType">
						<li class="ali" page-url-id="${pageType.getId() }">
							<a href="${pageType.getHref() }">${pageType.getInfo()}</a>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
    </div>
    
    <div id="aj-mobile-sign-area">
    	<a href="javascript:;" class="aj-show-sign-panel">登陆</a>
    	<a href="javascript:;" class="aj-u-img-show">
    		<img src="" />
    	</a>
    </div>
</div>

<div style="height: 50px;"></div>

<%@ include  file="/views/includes/backTop.jsp"%>
	
<div id="aj-body" class="clearfix">