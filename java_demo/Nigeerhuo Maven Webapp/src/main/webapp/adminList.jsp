<%@ page language="java"  pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>





<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
	<ol>
		<li><a href="/admin/ads">首页滚动广告管理</a></li>
		<li><a href="/admin/homeNavThree">首页三个侧栏广告</a></li>
		<li><a href="/admin/upload">上传新的Item/编辑已有的item</a></li>
		<li>
			<a href="/admin/item/changepage">将某一个item从页面中删除, 并用另一个item替换</a>
		</li>
		<li>
			<a href="/admin/linksToBaidu">提交链接给百度</a>
		</li>
		<li>
			<a href="/admin/pageGenerator">生成新的页面</a>
		</li>
	</ol>
	
</div>


<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
