<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<!-- Declaration tag -->
<%!int a=10;
 public String demo(){
  return "hello worls ";
  } %>
  
  <!-- Scriptlet Tag -->
  <%  int b=20; %>
  
   <!-- Expression Tag -->
  <%= a %>
  <%= b %>
  <%= demo() %>
</body>
</html>