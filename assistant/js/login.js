$(document).ready(function(){ 
    var username = "";
    var password = "";

    var options = { 
        url:'login.aspx', 
        type:'POST', 
        
        success: function(){} 
    };

    username = localStorage.getItem('username');
    password = localStorage.getItem('password');

    //$('#form1').ajaxSubmit(options); 

    if(username != null && password != null){
        $('#tbUserName').val(username);
        $('#tbPassword').val(password);
        //
    }

    $('#btnLogin').click(function(){
        username = $('#tbUserName').val();
        password = $('#tbPassword').val();

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        //$('#form1').ajaxSubmit(options); 
    });

}); 
