package com.hejie.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hejie.spring.beans.Dandan;
import com.hejie.spring.beans.Hejie;
import com.hejie.spring.beans.MusicTicket;

@Configuration
public class SpringConfig {
	
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
}
