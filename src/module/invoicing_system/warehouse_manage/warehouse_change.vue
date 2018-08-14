<!--
* 修改仓库
* 黄一帆
-->
<template>
    <div id="change-warehouse">
        <div class="create">修改仓库</div>
        <div class="store-content">
            <div class="store-list">
                <label class="store-name required">仓库名称</label>
                <input type="text" placeholder="请输入仓库名称" v-model="param.name" class="store-input" maxlength="10">
            </div>
            <div class="store-list">
                <label  class="store-name">仓库编号</label>
                <input type="text" placeholder="请输入仓库编号" v-model="code"
                	@input="codeInput" @propertychange="codeInput" maxlength="20" class="store-input">
                <span class="font-limit tips">
                    <img src="../../../res/images/handle-tips.png" alt="">限20字以内,数字/字母
                </span>
            </div>
            <div class="store-list">
                <label  class="store-name required">仓库所属</label>
                <div class="add-blong" @click="openStoreBlong">
                    <span class="img-span">
                        <img src="../../../res/images/add.png" style="vertical-align:middle;" alt="">
                    </span>添加仓库所属
                </div>
                <em class="now-select" v-if="ownerName">( 已选择：{{ownerName}} )</em>
                <em class="now-select" v-if="!ownerName">( 请选择仓库所属 )</em>
            </div>

            <div class="store-list">
                <label  class="store-name required">共享</label>
                <div class="shared-box">
                	<on-off :status="booleanShared" @statusChange="getShared"></on-off>
                </div>
            </div>

            <div class="store-list" >
                <label  class="store-name required">仓库地址</label>
                <div class="address-box">
                    <addresslinkage @emit="getAddress" :width="210"
                    	:province="param.province" :city="param.city" :area="param.town"></addresslinkage>
                </div>
                <textarea class="text-area" v-model="place" placeholder="请输入详细地址" maxlength="40"></textarea>
                <span class="font-limit tips" >
                    <img src="../../../res/images/handle-tips.png" alt="">限40字以内
                </span>
            </div>
        </div>
        <div class="store-content">
            <div class="bottom-btn">
                <div class="gray cancel-btn" @click="cancel">取消</div>
                <div class="yellow ok-btn" @click="confirm">确定</div>
            </div>
        </div>
        <component
            :is="showCom"
            :pObj="comObj"
            @throwWin="closeWin"
        ></component>
    </div>
</template>
<script type='text/javascript'>
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				detail: '',
				detailSend: '', //发送数据
				param: {
					name: '', //仓库名称
					owner: '', //仓库所属-id
					province: '', //省份
					city: '', //城市
					town: '', //区域
				},
				tips: {
					name: '仓库名称',
					owner: '仓库所属',
					province: '省份',
					city: '城市',
					town: '地区',
				},
				code: '', //仓库编号
				place: '', //详细地址
				wid: '', //仓库id
				comObj: {},
				sendObj: {}, //页面加载-存储发送给弹框的参数
				showCom: '',
				ownerName: '', //仓库所属-名称
				isBrand: 0, //1为品牌 0为非品牌
				ischain: '', //店铺类型
				brandId: '', //品牌id
				booleanShared: true,
				isShared: 1, //是否共享
				isClick: false, //是否已经点击提交，防止重复点击
			};
		},
		created() {
			this.userData = storage.session('userShop');
			this.ischain = this.userData.currentShop.ischain;
			this.isBrand = this.ischain == '3' ? 1 : 0; //是否为品牌,
			if(this.ischain == 1 || this.ischain == 2) {
				this.brandId = this.userData.currentShop.brandId;
			} else if(this.ischain == 3) {
				this.brandId = this.userData.currentShop.id;
			}
		},
		mounted() {
			this.initData();
			this.getOwner();
		},
		components: {
			addStoreBlong: () =>
				import( /*webpackChunkName:'create_store_blong_win'*/ './create_store_blong_win'),
			addresslinkage: () =>
				import( /*webpackChunkName: 'address_linkage'*/ 'src/components/address_linkage'),
			onOff: () =>
				import( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		},
		methods: {
			initData() {
				this.wid = this.$route.query.id;
				if(this.wid) {
					this.getWarehouseDetail();
				} else {
					console.log('仓库id不存在');
				}
			},
			getShared(res) {
				this.booleanShared = res;
				this.isShared = res ? 1 : 0;
			},
			openStoreBlong() {
				this.sendObj.owner = this.param.owner;
				this.comObj = this.sendObj;
				this.showCom = 'addStoreBlong';
			},
			closeWin(res, obj) { //关闭弹窗-获取所属列表返回的数据
				if(res == 'ok') {
					this.ownerName = obj.name;
					if(obj.ischain == '3') { //选中品牌
						this.param.owner = obj.id + ',0';
					} else { //选中单店
						if(obj.ischain != '0') { //有品牌直营店，加盟的
							this.param.owner = this.brandId + ',' + obj.id;
						} else { //无品牌单店
							this.param.owner = '0,' + obj.id;
						}
					}
				}
				this.showCom = null;
			},
			getAddress(obj) { //获取返回的地址
				this.param.province = obj.province;
				this.param.city = obj.city;
				this.param.town = obj.area;
			},
			codeInput(event) { //限制文本框输入 只能输入数字和字母
				let num = event.target.value;
				num = num.replace(/[^A-Za-z0-9]/g, '');
				this.code = num;
				event.target.value = num;
			},
			cancel() { //取消
				this.$router.push({
					path: 'warehouseDetail',
					query: this.$route.query
				});
			},
			confirm() { //确认修改
				if(!this.checkForm()) return;
				this.changeWarehouse();
			},
			//校验表单
			checkForm() {
				//这里只验证省份不能为空
				for(let i in this.param) {
					this.param[i] = this.param[i].trim();
					if(i != 'city' && i != 'town') {
						if(this.param[i].length == 0) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: `${this.tips[i]}不能为空`
							});
							return false;
						}
					}
				}
				return true;
			},
			async getWarehouseDetail() { //获取仓库详情
				let data = await http.warehouseGetWarehouse({
					data: {
						id: this.wid
					}
				});
				this.detail = data;
				let obj = {
					param: {
						name: '', //仓库名称
						owner: '', //仓库所属-id
						province: '', //省份
						city: '', //城市
						town: '', //区域
					},
					code: '', //仓库编号
					place: '', //详细地址
					isPublic: '', //是否共享
					ownerName: '', //所属名称
					isShared: '', //是否共享
				};
				for(let i in obj) {
					if(i == 'param') {
						for(let p in obj.param) {
							this.param[p] = this.detail[p];
						}
					} else if(i == 'isShared') {
						this.isShared = parseInt(this.detail[i]);
						this.booleanShared = this.isShared == 1 ? true : false;
					} else {
						this[i] = this.detail[i];
					}
				}
			},
			async getOwner() { //获取品牌列表
				let data = await http.invoicing_getOwners();
				this.sendObj = {
					allList: data,
					isBrand: this.isBrand,
				};
			},
			async changeWarehouse() {
				if(this.isClick) {
					this.$store.commit('setWin', {title: '温馨提示',content: '请勿重复点击'});
					return;
				}
				this.isClick = true;
				let res=null;
				try{
					res = await http.warehouseEditWarehouse({
						data: {
							name: this.param.name,
							code: this.code,
							isShared: this.isShared,
							owner: this.param.owner,
							place: this.place,
							country: '',
							province: this.param.province,
							city: this.param.city,
							town: this.param.town,
							wid: this.wid,
						}
					},true);
				}
				catch(e){
					this.$store.commit('setWin', {title: '错误提示',content: e.error.message});
					this.isClick = false;//接口报错，还能继续点击
				}
				if(res) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '仓库修改成功',
						callback: () => {
							this.$router.push({
								path: 'warehouseDetail',
								query: this.$route.query
							});
						}
					});
				}
			}
		},
	};
</script>
<style lang='less' scoped>
    #change-warehouse{
    	padding-bottom: 50px;
    	padding-top: 10px;
        .vertical-line{
            line-height: 40px;
            height: 40px;
        }
        .create{
            text-indent: 15px;
            border-left:2px solid #20a7dc;
            margin-bottom:30px;
            font-size:16px;
            color:#333;
        }
        .create:after{
            content:'';
            width:479px;
            display: inline-block;
            margin-left:40px;
            border-bottom:2px dashed #ddd;
            top:-4px;
            position: relative;
        }

        .store-content{
            padding-left:28px;
            .store-list{
                position: relative;
                margin-bottom:20px;
                padding-left: 100px;
                .store-name{
                    font-size:14px;
                    width:80px;
                    display: inline-block;
                    text-align: right;
                    color:#333;
                    position: absolute;
                    top: 0;
                    left: 0;
                    .vertical-line;
                }
                .store-input{
                    height:40px;
                    width:210px;
                    border:1px solid #d2d2d2;
                    display: inline-block;
                    padding:0;
                    outline:none;
                    text-indent: 15px;
                    font-size:14px;
                    vertical-align: top;
                }
                .now-select{
                    margin-left:16px;
                    font-size:14px;
                    color: #707077;
                }
                .add-blong{
                    background: #29a8e0;
                    width:210px;
                    border:1px solid #29a8e0;
                    display: inline-block;
                    font-size:14px;
                    text-align: center;
                    color:#ffffff;
                    cursor:pointer;
                    .vertical-line;
                    .img-span{
                        vertical-align:middle;
                        width:30px;
                        display:inline-block;
                        text-align:left;
                        margin-top:-3px;
                    }
                }
                .active{
                    border:1px solid #eb9e60;
                    background: #fff3e4;
                    color:#eb9e60;
                }
                .text-area{
                    width:210px;
                    height:100px;
                    border:1px solid #bebebe;
                    resize: none;
                    outline: none;
                    padding:10px;
                    box-sizing: border-box;
                    font-size:14px;
                    display: block;
                    
                }
                .font-limit{
                    color:#c3c3c3;
                    font-size:14px;
                    margin-top:15px;
                    display: inline-block;
                    vertical-align: middle;
                    img{
                        vertical-align: middle;
                    }
                }
                .tips{display: block;
                	img{margin-right: 10px;}
                }
                .address-box{display: inline-block;vertical-align: top;margin-bottom: 20px;}
                .opera-img{
                    vertical-align:middle;
                    display: inline-block;
                    width:40px;
                    .vertical-line;
                    text-align: center;
                    cursor: pointer;
                    img{
                        vertical-align:middle;
                        display: inline-block;
                    }
                }
                .area-name{
                    width:100px;
                    display: inline-block;
                    color:#333;
                    font-size:14px;
                    color:#333;
                    text-align:left;
                    position: absolute;
                    top: 0;
                    left: 0;
                    .vertical-line;
                }
            }
            .bottom-btn{
            	padding-left: 100px;
                margin-top:40px;
                margin-bottom: 100px;
                div{
                    width:200px;
                    height:50px;
                    line-height: 50px;
                    text-align: center;
                    margin-right:10px;
                    display: inline-block;
                    color:#f1f1f1;
                    font-size:16px;
                }
            }
        }
    }





        


</style>

