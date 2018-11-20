/* eslint-disable */
module.exports = {
	"path": "Assistanthistory",
	"children": [{
		"path": "",
		"url": "src/module/seller_assistant/rushed_to_history/rushed_history"
	}, {
		"path": "detail",
		"children": [{
			"path": "",
			"url": "src/module/seller_assistant/rushed_to_history/rushed_history_detail"
		}, {
			"path": "record",
			"children": [{
				"path": '',
				"url": "src/module/seller_assistant/rushed_to_history/rushed_record"
			}, {
				"path": 'recordDetail',
				"url": "src/module/seller_assistant/rushed_to_history/rushed_record_detail"
			}]
		}]
	}]
}
