import {
    s,
    w,
    b,
    p
} from "src/config/host_var";


export default {
    //---------------------统计管理------------------
    "statisticsBusiness": {
        url: b + "Business/getBusinessData", //营业统计
        method: "post"
    },
    "statisticsBrandBusiness": {
        url: b + "Business/getBrandBusinessData", //营业统计-品牌
        method: "post"
    },
    "createBusinessTask": {
        url: b + "Business/createBusinessTask", //营业统计-品牌
        method: "post"
    },
    "orderBillDelite": {
        url: s + "Orderstatistics/billDelite", //订单详情
    },
    "billDelite": {
        url: s + "Orderstatistics/billDelite", //堂吃订单详情
        method: "get"
    },
    "more": {
        url: s + "Orderstatistics/more", //堂吃多天
        method: "get"
    },
    "printMore": {
        url: s + "Orderstatistics/printMore", //堂吃多天数据打印
        method: "get"
    },
    "oneDayOrderData": {
        url: s + "Orderstatistics/one", //堂吃单天
        method: "get"
    },
    "getCondition": {
        url: s + "orderstatistics/getCondition", //区域
        method: "get"
    },
    "printOrderDetail": {
        url: s + "Statistics/printOrderDetail", //堂吃订单详情打印
        method: "get"
    },
    "OrderReport": {
        url: s + "Report/OrderReport", //堂吃获取taskId
        method: "get"
    },
    "reportGet": {
        url: s + "Report/get", //堂吃获取店铺
        method: "get"
    },
    "exportReport": {
        url: s + "Report/exportReport", //堂吃品牌导出
        type: "file"
    },
    "getOrderOneDayStat": {
        url: b + "takeout/getOrderOneDayStat", //外卖单天数据
        method: "get"
    },
    "getOrderManyDaysStat": {
        url: b + "takeout/getOrderManyDaysStat", //外卖多天数据
        method: "get"
    },
    "getOrderDetail": {
        url: b + "takeout/getOrderDetail", //外卖订单详情
        method: "get"
    },
    "printOrderStat": {
        url: b + "takeout/printOrderStat", //外卖订单打印
        method: "get"
    },
    "takeoutPrintOrderDetail": {
        url: b + "takeout/printOrderDetail", //外卖详情打印
        method: "get"
    },
    "getOrderManyShopsStat": {
        url: b + "Takeout/getOrderManyShopsStat", //外卖获取taskId
        method: "post"
    },

    "exportManyShopsOrderStat": {
        url: b + "Takeout/exportManyShopsOrderStat", //外卖品牌导出
        type: "file"
    },

    "exportOrderStat": {
        url: b + "Takeout/exportOrderStat", //外卖导出
        type: "file"
    },
    "goodssalesMore": {
        url: b + "Goodssales/more", //分类统计全部
        method: "get"
    },
    "categorystatisticsMore": {
        url: s + "Categorystatistics/more", //分类统计堂吃
        method: "post"
    },
    "goodssalesTakeoutList": {
        url: b + "Goodssales/takeoutList", //分类统计外卖
        method: "get"
    },
    "goodssalesExportMore": {
        url: b + "Goodssales/exportMore", //分类统计全部导出
        type: "file"
    },
    "categorystatisticsExport": {
        url: s + "Categorystatistics/export", //分类统计堂吃导出
        type: "file",
        method: "post"
    },
    "goodssalesExportTakeout": {
        url: b + "Goodssales/exportTakeout", //分类统计外卖导出
        type: "file",
    },
    "goodssalesPrintDataMore": {
        url: b + "Goodssales/printDataMore", //分类统计全部打印
        method: "get"
    },
    "categorystatisticsPrintData": {
        url: s + "Categorystatistics/printData", //分类统计堂吃打印
        method: "post"
    },
    "goodssalesPrintTakeoutData": {
        url: b + "Goodssales/printTakeoutData", //分类统计外卖打印
        method: "get"
    },
    "getDelOrder": {
        url: s + "wastestatistics/getDelOrder", //废单统计
    },
    "exportDelOrder": {
        url: s + "Wastestatistics/exportDelOrder", //废单导出
        type: "file"
    },
    "deleteBillDelite": {
        url: s + "wastestatistics/billDelite", //废单详情
    },
    // "getOrderBillList": {
    //     url: s + "Order/getOrderBillList", // 按日期获取"挂账统计"列表
    // },
    "billstatisticsGetList": {
        url: s + "billstatistics/getList", // 获取"挂账统计"列表
    },
    "billGetBillNames": {
        url: s + "Bill/getBillNames", // 获取挂账账户列表
        method: "get"
    },
    // "exportBill": {
    //     url: s + "Order/exportBill", // "挂账统计" 导出
    //     type: 'file'
    // },
    "getRechargeStatistics": {
        url: w + "MemberConsume/getRechargeStatistics", // "会员充值统计" 获取列表
    },
    "exportRechargeStatistics": {
        url: w + "MemberConsume/getRechargeStatistics", // "会员充值统计" 导出
        type: 'file'
    },
	"getChangeShiftsList": {
		url: s + "Shiftsstatistics/getShiftsList", // 获取"交接班"的数据列表
		method: "get"
	},
	"getShiftsDetail": {
		url: s + "Shiftsstatistics/getShiftsDetail", // 获取"交接班"详情
		method: "get"
	},
	"updateDifferPrice": {
		url: s + "Shiftsstatistics/updateDifferPrice", //差额调整
		method: "post"
	},
    // "getBillDelite": {
    //     url: s + "Order/billDelite", // 根据订单号获取挂账的订单详情
    //     method: "post"
    // },
    "printOrderDetail": {
        url: s + "Statistics/printOrderDetail", //定单详情-打印
    },
    "OrderReport": {
        url: s + "Report/OrderReport", //订单报表创建任务
    },
    "ReportGet": {
        url: s + "Report/get", //获取任务数据
    },
    "moreDelOrder": {
        url: s + "Wastestatistics/moreDelOrder", //废单统计---多天废单统计
    },
    "moreReturnByName": {
        url: s + "Wastestatistics/moreReturnByName", //多商品退菜列表
    },
    "getReturnList": {
        url: s + "wastestatistics/getReturnList", //退菜列表
    },
    "getReturnDetail": {
        url: s + "wastestatistics/getReturnDetail", //退菜详情
    },
    "moreReturn": {
        url: s + "Wastestatistics/moreReturn", //退品统计---多天退品统计
    },
    "exportMoreReturnByName": {
        url: s + "Wastestatistics/exportMoreReturnByName", //导出多商品退菜数据
        type: "file"
    },
    "exportReturnList": {
        url: s + "Wastestatistics/exportReturnList", //导出退菜商品具体订单
        type: "file"
    },
    "moreFreeByName": {
        url: s + "Wastestatistics/moreFreeByName", //赠品统计---多商品赠品列表
    },
    "getFreeList": {
        url: s + "wastestatistics/getFreeList", //赠品列表
    },
    "getFreeDetail": {
        url: s + "wastestatistics/getFreeDetail", //赠品详情
    },
    "moreFree": {
        url: s + "Wastestatistics/moreFree", //多天赠品统计
    },
    "exportMoreFreeByName": {
        url: s + "Wastestatistics/exportMoreFreeByName", //导出多商品赠品数据
        type: "file"
    },
    "exportFreeList": {
        url: s + "Wastestatistics/exportFreeList", //导出赠菜商品具体订单
        type: "file"
    },
    "getReserveList": {
        url: s + "Reserve/getReserveList", //预定统计列表
        method: "post"
    },
    "getReserveDetail": {
        url: s + "Reserve/getReserveDetail", //预定统计详情
        method: "post"
    },
    "GetGoodsListBySeasonal": {
        url: s + "Goods/GetGoodsListBySeasonal", //改价记录
        method: "get"
    },
    "getLogByPrice": {
        url: s + "Log/getLogByPrice", //改价记录详情
        method: "get"
    },
    "getStatisticsData": {
        url: s + "Customstatistics/getStatisticsData", //自定义商品统计
        method: "get"
    },
    "OrderstatisticsBillDelite": {
        url: s + "Orderstatistics/billDelite", //自定义商品统计详情
        method: "get"
    },
    "exportCustomStatistics": {
        url: s + "Customstatistics/exportCustomStatistics", //自定义商品导出
        type: "file"
    },
    "cardTypeGetList": {
        url: w + "Cardtype/getList", //获取实体卡类型
        method: "get"
    },
    "getCardRelationList": {
        url: w + "Card/getCardRelationList", //获取卡关联配置列表
        method: "get"
    },
    "getCardStatistics": {
        url: w + "Membercard/getCardStatistics", //获取实体卡列表
        method: "get"
    },
    "activityStatisticsGetDetail": {
        url: w + "activityStatistics/getDetail", //获取活动详情
        method: "get"
    },
    'obtainPay': {
        url: s + 'Querybill/obtainPay',
        method: "post"
    },
    'exportExcel': {
        url: s + "Querybill/exportExcel",
        type: "file",
    },
    'goodssalesGetItemList': {
        url: b + 'Goodssales/getItemList', //单品统计
        method: "post"
    },
    'goodssalesExportStat': {
        url: b + 'Goodssales/exportStat', //单品统计-导出-创建报表任务
        method: "post"
    },
    'goodssalesGetFileUrl': {
        url: b + 'Goodssales/getFileUrl', //单品统计-导出-获取下载文件路径
        method: "post",
    },
    "GoodssalesGetCateSales": {
        url: b + 'Goodssales/getCateSales', //零售店分类统计
        method: 'get'
    },
    "GoodssalesCateSalesExport": {
        url: b + "Goodssales/cateSalesExport", //零售分类统计导出
        type: 'file'
    },
    "scanPayQuery": {
        url: w + "Reportstatistics/scanPayQuery", //查询
        method: 'get'
    },
    "getScanTaskStatus": {
        url: w + "Reportstatistics/getTaskStatus", //查询
        method: 'get'
    },
    "getScanPayData": {
        url: w + "Reportstatistics/getScanPayData", //获取数据
        method: 'get'
    },
    "exportScanPayData": {
        url: w + "Reportstatistics/getScanPayData", //导出获取数据
        type: 'file'
    },
    "scanPayOrderDetail": {
        url: w + "Reportstatistics/scanPayOrderDetail", //获取数据
        method: 'get'
    },
    "getReverseList": {
        url: s + "reverseStatistics/getReverseList", //获取反结账列表
        method: 'get'
    },
    "getReverseByOid": {
        url: s + "reverseStatistics/getReverseByOid", //单个反结账次数列表
        method: 'get'
    },
    "getReverseDetail": {
        url: s + "reverseStatistics/getReverseDetail", //单个反结账次数列表
        method: 'get'
    },
    "takeoutOrderQuery": {
        url: w + "Reportstatistics/takeoutOrderQuery", //自营外卖查询
        method: 'get'
    },
    "getTakeoutData": {
        url: w + "Reportstatistics/getTakeoutData", //自营外卖获取数据
        method: 'get'
    },
    "getTakeoutOrderDetail": {
        url: w + "Reportstatistics/getTakeoutOrderDetail", //自营外卖获取订单详情
        method: 'get'
    },
    "getOrderByMobileOrOid": {
        url: w + "Reportstatistics/getOrderByMobileOrOid", //自营外卖手机号查询订单
        method: 'get'
    },
    "rechargeQuery": {
        url: w + "Reportstatistics/rechargeQuery", //会员充值统计
        method: 'get'
    },
    "getRechargeData": {
        url: w + "Reportstatistics/getRechargeData", //会员充值统计获取数据
        method: 'get'
    },
    "exportRechargeData": {
        url: w + "Reportstatistics/getRechargeData", //会员充值统计获取数据
        type: 'file'
    },
    "getGoodsInvenStatList": {
        url: b + "Goodsinventory/getGoodsInvenStatList", //单品库存统计(店铺)
        method: 'get'
    },
    "getInventoryStat": {
        url: b + "Invoicingstat/getInventoryStat", //单品库存统计(品牌)
        method: 'get'
    },
    "billOrderReport": {
        url: s + "Report/billOrderReport", //挂账统计(品牌)
        method: "get"
    },
    "citicGetBillSplitList": {
        url: s + "Citic/getBillSplitList", //中信银行对账单上海(品牌)
        method: "get"
    },
    "citicGetShopBillList": {
        url: s + "Citic/getShopBillList", //中信银行对账单上海(门店)
        method: "get"
    },
    "citicExportBillSplitList": {
        url: s + "Citic/exportBillSplitList", //中信银行对账单上海导出
        type: "file"
    },
    "citicGetTransferData": {
        url: s + "Citic/getTransferData", //获取中信一键转账报文
        method: "get"
    },
    "ceshi": {
        url: "http://127.0.0.1:5060", //解析报文数据
        method: "post",
        source: true,
        type: "text"
    },
    "citicGetTransferResult": {
        url: s + "Citic/getTransferResult", //解析报文数据
        method: "post"
    },
    "citicGetQueryData": {
        url: s + "Citic/getQueryData", //获取转账结果查询报文
        method: "get"
    },
    "citicGetQueryResult": {
        url: s + "Citic/getQueryResult", //解析转账结果查询报文
        method: "post"
    },
    "adjustRecord": {
        url: w + "MemberConsume/adjustRecord", //积分调整记录
        method: "get"
    },
    "ExportadjustRecord": {
        url: w + "MemberConsume/adjustRecord", //积分调整记录
        type: "file"
    },
}