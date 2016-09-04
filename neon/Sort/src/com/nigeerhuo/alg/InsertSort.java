package com.nigeerhuo.alg;

import java.util.Arrays;

public class InsertSort<T extends Comparable<T>> extends Sort<T>{

	@Override
	public void sort(T[] arr) {
		// 无特殊说明, 都是指升序排序
		// 插入排序是最基本最经典的排序算法之一, 原理简单, 但是很多人容易把它与选择排序弄混淆.
		// 插入排序尽管时间复杂度为O(n^2), 但是在以下俩种情况时, 插入排序有很大的优势:
		// 	1.对于小规模数组的排序问题时, 它往往比快速排序还要快.
		//	2.对于大规模已经接近有序的数组, 插入排序的时间性能接近O(n), 非常快. 所以说大家不要小看插入排序, 它有自己特殊的使用场景.
		
		int len = arr.length;
		for (int i = 1; i < len; i++) {
			for (int j = i; j > 0 ; j--) {
				if (arr[j].compareTo(arr[j-1]) < 0) {
					this.swap(arr, j, j - 1);
				} else {
					break;
				}
			}
			
		}
		
	}
	
	public static void main(String[] args) {
		Integer[] arr = Sort.getRandomArr(100, 50);
		new InsertSort<Integer>().sort(arr);
		System.out.println(Arrays.asList(arr));
	}

}
