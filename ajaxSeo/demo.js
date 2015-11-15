/**
 * Created by ajax on 2015/11/13.
 */


(function(window,undefined){

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        console.log(State);
    });

    //History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"

    History.pushState({state:2}, "Page 2","?page=2");

    $('#container').on('click', 'a', function (e) {
        e.preventDefault();
        History.pushState(null, null, $(this).attr("href"));
    });
})(window);
