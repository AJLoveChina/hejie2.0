package ajax.controller.spring;

import java.lang.annotation.Annotation;

import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.google.gson.Gson;

import ajax.controller.spring.aspects.SafeAspect;
import ajax.model.annotations.EditorPointcut;

@Configuration
@EnableAspectJAutoProxy
public class SpringConfig {
	
	@Bean
	public SafeAspect safeAspect() {
		return new SafeAspect();
	}
	
	
	@Bean
	public Gson gson() {
		return new Gson();
	}
	
	@Bean
	public SchedulerFactory getSchedulerFactory() {
		return new StdSchedulerFactory();
	}
}
