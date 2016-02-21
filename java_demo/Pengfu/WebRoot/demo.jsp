<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Joke joke = (Joke)request.getAttribute("joke");

System.out.print(joke.getContent());
%>


<jsp:include page="views/includes/header.jsp"></jsp:include>


<nav id="aj-header" class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <div style="display: inline-block;height: 50px;overflow: hidden">
                <img src="web/images/logo.PNG" height="70px " alt=""/>
            </div>
        </div>
    </div>
</nav>


<div style="height: 70px;"></div>


<jsp:include page="views/joke/one.jsp"></jsp:include>


<div class="btn-group" role="group">
    <button class="btn btn-danger">
        <span class="glyphicon glyphicon-chevron-left"></span>
        Previous</button>
</div>

<div class="btn-group" role="group">
    <button class="btn btn-info">
        <span class="glyphicon glyphicon-random"></span>
        Random</button>
</div>

<div class="btn-group" role="group">
    <button class="btn btn-warning">
        <span class="glyphicon glyphicon-chevron-right"></span>
        Next
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


