<template>
	<view>
		<view class="head flexs1">
				   <view class=" head_title text-white text-center flexs">
					   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
						<view class="head_left">
							<image  :src="baseUrl+avatar"  class="tx"></image>
							<view class="name">{{username}}</view>
						</view>
				   </view>
				  <view class="title text-white ">{{langtype=='CH'?langch.xitongshezhi:langen.xitongshezhi}}</view>
		</view>
		<view class="body flexs">
			<view>
				<!-- <view class="body_list"  @click="bluetooth">
					<view class="bluetooth_connection">{{langtype=='CH'?langch.lanya:langen.lanya}}</view>
				</view> -->
				<view class="body_list"  @click="language">
					<view class="language_switch">{{langtype=='CH'?langch.yuyan:langen.yuyan}}</view>
				</view>
				<view class="body_list"  @click="setUserinfo">
					<view class="user_settings">{{langtype=='CH'?langch.yonghu:langen.yonghu}}</view>
				</view>
				<view class="body_list" >
					<view class="system_update">{{langtype=='CH'?langch.xitong:langen.xitong}}</view>
				</view>
				<!-- <view class="body_list"  @click="subAccount">
					<view class="sub_account">{{langtype=='CH'?langch.zizhanghao:langen.zizhanghao}}</view>
				</view> -->
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				langch:{
					xitongshezhi:'系统设置',
					lanya:'蓝牙连接',
					yuyan:'语言切换',
					yonghu:'用户设置',
					xitong:'系统更新',
					zizhanghao:'子账号',
				},
				langen:{
					xitongshezhi:'System setup',
					lanya:'Bluetooth',
					yuyan:'language',
					yonghu:'setUserinfo',
					xitong:'System update',
					zizhanghao:'Sub account',
				},
				langtype:'',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				list:'',
				urls:this.$common.baseUrl,
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
			this.$_myinit()
		},
		methods: {
			// bluetooth(){
			// 	uni.navigateTo({
			// 		url:'../bluetooth/bluetooth'
			// 	})
			// },
			language(){
				uni.navigateTo({
					url:'../language/language'
				})
			},
			setUserinfo(){
				uni.navigateTo({
					url:'../setUserinfo/setUserinfo'
				})
			},
			// 子账号
			// subAccount(){
			// 	uni.navigateTo({
			// 		url:'../subAccount/subAccount'
			// 	})
			// },
			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
		}
	}
</script>

<style>
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
		font-size: 30rpx;
		margin-top:60rpx;
		margin-left:80rpx
	}
	.body{
		margin-top:40rpx;
	}
	.body_list{
		text-align:center;
		width:400rpx;
		background-color:#4286EC;
		height:66rpx;
		line-height:66rpx;
		margin-top:24rpx;
		color:#F1FFFF;
		letter-spacing:4rpx;
	}

</style>
