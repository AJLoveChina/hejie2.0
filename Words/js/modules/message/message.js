define(function (require, exports, module) {
    // get messages
    require.async('./getMess.js');

    // 该模块负责留言页面的功能
    var yy = require("config"),
        PMess = new Parse.Object.extend('liuyan');
    div = $('#aj-mid .aj-mess-all-wrap');

    function Mess(div) {
        if (this instanceof Mess) {
            this.div = div;
            this.canSubmit = true;
            this.form = $(this.div).find('.mess-submit-form')[0];
            this.event();
        } else {
            return new Mess(div);
        }
    }

    Mess.prototype = {
        event: function () {
            var that = this;
            c.addEvent(this.div, 'click', function (ev) {
                var e = ev || window.event,
                    target = e.target || e.srcElement;
                if ($(target).hasClass('mess-submit')) {
                    that.submit();
                }
            });
        },
        submit: function (target) {
            if (this.canSubmit) {
                var timestamp;
                if (timestamp = parseInt(c.tools.getItem('aj-has-submit-mess'))) {
                    if ((+new Date() - timestamp) / (1000 * 3600) < 2) {
                        this.tishi("亲,不阔以刷屏哦~");
                        return false;
                    } else {
                        c.tools.removeItem('aj-has-submit-mess');
                    }
                }
                if (c.is.empty(this.form.nickname.value) || c.is.empty(this.form.content.value)) {
                    this.tishi("亲,内容是必须都要填写哦~");
                    return false;
                }
                this.canSubmit = false;
                $(this.div).find('.mess-submit').css('opacity', '0.5');
                var that = this,
                // form = c.ajax({obj:this.div,className:'mess-submit-form'})[0];
                    form = this.form;
                if (c.is.empty(form.nickname.value) || c.is.empty(form.content.value)) {
                    that.tishi('Nickname and content are both required!');
                    this.canSubmit = true;
                    return false;
                }
                var acl = new Parse.ACL();
                acl.setPublicReadAccess(true);
                var pmess = new PMess();
                pmess.setACL(acl);
                pmess.save({
                    img : 'img/user/user.png',
                    content: form.content.value,
                    name: form.nickname.value,
                    is_delete: false,
                    date_entered: new Date()
                }, {
                    success: function () {
                        that.copy();
                        that.clearInput();
                        that.tishi("提交成功,谢谢您的留言~");
                        c.tools.setItem('aj-has-submit-mess', +new Date());

                        that.canSubmit = true;
                        $(that.div).find('.mess-submit').css('opacity', '1');
                    },
                    error: function () {

                    }
                });
            }
        },
        clearInput: function () {
            this.form.nickname.value = '';
            this.form.content.value = '';
        },
        tishi: function (val) {
            var Tishi = require('tishi');
            Tishi().show(val);
        },
        copy: function () {
            var module = $('#aj-mid .mess-one')[0],
                clone = $(module).clone(),
                name = this.form.nickname.value,
                content = this.form.content.value;
            clone.addClass($(module).attr('class'));
            clone.html($(module).html());
            clone.find('.one-top-right .name').html(name);
            clone.find('.mess-one-mid .one-mid-wrap').html(content);
            $(module).before(clone);
        }
    };
    if (div.length > 0) {
        Mess(div[0]);
    }
});