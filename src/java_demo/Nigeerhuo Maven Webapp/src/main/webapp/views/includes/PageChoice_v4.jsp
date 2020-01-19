<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	PageChoice pageChoice = (PageChoice) request.getAttribute("pageChoice");
 %>
 

<script>
	$(function () {
			$(".ajs-page-choices").each(function () {
				var cur = parseInt($(this).attr("data-curPage")),
					liCls = $(this).attr("data-li-cls"),
					urlTemplate = $(this).attr("data-urlTemplate"),
					aCurCls = $(this).attr("data-a-cur-cls"),
					aCls = $(this).attr("data-a-cls")
					uniCls = "aj-parsed";
					
					if ($(this).hasClass(uniCls)) {
						return false;
					}
					$(this).addClass(uniCls);
				var arr = [],
					urls = [],
					curCopy = cur,
					i;
				i = 2;
				while(i-- > 0 && curCopy > 1) {
					curCopy --;	
				}	
				for (i = curCopy; i < curCopy + 6; i++) {
					arr.push(i);
				}
				
				for (i = 0; i < arr.length; i++) {
					urls.push({
						page : arr[i],
						url : changeTemplateToUrl(arr[i])
					});
				}
				
				var span = $(document.createElement("span")),
					domLi,
					domA;
				for (i = 0; i < urls.length; i++) {
					domA = $(document.createElement("a"));
					domA.attr("class", "atag");
					if (cur === urls[i].page) {
						domA.addClass("cur");
					}
					domA.attr("href", urls[i].url);
					domA.text(urls[i].page);
					
					domLi = $(document.createElement("li"));
					domLi.addClass("ali");
					domLi.append(domA);
					span.append(domLi);
				}
				$(this).prepend(span);	
				
				function changeTemplateToUrl(page) {
					return urlTemplate.replace(/\{page}/, page) + location.search;
				}
			});
			
							
		try {
			
		} catch(ex) {}
	});
</script>
<div class="aj-page-choices-v2">
	<ul class="aul clearfix ajs-page-choices" 
		data-curPage="<%=pageChoice.getCurPage() %>" 
		data-urlTemplate="<%=pageChoice.getUrlTemplate() %>" 
		data-li-cls="ali"
		data-a-cur-cls="cur"
		data-a-cls="atag" >
		
				
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