<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%
	PageChoice pageChoice = (PageChoice) request.getAttribute("pageChoice");
 %>

<div class="aj-page-choices-v2">
	<ul class="aul clearfix ajs-page-choices ajs-page-choices-v4-ul" 
		data-curPage="<%=pageChoice.getCurPage() %>" 
		data-maxPage="<%=pageChoice.getMaxPage() %>"
		data-urlTemplate="<%=pageChoice.getUrlTemplate() %>"
		data-li-cls="ali"
		data-a-cur-cls="cur"
		data-a-cls="atag" >
		
				
		<li class="ali">
			<span>...</span>
		</li>
		
	</ul>
</div>