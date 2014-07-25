(function($) {

$.fn.thoughtBubble = function( defaults ) {

    var settings = $.extend({

        backgroundColor: 'white',
        fontColor: 'black',
        width: '330px',
        height: '210px',
        fontSize: '15px',
        bubbleColor: 'white'
        
        }, defaults ),

    animateTimeout,
    previousWindowSize,

    getBubbleDiv = function( container ) {

        var offset = container.offset(),
            modifiedHeight = offset.top - parseInt( settings.height ),
            style = '"position: absolute; top:' + modifiedHeight + 'px; left:' + offset.left + 'px ; width:' + settings.width + '; height:' + settings.height + ';"',
            bubbleContainer = "<div class='bubble-holder' style=" + style + ">" + getMainBubble() + getBubbles() + "</div>";

        return bubbleContainer;

    },

    getMainBubble = function() {

        return '<div class="main-bubble-holder"><div class="bubble main-bubble">' + getText() + '</div></div>';

    },

    getText = function() {

        return '<span style="vertical-align: middle; color: ' + settings.fontColor + ';font-size: ' + settings.fontSize + '; font-family: ' + settings.font + '">' + settings.text + '</span>';

    },

    getBubbles = function() {

        return '<div class="sm-bubble-holder"><div class="bubble bubbleLg"></div><div class="bubble bubbleMd"></div><div class="bubble bubbleSm"></div></div>';
    },

    animate = function( bubble ){
        clearTimeout( animateTimeout );

        var bubbles = $(document).find('.bubble'),
            reversed = bubbles.get().reverse(),
            timer = 0;

        animateTimeout = setTimeout( function() {
            $.each(reversed, function( index, element ) {

                setTimeout( function() { $(element).stop().animate({ opacity: 1 }); }, timer );

                timer += 100;

            });

        }, 100);

    },

    unanimate = function() {

        var bubbles = $(document).find('.bubble');

        bubbles.stop().animate({opacity: 0});

    },

    shiftDiv = function( container ) {

        var bubbleHolder = $(document).find('.bubble-holder'),
            previousPosition = container.offset().left;

        bubbleHolder.css('left', previousPosition);
    };

    return this.each( function() {

        var $this = $(this),
            container = getBubbleDiv( $this );

        $this.on('mouseenter', animate );

        $this.on('mouseout', unanimate );

        $(window).on('resize', function() { shiftDiv($this); });

        return $this.parent().prepend(container);

    });
    

};

})(jQuery);