/**
 * Created by ajax on 2015/10/24.
 */
seajs.config({
    base : '/js/modules',
    alias : {
        index : "index/index.js",
        fanyi : 'fanyi/fanyi.js'
    },
    charset : 'UTF-8'
});
seajs.use("index");