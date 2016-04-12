package com.meajax.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Sign {
	
	@RequestMapping(value="/sign/qq")
	public String signQQ() {
		System.out.println("sign qq");
		return "sign/qq";
	}
	
	@RequestMapping(value="/sign/git")
	public String signGit() {
		return "sign/git";
	}
	
	@RequestMapping(value="/sign/name/{name}")
	public String signName(@PathVariable("name") String name) {
		
		
		return "sign/name";
	}
	
}
