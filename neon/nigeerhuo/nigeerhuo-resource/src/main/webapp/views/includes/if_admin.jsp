<%@page import="ajax.model.safe.User"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%
	boolean isAdmin2 = User.isAdmin(request, response);
	if (isAdmin2) {
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