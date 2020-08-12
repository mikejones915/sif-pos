(function(c) {
    var b = function(d, e) {
        this.options = e;
        this.$elementFilestyle = [];
        this.$element = c(d)
    };
    b.prototype = {
        clear: function() {
            this.$element.val("");
            this.$elementFilestyle.find(":text").val("");
            this.$elementFilestyle.find(".badge").remove()
        },
        destroy: function() {
            this.$element.removeAttr("style").removeData("filestyle").val("");
            this.$elementFilestyle.remove()
        },
        disabled: function(d) {
            if (d === true) {
                if (!this.options.disabled) {
                    this.$element.attr("disabled", "true");
                    this.$elementFilestyle.find("label").attr("disabled", "true");
                    this.options.disabled = true
                }
            } else {
                if (d === false) {
                    if (this.options.disabled) {
                        this.$element.removeAttr("disabled");
                        this.$elementFilestyle.find("label").removeAttr("disabled");
                        this.options.disabled = false
                    }
                } else { return this.options.disabled }
            }
        },
        buttonBefore: function(d) {
            if (d === true) {
                if (!this.options.buttonBefore) {
                    this.options.buttonBefore = true;
                    if (this.options.input) {
                        this.$elementFilestyle.remove();
                        this.constructor();
                        this.pushNameFiles()
                    }
                }
            } else {
                if (d === false) {
                    if (this.options.buttonBefore) {
                        this.options.buttonBefore = false;
                        if (this.options.input) {
                            this.$elementFilestyle.remove();
                            this.constructor();
                            this.pushNameFiles()
                        }
                    }
                } else { return this.options.buttonBefore }
            }
        },
        icon: function(d) {
            if (d === true) {
                if (!this.options.icon) {
                    this.options.icon = true;
                    this.$elementFilestyle.find("label").prepend(this.htmlIcon())
                }
            } else {
                if (d === false) {
                    if (this.options.icon) {
                        this.options.icon = false;
                        this.$elementFilestyle.find(".fa").remove()
                    }
                } else { return this.options.icon }
            }
        },
        input: function(e) {
            if (e === true) {
                if (!this.options.input) {
                    this.options.input = true;
                    if (this.options.buttonBefore) { this.$elementFilestyle.append(this.htmlInput()) } else { this.$elementFilestyle.prepend(this.htmlInput()) }
                    this.$elementFilestyle.find(".badge").remove();
                    this.pushNameFiles();
                    this.$elementFilestyle.find(".group-span-filestyle").addClass("input-group-btn")
                }
            } else {
                if (e === false) {
                    if (this.options.input) {
                        this.options.input = false;
                        this.$elementFilestyle.find(":text").remove();
                        var d = this.pushNameFiles();
                        if (d.length > 0 && this.options.badge) { this.$elementFilestyle.find("label").append(' <span class="badge">' + d.length + "</span>") }
                        this.$elementFilestyle.find(".group-span-filestyle").removeClass("input-group-btn")
                    }
                } else { return this.options.input }
            }
        },
        size: function(d) {
            if (d !== undefined) {
                var f = this.$elementFilestyle.find("label"),
                    e = this.$elementFilestyle.find("input");
                f.removeClass("btn-lg btn-sm");
                e.removeClass("input-lg input-sm");
                if (d != "nr") {
                    f.addClass("btn-" + d);
                    e.addClass("input-" + d)
                }
            } else { return this.options.size }
        },
        buttonText: function(d) {
            if (d !== undefined) {
                this.options.buttonText = d;
                this.$elementFilestyle.find("label span").html(this.options.buttonText)
            } else { return this.options.buttonText }
        },
        buttonName: function(d) {
            if (d !== undefined) {
                this.options.buttonName = d;
                this.$elementFilestyle.find("label").attr({ "class": "btn " + this.options.buttonName })
            } else { return this.options.buttonName }
        },
        iconName: function(d) { if (d !== undefined) { this.$elementFilestyle.find(".fa").attr({ "class": ".fa " + this.options.iconName }) } else { return this.options.iconName } },
        htmlIcon: function() { if (this.options.icon) { return '<span class="fa ' + this.options.iconName + '"></span> ' } else { return "" } },
        htmlInput: function() { if (this.options.input) { return '<input type="text" class="form-control ' + (this.options.size == "nr" ? "" : "input-" + this.options.size) + '" disabled> ' } else { return "" } },
        pushNameFiles: function() {
            var d = "",
                f = [];
            if (this.$element[0].files === undefined) { f[0] = { name: this.$element[0] && this.$element[0].value } } else { f = this.$element[0].files }
            for (var e = 0; e < f.length; e++) { d += f[e].name.split("\\").pop() + ", " }
            if (d !== "") { this.$elementFilestyle.find(":text").val(d.replace(/\, $/g, "")) } else { this.$elementFilestyle.find(":text").val("") }
            return f
        },
        constructor: function() {
            var h = this,
                f = "",
                g = h.$element.attr("id"),
                d = [],
                i = "",
                e;
            if (g === "" || !g) {
                g = "filestyle-" + c(".bootstrap-filestyle").length;
                h.$element.attr({ id: g })
            }
            i = '<span class="group-span-filestyle ' + (h.options.input ? "input-group-btn" : "") + '"><label for="' + g + '" class="btn ' + h.options.buttonName + " " + (h.options.size == "nr" ? "" : "btn-" + h.options.size) + '" ' + (h.options.disabled ? 'disabled="true"' : "") + ">" + h.htmlIcon() + h.options.buttonText + "</label></span>";
            f = h.options.buttonBefore ? i + h.htmlInput() : h.htmlInput() + i;
            h.$elementFilestyle = c('<div class="bootstrap-filestyle input-group">' + f + "</div>");
            h.$elementFilestyle.find(".group-span-filestyle").attr("tabindex", "0").keypress(function(j) { if (j.keyCode === 13 || j.charCode === 32) { h.$elementFilestyle.find("label").click(); return false } });
            h.$element.css({ position: "absolute", clip: "rect(0px 0px 0px 0px)" }).attr("tabindex", "-1").after(h.$elementFilestyle);
            if (h.options.disabled) { h.$element.attr("disabled", "true") }
            h.$element.change(function() { var j = h.pushNameFiles(); if (h.options.input == false && h.options.badge) { if (h.$elementFilestyle.find(".badge").length == 0) { h.$elementFilestyle.find("label").append(' <span class="badge">' + j.length + "</span>") } else { if (j.length == 0) { h.$elementFilestyle.find(".badge").remove() } else { h.$elementFilestyle.find(".badge").html(j.length) } } } else { h.$elementFilestyle.find(".badge").remove() } });
            if (window.navigator.userAgent.search(/firefox/i) > -1) { h.$elementFilestyle.find("label").click(function() { h.$element.click(); return false }) }
        }
    };
    var a = c.fn.filestyle;
    c.fn.filestyle = function(e, d) {
        var f = "",
            g = this.each(function() {
                if (c(this).attr("type") === "file") {
                    var j = c(this),
                        h = j.data("filestyle"),
                        i = c.extend({}, c.fn.filestyle.defaults, e, typeof e === "object" && e);
                    if (!h) {
                        j.data("filestyle", (h = new b(this, i)));
                        h.constructor()
                    }
                    if (typeof e === "string") { f = h[e](d) }
                }
            });
        if (typeof f !== undefined) { return f } else { return g }
    };
    c.fn.filestyle.defaults = { buttonText: "Choose file", iconName: "fa-folder-open", buttonName: "btn-default", size: "nr", input: true, badge: true, icon: true, buttonBefore: false, disabled: false };
    c.fn.filestyle.noConflict = function() { c.fn.filestyle = a; return this };
    c(function() {
        c(".filestyle").each(function() {
            var e = c(this),
                d = { input: e.attr("data-input") === "false" ? false : true, icon: e.attr("data-icon") === "false" ? false : true, buttonBefore: e.attr("data-buttonBefore") === "true" ? true : false, disabled: e.attr("data-disabled") === "true" ? true : false, size: e.attr("data-size"), buttonText: e.attr("data-buttonText"), buttonName: e.attr("data-buttonName"), iconName: e.attr("data-iconName"), badge: e.attr("data-badge") === "false" ? false : true };
            e.filestyle(d)
        })
    })
})(window.jQuery);

if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.newbuttons = function() {
    return {
        init: function() {
            var undo = this.button.addFirst('undo', 'Undo');
            var redo = this.button.addAfter('undo', 'redo', 'Redo');
            this.button.addCallback(undo, this.buffer.undo);
            this.button.addCallback(redo, this.buffer.redo);
            this.button.remove('indent');
            this.button.remove('outdent');
            this.button.remove('bold');
            this.button.remove('italic');
            this.button.remove('deleted');
            var dropdown = {};
            dropdown.point1 = { title: 'Bold', func: this.newbuttons.bCallback };
            dropdown.point2 = { title: 'Italic', func: this.newbuttons.iCallback };
            dropdown.point3 = { title: 'Underline', func: this.newbuttons.uCallback };
            dropdown.point4 = { title: 'Deleted', func: this.newbuttons.delCallback };
            var button = this.button.addAfter('formatting', 'style', 'Emphasis');
            this.button.setAwesome('style', 'fa-bars');
            this.button.addDropdown(button, dropdown);
        },
        uCallback: function() { this.inline.format('u'); },
        bCallback: function() { this.inline.format('strong'); },
        iCallback: function() { this.inline.format('em'); },
        delCallback: function() { this.inline.format('del'); }
    };
};

function date(e, t) {
    var n, r, u = this,
        a = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        s = /\\?(.?)/gi,
        o = function(e, t) { return r[e] ? r[e]() : t },
        i = function(e, t) { for (e = String(e); e.length < t;) e = "0" + e; return e };
    return r = {
        d: function() { return i(r.j(), 2) },
        D: function() { return r.l().slice(0, 3) },
        j: function() { return n.getDate() },
        l: function() { return a[r.w()] + "day" },
        N: function() { return r.w() || 7 },
        S: function() {
            var e = r.j(),
                t = e % 10;
            return 3 >= t && 1 == parseInt(e % 100 / 10, 10) && (t = 0), ["st", "nd", "rd"][t - 1] || "th"
        },
        w: function() { return n.getDay() },
        z: function() {
            var e = new Date(r.Y(), r.n() - 1, r.j()),
                t = new Date(r.Y(), 0, 1);
            return Math.round((e - t) / 864e5)
        },
        W: function() {
            var e = new Date(r.Y(), r.n() - 1, r.j() - r.N() + 3),
                t = new Date(e.getFullYear(), 0, 4);
            return i(1 + Math.round((e - t) / 864e5 / 7), 2)
        },
        F: function() { return a[6 + r.n()] },
        m: function() { return i(r.n(), 2) },
        M: function() { return r.F().slice(0, 3) },
        n: function() { return n.getMonth() + 1 },
        t: function() { return new Date(r.Y(), r.n(), 0).getDate() },
        L: function() { var e = r.Y(); return e % 4 === 0 & e % 100 !== 0 | e % 400 === 0 },
        o: function() {
            var e = r.n(),
                t = r.W(),
                n = r.Y();
            return n + (12 === e && 9 > t ? 1 : 1 === e && t > 9 ? -1 : 0)
        },
        Y: function() { return n.getFullYear() },
        y: function() { return r.Y().toString().slice(-2) },
        a: function() { return n.getHours() > 11 ? "pm" : "am" },
        A: function() { return r.a().toUpperCase() },
        B: function() {
            var e = 3600 * n.getUTCHours(),
                t = 60 * n.getUTCMinutes(),
                r = n.getUTCSeconds();
            return i(Math.floor((e + t + r + 3600) / 86.4) % 1e3, 3)
        },
        g: function() { return r.G() % 12 || 12 },
        G: function() { return n.getHours() },
        h: function() { return i(r.g(), 2) },
        H: function() { return i(r.G(), 2) },
        i: function() { return i(n.getMinutes(), 2) },
        s: function() { return i(n.getSeconds(), 2) },
        u: function() { return i(1e3 * n.getMilliseconds(), 6) },
        e: function() { throw "Not supported (see source code of date() for timezone on how to add support)" },
        I: function() {
            var e = new Date(r.Y(), 0),
                t = Date.UTC(r.Y(), 0),
                n = new Date(r.Y(), 6),
                u = Date.UTC(r.Y(), 6);
            return e - t !== n - u ? 1 : 0
        },
        O: function() {
            var e = n.getTimezoneOffset(),
                t = Math.abs(e);
            return (e > 0 ? "-" : "+") + i(100 * Math.floor(t / 60) + t % 60, 4)
        },
        P: function() { var e = r.O(); return e.substr(0, 3) + ":" + e.substr(3, 2) },
        T: function() { return "UTC" },
        Z: function() { return 60 * -n.getTimezoneOffset() },
        c: function() { return "Y-m-d\\TH:i:sP".replace(s, o) },
        r: function() { return "D, d M Y H:i:s O".replace(s, o) },
        U: function() { return n / 1e3 | 0 }
    }, this.date = function(e, t) { return u = this, n = void 0 === t ? new Date : new Date(t instanceof Date ? t : 1e3 * t), e.replace(s, o) }, this.date(e, t)
}

function strtotime(e, t) {
    function n(e, t, n) { var r, u = c[t]; "undefined" != typeof u && (r = u - i.getDay(), 0 === r ? r = 7 * n : r > 0 && "last" === e ? r -= 7 : 0 > r && "next" === e && (r += 7), i.setDate(i.getDate() + r)) }

    function r(e) {
        var t = e.split(" "),
            r = t[0],
            u = t[1].substring(0, 3),
            a = /\d+/.test(r),
            s = "ago" === t[2],
            o = ("last" === r ? -1 : 1) * (s ? -1 : 1);
        if (a && (o *= parseInt(r, 10)), f.hasOwnProperty(u) && !t[1].match(/^mon(day|\.)?$/i)) return i["set" + f[u]](i["get" + f[u]]() + o);
        if ("wee" === u) return i.setDate(i.getDate() + 7 * o);
        if ("next" === r || "last" === r) n(r, u, o);
        else if (!a) return !1;
        return !0
    }
    var u, a, s, o, i, c, f, d, g, D, w, l = !1;
    if (!e) return l;
    if (e = e.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").replace(/[\t\r\n]/g, "").toLowerCase(), a = e.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/), a && a[2] === a[4])
        if (a[1] > 1901) switch (a[2]) {
                case "-":
                    return a[3] > 12 || a[5] > 31 ? l : new Date(a[1], parseInt(a[3], 10) - 1, a[5], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3;
                case ".":
                    return l;
                case "/":
                    return a[3] > 12 || a[5] > 31 ? l : new Date(a[1], parseInt(a[3], 10) - 1, a[5], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3
            } else if (a[5] > 1901) switch (a[2]) {
                case "-":
                    return a[3] > 12 || a[1] > 31 ? l : new Date(a[5], parseInt(a[3], 10) - 1, a[1], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3;
                case ".":
                    return a[3] > 12 || a[1] > 31 ? l : new Date(a[5], parseInt(a[3], 10) - 1, a[1], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3;
                case "/":
                    return a[1] > 12 || a[3] > 31 ? l : new Date(a[5], parseInt(a[1], 10) - 1, a[3], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3
            } else switch (a[2]) {
                case "-":
                    return a[3] > 12 || a[5] > 31 || a[1] < 70 && a[1] > 38 ? l : (o = a[1] >= 0 && a[1] <= 38 ? +a[1] + 2e3 : a[1], new Date(o, parseInt(a[3], 10) - 1, a[5], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3);
                case ".":
                    return a[5] >= 70 ? a[3] > 12 || a[1] > 31 ? l : new Date(a[5], parseInt(a[3], 10) - 1, a[1], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3 : a[5] < 60 && !a[6] ? a[1] > 23 || a[3] > 59 ? l : (s = new Date, new Date(s.getFullYear(), s.getMonth(), s.getDate(), a[1] || 0, a[3] || 0, a[5] || 0, a[9] || 0) / 1e3) : l;
                case "/":
                    return a[1] > 12 || a[3] > 31 || a[5] < 70 && a[5] > 38 ? l : (o = a[5] >= 0 && a[5] <= 38 ? +a[5] + 2e3 : a[5], new Date(o, parseInt(a[1], 10) - 1, a[3], a[6] || 0, a[7] || 0, a[8] || 0, a[9] || 0) / 1e3);
                case ":":
                    return a[1] > 23 || a[3] > 59 || a[5] > 59 ? l : (s = new Date, new Date(s.getFullYear(), s.getMonth(), s.getDate(), a[1] || 0, a[3] || 0, a[5] || 0) / 1e3)
            }
    if ("now" === e) return null === t || isNaN(t) ? (new Date).getTime() / 1e3 | 0 : 0 | t;
    if (!isNaN(u = Date.parse(e))) return u / 1e3 | 0;
    if (i = t ? new Date(1e3 * t) : new Date, c = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }, f = { yea: "FullYear", mon: "Month", day: "Date", hou: "Hours", min: "Minutes", sec: "Seconds" }, g = "(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)", D = "([+-]?\\d+\\s" + g + "|(last|next)\\s" + g + ")(\\sago)?", a = e.match(new RegExp(D, "gi")), !a) return l;
    for (w = 0, d = a.length; d > w; w++)
        if (!r(a[w])) return l;
    return i.getTime() / 1e3
}

/*Bootstrap Datatables */
$.extend(true, $.fn.dataTable.defaults, {
    sDom: "<'col-xs-6 text-left'l><'col-xs-6 text-right'f>r<'col-xs-12't><'col-xs-6 text-left'i><'col-xs-6 text-right'p>",
    sPaginationType: "bootstrap",
    "fnDrawCallback": function() {
        $(".tip").tooltip({ html: true });
        $(".popnote").popover();
        $("input").addClass('form-control input-xs');
        $("select").addClass('form-control input-xs').select2({ minimumResultsForSearch: 6 });
    }
});
$.extend($.fn.dataTableExt.oStdClasses, { sWrapper: "dataTables_wrapper form-inline" });
$.fn.dataTableExt.oApi.fnPagingInfo = function(a) { return { iStart: a._iDisplayStart, iEnd: a.fnDisplayEnd(), iLength: a._iDisplayLength, iTotal: a.fnRecordsTotal(), iFilteredTotal: a.fnRecordsDisplay(), iPage: a._iDisplayLength === -1 ? 0 : Math.ceil(a._iDisplayStart / a._iDisplayLength), iTotalPages: a._iDisplayLength === -1 ? 0 : Math.ceil(a.fnRecordsDisplay() / a._iDisplayLength) } };
$.extend($.fn.dataTableExt.oPagination, {
    bootstrap: {
        fnInit: function(e, b, d) {
            var a = e.oLanguage.oPaginate;
            var f = function(g) { g.preventDefault(); if (e.oApi._fnPageChange(e, g.data.action)) { d(e) } };
            $(b).append('<ul class="pagination pagination-sm" style="margin-top:0;"><li class="prev disabled"><a href="#"> ' + a.sPrevious + '</a></li><li class="next disabled"><a href="#">' + a.sNext + " </a></li></ul>");
            var c = $("a", b);
            $(c[0]).bind("click.DT", { action: "previous" }, f);
            $(c[1]).bind("click.DT", { action: "next" }, f)
        },
        fnUpdate: function(c, k) {
            var l = 5;
            var e = c.oInstance.fnPagingInfo();
            var h = c.aanFeatures.p;
            var g, m, f, d, a, n, b = Math.floor(l / 2);
            if (e.iTotalPages < l) {
                a = 1;
                n = e.iTotalPages
            } else {
                if (e.iPage <= b) {
                    a = 1;
                    n = l
                } else {
                    if (e.iPage >= (e.iTotalPages - b)) {
                        a = e.iTotalPages - l + 1;
                        n = e.iTotalPages
                    } else {
                        a = e.iPage - b + 1;
                        n = a + l - 1
                    }
                }
            }
            for (g = 0, m = h.length; g < m; g++) {
                $("li:gt(0)", h[g]).filter(":not(:last)").remove();
                for (f = a; f <= n; f++) {
                    d = (f == e.iPage + 1) ? 'class="active"' : "";
                    $("<li " + d + '><a href="#">' + f + "</a></li>").insertBefore($("li:last", h[g])[0]).bind("click", function(i) {
                        i.preventDefault();
                        c._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * e.iLength;
                        k(c)
                    })
                }
                if (e.iPage === 0) { $("li:first", h[g]).addClass("disabled") } else { $("li:first", h[g]).removeClass("disabled") }
                if (e.iPage === e.iTotalPages - 1 || e.iTotalPages === 0) { $("li:last", h[g]).addClass("disabled") } else { $("li:last", h[g]).removeClass("disabled") }
            }
        }
    }
});
if ($.fn.DataTable.TableTools) {
    $.extend(true, $.fn.DataTable.TableTools.classes, { container: "btn-group", buttons: { normal: "btn btn-sm btn-primary", disabled: "disabled" }, collection: { container: "DTTT_dropdown dropdown-menu", buttons: { normal: "", disabled: "disabled" } }, print: { info: "DTTT_print_info modal" }, select: { row: "active" } });
    $.extend(true, $.fn.DataTable.TableTools.DEFAULTS.oTags, { collection: { container: "ul", button: "li", liner: "a" } })
};

/*!
 jQuery UI Virtual Keyboard
 Version 1.18.12 minified (MIT License)
 Caret code modified from jquery.caret.1.02.js (MIT License)
 */
;
(function(e) {
    e.keyboard = function(b, l) {
        var a = this,
            d;
        a.version = "1.18.12";
        a.$el = e(b);
        a.el = b;
        a.$el.data("keyboard", a);
        a.init = function() {
            a.options = d = e.extend(!0, {}, e.keyboard.defaultOptions, l);
            a.shiftActive = a.altActive = a.metaActive = a.sets = a.capsLock = !1;
            a.lastKeyset = [!1, !1, !1];
            a.rows = ["", "-shift", "-alt", "-alt-shift"];
            e('\x3c!--[if lte IE 8]><script>jQuery("body").addClass("oldie");\x3c/script><![endif]--\x3e\x3c!--[if IE]><script>jQuery("body").addClass("ie");\x3c/script><![endif]--\x3e').appendTo("body").remove();
            a.msie = e("body").hasClass("oldie");
            a.allie = e("body").hasClass("ie");
            a.inPlaceholder = a.$el.attr("placeholder") || "";
            a.watermark = "undefined" !== typeof document.createElement("input").placeholder && "" !== a.inPlaceholder;
            a.regex = e.keyboard.comboRegex;
            a.decimal = /^\./.test(d.display.dec) ? !0 : !1;
            a.repeatTime = 1E3 / (d.repeatRate || 20);
            d.preventDoubleEventTime = d.preventDoubleEventTime || 100;
            a.isOpen = !1;
            a.wheel = e.isFunction(e.fn.mousewheel);
            a.alwaysAllowed = [20, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];
            a.$keyboard = [];
            a.temp = e('<input style="position:absolute;left:-9999em;top:-9999em;" type="text" value="testing">').appendTo("body").caret(3, 3);
            a.checkCaret = d.lockInput || 3 !== a.temp.hide().show().caret().start ? !0 : !1;
            a.temp.remove();
            a.lastCaret = { start: 0, end: 0 };
            a.temp = ["", 0, 0];
            e.each("initialized beforeVisible visible hidden canceled accepted beforeClose".split(" "), function(k, c) { e.isFunction(d[c]) && a.$el.bind(c + ".keyboard", d[c]) });
            d.alwaysOpen && (d.stayOpen = !0);
            e(document).bind(["mousedown", "keyup", "touchstart", "checkkeyboard", ""].join(".keyboard "), function(d) { a.opening || (a.escClose(d), d.target && e(d.target).hasClass("ui-keyboard-input") && (d = e(d.target).data("keyboard"), d === a && d.options.openOn && d.focusOn())) });
            a.$el.addClass("ui-keyboard-input " + d.css.input).attr({ "aria-haspopup": "true", role: "textbox" });
            (a.$el.is(":disabled") || a.$el.attr("readonly") && !a.$el.hasClass("ui-keyboard-lockedinput")) && a.$el.addClass("ui-keyboard-nokeyboard");
            d.openOn && a.$el.bind(d.openOn + ".keyboard", function() { a.focusOn() });
            a.watermark || "" !== a.$el.val() || "" === a.inPlaceholder || "" === a.$el.attr("placeholder") || a.$el.addClass("ui-keyboard-placeholder").val(a.inPlaceholder);
            a.$el.trigger("initialized.keyboard", [a, a.el]);
            d.alwaysOpen && a.reveal()
        };
        a.setCurrent = function() {
            e(".ui-keyboard-has-focus").removeClass("ui-keyboard-has-focus");
            e(".ui-keyboard-input-current").removeClass("ui-keyboard-input-current");
            a.$el.addClass("ui-keyboard-input-current");
            a.$keyboard.addClass("ui-keyboard-has-focus");
            a.isCurrent(!0);
            a.isOpen = !0
        };
        a.isCurrent = function(d) {
            var c = e.keyboard.currentKeyboard || !1;
            d ? c = e.keyboard.currentKeyboard = a.el : !1 === d && c === a.el && (c = e.keyboard.currentKeyboard = "");
            return c === a.el
        };
        a.isVisible = function() { return a.$keyboard && a.$keyboard.length ? a.$keyboard.is(":visible") : !1 };
        a.focusOn = function() {
            a.$el.is(":visible") && setTimeout(function() { "number" != a.$el.attr("type") && (a.lastCaret = a.$el.caret()) }, 20);
            a.isVisible() || (clearTimeout(a.timer), a.reveal());
            d.alwaysOpen && a.setCurrent()
        };
        a.reveal = function() {
            var k;
            a.opening = !0;
            e(".ui-keyboard").not(".ui-keyboard-always-open").remove();
            if (a.$el.is(":disabled") || a.$el.attr("readonly") && !a.$el.hasClass("ui-keyboard-lockedinput")) a.$el.addClass("ui-keyboard-nokeyboard");
            else return a.$el.removeClass("ui-keyboard-nokeyboard"), d.openOn && a.$el.unbind(d.openOn + ".keyboard"), a.$keyboard && (!a.$keyboard || a.$keyboard.length && !e.contains(document.body, a.$keyboard[0])) || a.startup(), a.watermark || a.el.value !== a.inPlaceholder || a.$el.removeClass("ui-keyboard-placeholder").val(""), a.originalContent = a.$el.val(), a.$preview.val(a.originalContent), d.acceptValid && a.checkValid(), d.resetDefault && (a.shiftActive = a.altActive = a.metaActive = !1, a.showKeySet()), d.appendLocally || "body" !== d.appendTo || a.$keyboard.css({ position: "absolute", left: 0, top: 0 }), a.$el.trigger("beforeVisible.keyboard", [a, a.el]), a.setCurrent(), a.$keyboard.show(), d.usePreview && a.msie && ("undefined" === typeof a.width && (a.$preview.hide(), a.width = Math.ceil(a.$keyboard.width()), a.$preview.show()), a.$preview.width(a.width)), a.position = d.position, e.ui && e.ui.position && !e.isEmptyObject(a.position) && (a.position.of = a.position.of || a.$el.data("keyboardPosition") || a.$el, a.position.collision = a.position.collision || "flipfit flipfit", a.$keyboard.position(a.position)), a.checkDecimal(), a.lineHeight = parseInt(a.$preview.css("lineHeight"), 10) || parseInt(a.$preview.css("font-size"), 10) + 4, d.caretToEnd && (k = a.originalContent.length, a.lastCaret = { start: k, end: k }), a.allie && (k = a.lastCaret.start || a.originalContent.length, k = { start: k, end: k }, a.lastCaret || (a.lastCaret = k), 0 === a.lastCaret.end && 0 < a.lastCaret.start && (a.lastCaret.end = a.lastCaret.start), 0 > a.lastCaret.start && (a.lastCaret = k)), setTimeout(function() {
                a.opening = !1;
                d.initialFocus && a.$preview.focus().caret(a.lastCaret);
                a.$el.trigger("visible.keyboard", [a, a.el])
            }, 10), a
        };
        a.startup = function() {
            a.$keyboard && a.$keyboard.length || ("custom" === d.layout && (d.layoutHash = "custom" + a.customHash()), a.layout = "custom" === d.layout ? d.layoutHash : d.layout, "undefined" === typeof e.keyboard.builtLayouts[a.layout] && (e.isFunction(d.create) && d.create(a), a.$keyboard.length || a.buildKeyboard()), a.$keyboard = e.keyboard.builtLayouts[a.layout].$keyboard.clone(), d.usePreview ? (a.$preview = a.$el.clone(!1).removeAttr("id").removeClass("ui-keyboard-placeholder ui-keyboard-input").addClass("ui-keyboard-preview " + d.css.input).removeAttr("aria-haspopup").attr("tabindex", "-1").show(), "number" == a.$preview.attr("type") && a.$preview.attr("type", "text"), e("<div />").addClass("ui-keyboard-preview-wrapper").append(a.$preview).prependTo(a.$keyboard)) : (a.$preview = a.$el, e.isEmptyObject(a.position) || (d.position.at = d.position.at2)));
            a.preview = a.$preview[0];
            a.$decBtn = a.$keyboard.find(".ui-keyboard-dec");
            (d.enterNavigation || "TEXTAREA" === a.el.tagName) && a.alwaysAllowed.push(13);
            d.lockInput && a.$preview.addClass("ui-keyboard-lockedinput").attr({ readonly: "readonly" });
            a.bindKeyboard();
            a.$keyboard.appendTo(d.appendLocally ? a.$el.parent() : d.appendTo || "body");
            a.bindKeys();
            e.ui && e.ui.position && !e.isEmptyObject(a.position) && e(window).bind("resize.keyboard", function() { a.isVisible() && a.$keyboard.position(a.position) })
        };
        a.bindKeyboard = function() {
            var k = e.keyboard.builtLayouts[a.layout];
            a.$preview.unbind("keypress keyup keydown mouseup touchend ".split(" ").join(".keyboard ")).bind("keypress.keyboard", function(c) {
                var g = a.lastKey = String.fromCharCode(c.charCode || c.which);
                a.$lastKey = [];
                a.checkCaret && (a.lastCaret = a.$preview.caret());
                a.capsLock = 65 <= g && 90 >= g && !c.shiftKey || 97 <= g && 122 >= g && c.shiftKey ? !0 : !1;
                if (d.restrictInput) { if ((8 === c.which || 0 === c.which) && e.inArray(c.keyCode, a.alwaysAllowed)) return; - 1 === e.inArray(g, k.acceptedKeys) && c.preventDefault() } else if ((c.ctrlKey || c.metaKey) && (97 === c.which || 99 === c.which || 118 === c.which || 120 <= c.which && 122 >= c.which)) return;
                k.hasMappedKeys && k.mappedKeys.hasOwnProperty(g) && (a.lastKey = k.mappedKeys[g], a.insertText(a.lastKey), c.preventDefault());
                a.checkMaxLength()
            }).bind("keyup.keyboard", function(c) {
                switch (c.which) {
                    case 9:
                        if (a.tab && d.tabNavigation && !d.lockInput) { if (a.shiftActive = c.shiftKey, c = e.keyboard.keyaction.tab(a), a.tab = !1, !c) return !1 } else c.preventDefault();
                        break;
                    case 27:
                        return a.close(), !1
                }
                clearTimeout(a.throttled);
                a.throttled = setTimeout(function() { a.isVisible() && a.checkCombos() }, 100);
                a.checkMaxLength();
                e.isFunction(d.change) && d.change(e.Event("change"), a, a.el);
                a.$el.trigger("change.keyboard", [a, a.el])
            }).bind("keydown.keyboard", function(c) {
                switch (c.which) {
                    case 8:
                        e.keyboard.keyaction.bksp(a, null, c);
                        c.preventDefault();
                        break;
                    case 9:
                        return a.tab = !0, !1;
                    case 13:
                        e.keyboard.keyaction.enter(a, null, c);
                        break;
                    case 20:
                        a.shiftActive = a.capsLock = !a.capsLock;
                        a.showKeySet(this);
                        break;
                    case 86:
                        if (c.ctrlKey || c.metaKey) {
                            if (d.preventPaste) { c.preventDefault(); break }
                            a.checkCombos()
                        }
                }
            }).bind("mouseup.keyboard touchend.keyboard", function() { a.checkCaret && (a.lastCaret = a.$preview.caret()) });
            a.$keyboard.bind("mousedown.keyboard click.keyboard touchstart.keyboard", function(c) {
                c.stopPropagation();
                a.isCurrent() || (a.reveal(), e(document).trigger("checkkeyboard.keyboard"))
            });
            d.preventPaste && (a.$preview.bind("contextmenu.keyboard", function(a) { a.preventDefault() }), a.$el.bind("contextmenu.keyboard", function(a) { a.preventDefault() }))
        };
        a.bindKeys = function() {
            var k = (d.keyBinding + " repeater mouseenter mouseleave touchstart mousewheel mouseup click ").split(" ").join(".keyboard ") + "mouseleave.kb mousedown.kb touchstart.kb touchend.kb touchmove.kb touchcancel.kb ";
            a.$allKeys = a.$keyboard.find("button.ui-keyboard-button").unbind(k).bind(d.keyBinding.split(" ").join(".keyboard ") + ".keyboard repeater.keyboard", function(c) {
                if (!a.$keyboard.is(":visible")) return !1;
                var g;
                g = e(this);
                var k = g.attr("data-action"),
                    b = (new Date).getTime(),
                    k = ":" === k ? ":" : k.split(":")[0];
                if (!(b - (a.lastEventTime || 0) < d.preventDoubleEventTime)) {
                    a.lastEventTime = b;
                    a.$preview.focus();
                    a.$lastKey = g;
                    a.lastKey = g.attr("data-curtxt");
                    a.checkCaret && a.$preview.caret(a.lastCaret);
                    k.match("meta") && (k = "meta");
                    if (e.keyboard.keyaction.hasOwnProperty(k) && e(this).hasClass("ui-keyboard-actionkey")) { if (!1 === e.keyboard.keyaction[k](a, this, c)) return !1 } else "undefined" !== typeof k && (g = a.lastKey = a.wheel && !e(this).hasClass("ui-keyboard-actionkey") ? a.lastKey : k, a.insertText(g), a.capsLock || d.stickyShift || c.shiftKey || (a.shiftActive = !1, a.showKeySet(this)));
                    a.$preview.focus().caret(a.lastCaret);
                    a.checkCombos();
                    a.checkMaxLength();
                    e.isFunction(d.change) && d.change(e.Event("change"), a, a.el);
                    a.$el.trigger("change.keyboard", [a, a.el]);
                    c.preventDefault()
                }
            }).bind("mouseenter.keyboard mouseleave.keyboard touchstart.keyboard", function(c) {
                if (a.isCurrent()) {
                    var k = e(this),
                        b = k.data("layers") || a.getLayers(k);
                    k.data("layers", b = e.grep(b, function(a, c) { return e.inArray(a, b) === c }));
                    "mouseenter" !== c.type && "touchstart" !== c.type || "password" === a.el.type || k.hasClass(d.css.buttonDisabled) || k.addClass(d.css.buttonHover).attr("title", function(k, e) { return a.wheel && "" === e && a.sets && 1 < b.length && "touchstart" !== c.type ? d.wheelMessage : e });
                    "mouseleave" === c.type && (k.data({ curtxt: k.data("original"), curnum: 0 }), k.removeClass("password" === a.el.type ? "" : d.css.buttonHover).attr("title", function(a, c) { return c === d.wheelMessage ? "" : c }).find("span").html(k.data("original")))
                }
            }).bind("mousewheel.keyboard", function(c, d) {
                if (a.wheel) {
                    d = d || c.deltaY;
                    var k, b, f = e(this);
                    b = f.data("layers") || a.getLayers(f);
                    1 < b.length ? (k = f.data("curnum") + (0 < d ? -1 : 1), k > b.length - 1 && (k = 0), 0 > k && (k = b.length - 1)) : k = 0;
                    f.data({ curnum: k, layers: b, curtxt: b[k] });
                    f.find("span").html(b[k]);
                    return !1
                }
            }).bind("mouseup.keyboard mouseleave.kb touchend.kb touchmove.kb touchcancel.kb", function(c) {
                /(mouseleave|touchend|touchcancel)/.test(c.type) ? e(this).removeClass(d.css.buttonHover) : (a.isVisible() && a.isCurrent() && a.$preview.focus(), a.checkCaret && a.$preview.caret(a.lastCaret));
                a.mouseRepeat = [!1, ""];
                clearTimeout(a.repeater);
                return !1
            }).bind("click.keyboard", function() { return !1 }).not(".ui-keyboard-actionkey").add(".ui-keyboard-tab, .ui-keyboard-bksp, .ui-keyboard-space, .ui-keyboard-enter", a.$keyboard).bind("mousedown.kb touchstart.kb", function() {
                if (0 !== d.repeatRate) {
                    var c = e(this);
                    a.mouseRepeat = [!0, c];
                    setTimeout(function() { a.mouseRepeat[0] && a.mouseRepeat[1] === c && a.repeatKey(c) }, d.repeatDelay)
                }
                return !1
            })
        };
        a.insertText = function(d) {
            var c, b;
            b = a.$preview.val();
            var e = a.$preview.caret(),
                h = a.$preview.scrollLeft();
            c = a.$preview.scrollTop();
            var f = b.length;
            e.end < e.start && (e.end = e.start);
            e.start > f && (e.end = e.start = f);
            "TEXTAREA" === a.preview.tagName && (a.msie && "\n" === b.substr(e.start, 1) && (e.start += 1, e.end += 1), b = b.split("\n").length - 1, a.preview.scrollTop = 0 < b ? a.lineHeight * b : c);
            c = "bksp" === d && e.start === e.end ? !0 : !1;
            d = "bksp" === d ? "" : d;
            b = e.start + (c ? -1 : d.length);
            h += parseInt(a.$preview.css("fontSize"), 10) * ("bksp" === d ? -1 : 1);
            a.$preview.val(a.$preview.val().substr(0, e.start - (c ? 1 : 0)) + d + a.$preview.val().substr(e.end)).scrollLeft(h).caret(b, b);
            a.lastCaret = { start: b, end: b }
        };
        a.checkMaxLength = function() {
            var k, c = a.$preview.val();
            !1 !== d.maxLength && c.length > d.maxLength && (k = Math.min(a.$preview.caret().start, d.maxLength), a.$preview.val(c.substring(0, d.maxLength)), a.$preview.caret(k, k), a.lastCaret = { start: k, end: k });
            a.$decBtn.length && a.checkDecimal()
        };
        a.repeatKey = function(d) {
            d.trigger("repeater.keyboard");
            a.mouseRepeat[0] && (a.repeater = setTimeout(function() { a.repeatKey(d) }, a.repeatTime))
        };
        a.showKeySet = function(b) {
            var c = "",
                e = (a.shiftActive ? 1 : 0) + (a.altActive ? 2 : 0);
            a.shiftActive || (a.capsLock = !1);
            if (a.metaActive) { if (c = b && b.name && /meta/.test(b.name) ? b.name : "", "" === c ? c = !0 === a.metaActive ? "" : a.metaActive : a.metaActive = c, !d.stickyShift && a.lastKeyset[2] !== a.metaActive || (a.shiftActive || a.altActive) && !a.$keyboard.find(".ui-keyboard-keyset-" + c + a.rows[e]).length) a.shiftActive = a.altActive = !1 } else !d.stickyShift && a.lastKeyset[2] !== a.metaActive && a.shiftActive && (a.shiftActive = a.altActive = !1);
            e = (a.shiftActive ? 1 : 0) + (a.altActive ? 2 : 0);
            c = 0 !== e || a.metaActive ? "" === c ? "" : "-" + c : "-default";
            a.$keyboard.find(".ui-keyboard-keyset" + c + a.rows[e]).length ? (a.$keyboard.find(".ui-keyboard-alt, .ui-keyboard-shift, .ui-keyboard-actionkey[class*=meta]").removeClass(d.css.buttonAction).end().find(".ui-keyboard-alt")[a.altActive ? "addClass" : "removeClass"](d.css.buttonAction).end().find(".ui-keyboard-shift")[a.shiftActive ? "addClass" : "removeClass"](d.css.buttonAction).end().find(".ui-keyboard-lock")[a.capsLock ? "addClass" : "removeClass"](d.css.buttonAction).end().find(".ui-keyboard-keyset").hide().end().find(".ui-keyboard-keyset" + c + a.rows[e]).show().end().find(".ui-keyboard-actionkey.ui-keyboard" + c).addClass(d.css.buttonAction), a.lastKeyset = [a.shiftActive, a.altActive, a.metaActive]) : (a.shiftActive = a.lastKeyset[0], a.altActive = a.lastKeyset[1], a.metaActive = a.lastKeyset[2])
        };
        a.checkCombos = function() {
            if (!a.isVisible()) return a.$preview.val();
            var b, c, g, n, h = a.$preview.val(),
                f = a.$preview.caret(),
                l = e.keyboard.builtLayouts[a.layout],
                p = h.length;
            f.end < f.start && (f.end = f.start);
            f.start > p && (f.end = f.start = p);
            a.msie && "\n" === h.substr(f.start, 1) && (f.start += 1, f.end += 1);
            d.useCombos && (a.msie ? h = h.replace(a.regex, function(a, c, b) { return d.combos.hasOwnProperty(c) ? d.combos[c][b] || a : a }) : a.$preview.length && (g = f.start - (0 <= f.start - 2 ? 2 : 0), a.$preview.caret(g, f.end), n = (a.$preview.caret().text || "").replace(a.regex, function(a, c, b) { return d.combos.hasOwnProperty(c) ? d.combos[c][b] || a : a }), a.$preview.val(a.$preview.caret().replace(n)), h = a.$preview.val()));
            if (d.restrictInput && "" !== h) {
                g = h;
                c = l.acceptedKeys.length;
                for (b = 0; b < c; b++) "" !== g && (n = l.acceptedKeys[b], 0 <= h.indexOf(n) && (/[\[|\]|\\|\^|\$|\.|\||\?|\*|\+|\(|\)|\{|\}]/g.test(n) && (n = "\\" + n), g = g.replace(new RegExp(n, "g"), "")));
                "" !== g && (h = h.replace(g, ""))
            }
            f.start += h.length - p;
            f.end += h.length - p;
            a.$preview.val(h);
            a.$preview.caret(f.start, f.end);
            a.preview.scrollTop = a.lineHeight * (h.substring(0, f.start).split("\n").length - 1);
            a.lastCaret = { start: f.start, end: f.end };
            d.acceptValid && a.checkValid();
            return h
        };
        a.checkValid = function() {
            var b = !0;
            d.validate && "function" === typeof d.validate && (b = d.validate(a, a.$preview.val(), !1));
            a.$keyboard.find(".ui-keyboard-accept")[b ? "removeClass" : "addClass"]("ui-keyboard-invalid-input")[b ? "addClass" : "removeClass"]("ui-keyboard-valid-input")
        };
        a.checkDecimal = function() { a.decimal && /\./g.test(a.preview.value) || !a.decimal && /\,/g.test(a.preview.value) ? a.$decBtn.attr({ disabled: "disabled", "aria-disabled": "true" }).removeClass(d.css.buttonDefault + " " + d.css.buttonHover).addClass(d.css.buttonDisabled) : a.$decBtn.removeAttr("disabled").attr({ "aria-disabled": "false" }).addClass(d.css.buttonDefault).removeClass(d.css.buttonDisabled) };
        a.getLayers = function(a) {
            var c;
            c = a.attr("data-pos");
            return a.closest(".ui-keyboard").find('button[data-pos="' + c + '"]').map(function() { return e(this).find("> span").html() }).get()
        };
        a.switchInput = function(b, c) {
            if ("function" === typeof d.switchInput) d.switchInput(a, b, c);
            else {
                a.$keyboard.hide();
                var g;
                g = !1;
                var l = e("button, input, textarea, a").filter(":visible"),
                    h = l.index(a.$el) + (b ? 1 : -1);
                a.$keyboard.show();
                h > l.length - 1 && (g = d.stopAtEnd, h = 0);
                0 > h && (g = d.stopAtEnd, h = l.length - 1);
                if (!g) {
                    c = a.close(c);
                    if (!c) return;
                    (g = l.eq(h).data("keyboard")) && g.options.openOn.length ? g.focusOn() : l.eq(h).focus()
                }
            }
            return !1
        };
        a.close = function(b) {
            if (a.isOpen) {
                clearTimeout(a.throttled);
                var c = b ? a.checkCombos() : a.originalContent;
                if (b && d.validate && "function" === typeof d.validate && !d.validate(a, c, !0) && (c = a.originalContent, b = !1, d.cancelClose)) return;
                a.isCurrent(!1);
                a.isOpen = !1;
                a.$preview.val(c);
                a.$el.removeClass("ui-keyboard-input-current ui-keyboard-autoaccepted").addClass(b ? !0 === b ? "" : "ui-keyboard-autoaccepted" : "").trigger(d.alwaysOpen ? "" : "beforeClose.keyboard", [a, a.el, b || !1]).val(c).scrollTop(a.el.scrollHeight).trigger(b ? "accepted.keyboard" : "canceled.keyboard", [a, a.el]).trigger(d.alwaysOpen ? "inactive.keyboard" : "hidden.keyboard", [a, a.el]).blur();
                d.openOn && (a.timer = setTimeout(function() {
                    a.$el.bind(d.openOn + ".keyboard", function() { a.focusOn() });
                    e(":focus")[0] === a.el && a.$el.blur()
                }, 500));
                !d.alwaysOpen && a.$keyboard && (a.$keyboard.remove(), a.$keyboard = []);
                a.watermark || "" !== a.el.value || "" === a.inPlaceholder || a.$el.addClass("ui-keyboard-placeholder").val(a.inPlaceholder);
                a.$el.trigger("change")
            }
            return !!b
        };
        a.accept = function() { return a.close(!0) };
        a.escClose = function(b) {
            if (b && "keyup" === b.type) return 27 === b.which ? a.close() : "";
            a.isOpen && (!a.isCurrent() && a.isOpen || a.isOpen && b.target !== a.el && !d.stayOpen) && (a.allie && b.preventDefault(), a.close(d.autoAccept ? "true" : !1))
        };
        a.keyBtn = e("<button />").attr({ role: "button", type: "button", "aria-disabled": "false", tabindex: "-1" }).addClass("ui-keyboard-button");
        a.addKey = function(b, c, g) {
            var l, h, f;
            c = !0 === g ? b : d.display[c] || b;
            var m = !0 === g ? b.charCodeAt(0) : b;
            /\(.+\)/.test(c) && (h = c.replace(/\(([^()]+)\)/, ""), l = c.match(/\(([^()]+)\)/)[1], c = h, f = h.split(":"), h = "" !== f[0] && 1 < f.length ? f[0] : h, e.keyboard.builtLayouts[a.layout].mappedKeys[l] = h);
            f = c.split(":");
            "" === f[0] && "" === f[1] && (c = ":");
            c = "" !== f[0] && 1 < f.length ? e.trim(f[0]) : c;
            l = 1 < f.length ? e.trim(f[1]).replace(/_/g, " ") || "" : "";
            h = 1 < c.length ? " ui-keyboard-widekey" : "";
            h += g ? "" : " ui-keyboard-actionkey";
            return a.keyBtn.clone().attr({ "data-value": c, name: m, "data-pos": a.temp[1] + "," + a.temp[2], title: l, "data-action": b, "data-original": c, "data-curtxt": c, "data-curnum": 0 }).addClass(("" === m ? "" : "ui-keyboard-" + m + h + " ") + d.css.buttonDefault).html("<span>" + c + "</span>").appendTo(a.temp[0])
        };
        a.customHash = function() {
            var a, c, b, e;
            c = d.customLayout;
            b = [];
            var h = [];
            for (a in c) c.hasOwnProperty(a) && b.push(c[a]);
            h = h.concat.apply(h, b).join(" ");
            c = 0;
            e = h.length;
            if (0 === e) return c;
            for (a = 0; a < e; a++) b = h.charCodeAt(a), c = (c << 5) - c + b, c &= c;
            return c
        };
        a.buildKeyboard = function() {
            var b, c, g, l, h, f, m, p, q, s = 0,
                r = e.keyboard.builtLayouts[a.layout] = { mappedKeys: {}, acceptedKeys: [] },
                t = r.acceptedKeys = [],
                u = e("<div />").addClass("ui-keyboard " + d.css.container + (d.alwaysOpen ? " ui-keyboard-always-open" : "")).attr({ role: "textbox" }).hide();
            "custom" !== d.layout && e.keyboard.layouts.hasOwnProperty(d.layout) || (d.layout = "custom", e.keyboard.layouts.custom = d.customLayout || { "default": ["{cancel}"] });
            e.each(e.keyboard.layouts[d.layout], function(r, v) {
                if ("" !== r)
                    for (s++, l = e("<div />").attr("name", r).addClass("ui-keyboard-keyset ui-keyboard-keyset-" + r).appendTo(u)["default" === r ? "show" : "hide"](), g = 0; g < v.length; g++) {
                        f = e.trim(v[g]).replace(/\{(\.?)[\s+]?:[\s+]?(\.?)\}/g, "{$1:$2}");
                        p = f.split(/\s+/);
                        for (m = 0; m < p.length; m++)
                            if (a.temp = [l, g, m], h = !1, 0 !== p[m].length)
                                if (/^\{\S+\}$/.test(p[m]))
                                    if (c = p[m].match(/^\{(\S+)\}$/)[1].toLowerCase(), /\!\!/.test(c) && (c = c.replace("!!", ""), h = !0), /^sp:((\d+)?([\.|,]\d+)?)(em|px)?$/.test(c) && (q = parseFloat(c.replace(/,/, ".").match(/^sp:((\d+)?([\.|,]\d+)?)(em|px)?$/)[1] || 0), e("<span>&nbsp;</span>").width(c.match("px") ? q + "px" : 2 * q + "em").addClass("ui-keyboard-button ui-keyboard-spacer").appendTo(l)), /^empty(:((\d+)?([\.|,]\d+)?)(em|px)?)?$/.test(c) && (q = /:/.test(c) ? parseFloat(c.replace(/,/, ".").match(/^empty:((\d+)?([\.|,]\d+)?)(em|px)?$/)[1] || 0) : "", a.addKey("", " ").addClass(d.css.buttonDisabled + " " + d.css.buttonEmpty).attr("aria-disabled", !0).width(q ? c.match("px") ? q + "px" : 2 * q + "em" : "")), /^meta\d+\:?(\w+)?/.test(c)) a.addKey(c, c);
                                    else switch (c) {
                                        case "a":
                                        case "accept":
                                            a.addKey("accept", c).addClass(d.css.buttonAction);
                                            break;
                                        case "alt":
                                        case "altgr":
                                            a.addKey("alt", "alt");
                                            break;
                                        case "b":
                                        case "bksp":
                                            a.addKey("bksp", c);
                                            break;
                                        case "c":
                                        case "cancel":
                                            a.addKey("cancel", c).addClass(d.css.buttonAction);
                                            break;
                                        case "combo":
                                            a.addKey("combo", "combo").addClass(d.css.buttonAction);
                                            break;
                                        case "dec":
                                            t.push(a.decimal ? "." : ",");
                                            a.addKey("dec", "dec");
                                            break;
                                        case "e":
                                        case "enter":
                                            a.addKey("enter", c).addClass(d.css.buttonAction);
                                            break;
                                        case "s":
                                        case "shift":
                                            a.addKey("shift", c);
                                            break;
                                        case "sign":
                                            t.push("-");
                                            a.addKey("sign", "sign");
                                            break;
                                        case "space":
                                            t.push(" ");
                                            a.addKey("space", "space");
                                            break;
                                        case "t":
                                        case "tab":
                                            a.addKey("tab", c);
                                            break;
                                        default:
                                            if (e.keyboard.keyaction.hasOwnProperty(c)) a.addKey(c, c)[h ? "addClass" : "removeClass"](d.css.buttonAction)
                                    } else b = p[m], t.push(":" === b ? b : b.split(":")[0]), a.addKey(b, b, !0);
                        l.find(".ui-keyboard-button:last").after('<br class="ui-keyboard-button-endrow">')
                    }
            });
            1 < s && (a.sets = !0);
            r.hasMappedKeys = !e.isEmptyObject(r.mappedKeys);
            return r.$keyboard = u
        };
        a.destroy = function() {
            e(document).unbind("mousedown.keyboard keyup.keyboard touchstart.keyboard");
            a.$keyboard.length && a.$keyboard.remove();
            var b = e.trim(d.openOn + " accepted beforeClose canceled change contextmenu hidden initialized keydown keypress keyup visible ").split(" ").join(".keyboard ");
            a.$el.removeClass("ui-keyboard-input ui-keyboard-lockedinput ui-keyboard-placeholder ui-keyboard-notallowed ui-keyboard-always-open " + d.css.input).removeAttr("aria-haspopup").removeAttr("role").unbind(b + ".keyboard").removeData("keyboard")
        };
        a.init()
    };
    e.keyboard.keyaction = {
        accept: function(b) { b.close(!0); return !1 },
        alt: function(b, e) {
            b.altActive = !b.altActive;
            b.showKeySet(e)
        },
        bksp: function(b) { b.insertText("bksp") },
        cancel: function(b) { b.close(); return !1 },
        clear: function(b) { b.$preview.val("") },
        combo: function(b) {
            var e = !b.options.useCombos;
            b.options.useCombos = e;
            b.$keyboard.find(".ui-keyboard-combo").toggleClass(b.options.css.buttonAction, e);
            e && b.checkCombos();
            return !1
        },
        dec: function(b) { b.insertText(b.decimal ? "." : ",") },
        "default": function(b, e) {
            b.shiftActive = b.altActive = b.metaActive = !1;
            b.showKeySet(e)
        },
        enter: function(b, l, a) { l = b.el.tagName; var d = b.options; if (a.shiftKey) return d.enterNavigation ? b.switchInput(!a[d.enterMod], !0) : b.close(!0); if (d.enterNavigation && ("TEXTAREA" !== l || a[d.enterMod])) return b.switchInput(!a[d.enterMod], d.autoAccept ? "true" : !1); "TEXTAREA" === l && e(a.target).closest("button").length && b.insertText(" \n") },
        lock: function(b, e) {
            b.lastKeyset[0] = b.shiftActive = b.capsLock = !b.capsLock;
            b.showKeySet(e)
        },
        left: function(b) {
            var e = b.$preview.caret();
            0 <= e.start - 1 && (b.lastCaret = { start: e.start - 1, end: e.start - 1 })
        },
        meta: function(b, l) {
            b.metaActive = e(l).hasClass(b.options.css.buttonAction) ? !1 : !0;
            b.showKeySet(l)
        },
        next: function(b) { b.switchInput(!0, b.options.autoAccept); return !1 },
        prev: function(b) { b.switchInput(!1, b.options.autoAccept); return !1 },
        right: function(b) {
            var e = b.$preview.caret();
            e.start + 1 <= b.$preview.val().length && (b.lastCaret = { start: e.start + 1, end: e.start + 1 })
        },
        shift: function(b, e) {
            b.lastKeyset[0] = b.shiftActive = !b.shiftActive;
            b.showKeySet(e)
        },
        sign: function(b) { /^\-?\d*\.?\d*$/.test(b.$preview.val()) && b.$preview.val(-1 * b.$preview.val()) },
        space: function(b) { b.insertText(" ") },
        tab: function(b) {
            var e = b.options;
            if ("INPUT" === b.el.tagName) return e.tabNavigation ? b.switchInput(!b.shiftActive, !0) : !1;
            b.insertText("\t")
        }
    };
    e.keyboard.builtLayouts = {};
    e.keyboard.layouts = { alpha: { "default": ["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}", "{tab} a b c d e f g h i j [ ] \\", "k l m n o p q r s ; ' {enter}", "{shift} t u v w x y z , . / {shift}", "{accept} {space} {cancel}"], shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "{tab} A B C D E F G H I J { } |", 'K L M N O P Q R S : " {enter}', "{shift} T U V W X Y Z < > ? {shift}", "{accept} {space} {cancel}"] }, qwerty: { "default": ["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}", "{tab} q w e r t y u i o p [ ] \\", "a s d f g h j k l ; ' {enter}", "{shift} z x c v b n m , . / {shift}", "{accept} {space} {cancel}"], shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "{tab} Q W E R T Y U I O P { } |", 'A S D F G H J K L : " {enter}', "{shift} Z X C V B N M < > ? {shift}", "{accept} {space} {cancel}"] }, international: { "default": ["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}", "{tab} q w e r t y u i o p [ ] \\", "a s d f g h j k l ; ' {enter}", "{shift} z x c v b n m , . / {shift}", "{accept} {alt} {space} {alt} {cancel}"], shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "{tab} Q W E R T Y U I O P { } |", 'A S D F G H J K L : " {enter}', "{shift} Z X C V B N M < > ? {shift}", "{accept} {alt} {space} {alt} {cancel}"], alt: ["~ \u00a1 \u00b2 \u00b3 \u00a4 \u20ac \u00bc \u00bd \u00be \u2018 \u2019 \u00a5 \u00d7 {bksp}", "{tab} \u00e4 \u00e5 \u00e9 \u00ae \u00fe \u00fc \u00fa \u00ed \u00f3 \u00f6 \u00ab \u00bb \u00ac", "\u00e1 \u00df \u00f0 f g h j k \u00f8 \u00b6 \u00b4 {enter}", "{shift} \u00e6 x \u00a9 v b \u00f1 \u00b5 \u00e7 > \u00bf {shift}", "{accept} {alt} {space} {alt} {cancel}"], "alt-shift": ["~ \u00b9 \u00b2 \u00b3 \u00a3 \u20ac \u00bc \u00bd \u00be \u2018 \u2019 \u00a5 \u00f7 {bksp}", "{tab} \u00c4 \u00c5 \u00c9 \u00ae \u00de \u00dc \u00da \u00cd \u00d3 \u00d6 \u00ab \u00bb \u00a6", "\u00c4 \u00a7 \u00d0 F G H J K \u00d8 \u00b0 \u00a8 {enter}", "{shift} \u00c6 X \u00a2 V B \u00d1 \u00b5 \u00c7 . \u00bf {shift}", "{accept} {alt} {space} {alt} {cancel}"] }, colemak: { "default": ["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}", "{tab} q w f p g j l u y ; [ ] \\", "{bksp} a r s t d h n e i o ' {enter}", "{shift} z x c v b k m , . / {shift}", "{accept} {space} {cancel}"], shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "{tab} Q W F P G J L U Y : { } |", '{bksp} A R S T D H N E I O " {enter}', "{shift} Z X C V B K M < > ? {shift}", "{accept} {space} {cancel}"] }, dvorak: { "default": ["` 1 2 3 4 5 6 7 8 9 0 [ ] {bksp}", "{tab} ' , . p y f g c r l / = \\", "a o e u i d h t n s - {enter}", "{shift} ; q j k x b m w v z {shift}", "{accept} {space} {cancel}"], shift: ["~ ! @ # $ % ^ & * ( ) { } {bksp}", '{tab} " < > P Y F G C R L ? + |', "A O E U I D H T N S _ {enter}", "{shift} : Q J K X B M W V Z {shift}", "{accept} {space} {cancel}"] }, num: { "default": "= ( ) {b};{clear} / * -;7 8 9 +;4 5 6 {sign};1 2 3 %;0 . {a} {c}".split(";") } };
    e.keyboard.defaultOptions = { layout: "qwerty", customLayout: null, position: { of: null, my: "center top", at: "center top", at2: "center bottom" }, usePreview: !0, alwaysOpen: !1, initialFocus: !0, stayOpen: !1, display: { a: "\u2714:Accept (Shift-Enter)", accept: "Accept:Accept (Shift-Enter)", alt: "Alt:\u2325 AltGr", b: "\u232b:Backspace", bksp: "Bksp:Backspace", c: "\u2716:Cancel (Esc)", cancel: "Cancel:Cancel (Esc)", clear: "C:Clear", combo: "\u00f6:Toggle Combo Keys", dec: ".:Decimal", e: "\u23ce:Enter", empty: "\u00a0", enter: "Enter:Enter \u23ce", left: "\u2190", lock: "Lock:\u21ea Caps Lock", next: "Next \u21e8", prev: "\u21e6 Prev", right: "\u2192", s: "\u21e7:Shift", shift: "Shift:Shift", sign: "\u00b1:Change Sign", space: "&nbsp;:Space", t: "\u21e5:Tab", tab: "\u21e5 Tab:Tab" }, wheelMessage: "Use mousewheel to see other keys", css: { input: "ui-widget-content ui-corner-all", container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix", buttonDefault: "ui-state-default ui-corner-all", buttonHover: "ui-state-hover", buttonAction: "ui-state-active", buttonDisabled: "ui-state-disabled", buttonEmpty: "ui-keyboard-empty" }, autoAccept: !1, lockInput: !1, restrictInput: !1, acceptValid: !1, cancelClose: !0, tabNavigation: !1, enterNavigation: !1, enterMod: "altKey", stopAtEnd: !0, appendLocally: !1, appendTo: "body", stickyShift: !0, preventPaste: !1, caretToEnd: !1, maxLength: !1, repeatDelay: 500, repeatRate: 20, resetDefault: !1, openOn: "focus", keyBinding: "mousedown touchstart", useCombos: !0, combos: { "`": { a: "\u00e0", A: "\u00c0", e: "\u00e8", E: "\u00c8", i: "\u00ec", I: "\u00cc", o: "\u00f2", O: "\u00d2", u: "\u00f9", U: "\u00d9", y: "\u1ef3", Y: "\u1ef2" }, "'": { a: "\u00e1", A: "\u00c1", e: "\u00e9", E: "\u00c9", i: "\u00ed", I: "\u00cd", o: "\u00f3", O: "\u00d3", u: "\u00fa", U: "\u00da", y: "\u00fd", Y: "\u00dd" }, '"': { a: "\u00e4", A: "\u00c4", e: "\u00eb", E: "\u00cb", i: "\u00ef", I: "\u00cf", o: "\u00f6", O: "\u00d6", u: "\u00fc", U: "\u00dc", y: "\u00ff", Y: "\u0178" }, "^": { a: "\u00e2", A: "\u00c2", e: "\u00ea", E: "\u00ca", i: "\u00ee", I: "\u00ce", o: "\u00f4", O: "\u00d4", u: "\u00fb", U: "\u00db", y: "\u0177", Y: "\u0176" }, "~": { a: "\u00e3", A: "\u00c3", e: "\u1ebd", E: "\u1ebc", i: "\u0129", I: "\u0128", o: "\u00f5", O: "\u00d5", u: "\u0169", U: "\u0168", y: "\u1ef9", Y: "\u1ef8", n: "\u00f1", N: "\u00d1" } }, validate: function(b, e, a) { return !0 } };
    e.keyboard.comboRegex = /([`\'~\^\"ao])([a-z])/mig;
    e.keyboard.currentKeyboard = "";
    e.fn.keyboard = function(b) { return this.each(function() { e(this).data("keyboard") || new e.keyboard(this, b) }) };
    e.fn.getkeyboard = function() { return this.data("keyboard") }
})(jQuery);

(function(e, b, l, a) {
    e.fn.caret = function(d, e) {
        if ("undefined" === typeof this[0] || this.is(":hidden") || "hidden" === this.css("visibility")) return this;
        var c, g, n, h, f;
        f = document.selection;
        var m = this[0],
            p = m.scrollTop,
            q = !1,
            s = !0;
        try { q = "undefined" !== typeof m.selectionStart } catch (r) { s = !1 }
        "object" === typeof d && d.start && d.end ? (g = d.start, h = d.end) : "number" === typeof d && "number" === typeof e && (g = d, h = e);
        if (s && "undefined" !== typeof g) return q ? (m.selectionStart = g, m.selectionEnd = h) : (f = m.createTextRange(), f.collapse(!0), f.moveStart("character", g), f.moveEnd("character", h - g), f.select()), (this.is(":visible") || "hidden" !== this.css("visibility")) && this.focus(), m.scrollTop = p, this;
        q ? (c = m.selectionStart, n = m.selectionEnd) : f ? "TEXTAREA" === m.tagName ? (h = this.val(), g = f[l](), f = g[a](), f.moveToElementText(m), f.setEndPoint("EndToEnd", g), c = f.text.replace(/\r/g, "\n")[b], n = c + g.text.replace(/\r/g, "\n")[b]) : (h = this.val().replace(/\r/g, "\n"), g = f[l]()[a](), g.moveEnd("character", h[b]), c = "" === g.text ? h[b] : h.lastIndexOf(g.text), g = f[l]()[a](), g.moveStart("character", -h[b]), n = g.text[b]) : (c = 0, n = (m.value || "").length);
        f = (m.value || "").substring(c, n);
        return { start: c, end: n, text: f, replace: function(a) { return m.value.substring(0, c) + a + m.value.substring(n, m.value[b]) } }
    }
})(jQuery, "length", "createRange", "duplicate");

shortcut = {
    all_shortcuts: {},
    add: function(e, t, a) {
        var r = { type: "keydown", propagate: !1, disable_in_input: !1, target: document, keycode: !1 };
        if (a)
            for (var n in r) "undefined" == typeof a[n] && (a[n] = r[n]);
        else a = r;
        var s = a.target;
        "string" == typeof a.target && (s = document.getElementById(a.target));
        e = e.toLowerCase();
        var o = function(r) {
            if (r = r || window.event, a.disable_in_input) { var n; if (r.target ? n = r.target : r.srcElement && (n = r.srcElement), 3 == n.nodeType && (n = n.parentNode), "INPUT" == n.tagName || "TEXTAREA" == n.tagName) return }
            r.keyCode ? code = r.keyCode : r.which && (code = r.which);
            var s = String.fromCharCode(code).toLowerCase();
            188 == code && (s = ","), 190 == code && (s = ".");
            var o = e.split("+"),
                d = 0,
                c = { "`": "~", 1: "!", 2: "@", 3: "#", 4: "$", 5: "%", 6: "^", 7: "&", 8: "*", 9: "(", 0: ")", "-": "_", "=": "+", ";": ":", "'": '"', ",": "<", ".": ">", "/": "?", "\\": "|" },
                l = { esc: 27, escape: 27, tab: 9, space: 32, "return": 13, enter: 13, backspace: 8, scrolllock: 145, scroll_lock: 145, scroll: 145, capslock: 20, caps_lock: 20, caps: 20, numlock: 144, num_lock: 144, num: 144, pause: 19, "break": 19, insert: 45, home: 36, "delete": 46, end: 35, pageup: 33, page_up: 33, pu: 33, pagedown: 34, page_down: 34, pd: 34, left: 37, up: 38, right: 39, down: 40, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 },
                p = { shift: { wanted: !1, pressed: !1 }, ctrl: { wanted: !1, pressed: !1 }, alt: { wanted: !1, pressed: !1 }, meta: { wanted: !1, pressed: !1 } };
            r.ctrlKey && (p.ctrl.pressed = !0), r.shiftKey && (p.shift.pressed = !0), r.altKey && (p.alt.pressed = !0), r.metaKey && (p.meta.pressed = !0);
            for (var i = 0; k = o[i], i < o.length; i++) "ctrl" == k || "control" == k ? (d++, p.ctrl.wanted = !0) : "shift" == k ? (d++, p.shift.wanted = !0) : "alt" == k ? (d++, p.alt.wanted = !0) : "meta" == k ? (d++, p.meta.wanted = !0) : k.length > 1 ? l[k] == code && d++ : a.keycode ? a.keycode == code && d++ : s == k ? d++ : c[s] && r.shiftKey && (s = c[s], s == k && d++);
            return d != o.length || p.ctrl.pressed != p.ctrl.wanted || p.shift.pressed != p.shift.wanted || p.alt.pressed != p.alt.wanted || p.meta.pressed != p.meta.wanted || (t(r), a.propagate) ? void 0 : (r.cancelBubble = !0, r.returnValue = !1, r.stopPropagation && (r.stopPropagation(), r.preventDefault()), !1)
        };
        this.all_shortcuts[e] = { callback: o, target: s, event: a.type }, s.addEventListener ? s.addEventListener(a.type, o, !1) : s.attachEvent ? s.attachEvent("on" + a.type, o) : s["on" + a.type] = o
    },
    remove: function(e) {
        e = e.toLowerCase();
        var t = this.all_shortcuts[e];
        if (delete this.all_shortcuts[e], t) {
            var a = t.event,
                r = t.target,
                n = t.callback;
            r.detachEvent ? r.detachEvent("on" + a, n) : r.removeEventListener ? r.removeEventListener(a, n, !1) : r["on" + a] = !1
        }
    }
};

! function(a) {
    "use strict";

    function b(a, b) {
        var c = (65535 & a) + (65535 & b),
            d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | 65535 & c
    }

    function c(a, b) { return a << b | a >>> 32 - b }

    function d(a, d, e, f, g, h) { return b(c(b(b(d, a), b(f, h)), g), e) }

    function e(a, b, c, e, f, g, h) { return d(b & c | ~b & e, a, b, f, g, h) }

    function f(a, b, c, e, f, g, h) { return d(b & e | c & ~e, a, b, f, g, h) }

    function g(a, b, c, e, f, g, h) { return d(b ^ c ^ e, a, b, f, g, h) }

    function h(a, b, c, e, f, g, h) { return d(c ^ (b | ~e), a, b, f, g, h) }

    function i(a, c) {
        a[c >> 5] |= 128 << c % 32, a[(c + 64 >>> 9 << 4) + 14] = c;
        var d, i, j, k, l, m = 1732584193,
            n = -271733879,
            o = -1732584194,
            p = 271733878;
        for (d = 0; d < a.length; d += 16) i = m, j = n, k = o, l = p, m = e(m, n, o, p, a[d], 7, -680876936), p = e(p, m, n, o, a[d + 1], 12, -389564586), o = e(o, p, m, n, a[d + 2], 17, 606105819), n = e(n, o, p, m, a[d + 3], 22, -1044525330), m = e(m, n, o, p, a[d + 4], 7, -176418897), p = e(p, m, n, o, a[d + 5], 12, 1200080426), o = e(o, p, m, n, a[d + 6], 17, -1473231341), n = e(n, o, p, m, a[d + 7], 22, -45705983), m = e(m, n, o, p, a[d + 8], 7, 1770035416), p = e(p, m, n, o, a[d + 9], 12, -1958414417), o = e(o, p, m, n, a[d + 10], 17, -42063), n = e(n, o, p, m, a[d + 11], 22, -1990404162), m = e(m, n, o, p, a[d + 12], 7, 1804603682), p = e(p, m, n, o, a[d + 13], 12, -40341101), o = e(o, p, m, n, a[d + 14], 17, -1502002290), n = e(n, o, p, m, a[d + 15], 22, 1236535329), m = f(m, n, o, p, a[d + 1], 5, -165796510), p = f(p, m, n, o, a[d + 6], 9, -1069501632), o = f(o, p, m, n, a[d + 11], 14, 643717713), n = f(n, o, p, m, a[d], 20, -373897302), m = f(m, n, o, p, a[d + 5], 5, -701558691), p = f(p, m, n, o, a[d + 10], 9, 38016083), o = f(o, p, m, n, a[d + 15], 14, -660478335), n = f(n, o, p, m, a[d + 4], 20, -405537848), m = f(m, n, o, p, a[d + 9], 5, 568446438), p = f(p, m, n, o, a[d + 14], 9, -1019803690), o = f(o, p, m, n, a[d + 3], 14, -187363961), n = f(n, o, p, m, a[d + 8], 20, 1163531501), m = f(m, n, o, p, a[d + 13], 5, -1444681467), p = f(p, m, n, o, a[d + 2], 9, -51403784), o = f(o, p, m, n, a[d + 7], 14, 1735328473), n = f(n, o, p, m, a[d + 12], 20, -1926607734), m = g(m, n, o, p, a[d + 5], 4, -378558), p = g(p, m, n, o, a[d + 8], 11, -2022574463), o = g(o, p, m, n, a[d + 11], 16, 1839030562), n = g(n, o, p, m, a[d + 14], 23, -35309556), m = g(m, n, o, p, a[d + 1], 4, -1530992060), p = g(p, m, n, o, a[d + 4], 11, 1272893353), o = g(o, p, m, n, a[d + 7], 16, -155497632), n = g(n, o, p, m, a[d + 10], 23, -1094730640), m = g(m, n, o, p, a[d + 13], 4, 681279174), p = g(p, m, n, o, a[d], 11, -358537222), o = g(o, p, m, n, a[d + 3], 16, -722521979), n = g(n, o, p, m, a[d + 6], 23, 76029189), m = g(m, n, o, p, a[d + 9], 4, -640364487), p = g(p, m, n, o, a[d + 12], 11, -421815835), o = g(o, p, m, n, a[d + 15], 16, 530742520), n = g(n, o, p, m, a[d + 2], 23, -995338651), m = h(m, n, o, p, a[d], 6, -198630844), p = h(p, m, n, o, a[d + 7], 10, 1126891415), o = h(o, p, m, n, a[d + 14], 15, -1416354905), n = h(n, o, p, m, a[d + 5], 21, -57434055), m = h(m, n, o, p, a[d + 12], 6, 1700485571), p = h(p, m, n, o, a[d + 3], 10, -1894986606), o = h(o, p, m, n, a[d + 10], 15, -1051523), n = h(n, o, p, m, a[d + 1], 21, -2054922799), m = h(m, n, o, p, a[d + 8], 6, 1873313359), p = h(p, m, n, o, a[d + 15], 10, -30611744), o = h(o, p, m, n, a[d + 6], 15, -1560198380), n = h(n, o, p, m, a[d + 13], 21, 1309151649), m = h(m, n, o, p, a[d + 4], 6, -145523070), p = h(p, m, n, o, a[d + 11], 10, -1120210379), o = h(o, p, m, n, a[d + 2], 15, 718787259), n = h(n, o, p, m, a[d + 9], 21, -343485551), m = b(m, i), n = b(n, j), o = b(o, k), p = b(p, l);
        return [m, n, o, p]
    }

    function j(a) { var b, c = ""; for (b = 0; b < 32 * a.length; b += 8) c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255); return c }

    function k(a) { var b, c = []; for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1) c[b] = 0; for (b = 0; b < 8 * a.length; b += 8) c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32; return c }

    function l(a) { return j(i(k(a), 8 * a.length)) }

    function m(a, b) {
        var c, d, e = k(a),
            f = [],
            g = [];
        for (f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0; 16 > c; c += 1) f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
        return d = i(f.concat(k(b)), 512 + 8 * b.length), j(i(g.concat(d), 640))
    }

    function n(a) {
        var b, c, d = "0123456789abcdef",
            e = "";
        for (c = 0; c < a.length; c += 1) b = a.charCodeAt(c), e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
        return e
    }

    function o(a) { return unescape(encodeURIComponent(a)) }

    function p(a) { return l(o(a)) }

    function q(a) { return n(p(a)) }

    function r(a, b) { return m(o(a), o(b)) }

    function s(a, b) { return n(r(a, b)) }

    function t(a, b, c) { return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a) }
    "function" == typeof define && define.amd ? define(function() { return t }) : a.md5 = t
}(this);

/**
 * bootbox.js v4.4.0
 *
 * http://bootboxjs.com/license.txt
 */
! function(a, b) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.bootbox = b(a.jQuery) }(this, function a(b, c) {
    "use strict";

    function d(a) { var b = q[o.locale]; return b ? b[a] : q.en[a] }

    function e(a, c, d) {
        a.stopPropagation(), a.preventDefault();
        var e = b.isFunction(d) && d.call(c, a) === !1;
        e || c.modal("hide")
    }

    function f(a) { var b, c = 0; for (b in a) c++; return c }

    function g(a, c) {
        var d = 0;
        b.each(a, function(a, b) { c(a, b, d++) })
    }

    function h(a) {
        var c, d;
        if ("object" != typeof a) throw new Error("Please supply an object of options");
        if (!a.message) throw new Error("Please specify a message");
        return a = b.extend({}, o, a), a.buttons || (a.buttons = {}), c = a.buttons, d = f(c), g(c, function(a, e, f) {
            if (b.isFunction(e) && (e = c[a] = { callback: e }), "object" !== b.type(e)) throw new Error("button with key " + a + " must be an object");
            e.label || (e.label = a), e.className || (e.className = 2 >= d && f === d - 1 ? "btn-primary" : "btn-default pull-left")
        }), a
    }

    function i(a, b) {
        var c = a.length,
            d = {};
        if (1 > c || c > 2) throw new Error("Invalid argument length");
        return 2 === c || "string" == typeof a[0] ? (d[b[0]] = a[0], d[b[1]] = a[1]) : d = a[0], d
    }

    function j(a, c, d) { return b.extend(!0, {}, a, i(c, d)) }

    function k(a, b, c, d) { var e = { className: "bootbox-" + a, buttons: l.apply(null, b) }; return m(j(e, d, c), b) }

    function l() {
        for (var a = {}, b = 0, c = arguments.length; c > b; b++) {
            var e = arguments[b],
                f = e.toLowerCase(),
                g = e.toUpperCase();
            a[f] = { label: d(g) }
        }
        return a
    }

    function m(a, b) { var d = {}; return g(b, function(a, b) { d[b] = !0 }), g(a.buttons, function(a) { if (d[a] === c) throw new Error("button key " + a + " is not allowed (options are " + b.join("\n") + ")") }), a }
    var n = { dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>", header: "<div class='modal-header'><h4 class='modal-title'></h4></div>", footer: "<div class='modal-footer'></div>", closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'><i class='fa fa-times'></i></button>", form: "<form class='bootbox-form'></form>", inputs: { text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />", textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>", email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />", select: "<select class='bootbox-input bootbox-input-select form-control'></select>", checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>", date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />", time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />", number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />", password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />" } },
        o = { locale: "en", backdrop: "static", animate: !0, className: null, closeButton: !0, show: !0, container: "body" },
        p = {};
    p.alert = function() { var a; if (a = k("alert", ["ok"], ["message", "callback"], arguments), a.callback && !b.isFunction(a.callback)) throw new Error("alert requires callback property to be a function when provided"); return a.buttons.ok.callback = a.onEscape = function() { return b.isFunction(a.callback) ? a.callback.call(this) : !0 }, p.dialog(a) }, p.confirm = function() { var a; if (a = k("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), a.buttons.cancel.callback = a.onEscape = function() { return a.callback.call(this, !1) }, a.buttons.confirm.callback = function() { return a.callback.call(this, !0) }, !b.isFunction(a.callback)) throw new Error("confirm requires a callback"); return p.dialog(a) }, p.prompt = function() {
        var a, d, e, f, h, i, k;
        if (f = b(n.form), d = { className: "bootbox-prompt", buttons: l("cancel", "confirm"), value: "", inputType: "text" }, a = m(j(d, arguments, ["title", "callback"]), ["cancel", "confirm"]), i = a.show === c ? !0 : a.show, a.message = f, a.buttons.cancel.callback = a.onEscape = function() { return a.callback.call(this, null) }, a.buttons.confirm.callback = function() {
                var c;
                switch (a.inputType) {
                    case "text":
                    case "textarea":
                    case "email":
                    case "select":
                    case "date":
                    case "time":
                    case "number":
                    case "password":
                        c = h.val();
                        break;
                    case "checkbox":
                        var d = h.find("input:checked");
                        c = [], g(d, function(a, d) { c.push(b(d).val()) })
                }
                return a.callback.call(this, c)
            }, a.show = !1, !a.title) throw new Error("prompt requires a title");
        if (!b.isFunction(a.callback)) throw new Error("prompt requires a callback");
        if (!n.inputs[a.inputType]) throw new Error("invalid prompt type");
        switch (h = b(n.inputs[a.inputType]), a.inputType) {
            case "text":
            case "textarea":
            case "email":
            case "date":
            case "time":
            case "number":
            case "password":
                h.val(a.value);
                break;
            case "select":
                var o = {};
                if (k = a.inputOptions || [], !b.isArray(k)) throw new Error("Please pass an array of input options");
                if (!k.length) throw new Error("prompt with select requires options");
                g(k, function(a, d) {
                    var e = h;
                    if (d.value === c || d.text === c) throw new Error("given options in wrong format");
                    d.group && (o[d.group] || (o[d.group] = b("<optgroup/>").attr("label", d.group)), e = o[d.group]), e.append("<option value='" + d.value + "'>" + d.text + "</option>")
                }), g(o, function(a, b) { h.append(b) }), h.val(a.value);
                break;
            case "checkbox":
                var q = b.isArray(a.value) ? a.value : [a.value];
                if (k = a.inputOptions || [], !k.length) throw new Error("prompt with checkbox requires options");
                if (!k[0].value || !k[0].text) throw new Error("given options in wrong format");
                h = b("<div/>"), g(k, function(c, d) {
                    var e = b(n.inputs[a.inputType]);
                    e.find("input").attr("value", d.value), e.find("label").append(d.text), g(q, function(a, b) { b === d.value && e.find("input").prop("checked", !0) }), h.append(e)
                })
        }
        return a.placeholder && h.attr("placeholder", a.placeholder), a.pattern && h.attr("pattern", a.pattern), a.maxlength && h.attr("maxlength", a.maxlength), f.append(h), f.on("submit", function(a) { a.preventDefault(), a.stopPropagation(), e.find(".btn-primary").click() }), e = p.dialog(a), e.off("shown.bs.modal"), e.on("shown.bs.modal", function() { h.focus() }), i === !0 && e.modal("show"), e
    }, p.dialog = function(a) {
        a = h(a);
        var d = b(n.dialog),
            f = d.find(".modal-dialog"),
            i = d.find(".modal-body"),
            j = a.buttons,
            k = "",
            l = { onEscape: a.onEscape };
        if (b.fn.modal === c) throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.");
        if (g(j, function(a, b) { k += "<button data-bb-handler='" + a + "' type='button' class='btn btn-sm " + b.className + "'>" + b.label + "</button>", l[a] = b.callback }), i.find(".bootbox-body").html(a.message), a.animate === !0 && d.addClass("fade"), a.className && d.addClass(a.className), "large" === a.size ? f.addClass("modal-lg") : "small" === a.size && f.addClass("modal-sm"), a.title && i.before(n.header), a.closeButton) {
            var m = b(n.closeButton);
            a.title ? d.find(".modal-header").prepend(m) : m.css("margin-top", "-10px").prependTo(i)
        }
        return a.title && d.find(".modal-title").html(a.title), k.length && (i.after(n.footer), d.find(".modal-footer").html(k)), d.on("hidden.bs.modal", function(a) { a.target === this && d.remove() }), d.on("shown.bs.modal", function() { d.find(".btn-primary:first").focus() }), "static" !== a.backdrop && d.on("click.dismiss.bs.modal", function(a) { d.children(".modal-backdrop").length && (a.currentTarget = d.children(".modal-backdrop").get(0)), a.target === a.currentTarget && d.trigger("escape.close.bb") }), d.on("escape.close.bb", function(a) { l.onEscape && e(a, d, l.onEscape) }), d.on("click", ".modal-footer button", function(a) {
            var c = b(this).data("bb-handler");
            e(a, d, l[c])
        }), d.on("click", ".bootbox-close-button", function(a) { e(a, d, l.onEscape) }), d.on("keyup", function(a) { 27 === a.which && d.trigger("escape.close.bb") }), b(a.container).append(d), d.modal({ backdrop: a.backdrop ? "static" : !1, keyboard: !1, show: !1 }), a.show && d.modal("show"), d
    }, p.setDefaults = function() {
        var a = {};
        2 === arguments.length ? a[arguments[0]] = arguments[1] : a = arguments[0], b.extend(o, a)
    }, p.hideAll = function() { return b(".bootbox").modal("hide"), p };
    var q = { bg_BG: { OK: "Ок", CANCEL: "Отказ", CONFIRM: "Потвърждавам" }, br: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Sim" }, cs: { OK: "OK", CANCEL: "Zrušit", CONFIRM: "Potvrdit" }, da: { OK: "OK", CANCEL: "Annuller", CONFIRM: "Accepter" }, de: { OK: "OK", CANCEL: "Abbrechen", CONFIRM: "Akzeptieren" }, el: { OK: "Εντάξει", CANCEL: "Ακύρωση", CONFIRM: "Επιβεβαίωση" }, en: { OK: "OK", CANCEL: "Cancel", CONFIRM: "OK" }, es: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Aceptar" }, et: { OK: "OK", CANCEL: "Katkesta", CONFIRM: "OK" }, fa: { OK: "قبول", CANCEL: "لغو", CONFIRM: "تایید" }, fi: { OK: "OK", CANCEL: "Peruuta", CONFIRM: "OK" }, fr: { OK: "OK", CANCEL: "Annuler", CONFIRM: "D'accord" }, he: { OK: "אישור", CANCEL: "ביטול", CONFIRM: "אישור" }, hu: { OK: "OK", CANCEL: "Mégsem", CONFIRM: "Megerősít" }, hr: { OK: "OK", CANCEL: "Odustani", CONFIRM: "Potvrdi" }, id: { OK: "OK", CANCEL: "Batal", CONFIRM: "OK" }, it: { OK: "OK", CANCEL: "Annulla", CONFIRM: "Conferma" }, ja: { OK: "OK", CANCEL: "キャンセル", CONFIRM: "確認" }, lt: { OK: "Gerai", CANCEL: "Atšaukti", CONFIRM: "Patvirtinti" }, lv: { OK: "Labi", CANCEL: "Atcelt", CONFIRM: "Apstiprināt" }, nl: { OK: "OK", CANCEL: "Annuleren", CONFIRM: "Accepteren" }, no: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" }, pl: { OK: "OK", CANCEL: "Anuluj", CONFIRM: "Potwierdź" }, pt: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Confirmar" }, ru: { OK: "OK", CANCEL: "Отмена", CONFIRM: "Применить" }, sq: { OK: "OK", CANCEL: "Anulo", CONFIRM: "Prano" }, sv: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" }, th: { OK: "ตกลง", CANCEL: "ยกเลิก", CONFIRM: "ยืนยัน" }, tr: { OK: "Tamam", CANCEL: "İptal", CONFIRM: "Onayla" }, zh_CN: { OK: "OK", CANCEL: "取消", CONFIRM: "确认" }, zh_TW: { OK: "OK", CANCEL: "取消", CONFIRM: "確認" } };
    return p.addLocale = function(a, c) { return b.each(["OK", "CANCEL", "CONFIRM"], function(a, b) { if (!c[b]) throw new Error("Please supply a translation for '" + b + "'") }), q[a] = { OK: c.OK, CANCEL: c.CANCEL, CONFIRM: c.CONFIRM }, p }, p.removeLocale = function(a) { return delete q[a], p }, p.setLocale = function(a) { return p.setDefaults("locale", a) }, p.init = function(c) { return a(c || b) }, p
});

/*!
 * accounting.js v0.4.1, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function(p, z) {
    function q(a) { return !!("" === a || a && a.charCodeAt && a.substr) }

    function m(a) { return u ? u(a) : "[object Array]" === v.call(a) }

    function r(a) { return "[object Object]" === v.call(a) }

    function s(a, b) {
        var d, a = a || {},
            b = b || {};
        for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]);
        return a
    }

    function j(a, b, d) {
        var c = [],
            e, h;
        if (!a) return c;
        if (w && a.map === w) return a.map(b, d);
        for (e = 0, h = a.length; e < h; e++) c[e] = b.call(d, a[e], e, a);
        return c
    }

    function n(a, b) { a = Math.round(Math.abs(a)); return isNaN(a) ? b : a }

    function x(a) { var b = c.settings.currency.format; "function" === typeof a && (a = a()); return q(a) && a.match("%v") ? { pos: a, neg: a.replace("-", "").replace("%v", "-%v"), zero: a } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = { pos: b, neg: b.replace("%v", "-%v"), zero: b } : a }
    var c = { version: "0.4.1", settings: { currency: { symbol: "$", format: "%s%v", decimal: ".", thousand: ",", precision: 2, grouping: 3 }, number: { precision: 0, grouping: 3, thousand: ",", decimal: "." } } },
        w = Array.prototype.map,
        u = Array.isArray,
        v = Object.prototype.toString,
        o = c.unformat = c.parse = function(a, b) {
            if (m(a)) return j(a, function(a) { return o(a, b) });
            a = a || 0;
            if ("number" === typeof a) return a;
            var b = b || ".",
                c = RegExp("[^0-9-" + b + "]", ["g"]),
                c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, "."));
            return !isNaN(c) ? c : 0
        },
        y = c.toFixed = function(a, b) {
            var b = n(b, c.settings.number.precision),
                d = Math.pow(10, b);
            return (Math.round(c.unformat(a) * d) / d).toFixed(b)
        },
        t = c.formatNumber = c.format = function(a, b, d, i) {
            if (m(a)) return j(a, function(a) { return t(a, b, d, i) });
            var a = o(a),
                e = s(r(b) ? b : { precision: b, thousand: d, decimal: i }, c.settings.number),
                h = n(e.precision),
                f = 0 > a ? "-" : "",
                g = parseInt(y(Math.abs(a || 0), h), 10) + "",
                l = 3 < g.length ? g.length % 3 : 0;
            return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "")
        },
        A = c.formatMoney = function(a, b, d, i, e, h) {
            if (m(a)) return j(a, function(a) { return A(a, b, d, i, e, h) });
            var a = o(a),
                f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency),
                g = x(f.format);
            return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal))
        };
    c.formatColumn = function(a, b, d, i, e, h) {
        if (!a) return [];
        var f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency),
            g = x(f.format),
            l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1,
            k = 0,
            a = j(a, function(a) {
                if (m(a)) return c.formatColumn(a, f);
                a = o(a);
                a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal));
                if (a.length > k) k = a.length;
                return a
            });
        return j(a, function(a) { return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a })
    };
    if ("undefined" !== typeof exports) {
        if ("undefined" !== typeof module && module.exports) exports = module.exports = c;
        exports.accounting = c
    } else "function" === typeof define && define.amd ? define([], function() { return c }) : (c.noConflict = function(a) {
        return function() {
            p.accounting = a;
            c.noConflict = z;
            return c
        }
    }(p.accounting), p.accounting = c)
})(this);

! function(a) {
    "use strict";

    function b(a, b) {
        var c = (65535 & a) + (65535 & b),
            d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | 65535 & c
    }

    function c(a, b) { return a << b | a >>> 32 - b }

    function d(a, d, e, f, g, h) { return b(c(b(b(d, a), b(f, h)), g), e) }

    function e(a, b, c, e, f, g, h) { return d(b & c | ~b & e, a, b, f, g, h) }

    function f(a, b, c, e, f, g, h) { return d(b & e | c & ~e, a, b, f, g, h) }

    function g(a, b, c, e, f, g, h) { return d(b ^ c ^ e, a, b, f, g, h) }

    function h(a, b, c, e, f, g, h) { return d(c ^ (b | ~e), a, b, f, g, h) }

    function i(a, c) {
        a[c >> 5] |= 128 << c % 32, a[(c + 64 >>> 9 << 4) + 14] = c;
        var d, i, j, k, l, m = 1732584193,
            n = -271733879,
            o = -1732584194,
            p = 271733878;
        for (d = 0; d < a.length; d += 16) i = m, j = n, k = o, l = p, m = e(m, n, o, p, a[d], 7, -680876936), p = e(p, m, n, o, a[d + 1], 12, -389564586), o = e(o, p, m, n, a[d + 2], 17, 606105819), n = e(n, o, p, m, a[d + 3], 22, -1044525330), m = e(m, n, o, p, a[d + 4], 7, -176418897), p = e(p, m, n, o, a[d + 5], 12, 1200080426), o = e(o, p, m, n, a[d + 6], 17, -1473231341), n = e(n, o, p, m, a[d + 7], 22, -45705983), m = e(m, n, o, p, a[d + 8], 7, 1770035416), p = e(p, m, n, o, a[d + 9], 12, -1958414417), o = e(o, p, m, n, a[d + 10], 17, -42063), n = e(n, o, p, m, a[d + 11], 22, -1990404162), m = e(m, n, o, p, a[d + 12], 7, 1804603682), p = e(p, m, n, o, a[d + 13], 12, -40341101), o = e(o, p, m, n, a[d + 14], 17, -1502002290), n = e(n, o, p, m, a[d + 15], 22, 1236535329), m = f(m, n, o, p, a[d + 1], 5, -165796510), p = f(p, m, n, o, a[d + 6], 9, -1069501632), o = f(o, p, m, n, a[d + 11], 14, 643717713), n = f(n, o, p, m, a[d], 20, -373897302), m = f(m, n, o, p, a[d + 5], 5, -701558691), p = f(p, m, n, o, a[d + 10], 9, 38016083), o = f(o, p, m, n, a[d + 15], 14, -660478335), n = f(n, o, p, m, a[d + 4], 20, -405537848), m = f(m, n, o, p, a[d + 9], 5, 568446438), p = f(p, m, n, o, a[d + 14], 9, -1019803690), o = f(o, p, m, n, a[d + 3], 14, -187363961), n = f(n, o, p, m, a[d + 8], 20, 1163531501), m = f(m, n, o, p, a[d + 13], 5, -1444681467), p = f(p, m, n, o, a[d + 2], 9, -51403784), o = f(o, p, m, n, a[d + 7], 14, 1735328473), n = f(n, o, p, m, a[d + 12], 20, -1926607734), m = g(m, n, o, p, a[d + 5], 4, -378558), p = g(p, m, n, o, a[d + 8], 11, -2022574463), o = g(o, p, m, n, a[d + 11], 16, 1839030562), n = g(n, o, p, m, a[d + 14], 23, -35309556), m = g(m, n, o, p, a[d + 1], 4, -1530992060), p = g(p, m, n, o, a[d + 4], 11, 1272893353), o = g(o, p, m, n, a[d + 7], 16, -155497632), n = g(n, o, p, m, a[d + 10], 23, -1094730640), m = g(m, n, o, p, a[d + 13], 4, 681279174), p = g(p, m, n, o, a[d], 11, -358537222), o = g(o, p, m, n, a[d + 3], 16, -722521979), n = g(n, o, p, m, a[d + 6], 23, 76029189), m = g(m, n, o, p, a[d + 9], 4, -640364487), p = g(p, m, n, o, a[d + 12], 11, -421815835), o = g(o, p, m, n, a[d + 15], 16, 530742520), n = g(n, o, p, m, a[d + 2], 23, -995338651), m = h(m, n, o, p, a[d], 6, -198630844), p = h(p, m, n, o, a[d + 7], 10, 1126891415), o = h(o, p, m, n, a[d + 14], 15, -1416354905), n = h(n, o, p, m, a[d + 5], 21, -57434055), m = h(m, n, o, p, a[d + 12], 6, 1700485571), p = h(p, m, n, o, a[d + 3], 10, -1894986606), o = h(o, p, m, n, a[d + 10], 15, -1051523), n = h(n, o, p, m, a[d + 1], 21, -2054922799), m = h(m, n, o, p, a[d + 8], 6, 1873313359), p = h(p, m, n, o, a[d + 15], 10, -30611744), o = h(o, p, m, n, a[d + 6], 15, -1560198380), n = h(n, o, p, m, a[d + 13], 21, 1309151649), m = h(m, n, o, p, a[d + 4], 6, -145523070), p = h(p, m, n, o, a[d + 11], 10, -1120210379), o = h(o, p, m, n, a[d + 2], 15, 718787259), n = h(n, o, p, m, a[d + 9], 21, -343485551), m = b(m, i), n = b(n, j), o = b(o, k), p = b(p, l);
        return [m, n, o, p]
    }

    function j(a) { var b, c = ""; for (b = 0; b < 32 * a.length; b += 8) c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255); return c }

    function k(a) { var b, c = []; for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1) c[b] = 0; for (b = 0; b < 8 * a.length; b += 8) c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32; return c }

    function l(a) { return j(i(k(a), 8 * a.length)) }

    function m(a, b) {
        var c, d, e = k(a),
            f = [],
            g = [];
        for (f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0; 16 > c; c += 1) f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
        return d = i(f.concat(k(b)), 512 + 8 * b.length), j(i(g.concat(d), 640))
    }

    function n(a) {
        var b, c, d = "0123456789abcdef",
            e = "";
        for (c = 0; c < a.length; c += 1) b = a.charCodeAt(c), e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
        return e
    }

    function o(a) { return unescape(encodeURIComponent(a)) }

    function p(a) { return l(o(a)) }

    function q(a) { return n(p(a)) }

    function r(a, b) { return m(o(a), o(b)) }

    function s(a, b) { return n(r(a, b)) }

    function t(a, b, c) { return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a) }
    "function" == typeof define && define.amd ? define(function() { return t }) : a.md5 = t
}(this);