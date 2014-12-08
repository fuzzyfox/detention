/**
 * Monkey patching looping of presentation into shower.
 */
(function(){
  var next = shower.next;
  /**
   * Monkey patch forwards looping into shower
   *
   * @param  {Function} callback `shower.next` callback
   * @return {Function}          return from `shower.next` OR return from `shower.first` if on the last slide.
   */
  shower.next = function(callback) {
    var slide = shower.getCurrentSlideNumber();
    if( shower.slideList.length -1 === slide ) {
      return shower.first(callback);
    }
    return next(callback);
  }

  var prev = shower.prev;
  /**
   * Monkey patch backwards looping into shower
   *
   * @param  {Function} callback `shower.prev` callback
   * @return {Function}          return from `shower.prev` OR return from `shower.last` if on the first slide.
   */
  shower.prev = function(callback) {
    var slide = shower.getCurrentSlideNumber();
    if( 0 === slide ) {
      return shower.last(callback);
    }
    return prev(callback);
  }
}() );

/**
 * Adding HTML5 fullscreen to document
 */
(function(){
  var fullscreenEnabled = document.fullscreenEnabled ||
                          document.webkitFullscreenEnabled ||
                          document.mozFullScreenEnabled ||
                          document.msFullscreenEnabled;

  /**
   * Cross browser abstraction of fullscreen API
   *
   * @param  {Element} element Element to make fullscreen
   */
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
