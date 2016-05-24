<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>

	<script src="http://apps.bdimg.com/libs/jquery/1.10.0/jquery.min.js"></script>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
	<title>Map</title>  
	<style type="text/css">  
	html{height:100%}  
	body{height:100%;margin:0px;padding:0px}  
	#container{height:100%}  
	</style>  
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=hemnsARytfYF7dsYlLCnaZKUeCryW93y">
	
	//v2.0版本的引用方式：src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"
	//v1.4版本及以前版本的引用方式：src="http://api.map.baidu.com/api?v=1.4&key=您的密钥&callback=initialize"
	</script>
	
	<script type="text/javascript" src="http://api.map.baidu.com/library/CurveLine/1.5/src/CurveLine.min.js"></script>
</head>

<body>



<script>


</script>

<div id="container"></div> 
<script type="text/javascript"> 
	var map = new BMap.Map("container");          // 创建地图实例  
	var point = new BMap.Point(117.284637,31.8791);  // 创建点坐标  
	map.centerAndZoom(point, 17);                 // 初始化地图，设置中心点坐标和地图级别  
	
	

	$.ajax({
		url : "index?action=map",
		type : "GET",
		dataType : "json",
		success : function (json) {
			console.log(json);
			map.enableScrollWheelZoom();
			
			for (var i = 0; i < json.data.lines.length; i++) {
				drawLine(json.data.lines[i]);
				addLabel(json.data.lines[i]);
				
				for (var j = 0; j < json.data.lines[i].points.length; j++) {
					addPointInfo(json.data.lines[i].points[j]);
				}
			}
			
			
			function drawLine(line) {
				var points = [];
				for (var i = 0; i < line.points.length; i++) {
					points.push(new BMap.Point(line.points[i].longitude, line.points[i].latitude));
					var curve = new BMap.Polyline(points, {strokeColor : line.color, strokeWeight:3, strokeOpacity:0.5}); //创建弧线对象
					map.addOverlay(curve); //添加到地图中
					curve.enableEditing(); //开启编辑功能
				}
			}
			
			function addLabel(line) {
				var points = line.points;
				if (points.length < 2) {
					return;
				}
				var firstPoint = points[0],
					lastPoint = points[points.length - 1];
				var point = new BMap.Point((firstPoint.longitude + lastPoint.longitude) / 2, (firstPoint.latitude + lastPoint.latitude) / 2);
				//var point = new BMap.Point(firstPoint.longitude, firstPoint.latitude);
				var info = line.info;
				var opts = {
				  position : point,    // 指定文本标注所在的地理位置
				  offset   : new BMap.Size(0,0) //30, -30   //设置文本偏移量
				}
				var label = new BMap.Label(info, opts);  // 创建文本标注对象
					label.setStyle({
						 color : "red",
						 fontSize : "12px",
						 height : "20px",
						 lineHeight : "20px",
						 fontFamily:"微软雅黑"
					 });
				map.addOverlay(label);   
			}
			
			function addPointInfo(point) {
				var name = point.name;
				var point = new BMap.Point(point.longitude,point.latitude);
				var marker = new BMap.Marker(point);  // 创建标注
				map.addOverlay(marker);              // 将标注添加到地图中
				map.centerAndZoom(point, 15);
				
				if ("r".indexOf(name.toLowerCase())) {
					marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				}
				var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 60,     // 信息窗口高度
				  title : "点信息" , // 信息窗口标题
				  enableMessage:true,//设置允许信息窗发送短息
				  message : name
				}
				var infoWindow = new BMap.InfoWindow(name, opts);  // 创建信息窗口对象 
				marker.addEventListener("click", function(){          
					map.openInfoWindow(infoWindow,point); //开启信息窗口
				});
			}
			
		},
		error : function (err) {
			console.log(err);
		}
	});	
	
	other();
	function other() {
		var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
		var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
		var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
		map.addControl(top_left_control);        
		map.addControl(top_left_navigation);     
		map.addControl(top_right_navigation);    
	}
</script>  


</body>
</html>
