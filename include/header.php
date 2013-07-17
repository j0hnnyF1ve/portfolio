<?php
$scriptHtml = '';

ob_start();
$pageName = (empty($_GET['page']) ? 'portfolio' : $_GET['page'] );
$page = $pageName . '.php';
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

$pageScriptPath = 'js/content/' . $pageName . '.js';

if( is_file($pageScriptPath) )
{
  $scriptHtml .= '<script type="text/javascript" src="'. $pageScriptPath.'"></script>';
}

$menuArray = array('Home' => '', 'About' => 'about', 'Proficiencies' => 'proficiencies', 'Design Philosophy' => 'design_philosophy', 'Code Samples' => 'code_samples');
$menuHtml = '';
foreach($menuArray as $menuName => $menuItem)
{
	$menuHtml .= '<li><a href="'.APP_ROOT.'/'.$menuItem.'">'.$menuName.'</a></li>';
}

/*
<!--
               <li><a href="index.php">Home</a></li>
               <li><a href="index.php?page=about">About</a></li>
               <li><a href="index.php?page=proficiencies">Proficiencies</a></li>
               <li><a href="index.php?page=design_philosophy">Design Philosophy</a></li>
               <li><a href="index.php?page=code_samples">Code Samples</a></li>
-->
*/

?>
