/*--------------------------------------------------------------------------

    jq-idealforms 2.0

    * Author: Cedric Ruiz
    * License: GPLv2
    * Demo: http://elclanrs.github.com/jq-idealforms/

--------------------------------------------------------------------------*/(function(a){"use strict";var b={getMaxWidth:function(b){var c=0;return b.each(function(){a(this).outerWidth()>c&&(c=a(this).outerWidth())}),c},getLessVar:function(b,c){var d=a('<p class="'+b+'"></p>').hide().appendTo("body").css(c);return a("."+b).remove(),/^\d+/.test(d)?parseInt(d,10):d}},c={inputWidth:b.getLessVar("ideal-field-width","width")};a.fn.toCustomSelect=function(){return this.each(function(){var b=a(this),c=function(){var c=b.find("option"),d=a('<ul class="ideal-select"/>'),e=a('<li><span class="title">'+c.filter(":selected").text()+"</span></li>"),f=function(){var b=[];return c.each(function(){var c=a(this);b.push('<li><span ideal-value="'+c.val()+'">'+c.text()+"</span></li>")}),b}();return e.append('<ul class="sub">'+f.join("")+"</ul>"),d.append(e),{options:c,select:d,title:e.find(".title"),sub:e.find(".sub"),items:e.find(".sub li")}}(),d={init:function(){b.css({position:"absolute",left:"-9999px"}),c.select.insertAfter(b),c.sub.hide(),c.items.eq(c.options.filter(":selected").index()).find("span").addClass("selected")}(),noWindowScroll:function(a){(a.which===40||a.which===38||a.which===13)&&a.preventDefault()},focusHack:function(){setTimeout(function(){b.trigger("focus")},1)},focus:function(){c.select.addClass("focus"),a(document).on("keydown.noscroll",d.noWindowScroll)},blur:function(){c.select.removeClass("open focus"),a(document).off(".noscroll")},scrollIntoView:function(a){var b=c.items.find(".selected").parent(),d=b.outerHeight(),e=c.sub.outerHeight(),f=function(){var c=b.position().top+d;return a==="down"?c<=e:c>0}();f||(d=a==="down"?d:-d,c.sub.scrollTop(c.sub.scrollTop()+d))},scrollToItem:function(){var a=c.items.find(".selected").parent().index(),b=c.items.outerHeight(),d=c.items.length,e=b*d,f=b*(d-a);c.sub.scrollTop(e-f)},showMenu:function(){c.sub.show(),c.select.addClass("open"),d.scrollToItem()},hideMenu:function(){c.sub.hide(),c.select.removeClass("open")},change:function(a){var d=c.items.eq(a).text();c.title.text(d),c.options.eq(a).prop("selected",!0),c.items.find("span").removeClass("selected"),c.items.eq(a).find("span").addClass("selected"),b.trigger("change")},keydown:function(e){var f=b.find("option:selected").index(),g={9:function(){if(!c.select.is(".menu"))return!1;d.blur(),d.hideMenu()},13:function(){c.sub.is(":visible")?actions.hideMenu():actions.showMenu()},40:function(){f<c.options.length-1&&actions.change(f+1),actions.scrollIntoView("down")},38:function(){f>0&&actions.change(f-1),actions.scrollIntoView("up")},"default":function(){var f=String.fromCharCode(e),g=c.items.find(".selected").parent().index(),h=c.items.filter(function(){var b=new RegExp("^"+f,"i");return b.test(a(this).text())}).first().index();d.change(~h?h:g),d.scrollToItem(),b.trigger("blur"),d.showMenu(),d.focusHack()}};g[e]?g[e]():g["default"]()}},e={focus:d.focus,"blur.menu":function(){d.blur(),d.hideMenu()},"blur.list":function(){d.blur()},keydown:function(a){d.keydown(a.which)},"clickItem.menu":function(){d.change(a(this).index()),d.hideMenu()},"clickItem.list":function(){d.change(a(this).index())},"clickTitle.menu":function(){d.focus(),d.showMenu(),b.trigger("focus")},"hideOutside.menu":function(){b.off("blur.menu"),a(document).on("mousedown.ideal",function(f){a(f.target).closest(c.select).length?d.focusHack():(a(document).off("mousedown.ideal"),b.on("blur.menu",e["blur.menu"]))})},"mousedown.list":function(){d.focusHack()}},f=function(){c.select.removeClass("menu list"),b.off(".menu .list"),c.items.off(".menu .list"),c.select.off(".menu .list"),c.title.off(".menu .list")};c.select.on("menu",function(){f(),c.select.addClass("menu"),d.hideMenu(),b.on({"blur.menu":e["blur.menu"],"focus.menu":e.focus,"keydown.menu":e.keydown}),c.select.on("mousedown.menu",e["hideOutside.menu"]),c.items.on("click.menu",e["clickItem.menu"]),c.title.on("click.menu",e["clickTitle.menu"])}),c.select.on("list",function(){f(),c.select.addClass("list"),d.showMenu(),b.on({"blur.list":e["blur.list"],"focus.list":e.focus,"keydown.list":e.keydown}),c.select.on("mousedown.list",e["mousedown.list"]),c.items.on("mousedown.list",e["clickItem.list"])}),c.select.on("menu")})},a.fn.toCustomRadioCheck=function(){return this.each(function(){var b=a(this),c=a("<span/>");b.is(":checkbox")?c.addClass("ideal-check"):c.addClass("ideal-radio"),b.is(":checked")&&c.addClass("checked"),c.insertAfter(b),b.css({position:"absolute",left:"-9999px"}).on({change:function(){var b=a(this);b.trigger("focus"),b.is(":radio")?(b.parent().siblings("label").children(".ideal-radio").removeClass("checked"),b.next(".ideal-radio").addClass("checked")):b.is(":checked")?c.addClass("checked"):c.removeClass("checked")},focus:function(){c.parent().addClass("focus")},blur:function(){c.parent().removeClass("focus")},click:function(){a(this).trigger("focus")}})})};var d={number:{regex:/\d+/,error:"Must be a number."},digits:{regex:/^\d+$/,error:"Must be only digits."},name:{regex:/^[A-Za-z]{3,}$/,error:"Must be at least 3 characters long, and must only contain letters."},username:{regex:/^[a-z](?=[\w.]{3,31}$)\w*\.?\w*$/i,error:"Must be at between 4 and 32 characters long and start with a letter. You may use letters, numbers, underscores, and one dot (.)"},pass:{regex:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,error:"Must be at least 6 characters long, and contain at least one number, one uppercase and one lowercase letter."},strongpass:{regex:/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,error:"Must be at least 8 characters long and contain at least one uppercase and one lowercase letter and one number or special character."},email:{regex:/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,error:"Must be a valid e-mail address. <em>(e.g. user@gmail.com)</em>"},phone:{regex:/^[2-9]\d{2}-\d{3}-\d{4}$/,error:"Must be a valid US phone number. <em>(e.g. 555-123-4567)</em>"},zip:{regex:/^\d{5}$|^\d{5}-\d{4}$/,error:"Must be a valid US zip code. <em>(e.g. 33245 or 33245-0003)</em>"},url:{regex:/^(?:(ftp|http|https):\/\/)?(?:[\w\-]+\.)+[a-z]{3,6}$/i,error:"Must be a valid URL. <em>(e.g. www.google.com)</em>"},min:{regex:function(a,b){var c=a.userOptions.data.min;return a.input.is(":checkbox, :radio")?(this.error="Check at least <strong>"+c+"</strong>",a.input.filter(":checked").length>=c):(this.error="Must be at least <strong>"+c+"</strong> characters long.",b.length>c-1)}},max:{regex:function(a,b){var c=a.userOptions.data.max;return this.error="<strong>"+c+"</strong> characters max.",b.length<=c}},date:{regex:function(a,b){var c=/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(b),d=function(a,b,c){return a>0&&a<13&&c>0&&c<32768&&b>0&&b<=(new Date(c,a,0)).getDate()};return c&&d(c[1],c[2],c[3])},error:"Must be a valid date. <em>(e.g. mm/dd/yyyy)</em>"},exclude:{regex:function(b,c){return this.error='"'+c+'" is not available.',!~a.inArray(c,b.userOptions.data.exclude)}}};a.fn.idealforms=function(e){var f=a.extend({inputs:{},onSuccess:function(a){alert("Thank you...")},onFail:function(){alert("The form does not validate! Check again...")},filters:{},responsive:!0},e);a.extend(!0,d,f.filters);var g=this,h=function(){var a=g.find("input, select, textarea"),b=g.find("label:first-child"),c=a.filter(":text, :password, textarea"),d=a.filter("select"),e=a.filter(":checkbox, :radio");return{inputs:a,labels:b,text:c,select:d,radiocheck:e}}(),i={init:function(){var c=function(b){var c='<span class="error" />',d='<i class="valid-icon" />',e=a("<i/>",{"class":"invalid-icon",click:function(){var b=a(this);b.siblings("label").length?b.siblings("label:first").find("input").focus():b.siblings("input, select, textarea").focus()}});a(c).hide().insertAfter(b),a(d).add(e).hide().appendTo(b)};g.css("visibility","visible").addClass("ideal-form"),h.inputs.attr("autocomplete","off"),h.labels.addClass("ideal-label").width(b.getMaxWidth(h.labels)),h.text.add(h.select).each(function(){var b=a(this);b.wrapAll('<span class="field"/>'),c(b.parent())}),function(){h.radiocheck.parent().filter(":last-child").children().each(function(){a(this).parent().siblings("label:not(.ideal-label)").andSelf().wrapAll('<span class="field ideal-radiocheck"/>')}),c(h.radiocheck.parents(".field"))}(),h.select.addClass("custom").toCustomSelect(),h.radiocheck.addClass("custom").toCustomRadioCheck(),"placeholder"in a("<input/>")[0]||h.text.each(function(){a(this).val(a(this).attr("placeholder"))}).on({focus:function(){this.value===a(this).attr("placeholder")&&a(this).val("")},blur:function(){a(this).val()||a(this).val(a(this).attr("placeholder"))}})}(),validate:function(b,c){var e=!0,f="",g=b.userOptions,h;return g.filters?(h=g.filters,!c&&/required/.test(h)&&(g.errors&&g.errors.required?f=g.errors.required:f="This field is required.",e=!1),c&&(h=h.split(/\s/),a.each(h,function(a,h){var i=d[h];if(i)if(typeof i.regex=="function"&&!i.regex(b,c)||i.regex instanceof RegExp&&!i.regex.test(c))return e=!1,f=g.errors&&g.errors[h]||i.error,!1}))):e=!0,{isValid:e,error:f}},analyze:function(a,b){b=b||"";var c=h.inputs.filter('[name="'+a.input.attr("name")+'"]'),d=f.inputs[a.input.attr("name")]||"",e=function(){if(a.input.val()===a.input.attr("placeholder"))return;return a.input.is(":checkbox, :radio")?d&&" ":a.input.val()}(),g=i.validate({userOptions:d,input:c},e),j=a.input.parents(".field"),k=j.next(".error"),l=function(){return c.is(":checkbox, :radio")?a.input.parent().siblings(".invalid-icon"):a.input.siblings(".invalid-icon")}(),m=function(){return c.is(":checkbox, :radio")?a.input.parent().siblings(".valid-icon"):a.input.siblings(".valid-icon")}();j.removeClass("valid invalid"),k.add(l).add(m).hide(),e&&g.isValid&&(k.add(l).hide(),j.addClass("valid"),m.show()),g.isValid||(l.show(),j.addClass("invalid"),b!=="blur"&&k.html(g.error).show())},responsive:function(){var b=c.inputWidth+h.labels.outerWidth();g.width()<b?g.addClass("stack"):g.removeClass("stack"),function(){var b=h.labels.filter(function(){return a(this).html()==="&nbsp;"});g.is(".stack")?b.hide():b.show()}(),function(){var a=h.select.next(".ideal-select");g.is(".stack")?a.trigger("list"):a.trigger("menu")}()}};return h.inputs.on("keyup change focus blur",function(b){var c=a(this);c.is(".custom")?i.analyze({input:c,custom:c.next()},b.type):i.analyze({input:c},b.type)}).blur(),g.submit(function(a){g.find(".field.invalid").length?(a.preventDefault(),f.onFail()):f.onSuccess()}),f.responsive&&(a(window).resize(i.responsive),i.responsive()),this}})(jQuery);