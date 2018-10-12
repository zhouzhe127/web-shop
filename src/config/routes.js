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
const zRqZ4 = (resolve) =>import ( /* webpackChunkName:"cashier_config" */ 'src/module/cashier/cashier_config');
const qfIY4 = (resolve) =>import ( /* webpackChunkName:"cashier_anslysis" */ 'src/module/cashier/cashier_anslysis');
const uTB3 = (resolve) =>import ( /* webpackChunkName:"cashier_category" */ 'src/module/cashier/cashier_category');
const vvo3 = (resolve) =>import ( /* webpackChunkName:"membership_configuration" */ 'src/module/member_system/membership_configuration');
const ubvz4 = (resolve) =>import ( /* webpackChunkName:"new_member_management" */ 'src/module/member_system/new_member_management');
const lVk3 = (resolve) =>import ( /* webpackChunkName:"member_manage_detail" */ 'src/module/member_system/member_manage_detail');
const efdP4 = (resolve) =>import ( /* webpackChunkName:"transaction_enquiry" */ 'src/module/member_system/member_transaction_enquiry/transaction_enquiry');
const taEMj5 = (resolve) =>import ( /* webpackChunkName:"card_queries" */ 'src/module/member_system/card_queries');
const gVi3 = (resolve) =>import ( /* webpackChunkName:"member_push_message" */ 'src/module/member_system/member_push_message');
const jaWIr5 = (resolve) =>import ( /* webpackChunkName:"intergral" */ 'src/module/member_system/intergral');
const xUyk4 = (resolve) =>import ( /* webpackChunkName:"card_activation" */ 'src/module/member_system/card_activation');
const yJB3 = (resolve) =>import ( /* webpackChunkName:"member_label" */ 'src/module/member_system/member_label');
const Zqt3 = (resolve) =>import ( /* webpackChunkName:"member_grade" */ 'src/module/member_system/member_grade');
const rRoX4 = (resolve) =>import ( /* webpackChunkName:"gold_config" */ 'src/module/seller_assistant/gold_config');
const Xy2 = (resolve) =>import ( /* webpackChunkName:"user_groupings" */ 'src/module/seller_assistant/user_groupings');
const KJ2 = (resolve) =>import ( /* webpackChunkName:"vermicelli_list" */ 'src/module/seller_assistant/vermicelli_list');
const hJkN4 = (resolve) =>import ( /* webpackChunkName:"worker_staff" */ 'src/module/seller_assistant/worker_staff');
const Tdi3 = (resolve) =>import ( /* webpackChunkName:"speech_config" */ 'src/module/seller_assistant/speech_config');
const LTB3 = (resolve) =>import ( /* webpackChunkName:"user_label" */ 'src/module/seller_assistant/user_label');
const IZvaV5 = (resolve) =>import ( /* webpackChunkName:"staff_level" */ 'src/module/seller_assistant/staff_level');
const cxtr4 = (resolve) =>import ( /* webpackChunkName:"rushed_configuration" */ 'src/module/seller_assistant/rushed_configuration');
const Ym2 = (resolve) =>import ( /* webpackChunkName:"rushed_history" */ 'src/module/seller_assistant/rushed_history');
const yIY3 = (resolve) =>import ( /* webpackChunkName:"rushed_history_detail" */ 'src/module/seller_assistant/rushed_history_detail');
const kpO3 = (resolve) =>import ( /* webpackChunkName:"rushed_record" */ 'src/module/seller_assistant/rushed_record');
const YExY4 = (resolve) =>import ( /* webpackChunkName:"rushed_record_detail" */ 'src/module/seller_assistant/rushed_record_detail');
const pZx3 = (resolve) =>import ( /* webpackChunkName:"ticketed_point_list" */ 'src/module/ticket_config/ticketed_point_list');
const foY3 = (resolve) =>import ( /* webpackChunkName:"sales_party" */ 'src/module/ticket_config/sales_party');
const PkRb4 = (resolve) =>import ( /* webpackChunkName:"make_card" */ 'src/module/member_system/make_card');
const uW2 = (resolve) =>import ( /* webpackChunkName:"card_type" */ 'src/module/member_system/card_type');
const nQAK4 = (resolve) =>import ( /* webpackChunkName:"getapplied_entitycardlist" */ 'src/module/member_system/getapplied_entitycardlist');
const Nhx3 = (resolve) =>import ( /* webpackChunkName:"membercard_import" */ 'src/module/member_system/membercard_import');
const NgqD4 = (resolve) =>import ( /* webpackChunkName:"member_analysis" */ 'src/module/member_system/member_analysis');
const ja2 = (resolve) =>import ( /* webpackChunkName:"spiking_commodity" */ 'src/module/seller_assistant/spiking_commodity');
const kgH3 = (resolve) =>import ( /* webpackChunkName:"new_goods" */ 'src/module/seller_assistant/new_goods');
const bHBQ4 = (resolve) =>import ( /* webpackChunkName:"user_comments" */ 'src/module/seller_assistant/user_comments');
const UGhE4 = (resolve) =>import ( /* webpackChunkName:"user_withdrawal" */ 'src/module/seller_assistant/user_withdrawal');
const BGtCQ5 = (resolve) =>import ( /* webpackChunkName:"task_rules" */ 'src/module/seller_assistant/task_rules');
const OQ2 = (resolve) =>import ( /* webpackChunkName:"mission_system" */ 'src/module/seller_assistant/mission_system');
const wmux4 = (resolve) =>import ( /* webpackChunkName:"addnew_mission" */ 'src/module/seller_assistant/addnew_mission');
const CT2 = (resolve) =>import ( /* webpackChunkName:"survey" */ 'src/module/home_page/survey');
const FVGv4 = (resolve) =>import ( /* webpackChunkName:"details_con" */ 'src/module/goods_config/details_con');
const EFQDv5 = (resolve) =>import ( /* webpackChunkName:"attr_manager" */ 'src/module/goods_config/attr_manager');
const ijlhE5 = (resolve) =>import ( /* webpackChunkName:"package_manager" */ 'src/module/goods_config/package_manager');
const PDed4 = (resolve) =>import ( /* webpackChunkName:"category_manager" */ 'src/module/goods_config/category_manager');
const pOEGp5 = (resolve) =>import ( /* webpackChunkName:"invcontrol" */ 'src/module/goods_config/invcontrol');
const SChO4 = (resolve) =>import ( /* webpackChunkName:"more_menu" */ 'src/module/goods_config/more_menu');
const Wpbj4 = (resolve) =>import ( /* webpackChunkName:"marker" */ 'src/module/goods_config/marker');
const Uj2 = (resolve) =>import ( /* webpackChunkName:"warrant" */ 'src/module/outfood/accredit/warrant');
const mtlbt5 = (resolve) =>import ( /* webpackChunkName:"printer_takeaway" */ 'src/module/outfood/takeawayprint/printer_takeaway');
const RTVlw5 = (resolve) =>import ( /* webpackChunkName:"binding_merchants" */ 'src/module/outfood/binding_merchants');
const hTp3 = (resolve) =>import ( /* webpackChunkName:"dada_distribution" */ 'src/module/outfood/dada/dada_distribution');
const SMs3 = (resolve) =>import ( /* webpackChunkName:"add_newcoupon" */ 'src/module/marketing_tools/new_coupons/add_newcoupon');
const dsay4 = (resolve) =>import ( /* webpackChunkName:"breaks_coupon" */ 'src/module/marketing_tools/new_coupons/breaks_coupon');
const aYn3 = (resolve) =>import ( /* webpackChunkName:"discount_coupon" */ 'src/module/marketing_tools/new_coupons/discount_coupon');
const IuTz4 = (resolve) =>import ( /* webpackChunkName:"give_coupon" */ 'src/module/marketing_tools/new_coupons/give_coupon');
const yVKI4 = (resolve) =>import ( /* webpackChunkName:"vouchers_coupon" */ 'src/module/marketing_tools/new_coupons/vouchers_coupon');
const aY2 = (resolve) =>import ( /* webpackChunkName:"integralcard_coupon" */ 'src/module/marketing_tools/new_coupons/integralcard_coupon');
const rEz3 = (resolve) =>import ( /* webpackChunkName:"coupon_management" */ 'src/module/marketing_tools/coupon_management');
const gVy3 = (resolve) =>import ( /* webpackChunkName:"integral_mall" */ 'src/module/marketing_tools/integral/integral_mall');
const LyM3 = (resolve) =>import ( /* webpackChunkName:"addOredintegral" */ 'src/module/marketing_tools/integral/addOredintegral');
const nfow4 = (resolve) =>import ( /* webpackChunkName:"configuration_reserve" */ 'src/module/marketing_tools/configuration_reserve');
const sap3 = (resolve) =>import ( /* webpackChunkName:"integral_withdrawal" */ 'src/module/marketing_tools/integral_withdrawal');
const NTDbL5 = (resolve) =>import ( /* webpackChunkName:"statistics_management" */ 'src/module/marketing_tools/statistics_management');
const YI2 = (resolve) =>import ( /* webpackChunkName:"online_configuration" */ 'src/module/marketing_tools/online_configuration');
const Ws2 = (resolve) =>import ( /* webpackChunkName:"self_help_mode" */ 'src/module/marketing_tools/self_help/self_help_mode');
const lwEs4 = (resolve) =>import ( /* webpackChunkName:"member_store" */ 'src/module/marketing_tools/member_store');
const lla3 = (resolve) =>import ( /* webpackChunkName:"member_store_solution" */ 'src/module/marketing_tools/member_store_solution');
const Sjic4 = (resolve) =>import ( /* webpackChunkName:"mall_pro" */ 'src/module/marketing_tools/mall_pro');
const CgG3 = (resolve) =>import ( /* webpackChunkName:"cooperating_partner" */ 'src/module/marketing_tools/cooperating_partner');
const Yx2 = (resolve) =>import ( /* webpackChunkName:"weixin_onfiguration" */ 'src/module/marketing_tools/weixin_onfiguration');
const dyA3 = (resolve) =>import ( /* webpackChunkName:"activity_index" */ 'src/module/marketing_tools/new_activity/activity_index');
const EBubr5 = (resolve) =>import ( /* webpackChunkName:"activity" */ 'src/module/marketing_tools/new_activity/activity');
const uD2 = (resolve) =>import ( /* webpackChunkName:"activity_birth" */ 'src/module/marketing_tools/new_activity/activity_birth');
const HwR3 = (resolve) =>import ( /* webpackChunkName:"activity_custom" */ 'src/module/marketing_tools/new_activity/activity_custom');
const CupNO5 = (resolve) =>import ( /* webpackChunkName:"activity_agift" */ 'src/module/marketing_tools/new_activity/activity_agift');
const dhrg4 = (resolve) =>import ( /* webpackChunkName:"activity_encourage" */ 'src/module/marketing_tools/new_activity/activity_encourage');
const bXVsJ5 = (resolve) =>import ( /* webpackChunkName:"activity_fission" */ 'src/module/marketing_tools/new_activity/activity_fission');
const aJ2 = (resolve) =>import ( /* webpackChunkName:"activity_member" */ 'src/module/marketing_tools/new_activity/activity_member');
const UBUn4 = (resolve) =>import ( /* webpackChunkName:"activity_fullReduction" */ 'src/module/marketing_tools/new_activity/activity_fullReduction');
const wj2 = (resolve) =>import ( /* webpackChunkName:"coupon_redemption" */ 'src/module/marketing_tools/new_activity/coupon_redemption');
const oE2 = (resolve) =>import ( /* webpackChunkName:"activity_coupon" */ 'src/module/marketing_tools/new_activity/activity_coupon');
const PFVHy5 = (resolve) =>import ( /* webpackChunkName:"admin_config" */ 'src/module/marketing_tools/admin_config');
const Jqax4 = (resolve) =>import ( /* webpackChunkName:"payment_configuration" */ 'src/module/marketing_tools/payment_configuration');
const yi2 = (resolve) =>import ( /* webpackChunkName:"sweepcode_pay" */ 'src/module/marketing_tools/sweepcode_pay');
const YP2 = (resolve) =>import ( /* webpackChunkName:"member_store_config" */ 'src/module/marketing_tools/member_store_config');
const UxCWJ5 = (resolve) =>import ( /* webpackChunkName:"template_switching" */ 'src/module/marketing_tools/template_switching');
const vx2 = (resolve) =>import ( /* webpackChunkName:"employee_manage" */ 'src/module/shop_config/employee_manage');
const olPX4 = (resolve) =>import ( /* webpackChunkName:"kitchen_model" */ 'src/module/shop_config/kitchen_model');
const DbQm4 = (resolve) =>import ( /* webpackChunkName:"area_manage" */ 'src/module/shop_config/area_manage');
const kVUPO5 = (resolve) =>import ( /* webpackChunkName:"table_manage" */ 'src/module/shop_config/table_manage');
const XC2 = (resolve) =>import ( /* webpackChunkName:"integer_set" */ 'src/module/shop_config/integer_set');
const NKc3 = (resolve) =>import ( /* webpackChunkName:"refund_food" */ 'src/module/shop_config/refund_food');
const OVPLl5 = (resolve) =>import ( /* webpackChunkName:"good_sale" */ 'src/module/shop_config/good_sale');
const VHu3 = (resolve) =>import ( /* webpackChunkName:"shop_notice" */ 'src/module/shop_config/shop_notice');
const YlmF4 = (resolve) =>import ( /* webpackChunkName:"receivable_man" */ 'src/module/shop_config/receivable_man');
const LyLG4 = (resolve) =>import ( /* webpackChunkName:"reverse_reason" */ 'src/module/shop_config/reverse_reason');
const twGcG5 = (resolve) =>import ( /* webpackChunkName:"service_fee" */ 'src/module/shop_config/service_fee');
const ktDZ4 = (resolve) =>import ( /* webpackChunkName:"shop_number" */ 'src/module/shop_config/shop_number');
const trJO4 = (resolve) =>import ( /* webpackChunkName:"shuffling_pic" */ 'src/module/shop_config/shuffling_pic');
const XiC3 = (resolve) =>import ( /* webpackChunkName:"base" */ 'src/module/shop_config/base');
const XOzQ4 = (resolve) =>import ( /* webpackChunkName:"payment_way" */ 'src/module/shop_config/payment_way');
const cTtcY5 = (resolve) =>import ( /* webpackChunkName:"time_set" */ 'src/module/shop_config/time_set');
const hPRR4 = (resolve) =>import ( /* webpackChunkName:"elemenu_manage" */ 'src/module/shop_config/elemenu_manage');
const UQMs4 = (resolve) =>import ( /* webpackChunkName:"fast_selling" */ 'src/module/shop_config/fast_selling');
const BEy3 = (resolve) =>import ( /* webpackChunkName:"job_manage" */ 'src/module/shop_config/job_manage');
const cek3 = (resolve) =>import ( /* webpackChunkName:"printer_errors" */ 'src/module/shop_config/printer_errors');
const oDF3 = (resolve) =>import ( /* webpackChunkName:"print_queue" */ 'src/module/shop_config/print_queue');
const xu2 = (resolve) =>import ( /* webpackChunkName:"printer_manager" */ 'src/module/shop_config/printer_manager');
const EPDX4 = (resolve) =>import ( /* webpackChunkName:"printer_config" */ 'src/module/shop_config/printer_config');
const eIo3 = (resolve) =>import ( /* webpackChunkName:"staff_config" */ 'src/module/brand_configuration/staff_config');
const rh2 = (resolve) =>import ( /* webpackChunkName:"position_config" */ 'src/module/brand_configuration/position_config');
const qC2 = (resolve) =>import ( /* webpackChunkName:"base_brand" */ 'src/module/brand_configuration/base_brand');
const yD2 = (resolve) =>import ( /* webpackChunkName:"pay_brand" */ 'src/module/brand_configuration/pay_brand');
const JzBI4 = (resolve) =>import ( /* webpackChunkName:"shop_group" */ 'src/module/brand_configuration/shop_group');
const htuZ4 = (resolve) =>import ( /* webpackChunkName:"bound_public_number" */ 'src/module/public_number_configuration/bound_public_number');
const BQiY4 = (resolve) =>import ( /* webpackChunkName:"new_push_language_settings" */ 'src/module/public_number_configuration/new_push_language_settings');
const fRHZ4 = (resolve) =>import ( /* webpackChunkName:"menu_set" */ 'src/module/public_number_configuration/menu_set');
const EuEv4 = (resolve) =>import ( /* webpackChunkName:"small_program" */ 'src/module/public_number_configuration/program_config/small_program');
const zdWMg5 = (resolve) =>import ( /* webpackChunkName:"module_set" */ 'src/module/public_number_configuration/module_set');
const ZNj3 = (resolve) =>import ( /* webpackChunkName:"configuration_tutorial" */ 'src/module/public_number_configuration/configuration_tutorial');
const gbUp4 = (resolve) =>import ( /* webpackChunkName:"warehouse_list" */ 'src/module/invoicing_system/warehouse_manage/warehouse_list');
const OEZ3 = (resolve) =>import ( /* webpackChunkName:"warehouse_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_detail');
const loJP4 = (resolve) =>import ( /* webpackChunkName:"warehouse_create" */ 'src/module/invoicing_system/warehouse_manage/warehouse_create');
const Yana4 = (resolve) =>import ( /* webpackChunkName:"output_store" */ 'src/module/invoicing_system/warehouse_manage/output_store');
const vRlw4 = (resolve) =>import ( /* webpackChunkName:"output_shipper" */ 'src/module/invoicing_system/warehouse_manage/output_shipper');
const ybDA4 = (resolve) =>import ( /* webpackChunkName:"output_select_goods" */ 'src/module/invoicing_system/warehouse_manage/output_select_goods');
const iZfwL5 = (resolve) =>import ( /* webpackChunkName:"change_area" */ 'src/module/invoicing_system/warehouse_manage/change_area');
const pLvh4 = (resolve) =>import ( /* webpackChunkName:"warehouse_change" */ 'src/module/invoicing_system/warehouse_manage/warehouse_change');
const owfG4 = (resolve) =>import ( /* webpackChunkName:"search_goods" */ 'src/module/invoicing_system/warehouse_manage/search_goods');
const xpi3 = (resolve) =>import ( /* webpackChunkName:"warehouse_goods_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_goods_detail');
const amjuG5 = (resolve) =>import ( /* webpackChunkName:"warehouse_material_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_material_detail');
const Pxg3 = (resolve) =>import ( /* webpackChunkName:"warehouse_operation_detail" */ 'src/module/invoicing_system/warehouse_manage/warehouse_operation_detail');
const Jk2 = (resolve) =>import ( /* webpackChunkName:"operation" */ 'src/module/invoicing_system/warehouse_manage/operation');
const mNJOO5 = (resolve) =>import ( /* webpackChunkName:"operation_detail" */ 'src/module/invoicing_system/warehouse_manage/operation_detail');
const TkaT4 = (resolve) =>import ( /* webpackChunkName:"enter_goods" */ 'src/module/invoicing_system/warehouse_manage/enter_goods');
const HZH3 = (resolve) =>import ( /* webpackChunkName:"picking_record" */ 'src/module/invoicing_system/picking_list/picking_record');
const Wsb3 = (resolve) =>import ( /* webpackChunkName:"picking" */ 'src/module/invoicing_system/picking_list/picking');
const Ja2 = (resolve) =>import ( /* webpackChunkName:"picker_details" */ 'src/module/invoicing_system/picking_list/picker_details');
const qAy3 = (resolve) =>import ( /* webpackChunkName:"plate_details" */ 'src/module/invoicing_system/picking_list/plate_details');
const ZDli4 = (resolve) =>import ( /* webpackChunkName:"plate_storage" */ 'src/module/invoicing_system/picking_list/plate_storage');
const tox3 = (resolve) =>import ( /* webpackChunkName:"scheduling_application_list" */ 'src/module/invoicing_system/warehouse_manage/scheduling_application_list');
const GE2 = (resolve) =>import ( /* webpackChunkName:"purchase_requisition" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition');
const IPt3 = (resolve) =>import ( /* webpackChunkName:"purchase_requisition_detail" */ 'src/module/invoicing_system/warehouse_manage/purchase_requisition_detail');
const OiGj4 = (resolve) =>import ( /* webpackChunkName:"ware_import" */ 'src/module/invoicing_system/wareimport/ware_import');
const KpLI4 = (resolve) =>import ( /* webpackChunkName:"ware_prosperity" */ 'src/module/invoicing_system/wareimport/ware_prosperity');
const BPmL4 = (resolve) =>import ( /* webpackChunkName:"conclusion_list" */ 'src/module/invoicing_system/conclusion/conclusion_list');
const RsGih5 = (resolve) =>import ( /* webpackChunkName:"shipment_verify" */ 'src/module/invoicing_system/conclusion/shipment_verify');
const APNjP5 = (resolve) =>import ( /* webpackChunkName:"batch_schedule" */ 'src/module/invoicing_system/conclusion/batch_schedule');
const IoOy4 = (resolve) =>import ( /* webpackChunkName:"new_schedule" */ 'src/module/invoicing_system/conclusion/new_schedule');
const WrW3 = (resolve) =>import ( /* webpackChunkName:"select_dispatch" */ 'src/module/invoicing_system/warehouse_manage/select_dispatch');
const DcFBt5 = (resolve) =>import ( /* webpackChunkName:"multiple_examine" */ 'src/module/invoicing_system/conclusion/multiple_examine');
const Qwfnu5 = (resolve) =>import ( /* webpackChunkName:"bom_list" */ 'src/module/invoicing_system/invoicing/bom_list');
const eADbf5 = (resolve) =>import ( /* webpackChunkName:"bom_create" */ 'src/module/invoicing_system/invoicing/bom_create');
const gK2 = (resolve) =>import ( /* webpackChunkName:"bom_change" */ 'src/module/invoicing_system/invoicing/bom_change');
const uahG4 = (resolve) =>import ( /* webpackChunkName:"bom_detail" */ 'src/module/invoicing_system/invoicing/bom_detail');
const fheMd5 = (resolve) =>import ( /* webpackChunkName:"inventory_management" */ 'src/module/invoicing_system/invoicing/inventory_management');
const KwD3 = (resolve) =>import ( /* webpackChunkName:"invent_detail" */ 'src/module/invoicing_system/invoicing/invent_detail');
const Wsfg4 = (resolve) =>import ( /* webpackChunkName:"supplies_detail" */ 'src/module/invoicing_system/invoicing/supplies_detail');
const uE2 = (resolve) =>import ( /* webpackChunkName:"invent_putstroage" */ 'src/module/invoicing_system/invoicing/invent_putstroage');
const ZZyjl5 = (resolve) =>import ( /* webpackChunkName:"lose_manage" */ 'src/module/invoicing_system/invoicing/lose_manage');
const QuUZw5 = (resolve) =>import ( /* webpackChunkName:"materials_putin_storage" */ 'src/module/invoicing_system/invoicing/materials_putin_storage');
const NZO3 = (resolve) =>import ( /* webpackChunkName:"material_modify_batch" */ 'src/module/invoicing_system/invoicing/material_modify_batch');
const nMW3 = (resolve) =>import ( /* webpackChunkName:"material_loss" */ 'src/module/invoicing_system/invoicing/material_loss');
const rN2 = (resolve) =>import ( /* webpackChunkName:"revamp_unit" */ 'src/module/invoicing_system/invoicing/revamp_unit');
const mJR3 = (resolve) =>import ( /* webpackChunkName:"public_details" */ 'src/module/invoicing_system/invoicing/public_details');
const uSPJ4 = (resolve) =>import ( /* webpackChunkName:"material_create" */ 'src/module/invoicing_system/warehouse_manage/material_create');
const tJhQ4 = (resolve) =>import ( /* webpackChunkName:"material_edit" */ 'src/module/invoicing_system/warehouse_manage/material_edit');
const Kcua4 = (resolve) =>import ( /* webpackChunkName:"warehouse_count" */ 'src/module/invoicing_system/warehouse_manage/warehouse_count');
const FiQm4 = (resolve) =>import ( /* webpackChunkName:"supbranch_detail" */ 'src/module/invoicing_system/invoicing/supbranch_detail');
const cH2 = (resolve) =>import ( /* webpackChunkName:"brand_assign_list" */ 'src/module/invoicing_system/brand_assign/brand_assign_list');
const jPl3 = (resolve) =>import ( /* webpackChunkName:"create_assign" */ 'src/module/invoicing_system/brand_assign/create_assign');
const xUY3 = (resolve) =>import ( /* webpackChunkName:"set_newjurisdiction" */ 'src/module/invoicing_system/brand_assign/set_newjurisdiction');
const Mmw3 = (resolve) =>import ( /* webpackChunkName:"jurisdiction_record" */ 'src/module/invoicing_system/brand_assign/jurisdiction_record');
const lBK3 = (resolve) =>import ( /* webpackChunkName:"jurisdiction_detail" */ 'src/module/invoicing_system/brand_assign/jurisdiction_detail');
const uXnij5 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const aUGE4 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const UZ2 = (resolve) =>import ( /* webpackChunkName:"goods_count_history" */ 'src/module/invoicing_system/invoicing/goods_count_history');
const zA2 = (resolve) =>import ( /* webpackChunkName:"process_material_detail" */ 'src/module/invoicing_system/process/process_material_detail');
const nY2 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const FDX3 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const wR2 = (resolve) =>import ( /* webpackChunkName:"goods_count_template" */ 'src/module/invoicing_system/invoicing/goods_count_template');
const rxdK4 = (resolve) =>import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail');
const iFYs4 = (resolve) =>import ( /* webpackChunkName:"goods_count_detail" */ 'src/module/invoicing_system/invoicing/goods_count_detail');
const KhwP4 = (resolve) =>import ( /* webpackChunkName:"goods_count" */ 'src/module/invoicing_system/invoicing/goods_count');
const TDeLH5 = (resolve) =>import ( /* webpackChunkName:"process_material_print" */ 'src/module/invoicing_system/process/process_material_print');
const FFrh4 = (resolve) =>import ( /* webpackChunkName:"process_material" */ 'src/module/invoicing_system/process/process_material');
const Vuib4 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch');
const Hlli4 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch');
const tpI3 = (resolve) =>import ( /* webpackChunkName:"batch_log_print" */ 'src/module/invoicing_system/batch_log/batch_log_print');
const VRSP4 = (resolve) =>import ( /* webpackChunkName:"batch_log_detail" */ 'src/module/invoicing_system/batch_log/batch_log_detail');
const zAX3 = (resolve) =>import ( /* webpackChunkName:"batch_log_dispatch_detail" */ 'src/module/invoicing_system/batch_log/batch_log_dispatch_detail');
const sBJQ4 = (resolve) =>import ( /* webpackChunkName:"goods_total_log" */ 'src/module/invoicing_system/total_log/goods_total_log');
const zNuV4 = (resolve) =>import ( /* webpackChunkName:"material_total_log" */ 'src/module/invoicing_system/total_log/material_total_log');
const Rlo3 = (resolve) =>import ( /* webpackChunkName:"bom_consume_detail" */ 'src/module/invoicing_system/total_log/bom_consume_detail');
const NZpZ4 = (resolve) =>import ( /* webpackChunkName:"goods_batch_total_log_detail" */ 'src/module/invoicing_system/total_log/goods_batch_total_log_detail');
const niho4 = (resolve) =>import ( /* webpackChunkName:"check_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/check_material');
const LtK3 = (resolve) =>import ( /* webpackChunkName:"add_goods" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_goods');
const BPAk4 = (resolve) =>import ( /* webpackChunkName:"add_material" */ 'src/module/invoicing_system/invoicing/check_warehouse/add_material');
const sTBm4 = (resolve) =>import ( /* webpackChunkName:"supplier_configure" */ 'src/module/invoicing_system/warehouse_manage/supplier_configure');
const NpcQl5 = (resolve) =>import ( /* webpackChunkName:"supply_manage" */ 'src/module/invoicing_system/supply/supply_manage');
const welo4 = (resolve) =>import ( /* webpackChunkName:"wear_cause" */ 'src/module/invoicing_system/config_manage/wear_cause');
const bgU3 = (resolve) =>import ( /* webpackChunkName:"off_cause" */ 'src/module/invoicing_system/config_manage/off_cause');
const yOBCs5 = (resolve) =>import ( /* webpackChunkName:"brand_list" */ 'src/module/invoicing_system/config_manage/brand_list');
const DgEB4 = (resolve) =>import ( /* webpackChunkName:"weigh_list" */ 'src/module/invoicing_system/config_manage/weigh_list');
const XLf3 = (resolve) =>import ( /* webpackChunkName:"shelf_list" */ 'src/module/invoicing_system/config_manage/shelf_list');
const fzr3 = (resolve) =>import ( /* webpackChunkName:"material_category_create" */ 'src/module/invoicing_system/warehouse_manage/material_category_create');
const QVKKN5 = (resolve) =>import ( /* webpackChunkName:"unit_create" */ 'src/module/invoicing_system/warehouse_manage/unit_create');
const lpufC5 = (resolve) =>import ( /* webpackChunkName:"shelve_rule" */ 'src/module/invoicing_system/config_manage/shelve_rule');
const MDOiA5 = (resolve) =>import ( /* webpackChunkName:"order_brand" */ 'src/module/statistics/order_brand');
const JIeh4 = (resolve) =>import ( /* webpackChunkName:"takeaway_brand" */ 'src/module/statistics/takeaway_brand');
const wVVl4 = (resolve) =>import ( /* webpackChunkName:"order" */ 'src/module/statistics/order');
const FjP3 = (resolve) =>import ( /* webpackChunkName:"order_more" */ 'src/module/statistics/order_more');
const ljbk4 = (resolve) =>import ( /* webpackChunkName:"order_detail" */ 'src/module/statistics/order_detail');
const OhUQ4 = (resolve) =>import ( /* webpackChunkName:"order_takeaway" */ 'src/module/statistics/order_takeaway');
const hiGm4 = (resolve) =>import ( /* webpackChunkName:"order_constructions" */ 'src/module/statistics/order_constructions');
const VQHu4 = (resolve) =>import ( /* webpackChunkName:"takeaway_one" */ 'src/module/statistics/takeaway_one');
const naj3 = (resolve) =>import ( /* webpackChunkName:"takeaway_more" */ 'src/module/statistics/takeaway_more');
const sI2 = (resolve) =>import ( /* webpackChunkName:"takeaway_detail" */ 'src/module/statistics/takeaway_detail');
const rVcK4 = (resolve) =>import ( /* webpackChunkName:"order_proprietary" */ 'src/module/statistics/order_proprietary');
const WbzG4 = (resolve) =>import ( /* webpackChunkName:"business" */ 'src/module/statistics/business');
const dcz3 = (resolve) =>import ( /* webpackChunkName:"category" */ 'src/module/statistics/category');
const RgJ3 = (resolve) =>import ( /* webpackChunkName:"single_goods" */ 'src/module/statistics/single_goods');
const jkX3 = (resolve) =>import ( /* webpackChunkName:"brand_order_bill" */ 'src/module/statistics/brand_order_bill');
const RwJ3 = (resolve) =>import ( /* webpackChunkName:"handover" */ 'src/module/statistics/handover');
const Fbai4 = (resolve) =>import ( /* webpackChunkName:"member_recharges" */ 'src/module/statistics/member_recharge/member_recharges');
const LGG3 = (resolve) =>import ( /* webpackChunkName:"delete" */ 'src/module/statistics/delete');
const HPcU4 = (resolve) =>import ( /* webpackChunkName:"return_goods" */ 'src/module/statistics/return_goods');
const hyvdK5 = (resolve) =>import ( /* webpackChunkName:"single_stockstatics" */ 'src/module/statistics/single_stockstatics');
const SqlI4 = (resolve) =>import ( /* webpackChunkName:"export_template" */ 'src/module/statistics/export_template');
const yRm3 = (resolve) =>import ( /* webpackChunkName:"category_count" */ 'src/module/statistics/category_count');
const dFr3 = (resolve) =>import ( /* webpackChunkName:"reservation" */ 'src/module/statistics/reservation');
const cF2 = (resolve) =>import ( /* webpackChunkName:"entity_card" */ 'src/module/statistics/entity_card');
const TR2 = (resolve) =>import ( /* webpackChunkName:"activity" */ 'src/module/statistics/activity');
const rSSO4 = (resolve) =>import ( /* webpackChunkName:"activity_detail" */ 'src/module/statistics/activity_detail');
const VgZ3 = (resolve) =>import ( /* webpackChunkName:"free" */ 'src/module/statistics/free');
const GWQ3 = (resolve) =>import ( /* webpackChunkName:"change_price_record" */ 'src/module/statistics/change_price_record');
const DYg3 = (resolve) =>import ( /* webpackChunkName:"custom_statistics" */ 'src/module/statistics/custom_statistics');
const jdk3 = (resolve) =>import ( /* webpackChunkName:"coupon_statistics" */ 'src/module/statistics/coupon_statistics');
const Lcbdd5 = (resolve) =>import ( /* webpackChunkName:"citic_statements" */ 'src/module/statistics/citic_statements');
const AZzwl5 = (resolve) =>import ( /* webpackChunkName:"citic_statements_sh" */ 'src/module/statistics/citic_statements_sh');
const pEXW4 = (resolve) =>import ( /* webpackChunkName:"user_evaluation" */ 'src/module/statistics/user_evaluation');
const cu2 = (resolve) =>import ( /* webpackChunkName:"scancode_statistics" */ 'src/module/statistics/quick_payment_statistics/scancode_statistics');
const tMwh4 = (resolve) =>import ( /* webpackChunkName:"reverse_statics" */ 'src/module/statistics/reverse_statics');
const FICx4 = (resolve) =>import ( /* webpackChunkName:"balance_record" */ 'src/module/statistics/balance_record');

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
            children: [{"path":"cashierConfig","component":zRqZ4},{"path":"cashierAnslysis","component":qfIY4},{"path":"ReportCategory","component":uTB3},{"path":"NoBrand","component":vvo3},{"path":"memberManagement","children":[{"path":"","component":ubvz4},{"path":"detail","component":lVk3}],"component":details_con},{"path":"CardConsume","component":efdP4},{"path":"entityCardQuery","component":taEMj5},{"path":"memberSend","component":gVi3},{"path":"integralRule","component":jaWIr5},{"path":"activateEntityCard","component":xUyk4},{"path":"memberLabel","component":yJB3},{"path":"memberLevelManagement","component":Zqt3},{"path":"AssistantcoinsConfig","component":rRoX4},{"path":"Assistantusergroup","component":Xy2},{"path":"Assistantfans","component":KJ2},{"path":"Assistantstaff","component":hJkN4},{"path":"Assistantverbaltrick","component":Tdi3},{"path":"Assistantusertag","component":LTB3},{"path":"Assistantuserlevel","component":IZvaV5},{"path":"Assistantbuyconfig","component":cxtr4},{"path":"Assistanthistory","children":[{"path":"","component":Ym2},{"path":"detail","children":[{"path":"","component":yIY3},{"path":"record","children":[{"path":"","component":kpO3},{"path":"recordDetail","component":YExY4}],"component":details_con}],"component":details_con}],"component":details_con},{"path":"client","component":pZx3},{"path":"seller","component":foY3},{"path":"addCardType","component":PkRb4},{"path":"cardTypeList","component":uW2},{"path":"cardTypeApp","component":nQAK4},{"path":"MemberCard","component":Nhx3},{"path":"MemberAnalysis","component":NgqD4},{"path":"Assistantgood","children":[{"path":"","component":ja2},{"path":"newgoods","component":kgH3}],"component":details_con},{"path":"Assistantenchashment","component":bHBQ4},{"path":"assistantComment","component":UGhE4},{"path":"taskRules","component":BGtCQ5},{"path":"Task","children":[{"path":"","component":OQ2},{"path":"newmission","component":wmux4}],"component":details_con},{"path":"storeOverview","component":CT2},{"path":"goodsManager","component":FVGv4},{"path":"attrManager","component":EFQDv5},{"path":"packageManager","component":ijlhE5},{"path":"categoryManager","component":PDed4},{"path":"inventoryManager","component":pOEGp5},{"path":"multiChannelMenu","component":SChO4},{"path":"marker","component":Wpbj4},{"path":"authorization","component":Uj2},{"path":"printset","component":mtlbt5},{"path":"Dada","component":RTVlw5},{"path":"DadaConfig","component":hTp3},{"path":"addCoupon","children":[{"path":"","component":SMs3},{"path":"breakCoupon","component":dsay4},{"path":"discountCoupon","component":aYn3},{"path":"giveCoupon","component":IuTz4},{"path":"vouchersCoupon","component":yVKI4},{"path":"intergralcardCoupon","component":aY2}],"component":details_con},{"path":"getCouponList","component":rEz3},{"path":"integralMall","children":[{"path":"","component":gVy3},{"path":"addIntegralMall","children":[{"path":"","component":LyM3}],"component":details_con}],"component":details_con},{"path":"appointment","component":nfow4},{"path":"point","component":sap3},{"path":"statisticsManagement","component":NTDbL5},{"path":"onlineOrderConfig","component":YI2},{"path":"square","component":Ws2},{"path":"memberStoredValueScheme","children":[{"path":"","component":lwEs4},{"path":"solution","component":lla3}],"component":details_con},{"path":"promotionMaterial","component":Sjic4},{"path":"cooperation","component":CgG3},{"path":"weixinConfiguration","component":Yx2},{"path":"activity","children":[{"path":"","component":dyA3},{"path":"generalActivity","children":[{"path":"","component":EBubr5},{"path":"birth","component":uD2},{"path":"custom","component":HwR3},{"path":"agift","component":CupNO5},{"path":"encourage","component":dhrg4},{"path":"fission","component":bXVsJ5},{"path":"member","component":aJ2},{"path":"fullreduce","component":UBUn4}],"component":details_con},{"path":"couponActivity","children":[{"path":"","component":wj2},{"path":"coupon","component":oE2}],"component":details_con}],"component":details_con},{"path":"adminConfig","component":PFVHy5},{"path":"CommentConfig","component":Jqax4},{"path":"Scanpayconfig","component":yi2},{"path":"MemberValueConfig","component":YP2},{"path":"orderTemplateSwitch","component":UxCWJ5},{"path":"staffManager","component":vx2},{"path":"kitchen","component":olPX4},{"path":"areaManager","component":DbQm4},{"path":"tableManager","component":kVUPO5},{"path":"PriceRule","component":XC2},{"path":"returnReason","component":NKc3},{"path":"Startandsell","component":OVPLl5},{"path":"notice","component":VHu3},{"path":"hangUpAccount","component":YlmF4},{"path":"reverseReason","component":LyLG4},{"path":"serviceChargeManager","component":twGcG5},{"path":"shopNumber","component":ktDZ4},{"path":"banner","component":trJO4},{"path":"openTime","component":XiC3},{"path":"Payment","component":XOzQ4},{"path":"citySettings","component":cTtcY5},{"path":"EleMenuManage","component":hPRR4},{"path":"fastSelling","component":UQMs4},{"path":"jobsManager","component":BEy3},{"path":"printerError","component":cek3},{"path":"printQueue","component":oDF3},{"path":"printerManager","component":xu2},{"path":"printerConfig","component":EPDX4},{"path":"staffConfig","component":eIo3},{"path":"positionConfig","component":rh2},{"path":"setting","component":qC2},{"path":"paymentMethod","component":yD2},{"path":"storeArea","component":JzBI4},{"path":"boundPublicNumber","component":htuZ4},{"path":"pushLanguageSettings","component":BQiY4},{"path":"menuSetting","component":fRHZ4},{"path":"appletBinding","component":EuEv4},{"path":"templateSetting","component":zdWMg5},{"path":"configCourse","component":ZNj3},{"path":"warehouseList","children":[{"path":"","component":gbUp4},{"path":"warehouseDetail","component":OEZ3},{"path":"create","component":loJP4},{"path":"outputStore","component":Yana4},{"path":"outputShipper","component":vRlw4},{"path":"outputSelGoods","component":ybDA4},{"path":"changeArea","component":iZfwL5},{"path":"change","component":pLvh4},{"path":"searchGoods","component":owfG4},{"path":"warehouseGoodsDetail","component":xpi3},{"path":"warehouseMaterialDetail","component":amjuG5},{"path":"warehouseOperationDetail","component":Pxg3}],"component":details_con},{"path":"operation","children":[{"path":"","component":Jk2},{"path":"operationDetail","component":mNJOO5},{"path":"enterGoods","component":TkaT4}],"component":details_con},{"path":"pickingList","children":[{"path":"","component":HZH3},{"path":"picking","component":Wsb3},{"path":"checkDetails","component":Ja2},{"path":"plateDetails","component":qAy3},{"path":"plateStorage","component":ZDli4}],"component":details_con},{"path":"schedulingApplication","children":[{"path":"","component":tox3},{"path":"purchaseRequisition","component":GE2},{"path":"purchaseRequisitionDetail","component":IPt3}],"component":details_con},{"path":"wareImport","children":[{"path":"","meta":{"keepAlive":true},"component":OiGj4},{"path":"wareProsperity","component":KpLI4}],"component":details_con},{"path":"conclusionList","children":[{"path":"","meta":{"keepAlive":true},"component":BPmL4},{"path":"shipmentVerify","component":RsGih5},{"path":"batchSchedule","component":APNjP5},{"path":"newSchedule","component":IoOy4},{"path":"selectDispatch","component":WrW3},{"path":"multipleExamine","component":DcFBt5}],"component":details_con},{"path":"bomList","children":[{"path":"","component":Qwfnu5},{"path":"bomCreate","component":eADbf5},{"path":"bomChange","component":gK2},{"path":"bomDetail","component":uahG4}],"component":details_con},{"path":"inventoryManagement","children":[{"path":"","component":fheMd5},{"path":"detail","component":KwD3},{"path":"suppliesDetail","component":Wsfg4},{"path":"putStroage","component":uE2},{"path":"loseManage","component":ZZyjl5},{"path":"materialsPutinStorage","component":QuUZw5},{"path":"materialModifyBatch","component":NZO3},{"path":"materialLoss","component":nMW3},{"path":"revampUnit","component":rN2},{"path":"publicDetails","component":mJR3},{"path":"materialCreate","component":uSPJ4},{"path":"materialEdit","component":tJhQ4},{"path":"warehouseCount","component":Kcua4},{"path":"supbranchDetail","component":FiQm4}],"component":details_con},{"path":"brandAssign","children":[{"path":"","component":cH2},{"path":"create","component":jPl3},{"path":"setNewjurisdiction","component":xUY3},{"path":"jurisdictionRecord","component":Mmw3},{"path":"jurisdictionDetail","component":lBK3}],"component":details_con},{"path":"goodsCountHistory","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":uXnij5},{"path":"materialCountHistory","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":aUGE4},{"path":"processHistory","children":[{"path":"","props":{"details_con":(route) => {                                    return {                                        tab: 3                                    };                                }},"component":UZ2},{"path":"detail","component":zA2}],"component":details_con},{"path":"goodsCountTemplate","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":nY2},{"path":"materialCountTemplate","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":FDX3},{"path":"processTemplate","props":{"details_con":(route) => {                            return {                                tab: 3                            };                        }},"component":wR2},{"path":"goodsCountDetail","props":{"details_con":(route) => {                            return {                                tab: 1                            };                        }},"component":rxdK4},{"path":"materialCountDetail","props":{"details_con":(route) => {                            return {                                tab: 2                            };                        }},"component":iFYs4},{"path":"goodsCount","component":KhwP4},{"path":"processMaterialPrint","component":TDeLH5},{"path":"processMaterial","component":FFrh4},{"path":"batchLog","children":[{"path":"","redirect":"batchLogDispatch"},{"path":"batchLogDispatch","alias":"","props":{"details_con":(route) => {                                    return {                                        tab: 1                                    };                                }},"component":Vuib4},{"path":"batchLogAudit","props":{"details_con":(route) => {                                    return {                                        tab: 2                                    };                                }},"component":Hlli4},{"path":"batchLogPrint","meta":{"comName":"batchLogPrint"},"component":tpI3},{"path":"batchLogDetail","component":VRSP4},{"path":"batchLogDispatchDetail","meta":{"comName":"batchLogDispatchDetail"},"component":zAX3}],"component":details_con},{"path":"goodsTotalLog","meta":{"keepAlive":true},"component":sBJQ4},{"path":"materialTotalLog","meta":{"keepAlive":true},"component":zNuV4},{"path":"bomConsumeDetail","component":Rlo3},{"path":"goodsBatchTotalLogDetail","component":NZpZ4},{"path":"materialCount","component":niho4},{"path":"editGoodsCountTemplate","component":LtK3},{"path":"editMaterialCountTemplate","component":BPAk4},{"path":"supplierConfigure","component":sTBm4},{"path":"supplierManagement","component":NpcQl5},{"path":"wearCause","component":welo4},{"path":"shelfReason","component":bgU3},{"path":"brandList","component":yOBCs5},{"path":"weighGoodsList","component":DgEB4},{"path":"shelfManagement","component":XLf3},{"path":"materialCategory","component":fzr3},{"path":"materialUnitCreate","component":QVKKN5},{"path":"shelveRule","component":lpufC5},{"path":"orderStatistics","children":[{"path":"","component":MDOiA5},{"path":"takeawayBrand","component":JIeh4},{"path":"orderOne","component":wVVl4},{"path":"orderMore","component":FjP3},{"path":"orderDetail","component":ljbk4},{"path":"orderTakeaway","component":OhUQ4},{"path":"orderProprietary","component":hiGm4},{"path":"takeawayOne","component":VQHu4},{"path":"takeawayMore","component":naj3},{"path":"takeawayDetail","component":sI2},{"path":"orderProprietaryBrand","component":rVcK4}],"component":details_con},{"path":"businessStatistics","component":WbzG4},{"path":"categoryStatistics","component":dcz3},{"path":"singleStatistics","component":RgJ3},{"path":"OrderBillList","component":jkX3},{"path":"handover","component":RwJ3},{"path":"memberRecharge","component":Fbai4},{"path":"delOrder","component":LGG3},{"path":"returnGoods","component":HPcU4},{"path":"singleStockstatics","component":hyvdK5},{"path":"exportTemplate","component":SqlI4},{"path":"categoryCount","component":yRm3},{"path":"reservationManager","component":dFr3},{"path":"entityCardStatistics","component":cF2},{"path":"activityStatistics","children":[{"path":"","component":TR2},{"path":"detail","component":rSSO4}],"component":details_con},{"path":"freeGoods","component":VgZ3},{"path":"changePriceRecord","component":GWQ3},{"path":"Customstatistics","component":DYg3},{"path":"Couponstatistics","component":jdk3},{"path":"zhongxin","component":Lcbdd5},{"path":"zxsh","component":AZzwl5},{"path":"Commentstatics","component":pEXW4},{"path":"Scanpaystatics","component":cu2},{"path":"reverseStatics","component":tMwh4},{"path":"balanceAdjustRecord","component":FICx4}]
        }]
    }
];