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
const hyT3 = (resolve) =>import ( /* webpackChunkName:"cashier_config" */ 'src/module/cashier/cashier_config');
const XZLP4 = (resolve) =>import ( /* webpackChunkName:"cashier_anslysis" */ 'src/module/cashier/cashier_anslysis');
const TTOl4 = (resolve) =>import ( /* webpackChunkName:"cashier_category" */ 'src/module/cashier/cashier_category');
const KrIj4 = (resolve) =>import ( /* webpackChunkName:"membership_configuration" */ 'src/module/member_system/membership_configuration');
const oTJfy5 = (resolve) =>import ( /* webpackChunkName:"new_member_management" */ 'src/module/member_system/new_member_management');
const WLSdf5 = (resolve) =>import ( /* webpackChunkName:"member_manage_detail" */ 'src/module/member_system/member_manage_detail');
const pGJ3 = (resolve) =>import ( /* webpackChunkName:"transaction_enquiry" */ 'src/module/member_system/member_transaction_enquiry/transaction_enquiry');
const LXCKG5 = (resolve) =>import ( /* webpackChunkName:"card_queries" */ 'src/module/member_system/card_queries');
const xyW3 = (resolve) =>import ( /* webpackChunkName:"member_push_message" */ 'src/module/member_system/member_push_message');
const KqO3 = (resolve) =>import ( /* webpackChunkName:"intergral" */ 'src/module/member_system/intergral');
const yzgI4 = (resolve) =>import ( /* webpackChunkName:"card_activation" */ 'src/module/member_system/card_activation');
const knjQe5 = (resolve) =>import ( /* webpackChunkName:"member_label" */ 'src/module/member_system/member_label');
const gaa3 = (resolve) =>import ( /* webpackChunkName:"member_grade" */ 'src/module/member_system/member_grade');
const eZih4 = (resolve) =>import ( /* webpackChunkName:"gold_config" */ 'src/module/seller_assistant/gold_config');
const txXua5 = (resolve) =>import ( /* webpackChunkName:"user_groupings" */ 'src/module/seller_assistant/user_groupings');
const SobN4 = (resolve) =>import ( /* webpackChunkName:"vermicelli_list" */ 'src/module/seller_assistant/vermicelli_list');
const rhn3 = (resolve) =>import ( /* webpackChunkName:"worker_staff" */ 'src/module/seller_assistant/worker_staff');
const nPZp4 = (resolve) =>import ( /* webpackChunkName:"speech_config" */ 'src/module/seller_assistant/speech_config');
const Omn3 = (resolve) =>import ( /* webpackChunkName:"user_label" */ 'src/module/seller_assistant/user_label');
const cKB3 = (resolve) =>import ( /* webpackChunkName:"staff_level" */ 'src/module/seller_assistant/staff_level');
const aWyev5 = (resolve) =>import ( /* webpackChunkName:"rushed_configuration" */ 'src/module/seller_assistant/rushed_configuration');
const lF2 = (resolve) =>import ( /* webpackChunkName:"rushed_history" */ 'src/module/seller_assistant/rushed_history');
const iwmU4 = (resolve) =>import ( /* webpackChunkName:"rushed_history_detail" */ 'src/module/seller_assistant/rushed_history_detail');
const qdwPT5 = (resolve) =>import ( /* webpackChunkName:"rushed_record" */ 'src/module/seller_assistant/rushed_record');
const Uv2 = (resolve) =>import ( /* webpackChunkName:"rushed_record_detail" */ 'src/module/seller_assistant/rushed_record_detail');
const QBO3 = (resolve) =>import ( /* webpackChunkName:"ticketed_point_list" */ 'src/module/ticket_config/ticketed_point_list');
const hxarW5 = (resolve) =>import ( /* webpackChunkName:"sales_party" */ 'src/module/ticket_config/sales_party');
const DMbQ4 = (resolve) =>import ( /* webpackChunkName:"make_card" */ 'src/module/member_system/make_card');
const Zce3 = (resolve) =>import ( /* webpackChunkName:"card_type" */ 'src/module/member_system/card_type');
const avzO4 = (resolve) =>import ( /* webpackChunkName:"getapplied_entitycardlist" */ 'src/module/member_system/getapplied_entitycardlist');
const iZst4 = (resolve) =>import ( /* webpackChunkName:"membercard_import" */ 'src/module/member_system/membercard_import');
const UpUVL5 = (resolve) =>import ( /* webpackChunkName:"member_analysis" */ 'src/module/member_system/member_analysis');
const rGcG4 = (resolve) =>import ( /* webpackChunkName:"spiking_commodity" */ 'src/module/seller_assistant/spiking_commodity');
const pWV3 = (resolve) =>import ( /* webpackChunkName:"new_goods" */ 'src/module/seller_assistant/new_goods');
const Mqr3 = (resolve) =>import ( /* webpackChunkName:"user_comments" */ 'src/module/seller_assistant/user_comments');
const fRe3 = (resolve) =>import ( /* webpackChunkName:"user_withdrawal" */ 'src/module/seller_assistant/user_withdrawal');
const lOOw4 = (resolve) =>import ( /* webpackChunkName:"task_rules" */ 'src/module/seller_assistant/task_rules');
const zbYF4 = (resolve) =>import ( /* webpackChunkName:"mission_system" */ 'src/module/seller_assistant/mission_system');
const Rv2 = (resolve) =>import ( /* webpackChunkName:"addnew_mission" */ 'src/module/seller_assistant/addnew_mission');
const NnJ3 = (resolve) =>import ( /* webpackChunkName:"survey" */ 'src/module/home_page/survey');
const WZj3 = (resolve) =>import ( /* webpackChunkName:"details_con" */ 'src/module/goods_config/details_con');
const jJHvs5 = (resolve) =>import ( /* webpackChunkName:"attr_manager" */ 'src/module/goods_config/attr_manager');
const SQi3 = (resolve) =>import ( /* webpackChunkName:"package_manager" */ 'src/module/goods_config/package_manager');
const eJM3 = (resolve) =>import ( /* webpackChunkName:"category_manager" */ 'src/module/goods_config/category_manager');
const LIn3 = (resolve) =>import ( /* webpackChunkName:"invcontrol" */ 'src/module/goods_config/invcontrol');
const dMW3 = (resolve) =>import ( /* webpackChunkName:"more_menu" */ 'src/module/goods_config/more_menu');
const HiTf4 = (resolve) =>import ( /* webpackChunkName:"marker" */ 'src/module/goods_config/marker');
const HkYa4 = (resolve) =>import ( /* webpackChunkName:"retail_good" */ 'src/module/goods_config/retail_good');
const KPPv4 = (resolve) =>import ( /* webpackChunkName:"warrant" */ 'src/module/outfood/accredit/warrant');
const DHhe4 = (resolve) =>import ( /* webpackChunkName:"printer_takeaway" */ 'src/module/outfood/takeawayprint/printer_takeaway');
const jfCx4 = (resolve) =>import ( /* webpackChunkName:"binding_merchants" */ 'src/module/outfood/binding_merchants');
const AgAaC5 = (resolve) =>import ( /* webpackChunkName:"dada_distribution" */ 'src/module/outfood/dada/dada_distribution');
const hBc3 = (resolve) =>import ( /* webpackChunkName:"add_newcoupon" */ 'src/module/marketing_tools/new_coupons/add_newcoupon');
const lscK4 = (resolve) =>import ( /* webpackChunkName:"breaks_coupon" */ 'src/module/marketing_tools/new_coupons/breaks_coupon');
const BfP3 = (resolve) =>import ( /* webpackChunkName:"discount_coupon" */ 'src/module/marketing_tools/new_coupons/discount_coupon');
const XrQfp5 = (resolve) =>import ( /* webpackChunkName:"give_coupon" */ 'src/module/marketing_tools/new_coupons/give_coupon');
const HtQ3 = (resolve) =>import ( /* webpackChunkName:"vouchers_coupon" */ 'src/module/marketing_tools/new_coupons/vouchers_coupon');
const CU2 = (resolve) =>import ( /* webpackChunkName:"integralcard_coupon" */ 'src/module/marketing_tools/new_coupons/integralcard_coupon');
const tJl3 = (resolve) =>import ( /* webpackChunkName:"coupon_management" */ 'src/module/marketing_tools/coupon_management');
const pbY3 = (resolve) =>import ( /* webpackChunkName:"integral_mall" */ 'src/module/marketing_tools/integral/integral_mall');
const aLu3 = (resolve) =>import ( /* webpackChunkName:"configuration_reserve" */ 'src/module/marketing_tools/configuration_reserve');
const IQj3 = (resolve) =>import ( /* webpackChunkName:"integral_withdrawal" */ 'src/module/marketing_tools/integral_withdrawal');
const crQO4 = (resolve) =>import ( /* webpackChunkName:"statistics_management" */ 'src/module/marketing_tools/statistics_management');
const pv2 = (resolve) =>import ( /* webpackChunkName:"online_configuration" */ 'src/module/marketing_tools/online_configuration');
const SXJIo5 = (resolve) =>import ( /* webpackChunkName:"self_help_mode" */ 'src/module/marketing_tools/self_help_mode');
const GOc3 = (resolve) =>import ( /* webpackChunkName:"member_store" */ 'src/module/marketing_tools/member_store');
const YwGWD5 = (resolve) =>import ( /* webpackChunkName:"member_store_solution" */ 'src/module/marketing_tools/member_store_solution');
const QMQS4 = (resolve) =>import ( /* webpackChunkName:"mall_pro" */ 'src/module/marketing_tools/mall_pro');
const xlP3 = (resolve) =>import ( /* webpackChunkName:"cooperating_partner" */ 'src/module/marketing_tools/cooperating_partner');
const hOxs4 = (resolve) =>import ( /* webpackChunkName:"weixin_onfiguration" */ 'src/module/marketing_tools/weixin_onfiguration');
const dco3 = (resolve) =>import ( /* webpackChunkName:"activity_index" */ 'src/module/marketing_tools/new_activity/activity_index');
const rxaU4 = (resolve) =>import ( /* webpackChunkName:"activity" */ 'src/module/marketing_tools/new_activity/activity');
const TxFj4 = (resolve) =>import ( /* webpackChunkName:"activity_birth" */ 'src/module/marketing_tools/new_activity/activity_birth');
const aH2 = (resolve) =>import ( /* webpackChunkName:"activity_custom" */ 'src/module/marketing_tools/new_activity/activity_custom');
const ocKx4 = (resolve) =>import ( /* webpackChunkName:"activity_agift" */ 'src/module/marketing_tools/new_activity/activity_agift');
const SREQ4 = (resolve) =>import ( /* webpackChunkName:"activity_encourage" */ 'src/module/marketing_tools/new_activity/activity_encourage');
const FWN3 = (resolve) =>import ( /* webpackChunkName:"activity_fission" */ 'src/module/marketing_tools/new_activity/activity_fission');
const vte3 = (resolve) =>import ( /* webpackChunkName:"activity_member" */ 'src/module/marketing_tools/new_activity/activity_member');
const nxb3 = (resolve) =>import ( /* webpackChunkName:"activity_fullReduction" */ 'src/module/marketing_tools/new_activity/activity_fullReduction');
const LuS3 = (resolve) =>import ( /* webpackChunkName:"coupon_redemption" */ 'src/module/marketing_tools/new_activity/coupon_redemption');
const ERLX4 = (resolve) =>import ( /* webpackChunkName:"activity_coupon" */ 'src/module/marketing_tools/new_activity/activity_coupon');
const Jjw3 = (resolve) =>import ( /* webpackChunkName:"admin_config" */ 'src/module/marketing_tools/admin_config');
const OiZJf5 = (resolve) =>import ( /* webpackChunkName:"payment_configuration" */ 'src/module/marketing_tools/payment_configuration');
const XWay4 = (resolve) =>import ( /* webpackChunkName:"sweepcode_pay" */ 'src/module/marketing_tools/sweepcode_pay');
const PNwn4 = (resolve) =>import ( /* webpackChunkName:"member_store_config" */ 'src/module/marketing_tools/member_store_config');
const luK3 = (resolve) =>import ( /* webpackChunkName:"template_switching" */ 'src/module/marketing_tools/template_switching');
const Sd2 = (resolve) =>import ( /* webpackChunkName:"employee_manage" */ 'src/module/shop_config/employee_manage');
const NnCgF5 = (resolve) =>import ( /* webpackChunkName:"kitchen_model" */ 'src/module/shop_config/kitchen_model');
const JhmW4 = (resolve) =>import ( /* webpackChunkName:"area_manage" */ 'src/module/shop_config/area_manage');
const IIZtZ5 = (resolve) =>import ( /* webpackChunkName:"table_manage" */ 'src/module/shop_config/table_manage');
const eViL4 = (resolve) =>import ( /* webpackChunkName:"integer_set" */ 'src/module/shop_config/integer_set');
const VLuF4 = (resolve) =>import ( /* webpackChunkName:"refund_food" */ 'src/module/shop_config/refund_food');
const rZTVK5 = (resolve) =>import ( /* webpackChunkName:"good_sale" */ 'src/module/shop_config/good_sale');
const mGWn4 = (resolve) =>import ( /* webpackChunkName:"shop_notice" */ 'src/module/shop_config/shop_notice');
const fSjM4 = (resolve) =>import ( /* webpackChunkName:"receivable_man" */ 'src/module/shop_config/receivable_man');
const luW3 = (resolve) =>import ( /* webpackChunkName:"reverse_reason" */ 'src/module/shop_config/reverse_reason');
const VZH3 = (resolve) =>import ( /* webpackChunkName:"service_fee" */ 'src/module/shop_config/service_fee');
const sfjm4 = (resolve) =>import ( /* webpackChunkName:"shop_number" */ 'src/module/shop_config/shop_number');
const HhB3 = (resolve) =>import ( /* webpackChunkName:"shuffling_pic" */ 'src/module/shop_config/shuffling_pic');
const nNN3 = (resolve) =>import ( /* webpackChunkName:"base" */ 'src/module/shop_config/base');
const qrgB4 = (resolve) =>import ( /* webpackChunkName:"payment_way" */ 'src/module/shop_config/payment_way');
const vlF3 = (resolve) =>import ( /* webpackChunkName:"time_set" */ 'src/module/shop_config/time_set');
const Jugp4 = (resolve) =>import ( /* webpackChunkName:"elemenu_manage" */ 'src/module/shop_config/elemenu_manage');
const zM2 = (resolve) =>import ( /* webpackChunkName:"fast_selling" */ 'src/module/shop_config/fast_selling');
const fZUf4 = (resolve) =>import ( /* webpackChunkName:"job_manage" */ 'src/module/shop_config/job_manage');
const no2 = (resolve) =>import ( /* webpackChunkName:"printer_errors" */ 'src/module/shop_config/printer_errors');
const wHZT4 = (resolve) =>import ( /* webpackChunkName:"print_queue" */ 'src/module/shop_config/print_queue');
const WlP3 = (resolve) =>import ( /* webpackChunkName:"printer_manager" */ 'src/module/shop_config/printer_manager');
const jENKP5 = (resolve) =>import ( /* webpackChunkName:"printer_config" */ 'src/module/shop_config/printer_config');
const QCu3 = (resolve) =>import ( /* webpackChunkName:"staff_config" */ 'src/module/brand_configuration/staff_config');
const wfff4 = (resolve) =>import ( /* webpackChunkName:"position_config" */ 'src/module/brand_configuration/position_config');
const DaPB4 = (resolve) =>import ( /* webpackChunkName:"base_brand" */ 'src/module/brand_configuration/base_brand');
const OBTDi5 = (resolve) =>import ( /* webpackChunkName:"pay_brand" */ 'src/module/brand_configuration/pay_brand');
const MRXS4 = (resolve) =>import ( /* webpackChunkName:"shop_group" */ 'src/module/brand_configuration/shop_group');
const zh2 = (resolve) =>import ( /* webpackChunkName:"bound_public_number" */ 'src/module/public_number_configuration/bound_public_number');
const Ztx3 = (resolve) =>import ( /* webpackChunkName:"new_push_language_settings" */ 'src/module/public_number_configuration/new_push_language_settings');
const FSp3 = (resolve) =>import ( /* webpackChunkName:"menu_set" */ 'src/module/public_number_configuration/menu_set');
const ldS3 = (resolve) =>import ( /* webpackChunkName:"small_program_binding" */ 'src/module/public_number_configuration/small_program_binding');
const pkE3 = (resolve) =>import ( /* webpackChunkName:"module_set" */ 'src/module/public_number_configuration/module_set');
const IIZhF5 = (resolve) =>import ( /* webpackChunkName:"configuration_tutorial" */ 'src/module/public_number_configuration/configuration_tutorial');
const Jic3 = (resolve) =>import ( /* webpackChunkName:"warehouse_list" */ 'src/module/invoicing_system/warehouse_manage/warehouse_list');
const JNx3 = (resolve) =>import ( /* webpackChunkName:"warehouse_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_detail');
const Rds3 = (resolve) =>import ( /* webpackChunkName:"warehouse_create" */ 'src/module/invoicing_system/warehouse_manage/warehouse_create');
const bZbb4 = (resolve) =>import ( /* webpackChunkName:"output_store" */ 'src/module/invoicing_system/warehouse_manage/output_store');
const GVeR4 = (resolve) =>import ( /* webpackChunkName:"output_shipper" */ 'src/module/invoicing_system/warehouse_manage/output_shipper');
const JdIq4 = (resolve) =>import ( /* webpackChunkName:"output_select_goods" */ 'src/module/invoicing_system/warehouse_manage/output_select_goods');
const Gai3 = (resolve) =>import ( /* webpackChunkName:"change_area" */ 'src/module/invoicing_system/warehouse_manage/change_area');
const OUFIH5 = (resolve) =>import ( /* webpackChunkName:"warehouse_change" */ 'src/module/invoicing_system/warehouse_manage/warehouse_change');
const LXT3 = (resolve) =>import ( /* webpackChunkName:"search_goods" */ 'src/module/invoicing_system/warehouse_manage/search_goods');
const kfrE4 = (resolve) =>import ( /* webpackChunkName:"warehouse_goods_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_goods_detail');
const TULx4 = (resolve) =>import ( /* webpackChunkName:"warehouse_material_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_material_detail');
const Hot3 = (resolve) =>import ( /* webpackChunkName:"warehouse_operation_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_operation_detail');
const SXRrf5 = (resolve) =>import ( /* webpackChunkName:"operation" */ 'src/module/invoicing_system/warehouse_manage/operation');
const Uhc3 = (resolve) =>import ( /* webpackChunkName:"operation_detail" */ 'src/module/invoicing_system/warehouse_manage/operation_detail');
const xqOx4 = (resolve) =>import ( /* webpackChunkName:"enter_goods" */ 'src/module/invoicing_system/warehouse_manage/enter_goods');
const Fvbj4 = (resolve) =>import ( /* webpackChunkName:"picking_record" */ 'src/module/invoicing_system/picking_list/picking_record');
const cVE3 = (resolve) =>import ( /* webpackChunkName:"picking" */ 'src/module/invoicing_system/picking_list/picking');
const SXuj4 = (resolve) =>import ( /* webpackChunkName:"picker_details" */ 'src/module/invoicing_system/picking_list/picker_details');
const yML3 = (resolve) =>import ( /* webpackChunkName:"plate_details" */ 'src/module/invoicing_system/picking_list/plate_details');
const xGFR4 = (resolve) =>import ( /* webpackChunkName:"plate_storage" */ 'src/module/invoicing_system/picking_list/plate_storage');
const EKr3 = (resolve) =>import ( /* webpackChunkName:"scheduling_application_list" */ 'src/module/invoicing_system/warehouse_manage/scheduling_application_list');
const iGsH4 = (resolve) =>import ( /* webpackChunkName:"purchase_requisition" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition');
const hInfl5 = (resolve) =>import ( /* webpackChunkName:"purchase_requisition_detail" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition_detail');
const WFAom5 = (resolve) =>import ( /* webpackChunkName:"ware_import" */ 'src/module/invoicing_system/wareimport/ware_import');
const DR2 = (resolve) =>import ( /* webpackChunkName:"ware_prosperity" */ 'src/module/invoicing_system/wareimport/ware_prosperity');
const Rn2 = (resolve) =>import ( /* webpackChunkName:"conclusion_list" */ 'src/module/invoicing_system/conclusion/conclusion_list');
const wQeYS5 = (resolve) =>import ( /* webpackChunkName:"shipment_verify" */ 'src/module/invoicing_system/conclusion/shipment_verify');
const FwO3 = (resolve) =>import ( /* webpackChunkName:"new_schedule" */ 'src/module/invoicing_system/conclusion/new_schedule');
const ag2 = (resolve) =>import ( /* webpackChunkName:"bom_list" */ 'src/module/invoicing_system/invoicing/bom_list');
const Hh2 = (resolve) =>import ( /* webpackChunkName:"bom_create" */ 'src/module/invoicing_system/invoicing/bom_create');
const JgF3 = (resolve) =>import ( /* webpackChunkName:"bom_change" */ 'src/module/invoicing_system/invoicing/bom_change');
const xMyB4 = (resolve) =>import ( /* webpackChunkName:"bom_detail" */ 'src/module/invoicing_system/invoicing/bom_detail');
const pnwRZ5 = (resolve) =>import ( /* webpackChunkName:"inventory_management" */ 'src/module/invoicing_system/invoicing/inventory_management');
const zUn3 = (resolve) =>import ( /* webpackChunkName:"invent_detail" */ 'src/module/invoicing_system/invoicing/invent_detail');
const gQI3 = (resolve) =>import ( /* webpackChunkName:"supplies_detail" */ 'src/module/invoicing_system/invoicing/supplies_detail');
const SUy3 = (resolve) =>import ( /* webpackChunkName:"invent_putstroage" */ 'src/module/invoicing_system/invoicing/invent_putstroage');
const qUu3 = (resolve) =>import ( /* webpackChunkName:"lose_manage" */ 'src/module/invoicing_system/invoicing/lose_manage');
const owx3 = (resolve) =>import ( /* webpackChunkName:"materials_putin_storage" */ 'src/module/invoicing_system/invoicing/materials_putin_storage');
const DuYhU5 = (resolve) =>import ( /* webpackChunkName:"material_modify_batch" */ 'src/module/invoicing_system/invoicing/material_modify_batch');
const BhIRm5 = (resolve) =>import ( /* webpackChunkName:"material_loss" */ 'src/module/invoicing_system/invoicing/material_loss');
const hza3 = (resolve) =>import ( /* webpackChunkName:"revamp_unit" */ 'src/module/invoicing_system/invoicing/revamp_unit');
const OuI3 = (resolve) =>import ( /* webpackChunkName:"public_details" */ 'src/module/invoicing_system/invoicing/public_details');
const Rt2 = (resolve) =>import ( /* webpackChunkName:"material_create" */ 'src/module/invoicing_system/warehouse_manage/material_create');
const aBF3 = (resolve) =>import ( /* webpackChunkName:"material_edit" */ 'src/module/invoicing_system/warehouse_manage/material_edit');
const xgYm4 = (resolve) =>import ( /* webpackChunkName:"warehouse_count" */ 'src/module/invoicing_system/warehouse_manage/warehouse_count');
const paV3 = (resolve) =>import ( /* webpackChunkName:"brand_assign_list" */ 'src/module/invoicing_system/brand_assign/brand_assign_list');
const tmqr4 = (resolve) =>import ( /* webpackChunkName:"create_assign" */ 'src/module/invoicing_system/brand_assign/create_assign');
const kpv3 = (resolve) =>import ( /* webpackChunkName:"set_newjurisdiction" */ 'src/module/invoicing_system/brand_assign/set_newjurisdiction');
const rau3 = (resolve) =>import ( /* webpackChunkName:"jurisdiction_record" */ 'src/module/invoicing_system/brand_assign/jurisdiction_record');
const CNys4 = (resolve) =>import ( /* webpackChunkName:"jurisdiction_detail" */ 'src/module/invoicing_system/brand_assign/jurisdiction_detail');
const nFj3 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const OsS3 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const SHF3 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const nIE3 = (resolve) =>import ( /* webpackChunkName:"process_material_detail" */ 'src/module/invoicing_system/process/process_material_detail');
const Qkm3 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const VEYm4 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const hVI3 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const jJTfu5 = (resolve) =>import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail');
const psY3 = (resolve) =>import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail');
const luAc4 = (resolve) =>import ( /* webpackChunkName:"goods_count" */ 'src/module/invoicing_system/invoicing/goods_count');
const OshrH5 = (resolve) =>import ( /* webpackChunkName:"process_material_print" */ 'src/module/invoicing_system/process/process_material_print');
const gTK3 = (resolve) =>import ( /* webpackChunkName:"process_material" */ 'src/module/invoicing_system/process/process_material');
const tTY3 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch');
const edksQ5 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch');
const naVx4 = (resolve) =>import ( /* webpackChunkName:"batch_log_print" */ 'src/module/invoicing_system/batch_log/batch_log_print');
const kFb3 = (resolve) =>import ( /* webpackChunkName:"batch_log_detail" */ 'src/module/invoicing_system/batch_log/batch_log_detail');
const MjvG4 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch_detail" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch_detail');
const cjyp4 = (resolve) =>import ( /* webpackChunkName:"goods_total_log" */ 'src/module/invoicing_system/total_log/goods_total_log');
const fMOkb5 = (resolve) =>import ( /* webpackChunkName:"material_total_log" */ 'src/module/invoicing_system/total_log/material_total_log');
const IWXiC5 = (resolve) =>import ( /* webpackChunkName:"bom_consume_detail" */ 'src/module/invoicing_system/total_log/bom_consume_detail');
const Qj2 = (resolve) =>import ( /* webpackChunkName:"goods_batch_total_log_detail" */ 'src/module/invoicing_system/total_log/goods_batch_total_log_detail');
const mbWl4 = (resolve) =>import ( /* webpackChunkName:"check_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/check_material');
const pQD3 = (resolve) =>import ( /* webpackChunkName:"add_goods" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_goods');
const ao2 = (resolve) =>import ( /* webpackChunkName:"add_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_material');
const ZpB3 = (resolve) =>import ( /* webpackChunkName:"supplier_configure" */ 'src/module/invoicing_system/warehouse_manage/supplier_configure');
const Ky2 = (resolve) =>import ( /* webpackChunkName:"supply_manage" */ 'src/module/invoicing_system/supply/supply_manage');
const dnJlm5 = (resolve) =>import ( /* webpackChunkName:"wear_cause" */ 'src/module/invoicing_system/config_manage/wear_cause');
const PFb3 = (resolve) =>import ( /* webpackChunkName:"off_cause" */ 'src/module/invoicing_system/config_manage/off_cause');
const SsX3 = (resolve) =>import ( /* webpackChunkName:"brand_list" */ 'src/module/invoicing_system/config_manage/brand_list');
const pABQ4 = (resolve) =>import ( /* webpackChunkName:"weigh_list" */ 'src/module/invoicing_system/config_manage/weigh_list');
const snC3 = (resolve) =>import ( /* webpackChunkName:"shelf_list" */ 'src/module/invoicing_system/config_manage/shelf_list');
const lWP3 = (resolve) =>import ( /* webpackChunkName:"material_category_create" */ 'src/module/invoicing_system/warehouse_manage/material_category_create');
const qsta4 = (resolve) =>import ( /* webpackChunkName:"unit_create" */ 'src/module/invoicing_system/warehouse_manage/unit_create');
const gKE3 = (resolve) =>import ( /* webpackChunkName:"shelve_rule" */ 'src/module/invoicing_system/config_manage/shelve_rule');
const FQ2 = (resolve) =>import ( /* webpackChunkName:"order_brand" */ 'src/module/statistics/order_brand');
const vZH3 = (resolve) =>import ( /* webpackChunkName:"takeaway_brand" */ 'src/module/statistics/takeaway_brand');
const ubfaZ5 = (resolve) =>import ( /* webpackChunkName:"order" */ 'src/module/statistics/order');
const ErZ3 = (resolve) =>import ( /* webpackChunkName:"order_more" */ 'src/module/statistics/order_more');
const Tp2 = (resolve) =>import ( /* webpackChunkName:"order_detail" */ 'src/module/statistics/order_detail');
const BRFo4 = (resolve) =>import ( /* webpackChunkName:"order_takeaway" */ 'src/module/statistics/order_takeaway');
const kMeN4 = (resolve) =>import ( /* webpackChunkName:"order_constructions" */ 'src/module/statistics/order_constructions');
const PbO3 = (resolve) =>import ( /* webpackChunkName:"takeaway_one" */ 'src/module/statistics/takeaway_one');
const Cf2 = (resolve) =>import ( /* webpackChunkName:"takeaway_more" */ 'src/module/statistics/takeaway_more');
const ASIt4 = (resolve) =>import ( /* webpackChunkName:"takeaway_detail" */ 'src/module/statistics/takeaway_detail');
const FjHh4 = (resolve) =>import ( /* webpackChunkName:"order_proprietary" */ 'src/module/statistics/order_proprietary');
const eTa3 = (resolve) =>import ( /* webpackChunkName:"business" */ 'src/module/statistics/business');
const Yve3 = (resolve) =>import ( /* webpackChunkName:"category" */ 'src/module/statistics/category');
const kUrcv5 = (resolve) =>import ( /* webpackChunkName:"single_goods" */ 'src/module/statistics/single_goods');
const EM2 = (resolve) =>import ( /* webpackChunkName:"brand_order_bill" */ 'src/module/statistics/brand_order_bill');
const fkPR4 = (resolve) =>import ( /* webpackChunkName:"handover" */ 'src/module/statistics/handover');
const PKHI4 = (resolve) =>import ( /* webpackChunkName:"member_recharges" */ 'src/module/statistics/member_recharge/member_recharges');
const Nqsj4 = (resolve) =>import ( /* webpackChunkName:"delete" */ 'src/module/statistics/delete');
const rSH3 = (resolve) =>import ( /* webpackChunkName:"return_goods" */ 'src/module/statistics/return_goods');
const mPz3 = (resolve) =>import ( /* webpackChunkName:"single_stockstatics" */ 'src/module/statistics/single_stockstatics');
const NyTg4 = (resolve) =>import ( /* webpackChunkName:"export_template" */ 'src/module/statistics/export_template');
const om2 = (resolve) =>import ( /* webpackChunkName:"category_count" */ 'src/module/statistics/category_count');
const yBmw4 = (resolve) =>import ( /* webpackChunkName:"reservation" */ 'src/module/statistics/reservation');
const sxSA4 = (resolve) =>import ( /* webpackChunkName:"entity_card" */ 'src/module/statistics/entity_card');
const Ewmf4 = (resolve) =>import ( /* webpackChunkName:"activity" */ 'src/module/statistics/activity');
const Tnfo4 = (resolve) =>import ( /* webpackChunkName:"activity_detail" */ 'src/module/statistics/activity_detail');
const eLhN4 = (resolve) =>import ( /* webpackChunkName:"free" */ 'src/module/statistics/free');
const Xe2 = (resolve) =>import ( /* webpackChunkName:"change_price_record" */ 'src/module/statistics/change_price_record');
const KZw3 = (resolve) =>import ( /* webpackChunkName:"custom_statistics" */ 'src/module/statistics/custom_statistics');
const kIA3 = (resolve) =>import ( /* webpackChunkName:"coupon_statistics" */ 'src/module/statistics/coupon_statistics');
const khkW4 = (resolve) =>import ( /* webpackChunkName:"citic_statements" */ 'src/module/statistics/citic_statements');
const uY2 = (resolve) =>import ( /* webpackChunkName:"citic_statements_sh" */ 'src/module/statistics/citic_statements_sh');
const ewb3 = (resolve) =>import ( /* webpackChunkName:"user_evaluation" */ 'src/module/statistics/user_evaluation');
const mCgh4 = (resolve) =>import ( /* webpackChunkName:"scancode_statistics" */ 'src/module/statistics/quick_payment_statistics/scancode_statistics');
const Hrd3 = (resolve) =>import ( /* webpackChunkName:"reverse_statics" */ 'src/module/statistics/reverse_statics');
const fBhWc5 = (resolve) =>import ( /* webpackChunkName:"balance_record" */ 'src/module/statistics/balance_record');
const Fqrd4 = (resolve) =>import ( /* webpackChunkName:"custom_package_statistics" */ 'src/module/statistics/custom_package_statistics');

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
            children: [{"path":"cashierConfig","component":hyT3},{"path":"cashierAnslysis","component":XZLP4},{"path":"ReportCategory","component":TTOl4},{"path":"NoBrand","component":KrIj4},{"path":"memberManagement","children":[{"path":"","component":oTJfy5},{"path":"detail","component":WLSdf5}],"component":details_con},{"path":"CardConsume","component":pGJ3},{"path":"getCardList","component":LXCKG5},{"path":"memberSend","component":xyW3},{"path":"integralRule","component":KqO3},{"path":"activateEntityCard","component":yzgI4},{"path":"memberLabel","component":knjQe5},{"path":"memberLevelManagement","component":gaa3},{"path":"AssistantcoinsConfig","component":eZih4},{"path":"Assistantusergroup","component":txXua5},{"path":"Assistantfans","component":SobN4},{"path":"Assistantstaff","component":rhn3},{"path":"Assistantverbaltrick","component":nPZp4},{"path":"Assistantusertag","component":Omn3},{"path":"Assistantuserlevel","component":cKB3},{"path":"Assistantbuyconfig","component":aWyev5},{"path":"Assistanthistory","children":[{"path":"","component":lF2},{"path":"detail","children":[{"path":"","component":iwmU4},{"path":"record","children":[{"path":"","component":qdwPT5},{"path":"recordDetail","component":Uv2}],"component":details_con}],"component":details_con}],"component":details_con},{"path":"client","component":QBO3},{"path":"seller","component":hxarW5},{"path":"addCardType","component":DMbQ4},{"path":"cardTypeList","component":Zce3},{"path":"cardTypeApp","component":avzO4},{"path":"MemberCard","component":iZst4},{"path":"MemberAnalysis","component":UpUVL5},{"path":"Assistantgood","children":[{"path":"","component":rGcG4},{"path":"newgoods","component":pWV3}],"component":details_con},{"path":"Assistantenchashment","component":Mqr3},{"path":"assistantComment","component":fRe3},{"path":"taskRules","component":lOOw4},{"path":"Task","children":[{"path":"","component":zbYF4},{"path":"newmission","component":Rv2}],"component":details_con},{"path":"storeOverview","component":NnJ3},{"path":"goodsManager","component":WZj3},{"path":"attrManager","component":jJHvs5},{"path":"packageManager","component":SQi3},{"path":"categoryManager","component":eJM3},{"path":"inventoryManager","component":LIn3},{"path":"multiChannelMenu","component":dMW3},{"path":"marker","component":HiTf4},{"path":"retailGood","component":HkYa4},{"path":"authorization","component":KPPv4},{"path":"printset","component":DHhe4},{"path":"Dada","component":jfCx4},{"path":"DadaConfig","component":AgAaC5},{"path":"addCoupon","children":[{"path":"","component":hBc3},{"path":"breakCoupon","component":lscK4},{"path":"discountCoupon","component":BfP3},{"path":"giveCoupon","component":XrQfp5},{"path":"vouchersCoupon","component":HtQ3},{"path":"intergralcardCoupon","component":CU2}],"component":details_con},{"path":"getCouponList","component":tJl3},{"path":"integralMall","component":pbY3},{"path":"appointment","component":aLu3},{"path":"point","component":IQj3},{"path":"statisticsManagement","component":crQO4},{"path":"onlineOrderConfig","component":pv2},{"path":"square","component":SXJIo5},{"path":"memberStoredValueScheme","children":[{"path":"","component":GOc3},{"path":"solution","component":YwGWD5}],"component":details_con},{"path":"promotionMaterial","component":QMQS4},{"path":"cooperation","component":xlP3},{"path":"weixinConfiguration","component":hOxs4},{"path":"activity","children":[{"path":"","component":dco3},{"path":"generalActivity","children":[{"path":"","component":rxaU4},{"path":"birth","component":TxFj4},{"path":"custom","component":aH2},{"path":"agift","component":ocKx4},{"path":"encourage","component":SREQ4},{"path":"fission","component":FWN3},{"path":"member","component":vte3},{"path":"fullreduce","component":nxb3}],"component":details_con},{"path":"couponActivity","children":[{"path":"","component":LuS3},{"path":"coupon","component":ERLX4}],"component":details_con}],"component":details_con},{"path":"adminConfig","component":Jjw3},{"path":"CommentConfig","component":OiZJf5},{"path":"Scanpayconfig","component":XWay4},{"path":"MemberValueConfig","component":PNwn4},{"path":"orderTemplateSwitch","component":luK3},{"path":"staffManager","component":Sd2},{"path":"kitchen","component":NnCgF5},{"path":"areaManager","component":JhmW4},{"path":"tableManager","component":IIZtZ5},{"path":"PriceRule","component":eViL4},{"path":"returnReason","component":VLuF4},{"path":"Startandsell","component":rZTVK5},{"path":"notice","component":mGWn4},{"path":"hangUpAccount","component":fSjM4},{"path":"reverseReason","component":luW3},{"path":"serviceChargeManager","component":VZH3},{"path":"shopNumber","component":sfjm4},{"path":"banner","component":HhB3},{"path":"openTime","component":nNN3},{"path":"Payment","component":qrgB4},{"path":"citySettings","component":vlF3},{"path":"EleMenuManage","component":Jugp4},{"path":"fastSelling","component":zM2},{"path":"jobsManager","component":fZUf4},{"path":"printerError","component":no2},{"path":"printQueue","component":wHZT4},{"path":"printerManager","component":WlP3},{"path":"printerConfig","component":jENKP5},{"path":"staffConfig","component":QCu3},{"path":"positionConfig","component":wfff4},{"path":"setting","component":DaPB4},{"path":"paymentMethod","component":OBTDi5},{"path":"storeArea","component":MRXS4},{"path":"boundPublicNumber","component":zh2},{"path":"pushLanguageSettings","component":Ztx3},{"path":"menuSetting","component":FSp3},{"path":"appletBinding","component":ldS3},{"path":"templateSetting","component":pkE3},{"path":"configCourse","component":IIZhF5},{"path":"warehouseList","children":[{"path":"","component":Jic3},{"path":"warehouseDetail","component":JNx3},{"path":"create","component":Rds3},{"path":"outputStore","component":bZbb4},{"path":"outputShipper","component":GVeR4},{"path":"outputSelGoods","component":JdIq4},{"path":"changeArea","component":Gai3},{"path":"change","component":OUFIH5},{"path":"searchGoods","component":LXT3},{"path":"warehouseGoodsDetail","component":kfrE4},{"path":"warehouseMaterialDetail","component":TULx4},{"path":"warehouseOperationDetail","component":Hot3}],"component":details_con},{"path":"operation","children":[{"path":"","component":SXRrf5},{"path":"operationDetail","component":Uhc3},{"path":"enterGoods","component":xqOx4}],"component":details_con},{"path":"pickingList","children":[{"path":"","component":Fvbj4},{"path":"picking","component":cVE3},{"path":"checkDetails","component":SXuj4},{"path":"plateDetails","component":yML3},{"path":"plateStorage","component":xGFR4}],"component":details_con},{"path":"schedulingApplication","children":[{"path":"","component":EKr3},{"path":"purchaseRequisition","component":iGsH4},{"path":"purchaseRequisitionDetail","component":hInfl5}],"component":details_con},{"path":"wareImport","children":[{"path":"","component":WFAom5},{"path":"wareProsperity","component":DR2}],"component":details_con},{"path":"conclusionList","children":[{"path":"","component":Rn2},{"path":"shipmentVerify","component":wQeYS5},{"path":"newSchedule","component":FwO3}],"component":details_con},{"path":"bomList","children":[{"path":"","component":ag2},{"path":"bomCreate","component":Hh2},{"path":"bomChange","component":JgF3},{"path":"bomDetail","component":xMyB4}],"component":details_con},{"path":"inventoryManagement","children":[{"path":"","component":pnwRZ5},{"path":"detail","component":zUn3},{"path":"suppliesDetail","component":gQI3},{"path":"putStroage","component":SUy3},{"path":"loseManage","component":qUu3},{"path":"materialsPutinStorage","component":owx3},{"path":"materialModifyBatch","component":DuYhU5},{"path":"materialLoss","component":BhIRm5},{"path":"revampUnit","component":hza3},{"path":"publicDetails","component":OuI3},{"path":"materialCreate","component":Rt2},{"path":"materialEdit","component":aBF3},{"path":"warehouseCount","component":xgYm4}],"component":details_con},{"path":"brandAssign","children":[{"path":"","component":paV3},{"path":"create","component":tmqr4},{"path":"setNewjurisdiction","component":kpv3},{"path":"jurisdictionRecord","component":rau3},{"path":"jurisdictionDetail","component":CNys4}],"component":details_con},{"path":"goodsCountHistory","props":{"details_con":(route) => {            return {                tab: 1            };        }},"component":nFj3},{"path":"materialCountHistory","props":{"details_con":(route) => {            return {                tab: 2            };        }},"component":OsS3},{"path":"processHistory","children":[{"path":"","props":{"details_con":(route) => {                return {                    tab: 3                };            }},"component":SHF3},{"path":"detail","component":nIE3}],"component":details_con},{"path":"goodsCountTemplate","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":Qkm3},{"path":"materialCountTemplate","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":VEYm4},{"path":"processTemplate","props":{"details_con":(route) => {                            return { tab: 3};                        }},"component":hVI3},{"path":"goodsCountDetail","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":jJTfu5},{"path":"materialCountDetail","props":{"details_con":(route) => {            return {                tab: 2            };        }},"component":psY3},{"path":"goodsCount","component":luAc4},{"path":"processMaterialPrint","component":OshrH5},{"path":"processMaterial","component":gTK3},{"path":"batchLog","children":[{"path":"","redirect":"batchLogDispatch"},{"path":"batchLogDispatch","alias":"","props":{"details_con":(route) => {                                    return {                                        tab: 1                                    };                                }},"component":tTY3},{"path":"batchLogAudit","props":{"details_con":(route) => {                                    return {                                        tab: 2                                    };                                }},"component":edksQ5},{"path":"batchLogPrint","meta":{"comName":"batchLogPrint"},"component":naVx4},{"path":"batchLogDetail","component":kFb3},{"path":"batchLogDispatchDetail","meta":{"comName":"batchLogDispatchDetail"},"component":MjvG4}],"component":details_con},{"path":"goodsTotalLog","meta":{"keepAlive":true},"component":cjyp4},{"path":"materialTotalLog","meta":{"keepAlive":true},"component":fMOkb5},{"path":"bomConsumeDetail","component":IWXiC5},{"path":"goodsBatchTotalLogDetail","component":Qj2},{"path":"materialCount","component":mbWl4},{"path":"editGoodsCountTemplate","component":pQD3},{"path":"editMaterialCountTemplate","component":ao2},{"path":"supplierConfigure","component":ZpB3},{"path":"supplierManagement","component":Ky2},{"path":"wearCause","component":dnJlm5},{"path":"shelfReason","component":PFb3},{"path":"brandList","component":SsX3},{"path":"weighGoodsList","component":pABQ4},{"path":"shelfManagement","component":snC3},{"path":"materialCategory","component":lWP3},{"path":"materialUnitCreate","component":qsta4},{"path":"shelveRule","component":gKE3},{"path":"orderStatistics","children":[{"path":"","component":FQ2},{"path":"takeawayBrand","component":vZH3},{"path":"orderOne","component":ubfaZ5},{"path":"orderMore","component":ErZ3},{"path":"orderDetail","component":Tp2},{"path":"orderTakeaway","component":BRFo4},{"path":"orderProprietary","component":kMeN4},{"path":"takeawayOne","component":PbO3},{"path":"takeawayMore","component":Cf2},{"path":"takeawayDetail","component":ASIt4},{"path":"orderProprietaryBrand","component":FjHh4}],"component":details_con},{"path":"businessStatistics","component":eTa3},{"path":"categoryStatistics","component":Yve3},{"path":"singleStatistics","component":kUrcv5},{"path":"OrderBillList","component":EM2},{"path":"handover","component":fkPR4},{"path":"memberRecharge","component":PKHI4},{"path":"delOrder","component":Nqsj4},{"path":"returnGoods","component":rSH3},{"path":"singleStockstatics","component":mPz3},{"path":"exportTemplate","component":NyTg4},{"path":"categoryCount","component":om2},{"path":"reservationManager","component":yBmw4},{"path":"entityCardStatistics","component":sxSA4},{"path":"activityStatistics","children":[{"path":"","component":Ewmf4},{"path":"detail","component":Tnfo4}],"component":details_con},{"path":"freeGoods","component":eLhN4},{"path":"changePriceRecord","component":Xe2},{"path":"Customstatistics","component":KZw3},{"path":"Couponstatistics","component":kIA3},{"path":"zhongxin","component":khkW4},{"path":"zxsh","component":uY2},{"path":"Commentstatics","component":ewb3},{"path":"Scanpaystatics","component":mCgh4},{"path":"reverseStatics","component":Hrd3},{"path":"balanceAdjustRecord","component":fBhWc5},{"path":"customPackageStatistics","component":Fqrd4}]
        }]
    }
];