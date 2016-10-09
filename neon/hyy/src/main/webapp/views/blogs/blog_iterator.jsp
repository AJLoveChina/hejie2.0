<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
 
<div class="panel panel-default">
  <div class="panel-heading">${item.getTitle() }</div>
  <div class="panel-body">
    <p>${item.getDesc() }</p>
  </div>
</div>