function checkResponsive() {
    var x = $("#nav");
    if (x.hasClass("topnav")) {
        x.removeClass("topnav");
        x.addClass("nav navbar-fixed-top");
    } else {
        x.addClass("topnav");
    }
}

$(document).on('click', 'a[href^="#"]', function(e) {
    if ($("#nav").hasClass("navbar-fixed-top")) {
        $("#nav").removeClass("navbar-fixed-top");
        $("#nav").addClass("topnav");
    }
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $(id).offset().top;

    // animated top scrolling
    $('body, html').animate({
        scrollTop: pos
    });
});

function computePanelHeight() {
    var wHeight = $(window).height();
    var percentage = (52 / wHeight) * 100;
    $("#home img").css("width", (100 - percentage).toString() + "%");
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

$(document).ready(function() {
    computePanelHeight();
    initValidation();
    showSlides(slideIndex);
    slideInterval = autoSlides();
});
