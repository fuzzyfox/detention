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
}() );
