<%@page import="ajax.model.entity.Fragment.Type"%>
<%@page import="ajax.model.UrlRoute"%>
<%@ page language="java" import="ajax.model.entity.*, java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	List<ItemsRoll> list = ItemsRoll.getList(10);
	
	List<Fragment> fragments = Fragment.getFragments(Type.HOME_PAGE_THREE_ADS);
	String url = UrlRoute.OSS_PUBLIC.getUrl();
	
	
	request.setAttribute("fragments", fragments);
	request.setAttribute("list", list);
	
 %>


<div style="position:relative;" class="clearfix">
	
	<div class="row">
		<div class="col-sm-12">
			<div id="home-tbkitems-roll-img" class="home-tbkitems-roll-img">
				<c:forEach items="${itemsRoll }" var="item" begin="0" end="4">
				  <div class="div col-sm-4 hidden">
				  	<a href="${item.getDetailUrl() }">
				  		<img class="aimg img-responsive" alt="${item.getTitle() }" src="${item.getPict_url() }">
				  		<small>${item.getTitle() }</small>
				  	</a>
				  </div>
				</c:forEach>
			</div>		
		</div>
	</div>

</div>

<div>


<style>
	.home-tbkitems-roll-img{
		max-height:315px;
		overflow:hidden;
	}
</style>


<script>
	$(function () {
		var container = $("#home-tbkitems-roll-img"),
			container2 = $("#aj-home-showcase");
		container.hide();
		container.on("init", function () {
			container.fadeIn();
			container.find(".div.hidden").removeClass("hidden");
		})
		container.slick({
			dots: true,
			centerMode: true,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,

		  	autoplay: true,
		  	autoplaySpeed: 2000
		});
	})
</script>
</div>

