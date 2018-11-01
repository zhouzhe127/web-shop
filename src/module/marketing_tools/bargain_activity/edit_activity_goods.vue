<template>
	<div id="ActiityGoods">
		<el-form ref="formDm" :model="form" :rules="validateRules" label-width="160px">
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="form.name" class="w217"></el-input> <span class="textTip">限20字</span>
			</el-form-item>
			<el-form-item label="商品券">
				<el-button type="primary" @click="showCouponListHandle">关联券</el-button>
				<span class="textTip" v-if="selectedCoupon">已关联{{selectedCoupon.name? selectedCoupon.name : '一张优惠券'}}</span>
			</el-form-item>
			<!-- prop="imgUrl" -->
			<el-form-item  label="商品图片" >
				<div class="good-image">
					<div class="good-image-div" id="image">
						<img v-if="form.imgUrl" :src="(form.imgUrl.indexOf('http')>-1)?form.imgUrl: uploadUrl+form.imgUrl" width="225" height="150">
						<img v-else src="../../../res/images/busis.png" width="225" height="150" alt="商品" />
						<a class="gray good-image-delete" @click="deleteGoodImg">删除图片</a>
						<a class="good-image-edit">编辑图片</a>
						<form enctype="multipart/form-data" id="img_upload">
							<input type="file" @change="uploadGoodsImg" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" class="good-image-file" />
						</form>
					</div>
				</div>
				<!-- <section style="width:100%;overflow:auto;">
				</section> -->
			</el-form-item>
			<el-form-item label="商品描述" prop="remark">
				<el-input v-model="form.remark" class="w217" maxlength="20"></el-input>
				<span class="textTip">限20字</span>
			</el-form-item>
			<el-form-item label="商品原价/起砍价" prop="originalPrice">
				<el-input v-model.number="form.originalPrice" class="w217"></el-input>
				<span class="unit">元</span>
				<span class="textTip">商品起始砍价金额</span>
			</el-form-item>
			<el-form-item label="砍价人数" prop="needPeople">
				<el-select v-model="form.needPeople" placeholder="请选择砍价人数">
					<el-option :label="k+2 +'个人'" :value="k+2" v-for="k in 18" :key="k"></el-option>
				</el-select>
				<span class="textTip">参与人数达到填写人数完成砍价，包含发起人</span>
			</el-form-item>
			<el-form-item label="底价" prop="floorPrice">
				<el-input v-model.number="form.floorPrice" class="w217"></el-input><span class="unit">元</span>
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
				<div class="planValueWrap" >
					<el-input v-model="form.planValue" class="w217" :disabled="!qualifiedFloorPrice.isOk"></el-input>
					<span class="unit">{{form.planType==1?'元':'%'}}</span>
					<span class="textTip">{{form.planType==1?'请输入数字，只保留小数点后两位。输入金额不能低于1元，也不能超过底价':`请输入比例，区间${minPlanValue}%~100%`}}</span>
				</div>
				<el-alert class="lh20" v-if="!qualifiedPlanValue && form.planValue" :title="form.planType==1?'返利不能低于1元，也不能超过底价哦~':'请输入区间内数值'" type="error" :closable="false" show-icon>
				</el-alert>
			</el-form-item>
			<el-form-item label="砍价时间" prop="lifeCycle">
				<el-select v-model="form.lifeCycle" placeholder="请选择时间间隔">
					<el-option :label="v+1+'小时'" :value="v+1" v-for="(v,i) in 22" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="cancel(0)">取消</el-button>
				<el-button type="primary" @click="submit(false)">保存</el-button>
				<el-button type="primary" @click="submit(true)" v-if="hasGoodsNum<4">保存并新建商品</el-button>
			</el-form-item>
		</el-form>
		<el-dialog title="添加关联优惠券" :visible.sync="showCouponList" width="720px">
			<div class="dialogContent">
				<div class="tab">
					<el-button type="primary" @click="gotoAddCoupon" class="fr">新增优惠券</el-button>
					<el-radio-group v-model="couponType">
						<el-radio-button label="0">全部</el-radio-button>
						<el-radio-button label="1">减免</el-radio-button>
						<el-radio-button label="2">赠菜</el-radio-button>
					</el-radio-group>
				</div>
				<div class="listWrap">
					<ul class="listContent" v-if="couponList.length">
						<li v-for="(v,i) in couponList" :key="i" @click="selectedCouponTemp = v" :class="{sign: selectedCouponTemp && selectedCouponTemp.id==v.id}">{{v.name}}</li>
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
function validateOriginalPrice(rule, value, cb) {
	if (/\D+/g.test(value + '')) {
		cb(new Error('必须输入正整数,请按照正确格式填写'));
	} else {
		cb();
	}
}
// function validateFloorPrice(rule, value, cb) {
// 	if (this.form.originalPrice - value < 1) {
// 		cb(new Error('底价至少低于原价1元'));
// 	} else {
// 		cb();
// 	}
// }
const validateRules = {
	name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
	remark: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
	originalPrice: [
		{ required: true, message: '请输入原价(起砍价)', trigger: 'blur' },
		{ validator: validateOriginalPrice, trigger: 'blur' }
	],
	needPeople: [{ required: true, message: '请选择砍价人数' ,trigger: 'change'}],
	floorPrice: [
		{ required: true, message: '请填写底价', trigger: 'blur' },
		{ type: 'number', message: '底价必须为数字值' },
		// { min: 1, message: '底价不能少于一元' , trigger: 'blur'}
	],
	lifeCycle: [ { required: true, message: '请选择砍价单次有效时间', trigger: 'change' } ],
	imgUrl: [ { required: true, message: '请提交一张有效图片', trigger: 'change' } ],
	planValue: [ { required: true, message: '请填写完整返利方案', trigger: 'blur' } ]
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
				lifeCycle: '' // 砍价生存时间 （按小时计）
				// delayHours: '', // 延迟生效时间，按小时计算
				// isDiscount: '1', // 是与其他优惠共享 0否，1是
				// validityType: '0', // 有效期类型:0相对时间,1绝对时间
				// relativeTime: '', // 有效期相对时间（领券后按天计算）
				// validityTime: '',
				// beginTime: '', // 优惠券生效时间
				// endTime: '', // 优惠券失效时间
				// useTime: '', // 使用时段,空代表不限制
				// status: '' // 状态 0.初始；1上架；3下架
			},
			couponType: '0',
			validateRules: validateRules,
			showCouponList: false,
			showAddCoupon: false, // 显示新建的优惠券
			couponList: [], // 优惠券列表
			selectedCoupon: '', // 选中的优惠券
			selectedCouponTemp: '' // 选中的优惠券 临时存
		};
	},
	props: {
		selectGoods: Object,
		goodsNum: {type:Number,required: true}
	},
	methods: {
		//编辑图片
		async uploadGoodsImg() {
			this.form.imgUrl = await http.uploadImg({
				data: {
					type: 5,
					shopId: shopId
				},
				formId: 'img_upload'
			});
		},
		deleteGoodImg() {
			if(this.form.imgUrl == ''){
				this.$message({
					message: '此商品无图片!',
					type: 'warning'
				});
			}else{
				this.form.imgUrl = '';
			}
		},
		cancel(isRefrech) {
			this.$emit('close',isRefrech);
		},
		validate() {
			let isOk = true;

			this.$refs.formDm.validate(valid => {
				if (valid) {
					if (!this.qualifiedFloorPrice) {
						this.$message.error('请填写合适的底价');
						isOk = false;
					}
					if(!this.selectedCoupon || !this.selectedCoupon.id ){
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
		submit(createAgain) {
			if (!this.validate()) {
				return;
			}
			let prarm = JSON.parse(JSON.stringify(this.form));
			prarm.actId = this.selectedActivity.id;
			prarm.startPrice = prarm.originalPrice;
			prarm.couponId = this.selectedCoupon.id;
			if (this.selectedGoods) {
				prarm.id = this.selectedGoods.id;
				this.editGoods(prarm);
			} else {
				this.addGoods(prarm);
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
			if (data) {
				this.$message({type: 'success',message: '保存成功'});
				prarm.id = data;
				this.$store.commit('changeActivity', true,);
				this.hasGoodsNum++ ;
			}
		},
		async editGoods(prarm) {
			let data = await http.activityEditGoods({
				data: prarm
			});
			if(data){
				this.$message({type: 'success',message: '保存成功'});
				this.$store.commit('changeActivity', true);
			}
		},
		resetGoods() {
			this.$refs.formDm.resetFields();
			this.form.planValue = '';
			this.form.needPeople = '';
			this.selectedCoupon = '';
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
			selectedGoods.originalPrice = selectedGoods.startPrice;

			this.form = selectedGoods;
			this.selectedCoupon = {id: selectedGoods.couponId};
		},
		async getCouponList() {
			// let list = await http.getCouponList({
			// 	data: {
			// 		fromType: 2
			// 	}
			// })
			// this.couponList = list
			this.couponList = [
				{
					id: '386',
					type: '5',
					name:
						'\u8d60\u7edd\u4ee3\u53cc\u9a84-\u4e0d\u542b\u53e3\u5473-\u4e0d\u53c2\u4e0e\u4efb\u4f55\u4f18\u60e0'
				},
				{
					id: '387',
					type: '5',
					name:
						'\u8d60\u7edd\u4ee3\u53cc\u9a84-\u542b\u53e3\u5473-\u4e0d\u53c2\u4e0e\u4efb\u4f55\u4f18\u60e0'
				},
				{
					id: '388',
					type: '5',
					name:
						'\u8d60\u7edd\u4ee3\u53cc\u9a84-\u4e0d\u542b\u53e3\u5473-\u4e0d\u53c2\u4e0e\u4f1a\u5458\u4f18\u60e0'
				},
				{
					id: '389',
					type: '5',
					name:
						'\u8d60\u7edd\u4ee3\u53cc\u9a84-\u542b\u53e3\u5473-\u4e0d\u53c2\u4e0e\u4f1a\u5458\u4f18\u60e0'
				},
				{
					id: '390',
					type: '5',
					name:
						'\u8d60\u7edd\u4ee3\u53cc\u9a84-\u4e0d\u542b\u53e3\u5473-\u53c2\u4e0e\u4f1a\u5458\u4f18\u60e0'
				},
				{
					id: '391',
					type: '5',
					name:
						'\u8d60\u7edd\u4ee3\u53cc\u9a84-\u542b\u53e3\u5473-\u53c2\u4e0e\u4f1a\u5458\u4f18\u60e0'
				},
				{
					id: '392',
					type: '5',
					name:
						'\u8d60\u5957\u9910-\u542b\u53e3\u5473-\u53c2\u4e0e\u4f1a\u5458\u4f18\u60e0'
				},
				{
					id: '393',
					type: '5',
					name:
						'\u8d60\u5957\u9910-\u542b\u53e3\u5473-\u4e0d\u53c2\u4e0e\u4f1a\u5458\u4f18\u60e0'
				},
				{
					id: '394',
					type: '5',
					name:
						'\u8d60\u5957\u9910-\u542b\u53e3\u5473-\u4e0d\u53c2\u4e0e\u4efb\u4f55\u4f18\u60e0'
				},
				{
					id: '395',
					type: '6',
					name:
						'\u5f3a\u5236-\u4ee3200-\u4e0d\u4e0e\u4efb\u4f55\u4f18\u60e0'
				}
			];
			
		},
		addCouponCb(success) {
			if (success) {
				//  跟新优惠券列表
			}
		},
		showCouponListHandle() {
			this.getCouponList();
			this.selectedCouponTemp =JSON.parse(JSON.stringify(this.selectedCoupon));
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
				: { isOk: false, message: floorPrice === '' ? '' : (floorPrice >= 1? '底价至少低于原价1元~~' : '底价不能低于1元')};
		},
		minPlanValue: function() {
			let floorPrice = this.form.floorPrice,
				// planValue = this.form.planValue,
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
		}
	},
	created() {
		// 编辑
		if (this.selectedGoods) {
			this.$nextTick(()=>{ // 不放到 nextTick resetFieIds 将会无效
				this.initGoods();
			});
		}
		this.hasGoodsNum = this.goodsNum;
	},
	components: {
		// ElShopList: () => {
		// 	return import(/*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList');
		// },
		// GoodsListWin: () =>
		// 	import(/*webpackChunkName: 'good_list_win'*/ 'src/components/good_list_win.vue')
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
	width: 225px;
	height: 150px;
	.good-image-div {
		position: relative;
		width: 225px;
		height: 150px;
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
.emtyList{
	height: 90px;
	line-height: 90px;
	text-align: center;
	color: #ccc;
}
.addCouponPage{
	position: absolute;
	top: 0;
	left: 0;
	background-color: #fff;
}
</style>
