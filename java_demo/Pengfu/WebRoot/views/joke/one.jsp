<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	Joke joke = (Joke)request.getAttribute("joke");
 %>
<div class="panel panel-default">
    <div class="panel-heading">
    	<a style="color:#333;" href="<%=UrlRoute.ONEJOKE + "?id=" + joke.getJokeId()%>">
    		<%=joke.getTitle() %>	
    	</a>
    </div>
    <div class="panel-body">
        <%=joke.getContent()  %>
    </div>
</div>

