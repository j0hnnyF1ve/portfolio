<?php
  $magUrl = [
    'assets/Magnify360/intuitProSeries/index.html',
    'assets/Magnify360/intuitHomestead/index.html'
  ];

  $imgUrl = [
    'assets/Magnify360/intuitProSeries.png',
    'assets/Magnify360/intuitHomestead.png'
  ];
?>

<div class="col1">
   <h2>Magnify360 Projects</h2>
   <p>
      Here are some of the projects that I've worked on during my time at Magnify360.com. Please note that most links
      are disabled in these sample layouts, as these layouts are meant for display only.
   </p>

   <div class="entry">
      <div class="thumb">
         <a href="<?php echo $magUrl[0]; ?>" target="_new"><img src="<?php echo $imgUrl[0]; ?>" /></a>
         <h3><a href="<?php echo $magUrl[0]; ?>" target="_new">Intuit ProSeries Tax Variation</a></h3>
      </div>
      <div class="description">
         <p>
            The Intuit ProSeries Tax variation of the Intuit ProSeries site was one mockup that I enjoyed doing.
            Probably the most notable feature of the layout is the horizontal sliding accordion tab layout in the
            center part of the page.
         </p>
      </div>
   </div>

   <div class="entry">
      <div class="thumb">
         <a href="<?php echo $magUrl[1]; ?>" target="_new"><img src="<?php echo $imgUrl[1]; ?>" /></a>
         <h3><a href="<?php echo $magUrl[1]; ?>" target="_new">Intuit Homestead Variation</a></h3>
      </div>
      <div class="description">
         <p>
            The Intuit Homestead variation of the Intuit Homestead site features a double tab layout below the fold.
            Clicking on the tabs changes the content within the tabbed section, while clicking on the photos in the first
            tab section displays different content for that tab.
         </p>
      </div>
   </div>

</div>
