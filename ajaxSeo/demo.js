/**
 * Created by ajax on 2015/11/13.
 */

(function () {
    console.log(1);
    $('#container').on('click', 'a', function (e) {
        e.preventDefault();
        window.history.pushState(null, null, $(this).attr('href'));
    });
})();