<%@ page language="java" pageEncoding="UTF-8"%>


<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">

	<div id='div1' style='position:relative;width:500px;height:300px;box-shadow:#333 0 0 5px;'></div>

	<script type='text/javascript' src='/web/js/modules/songci.js'></script>
	<script>
		yy.initial('div1');
	</script>
		 
	<style>
		select option{
			color:#333;
		}
	</style>
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>
