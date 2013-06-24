/*
 * clickmenu jQuery JavaScript Plugin v0.2
 *
 * Copyright 2013, Eric Christensen
 * 
 * Permission to use, copy, modify, and distribute this software and its 
 * documentation for any purpose and without fee is hereby granted, provided 
 * that the above copyright notice appear in all copies and that both that 
 * copyright notice and this permission notice appear in supporting 
 * documentation, and that the name of the copyright holder not be used in 
 * advertising or publicity pertaining to distribution of the software 
 * without specific, written prior permission. The copyright holder makes
 * no representations about the suitability of this software for any 
 * purpose. It is provided "as is" without express or implied 
 * warranty.
 *  
 * THE COPYRIGHT HOLDERS DISCLAIM ALL WARRANTIES WITH REGARD TO THIS 
 * SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
 * FITNESS, IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER 
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF 
 * CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN 
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * Date: Thu Jun 20 2013 17:23:33 GMT-0600
 *
 */

(function ($) {
    $.fn.clickmenu = function (the_object) {
      /*
        Accepts an object containing an array (called items) 
        of objects with text and callback properties.
        The text is displayed on the menu.
        The callback is executed when the menu item is selected.
        Here is an example object you could send to clickmenu.
          {items:
            [
              {text:"aaaa", callback:function(){} },
              {text:"bbbb", callback:function(){} },
              {text:"cccc", callback:function(){} }
            ]
          }
        Put these three classes in your CSS to style your menu:
          clickmenu
          clickmenu-enter
          clickmenu-leave
        */
        
        var arr = the_object.items;
        var addToggleClass = function (selector, enter, leave) {
            $(selector).hover(
                function () {
                    $(selector).addClass(enter);
                    $(selector).removeClass(leave);
                },
                function () {
                    $(selector).addClass(leave);
                    $(selector).removeClass(enter);
                });
        };

        var setCallback = function (inner_id, selector, func) {
            $("#" + inner_id).click(
                function (evt) {
                    $(selector).remove();
                    func();
                });
        };

        this.click(function (evt) {
            var div_id = "_" + Math.floor(Math.random() * 99999999) + "_sub_menu";
            var selector = "#" + div_id;
            $("body").append("<div id=\"" + div_id + "\" class=\"clickmenu\" />");
            $(selector).mouseleave(function () { $(selector).remove(); });
            $(selector).css({ "position": "absolute",
                "left": evt.pageX - 10, "top": evt.pageY - 10,
                "font-size": "-1", "opacity": 1
            });

            var di = Math.floor(Math.random() * 99999999);
            for (var i = 0; i < arr.length; i++) {
                var inner_id = "_" + (di++) + "_sub_menu";
                $(selector).append("<div class=\"sub_menu clickmenu-leave\" id=\"" + inner_id + "\"/>")
                $("#" + inner_id).text(arr[i].text);
                var obj = arr[i];
                setCallback(inner_id, selector, obj.callback);
            };
            $(".sub_menu").each(function (i, element) {
                addToggleClass($(element), "clickmenu-enter", "clickmenu-leave");
            });
        });
    }

    return this;

})(jQuery);
