<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	QueryParams qp = (QueryParams) request.getAttribute("queryParams");
	int pageIndex = qp.getPage();
	
	List<QueryParams> pageChoices = qp.getSurroundingQueryParams();
	
	request.setAttribute("pageChoices", pageChoices);
	request.setAttribute("pageUrl", UrlRoute.PAGE.getUrl());
 %>
 


<div class="aj-page-choices-v2">
	<ul class="aul clearfix">
		<c:forEach items="${pageChoices }" var="choice">
			<c:choose>
				<c:when test="${choice.getPage() != queryParams.getPage() }">
					<li class="ali">
						<a class="atag" href="${choice.toStringWithoutPageParam(pageUrl) }">${choice.getPage() }</a>
					</li>	
				</c:when>
				<c:otherwise>
					<li class="ali">
						<a class="atag cur" href="${choice.toStringWithoutPageParam(pageUrl) }">${choice.getPage() }</a>
					</li>	
				</c:otherwise>
				
			</c:choose>
		</c:forEach>
		<li class="ali">
			<span>...</span>
		</li>	
		
	</ul>
</div>

<style>
	.aj-page-choices-v2{
		text-align: center;
	}
	.aj-page-choices-v2 a{
		text-decoration: none;
	}
	.aj-page-choices-v2 .aul{
	    text-align: center;
	    margin: 20px 0;
	    overflow: hidden;	
	}
	.aj-page-choices-v2 .aul .ali{
	    display: inline-block;
	}

	.aj-page-choices-v2 .aul .ali .atag{
	    display: inline-block;
	    color: #5188a6;	
	    text-align: center;
	    min-height: 24px;
	    min-width: 24px;
	    line-height: 24px;
	}
	.aj-page-choices-v2 .aul .ali .atag.cur{
	    background-color: #f04848;
	    -webkit-border-radius: 2px;
	    -moz-border-radius: 2px;
	    -ms-border-radius: 2px;
	    -o-border-radius: 2px;
	    border-radius: 2px;
	    color: #fff;
	    font-weight: bold	
	}	
	.aj-page-choices-v2 .aul .ali .atag:hover{
	    background-color: #f04848;
	    -webkit-border-radius: 2px;
	    -moz-border-radius: 2px;
	    -ms-border-radius: 2px;
	    -o-border-radius: 2px;
	    border-radius: 2px;
	    color: #fff;
	    font-weight: bold
	}
</style>