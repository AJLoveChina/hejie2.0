define(function (require, exports, module) {
    var form = c.querySelector('#aj-fot .page-form'),
        yy = {};
    //yy.prop = {
    //    form: form,
    //    url: form.url.value,
    //    nav: form['nav-which'].value,
    //    ueHref: form['ue-href'].value,
    //    query: form['query-url'].value
    //};
    yy = require('config');
    function ajax(prop) {
        var method = prop.type || 'GET',
            dt = prop.dataType || '',
            url = prop.url || yy.prop.query;
        prop.data.token = yy.prop.form.token.value;
        $.ajax({
            url: url,
            type: method,
            data: prop.data,
            dataType: dt,
            success: function (back) {
                if (prop.success) {
                    prop.success(back);
                }
            },
            error: function (info) {
                if (prop.error) {
                    prop.error(info);
                }
            },
            complete: function () {
                if (prop.complete) {
                    prop.complete();
                }
            }
        });
    }

    module.exports = ajax;
});