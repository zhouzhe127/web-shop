<!--
    **粮票集装修
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="foodStamp">
		<!-- 粮票集装修 -->
		<div class="set-line">
			<div class="titles">粮票集装修</div>
			<div class="line"></div>
		</div>
		<!-- 品牌名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">品牌名称</span>
			<div class="rightHalf">
				<el-input class="fl" v-model="brandName" maxlength="20" placeholder="请输入品牌名称" style="width: 179px;"></el-input>
				<div class="fl handle-tips">
					<i></i> 限制20字
				</div>
			</div>
		</div>
		<!-- 首页展示图 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">首页展示图</span>
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
		<!-- 上传的图片 -->
		<div class="online-box clearfix" v-if="fileName">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<div class="win-imgShow">
					<img :src="imgHost+fileName">
                </div>
				</div>
			</div>
			<!-- 更多图片 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">更多图片</span>
				<div class="rightHalf">
					<el-button class="fl" type="primary" icon="el-icon-plus" style="width:179px;">上传图片
					</el-button>
					<div class="fl handle-tips">
						<i></i> 推荐尺寸:大小1M 上限100张
					</div>
				</div>
			</div>
			<!-- 图片列表 -->
			<div class="online-box clearfix">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<div class="list_box" style="width:800px;">
						<div class="list_title">
							<div class="list_title_l fl">
								<span>图片列表</span>
								<span></span>
								<span>共
								<a href="javascript:;">{{count}}</a>张</span>
							</div>
							<div class="list_title_r fr">
							</div>
						</div>
						<el-table :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
							<el-table-column fixed prop="id" label="图片名称" width="160" align="center">
							</el-table-column>
							<el-table-column label="图片类型" prop="name" align="center" width="160">
							</el-table-column>
							<el-table-column prop="createTime" label="缩略图" align="center" width="160">
							</el-table-column>
							<el-table-column label="操作" align="center">
							</el-table-column>
						</el-table>
					</div>
					<!-- 分页 -->
					<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="allTotal" :page-sizes="[10, 20, 30]" style="padding-left: 0;"></el-pagination>
				</div>
			</div>
			<!-- 保存 -->
			<div class="online-box clearfix">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<el-button class="fl" type="primary" style="width:179px;">保存
					</el-button>
				</div>
			</div>
			<!-- 添加图片的弹窗 -->
			<addImage :type="'edi'" @getAppliedWin="getImageResult"></addImage>
		</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			count: '0',
			allTotal: 1,
			page: 1,
			num: 10,
			brandName: '', //品牌名称
			fileName: '', //首页展示图片的
			imgHost: '',
			proList: [] //图片列表

		};
	},
	methods: {
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
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			//this.openProList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			//this.openProList();
		},
		getImageResult:function(res){//图片弹窗的回调

		}
	},
	watch: {},
	computed: {},
	components: {
		addImage: () =>
			import( /*webpackChunkName: 'food_stamps_win'*/ './food_stamps_win'),
	},
	mounted() {
		this.imgHost = storage.session('userShop').uploadUrl; //图片的前缀
	}
};
</script>
<style type="text/css" scoped>
#foodStamp {
	width: 100%;
	height: 100%;
}

#foodStamp .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#foodStamp .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#foodStamp .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#foodStamp .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#foodStamp .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#foodStamp .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
}

#foodStamp .online-box .uploadImgs {
	width: 179px;
	position: relative;
}

#foodStamp .uploadImgs input {
	width: 179px;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

#foodStamp .online-box .win-imgShow {
	width: 250px;
	height: 150px;
}

#foodStamp .online-box .win-imgShow img {
	width: 100%;
	height: 100%;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
	color: #999999;
}

</style>