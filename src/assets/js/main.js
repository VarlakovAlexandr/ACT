const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mobile-menu');
const mobMenuContainer = document.querySelector('.mobile-menu__inner');
const header = document.querySelector('.header');
const mobMenuClose = document.querySelector('.mobile-menu__close');
const headerTop = document.querySelector('.header-top');

let vh = window.innerHeight * 0.01;



window.addEventListener('scroll', function(){
	
	let dw = document.documentElement.clientWidth;
	


    if ( window.scrollY > 0 && dw >= 1280 ){
        let headerTopHeight = headerTop.offsetHeight;
        header.style.top = '-' + headerTopHeight + 'px';
        header.classList.add('scrolled');
    } else{
        header.style.top = '0'
        header.classList.remove('scrolled');
    }
})

const hideMenu = () => {
	const setDefMenuCondition = function(){
		mobMenu.classList.remove('active');
		mobMenu.classList.remove('hide');
		document.body.classList.remove('no-scroll');
		mobMenuContainer.removeEventListener('transitionend', setDefMenuCondition);
	}

	mobMenuContainer.addEventListener('transitionend', setDefMenuCondition);
	mobMenu.classList.add('hide');
}


document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  hideMenu();
});


hamburger.addEventListener('click', function(){

	if ( mobMenu.classList.contains('active') || mobMenu.classList.add('active')) return null;
	mobMenu.classList.add('active')



	document.body.classList.add('no-scroll');

	
})


mobMenuClose.addEventListener('click', hideMenu)





const openCatalog = document.querySelector('.header-show-catalog');
const desktopCatalog = document.querySelector('.header-catalog');

if ( openCatalog && desktopCatalog){
	openCatalog.addEventListener('click', function(){
		if ( !this.classList.contains('active') ){
			this.classList.add('active');
			desktopCatalog.classList.add('active');
		} else {
			this.classList.remove('active');
			desktopCatalog.classList.remove('active');
		}
	})
}

new ItcAccordion(document.querySelector('#accordion-menu'), {
	alwaysOpen: false
});

new ItcAccordion(document.querySelector('#accordion-catalog'), {
	alwaysOpen: false
});


const accordionFillter = document.querySelector('#filter-accordion');

if ( accordionFillter ){
    new ItcAccordion(accordionFillter, {
        alwaysOpen: true
    }); 
}



const footerAccordions = document.querySelectorAll('.accordion-footer');

if ( footerAccordions.length ){
	footerAccordions.forEach( fa => {
		new ItcAccordion(fa, {
			alwaysOpen: false
		});	
	} )
}

/*

data-to-jump="#test"  - куда переносимся
data-media-jump="768" - media breakpoint
data-mode="desktop-first" - если не указано то по умолчанию mobile-first

*/
document.addEventListener('DOMContentLoaded', function(){
    let jumpBlocks = document.querySelectorAll('[data-to-jump][data-media-jump]');

    if ( jumpBlocks.length ){
        jumpBlocks.forEach( jb => {
            
            const targetBlockLink = jb.getAttribute('data-to-jump');
            const targetBlockNode = document.querySelector(targetBlockLink);
            const targetMedia = Number(jb.getAttribute('data-media-jump'));
            

            const initialParent = jb.parentNode;
            
            let vw = document.documentElement.clientWidth;
            
            if ( targetBlockNode &&  targetMedia )  {

                const mode = jb.getAttribute('data-mode');

                if ( mode === 'desktop-first' ){
                    if ( vw <= targetMedia ) targetBlockNode.append(jb);
                } else{
                    if ( vw >= targetMedia ) targetBlockNode.append(jb);
                }
                
                

                window.addEventListener('resize', function(){
                    
                    let currentParent = jb.parentNode;
                    let vw = document.documentElement.clientWidth;

                    if ( mode === 'desktop-first' ){
                        if ( vw <= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw > targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }

                    } else{
                        if ( vw >= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw < targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }
                    }
                })
            }


            

        } )  
    }

})




const searchSubmit = document.querySelector('.h-search-form__submit');
const searchReset = document.querySelector('.h-search-form__reset');

searchSubmit.addEventListener('click', function(event){
	event.preventDefault();

	const form = this.closest('form');
	const input = form.querySelector('input');


	if ( !form.classList.contains('active') ){
		form.classList.add('active');
		input.focus();
	} else{
		form.submit()
	}

})


searchReset.addEventListener('click', function(event){
	const form = this.closest('form');
	form.reset();
	form.classList.remove('active');
})


let modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});

const feedbackForm = document.querySelectorAll('.feedback-form');

if ( feedbackForm.length ){
    feedbackForm.forEach( ff => {
        ff.addEventListener('submit', function(event){
            event.preventDefault();
            modals.close('#feedback-modal')
            modals.open('#thanks-modal')
        })
    } )
}

Fancybox.bind('[data-fancybox]', {
    compact: false,
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    Toolbar: {
      display: {
        left: [
          "infobar",
        ],
        middle : [],
        right: [
          "iterateZoom",
          "close",
        ],
      }
    }
  });  




const reviewsSlider =  new Swiper(".reviews-slider.swiper", {
    speed: 1000,
    
    slidesPerView: 1,
    spaceBetween: 20,
    
    
    navigation: {
        nextEl: '.slider-nav.slider-next.reviews-next',
        prevEl: '.slider-nav.slider-prev.reviews-prev',
    },

    pagination: {
        el: '.slider-pagination.reviews-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1000: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
})


const lastNews = new Swiper(".last-news-list.swiper", {
    speed: 1000,
    
    slidesPerView: 1.2,
    spaceBetween: 20,
    
    navigation: {
        nextEl: '.slider-nav.slider-next.reviews-next',
        prevEl: '.slider-nav.slider-prev.reviews-prev',
    },


    breakpoints: {
        640: {
            slidesPerView: 2.2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20
        },

        
    }
})


const moreNews = new Swiper(".more-news.swiper", {
    speed: 1000,
    
    slidesPerView: 1.2,
    spaceBetween: 20,
    
    navigation: {
        nextEl: '.slider-nav.slider-next.reviews-next',
        prevEl: '.slider-nav.slider-prev.reviews-prev',
    },


    breakpoints: {
        480: {
            slidesPerView: 1.8,
            spaceBetween: 20
        },
        640: {
            slidesPerView: 2.2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20
        },

        1200: {
            slidesPerView: 4,
            spaceBetween: 20
        },
    }
})


const partnersSlider = new Swiper(".partners-slider.swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
        nextEl: '.slider-nav.slider-next.partners-next',
        prevEl: '.slider-nav.slider-prev.partners-prev',
    },
    breakpoints: {
        400: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        600: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        800: {
            slidesPerView: 5,
            spaceBetween: 20
        },

        1000: {
            slidesPerView: 6,
            spaceBetween: 20
        },

        1100: {
            slidesPerView: 7,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 8,
            spaceBetween: 20
        }
    }
})

const advantagesSlider = new Swiper(".advantages-slider.swiper", {
    slidesPerView: 2,
    spaceBetween: 12,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    breakpoints: {
        400: {
            slidesPerView: 2,
            spaceBetween: 12
        },
        500: {
            slidesPerView: 3,
            spaceBetween: 12
        },
        600: {
            slidesPerView: 4,
            spaceBetween: 12
        },
        800: {
            slidesPerView: 5,
            spaceBetween: 16
        },

        1000: {
            slidesPerView: 6,
            spaceBetween: 16
        },

        
        1200: {
            slidesPerView: 7,
            spaceBetween: 20
        }
    }
})



const tagList = new Swiper(".tag-list.swiper", {
    speed: 1000,
    
    slidesPerView: 'auto',
    spaceBetween: 25,
    freeMode: true,
    
    
    
})


const loadBtns = document.querySelectorAll('.load-btn');

if ( loadBtns.length ){
    loadBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            this.classList.add('active')
        })
    } )
}



const openFilter = document.querySelector('.open-filter');
const filterContainer = document.querySelector('.shop-container__filter-aside');
const closeFilter = document.querySelector('.shop-aside__close');
const applyFilter = document.querySelector('.apply-filter');



if ( openFilter ){
    openFilter.addEventListener('click', function(){
        filterContainer.classList.add('open');
    })
}

if ( closeFilter ){
    closeFilter.addEventListener('click', function(){
        filterContainer.classList.remove('open');
    })
}

if ( applyFilter ){
    applyFilter.addEventListener('click', function(){
        filterContainer.classList.remove('open');
    })
}


const prjThumbsGallery = new Swiper(".prj-thumbs-gallery.swiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    
    watchSlidesProgress: true,

    breakpoints: {
        400: {
            slidesPerView: 4,
            spaceBetween: 12
        },
       
        600: {
            slidesPerView: 5,
            spaceBetween: 12
        },
        800: {
            slidesPerView: 5,
            spaceBetween: 16
        },

        1000: {
            slidesPerView: 6,
            spaceBetween: 19
        },

        
        
    }
    
});
const pgGallery = new Swiper(".pg-gallery.swiper", {
    spaceBetween: 10,
    speed: 1000,
    thumbs: {
      swiper: prjThumbsGallery,
    },
    navigation: {
        nextEl: ".pg-gallery-nav.next",
        prevEl: ".pg-gallery-nav.prev",
      },
});



const pspThumbs = new Swiper(".psp-thumbs.swiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    
    watchSlidesProgress: true,

    breakpoints: {
        400: {
            slidesPerView: 4,
            spaceBetween: 12
        },
       
        600: {
            slidesPerView: 5,
            spaceBetween: 12
        },
        800: {
            slidesPerView: 5,
            spaceBetween: 16
        },
        1024: {
            slidesPerView: 5,
            direction: "vertical",
        }
    }
})


const spGallery = new Swiper(".sp-gallery.swiper", {
    spaceBetween: 10,
    speed: 1000,
    thumbs: {
      swiper: pspThumbs,
    },

    navigation: {
        nextEl: ".sp-gallery-nav.next",
        prevEl: ".sp-gallery-nav.prev",
      },
});


const spGalleryContainer = document.querySelector('.sp-gallery.swiper');
const pspThumbsContainer = document.querySelector('.psp-thumbs.swiper');

if ( spGalleryContainer  && pspThumbsContainer ){
    document.addEventListener('DOMContentLoaded', function(){

        let vw = document.documentElement.clientWidth;
        if ( vw >= 1024 ){
            let height = spGalleryContainer.offsetHeight;
            pspThumbsContainer.style.height = height + 'px';
        }

        

        window.addEventListener('resize', function(){
            let vw = document.documentElement.clientWidth;
            if ( vw >= 1024 ){
                let height = spGalleryContainer.offsetHeight;
                pspThumbsContainer.style.height = height + 'px';
            }   else{
                pspThumbsContainer.style.height = 'auto';
            }
        })
    })
}

const tabSheet = document.querySelectorAll('.tab-sheet');
if ( tabSheet.length ){
    
    tabSheet.forEach( ts => {

        const tabs = ts.querySelectorAll('.tab-sheet__tab');
        const sheets = ts.querySelectorAll('.tab-sheet__sheet');
        

        tabs.forEach( (tab, index) => {
            tab.addEventListener('click', function(){
                if ( this.classList.contains('active') ) return false;

                const activeTab = ts.querySelector('.tab-sheet__tab.active');
                activeTab.classList.remove('active');

                const activeSheet = ts.querySelector('.tab-sheet__sheet.active');
                activeSheet.classList.remove('active');

                this.classList.add('active');

                sheets[index].classList.add('active');
            })
        })

    } )

}





const quizSlider = new Swiper(".swiper.quiz", {
    speed: 1000,
    
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false,
    
    navigation: {
        nextEl: '.quiz-next',
        prevEl: '.quiz-prev',
    },
    
})