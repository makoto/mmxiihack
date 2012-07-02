jQuery(function($){

  // =====================================
  // Initialization
  // =====================================

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

  $('.partners img').each(function(){
    if (this.alt != "") {
      $(this).tooltip({title: this.alt, placement:'right'})
    };
  })

  var activated = false;

  if (document.location.pathname=="/") {
    setTimeout( function() {
      if (!activated) {
        document.location.pathname = '/info';
        // $('.hexagon.intro').tooltip('show');
        // setTimeout( function() {
        //   $('.hexagon.intro').tooltip('hide');
        // }, 5000);
      }
    }, 1000);
  }

  // =====================================
  // Event handlers
  // =====================================

  $('.hexagon').bind('click touchstart', function() {
    $(this).tooltip('hide');

    if ($(this).hasClass('select')) {
      unselectContent(true);

      setHistory(null);
    } else {
      var content = contentByHexagon($(this));
      unselectContent(false);
      selectContent(content);

      setHistory(content);
    }

    return false;
  });

  $('.hexagon_bg').click( function() {
    unselectContent(true);
    setHistory(null);

    return false;
  });

  $(window).bind('popstate', function(event) {
    var content = contentByURL();

    if (content) {
      unselectContent(false);
      selectContent(content);
    } else {
      unselectContent(true);
    }
  });

  // =====================================
  // Actions
  // =====================================

  function setHistory(content) {
    if (!history.pushState) return false;

    var url = "/";
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

    activated = true;
  }

  function contentByURL() {
    var path = document.location.pathname;
    var content = _(contents).filter(function(c) { return path=='/' + c.path; });
    if (content.length==1)
      return content[0];
    else
      return null;
  }

  function contentByHexagon(hex) {
    var content = _(contents).filter(function(c) { return hex.hasClass(c.key); });
    if (content.length==1)
      return content[0];
    else
      return null;
  }

  function shakeHexagon(hex) {
    var count = 0;
    var left = parseInt(hex.css('left'));

    hex.css('-webkit-transition','none');
    hex.css('transition','none');
    hex.css('-moz-transition','none');
    hex.css('-o-transition','none');

    var interval = setInterval( function() {
      count++;
      if (count>10) {
        clearInterval(interval);
        hex.css('left', left + 'px');
        setTimeout( function() {
          hex.removeAttr('style');
        }, 50);
        return;
      }

      if (count%2==0)
        hex.css('left', (left - 1) + 'px');
      else
        hex.css('left', (left + 1) + 'px');

    }, 80);
  }
});
