$(document).ready(function(){
	$("#btnCancel").bind("click", btnCancel);
	$("#btnQuery").bind("click", btnQuery);
	$("#btnNew").bind("click", btnNew);

    var weekday = {};
    weekday['一'] = 'Mon';
    weekday['二'] = 'Tus';
    weekday['三'] = 'Wen';
    weekday['四'] = 'Thu';
    weekday['五'] = 'Fri';
    weekday['六'] = 'Sat';
    weekday['日'] = 'Sun';

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

        var time_from = item[3].split(':');

        if(time_from[1] < '30'){
            time_from[1] = '00';
        }
        else if(time_from[1] >= '30'){
            time_from[1] = '30';
        }
        $('#DropDownListTIME_FROM').attr('value', time_from[0] + ':' + time_from[1]);

        var time_to = item[4].split(':');

        if(time_to[1] <= '30'){
            time_to[1] = '30';
        }
        else if(time_to[1] > '30'){
            var hour = parseInt(time_to[0]) + 1;
            time_to[0] = hour.toString();
            if(hour < 10)
            {
                time_to[0] = '0'+time_to[0];
            }
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
		var output = 'Please choose start from : \r\r';

        count = 0;
		$.each(items, function(key, value){
			if(count < items.length-1){
				var item = value.split(' ');
				output = output+count+' : '+item[0]+' 周'+item[1]+' 从 '+item[3]+' 到 '+item[4]+'\r';
				count ++;
			}
		});
		
		count = parseInt(prompt(output, 0));
        localStorage.setItem('myCount', count.toString());
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
        if(count + 1 >= items.length)
        {
            return false;
        }
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
            localStorage.setItem('myCount', (count+1).toString());
            location.reload();
            return false;
        }

        autoSet(reason, item);

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
