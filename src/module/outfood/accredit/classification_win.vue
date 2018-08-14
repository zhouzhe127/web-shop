<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props">
			<section id="addEditBox">
				<div class="classifyName">
					<span>分类名&nbsp;：</span>
					<input placeholder="请输入分类名" maxlength="10" v-model="categoryName" />
				</div>
				<div class="sortList">
					<i>排&nbsp;&nbsp;&nbsp;序&nbsp;：</i>
					<div>
						<subadd :bindnum="sort" :minnum="0" @toClick="addNum"></subadd>
					</div>
				</div>

			</section>
		</div>
	</win>
</template>
<script>
export default {
	data() {
		return {
			sort: this.postSort,
			oldSort: this.postSort,
			categoryName: this.postName,
			oldCategoryName: this.postName
		};
	},
	props: ['width', 'height', 'title', 'postName', 'postSort'],
	methods: {
		addNum(num) {
			this.sort = num;
		},
		winEvent(str) {
			this.$emit('classifiEvent', str);
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		subadd: () =>
			import(/*webpackChunkName: "subadd"*/ 'src/components/subadd')
	}
};
</script>
<style scoped>
#addEditBox .classifyName {
	width: 100%;
	height: 50px;
	margin-top: 50px;
	float: left;
}
#addEditBox .classifyName span {
	margin-left: 70px;
	font-size: 16px;
}
#addEditBox .classifyName span::after {
	content: '*';
	color: red;
	position: relative;
	top: -3px;
	left: -22px;
}
#addEditBox .classifyName input {
	padding-left: 10px;
	height: 30px;
}
/*input::-webkit-input-placeholder{padding-left: 10px;}*/
#addEditBox .sortList {
	width: 100%;
	height: 50px;
	float: left;
}
#addEditBox .sortList i {
	margin-top: 10px;
	margin-left: 70px;
	font-size: 16px;
	float: left;
}
#addEditBox .sortList div {
	width: 185px;
	height: 50px;
	margin-left: 10px;
	float: left;
}
</style>

