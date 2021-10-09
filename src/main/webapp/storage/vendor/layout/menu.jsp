<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 <div class="float-left rounded bg-while mt-3 pr-3 pl-3" style="width: 23%; background-color: #fff;">
            <div class="row pt-2 pb-2">
                <div class="col-12">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link" href="<%= request.getContextPath()%>/" aria-selected="true">Basic Information</a>
                        <a class="nav-link"  href="" aria-selected="false">Import</a>
                        <a class="nav-link"  href="<%= request.getContextPath()%>/user-management" aria-selected="false">User management</a>
                        <a class="nav-link"  href="" aria-selected="false">Department management</a>
                        <a class="nav-link"  href="" aria-selected="false">Position management</a>
                        <a class="nav-link"  href="" aria-selected="false">Equipment management</a>
                        <a class="nav-link"  href="" aria-selected="false">Application management</a>
                        <a class="nav-link"  href="" aria-selected="false">Workflow management</a>
                        <a class="nav-link"  href="" aria-selected="false">Time card management</a>
                        <a class="nav-link"  href="" aria-selected="false">Access right management</a>
                        <a class="nav-link"  href="" aria-selected="false">Event Log management</a>                    	
                    </div>
                </div>
            </div>
        </div>
        <div></div>

</body>
</html>