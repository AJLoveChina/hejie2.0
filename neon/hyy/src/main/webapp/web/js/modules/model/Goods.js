define(["tools/tools"], function(tools) {
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
		},
		
		/**
		*	1.PC 2.Wap
		*/
		getPlatForm : function () {
			if (tools.isWap()) {
				return 2;
			} else {
				return 1;
			}
		}

	};
	
	return Goods;
});