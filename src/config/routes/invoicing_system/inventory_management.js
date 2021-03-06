/* eslint-disable */
module.exports = {
    "path": "inventoryManagement",
    "children": [{
        "path": "",
        "url": "src/module/invoicing_system/invoicing/inventory_management",
        "meta": {
            "keepAlive": true
        }
    }, {
        "path": "detail",
        "url": "src/module/invoicing_system/invoicing/invent_detail"
    }, {
        "path": "suppliesDetail",
        "url": "src/module/invoicing_system/invoicing/supplies_detail"
    }, {
        "path": "putStroage",
        "url": "src/module/invoicing_system/invoicing/invent_putstroage"
    }, {
        "path": "loseManage",
        "url": "src/module/invoicing_system/invoicing/lose_manage"
    }, {
        "path": "materialsPutinStorage",
        "url": "src/module/invoicing_system/invoicing/materials_putin_storage"
    }, {
        "path": "materialModifyBatch",
        "url": "src/module/invoicing_system/invoicing/material_modify_batch"
    }, {
        "path": "materialLoss",
        "url": "src/module/invoicing_system/invoicing/material_loss"
    }, {
        "path": "revampUnit",
        "url": "src/module/invoicing_system/invoicing/revamp_unit"
    }, {
        "path": "publicDetails",
        "url": "src/module/invoicing_system/invoicing/public_details"
    }, {
        "path": "materialCreate",
        "url": "src/module/invoicing_system/warehouse_manage/material_create"
    }, {
        "path": "materialEdit",
        "url": "src/module/invoicing_system/warehouse_manage/material_edit"
    }, {
        "path": "warehouseCount",
        "url": "src/module/invoicing_system/warehouse_manage/warehouse_count"
    }, {
        "path": "supbranchDetail",
        "url": "src/module/invoicing_system/invoicing/supbranch_detail"
    }]
}