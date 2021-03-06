/* eslint-disable */
module.exports = {
    "path": "batchLog",
    "children": [{
        "path": "",
        "redirect": "batchLogDispatch"
    }, {
        "path": "batchLogDispatch",
        "alias": "",
        "props": {
            tab: 1
        },
        "url": "src/module/invoicing_system/batch_log/batch_log_dispatch"
    }, {
        "path": "batchLogAudit",
        "props": {
            tab: 2
        },
        "url": "src/module/invoicing_system/batch_log/batch_log_dispatch"
    }, {
        "path": "batchLogPrint",
        "meta": {
            "comName": "batchLogPrint"
        },
        "url": "src/module/invoicing_system/batch_log/batch_log_print"
    }, {
        "path": "batchLogDetail",
        "url": "src/module/invoicing_system/batch_log/batch_log_detail"
    }, {
        "path": "batchLogDispatchDetail",
        "meta": {
            "comName": "batchLogDispatchDetail"
        },
        "url": "src/module/invoicing_system/batch_log/batch_log_dispatch_detail"
    }]
}