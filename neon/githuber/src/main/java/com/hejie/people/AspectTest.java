package com.hejie.people;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hejie.actors.Jack;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=AppConfig.class)
public class AspectTest {

	@Autowired
	private Jack jack;
	
	
	@Test
	public void test() {
		this.jack.act();
		System.out.println(123);
	}
	
}
