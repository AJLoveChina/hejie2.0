<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


ArrayList<Joke> jokes = (ArrayList<Joke>)request.getAttribute("jokes");
Integer pageIndex = (Integer)request.getAttribute("page");
//String previousPageUrl = Joke.getIndexUrlOfPage(pageIndex - 1);
//String nextPageUrl = Joke.getIndexUrlOfPage(pageIndex + 1);
%>

<style>
	.font-white{
		color:white;
	}

</style>

<jsp:include page="views/includes/header.jsp"></jsp:include>



<jsp:include page="views/joke/IndexPageChoice.jsp"></jsp:include>
<div style="height:10px;"></div>

<%
	for (Joke joke : jokes) {
		request.setAttribute("joke", joke);
 %>

<jsp:include page="views/joke/one.jsp"></jsp:include>

<%
}
 %>
 
<div style="height:10px;"></div>
<jsp:include page="views/joke/IndexPageChoice.jsp"></jsp:include>

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
