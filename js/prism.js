/* http://prismjs.com/download.html?themes=prism-coy&languages=markup+css+clike+javascript+c+docker+git+go+graphql+http+ini+java+json+makefile+markdown+properties+protobuf+python+scala+sql+yaml */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
    , Prism = function () {
        var e = /\blang(?:uage)?-(\w+)\b/i
            , t = 0
            , n = _self.Prism = {
                manual: _self.Prism && _self.Prism.manual,
                util: {
                    encode: function (e) {
                        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }),
                            e.__id
                    },
                    clone: function (e) {
                        var t = n.util.type(e);
                        switch (t) {
                            case "Object":
                                var a = {};
                                for (var r in e)
                                    e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                                return a;
                            case "Array":
                                return e.map(function (e) {
                                    return n.util.clone(e)
                                })
                        }
                        return e
                    }
                },
                languages: {
                    extend: function (e, t) {
                        var a = n.util.clone(n.languages[e]);
                        for (var r in t)
                            a[r] = t[r];
                        return a
                    },
                    insertBefore: function (e, t, a, r) {
                        r = r || n.languages;
                        var i = r[e];
                        if (2 == arguments.length) {
                            a = arguments[1];
                            for (var l in a)
                                a.hasOwnProperty(l) && (i[l] = a[l]);
                            return i
                        }
                        var o = {};
                        for (var s in i)
                            if (i.hasOwnProperty(s)) {
                                if (s == t)
                                    for (var l in a)
                                        a.hasOwnProperty(l) && (o[l] = a[l]);
                                o[s] = i[s]
                            }
                        return n.languages.DFS(n.languages, function (t, n) {
                            n === r[e] && t != e && (this[t] = o)
                        }),
                            r[e] = o
                    },
                    DFS: function (e, t, a, r) {
                        r = r || {};
                        for (var i in e)
                            e.hasOwnProperty(i) && (t.call(e, i, e[i], a || i),
                                "Object" !== n.util.type(e[i]) || r[n.util.objId(e[i])] ? "Array" !== n.util.type(e[i]) || r[n.util.objId(e[i])] || (r[n.util.objId(e[i])] = !0,
                                    n.languages.DFS(e[i], t, i, r)) : (r[n.util.objId(e[i])] = !0,
                                        n.languages.DFS(e[i], t, null, r)))
                    }
                },
                plugins: {},
                highlightAll: function (e, t) {
                    var a = {
                        callback: t,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", a);
                    for (var r, i = a.elements || document.querySelectorAll(a.selector), l = 0; r = i[l++];)
                        n.highlightElement(r, e === !0, a.callback)
                },
                highlightElement: function (t, a, r) {
                    for (var i, l, o = t; o && !e.test(o.className);)
                        o = o.parentNode;
                    o && (i = (o.className.match(e) || [, ""])[1].toLowerCase(),
                        l = n.languages[i]),
                        t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i,
                        o = t.parentNode,
                        /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i);
                    var s = t.textContent
                        , u = {
                            element: t,
                            language: i,
                            grammar: l,
                            code: s
                        };
                    if (n.hooks.run("before-sanity-check", u),
                        !u.code || !u.grammar)
                        return u.code && (n.hooks.run("before-highlight", u),
                            u.element.textContent = u.code,
                            n.hooks.run("after-highlight", u)),
                            n.hooks.run("complete", u),
                            void 0;
                    if (n.hooks.run("before-highlight", u),
                        a && _self.Worker) {
                        var g = new Worker(n.filename);
                        g.onmessage = function (e) {
                            u.highlightedCode = e.data,
                                n.hooks.run("before-insert", u),
                                u.element.innerHTML = u.highlightedCode,
                                r && r.call(u.element),
                                n.hooks.run("after-highlight", u),
                                n.hooks.run("complete", u)
                        }
                            ,
                            g.postMessage(JSON.stringify({
                                language: u.language,
                                code: u.code,
                                immediateClose: !0
                            }))
                    } else
                        u.highlightedCode = n.highlight(u.code, u.grammar, u.language),
                            n.hooks.run("before-insert", u),
                            u.element.innerHTML = u.highlightedCode,
                            r && r.call(t),
                            n.hooks.run("after-highlight", u),
                            n.hooks.run("complete", u)
                },
                highlight: function (e, t, r) {
                    var i = n.tokenize(e, t);
                    return a.stringify(n.util.encode(i), r)
                },
                matchGrammar: function (e, t, a, r, i, l, o) {
                    var s = n.Token;
                    for (var u in a)
                        if (a.hasOwnProperty(u) && a[u]) {
                            if (u == o)
                                return;
                            var g = a[u];
                            g = "Array" === n.util.type(g) ? g : [g];
                            for (var c = 0; c < g.length; ++c) {
                                var h = g[c]
                                    , f = h.inside
                                    , d = !!h.lookbehind
                                    , m = !!h.greedy
                                    , p = 0
                                    , y = h.alias;
                                if (m && !h.pattern.global) {
                                    var v = h.pattern.toString().match(/[imuy]*$/)[0];
                                    h.pattern = RegExp(h.pattern.source, v + "g")
                                }
                                h = h.pattern || h;
                                for (var b = r, k = i; b < t.length; k += t[b].length,
                                    ++b) {
                                    var w = t[b];
                                    if (t.length > e.length)
                                        return;
                                    if (!(w instanceof s)) {
                                        h.lastIndex = 0;
                                        var _ = h.exec(w)
                                            , P = 1;
                                        if (!_ && m && b != t.length - 1) {
                                            if (h.lastIndex = k,
                                                _ = h.exec(e),
                                                !_)
                                                break;
                                            for (var A = _.index + (d ? _[1].length : 0), j = _.index + _[0].length, x = b, O = k, S = t.length; S > x && (j > O || !t[x].type && !t[x - 1].greedy); ++x)
                                                O += t[x].length,
                                                    A >= O && (++b,
                                                        k = O);
                                            if (t[b] instanceof s || t[x - 1].greedy)
                                                continue;
                                            P = x - b,
                                                w = e.slice(k, O),
                                                _.index -= k
                                        }
                                        if (_) {
                                            d && (p = _[1].length);
                                            var A = _.index + p
                                                , _ = _[0].slice(p)
                                                , j = A + _.length
                                                , N = w.slice(0, A)
                                                , C = w.slice(j)
                                                , E = [b, P];
                                            N && (++b,
                                                k += N.length,
                                                E.push(N));
                                            var I = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                                            if (E.push(I),
                                                C && E.push(C),
                                                Array.prototype.splice.apply(t, E),
                                                1 != P && n.matchGrammar(e, t, a, b, k, !0, u),
                                                l)
                                                break
                                        } else if (l)
                                            break
                                    }
                                }
                            }
                        }
                },
                tokenize: function (e, t) {
                    var a = [e]
                        , r = t.rest;
                    if (r) {
                        for (var i in r)
                            t[i] = r[i];
                        delete t.rest
                    }
                    return n.matchGrammar(e, a, t, 0, 0, !1),
                        a
                },
                hooks: {
                    all: {},
                    add: function (e, t) {
                        var a = n.hooks.all;
                        a[e] = a[e] || [],
                            a[e].push(t)
                    },
                    run: function (e, t) {
                        var a = n.hooks.all[e];
                        if (a && a.length)
                            for (var r, i = 0; r = a[i++];)
                                r(t)
                    }
                }
            }
            , a = n.Token = function (e, t, n, a, r) {
                this.type = e,
                    this.content = t,
                    this.alias = n,
                    this.length = 0 | (a || "").length,
                    this.greedy = !!r
            }
            ;
        if (a.stringify = function (e, t, r) {
            if ("string" == typeof e)
                return e;
            if ("Array" === n.util.type(e))
                return e.map(function (n) {
                    return a.stringify(n, t, e)
                }).join("");
            var i = {
                type: e.type,
                content: a.stringify(e.content, t, r),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: t,
                parent: r
            };
            if ("comment" == i.type && (i.attributes.spellcheck = "true"),
                e.alias) {
                var l = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                Array.prototype.push.apply(i.classes, l)
            }
            n.hooks.run("wrap", i);
            var o = Object.keys(i.attributes).map(function (e) {
                return e + '="' + (i.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            }).join(" ");
            return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + i.content + "</" + i.tag + ">"
        }
            ,
            !_self.document)
            return _self.addEventListener ? (_self.addEventListener("message", function (e) {
                var t = JSON.parse(e.data)
                    , a = t.language
                    , r = t.code
                    , i = t.immediateClose;
                _self.postMessage(n.highlight(r, n.languages[a], a)),
                    i && _self.close()
            }, !1),
                _self.Prism) : _self.Prism;
        var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return r && (n.filename = r.src,
            n.manual || r.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))),
            _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism),
    "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /[=>"']/
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
},
    Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
    Prism.hooks.add("wrap", function (a) {
        "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
    }),
    Prism.languages.xml = Prism.languages.markup,
    Prism.languages.html = Prism.languages.markup,
    Prism.languages.mathml = Prism.languages.markup,
    Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: {
        pattern: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
},
    Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css),
    Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
        style: {
            pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
            lookbehind: !0,
            inside: Prism.languages.css,
            alias: "language-css"
        }
    }),
        Prism.languages.insertBefore("inside", "attr-value", {
            "style-attr": {
                pattern: /\s*style=("|').*?\1/i,
                inside: {
                    "attr-name": {
                        pattern: /^\s*style/i,
                        inside: Prism.languages.markup.tag.inside
                    },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    "attr-value": {
                        pattern: /.+/i,
                        inside: Prism.languages.css
                    }
                },
                alias: "language-css"
            }
        }, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    string: {
        pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}),
    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
            lookbehind: !0,
            greedy: !0
        }
    }),
    Prism.languages.insertBefore("javascript", "string", {
        "template-string": {
            pattern: /`(?:\\\\|\\?[^\\])*?`/,
            greedy: !0,
            inside: {
                interpolation: {
                    pattern: /\$\{[^}]+\}/,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation"
                        },
                        rest: Prism.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        }
    }),
    Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
        script: {
            pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
            lookbehind: !0,
            inside: Prism.languages.javascript,
            alias: "language-javascript"
        }
    }),
    Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", {
    keyword: /\b(_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
}),
    Prism.languages.insertBefore("c", "string", {
        macro: {
            pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,
            lookbehind: !0,
            alias: "property",
            inside: {
                string: {
                    pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,
                    lookbehind: !0
                },
                directive: {
                    pattern: /(#\s*)\b(define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                    lookbehind: !0,
                    alias: "keyword"
                }
            }
        },
        constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
    }),
    delete Prism.languages.c["class-name"],
    delete Prism.languages.c["boolean"];
Prism.languages.docker = {
    keyword: {
        pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
        lookbehind: !0
    },
    string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*?\1/,
    comment: /#.*/,
    punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
},
    Prism.languages.dockerfile = Prism.languages.docker;
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(\\?.)*?\1/m,
    command: {
        pattern: /^.*\$ git .*$/m,
        inside: {
            parameter: /\s(--|-)\w+/m
        }
    },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
};
Prism.languages.go = Prism.languages.extend("clike", {
    keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/,
    "boolean": /\b(_|iota|nil|true|false)\b/,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
    string: {
        pattern: /("|'|`)(\\?.|\r|\n)*?\1/,
        greedy: !0
    }
}),
    delete Prism.languages.go["class-name"];
Prism.languages.graphql = {
    comment: /#.*/,
    string: {
        pattern: /"(?:\\.|[^\\"])*"/,
        greedy: !0
    },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
    "boolean": /\b(?:true|false)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: {
        pattern: /@[a-z_]\w*/i,
        alias: "function"
    },
    "attr-name": /[a-z_]\w*(?=\s*:)/i,
    keyword: [{
        pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.\.\.\s*)on\b/,
        lookbehind: !0
    }, /\b(?:query|fragment|mutation)\b/],
    operator: /!|=|\.{3}/,
    punctuation: /[!(){}\[\]:=,]/
};
Prism.languages.http = {
    "request-line": {
        pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
        inside: {
            property: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
            "attr-name": /:\w+/
        }
    },
    "response-status": {
        pattern: /^HTTP\/1.[01] \d+.*/m,
        inside: {
            property: {
                pattern: /(^HTTP\/1.[01] )\d+.*/i,
                lookbehind: !0
            }
        }
    },
    "header-name": {
        pattern: /^[\w-]+:(?=.)/m,
        alias: "keyword"
    }
};
var httpLanguages = {
    "application/json": Prism.languages.javascript,
    "application/xml": Prism.languages.markup,
    "text/xml": Prism.languages.markup,
    "text/html": Prism.languages.markup
};
for (var contentType in httpLanguages)
    if (httpLanguages[contentType]) {
        var options = {};
        options[contentType] = {
            pattern: new RegExp("(content-type:\\s*" + contentType + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
            lookbehind: !0,
            inside: {
                rest: httpLanguages[contentType]
            }
        },
            Prism.languages.insertBefore("http", "header-name", options)
    }
; Prism.languages.ini = {
    comment: /^[ \t]*;.*$/m,
    selector: /^[ \t]*\[.*?\]/m,
    constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
    "attr-value": {
        pattern: /=.*/,
        inside: {
            punctuation: /^[=]/
        }
    }
};
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
    operator: {
        pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
        lookbehind: !0
    }
}),
    Prism.languages.insertBefore("java", "function", {
        annotation: {
            alias: "punctuation",
            pattern: /(^|[^.])@\w+/,
            lookbehind: !0
        }
    });
Prism.languages.json = {
    property: /"(?:\\.|[^\\"])*"(?=\s*:)/gi,
    string: /"(?!:)(?:\\.|[^\\"])*"(?!:)/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?)\b/g,
    punctuation: /[{}[\]);,]/g,
    operator: /:/g,
    "boolean": /\b(true|false)\b/gi,
    "null": /\bnull\b/gi
},
    Prism.languages.jsonp = Prism.languages.json;
Prism.languages.makefile = {
    comment: {
        pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|.)*/,
        lookbehind: !0
    },
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    symbol: {
        pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
        inside: {
            variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/
        }
    },
    variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
    keyword: [/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/, {
        pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
        lookbehind: !0
    }],
    operator: /(?:::|[?:+!])?=|[|@]/,
    punctuation: /[:;(){}]/
};
Prism.languages.markdown = Prism.languages.extend("markup", {}),
    Prism.languages.insertBefore("markdown", "prolog", {
        blockquote: {
            pattern: /^>(?:[\t ]*>)*/m,
            alias: "punctuation"
        },
        code: [{
            pattern: /^(?: {4}|\t).+/m,
            alias: "keyword"
        }, {
            pattern: /``.+?``|`[^`\n]+`/,
            alias: "keyword"
        }],
        title: [{
            pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
            alias: "important",
            inside: {
                punctuation: /==+$|--+$/
            }
        }, {
            pattern: /(^\s*)#+.+/m,
            lookbehind: !0,
            alias: "important",
            inside: {
                punctuation: /^#+|#+$/
            }
        }],
        hr: {
            pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: !0,
            alias: "punctuation"
        },
        list: {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: !0,
            alias: "punctuation"
        },
        "url-reference": {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
                variable: {
                    pattern: /^(!?\[)[^\]]+/,
                    lookbehind: !0
                },
                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                punctuation: /^[\[\]!:]|[<>]/
            },
            alias: "url"
        },
        bold: {
            pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            inside: {
                punctuation: /^\*\*|^__|\*\*$|__$/
            }
        },
        italic: {
            pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            inside: {
                punctuation: /^[*_]|[*_]$/
            }
        },
        url: {
            pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
            inside: {
                variable: {
                    pattern: /(!?\[)[^\]]+(?=\]$)/,
                    lookbehind: !0
                },
                string: {
                    pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
                }
            }
        }
    }),
    Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url),
    Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url),
    Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic),
    Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.properties = {
    comment: /^[ \t]*[#!].*$/m,
    "attr-value": {
        pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|.)+/m,
        lookbehind: !0
    },
    "attr-name": /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[ =:]| )/m,
    punctuation: /[=:]/
};
Prism.languages.protobuf = Prism.languages.extend("clike", {
    keyword: /\b(package|import|message|enum)\b/,
    builtin: /\b(required|repeated|optional|reserved)\b/,
    primitive: {
        pattern: /\b(double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes)\b/,
        alias: "symbol"
    }
});
Prism.languages.python = {
    "triple-quoted-string": {
        pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
        alias: "string"
    },
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(?:\\\\|\\?[^\\\r\n])*?\1/,
        greedy: !0
    },
    "function": {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
        lookbehind: !0
    },
    "class-name": {
        pattern: /(\bclass\s+)[a-z0-9_]+/i,
        lookbehind: !0
    },
    keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
    "boolean": /\b(?:True|False)\b/,
    number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.scala = Prism.languages.extend("java", {
    keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
    string: [{
        pattern: /"""[\s\S]*?"""/,
        greedy: !0
    }, {
        pattern: /("|')(?:\\\\|\\?[^\\\r\n])*?\1/,
        greedy: !0
    }],
    builtin: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
    number: /\b(?:0x[\da-f]*\.?[\da-f]+|\d*\.?\d+e?\d*[dfl]?)\b/i,
    symbol: /'[^\d\s\\]\w*/
}),
    delete Prism.languages.scala["class-name"],
    delete Prism.languages.scala["function"];
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0
    },
    string: {
        pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
        greedy: !0,
        lookbehind: !0
    },
    variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
    "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
    operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
Prism.languages.yaml = {
    scalar: {
        pattern: /([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,
        lookbehind: !0,
        alias: "string"
    },
    comment: /#.*/,
    key: {
        pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
        lookbehind: !0,
        alias: "atrule"
    },
    directive: {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: !0,
        alias: "important"
    },
    datetime: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*($|,|]|}))/m,
        lookbehind: !0,
        alias: "number"
    },
    "boolean": {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: "important"
    },
    "null": {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: "important"
    },
    string: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')(?=[ \t]*($|,|]|}))/m,
        lookbehind: !0,
        greedy: !0
    },
    number: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\da-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0
    },
    tag: /![^\s]+/,
    important: /[&*][\w]+/,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
};
