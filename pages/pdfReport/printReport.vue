<template>
	<view class="content">
		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
			   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image  :src="baseUrl+avatar"   class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
			</view>
			<view class="title">
				<view class=" text-white">当天数据</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>星期{{week}}</view>
				<view>{{year}}/{{month}}</view>
			</view>		
		</view>
		<!-- 日期选择完成切换显示页面 -->
		<view v-if=' l_datalist.length == 0 & r_datalist.length == 0' class='datacontent'>
			<view class='nodata'>{{langtype=='CH'?langch.nodata:langen.nodata}}</view>
		</view>
		<view v-else class='datacontent'>
			<view class="bigbox">
				<view class="big_title flexs3 ">
					<view class="titlename flexs3 text-bold">
						<view>{{langtype=='CH'?langch.shijian:langen.shijian}}</view>
						<view>L</view>
						<view>{{langtype=='CH'?langch.shijian:langen.shijian}}</view>
						<view>R</view>
					</view>
				</view>
				<view class="baoguo"  >
					<scroll-view scroll-y="true" class="biglist" >
						<!-- @scrolltolower='scrolltolower' @scrolltoupper='scrolltoupper' -->
						<view class="list_one flexs2 " v-for="(item,index) in l_datalist" :key="index" >
							<view class="list1 flexs">
								<view>{{item.createtime}}</view>
							</view>
							<view class="list2 flexs">
								<view v-if='item.record_l' class='numstyle'>{{item.record_l}}</view>
								<checkbox-group @change="checkboxChangeL(index)" v-if='item.record_l'> 
								<checkbox class='round blue' :class="{checked:item.checked}" 
								 value="C"></checkbox>
								</checkbox-group>
							</view>
						</view>
					</scroll-view>
					
					<scroll-view scroll-y="true" class="biglist">
						 <!-- @scrolltolower='scrolltolower' @scrolltoupper='scrolltoupper' -->
						<view class="list_one flexs2 " v-for="(item,index) in r_datalist" :key="index" >
							<view class="list1 flexs">
								<view>{{item.createtime}}</view>
							</view>
							<view class="list2 flexs">
								<view v-if='item.record_r' class='numstyle'>{{item.record_r}}</view>
								<checkbox-group @change="checkboxChangeR(index)" v-if='item.record_r'> 
								<checkbox class='round blue' :class="{checked:item.checked}" 
								 value="C"></checkbox>
								</checkbox-group>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>


		</view>
		<view class="bottom text-center flexs3">
			<view class="submit addbackcolor" @click='print' 
			>{{langtype=='CH'?langch.print:langen.print}}</view>
			<view class="submit addbackcolor" @click='deletedata'
			>{{langtype=='CH'?langch.shanchu:langen.shanchu}}</view>
		</view>
		<!-- 模态框 -->
		<delete-hint :isShow='isShow' @cancleclick='cancleclick'
		@tureclick='tureclick' :title='title' @closemod='closemod'></delete-hint>
		<!-- 上拉加载显示 -->
		<!-- <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view> -->
	</view>
</template>
<script>
	import deleteHint from '@/pages/hint/deletehint.vue' 
	export default {
		components:{
			deleteHint
		   },
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				// 是否显示模态框
				isShow:false,
				// 模态框显示的内容
				title:'是否删除数据',
				
				// 接收请求回来的当天数据
				l_datalist:[],
				r_datalist:[],
				// loadMoreText:'加载中...',
				// 是否显示上拉请求数据提示
				// showLoadMore: false,
				// page: 1,
				// limit: 10,
				//lisize: 0, //本次加载数量
				
				langch:{
					print:'打印',
					shanchu:'删除',
					shijian:'时间',
					zuijia:'最佳数据',
					youxiao:'有效数据',
					laji:'垃圾数据',
					quantian:'全天数据',
					common:'一般数据',
					nodata:'暂无数据'
				},
				langen:{
					print:'print',
					shanchu:'delete',
					shijian:'time',
					zuijia:'optimum',
					youxiao:'Effective',
					laji:'garbage',
					quantian:'All day',
					common:'common',
					nodata:'nodata'
				},
				langtype:'',
				year: new Date().getFullYear(),
				// time: new Date().getHours(),
				week: ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()],
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
			this.getTime()
			this._searchtodayData()
		},

		methods: {
			// scrolltolower(){
			// 	this.showLoadMore = true
			// 	setTimeout(() => {
			// 		//获取数据
			// 		if (this.lisize == 10){//
			// 			this.page++;
			// 			this._searchtodayData()
			// 		}else{
			// 			this.loadMoreText = "暂无更多";
			// 			this.showLoadMore = false;
			// 		}
					
			// 	}, 1000)
			// },
			// scrolltoupper(){
			// 	this.page = 1;
			// 	this._searchtodayData()
			// 	setTimeout(function() {
			// 		uni.stopPullDownRefresh(); 
			// 	}, 1000);
			// },

			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
			getTime: function() {
				setInterval(() => {
					var aData = new Date();
					this.year = aData.getFullYear();
					this.month = aData.getMonth() + 1;
					let weeks = ['日', '一', '二', '三', '四', '五', '六']
					this.week = weeks[aData.getDay()]
					this.day = aData.getDate();
					this.min = aData.getMinutes();
				}, 1000)
			},
			// 查询当天数据
			_searchtodayData(){
				let obj = {
				}
				this.$common.requests('/api/index/getOnlineData',obj).then(res=>{
					this.showLoadMore = false;
					if(res.data.code == 1){
						this.l_datalist = res.data.data.l_data
						console.log(this.l_datalist,666)
						this.r_datalist = res.data.data.r_data
					}
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
				
			},
			// 监听L数据选中框选择
			checkboxChangeL(index){
				// 把未选中变成选中状态,选中变成未选中状态
				this.l_datalist[index].checked = !this.l_datalist[index].checked
			},
			// 监听R数据选中框选择
			checkboxChangeR(index){
				// 把未选中变成选中状态,选中变成未选中状态
				this.r_datalist[index].checked = !this.r_datalist[index].checked
			},
			// 打印
			print(){
			},
			// 删除模态框
			deletedata(){
				this.isShow = true
			},
			// 单击删除
			deleteclick(){
				// 弹出模态框
				this.isShow = !this.isShow
			},
			// 弹出模态框关闭模态框
			closemod(){
				this.isShow = false
			},
			// 弹出模态框点击取消
			cancleclick(){
				this.isShow = !this.isShow
			},
			// 弹出模态框点击确定就删除选中数据
			tureclick(){
				this.isShow = !this.isShow
				var chooseid = ''
				// 判断是那个数据列表要删除
				// 后台要求删除多个选中id之间用,隔开
					this.l_datalist.forEach(item=>{
						if(item.checked == true){
							chooseid  += (item.id + ',') 
						}
					})
					this.r_datalist.forEach(item=>{
						if(item.checked == true){
							chooseid  += (item.id + ',') 
						}
					})

				chooseid = chooseid.substring(0,chooseid.length-1)
				var obj ={
					ids:chooseid
				}
				this.$common.requests('/api/record/del_record',obj).then(res => {
					uni.showToast({
					    title: res.data.msg,
					    duration: 1000
					});
					// 删除数据数据成功，立刻显示最新数据数据
					// 请求数据分析方法
					this._searchtodayData()
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
		width:44%;
		font-size: 40rpx;
		margin-top:12rpx;
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
		height:calc(100vh - 370rpx) ;
		padding-top: 30rpx;
		position: relative;
	}
	.nodata{
		width:200rpx;
		height:100rpx;
		line-height: 100rpx;
		text-align: center;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.title{
		width:35%;
		font-size: 40rpx;
		margin-top:60rpx;
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
		height:100%
	}
	.big_title{
		width:96%;
		height:60rpx;
		line-height: 60rpx;
		background:#DBE8FB;
		color:#3F7BE9;
	}
	.baoguo{
		height:calc(100% - 60rpx) ;
		/* border:1rpx solid red; */
		display: flex;
	}
	.biglist{
		width:48%;
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
		height:60rpx;
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
	.bottom{
		width:100%;
		height:80rpx;
	}
	.submit{
		width:200rpx;
		background-color: #BFBFBF;
		border-radius:42rpx;
		height:80rpx;
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

	
	.uni-loadmore {
		text-align: center;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		height:50rpx;
		line-height: 50rpx;
	}
</style>
