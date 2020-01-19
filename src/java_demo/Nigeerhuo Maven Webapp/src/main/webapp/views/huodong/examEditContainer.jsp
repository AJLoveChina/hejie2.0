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
.aj-exercise input{
	width:80%;
	height: 25px;
	border:1px solid #ccc;
}
.aj-exercise .ttt input {
	border:none;
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
  text-align: center;
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
            <span class="title">试题工厂</span>
            <div class="amid">
                <div style="position:relative;">
                    <div class="img-wrap">
                    	<img class="img" src="{{cover.img}}"/>
                    </div>
                    <div class="info">
                        <p class="line">
                         	试题名称 : 
                            <input type="text" ng-model="cover.title" />
                        </p>                    
                        <p class="line">
                         	   题目类型 :
                            <span ng-bind="cover.type"></span>(目前只支持选择题)
                        </p>
                        <p class="line">完成时间 :
                            <input type="text" ng-model="cover.seconds" style="width:50px;"/>秒
                        </p>
                        <p class="line">难度系数 :
                            <input type="text" ng-model="difficulty" style="width:150px;" placeholder="难度系数1~5"/>
                        </p>
                        <p class="line">题目数量 :
                            <span ng-bind="cover.num"></span>
                        </p>
                    </div>
                </div>
                <div class="desc">
                    <p class="line">1、请准确填写你的问题</p>
                    <p class="line">2、确定你给出的答案是正确的</p>
                    <p class="line">3、你需要制定10道题目</p>
                    <p class="line">4、谢谢你对试题工厂的贡献, 你可以之后分享给你的好友</p>
                </div>
            </div>
            <div class="afot">
                <a class="start" href="javascript:;" ng-click="start()">开始出卷</a>
            </div>
        </div>

    </div>

    <div class="ttt" style="min-height: 480px">
        <div class="timing clearfix">
            <div class="left">
                <div class="progress">
                    <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="10" aria-valuemin="1" aria-valuemax="10" style="width: 100%;">
                        你个二货
                    </div>
                </div>
            </div>
            <div class="right">
                <span>时间 : </span>
                <span>xx : xx</span>
            </div>
        </div>

        <div class="atop">
            <span class="icon glyphicon glyphicon-question-sign"></span>
            <span class="title" ng-bind="title"></span>
        </div>
        <div class="amid">
            <input class="question" style="width:100%;" ng-model="questions[cur - 1].title" />
            
            <ul class="choices" ng-class="{'wrong' : (questions[cur - 1]['isRight'] === false)}">
                <li class="choice" ng-repeat="choice in questions[cur - 1].choices">
                    <span ng-class="{'selected' : choice.checked, 'answer' : choice['isAnswer']}"
                       href="javascript:;" class="atag">
                       <!-- glyphicon glyphicon-check -->
                       <!-- glyphicon glyphicon-unchecked -->
                        <a href="javascript:;" ng-class="{'glyphicon glyphicon-unchecked' : !choice['isAnswer'], 'glyphicon glyphicon-check' : choice['isAnswer'] }" ng-click="thisisAnswer($index)" class="icon" title="请在答案选项前勾选我" ></a>
                        <input ng-model="choice.title" />
                    </span>
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

<script>
    //Bmob.initialize("4b182edd98c2877e7d57a98b70099f63", "40adce0b07b6a03c1bb6c9b57e22ed2b");

$(function () {
        var app = angular.module("exam", []);
        var container = $("#aj-exam");
        app.controller("examController", function ($scope, $timeout, $http) {
            $scope.cover = {};
            $scope.title = "请填写问题,选项,以及在答案选项前勾选";
            $scope.cur = 1;
            $scope.isFinished = false;
            $scope.time = "00:00";
            $scope.isStart = false;
            $scope.startTime = null;
            $scope.endTime = null;
            $scope.questions = [];
            $scope.score = "计算中...";
            $scope.isAutoNext = false;
            $scope.trueAnswers = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
            $scope.totalRight;
            $scope.scoreFromAnswer = 0;
            $scope.scoreFromTime = 0;
            $scope.config = null;
            $scope.isShowWrong = false;
            $scope.difficulty = 3;
            $scope.oldPaperTitle = null;
            $scope.autoSaveKey = "aj-exam-edit-status-key";
            


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
            
           

            $scope.loadPaper = function (fn) {
            	var config = JSON.parse($("#aj-exam-json")[0].value);
            
            	
            	
                $http.get(config.url).then(function (data) {
                    $scope.questions = data.data.data.questions;
                    $scope.cover = data.data.data.cover;
                    $scope.config = data.data.data["config"];
					
					$scope.oldPaperTitle = data.data.data.cover.title;
                    fn && fn();
                });
            };
            
            
            $scope.autoBack = function () {
            
            	var config = $.parseJSON(sessionStorage.getItem($scope.autoSaveKey));
            	
            	
            	console.log(config);
            	
            	$scope.cover = config.cover;
           		$scope.questions  =  config.questions;
           		$scope.cur  =  config.cur;
           		$scope.isStart = config.isStart;
           		$scope.trueAnswers = config.trueAnswers;
           		$scope.difficulty = config.difficulty;
           		
           		
            }
            
            var isFirst = true;
            $scope.autoSave = function () {
            	var configFromLocal = sessionStorage.getItem($scope.autoSaveKey);
            	
            	if (isFirst && configFromLocal) {
            		isFirst = false;
            	} else {
	            	var config = {};
	            		
	           		config.cover = $scope.cover;
	           		config.questions = $scope.questions;
	           		config.cur = $scope.cur;
	           		config.isStart = $scope.isStart;
	           		config.trueAnswers = $scope.trueAnswers;
	           		config.difficulty = $scope.difficulty;
	           		
	           		sessionStorage.setItem($scope.autoSaveKey, JSON.stringify(config));
	           		
	           		console.log("已自动保存...");
            	}
            	
            	
           		$timeout(function () {
            		$scope.autoSave();
           		}, 1000);
            }
            
            //$scope.autoSave();
           
            	
           


            $scope.start = function () {
                if (!$scope.checkPaperTitle()) {
                	console.log(123);
                	aj.Tishi("请填写试卷的标题!");
                	return false;
                }
                
                $scope.isStart = true;
                $scope.startTime = new Date();
            };
            
            $scope.checkPaperTitle = function () {
            	return $scope.oldPaperTitle != $scope.cover.title;
            }

            $scope.init = function () {
            	/* var val = sessionStorage.getItem($scope.autoSaveKey);
            	
            	if (val) {
            		$scope.autoBack();
            	} else {
            		
            	} */
            	$scope.loadPaper();
            };
            $scope.init();

            $scope.test = function() {
                console.log($scope.isAutoNext);
            };

			$scope.checkEveryQuestionHasAnswer = function () {
				for (var i = 0; i < $scope.trueAnswers.length; i++) {
					if ($scope.trueAnswers[i] == -1) {
						return false;
					}
				}
				return true;
			}
            $scope.submit = function () {
                if (!$scope.checkEveryQuestionHasAnswer()) {
                	aj.Tishi("有一些选择题你木有填写答案");
                	return;
                }
                
                var diffculty = $scope.difficulty;
                var diffcultyArr = [];
                for (var i = 1; i <= diffculty; i++) {
                	diffcultyArr.push(i);
                }
               	 var data = {
				    "isok" : true,
				    "data" : {
				        "config" : {
				            "id" : "0"
				        },
				        "cover" : {
				            "title" : $scope.cover.title,
				            "img" : "http://images.nigeerhuo.com/images/web/pic/exam2.jpg",
				            "type" : "选择题",
				            "time" : ($scope.cover.seconds / 60).toFixed(1) + "分钟",
				            "seconds" : $scope.cover.seconds,
				            "difficulty" : diffcultyArr,
				            "num" : 10
				        },
				        "answers" : $scope.trueAnswers,
				        "questions" : $scope.questions
				    }
				};
				
				
				$.ajax({
					url : "/editExam?action=add",
					method : "POST",
					data : {
						"data" : JSON.stringify(data)
					},
					dataType : "json",
					success : function (response)  {
						if(response.isok) {
							aj.Tishi(response.data);
						} else {
							aj.Tishi(response.data);
						}
					},
					error : function (err) {
						aj.Tishi("服务器君今天出了一些故障,我们正在加紧抢救...抱歉");
					}
				});
            };

            $scope.submitToBmob = function () {
                var GameScore = Bmob.Object.extend("exam_result");
                var gameScore = new GameScore();

                gameScore.set("user_id", "");
                gameScore.set("user_name", "");
                gameScore.set("user_img", "");
                gameScore.set("score_total", $scope.score);
                gameScore.set("score_time", $scope.scoreFromTime);
                gameScore.set("score_answer", $scope.scoreFromAnswer);


                gameScore.save(null, {
                    success: function(object) {
                        console.log("保存成绩成功");
                        console.log(object);
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
            
            $scope.thisisAnswer = function ($index) {
            	var choices = $scope.questions[$scope.cur -  1].choices;
            	
            	for (var i = 0; i < choices.length; i++) {
            		choices[i]["isAnswer"] = false;
            	}
            
            	choices[$index]["isAnswer"] = true
            	
            	$scope.trueAnswers[$scope.cur - 1] = $index + 1;
            }
        });
        angular.bootstrap(container, ["exam"]);
    })

</script>

