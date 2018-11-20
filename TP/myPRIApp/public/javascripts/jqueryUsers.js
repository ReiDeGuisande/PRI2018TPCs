$(() => {
    
    $('#password, #confirm_password').on('keyup', () => {
        if ($('#password').val() == $('#confirm_password').val()) {
          $('#message').html('Password matching').css('color', 'green')
          $('.enableOnInput').prop('disabled', false)

        } 
        else {
            $('#message').html('Password not matching').css('color', 'red')
            $('.enableOnInput').prop('disabled', true)
        }
      })

})