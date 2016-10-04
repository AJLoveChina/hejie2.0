package ajax.model.pagesSeparate;

import ajax.model.UniqueString;
import ajax.model.entity.Entity;

public abstract class RealTimePaginationConfiguration<T> extends Entity<T>{
	
	public abstract UniqueString getMaxPageKey();
	public abstract int getPaginationPageSize();
	/**
	 * value of primary key, not name of primary key!
	 * @return
	 */
	public abstract String getPrimaryKeyValue();
	
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
