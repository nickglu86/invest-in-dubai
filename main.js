import { projectsElem, showSpinner, formSuccess, formError, tryAgain } from "./public/js/utils";
import { projectsList as projectsListIL } from "./public/data/projects-il";
import { projectsList } from "./public/data/projects";

/* CONSTS */
const scrollBehavior =  { behavior: 'smooth'};
const slideImgsSelectorPrefix = ".slide-images #thumbnail-carousel-";
const getFormEndpoint = "https://getform.io/f/08457ad4-8255-422a-8649-b883fb3011d1";
const utilScriptJS  =" https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js";

/* on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", function () {

  /* Section Page Scroll Animation  - fullpage-scroll.js */
  // let fps = new FullPageScroll("container", {
  //   // options here
  //   mediaQuery: "screen and (min-width: 940px)",
  //   goToTopOnLast: false,
  // });

/* Initialization of Projects Content Elements */
// const lang = document.documentElement.lang;
// lang === 'en' ? projectsElem.init(projectsList, 'us') : projectsElem.init(projectsListIL, 'il');


  /** SPLIDE CAROUSEL INITs **/
  /*Projects Section Main Gallery/Slider init with SPlide */
  let projectsCarousel = new Splide("#slider-container", {
    perPage: 1,
    rewind: true,
  });
  projectsCarousel.mount();

  /*Projects Thumbnails Containerslist initialization with Splide */
  const mainImageContainers = document.querySelectorAll(".slide-images .image-container");
  mainImageContainers.forEach((elem, i) => {
    let splide = new Splide(
      ".slide-images #image-container-" + parseInt(i + 1),
      {
        pagination: false,
        rewind: true,
      }
    );

    splide.mount();

    let thumbnailsWrapper = document.querySelector(slideImgsSelectorPrefix + parseInt(i + 1) );
    let thumbnails = document.querySelectorAll(slideImgsSelectorPrefix + parseInt(i + 1) + " .thumbnail");
    let current;
    const initThumbnail = (thumbnail, index) => {
      thumbnail.addEventListener("click", function () {
        splide.go(index);
      });
    }
    
    for (let i = 0; i < thumbnails.length; i++) {
      initThumbnail(thumbnails[i], i);
    }



    splide.on("mounted move", function () {
      let thumbnail = thumbnails[splide.index];
      let offset =   thumbnail.offsetWidth ?  thumbnail.offsetWidth  : '80';
      if (splide.index < thumbnails.length - 5) {
        thumbnailsWrapper.style =
          "transform: translateX(" + splide.index * -offset + "px)";
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
  /** SPLIDE CAROUSEL INITs  END**/

  /* ScroolTo event Handlers for CTA buttons */
  document.querySelector("#cover .cta").addEventListener("click", (e) => {
    e.preventDefault();
    const devsSection = document.getElementById("developers");
    devsSection.scrollIntoView(scrollBehavior);
    gtag('event', 'cover-cta-click', {});
  });

  document.querySelectorAll("#developers .cta")
    .forEach((ctaButtonsList) => {
      ctaButtonsList.addEventListener("click", (cta) => {
        const dataProject = cta.target.getAttribute('data-project');
        const { Move } = projectsCarousel.Components;
        dataProject === 'Emaar' ? Move.jump(5)   : dataProject === 'SLS'  ? Move.jump(4) :  Move.jump(0);
        const projectsSection = document.getElementById("projects");
        projectsSection.scrollIntoView(scrollBehavior);
        gtag('event', 'developers-cta-click', { 'dev-name': dataProject});
      });
  });

  document.querySelectorAll("#projects .slide-content button.cta")
    .forEach((ctaButtonsList) => {
      ctaButtonsList.addEventListener("click", (cta) => {
        const projectTitle = cta.target.parentElement.getElementsByTagName("h3")[0].innerHTML;
        const langAttr = cta.target.getAttribute('lang');
        document.querySelector("#contact #projectn").value = langAttr === 'us' ? "I'm interested in " + projectTitle :    'אני מעוניין ב' + projectTitle ;
        document.getElementById("contact").scrollIntoView(scrollBehavior);
        gtag('event', 'project-cta-click', {'project-name': projectTitle});
      });
    });
  });

  /* Navigation + Hamburget / Mobile Nav Behavior */
  const toggleNav = () => {
    const nav = document.getElementById("nav");
    nav.className === "topnav" ? (nav.className += " open") : (nav.className = "topnav");
  };
  document.querySelector(".mob_menu_btn").addEventListener("click", () => toggleNav());
  document.querySelector("#nav .nav-list").addEventListener("click", event => {
      document.getElementById("nav").classList.contains("open") ? toggleNav() : null;
      const hrefAttr = document.querySelector("#container " + event.target.getAttribute('href'));
      hrefAttr ? hrefAttr.scrollIntoView(scrollBehavior) : null;
  });

/** International Tel Input */
const phoneInputField = document.querySelector("#phone");
const countryLabel = phoneInputField.getAttribute('data-country')

const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript: utilScriptJS,
  separateDialCode: true,
  autoPlaceholder: "polite",
  preferredCountries: countryLabel === "us" ? ['us', 'il']: ['il', 'us'],
});

/* Contact Form Handler */
const contactForm = document.querySelector("form");
const tryAgainBtn = document.querySelector(".form .error button");
tryAgainBtn.addEventListener("click", tryAgain);

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();
  gtag('event', 'form-submited', {});
  const fullNumber = phoneInput.getNumber();
  const data = new FormData(contactForm);
  data.set("phone", fullNumber);

 
  fetch(getFormEndpoint , {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        formSuccess();
        gtag('event', 'lead-confirmed', {});
      }
    })
    .catch((error) => {
      formError();
      console.log(error);
      gtag('event', 'error-sending-lead', {});
    });

 
});


/** FADE IN ANIMATION  **/
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
