package com.meajax.model.base2;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.meajax.model.interfaces.Individual;
import com.meajax.model.interfaces.Population;

public class SchemePopulation implements Population{
	
	/**
	 * 种群个体数量
	 */
	public final int SCHEME_NUM = 50;
	
	/**
	 * 从几个个体中选取较好的父代
	 */
	public final int CROSS_NUM = 5;
	private List<Individual> schemes = new ArrayList<Individual>();
	/**
	 * 资源点
	 */
	private List<Point> resourcesPoints = new ArrayList<Point>();
	/**
	 * 灾害点
	 */
	private List<Point> damagesPoints = new ArrayList<Point>();
	
	/**
	 * 种群中最优秀的个体
	 */
	private Individual bestOne;
	
	private List<Front> fronts;

	public List<Front> getFronts() {
		return fronts;
	}

	public void setFronts(List<Front> fronts) {
		this.fronts = fronts;
	}

	public Individual getBestOne() {
		return bestOne;
	}

	public void setBestOne(Individual bestOne) {
		this.bestOne = bestOne;
	}

	public List<Point> getResourcesPoints() {
		return resourcesPoints;
	}

	public void setResourcesPoints(List<Point> resourcesPoints) {
		this.resourcesPoints = resourcesPoints;
	}

	public List<Point> getDamagesPoints() {
		return damagesPoints;
	}

	public void setDamagesPoints(List<Point> damagesPoints) {
		this.damagesPoints = damagesPoints;
	}

	public List<Individual> getSchemes() {
		return schemes;
	}

	public void setSchemes(List<Individual> schemes) {
		this.schemes = schemes;
	}
	
	public void init() {
		List<Individual> schemes = new ArrayList<Individual>();
		
		for (int i = 0; i < SCHEME_NUM; i ++) {
			Scheme scheme = new Scheme();
			scheme.setDamagePoints(damagesPoints);
			scheme.setResourcePoints(resourcesPoints);
			scheme.generateIndividual();
			
			schemes.add(scheme);
		}
		
		this.setSchemes(schemes);
	}



	public Individual getIndividual(int index) {
		Individual individual = this.getSchemes().get(index);
		return individual;
	}

	/**
	 * 获取种群最佳的个体
	 */
	public Individual getFittest() {
		
		this.setBestOne(this.getFittest(this.getSchemes()));
		return this.getBestOne();
		
	}
	/**
	 * 从一群个体中选取适应度最高的个体
	 */
	public Individual getFittest(List<Individual> individuals) {
		Individual fittest = null;
		double  fitness = - Double.MAX_VALUE;
		for (Individual scheme: individuals) {
			if (scheme.getFitness() > fitness) {
				fittest = scheme;
				fitness = fittest.getFitness();
			}
		}
		return fittest;
	}
	
	public int populationSize() {
		return this.getSchemes().size();
	}


	public void saveIndividual(Individual individual) {
		this.getSchemes().add(individual);
	}

	
	public Population evolution() {
		// 杂交繁衍下一代
		SchemePopulation pop = new SchemePopulation();
		pop.setResourcesPoints(resourcesPoints);
		pop.setDamagesPoints(damagesPoints);
		List<Individual> schemes = new ArrayList<Individual>();

		// 最好的个体直接进入下一代
		schemes.add(this.getFittest());
		
		while(schemes.size() < this.SCHEME_NUM) {
			Individual scheme = this.generateANewIndividual();
			scheme.mutate();
			if (scheme.isEligible()) {
				schemes.add(scheme);
			}
			
		}
		
		pop.setSchemes(schemes);
		
		return pop;
	}
	
	/**
	 * 使用NSGA2算法的种群迭代
	 * @return
	 */
	public Population evolutionByNSGA2() {
		// 杂交繁衍下一代
		SchemePopulation pop = new SchemePopulation();
		pop.setResourcesPoints(resourcesPoints);
		pop.setDamagesPoints(damagesPoints);
		List<Individual> schemes = new ArrayList<Individual>();

		
		while(schemes.size() < this.SCHEME_NUM) {
			Individual scheme = this.generateANewIndividualByNSGA2();
			if (scheme == null) {
				continue;
			}
			scheme.mutate();
			if (scheme.isEligible()) {
				schemes.add(scheme);
			}
			
		}
		
		schemes.addAll(this.getSchemes());
		
		
		// 后代与父代非支配排序
		List<Front> fronts = this.nonDominatedSort(schemes);
		//pop.setFronts(fronts);
		
		schemes = new ArrayList<Individual>();
		Random rd = new Random();
		int randomNumber;
		List<Integer> randomNumberList = new ArrayList<Integer>();
		for (int i = 0; i < fronts.size() && schemes.size() < this.SCHEME_NUM; i++) {
			if (schemes.size() + fronts.get(i).size() <= this.SCHEME_NUM) {
				schemes.addAll(fronts.get(i).schemes);
			} else {
				while(schemes.size() < this.SCHEME_NUM) {
					randomNumber = rd.nextInt(fronts.get(i).size());
					if (!randomNumberList.contains(randomNumber)) {
						schemes.add(fronts.get(i).schemes.get(randomNumber));
						randomNumberList.add(randomNumber);
					}
				}
			}
		}
		
		double avgFitnessDis = 0;
		double avgFitnessFair = 0;
		for (int i = 0; i < schemes.size(); i++) {
			Map<Aim, Double> map = schemes.get(i).getFitnessMap();
			avgFitnessDis += map.get(Aim.DISTANCES_MIN);
			avgFitnessFair += map.get(Aim.FAIR);
		}
		System.out.println("avgFitnessDis : " + avgFitnessDis / schemes.size());
		System.out.println("avgFitnessFair : " + avgFitnessFair / schemes.size());
		System.out.println("-------------------------------------------");
		
		pop.setSchemes(schemes);
		return pop;
	}
	
	public class Front {
		List<Individual> schemes = new ArrayList<Individual>();
		
		void add(Individual scheme) {
			this.schemes.add(scheme);
		}
		
		int size() {
			return this.schemes.size();
		}
		
		public List<Individual> getSchemes() {
			return this.schemes;
		}
		
		public String toString() {
			double avgFitnessDis = 0;
			double avgFitnessFair = 0;
			for (int i = 0; i < schemes.size(); i++) {
				Map<Aim, Double> map = schemes.get(i).getFitnessMap();
				avgFitnessDis += map.get(Aim.DISTANCES_MIN);
				avgFitnessFair += map.get(Aim.FAIR);
			}
			String result = "";
			result += "avgFitnessDis : " + avgFitnessDis / schemes.size();
			result += "avgFitnessFair : " + avgFitnessFair / schemes.size();
			return result;
		}
	}
	/**
	 * 快速非支配排序
	 * @param schemes2
	 */
	public List<Front> nonDominatedSort(List<Individual> schemes) {
 		List<Front> fronts = new ArrayList<SchemePopulation.Front>();
		
		Front first = new Front();
		for (Individual p : schemes) {
			for (Individual q : schemes) {
				if (p == q) continue;
				if (p.isDominate(q)) {
					p.addToDominatedList(q);
				} else if (q.isDominate(p)){
					p.increaseMembersDominateMe(1);
				}
			}
			
			if (p.getDominateMe() == 0) {
				
				p.setDominateRank(0);
				first.add(p);
			}
		}
		fronts.add(first);
		
		int i = 0;
		while(fronts.get(i).size() > 0) {
			Front front = new Front();
			
			for (Individual p : fronts.get(i).schemes) {
				for (Individual q : p.getSchemesDominated()) {
					q.increaseMembersDominateMe(-1);
					if (q.getDominateMe() == 0) {
						q.setDominateRank(i + 1);
						front.add(q);
					}
				}
			}
			i += 1;
			fronts.add(front); 
		}
		
		return fronts;
	}

	/**
	 * 杂交生成新个体 (遗传算法)
	 * @return
	 */
	private Individual generateANewIndividual() {
		List<Individual> list1 = this.genenrateIndividualListByRandom();
		List<Individual> list2 = this.genenrateIndividualListByRandom();
		
		Individual fittestOfList1 = this.getFittest(list1);
		Individual fittestOfList2 = this.getFittest(list2);
		
		Individual child = fittestOfList1.crossoverWith(fittestOfList2);
		return child;
	}
	
	/**
	 * 杂交生成新个体(NSGA2)
	 * @return
	 */
	private Individual generateANewIndividualByNSGA2() {

		Random rd = new Random();
		
		Individual scheme1 = this.schemes.get(rd.nextInt(this.schemes.size()));
		Individual scheme2 = this.schemes.get(rd.nextInt(this.schemes.size()));
		
		if(scheme1 == scheme2) {
			return null;
		}
		
		Individual child = scheme1.crossoverWith(scheme2);
		return child;
	}
	
	// 这个方法暂时没用
	private Individual getRandomIndivualsOfNSGA2() {
		List<Individual> list = new ArrayList<Individual>();
		Random rd = new Random();
		int size = this.fronts.size();
		int total = size * (size + 1) / 2;
		float random = rd.nextFloat();
		
		for (int i = 0; i < size; i++) {
			if ((random >= (i * (i + 1)  / (2 * total))) && (random < ((i + 1) * (i + 2)  / (2 * total)))) {
				list = this.fronts.get(size - i - 1).schemes;
			}
		}
		
		return list.get(rd.nextInt(list.size()));
	}

	private List<Individual> genenrateIndividualListByRandom() {
		List<Individual> schemes = new ArrayList<Individual>();
		Random rd = new Random();
		
		for (int i = 0; i < this.CROSS_NUM; i++) {
			schemes.add(this.getIndividual(rd.nextInt(this.SCHEME_NUM)));
		}
		return schemes;
	}
	@Override
	public String toString() {
		return "SchemePopulation [SCHEME_NUM=" + SCHEME_NUM + ", schemes="
				+ schemes + ", resources=" + resourcesPoints + ", damages=" + damagesPoints
				+ "]";
	}

	

	public List<Individual> getSchemesOfFirstFront() {
		return this.getFronts().get(0).schemes;
	}
	
	
	
}
