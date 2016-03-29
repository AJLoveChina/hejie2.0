package ajax.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import ajax.tools.Tools;


/**
 * Item 表查询类
 * 如果未配置page键值, 则默认是1
 * @author ajax
 *
 */
public class QueryParams {
	
	class Param {
		String key;
		String value;
		public Param(String key, String value) {
			super();
			this.key = key;
			this.value = value;
		}
	}
	
	private List<Param> params = new ArrayList<QueryParams.Param>();
	public List<Param> getParams() {
		return params;
	}

	public void setParams(List<Param> params) {
		this.params = params;
	}

	private static String[] keys = {
		"page", "size", "type"	
	};
	
	public QueryParams(HttpServletRequest request) {
		List<Param> list = new ArrayList<QueryParams.Param>();
		
		for (String key : keys) {
			String value = request.getParameter(key);
			if (value != null) {
				list.add(new Param(key, value));
			}
		}
		// 有几个特殊字段未配置的话, 手动配置
		if (request.getParameter("page") == null) {
			list.add(new Param("page", "1"));
		}
		this.setParams(list);
	}
	
	private QueryParams() {
		
	}
	/**
	 * 当前的查询字段是否含有key, 不同于可用的键值是否包含key
	 * @param key
	 * @return
	 */
	public boolean isSet(String key) {
		for (Param p : this.params) {
			if (p.key == key) {
				return true;
			}
		}
		return false;
	}
	
	public String getVal(String key) {
		for (Param p : this.params) {
			if (p.key == key) {
				return p.value;
			}
		}
		return null;
	}
	
	/**
	 * page 是一个特殊的字段, 所以设置了单独的方法
	 * 如果无法解析page字段的值, 返回 1
	 * @return
	 */
	public int getPage() {
		return Tools.parseInt(this.getVal("page"), 1);
	}
	
	private void add(Param p) {
		this.params.add(p);
	}
	
	public void set(String key, String value) {
		if (this.isSet(key)) {
			for (Param p : params) {
				if (p.key == key) {
					p.value = value;
					break;
				}
			}
		} else {
			this.add(new Param(key, value));
		}
	}
	
	public QueryParams clone() {
		QueryParams qp = new QueryParams();
		for (Param p : this.params) {
			qp.add(new Param(p.key, p.value));
		}
		return qp;
	}
	
	public String getNextPageParamsString() {
		QueryParams qp = this.clone();
		qp.set("page", Tools.parseInt(this.getVal("page")) + 1 + "");
		return qp.toString();
	}
	
	/**
	 * if current page == 1, return first page params string
	 * @return
	 */
	public String getPrevPageParamsString() {
		if (Tools.parseInt(this.getVal("page")) == 1) {
			return this.toString();
		} else {
			QueryParams qp = this.clone();
			qp.set("page", Tools.parseInt(this.getVal("page")) - 1 + "");
			return qp.toString();
		}
	}
	
	
	
	
	@Override 
	public String toString() {
		StringBuilder sb = new StringBuilder();
		boolean first = true;
		for (Param p : this.getParams()) {
			if (first) {
				sb.append(p.key + "=" + p.value);
			} else {
				sb.append("&" + p.key + "=" + p.value);
			}
		}
		return sb.toString();
	}

	
}
