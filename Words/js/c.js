(function(){
/*
* 	2014.AJ.All.Rights.Reserved
*/	
var c = {
	aj:function(obj){
		return document.getElementById(obj);
	},
	ajax:function(prop){  //prop->obj,tag,className
		if(document.getElementsByClassName){
			return prop.obj.getElementsByClassName(prop.className);
		}else{
			var xx=(prop.obj===undefined)?document:prop.obj,
				xx2=(prop.tag===undefined)?'*':prop.tag,
				ele=xx.getElementsByTagName(xx2),
				length=ele.length,
				reg=new RegExp(prop.className,'');
			var arr;
			for(var i=0;i<length;i++){
				if(reg.test(ele[i].className)){
					arr.push(ele[i]);
				}
			}
			return arr;		
		}
	},
	getByAttr:function(property){//property obj,tag,zhishi
		var obj=(typeof(property.obj)=='undefined')?document:property.obj;//document can not wrap with ""
		var tag=(typeof(property.tag)=='undefined')?'*':property.tag;
		var tags=obj.getElementsByTagName(tag);
		//c.show(tags.length);
		var arr=new Array();
		for(var i=0;i<tags.length;i++){
			if(tags[i].getAttribute('zhishi')==property.zhishi){
				arr.push(tags[i]);
			}
		}
		return arr;
	},
    addEvent: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },   
    getEvent: function(event){
        return event ? event : window.event;
    },
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    getWheelDelta: function(event){
        if (event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }, 
    stopPropagation: function(event){
        var event=c.getEvent(event);
		if (event.stopPropagation){
            event.stopPropagation();
        } else { 
            event.cancelBubble = true;
        }
    },
	//JsPhp not support crossDomain!
	JsPhp: function(property){  //need property--> url,str(null),func(deal with the xmlhttp.responseText)
		var xmlhttp;
		if(window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}else{
			xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
		}
		if(property.str===undefined){  //method is GET
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					property.func(xmlhttp.responseText);
				}
			}
			xmlhttp.open('GET',property.url,true);
			xmlhttp.send(null);
		}else{ //method is POST
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					property.func(xmlhttp.responseText);
				}
			}
			xmlhttp.open('POST',property.url,true);
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
			xmlhttp.send(property.str);
		}
	},
	addAttribute:function(property){  //property->obj,attr,val
		var ex=new RegExp(property.val,'');
		var xx=property.obj.getAttribute(property.attr);
		if(!ex.test(xx)){
			xx+=' '+property.val;
		}
		property.obj.setAttribute(property.attr,xx);
	},
	delAttribute:function(property){
		var xx=property.obj.getAttribute(property.attr);
		property.obj.setAttribute(property.attr,c.trim(xx.replace(property.val,'')));
	},

	requestNextAnimationFrame:function(){
		var oWRAF,wrapper,callback,geckoVersion=0,
			userAgent = navigator.userAgent,
			index = 0,
			that = this;
		if (window.webkitRequestAnimationFrame) {
			wrapper = function (time) {
				if (time === undefined) {
				  time = +new Date();
				}
				that.callback(time);
			};
			oWRAF = window.webkitRequestAnimationFrame;
			window.webkitRequestAnimationFrame = function (callback, element) {
				that.callback = callback;
				oWRAF(wrapper, element);
			}
		}
		if (window.mozRequestAnimationFrame) {
			index = userAgent.indexOf('rv:');
			if (userAgent.indexOf('Gecko') != -1) {
				geckoVersion = userAgent.substr(index + 3, 3);
				if (geckoVersion === '2.0') {
				   window.mozRequestAnimationFrame = undefined;
				}
			}
		}
		return window.requestAnimationFrame   ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback,element){
			var start,
				finish;
			window.setTimeout(function(){
				start = +new Date();
				callback(start);
				finish = +new Date();
				that.timeout = 1000 / 60 - (finish - start);
			}, that.timeout);
		};
	},
	cancelRequestNextAniamationFrame : function (id) {
		if (window.requestAnimationFrame) {
			window.cancelAnimationFrame(id);
		} else if (window.webkitRequestAnimationFrame) {
			window.webkitCancelAnimationFrame(id);
		} else if (window.mozRequestAnimationFrame) {
			window.mozCancelAnimationFrame(id);
		} else if (window.oRequestAnimationFrame) {
			window.oCancelRequestAnimationFrame(id);
		} else if (window.msRequestAnimationFrame) {
			window.msCancelRequestAnimationFrame(id);
		} else {
			clearTimeout(id);
		}
	},
	querySelectorAll:function(val){
		return document.querySelectorAll(val);
	},
	querySelector:function(val){return document.querySelector(val);}

	//END---FUNCTION	
	//---------------END C
	};
c.tools={
	getItem:function(key){//与setLocalData match for use!
		if(window.localStorage){
	/* 		if(typeof localStorage.getItem(key)=='string'){
				return localStorage.getItem(key);
			}else{
				return false;
			} */
			return localStorage.getItem(key);
		}else if(window.navigator.cookieEnabled){
			return c.tools.readCookie(key);
		}
	},
	setItem:function(key,val){
		if(window.localStorage){
			localStorage.setItem(key,val);
			return true;
		}else if(window.navigator.cookieEnabled){
			document.cookie=key+"="+val;
			return true;
		}else{
			console.log('I wish you can open cookie!');
			return false;
		}
	},	
	removeItem:function(key){
		if(window.localStorage){
			localStorage.removeItem(key);
		}
		if(window.navigator.cookieEnabled){
			document.cookie=key+'='+c.tools.readCookie(key)+';expires='+(new Date(+new Date()-3600*1000)).toGMTString();
		}
	},
	readCookie: function(val){   //return value or undefined
		var xx=document.cookie.split(';');
		for(var i=0;i<xx.length;i++){
			var xx2=xx[i].split('=');
			if(c.str.trim(xx2[0])==val){
				return xx2[1];
			}
		}
		return undefined;
	},
	getValFromDom:function(dom){
		switch(dom.tagName){
			case 'INPUT':
				return dom.value;
				break;
			case 'div':
				return dom.innerHTML;
				break;
		}
	},
	ajax:function(prop){  //prop->obj,tag,className
		if(document.getElementsByClassName){
			return prop.obj.getElementsByClassName(prop.className);
		}else{
			var xx=(prop.obj===undefined)?document:prop.obj,
				xx2=(prop.tag===undefined)?'*':prop.tag,
				ele=xx.getElementsByTagName(xx2),
				length=ele.length,
				reg=new RegExp(prop.className,'');
			var arr;
			for(var i=0;i<length;i++){
				if(reg.test(ele[i].className)){
					arr.push(ele[i]);
				}
			}
			return arr;		
		}
	},
	getComputedStyle : function (obj){
		if( obj.currentStyle ){
			return obj.currentStyle;
		}else{
			return window.getComputedStyle(obj,false);
		}
	},
	showBox:function(obj){//show top,right,bottom,left from getBoundingClientRect
		var box=obj.getBoundingClientRect();
		c.show('Top:\t'+box.top+'px\n'+
				'right:\t'+box.right+'px\n'+
				'bottom:\t'+box.bottom+'px\n'+
				'left:\t'+box.left+'px');
	},
	keyCode:function(){
		c.addEvent(window,'keydown',showKeyCode);
		function showKeyCode(e){
			var e=c.getEvent(e);
			c.show(e.keyCode);
		}
	},
	count:function(val){
		//array and {} are both object!!
		if( val === undefined || val === null ){
			console.warn('Val is undefined or null,can not count length!');
			return 0;
		}
		var i = 0,
			type = (typeof val).toLowerCase();
		if( type === 'object' ){
			for(var key in val) i++;
		}else{
			switch (type){
				case 'string':
					i = val.length;
					break;
				case 'number':
					i = val.toString().length;
					break;
			}
		}
		return i;
	},
	alert : function (val) {
		alert(val);
	}
}
c.is={
	set:function(val){
		return (typeof(val)===undefined)?false:true;
	},
	empty:function(val){ //空字符串return true
		if( val === null || val === undefined ) return true;
		return /\S/.test(val)?false:true;
	},
	local:function(){
		var isLocal=false;
		['local','127.0','192.1'].forEach(function(val){
			if(document.domain.substr(0,5)===val){
				isLocal=true;
			}
		});
		return isLocal;
	}
	//END
}
c.console={
	d3:function(val,size){
		console.log('%c'+val, 'font-size:'+size+'px;font-family:Microsoft YaHei;color:#fff;text-shadow:0 1px 0#ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
	}
}
c.str={
	encrypt:function(str){
		var code=c.str.Mod128(c.str.useCos(str));
		var result=c.str.DES(code.substr(0,64)).concat(c.str.DES(code.substr(64,64)));
		var arr=[];
		for(var i=0;i<=result.length;i+=4){
			arr.push(c.num.to(result.substring(i,i+4),16,2));
		}
		return arr.join('');
	},
	charCode:function(str){
		var str=str+'',
			arr=[],
			result;
		for(var i=0;i<str.length;i++){
			arr.push(str.charCodeAt(i));
		}
		result=arr.join('');
		return result;
	},
	isAscii:function(str){
		for(var i=str.length-1;i>=0;i--){
			if(str.charCodeAt(i)>127){
				return false;
			}
		}
		return true;
	},
	haveSpace:function(str){
		for(var i=str.length-1;i>=0;i--){
			if(str.charCodeAt(i)==32){
				return true;
			}
		}
		return false;
	},
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g,"");
	},
	isEmpty:function(str){
		return /\S/.test(str)?false:true;
	},
	exchange:function(str){//i and length-1-i 
		var str=str+'',
			length=str.length,
			arr=[];
		if(length%2==0){//整除
			for(var i=0;i<length/2;i++){
				arr.push(str.charAt(i)+str.charAt(length-1-i));
			}
		}else{
			for(var i=0;i<(length-1)/2;i++){
				arr.push(str.charAt(i)+str.charAt(length-1-i));
			}
			arr.push(str.charAt((length-1)/2));
		}
		return arr.join('');
	},
	make01:function(num){
		var arr=[],
			num=num||64;
		for(var i=0;i<num;i++){
			arr.push(c.num.rand(0,1));
		}
		return arr.join('');
	},
	DES:function(str){//DES加密算法 str=>64 bit!
		var arr=strToArray(str),
			left=[],right=[];
		var K=[1,1,0,1,1,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,1,1,0,1,0,1,0,0,0,0,1,1,0,0,1,0,0,1,1,1,0,0,1,1];
		var SBox="11,1,5,7,7,5,11,10,3,15,1,14,0,8,11,9,13,0,7,2,7,4,6,2,6,2,7,8,8,14,9,1,6,5,0,2,2,4,9,14,10,1,0,11,12,14,7,7,3,6,6,3,3,14,4,8,5,11,14,9,9,8,11,10,7,12,14,6,7,14,12,4,13,2,8,0,8,5,7,15,6,12,1,9,4,3,14,1,6,10,1,14,6,4,9,0,3,9,3,2,5,14,10,15,11,4,5,2,6,6,2,6,10,6,11,12,3,1,6,14,4,12,3,11,4,8,1,6,2,14,3,10,11,3,13,2,6,11,3,10,7,14,7,11,14,2,11,10,3,14,3,8,6,14,1,6,12,0,2,7,7,11,2,1,5,12,12,6,2,13,7,4,7,1,4,7,2,12,9,9,3,2,10,2,4,3,10,6,12,8,6,8,7,1,10,8,5,1,9,4,9,11,14,14,2,1,13,14,6,9,5,12,12,2,3,9,4,8,6,11,14,6,0,4,5,0,6,12,3,15,14,0,1,0,15,13,9,4,9,10,9,10,0,5,7,8,13,9,14,1,14,1,7,11,5,12,8,10,7,2,1,12,7,5,1,10,5,9,6,3,13,15,2,10,10,13,14,11,12,10,7,6,15,13,7,8,14,7,14,13,11,10,1,5,13,1,12,13,15,11,9,11,2,7,9,3,14,5,1,13,7,2,12,2,5,9,13,7,7,12,10,13,2,10,5,0,0,15,3,1,7,8,6,0,0,14,9,5,9,9,11,10,15,15,12,13,11,0,7,12,11,6,12,10,9,1,12,10,10,1,5,11,8,3,15,3,8,0,2,10,10,2,13,7,1,10,13,9,8,4,8,6,12,15,4,7,10,3,7,4,7,13,7,10,4,4,4,13,10,1,3,15,7,12,10,11,10,7,9,10,13,7,9,7,13,10,8,12,12,1,4,9,14,10,0,4,10,5,2,0,8,7,12,14,1,0,5,2,8,10,1,13,9,13,15,4,9,4,14,7,15,4,15,10,5,2,0,7,7,2,14,13,8,9,1,14,2,4,4,5,10,7,3,10,13,12,13,11,7,1,9,0,11,14,5,1,9,1,12,12,12,10,9,2,4,14,2,12,10,14,10,8,4,14,13,10,3,5,9,11,10,10".split(',');
		var PBox=[22, 5, 9, 23, 6, 31, 25, 19, 27, 26, 10, 2, 12, 15, 3, 30, 20, 28, 17, 13, 0, 8, 24, 4, 11, 14, 7, 18, 0, 16, 29, 1];
		//-------------------
		for(var i=0;i<16;i++){
			left=arr.splice(32,32);
			right=arr;
			arr=left.concat(PChange(compressedEncoding(xor(Expand(right),K),SBox),PBox));
		}
		return arr.join('');
		function Expand(arr){
			var xx=[],
				arr=arr.concat([]);//数组按引用传递
			for(var i=1;i<8;i++){
				xx=arr.splice(i*4-1+(i-1)*2,2);
				arr.splice(i*4-1+(i-1)*2,0,xx[0],xx[1],xx[0],xx[1]);
			}
			arr.unshift(arr[arr.length-1]);
			arr.push(arr[1]);
			return arr.concat([]);
		}
		function xor(arr,key){
			var arr2=[];
			for(var i=arr.length-1;i>=0;i--){
				arr2.unshift(Number(arr[i])^Number(key[i]));
			}
			return arr2;
		}
		function compressedEncoding(arr,S){
			var row,col,group;
			var A=arr.concat([]),B=[],index;//group 组号0-7
			var result=[];
			for(var i=0;i<8;i++){
				B=A.splice(0,6);
				row=B[0]*2+B[5];
				col=B[1]*8+B[2]*4+B[3]*2+B[4];
				group=i;
				index=row*16+col+group*64;
				result=result.concat(strToArray(XXXX(c.num.to(S[index]))));
			}
			return result;
		}
		function PChange(arr,P){
			var result=[];
			for(var i=0;i<P.length;i++){
				result.push(arr[P[i]]);
			}
			return result;
		}
		function strToArray(str){
			var arr=[]
				str=str+'';
			for(var i=0;i<str.length;i++){
				arr.push(Number(str.charAt(i)));
			}
			return arr.concat([]);
		}
		function XXXX(str){
			if(str.length==4){
				return str;
			}else if(str.length==3){
				return '0'+str;
			}else if(str.length==2){
				return '00'+str;
			}else if(str.length==1){
				return '000'+str;
			}
		}
	},
	Mod128:function(str){//All str change to 128 01! Such as"10110000111101010010110010110000111101010010110010110000111101010010110010110000111101010010110010110000111101010010110010110000"
		var str=str+'',
			code=c.num.to(c.str.charCode(str));
		var index=0;
		while(code.length>128){
			code=code.substr(index*6-index*2,6);
			index++;
			if(4*index+6>code.length){
				index=0;
			}
		}
		while(code.length<128){
			code=code.concat(code);
		}
		code=code.substr(0,128);
		return code;
	},
	useCos:function(str){//随机化
		var str=str+'',
			total=0;
		for(var i=0;i<str.length;i++){
			total+=Number(str.charCodeAt(i));
		}
		c.str.Mod128(str);
		return Math.cos(total);
	},
	SixToFour:function(str){//str.length==6 Such As 010110=>1101
		var arr=[4, 11, 3, 4, 8, 4, 7, 13, 15, 5, 12, 13, 0, 3, 10, 5, 8, 7, 10, 9, 14, 11, 5, 4, 1, 0, 2, 2, 4, 9, 12, 8, 9, 4, 4, 3, 12, 10, 11, 6, 13, 4, 4, 13, 6, 2, 8, 11, 4, 0, 5, 5, 8, 1, 15, 13, 13, 8, 15, 15, 6, 14, 3, 4];
		var str=str+'',
			row=Number(str.charAt(0))*2+Number(str.charAt(5)),
			col=Number(str.charAt(1)*8)+Number(str.charAt(2)*4)+Number(str.charAt(3)*2)+Number(str.charAt(4));
		var index=row*16+col;
		var result=c.num.to(arr[index])+'';//转换为2进制
		if(result.length<2){
			result='000'+result;
		}else if(result.length<3){
			result='00'+result;
		}else if(result.length<4){
			result='0'+result;
		}
		return result;
	},
	md5:function(s){
		var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
		var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
		var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */
		return hex_md5(s);
		function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
		function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
		function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
		function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
		function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
		function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }
		function core_md5(x, len)
		{
		  x[len >> 5] |= 0x80 << ((len) % 32);
		  x[(((len + 64) >>> 9) << 4) + 14] = len;

		  var a =  1732584193;
		  var b = -271733879;
		  var c = -1732584194;
		  var d =  271733878;

		  for(var i = 0; i < x.length; i += 16)
		  {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;

			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		  }
		  return Array(a, b, c, d);
		}
		function md5_cmn(q, a, b, x, s, t)
		{
		  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
		}
		function md5_ff(a, b, c, d, x, s, t)
		{
		  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}
		function md5_gg(a, b, c, d, x, s, t)
		{
		  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}
		function md5_hh(a, b, c, d, x, s, t)
		{
		  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}
		function md5_ii(a, b, c, d, x, s, t)
		{
		  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		/*
		 * Calculate the HMAC-MD5, of a key and some data
		 */
		function core_hmac_md5(key, data)
		{
		  var bkey = str2binl(key);
		  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

		  var ipad = Array(16), opad = Array(16);
		  for(var i = 0; i < 16; i++)
		  {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		  }

		  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		  return core_md5(opad.concat(hash), 512 + 128);
		}

		/*
		 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
		 * to work around bugs in some JS interpreters.
		 */
		function safe_add(x, y)
		{
		  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		  return (msw << 16) | (lsw & 0xFFFF);
		}

		/*
		 * Bitwise rotate a 32-bit number to the left.
		 */
		function bit_rol(num, cnt)
		{
		  return (num << cnt) | (num >>> (32 - cnt));
		}

		/*
		 * Convert a string to an array of little-endian words
		 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
		 */
		function str2binl(str)
		{
		  var bin = Array();
		  var mask = (1 << chrsz) - 1;
		  for(var i = 0; i < str.length * chrsz; i += chrsz)
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		  return bin;
		}

		/*
		 * Convert an array of little-endian words to a string
		 */
		function binl2str(bin)
		{
		  var str = "";
		  var mask = (1 << chrsz) - 1;
		  for(var i = 0; i < bin.length * 32; i += chrsz)
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		  return str;
		}

		/*
		 * Convert an array of little-endian words to a hex string.
		 */
		function binl2hex(binarray)
		{
		  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		  var str = "";
		  for(var i = 0; i < binarray.length * 4; i++)
		  {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
				   hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		  }
		  return str;
		}

		/*
		 * Convert an array of little-endian words to a base-64 string
		 */
		function binl2b64(binarray)
		{
		  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		  var str = "";
		  for(var i = 0; i < binarray.length * 4; i += 3)
		  {
			var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
						| (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
						|  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
			for(var j = 0; j < 4; j++)
			{
			  if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			  else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
			}
		  }
		  return str;
		}
	}
	//END
}
c.num={
	to:function(num,hex,hex2){//hex转换后的进制，hex2转换前的进制
		var arr=[],
			remain,
			isNegative=false,
			result=Number(num),
			str=num+'',
			hex=hex||2,
			hex2=hex2||10;
		if(result<0){
			result=0-result;
			str=str.replace(/^-*/g,'');
			isNegative=true;
		}
		if(hex2!=10){//change num to 10 hex!
			result=0;
			for(var i=0;i<str.length;i++){
				result+=str.charAt(str.length-1-i)*(Math.pow(hex2,i));
			}
		}
		if(hex<=1||hex>=37){
			c.show('您输入的进制有误..');
			return false;
		}
		while(result>=hex){
			remain=result%hex;
			if(remain>=10){//65-A  97-a Ascii CODE
				remain=String.fromCharCode((remain-10)+65);
			}
			arr.push(remain);
			result=Math.floor(result/hex);
		}
		if(result>=10){
			result=String.fromCharCode((result-10)+65);
		}
		arr.push(result);
		return (isNegative)?('-'+arr.reverse().join('')):(arr.reverse().join(''));
	},
	not:function(num){
		var str=String(num),
			arr=[];
		for(var i=0;i<str.length;i++){
			arr.push(Number(!Number(str.charAt(i))));
		}
		return Number(arr.join(''));
	},
	rand:function(a,b){
		return Math.round(a+Math.random()*(b-a));
	},
	SBox:function(){
		var arr=[];
		for(var i=0;i<16*4*8;i++){
			arr.push(c.num.rand(0,15));
		}
		return arr;
	},
	PBox:function(){
		//混淆32位数据的顺序
		var arr=[],result=[];
		for(var i=0;i<32;i++){
			arr.push(i);
		}
		for(var i=0;i<32;i++){
			result.push(Number(arr.splice(c.rand(0,arr.length),1)));
		}
		return result;
	}
	//END
}
c.dom={
	infoLineWrap:function(prop){//forEach lines onclick slideToggle.
		var isHideOthers=c.is.set(prop.isHideOthers)?prop.isHideOthers:true;
		var select;
		for(var i=0;i<prop.lines.length;i++){
			(function(obj){
				obj.index=i;
				c.addEvent(obj,'click',(function(){
					if(select!=obj.index){
						if(isHideOthers){
							(function(){
								for(var i=prop.wraps.length-1;i>=0;i--){
									$(prop.wraps[i]).slideUp();
								}
							})()
						}
						$(prop.wraps[obj.index]).slideToggle();
						select=obj.index;
					}else{
						$(prop.wraps[obj.index]).slideToggle();
					}
				}));
			})(prop.lines[i])
		}	
	},
	fixedPositionTop:function(obj){
		var box,old={},now={};
		box=obj.getBoundingClientRect();
		old.position=(obj.style.position)?obj.style.position:'relative';
		old.top=box.top;
		c.addEvent(window,'scroll',(function(){
			box=obj.getBoundingClientRect();
			now.top=box.top;
			if(window.scrollY>old.top){
				obj.style.position='fixed';
				obj.style.top='0px';				
			}else{
				obj.style.position='';
				obj.style.top='';
			}
		}));
	},
	wait:function(obj){//append wait div to obj!
		var xx=c.ajax({'obj':obj,'className':'waiting_div'})[0];
		if(xx!=undefined){
			$(xx).show();
			return false;
		}
		if( c.tools.getComputedStyle(obj)['position'].toLowerCase() === 'static' ){
			obj.style.position = 'relative';
		}
		var box=obj.getBoundingClientRect(),
			W=box.right-box.left,
			H=box.bottom-box.top,
			height=(H/4>70)?70:(H/4);
		height=(height<30)?30:height;
		var div=document.createElement('div');
		div.setAttribute('onclick','(function(e){var e=c.getEvent(e);c.stopPropagation(e);})()');
		div.setAttribute('class','waiting_div');
		div.setAttribute('style','position:absolute;background-color:rgba(255,255,255,0.5);top:0;left:0;width:100%;height:100%;');
		div.innerHTML="<img src='./img/c/wait.gif' style='position:absolute;top:50%;left:50%;"+
					"margin-top:"+(-height/2)+"px;margin-left:"+(-height/2)+"px;width:"+height+"px;height:"+height+"px;'>";
		obj.appendChild(div);
		return true;
	},
	nowait:function(obj){
		setTimeout(function(){
			var div=c.ajax({'obj':obj,'className':'waiting_div'});
			
			for( var i=0; i<div.length; i++ ){
				if( div[i] !== undefined && div[i].parentNode === obj){
					obj.removeChild(div[i]);
				}
			}
		},1000);
	}
	//END
}
c.android={
	ajax:function(prop){
		if( prop.url == undefined ){
			throw( "You must give a url to for ajax!(prop.url)" );
		}
		$.ajax({
			type : 'GET',
			async:true,
			url : prop.url,
			dataType : "jsonp",
			data : prop.data,
			jsonp : "jsoncallback",
			success : function(json){
				prop.func(json);
			},
			error:function(val){
				prop.error(val);
			}
		});		
	},
	alert:function(val){
		alert(val);
	}
};

//Canvas Api
window.c = c;

// Pulugin for underscore
    _.mixin({
        dateShow : function (time) {
            var date = new Date(time),
                fHour = date.getUTCHours(),
                fMinute = date.getMinutes(),
                fDay = date.getDate(),
                fMonth = date.getMonth(),
                timeDiff = + new Date() - date.getTime(),
                minutes = timeDiff / (1000 * 60),
                hours = minutes / 60,
                days = hours / 24,
                months = days / 30,
                years = months / 12,
                back = '';
            minutes = minutes.toFixed(1);
            hours = hours.toFixed(1);
            days = Math.floor(days);
            months = Math.floor(months);
            years = years.toFixed(1);
            if (minutes < 1) {
                back = "刚刚";
            } else if (minutes < 60){
                back = minutes + "分钟前";
            } else if (hours < 24) {
                back = hours + "小时前";
            } else if (days < 30) {
                if (fHour <= 12) {
                    back += "上午" + fHour + ':' + fMinute;
                } else if (fHour <= 18){
                    back += "下午" + (fHour - 12) + ':' + fMinute;
                } else {
                    back += "晚上" + (fHour - 12) + ':' + fMinute;
                }
                back += "&nbsp;(" + days + "天前)";

            } else if (months < 12) {
                if (fHour <= 12) {
                    back += "上午" + fHour + ':' + fMinute;
                } else if (fHour <= 18){
                    back += "下午" + fHour + ':' + fMinute;
                } else {
                    back += "晚上" + fHour + ':' + fMinute;
                }
                back += "(&nbsp;" + fMonth + '-' + fDay + '&nbsp;)';
            } else{
                back = years + '年前' + "(&nbsp;" + date.toDateString()+ "&nbsp;)";
            }
            return back;
        },
        ajPagination : function (params) {
            var config = {
                total : 0,
                size : 10,
                cur : 1,
                query : {}
            };
            _.extend(config, params);
            config.total = parseInt(config.total, 10);
            config.size = parseInt(config.size, 10);
            config.cur = parseInt(config.cur, 10);
            var pages = Math.ceil(config.total / config.size),
                i,
                back = [];
            back.push('<div class="aj-page">');
            back.push('<ul class="pagination">');
            config.query.page = (config.cur - 1) || 1;
            if (config.cur === 1) {
                back.push('<li class="prev disabled"><span>«</span></li>');
            } else {
                back.push('<li class="prev"><a href="javascript:;" data-params="' + _.escape(JSON.stringify(config.query)) + '" data-page="1">«</a></li>');
            }
            for (i = 1; i <= pages; i++) {
                config.query.page = i;
                if (i == config.cur) {
                    back.push('<li class="active"><a href="javascript:;" data-page="0">' + i + '</a></li>');
                } else {
                    back.push('<li><a href="javascript:;" data-params="' +  _.escape(JSON.stringify(config.query)) + '" data-page="' + i + '">' +  i + '</a></li>');
                }
            }
            config.query.page = config.cur + 1;
            if (config.cur === pages) {
                back.push('<li class="next disabled"><span>»</span></li>');
            } else {
                back.push('<li class="next"><a href="javascript:;" data-params="' +  _.escape(JSON.stringify(config.query)) + '" data-page="' + pages + '">»</a></li>');
            }
            back.push('</ul>');
            back.push('</div>');
            return back.join('');
        },
        ajWait : function(obj){//append wait div to obj!
            obj = $(obj);
            var xx = $(obj).find('.waiting_div');
            if(xx.length > 0){
                xx.show();
                return false;
            }
            if( obj.css('position') === 'static' ){
                obj.css({
                    position : 'relative'
                });
            }
            var box = obj.offset(),
                W = obj.width(),
                H = obj.height(),
                top,
                cut,
                height = (H / 4 > 70) ? 70 : (H / 4);
            height = (height < 30) ? 30 : height;
            cut = $(window).height() - (box.top - $(window).scrollTop());
            if (cut < H) {
                top = cut / 2 - height / 2;
            } else {
                top = H / 2 - height / 2;
            }
            var div = document.createElement('div');
            div.setAttribute('onclick','(function(e){var e=c.getEvent(e);c.stopPropagation(e);})()');
            div.setAttribute('class','waiting_div');
            div.setAttribute('style','position:absolute;background-color:rgba(255,255,255,0.5);top:0;left:0;width:100%;height:100%;');
            div.innerHTML = "<img src='./img/c/wait.gif' style='position:absolute;top:" + top + "px;left:50%;"+
                "margin-left:"+(-height/2)+"px;width:"+height+"px;height:"+height+"px;'>";
            obj.append(div);
        },
        ajNoWait : function(obj){
            $(obj).find('.waiting_div').hide();
        }
    });
}());
