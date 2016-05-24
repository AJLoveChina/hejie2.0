package com.meajax.model.base2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.swing.plaf.basic.BasicInternalFrameTitlePane.MaximizeAction;

import com.meajax.model.QueryResult;
import com.meajax.model.interfaces.Individual;

/**
 * 方案 个体
 * @author ajax
 *
 */
public class Scheme implements Individual{

	public final double MUTATE_RATE = 0.01;
	/**
	 * 资源点
	 */
	private List<Point> resourcePoints;
	/**
	 * 灾害点
	 */
	private List<Point> damagePoints;

	/**
	 * 基因矩阵
	 * -------------------------------------------------
	 *    		灾害点1	灾害点2	灾害点3 ...	灾害点n
	 * 资源点1
	 * 资源点2
	 * ...
	 * 资源点n
	 * -------------------------------------------------
	 */
	private int[][] genes;
	
	/**
	 * 缓存fitness值
	 */
	private double fitVal = 0;
	
	/**
	 * 我支配的个体集合
	 */
	private List<Individual> schemesDominated = new ArrayList<Individual>();
	
	/**
	 * 支配我的个体数量
	 */
	private int dominateMe = 0;
	/**
	 * 支配等级
	 */
	private int dominateRank = 0;
	
	/**
	 * 各个目标的适应度
	 */
	private Map<Aim, Double> fitnessMap = new HashMap<Aim, Double>();

	
	public Map<Aim, Double> getFitnessMap() {
		return fitnessMap;
	}

	public void setFitnessMap(Map<Aim, Double> fitnessMap) {
		this.fitnessMap = fitnessMap;
	}

	public int getDominateMe() {
		return dominateMe;
	}

	public void setDominateMe(int dominateMe) {
		this.dominateMe = dominateMe;
	}

	public List<Individual> getSchemesDominated() {
		return schemesDominated;
	}

	public void setSchemesDominated(List<Individual> schemesDominated) {
		this.schemesDominated = schemesDominated;
	}

	public int getDominateRank() {
		return dominateRank;
	}

	public void setDominateRank(int dominateRank) {
		this.dominateRank = dominateRank;
	}

	public double getFitVal() {
		return fitVal;
	}

	public void setFitVal(double fitVal) {
		this.fitVal = fitVal;
	}

	public int[][] getGenes() {
		return genes;
	}

	public void setGenes(int[][] genes) {
		this.genes = genes;
	}

	public List<Point> getResourcePoints() {
		return resourcePoints;
	}
	
	public void setResourcePoints(List<Point> resourcePoints) {
		this.resourcePoints = resourcePoints;
	}

	public List<Point> getDamagePoints() {
		return damagePoints;
	}

	public void setDamagePoints(List<Point> damagePoints) {
		this.damagePoints = damagePoints;
	}


	public void generateIndividual() {
		int resourcePointsSize = this.getResourcePoints().size();
		int damagePointsSize = this.getDamagePoints().size();
		
		int[][] arr = new int[resourcePointsSize][damagePointsSize];
		Random rd = new Random();
		
		for (int i = 0; i < resourcePointsSize; i++) {
			for (int j = 0; j < damagePointsSize; j++) {
//				int amountTotalHave = this.getResourcePoints().get(i).getResourceAmount();
//				int amountTotalNeed = this.getDamagePoints().get(j).getResourceAmount();
				int amountLeft = this.getLeftResourceAmountOf(this.getResourcePoints().get(i), arr);
				int amountLack = this.getLackResourceAmountOf(this.getDamagePoints().get(j), arr);
				
				int limit;
				limit = (amountLeft > amountLack) ? amountLack : amountLeft;
//				limit = amountTotalHave > amountTotalNeed ? amountTotalNeed : amountTotalHave;
				if (limit == 0) {
					arr[i][j] = 0;
				} else {
					arr[i][j] = rd.nextInt(limit + 1); 
				}
			}
		}
		this.setGenes(arr);
		
	}

	/**
	 * 获取一个点剩余的资源数目
	 * @param point
	 * @return
	 */
	private int getLeftResourceAmountOf(Point point, int[][] genes) {
		int index = point.getId();
		int total = 0;
		for (int i = 0; i < genes[index].length; i++) {
			total += genes[index][i];
		}
		return point.getResourceAmount() - total;
	}
	
	/**
	 * 获取一个灾害点还缺少多少资源
	 * @param point
	 * @param genes
	 * @return
	 */
	private int getLackResourceAmountOf(Point point, int[][] genes) {
		int index = point.getId();
		int total = 0;
		for (int i = 0; i < genes.length; i++) {
			total += genes[i][index];
		}
		return point.getResourceAmount() - total;
	}

	public double getFitness() {
		if (this.getFitVal() != 0) {
			return this.getFitVal();
		}
		
		this.calculateFitness();
		
		return this.getFitVal();
	}
	
	/**
	 * 计算适应度并保存
	 */
	private void calculateFitness() {
		Point rPoint;
		Point dPoint;
		
		double distance;
		double cost = 0;	// 总共成本
		int amountGet = 0;
		int amountNeed;
		double costForEachDamage = 0;
		double[] distances = new double[this.genes.length];
		
		for (int j = 0; j < this.genes[0].length; j++) {
			amountGet = 0;
			costForEachDamage = 0;
			amountNeed = this.getDamagePoints().get(j).getResourceAmount();
			
			for (int i = 0; i < this.genes.length; i++) {
				
				rPoint = this.getResourcePoints().get(i);
				dPoint = this.getDamagePoints().get(j);
				
				distance = rPoint.getDistanceTo(dPoint);
				distances[i] = distance;
				costForEachDamage  += distance * this.genes[i][j];
				amountGet += this.genes[i][j];
			}
			
			for (double distance2 : distances) {
				costForEachDamage += Math.pow(Math.abs(amountGet - amountNeed), 1.2) * distance2;
			}
			
			cost += costForEachDamage;
		}
		
		for (int j = 0; j < this.genes[0].length; j++) {
			Point p = this.getDamagePoints().get(j);
			Point p2;
			int lack = p.getResourceAmountLack(this.genes);
			
			if (lack > 0) {
				for (int i = 0; i < this.genes.length; i++) {
					p2 = this.getResourcePoints().get(i);
					cost += Math.pow(p2.getResourceAmountLeft(this.genes), 2) * p.getDistanceTo(p2);
				}
			}
		}
		
		
		this.setFitVal(1 / cost);
	}

	/**
	 * 个体
	 */
	public void mutate() {
		Random rd = new Random();
		int[][] arr  = this.getGenes();
		for (int i = 0; i < arr.length; i++) {
			for (int j = 0; j < arr[i].length; j++) {
				
				if (rd.nextFloat() < this.MUTATE_RATE) {
					int result = arr[i][j];
					int offset = (int)Math.floor(result * 0.1);
					
					if (rd.nextFloat() < 0.5) {
						arr[i][j] = result + offset;
					} else {
						arr[i][j] = result - offset;
					}
				}
				
			}
		}
		this.calculateFitness();
	}

	public Individual crossoverWith(Individual individual) {
		int[][] arr1 = this.getGenes();
		int[][] arr2 = individual.getGenes();
		int[][] newArr = new int[arr1.length][arr1[0].length];
		
		Random rd = new Random();
		
		for (int i = 0; i < arr1.length; i++) {
			for (int j = 0; j < arr1[i].length; j++) {
				if (rd.nextInt(2) == 0) {
					newArr[i][j] = arr1[i][j];
				} else {
					newArr[i][j] = arr2[i][j];
				}
			}
		}
		Scheme scheme = new Scheme();
		scheme.setDamagePoints(damagePoints);
		scheme.setResourcePoints(resourcePoints);
		scheme.setGenes(newArr);
		return scheme;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		
		int[][] arr = this.getGenes();
		int amount;
		int[] amountX = new int[this.getGenes()[0].length];
		sb.append("\t\t");
		for (int i = 0; i < this.getDamagePoints().size(); i ++) {
			sb.append(this.getDamagePoints().get(i).getName()  + "(" + this.getDamagePoints().get(i).getResourceAmount() + ")" + "\t");
		}
		sb.append("Total");
		sb.append("\n");
		
		for (int i = 0; i < arr.length; i++) {
			amount = 0;
			sb.append(this.getResourcePoints().get(i).getName() + "(" + this.getResourcePoints().get(i).getResourceAmount() + ")" + "\t\t");
			for (int j = 0; j < arr[i].length; j++) {
				amount += arr[i][j];
				amountX[j] += arr[i][j];
				sb.append(arr[i][j] + "\t");
			}
			sb.append(amount);
			sb.append("\n");
		}
		sb.append("Total : \t");
		for (int i = 0; i < amountX.length; i++) {
			sb.append(amountX[i] + "\t");
		}
		sb.append( "\n" + "-------------------------------------------------------------------------------------------------------------------");
		return sb.toString();
	}
	
	public static void main(String[] args) {
		int[][] arr  = new int[3][4];
	}

	/**
	 * 是否是合理的个体, 资源点输出数量大于本身拥有的数量被认为是不合理的个体
	 */
	public boolean isEligible() {
		for (int i = 0; i < this.getResourcePoints().size(); i++) {
			if (this.getLeftResourceAmountOf(this.getResourcePoints().get(i), this.getGenes()) < 0) {
				return false;
			}
		}
		return true;
	}
	
	/**
	 * 是否支配另一个个体
	 * @param individual
	 * @return
	 */
	public boolean isDominate(Individual individual) {
		List<Integer> isDominate = new ArrayList<Integer>();
		for (Aim aim : Aim.values()) {
			double fitness1 = this.getFitnessOf(aim);
			double fitness2 = individual.getFitnessOf(aim);
			
			if (fitness1 > fitness2) {
				isDominate.add(1);
			} else if (fitness1 < fitness2){
				isDominate.add(2);
			} else {
				isDominate.add(3);
			}
		}
		if (isDominate.contains(1) && isDominate.contains(2)) {
			return false;
		} else if (isDominate.contains(1) && !isDominate.contains(2)){
			return true;
		} else if (!isDominate.contains(1) && isDominate.contains(2)) {
			return false;
		} else {
			return false;
		}
	}

	/**
	 * 获取某个目标上的适应度
	 * @param aim
	 * @return
	 */
	public  double getFitnessOf(Aim aim) {
		double fitness = 0;
		switch(aim) {
		case DISTANCES_MIN :
			for (int i = 0; i < this.genes.length; i++) {
				for (int j = 0; j < this.genes[i].length; j++) {
					fitness -=  (this.genes[i][j] * this.getResourcePoints().get(i).getDistanceTo(this.getDamagePoints().get(j)));
				}
			}
			break;
		case FAIR :
			for (int j = 0; j < this.genes[0].length; j++) {
				double amountGet = this.getDamagePoints().get(j).getResourceAmountHasGet(this.genes);
				double amountNeed = this.getDamagePoints().get(j).getResourceAmount();
				
				if (amountNeed != 0) {
					double manzudu =  amountGet / amountNeed;
					manzudu  = manzudu >=1 ? 1 : manzudu;
					fitness += manzudu; //this.getDamagePoints().get(j).getResourceAmount()
				}
			}
			break;
		default:
			try {
				throw new Exception();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		this.getFitnessMap().put(aim, fitness);
		return fitness;
	}

	/**
	 * 把支配的个体加入自己的集合中
	 */
	public void addToDominatedList(Individual individual) {
		this.getSchemesDominated().add(individual);
	}

	public void increaseMembersDominateMe(int i) {
		
		this.dominateMe += i;
		
	}

	public QueryResult toQueryResult() {
		QueryResult qr = new QueryResult();
		qr.setIsok(true);
		List<QueryResult.Line> lines = new ArrayList<QueryResult.Line>();
		
		for (int i = 0; i < this.genes.length; i++) {
			for (int j = 0; j < this.genes[i].length; j++) {
				String info = "";
				List<QueryResult.Point> points = new ArrayList<QueryResult.Point>();
				Point resource = this.getResourcePoints().get(i);
				Point damage = this.getDamagePoints().get(j);
				
				points.add(qr.new Point(resource.getLongitude(), resource.getLatitude(), resource.getName()));
				points.add(qr.new Point(damage.getLongitude(), damage.getLatitude(), damage.getName()));
				
				QueryResult.Line line = qr.new Line(points, "#000", "" + this.genes[i][j]);
				
				lines.add(line);
			}
		}
		
		QueryResult.Data data = qr.new Data(lines);
		
		
		qr.setData(data);
		return qr;
	}
	
	
}
 