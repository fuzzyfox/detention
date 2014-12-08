(function(){
  var next = shower.next;
  shower.next = function(callback) {
    var slide = shower.getCurrentSlideNumber();
    if( shower.slideList.length -1 === slide ) {
      return shower.first(callback);
    }
    return next(callback);
  }

  var prev = shower.prev;
  shower.prev = function(callback) {
    var slide = shower.getCurrentSlideNumber();
    if( 0 === slide ) {
      return shower.last(callback);
    }
    return prev(callback);
  }

  window.addEventListener( 'keyup', function( event ) {
    if( event.key === 'F' ) {
      document.documentElement.requestFullscreen();
    }
  });
}() );


(function(){
  var fullscreenEnabled = document.fullscreenEnabled ||
                          document.webkitFullscreenEnabled ||
                          document.mozFullScreenEnabled ||
                          document.msFullscreenEnabled;

  var requestFullscreen = function( element ) {
    if( element.requestFullscreen ) {
      element.requestFullscreen();
    }
    else if( element.webkitReqestFullscreen ) {
      element.webkitReqestFullscreen();
    }
    else if( element.mozRequestFullScreen ) {
      element.mozRequestFullScreen();
    }
    else if( element.msRequestFullscreen ) {
      element.msRequestFullscreen();
    }
  };

  if( fullscreenEnabled ) {
    window.addEventListener( 'keyup', function( event ) {
      if( event.key === 'F' ) {
        requestFullscreen( document.documentElement );
      }
    });
  }
}());
