package ajax.spider.rules;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.Callback;
import ajax.model.entity.Item;
import ajax.tools.Tools;

public class ToutiaoRules extends Rules{

	@Override
	public RulesTag getRulesTag() {
		return RulesTag.TOU_TIAO;
	}

	@Override
	public String getTitleSelector() {
		return "#pagelet-article > div.article-header > h1";
	}

	@Override
	public String getSummarySelector() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getContentSelector() {
		return "#pagelet-article > div.article-content";
	}

	@Override
	public String getStampsSelector() {
		return "#pagelet-article > div.article-actions > div.top-actions.clearfix > ul > li.tag-item";
	}
	
	@Override
	public String preProcessStampsElements(Elements eles) {
		List<String> arr = new ArrayList<String>(); 
		for (Element ele : eles) {
			arr.add(ele.text().trim());
		}
		return Tools.join(arr, Item.STAMPS_DELIMITER);
	};

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

	@Override
	public Callback<Element, String> returnImgCallback() {
		return new Callback<Element, String>() {

			@Override
			public String deal(Element in) {
				return in.attr("src");
			}
		};
	}

}
