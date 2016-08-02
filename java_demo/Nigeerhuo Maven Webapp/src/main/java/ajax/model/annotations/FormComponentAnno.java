package ajax.model.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import ajax.model.FormComponents;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface FormComponentAnno {
	/**
	 * 组件提示,用户看到的名称
	 * @return
	 */
	public String desc() default "";
	/**
	 * form组件类型
	 * @return
	 */
	public FormComponents.ComponentType componentType() default FormComponents.ComponentType.TEXT;
	/**
	 * 是否在网页上对用户可见
	 * @return
	 */
	public boolean isHidden() default false;
	/**
	 * 是否不允许用户编辑
	 * @return
	 */
	public boolean isDisabled() default false;
	/**
	 * 是否舍弃该字段
	 * @return
	 */
	public boolean isDiscard() default false;
}
