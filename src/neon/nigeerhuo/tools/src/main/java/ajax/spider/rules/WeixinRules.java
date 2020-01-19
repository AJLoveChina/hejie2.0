package ajax.spider.rules;

import org.jsoup.nodes.Element;

import ajax.model.Callback;

public class WeixinRules extends Rules{

	@Override
	public RulesTag getRulesTag() {
		return RulesTag.WEIXIN;
	}

	@Override
	public Callback<Element, String> returnImgCallback() {
		return new Callback<Element, String>() {

			@Override
			public String deal(Element in) {
				return in.attr("data-src");
			}
		};
	}

	@Override
	public String getTitleSelector() {
		return "#activity-name";
	}

	@Override
	public String getSummarySelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getContentSelector() {
		return "#js_content";
	}

	@Override
	public String getStampsSelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getLikesSelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getDislikesSelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUsernameSelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUserPersonalPageUrlSelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getBackgroundInformationSelector() {
		// TODO Auto-generated method stub
		return null;
	}

}
