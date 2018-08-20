import {
    s,
    w,
    b,
    p
} from "src/config/host_var";

export default {
    "getTakeOutList": {
        url: b + "takeout/getTakeOutList",
        method: "post"
    },
    "addMeituanShopRelation": {
        url: b + "meituan/addMeituanShopRelation",
        method: "post"
    },
    "getMeituntGoods": {
        url: b + "meituan/getMtGoods",
        method: "get"
    },
    "getMeituanCategory": {
        url: b + "meituan/getMeituanCategory",
        method: "get"
    },
    "getReleaseAuthUrl": {
        url: b + "takeout/getReleaseAuthUrl",
        method: "post"
    },
    "addMeituanCategory": {
        url: b + "meituan/addMeituanCategory",
        method: "get"
    },
    "editMeituanCategory": {
        url: b + "meituan/editMeituanCategory",
        method: "get"
    },
    "deleteMeituanCategory": {
        url: b + "meituan/deleteMeituanCategory",
        method: "get"
    },
    "bindgoods": {
        url: b + "meituan/bindgoods",
        method: "get"
    },
    "queryListByEdishCodes": {
        url: b + "meituan/queryListByEdishCodes",
        method: "post"
    },
    "uploadGoods": { //外卖新建商品
        url: b + "meituan/uploadGoods",
        method: "post"
    },
    "getAuthorizationUrl": {
        url: b + "takeout/getAuthorizationUrl",
        method: "post"
    },
    "getReturnInfo": {
        url: b + "takeout/getReturnInfo",
        method: "post"
    },
    "editGoodsRelation": {
        url: b + "takeout/editGoodsRelation",
        method: "post"
    },
    "getBaiduGoods": {
        url: b + "takeout/getBaiduGoods",
        method: "post"
    },
    "meituanDeleteSku": {
        url: b + "meituan/deleteSku",
        method: "post"
    },
    "releaseAuth": {
        url: b + "takeout/releaseAuth",
        method: "post"
    },
    "addGoodsRelation": {
        url: b + "takeout/addGoodsRelation",
        method: "post"
    },
    "takeoutprintGetList": {
        url: s + 'Takeoutprint/getList', // 获取外卖打印机列表
        method: 'get'
    },
    "takeoutGetTakeOutList": {
        url: b + 'Takeout/getTakeOutList', // 获取外卖列表
        method: 'post'
    },
    "takeoutprintAdd": {
        url: s + 'Takeoutprint/add', // 外卖新建打印机
        method: 'post'
    },
    "takeoutprintEdit": {
        url: s + 'Takeoutprint/edit', // 外卖修改打印机
        method: 'post'
    },
    "takeoutprintDelete": {
        url: s + 'Takeoutprint/delete', // 外卖删除打印机
        method: 'post'
    },
    "getTakeoutprint": {
        url: s + 'Takeoutprint/getTakeoutprint', // 外卖打印机配置信息
        method: 'post'
    },
    "getOrderName": {
        url: s + 'Takeoutprint/getOrderName', // 单据数据列表
        method: 'get'
    },
    "getWireprinter": {
        url: s + 'Takeoutprint/getWireprinter', // 单据数据列表
        method: 'get'
    },
    "getTakeoutShop": {
        url: b + 'takeout/getTakeoutShop', // 渠道下的店铺列表
        method: 'post'
    },
    "takeoutGetCategoryList": {
        url: b + 'takeout/getCategoryList', //饿了么请求分类列表
        method: 'post'
    },
    "getMtGoods": {
        url: b + 'takeout/getMtGoods', //美团请求分类列表
        method: 'post'
    },
    "getBaiduGoods": {
        url: b + 'takeout/getBaiduGoods', //百度请求分类列表
        method: 'post'
    },
    "getGoodsByCategoryId": {
        url: b + 'takeout/getGoodsByCategoryId', //请求商品列表
        method: 'post'
    },
    "mtRedisClean": {
        url: s + 'Takeout/mtRedisClean', //解绑授权成功
        method: 'get'
    },
    "getTakeOutShoplist": {
        url: b + 'TakeOut/getTakeOutShoplist', //
        method: 'get'
    },
    "getDadaShopInfo": {
        url: w + 'Dada/getDadaShopInfo', //达达获取店铺信息
        method: 'get'
    },
    "bindSourceId": {
        url: w + 'Dada/bindSourceId', //绑定商户Id
        method: 'post'
    },
    "getDadaConfig": {
        url: w + 'Dada/getDadaConfig', //获取商户Id
        method: 'post'
    },
    "addOrUpdateDadaConfig": {
        url: w + 'Dada/addOrUpdateDadaConfig', //获取商户Id
        method: 'post'
    },
    "bindShopCoding": {
        url: w + 'Dada/bindShopCoding', //修改店铺编码
        method: 'post'
    },
    "outfoodmakeUpOrder": {
        url: b + 'eleme/makeUpOrder', //饿了么一键补单
        method: 'post'
    },
}