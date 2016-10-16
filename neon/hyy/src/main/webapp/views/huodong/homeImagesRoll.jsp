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
	<div id="aj-home-images-roll">
		<c:forEach items="${list }" var="item">
		  <div class="div">
		  	<a href="${item.getOneItemPageUrl() }">
		  		<img class="aimg aj-lazy" alt="${item.getTitle() }" data-lazy ="${item.getSrc() }" src="<%=url %>images/web/pic/dot.jpg">
		  		<h4 class="atitle">${item.getTitle() }</h4>
		  	</a>
		  </div>
		</c:forEach>
	</div>
	<div id="aj-home-showcase" class="aj-hide-when-phone">
		<c:forEach begin="0" end="2" items="${fragments }" var="one">
			<span>
				${one.getVal() }
			</span>
		</c:forEach>
	</div>
</div>

<div>
<style>
	#aj-home-images-roll{
		width:534px;height:267px;
		margin-bottom:10px;
		position:relative;
		display: none;
		float:left;
		max-width: 100%;
	}
	#aj-home-images-roll .aimg{
		width:100%;
		height: 100%;
	}
	#aj-home-images-roll img{
		width:100%;
	}
	
	#aj-home-images-roll .div{
		position:relative;
		width:534px;height:267px;
	}
	#aj-home-images-roll .div .atitle{
		position:absolute;
		left:0;bottom:0;
		display:block;
		width:100%;
		height:40px;
		line-height: 40px;
		color:white;
		background-color: rgba(0, 0, 0, 0.5);
		margin:0;
		padding-left: 10px;
		white-space:nowrap;
		overflow: hidden;
		font-size:13px;
	}
	
</style>


<style>
	#aj-home-showcase{
		width:170px;
		height:267px;
		float:right;
		
	}
	#aj-home-showcase .atag{
		display:block;
		width:100%;
		height: 85px;
		margin-bottom:6px;
	}
	#aj-home-showcase .atag img{
		width:100%;
		height: 85px;
	}
</style>


<script>
	$(function () {
		var container = $("#aj-home-images-roll");
		container.slidesjs({
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
	    });
	})
</script>
</div>

