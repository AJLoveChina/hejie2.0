/**
 * Created by ajax on 2015/10/24.
 */
seajs.config({
    base : '/js/modules',
    alias : {
        index : "index/index.js",
        fanyi : 'fanyi/fanyi.js',
        youdao : 'fanyi/options.js',
        lookup : 'fanyi/lookup.js',
        user : 'user/user.js',
        words : 'words/words.js'
    },
    charset : 'UTF-8'
});
seajs.use("index");