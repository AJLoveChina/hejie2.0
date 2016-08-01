package ajax.model.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import ajax.model.FormComponents;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface FormComponentAnno {
	public String desc() default "";
	public FormComponents.ComponentType componentType() default FormComponents.ComponentType.TEXT;
}
