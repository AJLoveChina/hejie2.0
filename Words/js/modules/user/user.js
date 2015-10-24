define(function (require, exports, module) {
    function User(){
        this.user = Parse.User.current();
        this.nav = $('#aj-top');
        require.async("./user.css");

        if (this.user == null) {
            this.addSignComponents();
        } else {
            this.addComponentsWhenLogin();
        }
    }
    User.prototype = {
        addSignComponents : function () {
            var that = this;
            $.get(require.resolve("./user.view.html").replace(/\.js$/, ''), function (res) {
                var dom = $(res);
                that.nav.append(dom.find("#aj-user-sign-from"));
                $(document.body).append(dom.find('#aj-sign-up-in'));
                that.container = $("#aj-sign-up-in");
                that.fromBtn = $('#aj-user-sign-from');
                that.eventsStyle();
                that.eventControll();
            });
        },
        addComponentsWhenLogin : function () {
            var that = this;
            this.user.fetch().then(function(user){
                var name = user.getUsername(),
                    li = that.nav.find('.aj-nav-cur-username');
                console.log(name);
                that.nav.find("#aj-user-sign-from").hide();
                $("#aj-sign-up-in").hide();
                if (li.length > 0) {
                    li.show();
                    li.html(name);
                } else {
                    that.nav.append("<li class='aj-nav-cur-username'>" + name + "</li>");
                }
            }, function(err){
                console.log("sign error" + err);
            });
        },
        eventControll : function () {
            var that = this;
            this.container.find(".aj-signin-form").submit(function (e) {
                e.preventDefault();
                var name,
                    pass;
                name = this['name'].value;
                pass = this['pass'].value;

                Parse.User.logIn(name, pass, {
                    success : function (user) {
                        that.user = Parse.User.current();
                        that.addComponentsWhenLogin();
                    },
                    error : function (err) {
                        console.log("false");
                        console.log(err);
                    }
                });
            });
            this.container.find(".aj-signup-form").submit(function (e) {
                e.preventDefault();
                var name,
                    pass,
                    confirm,
                    info = $(this).find('.aj-info');
                name = this['name'].value;
                pass = this['pass'].value;
                confirm = this['confirm'].value;
                if (confirm !== pass) {
                    info.html("密码不匹配");
                    info.show();
                    return false;
                }
                info.hide();
                var user = new Parse.User();
                user.set("username", name);
                user.set("password", pass);

                user.signUp(null, {
                    success : function (user) {
                        that.user = Parse.User.current();
                        that.addComponentsWhenLogin();
                    },
                    error : function (err) {
                        console.log("sign up fail");
                        console.log(err);
                    }
                });
            });
        },
        eventsStyle : function () {
            var container = this.container,
                fromBtn = this.fromBtn;
            container.on('click', '.aj-other-info .aj-p1', function () {
                $(this).parents(".aj-sign-content").hide().siblings(".aj-sign-content").show();
            });
            container.on("click", '.aj-close', function () {
                container.hide();
            });
            fromBtn.on('click', function () {
                container.toggle();
            });
        }
    };
    (new User());

});