jQuery(function($){

  // ============== Initialize
  $.supersized({
    slides: [ {image : 'bg/6764486061_c7c9b598a1_o.jpg', title : 'Image Credit: Maria Kazvan'} ]
  });

  var contents = [{key: 'intro', path: 'intro', label: 'Introduction'},
                  {key: 'info', path: 'info', label: 'Information'},
                  {key: 'faq', path: 'faq', label: 'FAQ'},
                  {key: 'partners', path: 'partners', label: 'Supporters'},
                  {key: 'credit', path: 'credit', label: 'Credit'}];

  var aniEvent = 'animationend webkitAnimationEnd MSAnimationEnd';

  _(contents).each( function(c) {
    $('.hexagon.' + c.key).tooltip({title: c.label});
  });

  // ============== Event handler
  $('.hexagon').click( function() {
    $(this).tooltip('hide');

    if ($(this).hasClass('select')) {
      unselectContent(true);
    } else {
      var content = contentByHexagon($(this));
      unselectContent(false);
      selectContent(content);

      setHistory(content);
    }

    return false;
  });

  // ============== Actions
  function setHistory(content) {
    if (!history.pushState) return false;

    var url = "";
    var title = "Londinium MMXII Hackathon";
    if (content) {
      url = content.path;
      title = content.label + ": " + title;
    }

    history.pushState(content, title, url);
  }

  function unselectContent(hideContents) {
    $('.hexagon').removeClass('select');
    var a = $('ul.contents li.select');

    if (hideContents) {
      $('ul.contents').removeClass('show');
      setTimeout(function() {
        a.removeClass('select');
      }, 1010);
      $('.title').removeClass('show');
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
    $('.title').html(content.label);
    $('.title').addClass('show');
  }

  function contentByHexagon(hex) {
    var content = _(contents).filter(function(c) { return hex.hasClass(c.key); });
    if (_(content).size()==1)
      return content[0];
    else
      return null;
  }
});
