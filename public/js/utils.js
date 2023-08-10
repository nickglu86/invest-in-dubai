const projectsElem  = {
      //Create element - Type, classes, content
      createElem : (type, classes = null, content= null) => {
            const elem = document.createElement(type);
            classes ? elem.classList.add(...classes) : null
            content ? elem.innerText = content : null
            return elem;
      },
      //Create eeProjectInfo ontainer
      createProjectInfo : ({location, price, type}, lang) => {
            //Create location  
            const locationElem = projectsElem.createElem("div",['location']);
            const locationpElem = projectsElem.createElem("p",null,location);
            locationElem.appendChild(locationpElem);
            //Create Prive  
            const priceElem = projectsElem.createElem("div",['price']);
            const priceSElem = projectsElem.createElem("span",null, lang === 'us' ? 'Starting Price:': "מחיר התחלתי:" );
            priceElem.appendChild(priceSElem);
            const pricePElem = projectsElem.createElem("p",null, price);
            priceElem.appendChild(pricePElem);
            //Create Type  
            const typeElem = projectsElem.createElem("div",['type']);
            const typePElem = projectsElem.createElem("p",null,type);
            typeElem.appendChild(typePElem);
            //Insert in Asset-Info Container
            const assetInfoElem = projectsElem.createElem("div",['asset-info']);
            assetInfoElem.appendChild(locationElem);
            assetInfoElem.appendChild(priceElem);
            assetInfoElem.appendChild(typeElem);
            
            return assetInfoElem;
      },
      //Create ImageContainer
      createImageContainer : ({images}, index) =>{
            const imagesContainer =  projectsElem.createElem("div",['image-container','splide']);
            imagesContainer.setAttribute('id', 'image-container-' + parseInt(index+1));
            const slidetrack =  projectsElem.createElem("div",['splide__track']);
            const spliceList = projectsElem.createElem("ul", ['splide__list']);
            images.forEach(
                  image => {
                        const liElem = projectsElem.createElem("li", ['splide__slide']);
                        const imgElem = projectsElem.getImg(image);
                        liElem.appendChild(imgElem);
                        spliceList.appendChild(liElem);
                  }
            )
            slidetrack.appendChild(spliceList);
            imagesContainer.appendChild(slidetrack);
            return imagesContainer;
      },
      //Create and Init Img element
      getImg : image => { 
            const imgElem = document.createElement('img');
            imgElem.setAttribute('src', "assets/projects/" + image);
            imgElem.setAttribute('alt',  image.slice(image.lastIndexOf('/') +1,image.lastIndexOf('.') ));
            imgElem.setAttribute('alt',  image.slice(image.lastIndexOf('/') +1,image.lastIndexOf('.') ));
            return imgElem;
      },
      //Create ThumbCarousel 
      createThumbCarousel: ({images}, index) => {
            const spliceList = projectsElem.createElem("ul", ['thumbnails']);
            spliceList.setAttribute('id', 'thumbnail-carousel-' + parseInt(index+1));
            images.forEach(
                  image => {
                        const liElem = projectsElem.createElem("li", ['thumbnail']);
                        const imgElem = projectsElem.getImg(image)
                        liElem.appendChild(imgElem);
                        spliceList.appendChild(liElem);
                  }
            )
             return spliceList;

      },
      //Create Project Desciption Elem 
      createProjDesc: ({desc}) => {
            let projDescElem = projectsElem.createElem("div", ['asset-desc']);
            desc.forEach(
                  p => {
                        const descP = projectsElem.createElem("p",'', p);
                        projDescElem.appendChild(descP);
                  }
            )
            return projDescElem;

      },
      //Create and Initialize Projects List
      init : (projectList, lang) => {
        const sliderTrack = document.querySelector('#slider-container .splide__track.slides-lists');
        let domElem = projectsElem.createElem('ul',['splide__list']);
         projectList.forEach((project, index) => {
            //Content Container 
            const contentContainer = projectsElem.createElem("div",['slide-content']);
            const titleElem  = projectsElem.createElem('h3',null,project.title);
            contentContainer.appendChild(titleElem);
            contentContainer.appendChild(projectsElem.createProjectInfo(project, lang));
            contentContainer.appendChild(projectsElem.createProjDesc(project));
            contentContainer.appendChild(projectsElem.createElem('button', ['cta'], lang === 'us' ? 'Check Availability': "בדוק זמינות" ));
            
            //Images Container
            const slideImages =  projectsElem.createElem("div",['slide-images']);
            const imagesContainer = (projectsElem.createImageContainer(project, index));
            slideImages.appendChild(imagesContainer);

            const thumbWrapper =  projectsElem.createElem("div",['thumb-wrapper']);

            thumbWrapper.appendChild(projectsElem.createThumbCarousel(project, index));
            slideImages.appendChild(thumbWrapper);
            const liElem = projectsElem.createElem("li",['splide__slide', 'slide', 'project'], "");

            //Creating li elem from both containers
            liElem.appendChild(slideImages);
            liElem.appendChild(contentContainer);
            domElem.appendChild(liElem);
         });
         sliderTrack.appendChild(domElem);
      }

}

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
  const contactForm = document.querySelector("form");
  contactForm.reset();
  formElem.style.display = "flex";
};

export { projectsElem , showSpinner, formSuccess, formError, tryAgain};