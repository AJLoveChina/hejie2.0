<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${hotItems.size() > 0 }">
<style>
	.aj-hotitems{
		position:relative;
		overflow:hidden;
		height:144px;
		overflow:hidden;
	}
	.aj-hotitems .index{
		position:absolute;
		top : 5px;
		right : 5px;
		color:#ccc;
		font-size:12px;
	}
	.aj-hotitems .inside-wrap{
		position:relative;
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
		display:block;
		font-size:0;
	}
	.aj-hotitems .inside-wrap .h80-img:before{
		content:"";
		width:0;
		height:100%;
		display: inline-block;
		vertical-align: middle;
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
	
		<c:forEach items="${hotItems }" var="item" varStatus="status">
			<c:choose>
				<c:when test="${item.hasPreviewImage() }">
				
					<div class="col-sm-3 col-xs-4 item" data-item-id="${item.getId() }">
						<a href="${item.getOneItemPageUrlV2() }">
							<div class="inside-wrap">
								<div class="h80-img">
									<img class="aj-lazy" data-pic-style="w190" src="http://images.nigeerhuo.com/images/web/pic/dot.jpg" data-lazy="${item.getPreviewImage() }" alt="${item.getTitle() }"/>
								</div>
								<p class="h40"  title="${item.getTitle() }">${item.getTitle() }</p>
								<p class="index">${status.index + 1 }</p>
							</div>
						</a>
					</div>
					
				</c:when>
				<c:otherwise>
					<div class="col-sm-3 col-xs-4 item" data-item-id="${item.getId() }">
						<a href="${item.getOneItemPageUrlV2() }">
							<div class="inside-wrap">
								<p class="h40" title="${item.getTitle() }">${item.getTitle() }</p>
								<p class="h80">${item.getSummary() }</p>
								<p class="index">${status.index + 1 }</p>
							</div>
						</a>
					</div>
				</c:otherwise>
			</c:choose>
			
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
</c:if>