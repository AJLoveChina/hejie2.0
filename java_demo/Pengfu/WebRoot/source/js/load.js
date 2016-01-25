/**
 * Created by ajax on 2016/1/25.
 */
require.config({
    baseUrl: "source/js/modules",
    paths: {
        "some": "some/v1.0"
    },
    waitSeconds: 15
});


require(["source/js/modules/controller/AjaxRollController.js"], function () {

});