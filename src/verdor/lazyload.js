/**
 * @param {object} options //可传递基础配置插件 可选
 */
function lazyLoad(options){
    //插件基础配置
    this.config = {
        container : options.container === undefined ? window : options.container, //容器 默认为window    
        event : 'scroll', //事件 默认为scrool
        suffix : options.suffix === undefined ? 'sd-img' : options.suffix, //img属性 默认为sd-img
        className : options.className === undefined ? 'lazyImg' : options.className, //class名称 
        isEchae : true //判断是否全部加载 是否继续循环 布尔值
    };
    this.init(options);
};
lazyLoad.prototype = {
    init : function(options){
        // 初始化函数
        var self = this;
        this._addEvent(this.config.event,this.config.container,function(){
            self._update();
        });
        self._update();
    },
    _getClassList : function(className){
        // 获取classList
        return document.getElementsByClassName(className);
    },
    _addEvent : function(type,obj,callback){
        // 添加绑定事件
        /**
         * @param {string} type 事件类型
         * @param {string} type 绑定容器
         * @param {function} callback 回调函数
         */
        if(obj === window){
            window.addEventListener(type,callback,false);
        }else{
            document.getElementById(obj).addEventListener(type,callback,false);
        }
    },
    _update : function(){
        // 更新可视区域图片
        var i,imgList,limetHeight;
            imgList = this._getClassList(this.config.className);
        if(document.body.scrollTop  == 0){
            if(this.config.container === window){
                limetHeight = limetHeight = document.documentElement.scrollTop + document.documentElement.clientHeight;
            }else{
                limetHeight = document.getElementById(this.config.container).scrollTop + document.documentElement.clientHeight;
            }
        }else{
            limetHeight = document.body.scrollTop + document.documentElement.clientHeight;
        }
        
        if(this.config.isEchae){
            for(i=0;i<imgList.length;i++){
                if(imgList[i].parentNode.parentNode.offsetTop < limetHeight && imgList[i].getAttribute(this.config.suffix)){    
                    imgList[i].setAttribute('src',imgList[i].getAttribute(this.config.suffix));
                    imgList[i].removeAttribute(this.config.suffix);
                    this.config.isEchae = (i+1 == imgList.length) ? false : true;
                }
            }
        }
    }
};

export default lazyLoad;