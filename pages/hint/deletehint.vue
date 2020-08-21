<template>
	<view v-if='isShow'>
				<!-- 模态框	 -->
		<view  class='masking' @click='modclick'></view>
		<view class='deletehint flexs' >
			<view class='deletehint-item'>
				<image class='deletehintimg' src='/static/requirelobby/guanbi.png'
				@click='modclick'></image>
				<view class='flexs'>
					<view class='hint'>{{langtype=='CH'?删除提示:'delete hint'}}</view>
				</view>
				<view class='flexs hintenture'>{{langtype=='CH'?title:'delete or not'}}</view>
				<view class='felx flexs3 lastview'>
					<button class='cancle' @click='cancleclick'>{{langtype=='CH'?取消:'cancle'}}</button>
					<button class='entrue' @click='tureclick'>{{langtype=='CH'?确定:'confirm'}}</button>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		props:{
			isShow:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:'确定删除此投标'
			},
			islangtype:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 模态框
			modclick(){
				// this.isShow = !this.isShow
				this.$emit('closemod')
			},
			cancleclick(){
				this.$emit('cancleclick')
			},
			tureclick(){
				this.$emit('tureclick')
			}
		}
	}
</script>

<style scoped>
	/* 模态框样式*/
	.masking{
				position: fixed;
				top:0;
				left:0;
				right:0;
				bottom:0;
				background-color:rgba(0,0,0,.3);
				z-index: 999;
			}
	.deletehintimg{
		position:absolute;
		right: -25upx;
		top: -25upx;
		height:50rpx;
		width:50rpx;
	}
	.deletehint{
		position: fixed;
		background: #FFFFFF;
		border-radius: 20rpx;
		height:450rpx;
		width:600rpx;
		top:40%;
		left:50%;
		transform: translate(-50%,-50%);
		z-index: 999;
	}
	.deletehint-item>view{
		width:400rpx;
		height:100rpx;
		margin:auto;
	}
	.felx{
	display:flex;	
	}
	.hint{
		width: 200rpx;
		height: 32rpx;
		line-height: 37rpx;
		letter-spacing: 0rpx;
		color: #151515;
		font-size: 34rpx;
		text-align: center;
	}
	.hintenture{
		letter-spacing: 1rpx;
		color: #848484;
	}
	.deletehint-item .lastview{
		margin-top: 30rpx;
		width:500rpx;
	}
	.lastview .cancle,.lastview .entrue{
		border-radius: 50rpx;
		width:200rpx;
		hieght:80rpx;
		line-height: 80rpx;
	}
	.cancle{
		color:#2D2D2E;
		background-color: #E7E9EE;
	}
	.entrue{
		color:#FFFFFF;
		background-color:#275BE5;
	}
</style>
