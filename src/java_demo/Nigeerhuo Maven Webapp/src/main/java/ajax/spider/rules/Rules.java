package ajax.spider.rules;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.Callback;
import ajax.tools.Tools;

public abstract class Rules {
	
	public abstract RulesTag getRulesTag();
	/**
	 * 决策下载图片的url是什么
	 * @return
	 */
	public abstract Callback<Element, String> returnImgCallback();
	
	
	public abstract String getTitleSelector();
	public abstract String getSummarySelector();
	public abstract String getContentSelector();
	public abstract String getStampsSelector();
	public abstract String getLikesSelector();
	public abstract String getDislikesSelector();
	public abstract String getUsernameSelector();
	public abstract String getUserPersonalPageUrlSelector();
	public abstract String getBackgroundInformationSelector();
	
	
	public String preProcessTitleElements(Elements eles) {
		return eles.html();
	}
	public String preProcessSummaryElements(Elements eles) {
		String content = eles.html().replaceAll("<script>", "&lt;script&gt;");
		return content;
	}
	public String preProcessContentElements(Elements eles) {
		String content = eles.html().replaceAll("<script>", "&lt;script&gt;");
		return content;
	}
	public String preProcessStampsElements(Elements eles) {
		return eles.html();
	}
	public int preProcessLikesElements(Elements eles) {
		return Tools.parseInt(eles.html());
	}
	public int preProcessDislikesElements(Elements eles) {
		return Tools.parseInt(eles.html());
	}
	public String preProcessUsernameElements(Elements eles) {
		return eles.html();
	}
	public String preProcessUserPersonalPageUrlElements(Elements eles) {
		return eles.html();
	}
	public String preProcessBackgroundInformationElements(Elements eles) {
		return eles.html();
	}
}
