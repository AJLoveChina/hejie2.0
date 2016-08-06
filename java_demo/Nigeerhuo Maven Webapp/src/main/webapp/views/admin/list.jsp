<%@page import="ajax.model.UrlRoute"%>
<%@ page language="java"  pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>





<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
	<ol>
		<li><a href="<%=UrlRoute.ADMIN_HOME_ROLLADS_MANAGEMENT_URL.getUrl() %>">首页滚动广告管理</a></li>
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
		<li>
			<a href="http://www.iconfont.cn/users/27262/project?spm=a313x.7781069.0.0.pVMM8tr">font icons图标管理</a>
			<a href="http://v3.bootcss.com/components/">Bootstrap icon图标管理</a>
		</li>
		<li>
			<a href="/admin/typePages">Type pages generate</a>
		</li>
		<li>
			<a href="<%=UrlRoute.ADMIN_TBKITEMS_MANAGEMENT_URL.getUrl() %>">Tbk items change to Item</a>
		</li>
		
		<li>
			<a href="<%=UrlRoute.ADMIN_ITAOBAO_MANAGEMENT_URL.getUrl() %>">ITaobao items change to Item</a>
		</li>
		
	</ol>
	
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
