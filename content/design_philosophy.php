<?php
ob_start();
?>
      <li>
         <h3>{title}</h3>
         {description}
      </li>
<?php
$htmlTemplate = ob_get_contents();
ob_end_clean();

require_once('include/PortfolioTemplate.php');
$myTemplate = new PortfolioTemplate($htmlTemplate, 'data/design_philosophy.xml');
$designPhilosophyHtml = $myTemplate->createHtml();
?>

<div class="col1 design_philosophy">
   <h2>My Design Philosophy</h2>
   <p>
      I generally follow a few tenets whenever I'm developing websites, doing maintenance, or adding new features to a website:
   </p>
   
   <ul>
      <?php echo $designPhilosophyHtml; ?>
   </ul>
</div>