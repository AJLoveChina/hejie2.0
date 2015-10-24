/**
 * Created by ajax on 2015/10/24.
 */
$(function () {
    var doc = document,
        win = window,
        body = doc.body;
    addComponents();
    mouseover();
    ajax();

    function addComponents() {
        if ($('#aj-hyy-dic-wrap').length === 0) {
            var html = ["<div id='aj-hyy-dic-wrap' class=\"aj-mouse\">",
                "    <p class=\"aj-desc\">123</p>",
                "</div>"
            ].join("");
            $(body).append(html);
        } else {
            console.log("Components have been loaded!");
        }
    }
    function mouseover() {
        var timer = 0,
            dom;
        var range;
        var textNode;
        var offset;

        $(win).on('mousemove', function (e) {
            if (!timer) {
                timer = setTimeout(function () {
                    if (e.ctrlKey) {
                        dom = e.target;

                        if (document.caretPositionFromPoint) {
                            range = document.caretPositionFromPoint(e.clientX, e.clientY);
                            textNode = range.offsetNode;
                            offset = range.offset;
                        } else if (document.caretRangeFromPoint) {
                            range = document.caretRangeFromPoint(e.clientX, e.clientY);
                            textNode = range.startContainer;
                            offset = range.startOffset;
                        }

                        $(win).trigger("aj.ajax", dom, offset);
                    }
                    timer = 0;
                }, 100);
            }
        })
    }

    function ajax() {
        $(win).on("aj.ajax", function (e, dom, offset) {
            var val = dom.innerText;
            val = $.trim(val);
            if (val !== "") {
                console.log(val);
            }
        });
    }

});
