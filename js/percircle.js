!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof exports&&"object"==typeof module?module.exports=r(require("jquery")):r(jQuery)}(function(r,t){"use strict";r.fn.percircle=function(t){var e={animate:!0};t||(t={}),r.extend(t,e);var a=3.6;return this.each(function(){var e=r(this),o="",s=function(r,t){e.on("mouseover",function(){r.children("span").css("color",t)}),e.on("mouseleave",function(){r.children("span").attr("style","")})};e.hasClass("percircle")||e.addClass("percircle"),"undefined"!=typeof e.attr("data-animate")&&(t.animate="true"==e.attr("data-animate")),t.animate&&e.addClass("animate"),"undefined"!=typeof e.attr("data-color")?(t.progressBarColor=e.attr("data-color"),o="style='border-color: "+t.progressBarColor+"'",s(r(this),t.progressBarColor)):"undefined"!=typeof t.progressBarColor&&(o="style='border-color: "+t.progressBarColor+"'",s(r(this),t.progressBarColor));var n=e.attr("data-percent")||t.percent||0,d=e.attr("data-perclock")||t.perclock||0;if(d)e.hasClass("perclock")||e.addClass("perclock"),setInterval(function(){var t=new Date,a=l(t.getHours())+":"+l(t.getMinutes())+":"+l(t.getSeconds());e.html("<span>"+a+"</span>"),r('<div class="slice"><div class="bar" '+o+'></div><div class="fill" '+o+"></div></div>").appendTo(e);var s=t.getSeconds();0===s&&e.removeClass("gt50"),s>30&&(e.addClass("gt50"),r(".bar",e).css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-ms-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"}));var n=6*s;r(".bar",e).css({"-webkit-transform":"rotate("+n+"deg)","-moz-transform":"rotate("+n+"deg)","-ms-transform":"rotate("+n+"deg)","-o-transform":"rotate("+n+"deg)",transform:"rotate("+n+"deg)"})},1e3);else{n>50&&e.addClass("gt50");var i=e.attr("data-text")||t.text||n+"%";r("<span>"+i+"</span>").appendTo(e),r('<div class="slice"><div class="bar" '+o+'></div><div class="fill" '+o+"></div></div>").appendTo(e),n>50&&r(".bar",e).css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-ms-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"});var c=a*n;setTimeout(function(){r(".bar",e).css({"-webkit-transform":"rotate("+c+"deg)","-moz-transform":"rotate("+c+"deg)","-ms-transform":"rotate("+c+"deg)","-o-transform":"rotate("+c+"deg)",transform:"rotate("+c+"deg)"})},0)}var l=function(r){return 10>r?"0"+r:r}})}});