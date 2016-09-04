package com.nigeerhuo.alg;

import java.util.Arrays;

public class ShellSort<T extends Comparable<T>> extends Sort<T> {

	@Override
	public void sort(T[] arr) {
		int offset = 1,
			len = arr.length;
		while(offset * 3 + 1 < len) offset = offset * 3 + 1;
		
		while(offset != 0) {
			for (int i = offset; i < len; i++) {
				for (int j = i; j >= offset; j -= offset) {
					if (arr[j].compareTo(arr[j - offset]) < 0) {
						this.swap(arr, j, j - offset);
					} else {
						break;
					}
				}
			}
			offset = offset / 3;
		}
		
	}
	
	public static void main(String[] args) {
		Integer[] arr = Sort.getRandomArr(100, 50);
		new ShellSort<Integer>().sort(arr);
		System.out.println(Arrays.asList(arr));
	}

}
