<?php
ob_start();
?>
<div class="entry">
   <div class="thumb">
      <a href="{link}" target="_blank"><img src="{imgSrc}" /></a>
   </div>
   <div class="description">
      <h3><a href="{link}" target="_blank">{name}</a></h3>
      {description}
   </div>
</div>
<?php
$htmlTemplate = ob_get_contents();
ob_end_clean();

require_once('include/PortfolioTemplate.php');
$myTemplate = new PortfolioTemplate($htmlTemplate, 'data/portfolio.xml');
$portfolioHtml = $myTemplate->createHtml();
?>

<div class="col1 portfolio">
   <h2>Work Samples and Demos</h2>
   <?php echo $portfolioHtml; ?>
</div>   <!--END Portfolio -->
