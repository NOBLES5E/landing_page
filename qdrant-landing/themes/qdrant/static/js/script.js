(function ($) {

  "use strict";

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($('.preloader').length) {
      $('.preloader').delay(200).fadeOut(500);
    }
  }


  //Submenu Dropdown Toggle
  if ($('.main-header li.dropdown ul').length) {
    $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

    //Dropdown Button
    $('.main-header li.dropdown .dropdown-btn').on('click', function () {
      $(this).prev('ul').slideToggle(500);
    });

    //Disable dropdown parent link
    $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function (e) {
      e.preventDefault();
    });

  }


  //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($('.main-header').length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $('.main-sticky-header');
      var scrollLink = $('.scroll-to-top');
      var sticky_header = $('.main-sticky-header .sticky-header');
      if (windowpos > 100) {
        siteHeader.addClass('fixed-header');
        sticky_header.addClass("animated slideInDown");
        scrollLink.fadeIn(300);
      } else {
        siteHeader.removeClass('fixed-header');
        sticky_header.removeClass("animated slideInDown");
        scrollLink.fadeOut(300);
      }
    }
  }

  headerStyle();


  //Hidden Sidebar
  if ($('.hidden-bar').length) {
    var hiddenBar = $('.hidden-bar');
    var hiddenBarOpener = $('.nav-toggler');
    var hiddenBarCloser = $('.hidden-bar-closer');
    $('.hidden-bar-wrapper').mCustomScrollbar();

    //Show Sidebar
    hiddenBarOpener.on('click', function () {
      hiddenBar.addClass('visible-sidebar');
    });

    //Hide Sidebar
    hiddenBarCloser.on('click', function () {
      hiddenBar.removeClass('visible-sidebar');
    });
  }


  //Hidden Bar Menu Config
  function hiddenBarMenuConfig() {
    var menuWrap = $('.hidden-bar .side-menu');
    // appending expander button
    menuWrap.find('.dropdown').children('a').append(function () {
      return '<button type="button" class="btn expander"><i class="icon fa fa-angle-right"></i></button>';
    });
    // hidding submenu
    menuWrap.find('.dropdown').children('ul').hide();
    // toggling child ul
    menuWrap.find('.btn.expander').each(function () {
      $(this).on('click', function () {
        $(this).parent() // return parent of .btn.expander (a)
          .parent() // return parent of a (li)
          .children('ul').slideToggle();

        // adding class to expander container
        $(this).parent().toggleClass('current');
        // toggling arrow of expander
        $(this).find('i').toggleClass('fa-angle-right fa-angle-down');

        return false;

      });
    });
  }

  hiddenBarMenuConfig();


  //Fact Counter + Text Count
  if ($('.count-box').length) {
    $('.count-box').appear(function () {

      var $t = $(this),
        n = $t.find(".count-text").attr("data-stop"),
        r = parseInt($t.find(".count-text").attr("data-speed"), 10);

      if (!$t.hasClass("counted")) {
        $t.addClass("counted");
        $({
          countNum: $t.find(".count-text").text()
        }).animate({
          countNum: n
        }, {
          duration: r,
          easing: "linear",
          step: function () {
            $t.find(".count-text").text(Math.floor(this.countNum));
          },
          complete: function () {
            $t.find(".count-text").text(this.countNum);
          }
        });
      }

    }, {accY: 0});
  }


  //Mobile Nav Hide Show
  if ($('.mobile-menu').length) {

    $('.mobile-menu .menu-box').mCustomScrollbar();

    var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
    mobileMenuContent = $(mobileMenuContent).find('.fa-chevron-down').remove().end();
    $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
    $('.sticky-header .main-menu').append(mobileMenuContent);

    $('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
      $(this).toggleClass('open');
      $(this).prev('ul').slideToggle(500);
    });
    //Menu Toggle Btn
    $('.mobile-nav-toggler').on('click', function () {
      $('body').addClass('mobile-menu-visible');
    });

    //Menu Toggle Btn
    $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
      $('body').removeClass('mobile-menu-visible');
    });
  }

  //Tabs Box
  function activateTab(tab) {
    if ($(tab).is(':visible')) {
      return false;
    } else {
      tab.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
      $('[data-tab="#' + tab.attr('id') + '"]').addClass('active-btn');
      tab.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
      tab.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
      $(tab).fadeIn(300);
      $(tab).addClass('active-tab');
    }
  }

  if ($('.tabs-box').length) {
    // switch the tab on click
    $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
      e.preventDefault();
      var target = $($(this).attr('data-tab'));

      activateTab(target);
    });
  }

  // autoplay

  // if the user's device is small mobile
  let isSmallMobile = window.matchMedia('only screen and (max-width: 991px)').matches;
  const tabs = [...document.querySelectorAll('.tabs-box .tab-buttons .tab-btn')].map(tab => $(tab.dataset.tab));
  const sleep = m => new Promise(r => {
    return setTimeout(r, m)
  });
  let paused = false;

  // go to the next tab
  async function autoplay() {
    console.log({isSmallMobile})
    if (!tabs || tabs.length === 0) return;

    do {
      await sleep(3000).then(t => clearTimeout(t));
    } while(isSmallMobile || paused)
    autoplay.idx = ((autoplay.idx || 0) + 1) % tabs.length;
    activateTab(tabs[autoplay.idx]);
    await autoplay();
  }

  (async function (){

    const tabsContainer = $('.business-info-tabs');
    tabsContainer.mouseenter((e) => {
      paused = true;
    });

    tabsContainer.mouseleave(() => {
      paused = false;
    });

    $(window).resize(function () {
      isSmallMobile = window.matchMedia('only screen and (max-width: 992px)').matches;
      if (isSmallMobile) {
        tabs.forEach(tab => {
          $(tab).show();
        })
      }
      console.log({isSmallMobile}, 'resize')
    });

    await autoplay()
  })();


  //Header Search
  if ($('.search-box-outer').length) {
    $('.search-box-outer').on('click', function () {
      $('body').addClass('search-active');
    });
    $('.close-search').on('click', function () {
      $('body').removeClass('search-active');
    });
  }


  if ($('.paroller').length) {
    $('.paroller').paroller({
      factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control
      factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control
      type: 'foreground',     // background, foreground
      direction: 'horizontal' // vertical, horizontal
    });
  }

  //Event Countdown Timer
  if ($('.time-countdown').length) {
    $('.time-countdown').each(function () {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function (event) {
        var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
      });
    });
  }


  //Custom Seclect Box
  if ($('.custom-select-box').length) {
    $('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
  }


  //Jquery Spinner / Quantity Spinner
  if ($('.quantity-spinner').length) {
    $("input.quantity-spinner").TouchSpin({
      verticalbuttons: true
    });
  }


  //Gallery Filters
  if ($('.filter-list').length) {
    $('.filter-list').mixItUp({});
  }


  //LightBox / Fancybox
  if ($('.lightbox-image').length) {
    $('.lightbox-image').fancybox({
      openEffect: 'fade',
      closeEffect: 'fade',
      helpers: {
        media: {}
      }
    });
  }


  //Contact Form Validation
  if ($('#contact-form').length) {
    $('#contact-form').validate({
      rules: {
        username: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        message: {
          required: true
        }
      }
    });
  }


  // Scroll to a Specific Div
  if ($('.scroll-to-target').length) {
    $(".scroll-to-target").on('click', function () {
      var target = $(this).attr('data-target');
      // animate
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 1500);

    });
  }


  // Elements Animation
  // if($('.wow').length){
  // 	var wow = new WOW(
  // 	  {
  // 		boxClass:     'wow',      // animated element css class (default is wow)
  // 		animateClass: 'animated', // animation css class (default is animated)
  // 		offset:       0,          // distance to the element when triggering the animation (default is 0)
  // 		mobile:       true,       // trigger animations on mobile devices (default is true)
  // 		live:         true       // act on asynchronously loaded content (default is true)
  // 	  }
  // 	);
  // 	wow.init();
  // }


  /* ==========================================================================
     When document is Scrollig, do
     ========================================================================== */

  $(window).on('scroll', function () {
    headerStyle();
  });

  /* ==========================================================================
     When document is loading, do
     ========================================================================== */

  $(window).on('load', function () {
    handlePreloader();
  });

})(window.jQuery);