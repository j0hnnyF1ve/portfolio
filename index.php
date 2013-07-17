<?php require_once('include/config.php'); ?>
<?php include('include/header.php');?>
<!DOCTYPE html>
<html>
<head>
   <title>The Online Portfolio of John Pangilinan</title> 
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=0.5" />
   <link href="css/style.css" rel="stylesheet"  type="text/css" />
</head>

<body> 
   <div id="wrapper">
      <div id="header">
         <div id="top">
            <h1 class="title">
               <span class="name">John Pangilinan</span>
               <span class="subheading">Online Portfolio</span>
            </h1>
         </div> <!-- END TOP -->
         <div id="nav">
            <ul id="MenuNav">
               <?php echo $menuHtml; ?>
               <li><a class="contactmelink" href="javascript: void(0);" >Contact Me</a></li>
            </ul>
            <select id="DropdownNav">
               <option value="">Home</option>
               <option value="about">About</option>
               <option value="proficiencies">Proficiencies</option>
               <option value="design_philosophy">Design Philosophy</option>
               <option value="code_samples">Code Samples</option>
            </select>
            <a id="ContactMeLink" class="contactmelink" href="javascript: void(0);" >Contact Me</a>
         </div> <!-- END NAV -->
      </div> <!-- END HEADER -->
   
   
      <div id="content"> 
      <?php
         echo $content;
      ?>
      </div>  <!--END CONTENT-->
   
   </div>  <!--END WRAP--> 
   <div id="footer">
      <p>&copy; 2010-<?php echo date("Y"); ?> JohnPangilinan.com </a></p>
   </div> <!--END FOOTER-->
   <script type="text/javascript" src="js/jquery.js"></script>
   <script type="text/javascript" src="js/main.js"></script>
   <script type="text/javascript" src="js/jquery-ui-1.8.4.custom.min.js"></script>
   <script type="text/javascript" src="js/jquery.simplemodal.1.4.4.min.js"></script>
   <script type="text/javascript" src="js/component/Dialog.js"></script>

   <?php echo $scriptHtml; ?>
   <script>
     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

     ga('create', 'UA-42389290-2', 'johnpangilinan.com');
     ga('send', 'pageview');

   </script>
</body>
</html>