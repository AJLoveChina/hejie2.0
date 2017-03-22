<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
	.aj-right-types-choices{
		margin-top:10px;	
	}
	.aj-right-types-choices .aheader{
		height:30px;
		border-bottom: 1px solid #ccc;
	}
	.aj-right-types-choices a{
		text-decoration: none;
		color:#666;
	}
	.aj-right-types-choices ul{
		margin-bottom:0;
	}
	.aj-right-types-choices .aheader .ali{
		display: inline-block;
		height: 29px;
		border-bottom: 1px solid #ccc;
		padding: 0 10px;
		text-align: center;
		line-height: 30px;
		font-size:18px;
	}
	.aj-right-types-choices .aheader .ali.selected{
		border-bottom: 2px solid #f04848;
	}
	.aj-right-types-choices .acontent{
		margin-top:10px;
	}
	
	.aj-right-types-choices .acontent .ali{
		position:relative;
		width:33.3%;
		height: 38px;
		text-align: center;
		line-height: 38px;
		float:left;
		font-size: 12px;
		white-space: nowrap;
		transition:all 0.3s;
		cursor: pointer;
		color:#666;
		border:1px solid #ccc;/*#f0f0f0*/
		margin-left:-1px;
		margin-top:-1px;
	}
	.aj-right-types-choices .acontent .ali:hover .ainfo{
		color:#d62222;
	}
	.aj-right-types-choices .acontent .ali:hover .aicon{
		color:#d62222;
	}
	.aj-right-types-choices .acontent .ali .ali-wrap{
		position:relative;
		display: block;
		overflow: hidden;
	}
	
	.aj-right-types-choices .acontent .ali:hover{
		border-color:#d62222;
		z-index:9;
	}
	.aj-right-types-choices .acontent .ali .aicon{
		
	}
	.aj-right-types-choices .acontent .ali .ainfo{
		
	}
	.aj-right-types-choices .showMore{
		width:100%;
		text-align:center;
		height:25px;
		line-height: 25px;
		font-size: 12px;
		color:#666;
		border:1px solid #ccc;
		margin-left:-1px;
		float:left;
		margin-top:-1px;
		cursor:pointer;
		display: none;
	}
	.aj-right-types-choices .showMore:hover{
		color:#d62222;
	}
</style>

<script>

	$(function () {
		var lis = $(".aj-right-types-choices .acontent .ali");
		var i;
		var showMore = $(".aj-right-types-choices .showMore");
		for (i = 0; i < 15; i++){
			lis.eq(i).show();
		}
		
		
		
		var showMoreWidth = parseInt(lis.css("width")) * 3 - 3;
		showMore.css("width", showMoreWidth + "px");
		
		if (lis.length > 3 * 5) {
			showMore.show();
		}
		
		var onText = showMore.attr("data-on-text"),
			offText = showMore.attr("data-off-text");
		
		showMore.on("click", function () {
			if (onText === $.trim($(this).text())) {
				for (i = 3 * 5; i < lis.length; i++) {
					lis.eq(i).hide();
				}
				$(this).html(offText);
			} else {
				lis.each(function (i, item) {
					$(this).show();
				});
				$(this).html(onText);
			}
		});
		
	});
</script>

<div class="aj-right-types-choices aj-goodstypes-stamps">
	<div class="aheader">
		<ul class="aul">
			<li class="ali selected">分类导航 </li>
		</ul>
	</div>
	
	<div class="acontent">
		<ul class="clearfix">
		
			<c:forEach items="${stamps}" var="stamp">
				<li class="ali" style="display:none;" data-moreinfo="${stamp.getStampMoreInfo() }">
					<span class="ali-wrap">
						<a class="stamp-link" href="${stamp.getStampHref() }">
							<em class="aicon ${stamp.getStampIconClassName() }"></em>
							<span class="ainfo">${stamp.getStampName() }</span>
						</a>
					</span>
				</li>
			</c:forEach>
			
			<li class="showMore" data-off-text="显示全部" data-on-text="折叠显示">
				显示全部
			</li>
		</ul>
		
	</div>
</div>