package com.meajax.model;


import java.util.ArrayList;
import java.util.List;

import com.meajax.model.base2.SchemePopulation;
import com.meajax.model.interfaces.GA;
import com.meajax.model.interfaces.Individual;
import com.meajax.model.interfaces.Population;

public class Run {
	private Population population;
	
	
	
	public Population getPopulation() {
		return population;
	}
	public void setPopulation(Population population) {
		this.population = population;
	}


	public Run(Population population) {
		this.setPopulation(population);
//		Individual scheme = population.getFittest();
//		System.out.println("Initial best individual: fit val = " + scheme.getFitness());
//		System.out.println(scheme.toString());
	}
	
	
	private void evolution(int iterations) {
		for (int i = 0; i < iterations; i++) {
			this.setPopulation(population.evolutionByNSGA2());
        }
		System.out.println("Finished (iterations = " + iterations + "): ");
		
		
		List<SchemePopulation.Front> fronts = this.population.nonDominatedSort(this.population.getSchemes());
		List<Individual> schemes = fronts.get(0).getSchemes();
		
		List<QueryResult> qrs = new ArrayList<QueryResult>();
		for (Individual scheme : schemes) {
			System.out.println(scheme.toString());
			qrs.add(scheme.toQueryResult());
		}
	}
	
	public Population start(int iterations) {
		this.evolution(iterations);
		return this.population;
	}
	
}
