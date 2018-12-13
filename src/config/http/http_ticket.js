/* eslint-disable */
import {
	s,
	w,
	b,
	p,
	a
} from 'src/config/host_var';

export default {
	ticketSetInvoice: {
		url: s + 'Invoice/setInvoice', //添加编辑发票点
		method: 'post'
	},
	ticketPointGetlist: {
		url: s + 'Invoice/getList', //获取发票点列表
		method: 'post',
		// fake: true
	},
	//销方管理
	"invoiceAddSeller": {
		url: s + "Invoice/addOrUpdateSeller", //新增销方
		method: "post"
	},
	"invoiceGetList": {
		url: s + "Invoice/getList", //销方列表
		method: "post",
		// fake:true
	},
    //概况
    "getSurveyNoticeList": {
        url: s + "Notice/getListByLimit", //通知列表
        method: "get",
        // fake:true
    },
    "noticeSurveyGetOne": {
        url: s + "Notice/getOne", //通知内容
        method: "get",
	},
	"adminNoticeSurveyGetOne": {
        url: a + "Notice/getOne", //通知内容--admin
        method: "get",
    },
    "TurnoverGetDiscountDataOne": {
        url: b + "Turnover/getDiscountData", //饼图优惠卷数据
        method: "get",
    },
    "TurnoverGetBrandStat": {
        url: b + "Turnover/getBrandStat", //品牌首页数据
        method: "get",
    },
    "turnoverGetMoreShopStat": {
        url: b + "turnover/getMoreShopStat", //品牌下每家门店的数据
        method: "get",
    },

};