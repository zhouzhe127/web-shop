<template>
	<div id="ActiityGoods">
		<el-form ref="form" :model="form" label-width="160px">
			<el-form-item label="商品名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="商品类型">
				<el-radio-group v-model="form.name">
					<el-radio-button label="兑换券"></el-radio-button>
					<el-radio-button label="抵用券"></el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label=""  v-if="1">
				<el-button>关联商品</el-button>
			</el-form-item>
			<el-form-item label="实际抵扣金额"  v-else>
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="商品图片">
				<div style="width:300px;height: 200px"> 编辑图片</div>
			</el-form-item>
			<el-form-item label="商品描述">
				<el-input v-model="form.name"></el-input>
				限20字
			</el-form-item>
			<el-form-item label="商品原价/起砍价"> 
				<el-input v-model="form.name"></el-input>元
				商品起始砍价金额
			</el-form-item>
			<el-form-item label="砍价人数*">
				<el-select v-model="form.name" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>>
				参与人数达到填写人数完成砍价，包含发起人
			</el-form-item>
			<el-form-item label="底价">
				<el-input v-model="form.name"></el-input>元

				您的人均砍价金额为：（原价-底价）/人数 = XXX元
				/
				底价至少低于原价1元~~
			</el-form-item>
			<el-form-item label="返利方案">
				<template v-if="1">
					<el-input v-model="form.name" ></el-input>元
				</template>
				<template v-else>
					<el-input v-model="form.name" ></el-input>%
				</template>
			</el-form-item>
			<el-form-item label="砍价时间">
				<el-select v-model="form.name" placeholder="请选择时间间隔">
					<el-option :label="v+2+'小时'" :value="v+2" v-for="(v,i) in 22" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="适用门店">
				<el-button>关联门店</el-button>已关联10个门店
			</el-form-item>
			<el-form-item label="券有效期">
				<el-radio-group v-model="form.name">
					<el-radio-button label="相对时间"></el-radio-button>
					<el-radio-button label="指定时间"></el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="领取后即刻生效">
				<el-select v-model="form.name" placeholder="请选择时间间隔">
					<el-option label="小时" value="2"></el-option>
					<el-option label="2小时" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="使用时段">
				<el-select v-model="form.name" placeholder="不设限制">
					<el-option label="小时" value="2"></el-option>
					<el-option label="2小时" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="优惠共享">
				<el-select v-model="form.name" placeholder="不与其它优惠共享">
					<el-option label="小时" value="2"></el-option>
					<el-option label="2小时" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button>取消</el-button>
				<el-button type="primary" @click="submit">保存</el-button>
				<el-button type="primary" @click="submitAndNewGoods">保存并新建商品</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data: ()=>{
		return {
			form: {
				name: '' // 商品名称
			}
		};
	},
	props: {
		selectGoods: Object
	},
	methods: {
		submit(){
			console.log('no-empty');
		},
		submitAndNewGoods(){
			console.log('no-empty');
		},
	},
	computed:{},
	created() {
		console.log('no-empty-function');
	}
};
</script>

<style lang="less" scoped>
	#ActiityGoods{
		position: absolute;
		top: 0px;
		left: 0;
		background-color: #fff;
	}
</style>
