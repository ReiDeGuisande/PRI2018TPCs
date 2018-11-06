$(() => {
    $('#ficheiros').load('http://localhost:5001/fich')


    $('#adicionar').click(e=> {
        e.preventDefault()
        var filename = $('#fich').val().split('\\').pop();
        $('#ficheiros').append('<li>'+'<a href='+filename+'/>'+'</li>')
        //ajaxPost()
        formPost()
    })

    function ajaxPost() {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:5001/fich/guardar",
            data: JSON.stringify({ficheiro: $('#fich').val().split('\\').pop(),desc: $('#desc').val()}),
            success: p => alert('Ficheiro gravado com sucesso!'+p),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }
        })
        $('#desc').val('')
        $('#fich').val('')
    }

    function formPost() {
        var form_data = new FormData($('#myUploadForm')[0]);
        $.ajax({
            type:'POST',
            url:'http://localhost:5001/processa',
            processData: false,
            contentType: false,
            async: true,
            cache: false,
            data : form_data,
            success: p => alert('Ficheiro gravado com sucesso!'+p),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }       
        })
        $('#desc').val('')
        $('#fich').val('')
    }
})