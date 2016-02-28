<div id="aj-home-images-roll">
  <div>
  	<img alt="" src="web/pic/home1.jpg">
  </div>
  <div>
  	<img alt="" src="web/pic/home2.jpg">
  </div>
</div>

<style>
	#aj-home-images-roll{
		margin-bottom:10px;
		width:100%;
		position:relative;
		display: none;
	}
	#aj-home-images-roll img{
		width:100%;
	}
	
</style>

<script>
	$(function () {
		var container = $("#aj-home-images-roll");
		container.slidesjs({
			start : 1,
			pagination : {
				active : true
			},
			navigation : {
				active : false
			},
			play : {
				auto : true,
				interval : 3000
			},
			callback : {
				loaded : function () {
					container.fadeIn();
					container.css("height" , container.width() / 2);
				}
			}
	    });
	})
</script>