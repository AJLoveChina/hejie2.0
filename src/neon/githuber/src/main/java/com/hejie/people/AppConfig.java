package com.hejie.people;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.hejie.actors.Jack;

@Configuration
@EnableAspectJAutoProxy
@ComponentScan
public class AppConfig {
	
	@Bean
	public Audience audience() {
		return new Audience();
	}
	
	@Bean
	public Jack jack() {
		return new Jack();
	}
}
