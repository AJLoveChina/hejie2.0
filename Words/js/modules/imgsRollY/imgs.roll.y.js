define(function( require, exports, module ){

function Effect(prop){
	if( this instanceof Effect ){
		
		this.config = {};	//防止命名冲突
		this.config.interval = 3000;
		this.config.index = 0;
		this.config.haveBallsLoad = false;
		this.config.turnClassName = 'turn-l-r-'+(+new Date());	
		
		this.prop = prop;
		this.div = prop.div;
		this.w = $( this.div ).width();
		this.h = $( this.div ).height();
		this.imgs = $( this.div ).find( '.img' );
		this.num = this.imgs.length;
		this.next = this.moveTop;
		this.animateFinish = true;
		this.config.indexindex = 0;
		$( this.imgs ).css( {position:'absolute',top:'100%',left:'0'} );
		$( this.imgs[this.config.index] ).css( 'top', '0' );
		this.lastImg = this.imgs[0];
	}else{
		return new Effect( prop );
	}
}

Effect.prototype = {		//图片滚动模块的公有方法
	start : function(){
		var that = this;
		
		this.config.timer = setInterval(function(){
			that.next();
		},that.config.interval);
		
		this.addRightLeft();
		this.addBalls();
		this.addStyle();
		
		this.initial();		//自定义行为入口，方法自己定义
	},
	addRightLeft : function(){	//添加左右移动组件
		
		var width = this.w,
			height = this.h,
			wrap = document.createElement( 'div' ),
			left = document.createElement( 'div' ),
			right = document.createElement( 'div' );
		
		left.innerHTML = "<";
		left.setAttribute( 'style', 'left:10px;' );
		left.setAttribute( 'class', 'aj-turn-left ' + this.config.turnClassName );
		right.innerHTML = ">";
		right.setAttribute( 'style', 'right:10px;' );
		right.setAttribute( 'class', 'aj-turn-right ' + this.config.turnClassName );
		$( left ).appendTo( wrap );
		$( right ).appendTo( wrap );
		$( wrap ).appendTo( this.div );
		
	},
	addBalls : function(){		//添加小球切换组件
		var div=document.createElement('div');
		div.setAttribute('class','aj-ball-wrap');
		div.setAttribute('style','position:absolute;bottom:20px;right:20%;');
		for( var i=0; i < this.num; i++ ){
			div.innerHTML+="<div class='aj-ball' index='"+i+"' style='position:relative;width:20px;height:20px;border-radius:50%;background-color:lightgreen;box-shadow:black 0 0 4px;float:left;margin:5px;opacity:0.7;'></div>";
		}
		this.div.appendChild(div);
		this.config.haveBallsLoad = true;
		
		div = document.createElement('div');
		div.setAttribute('style','position:absolute;bottom:0;left:0;width:100%;height:10px;');
		div.setAttribute('class','aj-bg-from-transparent-to-white');
		this.div.appendChild(div);
	},
	addStyle : function(){
		var style = document.createElement( 'style' );
		style.innerHTML = "." + this.config.turnClassName + "{position:absolute;-webkit-user-select:none;cursor:pointer;top:50%;margin-top:-10px;width:30px;height:30px;z-index:2;" +
						"color:white;background-color:#333;line-height:30px;text-align:center;border-radius:50%;opacity:0.5;filter:alpha(opacity=50);transition:all 0.3s;font-weight:bold;}";
		style.innerHTML += "." + this.config.turnClassName + ":hover{opacity:0.8;filter:alpha(opacity=80);}";
		$( style ).appendTo( document.head );
	}
};

Effect.prototype.initial = function(){
	this.click( this.moveTop, this.moveDown );
};


Effect.prototype.moveTop = function( that ){
	var that = that || this;
	if( that.animateFinish ){
		that.config.index=(++that.config.index>=that.num)?0:that.config.index;
		that.show();
	}
};
Effect.prototype.moveDown = function( that ){
	var that = that || this;
	if( that.animateFinish ){
		var ii = parseInt(that.config.index) + 0;
		that.config.index = (--that.config.index<0)?(that.num-1):that.config.index;
		that.show('down',ii);				
	}
};
Effect.prototype.show = function(type,indexWhenDown){
	var that = this;
	if(!this.animateFinish) {
		console.log('You click too fast');
		return false;
	}
	this.animateFinish=false;
	switch(type){
		case 'down':
			$(this.imgs[this.config.index]).css({top:'-100%'});
			$(this.imgs[this.config.index]).animate({top:'0'});
			$(this.imgs[indexWhenDown]).animate({top:'100%'},function(){
				that.animateFinish=true;
			});
			this.lastImg=this.imgs[this.config.index];
			break;
		case 'top':
		default:
			if(this.lastImg){
				$(this.lastImg).animate({top:'-100%'});
			}
			$(this.imgs[this.config.index]).animate({top:'0'},function(){
				$(that.lastImg).css({top:'100%'});
				that.lastImg=that.imgs[that.config.index];
				that.animateFinish=true;
			});
			break;
	}
	if( this.config.haveBallsLoad ){
		this.balls=(this.balls===undefined)? $( that.div ).find('.aj-ball') : this.balls;
		for(var ii=this.balls.length-1;ii>=0;ii--){
			this.balls[ii].style.top='0px';
		}
		this.balls[this.config.index].style.top='-10px';
	}
};
Effect.prototype.click = function(){
	var that = this;
	$( this.div ).on( 'click', function(ev){
		var e=ev,
			target=e.target,
			index2,
			ii;
		if( $(target).hasClass('aj-turn-left') ){
			clearInterval(that.config.timer);
			that.moveDown();
			that.config.timer=setInterval(function(){
				that.moveTop();
			},3000);					
		}
		if( $(target).hasClass('aj-turn-right') ){
			clearInterval(that.config.timer);
			that.moveTop();
			that.config.timer=setInterval(function(){
				that.moveTop();
			},3000);
		}
		if( $(target).hasClass('aj-ball') ){
			if( that.config.index === target.getAttribute('index') || !that.animateFinish ){
				return false;
			}
			index2 = target.getAttribute('index');
			clearInterval(that.config.timer);
			if(index2<that.config.index){
				ii = parseInt(that.config.index) + 0;
				that.config.index = parseInt(index2);
				that.show('down',ii);
			}else{
				that.config.index = parseInt(index2);
				that.show();
			}
			that.config.timer=setInterval(function(){
				that.moveTop();
			},3000);
		}
	});
};

module.exports = Effect;


});