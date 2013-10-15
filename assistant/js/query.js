$(document).ready(function(){
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
	
	localStorage.setItem('myInfo', data);
	localStorage.setItem('isFirst', '0');
	localStorage.setItem('myCount', '0');
});
