(function() {
"use strict"

var DisneyDialog = null;
var Helper = generateHelper();
var Disney = generateDisney();
var UI = generateUI();
var PreloaderManager = generatePreloaderManager();

$(function() {
  const disneyTypes = Disney.getTypes();
  var thumbUrlList = Disney.getThumbList();
  var imageUrlList = Disney.getUrlList();

  PreloaderManager.addLoader('thumb', generatePreloader('thumb') );
  PreloaderManager.getLoader('thumb').addList(thumbUrlList);
  PreloaderManager.getLoader('thumb').loadImages();

  DisneyDialog = new Dialog( {width: "85%", height: "85%", id: "DisneyModal"} );

  // add a new instance specific method for the Disney Dialog
  DisneyDialog.changeDescription = function(descriptionHtml) {
    $("#" + this.dialogId + " .description").html(descriptionHtml);
  };

  // populate the UI with our thumbnails for each section
  for(let index in disneyTypes ) {
    UI.populate(disneyTypes[index], Disney.getAssets(disneyTypes[index]) );
  }

  // set our event handlers
  $(".imageset img").click( function(e) {
    UI.imageClick.apply(this, [e]);
    $(window).on("keydown", UI.keydown);
  } );
  $("#DisneyModalPrevious").click( UI.prev );
  $("#DisneyModalNext").click( UI.next );
  $("#content").on("mouseover", UI.contentMouseover );

  DisneyDialog.addListener("close", function(e) {
    $(window).off("keydown", UI.keydown);
  });

});

function generateUI() {

  function populate(className, assets) {
    for(let i=0; i < assets.length; i++) {
      let asset = assets[i];
      $("."+ className +" .imageset").append( Helper.createThumb(asset, i) );
    }
  }

  function contentMouseoverHandler(e) {
    const sections = ["features", "responsive", "analytics", "prototypeEmbed", "prototypeMyNews", "prototypeTube"];
    var classname = e.target.className.replace("entry ", "");

    if(!sections.includes(classname) ) { classname = e.target.parentNode.className.replace("entry ", ""); }
    if(!sections.includes(classname) ) { return; }

    PreloaderManager.addLoader(classname, generatePreloader(classname) );
    PreloaderManager.getLoader(classname).addList( Disney.getUrlList(classname) );
    if( PreloaderManager.getLoader(classname).haveImagesStartedLoading() === false) {
      PreloaderManager.getLoader(classname).loadImages();
    }
  }

  function keydownHandler(e) {
    var key = e.key || e.which || e.keyCode || 0;

    switch(key) {
      case "37": // Previous Action
      case "ArrowLeft":
        prevHandler(e);
        break;
      case "39": // Next Action
      case "ArrowRight":
        nextHandler(e);
        break;
    }
  }

  function imageClickHandler(e) {
    e.preventDefault();
    Disney.setActiveType( this.dataset.type );
    Disney.setIndex( this.dataset.index );
    DisneyDialog.changeDisplay( Helper.createImage( this.dataset ) );
    DisneyDialog.changeDescription( $("<p>" + this.dataset.description + "</p>") );
    DisneyDialog.openModal();
  }

  function prevHandler(e) {
    e.preventDefault();
    Disney.prev();
    DisneyDialog.changeDisplay( Helper.createImage( Disney.getCurrentImage() ) );
    DisneyDialog.changeDescription( $("<p>" + Disney.getCurrentImage().description + "</p>") );
  }

  function nextHandler(e) {
    e.preventDefault();
    Disney.next();
    DisneyDialog.changeDisplay( Helper.createImage( Disney.getCurrentImage() ) );
    DisneyDialog.changeDescription( $("<p>" + Disney.getCurrentImage().description + "</p>") );
  }

  return {
    populate : populate,
    imageClick : imageClickHandler,
    keydown : keydownHandler,
    prev : prevHandler,
    next : nextHandler,
    contentMouseover: contentMouseoverHandler
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
  var _active = "features";
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
        description: "The search bar shows up when the user starts typing, similar to an auto-suggest.",
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
        description: "Bar Chart - An Example of a Bar Chart in the Analytics app.",
        alt: "Bar Chart"
      },
      { thumb: "assets/Disney/prototypes/analytics/line_chart_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/line_chart.jpg",
        description: "Line Chart - An Example of a Line Chart in the Analytics app.",
        alt: "Line Chart Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/channels_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/channels.jpg",
        description: "Channel Metrics Tab - Shows how the 8 different stations are performing.",
        alt: "Channel Metrics Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/clips_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/clips.jpg",
        description: "Video Clips Metrics Tab - Shows video clip performance, can sort by " +
        "popularity to see the most popular clips, and duration to see which videos were most " +
        "engaging to the user.",
        alt: "Video Clips Metrics Tab",
      },
      { thumb: "assets/Disney/prototypes/analytics/daily_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/daily.jpg",
        description: "Daily Metrics Tab - See the daily performance of videos for a given station, " +
        "across a series of different metrics.",
        alt: "Daily Metrics Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/search_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/search.jpg",
        description: "Search Metrics Tab - See how the search bar was being used by our users. ",
        alt: "Search Metrics Tab"
      },
      { thumb: "assets/Disney/prototypes/analytics/tags_thumb.jpg",
        src: "assets/Disney/prototypes/analytics/tags.jpg",
        description: "Tags Metrics Tab - Aggregated data sorted by tags on the video clip.",
        alt: "Tags Metrics Tab"
      }
    ],
    prototypeEmbed : [
      { thumb: "assets/Disney/prototypes/embed/embed_thumb.jpg",
        src: "assets/Disney/prototypes/embed/embed.jpg",
        description: "Embedded Clips Experience - Note that it is stripped down to just the video " +
        "player and playlist.",
        alt: "Embedded Clips Experience"
      }
    ],
    prototypeMyNews : [
      { thumb: "assets/Disney/prototypes/mynews/dashboard_1_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_1.jpg",
        description: "My News Experience Dashboard - The dashboard allows the user to select up to three " +
        "themes which we used to generate a custom playlist for them.",
        alt: "My News Experience Dashboard",
      },
      { thumb: "assets/Disney/prototypes/mynews/dashboard_2_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_2.jpg",
        description: "My News Experience Dashboard - Bottom Display shows up when selections are made, " +
        "the user can also select how long they want their viewing experience at this point.",
        alt: "My News Experience Dashboard"
      },
      { thumb: "assets/Disney/prototypes/mynews/dashboard_3_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_3.jpg",
        description: "My News Experience Dashboard - Selection Highlight, selections were highlighted with, " +
        " a light yellow border, while rollovers caused the item to glow light blue.",
        alt: "My News Experience Dashboard "
      },
      { thumb: "assets/Disney/prototypes/mynews/dashboard_transition_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/dashboard_transition.jpg",
        description: "My News Experience Dashboard - Transition from dashboard to video/playlist.",
        alt: "My News Experience Dashboard - Transition"
      },
      { thumb: "assets/Disney/prototypes/mynews/mynews_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/mynews.jpg",
        description: "My News Experience - Video Page 1 - The video page and playlist generated " +
        "for the user.",
        alt: "My News Experience - Video Page 1"
      },
      { thumb: "assets/Disney/prototypes/mynews/mynews_2_thumb.jpg",
        src: "assets/Disney/prototypes/mynews/mynews_2.jpg",
        description: "My News Experience - Video Page 2 - The video page and playlist generated " +
        "for the user.",
        alt: "My News Experience - Video Page 2",
      }
    ],
    prototypeTube : [
      { thumb: "assets/Disney/prototypes/tube/dashboard_thumb.jpg",
        src: "assets/Disney/prototypes/tube/dashboard.jpg",
        description: "Tube Experience - Dashboard - A different, earlier version of the dashboard.",
        alt: "Tube Experience - Dashboard"
      },
      { thumb: "assets/Disney/prototypes/tube/dashboard_2_thumb.jpg",
        src: "assets/Disney/prototypes/tube/dashboard_2.jpg",
        description: "Tube Experience - Dashboard 2 - The nav bar also had the same selections as " +
        "the dashboard, and also had a 'More' dropdown menu to contain elements that would have " +
        "caused the dashboard to overflow.",
        alt: "Tube Experience - Dashboard 2"
      },
      { thumb: "assets/Disney/prototypes/tube/tube_display_thumb.jpg",
        src: "assets/Disney/prototypes/tube/tube_display.jpg",
        description: "Tube Experience - Video Page - Note the multiple playlists.",
        alt: "Tube Experience - Video Page"
      },
      { thumb: "assets/Disney/prototypes/tube/tube_thumb.jpg",
        src: "assets/Disney/prototypes/tube/tube.jpg",
        description: "Tube Experience - Video Page 2 - A suggestions overlay is shown after the user is " +
        "finished watching a video.",
        alt: "Tube Experience - Video Page 2"
      },
      { thumb: "assets/Disney/prototypes/tube/tube_with_search_results_thumb.jpg",
        src: "assets/Disney/prototypes/tube/tube_with_search_results.jpg",
        description: "Tube Experience - Search Results - A search playlist is generated as the " +
        " user types in the Search Box.",
        alt: "Tube Experience - Search Results"
      }
    ]
  }

  var _types = ["features", "responsive", "analytics", "prototypeEmbed", "prototypeMyNews", "prototypeTube"];

  for(let i=0; i < _types.length; i++) {
    for(let j=0; j < _assets[_types[i]].length; j++) {
      _assets[_types[i]][j].type = _types[i];
    }
  }

  function getAssets(type) {
    return (  (_types).includes(type) ) ? _assets[type] : [];
  }

  function getThumbList(inputType) {
    var imageUrlList = [];
    for(let type of _types) {
      if(inputType && inputType.length > 0 && type != inputType) { continue; }
      let assets = getAssets(type);
      for(let asset of assets) { imageUrlList.push( asset.thumb ); }
    }
    return imageUrlList;
  }

  function getUrlList(inputType) {
    var imageUrlList = [];

    // if an inputType is specified, we will only return the urls for the type specified
    for(let type of _types) {
      if(inputType && inputType.length > 0 && type != inputType) { continue; }
      let assets = getAssets(type);
      for(let asset of assets) { imageUrlList.push( asset.src ); }
    }
    return imageUrlList;
  }

  function getTypes() { return _types; }

  function setActiveType(active) {
    _active = (  (_types).includes(active) ) ? active : "";
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
    getUrlList : getUrlList,
    getThumbList : getThumbList,
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

function generatePreloaderManager() {
  var _loaders = [];

  function addLoader(type, loader) {
    if(!_loaders[type]) { _loaders[type] = loader; }
  }
  function getLoader(type) { return _loaders[type] || null; }
  function isLoader(type) { return (_loaders[type] === undefined); }
  function removeLoader(loader) {
    for(let i=0; i < _loaders.length; i++) {
      if(loader === _loaders[i]) { _loaders.splice(i, 1); }
    }
  }

  return {
    addLoader : addLoader,
    getLoader : getLoader,
    isLoader : isLoader,
    removeLoader : removeLoader
  }
}

function generatePreloader(inputName) {
  var _imageUrlList = [];
  var _name = inputName || "";
  var _count = 0;
  var _listeners = [];
  var _startedLoading = false;

  function _imageHasBeenLoaded(e) {
    console.log(this.src, " has been loaded into the cache.");
    _count++;
    if(_count >= _imageUrlList.length) { _allImagesLoaded(e); }
  }

  // fire off any listeners relying on the Image Preloader's completion
  function _allImagesLoaded() {
    _startedLoading = false;
    console.log("All images have been loaded for " + _name + ".");
    for(let listener of _listeners) {
      listener.apply(this, arguments);
    }
  }

  function _loadImage(imageUrl) {
    console.log("Loading " + imageUrl);
    var img = new Image();
    img.addEventListener("load", _imageHasBeenLoaded);
    img.src = imageUrl;
  }

  function addImage(imageUrl) { _imageUrlList.push(imageUrl); }
  function addList(list) { _imageUrlList = list; }

  function haveImagesStartedLoading() { return (_startedLoading === true || _count > 0); }
  function haveImagesLoaded() { return (_count >= _imageUrlList.length); }


  // load all the images in the list
  function loadImages() {
    _count = 0; _startedLoading = true;
    for(let url of _imageUrlList) { _loadImage(url); }
  }

  function addListener(listener) { _listeners.push(listener); }

  function removeListener(listener) {
    for(let i=0; i < _listeners.length; i++) {
      if(listener === _listeners[i]) { _listeners.splice(i, 1); }
    }
  }

  function getListeners() { return _listeners; }

  return {
    addImage : addImage,
    addList : addList,
    haveImagesStartedLoading : haveImagesStartedLoading,
    haveImagesLoaded : haveImagesLoaded,
    loadImages : loadImages,
    addListener : addListener,
    removeListener : removeListener,
    getListeners : getListeners
  };
}

})(); // end of js file
