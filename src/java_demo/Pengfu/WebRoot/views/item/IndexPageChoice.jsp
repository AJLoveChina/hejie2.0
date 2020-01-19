<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	QueryParams qp = (QueryParams) request.getAttribute("queryParams");
	int pageIndex = qp.getPage();
	
	String nextHref = qp.getNextPageParamsString();
	String prevHref = qp.getPrevPageParamsString();
 %>
 


<div class="btn-group" role="group" aria-label="" style="padding:5px 0;">
	<a href="?<%=prevHref %>">
		<button type="button" class="btn btn-default">上一页</button>
	</a>
	<a href="javascript:;">
		<button type="button" class="btn btn-default">当前 :<%=pageIndex %>页</button>
	</a>
   <a href="?<%=nextHref %>">
   	<button type="button" class="btn btn-default">下一页</button>
   </a>
</div>