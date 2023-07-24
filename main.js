import './style.css'
 

document.addEventListener("DOMContentLoaded", function() {
  var fps = new FullPageScroll('container', { 
      // options here
      mediaQuery: 'screen and (min-width: 940px)',
  });

 
 /*Adding Action(Next Slide/Section) to buttons in each section */
  document.querySelectorAll('#cover-cta, #developers button').forEach(button => {
    button.addEventListener('click', function() {
      console.log('clicked')
        fps.nextSlide();
    } )
  })


 /*Projects Section Main Gallery/Slider init with SPlide */
  var projectsCarousel = new Splide( '#slider-container', {
    perPage: 1,
    rewind : true,
  } );

  projectsCarousel.mount();

 /*Each Project Thumbnail list initialized with Splide */
  var projectsThumbnails = document.querySelectorAll('.slide-images .images-list.splide.thumbnail-carousel')
  for ( var i = 0; i < projectsThumbnails.length; i++ ) {
    new Splide( projectsThumbnails[ i ] , {
        fixedWidth  : 100,
        fixedHeight : 60,
        gap         : 10,
        rewind      : true,
        pagination  : false,
        isNavigation: true,
        breakpoints : {
          600: {
            fixedWidth : 60,
            fixedHeight: 44,
          },
        },
      } ).mount();
  }


  /* Updating main image view from when images in thumbnail clicked */
  document.querySelectorAll('#projects .slide-images .images-list img').forEach( thumbSliderImg => {
    thumbSliderImg.addEventListener('click', img => {
       const imgSrc = img.target.getAttribute('src');
      const imgContainer = img.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling ;
      // imgContainer.firstElementChild.setAttribute('src', imgSrc)
      imgContainer.firstElementChild.style.backgroundImage = `url("${imgSrc}")`;
      //  console.log(imgContainer.firstElementChild.setAttribute('src', imgSrc))
    })
  })

  document.querySelectorAll('#projects .slide-content button').forEach( ctaButtonsList => {
    ctaButtonsList.addEventListener('click', cta => {
      const projectTitle =  cta.target.parentElement.getElementsByTagName('h3')[0].innerHTML;
      document.querySelector('#contact #projectn').value  = 'Intrested in ' + projectTitle;
      fps.goToSlide(4)
      // console.log(    document.querySelector('#contact #projectn'))
    })
  })

  
});

