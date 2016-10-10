<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
 
<div class="panel panel-default one-blog">
  <div class="panel-heading">${item.getTitle() }</div>
  <div class="panel-body">
  	<div class="options">
  		<span class="option">
  			主题:
			<c:forEach var="stamp" items="${item.getStampsArr() }">
	 			<span class="label label-primary">${stamp }</span>
	 		</c:forEach>
  		</span>
  		<span class="option">
  			发表时间 : <span class="time_need_to_be_rendered" datetime="${item.getDateEnteredOfSave() }"></span>
  		</span>
  	</div>
    <div style="padding:0 10px;">${item.getDesc() }</div>
    <c:if test="${item.hasContent() }">
		<a href="javascript:;" class="show-detail">
			<span class="d-info">Show Detail</span>
			<span class="icon glyphicon glyphicon-play-circle"></span>
		</a>
		<span class="content" style="display:none;">
			${item.getContent() }
		</span>
	</c:if>
  </div>
</div>