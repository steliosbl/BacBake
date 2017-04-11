'use strict';

function checkResponsive() {
    var x = $("#nav");
    if (x.hasClass("topnav")){
        x.removeClass("topnav");
        x.addClass("nav navbar-fixed-top");
    }
    else{
        x.addClass("topnav");
    }
}

$(document).on('click', 'a[href^="#"]', function(e) {
    if ($("#nav").hasClass("navbar-fixed-top")){
        $("#nav").removeClass("navbar-fixed-top");
        $("#nav").addClass("topnav");
    }
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    var leftOffset = $(id).offset().left;
    if (leftOffset < 0) {
        leftOffset = 0;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // animated top scrolling
    $('body, html').animate({
        scrollTop: $(id).offset().top,
        scrollLeft: leftOffset
    });
});

function initFade() {
    $(".logo").fadeIn(1000);
    setTimeout(function() { $('.senplug').fadeIn(500); }, 1500);
    setTimeout(function() { $('.schlogo').fadeIn(500); }, 1500);
    setTimeout(function() { $(".social").fadeIn(500); }, 1500);
    setTimeout(function() { $('.topnav').fadeIn(500); }, 1500);
    $(".coverlogo").fadeOut(1000);
    $(".cover").fadeOut(1000);
};

$(document).scroll(function() {
    var y = $(this).scrollTop();
    $(".topnav").fadeIn();
    if (y > $(window).innerHeight() / 4) {
        $('.topbutton').fadeIn();
    } else {
        $('.topbutton').fadeOut();
    }
});

function topbutton() {
    $("body, html").animate({ scrollTop: 0 });
}


(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function computeMenuWidth() {
    var $menu = $('ul.teamlist');
    var $menuItems = $menu.children('li');

    $menuItems.width(parseFloat(100 / $menuItems.length) + '%');
    $menu.show();
}

function computePanelHeight() {
    var wHeight = $(window).height();
    var percentage = (52 / wHeight) * 100;
    $(".panel").css("height", (100 - percentage).toString() + "%");
}

var slideIndex = 1;
var slideInterval = null;
var slideTimeout = null;

function plusSlidesManual(n) {
    showSlides(slideIndex += n);
    clearInterval(slideInterval);
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(function() { slideInterval = autoSlides(); }, 8000);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("gallerypic");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function autoSlides() {
    return setInterval(function() { plusSlides(1); }, 5000)
}

$(function() {
    $.formUtils.addValidator({
        name: 'alphanumeric_gr',
        validatorFunction: function(value, $el, config, language, $form) {
            var re = /[a-zA-Z0-9ΆΈ-ώ\s]/;
            return re.test(value);
        },
        errorMessageKey: 'badAlphaNumeric'
    });
});

var greekValidation = {
    errorTitle: 'Υποβολή απέτυχε!',
    requiredField: 'Πρέπει να συμπληρώσετε το πεδίο',
    requiredFields: 'Δεν έχετε συμπληρώσει όλα τα απαιτούμενα πεδία',
    badEmail: 'Δεν έχετε δώσει σωστή διεύθυνση e-mail',
    badTelephone: 'Δεν έχετε δώσει σωστό αριθμό τηλεφώνου',
    lengthBadStart: 'Η τιμή πρέπει να είναι μεταξύ ',
    lengthBadEnd: ' χαρακτήρες',
    lengthTooLongStart: 'Η τιμή είναι μεγαλύτερη από ',
    lengthTooShortStart: 'Η τιμή είναι μικρότερη από ',
    badInt: 'Παρακαλώ εισάγετε αριθμό μεταξύ 1 και 10',
    badAlphaNumeric: 'Το πεδίο μπορεί να περιέχει μόνο αλφαβητικούς χαρακτήρες ',
    badAlphaNumericExtra: ' και ',
    groupCheckedRangeStart: 'Παρακαλώ επιλέξτε μεταξύ ',
    groupCheckedTooFewStart: 'Παρακαλώ επιλέξτε τουλάχιστον ',
    groupCheckedTooManyStart: 'Παρακαλώ επιλέξτε λιγότερα από ',
    groupCheckedEnd: ' τεμάχια',
    min: 'min',
    max: 'max',
};

function initValidation() {
    $.validate({
        modules: 'toggleDisabled',
        language: greekValidation,
        borderColorOnError: '#FF0000',
        addValidClassOnAll: true,
        errorMessagePosition: 'inline',
        submitHandler: function() {
            $("#buy form").ajaxSubmit();
        }
    });
}

var formOptions = {
    clearForm: true,
    url: "buy_post.php",
    type: "POST",
    success: function(data) {
        formMessage("Επιτυχία!", "green");
    },
    error: function(jXHR, textStatus, errorThrown) {
        formMessage("Κάτι πήγε στραβά!", "red");
    }
}

$(function() {
    $("#buy form").ajaxForm(formOptions);
});

function formMessage(message, color) {
    $("#buy form h2").remove();
    $("#buy form").append("<h2 style='color:" + color + " !important'>" + message + "</h2>")
    $("#buy form h2").hide().fadeIn(500);
}

function redirectIfTooSmall(){
    var w = window.innerWidth;
    if (w < 1060){
        window.location.replace("mobile.html"); 
    }
}

$(document).ready(function() {
    redirectIfTooSmall();
    computeMenuWidth();
    computePanelHeight();
    setTimeout(function() { initFade(); }, 1000);
    showSlides(slideIndex);
    slideInterval = autoSlides();
    initValidation();
})
