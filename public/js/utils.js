export const projectsElem  = {
      createElem : (type, classes = null, content= null) => {
            const elem = document.createElement(type);
            classes ? elem.classList.add(...classes) : null
            content ? elem.innerText = content : null
            return elem;
         },
      createProjectInfo : ({location, price, type}) => {
          
            const assetInfoElem = projectsElem.createElem("div",['asset-info']);
            const locationElem = projectsElem.createElem("div",['location']);
            const locationpElem = projectsElem.createElem("p",null,location);
            locationElem.appendChild(locationpElem);

            const priceElem = projectsElem.createElem("div",['price']);
            const priceSElem = projectsElem.createElem("span",null,'Starting Price:');
            priceElem.appendChild(priceSElem);
            const pricePElem = projectsElem.createElem("p",null, price);
            priceElem.appendChild(pricePElem);

            const typeElem = projectsElem.createElem("div",['type']);
            const typePElem = projectsElem.createElem("p",null,type);
            typeElem.appendChild(typePElem);

            assetInfoElem.appendChild(locationElem);
            assetInfoElem.appendChild(priceElem);
            assetInfoElem.appendChild(typeElem);
            
            return assetInfoElem;
      },
      createThumbImg : ({thumbnailImg}) => {
            const imageElem = projectsElem.createElem("div");
            imageElem.style = `background-image: url(assets/projects/${thumbnailImg})`;
            return imageElem;
      },
      
      createThumbCarousel: ({images}, index) => {
            const thumbCarouselElem = projectsElem.createElem("div", ['images-list','splide', 'thumbnail-carousel']);
            thumbCarouselElem.setAttribute('id', 'thumbnail-carousel-' + index +1)
            const trackElem = projectsElem.createElem("div", ['splide__track']);
            const spliceList = projectsElem.createElem("ul", ['splide__list','images-list']);
            images.forEach(
                  image => {
                        const liElem = projectsElem.createElem("li", ['splide__slide']);
                        const imgElem = document.createElement('img');
                        imgElem.setAttribute('src', "assets/projects/" + image);
                        liElem.appendChild(imgElem);
                        spliceList.appendChild(liElem);
                  }
            )
            trackElem.appendChild(spliceList);
             thumbCarouselElem.appendChild(trackElem);
             return thumbCarouselElem;

      },
      createProjDesc: ({desc}) => {
            let projDescElem = projectsElem.createElem("div", ['asset-desc']);
            desc.forEach(
                  p => {
                        const descP = projectsElem.createElem("p",'', p);
                        projDescElem.appendChild(descP)
                  }
            )
            return projDescElem;

      },
      init : projectList => {
        const sliderTrack = document.querySelector('#slider-container .splide__track.slides-lists');
        let domElem = projectsElem.createElem('ul',['splide__list']);
         projectList.forEach((project, index) => {
            //Content Container 
            const contentContainer = projectsElem.createElem("div",['slide-content']);
            const titleElem  = projectsElem.createElem('h3',null,project.title);
            contentContainer.appendChild(titleElem);
            contentContainer.appendChild(projectsElem.createProjectInfo(project));
            contentContainer.appendChild(projectsElem.createProjDesc(project));
            contentContainer.appendChild(projectsElem.createElem('button', ['cta'], 'Check Availability' ));
            


            //Images Container
            const slideImages =  projectsElem.createElem("div",['slide-images']);
            const imagesContainer =  projectsElem.createElem("div",['image-container']);
            imagesContainer.appendChild(projectsElem.createThumbImg(project));
            slideImages.appendChild(imagesContainer);
            slideImages.appendChild(projectsElem.createThumbCarousel(project, index));
            const liElem = projectsElem.createElem("li",['splide__slide', 'slide'], "");

            liElem.appendChild(slideImages);
            liElem.appendChild(contentContainer);
            domElem.appendChild(liElem);
         });
         sliderTrack.appendChild(domElem);
      }

}