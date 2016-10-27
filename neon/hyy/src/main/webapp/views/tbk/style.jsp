<style>
	#goods-type-roll{}
	#goods-type-roll .gt-list-fix{
		position:fixed;
		top:40%;
		left:20px;
	}
	#goods-type-roll .gt-list-fix .li{
		display:block;
		max-width:70px;
		height:30px;
		overflow:hidden;
		line-height:30px;
		font-size:12px;	
		cursor:pointer;
		color:#666;
	}
	#goods-type-roll .gt-list-fix .li:hover{
		color:#333;
	}
	#goods-type-roll .gt-list-fix .li.selected{
		color:#c81623;
	}
	
	#gt-list-content{}
	#gt-list-content .gt-one{
		position:relative;
	}
	#gt-list-content .gt-one.selected .aj-icon,#gt-list-content .gt-one.selected .floor{
		color:#c81623;
	}
	#gt-list-content .gt-one .gt-o-top{
		height:35px;
		line-height:35px;
		border-bottom:1px solid #c81623;
		position:relative;
	}
	#gt-list-content .gt-one .gt-o-top .name{
		font-size:16px;
		height:35px;
		float:left;
		line-height:42px;
	}
	#gt-list-content .gt-one .gt-o-top .floor{
		position:absolute;
		top:6px;
		left:16px;
	}
	#gt-list-content .gt-one .gt-o-top .aj-icon{
		font-size:35px;
		float:left;
	}
	#gt-list-content .gt-one .gt-o-top .more{
		float:right;
		font-size:12px;
		color:#333;
	}
	#gt-list-content .gt-one .gt-o-content{
		min-height:1880px;
		padding:10px 0 20px;
	}
	
	.tbkitem-one{
		padding-top:5px;
		padding-bottom:5px;
	}
	.tbkitem-one .text-center{
		text-align:center;
		padding:20px 0;
	}
	.tbkitem-one .border-wrap{
		border:1px solid #dcdcdc;
		padding-top:10px;
		padding-bottom:10px;
	}
	.tbkitem-one .border-wrap:hover{
		border-color:#f04848;
		box-shadow:#ccc 0 2px 5px;
	}
	.tbkitem-one .img-wrap{
		height:220px;
		overflow: hidden;
	}
	.tbkitem-one .title{
		height:40px;
		line-height: 20px;
		font-size:12px;
		overflow:hidden;
	}
	.tbkitem-one .old-price{
		color:#aaa;
		font-size:12px;
		text-decoration: line-through;
	}
	.tbkitem-one .new-price{
		color:#db3f3f;
		font-size:12px;
		font-weight:bold;
	}
	.tbkitem-one .row{
		padding:5px 0;
	}
	.tbkitem-one .center{
		text-align:center;
	}
</style>