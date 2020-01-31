$(document).ready(function() {
    
    $('#userform').on("submit", function(event){
        event.preventDefault();
        var form = $('#userform');
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            dataType: 'json',
            data: form.serialize(),
            success: function(data) {
                form[0].reset();
                var tr = '<tr id='+data.id+'><td>'
                        + data.user +'</td><td>' 
                        + data.pswd +'</td><td><button onclick="_delete('+data.id+')">x</button></td></tr>';
                $('tbody').append(tr);
                $.notify(
                    'new contact created.', 
                    {
                        className:'success',
                        sposition:"right top"
                    }
                );
            }
        });
    });

    $.ajax({
        type: 'POST',
        url: '/user/fetch',
        dataType: 'json',
        success: function(response) {
            response.forEach(element => {
                var tableRow = '<tr id='+element.id+'><td>'
                                + element.username +'</td><td>'
                                + element.password +
                                '</td><td><button onclick="_delete('+element.id+')">x</button></td></tr>'; 
                $('tbody').append(tableRow);
            });        
        }
    });

    _delete = (id) => {
        var user = { userId: id };
        $.ajax({
            type: 'POST',
            url: '/user/delete',
            dataType: 'json',
            data: user,
            success: function(response) {
                $('tr#'+response.responseId).remove();
                $.notify(
                    response.msg, 
                    { 
                        className: 'success',
                        position:"right top"
                    }
                );  
            }
        });
    };
});
