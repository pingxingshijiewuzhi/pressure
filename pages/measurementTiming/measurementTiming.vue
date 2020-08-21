<template>
	<view class="content">
		<view class="head flexs1">
			    <view class=" head_title text-white text-center flexs">
					<image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
						<view class="head_left">
							<image   :src="baseUrl+avatar"  class="tx"></image>
							<view class="name">{{username}}</view>
						</view>
				</view>
		    <view class="title text-white ">测量定时</view>
		</view>
		<view class="nav">
			 <button type="default" size="mini" @click='classics' style="margin-left:10rpx;background-color:#EC431D;color:#FCFAEE">经典7小时</button>
			 <button type="default" size="mini" @click="check" style="margin-left: 10rpx;background-color:#EC431D;color:#FCFAEE">全选</button>
			 <button type="default" size="mini" @click="cancel" style="margin-left: 10rpx;background-color:#EC431D;color:#FCFAEE">全删</button>
			 <button type="default" size="mini" style="margin-left: 10rpx;background-color:#EC431D;color:#FCFAEE">提示音</button>
		</view>
		<view class=" flexs text-white text-bold">
			<view class="body flexs">
				  <view v-for="(item,index) in timelist" :key="index" @click='setAlarm(item.id)'
				 :class="{'activecolor':item.checked=='2'}">{{item.timestr}} </view>
				  
			</view>
		</view>
		<view class="button">
			 <view class="save" @click='saveAlarm'>
				 保存
			 </view>
		</view>
		
	</view>
</template>

<script>
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	export default {
		components: {
		    "helang-checkbox":helangCheckbox
		},
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				timelist:[],
				currenIndex:'',
				setalarm:'',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
			}
		},
		onLoad(){
			this._getAlarm()
		},
		methods: {
			// 获取闹钟时间
			_getAlarm(){
				this.$common.requests('/api/Alarm/get_myalarm').then(res=>{
					this.timelist = res.data.data;
					// 循环对象
					// for(let i in this.timelist){
					
					// }
					// 每次已经选中的闹钟保存，清空上次选中闹铃
					this.setalarm = ''
					var alarmlist = this.timelist.filter(item=>{
						return item.checked == '2'
					})
					
					var that = this
					var am = alarmlist.map(item=>{
						that.setalarm += (item.id + ',')
					})
					console.log(that.setalarm)
				})
			},
			// 设置闹铃，把选中时间id存起来，等保存发送请求
			setAlarm(id){
				// 把选中闹铃变颜色
				for(var i = 0; i<this.timelist.length; i++){
					if(this.timelist[i].id == id){
						this.timelist[i].checked = 2
					}
				}
				// 如果id已经存在,就不允许在选中
				if(this.setalarm.indexOf(id)!= -1){
					uni.showToast({
						title:'不能重复保存闹铃',
						icon:'none'
					})
					return
				}
				// 如果是为空的情况直接加
				if(this.setalarm==''){
					this.setalarm  += (id + ',') 
					return 
				}
				// 如果有值且最后没有,分隔,再添加就得加,
				if(this.setalarm.substring(this.setalarm.length - 1) != ','){
				this.setalarm  += (',' + id + ',') 
				}else{
				this.setalarm  += (id + ',') 
				}
			},
			// 保存闹铃时间
			saveAlarm(){
				this.setalarm = this.setalarm.substring(0,this.setalarm.length-1)
				let obj = {
					ids:this.setalarm
				}
				console.log(obj)
				this.$common.requests('/api/Alarm/change_alarm',obj).then(res=>{
					this.$api.msg(res.data.msg)
					if(res.data.code==1){
					this._getAlarm()
					}
				})
			},
			//全选
			check(){
				// 取出所有id
				var alarmlist = this.timelist.map(item=>{
					return item.id
				})
				// 变成字符串用 , 隔开
				let allsetalarm = ''
				for(let i=0 ; i<alarmlist.length;i++){
					allsetalarm += (alarmlist[i] + ',') 
				}
				allsetalarm = allsetalarm.substring(0,allsetalarm.length-1)
				let obj = {
					ids:allsetalarm
				}
				this.$common.requests('/api/Alarm/change_alarm',obj).then(res=>{
					if(res.data.code==1){
					this._getAlarm()
					}
				})
			},
			//全删
			cancel(){
				let obj = {
					ids:''
				}
				this.$common.requests('/api/Alarm/change_alarm',obj).then(res=>{
					if(res.data.code==1){
					this._getAlarm()
					}
				})
			},
			// 景点七小时
			classics(){
				let classics = '1,5,7,10,14,18,22'
				let obj = {
					ids:classics
				}
				this.$common.requests('/api/Alarm/change_alarm',obj).then(res=>{
					if(res.data.code==1){
					this._getAlarm()
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
	.nav{
		margin-top:65rpx;
		display:flex;
		margin-left:20rpx;
	}
	.body{
		margin-top:72rpx;
		display:flex;
		flex-wrap:wrap;
		width:93%;
	}
	.body view{
		width:160rpx;
		height:98rpx;
		line-height:98rpx;
		margin-top:10rpx;
		font-size:32rpx;
		text-align:center;
		background-color:#BFBFBF;
		border-radius:20rpx;
		margin:8rpx auto;
	}
	.activecolor{
		background-color:#4078E9 !important;
	}
	.button{
		text-align:center;
		display:flex;
		justify-content:center;
		margin-top:124rpx;
	}
	.save{
		width:300rpx;
		background-color: #4286EC;
		border-radius:42rpx;
		height:80rpx;
		line-height:80rpx;
		color:#F2FFFF;
	}
</style>
