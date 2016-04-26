<%@page import="ajax.model.entity.Exam"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Exam exam = (Exam) request.getAttribute("exam");


%>

<style>
@media (max-width: 800px) {

  .aj-exercise .cover .amid .info {
    padding-left: 50%!important;
  }
  .aj-exercise .afot .zhishi2 {
    display: block;
  }
}

.aj-exercise .cover .amid .img-wrap{
	position:absolute;
	width:40%;
	max-width:200px;
	height: 170px;
	text-align: center;
	font-size: 0;
}
.aj-exercise .cover .amid .img-wrap:before{
	content:"";
	width:0;
	height: 100%;
	vertical-align: middle;
	position: relative;
}
.aj-exercise .cover .amid .img-wrap img{
	max-width: 100%;
	max-height: 170px;
	vertical-align: middle;
	display: inline-block;
}

.aj-exercise {
  position: relative;
  border: 1px solid #ccc;
  padding: 50px 20px 10px;
  color: #666;
  border-radius: 3px;
  overflow: hidden;
}
.aj-exercise a {
  color: #666;
  text-decoration: none;
}
.aj-exercise .cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: white;
}
.aj-exercise .cover .inside {
  padding: 20px;
}
.aj-exercise .cover .title {
  margin: 0;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
}
.aj-exercise .cover .amid {
  position: relative;
}

.aj-exercise .cover .amid .info {
  padding-top: 20px;
  padding-left: 200px;
  min-height: 170px;
}
.aj-exercise .cover .amid .info .icon {
  color: #5bc0de;
}
.aj-exercise .cover .amid .desc {
  background: #f0f0f0;
  color: #666!important;
  padding: 20px;
  border-radius: 0;
  border: none;
  overflow-y: auto;
  margin-bottom: 30px;
  z-index: 1;
  position: relative;
  font-size: 14px;
}
.aj-exercise .cover .afot {
  text-align: center;
}
.aj-exercise .cover .afot .start {
  display: inline-block;
  text-align: center;
  padding: 10px 0;
  width: 110px;
  color: #FFF;
  font-size: 14px;
  border-radius: 3px;
  border: none 0;
  cursor: pointer;
  line-height: normal;
  outline: 0;
  white-space: nowrap;
  background-color: #00BC9B;
}
.aj-exercise .timing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #3D444C;
}
.aj-exercise .timing .progress {
  margin-top: 15px;
}
.aj-exercise .timing .left {
  height: 50px;
  width: 70%;
  float: left;
  padding: 0 10px;
}
.aj-exercise .timing .right {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  width: 30%;
  line-height: 50px;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: #2d3339;
}
.aj-exercise .timing .progress-bar {
  min-width: 20px;
}
.aj-exercise .atop {
  padding: 15px 0 15px;
  border-bottom: 1px solid #eee;
}
.aj-exercise .atop .icon {
  font-size: 18px;
}
.aj-exercise .atop .title {
  position: relative;
  top: -2px;
  font-size: 18px;
}
.aj-exercise .amid {
  padding: 20px 0 0;
}
.aj-exercise .amid .question {
  display: block;
  margin-bottom: 20px;
}
.aj-exercise .amid .choices .atag {
  margin-bottom: 20px;
  border: 1px solid #d4d4d4;
  border-radius: 2px;
  padding: 12px 20px 13px;
  background: #FFF;
  display: block;
  word-break: break-all;
}
.aj-exercise .amid .choices .atag:hover {
  box-shadow: #aaa 0 0 5px;
}
.aj-exercise .amid .choices .atag.selected,.aj-exercise .amid .choices .atag.answer {
  border-color: #1abc9c;
  background: #F0F8FF;
  color: #1abc9c;
}
.aj-exercise .amid .choices.wrong .atag.selected{
	border-color:red;
}
.aj-exercise .afot .prev {
  background-color: #5bc0de;
}
.aj-exercise .afot .next {
  background-color: #00BC9B;
}
.aj-exercise .afot .submit {
  background-color: #f0ad4e;
}
.aj-exercise .afot .abtn {
  display: inline-block;
  text-align: center;
  padding: 10px 0;
  width: 110px;
  color: #FFF;
  font-size: 14px;
  border-radius: 3px;
  border: none 0;
  cursor: pointer;
  line-height: normal;
  outline: 0;
  white-space: nowrap;
}
.chakan_cuoti{
  display: inline-block;
  text-align: center;
  padding: 10px 0;
  width: 110px;
  color: #FFF;
  font-size: 14px;
  border-radius: 3px;
  border: none 0;
  cursor: pointer;
  line-height: normal;
  outline: 0;
  white-space: nowrap;
  background-color: #A52A2A;	
}
.aj-exercise .zhishi {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}
.aj-exercise .zhishi .aspan {
  position: relative;
}
.aj-exercise .zhishi .btn {
  background: white;
}
.aj-exercise .zhishi .btn.finish {
  background: #00BC9B;
  color: white;
}
.aj-exercise .zhishi .btn.finish.btn-wrong{
	background: #f04848;
}
.aj-exercise .zhishi .cur .btn {
  box-shadow: green 0 0 2px;
}
.aj-exercise .zhishi .cur .aflag {
  display: block;
}
.aj-exercise .zhishi .aflag {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.aj-exercise .cover-end {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 11;
}
.aj-exercise .cover-end .logo {
  height: 180px;
  overflow: auto;
}

.aj-exercise .cover-end .logo ul {
	padding: 20px;
}

.aj-exercise .cover-end .logo ul li{
	font-family: 12px;
}

.aj-exercise .cover-end .logo ul li{
	font-family: 12px;
}


.aj-exercise .cover-end .logo em {
  line-height: 180px;
  font-size: 80px;
  color: lightblue;
}
.aj-exercise .cover-end .amid {
  padding: 20px;
}
.aj-exercise .cover-end .title {
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
}
.aj-exercise .cover-end .result {
  line-height: 30px;
}
.aj-exercise .cover-end .desc {
  background: #f0f0f0;
  color: #666!important;
  padding: 20px;
  border-radius: 0;
  border: none;
  overflow-y: auto;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
  font-size: 14px;
}

</style>

<div class="aj-exercise" id="aj-exam" ng-controller="examController">
    <div class="cover" ng-hide="isStart">
        <div class="inside">
            <em class="glyphicon glyphicon-th-large"></em>
            <span class="title" ng-bind="cover.title"></span>
            <div class="amid">
                <div style="position:relative;">
                    <div class="img-wrap">
                    	<img class="img" ng-src="{{cover.img}}" src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/images%2Fweb%2Fpic%2Fdot.jpg"/>
                    </div>
                    <div class="info">
                        <p class="line">
                            题目类型 :
                            <span ng-bind="cover.type"></span>
                        </p>
                        <p class="line">完成时间 :
                            <span ng-bind="cover.time"></span>
                        </p>
                        <p class="line">难度系数 :
                            <span ng-repeat="diff in cover.difficulty">
                                <em class="icon glyphicon glyphicon-star"></em>
                            </span>
                        </p>
                        <p class="line">题目数量 :
                            <span ng-bind="cover.num"></span>
                        </p>
                    </div>
                </div>
                <div class="desc">
                    <p class="line">1、请在规定时间完成试卷内全部题目，考试时间结束，系统将自动交卷。</p>
                    <p class="line">2、所有题目可通过答题卡返回修改，点击提前交卷后试卷提交，将无法继续答案，请谨慎提交。</p>
                    <p class="line">3、请诚信答题，独立完成。</p>
                    <p class="line">4、祝你好运。</p>
                </div>
            </div>
            <div class="afot">
                <a class="start" href="javascript:;" ng-click="start()">开始</a>
            </div>
        </div>

    </div>

    <div class="cover-end" style="display: none;" ng-class="(isFinished && !isShowWrong) ? 'aj-show' : 'aj-hide'">
        <div class="logo">
        	
        	<ul class="list-group">
			  <li class="list-group-item" ng-repeat="rank in ranks" 
			  	ng-class="{'list-group-item-success' : ($index == 0), 
			  				'list-group-item-info' : ($index == 1), 
			  				'list-group-item-warning' : ($index == 2)}">
			    <span class="badge" ng-bind="rank['score']"></span>
			    <span ng-bind="$index + 1"></span>
       			<span>. </span>
       			<span>
       				<img width="20" height="20" style="border-radius:50%;overflow: hidden;"
       				src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/images%2Fweb%2Fpic%2Fdot.jpg" 
       					ng-src="{{rank['img']}}" />
       			</span>
       			<span ng-bind="rank['name']"></span>
			  </li>
			</ul>
			
        </div>
        <div class="amid">
            <div class="title">
                你已完成测试 :
                <span ng-bind="cover.title"></span>
            </div>
            <div>
                你答对了
                <span ng-bind="totalRight" class="label label-info"></span>
                题,
                用时 :
                <span ng-bind="time" class="label label-info"></span>
            </div>
            <div class="result">
                你的得分 :
                <span class="score label label-warning" ng-bind="score"></span>
            </div>
            <div class="desc">
                <p class="line">了解得分规则 : </p>
                <p class="line">1、每答对一道题得10分, 答错不扣分</p>
                <p class="line">2、在默认答题时间前完成试卷, 每提前交卷一秒多获得
                    <span class="label label-default">(对题数 / 总题数) * 0.5</span>分</p>
                <p class="line">本次测试 :
                    答题得分 ->
                    <span ng-bind="scoreFromAnswer" class="label label-success"></span>
                    时间加成 ->
                    <span ng-bind="scoreFromTime" class="label label-success"></span>
                </p>
            </div>
            
            <div style="text-align:center;">
            	<button class="chakan_cuoti" ng-click="showWrong()">查看错题</button>
            </div>
            <div class="share">
                分享给好友
                <div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone"></a><a href="#" class="bds_tsina" data-cmd="tsina"></a><a href="#" class="bds_tqq" data-cmd="tqq"></a><a href="#" class="bds_renren" data-cmd="renren"></a><a href="#" class="bds_weixin" data-cmd="weixin"></a></div>


                <script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>

            </div>
        </div>

    </div>

    <div style="min-height: 480px">
        <div class="timing clearfix">
            <div class="left">
                <div class="progress">
                    <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="finishNum()" aria-valuemin="1" aria-valuemax="{{questions.length}}" style="width: {{finishPercent()}};">
                        {{finishPercent()}}
                    </div>
                </div>
            </div>
            <div class="right">
                <span>时间 : </span>
                <span ng-bind="time"></span>
            </div>
        </div>

        <div class="atop">
            <span class="icon glyphicon glyphicon-question-sign"></span>
            <span class="title" ng-bind="title"></span>
        </div>
        <div class="amid">
            <span class="question" ng-bind="questions[cur - 1].title"> </span>
            <ul class="choices" ng-class="{'wrong' : (questions[cur - 1]['isRight'] === false)}">
                <li class="choice" ng-repeat="choice in questions[cur - 1].choices">
                    <a ng-class="{'selected' : choice.checked, 'answer' : choice['isAnswer']}"
                       href="javascript:;" class="atag" ng-click="mkChoice($index)">
                        <em  class="icon glyphicon glyphicon-record"></em>
                        <span ng-bind="choice.title"></span>
                    </a>
                </li>
                
            </ul>
        </div>
        <div class="afot" ng-hide="isFinished">
            <a href="javascript:;" class="prev abtn" ng-click="prev()">上一题</a>
            <a href="javascript:;" class="next abtn" ng-click="next()">下一题</a>
            <a href="javascript:;" class="submit abtn" ng-click="submit()">提交</a>

            <span class="zhishi2" style="padding-left: 10px;">
                <span>当前</span>
                <span ng-bind="cur"></span>
                <span>/</span>
                <span>共</span>
                <span ng-bind="questions.length"></span>
            </span>
            <span>&nbsp;||&nbsp;</span>
            <input type="checkbox" ng-model="isAutoNext"/> 选择后自动下一题
        </div>
        
        
        <div class="zhishi">
            <div class="btn-group" role="group" aria-label="First group">
            <span class="aspan" ng-class="cur == ($index + 1) ? 'cur' : ''" ng-repeat="question in questions">
            	
                <button ng-if="question.isRight == undefined"
                        ng-click="changeQuestion($index + 1)"
                        ng-class="question.finish ? 'finish' : ''" type="button" class="btn btn-default"
                        ng-bind="$index + 1"></button>
                        
                <button ng-if="question.isRight === false"
                        ng-click="changeQuestion($index + 1)"
                        ng-class="question.finish ? 'finish' : ''" type="button" class="btn btn-wrong"
                        ng-bind="$index + 1"></button>        
                  
                <button ng-if="question.isRight === true"
                        ng-click="changeQuestion($index + 1)"
                        ng-class="question.finish ? 'finish' : ''" type="button" class="btn btn-default"
                        ng-bind="$index + 1"></button>        
                  
                <span class="glyphicon glyphicon-flag aflag"></span>
            </span>
            </div>
        </div>
        
         <button ng-show="isFinished" class="btn btn-default" ng-click="showRankPage()"> 
            	返回得分榜
         </button>

    </div>

</div>

<script src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static%2Fjs%2Fbmob-min.js"></script>
<script>
    Bmob.initialize("4b182edd98c2877e7d57a98b70099f63", "40adce0b07b6a03c1bb6c9b57e22ed2b");

$(function () {
        var app = angular.module("exam", []);
        var container = $("#aj-exam");
        app.controller("examController", function ($scope, $timeout, $http) {
            $scope.cover = {};
            $scope.title = "测试题";
            $scope.cur = 1;
            $scope.isFinished = false;
            $scope.time = "00:00";
            $scope.isStart = false;
            $scope.startTime = null;
            $scope.endTime = null;
            $scope.questions = [];
            $scope.score = "计算中...";
            $scope.isAutoNext = true;
            $scope.trueAnswers = [];
            $scope.totalRight;
            $scope.scoreFromAnswer = 0;
            $scope.scoreFromTime = 0;
            $scope.config = null;
            $scope.isShowWrong = false;
            $scope.ranks = [];


            $scope.finishPercent = function () {
                return ($scope.finishNum() / $scope.questions.length) * 100 + "%";
            };

            $scope.finishNum = function () {
                var num = 0;
                angular.forEach($scope.questions, function (key) {
                    if (key.finish) {
                        num++;
                    }
                });
                return num;
            };
            
            $scope.mkChoice = function (index) {
                // index starts from 0
                angular.forEach($scope.questions[$scope.cur - 1].choices, function (key) {
                    key.checked = false;
                });
                $scope.questions[$scope.cur - 1].choices[index].checked = true;
                $scope.questions[$scope.cur - 1].finish = true;
                $scope.checkFinish();

                if ($scope.isFinished) {
                    $scope.submit();
                }
                if ($scope.isAutoNext) {
                    $scope.next();
                }
            };
            
            $scope.next = function () {
                if ($scope.cur + 1 <= $scope.questions.length) {
                    $scope.cur ++;
                }
            };
            $scope.prev = function () {
                if ($scope.cur - 1 > 0) {
                    $scope.cur--;
                }
            };

            $scope.checkFinish = function () {
                var bool = true;
                angular.forEach($scope.questions, function (key) {
                    if (!key.finish) {
                        bool = false;
                    }
                });
                $scope.isFinished = bool;
            };

            $scope.changeQuestion = function ($index) {
                $scope.cur = $index;
            };
            
            $scope.calculateTime = function () {
                $timeout(function () {
                    if (!$scope.isFinished) {
                        $scope.endTime = (new Date()).getTime();
                        var interval = ((new Date()).getTime() - ($scope.startTime.getTime())) / 1000;
                        var seconds = Math.floor(interval % 60);
                        var minutes = Math.floor(interval / 60);
                        if (seconds < 10) {
                            seconds = "0" + seconds;
                        }
                        if (minutes < 10) {
                            minutes = "0" + minutes;
                        }

                        $scope.time = minutes + ":" + seconds;
                        $scope.calculateTime();
                    }
                }, 1000);
            };

            $scope.loadPaper = function (fn) {
            	var config = $.parseJSON($("#aj-exam-json")[0].value);
            
            	
            	
                $http.get(config.url).then(function (data) {
                    $scope.questions = data.data.data.questions;
                    $scope.cover = data.data.data.cover;
                    $scope.trueAnswers = data.data.data["answers"];
                    $scope.config = data.data.data["config"];

                    fn && fn();
                });
            };


            $scope.start = function () {
            	var user = new aj.User();
            	if (!user.isLogin()) {
            		aj.Tishi("亲, 请先登录一下呗~~");
            		return;
            	}
            
            
                $scope.isStart = true;
                $scope.startTime = new Date();
                $scope.calculateTime();
            };

            $scope.init = function () {
                $scope.loadPaper();
            };
            $scope.init();

            $scope.test = function() {
                console.log($scope.isAutoNext);
            };

            $scope.submit = function () {
                var i,j;
                var choices;
                var answers = [];
                var isRight;    // 某一题是否正确
                var trueAnsers = $scope.trueAnswers;
                var rightChoice;
                var rightNum = 0;
                var totalScore = 0;

                for (i = 0; i < $scope.questions.length; i++) {
                    isRight = false;
                    choices = $scope.questions[i]["choices"];
                    rightChoice = trueAnsers[i];

                    for(j = 0; j < choices.length; j++) {
                        if (choices[j].checked && (j + 1) == rightChoice) {
                            rightNum ++;
                            isRight = true;
                        }
                        
                        if ((j + 1) ==rightChoice) {
                        	choices[j]["isAnswer"] = true;
                        }
                    }

                    $scope.questions[i]["isRight"] = isRight;
					
                }

                $scope.totalRight = rightNum;
                totalScore += rightNum * 10;

                $scope.scoreFromAnswer = totalScore;

                // 默认5分钟完成题目
                var leftSconds = 300 - ($scope.endTime - $scope.startTime) / 1000;
                $scope.scoreFromTime = (leftSconds * (rightNum / $scope.questions.length) * 0.5).toFixed(2);

                totalScore += (leftSconds * (rightNum / $scope.questions.length) * 0.5);
                $scope.score = totalScore.toFixed(2);


                $scope.submitToBmob();
                $scope.dealShare();
            };
            
            $scope.dealShare = function () {
           	    window._bd_share_config = {
			        common : {
			            bdDesc : "我刚刚参加了" + $scope.title + "测试,获得了" + $scope.score + "分, 你也来试试看.",
			            bdUrl : location.href,
			            bdPic : "http://www.nigeerhuo.com:8888/images/web/pic/logo.PNG"
			        }
			    };
            }

            $scope.submitToBmob = function () {
                var GameScore = Bmob.Object.extend("exam_result");
                var gameScore = new GameScore();

				var user = new aj.User();
				
				if (user.isLogin()) {
					gameScore.set("user_id", user.getUserid() + "");
	                gameScore.set("user_name", user.getNickname());
	                gameScore.set("user_img", user.getUserimg());
				} else {
					gameScore.set("user_id", "-1");
	                gameScore.set("user_name", "匿名用户");
	                gameScore.set("user_img", "");
				}
               
                gameScore.set("score_total", $scope.score + "");
                gameScore.set("score", parseFloat($scope.score));
                gameScore.set("score_time", $scope.scoreFromTime + "");
                gameScore.set("score_answer", $scope.scoreFromAnswer + "");
                gameScore.set("paper_id", $scope.id + "");


                gameScore.save(null, {
                    success: function(object) {
                        var query = new Bmob.Query(GameScore);
                        query.limit(100);
                        query.descending("score");
                        query.equalTo("paper_id", ($scope.id + ""));
                        
                        
                        query.find({
						  success: function(results) {
						    $scope.$apply(function () {
						    	for (var i = 0; i < results.length; i++) {
						    		$scope.ranks.push({
						    			"name" : results[i].get("user_name"),
						    			"score" : results[i].get("score"),
						    			"img" : results[i].get("user_img")
						    		});
						    	}
						    });
						  },
						  error: function(error) {
						    	console.log(error);
						  }
						});
                    },
                    error: function(model, error) {
                        console.log(error);
                    }
                });
            }
            
            $scope.showWrong = function () {
            	$scope.isShowWrong = true;
            }
            
            $scope.showRankPage = function() {
            	$scope.isShowWrong = false;
            }
        });
        angular.bootstrap(container, ["exam"]);
    })

</script>

