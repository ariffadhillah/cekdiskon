//navbar


$('.wrapper').on('click', function () {
    $(this).toggleClass('close');
    $('.overlay').toggleClass('menu-open');
});



    // Header scroll class
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.navbar').addClass('bawah');
      } else {
        $('.navbar').removeClass('bawah');
      }
    });
  
    if ($(window).scrollTop() > 100) {
      $('.navbar').addClass('bawah');
    }
  
  
  
    $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {
            var top_space = 0;
    
            if ($('.navbar').length) {
              top_space = $('.navbar').outerHeight();
    
              if (! $('.navbar').hasClass('bawah')) {
                top_space = top_space - 40;
              }
            }
    
            $('html, body').animate({
              scrollTop: target.offset().top - top_space
            }, 1500, 'easeInOutExpo');
    
            if ($(this).parents('.main-nav, .mobile-nav').length) {
              $('.main-nav .active, .mobile-nav .active').removeClass('active');
              $(this).closest('li').addClass('active');
            }
    
            if ($('body').hasClass('mobile-nav-active')) {
              $('body').removeClass('mobile-nav-active');
              $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
              $('.mobile-nav-overly').fadeOut();
            }
            return false;
          }
        }
      });

      
  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('navbar').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });













 
  
  
// Pencarian ID //

$('#search-button').on('click', function() {

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'dca61bcc',
            's': $('#search-input').val()
        },
        success: function(result) {
            if ( result.Response == "True"){
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${data.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });



            }else{
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">`+ result.Error + `</h1></div>
                `)
            }
        }
    });
});