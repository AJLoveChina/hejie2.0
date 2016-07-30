<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>

<%@ include file="/views/goods/style.jsp" %>
<script type="text/javascript">
    (function(win,doc){
        var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0];
        if (!win.alimamatk_show) {
            s.charset = "gbk";
            s.async = true;
            s.src = "http://a.alimama.cn/tkapi.js";
            h.insertBefore(s, h.firstChild);
        };
        var o = {
            pid: "mm_54818290_15130025_58742815",/*推广单元ID，用于区分不同的推广渠道*/
            appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/
            unid: "",/*自定义统计字段*/
            type: "click" /* click 组件的入口标志 （使用click组件必设）*/
        };
        win.alimamatk_onload = win.alimamatk_onload || [];
        win.alimamatk_onload.push(o);
    })(window,document);
</script>




<div class="aj-body-left">
	<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
	<ul class="leftWrap discovery_list clearfix">
		<c:forEach var="item" items="${model }">
			<c:set scope="request" var="item" value="${item }" />
			<c:import url="/views/goods/tbkItemOne.jsp" ></c:import>
		</c:forEach>
	</ul>
	<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
	
	<a biz-itemid="520835064878" isconvert=1 href="http://item.taobao.com/item.htm?id=520835064878">http://item.taobao.com/item.htm?id=520835064878</a>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>