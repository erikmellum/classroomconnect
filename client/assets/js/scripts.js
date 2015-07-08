function checkWindowSize() {

    if ( $(window).width() < 500 ) {
        $('#leftAside').hide();
        $('h3').fitText(.7);
        $('#body h1').fitText(1.7);
        $('#body').css({'left':'5%', right: '5%'});
        $('.TopNavButton').css({'float':'left'});
    }
    else {
        $('#leftAside').show();
        $('h3').fitText(.7);
        $('#body h1').fitText(1.7);
        $('#body').css({'left':'30%'});
        $('.TopNavButton').css({'float':'right'});
    }

    }
    $(window).load(checkWindowSize);
    $(window).resize(checkWindowSize);