<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>qqsign.html</title>
	
    <meta name="keywords" content="keyword1,keyword2,keyword3">
    <meta name="description" content="this is my page">
    <meta name="content-type" content="text/html; charset=UTF-8">
    
    <!--<link rel="stylesheet" type="text/css" href="./styles.css">-->

  </head>
  
  <body>
   	<script>
   		/* try {
    		window.opener.location.reload();
    		window.close();
    	}catch(ex) {
    		// location.href = "http://www.nigeerhuo.com";
    		
    		var href;
    		var arr = location.search.replace(/^\?/, "").split("&");
    		var arr2;
    		for (var i = 0; i < arr.length; i ++) {
    			arr2 = arr[i].split("=");
    			if (arr2[0].toLowerCase() == "url") {
    				href = arr2[1];
    				break;
    			}
    		}
    		
    		if (!href) {
    			href = location.href;
    		}
    		
    		location.href = href;
    	} */
    	
    	try {
    		window.opener.location.reload();
    		window.close();
    	}catch(ex) {
    		location.href = "http://" + location.hostname;
    	}
   	</script>
  </body>
</html>
