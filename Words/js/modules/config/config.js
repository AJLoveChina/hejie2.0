define(function (reuqire, exports, module) {
    var form = $('#aj-fot .page-form:eq(0)'),
        arr,
        yy = {};
    yy.prop = {};
    arr = form.serializeArray();
    $.each(arr, function (index, item) {
        yy.prop[item.name] = item.value;
    });
    yy.prop.form = form[0];
    module.exports = yy;
});