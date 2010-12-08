/*
 * clickmenu jQuery JavaScript Plugin v0.0.1
 *
 * Copyright 2010, Eric Christensen
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
 * Date: Wed Dec 08 2010 01:08:38 GMT-0700
 *
 */

(function($) {
  $.fn.clickmenu = function(arr) {
    var SetToggleColors = function(selector, color1, color2) {
      $(selector).hover(
        function() {
          $(selector).css("background-color", color2);
          $(selector).css("color", color1);
        }, 
        function() {
          $(selector).css("background-color", color1);
          $(selector).css("color", color2);
      });
    }
    
    var setCallback = function(inner_id, selector, func) {
      $("#" + inner_id ).click(
        function(evt) {
          $(selector).remove();
          func();
      });
    }
    
    this.click(function(evt) {
      var menu_color = "#DADADD";
      var div_id = "_" + Math.floor(Math.random()*99999999) + "_sub_menu";
      var selector = "#" + div_id;
      $("body").append("<div id=\""+div_id+"\"/>");
      var ht = arr.length*20 + 4
      ht += " px"
      $(selector).css({ "background-color": menu_color, 
        "border": "2px solid Gray",
        "height": ht, "width": "125px" });
      $(selector).mouseleave(function() { $(selector).remove(); });
      $(selector).css({ "position": "absolute", 
        "left": evt.pageX - 10, "top": evt.pageY - 10, 
        "font-family": "Arial,Calibri", "font-size": "8pt", "opacity": 1 });
      
      var di = Math.floor(Math.random()*99999999);
      for (var i=0; i < arr.length; i++) {
        var inner_id = "_" + di++ + "_sub_menu";
        $(selector).append("<div class=\"sub_menu\" id=\"" + inner_id + "\"/>")
        $("#" + inner_id).text(arr[i].text);
        var obj = arr[i];
        setCallback(inner_id, selector, obj.callback);
      }

      $(".sub_menu").each(function(i, element) {
        $(element).css({ "height": "14px", "width": "125px" });
        SetToggleColors($(element), menu_color, "black");
      });
    });
  }

  return this;

})(jQuery);

