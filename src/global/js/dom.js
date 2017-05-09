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
        return Array.prototype.toString.call(arr) === '[Object Array]';
    }

    /**
     * 将nodeList转化为数组
     * @param nodeList
     * @returns {array}
     * */
    $.toArray = function(nodeList){
        var array = null;
        try{
            Array.prototype.slice(nodeList);
        }catch(e){
            array = new Array();
            for(var i=0;i<nodeList.length;i++){
                array.push(nodeList[i]);
            }
        }
        return array;
    }

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
            for(prop in obj){
                if(obj.hasOwnProperty(prop)){
                    if(callback(prop,obj[prop]) === false){
                        break;
                    }
                }
            }
        }
    }

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
    }

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
    }

    /**
     * 将函数
     * */
})()