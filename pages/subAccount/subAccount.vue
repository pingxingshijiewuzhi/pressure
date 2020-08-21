<template>
	<view class="content1">
		<view class="head flexs1">
				   <view class=" head_title text-white text-center flexs">
					   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
						<view class="head_left">
							<image  :src="baseUrl+avatar"  class="tx"></image>
							<view class="name">{{username}}</view>
						</view>
				   </view>
				  <view class="title text-white ">{{langtype=='CH'?langch.zizhanghao:langen.zizhanghao}}:{{currentAccount}}</view>
		</view>
	<view class="body">
		<view class="body_list flexs2" v-for="(item,index) in subAccountArrray" :key="index">
			<view class="sublist">
				{{langtype=='CH'?langch.zizhanghao:langen.zizhanghao}}:
			</view>
			<view class="flexs text-center" @click='changeAccount(item.id,item.nickname)'>
				<view class="nick text-grey">{{item.nickname}}</view>
			</view>
			<view class="list_right">
				<image src="../../static/image/icon_sc_27xtsz-zzh@2x.png" class="delete" @click='deleteclick(item.id)'></image>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{langtype=='CH'?langch.tianjia:langen.tianjia}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					  <input class="uni-input" type="text" v-model="addsubAccount" placeholder="请输入子账号" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal(langch.quxiao)">{{langtype=='CH'?langch.quxiao:langen.quxiao}}:</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal(langch.queding)">{{langtype=='CH'?langch.queding:langen.queding}}:</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
		<view class="bottom">
			<button class="add"  @tap="showModal" data-target="DialogModal1">
				{{langtype=='CH'?langch.tianjia:langen.tianjia}}
			</button>
		</view>
		<view class="bottom">
			<button class="add"  v-if='changemainbtn' disabled>
				{{langtype=='CH'?langch.qiehuan:langen.qiehuan}}
			</button>
			<button class="addbtn" v-else @click='toggle' >
				{{langtype=='CH'?langch.qiehuan:langen.qiehuan}}
			</button>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				modalName: null,
				tempTagArr:[],
				langch:{
					zizhanghao:'子账号',
					tianjia:'添加子账号',
					qiehuan:'切换主账号',
					queding:'确定',
					quxiao:'取消',
				},
				langen:{
					zizhanghao:'Sub account',
					tianjia:'add account',
					qiehuan:'toggle mainaccount',
					queding:'Determine',
					quxiao:'Cancel',
				},
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				langtype:'',
				// 当前子账户名称
				currentAccount:'',
				// 添加子账户账户名
				addsubAccount:'',
				// 获取子账户数组
				subAccountArrray:[],
				// 是否切换主账号按钮状态
				changemainbtn:true
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH',
			this._getsubAccount()
		},
		methods: {
			// 获取子账户
			_getsubAccount(){
				this.$common.requests('/api/child/child_list').then(res=>{
					this.subAccountArrray = res.data.data
				})
			},
			addNewList(){
				
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				// 当点击确定提交创建子账户
				if(e == '确定'){
					let obj ={
						nickname:this.addsubAccount
					}
					var that = this
					this.$common.requests('/api/child/add_child',obj).then(res=>{
						if(res.data.code == 1){
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
							// 删除添加否重新获取子账户
							that._getsubAccount()
						}
						if(res.data.code ==0){
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					})
				}
				this.modalName = null
			},
			// 删除子账户
			deleteclick(id){
				let obj ={
					child_id:id
				}
				var that = this
				this.$common.requests('/api/child/del_child',obj).then(res=>{
					if(res.data.code == 1){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						// 删除添加否重新获取子账户
						that._getsubAccount()
					}
				})
			},
			// 切换子账号
			changeAccount(id,nickname){
				this.currentAccount = nickname
				let obj ={
					child_id:id
				}
				var that = this
				this.$common.requests('/api/child/check_child',obj).then(res=>{
					uni.removeStorageSync('uid')
					uni.removeStorageSync('token')
					uni.removeStorageSync('userinfo')
					if(res.data.code==1){
						// console.log(res.data.data)
						var data = res.data.data.userinfo;
						uni.setStorageSync('uid', data.user_id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userinfo', data);
						// uni.navigateTo({
						// 	url: '../personalCenter/personalCenter'
						// })
						// 把切换主账号高亮
						that.changemainbtn = false
					}
				})
			},
			// 切换主账号
			toggle(){		
				this.currentAccount = ''
				var that = this
				var mysubtoken = uni.getStorageSync('token');
				let obj = {
					token:mysubtoken
				}
				this.$common.requests('/api/child/check_father',obj).then(res=>{
					uni.removeStorageSync('uid')
					uni.removeStorageSync('token')
					uni.removeStorageSync('userinfo')
					if(res.data.code==1){
						var data = res.data.data.userinfo;
						uni.setStorageSync('uid', data.user_id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userinfo', data);
						
						that.changemainbtn = true
						console.log(that.changemainbtn)
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
	/* 头像样式 */
	.tx{
		border-radius: 50%;
	}
	.content1{
		height:100vh;
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
	.body{
		margin-top:130rpx;
	}
	.body_list{
		margin-top:30rpx;
		display:flex;
		font-size:32rpx;
	}
	.sublist{
		width:250rpx;
		text-align:right;
	}
	.account{
		width:312rpx;
		height:68rpx;
		line-height:68rpx;
		border:2rpx solid #C4C4C4;
		border-radius:36rpx;
		color:#929292;
		text-align:center;
		margin-left:20rpx;
	}
	.list_right{
		text-align:center;
		width:200rpx;
	}
	.delete{
		width:43rpx;
		height:43rpx;
	}
	.bottom{
		text-align:center;
		display:flex;
		justify-content:center;
		margin-top:210rpx;
	}
	.add{
		width:300rpx;
		background-color: #4286EC;
		border-radius:42rpx;
		height:70rpx;
		line-height:70rpx;
		color:#F2FFFF;
	}
	.nick{
		width:320rpx;
		height:80rpx;
		border:1px solid #CBCBCB;
		border-radius:40rpx;
		line-height:80rpx;
		margin-left:20rpx
	}
	.bg-green{
		background-color:#4286EC;
	}
	.text-green, .line-green, .lines-green {
	    color: #4286EC;
	}
</style>
