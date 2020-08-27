<template>
	<view class="content">
		<!-- 设备选择模态框列表 -->
		<view v-if='devicesList.length != 0 && modifyStatus' class='uni-popup__mask' @click='canclemodfity'></view>
		<view v-if='devicesList.length != 0 && modifyStatus'>
			<scroll-view class="device_list" scroll-y="true" show-scrollbar="true">
				<radio-group>
					<view v-for="(item,index) in devicesList" :key="index" class="device_item" v-if="item.name.length>0">
						<view style="font-size: 32rpx; color: #333;">
							<radio :value="item.deviceId" @tap="select_deviceId(item)" />{{item.name }}</view>
						<view style="font-size: 20rpx">{{langtype=='CH'?langch.signalstrength:langen.signalstrength}}: {{item.RSSI}}dBm ({{Math.max(100+item.RSSI,0)}}%)</view>
						<view style="font-size: 20rpx">deviceId: {{item.deviceId}}</view>
						<view style="font-size: 20rpx">Service{{langtype=='CH'?langch.number:langen.number}}: {{item.advertisServiceUUIDs.length || 0}}</view>
			
						<radio-group v-if="deviceId===item.deviceId">
							<view v-for="(service,service_index) in serviceList" :key="service_index" style="font-size: 20rpx">
								<radio style="transform:scale(0.7)" :value="service.uuid" @tap="select_service(service)" />{{service.uuid }}
							</view>
						</radio-group>
					</view>
				</radio-group>
			</scroll-view>
		</view>
		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
			   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image  :src="baseUrl+avatar"  class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
				<view class="controlpanel" @click='gocontrolpanel'>{{langtype=='CH'?langch.control:langen.control}}</view>
			</view>
			<view class="title">
				<view class=" text-white">{{langtype=='CH'?langch.todaydata:langen.todaydata}}</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>{{langtype=='CH'? '星期'+ week : weekarray}}</view>
				<view>{{year}}/{{month}}</view>
			</view>		
		</view>
		<!-- 日期选择完成切换显示页面 -->
		<view class='datacontent'>
			<view class="middle flexs3 text-center text-bold">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="changetitle(0)">{{langtype=='CH'?langch.zuijia:langen.zuijia}}</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="changetitle(1)">{{langtype=='CH'?langch.youxiao:langen.youxiao}}</view>
				<!-- <view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="changetitle(2)">{{langtype=='CH'?langch.laji:langen.laji}}</view> -->
				<!-- <view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="changetitle(3)">{{langtype=='CH'?langch.common:langen.common}}</view> -->
			</view>
			<view class="bigbox" v-show="Inv == 0">
				<view class="big_title flexs3 ">
					<view class="titlename flexs3 text-bold">
						<view>{{langtype=='CH'?langch.shijian:langen.shijian}}</view>
						<view>L</view>
						<view>R</view>
					</view>
				</view>
				<block v-if='datalist.length != 0'>
					<!-- @scrolltoupper='scrolltoupper' -->
					<scroll-view scroll-y="true" class="biglist" @scrolltolower='scrolltolower' >
						<view class="list_one flexs2 " v-for="(item,index) in datalist" :key="index" >
							<view class="list1 flexs">
								<view>{{item.createtime}}</view>
							</view>
							<!-- <view>{{0 == ' '}}</view>  结果是true-->
							<!-- 把item.l 改成 item.l ！= ' ' 判断条件一样效果 -->
							<view class="list2 flexs">
								<view v-if="item.l!= ' '" class='numstyle'>{{item.l}}</view>
								<checkbox-group @change="checkboxChange(index)" v-if="item.l!= ' '"> 
								<checkbox class='round blue' :class="{checked:item.checked}" 
								 value="C"></checkbox>
								</checkbox-group>
							</view>
							<view class="list2 flexs">
								<view v-if="item.r!= ' '" class='numstyle'>{{item.r}}</view>
								<checkbox-group @change="checkboxChange(index)" v-if="item.r!= ' '">
								<checkbox class='round blue ' :class="{checked:item.checked}"
								 value="C"></checkbox>
								</checkbox-group>
							</view>
						</view>
					</scroll-view>
				</block>
				<block v-else>
					<view class="biglist nodata">{{langtype=='CH'?langch.nodata:langen.nodata}}</view>
				</block>
			</view>
			<view class="bigbox" v-show="Inv == 1">
				<view class="big_title flexs3 ">
					<view class="titlename flexs3 text-bold">
						<view>{{langtype=='CH'?langch.shijian:langen.shijian}}</view>
						<view>L</view>
						<view>R</view>
					</view>
				</view>
				<block v-if='validdatalist.length != 0'>
					 <!-- @scrolltoupper='scrolltoupper' -->
					<scroll-view scroll-y="true" class="biglist"  @scrolltolower='scrolltolower'>
						<view class="list_one flexs2 " v-for="(item,index) in validdatalist" :key="index" >
							<view class="list1 flexs">
								<view>{{item.createtime}}</view>
							</view>
							<view class="list2 flexs">
								<view v-if="item.l!= ' '" class='numstyle'>{{item.l}}</view>
								<checkbox-group @change="checkboxChange1(index)" v-if="item.l!= ' '"> 
								<checkbox class='round blue' :class="{checked:item.checked}" 
								 value="C"></checkbox>
								</checkbox-group>
							</view>
							<view class="list2 flexs">
								<view v-if="item.r!= ' '" class='numstyle'>{{item.r}}</view>
								<checkbox-group @change="checkboxChange1(index)" v-if="item.r!= ' '">
								<checkbox class='round blue ' :class="{checked:item.checked}"
								 value="C"></checkbox>
								</checkbox-group>
							</view>
						</view>
					</scroll-view>
				</block>
				<block v-else>
					<view class="biglist nodata">{{langtype=='CH'?langch.nodata:langen.nodata}}</view>
				</block>
			</view>
			<!-- <view class="bigbox" v-show="Inv == 2">
				<view class="big_title flexs3 ">
					<view class="titlename flexs3 text-bold">
						<view>{{langtype=='CH'?langch.shijian:langen.shijian}}</view>
						<view>L</view>
						<view>R</view>
					</view>
				</view>
				
					<scroll-view scroll-y="true" class="biglist"  @scrolltolower='scrolltolower' @scrolltoupper='scrolltoupper'>
						<view class="list_one flexs2 " v-for="(item,index) in garbagedatalist" :key="index" >
							<view class="list1 flexs">
								<view>{{item.createtime}}</view>
							</view>
							<view class="list2 flexs">
								<view v-if='item.l' class='numstyle'>{{item.l}}</view>
								<checkbox-group @change="checkboxChange2(index)" v-if='item.l'> 
								<checkbox class='round blue' :class="{checked:item.checked}" 
								 value="C"></checkbox>
								</checkbox-group>
							</view>
							<view class="list2 flexs">
								<view v-if='item.r' class='numstyle'>{{item.r}}</view>
								<checkbox-group @change="checkboxChange2(index)" v-if='item.r'>
								<checkbox class='round blue ' :class="{checked:item.checked}"
								 value="C"></checkbox>
								</checkbox-group>
							</view>
						</view>
					</scroll-view>
				
				</view> -->
<!-- 			<view class="bigbox" v-show="Inv == 3">
				<view class="big_title flexs3 ">
					<view class="titlename flexs3 text-bold">
						<view>{{langtype=='CH'?langch.shijian:langen.shijian}}</view>
						<view>L</view>
						<view>R</view>
					</view>
				</view>
				<view class="biglist"  >
					<view class="list_one flexs2 " v-for="(item,index) in commonlist" :key="index" >
						<view class="list1 flexs">
							<view>{{item.time}}</view>
						</view>
						<view class="list2 flexs3">
							<view v-if='item.L'>{{item.L}}</view>
							<checkbox-group @change="checkboxChange3(index)" v-if='item.L'> 
							<checkbox class='round blue' :class="{checked:item.checked}" 
							 value="C"></checkbox>
							</checkbox-group>
						</view>
						<view class="list2 flexs3">
							<view v-if='item.R'>{{item.R}}</view>
							<checkbox-group @change="checkboxChange3(index)" v-if='item.R'>
							<checkbox class='round blue ' :class="{checked:item.checked}"
							 value="C"></checkbox>
							</checkbox-group>
						</view>
					</view>
				</view>
			</view> -->
			<view class="bottombox text-center flexs3">
				<view class="submit addbackcolor" @click='lookreport' 
				>{{langtype=='CH'?langch.chakanbaogao:langen.chakanbaogao}}</view>
				<view class="submit addbackcolor"  @click='deleteclick'
				>{{langtype=='CH'?langch.shanchu:langen.shanchu}}</view>
				<view class="submit addbackcolor" @click='realtimemeasurement'
				>{{langtype=='CH'?langch.realtimemeasurement:langen.realtimemeasurement}}</view>
				<view class="submit" :class="{'addbackcolor':printstatus}" @click='printbluetooth'>
				{{langtype=='CH'? (canprint ?langch.printreport : langch.printing): (canprint ?langen.printreport : langen.printing)}}
				</view>
			</view>
		</view>
		
		
		<!-- 模态框 -->
		<delete-hint :isShow='isShow' @cancleclick='cancleclick' :islangtype='langtype' @tureclick='tureclick' :title='title' @closemod='closemod'></delete-hint>
		<!-- 上拉加载显示 -->
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>
<script>
	import deleteHint from '@/pages/hint/deletehint.vue'
	import PrinterJobs from '@/common/print/printerjobs.js'
	import printerUtil from '@/common/print/printerutil.js'
	import util from '@/common/print/util.js'
	import drawQrcode from '@/common/print/weapp.qrcode.esm.js'
	import Bluetooth from '@/common/print/bluetooth.js'
	
	let bluetooth = new Bluetooth();
	export default {
		components: {
			deleteHint
		},
		data() {
			return {
				// 蓝牙选择默认显示
				modifyStatus:true,
				seeagain:true,
				
				// 是否显示模态框
				isShow: false,
				// 模态框显示的内容
				title: '是否删除数据',
				
				// 打印连接状态判断
				printstatus: false,
				// 默认是可以的打印的
				canprint: true,
				
				baseUrl:this.$common.baseUrl,
				// 接收请求回来的最佳数据
				datalist:[],
				// 有效数据
				validdatalist:[],
				// 普通数据
				commonlist:[],
				// 垃圾数据
				garbagedatalist:[],

				Inv:0,
				// 请求有效数据,最佳数据,垃圾数据区分
				type:'',
				
				loadMoreText:'加载中...',
				// 是否显示上拉请求数据提示
				showLoadMore: false,
				page: 1,
				limit: 20,
				lisize: 0, //本次加载数量
				
				langch:{
					chakanbaogao:'查看动态报告',
					realtimemeasurement:'实时测量',
					printreport:'打印报告',
					printing: '打印中',
					shanchu:'删除',
					shijian:'时间',
					zuijia:'最佳数据',
					youxiao:'有效数据',
					laji:'垃圾数据',
					quantian:'全天数据',
					common:'一般数据',
					control:'控制面板',
					todaydata:'当天数据',
					signalstrength:'信号强度',
					number:'数量',
					nodata:'暂无数据'
				},
				langen:{
					chakanbaogao:'View report',
					realtimemeasurement:'real-time measurement',
					printreport:'printreport',
					printing: 'printing',
					shanchu:'delete',
					shijian:'time',
					zuijia:'optimum',
					youxiao:'Effective',
					laji:'garbage',
					quantian:'All day',
					common:'common',
					control:'control panel',
					todaydata:'today data',
					signalstrength:'signal strength',
					number:'number',
					nodata:'nodata'
				},
				langtype:'',
				year: '',
				// time: new Date().getHours(),
				week: '',
				weekarray:'',
				month: '',
				day: '',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				
				// 选中打印数据数组
				printdata:[],
				isOpenBle: false, //是否已经打开蓝牙，默认为false
				devicesList: [], //设备列表
				serviceList: [], //服务列表
				deviceId: "", //选中的deviceId
				serviceId:"",//选中的serviceId
				notifyId:""
				}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
			this.getTime()
			this._searchtodayData()
		},
		onLoad() {
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function(res) {
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// });
			
			if (uni.getStorageSync("deviceId") && uni.getStorageSync("serviceId")) {
				this.printstatus = true
			}
		},
		onUnload() {
			this.data = []//这是哪来的变量
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
			// bluetooth.closeBLEConnection();
			// bluetooth.closeBluetoothAdapter();
		},

		methods: {
			//搜索周边设备
			startBluetoothDeviceDiscovery() {
				uni.showLoading({
					title: '蓝牙搜索中'
				})
			
				let self = this;
				self.devicesList = [];
			
				setTimeout(() => {
					uni.startBluetoothDevicesDiscovery({
						success: res => {
							uni.onBluetoothDeviceFound(devices => {
								console.log("发现设备: " + JSON.stringify(devices));
								//不重复,就添加到devicesList中,
								if (!self.devicesList.some(item => {
										return item.deviceId === devices.devices[0].deviceId
									})) {
									self.devicesList.push(devices.devices[0])
									if(this.seeagain){
									this.modifyStatus = true
									uni.hideLoading();
									}
								}
							});
						},
						fail: res => {
							uni.hideLoading();
							self.showToast(`搜索设备失败` + JSON.stringify(err));
						}
					})
				}, 200)
			},
			//选中设备
			async select_deviceId(item) {
				this.deviceId = item.deviceId;
				console.log(item.deviceId,'点击获取的deviceId')
				bluetooth.deviceId = item.deviceId;
				uni.setStorageSync('deviceId', bluetooth.deviceId);
				
				this.serviceList = [];
			
				try {
					//1.链接设备
					let result = await bluetooth.createBLEConnection();
					//2.寻找服务
					let result2 = await bluetooth.getBLEDeviceServices();
			
					console.log("获取服务: " + JSON.stringify(result2));
			
					this.serviceList = result2;
					console.log(this.serviceList,'获取设备')
					// 自己家设备默认第二个服务
					// this.select_service(this.serviceList[1])
					// 客户默认第三个服务
					this.select_service(this.serviceList[2])
				} catch (e) {
					//TODO handle the exception
					console.log("e: " + JSON.stringify(e));
				}
			},
			
			//选中服务
			async select_service(res) {
				this.modifyStatus = false
				// 一旦选中弹框,就算再搜索到新设备也不能让弹框再显示
				this.seeagain = false
				let self = this;
				bluetooth.serviceId = res.uuid;
				uni.setStorageSync('serviceId', res.uuid);
				// 选中服务打印按钮改变
				this.printstatus = true
				this.$api.msg('请再按一次打印')
				// try {
				// 	let result = await bluetooth.getBLEDeviceCharacteristics();
				// 	console.log(result,'执行吗')
				// 	if(result){
				// 	bluetooth.notifyBLECharacteristicValue();
				// 	setTimeout(() => {
				// 		self.writeBLECharacteristicValue();
				// 	}, 500);
						
				// 	}
				// } catch (e) {
				// 	console.log("e: " + JSON.stringify(e));
				// }
			
			},
			
			scrolltolower(){
				this.showLoadMore = true
				setTimeout(() => {
					//获取数据
					if (this.lisize == 20){//
						this.page++;
						this._searchtodayData()
					}else{
						this.loadMoreText = "暂无更多";
						this.showLoadMore = false;
					}
					
				}, 1000)
			},
			// scrolltoupper(){
			// 	this.page = 1;
			// 	this._searchtodayData()
			// 	setTimeout(function() {
			// 		//初始化数据
			// 		uni.stopPullDownRefresh(); //停止下拉刷新
			// 	}, 1000);
			// },
			gocontrolpanel(){
				uni.reLaunch({
					url:'/pages/personalCenter/personalCenter'
				})
			},
			// 实时测量
			// 第一步就是断开当前打印机蓝牙
			realtimemeasurement(){
				if(uni.getStorageSync("deviceId")){
					let deviceId = uni.getStorageSync("deviceId");
					uni.closeBLEConnection({
						deviceId,
						success(res) {
							console.log(res, '断开打印机蓝牙链接success')
							// 断开success告诉页面是否自动连接录入设备蓝牙，传个状态
							
							// 还要传一个到本地,阻止每次返回realtime页面onshow都会自动执行监听,而是自动一步步连接自动开启监听
							uni.setStorageSync('autorealtime',false)
							uni.navigateTo({
								url:'../realtime/realtime?contentrntering=1'
							})
						},
						fail(res) {
							console.log(res)
						}
					})
				}
			},
			back(){
				uni.navigateTo({
					url:'../realtime/realtime'
				})
			},
			getTime: function() {
					var aData = new Date();
					this.year = aData.getFullYear();
					this.month = aData.getMonth() + 1;
					let weeks = ['日', '一', '二', '三', '四', '五', '六']
					let weekEnglish  = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
					this.week = weeks[aData.getDay()]
					this.weekarray = weekEnglish[aData.getDay()]
					this.day = aData.getDate();
			},
			// 查询当天数据
			_searchtodayData(){
				// 不通的数据请求参数不通
				if(this.Inv==0){
					this.type = 1
				}
				if(this.Inv==1){
					this.type = 2
				}
				if(this.Inv==2){
					this.type = 3
				}
				let obj = {
					time:this.year+'-'+this.month+'-'+this.day,
					page:this.page,
					limit:this.limit,
					type:this.type
				}
				this.$common.requests('/api/index/getoneday',obj).then(res=>{
					this.showLoadMore = false;
					if(res.data.code == 1){
						this.lisize = res.data.data.length;
						if(this.page == 1){
							// 请求成功,不通数据不通变量接收渲染
							if(this.Inv==0){
								console.log(this.datalist,'一页')
								this.datalist = res.data.data
							}
							if(this.Inv==1){
								console.log(this.validdatalist,'一页')
								this.validdatalist = res.data.data
							}
							if(this.Inv==2){
								this.garbagedatalist = res.data.data
							}
						}else{
							// 不通数据对应不通的下拉刷新，添加数据进对应变量数组
							if(this.Inv==0){
								this.datalist = this.datalist.concat(res.data.data); 
							}
							if(this.Inv==1){
								this.validdatalist = this.validdatalist.concat(res.data.data); 
							}
							if(this.Inv==2){
								this.garbagedatalist = this.garbagedatalist.concat(res.data.data); 
								
							}
							
						}
					}
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
				
			},
			// 切换标题
			changetitle(index){
				this.Inv=index
				// 每次切换标题都得重新请求数据
				this.page = 1
				this._searchtodayData()
			},
			// 监听最佳数据选中框选择
			checkboxChange(index){
				// 把未选中变成选中状态,选中变成未选中状态
				this.datalist[index].checked = !this.datalist[index].checked
			},
			// 监听有效数据选中框选择
			checkboxChange1(index){
				// 把未选中变成选中状态,选中变成未选中状态
				this.validdatalist[index].checked = !this.validdatalist[index].checked
			},
			// 监听垃圾数据选中框选择
			checkboxChange2(index){
				// 把未选中变成选中状态,选中变成未选中状态
				this.garbagedatalist[index].checked = !this.garbagedatalist[index].checked
			},
			// 监听普通数据
			checkboxChange3(index){
				// 把未选中变成选中状态,选中变成未选中状态
				this.commonlist[index].checked = !this.commonlist[index].checked
			},
			
			// 查看报表
			// 跳转显示折现图页面
			lookreport(){
				var checkedid = ''
				if(this.Inv==0){
					// 后台要求删除多个选中id之间用,隔开
					this.datalist.forEach(item=>{
						if(item.checked == true){
							checkedid  += (item.id + ',') 
						}
					})
				}
				if(this.Inv==1){
					// 后台要求删除多个选中id之间用,隔开
					this.validdatalist.forEach(item=>{
						if(item.checked == true){
							checkedid  += (item.id + ',') 
						}
					})
				}

				checkedid = checkedid.substring(0,checkedid.length-1)
				console.log(checkedid,'选中的id')
				// 当选中是空是展示所有数据
				if(checkedid == ''){
					if(this.Inv == 0){
						this.datalist.forEach(item=>{
							checkedid  += (item.id + ',') 
						})
					}
					if(this.Inv == 1){
						this.validdatalist.forEach(item=>{
								checkedid  += (item.id + ',') 
						})
					}
				}
				// 把当前选中id带到折线图页面
				if(this.Inv==0){
					uni.navigateTo({
						url:'../bestlinechart/bestlinechart?checkedid='+checkedid+'&pickerDate='+this.year+'-'+this.month+'-'+this.day + '&Inv=0'
					})
				}
				if(this.Inv==1){
					uni.navigateTo({
						url:'../linechart/linechart?checkedid='+checkedid+'&pickerDate='+this.year+'-'+this.month+'-'+this.day + '&Inv=1'
					})
				}
			},
			// 蓝牙打印数据
			async printbluetooth() {
				// 断开录入设备蓝牙链接(我单独封装断开录入数据蓝牙js)
				// await this.$closeBLEConnection.closeBLEConnection(uni.getStorageSync('pressuredeviceId'),uni.getStorageSync('connectbloothindex'),uni.getStorageSync('isLink'))
				// console.log(uni.getStorageSync('connectbloothindex'))
				// console.log(uni.getStorageSync('pressuredeviceId'))
				// console.log(uni.getStorageSync('isLink'))
				// 打开蓝牙
				await bluetooth.openBluetoothAdapter();
				
				// 从本地取出上一个设备id,断开连接
				if (uni.getStorageSync("pressuredeviceId")) {
					let deviceId = uni.getStorageSync("pressuredeviceId");
					uni.closeBLEConnection({
						deviceId,
						success(res) {
							console.log(res)
						}
					})
				}
				
				var chooseprint = []
				// 判断是那个数据列表要打印
				// 后台要求多个选中id之间用,隔开
				if (this.Inv == 0) {
					if (this.datalist.length > 20) {
						for (var i = 0; i < 20; i++) {
							chooseprint.push(this.datalist[i])
						}
					} else {
						this.datalist.forEach(item => {
							if (item.checked == true) {
								chooseprint.push(item)
							}
						})
					}
				}
				if (this.Inv == 1) {
					if (this.validdatalist.length > 20) {
						for (var i = 0; i < 20; i++) {
							chooseprint.push(this.validdatalist[i])
						}
					} else {
						this.validdatalist.forEach(item => {
							if (item.checked == true) {
								chooseprint.push(item)
							}
						})
					}
				}
				// 当选中是空就是打印前20个数据
				if (chooseprint.length == 0) {
					if (this.Inv == 0)
						// 如果有数据长度大于20,就取前20打印
						if (this.datalist.length > 20) {
							for (var i = 0; i < 20; i++) {
								chooseprint.push(this.datalist[i])
							}
						} else {
							// 如果有数据长度小于20,就全部打印
							this.datalist.forEach(item => {
								chooseprint.push(item)
							})
						}
			
					if (this.Inv == 1) {
						if (this.validdatalist.length > 20) {
							for (var i = 0; i < 20; i++) {
								chooseprint.push(this.validdatalist[i])
							}
						} else {
							this.validdatalist.forEach(item => {
								chooseprint.push(item)
							})
						}
					}
				}
				// 拿到打印数据
				console.log(chooseprint, '打印数据')
				for (var mm = 0; mm < chooseprint.length; mm++) {
					if (chooseprint[mm].l == 0) {
						chooseprint[mm].l = ' '
					}
					if (chooseprint[mm].r == 0) {
						chooseprint[mm].r = ' '
					}
				}
				console.log(chooseprint, '处理后数据')
				// return
				this.printdata = chooseprint
			
				let self = this;
			
			
				console.log(uni.getStorageSync("deviceId"), '是否已连接设备id')
				console.log(uni.getStorageSync("serviceId"), '是否已连接服务id')
			
				// 如果存在设备id和服务id,就不连接,直接打印
				if (uni.getStorageSync("deviceId") && uni.getStorageSync("serviceId")) {
			
					this.deviceId = uni.getStorageSync("deviceId")
					this.serviceId = uni.getStorageSync("serviceId")
					await bluetooth.reconnect()
					if (this.canprint) {
						this.canprint = false
						setTimeout(()=>{
							self.mywriteBLECharacteristicValue();
							self.canprint = true
						},3000)
					} else {
						this.$api.msg('请稍后再试')
					}
				} else {
			
					this.startBluetoothDeviceDiscovery()
				}
			},
			//写入控制命令
			async mywriteBLECharacteristicValue() {
				var name  = this.username
				var timess = this.printdata
				// console.log(timess,'要打印的数据')
				var printlength = this.printdata.length
				let printerJobs = new PrinterJobs();
				printerJobs
					.print(util.formatTime(new Date()))
					.print(printerUtil.fillLine())
					.print(printerUtil.inline('NAME', name))
					.print(printerUtil.inline('DATE', util.formatTime(new Date())))
					.print(printerUtil.fillLine())
					.setSize(2, 2)
					.print('TIME    L    R')
					.println();
					for(var i=0;i<printlength;i++){
						printerJobs
						.setSize(1, 1)
						.print(`${timess[i].createtime}	${timess[i].l}	  ${timess[i].r}`)
					}
					printerJobs
					.print("")
					.print("")
				let buffer = printerJobs.buffer();
				
				await this.printbuffs(buffer);
			},
			printbuffs(buffer) {
				// 1.并行调用多次会存在写失败的可能性
				// 2.建议每次写入不超过20字节
				// 分包处理，延时调用
				const maxChunk = 20;
				const delay = 20;
				for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
					let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
					setTimeout(this.printbuff, j * delay, subPackage);
				}
			},
			
			printbuff(buffer) {
				bluetooth.writeBLECharacteristicValue(buffer);
			},
			
			
			
			// 单击删除
			deleteclick() {
				// 弹出模态框
				this.isShow = !this.isShow
			},
			// 弹出模态框关闭模态框
			closemod() {
				this.isShow = false
			},
			// 弹出模态框点击取消
			cancleclick() {
				this.isShow = !this.isShow
			},
			// 弹出模态框点击确定就删除选中数据
			tureclick() {
				this.isShow = !this.isShow
				var chooseid = ''
				// 判断是那个数据列表要删除
				// 后台要求删除多个选中id之间用,隔开
				if (this.Inv == 0) {
					this.datalist.forEach(item => {
						if (item.checked == true) {
							chooseid += (item.id + ',')
						}
					})
				}
				if (this.Inv == 1) {
					this.validdatalist.forEach(item => {
						if (item.checked == true) {
							chooseid += (item.id + ',')
						}
					})
				}
				if (this.Inv == 2) {
					this.garbagedatalist.forEach(item => {
						if (item.checked == true) {
							chooseid += (item.id + ',')
						}
					})
				}
				chooseid = chooseid.substring(0, chooseid.length - 1)
				// 当选中是空就是删除所有数据
				if(chooseid == ''){
					if(this.Inv == 0){
						this.datalist.forEach(item=>{
							chooseid  += (item.id + ',') 
						})
					}
					if(this.Inv == 1){
						this.validdatalist.forEach(item=>{
								chooseid  += (item.id + ',') 
						})
					}
				}
				var obj = {
					ids: chooseid
				}
				this.$common.requests('/api/record/del_record', obj).then(res => {
					uni.showToast({
						title: res.data.msg,
						duration: 1000
					});
					// 删除数据数据成功，立刻显示最新数据数据
					// 请求数据分析方法
					this.page = 1
					this._searchtodayData()
				})
			},
			// 消除模态框
			canclemodfity(){
				this.modifyStatus = false
			}
		}
				
				 
	}

</script>

<style>
	/* 头像样式 */
	.tx{
		border-radius: 50%;
	}
.content{
		height: 100vh;
		position: relative;
	}
	.head{
		height:260rpx;
		width:100%;
		background-color: #3F7BE9;
	}
	.head_title{
		width:30%;
		padding-top:60rpx;
		position: relative;
	}
	.head_img{
		width:24rpx;
		height:38rpx;
		margin-bottom: 30rpx;
	}
	.head_left{
		margin-left:30rpx
	}
	.head_left image{
		width:120rpx;
		height:120rpx;
	}
	.right{
		width:20%;
		letter-spacing: 4rpx;
		margin-top:40rpx;
	}
	.day{
		font-size:64rpx
	}
	.xl{
		   width:27rpx;
		   height:19rpx; 
		   position:absolute;
		   margin-left:600rpx;
		   margin-top:360rpx;
		}
	.xl_copy{
		   width:27rpx;
		   height:19rpx; 
		   position:absolute;
		   margin-left:600rpx;
		   margin-top:159rpx;
		}
	.datacontent{
		/* 减去头部,浮动和浮动本身高度 */
		/* height:calc(100vh - 380rpx) ; */
		height:calc(100vh - 260rpx) ;
		position: relative;
	}
	.nodata{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* 有数据显示 */
	.middle{
		width:92%;
		margin-top:30rpx;
		margin-left:30rpx;
		height:60rpx;
		line-height:60rpx;
		border-top:1px solid #D9D9D9;
		border-right:1px solid #D9D9D9;
		font-size:32rpx
	}
	.inv-h{
		background-color: #FFFFFF;
		color:#333333;
	}
	.inv-h-se{
		background-color: #3F7BE9;
		color:#FFFFFF;
	}
	.middle view{
		/* width: 33%; */
		width: 50%;
		border-right:none;
		border-bottom:1px solid #D9D9D9;
		border-left:1px solid #D9D9D9;
	}
	.title{
		width:35%;
		font-size: 40rpx;
		margin-top:100rpx;
	}
	.right{
		width:20%;
		letter-spacing: 4rpx;
	}
	.day{
		font-size:64rpx
	}
	.times{
		margin:20rpx 0;
		font-size:28rpx !important;
		letter-spacing: 8rpx;
	}
	.times_img{
		width:30rpx;
		height:30rpx;
		margin-right:20rpx;
	}
	.bigbox{
		margin-left:30rpx;
		height:54%
	}
	.big_title{
		width:96%;
		height:60rpx;
		line-height: 60rpx;
		background:#DBE8FB;
		margin-top:30rpx;
		color:#3F7BE9;
		
	}
	.biglist{
		width:96%;
		height:98%;
		border:1px solid #F0F0F0;
		border-bottom:none;
		font-size: 28rpx;
		line-height: 46rpx;
		letter-spacing: 1rpx;
		z-index: 9;
	}
/* 		overflow-x: hidden;
		overflow-y: scroll; */
	.titlename{
		width:100%;
	}
	.list1{
		width:50%;
		height:70rpx;
		line-height:70rpx ;
		border-bottom:1px solid #e5e5e5
	}
	.list2{
		width:50%;
		height:70rpx;
		line-height:70rpx ;
		border-right:none;
		border-bottom:1px solid #F0F0F0;
		border-left:1px solid #F0F0F0;
	}
	.numstyle{
		margin-right: 10rpx;
		width:40rpx;
		text-align: center;
	}
	.bottombox{
		width:100%;
		height:200rpx;
		/* border:1rpx solid red; */
		margin-top:100rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: flex-start;
	}
	.submit{
		width:40%;
		background-color: #BFBFBF;
		border-radius:42rpx;
		height:80rpx;
		margin:10rpx 0;
		line-height:80rpx;
		color:#F2FFFF;
	}
	.emplysubmit{
		height:80rpx;
		width:200rpx;
	}
	/* 动态添加背景颜色高亮 */
	.addbackcolor{
		color:#FFFFFF;
		background-color: #0081FF;
	}
	
	/* 设备列表模态框 */
	.uni-popup__mask {
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  z-index: 998;
	  background-color: rgba(0, 0, 0, 0.4);
	 }
	.device_list {
		border: 1rpx solid #ddd;
		border-radius: 10rpx;
		background-color: #FdFdFd;
		min-height: 0rpx;
		max-height: 400rpx;
		width: 700rpx;
		z-index:999;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50% , -50%);
	}
	
	.device_item {
		border-bottom: 1rpx solid #ddd;
		padding: 20rpx;
		color: #666;
	
	}
	
	.device_item_hover {
		background-color: rgba(0, 0, 0, .1);
	}
	/* 设备列表模态框 */
	
	.uni-loadmore {
		text-align: center;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		height:50rpx;
		line-height: 50rpx;
	}
	.controlpanel{
		width:180rpx;
		text-align: center;
		font-size: 28rpx;
		background-color: red;
		border-radius:42rpx;
		height:60rpx;
		line-height:60rpx;
		color:#F2FFFF;
		position: absolute;
		top:60rpx;
		right:-180rpx;
	}
</style>
