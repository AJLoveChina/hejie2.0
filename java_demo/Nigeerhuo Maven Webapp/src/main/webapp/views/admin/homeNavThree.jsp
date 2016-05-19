<%@page import="ajax.model.entity.Fragment"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	
	List<Fragment> fragments = Fragment.getFragments(Fragment.Type.HOME_PAGE_THREE_ADS);
	
	request.setAttribute("list", fragments);	
%>

<c:forEach items="${list }" var="one">
		
</c:forEach>

