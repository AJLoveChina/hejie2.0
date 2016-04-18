<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<div class="aj-joke-list-one panel panel-default" data-id="${item.getId() }">
    <div class="panel-heading">
    	<a style="color:#333;" href='<c:out value="${item.getOneJokeUrlById() }"></c:out>'>
    		<c:out value="${item.getTitle() }"></c:out>
    	</a>
    </div>
    <div class="panel-body" style="word-wrap:break-word;">
    	<c:if test="${item.hasBackgroundInformation() }">
    		<div class="backinfo">
    			${item.getBackgroundInformation() }
    		</div>
    	</c:if>
    	
    	<div class="stamps">
    		标签 :
	     	<c:forEach var="stamp" items="${item.get$stampsArr() }">
	    		<span class="stamp  random label label-default">${stamp }</span>
	    	</c:forEach>   	
    	</div>
    
    	<c:if test="${item.hasAuthor()}">
    		<div style="font-size:12px;padding:0 0 10px;">
	    		作者 : 
	    		<a href='<c:out value="${item.getUserPersonalPageUrl() }"></c:out>'>
	    			<c:out value="${item.getUsername() }"></c:out>
	    		</a>
    		</div>
    	</c:if>
        <c:out value="${item.getContent() }" escapeXml="false"></c:out>
    </div>
</div>

