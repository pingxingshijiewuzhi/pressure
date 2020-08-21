<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	.flexs{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flexs1{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.flexs2{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.flexs3{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.flexs4{
		display: flex;
		flex-direction:row-reverse;
		align-items: center;
	}
	.text-blue{
		color: #282986 !important;
	}
	.text-yellow{
		color: #EF8000 !important;
	}
	.text-red{
		color: #E41620 !important;
	}
	.border-blue{
		border:3px solid #282986;
	}
	.border-yellow{
		border:3px solid #EF8000;
	}
	.border-red{
		border:3px solid #E41620;
	}
	.border-green{
		border:3px solid green;
	}
</style>
