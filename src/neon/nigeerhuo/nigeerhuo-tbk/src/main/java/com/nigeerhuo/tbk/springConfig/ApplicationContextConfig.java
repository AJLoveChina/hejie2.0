package com.nigeerhuo.tbk.springConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.google.gson.Gson;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = { "com.nigeerhuo.tbk.spring" })
public class ApplicationContextConfig extends WebMvcConfigurerAdapter {
     
    @Bean(name = "viewResolver")
    public InternalResourceViewResolver getViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }
    
    @Bean(name="gson")
    public Gson gson() {
    	return new Gson();
    }
   
}