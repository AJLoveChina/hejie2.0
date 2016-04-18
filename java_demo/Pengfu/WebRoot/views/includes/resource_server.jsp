<%
String path = request.getContextPath();
 %>

<script>
	// 全局变量, 如果要暴露接口请包涵在该作用域内
	var aj = {};
	aj.Try = function (fn) {
		try {
			fn();
		}catch(ex) {
			console.log(ex);
		}
	}
</script>

<script src="http://apps.bdimg.com/libs/jquery/1.10.0/jquery.min.js"></script>
<script src="http://apps.bdimg.com/libs/jquery-lazyload/1.9.5/jquery.lazyload.js"></script>
<script src="http://apps.bdimg.com/libs/angular.js/1.2.9/angular.min.js"></script>
<script src="http://apps.bdimg.com/libs/angular.js/1.2.9/angular-sanitize.min.js"></script>
<link rel="stylesheet" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.css"/>
<link rel="stylesheet" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap-theme.min.css"/>
<link rel="stylesheet" href="http://apps.bdimg.com/libs/animate.css/3.0.0/animate.min.css"/>
<link rel="stylesheet" href="<%=path %>/web/css/index.css"/>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=path %>/web/js/base.js"></script>
<script type="text/javascript" src="<%=path %>/web/js/main.js"></script>