(function(){
"use strict"

  // global variable for the contact form
  var ContactForm; // will be of type:Dialog, assigned in init()
  var Form = new Object();

  Form.sendButtonHandler = function(e) {
    e.preventDefault();

    var errors = Form.checkForm();
    if( !errors ) { handleSuccess(); }
    else { handleErrors(); }

    function handleSuccess() {
      $('#ContactForm .statusMessage').html('');
      Form.sendEmail();
    }

    function handleErrors() {
      var message = '';

      for(var index in errors) { message += '<li>' + errors[index] + '</li>'; }

      if(message.length > 0) { message = '<div>The following fields have errors <ul style="text-transform: capitalize">' + message + '</ul>'; }
      $('#ContactForm .statusMessage').html( message );
    }
  }

  Form.checkForm = function()
  {
    var inputs = $('#ContactForm').find('input[type="text"], textarea');
    var errorMessage = [];
    for(var index in inputs) {
      var input = inputs[index];
      if(input.value <= 0) { errorMessage.push(input.className ); }
    }
    return (errorMessage.length > 0) ? errorMessage : '';
  }

  Form.sendEmail = function()
  {

    $('#EmailSubject').val( $('#EmailSubject').val() + ' - ' + $('#EmailAddress').val() )

      $.ajax({
          url: "https://formspree.io/john.pangilinan1@gmail.com",
          method: "POST",
          data: $("#ContactForm form").serialize(),
          dataType: "json",
          beforeSend: beforeSendHandler,
          success: successHandler,
          error: errorHandler,
          complete: completeHandler
      });

      beforeSendHandler();

    function beforeSendHandler(xhr, settings) {
      $('#ContactForm .statusMessage').html('Sending your email...');
      $('#EmailSend').attr({disabled: true});
      $('#ContactForm .closeButton').attr({ disabled: true });
    }

    function successHandler(response, textStatus, xhr) {
       if(response.success == "email sent") { handleSuccess(); }
       else { handleErrors(); }

       function handleSuccess() {
           // code pop ups
          $('#ContactForm .statusMessage').html("Your message has been sent successfully!");
          setTimeout( function() { ContactForm.closeModal(); }, 10000);
       }

       function handleErrors() {
         var message = '';
         if(response.message.length > 0) {
           message = '<div>' + response.message + '<ul style="text-transform: capitalize">' + message + '</ul>';

           for(index in response.data)
           { message += '<li>' + response.data[index] + '</li>'; }

           $('#ContactForm .statusMessage').html( message );
         }
       }
    }

    function errorHandler(xhr, textStatus, errorThrown) {
      $('#ContactForm .statusMessage').html( "There was an error sending the email" );
      console.error(xhr, textStatus, errorThrown);
    }

    function completeHandler(xhr, textStatus) {
      $('#EmailSend').attr({disabled: false});
      $('#ContactForm .closeButton').attr({ disabled: false });
    }

  }

  function getPage()
  {
    var url = window.location.href;
    var start = url.indexOf('page='),
        end = (url.indexOf('&', url.indexOf('page=') ) >= start) ? url.indexOf('&', url.indexOf('page=') ) : null;
    var pageString = (end) ? url.substring(start, end) : url.substring(start);

    var page = '';
    if(pageString) { page = pageString.substring(('page=').length); }
    return page;
  };

  function setSelectedNav(page)
  {
    if(page)
    {
      $('#nav a[href*="' + page + '"]').addClass('selected');
      $('#DropdownNav').val(page);
      var pageTitle = page.replace('_', ' ');
    }
    else
    {
      $('#nav a:eq(0)').addClass('selected');
      $('#DropdownNav').val('');
    }
  }

  function dropdownNavHandler(event)
  {
    window.location.href = (event.target.value) ? "index.php?page=" + event.target.value : "index.php";
  }

  function init() {

    setSelectedNav( getPage() );
    $('#DropdownNav').on('change', dropdownNavHandler);

    $('body').append('<div class="modal" id="ContactForm" ><div class="menubar"><input class="closeButton" type="button" value="X" /></div><div class="display"></div></div>');

    var formHtml = '<form action="https://formspree.io/john.pangilinan1@gmail.com" method="POST">'

    formHtml += '<div><label>Name:</label></div>';
    formHtml += '<div><input type="text" name="_name" class="name" id="EmailName" value="" /></div>';
    formHtml += '<div><label>Email:</label></div>'
    formHtml += '<div><input type="text" name="_replyto" class="email" id="EmailAddress" value="" /></div>';
    formHtml += '<div><label>Subject:</label></div>';
    formHtml += '<div><input type="text" name="_subject" class="subject" id="EmailSubject" value="Inquiry about your Portfolio" /></div>';
    formHtml += '<div><label>Message:</label></div>';
    formHtml += '<div><textarea name="message" class="body" id="EmailBody" /></div>';
    formHtml += '<div class="endForm"><button class="sendButton" id="EmailSend" type="submit">Send Email</button></div>';
  //  formHtml += '<div class="endForm"><button class="sendButton" id="EmailSend" >Send Email</button></div>';
    formHtml += '<div class="statusMessage"></div>';
    formHtml += '<input type="hidden" type="text" name="_gotcha"';
    formHtml += '</form>';

    ContactForm = new Dialog( {width: "80%", height: "475px", id: 'ContactForm'} );
    ContactForm.changeDisplay(formHtml);

/*
    // Form Testing Data
    $('#ContactForm #EmailName').val("Test");
    $('#ContactForm #EmailAddress').val("test@test.com");
    $('#ContactForm #EmailBody').val("Test AJAX: " + new Date() );
*/

    $('#ContactForm form').submit(Form.sendButtonHandler)
    $('#MenuNav .contactmelink').on('click', function() { ContactForm.openModal(); } );
  }

  // initialize the application
  $(init);

})();
// END main.js
