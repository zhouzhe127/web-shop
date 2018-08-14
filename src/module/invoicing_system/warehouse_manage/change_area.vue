<template>
	<div class="change-area">
		<div class="head">
			修改区域
			<div class="line"></div>
		</div>
		<div class="main" @click="handle">
			<div class="item" v-for="(item,index) in areaData" :key='index' :data-id="item.id">
				<em>{{setIndex(index)}}</em>
				<span>区域名称：</span>
				<span class="name">{{item.areaName}}</span>
				<i :data-name="item.areaName" class="edit"></i>
				<i class="delete"></i>
				<i class="add" v-if="index == areaData.length-1"></i>
			</div>
			<div class="item empty" v-if="!areaData.length">
				<em>00</em>
				<span>区域名称：</span>
				<span class="name">暂无区域</span>
				<i class="add"></i>
			</div>
		</div>
		<component :winOpen="send" :is="showWin" @emit="getEmitWin"></component>
	</div>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';

export default {
	data() {
		return {
			showWin: null, //是否显示弹窗
			send: null, //传递给弹窗的数据
			areaData: [], //区域数据
			wid: '', //仓库id
			sessionData: '' //缓存数据
		};
	},
	components: {
		editWin: () =>
			import( /*webpackChunkName: 'change_area_edit_win'*/ './change_area_edit_win'),
	},
	mounted() {
		this.$store.commit('setPageTools', {
			back: () => { //查看全部
				storage.session('changeAreaDestroy', true);
				this.$router.push({
					path: 'warehouseDetail',
					query: this.$route.query
				});
			},
		});
		this.sessionData = storage.session('warehouseArea');
		if(this.sessionData) {
			this.wid = this.sessionData.id;
		}
		this.setList();
	},
	methods: {
		getEmitWin(res) {
			if(res) {
				if(res.type == 'edit') {
					this.setList();
				} else if(res.type == 'add') {
					this.setList();
				}
			}
			this.showWin = null;
		},
		async setList() {
			let data = await http.warehouseGetWarehouse({
				data: {
					id: this.wid
				}
			});
			this.areaData = data.area;
		},
		setIndex(index) {
			let num = index < 9 ? '0' + (index + 1) : (index + 1);
			return num;
		},
		handle(event) {
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'i') {
				let className = target.className;
				let id = target.parentNode.getAttribute('data-id');
				let name = target.getAttribute('data-name');
				if(className == 'edit') {
					this.send = {
						type: 'edit',
						wid: this.wid,
						id: id,
						name: name,
					};
					this.showWin = 'editWin';
				} else if(className == 'add') {
					this.send = {
						type: 'add',
						wid: this.wid,
					};
					this.showWin = 'editWin';
				} else {
					//删除仓库
					this.deleteMethod(id);
				}
			}
		},
		deleteMethod(id) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'confirm',
				content: '确认删除该区域？',
				callback: (res) => {
					if(res == 'ok') {
						this.deleteArea(id);
					}
				}
			});
		},
		async deleteArea(id) {
			let data = await http.deleteWarehouseArea({
				data: {
					id: id,
				}
			});
			if(data) {
				this.setList();
			}
		}
	}
};
</script>

<style lang='less' scoped>
	.change-area{
		.head{width: 100%;font-size: 18px;color: #333;height: 22px;line-height: 22px;padding-left: 15px;
			border-left: 2px solid #27a8df;
			.line{width: 400px;margin-left: 20px;display: inline-block;height: 1px;border-bottom: 2px dashed #ddd;vertical-align: middle;}
		}
		.main{padding-left: 40px;
			.item{padding: 20px 0;vertical-align: middle;font-size: 16px;
				&>*{font-size: 16px;display: inline-block;vertical-align: middle;}
				em{margin-right: 10px;}
				span{
					&.name{width: 200px;}
				}
				i{height: 20px;width: 20px;margin-right: 20px;cursor: pointer;
					&.edit{background: url(../../../res/icon/iconchange.png) center no-repeat;}
					&.delete{background: url(../../../res/icon/icondelete.png) center no-repeat;}
					&.add{background: url(../../../res/images/grayadd.png) center no-repeat;opacity: 0.9;}
				}
			}
			.empty *{color: #666;}
		}
	}
</style>