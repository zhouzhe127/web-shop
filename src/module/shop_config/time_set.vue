<!--
	**市别设置
	*
	* 胡江
	* *
	*
-->
<template>
	<div>
		<section id="marketing">
			<ul class="oUbox ulTime">
				<li class="oLbox">操作</li>
				<li class="oLbox">市别名称</li>
				<li class="oLbox">状态</li>
				<li class="oLbox">市别时段</li>
			</ul>
			<ul v-for="(item,index) in list" class="oUbox" :key="index">
				<li class="oLbox">
					<span v-if="item.status == -2" class="">开通</span>
					<span v-on:click="opening(item,index)" v-if="item.status == -1" class="o-span">开通</span>
					<span v-on:click="opening(item,index)" v-if="item.status == 1 || item.status == 0" class="o-span">编辑</span>
				</li>
				<li class="oLbox">{{item.name}}</li>
				<li class="oLbox">
					<template v-if="item.status == -1 || item.status == -2">未开通</template>
					<template v-if="item.status == 0">关闭</template>
					<template v-if="item.status == 1">开启</template>
				</li>
				<li class="oLbox">
					<span v-if="userData.currentShop.ischain == '3' || item.intervalTime == ''">--</span>
					<span v-if="userData.currentShop.ischain !='3' && item.intervalTime != ''">{{item.intervalTime}}</span>
				</li>
			</ul>

			<timeSetWin v-if="showWin" @throwWinResult="doThrowWinResult" :userData="userData" :list="list" :item="item"></timeSetWin>
		</section>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			list: [], //市别列表
			userData: Object,
			item: Object, //详细信息
			index: '', //索引
			showWin: false
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
		//获取初始数据
		async init() {
			let res = await http.getTimeSetList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				let list = res;
				for (let i = 0; i < list.length; i++) {
					if (list[i].intervalTime && list[i].intervalTime !== '') {
						let str = '';
						let arr = list[i].intervalTime.split(',');
						//为小于10，前面加0
						let start =
							(parseInt(arr[0] / 60 / 60) < 10
								? '0' + parseInt(arr[0] / 60 / 60)
								: parseInt(arr[0] / 60 / 60)) +
							':' +
							(parseInt((arr[0] / 60) % 60) < 10
								? '0' + parseInt((arr[0] / 60) % 60)
								: parseInt((arr[0] / 60) % 60));
						let end =
							(parseInt(arr[1] / 60 / 60) < 10
								? '0' + parseInt(arr[1] / 60 / 60)
								: parseInt(arr[1] / 60 / 60)) +
							':' +
							(parseInt((arr[1] / 60) % 60) < 10
								? '0' + parseInt((arr[1] / 60) % 60)
								: parseInt((arr[1] / 60) % 60));
						str = start + '--' + end;
						list[i].intervalTime = str;
					}
				}
				this.list = res;
			}
		},
		//打开弹窗
		opening(item, index) {
			this.item = item;
			this.index = index;
			this.showWin = true;
		},
		//弹窗返回
		doThrowWinResult(res, newData) {
			if (res == 'ok') {
				this.list[this.index].name = newData.name;
				this.list[this.index].status = newData.status;
				this.list[this.index].intervalTime = newData.intervalTime;
				this.showWin = false;
			} else {
				this.showWin = false;
			}
		}
	},
	components: {
		timeSetWin: () =>
			import(/*webpackChunkName: "time_set_win"*/ './time_set_win')
	}
};
</script>

<style lang="less" scoped>
#marketing {
	width: 100%;
	max-width: 1200px;
	min-width: 600px;
	border: 1px solid #d2d2d2;
	height: auto;
	overflow: hidden;
	.oUbox {
		width: 100%;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		.oLbox {
			width: 25%;
			height: 60px;
			text-align: center;
			color: #434248;
			line-height: 60px;
			overflow: hidden;
			float: left;
			border-bottom: 3px solid #f7f7f7;
			.o-span {
				border-bottom: 1px solid #01a9e7;
				color: #01a9e7;
				cursor: pointer;
			}
		}
	}
	.ulTime {
		background-color: #ecedf2;
		height: 57px;
	}
}
</style>