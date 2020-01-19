package ajax.model.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface FormComponentUrlAnno {
	/**
	 * 表单提交地址
	 */
	public String submitUrl() default "";
	
	/**
	 * 表单删除地址
	 * @return
	 */
	public String deleteUrl() default "";
}
