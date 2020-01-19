/*! extension 2015-11-20 16:11:15 */
var JSON;
JSON || (JSON = {}), function () {
    "use strict";
    function f(a) {
        return 10 > a ? "0" + a : a
    }

    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function str(a, b) {
        var c, d, e, f, g, h = gap, i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
            case"string":
                return quote(i);
            case"number":
                return isFinite(i) ? String(i) : "null";
            case"boolean":
            case"null":
                return String(i);
            case"object":
                if (!i)return "null";
                if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                    for (f = i.length, c = 0; f > c; c += 1)g[c] = str(c, i) || "null";
                    return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                }
                if (rep && "object" == typeof rep)for (f = rep.length, c = 0; f > c; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e)); else for (d in i)Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
        }
    }

    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function (a, b, c) {
        var d;
        if (gap = "", indent = "", "number" == typeof c)for (d = 0; c > d; d += 1)indent += " "; else"string" == typeof c && (indent = c);
        if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length))throw new Error("JSON.stringify");
        return str("", {"": a})
    }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e)for (c in e)Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }

        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), function (a, b) {
    function c() {
        if (!t.isReady) {
            try {
                w.documentElement.doScroll("left")
            } catch (a) {
                return void setTimeout(c, 1)
            }
            t.ready()
        }
    }

    function d(a, b) {
        b.src ? t.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : t.globalEval(b.text || b.textContent || b.innerHTML || ""), b.parentNode && b.parentNode.removeChild(b)
    }

    function e(a, c, d, f, g, h) {
        var i = a.length;
        if ("object" == typeof c) {
            for (var j in c)e(a, j, c[j], f, g, d);
            return a
        }
        if (d !== b) {
            f = !h && f && t.isFunction(d);
            for (var k = 0; i > k; k++)g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
            return a
        }
        return i ? g(a[0], c) : b
    }

    function f() {
        return (new Date).getTime()
    }

    function g() {
        return !1
    }

    function h() {
        return !0
    }

    function i(a, b, c) {
        return c[0].type = a, t.event.handle.apply(b, c)
    }

    function j(a) {
        var b, c, d, e, f, g, h, i, j = [], k = [], l = arguments, m = t.data(this, "events");
        if (a.liveFired !== this && m && m.live && (!a.button || "click" !== a.type)) {
            a.liveFired = this;
            var n = m.live.slice(0);
            for (g = 0; g < n.length; g++)e = n[g], e.origType.replace(V, "") === a.type ? k.push(e.selector) : n.splice(g--, 1);
            for (d = t(a.target).closest(k, a.currentTarget), h = 0, i = d.length; i > h; h++)for (g = 0; g < n.length; g++)e = n[g], d[h].selector === e.selector && (f = d[h].elem, c = null, ("mouseenter" === e.preType || "mouseleave" === e.preType) && (c = t(a.relatedTarget).closest(e.selector)[0]), c && c === f || j.push({
                elem: f,
                handleObj: e
            }));
            for (h = 0, i = j.length; i > h; h++)if (d = j[h], a.currentTarget = d.elem, a.data = d.handleObj.data, a.handleObj = d.handleObj, d.handleObj.origHandler.apply(d.elem, l) === !1) {
                b = !1;
                break
            }
            return b
        }
    }

    function k(a, b) {
        return "live." + (a && "*" !== a ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g, "&")
    }

    function l(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function m(a, b) {
        var c = 0;
        b.each(function () {
            if (this.nodeName === (a[c] && a[c].nodeName)) {
                var b = t.data(a[c++]), d = t.data(this, b), e = b && b.events;
                if (e) {
                    delete d.handle, d.events = {};
                    for (var f in e)for (var g in e[f])t.event.add(this, f, e[f][g], e[f][g].data)
                }
            }
        })
    }

    function n(a, b, c) {
        var d, e, f, g = b && b[0] ? b[0].ownerDocument || b[0] : w;
        return 1 === a.length && "string" == typeof a[0] && a[0].length < 512 && g === w && !oa.test(a[0]) && (t.support.checkClone || !pa.test(a[0])) && (e = !0, f = t.fragments[a[0]], f && 1 !== f && (d = f)), d || (d = g.createDocumentFragment(), t.clean(a, g, d, c)), e && (t.fragments[a[0]] = f ? d : 1), {
            fragment: d,
            cacheable: e
        }
    }

    function o(a, b) {
        var c = {};
        return t.each(Ua.concat.apply([], Ua.slice(0, b)), function () {
            c[this] = a
        }), c
    }

    function p(a) {
        return "scrollTo"in a && a.document ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var q, r, s, t = function (a, b) {
        return new t.fn.init(a, b)
    }, u = a.jQuery, v = a.$, w = a.document, x = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, y = /^.[^:#\[\.,]*$/, z = /\S/, A = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, B = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, C = navigator.userAgent, D = !1, E = [], F = Object.prototype.toString, G = Object.prototype.hasOwnProperty, H = Array.prototype.push, I = Array.prototype.slice, J = Array.prototype.indexOf;
    t.fn = t.prototype = {
        init: function (a, c) {
            var d, e, f, g;
            if (!a)return this;
            if (a.nodeType)return this.context = this[0] = a, this.length = 1, this;
            if ("body" === a && !c)return this.context = w, this[0] = w.body, this.selector = "body", this.length = 1, this;
            if ("string" == typeof a) {
                if (d = x.exec(a), !d || !d[1] && c)return !c && /^\w+$/.test(a) ? (this.selector = a, this.context = w, a = w.getElementsByTagName(a), t.merge(this, a)) : !c || c.jquery ? (c || q).find(a) : t(c).find(a);
                if (d[1])return g = c ? c.ownerDocument || c : w, f = B.exec(a), f ? t.isPlainObject(c) ? (a = [w.createElement(f[1])], t.fn.attr.call(a, c, !0)) : a = [g.createElement(f[1])] : (f = n([d[1]], [g]), a = (f.cacheable ? f.fragment.cloneNode(!0) : f.fragment).childNodes), t.merge(this, a);
                if (e = w.getElementById(d[2])) {
                    if (e.id !== d[2])return q.find(a);
                    this.length = 1, this[0] = e
                }
                return this.context = w, this.selector = a, this
            }
            return t.isFunction(a) ? q.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), t.makeArray(a, this))
        }, selector: "", jquery: "1.4.2", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return I.call(this, 0)
        }, get: function (a) {
            return null == a ? this.toArray() : 0 > a ? this.slice(a)[0] : this[a]
        }, pushStack: function (a, b, c) {
            var d = t();
            return t.isArray(a) ? H.apply(d, a) : t.merge(d, a), d.prevObject = this, d.context = this.context, "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
        }, each: function (a, b) {
            return t.each(this, a, b)
        }, ready: function (a) {
            return t.bindReady(), t.isReady ? a.call(w, t) : E && E.push(a), this
        }, eq: function (a) {
            return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(I.apply(this, arguments), "slice", I.call(arguments).join(","))
        }, map: function (a) {
            return this.pushStack(t.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, end: function () {
            return this.prevObject || t(null)
        }, push: H, sort: [].sort, splice: [].splice
    }, t.fn.init.prototype = t.fn, t.extend = t.fn.extend = function () {
        var a, c, d, e, f = arguments[0] || {}, g = 1, h = arguments.length, i = !1;
        for ("boolean" == typeof f && (i = f, f = arguments[1] || {}, g = 2), "object" == typeof f || t.isFunction(f) || (f = {}), h === g && (f = this, --g); h > g; g++)if (null != (a = arguments[g]))for (c in a)if (d = f[c], e = a[c], f !== e)if (i && e && (t.isPlainObject(e) || t.isArray(e))) {
            var j = d && (t.isPlainObject(d) || t.isArray(d)) ? d : t.isArray(e) ? [] : {};
            f[c] = t.extend(i, j, e)
        } else e !== b && (f[c] = e);
        return f
    }, t.extend({
        noConflict: function (b) {
            return a.$ = v, b && (a.jQuery = u), t
        }, isReady: !1, ready: function () {
            if (!t.isReady) {
                if (!w.body)return setTimeout(t.ready, 13);
                if (t.isReady = !0, E) {
                    for (var a, b = 0; a = E[b++];)a.call(w, t);
                    E = null
                }
                t.fn.triggerHandler && t(w).triggerHandler("ready")
            }
        }, bindReady: function () {
            if (!D) {
                if (D = !0, "complete" === w.readyState)return t.ready();
                if (w.addEventListener)w.addEventListener("DOMContentLoaded", s, !1), a.addEventListener("load", t.ready, !1); else if (w.attachEvent) {
                    w.attachEvent("onreadystatechange", s), a.attachEvent("onload", t.ready);
                    var b = !1;
                    try {
                        b = null == a.frameElement
                    } catch (d) {
                    }
                    w.documentElement.doScroll && b && c()
                }
            }
        }, isFunction: function (a) {
            return "[object Function]" === F.call(a)
        }, isArray: function (a) {
            return "[object Array]" === F.call(a)
        }, isPlainObject: function (a) {
            if (!a || "[object Object]" !== F.call(a) || a.nodeType || a.setInterval)return !1;
            if (a.constructor && !G.call(a, "constructor") && !G.call(a.constructor.prototype, "isPrototypeOf"))return !1;
            var c;
            for (c in a);
            return c === b || G.call(a, c)
        }, isEmptyObject: function (a) {
            for (var b in a)return !1;
            return !0
        }, error: function (a) {
            throw a
        }, parseJSON: function (b) {
            return "string" == typeof b && b ? (b = t.trim(b), /^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? a.JSON && a.JSON.parse ? a.JSON.parse(b) : new Function("return " + b)() : void t.error("Invalid JSON: " + b)) : null
        }, noop: function () {
        }, globalEval: function (a) {
            if (a && z.test(a)) {
                var b = w.head || w.getElementsByTagName("head")[0] || w.documentElement, c = w.createElement("script");
                t.support.scriptEval ? c.appendChild(w.createTextNode(a)) : c.text = a, b.insertBefore(c, b.firstChild), b.removeChild(c)
            }
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        }, each: function (a, c, d) {
            var e, f = 0, g = a.length, h = g === b || t.isFunction(a);
            if (d)if (h) {
                for (e in a)if (c.apply(a[e], d) === !1)break
            } else for (; g > f && c.apply(a[f++], d) !== !1;); else if (h) {
                for (e in a)if (c.call(a[e], e, a[e]) === !1)break
            } else for (var i = a[0]; g > f && c.call(i, f, i) !== !1; i = a[++f]);
            return a
        }, trim: function (a) {
            return (a || "").replace(A, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            return null != a && (null == a.length || "string" == typeof a || t.isFunction(a) || "function" != typeof a && a.setInterval ? H.call(c, a) : t.merge(c, a)), c
        }, inArray: function (a, b) {
            if (b.indexOf)return b.indexOf(a);
            for (var c = 0, d = b.length; d > c; c++)if (b[c] === a)return c;
            return -1
        }, merge: function (a, c) {
            var d = a.length, e = 0;
            if ("number" == typeof c.length)for (var f = c.length; f > e; e++)a[d++] = c[e]; else for (; c[e] !== b;)a[d++] = c[e++];
            return a.length = d, a
        }, grep: function (a, b, c) {
            for (var d = [], e = 0, f = a.length; f > e; e++)!c != !b(a[e], e) && d.push(a[e]);
            return d
        }, map: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length; g > f; f++)d = b(a[f], f, c), null != d && (e[e.length] = d);
            return e.concat.apply([], e)
        }, guid: 1, proxy: function (a, c, d) {
            return 2 === arguments.length && ("string" == typeof c ? (d = a, a = d[c], c = b) : c && !t.isFunction(c) && (d = c, c = b)), !c && a && (c = function () {
                return a.apply(d || this, arguments)
            }), a && (c.guid = a.guid = a.guid || c.guid || t.guid++), c
        }, uaMatch: function (a) {
            a = a.toLowerCase();
            var b = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
            return {browser: b[1] || "", version: b[2] || "0"}
        }, browser: {}
    }), r = t.uaMatch(C), r.browser && (t.browser[r.browser] = !0, t.browser.version = r.version), t.browser.webkit && (t.browser.safari = !0), J && (t.inArray = function (a, b) {
        return J.call(b, a)
    }), q = t(w), w.addEventListener ? s = function () {
        w.removeEventListener("DOMContentLoaded", s, !1), t.ready()
    } : w.attachEvent && (s = function () {
        "complete" === w.readyState && (w.detachEvent("onreadystatechange", s), t.ready())
    }), function () {
        t.support = {};
        var b = w.documentElement, c = w.createElement("script"), d = w.createElement("div"), e = "script" + f();
        d.style.display = "none", d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var g = d.getElementsByTagName("*"), h = d.getElementsByTagName("a")[0];
        if (g && g.length && h) {
            t.support = {
                leadingWhitespace: 3 === d.firstChild.nodeType,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !!d.getElementsByTagName("link").length,
                style: /red/.test(h.getAttribute("style")),
                hrefNormalized: "/a" === h.getAttribute("href"),
                opacity: /^0.55$/.test(h.style.opacity),
                cssFloat: !!h.style.cssFloat,
                checkOn: "on" === d.getElementsByTagName("input")[0].value,
                optSelected: w.createElement("select").appendChild(w.createElement("option")).selected,
                parentNode: null === d.removeChild(d.appendChild(w.createElement("div"))).parentNode,
                deleteExpando: !0,
                checkClone: !1,
                scriptEval: !1,
                noCloneEvent: !0,
                boxModel: null
            }, c.type = "text/javascript";
            try {
                c.appendChild(w.createTextNode("window." + e + "=1;"))
            } catch (i) {
            }
            b.insertBefore(c, b.firstChild), a[e] && (t.support.scriptEval = !0, delete a[e]);
            try {
                delete c.test
            } catch (i) {
                t.support.deleteExpando = !1
            }
            b.removeChild(c), d.attachEvent && d.fireEvent && (d.attachEvent("onclick", function l() {
                t.support.noCloneEvent = !1, d.detachEvent("onclick", l)
            }), d.cloneNode(!0).fireEvent("onclick")), d = w.createElement("div"), d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            var j = w.createDocumentFragment();
            j.appendChild(d.firstChild), t.support.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, t(function () {
                var a = w.createElement("div");
                a.style.width = a.style.paddingLeft = "1px", w.body.appendChild(a), t.boxModel = t.support.boxModel = 2 === a.offsetWidth, w.body.removeChild(a).style.display = "none", a = null
            });
            var k = function (a) {
                var b = w.createElement("div");
                a = "on" + a;
                var c = a in b;
                return c || (b.setAttribute(a, "return;"), c = "function" == typeof b[a]), b = null, c
            };
            t.support.submitBubbles = k("submit"), t.support.changeBubbles = k("change"), b = c = d = g = h = null
        }
    }(), t.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var K = "jQuery" + f(), L = 0, M = {};
    t.extend({
        cache: {}, expando: K, noData: {embed: !0, object: !0, applet: !0}, data: function (c, d, e) {
            if (!c.nodeName || !t.noData[c.nodeName.toLowerCase()]) {
                c = c == a ? M : c;
                var f, g = c[K], h = t.cache;
                return g || "string" != typeof d || e !== b ? (g || (g = ++L), "object" == typeof d ? (c[K] = g, f = h[g] = t.extend(!0, {}, d)) : h[g] || (c[K] = g, h[g] = {}), f = h[g], e !== b && (f[d] = e), "string" == typeof d ? f[d] : f) : null
            }
        }, removeData: function (b, c) {
            if (!b.nodeName || !t.noData[b.nodeName.toLowerCase()]) {
                b = b == a ? M : b;
                var d = b[K], e = t.cache, f = e[d];
                c ? f && (delete f[c], t.isEmptyObject(f) && t.removeData(b)) : (t.support.deleteExpando ? delete b[t.expando] : b.removeAttribute && b.removeAttribute(t.expando), delete e[d])
            }
        }
    }), t.fn.extend({
        data: function (a, c) {
            if ("undefined" == typeof a && this.length)return t.data(this[0]);
            if ("object" == typeof a)return this.each(function () {
                t.data(this, a)
            });
            var d = a.split(".");
            if (d[1] = d[1] ? "." + d[1] : "", c === b) {
                var e = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
                return e === b && this.length && (e = t.data(this[0], a)), e === b && d[1] ? this.data(d[0]) : e
            }
            return this.trigger("setData" + d[1] + "!", [d[0], c]).each(function () {
                t.data(this, a, c)
            })
        }, removeData: function (a) {
            return this.each(function () {
                t.removeData(this, a)
            })
        }
    }), t.extend({
        queue: function (a, b, c) {
            if (a) {
                b = (b || "fx") + "queue";
                var d = t.data(a, b);
                return c ? (!d || t.isArray(c) ? d = t.data(a, b, t.makeArray(c)) : d.push(c), d) : d || []
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = t.queue(a, b), d = c.shift();
            "inprogress" === d && (d = c.shift()), d && ("fx" === b && c.unshift("inprogress"), d.call(a, function () {
                t.dequeue(a, b)
            }))
        }
    }), t.fn.extend({
        queue: function (a, c) {
            return "string" != typeof a && (c = a, a = "fx"), c === b ? t.queue(this[0], a) : this.each(function (b, d) {
                var e = t.queue(this, a, c);
                "fx" === a && "inprogress" !== e[0] && t.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                t.dequeue(this, a)
            })
        }, delay: function (a, b) {
            return a = t.fx ? t.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function () {
                var c = this;
                setTimeout(function () {
                    t.dequeue(c, b)
                }, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }
    });
    var N = /[\n\t]/g, O = /\s+/, P = /\r/g, Q = /href|src|style/, R = /(button|input)/i, S = /(button|input|object|select|textarea)/i, T = /^(a|area)$/i, U = /radio|checkbox/;
    t.fn.extend({
        attr: function (a, b) {
            return e(this, a, b, !0, t.attr)
        }, removeAttr: function (a, b) {
            return this.each(function () {
                t.attr(this, a, ""), 1 === this.nodeType && this.removeAttribute(a)
            })
        }, addClass: function (a) {
            if (t.isFunction(a))return this.each(function (b) {
                var c = t(this);
                c.addClass(a.call(this, b, c.attr("class")))
            });
            if (a && "string" == typeof a)for (var b = (a || "").split(O), c = 0, d = this.length; d > c; c++) {
                var e = this[c];
                if (1 === e.nodeType)if (e.className) {
                    for (var f = " " + e.className + " ", g = e.className, h = 0, i = b.length; i > h; h++)f.indexOf(" " + b[h] + " ") < 0 && (g += " " + b[h]);
                    e.className = t.trim(g)
                } else e.className = a
            }
            return this
        }, removeClass: function (a) {
            if (t.isFunction(a))return this.each(function (b) {
                var c = t(this);
                c.removeClass(a.call(this, b, c.attr("class")))
            });
            if (a && "string" == typeof a || a === b)for (var c = (a || "").split(O), d = 0, e = this.length; e > d; d++) {
                var f = this[d];
                if (1 === f.nodeType && f.className)if (a) {
                    for (var g = (" " + f.className + " ").replace(N, " "), h = 0, i = c.length; i > h; h++)g = g.replace(" " + c[h] + " ", " ");
                    f.className = t.trim(g)
                } else f.className = ""
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = "boolean" == typeof b;
            return t.isFunction(a) ? this.each(function (c) {
                var d = t(this);
                d.toggleClass(a.call(this, c, d.attr("class"), b), b)
            }) : this.each(function () {
                if ("string" === c)for (var e, f = 0, g = t(this), h = b, i = a.split(O); e = i[f++];)h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e); else("undefined" === c || "boolean" === c) && (this.className && t.data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : t.data(this, "__className__") || "")
            })
        }, hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if ((" " + this[c].className + " ").replace(N, " ").indexOf(b) > -1)return !0;
            return !1
        }, val: function (a) {
            if (a === b) {
                var c = this[0];
                if (c) {
                    if (t.nodeName(c, "option"))return (c.attributes.value || {}).specified ? c.value : c.text;
                    if (t.nodeName(c, "select")) {
                        var d = c.selectedIndex, e = [], f = c.options, g = "select-one" === c.type;
                        if (0 > d)return null;
                        for (var h = g ? d : 0, i = g ? d + 1 : f.length; i > h; h++) {
                            var j = f[h];
                            if (j.selected) {
                                if (a = t(j).val(), g)return a;
                                e.push(a)
                            }
                        }
                        return e
                    }
                    return U.test(c.type) && !t.support.checkOn ? null === c.getAttribute("value") ? "on" : c.value : (c.value || "").replace(P, "")
                }
                return b
            }
            var k = t.isFunction(a);
            return this.each(function (b) {
                var c = t(this), d = a;
                if (1 === this.nodeType)if (k && (d = a.call(this, b, c.val())), "number" == typeof d && (d += ""), t.isArray(d) && U.test(this.type))this.checked = t.inArray(c.val(), d) >= 0; else if (t.nodeName(this, "select")) {
                    var e = t.makeArray(d);
                    t("option", this).each(function () {
                        this.selected = t.inArray(t(this).val(), e) >= 0
                    }), e.length || (this.selectedIndex = -1)
                } else this.value = d
            })
        }
    }), t.extend({
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            if (!a || 3 === a.nodeType || 8 === a.nodeType)return b;
            if (e && c in t.attrFn)return t(a)[c](d);
            var f = 1 !== a.nodeType || !t.isXMLDoc(a), g = d !== b;
            if (c = f && t.props[c] || c, 1 === a.nodeType) {
                var h = Q.test(c);
                if ("selected" === c && !t.support.optSelected) {
                    var i = a.parentNode;
                    i && (i.selectedIndex, i.parentNode && i.parentNode.selectedIndex)
                }
                if (c in a && f && !h) {
                    if (g && ("type" === c && R.test(a.nodeName) && a.parentNode && t.error("type property can't be changed"), a[c] = d), t.nodeName(a, "form") && a.getAttributeNode(c))return a.getAttributeNode(c).nodeValue;
                    if ("tabIndex" === c) {
                        var j = a.getAttributeNode("tabIndex");
                        return j && j.specified ? j.value : S.test(a.nodeName) || T.test(a.nodeName) && a.href ? 0 : b
                    }
                    return a[c]
                }
                if (!t.support.style && f && "style" === c)return g && (a.style.cssText = "" + d), a.style.cssText;
                g && a.setAttribute(c, "" + d);
                var k = !t.support.hrefNormalized && f && h ? a.getAttribute(c, 2) : a.getAttribute(c);
                return null === k ? b : k
            }
            return t.style(a, c, d)
        }
    });
    var V = /\.(.*)$/, W = function (a) {
        return a.replace(/[^\w\s\.\|`]/g, function (a) {
            return "\\" + a
        })
    };
    t.event = {
        add: function (c, d, e, f) {
            if (3 !== c.nodeType && 8 !== c.nodeType) {
                c.setInterval && c !== a && !c.frameElement && (c = a);
                var g, h;
                e.handler && (g = e, e = g.handler), e.guid || (e.guid = t.guid++);
                var i = t.data(c);
                if (i) {
                    var j, k = i.events = i.events || {}, j = i.handle;
                    j || (i.handle = j = function () {
                        return "undefined" == typeof t || t.event.triggered ? b : t.event.handle.apply(j.elem, arguments)
                    }), j.elem = c, d = d.split(" ");
                    for (var l, m, n = 0; l = d[n++];) {
                        h = g ? t.extend({}, g) : {
                            handler: e,
                            data: f
                        }, l.indexOf(".") > -1 ? (m = l.split("."), l = m.shift(), h.namespace = m.slice(0).sort().join(".")) : (m = [], h.namespace = ""), h.type = l, h.guid = e.guid;
                        var o = k[l], p = t.event.special[l] || {};
                        o || (o = k[l] = [], p.setup && p.setup.call(c, f, m, j) !== !1 || (c.addEventListener ? c.addEventListener(l, j, !1) : c.attachEvent && c.attachEvent("on" + l, j))), p.add && (p.add.call(c, h), h.handler.guid || (h.handler.guid = e.guid)), o.push(h), t.event.global[l] = !0
                    }
                    c = null
                }
            }
        },
        global: {},
        remove: function (a, b, c, d) {
            if (3 !== a.nodeType && 8 !== a.nodeType) {
                var e, f, g, h, i, j, k, l, m, n = 0, o = t.data(a), p = o && o.events;
                if (o && p)if (b && b.type && (c = b.handler, b = b.type), !b || "string" == typeof b && "." === b.charAt(0)) {
                    b = b || "";
                    for (f in p)t.event.remove(a, f + b)
                } else {
                    for (b = b.split(" "); f = b[n++];)if (m = f, l = null, g = f.indexOf(".") < 0, h = [], g || (h = f.split("."), f = h.shift(), i = new RegExp("(^|\\.)" + t.map(h.slice(0).sort(), W).join("\\.(?:.*\\.)?") + "(\\.|$)")), k = p[f])if (c) {
                        j = t.event.special[f] || {};
                        for (var q = d || 0; q < k.length && (l = k[q], c.guid !== l.guid || ((g || i.test(l.namespace)) && (null == d && k.splice(q--, 1), j.remove && j.remove.call(a, l)), null == d)); q++);
                        (0 === k.length || null != d && 1 === k.length) && (j.teardown && j.teardown.call(a, h) !== !1 || X(a, f, o.handle), e = null, delete p[f])
                    } else for (var q = 0; q < k.length; q++)l = k[q], (g || i.test(l.namespace)) && (t.event.remove(a, m, l.handler, q), k.splice(q--, 1));
                    if (t.isEmptyObject(p)) {
                        var r = o.handle;
                        r && (r.elem = null), delete o.events, delete o.handle, t.isEmptyObject(o) && t.removeData(a)
                    }
                }
            }
        },
        trigger: function (a, c, d) {
            var e = a.type || a, f = arguments[3];
            if (!f) {
                if (a = "object" == typeof a ? a[K] ? a : t.extend(t.Event(e), a) : t.Event(e), e.indexOf("!") >= 0 && (a.type = e = e.slice(0, -1), a.exclusive = !0), d || (a.stopPropagation(), t.event.global[e] && t.each(t.cache, function () {
                        this.events && this.events[e] && t.event.trigger(a, c, this.handle.elem)
                    })), !d || 3 === d.nodeType || 8 === d.nodeType)return b;
                a.result = b, a.target = d, c = t.makeArray(c), c.unshift(a)
            }
            a.currentTarget = d;
            var g = t.data(d, "handle");
            g && g.apply(d, c);
            var h = d.parentNode || d.ownerDocument;
            try {
                d && d.nodeName && t.noData[d.nodeName.toLowerCase()] || d["on" + e] && d["on" + e].apply(d, c) === !1 && (a.result = !1)
            } catch (i) {
            }
            if (!a.isPropagationStopped() && h)t.event.trigger(a, c, h, !0); else if (!a.isDefaultPrevented()) {
                var j, k = a.target, l = t.nodeName(k, "a") && "click" === e, m = t.event.special[e] || {};
                if (!(m._default && m._default.call(d, a) !== !1 || l || k && k.nodeName && t.noData[k.nodeName.toLowerCase()])) {
                    try {
                        k[e] && (j = k["on" + e], j && (k["on" + e] = null), t.event.triggered = !0, k[e]())
                    } catch (i) {
                    }
                    j && (k["on" + e] = j), t.event.triggered = !1
                }
            }
        },
        handle: function (c) {
            var d, e, f, g, h;
            c = arguments[0] = t.event.fix(c || a.event), c.currentTarget = this, d = c.type.indexOf(".") < 0 && !c.exclusive, d || (f = c.type.split("."), c.type = f.shift(), g = new RegExp("(^|\\.)" + f.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)"));
            var h = t.data(this, "events"), e = h[c.type];
            if (h && e) {
                e = e.slice(0);
                for (var i = 0, j = e.length; j > i; i++) {
                    var k = e[i];
                    if (d || g.test(k.namespace)) {
                        c.handler = k.handler, c.data = k.data, c.handleObj = k;
                        var l = k.handler.apply(this, arguments);
                        if (l !== b && (c.result = l, l === !1 && (c.preventDefault(), c.stopPropagation())), c.isImmediatePropagationStopped())break
                    }
                }
            }
            return c.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (a) {
            if (a[K])return a;
            var c = a;
            a = t.Event(c);
            for (var d, e = this.props.length; e;)d = this.props[--e], a[d] = c[d];
            if (a.target || (a.target = a.srcElement || w), 3 === a.target.nodeType && (a.target = a.target.parentNode), !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement), null == a.pageX && null != a.clientX) {
                var f = w.documentElement, g = w.body;
                a.pageX = a.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = a.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)
            }
            return !a.which && (a.charCode || 0 === a.charCode ? a.charCode : a.keyCode) && (a.which = a.charCode || a.keyCode), !a.metaKey && a.ctrlKey && (a.metaKey = a.ctrlKey), a.which || a.button === b || (a.which = 1 & a.button ? 1 : 2 & a.button ? 3 : 4 & a.button ? 2 : 0), a
        },
        guid: 1e8,
        proxy: t.proxy,
        special: {
            ready: {setup: t.bindReady, teardown: t.noop}, live: {
                add: function (a) {
                    t.event.add(this, a.origType, t.extend({}, a, {handler: j}))
                }, remove: function (a) {
                    var b = !0, c = a.origType.replace(V, "");
                    t.each(t.data(this, "events").live || [], function () {
                        return c === this.origType.replace(V, "") ? (b = !1, !1) : void 0
                    }), b && t.event.remove(this, a.origType, j)
                }
            }, beforeunload: {
                setup: function (a, b, c) {
                    return this.setInterval && (this.onbeforeunload = c), !1
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        }
    };
    var X = w.removeEventListener ? function (a, b, c) {
        a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent("on" + b, c)
    };
    t.Event = function (a) {
        return this.preventDefault ? (a && a.type ? (this.originalEvent = a, this.type = a.type) : this.type = a, this.timeStamp = f(), void(this[K] = !0)) : new t.Event(a)
    }, t.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = h;
            var a = this.originalEvent;
            a && (a.preventDefault && a.preventDefault(), a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = h;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = h, this.stopPropagation()
        }, isDefaultPrevented: g, isPropagationStopped: g, isImmediatePropagationStopped: g
    };
    var Y = function (a) {
        var b = a.relatedTarget;
        try {
            for (; b && b !== this;)b = b.parentNode;
            b !== this && (a.type = a.data, t.event.handle.apply(this, arguments))
        } catch (c) {
        }
    }, Z = function (a) {
        a.type = a.data, t.event.handle.apply(this, arguments)
    };
    if (t.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
            t.event.special[a] = {
                setup: function (c) {
                    t.event.add(this, b, c && c.selector ? Z : Y, a)
                }, teardown: function (a) {
                    t.event.remove(this, b, a && a.selector ? Z : Y)
                }
            }
        }), t.support.submitBubbles || (t.event.special.submit = {
            setup: function (a, b) {
                return "form" === this.nodeName.toLowerCase() ? !1 : (t.event.add(this, "click.specialSubmit", function (a) {
                    var b = a.target, c = b.type;
                    return "submit" !== c && "image" !== c || !t(b).closest("form").length ? void 0 : i("submit", this, arguments)
                }), void t.event.add(this, "keypress.specialSubmit", function (a) {
                    var b = a.target, c = b.type;
                    return "text" !== c && "password" !== c || !t(b).closest("form").length || 13 !== a.keyCode ? void 0 : i("submit", this, arguments)
                }))
            }, teardown: function (a) {
                t.event.remove(this, ".specialSubmit")
            }
        }), !t.support.changeBubbles) {
        var $, _ = /textarea|input|select/i, aa = function (a) {
            var b = a.type, c = a.value;
            return "radio" === b || "checkbox" === b ? c = a.checked : "select-multiple" === b ? c = a.selectedIndex > -1 ? t.map(a.options, function (a) {
                return a.selected
            }).join("-") : "" : "select" === a.nodeName.toLowerCase() && (c = a.selectedIndex), c
        }, ba = function (a) {
            var c, d, e = a.target;
            if (_.test(e.nodeName) && !e.readOnly && (c = t.data(e, "_change_data"), d = aa(e), ("focusout" !== a.type || "radio" !== e.type) && t.data(e, "_change_data", d), c !== b && d !== c))return null != c || d ? (a.type = "change", t.event.trigger(a, arguments[1], e)) : void 0
        };
        t.event.special.change = {
            filters: {
                focusout: ba, click: function (a) {
                    var b = a.target, c = b.type;
                    return "radio" === c || "checkbox" === c || "select" === b.nodeName.toLowerCase() ? ba.call(this, a) : void 0
                }, keydown: function (a) {
                    var b = a.target, c = b.type;
                    return 13 === a.keyCode && "textarea" !== b.nodeName.toLowerCase() || 32 === a.keyCode && ("checkbox" === c || "radio" === c) || "select-multiple" === c ? ba.call(this, a) : void 0
                }, beforeactivate: function (a) {
                    var b = a.target;
                    t.data(b, "_change_data", aa(b))
                }
            }, setup: function (a, b) {
                if ("file" === this.type)return !1;
                for (var c in $)t.event.add(this, c + ".specialChange", $[c]);
                return _.test(this.nodeName)
            }, teardown: function (a) {
                return t.event.remove(this, ".specialChange"), _.test(this.nodeName)
            }
        }, $ = t.event.special.change.filters
    }
    w.addEventListener && t.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        function c(a) {
            return a = t.event.fix(a), a.type = b, t.event.handle.call(this, a)
        }

        t.event.special[b] = {
            setup: function () {
                this.addEventListener(a, c, !0)
            }, teardown: function () {
                this.removeEventListener(a, c, !0)
            }
        }
    }), t.each(["bind", "one"], function (a, c) {
        t.fn[c] = function (a, d, e) {
            if ("object" == typeof a) {
                for (var f in a)this[c](f, d, a[f], e);
                return this
            }
            t.isFunction(d) && (e = d, d = b);
            var g = "one" === c ? t.proxy(e, function (a) {
                return t(this).unbind(a, g), e.apply(this, arguments)
            }) : e;
            if ("unload" === a && "one" !== c)this.one(a, d, e); else for (var h = 0, i = this.length; i > h; h++)t.event.add(this[h], a, g, d);
            return this
        }
    }), t.fn.extend({
        unbind: function (a, b) {
            if ("object" != typeof a || a.preventDefault)for (var c = 0, d = this.length; d > c; c++)t.event.remove(this[c], a, b); else for (var e in a)this.unbind(e, a[e]);
            return this
        }, delegate: function (a, b, c, d) {
            return this.live(b, c, d, a)
        }, undelegate: function (a, b, c) {
            return 0 === arguments.length ? this.unbind("live") : this.die(b, null, c, a)
        }, trigger: function (a, b) {
            return this.each(function () {
                t.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0]) {
                var c = t.Event(a);
                return c.preventDefault(), c.stopPropagation(), t.event.trigger(c, b, this[0]), c.result
            }
        }, toggle: function (a) {
            for (var b = arguments, c = 1; c < b.length;)t.proxy(a, b[c++]);
            return this.click(t.proxy(a, function (d) {
                var e = (t.data(this, "lastToggle" + a.guid) || 0) % c;
                return t.data(this, "lastToggle" + a.guid, e + 1), d.preventDefault(), b[e].apply(this, arguments) || !1
            }))
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var ca = {focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout"};
    t.each(["live", "die"], function (a, c) {
        t.fn[c] = function (a, d, e, f) {
            var g, h, i, j, l = 0, m = f || this.selector, n = f ? this : t(this.context);
            for (t.isFunction(d) && (e = d, d = b), a = (a || "").split(" "); null != (g = a[l++]);)h = V.exec(g), i = "", h && (i = h[0], g = g.replace(V, "")), "hover" !== g ? (j = g, "focus" === g || "blur" === g ? (a.push(ca[g] + i), g += i) : g = (ca[g] || g) + i, "live" === c ? n.each(function () {
                t.event.add(this, k(g, m), {data: d, selector: m, handler: e, origType: g, origHandler: e, preType: j})
            }) : n.unbind(k(g, m), e)) : a.push("mouseenter" + i, "mouseleave" + i);
            return this
        }
    }), t.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (a, b) {
        t.fn[b] = function (a) {
            return a ? this.bind(b, a) : this.trigger(b)
        }, t.attrFn && (t.attrFn[b] = !0)
    }), a.attachEvent && !a.addEventListener && a.attachEvent("onunload", function () {
        for (var a in t.cache)if (t.cache[a].handle)try {
            t.event.remove(t.cache[a].handle.elem)
        } catch (b) {
        }
    }), function () {
        function a(b) {
            for (var c, d = "", e = 0; b[e]; e++)c = b[e], 3 === c.nodeType || 4 === c.nodeType ? d += c.nodeValue : 8 !== c.nodeType && (d += a(c.childNodes));
            return d
        }

        function c(a, b, c, d, e, f) {
            for (var g = 0, h = d.length; h > g; g++) {
                var i = d[g];
                if (i) {
                    i = i[a];
                    for (var j = !1; i;) {
                        if (i.sizcache === c) {
                            j = d[i.sizset];
                            break
                        }
                        if (1 !== i.nodeType || f || (i.sizcache = c, i.sizset = g), i.nodeName.toLowerCase() === b) {
                            j = i;
                            break
                        }
                        i = i[a]
                    }
                    d[g] = j
                }
            }
        }

        function d(a, b, c, d, e, f) {
            for (var g = 0, h = d.length; h > g; g++) {
                var i = d[g];
                if (i) {
                    i = i[a];
                    for (var k = !1; i;) {
                        if (i.sizcache === c) {
                            k = d[i.sizset];
                            break
                        }
                        if (1 === i.nodeType)if (f || (i.sizcache = c, i.sizset = g), "string" != typeof b) {
                            if (i === b) {
                                k = !0;
                                break
                            }
                        } else if (j.filter(b, [i]).length > 0) {
                            k = i;
                            break
                        }
                        i = i[a]
                    }
                    d[g] = k
                }
            }
        }

        var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, f = 0, g = Object.prototype.toString, h = !1, i = !0;
        [0, 0].sort(function () {
            return i = !1, 0
        });
        var j = function (a, b, c, d) {
            c = c || [];
            var f = b = b || w;
            if (1 !== b.nodeType && 9 !== b.nodeType)return [];
            if (!a || "string" != typeof a)return c;
            for (var h, i, m, o, p = [], t = !0, u = r(b), v = a; null !== (e.exec(""), h = e.exec(v));)if (v = h[3], p.push(h[1]), h[2]) {
                o = h[3];
                break
            }
            if (p.length > 1 && l.exec(a))if (2 === p.length && k.relative[p[0]])i = s(p[0] + p[1], b); else for (i = k.relative[p[0]] ? [b] : j(p.shift(), b); p.length;)a = p.shift(), k.relative[a] && (a += p.shift()), i = s(a, i); else {
                if (!d && p.length > 1 && 9 === b.nodeType && !u && k.match.ID.test(p[0]) && !k.match.ID.test(p[p.length - 1])) {
                    var x = j.find(p.shift(), b, u);
                    b = x.expr ? j.filter(x.expr, x.set)[0] : x.set[0]
                }
                if (b) {
                    var x = d ? {
                        expr: p.pop(),
                        set: n(d)
                    } : j.find(p.pop(), 1 !== p.length || "~" !== p[0] && "+" !== p[0] || !b.parentNode ? b : b.parentNode, u);
                    for (i = x.expr ? j.filter(x.expr, x.set) : x.set, p.length > 0 ? m = n(i) : t = !1; p.length;) {
                        var y = p.pop(), z = y;
                        k.relative[y] ? z = p.pop() : y = "", null == z && (z = b), k.relative[y](m, z, u)
                    }
                } else m = p = []
            }
            if (m || (m = i), m || j.error(y || a), "[object Array]" === g.call(m))if (t)if (b && 1 === b.nodeType)for (var A = 0; null != m[A]; A++)m[A] && (m[A] === !0 || 1 === m[A].nodeType && q(b, m[A])) && c.push(i[A]); else for (var A = 0; null != m[A]; A++)m[A] && 1 === m[A].nodeType && c.push(i[A]); else c.push.apply(c, m); else n(m, c);
            return o && (j(o, f, c, d), j.uniqueSort(c)), c
        };
        j.uniqueSort = function (a) {
            if (p && (h = i, a.sort(p), h))for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1);
            return a
        }, j.matches = function (a, b) {
            return j(a, null, null, b)
        }, j.find = function (a, b, c) {
            var d, e;
            if (!a)return [];
            for (var f = 0, g = k.order.length; g > f; f++) {
                var e, h = k.order[f];
                if (e = k.leftMatch[h].exec(a)) {
                    var i = e[1];
                    if (e.splice(1, 1), "\\" !== i.substr(i.length - 1) && (e[1] = (e[1] || "").replace(/\\/g, ""), d = k.find[h](e, b, c), null != d)) {
                        a = a.replace(k.match[h], "");
                        break
                    }
                }
            }
            return d || (d = b.getElementsByTagName("*")), {set: d, expr: a}
        }, j.filter = function (a, c, d, e) {
            for (var f, g, h = a, i = [], l = c, m = c && c[0] && r(c[0]); a && c.length;) {
                for (var n in k.filter)if (null != (f = k.leftMatch[n].exec(a)) && f[2]) {
                    var o, p, q = k.filter[n], s = f[1];
                    if (g = !1, f.splice(1, 1), "\\" === s.substr(s.length - 1))continue;
                    if (l === i && (i = []), k.preFilter[n])if (f = k.preFilter[n](f, l, d, i, e, m)) {
                        if (f === !0)continue
                    } else g = o = !0;
                    if (f)for (var t = 0; null != (p = l[t]); t++)if (p) {
                        o = q(p, f, t, l);
                        var u = e ^ !!o;
                        d && null != o ? u ? g = !0 : l[t] = !1 : u && (i.push(p), g = !0)
                    }
                    if (o !== b) {
                        if (d || (l = i), a = a.replace(k.match[n], ""), !g)return [];
                        break
                    }
                }
                if (a === h) {
                    if (null != g)break;
                    j.error(a)
                }
                h = a
            }
            return l
        }, j.error = function (a) {
            throw"Syntax error, unrecognized expression: " + a
        };
        var k = j.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = "string" == typeof b, d = c && !/\W/.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f, g = 0, h = a.length; h > g; g++)if (f = a[g]) {
                        for (; (f = f.previousSibling) && 1 !== f.nodeType;);
                        a[g] = e || f && f.nodeName.toLowerCase() === b ? f || !1 : f === b
                    }
                    e && j.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c = "string" == typeof b;
                    if (c && !/\W/.test(b)) {
                        b = b.toLowerCase();
                        for (var d = 0, e = a.length; e > d; d++) {
                            var f = a[d];
                            if (f) {
                                var g = f.parentNode;
                                a[d] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (var d = 0, e = a.length; e > d; d++) {
                            var f = a[d];
                            f && (a[d] = c ? f.parentNode : f.parentNode === b)
                        }
                        c && j.filter(b, a, !0)
                    }
                }, "": function (a, b, e) {
                    var g = f++, h = d;
                    if ("string" == typeof b && !/\W/.test(b)) {
                        var i = b = b.toLowerCase();
                        h = c
                    }
                    h("parentNode", b, g, a, i, e)
                }, "~": function (a, b, e) {
                    var g = f++, h = d;
                    if ("string" == typeof b && !/\W/.test(b)) {
                        var i = b = b.toLowerCase();
                        h = c
                    }
                    h("previousSibling", b, g, a, i, e)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if ("undefined" != typeof b.getElementById && !c) {
                        var d = b.getElementById(a[1]);
                        return d ? [d] : []
                    }
                }, NAME: function (a, b) {
                    if ("undefined" != typeof b.getElementsByName) {
                        for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; f > e; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return 0 === c.length ? null : c
                    }
                }, TAG: function (a, b) {
                    return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    if (a = " " + a[1].replace(/\\/g, "") + " ", f)return a;
                    for (var g, h = 0; null != (g = b[h]); h++)g && (e ^ (g.className && (" " + g.className + " ").replace(/[\t\n]/g, " ").indexOf(a) >= 0) ? c || d.push(g) : c && (b[h] = !1));
                    return !1
                }, ID: function (a) {
                    return a[1].replace(/\\/g, "")
                }, TAG: function (a, b) {
                    return a[1].toLowerCase()
                }, CHILD: function (a) {
                    if ("nth" === a[1]) {
                        var b = /(-?)(\d*)n((?:\+|-)?\d*)/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    }
                    return a[0] = f++, a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1].replace(/\\/g, "");
                    return !f && k.attrMap[g] && (a[1] = k.attrMap[g]), "~=" === a[2] && (a[4] = " " + a[4] + " "), a
                }, PSEUDO: function (a, b, c, d, f) {
                    if ("not" === a[1]) {
                        if (!((e.exec(a[3]) || "").length > 1 || /^\w/.test(a[3]))) {
                            var g = j.filter(a[3], b, c, !0 ^ f);
                            return c || d.push.apply(d, g), !1
                        }
                        a[3] = j(a[3], null, null, b)
                    } else if (k.match.POS.test(a[0]) || k.match.CHILD.test(a[0]))return !0;
                    return a
                }, POS: function (a) {
                    return a.unshift(!0), a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && "hidden" !== a.type
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    return a.parentNode.selectedIndex, a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!j(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    return "text" === a.type
                }, radio: function (a) {
                    return "radio" === a.type
                }, checkbox: function (a) {
                    return "checkbox" === a.type
                }, file: function (a) {
                    return "file" === a.type
                }, password: function (a) {
                    return "password" === a.type
                }, submit: function (a) {
                    return "submit" === a.type
                }, image: function (a) {
                    return "image" === a.type
                }, reset: function (a) {
                    return "reset" === a.type
                }, button: function (a) {
                    return "button" === a.type || "button" === a.nodeName.toLowerCase()
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }
            },
            setFilters: {
                first: function (a, b) {
                    return 0 === b
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return b % 2 === 0
                }, odd: function (a, b) {
                    return b % 2 === 1
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (b, c, d, e) {
                    var f = c[1], g = k.filters[f];
                    if (g)return g(b, d, c, e);
                    if ("contains" === f)return (b.textContent || b.innerText || a([b]) || "").indexOf(c[3]) >= 0;
                    if ("not" === f) {
                        for (var h = c[3], d = 0, i = h.length; i > d; d++)if (h[d] === b)return !1;
                        return !0
                    }
                    j.error("Syntax error, unrecognized expression: " + f)
                }, CHILD: function (a, b) {
                    var c = b[1], d = a;
                    switch (c) {
                        case"only":
                        case"first":
                            for (; d = d.previousSibling;)if (1 === d.nodeType)return !1;
                            if ("first" === c)return !0;
                            d = a;
                        case"last":
                            for (; d = d.nextSibling;)if (1 === d.nodeType)return !1;
                            return !0;
                        case"nth":
                            var e = b[2], f = b[3];
                            if (1 === e && 0 === f)return !0;
                            var g = b[0], h = a.parentNode;
                            if (h && (h.sizcache !== g || !a.nodeIndex)) {
                                var i = 0;
                                for (d = h.firstChild; d; d = d.nextSibling)1 === d.nodeType && (d.nodeIndex = ++i);
                                h.sizcache = g
                            }
                            var j = a.nodeIndex - f;
                            return 0 === e ? 0 === j : j % e === 0 && j / e >= 0
                    }
                }, ID: function (a, b) {
                    return 1 === a.nodeType && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return "*" === b && 1 === a.nodeType || a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1], d = k.attrHandle[c] ? k.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return null == d ? "!=" === f : "=" === f ? e === g : "*=" === f ? e.indexOf(g) >= 0 : "~=" === f ? (" " + e + " ").indexOf(g) >= 0 : g ? "!=" === f ? e !== g : "^=" === f ? 0 === e.indexOf(g) : "$=" === f ? e.substr(e.length - g.length) === g : "|=" === f ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = k.setFilters[e];
                    return f ? f(a, c, b, d) : void 0
                }
            }
        }, l = k.match.POS;
        for (var m in k.match)k.match[m] = new RegExp(k.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source), k.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + k.match[m].source.replace(/\\(\d+)/g, function (a, b) {
                return "\\" + (b - 0 + 1)
            }));
        var n = function (a, b) {
            return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
        };
        try {
            Array.prototype.slice.call(w.documentElement.childNodes, 0)[0].nodeType
        } catch (o) {
            n = function (a, b) {
                var c = b || [];
                if ("[object Array]" === g.call(a))Array.prototype.push.apply(c, a); else if ("number" == typeof a.length)for (var d = 0, e = a.length; e > d; d++)c.push(a[d]); else for (var d = 0; a[d]; d++)c.push(a[d]);
                return c
            }
        }
        var p;
        w.documentElement.compareDocumentPosition ? p = function (a, b) {
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a == b && (h = !0), a.compareDocumentPosition ? -1 : 1;
            var c = 4 & a.compareDocumentPosition(b) ? -1 : a === b ? 0 : 1;
            return 0 === c && (h = !0), c
        } : "sourceIndex"in w.documentElement ? p = function (a, b) {
            if (!a.sourceIndex || !b.sourceIndex)return a == b && (h = !0), a.sourceIndex ? -1 : 1;
            var c = a.sourceIndex - b.sourceIndex;
            return 0 === c && (h = !0), c
        } : w.createRange && (p = function (a, b) {
            if (!a.ownerDocument || !b.ownerDocument)return a == b && (h = !0), a.ownerDocument ? -1 : 1;
            var c = a.ownerDocument.createRange(), d = b.ownerDocument.createRange();
            c.setStart(a, 0), c.setEnd(a, 0), d.setStart(b, 0), d.setEnd(b, 0);
            var e = c.compareBoundaryPoints(Range.START_TO_END, d);
            return 0 === e && (h = !0), e
        }), function () {
            var a = w.createElement("div"), c = "script" + (new Date).getTime();
            a.innerHTML = "<a name='" + c + "'/>";
            var d = w.documentElement;
            d.insertBefore(a, d.firstChild), w.getElementById(c) && (k.find.ID = function (a, c, d) {
                if ("undefined" != typeof c.getElementById && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, k.filter.ID = function (a, b) {
                var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                return 1 === a.nodeType && c && c.nodeValue === b
            }), d.removeChild(a), d = a = null
        }(), function () {
            var a = w.createElement("div");
            a.appendChild(w.createComment("")), a.getElementsByTagName("*").length > 0 && (k.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if ("*" === a[1]) {
                    for (var d = [], e = 0; c[e]; e++)1 === c[e].nodeType && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && "undefined" != typeof a.firstChild.getAttribute && "#" !== a.firstChild.getAttribute("href") && (k.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), w.querySelectorAll && !function () {
            var a = j, b = w.createElement("div");
            if (b.innerHTML = "<p class='TEST'></p>", !b.querySelectorAll || 0 !== b.querySelectorAll(".TEST").length) {
                j = function (b, c, d, e) {
                    if (c = c || w, !e && 9 === c.nodeType && !r(c))try {
                        return n(c.querySelectorAll(b), d)
                    } catch (f) {
                    }
                    return a(b, c, d, e)
                };
                for (var c in a)j[c] = a[c];
                b = null
            }
        }(), function () {
            var a = w.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>", a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length && (a.lastChild.className = "e", 1 !== a.getElementsByClassName("e").length && (k.order.splice(1, 0, "CLASS"), k.find.CLASS = function (a, b, c) {
                return "undefined" == typeof b.getElementsByClassName || c ? void 0 : b.getElementsByClassName(a[1])
            }, a = null))
        }();
        var q = w.compareDocumentPosition ? function (a, b) {
            return !!(16 & a.compareDocumentPosition(b))
        } : function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        }, r = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, s = function (a, b) {
            for (var c, d = [], e = "", f = b.nodeType ? [b] : b; c = k.match.PSEUDO.exec(a);)e += c[0], a = a.replace(k.match.PSEUDO, "");
            a = k.relative[a] ? a + "*" : a;
            for (var g = 0, h = f.length; h > g; g++)j(a, f[g], d);
            return j.filter(e, d)
        };
        t.find = j, t.expr = j.selectors, t.expr[":"] = t.expr.filters, t.unique = j.uniqueSort, t.text = a, t.isXMLDoc = r, t.contains = q
    }();
    var da = /Until$/, ea = /^(?:parents|prevUntil|prevAll)/, fa = /,/, I = Array.prototype.slice, ga = function (a, b, c) {
        if (t.isFunction(b))return t.grep(a, function (a, d) {
            return !!b.call(a, d, a) === c
        });
        if (b.nodeType)return t.grep(a, function (a, d) {
            return a === b === c
        });
        if ("string" == typeof b) {
            var d = t.grep(a, function (a) {
                return 1 === a.nodeType
            });
            if (y.test(b))return t.filter(b, d, !c);
            b = t.filter(b, d)
        }
        return t.grep(a, function (a, d) {
            return t.inArray(a, b) >= 0 === c
        })
    };
    t.fn.extend({
        find: function (a) {
            for (var b = this.pushStack("", "find", a), c = 0, d = 0, e = this.length; e > d; d++)if (c = b.length, t.find(a, this[d], b), d > 0)for (var f = c; f < b.length; f++)for (var g = 0; c > g; g++)if (b[g] === b[f]) {
                b.splice(f--, 1);
                break
            }
            return b
        }, has: function (a) {
            var b = t(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; c > a; a++)if (t.contains(this, b[a]))return !0
            })
        }, not: function (a) {
            return this.pushStack(ga(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(ga(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && t.filter(a, this).length > 0
        }, closest: function (a, b) {
            if (t.isArray(a)) {
                var c, d, e = [], f = this[0], g = {};
                if (f && a.length) {
                    for (var h = 0, i = a.length; i > h; h++)d = a[h], g[d] || (g[d] = t.expr.match.POS.test(d) ? t(d, b || this.context) : d);
                    for (; f && f.ownerDocument && f !== b;) {
                        for (d in g)c = g[d], (c.jquery ? c.index(f) > -1 : t(f).is(c)) && (e.push({
                            selector: d,
                            elem: f
                        }), delete g[d]);
                        f = f.parentNode
                    }
                }
                return e
            }
            var j = t.expr.match.POS.test(a) ? t(a, b || this.context) : null;
            return this.map(function (c, d) {
                for (; d && d.ownerDocument && d !== b;) {
                    if (j ? j.index(d) > -1 : t(d).is(a))return d;
                    d = d.parentNode
                }
                return null
            })
        }, index: function (a) {
            return a && "string" != typeof a ? t.inArray(a.jquery ? a[0] : a, this) : t.inArray(this[0], a ? t(a) : this.parent().children())
        }, add: function (a, b) {
            var c = "string" == typeof a ? t(a, b || this.context) : t.makeArray(a), d = t.merge(this.get(), c);
            return this.pushStack(l(c[0]) || l(d[0]) ? d : t.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), t.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return t.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return t.dir(a, "parentNode", c)
        }, next: function (a) {
            return t.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return t.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return t.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return t.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return t.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return t.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return t.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return t.sibling(a.firstChild)
        }, contents: function (a) {
            return t.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : t.makeArray(a.childNodes)
        }
    }, function (a, b) {
        t.fn[a] = function (c, d) {
            var e = t.map(this, b, c);
            return da.test(a) || (d = c), d && "string" == typeof d && (e = t.filter(d, e)), e = this.length > 1 ? t.unique(e) : e, (this.length > 1 || fa.test(d)) && ea.test(a) && (e = e.reverse()), this.pushStack(e, a, I.call(arguments).join(","))
        }
    }), t.extend({
        filter: function (a, b, c) {
            return c && (a = ":not(" + a + ")"), t.find.matches(a, b)
        }, dir: function (a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !t(f).is(d));)1 === f.nodeType && e.push(f), f = f[c];
            return e
        }, nth: function (a, b, c, d) {
            b = b || 1;
            for (var e = 0; a && (1 !== a.nodeType || ++e !== b); a = a[c]);
            return a
        }, sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var ha = / jQuery\d+="(?:\d+|null)"/g, ia = /^\s+/, ja = /(<([\w:]+)[^>]*?)\/>/g, ka = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, la = /<([\w:]+)/, ma = /<tbody/i, na = /<|&#?\w+;/, oa = /<script|<object|<embed|<option|<style/i, pa = /checked\s*(?:[^=]|=\s*.checked.)/i, qa = function (a, b, c) {
        return ka.test(c) ? a : b + "></" + c + ">"
    }, ra = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    ra.optgroup = ra.option, ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead, ra.th = ra.td, t.support.htmlSerialize || (ra._default = [1, "div<div>", "</div>"]), t.fn.extend({
        text: function (a) {
            return t.isFunction(a) ? this.each(function (b) {
                var c = t(this);
                c.text(a.call(this, b, c.text()))
            }) : "object" != typeof a && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || w).createTextNode(a)) : t.text(this)
        }, wrapAll: function (a) {
            if (t.isFunction(a))return this.each(function (b) {
                t(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = t(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return t.isFunction(a) ? this.each(function (b) {
                t(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = t(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            return this.each(function () {
                t(this).wrapAll(a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                t.nodeName(this, "body") || t(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                1 === this.nodeType && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                1 === this.nodeType && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = t(arguments[0]);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, t(arguments[0]).toArray()), a
            }
        }, remove: function (a, b) {
            for (var c, d = 0; null != (c = this[d]); d++)(!a || t.filter(a, [c]).length) && (b || 1 !== c.nodeType || (t.cleanData(c.getElementsByTagName("*")), t.cleanData([c])), c.parentNode && c.parentNode.removeChild(c));
            return this
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++)for (1 === a.nodeType && t.cleanData(a.getElementsByTagName("*")); a.firstChild;)a.removeChild(a.firstChild);
            return this
        }, clone: function (a) {
            var b = this.map(function () {
                if (t.support.noCloneEvent || t.isXMLDoc(this))return this.cloneNode(!0);
                var a = this.outerHTML, b = this.ownerDocument;
                if (!a) {
                    var c = b.createElement("div");
                    c.appendChild(this.cloneNode(!0)), a = c.innerHTML
                }
                return t.clean([a.replace(ha, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(ia, "")], b)[0]
            });
            return a === !0 && (m(this, b), m(this.find("*"), b.find("*"))), b
        }, html: function (a) {
            if (a === b)return this[0] && 1 === this[0].nodeType ? this[0].innerHTML.replace(ha, "") : null;
            if ("string" != typeof a || oa.test(a) || !t.support.leadingWhitespace && ia.test(a) || ra[(la.exec(a) || ["", ""])[1].toLowerCase()])t.isFunction(a) ? this.each(function (b) {
                var c = t(this), d = c.html();
                c.empty().append(function () {
                    return a.call(this, b, d)
                })
            }) : this.empty().append(a); else {
                a = a.replace(ja, qa);
                try {
                    for (var c = 0, d = this.length; d > c; c++)1 === this[c].nodeType && (t.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            }
            return this
        }, replaceWith: function (a) {
            return this[0] && this[0].parentNode ? t.isFunction(a) ? this.each(function (b) {
                var c = t(this), d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : ("string" != typeof a && (a = t(a).detach()), this.each(function () {
                var b = this.nextSibling, c = this.parentNode;
                t(this).remove(), b ? t(b).before(a) : t(c).append(a)
            })) : this.pushStack(t(t.isFunction(a) ? a() : a), "replaceWith", a)
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, e) {
            function f(a, b) {
                return t.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
            }

            var g, h, i, j, k = a[0], l = [];
            if (!t.support.checkClone && 3 === arguments.length && "string" == typeof k && pa.test(k))return this.each(function () {
                t(this).domManip(a, c, e, !0)
            });
            if (t.isFunction(k))return this.each(function (d) {
                var f = t(this);
                a[0] = k.call(this, d, c ? f.html() : b), f.domManip(a, c, e)
            });
            if (this[0]) {
                if (j = k && k.parentNode, g = t.support.parentNode && j && 11 === j.nodeType && j.childNodes.length === this.length ? {fragment: j} : n(a, this, l), i = g.fragment, h = 1 === i.childNodes.length ? i = i.firstChild : i.firstChild) {
                    c = c && t.nodeName(h, "tr");
                    for (var m = 0, o = this.length; o > m; m++)e.call(c ? f(this[m], h) : this[m], m > 0 || g.cacheable || this.length > 1 ? i.cloneNode(!0) : i)
                }
                l.length && t.each(l, d)
            }
            return this
        }
    }), t.fragments = {}, t.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        t.fn[a] = function (c) {
            var d = [], e = t(c), f = 1 === this.length && this[0].parentNode;
            if (f && 11 === f.nodeType && 1 === f.childNodes.length && 1 === e.length)return e[b](this[0]), this;
            for (var g = 0, h = e.length; h > g; g++) {
                var i = (g > 0 ? this.clone(!0) : this).get();
                t.fn[b].apply(t(e[g]), i), d = d.concat(i)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), t.extend({
        clean: function (a, b, c, d) {
            b = b || w, "undefined" == typeof b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || w);
            for (var e, f = [], g = 0; null != (e = a[g]); g++)if ("number" == typeof e && (e += ""), e) {
                if ("string" != typeof e || na.test(e)) {
                    if ("string" == typeof e) {
                        e = e.replace(ja, qa);
                        var h = (la.exec(e) || ["", ""])[1].toLowerCase(), i = ra[h] || ra._default, j = i[0], k = b.createElement("div");
                        for (k.innerHTML = i[1] + e + i[2]; j--;)k = k.lastChild;
                        if (!t.support.tbody)for (var l = ma.test(e), m = "table" !== h || l ? "<table>" !== i[1] || l ? [] : k.childNodes : k.firstChild && k.firstChild.childNodes, n = m.length - 1; n >= 0; --n)t.nodeName(m[n], "tbody") && !m[n].childNodes.length && m[n].parentNode.removeChild(m[n]);
                        !t.support.leadingWhitespace && ia.test(e) && k.insertBefore(b.createTextNode(ia.exec(e)[0]), k.firstChild), e = k.childNodes
                    }
                } else e = b.createTextNode(e);
                e.nodeType ? f.push(e) : f = t.merge(f, e)
            }
            if (c)for (var g = 0; f[g]; g++)!d || !t.nodeName(f[g], "script") || f[g].type && "text/javascript" !== f[g].type.toLowerCase() ? (1 === f[g].nodeType && f.splice.apply(f, [g + 1, 0].concat(t.makeArray(f[g].getElementsByTagName("script")))), c.appendChild(f[g])) : d.push(f[g].parentNode ? f[g].parentNode.removeChild(f[g]) : f[g]);
            return f
        }, cleanData: function (a) {
            for (var b, c, d, e = t.cache, f = t.event.special, g = t.support.deleteExpando, h = 0; null != (d = a[h]); h++)if (c = d[t.expando]) {
                if (b = e[c], b.events)for (var i in b.events)f[i] ? t.event.remove(d, i) : X(d, i, b.handle);
                g ? delete d[t.expando] : d.removeAttribute && d.removeAttribute(t.expando), delete e[c]
            }
        }
    });
    var sa = /z-?index|font-?weight|opacity|zoom|line-?height/i, ta = /alpha\([^)]*\)/, ua = /opacity=([^)]*)/, va = /float/i, wa = /-([a-z])/gi, xa = /([A-Z])/g, ya = /^-?\d+(?:px)?$/i, za = /^-?\d/, Aa = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Ba = ["Left", "Right"], Ca = ["Top", "Bottom"], Da = w.defaultView && w.defaultView.getComputedStyle, Ea = t.support.cssFloat ? "cssFloat" : "styleFloat", Fa = function (a, b) {
        return b.toUpperCase()
    };
    t.fn.css = function (a, c) {
        return e(this, a, c, !0, function (a, c, d) {
            return d === b ? t.curCSS(a, c) : ("number" != typeof d || sa.test(c) || (d += "px"), void t.style(a, c, d))
        })
    }, t.extend({
        style: function (a, c, d) {
            if (!a || 3 === a.nodeType || 8 === a.nodeType)return b;
            ("width" === c || "height" === c) && parseFloat(d) < 0 && (d = b);
            var e = a.style || a, f = d !== b;
            if (!t.support.opacity && "opacity" === c) {
                if (f) {
                    e.zoom = 1;
                    var g = parseInt(d, 10) + "" == "NaN" ? "" : "alpha(opacity=" + 100 * d + ")", h = e.filter || t.curCSS(a, "filter") || "";
                    e.filter = ta.test(h) ? h.replace(ta, g) : g
                }
                return e.filter && e.filter.indexOf("opacity=") >= 0 ? parseFloat(ua.exec(e.filter)[1]) / 100 + "" : ""
            }
            return va.test(c) && (c = Ea), c = c.replace(wa, Fa), f && (e[c] = d), e[c]
        }, css: function (a, b, c, d) {
            function e() {
                f = "width" === b ? a.offsetWidth : a.offsetHeight, "border" !== d && t.each(h, function () {
                    d || (f -= parseFloat(t.curCSS(a, "padding" + this, !0)) || 0), "margin" === d ? f += parseFloat(t.curCSS(a, "margin" + this, !0)) || 0 : f -= parseFloat(t.curCSS(a, "border" + this + "Width", !0)) || 0
                })
            }

            if ("width" === b || "height" === b) {
                var f, g = Aa, h = "width" === b ? Ba : Ca;
                return 0 !== a.offsetWidth ? e() : t.swap(a, g, e), Math.max(0, Math.round(f))
            }
            return t.curCSS(a, b, c)
        }, curCSS: function (a, b, c) {
            var d, e = a.style;
            if (!t.support.opacity && "opacity" === b && a.currentStyle)return d = ua.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", "" === d ? "1" : d;
            if (va.test(b) && (b = Ea), !c && e && e[b])d = e[b]; else if (Da) {
                va.test(b) && (b = "float"), b = b.replace(xa, "-$1").toLowerCase();
                var f = a.ownerDocument.defaultView;
                if (!f)return null;
                var g = f.getComputedStyle(a, null);
                g && (d = g.getPropertyValue(b)), "opacity" === b && "" === d && (d = "1")
            } else if (a.currentStyle) {
                var h = b.replace(wa, Fa);
                if (d = a.currentStyle[b] || a.currentStyle[h], !ya.test(d) && za.test(d)) {
                    var i = e.left, j = a.runtimeStyle.left;
                    a.runtimeStyle.left = a.currentStyle.left, e.left = "fontSize" === h ? "1em" : d || 0, d = e.pixelLeft + "px", e.left = i, a.runtimeStyle.left = j
                }
            }
            return d
        }, swap: function (a, b, c) {
            var d = {};
            for (var e in b)d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (var e in b)a.style[e] = d[e]
        }
    }), t.expr && t.expr.filters && (t.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = "tr" === a.nodeName.toLowerCase();
        return 0 !== b || 0 !== c || d ? b > 0 && c > 0 && !d ? !1 : "none" === t.curCSS(a, "display") : !0
    }, t.expr.filters.visible = function (a) {
        return !t.expr.filters.hidden(a)
    });
    var Ga = f(), Ha = /<script(.|\s)*?\/script>/gi, Ia = /select|textarea/i, Ja = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, Ka = /=\?(&|$)/, La = /\?/, Ma = /(\?|&)_=.*?(&|$)/, Na = /^(\w+:)?\/\/([^\/?#]+)/, Oa = /%20/g, Pa = t.fn.load;
    t.fn.extend({
        load: function (a, b, c) {
            if ("string" != typeof a)return Pa.call(this, a);
            if (!this.length)return this;
            var d = a.indexOf(" ");
            if (d >= 0) {
                var e = a.slice(d, a.length);
                a = a.slice(0, d)
            }
            var f = "GET";
            b && (t.isFunction(b) ? (c = b, b = null) : "object" == typeof b && (b = t.param(b, t.ajaxSettings.traditional), f = "POST"));
            var g = this;
            return t.ajax({
                url: a, type: f, dataType: "html", data: b, complete: function (a, b) {
                    ("success" === b || "notmodified" === b) && g.html(e ? t("<div />").append(a.responseText.replace(Ha, "")).find(e) : a.responseText), c && g.each(c, [a.responseText, b, a])
                }
            }), this
        }, serialize: function () {
            return t.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? t.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || Ia.test(this.nodeName) || Ja.test(this.type))
            }).map(function (a, b) {
                var c = t(this).val();
                return null == c ? null : t.isArray(c) ? t.map(c, function (a, c) {
                    return {name: b.name, value: a}
                }) : {name: b.name, value: c}
            }).get()
        }
    }), t.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        t.fn[b] = function (a) {
            return this.bind(b, a)
        }
    }), t.extend({
        get: function (a, b, c, d) {
            return t.isFunction(b) && (d = d || c, c = b, b = null), t.ajax({
                type: "GET",
                url: a,
                data: b,
                success: c,
                dataType: d
            })
        },
        getScript: function (a, b) {
            return t.get(a, null, b, "script")
        },
        getJSON: function (a, b, c) {
            return t.get(a, b, c, "json")
        },
        post: function (a, b, c, d) {
            return t.isFunction(b) && (d = d || c, c = b, b = {}), t.ajax({
                type: "POST",
                url: a,
                data: b,
                success: c,
                dataType: d
            })
        },
        ajaxSetup: function (a) {
            t.extend(t.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            xhr: !a.XMLHttpRequest || "file:" === a.location.protocol && a.ActiveXObject ? function () {
                try {
                    return new a.ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {
                }
            } : function () {
                return new a.XMLHttpRequest
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function (c) {
            function d() {
                k.success && k.success.call(l, j, i, x), k.global && g("ajaxSuccess", [x, k])
            }

            function e() {
                k.complete && k.complete.call(l, x, i), k.global && g("ajaxComplete", [x, k]), k.global && !--t.active && t.event.trigger("ajaxStop")
            }

            function g(a, b) {
                (k.context ? t(k.context) : t.event).trigger(a, b)
            }

            var h, i, j, k = t.extend(!0, {}, t.ajaxSettings, c), l = c && c.context || k, m = k.type.toUpperCase();
            if (k.data && k.processData && "string" != typeof k.data && (k.data = t.param(k.data, k.traditional)), "jsonp" === k.dataType && ("GET" === m ? Ka.test(k.url) || (k.url += (La.test(k.url) ? "&" : "?") + (k.jsonp || "callback") + "=?") : k.data && Ka.test(k.data) || (k.data = (k.data ? k.data + "&" : "") + (k.jsonp || "callback") + "=?"), k.dataType = "json"), "json" === k.dataType && (k.data && Ka.test(k.data) || Ka.test(k.url)) && (h = k.jsonpCallback || "jsonp" + Ga++, k.data && (k.data = (k.data + "").replace(Ka, "=" + h + "$1")), k.url = k.url.replace(Ka, "=" + h + "$1"), k.dataType = "script", a[h] = a[h] || function (c) {
                        j = c, d(), e(), a[h] = b;
                        try {
                            delete a[h]
                        } catch (f) {
                        }
                        r && r.removeChild(s)
                    }), "script" === k.dataType && null === k.cache && (k.cache = !1), k.cache === !1 && "GET" === m) {
                var n = f(), o = k.url.replace(Ma, "$1_=" + n + "$2");
                k.url = o + (o === k.url ? (La.test(k.url) ? "&" : "?") + "_=" + n : "")
            }
            k.data && "GET" === m && (k.url += (La.test(k.url) ? "&" : "?") + k.data), k.global && !t.active++ && t.event.trigger("ajaxStart");
            var p = Na.exec(k.url), q = p && (p[1] && p[1] !== location.protocol || p[2] !== location.host);
            if ("script" === k.dataType && "GET" === m && q) {
                var r = w.head || w.getElementsByTagName("head")[0] || w.documentElement, s = w.createElement("script");
                if (s.src = k.url, k.scriptCharset && (s.charset = k.scriptCharset), !h) {
                    var u = !1;
                    s.onload = s.onreadystatechange = function () {
                        u || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (u = !0, d(), e(), s.onload = s.onreadystatechange = null, r && s.parentNode && r.removeChild(s))
                    }
                }
                return r.insertBefore(s, r.firstChild), b
            }
            var v = !1, x = k.xhr();
            if (x) {
                k.username ? x.open(m, k.url, k.async, k.username, k.password) : x.open(m, k.url, k.async);
                try {
                    (k.data || c && c.contentType) && x.setRequestHeader("Content-Type", k.contentType), k.ifModified && (t.lastModified[k.url] && x.setRequestHeader("If-Modified-Since", t.lastModified[k.url]), t.etag[k.url] && x.setRequestHeader("If-None-Match", t.etag[k.url])), q || x.setRequestHeader("X-Requested-With", "XMLHttpRequest"), x.setRequestHeader("Accept", k.dataType && k.accepts[k.dataType] ? k.accepts[k.dataType] + ", */*" : k.accepts._default)
                } catch (y) {
                }
                if (k.beforeSend && k.beforeSend.call(l, x, k) === !1)return k.global && !--t.active && t.event.trigger("ajaxStop"), x.abort(), !1;
                k.global && g("ajaxSend", [x, k]);
                var z = x.onreadystatechange = function (a) {
                    if (x && 0 !== x.readyState && "abort" !== a) {
                        if (!v && x && (4 === x.readyState || "timeout" === a)) {
                            v = !0, x.onreadystatechange = t.noop, i = "timeout" === a ? "timeout" : t.httpSuccess(x) ? k.ifModified && t.httpNotModified(x, k.url) ? "notmodified" : "success" : "error";
                            var b;
                            if ("success" === i)try {
                                j = t.httpData(x, k.dataType, k)
                            } catch (c) {
                                i = "parsererror", b = c
                            }
                            "success" === i || "notmodified" === i ? h || d() : t.handleError(k, x, i, b), e(), "timeout" === a && x.abort(), k.async && (x = null)
                        }
                    } else v || e(), v = !0, x && (x.onreadystatechange = t.noop)
                };
                try {
                    var A = x.abort;
                    x.abort = function () {
                        x && A.call(x), z("abort")
                    }
                } catch (y) {
                }
                k.async && k.timeout > 0 && setTimeout(function () {
                    x && !v && z("timeout")
                }, k.timeout);
                try {
                    x.send("POST" === m || "PUT" === m || "DELETE" === m ? k.data : null)
                } catch (y) {
                    t.handleError(k, x, null, y), e()
                }
                return k.async || z(), x
            }
        },
        handleError: function (a, b, c, d) {
            a.error && a.error.call(a.context || a, b, c, d), a.global && (a.context ? t(a.context) : t.event).trigger("ajaxError", [b, a, d])
        },
        active: 0,
        httpSuccess: function (a) {
            try {
                return !a.status && "file:" === location.protocol || a.status >= 200 && a.status < 300 || 304 === a.status || 1223 === a.status || 0 === a.status
            } catch (b) {
            }
            return !1
        },
        httpNotModified: function (a, b) {
            var c = a.getResponseHeader("Last-Modified"), d = a.getResponseHeader("Etag");
            return c && (t.lastModified[b] = c), d && (t.etag[b] = d), 304 === a.status || 0 === a.status
        },
        httpData: function (a, b, c) {
            var d = a.getResponseHeader("content-type") || "", e = "xml" === b || !b && d.indexOf("xml") >= 0, f = e ? a.responseXML : a.responseText;
            return e && "parsererror" === f.documentElement.nodeName && t.error("parsererror"), c && c.dataFilter && (f = c.dataFilter(f, b)), "string" == typeof f && ("json" === b || !b && d.indexOf("json") >= 0 ? f = t.parseJSON(f) : ("script" === b || !b && d.indexOf("javascript") >= 0) && t.globalEval(f)), f
        },
        param: function (a, c) {
            function d(a, b) {
                t.isArray(b) ? t.each(b, function (b, f) {
                    c || /\[\]$/.test(a) ? e(a, f) : d(a + "[" + ("object" == typeof f || t.isArray(f) ? b : "") + "]", f)
                }) : c || null == b || "object" != typeof b ? e(a, b) : t.each(b, function (b, c) {
                    d(a + "[" + b + "]", c)
                })
            }

            function e(a, b) {
                b = t.isFunction(b) ? b() : b, f[f.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            }

            var f = [];
            if (c === b && (c = t.ajaxSettings.traditional), t.isArray(a) || a.jquery)t.each(a, function () {
                e(this.name, this.value)
            }); else for (var g in a)d(g, a[g]);
            return f.join("&").replace(Oa, "+")
        }
    });
    var Qa, Ra = {}, Sa = /toggle|show|hide/, Ta = /^([+-]=)?([\d+-.]+)(.*)$/, Ua = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    t.fn.extend({
        show: function (a, b) {
            if (a || 0 === a)return this.animate(o("show", 3), a, b);
            for (var c = 0, d = this.length; d > c; c++) {
                var e = t.data(this[c], "olddisplay");
                if (this[c].style.display = e || "", "none" === t.css(this[c], "display")) {
                    var f, g = this[c].nodeName;
                    if (Ra[g])f = Ra[g]; else {
                        var h = t("<" + g + " />").appendTo("body");
                        f = h.css("display"), "none" === f && (f = "block"), h.remove(), Ra[g] = f
                    }
                    t.data(this[c], "olddisplay", f)
                }
            }
            for (var i = 0, j = this.length; j > i; i++)this[i].style.display = t.data(this[i], "olddisplay") || "";
            return this
        }, hide: function (a, b) {
            if (a || 0 === a)return this.animate(o("hide", 3), a, b);
            for (var c = 0, d = this.length; d > c; c++) {
                var e = t.data(this[c], "olddisplay");
                e || "none" === e || t.data(this[c], "olddisplay", t.css(this[c], "display"))
            }
            for (var f = 0, g = this.length; g > f; f++)this[f].style.display = "none";
            return this
        }, _toggle: t.fn.toggle, toggle: function (a, b) {
            var c = "boolean" == typeof a;
            return t.isFunction(a) && t.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || c ? this.each(function () {
                var b = c ? a : t(this).is(":hidden");
                t(this)[b ? "show" : "hide"]()
            }) : this.animate(o("toggle", 3), a, b), this
        }, fadeTo: function (a, b, c) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c)
        }, animate: function (a, b, c, d) {
            var e = t.speed(b, c, d);
            return t.isEmptyObject(a) ? this.each(e.complete) : this[e.queue === !1 ? "each" : "queue"](function () {
                var b, c = t.extend({}, e), d = 1 === this.nodeType && t(this).is(":hidden"), f = this;
                for (b in a) {
                    var g = b.replace(wa, Fa);
                    if (b !== g && (a[g] = a[b], delete a[b], b = g), "hide" === a[b] && d || "show" === a[b] && !d)return c.complete.call(this);
                    "height" !== b && "width" !== b || !this.style || (c.display = t.css(this, "display"), c.overflow = this.style.overflow), t.isArray(a[b]) && ((c.specialEasing = c.specialEasing || {})[b] = a[b][1], a[b] = a[b][0])
                }
                return null != c.overflow && (this.style.overflow = "hidden"), c.curAnim = t.extend({}, a), t.each(a, function (b, e) {
                    var g = new t.fx(f, c, b);
                    if (Sa.test(e))g["toggle" === e ? d ? "show" : "hide" : e](a); else {
                        var h = Ta.exec(e), i = g.cur(!0) || 0;
                        if (h) {
                            var j = parseFloat(h[2]), k = h[3] || "px";
                            "px" !== k && (f.style[b] = (j || 1) + k, i = (j || 1) / g.cur(!0) * i, f.style[b] = i + k), h[1] && (j = ("-=" === h[1] ? -1 : 1) * j + i), g.custom(i, j, k)
                        } else g.custom(i, e, "")
                    }
                }), !0
            })
        }, stop: function (a, b) {
            var c = t.timers;
            return a && this.queue([]), this.each(function () {
                for (var a = c.length - 1; a >= 0; a--)c[a].elem === this && (b && c[a](!0), c.splice(a, 1))
            }), b || this.dequeue(), this
        }
    }), t.each({
        slideDown: o("show", 1),
        slideUp: o("hide", 1),
        slideToggle: o("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"}
    }, function (a, b) {
        t.fn[a] = function (a, c) {
            return this.animate(b, a, c)
        }
    }), t.extend({
        speed: function (a, b, c) {
            var d = a && "object" == typeof a ? a : {
                complete: c || !c && b || t.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !t.isFunction(b) && b
            };
            return d.duration = t.fx.off ? 0 : "number" == typeof d.duration ? d.duration : t.fx.speeds[d.duration] || t.fx.speeds._default, d.old = d.complete, d.complete = function () {
                d.queue !== !1 && t(this).dequeue(), t.isFunction(d.old) && d.old.call(this)
            }, d
        }, easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            }, swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig || (b.orig = {})
        }
    }), t.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (t.fx.step[this.prop] || t.fx.step._default)(this), "height" !== this.prop && "width" !== this.prop || !this.elem.style || (this.elem.style.display = "block")
        }, cur: function (a) {
            if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop]))return this.elem[this.prop];
            var b = parseFloat(t.css(this.elem, this.prop, a));
            return b && b > -1e4 ? b : parseFloat(t.curCSS(this.elem, this.prop)) || 0
        }, custom: function (a, b, c) {
            function d(a) {
                return e.step(a)
            }

            this.startTime = f(), this.start = a, this.end = b, this.unit = c || this.unit || "px", this.now = this.start, this.pos = this.state = 0;
            var e = this;
            d.elem = this.elem, d() && t.timers.push(d) && !Qa && (Qa = setInterval(t.fx.tick, 13))
        }, show: function () {
            this.options.orig[this.prop] = t.style(this.elem, this.prop), this.options.show = !0, this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()), t(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = t.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b = f(), c = !0;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
                for (var d in this.options.curAnim)this.options.curAnim[d] !== !0 && (c = !1);
                if (c) {
                    if (null != this.options.display) {
                        this.elem.style.overflow = this.options.overflow;
                        var e = t.data(this.elem, "olddisplay");
                        this.elem.style.display = e ? e : this.options.display, "none" === t.css(this.elem, "display") && (this.elem.style.display = "block")
                    }
                    if (this.options.hide && t(this.elem).hide(), this.options.hide || this.options.show)for (var g in this.options.curAnim)t.style(this.elem, g, this.options.orig[g]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            var h = b - this.startTime;
            this.state = h / this.options.duration;
            var i = this.options.specialEasing && this.options.specialEasing[this.prop], j = this.options.easing || (t.easing.swing ? "swing" : "linear");
            return this.pos = t.easing[i || j](this.state, h, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), !0
        }
    }, t.extend(t.fx, {
        tick: function () {
            for (var a = t.timers, b = 0; b < a.length; b++)a[b]() || a.splice(b--, 1);
            a.length || t.fx.stop()
        }, stop: function () {
            clearInterval(Qa), Qa = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                t.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = ("width" === a.prop || "height" === a.prop ? Math.max(0, a.now) : a.now) + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), t.expr && t.expr.filters && (t.expr.filters.animated = function (a) {
        return t.grep(t.timers, function (b) {
            return a === b.elem
        }).length
    }), "getBoundingClientRect"in w.documentElement ? t.fn.offset = function (a) {
        var b = this[0];
        if (a)return this.each(function (b) {
            t.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return t.offset.bodyOffset(b);
        var c = b.getBoundingClientRect(), d = b.ownerDocument, e = d.body, f = d.documentElement, g = f.clientTop || e.clientTop || 0, h = f.clientLeft || e.clientLeft || 0, i = c.top + (self.pageYOffset || t.support.boxModel && f.scrollTop || e.scrollTop) - g, j = c.left + (self.pageXOffset || t.support.boxModel && f.scrollLeft || e.scrollLeft) - h;
        return {top: i, left: j}
    } : t.fn.offset = function (a) {
        var b = this[0];
        if (a)return this.each(function (b) {
            t.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return t.offset.bodyOffset(b);
        t.offset.initialize();
        for (var c, d = b.offsetParent, e = b, f = b.ownerDocument, g = f.documentElement, h = f.body, i = f.defaultView, j = i ? i.getComputedStyle(b, null) : b.currentStyle, k = b.offsetTop, l = b.offsetLeft; (b = b.parentNode) && b !== h && b !== g && (!t.offset.supportsFixedPosition || "fixed" !== j.position);)c = i ? i.getComputedStyle(b, null) : b.currentStyle, k -= b.scrollTop, l -= b.scrollLeft, b === d && (k += b.offsetTop, l += b.offsetLeft, !t.offset.doesNotAddBorder || t.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName) || (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), t.offset.subtractsBorderForOverflowNotVisible && "visible" !== c.overflow && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), j = c;
        return ("relative" === j.position || "static" === j.position) && (k += h.offsetTop, l += h.offsetLeft), t.offset.supportsFixedPosition && "fixed" === j.position && (k += Math.max(g.scrollTop, h.scrollTop), l += Math.max(g.scrollLeft, h.scrollLeft)), {
            top: k,
            left: l
        }
    }, t.offset = {
        initialize: function () {
            var a, b, c, d, e = w.body, f = w.createElement("div"), g = parseFloat(t.curCSS(e, "marginTop", !0)) || 0, h = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            t.extend(f.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            }), f.innerHTML = h, e.insertBefore(f, e.firstChild), a = f.firstChild, b = a.firstChild, d = a.nextSibling.firstChild.firstChild, this.doesNotAddBorder = 5 !== b.offsetTop, this.doesAddBorderForTableAndCells = 5 === d.offsetTop, b.style.position = "fixed", b.style.top = "20px", this.supportsFixedPosition = 20 === b.offsetTop || 15 === b.offsetTop, b.style.position = b.style.top = "", a.style.overflow = "hidden", a.style.position = "relative", this.subtractsBorderForOverflowNotVisible = -5 === b.offsetTop, this.doesNotIncludeMarginInBodyOffset = e.offsetTop !== g, e.removeChild(f), e = f = a = b = c = d = null, t.offset.initialize = t.noop
        }, bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return t.offset.initialize(), t.offset.doesNotIncludeMarginInBodyOffset && (b += parseFloat(t.curCSS(a, "marginTop", !0)) || 0, c += parseFloat(t.curCSS(a, "marginLeft", !0)) || 0), {
                top: b,
                left: c
            }
        }, setOffset: function (a, b, c) {
            /static/.test(t.curCSS(a, "position")) && (a.style.position = "relative");
            var d = t(a), e = d.offset(), f = parseInt(t.curCSS(a, "top", !0), 10) || 0, g = parseInt(t.curCSS(a, "left", !0), 10) || 0;
            t.isFunction(b) && (b = b.call(a, c, e));
            var h = {top: b.top - e.top + f, left: b.left - e.left + g};
            "using"in b ? b.using.call(a, h) : d.css(h)
        }
    }, t.fn.extend({
        position: function () {
            if (!this[0])return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = /^body|html$/i.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return c.top -= parseFloat(t.curCSS(a, "marginTop", !0)) || 0, c.left -= parseFloat(t.curCSS(a, "marginLeft", !0)) || 0, d.top += parseFloat(t.curCSS(b[0], "borderTopWidth", !0)) || 0, d.left += parseFloat(t.curCSS(b[0], "borderLeftWidth", !0)) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || w.body; a && !/^body|html$/i.test(a.nodeName) && "static" === t.css(a, "position");)a = a.offsetParent;
                return a
            })
        }
    }), t.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        t.fn[d] = function (c) {
            var e, f = this[0];
            return f ? c !== b ? this.each(function () {
                e = p(this), e ? e.scrollTo(a ? t(e).scrollLeft() : c, a ? c : t(e).scrollTop()) : this[d] = c
            }) : (e = p(f), e ? "pageXOffset"in e ? e[a ? "pageYOffset" : "pageXOffset"] : t.support.boxModel && e.document.documentElement[d] || e.document.body[d] : f[d]) : null
        }
    }), t.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        t.fn["inner" + c] = function () {
            return this[0] ? t.css(this[0], d, !1, "padding") : null
        }, t.fn["outer" + c] = function (a) {
            return this[0] ? t.css(this[0], d, !1, a ? "margin" : "border") : null
        }, t.fn[d] = function (a) {
            var e = this[0];
            return e ? t.isFunction(a) ? this.each(function (b) {
                var c = t(this);
                c[d](a.call(this, b, c[d]()))
            }) : "scrollTo"in e && e.document ? "CSS1Compat" === e.document.compatMode && e.document.documentElement["client" + c] || e.document.body["client" + c] : 9 === e.nodeType ? Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]) : a === b ? t.css(e, d) : this.css(d, "string" == typeof a ? a : a + "px") : null == a ? null : this
        }
    }), a.youdao = a.youdao || {}, a.youdao.jQuery = t
}(window), function () {
    function a(b, c, d) {
        if (b === c)return 0 !== b || 1 / b == 1 / c;
        if (null == b || null == c)return b === c;
        if (b._chain && (b = b._wrapped), c._chain && (c = c._wrapped), b.isEqual && x.isFunction(b.isEqual))return b.isEqual(c);
        if (c.isEqual && x.isFunction(c.isEqual))return c.isEqual(b);
        var e = j.call(b);
        if (e != j.call(c))return !1;
        switch (e) {
            case"[object String]":
                return b == String(c);
            case"[object Number]":
                return b != +b ? c != +c : 0 == b ? 1 / b == 1 / c : b == +c;
            case"[object Date]":
            case"[object Boolean]":
                return +b == +c;
            case"[object RegExp]":
                return b.source == c.source && b.global == c.global && b.multiline == c.multiline && b.ignoreCase == c.ignoreCase
        }
        if ("object" != typeof b || "object" != typeof c)return !1;
        for (var f = d.length; f--;)if (d[f] == b)return !0;
        d.push(b);
        var g = 0, h = !0;
        if ("[object Array]" == e) {
            if (g = b.length, h = g == c.length)for (; g-- && (h = g in b == g in c && a(b[g], c[g], d)););
        } else {
            if ("constructor"in b != "constructor"in c || b.constructor != c.constructor)return !1;
            for (var i in b)if (k.call(b, i) && (g++, !(h = k.call(c, i) && a(b[i], c[i], d))))break;
            if (h) {
                for (i in c)if (k.call(c, i) && !g--)break;
                h = !g
            }
        }
        return d.pop(), h
    }

    window.youdao = window.youdao || {};
    var b = window.youdao, c = b._, d = {}, e = Array.prototype, f = Object.prototype, g = Function.prototype, h = e.slice, i = e.unshift, j = f.toString, k = f.hasOwnProperty, l = e.forEach, m = e.map, n = e.reduce, o = e.reduceRight, p = e.filter, q = e.every, r = e.some, s = e.indexOf, t = e.lastIndexOf, u = Array.isArray, v = Object.keys, w = g.bind, x = function (a) {
        return new C(a)
    };
    b._ = x, x.VERSION = "1.2.3";
    var y = x.each = x.forEach = function (a, b, c) {
        if (null != a)if (l && a.forEach === l)a.forEach(b, c); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; f > e; e++)if (e in a && b.call(c, a[e], e, a) === d)return
        } else for (var g in a)if (k.call(a, g) && b.call(c, a[g], g, a) === d)return
    };
    x.map = function (a, b, c) {
        var d = [];
        return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function (a, e, f) {
            d[d.length] = b.call(c, a, e, f)
        }), a.length === +a.length && (d.length = a.length), d)
    }, x.reduce = x.foldl = x.inject = function (a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), n && a.reduce === n)return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        if (y(a, function (a, f, g) {
                e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
            }), !e)throw new TypeError("Reduce of empty array with no initial value");
        return c
    }, x.reduceRight = x.foldr = function (a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), o && a.reduceRight === o)return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = x.toArray(a).reverse();
        return d && !e && (b = x.bind(b, d)), e ? x.reduce(f, b, c, d) : x.reduce(f, b)
    }, x.find = x.detect = function (a, b, c) {
        var d;
        return z(a, function (a, e, f) {
            return b.call(c, a, e, f) ? (d = a, !0) : void 0
        }), d
    }, x.filter = x.select = function (a, b, c) {
        var d = [];
        return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function (a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a)
        }), d)
    }, x.reject = function (a, b, c) {
        var d = [];
        return null == a ? d : (y(a, function (a, e, f) {
            b.call(c, a, e, f) || (d[d.length] = a)
        }), d)
    }, x.every = x.all = function (a, b, c) {
        var e = !0;
        return null == a ? e : q && a.every === q ? a.every(b, c) : (y(a, function (a, f, g) {
            return (e = e && b.call(c, a, f, g)) ? void 0 : d
        }), e)
    };
    var z = x.some = x.any = function (a, b, c) {
        b || (b = x.identity);
        var e = !1;
        return null == a ? e : r && a.some === r ? a.some(b, c) : (y(a, function (a, f, g) {
            return e || (e = b.call(c, a, f, g)) ? d : void 0
        }), !!e)
    };
    x.include = x.contains = function (a, b) {
        var c = !1;
        return null == a ? c : s && a.indexOf === s ? -1 != a.indexOf(b) : c = z(a, function (a) {
            return a === b
        })
    }, x.invoke = function (a, b) {
        var c = h.call(arguments, 2);
        return x.map(a, function (a) {
            return (x.isFunction(b) ? b || a : a[b]).apply(a, c)
        })
    }, x.pluck = function (a, b) {
        return x.map(a, function (a) {
            return a[b]
        })
    }, x.max = function (a, b, c) {
        if (!b && x.isArray(a))return Math.max.apply(Math, a);
        if (!b && x.isEmpty(a))return -(1 / 0);
        var d = {computed: -(1 / 0)};
        return y(a, function (a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g >= d.computed && (d = {value: a, computed: g})
        }), d.value
    }, x.min = function (a, b, c) {
        if (!b && x.isArray(a))return Math.min.apply(Math, a);
        if (!b && x.isEmpty(a))return 1 / 0;
        var d = {computed: 1 / 0};
        return y(a, function (a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {value: a, computed: g})
        }), d.value
    }, x.shuffle = function (a) {
        var b, c = [];
        return y(a, function (a, d, e) {
            0 == d ? c[0] = a : (b = Math.floor(Math.random() * (d + 1)), c[d] = c[b], c[b] = a)
        }), c
    }, x.sortBy = function (a, b, c) {
        return x.pluck(x.map(a, function (a, d, e) {
            return {value: a, criteria: b.call(c, a, d, e)}
        }).sort(function (a, b) {
            var c = a.criteria, d = b.criteria;
            return d > c ? -1 : c > d ? 1 : 0
        }), "value")
    }, x.groupBy = function (a, b) {
        var c = {}, d = x.isFunction(b) ? b : function (a) {
            return a[b]
        };
        return y(a, function (a, b) {
            var e = d(a, b);
            (c[e] || (c[e] = [])).push(a)
        }), c
    }, x.sortedIndex = function (a, b, c) {
        c || (c = x.identity);
        for (var d = 0, e = a.length; e > d;) {
            var f = d + e >> 1;
            c(a[f]) < c(b) ? d = f + 1 : e = f
        }
        return d
    }, x.toArray = function (a) {
        return a ? a.toArray ? a.toArray() : x.isArray(a) ? h.call(a) : x.isArguments(a) ? h.call(a) : x.values(a) : []
    }, x.size = function (a) {
        return x.toArray(a).length
    }, x.first = x.head = function (a, b, c) {
        return null == b || c ? a[0] : h.call(a, 0, b)
    }, x.initial = function (a, b, c) {
        return h.call(a, 0, a.length - (null == b || c ? 1 : b))
    }, x.last = function (a, b, c) {
        return null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
    }, x.rest = x.tail = function (a, b, c) {
        return h.call(a, null == b || c ? 1 : b)
    }, x.compact = function (a) {
        return x.filter(a, function (a) {
            return !!a
        })
    }, x.flatten = function (a, b) {
        return x.reduce(a, function (a, c) {
            return x.isArray(c) ? a.concat(b ? c : x.flatten(c)) : (a[a.length] = c, a)
        }, [])
    }, x.without = function (a) {
        return x.difference(a, h.call(arguments, 1))
    }, x.uniq = x.unique = function (a, b, c) {
        var d = c ? x.map(a, c) : a, e = [];
        return x.reduce(d, function (c, d, f) {
            return 0 != f && (b === !0 ? x.last(c) == d : x.include(c, d)) || (c[c.length] = d, e[e.length] = a[f]), c
        }, []), e
    }, x.union = function () {
        return x.uniq(x.flatten(arguments, !0))
    }, x.intersection = x.intersect = function (a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function (a) {
            return x.every(b, function (b) {
                return x.indexOf(b, a) >= 0
            })
        })
    }, x.difference = function (a) {
        var b = x.flatten(h.call(arguments, 1));
        return x.filter(a, function (a) {
            return !x.include(b, a)
        })
    }, x.zip = function () {
        for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = new Array(b), d = 0; b > d; d++)c[d] = x.pluck(a, "" + d);
        return c
    }, x.indexOf = function (a, b, c) {
        if (null == a)return -1;
        var d, e;
        if (c)return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
        if (s && a.indexOf === s)return a.indexOf(b);
        for (d = 0, e = a.length; e > d; d++)if (d in a && a[d] === b)return d;
        return -1
    }, x.lastIndexOf = function (a, b) {
        if (null == a)return -1;
        if (t && a.lastIndexOf === t)return a.lastIndexOf(b);
        for (var c = a.length; c--;)if (c in a && a[c] === b)return c;
        return -1
    }, x.range = function (a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;)f[e++] = a, a += c;
        return f
    };
    var A = function () {
    };
    x.bind = function (a, b) {
        var c, d;
        if (a.bind === w && w)return w.apply(a, h.call(arguments, 1));
        if (!x.isFunction(a))throw new TypeError;
        return d = h.call(arguments, 2), c = function () {
            if (!(this instanceof c))return a.apply(b, d.concat(h.call(arguments)));
            A.prototype = a.prototype;
            var e = new A, f = a.apply(e, d.concat(h.call(arguments)));
            return Object(f) === f ? f : e
        }
    }, x.bindAll = function (a) {
        var b = h.call(arguments, 1);
        return 0 == b.length && (b = x.functions(a)), y(b, function (b) {
            a[b] = x.bind(a[b], a)
        }), a
    }, x.memoize = function (a, b) {
        var c = {};
        return b || (b = x.identity), function () {
            var d = b.apply(this, arguments);
            return k.call(c, d) ? c[d] : c[d] = a.apply(this, arguments)
        }
    }, x.delay = function (a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(a, c)
        }, b)
    }, x.defer = function (a) {
        return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
    }, x.throttle = function (a, b) {
        var c, d, e, f, g, h = x.debounce(function () {
            g = f = !1
        }, b);
        return function () {
            c = this, d = arguments;
            var i = function () {
                e = null, g && a.apply(c, d), h()
            };
            e || (e = setTimeout(i, b)), f ? g = !0 : a.apply(c, d), h(), f = !0
        }
    }, x.debounce = function (a, b) {
        var c;
        return function () {
            var d = this, e = arguments, f = function () {
                c = null, a.apply(d, e)
            };
            clearTimeout(c), c = setTimeout(f, b)
        }
    }, x.once = function (a) {
        var b, c = !1;
        return function () {
            return c ? b : (c = !0, b = a.apply(this, arguments))
        }
    }, x.wrap = function (a, b) {
        return function () {
            var c = [a].concat(h.call(arguments, 0));
            return b.apply(this, c)
        }
    }, x.compose = function () {
        var a = arguments;
        return function () {
            for (var b = arguments, c = a.length - 1; c >= 0; c--)b = [a[c].apply(this, b)];
            return b[0]
        }
    }, x.after = function (a, b) {
        return 0 >= a ? b() : function () {
            return --a < 1 ? b.apply(this, arguments) : void 0
        }
    }, x.keys = v || function (a) {
            if (a !== Object(a))throw new TypeError("Invalid object");
            var b = [];
            for (var c in a)k.call(a, c) && (b[b.length] = c);
            return b
        }, x.values = function (a) {
        return x.map(a, x.identity)
    }, x.functions = x.methods = function (a) {
        var b = [];
        for (var c in a)x.isFunction(a[c]) && b.push(c);
        return b.sort()
    }, x.extend = function (a) {
        return y(h.call(arguments, 1), function (b) {
            for (var c in b)void 0 !== b[c] && (a[c] = b[c])
        }), a
    }, x.defaults = function (a) {
        return y(h.call(arguments, 1), function (b) {
            for (var c in b)null == a[c] && (a[c] = b[c])
        }), a
    }, x.clone = function (a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
    }, x.tap = function (a, b) {
        return b(a), a
    }, x.isEqual = function (b, c) {
        return a(b, c, [])
    }, x.isEmpty = function (a) {
        if (x.isArray(a) || x.isString(a))return 0 === a.length;
        for (var b in a)if (k.call(a, b))return !1;
        return !0
    }, x.isElement = function (a) {
        return !(!a || 1 != a.nodeType)
    }, x.isArray = u || function (a) {
            return "[object Array]" == j.call(a)
        }, x.isObject = function (a) {
        return a === Object(a)
    }, x.isArguments = function (a) {
        return "[object Arguments]" == j.call(a)
    }, x.isArguments(arguments) || (x.isArguments = function (a) {
        return !(!a || !k.call(a, "callee"))
    }), x.isFunction = function (a) {
        return "[object Function]" == j.call(a)
    }, x.isString = function (a) {
        return "[object String]" == j.call(a)
    }, x.isNumber = function (a) {
        return "[object Number]" == j.call(a)
    }, x.isNaN = function (a) {
        return a !== a
    }, x.isBoolean = function (a) {
        return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
    }, x.isDate = function (a) {
        return "[object Date]" == j.call(a)
    }, x.isRegExp = function (a) {
        return "[object RegExp]" == j.call(a)
    }, x.isNull = function (a) {
        return null === a
    }, x.isUndefined = function (a) {
        return void 0 === a
    }, x.noConflict = function () {
        return b._ = c, this
    }, x.identity = function (a) {
        return a
    }, x.times = function (a, b, c) {
        for (var d = 0; a > d; d++)b.call(c, d)
    }, x.escape = function (a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    }, x.mixin = function (a) {
        y(x.functions(a), function (b) {
            E(b, x[b] = a[b])
        })
    };
    var B = 0;
    x.uniqueId = function (a) {
        var b = B++;
        return a ? a + b : b
    }, x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    }, x.template = function (a, b) {
        var c = x.templateSettings, d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.escape, function (a, b) {
                return "',_.escape(" + b.replace(/\\'/g, "'") + "),'"
            }).replace(c.interpolate, function (a, b) {
                return "'," + b.replace(/\\'/g, "'") + ",'"
            }).replace(c.evaluate || null, function (a, b) {
                return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ").replace(/\\\\/g, "\\") + ";__p.push('"
            }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", e = new Function("obj", "_", d);
        return b ? e(b, x) : function (a) {
            return e.call(this, a, x)
        }
    };
    var C = function (a) {
        this._wrapped = a
    };
    x.prototype = C.prototype;
    var D = function (a, b) {
        return b ? x(a).chain() : a
    }, E = function (a, b) {
        C.prototype[a] = function () {
            var a = h.call(arguments);
            return i.call(a, this._wrapped), D(b.apply(x, a), this._chain)
        }
    };
    x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
        var b = e[a];
        C.prototype[a] = function () {
            var c = this._wrapped;
            b.apply(c, arguments);
            var d = c.length;
            return "shift" != a && "splice" != a || 0 !== d || delete c[0], D(c, this._chain)
        }
    }), y(["concat", "join", "slice"], function (a) {
        var b = e[a];
        C.prototype[a] = function () {
            return D(b.apply(this._wrapped, arguments), this._chain)
        }
    }), C.prototype.chain = function () {
        return this._chain = !0, this
    }, C.prototype.value = function () {
        return this._wrapped
    }, "function" == typeof youdao.define && youdao.define(function (a, b, c) {
        return x
    })
}.call(this), window.youdao = window.youdao || {}, function (a, b) {
    function c(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }

    function d(a) {
        if (!i[a])throw new Error("Module " + a + " is not defined.");
        var b = i[a];
        return b.module.status !== g.INITIALIZED && e(a), b.module.exports
    }

    function e(a) {
        var e = i[a], f = e.module, j = f.exports, k = f.factory;
        if (f.parent = h, h = e, c(k)) {
            var l = k(d, j, f);
            l !== b && (f.exports = l)
        } else f.exports = i[a].factory;
        f.status = g.INITIALIZED
    }

    function f(a, d, f) {
        if (i[a])throw new Error("Module " + a + " has been defined already.");
        if ("undefined" == typeof f && (f = d), !c(f) && f !== Object(f))throw new Error("factory of module " + a + " must be an object or a function.");
        i[a] = {
            module: {
                id: a,
                exports: {},
                uri: "",
                dependencies: [],
                parent: b,
                factory: f,
                status: g.DEFINED
            }
        }, a === j && e(a)
    }

    var g = {
        DEFINED: "The module is just DEFINED",
        INITIALIZED: "The module is compiled and module.exports is available."
    };
    if (!a.define) {
        var h, i = {}, j = null;
        if (j = "./main.js", !j)throw new Error("No data-main attribute in script tag.");
        a.define = f
    }
}(window.youdao), youdao.define("core/swfobject.js", function (a, b) {
    !function () {
        window.swfobject = function () {
            function a() {
                if (!R) {
                    try {
                        var a = K.getElementsByTagName("body")[0].appendChild(q("span"));
                        a.parentNode.removeChild(a)
                    } catch (b) {
                        return
                    }
                    R = !0;
                    for (var c = N.length, d = 0; c > d; d++)N[d]()
                }
            }

            function b(a) {
                R ? a() : N[N.length] = a
            }

            function c(a) {
                if (typeof J.addEventListener != C)J.addEventListener("load", a, !1); else if (typeof K.addEventListener != C)K.addEventListener("load", a, !1); else if (typeof J.attachEvent != C)r(J, "onload", a); else if ("function" == typeof J.onload) {
                    var b = J.onload;
                    J.onload = function () {
                        b(), a()
                    }
                } else J.onload = a
            }

            function d() {
                M ? e() : f()
            }

            function e() {
                var a = K.getElementsByTagName("body")[0], b = q(D);
                b.setAttribute("type", G);
                var c = a.appendChild(b);
                if (c) {
                    var d = 0;
                    !function () {
                        if (typeof c.GetVariable != C) {
                            var e = c.GetVariable("$version");
                            e && (e = e.split(" ")[1].split(","), U.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)])
                        } else if (10 > d)return d++, void setTimeout(arguments.callee, 10);
                        a.removeChild(b), c = null, f()
                    }()
                } else f()
            }

            function f() {
                var a = O.length;
                if (a > 0)for (var b = 0; a > b; b++) {
                    var c = O[b].id, d = O[b].callbackFn, e = {success: !1, id: c};
                    if (U.pv[0] > 0) {
                        var f = p(c);
                        if (f)if (!s(O[b].swfVersion) || U.wk && U.wk < 312)if (O[b].expressInstall && h()) {
                            var k = {};
                            k.data = O[b].expressInstall, k.width = f.getAttribute("width") || "0", k.height = f.getAttribute("height") || "0", f.getAttribute("class") && (k.styleclass = f.getAttribute("class")), f.getAttribute("align") && (k.align = f.getAttribute("align"));
                            for (var l = {}, m = f.getElementsByTagName("param"), n = m.length, o = 0; n > o; o++)"movie" != m[o].getAttribute("name").toLowerCase() && (l[m[o].getAttribute("name")] = m[o].getAttribute("value"));
                            i(k, l, c, d)
                        } else j(f), d && d(e); else u(c, !0), d && (e.success = !0, e.ref = g(c), d(e))
                    } else if (u(c, !0), d) {
                        var q = g(c);
                        q && typeof q.SetVariable != C && (e.success = !0, e.ref = q), d(e)
                    }
                }
            }

            function g(a) {
                var b = null, c = p(a);
                if (c && "OBJECT" == c.nodeName)if (typeof c.SetVariable != C)b = c; else {
                    var d = c.getElementsByTagName(D)[0];
                    d && (b = d)
                }
                return b
            }

            function h() {
                return !S && s("6.0.65") && (U.win || U.mac) && !(U.wk && U.wk < 312)
            }

            function i(a, b, c, d) {
                S = !0, y = d || null, z = {success: !1, id: c};
                var e = p(c);
                if (e) {
                    "OBJECT" == e.nodeName ? (w = k(e), x = null) : (w = e, x = c), a.id = H, (typeof a.width == C || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) && (a.width = "310"), (typeof a.height == C || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) && (a.height = "137"), K.title = K.title.slice(0, 47) + " - Flash Player Installation";
                    var f = U.ie && U.win ? "ActiveX" : "PlugIn", g = "MMredirectURL=" + J.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + K.title;
                    if (typeof b.flashvars != C ? b.flashvars += "&" + g : b.flashvars = g, U.ie && U.win && 4 != e.readyState) {
                        var h = q("div");
                        c += "SWFObjectNew", h.setAttribute("id", c), e.parentNode.insertBefore(h, e), e.style.display = "none", function () {
                            4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                        }()
                    }
                    l(a, b, c)
                }
            }

            function j(a) {
                if (U.ie && U.win && 4 != a.readyState) {
                    var b = q("div");
                    a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(k(a), b), a.style.display = "none", function () {
                        4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                    }()
                } else a.parentNode.replaceChild(k(a), a)
            }

            function k(a) {
                var b = q("div");
                if (U.win && U.ie)b.innerHTML = a.innerHTML; else {
                    var c = a.getElementsByTagName(D)[0];
                    if (c) {
                        var d = c.childNodes;
                        if (d)for (var e = d.length, f = 0; e > f; f++)1 == d[f].nodeType && "PARAM" == d[f].nodeName || 8 == d[f].nodeType || b.appendChild(d[f].cloneNode(!0))
                    }
                }
                return b
            }

            function l(a, b, c) {
                var d, e = p(c);
                if (U.wk && U.wk < 312)return d;
                if (e)if (typeof a.id == C && (a.id = c), U.ie && U.win) {
                    var f = "";
                    for (var g in a)a[g] != Object.prototype[g] && ("data" == g.toLowerCase() ? b.movie = a[g] : "styleclass" == g.toLowerCase() ? f += ' class="' + a[g] + '"' : "classid" != g.toLowerCase() && (f += " " + g + '="' + a[g] + '"'));
                    var h = "";
                    for (var i in b)b[i] != Object.prototype[i] && (h += '<param name="' + i + '" value="' + b[i] + '" />');
                    e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>", P[P.length] = a.id, d = p(a.id)
                } else {
                    var j = q(D);
                    j.setAttribute("type", G);
                    for (var k in a)a[k] != Object.prototype[k] && ("styleclass" == k.toLowerCase() ? j.setAttribute("class", a[k]) : "classid" != k.toLowerCase() && j.setAttribute(k, a[k]));
                    for (var l in b)b[l] != Object.prototype[l] && "movie" != l.toLowerCase() && m(j, l, b[l]);
                    e.parentNode.replaceChild(j, e), d = j
                }
                return d
            }

            function m(a, b, c) {
                var d = q("param");
                d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
            }

            function n(a) {
                var b = p(a);
                b && "OBJECT" == b.nodeName && (U.ie && U.win ? (b.style.display = "none", function () {
                    4 == b.readyState ? o(a) : setTimeout(arguments.callee, 10)
                }()) : b.parentNode.removeChild(b))
            }

            function o(a) {
                var b = p(a);
                if (b) {
                    for (var c in b)"function" == typeof b[c] && (b[c] = null);
                    b.parentNode.removeChild(b)
                }
            }

            function p(a) {
                var b = null;
                try {
                    b = K.getElementById(a)
                } catch (c) {
                }
                return b
            }

            function q(a) {
                return K.createElement(a)
            }

            function r(a, b, c) {
                a.attachEvent(b, c), Q[Q.length] = [a, b, c]
            }

            function s(a) {
                var b = U.pv, c = a.split(".");
                return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
            }

            function t(a, b, c, d) {
                if (!U.ie || !U.mac) {
                    var e = K.getElementsByTagName("head")[0];
                    if (e) {
                        var f = c && "string" == typeof c ? c : "screen";
                        if (d && (A = null, B = null), !A || B != f) {
                            var g = q("style");
                            g.setAttribute("type", "text/css"), g.setAttribute("media", f), A = e.appendChild(g), U.ie && U.win && typeof K.styleSheets != C && K.styleSheets.length > 0 && (A = K.styleSheets[K.styleSheets.length - 1]), B = f
                        }
                        U.ie && U.win ? A && typeof A.addRule == D && A.addRule(a, b) : A && typeof K.createTextNode != C && A.appendChild(K.createTextNode(a + " {" + b + "}"))
                    }
                }
            }

            function u(a, b) {
                if (T) {
                    var c = b ? "visible" : "hidden";
                    R && p(a) ? p(a).style.visibility = c : t("#" + a, "visibility:" + c)
                }
            }

            function v(a) {
                var b = /[\\\"<>\.;]/, c = null != b.exec(a);
                return c && typeof encodeURIComponent != C ? encodeURIComponent(a) : a
            }

            var w, x, y, z, A, B, C = "undefined", D = "object", E = "Shockwave Flash", F = "ShockwaveFlash.ShockwaveFlash", G = "application/x-shockwave-flash", H = "SWFObjectExprInst", I = "onreadystatechange", J = window, K = document, L = navigator, M = !1, N = [d], O = [], P = [], Q = [], R = !1, S = !1, T = !0, U = function () {
                var a = typeof K.getElementById != C && typeof K.getElementsByTagName != C && typeof K.createElement != C, b = L.userAgent.toLowerCase(), c = L.platform.toLowerCase(), d = c ? /win/.test(c) : /win/.test(b), e = c ? /mac/.test(c) : /mac/.test(b), f = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, g = !1, h = [0, 0, 0], i = null;
                if (typeof L.plugins != C && typeof L.plugins[E] == D)i = L.plugins[E].description, !i || typeof L.mimeTypes != C && L.mimeTypes[G] && !L.mimeTypes[G].enabledPlugin || (M = !0, g = !1, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), h[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), h[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), h[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof J.ActiveXObject != C)try {
                    var j = new ActiveXObject(F);
                    j && (i = j.GetVariable("$version"), i && (g = !0, i = i.split(" ")[1].split(","), h = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]))
                } catch (k) {
                }
                return {w3: a, pv: h, wk: f, ie: g, win: d, mac: e}
            }();
            (function () {
                U.w3 && ((typeof K.readyState != C && "complete" == K.readyState || typeof K.readyState == C && (K.getElementsByTagName("body")[0] || K.body)) && a(), R || (typeof K.addEventListener != C && K.addEventListener("DOMContentLoaded", a, !1), U.ie && U.win && (K.attachEvent(I, function () {
                    "complete" == K.readyState && (K.detachEvent(I, arguments.callee), a())
                }), J == top && !function () {
                    if (!R) {
                        try {
                            K.documentElement.doScroll("left")
                        } catch (b) {
                            return void setTimeout(arguments.callee, 0)
                        }
                        a()
                    }
                }()), U.wk && !function () {
                    return R ? void 0 : /loaded|complete/.test(K.readyState) ? void a() : void setTimeout(arguments.callee, 0)
                }(), c(a)))
            })(), function () {
                U.ie && U.win && window.attachEvent("onunload", function () {
                    for (var a = Q.length, b = 0; a > b; b++)Q[b][0].detachEvent(Q[b][1], Q[b][2]);
                    for (var c = P.length, d = 0; c > d; d++)n(P[d]);
                    for (var e in U)U[e] = null;
                    U = null;
                    for (var f in swfobject)swfobject[f] = null;
                    swfobject = null
                })
            }();
            return {
                registerObject: function (a, b, c, d) {
                    if (U.w3 && a && b) {
                        var e = {};
                        e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, O[O.length] = e, u(a, !1)
                    } else d && d({success: !1, id: a})
                }, getObjectById: function (a) {
                    return U.w3 ? g(a) : void 0
                }, embedSWF: function (a, b, c, d, e, f, g, j, k, m) {
                    var n = {success: !1, id: b};
                    U.w3 && !(U.wk && U.wk < 312) && a && b && c && d && e ? (u(b, !1), function () {
                        c += "", d += "";
                        var o = {};
                        if (k && typeof k === D)for (var p in k)o[p] = k[p];
                        o.data = a, o.width = c, o.height = d;
                        var q = {};
                        if (j && typeof j === D)for (var r in j)q[r] = j[r];
                        if (g && typeof g === D)for (var t in g)typeof q.flashvars != C ? q.flashvars += "&" + t + "=" + g[t] : q.flashvars = t + "=" + g[t];
                        if (s(e)) {
                            var v = l(o, q, b);
                            o.id == b && u(b, !0), n.success = !0, n.ref = v
                        } else {
                            if (f && h())return o.data = f, void i(o, q, b, m);
                            u(b, !0)
                        }
                        m && m(n)
                    }()) : m && m(n)
                }, switchOffAutoHideShow: function () {
                    T = !1
                }, ua: U, getFlashPlayerVersion: function () {
                    return {major: U.pv[0], minor: U.pv[1], release: U.pv[2]}
                }, hasFlashPlayerVersion: s, createSWF: function (a, b, c) {
                    return U.w3 ? l(a, b, c) : void 0
                }, showExpressInstall: function (a, b, c, d) {
                    U.w3 && h() && i(a, b, c, d)
                }, removeSWF: function (a) {
                    U.w3 && n(a)
                }, createCSS: function (a, b, c, d) {
                    U.w3 && t(a, b, c, d)
                }, addDomLoadEvent: b, addLoadEvent: c, getQueryParamValue: function (a) {
                    var b = K.location.search || K.location.hash;
                    if (b) {
                        if (/\?/.test(b) && (b = b.split("?")[1]), null == a)return v(b);
                        for (var c = b.split("&"), d = 0; d < c.length; d++)if (c[d].substring(0, c[d].indexOf("=")) == a)return v(c[d].substring(c[d].indexOf("=") + 1))
                    }
                    return ""
                }, expressInstallCallback: function () {
                    if (S) {
                        var a = p(H);
                        a && w && (a.parentNode.replaceChild(w, a), x && (u(x, !0), U.ie && U.win && (w.style.display = "block")), y && y(z)), S = !1
                    }
                }
            }
        }()
    }()
}), youdao.define("core/namespace.js", function (a, b) {
    "use strict";
    !function () {
        var a = youdao = window.youdao || {};
        a.ns = function (a, b) {
            for (var c = null == b ? window : b, d = a.split("."), e = 0; e < d.length; e++)c[d[e]] || (c[d[e]] = {}), c = c[d[e]];
            return c
        }, a.require_module = function (a, b) {
            for (var c = null == b ? window : b, d = a.split("."), e = 0; e < d.length; e++) {
                if (!c[d[e]])throw new Error("required module not found: " + a);
                c = c[d[e]]
            }
            return c
        }, a.extend = function (b, c) {
            if (c) {
                var d = a.ns(b);
                for (var e in c)c.hasOwnProperty(e) && (d[e] = c[e]);
                return d
            }
        }
    }()
}), youdao.define("core/util.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = Object.prototype.toString, c = a._, d = {
            mode: document.compatMode, isString: function (a) {
                return "[object String]" === b.call(a)
            }, isFunction: function (a) {
                return "[object Function]" === b.call(a)
            }, isArray: function (a) {
                return "[object Array]" === b.call(a)
            }, isInArray: function (a, b) {
                var c;
                if (!this.isArray(a))return !1;
                for (c = 0; c < a.length; c++)if (a[c] == b)return !0;
                return !1
            }, delRepetitionArray: function (a) {
                for (var b = [a[0]], c = a.length, d = 1; c > d; d++) {
                    for (var e = !1, f = 0; f < b.length; f++)if (a[d] == b[f]) {
                        e = !0;
                        break
                    }
                    e || b.push(a[d])
                }
                return b
            }, isEmptyObject: function (a) {
                var b;
                for (b in a)if (a.hasOwnProperty(b))return !1;
                return !0
            }, getNumberLength: function (a) {
                return isNaN(a) ? 0 : (a = 0 > a ? -a : a, Math.floor(Math.log(a) / Math.log(10)) + 1)
            }, trim: function (a) {
                return (a || "").replace(/^\s+|\s+$/g, "")
            }, jsonToStr: function (a, b) {
                var c, d = [];
                b || (b = "&");
                for (c in a)a.hasOwnProperty(c) && d.push(c + "=" + a[c]);
                return d.join(b)
            }, comboParams: function (a) {
                var b, c = [];
                for (b in a)a.hasOwnProperty(b) && ("jsonp" === b ? c.unshift(b + "=" + encodeURIComponent(a[b])) : c.push(b + "=" + encodeURIComponent(a[b])));
                return c.push("t=" + +new Date), c.join("&")
            }, getModName: function (a) {
                if (d.isString(a)) {
                    var b = a.split(".");
                    return b[b.length - 1]
                }
            }, urlToJson: function (a, b) {
                var c, d, e = {}, f = a;
                for (b || (b = "&"), f = f.replace(/^[?]{1}|[#]{1}$/g, "").split(b), c = 0, d = f.length; d > c; c++) {
                    var g = f[c].split("=");
                    0 !== g[0].length && (e[g[0]] = 1 === g.length ? "" : g[1])
                }
                return e
            }, checkFlash: function () {
                var a, b, c = navigator.appVersion.indexOf("MSIE") >= 0, d = !0, e = [0, 0, 0];
                if (c)try {
                    a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a ? (b = a.GetVariable("$version"), b && (b = b.split(" ")[1].split(","), e = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)])) : d = !1
                } catch (f) {
                    d = !1
                } else a = navigator.plugins["Shockwave Flash"], a ? (b = a.description, b && (b = b.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), e[0] = parseInt(b.replace(/^(.*)\..*$/, "$1"), 10), e[1] = parseInt(b.replace(/^.*\.(.*)\s.*$/, "$1"), 10), e[2] = /[a-zA-Z]/.test(b) ? parseInt(b.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0)) : d = !1;
                return {hasFlash: d, version: e}
            }, getCoordsPosition: function (a) {
                var b, d, e, f, g, h, i, j, k = {};
                for (j = c.map(a, function (a) {
                    return 0 > a ? 0 : a
                }), b = e = parseInt(j[0], 10), d = f = parseInt(j[1], 10), i = 0; i < j.length; i += 2) {
                    var l = parseInt(j[i], 10), m = parseInt(j[i + 1], 10);
                    l > b && (b = l), e > l && (e = l), m > d && (d = m), f > m && (f = m)
                }
                return g = b - e, h = d - f, k.left = e, k.top = f, k.width = parseInt(g, 10), k.height = parseInt(h, 10), k
            }, setFtCode: function (a, b, c, d) {
                if (0 > b)return a;
                var e, f, g = [], h = a.split(""), f = Math.max(h.length, b);
                for (e = 0; f > e; e++)g.push(h[e] || 0);
                return g[b - 1] = d ? c : parseInt(g[b - 1], 10) + c, g.join("")
            }, filtraUrlFormat: function (b) {
                b.each(function () {
                    var b = a(this).attr("href");
                    if (-1 === b.indexOf("?")) {
                        var b = b.replace("&", "?");
                        a(this).attr("href", b)
                    }
                })
            }
        };
        a.extend("youdao.util", d)
    }(youdao)
}), youdao.define("core/module-manager.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = a.ns("youdao.module_manager"), c = a.require_module("youdao.util"), d = [], e = function (a) {
            return !1
        }, f = function (a) {
            return !1
        };
        b.regMods = function (a) {
            var b = 0;
            if (!c.isArray(a))return !1;
            for (l = a.length; b < l; b++)this.regMod(a[b])
        }, b.regMod = function (a) {
            a.sendModEvent || (a.sendModEvent = e), a.receiveModEvent || (a.receiveModEvent = f), d.push(a)
        }, b.disp = function (a) {
            var b;
            for (b = 0, l = d.length; b < l; b++)d[b].receiveModEvent(a)
        }
    }(youdao)
}), youdao.define("core/consts.js", function (a, b) {
    !function (a) {
        var b = {
            ajaxTimeout: 15,
            codeOfs: 88,
            updateUrl: location.protocol + "//zhushou.huihui.cn/",
            logUrl: location.protocol + "//zhushou.huihui.cn/log",
            logType: "ARMANI_EXTENSION_ACTION",
            mmUrl: "http://www.360buy.com/product/140007.html",
            pageUrl: encodeURIComponent(location.href),
            elemId: "youdaoGWZS",
            optionsID: "youdaoGWZS_options",
            subConsts: {
                firstHd: "����",
                listHd: "���ĵ���Ʒ�б�",
                successHd: "���ĳɹ�",
                successDes: "�����б�",
                editHd: "�޸Ķ�������",
                subFinishDescribe: "���ĳɹ�",
                unsubFinishDescribe: "��ȡ��",
                describe: "���ĵ���Ʒ",
                plugClass: "deprice",
                editFinishDescribe: "�޸ĳɹ�"
            },
            captureID: "youdaoGWZS_config",
            seID: "youdao_gouwu_assistant",
            serUrl: "productSense",
            collectAPIAdd: "api/myzhushou/collection/add",
            collectAPIRemove: "api/myzhushou/collection/delurls",
            csUrl: "api/zhushou/pricetrend.json",
            discountUrl: "discountInfo",
            updateSer: "productSense",
            baseCss: "https:" == location.protocol ? "https://shared-https.ydstatic.com/gouwuex/ext/css/extension_3_1_s.css?version=0.3.5&buildday=20_11_2015" : "http://shared.ydstatic.com/gouwuex/ext/css/extension_3_1.css?version=0.3.5&buildday=20_11_2015",
            baseUrl: location.protocol + "//zhushou.huihui.cn/",
            commonCssName: "",
            flashUrl: location.protocol + "//shared.ydstatic.com/gouwuex/images/extension_2_7/swf/",
            showTime: .2,
            commonName: "youdaoGWZS_",
            hoverUrl_test: "hoverHistory.js",
            commonCssName_test: "",
            basezIndex: 2147483647,
            globaCartURL: location.protocol + "//www.huihui.cn/global/",
            globaAddToCart: "addToCart",
            globaGetCartCount: "getCartCount",
            globaCartPage: "cart",
            globaCartAddToRecommend: "addToRecommend",
            fanyiAPI: "http://fanyi.youdao.com/"
        };
        a.extend("youdao.consts", b)
    }(youdao)
}), youdao.define("core/dom.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = a.require_module("youdao.util"), c = {
            addClass: function (a, c) {
                if (1 !== a.nodeType)return !1;
                for (var d = a.className ? b.trim(a.className).split(/\s+/g) : [], e = b.trim(c).split(/\s+/g), f = 0; f < e.length; f++)this.hasClass(a, e[f]) || d.push(e[f]);
                a.className = d.join(" ")
            }, removeClass: function (a, c) {
                if (1 !== a.nodeType)return !1;
                for (var d = b.trim(a.className), e = b.trim(c).split(/\s+/g), f = 0; f < e.length; f++)this.hasClass(a, e[f]) && (d = d.replace(e[f], " "));
                a.className = b.trim(d)
            }, hasClass: function (a, b) {
                return 1 !== a.nodeType ? !1 : -1 === (" " + a.className + " ").indexOf(" " + b + " ") ? !1 : !0
            }, getElementsByClass: function (a, b, c) {
                var d = a, e = b || "*", f = c || document;
                2 === arguments.length && (f = b || document, e = "*");
                for (var g = f.getElementsByTagName(e), h = [], i = 0, j = g.length; j > i; i++)this.hasClass(g[i], d) && h.push(g[i]);
                return h
            }, getStyle: function (a, b) {
                return a.attr ? a.style[b] : a.currentStyle ? a.currentStyle[b] : document.defaultView && document.defaultView.getComputedStyle ? (b = b.replace(/([A-Z])/g, "-$1").toLowerCase(), document.defaultView.getComputedStyle(a, null).getPropertyValue(b)) : ""
            }, outWidth: function (a) {
                for (var b = ["marginLeft", "paddingLeft", "width", "paddingRight", "marginRight"], c = 0, d = 0; d < b.length; d++)c += parseInt(this.getStyle(a, b[d]), 10);
                return c
            }, outHeight: function (a) {
                for (var b = ["marginTop", "paddingTot", "height", "paddingBottom", "marginBottom"], c = 0, d = 0; d < b.length; d++)c += parseInt(this.getStyle(a, b[d]), 10);
                return c
            }, pageX: function (a) {
                return a.offsetParent ? a.offsetLeft + c.pageX(a.offsetParent) : a.offsetLeft
            }, pageY: function (a) {
                return a.offsetParent ? a.offsetTop + c.pageY(a.offsetParent) : a.offsetTop
            }, builderFragment: function (a, b) {
                var c = document.createElement("div"), d = document.createDocumentFragment();
                c.innerHTML = a, function () {
                    c.firstChild ? (d.appendChild(c.firstChild), setTimeout(arguments.callee, 0)) : youdao.isFunction(b) && b(d)
                }()
            }, append: function (a, b, d, e) {
                var f = document.createElement(a);
                for (var g in b)f[g] = b[g];
                for (var g in d)f.style[g] = d[g];
                return e && (f.innerHTML = e), this.appendChild(f), f.append = c.append, f
            }
        };
        a.extend("youdao.dom", c)
    }(youdao)
}), youdao.define("core/event.js", function (a, b) {
    "use strict";
    !function (a) {
        function b(a, d, e) {
            if (a.addEventListener)a.addEventListener(d, e, !1); else {
                e.$$guid || (e.$$guid = b.guid++), a.events || (a.events = {});
                var f = a.events[d];
                f || (f = a.events[d] = {}, a["on" + d] && (f[0] = a["on" + d])), f[e.$$guid] = e, a["on" + d] = c
            }
        }

        function c(a) {
            var b = !0;
            a = a || d(((this.ownerDocument || this.document || this).parentWindow || window).event);
            var c = this.events[a.type];
            for (var e in c)this.$$handleEvent = c[e], this.$$handleEvent(a) === !1 && (b = !1);
            return b
        }

        function d(a) {
            return a.preventDefault = d.preventDefault, a.stopPropagation = d.stopPropagation, a
        }

        b.guid = 1, d.preventDefault = function () {
            this.returnValue = !1
        }, d.stopPropagation = function () {
            this.cancelBubble = !0
        };
        var e = {
            stopBubble: function (a) {
                a && a.stopPropagation ? a.stopPropagation() : window.event.cancelBubble = !0
            }, stopDefault: function (a) {
                return a && a.preventDefault ? a.preventDefault() : window.event.returnValue = !1, !1
            }, addEvent: function (a, b, c) {
                if (a) {
                    if (1 === a.nodeType || 9 === a.nodeType || a.document)return void this._addEvent(a, b, c);
                    for (var d = 0; d < a.length; d++)this._addEvent(a[d], b, c)
                }
            }, _addEvent: b
        };
        a.extend("youdao.event", e)
    }(youdao)
}), youdao.define("core/ajax.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = a.require_module("youdao.util"), c = a.require_module("youdao.consts"), d = a._, e = a.jQuery;
        a.ajax = function (a) {
            var e = "youdaogouwupi" + +new Date, f = a.params || {}, g = a.jsonp || "jsonp";
            f[g] = e;
            var h = a.url.indexOf("{$callback}");
            h > -1 && (a.url = a.url.replace("{$callback}", e));
            var i = null;
            window[e] = function (c) {
                window.clearTimeout(i), null === c ? b.isFunction(a.error) && a.error.call(a.context) : b.isFunction(a.success) && a.success.call(a.context, c)
            };
            var j = document.createElement("script"), k = d.once(function () {
                b.isFunction(a.error) && a.error.call(a.context)
            });
            j.type = "text/javascript";
            var l = (a.baseUrl || c.baseUrl) + a.url + (a.url.indexOf("?") > -1 ? "&" : "?") + b.comboParams(f);
            j.src = l.substr(0, 1900), j.charset = "utf-8", j.onerror = function () {
                k()
            }, document.getElementsByTagName("head")[0].appendChild(j);
            var m = function () {
                window[e] = function () {
                }, k()
            };
            i = window.setTimeout(m, 1e3 * c.ajaxTimeout)
        }, window.isInExtension && (a.ajax = function (a) {
            a.url = 0 == a.url.indexOf("http") ? a.url : (a.baseUrl || c.baseUrl) + a.url, a.data = a.params, e.ajax(a)
        })
    }(youdao)
}), youdao.define("core/animate.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = {
            Quad: {
                easeIn: function (a, b, c, d) {
                    return c * (a /= d) * a + b
                }, easeOut: function (a, b, c, d) {
                    return -c * (a /= d) * (a - 2) + b
                }, easeInOut: function (a, b, c, d) {
                    return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
                }, Line: function (a, b, c, d) {
                    return c * a / d + b
                }, Back: function (a, b, c, d) {
                    var e = 2.70158, f = c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b;
                    return f
                }
            }
        };
        a.addAnimate = function (b) {
            var c = a.require_module("youdao.cache");
            c.animate[b.elem] = c.animate[b.elem] || [];
            var d = c.animate[b.elem];
            d && 0 === d.length ? (d.push(b), a.runAnimate(b.elem)) : d.push(b)
        }, a.runAnimate = function (b) {
            var c = a.require_module("youdao.cache"), d = c.animate[b];
            if (0 !== d.length) {
                var e, f = d.shift();
                e = "body" === f.elem ? document.body : document.getElementById(f.elem), a.animate(e, f.attr, f.timer, f.atp, function () {
                    f.callback(), a.runAnimate.call(f.context, b)
                }, f.context)
            }
        }, a.animate = function (c, d, e, f, g, h) {
            function i() {
                r > n ? (c.style[d[0]] = Math.ceil(b.Quad[t](n, o, p, r)) + u, n += s) : (clearInterval(k), c.style[d[0]] = d[2] + u, l.isFunction(g) && g.call(h))
            }

            function j() {
                if (r > n) {
                    var a = Math.ceil(b.Quad[t](n, o, p, r));
                    c.style.opacity = a / 100, c.style.fiter = "alpha(opacity=" + a + ")", n += s
                } else clearInterval(k), c.style.opacity = d[2] / 100, c.style.filter = "alpha(opacity=" + d[2] + ")", l.isFunction(g) && g.call(h)
            }

            var k, l = a.require_module("youdao.util"), m = {
                vFast: 100,
                fast: 150,
                normal: 400,
                slow: 800
            }, n = 0, o = d[1], p = d[2] - d[1], q = 15, r = m[e] || e, s = Math.abs(Math.ceil(p / (r / q))), t = f || "Line", u = 4 === d.length ? d[3] : "%";
            k = "fade" === d[0] ? window.setInterval(j, q) : window.setInterval(i, q)
        }
    }(youdao)
}), youdao.define("core/cache.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = {};
        b.conf = {
            browser: "chrome",
            version: "2.0",
            apiVersion: "3.0",
            vendor: "youdao",
            position: "down",
            flag: 5,
            showLen: 0,
            showState: "open",
            searchData: "����������ҵ���Ʒ",
            similarTypeWords: "",
            taobao: !1,
            title: document.title,
            product: "product",
            isDiscountOpen: "open",
            isHoverHistoryOpen: "open",
            lastDiscountId: 0,
            lastDiscountTime: 0,
            popupFlag: 0,
            logTime: 2,
            fMaxNum: 1,
            tipFlag: 0
        }, b.dom = {
            body: document.body,
            elem: document.body
        }, b.animate = {}, b.nosyn = {}, b.fn = {}, a.extend("youdao.cache", b)
    }(youdao)
}), youdao.define("core/code.js", function (a, b) {
    !function (a) {
        var b = a.require_module("youdao.consts"), c = a.require_module("youdao.util"), d = {
            zero: ["0", "00", "000", "0000", "00000", "000000", "0000000", "00000000"],
            strReverse: function (a) {
                var b, c = [];
                for (b = 0, l = a.length; b < l; b++)c[c.length] = a.charAt(b);
                return c.reverse().join("")
            },
            encrypt: function (a, b, e) {
                var f, g = [];
                if (!c.isString(a))return "";
                for (f = 0, l = a.length; f < l; f++)g[g.length] = d.to(a.charCodeAt(f), b);
                return e ? d.strReverse(g.join("")) : g.join("")
            },
            to: function (a, c) {
                var e = "" + (a + b.codeOfs).toString(16), f = c - e.length;
                return f > 0 ? d.zero[f - 1] + e : e
            },
            decrypt: function (a, b, e) {
                if (!c.isString(a))return "";
                var f = [];
                e && (a = d.strReverse(a));
                for (var g = 0, h = 0; g < a.length; g += b, h++) {
                    var i = a.substring(g, g + b);
                    f[h] = d.tranFormat(i, b)
                }
                return String.fromCharCode.apply(String, f)
            },
            tranFormat: function (a, c) {
                return a.length !== c ? 0 : parseInt(a.replace(/^0+/g, ""), 16) - b.codeOfs
            },
            md5: function (a) {
                function b(a) {
                    return d(c(e(a)))
                }

                function c(a) {
                    return g(h(f(a), 8 * a.length))
                }

                function d(a) {
                    try {
                    } catch (b) {
                        p = 0
                    }
                    for (var c, d = p ? "0123456789ABCDEF" : "0123456789abcdef", e = "", f = 0; f < a.length; f++)c = a.charCodeAt(f), e += d.charAt(c >>> 4 & 15) + d.charAt(15 & c);
                    return e
                }

                function e(a) {
                    for (var b, c, d = "", e = -1; ++e < a.length;)b = a.charCodeAt(e), c = e + 1 < a.length ? a.charCodeAt(e + 1) : 0, b >= 55296 && 56319 >= b && c >= 56320 && 57343 >= c && (b = 65536 + ((1023 & b) << 10) + (1023 & c), e++), 127 >= b ? d += String.fromCharCode(b) : 2047 >= b ? d += String.fromCharCode(192 | b >>> 6 & 31, 128 | 63 & b) : 65535 >= b ? d += String.fromCharCode(224 | b >>> 12 & 15, 128 | b >>> 6 & 63, 128 | 63 & b) : 2097151 >= b && (d += String.fromCharCode(240 | b >>> 18 & 7, 128 | b >>> 12 & 63, 128 | b >>> 6 & 63, 128 | 63 & b));
                    return d
                }

                function f(a) {
                    for (var b = Array(a.length >> 2), c = 0; c < b.length; c++)b[c] = 0;
                    for (var c = 0; c < 8 * a.length; c += 8)b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << c % 32;
                    return b
                }

                function g(a) {
                    for (var b = "", c = 0; c < 32 * a.length; c += 8)b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
                    return b
                }

                function h(a, b) {
                    a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
                    for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
                        var h = c, i = d, o = e, p = f;
                        c = j(c, d, e, f, a[g + 0], 7, -680876936), f = j(f, c, d, e, a[g + 1], 12, -389564586), e = j(e, f, c, d, a[g + 2], 17, 606105819), d = j(d, e, f, c, a[g + 3], 22, -1044525330), c = j(c, d, e, f, a[g + 4], 7, -176418897), f = j(f, c, d, e, a[g + 5], 12, 1200080426), e = j(e, f, c, d, a[g + 6], 17, -1473231341), d = j(d, e, f, c, a[g + 7], 22, -45705983), c = j(c, d, e, f, a[g + 8], 7, 1770035416), f = j(f, c, d, e, a[g + 9], 12, -1958414417), e = j(e, f, c, d, a[g + 10], 17, -42063), d = j(d, e, f, c, a[g + 11], 22, -1990404162), c = j(c, d, e, f, a[g + 12], 7, 1804603682), f = j(f, c, d, e, a[g + 13], 12, -40341101), e = j(e, f, c, d, a[g + 14], 17, -1502002290), d = j(d, e, f, c, a[g + 15], 22, 1236535329), c = k(c, d, e, f, a[g + 1], 5, -165796510), f = k(f, c, d, e, a[g + 6], 9, -1069501632), e = k(e, f, c, d, a[g + 11], 14, 643717713), d = k(d, e, f, c, a[g + 0], 20, -373897302), c = k(c, d, e, f, a[g + 5], 5, -701558691), f = k(f, c, d, e, a[g + 10], 9, 38016083), e = k(e, f, c, d, a[g + 15], 14, -660478335), d = k(d, e, f, c, a[g + 4], 20, -405537848), c = k(c, d, e, f, a[g + 9], 5, 568446438), f = k(f, c, d, e, a[g + 14], 9, -1019803690), e = k(e, f, c, d, a[g + 3], 14, -187363961), d = k(d, e, f, c, a[g + 8], 20, 1163531501), c = k(c, d, e, f, a[g + 13], 5, -1444681467), f = k(f, c, d, e, a[g + 2], 9, -51403784), e = k(e, f, c, d, a[g + 7], 14, 1735328473), d = k(d, e, f, c, a[g + 12], 20, -1926607734), c = l(c, d, e, f, a[g + 5], 4, -378558), f = l(f, c, d, e, a[g + 8], 11, -2022574463), e = l(e, f, c, d, a[g + 11], 16, 1839030562), d = l(d, e, f, c, a[g + 14], 23, -35309556), c = l(c, d, e, f, a[g + 1], 4, -1530992060), f = l(f, c, d, e, a[g + 4], 11, 1272893353), e = l(e, f, c, d, a[g + 7], 16, -155497632), d = l(d, e, f, c, a[g + 10], 23, -1094730640), c = l(c, d, e, f, a[g + 13], 4, 681279174), f = l(f, c, d, e, a[g + 0], 11, -358537222), e = l(e, f, c, d, a[g + 3], 16, -722521979), d = l(d, e, f, c, a[g + 6], 23, 76029189), c = l(c, d, e, f, a[g + 9], 4, -640364487), f = l(f, c, d, e, a[g + 12], 11, -421815835), e = l(e, f, c, d, a[g + 15], 16, 530742520), d = l(d, e, f, c, a[g + 2], 23, -995338651), c = m(c, d, e, f, a[g + 0], 6, -198630844), f = m(f, c, d, e, a[g + 7], 10, 1126891415), e = m(e, f, c, d, a[g + 14], 15, -1416354905), d = m(d, e, f, c, a[g + 5], 21, -57434055), c = m(c, d, e, f, a[g + 12], 6, 1700485571), f = m(f, c, d, e, a[g + 3], 10, -1894986606), e = m(e, f, c, d, a[g + 10], 15, -1051523), d = m(d, e, f, c, a[g + 1], 21, -2054922799), c = m(c, d, e, f, a[g + 8], 6, 1873313359), f = m(f, c, d, e, a[g + 15], 10, -30611744), e = m(e, f, c, d, a[g + 6], 15, -1560198380), d = m(d, e, f, c, a[g + 13], 21, 1309151649), c = m(c, d, e, f, a[g + 4], 6, -145523070), f = m(f, c, d, e, a[g + 11], 10, -1120210379), e = m(e, f, c, d, a[g + 2], 15, 718787259), d = m(d, e, f, c, a[g + 9], 21, -343485551), c = n(c, h), d = n(d, i), e = n(e, o), f = n(f, p)
                    }
                    return Array(c, d, e, f)
                }

                function i(a, b, c, d, e, f) {
                    return n(o(n(n(b, a), n(d, f)), e), c)
                }

                function j(a, b, c, d, e, f, g) {
                    return i(b & c | ~b & d, a, b, e, f, g)
                }

                function k(a, b, c, d, e, f, g) {
                    return i(b & d | c & ~d, a, b, e, f, g)
                }

                function l(a, b, c, d, e, f, g) {
                    return i(b ^ c ^ d, a, b, e, f, g)
                }

                function m(a, b, c, d, e, f, g) {
                    return i(c ^ (b | ~d), a, b, e, f, g)
                }

                function n(a, b) {
                    var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
                    return d << 16 | 65535 & c
                }

                function o(a, b) {
                    return a << b | a >>> 32 - b
                }

                var p = 0;
                return b(a)
            }
        };
        a.extend("youdao.code", d)
    }(youdao)
}), youdao.define("core/share.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = "http://zhushou.huihui.cn/", c = "�ݻݹ������֣��Զ��ȼۣ��鿴��Ʒ�۸����ƣ����������ٿӵ���", d = "�Ҹ�������@�ݻݹ������֣����Զ�����Ʒҳ����ʾ׿Խ���������������̳Ǳ��ۣ���ʡǮ��ͦ�õ�", e = "2610228208", f = "", g = {
            shareTo: function (a, h, i, j, k, l) {
                var m = "";
                switch (a) {
                    case"netease":
                        m = g.shareToNetease(j ? j : b, h ? h : c, i ? i.replace(/@�ݻݹ�������/g, "#�ݻݹ�������#") : d.replace(/@�ݻݹ�������/g, "#�ݻݹ�������#"));
                        break;
                    case"qq":
                        m = g.shareToQQ(j ? j : b, h ? h : c, i ? i.replace(/@�ݻݹ�������/g, "@youdaogouwu") : d.replace(/@�ݻݹ�������/g, "@youdaogouwu"));
                        break;
                    case"sina":
                        m = g.shareToSina(j ? j : b, h ? h : c, i ? i : d, f, e, k, l);
                        break;
                    case"renren":
                        m = g.shareToRenren(j ? j : b, h ? h : c, i ? i : d);
                        break;
                    case"kaixin001":
                        m = g.shareToKaixin001(j ? j : b, h ? h : c, i ? i : d);
                        break;
                    case"qqzone":
                        m = g.shareToQQZone(j ? j : b, h ? h : c, i ? i : d);
                        break;
                    default:
                        return !1
                }
                return l ? m : !1
            }, shareToSina: function (a, b, c, d, e, f, h) {
                var i = "http://service.weibo.com/share/share.php";
                return i += "?url=" + encodeURIComponent(a) + "&title=" + encodeURIComponent(c) + "&ralateUid=" + d + "&appkey=" + e, i += f && f.length > 0 ? "&pic=" + encodeURIComponent(f) : "&pic=", i += "&searchPic=false", h ? i : void g.openShareWin(i, 700, 600)
            }, shareToRenren: function (a, b, c) {
                var d = "http://widget.renren.com/dialog/share";
                return d += "?resourceUrl=" + encodeURIComponent(a) + "&title=" + encodeURIComponent(b) + "&description=" + encodeURIComponent(c), isOpenNewTab ? d : void g.openShareWin(d, 700, 600)
            }, shareToKaixin001: function (a, b, c) {
                var d = "http://www.kaixin001.com/rest/records.php";
                return d += "?url=" + encodeURIComponent(a) + "&title=" + encodeURIComponent(b) + "&content=" + encodeURIComponent(c) + "&style=11", isOpenNewTab ? d : void g.openShareWin(d, 700, 600)
            }, shareToNetease: function (a, b, c) {
                var d = "http://t.163.com/article/user/checkLogin.do";
                return d += "?link=" + encodeURIComponent(a) + "&info=" + encodeURIComponent(c) + " " + encodeURIComponent(a) + "&source=" + encodeURIComponent(b) + "&" + (new Date).getTime(), isOpenNewTab ? d : void g.openShareWin(d, 700, 500)
            }, shareToQQ: function (a, b, c, d, e, f) {
                var h = "http://v.t.qq.com/share/share.php";
                return h += "?url=" + encodeURIComponent(a) + "&title=" + encodeURIComponent(c), isOpenNewTab ? h : void g.openShareWin(h, 700, 600)
            }, shareToQQZone: function (a, b, c) {
                var d = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
                return d += "?url=" + encodeURIComponent(a) + "&title=" + encodeURIComponent(b) + "&summary=" + encodeURIComponent(c), isOpenNewTab ? d : void g.openShareWin(d, 700, 600)
            }, openShareWin: function (a, b, c) {
                var d = (["resizable=yes", "width=" + b, "height=" + c, "location=no", "menubar=no", "status=no", "titlebar=no", "toolbar=no", "left=" + (window.screen.availWidth - b) / 2, "top=" + (window.screen.availHeight - c) / 2], window.open(a, "_blank"));
                d.focus()
            }
        };
        a.extend("youdao.share", g)
    }(youdao)
}), youdao.define("core/msg.js", function (a, b) {
    "use strict";
    !function (a) {
        var b = a._, c = [], d = {}, e = function (a) {
            this.name = a, this.listenList = [], this.index = c.length, this.self = this, c.push(this.self)
        };
        e.prototype = {
            send: function (a, b) {
                if (d[a] && 0 !== d[a].length) {
                    var c = d[a], e = 0, f = c.length;
                    for (e; f > e; e++)c[e].callback(b)
                }
            }, listen: function (a, c) {
                this.listenList.push({msg: a, callback: c}), d[a] || (d[a] = []);
                var e = b.bind(c, this.self);
                d[a].push({mod: this.self, callback: e})
            }, listens: function (a) {
                var b;
                if (a)for (b in a)a.hasOwnProperty(b) && this.listen(b, a[b])
            }
        }, a.reg = function (a) {
            return new e(a)
        }
    }(youdao)
}), youdao.define("core/localCapture.js", function (a, b) {
    var c = youdao, d = youdao._, e = c.require_module("youdao.util"), f = c.require_module("youdao.cache"), g = c.require_module("youdao.consts"), h = c.require_module("youdao.code"), i = {
        getSiteConf: function (a) {
            var b, c, d, e, f, g = document.URL, h = a;
            if (void 0 !== h) {
                e = a.rules, f = e.length;
                var i = [], j = [], k = a.ajaxs;
                for (c = 0; f > c; c += 1)if (d = e[c], b = new RegExp(d.url), b.test(g)) {
                    i = d.parsers, j = d.logs || [];
                    break
                }
                return {parsers: i, logs: j, ajaxs: k}
            }
        }, getResult: function (a) {
            var b, c, d = {}, e = {}, g = this, h = g.getSiteConf(a) || {}, i = h.parsers, j = h.ajaxs;
            if (!i)return d = null;
            for (b in i)if (i.hasOwnProperty(b)) {
                var k = this.getSelected(i[b]);
                d[b] = k.selected, e[b] = k.query
            }
            if (d.name || (d.name = document.title), ("failed" === d.stock || "" == d.stock) && (d.stock = "�޻�"), d.price && "failed" !== d.price && (d.price = d.price.replace("��", ",")), f.data && f.data.thisItem.price && (d.itemPrice = f.data.thisItem.price.toString()), f.data && f.data.thisItem.available && (d.itemAvailable = f.data.thisItem.available), f.data && f.data.priceHistoryOneYear) {
                var l = f.data.priceHistoryOneYear, m = /[0-9.]+(?='\/><\/store>)/g;
                d.latestPrice = l.match(m) ? l.match(m)[0] : ""
            }
            if (j) {
                g.hasAjaxData = !0;
                for (c in j)j.hasOwnProperty(c) && g.getAjaxValue(c, j[c], d)
            }
            return {result: d, resultQuerys: e}
        }, hasAjaxData: !1, checkAjaxData: function () {
            var a = this;
            setTimeout(function b() {
                a.ajaxResult ? (c.jQuery.extend(a.captureResult.result, a.ajaxResult.result), c.jQuery.extend(a.captureResult.resultQuerys, a.ajaxResult.resultQuerys), a.updateData(a.captureResult), c.extend("youdao.localCapture", i)) : setTimeout(b, 100)
            }, 100)
        }, logsInit: function (a) {
            var b = this, d = b.getSiteConf(a) || {}, e = d.logs;
            if (e && e.length)for (var f = 0, g = {click: "clkaction", hover: "hoverAction"}; e.length > f; f++) {
                var h = e[f], i = c.jQuery(h.selector);
                i && i.length > 0 && (i.attr(g[h.type], h.action), h.otherLogs && c._.forEach(h.otherLogs, function (a) {
                    i.attr("data-log-" + a.key, a.value)
                }))
            }
        }, diffCapture: function (a) {
            var b = f.data || {}, c = b.thisPrice || {};
            if (f.fn && f.fn.sendLog && e.isFunction(f.fn.sendLog)) {
                var d = document.createElement("div"), g = "LOG_DATA_CAPTURE_DIFF", h = "serverPrice=" + c.price;
                h += "&serverAvaiable=" + c.avaiable, h += "&captureAvaiable=" + a.avaiable, h += "&capturePrice=" + a.price, d.setAttribute("params", h), f.fn.sendLog(g, d, "ARMANI_EXTENSION_ACTION")
            }
        }, replaceTmpl: function (a, b, c) {
            return a.replace(/{\$(\d+)}/g, function (a, d) {
                return c[b[d]]
            })
        }, getAjaxValue: function (a, b, f) {
            var g = this, h = b.url, i = b.params, j = b.jsonpKey, k = b.dataType, l = this.replaceTmpl(h, i, f), m = {}, n = {};
            return "html" === k ? void c.jQuery.ajax({
                url: l, success: function (f) {
                    if (f && "www.amazon.cn" === document.domain) {
                        var h = {}, i = {}, j = [], k = [];
                        h.data = [], i.info_list = [];
                        var l = f.match(/<span\s+class="apl_type">\s*([^<\s]*)\s*<\/span>/g), o = f.match(/<span\s+class="apl_m_font">\s*(\S[^<]*\S)\s*<\/span>/g);
                        if (null !== l) {
                            c.jQuery.each(l, function (a, b) {
                                k.push(b.replace(/<span\s+class="apl_type">\s*([^<\s]*)\s*<\/span>/g, "$1"))
                            }), c.jQuery.each(o, function (a, b) {
                                j.push(b.replace(/<span\s+class="apl_m_font">\s*(\S[^<]*\S)\s*<\/span>/g, "$1"))
                            }), j = e.delRepetitionArray(j);
                            var p = d.zip(k, j);
                            return c.jQuery.each(p, function () {
                                var a = c.jQuery(this), b = {};
                                b.type = a[0] ? a[0] : null, b.desc = a[1] ? a[1] : null, i.info_list.push(b)
                            }), h.data.push(i), m[a] = h, n[a] = b, void(g.ajaxResult = {result: m, resultQuerys: n})
                        }
                    }
                    m[a] = "failed", n[a] = b, g.ajaxResult = {result: m, resultQuerys: n}
                }, error: function () {
                    m[a] = "failed", n[a] = b, g.ajaxResult = {result: m, resultQuerys: n}
                }
            }) : void(j ? c.ajax({
                baseUrl: " ", url: l, jsonp: j, success: function (c) {
                    c && (m[a] = b.result ? c[b.result] : c, n[a] = b, g.ajaxResult = {result: m, resultQuerys: n})
                }, error: function (c) {
                    m[a] = "failed", n[a] = b, g.ajaxResult = {result: m, resultQuerys: n}
                }
            }) : c.jQuery.ajax({
                url: l, success: function (c) {
                    if (c) {
                        var d = JSON.parse(c);
                        m[a] = b.result ? d[b.result] : d, n[b.result] = b, g.ajaxResult = {result: m, resultQuerys: n}
                    }
                }, error: function () {
                    m[a] = "failed", n[a] = b, g.ajaxResult = {result: m, resultQuerys: n}
                }
            }))
        }, getValue: function (a) {
            var b = a.pattern, d = a.group, e = a.selector, f = a.attr, g = a.type, h = a.status;
            if (h)return {selected: h, query: a};
            var i, j, k, l, m, n = "";
            if ("cookie" !== g && "url" !== g && 0 === c.jQuery(e).length)return {selected: "failed", query: a};
            if (f)j = c.jQuery(e).attr(f), i = j; else {
                if ("cookie" === g)k = document.cookie; else if ("url" === g)k = location.href; else {
                    var o = c.jQuery(e);
                    k = "html" === g ? o.html() : o.text(), elemDecoration = o.css("text-decoration"), elemDecoration.indexOf("line-through") >= 0 && (k = "")
                }
                i = k.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ")
            }
            return void 0 !== b ? (l = new RegExp(b, "i"), m = l.exec(i), null !== m && (n = m[void 0 === d ? 0 : d])) : n = i, {
                selected: n,
                query: a
            }
        }, getSelected: function (a) {
            var b;
            for (b = 0; b < a.length; b += 1) {
                var c = this.getValue(a[b]);
                if (c.selected && "failed" !== c.selected)break
            }
            return c || {}
        }, capture: function (a, b) {
            var c = this;
            return c.captureConf = a, b ? c.captureInit() : setTimeout(function () {
                c.captureInit()
            }, 3e3), c.captureResult
        }, captureInit: function () {
            var a, b = this;
            b.logsInit(b.captureConf), a = b.getResult(b.captureConf) || {}, b.captureResult = a, a.result && (b.diffCapture(a.result), b.hasAjaxData ? b.checkAjaxData() : b.updateData(a))
        }, updateData: function (a) {
            var b, c, d, e;
            if (d = f.conf, d.localCapture = JSON.stringify(a.result), e = unescape(d.localCapture.replace(/\\(u[0-9a-fA-F]{4})/gm, "%$1")), b = h.encrypt(e, 4, !0), c = h.encrypt(g.pageUrl, 2, !0), "null" !== d.localCapture) {
                document.getElementById("IFRAME_ZHUSHOU_POST") && document.body.removeChild(document.getElementById("IFRAME_ZHUSHOU_POST"));
                var i = document.createElement("iframe");
                formData = document.createElement("form"), inputZ = document.createElement("input"), inputU = document.createElement("input"), iframeDoc = null, i.id = "IFRAME_ZHUSHOU_POST", i.name = "IFRAME_ZHUSHOU_POST", i.style.display = "none", formData.id = "formData", formData.method = "POST", formData.action = location.protocol + "//zhushou.huihui.cn/api/data", inputZ.type = "text", inputZ.name = "z", inputZ.value = b, inputU.type = "text", inputU.name = "u", inputU.value = c, formData.appendChild(inputU), formData.appendChild(inputZ), document.body.appendChild(i), document.domain.indexOf("amazon.com") > -1 && (document.domain = "amazon.com"), document.domain.indexOf("6pm.com") > -1 && (document.domain = "6pm.com"), document.frames ? (i.src = "javascript:void((function(){var d=document;d.open();d.domain='" + document.domain + "';d.write('');d.close()})())", setTimeout(function () {
                    iframeDoc = document.getElementById("IFRAME_ZHUSHOU_POST").contentWindow.document, iframeDoc.body.appendChild(formData), iframeDoc.getElementById("formData").submit()
                }, 50)) : (iframeDoc = i.contentWindow.document, iframeDoc.body.appendChild(formData), iframeDoc.getElementById("formData").submit())
            }
        }
    };
    c.extend("youdao.localCapture", i)
}), youdao.define("modules/common/core.js", function (a, b) {
    "use strict";
    a("core/swfobject.js"), a("core/namespace.js"), a("core/util.js"), a("core/module-manager.js"), a("core/consts.js"), a("core/dom.js"), a("core/event.js"), a("core/ajax.js"), a("core/animate.js"), a("core/cache.js"), a("core/code.js"), a("core/share.js"), a("core/msg.js"), a("core/localCapture.js")
}), youdao.define("modules/collection/collection.html", function () {
    return ' <% var data = _container.myZhushouCollectData || {}; %>\n<% var noPlugin = (_container.pricePositionTag === undefined); %>\n<% var isHaitao = (_container.haitao !== undefined); %>\n<% var collected = data.collected; %>\n<li id="hui-collection" hui-type="hoverMod" class="hui-button-bar-wrapper collection-<%= collected ? "done" : "todo"%>\n    <%if (data.pageType === "ITEM" && !collected && noPlugin) {%>     hui-collection-not-in <%}%>"\n     hui-mod="collection">\n     <% if ( data.noticeNum > 0) { %>\n        <span class="hui-sp hui-sp-collection-number"><%= data.noticeNum %></span>\n     <% } %>\n     <a href="<%= data.url %>" target="_blank" class="hui-button-bar"\n         hoverAction="BAR_FAVOR_MOD_HOVER" clkAction="BAR_FAVOR_LINK_CLICK">\n        <span id="hui-my-collection-icon" class="hui-button-bar-tip"></span>\n        <span class="hui-button-bar-title" id="hui-my-collection-icon">�ҵ��ղ�</span>\n      </a>\n        <div class="hui-shopping-lightbox">\n           <div class="hui-shopping-lightbox-hd"></div>\n             <div class="hui-shopping-lightbox-bd">\n               <div class="hui-bar-collection-user"> \n                  <% if (_signin.data) { %>\n                    <div class="uname">\n                        hi<span class="hui-uname"><%= _signin.data.uname %></span>\n                    </div>\n                  <% } else { %>\n                    <a class="collection-user-login" href="http://zhushou.huihui.cn/myzhushou?keyfrom=zhushou_bar_favor_login"\n                       clkAction="BAR_FAVOR_SALE_CLICK"\n                       target="_blank" title="δ��¼">δ��¼</a>\n                  <% } %>\n                    <%if ( data.noticeNum > 0) {%>\n                    <div class="hui-bar-collection-prompt">\n                        <i class="hui-sp hui-icon-collec-prompt"></i>\n                        <a href="http://www.huihui.cn/myzhushou#home/msg/all-1" \n                        clkAction="BAR_FAVOR_LOGIN_CLICK" target="_blank">����<span><%= data.noticeNum %></span>���µĽ��۴�����Ϣ!</a>\n                    </div>\n                    <% } %>\n               </div>\n\n               <div class="hui-bar-collection-try-tip">\n                   <!-- û���ղصĵ�¼�û�չʾ�İ� -->\n                   <% if (!!_signin.data && ( !(data.collectionNum > 0) || data.historyNum === 0 ) ) { %>\n                     <i>����û���ղ��κ���ƷŶ��</i>\n                     <p>������������Ʒ�ղ������ɣ����۴�����ʱ���ѣ�</p>\n                     <% if (data.historyNum === 0) { %>\n                        <div class="hui-sp-collection-collect-tip"></div>\n                   <% } } %>\n\n                   <!-- û���ղص�δ��¼�û�չʾ�İ� -->\n                   <% if (!_signin.data && ( !(data.collectionNum > 0) || data.historyNum === 0 ) ) { %>\n                      <p>������������Ʒ�ղ������ɣ����۴�����ʱ���ѣ�</p>\n                      <!--�ڵ�Ʒҳ�棬չʾΪ�����ʷ-->\n                      <% if (data.historyNum === 0) { %>\n                        <div class="hui-sp-collection-collect-tip"></div>\n                   <% } } %>\n\n                   <% if (!(data.collectionNum > 0) && data.historyNum > 0) { %>\n                    <div class="hui-bar-collection-closet">\n                        <ul class="hui-bar-collection-closet-list hui-clearfix"></ul>\n                    </div>\n                    <% } %>\n               </div>\n\n\n               <!-- ���ղصĵ�¼�û�-->\n               <% if (data.collectionNum && data.collectionNum > 0 && data.historyNum !== 0) { %>\n               <!--�ڵ�Ʒҳ�棬����Ϊ��¼�����½-->\n               <div class="hui-bar-collection-closet">\n                   <p class="hui-bar-collection-closet-disc">\n                       <span>����ղص���Ʒ��</span>\n                   </p>\n                   <ul class="hui-bar-collection-closet-list hui-clearfix hui-collection-closet-list-positionfix"></ul>\n               </div>\n               <!--hui-bar-collection-closet-->\n                 <div class="hui-bar-collection-footer <% if (data && data.collected) {%> hui-collection-already <%}%>">\n                     <!--�ڵ�Ʒҳ�棬���ֲ鿴�����ղذ�ť-->\n                     <a class="hui-button hui-button-star hui-button-star-valid"\n                         clkAction="BAR_FAVOR_SUBED_CLICK"\n                         href="http://zhushou.huihui.cn/myzhushou" target="_blank">\n                         <span>�鿴�����ղ�</span>\n                     </a>\n                 </div>\n               <% } %>\n            </div>\n       </div>\n\n</li>\n'
}), youdao.define("modules/collection/successInCollection.html", function () {
    return ' <div id="YOUDAOGWZS_success_in_collection"\r\n    hui-type="light-box" hui-dialog="collection"\r\n    class="hui-box-setting hui-shopping-lightbox <%=(noRecommand && successData.installStatus ? "no-recommand-list" : "")%>" style="">\r\n    <div class="hui-shopping-lightbox-line"></div>\r\n        <div class="hui-shopping-lightbox-hd hui-color333 hui-fwb">\r\n        <span class="hui-close GWZS-setting" clkAction="DIALOG_FAVOR_CLOSE_CLICK">x</span>\r\n    </div>\r\n    <div class="hui-shopping-lightbox-bd">\r\n        <p class="hui-tips  ">\r\n            <span class="hui-sp hui-sp-success"></span>\r\n            �ɹ�����\r\n            <a class="hui-go-to-colletion-page" target="_blank"\r\n                href="http://zhushou.huihui.cn/myzhushou?keyfrom=zhushou_dialog_collection&suc=true" clkAction="PLUGIN_FAVOR_SUBED_CLICK">�ղؼ�</a>\r\n        </p>\r\n        <div class="hui-paragraph">\r\n            <span class="hui-paragraph-inform">��Ʒ�۸���� <span class="hui-expect-price-value"><%= exceptPrice %></span><%= priceUnit %> ��֪ͨ��</span>\r\n            <span class="hui-paragraph-price-change">\r\n                <a class="hui-target-price-change-page" href="javascript:void(0);" hui-price-change-offsetX="-206" hui-price-change-offsetY="26">�޸Ľ�����������>></a>\r\n            </span>\r\n        </div>\r\n        <!--��װ���ֻ�app �������Ƽ�-->\r\n        <%if (!noRecommand && successData.installStatus) {%>\r\n            <p class="hui-recon-reson">�ղظ���Ʒ�Ļ�ϲ����</p>\r\n            <ul class="hui-content">\r\n                <% for (var i = 0; i < subList.length ; i ++) { %>\r\n                <li>\r\n                    <% if (subList[i].temptType === "BRAND") { %>\r\n                        <!--Ʒ������-->\r\n                        <a class="sales-wrapper" target="_blank"\r\n                            href="<%= subList[i].url %>" title="<%= subList[i].title %>"  clkAction="DIALOG_FAVOR_RECITEM_CLICK">\r\n                            <div class="sales-image-wrapper">\r\n                                <img src="<%= subList[i].imgUrl %>" alt="<%= subList[i].title %>" />\r\n                            </div>\r\n                            <p class="sales-title">\r\n                                <span>\r\n                                    <%= subList[i].title %>\r\n                                </span>\r\n                            </p>\r\n                            <p><span class="sales-discount"><%= subList[i].brandDiscountInfo%></span>��</p>\r\n                        </a>\r\n                    <% } else { %>\r\n                    <!--��ƷͼƬ + ���� -->\r\n                    <div class="image-wrapper">\r\n                       <a href="<%= subList[i].url %>" target="_blank"\r\n                            title="<%= subList[i].title %>"  clkAction="DIALOG_FAVOR_RECITEM_CLICK">\r\n                            <img src="<%= subList[i].imgUrl %>" alt="<%= subList[i].title %>"/>\r\n                        </a>\r\n                        <% if (subList[i].showTip) { %>\r\n                            <i class="hui-new-sp tip-<%= subList[i].temptType%>">�Ѵﵽ</i>\r\n                        <% } %>\r\n                    </div>\r\n                    <div class="content-wrapper">\r\n                        <p class="hui-recommand-price">\r\n                            <% if (subList[i].temptType === "DISCOUNT") { %>\r\n                                <% if (subList[i].lowest) { %>\r\n                                    <i class="hui-lowest hui-new-sp"></i>\r\n                                <% } else { %>\r\n                                    <i class="hui-fall hui-new-sp"></i>\r\n                                <% } %>\r\n                            <% } %>\r\n                                <span class="hui-recommand-current-price"><%= subList[i].price %><%=subList[i].priceUnit%></span>\r\n                                <% if (subList[i].discountRate !== 10 && subList[i].temptType === "DISCOUNT") { %>\r\n                                    <span class="hui-recommand-origin-price">\r\n                                        <em><%= subList[i].maxPrice %></em><%=subList[i].priceUnit%>\r\n                                    </span>\r\n                                <% } %>\r\n                                <% if (subList[i].temptType === "ITEMCF") { %>\r\n                                <span class="hui-read"><%= subList[i].covisitNum%>�˻���</span>\r\n                                <% } %>\r\n                        </p>\r\n                    </div>\r\n                    <% } %>\r\n                </li>\r\n                <% } %>\r\n            </ul><!--չʾ�Ƽ�����installStatusΪtrueʱ������װapp-->\r\n            <% } %>\r\n            <!--û�а�װ�ֻ�app, ��ʹ���Ƽ�Ҳ����-->\r\n            <%if (!successData.installStatus) {%>\r\n                <p class="hui-app-disc">����һ������װ�ֻ��棬����֪ͨ����ʱ��</p>\r\n                <div class="hui-app-info">\r\n                    <div class="app-promote-qrcode">\r\n                        <img src="http://shared.ydstatic.com/gouwuex/images/zsqrcode.png" alt="ɨ��ά������" />\r\n                    </div>\r\n                    <div class="app-promote-install">\r\n                        <a class="android" clkAction="DIALOG_FAVOR_DOWNLOAD_ANDROID_CLICK" href="<%= successData.android_url %>" target="_blank" title="Android������">Android������</a>\r\n                        <a class="iphone" clkAction="DIALOG_FAVOR_DOWNLOAD_IPHONE_CLICK" href="<%= successData.ios_url %>" target="_blank" title="iPhone������">iPhone������</a>\r\n                    </div>\r\n                </div>\r\n                <p class="hui-app-tips">ʹ��΢�� or ΢��ɨ���ά��</p>\r\n            <% } %>\r\n    </div>\r\n</div>\r\n';
}), youdao.define("modules/collection/pluginSuccessPop.html", function () {
    return ' <div id="hui_plugin_success_in_collection">\r\n    <span>�ɹ����뵽<a href="http://zhushou.huihui.cn/myzhushou" target="_black">�ҵ��ղ�</a>�����������ѣ�</span>\r\n    <a class="hui-target-price-change-page" href="javascript:void(0);" hui-price-change-offsetx="-246" hui-price-change-offsety="26">���ý�������</a>\r\n</div>'
}), youdao.define("modules/collection/cancelPop.html", function () {
    return ' <div id="hui-popup-collection-cancel-dialog" class="hui-btn-cancel" hui-dialog="collection">\r\n    <i class="hui-new-sp"></i>\r\n    <span>��ȡ��</span>\r\n</div>\r\n'
}), youdao.define("modules/collection/changeExpectPrice.html", function () {
    return ' <div id="hui-dialog-collection-change-except" class="youdaoGWZS_dr_remind" style="display: block;">\r\n    <div class="youdaoGWZS_dr_dialog-hd">\r\n        <span>\r\n            ��������\r\n        </span>\r\n        <a href="javascript:void(0)"\r\n            clkaction="REVERSE_EMAIL_DIALOG_CLOSE"\r\n            class="youdaoGWZS_dr_close youdaoGWZS_dr_close_box -close"> </a>\r\n    </div>\r\n    <div class="youdaoGWZS_dr_dialog-bd">\r\n        <div class="deprice-shops-setting -deprice-shops-setting">\r\n            <span>�����̼ң�</span>\r\n            <ul>\r\n                <li>\r\n                    <input type="radio" name="deprice-shops" id="deprice-shops-recommend" value="recommended" checked/>\r\n                    <label class="label-title" for="deprice-shops-recommend">�Ƽ��̼�</label>\r\n                </li>\r\n                <li class="hui-deprice-only-shops">\r\n                    <input type="radio" name="deprice-shops" id="deprice-shops-current" value="current"/>\r\n                    <label class="label-title" for="deprice-shops-current">����ǰ�̼�</label>\r\n                </li>\r\n                <li>\r\n                    <input type="radio" name="deprice-shops" id="deprice-shops-all" value="all" />\r\n                    <label class="label-title" for="deprice-shops-all">ȫ���̼�</label>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class="deprice-email-setting" style="position: relative">\r\n            <label for="deprice-email-setting-input"\r\n                class="emailTitle label-title">Ŀ��۸�</label>\r\n            <div class="youdaoGWZS_expect_price_r">\r\n                <input type="text" name="youdaoGWZS_change_ExpectPrice"\r\n                id="change-expect-price-input" class="text-input "\r\n                value="" placeholder="Ŀ��۸�" >\r\n            </div>\r\n            <div class="youdaoGWZS_expect_price_tips"><b>*</b>����д��Ч��ֵ</div>\r\n        </div>\r\n    </div>\r\n    <div class="youdaoGWZS_dr_dialog-ft">\r\n        <a href="javascript:void(0)"\r\n            clkaction="REVERSE_EMAIL_DIALOG_SUBMIT"\r\n            class="-submit">ȷ��</a>\r\n    </div>\r\n    <div class="youdaoGWZS_dr_dialog-fragments">\r\n        <a href="javascript:void(0)" class="-recommend-shops-lists-toggle recommend-shops-lists-toggle hui-sp"></a>\r\n        <div class="recommend-shops-lists-wrapper -recommend-shops-wrapper">\r\n            <p>���������̼ң�����Ӫ����</p>\r\n            <ul class="recommend-shops-lists -recommend-shops-lists">\r\n            </ul>\r\n            <i class="recommend-shops-arrow hui-sp"></i>\r\n        </div>\r\n    </div>\r\n</div>\r\n'
}), youdao.define("modules/collection/changeExpectPrice.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.require_module("youdao.cache"), e = c.require_module("youdao.consts"), f = (c.require_module("youdao.util"), c.require_module("youdao.code")), g = (e.commonName, c._, c.jQuery), h = (a("modules/collection/changeExpectPrice.html"), {
        _checkPriceRange: function () {
            var a, b, c, e = d.data.thisPrice || {}, f = e.price || 0;
            return c = f.toString().indexOf("-"), b = c > 0 ? f.toString().slice(0, c) : f, a = b > 10 ? b - 1 : b > .1 ? Math.round(100 * (b - .1)) / 100 : b ? 9999 : ""
        }, lastSelectedShop: "recommended", setSelectedSites: function () {
            g(".-deprice-shops-setting input[value='" + this.lastSelectedShop + "']").attr("checked", !0)
        }, renderRecommendSites: function () {
            c.ajax({
                url: "api/myzhushou/collection/pricehub/recommendedSites", success: function (a) {
                    if (a && a.list) {
                        for (var b = "", c = a.list, d = 0; d < c.length; d++)b += "<li>" + c[d].name + "</li>";
                        g(".-recommend-shops-lists").html(b)
                    }
                }
            })
        }
    });
    return g(document).delegate(".-recommend-shops-lists-toggle", "mouseenter", function () {
        var a = g(".-recommend-shops-wrapper");
        a.show()
    }), g(document).delegate(".-recommend-shops-lists-toggle", "mouseleave", function () {
        var a = g(".-recommend-shops-wrapper");
        a.hide()
    }), g(document).delegate(".youdaoGWZS_dr_dialog-hd a", "click", function (a) {
        g("#hui-dialog-collection-change-except").remove()
    }), g(document).delegate(".youdaoGWZS_dr_dialog-ft a", "click", function (a) {
        var b = h._checkPriceRange(), i = g("#change-expect-price-input").val(), j = /^[0-9]+.?[0-9]*$/, k = g(".-deprice-shops-setting input:checked").val();
        if (j.test(i) && b >= i) {
            var l = {add: "setitem", grt: "queryitem"}, m = {m: f.encrypt(e.pageUrl, 2, !0), type: k, expect: i};
            h.lastSelectedShop = k, m.clusterId = 0, d.data.clsuter && d.data.clsuter.clusterId && (m.clusterId = d.data.clsuter.clusterId);
            var n = {
                url: "api/myzhushou/collection/pricehub/" + l.add, params: m, success: function (a) {
                    g("#hui-dialog-collection-change-except").remove(), g("#YOUDAOGWZS_success_in_collection .hui-expect-price-value").html(i)
                }
            };
            c.ajax(n)
        } else g(".youdaoGWZS_expect_price_tips").css({display: "block"})
    }), h
}), youdao.define("modules/collection/successPop.js", function (require, exports) {
    "use strict";
    var yd = youdao, cache = yd.require_module("youdao.cache"), consts = yd.require_module("youdao.consts"), util = yd.require_module("youdao.util"), localCapture = yd.require_module("youdao.localCapture"), name = consts.commonName, _ = yd._, $ = yd.jQuery, tmpl = require("modules/collection/collection.html"), mod = yd.mod, name = "comment", successPop = require("modules/collection/successInCollection.html"), pluginSuccessPop = require("modules/collection/pluginSuccessPop.html"), cancelPop = require("modules/collection/cancelPop.html"), changeExpectPricebox = require("modules/collection/changeExpectPrice.html"), changeExpectPrice = require("modules/collection/changeExpectPrice.js"), conf = {
        classes: {},
        selectors: {
            addBoxQ: "#YOUDAOGWZS_success_in_collection",
            removeBoxQ: "#hui-popup-collection-cancel-dialog",
            closeBtn: ".hui-close"
        }
    }, isIE6 = $.browser.msie && "6.0" === $.browser.version, collection = {
        _checkPriceRange: function () {
            var a, b, c, d = cache.data.thisPrice || {}, e = d.price || 0;
            return c = e.toString().indexOf("-"), b = c > 0 ? e.toString().slice(0, c) : e, a = b > 10 ? b - 1 : b > .1 ? Math.round(100 * (b - .1)) / 100 : b ? 9999 : ""
        }, hoverData: function () {
            var $myCollection = $(".hui-collection-closet-list-positionfix"), $myCollectionList = $(".hui-collection-closet-list-positionfix > *"), locationHref = window.location.href, json = {
                baseUrl: consts.baseUrl,
                url: "api/myzhushou/hoverData",
                params: {mmurl: locationHref},
                success: function (data) {
                    window.isInExtension && !_.isObject(data) && (data = eval("(" + data + ")"));
                    var historyData = data.myZhushouHoverData;
                    if (historyData.collections && historyData.collections.length > 0) {
                        for (var historyCont = "", i = 0; i < historyData.collections.length; i++) {
                            "" === historyData.collections[i].img && (historyData.collections[i].img = defaultImg);
                            var activityInfor = "";
                            historyData.collections[i].promotionInfo && (activityInfor = '<span class="hui-collection-sub-jiang"></span>'), historyData.collections[i].atLowerPrice && (activityInfor = '<span class="hui-collection-sub-cu"></span>'), historyCont += "<li><a href=" + historyData.collections[i].url + ' title="' + historyData.collections[i].title + '"clkAction="BAR_FAVOR_ITEM_CLICK" target="_blank"><img src="' + historyData.collections[i].img + '" alt="' + historyData.collections[i].title + '" data-origin="zhushou" />' + activityInfor + "</a></li>"
                        }
                        if (historyData.collections.length < 3)for (var i = 0; i < 3 - historyData.collections.length; i++)historyCont += '<li><span class="hui-collection-under"></span></li>';
                        $myCollection.html(historyCont)
                    }
                }
            };
            yd.ajax(json)
        }, renderBox: function (a, b, c) {
            if (0 === $(conf.selectors.addBoxQ).length || !$(conf.selectors.removeBoxQ).length) {
                collection.hoverData();
                var d;
                if ("remove" === a)return $("#hui_plugin_success_in_collection").length && $("#hui_plugin_success_in_collection").remove(), void setTimeout(function () {
                    d = $(cancelPop), collection.paintBox(d, b)
                }, 300);
                var e = {}, f = cache.data.recmdinfo || {}, g = f.itemList || [];
                g.length;
                e.subList = g.slice(g.length - 3), _.each(e.subList, function (a, b) {
                    var c = a.type, d = a.brandActiveInfo;
                    if (d) {
                        var e = d.match(/(?:\s*)[0-9.-]*/);
                        a.brandDiscountInfo = e.length && e[0] || a.brandActiveInfo
                    }
                    var f = c.split("_");
                    f.length > 0 && (a.temptType = f[0], "DISCOUNT" === a.temptType && a.lowest && (a.showTip = !0))
                }), e.noRecommand = 0 === e.subList.length, e.successData = c, e.exceptPrice = collection._checkPriceRange();
                var h = cache.data.thisPrice || {};
                e.priceUnit = h.priceunit || "Ԫ", d = $(_.template(successPop, e)), collection.paintBox(d, b)
            }
        }, paintBox: function (a, b) {
            a.css({position: "absolute", left: b.offsetX, top: b.offsetY}), a.appendTo("body")
        }, removeBox: function (a) {
            $(conf.selectors[a + "BoxQ"]).remove()
        }, pluginRenderBox: function (a) {
            if ((0 === $(conf.selectors.addBoxQ).length || !$(conf.selectors.removeBoxQ).length) && (collection.hoverData(), "add" === a)) {
                var b = localCapture.captureResult.result.image;
                if (console.log(b), b) {
                    var c = document.getElementById("hui-plugin-collection").getBoundingClientRect(), d = c.left, e = c.top, f = c.top + 130, g = document.getElementById("hui-my-collection-icon").getBoundingClientRect(), h = g.left - 5, i = g.top - 5, j = "http://shared.ydstatic.com/gouwuex/images/extension_3_1/hui_transition_star.png";
                    $("body").append('<img id="hui-transition-item" src="' + b + '"></img><img id="hui-transition-start" src="' + j + '"></img>'), $("#hui-transition-item").css({
                        position: "fixed",
                        left: d,
                        top: e
                    }), $("#hui-transition-item").animate({top: f}, 400).animate({
                        left: h,
                        top: i
                    }, 900).animate({opacity: .1}, 700, function () {
                        $(this).remove(), setTimeout(function () {
                            var a = document.getElementById("hui-my-collection-icon").getBoundingClientRect(), b = a.left + 3, c = a.top + 2, d = c - 56;
                            $("#hui-transition-start").css({
                                position: "fixed",
                                display: "block",
                                left: b,
                                top: c
                            }), $("#hui-transition-start").css({
                                display: "block",
                                opacity: .1
                            }), setTimeout(function () {
                                $("#hui-transition-start").animate({opacity: .9}, 750).animate({opacity: 0}, 750).animate({opacity: .9}, 750).animate({opacity: .1}, 750).animate({opacity: .8}, 700).animate({
                                    opacity: .1,
                                    top: d
                                }, 600, function () {
                                    $(this).remove()
                                })
                            }, 50)
                        }, 50)
                    })
                }
                if (0 == $("#hui_plugin_success_in_collection").length) {
                    var k = $(pluginSuccessPop);
                    "6pm" == cache.data.thisSite.siteName && k.addClass("success-6pm"), k.insertAfter("#hui-plugin")
                }
            }
        }
    };
    return $(document).delegate(".hui-target-price-change-page", "click", function (a) {
        var b = $(this), c = collection._checkPriceRange();
        if (0 == $("#hui-dialog-collection-change-except").length) {
            var d = $(".hui-target-price-change-page"), e = (changeExpectPrice._checkPriceRange(), {
                offsetX: d.offset().left + parseInt(b.attr("hui-price-change-offsetX"), 10),
                offsetY: d.offset().top + parseInt(b.attr("hui-price-change-offsetY"), 10)
            });
            $("body").append(changeExpectPricebox), changeExpectPrice.setSelectedSites(), changeExpectPrice.renderRecommendSites(), $("#change-expect-price-input").val(c), $("#hui-dialog-collection-change-except").css({
                position: "absolute",
                left: e.offsetX,
                top: e.offsetY
            });
            var f = !0, g = cache.data.clsuter.clusterId;
            (0 == g || void 0 == g) && (f = !1), f || ($(".youdaoGWZS_dr_dialog-bd ul li:not(.hui-deprice-only-shops), .youdaoGWZS_dr_dialog-fragments ").css("display", "none"), $(".hui-deprice-only-shops input").attr("checked", "checked"))
        }
    }), collection
}), youdao.define("modules/collection/collection.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = a("modules/collection/collection.html"), g = c.require_module("youdao.consts"), h = c.require_module("youdao.cache"), i = c.require_module("youdao.util"), j = c.require_module("youdao.localCapture"), k = (h.localConf || {}, c.reg("collection")), l = c.mod, m = "collection";
    l[m] = {
        template: f, event: function (a) {
            r(a)
        }
    };
    var n = a("modules/collection/successPop.js"), o = {
        selectors: {
            collectInBtn: ".hui-collection-collected",
            myCollectionBtn: ".hui-collection-my-btn",
            addCollectBtn: ".hui-collection-no-collect",
            collectionDialogQ: '[hui-dialog="collection"]'
        }, toggleClassName: "hui-collection-not-in", flagClass: "hui-add-collect-clicked"
    }, p = function (a, b) {
        b || (b = "ARMANI_EXTENSION_ACTION"), setTimeout(function () {
            if (h.fn && h.fn.sendLog && i.isFunction(h.fn.sendLog)) {
                var c = document.createElement("div");
                h.fn.sendLog(a, c, b)
            }
        }, 300)
    }, q = function () {
        var a, b;
        if (h.data.data) {
            var c = j.capture(h.data.data, !0) || {}, d = c.result;
            d.image && (a = d.image || ""), d.name && (b = d.name || "")
        }
        var e;
        e = h.data.thisPrice ? h.data.thisPrice.price : h.data.thisItem.price;
        var f = h.data.priceHistoryTip.style, g = h.data.thisItem.available, i = 0;
        h.data && h.data.clsuter.clusterId && (i = h.data.clsuter.clusterId);
        var k;
        k = a && b ? {
            url: encodeURIComponent(location.href),
            price: e,
            imgUrl: encodeURIComponent(a) || "",
            title: b,
            priceTrend: f,
            isAvailable: g,
            clusterId: i
        } : {url: encodeURIComponent(location.href), price: encodeURIComponent(e), clusterId: i};
        var l = h.data && h.data.myZhushouCollectData && !!h.data.myZhushouCollectData.md5;
        return l && (k.allmd5 = h.data.myZhushouCollectData.md5), k
    }, r = function (a) {
        function b(a) {
            if (a && !(d(o.selectors.collectionDialogQ).length > 0)) {
                var b = d.noop, f = a.type || "add";
                if ("function" == typeof a)b = a; else {
                    e.isFunction(a.cb) && (b = a.cb);
                    var i = a.source
                }
                var j = q(), l = function (b) {
                    "plugIn" === i ? n.pluginRenderBox(f) : n.renderBox(f, a.boxOffset, b), "remove" === f ? setTimeout(function () {
                        n.removeBox(f), k.send("collection-" + f)
                    }, 1e3) : k.send("collection-" + f)
                }, m = "add" === f ? g.collectAPIAdd : g.collectAPIRemove, p = {
                    url: m,
                    params: j,
                    context: self,
                    success: l,
                    error: function () {
                    }
                }, r = h.data.HuiData || {};
                if (c.ajax(p), !r.uid) {
                    var s = "http://zhushou.huihui.cn/myzhushou?keyfrom=zhushou_collection";
                    d(o.selectors.addCollectBtn).attr({
                        href: s,
                        target: "_blank"
                    }), d(o.selectors.addCollectBtn).addClass(o.flagClass)
                }
            }
        }

        var f = h && h.data && h.data.myZhushouCollectData && h.data.myZhushouCollectData.noticeNum;
        0 !== f && p("POPUP_MSG_FAVOR_NUM", "ARMANI_EXTENSION_POPUP");
        var j = d("#" + g.optionsID);
        k.listen("collectionWelcomeTip", function () {
            var a = h.data && h.data.HuiData && h.data.HuiData.uid, b = h.localConf.closedBefore, c = h.data && h.data.myZhushouCollectData && h.data.myZhushouCollectData.jifenUrl, e = (h.data && h.data.myZhushouCollectData && h.data.myZhushouCollectData.used, h.data.enableHaitao);
            if (!("noLoginUserClosed" === b && void 0 === a || parseInt(b) === a || void 0 === c || e)) {
                var f = d("#hui-collection-new-user-guide");
                f.find(".hui-link").attr("href", c), p("POPUP_FAVOR_NEWTIPS_TRIGGER", "ARMANI_EXTENSION_POPUP"), f.show()
            }
        }), k.listen("closeCollectionWelcome", function () {
            var a = h.data && h.data.HuiData && h.data.HuiData.uid;
            void 0 === a && (a = "noLoginUserClosed"), h.localConf.closedBefore = a, j.length > 0 && h.localConf && j.html(i.jsonToStr(h.localConf, ";"))
        }), k.listen("collection", b), k.listen("collection-add", function () {
            d(".hui-bar-collection-footer", a).addClass("hui-collection-already"), d(".history-collection-wrapper").addClass("hui-collection-already")
        }), k.listen("collection-remove", function () {
            d(".hui-bar-collection-footer", a).removeClass("hui-collection-already"), d(".history-collection-wrapper").removeClass("hui-collection-already")
        }), d(document).delegate('[hui-type="hui-collect"]', "click", function (a) {
            var b, c = d(this), e = d("#hui-plugin-logo"), f = d("#hui-plugin-bijia"), g = d("#hui-plugin-history"), h = d("#GWZS-sidebar-collection"), i = d("#GWZS-sidebar-down-collection"), j = {source: c.attr("hui-collection-source")}, l = c.attr("hui-collection-source");
            "bar" === l && (b = c), "plugin" === l && (b = e), "sidebar" === l && (b = h), "sidebar-down" === l && (b = i), j.boxOffset = {
                offsetX: b.offset().left + parseInt(c.attr("hui-collection-offsetX"), 10),
                offsetY: b.offset().top + parseInt(c.attr("hui-collection-offsetY"), 10)
            }, "PLUGIN_FAVOR_UNSUB_CLICK" == c.attr("clkaction") && (g.hasClass("hui-plugin-history") && (j.boxOffset.offsetX += 68), f.hasClass("hui-price-compare") && (j.boxOffset.offsetX += 115));
            var m = d("body").width();
            "sidebar" !== l && "sidebar-down" !== l && j.boxOffset.offsetX > m - 380 && (j.boxOffset.offsetX = m - 380 - 100), d(this).hasClass("hui-collection-collected") || d(this).hasClass("hui-sidebar-collected") || d(this).hasClass("hui-sidebar-down-collected") ? (j.type = "remove", j.boxOffset.offsetY += 100) : j.type = "add", k.send("collection", j)
        }), d(document).delegate('[hui-type="hui-plugin-collect"]', "click", function (a) {
            var b = {source: "plugIn"};
            d(this).hasClass("hui-collection-collected") ? b.type = "remove" : b.type = "add", k.send("collection", b)
        })
    }
}), youdao.define("modules/comment/comment.html", function () {
    return ' <li hui-mod="comment" hui-type="hoverMod" class="hui-shopping-comment hui-fz12">\n<a class="hui-sp hui-sp11" target="_blank"\n    clkaction="BAR_REVIEWTAG_MOD_CLICK"\n    href="<%= _comment.urlPrefix %>#review">\n        <span class="hui-icon-cont"><em class="hui-sp hui-sp7"></em></span><br />\n        ������<em class="hui-shopping-lh"><%=_comment.badReviewRate%></em>\n    </a>\n    <div class="hui-shopping-lightbox">\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n            <span class="hui-sp hui-sp42"></span>�û�����</div>\n        <div class="hui-review-tags">\n            <div class="hui-tags-hd">\n            <em class="hui-rate"><%=_comment.score%></em>\n            <span class="debug-hui-sp1 hui-star">\n                <span class="debug-hui-sp1 hui-star-b" style="width: <%=_comment.score * 20%>%;"></span>\n            </span>\n            ����<em class="hui-count"><%=_comment.badCount%></em>��\n            <span>(��<%=_comment.total%>������)</span>\n            </div>\n            <div class="hui-tags-bd">\n                <% if (_comment.negativeTags) {%>\n                <div class="hui-tags-bad hui-clearfix">\n                    <% _.each(_comment.negativeTags, function (val) { %>\n                    <a class="hui-tags-item debug-hui-sp"\n                        href="<%= _comment.urlPrefix %>&review_tag=<%= encodeURIComponent(val.param) %>#review"\n                        clkAction="BAR_REVIEWTAG_NEGATIVE_CLICK" target="_blank"\n                        title="�鿴�ᵽ<%=val.name%>�Ĳ���"><%=val.name.substr(0, 10)%><span class="debug-hui-sp">��<%=val.count%>��</span><em>����</em></a>\n                    <% }) %>\n                </div>\n                <% } %>\n                <% if (_comment.positiveTags) {%>\n                <div class="hui-tags-good hui-clearfix">\n                    <% _.each(_comment.positiveTags, function (val) { %>\n                    <a class="hui-tags-item debug-hui-sp"\n                        href="<%= _comment.urlPrefix %>&review_tag=<%= encodeURIComponent(val.param) %>#review"\n                        clkAction="BAR_REVIEWTAG_POSITIVE_CLICK" target="_blank"\n                        title="�鿴�ᵽ<%=val.name%>�ĺ���"><%=val.name.substr(0, 10)%><span class="debug-hui-sp">��<%=val.count%>��</span><em>����</em></a>\n                    <% }) %>\n                </div>\n                <% } %>\n            </div>\n        </div>\n        <% if (_comment.badSamples) { %>\n        <div class="hui-review-comment">\n            <h3>��������:</h3>\n            <ul class="hui-review-comment-list">\n                <% _.each(_comment.badSamples, function (val, num) { %>\n                <% if (num > 2) { return; }%>\n                <li class="hui-review-comment-item">��<%=val.data%></li>\n                <% })%>\n                <li class="hui-review-comment-item item-last">�� ...\n                <a class="hui-review-comment-more" clkAction="BAR_REVIEWTAG_SEEMORE" href="<%=_comment.urlPrefix%>#review" title="�������" target="_blank">�������>></a>\n                </li>\n            </ul>\n        </div>\n        <% } %>\n    </div>\n</li>\n'
}), youdao.define("modules/comment/comment.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/comment/comment.html")), e = c.mod, f = "comment";
    e[f] = {
        template: d, event: function (a) {
        }
    }
}), youdao.define("modules/container/container.html", function () {
    return ' <div hui-mod="container" class="hui-shoppingtool\n    <% if (_container.code === "110000") { %>\n            hui-shopping-min\n    <% } %>\n    <% if (_container.ishide || _container.isBlack) { %>\n            hui-shopping-ghost\n    <% } %>\n    <% if (!_container.isShowHaitaoBarButton && _container.code === "110000") { %>\n            hui-shopping-not-onekey\n    <% } %>\n    <% if (_container.isBlack) { %>\n            hui-shopping-black\n    <% } %>\n    ">\n    <!--�ڵ���վֻ���Żݵ��򣬲���������-->\n    <% if (!_container.ishide) { %>\n    <!--�������style������style 100% !impotant����Ϊ��������ѷ������ѷ��tableǿ��������widthΪauto-->\n    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100% !important;">\n        <tbody>\n            <tr>\n                <% _taosimilar = undefined %>\n                <% _signin = _container.huisignup || {}%>\n                <% _huiContent = _container.huiContentData || {}%>\n                <% if (_container.sameType && _container.sameType.items &&  _container.sameType.items.length ) { %>\n                    <% _taosimilar = _container.sameType %>\n                <% } %>\n                <td class="hui-shopping-nav <%= _taosimilar ? "hui-shopping-nav-taosimilar" : ""%>">\n                    <ul>\n                        ##parse("logo")\n                        <% if (!_container.isBlack) { %>\n                            <!-- һ������ -->\n                            <% if (_container.isShowHaitaoBarButton) { %>\n                                ##parse("onekey")\n                            <% } %>\n                            <!-- ��ͬ�� -->\n                            <% if (_taosimilar) { %>\n                                ##parse("taosimilar")\n                            <% } else { %>\n                                <% _userName = _container.HuiData ? (_container.HuiData.uname ? _container.HuiData.uname : "") : "" %>\n                                <!-- ֵ���� -->\n                                ##parse("huiContent")\n                                <!-- �ҵ��ղ� -->\n                                ##parse("collection")\n                            <%}%>\n                        <% }else{ %>\n                            <li class="hui-button-bar-wrapper hui-txt-link"><a class="" href="http://www.huihui.cn/news/30092353" target="_blank">�Ա�û�бȼ���ô��</a></li>\n                        <% } %>\n                        <% if (!_taosimilar && (_container.priceHistory || _container.priceHistoryTip ))  { %>\n                        <% } %>\n                    </ul>\n                </td>\n                <% if (!_container.isBlack) { %>\n                <td hui-type="midBox" class="hui-shopping-cont">\n\n                    <ul hui-type="shop-ext" class="hui-shopping-ext">\n\n                        ##parse("faq")\n                    <% if (_container.douban) { %>\n                        <% _douban = _container.douban %>\n                        ##parse("douban")\n                    <% } %>\n\n                    <% if (_container.recmdinfo) { %>\n                        <%  _container.recmdinfo.show = true %>\n                        <% if (!_container.recmdinfo.show) { %>\n                            <% _recommand= _container.recmdinfo;  %>\n                            ##parse("recommand")\n                        <% } %>\n                    <% } %>\n\n                    <% if (_container.reviewTags) { %>\n                        <% _comment = _container.reviewTags %>\n                        ##parse("comment")\n                    <% } %>\n\n                    <% if (_container.priceHistory) { %>\n                        <% _pricestate = {data: _container.priceHistoryTip, tip: _container.isHisLowest} %>\n                        <% _pricestate.defXml = _container.priceHistory %>\n                        <% _pricestate.yearXml = _container.priceHistoryOneYear %>\n                        ##parse("pricestate")\n                    <% } %>\n\n                    </ul>\n\n                    <% if (_container.shopList && _container.shopList.length ) { %>\n                        <% _csprice = _container.shopList %>\n                        ##parse("csprice")\n                    <% } else if (_container.urlPriceList && _container.urlPriceList.length && !_taosimilar) { %>\n                    <% _price = { list: _container.urlPriceList, tip: _container.hasLower } %>\n                    <% _price.more = _container.detailUrl %>\n                        ##parse("price")\n                    <% } else if (_container.priceHistoryTip && !_taosimilar && _container.priceHistoryTip.long ) { %>\n                        <% _historyInfo = _container.priceHistoryTip %>\n                        ##parse("historyInfo")\n                    <% } %>\n                </td>\n                <% }else{ %>\n                <% if (_container.priceHistory) { %>\n                <% _pricestate = {data: _container.priceHistoryTip, tip: _container.isHisLowest} %>\n                <% _pricestate.defXml = _container.priceHistory %>\n                <% _pricestate.yearXml = _container.priceHistoryOneYear %>\n                <% } %>\n                <%}%>\n                <td class="hui-sp hui-sp4">\n                    <a hui-type="switch" clkaction="BAR_CLOSE_CLICK"\n                    data-log-status="<%= _container.code === "110000" ? "LEFTHALF" : "FULL" %>"\n                    class="hui-sp hui-sp5" hidefocus="true" href="#"></a>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <% _functionTips =  _container.functionTip || {}%>\n    <% if (_container.priceHistory) { %>\n        <% _functionTips.funcPriceTrendData =  _container.priceHistoryTip %>\n    <% } %>\n    <% if (_container.urlPriceList && _container.urlPriceList.length) { %>\n        <% _functionTips.funcLowData =  _container.urlPriceList[0] %>\n        <% if (_functionTips.funcLowData.items && _functionTips.funcLowData.items.length) { %>\n        <% } %>\n    <% } %>\n        ##parse("functionTips")\n    <% _shoppingTips =  _container.shoppingTip || {}%>\n    <% if (_container.shoppingTip) { %>\n        ##parse("shoppingTips")\n    <% } %>\n<% } %>\n    <% if (_container.pop) { %>\n        <% _discount = _container.pop %>\n        ##parse("discount")\n    <% } %>\n</div>\n'
}), youdao.define("modules/container/container.js", function (require, exports) {
    "use strict";
    var yd = youdao, cache = yd.require_module("youdao.cache"), consts = yd.require_module("youdao.consts"), util = yd.require_module("youdao.util"), msg = yd.reg("recommand"), $ = yd.jQuery, _ = yd._, tmpl = require("modules/container/container.html"), mod = yd.mod, name = "container";
    mod[name] = {
        template: tmpl, event: function ($mod) {
            var q = {
                switchBtn: '[hui-type="switch"]',
                onekeyMod: '[hui-mod="onekey"]',
                collectionMod: '[hui-mod="collection"]',
                hoverMod: '[hui-type="hoverMod"] ,',
                minBox: 'td[hui-type="midBox"]',
                ext: 'ul[hui-type="shop-ext"]',
                lightBox: "div.hui-shopping-lightbox",
                browseHistory: ".hui-collection-closet-list-positionfix",
                defaultImg: "http://shared.ydstatic.com/gouwuex/images/extension_3_1/collection_under.png"
            }, activeCss = "hui-active", rightCss = "hui-active-right", $hoverBtn, timer;
            $mod.delegate(q.switchBtn, "click", function (a) {
                a.preventDefault();
                var b = "hui-minishoppingtool";
                $mod.toggleClass(b), $mod.hasClass(b) ? $(q.switchBtn).attr("clkaction", "BAR_CLOSE_CLICK") : $(q.switchBtn).attr("clkaction", "BAR_EXPAND_CLICK")
            }).delegate(q.hoverMod, "mouseenter", function (a) {
                var b = $(this);
                return clearTimeout(this.timer), "hui-onekey" == b.attr("id") && cache.data && cache.data.isShowHaitaoDiscountTip && !cache.data.isShowHaitaoBarTip ? !1 : void(this.timer = setTimeout(function () {
                    if (b.attr("hui-mod-wrapper-name")) {
                        var a = b.attr("hui-mod-wrapper-name");
                        b = b.closest("[hui-mod-wrapper='" + a + "']")
                    }
                    b.addClass(activeCss);
                    var c = b.find(q.lightBox), d = c.offset(), e = d ? d.left : 0, f = e + c.width();
                    f > $(window).width() && b.addClass(rightCss), $mod.sMsg({
                        type: "enter-mod",
                        $elem: b,
                        hoverCSS: activeCss
                    })
                }, 100))
            }).delegate(q.hoverMod, "mouseleave", function (a) {
                var b = $(this);
                clearTimeout(this.timer), this.timer = setTimeout(function () {
                    if ("logo" !== b.attr("hui-mod")) {
                        if (b.attr("hui-mod-wrapper-name")) {
                            var a = b.attr("hui-mod-wrapper-name");
                            b = b.closest("[hui-mod-wrapper='" + a + "']")
                        }
                        b.removeClass(activeCss), b.removeClass(rightCss), $mod.sMsg({
                            type: "leave-mod",
                            $elem: b,
                            hoverCSS: activeCss
                        })
                    }
                }, 100)
            }), $mod.delegate(q.collectionMod, "mouseenter", function (e) {
                var myZsData = cache.data.myZhushouCollectData, isLogin = !1;
                if (cache.data && cache.data.huisignup && (isLogin = !0), myZsData.collectionNum > 0) {
                    var $myCollection = $(".hui-collection-closet-list-positionfix"), $myCollectionList = $(".hui-collection-closet-list-positionfix > *");
                    if (0 === $myCollectionList.length) {
                        var locationHref = window.location.href, json = {
                            baseUrl: consts.baseUrl,
                            url: "api/myzhushou/hoverData",
                            params: {mmurl: locationHref},
                            success: function (data) {
                                window.isInExtension && !_.isObject(data) && (data = eval("(" + data + ")"));
                                var historyData = data.myZhushouHoverData;
                                if (historyData.collections && historyData.collections.length > 0) {
                                    for (var historyCont = "", i = 0; i < historyData.collections.length; i++) {
                                        "" === historyData.collections[i].img && (historyData.collections[i].img = q.defaultImg);
                                        var activityInfor = "";
                                        historyData.collections[i].promotionInfo && (activityInfor = '<span class="hui-collection-sub-jiang"></span>'), historyData.collections[i].atLowerPrice && (activityInfor = '<span class="hui-collection-sub-cu"></span>'), historyCont += "<li><a href=" + historyData.collections[i].url + ' title="' + historyData.collections[i].title + '"clkAction="BAR_FAVOR_ITEM_CLICK" target="_blank"><div class="hui-collection-img-wrap"><img src="' + historyData.collections[i].img + '" alt="' + historyData.collections[i].title + '" data-origin="zhushou" />' + activityInfor + "</div></a></li>"
                                    }
                                    if (historyData.collections.length < 3)for (var i = 0; i < 3 - historyData.collections.length; i++)historyCont += '<li><span class="hui-collection-under"></span></li>';
                                    $myCollection.append(historyCont)
                                }
                            }
                        };
                        yd.ajax(json)
                    }
                }
                if (0 === myZsData.collectionNum && myZsData.historyNum > 0) {
                    var $myHistory = $(".hui-bar-collection-closet-list"), $myHistoryList = $(".hui-bar-collection-closet-list > *");
                    if (0 === $myHistoryList.length) {
                        var locationHref = window.location.href, json = {
                            baseUrl: consts.baseUrl,
                            url: "api/myzhushou/hoverData",
                            params: {mmurl: locationHref},
                            success: function (a) {
                                var b = a.myZhushouHoverData;
                                if (b.browsingHistoryData && b.browsingHistoryData.length > 0) {
                                    for (var c = "", d = 0; d < b.browsingHistoryData.length; d++) {
                                        "" === b.browsingHistoryData[d].img && (b.browsingHistoryData[d].img = q.defaultImg);
                                        c += '<li><a href="' + b.browsingHistoryData[d].url + '" title="' + b.browsingHistoryData[d].title + '"clkAction="BAR_FAVOR_ITEM_CLICK" target="_blank"><img src="' + b.browsingHistoryData[d].img + '" alt="' + b.browsingHistoryData[d].title + '" data-origin="zhushou" /></a></li>'
                                    }
                                    $myHistory.append(c)
                                }
                            }
                        };
                        yd.ajax(json)
                    }
                }
            }), $mod.lMsg("render", function (a) {
                if ("reset" === a.type) {
                    $mod.sMsg({type: "hide"});
                    var b = $mod.find(q.ext).width(), c = $mod.find(q.minBox).width() - b;
                    $mod.sMsg({type: "priceWrapWidth", width: c})
                }
            })
        }
    }
}), youdao.define("modules/csprice/csprice.html", function () {
    return ' <ul hui-mod="csprice" class="hui-shopping-csext hui-fr hui-fz12">\n    <% _.each(_csprice, function (item, num) { %>\n\n    <li hui-type="hoverMod" class="hui-shopping-cs\n            <% if (item.isDiscount) {%>\n            hui-cs-all\n            <% } %>\n    ">\n    <a class="hui-cs-item hui-sp hui-sp11"\n    <% if (item.isDiscount) { %>\n            hoverAction="BAR_CS_SALE_MOD_HOVER" clkAction="BAR_CS_SALE_MOD_CLICK"\n    <% } else if (num === 0) { %>\n            hoverAction="BAR_CS_ALL_MOD_HOVER" clkAction="BAR_CS_ALL_MOD_CLICK"\n    <% } else { %>\n            hoverAction="BAR_CS_B2C_MOD_HOVER" clkAction="BAR_CS_B2C_MOD_CLICK"\n    <% } %>\n        target="_blank" href="<%=item.moreurl%>">\n            <%=item.siteName%>\n            <% if (item.isDiscount) {%>\n            ���<span class="hui-fwb hui-shopping-lh"><%=item.lowestDiscount%></span>\n            <% } else { %>\n                <% if (num === 0) { %>\n                <span class="hui-fwb hui-shopping-lh"><%=item.resultNum%>��</span>\n                <% } %>\n            <% } %>\n        </a>\n        <div class="hui-shopping-lightbox">\n                <div class="hui-shopping-lightbox-hd"></div>\n                <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n                    <span class="hui-sp hui-sp42"></span><%=item.siteName%></div>\n                        <div id="youdaoGWZSSubList">\n            <ul class="hui-item-list hui-clearfix">\n                <% _.each(item.items, function (one, key) { %>\n                <% if (key > 2) return; %>\n                <li class="\n                <% if (key === 2) { %>\n                    hui-item-list-last\n                <% } %>\n                ">\n                    <div class="hui-item-thumb">\n                        <% if (one.isHistoricLowest) { %>\n                        <span class="hui-icon-lszd"></span>\n                        <% } %>\n                        <a target="_blank" \n    <% if (item.isDiscount) { %>\n    hoverAction="BAR_CS_SALE_ITEM_HOVER" clkAction="BAR_CS_SALE_ITEM_CLICK"\n    <% } else if (num === 0) { %>\n    hoverAction="BAR_CS_ALL_ITEM_HOVER" clkAction="BAR_CS_ALL_ITEM_CLICK"\n    <% } else { %>\n    hoverAction="BAR_CS_B2C_ITEM_HOVER" clkAction="BAR_CS_B2C_ITEM_CLICK"\n    <% } %>\n                             href="<%=one.url %>" title="<%=one.name%>" data-log-position="IMG">\n                             \n                            <img src="<%=one.imgUrl %>" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-item-detail">\n                        <a target="_blank"\n    <% if (item.isDiscount) { %>\n    hoverAction="BAR_CS_SALE_ITEM_HOVER" clkAction="BAR_CS_SALE_ITEM_CLICK"\n    <% } else if (num === 0) { %>\n    hoverAction="BAR_CS_ALL_ITEM_HOVER" clkAction="BAR_CS_ALL_ITEM_CLICK"\n    <% } else { %>\n    hoverAction="BAR_CS_B2C_ITEM_HOVER" clkAction="BAR_CS_B2C_ITEM_CLICK"\n    <% } %>\n                            href="<%=one.url %>" title="<%=one.name%>" data-log-position="TITLE">\n                            <%=one.title%>\n                        </a>\n                        <p class="hui-fwb hui-shopping-lh">\n                        <%=one.price%>Ԫ\n                        </p>\n                        <% if (one.discount) { %>\n                        <div class="hui-item-discount hui-sp hui-sp20"><%=one.discount%>��</div>\n                        <% } %>\n                    </div>\n                </li>\n                <% }); %>\n            </ul>\n            <div class="hui-item-ft">\n                <a class="hui-color999" \n                <% if (item.isDiscount) {%>\n                clkAction="BAR_CS_SALE_MORE_CLICK"\n                <% } else if (num === 0) { %>\n                clkAction="BAR_CS_ALL_MORE_CLICK"\n                <% } else { %>\n                clkAction="BAR_CS_B2C_MORE_CLICK"\n                <% } %>\n                    target="_blank" href="<%=item.moreurl %>">ȥ������<span class="hui-sp hui-sp16"></span></a>\n            </div>\n        </div>\n        </div>\n    </li>\n    <% }); %>\n</ul>\n';
}), youdao.define("modules/csprice/csprice.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/csprice/csprice.html")), e = c.mod, f = "csprice";
    e[f] = {
        template: d, event: function (a) {
            var b = a.find('li[hui-type="hoverMod"]'), c = function (c) {
                var d = c.width;
                0 >= d && a.css("display", "none"), a.show(), b.show();
                var e = b.length;
                if (!(a.width() < d))for (; e > 0 && a.width() > d;)b.eq(--e).css("display", "none")
            }, d = function () {
                a.hide()
            }, e = function (a) {
                var b = {priceWrapWidth: c, hide: d};
                b[a.type] && b[a.type](a)
            };
            a.lMsg("container", e)
        }
    }
}), youdao.define("modules/discount/discount.html", function () {
    return ' <div id="GWZS-discountInfo" hui-mod="discount"\n    class="GWZS-discount-info -discount-info hui-shopping-lightbox">\n    <div class="hui-shopping-lightbox-hd"> </div>\n    <div class="hui-discount-hd">\n        <h3>�ݻݹ������� - </h3>\n        <% if (_discount.isRecmd) { %>\n        <h4>����ϲ�����Ż�</h4>\n        <% } else { %>\n        <h4>�Ż�ʵʱ��</h4>\n        <% } %>\n        <a href="javascript:void(0)"\n            class="discount-info-close -Dinfo-close"\n            clkaction="DISCOUNT_INFO_CLOSE" title="�ر�">\n            �ر�</a>\n    </div>\n    <div class="hui-discount-bd">\n        <iframe style="width: 100%; height: 100%;"\n            scrolling="no" marginwidth="0" marginheight="0" \n            frameborder="0" vspace="0" hspace="0" \n            class="-Dinfo-iframe" id="-Dinfo-iframe"></iframe>\n    </div>\n    <div class="hui-discount-ft">\n        <a href="#setting" title="����" onclick="return false"\n            clkaction="POPUP_DEAL_DISCOUNT_SETTING_CLICK"\n            class="GWZS-setting -Dinfo-setting -chrome-open-set">\n            ����</a>\n        <a class="hui-sp hui-discount-suggest" title="�������" \n            href="http://zhushou.huihui.cn/suggest" \n            clkAction="POPUP_DEAL_DISCOUNT_SUGGEST_CLICK" \n            target="_blank">�������</a>\n    </div>\n</div>\n'
}), youdao.define("modules/discount/confirm.html", function () {
    return ' <div class="hui-line"></div>\n<div class="hui-confirm-hd">\n    <span>�����Ż�����</span>\n    <div id="youdaoGWZS_discountClose" class="-cm-close"></div>\n</div>\n<div class="youdaoGWZS_dis_content">\n    <div class="youdaoGWZS_dis_first">\n        �ݻݹ�������Ϊ����ѡȫ���ֵ���Ż���Ϣ��\n        ������������û���!\n    </div>\n    <div class="youdaoGWZS_dis_second">\n        �����԰��Ż���������Ϊ\n    </div>\n    <div class="youdaoGWZS_dis_third">\n        <input id="youdaoGWZS_openBt" type="radio"\n        name="discountConf" value = "����"\n        clkAction="POPUP_DEAL_DISCOUNT_ENABLE_CLICK" class="-cm-openBt">\n        <label for="youdaoGWZS_openBt">����</label>\n        <input id="youdaoGWZS_closeBt" type="radio"\n        name="discountConf"  value = "�ر�"\n        clkAction="POPUP_DEAL_DISCOUNT_DISABLE_CLICK" class="-cm-closeBt">\n        <label for="youdaoGWZS_closeBt">�ر�</label>\n    </div>\n    <div class="youdaoGWZS_dis_fourth">\n        <a href="javascript:void(0);" id="youdaoGWZS_confirmDiscountBtn"\n            class="hui-old-sp1 hui-confirm-btn -cm-confirm">ȷ&nbsp;&nbsp; ��</a>\n    </div>\n    <div style="clear:both"></div>\n</div>\n'
}), youdao.define("modules/discount/discount.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.require_module("youdao.consts"), e = c.require_module("youdao.cache"), f = c.require_module("youdao.util"), g = (c.require_module("youdao.dom"), c.jQuery), h = c._, i = a("modules/discount/discount.html"), j = a("modules/discount/confirm.html"), k = c.mod, l = "discount";
    k[l] = {
        template: i, event: function (a) {
            a.sMsg({
                type: "pop-up", callback: function () {
                    if (m.init()) {
                        if (e.data.pop && e.data.pop.type) {
                            var b = e.data.pop.type.toUpperCase(), c = "ARMANI_EXTENSION_POPUP", d = "POPUP_DISCOUNT_" + b;
                            if (e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                                var g = document.createElement("div");
                                e.fn.sendLog(d, g, c)
                            }
                        }
                        return m.renderIframe(), m.delegateEvent(), a.show(), !0
                    }
                    return !1
                }
            })
        }
    };
    var m = {
        config: {
            isNotDiscountOpen: "close",
            moduleName: "discount",
            noDataClass: "youdaoGWZS_noMore",
            showType: "firstShow",
            curMillis: (new Date).getTime(),
            popupOpenFlag: 1,
            temptOverflow: void 0,
            timer: 2e4,
            element: {
                $se: g("#" + d.optionsID),
                itemQ: "#" + d.commonName + "recommand",
                discountInfoQ: ".-discount-info",
                contentWrapperQ: ".-discount-info .hui-discount-bd",
                closeDiscInfoQ: ".-Dinfo-close",
                iframe: "-Dinfo-iframe",
                settingQ: ".-Dinfo-setting",
                cancelQ: ".-cm-cancel",
                confirmQ: ".-cm-confirm",
                closeConfirmQ: ".-cm-close",
                closeDiscountQ: ".-cm-closeBt",
                layerQ: ".-cm-layer"
            }
        }, initWrapper: function () {
            var a = e.data.pop, b = m.config.element;
            g(b.discountInfoQ).css({width: a.width >> 0 || 360}), g(b.contentWrapperQ).css({
                width: a.width >> 0 || 350,
                height: a.height >> 0 || 224
            })
        }, init: function (a) {
            if (!e.conf || "hiwifi" !== e.conf.route) {
                var b, c, d, f;
                if (a && "object" == typeof a && g.extend(m.config, a), b = m.config, "withoutlocal" !== e.localConf.browser && (b.lastDiscountId = parseInt(e.localConf.lastDiscountId, 10), b.isDiscountOpen = e.localConf.isDiscountOpen, b.lastDiscountTime = e.localConf.lastDiscountTime, b.popupFlag = e.conf.popupFlag, b.hasDiscountInfo = !(!e.data.pop || e.data.pop.id), c = e.data, f = !c.pop, !f))return d = c.pop, m.isShow(d)
            }
        }, renderView: function () {
            var a, b, c, d;
            c = m.config, d = e.data.pop.recmd, d || m.updateLocalConf(), a = m.getDimension(e.data.pop), b = h.template(m.containerTmpl)({
                hasFixedClass: a.hasFixedClass,
                wrapperWidth: a.css.width,
                wrapperHeight: a.css.wrapperHeight,
                isRecmd: d
            }), g("body").append(b), g(c.element.discountInfoQ).css(a.css), m.renderIframe(), m.delegateEvent()
        }, renderIframe: function () {
            var a;
            a = m.config.element, m.initWrapper(), setTimeout(function () {
                var b, c;
                c = document.getElementById(a.iframe);
                try {
                    c.contentWindow.document
                } catch (d) {
                    c.src = "javascript:void((function () {document.open();document.domain='" + document.domain + "';document.close()})())", setTimeout(function () {
                        b = c.contentWindow.document, m.paintIframe(b)
                    }, 1e3)
                }
                setTimeout(function () {
                    c.contentDocument ? (b = c.contentDocument, m.paintIframe(b)) : c.contentWindow.document && (b = c.contentWindow.document, m.paintIframe(b))
                }, 200)
            }, 1)
        }, paintIframe: function (a) {
            var b, c, d, i, j, k, l, m, n;
            m = e.data.pop, l = [], n = [], b = m.html, c = m.css;
            var o = a.createElement("style");
            o.type = "text/css", o.styleSheet ? o.styleSheet.cssText = c : o.appendChild(document.createTextNode(c));
            var p = g("body", a), q = g("head", a);
            g(a).delegate("a", "click", function () {
                if (d = g(this), e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                    i = document.createElement("div");
                    var a = "discount_info_id=" + m.id;
                    m.recmd && (a += "&log_data=" + d.attr("data-log"), a += "&extra=" + d.attr("data-log-ex"));
                    var b = "POPUP_DEAL_INFO_" + m.type.toUpperCase() + "_CLICK";
                    i.setAttribute("params", a), i.setAttribute("href", d.attr("href")), j = m.recmd ? "POPUP_REC_INFO_CLICK" : b, e.fn.sendLog(j, i, "ARMANI_EXTENSION_ACTION")
                }
            }), g(a).delegate(".item-list .historyitem", "mouseenter", function () {
                if (d = g(this), e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                    i = document.createElement("div");
                    var a = "discount_info_id=" + m.id;
                    m.recmd && (a += "&log_data=" + d.attr("data-log"), a += "&extra=" + d.attr("data-log-ex")), a += "&feature=RECOMMEND", i.setAttribute("params", a), i.setAttribute("href", d.attr("href")), j = m.recmd ? "POPUP_REC_INFO_HOVER" : "POPUP_DEAL_INFO_HOVER", e.fn.sendLog(j, i, "ARMANI_EXTENSION_ACTION")
                }
            }), setTimeout(function () {
                q.append(o), p[0].innerHTML = b;
                var c = a.createElement("script");
                if (c.type = "text/javascript", c.text = m.script || "", p[0].appendChild(c), j = m.recmd ? "POPUP_REC_TIP_TRIGGER" : "POPUP_DEAL_TIP_TRIGGER", e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                    if (i = document.createElement("div"), m.recmd) {
                        k = g("a", a);
                        var d = [];
                        k.each(function () {
                            var a;
                            a = g(this).attr("href"), h.contains(l, a) || (l.push(a), n.push(g(this).attr("data-log")), d.push(g(this).attr("data-ex")))
                        });
                        var r = "";
                        h.each(l, function (a, b) {
                            r += "&url" + b + "=" + encodeURIComponent(a)
                        }), h.each(n, function (a, b) {
                            r += "&type" + b + "=" + encodeURIComponent(a)
                        }), h.each(d, function (a, b) {
                            r += "&extra" + b + "=" + encodeURIComponent(a)
                        });
                        var s = m.recmd ? "RECOMMEND" : "EDITOR";
                        r += "&feature=" + s, i.setAttribute("params", r)
                    }
                    e.fn.sendLog(j, i, "ARMANI_EXTENSION_POPUP")
                }
            }, 2)
        }, isShow: function (a) {
            var b, c, d, f, g, h;
            if (b = m.config, g = 72e5, d = a.deadLine, f = a.id, c = b.curMillis, e.conf.popupFlag !== b.popupOpenFlag && e.conf.isDiscountOpen !== b.isNotDiscountOpen && !(-1 !== d && c > d)) {
                if (a.recmd)return !0;
                if ("true" !== e.localConf.hasFeeded && !(f <= b.lastDiscountId)) {
                    var i = parseInt(b.lastDiscountTime, 10) || 0, h = c - i;
                    if (!(2 * g > h))return !0
                }
            }
        }, updateLocalConf: function () {
            var a, b, c;
            a = m.config, b = e.data, localConf = e.localConf, c = a.element.$se, a.lastDiscountId || (e.localConf.lastDiscountId = 0), a.lastDiscountTime || (e.localConf.lastDiscountTime = 0), localConf.lastDiscountId = b.pop.id, localConf.lastDiscountTime = a.curMillis, localConf.isDiscountOpen = "open", "secondShow" === a.showType ? localConf.discountShow = 0 : localConf.discountShow = 1, c.length > 0 && e.localConf && c.html(f.jsonToStr(e.localConf, ";"))
        }, getDimension: function (a) {
            var b, c, d;
            return b = m.config, d = {}, c = {}, c.width = a.width >> 0 || 350, c.wrapperHeight = a.height || 224, c.left = 4, c.top = "auto", c.bottom = 55, d.css = c, (e.conf.backCompat || 6 === e.conf.ie) && (d.hasFixedClass = !0, d.css.position = "absolute", e && e.dom && (d.css.top = "auto", d.css.bottom = e.dom.bottom ? e.dom.bottom + 60 : 60)), d
        }, delegateEvent: function () {
            var a, b, c;
            a = m.config, b = a.element, c = setTimeout(function () {
                m.hideDiscountInfo(!0)
            }, 15e3), g(document).delegate(b.discountInfoQ, "mouseenter", function () {
                c && clearTimeout(c)
            }), g(document).delegate(b.closeDiscInfoQ, "click", function () {
                c && clearTimeout(c), m.hideDiscountInfo()
            }), g(document).delegate(b.settingQ, "click", function () {
                e.localConf.isSetPage && "true" === e.localConf.isSetPage || m.paintConfirm()
            }), g(document).delegate(b.cancelQ, "click", function () {
                g(b.layerQ).remove(), g("body").css({overflow: a.temptOverflow})
            }), g(document).delegate(b.closeConfirmQ, "click", function () {
                g(b.layerQ).remove(), g("body").css({overflow: a.temptOverflow})
            }), g(document).delegate(b.confirmQ, "click", function () {
                var c;
                c = g(b.closeDiscountQ), c[0].checked === !0 ? (e.localConf.isDiscountOpen = "close", e.conf.isDiscountOpen = "close", g(b.discountInfoQ).remove()) : (e.localConf.isDiscountOpen = "open", e.conf.isDiscountOpen = "open"), b.$se.length > 0 && e.localConf && b.$se.html(f.jsonToStr(e.localConf, ";")), g(b.layerQ).remove(), document.body.style.overflow = a.temptOverflow
            })
        }, paintConfirm: function () {
            var a, b, c, f, g, i, k;
            f = m.config, i = document.documentElement.clientHeight + "px";
            var l = d.commonName;
            a = e.dom.body.append("div", {
                id: d.commonName + "layer",
                className: "youdaoGWZSfixedLayer -cm-layer"
            }, {
                position: "fixed",
                width: "100%",
                background: "none",
                height: "100%",
                left: "0",
                top: "0",
                zIndex: d.basezIndex
            }), b = a.append("div", {}, {
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                background: "#000000",
                filter: "Alpha(opacity=40)",
                opacity: "0.4"
            }), c = a.append("div", {id: d.commonName + "confirmCloseDiscountInfo"}, {
                position: "absolute",
                left: "37%",
                top: "37%"
            }), f.temptOverflow = document.body.style.overflow, document.body.style.overflow = f.temptOverflow, (e.conf.backCompat || 6 === e.conf.ie) && (a.style.position = "absolute", a.style.top = document.body.scrollTop + "px", e.conf.backCompat || (a.style.height = document.documentElement.clientHeight + "px", a.style.top = document.documentElement.scrollTop + "px")), g = h.template(j)(), c.innerHTML = g, k = e.conf.isDiscountOpen, document.getElementById(l + k + "Bt").checked = "checked"
        }, hideDiscountInfo: function (a) {
            var b = m.config.element;
            e.localConf.discountShow = 0, b.$se.length > 0 && e.localConf && b.$se.html(f.jsonToStr(e.localConf, ";")), a ? g(b.discountInfoQ).fadeIn("slow", function () {
                g(b.discountInfoQ).remove()
            }) : g(b.discountInfoQ).remove()
        }
    }
}), youdao.define("modules/douban/douban.html", function () {
    return ' <li hui-mod="douban" hui-type="hoverMod" class="hui-shopping-douban hui-fz12">\n    <a class="hui-sp hui-sp11" target="_blank" hoverAction="DOUBAN_HOVER" href="<%=_douban.doubanUrl%>">\n    <span class="hui-icon-cont"><em class="hui-sp hui-sp27"></em></span><br />\n    ����<span class="hui-shopping-lh"><%=_douban.doubanRate %></span>\n    </a>\n        <div class="hui-shopping-lightbox">\n            <div class="hui-shopping-lightbox-hd"></div>\n            <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n                <span class="hui-sp hui-sp42"></span>��������</div>\n            <div class="hui-douban-cont">\n                <div class="hui-douban-rates">\n                    <span class="hui-sp hui-sp28">\n                        <em class="hui-sp hui-sp29" style="width:<%=_douban.doubanRate * 10%>%;"></em>\n                    </span><b class="hui-fwb hui-shopping-lh hui-fz16 hui-douban-point"><%=_douban.doubanRate%></b> <span class="hui-color999">(<%=_douban.doubanRateCount%>��)</span>\n                </div>\n                <% if (_douban.doubanReview && _douban.doubanReview.summary) { %>\n                <dl class="hui-douban-comment">\n                    <dt class="hui-fwb">\n                        ������������\n                    </dt>\n                    <dd>\n                        <%=_douban.doubanReview.summary%>\n                        <a class="hui-color999" target="_blank" clkAction="DOUBAN_DETAIL_CLICK" href="<%=_douban.doubanReview.url%>" title="����">����>></a>\n                    </dd>\n                </dl>\n                <div class="hui-douban-extinfo hui-color999"><em class="hui-sp hui-sp30"></em><%=_douban.doubanReview.author%> <em class="hui-sp hui-sp31"></em><%=_douban.doubanReview.pubdate%></div>\n                <% } else { %>\n                <div class="hui-douban-nocomment hui-color999">����������������</div>\n                <% } %>\n            </div>\n            <div class="hui-douban-ft">\n                <a target="_blank" clkAction="DOUBAN_DETAIL_CLICK" href="<%=_douban.doubanUrl%>">ȥ����������<span class="hui-sp hui-sp16"></span></a>\n            </div>\n        </div>\n</li>\n'
}), youdao.define("modules/douban/douban.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/douban/douban.html")), e = c.mod, f = "douban";
    e[f] = {
        template: d, event: function (a) {
        }
    }
}), youdao.define("modules/faq/faq.html", function () {
    return ' <li hui-mod="faq" hui-type="hoverMod" class="hui-shopping-faq hui-fz12">\r\n    <a class="hui-sp hui-sp11" clkAction="BAR_FEEDBACK_MOD_CLICK" href="http://zhushou.huihui.cn/suggest?keyfrom=zhushou_bar_feedback" target="_blank" title="�������">\r\n        <span class="hui-icon-cont"><em class="hui-sp hui-sp8"></em></span><br />\r\n        ����\r\n    </a>\r\n</li>\r\n'
}), youdao.define("modules/faq/faq.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/faq/faq.html")), e = c.mod, f = "faq";
    e[f] = {
        template: d, event: function (a) {
        }
    }
}), youdao.define("modules/feed/feed.html", function () {
    return ' <li hui-mod="feed" hui-type="hoverMod" class="hui-shopping-feed">\n    <a class="hui-sp hui-sp11" href="">\n        <span class="hui-sp hui-sp3"></span>\n    </a>\n    <div class="hui-shopping-lightbox">\n        <div class="hui-sp hui-sp12"></div>\n        <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n            <span class="hui-sp hui-sp42"></span>���ĵ���Ʒ�б�</div>\n        <div id="youdaoGWZSSubList">\n            <ul class="hui-clearfix">\n                <li>\n                    <div class="hui-feed-thumb">\n                        <span class="hui-sp hui-sp17"></span>\n                        <a href="#">\n                            <img src="http://zhushou.huihui.cn/images/coupon/11c26206d101fd84b052a09205753690.png" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-feed-detail">\n                        <a href="#">˫����26��ȫ������ƽt�׹�</a>\n                        <p class="hui-fwb hui-shopping-lh">7888.00Ԫ</p>\n                    </div>\n                    <div class="hui-feed-setnav">\n                        <a class="hui-sp hui-sp18" href="#"></a>\n                        <div class="hui-feed-setnav-line"></div>\n                        <a class="hui-sp hui-sp19" href="#"></a>\n                    </div>\n                </li>\n                <li>\n                    <div class="hui-feed-thumb">\n                        <span class="hui-sp hui-sp17"></span>\n                        <a href="#">\n                            <img src="http://zhushou.huihui.cn/images/coupon/11c26206d101fd84b052a09205753690.png" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-feed-detail">\n                        <a href="#">˫����26��ȫ������ƽt�׹�</a>\n                        <p class="hui-fwb hui-shopping-lh">7888.00Ԫ</p>\n                    </div>\n                    <div class="hui-feed-setnav">\n                        <a class="hui-sp hui-sp18" href="#"></a>\n                        <div class="hui-feed-setnav-line"></div>\n                        <a class="hui-sp hui-sp19" href="#"></a>\n                    </div>\n                </li>\n                <li class="hui-feedlist-last">\n                    <div class="hui-feed-thumb">\n                        <span class="hui-sp hui-sp17"></span>\n                        <a href="#">\n                            <img src="http://zhushou.huihui.cn/images/coupon/11c26206d101fd84b052a09205753690.png" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-feed-detail">\n                        <a href="#">˫����26��ȫ������ƽt�׹�</a>\n                        <p class="hui-fwb hui-shopping-lh">7888.00Ԫ</p>\n                    </div>\n                    <div class="hui-feed-setnav">\n                        <a class="hui-sp hui-sp18" href="#"></a>\n                        <div class="hui-feed-setnav-line"></div>\n                        <a class="hui-sp hui-sp19" href="#"></a>\n                    </div>\n                </li>\n                <li>\n                    <div class="hui-feed-thumb">\n                        <span class="hui-sp hui-sp17"></span>\n                        <a href="#">\n                            <img src="http://zhushou.huihui.cn/images/coupon/11c26206d101fd84b052a09205753690.png" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-feed-detail">\n                        <a href="#">˫����26��ȫ������ƽt�׹�</a>\n                        <p class="hui-fwb hui-shopping-lh">7888.00Ԫ</p>\n                    </div>\n                    <div class="hui-feed-setnav">\n                        <a class="hui-sp hui-sp18" href="#"></a>\n                        <div class="hui-feed-setnav-line"></div>\n                        <a class="hui-sp hui-sp19" href="#"></a>\n                    </div>\n                </li>\n                <li>\n                    <div class="hui-feed-thumb">\n                        <span class="hui-sp hui-sp17"></span>\n                        <a href="#">\n                            <img src="http://zhushou.huihui.cn/images/coupon/11c26206d101fd84b052a09205753690.png" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-feed-detail">\n                        <a href="#">˫����26��ȫ������ƽt�׹�</a>\n                        <p class="hui-fwb hui-shopping-lh">7888.00Ԫ</p>\n                    </div>\n                    <div class="hui-feed-setnav">\n                        <a class="hui-sp hui-sp18" href="#"></a>\n                        <div class="hui-feed-setnav-line"></div>\n                        <a class="hui-sp hui-sp19" href="#"></a>\n                    </div>\n                </li>\n                <li class="hui-feedlist-last">\n                    <div class="hui-feed-thumb">\n                        <span class="hui-sp hui-sp17"></span>\n                        <a href="#">\n                            <img src="http://zhushou.huihui.cn/images/coupon/11c26206d101fd84b052a09205753690.png" width="90" height="90" />\n                        </a>\n                    </div>\n                    <div class="hui-feed-detail">\n                        <a href="#">˫����26��ȫ������ƽt�׹�</a>\n                        <p class="hui-fwb hui-shopping-lh">7888.00Ԫ</p>\n                    </div>\n                    <div class="hui-feed-setnav">\n                        <a class="hui-sp hui-sp18" href="#"></a>\n                        <div class="hui-feed-setnav-line"></div>\n                        <a class="hui-sp hui-sp19" href="#"></a>\n                    </div>\n                </li>\n            </ul>\n            <div class="hui-shopping-feed-page hui-tac">\n                <a class="hui-sp hui-sp13" href="#"></a> <span class="hui-feed-pages"><em class="hui-shopping-lh">1</em>  /  8</span> <a class="hui-sp hui-sp14" href="#"></a>\n            </div>\n        </div>\n        <div class="hui-nofeedtips hui-colorb2">\n            ���޶���<br />\n            �����ĵ���Ʒ���ڴ˿��ٲ鿴�͹���\n        </div>\n    </div>\n</li>\n'
}), youdao.define("modules/feed/feed.js", function (a, b) {
    "use strict";
    function c(a) {
        this.conf = f.extend({}, k, a), this.init()
    }

    var d = youdao, e = d.require_module("youdao.cache"), f = d.jQuery, g = d._, h = a("modules/feed/feed.html"), i = d.mod, j = "feed";
    i[j] = {
        template: h, event: function (a) {
        }
    };
    var k = {
        q: "/api/pricehub/",
        itemOffsetX: 133,
        itemOffsetY: 185,
        colums: 3,
        perItems: 6,
        perOffset: 399,
        startPos: 0,
        port: ""
    };
    c.prototype = {
        init: function () {
            var a = this, b = a.conf;
            a.conf.startPos;
            a.rightPage = 0, a.cacheLists = [], a.lastRequestStart = a.rightPage * b.perItems, a.doRequest("detail", function (c) {
                a.total = c.total, a.initWrapper(c), "noData" !== a.pageType && (a.rightPage = 1, a.currentLeft = 0, a.initCurQueue(c), a.lastRequestStart = a.rightPage * b.perItems, a.doRequest("detail", a.initCurQueue, {
                    email: b.email,
                    start: a.rightPage * b.perItems
                }))
            }, {email: b.email, start: a.rightPage})
        }, doRequest: function (a, b, c) {
            var e = this, g = e.conf;
            d.consts.baseUrl = location.protocol + "//zhushou.huihui.cn", d.ajax({
                url: g.q + a,
                contex: e,
                params: c || "",
                success: function (a) {
                    f.isFunction(b) && b.call(e, a)
                }
            })
        }, initWrapper: function (a) {
            var b = a.items;
            b.length ? b.length <= this.conf.colums ? this.pageType = "half" : this.pageType = "full" : this.pageType = "noData", this.dealPageNum(), this.conf.renderWrapper.call(this, this.pageType, this.totalPages)
        }, initCurQueue: function (a) {
            var b = a.items, c = this.conf, d = this;
            a.total && (g.each(b, function (a) {
                var b;
                b = d.getOffset(a.index), a.offsetLeft = b.left, a.offsetTop = b.top
            }), this.cacheLists.push.apply(this.cacheLists, b), this.total = a.total, this.updateMaxLeft(), this.subLists = b, c.renderItems.call(this, b))
        }, updateMaxLeft: function () {
            var a = this.total, b = this.conf;
            this.maxLeft = Math.floor(a / b.perItems) * b.perOffset
        }, getOffset: function (a) {
            var b, c, d = this.conf;
            return b = Math.floor(a / d.perItems) * d.itemOffsetX * d.colums + a % d.colums * d.itemOffsetX, c = Math.floor(a / d.colums) % 2 * d.itemOffsetY, {
                left: b,
                top: c
            }
        }, dealPageNum: function () {
            var a = this.total, b = this.conf;
            this.totalPages = a % b.perItems ? Math.ceil((a + 1) / b.perItems) : Math.ceil(a / b.perItems)
        }, prevPage: function () {
            var a = this.conf, b = -((this.rightPage - 2) * a.perOffset);
            0 === b ? this.rightPage = 1 : this.rightPage = this.rightPage - 1, this.currentLeft = b
        }, nextPage: function () {
            var a = this.conf, b = -(this.rightPage * a.perOffset);
            Math.abs(b) === this.maxLeft ? this.rightPage = this.totalPages : this.rightPage = this.rightPage + 1, this.currentLeft = b;
            this.rightPage * a.perItems;
            if (this.cacheLists.length !== this.total) {
                var c = this.cacheLists.length;
                this.lastRequestStart !== c && (this.lastRequestStart = c, this.doRequest("detail", this.initCurQueue, {
                    email: a.email,
                    start: c
                }))
            }
            var d = (this.rightPage - 1) * a.perItems;
            return this.cacheLists[d] ? !0 : (this.currentLeft = b + a.perOffset, this.rightPage = this.rightPage - 1, console.log(991), !1)
        }, delItem: function (a) {
            var b = this, c = b.conf, d = this.getAjaxParams(a);
            this.doRequest("del", function () {
                b.cacheLists.splice(a, 1);
                var d, e = b.cacheLists, f = e.length, g = a;
                if (this.total = this.total - 1, !f)return b.pageType = "noData", void b.conf.renderWrapper.call(b, b.pageType, b.totalPages);
                for (; f > g; g++)d = b.getOffset(g), e[g].offsetLeft = d.left, e[g].offsetTop = d.top, e[g].index = e[g].index - 1;
                if (e.length !== b.total) {
                    var h = e.length;
                    b.lastRequestStart !== h && (b.lastRequestStart = h, b.doRequest("detail", b.initCurQueue, {
                        email: c.email,
                        start: h
                    }))
                }
                b.updateMaxLeft(), b.dealPageNum();
                var i;
                b.totalPages < b.rightPage && (i = !0, b.prevPage()), c.dealDel.call(this, a, e, i)
            }, d)
        }, modifyItem: function (a) {
            var b, b = this, c = (b.conf, this.getAjaxParams(a, !0));
            this.doRequest("query", function (a) {
                b.switchEditData(a, c)
            }, c)
        }, switchEditData: function (a, b) {
            var c = [], d = {}, e = {}, h = {}, i = b.productid.split(":");
            "c" === i[0] ? (e.clusterId = i[1], e.iscluster = !0) : e.itemId = i[1], d.famous = !0;
            var j;
            "CUSTOM" === a.subType && (j = a.subedSites.split(","), d.initSelected = j.length ? j.join("~") : " ", d.famous = !1), d.listType = a.subType, d.price = a.expectPrice, g.each(a.subableSites, function (b, d) {
                var e;
                e = {
                    famous: b.famous,
                    site: b.domain,
                    siteName: b.siteName,
                    avaiable: !0,
                    modify: !0,
                    isChecked: !0,
                    price: a.expectPrice,
                    id: d
                }, c.push(e)
            }), c.push(d), e.priceList = c, h.x = 850, h.y = f("#youdaoGWZSSubList").offset().top, h.type = "sub", h.isModify = !0, h.modifyInfo = e, msg.send("subscribe", h)
        }, getAjaxParams: function (a, b) {
            var c = {}, d = this.cacheLists[a];
            return d.itemid && "undefined" !== d.itemid && (b ? c.productid = (d.isCluster ? "c:" : "s:") + d.itemid : (c.id = d.itemid, c.cluster = d.isCluster ? !0 : !1)), cf = e.localConf || {}, email = cf.email || e.data.email || "", c.extensionid = cf.extensionid || "", c.email = email, c.m = encodeURIComponent(d.url), c
        }
    }
}), youdao.define("modules/functionTips/functionTips.html", function () {
    return ' <div hui-mod="functionTips" class="hui-funtips-wrapper -hui-funtips-wrapper">\n    <% if(_functionTips.isFuncPriceTrend && _functionTips.funcPriceTrendData) {%>\n    <div class="hui-shopping-lightbox hui-funtips hui-funtips-trend -hui-funcTrendTip">\n      <div class="hui-shopping-lightbox-hd"></div>\n      <div  class="hui-shopping-lightbox-title hui-color999 clearfix">\n        <span class="hui-sp hui-sp42"></span>\n        ��������\n        <span class="hui-funtips-close -hui-funtips-close" \n                clkaction="FUNCTIONTIPS_FUNCTREND_CLICK_CLOSE" \n                functiontips-type="funcTrendTip">x</span>\n      </div>\n      <div class="hui-shopping-lightbox-bd">\n        <p>\n        <span class="hui-sp hui-<%= _functionTips.funcPriceTrendData.style%>"></span>\n            <%= _functionTips.funcPriceTrendData.long%>\n            <img src="data:image/png;base64,<%= _functionTips.funcImg%>" />\n        </p>\n        <div class="hui-check-tips hui-color999 clearfix">\n            <input id="hui-check-tips" class="input-check -input-check -hui-funtips-close"\n                clkaction="FUNCTIONTIPS_FUNCTREND_CLICK_CHECK" \n                functiontips-type="funcTrendTip"\n                type="checkbox" />\n          <label for="hui-check-tips">������ʾ</label>\n        </div>\n      </div>\n    </div>\n    <% } %>\n    <% if(_functionTips.isFuncLow && _functionTips.funcLowData) {%>\n    <div class="hui-shopping-lightbox hui-funtips hui-funtips-low -hui-funtips -hui-funcLowTip" \n        functiontips-wrapper="funcLowTip" >\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div  class="hui-shopping-lightbox-title hui-color999 clearfix">\n            <span class="hui-sp hui-sp42"></span>\n            ��������\n            <span class="hui-funtips-close -hui-funtips-close"\n                clkaction="FUNCTIONTIPS_FUNCLOW_CLICK_CLOSE" \n                functiontips-type="funcLowTip" >x</span>\n        </div>\n        <div class="hui-shopping-lightbox-bd">\n            <p class="hui-fwb hui-fz14">\n            <span class="hui-sp hui-sp43"></span> \n            <em class="hui-colorf00"><%=_functionTips.funcLowData.siteName%></em>\n              ���ͼۣ� <em class="hui-colorf00"><%=_functionTips.funcLowData.price%>Ԫ</em>\n            </p>\n            <a class="btn-funtips-go hui-fwb hui-fz14 -hui-funtips-close" target="_blank"\n                clkaction="FUNCTIONTIPS_FUNCLOW_CLICK_TOSEE" \n                functiontips-type="funcLowTip"\n                href="<%=_functionTips.funcLowData.items[0].cpsUrl%>">ȥ����</a>\n            <div class="hui-check-tips hui-color999 clearfix">\n                <input id="hui-check-price-tips" class="input-check -input-check -hui-funtips-close"\n                    clkaction="FUNCTIONTIPS_FUNCLOW_CLICK_CHECK" \n                    functiontips-type="funcLowTip"\n                    type="checkbox" />\n                <label for="hui-check-price-tips">������ʾ</label>\n            </div>\n         </div>\n    </div> \n    <% } %>\n</div>\n'
}), youdao.define("modules/functionTips/functionTips.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = a("modules/functionTips/functionTips.html"), f = c.mod, g = "functionTips";
    f[g] = {
        template: e, event: function (a) {
            a.sMsg({
                type: "pop-up", callback: function () {
                    var b, e = c.cache.conf.ie || 11, f = c.cache.localConf || {}, g = d(".-hui-funcLowTip", a), h = d(".-hui-funcTrendTip", a), i = !1;
                    h.length > 0 && e > 7 && "false" !== f.funcTrendTip && (i = !0);
                    var j = !1;
                    if (g.length > 0 && "false" !== f.funcLowTip && (j = !0), j ? (g.show(), b = "FUNCLOW") : i && (h.show(), b = "FUNCTREND"), !j && !i)return !1;
                    var k = "ARMANI_EXTENSION_POPUP", l = "FUNCTIONTIPS_POPUP";
                    if (c.cache.fn && c.cache.fn.sendLog && c.util.isFunction(c.cache.fn.sendLog)) {
                        var m = document.createElement("div"), n = "tipType=" + b;
                        m.setAttribute("params", n), c.cache.fn.sendLog(l, m, k)
                    }
                    a.delegate(".-hui-funtips-close", "click", function () {
                        var b = d(this), e = b.attr("functiontips-type"), f = d(".-hui-" + e, a), g = d(".-input-check", f);
                        if (g.attr("checked")) {
                            var h = c.cache.localConf || {};
                            h[e] = "false";
                            var i = document.getElementById(consts.optionsID);
                            i && c.cache.localConf && (i.innerHTML = c.util.jsonToStr(h, ";"))
                        }
                        f.hide()
                    });
                    var o;
                    o = setTimeout(function () {
                        a.hide()
                    }, 5e3);
                    var p = ".-hui-funtips-wrapper";
                    return d(document).delegate(p, "mouseenter", function () {
                        o && clearTimeout(o)
                    }), !0
                }
            })
        }
    }
}), youdao.define("modules/haiOnekey/haiOnekey.html", function () {
    return ' <li hui-mod="signin" id="hui-signin" hui-type="hoverMod" class="hui-button-bar-wrapper ">\r\n    <a  class="hui-button-bar hui-<%= _signin.data && _signin.data.todaySignUp ? "is" : "not" %>-signin"\r\n        target="_blank" clkaction="BAR_SIGNIN_MOD_CLICK"  hoveraction="BAR_SIGNIN_MOD_HOVER" data-log-feature="SIGNIN"\r\n        href="http://www.huihui.cn/?keyfrom=zs_checkin">\r\n        <% if (_signin.data && _signin.data.todaySignUp) { %>\r\n        <span class="hui-button-bar-tip"></span><span class="hui-button-bar-title">��ǩ��</span>\r\n        <% } else { %>\r\n        <span class="hui-button-bar-tip"></span><span class="hui-button-bar-title">ǩ��</span>\r\n        <% } %>\r\n    </a>\r\n    <div class="hui-shopping-lightbox">\r\n        <div class="hui-icon-zy"></div>\r\n        <div class="hui-shopping-lightbox-hd"></div>\r\n        <div class="hui-shopping-lightbox-bd">\r\n        <% if (_signin.data) { %>\r\n            <p class="uname">hi,<%= _signin.data.uname %></p>\r\n            <p class="punch-tips">\r\n                ����ǩ�� <b class="hui-shopping-lh"><%= _signin.data.signUpDays %></b>\r\n                �죬���� <b class="hui-shopping-lh"><%= _signin.data.credits %></b>\r\n                ����\r\n            </p>\r\n        <% } %>\r\n        <% if (!_signin.data || !_signin.data.todaySignUp) { %>\r\n            <a class="btn-punch" href="http://www.huihui.cn/?keyfrom=zs_checkin" target="_blank"\r\n                clkAction="BAR_SIGNIN_BTN_CLICK" data-log-feature="SIGNIN">ǩ���ͻ���</a>\r\n        <% } %>\r\n        <p class="punch-notice">\r\n        <a  href="http://www.huihui.cn/share/7169846?spm=3.7095809.0.0.aH3Hef" target="_blank"\r\n            title="ǩ����������" clkAction="BAR_SIGNIN_TIP_CLICK" data-log-feature="SIGNIN">ǩ����������</a>\r\n        </p>\r\n   </div>\r\n</li>\r\n'
}), youdao.define("modules/haiOnekey/haiOnekey.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/haiOnekey/haiOnekey.html")), e = c.require_module("youdao.cache"), f = c.require_module("youdao.util"), g = c.mod, h = "haiOnekey";
    g[h] = {
        template: d, event: function (a) {
            var b = "ARMANI_EXTENSION_POPUP", c = "POPUP_HAITAO_TRIGGER";
            if (e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                var d = document.createElement("div");
                e.fn.sendLog(c, d, b)
            }
        }
    }
}), youdao.define("modules/historyInfo/historyInfo.html", function () {
    return ' <div hui-mod="historyInfo" class="hui-shopping-historyInfo hui-fz12">\n    <span>\n        <%=_historyInfo.long%>\n    </span>\n</div>\n'
}), youdao.define("modules/historyInfo/historyInfo.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/historyInfo/historyInfo.html")), e = c.mod, f = "historyInfo";
    e[f] = {
        template: d, event: function (a) {
            a.show()
        }
    }
}), youdao.define("modules/huiContent/huiContent.html", function () {
    return ' <li class="hui-button-bar-wrapper" id="hui-content" hui-mod="huiContent" hui-type="hoverMod" class="hui-shopping-signin hui-fz12">\n    <a  class="hui-button-bar" target="_blank"\n        clkaction="BAR_DEAL_MOD_CLICK"  hoveraction="BAR_DEAL_MOD_HOVER" data-log-status="<%= _huiContent.sum > 0 ? "true" : "false"%>"\n        href="http://www.huihui.cn<%= _huiContent.sum > 0 ? "/merchant?domain=" + _huiContent.domain + "&" : "?"   %>keyfrom=zhushou_bar_hui_deal">\n        <% if (_huiContent.sum) { %>\n            <span class="hui-button-bar-tip"></span><span class="hui-button-bar-title">ֵ����(<span class="hui-notify-num"><%= _huiContent.sum %></span>)</span>\n        <% } else { %>\n            <span class="hui-button-bar-tip"></span><span class="hui-button-bar-title">ֵ����</span>\n        <% } %>\n    </a>\n    <div class="hui-shopping-lightbox">\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div class="hui-shopping-lightbox-bd">\n            <% if (_huiContent.sum) { %>\n            <p class="hui-para">�ݻݱ༭��ѡ<span class="hui-notify-num"><%= _huiContent.sum %></span>��<%= _huiContent.siteName %>��ֵ�������Ʒ��</p>\n            <% } else { %>\n            <p class="hui-para">����ȫ������ֵ������Ʒʵʱ����</p>\n            <% } %>\n            \n            <div class="hui-content-buy-signin <% if (_signin.data && _signin.data.todaySignUp) { %> hui-content-signin-active <% } %>">\n               <a target="_blank" \n                  clkAction="BAR_DEAL_SEEMORE_CLICK" data-log-status="<%= _huiContent.sum > 0 ? "true" : "false"%>"\n                    <% if (!(_signin.data && _signin.data.todaySignUp)) { %>\n                        href="http://www.huihui.cn/?keyfrom=zs_checkin"\n                    <% } %>\n                 class="hui-button hui-button-star" >\n                    <% if (_signin.data && _signin.data.todaySignUp) { %>\n                        <span>��ǩ��</span>\n                    <% } else { %>\n                        <span>ǩ���ͻ���</span>\n                    <% } %>\n               </a>\n            </div>\n            <ul class="hui-list hui-clearfix">\n                <%if (_huiContent && _huiContent.list) {\n                    for(var i = 0; i < _huiContent.list.length; i ++) { %>\n                       <li class="hui-content-buy-item">\n                           <a href="<%= _huiContent.list[i].link %>?keyfrom=zhushou_zdm" title="<%= _huiContent.list[i].summary %>"\n                               data-log-status="<%= _huiContent.sum > 0 ? "true" : "false"%>" clkAction="BAR_DEAL_ITEM_CLICK"\n                               target="_blank">\n                                   <img class="hui-content-buy-img" src="<%= _huiContent.list[i].imageUrl %>" alt="<%= _huiContent.list[i].summary %>" />\n                                   <div class="hui-content-buy-title">\n                                     <p class="hui-content-buy-summary"><%= _huiContent.list[i].title %></p>\n                                     <p class="hui-content-buy-subtitle"><%= _huiContent.list[i].subTitle %></p>\n                                   </div>\n                           </a>\n                       </li>\n                <% } } %>\n            </ul>\n            <div class="hui-content-buy-footer">\n               <a target="_blank" title="�鿴ȫ��" \n               clkAction="BAR_DEAL_SEEMORE_CLICK" data-log-status="<%= _huiContent.sum > 0 ? "true" : "false"%>"\n               href="http://www.huihui.cn<%= _huiContent.sum > 0 ? "/merchant?domain=" + _huiContent.domain + "&" : "?"   %>keyfrom=zhushou_zdm"\n               class="hui-button hui-button-star hui-button-star-valid" >\n                   <span>�鿴ȫ��</span>\n               </a>\n            </div>\n       </div>\n   </div>\n</li>\n';
}), youdao.define("modules/huiContent/huiContent.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/huiContent/huiContent.html")), e = c.require_module("youdao.cache"), f = c.require_module("youdao.util"), g = c.mod, h = "huiContent";
    g[h] = {
        template: d, event: function (a) {
            var b = function (a, b) {
                b || (b = "ARMANI_EXTENSION_ACTION"), setTimeout(function () {
                    if (e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                        var c = document.createElement("div");
                        e.fn.sendLog(a, c, b)
                    }
                }, 300)
            };
            b("POPUP_DEAL_TRIGGER", "ARMANI_EXTENSION_POPUP")
        }
    }
}), youdao.define("modules/incidentallyBuy/incidentallyBuy.html", function () {
    return ' <div hui-mod="incidentallyBuy" id="GWZS-incidentallyBuy" class="hui-sidebar-container">\n    <a href="javascript:void(0)" clkaction="SIDEBAR_REC_CLOSE_CLICK"\n        data-log-status="<%= _shoppingcart.type %>"\n        class="incidentallyBuy-close hui-shopping-sidebar-close -sidebar-close" title="�ر�">\n        �ر�</a>\n    <div class="hui-shopping-sidebar-hd">�����ؼ�</div>\n    <div class="hui-shopping-sidebar-bd hui-dachemai -hui-dachemai">\n    </div>\n    <div class="hui-shopping-sidebar-ft">\n        <a href="http://www.huihui.cn/deals/12431992?keyfrom=hui_zhushou" title="�����ؼ�" target="_blank">\n            �����ؼ�<em>>></em>\n        </a>\n    </div>\n</div>\n<a class="hui-sidebar-btn -sidebar-btn" href="javascript:void(0)" title="�ݻݹ������ֶ����ṩ"\n    clkaction="SIDEBAR_REC_OPEN_CLICK" data-log-status="<%= _shoppingcart.type %>">\n    <i class="hui-sidebar-btn-logo hui-sp">logo</i>\n    <p class="hui-sidebar-btn-p" >�����ؼ�</p>\n    <i class="hui-sidebar-btn-arrow-right hui-sp">arrow</i>\n</a>\n'
}), youdao.define("modules/incidentallyBuy/content.html", function () {
    return ' <% for(var i = 0; i < items.length ; i ++) { %>\n<% var item = items[i] %>\n<li node-type="item" style="left:<%= item.offsetLeft %>px; top:<%= item.offsetTop  %>px;">\n   <div class="image-wrapper">\n       <a href="<%=item.cpsUrl %>&keyfrom=zhushou_dachemai_<%= type %>" target="_blank"\n            clkaction="SIDEBAR_REC_ITEM_CLICK" \n            data-log-position="CART"\n            data-log-status="<%= type %>"\n            title="<%=item.title%>">\n           <img src="<%= item.imgUrl %>"/>\n        </a>\n    </div>\n    <p class="content-wrapper">\n        <a href="<%=item.cpsUrl %>&keyfrom=zhushou_dachemai" title="<%=item.title%>"\n            clkaction="SIDEBAR_REC_ITEM_CLICK" \n            data-log-status="<%= type %>"\n            data-log-position="CART"\n            target="_blank">\n                <% if (!item.freightFree && (item.maxPrice > item.price)) { %>\n                    <% if (item.lowest) { %>\n                    <i class="hui-lowest hui-sp"></i>\n                    <% } else { %>\n                    <i class="hui-fall hui-sp"></i>\n                    <% } %>\n                <% } %>\n                <%=item.price%>Ԫ\n                <% if (item.freightFree) { %>\n                ����\n                <% } else if (item.maxPrice > item.price)  { %>\n                <span class="hui-origin-price">\n                    <em><%= item.maxPrice %></em>Ԫ\n                </span>\n                <% }  %>\n            </a>\n    </p>\n</li>\n<% } %>\n\n'
}), youdao.define("modules/incidentallyBuy/wrapper.html", function () {
    return ' <div class="sublist-viewport">\r\n    <ul node-type="wrapper">\r\n    </ul>\r\n</div>\r\n<% if (_shoppingcart.items.length >= 2) { %>\r\n    <div class="paging-wrapper">\r\n        <a href="javascript:void(0)" clkaction="SIDEBAR_<%= logType %>_CHANGEPAGE_CLICK"\r\n            data-log-position="PREV"\r\n            data-log-status="<%= _shoppingcart.type %>"\r\n            class="-prev prev-page-unable prev-page" title="ǰһҳ"></a>\r\n        <span class="page-number">\r\n            <span class="-rightPage right-page">1</span>\r\n            /<span class="-total-pages total-pages"><%= totalPages %></span>\r\n        </span>\r\n        <a href="javascript:void(0)"\r\n            clkaction="SIDEBAR_<%= logType %>_CHANGEPAGE_CLICK"\r\n            data-log-position="NEXT"\r\n            data-log-status="<%= _shoppingcart.type %>"\r\n            class="-next next-page  <%= totalPages === 1 ? "next-page-unable" : "" %>"\r\n            title="��һҳ">��һҳ</a>\r\n    </div>\r\n<% } %>\r\n\r\n'
}), youdao.define("modules/common/ajaxSlide.js", function (a, b, c) {
    function d(a) {
        this.conf = f.extend({}, i, a), "v" === this.conf.oritation ? this.conf.perOffset = this.conf.colums * this.conf.itemOffsetY : this.conf.perOffset = this.conf.colums * this.conf.itemOffsetX, this.conf.wrapHeight && (this.conf.perOffset = this.conf.wrapHeight), this.init()
    }

    var e = youdao, f = e.jQuery, g = e._, h = e.require_module("youdao.cache"), i = {
        q: "/api/pricehub/",
        isAjax: !0,
        itemOffsetX: 116,
        itemOffsetY: 170,
        colums: 3,
        perItems: 6,
        defaultSelector: ".sublist-viewport li",
        defaultType: "detail",
        startPos: 0,
        port: ""
    };
    c.exports = d, d.prototype = {
        init: function () {
            var a = this, b = a.conf;
            a.conf.startPos;
            a.rightPage = 0, a.cacheLists = [], a.lastRequestStart = a.rightPage * b.perItems, a.doRequest(b.defaultType, function (c) {
                a.total = c.total, a.initWrapper(c), "noData" !== a.pageType && "noLogin" !== a.pageType && (a.rightPage = 1, a.currentLeft = 0, a.initCurQueue(c), a.lastRequestStart = a.rightPage * b.perItems, b.isAjax && a.doRequest(b.defaultType, a.initCurQueue, {
                    email: b.email,
                    start: a.rightPage * b.perItems
                }))
            }, {email: b.email, start: a.rightPage})
        }, doRequest: function (a, b, c) {
            var d = this, g = d.conf;
            return c.nl = !0, g.data && f.isFunction(b) ? void b.call(d, g.data) : void e.ajax({
                url: g.q + a,
                contex: d,
                params: c || "",
                success: function (a) {
                    f.isFunction(b) && b.call(d, a)
                }
            })
        }, initWrapper: function (a) {
            var b = a.items;
            b && b.length ? b.length <= this.conf.colums ? this.pageType = "half" : this.pageType = "full" : this.pageType = "noData", this.conf.needLogin && !a.uid && (this.pageType = "noLogin"), this.dealPageNum(), this.conf.renderWrapper.call(this, this.pageType, this.totalPages, a.type)
        }, initCurQueue: function (a) {
            var b = a.items, c = this.conf, d = this;
            a.total && (g.each(b, function (a, b) {
                var c;
                c = d.getOffset(a.index || b), a.offsetLeft = c.left, a.offsetTop = c.top, a.rowNum = c.rowNum
            }), this.cacheLists.push.apply(this.cacheLists, b), this.total = a.total, this.updateMaxLeft(), this.subLists = b, this.listType = a.type, c.renderItems.call(this, b), c.isFlex && d.adjustPosition())
        }, adjustPosition: function () {
            var a = this.conf, b = f(a.defaultSelector), c = [], d = [];
            f('li[hui-mod="recommand"] .hui-shopping-lightbox').addClass("testHeight"), b.each(function () {
                var b = f(this), e = b.attr("data-index");
                c.push(b.height()), (e + 1) % a.colums === 0 && (d.push(g.max(c) + 15), c = [])
            });
            for (var e = a.perItems / a.colums, h = 0; h < d.length; h++)if (h % (a.perItems / a.colums) !== 0) {
                var i = f(a.defaultSelector + '[data-row="' + h + '"]'), j = f(a.defaultSelector + '[data-row="' + (h - 1) + '"]'), k = j.position().top;
                if (h % e != (h - 1) % e) {
                    var l = k + d[h - 1];
                    i.css("top", l)
                } else i.css("top", k)
            }
            f('li[hui-mod="recommand"] .hui-shopping-lightbox').removeClass("testHeight")
        }, updateMaxLeft: function () {
            var a = this.total, b = this.conf;
            this.maxLeft = Math.floor(a / b.perItems) * b.perOffset
        }, getOffset: function (a) {
            var b, c, d = this.conf, e = Math.floor(a / d.colums), f = e % (d.perItems / d.colums);
            if ("v" === d.oritation) {
                if (c = Math.floor(a / d.perItems) * d.perOffset + a % d.colums * d.itemOffsetY, b = f * d.itemOffsetX, d.wrapHeight) {
                    var g = d.wrapHeight - d.colums * d.itemOffsetY, h = g / d.colums;
                    c += h * (a % d.colums + 1)
                }
            } else b = Math.floor(a / d.perItems) * d.itemOffsetX * d.colums + a % d.colums * d.itemOffsetX, c = f * d.itemOffsetY;
            return {left: b, rowNum: e, top: c}
        }, dealPageNum: function () {
            var a = this.total, b = this.conf;
            this.totalPages = a % b.perItems ? Math.ceil((a + 1) / b.perItems) : Math.ceil(a / b.perItems)
        }, prevPage: function () {
            var a, b = this.conf;
            a = -((this.rightPage - 2) * b.perOffset), 0 === a ? this.rightPage = 1 : this.rightPage = this.rightPage - 1, this.currentLeft = a
        }, nextPage: function () {
            var a = this.conf, b = -(this.rightPage * a.perOffset);
            Math.abs(b) === this.maxLeft ? this.rightPage = this.totalPages : this.rightPage = this.rightPage + 1, this.currentLeft = b;
            this.rightPage * a.perItems;
            if (this.cacheLists.length !== this.total) {
                var c = this.cacheLists.length;
                this.lastRequestStart !== c && (this.lastRequestStart = c, this.doRequest("detail", this.initCurQueue, {
                    email: a.email,
                    start: c
                }))
            }
            var d = (this.rightPage - 1) * a.perItems;
            return this.cacheLists[d] ? !0 : (this.currentLeft = b + a.perOffset, this.rightPage = this.rightPage - 1, !1)
        }, delItem: function (a) {
            var b = this, c = b.conf, d = this.getAjaxParams(a);
            this.doRequest("del", function () {
                b.cacheLists.splice(a, 1);
                var d, e = b.cacheLists, f = e.length, g = a;
                if (this.total = this.total - 1, !f)return b.pageType = "noData", void b.conf.renderWrapper.call(b, b.pageType, b.totalPages);
                for (; f > g; g++)d = b.getOffset(g), e[g].offsetLeft = d.left, e[g].offsetTop = d.top, e[g].rowNum = d.rowNum, e[g].index = e[g].index - 1;
                if (e.length !== b.total) {
                    var h = e.length;
                    b.lastRequestStart !== h && (b.lastRequestStart = h, b.doRequest("detail", b.initCurQueue, {
                        email: c.email,
                        start: h
                    }))
                }
                b.updateMaxLeft(), b.dealPageNum();
                var i;
                b.totalPages < b.rightPage && (i = !0, b.prevPage()), c.dealDel.call(this, a, e, i)
            }, d)
        }, modifyItem: function (a) {
            var b, b = this, c = b.conf, d = this.getAjaxParams(a, !0);
            this.doRequest("query", function (a) {
                c.switchEditData(a, d)
            }, d)
        }, getAjaxParams: function (a, b) {
            var c = {}, d = this.cacheLists[a];
            d.itemid && "undefined" !== d.itemid && (b ? c.productid = (d.isCluster ? "c:" : "s:") + d.itemid : (c.id = d.itemid, c.cluster = d.isCluster ? !0 : !1));
            var e = h.localConf || {}, f = e.email || h.data.email || "";
            return c.extensionid = e.extensionid || "", c.email = f, c.m = encodeURIComponent(d.url), c
        }
    }
}), youdao.define("modules/incidentallyBuy/incidentallyBuy.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.require_module("youdao.consts"), e = c.require_module("youdao.cache"), f = c.require_module("youdao.util"), g = (c.require_module("youdao.dom"), c.jQuery), h = c._, i = a("modules/incidentallyBuy/incidentallyBuy.html"), j = c.mod, k = "incidentallyBuy";
    j[k] = {
        template: i, event: function (a) {
            return "close" === e.localConf.showIncidentallyBuy ? (g('div[hui-mod="incidentallyBuy"]').remove(), void g('a[clkaction="SIDEBAR_REC_OPEN_BAICAI_CLICK"]').remove()) : void l(a)
        }
    };
    var l = function (b) {
        function c(c) {
            var d = a("modules/incidentallyBuy/content.html"), e = h.template(d)({items: c, type: r});
            setTimeout(function () {
                g(".-hui-dachemai [node-type='wrapper']", b).append(e)
            }, 500)
        }

        function i(c, e, f) {
            var i;
            i = {
                css: "youdao",
                consts: d.subConsts,
                totalPages: e,
                recommendType: f,
                logType: "REC",
                shoppingcartType: r,
                type: c
            };
            var j = a("modules/incidentallyBuy/wrapper.html"), k = h.template(j)(i);
            g(".-hui-dachemai", b).append(k)
        }

        var j = "ARMANI_EXTENSION_POPUP", k = "SIDEBAR_REC_BAICAI_TRIGGER", l = e.data.shoppingcart || {}, m = l.type;
        if (k = k + "_" + m, e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
            var n = document.createElement("div");
            e.fn.sendLog(k, n, j)
        }
        var o, p = {
            listViewPortQ: ".-hui-dachemai .sublist-viewport ul",
            unablePrev: "prev-page-unable",
            unableNext: "next-page-unable",
            subHalfWidth: "sublist-halfWidth",
            subFullWidth: "sublist-fullWidth",
            subNoList: "has-no-subList"
        }, q = {}, l = e.data.shoppingcart;
        q.items = l.items, q.total = l.items.length;
        var r = l.type, s = a("modules/common/ajaxSlide.js");
        o = new s({
            renderWrapper: i,
            defaultType: "",
            isAjax: !1,
            data: q,
            colums: 3,
            perItems: 3,
            itemOffsetX: 0,
            itemOffsetY: 122,
            isFlex: !0,
            oritation: "v",
            renderItems: c
        });
        var t;
        1e3 * d.showTime, e.data.subscribes;
        b.delegate(".-prev", "click", function () {
            var a = g(this);
            a.hasClass(p.unablePrev) || (o.prevPage(), 1 === o.rightPage && a.addClass("prev-page-unable"), t && clearTimeout(t), g(p.listViewPortQ, b).stop(), g(p.listViewPortQ, b).animate({top: o.currentLeft}, 600), g(".-rightPage", b).html(o.rightPage), g(".-next", b).hasClass(p.unableNext) && g(".-next", b).removeClass(p.unableNext))
        });
        b.delegate(".-next", "click", function () {
            var a = g(this);
            a.hasClass(p.unableNext) || o.nextPage() && (o.rightPage === o.totalPages && a.addClass(p.unableNext), g(p.listViewPortQ, b).stop(), g(p.listViewPortQ, b).animate({top: o.currentLeft}, 600), g(".-rightPage", b).html(o.rightPage), g(".-prev", b).hasClass(p.unablePrev) && g(".-prev", b).removeClass(p.unablePrev))
        })
    }
}), youdao.define("modules/jigsaw/jigsaw.html", function () {
    return ' <div class="hui-jigsaw hui-jigsaw-default" hui-mod="jigsaw">\n    <div class="hui-hd">\n        <span class="hui-new-sp hui-sp42"></span>\n        <span class="-hui-jigsaw-close hui-jigsaw-close hui-sp-jigsaw" clkaction="POPUP_JIGSAW_CLOSE_CLOSE"></span>\n    </div>\n    <div class="hui-bd">\n        <!--ƴͼͼƬ-->\n        <!--jigsaw-img-default-->\n        <div class="hui-jigsaw-image -jigsaw-image">\n        </div>\n        <!--Ĭ��Ϊ������о�ϲ������������󣬸���������ƴͼ,��ʾ��ͬ������-->\n        <div class="hui-jigsaw-tip hui-sp-jigsaw">\n            <span class="hui-sp-jigsaw jigsaw-tip-count -jigsaw-tip"></span>\n        </div>\n    </div>\n    <div class="hui-ft">\n        <!--����ط��м���״̬��������Ĭ�ϵġ����ϲ��롱����������isNewImage�ж��Ƿ�����ͼƬ-->\n        <a href="javascript:void(0)" class="-jigsaw-try hui-jigsaw-try hui-sp-jigsaw" clkaction="POPUP_JIGSAW_TRY_CLICK"></a>\n    </div>\n</div>\n'
}), youdao.define("modules/jigsaw/jigsaw.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c.cache, f = (c._, a("modules/jigsaw/jigsaw.html")), g = c.reg("jigsaw"), h = c.mod, i = "jigsaw";
    h[i] = {
        template: f, event: function (a) {
            g.send("jigsaw", {
                type: "pop-up", name: "jigsaw", callback: function () {
                    if (e.localConf && "close" === e.localConf.showJigsaw)return void a.remove();
                    var b = "ARMANI_EXTENSION_POPUP", f = "POPUP_JIGSAW_TRIGGER";
                    if (c.cache.fn && c.cache.fn.sendLog && c.util.isFunction(c.cache.fn.sendLog)) {
                        var g = document.createElement("div");
                        c.cache.fn.sendLog(f, g, b)
                    }
                    a.delegate(".-hui-jigsaw-close", "click", function () {
                        a.remove()
                    }), a.delegate(".-jigsaw-try", "click", function () {
                        var b = {};
                        if (!e.localConf || "0" != e.localConf.jigsawGiven) {
                            b.give = 0, e.localConf.jigsawGiven = 0;
                            var f = document.getElementById(consts.optionsID);
                            f && c.cache.localConf && (f.innerHTML = c.util.jsonToStr(e.localConf, ";"))
                        }
                        a.addClass("hui-jigsaw-tempt"), setTimeout(function () {
                            c.ajax({
                                params: b, url: "api/event/jigsaw/getonepiece", success: function (b) {
                                    var c = b.imageSize - b.userImageSize;
                                    b.isNewImage ? (d(".-jigsaw-image").css({"background-image": "url(" + b.showImage + ")"}), a.removeClass("hui-jigsaw-tempt"), a.addClass("hui-jigsaw-greet"), d(".-jigsaw-tip").addClass("jigsaw-tip-count-" + b.imageSize), d(".-jigsaw-try").attr({clkaction: "POPUP_JIGSAW_GOTIT_CLICK"})) : (a.removeClass("hui-jigsaw-tempt"), a.addClass("hui-jigsaw-unlucky"), d(".-jigsaw-tip").addClass("jigsaw-tip-count-" + c), d(".-jigsaw-try").attr({clkaction: "POPUP_JIGSAW_SEEDETAIL_CLICK"})), setTimeout(function () {
                                        d(".-jigsaw-try").attr({
                                            href: b.link,
                                            target: "_blank"
                                        }), d(".-jigsaw-try").addClass("-hui-jigsaw-close"), d(".-jigsaw-try").removeClass("-jigsaw-try")
                                    }, 10)
                                }, error: function (a) {
                                }
                            })
                        }, 2e3)
                    })
                }
            })
        }
    }
}), youdao.define("modules/logo/logo.html", function () {
    return ' <li hui-mod="logo" class="hui-shopping-logo hui-active" hui-type="hoverMod">\r\n    <a class="hui-sp hui-sp11" clkaction="BAR_LOGO_MOD_CLICK" hoveraction="BAR_LOGO_MOD_HOVER" hidefocus="true"\r\n    href="http://www.huihui.cn/?keyfrom=zhushou_bar_logo" target="_blank"><span class="hui-sp hui-sp1"></span></a>\r\n    <a href="http://www.huihui.cn/global/cart" target="_blank" class="hui-fix-btn" clkaction="SIDE_DAIGOU_CART_CLICK"><i class="hui-sp hui-sp-shop" data-type="shopcart">0</i><span>���Թ��ﳵ</span></a>\r\n    <a href="http://www.huihui.cn/account/global_order" target="_blank" class="hui-fix-btn order" clkaction="SIDE_DAIGOU_ORDER_CLICK"><i class="hui-sp hui-sp-order"></i><span>���Զ���</span></a>\r\n    <!--<div hui-type="tip" class="hui-shopping-commontips">\r\n        ���׳�Ʒ\r\n    </div>-->\r\n    <div hui-type="light-box" class="hui-logo-menu hui-shopping-lightbox" style="display: none;">\r\n        <div class="hui-shopping-lightbox-hd"></div>\r\n        <ul class="hui-logo-nvlist">\r\n            <li>\r\n                <a target="_blank" href="http://www.huihui.cn/?keyfrom=zhushou_bar_menu" clkaction="BAR_LOGO_MENU_CLICK" data-log-position="huihui">\r\n                    <span class="hui-sp hui-sp32"></span><em>�ݻ���</em>\r\n                </a>\r\n            </li>\r\n            <li class="daigou-menu">\r\n                <a title="���ﳵ" target="_blank" clkaction="BAR_LOGO_CART_CLICK" data-log-position="shoppingCart" href="http://www.huihui.cn/global/cart" target="_blank">\r\n                    <em>���ﳵ(<i data-type="shopcart" class="light">0</i>)</em>\r\n                </a>\r\n            </li>\r\n            <li class="daigou-menu">\r\n                <a title="����" target="_blank" clkaction="BAR_LOGO_ORDER_CLICK" data-log-position="order" href="http://www.huihui.cn/account/global_order">\r\n                    <em>����</em>\r\n                </a>\r\n            </li>\r\n            <li class="hui-setting-btn -chrome-open-set">\r\n                <a title="����" target="_blank" clkaction="BAR_LOGO_MENU_CLICK" data-log-position="setting" href="javascript:;">\r\n                    <span class="hui-sp hui-sp36"></span><em>����</em>\r\n                </a>\r\n            </li>\r\n            <!--<li>\r\n            <a target="_blank" clkaction="BAR_LOGO_MENU_CLICK" data-log-position="help"\r\n                href="http://zhushou.huihui.cn/help?keyfrom=zhushou_bar_menu">\r\n                    <span class="hui-sp hui-sp33"></span><em>ʹ��˵��</em>\r\n                </a>\r\n            </li>-->\r\n            <li>\r\n            <a target="_blank" clkaction="BAR_LOGO_FEEDBACK_CLICK"\r\n                data-log-position="suggest"\r\n                data-log-feature="FEEDBACK"\r\n                href="http://zhushou.huihui.cn/suggest?keyfrom=zhushou_bar_menu">\r\n                    <span class="hui-sp hui-sp34"></span><em>����</em>\r\n                </a>\r\n            </li>\r\n            <!--<li>\r\n            <a target="_blank" clkaction="BAR_LOGO_MENU_CLICK"\r\n                data-log-position="weibo" href="http://e.weibo.com/youdaogouwu?keyfrom=zhushou_bar_menu">\r\n                    <span class="hui-sp hui-sp35"></span><em>�ٷ�΢��</em>\r\n                </a>\r\n            </li>-->\r\n            <!--<li>\r\n                <a target="_blank" href="http://www.huihui.cn/?keyfrom=zs_checkin" clkaction="BAR_LOGO_SIGNIN_CLICK" data-log-position="huihui">\r\n                    <span class="hui-sp hui-sp36-signin"></span><em>ǩ��</em>\r\n                </a>\r\n            </li>-->\r\n        </ul>\r\n    </div>\r\n</li>\r\n\r\n'
}), youdao.define("modules/logo/settingbox.html", function () {
    return ' <div id="YOUDAOGWZS_menu_setting" hui-type="light-box" class="hui-box-setting hui-shopping-lightbox" style="">\r\n    <div class="hui-shopping-lightbox-line"></div>\r\n    <div class="hui-shopping-lightbox-hd hui-color333 hui-fwb">\r\n        <span class="hui-title"><%=title%></span>\r\n        <span class="hui-close GWZS-setting">x</span>\r\n    </div>\r\n    <div class="hui-shopping-lightbox-bd">\r\n        <p class="hui-setting-intro"><%=intro%></p>\r\n        <ul class="hui-setting-items">\r\n            <%for (var item in settingItems) {%>\r\n                <%if (settingItems[item].name) {%>\r\n                    <li class="hui-setting-item">\r\n                        <span class="title"><%=settingItems[item].name + "��"%></span>\r\n                        <label for="<%=settingItems[item].index%>-on">\r\n                            <input type="radio" name="<%=settingItems[item].index%>"\r\n                            id="<%=settingItems[item].index%>-on" clkaction="DIALOG_LOGO_SETTING_<%=settingItems[item].index%>_OPEN_CLICK" value="1" <% if (settingItems[item].value) {%>\r\n                                checked\r\n                            <%} %>> ����\r\n                        </label>\r\n                        <label for="<%=settingItems[item].index%>-off">\r\n                            <input type="radio" name="<%=settingItems[item].index%>"\r\n                            id="<%=settingItems[item].index%>-off"  clkaction="DIALOG_LOGO_SETTING_<%=settingItems[item].index%>_CLOSE_CLICK" value="0"  <% if (!settingItems[item].value) {%>\r\n                                checked\r\n                            <%} %> > �ر�\r\n                        </label>\r\n\r\n                    </li>\r\n                <%}%>\r\n            <%}%>\r\n        </ul>\r\n        <div class="hui-btns">\r\n            <a href="javascript:;"\r\n                clkaction="DIALOG_LOGO_SETTING_CONFIRM_CLICK"\r\n                class="hui-confirm-btn">ȷ&nbsp;&nbsp;��</a>\r\n            <a href="javascript:;"\r\n                clkaction="DIALOG_LOGO_SETTING_CANCEL_CLICK"\r\n                class="hui-cancel-btn">ȡ&nbsp;&nbsp;��</a>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n'
}), youdao.define("modules/logo/logo.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = a("modules/logo/logo.html"), g = e.template(a("modules/logo/settingbox.html")), h = c.require_module("youdao.cache"), i = c.require_module("youdao.consts"), j = c.require_module("youdao.util"), k = c.mod, l = "logo";
    k[l] = {
        template: f, event: function (a) {
            n.init(a)
        }
    };
    var m = {title: "����", intro: "�������������ʷ���ݻݹ�������Ϊ����ѡȫ���ֵ���Ż���Ϣ�������Խ���Щ�Ż���������Ϊ��"}, n = {
        $se: d("#" + i.optionsID),
        conf: {
            els: {
                box: ".hui-box-setting",
                setting: ".hui-setting-btn",
                lightboxSelector: ".hui-logo-menu",
                close: ".hui-close",
                cancel: ".hui-cancel-btn",
                confirm: ".hui-confirm-btn",
                item: ".hui-setting-item",
                btn: ".hui-fix-btn",
                cart: "[data-type=shopcart]"
            }
        },
        init: function (a) {
            var b = this.conf.els, d = h.data.enableHaitao;
            this.delegateEvents(a), this.registerEvents(a);
            var f = h.localConf, g = ["isRecommandOpen", "showIncidentallyBuy", "showJigsaw"];
            e.each(g, function (a, b) {
                void 0 === f[a] && (f[a] = "open")
            }), a.find(".daigou-menu").show(), d && a.find(b.btn).show(), c.ajax({
                baseUrl: i.globaCartURL,
                url: i.globaGetCartCount,
                error: function (a) {
                    console.log(a)
                },
                success: function (c) {
                    "succ" == c.status && a.find(b.cart).text(c.message)
                }
            })
        },
        renderBox: function () {
            d(g(d.extend(m, {
                settingItems: [{
                    name: "����ϲ��",
                    index: "guessReco",
                    value: "open" === h.localConf.isRecommandOpen
                }, {name: "�����ؼ�", index: "specialOffer", value: "open" === h.localConf.showIncidentallyBuy}]
            }))).appendTo("body"), setTimeout(function () {
                var a = "ARMANI_EXTENSION_POPUP", b = "BAR_LOGO_SETTING_TRIGGER";
                if (h.fn && h.fn.sendLog && j.isFunction(h.fn.sendLog)) {
                    var c = document.createElement("div"), d = "";
                    c.setAttribute("params", d), h.fn.sendLog(b, c, a)
                }
            }, 300)
        },
        delegateEvents: function (a) {
            var b = this, c = b.conf.els, e = a.find(c.setting), f = a.find(c.lightboxSelector);
            a.bind("mouseenter", function () {
                f.show()
            }).bind("mouseleave", function () {
                f.hide()
            }).find(c.btn).bind("mouseenter", function (a) {
                a.stopPropagation()
            }).bind("mouseleave", function (a) {
            }), e.bind("click", function (a) {
                if (a.preventDefault(), !h.localConf.isSetPage || "true" !== h.localConf.isSetPage) {
                    if (0 !== d(c.box).length)return;
                    b.renderBox()
                }
            }), d(document).delegate(c.box + " " + c.close, "click", function () {
                d(c.box).remove()
            }), d(document).delegate(c.box + " " + c.cancel, "click", function () {
                d(c.box).remove()
            }), d(document).delegate(c.box + " " + c.confirm, "click", function () {
                var a = {};
                d(c.item).each(function (b, c) {
                    var e = d(c).find('input[type="radio"]:checked');
                    a[e.attr("name")] = e.val()
                });
                var b = "1" === a.guessReco ? "open" : "close";
                h.localConf.isRecommandOpen = b, h.conf.isRecommandOpen = b;
                var e = "1" === a.specialOffer ? "open" : "close";
                h.conf.showIncidentallyBuy = e, h.localConf.showIncidentallyBuy = e;
                var f = "1" === a.game ? "open" : "close";
                h.conf.showJigsaw = f, h.localConf.showJigsaw = f, n.$se.length > 0 && h.localConf && n.$se.html(j.jsonToStr(h.localConf, ";")), d(c.box).remove()
            })
        },
        registerEvents: function (a) {
            var b, c = function (c) {
                clearTimeout(b), b = setTimeout(function () {
                    var b = c.$elem, d = b.attr("hui-mod");
                    d && "logo" === d || a.removeClass(c.hoverCSS)
                }, 200)
            }, e = function (c) {
                clearTimeout(b), b = setTimeout(function () {
                    var b = c.$elem, d = b.attr("hui-mod");
                    d && "logo" === d || a.addClass(c.hoverCSS)
                }, 200)
            }, f = {"enter-mod": c, "leave-mod": e}, g = function (a) {
                a.type && f[a.type] && d.isFunction(f[a.type]) && f[a.type](a)
            };
            a.lMsg("container", g)
        }
    }
}), youdao.define("modules/onceTip/onceTip.html", function () {
    return ' <div hui-box="onceTip" class="hui-fresh-tip hui-info-box <%= tipType %>">\n    <div class="hui-sp hui-bd">\n        <p class="hui-sp hui-fresh-txt"></p>\n    </div>\n    <div class="hui-ft">\n        <a hui-type="box-close" clkAction="POPUP_WELCOME_BUTTON_CLICK" target="_blank"\n            href="<%= targetUrl %>"\n            class="hui-sp hui-fresh-guide">������������</a>\n    </div>\n    <a hui-type="box-close" href="javascript:void(0);" clkAction="POPUP_WELCOME_CLOSE_CLICK" title="�ر�" class="hui-sp hui-box-close">X</a>\n    <span class="hui-box-corner"></span>\n</div>\n'
}), youdao.define("modules/onceTip/onceTip.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = a("modules/onceTip/onceTip.html"), g = c.require_module("youdao.cache"), h = c.require_module("youdao.consts"), i = c.require_module("youdao.util"), j = (h.commonName, c.reg("oncetip")), k = function (a) {
        var b = {
            tmpl: a,
            mainDom: "div[hui-mod='container']"
        }, f = "api/zhushou/token.json", h = "http://zhushou.huihui.cn/installed?type=welcome", j = g.localConf || {}, k = {vendor: j.vendor || "dictkunbang"};
        c.ajax({
            url: f, params: k, success: function (a) {
                var c, f;
                a.token ? (c = h + "&token=" + a.token, f = "hui-withCoupons") : (c = h, f = "hui-withOutCoupons");
                var j = e.template(b.tmpl)({
                    targetUrl: c,
                    tipType: f
                }), k = "ARMANI_EXTENSION_POPUP", l = "POPUP_WELCOME_TRIGGER";
                if (g.fn && g.fn.sendLog && i.isFunction(g.fn.sendLog)) {
                    var m = document.createElement("div"), n = "tipType=" + f;
                    m.setAttribute("params", n), g.fn.sendLog(l, m, k)
                }
                d(b.mainDom).append(j)
            }, error: function () {
                var a, c;
                a = h, c = "hui-withOutCoupons";
                var f = e.template(b.tmpl)({targetUrl: a, tipType: c});
                d(b.mainDom).append(f)
            }
        })
    };
    j.listen("debug", function () {
        k(f), console.log("debug @ onceTip")
    }), j.send("onceTip", {
        type: "pop-up", callback: function () {
            var a = !1, b = g.localConf.state || "normal";
            if ("install" === b) {
                if (g.data && g.data.ishide)return;
                if (!/http:\/\/zhushou\.huihui\.cn\/installed/g.test(document.referrer)) {
                    var d = "api/zhushou/getcookie", e = {key: "visit_installed_page"};
                    c.ajax({
                        url: d, params: e, success: function (a) {
                            a.value || k(f)
                        }
                    }), a = !0
                }
                g.localConf.state = "normal"
            }
            var j = document.getElementById(h.optionsID);
            return j && g.localConf && (j.innerHTML = i.jsonToStr(g.localConf, ";")), a
        }
    })
}), youdao.define("modules/onekey/onekey.html", function () {
    return ' <li hui-mod="onekey" id="hui-onekey" hui-type="hoverMod" class="hui-button-bar-wrapper ">\r\n    <div hui-type="tip" class="hui-shopping-commontips">\r\n        �����ۿ�<div class="hui-sp hui-sp22"></div>\r\n    </div>\r\n    <div class="hui-new-onekey-icon"></div>\r\n    <a  class="hui-button-bar"\r\n        target="_blank" clkaction="BAR_ONEKEY_MOD_CLICK"  hoveraction="BAR_ONEKEY_MOD_HOVER" data-log-feature="ONEKEY"\r\n        href="http://www.huihui.cn/Global?keyfrom=zhushou_bar_haitao">\r\n            <span class="hui-button-bar-tip"></span>\r\n            <div class="hui-button-bar-title">һ������</div>\r\n    </a>\r\n    <!--<div class="hui-shopping-lightbox">\r\n        <a href="http://zhushou.huihui.cn/?keyfrom=zhushou_bar_ht" target="_blank"><img src="http://shared.ydstatic.com/gouwuex/images/extension_3_1/app_coupon.jpg"></a>\r\n        &lt;!&ndash;<div class="hui-shopping-lightbox-hd"></div>\r\n        <div class="hui-shopping-lightbox-bd">\r\n            <div class="hui-onekey-cont-hd">\r\n                <h5 class="hui-onekey-cont-hd-title">���Ծ�ѡ</h5>\r\n            </div>\r\n            <div class="hui-onekey-cont-bd">\r\n                <ul class="hui-onekey-cont-frame"></ul>\r\n            </div>\r\n            <div class="hui-onekey-cont-ft">\r\n                <a class="hui-button hui-button-star hui-button-star-valid" clkaction="BAR_FAVOR_SUBED_CLICK" href="http://www.huihui.cn/Global?keyfrom=zhushou_bar_btn_haitao" target="_blank">\r\n                    <span>�鿴ȫ��</span>\r\n                </a>\r\n            </div>\r\n        </div>&ndash;&gt;\r\n    </div>-->\r\n</li>\r\n<div class="hui-onekey-tip">\r\n    <a class="hui-onekey-tip-bg" clkaction="BAR_ONEKEY_TIP_CLICK" ></a>\r\n    <i class="hui-onekey-tip-close" clkaction="BAR_ONEKEY_TIP_CLOSE_CLICK"></i>\r\n</div>\r\n'
}), youdao.define("modules/onekey/onekey.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = (c._, a("modules/onekey/onekey.html")), f = c.require_module("youdao.cache"), g = c.require_module("youdao.util"), h = c.require_module("youdao.consts"), i = c.mod, j = "onekey";
    i[j] = {
        template: e, event: function (a) {
            var b = "ARMANI_EXTENSION_POPUP", c = "POPUP_ONEKEY_TRIGGER";
            if (f.fn && f.fn.sendLog && g.isFunction(f.fn.sendLog)) {
                var e = document.createElement("div");
                f.fn.sendLog(c, e, b)
            }
            if (k(a), f.data && f.data.isShowHaitaoDiscountTip && !f.data.isShowHaitaoBarTip) {
                var h = d("[hui-mod=onekey] div[hui-type=tip]");
                a.sMsg({type: "showTips", $tip: h})
            }
        }
    };
    var k = function (a) {
        if (f.data && f.data.isShowHaitaoBarTip === !0)d(".hui-onekey-tip").show(), d(document).delegate(".hui-onekey-tip,.hui-onekey-tip-close", "click", function (a) {
            var b = d(this);
            b.hasClass("hui-onekey-tip") && window.open("http://www.huihui.cn/haitao?keyfrom=zhushou_bar_haitao_tip"), d(".hui-onekey-tip").hide();
            var e = {baseUrl: h.baseUrl, url: "api/haitao/bar/tip/close"};
            c.ajax(e)
        }); else if (f.data && f.data.isShowHaitaoDiscountTip) {
            var b = a.find(".hui-button-bar"), e = b.attr("href"), g = b.attr("clkaction");
            b.attr("href", e + "B").attr("clkaction", g + "_B").click(function () {
                a.find("[hui-type=tip]").hide();
                var b = {baseUrl: h.baseUrl, url: "/api/haitao/bar/discount-tip/close"};
                c.ajax(b)
            })
        }
    }
}), youdao.define("modules/plugin_container/plugin_container.html", function () {
    return ' <ul id="hui-plugin" class="hui-clearfix hui-plugin<% if (is6pm){ %> hui-plugin-6pm<% } %><% if (isSmall){ %> hui-plugin-small<% } %><% if (isHideHistroyTxt){ %> hui-plugin-hide-txt<% } %>">\r\n        <li id="hui-plugin-logo" class="hui-btn hui-new-sp"></li>\r\n        <%= pluginHaitaoHtml %>\r\n        <%= pluginHistoryHtml %>\r\n        <%= pluginBijiaHtml %>\r\n        <%= pluginCollectionHtml %>\r\n        <%= pluginDaigouHtml %>\r\n\r\n</ul>\r\n'
}), youdao.define("modules/plugin_daigou/plugin_daigou.html", function () {
    return ' <!--����begin-->\r\n<% var notWhite = !daigouData.isWhiteCategory || daigouData.isWhiteCategory == "failed"; /*���ǰ�����*/ %>\r\n\r\n<% var notAvailable = captureInfo.notavailable && captureInfo.notavailable != "failed";  /*ȱ��*/ %>\r\n\r\n<% var isRetailer = captureInfo.retailerName && captureInfo.retailerName!="failed" &&  captureInfo.retailerName.toLocaleLowerCase().indexOf("amazon") < 0 && (!captureInfo.fulfilledName || (captureInfo.fulfilledName !="failed" && captureInfo.fulfilledName.toLocaleLowerCase().indexOf("amazon") < 0)); /*���ǵ��������*/ %>\r\n\r\n<% var isAmazon = captureInfo.retailerName && (captureInfo.retailerName.toLocaleLowerCase().indexOf("amazon")>-1 || captureInfo.retailerName == "failed"); /*����ѷ��Ӫ*/ %>\r\n\r\n<% var notPrice = daigouData.price == "" || daigouData.price == "failed"; /*û�м۸���Ʒ*/ %>\r\n\r\n<% var country = daigouData.site && daigouData.site.indexOf("co.jp")>-1 ? "�ձ�" : "����"; /*û�м۸���Ʒ*/ %>\r\n\r\n<% var unit = daigouData.site && daigouData.site.indexOf("co.jp")>-1 ? "?" : "$"; /*��Ʒ����*/ %>\r\n\r\n<% var freeShipping = captureInfo.shipping && (captureInfo.shipping.toLocaleLowerCase().replace("�o��","free").indexOf("free")>-1 || (daigouData.shippingPrices && daigouData.shippingPrices.localShippingPrice == 0)); /*���˷�*/ %>\r\n\r\n<% var isChaoZhong = daigouData.itemWeight > 30000; /*�Ƿ���*/ %>\r\n\r\n<% if(country== "�ձ�"){daigouData.daigouTax=0;}%>\r\n\r\n<% var isJpPrice = country == "�ձ�" && daigouData.price >= 200000 /* ���Ǽ۸�20�� */%>\r\n\r\n<li id="hui-plugin-daigou" class="hui-btn<% if (notWhite || notAvailable || isChaoZhong || notPrice || isJpPrice ){ %> hui-btn-disabled<% } %><% if (isRetailer && !daigouData.isThirdpartyMerchant2Whiten) {%> hui-btn-isretailer <%}%>" hui-plugin-type="clickMod">\r\n<a href="javascript:" target="_blank" <% if(!notWhite && !isRetailer) {%> clkaction="PLUGIN_DAIGOU_BUY_CLICK" hoveraction="PLUGIN_DAIGOU_BUY_HOVER"<% } %> data-log-feature="DAIGOU" outfrom="zhushou_bar_haitao" class="hui-daigou-total-price"\r\n        style="<% if (!daigouData.selectedSize || notPrice) {%> cursor:default <% } %>">\r\n            <i class="hui-new-sp hui-sp-plane"></i>\r\n            <span class="hui-daigou-conversion-title">һ������</span>\r\n            <span class="hui-daigou-conversion-price">?<span class="hui-daigou-total-yuan-price"><% if (notPrice){ %>����\r\n            <% } else { %><%= parseFloat(daigouData.daigouPrice) + parseFloat(daigouData.daigouTax) %>\r\n            <% } %>\r\n            </span></span>\r\n    </a>\r\n    <div id="hui-daigou-undisposed-aletr-dialog" class="hui-btn-cancel" style="display:none">\r\n        <!--<i class="hui-new-sp"></i>-->\r\n        <span>��ѡ������Ʒ<strong>��ɫ����</strong>����Ϣ��������Ŷ��</span>\r\n    </div>\r\n    <div class="daigou-detail" hui-plugin-type="daigouHover">\r\n        <% if (!daigouData.isWhiteCategory) { %>\r\n        <div class="inner">\r\n            <%= daigouData.tips %>\r\n        </div>\r\n        <% } else if (daigouData.isWhiteCategory == "failed") {%>\r\n        <div class="inner">\r\n            ��Ǹ������Ʒδ��¼����ʱ���ܺ��ԣ����ղ�������~\r\n        </div>\r\n        <% } else if (notAvailable){ %>\r\n        <div class="inner">\r\n            ��Ǹ����<span class="text-red">��Ʒȱ��</span>����ʱ�޷����ԣ������ղ�������\r\n        </div>\r\n        <% } else if (isChaoZhong){ %>\r\n        <div class="inner">\r\n            ��Ǹ����<span class="text-red">��Ʒ����</span>����ʱ�޷����ԣ�\r\n        </div>\r\n        <% } else if (isJpPrice) { %>\r\n        <div class="inner">\r\n            ��Ǹ����<span class="text-red">��Ʒ�۸����</span>�����ں������˷��գ���ʱ�޷����ԣ�\r\n        </div>\r\n        <% } else if (notPrice){ %>\r\n        <div class="inner">\r\n            ��Ǹ������Ʒҳ��<span class="text-red">û�б�ע�۸�</span>����ʱ�޷����ԣ�\r\n        </div>\r\n        <% } else if (!notPrice){ %>\r\n        <div class="inner">\r\n            <% if (isRetailer && !daigouData.isThirdpartyMerchant2Whiten) {%>\r\n                <p>����ƷΪ���������۲����ˣ����ܴ���<span class="text-red">���������ӳ١������޷����١������</span>�ȵ����⡣</p>\r\n                <p><span class="text-red">*</span>��ֹ���<span class="text-red">�����������˳е�</span>���ݻ�<span class="text-red">�����ܴ˵��κ����ɵ��˿���˻�����</span></p>\r\n                <a href="javascript:" target="_blank" clkaction="PLUGIN_DAIGOU_CONFIRM_BUY_CLICK" data-log-raitername="<%=captureInfo.retailerName%>" class="confirm-daigou">��ֹ���</a>\r\n            <% } %>\r\n            <% if (daigouData.site.indexOf("6pm") > -1) {%>\r\n                <p class="tips text-green">6pmҳ���桢�۸���²���ʱ��������ȱ�����Ǽ��Իݻ�֪ͨΪ׼�������⡣</p>\r\n            <% } %>\r\n            <% if (daigouData.isWhiteCategory) { %>\r\n                <p><%= daigouData.tips %></p>\r\n            <% } %>\r\n            <p>\r\n                <span class="fl">��Ʒ���ۣ�</span>\r\n                <span class="fr">��<%= daigouData.itemYuanPrice %><span class="text-gray">��<%if(country=="�ձ�"){%><%= daigouData.itemDollarPrice %>��Ԫ<%}else{%><%= unit %><%= daigouData.itemDollarPrice %><%}%>)</span></span>\r\n            </p>\r\n            <p>\r\n                <span class="fl"><%= country %>�����˷ѣ�</span>\r\n                <span class="fr">��<%= daigouData.freightYuanPrice %><% if (daigouData.freightYuanPrice == 0){ %><span class="text-gray">�����˷ѣ�</span><% } %></span>\r\n            </p>\r\n            <p>\r\n                <span class="fl">Ԥ��ת�˷ѣ�</span>\r\n                <span class="fr">��<%= daigouData.transferPrice %>\r\n                    �����ٲ���\r\n                    <span class="hui-new-sp hui-new-help transfer-help">\r\n                        <span>Ԥ��ת�˷ѣ���ʵ�����������ٲ�����<a href="\r\nhttp://www.huihui.cn/help/haitao#q17" target="_blank">�鿴�������</a></span>\r\n                    </span>\r\n                </span>\r\n            </p>\r\n            <p>\r\n                <span class="fl"><%if(country!="�ձ�"){%>Ԥ��<%}%>��˰��</span>\r\n                <span class="fr">\r\n                    <%if(country=="�ձ�"){%>\r\n                    <a href="http://www.huihui.cn/help/haitao#q9" target="_blank">�鿴��˰����</a>\r\n                    <%}else{%>\r\n                    ��<%= daigouData.daigouTax %><% if (daigouData.daigouTax == 0){ %><span class="text-gray">�����˰��</span><%}%><%}%></span>\r\n            </p>\r\n            <p>\r\n                <span class="fl"><strong>�ݻݵ��ּۣ�</strong></span>\r\n                <span class="fr text-red">��<%= parseFloat(daigouData.daigouPrice) + parseFloat(daigouData.daigouTax) %></span>\r\n            </p>\r\n            <p class="days">\r\n                Ԥ���ʹ�ʱ�䣺<a  class="hui-new-sp hui-new-days transfer-help" href="http://www.huihui.cn/help/haitao#q8" target="_blank"></a><br><%= daigouData.estimateArrivalDate %><br>\r\n                <span>�̼ҷ�����<%= daigouData.merchandiseTime %><br>�������ͣ�<%= daigouData.logisticsTime %></span>\r\n            </p>\r\n        </div>\r\n        <% } %>\r\n    </div>\r\n</li>\r\n<li id="hui-plugin-daigou-promotions" class="daigou-promotions" \r\nstyle="<%if(daigouData.haitaoYouhuiList){%> display:block <%}%>">\r\n    <div class="daigou-promotions-content">\r\n        <span class="daigou-promotions-ico"><span class="ico2"></span></span>\r\n        <span class="ico-yhui">�Ż�</span>\r\n        <% var youhuiList = daigouData.haitaoYouhuiList %>\r\n        <% _.each(youhuiList,function(ele,idx){ %>\r\n            <% if (!ele.forMobile) {%>\r\n                <p class="yhui">\r\n                    <% if(ele.url){ %>\r\n                        <a href="<%= ele.url %>" target="_blank"><%= ele.title %></a>\r\n                    <% } else { %>\r\n                        <%= ele.title %>\r\n                    <% } %>\r\n                </p>\r\n            <% } else {%>\r\n                <p class="app">\r\n                    <% if(ele.url){ %>\r\n                        <a href="<%= ele.url %>" target="_blank"><%= ele.title %></a>\r\n                    <% } else { %>\r\n                        <%= ele.title %>\r\n                    <% } %><span class="download-app"><em class="download-app-pic"><img src="<%= ele.imgUrl %>" width="200" height="200" alt=""></em></span>\r\n                </p>\r\n            <% }%>\r\n        <% }) %>\r\n    </div>\r\n</li>\r\n<li class="daigou-tip-lists" id="hui-plugin-daigou-tips">\r\n    <% if (daigouData.site.indexOf("amazon") > -1){ %>\r\n    <% if (isAmazon){ %>\r\n    <div class="daigou-tip">\r\n        <i class="hui-new-sp hui-new-ziying"></i>��Ӫ\r\n        <div class="daigou-tip-box"><div><%= daigouData.siteNameCn %>��Ӫ��ֵ��������</div></div>\r\n    </div>\r\n    <% } else { %>\r\n    <div class="daigou-tip">\r\n        <i class="hui-new-sp hui-new-san"></i>������\r\n        <div class="daigou-tip-box"><div>�������̼ң��µ������</div></div>\r\n    </div>\r\n    <% } %>\r\n    <% } %>\r\n    <% if (freeShipping){ %>\r\n    <div class="daigou-tip">\r\n        <i class="hui-new-sp hui-new-free-shipping"></i>��<%= country %>�˷�\r\n        <div class="daigou-tip-box">\r\n            <div><%= daigouData.siteNameCn %>�н�<%= country %>������������һ�����ԣ����ż�������<%= country %>�����˷ѣ�</div>\r\n        </div>\r\n    </div>\r\n    <% } else if(captureInfo.shipping) { %>\r\n    <div class="daigou-tip">\r\n        <i class="hui-new-sp hui-new-shipping"></i><%= country %>�˷�\r\n        <div class="daigou-tip-box">\r\n            <div>�������̼ҳн�<%= country %>������������Ҫ֧����Ӧ��<%= country %>�����˷�Ŷ��</div>\r\n        </div>\r\n    </div>\r\n    <% } %>\r\n    <% if ((captureInfo.hasSizeSelector && captureInfo.hasSizeSelector != "failed") || (captureInfo.goodsSize && captureInfo.goodsSize != "failed")){ %>\r\n    <div class="daigou-tip tip-size">\r\n        <a href="http://www.huihui.cn/help/chima" target="_blank" hoveraction="SIZE_HELP_HOVER">\r\n            <i class="hui-new-sp hui-new-size"></i>�������\r\n        </a>\r\n        <div class="daigou-tip-box" id="-daigou-size">\r\n        </div>\r\n    </div>\r\n    <% } %>\r\n    <% if (daigouData.promotionData){ %>\r\n    <div class="daigou-tip">\r\n        <i class="hui-new-sp hui-new-cu"></i>�����\r\n        <div class="daigou-tip-box"><div><%= daigouData.promotionData.info%></div></div>\r\n    </div>\r\n    <% } %>\r\n    <div class="daigou-tip">\r\n        <i class="hui-new-sp hui-new-translate"></i>�������\r\n        <div class="daigou-tip-box">\r\n            <div>\r\n                <label class="daigou-tip-lable"><input type="checkbox" id="swipe-translate"<% if (daigouData.swipeTranslate == "open"){ %> checked<% } %>>�������ʷ���</label>\r\n                <% if(country== "�ձ�"){%>\r\n                    <label class="daigou-tip-lable"><input type="checkbox" id="crumb-translate"<% if (daigouData.crumbTranslate == "open"){ %> checked<% } %>>������Ʒ�����</label>\r\n                <% }%>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</li>';
}), youdao.define("modules/plugin_daigou/plugin_daigou_success.html", function () {
    return ' <div id="hui_plugin_success_in_daigou" class="success-info">\r\n    <span>�ɹ����뵽���Թ��ﳵ��</span>\r\n    <a href="http://www.huihui.cn/global/cart" target="_blank" class="higligth pull-right">ȥ���ﳵ���� <i>>></i></a>\r\n</div>'
}), youdao.define("modules/priceCanvas/priceCanvas.html", function () {
    return ' <canvas class="hui-history-axis" width="350" height="180"></canvas>\r\n<canvas class="hui-history-curve" width="350" height="180"></canvas>\r\n<canvas class="hui-history-canvas-tooltip" note-type="tooltip-pointe" width="350" height="180" ></canvas>\r\n<div class="hui-history-labels">\r\n    <div class="hui-history-time-axis"></div>\r\n    <div class="hui-history-price-axis"></div>\r\n</div>\r\n<div class="hui-history-most-price"></div>'
}), youdao.define("modules/priceCanvas/canvas_tooltip.html", function () {
    return ' <div class="canvas-tooltip">\r\n    <div class="tt">\r\n        <span class="date"><%= start%></span>\r\n        <strong><%= priceunitSymbol%><%= price%></strong>\r\n    </div>\r\n    <% if(pro){ %>\r\n    <div class="hc">\r\n        <p><%= info%></p>\r\n        <% if(discount){%>\r\n        <p>����<%= discount%>�۵��ּ� <strong><%= priceunitSymbol%><%= (discount/10 * price).toFixed(2)%></strong></p>\r\n        <%}%>\r\n    </div>\r\n    <% } %>\r\n</div>'
}), youdao.define("modules/priceCanvas/priceCanvas.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = (a("modules/priceCanvas/priceCanvas.html"), a("modules/priceCanvas/canvas_tooltip.html")), g = c.require_module("youdao.cache"), h = c.require_module("youdao.util"), i = (c.mod, c.reg("plugHistory")), j = "https:" == location.protocol ? "//shared.ydstatic.com/gouwuex/images/extension_3_1/".replace(/shared\./gi, "shared-https.") : "//shared.ydstatic.com/gouwuex/images/extension_3_1/", k = location.protocol + j + "canvas-cu.png", l = {
        priceAverage: function (a, b) {
            void 0 === b && (b = a);
            var c, d = l.SUB(a, b);
            if (0 !== d) {
                switch (c = 1 > d ? 0 : Math.round(d).toString().length) {
                    case 0:
                        for (var e = Math.ceil(2 * d * 10) / 10, f = e, g = Math.ceil(10 * (a + Math.round((f - d) / 2 * 10) / 10)) / 10; a >= g;)g = l.Add(g, .1), f = l.Add(f, .1);
                        for (; l.SUB(g, f) >= b;)f = l.Add(f, .1);
                        var h = l.priceEqual(g, f, !0);
                        break;
                    case 1:
                        for (var e = Math.ceil(d * (11 / 8)), f = e, g = Math.ceil(a + Math.ceil((f - d) / 2)); l.SUB(g, e) >= b;)g--;
                        for (; a >= g;)g++, f++;
                        (11 === f || 7 === f || 13 === f || 17 === f) && f++;
                        var h = l.priceEqual(g, f);
                        break;
                    case 2:
                        var e = Math.ceil(d * (11 / 8)), f = Math.ceil(e / Math.pow(10, c - 1)) * Math.pow(10, c - 1), g = 5 * Math.ceil(Math.ceil((a + (f - d) / 2) / 5)), h = l.priceEqual(g, f);
                        break;
                    case 3:
                        var e = Math.round(d * (11 / 8)), f = Math.ceil(e / Math.pow(10, c - 1)) * Math.pow(10, c - 1), g = 50 * Math.round((a + (f - d) / 2) / 50), h = l.priceEqual(g, f);
                        break;
                    default:
                        var e = Math.round(d * (11 / 8)), f = Math.ceil(e / Math.pow(10, c - 1)) * Math.pow(10, c - 1), g = Math.round((a + (f - d) / 2) / (5 * Math.pow(10, c - 2))) * (5 * Math.pow(10, c - 2)), h = l.priceEqual(g, f)
                }
                return h.reverse()
            }
            if (a >= 1)var c = Math.ceil(a).toString().length, g = Math.round(a / Math.pow(10, c - 1)) * Math.pow(10, c - 1) * 2, f = g, h = l.priceEqual(g, f); else {
                var g = Math.ceil(2 * a * 10) / 10;
                .7 === g && (g = .8), 1.1 === g && (g = 1.2), 1.3 === g && 1.4 === g && (g = 1.5), g > 1.5 && 2 > g && (g = 2);
                var f = g, h = l.priceEqual(g, f, !0)
            }
            return h.reverse()
        }, priceEqual: function (a, b, c) {
            var d = [], e = 3;
            if (c = c ? c : !1, (3 > b || c === !0) && (c = !0), c === !1) {
                for (; b % e !== 0 && e >= 3 && 7 >= e;)e++;
                var f = b / e, g = a;
                d.push(a);
                for (var h = 1; e >= h; h++)g -= f, d.push(g)
            } else {
                e = 7;
                for (var i = 10 * b; i % e !== 0 && e >= 3 && 7 >= e;)e--;
                var f = i / e / 10, g = a;
                d.push(a);
                for (var h = 1; e >= h; h++)g = l.SUB(g, f), d.push(g)
            }
            return d.reverse(), d
        }, SUB: function (a, b) {
            var c, d, e, f;
            try {
                c = a.toString().split(".")[1].length
            } catch (g) {
                c = 0
            }
            try {
                d = b.toString().split(".")[1].length
            } catch (g) {
                d = 0
            }
            return e = Math.pow(10, Math.max(c, d)), f = c >= d ? c : d, parseFloat(((a * e - b * e) / e).toFixed(f))
        }, Add: function (a, b) {
            var c, d, e;
            try {
                c = a.toString().split(".")[1].length
            } catch (f) {
                c = 0
            }
            try {
                d = b.toString().split(".")[1].length
            } catch (f) {
                d = 0
            }
            return e = Math.pow(10, Math.max(c, d)), (a * e + b * e) / e
        }, daysAverage: function (a, b, c) {
            function d(a, b) {
                function c(a) {
                    return a % 4 != 0 || a % 100 == 0 && a % 400 != 0 ? !1 : !0
                }

                function d(a, b, c, d, e, f) {
                    return d > a ? !0 : a == d ? e > b ? !0 : b == e && f >= c ? !0 : !1 : !1
                }

                var e = /^(\d{1,4})[-|\.]{1}(\d{1,2})[-|\.]{1}(\d{1,2})$/, f = [0, 3, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1];
                e.test(a);
                var g = RegExp.$1, h = RegExp.$2, i = RegExp.$3;
                e.test(b);
                var j = RegExp.$1, k = RegExp.$2, l = RegExp.$3;
                if (d(g, h, i, j, k, l)) {
                    for (var m = new Date(g, h, i), n = new Date(j, k, l), o = Math.floor((n.getTime() - m.getTime()) / 864e5), p = g; j >= p; p++) {
                        c(p) ? f[1] = 2 : f[1] = 3;
                        for (var q = h - 1; k > q; q++)o -= f[q]
                    }
                    return o
                }
            }

            var e = d(a, b);
            return e / c
        }, daysRange: function (a, b, c) {
            Date.prototype.Format = function (a) {
                var b = {"M+": this.getMonth() + 1, "d+": this.getDate()};
                /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var c in b)new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
                return a
            };
            var d = [], e = this.daysAverage(a, b, c), a = new Date(a).getTime(), b = new Date(b).getTime(), f = 864e5;
            d.push(new Date(b).Format("M-dd"));
            for (var g = 1; c > g; g++) {
                var h = b, i = parseInt(g * e) * f;
                h -= i, d.push(new Date(h).Format("M-dd"))
            }
            return d.push(new Date(a).Format("M-dd")), d
        }, timeDiff: function (a, b) {
            var c = a.split("-"), d = new Date(c[1] + "/" + c[2] + "/" + c[0]), e = b.split("-"), f = new Date(e[1] + "/" + e[2] + "/" + e[0]);
            return parseInt(Math.abs(d - f) / 1e3 / 60 / 60 / 24)
        }, binarySearch: function (a, b, c, d) {
            if (a && b instanceof Array) {
                var e = b.length, c = "number" == typeof c ? c : 0, d = "number" == typeof d ? d : e - 1, f = Math.floor((c + d) / 2), g = b[f];
                return c > d ? c - 1 : g === a ? f : g > a ? l.binarySearch(a, b, c, f - 1) : l.binarySearch(a, b, f + 1, d)
            }
        }, priceCurveCoords: function (a) {
            var b = a.list, c = a.showMinPrice, e = (a.curTime, a.startTime);
            a.showTimeRange = l.timeDiff(a.startTime, a.curTime);
            var f = [];
            return d.each(b, function (d) {
                var g = l.timeDiff(e, this.time), h = Math.round(l.timeDiff(e, this.time) / a.showTimeRange * 300), i = -Math.round((this.price - c) / a.showPriceRange * 160);
                if (f.push([h, i]), this.price === a.priceMax && (a.priceMaxCoord = i), a && a.priceMin && this.price === a.priceMin && (a.priceMinCoord = i), g !== a.showTimeRange)if (b.length !== d + 1) {
                    var j = Math.round(l.timeDiff(e, b[d + 1].time) / a.showTimeRange * 300) - 1;
                    f.push([j, i])
                } else f.push([300, i])
            }), f
        }, promotionCoords: function (a, b) {
            var c = b.showMinPrice, e = (b.curTime, b.startTime), f = b.list, h = [], i = [];
            d.each(f, function () {
                h.push(this.price);
                var a = this.time.replace(/-0/g, "-").split("-");
                i.push(Date.UTC(a[0], a[1], a[2]))
            });
            var j = [], k = g.data.thisPrice.priceunitSymbol;
            return d.each(b.list, function (a) {
                var d = {}, f = this.time.replace(/-0/g, "-").split("-");
                Date.UTC(f[0], f[1], f[2]);
                d.start = this.time, d.price = this.price, d.priceunitSymbol = k, d.pro = !1, d.X = Math.round(l.timeDiff(e, this.time) / b.showTimeRange * 300), d.Y = -Math.round((d.price - c) / b.showPriceRange * 160), j.push(d)
            }), a && a.length && d.each(a, function (a) {
                var d = {}, f = this.start.replace(/-0/g, "-").split("-"), g = Date.UTC(f[0], f[1], f[2]), m = l.binarySearch(g, i);
                d.price = h[m], d.X = Math.round(l.timeDiff(e, this.start) / b.showTimeRange * 300), d.Y = -Math.round((d.price - c) / b.showPriceRange * 160), d.discount = this.promoDiscount, d.info = this.info, d.name = this.name, d.start = this.start, d.pro = !0, d.priceunitSymbol = k, j.push(d)
            }), j
        }, drawDashLine: function (a, b, c, d) {
            if (void 0 === d)var e = -2, f = 302; else var e = 0, f = d;
            for (var c = void 0 === c ? 5 : c, g = f - e, h = 0, i = Math.floor(Math.sqrt(g * g + h * h) / c), j = 0; i > j; j++)j % 2 === 0 ? a.moveTo(e + g / i * j, b + h / i * j) : a.lineTo(e + g / i * j, b + h / i * j);
            a.stroke()
        }, drawTooltipPoint: function (a, b, c) {
            var e = d(a).find("[note-type=tooltip-pointe]").get(0), f = e.getContext("2d");
            f.fillStyle = "#ffffff", f.beginPath(), f.arc(b, c, 5, 0, 2 * Math.PI, !0), f.closePath(), f.fill(), f.fillStyle = "#fd6802", f.beginPath(), f.arc(b, c, 3, 0, 2 * Math.PI, !0), f.closePath(), f.fill()
        }, clearTooltipPoint: function (a) {
            var b = d(a).find("[note-type=tooltip-pointe]").get(0), c = b.getContext("2d");
            c.clearRect(0, 0, 350, 180)
        }, chooseBestPromotion: function (a, b) {
            var c, e, f = a.length, g = [], h = {}, i = [], j = d(b).find(".hui-history-curve").get(0), l = new Image;
            l.src = k;
            for (var m = 0; f > m; m++)if (c = a[m], c.pro) {
                for (var n = 0; f > n; n++)e = a[n], c.X == e.X && c.Y == e.Y && (!c.discount && e.discount || c.discount && e.discount && c.discount > e.discount) && (c = e);
                (!h[c.X + "|" + c.Y] || h[c.X + "|" + c.Y] && c.pro) && (h[c.X + "|" + c.Y] = !0, g.push(c), i.push(c))
            } else h[c.X + "|" + c.Y] || (h[c.X + "|" + c.Y] = !0, g.push(c));
            return l.onload = function () {
                for (var a = j.getContext("2d"), b = 0; b < i.length; b++)i[b].pro && a.drawImage(l, i[b].X - 8, i[b].Y - 22)
            }, g
        }, closeCollectionWelcome: function (a) {
            var b = "#hui-history-canvas" == a ? "BAR_HISTORY_MOD_HOVER_PROMOREC_HOVER" : "PLUGIN_HISTORY_MOD_HOVER_PROMOREC_HOVER";
            return this.sendLog(b), g.localConf.closedBefore ? !1 : void i.send("closeCollectionWelcome")
        }, sendLog: function (a, b) {
            if (b || (b = "ARMANI_EXTENSION_POPUP"), g.fn && g.fn.sendLog && h.isFunction(g.fn.sendLog)) {
                var c = document.createElement("div");
                g.fn.sendLog(a, c, b), c = null
            }
        }, initTooltip: function (a, b) {
            function c(a, b) {
                for (var c, d, e = a[0], f = 0; f < a.length; f++)d = Math.abs(e.X - b), c = Math.abs(a[f].X - b), (d > c || d == c && a[f].pro) && (e = a[f]);
                return e
            }

            var g = this, h = d(a).find("[note-type=tooltip-pointe]");
            if (b && 0 != b.length) {
                var i, j, k = g.chooseBestPromotion(b, a);
                h.bind("mousemove", function (b) {
                    var h, l, m, n, o, p = d(this).offset(), q = b.pageX - p.left, r = (b.pageY - p.top, c(k, q - 45));
                    h = r.X + 45, l = r.Y + 160, i && clearTimeout(i), i = setTimeout(function () {
                        g.clearTooltipPoint(a), g.drawTooltipPoint(a, h, l), j != r && r.pro && (g.closeCollectionWelcome(a), j = r), n = e.template(f)(r), o = d(a).find(".canvas-tooltip"), 0 == o.length ? d(a).append(n) : o.html(d(n).html()), m = o.outerWidth(!0), d(a).css("cursor", "pointer"), h >= 250 ? o.addClass("right").css({
                            left: h - m,
                            top: l + 12
                        }).fadeIn("fast") : o.removeClass("right").css({left: h, top: l + 12}).fadeIn("fast")
                    }, 10)
                }), h.bind("mouseleave", function (b) {
                    return d(b.toElement).hasClass("canvas-tooltip") ? !1 : (i && clearTimeout(i), d(a).css("cursor", "auto").find(".canvas-tooltip").hide(), void g.clearTooltipPoint(a))
                })
            }
        }, mostPriceInit: function (a) {
            var b = a.length;
            if (b >= 2) {
                for (var c = [], d = 0; b--;)c.push(a[d].price), d++;
                c.sort(function (a, b) {
                    return a > b ? 1 : -1
                }), g.data.priceHistoryData.priceMax = c.pop(), c.length > 0 && c[0] !== g.data.priceHistoryData.priceMax && (g.data.priceHistoryData.priceMin = c[0])
            }
        }, init: function (a, b) {
            if (d(a).length) {
                var c = this, f = d(a);
                b.priceMax || c.mostPriceInit(b.list);
                var h = f.find(".hui-history-axis").get(0);
                if (h.getContext) {
                    var i = h.getContext("2d");
                    i.beginPath(), i.translate(45.5, .5), i.strokeStyle = "#DEDEDE", i.lineWidth = 1, i.moveTo(0, -2), i.lineTo(0, 162), i.stroke(), i.closePath(), i.beginPath(), i.strokeStyle = "#efefef", i.moveTo(50, 0), i.lineTo(50, 160), i.stroke(), i.moveTo(100, 0), i.lineTo(100, 160), i.stroke(), i.moveTo(150, 0), i.lineTo(150, 160), i.stroke(), i.moveTo(200, 0), i.lineTo(200, 160), i.stroke(), i.moveTo(250, 0), i.lineTo(250, 160), i.stroke(), i.moveTo(300, 0), i.lineTo(300, 160), i.stroke();
                    var j = [325, 275, 225, 175, 125, 75, 25], k = c.daysRange(b.startTime, b.curTime, 6), l = "";
                    d.each(e.zip(k, j), function (a, b) {
                        l += '<div class="hui-history-time-label" style="left:' + b[1] + 'px;">' + b[0] + "</div>"
                    }), f.find(".hui-history-time-axis").html(l);
                    var m = c.priceAverage(b.priceMax, b.priceMin), n = [[0, 80, 160], [0, 54, 108, 162], [0, 40, 80, 120, 160], [0, 32, 64, 96, 128, 162], [0, 27, 54, 81, 108, 135, 162], [0, 23, 46, 69, 92, 115, 138, 161]], o = [[-6, 71, 148], [-6, 46, 100, 150], [-6, 32, 72, 112, 148], [-6, 24, 56, 88, 120, 152], [-6, 18, 45, 72, 100, 126, 150], [-6, 15, 38, 60, 83, 106, 130, 150]], p = m.length, q = p - 3;
                    n = n[q], o = o[q];
                    var r = "";
                    d.each(e.zip(m, o, n), function (a, b) {
                        b[0] >= 0 && (r += '<div class="hui-history-price-label" style="top:' + b[1] + 'px;">' + b[0] + "</div>"), a !== p - 1 ? (i.moveTo(-1, b[2]), i.lineTo(302, b[2]), i.stroke()) : (i.closePath(), i.beginPath(), i.strokeStyle = "#DEDEDE", i.moveTo(-2, b[2]), i.lineTo(302, b[2]), i.stroke()), i.closePath()
                    }), f.find(".hui-history-price-axis").html(r)
                }
                var s = b.showMaxPrice = m[0], t = b.showMinPrice = m.pop();
                b.showPriceRange = c.SUB(s, t);
                var u = Math.round((s - b.priceMax) / b.showPriceRange * 160) - 12, v = '<dl style="top:' + u + 'px;"><dd>' + b.priceMax + "</dd></dl>";
                if (b && b.priceMin) {
                    var w = Math.round((s - b.priceMin) / b.showPriceRange * 160) - 1;
                    v += '<dl style="top:' + w + 'px;"><dd>' + b.priceMin + "</dd></dl>"
                }
                f.find(".hui-history-most-price").html(v);
                var x = c.priceCurveCoords(b), y = f.find(".hui-history-curve").get(0);
                if (y.getContext) {
                    var z = y.getContext("2d");
                    if (z.beginPath(), z.translate(45.5, 160.5), b && b.priceMin) {
                        z.lineWidth = 1, z.strokeStyle = "#cccccc", c.drawDashLine(z, b.priceMaxCoord, 2), c.drawDashLine(z, b.priceMinCoord, 2), z.closePath();
                        var A = b.list[b.list.length - 1].price;
                        if (A !== b.priceMax && A !== b.priceMin) {
                            var B = Math.round((s - A) / b.showPriceRange * 160) - 9;
                            f.find(".hui-history-most-price").append('<dl style="top:' + B + 'px;"><dd >' + A + "</dd></dl>");
                            var C = x[x.length - 1];
                            z.beginPath(), z.lineWidth = 1, z.strokeStyle = "#cccccc", c.drawDashLine(z, C[1], 4), z.closePath()
                        } else A === b.priceMin && f.find("#lastLow").css({color: "red"})
                    }
                    if (z.beginPath(), z.translate(-.5, -.5), z.strokeStyle = "#fd6802", z.lineWidth = 2, d.each(x, function (a) {
                            0 === a ? z.moveTo(this[0], this[1]) : z.lineTo(this[0], this[1])
                        }), z.stroke(), z.closePath(), this.timeDiff(b.startTime, b.list[0].time) > 0) {
                        var D = x[0][0] + 2;
                        z.beginPath(), c.drawDashLine(z, x[0][1], 2, D), z.closePath()
                    }
                }
                var E = c.promotionCoords(g.data.promotionHistory, b);
                c.initTooltip(a, E)
            }
        }
    };
    return l
}), youdao.define("modules/plugin_history/plugin_history.html", function () {
    return ' <li id="hui-plugin-history" hui-type="hui-plughistory-sec" class="hui-plugin-history hui-btn " hui-plugin-type="hoverMod">\r\n    <a href="#"  hoverAction="<%= hoveraction%>"  data-log-feature="HISTORY"\r\n        class="<%=name%> plug-history-btn hui-old-sp1 hui-plug-history-type plugin-history-btn hui-btn-inside">\r\n          <em class="hui-new-sp hui-<%=_pricestate.data.style%>"></em>\r\n          <span><%=text%></span>\r\n    </a>\r\n    <div class="hui-old-sp-ie hui-shopping-lightbox hui-plug-history-box hui-history-box">\r\n        <div class="hui-plughistory-hd">\r\n            <span class="hui-history-logo history-newlogo hui-new-sp"></span>\r\n            <!--\r\n            <ul>\r\n                <li class="hui-history-time">\r\n                <a hui-type="year-history" class="hui-history-active"\r\n                    clkAction="PLUGIN_HISTORY_CHANGETIME_CLICIK" data-log-position="alltime"\r\n                    href="javascript:;">ȫ��ʱ��</a>\r\n                </li>\r\n            </ul>\r\n            -->\r\n        </div>\r\n        <% if (isShowpromotionBar) {%>\r\n        <div class="hui-plughistory-Promotion">\r\n          <p>���μ�<span><%= isShowpromotionBar.info %></span><% if (promotionPrice) {%>������<%= isShowpromotionBar.promoDiscount %>�۵��ּ�<span><%= priceunitSymbol%><%= isShowpromotionBar.promoPrice %></span><% } %></p>\r\n        </div>\r\n        <% } %>\r\n        <% if (isShowPriceCanvas) {%>\r\n            <div id="hui-plughistory-canvas" class="hui-history-canvas"></div>\r\n        <% } else { %>\r\n            <div class="hui-flash" id="hui-plughistory-flash"></div>\r\n        <% } %>\r\n\r\n       <div class="hui-plughistory-ft hui-tac">\r\n           <div class="history-collection-wrapper  <% if (collect && collect.collected) {%> hui-collection-already <%}%>">\r\n               <a href="javascript:;"\r\n                   hui-type="hui-collect" hui-collection-source="plugin" hui-collection-offsetX="434" hui-collection-offsetY="94"\r\n                   clkAction="PLUGIN_HISTORY_FAVOR_SUB_CLICK" data-log-feature="FAVOR"\r\n                   class="hui-button hui-button-star hui-button-star-valid hui-collection-no-collect">\r\n                   <i></i>\r\n                   <span>�ղ���Ʒ</span>\r\n               </a>\r\n               <a href="javascript:;"\r\n                   hui-type="hui-collect" hui-collection-source="plugin" hui-collection-offsetX="435" hui-collection-offsetY="96"\r\n                   clkAction="PLUGIN_HISTORY_FAVOR_UNSUB_CLICK" data-log-feature="FAVOR"\r\n                   class="hui-button hui-button-star hui-button-star-invalid hui-collection-collected ">\r\n                   <i></i>\r\n                   <span>���ղ�</span>\r\n               </a>\r\n            </div>\r\n            <% if (priceTrendShare.type) { %>\r\n              <a href="<%= priceTrendShare.shareUrl%>" title="<%= priceTrendShare.anchor%>" target="_blank"\r\n                  clkaction="PLUGIN_HISTORY_SHARE_CLICK"\r\n                  class="hui-price-trend-share">\r\n                      <i></i>\r\n                      <%= priceTrendShare.anchor%>\r\n                  </a>\r\n            <% } else { %>\r\n              <a href="http://www.huihui.cn/app?keyfrom=zhushou_promote" \r\n              clkaction="PLUGIN_HISTORY_APP_PROMOTE_CLICK"\r\n                  title="�ֻ�Ҳ�ܿ�����������������" target="_blank" class="hui-price-trend-share">\r\n                  <i></i>\r\n                  �ֻ�Ҳ�ܱȼ�������������&gt;&gt;\r\n              </a>\r\n            <% } %>\r\n        <div class="hui-bottom-line"></div>\r\n        </div>\r\n    </div>\r\n</li>\r\n'
}), youdao.define("modules/plugin_history/plugin_history.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.require_module("youdao.cache"), e = c.require_module("youdao.consts"), f = c.jQuery, g = c._, h = a("modules/plugin_history/plugin_history.html"), i = "plugin_history", e = c.require_module("youdao.consts"), j = c.reg("plugin-history"), k = e.flashUrl, l = function (a) {
        var b = {data: a}, c = {
            menu: "false",
            scale: "Scale",
            wmode: "opaque",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "#FFFFFF"
        }, d = {id: "hui-plughistory-flash", "class": "hui-falsh"};
        swfobject.embedSWF(k + "trendchart_3_0_2.swf", "hui-plughistory-flash", "390", "200", "9.0.0", k + "expressInstall.swf", b, c, d)
    }, m = d.data.haitao || {}, n = !1;
    m.itemDollarPrice && (n = !0);
    var o = d.data.HuiData || {}, p = !1, q = encodeURIComponent(window.location.href), r = "http://www.huihui.cn/share/create?type=SHOPITEM&itemUrl=" + q + "&keyfrom=zhushou_baoliao";
    o.uid > 0 ? p = !0 : r = "http://www.huihui.cn/login?url=" + encodeURIComponent(r) + "&keyfrom=zhushou_baoliao";
    var s = !1;
    d.data.priceTrendShare && "LOWEST" == d.data.priceTrendShare.type && (s = !0), j.listen("collection-add", function () {
        f(".history-collection-wrapper").addClass("hui-collection-already")
    }), j.listen("collection-remove", function () {
        f(".history-collection-wrapper").removeClass("hui-collection-already")
    });
    var t = d.data.priceTrendShare || {}, u = d.data.priceHistoryTip || {}, v = d.data.isShowPriceCanvas, w = d.data.promotionBest || !1, x = w ? d.data.thisItem.price * w.promoDiscount : !1, y = d.data.thisPrice.priceunitSymbol || "", z = "PLUGIN_HISTORY_MOD_HOVER";
    return d.data && d.data.promotionHistory && d.data.promotionHistory.length && (z = d.data.promotionBest ? "PLUGIN_HISTORY_MOD_HOVER_PROMO" : "PLUGIN_HISTORY_MOD_HOVER_PROMO_RECORD"), {
        html: g.template(h)({
            name: i,
            priceTrendShare: t,
            isLogin: p,
            historyPriceClassify: u.style,
            text: u["short"].replace("�۸�", ""),
            consts: e.subConsts,
            priceHistoryTip: u["long"],
            collect: d.data.myZhushouCollectData || {},
            isHaitao: n,
            isHisLowest: s,
            promoteUrl: r,
            isShowPriceCanvas: v,
            isShowpromotionBar: w,
            promotionPrice: x,
            priceunitSymbol: y,
            hoveraction: z
        }), showFlash: l
    }
}), youdao.define("modules/pricestate/pricestate.html", function () {
    return ' <% var _hoveraction = "BAR_HISTORY_MOD_HOVER" %>\n<% if (_container && _container.promotionHistory && !!_container.promotionHistory.length) {\n   var _hoveraction = _container.promotionBest ? "BAR_HISTORY_MOD_HOVER_PROMO" : "BAR_HISTORY_MOD_HOVER_PROMO_RECORD";\n} %>\n<li hui-mod="pricestate" class="hui-shopping-pricestate hui-fz12" hui-type="hoverMod" >\n    <a class="hui-sp hui-sp11"  hoveraction="<%= _hoveraction%>" href="#">\n        <span class="hui-icon-cont">\n            <em class="hui-sp hui-sp6 hui-<%=_pricestate.data.style%>"></em>\n            </span><br />\n            <%= _pricestate.data.short%>\n    </a>\n    <% if (_container.priceHistoryTip.style === "lowest") { %>\n    <div hui-type="tip" class="hui-shopping-commontips">\n        ��ʷ��ͼ�\n        <div class="hui-sp hui-sp22"></div>\n    </div>\n    <% } %>\n   <div class="hui-shopping-lightbox">\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div id="youdaoGWZShistory" class="hui-history-box">\n        </div>\n    </div>\n</li>'
}), youdao.define("modules/pricestate/historyInfo.html", function () {
    return ' <div class="hui-plughistory-hd"><em class="hui-sp hui-sp42"></em>\n    <span class="hui-history-logo">�۸�����</span>\n    <!--\n    <ul>\n        <li class="hui-history-time">\n        <a class="hui-history-active" hui-type="year-history" \n         clkAction="BAR_HISTORY_CHANGETIME_CLICK" data-log-position="alltime" href="#">ȫ��ʱ��</a>\n        </li>\n    </ul>\n    -->\n</div>\n<% if (isShowpromotionBar) {%>\n<div class="hui-plughistory-Promotion">\n    <p>���μ�<span><%= isShowpromotionBar.info %></span><% if (promotionPrice) {%>������<%= isShowpromotionBar.promoDiscount %>�۵��ּ�<span><%= priceunitSymbol%><%= isShowpromotionBar.promoPrice %></span><% } %></p>\n</div>\n<% } %>\n<% if (isShowPriceCanvas) {%>\n    <div id="hui-history-canvas" class="hui-history-canvas"></div>\n<% } else { %>\n    <div class="hui-flash" id="hui-history-flash"></div>\n<% } %>\n<div class="hui-plughistory-ft" style="text-align: left;">\n    <div class="history-collection-wrapper  <% if (collect && collect.collected) {%> hui-collection-already <%}%>">\n        <a href="javascript:;"\n            hui-type="hui-collect" hui-collection-source="bar" hui-collection-offsetX="-534" hui-collection-offsetY="-238"\n            clkAction="BAR_HISTORY_FAVOR_SUB_CLICK" data-log-feature="FAVOR"\n            class="hui-button hui-button-star hui-button-star-valid hui-collection-no-collect">\n            <i></i>\n            <span>�ղ���Ʒ</span>\n        </a>\n        <a href="javascript:;"\n            hui-type="hui-collect" hui-collection-source="bar" hui-collection-offsetX="-290" hui-collection-offsetY="-200"\n            clkAction="BAR_HISTORY_FAVOR_UNSUB_CLICK" data-log-feature="FAVOR"\n            class="hui-button hui-button-star hui-button-star-invalid hui-collection-collected ">\n            <i></i>\n            <span>���ղ�</span>\n        </a>\n    </div>\n    <% if (priceTrendShare.type) {%>\n        <a href="<%= priceTrendShare.shareUrl%>" title="<%= priceTrendShare.anchor%>" target="_blank"\n            clkaction="BAR_HISTORY_SHARE_CLICK"\n            class="hui-price-trend-share">\n            <i></i>\n            <%= priceTrendShare.anchor%>\n        </a>\n    <% } else { %>\n        <a href="http://www.huihui.cn/app?keyfrom=zhushou_promote" \n        clkaction="BAR_HISTORY_APP_PROMOTE_CLICK"\n            title="�ֻ�Ҳ�ܿ�����������������" target="_blank" class="hui-price-trend-share">\n            <i></i>\n            �ֻ�Ҳ�ܱȼ�������������&gt;&gt;\n        </a>\n    <% } %>\n</div>\n'
}), youdao.define("modules/pricestate/pricestate.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = a("modules/pricestate/pricestate.html"), g = a("modules/pricestate/historyInfo.html"), h = c.require_module("youdao.cache"), i = c.require_module("youdao.consts"), j = c.require_module("youdao.util"), k = (c.reg("subBookmarks"), c.mod), l = "pricestate";
    k[l] = {
        template: f, event: function (a) {
            o(a);
            var b = a.find('div[hui-type="tip"]');
            b.length > 0 && a.sMsg({
                type: "showTips",
                $tip: b
            }), ("taobao.com" === document.domain || "tmall.com" === document.domain) && a.addClass("hui-taobao-history")
        }
    };
    var m = function (a) {
        var b = i.flashUrl, c = a, d = {data: c}, e = {
            menu: "false",
            scale: "Scale",
            wmode: "opaque",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "#FFFFFF"
        }, f = {id: "hui-history-flash", "class": "hui-falsh"};
        swfobject.embedSWF(b + "trendchart_3_0_2.swf", "hui-history-flash", "390", "200", "9.0.0", b + "expressInstall.swf", d, e, f)
    }, n = function (a) {
        var b = j.checkFlash().hasFlash;
        if (!b) {
            var c = "ARMANI_EXTENSION_ACTION", d = "HISTORY_NOFLASH";
            h.fn && h.fn.sendLog && j.isFunction(h.fn.sendLog) && h.fn.sendLog(d, document.createElement("div"), c)
        }
        m(h.data.priceHistoryOneYear)
    }, o = function (b) {
        var f = h.data.isShowPriceCanvas, k = i.commonName, l = h.data.priceTrendShare || {}, o = j.checkFlash().hasFlash;
        if (l) {
            var p = window.location.href, q = i.baseUrl + "/api/zhushou/pricetrend_share.image?url=" + encodeURIComponent(p), r = c.require_module("youdao.share");
            l.shareUrl = r.shareTo("sina", l.shareDoc, l.shareDoc, "http://zhushou.huihui.cn?keyfrom=price_trend_share", q, !0)
        }
        var s = h.data.HuiData || {}, t = !1;
        s.uid > 0 && (t = !0);
        var u = !1, v = h.localConf || {}, w = v.email, x = v.loginRreTip;
        w && !x && (u = !0);
        var y = h.data.promotionBest || !1, z = y ? h.data.thisItem.price * y.promoDiscount : !1, A = h.data.thisPrice.priceunitSymbol || "", B = {
            logo: "�۸�����",
            priceHistoryTip: h.data.priceHistoryTip["long"],
            priceTrendShare: l,
            name: k,
            hasFlash: o,
            isLogin: t,
            isShowLoginPreTip: u,
            collect: h.data.myZhushouCollectData || {},
            isShowPriceCanvas: f,
            isShowpromotionBar: y,
            promotionPrice: z,
            priceunitSymbol: A
        }, C = g;
        if (!o) {
            var D = "ARMANI_EXTENSION_ACTION", E = "HISTORY_NOFLASH";
            h.fn && h.fn.sendLog && j.isFunction(h.fn.sendLog) && h.fn.sendLog(E, document.createElement("div"), D)
        }
        var F = e.template(C)(B);
        if (d("#youdaoGWZShistory").html(F), f) {
            var G = "#hui-history-canvas", H = a("modules/priceCanvas/priceCanvas.html"), I = a("modules/priceCanvas/priceCanvas.js");
            d(G).html(H), I.init(G, h.data.priceHistoryData)
        } else n(b);
        m(h.data.priceHistoryOneYear);
        var J = b.find("a[hui-type]"), K = "hui-history-active";
        b.delegate("a[hui-type='year-history']", "click", function (a) {
            a.preventDefault(), "year" !== historyState && (J.removeClass(K), historyState = "year", d(this).addClass(K), m(h.data.priceHistoryOneYear))
        }).delegate("a[hui-type='def-history']", "click", function (a) {
            a.preventDefault(), "def" !== historyState && (J.removeClass(K), historyState = "def", d(this).addClass(K), m(h.data.priceHistory))
        })
    };
    return {showFlash: m}
}), youdao.define("modules/plugin_daigou/plugin_daigou_sizehelp.html", function () {
    return ' <%if(shoesSize && shoesSize.length > 0){%>\r\n<div class="daigou-size-help">\r\n    <div class="size-media">\r\n        <%if(brandImage){%>\r\n        <img alt="<%=shoesSize[0].brand%>" src="<%=brandImage%>" class="size-media-img">\r\n        <%}%>\r\n        <p class="<%if(brandImage){%>offset<%}%>">����Ь���п�ȱ�ʶ��N/AA,AΪ�ݰ棻M/B,CΪ�����棻W/DΪ�ӷʰ棻EEΪ���ӷʰ档</p>\r\n    </div>\r\n    <div class="size-tab">\r\n        <div class="size-tab-nav">\r\n            <a href="javascript:" class="<%if(gender==1){%>current<%}%>" hoveraction="SIZE_HELP_MAN_HOVER">��Ь</a>\r\n            <a href="javascript:" class="<%if(gender==0){%>current<%}%>" hoveraction="SIZE_HELP_WOMAN_HOVER">ŮЬ</a>\r\n        </div>\r\n        <table>\r\n            <tr>\r\n                <th>����(CM)</th>\r\n                <th>ŷ��(EUR)</th>\r\n                <th>����(US)</th>\r\n                <th>Ӣ��(UK)</th>\r\n            </tr>\r\n        </table>\r\n        <div class="size-tab-content">\r\n            <div class="tab-pane -size-tab1" style="<%if(gender==0){%>display:none<%}%>">\r\n                <table>\r\n                    <tbody>\r\n                    <%var isEmptyMan = true;%>\r\n                    <%_.each(shoesSize,function(item,i){%>\r\n                        <%if(item.gender == 1){%>\r\n                        <%isEmptyMan = false;%>\r\n                        <tr>\r\n                            <td><%=item.length%></td>\r\n                            <td><%=item.EUR%></td>\r\n                            <td><%=item.US%></td>\r\n                            <td><%=item.UK%></td>\r\n                        </tr>\r\n                        <%}%>\r\n                    <%})%>\r\n                    <%if(isEmptyMan == true){%>\r\n                    <tr>\r\n                        <td class="empty">���޶�Ӧ������Ϣ</td>\r\n                    </tr>\r\n                    <%}%>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class="tab-pane -size-tab2" style="<%if(gender==1){%>display:none<%}%>">\r\n                <table>\r\n                    <tbody>\r\n                    <%var isEmptyWoman = true;%>\r\n                    <%_.each(shoesSize,function(item,i){%>\r\n                        <%if(item.gender == 0){%>\r\n                        <%isEmptyWoman = false;%>\r\n                        <tr>\r\n                            <td><%=item.length%></td>\r\n                            <td><%=item.EUR%></td>\r\n                            <td><%=item.US%></td>\r\n                            <td><%=item.UK%></td>\r\n                        </tr>\r\n                        <%}%>\r\n                    <%})%>\r\n                    <%if(isEmptyWoman == true){%>\r\n                    <tr>\r\n                        <td class="empty">���޶�Ӧ������Ϣ</td>\r\n                    </tr>\r\n                    <%}%>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="size-footer">\r\n        <p>��������Ľų�������������ѡ���Ӧ�ĳ���</p>\r\n        <p class="gray">\r\n            <%if(brandImage){%>\r\n            ��ͬƷ�Ʋ�ͬ��֮���С���ڲ���,�������ݽ����ο�\r\n            <%}else{%>\r\n            ����Ϊ��׼������ձ����ݽ������ο���\r\n            <%}%>\r\n        </p>\r\n    </div>\r\n</div>\r\n<%}else{%>\r\n<div>����鿴��ϸ������ձ�</div>\r\n<%}%>'
}), youdao.define("modules/plugin_daigou/plugin_daigou_sizehelp.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = c.require_module("youdao.cache"), g = (c.require_module("youdao.consts"), c.require_module("youdao.util")), h = a("modules/plugin_daigou/plugin_daigou_sizehelp.html"), i = (c.mod, f.data.haitao, "#hui-plugin-daigou-tips"), j = {
        tabNav: ".size-tab-nav a",
        tabPane: ".tab-pane",
        tipSize: ".tip-size"
    }, k = {
        init: function (a) {
            this.renderSize(a), d(i).delegate(j.tabNav, "mouseenter", function () {
                var a = d(this).index(), b = d(i).find(j.tabPane), c = d(i).find(j.tabNav);
                c.removeClass("current"), d(this).addClass("current"), b.hide().eq(a).show()
            })
        }, renderSize: function (a) {
            var b = d("#-daigou-size");
            if (0 == b.length)return !1;
            var c = d(window).width(), f = d(i).find(j.tipSize), g = f.offset().left;
            320 > c - g && b.addClass("right"), a.shoesSize ? this.sendLog("SIZE_HELP_TRIGGER") : a.shoesSize = null, b.html(e.template(h)(a))
        }, sendLog: function (a, b) {
            if (b || (b = "ARMANI_EXTENSION_POPUP"), f.fn && f.fn.sendLog && g.isFunction(f.fn.sendLog)) {
                var c = document.createElement("div");
                f.fn.sendLog(a, c, b), c = null
            }
        }
    };
    return k
}), youdao.define("modules/plugin_daigou/plugin_daigou.js", function (a, b) {
    "use strict";
    var c, d = youdao, e = d.jQuery, f = d._, g = d.require_module("youdao.cache"), h = d.require_module("youdao.consts"), i = d.require_module("youdao.util"), j = d.require_module("youdao.code"), k = a("modules/plugin_daigou/plugin_daigou.html"), l = a("modules/plugin_daigou/plugin_daigou_success.html"), m = d.mod, n = "plugin_daigou", o = location.protocol + "//shared.ydstatic.com/gouwuex/ext/script/all-packed-utf-8-huihui.js";
    m[n] = {
        template: k, event: function (a) {
        }
    };
    var p = g.data.haitao, q = g.data.thisSite.siteName, r = parseFloat(p.exchange, 10), s = {}, t = d.require_module("youdao.localCapture"), u = t.captureResult || {}, v = "#hui-plugin-daigou", w = "[data-type=shopcart]", x = "#hui-plugin-daigou-tips", y = "#hui-plugin-daigou-promotions", z = (e(v), {
        historyInfo: ".hui-shopping-historyInfo",
        historyBtn: ".plugin-history-btn",
        priceState: ".hui-shopping-pricestate",
        huihuiTranslate: ".-huihui-translate",
        swipeTranslate: "#swipe-translate",
        crumbTranslate: "#crumb-translate"
    }), A = {
        initDaigouDom: function (a, b) {
            e("#hui-plugin-daigou").removeClass("hui-btn-disabled"), e("#hui-daigou-undisposed-aletr-dialog").hide(), a.swipeTranslate = g.localConf.swipeTranslate, a.crumbTranslate = g.localConf.crumbTranslate;
            var c = e(f.template(k)({daigouData: a, captureInfo: b})), d = e("<div />").html(c);
            e(v).replaceWith(d.find(v)), e(x).replaceWith(d.find(x)), e(y).replaceWith(d.find(y));
            var h = "PLUGIN_DAIGOU_WHITE_TRIGGER";
            0 == a.isWhiteCategory ? h = "PLUGIN_DAIGOU_BLACK_TRIGGER" : "failed" == a.isWhiteCategory ? h = "PLUGIN_DAIGOU_NONE_TRIGGER" : b.retailerName && "failed" != b.retailerName && b.retailerName.toLocaleLowerCase().indexOf("amazon") < 0 && (!b.fulfilledName || "failed" != b.fulfilledName && b.fulfilledName.toLocaleLowerCase().indexOf("amazon") < 0) ? h = "PLUGIN_DAIGOU_THIRD_TRIGGER" : "�޻�" == b.stock && A.changeSelectBoolean() && (h = "PLUGIN_DAIGOU_SOLDOUT_TRIGGER"), A.sendLog(h), A.changeSelectBoolean() ? (e("#hui-plugin-daigou .hui-daigou-total-price").css("cursor", "pointer"), e("#hui-plugin-daigou").removeClass("hui-plugin-daigou-disabled")) : e("#hui-plugin-daigou .hui-daigou-total-price").removeAttr("href").css("cursor", "default");
            var i = e("#hui-plugin-daigou"), j = e(window).width(), l = e("#hui-plugin-daigou").offset().left;
            242 > j - l ? i.addClass("right") : i.removeClass("right")
        }, hasTimer: !1, onDomChange: function (a, b) {
            var c, d = A.getMaybeChangeKey(!0), g = null;
            c = setTimeout(function h() {
                g = A.getMaybeChangeKey(!0), "amazon" == q && e(a.reviewAsin.selector).attr("style") && e("#hui-plugin-daigou").addClass("hui-btn-disabled"), A.hasTimer && f.isEqual(d, g) || (e("#hui-plugin-daigou").addClass("hui-btn-disabled"), d = g, b(A.hasTimer), A.hasTimer = !0), setTimeout(h, 200);
            }, 1e3)
        }, initDaigouData: function () {
            var a = !0, b = this;
            c = u.result;
            var i = u.resultQuerys;
            s = g.data.haitao, s.exchange = Math.round(1e3 * p.exchange) / 1e3, s.itemDollarPrice = c.price || 0, c.price && "failed" !== c.price ? s.itemDollarPrice = c.price.replace(/,/g, "") : s.itemDollarPrice = 0, a && (s.site = g.data.thisSite.site, s.siteName = q, s.siteNameCn = A.getGoodsKey("siteName"), A.changeSelectBoolean() ? s.selectedSize = !0 : s.selectedSize = !1, s.price = c.price.replace(/[^0-9]/gi, ""), c.price || e("#hui-plugin").hide(), A.isShowDaigou = a, e(document).undelegate("'#hui-plugin-daigou:not(.hui-btn-disabled) > a','.confirm-daigou'", "click.addCart"), e(document).delegate("'#hui-plugin-daigou:not(.hui-btn-disabled) > a','.confirm-daigou'", "click.addCart", function (a) {
                a.preventDefault();
                var i = e(w), j = f.template(l), k = A.getGoodsKey(), m = e.param(k);
                if (!c.price || "failed" == c.price)return !1;
                if (A.changeSelectBoolean()) {
                    if (!g.data.HuiData)return b.triggerClickHref(h.globaCartURL + h.globaCartPage + "?" + m), !1;
                    d.ajax({
                        baseUrl: h.globaCartURL,
                        url: h.globaAddToCart,
                        params: k,
                        type: "POST",
                        context: b,
                        success: function (a) {
                            return "fail" == a.status ? void alert(a.message) : (e("#hui_plugin_success_in_daigou").length ? e("#hui_plugin_success_in_daigou").show() : (e("#hui-plugin").after(j), "6pm" == q && e("#hui_plugin_success_in_daigou").addClass("success-6pm")), setTimeout(function () {
                                e("#hui_plugin_success_in_daigou").hide()
                            }, 15e3), b.triggerClickHref(h.globaCartURL + h.globaCartPage), void d.ajax({
                                baseUrl: h.globaCartURL,
                                url: h.globaGetCartCount,
                                error: function (a) {
                                    console.log(a)
                                },
                                success: function (a) {
                                    "succ" == a.status && i.text(a.message)
                                }
                            }))
                        },
                        error: function () {
                            alert("��ӹ��ﳵ����")
                        }
                    })
                } else e("#hui-daigou-undisposed-aletr-dialog").show(), e("#hui-plugin-daigou").addClass("hui-plugin-daigou-disabled")
            }), this.isBindObserveAsin ? A.html = f.template(k)({
                daigouData: s,
                captureInfo: c
            }) : (b.initFanyi(c, i), A.html = f.template(k)({
                daigouData: s,
                captureInfo: c
            }), A.onDomChange(i, function () {
                A.hasTimer && (u = t.capture(g.data.data, !0) || {}), A.initDaigouData(), b.updateData(s, c)
            }), this.isBindObserveAsin = !0, u.resultQuerys.addToCart && e(document).delegate(u.resultQuerys.addToCart.selector, "click", function () {
                var a = "ADD_TO_CART";
                if (c.shipToChina && "China" == c.shipToChina && (a = "SHIP_TO_CHINA_ADD_TO_CART"), A.sendLog(a, "ARMANI_EXTENSION_POPUP", "price=" + u.result.price), s.isWhiteCategory) {
                    var e = A.getGoodsKey();
                    d.ajax({
                        baseUrl: h.globaCartURL,
                        url: h.globaCartAddToRecommend,
                        params: e,
                        type: "POST",
                        context: b
                    })
                }
            })))
        }, isBindObserveAsin: !1, updateData: function (b, c) {
            var f, h, i, k = JSON.stringify(A.getMaybeChangeKey()), l = g.data.priceHistoryTip && !!g.data.priceHistoryTip.style;
            f = unescape(k.replace(/\\(u[0-9a-fA-F]{4})/gm, "%$1")), h = j.encrypt(f, 4, !0), i = j.encrypt(g.data.thisItem.url, 2, !0), d.ajax({
                url: "productDetail",
                params: {m: i, param: h},
                success: function (d) {
                    if (d.haitao && (e.extend(b, d.haitao), b.promotionData = g.data.thisItem.promotionData ? g.data.thisItem.promotionData : "", b.daigouPrice = A.getDaigouPrice(b, c), b.daigouTax = A.getTax(b), b.daigouTax = b.daigouTax.toFixed(0), g.data.outfrom = d.outfrom, g.data.priceHistoryTip && l)) {
                        e.extend(g.data, d);
                        var f = g.data.priceHistoryTip["short"].replace("�۸�", "");
                        e(z.historyBtn).html('<em class="hui-new-sp hui-' + g.data.priceHistoryTip.style + '"></em><span>' + f + "</span>"), e(z.historyInfo).find("span").html(g.data.priceHistoryTip["long"]), e(z.priceState).find(".hui-sp11").html('<span class="hui-icon-cont"><em class="hui-sp hui-sp6 hui-' + g.data.priceHistoryTip.style + '"></em></span><br>' + g.data.priceHistoryTip["short"]);
                        var h = g.data.priceHistoryData ? !0 : !1;
                        if (h) {
                            var i = a("modules/priceCanvas/priceCanvas.js"), j = a("modules/priceCanvas/priceCanvas.html");
                            e("#hui-plughistory-canvas,#hui-history-canvas").html(j), i.init("#hui-plughistory-canvas", g.data.priceHistoryData), i.init("#hui-history-canvas", g.data.priceHistoryData)
                        } else {
                            var k = a("modules/plugin_history/plugin_history.js"), m = a("modules/pricestate/pricestate.js");
                            k.showFlash(g.data.priceHistoryOneYear), m.showFlash(g.data.priceHistoryOneYear)
                        }
                    }
                    A.initDaigouDom(b, c);
                    var n = a("modules/plugin_daigou/plugin_daigou_sizehelp.js");
                    n.init(b)
                }
            })
        }, getDaigouPrice: function (a, b) {
            var c = (parseFloat(a.itemDollarPrice, 10) || 0) * r;
            return a.itemYuanPrice = c.toFixed(0), a.daigouPrice = Math.round(c), a.shippingPrices && (a.freightYuanPrice = Math.round(parseFloat(a.shippingPrices.localShippingPrice / 100, 10) || 0), a.transferPrice = Math.round(parseFloat(a.shippingPrices.globalShippingPrice / 100, 10) || 0)), (a.daigouPrice + a.transferPrice + a.freightYuanPrice).toFixed(0)
        }, getTax: function (a) {
            var b, c = a.itemYuanPrice, d = a.taxRate > 0 ? a.taxRate : .1;
            return b = d * c, b > 50 ? b : 0
        }, triggerClickHref: function (a) {
            var b = document.createElement("a");
            if (document.body.appendChild(b), b.href = a, b.target = "_blank", b.click)b.click(); else {
                var c = document.createEvent("Events");
                c.initEvent("click", !0, !1), b.dispatchEvent(c)
            }
            document.body.removeChild(b)
        }, getMaybeChangeKey: function (a) {
            var b, d, f = {}, g = {}, h = u.resultQuerys;
            for (var i in h)if (h[i].isMonitor && (b = h[i], f[i] = b.attr ? e(b.selector).attr(b.attr) : e(b.selector).text(), b.pattern)) {
                var j = new RegExp(b.pattern, "i"), k = j.exec(f[i]);
                null !== k && (f[i] = k[void 0 === b.group ? 0 : b.group])
            }
            a || (d = 50, "6pm.com" == s.site && (d = 1e3), e.extend(f, {
                name: c.name.substr(0, d),
                crumbs: c.crumbs.substr(0, 50),
                shippingWeight: c.shippingWeight ? c.shippingWeight : "",
                productWeight: c.productWeight
            }), s.site.indexOf("amazon") > -1 && e.extend(f, A.getAmazonPath(c)));
            for (var i in f)f[i] && "failed" != f[i] && (g[i] = f[i]);
            return g || {}
        }, getGoodsKey: function (a) {
            var b = g.data.thisSite.site, d = g.data.thisItem.url ? g.data.thisItem.url : location.href, f = {
                url: d,
                domain: b
            }, h = g.data.thisSite.siteName, i = u.resultQuerys, j = A.getQueryString("keyfrom");
            if ("amazon" == q && (h = "��������ѷ"), "siteName" == a)return h || "";
            e.extend(f, {
                outfrom: g.data.outfrom,
                browser: g.localConf.browser,
                vendor: g.localConf.vendor,
                refer: A.getReffer()
            }), j && (f.keyfrom = j);
            for (var k in i)i[k].isMonitor && (f[k] = c[k]);
            return f || {}
        }, changeSelectBoolean: function () {
            var a, b = u.resultQuerys, c = !0;
            return b.hasSizeSelector ? (e(b.hasSizeSelector.selector).each(function () {
                "SELECT" == e(this)[0].tagName.toLocaleString() ? (a = e(this).val(), a && 0 != a.indexOf("-1") || (c = !1)) : (a = e(this).find(".selected a").text(), a || (c = !1))
            }), c) : c
        }, getAmazonPath: function (a) {
            var b = {};
            return a.crumbs && "failed" != a.crumbs && -1 == a.crumbs.indexOf("Back to search results") && -1 == a.crumbs.indexOf("�Η����Y���ˑ���") ? e.extend(b, {crumbs: a.crumbs.substr(0, 100)}) : a.category && "failed" != a.category ? e.extend(b, {category: a.category.substr(a.category.length - 50, 50)}) : e.extend(b, {
                ladder: a.ladder.substr(a.ladder.length - 50, 50),
                subnav: a.subnav.substr(a.subnav.length - 50, 50)
            }), b
        }, getReffer: function () {
            for (var a, b, c, d, f, g = decodeURIComponent(e("#youdaoGWZS_reffer").text()), h = g.split(","), i = h.length, j = document.referrer, k = 0; i > k; k++)if (a = h[k].split("|"), c = a.pop(), c == j) {
                b = a.shift();
                break
            }
            return d = b ? b : j, f = d.indexOf("?"), f > 0 && (d = d.substring(0, f)), d
        }, downloadApp: function () {
            e(".download-app").hover(function () {
            }, function () {
            })
        }, initFanyi: function (a, b) {
            function c() {
                var a = document.createElement("script");
                a.src = o, a.id = "outfox_seed_js_huihui", a.charset = "utf-8", document.getElementsByTagName("head")[0].appendChild(a)
            }

            var d = this, f = document.getElementById(h.optionsID);
            f && g.localConf && (g.localConf.swipeTranslate || (g.localConf.swipeTranslate = "open", g.localConf.crumbTranslate = "open", f.innerHTML = i.jsonToStr(g.localConf, ";")), s.swipeTranslate = g.localConf.swipeTranslate, s.crumbTranslate = g.localConf.crumbTranslate), "open" == g.localConf.swipeTranslate && c(), e(document).delegate(z.swipeTranslate, "change", function (a) {
                var b;
                e(this).attr("checked") ? (window.OUTFOX_JavascriptTranslatoR_HUI ? window.OUTFOX_JavascriptTranslatoR_HUI.swipe.enableSwipe() : c(), g.localConf.swipeTranslate = "open", b = "TRANSLATE_SWIPE_OPEN") : (g.localConf.swipeTranslate = "close", window.OUTFOX_JavascriptTranslatoR_HUI.swipe.disableSwipe(), b = "TRANSLATE_SWIPE_CLOSE"), f.innerHTML = i.jsonToStr(g.localConf, ";"), A.sendLog(b)
            }), e(document).delegate(z.crumbTranslate, "change", function (c) {
                var h, j = e(b.fanyiCrumbPos.selector);
                e(this).attr("checked") ? (A.translationCrumb ? j.find("#tran-crumb").show() : d.translateCrumbs(a.crumbs, j), g.localConf.crumbTranslate = "open", h = "TRANSLATE_CRUMB_OPEN") : (j.find("#tran-crumb").hide(), g.localConf.crumbTranslate = "close", h = "TRANSLATE_CRUMB_CLOSE"), f.innerHTML = i.jsonToStr(g.localConf, ";"), A.sendLog(h)
            }), "open" == g.localConf.crumbTranslate && "amazon.co.jp" == s.site && d.translateCrumbs(a.crumbs, e(b.fanyiCrumbPos.selector))
        }, translateCrumbs: function (a, b) {
            return !c.crumbs || "failed" == c.crumbs || c.crumbs.indexOf("�Η����Y���ˑ���") > -1 ? !1 : void d.ajax({
                baseUrl: h.fanyiAPI,
                url: "openapi.do",
                params: {
                    keyfrom: "huihui",
                    q: a,
                    key: "1206251904",
                    type: "data",
                    version: "1.2",
                    doctype: "jsonp",
                    only: "translate",
                    l: "JA2ZH_CN"
                },
                jsonp: "callback",
                success: function (a) {
                    A.translationCrumb = a.translation[0];
                    var c = ['<div id="tran-crumb">��Ʒ���', A.translationCrumb, "<i>(�ݻ�&�е������ṩ)</i>", "</div>"];
                    b.length && (b.find("#tran-crumb").length ? b.find("#tran-crumb").show() : b.append(c.join("")))
                }
            })
        }, sendLog: function (a, b, c) {
            if (b || (b = "ARMANI_EXTENSION_POPUP"), g.fn && g.fn.sendLog && i.isFunction(g.fn.sendLog)) {
                var d = document.createElement("div");
                c && d.setAttribute("params", c), g.fn.sendLog(a, d, b), d = null
            }
        }, getQueryString: function (a) {
            var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
            return null != c ? unescape(c[2]) : null
        }
    };
    return A
}), youdao.define("modules/plugin_collect/plugin_collect.html", function () {
    return ' <li id="hui-plugin-collection" class="hui-btn hui-collection-btns  <% if (collect && collect.collected) {%> hui-collection-already <%}%> ">\r\n<a class="hui-collection-collected hui-btn-inside" href="javascript:void(0)"\r\n   hui-type="hui-collect" hui-collection-source="plugin" hui-collection-offsetX="152" hui-collection-offsetY="-105"\r\n   title="���ȡ���ղ�" clkAction="PLUGIN_FAVOR_UNSUB_CLICK">\r\n        <span class="hui-new-sp hui-sp-already-star"></span>\r\n        <span class="hui-collection-title">���ղ�</span>\r\n    </a>\r\n    <a class="hui-collection-no-collect hui-add-collect-btn hui-btn-inside"\r\n       hui-type="hui-plugin-collect" hui-collection-source="plugin" hui-collection-offsetX="38" hui-collection-offsetY="-20"\r\n       href="javascript:void(0)" title="����ղأ���Ʒ������֪ͨ"  clkAction="PLUGIN_FAVOR_SUB_CLICK">\r\n        <span class="hui-new-sp hui-sp-star"></span>\r\n        <span class="hui-collection-title">�ղ�</span>\r\n    </a>\r\n    <span style="display:none;" id="hui-collection-new-user-guide"><a class="hui-link" clkAction="POPUP_FAVOR_NEWTIPS_CLICK" target="_blank" href="">�۸��������������������������Կ���</a><a href="javascript:void" class="hui-close-btn"></a></span>\r\n</li>\r\n'
}), youdao.define("modules/plugin_collect/plugin_collect.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = c.require_module("youdao.cache"), g = (c.require_module("youdao.consts"), a("modules/plugin_collect/plugin_collect.html")), h = c.mod, i = "plugin_collect", j = c.reg("plugin_collect");
    return h[i] = {
        template: g, event: function (a) {
        }
    }, d(document).delegate("#hui-collection-new-user-guide", "click", function (a) {
        d("#hui-collection-new-user-guide").remove(), j.send("closeCollectionWelcome")
    }), j.listen("collection-add", function () {
        d("#hui-plugin-collection").addClass("hui-collection-already")
    }), j.listen("collection-remove", function () {
        d("#hui-plugin-collection").removeClass("hui-collection-already")
    }), {html: e.template(g)({collect: f.data.myZhushouCollectData || {}})}
}), youdao.define("modules/plugin_bijia/plugin_bijia.html", function () {
    return ' <%if(recoList && recoList.length > 0){%>\r\n<li id="hui-plugin-bijia" class="hui-price-compare hui-btn<%if(hasHaiWaiGou){%> hui-price-compare-hai<%}%>" hui-type="hui-price-compare" hui-plugin-type="hoverMod">\r\n    <a target="_blank" href=" <%if (otherHasLowerPrice) { %><%=recoList[0].url%>&pos=bar_cheaper<%} else if(hasHaiWaiGou){%><%=recoList[0].url%>&pos=bar<% } else { %><%=morePrice %>&pos=bar<% } %>" class="hui-price-compare-btn hui-btn-inside" hoverAction="PLUGIN_BIJIA_MOD_HOVER"\r\n    <%if (otherHasLowerPrice) {%>\r\n        clkAction="PLUGIN_BIJIA_LOWER_CLICK"\r\n    <%} else {%>\r\n        clkAction="PLUGIN_BIJIA_CLUSTER_CLICK"\r\n    <%}%>\r\n\r\n\r\n        <%if(hasHaiWaiGou){%>\r\n        <!--���ж��Ƿ��к���ֱ��-->\r\n        <span class="">ֱ��<span class="hui-shop-count"><%=recoList[0].priceunitSymbol%><%=recoList[0].price%></span></span>\r\n        <%}else if (otherHasLowerPrice) {%>\r\n        <!--�и��ͼ�-->\r\n            <span class=""><em class="hui-new-sp hui-icon-lowerst"></em>���ͼ�<span class="hui-compare-price">��<%=lowerestPrice%></span></span>\r\n        <%} else {%>\r\n            <%if (otherHasPromotion) {%>\r\n                <!--�޸��ͼ��д���-->\r\n                <span class=""><em class="hui-new-sp hui-icon-promotion"></em>����<span class="hui-shop-count"><%=recoList.length%></span>�ұ���</span>\r\n            <%} else {%>\r\n                <!--�޸��ͼ��޴���-->\r\n                <span class=""><em class="hui-new-sp hui-icon-other"></em>����<span class="hui-shop-count"><%=recoList.length%></span>�ұ���</span>\r\n            <%}%>\r\n        <%}%>\r\n    </a>\r\n    <div class="hui-old-sp-ie hui-shopping-lightbox hui-price-compare-box">\r\n        <ul>\r\n            <li>\r\n                <a href="<%if (otherHasLowerPrice) { %><%=recoList[0].url%>&pos=bar_cheaper<% } else { %><%=recoList[0].url%>&pos=bar<%}%>" \r\n                    clkAction="PLUGIN_BIJIA_ITEM_CLICK" target ="_blank" title="<%=recoList[0].hoverContent%>">\r\n                    <span class="hui-shop-name"><%= recoList[0].siteName %></span>\r\n                    <span class="hui-price">��<%= recoList[0].price %></span>\r\n                    <%if (recoList[0].shopPromotion) {%>\r\n                        <span class="hui-promotion"><em class="hui-new-sp hui-sp9"></em></span>\r\n                    <%}%>\r\n                </a>\r\n            </li>\r\n        <% for(var i=1; i<recoList.length; i++) {%>\r\n            <li>\r\n                <a href="<%=recoList[i].url%>&pos=bar" \r\n                    clkAction="PLUGIN_BIJIA_ITEM_CLICK" target ="_blank" title="<%=recoList[i].hoverContent%>">\r\n                    <span class="hui-shop-name"><%= recoList[i].siteName %></span>\r\n                    <span class="hui-price">��<%= recoList[i].price %></span>\r\n                    <%if (recoList[i].shopPromotion) {%>\r\n                        <span class="hui-promotion"><em class="hui-new-sp hui-sp9"></em></span>\r\n                    <%}%>\r\n                </a>\r\n            </li>\r\n        <% } %>\r\n        <%if (recoList.length > 7 && morePrice) {%>\r\n            <li>\r\n                <a href="<%=morePrice%>" clkAction="PLUGIN_BIJIA_MORE_CLICK" target="_blank" class="hui-more-price">���౨��>></a>\r\n            </li>\r\n        <%}%>\r\n        </ul>\r\n        <%if(!hasHaiWaiGou){%>\r\n        <a href="http://www.huihui.cn/app?keyfrom=zhushou" clkAction = "PLUGIN_BIJIA_TEXT_CLICK"\r\n            data-log-feature="PROMOTE"\r\n            data-log-status="toapp"\r\n            class="hui-price-trend-share" target="_blank" title="�ֻ�Ҳ�ܱȼ�������������">�ֻ�Ҳ�ܱȼ�������������&gt;&gt;</a>\r\n        <%}%>\r\n    </div>\r\n</li>\r\n<%}%>'
}), youdao.define("modules/plugin_bijia/plugin_bijia.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._), e = c.require_module("youdao.cache"), f = c.require_module("youdao.util"), g = a("modules/plugin_bijia/plugin_bijia.html"), h = e.data.hasLower, i = !1, j = !1, k = null, l = e.data.urlPriceList, m = [], n = function (a) {
        if (!a.shopPromotion || a.items)return !1;
        for (var b = !1, c = 0; c < a.items.length; c++) {
            var d = a.items[c].itemPromotion;
            if (d && d.info) {
                b = d.info;
                break
            }
        }
        return b
    };
    i = !0, setTimeout(function () {
        var a = "ARMANI_EXTENSION_POPUP", b = "PLUGIN_BIJIA_TRIGGER";
        if (e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
            var c = document.createElement("div"), d = "";
            c.setAttribute("params", d), e.fn.sendLog(b, c, a)
        }
    }, 300), d.each(l, function (a) {
        if (a.available) {
            var b = n(a), c = {};
            return ("�Ա���" === a.siteName || "���⹺ֱ��" === a.siteName) && (c.url = a.items[0].cpsUrl, c.price = a.items[0].price), e.data.hasHaiWaiGou && "���⹺ֱ��" !== a.siteName ? !0 : void m.push({
                siteName: a.siteName,
                price: c.price ? c.price : a.price,
                shopPromotion: a.shopPromotion ? !0 : !1,
                url: c.url ? c.url : a.url,
                name: a.name,
                priceunitSymbol: a.priceunitSymbol,
                hoverContent: b ? b : a.name
            })
        }
    }), d.some(m, function (a) {
        return a.shopPromotion
    }) && (j = !0), k = m[0] && m[0].price;
    return {
        html: d.template(g)({
            otherPriceExist: i,
            otherHasLowerPrice: h,
            otherHasPromotion: j,
            lowerestPrice: k,
            recoList: m,
            morePrice: e.data && e.data.detailUrl,
            hasHaiWaiGou: e.data.hasHaiWaiGou
        })
    }
}), youdao.define("modules/plugin_container/plugin_container.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = a("modules/plugin_container/plugin_container.html"), g = c.reg("plugHistory"), h = c.require_module("youdao.cache"), i = c.require_module("youdao.util");
    g.listens({
        plugin_container: function () {
            var b = function (a, b, c) {
                if (b || (b = "ARMANI_EXTENSION_POPUP"), h.fn && h.fn.sendLog && i.isFunction(h.fn.sendLog)) {
                    var d = document.createElement("div");
                    c && d.setAttribute("params", c), h.fn.sendLog(a, d, b)
                }
            };
            if (h.data.newPricePositionTag) {
                h.conf.flag = 1;
                var j, k = h.data, l = k.urlPriceList && !!k.urlPriceList.length && (!k.haitao || k.hasHaiWaiGou), m = j = k.priceHistoryTip && !!k.priceHistoryTip.style, n = k.enableHaitao, o = "6pm" == k.thisSite.siteName, p = "GNC" == k.thisSite.siteName || k.hasHaiWaiGou;
                "amazon.co.jp" == k.thisSite.site;
                k.urlPriceList && 1 == k.urlPriceList.length && k.urlPriceList[0].available === !1 && (l = !1);
                var q = "", r = "";
                if (n && (k.isNeteaseIP || k.isVip)) {
                    var s = a("modules/plugin_daigou/plugin_daigou.js");
                    s.initDaigouData();
                    var t = s.isShowDaigou;
                    t && (r = s.html), b("PLUGIN_DAIGOU_TRIGGER")
                }
                var u = "";
                if (j) {
                    var v = a("modules/plugin_collect/plugin_collect.js");
                    u = v.html
                }
                var w = "";
                if (l) {
                    var x = a("modules/plugin_bijia/plugin_bijia.js");
                    w = x.html
                }
                var y = "";
                if (m) {
                    var z = a("modules/plugin_history/plugin_history.js");
                    y = z.html, b("PLUGIN_HISTORY_TRIGGER")
                }
                var A = e.template(f)({
                    pluginBijiaHtml: w,
                    pluginCollectionHtml: u,
                    pluginHistoryHtml: y,
                    pluginHaitaoHtml: q,
                    pluginDaigouHtml: r,
                    isShowHaitao: n,
                    is6pm: o,
                    isSmall: p,
                    isHideHistroyTxt: k.hasHaiWaiGou
                });
                if (!h.data.isBlack) {
                    var B = d(k.newPricePositionTag).filter(":first");
                    d("#hui-plugin").length > 0 ? d("#hui-plugin").replaceWith(A) : B.after(A)
                }
                if (d(".hui-price-compare-btn,.hui-price-compare-box ul a").each(function () {
                        var a = d(this).attr("href");
                        if (-1 === a.indexOf("?")) {
                            var a = a.replace("&", "?");
                            d(this).attr("href", a)
                        }
                    }), m) {
                    var C = h.data.priceHistoryData ? !0 : !1;
                    if (C) {
                        var D = "#hui-plughistory-canvas", E = a("modules/priceCanvas/priceCanvas.html"), F = a("modules/priceCanvas/priceCanvas.js");
                        d(D).html(E), d(D).length && F.init(D, h.data.priceHistoryData)
                    } else z.showFlash(h.data.priceHistoryOneYear)
                }
                j && (g.send("collectionWelcomeTip"), b("PLUGIN_FAVOR_TRIGGER")), h.data.priceHub = h.data.priceHub || {};
                var G, H;
                h.localConf ? (G = !0, H = h.localConf.vendor) : G = h.localConf.hasShownTip;
                var I;
                G || (I = !0, h.localConf.hasShownTip = !0, g.send("showSubTip"));
                var J = h.data.HuiData || {}, K = !1;
                J.uid > 0 && (K = !0);
                var L = "#hui-plugin", M = '[hui-plugin-type="hoverMod"]';
                d(L).delegate(M, "mouseenter", function () {
                    var a, b = d(this), c = d(".hui-shoppingtool").offset().top - d(L).offset().top, e = d("#hui-plugin-logo").offset(), f = d("body").width();
                    if (f - e.left < 550 ? (a = f - e.left - 445, a = 0 > a ? a : 0) : a = 0, 368 > c) {
                        var g = c - 349;
                        b.addClass("hui-plugin-active"), d(".hui-plug-history-box").css({
                            "z-index": "10",
                            top: g,
                            left: a
                        })
                    } else b.addClass("hui-plugin-active"), d(".hui-plug-history-box").css({
                        "z-index": "2",
                        top: 39,
                        left: a
                    })
                }).delegate(M, "mouseleave", function () {
                    var a = d(this);
                    a.removeClass("hui-plugin-active")
                })
            }
            setTimeout(function () {
                var a = c.require_module("youdao.localCapture"), e = a.captureResult || {};
                e.resultQuerys && e.resultQuerys.addToCartBtnCh && d(document).delegate(e.resultQuerys.addToCartBtnCh.selector, "click", function () {
                    b("ADD_TO_CART", "ARMANI_EXTENSION_POPUP", "price=" + e.result.price)
                })
            }, 3e3)
        }
    })
}), youdao.define("modules/price/price.html", function () {
    return ' <div hui-mod="price" class="hui-shopping-datacont hui-fz12">\n    <ul hui-type="price-wrapper" class="hui-shopping-datalist hui-fz12">\n        <% _.each(_price.list, function (item, num) { %>\n        <li class="hui-datalist <%if(num === 0 && _container.urlPriceList[num].site === "360buy.com" && _container.urlPriceList[num] && _container.urlPriceList[num].hasDiwen ) {%> hui-brand-ad-active <% } %>" \n            hui-type="hoverMod" >\n        <a hidefocus="true" hoveraction="BAR_BIJIA_MOD_HOVER"\n            clkaction="BAR_BIJIA_MOD_CLICK"\n            class="hui-datalist-item hui-sp hui-sp11" href="<%=item.items[0].cpsUrl%><%if (num === 0 && _price.tip) {%>&pos=bijia_cheaper<% } else {%>&pos=bijia<% } %>" target="_blank">\n                <span class="hui-price-ptitle hui-color333 hui-ff2\n                    <% if (!item.available) {%>\n                    hui-colorb2\n                    <% } %>\n                    ">\n                    <em class="hui-fz16 hui-fwb"><%=item.price%></em><%=item.priceunit%>\n                </span>\n                <span class="hui-shopname">\n                    <% if(num === 0 && _container.urlPriceList[num].site === "360buy.com" && _container.urlPriceList[num] && _container.urlPriceList[num].hasDiwen) {%>\n                    <em class="hui-sp hui-sp-adsub"></em> \n                    <% } %>\n\n                    <%=item.siteName%>\n                    <% if (item.shopPromotion) { %>\n                    <em class="hui-sp hui-sp9"></em>\n                    <% } %>\n                    <% if (item.site === "ebook") { %>\n                    <em class="hui-sp hui-sp42"></em>\n                    <% } %>\n               </span>\n            </a>\n            <% if (num === 0) {%>\n                <% if (_price.tip) {%>\n            <div hui-type="tip" class="hui-shopping-commontips">\n                ���ͼ�\n                <div class="hui-sp hui-sp22"></div>\n            </div>\n                <% } %>\n           <% } %>\n            <div class="hui-shopping-lightbox">\n                <div class="hui-shopping-lightbox-hd"></div>\n                <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n                    <span class="hui-sp hui-sp42"></span>��ͬ����Ʒ����ͬ��ɫ�����ȣ�</div>\n                \n                <%if(_container.urlPriceList[num] && _container.urlPriceList[num].hasAdv && _container.urlPriceList[num].advContent) {%>\n                <div class="hui-shopping-brand-ad">\n                    <a class="hui-brand-ad-logo" target="_blank" href="<%=_container.urlPriceList[num].advImageClickUrl%>" clkaction="BAR_BIJIA_JINGDONGAD_IMG_CLICK">\n                        <img class="hui-brand-ad-img" src="<%=_container.urlPriceList[num].advImageUrl%>"/>\n                    </a>\n                    <a class="hui-brand-ad-cont" target="_blank" href="<%=_container.urlPriceList[num].advContentUrl%>" clkaction="BAR_BIJIA_JINGDONGAD_TEXT_CLICK">\n                        <%=_container.urlPriceList[num].advContent %>\n                    </a>\n                </div>\n                <% } %>\n\n                <ul class="hui-lightbox-price">\n                    <% _.each(item.items, function (onePrice) { %>\n                        <% if (!onePrice.available) { %>\n                    <li class="hui-colorb2 hui-clearfix">\n                        <a clkaction="BAR_BIJIA_ITEM_CLICK" \n                        class="hui-lightbox-price-itemb hui-clearfix"\n                         title="<%=onePrice.name%>" target="_blank"\n                          href="<%=onePrice.cpsUrl%>">\n                            <span class="hui-fr"><%=onePrice.price%><%=onePrice.priceunit%><br />(ȱ��)</span>\n                            <span class="hui-datalist-title hui-fl">\n                                <%=onePrice.shortName%>\n                                    <% if (onePrice.itemPromotion) { %>\n                                    <span class="hui-shopping-lh">\n                                    <em class="hui-sp hui-sp9"></em><%=onePrice.itemPromotion.info%>\n                                    </span>\n                                    <% } %>\n                                    <% if (onePrice.thirdparty) { %>\n                                    <span class="o-stores">������</span>\n                                    <% } %>\n                            </span>\n                        </a>\n                    </li>\n                        <% } else { %>\n                    <li class="hui-clearfix">\n                    <a clkaction="BAR_BIJIA_ITEM_CLICK" class="hui-lightbox-price-item hui-clearfix" title="<%=onePrice.name%>" target="_blank" href="<%=onePrice.cpsUrl%><%if (num === 0 && _price.tip) {%>&pos=bijia_cheaper<% } else {%>&pos=bijia<% } %>">\n                            <% if (item.site !== "haitao") { %>\n                        <span class="hui-fr"><%=onePrice.price%><%=onePrice.priceunit%><br /></span>\n                            <% } else { %>\n                            <span class="hui-fr ">\n                                <span class="hui-f00">Լ<%=onePrice.price%><%=onePrice.priceunit%></span>\n                                <br />$<%= onePrice.pricedollar %></span>\n                            <% } %>\n                        <span class="hui-datalist-title hui-fl">\n                            <%=onePrice.shortName%>\n                            <% if (onePrice.itemPromotion) { %>\n                            <span class="hui-shopping-lh">\n                            <em class="hui-sp hui-sp9"></em><%=onePrice.itemPromotion.info%>\n                            </span>\n                            <% } %>\n                            <% if (onePrice.thirdparty) { %>\n                            <span class="o-stores">������</span>\n                            <% } %>\n                        </span>\n                    </a>\n                    </li>\n                        <% } %>\n                    <% }) %>\n                </ul>\n\n                <div class="hui-lightbox-price-ft hui-tac hui-clearfix">\n                    <% if (item.site !== "haitao") { %>\n                        <% if (item.famous) { %>\n                        <em class="hui-sp hui-sp10"></em>\n                        <% } %>\n                        <% if (item.site !== "ebook") { %>\n                            <%=item.siteName%>\n                            <% if (item.shipping) {%>\n                            :<span class="hui-shopping-lh"><%=item.shipping%></span>\n                            <% } %>\n                        <% } %>\n                    <% } else { %>\n                    <span class="hui-fr hui-colorb2" style="margin-left: 50px;" title="��ǰ����<%= item.exchangerate %>">���ʣ�</span>\n                    <a clkaction="BAR_BIJIA_ITEM_CLICK" class="hui-fr"\n                        title="�ְ��ֽ̺��ԣ��������� ��" target="_blank" href="http://www.huihui.cn/guide/6576178">\n                        �ְ��ֽ̺��ԣ��������� ��\n                    </a>\n                    <% } %>\n                </div>\n\n            </div>\n\n        </li>\n        <% }) %>\n    </ul>\n\n    <% if (_price.list.length > 1) { %>\n    <a hidefocus="true" clkaction="BAR_BIJIA_MORE_MOD_CLICK" hui-type="more-price" class="hui-shopping-readmore hui-fz12" target="_blank" href="<%=_price.more%>" title="���౨��">���౨�� &gt;&gt;</a>\n    <% } %>\n</div>\n'
}), youdao.define("modules/price/price.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = (c._, a("modules/price/price.html")), f = (c.require_module("youdao.util"), c.mod), g = "price";
    f[g] = {
        template: e, event: function (a) {
            var b = c.cache.conf && (c.cache.conf.backCompat || 6 === c.cache.conf.ie), e = a.find('li[hui-type="hoverMod"]'), f = a.find('a[hui-type="more-price"]'), g = a.find('div[hui-type="tip"]'), h = function (c) {
                var d = b ? c.width - 120 : c.width - 40;
                0 >= d && a.css("display", "none"), a.show(), e.show(), f.hide();
                var g = e.length;
                if (!(a.width() < d))for (f.show(); g > 0 && a.width() > d;)e.eq(--g).css("display", "none")
            }, i = function () {
                a.hide()
            }, j = c.cache.localConf || {};
            if ("false" === j.funcTipsShowLower) {
                var k = d(".-hui-funtips", a);
                k.length > 0 && k.hide()
            }
            a.delegate(".-hui-funtips-close", "click", function () {
                var b = d(".-input-check", a);
                if (b.attr("checked")) {
                    var e = c.cache.localConf || {};
                    e.funcTipsShowLower = "false";
                    var f = document.getElementById(consts.optionsID);
                    f && c.cache.localConf && (f.innerHTML = c.util.jsonToStr(e, ";"))
                }
                d(".-hui-funtips", a).hide()
            });
            var l = function (a) {
                var b = {priceWrapWidth: h, hide: i};
                b[a.type] && b[a.type](a)
            };
            a.lMsg("container", l), g.length > 0 && a.sMsg({
                type: "showTips",
                $tip: g
            }), d(".hui-datalist-item,.hui-lightbox-price-item.hui-clearfix").each(function () {
                var a = d(this).attr("href");
                if (-1 === a.indexOf("?")) {
                    var a = a.replace("&", "?");
                    d(this).attr("href", a)
                }
            })
        }
    }
}), youdao.define("modules/quan/quan.html", function () {
    return ' <li hui-mod="quan" hui-type="<%= _quan.hasCoupons ? "hoverMod": "" %>" class="hui-shopping-quan hui-fz12">\n<a class="hui-sp hui-sp11" target="_blank" clkaction="QUAN_CLICK" hoveraction="QUAN_HOVER"\n    href="<%= _quan.hasCoupons ? _quan.list[0].url : "http://www.huihui.cn/coupons"%>">\n        <span class="hui-sp hui-sp2"></span>\n    </a>\n    <% if (_quan.hasCoupons && _quan.tip) { %>\n        <% if (_quan.tip.length > 6) { %>\n    <div hui-type="tip" class="hui-shopping-commontips hui-shopping-deftips">\n        ��ǰ�̼���ȯ\n        <% } else { %>\n    <div hui-type="tip" class="hui-shopping-commontips">\n        <%=_quan.tip %>\n        <% } %>\n        <div class="hui-sp hui-sp22"></div>\n    </div>\n    <% } %>\n    <% if (_quan.hasCoupons) { %>\n    <div class="hui-shopping-lightbox">\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div class="hui-shopping-lightbox-title hui-color333 hui-fwb"><span class="hui-sp hui-sp42"></span>�����Ż�ȯ</div>\n            <div class="hui-sp hui-sp15 hui-clearfix">\n               <div class="hui-fl hui-tac hui-quan-thumb">\n                    <a class="" target="_blank" clkaction="QUAN_IMAGE_CLICK" href="<%=_quan.list[0].url%>" title="<%=_quan.list[0].name%>">\n                        <img src="<%=_quan.list[0].imageURL%>" title="<%=_quan.list[0].name%>" width="140" height="100" />\n                    </a>\n                </div>\n                <div class="hui-quan-detail hui-tac">\n                    <a class="hui-btn-quanget hui-ff2 hui-fz16" target="_blank" clkaction="QUAN_BUTTON_CLICK" href="<%=_quan.list[0].url%>" title="<%=_quan.list[0].name%>">������ȡ</a>\n                    <p class="hui-color999"><span class="hui-sp hui-sp26"></span><%=_quan.list[0].fetchCount%>������ȡ</p>\n                </div>\n            </div>\n            <ul class="hui-quan-list">\n                <% _.each(_quan.list, function (item, num) { %>\n                <% if (num !== 0) { %>\n                <li class="hui-clearfix\n                <% if (num === _quan.list.length - 1) { %>\n                    hui-no-border\n                <% } %>\n                ">\n                    <span class="hui-fr hui-color999"><span class="hui-sp hui-sp26"></span><%=item.fetchCount%>������ȡ</span>\n                    <a class="hui-quan-list-title hui-fl" clkaction="QUAN_LINK_CLICK" target="_blank" href="<%=item.url%>"><span class="hui-quan-dot">��</span>\n                        <%=item.bName%> - <%=item.name%>\n                    </a>\n                </li>\n                <% } %>\n                <% }) %>\n            </ul>\n            <div class="hui-quan-ft">\n                <a target="_blank" clkaction="QUAN_MORE_CLICK" href="http://quan.163.com/?from=extension">ȥ������<span class="hui-sp hui-sp16"></span></a>\n            </div>\n    </div>\n    <% } %>\n</li>\n'
}), youdao.define("modules/quan/quan.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/quan/quan.html")), e = c.mod, f = "quan";
    e[f] = {
        template: d, event: function (a) {
            var b = a.find('div[hui-type="tip"]');
            b.length > 0 && a.sMsg({type: "showTips", $tip: b})
        }
    }
}), youdao.define("modules/recmdHistory/recmdHistory.html", function () {
    return ' <div hui-mod="recmdHistory" id="GWZS-recmdHistory" class="hui-sidebar-container">\n    <a href="javascript:void(0)" clkaction="SIDEBAR_REC_CLOSE_CLICK"\n        class="-close hui-shopping-sidebar-close -sidebar-close"\n        data-change="<%= _recmdHistory.isShow ? "" : "true"%>"\n        title="�ر�">\n        �ر�</a>\n    <div class="hui-shopping-sidebar-hd">�����ʷ����Ƽ�</div>\n    <div class="hui-shopping-sidebar-bd hui-recmdHistory -hui-recmdHistory">\n        <div class="bd-hd c999">\n            <span class="u-view">����������</span>\n            �������������ʷ��ȫ���ؼۺ�������Ʒ�Ƽ�\n        </div>\n            <ul class="bd-bd hui-clearfix">\n                <% for(var i = 0; i < _recmdHistory.array.length ; i ++) { %>\n                <li class="item-list <%= i == 0 ? "active" : "" %>" data-type="pop-item">\n                    <a class="item" href="<%= _recmdHistory.array[i].historyUrl%>" target="_blank" clkaction="SIDEBAR_REC_HISTORY_CLICK">\n                        <img src="<%= _recmdHistory.array[i].historyImg%>" title="<%= _recmdHistory.array[i].historyTitle%>" />\n                    </a>\n                    <ul class="subitem">\n                        <% for(var j = 0; j < _recmdHistory.array[i].items.length; j ++) { %>\n                        <li class="subitemlist hui-clearfix">\n                            <div class="thumb">\n                                <% if (_recmdHistory.array[i].items[j].isHistoryLowest) { %>\n                                <span class="hui-tag"></span>\n                                <% } %>\n                                <a class="item" href="<%= _recmdHistory.array[i].items[j].url%>" target="_blank"\n                                    data-log-position="IMAGE"\n                                    clkaction="SIDEBAR_REC_ITEM_CLICK">\n                                    <img src="<%= _recmdHistory.array[i].items[j].img%>" title="<%= _recmdHistory.array[i].items[j].title%>" />\n                                </a>\n                            </div>\n                            <div class="detail">\n                                <% if (_recmdHistory.array[i].items[j].type.indexOf("DISCOUNT") >= 0) { %>\n                                <span class="c999">[��ֵ�����Ƽ�]</span>\n                                <% } else { %>\n                                <span class="c999">[��������Ʒ���û�������]</span>\n                                <% } %>\n                                <a class="title-link" href="<%= _recmdHistory.array[i].items[j].url%>" target="_blank"\n                                    data-log-position="TITLE"\n                                    clkaction="SIDEBAR_REC_ITEM_CLICK">\n                                        <%= _recmdHistory.array[i].items[j].title%>\n                                </a>\n                                <div class="item-cprice">\n                                    <% if (_recmdHistory.array[i].items[j].type.indexOf("DISCOUNT") >= 0) { %>\n                                    <span class="hui-fall"></span>\n                                    <% } %>\n                                    <span class="clh"><%= _recmdHistory.array[i].items[j].price%>Ԫ</span>\n                                    <span class="clh"><%= _recmdHistory.array[i].items[j].desc%></span>\n                                </div>\n                           </div>\n                        </li>\n                        <% } %>\n                    </ul>\n                </li>\n                <% } %>\n            </ul>\n    </div>\n</div>\n<a class="hui-sidebar-btn -sidebar-btn" href="javascript:void(0)" title="�ݻݹ������ֶ����ṩ"\n    clkaction="SIDEBAR_REC_OPEN_CLICK">\n    <i class="hui-sidebar-btn-logo hui-sp">logo</i>\n    <p class="hui-sidebar-btn-p" >��������</p>\n    <i class="hui-sidebar-btn-arrow-left hui-sp">arrow</i>\n</a>\n';
}), youdao.define("modules/recmdHistory/recmdHistory.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.require_module("youdao.consts"), c.require_module("youdao.cache")), e = c.require_module("youdao.util"), f = (c.require_module("youdao.dom"), c.jQuery), g = (c._, a("modules/recmdHistory/recmdHistory.html")), h = c.mod, i = "recmdHistory";
    h[i] = {
        template: g, event: function (a) {
            var b, c = "ARMANI_EXTENSION_POPUP", g = d.data.recmdHistory || {};
            if (b = g.isShow ? "SIDEBAR_REC_TIP_TRIGGER" : "SIDEBAR_REC_PACKUP_TRIGGER", d.fn && d.fn.sendLog && e.isFunction(d.fn.sendLog)) {
                var h = document.createElement("div");
                d.fn.sendLog(b, h, c)
            }
            var i = f("[data-type='pop-item']", a);
            i.live("mouseenter", function (a) {
                if (c = "ARMANI_EXTENSION_ACTION", b = "SIDEBAR_REC_HISTORY_HOVER", d.fn && d.fn.sendLog && e.isFunction(d.fn.sendLog)) {
                    var g = document.createElement("div");
                    d.fn.sendLog(b, g, c)
                }
                i.removeClass("active"), f(this).addClass("active")
            })
        }
    }
}), youdao.define("modules/recommand/recommand.html", function () {
    return ' <% if (!_recommand.show) { %>\n<li hui-mod="recommand" hui-type="hoverMod" class="hui-shopping-recommand hui-fz12">\n<a class="hui-sp hui-sp11" id="youdaoGWZS_recommand"\n    href="javascript:void(0)"\n    hoverAction="SIDEBAR_REC_HOVER">\n    <span class="hui-icon-cont">\n        <em class="hui-sp hui-sp37 hui-recommand-icon"></em>\n    </span><br />\n    ��ֵ�ؼ�\n</a>\n    <% if (_recommand.hasTip) { %>\n        <div hui-type="tip" class="hui-shopping-commontips" style="width: 75px;">\n            ��������ؼ�\n            <div class="hui-sp hui-sp22"></div>\n        </div>\n    <% } %>\n    <div class="hui-shopping-lightbox -hui-box-recommand">\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div class="hui-shopping-lightbox-title hui-color333 hui-fwb"><span class="hui-sp hui-sp42"></span>����ؼ���Ʒ�Ƽ�</div>\n    </div>\n\n    <!--new feature show tips-->\n    <div hui-box="new-feature" class="hui-newfeature hui-info-box">\n        <span class="hui-sp hui-feature-new"></span>\n        <span class="hui-sp hui-feature-logo"></span>\n        <span class="hui-box-corner-right"></span>\n        <div class="hui-newfeature-con">\n            <h1>�����¹��� - <span class="color-green">��ֵ�ؼ�</span></h1>\n            <p>�����������Ʒ,\n            <br />\n            �����ҳ�ȫ����ص�<span class="color-green">�ؼ�</span>��<span class="color-green">����</span>��\n            </p>\n        </div>\n        <a hui-type="box-close" href="javascript:void(0);"\n         clkAction="WELCOME_CLOSE_CLICK"  data-log-feature="RECOMMEND" \n         title="�ر�" class="hui-sp hui-box-close">X</a>\n    </div>\n</li>\n<% } else { %>\n<div hui-mod="recommand" id="GWZS-recommand" class="hui-sidebar-container">\n    <a href="javascript:void(0)" \n        class="incidentallyBuy-close hui-shopping-sidebar-close -sidebar-close" clkaction="SIDEBAR_REC_CLOSE_CLICK"  title="�ر�">\n        �ر�</a>\n    <div class="hui-shopping-sidebar-hd">�����Ƽ�</div>\n    <div class="hui-shopping-sidebar-bd hui-recommand -hui-box-recommand">\n    </div>\n</div>\n    <% if(_container.thisSite.site === "amazon.cn" && _container.thisItem) { %>\n    <div id="GWZS-sidebar-down-collection" class="hui-sidebar-collection-btns <% if (_container.myZhushouCollectData && _container.myZhushouCollectData.collected) {%> hui-collection-already <%}%>" style="display: none;">\n        <a class="hui-sidebar-down-collected hui-sidebar-down-collec-btn"  href="javascript:void(0)"\n            hui-type="hui-collect" hui-collection-source="sidebar-down"\n            hui-collection-offsetX="-200"  hui-collection-offsetY="-200"\n            title="���ȡ���ղ�" clkaction="SIDEBAR_DOWN_FAVOR_UNSUB_CLICK"\n        >\n            <i class="hui-sidebar-down-collec-logo hui-sp"></i>\n            <span class="hui-sidebar-down-collec">\n                <span class="hui-sidebar-collec-sp hui-sidebar-already-collec-img"></span>\n                <span class="hui-sidebar-down-collec-title">���ղ�</span>\n            </span>\n        </a>\n        <a class="hui-sidebar-down-no-collected hui-sidebar-down-collec-btn"  href="javascript:void(0)"\n            hui-type="hui-collect" hui-collection-source="sidebar-down"\n            hui-collection-offsetX="-400"  hui-collection-offsetY="-286"\n            title="����ղأ���Ʒ������֪ͨ" clkaction="SIDEBAR_DOWN_FAVOR_UNSUB_CLICK"\n        >\n            <i class="hui-sidebar-down-collec-logo hui-sp"></i>\n            <span class="hui-sidebar-down-collec">\n                <span class="hui-sidebar-collec-sp hui-sidebar-collec-img"></span>\n                <span class="hui-sidebar-down-collec-title">�ղ�</span>\n            </span>\n        </a>\n    </div>\n<% } %>\n\n<a class="hui-sidebar-btn -sidebar-btn" href="javascript:void(0)"\n    title="�ݻݹ������ֶ����ṩ" clkaction="SIDEBAR_REC_OPEN_CLICK">\n    <span class="hui-sidebar-btn-cont">\n        <!--<p class="hui-sidebar-btn-p" ><%= _recommand.pageType === "list" ? "���Ż���" : "����ϲ��"%></p>-->\n        <p class="hui-sidebar-btn-p" >�����Ƽ�</p>\n        <i class="hui-sidebar-btn-arrow-right hui-sp">arrow</i>\n    </span>\n</a>\n<!--hui-collection-already-->\n<% if(_container.thisSite.site === "amazon.cn" && _container.thisItem) { %>\n<div id="GWZS-sidebar-collection" class="hui-sidebar-collection-btns <% if (_container.myZhushouCollectData && _container.myZhushouCollectData.collected) {%> hui-collection-already <%}%>">\n    <a class="hui-sidebar-collected hui-sidebar-collec-btn" href="javascript:void(0)"\n       hui-type="hui-collect" hui-collection-source="sidebar"\n       hui-collection-offsetX="-200" hui-collection-offsetY="-52"\n       title="���ȡ���ղ�" clkaction="SIDEBAR_FAVOR_UNSUB_CLICK">\n        <span class="hui-sidebar-collec-sp hui-sidebar-already-collec-img"></span>\n        <p class="hui-sidebar-collec-title">���ղ�</p>\n    </a>\n    <a class="hui-sidebar-no-collected hui-sidebar-collec-btn" href="javascript:void(0)"\n       hui-type="hui-collect" hui-collection-source="sidebar" \n       hui-collection-offsetX="-400" hui-collection-offsetY="-150"\n       title="����ղأ���Ʒ������֪ͨ" clkaction="SIDEBAR_FAVOR_SUB_CLICK">\n        <span class="hui-sidebar-collec-sp hui-sidebar-collec-img"></span>\n        <p class="hui-sidebar-collec-title">�ղ�</p>\n    </a>\n</div>\n<% } \n} %>\n'
}), youdao.define("modules/recommand/recommandNew.html", function () {
    return ' <div id="hui-recommand-new" hui-mod="hui-plugin-like" class="w full tb-scombo" style="display:none">\r\n    <div class="inner">\r\n        <div class="hui-pluginlike-hd">\r\n            <span class="hui-sp hui-pluginlike-close" clkaction="REC_NEW_ITEM_CLOSE_CLICK">X</span>\r\n            <h3><span class="hui-sp hui-pluginlike-ico"></span>����ϲ��</h3>\r\n        </div>\r\n        <div class="hui-pluginlike-bd">\r\n            <div class="recommand-new-inner">\r\n                <ul class="hui-pluginlike-slider clearfix">\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class="hui-pluginlike-btn">\r\n            <a href="javascript:void(0)" class="hui-sp hui-pluginlike-prev disabled" clkaction="REC_NEW_ITEM_PREV_CLICK">&lt</a>\r\n            <a href="javascript:void(0)" class="hui-sp hui-pluginlike-next" clkaction="REC_NEW_ITEM_NEXT_CLICK">&gt</a>\r\n        </div>\r\n    </div>\r\n</div>'
}), youdao.define("modules/recommand/content.html", function () {
    return ' <% var len = subList.length > 30 ? 30 : subList.length; %>\n<% len = isShowRecommandNew ? len : (len > 9 ? 9 : len);%>\n<% for (var i = 0; i < len ; i ++) { %>\n<% if (!isShowRecommandNew) { %>\n    <% if (!isInTool) { %>\n        <% if (i === discountTitleInfo.index) { %>\n        <div class="head-wrapper" data-page="<%= discountTitleInfo.page %>"\n            style="left:<%= subList[i].offsetLeft %>px; top:<%= discountTitleInfo.top %>px;">\n            <div class="head-line"></div>\n            <div class="head-title">��ֵ�Ƽ�</div>\n        </div>\n        <% } %>\n        <% if (i === itemTitleInfo.index) { %>\n        <div class="head-wrapper" data-page="<%= itemTitleInfo.page %>"\n            style="left:<%= subList[i].offsetLeft %>px; top:<%= itemTitleInfo.top %>px;">\n            <div class="head-line"></div>\n            <div class="head-title">�����ֿ�</div>\n        </div>\n        <% } %>\n        <% if (i === salesTitleInfo.index) { %>\n        <div class="head-wrapper" data-page="<%= salesTitleInfo.page %>"\n            style="left:<%= subList[i].offsetLeft %>px; top:<%= salesTitleInfo.top %>px;">\n            <div class="head-line"></div>\n            <div class="head-title">Ʒ������</div>\n        </div>\n        <% } %>\n    <% } %>\n    <li style="left:<%= subList[i].offsetLeft %>px; top:<%= subList[i].offsetTop%>px;"\n    data-index="<%= subList[i].index || i %>" data-row="<%= subList[i].rowNum%>">\n        <% if (subList[i].temptType === "BRAND") { %>\n            <!--Ʒ������-->\n            <a class="sales-wrapper" target="_blank"\n                clkaction="SIDEBAR_REC_ITEM_CLICK"\n                data-log-status="<%= subList[i].temptType %>"\n                data-log-position="<%= (_recommand.pageType || "").toUpperCase() %>"\n                data-log-title="<%= subList[i].title %>" data-log-ad="<%= subList[i].ad %>" data-log-extra= "<%= subList[i].extra %>"\n                href="<%= subList[i].url %>" title="<%= subList[i].title %>" >\n                <div class="sales-image-wrapper">\n                    <img src="<%= subList[i].imgUrl %>" alt="<%= subList[i].title %>" />\n                </div>\n                <p class="sales-title">\n                    <span>\n                        <%= subList[i].title %>\n                    </span>\n                </p>\n                <p><span class="sales-discount"><%= subList[i].brandDiscountInfo%></span>��</p>\n            </a>\n        <% } else { %>\n        <!--��ƷͼƬ + ���� -->\n        <div class="image-wrapper">\n            <a href="<%= subList[i].url %><%if(!subList[i].mediavAD){%>&pos=sidebar_rec<%}%>"\n                data-log-title="<%= subList[i].title %>" data-log-ad="<%= subList[i].ad %>" data-log-extra= "<%= subList[i].extra %>"\n                clkaction="SIDEBAR_REC_ITEM_CLICK" target="_blank"\n                data-log-status="<%= subList[i].temptType %>"\n                data-log-position="<%= (_recommand.pageType || "").toUpperCase() %>"\n                title="<%= subList[i].title %>">\n                <img src="<%= subList[i].imgUrl %>" alt="<%= subList[i].title %>"/>\n            </a>\n            <% if (subList[i].showTip) { %>\n                <i class="hui-sp tip-<%= subList[i].temptType%>">�Ѵﵽ</i>\n            <% } %>\n        </div>\n        <div class="content-wrapper">\n            <!--�Ƽ���Ϣ������������-->\n            <% if (isInTool) { %>\n                <% if (subList[i].temptType === "DISCOUNT") { %>\n                <p class="hui-recommand-type">[��ֵ�����Ƽ�]</p>\n                <% } else { %>\n                <p class="hui-recommand-type">[��������Ʒ���û�������]</p>\n                <% } %>\n            <a href="<%= subList[i].url %>"\n                clkaction="BAR_REC_ITEM_CLICK" target="_blank"\n                data-log-status="<%= subList[i].temptType %>"\n                data-log-position="<%= (_recommand.pageType || "").toUpperCase() %>"\n                class="hui-recommand-title hui-recommand-title-<%= subList[i].temptType%>"\n                title="<%= subList[i].title %>">\n                <%= subList[i].title %>\n            </a>\n            <% } %>\n            <!--�ڲ����ʱ����ʾ-->\n            <p class="hui-recommand-price">\n                <% if (subList[i].temptType === "DISCOUNT" && !isInTool) { %>\n                    <% if (subList[i].lowest) { %>\n                        <i class="hui-lowest hui-sp"></i>\n                    <% } else { %>\n                        <i class="hui-fall hui-sp"></i>\n                    <% } %>\n                <% } %>\n                <span class="hui-recommand-current-price"><%= subList[i].price %><%= subList[i].priceUnit %></span>\n                    <% if (subList[i].discountRate !== 10 && subList[i].temptType === "DISCOUNT") { %>\n                        <span class="hui-recommand-origin-price">\n                            <% if (isInTool) { %>\n                            ԭ��\n                            <% } %>\n                            <em><%= subList[i].maxPrice %></em><%= subList[i].priceUnit %>\n                        </span>\n                    <% } %>\n                    <% if (subList[i].temptType === "ITEMCF" && !isInTool) { %>\n                    <span class="hui-read"><%= subList[i].covisitNum%>�˻���</span>\n                    <% } %>\n                    <% if (subList[i].temptType === "CART" && !isInTool) { %>\n                    <span class="hui-read"><%= parseInt(subList[i].extra_hot) %>��ϲ��</span>\n                    <% } %>\n            </p>\n            <!--�Ƽ���Ϣ������������-->\n            <% if (isInTool) { %>\n                <% if (subList[i].temptType === "DISCOUNT") { %>\n                <div class="hui-recommand-disc">\n                    <% if (subList[i].lowest) { %>\n                        <i class="hui-lowest hui-sp"></i>\n                    <% } else { %>\n                        <i class="hui-fall hui-sp"></i>\n                    <% } %>\n                    <%= subList[i].discountRate%>��\n                    <% if (subList[i].discountDescription !== "") { %>\n                        ��<%= subList[i].discountDescription %>\n                    <% } %>\n                </div>\n                <% } %>\n            <% } %>\n        </div>\n        <% } %>\n    </li>\n    <% } else{ %>\n    <li>\n        <a class="hui-pluginlike-pic" target="_blank"\n           clkaction="REC_NEW_ITEM_CLICK"\n           data-log-status="<%= subList[i].temptType %>"\n        data-log-title="<%= subList[i].title %>" data-log-ad="<%= subList[i].ad %>" data-log-extra="<%= subList[i].extra %>"\n        href="<%= subList[i].url %>" title="<%= subList[i].title %>">\n            <img src="<%if(i<10){%><%= subList[i].imgUrl %><%}else{%><%=imgPath%><%}%>" <%if(i>=10){%>original-src="<%= subList[i].imgUrl %>"<%}%> alt="<%= subList[i].title %>" data-origin="zhushou">\n            <% if (subList[i].showTip) { %>\n                <span class="goods-tip">\n                    <span class="goods-tip-bg"></span>\n                    <em>�ؼ�</em>\n                </span>\n            <% } %>\n        </a>\n        <h4 class="hui-pluginlike-title"><a clkaction="REC_NEW_ITEM_TITLE_CLICK"\n                                            data-log-status="<%= subList[i].temptType %>"\n                                            data-log-title="<%= subList[i].title %>" data-log-ad="<%= subList[i].ad %>" data-log-extra="<%= subList[i].extra %>" href="<%= subList[i].url %>" title="<%= subList[i].title %>" target="_blank"><%= subList[i].title %></a></h4>\n        <div class="hui-pluginlike-info">\n\n            <% if (subList[i].temptType === "DISCOUNT" && !isInTool) { %>\n                <% if (subList[i].lowest) { %>\n                    <i class="hui-lowest hui-sp"></i>\n                <% } else { %>\n                    <i class="hui-fall hui-sp"></i>\n                <% } %>\n            <% } %>\n            <span class="hui-pluginlike-price">\n                <% if(subList[i].priceUnit=="��Ԫ"){%>$<%}else if(subList[i].priceUnit=="Ԫ"){%>?<%}%><%= subList[i].price %><% if(subList[i].priceUnit=="��Ԫ"){%>��<%}%>\n            </span>\n            <% if (subList[i].temptType === "ITEMCF" && !isInTool) { %>\n            <span class="hui-pluginlike-look"><%= subList[i].covisitNum %>�˻���</span>\n            <% } %>\n        </div>\n    </li>\n    <% } %>\n<% } %>\n'
}), youdao.define("modules/recommand/wrapper.html", function () {
    return ' <% if (type !== "noData") { %>\r\n    <div class="sublist-viewport <%= type === "full" ? "fullHeight" : "halfHeight" %>">\r\n        <ul>\r\n        </ul>\r\n        </div>\r\n                <div class="paging-wrapper">\r\n                    <a href="javascript:void(0)"\r\n                        clkaction="SIDEBAR_REC_CHANGEPAGE_CLICK"\r\n                        data-log-position="PREV"\r\n                        class="-prev prev-page-unable prev-page" title="ǰһҳ"></a>\r\n                    <span class="page-number">\r\n                        <span class="-right-page right-page">1</span>\r\n                        /<span class="-total-pages total-pages"><%= totalPages %></span>\r\n                    </span>\r\n                    <a href="javascript:void(0)"\r\n                        clkaction="SIDEBAR_<%= logType %>_CHANGEPAGE_CLICK"\r\n                        data-log-position="NEXT"\r\n                        class="-next next-page  <%= totalPages === 1 ? "next-page-unable" : "" %>"\r\n                        title="��һҳ">��һҳ</a>\r\n                </div>\r\n<% } else { %>\r\n        <div class="hui-nosubBookmarkstips hui-colorb2">\r\n        <% if (recommendType !== "bookmarks") { %>\r\n            <p class="sublist-nodata">�������������ʷ�����������Ʒ�Ƽ�</p>\r\n        <% } else { %>\r\n            <p>����<%= consts.firstHd %></p>\r\n            <p>��<%= consts.firstHd %>����Ʒ���ڴ˿��ٲ鿴�͹���</p>\r\n        <% } %>\r\n        </div>\r\n<% } %>\r\n\r\n\r\n'
}), youdao.define("modules/recommand/recommand.js", function (require, exports, module) {
    "use strict";
    var yd = youdao, cache = yd.require_module("youdao.cache"), consts = yd.require_module("youdao.consts"), util = yd.require_module("youdao.util"), msg = yd.reg("recommand"), $ = yd.jQuery, _ = yd._, mod = yd.mod, prefixName = consts.commonName, name = "recommend", msg = yd.reg("recommand"), modeName = prefixName + "recommand", iconHtml = require("modules/recommand/recommand.html"), recommandNewHtml = require("modules/recommand/recommandNew.html"), name = "recommand";
    mod[name] = {
        template: iconHtml, event: function (a) {
            var b = cache.data.guess_you_like_posi, c = cache.data.guess_you_like_posi && "failed" != cache.data.guess_you_like_posi;
            if ("close" === cache.localConf.isRecommandOpen || c && "close" == cache.localConf.recommandNew)return $('div[hui-mod="recommand"]').remove(), $('a[clkaction="RECMDITEM_SIDEBAR_OPEN"]').remove(), void $("#youdaoGWZS-sidebar-right").remove();
            c && "close" != cache.localConf.recommandNew && $(b).after(recommandNewHtml);
            var d = a.find('div[hui-type="tip"]');
            d.length > 0 && a.sMsg({
                type: "showTips",
                $tip: d
            }), $("#youdaoGWZS-sidebar-right").css("display", "none"), recommand(a)
        }
    };
    var recommand = function ($mod) {
        function renderItems(a) {
            var b = require("modules/recommand/content.html");
            a.logType = "REC";
            var c = {}, d = {}, e = {}, f = !1, g = !1, h = !1;
            isInTool || _.each(a, function (a, b) {
                "DISCOUNT" !== a.temptType || g || (c.top = a.offsetTop - 20, c.index = b, c.page = a.rowNum, g = !0), "ITEMCF" !== a.temptType || h || (d.top = a.offsetTop - 20, d.index = b, d.page = a.rowNum, h = !0), "BRAND" !== a.temptType || f || (e.top = a.offsetTop - 20, e.index = b, e.page = a.rowNum, f = !0)
            }), setTimeout(function () {
                if ($(selector.listViewPortQ).append(_.template(b)({
                        subList: a.splice(0, 9),
                        discountTitleInfo: c,
                        itemTitleInfo: d,
                        salesTitleInfo: e,
                        isInTool: isInTool,
                        isShowRecommandNew: !1,
                        imgPath: ("https:" == location.protocol ? "//shared.ydstatic.com/gouwuex/images/extension_3_1/".replace(/shared\./gi, "shared-https.") : "//shared.ydstatic.com/gouwuex/images/extension_3_1/") + "loading.gif"
                    })), !recommendData.items)return !1;
                $(selector.listViewPortQNew).append(_.template(b)({
                    subList: recommendData.items,
                    discountTitleInfo: c,
                    itemTitleInfo: d,
                    salesTitleInfo: e,
                    isInTool: isInTool,
                    isShowRecommandNew: isShowMiddleRem && "close" != cache.localConf.recommandNew,
                    imgPath: ("https:" == location.protocol ? "//shared.ydstatic.com/gouwuex/images/extension_3_1/".replace(/shared\./gi, "shared-https.") : "//shared.ydstatic.com/gouwuex/images/extension_3_1/") + "loading.gif"
                }));
                var f, g, h, i = 0, j = $(selectorNew.mod), k = j.find("li"), l = j.find("li").length, m = 5, n = 0;
                0 == h && j.find(selectorNew.next).addClass("disabled"), $("#page.tm-style-detail").length > 0 && ($("#hui-recommand-new").removeClass("full").find(".inner").css("width", "990px"), m = 4), j.show(), f = k.outerWidth(!0), g = f * m, h = Math.ceil(l / m) - 1, j.delegate(selectorNew.prev, "click", function () {
                    0 == i || j.find(selectorNew.slider).is(":animated") || (i--, j.find(selectorNew.next).removeClass("disabled"), 0 == i && j.find(selectorNew.prev).addClass("disabled"), n += g, j.find(selectorNew.ul).animate({left: n}, 500))
                }), j.delegate(selectorNew.next, "click", function () {
                    if (!(i >= h || j.find(selectorNew.slider).is(":animated"))) {
                        j.find(selectorNew.prev).removeClass("disabled"), i++, i == h && j.find(selectorNew.next).addClass("disabled");
                        var a, b, c = i * m + m, d = c + m;
                        if (l > c)for (var e = c; d > e; e++)a = k.eq(e).find("img"), b = a.attr("original-src"), b && a.attr("src", b).removeAttr("original-src");
                        n -= g, j.find(selectorNew.ul).animate({left: n}, 500)
                    }
                }), j.delegate(selectorNew.close, "click", function () {
                    var a = document.getElementById(consts.optionsID);
                    cache.localConf.recommandNew = "close", a.innerHTML = util.jsonToStr(cache.localConf, ";"), j.remove()
                })
            }, 500)
        }

        function renderWrapper(a, b, c) {
            var d;
            d = {
                css: "youdao",
                logo: "�������ϲ������Ʒ",
                consts: consts.subConsts,
                totalPages: b,
                recommendType: c,
                isInTool: isInTool,
                logType: "REC",
                type: a
            };
            var e = require("modules/recommand/wrapper.html"), f = _.template(e)(d);
            $(selector.listWrapper).append(f), "noData" !== a ? ($(selector.listWrapper).removeClass(selector.subHalfWidth), isInTool && $(selector.listWrapper).addClass(selector.subFullWidth), "full" === a ? $(selector.contentWrapperQ).css({height: 439}) : $(selector.contentWrapperQ).css({height: 202})) : (isInTool && $(selector.listWrapper).removeClass(selector.subFullWidth), $(selector.listWrapper).addClass(selector.subHalfWidth), $(selector.contentWrapperQ).addClass(selector.subNoList))
        }

        function sendShowLog(a, b) {
            var c = _ajaxSlide.conf.perItems, d = _ajaxSlide.subLists;
            if (-1 === _.indexOf(logPageList, a)) {
                var e = 0 > a - 1 ? 0 : (a - 1) * c, f = e + c > d.length ? d.length : e + c, g = "log_data=" + _ajaxSlide.listType;
                for (g += "&position=" + (recmdinfo.pageType || "").toUpperCase(), g += "&page_num=" + a; f > e; e++)g += "&url" + e + "=" + encodeURIComponent(d[e].url), g += "&ad" + e + "=" + encodeURIComponent(d[e].ad), g += "&extra" + e + "=" + encodeURIComponent(d[e].extra), g += "&classify" + e + "=" + encodeURIComponent(d[e].type), g += "&site" + e + "=" + encodeURIComponent(d[e].domain);
                if (cache.fn && cache.fn.sendLog && util.isFunction(cache.fn.sendLog)) {
                    var h = document.createElement("div"), i = isShowMiddleRem ? "SIDEBAR_REC_NEW_TRIGGER" : "SIDEBAR_REC_TRIGGER";
                    h.setAttribute("params", g), setTimeout(function () {
                        cache.fn.sendLog(i, h, "ARMANI_EXTENSION_" + b)
                    }, 100), logPageList.push(a)
                }
            }
        }

        var isShowMiddleRem = cache.data.guess_you_like_posi && "failed" != cache.data.guess_you_like_posi, selector = {
            icoQ: "." + modeName + "-ico",
            listViewPortQ: ".-hui-box-recommand .sublist-viewport ul",
            listViewPortQNew: ".hui-pluginlike-bd ul",
            listWrapper: ".-hui-box-recommand",
            contentWrapperQ: "#youdaoGWZSRecommand .youdaoGWZS_content",
            itemQ: ".sublist-viewport li",
            prevBtnQ: "li[hui-mod='recommand'] .-prev",
            nextBtnQ: "li[hui-mod='recommand'] .-next",
            rightPageQ: "li[hui-mod='recommand'] .-right-page",
            totalPageQ: "li[hui-mod='recommand'] .-total-pages",
            unablePrev: "prev-page-unable",
            unableNext: "next-page-unable",
            subHalfWidth: "sublist-halfWidth",
            subFullWidth: "sublist-fullWidth",
            subNoList: "has-no-subList"
        }, selectorNew = {
            mod: "#hui-recommand-new",
            ul: ".hui-pluginlike-slider",
            next: ".hui-pluginlike-next",
            prev: ".hui-pluginlike-prev",
            close: ".hui-pluginlike-close",
            slider: ".hui-pluginlike-slider"
        }, _ajaxSlide, recommendData = {}, recmdinfo = cache.data.recmdinfo || {}, isInTool = !1;
        if (!isInTool) {
            var logType = "ARMANI_EXTENSION_POPUP", logAction = "SIDEBAR_REC_TIP", logParams = "position=" + (recmdinfo.pageType || "").toUpperCase();
            if (cache.fn && cache.fn.sendLog && util.isFunction(cache.fn.sendLog)) {
                var temp = document.createElement("div");
                temp.setAttribute("params", logParams), cache.fn.sendLog(logAction, temp, logType)
            }
        }
        recommendData.items = recmdinfo.itemList;
        var AjaxSlide = require("modules/common/ajaxSlide.js"), slidConf = {
            renderWrapper: renderWrapper,
            defaultType: "",
            isAjax: !1,
            isFlex: !0,
            colums: 1,
            perItems: 3,
            itemOffsetX: 350,
            itemOffsetY: 115,
            renderItems: renderItems
        };
        isInTool || (slidConf.oritation = "v", slidConf.colums = 3, slidConf.itemOffsetX = 0, slidConf.itemOffsetY = 115, slidConf.wrapHeight = "403");
        var showTipTypeList = [];
        _.each(recommendData.items, function (a, b) {
            var c = a.type, d = a.extra || "", e = d.split(";") || [];
            _.each(e, function (b) {
                var c = b.split(":") || [];
                a["extra_" + c[0]] = c[1]
            });
            var f = a.brandActiveInfo;
            if (f) {
                var g = f.match(/(?:\s*)[0-9.-]*/);
                a.brandDiscountInfo = g.length && g[0] || a.brandActiveInfo
            }
            var h = c.split("_");
            h.length > 0 && (a.temptType = h[0], "DISCOUNT" === a.temptType && a.lowest && (a.showTip = !0))
        }), recommendData.total = recmdinfo.itemList ? recmdinfo.itemList.length : 0;
        var mediavIsShow = cache.data && cache.data.mediav;
        if (mediavIsShow) {
            $("#youdaoGWZS-sidebar-right").css("display", "none");
            var mediavTimer = ["0", "0", "0"], mediav = [], showid = cache.data.thisItem ? "cspZbi" : "LgNRX2", qhtid = 112679, qhpid = cache.data.thisItem ? cache.data.thisItem.id : "", qhcn = cache.data.thisItem ? cache.data.thisItem.categoryId : "", qhprice = cache.data.thisItem ? cache.data.thisItem.price : "", qhtag = cache.data.thisItem ? cache.data.thisItem.name : "", uid = function () {
                function a(a) {
                    var b, c = 1, d = 0;
                    if (a)for (c = 0, b = a.length - 1; b >= 0; b--)d = a.charCodeAt(b), c = (c << 6 & 268435455) + d + (d << 14), d = 266338304 & c, c = 0 != d ? c ^ d >> 21 : c;
                    return c
                }

                return ("" + a(window.location.href) + a(document.domain) + (new Date - 0) + Math.floor(1e3 * Math.random())).substr(0, 32)
            }(), mediavStartDate = new Date, mediavAdConsuming;
            !function () {
                var json = {
                    baseUrl: "https://show-3.mediav.com/",
                    url: "s",
                    params: {
                        showid: showid,
                        type: 1,
                        of: 4,
                        uid: uid,
                        qhtid: qhtid,
                        qhpid: qhpid,
                        qhcn: qhcn,
                        qhprice: qhprice,
                        qhtag: qhtag
                    },
                    success: function (data) {
                        if (!data)return !1;
                        if (window.isInExtension && !_.isArray(data) && (data = eval("(" + data + ")")), !data.length || data.length < 3)return !1;
                        $.each(data, function (a, b) {
                            if (0 != a) {
                                var c = {};
                                c.price = b.price + "Ԫ", c.url = b.curl1, c.imgUrl = b.timg, c.mediavAD = !0, b.hasOwnProperty("pn") ? c.title = b.pn : c.title = "", b.hasOwnProperty("oprice") ? c.maxPrice = b.oprice : c.maxPrice = "", mediav.push(c)
                            }
                        });
                        var mediavOverDate = new Date;
                        mediavAdConsuming = mediavOverDate - mediavStartDate, slidConf.data = {items: mediav}, slidConf.data.total = Math.min(mediav.length, 9), _ajaxSlide = new AjaxSlide(slidConf), $("#youdaoGWZS-sidebar-right").css("display", "block");
                        var logType = "ARMANI_EXTENSION_POPUP", logAction = "SIDEBAR_REC_AD", mediavADType = cache.data.thisItem ? "detail" : "list", logParams = "mediavSuccessNum=" + slidConf.data.total + "&mediavCategoryId=" + qhcn + "&mediavADType=" + mediavADType;
                        if (cache.fn && cache.fn.sendLog && util.isFunction(cache.fn.sendLog)) {
                            var temp = document.createElement("div");
                            temp.setAttribute("params", logParams), cache.fn.sendLog(logAction, temp, logType)
                        }
                        setTimeout(function () {
                            sendShowLog(1, "POPUP")
                        }, 10)
                    },
                    error: function () {
                        return recommendData.items ? (slidConf.data = recommendData, _ajaxSlide = new AjaxSlide(slidConf), void setTimeout(function () {
                            sendShowLog(1, "POPUP")
                        }, 10)) : !1
                    }
                };
                yd.ajax(json)
            }()
        } else {
            if (!recommendData.items)return !1;
            slidConf.data = recommendData, _ajaxSlide = new AjaxSlide(slidConf), setTimeout(function () {
                sendShowLog(1, "POPUP")
            }, 10)
        }
        var timer = 1e3 * consts.showTime, subList = cache.data.subscribes, activeClass = "youdaoGWZS_ico_active", hasSubList, animateId, getMaxIndex, getSubList, getItemInfo, timeId;
        $mod.delegate(".-prev", "click", function () {
            var a = $(this);
            if (!a.hasClass(selector.unablePrev)) {
                _ajaxSlide.prevPage(), 1 === _ajaxSlide.rightPage && a.addClass(selector.unablePrev), animateId && clearTimeout(animateId), $(selector.listViewPortQ).stop();
                var b = ($(".head-wrapper"), {});
                isInTool ? b.left = _ajaxSlide.currentLeft : b.top = _ajaxSlide.currentLeft, $(selector.listViewPortQ, $mod).animate(b, 600), $(".-right-page", $mod).html(_ajaxSlide.rightPage), $(".-next", $mod).hasClass(selector.unableNext) && $(".-next", $mod).removeClass(selector.unableNext)
            }
        });
        var logPageList = [];
        $mod.delegate(".-next", "click", function () {
            var a = $(this);
            if (!a.hasClass(selector.unableNext) && _ajaxSlide.nextPage()) {
                _ajaxSlide.rightPage === _ajaxSlide.totalPages && a.addClass(selector.unableNext), $(selector.listViewPortQ).stop();
                var b = ($(".head-wrapper"), {});
                isInTool ? b.left = _ajaxSlide.currentLeft : b.top = _ajaxSlide.currentLeft, $(selector.listViewPortQ).animate(b, 600), sendShowLog(_ajaxSlide.rightPage, "POPUP"), $(".-right-page", $mod).html(_ajaxSlide.rightPage), $(".-prev", $mod).hasClass(selector.unablePrev) && $(".-prev", $mod).removeClass(selector.unablePrev)
            }
        })
    };
    msg.send("collection"), msg.listen("collection-add", function () {
        $(".hui-sidebar-collection-btns").addClass("hui-collection-already")
    }), msg.listen("collection-remove", function () {
        $(".hui-sidebar-collection-btns").removeClass("hui-collection-already")
    })
}), youdao.define("modules/shoppingTips/shoppingTips.html", function () {
    return ' <div id="GWZS-shoppingtips" hui-mod="shoppingTips"\n    data-title="<%= _shoppingTips.title %>"\n    class="GWZS-common-lightbox -hui-shoppingTips-wrapper">\n    <div class="GWZS-common-lightbox-topline"></div>\n    <div class="GWZS-common-lightbox-hd hui-color333 hui-fwb">\n        <span class="hui-new-sp"></span>����С��ʿ\n        <span data-title="<%= _shoppingTips.title %>"\n            clkaction="SHOPPINGTIPS_CLOSE"\n            class="GWZS-common-lightbox-close -hui-shoppingTips-close">x</span>\n    </div>\n    <div class="GWZS-shoppingtips-cont">\n        <h3 class="GWZS-shoppingtips-title"><%= _shoppingTips.title %></h3>\n        <p class="GWZS-shoppingtips-dec"><%= _shoppingTips.content %></p>\n        <div class="GWZS-shoppingtips-ft hui-clearfix">\n            <span class="bless -hui-shoppingTips-support" \n                clkaction="SHOPPINGTIPS_SUPPORT"\n                data-id="<%= _shoppingTips.id %>" ><em class="hui-new-sp hui-icon-bless" ></em>����(<strong><%= _shoppingTips.support %></strong>)</span>\n            <a class="readmore -hui-shoppingTips-close"\n                clkaction="SHOPPINGTIPS_DETAIL"\n                href="<%= _shoppingTips.url %>" target="_blank">�鿴��������&gt;&gt;</a></div>\n    </div>\n</div>\n'
}), youdao.define("modules/shoppingTips/shoppingTips.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = (c._, a("modules/shoppingTips/shoppingTips.html")), f = c.mod, g = "shoppingTips";
    f[g] = {
        template: e, event: function (a) {
            function b() {
                var b = a.attr("data-title"), d = c.code.md5(b);
                f += d + "+", e.shoppingTipList = f;
                var g = document.getElementById(consts.optionsID);
                g && c.cache.localConf && (g.innerHTML = c.util.jsonToStr(e, ";"))
            }

            var e = c.cache.localConf || {}, f = e.shoppingTipList || "";
            a.delegate(".-hui-shoppingTips-support", "click", function () {
                var e = d(this), f = d(".-hui-shoppingTips-support strong", a);
                f.text(parseInt(f.text(), 10) + 1), d(".-hui-shoppingTips-support em").addClass("hui-icon-blessed"), e.removeClass("-hui-shoppingTips-support"), setTimeout(function () {
                    b(), a.hide()
                }, 3e3);
                var g = e.attr("data-id");
                c.ajax({
                    url: "/api/zhushou/tips/support", params: {id: g, time: +new Date}, success: function (a) {
                    }
                })
            }), a.sMsg({
                type: "pop-up", callback: function () {
                    var e = (c.cache.localConf || {}, a.attr("data-title")), g = c.code.md5(e);
                    if (f.indexOf(g) >= 0)return !1;
                    a.show();
                    var h = "ARMANI_EXTENSION_POPUP", i = "SHOPPINGTIPS_POPUP";
                    if (c.cache.fn && c.cache.fn.sendLog && c.util.isFunction(c.cache.fn.sendLog)) {
                        var j = document.createElement("div");
                        c.cache.fn.sendLog(i, j, h)
                    }
                    a.delegate(".-hui-shoppingTips-close", "click", function () {
                        d(this);
                        b(), a.hide()
                    });
                    var k;
                    k = setTimeout(function () {
                        a.hide()
                    }, 5e3);
                    var l = ".-hui-shoppingTips-wrapper";
                    return d(document).delegate(l, "mouseenter", function () {
                        k && clearTimeout(k)
                    }), !0
                }
            })
        }
    }
}), youdao.define("modules/sidebar/sidebar.html", function () {
    return ' <div id="youdaoGWZS-sidebar-right" hui-mod="sidebar" class="hui-shoppingtool-sidebar sidebar-right sidebar-middle">\n    <% if (_container.shoppingcart && _container.shoppingcart.items\n            && _container.shoppingcart.items.length > 0) { %>\n        <% _shoppingcart = _container.shoppingcart%>\n        ##parse("incidentallyBuy")\n    <% } %>\n\n    <% _recommand= _container.recmdinfo || {show:true}; %>\n    ##parse("recommand")\n</div>\n<% if (_container.recmdHistoryInfo) { %>\n<div id="youdaoGWZS-sidebar-left" hui-mod="sidebar"\n    class="hui-shoppingtool-sidebar sidebar-left sidebar-bottom <%= _container.recmdHistoryInfo.isShow ? "" : "hui-shoppingtool-sidebar-mini"%>">\n        <% _recmdHistory = _container.recmdHistoryInfo;  %>\n        ##parse("recmdHistory")\n</div>\n<% } %>\n'
}), youdao.define("modules/sidebar/sidebar.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.require_module("youdao.cache"), c.require_module("youdao.consts"), c.require_module("youdao.util"), c.jQuery), e = (c._, a("modules/sidebar/sidebar.html")), f = c.mod, g = "sidebar";
    f[g] = {
        template: e, event: function (a) {
            function b() {
                a.delegate(".-sidebar-close", "click", function () {
                    a.addClass("hui-shoppingtool-sidebar-mini"), d(".-sidebar-close", a).attr("data-change", "true"), setTimeout(function () {
                        d(".hui-sidebar-container,#GWZS-sidebar-down-collection", a).hide()
                    }, 1)
                }), a.delegate(".-sidebar-btn", "click", function () {
                    d(".-sidebar-close", a).attr("data-change", "true"), d(".hui-sidebar-container,#GWZS-sidebar-down-collection", a).show(), setTimeout(function () {
                        a.removeClass("hui-shoppingtool-sidebar-mini")
                    }, 1)
                })
            }

            var c = d("[hui-mod]", a);
            if (0 !== c.length) {
                "www.amazon.cn" === document.domain && (d(".-sidebar-close", a).attr("data-change", "true"), d(".hui-sidebar-container", a).hide(), a.addClass("hui-shoppingtool-sidebar-mini")), b();
                var e = document.body.clientWidth > 1280;
                d(window).scroll(function () {
                    var b = d(".-sidebar-close", a).attr("data-change");
                    "true" !== b && (d(window).scrollTop() > 500 && !e ? a.hasClass("hui-shoppingtool-sidebar-mini") || (a.addClass("hui-shoppingtool-sidebar-mini"), d(".hui-sidebar-container", a).hide()) : a.hasClass("hui-shoppingtool-sidebar-mini") && (d(".hui-sidebar-container", a).show(), a.removeClass("hui-shoppingtool-sidebar-mini")))
                })
            }
        }
    }
}), youdao.define("modules/signIn/signIn.html", function () {
    return ' <li hui-mod="signin" id="hui-signin" hui-type="hoverMod" class="hui-button-bar-wrapper ">\n    <a  class="hui-button-bar hui-<%= _signin.data && _signin.data.todaySignUp ? "is" : "not" %>-signin"\n        target="_blank" clkaction="BAR_SIGNIN_MOD_CLICK"  hoveraction="BAR_SIGNIN_MOD_HOVER" data-log-feature="SIGNIN"\n        href="http://www.huihui.cn/?keyfrom=zs_checkin">\n        <% if (_signin.data && _signin.data.todaySignUp) { %>\n        <span class="hui-button-bar-tip"></span><span class="hui-button-bar-title">��ǩ��</span>\n        <% } else { %>\n        <span class="hui-button-bar-tip"></span><span class="hui-button-bar-title">ǩ��</span>\n        <% } %>\n    </a>\n    <div class="hui-shopping-lightbox">\n        <div class="hui-icon-zy"></div>\n        <div class="hui-shopping-lightbox-hd"></div>\n        <div class="hui-shopping-lightbox-bd">\n        <% if (_signin.data) { %>\n            <p class="uname">hi,<%= _signin.data.uname %></p>\n            <p class="punch-tips">\n                ����ǩ�� <b class="hui-shopping-lh"><%= _signin.data.signUpDays %></b>\n                �죬���� <b class="hui-shopping-lh"><%= _signin.data.credits %></b>\n                ����\n            </p>\n        <% } %>\n        <% if (!_signin.data || !_signin.data.todaySignUp) { %>\n            <a class="btn-punch" href="http://www.huihui.cn/?keyfrom=zs_checkin" target="_blank"\n                clkAction="BAR_SIGNIN_BTN_CLICK" data-log-feature="SIGNIN">ǩ���ͻ���</a>\n        <% } %>\n        <p class="punch-notice">\n        <a  href="http://www.huihui.cn/share/7169846?spm=3.7095809.0.0.aH3Hef" target="_blank"\n            title="ǩ����������" clkAction="BAR_SIGNIN_TIP_CLICK" data-log-feature="SIGNIN">ǩ����������</a>\n        </p>\n   </div>\n</li>\n'
}),youdao.define("modules/signIn/signIn.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/signIn/signIn.html")), e = c.require_module("youdao.cache"), f = c.require_module("youdao.util"), g = c.mod, h = "signin";
    g[h] = {
        template: d, event: function (a) {
            var b = e.data.huisignup || {};
            if (b.hint) {
                var c = "ARMANI_EXTENSION_POPUP", d = "SIGNIN_TIP";
                if (e.fn && e.fn.sendLog && f.isFunction(e.fn.sendLog)) {
                    var g = document.createElement("div");
                    e.fn.sendLog(d, g, c)
                }
            }
        }
    }
}),youdao.define("modules/subBookmarks/subBookmarks.html", function () {
    return ' <% consts = youdao.consts || {} %>\n<% consts.commonName = "youdaoGWZS_" %>\n<li hui-mod="subBookmarks" hui-type="hoverMod" class="hui-shopping-subBookmarks <%= consts.commonName %>sub-bookmarks-ico <%= consts.subConsts.plugClass%>">\n    <a id="<%= consts.commonName %>sub-bookmarks" href="#4" class="hui-sp hui-sp11" hoverAction="SUBLIST_HOVER">\n        <span class="hui-sp hui-sp3"></span>\n    </a>\n    <div class="hui-shopping-lightbox">\n        <div class="hui-shopping-lightbox-hd">\n        </div>\n        <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n            <span class="history-newlogo hui-new-sp" style="position: absolute;width: 118px;"></span>\n            <span class="lightbox-title-txt">��������</span>\n            <span class="hui-user-name"><%= _userName %></span>\n        </div>\n    <div id="youdaoGWZSSubList" class="youdaoGWZS_sublist">\n    </div>\n    </div>\n</li>\n'
}),youdao.define("modules/subBookmarks/wrapper.html", function () {
    return ' <% if (type !== "noData" && type !== "noLogin") { %>\r\n    <div class="sublist-viewport <%= type === "full" ? "fullHeight" : "halfHeight" %>">\r\n        <% if (recommendType !== "bookmarks") { %>\r\n            <h3 class="header">\r\n                <% if (recommendType === "ITEMCF") { %>\r\n                    �������������ʷ��������Ȥ��ͬ���û������� \r\n                <% } else { %>\r\n                    �������������ʷ�����½����Ƽ�\r\n                <% } %>\r\n            </h3>\r\n        <% } %>\r\n        <ul>\r\n        </ul>\r\n        </div>\r\n                <div class="paging-wrapper">\r\n                    <a href="javascript:void(0)" clkaction="<%= logType %>_PREV_CLICK"\r\n                        class="-prev prev-page-unable prev-page" title="ǰһҳ"></a>\r\n                    <span class="page-number">\r\n                        <span class="-right-page right-page">1</span>\r\n                        /<span class="-total-pages total-pages"><%= totalPages %></span>\r\n                    </span>\r\n                    <a href="javascript:void(0)" clkaction="<%= logType %>_NEXT_CLICK"\r\n                        class="-next next-page  <%= totalPages === 1 ? "next-page-unable" : "" %>"\r\n                        title="��һҳ">��һҳ</a>\r\n                    <a href="javascript:void(0)"\r\n                        clkaction="<%= logType %>_REVERSE_HISTORY_SUB"\r\n                        class="-set-email-btn set-email-btn">�һ���ʷ����&gt;&gt;</a>\r\n                </div>\r\n<% } else if (type === "noData") { %>\r\n        <div class="hui-nosubBookmarkstips hui-colorb2">\r\n        <% if (recommendType !== "bookmarks") { %>\r\n            <p class="sublist-nodata">�������������ʷ�����������Ʒ�Ƽ�</p>\r\n        <% } else { %>\r\n            <p>����<%= consts.firstHd %></p>\r\n            <p>��<%= consts.firstHd %>����Ʒ���ڴ˿��ٲ鿴�͹���</p>\r\n            <p>\r\n            <a href="javascript:void(0)"\r\n                clkaction="<%= logType %>_REVERSE_HISTORY_SUB_NODATA"\r\n                class="-set-email-btn set-email-btn">�һ���ʷ����&gt;&gt;</a>\r\n            </p>\r\n        <% } %>\r\n        </div>\r\n<% } else { %>\r\n        <div class="hui-nosubBookmarkstips hui-colorb2">\r\n            <p><a href="http://www.huihui.cn/login?url=http://zhushou.huihui.cn/skipshop.html"\r\n                clkaction="SUBBOOKMARKS_<%= logType %>_TO_LOGIN"\r\n                target="_blank">ȥ��¼</a>���鿴�Ѷ�����Ʒ</p>\r\n        </div>\r\n<% } %>\r\n'
}),youdao.define("modules/subBookmarks/content.html", function () {
    return ' <% for (var i = 0; i < subList.length ; i ++) { %>\r\n<li style="left:<%= subList[i].offsetLeft %>px; top:<%= subList[i].offsetTop  %>px;"\r\n    data-index="<%= subList[i].index || i %>">\r\n    <div class="image-wrapper">\r\n        <a href="<%= subList[i].url %>" clkaction="<%= subList.logType %>_ITEM_CLICK" target="_blank"\r\n            title="<%= subList[i].title %>">\r\n            <img src="<%= subList[i].imgUrl %>" alt="<%= subList[i].title %>"/>\r\n        </a>\r\n        <% if (subList[i].price <= subList[i].expectPrice) { %>\r\n            <i class="is-reach">�Ѵﵽ</i>\r\n        <% } %>\r\n    </div>\r\n    <div class="title-wrapper">\r\n        <a href="<%= subList[i].url %>"\r\n            clkaction="<%= subList.logType %>_ITEM_CLICK" target="_blank"\r\n            title="<%= subList[i].title %>">\r\n            <%= subList[i].title %>\r\n        </a>\r\n    </div>\r\n    <div class="price-wrapper">\r\n        <span><%= subList[i].price %>Ԫ</span>\r\n    </div>\r\n    <% if (subList[i].priceTrend !== undefined) { %>\r\n        <div class="hui-subBookmarks-setnav">\r\n            <a class="hui-sp hui-sp18" href="#"\r\n                clkaction="<%= subList.logType %>_ITEM_DELETE_CLICK" \r\n                hui-type="delete"></a>\r\n            <div class="hui-subBookmarks-setnav-line"></div>\r\n            <a class="hui-sp hui-sp19" href="#"\r\n                clkaction="<%= subList.logType %>_ITEM_MODIFY_CLICK" \r\n                hui-type="modify"></a>\r\n        </div>\r\n    <% } else if (subList[i].description !== ""){ %>\r\n        <b <%if (subList[i].isLowest) { %> class="lowest"<% } %>>\r\n            <%= subList[i].description %>\r\n        </b>\r\n    <% } %>\r\n</li>\r\n<% } %>\r\n'
}),youdao.define("modules/subBookmarks/setEmailDialog.html", function () {
    return ' <div id="setDepressEmail" class="youdaoGWZS_dr_remind" style="display: block;">\n    <div class="youdaoGWZS-remindbox-topb"></div>\n    <div class="youdaoGWZS_dr_dialog-hd">\n        <span>\n            �һ���ʷ����\n        </span>\n        <a href="javascript:void(0)"\n            clkaction="REVERSE_EMAIL_DIALOG_CLOSE"\n            class="youdaoGWZS_dr_close youdaoGWZS_dr_close_box -close"> </a>\n    </div>\n    <div class="youdaoGWZS_dr_dialog-bd">\n       <p>\n        �𾴵��û���ֻҪ��ԭ������������Ϊ֪ͨ���䣬�����һ���ʷ���ġ�\n       </p>\n       <% if (!isNewUser) {%>\n       <div>\n            <label for="youdaoGWZS_text_email"\n                class="emailTitle label-title">��ǰ���䣺</label>\n            <span style="margin-left:11px;"><%= email %></span>\n       </div>\n       <% } %>\n        <div class="deprice-email-setting" style="position: relative">\n            <label for="deprice-email-setting-input"\n                class="emailTitle label-title"><%= isNewUser ? "" : "ԭ" %>֪ͨ���䣺</label>\n            <div class="youdaoGWZS_dr_r">\n                <input type="text" name="youdaoGWZS_text_email"\n                id="deprice-email-setting-input" class="text-input "\n                value="" placeholder="ȫ�����ĸ���������֪ͨ" >\n            <div class="youdaoGWZS_common_tips youdaoGWZS_dr_tips">\n                <b></b>����д�����ַ</div>\n            </div>\n        </div>\n    </div>\n    <div class="youdaoGWZS_dr_dialog-ft" style="margin-top:20px;">\n        <a href="javascript:void(0)"\n            clkaction="REVERSE_EMAIL_DIALOG_SUBMIT"\n            class="-submit">ȷ��</a>\n        <a class="youdaoGWZS_noactive -close"\n            clkaction="REVERSE_EMAIL_DIALOG_QUIT"\n            href="javascript:void(0);">ȡ��</a>\n    </div>\n</div>\n'
}),youdao.define("modules/subBookmarks/subBookmarks.js", function (a, b, c) {
    var d = youdao, e = d.require_module("youdao.cache"), f = d.require_module("youdao.consts"), g = (d.require_module("youdao.util"), d.reg("subBookmarks")), h = d.jQuery, i = d._, j = f.commonName, k = j + "sub-bookmarks", l = j + "sublist", m = a("modules/subBookmarks/subBookmarks.html"), n = a("modules/subBookmarks/wrapper.html"), o = d.mod, p = "subBookmarks";
    o[p] = {
        template: m, event: function (a) {
            q(a)
        }
    };
    var q = function (b) {
        function c(a, b, c) {
            var d;
            d = {
                css: "youdao",
                logo: f.subConsts.listHd,
                consts: f.subConsts,
                totalPages: b,
                dataType: "bookmarks",
                logType: "SUBLIST",
                recommendType: c || "bookmarks",
                type: a
            }, html = i.template(v)(d), h(r.listWrapper).html(html), "noData" !== a && "noLogin" !== a ? (h(r.listWrapper).removeClass(r.subHalfWidth), h(r.listWrapper).addClass(r.subFullWidth), "full" === a ? h(r.contentWrapperQ).css({height: 427}) : h(r.contentWrapperQ).css({height: 202})) : (h(r.listWrapper).removeClass(r.subFullWidth), h(r.listWrapper).addClass(r.subHalfWidth), h(r.contentWrapperQ).addClass(r.subNoList))
        }

        function j(b) {
            var c = a("modules/subBookmarks/content.html");
            b.logType = "SUBLIST", h(r.listViewPortQ).append(i.template(c)({subList: b}))
        }

        function m(a, b) {
            var c = [], d = {}, e = {}, f = {}, j = b.productid.split(":");
            "c" === j[0] ? (e.clusterId = j[1], e.iscluster = !0) : e.itemId = j[1], d.famous = !0, e.username = a.username, e.yixin_status = a.isYixinBind;
            var k;
            "CUSTOM" === a.subType && a.subedSites && (k = a.subedSites.split(","), d.initSelected = k.length ? k.join("@") : " ", d.famous = !1), d.listType = a.subType, d.price = a.expectPrice, i.each(a.subableSites, function (b, d) {
                var e, f, g = !1;
                b.domain && b.domain.indexOf(".") >= 0 && (f = b.domain.slice(0, b.domain.indexOf("."))), a.subedSites && a.subedSites.indexOf(f) >= 0 && (g = !0), e = {
                    famous: b.famous,
                    site: b.domain,
                    siteName: b.siteName,
                    avaiable: !0,
                    modify: !0,
                    isChecked: g,
                    price: a.expectPrice,
                    id: d
                }, c.push(e)
            }), c.push(d), e.priceList = c, f.x = 850, f.y = h("#youdaoGWZSSubList").offset().top, f.type = "sub", f.isModify = !0, f.modifyInfo = e, f.email = a.email, g.send("subscribe", f)
        }

        function o(a, b, c) {
            var d = h("." + l + ' li[data-index="' + a + '"]'), e = d.nextAll();
            d.remove(), e.each(function (a, c) {
                var d = h(c), e = d.attr("data-index") - 1;
                d.animate({left: b[e].offsetLeft + "px", top: b[e].offsetTop + "px"}), d.attr("data-index", e)
            }), c && (1 === w.rightPage && h(r.prevBtnQ).addClass("prev-page-unable"), p && clearTimeout(p), h(r.listViewPortQ).stop(), h(r.listViewPortQ).animate({left: w.currentLeft}, 600), h(r.rightPageQ).html(w.rightPage)), w.rightPage === w.totalPages && h(r.nextBtnQ).addClass(r.unableNext), h(r.totalPageQ).html(w.totalPages)
        }

        var p, q, r = {
            icoQ: "[hui-mod='subBookmarks']",
            listViewPortQ: "." + l + " .sublist-viewport ul",
            listWrapper: "#youdaoGWZSSubList",
            contentWrapperQ: "#youdaoGWZSSubList .youdaoGWZS_content",
            itemQ: "." + l + " .sublist-viewport li",
            prevBtnQ: "." + l + " .paging-wrapper .-prev",
            nextBtnQ: "." + l + " .paging-wrapper .-next",
            rightPageQ: "." + l + " .paging-wrapper .-right-page",
            totalPageQ: "." + l + " .paging-wrapper .-total-pages",
            setEmailQ: "." + l + " .-set-email-btn",
            modifyQ: "a[hui-type='modify']",
            deleteQ: "a[hui-type='delete']",
            unablePrev: "prev-page-unable",
            unableNext: "next-page-unable",
            setEmailSubQ: "#setDepressEmail .-submit",
            setEmailCloseQ: "#setDepressEmail .-close",
            setEmailInputQ: "#setDepressEmail .text-input",
            subHalfWidth: "sublist-halfWidth",
            subFullWidth: "sublist-fullWidth",
            subNoList: "has-no-subList",
            modeFlag: k
        }, s = document.getElementById(r.modeFlag), t = s.parentNode, u = (1e3 * f.showTime, e.data.subscribes, "youdaoGWZS_ico_active"), v = n;
        g.listen("clearShowBox", function () {
            clearTimeout(q), h(t).removeClass(u)
        });
        var w, x = a("modules/common/ajaxSlide.js");
        h(document).delegate(r.icoQ, "mouseenter", function () {
            var a = e.conf.isInitSlide, b = e.localConf || {};
            if (!h(t).hasClass(u)) {
                if (h(t).addClass(u), a)return void(e.conf.rePaintSubList && (w.init(), e.conf.rePaintSubList = !1));
                w = new x({
                    email: b.email || e.data.email || "",
                    renderWrapper: c,
                    dealDel: o,
                    needLogin: !0,
                    switchEditData: m,
                    renderItems: j
                }), e.conf.isInitSlide = !0, e.conf.rePaintSubList = !1
            }
        }), h(document).delegate(r.icoQ, "mouseleave", function () {
            q = setTimeout(function () {
                h(t).removeClass(u)
            }, 200)
        }), h(document).delegate(r.prevBtnQ, "click", function () {
            var a = h(this);
            a.hasClass(r.unablePrev) || (w.prevPage(), 1 === w.rightPage && a.addClass("prev-page-unable"), p && clearTimeout(p), h(r.listViewPortQ).stop(), h(r.listViewPortQ).animate({left: w.currentLeft}, 600), h(r.rightPageQ).html(w.rightPage), h(r.nextBtnQ).hasClass(r.unableNext) && h(r.nextBtnQ).removeClass(r.unableNext))
        }), h(document).delegate(r.nextBtnQ, "click", function () {
            var a = h(this);
            a.hasClass(r.unableNext) || w.nextPage() && (w.rightPage === w.totalPages && a.addClass(r.unableNext), h(r.listViewPortQ).stop(), h(r.listViewPortQ).animate({left: w.currentLeft}, 600), h(r.rightPageQ).html(w.rightPage), h(r.prevBtnQ).hasClass(r.unablePrev) && h(r.prevBtnQ).removeClass(r.unablePrev))
        }), h(document).delegate(r.itemQ, "mouseenter", function () {
            h(this).addClass("active")
        }), h(document).delegate(r.itemQ, "mouseleave", function () {
            h(this).removeClass("active")
        }), b.delegate(r.modifyQ, "click", function (a) {
            a.preventDefault();
            var b = h(this), c = b.closest("li"), d = c.attr("data-index");
            w.modifyItem(d)
        }), h(document).delegate(r.setEmailQ, "click", function (b) {
            var c = h(this), e = "api/pricehub/getemail", f = a("modules/subBookmarks/setEmailDialog.html"), g = "", j = !1;
            d.ajax({
                url: e, success: function (a) {
                    if (a) {
                        var b = a.email || "fake@zhushou.huihui.cn";
                        b.indexOf("huihui.cn") >= 0 && (j = !0), g = i.template(f)({
                            isNewUser: j,
                            email: b
                        }), h("body").append(g), h("#setDepressEmail").css({left: 500, top: c.offset().top - 250})
                    }
                }, error: function () {
                    var a = "";
                    g = i.template(f)({isNewUser: j, email: a}), h("body").append(f)
                }
            })
        }), h(document).delegate(r.setEmailCloseQ, "click", function (a) {
            h("#setDepressEmail").remove()
        }), h(document).delegate(r.setEmailSubQ, "click", function (a) {
            var b = h(r.setEmailInputQ).val().replace(/\s/g, ""), c = /^([a-zA-Z0-9_-]|\.)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,5}){1,4})$/;
            if ("" !== b && !c.test(b))return void h("#setDepressEmail").addClass(r.setEmailError);
            var f = "/api/pricehub/addemaildata";
            d.ajax({
                url: f, params: {email: b}, success: function () {
                    h("#setDepressEmail").remove(), e.conf.rePaintSubList = !0
                }
            })
        }), h(document).delegate(r.deleteQ, "click", function (a) {
            a.preventDefault();
            var b = h(this), c = b.closest("li"), d = c.attr("data-index");
            w.delItem(d)
        })
    }
}),youdao.define("modules/taosame/taosame.html", function () {
    return ' <% if (_taosame.sameTypeNum !== 0) {%>\n<li hui-mod="taosame" hui-type="hoverMod" class="hui-shopping-taosame hui-fz12">\n    <a class="hui-sp hui-sp11" clkaction="BAR_TAOSIMILAR_ITEM_CLICK" href="<%= _taosame.sameTypeUrl %>" target="_block">\n<% } else { %>\n<li hui-mod="taosame" class="hui-shopping-taosame hui-fz12 hui-taosame-noitem">\n    <a class="hui-sp hui-sp11" href="javascript:void(0);">\n<% } %>\n        <span class="hui-icon-cont"><em class="hui-sp hui-sp23 \n                <% if (_taosame.sameTypeNum === 0) {%>\n                hui-sp25\n                <% } %>\n                "></em></span><br />\n        �Ա�ͬ��(<em class="hui-shopping-lh"><%=_taosame.sameTypeNum%>��</em>)\n    </a>\n    <% if (_taosame.sameTypeNum !== 0) {%>\n    <div hui-type="tip" class="hui-shopping-commontips">\n        <% if (_taosame.sameTypeNum <= 1000) {%>\n        <%=_taosame.sameTypeNum%>��\n        <% } else { %>\n        >1000��\n        <%}%>\n        <div class="hui-sp hui-sp22"></div>\n    </div>\n    <%}%>\n</li>\n'
}),youdao.define("modules/taosame/taosame.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/taosame/taosame.html")), e = c.mod, f = "taosame";
    e[f] = {
        template: d, event: function (a) {
            var b = a.find("div[hui-type='tip']");
            b && b.length && a.sMsg({type: "showTips", $tip: b})
        }
    }
}),youdao.define("modules/taosimilar/taosimilar.html", function () {
    return ' <div hui-mod="taosimilar" class="hui-shopping-taosimilar hui-fz12 hui-clearfix">\n    <ul hui-type="price-wrapper" class="hui-shopping-datalist hui-fz12">\n        <% _.each(_taosimilar.items, function (item, num) { %>\n        <li class="hui-datalist" hui-type="hoverMod">\n            <a hidefocus="true" hoveraction="BAR_TAOSIMILAR_MOD_HOVER"\n                clkaction="BAR_TAOSIMILAR_MOD_CLICK"\n                class="hui-datalist-item hui-sp hui-sp11"\n                href="<%=item.url%>" target="_blank">\n                <img src="<%= item.imgUrl %>" alt="<%= item.price %>"\n                     data-origin="zhushou" data-width="48" data-height="48"/>\n                    <span class="item-price">��<%= Math.ceil(item.price) %></span>\n                    <span class="item-shade"></span>\n            </a>\n            <div class="hui-shopping-lightbox">\n                <div class="hui-shopping-lightbox-hd"></div>\n                <div class="hui-shopping-lightbox-title hui-color333 hui-fwb">\n                    <span class="hui-sp hui-taosimilar-tips-<%= item.url.indexOf("tmall") >= 0 ? "tmall" : "taobao" %>">\n                    </span>\n                    <div class="hui-taosimilar-title">\n                        <%= item.title %>\n                    </div>\n                </div>\n                <div class="hui-shopping-lightbox-bd">\n                    <div class="hui-taosimilar-bd">\n                        <a hidefocus="true" hoveraction="TAOSIMILAR_HOVER"\n                           title="<%= item.title %>"\n                           clkaction="BAR_TAOSIMILAR_ITEM_CLICK"\n                           href="<%=item.url%>" target="_blank">\n                           <img src="<%= item.imgUrl %>" data-origin="zhushou"\n                           alt="<%= item.title %>" data-width="210" data-height="210"/>\n                        </a>\n                    </div>\n                    <div class="hui-taosimilar-ft">\n                        <span class="hui-taosimilar-price">��<%= item.price %></span>\n                        <a hidefocus="true" clkaction="BAR_TAOSIMILAR_COMMENT_CLICK"\n                           href="<%=item.url%>" target="_blank" class="hui-taosimilar-info-wrapper">\n                           <span class="hui-taosimilar-sales">����<span><%= item.sellNum ? item.sellNum : 0 %></span>��&nbsp</span>\n                           <span class="hui-taosimilar-comment"><%= item.commentNum ? item.commentNum : 0 %>������</span>\n                        </a>\n                    </div>\n                </div>\n                <div class="hui-lightbox-price-ft hui-tac">\n                </div>\n            </div>\n\n\n        </li>\n        <% }) %>\n    </ul>\n    <a hidefocus="true" clkaction="BAR_TAOSIMILAR_MORETAOSIMILAR_CLICK" hui-type="more-price"\n        class="hui-shopping-readmore hui-fz12 hui-fl" target="_blank"\n        href="<%=_taosimilar.similarTypeUrl%>" title="�������ƿ�">�������ƿ�&gt;&gt;</a>\n</div>\n'
}),youdao.define("modules/taosimilar/taosimilar.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = (c._, a("modules/taosimilar/taosimilar.html")), f = c.require_module("youdao.cache"), g = c.require_module("youdao.util"), h = c.mod, i = "taosimilar";
    h[i] = {
        template: e, event: function (a) {
            var b = "ARMANI_EXTENSION_POPUP", c = "BAR_TAOSIMILAR_TRIGGER";
            if (f.fn && f.fn.sendLog && g.isFunction(f.fn.sendLog)) {
                var e = document.createElement("div");
                f.fn.sendLog(c, e, b)
            }
            d("img", a).load(function () {
                var a = d(this), b = new Image;
                b.src = a.attr("src");
                var c = b.width, e = b.height;
                if (c > 0 && e > 0) {
                    var f = c / e, g = a.attr("data-width") || 1, h = a.attr("data-height") || 1, i = a.attr("data-width") / h;
                    f >= i ? c > g ? (a.css({width: g}), a.css({height: e * g / c})) : (a.css({width: c}), a.css({height: e})) : e > h ? (a.css({height: h}), a.css({width: c * h / e})) : (a.css({width: c}), a.css({height: e}))
                }
                a.show()
            })
        }
    }
}),youdao.define("modules/test/test.html", function () {
    return ' <div hui-mod="test" hui-type="hoverMod" class="">\n</div>\n'
}),youdao.define("modules/test/test.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, a("modules/test/test.html")), e = c.mod, f = "test";
    e[f] = {
        template: d, event: function (a) {
        }
    }
}),youdao.define("modules/mod_combo/module.js", function (a, b, c) {
    a("modules/collection/collection.js"), a("modules/comment/comment.js"), a("modules/container/container.js"), a("modules/csprice/csprice.js"), a("modules/discount/discount.js"), a("modules/douban/douban.js"), a("modules/faq/faq.js"), a("modules/feed/feed.js"), a("modules/functionTips/functionTips.js"), a("modules/haiOnekey/haiOnekey.js"), a("modules/historyInfo/historyInfo.js"), a("modules/huiContent/huiContent.js"), a("modules/incidentallyBuy/incidentallyBuy.js"), a("modules/jigsaw/jigsaw.js"), a("modules/logo/logo.js"), a("modules/onceTip/onceTip.js"), a("modules/onekey/onekey.js"), a("modules/plugin_container/plugin_container.js"), a("modules/price/price.js"), a("modules/pricestate/pricestate.js"), a("modules/quan/quan.js"), a("modules/recmdHistory/recmdHistory.js"), a("modules/recommand/recommand.js"), a("modules/shoppingTips/shoppingTips.js"), a("modules/sidebar/sidebar.js"), a("modules/signIn/signIn.js"), a("modules/subBookmarks/subBookmarks.js"), a("modules/taosame/taosame.js"), a("modules/taosimilar/taosimilar.js"), a("modules/test/test.js")
}),youdao.define("modules/common/box.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = c.reg("box"), g = ["jigsaw", "shoppingTips", "onceTip", "newFeature", "notify", "functionTips", "discount"], h = {}, i = function (a) {
        return function (b) {
            "pop-up" === b.type && (h[a] = b.callback)
        }
    };
    f.listens({
        onceTip: i("onceTip"),
        newFeature: i("newFeature"),
        functionTips: i("functionTips"),
        shoppingTips: i("shoppingTips"),
        jigsaw: i("jigsaw"),
        discount: i("discount"),
        notify: i("notify"),
        "pop-up": function () {
            var a = !1;
            e.each(g, function (b, c) {
                !a && h[b] && (a = h[b]())
            })
        },
        "extension:status:end": function () {
            d("#youdaoGWZS").delegate('a[hui-type="box-close"]', "click", function () {
                d(this).closest("div[hui-box]").remove()
            })
        }
    })
}),youdao.define("modules/common/newFeatures.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._, c.require_module("youdao.cache")), e = c.require_module("youdao.consts"), f = c.require_module("youdao.util"), g = c.reg("newfeature");
    c.newFeature = function () {
        var a = {comment: 1, recommand: 2}, b = "hui-box-active";
        d.localConf = d.localConf || {};
        var c = d.localConf.feature || 0, h = function (a) {
            d.localConf.feature = a;
            var b = document.getElementById(e.optionsID);
            b && d.localConf && (b.innerHTML = f.jsonToStr(d.localConf, ";"))
        };
        return {
            check: function (d) {
                var e = 0;
                return d.name in a && (e = a[d.name]), e > c ? (g.send("newFeature", {
                    type: "pop-up",
                    callback: function () {
                        return d.$item.addClass(b), d.$newfeature.show(), d.$newfeature.delegate('a[hui-type="box-close"]', "click", function () {
                            d.$item.removeClass(b), h(e)
                        }), !0
                    }
                }), e) : 0
            }
        }
    }
}),youdao.define("modules/common/show_tips.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.jQuery, c._), e = (c.mod, c.require_module("youdao.cache"), c.reg("tips")), f = {}, g = ["recommand", "price", "quan", "pricestate", "taosame", "onekey"], h = 24, i = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0], j = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60], k = function (a) {
        return function (b) {
            if ("showTips" === b.type) {
                var c = b.$tip, d = (c.closest("[hui-type='hoverMod']").width() - c.width() - 10) / 2;
                b.offsetLeft && (d += b.offsetLeft), c.css({left: d}), c.hide(), f[a] = c
            }
        }
    }, l = function (a, b, c) {
        return 0 === c ? void a.css("top", b + "px") : void setTimeout(function () {
            a.css("top", b - i[h - c] + "px"), l(a, b, --c)
        }, j[h - c])
    };
    e.listens({
        price: k("price"),
        quan: k("quan"),
        taosame: k("taosame"),
        pricestate: k("pricestate"),
        recommand: k("recommand"),
        onekey: k("onekey"),
        tips: function () {
            var a = !1;
            d.each(g, function (b, c) {
                if (f[b]) {
                    var d = f[b];
                    d.show();
                    var e = parseInt(d.css("top"), 10);
                    l(f[b], e, h), a = !0
                }
            })
        }
    })
}),youdao.define("modules/depriceRemind/vendorSelector.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = c.require_module("youdao.cache"), g = (c.require_module("youdao.code"), c.require_module("youdao.util"), c.modules, f.data, !1), h = {};
    return h.vendorChoose = function (a) {
        var b, c, f, h, i, j, k, l, m, n, o, p, q, r, s, t = a.customClass, u = a.exceptEle, v = a.isModify;
        v && (c = a.vendorList.pop());
        var w = a.vendorList;
        return h = {
            chooseQ: ".youdaoGWZS_store-choose",
            storeListQ: ".youdaoGWZS_stores-list",
            customBox: ".youdaoGWZS_stores-list .diy-stores ul",
            customChoose: ".youdaoGWZS_stores-list-se",
            shopsChooseed: ".youdaoGWZS_store-choose input"
        }, i = {
            "�κ��̼�": "all",
            "�ݻ��Ƽ��̼�": "believe",
            "�Զ����̼�": "custom"
        }, f = '<div class="youdaoGWZS_stores-list-cont <%= customClass %>"><div class="youdaoGWZS_store-choose" data-result="<%= initSelectedItems %>" <% if (isModify) { %>data-type="<%= modifyInfo.famous ? "B" : "C" %>"><% } else { %>data-type="<%= priceList[0].famous ? "B" : "C" %>"><% } %><input type="text" name="shops"readonly="readonly"value="<%= initText %>" /><span class="btn-choice <%= enableClass %>">ѡ��</span></div><div class="youdaoGWZS_stores-list"><ul><li><a class="stores-list-selector"data-type="all-stores"href="javascript:void(0)">�κ��̼�</a></li><li><a class="stores-list-selector"data-type="famouse-stores"href="javascript:void(0)">�ݻ��Ƽ��̼�<i class="icon_recommend">&nbsp;</i></a></li><li class="diy-stores"><span>�Զ����̼�</span><ul><li><input type="checkbox" id="allSelect"/><label for="allSelect">ȫѡ</label></li><% for (var i = 0, len = priceList.length; i < len; i ++) { %><li><input type="checkbox" id="<%= priceList[i].id %>"data-price="<%= priceList[i].price %>"data-famous="<%= priceList[i].famous%>"data-site="<%= priceList[i].siteDomain%>"name="<%= priceList[i].id %>"class="pr-shop-check"<%= ((i === 0) || priceList[i].famous) && priceList[i].isChecked  ? "checked" : "" %>/><label for="<%= priceList[i].id %>"><%= priceList[i].siteName %>��<% if (!priceList[i].modify) { %><%= parseFloat(priceList[i].price) %>Ԫ<% } %><% if (priceList[i].avaiable === "false") { %>ȱ��<% } %></label></li><% }  %></ul></li></ul><div class="fta"><a class="youdaoGWZS_btn-cancel youdaoGWZS_stores-list-se"data-value="cancel" href="javascript:void(0)">ȡ��</a><a class="youdaoGWZS_btn-choice  youdaoGWZS_stores-list-se"data-value="custom" href="javascript:void(0)">ȷ��</a></div></div></div>', s = function () {
            d(document).delegate(h.chooseQ, "click.vendor.choose", function () {
                var a;
                a = w[0], w.length > 1 && d(h.storeListQ).toggle()
            }), d(document).delegate(h.storeListQ + " .stores-list-selector", "click.vendor.list", function () {
                var a, b, c, e;
                a = d(this).attr("data-type"), "all-stores" === a ? (o("selectAll"), d(h.chooseQ).attr("data-type", "A")) : (o("cancelAll"), d('.diy-stores input[data-famous="true"]').attr("checked", !0), w[0].famous ? d(h.chooseQ).attr("data-type", "B") : d(h.chooseQ).attr("data-type", "C")), e = r(), d(u).val(e.defaultPrice), d(h.chooseQ).attr("data-result", e.checkedItems), b = d(this), c = d(h.chooseQ + " input")[0], c.value = b.text(), d(h.storeListQ).toggle()
            }), d(document).delegate("#allSelect", "click.vendor.selectAll", function () {
                var a = d(this).attr("checked");
                o(a ? "selectAll" : "cancelAll")
            }), d(document).delegate(h.storeListQ + " .pr-shop-check", "click.vendor.check", function () {
                var a = d(this).attr("checked");
                o(a ? "checkAll" : "def")
            }), d(document).delegate(h.customChoose, "click.vendor.custom", function (a) {
                a.preventDefault();
                var b, c, e = d(this), f = d("li.diy-stores ul input:checked");
                e.attr("data-value");
                return d(h.shopsChooseed).val("�Զ����̼�"), d(h.chooseQ).attr("data-type", "C"), !e.hasClass("youdaoGWZS_btn-choice") || f && 0 !== f.length ? (e.hasClass("youdaoGWZS_btn-cancel") && (o("cancelAll"), d('.diy-stores input[data-famous="true"]').attr("checked", !0), w[0].famous ? d(h.chooseQ).attr("data-type", "B") : d(h.chooseQ).attr("data-type", "C"), c = r(), d(u).val(c.defaultPrice), d(h.chooseQ).attr("data-result", c.checkedItems), b = d(h.chooseQ + " input")[0], b.value = "�ݻ��Ƽ��̼�"), void d(h.storeListQ).hide()) : void n(h.customBox)
            })
        }, n = function (a) {
            var b = ["#d9d9d9", "#f5ac52"], c = 0, e = setInterval(function () {
                return 8 === c ? void clearInterval(e) : void d(a).css("border-color", b[++c % 2])
            }, 80)
        }, o = function (a) {
            var b, c = d("#allSelect");
            switch (a) {
                case"selectAll":
                    d(".diy-stores input:checkbox").attr("checked", !0);
                    break;
                case"cancelAll":
                    d(".diy-stores input:checkbox").attr("checked", !1);
                    break;
                case"def":
                    c.attr("checked", !1);
                    break;
                case"checkAll":
                    d("input.pr-shop-check").not(":checked").length || c.attr("checked", !0)
            }
            b = r(), d(u).val(b.defaultPrice), d(h.chooseQ).attr("data-result", b.checkedItems)
        }, q = function (a) {
            var b, c, d;
            return d = a.toString().indexOf("-"), c = d > 0 ? a.toString().slice(0, d) : a, b = c > 10 ? c - 1 : c > .1 ? Math.round(100 * (c - .1)) / 100 : c ? 9999 : ""
        }, r = function () {
            var a, b, c = [], e = [];
            return d("input.pr-shop-check:checked").each(function () {
                c.push(d(this).attr("data-price")), e.push(d(this).attr("data-site"))
            }), c.length > 1 ? c.sort(function (a, b) {
                var c, d, e, f;
                return e = a.indexOf("-"), f = b.indexOf("-"), c = e > 0 ? a.slice(0, e) : a, d = f > 0 ? b.slice(0, f) : b, c - d
            }) : c.length || (c[0] = 0), a = q(c[0]), b = e.join("@"), {defaultPrice: a, checkedItems: b}
        }, p = function () {
            var a = [], b = [];
            v ? "BELIEVE" === c.listType ? (j = "�ݻ��Ƽ��̼�", m = "") : "CUSTOM" === c.listType ? (j = "�Զ����̼�", m = "") : m = "enable" : w.length > 1 ? (j = "�ݻ��Ƽ��̼�", m = "") : (j = w[0].siteName, m = "enable"), e.each(w, function (c) {
                var d, e;
                e = c.site.indexOf("."), d = 0 > e ? c.site : c.site.slice(0, e), c.siteDomain = d, c.famous && (a.push(c.siteDomain), b.push(c.price))
            }), b.length > 1 ? (b.sort(function (a, b) {
                return a - b
            }), l = q(b[0]), k = a.join("@"), v && c.initSelected && (k = c.initSelected)) : w[0] && (l = q(w[0].price), k = w[0].siteDomain), v && (l = c.price)
        }(), g || (s(), g = !0), b = e.template(f)({
            priceList: w,
            enableClass: m,
            isModify: v,
            modifyInfo: c,
            initText: j,
            initSelectedItems: k,
            customClass: t
        }), {template: b, initPrice: l, getExceptPrice: r}
    }, h
}),youdao.define("modules/depriceRemind/miniDepriceRemind.html", function () {
    return ' <div id="youdaoGWZS_deprice_remind_mini"\n    class="<%= state ==="sub" ? "sub-succ" : "unsub-succ" %>\n    -deprice-dialog"\n    style="left:<%= dimensionX%>px; top:<%=dimensionY%>px;">\n    <div class="deprice-mini-wrapper">\n            <% if (state === "sub") { %>\n            <div class="succss-top-border"></div>\n            <div class="success-feed-box">\n                <div class="hui-hd"><span class="deprice-icon <%= state %>"></span><%= consts.subFinishDescribe %></div>\n                <ul class="hui-bd">\n                    <li>֪ͨ���䣺<%= email %></li>\n                    <li>�����̼ң�<%= shopInfo %></li>\n                    <li>Ŀ��۸񣺵���<%= expect %>Ԫ����</li>\n                    <li>\n                    <a href="javascript:void(0)" hui-type="edit-deprice" class="btn-setfeed"\n                    clkaction="PRICEHUB_MODIFY_CLICK">\n                    �޸Ķ�������?\n                </a></li>\n                </ul>\n            </div>\n            <% } else if (state === "edit-succ") { %>\n                    <div class="cancel-feed-box"><span class="deprice-icon <%= state %>"></span><span><%= consts.editFinishDescribe %></span></div>\n            <% } else { %>\n                    <div class="cancel-feed-box"><span class="deprice-icon <%= state %>"></span><%= consts.unsubFinishDescribe %></div>\n            <% } %>\n        </div>\n</div>\n';
}),youdao.define("modules/depriceRemind/depriceRemind.html", function () {
    return ' <div id="youdaoGWZS_deprice_remind"\r\n    class="youdaoGWZS_dr_remind youdaoGWZS_dr_stat_sub \r\n    -deprice-dialog"\r\n    style="left:<%= dimensionX%>px; top:<%=dimensionY%>px;">\r\n    <div class="youdaoGWZS-remindbox-topb"></div>\r\n    <div class="youdaoGWZS_dr_dialog-hd">\r\n        <span>\r\n            <% if (state === "sub" || state === "success") { %>\r\n            ���ĳɹ�\r\n            <% } else { %>\r\n            �޸Ķ�������\r\n            <% } %>\r\n        </span>\r\n        <a href="javascript:void(0)" class="youdaoGWZS_dr_close -close youdaoGWZS_dr_close_box"\r\n            clkaction="DIALOG_PRICEALERT_CLOSE<%= state === "edit" ? "_MODIFY" : "" %>_CLICK"> </a>\r\n    </div>\r\n\r\n    <div class="youdaoGWZS_dr_dialog-bd" style="padding: 15px 0 0 50px;">\r\n        <% if (state !== "edit") { %>\r\n        <p class="deprice-success-tip">\r\n            <span class="success-icon"></span>\r\n            <span class="success-hd">���ĳɹ���</span>\r\n        </p>\r\n        <% }%>\r\n        <ul class="input-wrap hui-clearfix" style="margin-top: 10px;">\r\n            <li>\r\n                <label class="label-title">��¼�˺ţ�<%= uname %></label>\r\n            </li>\r\n            <% if (!isYiXinUser) { %>\r\n            <li>\r\n            <label class="label-title">�������ѣ�</label><a href="javascript:void(0)"\r\n                class="deprice-yixin -deprice-yixin" clkaction="DIALOG_PRICEALERT_YIXIN_CLICK">������ͨ</a>���ֻ����Ѹ���ʱ��\r\n            </li>\r\n            <% } else {%>\r\n            <li>\r\n            <label class="label-title">�������ѣ�</label>�ѿ�ͨ\r\n            </li>\r\n            <% } %>\r\n            <li class="deprice-email-setting">\r\n                <label for="youdaoGWZS_text_email"\r\n                    class="emailTitle label-title">֪ͨ���䣺</label>\r\n                <!--��Ϊ�����û���js���ܼ�ʱ���µ���CSS�����ˣ������������ʽд����style����-->\r\n                <div class="youdaoGWZS_dr_r" style="position: absolute; top: 1px;">\r\n                    <input type="text" name="youdaoGWZS_text_email"\r\n                    id="youdaoGWZS_text_email" class="text-input disabled"\r\n                    def-data="�����������õ������ַ"\r\n                    value="<%=email%>" disabled>\r\n                <a class="youdaoGWZS_common_tips youdaoGWZS_dr_tips" title="��ȷ�������ַ"><b>*</b></a>\r\n                </div>\r\n                <div class="deprice-email-submit-wrapper">\r\n                    <a href="javascript:void(0)"\r\n                        clkaction="DIALOG_PRICEALERT_EDIT_EMAIL_CLICK"\r\n                        class="deprice-email-edit -deprice-email-edit">�޸�</a>\r\n                </div>\r\n            </li>\r\n            <li class="remind-setting">\r\n            <label class="label-title">�����̼ң�</label>\r\n                <%= currentShop %>\r\n            </li>\r\n            <li>\r\n                <label class="label-title">Ŀ��۸�</label><input type="text" style="width:92px;" name="price" class="text-input" \r\n                value="<%= initPrice%>"/> Ԫ\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div class="youdaoGWZS_dr_dialog-ft">\r\n        <a href="javascript:void(0)"\r\n            class="<%= state === "success" ? "-closeDialog" : "youdaoGWZS_dr_subscript" %>"\r\n            clkaction="DIALOG_PRICEALERT_CONFIRM_CLICK">ȷ����\r\n        </a>\r\n        <a href="javascript:void(0)" class="youdaoGWZS_dr_enter \r\n            youdaoGWZS_dr_close_box" clkaction="DIALOG_PRICEALERT_CONFIRM_CLICK">\r\n            ���\r\n        </a>\r\n    </div>\r\n</div>\r\n'
}),youdao.define("modules/depriceRemind/yixinDialog.html", function () {
    return ' <div id="yixinDialog" class="youdaoGWZS_dr_remind" style="display:block;">\n    <div class="youdaoGWZS-remindbox-topb"></div>\n    <div class="youdaoGWZS_dr_dialog-hd">\n        <span>\n            ��������\n        </span>\n        <a href="javascript:void(0)"\n            clkaction="DIALOG_PRICEALERT_NEW_YIXIN_CLOSE_CLICK"\n            class="youdaoGWZS_dr_close youdaoGWZS_dr_close_box -close"> </a>\n    </div>\n    <div class="youdaoGWZS_dr_dialog-bd">\n        <h3>����ͨ������ʵʱ���ս������������Ƿ����ڿ�ͨ��</h3>\n        <ol class="hui-yixinremind clearfix">\n            <li class="hui-step-item">\n                <div class="icon-yixin-step-cont">\n                    <a href="http://yixin.im/"\n                        clkaction="DIALOG_PRICEALERT_YIXIN_DIALOG_DOWNLOAD_CLICK"\n                        target="_blank">\n                        <span class="hui-yixin-step hui-yixin-step1"></span>\n                    </a>\n                </div>\n                <p>1.<a href="http://yixin.im/"\n                    clkaction="PDIALOG_PRICEALERT_NEW_YIXIN_DIALOG_DOWNLOAD_CLICK"\n                    target="_blank">�������</a>����</p>\n            </li>\n            <li class="hui-step-item">\n                <div class="icon-yixin-step-cont">\n                <span class="hui-yixin-step hui-yixin-step2"></span>\n            </div>\n                <p>2.�����ſͻ��˴���Ϣ�б�</p>\n            </li>\n            <li class="hui-step-item">\n            <div class="icon-yixin-step-cont">\n                <span class="hui-yixin-step hui-yixin-step3"></span>\n            </div>\n                <p>3.����Ϣ�б�����Ͻ�ѡ����Ӻ���</p>\n            </li>\n            <li class="hui-step-item">\n            <div class="icon-yixin-step-cont" style="border:none">\n                <img class="hui-yixin-step4" src="<%=qrCodeSrc%>" style="margin-top: 0"/>\n            </div>\n            <p>4.ɨ���Ϸö�ά���������Ϊ����</p>\n            </li>\n        </ol>\n    </div>\n    <div class="youdaoGWZS_dr_dialog-ft">\n        <a class="youdaoGWZS_noactive -close" href="javascript:void(0);"\n            clkaction="DIALOG_PRICEALERT_NEW_YIXIN_DIALOG_NOTNOW_CLICK"\n            data-type="not-now">�ݲ���ͨ</a>\n        <a href="javascript:void(0)"\n            clkaction="DIALOG_PRICEALERT_NEW_YIXIN_DIALOG_SUCC_CLICK"\n            class="-close">��ͨ�ɹ�</a>\n    </div>\n</div>\n'
}),youdao.define("modules/depriceRemind/depriceRemind.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = c.require_module("youdao.cache"), g = c.require_module("youdao.consts"), h = c.require_module("youdao.code"), i = a("modules/depriceRemind/vendorSelector.js").vendorChoose, j = c.require_module("youdao.util"), k = (c.modules, f.data, c.reg("depriceRemind")), l = a("modules/depriceRemind/miniDepriceRemind.html"), m = a("modules/depriceRemind/depriceRemind.html"), n = function () {
        function b() {
            c.ajax({
                url: t.yixinUrl, success: function (b) {
                    if (b && b.imgUrl) {
                        var c = b.imgUrl, g = a("modules/depriceRemind/yixinDialog.html"), h = e.template(g)({qrCodeSrc: c});
                        d("body").append(h);
                        var i = d("body").position().left, k = d(window).height() / 2 + d(document).scrollTop();
                        if (d("#yixinDialog").css({
                                left: v.x - 440 + i + "px",
                                top: k - d("#yixinDialog").height() / 2
                            }), A = !0, f.fn && f.fn.sendLog && j.isFunction(f.fn.sendLog)) {
                            var l = document.createElement("div"), m = "DIALOG_PRICEALERT_YIXIN_TRIGGER";
                            f.fn.sendLog(m, l, "ARMANI_EXTENSION_POPUP")
                        }
                    }
                }
            })
        }

        var k, n, o, p, q, r, s, t, u, v;
        u = {
            domQ: "#youdaoGWZS_deprice_remind",
            miniDomQ: "#youdaoGWZS_deprice_remind_mini",
            emailQ: "#youdaoGWZS_text_email",
            priceQ: 'input[name="price"]',
            subCSS: "youdaoGWZS_dr_stat_sub",
            cancelCSS: "youdaoGWZS_dr_stat_cancel",
            errCSS: "youdaoGWZS_dr_stat_error",
            succCSS: "youdaoGWZS_dr_stat_succ",
            closeQ: "#youdaoGWZS_deprice_remind .youdaoGWZS_dr_close_box",
            subQ: "#youdaoGWZS_deprice_remind .youdaoGWZS_dr_subscript",
            editQ: '#youdaoGWZS_deprice_remind_mini a[hui-type="edit-deprice"]',
            storeChooseQ: ".youdaoGWZS_store-choose"
        }, k = null, n = null, o = null, p = "sub", q = !1, r = null, s = null, t = {
            subUrl: "/api/pricehub/add",
            yixinUrl: "/api/yixin/qrcode.json",
            setEmail: "/api/pricehub/setemail",
            cancelUrl: "/api/pricehub/del"
        };
        var w = function () {
            E.baseEnv(), v.isModify && z("edit")
        }, x = function (a, b) {
            b = b || {};
            var c = {ALL: "ȫ���̼�", BELIEVE: "�ݻ��Ƽ��̼�", CUSTOM: "�Զ����̼�"}, h = f.data.thisSite.siteName || "��ǰ�̼�";
            b && b.isCluster && (h = c[b.listType]);
            var i;
            i = e.template(l)({
                dimensionX: v.x - 200,
                dimensionY: v.y,
                state: a,
                shopInfo: h,
                email: b.email || "",
                expect: b.expect || "",
                consts: g.subConsts
            }), k && k.length && k.remove(), d("body").append(i), k = d(u.miniDomQ).hide()
        }, y = !1, z = function (a) {
            y = t.yixin_status;
            var b, c;
            b = e.template(m)({
                dimensionX: v.x,
                dimensionY: v.y,
                consts: g.subConsts,
                price: t.price,
                email: t.email,
                uname: t.username,
                isYiXinUser: t.yixin_status,
                state: a,
                currentShop: t.currentShop,
                initPrice: t.initPrice
            }), d("body").append(b), k = d(u.domQ), n = d(u.emailQ);
            var f = n.val().replace(/\s/g, "");
            (!f || f.indexOf("pricehub.huihui.cn") >= 0) && (n.addClass("init"), n.val(n.attr("def-data")), n.attr("disabled", !1), n.removeClass("disabled"), d(".-deprice-email-edit").hide()), c = d("body").position().left;
            var h = d(window).height() / 2 + d(document).scrollTop();
            A = !1, k.css({left: v.x - 440 + c + "px", top: h - k.height() / 2})
        };
        d(document).delegate(u.editQ, "click", function () {
            k.remove(), clearTimeout(s), p = "edit", z("edit")
        }), d(document).delegate("#youdaoGWZS_deprice_remind .-close", "click", function () {
            k.remove(), clearTimeout(s);
            var a = f.localConf || {};
            a.yixinNotRemind || y || A || b()
        }), d(document).delegate("#yixinDialog .-close", "click", function (a) {
            var b = d(this), c = b.attr("data-type");
            "not-now" === c && (f.localConf.yixinNotRemind = !0, d("#" + g.optionsID).html(j.jsonToStr(f.localConf, ";"))), d("#yixinDialog").remove()
        });
        var A = !1;
        d(document).delegate(".-deprice-yixin", "click", function (a) {
            b()
        }), d(document).delegate(".-deprice-email-edit", "click", function (a) {
            var b = d(u.emailQ);
            b.attr("disabled", !1), b.removeClass("disabled"), d(".-deprice-email-edit").hide()
        }), d(document).delegate(u.subQ, "click", function () {
            if (B() && D()) {
                var a = d(u.priceQ), e = d(u.storeChooseQ).attr("data-result"), g = d(u.storeChooseQ).attr("data-type"), h = a.val(), i = !1, j = n.val().replace(/\s/g, "");
                j !== t.email && c.ajax({
                    url: t.setEmail,
                    nl: !0,
                    params: {email: j}
                }), t.siteList = e, t.price !== h && (i = !0, t.exceptPrice = h), t.listType !== g && (i = !0, t.listType = g), i && G[v.type]("succ"), f.conf.rePaintSubList = !0, k.remove();
                var l = f.localConf || {};
                l.yixinNotRemind || y || A || b()
            }
        }), d(document).delegate(u.emailQ, "focus", function (a) {
            n.hasClass("init") && (n.removeClass("init"), n.val(""))
        });
        var B = function () {
            var a = n.val().replace(/\s/g, ""), b = /^([a-zA-Z0-9_-]|\.)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,5}){1,4})$/;
            return "" !== a && b.test(a) ? (k.removeClass(u.errCSS), !0) : (k.addClass(u.errCSS), !1)
        }, C = function (a) {
            var b = ["#d9d9d9", "#f5ac52"], c = 0, e = setInterval(function () {
                return 8 === c ? void clearInterval(e) : void d(a).css("border-color", b[++c % 2])
            }, 80)
        }, D = function () {
            var a = u.priceQ, b = d(u.priceQ), c = b.val().replace(/\s/g, ""), e = /(^\d+\.{0,1}\d+$)|(^\d$)/g, f = ".youdaoGWZS_stores-list";
            return e.test(c) ? d(f).is(":visible") ? (C(f), !1) : !0 : (C(a), b.val(t.initPrice), !1)
        }, E = {
            baseEnv: function () {
                var a, b, c, g, j = f.localConf || {}, k = f.data.thisItem || {}, l = f.data.thisSite || {}, m = f.data.thisPrice || {}, n = f.data.clsuter || {}, o = f.data.priceHub || {}, p = {};
                t.extensionid = j.extensionid || "", t.email = j.email || f.data.email || "", t.remberEmail = !0, t.priceList = [], v.isModify ? (g = v.modifyInfo, t.email = v.email, t.itemId = g.itemId, t.clusterId = g.clusterId || "", t.iscluster = g.iscluster, t.username = g.username, t.yixin_status = g.yixin_status, d.extend(t.priceList, g.priceList)) : (b = f.data.urlPriceList || {}, p.avaiable = m.avaiable, p.price = m.price, p.id = k.id, p.site = l.site, p.famous = l.famous, p.siteName = l.siteName, c = h.encrypt(k.url, 2, !0), t.mmurl = c, t.itemId = k.id, t.clusterId = o.clusterId || "", e.each(b, function (a) {
                    a.isChecked = !0
                }), d.extend(t.priceList, b), t.priceList.unshift(p), t.priceList.length > 1 ? (t.iscluster = !0, t.clusterId = n.clusterId) : t.iscluster = !1), a = i({
                    vendorList: t.priceList,
                    customClass: "deprice-vendors",
                    exceptEle: ".remind-price input",
                    isModify: v.isModify
                }), t.currentShop = f.data.thisSite.siteName || "��ǰ�̼�", t.initPrice = a.initPrice
            }, common: function () {
                v.type;
                r = v.$elem, v.callback ? H.succ = v.callback : H.succ = function () {
                }, clearTimeout(s), E[v.type](v)
            }, sub: function () {
                var a;
                v.isModify ? a = n.val().replace(/\s/g, "") : G[v.type](v.type)
            }, cancel: function () {
                d("body").position().left;
                G[v.type](v.type)
            }
        }, F = function () {
            var a = {extensionid: t.extensionid, email: t.email, expect: t.exceptPrice || t.initPrice};
            return v.isModify || (a.m = t.mmurl), a.id = t.itemId, a.subUrl = t.subUrl + "/item", "C" === t.listType ? a.sites = t.listType + "@" + t.siteList : a.sites = "B", a.nl = !0, a
        }, G = {
            sub: function (a) {
                var b, e;
                e = t.subUrl + "/item", b = {
                    url: e,
                    params: F(),
                    context: self,
                    success: H[a],
                    error: H[a]
                }, t.remberEmail && (f.localConf.email = t.email), d("#" + g.optionsID).html(j.jsonToStr(f.localConf, ";")), setTimeout(function () {
                    c.ajax(b)
                }, 0)
            }, cancel: function () {
                var a, b;
                a = {}, a.email = t.email, t.itemId && "undefined" !== t.itemId && (a.id = t.itemId, a.cluster = !1), a.m = t.mmurl, a.extensionid = t.extensionid, a.nl = !0, b = {
                    url: t.cancelUrl,
                    params: a,
                    context: self,
                    success: H[v.type],
                    error: H[v.type]
                }, setTimeout(function () {
                    c.ajax(b)
                }, 0)
            }
        }, H = {
            sub: function (a) {
                a && a.success && (t.listType = a.listType, t.siteList = a.siteList, t.price = a.except, t.username = a.username, t.yixin_status = a.yixin_status, t.email = a.email, v.isModify ? (z("edit"), p = "sub") : z("sub"), k.show(), f.conf.rePaintSubList = !0, H.succ("cancel"))
            }, cancel: function (a) {
                a.success && (x(v.type), clearTimeout(s), k.show(), H.succ("sub"), f.conf.rePaintSubList = !0, s = setTimeout(function () {
                    k.remove()
                }, 3e3))
            }, succ: function () {
            }
        }, I = {
            show: function (a) {
                v = a, w(v), E.common(v)
            }, getSubScribeInfo: function (a) {
                return v = a, E.baseEnv(), F()
            }, _destructor: function () {
            }
        };
        return I
    }();
    k.listens({
        subscribe: function (a) {
            var b;
            b = d(".-deprice-dialog"), b.length || n.show(a)
        }, getSubScribeInfo: function (a) {
            var b = n.getSubScribeInfo(a);
            a.callback.call(this, b)
        }
    })
}),youdao.define("modules/runtime/galleryDiscount.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = c._, f = c.require_module("youdao.cache"), g = (c.require_module("youdao.consts"), c.require_module("youdao.code"), c.require_module("youdao.util")), h = c.reg("galleryDiscount"), i = {
        traverseImg: function (a) {
            var b, c = {}, h = this;
            d("a img").each(function () {
                var b, c, g, i, j, k, l, m, n, o = d(this), p = o, q = a.length, r = !1;
                f.conf.backCompat, document.domain;
                if (!(p.height() < 60 || p.width() < 70)) {
                    for (c = 0; 4 > c && (b = o.attr("href"), b && (b = b.toLowerCase()), void 0 === b || "" === b); c += 1)o = d(o).parent();
                    for (c = 0; q > c; c += 1) {
                        var s = (a[c].url || "").toLowerCase();
                        if (b && (b = b.toLowerCase()), b && !a[c].hasShow && -1 !== b.indexOf(s)) {
                            if (l = p.siblings(), l.length > 0 ? l.each(function () {
                                    var a = d(this);
                                    "absolute" === a.css("position") && (r = !0)
                                }) : r = !1, m = p.parent(), !r) {
                                for (g = 0; 3 > g && (n = d(m).css("width"), "auto" === n); g += 1)m = d(m).parent();
                                "absolute" !== d(m).css("position") && d(m).css({position: "relative"})
                            }
                            k = h.getInforItem(a[c]), i = p.height() + 5, j = p.width() + 20;
                            var t = e.template(h.itemInAnchorViw)({
                                discount: k.discount,
                                type: k.type,
                                flag: k.flag,
                                style: k.style,
                                color: k.color,
                                content: k.content,
                                marginTop: i,
                                marginLeft: j,
                                isUseAP: r
                            });
                            p.parent().append(t), a[c].hasShow = !0;
                            break
                        }
                    }
                    d(document).delegate(".youdaoGWZS_gallerTips", "click", function (a) {
                        a.preventDefault()
                    })
                }
            }), d("img[usemap]").each(function () {
                var e = [], f = d(this).attr("usemap"), i = f.substring(1), j = "youdaoGWZS_" + i, k = d(this).offset().left, l = d(this).offset().top, m = '[name="' + i + '"] area', n = (d("#" + i).parent(), d(document).scrollTop()), o = l - n, p = !0;
                k || o || (p = !1, b = !0), d(m).each(function () {
                    var b, c, f = {}, i = this, j = d(i).attr("href"), k = d(i).attr("coords").split(","), l = g.getCoordsPosition(k), m = a.length;
                    if (j)for (b = 0; m > b; b++)if (-1 !== j.indexOf(a[b].url)) {
                        c = h.getInforItem(a[b]), f.href = j, f.left = l.left, f.top = l.top, f.desc = c.desc, f.style = c.style, f.discount = c.discount, f.price = c.price, f.content = c.content, e.push(f), a[b].url = "hasShow";
                        break
                    }
                }), e.length > 0 && (c[j] = {}, c[j].id = j, c[j].imgSelector = f, c[j].left = k, c[j].top = l, c[j].validList = e, c[j].isDisplay = p)
            }), h.renderMapTips(c, b), g.isEmptyObject(c) || h.listenResizeEvent(c)
        },
        listenResizeEvent: function (a) {
            d(window).bind("resize", function () {
                d("img[usemap]").each(function () {
                    var b = "youdaoGWZS_" + d(this).attr("usemap").substring(1), c = d(this).offset().left, e = d(this).offset().top;
                    a.hasOwnProperty(b) && d("#" + b).css({top: e, left: c})
                })
            })
        },
        getInforItem: function (a) {
            var b, c, d, e, f = {}, g = a.type || a.isCheap;
            switch (g) {
                case"lowest":
                    b = "price-lowest", c = "��", e = "#fff", d = !0;
                    break;
                case"fall":
                    b = "price-decline", c = "��", d = !0, e = "#006f00";
                    break;
                case"steady":
                    b = "price-stable", c = "ƽ��", e = "#666";
                    break;
                case"rise":
                    b = "price-rise", c = "����", e = "#fff";
                    break;
                case"notcheap":
                    b = "unitprice-rise", c = a.show, e = "#333";
                    break;
                case"cheap":
                    b = "unitprice-decline", c = a.show, e = "#feffff";
                    break;
                default:
                    b = "price-stable", c = "ƽ��", e = "#666"
            }
            return f.style = b, f.color = e, f.flag = d, f.content = c, f.discount = a.discount, f.price = a.price, f.href = a.href, f
        },
        renderMapTips: function (a, b) {
            var c, f, g, h, i, j, k, l, m, n, o = this, p = [];
            m = d(d("body").children()[0]), l = m.css("overflow"), n = m.scrollTop(), k = "auto" === l ? !0 : !1;
            for (c in a)if (a.hasOwnProperty(c)) {
                for (i = a[c], h = i.validList.length, j = document.createElement("div"), j.id = i.id, p.push(i.imgSelector), j.style.position = "absolute", j.style.top = i.top + n + "px", j.style.left = i.left + "px", j.style.display = i.isDisplay ? "block" : "none", g = 0; h > g; g++)f = e.template(o.itemView)({
                    top: i.validList[g].top,
                    left: i.validList[g].left,
                    style: i.validList[g].style,
                    flag: i.validList[g].flag,
                    discount: i.validList[g].discount,
                    href: i.validList[g].href,
                    content: i.validList[g].content
                }), d(j).append(f);
                k ? m.append(j) : d("body").append(j)
            }
            b && setInterval(function () {
                var a, b, c, e, f, g, h, i;
                for (a = 0, b = p.length; b > a; a += 1)e = p[a], h = 'img[usemap="' + e + '"]', f = d(d(h)[0]).offset().left, g = d(d(h)[0]).offset().top - n, c = e.substring(1), i = "#youdaoGWZS_" + c, f && g ? d(i).css({
                    display: "block",
                    left: f,
                    top: g
                }) : d(i).css({display: "none", left: 0, top: 0})
            }, 100)
        },
        itemView: '<div style=" top:<%= top %>px; left: <%= left %>px;"title="�ݻݹ������ֶ����ṩ�۸���Ϣ"hoverAction="PRICETAG_HOVER" class="youdaoGWZS_gallerTips youdaoGWZS_<%= style %>"data-url="<%= href %>" data-purpose="GWZS_galleryTip"><span class="disc-num" style="margin-left: 2px"><%= discount %></span><span><%= content %></span></div>',
        itemInAnchorViw: '<div style="top:0px; left: 0px;text-align:center;"title="�ݻݹ������ֶ����ṩ�۸���Ϣ"hoverAction="PRICETAG_HOVER" class="youdaoGWZS_gallerTips youdaoGWZS_<%= style %>"data-purpose="GWZS_galleryTip"><span class="disc-num" style="margin-left: 2px; position: static;text-align: center;line-height: 25px;font-size: 12px; font-weight: bolder;display: inline;color: <%= color %>;"><%= discount %></span><span style="position: static;text-align: center;line-height: 25px;font-size: 12px; font-weight: bolder;display: inline;color: <%= color %>;" class="hui-disc"><%= content %></span></div>'
    };
    h.listen("galleryDiscount_show", function () {
        var a = f.conf.isHoverHistoryOpen, b = f.data.sale, c = f.data.unitprice, d = {};
        b && (d = f.data.sale ? f.data.sale.items : null), c && (d = f.data.unitprice ? f.data.unitprice.items : null), "open" === a && d && i.traverseImg(d)
    })
}),youdao.define("modules/runtime/info.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.require_module("youdao.consts"), e = c.require_module("youdao.util"), f = c.require_module("youdao.cache"), g = (c.require_module("youdao.code"), f.conf, document.getElementById(d.optionsID));
    if (g) {
        var h = e.urlToJson(g.innerHTML, ";");
        f.localConf = h, f.localConf.position = "down";
        for (var i in h)f.conf[i] && "apiVersion" !== i && (f.conf[i] = h[i])
    } else f.localConf = {browser: "360se", vendor: "youdao", version: "1.9"}, f.conf.popupFlag = 0;
    f.dom.body.style.width;
    if (f.conf.ie = function () {
            for (var a, b = 3, c = document.createElement("div"), d = c.getElementsByTagName("i"); c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", d[0];);
            return b > 4 ? b : a
        }(), f.conf.ie) {
        if (f.conf.browser = "ie", "BackCompat" === document.compatMode && (f.conf.backCompat = !0), /^[0-9.]+$/.test(f.localConf.vendor) && !/^[0-9.]+$/.test(f.localConf.version)) {
            var j = f.localConf.vendor;
            f.localConf.vendor = f.localConf.version, f.localConf.version = j
        }
    } else f.conf.browser = "chrome";
    var k = document.getElementById(d.seID);
    if (k) {
        var l = k.src;
        /se360/.test(l) && (f.localConf.browser = "360se")
    }
}),youdao.define("modules/runtime/metas.js", function (a, b) {
    "use strict";
    function c() {
        var a = document.getElementById("attributes");
        if (!a)return "";
        var b = a.innerHTML || "", c = b.match(/ISBN[^<]+?(\d+)/);
        if (c)return "@ISBN=" + c[1];
        var d = "", e = b.match(/����[^\"][^<]+/);
        e && (d = e);
        var f = b.match(/Ʒ��[^\"][^<]+/);
        f && (d += " " + f);
        var g = b.match(/�ͺ�[^\"][^<]+/);
        return g && (d += " " + g), d = d.toString(), d = d.replace("&nbsp;", " ").replace("&nbsp;", " ").replace("&nbsp;", " ")
    }

    for (var d, e = youdao, f = e.require_module("youdao.cache"), g = e.require_module("youdao.util"), h = document.getElementsByTagName("meta"), i = {}, j = window.location.hostname, k = 0, l = h.length; l > k; k++)if (d = h[k].name, g.isString(d)) {
        if (d = d.toLowerCase(), i[d] = "" + h[k].getAttribute("content"), "keywords" === d && /(taobao\.com)|(tmall\.com)/.test(j)) {
            var m = c();
            "" !== m && (i[d] = m), f.conf.taobao = !0
        }
        /(taobao\.com)|(tmall\.com)/.test(j) && (f.conf.taobao = !0)
    }
    for (k in i)f.conf[k] = i[k]
}),youdao.define("modules/runtime/log.js", function (a, b) {
    "use strict";
    function c() {
        if (e.localConf.localAction) {
            i.src = decodeURIComponent(e.localConf.localAction), e.localConf.localAction = "";
            var a = document.getElementById(f.optionsID);
            a && e.localConf && (a.innerHTML = g.jsonToStr(e.localConf, ";"))
        }
    }

    var d = youdao, e = (d.ns("youdao.modules"), d.require_module("youdao.cache")), f = d.require_module("youdao.consts"), g = d.require_module("youdao.util"), h = d.jQuery;
    youdao._;
    e.conf.test && !e.localConf.log;
    var i = new Image;
    c();
    var j = function (a, b, c) {
        var d = "prefer" === f.subConsts.plugClass ? !0 : !1, i = document.body.clientWidth, j = window.screen.width, k = a.split("_").length >= 2 ? a.split("_")[1] : "", l = b.getAttribute("href") || "none", m = l.split("/").length >= 3 ? l.split("/")[2] : "", n = {
            action: a,
            extensionid: e.localConf.extensionid || "",
            browser: e.localConf.browser || e.conf.browser,
            bodywidth: i,
            screenwidth: j,
            discountId: e.localConf.lastDiscountId,
            type: c || f.logType,
            fromSite: document.domain,
            like: d,
            location: e.conf.position,
            feature: k,
            product: e.conf.product,
            toSite: l,
            toDomain: m,
            vendor: e.conf.vendor,
            version: e.conf.version,
            currenturl: encodeURIComponent(location.href),
            referrer: document.referrer
        }, o = e.data && e.data.HuiData && e.data.HuiData.uid;
        n.pageType = (e.data && e.data.recmdinfo && e.data.recmdinfo.pageType || "").toUpperCase(), n.uid = o ? e.data.HuiData.uid : "";
        var p = b.attributes, q = /^data-log-(.*)$/;
        if (h.each(p, function (a, b) {
                q.test(b.nodeName) && (n[b.nodeName.match(q)[1]] = encodeURIComponent(b.nodeValue))
            }), "INPUT" === b.tagName && "submit" === b.getAttribute("type") && "none" === n.toSite) {
            if ("none" === n.toSite)return !0;
            b.removeAttribute("href")
        }
        if ("youdaoGWZS_non" === b.className || "youdaoGWZS_noMore" === b.className)return !0;
        var r, s = b.getAttribute("params") || "no-parameters";
        r = "no-parameters" === s ? g.comboParams(n) : g.comboParams(n) + "&" + s;
        var t = f.logUrl + "?" + r;
        if (n.localaction) {
            e.localConf.localAction = encodeURIComponent(t);
            var u = document.getElementById(f.optionsID);
            return u && e.localConf && (u.innerHTML = g.jsonToStr(e.localConf, ";")), !0
        }
        if (window.isInExtension)h.ajax({url: t}); else {
            var v = new Image;
            v.src = t
        }
        return !0
    }, k = function (a, b, c) {
        if (b && b.tagName) {
            var d = b.getAttribute(a);
            if (d)switch (c) {
                case"click":
                    j(d, b);
                    break;
                case"mouseover":
                    b.timerId = setTimeout(function () {
                        j(d, b)
                    }, 1e3 * e.conf.logTime);
                    break;
                case"mouseout":
                    b.timerId && clearTimeout(b.timerId)
            }
            k(a, b.parentNode, c)
        }
    };
    h(document).bind("click", function (a) {
        var b, c, d = this, e = a.target || d.srcElement;
        k("clkAction", e, "click"), c = "javascript:void(0)", "buy.yesky.com" === location.hostname && (b = h(e).attr("href"), b && b === c && a.preventDefault())
    }), h(document).delegate("[hoverAction]", "mouseenter", function (a) {
        a = a || window.event;
        var b = a.target || a.srcElement;
        k("hoverAction", b, "mouseover")
    }), h(document).delegate("[hoverAction]", "mouseleave", function (a) {
        a = a || window.event;
        var b = a.target || a.srcElement;
        k("hoverAction", b, "mouseout")
    }), e.fn || (e.fn = {}), e.fn.sendLog = j
}),youdao.define("modules/runtime/cssLink.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.ns("youdao.modules"), c.require_module("youdao.cache"), c.require_module("youdao.consts")), e = c.require_module("youdao.dom"), f = document.createElement("link");
    f.type = "text/css", f.rel = "stylesheet", f.href = d.baseCss + d.commonCssName, window.isInExtension || document.getElementsByTagName("head")[0].appendChild(f);
    var g = document.createElement("div");
    g.className = "youdaoGWZSTestCss", document.body.appendChild(g);
    var h = function (a) {
        var b = !1;
        try {
            "pointer" == e.getStyle(g, "cursor") && (b = !0)
        } catch (c) {
        }
        b || setTimeout(function () {
            h(a)
        }, 100)
    };
    h(f)
}),youdao.define("modules/runtime/css.js", function (a, b) {
    "use strict";
    var c, d, e, f, g = youdao, h = (g.ns("youdao.modules"), g.require_module("youdao.consts")), c = g.require_module("youdao.cache"), i = g.require_module("youdao.dom"), j = g.jQuery, k = g.reg("css");
    c = g.require_module("youdao.cache"), c.dom.elem.append = g.dom.append, d = c.dom.elem.append("div", {id: h.elemId}), e = c.dom.body.append("div", {id: h.commonName + "features"}), f = c.dom.elem.append("div", {id: h.elemId + "Show"}), c.dom.elem = d, c.dom.show = f, c.dom.fDiv = e, c.dom.elem.style.zIndex = h.basezIndex, c.dom.fDiv.style.zIndex = h.basezIndex, c.dom.show.style.zIndex = h.basezIndex;
    var l = function () {
        6 !== c.conf.ie ? c.dom.bottom = 0 - document.body.scrollTop : c.dom.bottom = c.dom.bottom ? 0 : 1, c.dom.elem.style.top = "auto", c.dom.elem.style.bottom = c.dom.bottom + "px", f.style.top = "auto", f.style.bottom = c.dom.bottom + 60 + "px";
        var a = i.getElementsByClass("youdaoGWZSfixed", "div", document);
        if (a || 0 !== a.length) {
            for (var b, d = 0, e = a.length; e > d; d++)b = a[d], b.style.bottom = c.dom.bottom + 60 + "px", b.style.top = "auto";
            if (a = i.getElementsByClass("youdaoGWZSfixedLayer", "div", document), a || 0 !== a.length)for (e = a.length, d = 0; e > d; d++)b = a[d], b.style.bottom = c.dom.bottom + "px", b.style.top = "auto"
        }
    }, m = function () {
        var a, b = j("#youdaoGWZS-sidebar-right");
        a = 6 !== c.conf.ie ? document.body.scrollTop : document.documentElement.scrollTop, b.css({
            top: a + 120,
            bottom: "auto"
        });
        var d = j("#youdaoGWZS-sidebar-left"), e = document.documentElement.clientHeight || document.clientHeight;
        d.css({top: a + e - 450, bottom: "auto"})
    }, n = function () {
        var a, b;
        window.innerHeight && window.scrollMaxY ? (a = document.body.scrollWidth, b = window.innerHeight + window.scrollMaxY) : (a = Math.max(document.body.scrollWidth, document.body.offsetWidth), b = Math.max(document.body.scrollHeight, document.body.offsetHeight));
        var c, d;
        c = document.documentElement.clientWidth || document.body.clientWidth, d = document.documentElement.clientHeight || document.body.clientHeight;
        var e = Math.max(b, d), f = Math.max(a, c);
        return {page: {width: f, height: e}, window: {width: c, height: d}}
    };
    j(d).width(n().windowWidth), 6 === c.conf.ie || c.conf.backCompat ? (l(), g.event.addEvent(window, "scroll", function (a) {
        l(), m()
    }), document.execCommand("BackgroundImageCache", !1, !0), j("#youdaoGWZS").css("width", n().window.width + "px"), k.listen("resizeWin", function () {
        j("#youdaoGWZS").css("width", n().window.width + "px"), l()
    })) : (c.dom.elem.style.position = "fixed", c.dom.show.style.position = "fixed")
}),youdao.define("modules/runtime/trendCanvas.js", function (a, b) {
    "use strict";
    var c = youdao, d = c.jQuery, e = (c._, c.require_module("youdao.cache"), {
        SUB: function (a, b) {
            var c, d, e, f;
            try {
                c = a.toString().split(".")[1].length
            } catch (g) {
                c = 0
            }
            try {
                d = b.toString().split(".")[1].length
            } catch (g) {
                d = 0
            }
            return e = Math.pow(10, Math.max(c, d)), f = c >= d ? c : d, parseFloat(((a * e - b * e) / e).toFixed(f))
        }, timeDiff: function (a, b) {
            var c = a.split("-"), d = new Date(c[1] + "/" + c[2] + "/" + c[0]), e = b.split("-"), f = new Date(e[1] + "/" + e[2] + "/" + e[0]);
            return parseInt(Math.abs(d - f) / 1e3 / 60 / 60 / 24)
        }, priceCurveCoords: function (a) {
            var b = a.priceHistoryData.list, c = a.min, f = (a.priceHistoryData.curTime, a.priceHistoryData.startTime), g = [];
            return d.each(b, function (d) {
                var h = e.timeDiff(f, this.time), i = Math.round(h / a.timeRange * 192), j = 0 != a.priceRange ? -Math.round((this.price - c) / a.priceRange * 76) : -32;
                if (g.push([i, j]), h !== a.timeRange)if (b.length !== d + 1) {
                    var k = Math.round(e.timeDiff(f, b[d + 1].time) / a.timeRange * 192);
                    k = k > i ? k - 1 : k, g.push([k, j])
                } else g.push([192, j])
            }), g
        }, drawDashLine: function (a, b, c, d) {
            if (void 0 === d)var e = -2, f = 302; else var e = 0, f = d;
            for (var c = void 0 === c ? 5 : c, g = f - e, h = 0, i = Math.floor(Math.sqrt(g * g + h * h) / c), j = 0; i > j; j++)j % 2 === 0 ? a.moveTo(e + g / i * j, b + h / i * j) : a.lineTo(e + g / i * j, b + h / i * j);
            a.stroke()
        }, axisCanvas: function (a) {
            var b = a.find(".hui-trend-axis").get(0);
            if (b.getContext) {
                var c = b.getContext("2d");
                c.beginPath(), c.translate(6.5, .5), c.strokeStyle = "#efefef", c.lineWidth = 1, c.moveTo(0, 0), c.lineTo(0, 110), c.stroke(), c.moveTo(32, 6), c.lineTo(32, 110), c.stroke(), c.moveTo(64, 8), c.lineTo(64, 110), c.stroke(), c.moveTo(96, 8), c.lineTo(96, 110), c.stroke(), c.moveTo(128, 8), c.lineTo(128, 110), c.stroke(), c.moveTo(160, 8), c.lineTo(160, 110), c.stroke(), c.moveTo(192, 8), c.lineTo(192, 110), c.stroke(), c.moveTo(0, 18), c.lineTo(192, 18), c.stroke(), c.moveTo(0, 41), c.lineTo(192, 41), c.stroke(), c.moveTo(0, 64), c.lineTo(192, 64), c.stroke(), c.moveTo(0, 87), c.lineTo(192, 87), c.stroke(), c.moveTo(0, 110), c.lineTo(192, 110), c.stroke()
            }
        }, init: function (a) {
            var b = this, c = d("#youdaoGWZS_hover-tips");
            b.axisCanvas(c), a.timeRange = e.timeDiff(a.priceHistoryData.startTime, a.priceHistoryData.curTime);
            var f = Math.round(a.timeRange / 30);
            if (f > 12)var g = "12��ǰ", h = "6��ǰ"; else if (f > 10)var g = "10��ǰ", h = "5��ǰ"; else if (f > 8)var g = "8��ǰ", h = "4��ǰ"; else if (f > 6)var g = "6��ǰ", h = "3��ǰ"; else if (f > 4)var g = "4��ǰ", h = "2��ǰ"; else if (f = 3)var g = "2��ǰ", h = "1��ǰ"; else var g = "4��ǰ", h = "2��ǰ";
            var i = '<div class="hui-history-time-axis"><div class="hui-history-time-label" style="left:4px;">' + g + '</div><div class="hui-history-time-label" style="left:96px;">' + h + "</div></div>";
            if (c.find(".hui-trend-time-labels").html(i), a.priceRange = b.SUB(a.max, a.min), a.max !== a.min) {
                var j = a.priceHistoryData.list[a.priceHistoryData.list.length - 1].price, k = a.min === j ? "#ff0000" : "#666", l = '<dl style="top:6px;"><dd >' + a.max + '</dd></dl><dl style="top:86px;color:' + k + '"><dd >' + a.min + "</dd></dl>";
                if (a.today !== a.max && a.today !== a.min) {
                    var m = a.max - a.min, n = (a.max - a.today) / m * 80 + 6;
                    n = n > 75 ? 75 : n, n = 17 > n ? 17 : n, l += '<dl style="top:' + n + 'px;"><dd >' + a.today + "</dd></dl>"
                }
            } else var l = '<dl style="top:49px;"><dd >' + a.max + "</dd></dl>";
            c.find(".hui-trend-most-price").html(l);
            var o = b.priceCurveCoords(a), p = c.find(".hui-trend-curve").get(0);
            if (p.getContext) {
                var q = p.getContext("2d");
                if (q.beginPath(), q.translate(6, 90), q.beginPath(), q.strokeStyle = "#fd6802", q.lineWidth = 2, d.each(o, function (a) {
                        0 === a ? q.moveTo(this[0], this[1]) : q.lineTo(this[0], this[1])
                    }), q.stroke(), q.closePath(), this.timeDiff(a.priceHistoryData.startTime, a.priceHistoryData.list[0].time) > 0) {
                    var r = o[0][0] + 2;
                    q.beginPath(), b.drawDashLine(q, o[0][1], 2, r), q.closePath()
                }
            }
        }
    });
    return e
}),youdao.define("modules/runtime/hoverHistory.js", function (a, b) {
    "use strict";
    var c, d = youdao, e = d.jQuery, f = d._, g = window.location, h = g.protocol, i = g.hostname, j = g.pathname, k = d.require_module("youdao.cache"), l = d.require_module("youdao.consts"), m = (d.require_module("youdao.code"), d.require_module("youdao.util")), n = a("modules/runtime/trendCanvas.js"), o = {
        baseInfo: function () {
            var a = (document.domain, document.URL, {});
            return a.className = "body", a.elem = "a img, area", a.attr = "href", a.depth = 3, a
        }(),
        hrefList: {},
        hrefMouseIn: void 0,
        isCluster: void 0,
        priceInfro: {},
        timeShowBegin: void 0,
        mapId: void 0,
        isDataURISupported: function () {
            return e.browser.msie && "6.0" === e.browser.version ? !1 : "7.0" !== e.browser.version || document.documentMode ? !0 : !1
        }(),
        trigger: function () {
            var a, b, c, d = this, f = this.baseInfo, g = "#youdaoGWZS_hover-tips";
            e(f.className).delegate(f.elem, "mouseenter", function (f) {
                var g = this, h = e(this), i = h.attr("data-origin");
                if ("zhushou" !== i) {
                    var j = f.target, l = j.coords, m = d.getValidHref(g), o = d.getDimension(j, l), p = !0;
                    "open" === k.conf.isHoverHistoryOpen && (p = !1), d.hrefMouseIn = m, void 0 === m || p || (o.mapId && (d.mapId = o.mapId, d.triggerDiscTipsMap(d.mapId, m, !0)), d.triggerDiscTips(g, !0), d.removeView(), clearTimeout(c), d.hrefList.hasOwnProperty(m) && null !== d.hrefList[m] ? b = setTimeout(function () {
                        d.renderView(d.hrefList[m], m, o), k.data.isShowPriceCanvas && n.init(d.hrefList[m])
                    }, 500) : a = setTimeout(function () {
                        d.hrefList[m] = null, d.requestData(m, d.hrefList[m], o)
                    }, 300))
                }
            }), e(f.className).delegate(f.elem, "mouseleave", function () {
                clearTimeout(a), clearTimeout(b), d.triggerDiscTips(this), d.mapId && d.hrefMouseIn && d.triggerDiscTipsMap(d.mapId, d.hrefMouseIn), e(g).length > 0 && (c = setTimeout(function () {
                    d.removeView(), d.hrefMouseIn = ""
                }, 200))
            }), e(document).delegate(g, "mouseenter", function () {
                clearTimeout(c)
            }), e(document).delegate(g, "mouseleave", function () {
                d.removeView()
            }), e(document).delegate(".see-guide a", "click", function () {
                d.sentLogInfo("HISTORY_HOVER3_CLICK", 0, 0, isCluster)
            })
        },
        triggerDiscTipsMap: function (a, b, c) {
            var d, f = b.toLowerCase(), g = "youdaoGWZS_" + a, h = 'div[data-url="' + f + '"]', i = e("#" + g).children(h);
            i.length > 0 && (d = i.attr("class").split(" ")[1] + "_mouseIn", c ? i.addClass(d) : i.removeClass(d))
        },
        triggerDiscTips: function (a, b) {
            var c, d = e(a), f = e(d.next(".youdaoGWZS_gallerTips")[0]);
            f.length > 0 && (c = f.attr("class").split(" ")[1] + "_mouseIn", b ? e(f).addClass(c) : e(f).removeClass(c))
        },
        requestData: function (a, b, c) {
            var e = this, f = new Date, g = k.data.isShowPriceCanvas ? {
                phu: a, type: "canvas"
            } : {phu: a}, h = {
                url: l.serUrl, params: g, success: function (d) {
                    var g, h;
                    b = {};
                    for (g in d)d.hasOwnProperty(g) && (b[g] = d[g]);
                    null !== b && (h = new Date - f, b.timeCounterRequest = h, b.isSendLog = !1, e.hrefList[a] = b, e.renderView(b, a, c), k.data.isShowPriceCanvas && n.init(b)), o.trendData = d
                }, error: function () {
                    e.hrefList[a] = null
                }
            };
            this.isDataURISupported || (h.params.type = "url"), d.ajax(h)
        },
        getDimension: function (a, b) {
            var c, d, f, g, h, i, j, k, l, n, o, p, q = {};
            return q.width = 267, q.height = 222, void 0 !== b ? (i = "#" + e(a).parent().attr("name"), p = e("[usemap]").filter(function () {
                return this.useMap.toLowerCase() === i.toLowerCase()
            }), g = p.attr("usemap").substring(1), j = p.offset().left, k = p.offset().top, b = b.split(","), h = m.getCoordsPosition(b), d = parseInt(j, 10) + h.left, c = parseInt(k, 10) + h.top, f = {
                x: d + h.width,
                y: c,
                arrowDirection: "left",
                arrowVeritical: q.height / 2
            }, n = e(window).width() - f.x, n < q.width && (f.arrowDirection = "right", f.x -= parseInt(h.width, 10), f.x -= q.width), h.height > q.height && (o = h.height - q.height, f.y += o / 2), f.mapId = g) : (c = a.clientHeight / 2, d = a.clientWidth + 15, j = e(a).offset().left, f = {
                x: parseInt(j, 10) + d,
                y: e(a).offset().top,
                arrowDirection: "left",
                arrowVeritical: c - 15
            }, n = e(window).width() - f.x, n < q.width && (f.arrowDirection = "right", f.x -= d, f.x -= q.width, j < q.width && (f.arrowDirection = "left", l = q.width - j + 5, f.x += l, f.x += d / 2)), a.clientHeight > q.height && (o = a.clientHeight - q.height, f.y += o / 2, f.arrowVeritical = q.height / 2)), f
        },
        getValidHref: function (a) {
            var b, d, f, g, l, m, n, o = this.baseInfo, p = e(a), q = /^http:/, r = /^\/\//, s = /^\//, t = /^http:\/\/union.dangdang.com/, u = o.depth;
            k.conf.vendor, document.domain;
            if (void 0 !== k.data && void 0 !== k.data.itemRe) {
                for (c = new RegExp(k.data.itemRe), d = 0; u > d && (b = p.attr(o.attr), void 0 === b || "" === b); d += 1)p = e(p).parent();
                if (t.test(b) && (n = b.lastIndexOf("&backurl="), l = b.substring(n), m = l.indexOf("http:"), b = l.substring(m)), r.test(b) && (b = "http:" + b), q.test(b) || (s.test(b) || (f = j.lastIndexOf("/"), f > 0 ? (g = j.substring(0, f), b = g + "/" + b) : b = "/" + b), b = h + "//" + i + b), void 0 === c || c.test(b))return b
            }
        },
        renderView: function (a, b, c) {
            var g, h, i = this;
            if (this.isEmpty(a) && b === i.hrefMouseIn) {
                h = i.viewHelper(a), i.priceInfo = h;
                var j = a.priceTrendShare || k.data.sale;
                if (j) {
                    var m = l.baseUrl + "/api/zhushou/pricetrend_share.image?url=" + encodeURIComponent(b);
                    a.priceTrendShare.img && (m += "&img=" + encodeURIComponent(a.priceTrendShare.img));
                    var n = d.require_module("youdao.share");
                    a.priceTrendShare.shareUrl = n.shareTo("sina", a.priceTrendShare.shareDoc, a.priceTrendShare.shareDoc, "http://zhushou.huihui.cn?keyfrom=price_trend_share", m, !0)
                }
                g = f.template(this.view)({
                    dimensionY: c.y,
                    dimensionX: c.x,
                    resultObj: a,
                    arrowDirection: c.arrowDirection,
                    arrowVeritical: c.arrowVeritical,
                    href: b,
                    link: h.link,
                    type: h.type,
                    img: a.img,
                    site: a.site,
                    priceInfo: h,
                    isShowPriceTrendShare: j,
                    detail: h.detail,
                    url: a.imgurl,
                    isDataURISupported: i.isDataURISupported,
                    isShowPriceCanvas: k.data.isShowPriceCanvas,
                    isShowpromotionBar: a.promotionBest || !1,
                    priceunitSymbol: a.priceunitSymbol || !1
                }), e("body").append(g), this.timeShowBegin = new Date
            }
        },
        viewHelper: function (a) {
            var b = {}, c = a.max, d = a.min, e = a.hasLower, f = a.link, g = a.lowestSite, h = a.lowestPrice, i = a.today;
            return h ? (b.lowestPrice = h, b.lowestClass = "youdaoGWZS_hoverHistory_lowest", b.clusterUrl = a.clusterUrl, b.isHaveLowest = !0) : (b.lowestPrice = "����", b.lowestClass = "", b.isHaveLowest = !1), f && "guide" === f.type ? b.type = "guide" : f && "discount" === f.type ? b.type = "discount" : b.type = "", b.link = f, b.todayValue = i, b.maxValue = c, b.minValue = d, b.showToday = !1, b.hasLower = e, b.lowestSite = g + "���ͼ�", c === d ? (b.showToday = !0, b.todayOnly = !0, b.todayText = "���գ�") : c === i ? (b.maxText = "������ߣ�", b.minText = "��ͣ�") : d === i ? (b.todayMin = !0, b.maxText = "��ߣ�", b.minText = "������ͣ�") : (b.showToday = !0, b.todayText = "���գ�", b.maxText = "��ߣ�", b.minText = "��ͣ�"), b
        },
        isEmpty: function (a) {
            var b;
            return null !== function () {
                for (b in a)return b
            }() ? !0 : !1
        },
        removeView: function () {
            var a, b, c = this.hrefList[this.hrefMouseIn];
            if (e("#youdaoGWZS_hover-tips").length > 0 && e("#youdaoGWZS_hover-tips").remove(), c && !c.isSendLog) {
                if (a = new Date - this.timeShowBegin, a > 1e3) {
                    a = Math.round(a / 100) / 10, b = c.timeCounterRequest, b = Math.round(b / 100) / 10;
                    var d = c.lowestPrice ? 1 : 0;
                    this.sentLogInfo("POPUP_HISTORY_MOD_HOVER", b, a, d), c.isSendLog = !0
                }
                this.timeShowBegin = void 0
            }
        },
        sentLogInfo: function (a, b, c, d) {
            var e, f, g, h = "ARMANI_EXTENSION_ACTION", i = new Image;
            return g = this.priceInfo, e = {
                action: a,
                browser: k.localConf.browser || k.conf.browser,
                extensionid: k.localConf.extensionid || "",
                cluster: d,
                vendor: k.conf.vendor,
                type: h,
                murl: this.hrefMouseIn
            }, b && (e.t1 = b), c && (e.t2 = c), g.link && (e.linktype = encodeURIComponent(g.link.type), e.anchor = g.link.anchor, e.target = encodeURIComponent(g.link.target)), g.hasLower && (e.hasLower = !0), f = m.comboParams(e), i.src = l.logUrl + "?" + f, !0
        },
        view: '<div id="youdaoGWZS_hover-tips" style="position:absolute; top:<%= dimensionY %>px;left:<%= dimensionX %>px; "class="clearfix youdaoGWZS_hover-tips<%= type %>"><div class="youdaoGWZS_hover-tips-hd"></div><h3><span class="hui-logo"></span><span>�۸�Ԥ��</span></h3><% if (isShowpromotionBar) {%><div class="hui-trend-Promotion"><p>���μ�<span><%= isShowpromotionBar.info %></span><% if (isShowpromotionBar.promoDiscount) {%>������<%= isShowpromotionBar.promoDiscount %>�۵��ּ�<span><%= priceunitSymbol %><%= isShowpromotionBar.promoPrice %></span><% } %></p></div><% } %><% if (isShowPriceCanvas) { %><div class="hui-trend-canvas"><canvas class="hui-trend-axis" width="240" height="130"></canvas><canvas class="hui-trend-curve" width="240" height="130"></canvas><div class="hui-trend-time-labels"></div><div class="hui-trend-most-price"></div></div><% } else { %><% if (isDataURISupported) { %><img src="data:image/png;base64,<%= img %>" /><% } else { %><img src="<%= url %>" /><% } %><% } %><% if (isShowPriceTrendShare) { %><a class="-price-trend-share hui-price-trend-share" clkAction = "POPUP_HISTORY_TEXT_CLICK" data-log-status="toWeibo"data-log-feature="PROMOTE"href="<%= resultObj.priceTrendShare.shareUrl%>" target="_blank"><i></i><%= resultObj.priceTrendShare.anchor %> </a><% } else { %><a class="-price-trend-share hui-price-trend-share" clkAction = "POPUP_HISTORY_TEXT_CLICK" data-log-status="toWeibo"data-log-feature="PROMOTE"href="<%= resultObj.priceTrendShare.shareUrl%>" target="_blank"><i></i><%= resultObj.priceTrendShare.anchor %></a><% } %><div class="other-vendor-wrapper"><p class="other-vendor-content"style="<% if (!priceInfo.isHaveLowest) { %>margin-top: 12px;<% } %>"> <% if (priceInfo.isHaveLowest) { %><a class="<%= priceInfo.lowestClass %>" target="_blank"clkAction = "POPUP_HISTORY_OTHERS_CLICK" href="<%= priceInfo.clusterUrl %>"><i></i><%= priceInfo.hasLower ? priceInfo.lowestSite : "�����̼���ͼ�" %>��<%= priceInfo.lowestPrice %></a><a class="see-other-vendor" target="_blank" <% if (isShowPriceTrendShare) { %>style="background: none;"<% } %>clkAction = "POPUP_HISTORY_SEEMORE_CLICK" href="<%= priceInfo.clusterUrl %>">ȥ����<% if (isShowPriceTrendShare) { %>>><% } %></a><% } else { %><span><i></i> �����̼���ͼۣ�����</span><% } %></p></div><% if (false) { %><div class="see-guide"><a href="<%= link.target %>" target="_blank"><%= link.anchor %></a><i></i></div><% } %><span class="<%= arrowDirection %> arrow "style="top:<%= arrowVeritical %>px"></span></div>'
    };
    o.trigger()
}),youdao.define("modules/runtime/render.js", function (a, b) {
    "use strict";
    var c = youdao, d = (c.ns("youdao.modules"), c.jQuery), e = c._, f = c.mod || {}, g = c.require_module("youdao.cache"), h = c.reg("render"), i = c.newFeature();
    c.update = function () {
        d("#youdaoGWZS").remove();
        var a = document.createElement("script");
        a.src = "http://192.168.187.133:8000/dest/script/extension_3_0.js", d("head").append(a)
    };
    var j = /##parse\(['"](.*)['"]\)/g, k = function (a) {
        var b = "";
        c.mod[a].control && (b = "<% youdao.mod." + a + ".control(_" + a + "); %>");
        var d = c.mod[a].template || "";
        return b + d.replace(j, function (a, b) {
                return k(b)
            })
    }, l = function (a) {
        var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
        return null != c ? unescape(c[2]) : null
    };
    return {
        init: function () {
            var a, b = k("container");
            if (g.data.reviewTags) {
                var j = g.data.reviewTags.urlPrefix;
                g.data.reviewTags.urlPrefix = j.replace(/#review$/, "")
            }
            var m = e.template(b, {_container: g.data});
            if (g.data.thisSite && "huihui.cn" == g.data.thisSite.site && (d("#youdaoGWZS").hide(), a = l("outfrom")), g.data.enableHaitao && (a = l("outfrom")), a && c.ajax({
                    url: "api/haitao/setOutfrom",
                    params: {outfrom: a}
                }), d("#youdaoGWZS").html(m), !g.data.isBlack) {
                var n = k("sidebar"), o = e.template(n, {_container: g.data});
                d("#youdaoGWZS-sidebar-right").length > 0 ? d("#youdaoGWZS-sidebar-right").replaceWith(o) : d("#youdaoGWZS").after(o)
            }
            g.dom.elem = d('div[hui-mod="container"]')[0], g.dom.sidebar = d('div[hui-mod="sidebar"]')[0], d("body").find("[hui-mod]").each(function (a, b) {
                var c = d(b), e = c.attr("hui-mod");
                c.sMsg = function (a) {
                    h.send(e, a)
                }, c.lMsg = function (a, b) {
                    h.listen(a, b)
                }, c.newFeature = function (a) {
                    return i.check({name: e, $item: c, $newfeature: a})
                }, d.isFunction(f[e].event) && f[e].event(c)
            }), d(window).bind("resize", function () {
                h.send("resizeWin"), h.send("render", {type: "reset"})
            }), h.send("render", {type: "reset"}), setTimeout(function () {
                h.send("tips", {type: "start"})
            }, 2e3), h.send("plugin_container"), h.send("pop-up");
            var p = g.data.sale, q = g.data.unitprice;
            (p || q) && h.send("galleryDiscount_show"), h.send("extension:status:end")
        }
    }
}),youdao.define("modules/runtime/cs.js", function (a, b) {
    "use strict";
    function c() {
        var a, b = f("a img"), c = [], d = 3, e = 0, h = p[o];
        return g.each(b, function (b) {
            b = f(b);
            var g = f(b);
            if (!(g.height() < 60 || g.width() < 70)) {
                do e++, b = b.parent(), a = b.attr("href"); while (d > e && (!a || "" === a));
                if (h) {
                    var i = a.match(h);
                    a = i ? i[1] : null, a && c.push(a)
                } else c.push(a);
                a = null, e = 0
            }
        }), c.join(" ")
    }

    function d() {
        var a = "ARMANI_EXTENSION_POPUP", b = "CS_GALLERY_DISCOUNT_SHOW";
        if (h.fn && h.fn.sendLog && k.isFunction(h.fn.sendLog)) {
            var c = document.createElement("div"), d = "";
            c.setAttribute("params", d), h.fn.sendLog(b, c, a)
        }
    }

    var e = youdao, f = e.jQuery, g = e._, h = e.require_module("youdao.cache"), i = e.require_module("youdao.consts"), j = e.require_module("youdao.code"), k = e.require_module("youdao.util"), l = (e.require_module("youdao.localCapture"), e.reg("cs")), m = this, n = ["jd.com", "amazon.cn", "yhd.com", "newegg.cn", "dangdang.com"], o = h.data && h.data.thisSite && h.data.thisSite.site;
    if ("yihaodian.com" === o && (o = "yhd.com"), "360buy.com" === o && (o = "jd.com"), "newegg.com.cn" === o && (o = "newegg.cn"), -1 !== g.indexOf(n, o)) {
        var p = {
            "jd.com": "http://(?:item|mvd|e|book).jd.com/([0-9]+).html.*",
            "yhd.com": "http://item.yhd.com/item/([0-9]*)",
            "newegg.cn": "http://www.newegg.cn/Product/([^/]*).htm*",
            "dangdang.com": "http://product.dangdang.com/([0-9]*).html.*",
            "amazon.cn": "http://www.amazon.cn/[^/]+/dp/([^/]+).*"
        }, q = {
            url: i.csUrl,
            params: {ids: encodeURIComponent(j.encrypt(c(), 2, !0)), domain: o},
            context: m,
            success: function (a) {
                g.extend(h.data, a), l.send("galleryDiscount_show"), d()
            },
            error: function () {
            }
        };
        e.ajax(q)
    }
}),youdao.define("modules/runtime/request_price_info.js", function (a, b) {
    "use strict";
    function c() {
        d.ajax(J)
    }

    var d = youdao, e = a("modules/runtime/render.js"), f = (d.ns("youdao.modules"), d.require_module("youdao.cache")), g = d.jQuery, h = d._, i = d.require_module("youdao.localCapture"), j = d.require_module("youdao.util"), k = {
        131: "1",
        2621: "2",
        2858: "3",
        158: "4",
        814: "5",
        2490: "6",
        1144: "7",
        1900: "8",
        1830: "9",
        999: "10",
        2016: "11",
        1591: "12",
        2329: "13",
        1: "14",
        3225: "15",
        201: "16",
        1323: "17",
        1454: "18",
        403: "19",
        556: "20",
        1718: "21",
        2652: "22",
        789: "23",
        693: "24",
        3077: "25",
        2996: "26",
        2212: "27",
        299: "28",
        2160: "29",
        2130: "30",
        2878: "31"
    };
    d.mod = d.mod || {};
    var l, m = {}, n = ["www.yihaodian.com", "www.1mall.com"], o = d.require_module("youdao.consts"), p = d.require_module("youdao.code"), q = f.localConf, r = f.conf, s = this, t = ["t=" + r.title.substr(0, 250), "k=lxsx", "d=ls"], u = q.email, v = q.newMsgId, w = q.lastDiscountId, x = p.encrypt(t.join("^&"), 4, !1), y = p.encrypt(o.pageUrl, 2, !0), z = 1900 - y.length;
    if (l = document.domain, x = x.length > z ? x.substr(0, z) : x, m.browser = f.localConf.browser || r.browser, m.version = r.version, m.vendor = f.conf.vendor, m.av = r.apiVersion, m.extensionid = f.localConf.extensionid || "", m.email = u || "", m.pop = w || "", m.k = x, m.nl = !0, -1 !== l.indexOf("yixun.com")) {
        var A = /prid=[0-9]+_([0-9]+)/.exec(document.cookie), B = A && A[1] && k[A[1]] || 0;
        m.rg = B
    }
    if (-1 !== l.indexOf("yhd.com")) {
        var C = document.cookie.match(/provinceId=([0-9]+)/), D = 1;
        C && C[1] && (D = C[1]), m.yhdProvinceId = D
    }
    h.contains(n, l) && (y = p.encrypt(encodeURIComponent(g("[rel=canonical]").attr("href") || location.href), 2, !0)), m.m = y, v && (m.msg = v || "");
    var E, F = document.getElementById("youdaoGWZS_config"), G = "{}";
    F && (E = F.innerHTML.replace(/<[^>]*>/g, ""), G = decodeURIComponent(E));
    var H = JSON.parse(G) || {}, I = H.tuanitem || [];
    I.length > 0 && h.each(I, function (a) {
        var b = location.href, c = new RegExp(a.pattern);
        if (c.test(b)) {
            var d = JSON.parse(a.tag) || {}, e = d.id, f = i.getSelected(e) || {};
            if (f.selected) {
                var g = a.url.replace(/{\$id}/, f.selected);
                m.m = p.encrypt(encodeURIComponent(g), 2, !0)
            }
        }
    });
    var J, K = !1;
    J = "true" == f.localConf.isGray && "maxthon" != f.localConf.browser ? {
        url: o.serUrl,
        params: {
            version: m.version,
            vendor: m.vendor,
            extensionid: m.extensionid,
            browser: m.browser,
            p: y,
            r: p.encrypt(document.referrer, 2, !0)
        },
        context: s,
        success: function (a) {
            f.data = a
        },
        error: function () {
            f.data = {code: "110000"}
        }
    } : {
        url: o.serUrl, params: m, context: s, success: function (b) {
            f.data && f.data.haitao && (b.haitao = {}), f.data = f.data ? g.extend(b, f.data) : b, i.capture(f.data.data, f.data.enableHaitao);
            try {
                document.createElement("canvas").getContext("2d"), f.data.isShowPriceCanvas = !0
            } catch (d) {
                f.data.isShowPriceCanvas = !1
            }
            if (f.data.isShowPriceCanvas) {
                if (f.data && f.data.priceHistoryData) {
                    var h = youdao.cache.data.priceHistoryData.list || {}, k = function (a) {
                        var b = a.length;
                        if (b >= 2) {
                            for (var c = [], d = 0; b--;)c.push(a[d].price), d++;
                            c.sort(function (a, b) {
                                return a > b ? 1 : -1
                            }), f.data.priceHistoryData.priceMax = c.pop(), c.length > 0 && c[0] !== f.data.priceHistoryData.priceMax && (f.data.priceHistoryData.priceMin = c[0])
                        }
                    };
                    k(h);
                    var l = function (a) {
                        var b = i.captureResult || {};
                        if (g.isEmptyObject(b) || "undefined" == typeof youdao.localCapture.captureResult.result || "undefined" == typeof youdao.localCapture.captureResult.result.price)return a;
                        var c = parseFloat(b.result.price.replace(/,/g, "")), d = h.length, e = h[d - 1].price, j = h[d - 1].time, k = d > 1 ? h[d - 2].price : !1;
                        if ("failed" === c)return a;
                        if (isNaN(c) || "" === c)return a;
                        if (c == e)return a;
                        var m = new Date, n = m.getFullYear() + "-" + (m.getMonth() + 1) + "-" + m.getDate(), o = (f.data.priceHistoryData.priceMax, f.data.priceHistoryData.priceMin), p = !1;
                        if (o >= c && (p = !0, c == o ? f.data.priceHistoryTip["short"] = "��ʷ���" : f.data.priceHistoryTip["short"] = "��ʷ�µ�", f.data.priceHistoryTip.style = "lowest"), p || (c == k ? (f.data.priceHistoryTip["short"] = "�۸�ƽ��", f.data.priceHistoryTip.style = "steady") : c > k ? (f.data.priceHistoryTip["short"] = "�۸�����", f.data.priceHistoryTip.style = "rise") : (f.data.priceHistoryTip["short"] = "�۸��½�", f.data.priceHistoryTip.style = "fall")), j == n)h[d - 1].price = c; else {
                            var q = {price: c, time: n};
                            h.push(q)
                        }
                        f.data.priceHistoryData.list = l(f.data.priceHistoryData.list)
                    }
                }
            } else if (f.data && f.data.priceHistory) {
                var l = function (a) {
                    var b = i.captureResult || {};
                    if (g.isEmptyObject(b) || "undefined" == typeof youdao.localCapture.captureResult.result || "undefined" == typeof youdao.localCapture.captureResult.result.price)return a;
                    var c = parseFloat(b.result.price.replace(/,/g, "")), d = parseFloat(parseFloat(a.match(/[0-9.]+(?='\/><\/store>)/g)[0]).toFixed(2)), e = parseFloat(parseFloat(a.match(/[0-9.]+(?='\/><p\skey='[0-9-]+'\svalue='[0-9.]+'\/><\/store>)/g)[0]).toFixed(2));
                    if ("failed" === c)return a;
                    if (isNaN(c) || "" === c)return a;
                    if (c == d)return a;
                    var h = new Date, j = h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate(), k = a.match(/[0-9.]+(?='\smin=')/g)[0], l = a.match(/[0-9.]+(?='\sname=')/g)[0], m = a.match(/[0-9-]+(?='\svalue='[0-9.]+'\/><\/store>)/g), n = !1;
                    if ((c > k || l >= c) && (c > k && (a = a.replace(/[0-9.]+(?='\smin=')/, c)), l >= c && (n = !0, c == l ? f.data.priceHistoryTip["short"] = "��ʷ���" : f.data.priceHistoryTip["short"] = "��ʷ�µ�", f.data.priceHistoryTip.style = "lowest", a = a.replace(/[0-9.]+(?='\sname=')/, c))), n || (c == e ? (f.data.priceHistoryTip["short"] = "�۸�ƽ��", f.data.priceHistoryTip.style = "steady") : c > e ? (f.data.priceHistoryTip["short"] = "�۸�����", f.data.priceHistoryTip.style = "rise") : (f.data.priceHistoryTip["short"] = "�۸��½�", f.data.priceHistoryTip.style = "fall")), m == j)return a.replace(/[0-9.]+(?='\/><\/store>)/, c);
                    var o = "<p key='" + j + "' value='" + c + "'/></store>";
                    return a.replace(/<\/store>/, o)
                };
                f.data.priceHistory = l(f.data.priceHistory), f.data && f.data.priceHistoryOneYear && (f.data.priceHistoryOneYear = l(f.data.priceHistoryOneYear))
            }
            if (e.init(), f.data.shopList) {
                a("modules/runtime/cs.js")
            }
            var m = "http://shared.ydstatic.com/gouwuex/images/extension_3_1/loading.gif", n = '��Ʒ��¼�У����Ժ�<img src="' + m + '">';
            if (f.data.enableHaitao && (n = '�۸���ʷ�����У����Ժ�<img src="' + m + '">'), K && (n = '��Ʒ��δ��¼��<a href="javascript:location.reload();">���ˢ��</a>����'), f.data.data && "110000" == f.data.code && !f.data.priceHistory) {
                var o = '<li id="hui-plugin-reload">' + n + "</li>";
                g("#hui-plugin-logo").after(o), K || (setTimeout(function () {
                    c()
                }, 4e3), K = !0)
            }
            var p = function (a, c) {
                c || (c = "ARMANI_EXTENSION_ACTION"), setTimeout(function () {
                    if (f.fn && f.fn.sendLog && j.isFunction(f.fn.sendLog)) {
                        var d = document.createElement("div"), e = "available=" + (b.thisPrice && b.thisPrice.available);
                        d.setAttribute("params", e), f.fn.sendLog(a, d, c)
                    }
                }, 300)
            };
            p("POPUP_ZHUSHOU_TRIGGER", "ARMANI_EXTENSION_POPUP")
        }, error: function () {
            f.data = {code: "110000"}, e.init()
        }
    }, 2 === f.conf.test && (J.params = {mmurl: o.mmUrl}), 1 === f.conf.test && f.localConf.filename && (J.params = {filename: f.localConf.filename}), d.ajax(J)
}),youdao.define("youdao.js", function (a, b, c) {
    a("modules/runtime/info.js"), a("modules/runtime/metas.js"), a("modules/runtime/log.js"), a("modules/runtime/cssLink.js"), a("modules/runtime/css.js"), a("modules/runtime/hoverHistory.js"), a("modules/runtime/request_price_info.js")
}),youdao.define("./main.js", function (a, b, c) {
    a("modules/common/core.js");
    youdao.mod = youdao.mod || {};
    a("modules/mod_combo/module.js"), a("modules/common/box.js"), a("modules/onceTip/onceTip.js"), a("modules/common/newFeatures.js"), a("modules/common/show_tips.js"), a("modules/jigsaw/jigsaw.js"), a("modules/depriceRemind/depriceRemind.js"), a("modules/incidentallyBuy/incidentallyBuy.js"), a("modules/runtime/galleryDiscount.js"), a("youdao.js")
});