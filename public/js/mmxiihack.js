jQuery(function($){
  $.supersized({
    slides: [ {image : 'bg/6764486061_c7c9b598a1_o.jpg', title : 'Image Credit: Maria Kazvan'} ]
  });

  var contents = [{key: 'intro', path: '/', label: 'Introduction'},
                  {key: 'info', path: '/info', label: 'Information'},
                  {key: 'faq', path: '/faq', label: 'FAQ'},
                  {key: 'partners', path: '/partners', label: 'Sponsors & partners'},
                  {key: 'credit', path: '/credit', label: 'Credit'}];

  var aniEvent = 'animationend webkitAnimationEnd MSAnimationEnd';

  $('.hexagon').click( function() {
    if ($(this).hasClass('select')) {
      unselectContent(true);
    } else {
      var cnt = contentByHexagon($(this));
      if (cnt) {
        unselectContent(false);
        selectContent(cnt);
      }
    }
  });


  function unselectContent(hideContents) {
    $('.hexagon').removeClass('select');
    var a = $('ul.contents li.select');

    if (hideContents) {
      $('ul.contents').removeClass('show');
      setTimeout(function() {
        a.removeClass('select');
      }, 1010);
    } else {
      a.removeClass('select');
    }

  }

  function selectContent(content) {
    var hex = $('.hexagon.' + content.key);
    var c = $('ul.contents li.' + content.key);

    // move hexagon.
    hex.addClass('select');
    c.addClass('select');

    $('ul.contents').addClass('show');
  }

  function contentByHexagon(hex) {
    var content = _(contents).filter(function(c) { return hex.hasClass(c.key); });
    if (_(content).size()==1)
      return content[0];
    else
      return null;
  }
});
