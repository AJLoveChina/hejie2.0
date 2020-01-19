package com.hejie.spring;

import javax.sql.DataSource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hejie.spring.beans.Actor;
import com.hejie.spring.beans.Cities;
import com.hejie.spring.beans.Dandan;
import com.hejie.spring.beans.Hejie;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=SpringConfig.class)
public class SpringTest {
	
	@Autowired
	private Actor hejie;
	
	@Autowired
	private Actor dandan;
	
	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private Cities cities;
	
	@Autowired
	private Cities cities2;
	
	@Test
	public void test() {
		
		this.hejie.act();
		
		dandan.act();
		
		Assert.assertNotNull(hejie);
		
		Assert.assertNotNull(cities);
	}
}
