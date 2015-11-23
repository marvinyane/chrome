function checkCurrentStatus(){
	var loginURL_Front=$("#iframepage").attr("src");
	if(loginURL_Front==null||$.trim(loginURL_Front)<=0)
		loginURL_Front="https://dynamic.12306.cn/otsweb/";
	$.ajax({ url :loginURL_Front+'loginAction.do?method=loginAysnSuggest',
			type :"POST",
			dataType: "json",
			success:function(data){
				if(data.randError != 'Y'){
					alert(data.randError);
					return false;
				} else {
					submitForm(data.loginRand);
					
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				alert("网络忙，请稍后重试");
				return false;
			}
		}); 
}

function submitForm(loginRand){
	/*
	loginRanf=$("#loginRand").val();
	refundLogin	N
	refundFlag	Y
	refundLoginCheck	Y

	loginUser.user_name
	nameErrorFocus		""
	passwordErrorFocus	""			
	randomCode  		""
	randErrorFocus		""
	user.password 		""

	action:https://dynamic.12306.cn/otsweb/loginAction.do?method=login

	*/
	var userName=(utility.getPref("loginUser.user_name")==null)?$("#UserName").val():utility.getPref("loginUser.user_name");
	var password=(utility.getPref("user.password")==null)?$("#password").val():utility.getPref("user.password");
	var randomCode=(utility.getPref("randCode")==null)?$("#randCode").val():utility.getPref("randCode");

	$.ajax({
			type: "POST",
			url: "/otsweb/loginAction.do?method=login",
			data: {
				"loginRand": loginRand,
			    "refundLogin":"N",
			    "refundFlag":"Y",
			    "loginUser.user_name":userName,
			    "nameErrorFocus":"",
			    "user.password":password,
			    "passwordErrorFocus":"",
			    "randCode":randomCode,
			    "randErrorFocus":""
			},
			timeout: 30000,
			dataType: "text",
			//cache: false,
			//async: false,
			success: function(html){
				// var htmlEndLocation=html.indexOf("</html>");
				// if(htmlEndLocation!=-1){
				// 	var message=html.substring(htmlEndLocation,html.length);
				// 	alert(message);
				// }
				if (html.indexOf("欢迎您登录中国铁路客户服务中心网站") != -1) {
					//存储登录信息
					utility.setPref("loginUser.user_name",userName);
					utility.setPref("user.password",password);
					utility.setPref("randCode",randomCode);
					window.location.href = "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init";
				}else{
					//if(html.indexOf("id=\"randErr\"")!=-1){
						alert("登录失败！");
					//}
				}
			},
			error: function(msg){
				alert("error"+msg);
			},
			beforeSend: function(XHR){
				//alert("Data Saved: " + XHR);
			}
		});

}
