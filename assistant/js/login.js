
$(document).ready(function(){ 
	var UserData = {
        userData : null,
        name : location.hostname,

        init:function(){
            if (!UserData.userData) {
                try {
                    UserData.userData = document.createElement('INPUT');
                    UserData.userData.type = "hidden";
                    UserData.userData.style.display = "none";
                    UserData.userData.addBehavior ("#default#userData");
                    document.body.appendChild(UserData.userData);
                    var expires = new Date();
                    expires.setDate(expires.getDate()+365);
                    UserData.userData.expires = expires.toUTCString();
                } catch(e) {
                    return false;
                }
            }
            return true;
        },

        setItem : function(key, value) {

            if(UserData.init()){
                UserData.userData.load(UserData.name);
                UserData.userData.setAttribute(key, value);
                UserData.userData.save(UserData.name);
            }
        },

        getItem : function(key) {
            if(UserData.init()){
            UserData.userData.load(UserData.name);
            return UserData.userData.getAttribute(key)
            }
        },

        remove : function(key) {
            if(UserData.init()){
            UserData.userData.load(UserData.name);
            UserData.userData.removeAttribute(key);
            UserData.userData.save(UserData.name);
            }

        }
    };
	
	var username = "";
	var password = "";
	
	var options = { 
		url:'login.aspx', 
		type:'POST', 

		success: function(){} 
	}; 
	
	if(!window.localStorage){
		username = UserData.getItem('username');
		password = UserData.getItem('password');
	}else{
		username = localStorage.getItem('username');
		password = localStorage.getItem('password');
	}
	
	//$('#form1').ajaxSubmit(options); 

	if(username != null && password != null){
		$('#tbUserName').val(username);
		$('#tbPassword').val(password);
		//
	}

	$('#btnLogin').click(function(){
		username = $('#tbUserName').val();
		password = $('#tbPassword').val();
				
		if(!window.localStorage){
			UserData.setItem('username', username);
			UserData.setItem('password', password);
		}else{
			localStorage.setItem('username', username);
			localStorage.setItem('password', password);
		}
		//$('#form1').ajaxSubmit(options); 
	});

}); 