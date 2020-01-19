package com.meajax.model.interfaces;

import java.util.List;

import com.meajax.model.base2.SchemePopulation.Front;

public interface  Population{
	
	/**
	 * 初始化种群
	 */
	public void init();
	
	
	/**
	 * 保存个体
	 * @param index
	 * @param individual
	 */
	public void saveIndividual(Individual individual);
	
	
	/**
	 * 获取个体
	 * @param index
	 * @return
	 */
	public Individual getIndividual(int index);
	
	/**
	 * 获取最优个体
	 * @return
	 */
	public Individual getFittest();
	
	/**
	 * 获取种群个体数量
	 * @return
	 */
	public int populationSize();
	
	
	/**
	 * 种群进化
	 * @return
	 */
	public Population evolution();
	
	/**
	 * 种群进化(使用NSGA2)
	 * @return
	 */
	public Population evolutionByNSGA2();
	
	/**
	 * 获取一个种群所有的个体
	 */
	public List<Individual> getSchemes();
	
	/**
	 * 非支配排序
	 * @param schemes
	 * @return
	 */
	public List<Front> nonDominatedSort(List<Individual> schemes);
	
	public List<Individual> getSchemesOfFirstFront();
	
	
}
