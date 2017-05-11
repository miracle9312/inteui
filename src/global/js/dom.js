/**
 * Created by miracle on 2017/5/9.
 */
$={};
(function(){
    /**
     * @param arr
     * @returns {boolean}
     * */
    $.isArray=function(arr){
        return Object.prototype.toString.call(arr) === '[Object Array]';
    };

    /**
     * @param obj
     * @returns {boolean}
     * */
    $.isObject = function(obj){
        return Object.prototype.toString.call(obj) === '[Object Object]';
    };

    /**
     * 将nodeList转化为数组
     * @param nodeList
     * @returns {Array}
     * */
    $.toArray = function(nodeList){
        var array = [];
        try{
            Array.prototype.slice(nodeList);
        }catch(e){
            array = new Array();
            for(var i=0;i<nodeList.length;i++){
                array.push(nodeList[i]);
            }
        }
        return array;
    };

    /**
     * 遍历数组或对象元素
     * @param obj
     * @param callback
     * */
    $.each = function(obj,callback){
        if(!obj){
            return;
        }
        if($.isArray(obj)){
            for(var i=0; i<obj.length; i++){
                if(callback(i,obj[i]) === false){
                    break;
                }
            }
        }else{
            for(var prop in obj){
                if(obj.hasOwnProperty(prop)){
                    if(callback(prop,obj[prop]) === false){
                        break;
                    }
                }
            }
        }
    };

    /**
     * 去除数组重复项
     * @param arr
     * */
    $.unique = function(arr){
        var array = [];
        for(var i=0; i<arr.length; i++){
            if(array.indexOf(arr[i]) === -1){
                array.push(arr[i]);
            }
        }
        return array;
    };

    /**
     * 定义函数队列
     * */
    var _queueData = [];


    /**
     * 加入队列
     * @param name
     * @param func
     * */
    $.queue = function(name,func){
        if(typeof _queueData[name] === 'undefined'){
            _queueData[name] = [];
        }
        if(typeof func === 'undefined'){
            return _queueData[name];
        }

        return _queueData[name].push(func);
    };

    /**
     * 将函数从队列中移除并执行
     * @param name
     * */
    $.dequeue = function(name){
        if(typeof _queueData[name] !== 'undefined' && _queueData.length){
            (_queueData[name].shift())();
        }
    };

    /**
     * 合并参数
     * @param defaults
     * @param params
     * @returns {*}
     * */
    $.extend = function(defaults, params){
        $.each(defaults,function(key,value){
            if(typeof params[key] === 'undefined'){
                params[key] = value;
            }
        })

        return params;
    };

    /**
     * 在 dom 元素上存储、读取数据
     * @param dom
     * @param key
     * @param value
     *
     * $.data(dom, key);          读取指定键名的数据
     * $.data(dom, key, value);   写入指定键名的数据
     * $.data(dom, key, null);    删除指定键名的数据
     * $.data(dom, object);       批量写入数据
     */
    $.data = function(dom, key, value){
        if(!dom.inteuiDomStorage){
            dom.inteuiDomStorage = {};
        }

        var _dataStorage = dom.inteuiDomStorage;
        if(typeof value === 'undefined'){
            //读取指定键名的数据
            if(typeof key === 'string'){
                if(key in _dataStorage){
                    return _dataStorage[key];
                }else{
                    return null;
                }
            }
            //批量写入数据
            else if(typeof key === 'object'){
                $.each(key,function(k,v){
                    _dataStorage[k] = v;
                })
            }
        }

        //删除数据
        else if(value === 'null'){
            if(typeof _dataStorage[key] !== 'undefined'){
                _dataStorage[key] = null;
                delete _dataStorage[key];
            }
        }

        //写入一个数据
        else {
            _dataStorage[key] = value;
        }
    };

    /**
     * 获取元素的最终样式
     * @param dom
     * @param prop 可选
     * @returns {*}
     */
    $.getStyle = function(dom, prop) {
        var style = window.getComputedStyle(dom, null);
        if (arguments.length === 1) {
            return style;
        }

        return style.getPropertyValue(prop);
    };

    /**
     * ???不太能理解
     * 获取元素相对于 document 的偏移
     * @param dom
     * @returns {{top: number, left: number}}
     */
    $.offset = function(dom){
        var box = dom.getBoundingClientRect();
        var body = document.body;
        var clientTop = dom.clientTop || body.clientTop || 0;
        var clientLeft = dom.clientLeft || body.clientLeft || 0;
        var scrollTop = window.pageYOffset || dom.scrollTop;
        var scrollLeft = window.pageXOffset || dom.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left:box.left + scrollLeft - clientLeft
        }
    };

    /**
     * 设置 transform 属性
     * @param dom
     * @param transform
     */
    $.transform = function(dom, transform){
        dom.style.webkitTransform =
            dom.style.transform = transform;
    }

    /**
     * 设置 transform-origin 属性
     * @param dom
     * @param transformOrigin
     */
    $.transformOrigin = function (dom, transformOrigin) {
        dom.style.webkitTransformOrigin =
            dom.style.transformOrigin = transformOrigin;
    };

    /**
     * 设置 transition 过渡时间
     * @param dom
     * @param duration
     */
    $.transition = function (dom, duration) {
        if(typeof duration !== 'string'){
            duration = duration + 'ms'
        };
        dom.style.webkitTransitionDuration =
            dom.style.transitionDuration = duration;
    }

    /**
     * 执行 document.querySelectorAll，并把结果转换为数组
     * @param selector
     * @param parent
     * @returns {Array}
     */
    $.queryAll = function(selector, parent){
        if(arguments.length === 1){
            parent = document;
        }

        return $.toArray(parent.querySelectorAll(selector));
    };

    /**
     * 执行 document.querySelector
     * @param selector
     * @param parent
     * @returns {Element}
     */
    $.query = function(selector, parent){
        if (arguments.length === 1) {
            parent = document;
        }

        return parent.querySelector(selector);
    };

    /**
     * 执行 document.getElementById
     * @param id
     * @param parent
     * @returns {Element}
     */
    $.queryId = function (id, parent) {
        if (arguments.length === 1) {
            parent = document;
        }

        return parent.getElementById(id);
    };

    /**
     * @param dom
     * @param selector
     * @returns {*}
     */
    $.is = function(dom, selector){
        var compareWith;
        if(typeof selector === 'string'){
            if(dom === document){
                return selector === document;
            }

            if(dom === window){
                return selector === window;
            }

            if(dom.matches){
                return dom.matches(selector);
            }else if(dom.msMatchesSelector){
                return dom.msMatchesSelector(selector);
            }else if(dom.mozMatchesSelector){
                return dom.mozMatchesSelector(selector);
            }else if(dom.webkitMatchesSelector){
                return dom.webkitMatchesSelector(selector);
            }else{
                compareWith = $.queryAll(selector);
                return (compareWith.indexOf(dom) !== -1);
            }
        }else if (selector === document){
            return dom === document;
        }else if (selector === window){
            return dom === window;
        }else if (selector.nodeType){
            return dom === selector;
        }else if (selector[0].nodeType){
            compareWith = $.toArray(selector);
            return compareWith.indexOf(dom) !== -1;
        }

        return false;
    }

    /**
     * 查找含有指定 css 选择器的父节点
     * @param dom
     * @param selector
     * @returns {*}
     */
    $.parent = function(dom, selector){
        var parent = dom.parentNode;
        if(parent !== null){
            if(selector){
                if($.is(parent, selector)){
                    return parent;
                }
            }else {
                return parent;
            }
        }

        return undefined;
    };

    /**
     * 查找含有指定选择器的所有父元素
     * @param dom
     * @param selector
     * @returns {Array}
     */
    $.parents = function(dom, selector){
        var parents = [];
        var parent = dom.parentNode;
        while(parent){
            if(selector){
                if($.is(parent, selector)){
                    parents.push(parent);
                }
            }else{
                parents.push(parent);
            }

            parent = parent.parentNode;
        }

        return $.unique(parents);
    }

    /**
     * dom 元素是否包含在 parent 元素内
     * @param parent
     * @param dom
     * @returns {boolean}
     */
    $.contains = function (parent, dom){
        var tmp = dom.parentNode;
        while(tmp){
            if($.is(parent, tmp)){
                return true;
            }
            tmp = tmp.parentNode;
        }

        return false;
    }

    /**
     * 设置 transition 动画时间
     * @param dom
     * @param duration
     */
})()