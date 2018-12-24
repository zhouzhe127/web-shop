<template>
	<div id="ActiityGoods">
		<el-form ref="formDm" :model="form" :rules="validateRules" label-width="160px">
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="form.name" class="w217" maxlength="20" placeholder="请输入商品名称"></el-input> <span class="textTip">限20字</span>
			</el-form-item>
			<el-form-item label="商品券" required>
				<el-button type="primary" @click="showCouponListHandle">关联券</el-button>
				<span class="textTip" v-if="selectedCoupon">已关联一张优惠券{{selectedCoupon.name? '： '+selectedCoupon.name : ''}}</span>
			</el-form-item>
			<!-- prop="imgUrl" -->
			<el-form-item label="商品图片" prop="imgUrl">
				<div class="good-image">
					<div class="good-image-div" id="image">
						<img v-if="form.imgUrl" :src="(form.imgUrl.indexOf('http')>-1)?form.imgUrl: uploadUrl+form.imgUrl" width="160" height="160">
						<img v-else src="../../../res/images/busis.png" width="160" height="160" alt="商品" />
						<a class="gray good-image-delete" @click="deleteGoodImg">删除图片</a>
						<a class="good-image-edit">编辑图片</a>
						<form enctype="multipart/form-data" id="img_upload" ref="imgForm">
							<input type="file" @change="uploadGoodsImg" ref="imgUploadBtn" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" class="good-image-file" />
						</form>
					</div>
				</div>
				<!-- <section style="width:100%;overflow:auto;">
				</section> -->
			</el-form-item>
			<el-form-item label="商品描述" prop="remark">
				<el-input v-model="form.remark" class="w217" maxlength="20" placeholder="请输入商品描述"></el-input>
				<span class="textTip">限20字</span>
			</el-form-item>
			<el-form-item label="商品原价/起砍价" prop="originalPrice">
				<el-input v-model.number="form.originalPrice" class="w217" placeholder="请输入起砍价"></el-input>
				<span class="unit">元</span>
				<span class="textTip">商品起始砍价金额</span>
			</el-form-item>
			<el-form-item label="砍价人数" prop="needPeople">
				<el-select v-model="form.needPeople" placeholder="请选择砍价人数">
					<el-option :label="k+1 +'个人'" :value="k+1" v-for="k in 9" :key="k"></el-option>
				</el-select>
				<span class="textTip">参与人数达到填写人数完成砍价，包含发起人</span>
			</el-form-item>
			<el-form-item label="底价" prop="floorPrice">
				<el-input v-model.number="form.floorPrice" class="w217" placeholder="请输入底价"></el-input><span class="unit">元</span>
				<div class="alertWrap lh20">
					<el-alert v-if="qualifiedFloorPrice.message" :title="qualifiedFloorPrice.message" :type="qualifiedFloorPrice.isOk?'success':'error'" :closable="false" show-icon>
					</el-alert>
				</div>
			</el-form-item>
			<el-form-item label="返利方案" prop="planValue">
				<el-radio-group v-model="form.planType">
					<el-radio-button label="1" type="primary">固定金额</el-radio-button>
					<el-radio-button label="2" type="primary">按比例</el-radio-button>
				</el-radio-group>
				<div class="planValueWrap">
					<el-input v-model="form.planValue" placeholder="请输入返利信息" class="w217" :disabled="!qualifiedFloorPrice.isOk"></el-input>
					<span class="unit">{{form.planType==1?'元':'%'}}</span>
					<span class="textTip">{{form.planType==1?'请输入数字，只保留小数点后两位。输入金额不能低于1元，也不能超过底价':`请输入比例，区间${minPlanValue}%~100%`}}</span>
				</div>
				<el-alert class="lh20" v-if="!qualifiedPlanValue && form.planValue" :title="form.planType==1?'返利不能低于1元，也不能超过底价哦~':'请输入区间内数值'" type="error" :closable="false" show-icon>
				</el-alert>
			</el-form-item>
			<el-form-item label="砍价时间" prop="lifeCycle">
				<el-select v-model="form.lifeCycle" placeholder="请选择时间间隔">
					<el-option :label="v+'小时'" :value="v" v-for="(v,i) in 24" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人均砍价次数" prop="peopleLimit">
        <el-select v-model="form.peopleLimit" placeholder="请选择砍价次数">
          <el-option :label="k +'次'" :value="k" v-for="k in 5" :key="k"></el-option>
          <el-option label="无限制" :value="0" ></el-option>
        </el-select>
        <span class="textTip">该商品最多可发起砍价次数/人</span>
      </el-form-item>
      <el-form-item label="商品发起砍价总次数" prop="upperLimit">
        <el-input v-model="form.upperLimit" class="w217" placeholder="请输入次数" maxlength="6"></el-input>
        <span class="textTip">该商品最多可发起砍价总次数，0为无上限</span>
      </el-form-item>
      <el-form-item label="商品详情" prop="lifeCycle">
				<div>
					
					<el-switch
						v-model="imgListCollapse"
						active-text="收起篇幅"
						inactive-text="展开篇幅">
					</el-switch>
        	<span class="textTip">规格750*X(最多十张)</span>
				</div>
				<div class="img-list" :class="{collapse: imgListCollapse}">
					<div class="imgBox" :key="i" v-for="(v,i) in form.imgList">
						<div class="img-content">
							<div class="floatLayer">
								<el-button type="info" icon="el-icon-upload2" circle @click="sortChange(0,v,i)"></el-button>
								<div class="btns">
									<el-button @click="delImage(i)" type="danger" class="delBtn">删除</el-button>
									<form enctype="multipart/form-data" :id="'detailImgForm_' + i">
										<el-button type="primary" class="editBtn">编辑</el-button>
										<input @change="updateImg(i)" ref="detailImgEdit" type="file" class="editInput" accept="image/jpeg,image/png,image/gif,image/tiff"
												name="image" />
									</form>
								</div>
								<el-button type="info" icon="el-icon-download" circle @click="sortChange(1,v,i)"></el-button>
							</div>
							<img :src="uploadUrl  + v" />
						</div>
						<!-- <div class="sortBox">
							<el-input-number :value="i" @change="sortChange" :min="1" :max="10"></el-input-number>
						</div> -->
					</div>
					<div class="imgBox add" v-if="form.imgList.length < 10">
						<el-button type="primary" icon="el-icon-plus">添加</el-button>
						<form enctype="multipart/form-data" id="detailImgAdd">
							<input @change="updateImg()" ref="detailImgAdd"  type="file"  accept="image/jpeg,image/png,image/gif,image/tiff" name="image"
							/>
						</form>
					</div>

				</div>
      </el-form-item>
			<el-form-item>
				<el-button @click="cancel(0)">取消</el-button>
				<el-button type="primary" @click="submit(false)">保存</el-button>
				<el-button type="primary" @click="submit(true)" v-if="hasGoodsNum<4">保存并新建商品</el-button>
				<!-- <el-button type="primary" @click="resetGoods">重置</el-button> -->
			</el-form-item>
		</el-form>
		<el-dialog title="添加关联优惠券" :visible.sync="showCouponList" width="720px">
			<div class="dialogContent">
				<div class="tab">
					<el-button type="primary" @click="gotoAddCoupon" class="fr">新增优惠券</el-button>
					<el-radio-group v-model="couponType">
						<el-radio-button label="0">全部</el-radio-button>
						<el-radio-button label="1">满减优惠券</el-radio-button>
						<el-radio-button label="2">赠菜优惠券</el-radio-button>
					</el-radio-group>
				</div>
				<div class="listWrap">
					<ul class="listContent" v-if="couponFilter.length">
						<li v-for="(v,i) in couponFilter" :key="i" @click="selectedCouponTemp = v" :class="{sign: selectedCouponTemp && selectedCouponTemp.id==v.id}">{{v.name}}</li>
					</ul>
					<div v-else class="emtyList">~~暂无数据~~</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showCouponList = false">取 消</el-button>
				<el-button type="primary" @click="confirmSelectCoupon">确 定</el-button>
			</span>
		</el-dialog>

		<template v-if="showAddCoupon">
			<add-coupon @couponCallBack="couponCb" class="addCouponPage" :isBargain="true"></add-coupon>
		</template>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
let userShop = storage.session('userShop');
const shopId = userShop.currentShop.id;
function intNumber(rule, value, cb) {
	if (/\D+/g.test(value + '')) {
		cb(new Error('必须输入正整数,请按照正确格式填写'));
	} else {
		cb();
	}
}
function notEmptyString(r, v, cb) {
	if (v.trim() == '') {
		cb(new Error('该信息为必填项不能为空'));
	} else {
		cb();
	}
}
function validateName(r, v, cb) {
	if (!/^([\u4e00-\u9fa5a-zA-Z0-9()（）.,，。！!%#$￥:：+-=@——【】]|\s|\[|\])+$/.test(v)) {
		cb(new Error('名称必须由中文、字母、数字以及常规符号组成'));
	} else {
		cb();
	}
}
const validateRules = {
	name: [
		{ required: true, message: '请输入商品名称', trigger: 'blur' },
		{ validator: notEmptyString, trigger: 'blur' },
		{ validator: validateName, trigger: 'blur' }
	],
	remark: [
		{ required: true, message: '请输入活动描述', trigger: 'blur' },
		{ validator: notEmptyString, trigger: 'blur' }
	],
	originalPrice: [
		{ required: true, message: '请输入原价(起砍价)', trigger: 'blur' },
		{ validator: intNumber, trigger: 'blur' }
	],
	needPeople: [
		{ required: true, message: '请选择砍价人数', trigger: 'change' }
	],
	floorPrice: [
		{ required: true, message: '请填写底价', trigger: 'blur' },
		{ type: 'number', message: '底价必须为数字值' }
		// { min: 1, message: '底价不能少于一元' , trigger: 'blur'}
	],
	lifeCycle: [
		{ required: true, message: '请选择砍价单次有效时间', trigger: 'change' }
	],
	imgUrl: [
		{ required: true, message: '请提交一张有效图片', trigger: 'change' }
	],
	planValue: [
		{ required: true, message: '请填写完整返利方案', trigger: 'blur' }
	],
	upperLimit: [
		{ required: true, message: '请填写商品最大砍价次数，如不限制，请填0', trigger: 'blur' },
		{ validator: intNumber, trigger: 'blur' }
	],
	peopleLimit: [
		{ required: true, message: '请选择人均砍价次数', trigger: 'blur' }
	]
};
export default {
	data: () => {
		return {
			uploadUrl: userShop.uploadUrl,
			hasGoodsNum: 0,
			form: {
				id: '', // id
				actId: '', // 活动id
				name: '', // 活动券名称
				// type: 1, // 活动券名称1代金券；2商品券
				imgUrl: '', // 券图片地址
				remark: '', // 券描述
				originalPrice: '', // 原价
				floorPrice: '', // 底价
				needPeople: '', // 砍价人数
				planType: 1, // 返利方案类型 1：固定金额；2按比例
				planValue: '', // 返利值。如果planType=1，则表示返利金额；如果planType=2，则表示返利百分比；
				lifeCycle: '', // 砍价生存时间 （按小时计）
				upperLimit: '', // 商品发起砍价次数
				peopleLimit: '', //人均砍价次数
				imgList: [], // 商品详情图片列表
			},
			couponType: '0',
			validateRules: validateRules,
			showCouponList: false,
			showAddCoupon: false, // 显示新建的优惠券
			couponList: [], // 优惠券列表
			selectedCoupon: '', // 选中的优惠券
			selectedCouponTemp: '', // 选中的优惠券 临时存
			imgListCollapse: false, // 图片详情是否展开
		};
	},
	props: {
		selectGoods: Object,
		goodsNum: { type: Number, required: true }
	},
	methods: {
		//编辑图片
		async uploadGoodsImg() {
			let files = this.$refs.imgUploadBtn.files;
			if(files.length == 0)return;
			this.form.imgUrl = await http.uploadImg({
				data: {
					type: 5,
					shopId: shopId
				},
				formId: 'img_upload'
			});
		},
		deleteGoodImg() {
			if (this.form.imgUrl == '') {
				this.$message({
					message: '此商品无图片!',
					type: 'warning'
				});
			} else {
				this.form.imgUrl = '';
			}
		},
		cancel(isRefrech) {
			this.$emit('close', isRefrech);
		},
		validate() {
			let isOk = true;
			this.$refs.formDm.validate(valid => {
				if (valid) {
					if (!this.qualifiedFloorPrice) {
						this.$message.error('请填写合适的底价');
						isOk = false;
					}
					if (!this.selectedCoupon || !this.selectedCoupon.id) {
						this.$message.error('必须选择关联一张优惠券');
						isOk = false;
					}
					if (!this.qualifiedPlanValue) {
						this.$message.error('请填写正确的返利金额');
						isOk = false;
					}
				} else {
					this.$message.error('请填写将信息补充完整');
					isOk = false;
				}
			});
			return isOk;
		},
		async submit(createAgain) {
			if (!this.validate()) {
				return;
			}
			let prarm = JSON.parse(JSON.stringify(this.form));
			prarm.actId = this.selectedActivity.id;
			prarm.startPrice = prarm.originalPrice;
			prarm.couponId = this.selectedCoupon.id;
			prarm.detail = JSON.stringify(prarm.imgList);
			delete prarm.imgList;
			// 新建商品 | 编辑商品有name说明改过了
			if (!this.selectedGoods || this.selectedCoupon.name) {
				prarm.coupon = JSON.stringify(this.selectedCoupon);
			}
			if (this.selectedGoods) {
				prarm.id = this.selectedGoods.id;
				await this.editGoods(prarm);
			} else {
				await this.addGoods(prarm);
			}
			if (createAgain) {
				this.resetGoods();
			} else {
				this.cancel(1);
			}
		},
		async addGoods(prarm) {
			let data = await http.activityAddGoods({
				data: prarm
			});
			if (data || data === 0) {
				this.$message({ type: 'success', message: '保存成功' });
				prarm.id = data;
				this.$store.commit('changeActivity', true);
				this.hasGoodsNum++;
			}
		},
		async editGoods(prarm) {
			let data = await http.activityEditGoods({
				data: prarm
			});
			if (data) {
				this.$message({ type: 'success', message: '保存成功' });
				this.$store.commit('changeActivity', true);
			}
		},
		resetGoods() {
			this.$refs.formDm.resetFields();
			this.form.planValue = '';
			this.form.needPeople = '';
			this.form.upperLimit = '';
			this.form.peopleLimit = '';
			this.form.imgUrl = '';
			this.form.imgList = [];
			this.selectedCoupon = '';
			this.$refs.imgForm && this.$refs.imgForm.reset(); //
		},
		initGoods() {
			let selectedGoods = JSON.parse(JSON.stringify(this.selectedGoods));
			// selectedGoods.validityTime = [
			// 	new Date(selectedGoods.beginTime),
			// 	new Date(selectedGoods.endTime)
			// ];
			selectedGoods.planType -= 0;
			selectedGoods.planValue -= 0;
			selectedGoods.floorPrice -= 0;
			selectedGoods.originalPrice = +selectedGoods.startPrice;
			selectedGoods.imgList =selectedGoods.detail ? selectedGoods.detail : [];
			delete selectedGoods.detail;
			this.form = selectedGoods;
			this.selectedCoupon = { id: selectedGoods.couponId };
		},
		async getCouponList() {
			let list = await http.getAllCouponLists({
				data: {
					fromType: 2
				}
			});
			this.couponList = list;
		},
		showCouponListHandle() {
			this.getCouponList();
			this.selectedCouponTemp = JSON.parse(
				JSON.stringify(this.selectedCoupon)
			);
			this.showCouponList = true;
		},
		confirmSelectCoupon() {
			this.selectedCoupon = this.selectedCouponTemp;
			this.showCouponList = false;
		},
		gotoAddCoupon() {
			this.showCouponList = false;
			this.showAddCoupon = true;
		},
		couponCb() {
			this.showAddCoupon = false;
		},
		// 删除详情中的图片
		delImage(i) {
			if(i==undefined)return;
			this.form.imgList.splice(i,1);
		},
		// 1.商品；2.套餐；3.轮播图；4.营业执照/商标；5.活动商品；6.活动素材；7.会员等级；8.店铺logo；9.卖手聊天图片；10召集令图片
		async uploadImg (formId){
			let url = await http.uploadImg({
				data: {
					type: 6,
					shopId: shopId
				},
				formId
			});
			return url;
		},
		// 编辑图片
		async updateImg(index){
			if(index == undefined){
				// 添加
				let files = this.$refs.detailImgAdd.files;
				if(files.length == 0)return;
				let url = await this.uploadImg('detailImgAdd');
				this.form.imgList.push(url);
			}else{
				// 编辑
				let files = this.$refs.detailImgEdit[index].files;
				if(files.length == 0)return;
				let url = await this.uploadImg('detailImgForm_' + index);
				this.form.imgList.splice(index,1,url);
			}
		},
		sortChange(isdown,v,i){
			if(isdown && i == this.form.imgList.length-1 || !isdown && i==0)return;
			let tagetIndex = isdown?i+1:i-1;
			let taget = this.form.imgList[tagetIndex];
			this.form.imgList.splice(tagetIndex,1,v);
			this.form.imgList.splice(i,1,taget);
		}
	},
	computed: {
		// 合格的底价
		qualifiedFloorPrice: function() {
			let originalPrice = this.form.originalPrice,
				floorPrice = this.form.floorPrice,
				needPeople = this.form.needPeople,
				Average, // 平均数
				qualifiedMsg; // 合格的提示
			let isQualified = // 是合格的
				originalPrice !== '' &&
				floorPrice !== '' &&
				floorPrice >= 1 &&
				originalPrice - floorPrice >= 1;
			if (isQualified) {
				if (needPeople) {
					Average = +(
						(originalPrice - floorPrice) /
						needPeople
					).toFixed(2);
					qualifiedMsg = `您的人均砍价金额为：
					（${originalPrice}-${floorPrice}）/ ${needPeople}
						= ${Average}元`;
				} else {
					qualifiedMsg = `您的人均砍价金额为：（原价-底价）/人数 = XXX元`;
				}
			}
			return isQualified
				? { isOk: true, message: qualifiedMsg }
				: { isOk: false, message: floorPrice === '' ? '' : floorPrice >= 1 ? '底价至少低于原价1元~~' : '底价不能低于1元' };
		},
		minPlanValue: function() {
			let floorPrice = this.form.floorPrice,
				planType = this.form.planType;
			if (planType == 1 || this.qualifiedFloorPrice.isOk == false)
				return 1;
			else {
				return Math.ceil(100 / floorPrice);
			}
		},
		qualifiedPlanValue: function() {
			let floorPrice = this.form.floorPrice,
				planValue = this.form.planValue,
				planType = this.form.planType;

			if (planType == 1) {
				// 固定金额
				return planValue >= 1 && planValue <= floorPrice;
			} else {
				// 百分比
				return planValue >= this.minPlanValue && planValue <= 100;
			}
		},
		selectedGoods() {
			return this.$store.getters.getGoods;
		},
		selectedActivity() {
			return this.$store.getters.getActivity;
		},
		couponFilter() {
			return (
				this.couponList &&
				this.couponList.filter(v => {
					if (this.couponType == '0') return true;
					if (this.couponType == '1') return v.type == '2';
					if (this.couponType == '2') return v.type == '5';
				})
			);
		}
	},
	created() {
		// 编辑
		if (this.selectedGoods) {
			this.$nextTick(() => {
				// 不放到 nextTick resetFieIds 将会无效
				this.initGoods();
			});
		}
		this.hasGoodsNum = this.goodsNum;
	},
	components: {
		AddCoupon: () =>
			import(/*webpackChunkName: 'breaks_give_food'*/ './../new_coupons/breaks_give_food.vue')
	}
};
</script>

<style lang="less" scoped>
#ActiityGoods {
	position: absolute;
	top: 0px;
	left: 0;
	right: 0;
	background-color: #fff;
}
.textTip {
	padding: 0 5px;
	color: #cecece;
}
.unit {
	display: inline-block;
	width: 30px;
	text-align: center;
}
.alertWrap {
	margin-top: 5px;
}
.lh20 {
	line-height: 20px;
}
.planValueWrap {
	margin: 10px 0;
}
.relativeTimeInput {
	margin: 0 5px;
	width: 50px;
}
.good-image {
	width: 160px;
	height: 160px;
	.good-image-div {
		position: relative;
		width: 160px;
		height: 160px;
		background: url(../../../res/images/upload.png) center 40px no-repeat
			#ddd;
	}

	.good-image-delete {
		background-color: rgba(27, 21, 21, 0.6);
		height: 40px;
		line-height: 40px;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 50%;
		color: #fff;
		text-align: center;
		font-size: 16px;
	}
	.good-image-edit {
		background-color: #e1bb4a;
		height: 40px;
		line-height: 40px;
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 50%;
		color: #fff;
		text-align: center;
		font-size: 16px;
	}

	.good-image-file {
		position: absolute;
		bottom: 0;
		height: 40px;
		left: 50%;
		width: 50%;
		opacity: 0;
		cursor: pointer;
	}
}
.tab {
	margin-bottom: 20px;
}

.listWrap {
	max-height: 350px;
	overflow: auto;
	.listContent {
		overflow: hidden;
		li {
			position: relative;
			display: inline-block;
			height: 40px;
			line-height: 40px;
			padding: 0 18px;
			background-color: #f1f1f1;
			cursor: pointer;
			margin: 10px;
			width: 150px;
			text-align: center;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		li::after,
		li::before {
			content: '';
			width: 0;
			height: 0;
			border: 8px solid #fff;
			border-radius: 8px;
			position: absolute;
			bottom: 12px;
		}
		li::after {
			right: -9px;
		}
		li::before {
			left: -9px;
		}
	}
}
.emtyList {
	height: 90px;
	line-height: 90px;
	text-align: center;
	color: #ccc;
}
.addCouponPage {
	position: absolute;
	top: 0;
	left: 0;
	background-color: #fff;
}
// 详情
	.img-list{
		width: 350px;
		&.collapse{
			max-height: 700px;
		}
		border: 1px solid rgba(225, 187, 74,.8);
		overflow-y: auto;
		overflow-x: hidden;
		.imgBox{
			width: 350px;
		}
		.img-content{
			width: 100%;
			position: relative;
			&:hover .floatLayer{
				opacity: 1;
			}
		}
		.floatLayer{
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: all 0.3s;
			background-color: rgba(0,0,0,.35);
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction:column;
			align-items: center;
			justify-content: center;
			.btns{
				height: 60px;
				line-height: 60px;
				position: relative;
				width: 100%;
				input{
					position: absolute;
					opacity: 0;
    			cursor: pointer;
					width: 70px;
					height: 40px;
				}
				.delBtn,
				.editBtn,
				.editInput{
					position: absolute;
					top: 10px;
				}
				.delBtn{
					left: 80px;
				}
				.editBtn,.editInput{
					left: 200px;
				}
				
			}
		}
		img{
			width: 350px;
			vertical-align: top;
		}
		.add{
			padding: 20px 0;
			text-align: center;
			position: relative;
			input{
				position: absolute;
				width: 90px;
				height: 40px;
				cursor: pointer;
				opacity: 0;
				top: 20px;
				left: 130px;
			}
		}
	}
</style>
