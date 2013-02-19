<?php
ob_start();

$page = (empty($_GET['page']) ? 'portfolio' : $_GET['page'] ) . '.php';

if(is_file('content/' . $page))
{
   include('content/' . $page);
   $content = ob_get_contents();
}
else
{
   include('content/not_found.php');
   $content = ob_get_contents();
}


ob_clean();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <title>John Pangilinan's Portfolio</title> 
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
   <link href="style.css" rel="stylesheet"  type="text/css" />
</head>

<body> 
   <div id="wrapper">
      <div id="header">
         <div id="toppy">
            <h1>Welcome to John Pangilinan's Portfolio page!</h1>
         </div> <!-- END TOPPY -->
         <div id="nav">
         <ul>
         <li><a href="index.php?page=portfolio" <?php if($page == 'portfolio.php' || empty($page)) echo 'class="selected"'; ?> >Home</a></li>
         <li><a href="index.php?page=proficiencies" <?php if($page == 'proficiencies.php') echo 'class="selected"'; ?> >Proficiencies</a></li>
         <li><a href="index.php?page=design_philosophy" <?php if($page == 'design_philosophy.php') echo 'class="selected"'; ?> >Design Philosophy</a></li>
         <li><a href="index.php?page=code_samples" <?php if($page == 'code_samples.php') echo 'class="selected"'; ?> >Code Samples</a></li>
         <li><a target="new" href="../resume/index.php">Resume</a></li>
<!--
         <li><a href="javascript: void(0);" >Contact Me</a></li>
-->
         </ul>
         
         </div> <!-- END NAV -->
         
      </div> <!-- END HEADER -->
   
   
      <div id="content"> 
      <?php
         echo $content;
      ?>
      </div>  <!--END CONTENT-->
   
   </div>  <!--END WRAP--> 
   
   <div id="footer">
      <p>© <?php echo date("Y"); ?> JohnPangilinan.com </a></p>
   </div> <!--END FOOTER-->

</body>
</html>