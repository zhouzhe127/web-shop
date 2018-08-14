import {
    s,
    w,
    b,
    p
} from "src/config/host_var";
const m = 'http://192.168.31.68:8000/api/';
//==================公众号配置
export default {
    "getWechatConfig": {
        url: w + "Activityconfig/getWechatConfig", // 获取公众号配置
        method: "get"
    },
    "updateWechatConfig": {
        url: w + "Activityconfig/updateWechatConfig", // 获取公众号配置
        method: "post"
    },
    "smallProgramUpdateList": {
        url: s + "SmallProgram/updateList", // 获取版本
        method: "get"
    },
    "updateMiniProgramConfig": {
        url: w + "ActivityConfig/updateMiniProgramConfig", // 设置公众号配置
        method: "post"
    },
    "getTemplateList": {
        url: w + "Activitytemplate/getTemplateList",
        method: "get"
    },
    "ActivityTemplateGetList": {
        url: w + "Activitytemplate/getList",
        method: "get"
    },
    "saveTemplate": {
        url: w + "Activitytemplate/saveTemplate",
        method: "post"
    },
    "delTemplate": {
        url: w + "Activitytemplate/delTemplate",
        method: "post"
    },
    "getWeChatMenu": {
        url: w + "activityconfig/getMenu", // 获取菜单  w
        method: "get"
    },
    "getSelfMenu": {
        url: w + "Activityconfig/getSelfMenu", // 获取SelfMenu菜单
        method: "get"
    },
    "saveWeChateMenu": {
        url: w + "Activityconfig/saveMenu", //更改微信菜单
        method: "post"
    },
    "saveIndividuation": { //   添加个性化菜单
        url: w + 'activityconfig/addConditionalMenu',
        method: 'post'
    },
    "updateMessageConfig": {
        url: w + "Activityconfig/updateMessageConfig", // 更改微信推送语
        method: "post"
    },
    "getWechatMenuPreSet": {
        url: w + "Activityconfig/getWechatMenuPreSet", // 配置教程获取菜单的url链接
        method: "get"
    },
    "setGroupAssistant": {
        url: w + 'assistantfans/setGroup',
        method: 'get'
    },
    "getAuthUrl": { //获取授权
        url: w + 'weixin/getAuthUrl',
        method: 'post'
    },
    "setAuth": { //第三方授权成功
        url: w + 'weixin/setAuth',
        method: 'post'
    }
}