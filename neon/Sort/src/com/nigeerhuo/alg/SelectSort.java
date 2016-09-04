package com.nigeerhuo.alg;

import java.util.Arrays;

public class SelectSort<T extends Comparable<T>> extends Sort<T>{

	@Override
	public void sort(T[] arr) {
		// 注:无特殊说明, 排序都是升序排序
		// 选择排序是基础排序算法中最简单的算法之一.
		// $.它的设计思想如下:
		// 	假设待排序的数组中一共有 n个元素(位置), 我们分n-1次遍历数组, 每次选择数组中最小的一个元素放入指定位置.
		// $.过程大致是:
		// 	第一次遍历数组, 选择最小元素, 并与数组下标为0的元素互换位置.
		// 	第二次遍历数组, 选择最小元素, 并与数组下标为1的元素互换位置.
		// ... 以此类推
		// $.注意事项:
		//	该算法第一需要注意的地方就是 : 第 i次遍历数组时, 应当从下标为 i的位置开始遍历, 因为 0 ~ i-1位置上的元素已经有序的了. 不要每次都傻乎乎地遍历整个数组, 虽然那木有错, 但会影响性能.
		//	另一项需要注意的是 : 第i次遍历数组时,  迭代数组寻找最小的元素时, 应当保存较小元素的下标, 当该次遍历完成时将较小元素 与 i-1处元素互换位置. (因为交互数组中元素的成本 比 赋值操作的成本高很多)
		
		for (int i = 0; i < arr.length; i++) {
			int min = i;
			for (int j = i; j < arr.length; j++) {
				if (arr[min].compareTo(arr[j]) > 0) {
					min = j;
				}
			}
			this.swap(arr, i, min);
		}
		

		
	}
	
	@Deprecated
	public void sort2(T[] arr) {
		// 初学者容易犯错的一个地方, 示例:
		for (int i = 0; i < arr.length; i++) {
			for (int j = i; j < arr.length; j++) {
				if (arr[i].compareTo(arr[j]) > 0) {
					this.swap(arr, i, j);	// 该算法木有错误, 但是这一步会很大影响性能
				}
			}
		}
	}
	
	
	public static void main(String[] args) {
		Integer[] arr = Sort.getRandomArr(100, 50);
		new SelectSort<Integer>().sort(arr);
		System.out.println(Arrays.asList(arr));
	}
	
}
