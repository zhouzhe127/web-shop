/* eslint-disable */
module.exports = {
    "path": "processHistory",
    "children": [{
        "path": "",
        "props": {
            "details_con": (route) => {
                return {
                    tab: 3
                };
            }
        },
        "url": "src/module/invoicing_system/invoicing/goods_count_history"
    }, {
        "path": "detail",
        "url": "src/module/invoicing_system/process/process_material_detail"
    }]
}