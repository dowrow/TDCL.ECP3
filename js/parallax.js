(function (window, $) {

    'use strict';

    var jumboHeight = $('.jumbotron').outerHeight();

    function parallax() {
        var scrolled = $(window).scrollTop();
        $('.parallax').css('height', (jumboHeight - scrolled) + 'px');
    }

    function onReady() {
        $(window).scroll(function () {
            parallax();
        });
    }

    $(onReady);

}(window, $));
