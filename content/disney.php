<?php
// js/content/disney.js is the script file for this page
?>
<div class="col1">

<h2>Disney/ABC OTV (Owned TV) Clips Video Project</h2>
<div class="entry introduction">
  <p>
    The Disney/ABC OTV (Owned TV) project was an ambitious project with the goal of
    bringing together various "clips" content, short length video, spread out throughout
    the Disney/ABC media conglomerate.
  </p>
  <p>
    My team's role in this project was to build out
    a new UI and backend, with the backend using Disney's proprietary content management
    system, to power the next generation of Disney Owned local news stations, of which
    there were 8 at the time of this project.
  </p>
  <p>
    Disney Owned denotes that Disney is the principle owner, to separate from
    the numerous affiliate owned stations under the Disney/ABC network.
  </p>
  <p>
    Click on any of the thumbnails to learn more about the different parts of the UI
    that I worked on.
  </p>
</div>

<div class="modal" id="DisneyModal" >
  <div class="menubar">
    <input class="closeButton" type="button" value="X" />
  </div>
  <div class="display" ></div>
  <div class="description"></div>
  <div class="controls">
    <button class="previous" id="DisneyModalPrevious">Previous</button>
    <button class="next" id="DisneyModalNext">Next</button>
  </div>
</div>

<div class="entry features">
  <h5>Development of the Application</h5>
  <div class="imageset" ></div>
  <div class="description">
    <p>
      The current application is a SPA (Single Page Application) sitting within an iFrame.
    </p>
    <p>
      We wanted to give users the ability to select a themed "channel", similar to a playlist
      but with content curated by a team based on a theme.
    </p>
    <p>
      Once the user clicks on a channel, a UI is generated with the playlist associated
      with this channel, and the first video in the playlist.
    </p>
    <p>
      Suggestions were added after a video was finishing playing to encourage the user
      to consume more content.
    </p>
    <p>
      When a user searches for a video, we present them a custom playlist preview, similar to
      an auto-suggest, but with videos.
    </p>
    <p>
      We also collected numerous metrics on the usage behavior of our users in order to
      give feedback to future teams on how the application was being used.  This included
      video viewing behavior, as well as innoculous actions like user clicks on the page.
    </p>
    <p>
      See prototypes below for examples of other experiences in the design phase.
    </p>
  </div>
</div>

<div class="entry responsive">
  <h5>Responsive Design</h5>
  <div class="imageset" ></div>
  <div class="description">
    <p>
      The page was designed to work in mobile, tablet, and laptop/desktop experiences,
      heretofore termed as 1UP, 2UP, and 3UP experiences, respectively.
    </p>
    <p>
      The video player, playlist, navigation elements were all resized depending
      on the experience to deliver the optimal viewing for the user based on
      the form factor of the device they were using.
    </p>
  </div>
</div>

<div class="entry analytics">
  <h5>Analytics</h5>
  <div class="imageset" ></div>
  <div class="description">
    <p>
      We collected numerous analytics detailing user behavior, what they liked to watch,
      what channels they frequented.
    </p>
    <p>
      Interested parties were able to view the reports in two formats, bar and line charts.
    </p>
    <p>
      We also provided analytics on channel usage, popular clips, search bar usage,
      and daily reporting.
    </p>
  </div>
</div>

<div class="entry prototypeEmbed">
  <h5>Embedded Prototype</h5>
  <div class="imageset" ></div>
  <div class="description">
    <p>
      The Embedded Clips Prototype was a stripped down version of the full experience,
      that allowed us to embed the Prototype on any page on the website, giving any page
      or website to syndicate ABC Local News content on their site.
    </p>
  </div>
</div>

<div class="entry prototypeMyNews">
  <h5>My News Prototype</h5>
  <div class="imageset" ></div>
  <div class="description">
    <p>
      The My News Prototype was an enhanced version of the Embedded Clips Prototype.
      The idea behind it was to provide a "Lean Back" experience for the user.
    </p>
    <p>
      The user would select up to three themes that they would like to see in their
      content, as well as the duration of the playlist.
    </p>
    <p>
      Our engine would spin up a playlist based on the themes that they
      selected.
    </p>
    <p>
      This would work well in scenarios where the user just wants to watch some content
      without having to put too much thought into it, such as a person getting home
      after work, or a parent that wants to provide content for a small child to watch
      unsupervised.
    </p>
  </div>
</div>

<div class="entry prototypeTube">
  <h5>YouTube Prototype</h5>
  <div class="imageset" ></div>
  <div class="description">
    <p>
      The YouTube Prototype is similar to the final version live on the website, except
      that it's meant to be a standalone website as a opposed to being embedded within
      a page.
    </p>
    <p>
      The key distinction is that we wanted to provide multiple streams of content
      that the user can select from. This is evident in the screenshots, where multiple
      playlists are visible to the user.
    </p>
  </div>
</div>

</div>
