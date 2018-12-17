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
					<el-button class="fl" type="primary" style="width:179px;" @click="addImages('add')">添加图片
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
					<div class="list_box" style="width:700px;">
						<div class="list_title">
							<div class="list_title_l fl">
								<span>图片列表</span>
								<span></span>
								<span>共
								<a href="javascript:;">{{allProList.length}}</a>张</span>
							</div>
							<div class="list_title_r fr">
							</div>
						</div>
						<el-table :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
							<el-table-column fixed prop="name" label="图片名称" width="200" align="center">
							</el-table-column>
							<el-table-column label="图片类型" prop="name" align="center" width="160">
								<template slot-scope="scope">
									<span>{{imgType[scope.row.type]}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="createTime" label="缩略图" align="center" width="160">
								<template slot-scope="scope">
									<div class="list_img">
										<el-popover placement="top" width="400" trigger="hover">
											<div class="bigImg">
												<img alt="logo" v-bind:src="imgHost  + scope.row.url" />
											</div>
												<img slot="reference" alt="logo" v-bind:src="imgHost  + scope.row.url" />
												</el-popover>
											</div>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button size="medium" type="text" style="color: #29abe2;" @click="addImages('edi',scope.row)">编辑</el-button>
									<span style="padding:0 5px;color: #D2D2D2">|</span>
									<el-button size="medium" type="text" style="color: #fd3f1f;" @click="deleteImg(scope.row)">删除</el-button>
								</template>
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
					<el-button class="fl" type="primary" style="width:179px;" @click="saveConfig">保存
					</el-button>
				</div>
			</div>
			<!-- 添加图片的弹窗 -->
			<add-image v-if="showWin" :type="type" :detail="detail" :allProList="allProList" @getAppliedWin="getImageResult"></add-image>
		</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			allTotal: 1,
			page: 1,
			num: 10,
			brandName: '', //品牌名称
			fileName: '', //首页展示图片的
			imgHost: '',
			allProList: [], //所有的数据
			proList: [], //图片列表
			showWin: false,
			imgType: {
				0: '环境',
				1: '商品'
			},
			type: 'add', //新增或编辑
			detail: {} //某个详情
		};
	},
	methods: {
		valiData: function(content, title, winType) { //弹窗提示格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
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
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			this.setPage();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.setPage();
		},
		getImageResult: function(res) { //图片弹窗的回调
			if (res == 'ok') {
				this.foodGetShopPs();
			}
			this.showWin = false;
		},
		addImages: function(type, item) { //添加更多图片
			this.type = type;
			if (type == 'edi') {
				this.detail = item;
			}
			this.showWin = true;
		},
		async foodGetShopPs() { //获取粮票装修信息
			let res = await http.foodGetShopPs({
				data: {

				}
			});
			if (res) {
				this.brandName = res.shopName;
				this.fileName = res.topImg;
				this.allProList = [];
				for (let key in res.imgs) {
					let obj = {
						id: key,
						url: res.imgs[key].url,
						type: res.imgs[key].type,
						name: res.imgs[key].name
					};
					this.allProList.push(obj);
				}
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		checkForm: function() {
			if (this.brandName == '') {
				this.valiData('请填写品牌名称!');
				return false;
			}
			if (this.fileName == '') {
				this.valiData('请上传首页展示图片!');
				return false;
			}
			return true;
		},
		saveConfig: function() { //保存配置
			this.foodUpdate();
		},
		async foodUpdate() { //更新配置
			if (!this.checkForm()) return;
			let date = await http.foodUpdate({
				data: {
					name: this.brandName, //品牌名称
					topImg: this.fileName,
					img: ''
				}
			});
			if (date) {
				this.valiData('保存成功!');
			}
		},
		setPage: function() { //自定义翻页
			this.allTotal = Math.ceil((this.allProList.length) / (this.num)); //根据数据总和和一页展示的数量计算出总页数
			let pageStart = (this.page - 1) * (this.num); //起始
			let pageEnd = (this.page) * (this.num); //结束
			this.proList = this.allProList.slice(pageStart, pageEnd); //即将展示页面的数组
		},
		deleteImg: function(item) { //删除图片
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除该图片?',
				callback: (res) => {
					if (res == 'ok') {
						this.foodDeleteImg(item);
					}
				}
			});
		},
		async foodDeleteImg(item) {
			let res = await http.foodDeleteImg({
				data: {
					No: item.id
				}
			});
			if (res) {
				this.valiData('删除成功');
				this.foodGetShopPs();
			}
		}
	},
	components: {
		'add-image': () =>
			import( /*webpackChunkName: "food_stamps_win"*/ './food_stamps_win'),
	},
	mounted() {
		this.imgHost = storage.session('userShop').uploadUrl; //图片的前缀
		this.foodGetShopPs();
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

#foodStamp .list_img {
	height: 45px;
}

#foodStamp .list_img img {
	width: 45px;
	height: 45px;
}
.bigImg{
	width: 300px;
	height: 200px;
	margin: 0 auto;
}
.bigImg img{
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