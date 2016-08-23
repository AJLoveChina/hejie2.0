package com.hejie.githuber;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Stack;

public class Xipai<T> {
	class Rule {
		public int num;
		public int times;
		public Rule(int num, int times) {
			super();
			this.num = num;
			this.times = times;
		}
	}
	
	public Stack<T> xipai(Rule rule, Stack<T> stack) {
		while(rule.times-- > 0) {
			stack = this.xipai(stack);
		}
		Stack<T> result = new Stack<T>();
		while(!stack.isEmpty()) {
			result.push(stack.pop());
		}
		return result;
	}
	
	private Stack<T> xipai(Stack<T> stack) {
		if (stack.size() % 2 != 0) return null;
		
		
		Stack<T> stackLeft = new Stack<T>();
		Stack<T> stackRight = new Stack<T>();
		int size = stack.size();
		int i = 1;
		while(stack.size() > 0) {
			if (i <= size / 2) {
				stackRight.add(0, stack.pop());
			} else {
				stackLeft.add(0, stack.pop());
			}
			i++;
		}
		
		Stack<T> result = new Stack<T>();
		i = 0;
		while(i < size) {
			if (i % 2 == 0) 
				result.push(stackRight.pop());
			else 
				result.push(stackLeft.pop());
			i++;
		}
		
		return result;
	}
	
	
	public static void main(String[] args) {
		Xipai<Integer> xipai = new Xipai<Integer>();
		Xipai.Rule rule = xipai.new Rule(3, 1);
		Stack<Integer> stack = new Stack<Integer>();
		stack.addAll(Arrays.asList(1,2,3,4,5,6));
		Stack<Integer> result = xipai.xipai(rule, stack);
		
		System.out.println(result);
	}
}
