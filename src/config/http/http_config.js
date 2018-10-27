/* eslint-disable */
import {
    s,
    w,
    b,
    p
} from "src/config/host_var";


import goodsConfig from "./http_goods_config";
import invoicingSystem from "./http_invoicing_system";
import shopConfig from "./http_shop_config";
import marketingTools from "./http_marketing_tools";
import outFood from "./http_outfood";
import brand from "./http_brand";
import publicConfig from "./http_public_configuration";
import statistics from "./http_statistics";
import member from "./http_member";
import cashier from "./http_cashier";
import sellerAssents from './http_seller_assents'
import ticket from './http_ticket'



let httpConfig = {
    "Login": {
        url: s + "entrance/login", //登录
        method: "post"
    },
    "newLogin": {
        url: s + "entry/login", //登录  新版本
        method: "post"
    },
    "exportMoreDayOrder": {
        url: s + "Orderstatistics/exportMoreDayOrder", //堂吃多天数据导出
        type: "file"
    },
    "exportOneDayOrder": {
        url: s + "Orderstatistics/exportOneDayOrder", //堂吃单天数据导出
        type: "file"
    },
    "bannerImgUpload": {
        // url: s + 'bannerImgs_upload',
        // type: 'upload'
        url: s + 'image/uploadImage',
        // url:s+'image/uploadImg',
        type: "upload"
    },
    "bigImgUpload": {
        // url: s + 'bigImg_upload',
        // type: 'upload'
        url: s + 'image/uploadImage',
        // url:s+'image/uploadImg',
        type: "upload"
    },
    "uploadImg": {
        url: s + 'image/uploadImage',
        // url:s+'image/uploadImg',
        type: "upload"
    },
	"AccountRegister": {
		url: s + "Account/register", //注册
		method: "post"
	},
	"AccountSendCode": {
		url: s + "Account/sendCode", //注册验证码
		method: "post"
	},

}

// Object.assign(
//     httpConfig,
//     goodsConfig,            //商品配置
//     invoicingSystem,        //进销存配置
//     shopConfig,             //店铺配置
//     marketingTools,         //营销工具
//     outFood,                //外卖
//     brand,
//     publicConfig ,           //公众号配置
//     statistics ,
//     member,
//     cashier,                  //收银报表
//     sellerAssents             // 闪店卖手
// );

let objConfig = [goodsConfig, invoicingSystem, shopConfig, marketingTools, outFood, brand, publicConfig, statistics, member, cashier, sellerAssents, ticket];

for (let item of objConfig) {
    for (let str in item) {

        if (httpConfig[str]) throw new Error("已经有存在的key: " + str);
        httpConfig[str] = item[str];
    }
}
export default httpConfig;