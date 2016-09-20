package com.hejie.spring;


import java.io.IOException;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.hejie.spring.aspect.Safe;
import com.hejie.spring.beans.Cities;
import com.hejie.spring.beans.Dandan;
import com.hejie.spring.beans.Hejie;
import com.hejie.spring.beans.MusicTicket;

@Configuration
@EnableAspectJAutoProxy
public class SpringConfig {
	
	@Bean
	public Safe safe() {
		return new Safe();
	}
	
	
	@Bean(name="misicTicket")
	public MusicTicket musicTicket() {
		return new MusicTicket();
	}
	
	@Bean(name="hejie")
	public Hejie hejie() {
		return new Hejie(musicTicket());
	}
	
	@Bean(name="dandan")
	public Dandan dandan(MusicTicket musicTicket) {
		return new Dandan(musicTicket);
	}
	
	@Bean
	public Cities cities() {
		return new Cities();
	}
	
	@Bean
	public DataSource dataSource() {
		BasicDataSource basicDataSource = new BasicDataSource();
		
		basicDataSource.setUrl("jdbc:mysql://127.0.0.1:3306/meajax?useUnicode=true&characterEncoding=utf8");
		Properties properties = new Properties();
		try {
			properties.load(this.getClass().getResourceAsStream("/prop.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		basicDataSource.setUsername(properties.getProperty("username"));
		basicDataSource.setPassword(properties.getProperty("password"));
		basicDataSource.setInitialSize(20);
		basicDataSource.setMaxActive(30);
		
		return basicDataSource;
	}
	
	
}
