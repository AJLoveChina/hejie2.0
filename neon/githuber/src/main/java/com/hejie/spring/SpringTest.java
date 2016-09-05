package com.hejie.spring;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hejie.spring.beans.Hejie;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=SpringConfig.class)
public class SpringTest {
	
	@Autowired
	private Hejie hejie;
	
	@Test
	public void test() {
		
		hejie.act();
		
		Assert.assertNotNull(hejie);
	}
}
