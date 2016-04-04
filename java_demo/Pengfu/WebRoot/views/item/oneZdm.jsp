<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="aj-list-one" data-id="${item.getId() }">
    <div class="a-l-header">
        <a href="${item.getOneJokeUrlById() }" class="a-l-type">${item.getITypeRealName() }</a>
        <a href="${item.getOneJokeUrlById() }" class="a-l-title">${item.getTitle() }</a>
    </div>
    <div class="a-l-body">
    
    	
    	<c:choose>
		  <c:when test="${item.hasPreviewImage() }">
		    <div class="a-l-image">
	            <img src="${item.getPreviewImage() }" alt=""/>
	        </div>
	         <div class="a-l-content clearfix">
		  </c:when>
		  <c:otherwise>
		    <div class="a-l-image" style="display:none;">
	            <img src="${item.getPreviewImage() }" alt=""/>
	        </div>
	         <div class="a-l-content clearfix" style="padding-left:0;">
		  </c:otherwise>
		</c:choose>
        
            <div class="a-l-c-header">
            
            <c:if test="${item.hasAuthor()}">
	    		<span class="a-person">作者：
                    <a href="${item.getUserPersonalPageUrl() }">${item.getUsername() }</a>
                </span>
	    	</c:if>
                
                <span class="a-stamps">标签 : ${item.getStamps() }</span>
            </div>
            <div class="a-l-c-body">
                <span>
                	${item.getSummary() }
                </span>
                <span>
                    ...<a href="${item.getOneJokeUrlById() }">阅读全文</a>
                </span>
            </div>
            <div class="a-l-c-footer">
                <a href="${item.getOneJokeUrlById() }" class="alink">阅读全文</a>
            </div>
        </div>
    </div>
</div>

