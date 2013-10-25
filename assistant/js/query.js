$(document).ready(function(){

    var date = getCurTime().split('-');

	var tables = $('#GridViewPUNCH_CARD_INFO');
	var items = new Array();
    items.length = 0;

	tables.each(function(){
		var tbody = $(this).find('tbody');
		tbody.each(function(){
			$(this).find('tr').each(function(){
				var item = {};
                var i = 0;
				$(this).find('td').each(function(){
					item[i] = $(this).text().replace(/\s/g, "");
                    i++;
				});
                if(item[0] != undefined)
                {
                    items[items.length] = item;
                    items.length++;
                }
			});
		});		
	});

    if(items.length == 0)
    {
        return false;
    }

    var curMonth = getMonth(items[0][0]);
    alert(curMonth);

});


function getCurTime()
{
    var date = new Date();
    var str = date.toLocaleString().replace(/年|月/g, '-').replace(/日.*/,'');
    return str;
}

function getCurMonthItems()
{
	return localStorage.getItem('myInfo', data);
}


function ctrl()
{
    if(i >= 9 && item[4] != null && item[4] != ""){
        if(item[0] >= '2013-10-01' && item[0] <= '2013-10-06')
        {
            items[item[0]] = item;
        }
        else if(item[1] == '六' || item[1] == '日')
        {
            items[item[0]] = item;
        }
        else if(item[4] > '19:00:00' || item[4] < '05:30:00' && item[4] != ""){
            item[3] = '18:30:00';
            items[item[0]] = item;
        }
    }
}

function save()
{
	var data = "";
	
	$.each(items, function(key, value){
		$.each(value, function(key, value){
			data += value;
			data += " ";
		});
		data += '\r';
	});
	
	localStorage.setItem('myInfo', data);
	localStorage.setItem('step', '0');
	localStorage.setItem('myCount', '0');
    localStorage.setItem('query', '0');
}

function getMonth( date )
{
    var t0 = parseInt(date.split('-')[1]);
    var t1 = parseInt(getCurTime().split('-')[1]);

    if(t0 == t1)
    {
        return 0;
    }

    if(t0 == t1-1)
    {
        return 1;
    }

    return -1;
}
