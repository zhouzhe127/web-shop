<template>
	<section class="commodity-box" id="grade">
		<section class="commodityAdd fl" @click="addGrade({type:'add'})" v-if="brandId == '0' || brandId == '3'">
			<section class="combox">
				<img src="../../res/images/comadd.png" alt="添加" />
				<h3>新建会员等级</h3>
			</section>
		</section>
		<section class="fl member-box" v-for="(grade,i) in gradeList" :key="i" @click="addGrade({type:'edit',i:i,gid:grade.id,memberInfo:grade})">
			<section class="member-child">
				<section class="fl member-left">
					<section class="title">{{grade.name}}</section>
					<section class="titles">享受折扣率为{{grade.discount}}%</section>
				</section>
				<section class="fl member-right">
					<h2 v-if="grade.sortStatus == true">{{i+1}}</h2>
					<h3 v-if="grade.sortStatus == false && grade.status == '2'">粉丝</h3>
					<h2 v-if="grade.sortStatus == false && grade.status != '2'">0</h2>
				</section>
			</section>
		</section>
		<transition name="fade">
			<member-grade-win @isChangeEdit="isChangeEdit" v-if="addEidteWin" v-bind="obj">
			</member-grade-win>
		</transition>
	</section>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			gradeList: [],
			brandId: storage.session('userShop').currentShop.ischain,
			addEidteWin: false,
			title: '',
			obj: {},
			index: ''
		};
	},
	methods: {
		isChangeEdit(val) {
			this.addEidteWin = false;
			if (val) {
				if (val.type == 'push') {
					this.gradeList.push(val.payload.data);
					this.gradeSort(this.gradeList);
				} else {
					this.gradeList.splice(this.index, val.payload.data);
					this.gradeSort(this.gradeList);
				}
			} else {
				this.getList();
			}

		},
		addGrade({
			type,
			i,
			gid,
			memberInfo
		}) {
			this.index = i;
			this.addEidteWin = true;
			let title = type == 'add' ? '新建会员等级' : '修改会员等级';
			let wfileName;
			let imgHost = storage.session('userShop').uploadUrl;
			let obj;
			if (type == 'edit' && this.gradeList[i].imgName) {
				wfileName = this.gradeList[i].imgName;
			} else {
				wfileName = null;
			}

			if (type == 'add') {
				obj = {
					imgHost: imgHost,
					type: type,
					title: title,
					gradeList: this.gradeList,
					brandId: this.brandId,
					memberInfo: memberInfo,
				};
			} else {
				obj = {
					gid: gid,
					memberInfo: memberInfo,
					gradeList: this.gradeList,
					wfileName: wfileName,
					imgHost: imgHost,
					type: type,
					title: title,
					brandId: this.brandId
				};
			}
			this.obj = obj;
		},
		async getList() {
			// 获取会员等级列表
			let res = await http.memberGetList({
				data: {}
			});
			this.gradeList = res;
			this.gradeSort(this.gradeList);
			let i;
			let arr = [];
			for (i = 0; i < this.gradeList.length; i++) {
				if (this.gradeList[i].status == '1' || this.gradeList[i].status == '2') {
					arr = this.gradeList[i];
				}
			}
			if (utils.isEmptyObject(arr)) {
				this.$store.commit('setWin', {
					content: '您还未设置默认等级,所有关联等级将不会启用！',
					winType: 'alert',
					title: '提示信息'
				});
			}
		},
		//默认卡状态  为1 和2
		gradeSort(grouplist) {
			let arr = [];
			let start;
			let list = grouplist;
			// 这是没用到的
			let findNext = function() {
				for (let i = 0; i < list.length; i++) {
					//console.log(start)
					if (start === undefined) {
						//默认卡的数组
						for (let j = 0; j < list.length; j++) {
							if (list[j].status == '1') {
								start = list[j];
								arr.push(start);
								// console.log(JSON.stringify(arr));
								list.splice(j, 1);
								return true;
							}
						}
					} else {
						//自己新建卡的数组
						for (let j = 0; j < list.length; j++) {
							if (start.nextLevel === list[j].id + '') {
								start = list[j];
								arr.push(start);
								list.splice(j, 1);
								return true;
							}
						}
					}
				}
				return false;
			};
			while (findNext()) {
				console.log('111');
			}
			// console.log(JSON.stringify(arr));
			// console.log(JSON.stringify(list));
			if (list.length > 0) {
				//自己新建的等级
				for (let i = 0; i < list.length; i++) {
					list[i].sortStatus = false;
				}
				//默认等级
				for (let j = 0; j < arr.length; j++) {
					arr[j].sortStatus = true;
				}
				this.gradeList = arr.concat(list);
			} else {
				for (let i = 0; i < arr.length; i++) {
					arr[i].sortStatus = true;
				}
				for (let j = 0; j < list.length; j++) {
					list[j].sortStatus = false;
				}
				this.gradeList = arr;
			}
		}
	},
	mounted() {
		this.getList();
	},
	components: {
		'win': () =>
		import ( /* webpackChunkName: 'win' */ 'src/components/win'),
		'member-grade-win': () =>
		import ( /* webpackChunkName: 'member_grade_win' */ './member_grade_win')
	}
};
	</script>
	<style type="text/css" scoped>
	.commodity-box>section {
		/* height: 150px !important;*/
	}

	.member-box {
		background-color: #eeeeee;
		color: #898989;
	}

	.member-child {
		border-left: 2px solid #026eb7;
		height: 70px;
		width: 100%;
		margin-bottom: 50px;
	}

	.member-left {
		width: 198px;
		text-indent: 10px;
	}

	.member-left .title {
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.member-left .titles {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #ccc;
	}

	.member-right {
		width: 100px;
		height: 70px;
		line-height: 70px;
		text-align: center;
	}

	.member-right h2 {
		font-size: 64px;
		color: #dddddd;
	}
    .member-right h3{
    	font-size: 36px;
    	color: #dddddd;
    }
	.member-shade {
		background: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.member-btn {
		width: 150px;
		font-size: 0;
		position: absolute;
		left: 75px;
		top: 50px;
		overflow: hidden;
	}

	.member-btn a {
		display: inline-block;
		height: 50px;
		width: 75px;
	}

	.member-edit {
		background: url(../../res/images/editor.png) center center no-repeat;
	}

	.member-del {
		background: url(../../res/images/del.png) center center no-repeat;
	}
	</style>