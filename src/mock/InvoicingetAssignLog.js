export default{
    'total|1-100':10,
    'count|1-100':1,
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10':[{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'logId': 7,
        'status|0-1': 1,
        'createTime':'@time',
        'createUName':'@cname',
        'planName':'@ctitle()'
    }]
}