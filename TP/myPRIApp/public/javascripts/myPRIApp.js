$(() => {

    $('#submit').click(e => {
        e.preventDefault()
        var username = $('#username').val()
        var name = $('#name').val()
        var password = $('#password').val()
        var email = $('#email').val()
        var type = $(".radioB:checked").val() 
        userPost(username,name,email,password,type)
    })
    
    $('#password, #confirm_password').on('keyup', () => {
        if ($('#password').val() == $('#confirm_password').val()) {
          $('#message').html('Password matching').css('color', 'green');
          $('.enableOnInput').prop('disabled', false);

        } 
        else {
            $('#message').html('Password not matching').css('color', 'red');
            $('.enableOnInput').prop('disabled', true);
        }
      });

    function userPost(username,name,email,password,type) {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:5555/users/register",
            data: JSON.stringify({username: username, name: name, email: email, password: password, type: type}),
            success: p => alert('User stored with success!'),
            error: e => {
                alert('Post error: ' + JSON.stringify(e))
                console.log('ERROR: '+e)
            }
        })
        $('#username').val('')
        $('#password').val('')
        $('#name').val('')
        $('#mail').val('')
        $('#confirm_password').val('')
        $('.radioB').prop('checked', false)
    }
})