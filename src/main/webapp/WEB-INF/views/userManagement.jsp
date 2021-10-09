<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script
	src="<%=request.getContextPath()%>/storage/vendor/jquery/jquery-3.6.0.min.js"></script>
<script
	src="<%=request.getContextPath()%>/storage/vendor/bootstrap/bootstrap.min.js"></script>
<script
	src="<%=request.getContextPath()%>/storage/vendor/bundle/bootstrap.bundle.min.js"></script>

<script
	src="<%=request.getContextPath()%>/storage/vendor/bootstrap/popper.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/storage/vendor/bootstrap/bootstrap.min.css">
<script
	src="<%=request.getContextPath()%>/storage/vendor/fontawesome/js/all.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/storage/vendor/fontawesome/css/all.min.css">

</head>
<body>
	<div class="container-fluid "
		style="height: 585px; background-color: cyan;">

		<jsp:include page="/storage/vendor/layout/header.jsp"></jsp:include>
		<jsp:include page="/storage/vendor/layout/menu.jsp"></jsp:include>

		<div class=" float-right rounded mt-3 pl-3"
			style="width: 75%; background-color: #fff;">
			<div class="border-bottom pb-3" style="height: 30px;">
				<a href="#"> <strong> User management </strong></a>
			</div>
			<div class=" d-flex justify-content-between  align-items-center "
				style="height: 15vh;">
				<button type="button" class=" btn btn-primary" data-toggle="modal"
					data-target="#exampleModal" data-whatever="@getbootstrap">To
					add a user</button>
			</div>
			<div class=" d-flex col-6">
				<select class="custom-select rounded" id="search-depart">
					 <option value="">All</option>
					<!--<option value="1">One</option>
					<option value="2">Two</option>
					<option value="3">Three</option> -->
				</select>
				<div class=" rounded pl-2">
					<button id="search" class="btn border-secondary rounded">Search</button>
				</div>
			</div>
			<div class=" d-flex  align-items-center justify-content-between"
				style="height: 15vh;">
				<div>
					<button class="btn border-secondary rounded mr-2">Remove</button>
					<button class="btn border-secondary rounded mr-2">to
						enable</button>
					<button class="btn border-secondary rounded mr-2">to
						disable</button>
					<button class="btn border-secondary rounded">to change
						the order of the user</button>
				</div>
				<div class="pr-3">
					<p class="paging">1 - 7/7</p>
				</div>
			</div>

			<table class="table">
				<thead class="thead-light">
					<tr>
						<th scope="col"><input type="checkbox" id="check-all"
							aria-label="Checkbox for following text input"></th>
						<th scope="col">State</th>
						<th scope="col">User name</th>
						<th scope="col">Name</th>
						<th scope="col">Department name</th>
						<th scope="col">Title</th>
					</tr>
				</thead>
				<tbody id="tbody">
					<!--   <tr>
                        <th scope="col"> <input type="checkbox" aria-label="Checkbox for following text input">
                        </th>
                        <td>Effectiverness</td>
                        <td>longld</td>
                        <td>luu long</td>
                        <td>TEST2 group, test department</td>
                        <td></td>
                    </tr> -->
				</tbody>
			</table>
			<div class=" d-flex  align-items-center justify-content-between"
				style="height: 15vh;">
				<div>
					<button class="btn border-secondary rounded mr-2">Remove</button>
					<button class="btn border-secondary rounded mr-2">to
						enable</button>
					<button class="btn border-secondary rounded mr-2">to
						disable</button>
				</div>
				<div class="pr-3">
					<p class="paging">1 - 7/7</p>
				</div>
			</div>
		</div>



		<div class=" modal fade" id="exampleModal" data-backdrop="static"
			data-keyboard="false" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Add User</h5>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">

						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label">
								<strong>Login name</strong>
							</label>
							<div class="col-sm-9 mb-2">
								<input type="text" class="form-control" id="loginName">
								<span class="text-danger pt-1 pl-1 d-none">(Alphanumeric)</span>

							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Password</strong></label>
							<div class="col-sm-9 mb-2">
								<input type="text" class="form-control" id="password">
							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Password</strong>
								<br /> (for comfirmation) </label>
							<div class="col-sm-9 mb-2">
								<input type="text" class="form-control" id="re-password">
							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Name</strong>
								<br /> </label>
							<div class="col-sm-4 mb-2">
								<input type="text" class="form-control" id="firstName">
							</div>
							<div class="col-sm-4 mb-2">
								<input type="text" class="form-control" id="lastName">
							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label">
								<strong>Name: Furigana</strong> <br />
							</label>
							<div class="col-sm-4 mb-2">
								<input type="text" class="form-control" id="furigana-firstName">
							</div>
							<div class="col-sm-4 mb-2">
								<input type="text" class="form-control" id="furigana-lastName">
							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Mail
									address</strong></label>
							<div class="col-sm-9 mb-2">
								<input type="email" class="form-control" id="email"> <span
									class="text-danger pt-1 pl-1 d-none">(Alphanumeric)</span>
							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Telephone
									(outside line)</strong></label>
							<div class="col-sm-3 mb-2">
								<input type="text" class="tel form-control" id="telephone-first"
									maxlength="4"> 
									<span class="error-tel text-danger pt-1 pl-1 d-none" >(Byte numbers)</span>
							</div>
							<div class="col-sm-3 mb-2">
								<input type="text" class="tel form-control" id="telephone-middle"
									maxlength="3">
							</div>
							<div class="col-sm-3 mb-2">
								<input type="text" class="tel form-control" id="telephone-last"
									maxlength="3">

							</div>

						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Telephone
									number (extension)</strong></label>
							<div class="col-sm-9 mb-2">
								<input type="text" class="form-control" id="phone-extension"
									maxlength="10"> <span class="text-danger pt-1 pl-1 d-none">(Hyphen
									(-) or single-byte number</span>

							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Telephone
									number (mobile)</strong></label>
							<div class="col-sm-3 mb-2">
								<input type="text" class="mol form-control" id="mobile-first"
									maxlength="4"> <span class="error-mol text-danger pt-1 pl-1 d-none">(Byte
									numbers)</span>
							</div>
							<div class="col-sm-3 mb-2">
								<input type="text" class="mol form-control" id="mobile-middle"
									maxlength="3">
							</div>
							<div class="col-sm-3 mb-2">
								<input type="text" class="mol form-control" id="mobile-last"
									maxlength="3">


							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Mobile
									e-mail address</strong></label>
							<div class="col-sm-9 mb-2">
								<input type="text" class="form-control" id="mobile-email">
								<span class="text-danger pt-1 pl-1 d-none">(Alphanumeric)</span>

							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Mug
									shot</strong></label>
							<div class="custom-file col-sm-3 mb-2">
								<button class="btn border-secondary rounded mr-2">
									<strong>Add file</strong>
								</button>

							</div>
						</div>
						<div class="form-group row border-bottom" style="height: 40vh;">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Department</strong></label>
							<div class="custom-file col-sm-9 mb-2 d-flex">
								<div class="w-50">
									<p class="mb-1">Department</p>
									<select id="post" class="custom-select" multiple>
									</select>
									<button id="btn-delete-department"
										class="mt-1 float-right border btn btn-light">Delete</button>
								</div>
								<div class="w-50">
									<p class="mb-1">Department List</p>
									<select id="post-list" class="custom-select" multiple>
									</select>
									<button id="btn-add-department"
										class="mt-1 float-right border btn btn-light">Add</button>
								</div>
							</div>
						</div>
						<div class="form-group row border-bottom">
							<label for="inputEmail3" class="col-sm-3 col-form-label"><strong>Position</strong></label>
							<div class="col-sm-9 mb-2">
								<select class="form-control mb-2" id="position">
								</select>
								<button class="btn border-secondary rounded mr-2 ">
									<strong>Add file</strong>
								</button>
							</div>
						</div>
						<div class="form-group row">
							<label for="inputEmail3" class="col-sm-3 col-form-label">
								<strong>Administrative privileges</strong>
							</label>
							<div class="col-sm-9 form-group form-check  mb-2 mt-2 pl-4">
								<input type="checkbox" class="form-check-input" id="privilegas">
								<label class="form-check-label" for="exampleCheck1">To
									administrator</label>
							</div>
						</div>
	
					</div>
				
					<div class="modal-footer d-flex justify-content-center">
						<button type="button" class="btn-close btn btn-secondary"
							data-dismiss="modal">Close</button>
						<button type="button" class="btn-add btn btn-primary">Add
							User</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script
		src="<%=request.getContextPath()%>/storage/js/UserManagement.js"></script>

</body>
</html>