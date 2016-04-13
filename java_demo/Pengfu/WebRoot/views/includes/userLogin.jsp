<%@page import="ajax.model.safe.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String state = User.getState(request);
%>

<style>
	.user-login{
		position:relative;
		width:100%;
		margin-top: 10px;
	}
	.user-login .u-l-photo{
		position:absolute;
		top:0;left:0;
		width:60px;
		height:60px;
		border-radius:50%;
		line-height: 60px;
		text-align: center;
		color:white;
		font-size: 30px;
		background-color: #ccc;
		overflow: hidden;
	}
	
	.user-login .u-l-photo img{
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    left: 0;
	    right: 0;
	}

	.user-login .u-l-right{
		padding-left: 70px;
	}
	.user-login .u-l-right .line{
		height:20px;
		line-height: 20px;
		font-size: 12px;
		margin: 0;
	}
	.user-login .u-l-footer{
		padding-top: 10px;
	}
	.user-login .u-l-footer .ajbtn{
		position:relative;
		width:50%;
		height:30px;
		float:left;
		text-decoration: none;
	}
	.user-login .u-l-footer .href{
		width:90%;
		height: 30px;
		display:block;
		margin:0 auto;
		border-radius:2px;
		background-color: #f04848;
		color:white;
		text-align: center;
		line-height: 30px;
	}
	.user-login .u-l-footer .href.blue{
		background-color: #2e76a8;
	}
	
	#qqLoginBtn a{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:30px;
		opacity:0;
		filter:alpha(opacity=0);
	}
	#wb_connect_btn2{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:30px;
		opacity:0;
		filter:alpha(opacity=0);		
	}
	
	#aj-sign-panel .other-ways{
		line-height: 20px;
		margin-top:20px;
		text-align: left;
	}
	#aj-sign-panel a{
		text-decoration: none;
	}
	#aj-sign-panel .other-ways .aj-icon{
		font-size:25px;
	}
</style>

<div class="user-login">
	<div class="u-l-photo glyphicon glyphicon-user"></div>
	<div class="u-l-right">
		<div class="u-l-sign-before">
			<p class="line">Hi 你好</p>
			<p class="line">
				<a href="javascript:;" class="aj-show-sign-panel">登陆</a>
				,发现更多精彩
			</p>
			<p class="line">二货俱乐部</p>
		</div>
		
		<div class="u-l-sign-after" style="display: none;">
			<p class="line">Hi 你好</p>
			<p class="line">
				<span class="nickname"></span>
			</p>
			<p class="line">
				二货俱乐部
				<a href="javascript:;" id="aj-qq-sign-out">注销</a>
			</p>
		</div>
		
	</div>
	<div id="aj-user-login-choices" class="u-l-footer clearfix">
		<div class="ajbtn">
			<a class="href" href="javascript:;">
				<i class="aj-icon">&#xe611;</i>
				<span>QQ登陆</span>
				<span id="qqLoginBtn"></span>
			</a>
		</div>
		<div class="ajbtn">
			<a class="href blue" href="">
				<i class="aj-icon" >&#xe60a;</i>
				<span>微博登陆</span>
				<span id="wb_connect_btn2"></span>
			</a>
		</div>
	</div>
</div>

<div class="modal" id="aj-sign-panel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">登陆选择</h4>
			</div>
			<div class="modal-body" style="text-align: center;">
				<span id="qqLoginBtn2" ></span>
				<span id="wb_connect_btn" style="margin-left:20px;"></span>
				
				<div class="other-ways">
					<span>其它登陆方式 : </span>
					<a href="javascript:;" class="aj-icon github">&#xe615;</a>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>


<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101305556" data-redirecturi="http://www.nigeerhuo.com/sign/qq" charset="utf-8" ></script>
<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=4069769321" type="text/javascript" charset="utf-8"></script>


<script type="text/javascript">
	$(function() {
		try {
			var CSRF_STATE = "<%=state %>";
			$(function(){
				$(".aj-show-sign-panel").click(function(){
				  $("#aj-sign-panel").modal("toggle");
				});
			});	
			
				
		 	var before = $(".user-login .u-l-sign-before"),
			    after = $(".user-login .u-l-sign-after");
			    
				QC.Login({
					btnId : "qqLoginBtn",//插入按钮的html标签id
					size : "C_S",//按钮尺寸
					scope : "get_user_info",//展示授权，全部可用授权可填 all
					display : "pc"//应用场景，可选
				},function(reqData, opts){//登录成功
				    signin(reqData.figureurl, reqData.nickname, "qq");
				}, function(opts){//注销成功
				     signout(opts);
				});


				QC.Login({
					btnId : "qqLoginBtn2",//插入按钮的html标签id
					size : "A_M",//按钮尺寸
					scope : "get_user_info",//展示授权，全部可用授权可填 all
					display : "pc"//应用场景，可选
				},function(reqData, opts){//登录成功
				    signin(reqData.figureurl, reqData.nickname, "qq");
				}, function(opts){//注销成功
				     signout(opts);
				});
				
			// 登陆成功后做的事情
			function signin(userimg, nickname, from) {
					//根据返回数据，更换按钮显示状态方法
			      
			       $("#aj-user-login-choices").hide();
			       
			       var img = $(document.createElement("img"));
			       img.attr("src", userimg);
			       $(".user-login .u-l-photo").append(img);
			       
			       
			       before.hide();
			       after.find(".nickname").html(nickname);
			       after.show();
			       
			       if (from === "qq") {
			       		QC.Login.getMe(function(openId, accessToken){
							
						})
			       }
			}
			
			function signout() {
				$("#aj-user-login-choices").show();
		        after.hide();
		        $(".user-login .u-l-photo").find("img").remove();
		        before.show();
			}
			   
			// QQ 注销   
			$("#aj-qq-sign-out").on("click", function() {
				if (QC.Login.check()) {
					QC.Login.signOut();
				}
			}) 
			
			// 微博登陆
			WB2.anyWhere(function(W){
			    W.widget.connectButton({
			        id: "wb_connect_btn",
			        type:"3,2",
			        callback : {
			            login:function(o){	//登录后的回调函数
			            },	
			            logout:function(){	//退出后的回调函数
			            }
			        }
			    });
			});
			
			WB2.anyWhere(function(W){
			    W.widget.connectButton({
			        id: "wb_connect_btn2",	
			        type:"3,2",
			        callback : {
			            login:function(o){	//登录后的回调函数
			            },	
			            logout:function(){	//退出后的回调函数
			            }
			        }
			    });
			});
			
			
			// github登陆
			$("#aj-sign-panel .other-ways .github").on("click", function () {
				var params = {
					client_id : "ab170726816e269ab1ba",
					redirect_uri : "http://www.nigeerhuo.com/sign/github",
					//scope : "",
					state : CSRF_STATE
				};
				
				var url = "https://github.com/login/oauth/authorize";
				var paramsArr = [];
				for (var key in params) {
					paramsArr.push(key + "=" + encodeURIComponent(params[key]));
				}
				url = url + "?" + paramsArr.join("&");
				
				console.log(url);
				//location.href = url;
			})
			
			

		}catch(ex) {
			console.log(ex.message);
		}
	});
</script>