<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
request.setAttribute("arr", new int[]{1,2,3,4,5});
%>

<style>
	.aj-hotitems{
		position:relative;
		overflow:hidden;
		height:144px;
		overflow:hidden;
	}
	.aj-hotitems .inside-wrap{
		padding:10px 5px;
		border-color: #c7c7c7;
	    border-style: solid;
	    border-width: 1px 1px 3px 1px;
	    border-radius: 4px;
	    background-color: #fff;
	}
	.aj-hotitems .inside-wrap .h40{
		font-size:16px;
		color:#333;
		overflow: hidden;
		height:40px;
		line-height:20px;
	}
	.aj-hotitems .inside-wrap .h80{
		height:80px;
		font-size:12px;
		color:#666;
		overflow: hidden;
		line-height:20px;
	}
	.aj-hotitems .inside-wrap .h80-img{
		height:80px;
		overflow: hidden;
		text-align:center;
		vertical-align:middle;
		display:table-cell;
	}
	.aj-hotitems .inside-wrap .h80-img img{
		max-width:100%;
		display: inline-block;
		vertical-align:middle;
	}
	.aj-hotitems .slick-arrow{
		font-size: 0;
	    line-height: 0;
	
	    position: absolute;
	    top: 50%;
	    display: block;
	
	    width: 30px;
	    height: 30px;
	    margin-top: -15px;
	    padding: 0;
	    cursor: pointer;
	    color: transparent;
	    border: none;
	    outline: none;
	    background: rgba(0,0,0,.4);
	    border-radius:50%;
	    text-align:center;
	    line-height:30px;
	    z-index:99;
	}
	.aj-hotitems .slick-arrow.slick-prev:after,.aj-hotitems .slick-arrow.slick-next:after{
		font-size:20px;
		color:white;
	}
	.aj-hotitems .slick-arrow.slick-prev{
		left:0;
	}
	.aj-hotitems .slick-arrow.slick-prev:after{
		content:"<";
	}
	.aj-hotitems .slick-arrow.slick-next{
		right : 0;
	}
	.aj-hotitems .slick-arrow.slick-next:after{
		content:">";
	}
	
	
	
</style>

<div class="row aj-hotitems" id="aj-hotitems">
	<div class="col-sm-3 col-xs-4">
		<div class="inside-wrap item">
			<div class="h80-img">
				<img src="http://nigeerhuo-public.img-cn-shanghai.aliyuncs.com/images/web/zhihu/14613132256911952.jpg@!w190" />
			</div>
			<p class="h40">This is content</p>
		</div>
	</div>
	<c:forEach items="${arr }" var="item">
		<div class="col-sm-3 col-xs-4 item">
			<div class="inside-wrap">
				<p class="h40">This is title</p>
				<p class="h80">This is content</p>
			</div>
		</div>
	</c:forEach>
</div>

<script>
	$(function () {
		var container = $("#aj-hotitems");
		var wid = 0;
		container.find(".item").each(function () {
			var w = parseInt($(this).css("width"));
			wid = wid > w ? wid : w;
		})
		
		container.slick({
			infinite: true,
			slidesToShow: Math.round(container.width() / wid),
			slidesToScroll:1
		});
	})
</script>