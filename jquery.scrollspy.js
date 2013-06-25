
; (function ($, window, document, undefined) {

    $.fn.extend({
        scrollspydominant: function (options) {

            var elements = this;
            var viewportMid;
            var activeElement;
            var scrollTop = 0;
            var scrollDirection = 'down';

            var defaults = {
                focalPoint: 0.5, // (0 - 1) The part of the screen where an element is considered to be dominant
                edgeSnapTolerance: 0 // The additional area which is considered to be the top or bottom of the screen
            }
            options = $.extend(defaults, options);

            $(window).bind('scroll', function (e) {

                scrollDirection = (scrollTop < $(window).scrollTop()) ? 'down' : 'up'; // Does this matter?

                scrollTop = $(window).scrollTop();

                viewportMid = scrollTop + $(window).height() * options.focalPoint; // Get the offset of the middle of the viewport in relation to the document
                var dominantElement = getDominantElement();

                if (activeElement == null || dominantElement.get(0) != activeElement.get(0) ) {

                    if ($.isFunction(options.onChange)) {
                        options.onChange(dominantElement);
                    }
                }

                activeElement = dominantElement;

            });

            return this.each(function (i) {
                // Anything to do here?
            });

            function getDominantElement() {

                // If we're right at the top of the page, return the first element
                if (isScrollTop()) return elements.first();
                // Or if we're at the bottom, return the last
                if (isScrollBottom()) return elements.last();
                // Otherwise, find which one occupies the mid-point of the viewport
                return focalElement();

            }

            function isScrollTop() {
                return scrollTop <= options.edgeSnapTolerance;
            }

            function isScrollBottom() {
                return $(window).height() + scrollTop + options.edgeSnapTolerance >= $('body').height();
            }

            function focalElement() {
                var returnElem;
                elements.each(function () {

                    var elem = $(this);

                    // Get the position of the top and bottom of this element in relation to the viewport
                    var elemTop = elem.offset().top;
                    var elemBottom = elemTop + elem.outerHeight();

                    if (viewportMid > elemTop  && viewportMid < elemBottom) {
                        returnElem = elem;
                    }

                });

                return returnElem;

            }

        }

    })


})(jQuery, window);
