// Свайпер
const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 12,
  slidesPerGroup: 1,
  navigation:{
    prevEl: '.arrows-container .arrow-left',
    nextEl: '.arrows-container .arrow-right'
  },
  // mousewheel: {
  //   releaseOnEdges: true,
  //   eventsTarget: "container",
  // },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    768: {
      spaceBetween: 12,
      slidesPerView: 2,
    },
    320: {
      spaceBetween: 4,
      slidesPerView: 'auto'
    }
  }
});


// Свайпер надписи на баннере
// const textSwiper = new Swiper('.h1-block-slider-container',{
//   direction: 'vertical',
//   slidesPerView: 1,
//   loop: true,
//   allowSlideNext: false,
//   allowSlidePrev: false,
//   allowTouchMove: false,
//   controller: {
//     by: 'slide'
//   }
// });

// Свайпер главного баннера
const swiperMain = new Swiper('.swiper-main-element .content-right', {
  direction: 'horizontal', 
  slidesPerView: 1, 
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoHeight: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  // controller: {
  //   by: 'slide',
  //   control: textSwiper
  // }
});

// Аккордионы на главной странице

$(".accordion").click(function() {
  $(this).toggleClass("active");
  var panel = $(this).find(".accordion-body");
  if (panel.css("display") === "none") {
    panel.slideDown();
  } else {
    panel.slideUp();
  }
});

// Цвет хедера при скролле
window.onscroll = function() {
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");

  if (window.pageYOffset > main.offsetTop) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

// открыть поиск на странице "проекты"

const searchBtn = document.querySelector(".ul-filter-item.search .ul-filter-a")
const searchInput = document.querySelector(".search-input-wrapper")
if (searchBtn) {
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchInput.classList.toggle("active");
  });
}


// Анимированный переход между табами на странице "Проекты"
$('.ul-filter-item.all-project').click(function(e) {
  e.preventDefault();

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('section[data-content="2"]').fadeOut(200);
    $('section[data-content="1"]').fadeIn(200);
  } else {
    $(this).addClass('active');
    $('section[data-content="1"]').fadeOut(200);
    $('section[data-content="2"]').fadeIn(200);
  }
});

// Свайпер на странице Кругобайкальская железная дорога

const swiperCard = new Swiper (".card-swiper",{
  slidesPerView: 'auto',
  autoHeight: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1279: {
      navigation: {
        enabled: true
      }
    },
    320: {
      navigation: {
        enabled: false
      }
    }
  }
})

// Высчитывание правельной полноэкранной высоты
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight);
appHeight();


// всплывающая форма рассылки
$(document).ready(function (){
  function popUpMailForm (){
    const linkMail = document.querySelector('.subscribe-link a')
    const mailForm = document.querySelector('.mail-form-container')
    const btnClose = document.querySelector('.close-btn')
    if(linkMail){
      linkMail.addEventListener('click',function (e){
        e.preventDefault();
        mailForm.classList.toggle("active")
      })
    }
    if(btnClose){
      btnClose.addEventListener('click', function(e) {
        this.closest('.mail-form-container').classList.toggle('active');
      });
    }
    document.addEventListener('click', function (e){
      if (!mailForm.contains((e.target)) && !linkMail.contains(e.target)){
        mailForm.classList.remove("active")
      }
    })
  };
  popUpMailForm()
})

// Кнопка куки
$(document).ready(function (){
  function btnCookieClose (){
    const btnCookie = document.querySelector('.btn.close');
    if(btnCookie){
      btnCookie.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentElement.style.display = 'none';
      });
    }
  };
  btnCookieClose()
})

// Мобильный фильтр для списка проектов
$.fn.mobileFilterScript = function() {

  const windowWidth = $( window ).width();
  var jqAllAffectedContainers = this;

  if (windowWidth > 1024) {
    return this;
  }

  jqAllAffectedContainers.each(function() {
      const mainContainer = $(this);
      const structure = {
        'background': mainContainer.find('.main-filter-block-mobile-background'),
        'filterItems': mainContainer.find('.ul-filter-item.mobile-filter-item'),
        'searchBtn': mainContainer.find('.search-alt>a.ul-filter-a'),
        'searchContainer': mainContainer.find('.ul-filter-item.search'),
        'searchContainerClose': mainContainer.find('.ul-filter-item.search .mobile-close'),
      }
      let errors = 0;
      for (const [name, localContainer] of Object.entries(structure)) {
        if (localContainer.length <= 0) {
          console.error(`mobileFilterScript: container ${name} not found with local result:`, localContainer);
          errors += 1;
        }
      }
      if (errors > 0) {
        return;
      }

      // filter items
      $(structure.filterItems).each(function() {
        const filterItem = $(this);
        const localStructure = {
          'link': filterItem.find('a.ul-filter-a'),
          'menu': filterItem.find('.header-dropdown-menu'),
          'close': filterItem.find('.mobile-close'),
        }
        let localErrors = 0;
        for (const [name, localItemContainer] of Object.entries(localStructure)) {
          if (localItemContainer.length <= 0) {
            console.error(`mobileFilterScript: container ${name} not found with local result:`, localItemContainer);
            localErrors += 1;
          }
        }
        if (localErrors > 0) {
          return;
        }
        localStructure.link.on('click', function(e) {
          e.preventDefault();
          localStructure.menu.addClass('active');
          structure.background.addClass('active');
          $('body').addClass('non-scrollable');
        });
        localStructure.close.on('click', function(e) {
          e.preventDefault();
          localStructure.menu.removeClass('active');
          structure.background.removeClass('active');
          $('body').removeClass('non-scrollable');
        });
      });

      // search
      structure.searchBtn.on('click', function(e) {
        e.preventDefault();
        structure.searchContainer.addClass('active');
        structure.background.addClass('active');
        $('body').addClass('non-scrollable');
      });
      structure.searchContainerClose.on('click', function(e) {
        e.preventDefault();
        structure.searchContainer.removeClass('active');
        structure.background.removeClass('active');
        $('body').removeClass('non-scrollable');
      });
  });

  return this;
};

document.addEventListener('DOMContentLoaded', function() {
  $('.mobile-filter-js').mobileFilterScript();
});

// Swiper для проектов детальки сервиса

const swiperServiceDetailProjects = new Swiper (".products-in-service-swiper-js",{
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    1279: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 'auto',
      spaceBetween: 4,
    }
  }
})
