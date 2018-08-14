<!--
	**添加修改通知信息
	*
	* 孔伟研
	* *
	*
-->
<template>
	<div id="noticeWin">
		<el-form :model="redDetial" :rules="rules" ref="redDetial" label-width="140px">
			<el-form-item label="通知标题" prop="title">
				<el-input v-model="redDetial.title" maxlength = "20" placeholder = "请输入通知标题" style = "width:250px;"></el-input>
			</el-form-item>
			<el-form-item label="通知时间">
				<el-date-picker
					v-model="redDetial.time"
					type="datetime"
					placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div class="noticeWin" style="height:380px;">
			<h2 class="tag">正文</h2>
			<div class="mes">
				<div id="div1" class=" toolbar" ref="editor" style="text-align:left;max-width:800px;padding-top:30px;"></div>
			</div>
		</div>
		<div class="noticeWin">
			<h2 class="tag"></h2>
			<!-- <a href="javascript:void(0);" @click="addNotice(false)" class="blue" style=" width: 100px;height:40px;line-height:40px;float:left;">提交</a> -->
			<el-button @click="addNotice(false)" type="primary" style="width:100px;float:left;">提交</el-button>
			<a href="javascript:void(0);" @click="addNotice(true)" class="wearhouse" style="margin:0px 10px;">保存草稿</a>
			<a href="javascript:void(0);" @click="back" class="wearhouse create" style="color:#b3b3b3;border-color:#b3b3b3;">返回</a>
		</div>
	</div>
</template>

<script>
// import ( /* webpackChunkName:'wang_editor' */ 'src/components/wang_editor.js');
import http from 'src/manager/http';
import global from 'src/manager/global';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			type: 0, //类型0：正文，1：草稿箱
			ischain:'',
			rules: {
				title: [
					{ required: true, message: '请输入通知标题', trigger: 'blur' },
				],
				time: [
					{ required: true, message: '请选择时间', trigger: 'blur' },
				],
			},
		};
	},
	props: {
		isAdd: Boolean,
		redDetial: Object //详情
	},
	async mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.redDetial.time = this.redDetial.time * 1000;
		this.$store.commit('setPageTools', []);
		let token = storage.session('token'); //token
		let shopId = storage.session('shopId'); //shopId
		let oid = this.random(1, 100).toString();
		let uploadUrl = storage.session('userShop').uploadUrl;
		let editor = await import(/* webpackChunkName:'wang_editor' */ 'src/components/wang_editor.js');
		let wangEditor = new editor.default('#div1');
		wangEditor.customConfig.uploadImgServer =
			global.host.shop +
			'image/uploadImage?oid=' +
			oid +
			'&format=script&token=' +
			token +
			'&type=8&shopId=' +
			shopId;
		wangEditor.customConfig.uploadFileName = 'image';
		wangEditor.customConfig.onchange = html => {
			this.redDetial.content = html;
		};
		wangEditor.customConfig.uploadImgHooks = {
			customInsert: function(insertImg, result) {
				insertImg(uploadUrl + result.data);
			}
		};
		wangEditor.create();
		if (!this.isAdd && this.redDetial.content) {
			wangEditor.txt.html(this.redDetial.content);
		}
	},
	methods: {
		//传给父组件信息
		clickResult(res) {
			this.$emit('openTwo', res);
		},
		random: function(lower, upper) {
			return Math.floor(Math.random() * (upper - lower)) + lower;
		},
		async addNotice(ty) {
			let item = {};
			item.time = this.redDetial.time / 1000;
			item.title = this.redDetial.title;
			item.content = this.redDetial.content;
			
			function delHtmlTag(str) {
				//去掉所有的html标记
				return str.replace(/<[^>img]+>/g, '');
			}
			if (item.title.length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请输入通知标题！'
				});
				return false;
			}
			if (item.time == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请选择通知时间'
				});
				return false;
			}
			let con = item.content;
			let tent = delHtmlTag(con);
			let arr = tent.split('&nbsp;');
			let abc = false;
			for(let i=0;i<arr.length;i++){
				if(arr[i].replace(/\s+/g, '').length>0){
					abc = true;
				}
			}
			if(!abc){
				item.content = '';
				// this.$store.commit('setWin', {
				// 	winType: 'alert',
				// 	content: '请输入通知内容！'
				// });
				// return false;
			}
			// if(item.type==1&&this.redDetial.type == '0'){
			// 	this.$store.commit('setWin', {
			// 		winType: 'alert',
			// 		content: '已经发布不能变更为草稿'
			// 	});
			// 	return false;
			// }
			if (this.isAdd) {
				item.type = Number(ty);
				let res = await http.addNotice({ data: item });
				if (res && ty) {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '已保存至草稿箱'
					});
					return;
				}else if(res && !ty){
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '添加成功'
					});
				}
			} else {
				item.type = Number(ty);
				item.newType =  Number(ty);
				item.id = this.redDetial.id;
				let res = await http.editNoticeOne({ data: item });
				if (res) {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '修改成功'
					});
				}
			}
			this.$emit('openTwo', 'add');
		},
		back() {
			this.$emit('openTwo', 'back');
		},
		isOk(detial) {
			if (detial.title.length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请输入通知标题！'
				});
				return false;
			}
			return true;
		}
	}
};
</script>

<style lang="less" scoped>
#noticeWin {
	.noticeWin {
		width: 100%;
		position: relative;
		height: 60px;
		.tag {
			float: left;
			width: 102px;
			height: 40px;
			line-height: 40px;
			text-align: right;
		}
		.mes {
			float: left;
			padding-left: 15px;
			text-indent: 0;
			line-height: 30px;
		}
		.wearhouse {
			color: #28a8e0;
			border: 1px #28a8e0 solid;
			width: 100px;
			height: 40px;
			line-height: 38px;
			text-align: center;
			float: left;
			margin-left: 5px;
		}
	}
}
</style>
