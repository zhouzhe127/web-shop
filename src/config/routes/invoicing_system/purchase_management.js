/* eslint-disable */
module.exports = {
    "path": "purchaseManagement",

    "children": [{
            "path": '',
            "url": "src/module/invoicing_system/purchase/purchase_management",
            "meta": {
                "keepAlive": true
            }
        }, {
            "path": "create",
            "url": "src/module/invoicing_system/purchase/purchase_create",
        },
        {
            "path": "detail",
            "url": "src/module/invoicing_system/purchase/purchase_detail",
        }
    ]
}