define(function () {
    function C() {
        this.name = "C";
    }
    C.prototype = {
        main : function () {
            console.log(this.name);
        }
    };

    return C;
});