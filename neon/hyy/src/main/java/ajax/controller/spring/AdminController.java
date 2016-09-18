package ajax.controller.spring;


import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ajax.model.AjaxResponse;
import ajax.model.CRUDPage;
import ajax.model.FormComponents;
import ajax.model.JokeType;
import ajax.model.Lock;
import ajax.model.PageChoice;
import ajax.model.UrlRoute;
import ajax.model.entity.Entity;
import ajax.model.entity.Fragment;
import ajax.model.entity.GameTeamFun;
import ajax.model.entity.Item;
import ajax.model.entity.ItemsRoll;
import ajax.model.entity.Page;
import ajax.model.entity.TypePage;
import ajax.model.exception.AJRunTimeException;
import ajax.model.pagesSeparate.ITaobaoItemsPagesSeparate;
import ajax.model.pagesSeparate.TbkItemsPagesSeparate;
import ajax.model.safe.User;
import ajax.model.taobao.ITaobao;
import ajax.model.taobao.TbkItem;
import ajax.tools.Baidu;
import ajax.tools.Tools;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;



@Controller
@RequestMapping(value="/admin")
public class AdminController {
	
	
	@RequestMapping(value="/gameTeamGenerate")
	public String gameTeamGenerate(HttpServletRequest request, HttpServletResponse response) {
		
		GameTeamFun fun = new  GameTeamFun();
		String json = fun.getGenerateJson();
		
		request.setAttribute("model", json);
		return "/views/huodong/gameTeam";
	}
	
	@RequestMapping(value="/itaobao_item_submit")
	@ResponseBody
	public AjaxResponse<String> itaobao_item_submit(HttpServletRequest request, HttpServletResponse response) {
		User user = User.getLoginUser(request);
		
		String entity = request.getParameter("entity");
		Gson gson = new Gson();
		ITaobao iTaobaoFromClientInput = gson.fromJson(entity, ITaobao.class);
		AjaxResponse<String> ajaxResponse = new AjaxResponse<String>();
		
		try {
			if (iTaobaoFromClientInput.changeToItemAndSave(user)) {
				
				ajaxResponse.setIsok(true);
				ajaxResponse.setData("提交成功!");
				
			} else {
				ajaxResponse.setIsok(false);
				ajaxResponse.setData("提交失败");
			}
		} catch(AJRunTimeException ex) {
			
			ajaxResponse.setIsok(false);
			ajaxResponse.setData(ex.getMessage());
			
		}
		
		//request.setAttribute("model", ajaxResponse.toJson());
		return ajaxResponse;
		
	}
	
	@RequestMapping(value="/itaobao/changeToItem")
	public String itaobaoChangeToItem(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Long id = Long.parseLong(request.getParameter("id"));
		if (!Lock.lock(id + "")) {
			request.setAttribute("model", "就在刚刚已经有一个小伙伴锁定了该商品, 请换一个呗~~<br>如果是你不小心刷新了网页,可以在个人中心, 我编辑的商品中找到该条目.");
			
			return "/views/error/error";
		}
		
		ITaobao iTaobao = new ITaobao();
		iTaobao.load(id);
		
		if (iTaobao.isHasChangeToItem()) {
			request.setAttribute("model", "这个商品已经被写文章了, 请换一个呗~~");
			
			return "/views/error/error";
		}
		
		FormComponents formComponents;
		
		formComponents = iTaobao.getFormComponents(ITaobao.class);
			
		Gson gson = new Gson();
		request.setAttribute("formComponents", formComponents);
		request.setAttribute("formComponentsJson", gson.toJson(formComponents));
		return "/views/tools/formComponents";
		
	}
	@RequestMapping(value="/itaobaoitems")
	public String itaobaoitems(HttpServletRequest request, HttpServletResponse response) {
		
		//List<TbkItem> tbkItems = TbkItem.get(1, 20, TbkItem.class);
		
		ITaobaoItemsPagesSeparate iTaobaoItemsPagesSeparate = new ITaobaoItemsPagesSeparate();
		List<ITaobao> list = iTaobaoItemsPagesSeparate.getItemsByPageAndType(1);
		
		PageChoice pageChoice = new PageChoice(1, UrlRoute.ITAOBAO_ITEMS_PAGE_URL_TEMPLATE.getUrl());
		request.setAttribute("model", list);
		request.setAttribute("pageChoice", pageChoice);
		return "views/goods/itaobao";
	}
	
	@RequestMapping(value="/itaobao/{page}")
	public String itaobaoPage(@PathVariable("page") int page, HttpServletRequest request, HttpServletResponse response) {
		
		
		ITaobaoItemsPagesSeparate iTaobaoItemsPagesSeparate = new ITaobaoItemsPagesSeparate();
		List<ITaobao> list = iTaobaoItemsPagesSeparate.getItemsByPageAndType(page);
	
		PageChoice pageChoice = new PageChoice(page, UrlRoute.ITAOBAO_ITEMS_PAGE_URL_TEMPLATE.getUrl());
		request.setAttribute("model", list);
		request.setAttribute("pageChoice", pageChoice);
		return "views/goods/itaobao";
	}
	
	@RequestMapping(value="/tbkitems")
	public String tbkItems(HttpServletRequest request, HttpServletResponse response) {
		
		//List<TbkItem> tbkItems = TbkItem.get(1, 20, TbkItem.class);
		
		TbkItemsPagesSeparate tbkItemsPagesSeparate = new TbkItemsPagesSeparate();
		List<TbkItem> tbkItems = tbkItemsPagesSeparate.getItemsByPageAndType(1);
		
	
		PageChoice pageChoice = new PageChoice(1, UrlRoute.TBK_ITEMS_PAGE_URL_TEMPLATE.getUrl());
		request.setAttribute("model", tbkItems);
		request.setAttribute("pageChoice", pageChoice);
		return "views/goods/tbkitems";
	}
	
	@RequestMapping(value="/tbkitems/page/{page}")
	public String tbkItemsPage(@PathVariable("page") int page, HttpServletRequest request, HttpServletResponse response) {
		
		
		//List<TbkItem> tbkItems = TbkItem.get(1, 20, TbkItem.class);
		
		TbkItemsPagesSeparate tbkItemsPagesSeparate = new TbkItemsPagesSeparate();
		List<TbkItem> tbkItems = tbkItemsPagesSeparate.getItemsByPageAndType(page);
		PageChoice pageChoice = new PageChoice(page, UrlRoute.TBK_ITEMS_PAGE_URL_TEMPLATE.getUrl());
		request.setAttribute("model", tbkItems);
		request.setAttribute("pageChoice", pageChoice);
		return "views/goods/tbkitems";
	}
	

	
	@RequestMapping("/tbkitems/changeToItem")
	public String tbkItemsToNormalItem(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Long id = Long.parseLong(request.getParameter("id"));
		TbkItem tbkItem = new TbkItem();
		
		tbkItem.load(id);
		
		FormComponents formComponents = tbkItem.getFormComponents(TbkItem.class);
		Gson gson = new Gson();
		request.setAttribute("formComponents", formComponents);
		request.setAttribute("formComponentsJson", gson.toJson(formComponents));
		return "/views/tools/formComponents";
	}
	
	@RequestMapping(value="/meituUpload")
	@ResponseBody
	public String meituUpload(HttpServletRequest request, HttpServletResponse response) {
		
		boolean isok = Tools.meituUploadImageToOss(request, response);
		
		if (isok) {
			return "上传成功";
		} else {
			return "上传失败";
		}
		
	}
	
	@RequestMapping(value="/meitu")
	public String meitu(HttpServletRequest request, HttpServletResponse response) {
		
		return "views/tools/meitu";
	}
	
	@RequestMapping(value="/typePages/generate")
	@ResponseBody
	public AjaxResponse<Map<JokeType, Boolean>> typePagesGenerate(HttpServletRequest request, HttpServletResponse response) {
		
		int loop = Tools.parseInt(request.getParameter("loop"), 1);
		List<JokeType> jokeTypes = JokeType.getLegalJokeTypes();
		Map<JokeType, Boolean> result = new HashMap<JokeType, Boolean>();
		
		while(loop-- > 0) {
			for (JokeType jokeType : jokeTypes) {
				boolean isok = TypePage.generateOnePageOf(jokeType);
				result.put(jokeType, isok);
			}
		}
		
		AjaxResponse<Map<JokeType, Boolean>> ar = new AjaxResponse<Map<JokeType,Boolean>>();
		
		ar.setIsok(true);
		ar.setData(result);
		
		return ar;
	}
	
	@RequestMapping(value="/typePages")
	public String typePage(HttpServletRequest request, HttpServletResponse response) {
		
		return "views/admin/typesPageGenerate";
	}
	
	@RequestMapping(value="/list")
	public String adminList(HttpServletRequest request, HttpServletResponse response) {
		
		return "views/admin/list";
		
	}
	
	
	@RequestMapping(value="/ads")
	public String ads(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		return "ads";
		
		
	}
	
	@RequestMapping(value="/ads/{action}")
	public void adsAction(@PathVariable("action") String action, HttpServletRequest request, HttpServletResponse response) {
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		
		String model = request.getParameter("model");
		Gson gson = new Gson();
		ItemsRoll itemsRoll = gson.fromJson(model, ItemsRoll.class);
		
		if (action.equals("update")) {
			itemsRoll.update();
		} else if (action.equals("delete")) {
			itemsRoll.delete();
		} else if (action.equals("save")) {
			itemsRoll.save();
		}
		
		ar.setIsok(true);
		ar.setData("");

		ar.flush(response);
		
	}
	
	@RequestMapping(value="/upload")
	public String uploadItem(HttpServletRequest request, HttpServletResponse response) {

		int id = Tools.parseInt(request.getParameter("id"), -1);
		String action = request.getParameter("action");
		JokeType[] jokeTypes = JokeType.getAllJokeTypes();
		
		Item item = new Item();
		
		if (id != -1) {
			item.load(id);
		} else {
			item.setContent("");
			item.setBackgroundInformation("");
			item.setPreviewImage("");
			item.setStamps("");
			item.setSummary("");
			item.setTitle("");
			item.setUrl("");
			item.setUsername("");
			item.setUserPersonalPageUrl("");
			item.setStatusSplitByComma("");
		}
		
		request.setAttribute("item", item);
		request.setAttribute("jokeTypes", jokeTypes);
		
		return "/views/admin/upload";
	}
	
	/**
	 * item 保存或者update
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/upload/submit")
	@ResponseBody
	public AjaxResponse<String> uploadSubmit(HttpServletRequest request, HttpServletResponse response) {
		
		
		String action = request.getParameter("action");
		
		String itemJson = request.getParameter("item");
		Gson gson = new Gson();
		Item item = gson.fromJson(itemJson, Item.class);
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		if (item.getId() > 0) {
			item.setSummary(item.generateSummaryAndReturn());
			item.update();
		} else {
			item.setUrl(null);
			if (item.getStamps().trim().equals("")) {
				item.setStamps(null);
			}
			item.setContent(item.changeUeditorUploadContentImagesSrcAndReturnContent());
			item.setSummary(item.generateSummaryAndReturn());
			item.save();
		}
		
		ar.setIsok(true);
		ar.setData(String.format("<a href='%s' target='_blank'>%s</a>", item.getOneItemPageUrlV2(), item.getOneItemPageUrlV2()));
		
		return ar;
	}
	
	/**
	 * Item 删除
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/upload/remove")
	@ResponseBody
	public AjaxResponse<String> uploadRemove(HttpServletRequest request, HttpServletResponse response) {
		
		String action = request.getParameter("action");
		AjaxResponse<String> ar = new AjaxResponse<String>();
		String itemJson = request.getParameter("item");
		Gson gson = new Gson();
		Item item = gson.fromJson(itemJson, Item.class);
		
		item.delete();
		
		ar.setIsok(true);
		ar.setData("删除成功!");
		
		return ar;
	}
	
	
	
	@RequestMapping(value="/item/changepage")
	public String changePageOfItem(HttpServletRequest request, HttpServletResponse response) {
		
		return "views/admin/changepage";
		
	}
	
	@RequestMapping(value="/item/changepage/ajax")
	@ResponseBody
	public AjaxResponse<String> changePageOfItemAjax(HttpServletRequest request, HttpServletResponse response) {
		
		int id1 = Tools.parseInt(request.getParameter("id1"), -1);
		int id2 = Tools.parseInt(request.getParameter("id2"), -1);
		
		AjaxResponse<String> ar = new AjaxResponse<String>();
		if (id1 == -1) {
			ar.setIsok(false);
			ar.setData("id 解析错误");
		} else {
			
			Item item = new Item();
			item.load(id1);
			
			if (id2 == -1) {
				item.removeFromPage();
			} else {
				item.removeFromPage(id2);
			}
			ar.setIsok(true);
			ar.setData("OK");
		}
		
		return ar;
		
	}
	
	@RequestMapping(value="/homeNavThree")
	public String homeNavThree(HttpServletRequest request, HttpServletResponse response) {
		
		CRUDPage<Fragment> cp = new CRUDPage<Fragment>();
		String entityKeySet = null;
		Gson gson = new Gson();
		
		Fragment f = new Fragment();
		f.setDateEntered(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		f.setId(0);
		f.setType(0);
		f.setVal("");
		entityKeySet = gson.toJson(f);
		
		List<Fragment> list = Fragment.getFragments(Fragment.Type.HOME_PAGE_THREE_ADS);
		cp.setList(list);
		cp.setClassName(Fragment.class.getName());
		cp.setEntityKeySet(entityKeySet);
		
		request.setAttribute("model", cp);
		return "views/auto/crud";

	}
	
	@RequestMapping(value="/linksToBaidu")
	public String uploadLinksToBaidu(HttpServletRequest request, HttpServletResponse response) {
		
		return "linksToBaidu";
	}
	
	private class LinksArr{
		List<String> links = new ArrayList<String>();

		public List<String> getLinks() {
			return links;
		}

		public void setLinks(List<String> links) {
			this.links = links;
		}
	}
	
	@RequestMapping(value="/linksToBaidu/submit")
	@ResponseBody
	public AjaxResponse<String> uploadLinksToBaiduSubmit(HttpServletRequest request, HttpServletResponse response) {
		
		String data = request.getParameter("data");
		String action = request.getParameter("action");
		
		Gson gson = new Gson();
		
		
		LinksArr arr = gson.fromJson(data, LinksArr.class);
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		if (arr == null) {
			ar.setIsok(false);
			ar.setData("arr is null!");
		} else {
			List<String> links = arr.getLinks();
			
			Baidu.uploadLinkToBaidu(links);
			ar.setIsok(true);
			ar.setData("OK");
		}
		
		return ar;
	}
	@RequestMapping(value="/pageGenerator")
	public String pageGenerator(HttpServletRequest request, HttpServletResponse response) {
		
		return "views/admin/pageGenerator";
	}
	@RequestMapping(value="/pageGenerator/generate")
	@ResponseBody
	public AjaxResponse<String> pageGeneratorGenerate(HttpServletRequest request, HttpServletResponse response) {
		
		String dataParam = request.getParameter("data");
		
		
		int maxPage = Page.getNowMaxPage();
		int nextPage = maxPage + 1;
		int num = Page.$num;
		Page page = new Page();
		page.setPage(nextPage);
		
		if (dataParam != null) {
			Gson gson = new Gson();
			Type type = new TypeToken<ArrayList<Integer>>() {}.getType();
			List<Integer> itemIdList = gson.fromJson(dataParam, type);
			
			
			if (itemIdList.size() > Page.$num) {
				itemIdList = itemIdList.subList(0, Page.$num);
			}
			
			for(Integer id : itemIdList) {
				Item item = Item.getByItemById(id);
				if (!item.isItemInPage()) {
					page.addOneItem(item);
					item.setPage(nextPage);
					item.update();
					item.betterThanBetter();
				}
			}
		}	
		

		
		
		num = num - page.get$items().size();
		
		while(num > 0) {
			Item item = Item.getOneItemWhichIsNotInPage();
			page.addOneItem(item);
			
			item.setPage(nextPage);
			item.update();
			
			item.betterThanBetter();
			
			num--;
		}
		
		page.save();
		
		AjaxResponse<String> ar = new AjaxResponse<String>();
		ar.setData("OK<a href='" + UrlRoute.PAGE.getUrl() + "/" +  nextPage + "'>查看新生成的页面 第  " + nextPage +  "页</a>");
		ar.setIsok(true);
		
		return ar;
		
	}
	
	@RequestMapping(value="/crudForTable")
	@ResponseBody
	public AjaxResponse<String> crudForTable(HttpServletRequest request, HttpServletResponse response) {
		
		String data = request.getParameter("data");
		String className = request.getParameter("className");
		
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		try {
			Class<?> cls = Class.forName(className);
			
			Gson gson = new Gson();
			CRUDPage cp = gson.fromJson(data, CRUDPage.class);
			
			
			for(Object item : cp.getList()) {
				String json = gson.toJson(item);
				Entity entity = (Entity)gson.fromJson(json, cls);
				
				if (entity.isSetPrimaryKeyValue()) {
					entity.update();
				} else {
					entity.save();
				}
			}
			
			System.out.println(cp);
		} catch (ClassNotFoundException e) {
			ar.setIsok(false);
			ar.setData(e.getMessage());
		}
		
		return ar;
	}
	
}
