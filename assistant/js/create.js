$(document).ready(function(){
	$("#btnCancel").bind("click", btnCancel);
	$("#btnQuery").bind("click", btnQuery);
	$("#btnNew").bind("click", btnNew);

    var from = document.referrer;

	function btnCancel(){
		if(count > 0){
			count -= 1;
		    localStorage.setItem('myCount', count.toString());
		}
	};

    function btnQuery()
    {
        localStorage.setItem('query', '1');
    }

    function btnNew()
    {
        localStorage.setItem('query', '0');
    }

	
	function autoSet(reason, item){
		$('#TextBoxDATE_FROM').val(item[0]);
		$('#TextBoxDATE_TO').val(item[0]);

        if(item[1] == '六' || item[1] == '日')
        {
            var time_from = item[3].split(':');

            if(time_from[1] <= '30'){
                time_from[1] = '00';
            }
            else if(time_from[1] > '30'){
                time_from[1] = '30';
            }
            $('#DropDownListTIME_FROM').attr('value', time_from[0] + ':' + time_from[1]);
        }
		
        else
        {
		    $('#DropDownListTIME_FROM').attr('value', '18:30')
        }
		
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
	}

    var data = localStorage.getItem('myInfo');
	var step = parseInt(localStorage.getItem('step'));
	var count = parseInt(localStorage.getItem('myCount'));
	var items = data.split("\r");
    
	if(from.search(/left/) != -1){
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
	}
    else
    {
        var query = localStorage.getItem('query');
        if(query == '1')
         {
            return false;
         }
    }

    if(step == 0)
    {
		var reason = localStorage.getItem('defaultReason');
        var item = items[count].split(' ');

        var output = item[0] + ' work to ' + item[4] + '\r \rDefault Reason:' ;
		reason = prompt(output, reason);
        if(reason != "" && reason != null)
        {
            localStorage.setItem('defaultReason', reason);
        }
        else
        {
            return false;
        }

        if(count + 1 < items.length)
        {
            autoSet(reason, item);
        }
        else
        {
            return false;
        }

        // set step to 1 - add info
        localStorage.setItem('step', '1');

        $('#btnAddLine').click();

    }
    else if(step == 1)
    {
        // maybe should check 
        var text1 = $('#GridViewLINE_ctl02_Label15').text();
        var text2 = $('#GridViewLINE_ctl02_Label16').text();
        var text3 = $('#GridViewLINE_ctl02_Label17').text();
        var text4 = $('#GridViewLINE_ctl02_Label18').text();

        if(text1.length != 10 || text2.length != 10 || text3.length != 5 || text4.length != 5)
        {
            return false;
        }

        localStorage.setItem('step', '2');
        localStorage.setItem('myCount', (count+1).toString());
        $('#btnPost').click();

    }
    else if(step == 2)
    {
        location.reload();
        localStorage.setItem('step', '0');
    }

});
