package com.hejie.spring.beans;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.springframework.stereotype.Component;


public class Cities {
	class City{
		private String name;
		private int code;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getCode() {
			return code;
		}
		public void setCode(int code) {
			this.code = code;
		}
		public City(String name, int code) {
			super();
			this.name = name;
			this.code = code;
		}
	}
	
	private List<City> cities;
	
	{
		Properties properties = new Properties();
		try {
			properties.load(this.getClass().getResourceAsStream("/cities.properties"));
			
			System.out.println("cities 加载成功!");
			Set<Object> set = properties.keySet();
			List<City> list = new ArrayList<>();
			
			for (Object o : set) {
				String val = (String)properties.get(o);
				list.add(new City((String)o, Integer.parseInt(val)));
			}
			this.cities = list;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
