<template>
	<div id="mtClassification">
		<div class="shopList" style="overflow: auto;">
			<p>分类配置</p>
			<ul class="title">
				<li>序号</li>
				<li>分类名称</li>
				<li>操作</li>
			</ul>
			<ul class="eleShop" v-for="(item,index) in classificationName" :key="index">
				<li>{{index+1}}</li>
				<li>{{item.categoryName}}</li>
				<li style="cursor: pointer;">
					<span @click="edit(index,'edit')"><img src="../../../res/icon/iconchange.png"></span>
					<span @click="cancer(index)"><img src="../../../res/icon/icondelete.png"></span>
				</li>
			</ul>
			<div @click="add('add')">
				<img src="../../../res/images/adds.png">
				<span>添加分类</span>
			</div>
		</div>
		<div>
			<a href="javascript:void(0);" class="gray" @click="goback">上一步</a>
			<a href="javascript:void(0);" class="yellow" @click="finish">完成</a>
		</div>
		<classifica-win ref="addClassifiWin" v-if="addClassifiWin.winshow" :postSort="postSort" :postName="postName" :width="addClassifiWin.width" :height="addClassifiWin.height" :title="addClassifiWin.title" @classifiEvent="classifiwin"></classifica-win>
	</div>
</template>
<script>
import http from 'src/manager/http';
// import global from 'src/manager/global';
export default {
	data() {
		return {
			classificationName: [],
			editBtn: false,
			addClassifiWin: {
				width: 400,
				height: 200,
				title: '添加分类',
				winshow: false
			},
			postName: '',
			postSort: 0
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			let data = await http.getMeituanCategory({
				data: {}
			});
			this.classificationName = data;
		},
		add: function() {
			this.editBtn = false;
			this.postName = '';
			this.postSort = 0;
			this.addClassifiWin.title = '添加分类';
			this.addClassifiWin.winshow = true;
		},
		classifiwin(str) {
			this.addClassifiWin.winshow = false;
			if (str == 'ok') {
				this.classifiClose();
			}
		},
		async classifiClose() {
			let reg = /^\s*$/g;
			let categoryName = this.$refs.addClassifiWin.categoryName;
			if (
				reg.test(categoryName) ||
				categoryName == '' ||
				categoryName == null
			) {
				this.addClassifiWin.winshow = true;
				this.$store.commit('setWin', {
					title: '提示',
					content: '修改失败，分类名称不能为空'
				});
				return;
			}
			let data;
			if (this.editBtn) {
				data = await http.editMeituanCategory({
					data: {
						oldCategoryName: this.$refs.addClassifiWin
							.oldCategoryName,
						categoryName: this.$refs.addClassifiWin.categoryName,
						sequence: this.$refs.addClassifiWin.sort
					}
				});
			} else {
				data = await http.addMeituanCategory({
					data: {
						categoryName: this.$refs.addClassifiWin.categoryName,
						sequence: this.$refs.addClassifiWin.sort
					}
				});
			}
			if(data){
				this.init();
			}
		},
		edit: function(index) {
			this.editBtn = true;
			this.addClassifiWin.title = '修改分类';
			this.addClassifiWin.winshow = true;
			this.postName = this.classificationName[index].categoryName;
			this.postSort = this.classificationName[index].sequence;
		},
		cancer: function(id) {
			this.$store.commit('setWin', {
				title: '提示',
				content: '确定删除该分类?',
				winType: 'confirm',
				callback: async res => {
					if (res == 'ok') {
						let data = await http.deleteMeituanCategory({
							data: {
								categoryName: this.classificationName[id]
									.categoryName
							}
						});
						if(data){
							this.init();
						}
					}
				}
			});
		},
		goback: function() {
			window.history.go(-1);
		},
		finish: function() {
			window.close();
		}
	},
	components: {
		classificaWin: () =>
			import(/*webpackChunkName: "classification_win"*/ 'src/module/outfood/accredit/classification_win')
	}
};
</script>
<style scoped>
#mtClassification .eleShop li span {
	margin-left: 8px;
	margin-right: 8px;
}
#mtClassification .shopList {
	position: relative;
}
#mtClassification .shopList div {
	width: 150px;
	height: 40px;
	background: #29abe2;
	position: absolute;
	right: 23px;
	top: 10px;
	line-height: 40px;
	cursor: pointer;
}
#mtClassification .shopList div img {
	width: 20px;
	height: 20px;
	margin-top: 10px;
	margin-left: 30px;
	float: left;
}
#mtClassification .shopList div span {
	float: left;
	font-size: 15px;
	margin-left: 10px;
	color: #ffffff;
}
#warrant #jumpShop .shopBox .shopList {
	width: 100%;
	height: 700px;
	background: #ffffff;
}
#warrant #jumpShop .shopBox .shopList p {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 22px;
	color: #43414a;
	text-align: center;
}
#jumpShop .title {
	background: #f7f7f7;
	height: 60px;
	line-height: 60px;
	font-size: 16px;
}
#jumpShop ul li {
	display: inline-block;
	width: 33%;
	text-align: center;
}
#jumpShop .eleShop li {
	height: 100px;
	line-height: 100px;
	font-size: 16px;
	color: #43414a;
	border-bottom: 4px solid #f7f7f7;
}
#warrant .gray {
	margin-left: 540px;
	width: 150px;
}
#warrant .yellow {
	margin-left: 70px;
	width: 150px;
}
</style>

