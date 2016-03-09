<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<div class="panel panel-default">
    <div class="panel-heading">
    	<a style="color:#333;" href='<c:out value="${joke.getOneJokeUrlById() }"></c:out>'>
    		<c:out value="${joke.getTitle() }"></c:out>
    	</a>
    </div>
    <div class="panel-body" style="word-wrap:break-word;">
    	<c:if test="${joke.hasAuthor()}">
    		<div style="font-size:12px;padding:0 0 10px;">
	    		作者 : 
	    		<a href='<c:out value="${joke.getUserPersonalPageUrl() }"></c:out>'>
	    			<c:out value="${joke.getUsername() }"></c:out>
	    		</a>
    		</div>
    	</c:if>
        <c:out value="${joke.getContent() }" escapeXml="false"></c:out>
    </div>
</div>

