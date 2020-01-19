package com.nigeerhuo.nigeerhuov2.impl;

import junit.framework.TestCase;
import com.nigeerhuo.nigeerhuov2.Bean;

public class BeanImplTest extends TestCase {

    public void testBeanIsABean() {
	Bean aBean = new BeanImpl();
        assertTrue(aBean.isABean());
    }

}