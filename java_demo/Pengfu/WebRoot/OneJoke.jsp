<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Joke joke = (Joke)request.getAttribute("joke");
int previous = joke.getJokeId() - 1;
int next = joke.getJokeId() + 1;

%>

<style>
	.font-white{
		color:white;
	}

</style>

<jsp:include page="views/includes/header.jsp"></jsp:include>


<jsp:include page="views/joke/one.jsp"></jsp:include>


<div class="btn-group" role="group">
    <button class="btn btn-danger">
    	<a class="font-white" href="OneJoke?id=<%=previous %>">
	    	<span class="glyphicon glyphicon-chevron-left"></span>
	        Previous</button>
    	</a>
</div>

<div class="btn-group" role="group">
    <button id="aj-random-access-btn" class="btn btn-info" min="<%=Joke.minJokeId %>" max="<%=Joke.maxJokeId %>">
        <span class="glyphicon glyphicon-random"></span>
        Random</button>
</div>

<script>
	$(function () {
		var btn = $("#aj-random-access-btn");
		btn.on("click", function () {
			var min = parseInt($(this).attr("min"));
			var max = parseInt($(this).attr("max"));
			
			var random = Math.floor(min + max * Math.random());
			location.href = "?id=" + random;
		})
	})
</script>

<div class="btn-group" role="group">
    <button class="btn btn-warning">
    	<a class="font-white" href="OneJoke?id=<%=next %>">
	    	<span class="glyphicon glyphicon-chevron-right"></span>
	        Next
    	</a>
    </button>
</div>



<script>
    require.config({
        baseUrl: "./web/js/modules",
        paths: {
            "some": "some/v1.0"
        },
        waitSeconds: 15
    });
</script>


<jsp:include page="views/includes/footer.jsp"></jsp:include>


