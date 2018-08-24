<!--
	**推送语设置组建
	*
	* miaochuan.sha
	* *
	*
-->
<template>
	<div id="msnmodel">
		<!-- 增加推送语 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="addclassify fl" @click="addPushlanguage">增加推送语</a>
				<div class="fl handle-tips">
					<i></i> 上限5条推送
				</div>
			</div>
		</div>
		<!-- 首次关注语推送 -->
		<div class="online-box clearfix" v-for="(item,index) in followerMessage">
			<span class="online-sub fl">
				<span class="serial">{{index + 1}}</span>
			</span>
			<div class="rightHalf">
				<!--下拉框组件-->
				<section class="clearfix" style="margin:0 15px 19px 0;">
					<select-btn class="fl" :name='item.type' :sorts="expirationTimeList.map(v=>v.name)" :width="211" @selOn="selexpirationTime" :showIndex='index'></select-btn>
					<a href="javascript:void(0)" class="delet fl" @click='deletePush(index)'></a>
				</section>
				<template v-if="item.typeId == '0'">
					<textarea class="txt" maxlength="100" v-model='item.content'></textarea>
					<div class="handle-tips">
						<i></i> 限100字以内
					</div>
					<p class="sample">{{msg}}</p>
				</template>
				<template v-if="item.typeId == '1'">
					<div class="uploadImgs">
						<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
						<form enctype="multipart/form-data" id="endImage">
							<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="bgNameChange(index)" />
						</form>
					</div>
					<div class="handle-tips" style="margin-bottom:20px;">
						<i></i> 尺寸:680PX*480PX最佳
					</div>
					<!-- 图片展示 -->
					<div class="imgshow" v-if="item.img != ''">
						<img alt="logo" v-bind:src="item.img" />
					</div>
					<div class="push">
						<span class="push_l required fl">
							推送标题
						</span>
						<input class="inp fl" type="text" placeholder="请输入推送标题" v-model="item.title" maxlength="20">
						<div class="fl handle-tips">
							<i></i> 限20字
						</div>
					</div>
					<div class="push">
						<span class="push_l required fl">
							推送链接
						</span>
						<input class="inp fl" type="text" placeholder="请输入推送链接" v-model="item.url">
					</div>
					<!-- 二级图文推送 -->
					<section class="clearfix" style="margin-bottom:20px;">
						<a href="javascript:void(0);" class="addclassify fl" @click="addsencPushlanguage(index,'1')">增加二级图文关联</a>
						<div class="fl handle-tips">
							<i></i> 上限5篇二级图文
						</div>
					</section>
					<!-- 二级图文关联 -->
					<section v-if="item.secondary.length > 0">
						<ul class="title">
							<li v-for="(int,ind) in item.secondary" :class="ruleIndex == ind ? 'active' : ''" @click="getDetails(ind)">二级图文{{ind + 1}}
								<i class="deletes" @click.stop='deletesecPush(index,ind)'></i>
							</li>
						</ul>
						<div class="content" v-for="(int,ind) in item.secondary" v-if='ruleIndex == ind'>
							<div class="uploadImgs">
								<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
								<form enctype="multipart/form-data" id="startImage">
									<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="upNameChange(index,ind)" />
								</form>
							</div>
							<div class="handle-tips" style="margin-bottom:20px;">
								<i></i> 尺寸:180PX*180PX最佳
							</div>
							<div class="smallimg" v-if="int.imgUrl != ''">
								<img alt="logo" v-bind:src="int.imgUrl" />
							</div>
							<div class="push">
								<span class="push_l required fl">
							推送标题
						</span>
								<input class="inp fl" type="text" placeholder="请输入推送标题" v-model="int.title" maxlength="20">
								<div class="fl handle-tips">
									<i></i> 限20字
								</div>
							</div>
							<div class="push">
								<span class="push_l required fl">
							推送链接
						</span>
								<input class="inp fl" type="text" placeholder="请输入推送链接" v-model="int.url">
							</div>
						</div>
					</section>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			shopId: storage.session('userShop').currentShop.id, //shopID
			uploadUrl: storage.session('userShop').uploadUrl, //上传图片
			expirationTimeList: [{
				name: '文字推送',
				id: 0
			},
			{
				name: '图文推送',
				id: 1
			}
			],
			followerMessage: [], //首次关注推送语
			message: [], //二次关注推送语
			spreaderMessage: [], //通过分享后关注推送语
			imageMessage: [], // 图片加载推送语
			ruleIndex: 0, //点中的第几个					
		};
	},
	props: {
		msg: String, //示例提示
		resultArr: Array //结果
	},
	watch:{
		resultArr:'initValue'
	},
	mounted() {
		this.initValue();
	},
	methods: {
		initValue:function(){
			this.followerMessage = this.resultArr;
		},
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		selexpirationTime: function(i, showIndex) { //首次关注语推送
			this.followerMessage[showIndex].type =
				this.expirationTimeList[i].name; //点击对应的名字
			this.followerMessage[showIndex].typeId = this.expirationTimeList[i].id; //点击对应的id
		},
		addPushlanguage: function() { //增加推送语
			let obj = {
				type: '文字推送', //类型
				typeId: 0, //类型的id
				content: '', //文本推送的文本信息
				img: '', //图文推送的图片
				title: '', //图文推送的标题
				url: '', //图文推送的地址
				secondary: [] //二级图文的关联
			};
			if (this.followerMessage.length >= 5) {
				this.valiData('关注推送语最多添加5条!');
				return false;
			}
			this.followerMessage.push(obj);
		},
		addsencPushlanguage: function(index) { //增加二级图文推送关联
			let obj = {
				imgUrl: '', //二级图片
				title: '', //标题
				url: '' //链接
			};
			if (this.followerMessage[index].secondary.length >= 5) {
				this.valiData('关注推送语二级图文关联最多添加5条!');
				return false;
			}
			this.followerMessage[index].secondary.push(obj);
		},
		deletePush: function(index) { //删除推送
			this.followerMessage.splice(index, 1);
		},
		deletesecPush: function(index, ind) { //删除二级图文推送
			if (this.ruleIndex >= ind) {
				this.ruleIndex = 0;
			}
			this.followerMessage[index].secondary.splice(ind, 1);
		},
		async bgNameChange(index) {
			// 上传图片 背景图片回调
			let res = await http.uploadImg({
				data: {
					type: 8,
					shopId: this.shopId
				},
				formId: 'endImage',
			});
			this.followerMessage[index].img = this.uploadUrl + res; //图片
			// this.endingImage = res;//图片传给后台
			// let bgName = this.endingImage.lastIndexOf('/');
			// this.endingImageName = this.endingImage.substring(bgName + 1, this.endingImage.length);
		},
		async upNameChange(index, ind) {
			// 上传图片 背景图片回调
			let res = await http.uploadImg({
				data: {
					type: 8,
					shopId: this.shopId
				},
				formId: 'startImage',
			});
			this.followerMessage[index].secondary[ind].imgUrl = this.uploadUrl + res; //图片
			// this.endingImage = res;//图片传给后台
			// let bgName = this.endingImage.lastIndexOf('/');
			// this.endingImageName = this.endingImage.substring(bgName + 1, this.endingImage.length);
		},
		getDetails: function(index) { //二级图文点击
			// 获取规则详情
			this.ruleIndex = index;
		},
	},
	components: {
		selectBtn: () =>
			import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
	}
};
</script>
<style type="text/css" scoped>
#msnmodel {
	width: 100%;
	height: auto;
}

#msnmodel .set-line {
	width: 100%;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 15px;
	position: relative;
}

#msnmodel .set-line .titles {
	min-width: 5%;
	/*兼容IE*/
	float: left;
	margin-left: 12px;
	font-size: 16px;
	text-align: left;
}

#msnmodel .set-line .line {
	display: inline-block;
	width: 70%;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#msnmodel .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#msnmodel .online-box .push {
	height: 40px;
	margin-bottom: 18px;
}

#msnmodel .online-box .push .push_l {
	width: 70px;
	height: 40px;
	text-align: right;
	line-height: 40px;
	margin-right: 17px;
}

#msnmodel .online-box .push .inp {
	width: 350px;
	height: 40px;
	margin-right: 15px;
	text-indent: 10px;
}

#msnmodel .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 40px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#msnmodel .online-box .online-sub .serial {
	width: 28px;
	height: 28px;
	display: block;
	border-radius: 14px;
	background-color: #2EA8DC;
	color: #fff;
	text-align: center;
	line-height: 28px;
	margin: 6px;
}

#msnmodel .online-box .rightHalf {
	width: 600px;
	height: auto;
	float: left;
}

#msnmodel .online-box .rightHalf .uploadImgs {
	height: 40px;
	position: relative;
}

#msnmodel .online-box .rightHalf .uploadImgs input {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

#msnmodel .online-box .rightHalf .txt {
	display: block;
	outline: none;
	width: 351px;
	height: 168px;
	resize: none;
	border-color: #CECDCD;
	padding:10px;
}

#msnmodel .online-box .rightHalf .sample {
	color: #A5A5A5;
}

#msnmodel .online-box .rightHalf .imgshow {
	width: 350px;
	height: 251px;
	border: 1px solid #cecdcd;
	margin-bottom: 21px;
}

#msnmodel .online-box .rightHalf .imgshow img {
	display: block;
	width: 100%;
	height: 100%;
}

#msnmodel .online-box .rightHalf .title {
	width: 800px;
	height: 40px;
}

#msnmodel .online-box .rightHalf .title .active {
	background-color: #B3B3B3;
}

#msnmodel .online-box .rightHalf .content {
	width: 600px;
	height: 430px;
	border: 1px solid #b3b3b3;
	padding: 26px 0 0 31px;
}

#msnmodel .online-box .rightHalf .content .smallimg {
	width: 160px;
	height: 160px;
	margin-bottom: 20px;
	border: 1px solid #cecdcd;
}

#msnmodel .online-box .rightHalf .content .smallimg img {
	display: block;
	width: 100%;
	height: 100%;
}

#msnmodel .online-box .rightHalf .title li {
	float: left;
	width: 100px;
	height: 40px;
	margin-right: 10px;
	background-color: #f2f2f2;
	text-align: center;
	line-height: 40px;
	position: relative;
}

#msnmodel .online-box .rightHalf .title li:hover i.deletes {
	position: absolute;
	right: -12px;
	top: -12px;
	background: url(../../res/images/delete.png) center center no-repeat;
	height: 30px;
	width: 30px;
	cursor: pointer;
}

#msnmodel .online-box .addclassify {
	margin-right: 15px;
	width: 200px;
}

#msnmodel .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url('../../../src/res/images/prompt.png') 0 center no-repeat;
	color: #999999;
}

#msnmodel .online-box .delet {
	display: block;
	width: 16px;
	height: 19px;
	background: url('../../../src/res/icon/icondelete.png') no-repeat center;
	margin: 10px 25px 10px 19px;
}
</style>