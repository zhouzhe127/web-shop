<!--
    **菜单设置
    *
    * 胡江
    * *
    *
-->
<template>
	<div class="mall-menu" style="width: 1517px;" id="menu" v-cloak>
		<header class="menu_header">
			<ul>
				<li>
					<span @click="selectMenu('default',0)" :class="menuIndex == 0?'btn_blue':''" class="btns">{{defaultMenu}}</span>
				</li>
				<li v-for="(item,index) in menuName" :key="index">
					<span @click="selectMenu(item,index+1)" :class="index+1 == menuIndex?'btn_blue':''" class="btns">{{item.name}}</span>
				</li>
			</ul>
		</header>
		<div class="menu-reveal fl">
			<div class="menu-title">闪店商家</div>
			<div class="menu-content">
				<ul class="menu-list" id="js-menuList">
					<!-- 父级菜单 -->
					<li v-for="(menu,i) in menuList" :class="{'Parent ParentOn':menu.status =='1','Parent':menu.status!='1'}" v-if="menuList.length >= 1" :key="i">
						<span @click="getDetailParent(i,$event)">{{menu.name}}</span>
						<div class="menu-child" v-if="parentIndex == i">
							<ul>
								<!-- 子级菜单 -->
								<li v-for="(child,j) in menu.sub_button" @click="getDetailChild(i,j)" :class="{'ParentOn':child.status =='1'}" :key="j">{{child.name}}</li>
								<li @click="addChildMenu($event)">
									<a href="javascript:void(0);" title="最多添加5个子菜单" draggable="false" class="addChild" style="width: 100%;height: 100%;">
										<i class="icon-menu-add"></i>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="menu-list-add" @click="addParentMenu">
						<a href="javascript:void(0);" class="pre_menu_link" title="最多添加3个菜单" draggable="false" style="width: 100%;height: 100%;">
							<i class="icon-menu-add"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<section class="clearfix fl" style="width:771px">
			<div class="menu-config" v-if="addParent || addChild">
				<!-- 活动标题 -->
				<div class="online-box clearfix">
					<span class="online-sub fl required">菜单配置</span>
					<div class="rightHalf">
						<template v-if="addParent">
							<input type="text" placeholder="请输入菜单名称" v-model="parentTitle" @blur="selectType" class="fl" />
							<div class="fl handle-tips">
								<i></i> 字数不超过4个汉字或8个字母
							</div>
							<a href="javascript:void(0)" class="fr menu-del" @click="delParent">删除菜单</a>
						</template>
						<template v-if="addChild">
							<input type="text" placeholder="请输入菜单名称" v-model="childTitle" @blur="selectType" class="fl" />
							<div class="fl handle-tips">
								<i></i> 字数不超过8个汉字或16个字母
							</div>
							<a href="javascript:void(0)" class="fr menu-del" @click="delChild">删除子菜单</a>
						</template>
					</div>
				</div>
				<!-- <div class="menu-config-title" style="position: relative;">
					<span class="required fl">菜单配置</span>
					<input type="text" placeholder="请输入菜单名称" v-model="parentTitle" @blur="selectType" v-if="addParent == true" />
					<input type="text" placeholder="请输入菜单名称" v-model="childTitle" @blur="selectType" v-if="addChild == true" />
					<a href="javascript:void(0)" class="fr menu-del" v-if="addParent == true" @click="delParent">删除菜单</a>
					<a href="javascript:void(0)" class="fr menu-del" v-if="addChild == true" @click="delChild">删除子菜单</a>
					<p style="position: absolute;left: 100px;color: #ccc;" v-if="addParent == true">字数不超过4个汉字或8个字母</p>
					<p style="position: absolute;left: 100px;color: #ccc;" v-if="addChild == true">字数不超过8个汉字或16个字母</p>
				</div> -->
				<!-- 菜单内容 -->
				<div class="online-box clearfix" v-if="!parentHide">
					<span class="online-sub fl required">菜单内容</span>
					<div class="rightHalf">
						<radioBtn @selOn="doThrowWinResult" :list="typeList" :index="typeIndex" :name='"name"'></radioBtn>
					</div>
				</div>
				<!-- 发送消息 -->
				<div class="online-box clearfix" v-if="!parentHide && type == '1'">
					<span class="online-sub fl required">发送消息</span>
					<div class="rightHalf">
						<textarea placeholder="请输入发送消息内容..." v-model="message" @blur="selectType" maxlength="150"></textarea>
					</div>
				</div>
				<!-- 跳转页面 -->
				<div class="online-box clearfix" v-if="!parentHide && type =='2'">
					<span class="online-sub fl required">跳转页面</span>
					<div class="rightHalf">
						<input type="text" placeholder="请输入url地址" v-model="urls" @blur="selectType" class="fl" />
					</div>
				</div>
				<!-- 小程序跳转 -->
				<div class="online-box clearfix" v-if="!parentHide && type =='38'">
					<span class="online-sub fl">小程序跳转</span>
					<div class="rightHalf">
						<div class="app_t clearfix">
							<span class="fl required">小程序链接</span>
							<input type="text" placeholder="请输入小程序链接" v-model="appurl" class="fl" @blur="selectType" />
							<div class="fl handle-tips">
								<i></i> 仅认证公众号可配置
							</div>
						</div>
						<div class="app_t clearfix">
							<span class="fl required">小程序appId</span>
							<input type="text" placeholder="请输入小程序appId" v-model="appIds" class="fl" onkeyup="value=value.replace(/[^a-zA-Z\d]/g,'')" @blur="selectType" />
						</div>
						<div class="app_t clearfix">
							<span class="fl required">小程序页面路径</span>
							<input type="text" placeholder="请输入小程序页面路径" v-model="appPath" class="fl" @blur="selectType" />
						</div>
					</div>
				</div>
				<!-- 推送图片 -->
				<div class="online-box clearfix" v-if="!parentHide && type =='39'">
					<span class="online-sub fl required">推送图片</span>
					<div class="rightHalf">
						<section class="clearfix" style="margin-bottom: 20px;">
							<div class="uploadImgs fl">
								<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
								<form enctype="multipart/form-data" id="startImage">
									<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="upNameChange('1')" />
								</form>
							</div>
							<div class="fl handle-tips">
								<i></i> 最大支持1M上传
							</div>
						</section>
						<div class="smallimg" v-if="imgUrl != ''">
							<img alt="logo" v-bind:src="imgUrl" />
						</div>
						</div>
					</div>
					<!-- 推送图文 -->
					<div class="online-box clearfix" v-if="!parentHide && type =='40'">
						<span class="online-sub fl"></span>
						<div class="rightHalf">
							<div class="uploadImgs">
								<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
								<form enctype="multipart/form-data" id="startImage">
									<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="upNameChange('2')" />
								</form>
							</div>
							<div class="handle-tips" style="margin-bottom:20px;">
								<i></i> 尺寸:680PX*480PX最佳
							</div>
							<!-- 图片展示 -->
							<div class="imgshow" v-if="graphicimgUrl != ''">
								<img alt="logo" v-bind:src="graphicimgUrl" />
						</div>
								<div class="app_t clearfix">
									<span class="fl required">推送标题</span>
									<input type="text" placeholder="请输入推送标题" v-model="graphicTitle" class="fl" @blur="selectType" />
									<div class="fl handle-tips">
										<i></i> 限20字
									</div>
								</div>
								<div class="app_t clearfix">
									<span class="fl required">推送链接</span>
									<input type="text" placeholder="请输入推送标题" v-model="graphicUrl" class="fl" @blur="selectType" />
								</div>
								<!-- 二级图文推送 -->
								<section class="clearfix" style="margin-bottom:20px;">
									<a href="javascript:void(0);" class="addclassify fl" @click="addsencPushlanguage()">增加二级图文关联</a>
									<div class="fl handle-tips">
										<i></i> 上限5篇二级图文
									</div>
								</section>
								<!-- 二级图文关联 -->
								<section v-if="secondary.length > 0">
									<ul class="title">
										<li v-for="(int,ind) in secondary" :key="ind" :class="ruleIndex == ind ? 'active' : ''" @click="getDetails(ind)">二级图文{{ind + 1}}
											<i class="deletes" @click.stop='deletesecPush(index,ind)'></i>
										</li>
									</ul>
									<div class="content" v-for="(int,ind) in secondary" :key="ind" v-if='ruleIndex == ind'>
										<div class="uploadImgs">
											<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
											<form enctype="multipart/form-data" id="endImage">
												<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="bgNameChange(ind)" />
											</form>
										</div>
										<div class="handle-tips" style="margin-bottom:20px;">
											<i></i> 尺寸:180PX*180PX最佳
										</div>
										<div class="smallimg" v-if="int.imgUrl != ''">
											<img alt="logo" v-bind:src="int.imgUrl" />
								</div>
											<div class="app_t clearfix">
												<span class="fl required">推送标题</span>
												<input type="text" placeholder="请输入推送标题" v-model="int.title" class="fl" @blur="selectType" />
												<div class="fl handle-tips">
													<i></i> 限20字
												</div>
											</div>
											<div class="app_t clearfix">
												<span class="fl required">推送链接</span>
												<input type="text" placeholder="请输入推送标题" v-model="int.url" class="fl" @blur="selectType" />
											</div>
										</div>
								</section>
							</div>
						</div>
						<!-- 菜单内容 -->
						<!-- <div class="menu-config-content clearfix">
					<div class="fl" v-if="!parentHide">
						<span class="fl caiDan">菜单内容</span>
						<radioBtn @selOn="doThrowWinResult" :list="typeList" :index="typeIndex" :name='"name"'></radioBtn>
					</div>
					<div class="menu-message fl" v-if="!parentHide">
						<textarea placeholder="请输入发送消息内容..." v-model="message" @blur="selectType" v-if="type == '1'" maxlength="150"></textarea>
						<div class="fl" v-if="type == '2'">
							<span class="fl spanUrl">请输入url：</span>
							<input type="text" placeholder="请输入url地址" v-model="urls" @blur="selectType" class="fl" />
						</div>
					</div>
				</div> -->
					</div>
					<div v-else class="menu-config">
						<span class="tip">点击左侧菜单进行编辑操作</span>
					</div>
					<div class="menu-setMenu">
						<el-button type="info" style="margin-right: 10px;width:190px;height:42px;" @click="delMenu">删除</el-button>
						<el-button type="primary" style="margin-right: 10px;width:190px;height:42px;" @click="saveMenu">保存并发布</el-button>
						<!-- <a href="javascript:void(0)" class="setMenu-config gray fl" @click="delMenu">删除</a>
						<a href="javascript:void(0)" class="yellow setMenu-config fl" @click="saveMenu">保存并发布</a> -->
					</div>
		</section>
		<!-- 新建分组菜单 -->
		<transition name="fade">
			<win :width="591" :height="248" v-if="isShowMenuWin" @winEvent="winEvent">
				<span slot="title">新建分组菜单</span>
				<div class="menu_win" slot="content">
					<div class="menu_content_group">
						<!-- <span>关联用户组</span>
						<mul-select :styles="{border: '1px solid RGB(210,210,210)',margin: '9px 10px 0 0'}" :list="menuselName" :selects="selects" :name="'name'" :keys="'id'" :isradio="true"></mul-select> -->
						<div class="online-box clearfix">
							<span class="online-sub fl required">关联用户组</span>
							<div class="rightHalf">
								<mul-select :styles="{border: '1px solid RGB(210,210,210)',margin: '9px 10px 0 0'}" :list="menuselName" :selects="selects" :name="'name'" :keys="'id'" :isradio="true"></mul-select>
							</div>
						</div>
					</div>
				</div>
			</win>
		</transition>
		<!-- 快速创建菜单 -->
		<transition name="fade">
			<win :width="650" :height="248" v-if="isShowQuickWin" @winEvent="quickWinEvent">
				<span slot="title">快速配置菜单</span>
				<div class="menu_win" slot="content">
					<div class="menu_content_group" style="margin-top: 40px;">
						<div class="online-box clearfix">
							<span class="online-sub fl required">快速配置菜单</span>
							<div class="rightHalf">
								<el-radio-group v-model="validName" class="fl">
									<el-radio v-for="(item,index) in validList" :key="index" :label="item.name" border @change.native="clicktheRadio(item)" style="margin-bottom: 10px;"></el-radio>
								</el-radio-group>
								<div class="fl handle-tips">
									<i></i> 后续会推出更多的功能菜单哦~
								</div>
							</div>
						</div>
					</div>
				</div>
			</win>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				userData: Object,
				shopId: '', //shopID
				uploadUrl: '', //上传图片			
				menuList: [], //菜单列表 一级列表以及二级列表
				addParent: false, //一级菜单判断
				addChild: false, //二级菜单判断
				parentIndex: null, //一级index
				childIndex: null, //二级index
				parentTitle: '菜单名称', //一级菜单名称
				childTitle: '子菜单名称', //二级菜单名称
				index: null,
				message: String, //发送消息
				type: '1',
				urls: String, //链接地址
				typeList: [], //菜单内容的列表
				typeIndex: 0, //菜单内容选中的
				parentHide: false,
				menuName: [], //除去默认菜单 剩下的用户组名称
				isShowMenuWin: false,
				isShowQuickWin: false, //快速创建菜单的弹窗
				menuselName: [], //关联用户分组
				selects: [], //用户分组 单选选中的关联用户分组的id
				allMenu: [], //   所有的菜单选项
				menuIndex: 0,
				menuId: 'default', //  默认菜单
				saveStatus: true,
				msg_1: '示例:恭喜您,已经成功关注公众号,我们将送您100积分.正值活动期间,快去用积分兑换商品吧!',
				appIds: '', //appIds
				appPath: '', //小程序页面路径
				imgUrl: '', //上传的图片
				media_id: '',
				appurl: '', //小程序链接地址
				graphicTitle: '', //图文的标题
				graphicUrl: '', //图文的链接
				graphicimgUrl: '', //图文的图片地址
				secondary: [],
				ruleIndex: 0, //点中的第几个	
				groupId: '',
				validName: '卖手默认',
				validList: [{
					'id': 0,
					'name': '卖手默认'
				}, {
					'id': 1,
					'name': '卖手店长'
				}, {
					'id': 2,
					'name': '卖手店员'
				}, {
					'id': 3,
					'name': '卖手收银'
				}],
				validId: 0,
				wechatFastMenu: [], //快捷的默认菜单
				defaultMenu: '默认菜单'
			};
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '新建分组菜单',
				fn: () => {
					this.createNewMenu();
				},
				className: 'el-btn-yellow'
			}, {
				name: '快速配置菜单',
				fn: () => {
					this.quickConfigurationMenu();
				},
				className: 'el-btn-yellow'
			}]);
			let userData = storage.session('userShop');
			this.userData = userData;
			this.shopId = userData.currentShop.id;
			this.uploadUrl = userData.uploadUrl;
			this.getMenu();
			this.getSelfMenu();
			this.getUserGroups();
		},
		methods: {
			quickConfigurationMenu: function() { //快速配置菜单
				this.isShowQuickWin = true;
			},
			winEvent(str) {
				if (str == 'ok') {
					for (let key of this.menuName) {
						if (key.matchRule == this.selects[0]) {
							this.valiData('不能重复创建分组菜单');
							return false;
						}
					}
					this.isShowMenuWin = false;
					this.createMenuGroup();
				} else {
					this.isShowMenuWin = false;
				}
			},
			quickWinEvent(str) { //快速创建菜单的回掉弹窗
				if (str == 'ok') {
					for (let item of this.wechatFastMenu) {
						if (this.validList[this.validId].name == item.group) {
							//当前用户分组的名字替换掉
							if (this.menuId == 'default') {
								this.defaultMenu = item.group;
							} else {
								this.menuName[this.menuIndex - 1].name = item.group;
							}
							this.menuList = item.menu;
							break;
						}
					}
					//this.menuIndex = this.menuName.length; //  创建新菜单 ， 然后选择光标转移至新菜单
					this.isShowQuickWin = false;
				} else {
					this.isShowQuickWin = false;
				}
			},
			createMenuGroup() { //新建用户分组时的情形
				for (let item of this.menuselName) {
					if (this.selects[0] == item.id) {
						this.menuName.push({
							id: item.id,
							name: item.name,
							menuId: 'newType'
						});
						break;
					}
				}
				this.menuIndex = this.menuName.length; //  创建新菜单 ， 然后选择光标转移至新菜单
				this.menuList = [];
				this.menuId = 'newType';
				this.matchRule = this.selects[0];
			},
			clicktheRadio: function(item) {
				this.validId = item.id;
			},
			async delMenu() {
				if (this.menuId == 'default') {
					this.valiData('默认菜单无法删除');
					return false;
				}
				if (this.menuId == 'newType') {
					this.menuName.pop();
					this.valiData('删除成功');
					this.menuIndex = 0;
					this.menuList = this.allMenu.menu;
					return false;
				}
				await http.delMenuGroup({
					data: {
						menuId: this.menuId,
						groupId: this.matchRule
					}
				});
				this.valiData('删除成功');
				this.allMenu.conditionalmenu.splice(this.menuIndex - 1, 1);
				this.menuName.splice(this.menuIndex - 1, 1);
				this.menuIndex = 0;
				this.menuList = this.allMenu.menu;
				this.menuId = 'default';
			},
			selectMenu(item, index) { //  default 表示默认菜单  newType 表示最新创建建的菜单，此时该菜单还没数据   如果menuId为数字表示已经创建成功的分组菜单
				this.menuIndex = index;
				// debugger
				if (item == 'default') {
					this.menuId = 'default';
					this.menuList = this.allMenu.menu;
				} else {
					if (item.menuId == 'newType') {
						this.menuId = item.menuId;
						this.menuList = [];
						this.matchRule = this.selects[0];
					} else {
						this.menuId = item.menuId;
						this.menuList = this.allMenu.conditionalmenu[index - 1].menu;
						this.matchRule = item.matchRule;
						//console.log(JSON.stringify(item))
					}
				}
			},
			async getUserGroups() {
				let res = await http.getUserGroups({
					data: {}
				});
				if (res) {
					this.menuselName = Object.values(res);
				}
			},
			createNewMenu() {
				for (let i of this.menuName) {
					if (i.menuId == 'newType') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请保存菜单后再创建',
							winType: 'alert'
						});
						return false;
					}
				}
				this.isShowMenuWin = true;
				this.selects = [];
			},
			doThrowWinResult(i) {
				this.typeIndex = i;
				this.selectType();
			},
			// 验证url
			isURL(url) {
				let urlRegExp =
					/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>"''])*$/;
				if (!urlRegExp.test(url)) {
					return true;
				} else {
					return false;
				}
			},
			// 验证字节
			fucCheckLength(strTemp) {
				let i;
				let sum = 0;
				for (i = 0; i < strTemp.length; i++) {
					if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
						sum = sum + 1;
					} else {
						sum = sum + 2;
					}
				}
				return sum;
			},
			// 获取菜单
			async getMenu() { //   由type 来判断分组是否被修改
				let res = await http.getWeChatMenu({
					data: {}
				});
				if (res && res != '') {
					this.allMenu = res; //   所有分组菜单配置数据
					let conditionalmenu = res.conditionalmenu.reverse();
					let arr = [];
					for (let key of conditionalmenu) {
						arr.push({
							name: key.groupInfo.menuName,
							menuId: key.groupInfo.menuId,
							matchRule: key.groupInfo.matchRule.group_id
						});
					}
					this.menuName = arr;
					this.wechatFastMenu = res.wechatFastMenu; //获取默认菜单
					//console.log(JSON.stringify(this.menuName))
					if (this.menuId == 'default') {
						this.menuList = res.menu;
						this.menuIndex = 0;
					} else {
						this.menuList = conditionalmenu[this.menuIndex - 1].menu;
						this.menuId = conditionalmenu[this.menuIndex - 1].groupInfo.menuId;
						this.menuIndex = this.menuName.length;
					}
				}
			},
			// 获取SelfMenu菜单
			async getSelfMenu() {
				let res = await http.getSelfMenu({
					data: {
						shopId: this.userData.currentShop.id
					}
				});
				if (res) {
					this.typeList = res;
				}
			},
			valiData: function(content, title, winType) { //提示框格式化
				this.$store.commit('setWin', {
					content: content,
					title: title,
					winType: winType
				});
			},
			checkForm: function() {
				if (!this.saveStatus) {
					this.valiData('请勿重复保存!');
					return false;
				}
				let arr = this.menuList;
				let i, j;
				for (i = 0; i < arr.length; i++) {
					//两种情况
					//1 arr[i].sub_button 不存在 也就是只有父级菜单
					if (arr[i].sub_button == undefined) {
						//判断发送消息
						if (arr[i].type == '1' && arr[i].message == '') {
							this.valiData(`${arr[i].name}请填写消息内容！`);
							return false;
						}
						//判断url 地址
						if (arr[i].type == '2' && arr[i].url == '') {
							this.valiData(`${arr[i].url}请填写url地址！`);
							return false;
						}
						//判断小程序跳转
						if (arr[i].type == '38') {
							if (arr[i].appid == '') {
								this.valiData(`${arr[i].name}请填写小程序appId！`);
								return false;
							}
							if (arr[i].pagepath == '') {
								this.valiData(`${arr[i].name}请填写小程序页面路径！`);
								return false;
							}
							if (arr[i].url == '') {
								this.valiData(`${arr[i].name}请填写小程序链接！`);
								return false;
							}
						}
						//判断推送图片
						if (arr[i].type == '39' && arr[i].message.picUrl == '') {
							this.valiData(`${arr[i].name}请上传图片！`);
							return false;
						}
						//判断推送图文
						if (arr[i].type == '40') {
							if (arr[i].message[0].PicUrl == '') {
								this.valiData(`${arr[i].name}图文推送请上传图片!`);
								return false;
							}
							if (arr[i].message[0].Title == '') {
								this.valiData(`${arr[i].name}图文推送请填写标题!`);
								return false;
							}
							if (arr[i].message[0].Url == '') {
								this.valiData(`${arr[i].name}图文推送请填写链接!`);
								return false;
							}
							for (let k = 1; k < arr[i].message.length; k++) {
								if (arr[i].message[k].PicUrl == '') {
									this.valiData(`${arr[i].name}图文推送二级图文关联请上传图片!`);
									return false;
								}
								if (arr[i].message[k].Title == '') {
									this.valiData(`${arr[i].name}图文推送二级图文关联请填写标题!`);
									return false;
								}
								if (arr[i].message[k].Url == '') {
									this.valiData(`${arr[i].name}图文推送二级图文关联请填写链接!`);
									return false;
								}
							}
						}
					}
					if (arr[i].sub_button != undefined) {
						for (j = 0; j < arr[i].sub_button.length; j++) {
							// if (arr[i].sub_button[j].type == '1') {
							// 	if (arr[i].sub_button[j].message == undefined || utils.trim(arr[i].sub_button[j].message) == '') {
							// 		this.$store.commit('setWin', {
							// 			title: '操作提示',
							// 			winType: 'alter',
							// 			content: `${arr[i].sub_button[j].name}请填写消息内容！`,
							// 		});
							// 		this.addChild = true;
							// 		this.addParent = false;
							// 		this.childTitle = arr[i].sub_button[j].name;
							// 		this.type = arr[i].sub_button[j].type;
							// 		this.getTypeIndex();
							// 		return false;
							// 	}
							// }
							//判断发送消息
							if (arr[i].sub_button[j].type == '1' && arr[i].sub_button[j].message == '') {
								this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}请填写消息内容！`);
								return false;
							}
							//判断url 地址
							if (arr[i].sub_button[j].type == '2' && arr[i].sub_button[j].url == '') {
								this.valiData(`${arr[i].url}二级菜单${arr[i].sub_button[j].name}请填写url地址！`);
								return false;
							}
							//判断小程序跳转
							if (arr[i].sub_button[j].type == '38') {
								if (arr[i].sub_button[j].appid == '') {
									this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}请填写小程序appId！`);
									return false;
								}
								if (arr[i].sub_button[j].pagepath == '') {
									this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}请填写小程序页面路径！`);
									return false;
								}
								if (arr[i].sub_button[j].url == '') {
									this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}请填写小程序链接！`);
									return false;
								}
							}
							//判断推送图片
							if (arr[i].sub_button[j].type == '39' && arr[i].sub_button[j].message.picUrl == '') {
								this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}请上传图片！`);
								return false;
							}
							//判断推送图文
							if (arr[i].sub_button[j].type == '40') {
								if (arr[i].sub_button[j].message[0].PicUrl == '') {
									this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}图文推送请上传图片!`);
									return false;
								}
								if (arr[i].sub_button[j].message[0].Title == '') {
									this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}图文推送请填写标题!`);
									return false;
								}
								if (arr[i].sub_button[j].message[0].Url == '') {
									this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}图文推送请填写链接!`);
									return false;
								}
								for (let k = 1; k < arr[i].sub_button[j].message.length; k++) {
									if (arr[i].sub_button[j].message[k].PicUrl == '') {
										this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}图文推送二级图文关联请上传图片!`);
										return false;
									}
									if (arr[i].sub_button[j].message[k].Title == '') {
										this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}图文推送二级图文关联请填写标题!`);
										return false;
									}
									if (arr[i].sub_button[j].message[k].Url == '') {
										this.valiData(`${arr[i].name}二级菜单${arr[i].sub_button[j].name}图文推送二级图文关联请填写链接!`);
										return false;
									}
								}
							}
							// if (arr[i].sub_button[j].type == '2') {
							// 	if (arr[i].sub_button[j].url == undefined || utils.trim(arr[i].sub_button[j].url) == '') {
							// 		this.$store.commit('setWin', {
							// 			title: '操作提示',
							// 			winType: 'alter',
							// 			content: `${arr[i].sub_button[j].name}请填写url地址！`,
							// 		});
							// 		this.addChild = true;
							// 		this.addParent = false;
							// 		this.childTitle = arr[i].sub_button[j].name;
							// 		this.type = arr[i].sub_button[j].type;
							// 		return false;
							// 	}
							// }
						}
					}
					// if (arr[i].type == '1' && arr[i].sub_button == undefined) {
					// 	if (arr[i].message == undefined || utils.trim(arr[i].message) == '') {
					// 		this.$store.commit('setWin', {
					// 			title: '操作提示',
					// 			winType: 'alter',
					// 			content: `${arr[i].name}请填写消息内容！`,
					// 		});
					// 		this.addParent = true;
					// 		this.addChild = false;
					// 		this.parentTitle = arr[i].name;
					// 		this.type = arr[i].type;
					// 		this.getTypeIndex();
					// 		return false;
					// 	}
					// }
					// if (arr[i].type == '2' && arr[i].sub_button == undefined) {
					// 	if (arr[i].url == undefined || utils.trim(arr[i].url) == '') {
					// 		this.$store.commit('setWin', {
					// 			title: '操作提示',
					// 			winType: 'alter',
					// 			content: `${arr[i].name}请填写url地址！`,
					// 		});
					// 		this.addParent = true;
					// 		this.addChild = false;
					// 		this.parentTitle = arr[i].name;
					// 		this.type = arr[i].type;
					// 		this.getTypeIndex();
					// 		return false;
					// 	}
					// }
				}
				return true;
			},
			//保存
			async saveMenu() {
				//console.log(this.saveStatus);
				if (!this.checkForm()) return;
				// 提交判断
				//更改微信菜单
				//                console.log(' //更改微信菜单');
				let res = '';
				if (this.menuId == 'default') {
					res = await http.saveWeChateMenu({
						data: {
							menuData: JSON.stringify(this.menuList)
						}
					});
				} else {
					let data = '';
					if (isNaN(this.menuId)) {
						data = true;
					} else {
						this.saveStatus = false;
						data = await http.delMenuGroup({
							data: {
								menuId: this.menuId,
								groupId: this.matchRule
							}
						});
						if (data) {
							this.saveStatus = true;
						}
					}
					if (data) {
						this.saveStatus = false;
						res = await http.saveIndividuation({
							data: {
								menuData: JSON.stringify(this.menuList),
								matchRule: {
									'tag_id': this.matchRule
								}
							}
						});
					}
				}
				if (res) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '保存成功！',
					});
					this.getMenu(true);
					this.saveStatus = true;
					this.addParent = false;
					this.addChild = false;
				}
			},
			// 获取一级菜单信息
			getDetailParent(i) { //点击父级菜单显示
				this.addParent = true; //父级菜单标识
				this.addChild = false; //子级菜单标识
				this.Highlight(); //初始化菜单设置里面的status
				this.parentIndex = i; //点击对应的父级菜单
				//如果只有当前的父级菜单没有子级菜单时,可以配置
				//反之只有子级菜单才可以配置
				if (this.menuList[i].sub_button && this.menuList[i].sub_button.length > 0) {
					// if (JSON.stringify(this.menuList[i].sub_button) != '{}') {
					this.parentHide = true;
					// }
				} else {
					this.parentHide = false;
				}
				//console.log(JSON.stringify(this.menuList))
				if (i != undefined) {
					this.parentTitle = this.menuList[i].name; //点击获取对应的菜单名
					this.type = this.menuList[i].type == undefined ? '1' : this.menuList[i].type;
					//console.log(this.type)
					//如果有type
					if (typeof(this.menuList[i].message) == 'string') {
						this.message = this.menuList[i].message;
					} else {
						this.message = '';
					}
					// this.message = this.menuList[i].message == undefined ? '' : this.menuList[i].message;
					this.urls = this.menuList[i].url == undefined ? '' : this.menuList[i].url;
					//appid
					this.appIds = this.menuList[i].appid == undefined ? '' : this.menuList[i].appid;
					this.appPath = this.menuList[i].pagepath == undefined ? '' : this.menuList[i].pagepath;
					this.appurl = this.menuList[i].pagepath == undefined ? '' : this.menuList[i].url;
					//推送图片
					if (this.menuList[i].message instanceof Object) {
						this.imgUrl = this.menuList[i].message.picUrl == undefined ? '' : this.menuList[i].message.picUrl;
						this.media_id = this.menuList[i].message.media_id == undefined ? '' : this.menuList[i].message.media_id;
					}
					//推送图文
					if (this.menuList[i].message instanceof Array) {
						this.graphicTitle = this.menuList[i].message[0].Title;
						this.graphicUrl = this.menuList[i].message[0].Url;
						this.graphicimgUrl = this.menuList[i].message[0].PicUrl;
						if (this.menuList[i].message.length > 1) {
							this.secondary = [];
							for (let j = 1; j < this.menuList[i].message.length; j++) {
								let graphic = {
									imgUrl: this.menuList[i].message[j].PicUrl,
									title: this.menuList[i].message[j].Title,
									url: this.menuList[i].message[j].Url
								};
								this.secondary.push(graphic);
							}
						}
					}
					let obj = this.menuList[i];
					//console.log(JSON.stringify(obj))
					obj.status = '1';
					this.menuList.splice(i, 1, obj);
					this.menuList = utils.deepCopy(this.menuList);
					if (this.menuList[i].type != undefined) {
						this.getTypeIndex();
						//console.log(this.typeIndex)
					} else {
						this.typeIndex = 0;
					}
				} else {
					this.parentTitle = '菜单名称';
				}
			},
			// 获取 二级菜单信息
			getDetailChild(i, j) {
				this.index = i;
				this.childIndex = j;
				this.Highlight();
				if (this.menuList[i].sub_button != undefined) {
					this.parentHide = false;
				} else {
					this.parentHide = true;
				}
				if (j != undefined) {
					this.childTitle = this.menuList[this.index].sub_button[j].name;
					this.type = this.menuList[this.index].sub_button[j].type;

					if (typeof(this.menuList[this.index].sub_button[j].message) == 'string') {
						this.message = this.menuList[this.index].sub_button[
							j].message;
					} else {
						this.message = '';
					}
					this.urls = this.menuList[this.index].sub_button[j].url == undefined ? '' : this.menuList[this.index].sub_button[j]
						.url;
					//appid
					this.appIds = this.menuList[this.index].sub_button[j].appid == undefined ? '' : this.menuList[this.index].sub_button[j].appid;
					this.appPath = this.menuList[this.index].sub_button[j].pagepath == undefined ? '' : this.menuList[this.index].sub_button[j].pagepath;
					this.appurl = this.menuList[this.index].sub_button[j].pagepath == undefined ? '' : this.menuList[this.index].sub_button[j].url;
					//推送图片
					if (this.menuList[this.index].sub_button[j].message instanceof Object) {
						this.imgUrl = this.menuList[this.index].sub_button[j].message.picUrl == undefined ? '' : this.menuList[this.index].sub_button[j].message.picUrl;
						this.media_id = this.menuList[this.index].sub_button[j].message.media_id == undefined ? '' : this.menuList[this.index].sub_button[j].message.media_id;
					}
					//推送图文
					if (this.menuList[this.index].sub_button[j].message instanceof Array) {
						this.graphicTitle = this.menuList[this.index].sub_button[j].message[0].Title;
						this.graphicUrl = this.menuList[this.index].sub_button[j].message[0].Url;
						this.graphicimgUrl = this.menuList[this.index].sub_button[j].message[0].PicUrl;
						if (this.menuList[this.index].sub_button[j].message.length > 1) {
							this.secondary = [];
							for (let k = 1; k < this.menuList[this.index].sub_button[j].message.length; k++) {
								let graphic = {
									imgUrl: this.menuList[this.index].sub_button[j].message[k].PicUrl,
									title: this.menuList[this.index].sub_button[j].message[k].Title,
									url: this.menuList[this.index].sub_button[j].message[k].Url
								};
								this.secondary.push(graphic);
							}
						}
					}

					let obj = this.menuList[i].sub_button[j];
					obj.status = '1';
					this.menuList[i].sub_button.splice(j, 1, obj);
					this.menuList = utils.deepCopy(this.menuList);
					this.getTypeIndex();
				} else {
					this.childTitle = '子菜单名称';
					this.typeIndex = 0;
				}
				this.addChild = true;
				this.addParent = false;
			},
			// 设置type信息
			selectType() {
				this.type = this.typeList[this.typeIndex].type; //菜单内容对应的type值
				//判断url是否正确
				if (this.type == '2' && utils.trim(this.urls) != '') {
					if (this.isURL(this.urls)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: 'url地址格式错误！',
						});
						return false;
					}
				}
				this.Highlight();

				let obj = {};
				let arr = [];
				if (this.addParent) {
					//判断父级菜单名称是否超出
					if (this.fucCheckLength(utils.trim(this.parentTitle)) > 8) {
						//                        this.parentTitle = parentTit;
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alter',
							content: '菜单名称长度超出！',
						});
						return false;
					}
					arr = utils.deepCopy(this.menuList[this.parentIndex].sub_button);
					this.menuList[this.parentIndex] = {};

					obj.name = this.parentTitle;
					obj.type = this.type;
					obj.status = '1';

					if (this.type == '1') { //发送消息
						obj.message = this.message;
					}
					if (this.type == '2') { //跳转页面
						obj.url = this.urls;
					}
					if (this.type == '38') { //小程序跳转
						obj.url = this.appurl;
						obj.appid = this.appIds;
						obj.pagepath = this.appPath;
					}
					if (this.type == '39') { //上传图片
						let message = {
							picUrl: this.imgUrl,
							media_id: this.media_id
						};
						obj.message = message;
					}
					if (this.type == '40') {
						let arr = [];
						let obj1 = {
							title: this.graphicTitle,
							imgUrl: this.graphicimgUrl,
							url: this.graphicUrl
						};
						arr.push(obj1);
						let newArr = arr.concat(this.secondary);
						let message = [];
						for (let item of newArr) {
							let obj2 = {
								Title: item.title,
								Description: '',
								PicUrl: item.imgUrl,
								Url: item.url
							};
							message.push(obj2);
						}
						obj.message = message;
					}
					obj.sub_button = arr;
					this.menuList.splice(this.parentIndex, 1, obj);
				} else {
					//判断子级菜单名称是否超出
					if (this.fucCheckLength(utils.trim(this.childTitle)) > 16) {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alter',
							content: '菜单名称长度超出！',
						});
						return false;
					}
					this.menuList[this.parentIndex].sub_button[this.childIndex] = {};

					obj.name = this.childTitle;
					obj.type = this.type;
					obj.status = '1';
					if (this.type == '1') { //发送消息
						obj.message = this.message;
					}
					if (this.type == '2') { //跳转页面
						obj.url = this.urls;
					}
					if (this.type == '38') { //小程序跳转
						obj.url = this.appurl;
						obj.appid = this.appIds;
						obj.pagepath = this.appPath;
					}
					if (this.type == '39') { //上传图片
						let message = {
							picUrl: this.imgUrl,
							media_id: this.media_id
						};
						obj.message = message;
					}
					if (this.type == '40') {
						let arr = [];
						let obj1 = {
							title: this.graphicTitle,
							imgUrl: this.graphicimgUrl,
							url: this.graphicUrl
						};
						arr.push(obj1);
						let newArr = arr.concat(this.secondary);
						let message = [];
						for (let item of newArr) {
							let obj2 = {
								Title: item.title,
								Description: '',
								PicUrl: item.imgUrl,
								Url: item.url
							};
							message.push(obj2);
						}
						obj.message = message;
					}
					this.menuList[this.parentIndex].sub_button.splice(this.childIndex, 1, obj);
					//console.log(JSON.stringify(this.menuList))
				}
			},
			// 更新typeIndex
			getTypeIndex() {
				let k;
				for (k = 0; k < this.typeList.length; k++) {
					if (this.typeList[k].type == this.type) {
						this.typeIndex = k;
						//console.log(this.typeIndex)
					}
				}
			},
			// 添加一级菜单 父级菜单
			addParentMenu() {
				this.parentTitle = '菜单名称';
				this.message = ''; //发送消息
				this.urls = ''; //跳转链接
				this.addParent = true; //显示父级的菜单标题
				this.addChild = false; //显示子级的菜单标题
				this.type = '1'; //菜单内容选中的
				this.Highlight(); //默认初始status
				this.menuList.push({
					name: this.parentTitle,
					type: '1',
					status: '1'
				});
				this.typeIndex = 0; //菜单内容默认选中0
				this.parentIndex = this.menuList.length == 0 ? 0 : this.menuList.length - 1;
			},
			// 添加二级菜单
			addChildMenu() {
				// 添加二级菜单判断
				this.menuList = utils.deepCopy(this.menuList);
				if (this.menuList[this.parentIndex].sub_button == undefined) {
					this.menuList[this.parentIndex].sub_button = [];
				}
				if (this.menuList[this.parentIndex].sub_button.length == 5) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '最多添加5个子菜单！',
					});
					return false;
				}
				this.childTitle = '子菜单名称';
				this.message = '';
				this.urls = '';
				this.addChild = true;
				this.addParent = false;
				this.type = '1';
				this.Highlight();
				this.menuList[this.parentIndex].sub_button.push({
					name: this.childTitle,
					type: '1',
					status: '1'
				});
				//console.log(JSON.stringify(this.menuList))
				//                this.menuList = sd.copy(this.menuList);
				//                this.menuList = JSON.parse(JSON.stringify(this.menuList));
				this.typeIndex = 0;
				this.childIndex = this.menuList[this.parentIndex].sub_button.length - 1;
			},
			//删除一级菜单
			delParent() {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确认删除菜单？',
					callback: (delRes) => {
						if (delRes == 'ok') {
							this.menuList.splice(this.parentIndex, 1);
							this.addChild = false;
							this.addParent = false;
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '删除成功！',
							});
						}
					}
				});
			},
			//删除二级菜单
			delChild() {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确认删除子菜单？',
					callback: (delRes) => {
						if (delRes == 'ok') {
							if (this.menuList[this.parentIndex].sub_button.length == 1) {
								this.menuList[this.parentIndex].sub_button.splice(this.childIndex, 1);
								delete this.menuList[this.parentIndex].sub_button;
							} else {
								this.menuList[this.parentIndex].sub_button.splice(this.childIndex, 1);
							}
							this.addChild = false;
							this.addParent = false;
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '删除成功！',
							});
						}
					}
				});
			},
			Highlight() {
				let k, j;
				for (k = 0; k < this.menuList.length; k++) {
					this.menuList[k].status = '0';
					if (this.menuList[k].sub_button != undefined) {
						for (j = 0; j < this.menuList[k].sub_button.length; j++) {
							this.menuList[k].sub_button[j].status = '0';
						}
					}
				}
			},
			async upNameChange(type) {
				// 上传图片 背景图片回调
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'startImage',
				});
				if (type == '1') {
					this.imgUrl = this.uploadUrl + res; //图片
				} else if (type == '2') {
					this.graphicimgUrl = this.uploadUrl + res; //图片
				}
				this.selectType();
				// this.endingImage = res;//图片传给后台
				// let bgName = this.endingImage.lastIndexOf('/');
				// this.endingImageName = this.endingImage.substring(bgName + 1, this.endingImage.length);
			},
			async bgNameChange(ind) {
				// 上传图片 背景图片回调
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'endImage',
				});
				this.secondary[ind].imgUrl = this.uploadUrl + res; //图片
				this.selectType();
			},
			addsencPushlanguage: function() { //增加二级图文推送关联
				let obj = {
					imgUrl: '', //二级图片
					title: '', //标题
					url: '' //链接
				};
				if (this.secondary.length >= 5) {
					this.valiData('关注推送语二级图文关联最多添加5条!');
					return false;
				}
				this.secondary.push(obj);
				this.selectType();
			},
			deletesecPush: function(index, ind) { //删除二级图文推送
				if (this.ruleIndex >= ind) {
					this.ruleIndex = 0;
				}
				this.secondary.splice(ind, 1);
			},
			getDetails: function(index) { //二级图文点击
				// 获取规则详情
				this.ruleIndex = index;
			},
		},
		components: {
			//            radioBtn
			radioBtn: () =>
				import ( /* webpackChunkName:'radio_btn' */ 'src/components/radio_btn'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			'win': () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			addPushlan: () =>
				import ( /* webpackChunkName:"push_language_component" */ './push_language_component'),
		}
	};
</script>
<style lang="less" scoped>
	.menu-reveal {
		position: relative;
		width: 317px;
		height: 580px;
		background: transparent url(../../res/images/head-bg.png) no-repeat 0 0;
		background-position: 0 0;
		border: 1px solid #e7e7eb;
	}

	.menu-title {
		color: #fff;
		text-align: center;
		padding-top: 30px;
		font-size: 15px;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
		margin: 0 30px
	}

	.menu-list {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		line-height: 50px;
		text-align: center;
		border-top: 1px solid #e7e7eb;
		background: transparent url(../../res/images/menu-bg.png) no-repeat 0 0;
		background-position: 0 0;
		/*background-repeat: no-repeat;*/
		padding-left: 43px;
	}

	.menu-list li.Parent {
		position: relative;
		width: 33.33%;
		float: left;
		cursor: pointer;
		display: inline-block;
		border-left: 1px solid #e7e7eb;
	}

	.menu-list li.Parent span {
		float: left;
		width: 100%;
		height: 100%;
	}

	.menu-list-add {
		float: none;
		width: auto;
		overflow: hidden;
	}

	.menu-list-add a {
		display: block;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
		color: #616161;
		text-decoration: none;
	}

	.pre_menu_link {
		border-left: 1px solid #e7e7eb
	}

	.icon-menu-add {
		background: url(../../res/images/icon-menu-add.png) no-repeat 0 0;
		width: 14px;
		height: 14px;
		vertical-align: middle;
		display: inline-block;
		margin-top: -2px;
	}

	.menu-config {
		margin-left: 50px;
		width: 771px;
		min-height: 580px;
		padding: 20px 10px;
		background-color: #f6f6f6;
		position: relative;
	}

	.menu-config .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	.menu-config .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 80px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	.menu-config .online-box .rightHalf {
		width: 650px;
		height: auto;
		float: left;
	}

	.menu-config .online-box .rightHalf .app_t {
		margin-bottom: 10px;
	}

	.menu-config .online-box .rightHalf .app_t span {
		display: block;
		width: 110px;
		text-align: center;
		line-height: 40px;
		height: 40px;
		font-size: 14px;
		margin-right: 20px;
	}

	.menu-config .online-box .rightHalf .uploadImgs {
		height: 40px;
		position: relative;
	}

	.menu-config .online-box .rightHalf .uploadImgs input {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	.menu-config .online-box .addclassify {
		width: 200px;
	}

	.menu-config .online-box .rightHalf .smallimg {
		width: 160px;
		height: 160px;
		margin-bottom: 20px;
		border: 1px solid #cecdcd;
	}

	.menu-config .online-box .rightHalf .smallimg img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.handle-tips {
		margin: 0 20px;
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	.menu-config .tip {
		display: block;
		height: 40px;
		line-height: 30px;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		font-size: 24px;
		color: #666;
	}

	.menu-config-title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 50px;
	}

	.menu-config-title span,
	.menu-config-content label {
		display: inline-block;
		width: 100px;
		height: 40px;
		line-height: 40px;
	}

	.menu-config-title span {
		text-align: center;
	}

	.menu-config-title input,
	.menu-config .online-box .rightHalf input {
		outline: none;
		border: none;
		height: 38px;
		width: 250px;
		padding-left: 20px;
	}

	.menu-config-content {
		height: auto;
		width: 100%;
	}

	.menu-config-content input[type="radio"] {
		float: left;
		margin-top: 13px;
	}

	.menu-config-content label {
		cursor: pointer;
	}

	input[type="radio"]:focus,
	textarea:focus {
		outline: none;
	}

	.menu-message {
		padding-left: 100px;
		width: 100%;
		overflow: hidden;
	}

	.menu-config .online-box .rightHalf textarea {
		width: 480px;
		height: 150px;
		padding: 10px;
		border: 1px solid #dedede;
		resize: none;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
	}

	.menu-message input {
		outline: none;
		width: 358px;
		height: 40px;
		padding-left: 20px;
		background-color: #fff;
		border: none;
	}

	.menu-setMenu {
		padding-left: 50px;
		width: 100%;
		height: auto;
		margin-top: 25px;
		display: flex;
		justify-content: center;
	}

	.menu-setMenu a {
		display: block;
		width: 200px;
		margin: 0 20px;
	}

	.menu-del {
		display: block;
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #459ae9;
	}

	.menu-child {
		position: absolute;
		bottom: 60px;
		left: 0;
		border: 1px solid #d0d0d0;
		width: 100%;
	}

	.menu-child:after {
		content: "";
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-top: 8px solid #e7e7eb;
		border-right: 8px solid transparent;
		position: absolute;
		left: 50%;
		bottom: -8px;
		margin-left: -8px;
	}

	.menu-child ul li {
		border-bottom: 1px solid #d0d0d0;
		background-color: #fafafa;
	}

	.menu-child ul li:last-child {
		border-bottom: none;
	}

	.menu-child ul li.childOn,
	.menu-list li.ParentOn {
		background-color: #fff;
	}

	.child-toogle {
		display: none;
	}

	.selectbtns {
		width: auto;
		margin-bottom: 20px;
	}

	.selectbtns span {
		background-color: #fff;
	}

	.selectbtns span:hover {
		background-color: #fff;
	}

	.caiDan {
		text-align: center;
		width: 100px;
		height: 40px;
		line-height: 40px;
	}

	.spanUrl {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	#menu {
		position: relative;

		.menu_aside {
			button {
				position: absolute;
				top: -45px;
				right: 87px;
				background: RGB(40, 168, 224);
				color: #fff;
			}
		}

		.menu_header {
			ul {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;

				li {
					margin: 8px 14px 20px 0;
				}
			}
		}
	}

	.btns {
		display: inline-block;
		text-align: center;
		line-height: 42px;
		border-radius: 4px;
		min-width: 121px;
		height: 42px;
		background: RGB(242, 242, 242);
		color: RGB(51, 51, 51);
		font-size: 16px;
		padding: 0 26px;
		border: none;
	}

	.menu_win {
		// padding: 0px 66px 0;

		.menu_content_group {
			margin-top: 29px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;

			// span {
			// 	margin-bottom: 13px;
			// 	font-size: 16px;
			// 	color: RGB(51, 51, 51);
			// }
		}
	}

	.btn_blue {
		background: #e1bb4a;
		color: #fff;
	}

	.menu-config-content div .activ {
		display: block;
	}

	.menu-config .online-box .rightHalf .title {
		width: 800px;
		height: 40px;
	}

	.menu-config .online-box .rightHalf .title .active {
		background-color: #B3B3B3;
	}

	.menu-config .online-box .rightHalf .content {
		width: 600px;
		height: 430px;
		border: 1px solid #b3b3b3;
		padding: 26px 0 0 31px;
	}

	.menu-config .online-box .rightHalf .content .smallimg {
		width: 160px;
		height: 160px;
		margin-bottom: 20px;
		border: 1px solid #cecdcd;
	}

	.menu-config .online-box .rightHalf .imgshow {
		width: 350px;
		height: 251px;
		border: 1px solid #cecdcd;
		margin-bottom: 21px;
	}

	.menu-config .online-box .rightHalf .imgshow img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.menu-config .online-box .rightHalf .content .smallimg img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.menu-config .online-box .rightHalf .title li {
		float: left;
		width: 100px;
		height: 40px;
		margin-right: 10px;
		background-color: #f2f2f2;
		text-align: center;
		line-height: 40px;
		position: relative;
	}

	.menu-config .online-box .rightHalf .title li:hover i.deletes {
		position: absolute;
		right: -12px;
		top: -12px;
		background: url(../../res/images/delete.png) center center no-repeat;
		height: 30px;
		width: 30px;
		cursor: pointer;
	}

	.menu_content_group .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	.menu_content_group .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	.menu_content_group .online-box .rightHalf {
		max-width: 500px;
		height: auto;
		float: left;
	}

	// .handle-tips {
	// 	height: 40px;
	// 	line-height: 40px;
	// 	text-indent: 45px;
	// 	background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
	// 	color: #999999;
	// }
</style>