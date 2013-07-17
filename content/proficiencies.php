<?php
ob_start();
?>
      <li>
         <h3>{title}</h3>
         <h4>Rank: <span class="rank">{rank}</span></h4>
         {description}
      </li>
<?php
$htmlTemplate = ob_get_contents();
ob_end_clean();

require_once('include/PortfolioTemplate.php');
$myTemplate = new PortfolioTemplate($htmlTemplate, 'data/proficiencies.xml');
$proficienciesHtml = $myTemplate->createHtml();
?>

<div class="col1 proficiencies">
   <h2>Proficiencies</h2>
   <ul>
      <?php echo $proficienciesHtml; ?>
   </ul>
</div>