<!--
	**反结账原因
	*
	* 胡江
	* *
	*
-->
<template>
	<section>
		<section>
			<el-table ref="multipleTable" stripe :header-cell-style = "{'background-color':'#f5f7fa'}" :data="refundFood" border style="width:90%">
				<el-table-column fixed min-width = "120" align="center" label="操作">
					<template slot-scope="scope">
						<span v-if="scope.row.isDefined==1">
							<span style="color: #FE8D2C;cursor:pointer" @click="editInfo(scope.$index,scope.row)">编辑</span>
						    <span style="padding:0 5px;color: #D2D2D2">|</span>
						    <span style="color: #FD3F1F;cursor:pointer" @click="deleteRefundBtn(scope.$index,scope.row)">删除</span>
						</span>
						<span v-else>不可操作</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "50"  align="center" prop="sort"  label="排序"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width = "120" align="center" prop="reasonName" label="反结账原因"></el-table-column>
			</el-table>
		</section>
		<refund-win v-if="isShow" @throwWinResult="doThrowWinResult" :isAdd="isAdd" :refundReasonId="refundReasonId" :userData="userData">
		</refund-win>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isAdd: true, //添加还是编辑，true为添加
			isShow: false,
			userData: Object,
			refundFood:[], //反结账理由列表
			refundReasonId: '', //编辑的id
			refundReasonIndex: '' //编辑索引
		};
	},
	mounted() {
		let arr = [{name:'添加反结账原因',className:'pick',fn:()=>{
			this.addReason();
		}}];
		this.$store.commit('setPageTools',arr);
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
		//初始化获得反结账列表
		async init() {
			let res = await http.getReasonList({
				data: {
					shopId: this.userData.currentShop.id,
					type: 1
				}
			});
			if (res) {
				this.refundFood = res;
				this.sortList();
			}
		},
		//增加
		addReason() {
			if (this.refundFood.length >= 10) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '反结账原因添加已满'
				});
				return false;
			}
			this.isAdd = true;
			this.isShow = true;
		},
		//编辑
		editInfo(index, print) {
			this.refundReasonId = print.id;
			this.refundReasonIndex = index;
			this.isAdd = false;
			this.isShow = true;
		},
		//删除
		deleteRefundBtn(index, print) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'confirm',
				content: '确认要删除吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						http
							.deleteReason({
								data: {
									rid: print.id, //反结账原因id
									shopId: this.userData.currentShop.id,
									type: 1
								}
							})
							.then(() => {
								this.refundFood.splice(index, 1);
							});
					}
				}
			});
		},
		doThrowWinResult(res, data) {
			if (res == 'ok') {
				if (this.isAdd) {
					//添加
					this.refundFood.push(data);
				} else {
					//编辑
					this.refundFood.splice(this.refundReasonIndex, 1, data);
				}
				this.sortList();
			}
			this.isShow = false;
		},
		sortList() {
			this.refundFood = utils.sortByAll(
				this.refundFood,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		refundWin: () =>
			import(/*webpackChunkName: "reverse_reason_win"*/ './reverse_reason_win')
	}
};
</script>

