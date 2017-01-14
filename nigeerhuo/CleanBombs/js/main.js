/**
 * Created by ajax on 2017/1/13.
 * You can use the source code as you like and I appreciate it if you keep the wish below.
 * This is for my sister HYY, wish her happy forever.
 */
$(function () {
    var app = angular.module("app", []);
    var Div = {
        span : null, //divs 临时包裹容器 (Type : jquery Dom)
        arr : null,
        map : null,
        row : 0,
        col : 0,
        divNum : 0,
        bombNum : 0,
        gameover : false,

        resetGame : function () {
            this.gameover = false;
        },
        isGameOver : function () {
            return this.gameover;
        },
        changeToBomb : function (jDom) {
            jDom.addClass("bomb");
        },
        isBomb : function (jDom) {
            return jDom.hasClass("bomb");
        },
        flagDiv : function (jDom) {
            if (!Div.isBomb(jDom)) {
                var bombNum = this.getBombsNumAround(jDom);

                //jDom.html(bombNum);
                Div.setBombsAroundNum(jDom, bombNum);
                if (bombNum === 0) {
                    jDom.addClass("no-bomb-around");
                }
            }
        },
        setBombsAroundNum : function (jDom, bombNum) {
            jDom.attr("data-bombs-around-num", bombNum);
        },
        getBombsAroundNum : function (jDom) {
            return this.getBombsNumAround(jDom);
        },
        getBombsNumAround : function (jDom) {
            if (jDom.data("bombs-around-num") !== undefined) {
                return parseInt(jDom.data("bombs-around-num"));
            }
            var arrIndex = this.getAroundDivArrIndex(jDom);
            var total = 0;
            for (var i = 0; i < arrIndex.length; i++) {
                if (Div.isBomb(Div.findDiv(arrIndex[i]))) {
                    total += 1;
                }
            }
            return total;
        },
        /**
         * find div in span buffer dom
         */
        findDiv : function (index) {
            return this.span.find(".div" + index);
        },
        /**
         * find div in document
         */
        findDocDiv : function (index) {
            return $(".div" + index);
        },
        getAroundDivArrIndex : function (jDom) {
            var index = this.getIndex(jDom);
            var arr = [];

            if (this.getCol(jDom) !== 0) {
                arr.push(index - 1);
                arr.push(index - this.col - 1);
                arr.push(index + this.col - 1);
            }
            if (this.getCol(jDom) !== this.col - 1) {
                arr.push(index + 1);
                arr.push(index - this.col + 1);
                arr.push(index + this.col + 1);
            }
            arr.push(index - this.col);
            arr.push(index + this.col);

            arr = _.filter(arr, function (index) {
                return (index >= 0) && (index <= Div.divNum - 1);
            });
            return arr;
        },
        getAroundCrossDivArrIndex : function (jDom) {
            var index = this.getIndex(jDom);
            var arr = [];

            if (this.getCol(jDom) !== 0) {
                arr.push(index - 1);
            }
            if (this.getCol(jDom) !== this.col - 1) {
                arr.push(index + 1);
            }
            arr.push(index - this.col);
            arr.push(index + this.col);

            arr = _.filter(arr, function (index) {
                return (index >= 0) && (index <= Div.divNum - 1);
            });
            return arr;
        },
        attrIndex : function (jDom, index) {
            jDom.attr("data-index", index);
        },
        attrRow : function (jDom, row) {
            jDom.attr("data-row", row);
        },
        attrCol : function (jDom, col) {
            jDom.attr("data-col", col);
        },
        getIndex : function (jDom) {
            return parseInt(jDom.data("index"));
        },
        getRow : function (jDom) {
            return parseInt(jDom.data("row"));
        },
        getCol : function (jDom) {
            return parseInt(jDom.data("col"));
        },
        clickedDiv : function (jDom) {
            if (Div.isFlaged(jDom)) return;
            if (Div.isBomb(jDom)) {
                this.gameover = true;
                Div.openBomb(jDom);
                Div.showAllBombs();
                $(window).trigger("aj.gameover");
            } else {
                if (Div.getBombsAroundNum(jDom) > 0) {
                    Div.openDiv(jDom);
                } else {
                    var arrIndex = this.getAreaDivsCanBeOpenedOfClickedDom(jDom);
                    _.each(arrIndex, function (index) {
                        Div.openDiv($(".div" + index));
                    })
                }
            }
        },
        openBomb : function (jDom) {
            jDom.addClass("wrong-click");
        },
        showAllBombs : function () {
            $(".bomb").addClass("show-bomb");
        },
        openDiv : function (jDom) {
            if (Div.getBombsAroundNum(jDom) > 0) {
                jDom.html(Div.getBombsAroundNum(jDom));
            }
            jDom.removeClass("closed");
            jDom.addClass("open");
        },
        isOpened : function (jDom) {
            return jDom.hasClass("open");
        },
        getAreaDivsCanBeOpenedOfClickedDom : function (jDom) {
            var map = {},
                noBombsAroundArr = [],
                result = [];
            var crossAround;
            var one,
                i,
                div;
            noBombsAroundArr.push(Div.getIndex(jDom));
            result.push(Div.getIndex(jDom));

            while(noBombsAroundArr.length > 0) {
                one = noBombsAroundArr.pop();
                crossAround = Div.getAroundCrossDivArrIndex(Div.findDocDiv(one));
                for (i = 0; i < crossAround.length; i++) {
                    if (map[crossAround[i]]) continue;
                    div = Div.findDocDiv(crossAround[i]);
                    if (!Div.isNormalClosedDiv(div)) continue;
                    map[crossAround[i]] = true;
                    result.push(crossAround[i]);
                    if (Div.getBombsNumAround(div) === 0) {
                        noBombsAroundArr.push(crossAround[i]);
                    }
                }
            }

            return result;
        },
        isNormalClosedDiv : function (jDom) {
            return !jDom.hasClass("flaged") && !Div.isOpened(jDom);
        },
        isFlaged : function (jDom) {
            return jDom.hasClass("flaged");
        },
        flagAsBomb : function (jDom) {
            Div.clearFlag(jDom);
            jDom.addClass("flag-as-bomb");
            jDom.addClass("flaged");
            jDom.html("雷");
        },
        flagAsUnknown : function (jDom) {
            Div.clearFlag(jDom);
            jDom.addClass("flag-as-unknown");
            jDom.addClass("flaged");
            jDom.html("?");
        },
        clearFlag : function (jDom) {
            jDom.removeClass("flag-as-bomb");
            jDom.removeClass("flag-as-unknown");
            jDom.removeClass("flaged");
            jDom.html("");
        },
        rightClick : function (jDom) {
            if (this.isOpened(jDom)) return;
            if (jDom.hasClass("flag-as-unknown")) {
                Div.clearFlag(jDom);
            } else if (jDom.hasClass("flag-as-bomb")) {
                Div.flagAsUnknown(jDom);
            } else {
                Div.flagAsBomb(jDom);
            }
            $(window).trigger("aj.flag");
        },
        getNumUserFlagAsBomb : function () {
            return $(".flag-as-bomb").length;
        },
        getNumUserFlagAsBombThatAreRight : function () {
            return $(".flag-as-bomb.bomb").length;
        }
    };

    app.controller("main", function ($scope) {
        $scope.s = {};
        $scope.s.step = 1;
        $scope.s.divNum = 0;
        $scope.s.bombNum = 0;
        $scope.s.bombFound = 0;
        $scope.s.bombFoundReal = 0;
        $scope.s.row = 0;
        $scope.s.col = 0;
        $scope.s.width = 30;
        $scope.s.level = "1";
        $scope.s.gameover = false;
        $scope.s.seconds = 0;




        $scope.submitLevelForm = function(event) {
            var dom = $(event.target).find("input[name='choice']:checked"),
                a = parseInt(dom.data("a")),
                b = parseInt(dom.data("b"));

            $scope.s.divNum = a;
            $scope.s.bombNum = b;
            $scope.beginGame();

        };
        
        $scope.beginGame = function () {
            Div.resetGame();

            $scope.s.gameover = false;
            $scope.s.seconds = 0;

            if ($scope.s.divNum >= $scope.s.bombNum) {
                $scope.s.divNum = 100;
                $scope.s.bombNum = 10;
            }

            Div.divNum = $scope.s.divNum;
            Div.bombNum = $scope.s.bombNum;

            $scope.calculateRowsAndCols();
            $scope.renderContainer();
            $scope.showContainer();
            $scope.calculateTime();
        };

        $scope.returnHome = function () {
            $scope.s.step = 1;
        };
        
        $scope.calculateTime = function () {
            setInterval(function () {
                $scope.$apply(function () {
                    if (!$scope.s.gameover) {
                        $scope.s.seconds += 1;
                    }
                })
            }, 1000)
        };

        $scope.calculateRowsAndCols = function () {
            var guide = $("#guide"),
                width = guide.width();
            $scope.s.col = Math.floor(width / $scope.s.width);
            $scope.s.row = Math.ceil($scope.s.divNum / $scope.s.col);

            Div.col = $scope.s.col;
            Div.row = $scope.s.row;

            log("#container Width == #guide Width:" + width);
            log("col:" + $scope.s.col);
            log("row:" + $scope.s.row);
        };

        $scope.showContainer = function () {
            $scope.s.step = 2;
        };

        $scope.renderContainer = function () {
            var span = $("<span>"),
                i,
                row = 0,
                col = 0,
                div;
            Div.span = span;
            // create divs
            for (i = 0; i < $scope.s.divNum; i++) {
                col = i % $scope.s.col;
                row = Math.floor(i / $scope.s.col);

                div = $("<div>");
                div.addClass("div closed div" + i);
                Div.attrIndex(div, i);  // div.attr("data-index", i);
                Div.attrRow(div, row); //div.attr("data-row", row);
                Div.attrCol(div, col); // div.attr("data-col", col);
                span.append(div);
            }

            // create bombs
            var bombIndexArr = [],
                bombIndexMap = {};

            while(bombIndexArr.length < $scope.s.bombNum) {
                var random = $scope.randomDivIndex();
                if (!bombIndexMap["flag" + random]) {
                    bombIndexArr.push(random);
                }
            }
            bombIndexArr.sort(function (a, b) {
                return a - b;
            });
            log("bombIndexArr:");
            log(bombIndexArr);

            for (i = 0; i < bombIndexArr.length; i++) {
                Div.changeToBomb(span.find(".div" + bombIndexArr[i]));
            }

            // find divs without bombs around
            span.find(".div").each(function () {
                if (!Div.isBomb($(this))) {
                    Div.flagDiv($(this), bombIndexArr, bombIndexMap);
                }
            });

            $("#container").html(span.html());
        };

        $scope.randomDivIndex = function () {
            return Math.floor(Math.random() * $scope.s.divNum);
        };
        
        $scope.listenFlagEvent = function () {
            $(window).on("aj.flag", function () {
                var bombFlagNum = Div.getNumUserFlagAsBomb(),
                    bombRealFound = Div.getNumUserFlagAsBombThatAreRight();
                $scope.$apply(function () {
                    $scope.s.bombFound = bombFlagNum;
                    $scope.s.bombFoundReal = bombRealFound;
                    if ($scope.s.bombNum === bombRealFound) {
                        $scope.s.gameover = true;
                    }
                })
            })
        };

        $scope.listenGameOverEvent = function () {
            $(window).on("aj.gameover", function () {
                $scope.$apply(function () {
                    $scope.s.gameover = true;
                })
            })
        };

        $scope.init = function () {
            if ($scope.s.step === 2) {
                $scope.submitLevelForm();
            }
            $scope.listenFlagEvent();
            $scope.listenGameOverEvent();
        };
        $scope.init();

        $scope.getPinjia = function () {
            if ($scope.s.bombFoundReal === $scope.s.bombNum) {
                return "Bingo!You find all " + $scope.s.bombNum + " bombs in " + $scope.s.seconds + " seconds!";
            } else {
                return "Time : " + $scope.s.seconds + "s, Result : Failed.";
            }
        };

    });

    $("#container").on("click", ".div", function () {
        if (!Div.isGameOver()) {
            Div.clickedDiv($(this));
        }
    });
    $("#container").on("contextmenu", ".div", function (e) {
        e.preventDefault();
        if (!Div.isGameOver()) {
            Div.rightClick($(this));
        }
    });


    function log(info) {
        console.log(info);
    }

    angular.bootstrap($("#main-div"), ["app"]);

});