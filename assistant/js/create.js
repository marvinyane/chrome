
$(document).ready(function(){
	var data = ""; 
	var count = 0;
	
	$("#btnPost").bind("click",btnPost);
	$("#btnCancel").bind("click",btnCancel);
	
	function btnPost(){
		count += 1;
	    localStorage.setItem('myCount', count.toString());
	};
	
	function btnPost(){
		if(count > 0){
			count -= 1;
		    localStorage.setItem('myCount', count.toString());
		}
	};
	
	function autoSet(){
		var reason = null;
		var item = items[count].split(' ');
		
		reason = localStorage.getItem('defaultReason');
		
		reason = prompt(item[0] + ' Default reason: ', reason);
		
		if(reason  != null){
		    localStorage.setItem('defaultReason', reason);
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
	
	data = localStorage.getItem('myInfo');
	isFirst = parseInt(localStorage.getItem('isFirst'));
	count = parseInt(localStorage.getItem('myCount'));
	
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
		
		localStorage.setItem('isFirst', '1');
	}

	if(items.length > (count+1)){
		autoSet();
	}
	
});
