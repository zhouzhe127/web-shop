<!--
    **添加/编辑图片
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='591' :height='426' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 图片名称 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">图片名称</span>
				<div class="rightHalf">
					<el-input class="fl" v-model="imageName" maxlength="20" placeholder="请输入图片名称" style="width: 179px;"></el-input>
					<div class="fl handle-tips">
						<i></i> 限制20字
					</div>
				</div>
			</div>
			<!-- 图片名称 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">图片类型</span>
				<div class="rightHalf">
					<el-radio-group v-model="typeName" class="fl">
						<el-radio v-for="(item,index) in typeList" :key="index" :label="item.name" @change.native="chooseReduction(item)"></el-radio>
					</el-radio-group>
				</div>
			</div>
			<!-- 上传图片 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">添加图片</span>
				<div class="rightHalf">
					<div class="fl uploadImgs clearfix">
						<el-button type="primary" icon="el-icon-plus" style="width:179px;">{{addImage}}
						</el-button>
						<form enctype="multipart/form-data" id="comForms">
							<input @change="fileNameChange" type="file" id="file_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" />
						</form>
					</div>
					<div class="fl handle-tips" v-if="fileName == '' && !isUpload">
						<i></i> 推荐尺寸:大小1M
					</div>
					<div class="fl sucesess-tips" v-if="fileName != ''">
						<i></i> {{uploadTip}}
					</div>
					<div class="fl warning-tips" v-if="isUpload">
						<i></i> 未上传图片
					</div>
				</div>
			</div>
		</div>
	</Win>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			title: '',
			okStyle: null,
			cancelStyle: null,
			imageName: '', //图片名称
			typeList: [{
				name: '环境',
				id: 1,
				key: 'H'
			}, {
				name: '商品',
				id: 2,
				key: 'G'
			}],
			typeId: 1,
			keyName: 'H',
			typeName: '环境',
			fileName: '', //上传的图片的名称
			isUpload: false,
			Hnum: '', //环境图片的数量
			Gnum: '', //商品图片的数量
			uploadTip: '已上传',
			addImage: '上传图片'
		};
	},
	props: {
		type: String, //状态
		detail: Object,
		allProList: Array
	},
	methods: {
		valiData: function(content, title, winType) { //弹窗提示格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		async getAppliedWin(res) {
			if (res == 'ok') {
				if (!this.checkForm()) return;
				await this.foodUpdate();
			}
			this.$emit('getAppliedWin', res);
		},
		//开关
		chooseReduction: function(item) {
			let id = item.id;
			this.typeId = id;
			this.keyName = item.key;
		},
		jtrim: function(s) {
			return s.replace(/(^\s*)|(\s*$)/g, ''); //            /(^\s*)|(\s*$)/g    ，其中开头为任意多个空，或者最后为多个空
		},
		checkForm: function() {
			if (this.imageName == '') {
				this.valiData('请填写图片名称');
				return false;
			}
			if (this.fileName == '') {
				this.isUpload = true;
				return false;
			}
			return true;
		},
		async fileNameChange() {
			//  上传图片
			this.uploadTip = '正在上传...';
			let res = await http.fileUpload({
				data: {
					type: 8,
					shopId: storage.session('shopId')
				},
				formId: 'comForms'
			});
			this.uploadTip = '上传成功';
			this.fileName = res;
			this.isUpload = false;
		},
		async foodUpdate() { //更新配置 上传菜品图
			let key = '';
			if (this.type == 'add') {
				if (this.typeId == 1) {
					key = this.keyName + (this.Hnum + 1);
				} else {
					key = this.keyName + (this.Gnum + 1);
				}
			} else {
				key = this.detail.id;
			}
			let obj = {
				[key]: {
					url: this.fileName,
					type: this.typeId,
					name: this.imageName
				}
			};
			let date = await http.foodUpdate({
				data: {
					name: '', //品牌名称
					topImg: '',
					img: obj
				}
			});
			if (date) {
				this.valiData('上传成功!');
			}
		},
		getNum: function() {
			let Hnum = [];
			let Gnum = [];
			for (let item of this.allProList) {
				if (item.id.indexOf('H') != -1) {
					let id = item.id.substring(1, item.id.length);
					Hnum.push(Number(id));
				}
				if (item.id.indexOf('G') != -1) {
					let id = item.id.substring(1, item.id.length);
					Gnum.push(Number(id));
				}
			}
			if (Hnum.length > 0) {
				this.Hnum = this.max(Hnum);
			}
			if (Gnum.length > 0) {
				this.Gnum = this.max(Gnum);
			}
		},
		max: function(arr) { //返回最大值
			let num = arr[0];
			for (let i = 0; i < arr.length; i++) {
				if (num < arr[i]) {
					num = arr[i];
				}
			}
			return num;
		}
	},
	components: {
		Win: () =>
			import( /* webpackChunkName:'win' */ 'src/components/win')
	},
	mounted() {
		if (this.type == 'edi') {
			this.imageName = this.detail.name; //图片名称
			this.typeId = this.detail.type;
			this.typeName = this.typeList[this.typeId - 1].name;
			this.fileName = this.detail.url;
			this.title = '编辑图片';
			this.addImage = '重新上传';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '取消',
				style: {
					backgroundColor: '#A0A0A0',
					color: '#fff'
				}
			};
		} else if (this.type == 'view') {
			this.title = '添加图片';
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '取消',
				style: {
					backgroundColor: '#A0A0A0',
					color: '#fff'
				}
			};
		}
		this.getNum();
	}
};
</script>
<style scoped>
#tan {
	width: 100%;
	height: 100%;
	padding: 20px 0;
}

#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#tan .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tan .online-box .rightHalf {
	max-width: 900px;
	min-height: 40px;
	float: left;
	display: flex;
	align-items: center;
}

#tan .online-box .uploadImgs {
	width: 179px;
	position: relative;
}

#tan .uploadImgs input {
	width: 179px;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

#tan .warning-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url("../../../../src/res/images/tip.png") 20px center no-repeat;
	background-size: 16px 18px;
	color: #EA3B44;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url('../../../res/images/handle-tips.png?0') 20px center no-repeat;
	color: #999999;
}

.sucesess-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url('../../../res/images/validate-complete.png') 20px center no-repeat;
	color: #999999;
}
</style>