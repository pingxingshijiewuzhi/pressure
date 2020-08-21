<template>
	<view class="content">
		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
			   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image   :src="baseUrl+avatar"  class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
				<view class="controlpanel" @click='gocontrolpanel'>{{langtype=='CH'?langch.control:langen.control}}</view>
			</view>
			<view class="title">
				<view>{{screenYear+'年' + screenMonth + '月' }}</view>
				<view>{{langtype=='CH'?langch.allmonth:langen.allmonth}}</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>星期{{week}}</view>
				<view>{{year}}/{{month}}</view>
			</view>		
		</view>
		<view class='datacontent'>
			<view class='datacontentheader'>
				<view class='titlemark'>
					<view class='mytime'>时段</view>
					<view class='mydata'>日期</view>
				</view>
				<view class='my_l'>L</view>
				<view class='my_r'>R</view>
			</view>
			<view class='datacontentdemo'>
				<view class='titledemocolor'></view>
				<view class='my_ldemo addbackcolor'>
					<block v-for='(item,index) in timeArray' :key='index'>
						<view class='noborder'>
							{{item}}
						</view>
					</block>
				</view>
				<view class='my_rdemo addbackcolor'>
					<block v-for='(item,index) in timeArray' :key='index'>
						<view class='noborder addcolor'>
							{{item}}
						</view>
					</block>
				</view>
			</view>
			<block v-for='(item,index) in monthlist' :key='index'>
				<view class='datacontentdemo'>
					<view class='titledemo'>{{item.day}}</view>
					<view class='my_ldemo'>
						<block v-for='(initem,inindex) in item.l_data' :key='inindex'>
							<view :class="{'addblue':initem.type==1}">
								<block v-if='initem.type==1'>
									{{initem.num+'_'}}
								</block>
								<block v-else>
									{{initem.num}}
								</block>
							</view>
						</block>
					</view>
					<view class='my_rdemo'>
						<block v-for='(initem,inindex) in item.r_data' :key='inindex'>
							<view :class="{'addblue':initem.type==1}">
								<block v-if='initem.type==1'>
									{{initem.num+'_'}}
								</block>
								<block v-else>
									{{initem.num}}
								</block>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				// 接收请求的时间点
				timeArray:[],
				langch:{
					allmonth:'月数据',
					chakanbaogao:'查看报告',
					control:'控制面板'
				},
				langen:{
					allmonth:'monthdata',
					chakanbaogao:'View report',
					control:'control panel'
				},
				hour: new Date().getHours(),
				min: new Date().getMinutes(),
				sec: new Date().getSeconds(),
				year: new Date().getFullYear(),
				week: ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()],
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				langtype:'',
				// 选中的月份
				pickerMonth:'',
				// 接收返回月份数据
				monthlist:[],
				
				// 选中月份
				mmm:[],
				screenYear:'',
				screenMonth:''
				}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
		},
		onLoad(option){
			this.pickerMonth = option.pickerMonth
			console.log(this.pickerMonth,'选中月份')
			this.mmm = this.pickerMonth.split('-')
			this.screenYear = this.mmm[0]
			this.screenMonth = this.mmm[1]
			this._gettime()
			this._getmonth()
		},
		methods: {
			// 获取月时间节点
			_gettime(){
					this.$common.requests('/api/record/getTimeList').then(res=>{
						if(res.data.code==1){
							this.timeArray = res.data.data
							// console.log(this.timeArray,'什么数据')
						}
						
					})
			},
			gocontrolpanel(){
				uni.reLaunch({
					url:'/pages/personalCenter/personalCenter'
				})
			},
			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
			_getmonth(){
				let obj = {
					time:this.pickerMonth
				}
				this.$common.requests('/api/Record/getmonthinfo',obj).then(res=>{
					this.monthlist = res.data.data
							// console.log(this.monthlist,'什么月')
				})
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
	.title{
		width:40%;
		padding-right: 10%;
		font-size: 34rpx;
		margin-top:100rpx;
		color: #FFFFFF;
	}
	.title view{
		text-align: center;
	}
	.right{
		width:20%;
		letter-spacing: 4rpx;
		margin-top:40rpx;
	}
	.day{
		font-size:64rpx
	}

	.datacontent{
		height:calc(100vh - 260rpx);
		width:100%;
		padding:0 10rpx;
		/* border:1rpx solid red; */
	}
	.datacontentheader{
		display: flex;
		height:75rpx;
	}
	.titlemark{
		position: relative;
		width:100rpx;
		height:75rpx;
	}
	.titlemark::before{
		transform-origin:left top;
		display: block;
		content:'';
		width:120rpx;
		height:4rpx;
		background: #b4f3e2;
		transform: rotate(36deg);
	}
	.mytime{
		position: absolute;
		top:0;
		right:0;
	}
	.mydata{
		position: absolute;
		bottom:0;
		left:0;
	}
	.my_l{
		background-color: #FFFFFF;
		flex-grow: 1;
		text-align: center;
		line-height: 75rpx;
		height:75rpx;
	}
	.my_r{
		height:75rpx;
		background-color: #EEEEEE;
		flex-grow: 1;
		text-align: center;
		line-height: 75rpx;
	}

	/* 为头部第二行单独添加背景和字体颜色 */
	.titledemocolor{
		width:100rpx;
		height:100%;
		background-color: #4180EA;
	}
	.addbackcolor{
		color:#FFFFFF;
		background-color: #4180EA;
	}
	.my_ldemo .noborder{
		border:1rpx solid #4180EA;
	}
	.my_rdemo .noborder{
		border:1rpx solid #4180EA;
	}
	.my_rdemo .addcolor{
		color:#FFFFFF;
		background-color: #4180EA;
	}
	
	/* 通用渲染数据 */
	.datacontentdemo{
		display: flex;
		height:60rpx;
	}
	.titledemo{
		width:100rpx;
		height:60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #EEEEEE;
	}
	.my_ldemo{
		display: flex;
		width:50%;
	}
	.my_rdemo{
		display: flex;
		width:50%;	
	}
	.my_ldemo view{
		/* flex-grow: 1; */
		/* 不能让他们自由伸展,内个view内容大小不一 */
		/* 也不能给固定宽,那样flex失去意义,给百分比 */
		width:50%;
		text-align: center;
		line-height: 60rpx;
		height:60rpx;
		border:1rpx solid #BFBFBF;
	}
	.my_rdemo view{
		/* flex-grow: 1; */
		width:50%;
		border:1rpx solid #EEEEEE;
		background-color: #EEEEEE;
		text-align: center;
		line-height: 60rpx;
		height:60rpx;
	}
	
	.addblue{
		color:blue;
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
