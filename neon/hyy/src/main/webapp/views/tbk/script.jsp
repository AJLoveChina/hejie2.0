<%@ page pageEncoding="UTF-8"%>
<script>
$(function () {
	require(["main"], function () {
		require(["tools/tools", "model/Goods"], function (tools, Goods) {
			"use strict";
			var container = $("#goods-type-roll");
			var app = angular.module("goodsTypeRollApp", []);
			
			app.controller("mainController", function ($scope) {
				$scope.s = {};
				$scope.s.goodsTypeList = [];
				/**
				* 是否处于点击后的滚动状态
				*/
				$scope.s.isAnimateNow = false;
				/**
				* 保存每个goodsType区域当前展示的商品列表所对应的查询对象
				*/
				$scope.s.curQueryParams = {};
				/**
				* 表示某个区域是否已经初始化加载
				*/
				$scope.s.isInit = {};
				/**
				*只保存某一区域当前显示的tbkitems集合
				*形如 :
				* {
				*	key : List<TbkItem>
				* }
				*/
				$scope.s.tbkItems = {};
				$scope.s.index = 0;
				$scope.s.detail_url = "/t/one/";
				
				Goods.getGoodsTypeList(function (res) {
					$scope.$apply(function () {
						$.each(res.data, function (index, item) {
							item.goodsTypeHref = Goods.getGoodsTypeHref({
								goodsTypeId : item.id
							});
						})
						$scope.s.goodsTypeList = res.data;
					})

					$scope.calculateWhichIndexNowWhenScroll();
				});
				
				$scope.changeTo = function (index) {
					$scope.s.index = index;
					$scope.scrollIntoView(index);
				}
				
				$scope.scrollIntoView = function (index) {
					var id = "#gt-one-block-" + index;
					var one = $(id);
					
					$scope.initBlock(index);
					$scope.s.isAnimateNow = true;
					
					$("html,body").animate({
						scrollTop : one.offset().top - $(window).height() / 5
					}, function () {
						$scope.$apply(function () {
							$scope.s.isAnimateNow = false;
						});
					})
				};
				
				$scope.reCalculatePositionOfFixedBar = function () {
					var bar = container.find(".gt-list-fix");
					
					bar.animate({
						top : ($(window).height() - 260) / 2,
						left : ($(window).width() - 1050) / 2 - 80
					});
				};
				$scope.reCalculatePositionOfFixedBar();
				
				/**
				* 计算滚动到哪一个区域了
				*/
				$scope.calculateWhichIndexNowWhenScroll = function () {
					var gtOneList = $("#gt-list-content .gt-one"),
						scrollTop = 0,
						i,
						offsetTop,
						winHeight,
						bool1 = false,
						bool2 = false;
					
					$(window).on("aj.scroll", function () {
						calculate();
					})
					calculate();
					function calculate() {
						scrollTop = $(window).scrollTop();
						winHeight = $(window).height();
						bool1 = false;
						bool2 = false;
						
						for (i = 0; i < gtOneList.length; i++) {
							offsetTop = gtOneList.eq(i).offset().top;
							if ((offsetTop < (scrollTop + winHeight / 2)) && 
									(offsetTop + gtOneList.eq(i).height() > (scrollTop + winHeight / 2))) {
								$scope.$apply(function () {
									$scope.s.index = i + 0;
									
								})
								break;
							}
						}
						for (i = 0; i < gtOneList.length; i++) {
							offsetTop = gtOneList.eq(i).offset().top;
							if ( (offsetTop < scrollTop + winHeight) && 
									(offsetTop > scrollTop) ) {
								$scope.$apply(function () {
									$scope.initBlock(i + 0);
								})
								break;
							}
						}
					}
				};
				
				var lastTimeChangePageDate = + new Date();
				$(window).on("aj.tbkitems.list.calculatePageOK", function () {
					// 防止快速滚动造成的多区域同时加载
					if (+ new Date() - lastTimeChangePageDate > 500) {
						lastTimeChangePageDate = + new Date();
						$scope.initBlock($scope.s.index);
					}
				})
				
				/**
				* 初始化某一个区域
				*/
				$scope.initBlock = function (index) {
					if (!$scope.isInit(index) && !$scope.s.isAnimateNow) {
						$scope.s.isInit["init" + index] = true;
						$scope.loadTbkItems(index, 1);
					}
				}
				/**
				* 判断某一个区域是否已经初始化
				*/
				$scope.isInit = function (index) {
					return $scope.s.isInit["init" + index] === true;
				}
				
				/**
				* 设置指定index区域当前显示的tbkitems集合
				*/
				$scope.setTbkItemsList = function (index, list) {
					$scope.s.tbkItems["key" + index] = list;
				};
				/**
				* 返回指定index区域当前显示的tbkitems集合
				*/
				$scope.getTbkItemsList = function (index) {
					var list = $scope.s.tbkItems["key" + index];
					return list === undefined ? [] : list;
				}
				
				/**
					1=>未初始化, 2=>已初始化,但是木有数据  3=>正常
				*/
				$scope.getStatus = function (index) {
					var list = $scope.s.tbkItems["key" + index];
					if (list === undefined) {
						return 1;
					} else {
						if (list.length === 0) {
							return 2;
						} else {
							return 3;
						}
					}
				}
				
				/**
				*	1.PC 2.Wap
				*/
				$scope.getPlatForm = function () {
					if (tools.isWap()) {
						return 2;
					} else {
						return 1;
					}
				}
				/**
				* 加载第index(from 0)区域, 并指定加载的页码
				*/
				$scope.loadTbkItems = function (index, page) {
					
					var goodsType = $scope.s.goodsTypeList[index],
						platform,
						data;
					
					platform = $scope.getPlatForm();
					
					var params = $scope.s.curQueryParams[index];
					if (!params) {
						data = {
							plateForm :  platform,
							page : page,
							goodsTypeId : goodsType.id
						}
						$scope.s.curQueryParams[index] = data;
					}
					
					$.ajax({
						url : "/t/tbkQuery",
						data : {
							data : JSON.stringify(data)
						},
						type : "POST",
						dataType : "JSON",
						success : function (ar) {
							if (ar.isok) {
								console.log($scope.s.index);
								$scope.dealResponseItemList(ar);
								$scope.$apply(function () {
									$scope.setTbkItemsList(index, ar.data);
								})
							} else {
								tools.tishi("二货君出了一点点小问题,正在极力抢救~");
							}
						},
						error : function (err) {
							tools.tishi("加载商品出错~");
							console.log(err);
						}
					});
				};
				
				/**
				* 处理一下返回的商品列表,比如 处理时间显示, 添加detail_url
				*/
				$scope.dealResponseItemList = function (ar) {
					var i;
					var platform = $scope.getPlatForm();
					for (i = 0; i < ar.data.length; i++) {
						ar.data[i].js_time = tools.timeago(ar.data[i].dateEnteredOfSave);
						ar.data[i].js_detail_url = $scope.s.detail_url + ar.data[i].id + "?platform=" + platform;
					}
				}
				
				$(window).on("aj.resize", function () {
					$scope.reCalculatePositionOfFixedBar();
						});
						
					});
					
					angular.bootstrap(container, ["goodsTypeRollApp"]);
				});
			});
		});
	</script>