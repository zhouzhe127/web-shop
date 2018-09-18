module.exports = {
	"path": "Assistanthistory",
	"children": [{
		"path": "",
		"url": "src/module/seller_assistant/rushed_history"
	}, {
		"path": "detail",
		"children": [{
			"path": "",
			"url": "src/module/seller_assistant/rushed_history_detail"
		}, {
			"path": "record",
			"children": [{
				"path": '',
				"url": "src/module/seller_assistant/rushed_record"
			},{
				"path":'recordDetail',
				"url": "src/module/seller_assistant/rushed_record_detail"
			}]
		}]
	}]
}