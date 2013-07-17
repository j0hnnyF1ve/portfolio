(function(){
"use strict"

var contactForm;

$(function() 
{
  setSelectedNav( getPage() );
  $('#DropdownNav').on('change', dropdownNavHandler);

  $('body').append('<div class="modal" id="ContactForm" ><div class="menubar"><input class="closeButton" type="button" value="X" /></div><div class="display"></div></div>');

  var formHtml = '<div><label>Name:</label></div>';
  formHtml += '<div><input type="text" class="name" id="EmailName" value="" /></div>';
  formHtml += '<div><label>Email:</label></div>'
  formHtml += '<div><input type="text" class="email" id="EmailAddress" value="" /></div>';
  formHtml += '<div><label>Subject:</label></div>';
  formHtml += '<div><input type="text" class="subject" id="EmailSubject" value="Inquiry about your Portfolio" /></div>';
  formHtml += '<div><label>Message:</label></div>';
  formHtml += '<div><textarea class="body" id="EmailBody" /></div>';
  formHtml += '<div class="endForm"><button class="sendButton" id="EmailSend">Send Email</button></div>';
  formHtml += '<div class="statusMessage"></div>';

  contactForm = new Dialog( {width: "40%", height: "550px", id: 'ContactForm'} );
  contactForm.changeDisplay(formHtml);

  $('#ContactForm .sendButton').on('click', sendButtonHandler );

  $('#MenuNav .contactmelink').on('click', function() { contactForm.openModal(); } );

});

var sendButtonHandler = function()
{
  var errors = checkForm();
  if( !errors )
  {
    $('#ContactForm .statusMessage').html('');
    sendEmail();
  }
  else
  {
    var message = '';
    for(var index in errors)
    {
      message += '<li>' + errors[index] + '</li>';
    }
    if(message.length > 0) { message = '<div>The following fields have errors <ul style="text-transform: capitalize">' + message + '</ul>'; }
    $('#ContactForm .statusMessage').html( message );
  }
}

var checkForm = function()
{
  var inputs = $('#ContactForm').find('input[type="text"], textarea');
  var errorMessage = [];
  for(var index in inputs)
  {
    var input = inputs[index];
    if(input.value <= 0)
    {
      errorMessage.push(input.className )
    }
  }
  return (errorMessage.length > 0) ? errorMessage : '';
}

var sendEmail = function()
{
  var name = encodeURIComponent( $('#EmailName').val() );
  var email = encodeURIComponent( $('#EmailAddress').val() );
  var subject = encodeURIComponent( $('#EmailSubject').val() ) + ' - ' + email;
  var body = encodeURIComponent( $('#EmailBody').val() );

  $.ajax
  ({
     url: 'remote.php?op=sendEmail',
     data: 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + body,
     dataType: 'json',
     type: 'post',
     success: function(response, textStatus, xhr)
     {
        if(response.success == true)
        {
           // code pop ups
          $('#ContactForm .statusMessage').html(response.message);
          setTimeout( function() { contactForm.closeModal(); }, 5000);
        }
        else
        {
          var message = '';
          if(response.message.length > 0) 
          { 
            message = '<div>' + response.message + '<ul style="text-transform: capitalize">' + message + '</ul>'; 
            for(index in response.data)
            {
              message += '<li>' + response.data[index] + '</li>';
            }
            $('#ContactForm .statusMessage').html( message );
          }
        }

     }
  });

}

var getPage = function()
{
  var url = window.location.href;
  var start = url.indexOf('page='),
      end = (url.indexOf('&', url.indexOf('page=') ) >= start) ? url.indexOf('&', url.indexOf('page=') ) : null;
  var pageString = (end) ? url.substring(start, end) : url.substring(start);

  var page = '';
  if(pageString)
  {
    page = pageString.substring(('page=').length);
  }
  return page;
};

var setSelectedNav = function(page)
{
  if(page)
  {
    $('#nav a[href*="' + page + '"]').addClass('selected');
    $('#DropdownNav').val(page);
    var pageTitle = page.replace('_', ' ');
//    $('#top .title .subheading').html( pageTitle);
  }
  else
  {
    $('#nav a:eq(0)').addClass('selected'); 
    $('#DropdownNav').val('');
  }
}

var dropdownNavHandler = function(event)
{
  if(event.target.value)
  {
    window.location.href = "index.php?page=" + event.target.value;
  }
  else
  {
    window.location.href = "index.php";
  }
}

})();
// END main.js