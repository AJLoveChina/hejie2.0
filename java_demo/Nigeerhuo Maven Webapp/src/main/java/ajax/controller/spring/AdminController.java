package ajax.controller.spring;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.UrlRoute;
import ajax.model.entity.Item;
import ajax.model.entity.ItemsRoll;
import ajax.model.entity.Page;
import ajax.model.safe.SignStatus;
import ajax.model.safe.User;
import ajax.tools.Baidu;
import ajax.tools.Tools;



@Controller
@RequestMapping(value="/admin")
public class AdminController {
	@RequestMapping(value="/list")
	public String adminList(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
		return "adminList";
	}
	
	
	@RequestMapping(value="/ads")
	public String ads(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
		
		return "ads";
		
		
	}
	
	@RequestMapping(value="/ads/{action}")
	public void adsAction(@PathVariable("action") String action, HttpServletRequest request, HttpServletResponse response) {
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		
		if (User.isAdmin(request, response)) {
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
			
			
		} else {
			
			ar.setIsok(false);
			ar.setData("木有权限");
			
		}

		ar.flush(response);
		
	}
	
	@RequestMapping(value="/upload")
	public String uploadItem(HttpServletRequest request, HttpServletResponse response) {
		int id = Tools.parseInt(request.getParameter("id"), -1);
		String action = request.getParameter("action");
		
		
		if (action != null) {
			
			AjaxResponse<String> ar = new AjaxResponse<String>();
			
			// 必须要有权限
			if(User.isAdmin(request, response)) {
				String itemJson = request.getParameter("item");
				Gson gson = new Gson();
				Item item = gson.fromJson(itemJson, Item.class);
				
				
				if (action.equals("submit")) {
					if (item.getId() > 0) {
						item.update();
					} else {
						item.setUrl(null);
						if (item.getStamps().trim().equals("")) {
							item.setStamps(null);
						}
						item.setContent(item.changeUeditorUploadContentImagesSrcAndReturnContent());
						item.save();
					}
					
					ar.setIsok(true);
					ar.setData(item.getOneItemPageUrl());
				} else if (action.equals("remove")) {
					item.delete();
					
					ar.setIsok(true);
					ar.setData("删除成功!");
				}
				
			} else {

				ar.setIsok(false);
				ar.setData("权限不足");
				
			}
			
			request.setAttribute("model", ar.toJson());
			return "Ajax";
		} else {
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
			}
			
			request.setAttribute("item", item);
			
			return "upload";
		}
	}
	@RequestMapping(value="/item/changepage")
	public String changePageOfItem(HttpServletRequest request, HttpServletResponse response) {
		
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
		return "views/admin/changepage";
		
	}
	
	@RequestMapping(value="/item/changepage/ajax")
	public String changePageOfItemAjax(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
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
		
		request.setAttribute("model", ar.toJson());
		return "Ajax";
		
	}
	
	@RequestMapping(value="/homeNavThree")
	public String homeNavThree(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
		return "views/admin/homeNavThree";

	}
	
	@RequestMapping(value="/linksToBaidu")
	public String uploadLinksToBaidu(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
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
	public String uploadLinksToBaiduSubmit(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
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
			
			for (String link : links) {
				Baidu.uploadLinkToBaidu(link);
			}
			ar.setIsok(true);
			ar.setData("OK");
		}
		
		request.setAttribute("model", ar.toJson());		
		
		return "Ajax";
	}
	@RequestMapping(value="/pageGenerator")
	public String pageGenerator(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
		return "views/admin/pageGenerator";
	}
	@RequestMapping(value="/pageGenerator/generate")
	public String pageGeneratorGenerate(HttpServletRequest request, HttpServletResponse response) {
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
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
		
		request.setAttribute("model", ar.toJson());
		
		return "Ajax";
		
	}
	


}
