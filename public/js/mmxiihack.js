jQuery(function($){
  $.supersized({
    slides: [ {image : 'bg/6764486061_c7c9b598a1_o.jpg', title : 'Image Credit: Maria Kazvan'} ]
  });

  $('.hexagon').click( function() {
    if ($(this).hasClass('select')) {
      $(this).removeClass('select');
    } else {
      $('.hexagon').removeClass('select');
      $(this).addClass('select');
    }
  });
});
