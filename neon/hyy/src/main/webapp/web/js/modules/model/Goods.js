define(function() {
	var Goods = {
		
		getGoodsTypeList : function (fn, errFn) {
			$.ajax({
				url : "/t/goodsTypeList",
				type : "GET",
				dataType : "json",
				success : function (res) {
					fn(res);
				},
				error : function (err) {
					errFn && errFn(err);
				}
			});
		}
	};
	
	return Goods;
});