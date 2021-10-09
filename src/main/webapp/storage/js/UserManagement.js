
loadPosition();
loadPost();
loadUser();
loadSearchDepartment();

function loadPosition() {
	$.ajax({
		url: "/positions",
		method: "GET",
		async: false,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(response) {
			let html = ``;
			$.each(response, function(index, value) {
				html += `<option value="${value.positionId}"> ${value.positionName} </opttion> `
			});
			$("#position").html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		}
	})
}


function loadPost() {
	$.ajax({
		url: "/posts",
		method: "GET",
		async: false,
		contentType: "application/sion; charset=utf-8",
		dataType: "json",
		success: function(response) {
			let html = ``;
			$.each(response, function(index, value) {
				html += `<option value="${value.postId}">${value.postName} </option> `
			})
			$("#post-list").html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		}
	})
}

function loadUser() {
	$.ajax({
		url: "/users",
		method: "GET",
		async: false,
		contentType: "application/sion; charset=utf-8",
		dataType: "json",
		success: function(response) {
			let html = ``;
			$.each(response, function(index, value) {
				let posts = value.posts;
				let post = ``;
				posts.forEach(item => {
					post += item.postName;
				})
				html += `
				  <tr>
                        <th scope="col"> <input type="checkbox" aria-label="Checkbox for following text input">
                        </th>
                        <td>Effectiverness</td>
                        <td>${value.lastName}</td>
                        <td>${value.firstName}  ${value.lastName}</td>
                        <td>${post}</td>
                        <td></td>
                  </tr> 
				`
			})
			$("#tbody").append(html);
		}
		,
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		}
	})
}

function loadSearchDepartment() {
	$.ajax({
		url: "/posts",
		method: "GET",
		async: false,
		contentType: "application/sion; charset=utf-8",
		dataType: "json",
		success: function(response) {
			let html = ``;
			$.each(response, function(index, value) {
				html += `<option value="${value.postId}">${value.postName} </option> `
			})
			$("#search-depart").append(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		}
	})
}

function loadDataSearchUser() {
	$.ajax({
		url: "/users",
		method: "GET",
		async: false,
		contentType: "application/sion; charset=utf-8",
		dataType: "json",
		success: function(response) {
			
			let html = ``;
			$.each(response, function(index, value) {
				let posts = value.posts;
				let post = ``;
				posts.forEach(item => {
					if ($("#search-depart").val() == item.postId) {
						post = item.postName;
						html += `	
				  	<tr>
                        <th scope="col"> <input type="checkbox" aria-label="Checkbox for following text input">
                        </th>
                        <td>Effectiverness</td>
                        <td>${value.lastName}</td>
                        <td>${value.firstName}  ${value.lastName}</td>
                        <td>${post}</td>
                        <td></td>
                  	</tr> 
					`
					}
				})
				$("#tbody").html(html);
			})
		}
		,
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		}
	})
}


$("#btn-add-department").on("click", function() {
	if ($("#post-list").val().length != 0) {
		$("#post-list").children().each(function() {
			$("#post-list").val().forEach(post_Id => {
				if (post_Id == $(this).val()) {
					$("#post").append(this);
					$(this).prop("selected", false);
				}
			})
		})
	}
})

$("#btn-delete-department").on("click", function() {
	if ($("#post").val().length != 0) {
		$("#post").children().each(function() {
			$("#post").val().forEach(postId => {
				if (postId == $(this).val()) {
					$("#post-list").append(this);
					$(this).prop("selected", false);
				}
			})
		})
	}
})

$("#search").on("click", function() {
	if($("#search-depart").val() == "") {
		loadUser();		
	} else {
		loadDataSearchUser();
	}
})


$(".btn-add").on("click", function() {

	if (checkValidate() == true) {
		let posts = [];
		$("#post").children().each(function() {
			let post = {
				postId: $(this).val(),
				postName: $(this).text()
			}
			posts.push(post);
		})
		var user = {
			loginName: $("#loginName").val(),
			password: $("#password").val(),
			firstName: $("#firstName").val(),
			lastName: $("#lastName").val(),
			firstNameKana: $("#furigana-firstName").val(),
			lastNameKana: $("#furigana-lastName").val(),
			email: $("#email").val(),
			outTelephone: $("#telephone-first").val() + $("#telephone-middle").val() + $("#telephone-last").val(),
			inTelephone: $("#phone-extension").val(),
			cellularPhone: $("#mobile-first").val() + $("#mobile-middle").val() + $("#mobile-last").val(),
			cellualarNail: $("#mobile-email").val(),
			position: {
				positionId: $("#position").val()
			},
			posts: posts
		}

		console.log(user)

		$.ajax({
			url: "/users/add",
			method: "POST",
			async: false,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(user),
			success: function(user) {
				console.log(user);
				$(".btn-close").click();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR, textStatus, errorThrown);
			}
		})
		$("input[type='text']").val("");

	}

})

function isString(text) {
	var rex = /^([a-zA-Z]+[ ]?[a-zA-Z]+)+$/;
	return rex.test(text);
}

function isEmail(text) {
	var re = /^[a-zA-Z_0-9]+@gmail.com$/i;
	return re.test(text);
}

function isPhone(text) {
	var re = /^[0-9]{10}$/;
	return re.test(text);
}

function isNumber(text) {
	var re = /^[0-9]+$/;
	return re.test(text);
}

function checkValidate() {
	var flag = true;

	if (($("#loginName").val() == "") || (!isString($("#loginName").val()))) {
		$("#loginName").next().removeClass("d-none");
		flag = false;
	} else {
		$("#loginName").next().addClass("d-none");
	}
	if (($("#email").val() == "") || (!isEmail($("#email").val()))) {
		$("#email").next().removeClass("d-none");
		flag = false;
	} else {
		$("#email").next().addClass("d-none");
	}

	if (($(".tel").val() == "") || (!isNumber($(".tel").val()))) {
		$(".error-tel").removeClass("d-none");
		flag = false;
	} else {
		$(".error-tel").addClass("d-none");
	}

	if (($("#phone-extension").val() == "") || (!isPhone($("#phone-extension").val()))) {
		$("#phone-extension").next().removeClass("d-none");
		falg = false;
	} else {
		$("#phone-extension").next().addClass("d-none");
	}

	if (($(".mol").val() == "") || (!isNumber($(".mol").val()))) {
		$(".error-mol").removeClass("d-none");
		flag = false;
	} else {
		$(".error-mol").addClass("d-none");

	}

	if (($("#mobile-email").val() == "") || (!isEmail($("#mobile-email").val()))) {
		$("#mobile-email").next().removeClass("d-none");
		flag = false;
	} else {
		$("#mobile-email").next().addClass("d-none");
	}
	return flag;
}




