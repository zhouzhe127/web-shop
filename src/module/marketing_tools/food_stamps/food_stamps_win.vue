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
						<el-button type="primary" icon="el-icon-plus" style="width:179px;">上传图片
						</el-button>
						<form enctype="multipart/form-data" id="comForm">
							<input @change="fileNameChange" type="file" id="file_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" />
						</form>
					</div>
					<div class="fl handle-tips">
						<i></i> 推荐尺寸:大小1M
					</div>
				</div>
			</div>
		</div>
	</Win>
</template>
<script type="text/javascript">
import http from 'src/manager/http';

export default {
	data() {
		return {
			title: '',
			okStyle: null,
			cancelStyle: null,
			payWays: [{
				id: 0,
				name: '用户'
			}, {
				id: 1,
				name: '工作人员'
			}], //类型
			imageName: '', //图片名称
			typeList: [{
				name: '环境',
				id: 0
			}, {
				name: '商品',
				id: 1
			}],
			typeId: 0,
			typeName: '环境',
			fileName: '' //上传的图片的名称
		};
	},
	props: {
		type: String, //状态
	},
	methods: {
		getAppliedWin(res) {
			if (res == 'ok') {

			}
			this.$emit('getAppliedWin', res);
		},
		//开关
		chooseReduction: function(item) {
			let id = item.id;
			this.typeId = id;
		},
		jtrim: function(s) {
			return s.replace(/(^\s*)|(\s*$)/g, ''); //            /(^\s*)|(\s*$)/g    ，其中开头为任意多个空，或者最后为多个空
		},
		async fileNameChange() {
			//  上传图片
			let res = await http.fileUpload({
				data: {
					type: 8,
					shopId: storage.session('shopId')
				},
				formId: 'comForm'
			});
			this.fileName = res;
		},
	},
	components: {
		Win: () =>
			import( /* webpackChunkName:'win' */ 'src/components/win')
	},
	mounted() {
		if (this.type == 'edi') {
			// this.name = this.labeldetail.name;
			// this.payType = Number(this.labeldetail.type);
			// this.validName = this.payWays[this.labeldetail.type].name;
			this.title = '编辑图片';
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