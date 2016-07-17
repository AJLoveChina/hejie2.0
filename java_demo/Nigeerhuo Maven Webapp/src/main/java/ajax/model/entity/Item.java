package ajax.model.entity;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

import javax.imageio.ImageIO;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.json.JSONObject;
import org.json.JSONString;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.aliyun.oss.OSSClient;

import ajax.model.Callback;
import ajax.model.ItemStatus;
import ajax.model.JokeStatus;
import ajax.model.JokeType;
import ajax.model.QueryParams;
import ajax.model.UrlRoute;
import ajax.spider.Spider3;
import ajax.spider.rules.Rules;
import ajax.spider.rules.RulesTag;
import ajax.spider.rules.SpiderWeb;
import ajax.tools.HibernateUtil;
import ajax.tools.OssUtil;
import ajax.tools.Tools;


public class Item extends Entity<Item> implements Iterable<Item>, JSONString{
	
	private int id;
	private String url;
	private String title;
	private String summary;
	private String content;
	private String stamps;
	private int likes;
	private int dislikes;
	private boolean hasGetImage = false;
	private int itype;
	private int status;
	private String username;
	private String userPersonalPageUrl;
	private String backgroundInformation;
	private String dateEntered;
	private int rulesTagId;
	private String previewImage;
	private int statusForTest;
	private String statusSplitByComma;
	/**
	 * 图片是否已经上传Oss
	 */
	private boolean hasImageUploadedToOss = false;
	/**
	 * 属于哪一页
	 */
	private int page;
	
	
	private String[] $stampsArr;
	
	public static final String STAMPS_DELIMITER = ",";
	
	
	/**
	 * 如果stamps为null, 返回空数组
	 * @return
	 */
	public String[] get$stampsArr() {
		if (this.isHasStamps()) {
			return this.getStamps().split(",");
		} else {
			String[] arr = {};
			return arr;
		}
	}
	
	
	public boolean isHasStamps() {
		if (this.stamps != null && !this.stamps.equals("")) {
			return true;
		} else {
			return false;
		}
	}
	
	
	public int getStatusForTest() {
		return statusForTest;
	}


	public void setStatusForTest(int statusForTest) {
		this.statusForTest = statusForTest;
	}


	public String getStatusSplitByComma() {
		return statusSplitByComma;
	}
	public void setStatusSplitByComma(String statusSplitByComma) {
		this.statusSplitByComma = statusSplitByComma;
	}
	public boolean isHasImageUploadedToOss() {
		return hasImageUploadedToOss;
	}
	public void setHasImageUploadedToOss(boolean hasImageUploadedToOss) {
		this.hasImageUploadedToOss = hasImageUploadedToOss;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public String getPreviewImage() {
		return previewImage;
	}
	public void setPreviewImage(String previewImage) {
		this.previewImage = previewImage;
	}
	public int getRulesTagId() {
		return rulesTagId;
	}
	public void setRulesTagId(int rulesTagId) {
		this.rulesTagId = rulesTagId;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStamps() {
		return stamps;
	}
	public void setStamps(String stamps) {
		this.stamps = stamps;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getDislikes() {
		return dislikes;
	}
	public void setDislikes(int dislikes) {
		this.dislikes = dislikes;
	}
	public boolean isHasGetImage() {
		return hasGetImage;
	}
	public void setHasGetImage(boolean hasGetImage) {
		this.hasGetImage = hasGetImage;
	}
	public int getItype() {
		return itype;
	}
	public void setItype(int itype) {
		this.itype = itype;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserPersonalPageUrl() {
		return userPersonalPageUrl;
	}
	public void setUserPersonalPageUrl(String userPersonalPageUrl) {
		this.userPersonalPageUrl = userPersonalPageUrl;
	}
	public String getBackgroundInformation() {
		return backgroundInformation;
	}
	public void setBackgroundInformation(String backgroundInformation) {
		this.backgroundInformation = backgroundInformation;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	
	
	/**
	 * @return 实体的jokeType realname
	 */
	public String getITypeRealName() {
		JokeType jt = JokeType.getJokeType(this.itype);
		return jt.getRealName();
	}
	
	/**
	 * itype 就是 jokeType
	 * @return
	 */
	public JokeType getJokeType() {
		return JokeType.getJokeType(this.getItype());
	}
	/**
	 * 返回类型页面url
	 * @return
	 */
	public String getItypeUrl() {
		return this.getJokeType().getHref();
	}
	
	public void updateBySpider() {
		final String url = this.getUrl();
		final JokeType jokeType = JokeType.getJokeType(this.getItype());
		final RulesTag rulesTag = RulesTag.getRulesTagById(this.getRulesTagId());
		final Item item = this;
		
		Spider3 sp3 = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						return url;
					}
					
					@Override
					public Rules returnRules() {
						try {
							
							return (Rules) Class.forName(rulesTag.getClassName()).newInstance();
							
						} catch (InstantiationException e) {
							System.out.println("Error : " + e.getMessage());
						} catch (IllegalAccessException e) {
							System.out.println("Error : " + e.getMessage());
						} catch (ClassNotFoundException e) {
							System.out.println("Error : " + e.getMessage());
						}
						return null;
					}
					
					@Override
					public JokeType returnJokeType() {
						return jokeType;
					}
				};
			}

			@Override
			public Item returnItem() {
				return item;
			}
		};
		
		sp3.update(this.getId());
	}
	
	
	public static Item getByItemById(int id) {
		
		Session session = HibernateUtil.getSession();
		
		Item entity = session.get(Item.class, id);
		
		return entity;
	}
	
	/**
	 * return UrlRoute.ONEJOKE + "?id=" + this.getId(); 
	 * @return
	 */
	public String getOneJokeUrlById() {
		return UrlRoute.ONEJOKE + "?id=" + this.getId(); 
	}
	
	/**
	 * return UrlRoute.ONEJOKE_V2 + "/" + this.getId(); 
	 * @return
	 */
	public String getOneJokeUrlByIdV2() {
		return UrlRoute.ONEJOKE_V2 + "/" + this.getId(); 
	}
	
	
	public boolean hasAuthor() {
		return (this.getUsername() != null && this.getUsername().trim() != "");
	}
	
	/**
	 * 是否有预览图片
	 * @return
	 */
	public boolean hasPreviewImage() {
		return this.previewImage != null && !this.previewImage.equals("");
	}
	
	/**
	 * 根据QueryParams 对象查询 item实体集
	 * @param qp
	 * @return
	 */
	public static List<Item> query(QueryParams qp) {
		
		Session session = HibernateUtil.getSession();
		
		Criteria criteria = session.createCriteria(Item.class);
		
		
		int page = 1;
		int size = 10;
		
		if (qp.isSet("page")) {
			page = Tools.parseInt(qp.getVal("page"), 1);
		}
		if (qp.isSet("size")) {
			size = Tools.parseInt(qp.getVal("size"), 10);
		}
			
		criteria.setFirstResult((page - 1) * size);
		criteria.setMaxResults(size);
		
		if (qp.isSet("type")) {
			criteria.add(Restrictions.eq("itype", Tools.parseInt(qp.getVal("type"), JokeType.UNKNOWN.getId())));
		}
		
		return criteria.list();
	}
	
	
	public String grabImagesFromContent() {
		return grabImagesFromContent(null);
	}
	
	/**
	 * 根据content获取图片并保存到本地磁盘<br>
	 * return new Content that contains imgs which src is alright.
	 * 注意该方法不会在抓取完毕后更新 content 的值, 如果需要抓取后更新实体请使用 grabImagesFromContentAndUpdate
	 * @param callback 处理图片 Element 的策略(默认直接返回图片的src值作为 图片地址, 你可以自定义这个策略, 因为某些图片src值并不是真实的图片地址)
	 * @return 返回图片被处理的content值, 如果发生异常直接返回  处理前的content值
	 */
	public String grabImagesFromContent(Callback callback) {
		int rulesTagid = this.getRulesTagId();
		RulesTag rt = RulesTag.getRulesTagById(rulesTagid);
		String folder = rt.getImageFolder();
		
		String newContent;
		try {
			
			if (callback == null) {
				callback = new Callback<Element, String>() {

					@Override
					public String deal(Element in) {
						return in.attr("src");
					}

					
				};
			}
			newContent = Tools.grabImagesFromString(new URL(this.getUrl()), this.getContent(), folder, callback);
			
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			newContent = this.getContent();
		}
		
		return newContent;
	}
	
	/**
	 * 根据item的rulestagid 获取处理图片下载的策略, 如果获取不到就采用默认的策略(返回src值作为下载地址)
	 * @return
	 */
	public Callback<Element, String> getImgDealCallbackFromRules() {
		RulesTag rt = RulesTag.getRulesTagById(this.getRulesTagId());
		
		
		try {
			Rules rules = (Rules)Class.forName(rt.getClassName()).newInstance();
			
			return rules.returnImgCallback();
			
		} catch (Exception e) {
			return new Callback<Element, String>() {

				@Override
				public String deal(Element in) {
					return in.attr("src");
				}
				
			};
		}
	}
	
	/**
	 * save imgs to oss
	 * @param imgDealCallback
	 * @return
	 */
	public String grabImagesFromContentAndSaveToOssThenReturnContent(Callback<Element, String> imgDealCallback) {
		int rulesTagid = this.getRulesTagId();
		RulesTag rt = RulesTag.getRulesTagById(rulesTagid);
		String folder = rt.getImageFolder();
		
		String newContent;
		try {
			
			if (imgDealCallback == null) {
				imgDealCallback = this.getImgDealCallbackFromRules();
			}
			
			newContent = Tools.grabImagesFromStringThenUploadToOss(new URL(this.getUrl()), this.getContent(), folder, imgDealCallback);
			
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			newContent = this.getContent();
		}
		
		return newContent;		
	}
	
	/**
	 * 根据content获取图片并保存到本地磁盘<br>抓取后更新实体
	 */
	public void grabImagesFromContentAndUpdate() {
		
		String newContent = this.grabImagesFromContent();
		this.setContent(newContent);
		this.setHasGetImage(true);
		this.update();
		
	}
	
	/**
	 * 根据QueryParams 获取对应的URL
	 * @param qp
	 * @return
	 */
	public static String getHrefByQueryParams(UrlRoute urlRoute, QueryParams qp) {
		StringBuilder sb = new StringBuilder();
		sb.append(urlRoute.getUrl());
		sb.append("?");
		
		
		
		
		return sb.toString();
	}
	
	/**
	 * 根据content生成summary内容  返回并不更新实体<br>
	 * 注意你应该确定已经生成了 item的 缩略图, 因为有木有缩略图的item的summary字数是不一样的
	 * @return
	 */
	public String generateSummaryAndReturn() {
		Document doc = Jsoup.parse(this.getContent());
		String summary = "";
		try {
			
			String text = doc.body().text();
			
			int length,random;
			if (this.getPreviewImage() == null || this.getPreviewImage() == "") {
				length = 170;
				random = (new Random()).nextInt(40);
				
				summary = text.substring(0, length + random);
			} else {
				length = 110;
				random = (new Random()).nextInt(20);
				summary = text.substring(0, length + random);
			}
			
			
		}catch(Exception e) {
			summary = doc.body().text();
		}
		
		return summary;
	}
	/**
	 * 根据content生成summary内容并update实体
	 */
	public void generateSummary() {
		
		this.setSummary(this.generateSummaryAndReturn());
		this.update();
		
	}
	
	/**
	 *  根据content获取一张代表图片, 但是不更新实体<br>
	 *  如果已经有previewImage, 不会重新生成了
	 * @return 返回缩略图的路径, null if not suitable image
	 */
	public String generateItemImageAndReturn() {
		if (this.getPreviewImage() != null && !this.getPreviewImage().trim().equals("") && !this.getPreviewImage().trim().equals("null")) {
			return this.getPreviewImage();
		}
		try {
			Document doc = Jsoup.parse(this.getContent());
			
			Elements imgs = doc.select("img");
			
			Map<String, Float> map = new HashMap<String, Float>();
			
			if (imgs.size() > 0) {
				Callback<Element, String> imgCallback = this.getImgDealCallbackFromRules();
				for (Element img : imgs) {
					
					// String src = img.attr("src");
					// 获取图片原来网站的url
					String src = imgCallback.deal(img);
					
					ImagesContainer ic = ImagesContainer.getByUrl(src);
					
					try {
						URL url = new URL(src);
						BufferedImage sourceImg = ImageIO.read(url.openStream());
						if (sourceImg.getWidth() > 50) {
							map.put(ic.getWebPath(), Math.abs((float)sourceImg.getWidth() / sourceImg.getHeight() - 1));
						}
					}catch(Exception ex) {
						System.out.println(ex.getMessage());
					}
				}
				
				String result = null;
				float des = 999;
				
				for(String key : map.keySet()) {
					if (map.get(key) < des) {
						result = key;
					}
				}
//				
//				this.setPreviewImage(result);
//				this.update();
				
				return result;
			}
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	
	/**
	 * 根据content获取一张代表图片并update实体
	 */
	public void generateItemImage() {
		this.setPreviewImage(this.generateItemImageAndReturn());
		this.update();
	}
	
	@Override
	public Iterator<Item> iterator() {
		return new Iterator<Item>() {
			
			private int page = 1;
			private int size = 1;
			private boolean hasNext = true;
			
			@Override
			public Item next() {
				Session session = HibernateUtil.getSession();
				
				Criteria cr = session.createCriteria(Item.class);
				cr.setFirstResult((page - 1) * size);
				cr.setMaxResults(size);
				
				List<Item> items = cr.list();
				
				
				HibernateUtil.closeSession(session);
				
				if (items.size() > 0) {
					page ++;
					return items.get(0);
				} else {
					hasNext = false;
					return null;
				}
				
			}
			
			@Override
			public boolean hasNext() {
				return hasNext;
			}
		};
	}
	/**
	 * 返回oneItem page 的url地址
	 * @return
	 */
	public String getOneItemPageUrl() {
		return UrlRoute.ONEJOKE.getUrl() + "?id=" + this.id;
	}
	/**
	 * return UrlRoute.ONEJOKE.getUrl() + "?id=" + id;
	 * @param id
	 * @return
	 */
	public static String getOneItemPageUrl(int id) {
		return UrlRoute.ONEJOKE.getUrl() + "?id=" + id;
	}
	/**
	 * return UrlRoute.ONEJOKE_V2.getUrl() + "/" + id;
	 * @param id
	 * @return
	 */
	public static String getOneItemPageUrlV2(int id) {
		return UrlRoute.ONEJOKE_V2.getUrl() + "/" + id;
	}
	
	/**
	 * return UrlRoute.ONEJOKE_V2.getUrl() + "/" + id;
	 * @param id
	 * @return
	 */
	public String getOneItemPageUrlV2() {
		return UrlRoute.ONEJOKE_V2.getUrl() + "/" + this.id;
	}
	
	/**
	 * 获取一个还没有放入page表的item(未放入page表的item的page字段值为0)
	 * @return
	 */
	public static Item getOneItemWhichIsNotInPage() {
		
		System.out.println("正在获取一个还没有放入page表的item...");
		
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Item.class);
		cr.add(Restrictions.eq("page", 0));
		cr.add(Restrictions.gt("likes", 500));
		cr.add(Restrictions.ne("status", JokeStatus.DELETE.getId()));
		cr.setMaxResults(200);
		
		List<Item> items = cr.list();
		Random rd = new Random();
		int rand = rd.nextInt(items.size());
		Item item = items.get(rand);
		
		HibernateUtil.closeSession(session);
		
		System.out.println("已获取id=" + item.getId() + ";title=" + item.getTitle());
		return item;
	}
	
	/**
	 * 获取 itemsId中所有id的item的集合
	 * @param itemsId 支持String 与Integer俩种形式
	 * @return
	 */
	public static List<Item> get(List<Integer> itemsId) {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Item.class);
		
		cr.add(Restrictions.in("id", itemsId));
		List<Item> items = cr.list();
		HibernateUtil.closeSession(session);
		return items;
		
	}
	
	/**
	 * 获取 itemsId中所有id的item的集合
	 * @param itemsId 支持String 与Integer俩种形式
	 * @return
	 */
	public static List<Item> getV2(List<String> itemsId) {
		List<Integer> list = new ArrayList<Integer>();
		
		for (String s : itemsId) {
			list.add(Integer.parseInt(s));
		}
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Item.class);
		
		cr.add(Restrictions.in("id", list));
		List<Item> items = cr.list();
		HibernateUtil.closeSession(session);
		return items;
		
	}
	
	
	@Deprecated
	@Override
	public String toJSONString() {
		JSONObject jo = new JSONObject();
			
		jo.put("id", this.getId());
		jo.put("url", this.getUrl());
		jo.put("title", this.getTitle());
		jo.put("summary", this.getSummary());
		jo.put("content", this.getContent());
		jo.put("stamps", this.getStamps());
		jo.put("likes", this.getLikes());
		jo.put("dislikes", this.getDislikes());
		jo.put("hasGetImage", this.isHasGetImage());
		jo.put("itype", this.getItype());
		jo.put("status", this.getStatus());
		jo.put("username", this.getUsername());
		jo.put("userPersonalPageUrl", this.getUserPersonalPageUrl());
		jo.put("backgroundInformation", this.getBackgroundInformation());
		jo.put("dateEntered", this.getDateEntered());
		jo.put("rulesTagId", this.getRulesTagId());
		jo.put("previewImage", this.getPreviewImage());
		jo.put("page", this.getPage());
		
		return jo.toString();
	}
	
	/**
	 * 普通 lazy, 区别于强制lazy
	 * @return
	 */
	public String generateLazyImageContentAndReturn() {
		Document doc = Jsoup.parse(this.getContent());
		
		Elements imgs = doc.select("img");
		
		for (Element ele : imgs) {
			if (!ele.hasClass("aj-lazy")) {
				ele.addClass("aj-lazy");
				ele.attr("data-lazy", ele.attr("src"));
				ele.removeAttr("src");
			}
			if (ele.attr("width").equals("") && ele.attr("height").equals("")) {
				ele.attr("width", "200");
				ele.attr("height", "200");
			}
			ele.attr("src", UrlRoute.DOT_PIC.getUrl());
		}
		
		return doc.body().html();
	}
	
	/**
	 * 强制lazy, 因为正常的lazy会在img有 某个class值时不处理<br>
	 * @return
	 */
	public String generateLazyImageContentAndReturnByForce() {
		Document doc = Jsoup.parse(this.getContent());
		
		Elements imgs = doc.select("img");
		
		for (Element ele : imgs) {
			if (!ele.hasClass("aj-lazy")) {
				ele.addClass("aj-lazy");
			}
			
			if (!ele.attr("src").equals(UrlRoute.DOT_PIC.getUrl())) {
				ele.attr("data-lazy", ele.attr("src"));
				ele.removeAttr("src");
			}
			
			if (ele.attr("width").equals("") && ele.attr("height").equals("")) {
				ele.attr("width", "200");
				ele.attr("height", "200");
			}
			ele.attr("src", UrlRoute.DOT_PIC.getUrl());
		}
		
		return doc.body().html();
	}
	/**
	 * 将item的content中的图片设置成延时加载的图片<br>
	 * And udpate item
	 */
	public void lazyImage() {
		
		this.setContent(this.generateLazyImageContentAndReturn());
		this.update();
		
	}
	
	/**
	 * 把该item从对应的page 删除, 替换另一个随机的item. <br>
	 * 如果不想随机替代, 请添加参数 id
	 */
	public void removeFromPage() {
		Item item = Item.getOneItemWhichIsNotInPage();
		
		this.removeFromPage(item);
	}
	
	public void removeFromPage(int replaceid) {
		Item item = new Item();
		item.load(replaceid);
		
		if (item != null) {
			this.removeFromPage(item);
		}
	}
	/**
	 * 是否属于某个页面
	 * @return
	 */
	public boolean isItemInPage() {
		return this.getPage() > 0;
	}
	
	private void removeFromPage(Item item) {
		Page page = Page.getByPage(this.getPage());
		
		List<Integer> itemsid = page.get$items();
		
		for (int i = 0; i < itemsid.size(); i++) {
			if (itemsid.get(i) == this.getId()) {
				itemsid.set(i, item.getId());
			}
		}
		
		page.set$items(itemsid);
		page.update(); // 更新 page
		
		
		item.betterThanBetter();
		if (item.isItemInPage()) {
			item.removeFromPage();
		}
		item.setPage(this.getPage());
		item.update(); // 更新 要替换的item
		
		
		this.setPage(0);
		this.setStatus(JokeStatus.DELETE.getId());
		this.update(); // 更新 被替换的item
		
		System.out.println("已将 " + this.getId() + " 替换成  " + item.getId());
		
	}
	
	
	/**
	 * 生成item的jokeType 但是不更新, 而是返回
	 * @return 不返回null, 找不到时返回 未知类型
	 */
	public JokeType generateTypeAndReturn() {
		String[] stamps = this.get$stampsArr();
		
		for (String stamp : stamps) {
		
			JokeType jokeType = JokeType.guessType(stamp.trim());
			
			if (jokeType != null) {
				return jokeType;
			}
		}
		
		for (JokeType type : JokeType.getAllJokeTypes()) {
			String[] stampArr = type.getInfo().split(",");
			
			for (String s : stampArr) {
				if (this.getContent().contains(s)) {
					return type;
				}
			}
		}
		return JokeType.UNKNOWN;
	}
	/**
	 * generate item の jokeType
	 */
	public void generateType() {
		String[] stamps = this.get$stampsArr();
		
		for (String stamp : stamps) {
		
			JokeType jokeType = JokeType.guessType(stamp.trim());
			
			if (jokeType != null) {
				this.setItype(jokeType.getId());
				this.update();
				System.out.println("Generate itype ok" + this.getTitle() + " type" + jokeType.getRealName());
				return;
			}
		}
		
		for (JokeType type : JokeType.getAllJokeTypes()) {
			String[] stampArr = type.getInfo().split(",");
			
			for (String s : stampArr) {
				if (this.getContent().contains(s)) {
					this.setItype(type.getId());
					this.update();
					System.out.println("Generate itype ok" + this.getTitle() + " type" + type.getRealName());
					return;
				}
			}
		}
		
		System.out.println("Generate itype fail" + this.getTitle());
	}
	
	public boolean hasBackgroundInformation() {
		return this.backgroundInformation != null && !this.backgroundInformation.trim().equals("");
	}
	



	/**
	 * 注意图片源来自 localhost:8888, 服务端不要运行该程序<br>
	 * 并设置 是否上传至oss 字段值为true, 同时update实体
	 */
	public void uploadImagesToOss() {
		Document doc = Jsoup.parse(this.getContent());
		
		Elements imgs = doc.select("img");
		
		for(Element ele : imgs) {
			String lazySrc = ele.attr("data-lazy");
			
			lazySrc = Item.getRightRelativeUrlOfImage(lazySrc);
			
			if (!lazySrc.equals("")) {
				String absUrl = "http://localhost:8888/" + lazySrc;
				
				try {
					URL url = new URL(absUrl);
					String key = lazySrc;
					
					OssUtil.uploadToNigeerhuo(key, url.openStream());
					
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
		}
		this.setHasImageUploadedToOss(true);
		this.update();
	}

	/**
	 * 有的图片相对路径是  images 开头, 有的是web开头, 也有 /images开头 等等<br>
	 * 现在把它们都转换成  images/web/.... 的形式
	 * @param lazySrc
	 * @return
	 */
	private static String getRightRelativeUrlOfImage(String src) {
		if (src.startsWith("images")) {
			return src;
		} else if (src.startsWith("/images")) {
			return src.replaceAll("^/", "");
		} else if (src.startsWith("/web")) {
			return "images" + src; 
		} else {
			return "images/" + src;
		}
	}

	/**
	 * 不要找了, 如果你对一条item不满意, 就调用这个方法吧.
	 */
	public void betterThanBetter() {
		System.out.println("Now is processing item.betterThanBetter...");
		
		System.out.println("set summary..");
		// 重新生成摘要
		this.setSummary(this.generateSummaryAndReturn());
		
		System.out.println("set itype..");
		// 重新计算类型
		this.setItype(this.generateTypeAndReturn().getId());
		
		System.out.println("reload images..");
		// 重新获取图片, 如果木有获取图片的话.
		this.setContent(this.grabImagesFromContentAndSaveToOssThenReturnContent(null));
		
		System.out.println("lazy img..");
		// lazy img for content (强制lazy)
		this.setContent(this.generateLazyImageContentAndReturnByForce());
		this.setStatusForTest(JokeStatus.HAS_GRAB_IMAGES.getId());
		
		// this.setContent(this.generateLazyImageContentAndReturn());
		
		System.out.println("remove illegal tags..");
		// move some illegal tags
		this.setContent(this.generateContentWithoutIlleagalHTMLTags());
		
		System.out.println("generate item shortcut..");
		// 生成item缩略图
		this.setPreviewImage(this.generateItemImageAndReturn());
		
		this.setStatusForTest(JokeStatus.BETTER_THAN_BETTER.getId());
		this.update();
		System.out.println("item better than better over!");
	}


	/**
	 * 删除非法的 html 标签
	 * @return
	 */
	public String generateContentWithoutIlleagalHTMLTags() {
		Document doc = Jsoup.parse(this.getContent());
		String[] illegalTags = {
			"noscript", "script", "object" 
		};
		
		for (String tag : illegalTags) {
			doc.select(tag).remove();
		}
		
		return doc.body().html();
	}

	/**
	 * 对于ueditor新添加的item, 内容中的图片修改src
	 */
	public String changeUeditorUploadContentImagesSrcAndReturnContent() {
		Document doc = Jsoup.parse(this.getContent());
		
		Elements imgs = doc.select("img");
		
		for (Element img : imgs) {
			String src = img.attr("src");
			if (src.startsWith("/ueditor/jsp/upload")) {
				src = UrlRoute.OSS_PUBLIC + "images" + src;
			}
			img.attr("src", src);
		}
		return doc.body().html();
	}
	
	public static void main(String[] args) {
		
		
	}


	/**
	 * 判断一个item是否合理
	 * @return true (如果有title 与 content)
	 */
	public boolean isLegalItem() {
		
		if (this.getTitle().trim().equals("") || this.getContent().trim().equals("")) {
			return false;
		}
		
		return true;
	}

	/**
	 * 给item添加状态, 支持多状态  <br>
	 * 每个状态以 b开头, e结尾 . 为了防止  sql查询时出现   2,3,12  contains 1 出现true的情况
	 * @param itemStatus
	 */
	public void addItemStatus(ItemStatus itemStatus) {
		if (this.statusSplitByComma == null || this.statusSplitByComma.equals("")) {
			this.setStatusSplitByComma(itemStatus.wrapWithBE());
		} else if (!this.isInThisItemStatus(itemStatus)){
			String[] arr = this.statusSplitByComma.split(",");
			List<String> list = Arrays.asList(arr);
			list.add(itemStatus.wrapWithBE());
			this.setStatusSplitByComma(Tools.join(list, ","));
		}
	}
	
	/**
	 * item是否处于某种指定状态
	 * @param itemStatus
	 * @return
	 */
	public boolean isInThisItemStatus(ItemStatus itemStatus) {
		if (this.statusSplitByComma == null) {
			return false;
		}
		String[] arr = this.statusSplitByComma.split(",");
		for (String s : arr) {
			if (s.equals(itemStatus.wrapWithBE())) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 根据jokeType 获取相应的还没存储在typePage 的item
	 * @param jokeType	items的类型
	 * @param limit 返回多少个item
	 * @return
	 */
	public static List<Item> getItemsOfSpecifiedJokeTypeAndIsNotInTypePage(
			JokeType jokeType, int limit) {
		Session session = HibernateUtil.getSession();
		Criteria criteria = session.createCriteria(Item.class);
		
		criteria.add(Restrictions.not(Restrictions.like("statusSplitByComma", "%" + ItemStatus.IS_SAVE_TO_TYPE_PAGE.wrapWithBE() + "%")));
		criteria.setMaxResults(limit);
		criteria.add(Restrictions.eq("itype", jokeType.getId()));
		
		List<Item> items = criteria.list();
		
		
		HibernateUtil.closeSession(session);
		return items;
	}

}



