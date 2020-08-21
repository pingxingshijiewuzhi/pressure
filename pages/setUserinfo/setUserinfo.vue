<template>
	<view class="content">
	  <view class="head flexs1">
		   <view  class=" head_title text-white text-center flexs">
			   <image class="head_img" @click="back" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image :src="baseUrl+avatar"  class="tx" @click='onTopPic'></image>
					<view class="name"  @click='onTopPic'>{{username}}</view>
				</view>
		   </view>
		  <view class="title text-white ">{{langtype=='CH'?langch.yonghu:langen.yonghu}}</view>
	  </view>
	  <view class="setcontent">
		  <!-- <view class="username  flexs2">
		  	<view class="set_img">{{langtype=='CH'?langch.avatar:langen.avatar}}</view>
		  	<view class="list_right flexs3">
				<image class="username_img" src="../../static/image/img_tx_26xtsz-yhsz@2x.png"></image>
				<image class="next_img" src="../../static/image/icon_back_26xtsz-yhsz@2x.png"></image>
		  	</view>
		  </view> -->
		  <view class="username flexs3">
		  	<view class="list_left">{{langtype=='CH'?langch.username:langen.username}}</view>
			<input class="uni-input"  type="text" style="text-align:right"  v-model="name" :placeholder="langtype=='CH'?langch.name:langen.name"  />
		  </view>
		  <view class="username flexs3">
		  	<view class="list_left">{{langtype=='CH'?langch.sex:langen.sex}}</view>
		  	<input class="uni-input"  type="text"  style="text-align:right" v-model="sex" :placeholder="langtype=='CH'?langch.inputpassword:langen.inputpassword" />
		  </view>
		  <view class="username flexs3">
		  	<view class="list_left">{{langtype=='CH'?langch.age:langen.age}}</view>
		  	<input class="uni-input"  type="text"  style="text-align:right" v-model="age" :placeholder="langtype=='CH'?langch.inputage:langen.inputage" />
		  </view>
		  <view class="bottom text-center">
		  	<view class="submit" @click='saveprofile'>
		  	    {{langtype=='CH'?langch.conserver:langen.conserver}}
		  	</view>
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
					yonghu:'用户设置',
					avatar:'修改头像',
					username:'名称',
					sex:'性别',
					conserver:'保存',
					age:'年龄',
					name:'请输入姓名',
					inputpassword:'请输入密码',
					inputage:'请输入年龄'
				},
				langen:{
					yonghu:'setUserinfo',
					avatar:'avatar',
					username:'username',
					sex:'sex',
					age:'age',
					conserver:"conserver",
					name:'please enter your name',
					inputpassword:'please enter your password',
					inputage:'please enter your age'
				},
				langtype:'',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				// 接收传过来的修改个人信息
				myobj:{},
				myimg:'',
				name:'',
				sex:'',
				age:'',
				list:'',
				urls:this.$common.baseUrl,
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
		},
		methods: {
			// bluetooth(){
			// 	uni.navigateTo({
			// 		url:'../bluetooth/bluetooth'
			// 	})
			// },
			// 点击修改头像
				//上传图片
				onTopPic() {
					this.$common.upimg().then(res => {
						this.avatar = res[0];
						let obj = {
							avatar:this.avatar
						}
						var that = this	
						if(this.avatar){
							this.$common.requests('/api/user/profile',obj).then(res=>{
								// 成功后重新请求数据
								if(res.data.code == 1){
									// console.log(5555555)
									that.$_myinit()
								}
								
							})
						}
					})	
				},
			// 修改用户信息
			saveprofile(){
				var language = null
				if(this.langtype == 'CH'){
					language = 1
				}else{
					language = 2
				}
				var that = this	
				let obj = {
					nickname:this.name,
					gender:this.sex,
					age:this.age,
					language:language
				}
				this.$common.requests('/api/user/profile',obj).then(res=>{
					// 成功后重新请求数据
					if(res.data.code == 1){
						that.$_myinit()
					}
					
				})
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
	
	.username{
		
		width:100%;
		margin-top:43rpx;
		height: 90upx ;
		border-bottom: 1px solid #E7E7E7;
	}
	
	.set_img{
		font-size:36rpx ;
		margin-left:60rpx;
	}
	.list_left{
		font-size:36rpx ;
		width:180rpx;	
	}
	.username_img{
		width:70rpx;
		height:70rpx
	}
	.next_img{
		width:22rpx;
		height:42rpx
	}
	.list_right{
		width:170rpx;
	}
	.bottom{
		text-align:center;
		display:flex;
		justify-content:center;
		margin-top:130rpx;
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
