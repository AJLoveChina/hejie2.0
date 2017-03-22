define(["tools/tools"], function(tools) {
	var Goods = {
		
		getGoodsTypeList : function (fn, errFn) {
			$.ajax({
				url : "/nigeerhuo-tbk/t/goodsTypeList",
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
		},
		
		getGoodsTypeHref : function (params) {
			params = $.extend({
				plateForm : Goods.getPlatForm(),
				page : 1,
				goodsTypeId : 140
			}, params);
			var url = "/nigeerhuo-tbk/t/tbkQuery/view?data=" + encodeURIComponent(JSON.stringify(params));
			return encodeURI(url);
		},
		
		getCoupons : function (page, fn) {
			$.ajax({
			
			
			})
		}



	};
	
	return Goods;
});