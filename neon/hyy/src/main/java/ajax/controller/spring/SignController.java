package ajax.controller.spring;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import ajax.model.AjaxResponse;
import ajax.model.ConfigFromProperties;
import ajax.model.entity.Info;
import ajax.model.safe.User;
import ajax.model.safe.User.QQAccess;

@Controller
@RequestMapping(value = "/sign")
public class SignController {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpServletResponse response;

	@RequestMapping(value = "/qq")
	public String signQQ() throws Exception {
		String action = request.getParameter("action");
		String code = request.getParameter("code");
		String responseString = "";

		if (code != null && !code.equals("")) {
			QQAccess qa = User.getQQAccess(code);

			if (qa.isOK()) {
				User.QQOpenIdModel qim = User.getQQOpenId(qa);

				User.QQUserSimpleModel usm = User.getQQSimpleModel(qa, qim);

				User u = new User();
				u.setAccessToken(qa.getAccess_token());
				u.setFrom(User.Source.QQ.getId());
				u.setOpenId(User.Source.dealOpenId(qim.getOpenid(), User.Source.QQ));
				u.setImg(usm.getUserimg());
				u.setUsername(usm.getNickname());

				responseString = u.signIn(request, response);

			}

			return "views/html/close";

		} else {
			if (action == null || action.equals("")) {

				return "views/html/qqSign";

			} else {

				request.setCharacterEncoding("UTF-8");
				String openId = request.getParameter("id");
				String accessToken = request.getParameter("token");
				String nickname = request.getParameter("nickname");
				String img = request.getParameter("img");
				openId = User.Source.dealOpenId(openId, User.Source.QQ);

				User u = new User();
				u.setOpenId(openId);
				u.setUsername(nickname);
				u.setAccessToken(accessToken);
				u.setFrom(User.Source.QQ.getId());
				u.setImg(img);

				String json = u.signIn(request, response);

				response.setContentType("text/json");
				response.setCharacterEncoding("UTF-8");

				request.setAttribute("model", json);

				return "Ajax";
			}
		}
	}

	@RequestMapping(value = "/weibo")
	public String signWeibo() {
		String code = request.getParameter("code");
		String responseString = "";

		if (code != null && !code.equals("")) {
			User.WeiboAccess wa = User.getWeiboAccess(code);

			if (wa.isOK()) {

				User.WeiboUserSimpleModel wsm = User.getWeiboUserSimpleModel(wa);

				Info info = new Info();
				info.setKey("weibosign");
				info.setValue("可以获取到用户信息" + wsm.getName());
				info.save();

				User u = new User();
				u.setAccessToken(wa.getAccess_token());
				u.setFrom(User.Source.WEIBO.getId());
				u.setOpenId(User.Source.dealOpenId(wa.getUid(), User.Source.WEIBO));
				u.setImg(wsm.getAvatar_large());
				u.setUsername(wsm.getName());

				responseString = u.signIn(request, response);

				info = new Info();
				info.setKey("weibosign");
				info.setValue("sign in 执行成功" + u.getId());
				info.save();
			} else {
				AjaxResponse<String> ar = new AjaxResponse<String>();
				ar.setIsok(false);
				ar.setData("请求授权环节失败");
				responseString = ar.toJson();
			}

		}

		return "views/html/close";
	}

	@RequestMapping(value = "/github")
	public String signGithub() {
		String code = request.getParameter("code");
		String state = request.getParameter("state");

		if (code != null && !code.equals("")) {
			User.GithubAccessToken gat = User.getGithubAccessToken(code, state);

			if (gat.isOK()) {

				User.GithubUserSimpleModel gusm = User.getGithubUserSimpleModel(gat);

				User u = new User();
				u.setAccessToken(gat.getAccess_token());
				u.setFrom(User.Source.GITHUB.getId());
				u.setOpenId(User.Source.dealOpenId(gusm.getId(), User.Source.GITHUB));
				u.setImg(gusm.getAvatar_url());
				u.setUsername(gusm.getLogin());

				u.signIn(request, response);

			}
		}

		return "views/html/close";
	}

	@RequestMapping(value = "/google")
	public String signGoogle() {

		if (User.isLogin(request, response)) {
			return "Ajax";
		}
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
				JacksonFactory.getDefaultInstance())
						.setAudience(Arrays.asList(ConfigFromProperties.getGoogle_nigeerhuo_oauth_id()))
						// If you retrieved the token on Android using the Play
						// Services 8.3 API or newer, set
						// the issuer to "https://accounts.google.com".
						// Otherwise, set the issuer to
						// "accounts.google.com". If you need to verify tokens
						// from multiple sources, build
						// a GoogleIdTokenVerifier for each issuer and try them
						// both.
						.setIssuer("accounts.google.com").build();
		String idTokenString = request.getParameter("id_token");
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		ar.setIsok(false);
		
		try {
			GoogleIdToken idToken = verifier.verify(idTokenString);

			if (idToken != null) {
				Payload payload = idToken.getPayload();

				// Print user identifier
				String userId = payload.getSubject();
				String name = (String) payload.get("name");
				String pictureUrl = (String) payload.get("picture");
				
				User u = new User();
				u.setAccessToken(idTokenString);
				u.setFrom(User.Source.GOOGLE.getId());
				u.setOpenId(User.Source.dealOpenId(userId, User.Source.GOOGLE));
				u.setImg(pictureUrl);
				u.setUsername(name);
				
				u.signIn(request, response);
				ar.setIsok(true);
				ar.setData("Google sign in ok!");
			} else {
				ar.setData("Google sign in fail! Unvalid token !");
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
			ar.setData("Google sign in fail!" + e.getMessage());
		}
		
		request.setAttribute("model", ar.toJson());
		return "Ajax";
	}

	@RequestMapping(value = "/out")
	public String signOut() {
		User.signout(request, response);

		AjaxResponse<String> ar = new AjaxResponse<String>();

		ar.setIsok(true);
		ar.setData("sign out ok");

		request.setAttribute("model", ar.toJson());
		return "Ajax";

	}
}
