<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

JokeType[] jokeTypes = JokeType.getAllJokeTypes();
request.setAttribute("jokeTypes", jokeTypes);
%>

<style>
	.aj-right-types-choices{
		margin-top:10px;	
	}
	.aj-right-types-choices .aheader{
		height:30px;
		border-bottom: 1px solid #ccc;
	}
	.aj-right-types-choices .aheader .ali{
		display: inline-block;
		height: 29px;
		border-bottom: 1px solid #ccc;
		padding: 0 10px;
		text-align: center;
		line-height: 30px;
		font-size:18px;
	}
	.aj-right-types-choices .aheader .ali.selected{
		border-bottom: 2px solid #f04848;
	}
	.aj-right-types-choices .acontent{
		margin-top:10px;
		border-top:1px solid #ccc;
		border-left: 1px solid #ccc;
	}
	
	.aj-right-types-choices .acontent .ali{
		width:33.3%;
		height: 38px;
		text-align: center;
		line-height: 38px;
		float:left;
		font-size: 12px;
		white-space: nowrap;
	}
	.aj-right-types-choices .acontent .ali:hover{
		outline:1px solid red;
	}
	.aj-right-types-choices .acontent .ali .ali-wrap{
		display: block;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		overflow: hidden;
	}
	.aj-right-types-choices .acontent .ali .aicon{
		
	}
	.aj-right-types-choices .acontent .ali .ainfo{
		
	}
</style>

<div class="aj-right-types-choices">
	<div class="aheader">
		<ul class="aul">
			<li class="ali selected">分类导航 </li>
		</ul>
	</div>
	
	<div class="acontent">
		<ul class="clearfix">
		
			<c:forEach items="${jokeTypes}" var="jokeType">
				<li class="ali">
					<span class="ali-wrap">
						<em class="aicon ${jokeType.getIconClassName() }"></em>
						<span class="ainfo">${jokeType.getInfo() }</span>
					</span>
				</li>
			</c:forEach>
			
		</ul>
	</div>
</div>