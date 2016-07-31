package ajax.model;

import java.util.List;

/**
 * 用于快速生成一个数据表的crud页面
 * @author ajax
 *
 */
public class CRUDPage<T> {
	private String className;
	private List<T> list;
	private String entityKeySet;
	
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	public String getEntityKeySet() {
		return entityKeySet;
	}
	public void setEntityKeySet(String entityKeySet) {
		this.entityKeySet = entityKeySet;
	}
	

}

