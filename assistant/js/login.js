$(document).ready(function(){ 
    var username = null;
    var password = null;

    username = localStorage.getItem('username');
    password = localStorage.getItem('password');

    if(username != null && password != null){
        $('#tbUserName').val(username);
        $('#tbPassword').val(password);
        $('#btnLogin').trigger("click");
    }

    $('#btnLogin').click(function(){
        username = $('#tbUserName').val();
        password = $('#tbPassword').val();

        if(username != "" && password != "")
        {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }   
    });

}); 
