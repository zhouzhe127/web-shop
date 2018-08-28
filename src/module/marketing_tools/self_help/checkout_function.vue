<!--
    **新增结账功能
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="pay-window">
		<!-- 基础配置 -->
		<div class="set-line">
			<div class="titles">基础配置</div>
			<div class="line"></div>
		</div>
		<!-- 自定义名称 -->
		<div class="pay-window-box">
			<span class="fl pay-window-sub">自定义名称</span>
			<input type="text" class="fl custom" placeholder="请输入自定义名称" v-model="name" maxlength="4" />
			<div class="fl handle-tips">
				<i></i> 最多四个字
			</div>
		</div>
		<!-- 关联功能 -->
		<div class="pay-window-box">
			<span class="fl pay-window-sub required">关联功能</span>
			<div class="rightHalf" v-if="flag">
				<template v-for="(item,index) in goodlist">
					<span :key='index' :class="type == index ? 'signa associated' : 'associated'" v-on:click="tabTypes(index,'1')" v-if="item.type">{{item.name}}</span>
				</template>
			</div>
			<div class="rightHalf" v-else>
				<template v-for="(it,ind) in goodlist">
					<span :key='ind' :class="type == ind ? 'signa unassociated' : 'unassociated'" v-if="it.type">{{it.name}}</span>
				</template>
			</div>
		</div>
		<!-- 开启关联功能 -->
		<div class="pay-window-box" v-show="opentheFunction">
			<span class="fl pay-window-sub">开启功能</span>
			<onOff :key='1' :status="payStatus" @statusChange="ispayStatus"></onOff>
		</div>
		<!-- 营业时间 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub"></span>
			<div class="rightHalf">
				<p class="business">营业时间:顾客仅在您设置的时段内,可以在线下单</p>
				<div class="disc" v-for="(item,index) in payWays" :key="index">
					<span class="circle fl" :class="{'effect':payType == item.id}" @click="changeRadio(item,'1')"></span>
					<span class="text fl">{{item.name}}</span>
					<div class="fl handle-tips" v-if="item.id == '1'">
						<i></i> 最多增加2个时间段
					</div>
				</div>
				<use-time v-if="payType == 1" :useDate="useDate" :isShowdefault="false" @getTime="getResult" :maxLength='2'></use-time>
			</div>
		</div>
		<!-- 配送规则 -->
		<div class="set-line">
			<div class="titles">配送规则</div>
			<div class="line"></div>
		</div>
		<!-- 外卖的支付方式 -->
		<!-- 起送费 -->
		<div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub required">起送费</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="sendingfee" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="keepValue('sendingfee')" />
					<span>元</span>
				</section>
				<div class="fl handle-tips">
					<i></i> 满足费用才允许配送
				</div>
			</div>
		</div>
		<!-- 配送范围 -->
		<!-- <div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub required">配送范围</span>
			<section class="fl" style="overflow: hidden;">
				<div class="scopes" v-for="(item,index) in distances" :key='index'>
					<div class="scopes_l fl">
						<span>{{item.defaultdis}}</span>
						<span>Km</span>
					</div>
					<div class="lines"></div>
					<div class="scopes_r fl">
						<input type="text" name="" v-model="item.distance" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="3">
						<span>Km</span>
					</div>
					<div class="lines"></div>
					<div class="scopes_r fl">
						<input type="text" name="" v-model="item.cost" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue(index)">
						<span>元</span>
					</div>
					<span class="seat fl">配送费</span>
					<a href="javascript:void(0)" class="delet fl" @click="deldistance(index)"></a>
				</div>
			</section>
			<a href="javascript:void(0)" class="add fl" @click='adddistance'>
					<img src="../../../res/images/adds.png">
				</a>
		</div> -->
		<!-- 预计到达 -->
		<div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub required">预计到达</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="estimatedtime" onkeyup="value=value.replace(/[^\d.]/g,'')" />
					<span>分钟</span>
				</section>
			</div>
		</div>
		<!-- 备餐时间 -->
		<div class="pay-window-box clearfix" v-if="type == '0'">
			<span class="fl pay-window-sub required">备餐时间</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="equipment" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>分钟</span>
				</section>
			</div>
		</div>
		<!-- 接单自动出餐 -->
		<div class="pay-window-box" v-if="type == '1'">
			<span class="fl pay-window-sub">接单自动出餐</span>
			<onOff :key='1' :status="mealStatus" @statusChange="ismealStatus"></onOff>
		</div>
		<!-- 备餐时间 -->
		<div class="pay-window-box clearfix" v-if="type == '1' && mealStatus">
			<span class="fl pay-window-sub required">备餐时间</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="equipment" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>分钟</span>
				</section>
			</div>
		</div>
		<!-- 快递的支付方式 -->
		<!-- 快递费用 -->
		<div class="pay-window-box clearfix" v-if="type == '3'">
			<span class="fl pay-window-sub required">快递费用</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="shippingfee" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="keepValue('shippingfee')" />
					<span>元</span>
				</section>
				<div class="fl handle-tips">
					<i></i> 无法使用积分抵扣
				</div>
			</div>
		</div>
		<!-- 支付规则 -->
		<div class="pay-window-box clearfix" style="margin-bottom:0;">
			<span class="fl pay-window-sub">支付规则</span>
			<section class="fl payment-rules">
				<div class='define' v-if="configure.length <=4 ">
					<input type="text" placeholder="请输入规则" class="fl define-inp" v-model="content" maxlength="20" />
					<div class='bg' @click="saveConcont"></div>
					<div class="fl handle-tips">
						<i></i> 最多定义五条
					</div>
				</div>
				<div class="rlues" v-for="(content,i) in configure" :key='i' v-if="configure.length >= 1">{{content}}
					<i @click="delConcont(i)"></i>
				</div>
			</section>
		</div>
		<!-- 可填写内容配置 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">可填写内容配置</span>
			<!-- 根据关联功能的type值显示对应的内容配置 -->
			<span class="fl" v-if="type == '0'">
					<mulSelect :list.sync="configurationList" :selects.sync="configurationSelect" :name='"name"' :key='"id"' :styles="{'background-color':'rgb(239,239,239)','margin-right':'8px'}"></mulSelect>
				</span>
			<span class="fl" v-if="type == '1'">
					<mulSelect :list.sync="takeoutList" :selects.sync="takeoutSelect" :name='"name"' :key='"id"' :styles="{'background-color':'rgb(239,239,239)'}"></mulSelect>
				</span>
			<span class="fl" v-if="type == '3'">
					<mulSelect :list.sync="courierList" :selects.sync="courierSelect" :name='"name"' :key='"id"' :styles="{'background-color':'rgb(239,239,239)'}"></mulSelect>
				</span>
		</div>
		<!-- 用餐人数 -->
		<div class="pay-window-box clearfix" v-if="type == '0'">
			<span class="fl pay-window-sub">用餐人数</span>
			<onOff class="fl" :key='1' :status="personStatus" @statusChange="ispersonStatus"></onOff>
			<div class="fl handle-tips">
				<i></i> 关闭后,默认用餐人数为1人
			</div>
		</div>
		<div class="pay-window-box clearfix" v-if="type == '0' && personStatus">
			<span class="fl pay-window-sub"></span>
			<div class="rightHalf">
				<span class="required fl ceiling">上限人数</span>
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="mealsNum" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>人</span>
				</section>
			</div>
		</div>
		<!-- 可配送区域 -->
		<div class="pay-window-box clearfix" v-if="type == '0'">
			<span class="fl pay-window-sub">可配送范围</span>
			<a href="javascript:void(0);" class="addclassify" v-on:click="isarea" v-show="area == false">添加关联区域</a>
			<a href="javascript:void(0);" class="related-area" v-on:click="isarea" v-show="area == true">关联区域</a>
			<span style="margin-left: 20px;" v-if="areaLength != '' && areaLength != 0 ">已选{{areaLength}}个区域</span>
		</div>
		<!-- 管理区域 -->
		<div class="pay-window-box clearfix" v-if="type == '0' && area">
			<span class="fl pay-window-sub"></span>
			<div class="regionalCorrelation fl">
				<div class="regionalbox">
					<a href="javascript:void(0)" class="check fl " style="margin-right: 40px;" @click="isCheckAll(true)">全选</a>
					<a href="javascript:void(0)" class="unselect fl" @click="isCheckAll()">全部取消</a>
				</div>
				<!-- 地址 -->
				<mulSelect :list.sync="areaList" :selects.sync="areaSelect" :styles="{backgroundColor:'rgb(240,240,240)','marginRight':'8px','marginBottom':'8px'}" :name='"areaName"' :key='"id"'></mulSelect>
			</div>
		</div>
		<!-- 高级设置 -->
		<div class="set-line">
			<div class="titles">高级设置</div>
			<div class="line"></div>
		</div>
		<!-- 必点商品 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">必点商品</span>
			<div class="rightHalf">
				<singleSelect class="fl" :index='result' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="evaluationList" :name="'name'" :key='"id"'></singleSelect>
				<div class="prompting fl" @click="isPublicNumber('2')">
					<div class="detDiv" v-if="isPublic['2']">
						<i class="detI triright"></i>
						<h3 class="detH3">
							仅提醒:用户下单时,提醒其必点商品,允许跳过.不选择必点商品同样允许下单.
							<p>提醒并必点:用户下单时,提醒其必点商品,，不允许跳过.不选择必点商品不允许下单.</p>
						</h3>
					</div>
				</div>
			</div>
		</div>
		<!-- 提醒内容 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">提醒内容</span>
			<div class="rightHalf">
				<input type="text" class="fl custom" placeholder="请输入提醒内容" v-model="mustGoodsRemind" maxlength="50" />
				<div class="fl handle-tips">
					<i></i> 限50字,必点商品名称用{goods}代替
				</div>
			</div>
		</div>
		<!-- 多人下单 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">多人下单</span>
			<div class="rightHalf">
				<onOff :key='1' :status="manypeopleStatus" @statusChange="ismanypeopleStatus"></onOff>
				<div class="pay-window-box clearfix" style="margin-top: 10px;" v-if="manypeopleStatus">
					<span class="fl pay-window-sub" style="width: 80px;text-align: left;">单用户必点</span>
					<div class="rightHalf" style="width: 300px;">
						<template v-for="(item,index) in singleUser">
							<span :key='index' :class="userStatus == index ? 'signa associated' : 'associated'" v-on:click="tabTypes(index,'2')">{{item.name}}</span>
						</template>
						<div class="prompting fl" @click="isPublicNumber('3')">
							<div class="detDiv" v-if="isPublic['3']">
								<i class="detI triright"></i>
								<h3 class="detH3">
							是:每增加一个购物车判断必点,否则不允许下单.
							<p>否:整单判断必点商品,一个订单下至少存在一个必点商品,否则不允许下单.</p>
						</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 商圈设置 -->
		<div class="set-line" v-if="type == '1'">
			<div class="titles">商圈设置</div>
			<div class="line"></div>
		</div>
		<!-- 商圈地图 -->
		<div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub"></span>
			<div class="rightHalf">
				<div class="disc" v-for="(item,index) in circleList" :key="index">
					<span class="circle fl" :class="{'effect':circleType == item.id}" @click="changeRadio(item,'2')"></span>
					<span class="text fl">{{item.name}}</span>
					<div class="prompting fl" @click="isShowtips(item)">
						<div class="detDiv" v-if="item.status">
							<i class="detI triright"></i>
							<h3 class="detH3">
								第三方配送向商家收取的配送费是按照店铺地址和顾客收货地址的步行距离计算,而非两点间的直线距离。
						</h3>
						</div>
					</div>
				</div>
				<!-- 地图 -->
				<div class="map clearfix">
					<!-- 地图左半部分 -->
					<div class="mapBox">
						<!-- 使用帮助 -->
						<div class="usehelp" v-if="showHelp">
							<img src="../../../res/images/discs.png">
							<p>拖拽图形边上的小圆点,调整配送范围</p>
							<a href="javascript:void(0)" @click="hidehelp">我知道了</a>
						</div>
						<!-- 显示地图专用 -->
						<div id="mapBoxs" class="innermap"></div>
						<!-- 配送范围 -->
						<div class="scope">
							<template v-if="circleType == 1">
								<div class="distribution">
									<div class="distribution_t"></div>
									<div class="distribution_b">
										<p>配送费:</p>
										<div class="shipping">
											<input type="text" v-model="STD.baseDistance" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('baseDistance',1)" />
											<span>公里内</span>
											<input type="text" v-model="STD.baseCost" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('baseCost',2)" />
											<span>元,</span>
										</div>
										<div class="shipping">
											<span>每增加</span>
											<input type="text" v-model="STD.moreDistance" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('moreDistance',1)" />
											<span>公里,</span>
										</div>
										<div class="shipping">
											<span>配送费增加</span>
											<input type="text" v-model="STD.moreCost" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('moreCost',2)" />
											<span>元。</span>
										</div>
									</div>
								</div>
								<!-- 阶梯配送 -->
								<div class="distribution" v-for="(item,index) in disareaList">
									<div class="distribution_t" :class="{'choose':ruleIndex == index}"></div>
									<div class="distribution_b" @click="getDetailoreditor(item,index)" :class="{'active':ruleIndex == index}">
										<div class="scopeOf">
											<span class="fl" :style="{'background':colorList[index].name}"></span>
											<span class="fl">配送范围{{index + 1}}</span>
										</div>
									</div>
								</div>
							</template>
							<div class="distribution" v-for="(item,index) in disareaList" v-if="circleType == 0">
								<div class="distribution_t" :class="{'choose':ruleIndex == index}"></div>
								<div class="distribution_b" @click="getDetailoreditor(item,index)" :class="{'active':ruleIndex == index}">
									<div class="scopeOf">
										<span class="fl" :style="{'background':item.color}"></span>
										<span class="fl">配送范围{{index + 1}}</span>
										<span class="fr" @click.stop="delBusinesscircle(item,index)">删除</span>
									</div>
									<div class="divisions_r clearfix">
										<span class="fl way">配送费</span>
										<section class="fl">
											<input type="text" class="cumulative" placeholder="请输入配送费" maxlength="4" v-model="item.promotersNum" />
											<span>元</span>
										</section>
									</div>
									<div class="addistance" @click.stop="addcircle" v-if="disareaList.length == index + 1">
										添加配送区域
									</div>
								</div>
							</div>
						</div>
						<!-- 划分方式 -->
						<div class="divisions" v-for="(it,i) in disareaList" v-if='ruleIndex == i'>
							<div class="divisions_l fl">
								<span class="fl way">划分方式:</span>
								<div class="disc fl" v-for="(item,index) in divisionsList" :key="index">
									<span class="circle fl" :class="{'effect':it.divisionsType == item.id}" @click="chooseType(it,item)"></span>
									<span class="text fl">{{item.name}}</span>
								</div>
							</div>
							<div class="divisions_r fr clearfix">
								<span class="fl way">配送范围:</span>
								<section v-if="it.divisionsType == 0">
									<input type="text" class="cumulative" placeholder="请输入公里数" maxlength="4" v-model="it.mileageNum" />
									<span>公里内</span>
								</section>
								<div v-if="it.divisionsType == 1" class="stribut">
									<img src='../../../res/icon/scopes.png' />
									<span>区域内</span>
								</div>
							</div>
						</div>
						<!-- 使用方式 -->
						<div class="help" @click="hidehelp">
							<img src="../../../res/icon/hellot.png">
							<span>使用帮助</span>
						</div>
					</div>
					<div id="colorBox" class="colorBox">
						<div class="coloronly" v-for="(item,index) in colorList" :key='index'>
							<span class="fl thebox" :style="{'background-color':item.name}"></span>
							<span class="fl horizontal"></span>
							<span class="fl solid"></span>
							<span class="fl text">{{item.name}}</span>
						</div>
						<div class="coloronly" v-for="(item,index) in colorList" :key="index + 'r'">
							<span class="fl thebox" :style="{'background-color':item.name,'opacity':'0.3'}"></span>
							<span class="fl horizontal"></span>
							<span class="fl solid"></span>
							<span class="fl text">{{item.name}}</span>
							<span class="fl">不透明度30%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 保存 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub"></span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="saveConfig">保存</a>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
import storage from 'src/verdor/storage';
export default {
	props: {
		opentheFunction: Boolean,
		upPayInfo: Object,
		isUpdata: String,
		modifyindex: [String, Number],
		checkoutMenu: Array,
		coordinateInfo: Object
	},
	data() {
		return {
			invoicingId: '', // 结账功能id
			payStatus: true, //是否开启支付方式
			personStatus: true, //用餐人数的状态
			mealStatus: false, //接单后自动出餐
			mealsNum: '', //用餐人数
			name: '', // 自定义的名称
			index: -1, //选中的index
			type: '0', // 关联功能 选中的状态 
			area: false, // 关联区域地址显示和隐藏
			needInfo: '', //弹窗的信息
			goodlist: [{ // 关联功能的数据展示列表
					'type': '0',
					'name': '自助'
				},
				{
					'type': '1',
					'name': '外卖'
				},
				{
					// 'type': '',
					'name': '自取'
				},
				{
					'type': '3',
					'name': '快递'
				}
			],
			configurationList: [{ //自助模式下的可填写内容配置
					'name': '姓名',
					'id': '1'
				},
				{
					'name': '电话',
					'id': '2'
				},
				{
					'name': '发票',
					'id': '3'
				},
				{
					'name': '地址',
					'id': '4'
				}
			],
			configurationSelect: [],
			takeoutList: [{ //外卖模式下的可填写内容配置
				'name': '发票',
				'id': '3'
			}],
			takeoutSelect: [],
			inviteList: [{ // 自取模式下的可填写内容配置
					'name': '姓名',
					'id': '1'
				},
				{
					'name': '电话',
					'id': '2'
				},
				{
					'name': '发票',
					'id': '3'
				}
			],
			inviteSelect: [],
			courierList: [{ //  快递下的可填写内容配置
				'name': '发票',
				'id': '3'
			}],
			courierSelect: [],
			areaList: [], //请求到的区域列表的数据
			areaSelect: [], //区域选中数组
			areaLength: '', // 区域选中数组的长度
			configure: [], // 支付规则
			content: '', // 规则内容 
			equipment: '', //备餐时间
			sendingfee: '', //起送费
			shippingfee: '0', // 配送费
			estimatedtime: '', // 预计到达时间 :[]
			// distances: [{
			// 	'defaultdis': '0',
			// 	'distance': '5',
			// 	'cost': '0'
			// }],
			evaluationList: [{
				id: 1,
				name: '仅提醒'
			}, {
				id: 2,
				name: '必点'
			}],
			result: 0, //必点商品选中的
			mustGoodsRemind: '', //t提醒内容
			manypeopleStatus: false, //多人下单的状态
			singleUser: [{
				id: 1,
				name: '是'
			}, {
				id: 2,
				name: '否'
			}],
			userStatus: 0, //单用户必点状态
			isPublic: {
				'1': false,
				'2': false,
				'3': false
			},
			payWays: [{
					id: 0,
					name: '与门店营业时间保持一致'
				},
				{
					id: 1,
					name: '单独设置营业时间'
				}
			], //类型
			payType: 0,
			useDate: {
				'index': 1,
				'week': [], //周
				'month': [], //月
				'show': false
			}, //使用时段 
			circleList: [{
					id: 0,
					name: '按区域固定配送费',
					status: false
				},
				{
					id: 1,
					name: '按距离阶梯配送费',
					status: false
				}
			],
			circleType: 0,
			colorList: [{
				name: '#D4232A'
			}, {
				name: '#FF7D00'
			}, {
				name: '#FFCE1E'
			}, {
				name: '#47ECFF'
			}, {
				name: '#47C5FF'
			}, {
				name: '#0086FF'
			}, {
				name: '#B6C61A'
			}, {
				name: '#006344'
			}, {
				name: '#DC4E76'
			}, {
				name: '#A946BE'
			}],
			pointLng: '', //地图经度116.404;39.915
			pointLat: '', //地图纬度
			divisionsList: [{
					id: 0,
					name: '半径'
				},
				{
					id: 1,
					name: '自定义'
				}
			],
			divisionsType: 0, //划分选中的
			promotersNum: '', //公里数
			map: '', //地图构造函数
			circleEditor: '',
			disareaList: [], //配送范围列表 圆圈的
			polygonList: [], //多边形配送范围
			STD: { //阶梯配送费
				baseDistance: 0.0,
				baseCost: 0.00,
				moreDistance: 0.0,
				moreCost: 0.00
			},
			ladderList: [], //阶梯配送的列表圆
			ladderpolyList: [], //阶梯配送列表多边形
			ruleIndex: 0, //选中的那一个
			// currentItem: '', //点击选中的商圈
			flag: true, //关联功能编辑的时候无法切换
			showHelp: false, //帮助提示
			fixed: '',
			ladder: ''
		};
	},
	watch: {
		// 'distances': {
		// 	handler() {
		// 		for (let i = 1; i < this.distances.length; i++) {
		// 			this.distances[i].defaultdis = this.distances[i - 1].distance;
		// 		}
		// 	},
		// 	deep: true
		// }
	},
	methods: {
		ispayStatus: function(res) { //开启关联功能
			this.payStatus = res;
		},
		ispersonStatus: function(res) { //开启用餐人数的状态
			this.personStatus = res;
		},
		ismanypeopleStatus: function(res) { //是否开启多人下单
			this.manypeopleStatus = res;
		},
		ismealStatus: function(res) { //接单后自动出餐
			this.mealStatus = res;
		},
		// 关联功能切换
		tabTypes: function(index, type) {
			if (type == '1') {
				this.type = index;
				if (this.type == 1) {
					//初始化地图
					setTimeout(() => {
						this.init();
						if (this.flag) {
							this.disareaList = [];
							this.addcircle();
						}
					}, 1000)
				}
			} else {
				this.userStatus = index;
			}
		},
		changeRadio: function(item, type) {
			//选择渠道
			let id = item.id;
			switch (type) {
				case '1':
					this.payType = id;
					break;
				case '2':
					this.circleType = id;
					this.init();
					if (this.circleType == 1) {
						//固定配送区域的数据
						this.fixed = this.restructuring();
						//console.log(JSON.stringify(fixed))
						this.disareaList = [];
						if (this.ladder == '') {
							this.addcircle();
						} else {
							this.disareaList = this.getBusinessCircle(this.ladder.data);
						}
					} else {
						//阶梯数据
						this.ladder = this.restructuring();
						this.disareaList = [];
						//console.log(JSON.stringify(fixed))
						this.disareaList = this.getBusinessCircle(this.fixed.data);
						//console.log(this.disareaList)
					}
					break;
					// case '3':
					// 	this.divisionsType = id;
					// 	if (this.divisionsType == 1) {
					// 		AMap.event.addListener(this.currentItem.circleEditor, 'end', function(res) {
					// 			res.target.hide();
					// 		});
					// 		this.currentItem.circleEditor.close();
					// 	}
					// 	break;
			}
		},
		chooseType: function(it, item) { //选择类型
			let id = item.id;
			it.divisionsType = id;
			if (it.divisionsType == 0) {
				AMap.event.addListener(it.circleEditor, 'end', function(res) {
					res.target.show();
				});
				AMap.event.addListener(it.polygonEditor, 'end', function(res) {
					res.target.hide();
				});
				it.circleEditor.close();
				it.circleEditor.open();
				it.polygonEditor.close();
			} else if (it.divisionsType == 1) {
				AMap.event.addListener(it.circleEditor, 'end', function(res) {
					res.target.hide();
				});
				AMap.event.addListener(it.polygonEditor, 'end', function(res) {
					res.target.show();
				});
				it.circleEditor.close();
				it.polygonEditor.close();
				it.polygonEditor.open();
			}
			this.map.setFitView();
		},
		// 是否显示地址的
		isarea: function() {
			this.area = !this.area;
		},
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		checkForm: function() { //验证表单
			let reg = /^([1-9]|(1[0-9])|(2[0]))$/; //匹配1-20
			// 判断自定义名称是否为空 如果为空的话就就显示对应的关联功能的名字
			if (!this.name) {
				// 当输入框的为''时
				this.name = this.goodlist[this.type].name;
			}
			//使用时段选择周
			if (this.payType == 1) {
				let arr = [];
				if (this.useDate.index == 1) {
					arr = this.useDate.week;
				} else if (this.useDate.index == 2) {
					arr = this.useDate.month;
				}
				if (arr.length == 0) {
					this.valiData('请添加对应的使用时段');
					return false;
				}
				for (let item of arr) {
					if (this.useDate.index == 1) {
						if (item.week.length == 0) {
							this.valiData('使用时段请选择日期(周)');
							return false;
						}
					} else if (this.useDate.index == 2) {
						if (item.month.length == 0) {
							this.valiData('使用时段请选择日期(月)');
							return false;
						}
					}
					//判断不能为空
					if (item.startslotH == '' || item.startslotM == '' || item.endslotH == '' || item.endslotM == '') {
						this.valiData('使用时段的时间不能为空');
						return false;
					}
					//判断格式
					if (item.startslotH > 23 || item.startslotM > 59 || item.endslotH > 23 || item.endslotM > 59) {
						this.valiData('请输入正确的使用时间');
						return false;
					}
					if (!item.isNextDay) {
						if (item.startslotH > item.endslotH || (item.startslotH == item.endslotH && item.startslotM > item.endslotM)) {
							this.valiData('使用时段里，未点击隔天,结束时间不能小于开始时间');
							return false;
						}
					}
				}
			}
			// 当在关联功能为自助时候
			if (this.type == '0') {
				if (this.equipment == '') {
					// 当输入框的为''时
					this.valiData('请输入备餐时间');
					return false;
				}
				if (this.equipment > 60) {
					// 当输入框的为''时
					this.valiData('备餐时间不得超过60分钟');
					return false;
				}
				if (this.personStatus && utils.trim(this.mealsNum) == '') {
					this.$store.commit('setWin', {
						content: '用餐人数不能为空',
						time: 1000
					});
					return false;
				}
				if (this.personStatus && !reg.test(this.mealsNum)) {
					this.valiData('用餐人数为1-20的正整数');
					return false;
				}
			}
			if (this.type == '1') {
				// 起送费的判断
				if (this.sendingfee == '') {
					// 当输入框的为''时
					this.valiData('请输入起送费');
					return false;
				}
				// 自动出餐
				if (this.mealStatus && this.equipment == '') {
					this.valiData('请填写接单自动出餐');
					return false;
				}
				if (this.estimatedtime == '') {
					// 当输入框的为''时
					this.valiData('请输入预计到达时间');
					return false;
				}
				//对商圈的判断
				for (let item of this.disareaList) {
					if (item.promotersNum == '') {
						this.valiData('请填写配送费');
						return false;
					}
				}
				if (this.circleType == 1) {
					if (this.STD.baseDistance == '') {
						this.valiData('请填写配送范围公里数');
						return false;
					}
					if (this.STD.baseCost == '') {
						this.valiData('请填写配送费');
						return false;
					}
					if (this.STD.moreDistance == '') {
						this.valiData('请填写每增加公里数');
						return false;
					}
					if (this.STD.moreCost == '') {
						this.valiData('请填写配送费增加');
						return false;
					}
					if (this.STD.moreDistance == 0) {
						this.valiData('每增加公里数须大于0');
						return false;
					}
				}
			}
			if (this.type == '3') {
				// 配送费的判断
				if (this.shippingfee == '') {
					// 当输入框的为''时
					this.valiData('请输入快递费');
					return false;
				}
			}
			return true;
		},
		saveConfig: function() { //保存方法
			if (!this.checkForm()) return;
			// 结账功能的修改和保存
			// 首先通过传递的type值来判断执行修改还是保存 1 表示修改
			this.setItem();
			this.$emit('winEvent', false);
			// if (this.isUpdata == '1') {
			// 	// 修改
			// 	let bool = this.itemInArr(this.needInfo, this.wininfo.updatePay, 'id');
			// 	if (!bool) {
			// 		if (this.needInfo.id) {
			// 			this.wininfo.updatePay.push(this.needInfo);
			// 		} else {
			// 			this.wininfo.addPay.splice(this.getIndex(this.item), 1, this.needInfo);
			// 		}
			// 	} else {
			// 		this.wininfo.updatePay.splice(bool - 1, 1, this.needInfo);
			// 	}
			// 	this.wininfo.pay.splice(this.i, 1, this.needInfo);
			// } else {
			// 	// 新增
			// 	this.wininfo.addPay.push(this.needInfo);
			// 	this.wininfo.pay.push(this.needInfo);
			// }			

		},
		//获取点击对应的index
		// 点击对应的功能  获取传递进来的参数
		getItemInfo: function() {
			let item = this.upPayInfo;
			// 获取传递数组参数
			if (item.id) {
				this.invoicingId = item.id; //结账功能id
			}
			this.name = item.name; // 获取对应的名称
			this.payStatus = Boolean(Number(item.status)); // 获取对应的是否开启支付状态
			this.personStatus = Boolean(Number(item.confineStatus)); //是否开启用餐人数的状态
			this.mealsNum = item.personConfine; //用餐人数
			this.type = item.type - 1; // 对应的功能类型
			if (item.customContent != '') {
				this.configure = item.customContent.split('!#!'); //获取支付规则
			}
			// if (item.scopeDelivery != '') {
			// 	this.distances = [];
			// 	for (let it of item.scopeDelivery) {
			// 		this.distances.push({
			// 			'defaultdis': '0',
			// 			'distance': it.distance,
			// 			'cost': it.cost
			// 		});
			// 	}
			// 	for (let i = 1; i < this.distances.length; i++) {
			// 		this.distances[i].defaultdis = this.distances[i - 1].distance;
			// 	}
			// }
			//this.mealStatus = Boolean(Number(item.autoOutMealStatus)); //自动出餐
			this.sendingfee = item.minFee; // 起送费
			this.shippingfee = item.moveFee; //  配送费
			this.estimatedtime = item.preArriveTime; // 预计送达时间
			// 可填写内容配置回填
			if (item.fillContent != undefined && item.fillContent != '') {
				let fillContent = String(item.fillContent);
				for (let i = 0; i < fillContent.length; i++) {
					switch (Number(item.type)) {
						case 1:
							this.configurationSelect.push(fillContent[i]);
							break;
						case 2:
							this.takeoutSelect.push(fillContent[i]);
							break;
						case 4:
							this.courierSelect.push(fillContent[i]);
							break;
					}
				}
			}
			// 判断等待区域配置为否为空 不为空赋值
			if (item.type == 1) {
				if (item.areaIds && item.areaIds != '') {
					let areaIds = item.areaIds.split(',');
					this.areaSelect = areaIds;
					this.areaLength = utils.isEmptyObject(this.areaSelect) == true ? '' : this.areaSelect.length;
				}
			}
			this.result = item.mustGoodsStatus - 1; //必点商品
			this.mustGoodsRemind = item.mustGoodsRemind; //提醒内容
			this.manypeopleStatus = Boolean(Number(item.multiOrderStatus)); //多人下单开关
			if (this.manypeopleStatus) { //单人必点
				if (item.multiOrderStatus == 2) {
					this.userStatus = 0;
				} else if (item.multiOrderStatus == 1) {
					this.userStatus = 1;
				}
			}
			//当外卖的时候 给使用时间段赋值
			//0 与门店营业时间保持一致
			//1 单独设置外卖时间
			this.payType = item.openTimeStatus;
			if (item.openTime.type == 'week') {
				this.useDate.index = 1;
				this.useDate.week = this.changeArrToNeed(item.openTime.list, 'w');
			} else if (item.openTime.type == 'month') {
				this.useDate.index = 2;
				this.useDate.month = this.changeArrToNeed(item.openTime.list, 'm');
			}
			//判断自动出餐
			if (this.type == 1) {
				setTimeout(() => {
					this.init();
					if (item.scopeDelivery.type && item.scopeDelivery.data != '') {
						this.disareaList = this.getBusinessCircle(item.scopeDelivery.data);
						//固定配送费 阶梯配送费
						this.circleType = item.scopeDelivery.type - 1;
					} else {
						this.disareaList = [];
						this.addcircle();
					}
				}, 500)
				// setTimeout(() => {
				// 	this.disareaList = this.getBusinessCircle(item.scopeDelivery.data);
				// }, 2000)
				if (item.readyMealTime != '') {
					this.mealStatus = true;
					this.equipment = item.readyMealTime; // 备餐时间
				}
			} else {
				this.equipment = item.readyMealTime; // 备餐时间
			}
		},
		// 保存修改方法
		setItem: function() {
			// 修改信息
			let item = {};
			// if (this.isUpdata) {
			// 	item.status = Number(this.payStatus); //支付开启或关闭
			// }
			if (this.invoicingId != '') item.id = this.invoicingId; //功能id
			//单个结账功能新增的时候默认开启 修改时可以关闭
			item.status = Number(this.payStatus); //支付开启或关闭
			item.name = this.name; // 功能名称
			item.type = Number(this.type) + 1; //功能类型
			item.confineStatus = Number(this.personStatus); //用餐人数的状态
			if (this.personStatus) { //用餐人数关闭的状态下 用餐人数默认为1
				item.personConfine = this.mealsNum;
			} else {
				item.personConfine = 1;
			}
			item.customContent = this.configure.join('!#!'); //支付规则
			if (!utils.isEmptyObject(this.configurationSelect) && item.type == 1) { //可填写内容
				item.fillContent = Number(String(this.configurationSelect).replace(/,/g, ''));
			}
			if (!utils.isEmptyObject(this.inviteSelect) && item.type == 3) { //可填写内容
				item.fillContent = Number(String(this.inviteSelect).replace(/,/g, ''));
			}
			if (!utils.isEmptyObject(this.takeoutSelect) && item.type == 2) { //可填写内容
				item.fillContent = Number(String(this.takeoutSelect).replace(/,/g, ''));
			}
			if (!utils.isEmptyObject(this.courierSelect) && item.type == 4) { //可填写内容
				item.fillContent = Number(String(this.courierSelect).replace(/,/g, ''));
			}

			if (item.fillContent == '' || item.fillContent == undefined) item.fillContent = 0;

			if (item.type == 1) {
				this.getArea(); // 获取区域数据的列表
				let arrList = []; // 定义一个空数组

				this.areaList.filter((item, i, arr) => {
					this.areaSelect.filter(function(item2, j, arr2) {
						if (arr2[j] == arr[i].id) {
							arrList.push(arr2[j]);
						}
					});
				});
				// 获取选中的数组
				this.areaSelect = utils.unique(utils.deepCopy(arrList));
				if (!utils.isEmptyObject(this.areaSelect)) { //可配送区域的id
					item.areaIds = this.areaSelect.join(',');
				}
				// 获取选中数组的长度
				this.areaLength = utils.isEmptyObject(this.areaSelect) == true ? '' : this.areaSelect.length;
				// 将选中的数组保存下来
				// square.payList = this.areaSelect;
			}
			//item.autoOutMealStatus = Number(this.mealStatus); //接单后自动出餐
			if (this.type == 1) {
				if (this.mealStatus) {
					item.readyMealTime = this.equipment; // 备餐时间
				} else {
					item.readyMealTime = '';
				}
			} else {
				item.readyMealTime = this.equipment; // 备餐时间
			}
			item.minFee = this.sendingfee; // 起送费
			item.moveFee = this.shippingfee; //配送费
			item.preArriveTime = this.estimatedtime; //预计送达时间
			item.openTimeStatus = this.payType; //营业时间
			let useTime = {};
			if (this.useDate.index == 1) {
				useTime.type = 'week';
				useTime.list = this.changeArr(this.useDate.week, 'w');
			}
			if (this.useDate.index == 2) {
				useTime.type = 'month';
				useTime.list = this.changeArr(this.useDate.month, 'm');
			}
			//useTime = JSON.stringify(useTime);
			// item.openTime = this.payType == 1 ? useTime : '';
			// 配送范围
			// item.scopeDelivery = [];
			// for (let it of this.distances) {
			// 	item.scopeDelivery.push({
			// 		'distance': it.distance,
			// 		'cost': it.cost
			// 	});
			// }
			item.mustGoodsStatus = this.result + 1; //必点商品
			item.mustGoodsRemind = this.mustGoodsRemind; //提醒内容
			//多人下单开关
			//是 传2
			//否 传1
			//关掉传0
			if (this.manypeopleStatus) {
				if (this.userStatus == 0) {
					item.multiOrderStatus = 2;
				} else if (this.userStatus == 1) {
					item.multiOrderStatus = 1;
				}
			} else {
				item.multiOrderStatus = 0;
			}
			//item.multiOrderStatus = this.manypeopleStatus ? this.userStatus + 1 : 0; //多人下单开关
			if (this.isUpdata == '1') {
				this.checkoutMenu[this.modifyindex] = item;
			} else {
				this.checkoutMenu.push(item);
			}
			if (this.type == '1') {
				//商圈数据
				item.scopeDelivery = this.restructuring();
			} else {
				item.scopeDelivery = '';
			}
		},
		// 获取关联区域
		async getArea() {
			let data = await http.getArea({});
			this.areaList = data;
			// 请求关联区域的接口
		},
		// 关联区域的全选与反选
		isCheckAll: function(isCheck) {
			if (isCheck) {
				this.areaSelect = [];
				this.areaList.filter((itme) => {
					// 将地址的id全部放到区域选择的数组当中去
					this.areaSelect.push(itme.id);
				});
			} else {
				// 否则的话清空数组
				this.areaSelect = [];
			}
		},
		// 保存规则配置
		saveConcont: function() {
			// 如果为空
			if (this.content.trim() == '') {
				this.$store.commit('setWin', {
					content: '请填写规则内容！',
					time: 1000
				});
				return false;
			}
			// 规则最多定义五条数据
			if (this.configure.length == 5) {
				this.$store.commit('setWin', {
					content: '最多添加五条！',
					time: 1000
				});
				return false;
			}
			this.configure.push(this.content);
			// 每次输入完规则之后将输入框清空
			this.content = '';
			// 保存
			// square.rulesList = this.configure;
		},
		// 删除规则配置
		delConcont: function(i) {
			// 将对应的下标的规则从数组里面删除掉
			this.configure.splice(i, 1);
			this.content = '';
			// 将输入的规则保存下来
			// square.rulesList = this.configure;
		},
		// adddistance: function() {
		// 	for (let item of this.distances) {
		// 		if (Number(item.distance) <= Number(item.defaultdis)) {
		// 			this.$store.commit('setWin', {
		// 				content: '请填写结束距离,并且结束距离应大于起始距离'
		// 			});
		// 			return false;
		// 		}
		// 		if (item.cost == '' || item.distance == '') {
		// 			this.$store.commit('setWin', {
		// 				content: '完善配送范围填写，或删除配送区域'
		// 			});
		// 			return false;
		// 		}
		// 		if (Number(item.cost) > 999 || Number(item.cost) < 0) {
		// 			this.$store.commit('setWin', {
		// 				content: '配送费区间0~999'
		// 			});
		// 			return false;
		// 		}
		// 	}
		// 	if (this.distances.length == 5) {
		// 		this.$store.commit('setWin', {
		// 			content: '最多添加五条！',
		// 			time: 1000
		// 		});
		// 		return false;
		// 	}
		// 	this.distances.push({
		// 		'defaultdis': '',
		// 		'distance': '',
		// 		'cost': ''
		// 	});
		// },
		// deldistance: function(i) {
		// 	if (i == 0) {
		// 		this.$store.commit('setWin', {
		// 			content: '默认项无法删除',
		// 			time: 1000
		// 		});
		// 		return false;
		// 	}
		// 	// 将对应的下标的规则从数组里面删除掉
		// 	this.distances.splice(i, 1);
		// },
		formatValue: function(index) {
			// this.distances[index].cost = utils.toFloatStr(this.distances[index].cost, 2);
		},
		haveIndex(i) { //评价模式
			this.result = i;
		},
		returnPay: function() { //返回按钮
			this.$emit('winEvent', false);
		},
		keepValue: function(value) {
			this[value] = utils.toFloatStr(this[value], 2);
		},
		isPublicNumber: function(type) { //提示的状态
			for (let key in this.isPublic) {
				if (key != type) {
					this.isPublic[key] = false;
				}
			}
			this.isPublic[type] = !this.isPublic[type];
		},
		getResult: function(val) { //使用时间段
			this.useDate = val;
			//console.log(JSON.stringify(this.useDate))
			//console.log(JSON.stringify(val))
		},
		isShowtips: function(item) {
			for (let int of this.circleList) {
				if (item.id != int.id) {
					int.status = false;
				}
			}
			item.status = !item.status;
		},
		init: function() { //初始化
			let editorTool, map = new AMap.Map('mapBoxs', {
				resizeEnable: true,
				zoom: 13,
				center: [this.pointLng, this.pointLat]
			});
			this.map = map;
			//非编辑状态下
			// if (this.flag) {
			// 	this.disareaList = [];
			// 	this.addcircle();
			// }
			let marker = new AMap.Marker({
				map: this.map,
				position: [this.pointLng, this.pointLat],
				zIndex: 9999
			})
		},
		addcircle: function() { //添加圆形商圈
			if (this.disareaList.length >= 5) {
				this.$store.commit('setWin', {
					content: '配送区域最多添加5条!'
				});
				return false;
			}
			for (let item of this.disareaList) {
				item.circleEditor.close();
				item.polygonEditor.close();
			}
			let circle = new AMap.Circle({
				center: [this.pointLng, this.pointLat], // 圆心位置
				radius: 1000, //半径
				strokeColor: this.colorList[this.disareaList.length].name, //线颜色
				strokeOpacity: 1, //线透明度
				strokeWeight: 3, //线粗细度
				fillColor: this.colorList[this.disareaList.length].name, //填充颜色
				fillOpacity: 0.35 //填充透明度
			});
			let arr = [ //构建多边形经纬度坐标数组
				[this.pointLng - 0.001, this.pointLat + 0.001],
				[this.pointLng + 0.001, this.pointLat + 0.001],
				[this.pointLng + 0.001, this.pointLat - 0.001],
				[this.pointLng - 0.001, this.pointLat - 0.001]
			]
			let polygon = new AMap.Polygon({
				map: this.map,
				path: arr,
				strokeColor: this.colorList[this.disareaList.length].name,
				strokeOpacity: 1,
				strokeWeight: 3,
				fillColor: this.colorList[this.disareaList.length].name,
				fillOpacity: 0.35
			})
			let obj = {
				divisionsType: 0,
				color: this.colorList[this.disareaList.length].name,
				editorStatus: true,
				circle: circle,
				polygon: polygon,
				promotersNum: '', //配送费
				mileageNum: 1, //公里数
				circleEditor: new AMap.CircleEditor(this.map, circle), //编辑的构造函数
				polygonEditor: new AMap.PolyEditor(this.map, polygon), //编辑的构造函数
				center: "", //圆形坐标
				radius: '', //半径
				path: [] // 多点路径
			}
			obj.circleEditor.open();
			obj.polygonEditor.open();
			//监听多边形的点的坐标
			AMap.event.addListener(obj.circleEditor, 'end', function(res) {
				//console.log(res.target.getRadius()) //获取半径
				//console.log(JSON.stringify(res.target.getCenter()) ) //获取圆心点
				obj.radius = res.target.getRadius();
				let coordinates = res.target.getCenter();
				let info = {
					lng: coordinates.lng,
					lat: coordinates.lat
				}
				obj.center = info;
			});
			AMap.event.addListener(obj.circleEditor, 'adjust', function(res) {
				//console.log(res.target.getRadius()) //获取半径
				//console.log(JSON.stringify(res.target.getCenter()) ) //获取圆心点
				obj.mileageNum = res.target.getRadius() / 1000;
			});
			//监听多边形的点的坐标
			AMap.event.addListener(obj.polygonEditor, 'end', function(res) {
				//console.log(JSON.stringify(res.target.getPath()))
				let pathdisc = res.target.getPath();
				let arr = [];
				for (let item of pathdisc) {
					let pathobj = {
						lng: item.lng,
						lat: item.lat
					}
					arr.push(pathobj);
				}
				obj.path = arr;
				res.target.hide();
			});
			obj.polygonEditor.close();
			this.disareaList.push(obj);
			this.ruleIndex = this.disareaList.length - 1;
			circle.setMap(this.map);
			this.map.setFitView();
		},
		delBusinesscircle: function(item, index) { //删除商圈
			if (this.disareaList.length <= 1) {
				this.$store.commit('setWin', {
					content: '最少保留一条配送范围!'
				});
				return false;
			}
			item.circleEditor.close(); //先关闭编辑
			item.polygonEditor.close();
			item.polygon.hide();
			item.circle.hide();
			this.disareaList.splice(index, 1);
		},
		// Editor: function(item) { //编辑和关闭
		// 	for (let int of this.disareaList) {
		// 		if (int.color != item.color) {
		// 			int.editorStatus = false;
		// 			int.circleEditor.close();
		// 		}
		// 	}
		// 	item.editorStatus = !item.editorStatus;
		// 	if (item.editorStatus) {
		// 		item.circleEditor.open();
		// 	} else {
		// 		item.circleEditor.close();
		// 	}
		// },
		getDetailoreditor: function(item, index) { //点击并修改
			this.ruleIndex = index;
			for (let it of this.disareaList) { //先把所有的编辑关掉
				it.circleEditor.close();
				it.polygonEditor.close();
			}
			if (item.divisionsType == 0) {
				item.circleEditor.open(); //对应的打开
			} else if (item.divisionsType == 1) {
				item.polygonEditor.open();
			}
		},
		// addpolygon: function() { //新增多边形的商圈
		// 	if (this.polygonList.length >= 5) {
		// 		this.$store.commit('setWin', {
		// 			content: '配送区域最多添加5条!'
		// 		});
		// 		return false;
		// 	}
		// 	let arr = [ //构建多边形经纬度坐标数组
		// 		[this.pointLng - 0.001, this.pointLat + 0.001],
		// 		[this.pointLng + 0.001, this.pointLat + 0.001],
		// 		[this.pointLng + 0.001, this.pointLat - 0.001],
		// 		[this.pointLng - 0.001, this.pointLat - 0.001]
		// 	]
		// 	let polygon = new AMap.Polygon({
		// 		map: this.map,
		// 		path: arr,
		// 		strokeColor: this.colorList[this.polygonList.length].name,
		// 		strokeOpacity: 1,
		// 		strokeWeight: 3,
		// 		fillColor: this.colorList[this.polygonList.length].name,
		// 		fillOpacity: 0.35
		// 	})
		// 	let obj = {
		// 		color: this.colorList[this.polygonList.length].name,
		// 		editorStatus: true,
		// 		polygon: polygon,
		// 		promotersNum: '', //配送费
		// 		polygonEditor: new AMap.PolyEditor(this.map, polygon), //编辑的构造函数
		// 		path: [] // 多点路径
		// 	}
		// 	obj.polygonEditor.open();
		// 	//监听多边形的点的坐标
		// 	AMap.event.addListener(obj.polygonEditor, 'end', function(res) {
		// 		//console.log(JSON.stringify(res.target.getPath()))
		// 		let pathdisc = res.target.getPath();
		// 		let arr = [];
		// 		for (let item of pathdisc) {
		// 			let pathobj = {
		// 				lng: item.lng,
		// 				lat: item.lat
		// 			}
		// 			arr.push(pathobj);
		// 		}
		// 		obj.path = arr;
		// 	});
		// 	if (this.circleType == 0 && this.divisionsType == 1) {
		// 		this.polygonList.push(obj);
		// 	} else if (this.circleType == 1 && this.divisionsType == 1) {
		// 		this.ladderpolyList.push(obj);
		// 	}
		// 	this.map.setFitView();
		// },
		// delpolygon: function(item, index) { //删除多边形商圈
		// 	if (this.polygonList.length <= 1) {
		// 		this.$store.commit('setWin', {
		// 			content: '最少保留一条配送范围!'
		// 		});
		// 		return false;
		// 	}
		// 	item.polygonEditor.close(); //先关闭编辑
		// 	item.polygon.hide();
		// 	this.polygonList.splice(index, 1);
		// },
		// Edipolygon: function(item) {
		// 	item.editorStatus = !item.editorStatus;
		// 	if (item.editorStatus) {
		// 		item.polygonEditor.open();
		// 	} else {
		// 		item.polygonEditor.close();
		// 		//console.log(JSON.stringify(item.path));
		// 	}
		// },
		restructuring: function() { //重组商圈数据
			let scopeDelivery = {
				type: this.circleType + 1, // 1 按范围  2 按距离阶梯
				data: []
			}
			let arr = [];
			for (let item of this.disareaList) {
				item.circleEditor.close();
				item.polygonEditor.close();
				let obj = {
					type: item.divisionsType == 0 ? 'circle' : 'polygon',
					cost: item.promotersNum, //配送费
				}
				if (item.divisionsType == 0) { //圆圈
					obj.center = item.center;
					obj.radius = item.radius;
				} else if (item.divisionsType == 1) {
					obj.path = item.path;
				}
				if (this.circleType == 1) {
					obj.baseDistance = this.STD.baseDistance;
					obj.baseCost = this.STD.baseCost;
					obj.moreDistance = this.STD.moreDistance;
					obj.moreCost = this.STD.moreCost;
				}
				arr.push(obj);
			}
			scopeDelivery.data = arr;
			return scopeDelivery;
		},
		formatValue: function(item, type) { //格式化
			this.STD[item] = utils.toFloatStr(this.STD[item], type);
		},
		getBusinessCircle: function(arr) { //获取商圈配置
			//console.log(JSON.stringify(arr))
			let business = [];
			let index = -1;
			let divisionsType = 0;
			let circle;
			let polygon;
			for (let item of arr) {
				index++;
				if (item.type == 'circle') { //如果是圆 处理
					divisionsType = 0;
					circle = new AMap.Circle({
						center: [item.center.lng, item.center.lat], // 圆心位置
						radius: item.radius, //半径
						strokeColor: this.colorList[index].name, //线颜色
						strokeOpacity: 1, //线透明度
						strokeWeight: 3, //线粗细度
						fillColor: this.colorList[index].name, //填充颜色
						fillOpacity: 0.35 //填充透明度
					});
					let arr = [ //构建多边形经纬度坐标数组
						[this.pointLng - 0.001, this.pointLat + 0.001],
						[this.pointLng + 0.001, this.pointLat + 0.001],
						[this.pointLng + 0.001, this.pointLat - 0.001],
						[this.pointLng - 0.001, this.pointLat - 0.001]
					]
					polygon = new AMap.Polygon({
						map: this.map,
						path: arr,
						strokeColor: this.colorList[index].name,
						strokeOpacity: 1,
						strokeWeight: 3,
						fillColor: this.colorList[index].name,
						fillOpacity: 0.35
					})
					circle.setMap(this.map);
				} else if (item.type == 'polygon') {
					divisionsType = 1;
					circle = new AMap.Circle({
						center: [this.pointLng, this.pointLat], // 圆心位置
						radius: 1000, //半径
						strokeColor: this.colorList[index].name, //线颜色
						strokeOpacity: 1, //线透明度
						strokeWeight: 3, //线粗细度
						fillColor: this.colorList[index].name, //填充颜色
						fillOpacity: 0.35 //填充透明度
					});
					let arr = [] //构建多边形经纬度坐标数组]
					for (let int of item.path) {
						let path = [
							int.lng, int.lat
						];
						arr.push(path);
					}
					polygon = new AMap.Polygon({
						map: this.map,
						path: arr,
						strokeColor: this.colorList[index].name,
						strokeOpacity: 1,
						strokeWeight: 3,
						fillColor: this.colorList[index].name,
						fillOpacity: 0.35
					})
					circle.setMap(this.map)
				}
				///og('111111')
				let obj = {
					divisionsType: divisionsType,
					color: this.colorList[index].name,
					editorStatus: true,
					circle: circle,
					polygon: polygon,
					promotersNum: item.cost, //配送费
					mileageNum: 1, //公里数
					circleEditor: new AMap.CircleEditor(this.map, circle), //编辑的构造函数
					polygonEditor: new AMap.PolyEditor(this.map, polygon), //编辑的构造函数
					center: "", //圆形坐标
					radius: '', //半径
					path: [] // 多点路径
				}
				obj.circleEditor.open();
				obj.polygonEditor.open();
				//监听多边形的点的坐标
				AMap.event.addListener(obj.circleEditor, 'end', function(res) {
					//获取圆心点
					obj.radius = res.target.getRadius();
					let coordinates = res.target.getCenter();
					let info = {
						lng: coordinates.lng,
						lat: coordinates.lat
					}
					obj.center = info;
					obj.mileageNum = res.target.getRadius() / 1000;
					if (obj.divisionsType == 1) {
						res.target.hide();
					}
				});
				AMap.event.addListener(obj.circleEditor, 'adjust', function(res) {
					//获取圆心点
					obj.mileageNum = res.target.getRadius() / 1000;
				});
				//监听多边形的点的坐标
				AMap.event.addListener(obj.polygonEditor, 'end', function(res) {
					let pathdisc = res.target.getPath();
					let arr = [];
					for (let item of pathdisc) {
						let pathobj = {
							lng: item.lng,
							lat: item.lat
						}
						arr.push(pathobj);
					}
					obj.path = arr;
					if (obj.divisionsType == 0) {
						res.target.hide();
					}
				});
				obj.circleEditor.close();
				obj.polygonEditor.close();
				business.push(obj);
				//console.log(business)
				this.map.setFitView();
			}
			if (business[this.ruleIndex].divisionsType == 0) {
				business[this.ruleIndex].circleEditor.open();
			} else {
				business[this.ruleIndex].polygonEditor.open();
			}
			return business;
		},
		changeArr(arr, type) {
			let nArr = [];
			for (let i = 0; i < arr.length; i++) {
				let o = {};
				if (type == 'w') {
					o.week = arr[i].week.sort(function(a, b) {
						return a - b;
					});

				} else if (type == 'm') {
					o.month = arr[i].month.sort(function(a, b) {
						return a - b;
					});
				}
				o.isNextDay = arr[i].isNextDay;
				let startslot = (arr[i].startslotH + ':' + arr[i].startslotM);
				let endslot = (arr[i].endslotH + ':' + arr[i].endslotM);
				o.startslot = startslot;
				o.endslot = endslot;
				nArr.push(o);
			}
			return nArr;
		},
		changeArrToNeed(arr, type) {
			let na = [];
			for (let i = 0; i < arr.length; i++) {
				let obj = {};
				obj.startslotH = arr[i].startslot.split(':')[0];
				obj.startslotM = arr[i].startslot.split(':')[1];
				obj.endslotH = arr[i].endslot.split(':')[0];
				obj.endslotM = arr[i].endslot.split(':')[1];
				obj.isNextDay = arr[i].isNextDay;
				if (type == 'w') {
					obj.week = arr[i].week;
				} else if (type == 'm') {
					obj.month = arr[i].month;
				}
				na.push(obj);
			}
			return na;
		},
		hidehelp: function() {
			this.showHelp = !this.showHelp;
		},
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
		mulSelect: () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		'singleSelect': () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		onOff: () =>
			import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		'use-time': () =>
			import ( /* webpackChunkName:'use_time' */ './use_time'),
	},
	async mounted() {
		//获取店铺的经纬度
		this.pointLng = this.coordinateInfo.pointLng;
		this.pointLat = this.coordinateInfo.pointLat;
		await global.getBaiduMapApi();
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-white'],
			fn: () => {
				this.returnPay();
			}
		}]);
		this.getArea();
		if (this.isUpdata == '1') { //如果修改获取信息
			//编辑状态 关联功能无法切换
			this.flag = false;
			this.getItemInfo();
		}
	}
};
</script>
<style type="text/css" scoped>
input {
	outline: none;
	text-indent: 20px;
	background: #fff;
}

.bg {
	border: 1px solid #999;
	width: 68px;
	float: left;
	height: 36px;
	border-left: none;
	background: url(../../../res/icon/iconright.png) #fff center no-repeat;
}

#pay-window .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#pay-window .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#pay-window .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#pay-window .pay-window-box {
	min-height: 40px;
	width: 100%;
	margin-bottom: 25px;
	line-height: 40px;
}

#pay-window .pay-window-box .custom {
	width: 215px;
	height: 36px;
	padding: 0;
	border-color: #999;
}

#pay-window .pay-window-box .associated,
#pay-window .pay-window-box .unassociated {
	float: left;
	display: block;
	width: 98px;
	height: 36px;
	border: 1px solid #999;
	margin-right: 15px;
	text-align: center;
	line-height: 38px;
	cursor: pointer;
}

#pay-window .pay-window-box .associated {
	background: #fff;
}

#pay-window .pay-window-box .unassociated {
	background: #777;
}

#pay-window .pay-window-box .scopes {
	height: 40px;
	margin-bottom: 22px;
}

#pay-window .pay-window-box .scopes .seat {
	display: block;
	height: 40px;
	width: 80px;
	text-align: center;
	line-height: 40px;
}

#pay-window .pay-window-box .payment-rules {
	width: auto;
	height: auto;
}

#pay-window .pay-window-box .payment-rules .define {
	height: 40px;
	padding: 0;
	position: relative;
	cursor: pointer;
	margin-bottom: 25px;
}

#pay-window .pay-window-box .payment-rules .define .define-inp {
	width: 320px;
	height: 36px;
	padding: 0;
	border-color: #999;
}

#pay-window .pay-window-box .rightHalf {
	/*width: 600px;*/
	height: auto;
	float: left;
}

#pay-window .pay-window-box .rightHalf .disc {
	height: 40px;
	line-height: 40px;
	color: #666;
}

#pay-window .pay-window-box .rightHalf .business {
	color: #666;
}

#pay-window .pay-window-box .rightHalf .disc {
	display: flex;
	align-items: center;
}

#pay-window .pay-window-box .rightHalf .disc .circle {
	display: block;
	width: 15px;
	height: 15px;
	border: 1px solid #D2D2D2;
	border-radius: 50%;
	margin-right: 9px;
}

#pay-window .pay-window-box .ceiling {
	display: block;
	height: auto;
	min-height: 40px;
	line-height: 40px;
	color: #666666;
	margin-right: 25px;
}

#pay-window .pay-window-box .rightHalf section {
	width: 210px;
	height: 38px;
	border: 1px solid #CECDCD;
	border-color: rgb(153, 153, 153);
	/* float: left; */
}

#pay-window .pay-window-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: none;
	/* border: 1px solid #eaeaea;
	border-color: rgb(153, 153, 153); */
	float: left;
	outline: none;
	text-indent: 17px;
}

#pay-window .pay-window-box .rightHalf section span {
	display: block;
	float: left;
	width: 58px;
	height: 37px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
	border-color: rgb(153, 153, 153);
}

#pay-window .pay-window-box .scopes .delet {
	display: block;
	width: 16px;
	height: 19px;
	background: url(../../../../src/res/icon/icondelete.png) no-repeat center;
	margin: 10px 25px 10px 0;
}

#pay-window .pay-window-box .add {
	display: block;
	width: 19px;
	height: 19px;
	margin: 10px 0;
}

#pay-window .pay-window-box .add img {
	width: 100%;
	height: 100%;
	float: left;
}

#pay-window .pay-window-box .scopes .scopes_l {
	width: 100px;
	height: 40px;
	border: 1px solid #d2d2d2;
	background: #f1f1f1;
}

#pay-window .pay-window-box .scopes .scopes_r {
	width: 100px;
	height: 40px;
	border: 1px solid #d2d2d2;
	background: #fff;
}

#pay-window .pay-window-box .scopes .scopes_r input {
	width: 49px;
	height: 38px;
	float: left;
	border: none;
	outline: none;
}

#pay-window .pay-window-box .scopes .lines {
	margin: 19px 14px;
	width: 18px;
	height: 1px;
	background: #cecece;
	float: left;
}

#pay-window .pay-window-box .scopes .scopes_l span,
#pay-window .pay-window-box .scopes .scopes_r span {
	display: block;
	float: left;
	width: 49px;
	height: 38px;
	text-align: center;
	line-height: 38px;
}

#pay-window .pay-window-box .pay-window-sub {
	display: block;
	width: 115px;
	height: auto;
	min-height: 40px;
	line-height: 40px;
	font-size: 16px;
	text-align: right;
	margin-right: 25px;
}

#pay-window .pay-window-box .rlues {
	width: 320px;
	height: 36px;
	border: 1px solid #999;
	text-align: center;
	line-height: 36px;
	position: relative;
	background-color: #fff;
	margin-bottom: 25px;
}

#pay-window .pay-window-box .rlues i {
	position: absolute;
	right: -12px;
	top: -12px;
	display: none;
	width: 25px;
	height: 25px;
	background-image: url(../../../res/images/delete.png);
	background-position: center center;
	background-repeat: no-repeat;
	cursor: pointer;
}

#pay-window .pay-window-box .rlues:hover i {
	display: block;
}

#pay-window .pay-window-box .addclassify {
	width: 212px;
	background-color: #f8941f;
	background-position: 50px center;
}

#pay-window .pay-window-box .related-area {


	background: url('../../../res/images/upgray.png') 140px center no-repeat #fff;
	width: 212px;
	height: 40px;
	line-height: 40px;
	background-color: #f8941f;
	color: #fff;
}

#pay-window .regionalCorrelation {
	width: 700px;
	height: auto;
	min-height: 218px;
	border: 1px solid #999;
	background-color: #fff;
	/* margin-left: 50px; */
	padding: 15px 25px;
}

#pay-window .regionalCorrelation .regionalbox {
	width: 100%;
	height: auto;
	padding-bottom: 20px;
	overflow: hidden;
	margin-bottom: 5px;
}

#pay-window .regionalCorrelation .selectbtns span {
	width: auto;
	height: 36px;
	margin-right: 15px;
	margin-bottom: 10px;
}

#pay-window .pay-window-box .signa {
	background: #FFF3E5 !important;
	border: 1px solid #F8931F !important;
	color: #F9911E !important;
}

#pay-window .handle-tips {
	margin-left: 17px;
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

#pay-window .rightHalf .prompting {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(../../../../src/res/icon/orderdetial18.png) no-repeat center;
	position: relative;
	vertical-align: middle;
	cursor: pointer;
}

#pay-window .rightHalf .prompting .detDiv {
	display: inline-block;
	width: 279px;
	background: #45404b;
	position: absolute;
	top: 0px;
	left: 45px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 1000;
}

#pay-window .rightHalf .prompting .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: 10px;
	left: -20px;
	right: 30%;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
}

#pay-window .rightHalf .prompting .detDiv .detH3 {
	line-height: 22px;
	color: #e6e6e7;
}

#pay-window .rightHalf .prompting .detDiv .triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #45404b;
	border-left: 10px solid transparent;
}

#pay-window .pay-window-box .rightHalf .disc .effect {
	border-color: #FF9700;
	background: url('../../../res/icon/self-help.png') no-repeat center;
}

#pay-window .pay-window-box .rightHalf .mapBox {
	width: 1100px;
	height: 617px;
	float: left;
	margin-right: 16px;
	position: relative;
}

#pay-window .pay-window-box .rightHalf .mapBox .usehelp {
	width: 100%;
	height: 100%;
	background-color: #000;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
	opacity: 0.8;
	/*兼容IE8及以下版本浏览器*/
	filter: alpha(opacity=30);
	/*display: flex;
	justify-content: center;*/
	padding-top: 194px;
}

#pay-window .pay-window-box .rightHalf .mapBox .usehelp img {
	display: block;
	width: 295px;
	height: 295px;
	margin-bottom: 23px;
	margin: 0 auto;
}

#pay-window .pay-window-box .rightHalf .mapBox .usehelp p {
	font-size: 16px;
	color: #fff;
	margin-bottom: 13px;
	height: 40px;
	text-align: center;
}

#pay-window .pay-window-box .rightHalf .mapBox .usehelp a {
	display: block;
	width: 100px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	border: 1px solid #fff;
	margin: 0 auto;
}

#pay-window .pay-window-box .rightHalf .innermap {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

#pay-window .pay-window-box .rightHalf .mapBox .scope {
	width: 300px;
	max-height: 600px;
	position: absolute;
	left: 10px;
	top: 10px;
	z-index: 999;
	overflow-y: auto;
}

#pay-window .pay-window-box .rightHalf .mapBox .scope .distribution {
	width: 300px;
	min-height: 200px;
	margin-bottom: 8px;
}

#pay-window .pay-window-box .rightHalf .mapBox .scope .distribution .active {
	border-color: #28A8E0;
}

#pay-window .pay-window-box .rightHalf .mapBox .scope .shipping {
	height: 40px;
	margin-bottom: 5px;
}

#pay-window .pay-window-box .rightHalf .mapBox .scope .shipping input {
	width: 60px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	text-indent: 0px;
	margin-right: 15px;
}

#pay-window .pay-window-box .rightHalf .mapBox .scope .shipping span {
	margin-right: 15px;
}

#pay-window .pay-window-box .rightHalf .mapBox .distribution .distribution_t {
	width: 298px;
	height: 8px;
}

#pay-window .pay-window-box .rightHalf .mapBox .distribution .choose {
	background: #28A8E0;
}

#pay-window .pay-window-box .rightHalf .mapBox .distribution .distribution_b {
	width: 298px;
	min-height: 192px;
	background: #fff;
	padding: 20px;
	border: 1px solid #fff;
}

#pay-window .pay-window-box .distribution_b .scopeOf {
	height: 40px;
	line-height: 40px;
	margin-bottom: 16px;
	/*display: flex;
	align-items: center;*/
}

#pay-window .pay-window-box .distribution_b .scopeOf span:nth-child(1) {
	display: block;
	width: 20px;
	height: 20px;
	margin-top: 10px;
	margin-right: 10px;
}

#pay-window .pay-window-box .distribution_b .scopeOf span:nth-child(2) {
	font-size: 14px;
	color: #666;
}

#pay-window .pay-window-box .distribution_b .scopeOf span:nth-child(3) {
	font-size: 16px;
	color: #FF3D04;
}

#pay-window .pay-window-box .rightHalf .mapBox .divisions {
	width: 740px;
	height: 88px;
	background: #fff;
	position: absolute;
	left: 330px;
	top: 10px;
	z-index: 999;
	padding: 24px 20px;
}

#pay-window .pay-window-box .rightHalf .mapBox .help {
	width: 121px;
	height: 44px;
	background: #fff;
	border-radius: 22px;
	position: absolute;
	left: 330px;
	top: 118px;
	z-index: 999;
	line-height: 44px;
	display: flex;
	align-items: center;
	padding: 0 17px;
}

#pay-window .pay-window-box .rightHalf .mapBox .help img {
	display: block;
	width: 18px;
	height: 18px;
	margin-right: 10px;
}

#pay-window .pay-window-box .rightHalf .mapBox .help span {
	color: #28A8E0;
}

#pay-window .pay-window-box .rightHalf .mapBox .distribution .addistance {
	width: 260px;
	height: 40px;
	border: 1px solid #28A8E0;
	text-align: center;
	line-height: 40px;
	color: #28A8E0;
	margin-top: 10px;
}

#pay-window .pay-window-box .divisions .way {
	font-size: 16px;
	color: #333;
}

#pay-window .pay-window-box .divisions .divisions_l .disc {
	margin: 0 15px;
}

#pay-window .pay-window-box .divisions_r section {
	width: auto;
	height: 38px;
	border: 1px solid #CECDCD;
	margin-left: 16px;
	float: left;
}

#pay-window .pay-window-box .divisions_r .stribut {
	display: inline-block;
	height: 40px;
	line-height: 40px;
}

#pay-window .pay-window-box .divisions_r .stribut img {
	width: 20px;
	height: 20px;
	margin: 10px 10px 0 10px;
	display: block;
	float: left;
}

#pay-window .pay-window-box .divisions_r section .cumulative {
	width: 120px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

#pay-window .pay-window-box .divisions_r section span {
	display: block;
	float: left;
	height: 37px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
}

#pay-window .pay-window-box .rightHalf .colorBox {
	width: 270px;
	height: 617px;
	float: left;
}

#pay-window .pay-window-box .rightHalf .coloronly {
	height: 20px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
}

#pay-window .pay-window-box .rightHalf .coloronly span {
	color: #FF0000;
}

#pay-window .pay-window-box .rightHalf .coloronly .thebox {
	display: block;
	width: 20px;
	height: 20px;
	margin-right: 18px;
}

#pay-window .pay-window-box .rightHalf .coloronly .horizontal {
	display: block;
	width: 52px;
	height: 1px;
	background: #FF0000;
}

#pay-window .pay-window-box .rightHalf .coloronly .solid {
	display: block;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background: #FF0000;
	margin-right: 10px;
}

#pay-window .pay-window-box .rightHalf .coloronly .text {
	margin-right: 10px;
}
</style>