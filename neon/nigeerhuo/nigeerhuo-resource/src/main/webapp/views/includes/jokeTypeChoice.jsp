<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<style>
	#aj-top-type-choice{
		width:100%;
		max-height:140px;
		overflow:hidden;
		background-color: white;
		margin:10px 0;
	}
	#aj-top-type-choice a{
		text-decoration: none;
	}
	#aj-top-type-choice .one{
		float:left;
		width:25%;
		height:70px;
	}
	#aj-top-type-choice .one .atag{}
	#aj-top-type-choice .one .atag .icon{
		display:block;
		width:40px;
		height:40px;
		border-radius:50%;
		background-color:lightblue;
		margin:0 auto;
		text-align: center;
		font-size: 20px;
		line-height: 40px;
		color:white;
	}
	#aj-top-type-choice .one .atag .text{
		display:block;
		text-align:center;
		height:30px;
		line-height:30px;
		font-size:12px;
		color:#777;
	}
</style>
<script>
	$(function () {
		var items = $("#aj-top-type-choice .one .icon");
		var colors = [
                    '#ffb700', '#ff68b9', '#56b2ff', '#ff67b9',
                    '#a8dd99', '#f61d4b', '#31bd80', '#3ea3ff',
                    '#ff7d00', '#ffb30f', '#e4000f'
        ];
        
        var random;
        items.each(function (index, item) {
        	random = Math.floor(Math.random() * colors.length);
        	$(this).css("backgroundColor", colors[random]);
        })
        
        var container = $("#aj-top-type-choice");
        var div = $(document.createElement("div"));
        var list = $("#aj-top-type-choice .one");
       	div.addClass("aj-types-collection");
       		
       	for (var i = 9; i <= list.length; i++) {
       		
       		div.append(list[i]);
       		
       		if (i % 8 == 0) {
       			container.append(div.clone());
       			div.html("");
       		}
       	}
       	
       	container.slick({
			autoplay : false
       	});
	
	})
</script>

<div class="aj-show-when-phone aj-hide-when-pc" style="display: none;">

<div id="aj-top-type-choice" class="clearfix aj-show-when-phone aj-hide-when-pc">

	<div class="aj-types-collection">
		<%
			for (JokeType jt : JokeType.getLegalJokeTypes()) {
			%>
			
				<div class="one">
					<a class="atag" href="<%=jt.getHref() %>">
						<span class="icon <%=jt.getIconClassName() %>"></span>
						<span class="text"><%=jt.getRealName() %></span>
					</a>
				</div>		
			
			<%	
			}
		 %>	
	</div>
</div>

</div>
