var cardData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Add User button click
    $('#btnAddCard').on('click', addCard);
    return false;

});

// Functions =============================================================

function addCard(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addCard input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newCard = {
            'id': $('#addCard fieldset input#inputCardId').val(),
            'track': $('#addCard fieldset input#inputTrack').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: newCard,
            url: '/cards/updatecard',
            dataType: 'JSON'
        }).done(function( response ) {


            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addCard fieldset input').val('');
                $('#statusmessage').css("color","green");
                $('#statusmessage').text("Success!");

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
                $('#statusmessage').css("color","red");
                $('#statusmessage').text("Error: " + response.msg);

            }

            $('#statusmessage').show()
        });
    }
    else {
        // If errorCount is more than 0, error out
        //alert('Please fill in all fields');
        $('#statusmessage').css("color","red");
        $('#statusmessage').text("Please fill in all fields");
        return false;
    }
};


