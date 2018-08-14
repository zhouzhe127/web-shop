import utils from "./utils";
    /**
     * @namespace timer
     */
    let Timer = {
        /**
         * @description 主线程启动
         * @function init
         * @memberof timer
         */
        init: function() {
            this.getAnimation();
            this.ID = window.requestAnimationFrame(this.progress);
            this.t = 16;
            this.lastTime = new Date().getTime();
            this.start = true;
        },
        /**
         * @description 添加指定间隔方法到主线程
         * @function add
         * @param {Function}  fn 回调方法
         * @param {int}  [time=500] 间隔时间(ms)
         * @param {int}  [num=0] 执行次数,0为永久执行
         * @param {Boolean}  [isG=false] 是否立即执行一次
         * @param {Function}  callBack 指定次数完成时的回调
         * @param {Object}  context 间隔的回调方法的运行环境
         * @param {Object}  params 间隔的回调方法的参数
         * @memberof timer
         * @example
         * this.timer.add(function(){},100,0);
         * @returns {String} 计时器唯一的标识符,取消时使用
         */
        add: function(fn, time, num, isG, callBack, context, params) {
            //先启动计时器
            if (!this.start) this.init();

            isG = isG || false;
            context = context || null;
            params = params || null;

            var str = utils.getOnlyId(8);

            var obj = {};
            obj.fn = fn; //回调
            obj.time = time || 500; //间隔
            obj.num = num || 0; //总运行次数
            obj.cb = callBack || null; //完成时的回调
            obj.id = str; //计时器id
            obj.currentNum = 0; //记录已经执行的次数
            obj.f = new Date().getTime(); //记录加入时的时间(执行时的时间戳)
            obj.cxt = context || null;
            obj.params = params || null;

            //立即执行一次
            if (isG) {
                obj.currentNum++;
                obj.fn.call(obj.cxt, obj.params);
            }
            this.timeQueue.push(obj);
            return str;
		
        },
        /**
         * @description 主线程不断调用的方法
         * @function progress
         * @memberof timer
         */
        progress: function() {

            var timerObj = Timer;
            var ct = new Date().getTime();
            timerObj.t = ct - timerObj.lastTime;
            var i = 0;
            for (; i < timerObj.timeQueue.length; i++) {
                var obj = timerObj.timeQueue[i];
                if ((ct - obj.f < obj.time && ct - obj.f + timerObj.t > obj.time) || (ct - obj.f > obj.time)) {
                    //如果回调存在调用
                    if (obj.fn) {
                        obj.fn.call(obj.cxt, obj.params);
                        obj.f = new Date().getTime();
                    }
                    //执行次数不为0时 累加
                    obj.currentNum++;
                    //有次数限时的线程 执行完移除
                    if (obj.num != 0 && obj.currentNum >= obj.num) {
                        if (obj.cb) obj.cb();
                        timerObj.clear(obj.id);
                        i--;
                    }
                }

            }

            timerObj.lastTime = new Date().getTime();
            timerObj.ID = window.requestAnimationFrame(timerObj.progress)
//			console.log(timerObj.timeQueue);
        },
        /**
         * @description 清除某个计时器
         * @function clear
         * @param {String} str 计时器id
         * @memberof timer
         */
        clear: function(str) {
			
            var v = -1;
            for (var i = 0; i < this.timeQueue.length; i++) {
                var obj = this.timeQueue[i];
                if (obj.id === str) v = i;
            }

            if (v > -1) {
                var obj = this.timeQueue[v];
                for (var o in obj) {
                    if (obj.hasOwnProperty(o)) {
                        delete obj[o];
                    }
                }
                this.timeQueue.splice(v, 1);
            }

            if (this.timeQueue.length == 0) {
                window.cancelAnimationFrame(this.ID);
                Timer.start = false;
            }

        },
        /**
         * @description 清除主线程所有正在执行的任务
         * @function clearAll
         * @memberof timer
         */
        clearAll: function() {
            this.timeQueue.length = 0;
            window.cancelAnimationFrame(this.ID);
        },
        /**
         * @description 获取持续调用的最佳方法
         * @function getAnimation
         * @memberof timer
         */
        getAnimation: function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            //获取不同浏览器的requestAnimationFrame
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            //如果没有，则用setTimeout进行模拟
            if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback) {
                //获取当前时间
                var currTime = new Date().getTime();
                //每秒60帧的基础
                //获取时间差值
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        },
        //计时器是否已启动
        start: false,
        /**
         * @description 任务队列
         * @var timeQueue
         * @type {Array}
         * @memberof timer
         */
        timeQueue: [],
        /**
         * @description 主线程的id
         * @var ID
         * @type {Object}
         * @memberof timer
         */
        ID: null,
        /**
         * @description 主线程运行的间隔时间
         * @var t
         * @type {int}
         * @memberof timer
         */
        t: 0,
        /**
         * @description 上一次主线程执行时的毫秒戳
         * @var lastTime
         * @type {Number}
         * @memberof timer
         */
        lastTime: 0
    }

export default Timer;