package com.meajax.model.interfaces;


public interface GA {
	/**
	 * 进化种群
	 * @param pop
	 * @return
	 */
	public Population evolvePopulation(Population population);
	
	
	/**
	 * 选取俩个优秀的个体进行交叉生成新的个体
	 * @param father
	 * @param mother
	 * @return
	 */
	public Individual crossover(Individual father, Individual mother);
	
	/**
	 * 个体执行突变
	 * @param individual
	 */
	public void mutate(Individual individual);
	
	/**
	 * 从种群中选出优秀的个体进行交叉
	 * @param population
	 * @return
	 */
	public Individual tournamentSelection(Population population);
	
}
