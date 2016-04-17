package ajax.spider.rules;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.*;
import ajax.tools.Tools;



public class ZhihuAnswerRules extends Rules{

	@Override
	public RulesTag getRulesTag() {
		return RulesTag.ZHIHU_ANSWER;
	}
	
	
	@Override
	public String getTitleSelector() {
		return "#zh-question-title > h2 > a";
	}

	@Override
	public String getSummarySelector() {
		return "#zh-question-answer-wrap > div > div.zm-item-rich-text.js-collapse-body > div.zh-summary.summary.clearfix";
	}
	
	@Override
	public String getContentSelector() {
		return "#zh-question-answer-wrap > div > div.zm-item-rich-text.js-collapse-body > div.zm-editable-content.clearfix";
	}

	@Override
	public String getStampsSelector() {
		return "body > div.zg-wrap.zu-main.clearfix.with-indention-votebar > div.zu-main-content > div > div.zm-tag-editor.zg-section > div > a";
	}
	@Override
	public String preProcessStampsElements(Elements eles) {
		List<String> strs = new ArrayList<String>();
		for (Element ele : eles) {
			strs.add(ele.html().replace(",", ""));
		}
		return Tools.join(strs, ",");
	};

	@Override
	public String getLikesSelector() {
		return "#zh-question-answer-wrap > div > div.zm-votebar > button.up > span.count";
	}

	@Override
	public String getDislikesSelector() {
		return null;
	}

	@Override
	public String getUsernameSelector() {
		return "#zh-question-answer-wrap > div > div.answer-head > div.zm-item-answer-author-info > a.author-link";
	}

	@Override
	public String getUserPersonalPageUrlSelector() {
		return "#zh-question-answer-wrap > div > div.answer-head > div.zm-item-answer-author-info > a.author-link";
	}
	@Override 
	public String preProcessUserPersonalPageUrlElements(Elements eles) {
		try {
			String href = eles.get(0).attr("href");
			
			return Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(href, "https://www.zhihu.com/");
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return "";
	};

	@Override
	public String getBackgroundInformationSelector() {
		return "#zh-question-detail > div";
	}


	@Override
	public Callback<Element, String> returnImgCallback() {
		return new Callback<Element, String>() {
			
			@Override
			public String deal(Element in) {
				return in.attr("data-actualsrc");
			}
		};
	}




	
}
