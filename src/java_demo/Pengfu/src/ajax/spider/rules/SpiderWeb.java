package ajax.spider.rules;

import ajax.model.JokeType;

public interface SpiderWeb {
	public String returnUrl();
	public JokeType returnJokeType();
	public Rules returnRules();
}
