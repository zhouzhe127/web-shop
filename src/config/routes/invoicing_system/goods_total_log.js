/* eslint-disable */
module.exports = {
    "path": "totalLog",
    "children": [{
        "path": "",
        "meta": {
            "keepAlive": true
        },
        "url": "src/module/invoicing_system/total_log/goods_total_log"
    }, {
        "path": "materialTotalLog",
        "meta": {
            "keepAlive": true
        },
        "url": "src/module/invoicing_system/total_log/material_total_log"
    }]
}