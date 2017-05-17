/**
 * 触摸或鼠标事件
 * */

inteui.touchEvents = {
    start: inteui.support.touch ? 'touchstart' : 'mousedown',
    move: inteui.support.touch ? 'touchmove' : 'mousemove',
    end: inteui.support.touch ? 'touchend' : 'mouseup',
};

/**
 * 判断窗口大小
 * */
inteui.screen = {
    xs: function () {
        return window.innerWidth < 600;
    },

    sm: function () {
        return window.innerWidth >= 600 && window.innerWidth < 1024;
    },

    md: function () {
        return window.innerWidth >= 1024 && window.innerWidth < 1440;
    },

    lg: function () {
        return window.innerWidth >= 1440 && window.innerWidth < 1920;
    },

    xl: function () {
        return window.innerWidth <= 1920;
    },

    xsDown: function () {
        return window.innerWidth < 600;
    },

    smDown: function () {
        return window.innerWidth < 1024;
    },

    mdDown: function () {
        return window.innerWidth < 1440;
    },

    lgDown: function () {
        return window.innerWidth < 1920;
    },

    xlDown: function () {
        return true;
    },

    xsUp: function () {
        return true;
    },

    smUp: function () {
        return window.innerWidth >= 600;
    },

    mdUp: function () {
        return window.innerWidth >= 1024;
    },

    lgUp: function () {
        return window.innerWidth >= 1440;
    },

    xlUp: function () {
        return window.innerWidth >= 1920;
    },
};

/**
 * 创建遮罩层并显示
 * @param zIndex 遮罩层的 z_index
 * @returns {Element}
 */

inteui.showOverlay = function (zIndex) {
    var overlay = $.query('.inteui-overlay');
    if(overlay){
        if($.data(overlay, 'isDeleted')){
            $.data(overlay, 'isDeleted', 0);
        }

        if(zIndex !== undefined){
            overlay.style['z-index'] = zIndex;
        }
    }else{
        overlay = $.dom('<div class = "inteui-overlay"></div>')[0];
        document.body.appendChild(overlay);

        $.relayout(overlay);

        if(zIndex === undefined){
            zIndex = 2000;
        }

        overlay.style['z-index'] = zIndex;
    }

    var level = $.data(overlay, 'overlay-level') || 0;

    $.data(overlay, 'overlay-level', ++level);

    overlay.classList.add('inteui-overlay-show');

    return overlay;

};

/**
 * 函数节流
 * @param fn
 * @param delay
 * @returns {Function}
 */
inteui.throttle = function (fn, delay) {
    var timer = null;

    return function () {
        var _this = this;
        var args = arguments;

        if(timer === null){
            timer = setTimeout(function(){
                fn.apply(_this, args);
                timer = null;
            },delay)
        }
    }
};

/**
 * 生成唯一 id
 * @param pluginName 插件名，若传入该参数，guid 将以该参数作为前缀
 * @returns {string}
 */

inteui.guid = function (pluginName) {
    function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

    if(pluginName){
        guid ='inteui-' + pluginName + '-' + guid;
    }

    return guid;
};

$.ready(function () {
    setTimeout(function () {
       document.body.classList.add('inteui-loaded');
    },0)

    if(inteui.support.touch){
        document.body.clientLeft.add('inteui-support-touch');
    }
});