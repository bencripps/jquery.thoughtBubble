(function($) {

$.fn.thoughtBubble = function( defaults ) {

    var settings = $.extend({

        backgroundColor: 'white',
        fontColor: 'black',
        width: '330px',
        height: '210px',
        fontSize: '15px',
        bubbleColor: 'white',
        speed: 125
        
        }, defaults ),

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

    animate = function(){

        var bubbles = $(document).find('.bubble'),
            reversed = bubbles.get().reverse(),
            speed = settings.speed;
        
        $(reversed[0]).stop().animate({ opacity: 1}, speed, function() {
            $(reversed[1]).animate({ opacity: 1}, speed, function() {
                $(reversed[2]).animate({ opacity: 1}, speed, function() {
                    $(reversed[3]).animate({ opacity: 1},speed);
                });
            });
        });

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

        $(window).on('resize', shiftDiv.bind(this, $this) );

        return $this.parent().prepend(container);

    });
    

};

})(jQuery);