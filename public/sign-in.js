$(document).ready(function() {
	alert("lalala");
	//判断名字是否合法
	function checkName(name) {
		if(name.length < 6 || name.length > 18) return 0;
		if(name.match("^[0-9a-zA-Z_]{1,}$") != name) return 0;
		if(name[0].match("^[A-Za-z]+$") == null) return 0;
		return 1;
	}
	//判断密码是否合法
	function checkPassword(password) {
		var Password = /^[a-zA-Z0-9_-]{6,12}$/i;
		if(Password.test(password) == true) return 1;
		return 0;
	}
	//撞到注册页面
	$("#register").click(function() {
		window.location.href="https://signin1997.herokuapp.com/";
	});
	//填写信息后登陆
	$("#signin").click(function() {
		var name = $("#name").val();
		var password = $("#password").val();
		if(checkName(name) == 0) {
			//alert("名字非法！");
			$(".tips").text("名字非法！");
		}
		else if(checkPassword(password) == 0) {
			//alert("密码非法！");
			$(".tips").text("密码非法！");
		}
		else {
			$.post("https://signin1997.herokuapp.com/process_post", {"name":name, "ID":"", 
            "phone":"", "email":"", "password":password}, function(data) {
				if(data == "账号不存在!" || data == "密码错误!") {
					//alert(data);
					$(".tips").text(data);
				}
				else {
					window.location.href="https://signin1997.herokuapp.com?username=" + name;
				}
			});			
		}
	});
});
