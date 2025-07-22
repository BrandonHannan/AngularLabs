
document.addEventListener('DOMContentLoaded', function() {
    var login = document.getElementById('login');
    login.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;
        var json = { email: email, pwd: password };
        ajaxPost(json);
    });
});

function ajaxPost(json){
    $.ajax({
        type: 'POST',
        url: 'api/login',
        contentType: 'application/json',
        data: JSON.stringify(json),
        dataType: 'json',
        success: function(valid) {
            var valid = valid.valid;
            if (valid){
                window.location.href = '/account';
            }
            else{
                var error = document.getElementById('error');
                error.classList.remove('display-none');
            }
        }
    })
}