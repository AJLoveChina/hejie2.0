<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>美图WEB开放平台</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="http://open.web.meitu.com/sources/xiuxiu.js" type="text/javascript"></script>
<script type="text/javascript">
	window.onload=function(){
		xiuxiu.embedSWF("altContent",3,"100%","100%");
	       /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
	    
		xiuxiu.setUploadURL("/admin/meituUpload");//修改为您自己的上传接收图片程序
		xiuxiu.onBeforeUpload = function(data, id){
			xiuxiu.setUploadArgs({filetype: data.type, type: "image", filename: data.name });
		}
	
		xiuxiu.onInit = function ()
		{
			xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
		}	
		xiuxiu.onUploadResponse = function (data)
		{
			alert("上传响应" + data);  可以开启调试
		}
	}
</script>
<style type="text/css">
	html, body { height:100%; overflow:hidden; }
	body { margin:0; }
</style>
</head>
<body>
<div id="altContent">
	<h1>美图秀秀</h1>
</div>
</body>
</html>