package ajax.model.entity;

import ajax.model.JokeType;
import ajax.spider.Spider3;
import ajax.spider.rules.Rules;
import ajax.spider.rules.RulesTag;
import ajax.spider.rules.SpiderWeb;

public class Source extends Entity<Source>{
	private int id;
	private String url;
	private int itype;
	private int rulestagid;
	private boolean isGrab = false;
	private int likes;
	
	
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getItype() {
		return itype;
	}
	public void setItype(int itype) {
		this.itype = itype;
	}
	public int getRulestagid() {
		return rulestagid;
	}
	public void setRulestagid(int rulestagid) {
		this.rulestagid = rulestagid;
	}
	public boolean isGrab() {
		return isGrab;
	}
	public boolean getIsGrab() {
		return isGrab;
	}
	public void setIsGrab(boolean isGrab) {
		this.isGrab = isGrab;
	}
	public void setGrab(boolean isGrab) {
		this.isGrab = isGrab;
	}
	@Override
	public String toString() {
		return "Source [id=" + id + ", url=" + url + ", itype=" + itype
				+ ", rulestagid=" + rulestagid + ", isGrab=" + isGrab
				+ ", likes=" + likes + "]";
	}
	
	public void grabAndSaveToItemAndChangeSelfStatus() {
		try {
			Item item = this.grabSelf();
			
			item.save();
			
			this.setGrab(true);
			this.update();
			
			
			System.out.println("Grab OK : " + item.getTitle());
			
		}catch(Exception e) {
			System.out.println("Grab Error : " + e.getMessage());
		}
		
	}
	
	public Item grabSelf() {
		final String url = this.getUrl();
		final int rulesTagId = this.getRulestagid();
		final int jokeTypeId = this.getItype();
		
		Spider3 sp = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						return url;
					}
					
					@Override
					public Rules returnRules() {
						RulesTag rt = RulesTag.getRulesTagById(rulesTagId);
						
						try {
							return (Rules) Class.forName(rt.getClassName()).newInstance();
						} catch (InstantiationException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (IllegalAccessException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (ClassNotFoundException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						return null;
					}
					
					@Override
					public JokeType returnJokeType() {
						return JokeType.getJokeType(jokeTypeId);
					}
				};
			}

			@Override
			public Item returnItem() {
				// TODO Auto-generated method stub
				return null;
			}
		};
		
		Item item = sp.grabItem();
		
		return item;
	}
	
	
	
}
