<template>
	<div id="ActiityGoods">
		<el-form ref="formDm" :model="form" :rules="validateRules" label-width="160px">
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="form.name" class="w217"></el-input> <span class="textTip">限20字</span>
			</el-form-item>
			<el-form-item label="商品类型">
				<el-radio-group v-model="form.type">
					<el-radio-button label="1" type="primary">兑换券</el-radio-button>
					<el-radio-button label="2" type="primary">抵用券</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="" v-show="form.type == 1">
				<el-button type="primary" @click="showGoodsList = true">关联商品</el-button>
				<span class="textTip" v-if="form.goodsIds.length">已经选择{{form.goodsIds.length}}个商品</span>
			</el-form-item>
			<el-form-item label="实际抵扣金额" v-show="form.type == 2" prop="originalPrice">
				<el-input v-model.number="form.originalPrice" class="w217"></el-input>
				<span class="textTip">强制减免金额</span>
			</el-form-item>
			<el-form-item label="商品图片" required>
				<div style="width:300px;height: 200px;background: #cfcfcf;"> 编辑图片</div>
			</el-form-item>

			<el-form-item required label="商品图片">
				<section style="width:100%;overflow:auto;">
					<div class="good-image">
						<div class="good-image-div" id="image">
							<img v-if="form.imgUrl" :src="form.imgUrl" width="225" height="150">
							<img v-else src="../../../res/images/busis.png" width="225" height="150" alt="商品" />
							<a class="gray good-image-delete" @click="deleteGoodImg">删除图片</a>
							<a class="good-image-edit">编辑图片</a>
							<form enctype="multipart/form-data" id="img_upload">
								<input type="file" @change="uploadGoodsImg" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" class="good-image-file" />
							</form>
						</div>
					</div>
				</section>
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
			<el-form-item label="砍价人数" required>
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
			<el-form-item label="返利方案">
				<el-radio-group v-model="form.planType">
					<el-radio-button label="1" type="primary">固定金额</el-radio-button>
					<el-radio-button label="2" type="primary">按比例</el-radio-button>
				</el-radio-group>
				<div class="planValueWrap" required>
					<el-input v-model="form.planValue" class="w217" :disabled="!qualifiedFloorPrice.isOk"></el-input>
					<span class="unit">{{form.planType==1?'元':'%'}}</span>
					<span class="textTip">{{form.planType==1?'请输入数字，只保留小数点后两位。输入金额不能低于1元，也不能超过底价':`请输入比例，区间${minPlanValue}%~100%`}}</span>
				</div>
				<el-alert class="lh20" v-if="!qualifiedPlanValue && form.planValue" :title="form.planType==1?'返利不能低于1元，也不能超过底价哦~':'请输入区间内数值'" type="error" :closable="false" show-icon>
				</el-alert>
			</el-form-item>
			<el-form-item label="砍价时间" prop="lifeCycle">
				<el-select v-model="form.lifeCycle" placeholder="请选择时间间隔">
					<el-option :label="v+2+'小时'" :value="v+2" v-for="(v,i) in 22" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="适用门店" required>
				<el-shop-list :shopIds="form.shopIds" @chooseShop="backShopId"></el-shop-list>
			</el-form-item>
			<el-form-item label="券有效期" required>
				<el-radio-group v-model="form.validityType">
					<el-radio-button label="0">相对时间</el-radio-button>
					<el-radio-button label="1">指定时间</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="form.validityType=='0'" required>
				领取后<el-input v-model.number="form.relativeTime" class="relativeTimeInput"></el-input>日内有效
			</el-form-item>
			<el-form-item label="指定生效时间" v-else required>
				<el-date-picker v-model="form.validityTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="使用时段">
				<el-time-picker is-range v-model="form.useTime" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
				</el-time-picker>
			</el-form-item>
			<el-form-item label="优惠共享" required>
				<el-select v-model="form.isDiscount" placeholder="不与其它优惠共享">
					<el-option label="与其它优惠共享" value="1"></el-option>
					<el-option label="不与其它优惠共享" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="submit">保存</el-button>
				<el-button type="primary" @click="submitAndNewGoods">保存并新建商品</el-button>
			</el-form-item>
		</el-form>
		<template v-if="showGoodsList">
			<goods-list-win :goodsIds="form.goodsIds" :isGoods="true" :isOnlyGoods="true" @goodListWin="goodsListHandle"></goods-list-win>
		</template>
	</div>
</template>

<script>
import http from 'src/manager/http';

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
	originalPrice: [{ validator: validateOriginalPrice, trigger: 'blur' }],
	needPeople: [{ required: true, message: '请选择砍价人数' }],
	floorPrice: [
		{ required: true, message: '请填写底价', trigger: 'blur' },
		{ type: 'number', message: '底价必须为数字值' }
	],
	lifeCycle: [
		{ required: true, message: '请选择砍价单次有效时间', trigger: 'change' }
	]
};
export default {
	data: () => {
		return {
			form: {
				id: '', // id
				actId: '', // 活动id
				name: '', // 活动券名称
				type: 1, // 活动券名称1代金券；2商品券
				goodsIds: [], // 商品id
				imgUrl: '', // 券图片地址
				remark: '', // 券描述
				originalPrice: '', // 原价
				floorPrice: '', // 底价
				needPeople: '', // 砍价人数
				planType: 1, // 返利方案类型 1：固定金额；2按比例
				planValue: '', // 返利值。如果planType=1，则表示返利金额；如果planType=2，则表示返利百分比；
				lifeCycle: '', // 砍价生存时间 （按小时计）
				shopIds: '', // 使用门店
				delayHours: '', // 延迟生效时间，按小时计算
				isDiscount: '1', // 是与其他优惠共享 0否，1是
				validityType: '0', // 有效期类型:0相对时间,1绝对时间
				relativeTime: '', // 有效期相对时间（领券后按天计算）
				validityTime: '',
				beginTime: '', // 优惠券生效时间
				endTime: '', // 优惠券失效时间
				useTime: '', // 使用时段,空代表不限制
				status: '' // 状态 0.初始；1上架；3下架
			},
			validateRules: validateRules,
			showGoodsList: false
		};
	},
	props: {
		selectGoods: Object
	},
	methods: {
		//编辑图片
		async uploadGoodsImg() {
			console.log('我要提交图片了');
			this.form.imgUrl = await http.uploadImg({
				data: {
					type: 5,
					shopId: this.shopId
				},
				formId: 'img_upload'
			});
			console.log('this.form.imgUrl');
			console.log(this.form.imgUrl);
		},
		deleteGoodImg() {
			console.log('no emty fun');
		},
		cancel() {
			this.$emit('closeEditGoods');
		},
		validateDate() {
			this.$refs.formDm.validate(valid => {
				if (valid) {
					if (!this.qualifiedFloorPrice) {
						this.$message.error('请填写合适的底价');
					}
					if (!this.qualifiedPlanValue) {
						this.$message.error('请填写正确的返利金额');
					}
				}
			});
		},
		submit() {
			if (this.validateDate()) {
				this.addCoupon(() => {
					this.$emit('updataGoods', this.form);
				});
			}
		},
		async addCoupon(cb) {
			let prarm = this.from;
			let data = http.activityAddCoupon({
				data: prarm
			});
			if (data) {
				cb();
			}
		},
		submitAndNewGoods() {
			this.$emit('updataGoods', this.form);
			this.initGoods();
			console.log('no-empty');
		},
		backShopId(ids) {
			this.form.shopIds = ids;
		},
		goodsListHandle(res, item) {
			// console.log(item);
			let goodArr = item.goodArr;
			if (goodArr.length <= 5) {
				this.form.goodsIds = goodArr;
				this.showGoodsList = false;
			} else {
				this.$message.error('最多只能选择5个商品~~');
			}
		},
		initGoods() {
			this.$refs.formDm.resetFields();
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
				: { isOk: false, message: floorPrice === '' ? '' : '底价至少低于原价1元~~' };
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
		}
	},
	created() {
		console.log('no-empty-function');
	},
	components: {
		ElShopList: () => {
			return import(/*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList');
		},
		GoodsListWin: () =>
			import(/*webpackChunkName: 'good_list_win'*/ 'src/components/good_list_win.vue')
	}
};
</script>

<style lang="less" scoped>
#ActiityGoods {
	position: absolute;
	top: 0px;
	left: 0;
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
</style>
