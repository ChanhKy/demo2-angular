<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script src="<%=request.getContextPath()%>/storage/vendor/jquery/jquery-3.6.0.min.js"></script>
<script src="<%=request.getContextPath()%>/storage/vendor/bootstrap/bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/storage/vendor/bundle/bootstrap.bundle.min.js"></script>

<script src="<%=request.getContextPath()%>/storage/vendor/bootstrap/popper.min.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/storage/vendor/bootstrap/bootstrap.min.css">
<script src="<%=request.getContextPath()%>/storage/vendor/fontawesome/js/all.min.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/storage/vendor/fontawesome/css/all.min.css">

</head>
<body>

 <div class="container-fluid " style=" height: 585px; background-color: cyan;">
 
		<jsp:include page="/storage/vendor/layout/header.jsp"></jsp:include>
		<jsp:include page="/storage/vendor/layout/menu.jsp"></jsp:include>

 		<div class=" float-right rounded mt-3 pl-3" style="width: 75%; background-color: #fff;">
            <div class="border-bottom pb-3" style="height: 30px;">
                <a href="#"> <strong>  Basic information  </strong></a>
            </div>
            <div class="border-bottom d-flex justify-content-between  align-items-center " style="height: 15vh;">
                <h5> Acccess from the house </h5>
                <button type="button" class="btn btn-light border border-secondary" style="height: 6vh;"> <i class="fas fa-cog"></i> Configuration</button>
            </div>
            <div class="border-bottom d-flex align-items-center" style="height: 40px;">
                <h6>It is the address to access from the house to the "Aipo". The house of the user, please contact us to this address</h6>
            </div>
            <div class="border-bottom  d-flex align-items-center" style="height: 50px;">
                <p class="pt-2"> <strong>Aipo site (in-house)    </strong> Http:// 1.57.7.209.80/ </p>
            </div>
            <div class="border-bottom d-flex align-items-center justify-content-center" style="height: 50px;">
                <button type="button" class="btn btn-light border border-secondary" style="height: 6vh;"> To Edit</button>
            </div>
            <div class="border-bottom " style="height: 50px;">
                <p class="pt-2"> <strong>Access from outsides the company    </strong></p>
            </div>
            <div class="border-bottom " style="height: 50px;">
                <p class="pt-2"> The address for accessing the "Aipo" from outside the company. The user of ther outside, please contact us to this address </p>
            </div>
            <div class="border-bottom " style="height: 50px;">
                <p class="pt-2"> <strong>Aipo site (Outside)   </strong></p>
            </div>
            <div class="border-bottom d-flex align-items-center justify-content-center" style="height: 50px;">
                <button type="button" class="btn btn-light border border-secondary" style="height: 6vh;"> To Edit</button>
            </div>
        </div>


</div>
</body>
</html>