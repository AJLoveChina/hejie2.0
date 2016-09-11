package ajax.controller.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import ajax.controller.spring.aspects.SafeAspect;

@Configuration
@EnableAspectJAutoProxy
public class SpringConfig {
	
	@Bean
	public SafeAspect safeAspect() {
		return new SafeAspect();
	}
	
}
