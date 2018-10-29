'use strict';

// инициализация слайдера
var SLIDER_INTERVAL = 8000;

$('.slider-container.top').slick({
    autoplay: true,
    autoplaySpeed: SLIDER_INTERVAL,
    infinite: true,
    nextArrow: false,
    prevArrow: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    rtl: true,
    slidesToShow: 4,
    slidesToScroll: 1
})

$('.slider-container.bottom').slick({
    autoplay: false,
    nextArrow: false,
    prevArrow: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    slidesToShow: 4,
    slidesToScroll: 1
})

var PROMO_INTERVAL = 8000;
var MAX_CHANGES_BEFORE_OPEN = 8;
var SHORT_TEXT_MAX_SIZE = 100;

var sliderIter = 0;

var smallFontSize = '1.2rem';
var bigFontSize = '1.6rem';
var popupCollection = $('.slider-popup__text');

var isPopupNeedShowed = false;

// управляет показом промоблока
$('.slider-container.top').on('beforeChange', function() {
    sliderIter++;
    if (sliderIter % MAX_CHANGES_BEFORE_OPEN === 0) {
        var topSliderShift = ($(this).height()*(-0.80));
        var bottomSliderShift = ($(this).height()*(0.80));

        $(this).animate({top: topSliderShift}, SLIDER_INTERVAL / 2);
        $('.slider-container.bottom').animate({top: bottomSliderShift}, SLIDER_INTERVAL / 2);
        $('.promo').animate({opacity: '1'}, SLIDER_INTERVAL / 2);
        $('.slider-container.top').slick('slickPause');

        setTimeout(function() {
            $(this).animate({top: 0}, SLIDER_INTERVAL / 2);
            $('.slider-container.bottom').animate({top: 0}, SLIDER_INTERVAL / 2);
            $('.promo').animate({opacity: '0'}, SLIDER_INTERVAL / 2);
            $('.slider-container.top').slick('slickPlay');
        }.bind(this), PROMO_INTERVAL + (SLIDER_INTERVAL / 2));
    } 
});

// изменяет размер шрифта в зависимости от длины строки
popupCollection.each(function(index) {
    var targetPopup = $(popupCollection[index])
  
    if (targetPopup.html().length <= SHORT_TEXT_MAX_SIZE) {
      targetPopup.css({ fontSize: bigFontSize })
    } else {
      targetPopup.css({ fontSize: smallFontSize })
    }
  })

// управляет показом сообщений из социальных сетей
setInterval(function() { 
    isPopupNeedShowed = !isPopupNeedShowed;

    if (isPopupNeedShowed) {
        var popupHeight = ($('.slide__popup-wrapper').height() * 0.85);
        var popupWidth = ($('.slide__popup-wrapper').width() * 0.95);

        $('.slider-popup__text-wrapper--has-message').animate({height: popupHeight, width: popupWidth}, 2000);
        $('.slider-popup__text--has-message').delay(2000).animate({opacity: 1}, 2000);
        } else {
            $('.slider-popup__text--has-message').animate({opacity: 0}, 2000);
            $('.slider-popup__text-wrapper--has-message').delay(2000).animate({height: 0, width: 0}, 2000);
        }
    }, 12000);
