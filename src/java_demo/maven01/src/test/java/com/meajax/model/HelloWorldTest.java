package com.meajax.model;

import org.junit.*;
import org.junit.Assert.*;

public class HelloWorldTest{
	
	@Test
	public void test() {
		Assert.assertEquals("Hello World!", new HelloWorld().sayHi());
	}
}