package com.meajax.model.interfaces;

import java.util.List;
import java.util.Map;

import com.meajax.model.QueryResult;
import com.meajax.model.base2.Aim;

public interface Individual {
	
	/**
	 * 随机初始化个体
	 */
	public void generateIndividual();
	
	/**
	 * 获取个体的适应度
	 * @return
	 */
	public double getFitness();
	
	/**
	 * 个体序列化
	 * @return
	 */
	public String toString();
	
	
	/**
	 * 个体发生突变
	 */
	public void mutate();
	
	/**
	 * 交叉生成后代个体
	 * @param individual
	 * @return
	 */
	public Individual crossoverWith(Individual individual);
	
	
	/**
	 * 获取基因
	 * @return
	 */
	public int[][] getGenes();
	
	
	/**
	 * 是否是合格的个体
	 */
	public boolean isEligible();
//	
	public List<Individual> getSchemesDominated();
//	
//	public void setSchemesDominated(List<Individual> schemesDominated);
	
	public void addToDominatedList(Individual individual);
	
	public int getDominateRank();
	
	public int getDominateMe();
	
	public void setDominateRank(int dominateRank);
	
	public void increaseMembersDominateMe(int i);
	
	
	
	public boolean isDominate(Individual individual);
	
	public double getFitnessOf(Aim aim);
	
	public Map<Aim, Double> getFitnessMap();

	public QueryResult toQueryResult();
	
}
