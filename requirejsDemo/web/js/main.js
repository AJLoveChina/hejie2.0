requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        con : "controller/"
    }
});

// con not work
//requirejs(['con/X.js'], function (X, Y) {
//
//});


requirejs(["js/model/A.js"], function (A) {
    console.log(A);
});
