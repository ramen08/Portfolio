/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e,t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):e.jcf=t(jQuery)}(this,function(e){"use strict";var t="1.2.3",n=[],o={optionsKey:"jcf",dataKey:"jcf-instance",rtlClass:"jcf-rtl",focusClass:"jcf-focus",pressedClass:"jcf-pressed",disabledClass:"jcf-disabled",hiddenClass:"jcf-hidden",resetAppearanceClass:"jcf-reset-appearance",unselectableClass:"jcf-unselectable"},a="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,i=/Windows Phone/.test(navigator.userAgent);o.isMobileDevice=!(!a&&!i);var r=function(){var t=e("<style>").appendTo("head"),n=t.prop("sheet")||t.prop("styleSheet"),a=function(e,t,o){o=o||0,n.insertRule?n.insertRule(e+"{"+t+"}",o):n.addRule(e,t,o)};a("."+o.hiddenClass,"position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"),a("."+o.rtlClass+" ."+o.hiddenClass,"right:-9999px !important; left: auto !important"),a("."+o.unselectableClass,"-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"),a("."+o.resetAppearanceClass,"background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");var i=e("html"),r=e("body");"rtl"!==i.css("direction")&&"rtl"!==r.css("direction")||i.addClass(o.rtlClass),i.on("reset",function(){setTimeout(function(){c.refreshAll()},0)}),o.styleSheetCreated=!0};!function(){var t,n=navigator.pointerEnabled||navigator.msPointerEnabled,o="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,a={},i="jcf-";t=n?{pointerover:navigator.pointerEnabled?"pointerover":"MSPointerOver",pointerdown:navigator.pointerEnabled?"pointerdown":"MSPointerDown",pointermove:navigator.pointerEnabled?"pointermove":"MSPointerMove",pointerup:navigator.pointerEnabled?"pointerup":"MSPointerUp"}:{pointerover:"mouseover",pointerdown:"mousedown"+(o?" touchstart":""),pointermove:"mousemove"+(o?" touchmove":""),pointerup:"mouseup"+(o?" touchend":"")},e.each(t,function(t,n){e.each(n.split(" "),function(e,n){a[n]=t})}),e.each(t,function(t,n){n=n.split(" "),e.event.special[i+t]={setup:function(){var t=this;e.each(n,function(e,n){t.addEventListener?t.addEventListener(n,c,!1):t["on"+n]=c})},teardown:function(){var t=this;e.each(n,function(e,n){t.addEventListener?t.removeEventListener(n,c,!1):t["on"+n]=null})}}});var r=null,s=function(e){var t=Math.abs(e.pageX-r.x),n=Math.abs(e.pageY-r.y),o=25;return o>=t&&o>=n?!0:void 0},c=function(t){var n=t||window.event,o=null,c=a[n.type];if(t=e.event.fix(n),t.type=i+c,n.pointerType)switch(n.pointerType){case 2:t.pointerType="touch";break;case 3:t.pointerType="pen";break;case 4:t.pointerType="mouse";break;default:t.pointerType=n.pointerType}else t.pointerType=n.type.substr(0,5);return t.pageX||t.pageY||(o=n.changedTouches?n.changedTouches[0]:n,t.pageX=o.pageX,t.pageY=o.pageY),"touchend"===n.type&&(r={x:t.pageX,y:t.pageY}),"mouse"===t.pointerType&&r&&s(t)?void 0:(e.event.dispatch||e.event.handle).call(this,t)}}(),function(){var t=("onwheel"in document||document.documentMode>=9?"wheel":"mousewheel DOMMouseScroll").split(" "),n="jcf-mousewheel";e.event.special[n]={setup:function(){var n=this;e.each(t,function(e,t){n.addEventListener?n.addEventListener(t,o,!1):n["on"+t]=o})},teardown:function(){var n=this;e.each(t,function(e,t){n.addEventListener?n.removeEventListener(t,o,!1):n["on"+t]=null})}};var o=function(t){var o=t||window.event;if(t=e.event.fix(o),t.type=n,"detail"in o&&(t.deltaY=-o.detail),"wheelDelta"in o&&(t.deltaY=-o.wheelDelta),"wheelDeltaY"in o&&(t.deltaY=-o.wheelDeltaY),"wheelDeltaX"in o&&(t.deltaX=-o.wheelDeltaX),"deltaY"in o&&(t.deltaY=o.deltaY),"deltaX"in o&&(t.deltaX=o.deltaX),t.delta=t.deltaY||t.deltaX,1===o.deltaMode){var a=16;t.delta*=a,t.deltaY*=a,t.deltaX*=a}return(e.event.dispatch||e.event.handle).call(this,t)}}();var s={fireNativeEvent:function(t,n){e(t).each(function(){var e,t=this;t.dispatchEvent?(e=document.createEvent("HTMLEvents"),e.initEvent(n,!0,!0),t.dispatchEvent(e)):document.createEventObject&&(e=document.createEventObject(),e.target=t,t.fireEvent("on"+n,e))})},bindHandlers:function(){var t=this;e.each(t,function(n,o){0===n.indexOf("on")&&e.isFunction(o)&&(t[n]=function(){return o.apply(t,arguments)})})}},c={version:t,modules:{},getOptions:function(){return e.extend({},o)},setOptions:function(t,n){arguments.length>1?this.modules[t]&&e.extend(this.modules[t].prototype.options,n):e.extend(o,t)},addModule:function(t){e.isFunction(t)&&(t=t(e,window));var a=function(t){t.element.data(o.dataKey)||t.element.data(o.dataKey,this),n.push(this),this.options=e.extend({},o,this.options,i(t.element),t),this.bindHandlers(),this.init.apply(this,arguments)},i=function(t){var n=t.data(o.optionsKey),a=t.attr(o.optionsKey);if(n)return n;if(a)try{return e.parseJSON(a)}catch(i){}};a.prototype=t,e.extend(t,s),t.plugins&&e.each(t.plugins,function(t,n){e.extend(n.prototype,s)});var r=a.prototype.destroy;a.prototype.destroy=function(){this.options.element.removeData(this.options.dataKey);for(var e=n.length-1;e>=0;e--)if(n[e]===this){n.splice(e,1);break}r&&r.apply(this,arguments)},this.modules[t.name]=a},getInstance:function(t){return e(t).data(o.dataKey)},replace:function(t,n,a){var i,s=this;return o.styleSheetCreated||r(),e(t).each(function(){var t,r=e(this);i=r.data(o.dataKey),i?i.refresh():(n||e.each(s.modules,function(e,t){return t.prototype.matchElement.call(t.prototype,r)?(n=e,!1):void 0}),n&&(t=e.extend({element:r},a),i=new s.modules[n](t)))}),i},refresh:function(t){e(t).each(function(){var t=e(this).data(o.dataKey);t&&t.refresh()})},destroy:function(t){e(t).each(function(){var t=e(this).data(o.dataKey);t&&t.destroy()})},replaceAll:function(t){var n=this;e.each(this.modules,function(o,a){e(a.prototype.selector,t).each(function(){this.className.indexOf("jcf-ignore")<0&&n.replace(this,o)})})},refreshAll:function(t){if(t)e.each(this.modules,function(n,a){e(a.prototype.selector,t).each(function(){var t=e(this).data(o.dataKey);t&&t.refresh()})});else for(var a=n.length-1;a>=0;a--)n[a].refresh()},destroyAll:function(t){if(t)e.each(this.modules,function(n,a){e(a.prototype.selector,t).each(function(t,n){var a=e(n).data(o.dataKey);a&&a.destroy()})});else for(;n.length;)n[0].destroy()}};return"function"==typeof define&&define.amd&&(window.jcf=c),c});
//======================================================================
// CUSTOM SMOOTH SCROLL
//======================================================================
(function($){
    var et_pb_smooth_scroll = window.et_pb_smooth_scroll;

    window.et_pb_smooth_scroll = function( $target, $top_section, speed, easing ) {
        var $window_width = $( window ).width(),
            $scroll_position = 0;

        var $menu_offset =  $( '#main-header' ).outerHeight() - 1;


        if ( $ ('#wpadminbar').length && $window_width > 600 ) {
            $menu_offset += $( '#wpadminbar' ).outerHeight();
        }

        if ( $ ('#top-header').length ) {
            $menu_offset += $( '#top-header' ).outerHeight();
        }

        //fix sidenav scroll to top
        if ( $top_section ) {
            $scroll_position = 0;
        } else {
            $scroll_position = $target.offset().top - $menu_offset;
        }

        // set swing (animate's scrollTop default) as default value
        if( typeof easing === 'undefined' ){
            easing = 'swing';
        }

        $( 'html, body' ).animate( { scrollTop :  $scroll_position }, speed, easing );
    }
})(jQuery);

/*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e){e.addModule(function(e){"use strict";return{name:"Checkbox",selector:'input[type="checkbox"]',options:{wrapNative:!0,checkedClass:"jcf-checked",uncheckedClass:"jcf-unchecked",labelActiveClass:"jcf-label-active",fakeStructure:'<span class="jcf-checkbox"><span></span></span>'},matchElement:function(e){return e.is(":checkbox")},init:function(){this.initStructure(),this.attachEvents(),this.refresh()},initStructure:function(){this.doc=e(document),this.realElement=e(this.options.element),this.fakeElement=e(this.options.fakeStructure).insertAfter(this.realElement),this.labelElement=this.getLabelFor(),this.options.wrapNative?this.realElement.appendTo(this.fakeElement).css({position:"absolute",height:"100%",width:"100%",opacity:0,margin:0}):this.realElement.addClass(this.options.hiddenClass)},attachEvents:function(){this.realElement.on({focus:this.onFocus,click:this.onRealClick}),this.fakeElement.on("click",this.onFakeClick),this.fakeElement.on("jcf-pointerdown",this.onPress)},onRealClick:function(e){var t=this;this.savedEventObject=e,setTimeout(function(){t.refresh()},0)},onFakeClick:function(e){this.options.wrapNative&&this.realElement.is(e.target)||this.realElement.is(":disabled")||(delete this.savedEventObject,this.stateChecked=this.realElement.prop("checked"),this.realElement.prop("checked",!this.stateChecked),this.fireNativeEvent(this.realElement,"click"),this.savedEventObject&&this.savedEventObject.isDefaultPrevented()?this.realElement.prop("checked",this.stateChecked):this.fireNativeEvent(this.realElement,"change"),delete this.savedEventObject)},onFocus:function(){this.pressedFlag&&this.focusedFlag||(this.focusedFlag=!0,this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur))},onBlur:function(){this.pressedFlag||(this.focusedFlag=!1,this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur))},onPress:function(e){this.focusedFlag||"mouse"!==e.pointerType||this.realElement.focus(),this.pressedFlag=!0,this.fakeElement.addClass(this.options.pressedClass),this.doc.on("jcf-pointerup",this.onRelease)},onRelease:function(e){this.focusedFlag&&"mouse"===e.pointerType&&this.realElement.focus(),this.pressedFlag=!1,this.fakeElement.removeClass(this.options.pressedClass),this.doc.off("jcf-pointerup",this.onRelease)},getLabelFor:function(){var t=this.realElement.closest("label"),s=this.realElement.prop("id");return!t.length&&s&&(t=e('label[for="'+s+'"]')),t.length?t:null},refresh:function(){var e=this.realElement.is(":checked"),t=this.realElement.is(":disabled");this.fakeElement.toggleClass(this.options.checkedClass,e).toggleClass(this.options.uncheckedClass,!e).toggleClass(this.options.disabledClass,t),this.labelElement&&this.labelElement.toggleClass(this.options.labelActiveClass,e)},destroy:function(){this.options.wrapNative?this.realElement.insertBefore(this.fakeElement).css({position:"",width:"",height:"",opacity:"",margin:""}):this.realElement.removeClass(this.options.hiddenClass),this.fakeElement.off("jcf-pointerdown",this.onPress),this.fakeElement.remove(),this.doc.off("jcf-pointerup",this.onRelease),this.realElement.off({focus:this.onFocus,click:this.onRealClick})}}})}(jcf);
/*!
 * JavaScript Custom Forms : File Module
 *
 * Copyright 2014-2016 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */

(function(jcf) {

    jcf.addModule(function($) {
        'use strict';

        return {
            name: 'File',
            selector: 'input[type="file"]',
            options: {
                fakeStructure: '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
                buttonText: 'Choose file',
                placeholderText: 'No file chosen',
                realElementClass: 'jcf-real-element',
                extensionPrefixClass: 'jcf-extension-',
                selectedFileBlock: '.jcf-fake-input',
                buttonTextBlock: '.jcf-button-content'
            },
            matchElement: function(element) {
                return element.is('input[type="file"]');
            },
            init: function() {
                this.initStructure();
                this.attachEvents();
                this.refresh();
            },
            initStructure: function() {
                this.doc = $(document);
                this.realElement = $(this.options.element).addClass(this.options.realElementClass);
                this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement);
                this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock);
                this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText);

                this.realElement.appendTo(this.fakeElement).css({
                    position: 'absolute',
                    opacity: 0
                });
            },
            attachEvents: function() {
                this.realElement.on({
                    'jcf-pointerdown': this.onPress,
                    change: this.onChange,
                    focus: this.onFocus
                });
            },
            onChange: function() {
                this.refresh();
            },
            onFocus: function() {
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
            },
            onBlur: function() {
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
            },
            onPress: function() {
                this.fakeElement.addClass(this.options.pressedClass);
                this.doc.on('jcf-pointerup', this.onRelease);
            },
            onRelease: function() {
                this.fakeElement.removeClass(this.options.pressedClass);
                this.doc.off('jcf-pointerup', this.onRelease);
            },
            getFileName: function() {
                var resultFileName = '',
                    files = this.realElement.prop('files');

                if (files && files.length) {
                    $.each(files, function(index, file) {
                        resultFileName += (index > 0 ? ', ' : '') + file.name;
                    });
                } else {
                    resultFileName = this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, '$1');
                }

                return resultFileName;
            },
            getFileExtension: function() {
                var fileName = this.realElement.val();
                return fileName.lastIndexOf('.') < 0 ? '' : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
            },
            updateExtensionClass: function() {
                var currentExtension = this.getFileExtension(),
                    currentClassList = this.fakeElement.prop('className'),
                    cleanedClassList = currentClassList.replace(new RegExp('(\\s|^)' + this.options.extensionPrefixClass + '[^ ]+','gi'), '');

                this.fakeElement.prop('className', cleanedClassList);
                if (currentExtension) {
                    this.fakeElement.addClass(this.options.extensionPrefixClass + currentExtension);
                }
            },
            refresh: function() {
                var selectedFileName = this.getFileName() || this.options.placeholderText;
                this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
                this.fileNameBlock.text(selectedFileName);
                this.updateExtensionClass();
            },
            destroy: function() {
                // reset styles and restore element position
                this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
                    position: '',
                    opacity: ''
                });
                this.fakeElement.remove();

                // remove event handlers
                this.realElement.off({
                    'jcf-pointerdown': this.onPress,
                    change: this.onChange,
                    focus: this.onFocus,
                    blur: this.onBlur
                });
                this.doc.off('jcf-pointerup', this.onRelease);
            }
        };
    });

}(jcf));
/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2016 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */

(function(jcf) {

    jcf.addModule(function($) {
        'use strict';

        return {
            name: 'Radio',
            selector: 'input[type="radio"]',
            options: {
                wrapNative: true,
                checkedClass: 'jcf-checked',
                uncheckedClass: 'jcf-unchecked',
                labelActiveClass: 'jcf-label-active',
                fakeStructure: '<span class="jcf-radio"><span></span></span>'
            },
            matchElement: function(element) {
                return element.is(':radio');
            },
            init: function() {
                this.initStructure();
                this.attachEvents();
                this.refresh();
            },
            initStructure: function() {
                // prepare structure
                this.doc = $(document);
                this.realElement = $(this.options.element);
                this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
                this.labelElement = this.getLabelFor();

                if (this.options.wrapNative) {
                    // wrap native radio inside fake block
                    this.realElement.prependTo(this.fakeElement).css({
                        position: 'absolute',
                        opacity: 0
                    });
                } else {
                    // just hide native radio
                    this.realElement.addClass(this.options.hiddenClass);
                }
            },
            attachEvents: function() {
                // add event handlers
                this.realElement.on({
                    focus: this.onFocus,
                    click: this.onRealClick
                });
                this.fakeElement.on('click', this.onFakeClick);
                this.fakeElement.on('jcf-pointerdown', this.onPress);
            },
            onRealClick: function(e) {
                // redraw current radio and its group (setTimeout handles click that might be prevented)
                var self = this;
                this.savedEventObject = e;
                setTimeout(function() {
                    self.refreshRadioGroup();
                }, 0);
            },
            onFakeClick: function(e) {
                // skip event if clicked on real element inside wrapper
                if (this.options.wrapNative && this.realElement.is(e.target)) {
                    return;
                }

                // toggle checked class
                if (!this.realElement.is(':disabled')) {
                    delete this.savedEventObject;
                    this.currentActiveRadio = this.getCurrentActiveRadio();
                    this.stateChecked = this.realElement.prop('checked');
                    this.realElement.prop('checked', true);
                    this.fireNativeEvent(this.realElement, 'click');
                    if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
                        this.realElement.prop('checked', this.stateChecked);
                        this.currentActiveRadio.prop('checked', true);
                    } else {
                        this.fireNativeEvent(this.realElement, 'change');
                    }
                    delete this.savedEventObject;
                }
            },
            onFocus: function() {
                if (!this.pressedFlag || !this.focusedFlag) {
                    this.focusedFlag = true;
                    this.fakeElement.addClass(this.options.focusClass);
                    this.realElement.on('blur', this.onBlur);
                }
            },
            onBlur: function() {
                if (!this.pressedFlag) {
                    this.focusedFlag = false;
                    this.fakeElement.removeClass(this.options.focusClass);
                    this.realElement.off('blur', this.onBlur);
                }
            },
            onPress: function(e) {
                if (!this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = true;
                this.fakeElement.addClass(this.options.pressedClass);
                this.doc.on('jcf-pointerup', this.onRelease);
            },
            onRelease: function(e) {
                if (this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = false;
                this.fakeElement.removeClass(this.options.pressedClass);
                this.doc.off('jcf-pointerup', this.onRelease);
            },
            getCurrentActiveRadio: function() {
                return this.getRadioGroup(this.realElement).filter(':checked');
            },
            getRadioGroup: function(radio) {
                // find radio group for specified radio button
                var name = radio.attr('name'),
                    parentForm = radio.parents('form');

                if (name) {
                    if (parentForm.length) {
                        return parentForm.find('input[name="' + name + '"]');
                    } else {
                        return $('input[name="' + name + '"]:not(form input)');
                    }
                } else {
                    return radio;
                }
            },
            getLabelFor: function() {
                var parentLabel = this.realElement.closest('label'),
                    elementId = this.realElement.prop('id');

                if (!parentLabel.length && elementId) {
                    parentLabel = $('label[for="' + elementId + '"]');
                }
                return parentLabel.length ? parentLabel : null;
            },
            refreshRadioGroup: function() {
                // redraw current radio and its group
                this.getRadioGroup(this.realElement).each(function() {
                    jcf.refresh(this);
                });
            },
            refresh: function() {
                // redraw current radio button
                var isChecked = this.realElement.is(':checked'),
                    isDisabled = this.realElement.is(':disabled');

                this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
                    .toggleClass(this.options.uncheckedClass, !isChecked)
                    .toggleClass(this.options.disabledClass, isDisabled);

                if (this.labelElement) {
                    this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
                }
            },
            destroy: function() {
                // restore structure
                if (this.options.wrapNative) {
                    this.realElement.insertBefore(this.fakeElement).css({
                        position: '',
                        width: '',
                        height: '',
                        opacity: '',
                        margin: ''
                    });
                } else {
                    this.realElement.removeClass(this.options.hiddenClass);
                }

                // removing element will also remove its event handlers
                this.fakeElement.off('jcf-pointerdown', this.onPress);
                this.fakeElement.remove();

                // remove other event handlers
                this.doc.off('jcf-pointerup', this.onRelease);
                this.realElement.off({
                    blur: this.onBlur,
                    focus: this.onFocus,
                    click: this.onRealClick
                });
            }
        };
    });

}(jcf));
/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e){e.addModule(function(t,s){"use strict";function i(e){this.options=t.extend({wrapNative:!0,wrapNativeOnMobile:!0,fakeDropInBody:!0,useCustomScroll:!0,flipDropToFit:!0,maxVisibleItems:10,fakeAreaStructure:'<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',fakeDropStructure:'<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',optionClassPrefix:"jcf-option-",selectClassPrefix:"jcf-select-",dropContentSelector:".jcf-select-drop-content",selectTextSelector:".jcf-select-text",dropActiveClass:"jcf-drop-active",flipDropClass:"jcf-drop-flipped"},e),this.init()}function o(e){this.options=t.extend({wrapNative:!0,useCustomScroll:!0,fakeStructure:'<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',selectClassPrefix:"jcf-select-",listHolder:".jcf-list-wrapper"},e),this.init()}function n(e){this.options=t.extend({holder:null,maxVisibleItems:10,selectOnClick:!0,useHoverClass:!1,useCustomScroll:!1,handleResize:!0,multipleSelectWithoutKey:!1,alwaysPreventMouseWheel:!1,indexAttribute:"data-index",cloneClassPrefix:"jcf-option-",containerStructure:'<span class="jcf-list"><span class="jcf-list-content"></span></span>',containerSelector:".jcf-list-content",captionClass:"jcf-optgroup-caption",disabledClass:"jcf-disabled",optionClass:"jcf-option",groupClass:"jcf-optgroup",hoverClass:"jcf-hover",selectedClass:"jcf-selected",scrollClass:"jcf-scroll-active"},e),this.init()}var l={name:"Select",selector:"select",options:{element:null,multipleCompactStyle:!1},plugins:{ListBox:o,ComboBox:i,SelectList:n},matchElement:function(e){return e.is("select")},init:function(){this.element=t(this.options.element),this.createInstance()},isListBox:function(){return this.element.is("[size]:not([jcf-size]), [multiple]")},createInstance:function(){this.instance&&this.instance.destroy(),this.isListBox()&&!this.options.multipleCompactStyle?this.instance=new o(this.options):this.instance=new i(this.options)},refresh:function(){var e=this.isListBox()&&this.instance instanceof i||!this.isListBox()&&this.instance instanceof o;e?this.createInstance():this.instance.refresh()},destroy:function(){this.instance.destroy()}};t.extend(i.prototype,{init:function(){this.initStructure(),this.bindHandlers(),this.attachEvents(),this.refresh()},initStructure:function(){this.win=t(s),this.doc=t(document),this.realElement=t(this.options.element),this.fakeElement=t(this.options.fakeAreaStructure).insertAfter(this.realElement),this.selectTextContainer=this.fakeElement.find(this.options.selectTextSelector),this.selectText=t("<span></span>").appendTo(this.selectTextContainer),h(this.fakeElement),this.fakeElement.addClass(r(this.realElement.prop("className"),this.options.selectClassPrefix)),this.realElement.prop("multiple")&&this.fakeElement.addClass("jcf-compact-multiple"),this.options.isMobileDevice&&this.options.wrapNativeOnMobile&&!this.options.wrapNative&&(this.options.wrapNative=!0),this.options.wrapNative?this.realElement.prependTo(this.fakeElement).css({position:"absolute",height:"100%",width:"100%"}).addClass(this.options.resetAppearanceClass):(this.realElement.addClass(this.options.hiddenClass),this.fakeElement.attr("title",this.realElement.attr("title")),this.fakeDropTarget=this.options.fakeDropInBody?t("body"):this.fakeElement)},attachEvents:function(){var e=this;this.delayedRefresh=function(){setTimeout(function(){e.refresh(),e.list&&(e.list.refresh(),e.list.scrollToActiveOption())},1)},this.options.wrapNative?this.realElement.on({focus:this.onFocus,change:this.onChange,click:this.onChange,keydown:this.delayedRefresh}):(this.realElement.on({focus:this.onFocus,change:this.onChange,keydown:this.onKeyDown}),this.fakeElement.on({"jcf-pointerdown":this.onSelectAreaPress}))},onKeyDown:function(e){13===e.which?this.toggleDropdown():this.dropActive&&this.delayedRefresh()},onChange:function(){this.refresh()},onFocus:function(){this.pressedFlag&&this.focusedFlag||(this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur),this.toggleListMode(!0),this.focusedFlag=!0)},onBlur:function(){this.pressedFlag||(this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur),this.toggleListMode(!1),this.focusedFlag=!1)},onResize:function(){this.dropActive&&this.hideDropdown()},onSelectDropPress:function(){this.pressedFlag=!0},onSelectDropRelease:function(e,t){this.pressedFlag=!1,"mouse"===t.pointerType&&this.realElement.focus()},onSelectAreaPress:function(e){var s=!this.options.fakeDropInBody&&t(e.target).closest(this.dropdown).length;s||e.button>1||this.realElement.is(":disabled")||(this.selectOpenedByEvent=e.pointerType,this.toggleDropdown(),this.focusedFlag||("mouse"===e.pointerType?this.realElement.focus():this.onFocus(e)),this.pressedFlag=!0,this.fakeElement.addClass(this.options.pressedClass),this.doc.on("jcf-pointerup",this.onSelectAreaRelease))},onSelectAreaRelease:function(e){this.focusedFlag&&"mouse"===e.pointerType&&this.realElement.focus(),this.pressedFlag=!1,this.fakeElement.removeClass(this.options.pressedClass),this.doc.off("jcf-pointerup",this.onSelectAreaRelease)},onOutsideClick:function(e){var s=t(e.target),i=s.closest(this.fakeElement).length||s.closest(this.dropdown).length;i||this.hideDropdown()},onSelect:function(){this.refresh(),this.realElement.prop("multiple")?this.repositionDropdown():this.hideDropdown(),this.fireNativeEvent(this.realElement,"change")},toggleListMode:function(e){this.options.wrapNative||(e?this.realElement.attr({size:4,"jcf-size":""}):this.options.wrapNative||this.realElement.removeAttr("size jcf-size"))},createDropdown:function(){this.dropdown&&(this.list.destroy(),this.dropdown.remove()),this.dropdown=t(this.options.fakeDropStructure).appendTo(this.fakeDropTarget),this.dropdown.addClass(r(this.realElement.prop("className"),this.options.selectClassPrefix)),h(this.dropdown),this.realElement.prop("multiple")&&this.dropdown.addClass("jcf-compact-multiple"),this.options.fakeDropInBody&&this.dropdown.css({position:"absolute",top:-9999}),this.list=new n({useHoverClass:!0,handleResize:!1,alwaysPreventMouseWheel:!0,maxVisibleItems:this.options.maxVisibleItems,useCustomScroll:this.options.useCustomScroll,holder:this.dropdown.find(this.options.dropContentSelector),multipleSelectWithoutKey:this.realElement.prop("multiple"),element:this.realElement}),t(this.list).on({select:this.onSelect,press:this.onSelectDropPress,release:this.onSelectDropRelease})},repositionDropdown:function(){var e,t,s,i=this.fakeElement.offset(),o=this.fakeElement[0].getBoundingClientRect(),n=o.width||o.right-o.left,l=this.fakeElement.outerHeight(),r=this.dropdown.css("width",n).outerHeight(),h=this.win.scrollTop(),a=this.win.height(),c=!1;i.top+l+r>h+a&&i.top-r>h&&(c=!0),this.options.fakeDropInBody&&(s="static"!==this.fakeDropTarget.css("position")?this.fakeDropTarget.offset().top:0,this.options.flipDropToFit&&c?(t=i.left,e=i.top-r-s):(t=i.left,e=i.top+l-s),this.dropdown.css({width:n,left:t,top:e})),this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass,this.options.flipDropToFit&&c)},showDropdown:function(){this.realElement.prop("options").length&&(this.dropdown||this.createDropdown(),this.dropActive=!0,this.dropdown.appendTo(this.fakeDropTarget),this.fakeElement.addClass(this.options.dropActiveClass),this.refreshSelectedText(),this.repositionDropdown(),this.list.setScrollTop(this.savedScrollTop),this.list.refresh(),this.win.on("resize",this.onResize),this.doc.on("jcf-pointerdown",this.onOutsideClick))},hideDropdown:function(){this.dropdown&&(this.savedScrollTop=this.list.getScrollTop(),this.fakeElement.removeClass(this.options.dropActiveClass+" "+this.options.flipDropClass),this.dropdown.removeClass(this.options.flipDropClass).detach(),this.doc.off("jcf-pointerdown",this.onOutsideClick),this.win.off("resize",this.onResize),this.dropActive=!1,"touch"===this.selectOpenedByEvent&&this.onBlur())},toggleDropdown:function(){this.dropActive?this.hideDropdown():this.showDropdown()},refreshSelectedText:function(){var e,s=this.realElement.prop("selectedIndex"),i=this.realElement.prop("options")[s],o=i?i.getAttribute("data-image"):null,n="",l=this;this.realElement.prop("multiple")?(t.each(this.realElement.prop("options"),function(e,t){t.selected&&(n+=(n?", ":"")+t.innerHTML)}),n||(n=l.realElement.attr("placeholder")||""),this.selectText.removeAttr("class").html(n)):i?this.currentSelectedText===i.innerHTML&&this.currentSelectedImage===o||(e=r(i.className,this.options.optionClassPrefix),this.selectText.attr("class",e).html(i.innerHTML),o?(this.selectImage||(this.selectImage=t("<img>").prependTo(this.selectTextContainer).hide()),this.selectImage.attr("src",o).show()):this.selectImage&&this.selectImage.hide(),this.currentSelectedText=i.innerHTML,this.currentSelectedImage=o):(this.selectImage&&this.selectImage.hide(),this.selectText.removeAttr("class").empty())},refresh:function(){"none"===this.realElement.prop("style").display?this.fakeElement.hide():this.fakeElement.show(),this.refreshSelectedText(),this.fakeElement.toggleClass(this.options.disabledClass,this.realElement.is(":disabled"))},destroy:function(){this.options.wrapNative?this.realElement.insertBefore(this.fakeElement).css({position:"",height:"",width:""}).removeClass(this.options.resetAppearanceClass):(this.realElement.removeClass(this.options.hiddenClass),this.realElement.is("[jcf-size]")&&this.realElement.removeAttr("size jcf-size")),this.fakeElement.remove(),this.doc.off("jcf-pointerup",this.onSelectAreaRelease),this.realElement.off({focus:this.onFocus})}}),t.extend(o.prototype,{init:function(){this.bindHandlers(),this.initStructure(),this.attachEvents()},initStructure:function(){this.realElement=t(this.options.element),this.fakeElement=t(this.options.fakeStructure).insertAfter(this.realElement),this.listHolder=this.fakeElement.find(this.options.listHolder),h(this.fakeElement),this.fakeElement.addClass(r(this.realElement.prop("className"),this.options.selectClassPrefix)),this.realElement.addClass(this.options.hiddenClass),this.list=new n({useCustomScroll:this.options.useCustomScroll,holder:this.listHolder,selectOnClick:!1,element:this.realElement})},attachEvents:function(){var e=this;this.delayedRefresh=function(t){t&&(16===t.which||t.ctrlKey||t.metaKey||t.altKey)||(clearTimeout(e.refreshTimer),e.refreshTimer=setTimeout(function(){e.refresh(),e.list.scrollToActiveOption()},1))},this.realElement.on({focus:this.onFocus,click:this.delayedRefresh,keydown:this.delayedRefresh}),t(this.list).on({select:this.onSelect,press:this.onFakeOptionsPress,release:this.onFakeOptionsRelease})},onFakeOptionsPress:function(e,t){this.pressedFlag=!0,"mouse"===t.pointerType&&this.realElement.focus()},onFakeOptionsRelease:function(e,t){this.pressedFlag=!1,"mouse"===t.pointerType&&this.realElement.focus()},onSelect:function(){this.fireNativeEvent(this.realElement,"change"),this.fireNativeEvent(this.realElement,"click")},onFocus:function(){this.pressedFlag&&this.focusedFlag||(this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur),this.focusedFlag=!0)},onBlur:function(){this.pressedFlag||(this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur),this.focusedFlag=!1)},refresh:function(){this.fakeElement.toggleClass(this.options.disabledClass,this.realElement.is(":disabled")),this.list.refresh()},destroy:function(){this.list.destroy(),this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass),this.fakeElement.remove()}}),t.extend(n.prototype,{init:function(){this.initStructure(),this.refreshSelectedClass(),this.attachEvents()},initStructure:function(){this.element=t(this.options.element),this.indexSelector="["+this.options.indexAttribute+"]",this.container=t(this.options.containerStructure).appendTo(this.options.holder),this.listHolder=this.container.find(this.options.containerSelector),this.lastClickedIndex=this.element.prop("selectedIndex"),this.rebuildList(),this.element.prop("multiple")&&(this.previousSelection=this.getSelectedOptionsIndexes())},attachEvents:function(){this.bindHandlers(),this.listHolder.on("jcf-pointerdown",this.indexSelector,this.onItemPress),this.listHolder.on("jcf-pointerdown",this.onPress),this.options.useHoverClass&&this.listHolder.on("jcf-pointerover",this.indexSelector,this.onHoverItem)},onPress:function(e){t(this).trigger("press",e),this.listHolder.on("jcf-pointerup",this.onRelease)},onRelease:function(e){t(this).trigger("release",e),this.listHolder.off("jcf-pointerup",this.onRelease)},onHoverItem:function(e){var t=parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));this.fakeOptions.removeClass(this.options.hoverClass).eq(t).addClass(this.options.hoverClass)},onItemPress:function(e){"touch"===e.pointerType||this.options.selectOnClick?(this.tmpListOffsetTop=this.list.offset().top,this.listHolder.on("jcf-pointerup",this.indexSelector,this.onItemRelease)):this.onSelectItem(e)},onItemRelease:function(e){this.listHolder.off("jcf-pointerup",this.indexSelector,this.onItemRelease),this.tmpListOffsetTop===this.list.offset().top&&this.listHolder.on("click",this.indexSelector,{savedPointerType:e.pointerType},this.onSelectItem),delete this.tmpListOffsetTop},onSelectItem:function(e){var s,i=parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),o=e.data&&e.data.savedPointerType||e.pointerType||"mouse";this.listHolder.off("click",this.indexSelector,this.onSelectItem),e.button>1||this.realOptions[i].disabled||(this.element.prop("multiple")?e.metaKey||e.ctrlKey||"touch"===o||this.options.multipleSelectWithoutKey?this.realOptions[i].selected=!this.realOptions[i].selected:e.shiftKey?(s=[this.lastClickedIndex,i].sort(function(e,t){return e-t}),this.realOptions.each(function(e,t){t.selected=e>=s[0]&&e<=s[1]})):this.element.prop("selectedIndex",i):this.element.prop("selectedIndex",i),e.shiftKey||(this.lastClickedIndex=i),this.refreshSelectedClass(),"mouse"===o&&this.scrollToActiveOption(),t(this).trigger("select"))},rebuildList:function(){var s=this,i=this.element[0];this.storedSelectHTML=i.innerHTML,this.optionIndex=0,this.list=t(this.createOptionsList(i)),this.listHolder.empty().append(this.list),this.realOptions=this.element.find("option"),this.fakeOptions=this.list.find(this.indexSelector),this.fakeListItems=this.list.find("."+this.options.captionClass+","+this.indexSelector),delete this.optionIndex;var o=this.options.maxVisibleItems,n=this.element.prop("size");n>1&&!this.element.is("[jcf-size]")&&(o=n);var l=this.fakeOptions.length>o;return this.container.toggleClass(this.options.scrollClass,l),l&&(this.listHolder.css({maxHeight:this.getOverflowHeight(o),overflow:"auto"}),this.options.useCustomScroll&&e.modules.Scrollable)?void e.replace(this.listHolder,"Scrollable",{handleResize:this.options.handleResize,alwaysPreventMouseWheel:this.options.alwaysPreventMouseWheel}):void(this.options.alwaysPreventMouseWheel&&(this.preventWheelHandler=function(e){var t=s.listHolder.scrollTop(),i=s.listHolder.prop("scrollHeight")-s.listHolder.innerHeight();(0>=t&&e.deltaY<0||t>=i&&e.deltaY>0)&&e.preventDefault()},this.listHolder.on("jcf-mousewheel",this.preventWheelHandler)))},refreshSelectedClass:function(){var e,t=this,s=this.element.prop("multiple"),i=this.element.prop("selectedIndex");s?this.realOptions.each(function(e,s){t.fakeOptions.eq(e).toggleClass(t.options.selectedClass,!!s.selected)}):(this.fakeOptions.removeClass(this.options.selectedClass+" "+this.options.hoverClass),e=this.fakeOptions.eq(i).addClass(this.options.selectedClass),this.options.useHoverClass&&e.addClass(this.options.hoverClass))},scrollToActiveOption:function(){var e=this.getActiveOptionOffset();"number"==typeof e&&this.listHolder.prop("scrollTop",e)},getSelectedOptionsIndexes:function(){var e=[];return this.realOptions.each(function(t,s){s.selected&&e.push(t)}),e},getChangedSelectedIndex:function(){var e=this.element.prop("selectedIndex"),s=this,i=!1,o=null;return this.element.prop("multiple")?(this.currentSelection=this.getSelectedOptionsIndexes(),t.each(this.currentSelection,function(e,t){!i&&s.previousSelection.indexOf(t)<0&&(0===e&&(i=!0),o=t)}),this.previousSelection=this.currentSelection,o):e},getActiveOptionOffset:function(){var e=this.getChangedSelectedIndex();if(null!==e){var t=this.listHolder.height(),s=this.listHolder.prop("scrollTop"),i=this.fakeOptions.eq(e),o=i.offset().top-this.list.offset().top,n=i.innerHeight();return o+n>=s+t?o-t+n:s>o?o:void 0}},getOverflowHeight:function(e){var t=this.fakeListItems.eq(e-1),s=this.list.offset().top,i=t.offset().top,o=t.innerHeight();return i+o-s},getScrollTop:function(){return this.listHolder.scrollTop()},setScrollTop:function(e){this.listHolder.scrollTop(e)},createOption:function(e){var t=document.createElement("span");t.className=this.options.optionClass,t.innerHTML=e.innerHTML,t.setAttribute(this.options.indexAttribute,this.optionIndex++);var s,i=e.getAttribute("data-image");return i&&(s=document.createElement("img"),s.src=i,t.insertBefore(s,t.childNodes[0])),e.disabled&&(t.className+=" "+this.options.disabledClass),e.className&&(t.className+=" "+r(e.className,this.options.cloneClassPrefix)),t},createOptGroup:function(e){var t,s,i=document.createElement("span"),o=e.getAttribute("label");return t=document.createElement("span"),t.className=this.options.captionClass,t.innerHTML=o,i.appendChild(t),e.children.length&&(s=this.createOptionsList(e),i.appendChild(s)),i.className=this.options.groupClass,i},createOptionContainer:function(){var e=document.createElement("li");return e},createOptionsList:function(e){var s=this,i=document.createElement("ul");return t.each(e.children,function(e,t){var o,n=s.createOptionContainer(t);switch(t.tagName.toLowerCase()){case"option":o=s.createOption(t);break;case"optgroup":o=s.createOptGroup(t)}i.appendChild(n).appendChild(o)}),i},refresh:function(){this.storedSelectHTML!==this.element.prop("innerHTML")&&this.rebuildList();var t=e.getInstance(this.listHolder);t&&t.refresh(),this.refreshSelectedClass()},destroy:function(){this.listHolder.off("jcf-mousewheel",this.preventWheelHandler),this.listHolder.off("jcf-pointerdown",this.indexSelector,this.onSelectItem),this.listHolder.off("jcf-pointerover",this.indexSelector,this.onHoverItem),this.listHolder.off("jcf-pointerdown",this.onPress)}});var r=function(e,t){return e?e.replace(/[\s]*([\S]+)+[\s]*/gi,t+"$1 "):""},h=function(){function t(e){e.preventDefault()}var s=e.getOptions().unselectableClass;return function(e){e.addClass(s).on("selectstart",t)}}();return l})}(jcf);
jQuery(function(){
    blog_filters();
});


function blog_filters(){

    //reset filters
    jQuery('.blog-filter-reset').on('click',function(e){
        e.preventDefault();

        blog_reset_fields();
        jQuery('.blog-filter-row select').trigger('change'); //to refresh dropdowns

        setTimeout(function(){
            get_blog_posts( 'blog_filter_ajax', 'reset' );
        }, 500 );
        
    });

    //on filter
    jQuery('.blog-filter-row select').on('change',function(){
        jQuery('input[name="blog-page-number"]').val(1); //should always reset on filter
        setTimeout(function(){
            get_blog_posts( 'blog_filter_ajax', 'filter' );
        },300);
    });

    //on search
    jQuery('#blog-search-form-text').on('input',function(){
        jQuery('input[name="blog-page-number"]').val(1); //should always reset on filter
        
        setTimeout(function(){
            get_blog_posts( 'blog_filter_ajax', 'filter' );
        },300);
    });

    //load more 
    jQuery(document).on('click', '#ajax_more_posts_blog',function(e){
        get_blog_posts( 'blog_filter_ajax', 'load_more' );
    });
}

function blog_reset_fields(){
    //reset fields
    jQuery('.blog-filter-row select').val("");
    jQuery('#blog-search-form-text').val("");
    jQuery('input[name="blog-page-number"]').val(1);
}

//-----------------------------------------------------
// AJAX functions tht pulls all blog posts
//-----------------------------------------------------
function get_blog_posts( $action , $function ){

    /* fields */
    $category       = jQuery('#category').val();
    $topics         = jQuery('#topic').val();
    $products       = jQuery('#product').val();
    $sort_by        = jQuery('#sort').val();
    $search         = jQuery('#blog-search-form-text').val();
    $page_number    = jQuery('input[name="blog-page-number"]').val();

    /* pass fields to data variable */
    var $data = {
        action      : $action,
        page_number : $page_number,
        category    : $category, 
        topics      : $topics,
        products    : $products,
        sort_by     : $sort_by,
        search      : $search,
        function    : $function
    };

    jQuery.ajax({
        type: 'POST',
        url:  custom_localize_script.admin_ajax_url,
        data: $data,
        beforeSend:function() {
            jQuery('body').addClass('blog-loading');
        },
        success:function( code ) {
            var $load_more = jQuery('.show-more-wrapper');

            if( $function == 'load_more' ){
                jQuery('.post-item-section .post-items').append(code.data.result_items); 
                jQuery('input[name="blog-page-number"]').val( parseInt($page_number)+1 );
            }else{
                jQuery('.post-item-section .post-items').html(code.data.result_items);
            }

            setTimeout(function(){
                $load_more.html(code.data.load_more);
                
                setTimeout(function(){
                    jQuery('body').removeClass('blog-loading');
                },300);
            },300);
        }
    });
}
jQuery(function(){
    //scroll to top of the page on load
    window.scrollTo(0, 0);
    
    //functions
    initCustomForms();
    initFormFn();
    initFlexContentColumn();
    initHeaderAccordionMenu();
});

jQuery(window).on("orientationchange resize load", function(){
    setTimeout(function () {
         initFullHeightSection();
    },1000);
});

//======================================================================
// Page Loader
//======================================================================
jQuery(window).load(function() {
    // Animate loader off screen
    setTimeout(function(){
        var $preloader = jQuery(".page-preloader");
        if( $preloader.length ){
            $preloader.fadeOut(300);
        }
    },300);
});

//======================================================================
// FORMS
//======================================================================
//-----------------------------------------------------
// JCF Init
//-----------------------------------------------------

function initCustomForms(){

    jcf.setOptions('Select', {
        wrapNative: false,
        maxVisibleItems: 8
    });

    jcf.destroyAll("select");

    jcf.destroyAll('input[type="checkbox"]');

    jcf.destroyAll('input[type="radio"]');

    jcf.destroyAll('input[type="file"]');

    jcf.replaceAll();
    jcf.destroyAll('.custom-jcf-ignore');

}


//-----------------------------------------------------
// Gravity Form
//-----------------------------------------------------
function initFormFn(){
    jQuery( document ).bind( 'gform_post_render', function( event, formId ){
        initCustomForms();

        /* if needed scroll functionality to form comment out just replace the numbers with the correct form id
         setTimeout(function(){
             var $wrapper = '',
                 $confirmation = '';

             if( formId == 1 ){
                 $wrapper = jQuery('#gform_wrapper_1');
                 $confirmation = jQuery('#gform_confirmation_wrapper_1');
             }

             if( $wrapper.length ){
                 if( $wrapper.hasClass('gform_validation_error') ){
                     et_pb_smooth_scroll( $wrapper, false, 40, 'linear' );
                 }
             }

             if( $confirmation.length ){
                 et_pb_smooth_scroll( $confirmation, false, 40, 'linear' );
             }

         },800);
         */
    });
}

jQuery(window).load(function(){
    setTimeout(initSmoothScrollPage(),3000);
});

function initSmoothScrollPage(){

    var $target_hash = window.location.hash;
    if($target_hash){
        var $this_link = jQuery($target_hash),
            has_closest_smooth_scroll_disabled = $this_link.closest( '.et_smooth_scroll_disabled' ).length,
            has_closest_woocommerce_tabs = ( $this_link.closest( '.woocommerce-tabs' ).length && $this_link.closest( '.tabs' ).length ),
            has_closest_eab_cal_link = $this_link.closest( '.eab-shortcode_calendar-navigation-link' ).length,
            has_acomment_reply = $this_link.hasClass( 'acomment-reply' ),
            disable_scroll = has_closest_smooth_scroll_disabled || has_closest_woocommerce_tabs || has_closest_eab_cal_link || has_acomment_reply;

        if(! disable_scroll){
            if( $this_link.length ){
                et_pb_smooth_scroll( $this_link, false, 800, 'swing');

                if ( ! jQuery( '#main-header' ).hasClass( 'et-fixed-header' ) && jQuery( 'body' ).hasClass( 'et_fixed_nav' ) && jQuery( window ).width() > 980 ) {
                    setTimeout(function(){
                        et_pb_smooth_scroll( $this_link, false, 40, 'linear' );
                    }, 450 );
                }

            }
        }

    }

}

//-----------------------------------------------------
// Flex content column
//-----------------------------------------------------
function initFlexContentColumn(){
    jQuery('.flex-content-column').each(function(){
        var $this = jQuery(this);

        $this.wrapInner('<div class="fcc-wrap"><div class="fcc-content"></div></div>');
    });
}


//-----------------------------------------------------
// Header
//-----------------------------------------------------
function initHeaderAccordionMenu() {
    setTimeout(function () {
        /*jQuery('#mobile_menu').each(function () {
         var $this = jQuery(this);
         $this.addClass('et_mobile_menu_custom');
         $this.removeClass('et_mobile_menu');
         });
         */

        //header
        /* jQuery(document).on('click', '#et_mobile_nav_menu .menu-item-has-children>a', function(e) {
         e.preventDefault();
         var $this = jQuery(this);
         $this.closest('#mobile_menu').stop().slideDown( 500 );

         $this.next('.sub-menu').slideToggle(350);
         $this.toggleClass('show-sub-menu');

         setTimeout(function () {
         $this.closest('.mobile_nav').addClass('opened');
         $this.closest('.mobile_nav').removeClass('closed');
         },550);
         });*/

    },800);


    //add bar icon to mobile menu bar
    jQuery('.mobile_menu_bar').each(function () {
        jQuery(this).append('<span class="bar-icon"></span>');
    });


    //if homepage - remove all home that has current menu item
    var $body = jQuery( 'body' );
    if( $body.hasClass('home') ){
        jQuery('#top-menu li.menu-item-home').removeClass('current_page_item');
        jQuery('#top-menu li.menu-item-home').removeClass('current-menu-item');
    }
}

//-----------------------------------------------------
// Full Height Section
//-----------------------------------------------------
function initFullHeightSection(){


    //for fullscreen
    jQuery('.fullheight-section').each(function () {
        var $this = jQuery(this),
        $window_width = jQuery( window ).innerWidth(),
        $window_innerheight = jQuery(window).innerHeight(),
        $menu_offset = -1;

        if ( $window_width > 980 ) {
            $menu_offset += jQuery('#et-top-navigation').outerHeight();
        }

        if ( jQuery('#wpadminbar').length && $window_width > 600 ) {
            $menu_offset += jQuery( '#wpadminbar' ).outerHeight();
        }

        var $innerheight = $window_innerheight - $menu_offset;

        $this.css( 'min-height', $innerheight + 'px' );

    });

    jQuery('.home-fwh, .fwh-banner').each(function () {
        var $this = jQuery(this),
        $window_width = jQuery( window ).innerWidth(),
        $window_innerheight = jQuery(window).innerHeight(),
        $menu_offset = -1;


        if ( jQuery('#wpadminbar').length && $window_width > 600 ) {
            $menu_offset += jQuery( '#wpadminbar' ).outerHeight();
        }

        var $innerheight = $window_innerheight - $menu_offset;

        $this.css( 'min-height', $innerheight + 'px' );


    });

}
