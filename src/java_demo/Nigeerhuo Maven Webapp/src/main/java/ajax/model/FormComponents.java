package ajax.model;

import java.util.ArrayList;
import java.util.List;

/**
 * 表单生成模型,设置表单的组件及其类型
 * @author ajax
 *
 */
public class FormComponents {
	public class Component {
		String name = "";
		String value = "";
		String desc = "";
		boolean isHidden = false;
		boolean isDisabled= false;
		boolean isDiscard = false;
		ComponentType type = ComponentType.TEXT;
		
		public Component(String name, String value, String desc,
				ComponentType type) {
			super();
			this.name = name;
			this.value = value;
			this.desc = desc;
			this.type = type;
		}

		public Component(String name, String value, String desc,
				boolean isHidden, boolean isDisabled, boolean isDiscard,
				ComponentType type) {
			super();
			this.name = name;
			this.value = value;
			this.desc = desc;
			this.isHidden = isHidden;
			this.isDisabled = isDisabled;
			this.isDiscard = isDiscard;
			this.type = type;
		}


	}
	public static enum ComponentType {
		TEXT,TEXTAREA,DATE,
		/**
		 * 百度ueditor
		 */
		UEDITOR,
		/**
		 * 链接,不能修改只能跳转
		 */
		LINK, IMAGE;
	}
	
	private String urlSubmit = "";
	private String urlRemove = "";
	private List<Component> components = new ArrayList<Component>();
	public String getUrlSubmit() {
		return urlSubmit;
	}
	public void setUrlSubmit(String urlSubmit) {
		this.urlSubmit = urlSubmit;
	}

	public String getUrlRemove() {
		return urlRemove;
	}
	public void setUrlRemove(String urlRemove) {
		this.urlRemove = urlRemove;
	}
	public List<Component> getComponents() {
		return components;
	}
	public void setComponents(List<Component> components) {
		this.components = components;
	}
	public FormComponents(String urlSubmit, String urlRemove) {
		super();
		this.urlSubmit = urlSubmit;
		this.urlRemove = urlRemove;
	}
	
	

}
