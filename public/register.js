$(document).ready(function() {
	//判断名字是否合法
	function checkName(name) {
		if(name.length < 6 || name.length > 18) return 0;
		if(name.match("^[0-9a-zA-Z_]{1,}$") != name) return 0;
		if(name[0].match("^[A-Za-z]+$") == null) return 0;
		return 1;
	}
	//判断ID是否合法
	function checkID(ID) {
		if(ID.length != 8) return 0;
		if(ID[0] == '0') return 0;
		return 1;
	}
	//判断电话号码是否合法
	function checkPhone(phone) {
		if(phone.length != 11) return 0;
		if(phone[0] == '0') return 0;
		return 1;	
	}
	//判断邮箱是否合法
	function checkEmail(email) {
		var Email = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
		if(Email.test(email) == true) return 1;
		return 0;
	}
	//判断密码是否合法
	function checkPassword(password) {
		var Password = /^[a-zA-Z0-9_-]{6,12}$/i;
		if(Password.test(password) == true) return 1;
		return 0;
	}
	//展示个人信息的函数
	function show(Name) {
		if(window.location.search.substring(0, 10) == "?username=") {
			$.post("https://signin1997.herokuapp.com/process_post", {"name":window.location.search.substring(10), "ID":"", 
            "phone":"", "email":""}, function(data) {
				data = eval("(" + data + ")");
				$("#nameShow").val("用户名: " + data.name);
				$("#IDShow").val("学号: " + data.ID);
				$("#phoneShow").val("电话: " + data.phone);
				$("#emailShow").val("邮箱: " + data.email);
			});
		}
	}
	//设置placeholder里面的标签
	function setPlaceholder() {
		$.post("https://signin1997.herokuapp.com/movies", {"type": "所有"}, function(data) {
			if(data != "没有匹配的电影资源") {
				//alert(data);
				data = eval("(" + data + ")");
				var lable = "已有的标签:";
				for(var i = 0; i < data.length; i++) {
					if(lable.indexOf(data[i].type) == -1) {
						lable += data[i].type + " ";
					}
				}
				//alert(lable);
				$("#searchContent").attr("placeholder", lable);
			}
		});		
	}
	//打开页面则设置标签提醒
	setPlaceholder();
	//	转到登录页面
	$("#SignIn").click(function() {
		window.location.href="https://signin1997.herokuapp.com/signin";
	});
	//当点击提交按钮
	$("#submit").click(function() {
		//alert("点击了注册按钮");
		//当个人信息合法且还没被注册过，则注册成功，并把信息上传到server.js
		if(checkName($("#name").val()) == 1 && checkID($("#ID").val()) == 1 && 
			checkPhone($("#phone").val()) == 1 && checkEmail($("#email").val()) == 1 && 
			checkPassword($("#password").val()) == 1) {
			//alert("现在提交看看");
			$.post("https://signin1997.herokuapp.com/process_post", {"name":$("#name").val(), "ID":$("#ID").val(), 
            "phone":$("#phone").val(), "email":$("#email").val(), "password":$("#password").val()}, function(data) {
				//alert("lala");
				//alert(data);
				$(".tips").text(data);
				if(data == "注册成功!") {
					//alert("lala");
					setTimeout(function() {
						//alert($("#name").val());
						window.location.href="https://signin1997.herokuapp.com?username=" + $("#name").val();
					}, 1000);
				}

			});

		}
		else if(checkName($("#name").val()) == 0) $(".tips").text("名字非法！");
		else if(checkID($("#ID").val()) == 0) $(".tips").text("学号非法！");
		else if(checkPhone($("#phone").val()) == 0) $(".tips").text("电话非法！");
		else if(checkEmail($("#email").val()) == 0) $(".tips").text("邮箱非法！");
		else if(checkPassword($("#password").val()) == 0) $(".tips").text("密码非法！");

	});
	//当点击重置按钮
	$("#reset").click(function() {
		$("#name").val("");
		$("#ID").val("");
		$("#phone").val("");
		$("#email").val("");
		$("#password").val("");
	});
	//展示个人信息
	if(window.location.search.substring(0, 10) == "?username=") {
		$("#signPage").css("z-index", "0");
		$("#detailPage").css("z-index", "1");
		$("#hideshow").css("display", "block");
		$("#movie").css("display", "block");
		$("#comment").css("display", "block");
		
		$("#search").click(function() {
			$("#movie a").remove();
			$("#movie br").remove();
			$.post("https://signin1997.herokuapp.com/movies", {"type": $("#searchContent").val()}, function(data) {
				if(data != "没有匹配的电影资源") {
					//alert(data);
					data = eval("(" + data + ")");
					//alert(data);
					$("#movie").append($("<br/>"));
					for(var i = 0; i < data.length; i++) {
						$("#movie").append($("<a href='" + data[i].href + "'>" + data[i].name + "  " + "</a>"));
					}	
				}
				else {
					$("#searchContent").val(data);
				}

			});			
		});
		
		$("#send").click(function() {
			if($("#type").val() != "" && $("#moviename").val() != "" && $("#url").val() != "") {
				$.post("https://signin1997.herokuapp.com/send", {"type": $("#type").val(), "name": $("#moviename").val(), "href": $("#url").val()}, function(data) {
            		$("#type").val(data);
            		$("#moviename").val("");
            		$("#url").val("");		
            		setPlaceholder();
				});	 				
			}
		});	
		
		show(window.location.search.substring(10));
	}

	var hideshow = "show";
	$("#hideshow").click(function() {
		if(hideshow == "show") {
			$("#signPage").css("display", "none");
			$("#detailPage").css("display", "none");
			$("#movie").css("top", "50px");
			$("#comment").css("top", "380px");	
			$("#hideshow").text("展示详情");
			hideshow = "hide";
		}
		else if(hideshow == "hide") {
			$("#signPage").css("display", "block");
			$("#detailPage").css("display", "block");
			$("#movie").css("top", "455px");
			$("#comment").css("top", "800px");
			$("#hideshow").text("隐藏详情");
			hideshow = "show";			
		}
	});

	//当点击退出按钮
	$("#quit").click(function() {
		window.location.href="https://signin1997.herokuapp.com/signin"
	});
	//当点击上传按钮
	var buoy = false;
	$("#showbuoy").click(function() {
		if(buoy == false) {
			$("#upload").css("display", "block");
			buoy = true;
		}
		else if(buoy == true) {
			$("#upload").css("display", "none");
			buoy = false;			
		}
	});

});
