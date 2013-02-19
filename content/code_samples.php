<div class="col1">
   <h2>Code Samples</h2>
   <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
   <script type="text/javascript" src="js/jquery-ui-1.8.4.custom.min.js"></script>
   <script type="text/javascript" src="js/jquery.simplemodal.1.4.min.js"></script>
   <script type="text/javascript">
      var modal = null;
      var modalActive = true;
      
      function openCodeSample(sampleName)
      {
         $.ajax
         ({
            url: 'ajax/ajax_handler.php',
            data: 'op=getCodeSample&sampleName=' + sampleName,
            dataType: 'json',
            type: 'post',
            success: function(responseData, textStatus, xhr)
            {
               if(responseData.success == true)
               {
                  $('#SampleDisplayDiv').html(responseData.data.content);
               }
            }
         });

         // code pop ups
         openModal();
      }
      function openModal(dialog)
      {
         if(modal == null && dialog == null)
         {
            $('#CodeSampleModal').modal( 
               {
                  autoPosition: true,
                  escClose: true,
                  overlayCss: { backgroundColor: 'rgb(0,0,0)' },
                  containerCss: { backgroundColor: 'rgb(255,255,255)', border: 'solid 1px black', width: '90%', height: '90%', overflow: 'hidden'},
                  onOpen: openModal,
                  onClose: closeModal
               }
               );
         }

         if(modalActive == false) { return; }

         // having a tough time getting the dialog Object, so set it here
         if(modal == null) { modal = dialog; }
         
         // if no dialog object is set, use the modal object
         if(dialog == null) { dialog = modal; }
   
         dialog.overlay.fadeIn('slow',
            function()
            {
               dialog.container.show();
               dialog.data.show();
            }
         );
      }
      
      function closeModal(dialog)
      {
         // having a tough time getting the dialog Object, so set it here
         if(modal == null) { modal = dialog; }
         
         // if no dialog object is set, use the modal object
         if(dialog == null) { dialog = modal; }

         dialog.container.hide();
         dialog.data.hide();
         dialog.overlay.hide();
      }
   </script>
   
   <div id="CodeSampleModal" style="display: none; overflow: hidden; margin: 10px; height: 95%;">
      <div style="overflow: hidden; width: 99%; margin-bottom: 5px;">
         <input id="CloseButton" style="float: right; padding: 5px;" type="button" value="Close Me" onclick="closeModal()" />
      </div>
      <div id="SampleDisplayDiv" style="border: dotted 1px black; font: 12px Courier; background-color: rgb(239, 255, 255); width: 99%; max-height: 90%; overflow: auto;">
      </div>
   </div>
    
   <p>
      Below are some code samples to give you an idea of how I structure my web applications:
   </p>
   <ul>
      <li>
         <a href="javascript: void(0);" onclick="openCodeSample('curl_sample')">Curl Sample</a>
         <p>
            Example of using the cURL library in PHP to request information from a remote service.
         </p>
      </li>
      <li>
         <a href="javascript: void(0);" onclick="openCodeSample('ajax_sample_client')">Ajax Sample, client side</a>
         <p>
            Example of using ajax and jQuery on the client side to request information from the application server.
         </p>
      </li>
      <li>
         <a href="javascript: void(0);" onclick="openCodeSample('ajax_sample_server')">Ajax Sample, server side</a>
         <p>
            Example of using PHP to handle ajax calls from the client.  Generally I use a single point of entry on
            the server side to handle all incoming ajax requests, and assign different server-side handlers to each
            request. If I want to add security features to check for login, permissions, or security on the IP level,
            it's much easier to add if a single point of entry is defined, as opposed to using several PHP files
            to handle different requests.
            
         </p>
      </li>
   </ul>
</div>