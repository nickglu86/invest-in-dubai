// import './style.css'
import { projectsList } from "./public/data/projects";
import { projectsElem } from "./public/js/utils";

/* Initialization of Projects Content Elements */
projectsElem.init(projectsList);

/* on DOMContentLoaded */

document.addEventListener("DOMContentLoaded", function () {

  /* Section Page Scroll Animation  - fullpage-scroll.js */
  var fps = new FullPageScroll("container", {
    // options here
    mediaQuery: "screen and (min-width: 940px)",
    goToTopOnLast: false
  });

  document
  .querySelector("#cover .cta").addEventListener('click', (e) => {
    e.preventDefault();
    fps.goToSlide(1)
  })
  
  document
  .querySelector("#cover .cta").addEventListener('click', (e) => {
    e.preventDefault();
    fps.goToSlide(1)
  })

    /* Mobile Navigation/Hamburger */
    const toggleNav = () => {
      var nav = document.getElementById("nav");
      nav.className === "topnav"
        ? (nav.className += " open")
        : (nav.className = "topnav");
    };
    document.querySelector('.mob_menu_btn').addEventListener('click', () => toggleNav());
    document.querySelector('#nav .nav-list').addEventListener(
       'click', (elem, index) => {
        var nav = document.getElementById("nav");
         nav.classList.contains('open') ? toggleNav() : null;
         fps.goToSlide(index)
      //    document.querySelector(elem.target.getAttribute('href')).scrollIntoView({
      //     behavior: 'smooth'
      // });
       }
    )
  

  /*Projects Section Main Gallery/Slider init with SPlide */
  var projectsCarousel = new Splide("#slider-container", {
    perPage: 1,
    rewind: true,
  });
  projectsCarousel.mount();

  /*Each Project Thumbnail list initialized with Splide */
  let mainImageContainers = document.querySelectorAll(
    ".slide-images .image-container"
  );

  mainImageContainers.forEach((elem, i) => {
    var splide = new Splide(
      ".slide-images #image-container-" + parseInt(i + 1),
      {
        pagination: false,
        rewind: true,
      }
    );

    splide.mount();

    var thumbnailsWrapper = document.querySelector(
      ".slide-images #thumbnail-carousel-" + parseInt(i + 1) );
    var thumbnails = document.querySelectorAll(
      ".slide-images #thumbnail-carousel-" + parseInt(i + 1) + " .thumbnail"
    );
    var current;

    for (var i = 0; i < thumbnails.length; i++) {
      initThumbnail(thumbnails[i], i);
    }

    function initThumbnail(thumbnail, index) {
      thumbnail.addEventListener("click", function () {
        splide.go(index);
      });
    }

    splide.on("mounted move", function () {
      var thumbnail = thumbnails[splide.index];
      if( splide.index < thumbnails.length - 4 ){
        thumbnailsWrapper.style =  "transform: translateX(" + splide.index*-82 +  "px)" ;
      }

      if (thumbnail) {
        if (current) {
          current.classList.remove("is-active");
        }

        thumbnail.classList.add("is-active");
        current = thumbnail;
      }
    });
  });

  document
    .querySelectorAll("#projects .slide-content button")
    .forEach((ctaButtonsList) => {
      ctaButtonsList.addEventListener("click", (cta) => {
        const projectTitle =
          cta.target.parentElement.getElementsByTagName("h3")[0].innerHTML;
        document.querySelector("#contact #projectn").value =
          "Interested in " + projectTitle;
        const contactSection = document.getElementById("contact");
        contactSection.scrollIntoView();
      });
    });
});

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    separateDialCode: true,
    autoPlaceholder: 'polite',
});


/* Contact Form handler */
const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullNumber = phoneInput.getNumber();
  const data = new FormData(contactForm);
  data.set('phone', fullNumber)
 
  fetch("https://getform.io/f/08457ad4-8255-422a-8649-b883fb3011d1", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        formSuccess();
      }
    })
    .catch((error) => {
      formError();
      console.log(error);
    });
});

const formElem = document.querySelector(".form form");
const spinner = document.querySelector(".spinner");
const successElem = document.querySelector(".form .success");
const errorElem = document.querySelector(".form .error");

const showSpinner = () => {
  formElem.style.display = "none";
  spinner.style.display = "flex";
};

const formSuccess = () => {
  spinner.style.display = "none";
  successElem.style.display = "block";
};

const formError = () => {
  spinner.style.display = "none";
  errorElem.style.display = "block";
};

const tryAgain = () => {
  errorElem.style.display = "none";
  contactForm.reset();
  formElem.style.display = "flex";
};

const tryAgainBtn = document.querySelector(".form .error button");
tryAgainBtn.addEventListener("click", tryAgain);

/* Page fade anim effect in load on DOM Content Loaded */
document.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(function () {
    document.body.classList.remove("fade");
  }, 230);
});

/* Page fade anim effect for sections scrolled into viewport */
const items = document.querySelectorAll(".appear");
const active = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview");
    } else {
      entry.target.classList.remove("inview");
    }
  });
};
const io2 = new IntersectionObserver(active);
for (let i = 0; i < items.length; i++) {
  io2.observe(items[i]);
}

