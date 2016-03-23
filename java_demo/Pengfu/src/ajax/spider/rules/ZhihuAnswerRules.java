package ajax.spider.rules;



public class ZhihuAnswerRules extends PreProcessor implements Rules{

	@Override
	public RulesTag getRulesTag() {
		return RulesTag.ZHIHU_ANSWER;
	}
	
	@Override
	public String getTitleSelector() {
		return "#zh-question-title > h2.m-item-title > a";
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
		return "div.zg-wrap.zu-main.clearfix.with-indention-votebar > div.zu-main-content > div > div.zm-tag-editor.zg-section > div > a.zm-item-tag";
	}

	@Override
	public String getLikesSelector() {
		return ".zm-votebar .count";
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
	public String getBackgroundInformationSelector() {
		return "#zh-question-detail > div.zh-summary";
	}

	
}
