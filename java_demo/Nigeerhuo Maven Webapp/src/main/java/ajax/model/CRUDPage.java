package ajax.model;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.InstanceCreator;

/**
 * 用于快速生成一个数据表的crud页面
 * @author ajax
 *
 */
public class CRUDPage<T> {
	private String className;
	private List<T> list;
	
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

}

