<%@page import="ajax.model.safe.Safe"%>
<%@page import="ajax.model.safe.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String state = Safe.getState(request);

boolean isLogin = User.isLogin(request, response);
User curUser = User.getLoginUser(request);

request.setAttribute("isLogin", isLogin);
request.setAttribute("curUser", curUser);

%>

<style>
	#aj-user-sign-config{
		display: none;
		opacity:0;
	}

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

<div class="user-login" data-islogin="0" data-userid="0">
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
				<a href="javascript:;" id="aj-sign-out">注销</a>
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

<c:choose>
	<c:when test="${isLogin }">
		<form id="aj-user-sign-config">
			<input name="isLogin" value='<c:out value="${isLogin }"></c:out>' />
			<input name="nickname" value='<c:out value="${curUser.getUsername() }"></c:out>' />
			<input name="img" value='<c:out value="${curUser.getImg() }"></c:out>' />
			<input name="userid" value='<c:out value="${curUser.getId() }"></c:out>' />
		</form>
	</c:when>
	
	<c:otherwise>
		<form id="aj-user-sign-config">
			<input name="isLogin" value='<c:out value="${isLogin }"></c:out>' />
		</form>
	</c:otherwise>
</c:choose>

<script type="text/javascript">
	$(function() {
		try {
			var container = $(".user-login");
			var CSRF_STATE = "<%=state %>";
			var config = {
				qq : {
					url : "/sign/qq"
				},
				weibo : {
					url : "sign/weibo"
				},
				USER_HOME : "/userhome",
				SIGN_OUT : "sign/out",
				SIGNIN_ATTR : "aj-is-query-server-for-sign-now"
			};
			
			try {
				var aj_user_sign_config_form = $("#aj-user-sign-config")[0];
				
				if (aj_user_sign_config_form.isLogin.value.toLowerCase() == "true") {
					signin(aj_user_sign_config_form.img.value, aj_user_sign_config_form.nickname.value, "server", aj_user_sign_config_form);
				}
				
			}catch(ex) {
				console.log(ex);
			}
			
			
			// 更多登陆方式
			$(function(){
				$(".aj-show-sign-panel").click(function(){
				  $("#aj-sign-panel").modal("toggle");
				});
			});	
			
				
		 	var before = $(".user-login .u-l-sign-before"),
			    after = $(".user-login .u-l-sign-after");
			    


				
			// 登陆成功后做的事情
			function signin(userimg, nickname, from, moreInfo) {
					//根据返回数据，更换按钮显示状态方法
			     var before = $(".user-login .u-l-sign-before"),
			    		after = $(".user-login .u-l-sign-after");
			      	
			       $("#aj-user-login-choices").hide();
			       
			       var img = $(document.createElement("img"));
			       img.attr("src", userimg);
			       
			       var atag = $(document.createElement("a"));
			       atag.append(img);
			       atag.attr("href", config.USER_HOME);
			       $(".user-login .u-l-photo").append(atag);
			       
			       
			       before.hide();
			       after.find(".nickname").html(nickname);
			       after.show();
			       
			       // 切换登陆状态, 让User类判断是否登陆了
			       container.attr("data-islogin", "1");
			       
			       // 向服务端注册
			       if (from === "qq") {
			       
			       		QC.Login.getMe(function(openId, accessToken){
							var data = {
								id : openId,
								token : accessToken,
								action : "sign",
								img : userimg
							};
							
							QC.api("get_user_info", {})
							//指定接口访问成功的接收函数，s为成功返回Response对象
							.success(function(s){
								data.nickname = s.data.nickname;
								data.dataText = s.dataText;
								
								$.ajax({
									url : config.qq.url,
									data : data,
									type : "POST",
									dataType : "json",
									success : function (json) {
										try {
											var userid = json.data.user.id;
											
											container.attr("data-userid", userid);
										}catch(ex) {
											console.log(ex);
										}
									},
									error : function(e) {
										console.log(e);
									}
								});
							}).error(function(f){ //指定接口访问失败的接收函数，f为失败返回Response对象
								//失败回调
							}).complete(function(c){//指定接口完成请求后的接收函数，c为完成请求返回Response对象
								
							});
						})
						
			       }
			       
			       if (from == "weibo") {
			       		(function () {
			       			var data = {
			       				uid : moreInfo.uid,
			       				token : moreInfo.access_token,
			       				nickname : nickname,
			       				img : moreInfo.avatar_hd
			       			}
			       			
			       			$.ajax({
			       				url : config.weibo.url,
			       				data : data,
			       				type : "POST",
			       				dataType : "json",
			       				success : function (json) {
			       					console.log(json);
			       				},
			       				error : function (e) {
			       					console.log(e);
			       				}
			       			});
			       		})();
			       }
			       
			       
			       if (from == "server") {
			       		(function () {
			       			var userid = moreInfo.userid;
			       			
			       			container.attr("data-userid", userid);
			       		})();
			       }
			}
			
			
			// 注销的样式处理 和服务端吗处理
			function signout() {
				$("#aj-user-login-choices").show();
		        after.hide();
		        $(".user-login .u-l-photo").find("img").remove();
		        before.show();
		        sessionStorage.removeItem(config.SIGNIN_ATTR);
		        
		        
		        $(".user-login").attr("data-islogin", "0");
		        
		        $.ajax({
		        	url : config.SIGN_OUT,
		        	type : "GET",
		        	dataType : "text/json",
		        	success : function (json) {
		        		console.log(json);
		        	},
		        	error : function (err) {
		        		console.log(err);
		        	}
		        });
			}
			   
			// 注销   对于 第三方登陆的处理, 第三方登陆会有一个异步函数调用  signout 函数
			$("#aj-sign-out").on("click", function() {
				if (QC.Login.check()) {
					QC.Login.signOut();
				}
				
				if (WB2.checkLogin()) {
					WB2.logout();
				}
				
				signout()
			})

			// QQ登陆
			QC.Login({
				btnId : "qqLoginBtn",//插入按钮的html标签id
				size : "C_S",//按钮尺寸
				scope : "get_user_info",//展示授权，全部可用授权可填 all
				display : "pc"//应用场景，可选
			},function(reqData, opts){//登录成功
			    signin(reqData.figureurl, reqData.nickname, "qq");
			}, function(opts){//注销成功
			     // signout(opts);  这个方法不要在这调用
			});
				
							
			// 微博登陆
			WB2.anyWhere(function(W){
			    W.widget.connectButton({
			        id: "wb_connect_btn2",	
			        type:"3,2",
			        callback : {
			            login:function(o){	//登录后的回调函数
			            	console.log(o);
			            	signin(o.avatar_large, o.name, "weibo", o);
			            },
			            logout:function(){	//退出后的回调函数
			            	// signout();
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