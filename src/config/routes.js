import Login from 'src/module/login';
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
const npDM4 = (resolve) =>import ( /* webpackChunkName:"cashier_config" */ 'src/module/cashier/cashier_config');
const jFW3 = (resolve) =>import ( /* webpackChunkName:"cashier_anslysis" */ 'src/module/cashier/cashier_anslysis');
const UD2 = (resolve) =>import ( /* webpackChunkName:"cashier_category" */ 'src/module/cashier/cashier_category');
const JyDn4 = (resolve) =>import ( /* webpackChunkName:"membership_configuration" */ 'src/module/member_system/membership_configuration');
const qYvr4 = (resolve) =>import ( /* webpackChunkName:"new_member_management" */ 'src/module/member_system/new_member_management');
const FXjx4 = (resolve) =>import ( /* webpackChunkName:"member_manage_detail" */ 'src/module/member_system/member_manage_detail');
const cGI3 = (resolve) =>import ( /* webpackChunkName:"transaction_enquiry" */ 'src/module/member_system/member_transaction_enquiry/transaction_enquiry');
const Kboi4 = (resolve) =>import ( /* webpackChunkName:"card_queries" */ 'src/module/member_system/card_queries');
const CxYF4 = (resolve) =>import ( /* webpackChunkName:"member_push_message" */ 'src/module/member_system/member_push_message');
const YUV3 = (resolve) =>import ( /* webpackChunkName:"intergral" */ 'src/module/member_system/intergral');
const VAmfM5 = (resolve) =>import ( /* webpackChunkName:"card_activation" */ 'src/module/member_system/card_activation');
const uEMhD5 = (resolve) =>import ( /* webpackChunkName:"member_label" */ 'src/module/member_system/member_label');
const iwcV4 = (resolve) =>import ( /* webpackChunkName:"member_grade" */ 'src/module/member_system/member_grade');
const qZlh4 = (resolve) =>import ( /* webpackChunkName:"gold_config" */ 'src/module/seller_assistant/gold_config');
const yKclY5 = (resolve) =>import ( /* webpackChunkName:"user_groupings" */ 'src/module/seller_assistant/user_groupings');
const wIFV4 = (resolve) =>import ( /* webpackChunkName:"vermicelli_list" */ 'src/module/seller_assistant/vermicelli_list');
const HJ2 = (resolve) =>import ( /* webpackChunkName:"worker_staff" */ 'src/module/seller_assistant/worker_staff');
const TQHP4 = (resolve) =>import ( /* webpackChunkName:"speech_config" */ 'src/module/seller_assistant/speech_config');
const GEj3 = (resolve) =>import ( /* webpackChunkName:"user_label" */ 'src/module/seller_assistant/user_label');
const HbKs4 = (resolve) =>import ( /* webpackChunkName:"staff_level" */ 'src/module/seller_assistant/staff_level');
const Nr2 = (resolve) =>import ( /* webpackChunkName:"rushed_configuration" */ 'src/module/seller_assistant/rushed_configuration');
const AW2 = (resolve) =>import ( /* webpackChunkName:"rushed_history" */ 'src/module/seller_assistant/rushed_history');
const uuHOA5 = (resolve) =>import ( /* webpackChunkName:"rushed_history_detail" */ 'src/module/seller_assistant/rushed_history_detail');
const dN2 = (resolve) =>import ( /* webpackChunkName:"rushed_record" */ 'src/module/seller_assistant/rushed_record');
const FE2 = (resolve) =>import ( /* webpackChunkName:"rushed_record_detail" */ 'src/module/seller_assistant/rushed_record_detail');
const LMUYP5 = (resolve) =>import ( /* webpackChunkName:"ticketed_point_list" */ 'src/module/ticket_config/ticketed_point_list');
const fbeL4 = (resolve) =>import ( /* webpackChunkName:"sales_party" */ 'src/module/ticket_config/sales_party');
const tbLw4 = (resolve) =>import ( /* webpackChunkName:"make_card" */ 'src/module/member_system/make_card');
const LpnRk5 = (resolve) =>import ( /* webpackChunkName:"card_type" */ 'src/module/member_system/card_type');
const vl2 = (resolve) =>import ( /* webpackChunkName:"getapplied_entitycardlist" */ 'src/module/member_system/getapplied_entitycardlist');
const Vnt3 = (resolve) =>import ( /* webpackChunkName:"membercard_import" */ 'src/module/member_system/membercard_import');
const uk2 = (resolve) =>import ( /* webpackChunkName:"member_analysis" */ 'src/module/member_system/member_analysis');
const ymtg4 = (resolve) =>import ( /* webpackChunkName:"spiking_commodity" */ 'src/module/seller_assistant/spiking_commodity');
const stjQ4 = (resolve) =>import ( /* webpackChunkName:"new_goods" */ 'src/module/seller_assistant/new_goods');
const wJWI4 = (resolve) =>import ( /* webpackChunkName:"user_comments" */ 'src/module/seller_assistant/user_comments');
const gMDpY5 = (resolve) =>import ( /* webpackChunkName:"user_withdrawal" */ 'src/module/seller_assistant/user_withdrawal');
const pXk3 = (resolve) =>import ( /* webpackChunkName:"task_rules" */ 'src/module/seller_assistant/task_rules');
const mldVU5 = (resolve) =>import ( /* webpackChunkName:"mission_system" */ 'src/module/seller_assistant/mission_system');
const Rwr3 = (resolve) =>import ( /* webpackChunkName:"addnew_mission" */ 'src/module/seller_assistant/addnew_mission');
const vpEvt5 = (resolve) =>import ( /* webpackChunkName:"survey" */ 'src/module/home_page/survey');
const lIw3 = (resolve) =>import ( /* webpackChunkName:"details_con" */ 'src/module/goods_config/details_con');
const lrgvi5 = (resolve) =>import ( /* webpackChunkName:"attr_manager" */ 'src/module/goods_config/attr_manager');
const LxOa4 = (resolve) =>import ( /* webpackChunkName:"package_manager" */ 'src/module/goods_config/package_manager');
const iB2 = (resolve) =>import ( /* webpackChunkName:"category_manager" */ 'src/module/goods_config/category_manager');
const NKtQO5 = (resolve) =>import ( /* webpackChunkName:"invcontrol" */ 'src/module/goods_config/invcontrol');
const IeZ3 = (resolve) =>import ( /* webpackChunkName:"more_menu" */ 'src/module/goods_config/more_menu');
const Jffq4 = (resolve) =>import ( /* webpackChunkName:"marker" */ 'src/module/goods_config/marker');
const Lwj3 = (resolve) =>import ( /* webpackChunkName:"warrant" */ 'src/module/outfood/accredit/warrant');
const vkro4 = (resolve) =>import ( /* webpackChunkName:"printer_takeaway" */ 'src/module/outfood/takeawayprint/printer_takeaway');
const UOES4 = (resolve) =>import ( /* webpackChunkName:"binding_merchants" */ 'src/module/outfood/binding_merchants');
const iGg3 = (resolve) =>import ( /* webpackChunkName:"dada_distribution" */ 'src/module/outfood/dada/dada_distribution');
const SQpH4 = (resolve) =>import ( /* webpackChunkName:"add_newcoupon" */ 'src/module/marketing_tools/new_coupons/add_newcoupon');
const iOD3 = (resolve) =>import ( /* webpackChunkName:"breaks_coupon" */ 'src/module/marketing_tools/new_coupons/breaks_coupon');
const TcF3 = (resolve) =>import ( /* webpackChunkName:"discount_coupon" */ 'src/module/marketing_tools/new_coupons/discount_coupon');
const aps3 = (resolve) =>import ( /* webpackChunkName:"give_coupon" */ 'src/module/marketing_tools/new_coupons/give_coupon');
const qLtt4 = (resolve) =>import ( /* webpackChunkName:"vouchers_coupon" */ 'src/module/marketing_tools/new_coupons/vouchers_coupon');
const linU4 = (resolve) =>import ( /* webpackChunkName:"integralcard_coupon" */ 'src/module/marketing_tools/new_coupons/integralcard_coupon');
const qMfof5 = (resolve) =>import ( /* webpackChunkName:"coupon_management" */ 'src/module/marketing_tools/coupon_management');
const gtQvW5 = (resolve) =>import ( /* webpackChunkName:"integral_mall" */ 'src/module/marketing_tools/integral/integral_mall');
const wuT3 = (resolve) =>import ( /* webpackChunkName:"addOredintegral" */ 'src/module/marketing_tools/integral/addOredintegral');
const CPJSn5 = (resolve) =>import ( /* webpackChunkName:"configuration_reserve" */ 'src/module/marketing_tools/configuration_reserve');
const TjT3 = (resolve) =>import ( /* webpackChunkName:"integral_withdrawal" */ 'src/module/marketing_tools/integral_withdrawal');
const UxN3 = (resolve) =>import ( /* webpackChunkName:"statistics_management" */ 'src/module/marketing_tools/statistics_management');
const xxiai5 = (resolve) =>import ( /* webpackChunkName:"online_configuration" */ 'src/module/marketing_tools/online_configuration');
const cbl3 = (resolve) =>import ( /* webpackChunkName:"self_help_mode" */ 'src/module/marketing_tools/self_help/self_help_mode');
const ngBsw5 = (resolve) =>import ( /* webpackChunkName:"member_store" */ 'src/module/marketing_tools/member_store');
const SU2 = (resolve) =>import ( /* webpackChunkName:"member_store_solution" */ 'src/module/marketing_tools/member_store_solution');
const qRi3 = (resolve) =>import ( /* webpackChunkName:"mall_pro" */ 'src/module/marketing_tools/mall_pro');
const yIHs4 = (resolve) =>import ( /* webpackChunkName:"cooperating_partner" */ 'src/module/marketing_tools/cooperating_partner');
const xdx3 = (resolve) =>import ( /* webpackChunkName:"weixin_onfiguration" */ 'src/module/marketing_tools/weixin_onfiguration');
const sKpW4 = (resolve) =>import ( /* webpackChunkName:"activity_index" */ 'src/module/marketing_tools/new_activity/activity_index');
const DPU3 = (resolve) =>import ( /* webpackChunkName:"activity" */ 'src/module/marketing_tools/new_activity/activity');
const LXc3 = (resolve) =>import ( /* webpackChunkName:"activity_birth" */ 'src/module/marketing_tools/new_activity/activity_birth');
const qnu3 = (resolve) =>import ( /* webpackChunkName:"activity_custom" */ 'src/module/marketing_tools/new_activity/activity_custom');
const YlzmG5 = (resolve) =>import ( /* webpackChunkName:"activity_agift" */ 'src/module/marketing_tools/new_activity/activity_agift');
const aal3 = (resolve) =>import ( /* webpackChunkName:"activity_encourage" */ 'src/module/marketing_tools/new_activity/activity_encourage');
const bSmi4 = (resolve) =>import ( /* webpackChunkName:"activity_fission" */ 'src/module/marketing_tools/new_activity/activity_fission');
const DwFu4 = (resolve) =>import ( /* webpackChunkName:"activity_member" */ 'src/module/marketing_tools/new_activity/activity_member');
const aDPZf5 = (resolve) =>import ( /* webpackChunkName:"activity_fullReduction" */ 'src/module/marketing_tools/new_activity/activity_fullReduction');
const xWqcC5 = (resolve) =>import ( /* webpackChunkName:"coupon_redemption" */ 'src/module/marketing_tools/new_activity/coupon_redemption');
const hL2 = (resolve) =>import ( /* webpackChunkName:"activity_coupon" */ 'src/module/marketing_tools/new_activity/activity_coupon');
const Bs2 = (resolve) =>import ( /* webpackChunkName:"admin_config" */ 'src/module/marketing_tools/admin_config');
const TpiFO5 = (resolve) =>import ( /* webpackChunkName:"payment_configuration" */ 'src/module/marketing_tools/payment_configuration');
const VoXC4 = (resolve) =>import ( /* webpackChunkName:"sweepcode_pay" */ 'src/module/marketing_tools/sweepcode_pay');
const IHNh4 = (resolve) =>import ( /* webpackChunkName:"member_store_config" */ 'src/module/marketing_tools/member_store_config');
const bI2 = (resolve) =>import ( /* webpackChunkName:"template_switching" */ 'src/module/marketing_tools/template_switching');
const kX2 = (resolve) =>import ( /* webpackChunkName:"employee_manage" */ 'src/module/shop_config/employee_manage');
const MgD3 = (resolve) =>import ( /* webpackChunkName:"kitchen_model" */ 'src/module/shop_config/kitchen_model');
const MNE3 = (resolve) =>import ( /* webpackChunkName:"area_manage" */ 'src/module/shop_config/area_manage');
const rEhwT5 = (resolve) =>import ( /* webpackChunkName:"table_manage" */ 'src/module/shop_config/table_manage');
const fx2 = (resolve) =>import ( /* webpackChunkName:"integer_set" */ 'src/module/shop_config/integer_set');
const ILxL4 = (resolve) =>import ( /* webpackChunkName:"refund_food" */ 'src/module/shop_config/refund_food');
const vx2 = (resolve) =>import ( /* webpackChunkName:"good_sale" */ 'src/module/shop_config/good_sale');
const VftU4 = (resolve) =>import ( /* webpackChunkName:"shop_notice" */ 'src/module/shop_config/shop_notice');
const mN2 = (resolve) =>import ( /* webpackChunkName:"receivable_man" */ 'src/module/shop_config/receivable_man');
const socd4 = (resolve) =>import ( /* webpackChunkName:"reverse_reason" */ 'src/module/shop_config/reverse_reason');
const sbL3 = (resolve) =>import ( /* webpackChunkName:"service_fee" */ 'src/module/shop_config/service_fee');
const DVZ3 = (resolve) =>import ( /* webpackChunkName:"shop_number" */ 'src/module/shop_config/shop_number');
const gJ2 = (resolve) =>import ( /* webpackChunkName:"shuffling_pic" */ 'src/module/shop_config/shuffling_pic');
const cNti4 = (resolve) =>import ( /* webpackChunkName:"base" */ 'src/module/shop_config/base');
const iyR3 = (resolve) =>import ( /* webpackChunkName:"payment_way" */ 'src/module/shop_config/payment_way');
const PrWCs5 = (resolve) =>import ( /* webpackChunkName:"time_set" */ 'src/module/shop_config/time_set');
const BqXwU5 = (resolve) =>import ( /* webpackChunkName:"elemenu_manage" */ 'src/module/shop_config/elemenu_manage');
const jtm3 = (resolve) =>import ( /* webpackChunkName:"fast_selling" */ 'src/module/shop_config/fast_selling');
const FMU3 = (resolve) =>import ( /* webpackChunkName:"job_manage" */ 'src/module/shop_config/job_manage');
const nEJ3 = (resolve) =>import ( /* webpackChunkName:"printer_errors" */ 'src/module/shop_config/printer_errors');
const hmbje5 = (resolve) =>import ( /* webpackChunkName:"print_queue" */ 'src/module/shop_config/print_queue');
const flwvp5 = (resolve) =>import ( /* webpackChunkName:"printer_manager" */ 'src/module/shop_config/printer_manager');
const SVYk4 = (resolve) =>import ( /* webpackChunkName:"printer_config" */ 'src/module/shop_config/printer_config');
const ELi3 = (resolve) =>import ( /* webpackChunkName:"staff_config" */ 'src/module/brand_configuration/staff_config');
const PYO3 = (resolve) =>import ( /* webpackChunkName:"position_config" */ 'src/module/brand_configuration/position_config');
const cxL3 = (resolve) =>import ( /* webpackChunkName:"base_brand" */ 'src/module/brand_configuration/base_brand');
const iDJ3 = (resolve) =>import ( /* webpackChunkName:"pay_brand" */ 'src/module/brand_configuration/pay_brand');
const te2 = (resolve) =>import ( /* webpackChunkName:"shop_group" */ 'src/module/brand_configuration/shop_group');
const WNx3 = (resolve) =>import ( /* webpackChunkName:"bound_public_number" */ 'src/module/public_number_configuration/bound_public_number');
const Gp2 = (resolve) =>import ( /* webpackChunkName:"new_push_language_settings" */ 'src/module/public_number_configuration/new_push_language_settings');
const XtQt4 = (resolve) =>import ( /* webpackChunkName:"menu_set" */ 'src/module/public_number_configuration/menu_set');
const GYiuk5 = (resolve) =>import ( /* webpackChunkName:"small_program" */ 'src/module/public_number_configuration/program_config/small_program');
const RMdz4 = (resolve) =>import ( /* webpackChunkName:"module_set" */ 'src/module/public_number_configuration/module_set');
const fBep4 = (resolve) =>import ( /* webpackChunkName:"configuration_tutorial" */ 'src/module/public_number_configuration/configuration_tutorial');
const TJP3 = (resolve) =>import ( /* webpackChunkName:"warehouse_list" */ 'src/module/invoicing_system/warehouse_manage/warehouse_list');
const qVZGQ5 = (resolve) =>import ( /* webpackChunkName:"warehouse_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_detail');
const EKzY4 = (resolve) =>import ( /* webpackChunkName:"warehouse_create" */ 'src/module/invoicing_system/warehouse_manage/warehouse_create');
const oyh3 = (resolve) =>import ( /* webpackChunkName:"output_store" */ 'src/module/invoicing_system/warehouse_manage/output_store');
const LoO3 = (resolve) =>import ( /* webpackChunkName:"output_shipper" */ 'src/module/invoicing_system/warehouse_manage/output_shipper');
const hKoG4 = (resolve) =>import ( /* webpackChunkName:"output_select_goods" */ 'src/module/invoicing_system/warehouse_manage/output_select_goods');
const fRQcE5 = (resolve) =>import ( /* webpackChunkName:"change_area" */ 'src/module/invoicing_system/warehouse_manage/change_area');
const yC2 = (resolve) =>import ( /* webpackChunkName:"warehouse_change" */ 'src/module/invoicing_system/warehouse_manage/warehouse_change');
const ZNSk4 = (resolve) =>import ( /* webpackChunkName:"search_goods" */ 'src/module/invoicing_system/warehouse_manage/search_goods');
const UeZ3 = (resolve) =>import ( /* webpackChunkName:"warehouse_goods_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_goods_detail');
const sEv3 = (resolve) =>import ( /* webpackChunkName:"warehouse_material_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_material_detail');
const dB2 = (resolve) =>import ( /* webpackChunkName:"warehouse_operation_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_operation_detail');
const Ougwc5 = (resolve) =>import ( /* webpackChunkName:"operation" */ 'src/module/invoicing_system/warehouse_manage/operation');
const kxdsG5 = (resolve) =>import ( /* webpackChunkName:"operation_detail" */ 'src/module/invoicing_system/warehouse_manage/operation_detail');
const iCKh4 = (resolve) =>import ( /* webpackChunkName:"enter_goods" */ 'src/module/invoicing_system/warehouse_manage/enter_goods');
const ue2 = (resolve) =>import ( /* webpackChunkName:"picking_record" */ 'src/module/invoicing_system/picking_list/picking_record');
const FdxS4 = (resolve) =>import ( /* webpackChunkName:"picking" */ 'src/module/invoicing_system/picking_list/picking');
const UPc3 = (resolve) =>import ( /* webpackChunkName:"picker_details" */ 'src/module/invoicing_system/picking_list/picker_details');
const UAxD4 = (resolve) =>import ( /* webpackChunkName:"plate_details" */ 'src/module/invoicing_system/picking_list/plate_details');
const jPy3 = (resolve) =>import ( /* webpackChunkName:"plate_storage" */ 'src/module/invoicing_system/picking_list/plate_storage');
const gIIu4 = (resolve) =>import ( /* webpackChunkName:"scheduling_application_list" */ 'src/module/invoicing_system/warehouse_manage/scheduling_application_list');
const NTpd4 = (resolve) =>import ( /* webpackChunkName:"purchase_requisition" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition');
const VZl3 = (resolve) =>import ( /* webpackChunkName:"purchase_requisition_detail" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition_detail');
const SXL3 = (resolve) =>import ( /* webpackChunkName:"ware_import" */ 'src/module/invoicing_system/wareimport/ware_import');
const SHJR4 = (resolve) =>import ( /* webpackChunkName:"ware_prosperity" */ 'src/module/invoicing_system/wareimport/ware_prosperity');
const WK2 = (resolve) =>import ( /* webpackChunkName:"conclusion_list" */ 'src/module/invoicing_system/conclusion/conclusion_list');
const deZ3 = (resolve) =>import ( /* webpackChunkName:"shipment_verify" */ 'src/module/invoicing_system/conclusion/shipment_verify');
const GYoG4 = (resolve) =>import ( /* webpackChunkName:"batch_schedule" */ 'src/module/invoicing_system/conclusion/batch_schedule');
const Fkd3 = (resolve) =>import ( /* webpackChunkName:"new_schedule" */ 'src/module/invoicing_system/conclusion/new_schedule');
const kbgT4 = (resolve) =>import ( /* webpackChunkName:"select_dispatch" */ 'src/module/invoicing_system/warehouse_manage/select_dispatch');
const yoHo4 = (resolve) =>import ( /* webpackChunkName:"multiple_examine" */ 'src/module/invoicing_system/conclusion/multiple_examine');
const ZD2 = (resolve) =>import ( /* webpackChunkName:"bom_list" */ 'src/module/invoicing_system/invoicing/bom_list');
const np2 = (resolve) =>import ( /* webpackChunkName:"bom_create" */ 'src/module/invoicing_system/invoicing/bom_create');
const CxZ3 = (resolve) =>import ( /* webpackChunkName:"bom_change" */ 'src/module/invoicing_system/invoicing/bom_change');
const jOKD4 = (resolve) =>import ( /* webpackChunkName:"bom_detail" */ 'src/module/invoicing_system/invoicing/bom_detail');
const RLmWf5 = (resolve) =>import ( /* webpackChunkName:"inventory_management" */ 'src/module/invoicing_system/invoicing/inventory_management');
const JtRy4 = (resolve) =>import ( /* webpackChunkName:"invent_detail" */ 'src/module/invoicing_system/invoicing/invent_detail');
const htfJM5 = (resolve) =>import ( /* webpackChunkName:"supplies_detail" */ 'src/module/invoicing_system/invoicing/supplies_detail');
const vz2 = (resolve) =>import ( /* webpackChunkName:"invent_putstroage" */ 'src/module/invoicing_system/invoicing/invent_putstroage');
const jVrCH5 = (resolve) =>import ( /* webpackChunkName:"lose_manage" */ 'src/module/invoicing_system/invoicing/lose_manage');
const PCv3 = (resolve) =>import ( /* webpackChunkName:"materials_putin_storage" */ 'src/module/invoicing_system/invoicing/materials_putin_storage');
const jjL3 = (resolve) =>import ( /* webpackChunkName:"material_modify_batch" */ 'src/module/invoicing_system/invoicing/material_modify_batch');
const tEBG4 = (resolve) =>import ( /* webpackChunkName:"material_loss" */ 'src/module/invoicing_system/invoicing/material_loss');
const qnx3 = (resolve) =>import ( /* webpackChunkName:"revamp_unit" */ 'src/module/invoicing_system/invoicing/revamp_unit');
const UDG3 = (resolve) =>import ( /* webpackChunkName:"public_details" */ 'src/module/invoicing_system/invoicing/public_details');
const gp2 = (resolve) =>import ( /* webpackChunkName:"material_create" */ 'src/module/invoicing_system/warehouse_manage/material_create');
const GZMu4 = (resolve) =>import ( /* webpackChunkName:"material_edit" */ 'src/module/invoicing_system/warehouse_manage/material_edit');
const SFIw4 = (resolve) =>import ( /* webpackChunkName:"warehouse_count" */ 'src/module/invoicing_system/warehouse_manage/warehouse_count');
const kcx3 = (resolve) =>import ( /* webpackChunkName:"supbranch_detail" */ 'src/module/invoicing_system/invoicing/supbranch_detail');
const SQQa4 = (resolve) =>import ( /* webpackChunkName:"brand_assign_list" */ 'src/module/invoicing_system/brand_assign/brand_assign_list');
const Xv2 = (resolve) =>import ( /* webpackChunkName:"create_assign" */ 'src/module/invoicing_system/brand_assign/create_assign');
const tBp3 = (resolve) =>import ( /* webpackChunkName:"set_newjurisdiction" */ 'src/module/invoicing_system/brand_assign/set_newjurisdiction');
const eUF3 = (resolve) =>import ( /* webpackChunkName:"jurisdiction_record" */ 'src/module/invoicing_system/brand_assign/jurisdiction_record');
const KVD3 = (resolve) =>import ( /* webpackChunkName:"jurisdiction_detail" */ 'src/module/invoicing_system/brand_assign/jurisdiction_detail');
const pKO3 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const tNemq5 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const AI2 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const gom3 = (resolve) =>import ( /* webpackChunkName:"process_material_detail" */ 'src/module/invoicing_system/process/process_material_detail');
const pj2 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const Vfxy4 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const VuFA4 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const XKcyD5 = (resolve) =>import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail');
const wD2 = (resolve) =>import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail');
const YRXG4 = (resolve) =>import ( /* webpackChunkName:"goods_count" */ 'src/module/invoicing_system/invoicing/goods_count');
const Fv2 = (resolve) =>import ( /* webpackChunkName:"process_material_print" */ 'src/module/invoicing_system/process/process_material_print');
const SS2 = (resolve) =>import ( /* webpackChunkName:"process_material" */ 'src/module/invoicing_system/process/process_material');
const XNRg4 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch');
const DuqIK5 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch');
const ROw3 = (resolve) =>import ( /* webpackChunkName:"batch_log_print" */ 'src/module/invoicing_system/batch_log/batch_log_print');
const UtM3 = (resolve) =>import ( /* webpackChunkName:"batch_log_detail" */ 'src/module/invoicing_system/batch_log/batch_log_detail');
const uIHhx5 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch_detail" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch_detail');
const qsJD4 = (resolve) =>import ( /* webpackChunkName:"goods_total_log" */ 'src/module/invoicing_system/total_log/goods_total_log');
const yQg3 = (resolve) =>import ( /* webpackChunkName:"material_total_log" */ 'src/module/invoicing_system/total_log/material_total_log');
const kjRmK5 = (resolve) =>import ( /* webpackChunkName:"bom_consume_detail" */ 'src/module/invoicing_system/total_log/bom_consume_detail');
const bgZ3 = (resolve) =>import ( /* webpackChunkName:"goods_batch_total_log_detail" */ 'src/module/invoicing_system/total_log/goods_batch_total_log_detail');
const MAy3 = (resolve) =>import ( /* webpackChunkName:"check_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/check_material');
const grHmb5 = (resolve) =>import ( /* webpackChunkName:"add_goods" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_goods');
const qXXYq5 = (resolve) =>import ( /* webpackChunkName:"add_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_material');
const MmI3 = (resolve) =>import ( /* webpackChunkName:"supplier_configure" */ 'src/module/invoicing_system/warehouse_manage/supplier_configure');
const Evr3 = (resolve) =>import ( /* webpackChunkName:"supply_manage" */ 'src/module/invoicing_system/supply/supply_manage');
const XsCS4 = (resolve) =>import ( /* webpackChunkName:"wear_cause" */ 'src/module/invoicing_system/config_manage/wear_cause');
const ylVf4 = (resolve) =>import ( /* webpackChunkName:"off_cause" */ 'src/module/invoicing_system/config_manage/off_cause');
const us2 = (resolve) =>import ( /* webpackChunkName:"brand_list" */ 'src/module/invoicing_system/config_manage/brand_list');
const ZfqdW5 = (resolve) =>import ( /* webpackChunkName:"weigh_list" */ 'src/module/invoicing_system/config_manage/weigh_list');
const Srh3 = (resolve) =>import ( /* webpackChunkName:"shelf_list" */ 'src/module/invoicing_system/config_manage/shelf_list');
const Rw2 = (resolve) =>import ( /* webpackChunkName:"material_category_create" */ 'src/module/invoicing_system/warehouse_manage/material_category_create');
const zTBK4 = (resolve) =>import ( /* webpackChunkName:"unit_create" */ 'src/module/invoicing_system/warehouse_manage/unit_create');
const FsQ3 = (resolve) =>import ( /* webpackChunkName:"shelve_rule" */ 'src/module/invoicing_system/config_manage/shelve_rule');
const Lckc4 = (resolve) =>import ( /* webpackChunkName:"order_brand" */ 'src/module/statistics/order_brand');
const tIqdP5 = (resolve) =>import ( /* webpackChunkName:"takeaway_brand" */ 'src/module/statistics/takeaway_brand');
const Pyn3 = (resolve) =>import ( /* webpackChunkName:"order" */ 'src/module/statistics/order');
const uZ2 = (resolve) =>import ( /* webpackChunkName:"order_more" */ 'src/module/statistics/order_more');
const IcgJP5 = (resolve) =>import ( /* webpackChunkName:"order_detail" */ 'src/module/statistics/order_detail');
const aywe4 = (resolve) =>import ( /* webpackChunkName:"order_takeaway" */ 'src/module/statistics/order_takeaway');
const ryt3 = (resolve) =>import ( /* webpackChunkName:"order_constructions" */ 'src/module/statistics/order_constructions');
const lVY3 = (resolve) =>import ( /* webpackChunkName:"takeaway_one" */ 'src/module/statistics/takeaway_one');
const ynBk4 = (resolve) =>import ( /* webpackChunkName:"takeaway_more" */ 'src/module/statistics/takeaway_more');
const ac2 = (resolve) =>import ( /* webpackChunkName:"takeaway_detail" */ 'src/module/statistics/takeaway_detail');
const ikK3 = (resolve) =>import ( /* webpackChunkName:"order_proprietary" */ 'src/module/statistics/order_proprietary');
const aanD4 = (resolve) =>import ( /* webpackChunkName:"business" */ 'src/module/statistics/business');
const xdF3 = (resolve) =>import ( /* webpackChunkName:"category" */ 'src/module/statistics/category');
const Rcz3 = (resolve) =>import ( /* webpackChunkName:"single_goods" */ 'src/module/statistics/single_goods');
const ZQYF4 = (resolve) =>import ( /* webpackChunkName:"brand_order_bill" */ 'src/module/statistics/brand_order_bill');
const sKn3 = (resolve) =>import ( /* webpackChunkName:"handover" */ 'src/module/statistics/handover');
const Xje3 = (resolve) =>import ( /* webpackChunkName:"member_recharges" */ 'src/module/statistics/member_recharge/member_recharges');
const NFY3 = (resolve) =>import ( /* webpackChunkName:"delete" */ 'src/module/statistics/delete');
const wjOn4 = (resolve) =>import ( /* webpackChunkName:"return_goods" */ 'src/module/statistics/return_goods');
const Rhab4 = (resolve) =>import ( /* webpackChunkName:"single_stockstatics" */ 'src/module/statistics/single_stockstatics');
const lhONu5 = (resolve) =>import ( /* webpackChunkName:"export_template" */ 'src/module/statistics/export_template');
const XFUvo5 = (resolve) =>import ( /* webpackChunkName:"category_count" */ 'src/module/statistics/category_count');
const GiZ3 = (resolve) =>import ( /* webpackChunkName:"reservation" */ 'src/module/statistics/reservation');
const Ploq4 = (resolve) =>import ( /* webpackChunkName:"entity_card" */ 'src/module/statistics/entity_card');
const yQVW4 = (resolve) =>import ( /* webpackChunkName:"activity" */ 'src/module/statistics/activity');
const jf2 = (resolve) =>import ( /* webpackChunkName:"activity_detail" */ 'src/module/statistics/activity_detail');
const GalF4 = (resolve) =>import ( /* webpackChunkName:"free" */ 'src/module/statistics/free');
const JyrN4 = (resolve) =>import ( /* webpackChunkName:"change_price_record" */ 'src/module/statistics/change_price_record');
const HmU3 = (resolve) =>import ( /* webpackChunkName:"custom_statistics" */ 'src/module/statistics/custom_statistics');
const jch3 = (resolve) =>import ( /* webpackChunkName:"coupon_statistics" */ 'src/module/statistics/coupon_statistics');
const Swr3 = (resolve) =>import ( /* webpackChunkName:"citic_statements" */ 'src/module/statistics/citic_statements');
const IEBIb5 = (resolve) =>import ( /* webpackChunkName:"citic_statements_sh" */ 'src/module/statistics/citic_statements_sh');
const Rdf3 = (resolve) =>import ( /* webpackChunkName:"user_evaluation" */ 'src/module/statistics/user_evaluation');
const upHtr5 = (resolve) =>import ( /* webpackChunkName:"scancode_statistics" */ 'src/module/statistics/quick_payment_statistics/scancode_statistics');
const kUQR4 = (resolve) =>import ( /* webpackChunkName:"reverse_statics" */ 'src/module/statistics/reverse_statics');
const zB2 = (resolve) =>import ( /* webpackChunkName:"balance_record" */ 'src/module/statistics/balance_record');

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
                <router-view v-if="$route.meta.keepAlive" style = 'padding-bottom:20px;'/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" style = 'padding-bottom:20px;'/>
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
            children: [{"path":"cashierConfig","component":npDM4},{"path":"cashierAnslysis","component":jFW3},{"path":"ReportCategory","component":UD2},{"path":"NoBrand","component":JyDn4},{"path":"memberManagement","children":[{"path":"","component":qYvr4},{"path":"detail","component":FXjx4}],"component":details_con},{"path":"CardConsume","component":cGI3},{"path":"entityCardQuery","component":Kboi4},{"path":"memberSend","component":CxYF4},{"path":"integralRule","component":YUV3},{"path":"activateEntityCard","component":VAmfM5},{"path":"memberLabel","component":uEMhD5},{"path":"memberLevelManagement","component":iwcV4},{"path":"AssistantcoinsConfig","component":qZlh4},{"path":"Assistantusergroup","component":yKclY5},{"path":"Assistantfans","component":wIFV4},{"path":"Assistantstaff","component":HJ2},{"path":"Assistantverbaltrick","component":TQHP4},{"path":"Assistantusertag","component":GEj3},{"path":"Assistantuserlevel","component":HbKs4},{"path":"Assistantbuyconfig","component":Nr2},{"path":"Assistanthistory","children":[{"path":"","component":AW2},{"path":"detail","children":[{"path":"","component":uuHOA5},{"path":"record","children":[{"path":"","component":dN2},{"path":"recordDetail","component":FE2}],"component":details_con}],"component":details_con}],"component":details_con},{"path":"client","component":LMUYP5},{"path":"seller","component":fbeL4},{"path":"addCardType","component":tbLw4},{"path":"cardTypeList","component":LpnRk5},{"path":"cardTypeApp","component":vl2},{"path":"MemberCard","component":Vnt3},{"path":"MemberAnalysis","component":uk2},{"path":"Assistantgood","children":[{"path":"","component":ymtg4},{"path":"newgoods","component":stjQ4}],"component":details_con},{"path":"Assistantenchashment","component":wJWI4},{"path":"assistantComment","component":gMDpY5},{"path":"taskRules","component":pXk3},{"path":"Task","children":[{"path":"","component":mldVU5},{"path":"newmission","component":Rwr3}],"component":details_con},{"path":"storeOverview","component":vpEvt5},{"path":"goodsManager","component":lIw3},{"path":"attrManager","component":lrgvi5},{"path":"packageManager","component":LxOa4},{"path":"categoryManager","component":iB2},{"path":"inventoryManager","component":NKtQO5},{"path":"multiChannelMenu","component":IeZ3},{"path":"marker","component":Jffq4},{"path":"authorization","component":Lwj3},{"path":"printset","component":vkro4},{"path":"Dada","component":UOES4},{"path":"DadaConfig","component":iGg3},{"path":"addCoupon","children":[{"path":"","component":SQpH4},{"path":"breakCoupon","component":iOD3},{"path":"discountCoupon","component":TcF3},{"path":"giveCoupon","component":aps3},{"path":"vouchersCoupon","component":qLtt4},{"path":"intergralcardCoupon","component":linU4}],"component":details_con},{"path":"getCouponList","component":qMfof5},{"path":"integralMall","children":[{"path":"","component":gtQvW5},{"path":"addIntegralMall","children":[{"path":"","component":wuT3}],"component":details_con}],"component":details_con},{"path":"appointment","component":CPJSn5},{"path":"point","component":TjT3},{"path":"statisticsManagement","component":UxN3},{"path":"onlineOrderConfig","component":xxiai5},{"path":"square","component":cbl3},{"path":"memberStoredValueScheme","children":[{"path":"","component":ngBsw5},{"path":"solution","component":SU2}],"component":details_con},{"path":"promotionMaterial","component":qRi3},{"path":"cooperation","component":yIHs4},{"path":"weixinConfiguration","component":xdx3},{"path":"activity","children":[{"path":"","component":sKpW4},{"path":"generalActivity","children":[{"path":"","component":DPU3},{"path":"birth","component":LXc3},{"path":"custom","component":qnu3},{"path":"agift","component":YlzmG5},{"path":"encourage","component":aal3},{"path":"fission","component":bSmi4},{"path":"member","component":DwFu4},{"path":"fullreduce","component":aDPZf5}],"component":details_con},{"path":"couponActivity","children":[{"path":"","component":xWqcC5},{"path":"coupon","component":hL2}],"component":details_con}],"component":details_con},{"path":"adminConfig","component":Bs2},{"path":"CommentConfig","component":TpiFO5},{"path":"Scanpayconfig","component":VoXC4},{"path":"MemberValueConfig","component":IHNh4},{"path":"orderTemplateSwitch","component":bI2},{"path":"staffManager","component":kX2},{"path":"kitchen","component":MgD3},{"path":"areaManager","component":MNE3},{"path":"tableManager","component":rEhwT5},{"path":"PriceRule","component":fx2},{"path":"returnReason","component":ILxL4},{"path":"Startandsell","component":vx2},{"path":"notice","component":VftU4},{"path":"hangUpAccount","component":mN2},{"path":"reverseReason","component":socd4},{"path":"serviceChargeManager","component":sbL3},{"path":"shopNumber","component":DVZ3},{"path":"banner","component":gJ2},{"path":"openTime","component":cNti4},{"path":"Payment","component":iyR3},{"path":"citySettings","component":PrWCs5},{"path":"EleMenuManage","component":BqXwU5},{"path":"fastSelling","component":jtm3},{"path":"jobsManager","component":FMU3},{"path":"printerError","component":nEJ3},{"path":"printQueue","component":hmbje5},{"path":"printerManager","component":flwvp5},{"path":"printerConfig","component":SVYk4},{"path":"staffConfig","component":ELi3},{"path":"positionConfig","component":PYO3},{"path":"setting","component":cxL3},{"path":"paymentMethod","component":iDJ3},{"path":"storeArea","component":te2},{"path":"boundPublicNumber","component":WNx3},{"path":"pushLanguageSettings","component":Gp2},{"path":"menuSetting","component":XtQt4},{"path":"appletBinding","component":GYiuk5},{"path":"templateSetting","component":RMdz4},{"path":"configCourse","component":fBep4},{"path":"warehouseList","children":[{"path":"","component":TJP3},{"path":"warehouseDetail","component":qVZGQ5},{"path":"create","component":EKzY4},{"path":"outputStore","component":oyh3},{"path":"outputShipper","component":LoO3},{"path":"outputSelGoods","component":hKoG4},{"path":"changeArea","component":fRQcE5},{"path":"change","component":yC2},{"path":"searchGoods","component":ZNSk4},{"path":"warehouseGoodsDetail","component":UeZ3},{"path":"warehouseMaterialDetail","component":sEv3},{"path":"warehouseOperationDetail","component":dB2}],"component":details_con},{"path":"operation","children":[{"path":"","component":Ougwc5},{"path":"operationDetail","component":kxdsG5},{"path":"enterGoods","component":iCKh4}],"component":details_con},{"path":"pickingList","children":[{"path":"","component":ue2},{"path":"picking","component":FdxS4},{"path":"checkDetails","component":UPc3},{"path":"plateDetails","component":UAxD4},{"path":"plateStorage","component":jPy3}],"component":details_con},{"path":"schedulingApplication","children":[{"path":"","component":gIIu4},{"path":"purchaseRequisition","component":NTpd4},{"path":"purchaseRequisitionDetail","component":VZl3}],"component":details_con},{"path":"wareImport","children":[{"path":"","meta":{"keepAlive":true},"component":SXL3},{"path":"wareProsperity","component":SHJR4}],"component":details_con},{"path":"conclusionList","children":[{"path":"","meta":{"keepAlive":true},"component":WK2},{"path":"shipmentVerify","component":deZ3},{"path":"batchSchedule","component":GYoG4},{"path":"newSchedule","component":Fkd3},{"path":"selectDispatch","component":kbgT4},{"path":"multipleExamine","component":yoHo4}],"component":details_con},{"path":"bomList","children":[{"path":"","component":ZD2},{"path":"bomCreate","component":np2},{"path":"bomChange","component":CxZ3},{"path":"bomDetail","component":jOKD4}],"component":details_con},{"path":"inventoryManagement","children":[{"path":"","component":RLmWf5},{"path":"detail","component":JtRy4},{"path":"suppliesDetail","component":htfJM5},{"path":"putStroage","component":vz2},{"path":"loseManage","component":jVrCH5},{"path":"materialsPutinStorage","component":PCv3},{"path":"materialModifyBatch","component":jjL3},{"path":"materialLoss","component":tEBG4},{"path":"revampUnit","component":qnx3},{"path":"publicDetails","component":UDG3},{"path":"materialCreate","component":gp2},{"path":"materialEdit","component":GZMu4},{"path":"warehouseCount","component":SFIw4},{"path":"supbranchDetail","component":kcx3}],"component":details_con},{"path":"brandAssign","children":[{"path":"","component":SQQa4},{"path":"create","component":Xv2},{"path":"setNewjurisdiction","component":tBp3},{"path":"jurisdictionRecord","component":eUF3},{"path":"jurisdictionDetail","component":KVD3}],"component":details_con},{"path":"goodsCountHistory","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":pKO3},{"path":"materialCountHistory","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":tNemq5},{"path":"processHistory","children":[{"path":"","props":{"details_con":(route) => {                                    return {                                        tab: 3                                    };                                }},"component":AI2},{"path":"detail","component":gom3}],"component":details_con},{"path":"goodsCountTemplate","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":pj2},{"path":"materialCountTemplate","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":Vfxy4},{"path":"processTemplate","props":{"details_con":(route) => {                            return {                                tab: 3                            };                        }},"component":VuFA4},{"path":"goodsCountDetail","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":XKcyD5},{"path":"materialCountDetail","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":wD2},{"path":"goodsCount","component":YRXG4},{"path":"processMaterialPrint","component":Fv2},{"path":"processMaterial","component":SS2},{"path":"batchLog","children":[{"path":"","redirect":"batchLogDispatch"},{"path":"batchLogDispatch","alias":"","props":{"details_con":(route) => {                                    return {                                        tab: 1                                    };                                }},"component":XNRg4},{"path":"batchLogAudit","props":{"details_con":(route) => {                                    return {                                        tab: 2                                    };                                }},"component":DuqIK5},{"path":"batchLogPrint","meta":{"comName":"batchLogPrint"},"component":ROw3},{"path":"batchLogDetail","component":UtM3},{"path":"batchLogDispatchDetail","meta":{"comName":"batchLogDispatchDetail"},"component":uIHhx5}],"component":details_con},{"path":"goodsTotalLog","meta":{"keepAlive":true},"component":qsJD4},{"path":"materialTotalLog","meta":{"keepAlive":true},"component":yQg3},{"path":"bomConsumeDetail","component":kjRmK5},{"path":"goodsBatchTotalLogDetail","component":bgZ3},{"path":"materialCount","component":MAy3},{"path":"editGoodsCountTemplate","component":grHmb5},{"path":"editMaterialCountTemplate","component":qXXYq5},{"path":"supplierConfigure","component":MmI3},{"path":"supplierManagement","component":Evr3},{"path":"wearCause","component":XsCS4},{"path":"shelfReason","component":ylVf4},{"path":"brandList","component":us2},{"path":"weighGoodsList","component":ZfqdW5},{"path":"shelfManagement","component":Srh3},{"path":"materialCategory","component":Rw2},{"path":"materialUnitCreate","component":zTBK4},{"path":"shelveRule","component":FsQ3},{"path":"orderStatistics","children":[{"path":"","component":Lckc4},{"path":"takeawayBrand","component":tIqdP5},{"path":"orderOne","component":Pyn3},{"path":"orderMore","component":uZ2},{"path":"orderDetail","component":IcgJP5},{"path":"orderTakeaway","component":aywe4},{"path":"orderProprietary","component":ryt3},{"path":"takeawayOne","component":lVY3},{"path":"takeawayMore","component":ynBk4},{"path":"takeawayDetail","component":ac2},{"path":"orderProprietaryBrand","component":ikK3}],"component":details_con},{"path":"businessStatistics","component":aanD4},{"path":"categoryStatistics","component":xdF3},{"path":"singleStatistics","component":Rcz3},{"path":"OrderBillList","component":ZQYF4},{"path":"handover","component":sKn3},{"path":"memberRecharge","component":Xje3},{"path":"delOrder","component":NFY3},{"path":"returnGoods","component":wjOn4},{"path":"singleStockstatics","component":Rhab4},{"path":"exportTemplate","component":lhONu5},{"path":"categoryCount","component":XFUvo5},{"path":"reservationManager","component":GiZ3},{"path":"entityCardStatistics","component":Ploq4},{"path":"activityStatistics","children":[{"path":"","component":yQVW4},{"path":"detail","component":jf2}],"component":details_con},{"path":"freeGoods","component":GalF4},{"path":"changePriceRecord","component":JyrN4},{"path":"Customstatistics","component":HmU3},{"path":"Couponstatistics","component":jch3},{"path":"zhongxin","component":Swr3},{"path":"zxsh","component":IEBIb5},{"path":"Commentstatics","component":Rdf3},{"path":"Scanpaystatics","component":upHtr5},{"path":"reverseStatics","component":kUQR4},{"path":"balanceAdjustRecord","component":zB2}]
        }]
    }
];