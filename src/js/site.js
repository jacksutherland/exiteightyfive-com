var win;
var head;

function randomNumber(min, max)
{
    var rand = Math.random() * (max - min) + min;
    return Math.round(rand);
}

function startFire()
{
  var browserWidth = win.width();
  var smoke = $("#smoke");
  var numberOfSparks = browserWidth < 700 ? 15 : 80;
  for(i = 0; i < numberOfSparks; i++)
  {
    var smokeDelay = randomNumber(0, 30000);
    setTimeout(function()
    {
      //var smokeLeft = (browserWidth < 700 ? randomNumber(5, 95) : randomNumber(25, 75)) + "%";
      var smokeLeft = (browserWidth < 700 ? 50 : randomNumber(25, 75)) + "%";
      var smokeTop = win.scrollTop() + win.height();
      if(smokeTop < 2200)
      {
        var newSmoke = smoke.clone();
        newSmoke.css({ "left": smokeLeft, "top": smokeTop }).addClass("smoke" + randomNumber(1, 3));
        $("body").append(newSmoke);
      }
    }, smokeDelay);  
  }
}

function checkWinPos(isOnScroll)
{
  if(win.scrollTop() === 0)
  {
    if(isOnScroll)
    {
      head.removeClass("not-at-top").addClass("at-top");
    }
  }
  if(win.scrollTop() > 100)
  {
    head.removeClass("at-top").addClass("not-at-top");
  }
}

function contactForm()
{
  $("#contact-form").submit(function()
  {
    var frm = $(this);
    var error = "";

    frm.find(".info").removeClass("is-error").text("");

    if($.trim(frm.find("[name=first]").val()) == "")
    {
      error = "First name is required";
    }
    else if($.trim(frm.find("[name=last]").val()) == "")
    {
      error = "Last name is required";
    }
    else if($.trim(frm.find("[name=phone]").val()) == "" && !frm.find("[name=email]").val().includes("@"))
    {
      error = "A valid phone number or email address is required";
    }

    if (error == "")
    {
      $.post("/php/mailer.php", frm.serialize()).done(function(data)
      {
        if(data == "success")
        {
          frm[0].reset();
          frm.find(".info").text("Message Sent. We will be in touch. Thank you.");
        }
        else
        {
          frm.find(".info").addClass("is-error").text("Error encountered. Please call us at 704-996-3439.");
        }
      });

      analytics.sendContact();
    }
    else
    {
      frm.find(".info").addClass("is-error").text(error);
    }

    return false;
  });
}


var sections = {

  activeSection: "",

  jumping: false,

  goTo: function(sectionSelector, path, animate)
  {
    if(sections.activeSection == sectionSelector) return false;

    var section, scrollTop;

    sections.jumping = true;

    section = $(sectionSelector);
    sections.activeSection = sectionSelector;
    scrollTop = path == "/" ? 0 : (section.offset().top - 100);

    if(animate)
    {
      $('html, body').stop().animate({ scrollTop: scrollTop }, (animate ? 500 : 0), function()
      {
        sections.jumping = false;
      });
    }
    else
    {
      $('html, body').scrollTop(scrollTop);
      sections.jumping = false;
    }
  },
  
  inViewCheck: function(isTop)
  {
    var section = "", path = "/";

    if(sections.jumping) return false;

    if(!isTop)
    {
      var sectionSelectors = $("#main-menu .jump-link:visible").map(function ()
      {
        return this.getAttribute("data-section");
      });

      for(i = 0; i <= sectionSelectors.length; i++)
      {
        if(isScrolledIntoView(sectionSelectors[i]))
        {
          section = sectionSelectors[i];
          path = $('#main-menu .jump-link[data-section="' + sectionSelectors[i] + '"]').attr("href");
          i = sectionSelectors.length + 1;
        }
      }
    }

    if(section != sections.activeSection)
    {
      sections.activeSection = section;
      window.history.pushState({ section: section, path: path }, null, path);
    }

  }
}

// DONT DELETE - Keep for reference of how to send GA virtual page view
// function sendPageView(path)
// {
//   // Universal Analytics Code
//   gtag('config', 'UA-139848868-1', {'page_path': path});

//   // This has been reconfigured in GTM to trigger on DOM History Change
// }


// DONT DELETE - Keep for reference of how to send GA event
// function sendEvent(eventType, eventLabel)
// {
//   gtag('config', 'UA-139848868-1');
//   switch(eventType)
//   {
//     case "hero-cta":
//       gtag('event', 'CTA Link Clicked', {
//         'event_category' : 'Contact',
//         'event_label' : 'Hero CTA'
//       });
//       break;
//     case "contact-form":
//       gtag('event', 'Form Submitted', {
//         'event_category' : 'Contact',
//         'event_label' : 'Contact Form'
//       });
//       break;
//   }
// }

var analytics = {
  sendEvent: function(eventName, values)
  {
    var obj = (typeof(values) == "object") ? Object.assign({'event': eventName}, values) : {'event': eventName};
    dataLayer.push(obj);
  },
  sendArtist: function(artist, song)
  {
    /*
      GTM Trigger Event Name: artistHover
      GTM Variables: artist, song
    */
    analytics.sendEvent("artistHover", {
      'artist': artist,
      'song': song
    });
  },
  sendContact: function()
  {
    analytics.sendEvent("contactFormSubmitted");
  },
  sendShowDetails: function(source, title, date)
  {
    analytics.sendEvent("showDetails", {
      'showSource': source,
      'showTitle': title,
      'showDate': date
    });
  }
}

var media = {
  videos: {
    player: function(id, videoId)
    {
      var played = false;

      var ytPLayer = new YT.Player(id, {
        playerVars: { 'rel' : 0 },
        videoId: videoId,
        events: {
          'onStateChange': function(event)
          {
            if (event.data == YT.PlayerState.PLAYING)
            {
              if(!played) // only played once this session
              {
                played = true;
              }
            }
          }
        }
      });
    },
    createVideos: function()
    {

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function()
      {
        $("[data-video]").each(function()
        {
          var video = $(this);
          var player = new media.videos.player(video[0].id, video.data("video"));
        });
      }
    }
  }
}

var cookie = {
  set: function(cname, cvalue, exdays)
  {
    if(typeof(exdays) == "undefined")
    {
      exdays = 365; // 1 year default
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + window.location.hostname + ";path=/";
  },
  get: function(cname)
  {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
      var c = ca[i];
      while (c.charAt(0) == ' ')
      {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0)
      {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
};

function isScrolledIntoView(elemSelector)
{
    var scrollTop = $(window).scrollTop();
    var elem = $(elemSelector);

    if(elem.length == 0) return false;

    var elemTop = elem.offset().top;
    var elemHalfHeight = elem.height() / 2;
    var elemMiddle = elemTop + elemHalfHeight;

    var docViewTop = scrollTop;
    var docMiddle = docViewTop + ($(window).height() / 2);
    var docStartRange = (docMiddle - elemHalfHeight) - 25;
    var docEndRange = (docMiddle + elemHalfHeight)  + 25;

    return ((elemMiddle > docStartRange) && (elemMiddle < docEndRange));
}



$(function()
{
  win = $(window);
  head = $("header");

  checkWinPos();
  contactForm();
  media.videos.createVideos();

  /********** SPA URL Jump **********/

  if(window.location.pathname.indexOf("/sections/") !== -1)
  {
    var path = window.location.pathname;

    if(path[path.length -1] == "/")
    {
      path = path.substring(0, path.length - 1);
    }

    var link = $('a[href="' + path + '"]');
    var section = link.data("section");

    sections.goTo(section, path);
  }

  /********** Window Events **********/

  var isScrolling = false;
  var scrollCount = 0;
  var previousScrollCount = 0;
  var scrollCheckDuration = 2000;

  var waitForScrollStop = function(returnFunc)
  {
    if(previousScrollCount === scrollCount)
    {
      // Scrolling has stopped!!!

      scrollCount = previousScrollCount = 0;

      if(typeof(returnFunc) == "function")
      {
        returnFunc();
      }
    }
    else
    {
      // Still scrolling, wait and check againg

      setTimeout(function()
      {
        previousScrollCount = scrollCount;
        setTimeout(function()
        {
          waitForScrollStop(returnFunc);
        }, (scrollCheckDuration / 2));
      }, (scrollCheckDuration / 2));
    }
  }

  win.scroll(function()
  {
    checkWinPos(true);

    scrollCount++;

    if(!isScrolling)
    {
      isScrolling = true;
      waitForScrollStop(function()
      {
        isScrolling = false;
        sections.inViewCheck(win.scrollTop() === 0);
      });
    }
  });

  /********** DOM History **********/

  window.onpopstate = function(event)
  {
    if(event.state != null && event.state.path != null)
    {
      sections.goTo((event.state.path == "/" ? "" : event.state.section), event.state.path);
    }
  }

  /********** Navigation Link Events **********/

  window.history.scrollRestoration = "manual"; // without this, scroll position is jacked up on back button

  $(".jump-link").click(function(e)
  {
    e.preventDefault();

    var link = $(this);
    var section = link.data("section");

    if(section != sections.activeSection)
    {
      var path = link.attr("href");
      sections.goTo(section, path, true);
      
      window.history.pushState({ section: section, path: path }, null, path);
    }

    if(link.hasClass("hero-cta"))
    {
      sendEvent("hero-cta");
    }

    
  });

  /********** Band Member Events **********/

  $(".band-member").hover(function()
  {
    var rockstar = $(this);
    setTimeout(function()
    {
      if ($("#" + rockstar.attr("id") + ":hover").length>0)
      {
        rockstar.find(".band-member-bio").slideDown();
        rockstar.find(".band-member-image").addClass("fadeout-image");
      }
    }, 250);
  },
  function()
  {
    var rockstar = $(this);
    rockstar.find(".band-member-bio").slideUp();
    rockstar.find(".band-member-image").removeClass("fadeout-image");
  });

  /********** Artist Song Events **********/

  // Auto select cookie'd songs
  var cookiesongs = cookie.get("exit85songs").split(",");
  for (var i = 0; i < cookiesongs.length; i++)
  {
    var song = document.getElementById(cookiesongs[i]);
    if (song != null)
    {
      song.classList.add("selected");
    }
  }

  function selectArtist(songId)
  {
    var song = document.getElementById(songId);

    if(song == null) return false;

    // delay selection in case user changes mind
    setTimeout(function()
    {
      if(song.classList.contains("selected"))
      {
        // Send result to analytics
        analytics.sendArtist(song.getAttribute("data-artist"), song.getAttribute("data-song"));

        // Add result to cookie
        var cookiesongs = cookie.get("exit85songs").split(",");
        if(!cookiesongs.includes(songId))
        {
          cookiesongs.push(songId);
          cookie.set("exit85songs", cookiesongs.join(","));
        }
      }
    }.bind(this), 3000);
  }

  function removeArtist(songId)
  {
    var song = document.getElementById(songId);

    if(song == null) return false;

    // Remove result from cookie
    var cookiesongs = cookie.get("exit85songs").split(",");
    if(cookiesongs.includes(songId))
    {
      var songIdx = cookiesongs.indexOf(songId);
      if(songIdx >= 0)
      {
        cookiesongs.splice(songIdx, 1);
        cookie.set("exit85songs", cookiesongs.join(","));
      }
    }
  }

  $(".cover-block").click(function(e)
  {
    e.preventDefault();

    var block = $(this).toggleClass("selected");

    if(block.hasClass("selected"))
    {
      selectArtist(block[0].id);
    }
    else
    {
      removeArtist(block[0].id);
    }

    return false;
  });

});