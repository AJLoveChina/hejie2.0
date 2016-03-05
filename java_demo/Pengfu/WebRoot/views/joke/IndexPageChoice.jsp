<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	Integer pageIndex = (Integer)request.getAttribute("page");
	String prevHref = Joke.getHrefByRequest(request, PageType.PREV);
	String nextHref = Joke.getHrefByRequest(request, PageType.NEXT);
 %>
 
 
<%-- <div class="btn-group" role="group" aria-label="">
	<a href="?page=<%=(pageIndex - 1)%>">
		<button type="button" class="btn btn-default">上一页</button>
	</a>
	<a href="javascript:;">
		<button type="button" class="btn btn-default">当前 : <%=pageIndex %>页</button>
	</a>
   <a href="?page=<%=(pageIndex + 1)%>">
   	<button type="button" class="btn btn-default">下一页</button>
   </a>
</div> --%>

<div class="btn-group" role="group" aria-label="">
	<a href="<%=prevHref %>">
		<button type="button" class="btn btn-default">上一页</button>
	</a>
	<a href="javascript:;">
		<button type="button" class="btn btn-default">当前 :<%=pageIndex %>页</button>
	</a>
   <a href="<%=nextHref %>">
   	<button type="button" class="btn btn-default">下一页</button>
   </a>
</div>