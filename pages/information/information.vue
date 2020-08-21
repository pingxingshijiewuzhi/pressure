<template>
	<view>
		<view class="username">
			<view class="list_left">设置用户名</view>
			    <view class="list_right">
		         	<input class="uni-input"  v-model="name"  type="text" style="text-align:right" placeholder="输入用户名"  />
		     	</view>
		</view>
		<view class="setpassword">
			<view class="list_left">设置密码</view>
			<input class="uni-input"  v-model="pwd"  type="text"  style="text-align:right" placeholder="输入密码" />
		</view>
		<view class="confirm">
			<view class="list_left">确认密码</view>
			<input class="uni-input"  v-model="spwd"  type="text"  style="text-align:right" placeholder="再次确认密码" />
		</view>
		<view class="button">
			<block v-if="name&&pwd&&spwd">
			        <view class="submit" @click="gonext()">
			            提交
		          	</view>
			</block>
			<block v-else>
			        <view class="submit">
			            提交
			      	</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gonext(){
				var obj = {
					
				};
				
			}
		}
	}
</script>

<style>
    .username{
	display:flex;
	justify-content:space-around;
	width:100%;
	margin-top:43rpx;
	}
	.setpassword{
		display:flex;
		justify-content:space-around;
		width:100%;
		margin-top:64rpx;
	}
	.confirm{
		display:flex;
		justify-content:space-around;
		width:100%;
		margin-top:64rpx;
	}
	.list_left{
		font-size:36rpx;
		width:180rpx;	
	}
	.button{
		text-align:center;
		display:flex;
		justify-content:center;
		margin-top:114rpx;
	}
	.submit{
		width:525rpx;
		background-color: #4286EC;
		border-radius:42rpx;
		height:98rpx;
		line-height:98rpx;
		color:#F2FFFF;
		font-size:36rpx;
	}
</style>
