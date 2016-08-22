package ajax.model.pagesSeparate;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.ItemStatus;
import ajax.model.UniqueString;
import ajax.model.taobao.ITaobao;
import ajax.tools.HibernateUtil;

public class ITaobaoItemsPagesSeparate extends BasePagesSeparateProcessor<ITaobao> {

	@Override
	public UniqueString getPagesTypeKey() {
		return UniqueString.ITAOBAO_ITEM;
	}

	@Override
	public UniqueString getMaxPageKey() {
		return UniqueString.ITAOBAO_ITEM_MAX_PAGE_KEY;
	}

	@Override
	public List<ITaobao> getNextPageList(int listSize) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria criteria = session.createCriteria(ITaobao.class);
		
		criteria.setMaxResults(listSize);
		criteria.setFirstResult(0);
		criteria.add(Restrictions.not(Restrictions.like("statusSplitByComma", "%" + this.getItemStatusWhichWillBeSetAfterPutInPage().wrapWithBE() + "%")));
		
		List<ITaobao> list = criteria.list();
		session.getTransaction().commit();
		
		return list;
	}

	@Override
	public ItemStatus getItemStatusWhichWillBeSetAfterPutInPage() {
		return ItemStatus.ITAOBAO_ITEM_IN_PAGE;
	}

	@Override
	public String getPrimaryKeyValue(ITaobao t) {
		return t.getId() + "";
	}

	@Override
	public ITaobao getGenericityType() {
		return new ITaobao();
	}

	@Override
	public String getPrimaryKey() {
		return "id";
	}

	@Override
	public int getPageSize() {
		return 20;
	}

	
	public static void main(String[] args) {
		ITaobaoItemsPagesSeparate iTaobaoItemsPagesSeparate = new ITaobaoItemsPagesSeparate();
		while (iTaobaoItemsPagesSeparate.generateNewPage()) {
			System.out.println("生成新的一页成功!");
		}
	}



}
