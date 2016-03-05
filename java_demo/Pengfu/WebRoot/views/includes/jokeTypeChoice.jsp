<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<style>
	#aj-top-type-choice{
		width:100%;
		background-color: white;
		padding:10px 0;
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
	
	})
</script>
<div id="aj-top-type-choice" class="clearfix">
	<div class="one">
		<a class="atag" href="<%=Joke.getHrefByJokeType(JokeType.ALL) %>">
			<span class="icon glyphicon glyphicon-th"></span>
			<span class="text">全部笑话</span>
		</a>
	</div>
	<div class="one">
		<a class="atag" href="<%=Joke.getHrefByJokeType(JokeType.ONLY_WORD) %>">
			<span class="icon glyphicon glyphicon-text-width"></span>
			<span class="text">文字笑话</span>
		</a>
	</div>
	<div class="one">
		<a class="atag" href="<%=Joke.getHrefByJokeType(JokeType.STATIC_IMAGE) %>">
			<span class="icon glyphicon glyphicon-picture"></span>
			<span class="text">图片笑话</span>
		</a>
	</div>
	<div class="one">
		<a class="atag" href="<%=Joke.getHrefByJokeType(JokeType.GIF) %>">
			<span class="icon glyphicon glyphicon-gift"></span>
			<span class="text">动态图笑话</span>
		</a>
	</div>
</div>