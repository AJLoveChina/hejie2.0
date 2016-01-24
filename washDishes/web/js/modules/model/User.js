/**
 * Created by ajax on 2016/1/24.
 */
define(function() {
    function User() {
        this._username = "";
    }
    User.protocol = {
        setName : function (name) {
            this._username = name;
        }
    };

    return User;
});