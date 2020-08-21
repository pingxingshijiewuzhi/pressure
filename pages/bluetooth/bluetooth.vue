<template>
	<view class="content">
		<view class="head flexs1">
		   <view class=" head_title text-white text-center flexs">
			   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image  :src="baseUrl+avatar"  class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
				<view class="controlpanel" @click='gocontrolpanel'>{{langtype=='CH'?langch.control:langen.control}}</view>
		   </view>
		   <view class="title">
				<view class=" text-white">蓝牙连接</view>
		   </view>
		</view>
		<view class=" flexs">
			<image class="blue_img" src="../../static/image/icon_ly_24xtsz-lylj@2x.png"></image>
		</view>
		<view class="find">
			发现蓝牙设备：
		</view>
		<view class=" flexs">
			<view>
				<block v-for="(item,index) in bluetooth"  v-if="item.name.length" :key='index'>
					<view class=" box flexs" :class="isLink[index]==2?'cur':''" 
					@click="createBLEConnection(item.deviceId,index)">{{item.name}} {{isLink[index]==1?'连接中':''}}</view>
				</block>
			</view>
		</view>
		<!-- <view class="bottom text-center flexs">
			<view class="submit" >
			    配对
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
	    data(){
	        return{
				langch: {
					control:'控制面板'
				},
				langen: {
					control:'control panel'
				},
				langtype:'',
				baseUrl:this.$common.baseUrl,
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
	            rSelect:[],
				typeStus: 0, //类型状态
				bluetooth:[],
				isLink:[],
				// 调试数据
				serverList:[],
				characteristics:[],
				readCode:'',
				readCodeMsg:'',
				// 用于区分设备的 id
				serviceId:'',
				characteristicId:'',
				value:'0102',
				returnMessage:'',
				macAddress:"",
				macValue:'',
	        }
	    },
		onShow() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH'
		},
		onLoad() {
			uni.openBluetoothAdapter({
				success:(e) => {
					console.log('初始化蓝牙成功:' + e.errMsg);
					// 初始化完毕开始搜索
					this.startBluetoothDeviceDiscovery()
				},
			});
		},
	    methods:{
			gocontrolpanel(){
				uni.reLaunch({
					url:'/pages/personalCenter/personalCenter'
				})
			},
			startBluetoothDeviceDiscovery() {
			    //在页面显示的时候判断是都已经初始化完成蓝牙适配器若成功，则开始查找设备
				uni.startBluetoothDevicesDiscovery({
					// services: ['0000FFE0'],
					success: res => {
						console.log(res)
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
			    console.log("监听寻找新设备");
			    // this.getBluetoothDevices();
			    uni.onBluetoothDeviceFound(devices => {
			        console.log('开始监听寻找到新设备的事件');
					console.log(devices)
			        this.getBluetoothDevices();
			    });
			},
			/**
			 * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
			 */
			getBluetoothDevices() {
			    console.log("获取蓝牙设备");
			    uni.getBluetoothDevices({
			        success: res => {
			            console.log('获取蓝牙设备成功:' + JSON.stringify(res.devices));
			            this.bluetooth = res.devices;
						this.bluetooth.forEach((item)=>{
							this.isLink.push(0)
						})
												
			        }
			    });
			},
			//断开蓝牙连接
			closeBLEConnection(deviceId,index){
				uni.closeBLEConnection({
				  deviceId:deviceId,
				  success:res=> {
					  this.isLink.splice(index,1,4)
				    console.log(res)
				  }
				})
			},
			// 连接蓝牙设备
			createBLEConnection(deviceId,index){
				console.log(deviceId,'压力测试手动连接设备id')
				this.deviceId = deviceId;
				// uni.setStorageSync('pressuredeviceId', this.deviceId);
				if(this.isLink[index] == 2){
					return;
				}
				this.isLink.splice(index,1,1)
				uni.createBLEConnection({
				  deviceId:this.deviceId,
				  success:res=> {
					console.log(res)
					this.isLink.splice(index,1,2);;
					this.stopBluetoothDevicesDiscovery();
					this.getBLEDeviceServices(this.deviceId,index);
				  },
				  fail:res=> {
					this.isLink.splice(index,1,3)
					console.log(res)
				  }
				})	
			},
			//获取蓝牙设备所有服务(service)。
			getBLEDeviceServices(deviceId,index){
				setTimeout(()=>{
					uni.getBLEDeviceServices({
					  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					  deviceId:deviceId,
					  success:(res)=>{
					    console.log('device services:', res)
						this.serverList = res.services
						res.services.forEach((item)=>{
							if(item.uuid.indexOf("FFE0")!=-1){
								this.serviceId = item.uuid;
								// uni.setStorageSync('pressureserviceId', item.uuid);
								console.log('serverId:', this.serviceId)
								this.getBLEDeviceCharacteristics(this.deviceId)
							}
						})
					  }
					})
				},1000)
			 
			},
			// 获取蓝牙特征值
			getBLEDeviceCharacteristics(deviceId){
				uni.setStorageSync('pressuredeviceId', deviceId);
				uni.setStorageSync('pressureserviceId', this.serviceId);
				
				console.log("进入特征");
				setTimeout(()=>{
					uni.getBLEDeviceCharacteristics({
					  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					  deviceId:deviceId,
					  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					  serviceId:this.serviceId,
					  success:(res)=>{
					    console.log(res)
						this.characteristics = res.characteristics
						res.characteristics.forEach((item)=>{
							if(item.uuid.indexOf("FFE1")!=-1){
								this.characteristicId = item.uuid;
								uni.setStorageSync('characteristicId', this.characteristicId);
								console.log('characteristicId:', this.characteristicId)
								this.notifyBLECharacteristicValueChange(this.deviceId)
							}
						})
					  },
					  fail:(res)=>{
						console.log(res);
					  }
					})
				},2000)
			},
			// 启用 notify 功能
			notifyBLECharacteristicValueChange(deviceId){
				uni.notifyBLECharacteristicValueChange({
				  state: true, // 启用 notify 功能
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:deviceId,
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId:this.serviceId,
				  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				  characteristicId:this.characteristicId,
				  success:(res)=> {
				    console.log('notifyBLECharacteristicValueChange success', res.errMsg)
					// this.onBLECharacteristicValueChange(this.deviceId); 
				  },
				  fail:(res)=> {
				  	console.log('notifyBLECharacteristicValueChange success', res.errMsg) 
				  }
				})
			},
			ab2hex(buffer) {
			  const hexArr = Array.prototype.map.call(
			    new Uint8Array(buffer),
			    function (bit) {
			      return ('00' + bit.toString(16)).slice(-2)
			    }
			  )
			  return hexArr.join('')
			},
			// 监听低功耗蓝牙设备的特征值变化
			onBLECharacteristicValueChange(deviceId){
				uni.onBLECharacteristicValueChange((res)=> {
				  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
				  console.log(new Uint8Array(res.value))
				  console.log(this.ab2hex(res.value))
				  this.macAddress = res.deviceId;
				  this.macValue = this.ab2hex(res.value);
				  // this.readBLECharacteristicValue(this.deviceId)
				})	
			},
			// 读取设备二进制数据
			readBLECharacteristicValue(){
				// console.log('进入读取');
				// setTimeout(()=>{
					uni.readBLECharacteristicValue({
					  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					  deviceId:this.deviceId,
					  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					  serviceId:this.serviceId,
					  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					  characteristicId:this.characteristicId,
					  success:(res)=> {
					     console.log('readBLECharacteristicValue:', res)
						 this.readCode = res.errCode;
						 this.readCodeMsg = res.errMsg;
						 this.onBLECharacteristicValueChange(this.deviceId);
					  },
					  fail:(res)=> {
					  	 console.log('readBLECharacteristicValue:', res)
						 this.readCode = res.errCode;
						 this.readCodeMsg = res.errMsg;
						 this.onBLECharacteristicValueChange(this.deviceId);
					  }
					})
				// },200)
			 
			},
	       //选择类型
	       selectType(num) {
	       	this.typeStus = num;
	       },
		   back(){
		   	 uni.navigateBack({
		   		delta:1
		   	 })
		   },
		   
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
		width:115rpx;
		height:115rpx;
	}
	.title{
		font-size: 40rpx;
		margin-top:100rpx;
		margin-left:80rpx
	}
	.blue_img{
		width:180rpx;
		height:180rpx;
		margin-top:110rpx;
	}
	.find{
		margin-top:80rpx;
		margin-left:30rpx;
		
	}
	.box{
		width:540rpx;
		height:70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		margin:40rpx 0;
		letter-spacing: 4rpx;
	}
	.bottom{
		margin-top:60rpx;
	}
	.submit{
		width:300rpx;
		background-color: #4286EC;
		border-radius:42rpx;
		height:80rpx;
		line-height:80rpx;
		color:#F2FFFF;
	}
	.cur {
		color:#4285ED;
		border: 1px solid #4285ED;
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
