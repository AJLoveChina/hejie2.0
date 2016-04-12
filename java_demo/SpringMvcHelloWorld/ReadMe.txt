====================QQ登录java for server SDK demo使用说明====================

====================当前版本信息====================
当前版本：V2.0.0.0

发布日期：2012-12-28

文件大小：2.22 M 

版本支持：支持JDK5.0及以上版本。


====================修改历史====================

====================使用说明====================
部署之前请先修改./web/WEB-INF/classes 下的qqconnectconfig.properties 文件里边的appid，appkey，redirectUrl 等信息，填入您自己的app信息。
如果在本机tomcat或其他服务器下部署请配置本地host文件：   127.0.0.1 您的回调域名

直接部署运行，将sdk4j_demo目录中的web目录直接放在tomcat服务器的webapp目录即可,配置conf/server.xml文件中的host的context
            <Context docBase="web" path="/" privileged="true" antiResourceLocking="false">
            </Context>
	   并将webapp目录下的Root 文件夹暂时移除。

其他服务器请参照服务器自身部署方法。请将服务器的端口号配置至80端口。

配置host：127.0.0.1 您的回调域名   访问首页 您的回调域名/index.jsp

网站首页 index.jsp 引导用户到 IndexServlet
IndexServlet 用到了 SDK中的 com.qq.connect.oauth.Oauth.getAuthorizeURL(..) 方法来获取应该引导用户跳转的地址

用户授权以后重定向到了AfterLoginRedirectServlet
AfterLoginRedirectServlet 通过调用 SDK中的 com.qq.connect.oauth.Oauth.getAccessTokenByRequest(..)获取AccessToken 对象，从其中获取accessToken等详细信息

之后利用accessToken 调用com.qq.connect.api.OpenID 的 getOpenID(..)方法来获取跟当前QQ用户唯一对应的openID

之后利用获取到的accessToken 和 openID 调用api接口

分别调用了com.qq.connect.api.qzone.UserInfo  的 getUserInfo接口
和       com.qq.connect.api.weibo.UserInfo 的 getUserInfo 接口
随后在当前页面上引导用户前往 shuoshuoDemo.html 发表心情， 通过调用 com.qq.connect.api.qzone.Topic  addTopic()方法完成说说的发表




====================联系我们====================
QQ登录官网：http://connect.qq.com/
开发者在使用过程中有任何意见和建议，请发邮件至connect@qq.com 进行反馈。
此外，你也可以通过企业QQ（号码：800030681。直接在QQ的“查找联系人”中输入号码即可开始对话）咨询。

