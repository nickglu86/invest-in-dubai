import './style.css'
 



document.addEventListener("DOMContentLoaded", function() {

  const toggleNav = () => {
    var x = document.getElementById("nav");
    if (x.className === "topnav") {
      x.className += " open";
    } else {
      x.className = "topnav";
    }
  }
  
  document.querySelector('.mob_menu_btn').addEventListener(
    'click', () => toggleNav()
  
  )
  document.querySelector('#nav .nav-list').addEventListener( 
     'click', () => {
      var nav = document.getElementById("nav");
       nav.classList.contains('open') ? toggleNav() : null;
       document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
     }
  )

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

const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(contactForm);

  fetch("https://getform.io/f/e0c95d7f-047b-4bcf-851a-22223ac923bf", {
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


document.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(function() {
    document.body.classList.remove('fade');
  }, 230);
});

// const appear = document.querySelector('.appear'); 
// const cb = function(entries){
//   entries.forEach(entry => {
//     if(entry.isIntersecting){
//       entry.target.classList.add('inview');
//     }else{
//       entry.target.classList.remove('inview');
//     }
//   });
// }
// const io = new IntersectionObserver(cb);
// io.observe(appear);

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
