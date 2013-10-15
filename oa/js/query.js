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

	var tables = $('#GridViewPUNCH_CARD_INFO');
	
	var items = {};
	tables.each(function(){
		var tbody = $(this).find('tbody');
		tbody.each(function(){
			$(this).find('tr').each(function(){
				var item = {};
				var i = 0;
				$(this).find('td').each(function(){
					//alert($(this).text());
					item[i] = $(this).text().replace(/\s/g, "");
					i++;
				});
				
				if(i >= 9){
					if(item[4] > '19:00:00'){
						items[item[0]] = item;
					}
				}
			});
		});		
	});
	
	var data = "";
	
	$.each(items, function(key, value){
		$.each(value, function(key, value){
			data += value;
			data += " ";
		});
		data += '\r';
	});
	
	if(!window.localStorage){
		UserData.setItem('myInfo', data);
		UserData.setItem('isFirst', '0');
		UserData.setItem('myCount', '0');
	}else{
		localStorage.setItem('myInfo', data);
		localStorage.setItem('isFirst', '0');
		localStorage.setItem('myCount', '0');
	}
});
