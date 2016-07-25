package ajax.model.pagesSeparate;

import java.util.List;

import ajax.model.ItemStatus;
import ajax.model.UniqueString;
import ajax.model.entity.Entity;

public interface PagesSeparate<T extends Entity<T>> {
	public UniqueString getPagesTypeKey();
	public UniqueString getMaxPageKey();
	
	public List<T> getNextPageList();
	
	/**
	 * 添加到该类型页面后的状态
	 * @return
	 */
	public ItemStatus getItemStatusWhichWillBeSetAfterPutInPage();
	
	/**
	 * 获取主键的值
	 * @return
	 */
	public String getPrimaryKeyValue(T t);
	
	public T getGenericityType();
	/**
	 * 获取主键字段名称
	 * @return
	 */
	public String getPrimaryKey();
	/**
	 * 获取页面大小,默认20
	 * @return
	 */
	public int getPageSize();
	
	
}
