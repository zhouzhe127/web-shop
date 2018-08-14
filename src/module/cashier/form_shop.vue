<template>
	<div id="formshop">
		<div @click.stop class="box" style="width: 620px;left: 80px;">
			<i v-if="!isChart" class="icon"></i>
			<i v-else class="foot"></i>
			<div class="detH3" style="text-align: left;height: 300px;overflow: auto;">
				<div class="jobBtn">
					<a href="javascript:void(0)" @click="chooseShop('all')" class="job" :class="{'selectbtn' : shopType == 'all'}">全部</a>
					<a href="javascript:void(0)" @click="chooseShop('brand')" class="job" :class="{'selectbtn' : shopType == 'brand'}">直营店</a>
					<a href="javascript:void(0)" @click="chooseShop('shop')" class="job" :class="{'selectbtn' : shopType == 'shop'}">加盟店</a>
					<input type="text" placeholder="输入门店名称" v-model="shopName">
				</div>
				<ul>
					<li @click="selJob(item)" :class="{'active': item.id == flag}" v-for="(item,index) in showShopList" :key="index">
						<i v-if="isChart">{{item.name}}</i>
						<i v-else>{{item.shopName}}</i>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			showShopList: [], //显示的店铺
			shopType: 'all',
			flag: '', //选中的店铺名
			shopName: '',
		};
	},
	props: ['shopList','shopId','isChart'],
	mounted(){
		this.chooseShop('all');
		this.flag = this.shopId;
	},
	watch: {
		'shopName': function(){
			this.shopType = 'all';
			let name = this.shopName.replace(/(^\s*)|(\s*$)/g, '');
			this.showShopList = this.shopList.filter(v=>{
				if(v.shopName){
					return v.shopName.indexOf(name) >= 0;
				}else{
					return v.name.indexOf(name) >= 0;
				}
				
			});
			if(!this.shopName){
				this.showShopList = this.shopList;
			}
		}
	},
	methods: {
		//选中的店铺
		defaultShop(){
			this.showShopList.forEach(v =>{
				if(this.shopId == v.id){
					v.selected = true;
				}
			});
		},
		//门店类型选择
		chooseShop(type) {
			this.shopType = type;
			this.showShopList = [];
			if (type === 'all') { //全部
				this.showShopList = this.shopList;
			} else if (type === 'brand') { //直营店
				for (let i = 0; i < this.shopList.length; i++) {
					if (this.shopList[i].ischain == '1') {
						this.showShopList.push(this.shopList[i]);
					}
				}
			} else if (type === 'shop') { //加盟店
				for (let i = 0; i < this.shopList.length; i++) {
					if (this.shopList[i].ischain == '2') {
						this.showShopList.push(this.shopList[i]);
					}
				}
			}
		},
		//选择门店
		selJob(item){
			this.flag = item.id;
			this.$emit('chooseShop',item);
		}   
	}
};
</script>
<style scoped>
	#formshop {
		position: relative;
		cursor: pointer;
		display: inline-block;
		margin-left: 0
	}

	#formshop .box {
		display: inline-block;
		width: 300px;
		background: #45404b;
		;
		position: absolute;
		/* top: 45px; */
		right: 0;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 2000;
	}

	#formshop .box .icon {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: -10px;
		left: 150px;
		border-width: 10px;
		border-top: 0px !important;
		border-style: solid;
		border-color: #F7F7F7 #F7F7F7 #45404b #F7F7F7;
	}
	#formshop .box .foot{
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		left: 340px;
		border-width: 10px;
		border-style: solid;
		border-bottom: 0px;
		border-color: #45404b #F7F7F7 #F7F7F7 #F7F7F7;
		bottom: -10px;
	}
	#formshop .box .detH3 {
		line-height: 30px;
		color: #e6e6e7;
		text-align: center;
		margin: 10px 30px;
		min-height: 200px;
	}

	#formshop .box ul li {
		display: inline-block;
		height: 40px;
		border: 1px solid #fff;
		padding: 5px 10px;
		margin: 5px
	}

	#formshop .box ul li.active {
		background: url(../../res/images/sign.png) right 103% no-repeat;
		border-color: #FF9800;
		color: #FF9800;
	}

	#formshop .jobBtn {
		margin-bottom: 20px;
	}
	#formshop .jobBtn input{
		width: 150px;
		height: 30px;
		margin-left: 80px;
		padding-left: 10px;
	}

	#formshop .jobBtn .job {
		margin-right: 20px;
		font-size: 18px;
		width: 80px;
		color: #fff;
	}

	#formshop .jobBtn .selectbtn {
		color: #FF9200;
		border-bottom: 4px solid #FF9200;
	}
</style>

