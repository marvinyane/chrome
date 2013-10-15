
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
	
	var data = ""; 
	var count = 0;
	
	$("#btnPost").bind("click",btnPost);
	$("#btnCancel").bind("click",btnCancel);
	
	function btnPost(){
		count += 1;
		if(!window.localStorage){
			UserData.setItem('myCount', count.toString());
		}else{
			localStorage.setItem('myCount', count.toString());
		}
	};
	
	function btnPost(){
		if(count > 0){
			count -= 1;
			if(!window.localStorage){
				UserData.setItem('myCount', count.toString());
			}else{
				localStorage.setItem('myCount', count.toString());
			}
		}
	};
	
	function autoSet(){
		var reason = null;
		var item = items[count].split(' ');
		
		if(!window.localStorage){
			reason = UserData.getItem('defaultReason');
		}else{
			reason = localStorage.getItem('defaultReason');
		}
		
		reason = prompt(item[0] + ' Default reason: ', reason);
		
		if(reason  != null){
			if(!window.localStorage){
				UserData.setItem('defaultReason', reason);
			}else{
				localStorage.setItem('defaultReason', reason);
			}
		}
	
		$('#TextBoxDATE_FROM').val(item[0]);
		$('#TextBoxDATE_TO').val(item[0]);
		
		$('#DropDownListTIME_FROM').attr('value', '18:30')
		
		var time_to = item[4].split(':');
		
		if(time_to[1] <= '30'){
			time_to[1] = '30';
		}
		else if(time_to[1] > '30'){
			var hour = parseInt(time_to[0]) + 1;
			time_to[0] = hour.toString();
			time_to[1] = '00';
		}
		
		$('#DropDownListTIME_TO').attr('value', time_to[0]+':'+time_to[1]);
		
		$('#TextBoxREASON').val(reason);
		//$('#GridViewLINE_ctl02_Label15').text($('#TextBoxDATE_FROM').val());
		//$('#GridViewLINE_ctl02_Label16').text($('#TextBoxDATE_TO').val());
		//$('#GridViewLINE_ctl02_Label17').text($('#DropDownListTIME_FROM').val());
		//$('#GridViewLINE_ctl02_Label18').text($('#DropDownListTIME_TO').val());
		
		//$('#btnPost').removeAttr('disabled');
	}
	
	if(!window.localStorage){
		data = UserData.getItem('myInfo');
		isFirst = parseInt(UserData.getItem('isFirst'));
		count = parseInt(UserData.getItem('myCount'));
	}else{
		data = localStorage.getItem('myInfo');
		isFirst = parseInt(localStorage.getItem('isFirst'));
		count = parseInt(localStorage.getItem('myCount'));
	}
	
	var items = data.split("\r");
	if(isFirst == 0){
		var output = 'Data from DATA1, please choose start from : \r\r';
		$.each(items, function(key, value){
			if(count < items.length-1){
				var item = value.split(' ');
				output += '    ';
				output += count;
				output += ' : ';
				output += item[0];
				output += ' to ';
				output += item[4];
				output += '\r';
				count ++;
			}
		});
		
		count = parseInt(prompt(output, 0));
		
		if(!window.localStorage){
			UserData.setItem('isFirst', '1');
		}else{
			localStorage.setItem('isFirst', '1');
		}
	}

	if(items.length > (count+1)){
		autoSet();
	}
	
});
