package ajax.model.pagesSeparate;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.ItemStatus;
import ajax.model.UniqueString;
import ajax.model.taobao.TbkItem;
import ajax.tools.HibernateUtil;

public class TbkItemsPagesSeparate extends BasePagesSeparateProcessor<TbkItem> implements PagesSeparate<TbkItem>{

	@Override
	public UniqueString getPagesTypeKey() {
		return UniqueString.TBK_ITEM;
	}

	@Override
	public UniqueString getMaxPageKey() {
		return UniqueString.TBK_ITEM_MAX_PAGE_KEY;
	}

	@Override
	public ItemStatus getItemStatusWhichWillBeSetAfterPutInPage() {
		return ItemStatus.TBKITEM_IN_PAGE;
	}

	@Override
	public String getPrimaryKeyValue(TbkItem t) {
		return t.getNum_iid() + "";
	}
	
	@Override
	public List<TbkItem> getNextPageList() {
		Session session = HibernateUtil.getSession();
		
		Criteria criteria = session.createCriteria(TbkItem.class);
		
		criteria.setMaxResults(20);
		criteria.setFirstResult(0);
		criteria.add(Restrictions.not(Restrictions.like("statusSplitByComma", "%" + this.getItemStatusWhichWillBeSetAfterPutInPage().wrapWithBE() + "%")));
		
		List<TbkItem> tbkItems = criteria.list();
		return tbkItems;
	}

	@Override
	public int getPageSize() {
		return 20;
	}

	@Override
	public String getPrimaryKey() {
		return "num_iid";
	}

	@Override
	public TbkItem getGenericityType() {
		return new TbkItem();
	}
	
	
	public static void main(String[] args) {
		TbkItemsPagesSeparate tbkItemsPagesSeparate = new TbkItemsPagesSeparate();
		
		while(tbkItemsPagesSeparate.generateNewPage(tbkItemsPagesSeparate)) {
			System.out.println("Page generate OK!");
		}
		
//		List<TbkItem> list = tbkItemsPagesSeparate.getItemsByPageAndType(1, tbkItemsPagesSeparate);
//		System.out.println(list);
	}
	
	
}
