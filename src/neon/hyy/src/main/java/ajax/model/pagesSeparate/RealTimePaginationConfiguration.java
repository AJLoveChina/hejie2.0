package ajax.model.pagesSeparate;

import ajax.model.UniqueString;
import ajax.model.entity.Entity;

public interface RealTimePaginationConfiguration{
	
	/**
	 * 一页展示多少条数据
	 * @return
	 */
	public abstract int getPaginationPageSize();
	/**
	 * value of primary key, not name of primary key!
	 * @return
	 */
	public abstract String getPrimaryKeyValue();
	
	/**
	 * name of primary key, not value of primary key!
	 * @return
	 */
	public abstract String getPaginationPrimaryKey();
	/**
	 * 返回主键值的类型 Long 还是 integer, 由于历史问题存在许多主键是 integer的情况, 以后全部Long
	 * @return
	 */
	public abstract PK_TYPE getPaginationPrimaryKeyType();
	
	public enum PK_TYPE {
		LONG,INTEGER;
	}
}
