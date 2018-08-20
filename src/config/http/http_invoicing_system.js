import {
    s,
    w,
    b,
    p
} from "src/config/host_var";

//------------进销存配置管理----------   
export default {
    //------------库存管理----------  
    "getMaterialList": {
        url: b + "Material/getMaterialList", //获取物料列表
        method: "get"
    },
    // 进销存配置
    "invoicingDelDistributionConfig": {
        url: b + "invoicing/delDistributionConfig", //删除分销价
        method: 'get'
    },
    "invoicingGetDistributionConfig": {
        url: b + "invoicing/getDistributionConfig", //获取分销价     
        method: 'get'
    },
    "invociGetSupplier": {
        url: b + "invoicing/getInventoryConfig", //进销存配置(获取)
        method: "get"
    },
    "invociUpdateSupplier": {
        url: b + "invoicing/updateInventoryConfig", //进销存配置(更新)
        method: "post"
    },
    "getMaterialNum": {
        url: b + "Material/getMaterialNum", //获取物料数量
        method: "get"
    },
    "goodsinventoryAddNum": {
        url: b + "Goodsinventory/addNum",
        method: "post"
    },
    "invoiv_getCategoryList": { //获取物料分类
        url: b + "Material/getCategoryList",
        method: "get"
    },
    "invoiv_getMaterialNum": { //获取物料数量
        url: b + "Material/getMaterialNum",
        method: "get"
    },
    "inventoryPrintCode": { //打印条码
        url: b + "Invoicing/printCode",
        method: "post"
    },
    "warehouseList": {
        url: b + "Warehouse/warehouseList", //仓库列表
        method: "post"
    },
    "invoic_getMaterialListByShopIds": {
        url: b + "Material/getMaterialListByShopIds", //多店物料列表
        method: "get"
    },
    "getShelvesList": {
        url: b + "Shelves/getShelvesList", //货架列表
        method: "post"
    },
    "invoicing_shelveNewBatch": {
        url: b + "invoicing/unShelveNewBatch", //下架到新批次
        method: "post"
    },
    "editShelves": {
        url: b + "Shelves/editShelves", //修改货架
        method: "post"
    },
    "invoic_getMaterialDetail": {
        url: b + "Material/getMaterialDetail", //获取物料详情
        method: "get"
    },
    "invoic_getMaterialBatch": {
        url: b + "Invoicing/getMaterialBatch", //获取物料批次列表
        method: "get"
    },
    "invoic_getLogList": {
        url: b + "Material/getLogList", //获取物料操作记录列表
        method: "post"
    },
    "invoic_getType": {
        url: b + "Material/getOperationType", //获取操作类型
        method: "get"
    },
    "editShelvesArea": {
        url: b + "Shelves/editShelvesArea", //修改货架区域
        method: "post"
    },
    "invoic_delMaterial": {
        url: b + "Material/delMaterial", //删除物料
        method: "post"
    },
    "addShelves": {
        url: b + "Shelves/addShelves", //货架添加
        method: "post"
    },
    "Invent_getReport": {
        url: b + "Inventoryreport/getReport", //获取商品入库日志
        method: "get",
        type: 'file'
    },
    "getInventoryLogByGid": {
        url: b + "Invoicing/getInventoryLogByGid", //获取商品进销存操作日志
        method: "get"
    },
    "deleteWarehouse": {
        url: b + "Shelves/deleteShelves", //删除货架
        method: "post"
    },
    "deleteWarehousearea": {
        url: b + "Shelves/deleteShelvesArea", //删除区域
        method: "post"
    },
    "addWarehousearea": {
        url: b + "Shelves/addShelveArea", //新增区域
        method: "post"
    },
    "causeList": {
        url: b + "wearcause/causeList", //获取耗损原因列表
        method: "post"
    },
    "addCause": {
        url: b + "wearcause/addCause", //新增耗损原因
        method: "post"
    },
    "deleteCause": {
        url: b + "wearcause/deleteCause", //删除耗损原因
        method: "post"
    },
    "editCause": {
        url: b + "wearcause/editCause", //修改耗损原因
        method: "post"
    },
    "invoicing_getBatchStorageRecords": {
        url: b + "Invoicing/getBatchStorageRecords", //查询入库导出记录列表
        method: "get"
    },
    "invoicing_importLibarys": {
        method: "get",
        type: "text"
    },
    'invoicing_taskInfo': {
        url: s + "Report/taskInfo", //轮询任务，判断是否完成
        method: "get"
    },
    'invoicing_getInventoryLogType': {
        url: b + "invoicing/getInventoryLogType", //获取所有日志类型
        method: "post"
    },
    'invoicing_warehouseImport': {
        url: b + "Invoicing/warehouseImport", //入库导入
        method: "post",
        type: "upload"
    },
    'Invent_redshes': {
        method: "get",
        type: "file"
    },
    //品牌管理新街口
    "InvoicingAddBrand": {
        url: b + "Invoicing/addBrand", //添加品牌
        method: 'post'
    },
    "InvoicingEditBrand": {
        url: b + "Invoicing/editBrand", //修改品牌
        method: 'post'
    },
    "InvoicingDeleteBrand": {
        url: b + "Invoicing/deleteBrand", //删除品牌
        method: 'post'
    },
    //品牌管理旧接口
    "invoicing_addBrand": {
        url: s + "Invoicing/addBrand", //新增品牌
        method: "post"
    },
    "deleteBrand": {
        url: s + "Invoicing/deleteBrand", //删除品牌
        method: "post"
    },
    "editBrand": {
        url: s + "Invoicing/editBrand", //编辑品牌
        method: "post"
    },
    "getGoodsByBid": {
        url: s + "Invoicing/getGoodsByBid", //编辑品牌
        method: "post"
    },
    "WeighgoodsGetList": {
        url: s + "Weighgoods/getList", //称重商品配置列表
        method: "post"
    },
    "add": {
        url: s + "Weighgoods/add", //新建称重商品类型
        method: "post"
    },
    "invoicing_delete": {
        url: s + "Weighgoods/delete", //删除称重商品类型
        method: "post"
    },
    "edit": {
        url: s + "Weighgoods/edit", //编辑称重商品类型
        method: "post"
    },
    "getShelveRule": {
        url: s + "shop/getShelveRule", //获取销售规则
        method: "post"
    },
    "editShelveRule": {
        url: s + "shop/editShelveRule", //编辑销售规则
        method: "post"
    },
    //------------供应商管理----------  
    "suppierList": {
        url: b + "supplier/suppierList", //保存会员基本配置
        method: "get"
    },
    "suppelierById": {
        url: b + "supplier/suppelierById", //供应商查看详情
        method: "post"
    },
    "addSupplier": {
        url: b + "supplier/addSupplier", //增加供应商
        method: "post"
    },
    "editSupplier": {
        url: b + "supplier/editSupplier", //编辑供应商
        method: "post"
    },
    "deleteSupplier": {
        url: b + "supplier/deleteSupplier", //删除供应商
        method: "post"
    },
    "inventoryGoodsList": {
        url: s + "Goods/getInvoicingGoods", //进销存获取商品列表
        method: "get"
    },
    "invent_getGoodsNum": {
        url: b + "invoicing/getGoodsNum", //获取商品数量
        method: "get"
    },
    "getDetails": {
        url: b + "Invoicing/getGoodsDetail", //进销存获取商品详情
        method: "post"
    },
    "getGoodsBatch": {
        url: b + "invoicing/getGoodsBatch", //进销存获取批次列表
        method: "get"
    },
    "getLossListNum": {
        url: b + "Goodsinventory/getLossListNum", //进销存获取商品详情
        method: "post"
    },
    "invent_editShelves": {
        url: b + "Goodsinventory/editRelation", //进销存商品详情修改货架
        method: "post"
    },
    "inventoryPutAway": {
        url: b + "Goodsinventory/putAway", //进销存商品详情修改货架
        method: "post"
    },
    "invent_deleteShelves": {
        url: b + "Goodsinventory/deleteRelation", //进销存商品详情删除货架
        method: "post"
    },
    "addInventory": {
        url: b + "Goodsinventory/addInventory", //进销存新建批次保存
        method: "post"
    },
    "inventoryLoss": {
        url: b + "goodsinventory/loss", //进销存耗损
        method: "post"
    },
    "printCode": {
        url: b + "Goodsinventory/printCode", //进销存打印条码
        method: "post"
    },
    "bomBillmaterialGetBomList": {
        url: b + "Billmaterial/getBomList", //bom单列表
        method: "post"
    },
    "bomBillmaterialAddBom": {
        url: b + "Billmaterial/addBom", //新建bom单
        method: "post"
    },
    "goodsGetListByCid": {
        url: s + "Goods/getListByCid", //新建bom单-根据分类获取商品列表
        method: "get"
    },
    "bomBillmaterialEditBom": {
        url: b + "Billmaterial/editBom", //修改bom单
        method: "post"
    },
    "BillmaterialGetBomDetail": {
        url: b + "Billmaterial/getBomDetail", //获取bom单详情
        method: 'get'
    },
    "BillmaterialDelBom": {
        url: b + "Billmaterial/delBom", //删除bom单
        method: 'post'
    },
    "getBomListByShopId": {
        url: b + "Billmaterial/getBomListByShopId", //新建或修改bom单-获取已经关联的商品
        method: "post"
    },
    //------------仓库管理----------  
    "warehouseWarehouseList": {
        url: b + "Warehouse/warehouseList", //仓库管理-仓库列表
        method: "post"
    },
    "warehouseGetWarehouse": {
        url: b + "warehouse/getWarehouse", //仓库管理-仓库详情
    },
    "whGetInventoryGoodsList": {
        url: b + "invoicing/getInventoryGoodsList", //仓库管理-仓库详情-根据仓库id获取商品列表
    },
    "whGetGoodsExactly": {
        url: b + "invoicing/getGoodsExactly", //仓库管理-仓库详情-筛选商品列表
    },
    "whGetInventoryMaterialList": {
        url: b + "Material/getInventoryMaterialList", //仓库管理-仓库详情-根据仓库id获取物料列表
    },
    //新建物料,新建单位,修改物料
    "MaterialGetCategoryList": {
        url: b + "Material/getCategoryList", //获取物料分类列表
        method: 'get'
    },
    "MaterialGetUnitList": {
        url: b + "Material/getUnitList", //获取物料单位列表
        method: 'post'
    },
    "InvoicingBrandList": {
        url: b + "Invoicing/brandList", //获取品牌
        method: 'get'
    },
    "MaterialAddUnit": {
        url: b + "Material/addUnit", //添加物料单位
        method: 'post'
    },
    "MaterialDeleteUnit": {
        url: b + "Material/deleteUnit", //删除物料单位
        method: 'post'
    },
    "MaterialEditUnit": {
        url: b + "Material/editUnit", //修改物料单位
        method: 'post'
    },
    "MaterialAddMaterial": {
        url: b + 'Material/addMaterial', //添加物料
        method: 'post'
    },
    "MaterialEditMaterial": {
        url: b + "Material/editMaterial", //编辑物料
        method: 'post'
    },
    "MaterialGetMaterialDetail": {
        url: b + "Material/getMaterialDetail", //获取物料详情
        method: 'get'
    },
    //物料分类模块
    "MaterialAddCategory": {
        url: b + "Material/addCategory",
        method: 'post'
    },
    "MaterialEditCategory": {
        url: b + "Material/editCategory",
        method: 'post'
    },
    "MaterialDelCategory": {
        url: b + "Material/delCategory",
        method: 'post'
    },
    //盘库
    "InvoicingGetMaterialBatch": {
        url: b + "Invoicing/getMaterialBatch", //获取物料批次
        method: 'get'
    },
    "GoodsinventorySetInventory": {
        url: b + "Goodsinventory/setInventory", //盘库数量
        method: 'post'
    },

    //---------------   仓库列表 -----------------
    "addQuickDispatch": {
        url: b + "Dispatchrecord/addQuickDispatch", //快速调度
        method: 'post'
    },
    "WarehouseAdd": {
        url: s + "Warehouse/add",
        method: 'post'
    },
    "warehouseGetGoodsList": {
        url: b + "invoicing/getGoodsList", //仓库详情-商品列表
    },
    "warehouseDeleteWarehouse": {
        url: b + "Warehouse/deleteWarehouse", //仓库详情-删除仓库
        method: 'post'
    },
    "editWarehouseArea": {
        url: b + "Warehouse/editWarehouseArea", //仓库详情-修改区域
        method: 'post'
    },
    "deleteWarehouseArea": {
        url: b + "Warehouse/deleteWarehouseArea", //仓库详情-删除区域
        method: 'post'
    },
    "addWarehouseArea": {
        url: b + "Warehouse/addWarehouseArea", //仓库详情-添加区域
        method: 'post'
    },
    "warehouseEditWarehouse": {
        url: b + "Warehouse/edit", //仓库详情-修改仓库
        method: 'post'
    },
    "warehouseAddWarehouse": {
        url: b + "Warehouse/add", //仓库详情-新建仓库
        method: 'post'
    },
    //操作列表
    "getDispatchRecordList": {
        url: b + "Dispatchrecord/getDispatchRecordList", //调度记录列表
        method: "post"
    },
    "getDispatchRecordDetailList": {
        url: b + "Dispatchrecord/getDispatchRecordDetailList", //调度记录列表详情
        method: "post"
    },
    "DispatchrecordCancelShipment": {
        url: b + "Dispatchrecord/cancelShipment", //取消调度
        method: "post"
    },
    "DispatchrecordConfirmShipment": {
        url: b + "Dispatchrecord/confirmShipment", //确认出货
        method: "post"
    },
    "DispatchrecordGetGoodsList": {
        url: b + "Dispatchrecord/getGoodsList", //入货-获取商品列表
        method: "get"
    },
    "DispatchrecordGetMaterialList": {
        url: b + "Dispatchrecord/getMaterialList", //入货-获取物料列表
        method: "get"
    },
    "DispatchrecordItemSubmit": {
        url: b + "Dispatchrecord/ItemSubmit", //入货-提交数据
        method: "post"
    },
    "invoicing_getOwners": {
        url: s + "Brandconfig/getWasehouseShop", //仓库所属列表
        method: "get"
    },
    "getMultiShopGoodsList": {
        url: s + "Goods/getGoodsByCondition", //获取所有商品
        method: "get"
    },
    "getOperationSearch": {
        url: b + "Warehouse/getOperationSearch", //获取仓库操作列表
        method: "post"
    },
    "getOperationDetail": {
        url: b + "Warehouse/getOperationDetail", //获取仓库操作列表详情
        method: "get"
    },
    "updateBatch": {
        url: b + "Goodsinventory/updateBatch", //修改批次
        method: "post"
    },
    // "getkuchunGoodsList": {
    //     url: b + "invoicing/getGoodsList", //获取库存的商品列表
    //     method: "get"
    // },
    "invoicing_loss": {
        url: b + "Invoicing/loss", //获取库存的商品列表
        method: "post"
    },
    //===================领料列表==============================
    "getLogList": {
        url: b + "Materialreceive/getLogList", //领料记录列表
        method: "get"
    },
    "getPickerList": {
        url: s + "Picker/getPickerList", //获取领料人列表
        method: "get"
    },
    "getDetailByOwner": {
        url: b + "Materialreceive/getDetailByOwner", //获取领料人详情
        method: "get"
    },
    "getCheckMaterialRecord": {
        url: b + "Materialcheck/getCheckMaterialRecord", //获取领料盘库详情
        method: "get"
    },
    "MaterialreceiveGetLogDetail": {
        url: b + "Materialreceive/getLogDetail", //获取领料记录详情
        method: "get"
    },
    "invoicingReceive": {
        url: b + "Materialreceive/receive", //领料操作保存
        method: "get"
    },
    "getMaterialDetail": {
        url: b + "Material/getMaterialDetail", //获取物料详情
        method: "get"
    },
    "getUnitByMid": {
        url: b + "Material/getUnitByMid", //获取进价单位
        method: "get"
    },
    "getLogDetail": {
        url: b + "Material/getLogDetail", //盘库详情
        method: "get"
    },
    "getMaterialBatch": {
        url: b + "Invoicing/getMaterialBatch", //获取物料批次列表
        method: "get"
    },
    "materialLoss": {
        url: b + "Material/loss", //物料耗损
        method: "post"
    },

    "invoicingCheckMaterial": {
        url: b + "Materialcheck/checkMaterial", //领料盘库确定
        method: "post"
    },
    "invoicingReceive": {
        url: b + "Materialreceive/receive", //领料操作确定
        method: "post"
    },
    "dispatchSearchApplications": {
        url: b + "dispatch/searchApplications", //申请单列表
        method: 'get'
    },
    "getApplicationTemplates": {
        url: b + 'dispatch/getApplicationTemplates', //获取模板列表
        method: 'post'
    },
    "deleteApplicationTemplate": {
        url: b + "dispatch/deleteApplicationTemplate", //删除进货模板
        method: 'post'
    },
    "invoic_getAuditList": {
        url: b + "dispatch/searchApplications", //获取审核申请列表
        method: "get"
    },
    "addApplicationTemplate": {
        url: b + "dispatch/addApplicationTemplate", //新建进货申请模板
        method: 'post'
    },
    "editApplicationTemplate": {
        url: b + "dispatch/editApplicationTemplate", //新建进货申请模板
        method: 'post'
    },
    "submitApplication": {
        url: b + "dispatch/submitApplication", //新建进货申请    
        method: 'post'
    },
    "invoic_getApplication": {
        url: b + "dispatch/getApplication", //获取申请详情
        method: "get"
    },
    "getApplicationTemplate": {
        url: b + "dispatch/getApplicationTemplate", //根据模板Id获取模板详情
        method: 'get'
    },
    "editApplication": {
        url: b + "dispatch/editApplication", //修改进货申请
        method: 'post'
    },
    "invoic_getApplyDispatchRecord": {
        url: b + "Dispatchrecord/getApplyDispatchRecord", //获取调度单列表
        method: "get"
    },
    "invoic_getApplicationDetail": {
        url: b + "dispatch/getApplicationDetail", //获取总单商品物料
        method: "get"
    },
    "invoic_deleteDispatchOrder": {
        url: b + "Dispatchrecord/deleteDispatchOrder", //删除调度单
        method: "get"
    },
    "invoic_getMatchItemList": {
        url: b + "Dispatchrecord/matchItemList", //获取出货单匹配的仓库商品/物料列表
        method: "post"
    },
    "invoic_matchItemListWithOutgoingNum": {
        url: b + "dispatchrecord/matchItemListWithOutgoingNum", //获取出货单匹配的仓库商品/物料列表
        method: "post"
    },
    "invoic_approveApplication": {
        url: b + "dispatch/approveApplication", //审核通过
        method: "post"
    },
    "invoic_disapproveApplication": {
        url: b + "dispatch/disapproveApplication", //审核不通过
        method: "post"
    },
    "invoic_getItemNum": {
        url: b + "Dispatchrecord/getItemNum", //获取出货数量（商品、物料）
        method: "post"
    },
    "invoic_addDispatchOrder": {
        url: b + "Dispatchrecord/addDispatchOrder", //新建调度单
        method: "post"
    },
    "invoic_reAudit": {
        url: b + "dispatch/reAudit", //重新审核
        method: "post"
    },
    "dispatchCancelApplication": {
        url: b + "dispatch/cancelApplication", //取消申请单
        method: 'post'
    },
    //单品统计模板
    "InvoicingstatGetTemplateConfig": {
        url: b + "Invoicingstat/getTemplateConfig", //获取配置数据
        method: 'post'
    },
    "InvoicingstatGetTemplates": {
        url: b + "Invoicingstat/getTemplates", //获取导出模板列表
        method: 'get'
    },
    "InvoicingstatAddTemplate": {
        url: b + "Invoicingstat/addTemplate", //新建模板
        method: 'post'
    },
    "InvoicingstatDeleteTemplate": {
        url: b + "Invoicingstat/deleteTemplate", //删除模板
        method: 'post'
    },
    "InvoicingstatEditTemplate": {
        url: b + "Invoicingstat/editTemplate", //编辑模板
        method: 'post'
    },
    "InvoicingstatGetTemplate": {
        url: b + "Invoicingstat/getTemplate", //获取单个模板
        method: 'get'
    },
    "InvoicingstatExportInventoryStat": {
        url: b + "Invoicingstat/exportInventoryStat",
        method: 'get'
    },
    "InvoicingstatGetExportInventoryStat": {
        url: b + "Invoicingstat/getExportInventoryStat", //获取导出文件名
        method: 'get'
    },
    "InvoicingetAssignLog": {
        url: b + "Inventoryassign/getAssignLog", //获取指派日志
        method: 'get'
    },
    "InvoicingetAssignInventoryConfigLog": {
        url: b + "Inventoryassign/getAssignInventoryConfigLog", //权限指派日志列表
        method: 'get'
    },
    "InvoicingetAssignLogDetail": {
        url: b + "Inventoryassign/getAssignLogDetail", //获取指派日志详情
        method: 'get'
    },
    "InvoicingetAssignDetail": {
        url: b + "Inventoryassign/getAssignDetail", //获取指派日志详情
        method: 'get'
    },
    "InvoicingetAssignInventoryConfigLogDetail": {
        url: b + "Inventoryassign/getAssignInventoryConfigLogDetail", //获取权限指派日志详情
        method: 'get'
    },
    "InvoicingetAssignErrorDetail": {
        url: b + "Inventoryassign/getAssignErrorDetail", //获取异常汇总
        method: 'get'
    },
    "InvoicingetPowerConfig": {
        url: b + "Inventoryassign/getPowerConfig", //获取权限指派基础配置
        method: 'get'
    },
    "InvoicingaddPowerTemplate": {
        url: b + "Inventoryassign/addPowerTemplate", //添加权限指派模板
        method: 'post'
    },
    "InvoicingeditPowerTemplate": {
        url: b + "Inventoryassign/editPowerTemplate", //修改权限指派模板
        method: 'post'
    },
    "InventoryassignGetAssignTemplates": {
        url: b + "Inventoryassign/getAssignTemplates", //品牌指派-指派模板列表
        method: 'get'
    },
    "InventoryassignGetPowerTemplates": {
        url: b + "Inventoryassign/getPowerTemplates", //品牌指派-权限指派模板列表
        method: 'get'
    },
    "addAssignTemplate": {
        url: b + "Inventoryassign/addAssignTemplate", //品牌指派-新建指派模板
        method: 'post'
    },
    "editAssignTemplate": {
        url: b + "Inventoryassign/editAssignTemplate", //品牌指派-修改指派模板
        method: 'post'
    },
    "MaterialGetUnitidsBycid": {
        url: b + "Material/getUnitidsBycid", //品牌指派-通过分类id获取单位关联单位
        method: 'get'
    },
    "InventordeleteTemplate": {
        url: b + "Inventoryassign/deleteTemplate", //删除模板
        method: 'get'
    },
    "InventorgetPowerTemplate": {
        url: b + "Inventoryassign/getTemplate", //获取单个模板模板
        method: 'get'
    },
    "InventorassignInventoryConfig": {
        url: b + "Inventoryassign/assignInventoryConfig", //权限指派
        method: 'post'
    },
    "MaterialGetBrandIdByCids": {
        url: b + "Material/getBrandIdByCids", //通过分类id获取品牌id
        method: 'get'
    },
    "InventoryassignAssignStart": {
        url: b + "Inventoryassign/assignStart", //开始指派
        method: 'post'
    },
    "GoodsinventoryGetGoodsInventoryList": {
        url: b + "Goodsinventory/getGoodsInventoryList", //获取批量盘库商品列表
        method: 'get'
    },
    "materialGetListByArea": {
        url: b + "material/getListByArea", //获取批量盘库物料列表
        method: 'get'
    },
    "addInventoryGoodsTemplate": {
        url: b + "Template/addInventoryGoodsTemplate", //新建商品盘库模板
        method: 'post'
    },
    "addInventoryMaterialTemplate": {
        url: b + "Template/addInventoryMaterialTemplate", //新建物料盘库模板
        method: 'post'
    },
    "editInventoryGoodsTemplate": {
        url: b + "Template/editInventoryGoodsTemplate", //修改商品盘库模板
        method: 'post'
    },
    "editInventoryMaterialTemplate": {
        url: b + "Template/editInventoryMaterialTemplate", //修改物料盘库模板
        method: 'post'
    },
    //商品盘库模板列表
    "getInventoryGoodsTemplates": {
        url: b + "Template/getInventoryGoodsTemplates", //获取商品盘库模板列表
        method: 'get'
    },
    "getInventoryMaterialTemplates": {
        url: b + "Template/getInventoryMaterialTemplates", //获取物料盘库模板列表
        method: 'get'
    },
    "TemplateDeleteTemplate": {
        url: b + "Template/deleteTemplate", //删除模板
        method: 'post'
    },
    "invoicingGetCheckInventoryLogList": {
        url: b + "invoicing/getCheckInventoryLogList", //获取批量盘库日志
        method: 'get'
    },
    "GoodsinventoryBatchSetGoodsInventory": {
        url: b + "Goodsinventory/batchSetGoodsInventory", //商品盘库
        method: 'post'
    },
    "invoicingGetCheckInventoryLogDetail": {
        url: b + "invoicing/getCheckInventoryLogDetail", //获取日志详情
        method: 'get'
    },
    "templateGetInventoryGoodsTemplate": {
        url: b + 'template/getInventoryGoodsTemplate', //获取商品模板内容
        method: 'get'
    },
    "GoodsInventoryGetGoodsInventoryListByGids": {
        url: b + "GoodsInventory/getGoodsInventoryListByGids", //根据商品Id和区域Id查询数据
        method: 'get'
    },
    "getListByMidsAndAreaId": {
        url: b + "material/getListByMidsAndAreaId", //根据物料Id和区域Id查询数据
        method: 'get'
    },
    "getInventoryMaterialTemplate": {
        url: b + "template/getInventoryMaterialTemplate", //获取物料模板内容
        method: 'get'
    },
    "GoodsinventoryBatchSetMaterialInventory": { //物料盘库
        url: b + "Goodsinventory/batchSetMaterialInventory",
        method: 'post'
    },
    //加工
    "templateGetListTemplates": {
        url: b + "template/getListTemplates", //获取加工模板列表
        method: "post"
    },
    "templateDeleteTemplate": {
        url: b + "template/deleteTemplate", //删除加工模板
        method: "post"
    },
    "ProcessbomGetProcessBomLogList": {
        url: b + "Processbom/getProcessBomLogList", //加工记录
        method: 'get'
    },

    "GoodsinventoryBatchSetMaterialInventory": { //物料盘库
        url: b + "Goodsinventory/batchSetMaterialInventory",
        method: 'post'
    },
    "ProcessbomGetProcessBomList": { //获取加工BOM单列表
        url: b + "Processbom/getProcessBomList",
        method: 'get'
    },
    "ProcessbomGetProcessBomDetail": { //获取加工BOM单详情
        url: b + "Processbom/getProcessBomDetail",
        method: 'get'
    },
    "ProcessbomDeleteProcessBom": { //删除BOM单
        url: b + "Processbom/deleteProcessBom",
        method: 'post'
    },
    "ProcessbomAddProcessBom": { //新建加工bom单
        url: b + "Processbom/addProcessBom",
        method: 'post'
    },
    "templateGetListTemplate": {
        url: b + "template/getListTemplate", //获取模板详情
        method: 'get'
    },
    "templateAddListTemplate": {
        url: b + "template/addListTemplate", //保存加工模板
        method: 'post'
    },
    "templateEditListTemplate": {
        url: b + "template/editListTemplate", //修改加工模板
        method: "post"
    },
    "ProcessbomCheckProcessBomExits": { //检测加工bom单是否存
        url: b + "ProcessBom/checkProcessBomExits",
        method: 'get'
    },
    "ProcessbomEditProcessBom": { //修改加工bom单
        url: b + "Processbom/editProcessBom",
        method: 'post'
    },
    "MaterialGetUnitByMid": { //获取单位关联
        url: b + "Material/getUnitByMid",
        method: 'get'
    },
    "MaterialEditMaterialUnit": { //修改物料单位关联
        url: b + "Material/editMaterialUnit",
        method: 'post'
    },
    "materialGetDistributionByMids": { //获取物料分销价
        url: b + "material/getDistributionByMids",
        method: 'get'
    },
    "ProcessbomCheckProcessBomExits": { //检测加工bom单是否存
        url: b + "ProcessBom/checkProcessBomExits",
        method: 'get'
    },
    "ProcessbomEditProcessBom": { //修改加工bom单
        url: b + "Processbom/editProcessBom",
        method: 'post'
    },

    "ProcessbomGetProcessBomDetailList": {
        url: b + "Processbom/getProcessBomDetailList", //获取多个加工bom单详情
        method: 'get'
    },
    "ProcessbomGetProcessList": {
        url: b + 'Processbom/getProcessList', //获取加工时加工bom单列表
        method: 'get'
    },
    "MaterIalMachiningMachiningBegin": {
        url: b + 'MaterIalMachining/MachiningBegin', //开始加工
        method: 'post'
    },
    "ProcessbomDeleteProcessBom": {
        url: b + 'Processbom/deleteProcessBom', //删除加工BOM单
        method: 'post'
    },
    "ProcessbomGetProcessBomLogDetail": {
        url: b + 'Processbom/getProcessBomLogDetail', //加工日志详情
        method: 'get'
    },
    "materialGetWidByMid": {
        url: b + 'material/getWidByMid', //通过物料id获取仓库id
        method: 'get'
    },
    "invgetMultiApplicationMatchList": {
        url: b + 'Dispatch/getMultiApplicationMatchList', //批量匹配商品和物料
        method: 'get'
    },
    "invgetAllocationType": {
        url: b + 'Dispatchrecord/getAllocationType', //获取配货方式
        method: 'get'
    },
    "invaddMultDispatchRecord": {
        url: b + 'Dispatchrecord/addMultDispatchRecord', //新建批量调度
        method: 'post'
    },
    /* 批量审核日志 */
    "dispatchGetDispatchAuditLogList": {
        method: 'get',
        url: b + "dispatch/getDispatchAuditLogList" //获取批量调度审核日志列表
    },
    "dispatchGetDispatchAuditLogDetailList": {
        method: 'get',
        url: b + "dispatch/getDispatchAuditLogDetailList" //获取批量审核日志详情
    },
    "dispatchGetDispatchLogDetailList": {
        method: 'get',
        // fake:true,
        url: b + "dispatch/getDispatchLogDetailList" //获取批量调度日志详情
    },
    "DispatchGetDispatchLogList": {
        method: 'get',
        url: b + "Dispatch/getDispatchLogList" //获取批量调度日志列表
    },
    "DispatchrecordGetAllocationType": {
        method: 'get',
        url: b + "Dispatchrecord/getAllocationType" //获取配置方式
    },
    "DispatchGetMultiApplicationMatchList": {
        url: b + "Dispatch/getMultiApplicationMatchList", //批量调度-批量匹配商品和物料
        method: 'get',
    },
    "dispatchApproveApplications": {
        url: b + "dispatch/approveApplications", //批量审核-审核通过
        method: 'post',
    },
}