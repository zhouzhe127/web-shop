export default {
    "goodsList|1-10": [{
        "itemName": "@ctitle()",
        "itemId": 1,
        "unit": "@cword",
        "surplus|1-10000": 0,
        "type|0-1": 0,
        "list|1-10": [{
            "shopName": "@ctitle()",
            "warehouse": "@ctitle()",
            "num|1-1000": 1,
            "isSuccess|0-1": 0
        }, ]
    }],
    "materialList|1-6": [{
        "itemName": "@ctitle()",
        "itemId": 1,
        "type|0-2": 0,
        "unit|0-4": [{
            "mid": "100000",
            "muId|0-3": 0,
            "name": "@cword",
            "isDefault|0-1": 1,
            "isMin|0-1": 0,
            "value|1-100": 1
        }, ],
        "surplus|1-100": 0,
        "distribution|1-6": [{
            "shopId|1-32": 0,
            "itemId|1-12": 0,
            "distributionId|1-6": 0,
            "distributionName": "@ctitle()",
            "value|0-100": 0,
            "unitId|0-3": 0
        }],
        "list|1-3": [{
            "shopName": "@ctitle()",
            "warehouse": "@ctitle()",
            "num|1-1000": 1,
            "isSuccess|0-1": 0,
            "distributionId|0-6": 0,
            "unit|0-5": 0
        }]
    }]
}