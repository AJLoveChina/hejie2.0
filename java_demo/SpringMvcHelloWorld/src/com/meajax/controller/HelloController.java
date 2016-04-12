package com.meajax.controller;



import java.util.ArrayList;
import java.util.List;
import java.util.Map;

 



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

 



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

 

@Controller

public class HelloController {

   

        @RequestMapping(value="/hello")

        public String hello(){

            System.out.println("spring mvc hello world!");

            return "hello";

        }


        @RequestMapping(value="/ok")
        public String ok(){

            System.out.println("ok");

            List<String> list=new ArrayList<String>(); 

            list.add("���ӻ�"); 

            list.add("����"); 

            list.add("ɽ��ʡ"); 

            list.add("�෢��"); 

            list.add("D���"); 

            list.add("�淶"); 

            list.add("������"); 

            list.add("������"); 

            list.add("���߶�"); 

            return "list"; 

        }
        
        @RequestMapping(value="/user/{id}",method=RequestMethod.GET)
        public String get(@PathVariable("id") Integer id){
            System.out.println("get" + id);
            return "hello";
        }
}