define(function () {
    require(["a", "b"], function(a, b) {
        a();
        b();
    })
});