/* eslint-disable */
import {
    s,
    w,
    b,
    p
} from "src/config/host_var";

export default {
    "GetIndustry": {
        url: s + "Brand/GetIndustry"
    },
    "BopenShop": {
        url: s + "brand/openShop",
        method: "post"
    },
    "BcloseShop": {
        url: s + "brand/closeShop",
        method: "post"
    },
    "ChooseShop": {
        url: s + "ChooseShop/accesslist",
        method: "get"
    },
    "getAraeTag": {
        url: s + "brand/getAraeTag",
        method: "post"
    },
    "addBrand": {
        url: s + "Brand/AddBrand",
        method: "post"
    },
    "addShop": {
        url: s + "Brand/AddShop",
        method: "post"
    },
    "getAreaTag": {
        url: s + "brand/getAreaTag",
        method: "post"
    },
    "resubmit": {
        url: s + "brand/resubmit",
        method: "post"
    },
    "brandgetConfig": { //获取品牌基本信息
        url: s + "Brandconfig/getConfig",
        method: "get"
    },
    "brandSetConfig": { //修改品牌基本信息
        url: s + "Brandconfig/setConfig",
        method: "post"
    },
    "getBrandPaymentList": { //修改品牌支付
        url: s + "Payment/getBrandPaymentList",
        method: "post"
    },
    "updateShopType": { //转换加盟-直营
        url: s + "Brandconfig/updateShopType",
        method: "post"
    },
    "paymentAssign": { //品牌支付指派
        url: s + "Payment/paymentAssign",
        method: "post"
    },
    "getPayAccount": { //获取品牌转账帐户配置
        url: s + "Citic/getPayAccount",
        method: "get"
    },
    "getRecAccountList": { //获取分账账户配置列表
        url: s + "Citic/getRecAccountList",
        method: "get"
    },
    "updateRecAccount": { //修改分账账户配置
        url: s + "Citic/updateRecAccount",
        method: "post"
    },
    "updatePayAccount": { //修改转账账户配置
        url: s + "Citic/updatePayAccount",
        method: "post"
    },
    "getShopByBrandId": { //获取品牌下所有通过审核的门店
        url: s + "shop/getShopByBrandId",
        method: "get"
    },
    "StoreareaGetList": { //获取品牌下所有区域
        url: s + "Storearea/getList",
        method: "get"
    },
    "StoreareaCreate": { //添加区域
        url: s + "Storearea/create",
        method: "post"
    },
    "StoreareaEdit": { //编辑区域
        url: s + "Storearea/edit",
        method: "post"
    },
    "StoreareaDelete": { //删除区域
        url: s + "Storearea/delete",
        method: "get"
    },
    "storeareaGetAllArea": { //获取品牌下门店区域列表
        url: s + "Storearea/getAllArea",
        method: "get"
    },
    "getAllArea": { //获取品牌下门店区域列表
        url: s + "Entry/getAllArea",
        method: "get"
    },
}
