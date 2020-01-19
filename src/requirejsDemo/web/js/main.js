require.config({
    baseUrl: "js",
    paths: {
        "do1": "controller/do1"
    }
});
// con not work
//requirejs(['con/X.js'], function (X, Y) {
//
//});


requirejs(["js/model/A.js"], function (A) {
    console.log(A);
});
