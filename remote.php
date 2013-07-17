<?php
$op = $_GET['op'];
switch($op)
{
    case 'getCodeSample':
      $sampleName = $_POST['sampleName'];
      $response = getCodeSample($sampleName);
      break;
    case 'sendEmail':
      $validationResponse = validateEmail($_POST);
      if( $validationResponse['success'] == true)
      {
        sendEmail($_POST);
      }
      else
      {
        $response = $validationResponse;
      }
      break;
    default:
      $response = createMessage(false, 'A valid operation ID was not supplied');
      break;
}
if(!empty($response))
{
   echo createJsonMessage($response['success'], $response['message'], $response['data']);  
}

function validateEmail($inputs)
{
  $validEmail = true;
  $message = '';
  $data = array();
  foreach($inputs as $key => $value)
  {
    if(empty($value) || strlen($value) <= 0)
    {
      $validEmail = false;
      array_push($data, 'The "'.ucfirst($key).'" field is required.');
    }
    switch($key)
    {
      case 'email':
        if(preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i', $value) < 1)
        {
          $validEmail = false;
          array_push($data, "Email address supplied is invalid");
        }
        break;
      default:
        break;
    }
  }
  if(!empty($data))
  {
    $message = 'The following fields have errors';
  }


  return createMessage( $validEmail, $message, $data );
}

function sendEmail($inputs)
{
  $name = $inputs['name'];
  $email = strtolower($inputs['email']);
  $subject = $inputs['subject'];
  $message = $inputs['message'];

  $to = 'john.pangilinan1@gmail.com';
  $addlHeaders  = 'From: "'.$name.'" <'.$email.'>' .chr(10);
  $addlHeaders .= 'From: "'.$name.'" <'.$email.'>';

  if( mail($to, $subject, $message, $addlHeaders) )
  {
    echo createJsonMessage(true, 'Your Message has been sent');  
  }
  else
  {
    echo createJsonMessage(false, 'There was a problem sending your message.');  
  }
}

function getCodeSample($sampleName)
{
   $contents = file_get_contents('codeSamples/' . $sampleName . '.htm');
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