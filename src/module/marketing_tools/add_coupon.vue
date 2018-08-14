<template>
	<div id="add-coupons">
		<ul class="oUl" v-if="showIndex == 0">
			<template v-for="(c,index) in couponClassList">
				<li class="oLi toreduce" :key="index + c.name">
					<div style="width:300px;height:58px;">
						<span style="font-size: 26px;color: #ffffff;line-height: 58px;margin-left: 10px;">{{c.name}}</span>
					</div>
					<div class="oBottom">
						<div class="oBLeft">
							<h3>{{c.description}}</h3>
						</div>
						<div class="oBRight">
							<section class="addcoupon" @click="addCoupons(c.type)">点击添加</section>
						</div>
					</div>
				</li>
			</template>
		</ul>
		<div class="set-coupons" v-if="showIndex != 0">
			<div class="type" v-if="showIndex != 4 && showIndex != 3">
				<template v-for="(t,index) in couponsClass.list">
					<div @click="changeItemIndex('couponsClass',index)" :key="index" :class="{'selected':couponsClass.index == index}">{{t}}</div>
				</template>
			</div>
			<div class="set-line">
				<div class="title">主要信息</div>
				<div class="line"></div>
			</div>
			<div class="left ">
				<div class="text required">
					{{showIndex==5?'积分卡券名称':'优惠券名称'}}
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<input class="input" v-model="couponName" style="border: 1px solid #999; width: 250px;" maxlength="20" placeholder="请输入优惠券名称" />
				</div>
			</div>
			<div v-if="showIndex==5">
				<div class="left ">
					<div class="text required">
						积分量
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<input class="input"  type="text" v-model="deratePrice" style="border: 1px solid #999; width: 250px;" maxlength="6" placeholder="请输入积分量" />
					</div>
				</div>
			</div>
			<template v-if="ischain && showIndex !=5">
				<div class="left ">
					<div class="text required">
						适用门店
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<div class="buttons" @click="openShopWin">
							<img src="../../res/images/add.png" /> 选择门店
						</div>
						<div style="float: left;width:340px;text-align: left;padding-left: 15px;">
							共关联{{getArrLength('selectShops')}}家门店
						</div>
					</div>
				</div>
			</template>
			<!-- 面额 -->
			<template v-if="showIndex == 4">
				<div class="left">
					<div class="text required">
						面额
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<input class="input" maxlength="6" style="height: 38px; width: 191px;float: left;border:1px solid #999;margin-right: 10px;" placeholder="请输入面额" v-model.trim.number="denomination" /> 元
					</div>
				</div>
			</template>
			<!-- 入账金额 -->
			<template v-if="showIndex == 4">
				<div class="left">
					<div class="text required">
						入账金额
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<input maxlength="6" class="input" style="height: 38px; width: 191px;float: left;border:1px solid #999;margin-right: 10px;" placeholder="0" v-model.trim.number="netAmount" /> 元
					</div>
				</div>
			</template>
			<!-- 结算金额 -->
			<template v-if="showIndex == 4">
				<div class="left">
					<div class="text required">
						结算金额
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<input maxlength="6" class="input" style="height: 38px; width: 191px;float: left;border:1px solid #999;margin-right: 10px;" placeholder="0" v-model.trim.number="setAmount" /> 元
					</div>
				</div>
			</template>
			<template v-if="showIndex == 2 && couponsClass.index == 1">
				<div class="left ">
					<div class="text required">
						是否强折
					</div>
				</div>
				<div class="right">
					<div class="line">
						<div class="radio" :class="{'selectradio':isDiscount.index == 0}" @click="changeItemIndex('isDiscount',0)">否</div>
						<div class="radio" :class="{'selectradio':isDiscount.index == 1}" @click="changeItemIndex('isDiscount',1)">是</div>
					</div>
				</div>
			</template>
			<template v-if="couponsClass.index == 0 && showIndex != 4 && showIndex !=5">
				<div class="left ">
					<div class="text required">
						关联商品
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<div class="buttons" @click="openGoodsWindow">
							<img src="../../res/images/add.png" /> 选择菜品
						</div>
						<div style="float: left;width:340px;text-align: left;padding-left: 15px;">
							共关联商品{{getArrLength('selectGoods')}}份，套餐{{getArrLength('selectPackages')}}份
						</div>
					</div>
				</div>
			</template>
			<template v-if="couponsClass.index == 1 && showIndex == 1 || showIndex == 4">
				<!-- 强制减免 -->
				<div class="left ">
					<div class="text required" v-if="(couponsClass.index == 1 && showIndex == 1) || showIndex == 4">
						强制减免
					</div>
					<!-- <div class="text required" v-if="showIndex == 4" >
						强制抵扣
					</div> -->
				</div>
				<div class="right">
					<div class="line">
						<div class="radio" :class="{'selectradio':compulsoryCredits.index == 0}" @click="changeItemIndex('compulsoryCredits',0)">否</div>
						<div class="radio" :class="{'selectradio':compulsoryCredits.index == 1}" @click="changeItemIndex('compulsoryCredits',1)">是</div>
					</div>
				</div>
			</template>
			<template v-if="showIndex == 3">
				<div class="left ">
					<div class="text required">
						是否包含口味价格
					</div>
				</div>
				<div class="right">
					<div class="line">
						<div class="radio" :class="{'selectradio':hasTaste.index == 0}" @click="changeItemIndex('hasTaste',0)">是</div>
						<div class="radio" :class="{'selectradio':hasTaste.index == 1}" @click="changeItemIndex('hasTaste',1)">否</div>
					</div>
				</div>
			</template>
			<template v-if="showIndex == 1 || showIndex == 2">
				<div class="left ">
					<div class="text required" v-if="showIndex == 1">
						减免金额
					</div>
					<div class="text required" v-if="showIndex == 2">
						折扣力度
					</div>
				</div>
				<div class="right">
					<div class="fl" style="border: 1px solid #999;width: 200px;height: 40px;padding: 0;margin-left: 10px;">
						<input class="input" style="height: 38px; width: 150px;float: left;margin-left:10px;" placeholder="请输入减免金额" v-model.trim.number="deratePrice" maxlength="6" v-if="showIndex == 1" />
						<input class="input" style="height: 38px; width: 150px;float: left;margin-left:10px;" placeholder="请输入折扣力度" v-model.trim.number="deratePrice" maxlength="6" v-if="showIndex == 2" />
						<div style="border-left:1px solid #999;width: 36px;float: left;height:38px;" v-if="showIndex == 1">
							元
						</div>
						<div style="border-left:1px solid #999;width: 36px;float: left;height:38px;" v-if="showIndex == 2">
							%
						</div>
					</div>
				</div>
			</template>
			<div class="left ">
				<div class="text required">
					券有效期
				</div>
			</div>
			<div class="right">
				<div class="line">
					<div class="radio" :class="{'selectradio':validType.index == 0}" @click="changeItemIndex('validType',0)">相对时间</div>
					<div class="radio" :class="{'selectradio':validType.index == 1}" @click="changeItemIndex('validType',1)">指定时间</div>
				</div>
			</div>
			<div class="left ">
			</div>
			<div class="right" v-if="validType.index == 0">
				<div class="line" style="text-align:left;">
					领券后
					<input class="input" style="height: 30px; width: 60px;border: 1px solid #999" maxlength="3" v-model.trim.number="validType.time" /> 日内有效
				</div>
			</div>
			<div class="right" v-if="validType.index == 1" style="padding-left: 10px;">
				<div style="width: 310px; height: 40px;border: 1px solid #999;float: left;">
					<div style="width: 100%; height: 40px; line-height: 40px;cursor: pointer;" @click="showCalendar">
						<div style="float: left;width: 40%; height: 40px;">{{transformDate(validType.startTime)}}</div>
						<div style="float: left;width: 20%; height: 40px;">
							至
						</div>
						<div style="float: left;width: 40%; height: 40px;">{{transformDate(validType.endTime)}}</div>
					</div>
					<can-multi @closeCan="()=>{isShowCa=false}" v-if="isShowCa" :sideStart="validType.startTime" :sideEnd="validType.endTime" @castTime="getAddAlltime"></can-multi>
				</div>
				<div style="border:1px solid #999;width: 40px;float: left;height:40px;border-left: none;cursor: pointer;" @click="showCalendar">
					<img src="../../res/icon/q2x.png" />
				</div>
				<div style="width: 80px;float: left;height:40px;font-size: 12px;text-align: left;color: #00A1E9;padding-left: 10px;">
					共{{getValidDay()}}天
				</div>
			</div>
			<div class="left " v-if="showIndex!=5">
				<div class="text" style="margin-right: 10px;">
					领取生效
				</div>
			</div>
			<div class="right" v-if="showIndex!=5">
				<div class="fl" style="width: 200px;height: 40px;padding: 0;margin-left: 10px;position: relative;cursor: pointer;" @click="selectItemShow('validTime')">
					<div class="fl" style="border: 1px solid #999;width: 150px;height: 40px;padding: 0;" v-if="validTime.index == 0">
						领取即时生效
					</div>
					<div class="fl" style="border: 1px solid #999;width: 150px;height: 40px;padding: 0;" v-else>
						领取后{{validTime.list[validTime.index]}}小时后生效
					</div>
					<div style="border:1px solid #999;width: 40px;float: left;height:40px;border-left: none;">
						<img src="../../res/icon/q2x.png" />
					</div>
					<div class="list" v-if="validTime.show" transition="slidUpDown">
						<ul>
							<template v-for="(v,index) in validTime.list">
								<li v-if="v == 0" :key="index" @click="changeItemIndex('validTime',index)">领取后即刻生效</li>
								<li v-else :key="index" @click="changeItemIndex('validTime',index)">领取后{{v}}小时后生效</li>
							</template>
						</ul>
					</div>
				</div>
			</div>
			<div class="left " v-if="showIndex!=5">
				<div class="text" style="margin-right: 10px;">
					使用时段
				</div>
			</div>
			<div class="right" v-if="showIndex!=5">
				<div class="fl" style="width: 250px;height: 40px;padding: 0;margin-left: 10px;position: relative;cursor: pointer;" @click="selectItemShow('useDate')">
					<div class="fl" style="border: 1px solid #999;width: 200px;height: 40px;padding: 0;">
						{{useDate.list[useDate.index]}}
					</div>
					<div style="border:1px solid #999;width: 40px;float: left;height:40px;border-left: none;">
						<img src="../../res/icon/q2x.png" />
					</div>
					<div class="list" v-if="useDate.show" transition="slidUpDown" style="width: 240px;">
						<ul>
							<template v-for="(v,index) in useDate.list">
								<li :key="index" @click="changeItemIndex('useDate',index)">{{v}}</li>
							</template>
						</ul>
					</div>
				</div>
				<div class="fl" style="width: 100px;height: 40px;text-align: center;line-height: 40px;padding: 0;cursor: pointer;">
					<div class="fl" style="width: 50%;color: #F1801A;" @click="cleanUseDate" v-if="useDate.index != 0 && (useDate.week.length > 0 || useDate.month.length > 0)">
						清空
					</div>
					<div class="fl" style="width: 50%;color: #2397de;" @click="addUseDate" v-if="useDate.index != 0">
						添加
					</div>
				</div>
			</div>
			<!--change week-->
			<template v-for="(weeks,windex) in useDate.week" v-if="useDate.index == 1">
				<div :key="windex" class="select-week">
					<div class="show-week">
						<ul>
							<template v-for="(d,index) in week">
								<li @click="selectWeek(windex,index)" :key="index" :class="{'selected':hasItemInArr(index,weeks.week)}">周{{d}}</li>
							</template>
						</ul>
					</div>
					<div class="show-time" style="padding-left:180px;width: 100%;height: auto;overflow: hidden;margin-top: 10px;">
						<div class="fl" style="overflow: hidden;">
							<div class="time">
								<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="weeks.startslotH" maxlength="2" />
								<div class="fl" style="width: 10px;height: 38px;line-height: 38px;">:</div>
								<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="weeks.startslotM" maxlength="2" />
								<div class="time-change">
									<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime(windex,'week','s','add')"></div>
									<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime(windex,'week','s','down')"></div>
								</div>
							</div>
						</div>
						<div class="fl" style="position: relative;width: 42px;height: 42px;">
							<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 28px;height: 1px;background-color: #999;"></div>
						</div>
						<div class="fl" style="overflow: hidden;">
							<div class="time">
								<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="weeks.endslotH" maxlength="2" />
								<div class="fl" style="width: 10px;height: 38px;line-height: 38px;">
									:
								</div>
								<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="weeks.endslotM" maxlength="2" />
								<div class="time-change">
									<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime(windex,'week','e','add')"></div>
									<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime(windex,'week','e','down')"></div>
								</div>
							</div>
						</div>
						<div class="fl " @click="changeNextday(windex)" :class="{'blueBySelect':weeks.isNextDay}" style="width: 20px;height: 20px;border: 1px solid #999;margin: 10px 10px 10px 20px;line-height: 20px;text-align: center;cursor: pointer;">
							<img src="../../res/icon/selected.png" />
						</div>
						<div class="fl " style="width: 30px;height: 20px;margin: 10px 0;line-height: 20px;text-align: center;">
							隔日
						</div>
						<div class="fl " style="width: 20px;height: 20px;margin: 10px 20px;line-height: 20px;text-align: center;cursor: pointer;" @click="delectedOneDate('week',windex)">
							<img src="../../res/images/delete.png" />
						</div>
					</div>
				</div>
			</template>
			<!--月的选择样式-->
			<template v-for="(month,mindex) in  useDate.month" v-if="useDate.index == 2">
				<div :key="mindex + 'l'" class="left ">
				</div>
				<div :key="mindex + 'r'" class="right">
					<div class="fl" style="width: 250px;height: 42px;padding: 0;margin-left: 10px;position: relative;cursor: pointer;">
						<div v-if="month.month.length == 0" class="fl" style="border: 1px solid #999;width: 200px;height: 42px;padding: 0;" @click="openMonth(mindex)">
							请选择日期
						</div>
						<div v-else class="fl" style="border: 1px solid #999;width: 200px;height: 42px;padding: 0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" @click="openMonth(mindex)">
							{{changeDays(month.month)}}
						</div>
						<div style="border:1px solid #999;width: 40px;float: left;height:42px;border-left: none;" @click="openMonth(mindex)">
							<img src="../../res/icon/q2x.png" />
						</div>
						<div class="show-days" v-if="openMonthIndex == mindex">
							<ul>
								<template v-for="(i,index) in 31">
									<li :key="index" :class="{'select':hasItemInArr(index+1,month.month)}" @click="selectMonth(mindex,index+1)">{{i}}</li>
								</template>
							</ul>
							<div style="position: absolute;bottom: 0;left: 0;width: 100%;height: 40px;text-align: center;border-top: 1px solid #999;">
								<div style="width: 33.33%;float: left;">
									<a href="javascript:void(0);" class="yellow" style="width: 100%;height: 40px;line-height: 40px;" @click="selectAll(mindex,month)">全选</a>
								</div>
								<div style="width: 33.33%;float: left;">
									<a href="javascript:void(0);" class="red" style="width: 100%;height: 40px;line-height: 40px;" @click="selectClean(mindex,month)">清空</a>
								</div>
								<div style="width: 33.33%;float: left;">
									<a href="javascript:void(0);" class="blue" style="width: 100%;height:40px;line-height: 40px;" @click="openMonth(mindex)">确定</a>
								</div>
							</div>
						</div>
					</div>
					<div class="fl" style="overflow: hidden;">
						<div class="time">
							<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="month.startslotH" maxlength="2" />
							<div class="fl" style="width: 10px;height: 38px;line-height: 38px;padding: 0;">
								:
							</div>
							<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="month.startslotM" maxlength="2" />
							<div class="time-change">
								<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime(mindex,'month','s','add')"></div>
								<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime(mindex,'month','s','down')"></div>
							</div>
						</div>
					</div>
					<div class="fl" style="position: relative;width: 42px;height: 42px;">
						<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 28px;height: 1px;background-color: #999;"></div>
					</div>
					<div class="fl" style="overflow: hidden;">
						<div class="time">
							<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="month.endslotH" maxlength="2" />
							<div class="fl" style="width: 10px;height: 38px;line-height: 38px;padding: 0;">
								:
							</div>
							<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="month.endslotM" maxlength="2" />
							<div class="time-change">
								<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime(mindex,'month','e','add')"></div>
								<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime(mindex,'month','e','down')"></div>
							</div>
						</div>
					</div>
					<div class="fl " @click="changeNextday(mindex,'month')" :class="{'blueBySelect':month.isNextDay}" style="width: 20px;height: 20px;border: 1px solid #999;margin: 10px 10px 10px 20px;line-height: 20px;text-align: center;cursor: pointer;padding: 0;">
						<img src="../../res/icon/selected.png" />
					</div>
					<div class="fl " style="width: 30px;height: 20px;margin: 10px 0;line-height: 20px;text-align: center;padding: 0;">
						隔日
					</div>
					<div class="fl " style="width: 20px;height: 20px;margin: 10px 20px;line-height: 20px;text-align: center;cursor: pointer;padding: 0;" @click="delectedOneDate('month',mindex)">
						<img src="../../res/images/delete.png" />
					</div>
				</div>
			</template>
			<div class="left " v-if="showIndex!=5">
				<div class="text" style="margin-right: 10px;">
					使用门槛
				</div>
			</div>
			<div class="right" v-if="showIndex!=5">
				<div class="line">
					<div class="radio" :class="{'selectradio':useThreshold.index == 0}" @click="changeItemIndex('useThreshold',0)">不设限制</div>
					<div class="radio" :class="{'selectradio':useThreshold.index == 1}" @click="changeItemIndex('useThreshold',1)">指定门槛</div>
				</div>
			</div>
			<template v-if="useThreshold.index == 1">
				<div class="left ">
				</div>
				<div class="right">
					<div class="line" style="text-align:left;border: 1px solid #999;width: 180px;margin-left: 10px;padding: 0;">
						<input class="input" style="height: 38px; width: 128px;float: left;" placeholder="请输入金额" maxlength="8" v-model="useThreshold.threshold" />
						<div style="border-left:1px solid #999;width: 40px;float: left;height:38px;text-align: center;">
							元
						</div>
					</div>
				</div>
			</template>
			<template v-if="couponsClass.index == 1 && showIndex == 1 || showIndex == 4">
				<!-- 最大使用上限 -->
				<div class="left ">
					<div class="text required">
						最大使用上限
					</div>
				</div>
				<div class="right">
					<input type="text" maxlength="2" class="fl" placeholder="0" style="width: 149px;height: 36px;padding: 0;border-color: #999;text-indent: 10px;outline: none; margin-left:10px;" v-model="maxCeiling" />
					<div style="border:1px solid #999;width: 38px;float: left;height: 38px;border-left: none;text-align: center;line-height: 38px;">张</div>
				</div>
			</template>
			<div class="set-line" style="float: left;">
				<div class="title">其他设置</div>
				<div class="line"></div>
			</div>
			<div class="fl" style="width: 100%;">
			</div>
			<div class="left ">
				<div class="text" style="margin-right: 10px;">
					备注
				</div>
			</div>
			<div class="right">
				<div class="fl" style="border: 1px solid #999;width: 362px;height: 40px;padding: 0;margin-left: 10px;">
					<input class="input" style="height: 38px; width: 350px;float: left;margin-left:10px;" placeholder="20字" maxlength="20" v-model="annotation" />
				</div>
			</div>
			<div class="left ">
				<div class="text" style="margin-right: 10px;">
					使用须知
				</div>
			</div>
			<div class="right">
				<div class="fl" style="border: 1px solid #999;width: 382px;height: 180px;padding: 0px;margin-left: 10px;">
					<textarea class="describe" style="width: 360px;height: 158px;" maxlength="150" v-model="useKnow"></textarea>
					<div class="fl" style="width: 100%;height: 18px;line-height: 18px;vertical-align: middle;padding:8px;margin-top:8px;">
						<div class="fl" style="width: 18px;height: 18px;margin-right: 10px;">
							<img src="../../res/icon/alert.jpg" />
						</div>
						<div class="fl">
							限制150字
						</div>
					</div>
				</div>
			</div>
			<div class="save-coupon">
				<a href="javascript:void(0);" class="yellow" style="width: 200px;" @click="getSendInfo">保存</a>
			</div>
		</div>
		<goodListWin v-if="goodsWin" @goodListWin="closeGoodWin" :goodsIds="selectGoods" :isGoods="true" :packages="selectPackages" :goInName="'isCoupon'"></goodListWin>
		<!-- <coupon-goods-win @closeWin="closeGoodWin" v-if="goodsWin" :selectGoods="selectGoods" :selectShops="selectShops" :selectPackages="selectPackages"></coupon-goods-win> -->
		<coupon-shop-win @closeShopWin="closeShopWin" v-if="shopWin" :selectShops="selectShops"></coupon-shop-win>
	</div>
</template>
<script>
	import http from "src/manager/http";
	import storage from "src/verdor/storage";
	import utils from "src/verdor/utils";
	import global from 'src/manager/global';
	export default {
	    data() {
	        return {
	            ischain: '',
	            couponClassList: [{
	                "name": "减免优惠券",
	                "description": "订单中所购商品总额需达到用券限额才能使用",
	                "type": 1
	            }, {
	                "name": "折扣优惠券",
	                "description": "单张订单限用一张折扣优惠券,按折扣金额减免支付。",
	                "type": 2
	            }, {
	                "name": "赠菜优惠券",
	                "description": "只能用于特定菜品,单个订单也可以用多张赠菜优惠券,按面值金额减免支付。",
	                "type": 3
	            }, {
	                "name": "代金券",
	                "description": "单张订单可使用多张代金券设定券实收金额与面额计入订单统计",
	                "type": 4
	            }, {
	                "name": "积分卡券",
	                "description": "积分即可使用",
	                "type": 5
	            }],
	            couponName: "", // .....
	            deratePrice: "", //减免金额 
	            selectShops: [], //选中的商铺
	            selectGoods: [], //选中的商品
	            selectPackages: [], //选中的套餐
	            showIndex: 0, //0 选择优惠券的种类 1 减免 2 折扣 3 赠菜 4 代金
	            couponsClass: {
	                "list": [],
	                'index': 0
	            }, //list 减免和折扣的 类别(单品还是整单) index:选中的index
	            isDiscount: {
	                'index': 0
	            },
	            compulsoryCredits: {
	                "index": 0 // 0代表否  1代表是

	            }, //强制减免
	            validType: {
	                "index": 0, //0指定时间 1相对时间
	                "time": '', //制定时间输入的值
	                "startTime": (new Date()).getTime(), //相对时间的开始时间
	                "endTime": (new Date()).getTime(), //相对时间的结束时间
	            }, //券有效期
	            hasTaste: {
	                "index": 0, //0是  1否
	            }, //券有效期
	            validTime: {
	                "list": [0, 1, 2, 3, 6, 12, 24],
	                "index": 0,
	                "show": false
	            }, //领取生效的日期限制
	            week: ["日", "一", "二", "三", "四", "五", "六"],
	            useDate: {
	                "list": ["不设限制", "指定每周使用时段", "指定每月使用日期和时段 "],
	                "index": 0,
	                "week": [], //周
	                "month": [], //月
	                "show": false
	            }, //使用时段
	            useThreshold: {
	                "index": 0,
	                "threshold": null
	            },
	            annotation: "", //备注
	            useKnow: "", //使用须知
	            openMonthIndex: -1, //打开日期选择的下标
	            maxCeiling: '', //最大使用上限
	            denomination: '', //面额      // .....
	            netAmount: "", //入账金额     // .....
	            setAmount: '', //结算金额     // .....
	            isShowCa: false, // 是否展示时间选择组件
	            goodsWin: false, // 商品弹框
	            shopWin: false, // 店铺弹框
	            integrlVariable: '' //  积分量
	        }
	    },
	    watch: {
	        runHeards(val) {
	            this.initData()
	            this.$store.commit('setRunheard', '')
	        }
	    },
	    computed: {
	        runHeards() {
	            return this.$store.state.runHeard;
	            console.log(this.$store.state.runHeard)
	        }
	    },
	    methods: {
	        formatValue() {
	            this.deratePrice = utils.toFloatStr(this.deratePrice, 2);
	        },
	        closeGoodWin(res, item) { //  关闭商品弹框
				if (res == 'ok') {
					if(item.goodArr.length+item.packArr.length>5){
						this.valiData('商品和套餐最多一共只能选择5个', '提示信息');
						return false;
					}
					this.selectGoods = item.goodArr;
					this.selectPackages = item.packArr;
				}
				this.goodsWin = false;
	        },
	        closeShopWin(val) {
	            this.shopWin = false
	            if (val) {
	                this.selectShops = val.selectShops
	            }
	        },
	        addCoupons(type) {
	            this.showIndex = type;
	            this.addCoupon = true;
	            if (this.showIndex == 1) {
	                this.couponsClass.list = ["单品减免", "整单减免"];
	            } else if (this.showIndex == 2) {
	                this.couponsClass.list = ["单品折扣", "整单折扣"];
	            }
	        },
	        getArrLength(type) {
	            return this[type].length;
	        },
	        getAddAlltime(time) {
	            this.validType.startTime = time.startTime;
	            this.validType.endTime = time.endTime;
	            this.isShowCa = false;
	        },
	        changeDays(arr) {
	            arr = utils.deepCopy(arr);
	            if (arr.length == 0) {
	                return "请选择日期";
	            }
	            arr = arr.sort(function(a, b) {
	                return a - b
	            });
	            var str = "";
	            for (var j = 0; j < arr.length; j++) {
	                if (arr[j] - arr[j - 1] != 1) {
	                    str += this.findItem(arr[j], arr)
	                }
	            }

	            return str;
	        },
	        findItem(item, arr) {
	            var index = arr.indexOf(item);
	            for (var i = index; i < arr.length; i++) {
	                if (arr[i + 1] - arr[i] != 1) {
	                    var rs = "";
	                    if (arr[i] - item == 0) {
	                        rs = arr[i];
	                    } else if (arr[i] - item == 1) {
	                        rs = item + "," + arr[i];
	                    } else {
	                        rs = item + "到" + arr[i];
	                    }
	                    if (i < arr.length - 1) {
	                        rs += ","
	                    }
	                    return rs;
	                }
	            }
	        },
	        arrToString(arr) {
	            var str = "";
	            for (var i = 0; i < arr.length; i++) {
	                str += arr[i];
	                if (i < arr.length - 1) {
	                    str += ","
	                }
	            }
	            return str;
	        },
	        valiData(content, title = "提示信息", winType = "alert") {
	            this.$store.commit('setWin', {
	                winType: winType,
	                title: title,
	                content: content
	            })
	        },
	        checkData() {
	            var reg = /^[0-9]*$/;
	            var reg2 = /^\d+(\.\d+)?$/;
	            var reg3 = /^[0-9]+$/;
	            if (!global.checkData({
	                    couponName: {
	                        cond: "$$.trim() !== '' && $$.length<=20",
	                        pro: '优惠券名称不能为空且不能超过20个字'
	                    },
	                }, this)) {
	                return false
	            }
	            if (this.ischain && this.showIndex != 5) {
	                if (this.selectShops.length == 0) {
	                    this.valiData('请选择优惠券的关联店铺')
	                    return false;
	                }
	            }
	            if (this.showIndex == 1 || this.showIndex == 2) {
	                if (this.couponsClass.index == 0) {
	                    if (this.selectGoods.length == 0 && this.selectPackages.length == 0) {
	                        this.valiData('请选择关联商品或套餐')
	                        return false;
	                    }
	                }
	            }
	            if (this.showIndex == 3) {
	                if (this.selectGoods.length == 0 && this.selectPackages.length == 0) {
	                    this.valiData('请选择关联商品或套餐')
	                    return false;
	                }

	            }
	            if (this.showIndex != 3 && this.showIndex != 4) {

	                if (this.deratePrice == '') {
	                    if (this.showIndex == 2) {
	                        this.valiData('请输入折扣力度')
	                    } else if (this.showIndex == 1) {
	                        this.valiData('请输入减免金额')
	                    } else if (this.showIndex == 5) {
	                        this.valiData('请输入积分量')
	                    }

	                    return false;
	                }
	                if ((this.deratePrice - 0) < 0) {
	                    if (this.showIndex == 2) {
	                        this.valiData('折扣力度不能小于0')
	                    } else if (this.showIndex == 1) {
	                        this.valiData('减免金额不能小于0')
	                    } else if (this.showIndex == 5) {
	                        this.valiData('积分量不能小于0')
	                    }
	                    return false;
	                }

	                if (this.showIndex == 2) {
	                    if (!reg.test(this.deratePrice)) {
	                        this.valiData('折扣率只能是正整数')
	                        var dp = this.deratePrice + "";
	                        if (dp.indexOf(".") != -1) {
	                            dp = dp.split(".")[0] ? dp.split(".")[0] : dp;
	                        }
	                        this.deratePrice = dp;
	                        return false;
	                    }
	                    var nums = this.deratePrice - 0;

	                    if (nums < 1 || nums > 99) {
	                        this.valiData('折扣力度范围(1-99)')
	                        return false;
	                    }
	                } else if (this.showIndex == 5) {
	                    if (!reg3.test(this.deratePrice)) {
	                        this.valiData('积分量只能是正整数')
	                        return false;
	                    }
	                } else {
	                    if (!reg2.test(this.deratePrice)) {
	                        this.valiData('减免金额只能是数字')
	                        return false;
	                    }
	                }

	            }
	            //代金券面额 入账金额 结算金额的验证
	            if (this.showIndex == 4) {
	                //面额
	                if (this.denomination == '') {
	                    this.valiData('面额不能为空')
	                    return false;
	                }
	                if ((this.denomination - 0) < 0) {
	                    this.valiData('面额不能小于0')
	                    return false;
	                }
	                if (!reg2.test(this.denomination)) {
	                    this.valiData('面额只能是数字')
	                    return false;
	                }
	                //入账金额
	                if (this.netAmount == '') {
	                    this.valiData('入账金额不能为空')
	                    return false;
	                }
	                if ((this.netAmount - 0) < 0) {
	                    this.valiData('入账金额不能小于0')
	                    return false;
	                }
	                if (!reg2.test(this.netAmount)) {
	                    this.valiData('入账金额只能是数字')
	                    return false;
	                }
	                //结算金额
	                if (this.setAmount == '') {
	                    this.valiData('结算金额不能为空')
	                    return false;
	                }
	                if ((this.setAmount - 0) < 0) {
	                    this.valiData('结算金额不能小于0')
	                    return false;
	                }
	                if (!reg2.test(this.setAmount)) {
	                    this.valiData('结算金额只能是数字')
	                    return false;
	                }
	            }
	            if (this.validType.index == 0) {
	                if (this.validType.time.toString().trim() == '') {
	                    this.valiData('请输入券有效期')
	                    return false;
	                }
	                if (!reg.test(this.validType.time)) {
	                    this.valiData('券有效期只能是整数')
	                    return false;
	                }
	            }
	            var arr = [];
	            var alertText = "";
	            if (this.useDate.index != 0) {

	                if (this.useDate.index == 1) {
	                    arr = this.useDate.week;
	                    alertText = "使用时段请选择日期(周)";
	                } else if (this.useDate.index == 2) {
	                    arr = this.useDate.month;
	                    alertText = "使用时段请选择日期(月)";
	                }

	                for (var i = 0; i < arr.length; i++) {
	                    if (this.useDate.index == 1) {
	                        if (arr[i].week.length == 0) {
	                            this.valiData(alertText)
	                            return false;
	                        }
	                    } else if (this.useDate.index == 2) {
	                        if (arr[i].month.length == 0) {
	                            this.valiData(alertText)
	                            return false;
	                        }
	                    }

	                    if (arr[i].startslotH.toString().trim() == '' || arr[i].startslotM.toString().trim() == '' || arr[i].endslotH.toString().trim() == '' || String(arr[i].endslotM).trim() == '') {
	                        this.valiData('使用时段的时间不能为空')
	                        return false;
	                    }
	                    if (!reg.test(arr[i].startslotH) || !reg.test(arr[i].startslotM) || !reg.test(arr[i].endslotH) || !reg.test(arr[i].endslotM)) {
	                        this.valiData('使用时段的时间只能是整数')
	                        return false;
	                    }
	                    if (arr[i].startslotH > 23 || arr[i].startslotM > 59 || arr[i].endslotH > 23 || arr[i].endslotM > 59) {
	                        this.valiData('请输入正确的使用时间')
	                        return false;
	                    }
	                    console.log(arr[i].isNextDay)
	                    if (!arr[i].isNextDay) {
	                        if (arr[i].startslotH > arr[i].endslotH || (arr[i].startslotH == arr[i].endslotH && arr[i].startslotM > arr[i].endslotM)) {
	                            this.valiData('使用时段里，未点击隔天,结束时间不能小于开始时间')
	                            return false;
	                        }
	                    }

	                }
	            }
	            if (this.useThreshold.index == 1) {
	                if (this.useThreshold.threshold.toString().trim() == '') {
	                    this.valiData('指定门槛金额不能为空')
	                    return false;
	                }
	                if ((this.useThreshold.threshold - 0) < 0) {
	                    this.valiData('指定门槛金额不能小于0')
	                    return false;
	                }
	                if (!reg2.test(this.useThreshold.threshold)) {
	                    this.valiData('指定门槛金额只能是数字')
	                    return false;
	                }
	            }
	            if (this.couponsClass.index == 1 && this.showIndex == 1 || this.showIndex == 4) {
	                // 最大使用上限的验证
	                if (!Boolean(this.maxCeiling)) {
	                    // 当输入框的为''时
	                    this.valiData('请输入最大使用上限')
	                    return false;
	                } else if (isNaN(this.maxCeiling)) {
	                    // 当输入框的值不为数字时
	                    this.valiData('最大上限格式错误')
	                    return false;
	                } else if (this.maxCeiling != '' && parseInt(this.maxCeiling) != this.maxCeiling) {
	                    // 当未添加关联区域时
	                    this.valiData('最大上限不能为小数')
	                    return false;
	                } else if (Number(this.maxCeiling) < 1 || Number(this.maxCeiling) > 999) {
	                    this.valiData('最大上限(1-999)')
	                    return false;
	                }
	            }
	            if (this.annotation.length > 20) {
	                this.valiData('备注字数不能大于20')
	                return false;
	            }
	            if (this.useKnow.length > 150) {
	                this.valiData('使用须知字数不能大于150')
	                return false;
	            }
	            return true;
	        },
	        getSendInfo() {
	            //验证输入
	            if (this.checkData()) {
	                var obj = {};
	                if (this.ischain) {
	                    if (this.showIndex == 5) {
	                        obj.shopIds = storage.session("userShop").currentShop.id;
	                    } else {
	                        obj.shopIds = this.arrToString(this.selectShops);
	                    }
	                } else {
	                    obj.shopIds = storage.session('userShop').currentShop.id;
	                }

	                obj.gids = this.arrToString(this.selectGoods);
	                obj.pids = this.arrToString(this.selectPackages);
	                obj.name = this.couponName;
	                obj.param = this.deratePrice;
	                obj.delayHours = this.validTime.list[this.validTime.index];
	                //  'useTime' => '{"type":"week","list":[{"startslot":"09:00","endslot":"05:00","week":[0,1],"isNextDay":0}]}',       //使用时段，为空代表不限制
	                obj.annotation = this.annotation;
	                obj.useKnow = this.useKnow;
	                obj.validityType = this.validType.index;
	                obj.periodSel = this.useDate.index;
	                obj.isDiscount = this.compulsoryCredits.index; // 是否强免 
	                obj.useLimit = this.maxCeiling; //最大使用上限
	                if (this.showIndex == 4) {
	                    obj.param = this.denomination; //面额
	                }
	                obj.billPrice = this.netAmount; //入账金额
	                obj.reckoningPrice = this.setAmount; //结算金额

	                if (this.showIndex == 3) {
	                    obj.tastePrice = this.hasTaste.index;
	                }
	                if (this.useThreshold.index == 0) {
	                    obj.lowestConsume = 0;
	                } else {
	                    obj.lowestConsume = this.useThreshold.threshold;
	                }
	                var useTime = {};

	                if (this.useDate.index == 1) {
	                    useTime.type = "week";
	                    useTime.list = this.changeArr(this.useDate.week, 'w');
	                }
	                if (this.useDate.index == 2) {
	                    useTime.type = "month";
	                    useTime.list = this.changeArr(this.useDate.month, 'm');
	                }
	                useTime = JSON.stringify(useTime);
	                obj.useTime = useTime;
	                if (this.validType.index == 0) {
	                    obj.relativeTime = this.validType.time;
	                } else {
	                    obj.startTime = parseInt(this.validType.startTime / 1000);
	                    obj.endTime = parseInt(this.validType.endTime / 1000);
	                }
	                if (this.showIndex == 2 && this.couponsClass.index == 1) {
	                    obj.isDiscount = this.isDiscount.index;
	                }
	                if (this.showIndex == 1) {
	                    if (this.couponsClass.index == 0) {
	                        obj.type = 1;
	                    } else {
	                        obj.type = 2;
	                    }
	                } else if (this.showIndex == 2) {
	                    if (this.couponsClass.index == 0) {
	                        obj.type = 3;
	                    } else {
	                        obj.type = 4;
	                    }
	                } else if (this.showIndex == 3) {
	                    obj.type = 5;
	                    obj.param = 0;
	                } else if (this.showIndex == 4) {
	                    obj.type = 6;
	                } else if (this.showIndex == 5) {
	                    obj.type = 7
	                    obj.params = this.deratePrice
	                }

	                if (storage.session("couponDetail")) {
	                    obj.id = storage.session("couponDetail").id;
	                }

	                this.operateCoupons(obj);
	            }

	        },
	        changeArr(arr, type) {
	            var nArr = [];
	            for (var i = 0; i < arr.length; i++) {
	                var o = {};
	                if (type == "w") {
	                    o.week = arr[i].week.sort(function(a, b) {
	                        return a - b
	                    });

	                } else if (type == "m") {
	                    o.month = arr[i].month.sort(function(a, b) {
	                        return a - b
	                    });
	                }
	                o.isNextDay = arr[i].isNextDay;
	                var startslot = (arr[i].startslotH + ":" + arr[i].startslotM);
	                var endslot = (arr[i].endslotH + ":" + arr[i].endslotM);
	                o.startslot = startslot;
	                o.endslot = endslot;
	                nArr.push(o);
	            }
	            return nArr;
	        },
	        async operateCoupons(sendInfo) {
	            if (!this.editCoupon) {
	                let res = await http.addCoupon({
	                    data: sendInfo
	                })
	                this.valiData('添加成功')
	                this.initData()
	            } else {
	                let res = await http.editCoupon({
	                    data: sendInfo
	                })
	                this.valiData('修改成功');
	                setTimeout(() => {
	                    storage.session("couponDetail", "");
	                    this.$emit('changeMnage')
	                }, 500)
	            }
	        },
	        initData() {
	            this.showIndex = 0
	            this.couponsClass.index = 0;
	            this.denomination = '' //面额      // .....
	            this.netAmount = "" //入账金额     // .....
	            this.setAmount = '' //结算金额     // .....
	            this.validType = {
	                "index": 0, //0指定时间 1相对时间
	                "time": '', //制定时间输入的值
	                "startTime": (new Date()).getTime(), //相对时间的开始时间
	                "endTime": (new Date()).getTime(), //相对时间的结束时间
	            } //券有效期
	            this.couponName = "" // .....
	            this.deratePrice = "" //减免金额 
	            this.selectShops = [] //选中的商铺
	            this.selectGoods = [] //选中的商品
	            this.selectPackages = [] //选中的套餐
	            this.couponsClass = {
	                "list": [],
	                'index': 0
	            } //list 减免和折扣的 类别(单品还是整单) index:选中的index
	            this.isDiscount = {
	                'index': 0
	            }
	            this.compulsoryCredits = {
	                "index": 0 // 0代表否  1代表是

	            } //强制减免
	            this.useDate = {
	                "list": ["不设限制", "指定每周使用时段", "指定每月使用日期和时段 "],
	                "index": 0,
	                "week": [], //周
	                "month": [], //月
	                "show": false
	            } //使用时段
	            this.useThreshold = {
	                "index": 0,
	                "threshold": null
	            }
	            this.validTime = {
	                "list": [0, 1, 2, 3, 6, 12, 24],
	                "index": 0,
	                "show": false
	            } //领取生效的日期限制
	            this.annotation = "" //备注
	            this.useKnow = "" //使用须知
	        },
	        init() { //   若果来自优惠券管理页面，加载此方法，否则跳过
	            var couponDetail = storage.session("couponDetail");

	            if (couponDetail) {
	                this.editCoupon = true;
	                if (couponDetail.type == 1 || couponDetail.type == 2) {
	                    this.showIndex = 1;
	                    this.couponsClass.index = (couponDetail.type - 1);
	                }
	                if (couponDetail.type == 3 || couponDetail.type == 4) {
	                    this.showIndex = 2;
	                    this.couponsClass.index = (couponDetail.type - 3);
	                }
	                if (couponDetail.type == 5) {
	                    this.showIndex = 3;
	                    this.hasTaste.index = couponDetail.tastePrice;
	                }
	                if (couponDetail.type == 6) {
	                    this.showIndex = 4;
	                }
	                if (couponDetail.type == 7) {
	                    this.showIndex = 5;
	                }

	                this.couponName = couponDetail.name;
	                if (couponDetail.param) {
	                    var dp = couponDetail.param + "";
	                    if (this.showIndex == 2) {
	                        if (dp.indexOf(".") != -1) {
	                            dp = dp.split(".")[0] ? dp.split(".")[0] : dp;
	                        }
	                    }
	                    this.deratePrice = dp;
	                }
	                if (this.showIndex == 2 && this.couponsClass.index == 1) {
	                    this.isDiscount.index = couponDetail.isDiscount;
	                }

	                if (couponDetail.shopIds && couponDetail.shopIds.length > 0) {

	                    this.selectShops = couponDetail.shopIds.split(",");
	                }
	                if (couponDetail.gids && couponDetail.gids.length > 0 && couponDetail.gids != null && couponDetail.gids != 0) {
	                    console.log("shangpin")
	                    this.selectGoods = couponDetail.gids.split(",");
	                }
	                if (couponDetail.pids && couponDetail.pids.length > 0 && couponDetail.pids != null && couponDetail.pids != 0) {
	                    console.log("taocan")

	                    this.selectPackages = couponDetail.pids.split(",");
	                }
	                this.validType.index = couponDetail.validityType;
	                if (couponDetail.validityType == 0) {
	                    this.validType.time = couponDetail.relativeTime;
	                } else if (couponDetail.validityType == 1) {
	                    this.validType.startTime = (couponDetail.startTime - 0) * 1000;
	                    this.validType.endTime = (couponDetail.endTime - 0) * 1000;
	                }
	                this.useDate.index = couponDetail.periodSel;


	                if (couponDetail.periodSel == 1) {
	                    if (couponDetail.useTime && couponDetail.useTime.list) {
	                        this.useDate.week = this.changeArrToNeed(couponDetail.useTime.list, 'w');
	                    }

	                }
	                if (couponDetail.periodSel == 2) {
	                    if (couponDetail.useTime && couponDetail.useTime.list) {
	                        this.useDate.month = this.changeArrToNeed(couponDetail.useTime.list, "m");
	                    }
	                }
	                if (couponDetail.lowestConsume != 0) {
	                    this.useThreshold.index = 1;
	                    this.useThreshold.threshold = couponDetail.lowestConsume;
	                }
	                if (couponDetail.annotation) {
	                    this.annotation = couponDetail.annotation;
	                }
	                // 是否强制减免
	                if (couponDetail.isDiscount != 0) {
	                    this.compulsoryCredits.index = couponDetail.isDiscount;
	                }
	                // 最大使用上限
	                if (couponDetail.useLimit) {
	                    this.maxCeiling = couponDetail.useLimit;
	                }
	                // 面额
	                if (couponDetail.param) {
	                    this.denomination = couponDetail.param;
	                }
	                // 入账金额
	                if (couponDetail.billPrice) {
	                    this.netAmount = couponDetail.billPrice;
	                }
	                // 结算金额
	                if (couponDetail.reckoningPrice) {
	                    this.setAmount = couponDetail.reckoningPrice;
	                }

	                if (couponDetail.useKnow) {
	                    this.useKnow = couponDetail.useKnow;
	                }
	                if (couponDetail.delayHours == 0) {
	                    this.validTime.index = 0;
	                } else {
	                    for (var i = 0; i < this.validTime.list.length; i++) {
	                        if (this.validTime.list[i] == couponDetail.delayHours) {
	                            this.validTime.index = i;
	                        }
	                    }
	                }
	            }
	        },
	        changeArrToNeed(arr, type) {
	            var na = [];
	            for (var i = 0; i < arr.length; i++) {
	                var obj = {};
	                obj.startslotH = arr[i].startslot.split(":")[0];
	                obj.startslotM = arr[i].startslot.split(":")[1];
	                obj.endslotH = arr[i].endslot.split(":")[0];
	                obj.endslotM = arr[i].endslot.split(":")[1];
	                obj.isNextDay = arr[i].isNextDay;
	                if (type == "w") {
	                    obj.week = arr[i].week;
	                } else if (type == "m") {
	                    obj.month = arr[i].month;
	                }
	                na.push(obj);
	            }
	            return na;
	        },
	        changeItemIndex(item, index) {
	            this[item].index = index;
	        },
	        showCalendar() {
	            this.isShowCa = !this.isShowCa
	        },
	        transformDate(t) {
	            return utils.format(new Date(t), 'yyyy-MM-dd');
	        },
	        selectItemShow(item) {
	            this[item].show = !this[item].show;
	        },
	        getValidDay() { //获取一共多少天
	            return Math.floor((this.validType.endTime - this.validType.startTime) / (24 * 3600 * 1000) + 1)
	        },
	        hasItemInArr(item, arr, type) {
	            if (arr.indexOf(item) == -1) {
	                return false;
	            }
	            if (type) {
	                return arr.indexOf(item);
	            }
	            return true;
	        },
	        addUseDate() {
	            if (this.useDate.index == 1) {
	                if (this.useDate.week.length < 5) {
	                    var obj = {
	                        "startslotH": '12',
	                        "startslotM": '00',
	                        "endslotH": '00',
	                        "endslotM": '00',
	                        "isNextDay": false,
	                        "week": []
	                    };
	                    this.useDate.week.push(obj);
	                } else {
	                    this.valiData('使用时段限制最多只能五个', '温馨提示')

	                }
	            } else if (this.useDate.index == 2) {
	                if (this.useDate.month.length < 5) {
	                    var obj = {
	                        "startslotH": '12',
	                        "startslotM": '00',
	                        "endslotH": '00',
	                        "endslotM": '00',
	                        "isNextDay": false,
	                        "month": []
	                    };
	                    this.useDate.month.push(obj);
	                } else {
	                    this.valiData('使用时段限制最多只能五个', '温馨提示')
	                }
	            }
	        },
	        changeUseTime(index, worm, sore, type) {
	            var obj = this.useDate[worm][index];

	            function zero(num) {
	                if (num < 10) {
	                    return "0" + num;
	                } else {
	                    return num;
	                }
	            }
	            var m;
	            if (sore == 's') {
	                m = 'startslotM'
	            } else {
	                m = 'endslotM'
	            }
	            if (type == "add") {
	                obj[m] -= 0;
	                if (obj[m] < 59) {
	                    obj[m]++;
	                    obj[m] = zero(obj[m]);
	                } else {
	                    obj[m] = '00';
	                    var item;
	                    if (sore == 's') {
	                        item = "startslotH"
	                    } else {
	                        item = "endslotH"
	                    }
	                    obj[item] -= 0;
	                    if (obj[item] >= 23) {
	                        obj[item] = '00';
	                    } else {
	                        obj[item]++;
	                        obj[item] = zero(obj[item]);
	                    }
	                }

	            } else {
	                obj[m] -= 0;
	                if (obj[m] > 0) {
	                    obj[m]--;
	                    obj[m] = zero(obj[m]);
	                } else {
	                    obj[m] = 59;
	                    var item;
	                    if (sore == 's') {
	                        item = "startslotH"
	                    } else {
	                        item = "endslotH"
	                    }
	                    obj[item] -= 0;
	                    if (obj[item] <= 1) {
	                        obj[item] = "23";
	                    } else {
	                        obj[item]--;
	                        obj[item] = zero(obj[item]);
	                    }
	                }
	            }

	            this.useDate[worm].splice(index, 1, obj);

	        },
	        delectedOneDate(type, index) {
	            if (type == "month") {
	                this.useDate.month.splice(index, 1);
	            } else {
	                this.useDate.week.splice(index, 1);
	            }

	        }, //删除一条
	        cleanUseDate() {
	            if (this.useDate.index == 1) {
	                this.useDate.week = [];
	            } else if (this.useDate.index == 2) {
	                this.useDate.month = [];
	            }
	        },
	        selectWeek(w, d) {
	            var week = this.useDate.week[w].week;
	            if (!this.hasItemInArr(d, week)) {
	                week.push(d);
	            } else {
	                week.splice(week.indexOf(d), 1);
	            }
	            this.useDate.week[w].week = week;
	        }, //选择周
	        openMonth(index) {
	            if (this.openMonthIndex == index) {
	                this.openMonthIndex = -1;
	            } else {
	                this.openMonthIndex = index;
	            }

	        },
	        selectMonth(w, d) {
	            var month = this.useDate.month[w].month;
	            if (!this.hasItemInArr(d, month)) {
	                month.push(d);
	            } else {
	                month.splice(month.indexOf(d), 1);
	            }
	            this.useDate.month[w].month = month;
	        }, //选择月
	        selectClean(index) {
	            this.useDate.month[index].month = [];
	        }, //清空月的选择
	        selectAll(index) {
	            this.useDate.month[index].month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
	        },
	        changeNextday(w, type) {
	            if (type == "month") {
	                this.useDate.month[w].isNextDay = !this.useDate.month[w].isNextDay;
	            } else {
	                this.useDate.week[w].isNextDay = !this.useDate.week[w].isNextDay;
	            }

	        }, //是否隔天
	        openGoodsWindow() {
	            if (this.selectShops.length == 0 && this.ischain) {
	                this.valiData('请先选择店铺', '提示信息')
	                return false;
	            }
	            this.goodsWin = true;
	        },
	        openShopWin() {
	            this.shopWin = true
	        }
	    },
	    updated() {
	        console.log(this.runHeard)
	    },
	    mounted() {
	        if (/\/addCoupon/.test(this.$route.path)) {
	            storage.session("couponDetail", "");
	        }
	        let userData = storage.session("userShop");
	        this.ischain = false;
	        if (userData.currentShop.ischain == 3) {
	            this.ischain = true;
	        }
	        this.init()
	    },
	    components: {
	        'can-multi': () =>
	            import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
	        // 'coupon-goods-win': () =>
	        //     import ( /* webpackChunkName:"coupon_goods_win" */ "./coupon_goods_win"),
	        'coupon-shop-win': () =>
				import ( /* webpackChunkName:"coupon_shop_win" */ "./coupon_shop_win"),
			goodListWin: () =>
				import(/* webpackChunkName:"good_list_win" */ 'src/components/good_list_win'),
	    }
	}
</script>
<style type="text/css" scoped>
	#add-coupons .oUl .oLi {
	    width: 300px;
	    height: 200px;
	    float: left;
	    margin-right: 20px;
	    margin-top: 30px;
	}
	#add-coupons .oUl .toreduce {
	    background-image: url('../../res/images/toreduce.png');
	    background-repeat: no-repeat;
	}
	#add-coupons .oUl .todiscount {
	    background-image: url('../../res/images/todiscount.png');
	    background-repeat: no-repeat;
	}
	#add-coupons .oUl .togift {
	    background-image: url('../../res/images/togift.png');
	    background-repeat: no-repeat;
	}
	#add-coupons .oUl .todai {
	    background-image: url('../../res/images/todai.png');
	    background-repeat: no-repeat;
	}
	#add-coupons .oUl .oLi .oBottom {
	    width: 100%;
	    height: 143px;
	    padding-top: 18px;
	}

	#add-coupons .oUl .oLi .oBottom .oBLeft {
	    width: 100%;
	    height: 84px;
	    padding: 0 71px 0 25px;
	}

	#add-coupons .oUl .oLi .oBottom .oBLeft h3 {
	    line-height: 26px;
	    font-size: 16px;
	    font-weight: normal;
	    color: #333;
	}

	#add-coupons .oUl .oLi .oBottom .oBRight {
	    width: 100%;
	    height: auto;
	}

	#add-coupons .oUl .oLi .oBottom .oBRight .addcoupon {
	    width: 83px;
	    font-size: 20px;
	    height: 22px;
	    text-align: center;
	    line-height: 19px;
	    color: #6CC2E6;
	    border-bottom: 1px solid #6CC2E6;
	    float: right;
	    margin-right: 20px;
	    cursor: pointer;
	}

	#add-coupons .set-coupons {
		width: 100%;
	    max-width: 1200px;
	    line-height: 40px;
	    text-align: center;
	    color: #333;
	    overflow: hidden;
	    padding-bottom: 300px;
	    position: relative;
	}

	#add-coupons .set-coupons .save-coupon {
	    position: absolute;
	    bottom: 60px;
	    left: 180px;
	}

	#add-coupons .set-coupons .type {
	    width: 100%;
	    padding-left: 40px;
	    overflow: hidden;
	    height: 40px;
	}

	#add-coupons .set-coupons .type div {
	    width: 125px;
	    height: 100%;
	    float: left;
	    background-color: #f2f2f2;
	    cursor: pointer;
	}

	#add-coupons .set-coupons .type div.selected {
	    background-color: #28a8e0;
	    color: #FFF;
	}

	#add-coupons .set-coupons .set-line {
	    width: 1000px;
	    height: 28px;
	    line-height: 28px;
	    border-left: 4px solid #28a8e0;
	    margin: 15px 0 35px;
	    position: relative;
	}

	#add-coupons .set-coupons .set-line .title {
	    float: left;
	    margin-left: 12px;
	    width: 70px;
	    font-size: 16px;
	    text-align: left;
	}

	#add-coupons .set-coupons .set-line .line {
	    display: inline-block;
	    width: 900px;
	    border-bottom: 1px dashed #d9d9d9;
	    margin-bottom: 5px;
	}

	#add-coupons .set-coupons .left,
	#add-coupons .set-coupons .right {
	    height: 40px;
	    float: left;
	    margin-bottom: 15px;
	}

	#add-coupons .set-coupons .left {
	    color: #000000;
	    width: 170px;
	}

	#add-coupons .set-coupons .right {
	    width: 970px;
	}

	#add-coupons .set-coupons .right .fl {
	    padding-left: 10px;
	}

	#add-coupons .set-coupons .right .buttons {
	    padding: 0 10px 0 40px;
	    background-color: #28a8e0;
	    height: 40px;
	    width: 120px;
	    cursor: pointer;
	    float: left;
	    color: #FFF;
	    position: relative;
	    transition: background-color ease-in-out 0.2s;
	}

	#add-coupons .set-coupons .right .buttons:hover {
	    background-color: #2a80b9;
	}

	#add-coupons .set-coupons .right .buttons img {
	    position: absolute;
	    top: 11px;
	    left: 15px;
	}

	#add-coupons .set-coupons .left .text {
	    float: right;
	    height: 100%;
	    padding: 0 10px;
	    text-align: right;
	}

	#add-coupons .set-coupons .right .line {
	    width: 100%;
	    height: 40px;
	    padding-left: 10px;
	}

	#add-coupons .set-coupons .right .line .radio {
	    padding: 0 15px;
	    width: 100px;
	    float: left;
	    border: 1px solid #C1C2C3;
	    margin-right: 10px;
	    cursor: pointer;
	}

	#add-coupons .set-coupons .right .line .selectradio {
	    border-color: #F1801A;
	    background-color: #fdf2E0;
	    color: #F1801A;
	}

	#add-coupons .set-coupons .right .list {
	    text-align: left;
	    text-indent: 10px;
	    width: 190px;
	    position: absolute;
	    top: 40px;
	    left: 0;
	    border: 1px solid #999;
	    border-top: none;
	    z-index: 333;
	    background-color: #FFF;
	}

	#add-coupons .set-coupons .right .list ul {
	    width: 100%;
	}

	#add-coupons .set-coupons .right .list ul li {
	    width: 100%;
	    height: 40px;
	}

	#add-coupons .set-coupons .right .list ul li:hover {
	    background-color: #edeff0;
	}

	#add-coupons .set-coupons .select-week {
	    width: 100%;
	    overflow: hidden;
	    float: left;
	    margin-bottom: 10px;
	}

	#add-coupons .set-coupons .show-week {
	    width: 800px;
	    padding-left: 180px;
	    height: 40px;
	}

	#add-coupons .set-coupons .show-week ul li {
	    width: 66px;
	    height: 38px;
	    border: 1px solid #2393D6;
	    float: left;
	    margin-right: 10px;
	    color: #2393D6;
	    cursor: pointer;
	}

	#add-coupons .set-coupons .show-week ul li.selected {
	    background-color: #2393D6;
	    color: #FFF;
	}

	#add-coupons .set-coupons .time {
	    width: 120px;
	    height: 42px;
	    line-height: 40px;
	    border: 1px solid #999;
	}

	#add-coupons .set-coupons .time .time-change {
	    width: 20px;
	    height: 38px;
	    float: right;
	    border-left: 1px solid #999;
	    position: relative;
	}

	#add-coupons .set-coupons .time .time-change div {
	    position: absolute;
	    width: 0;
	    height: 0;
	    border-left: 6px solid transparent;
	    border-right: 6px solid transparent;
	    left: 3px;
	    cursor: pointer;
	}

	#add-coupons .set-coupons .blueBySelect {
	    background-color: #2393D6!important;
	}
	.show-days {
	    position: absolute;
	    top: 42px;
	    left: 0;
	    width: 240px;
	    padding: 10px;
	    padding-bottom: 50px;
	    background-color: #fff;
	    z-index: 333;
	    border: 1px solid #999;
	    border-top: none;
	}

	.show-days ul li {
	    width: 32px;
	    height: 32px;
	    text-align: center;
	    line-height: 32px;
	    float: left;
	    margin: 2px;
	    border: 1px solid #999;
	    cursor: pointer;
	}

	.show-days ul li.select {
	    background-color: #2393D6;
	    color: #FFF;
	}
	@media screen and (min-width:1024px) and (max-width:1440px){
		#add-coupons .set-coupons .set-line {
	    width: 100%;
	    height: 28px;
	    line-height: 28px;
	    border-left: 4px solid #28a8e0;
	    margin: 15px 0 35px;
	    position: relative;
	}
		#add-coupons .set-coupons .set-line .line {
	    display: inline-block;
	    width: 79%;
	    border-bottom: 1px dashed #d9d9d9;
	    margin-bottom: 5px;
	}
	#add-coupons .set-coupons {
		width: 780px;
		line-height: 40px;
		text-align: center;
		color: #333;
		overflow: hidden;
		padding-bottom: 300px;
		position: relative;
	}
	#add-coupons .set-coupons .left{
    color: #000000;
    width: 110px;
}
#add-coupons .set-coupons .right{
    width: 600px;
}
		
	}
</style>