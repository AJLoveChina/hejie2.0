/**
 * Created by ajax on 2015/10/24.
 */
$(function () {
    var doc = document,
        win = window,
        body = doc.body,
        wrap = $('#aj-hyy-dic-wrap');

    addComponents();

    function addComponents() {
        if (wrap.length === 0) {
            var html = ["<style>#aj-hyy-dic-wrap{position:fixed;background-color:white;width:100px;min-height: 50px;padding:5px 10px;box-shadow: #444 0 0 2px;border:1px solid #ccc;}",
                "#aj-hyy-dic-wrap .aj-line{font-size:12px;color:#666;}",
                "#aj-hyy-dic-wrap .aj-desc{font-weight:bold;}",
                "</style>",
                "<div id='aj-hyy-dic-wrap' class=\"aj-mouse\">",
                "   <p class='aj-head aj-line'>翻译结果 : </p>",
                "    <p class=\"aj-desc aj-line\"><span class='key'></span> : <span class='val'></span></p>",
                "</div>"
            ].join("");
            $(body).append(html);
            wrap = $('#aj-hyy-dic-wrap');
        } else {
            console.log("Components have been loaded!");
        }
    }

    var timer, prevC, prevO, prevWord, c ;
    var isAlpha = function(str){return /[a-zA-Z']+/.test(str)};
    var scr_flag = false;
    $(win).on("mousemove", onScrTrans);
    function onScrTrans(event){

        if (!event.ctrlKey){
            return true;
        }

        var r = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (!r) return true;

        pX = event.pageX;
        pY = event.pageY;
        var so = r.startOffset, eo = r.endOffset;
        if (prevC === r.startContainer && prevO === so) return true

        prevC = r.startContainer;
        prevO = so;
        var tr = r.cloneRange(), text='';
        if (r.startContainer.data) while (so >= 1){
            tr.setStart(r.startContainer, --so);
            text = tr.toString();
            if (!isAlpha(text.charAt(0))){
                tr.setStart(r.startContainer, so + 1);
                break;
            }
        }
        if (r.endContainer.data) while (eo < r.endContainer.data.length){
            tr.setEnd(r.endContainer, ++eo);
            text = tr.toString();
            if (!isAlpha(text.charAt(text.length - 1))){
                tr.setEnd(r.endContainer, eo - 1);
                break;
            }
        }

        var word = tr.toString();

        if (prevWord == word  ) return true;

        prevWord = word;


        if (word.length >= 1){

            timer = setTimeout(function(){
                scr_flag = true;
                var s = window.getSelection();
                s.removeAllRanges();
                s.addRange(tr);
                xx = event.pageX,yy = event.pageY, sx = event.screenX, sy = event.screenY;

//                getYoudaoDict(word,event.pageX,event.pageY,event.screenX,event.screenY);
                $(win).trigger("aj.ajax", {
                    'word' : word,
                    'pos' : {
                        'x' : xx,
                        'y' : yy,
                        'sx' : sx,
                        'sy' : sy
                    }
                });
            }, 100);
        }
    }


    $(win).on("aj.ajax", function (e, params) {
        console.log(params);
        wrap.css({
            top : params.pos.y + 'px',
            left : params.pos.x + 'px'
        });
        chrome.runtime.sendMessage(null, {
            action : 'fanyi',
            word : params.word
        }, null, function (json) {
            wrap.find(".aj-desc .key").html(json.trans_result[0].src);
            wrap.find(".aj-desc .val").html(json.trans_result[0].dst);
        });
    });

});
