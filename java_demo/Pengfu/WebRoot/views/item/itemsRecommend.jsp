<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<style>


.aj-gds-roll-x{
    width:100%;height:100%;
    border:1px solid #e8e8e8;
}
.aj-gds-roll-x .aj-clear{
    clear:both;
}
.aj-gds-roll-x .aj-top{
    width:100%;height:30px;
    border-bottom:solid 1px #d1d1d1
}
.aj-gds-roll-x .aj-top .aj-nav{
    height:30px;float:left;
}
.aj-gds-roll-x .aj-top .aj-nav .aj-nav-one{
    position:relative;
    top:-1px;
    padding:0 15px;
    height:28px;
    line-height:28px;
    float:left;
    border-right:1px solid #d1d1d1;
    border-top:3px solid transparent;
    cursor:pointer;
}
.aj-gds-roll-x .aj-top .aj-nav .aj-select{
    border-top:3px solid #df2169!important;
    border-bottom:1px solid white;
}
.aj-gds-roll-x .aj-top .aj-roll-zhishi{
    height:30px;float:right;
}
.aj-gds-roll-x .aj-top .aj-roll-zhishi .aj-small-balls{
    height:30px;line-height:30px;
    margin-right:10px;
}
.aj-gds-roll-x .aj-top .aj-roll-zhishi .aj-small-balls a{
    margin-left:10px;
}
.aj-gds-roll-x .aj-top .aj-roll-zhishi .aj-small-balls .aj-ball{
    display:inline-block;
    float:left;
    width:6px;height:6px;
    border-radius:50%;
    overflow:hidden;
    background-color:#ccc;
    margin:13px 3px 0;
    cursor:pointer;
}
.aj-gds-roll-x .aj-top .aj-roll-zhishi .aj-small-balls .aj-select{
    background-color:red!important;
}
.aj-gds-roll-x .aj-mid{
    position:relative;
    width:100%;height:218px;
}
.aj-gds-roll-x .aj-mid .aj-roll-block{
    position:absolute;
    top:0;left:0;
    width:100%;height:218px;
    background-color:white;
    display:none;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-roll-x-hk{
    position:absolute;z-index:9;
    top:50%;
    width:32px;height:32px;
    border-radius:50%;
    background-color:black;
    color:white;
    margin-top:-16px;
    font-size:14px;
    text-align:center;line-height:32px;
    font-family:'SimSun';font-weight:bold;
    cursor:pointer;
    opacity:0.4;filter:alpha(opacity=40);
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-roll-x-hk:hover{
    opacity:0.6;filter:alpha(opacity=60);
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-roll-x-hk[aj-index=left]{
    left:10px;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-roll-x-hk[aj-index=right]{
    right:10px;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap{
    position:relative;
    width:700px;height:207px;
    margin:17px auto 0;
    overflow:hidden;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-all-imgs-move{
    position:absolute;
    top:0;left:0;
    width:1400px;height:207px;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one{
    width:175px;height:100%;
    display:inline-block;
    float:left;
    overflow:hidden;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one .summary{
	display: block;
	padding: 0 15px;
	color:#666;
	font-size: 12px;
	text-decoration: none!important;
	height: 100px;
	line-height: 20px;
	overflow: hidden;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one .item-img-wrap{
    width: 130px;
    height: 130px;
    display: block;
    font-size: 0;
    text-align: center;
    margin: 0 auto;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one .item-img-wrap:before{
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one .item-img-wrap img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one:hover{
    text-decoration:underline;
}

.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one p{
    padding:0 15px;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one .aj-price{
    height:22px;line-height:22px;
    color:#d42f2f;
    overflow:hidden;
}
.aj-gds-roll-x .aj-mid .aj-roll-block .aj-imgs-wrap .aj-img-one .aj-name{
    height:32px;
    line-height:16px;
    overflow:hidden;
}
</style>

<div class="aj-gds-roll-x-parent" style='max-width:100%;overflow:hidden;width:708px;height:250px;'>
    <div class='aj-gds-roll-x'>
        <div class='aj-top'>
            <div class='aj-nav'>
                <div class='aj-nav-one aj-select'>二货推荐</div>
                <div class='aj-nav-one' style="display: none;">相关阅读</div>
            </div>
            <div class='aj-roll-zhishi'>
                <div class='aj-small-balls'>
                    <a href='' style='display:none;'>全部&gt;</a>
                </div>
                <div class='aj-small-balls' style='display:none;'>
                    <a href=''>全部&gt;</a>
                </div>
            </div>
            <div class='aj-clear'></div>
        </div>
        <div class='aj-mid'>
            <div class='aj-roll-block' style='display:block;'>
                <div class='aj-roll-x-hk aj-tran' aj-index='left'>&lt;</div>
                <div class='aj-roll-x-hk aj-tran' aj-index='right'>&gt;</div>
                <div class='aj-imgs-wrap'>
                    <div class='aj-all-imgs-move aj-items-page-container' aj-index='1' aj-total-pages='2' aj-can-roll='1'>
                        
                    </div>
                </div>
            </div>
            <div class='aj-roll-block'>
                <div class='aj-roll-x-hk aj-tran' aj-index='left'>&lt;</div>
                <div class='aj-roll-x-hk aj-tran' aj-index='right'>&gt;</div>
                <div class='aj-imgs-wrap'>
                    <div class='aj-all-imgs-move' aj-index='1' aj-total-pages='2' aj-can-roll='1'>

                       
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script>
$(function () {
    var c = {
        ajax : function( prop ){
            return $( prop.obj ).find( '.'+prop.className );
        },
    }
    var yy = {};
    
    yy.start = function(){
        yy.goodsImgBlock();
    }
    
   	
    yy.goodsImgBlock = function(){
        var prop = {};
        prop.div = $('.aj-gds-roll-x')[0];
        Effect( prop );
    }
    yy.goodsImgTri = function(){
        var prop = {};
        prop.div = document.querySelector( '.aj-box-rank' );
        Effect2( prop );
    }
    
    
    function Effect( prop ){
        if( this instanceof Effect ){
            this.prop = prop;
            this.div = prop.div;
            this.pageLimit = 10;
            this.nav = c.ajax({obj:this.div,className:'aj-nav-one'});
            this.navBlocks = c.ajax({obj:this.div,className:'aj-roll-block'});
            this.navBallWraps = c.ajax({obj:this.div,className:'aj-small-balls'});
            this.navWhich = 0;
            this.inital();
            this.event();
        }else{
            return new Effect( prop );
        }
    }
    Effect.prototype = {
        event : function(){
            var that = this;
            $( this.div ).on( 'click', function(ev){
                var e = ev || window.event,
                        target = e.target || e.srcElement;
                if( $(target).hasClass( 'aj-nav-one' ) ){
                    that.navChange( target );
                }
                if( $(target).hasClass( 'aj-roll-x-hk' ) ){
                    that.rollImgs( target.getAttribute( 'aj-index' ), c.ajax({obj:target.parentNode,className:'aj-all-imgs-move'})[0] );
                }
                if( $(target).hasClass('aj-ball') && !$(target).hasClass('aj-select') ){
                    that.ballsRollImgs( target );
                }
            });
        },
        navChange : function( obj ){
            var index = this.whichNavClick( obj );
            this.navStyle( index );
            this.changeBlock( index );
        },
        navStyle : function( index ){
            $( this.nav ).removeClass( 'aj-select' );
            $( this.nav[index] ).addClass( 'aj-select' );

            $( this.navBallWraps ).hide();
            $( this.navBallWraps[index] ).show();

            this.navWhich = index;
        },
        changeBlock : function( index ){
            $( this.navBlocks ).hide();
            $( this.navBlocks[index] ).show();
        },
        whichNavClick : function( obj ){
            var index = 0;
            for( var i=this.nav.length-1; i>=0; i-- ){
                if( this.nav[i] === obj ){
                    index = i;
                    break;
                }
            }
            return index;
        },
        rollImgs : function( direction, imgsWrap ){
            var thisIndex = parseInt( imgsWrap.getAttribute('aj-index') ),
                    canRoll = parseInt( imgsWrap.getAttribute('aj-can-roll') ),
                    move_x;
            if( canRoll === 1 ){
                switch( direction ){
                    case 'left':
                        move_x = -1;
                        break;
                    case 'right':
                        move_x = 1;
                        break;
                    default:
                        move_x = 0;
                        break;
                }
                thisIndex += move_x;

                var insideAllPages = parseInt(imgsWrap.getAttribute('aj-all-pages'));
                if( thisIndex > insideAllPages ){
                    thisIndex = insideAllPages;
                    this.noMoreImgs( imgsWrap, 'right' );
                }else if ( thisIndex < 1 ){
                    thisIndex = 1;
                    this.noMoreImgs( imgsWrap, 'left' );
                }else{
                    imgsWrap.setAttribute('aj-can-roll','0');
                    imgsWrap.setAttribute( 'aj-index', thisIndex );
                    $( imgsWrap ).animate( {left:-(thisIndex-1)*700+'px'}, '2000' ,function(){
                        imgsWrap.setAttribute('aj-can-roll','1');
                    });
                }
                this.rollBalls( thisIndex-1 );
            }
        },
        rollBalls : function( index ){
            var balls = c.ajax({obj:this.navBallWraps[this.navWhich],className:'aj-ball'});
            $( balls ).removeClass( 'aj-select' );
            $( balls[index] ).addClass( 'aj-select' );
        },
        /* 	loadImgs : function( obj ){  	//模拟ajax获取
         var val = document.getElementById('val').value,
         totalPages = parseInt( obj.getAttribute('aj-total-pages') ),
         whichNav = this.navWhich; //是热门推荐=>0还是最多收藏=>1
         obj.setAttribute( 'aj-total-pages', (totalPages+1) );
         $( obj ).css({'width':700*(totalPages+1)+'px'});
         obj.innerHTML += val;
         }, */
        noMoreImgs : function( obj, type ){
            obj.setAttribute('aj-can-roll','0');
            if( type === 'left' ){
                $( obj ).animate({left:'40px'}).animate({left:'0px'},'slow',function(){
                    auto();
                });
            }else{
                var left = parseInt( $(obj).css('left') );
                $( obj ).animate({left:left-40+'px'}).animate({left:left+'px'},'slow',function(){
                    auto();
                });
            }
            function auto(){
                obj.setAttribute('aj-can-roll','1');
            }
        },
        //Below From 2015-07-02
        inital : function(){
            var moves = c.ajax({obj:this.div,className:'aj-all-imgs-move'}),
                    that = this,
                    index = 0;
            $( moves ).each(function(){
                that.changeWidth( this );
                that.changeBallsNum( index );
                that.setPagesNum( this );
                index ++;
            });
        },
        changeWidth : function( obj ){
            var ones = c.ajax({obj:obj,className:'aj-img-one'}),
                    oneWidth = 175,
                    totalWidth;
            //console.log( ones.length );
            totalWidth = ones.length*oneWidth;
            //console.log(totalWidth);
            obj.style.width = totalWidth +'px';
        },
        changeBallsNum : function( index ){
            var ones = c.ajax({obj:this.navBlocks[index],className:'aj-img-one'}),
                    pages = Math.ceil(ones.length / 4),
                    html = this.navBallWraps[index].innerHTML;
            while( pages -- ){
                if( pages === 0 ){
                    html = "<span class='aj-ball aj-select'></span>" + html;
                }else{
                    html =  "<span class='aj-ball'></span>" + html;
                }
            }
            $( this.navBallWraps[index] ).html( html );
        },
        setPagesNum : function( obj ){
            var ones = c.ajax({obj:obj,className:'aj-img-one'});
            obj.setAttribute( 'aj-all-pages', Math.ceil(ones.length/4) );
        },
        ballsRollImgs : function( obj ){
            var parent = obj.parentNode,
                    index = this.whichBallsWrap( parent ),
                    index2 = this.whichBall( obj );
            console.log( index +'--'+ index2 );

            var imgsWrap = c.ajax({obj:this.div,className:'aj-all-imgs-move'});
            imgsWrap[index].setAttribute( 'aj-index', index2+1 );
            this.rollImgs( 'show', imgsWrap[index] );
        },
        whichBallsWrap : function( obj ){
            var index;
            for( var i=0; i<this.navBallWraps.length; i++ ){
                if( this.navBallWraps[i] === obj ){
                    index = i;
                    break;
                }
            }
            return index;
        },
        whichBall : function( obj ){
            var balls = c.ajax({obj:obj.parentNode,className:'aj-ball'}),
                    index;
            for( var i=0; i<balls.length; i++ ){
                if( balls[i] === obj ){
                    index = i;
                    break;
                }
            }
            return index;
        },

    };

    function Effect2( prop ){
        if( this instanceof Effect2 ){
            this.prop = prop;
            this.div = prop.div;
            this.nav = c.ajax({obj:this.div,className:'aj-nav-one'});
            this.blocks = c.ajax({obj:this.div,className:'aj-imgs-wrap'});
            this.initial();
            this.event();
        }else{
            return new Effect2( prop );
        }
    }
    Effect2.prototype={
        initial : function(){
            this.bianhao();
            this.setMinHeight();
        },
        event : function(){
            var that = this;
            $( this.div ).on( 'mouseover', function(ev){
                var e = ev || window.event,
                        target = e.target || e.srcElement;

                if( $(target).hasClass('aj-nav-one') ){
                    that.navStyle( target );
                }
            });
        },
        navStyle : function( obj ){
            var index = this.whichNav( obj );
            if( $(this.nav[index]).hasClass('aj-select') ){
                return true;
            }
            this.showNav( index );
            this.showBlock( index );
        },
        showNav : function( index ){
            $( this.nav ).removeClass( 'aj-select' );
            $( this.nav[index] ).addClass( 'aj-select' );
        },
        showBlock : function( index ){
            $( this.blocks ).hide();
            $( this.blocks[index] ).show();
        },
        whichNav : function( obj ){
            var index;
            for( var i = 0; i<this.nav.length; i++ ){
                if( this.nav[i] === obj ){
                    index = i;
                    break;
                }
            }
            return index;
        },
        bianhao : function(){
            var that =this;
            $( this.blocks ).each(function(){
                that.sortBlockInside( this );
            });
        },
        sortBlockInside : function( obj ){
            var ones = c.ajax({obj:obj,className:'aj-one'}),
                    index = 1,
                    zhishi;
            $( ones ).each(function(){
                zhishi = c.ajax({obj:this,className:'aj-index'})[0];
                zhishi.innerHTML = index;
                index++;
            });
        },
        setMinHeight : function(){
            var blocks = this.blocks,
                    arr = [],
                    num;
            $( blocks ).each(function(){
                arr.push( c.ajax({obj:this,className:'aj-one'}).length );
            });
            num = arr.sort(function( a, b ){
                return a-b;
            }).pop();
            $( blocks[0].parentNode.parentNode ).css({minHeight:num*100+'px'});
        },
    };

	yy.loadPage = function () {
		var container = $(".aj-gds-roll-x .aj-items-page-container");
		var min = 1, max = 614;
		var random = Math.floor((max - min) * Math.random() + min);
		var tag;
		
		var span = $(document.createElement("span"));
				
		$.ajax({
			url : "http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static/pages/" + random + ".json",
			type : "GET",
			dataType : "json",
			success : function (ar) {
				var src;
				for (var i = 0; i < ar.data.length; i++) {
					tag = $(document.createElement("a"));
					tag.addClass("aj-img-one");
					src = ar.data[i]['previewImage'];
					
					if (src) {
						if (/\/?images/i.test(src)) {
							src = "http://nigeerhuo-public.img-cn-shanghai.aliyuncs.com/" + src;
						} else {
							src = "http://nigeerhuo-public.img-cn-shanghai.aliyuncs.com/images/" + src;
						}
						///src += "@!w190"
						src += "@!w190";
						
						tag.html("<span class='item-img-wrap'><img class='aj-img' src='" + src + "' /></span>" +
									"<p class='aj-price'>" + ar.data[i]['username'] + "</p>" +
									"<p class='aj-name'>" + ar.data[i]['title']+ "</p>");
						tag.attr("href", "/OneItem?id=" + ar.data[i]["id"]);						
					} else {
					
						tag.html("<p class='aj-price'>" + ar.data[i]['username'] + "</p>" +
									"<p class='aj-name'>" + ar.data[i]['title']+ "</p>" + 
									"<span class='summary'>" + ar.data[i]['summary'] + "</span>");
						tag.attr("href", "/OneItem?id=" + ar.data[i]["id"]);
						
					}

								
					span.append(tag);
				}
				container.html(span.html());
				
				yy.start();
			},
			error : function () {
				
			}
		});					
	
	}
	
	yy.loadPage();
	
});
</script>
