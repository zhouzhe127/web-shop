import Login from 'src/module/login';
const test10 = (resolve) =>
    import ( /* webpackChunkName: "brand_audit" */ 'src/module/invoicing_system/wareimport/test');
const brandAudit = (resolve) =>
    import ( /* webpackChunkName: "brand_audit" */ 'src/module/brand/brand_audit');
const loginHead = (resolve) =>
    import ( /* webpackChunkName:"brand_head" */ 'src/module/brand/brand_head');
const brandBuild = (resolve) =>
    import ( /* webpackChunkName:"brand_build"*/ 'src/module/brand/brand_build');
const unbrandBuild = (resolve) =>
    import ( /* webpackChunkName:"unbrand_build" */ 'src/module/brand/unbrand_build');
const unbrandBuildUi = (resolve) =>
    import ( /* webpackChunkName:"unbrand_build" */ 'src/module/brand/unbrand_build_ui');
const aside = (resolve) =>
    import ( /* webpackChunkName:"aside" */ 'src/module/common/aside');
const detailsHeader = (resolve) =>
    import ( /* webpackChunkName:"details_header" */ 'src/module/common/details_header');
const mainCon = (resolve) =>
    import ( /* webpackChunkName:"main_con" */ 'src/module/common/main_con');
//首页概况
const homePage = (resolve) =>
    import ( /* webpackChunkName:"survey" */ 'src/module/home_page/survey');
//商品配置
const goodsManager = (resolve) =>
    import ( /* webpackChunkName:"details_con" */ 'src/module/goods_config/details_con');
const attrManager = (resolve) =>
    import ( /* webpackChunkName:"attr_manager" */ 'src/module/goods_config/attr_manager')
const packageManager = (resolve) =>
    import ( /* webpackChunkName:"package_manager" */ 'src/module/goods_config/package_manager')
const categoryManager = (resolve) =>
    import ( /* webpackChunkName:"category_manager" */ 'src/module/goods_config/category_manager')
const inventoryManager = (resolve) =>
    import ( /* webpackChunkName:"invcontrol" */ 'src/module/goods_config/invcontrol')
const marker = (resolve) =>
    import ( /* webpackChunkName:"marker" */ 'src/module/goods_config/marker')
const multiChannelMenu = (resolve) =>
    import ( /* webpackChunkName:"more_menu" */ 'src/module/goods_config/more_menu')


const warrant = (resolve) =>
    import ( /* webpackChunkName:"warrant" */ 'src/module/outfood/accredit/warrant'); //授权主页
const mtWarrant = (resolve) =>
    import ( /* webpackChunkName:"iframe_warrant" */ 'src/module/outfood/accredit/iframe_warrant'); //美团授权
const relmain = (resolve) =>
    import ( /* webpackChunkName:"warrant_relmain" */ 'src/module/outfood/accredit/warrant_relmain'); //授权    
const warranRelation = (resolve) =>
    import ( /* webpackChunkName:"warrant_relation" */ 'src/module/outfood/accredit/warrant_relation'); //饿了么，百度关联菜品
const warrantConfig = (resolve) =>
    import ( /* webpackChunkName:"warrant_config" */ 'src/module/outfood/accredit/warrant_config'); //美团店铺配置   
const goodsfig = (resolve) =>
    import ( /* webpackChunkName:"warrant_goodsfig" */ 'src/module/outfood/accredit/warrant_goodsfig'); //美团店铺配置 
const packConfig = (resolve) =>
    import ( /* webpackChunkName:"pack_config" */ 'src/module/outfood/accredit/pack_config'); //美团店铺配置  
const elebaidu = (resolve) =>
    import ( /* webpackChunkName:"elebaidu_relation" */ 'src/module/outfood/accredit/elebaidu_relation'); //       
const awayPrinter = (resolve) =>
    import ( /* webpackChunkName:"printer_takeaway" */ 'src/module/outfood/takeawayprint/printer_takeaway'); //外卖打印机配置
const Dada = (resolve) =>
    import ( /* webpackChunkName:"binding_merchants" */ 'src/module/outfood/binding_merchants'); //绑定达达
const DadaConfig = (resolve) =>
    import ( /* webpackChunkName:"dada_distribution" */ 'src/module/outfood/dada/dada_distribution'); //达达配送


const integralWithdrawal = (resolve) =>
    import ( /* webpackChunkName:"integral_withdrawal" */ 'src/module/marketing_tools/integral_withdrawal'); //积分抵现配置
//进销存
const inventoryManagement = (resolve) =>
    import ( /* webpackChunkName:"inventory_management" */ 'src/module/invoicing_system/invoicing/inventory_management'); //进销存
const inventDetail = (resolve) =>
    import ( /* webpackChunkName:"invent_detail" */ 'src/module/invoicing_system/invoicing/invent_detail'); //进销存详情
//加工Bom单
const processbomList = (resolve) =>
    import ( /* webpackChunkName:"processbomList" */ 'src/module/invoicing_system/process_bom/bom_list'); //Bom单列表   
const bomlistDetail = (resolve) =>
    import ( /* webpackChunkName:"bomlist_detail" */ 'src/module/invoicing_system/process_bom/bomlist_detail'); //Bom单列表详情     
const processBomCreate = (resolve) =>
    import ( /* webpackChunkName:"process_bom_create" */ 'src/module/invoicing_system/process_bom/process_bom_create'); //加工bom单-新建
const processMatDetail = (resolve) =>
    import ( /* webpackChunkName:"process_material_detail" */ 'src/module/invoicing_system/process/process_material_detail'); //加工物料-详情

//加工物料
const processMaterialPrint = (resolve) =>
    import ( /*webpackChunkName:'process_material_print'*/ 'src/module/invoicing_system/process/process_material_print'); //打印加工物料
const processMaterial = (resolve) =>
    import ( /*webpackChunkName:'process_material'*/ 'src/module/invoicing_system/process/process_material'); //加工物料


//批量调度加工日志
const batchLogDispatch = (resolve) =>
    import ( /*webpackChunkName:'batch_log_dispatch'*/ 'src/module/invoicing_system/batch_log/batch_log_dispatch'); //批量调度,审核日志
const batchLogDispatchDetail = (resolve) =>
    import ( /*webpackChunkName:'batch_log_dispatch_detail'*/ 'src/module/invoicing_system/batch_log/batch_log_dispatch_detail'); //批量调度日志详情
const batchLogDetail = (resolve) =>
    import ( /*webpackChunkName:'batch_log_detail'*/ 'src/module/invoicing_system/batch_log/batch_log_detail'); //批量调度,审核日志详情
const batchLogPrint = (resolve) =>
    import ( /*webpackChunkName:'batch_log_print'*/ 'src/module/invoicing_system/batch_log/batch_log_print'); //批量调度,审核日志详情打印

const suppliesDetail = (resolve) =>
    import ( /* webpackChunkName:"supplies_detail" */ 'src/module/invoicing_system/invoicing/supplies_detail'); //进销存详情物料详情   
const putstroage = (resolve) =>
    import ( /* webpackChunkName:"invent_putstroage" */ 'src/module/invoicing_system/invoicing/invent_putstroage'); //进销存入库    
const loseManage = (resolve) =>
    import ( /* webpackChunkName:"lose_manage" */ 'src/module/invoicing_system/invoicing/lose_manage'); //进销存耗损 
const setNewjurisdiction = (resolve) =>
    import ( /* webpackChunkName:"set_newjurisdiction" */ 'src/module/invoicing_system/brand_assign/set_newjurisdiction'); //新建权限指派  
const jurisdictionRecord = (resolve) =>
    import ( /* webpackChunkName:"jurisdiction_record" */ 'src/module/invoicing_system/brand_assign/jurisdiction_record'); //指派日志
const jurisdictionDetail = (resolve) =>
    import ( /* webpackChunkName:"jurisdiction_detail" */ 'src/module/invoicing_system/brand_assign/jurisdiction_detail'); //查看同步详情             
const materialsPutinStorage = (resolve) =>
    import ( /* webpackChunkName:"materials_putin_storage" */ 'src/module/invoicing_system/invoicing/materials_putin_storage'); //物料入库 
const materialModifyBatch = (resolve) =>
    import ( /* webpackChunkName:"material_modify_batch" */ 'src/module/invoicing_system/invoicing/material_modify_batch'); //物料批次修改
const publicDetails = (resolve) =>
    import ( /* webpackChunkName:"public_details" */ 'src/module/invoicing_system/invoicing/public_details'); //公用详情页面     
const materialLoss = (resolve) =>
    import ( /* webpackChunkName:"material_loss" */ 'src/module/invoicing_system/invoicing/material_loss'); //物料耗损 
const revampUnit = (resolve) =>
    import ( /* webpackChunkName:"revamp_unit" */ 'src/module/invoicing_system/invoicing/revamp_unit'); //修改单位       
const supplierManagement = (resolve) =>
    import ( /* webpackChunkName:"supply_manage" */ 'src/module/invoicing_system/supply/supply_manage'); //供应商管理
const wearCause = (resolve) =>
    import ( /* webpackChunkName:"wear_cause" */ 'src/module/invoicing_system/config_manage/wear_cause'); //耗损原因配置
const offReason = (resolve) =>
    import ( /* webpackChunkName:"off_cause" */ 'src/module/invoicing_system/config_manage/off_cause'); //下架原因配置
const brandList = (resolve) =>
    import ( /* webpackChunkName:"brand_list" */ 'src/module/invoicing_system/config_manage/brand_list'); //商品品牌管理
const weighGoodsList = (resolve) =>
    import ( /* webpackChunkName:"weigh_list" */ 'src/module/invoicing_system/config_manage/weigh_list'); //称重商品配置
const shelfList = (resolve) =>
    import ( /* webpackChunkName:"shelf_list" */ 'src/module/invoicing_system/config_manage/shelf_list'); //货架管理
const shelveRule = (resolve) =>
    import ( /* webpackChunkName:"shelve_rule" */ 'src/module/invoicing_system/config_manage/shelve_rule'); //销售规则
const bomList = (resolve) =>
    import ( /* webpackChunkName:"bom_list" */ 'src/module/invoicing_system/invoicing/bom_list'); //bom单列表
const bomDetail = (resolve) =>
    import ( /* webpackChunkName:"bom_detail" */ 'src/module/invoicing_system/invoicing/bom_detail'); //bom单详情
const bomCreate = (resolve) =>
    import ( /* webpackChunkName:"bom_create" */ 'src/module/invoicing_system/invoicing/bom_create'); //新建bom单
const bomChange = (resolve) =>
    import ( /* webpackChunkName:"bom_change" */ 'src/module/invoicing_system/invoicing/bom_change'); //修改bom单
const checkMaterial = (resolve) =>
    import ( /* webpackChunkName:"check_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/check_material'); //批量盘库-物料盘库-提交
const editGoodsCountTemplate = (resolve) =>
    import ( /* webpackChunkName:"check_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_goods'); //批量盘库-编辑商品模板
const editMaterialCountTemplate = (resolve) =>
    import ( /* webpackChunkName:"check_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_material'); //批量盘库-编辑物料模板
const wareImport = (resolve) =>
    import ( /* webpackChunkName:"ware_import" */ 'src/module/invoicing_system/wareimport/ware_import'); //入库导入
const wareProsperity = (resolve) =>
    import ( /* webpackChunkName:"ware_prosperity" */ 'src/module/invoicing_system/wareimport/ware_prosperity'); //入库导入成功
const conclusionList = (resolve) =>
    import ( /* webpackChunkName:"conclusion_list" */ 'src/module/invoicing_system/conclusion/conclusion_list'); //审核列表
const shipmentVerify = (resolve) =>
    import ( /* webpackChunkName:"shipment_verify" */ 'src/module/invoicing_system/conclusion/shipment_verify'); //审核详情   
const newSchedule = (resolve) =>
    import ( /* webpackChunkName:"new_schedule" */ 'src/module/invoicing_system/conclusion/new_schedule'); //新建调度
const multipleExamine = (resolve) =>
    import ( /* webpackChunkName:"multiple_examine" */ 'src/module/invoicing_system/conclusion/multiple_examine'); //批量审核
const select_dispatch = (resolve) =>
    import ( /* webpackChunkName:"select_dispatch" */ 'src/module/invoicing_system/warehouse_manage/select_dispatch'); //批量调度-选择调度单
const brandAssign = (resolve) =>
    import ( /* webpackChunkName:"brand_assign_list" */ 'src/module/invoicing_system/brand_assign/brand_assign_list'); //品牌指派
const createAssign = (resolve) =>
    import ( /* webpackChunkName:"create_assign" */ 'src/module/invoicing_system/brand_assign/create_assign'); //品牌指派
const batchSchedule = (resolve) =>
    import ( /* webpackChunkName:"batch_schedule" */ 'src/module/invoicing_system/conclusion/batch_schedule'); //批量调度    
//仓库管理
const warehouseList = (resolve) =>
    import ( /* webpackChunkName:"warehouse_list" */ 'src/module/invoicing_system/warehouse_manage/warehouse_list'); //仓库列表
const operation = (resolve) =>
    import ( /* webpackChunkName:"operation" */ 'src/module/invoicing_system/warehouse_manage/operation'); //调度记录
const operationDetail = (resolve) =>
    import ( /* webpackChunkName:"operation_detail" */ 'src/module/invoicing_system/warehouse_manage/operation_detail'); //调度记录详情
const enterGoods = (resolve) =>
    import ( /* webpackChunkName:"enter_goods" */ 'src/module/invoicing_system/warehouse_manage/enter_goods'); //入货
const warehouseOperationDetail = (resolve) =>
    import ( /* webpackChunkName:"warehouse_operation_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_operation_detail'); //仓库操作详情
const warehouseDetail = (resolve) =>
    import ( /* webpackChunkName:"warehouse_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_detail'); //仓库详情
const changeArea = (resolve) =>
    import ( /* webpackChunkName:"change_area" */ 'src/module/invoicing_system/warehouse_manage/change_area'); //修改区域
const warehouseChange = (resolve) =>
    import ( /* webpackChunkName:"warehouse_change" */ 'src/module/invoicing_system/warehouse_manage/warehouse_change'); //修改仓库
const warehouseGoodsDetail = (resolve) =>
    import ( /* webpackChunkName:"warehouse_goods_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_goods_detail'); //仓库列表-商品详情
const warehouseMaterialDetail = (resolve) =>
    import ( /* webpackChunkName:"warehouse_material_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_material_detail'); //仓库列表-物料详情
const warehouseCreate = (resolve) =>
    import ( /* webpackChunkName:"warehouse_create" */ 'src/module/invoicing_system/warehouse_manage/warehouse_create'); //新建仓库
const outputStore = (resolve) =>
    import ( /* webpackChunkName:"output_store" */ 'src/module/invoicing_system/warehouse_manage/output_store'); //出库
const outputShipper = (resolve) =>
    import ( /* webpackChunkName:"output_shipper" */ 'src/module/invoicing_system/warehouse_manage/output_shipper'); //出库详细信息-出货单
const outputSelGoods = (resolve) =>
    import ( /* webpackChunkName:"output_select_goods" */ 'src/module/invoicing_system/warehouse_manage/output_select_goods');
const searchGoods = (resolve) =>
    import ( /* webpackChunkName:"search_goods" */ 'src/module/invoicing_system/warehouse_manage/search_goods');
const pickingList = (resolve) =>
    import ( /* webpackChunkName:"picking_record" */ 'src/module/invoicing_system/picking_list/picking_record'); //领料列表
const picking = (resolve) =>
    import ( /* webpackChunkName:"picking" */ 'src/module/invoicing_system/picking_list/picking'); //领料
const checkDetails = (resolve) =>
    import ( /* webpackChunkName:"picker_details" */ 'src/module/invoicing_system/picking_list/picker_details'); //查看领料详情
const plateDetails = (resolve) =>
    import ( /* webpackChunkName:"plate_details" */ 'src/module/invoicing_system/picking_list/plate_details'); //查看领料盘库详情
const materialCreate = (resolve) =>
    import ( /* webpackChunkName:"material_create" */ 'src/module/invoicing_system/warehouse_manage/material_create'); //新建物料

const plateStorage = (resolve) =>
    import ( /* webpackChunkName:"plate_storage" */ 'src/module/invoicing_system/picking_list/plate_storage'); //新建物料
const schedulingApplicationList = (resolve) =>
    import ( /* webpackChunkName:"scheduling_application_list" */ 'src/module/invoicing_system/warehouse_manage/scheduling_application_list'); //新建调度    
const purchaseRequisition = (resolve) =>
    import ( /* webpackChunkName:"purchase_requisition" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition'); //新建调度    
const purchaseRequisitionDetail = (resolve) =>
    import ( /* webpackChunkName:"purchase_requisition_detail" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition_detail'); //调度申请详情  

const goodsCountTemplate = (resolve) =>
    import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template'); //商品盘库模板列表
const goodsCountHistory = (resolve) =>
    import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history'); //商品盘库记录
const goodsCountDetail = (resolve) =>
    import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail'); //商品,物料盘库记录详情
const goodsCount = (resolve) =>
    import ( /* webpackChunkName:"goods_count" */ 'src/module/invoicing_system/invoicing/goods_count'); //商品盘库  




//配置管理
const materialUnitCreate = (resolve) =>
    import ( /* webpackChunkName:"unit_create" */ 'src/module/invoicing_system/warehouse_manage/unit_create'); //新建物料
const materialEdit = (resolve) =>
    import ( /* webpackChunkName:"material_edit" */ 'src/module/invoicing_system/warehouse_manage/material_edit'); //修改物料

const materialCategory = (resolve) =>
    import ( /* webpackChunkName:"material_category_create" */ 'src/module/invoicing_system/warehouse_manage/material_category_create'); //修改物料

const warehouseCount = (resolve) =>
    import ( /* webpackChunkName:"warehouse_count" */ 'src/module/invoicing_system/warehouse_manage/warehouse_count'); //盘库

const supplierConfigure = (resolve) =>
    import ( /* webpackChunkName:"supplier_configure" */ 'src/module/invoicing_system/warehouse_manage/supplier_configure'); //进销存配置
//品牌配置
const staffConfig = (resolve) =>
    import ( /* webpackChunkName:"staff_config" */ 'src/module/brand_configuration/staff_config'); //员工配置
const positionConfig = (resolve) =>
    import ( /* webpackChunkName:"position_config" */ 'src/module/brand_configuration/position_config'); //职位配置
const baseBrand = (resolve) =>
    import ( /* webpackChunkName:"base_brand" */ 'src/module/brand_configuration/base_brand'); //品牌-基本配置
const payBrand = (resolve) =>
    import ( /* webpackChunkName:"pay_brand" */ 'src/module/brand_configuration/pay_brand'); //品牌-支付配置
const shopGroup = (resolve) =>
    import ( /* webpackChunkName:"shop_group" */ 'src/module/brand_configuration/shop_group'); //区域门店
//店铺管理
// const offManage = (resolve) =>
//     import ( /* webpackChunkName:"off_manage" */ 'src/module/invoicing_system/invoicing/off_manage') // 下架管理
const kitchenModel = (resolve) =>
    import ( /* webpackChunkName:"kitchen_model" */ 'src/module/shop_config/kitchen_model'); //后厨配置
const employeeManage = (resolve) =>
    import ( /* webpackChunkName:"employee_manage" */ 'src/module/shop_config/employee_manage'); //员工管理
const printer_errors = (resolve) =>
    import ( /* webpackChunkName:"printer_errors" */ 'src/module/shop_config/printer_errors'); //打印错误队列
const print_queue = (resolve) =>
    import ( /* webpackChunkName:"print_queue" */ 'src/module/shop_config/print_queue'); //打印队列
const printer_manager = (resolve) =>
    import ( /* webpackChunkName:"printer_manager" */ 'src/module/shop_config/printer_manager'); //打印管理
const printer_config = (resolve) =>
    import ( /* webpackChunkName:"printer_config" */ 'src/module/shop_config/printer_config'); //打印管理
const areaManage = (resolve) =>
    import ( /* webpackChunkName:"area_manage" */ 'src/module/shop_config/area_manage'); //区域管理
const jobManage = (resolve) =>
    import ( /* webpackChunkName:"job_manage" */ 'src/module/shop_config/job_manage'); //职位管理
const tableManage = (resolve) =>
    import ( /* webpackChunkName:"table_manage" */ 'src/module/shop_config/table_manage'); //桌台管理
const serviceFee = (resolve) =>
    import ( /* webpackChunkName:"service_fee" */ 'src/module/shop_config/service_fee'); //服务费管理
const fastSelling = (resolve) =>
    import ( /* webpackChunkName:"fast_selling" */ 'src/module/shop_config/fast_selling'); //快销模式管理
const refundFood = (resolve) =>
    import ( /* webpackChunkName:"refund_food" */ 'src/module/shop_config/refund_food'); //退菜原因
const reverseReason = (resolve) =>
    import ( /* webpackChunkName:"reverse_reason" */ 'src/module/shop_config/reverse_reason'); //反结账原因
const timeSet = (resolve) =>
    import ( /* webpackChunkName:"time_set" */ 'src/module/shop_config/time_set'); //市别设置
const integerSet = (resolve) =>
    import ( /* webpackChunkName:"integer_set" */ 'src/module/shop_config/integer_set'); //取整设置
const shopNumber = (resolve) =>
    import ( /* webpackChunkName:"shop_number" */ 'src/module/shop_config/shop_number'); //商家编号
const shufflingPic = (resolve) =>
    import ( /* webpackChunkName:"shuffling_pic" */ 'src/module/shop_config/shuffling_pic'); //轮播图配置
const openTime = (resolve) =>
    import ( /* webpackChunkName:"base" */ 'src/module/shop_config/base'); //店铺基本信息
const Payment = (resolve) =>
    import ( /* webpackChunkName:"payment_way" */ 'src/module/shop_config/payment_way'); //支付方式
const elemenuManage = (resolve) =>
    import ( /* webpackChunkName:"elemenu_manage" */ 'src/module/shop_config/elemenu_manage'); //电子菜单管理
const goodSale = (resolve) =>
    import ( /* webpackChunkName:"good_sale" */ 'src/module/shop_config/good_sale'); //商品起售配置
const hangUpAccount = (resolve) =>
    import ( /* webpackChunkName:"receivable_man" */ 'src/module/shop_config/receivable_man'); //商品起售配置
const shopNotice = (resolve) =>
    import ( /* webpackChunkName:"shop_notice" */ 'src/module/shop_config/shop_notice'); //商品起售配置
//公众号配置
const boundPublicNumber = (resolve) =>
    import ( /* webpackChunkName:"bound_public_number" */ 'src/module/public_number_configuration/bound_public_number'); //绑定公众号
const smallProgramBinding = (resolve) =>
    import ( /* webpackChunkName:"small_program_binding" */ 'src/module/public_number_configuration/small_program_binding'); //小程序绑定
const moduleSet = (resolve) =>
    import ( /* webpackChunkName:"module_set" */ 'src/module/public_number_configuration/module_set'); //模板设置
const menuSet = (resolve) =>
    import ( /* webpackChunkName:"menu_set" */ 'src/module/public_number_configuration/menu_set'); //菜单设置
const pushLanguageSettings = () =>
    import ( /* webpackChunkName:"push_language_settings" */ 'src/module/public_number_configuration/new_push_language_settings'); //推送语设置
const configCourse = () =>
    import ( /* webpackChunkName:"configuration_tutorial" */ 'src/module/public_number_configuration/configuration_tutorial'); //配置教程    
//收银报表
const cashierAnslysis = (resolve) =>
    import ( /* webpackChunkName:"cashier_anslysis" */ 'src/module/cashier/cashier_anslysis'); //收银分析
const cashierCategory = (resolve) =>
    import ( /* webpackChunkName:"cashier_category" */ 'src/module/cashier/cashier_category'); //分类报表
const cashierConfig = (resolve) =>
    import ( /* webpackChunkName:"cashier_config" */ 'src/module/cashier/cashier_config'); //报表配置

//统计管理
const orderStatistics = (resolve) =>
    import ( /* webpackChunkName:"order_brand" */ 'src/module/statistics/order_brand'); //订单统计堂吃品牌
const takeawayBrand = (resolve) =>
    import ( /* webpackChunkName:"takeaway_brand" */ 'src/module/statistics/takeaway_brand'); //订单统计外卖品牌
const orderProprietaryBrand = (resolve) =>
    import ( /* webpackChunkName:"order_proprietary" */ 'src/module/statistics/order_proprietary'); //自营外卖统计
const orderOne = (resolve) =>
    import ( /* webpackChunkName:"order" */ 'src/module/statistics/order'); //订单统计单天
const orderMore = (resolve) =>
    import ( /* webpackChunkName:"order_more" */ 'src/module/statistics/order_more'); //订单统计多天
const orderDetail = (resolve) =>
    import ( /* webpackChunkName:"order_detail" */ 'src/module/statistics/order_detail'); //订单统计详情
const orderTakeaway = (resolve) =>
    import ( /* webpackChunkName:"order_takeaway" */ 'src/module/statistics/order_takeaway'); //订单统计外卖
const orderProprietary = (resolve) =>
    import ( /* webpackChunkName:"order_constructions" */ 'src/module/statistics/order_constructions'); //自营订单统计   
const takeawayOne = (resolve) =>
    import ( /* webpackChunkName:"takeaway_one" */ 'src/module/statistics/takeaway_one'); //订单统计外卖单天
const takeawayMore = (resolve) =>
    import ( /* webpackChunkName:"takeaway_more" */ 'src/module/statistics/takeaway_more'); //订单统计外卖多天
const takeawayDetail = (resolve) =>
    import ( /* webpackChunkName:"takeaway_detail" */ 'src/module/statistics/takeaway_detail'); //订单统计外卖详情
const businessStatistics = (resolve) =>
    import ( /* webpackChunkName:"business" */ 'src/module/statistics/business'); //营业统计
const categoryStatistics = (resolve) =>
    import ( /* webpackChunkName:"category" */ 'src/module/statistics/category'); //分类统计
const singleStatistics = (resolve) =>
    import ( /* webpackChunkName:"single_goods" */ 'src/module/statistics/single_goods'); //单品统计
const delOrder = (resolve) =>
    import ( /* webpackChunkName:"delete" */ 'src/module/statistics/delete'); //废单统计
const brandOrderBill = resolve =>
    import ( /* webpackChunkName:"brand_order_bill" */ 'src/module/statistics/brand_order_bill'); //品牌挂账统计
const balanceAdjustRecord = resolve =>
    import ( /* webpackChunkName:"balance_record" */ 'src/module/statistics/balance_record'); //余额调整记录


const returnGoods = (resolve) =>
    import ( /* webpackChunkName:"return_goods" */ 'src/module/statistics/return_goods'); //退品统计
const freeGoods = (resolve) =>
    import ( /* webpackChunkName:"free" */ 'src/module/statistics/free'); //赠品统计
const OrderBillList = () =>
    import ( /* webpackChunkName:"order_bill_list" */ 'src/module/statistics/order_bill_list'); //挂账统计
const Handover = () =>
    import ( /* webpackChunkName:"handover" */ 'src/module/statistics/handover'); //交接班
const MemberRecharge = () =>
    import ( /* webpackChunkName:"member_recharge" */ 'src/module/statistics/member_recharge/member_recharges'); //会员充值统计
const reservationManager = (resolve) =>
    import ( /* webpackChunkName:"reservation" */ 'src/module/statistics/reservation'); //预定统计
const entityCardStatistics = (resolve) =>
    import ( /* webpackChunkName:"entity_card" */ 'src/module/statistics/entity_card'); //实体卡统计
const activityStatistics = (resolve) =>
    import ( /* webpackChunkName:"statistics_activity" */ 'src/module/statistics/activity'); //活动统计
const activityDetail = (resolve) =>
    import ( /* webpackChunkName:"activity_detail" */ 'src/module/statistics/activity_detail'); //活动统计-详情
const changePriceRecord = () =>
    import ( /* webpackChunkName:"change_price_record" */ 'src/module/statistics/change_price_record'); //改价统计
const Couponstatistics = () =>
    import ( /* webpackChunkName:"coupon_statistics" */ 'src/module/statistics/coupon_statistics'); //会员基本配置    
const customStatistics = () =>
    import ( /* webpackChunkName:"custom_statistics" */ 'src/module/statistics/custom_statistics'); //自定义商品统计
const citicStatements = () =>
    import ( /* webpackChunkName:"citic_statements" */ 'src/module/statistics/citic_statements'); //中信银行对账单
const zxsh = () =>
    import ( /* webpackChunkName:"citic_statements_sh" */ 'src/module/statistics/citic_statements_sh'); //中信银行对账单(上海)
const categoryCount = (resolve) =>
    import ( /* webpackChunkName:"category_count" */ 'src/module/statistics/category_count') //零售店分类统计
const Commentstatics = (resolve) =>
    import ( /* webpackChunkName:"user_evaluation" */ 'src/module/statistics/user_evaluation') //用户评价系统
const Scanpaystatics = (resolve) =>
    import ( /* webpackChunkName:"scancode_statistics" */ 'src/module/statistics/scancode_statistics') //扫码支付统计   
const reverseStatics = (resolve) =>
    import ( /* webpackChunkName:"reverse_statics" */ 'src/module/statistics/reverse_statics') //反结账统计   
const singleStockstatics = (resolve) =>
    import ( /* webpackChunkName:"single_stockstatics" */ 'src/module/statistics/single_stockstatics') //单品库存统计 

const exportTemplate = (resolve) =>
    import ( /* webpackChunkName:"export_template" */ 'src/module/statistics/export_template') //单品库存统计导出模板



//营销工具
const mallPro = (resolve) =>
    import ( /* webpackChunkName:"mall_pro" */ 'src/module/marketing_tools/mall_pro'); // 素材推广
const cooperation = (resolve) =>
    import ( /* webpackChunkName:"cooperating_partner" */ 'src/module/marketing_tools/cooperating_partner'); // 合作伙伴
const appointment = (resolve) =>
    import ( /* webpackChunkName:"configuration_reserve" */ 'src/module/marketing_tools/configuration_reserve');

const statisticsManagement = (resolve) =>
    import ( /* webpackChunkName:"statistics_management" */ 'src/module/marketing_tools/statistics_management'); //来源统计 
const addCoupon = (resolve) =>
    import ( /* webpackChunkName:"add_coupon" */ 'src/module/marketing_tools/new_coupons/add_newcoupon'); // 添加优惠券
const breakCoupon = (resolve) =>
    import ( /* webpackChunkName:"breaks_coupon" */ 'src/module/marketing_tools/new_coupons/breaks_coupon'); // 减免优惠券
const discountCoupon = (resolve) =>
    import ( /* webpackChunkName:"discount_coupon" */ 'src/module/marketing_tools/new_coupons/discount_coupon'); // 折扣优惠券
const giveCoupon = (resolve) =>
    import ( /* webpackChunkName:"give_coupon" */ 'src/module/marketing_tools/new_coupons/give_coupon'); // 赠菜优惠券
const vouchersCoupon = (resolve) =>
    import ( /* webpackChunkName:"vouchers_coupon" */ 'src/module/marketing_tools/new_coupons/vouchers_coupon'); // 代金优惠券
const intergralcardCoupon = (resolve) =>
    import ( /* webpackChunkName:"integralcard_coupon" */ 'src/module/marketing_tools/new_coupons/integralcard_coupon'); // 积分卡优惠券
const integralMall = (resolve) =>
    import ( /* webpackChunkName:"integral_mall" */ 'src/module/marketing_tools/integral/integral_mall'); //积分商城
const onlineOrderConfig = (resolve) =>
    import ( /* webpackChunkName:"online_configuration" */ 'src/module/marketing_tools/online_configuration'); //在线点单配置    
const memberStore = () =>
    import ( /* webpackChunkName:"member_store" */ 'src/module/marketing_tools/member_store'); //会员储值
const memberStoreSolution = () =>
    import ( /* webpackChunkName:"member_store_solution" */ 'src/module/marketing_tools/member_store_solution'); //会员储值方案
const activity = () =>
    import ( /* webpackChunkName:"activity_index" */ 'src/module/marketing_tools/new_activity/activity_index'); //活动首页
const generalActivity = () =>
    import ( /* webpackChunkName:"activity" */ 'src/module/marketing_tools/new_activity/activity'); //普通活动列表
const couponActivity = () =>
    import ( /* webpackChunkName:"coupon_redemption" */ 'src/module/marketing_tools/new_activity/coupon_redemption'); //领券活动列表        
const activityBirth = () =>
    import ( /* webpackChunkName:"activity_birth" */ 'src/module/marketing_tools/new_activity/activity_birth'); //生日
const activityCustom = () =>
    import ( /* webpackChunkName:"activity_custom" */ 'src/module/marketing_tools/new_activity/activity_custom'); //自定义
const activityAgift = () =>
    import ( /* webpackChunkName:"activity_agift" */ 'src/module/marketing_tools/new_activity/activity_agift'); //新会员开卡里
const activityEncourage = () =>
    import ( /* webpackChunkName:"activity_encourage" */ 'src/module/marketing_tools/new_activity/activity_encourage'); //消费额激励
const activityFission = () =>
    import ( /* webpackChunkName:"activity_fission" */ 'src/module/marketing_tools/new_activity/activity_fission'); //裂变活动
const activityMember = () =>
    import ( /* webpackChunkName:"activity_member" */ 'src/module/marketing_tools/new_activity/activity_member'); //会员日
const activityFullreduce = () =>
    import ( /* webpackChunkName:"activity_fullReduction" */ 'src/module/marketing_tools/new_activity/activity_fullReduction'); //满减活动  
const activityCoupon = () =>
    import ( /* webpackChunkName:"activity_coupon" */ 'src/module/marketing_tools/new_activity/activity_coupon'); //领券活动   
const selfHelpMode = () =>
    import ( /* webpackChunkName:"self_help_mode" */ 'src/module/marketing_tools/self_help_mode'); //自助模式
const weixinOnfiguration = () =>
    import ( /* webpackChunkName:"weixin_onfiguration" */ 'src/module/marketing_tools/weixin_onfiguration'); //微信首页配置
const CommentConfig = () =>
    import ( /* webpackChunkName:"payment_configuration" */ 'src/module/marketing_tools/payment_configuration'); //支付评价配置 
const Scanpayconfig = () =>
    import ( /* webpackChunkName:"sweepcode_pay" */ 'src/module/marketing_tools/sweepcode_pay'); //扫码支付    

const adminConfig = () =>
    import ( /* webpackChunkName:"admin_config" */ 'src/module/marketing_tools/admin_config'); //会员储值方案
const couponManagement = () =>
    import ( /* webpackChunkName:"coupon_management" */ 'src/module/marketing_tools/coupon_management') // 优惠券管理
const MemberValueConfig = () =>
    import ( /* webpackChunkName:"member_store_configuration" */ 'src/module/marketing_tools/member_store_config') // 会员储值配置
const orderTemplateSwitch = () =>
    import ( /* webpackChunkName:"template_switching" */ 'src/module/marketing_tools/template_switching') // 模版点击切换    

//会员系统
const NoBrand = () =>
    import ( /* webpackChunkName:"membership_configuration" */ 'src/module/member_system/membership_configuration'); //会员基本配置
const memberManagement = () =>
    import ( /* webpackChunkName:"member_management" */ 'src/module/member_system/new_member_management'); //会员管理
const activateEntityCard = () =>
    import ( /* webpackChunkName:"card_activation" */ 'src/module/member_system/card_activation'); //实体卡激活
const memberManDetail = () =>
    import ( /* webpackChunkName:"member_manage_detail" */ 'src/module/member_system/member_manage_detail'); //会员管理详情
const memberSend = () =>
    import ( /* webpackChunkName:"member_push_message" */ 'src/module/member_system/member_push_message') //  会员推送消息
const integralRule = () =>
    import ( /* webpackChunkName:"intergral" */ 'src/module/member_system/intergral'); // 会员配置
const memberLabel = () =>
    import ( /* webpackChunkName:"member_label" */ 'src/module/member_system/member_label') // 会员标签
const memberLevelManagement = () =>
    import ( /* webpackChunkName:"member_grade" */ 'src/module/member_system/member_grade') // 会员等级配置
const makeCard = () =>
    import ( /* webpackChunkName:"make_card" */ 'src/module/member_system/make_card') // 实体卡配置-制卡
const cardTypeApp = () =>
    import ( /* webpackChunkName:"getapplied_entitycardlist" */ 'src/module/member_system/getapplied_entitycardlist') //实体卡应用   
const transactionEnquiry = () =>
    import ( /* webpackChunkName:"transaction_enquiry" */ 'src/module/member_system/transaction_enquiry'); // 实体卡查询—交易查询
const cardTypeList = () => ///     卡类型
    import ( /* webpackChunkName:"card_type" */ 'src/module/member_system/card_type')
const cardQueries = () =>
    import ( /* webpackChunkName:"card_queries" */ 'src/module/member_system/card_queries'); // 实体卡查询—卡查询
const MemberCard = () =>
    import ( /* webpackChunkName:"membercard_import" */ 'src/module/member_system/membercard_import'); // 实体卡会员导入 
const MemberAnalysis = () =>
    import ( /* webpackChunkName:"member_analysis" */ 'src/module/member_system/member_analysis'); // 会员分析           

//  闪店卖手
const goldConfig = () =>
    import ( /* webpackChunkName:"gold_config" */ 'src/module/seller_assistant/gold_config') //  金币配置
const userGroupings = () =>
    import ( /* webpackChunkName:"user_groupings" */ 'src/module/seller_assistant/user_groupings') //  用户分组
const vermicelliList = () =>
    import ( /* webpackChunkName:"vermicelli_list" */ 'src/module/seller_assistant/vermicelli_list') // 粉丝列表
const workerStaff = () =>
    import ( /* webpackChunkName:"worker_staff" */ 'src/module/seller_assistant/worker_staff') //  工作人员
const speechConfig = () =>
    import ( /* webpackChunkName:"speech_config" */ 'src/module/seller_assistant/speech_config')
const Assistantusertag = () =>
    import ( /* webpackChunkName:"user_label" */ 'src/module/seller_assistant/user_label') //用户标签
const Assistantuserlevel = () =>
    import ( /* webpackChunkName:"staff_level" */ 'src/module/seller_assistant/staff_level') //人员级别   
const Assistantbuyconfig = () =>
    import ( /* webpackChunkName:"rushed_configuration" */ 'src/module/seller_assistant/rushed_configuration') //疯抢配置 
const Assistanthistory = () =>
    import ( /* webpackChunkName:"rushed_history" */ 'src/module/seller_assistant/rushed_history') //疯抢配置       
const rushedDetail = () =>
    import ( /* webpackChunkName:"rushed_history_detail" */ 'src/module/seller_assistant/rushed_history_detail') //疯抢配置       
const rushedRecord = () =>
    import ( /* webpackChunkName:"rushed_record" */ 'src/module/seller_assistant/rushed_record') //疯抢配置       
const Assistantgood = () =>
    import ( /* webpackChunkName:"spiking_commodity" */ 'src/module/seller_assistant/spiking_commodity') //疯抢配置       
const NewGoods = () =>
    import ( /* webpackChunkName:"new_goods" */ 'src/module/seller_assistant/new_goods') //疯抢配置  
const Assistantenchashment = () =>
    import ( /* webpackChunkName:"user_comments" */ 'src/module/seller_assistant/user_comments') //提现申请  
const assistantComment = () =>
    import ( /* webpackChunkName:"user_withdrawal" */ 'src/module/seller_assistant/user_withdrawal') //用户点评              
const taskRules = () =>
    import ( /* webpackChunkName:"taskRules" */ 'src/module/seller_assistant/task_rules') //任务规则
const Task = () =>
    import ( /* webpackChunkName:"mission_system" */ 'src/module/seller_assistant/mission_system') //任务系统  
const newmission = () =>
    import ( /* webpackChunkName:"addnew_mission" */ 'src/module/seller_assistant/addnew_mission') //任务系统        
const client = () =>
    import ( /* webpackChunkName:"ticketed_point_list" */ 'src/module/ticket_config/ticketed_point_list'); //发票点管理
const salesParty = () =>
    import ( /* webpackChunkName:"sales_party" */ 'src/module/ticket_config/sales_party'); //销方管理
let con = {
    template: "<router-view name= 'content'/>"
}
let details_header = {
    template: "<router-view name= 'details_header'/>"
}
let details_con = {
    template: `
        <div>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" name= 'details_con' style = 'padding-bottom:20px;'/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" name= 'details_con' style = 'padding-bottom:20px;'/>
        </div>
        `

}
// 配置路由
export default [{
        path: '/',
        components: {
            content: Login
        }
    },
    {
        path: '/brandAudit',
        components: {
            header: loginHead,
            content: con
        },
        children: [{
                path: '',
                components: {
                    content: brandAudit
                }
            },
            {
                path: 'brandBuild',
                components: {
                    content: brandBuild
                }
            },
            {
                path: 'unbrandBuild',
                components: {
                    content: unbrandBuild
                }
            },
            {
                path: 'unbrandBuildUi',
                components: {
                    content: unbrandBuildUi
                }
            }
        ]
    },
    {
        path: '/admin/authorization/relation',
        components: {
            content: relmain //饿了么，百度菜品关联，解除授权
        },
        children: [{
                path: '',
                components: {
                    nextCon: warranRelation
                }
            },
            {
                path: 'config',
                components: {
                    nextCon: warrantConfig
                }
            },
            {
                path: 'goodsfig',
                components: {
                    nextCon: goodsfig
                }
            },
            {
                path: 'packConfig',
                components: {
                    nextCon: packConfig
                }
            },
            {
                path: 'relationele',
                components: {
                    nextCon: elebaidu
                }
            }
        ]
    },
    {
        path: '/admin',
        components: {
            header: loginHead,
            content: mainCon
        },
        children: [{
            path: '',
            components: {
                aside: aside,
                details_header: detailsHeader,
                details_con: details_con
            },
            children: [{
                    path: 'storeOverview', //概况
                    components: {
                        details_con: homePage
                    }
                },
                {
                    path: 'test', //商品管理
                    components: {
                        details_con: test10
                    }
                },
                {
                    path: 'goodsManager', //商品管理
                    components: {
                        details_con: goodsManager
                    }
                },
                {
                    path: 'attrManager', //口味管理
                    components: {
                        details_con: attrManager
                    }
                },
                {
                    path: 'packageManager',
                    components: {
                        details_con: packageManager //套餐管理
                    }
                },
                {
                    path: 'categoryManager',
                    components: {
                        details_con: categoryManager //分类管理
                    }
                },
                {
                    path: 'inventoryManager',
                    components: {
                        details_con: inventoryManager //库存管理
                    }
                },
                {
                    path: 'multiChannelMenu',
                    components: {
                        details_con: multiChannelMenu //多渠道菜单
                    }
                },
                {
                    path: 'marker',
                    components: {
                        details_con: marker //菜单标识
                    }
                },
                {
                    path: 'authorization',
                    components: {
                        details_con: warrant //外卖授权
                    }
                },
                {
                    path: 'printset',
                    components: {
                        details_con: awayPrinter
                    }
                },
                {
                    path: 'addCoupon',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '', //添加优惠券
                            components: {
                                details_con: addCoupon
                            }
                        },
                        {
                            path: 'breakCoupon', //减免优惠券
                            components: {
                                details_con: breakCoupon
                            }
                        },
                        {
                            path: 'discountCoupon', //折扣优惠券
                            components: {
                                details_con: discountCoupon
                            }
                        },
                        {
                            path: 'giveCoupon', //赠菜优惠券
                            components: {
                                details_con: giveCoupon
                            }
                        },
                        {
                            path: 'vouchersCoupon', //代金券
                            components: {
                                details_con: vouchersCoupon
                            }
                        },
                        {
                            path: 'intergralcardCoupon', //积分卡券
                            components: {
                                details_con: intergralcardCoupon
                            }
                        }
                    ]
                },
                {
                    path: 'getCouponList',
                    components: {
                        details_con: couponManagement
                    }
                },
                {
                    path: 'integralMall',
                    components: {
                        details_con: integralMall
                    }
                },
                {
                    path: 'appointment',
                    components: {
                        details_con: appointment
                    }
                },
                {
                    path: 'point', //积分抵现配置
                    components: {
                        details_con: integralWithdrawal
                    }
                },
                {
                    path: 'staffManager', //员工管理
                    components: {
                        details_con: employeeManage
                    }
                },
                {
                    path: 'kitchen', //后厨配置
                    components: {
                        details_con: kitchenModel
                    }
                },
                {
                    path: 'areaManager', //区域管理
                    components: {
                        details_con: areaManage
                    }
                },
                {
                    path: 'tableManager', //桌台管理
                    components: {
                        details_con: tableManage
                    }
                },
                {
                    path: 'PriceRule', //取整设置
                    components: {
                        details_con: integerSet
                    }
                },
                {
                    path: 'returnReason', //退菜原因
                    components: {
                        details_con: refundFood
                    }
                },
                {
                    path: 'Startandsell', //商品起售配置
                    components: {
                        details_con: goodSale
                    }
                },
                {
                    path: 'notice', //商品起售配置
                    components: {
                        details_con: shopNotice
                    }
                },
                {
                    path: 'hangUpAccount', //商品起售配置
                    components: {
                        details_con: hangUpAccount
                    }
                },
                {
                    path: 'reverseReason', //反结账原因
                    components: {
                        details_con: reverseReason
                    }
                },
                {
                    path: 'serviceChargeManager', //服务费管理
                    components: {
                        details_con: serviceFee
                    }
                },
                {
                    path: 'shopNumber', //商家编号
                    components: {
                        details_con: shopNumber
                    }
                },
                {
                    path: 'banner', //轮播图配置
                    components: {
                        details_con: shufflingPic
                    }
                },
                {
                    path: 'openTime', //店铺基本信息
                    components: {
                        details_con: openTime
                    }
                },
                {
                    path: 'Payment', //支付方式
                    components: {
                        details_con: Payment
                    }
                },
                {
                    path: 'citySettings', //市别设置
                    components: {
                        details_con: timeSet
                    }
                },
                {
                    path: 'EleMenuManage', //市别设置
                    components: {
                        details_con: elemenuManage
                    }
                },
                {
                    path: 'fastSelling', //快销模式管理
                    components: {
                        details_con: fastSelling
                    }
                },
                {
                    path: 'jobsManager', //职位管理
                    components: {
                        details_con: jobManage
                    }
                },
                {
                    path: 'staffConfig', //员工配置
                    components: {
                        details_con: staffConfig
                    }
                },
                {
                    path: 'positionConfig', //职位配置
                    components: {
                        details_con: positionConfig
                    }
                },
                {
                    path: 'setting', //品牌基本配置
                    components: {
                        details_con: baseBrand
                    }
                },
                {
                    path: 'paymentMethod', //品牌支付配置
                    components: {
                        details_con: payBrand
                    }
                },
                {
                    path: 'storeArea', //区域门店
                    components: {
                        details_con: shopGroup
                    }
                },
                {
                    path: 'boundPublicNumber', //绑定公众号
                    components: {
                        details_con: boundPublicNumber
                    }
                },
                {
                    path: 'pushLanguageSettings',
                    components: {
                        details_con: pushLanguageSettings
                    }
                },
                {
                    path: 'menuSetting', //菜单设置
                    components: {
                        details_con: menuSet
                    }
                },
                {
                    path: 'appletBinding', //小程序绑定
                    components: {
                        details_con: smallProgramBinding
                    }
                },
                {
                    path: 'templateSetting', //模板设置
                    components: {
                        details_con: moduleSet
                    }
                },
                {
                    path: 'printerError', //打印错误队列
                    components: {
                        details_con: printer_errors
                    }
                },
                {
                    path: 'printQueue', //打印队列
                    components: {
                        details_con: print_queue
                    }
                },
                {
                    path: 'printerManager', //打印机管理
                    components: {
                        details_con: printer_manager
                    }
                },
                {
                    path: 'printerConfig', //打印机管理
                    components: {
                        details_con: printer_config
                    }
                },
                //仓库管理
                {
                    path: 'warehouseList', //仓库管理
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '', //仓库列表
                            components: {
                                details_con: warehouseList
                            }
                        },
                        {
                            path: 'warehouseDetail', //仓库详情
                            components: {
                                details_con: warehouseDetail
                            }
                        },
                        {
                            path: 'create', //新建仓库
                            components: {
                                details_con: warehouseCreate
                            }
                        },
                        {
                            path: 'outputStore', //仓库出库
                            components: {
                                details_con: outputStore
                            }
                        },
                        {
                            path: 'outputShipper', //仓库出库详细信息-出货单
                            components: {
                                details_con: outputShipper
                            }
                        },
                        {
                            path: 'outputSelGoods', //仓库出库选择商品
                            components: {
                                details_con: outputSelGoods
                            }
                        },
                        {
                            path: 'changeArea', //修改区域
                            components: {
                                details_con: changeArea
                            }
                        },
                        {
                            path: 'change', //修改仓库
                            components: {
                                details_con: warehouseChange
                            }
                        },
                        {
                            path: 'searchGoods', //仓库商品查询
                            components: {
                                details_con: searchGoods
                            }
                        },
                        {
                            path: 'warehouseGoodsDetail', //仓库商品查询详情
                            components: {
                                details_con: warehouseGoodsDetail
                            }
                        },
                        {
                            path: 'warehouseMaterialDetail', //仓库商品查询详情
                            components: {
                                details_con: warehouseMaterialDetail
                            }
                        },
                        {
                            path: 'warehouseOperationDetail', //仓库操作详情
                            components: {
                                details_con: warehouseOperationDetail
                            }
                        }
                    ]
                },
                {
                    path: 'operation', //调度管理
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: operation
                            }
                        },
                        {
                            path: 'operationDetail', //调度详情
                            components: {
                                details_con: operationDetail
                            }
                        },
                        {
                            path: 'enterGoods', //入货
                            components: {
                                details_con: enterGoods
                            }
                        }
                    ]
                },
                {
                    path: 'selectDispatch', //批量调度-选择调度单
                    components: {
                        details_con: select_dispatch
                    },
                },
                {
                    path: 'multipleExamine', //批量审核
                    components: {
                        details_con: multipleExamine
                    },
                },
                {
                    path: 'pickingList', //领料列表
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '', //领料列表
                            components: {
                                details_con: pickingList
                            }
                        },
                        {
                            path: 'picking', //领料
                            components: {
                                details_con: picking
                            }
                        },
                        {
                            path: 'checkDetails', //查看详情
                            components: {
                                details_con: checkDetails
                            }
                        },
                        {
                            path: 'plateDetails', //查看领料盘库详情
                            components: {
                                details_con: plateDetails
                            }
                        },
                        {
                            path: 'plateStorage', //领料人盘库
                            components: {
                                details_con: plateStorage
                            }
                        }
                    ]
                },
                //调度申请
                {
                    path: 'schedulingApplication',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: schedulingApplicationList //调度申请,模板列表
                            }
                        },
                        {
                            path: 'purchaseRequisition',
                            components: {
                                details_con: purchaseRequisition //入货申请
                            }
                        },
                        {
                            path: 'purchaseRequisitionDetail',
                            components: {
                                details_con: purchaseRequisitionDetail //调度申请详情
                            }
                        }
                    ]
                },
                // 订单统计
                {
                    path: 'orderStatistics', //单天
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: orderStatistics
                            }
                        },
                        {
                            path: 'takeawayBrand', //订单统计外卖品牌
                            components: {
                                details_con: takeawayBrand
                            }
                        },
                        {
                            path: 'orderOne', //订单统计单天
                            components: {
                                details_con: orderOne
                            }
                        },
                        {
                            path: 'orderMore', //订单统计多天
                            components: {
                                details_con: orderMore
                            }
                        },
                        {
                            path: 'orderDetail', //订单统计详情
                            components: {
                                details_con: orderDetail
                            }
                        },
                        {
                            path: 'orderTakeaway', //订单统计外卖
                            components: {
                                details_con: orderTakeaway
                            }
                        },
                        {
                            path: 'orderProprietary', //自营外卖
                            components: {
                                details_con: orderProprietary
                            }
                        },
                        {
                            path: 'takeawayOne', //订单统计外卖单天
                            components: {
                                details_con: takeawayOne
                            }
                        },
                        {
                            path: 'takeawayMore', //订单统计外卖多天
                            components: {
                                details_con: takeawayMore
                            }
                        },
                        {
                            path: 'takeawayDetail', //订单统计外卖详情
                            components: {
                                details_con: takeawayDetail
                            }
                        },
                        {
                            path: 'orderProprietaryBrand', //自营外卖统计
                            components: {
                                details_con: orderProprietaryBrand
                            }
                        }
                    ]
                },
                {
                    path: 'businessStatistics', //营业统计
                    components: {
                        details_con: businessStatistics
                    }
                },
                {
                    path: 'categoryStatistics', //分类统计
                    components: {
                        details_con: categoryStatistics
                    }
                },
                {
                    path: 'singleStatistics', //单品统计
                    components: {
                        details_con: singleStatistics
                    }
                },
                {
                    path: 'OrderBillList', //挂账统计
                    components: {
                        details_con: brandOrderBill
                    }
                },
                {
                    path: 'handover', //挂账统计
                    components: {
                        details_con: Handover
                    }
                },
                {
                    path: 'memberRecharge', //挂账统计
                    components: {
                        details_con: MemberRecharge
                    }
                },
                {
                    path: 'delOrder', //废单统计
                    components: {
                        details_con: delOrder
                    }
                },
                {
                    path: 'returnGoods', //退品统计
                    components: {
                        details_con: returnGoods
                    }
                },
                {
                    path: 'singleStockstatics', //单品库存统计
                    components: {
                        details_con: singleStockstatics
                    }
                },
                {
                    path: 'exportTemplate', //单品库存统计 导出模板
                    components: {
                        details_con: exportTemplate
                    }
                },
                //零售分类统计
                {
                    path: 'categoryCount',
                    components: {
                        details_con: categoryCount //零售分类统计
                    }
                },
                {
                    path: 'reservationManager', //预定统计
                    components: {
                        details_con: reservationManager
                    }
                },
                {
                    path: 'entityCardStatistics', //实体卡统计
                    components: {
                        details_con: entityCardStatistics
                    }
                },
                {
                    path: 'activityStatistics', //活动统计
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: activityStatistics
                            }
                        },
                        {
                            path: 'detail', //活动统计-详情
                            components: {
                                details_con: activityDetail
                            }
                        }
                    ]
                },
                {
                    path: 'freeGoods', //赠品统计
                    components: {
                        details_con: freeGoods
                    }
                },
                {
                    path: 'changePriceRecord', //改价统计
                    components: {
                        details_con: changePriceRecord
                    }
                },
                {
                    path: 'Customstatistics', //自定义商品统计
                    components: {
                        details_con: customStatistics
                    }
                },
                {
                    path: 'wareImport', //入库导入
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: wareImport
                            }
                        },
                        {
                            path: 'wareProsperity', //入库导入成功
                            components: {
                                details_con: wareProsperity
                            }
                        }
                    ]
                },

                {
                    path: 'conclusionList', //审核列表
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: conclusionList
                            }
                        },
                        {
                            path: 'shipmentVerify', //审核详情确认
                            components: {
                                details_con: shipmentVerify
                            }
                        },
                        {
                            path: 'batchSchedule',
                            components: {
                                details_con: batchSchedule
                            }
                        },
                        {
                            path: 'newSchedule', //新建调度
                            components: {
                                details_con: newSchedule
                            }
                        }
                    ]
                },
                {
                    path: 'processbomList',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                        path: '',
                        components: {
                            details_con: processbomList
                        },
                    }, {
                        path: 'bomlistDetail',
                        components: {
                            details_con: bomlistDetail
                        },
                    }, {
                        path: 'create',
                        components: {
                            details_con: processBomCreate
                        },
                    }]
                },
                {
                    path: 'inventoryManagement', //进销存
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: inventoryManagement
                            }
                        },
                        {
                            path: 'detail', //进销存详情
                            components: {
                                details_con: inventDetail
                            }
                        },
                        {
                            path: 'suppliesDetail', //进销存物料详情
                            components: {
                                details_con: suppliesDetail
                            }
                        },
                        {
                            path: 'putStroage', //进销存入库
                            components: {
                                details_con: putstroage
                            }
                        },
                        {
                            path: 'loseManage', //进销存耗损
                            components: {
                                details_con: loseManage
                            }
                        },
                        {
                            path: 'materialsPutinStorage', //物料入库
                            components: {
                                details_con: materialsPutinStorage
                            }
                        },
                        {
                            path: 'materialModifyBatch', //物料批次修改
                            components: {
                                details_con: materialModifyBatch
                            }
                        },
                        {
                            path: 'materialLoss', //物料耗损
                            components: {
                                details_con: materialLoss
                            }
                        },
                        {
                            path: 'revampUnit', //进销存入库
                            components: {
                                details_con: revampUnit
                            }
                        },
                        {
                            path: 'publicDetails', //公用详情
                            components: {
                                details_con: publicDetails
                            }
                        },
                        {
                            //新建物料
                            path: 'materialCreate',
                            components: {
                                details_con: materialCreate
                            }
                        },
                        {
                            //修改物料
                            path: 'materialEdit',
                            components: {
                                details_con: materialEdit
                            }
                        },
                        {
                            //盘库
                            path: 'warehouseCount',
                            components: {
                                details_con: warehouseCount
                            }
                        }
                    ]
                },
                {
                    path: 'brandAssign', //进销存-品牌指派
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '', //品牌指派-模板列表
                            components: {
                                details_con: brandAssign
                            },
                        },
                        {
                            path: 'create', //品牌指派-新建指派
                            components: {
                                details_con: createAssign
                            }
                        },
                        {
                            path: 'setNewjurisdiction', //新建权限指派
                            components: {
                                details_con: setNewjurisdiction
                            }
                        },
                        {
                            path: 'jurisdictionRecord', //指派日志
                            components: {
                                details_con: jurisdictionRecord
                            }
                        },
                        {
                            path: 'jurisdictionDetail', //查看同步详情
                            components: {
                                details_con: jurisdictionDetail
                            }
                        }
                    ]
                },
                {
                    path: 'bomList', //bom单管理
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '', //bom单列表
                            components: {
                                details_con: bomList
                            }
                        },
                        {
                            path: 'bomCreate', //新建bom单
                            components: {
                                details_con: bomCreate
                            }
                        },
                        {
                            path: 'bomChange', //修改bom单
                            components: {
                                details_con: bomChange
                            }
                        },
                        {
                            path: 'bomDetail', //bom单详情
                            components: {
                                details_con: bomDetail
                            }
                        }
                    ]
                },
                {
                    path: 'goodsCountHistory',
                    components: {
                        details_con: goodsCountHistory //商品盘库记录列表
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 1
                            };
                        }
                    }
                },
                {
                    path: 'materialCountHistory', //物料盘库记录列表
                    components: {
                        details_con: goodsCountHistory
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 2
                            };
                        }
                    },

                },
                {
                    path: 'processHistory', //物料盘库记录列表
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '', //bom单列表
                            components: {
                                details_con: goodsCountHistory
                            },
                            props: {
                                details_con: (route) => {
                                    return {
                                        tab: 3
                                    };
                                }
                            },
                        },
                        {
                            path: 'detail', //bom单列表
                            components: {
                                details_con: processMatDetail
                            }
                        },
                    ],
                },
                {
                    path: 'goodsCountTemplate',
                    components: {
                        details_con: goodsCountTemplate //商品盘库模板列表
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 1
                            };
                        }
                    }
                }, {
                    path: 'materialCountTemplate',
                    components: {
                        details_con: goodsCountTemplate //物料盘库模板列表
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 2
                            };
                        }
                    }
                },
                {
                    path: 'processTemplate',
                    components: {
                        details_con: goodsCountTemplate //物料盘库模板列表
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 3
                            };
                        }
                    }
                },
                {
                    path: 'goodsCountDetail',
                    components: {
                        details_con: goodsCountDetail //商品盘库详情
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 1
                            };
                        }
                    }
                },
                {
                    path: 'materialCountDetail',
                    components: {
                        details_con: goodsCountDetail //物料盘库详情
                    },
                    props: {
                        details_con: (route) => {
                            return {
                                tab: 2
                            };
                        }
                    }
                },
                {
                    path: 'goodsCount',
                    components: {
                        details_con: goodsCount //商品盘库  
                    }
                }, {
                    path: 'processMaterialPrint', //加工物料打印
                    components: {
                        details_con: processMaterialPrint
                    }
                },
                {
                    path: 'processMaterial',
                    components: {
                        details_con: processMaterial //加工物料
                    }
                },
                //批量调度日志
                {
                    path: 'batchLog',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            redirect: 'batchLogDispatch'
                        },
                        {
                            path: 'batchLogDispatch',
                            components: {
                                details_con: batchLogDispatch //批量调度日志列表      
                            },
                            alias: '',
                            props: {
                                details_con: (route) => {
                                    return {
                                        tab: 1
                                    };
                                }
                            }
                        },
                        {
                            path: 'batchLogAudit',
                            components: {
                                details_con: batchLogDispatch //批量审核日志列表      
                            },
                            props: {
                                details_con: (route) => {
                                    return {
                                        tab: 2
                                    };
                                }
                            }
                        },
                        {
                            path: 'batchLogPrint',
                            components: {
                                details_con: batchLogPrint //批量审核详情打印
                            }
                        },
                        {
                            path: 'batchLogDetail',
                            components: {
                                details_con: batchLogDetail //批量审核日志详情
                            }
                        },
                        {
                            path: 'batchLogDispatchDetail',
                            components: {
                                details_con: batchLogDispatchDetail //批量调度日志详情
                            }
                        },
                    ]
                },
                {
                    path: 'materialCount', //批量盘库-物料盘库
                    components: {
                        details_con: checkMaterial
                    },
                },
                {
                    path: 'editGoodsCountTemplate', //批量盘库-编辑商品盘库模板
                    components: {
                        details_con: editGoodsCountTemplate
                    },
                },
                {
                    path: 'editMaterialCountTemplate', //批量盘库-编辑商品盘库模板
                    components: {
                        details_con: editMaterialCountTemplate
                    },
                },
                {
                    path: 'supplierConfigure', //进销存配置
                    components: {
                        details_con: supplierConfigure
                    }
                },
                {
                    path: 'supplierManagement', //供应商管理
                    components: {
                        details_con: supplierManagement
                    }
                },
                {
                    path: 'wearCause', //耗损原因管理
                    components: {
                        details_con: wearCause
                    }
                },
                {
                    path: 'shelfReason', //下架原因管理
                    components: {
                        details_con: offReason
                    }
                },
                {
                    path: 'brandList', //商品品牌管理
                    components: {
                        details_con: brandList
                    }
                },
                {
                    path: 'weighGoodsList', //称重商品配置
                    components: {
                        details_con: weighGoodsList
                    }
                },
                {
                    path: 'shelfManagement', //货架管理
                    components: {
                        details_con: shelfList
                    }
                },
                {
                    path: 'materialCategory',
                    components: {
                        details_con: materialCategory //物料分类
                    }
                },
                {
                    path: 'materialUnitCreate',
                    components: {
                        details_con: materialUnitCreate //新建物料单位
                    }
                },
                {
                    path: 'shelveRule', //销售规则
                    components: {
                        details_con: shelveRule
                    }
                },
                {
                    path: 'cashierConfig', //报表配置
                    components: {
                        details_con: cashierConfig
                    }
                },
                {
                    path: 'cashierAnslysis', //收银分析
                    components: {
                        details_con: cashierAnslysis
                    }
                },
                {
                    path: 'ReportCategory', //分类报表
                    components: {
                        details_con: cashierCategory
                    }
                },
                {
                    path: 'NoBrand', //会员基本配置
                    components: {
                        details_con: NoBrand
                    }
                },
                {
                    path: 'memberManagement', //会员管理
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: memberManagement
                            }
                        },
                        {
                            path: 'detail',
                            components: {
                                details_con: memberManDetail
                            }
                        }
                    ]
                },
                {
                    path: 'Couponstatistics', //会员管理
                    components: {
                        details_con: Couponstatistics
                    }
                },
                {
                    path: 'getCardConsumeList', //实体卡查询—交易查询
                    components: {
                        details_con: transactionEnquiry
                    }
                },
                {
                    path: 'getCardList', //实体卡查询—卡查询
                    components: {
                        details_con: cardQueries
                    }
                },
                {
                    path: 'memberSend',
                    components: {
                        details_con: memberSend
                    }
                },
                {
                    path: 'integralRule',
                    components: {
                        details_con: integralRule
                    }
                },
                {
                    path: 'statisticsManagement', //来源统计
                    components: {
                        details_con: statisticsManagement
                    }
                },
                {
                    path: 'configCourse', //配置教程
                    components: {
                        details_con: configCourse
                    }
                },
                {
                    path: 'onlineOrderConfig', //在线点单配置
                    components: {
                        details_con: onlineOrderConfig
                    }
                },
                {
                    path: 'activateEntityCard', //实体卡激活
                    components: {
                        details_con: activateEntityCard
                    }
                },
                {
                    path: 'square', //自助模式
                    components: {
                        details_con: selfHelpMode
                    }
                },
                {
                    path: 'memberStoredValueScheme', //会员储值
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: memberStore
                            }
                        },
                        {
                            path: 'solution',
                            components: {
                                details_con: memberStoreSolution
                            }
                        }
                    ]
                },
                {
                    path: 'promotionMaterial',
                    components: {
                        details_con: mallPro
                    }
                },
                {
                    path: 'cooperation',
                    components: {
                        details_con: cooperation
                    }
                },
                {
                    path: 'memberLabel', //  会员标签
                    components: {
                        details_con: memberLabel
                    }
                },
                {
                    path: 'zhongxin', //  中信银行对账单
                    components: {
                        details_con: citicStatements
                    }
                },
                {
                    path: 'zxsh', //  中信银行对账单
                    components: {
                        details_con: zxsh
                    }
                },
                {
                    path: 'weixinConfiguration', //  中信银行对账单
                    components: {
                        details_con: weixinOnfiguration
                    }
                },
                {
                    path: 'activity',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: activity
                            }
                        },
                        {
                            path: 'generalActivity',
                            components: {
                                details_con: details_con
                            },
                            children: [{
                                    path: '',
                                    components: {
                                        details_con: generalActivity
                                    }
                                },
                                {
                                    path: 'birth',
                                    components: {
                                        details_con: activityBirth
                                    }
                                }, {
                                    path: 'custom',
                                    components: {
                                        details_con: activityCustom
                                    }
                                },
                                {
                                    path: 'agift',
                                    components: {
                                        details_con: activityAgift
                                    }
                                },
                                {
                                    path: 'encourage',
                                    components: {
                                        details_con: activityEncourage
                                    }
                                },
                                {
                                    path: 'fission',
                                    components: {
                                        details_con: activityFission
                                    }
                                },
                                {
                                    path: 'member',
                                    components: {
                                        details_con: activityMember
                                    }
                                },
                                {
                                    path: 'fullreduce',
                                    components: {
                                        details_con: activityFullreduce
                                    }
                                }
                            ]
                        },
                        {
                            path: 'couponActivity',
                            components: {
                                details_con: details_con
                            },
                            children: [{
                                    path: '',
                                    components: {
                                        details_con: couponActivity
                                    }
                                },
                                {
                                    path: 'coupon',
                                    components: {
                                        details_con: activityCoupon
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    path: 'memberLevelManagement',
                    components: {
                        details_con: memberLevelManagement
                    }
                },
                {
                    path: 'adminConfig', // 管理员配置
                    components: {
                        details_con: adminConfig
                    }
                },
                {
                    path: 'addCardType', // 实体卡配置-制卡
                    components: {
                        details_con: makeCard
                    }
                },
                {
                    path: 'cardTypeList',
                    components: {
                        details_con: cardTypeList
                    }
                },
                {
                    path: 'cardTypeApp', //实体卡应用
                    components: {
                        details_con: cardTypeApp
                    }
                },
                {
                    path: 'MemberCard', //实体卡会员导入
                    components: {
                        details_con: MemberCard
                    }
                },
                {
                    path: 'AssistantcoinsConfig', // 金币配置
                    components: {
                        details_con: goldConfig
                    }
                },
                {
                    path: 'Assistantusergroup',
                    components: {
                        details_con: userGroupings
                    }
                },
                {
                    path: 'Assistantfans',
                    components: {
                        details_con: vermicelliList
                    }
                },
                {
                    path: 'Assistantstaff',
                    components: {
                        details_con: workerStaff
                    }
                },
                {
                    path: 'Assistantverbaltrick',
                    components: {
                        details_con: speechConfig
                    }
                },
                {
                    path: 'Assistantusertag',
                    components: {
                        details_con: Assistantusertag
                    }
                },
                {
                    path: 'Assistantuserlevel',
                    components: {
                        details_con: Assistantuserlevel
                    }
                },
                {
                    path: 'Assistantbuyconfig',
                    components: {
                        details_con: Assistantbuyconfig
                    }
                },
                {
                    path: 'Assistanthistory',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: Assistanthistory
                            }
                        },
                        {
                            path: 'detail',
                            components: {
                                details_con: details_con
                            },
                            children: [{
                                    path: '',
                                    components: {
                                        details_con: rushedDetail
                                    }
                                },
                                {
                                    path: 'record',
                                    components: {
                                        details_con: rushedRecord
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'Assistantgood',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: Assistantgood
                            }
                        },
                        {
                            path: 'newgoods',
                            components: {
                                details_con: NewGoods
                            }
                        }
                    ]
                },
                {
                    path: 'Assistantenchashment',
                    components: {
                        details_con: Assistantenchashment
                    }
                },
                {
                    path: 'assistantComment',
                    components: {
                        details_con: assistantComment
                    }
                },
                {
                    path: 'CommentConfig',
                    components: {
                        details_con: CommentConfig
                    }
                },
                {
                    path: 'taskRules',
                    components: {
                        details_con: taskRules
                    }
                },
                {
                    path: 'Task',
                    components: {
                        details_con: details_con
                    },
                    children: [{
                            path: '',
                            components: {
                                details_con: Task
                            }
                        },
                        {
                            path: 'newmission',
                            components: {
                                details_con: newmission
                            }
                        }
                    ]
                },
                {
                    path: 'Commentstatics',
                    components: {
                        details_con: Commentstatics
                    }
                },
                {
                    path: 'Scanpayconfig',
                    components: {
                        details_con: Scanpayconfig
                    }
                },
                {
                    path: 'Scanpaystatics',
                    components: {
                        details_con: Scanpaystatics
                    }
                },
                {
                    path: 'reverseStatics',
                    components: {
                        details_con: reverseStatics
                    }
                },
                {
                    path: 'Dada',
                    components: {
                        details_con: Dada
                    }
                },
                {
                    path: 'DadaConfig',
                    components: {
                        details_con: DadaConfig
                    }
                },
                {
                    path: 'MemberValueConfig',
                    components: {
                        details_con: MemberValueConfig
                    }
                },
                {
                    path: 'orderTemplateSwitch',
                    components: {
                        details_con: orderTemplateSwitch
                    }
                },
                {
                    path: 'MemberAnalysis',
                    components: {
                        details_con: MemberAnalysis
                    }
                },
                {
                    path: 'client',
                    components: {
                        details_con: client
                    }
                },
                {
                    path: 'seller', //销方配置
                    components: {
                        details_con: salesParty
                    }
                },
                {
                    path: 'balanceAdjustRecord', //余额调整记录
                    components: {
                        details_con: balanceAdjustRecord
                    }
                },
            ]
        }]
    }
];