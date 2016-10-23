package ajax.controller.spring;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ajax.model.AjaxResponse;
import ajax.model.taobao.model.GoodsType;

@Controller
@RequestMapping(value="/t")
public class TController {

	@RequestMapping(value="/list")
	public String tList() {
		return "/views/tbk/list";
	}
	
	@RequestMapping(value="/goodsTypeList")
	@ResponseBody
	public AjaxResponse<List<GoodsType>> getGoodsTypeList() {
		AjaxResponse<List<GoodsType>> ajaxResponse = new AjaxResponse<>();
		ajaxResponse.setIsok(true);
		ajaxResponse.setData(GoodsType.getShowGoodsType());
		
		return ajaxResponse;
	}
	
}
