(function() {
"use strict"

var DisneyDialog = null;
var Helper = generateHelper();
var Disney = generateDisney();
var UI = generateUI();

$(function() {
  DisneyDialog = new Dialog( {width: "85%", height: "85%", id: 'DisneyModal'} );

  // add a new instance specific method for the Disney Dialog
  DisneyDialog.changeDescription = function(descriptionHtml) {
    $('#' + this.dialogId + ' .description').html(descriptionHtml);
  }

  // populate the UI with our thumbnails for each section
  let disneyTypes = Disney.getTypes();
  for(let index in disneyTypes ) {
    UI.populate(disneyTypes[index], Disney.getAssets(disneyTypes[index]) );
  }

  // set our event handlers
  $('.imageset img').click( UI.imageClick )
  $('#DisneyModalPrevious').click( UI.prev );
  $('#DisneyModalNext').click( UI.next );
});

function generateUI() {

  function populate(className, assets) {
    for(let i=0; i < assets.length; i++) {
      let asset = assets[i];
      $('.'+ className +' .imageset').append( Helper.createThumb(asset, i) );
    }
  }

  function imageClickHandler(e) {
    e.preventDefault();
    Disney.setActiveType( this.dataset.type );
    Disney.setIndex( this.dataset.index );
    DisneyDialog.changeDisplay( Helper.createImage( this.dataset ) );
    DisneyDialog.changeDescription( $('<p>' + this.dataset.description + '</p>') );
    DisneyDialog.openModal();
  }

  function prevHandler(e) {
    e.preventDefault();
    Disney.prev();
    DisneyDialog.changeDisplay( Helper.createImage( Disney.getCurrentImage() ) );
    DisneyDialog.changeDescription( $('<p>' + Disney.getCurrentImage().description + '</p>') );
  }

  function nextHandler(e) {
    e.preventDefault();
    Disney.next();
    DisneyDialog.changeDisplay( Helper.createImage( Disney.getCurrentImage() ) );
    DisneyDialog.changeDescription( $('<p>' + Disney.getCurrentImage().description + '</p>') );
  }

  return {
    populate : populate,
    imageClick : imageClickHandler,
    prev : prevHandler,
    next : nextHandler
  }
}

function generateHelper() {
  return {
    createThumb : function(imgObj, index) {
      let img = new Image();
      img.src = imgObj.thumb;
      img.alt = imgObj.alt;
      for(let prop in imgObj) { img.dataset[prop] = imgObj[prop]; }
      img.dataset.index = index;

      return img;
    },
    createImage : function(imgObj) {
      let img = new Image();
      img.src = imgObj.src;
      img.alt = imgObj.alt;
      for(let prop in imgObj) { img.dataset[prop] = imgObj[prop]; }

      return img;
    }
  }
}

function generateDisney() {
  var _active = 'features';
  var _current = 0; // current index

  var _assets = {
    features : [
      { thumb: "assets/Disney/features/dashboard_thumb.jpg",
        src: "assets/Disney/features/dashboard.jpg",
        description: "The App Dashboard, allows the user to change channels.",
        alt: "App Dashboard"
      },
      { thumb: "assets/Disney/features/player_playlist_thumb.jpg",
        src: "assets/Disney/features/player_playlist.jpg",
        description: "The App player and playlist, which comprises the main UI for the user.",
        alt: "App Player and Playlist"
      },
      { thumb: "assets/Disney/features/player_overlay_thumb.jpg",
        src: "assets/Disney/features/player_overlay.jpg",
        description: "Suggestions show up after the user is finished playing the video, in order to encourage them to continue consuming more content.",
        alt: "App Player and Overlay"
      },
      { thumb: "assets/Disney/features/search_thumb.jpg",
        src: "assets/Disney/features/search.jpg",
        description: "The search bar shows up when the user starts typing, similar to an auto-suggest",
        alt: "App Search Bar"
      }
    ],
    responsive : [
      { thumb: "assets/Disney/responsive/1UP_thumb.jpg",
        src: "assets/Disney/responsive/1UP.jpg",
        description: "The Mobile (1UP) Experience",
        alt: "1UP (Mobile)"
      },
      { thumb: "assets/Disney/responsive/2UP@350px_thumb.jpg",
        src: "assets/Disney/responsive/2UP@350px.jpg",
        description: "The Tablet (2UP) Experience",
        alt: "2UP (Tablet)"
      },
      { thumb: "assets/Disney/responsive/3UP@400px_thumb.jpg",
        src: "assets/Disney/responsive/3UP@400px.jpg",
        description: "The Laptop (3UP) Experience",
        alt: "3UP (Laptop)"
      }
    ],
    analytics : [
      { thumb: "assets/Disney/prototypes/analytics/bar_chart_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/bar_chart.jpg",
        description: "Bar Chart Tab",
        alt: "Bar Chart Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/line_chart_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/line_chart.jpg",
        description: "Line Chart Tab",
        alt: "Line Chart Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/channels_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/channels.jpg",
        description: "Channel Metrics Tab",
        alt: "Channel Metrics Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/clips_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/clips.jpg",
        description: "Video Clips Metrics Tab",
        alt: "Video Clips Metrics Tab",
      },
      { thumb: "assets/Disney/prototypes/analytics/daily_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/daily.jpg",
        description: "Daily Metrics Tab",
        alt: "Daily Metrics Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/search_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/search.jpg",
        description: "Search Metrics Tab",
        alt: "Search Metrics Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/tags_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/tags.jpg",
        description: "Tags Metrics Tab",
        alt: "Tags Metrics Tab"
      }
    ],
    prototypeEmbed : [
      { thumb: "assets/Disney/prototypes/embed/embed_thumb.jpg",
        src: "assets/Disney/prototypes/embed/embed.jpg",
        description: "Embedded Clips Experience",
        alt: "Embedded Clips Experience"
      }
    ],
    prototypeMyNews : [
      { thumb: "assets/Disney/prototypes/mynews/dashboard_1_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_1.jpg",
        description: "My News Experience Dashboard",
        alt: "My News Experience Dashboard"
      },
      { thumb: "assets/Disney/prototypes/mynews/dashboard_2_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_2.jpg",
        description: "My News Experience Dashboard - Bottom Menu",
        alt: "My News Experience Dashboard"
      },
      { thumb: "assets/Disney/prototypes/mynews/dashboard_3_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_3.jpg",
        description: "My News Experience Dashboard - Highlight",
        alt: "My News Experience Dashboard - Selection Highlight"
      },
      { thumb: "assets/Disney/prototypes/mynews/dashboard_transition_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_transition.jpg",
        description: "My News Experience Dashboard - Transition",
        alt: "My News Experience Dashboard - Transition"
      },
      { thumb: "assets/Disney/prototypes/mynews/mynews_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/mynews.jpg",
        description: "My News Experience - Video Page 1",
        alt: "My News Experience - Video Page 1"
      },
      { thumb: "assets/Disney/prototypes/mynews/mynews_2_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/mynews_2.jpg",
        description: "My News Experience - Video Page 2",
        alt: "My News Experience - Video Page 2",
      }
    ],
    prototypeTube : [
      { thumb: "assets/Disney/prototypes/tube/dashboard_thumb.jpg",
        src: "assets/Disney/prototypes/tube/dashboard.jpg",
        description: "Tube Experience - Dashboard",
        alt: "Tube Experience - Dashboard",
      },
      { thumb: "assets/Disney/prototypes/tube/dashboard_2_thumb.jpg",
        src: "assets/Disney/prototypes/tube/dashboard_2.jpg",
        description: "Tube Experience - Dashboard 2",
        alt: "Tube Experience - Dashboard 2",
      },
      { thumb: "assets/Disney/prototypes/tube/tube_display_thumb.jpg",
        src: "assets/Disney/prototypes/tube/tube_display.jpg",
        description: "Tube Experience - Video Page - Note the multiple playlists",
        alt: "Tube Experience - Video Page",
      },
      { thumb: "assets/Disney/prototypes/tube/tube_thumb.jpg",
        src: "assets/Disney/prototypes/tube/tube.jpg",
        description: "Tube Experience - Video Page 2",
        alt: "Tube Experience - Video Page 2",
      },
      { thumb: "assets/Disney/prototypes/tube/tube_with_search_results_thumb.jpg",
        src: "assets/Disney/prototypes/tube/tube_with_search_results.jpg",
        description: "Tube Experience - Search Results",
        alt: "Tube Experience - Search Results",
      }
    ]
  }

  var _types = ['features', 'responsive', 'analytics', 'prototypeEmbed', 'prototypeMyNews', 'prototypeTube'];

  for(let i=0; i < _types.length; i++) {
    for(let j=0; j < _assets[_types[i]].length; j++) {
      _assets[_types[i]][j].type = _types[i];
    }
  }

  function getAssets(type) {
    return (  (_types).includes(type) ) ? _assets[type] : [];
  }

  function getTypes() {
    return _types;
  }

  function setActiveType(active) {
    _active = (  (_types).includes(active) ) ? active : '';
  }

  function getActiveType() { return _active; }
  function setIndex(index) {
    if(index >= 0 && index < _assets[_active].length) { _current = index; }
  }
  function getIndex() { return _current; }
  function prev() { setIndex( parseInt(getIndex(), 10) - 1 ); }
  function next() { setIndex( parseInt(getIndex(), 10) + 1 ); }

  function getCurrentImage() {
    return _assets[_active][_current];
  }

  return {
    // methods
    getAssets : getAssets,
    getTypes : getTypes,
    setActiveType : setActiveType,
    getActiveType : getActiveType,
    setIndex : setIndex,
    getIndex : getIndex,
    prev : prev,
    next : next,
    getCurrentImage : getCurrentImage
  };
}

})(); // end of js file
