<%@page import="ajax.model.weixin.Weixin"%>
<%@page import="ajax.model.weixin.WeixinJsConfig"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><%
	String path = (String)request.getAttribute("javax.servlet.forward.request_uri");
	String url = request.getScheme()+"://"+request.getServerName()+path;
	WeixinJsConfig weixinJsConfig = Weixin.generateWeixinJSConfig(url);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: "<%=weixinJsConfig.getAppId()%>", // 必填，公众号的唯一标识
	    timestamp: "<%=weixinJsConfig.getTimestamp()%>", // 必填，生成签名的时间戳
	    nonceStr: "<%=weixinJsConfig.getNonceStr()%>", // 必填，生成签名的随机串
	    signature: "<%=weixinJsConfig.getSignature()%>",// 必填，签名，见附录1
	    jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	
	wx.ready(function(){
	   
		wx.getLocation({
		    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		    success: function (res) {
		        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
		        
		        console.log("latitude:" + latitude);
		        console.log("longitude:" + longitude);
		        console.log("speed:" + speed);
		        console.log("accuracy:" + accuracy);
		    }
		});
		
	});
	
	wx.error(function(res){
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	});
	
	wx.onMenuShareTimeline({
	    title: '', // 分享标题
	    link: '', // 分享链接
	    imgUrl: '', // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	
</script>
<title>Title</title>
</head>
<body>
	
	
	
</body>
</html>