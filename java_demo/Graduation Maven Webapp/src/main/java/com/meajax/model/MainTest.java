package com.meajax.model;

import java.util.ArrayList;
import java.util.List;

import com.meajax.model.base2.*;

public class MainTest {
	
	public static void main(String[] args) {
		
		// 随机初始化几个资源点
		List<Point> resourcePoints = new ArrayList<Point>();
		
		for (int i = 0; i < 5; i++) {
			resourcePoints.add(new Point(Point.Type.RESOURCE, i));
		}
		
		// 随机初始化几个灾害点
		List<Point> damagePoints = new ArrayList<Point>();
		for (int i = 0; i < 10; i++) {
			damagePoints.add(new Point(Point.Type.DAMAGE, i));
		}
		
		
		SchemePopulation pop = new SchemePopulation();
		pop.setResourcesPoints(resourcePoints);
		pop.setDamagesPoints(damagePoints);
		
		pop.init();
		
		System.out.println("种群初始化完成.");
		System.out.println("种群第一代进化...");
		
		Run run = new Run(pop);
		run.start(100);
		System.out.println("种群迭代完成.");
		
		
	}
}
