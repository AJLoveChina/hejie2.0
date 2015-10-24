$(document).ready(function(){
	yy.start();
});

var yy={};
yy.index={};//首页
yy.type={};
yy.mess={};

yy.start=function(){
	yy.DomProp();
	yy.parse();
	yy.headerChoose();
	yy.search();
	yy.index.start();
	yy.type.start();
	yy.mess.start();
}
yy.DomProp=function(){
	yy.dom={
		mainDiv:c.querySelector('.my-main-wrap-four'),
		headerNav:c.querySelectorAll('.my-breakpoint-nav .ui-radio'),
		contentPage:c.querySelectorAll('.my-content-page'),
		hiddenForm:c.aj('my-blog-hidden-form'),
	};
	yy.prop={
		token:yy.dom.hiddenForm.token.value,
		href:c.is.local()?'http://localhost/myblog/':'',
		uHref:c.is.local()?'http://localhost/myblog/ueditor/':'',
		whichPage:1,   //0 means index,1 means type,2 means message ,3 means aboutme
		canSerach:true,
		lastSearchWord:'',//if this time search-word is same as the last ,do nothing
	};
}
yy.parse=function(div){
	if(div!=undefined){
		var randomClassName='aj-content-random-'+c.num.rand(1000,9999);
		$(div).addClass(randomClassName);
		uParse('.'+randomClassName+' '+'.aj-content',{
			rootPath:yy.prop.uHref
		});		
	}else{
		uParse('.aj-content',{
			rootPath:yy.prop.uHref
		});		
	}
}
yy.allParse=function(div){
	var randomClassName='aj-content-random-'+c.num.rand(1000,9999);
	$(div).addClass(randomClassName);
	$(div).trigger('create');
	uParse('.'+randomClassName+' '+'.aj-content',{
		rootPath:yy.prop.uHref
	});
}
yy.headerChoose=function(){
	var from=yy.dom.headerNav,
		to=yy.dom.contentPage;
	yy.showWhich(yy.prop.whichPage);
	for(var i=0;i<from.length;i++){
		(function(obj){
			obj.index=i;
			c.addEvent(obj,'click',function(){
				yy.showWhich(obj.index);
			});
		})(from[i])
	}
}
yy.showWhich=function(index){
	var from=yy.dom.headerNav,
		to=yy.dom.contentPage,
		label;
	for(var i=0;i<to.length;i++){
		$(to[i]).fadeOut();
		label=from[i].getElementsByTagName('label')[0];
		$(label).removeClass('ui-btn-active');
	}
	label=from[index].getElementsByTagName('label')[0];
	$(label).addClass('ui-btn-active');
	$(to[index]).fadeIn();
	yy.prop.whichPage=index;
}
yy.search=function(){
	var div=c.querySelector('.my-blog-search'),
		pro=yy.prop,
		dom=yy.dom;
	c.addEvent(div,'keydown',function(e){
		var e=c.getEvent(e);
		if(e.keyCode==13){//hui che
			if(!c.is.empty(this.value) &&pro.canSerach && pro.lastSearchWord!=this.value){
				pro.canSerach=false;
				c.dom.wait(dom.mainDiv);
				var prop={},
					wrap=yy.index.dom.blogsWrap;
				prop.method='GET';
				prop.way=6;
				prop.token=yy.prop.token;
				prop.word=this.value;
				$.ajax({
					url:yy.prop.href+'php/query.php',
					type:'get',
					async:true,
					data:prop,
					success:function(val){
						yy.showWhich(0);//val show in #page-index
						setTimeout(function(){
							c.dom.nowait(dom.mainDiv);
							pro.canSerach=true;
							pro.lastSearchWord=prop.word;
						},1000);
						wrap.innerHTML=val;
						yy.parse(wrap);
						$(wrap).trigger('create');
						var blogs=c.ajax({'obj':wrap,'className':'aj-content'});
						for(var i=0;i<blogs.length;i++){
							(function(obj){
								var oneBlog=new Blog({'obj':obj});
							})(blogs[i])
						}
					}
				});
			}
		}
	});
}

function Blog(prop){
	this.obj=prop.obj;//obj is one blog
	this.showCommentBtn=c.ajax({'obj':this.obj,'className':'my-blog-show-comment'})[0];
	this.commentArea=c.querySelector('#page-index .my-blog-comment');
	this.commentArticleTitle=yy.index.dom.commentArticleTitle;
	this.commentForm=yy.index.dom.commentForm;
	this.form=this.obj.getElementsByTagName('form')[0];
	//Event
	this.showCommentArea();
}
Blog.prototype={
	showCommentArea:function(){
		var that=this;
		c.addEvent(this.showCommentBtn,'click',function(){
			$(that.commentArea).fadeIn();
			that.commentArticleTitle.innerHTML=that.form.title.value;
			that.commentForm.blog_id.value=that.form.id.value;
			yy.index.loadComments(that.form.id.value);
		});
	},
}
//
yy.index.start=function(){
	yy.index.DomProp();
	yy.index.switchCommentViewSubmit();
	yy.index.showCommentArea();//当点击评论按钮时，显示comment area
	yy.index.setCommectAreaFixed();
	yy.index.submitCommentForm();//提交评论
	yy.index.loadComments();
	yy.index.loadBlogsWhenWindowBottom();//动态加载blogs
}
yy.index.DomProp=function(){
	yy.index.dom={
		showCommentBtn:c.querySelectorAll('#page-index .my-blog-show-comment'),
		commentArea:c.querySelector('#page-index .my-blog-comment'),
		wantCommentBtn:c.querySelector('#page-index .my-blog-comment .my-wantto-comment'),
		viewCommentBtn:c.querySelector('#page-index .my-blog-comment .my-view-comments'),
		toCommentWrap:c.querySelector('#page-index .my-upload-comment'),
		commentArticleTitle:c.querySelector('#page-index .my-blog-comment .my-comment-article-title'),
		submitCommentFormBtn:c.querySelector('#page-index .my-blog-comment .my-click-submit-comment-form'),
		commentForm:c.querySelector('#page-index .my-blog-comment .my-upload-comment-form'),
		commentFormInfo:c.querySelector('#page-index .my-blog-comment .my-up-co-form-info'),
		commentsWrap:c.querySelector('#page-index .my-blog-comment .my-comments-wrap'),
		blogsWrap:c.querySelector('#page-index .aj-content-wrap'),
	};
	yy.index.prop={
		//yy.index.prop.canSubmitCommentForm=true,//防止重复提交表单
		canDynamicLoadBlogs:true,//防止重复动态加载blogs
		haveJustSubmitComment:false,//用来判断浏览评论时，是否需要刷新评论以显示自己的评论
		lastClickShowCommentBtn:'',
	};
}
yy.index.switchCommentViewSubmit=function(want,view,toWant,toView){
	if(want==undefined || view==undefined){
		want=yy.index.dom.wantCommentBtn;
		view=yy.index.dom.viewCommentBtn;
		toWant=yy.index.dom.commentsWrap;
		toView=yy.index.dom.toCommentWrap;
	}
	c.addEvent(want,'click',function(){
		$(toWant).hide();
		$(toView).fadeIn();
	});
	c.addEvent(view,'click',function(){
		$(toWant).fadeIn();
		$(toView).hide();
	});
}
yy.index.showCommentArea=function(div,dom){
	var form,btns,
		dom=(dom==undefined)?yy.index.dom:dom;
	if(div==undefined){
		btns=dom.showCommentBtn;
	}else{//为ajax获得的blog添加点击展示comment area 事件
		btns=c.ajax({'obj':div,'className':'my-blog-show-comment'});
	}
	for(var i=btns.length-1;i>=0;i--){
		(function(obj){
			obj.index=i;
			c.addEvent(obj,'click',function(){
				if(dom.lastClickShowCommentBtn!=btns[obj.index]){//防止多次点击造成的多次query
					dom.lastClickShowCommentBtn=btns[obj.index];
					form=obj.parentNode.getElementsByTagName('form')[0];
					$(dom.commentArea).fadeIn();
					dom.commentArticleTitle.innerHTML=form.title.value;
					dom.commentForm.blog_id.value=form.id.value;
					yy.index.loadComments(form.id.value,dom);					
				}
			});
		})(btns[i])
	}
}
yy.index.setCommectAreaFixed=function(dom){
	var dom=(dom==undefined)?yy.index.dom:dom;
	c.addEvent(window,'scroll',function(){
		//console.log(window.scrollY);
		if(window.scrollY>50){
			$(dom.commentArea).addClass('my-blog-comment-fixed');
		}
		if(window.scrollY<50){
			$(dom.commentArea).removeClass('my-blog-comment-fixed');
		}
	});
}
yy.index.submitCommentForm=function(dom,pro){
	var dom=(dom==undefined)?yy.index.dom:dom,
		pro=(pro==undefined)?yy.index.prop:pro,
		btn=dom.submitCommentFormBtn,
		form=dom.commentForm,
		info=dom.commentFormInfo,
		prop={};
	pro.canSubmitCommentForm=true;
	c.addEvent(btn,'click',function(){
		if(pro.canSubmitCommentForm){
			if(form.name.value.length>15 || form.content.value.length>150){
				info.innerHTML='名称不要多于15字符，内容不要多于150字符';
				return false;
			}
			if(c.is.empty(form.name.value) || c.is.empty(form.content.value)){
				info.innerHTML='昵称和内容都不能为空的亲~';
				return false;
			}
			pro.canSubmitCommentForm=false;
			c.dom.wait(btn);
			prop.name=form.name.value;
			prop.content=form.content.value;
			prop.token=yy.dom.hiddenForm.token.value;
			prop.commentToken=form.commenttoken.value;
			prop.blog_id=form.blog_id.value;
			prop.method='GET';
			prop.way='1';
			$.ajax({
				url:yy.prop.href+'php/query.php',
				data:prop,
				type:'get',
				async:true,
				success:function(val){
					c.dom.nowait(btn);
					console.log(val);
					var json=JSON.parse(val);
					if(json.isok=='1'){
						info.innerHTML='评论成功';
						yy.index.prop.haveJustSubmitComment=true;
					}else if(json.isok=='0'){
						info.innerHTML='评论失败，请重试。';
						console.log(json.info);
					}
					$(info).fadeIn();
					setTimeout(function(){
						//俩秒之后才可以允许再次评论
						pro.canSubmitCommentForm=true;
						$(info).fadeOut();
					},2000);
				},
				error:function(){
					pro.canSubmitCommentForm=true;
				}
			});			
		}
	});
}
yy.index.loadComments=function(id,dom){//加载评论
	var dom=(dom==undefined)?yy.index.dom:dom;
	if(id==undefined){
		c.addEvent(dom.viewCommentBtn,'click',function(){
			yy.index.loadComments(dom.commentForm.blog_id.value);
		});		
	}else{
		c.dom.wait(dom.commentsWrap);
		if(id=='') return false;
		var prop={};
		prop.blog_id=id;
		prop.token=yy.prop.token;
		prop.method='GET';
		prop.way='2';
		$.ajax({
			url:yy.prop.href+'php/query.php',
			async:true,
			type:'get',
			data:prop,
			success:function(val){
				setTimeout(function(){
					dom.commentsWrap.innerHTML=val;
					$(dom.commentsWrap).trigger('create');					
				},1000);
			}
		});
	}
}
yy.index.loadBlogsWhenWindowBottom=function(dom,pro){
	var dom=(dom==undefined)?yy.index.dom:dom,
		pro=(pro==undefined)?yy.index.prop:pro,
		wrap=dom.blogsWrap;

	c.addEvent(window,'scroll',function(){
		if(($(window).scrollTop()+$(window).height()+2)>=$(document).height()){
			if((dom==yy.index.dom && yy.prop.whichPage==0)||(dom==yy.type.dom && yy.prop.whichPage==1)){
				//只有选择的是当前page才执行相应的event
				if(dom==yy.index.dom){
					var formArr=c.querySelectorAll('#page-index .my-timestamp-form'),
						waitArr=c.querySelectorAll('#page-index .my-timestamp'),
						form=formArr[formArr.length-1],
						wait=waitArr[waitArr.length-1];
				}else if(dom==yy.type.dom){
					var formArr=c.querySelectorAll('#page-type .my-timestamp-form'),
						waitArr=c.querySelectorAll('#page-type .my-timestamp'),
						form=formArr[formArr.length-1],
						wait=waitArr[waitArr.length-1];				
				}
				if(pro.canDynamicLoadBlogs && form.haveBlogsMore.value=='1'){
					var prop={};
					pro.canDynamicLoadBlogs=false;
					c.dom.wait(wait);
					prop.token=yy.prop.token;
					prop.date=form.timestamp.value;
					prop.way='3';
					prop.method='GET';
					if(!c.is.empty(form.types_str.value)){
						prop.types_str=form.types_str.value;
					}
					if(!c.is.empty(form.word.value)){
						prop.word=form.word.value;
					}
					$.ajax({
						url:yy.prop.href+'php/query.php',
						type:'get',
						async:true,
						data:prop,
						success:function(val){
							//console.log(val);
							//console.log(wrap);
							var div=document.createElement(div);
							var randomClassName='aj-content-random-'+c.num.rand(1000,9999);
							div.innerHTML=val;
							wrap.appendChild(div);
							yy.index.showCommentArea(div,dom);
							$(div).trigger('create');
							$(div).addClass(randomClassName);
							uParse('.'+randomClassName+' '+'.aj-content',{
								rootPath:yy.prop.uHref
							});
							setTimeout(function(){
								pro.canDynamicLoadBlogs=true;
							},2000);
						}
					});
				}				
			}
		}
	});
}
//
yy.type.start=function(){
	yy.type.DomProp();
	yy.type.copyEventsFromIndex();
	yy.type.switchTypeOrComment();
	yy.type.choose();
}
yy.type.DomProp=function(){
	yy.type.dom={
		showCommentBtn:c.querySelectorAll('#page-type .my-blog-show-comment'),
		commentArea:c.querySelector('#page-type .my-blog-comment'),
		wantCommentBtn:c.querySelector('#page-type .my-blog-comment .my-wantto-comment'),
		viewCommentBtn:c.querySelector('#page-type .my-blog-comment .my-view-comments'),
		toCommentWrap:c.querySelector('#page-type .my-upload-comment'),
		commentArticleTitle:c.querySelector('#page-type .my-blog-comment .my-comment-article-title'),
		submitCommentFormBtn:c.querySelector('#page-type .my-blog-comment .my-click-submit-comment-form'),
		commentForm:c.querySelector('#page-type .my-blog-comment .my-upload-comment-form'),
		commentFormInfo:c.querySelector('#page-type .my-blog-comment .my-up-co-form-info'),
		commentsWrap:c.querySelector('#page-type .my-blog-comment .my-comments-wrap'),
		blogsWrap:c.querySelector('#page-type .aj-content-wrap'),
		chooseWrap:c.querySelector('#page-type .my-blog-type-choose-wrap'),
		comFormWrap:c.querySelector('#page-type .my-blog-type-comment-form-wrap'),
		my_blog_type_switcher:c.querySelectorAll('#page-type .my-blog-type-switcher'),
		headTitle:c.querySelector('#page-type .my-blog--comment-title'),
	};
	yy.type.prop={
		canSubmitCommentForm:true,//防止重复提交表单
		canDynamicLoadBlogs:true, //防止重复动态加载blogs	
		canDynamicLoadBlogs:true,
		lastClickShowCommentBtn:'',
		lastClickShowTypeBtn:'',
	};
}
yy.type.copyEventsFromIndex=function(){
	yy.index.switchCommentViewSubmit(yy.type.dom.wantCommentBtn,yy.type.dom.viewCommentBtn,
		yy.type.dom.commentsWrap,yy.type.dom.toCommentWrap);
	yy.index.showCommentArea(undefined,yy.type.dom);
	yy.index.setCommectAreaFixed(yy.type.dom);
	yy.index.submitCommentForm(yy.type.dom,yy.type.prop);
	yy.index.loadComments(undefined,yy.type.dom);
	yy.index.loadBlogsWhenWindowBottom(yy.type.dom,yy.type.prop);
}
yy.type.switchTypeOrComment=function(){
	var dom=yy.type.dom;
	dom.headTitle.innerHTML='查看分类';
	for(var i=0;i<dom.my_blog_type_switcher.length;i++){
		(function(obj){
			obj.index=i;
			c.addEvent(obj,'click',function(){
				if(obj.index==0){
					$(dom.chooseWrap).fadeIn();
					$(dom.comFormWrap).hide();
					dom.headTitle.innerHTML='查看分类';
				}
				if(obj.index==1){
					$(dom.chooseWrap).hide();
					$(dom.comFormWrap).fadeIn();
					dom.headTitle.innerHTML='所有评论';
				}
			});
		})(dom.my_blog_type_switcher[i])
	}
}
yy.type.choose=function(){
	function Form(prop){
		this.prop=prop;
		this.obj=prop.obj;
		this.wrap=prop.wrap;
		this.lis=this.obj.getElementsByTagName('li');
		this.type_rank='';
		this.type_class='';
	}
	Form.prototype={
		click:function(){
			var that=this;
			for(var i=this.lis.length-1;i>=0;i--){
				(function(obj){
					obj.index=i;
					c.addEvent(obj,'click',function(){
						if(that.prop.pro.lastClickShowTypeBtn!=that.lis[obj.index]){
							that.prop.pro.lastClickShowTypeBtn=that.lis[obj.index];
							that.type_rank=obj.getAttribute('aj-rank');
							that.type_class=obj.getAttribute('aj-class');
							that.query();							
						}
					});
				})(that.lis[i])
			}
		},
		query:function(){
			var prop={},
				that=this;
			prop.type_class=this.type_class;
			prop.type_rank=this.type_rank;
			prop.method='GET';
			prop.way='5';
			prop.token=yy.prop.token;
			$.ajax({
				url:yy.prop.href+'php/query.php',
				type:'get',
				async:true,
				data:prop,
				success:function(val){
					that.wrap.innerHTML=val;
					that.xuanRan(that.wrap);
				}
			})
		},
		xuanRan:function(obj){
			var randomClassName='aj-content-random-'+c.num.rand(1000,9999),
				that=this;
			$(obj).addClass(randomClassName);
			$(that.wrap).trigger('create');
			uParse('.'+randomClassName+' '+'.aj-content',{
				rootPath:yy.prop.uHref
			});
		},
	}
	var prop={};
	prop.pro=yy.type.prop;
	prop.obj=c.querySelector('#page-type .my-blog-type-choose-wrap');
	prop.wrap=yy.type.dom.blogsWrap;
	var ff=new Form(prop);
	ff.click();
}
//
yy.mess.start=function(){
	yy.mess.DomProp();
	yy.mess.submitForm();
	yy.mess.loadMoreMessageWhenClientBottom();
}
yy.mess.DomProp=function(){
	yy.mess.dom={
		self:c.querySelector('#page-message'),
		messageWrap:c.querySelector('#page-message .my-message-wrap'),
		uploadMessForm:c.querySelector('#page-message .my-upload-message-form'),
		submitFormBtn:c.querySelector('#page-message .my-click-submit-message-form'),
		formInfo:c.querySelector('#page-message .my-up-mess-form-info'),
		asyncForm:c.querySelector('#page-message .my-message-async-form'),
	};
	yy.mess.prop={
		canLoadMoreMessage:true,
		canSubmitMessage:true,
	};
}
yy.mess.submitForm=function(){
	var dom=yy.mess.dom,
		pro=yy.mess.prop,
		prop={},
		form=dom.uploadMessForm,
		formInfo=dom.formInfo;
	c.addEvent(dom.submitFormBtn,'click',function(){
		if(c.is.empty(form.name.value) || c.is.empty(form.content.value)){
			dom.formInfo.innerHTML='name and content are all required!';
			return false;
		}
		if(form.name.value.length>15 || form.content.value.length>140){
			dom.formInfo.innerHTML='名称字符长度不阔以超过15，内容长度不阔以超过140';
			return false;
		}
		if(!pro.canSubmitMessage){
			return false;
		}
		if(Number(sessionStorage.getItem('liuyan_num'))>3){
			alert('亲，每天留言数目不阔以超过三个哦~~');
			return false;
		}
		pro.canSubmitMessage=false;
		prop.method='GET';
		prop.way=4;
		prop.token=yy.prop.token;
		prop.messagetoken=form.messagetoken.value;
		prop.name=form.name.value;
		prop.content=form.content.value;
		c.dom.wait(yy.mess.dom.uploadMessForm);
		$.ajax({
			url:yy.prop.href+'php/query.php',
			async:true,
			type:'GET',
			data:prop,
			success:function(val){
				pro.canSubmitMessage=true;
				var json=JSON.parse(val);
				setTimeout(function(){
					c.dom.nowait(yy.mess.dom.uploadMessForm);
				},1000);
				if(json.isok=='1'){
					sessionStorage.setItem('liuyan_num',Number(sessionStorage.getItem('liuyan_num'))+1);
					formInfo.innerHTML='评论成功！';
					form.name.value='';
					form.content.value='';
					yy.mess.refreshMessage();
				}else{
					formInfo.innerHTML='服务器异常，请重试。';
				}
			}
		});
	});
}
yy.mess.refreshMessage=function(){
	var prop={};
	prop.method='GET';
	prop.token=yy.prop.token;
	prop.way='7';
	$.ajax({
		url:yy.prop.href+'php/query.php',
		type:'GET',
		async:true,
		data:prop,
		success:function(val){
			yy.mess.dom.messageWrap.innerHTML=val;
			yy.allParse(yy.mess.dom.messageWrap);
		}
	})
}
yy.mess.loadMoreMessageWhenClientBottom=function(){
	var dom=yy.mess.dom,
		form=yy.mess.dom.asyncForm;
	c.addEvent(window,'scroll',function(){
		if(($(window).scrollTop()+$(window).height()+2)>=$(document).height()){
			if(yy.mess.prop.canLoadMoreMessage && form.haveMessageMore=='1'){
				var prop={};
				prop.method='GET';
				prop.way='8';
				prop.token=yy.prop.token;
				prop.timestamp=form.timestamp.value;
				yy.mess.prop.canLoadMoreMessage=false;
				//console.log(form.timestamp.value+'---'+form.haveMessageMore.value);
				$.ajax({
					url:yy.prop.href+'php/query.php',
					async:true,
					data:prop,
					success:function(val){
						var div=document.createElement('div');
						div.innerHTML=val;
						dom.messageWrap.appendChild(div);
						yy.allParse(div);
					}
				});
			}
		}
	});
}
//
