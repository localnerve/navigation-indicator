//
// jQuery click handler for .nav-indicator-area
//
$(function() {
  $('.nav-indicator-area').on('click', function(e) {

    if (!$(this).hasClass('anim')) {

      if (!$(this).hasClass('in')) {
        $(this).addClass('in');
      } else {
        $(this).removeClass('in')
               .addClass('out')
               .delay(500)
               .queue(function(next) {
                 $(this).addClass('no-trans').removeClass('out');                 
                 next();
               });
      }
      
      $(this).addClass('anim').delay(500).queue(function(next) {
        $(this).removeClass('anim');
        $(this).removeClass('no-trans');
        next();
      });

    }
  });
});