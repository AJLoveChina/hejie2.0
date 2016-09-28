package ajax.controller.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.google.gson.Gson;

import ajax.controller.spring.aspects.SafeAspect;

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
	
}
