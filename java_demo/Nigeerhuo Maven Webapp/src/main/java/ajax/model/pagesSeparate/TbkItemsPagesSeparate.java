package ajax.model.pagesSeparate;

import java.util.List;

import ajax.model.UniqueString;
import ajax.model.taobao.TbkItem;

public class TbkItemsPagesSeparate implements PagesSeparate<TbkItem>{

	@Override
	public UniqueString getPagesTypeKey() {
		return UniqueString.TBK_ITEM;
	}

	@Override
	public UniqueString getMaxPageKey() {
		return UniqueString.TBK_ITEM_MAX_PAGE_KEY;
	}

	@Override
	public List<TbkItem> getNextPageList() {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
