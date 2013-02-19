<?php
$op = $_POST['op'];
switch($op)
{
   case 'getCodeSample':
      $sampleName = $_POST['sampleName'];
      $response = getCodeSample($sampleName);
      break;
   default:
      $response = createMessage(false, 'A valid operation ID was not supplied');
      break;
}
if(!empty($response))
{
   echo createJsonMessage($response['success'], $response['message'], $response['data']);  
}

function getCodeSample($sampleName)
{
   $contents = file_get_contents('../codeSamples/' . $sampleName . '.htm');
   if(!empty($contents) )
   {
      $contents = str_replace('<', '&lt;', $contents);
      $contents = str_replace('>', '&gt;', $contents);
      $contents = str_replace(chr(10), '<br/>', $contents);
      $contents = str_replace(' ', '&nbsp;', $contents);
   }
   
   return createMessage(true, 'Code sample created', array('content' => $contents) );
}


// createMessage creates a specific formatted array for use throughout the server
// success is a boolean (true or false) indicating if the operation was successful
// message is an optional message to display to the user
// data is an array containing data to be passed back
function createMessage($success, $message = '', $data = array())
{
  return array('success' => $success, 'message' => $message, 'data' => $data);
}

// createJsonMessage takes a specific formatted array for use throughout the server, and outputs a json encoded string
// success is a boolean (true or false) indicating if the operation was successful
// message is an optional message to display to the user
// data is an array containing data to be passed back
function createJsonMessage($success, $message = '', $data = array() )
{
  return json_encode(createMessage($success, $message, $data) );
}

?>