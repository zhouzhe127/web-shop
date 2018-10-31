/* eslint-disable */
import babelPolyfill from '@babel/polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import routerConfig from './config/routes'
import App from './app';
import VueRouter from 'vue-router';
import 'src/res/css/layout.css';
import 'src/res/css/reset.css';
import 'src/res/css/font-icon.css';
import global from 'src/manager/global';
import {
    store
} from 'src/manager/store';
import ajax from 'src/verdor/ajax';
import directive from 'src/manager/directive';
// import DataBase from 'src/verdor/database';
import storgae from 'src/verdor/storage'
import utils from 'src/verdor/utils'
import elementCss from 'src/components/index.css';
import ElementUI from 'src/components/element-ui.common';
import http from 'src/manager/http';


if(process.env.NODE_ENV === 'development'){
	Vue.use(ElementUI);
}

if (module.hot) {
    module.hot.accept();
}


class Main {

    constructor() {

        var cdn = process.env.ASSET_PATH;
        try {
            //php环境中
            cdn = httpDomain.cdn + 'static/';
            global.isPhpEnv = true;
            global.uploadUrl = httpDomain.uploadUrl;
            global.host = httpDomain.host;
        } catch (e) {}

        __webpack_public_path__ = cdn;

        global.cdnUrl = cdn;
        let router = new VueRouter({
            routes: routerConfig,
            // mode:'history'
        })
        global.router = router;
        //全局钩子，判断当前是否是登录状态
        router.beforeEach((to, from, next) => {

            store.dispatch('debugCont', '准备切换为: ' + to.path);
            /* 非主内容区域,content区域需要滚动 */
            if (to.path != '/') {

                if (to.path.indexOf('/brandAudit') > -1) {
                    store.commit('setContentDisplay', true)
                } else {
                    store.commit('setContentDisplay', false)
                }

            }

            if (to.path == '/' || global.checkLogin()) {
                store.commit('setPageTools', {});
                store.commit('setFixButton', {});
                ajax.abortLoad();
                next();
            } else {
                next({
                    path: '/'
                });
            }


			

        })

        router.afterEach((to, from) => {
            store.dispatch('debugCont', to.path + ' 切换完成');
        })

        document.addEventListener('error', function (e) {
            let elem = e.target;
            let name = elem.tagName.toLowerCase();
            if (name === 'script' && elem.src.indexOf(cdn) > -1) {
                store.commit('setWin', {
                    content: '版本已经更新,请清除缓存,然后刷新页面',
                    callback: () => {

                    }
                });
            }
            if (name === 'img') {
                elem.src = require('../src/res/images/busis.png');
            }
        }, true)

        document.addEventListener('click', (e) => {
            if (e.target.id != 'debug') {
                store.dispatch('debugCont', '点击了:' + e.target.textContent);
            }
        })

        window.onerror = function (msg, fileName, line, col, error) {
            store.dispatch('debugCont', '程序报错了: ' + msg);
            return true;
        }


        Vue.use(VueRouter);
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');


        //生产环境下，屏蔽输出
        if (process.env.NODE_ENV === 'production') {
            let log = console.log;
            console.log = function () {};
        }

		if (process.env.NODE_ENV === 'development') {

			http.getTxt().then(function(txt){
				console.log(`%c${txt}`,`font-size: 32px;color: #fff;margin-top: 30px;text-align: center;text-shadow:2px 2px 4px #000;background:linear-gradient(#84fab0,#8fd3f4);font-family: 'Microsoft YaHei',arial,tahoma,sans-serif;padding:10px 15px;border-radius:8px`)
			})

		}
    }


}

new Main();
//rem布局JS
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 1024) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 70 + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);