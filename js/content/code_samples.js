var myDialog = null;

(function() {
"use strict"

   var openCodeSample = function(sampleName)
   {
      $.ajax
      ({
         url: 'remote.php?op=getCodeSample',
         data: 'sampleName=' + sampleName,
         dataType: 'json',
         type: 'post',
         success: function(responseData, textStatus, xhr)
         {
            if(responseData.success == true)
            {
               // code pop ups
               myDialog.changeDisplay(responseData.data.content);
               myDialog.openModal();
            }
         }
      });
   };


   $(function()
   {
      $('#CurlSampleLink').on('click', function() { openCodeSample('curl_sample') });
      $('#AjaxSampleClientLink').on('click', function() { openCodeSample('ajax_sample_client') });
      $('#AjaxSampleServerLink').on('click', function() { openCodeSample('ajax_sample_server') });

      $('.code_samples a')
         .on('mouseover', function() { document.body.style.cursor = 'pointer'; })
         .on('mouseout', function() { document.body.style.cursor = 'default'; })

      myDialog = new Dialog( {width: "85%", height: "85%", id: 'CodeSampleModal'} );
   });

})();
