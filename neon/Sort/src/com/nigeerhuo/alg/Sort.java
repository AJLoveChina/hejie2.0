package com.nigeerhuo.alg;

import java.util.Random;

public abstract class Sort<T extends Comparable<T>> {
	
	public static Integer[] getRandomArr(int length, int radix) {
		Integer[] arr = new Integer[length];
		
		Random rd = new Random();
		while(--length >= 0) {
			arr[length] = rd.nextInt(radix);
		}
		
		return arr;
	}
	
	public void swap(T[] arr, int i, int j) {
		if (i == j) return;
		T t = arr[i];
		arr[i] = arr[j];
		arr[j] = t;
	}
	
	public abstract void sort(T[] arr);
}
