<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Joke joke = (Joke)request.getAttribute("joke");

%>


<jsp:include page="views/includes/header.jsp"></jsp:include>


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


