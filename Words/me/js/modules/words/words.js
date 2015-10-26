define(function (require, exports, module) {
    function Words() {
        this.word = null;
        this.item = "aj-words";
    }
    Words.prototype = {
        add  : function (word, desc) {
            var words = localStorage.getItem("aj-words"),
                results = [];
            if (!word) {
                return false;
            }
            var item = {
                word : word,
                content : desc,
                is_sysnc : false,
                date : + new Date()
            };
            if (words) {
                results = $.parseJSON(words);
            }
            results.push(JSON.stringify(item));
            localStorage.setItem(this.item, JSON.stringify(results));
            return true;
        },
        getAll : function () {
            var words = localStorage.getItem("aj-words"),
                results = [];
            if (words) {
                results = results.concat($.parseJSON(words));
            }
            return results;
        },
        inLocal : function (word) {
            var words = this.getAll(),
                one;
            if (!words) {
                return null;
            }
            for (var i = 0; i < words.length; i++) {
                one = $.parseJSON(words[i]);
                if (one.word.toLowerCase() === word.toLowerCase()){
                    return one.content;
                }
            }
            return null;
        },
        sysnc : function (fn) {
            var words = this.getAll(),
                wordsAfter = [],
                OBJ = Parse.Object.extend("words"),
                user = Parse.User.current(),
                acl = new Parse.ACL(user),
                that = this,
                up = [];
            if (user === null) {
                fn && fn({
                    isok : false,
                    info : "Not sign in!"
                });
                return false;
            }
            user.fetch().then(function (user) {

                words.forEach(function (item) {
                    var one = $.parseJSON(item);
                    if (!one.is_sysnc) {
                        one.is_sysnc = true;
                        wordsAfter.push(JSON.stringify(one));

                        var obj = new OBJ();
                        obj.set('word', one.word);
                        obj.set("user_id", user.id);
                        obj.setACL(acl);
                        up.push(obj);
                    }
                });

                localStorage.setItem(that.item, JSON.stringify(wordsAfter));

                Parse.Object.saveAll(up, {
                    success : function (res) {
                        fn && fn({
                            isok : true,
                            info : '单词本已同步到云端'
                        });
                    },
                    error : function (res) {
                        fn && fn({
                            isok : false,
                            info : '网络异常'
                        });
                    }
                });

            });
        }
    };
    var w = new Words();
    module.exports = w;
});