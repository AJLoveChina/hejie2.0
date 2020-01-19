<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/views/includes/headerV2.jsp"></jsp:include>
<%@ include file="/views/tbk/style.jsp" %>

<div style="height:20px;"></div>
<div class="container-fluid">
	
	<c:if test="${isfind }">
		<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
	</c:if>

	<div class="row">
		<div class="col-sm-12 col-xs-12">
			<c:choose>
				<c:when test="${isfind == true }">
					<c:forEach items="${list }" var="item">
						<!-- goods loop -->
				  		<div class="tbkitem-one col-sm-3">
							<div class="border-wrap container-fluid">
								<div class="img-wrap">
									<a href="${item.getDetailUrl() }">
										<img src="${item.getPict_url() }" class="img-responsive"/>
									</a>
								</div>
								<div class="title">
									<a href="${item.getDetailUrl() }">
										${item.getTitle() }
									</a>
								</div>
								<div class="row shop-line">
									<span class="col-sm-8 col-xs-8 max-height-20 overflow-hidden">${item.getNick() }</span>
									<span class="col-sm-4 col-xs-4 text-right max-height-20 overflow-hidden time_need_to_be_rendered">${item.getDateEnteredOfSave() }</span>
								</div>
								<div class="row">
									<div class="old-price col-sm-12">原价 : ${item.getReserve_price() }</div>
									<div class="new-price col-sm-12">
										折扣后 : ¥${item.getZk_final_price() }
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 btn-group btn-group-justified btn-group-xs btn-options  center-block">
										<a target="_blank" href="${item.getClick_url() }" class="btn btn-danger">直达链接</a>
										<a href="${item.getDetailUrl() }" class="btn btn-warning">点击详情</a>
									</div>
								</div>
							</div>
						</div>
						<!-- goods loop -->
					</c:forEach>				
				</c:when>
				
				<c:otherwise>
					<p style="padding:40px 0;text-align:center;font-size:14px;">抱歉, 二货君找不到相应的商品...</p>
				</c:otherwise>
			</c:choose>
			
		</div>
	</div>
	
	<c:if test="${isfind }">
		<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
	</c:if>
</div>
<div style="height:10px;"></div>
<%@ include file="/views/includes/footer.jsp" %>