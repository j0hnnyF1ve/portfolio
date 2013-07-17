
<div class="col1 code_samples">
   <h2>Code Samples</h2>
  
   <div class="modal" id="CodeSampleModal" >
      <div class="menubar" >
         <input class="closeButton" type="button" value="X" />
      </div>
      <div class="display" >
      </div>
   </div>
    
   <p>
      Below are some code samples to give you an idea of how I structure my web applications (Links will open a new window):
   </p>
   <ul>
      <li>
         <h3><a id="CurlSampleLink" >Curl Sample</a></h3>
         <p>
            Example of using the cURL library in PHP to request information from a remote service.
         </p>
      </li>
      <li>
         <h3><a id="AjaxSampleClientLink" >Ajax Sample, client side</a></h3>
         <p>
            Example of using ajax and jQuery on the client side to request information from the application server.
         </p>
      </li>
      <li>
         <h3><a id="AjaxSampleServerLink" >Ajax Sample, server side</a></h3>
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