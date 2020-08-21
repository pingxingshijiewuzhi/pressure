<template>
	<view class="content">
		<view class="head flexs1">
		   <view @click="back" class=" head_title text-white text-center flexs">
			   <image class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image  :src="baseUrl+avatar"  class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
		   </view>
		   <view class="title">
				<view class=" text-white">{{langtype=='CH'?langch.yuyan:langen.yuyan}}</view>
		   </view>
		</view>
		<view class="box flexs">
			<block v-if="langtype=='CH'">
				<view class="box_big  flexs1 text-bold">
					<view  class="box_one" :class="typeStus == 0?'newbox':''" @click="selectType(0)">{{langch.langzw}}</view>
					<view class="box_one " :class="typeStus == 1?'newbox':''" @click="selectType(1)">{{langch.langyw}}</view>
				</view>
			</block>
			<block v-if="langtype=='EN'">
				<view class="box_big  flexs1 text-bold">
					<view  class="box_one" :class="typeStus == 0?'newbox':''" @click="selectType(0)">{{langen.langzw}}</view>
					<view class="box_one " :class="typeStus == 1?'newbox':''" @click="selectType(1)">{{langen.langyw}}</view>
				</view>
			</block>
		</view>
		<view class="bottom text-center flexs">
			<view class="submit" @click="gosub">
				{{langtype=='CH'?langch.baocun:langen.baocun}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				typeStus: 0, //类型状态
				langch:{
					langzw:'中文',
					langyw:'英文',
					baocun:'保存',
					yuyan:'语言切换'
				},
				langen:{
					langzw:'Chinese',
					langyw:'English',
					baocun:'Preservation',
					yuyan:'Language switching'
				},
				baseUrl:this.$common.baseUrl,
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				langtype:''
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
			if(this.langtype=='CH'){
				this.typeStus = 0;
			}else{
				this.typeStus = 1;
			}
		},
		methods:{
			//选择类型
			selectType(num) {
				this.typeStus = num;
				if(num==0){
					// uni.setStorageSync('lang','CH');
					this.langtype = 'CH';
				}else{
					// uni.setStorageSync('lang','EN');
					this.langtype = 'EN';
				}
				
			},
			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
			gosub(){
				var num = this.typeStus ;
				if(num==0){
					uni.setStorageSync('lang','CH');
				}else{
					uni.setStorageSync('lang','EN');
				}
				this.$api.msg('设置成功');
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
		font-size: 40rpx;
		margin-top:60rpx;
		margin-left:80rpx
	}
	.box{
		margin-top:120rpx;
		
	}
	.box_one{
		width:220rpx;
		height:200rpx;
		line-height: 200rpx;
		border-radius: 20rpx;
		background-color: #F5F5F5;
		font-size: 38rpx;
		margin:0  50rpx 0 0 ;
		text-align: center;
	}
	.newbox{
		background-color: #4181EB;
		color:#FFFFFF;
		text-align: center;
	}
	.bottom{
		margin-top:180rpx;
	}
	.submit{
		width:300rpx;
		background-color: #4286EC;
		border-radius:42rpx;
		height:80rpx;
		line-height:80rpx;
		color:#F2FFFF;
	}
	
</style>
