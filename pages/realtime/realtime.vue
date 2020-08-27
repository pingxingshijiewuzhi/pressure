<template>
	<view class="content">
		<!-- 蓝牙连接弹框 -->
		<view class='mask' @click='canclemodify' v-if='boothStatus'></view>
		<view v-if='boothStatus' class='bloothbox'>
			<block v-for="(item,index) in bluetooth" v-if="item.name.length" :key='index'>
				<view class="box flexs"  @click="createBLEConnection(item.deviceId,index)">{{item.name}}
				</view>
					<radio-group v-if="deviceId===item.deviceId">
						<view v-for="(service,service_index) in serverList" :key="service_index" style="font-size: 20rpx">
							<radio style="transform:scale(0.7)" :value="service.uuid" @tap="select_service(service)" />{{service.uuid }}
						</view>
					</radio-group>
			</block>
		</view>

		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
				<image @click='back' class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image :src="baseUrl+avatar" class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
			</view>
			<view class="title">
				<view class=" text-white">{{langtype=='CH'?langch.shishi:langen.shishi}}</view>
				<!-- <view class="timesa" v-if="min == 0 || min == 1 || min == 2 || min == 3 || min == 4 || min == 5 || min == 6 || min == 7 || min == 8 || min == 9">{{ hour }}:0{{ min }}</view> -->
				<view class="times text-white">
					<image class="times_img" src="../../static/image/icon_sj_7sssj4@2x.png"></image>
					{{ hour }}:{{ min }}:{{sec}}
				</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>{{langtype=='CH'? '星期'+ week : weekarray}}</view>
				<view>{{year}}/{{month}}</view>
			</view>
		</view>
		<!-- 测试看数据变化页面跟着变吗 -->
		<!-- <block >
		<view>{{JSON.stringify(list)}}</view>
		<view>{{helleo}}</view>
		</block> -->
		<view class="real flexs">
			<view class="real_one">
				<block v-if="list.data_type==1">
					<view class="xieti flexs">
						{{langtype=='CH'?langch.satisfactory:langen.satisfactory}}
					</view>
				</block>
				<block v-if="list.data_type==2">
					<view class="xieti flexs">
						{{langtype=='CH'?langch.advise:langen.advise}}
					</view>
				</block>
				<block v-if="list.data_type==3">
					<view class="xieti flexs">
						{{langtype=='CH'?langch.advisebadly:langen.advisebadly}}
					</view>
				</block>
				<block v-if="list.data_type==0">
					<view class="xieti flexs">
						{{langtype=='CH'?langch.good:langen.good}}
					</view>
				</block>
				<block v-if='Object.getOwnPropertyNames(list).length != 4'>
					<view class="xieti flexs">
					</view>
				</block>

				<view class="flexs" v-if="list.data_type==1">
					<block v-if='list.type==1'>
						<view class="text-bold big_left">L</view>
					</block>
					<block v-else>
						<view class="text-bold big_left"> </view>
					</block>
					<view class="big_box text-blue border-blue flexs">
						{{list.record}}
						<view class="hg flexs text-bold">mmHg</view>
					</view>
					<view class="text-bold big_right" v-if='list.type==1'> </view>
					<view class="text-bold big_right" v-else>R</view>
				</view>
				<view class="flexs" v-if="list.data_type==2">
					<block v-if='list.type==1'>
						<view class="text-bold big_left">L</view>
					</block>
					<block v-else>
						<view class="text-bold big_left"> </view>
					</block>
					<view class="big_box text-yellow border-yellow flexs">
						{{list.record}}
						<view class="hg flexs text-bold">mmHg</view>
					</view>
					<view class="text-bold big_right" v-if='list.type==1'> </view>
					<view class="text-bold big_right" v-else>R</view>
				</view>
				<view class="flexs" v-if="list.data_type==3">
					<block v-if='list.type==1'>
						<view class="text-bold big_left">L</view>
					</block>
					<block v-else>
						<view class="text-bold big_left"> </view>
					</block>
					<view class="big_box text-red border-red flexs">
						{{list.record}}
						<view class="hg flexs text-bold">mmHg</view>
					</view>
					<view class="text-bold big_right" v-if='list.type==1'> </view>
					<view class="text-bold big_right" v-else>R</view>


				</view>
				<view class="flexs" v-if="list.data_type==0">
					<block v-if='list.type==1'>
						<view class="text-bold big_left">L</view>
					</block>
					<block v-else>
						<view class="text-bold big_left"> </view>
					</block>
					<view class="big_box text-green border-green flexs">
						{{list.record}}
						<view class="hg flexs text-bold">mmHg</view>
					</view>
					<block v-if='list.type==1'>
						<view class="text-bold big_right"> </view>
					</block>
					<block v-else>
						<view class="text-bold big_right">R</view>
					</block>

				</view>
				<view v-if='Object.getOwnPropertyNames(list).length != 4' class="flexs">
					<view class="text-bold big_left"> </view>
					<view class="big_box text-green border-green flexs"  :class="{'redcolor':alrealy}">
						{{alrealy?'连接中':'00'}}
					</view>
					<view class="text-bold big_right"></view>
				</view>
				<view class="submit text-center addbackcolor"  @click="gobluetooth">
					{{langtype=='CH'? langch.booth: langen.booth}}</view>
			</view>
		</view>
		<view class="bottom text-center flexs" @click='searchdata'>
			<view class="submit">
				{{langtype=='CH'?langch.chaxun:langen.chaxun}}
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				// 当前只允许开启一次监听
				startStatus: true,
				
				// 是否点击蓝牙
				btnboothstatus:false,

				// 蓝牙连接弹框
				boothStatus: false,
				baseUrl: this.$common.baseUrl,
				// 非常好，还不错，建议重侧，必须重测
				langch: {
					chaxun: '查询',
					shishi: '实时数据',
					good: '非常好',
					satisfactory: '还不错',
					advise: '建议重测',
					advisebadly: '必须重测',
					booth: '连接蓝牙',
				},
				langen: {
					booth:'booth',
					measurement: 'measurement',
					chaxun: 'select',
					shishi: 'real time data',
					good: 'very good',
					satisfactory: 'not too bad',
					advise: 'try again',
					advisebadly: 'must again'
				},
				langtype: '',
				hour: '',
				min: '',
				sec: '',
				year: '',
				// time: new Date().getHours(),
				week: '',
				weekarray:'',
				month: '',
				day: '',
				timer:'',//定时器
				avatar: uni.getStorageSync('userinfo').avatar,
				username: uni.getStorageSync('userinfo').username,
				
				// 保存每次变化数据
				listbuffuer: {},
				list: {
					// "record": "00",
					// "data_type": 0,
					// "type": 1
				},
				helleo: 'sd',
				bluetooth: [],
				isLink: [],
				// 调试数据
				serverList: [],//服务列表
				characteristics: [],
				readCode: '',
				readCodeMsg: '',
				
				deviceId:'',// 用于区分设备的 id
				
				serviceId: '',// 设备服务id
				characteristicId: '',
				value: '0102',
				returnMessage: '',
				macAddress: "",
				macValue: '',
				connectbloothindex: '',
				
				
				alrealy:false,//默认没有断开打印设备蓝牙和是否开启自动连接
			}
		},
		onLoad(option) {
			// 如果是实时测量返回页面自动开启连接
			if(option.contentrntering == 1){
				this.alrealy = true
				// 开启自动连接
				this.autoconcat()
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH'
			this.getTime();
			// 开启自动连接不用执行，自动连接结束放开
			if(uni.getStorageSync('autorealtime')){
			this.notifyBLECharacteristicValueChange(uni.getStorageSync('pressuredeviceId'), uni.getStorageSync('pressureserviceId'), uni.getStorageSync('characteristicId'))
				
			}
		},
		onUnload() {
			 if(this.timer) {  
			        clearInterval(this.timer);  
			        this.timer = null;  
			    } 
		},
		onHide() {
			clearInterval(this.timer) 
			this.timer = null;  
			
			// 离开就断开蓝牙链接(这样不合理，只有下一个设备连接时才断开当前设备连接)
			// 把当前设备断开连接封装js，全局调用
			// this.closeBLEConnection(this.deviceId,this.connectbloothindex)

			// uni.getStorageSync('connectbloothindex')
			// uni.getStorageSync('pressuredeviceId')
			// uni.getStorageSync('isLink')
		},
		methods: {
			// 自动连接
			autoconcat(){
				// 打开蓝牙
				uni.openBluetoothAdapter({
					success: (e) => {
						
						let serviceId =  uni.getStorageSync('pressureserviceId');
						let deviceId =  uni.getStorageSync('pressuredeviceId');
						let index = uni.getStorageSync('connectbloothindex');
						this.isLink = uni.getStorageSync('isLink')
						this.isLink[index] = 0 //把原来数组中index改为0，防止不让再次连接
						// 通过保存已有设备id和服务id连接
						this.createBLEConnection(deviceId,index)
						// 获取设备服务在连接结束自动调用
						// this.getBLEDeviceServices(deviceId,index)
						// 连接服务id成功自动获取特征值
						// this.getBLEDeviceCharacteristics()
					},
				});
				
			},
			// 断开打印设备连接
			breakprintconcat(){
				if(uni.getStorageSync("deviceId")){
					let deviceId = uni.getStorageSync("deviceId");
					uni.closeBLEConnection({
						deviceId,
						success(res) {
							console.log(res, '断开蓝牙链接')
						},
						fail(res) {
							console.log(res)
						}
					})
				}
			},
			// 连接蓝牙
			gobluetooth() {
				this.btnboothstatus = true
				// 判断是否存在打印设备连接并断开
				this.breakprintconcat()
				// 打开蓝牙弹框
				this.boothStatus = true
				//打开蓝牙搜索
				uni.openBluetoothAdapter({
					success: (e) => {
						// 初始化完毕开始搜索
						this.startBluetoothDeviceDiscovery()
					},
				});
			},
			startBluetoothDeviceDiscovery() {
				//在页面显示的时候判断是都已经初始化完成蓝牙适配器若成功，则开始查找设备
				uni.startBluetoothDevicesDiscovery({
					services: ['0000FFE0'],
					//建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备
					// https://www.jianshu.com/p/73319340866e
					success: res => {
						console.log('开始查找设备')
						this.onBluetoothDeviceFound();
					},
					fail: res => {
						uni.showToast({
							icon: "none",
							title: "查找设备失败！",
							duration: 3000
						})
					}
				});
			},
			/**
			 * 停止搜索蓝牙设备
			 */
			stopBluetoothDevicesDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					success: e => {
						console.log('停止搜索蓝牙设备:' + e.errMsg);
					},
					fail: e => {
						console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
					}
				});
			},
			/**
			 * 发现外围设备
			 */
			onBluetoothDeviceFound() {
				uni.onBluetoothDeviceFound(devices => {
					console.log('开始监听寻找到新设备的事件');
					this.getBluetoothDevices();
				});
			},
			/**
			 * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
			 */
			getBluetoothDevices() {
				uni.getBluetoothDevices({
					success: res => {
						console.log('获取蓝牙设备成功:' + JSON.stringify(res.devices));
						this.bluetooth = res.devices;
						this.bluetooth.forEach((item) => {
							this.isLink.push(0)
						})
						uni.setStorageSync('isLink', this.isLink);
					}
				});
			},
			//断开蓝牙连接(完全用不到)
			// closeBLEConnection(deviceId, index) {
			// 	uni.closeBLEConnection({
			// 		deviceId: deviceId,
			// 		success: res => {
			// 			this.isLink.splice(index, 1, 4)
			// 			console.log(res)
			// 		}
			// 	})
			// },

			// 连接蓝牙设备
			createBLEConnection(deviceId, index) {
				this.boothStatus = false
				this.connectbloothindex = index
				
				// 自动连接不需要,只有第一次连接需要
				if(!this.alrealy){
				uni.setStorageSync('connectbloothindex', index);
				}
				// 保存获取的设备id
				this.deviceId = deviceId;
				console.log(deviceId,'连接的设备id')
				// 保存设备id
				if(!this.alrealy){
				uni.setStorageSync('pressuredeviceId', this.deviceId);
				}
				
				if (this.isLink[index] == 2) {//这里可能是已经连接不能重复连接
					return;
				}
				this.isLink.splice(index, 1, 1)
				uni.createBLEConnection({
					deviceId: this.deviceId,
					success: res => {
						console.log('连接蓝牙成功')
						this.isLink.splice(index, 1, 2);//这里可能是为了上面已经连接不能重复连接条件确立
						
						// 如果是自动连接就不需要关闭
						if(!this.alrealy){
							this.stopBluetoothDevicesDiscovery();
						}
						this.getBLEDeviceServices(this.deviceId, index);
					},
					fail: res => {
						this.isLink.splice(index, 1, 3)
						console.log(res)
					}
				})
			},
			//获取蓝牙设备所有服务(service)。
			getBLEDeviceServices(deviceId, index) {
				console.log(deviceId,654321)
				var that = this
				setTimeout(() => {
					uni.getBLEDeviceServices({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: deviceId,
						success: (res) => {
							console.log(res)
							for (let service of res.services) {
								if (service.isPrimary) {
									that.serverList.push(service);
								}
							}
							console.log(that.serverList,'录入设备服务id')
							res.services.forEach((item) => {
								if (item.uuid.indexOf("FFE0") != -1) {
									this.serviceId = item.uuid;
									// 保存服务id
									if(!this.alrealy){
									uni.setStorageSync('pressureserviceId', item.uuid);
									}
									console.log('获取的服务idserverId:', this.serviceId)
									this.getBLEDeviceCharacteristics()
								}
							})
						}
					})
				}, 1000)

			},
			// 获取蓝牙特征值
			getBLEDeviceCharacteristics() {
				// uni.setStorageSync('pressuredeviceId', deviceId);
				// uni.setStorageSync('pressureserviceId', this.serviceId);

				console.log("进入特征");
				let serviceId =  uni.getStorageSync('pressureserviceId');
				let deviceId =  uni.getStorageSync('pressuredeviceId');
				setTimeout(() => {
					uni.getBLEDeviceCharacteristics({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: deviceId,
						// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
						serviceId:serviceId,
						success: (res) => {
							this.characteristics = res.characteristics
							res.characteristics.forEach((item) => {
								if (item.uuid.indexOf("FFE1") != -1) {
									this.characteristicId = item.uuid;
									if(!this.alrealy){
										uni.setStorageSync('characteristicId', this.characteristicId);
									}
									console.log('特征值idcharacteristicId:', this.characteristicId)
									this.notifyBLECharacteristicValueChange(this.deviceId, this.serviceId, this.characteristicId)
								}
							})
						},
						fail: (res) => {
							console.log(res);
						}
					})
				}, 2000)
			},
			notifyBLECharacteristicValueChange(deviceId, serviceId, characteristicId) {
				// this.stopBluetoothDevicesDiscovery();
				
				// 自动连接监听结束放开，开启每次进入当前页面自动监听
				if(this.alrealy){
					uni.setStorageSync('autorealtime', true);
				}
				console.log(characteristicId, '有特征值？')
				uni.notifyBLECharacteristicValueChange({
					state: true, // 启用 notify 功能
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: deviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: serviceId,
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: characteristicId,
					success: (res) => {
						// 注释变量start
						if (this.startStatus) {
							this.onBLECharacteristicValueChange(deviceId);
						} else {
							console.log('不需要再次开启监听')
						}
					},
					fail: (res) => {
						console.log('notifyBLECharacteristicValueChange success', res.errMsg)
					}
				})
			},
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('')
			},
			// 监听低功耗蓝牙设备的特征值变化
			onBLECharacteristicValueChange(deviceId) {
				
				// 开启自动连接执行到监听特征值变化：即改变自动连接状态
				if(this.alrealy){
					this.alrealy = false
				}
				
				var that = this
				this.startStatus = false
				uni.onBLECharacteristicValueChange((res) => {
					
					console.log(this.ab2hex(res.value),'变化的数据')
					if(uni.getStorageSync('changevalue') == this.ab2hex(res.value)){
							console.log(5555)
							return
					}else{
					uni.setStorageSync('changevalue',this.ab2hex(res.value))
					}
					
					var obj = {
						code16: this.ab2hex(res.value),
					}
					this.$common.requests('/api/index/addData', obj).then(res => {
						if (res.data.code == 1) {
							that.getdata(res.data.data)
						}
						//跳转下载链接

					})
				})
			},
			getdata(data){
				let pages = getCurrentPages();
				let noePages = pages[pages.length - 1]
				let prevPage = pages[pages.length - 2]
				noePages.$vm.list = data
				console.log(data)
				
				// this.$forceUpdate() 强制刷新 data并重新渲染
				this.$forceUpdate()
				// this.helleo = data
			},
			back() {
				uni.reLaunch({
					url: '../personalCenter/personalCenter'
				})
			},
			getTime: function() {
				var aData = new Date();
				this.min = aData.getMinutes();
				this.hour = aData.getHours();
				// sec: new Date().getSeconds(),
				this.sec = aData.getSeconds();
				this.year = aData.getFullYear();
				this.month = aData.getMonth() + 1;
				let weeks = ['日', '一', '二', '三', '四', '五', '六']
				let weekEnglish  = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
				this.week = weeks[aData.getDay()]
				this.weekarray = weekEnglish[aData.getDay()]
				this.day = aData.getDate();
				this.min = aData.getMinutes();
				
				this.timer = setInterval(() => {
					var aData = new Date();
					this.min = aData.getMinutes();
					this.hour = aData.getHours();
					this.sec = aData.getSeconds();
				}, 1000)
			},
			// 查询当前数据报告
			searchdata() {
				uni.navigateTo({
					url: '../alldayData/alldayData'
				})
			},
			// 模态框消失
			canclemodify() {
				this.boothStatus = false
			}
		}
	}
</script>

<style>
	/* 头像样式 */
	.tx {
		border-radius: 50%;
	}

	.content {
		height: 100vh;
		position: relative;
	}

	.head {
		height: 260rpx;
		width: 100%;
		background-color: #3F7BE9;
	}

	.head_title {
		width: 30%;
		padding-top: 40rpx;
	}

	.head_img {
		width: 24rpx;
		height: 38rpx;
		margin-bottom: 30rpx;
	}

	.head_left {
		margin-left: 30rpx
	}

	.head_left image {
		width: 120rpx;
		height: 120rpx;
	}

	.title {
		width: 35%;
		font-size: 40rpx;
		margin-top: 100rpx;
	}

	.right {
		width: 20%;
		letter-spacing: 4rpx;
		margin-top: 40rpx;
	}

	.day {
		font-size: 64rpx
	}

	.times {
		margin: 20rpx 0;
		font-size: 28rpx !important;
		letter-spacing: 8rpx;
	}

	.times_img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.real {
		margin: 120rpx 0;
	}

	.xieti {
		width: 90%;
		margin: 0 auto;
		font-size: 46rpx;
		text-align: center;
		letter-spacing: 4rpx;
	}

	.big_box {
		width: 410rpx;
		height: 360rpx;
		border-radius: 60rpx;
		font-size: 190rpx;
		display: flex;
		flex-direction: column;
	}

	.real_one view {
		margin: 10rpx auto;
	}

	.hg {
		font-size: 38rpx
	}

	.big_right {
		width: 46rpx;
		height: 46rpx;
		line-height: 46rpx;
		font-size: 40rpx;
		text-align: right;
	}

	.big_left {
		width: 46rpx;
		height: 46rpx;
		line-height: 46rpx;
		font-size: 40rpx;
	}

	/* .bottom{
		margin-top:150rpx;
	} */
	.submit {
		width: 300rpx;
		background-color: #BFBFBF;
		border-radius: 42rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #F2FFFF;
	}

	/* 动态添加背景颜色高亮 */
	.addbackcolor {
		color: #FFFFFF !important;
		background-color: #0081FF !important;
	}

	.mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.bloothbox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1rpx solid #EEEEEE;
		background-color: #FFFFFF;
		width: 540rpx;
		height: 490rpx;
		z-index: 999;
		overflow-y: scroll;
	}

	.box {
		width: 540rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		margin: 40rpx 0;
		letter-spacing: 4rpx;
	}
	
	/* 蓝牙连接状态 */
	.redcolor{
		color:red!important;
	}
</style>
