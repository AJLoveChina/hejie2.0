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
			<div  id="home-tbkitems-roll-img" class="home-tbkitems-roll-img">
				<c:forEach items="${itemsRoll }" var="item" begin="0" end="4">
				  <div class="div col-sm-4">
				  	<a href="${item.getDetailUrl() }">
				  		<img class="aimg img-responsive" alt="${item.getTitle() }" src="${item.getPict_url() }">
				  		<small>${item.getTitle() }</small>
				  	</a>
				  </div>
				</c:forEach>
			</div>		
		</div>
		<%-- <div class="col-sm-6">
			<div id="aj-home-showcase" class="aj-hide-when-phone">
				<c:forEach begin="10" end="12" items="${itemsRoll }" var="one">
					<span class="atag">
						<img src="${one.getPict_url()  }" />
					</span>
				</c:forEach>
			</div>	
		</div>	 --%>
	</div>

</div>

<div>


<style>
	.home-tbkitems-roll-img{
		overflow:hidden;
	}
</style>


<script>
	$(function () {
		var container = $("#home-tbkitems-roll-img"),
			container2 = $("#aj-home-showcase");
		container.slick({
			dots: true,
			centerMode: true,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,

		  	autoplay: true,
		  	autoplaySpeed: 2000
		});
		
		
		
		/* slidesjs({
			start : 1,
			pagination : {
				active : true
			},
			navigation : {
				active : false
			},
			play : {
				auto : true,
				interval : 3000
			},
			callback : {
				loaded : function () {
					container.fadeIn();
					container.css("height" , container.width() / 2);
					container.find("img.aimg").each(function () {
						$(this).css({
							width : container.css('width'),
							height : container.css('height')
						});
					});
					container.find('.atitle').each(function () {
						$(this).css({
							top : container.height() - $(this).height() + "px",
							bottom : 'auto'
						});
					});
				}
			}
	    }); */
	})
</script>
</div>

