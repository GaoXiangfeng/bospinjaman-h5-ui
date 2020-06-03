
import store from "../store";
import landingService from "./landing.service";
import userService from "./user.service";
import dataService from "./static-data.service";
import Cookies from "./cookieStorage.service";
import {getParameterByName} from "../../../lib/util";
import merchant from "../config/merchant.config";
module.exports = {
    init: (router) => {
        // 修改 qg-vue-component 的默认样式。
        var html = document.querySelector('html');
        html.setAttribute('class', 'override-qg-style');
        
        // 添加推广渠道 dimension 竖线分割，来标识维度参数
        let dimension = '';
        let appChannel = getParameterByName('appChannel') || '';
        let appName = getParameterByName('appName') || '';
        if (appChannel || appName) {
            let u = navigator.userAgent
            let type = (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) ? 'Android' : 'IOS'
            dimension = 'app|' + appName + '|' + type + '|' + appChannel;
        } else {
            dimension = getParameterByName('dimension') || '';
            if (!dimension) {
                dimension = Cookies.get('dimension');
            }
        }
        Cookies.set("dimension", dimension);

        router.beforeEach((to, from, next) => {
            const meta = to.meta
            let options = {
                back: false,    // 返回
                title: false,   // title
                search: false,  // 搜索框
                cancel: false,  // 取消
                searchBar: false, // 搜索图标
                order: false    // 订单图标
            }
            // store.commit('CHANGE_HEADER', true);
            if (meta.options) {
                store.commit('CHANGE_OPTIONS', Object.assign(options, meta.options)) //改变header
            }

            store.commit('CHANGE_NEEDKEEPALIVE', meta.needKeepAlive)
    
            /*if (dataService.isApp || Cookies.get('h') == '0') {
                store.commit('CHANGE_HEADER', false) //改变header
            }*/
            if (meta.title) {
                store.commit('CHANGE_TITLE', meta.title) //改变title
            } else {
                // store.commit('CHANGE_TITLE', '信用钱包') //改变title
            }
            if (to.query.phoneNo || to.query.userPhone) {
                let userPhone = to.query.phoneNo || to.query.userPhone
                let phoneNo = (!isNaN(Number(userPhone)) && userPhone.length === 11)
                    ? userPhone
                    : ''
                phoneNo && Cookies.set('phoneNo', phoneNo)
            }

            if (to.query.registerFrom) {
                Cookies.set('registerFrom', to.query.registerFrom);
            } else {
                Cookies.set('registerFrom', '1');
            }

            if (to.query.token) {
                Cookies.set('token', to.query.token || '');
                next(to.fullPath.slice(0, to.fullPath.indexOf("token") - 1));
                return;
            }
            next()
        })
    },
    load: (routes) => {
        /*
         根据渠道加载组件
         */
        let registerFrom = getParameterByName('registerFrom') || Cookies.get('registerFrom')
        if (registerFrom && merchant.hasOwnProperty(registerFrom)) {
            let components = merchant[registerFrom].components
            routes.forEach((route) => {
                //支持根替换和组件替换
                if (components && components.hasOwnProperty(route.name)) {
                    let component = components[route.name]
                    if (component.rootComponent) {
                        route.component = component.rootComponent
                    }
                    if (component.childComponent && route.component.components) {
                        for (let key in component.childComponent) {
                            if (route.component.components[key]) route.component.components[key] = component.childComponent[key]
                        }
                    }
                }
            })
        }
        return routes
    }
}
