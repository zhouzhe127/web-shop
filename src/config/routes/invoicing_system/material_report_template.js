/* eslint-disable */
module.exports = {
    "path": "materialReport",
    "children": [{
            "path": "",
            "meta": {
                // "keepAlive": true
            },
            "url": "src/module/invoicing_system/data_center/material_report_template"
        },
        {
            path: 'finishedReport',
            url: 'src/module/invoicing_system/data_center/material_finished_report' //已生成报表
        },
        {
            path: 'viewReport',
            url: 'src/module/invoicing_system/data_center/material_view_report' //已生成报表
        },
        {
            path: 'creatTempMain',
            url: 'src/module/invoicing_system/data_center/creat_templatelist/temp_main' //新建报表模板
        },
        {
            path: 'createReport',
            url: 'src/module/invoicing_system/data_center/creat_templatelist/create_report' //生成报表
        },
        {
            path: 'errorLog',
            url: 'src/module/invoicing_system/data_center/errorLog' //错误日志
        },
    ]
}