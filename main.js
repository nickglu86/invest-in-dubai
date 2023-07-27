import './style.css'
import { projectsList } from './public/data/projects';
import { projectsElem } from './public/js/utils';

 


/* Initialization of Projects Content Elements */
projectsElem.init(projectsList)


/* on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", function() {

  /* Mobile Navigation/Hamburger */
  const toggleNav = () => {
    var nav = document.getElementById("nav");
    nav.className === "topnav" ? nav.className += " open" :  nav.className = "topnav";
  }
  document.querySelector('.mob_menu_btn').addEventListener('click', () => toggleNav());
  document.querySelector('#nav .nav-list').addEventListener( 
     'click', () => {
      var nav = document.getElementById("nav");
       nav.classList.contains('open') ? toggleNav() : null;
       document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
     }
  )

  /* Section Page Scroll Animation  - fullpage-scroll.js */
  var fps = new FullPageScroll('container', { 
      // options here
      mediaQuery: 'screen and (min-width: 940px)',
  });

 
 /*Adding Action(Next Slide/Section) to buttons in each section */
  // document.querySelectorAll('#cover-cta, #developers button, .contact-label').forEach(button => {
  //   button.addEventListener('click', function() {
  //       fps.nextSlide();
  //   } )
  // })


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
      document.querySelector('#contact #projectn').value  = 'Interested in ' + projectTitle;
      const contactSection = document.getElementById("contact");
      contactSection.scrollIntoView();
      //fps.goToSlide(4)
      // console.log(    document.querySelector('#contact #projectn'))
    })
  })

  
});


/* Contact Form handler */
const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(contactForm);

  fetch("https://getform.io/f/08457ad4-8255-422a-8649-b883fb3011d1", {
      method: "POST",
      body: data,
      headers: {
          "Accept": "application/json",
      },
  })
  .then(response => {
    if(response.ok){
      formSuccess();
    }
  })
  .catch(error => {
    formError();
    console.log(error)
  })
})

const formElem = document.querySelector('.form form');
const spinner = document.querySelector('.spinner');
const successElem = document.querySelector('.form .success');
const errorElem = document.querySelector('.form .error');

const showSpinner = () => {
 formElem.style.display = 'none';
 spinner.style.display = 'flex';
}

const formSuccess = () => {
  spinner.style.display = 'none';
  successElem.style.display = 'block';
}

const formError = () => {
  spinner.style.display = 'none';
  errorElem.style.display = 'block';
}

const tryAgain = () => {
  errorElem.style.display = 'none';
  contactForm.reset();
  formElem.style.display = 'flex';
}

const tryAgainBtn = document.querySelector('.form .error button');
tryAgainBtn.addEventListener('click', tryAgain);



/* Page fade anim effect in load on DOM Content Loaded */
document.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(function() {
    document.body.classList.remove('fade');
  }, 230);
});


/* Page fade anim effect for sections scrolled into viewport */
const items = document.querySelectorAll('.appear');
const active = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview'); 
        }else{
            entry.target.classList.remove('inview'); 
        }
    });
}
const io2 = new IntersectionObserver(active);
 for(let i=0; i < items.length; i++){
    io2.observe(items[i]);
 }
