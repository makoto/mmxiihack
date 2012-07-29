jQuery(function($){

  // =====================================
  // Initialization
  // =====================================

  $.supersized({
    slides: [ {image : 'bg/6764486061_c7c9b598a1_o.jpg', title : 'Image Credit: Maria Kazvan'} ]
  });

  var pandamode = false;
  if (document.location.pathname=="/panda") {
    pandamode = true;
  }

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
      if (!activated && !pandamode) {
        document.location.pathname = '/info';
        // $('.hexagon.intro').tooltip('show');
        // setTimeout( function() {
        //   $('.hexagon.intro').tooltip('hide');
        // }, 5000);
      }
    }, 1000);
  }

  // =====================================
  // Panda mode logic
  // =====================================
  if (pandamode) {
    $('.pandamode').show();
    $('.hexagons').hide();
    var pusher = new Pusher("a8d6b011ca9900b8ece8");
    var channel = pusher.subscribe("london");
    var last_love = null, last_hate = null;

    channel.bind('recent', function(data) {
      console.log(data);

      var love, hate;
      for ( var i=0; i<data.length; i++) {
        if (data[i]["sentiment"]=="negative")
          hate = parseInt(data[i]["total"]);
        else if (data[i]["sentiment"]=="positive")
          love = parseInt(data[i]["total"]);
      }

      console.log(love);
      console.log(hate);

      if (last_love && love) {
        change_panda_size($('#love_panda'), love - last_love);
      }

      if (last_hate && hate) {
        change_panda_size($('#hate_panda'), hate - last_hate);
      }

      last_hate = hate;
      last_love = love;
    });
    channel.bind('tweet', function(data) {
      // console.log(data);
      // App.data = data;
      // renderLoveHateGraph(data);
    });
  }

  function change_panda_size(obj, diff) {
    var size = obj.width();
    size = size + (diff*10);
    if (size<10) size = 10;

    obj.width(size + 'px');
    obj.height(size + 'px');
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
