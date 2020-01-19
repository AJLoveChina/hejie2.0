<script>
	$(function() {
		require(["main"], function() {
			require(["model/Goods"], function(goods) {
				$(".aj-goodstypes-stamps .stamp-link").each(

				function() {
					var params = {
						plateForm: goods.getPlatForm(),
						page: 1,
						goodsTypeId: $(
						this).parents(".ali").eq(
						0).data("moreinfo")
					};
					$(this).attr("href", goods.getGoodsTypeHref(params));
				})
			})
		})
	})
</script>