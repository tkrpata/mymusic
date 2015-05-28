var cardData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Add User button click
    $('#btnAddCard').on('click', addCard);

    $("#inputSearch").autocomplete({ 
      source: function (request, response) { 
        $.ajax({ 
          type: "GET", 
          contentType: "application/json; charset=utf-8", 
          url: "https://api.spotify.com/v1/search",
          data: "type=track&limit=1&q=" + $('#inputSearch').val(),
          dataType: "json", 
          success: function (data) { 
            $.each (data.tracks.items, function (index,i) {
              var artist = "";
              var track = "";
              var uri = "";

              track = i.name;
              uri = i.external_urls.spotify;
              var artists = [];
              $.each (i.artists, function (index,a) {
                artists.push(a.name);
              });
              artist = artists.join("/");
              console.log(artist,track,uri);
              $('#inputTrack').val(uri);
              $('#searchresult').text(artist + " - " + track);
              $('#searchresult').show();
              $('#preview').attr('src', "https://embed.spotify.com/?uri=" + encodeURI($('#inputTrack').val()));
            });
          } 
        }); 
      }, 
      minLength: 2, 
      select: function (event, ui) { 
                    
      }, 
      open: function () { 
        $(this).removeClass("ui-corner-all").addClass("ui-corner-top"); 
      }, 
      close: function () { 
        $(this).removeClass("ui-corner-top").addClass("ui-corner-all"); 
      }, 
      error: function (XMLHttpRequest, textStatus, errorThrown) { 
        alert(textStatus); 
      } 
    }); 

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


function search(event) {
  alert($('#inputSearch').text());
}


