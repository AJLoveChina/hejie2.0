package com.meajax.model.base2;

import com.meajax.model.interfaces.Individual;

public enum Aim {
	DISTANCES_MIN(1, "总路程运输成本低"),
	FAIR(2, "尽量满足全部需求");
	
	private int id;
	private String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	Aim(int id, String name) {
		this.id = id;
		this.name = name;
	}
	
}
