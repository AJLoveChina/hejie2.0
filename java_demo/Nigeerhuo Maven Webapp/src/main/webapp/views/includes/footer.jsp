<%@ page language="java"  pageEncoding="UTF-8"%>
<%@page import="ajax.model.safe.User"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	boolean isAdmin = User.isAdmin(request, response);
	request.setAttribute("isAdmin", isAdmin);
 %>





</div>
<!-- Close div#aj-body -->

<c:if test="${isAdmin }">
	<style>
		#aj-admin-jump-btn{
			position: fixed;
			bottom:200px;
			left:0;
		}
	</style>

	<div id="aj-admin-jump-btn">
		<span class="glyphicon glyphicon-user"></span>
		<a href="/admin/list">管理员界面</a>
	</div>
</c:if>



<footer id="aj-footer" role="contentinfo">
	<div class="container">
		<ul class="bs-docs-footer-links">
			<li><a href="https://github.com/AJLoveChina">GitHub</a></li>
			<li><a href="http://www.meajax.com/">Blog</a></li>
			<li><a href="http://www.oshjf.com">Shop</a></li>
		</ul>
		<p>
			Designed and built By AJ. This is for my little sister HYY, wish her happy forever.
		</p>
		<p>
			Code licensed MIT docs CC BY 3.0
		</p>
	</div>
</footer>


</body>
</html>