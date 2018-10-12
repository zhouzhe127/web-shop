/* eslint-disable */
module.exports = {
	path: 'orderStatistics',
	children: [
		{ path: '', url: 'src/module/statistics/order_brand' },
		{ path: 'takeawayBrand', url: 'src/module/statistics/takeaway_brand' },
		{ path: 'orderOne', url: 'src/module/statistics/order' },
		{ path: 'orderMore', url: 'src/module/statistics/order_more' },
		{ path: 'orderDetail', url: 'src/module/statistics/order_detail' },
		{ path: 'orderTakeaway', url: 'src/module/statistics/order_takeaway' },
		{
			path: 'orderProprietary',
			url: 'src/module/statistics/order_constructions'
		},
		{ path: 'takeawayOne', url: 'src/module/statistics/takeaway_one' },
		{ path: 'takeawayMore', url: 'src/module/statistics/takeaway_more' },
		{
			path: 'takeawayDetail',
			url: 'src/module/statistics/takeaway_detail'
		},
		{
			path: 'orderProprietaryBrand',
			url: 'src/module/statistics/order_proprietary'
		}
	]
};
