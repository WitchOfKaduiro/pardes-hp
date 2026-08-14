var je = Object.defineProperty;
var xe = (s, e, r) => e in s ? je(s, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
}) : s[e] = r;
var q = (s, e, r) => (xe(s, typeof e != "symbol" ? e + "" : e, r),
r);
import {m as fe} from "./index-CjeI3SAa.js";
fe.data("blockYoutube", s => {
    let e = null;
    function r() {
        return new Promise(a => {
            if (window.YT && window.YT.Player) {
                a(window.YT.Player);
                return
            }
            if (window.addEventListener("loaded:youtube", l => {
                a(l.detail)
            }
            , {
                once: !0
            }),
            document.getElementById("player-api"))
                return;
            const n = document.createElement("script");
            n.src = "https://www.youtube.com/player_api",
            n.id = "player-api";
            const o = document.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(n, o),
            window.onYouTubePlayerAPIReady = () => {
                window.dispatchEvent(new CustomEvent("loaded:youtube",{
                    detail: YT.Player
                }))
            }
        }
        )
    }
    return {
        async init() {
            await this.initializePlayer(s.videoId),
            window.swup.hooks.on("page:view", async a => {
                await this.initializePlayer(s.videoId)
            }
            )
        },
        async initializePlayer(a) {
            e || (e = await r()),
            fe.nextTick( () => {
                const n = this.$refs.player;
                n && (n.innerHTML = "",
                new e(n,{
                    height: "100%",
                    width: "100%",
                    videoId: a || "M7lc1UVf-VE"
                }))
            }
            )
        }
    }
}
);
fe.data("example", () => ({
    init() {}
}));
function I() {
    return I = Object.assign ? Object.assign.bind() : function(s) {
        for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var a in r)
                Object.prototype.hasOwnProperty.call(r, a) && (s[a] = r[a])
        }
        return s
    }
    ,
    I.apply(this, arguments)
}
function $e(s, e) {
    if (s == null)
        return {};
    var r = {}, a = Object.keys(s), n, o;
    for (o = 0; o < a.length; o++)
        n = a[o],
        !(e.indexOf(n) >= 0) && (r[n] = s[n]);
    return r
}
var De = 46
  , Te = /\\(\\)?/g
  , ke = RegExp(`[^.[\\]]+|\\[(?:([^"'][^[]*)|(["'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))`, "g")
  , Me = function(e) {
    var r = [];
    return e.charCodeAt(0) === De && r.push(""),
    e.replace(ke, function(a, n, o, l) {
        var c = a;
        o ? c = l.replace(Te, "$1") : n && (c = n.trim()),
        r.push(c)
    }),
    r
}
  , le = {}
  , qe = /[.[\]]+/
  , Oe = function(e) {
    if (e == null || !e.length)
        return [];
    if (typeof e != "string")
        throw new Error("toPath() expects a string");
    return le[e] == null && (e.endsWith("[]") ? le[e] = e.split(qe).filter(Boolean) : le[e] = Me(e)),
    le[e]
}
  , L = function(e, r) {
    for (var a = Oe(r), n = e, o = 0; o < a.length; o++) {
        var l = a[o];
        if (n == null || typeof n != "object" || Array.isArray(n) && isNaN(l))
            return;
        n = n[l]
    }
    return n
};
function ze(s) {
    var e = Be(s, "string");
    return typeof e == "symbol" ? e : String(e)
}
function Be(s, e) {
    if (typeof s != "object" || s === null)
        return s;
    var r = s[Symbol.toPrimitive];
    if (r !== void 0) {
        var a = r.call(s, e || "default");
        if (typeof a != "object")
            return a;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (e === "string" ? String : Number)(s)
}
var Ge = function s(e, r, a, n, o) {
    if (r >= a.length)
        return n;
    var l = a[r];
    if (isNaN(l)) {
        var c;
        if (e == null) {
            var v, i = s(void 0, r + 1, a, n, o);
            return i === void 0 ? void 0 : (v = {},
            v[l] = i,
            v)
        }
        if (Array.isArray(e))
            throw new Error("Cannot set a non-numeric property on an array");
        var y = s(e[l], r + 1, a, n, o);
        if (y === void 0) {
            var m = Object.keys(e).length;
            if (e[l] === void 0 && m === 0)
                return;
            if (e[l] !== void 0 && m <= 1)
                return !isNaN(a[r - 1]) && !o ? {} : void 0;
            e[l];
            var V = $e(e, [l].map(ze));
            return V
        }
        return I({}, e, (c = {},
        c[l] = y,
        c))
    }
    var F = Number(l);
    if (e == null) {
        var g = s(void 0, r + 1, a, n, o);
        if (g === void 0)
            return;
        var b = [];
        return b[F] = g,
        b
    }
    if (!Array.isArray(e))
        throw new Error("Cannot set a numeric property on an object");
    var U = e[F]
      , D = s(U, r + 1, a, n, o)
      , k = [].concat(e);
    if (o && D === void 0) {
        if (k.splice(F, 1),
        k.length === 0)
            return
    } else
        k[F] = D;
    return k
}
  , z = function(e, r, a, n) {
    if (n === void 0 && (n = !1),
    e == null)
        throw new Error("Cannot call setIn() with " + String(e) + " state");
    if (r == null)
        throw new Error("Cannot call setIn() with " + String(r) + " key");
    return Ge(e, 0, Oe(r), a, n)
}
  , ge = "FINAL_FORM/form-error"
  , re = "FINAL_FORM/array-error";
function Ee(s, e) {
    var r = s.errors
      , a = s.initialValues
      , n = s.lastSubmittedValues
      , o = s.submitErrors
      , l = s.submitFailed
      , c = s.submitSucceeded
      , v = s.submitting
      , i = s.values
      , y = e.active
      , m = e.blur
      , V = e.change
      , F = e.data
      , g = e.focus
      , b = e.modified
      , U = e.modifiedSinceLastSubmit
      , D = e.name
      , k = e.touched
      , ae = e.validating
      , Y = e.visited
      , Z = L(i, D)
      , G = L(r, D);
    G && G[re] && (G = G[re]);
    var se = o && L(o, D)
      , M = a && L(a, D)
      , A = e.isEqual(M, Z)
      , ne = !!(n && !e.isEqual(L(n, D), Z))
      , ue = !G && !se;
    return {
        active: y,
        blur: m,
        change: V,
        data: F,
        dirty: !A,
        dirtySinceLastSubmit: ne,
        error: G,
        focus: g,
        initial: M,
        invalid: !ue,
        length: Array.isArray(Z) ? Z.length : void 0,
        modified: b,
        modifiedSinceLastSubmit: U,
        name: D,
        pristine: A,
        submitError: se,
        submitFailed: l,
        submitSucceeded: c,
        submitting: v,
        touched: k,
        valid: ue,
        value: Z,
        visited: Y,
        validating: ae
    }
}
var He = ["active", "data", "dirty", "dirtySinceLastSubmit", "error", "initial", "invalid", "length", "modified", "modifiedSinceLastSubmit", "pristine", "submitError", "submitFailed", "submitSucceeded", "submitting", "touched", "valid", "value", "visited", "validating"]
  , K = function(e, r) {
    if (e === r)
        return !0;
    if (typeof e != "object" || !e || typeof r != "object" || !r)
        return !1;
    var a = Object.keys(e)
      , n = Object.keys(r);
    if (a.length !== n.length)
        return !1;
    for (var o = Object.prototype.hasOwnProperty.bind(r), l = 0; l < a.length; l++) {
        var c = a[l];
        if (!o(c) || e[c] !== r[c])
            return !1
    }
    return !0
};
function we(s, e, r, a, n, o) {
    var l = !1;
    return n.forEach(function(c) {
        a[c] && (s[c] = e[c],
        (!r || (~o.indexOf(c) ? !K(e[c], r[c]) : e[c] !== r[c])) && (l = !0))
    }),
    l
}
var Ke = ["data"]
  , Ue = function(e, r, a, n) {
    var o = {
        blur: e.blur,
        change: e.change,
        focus: e.focus,
        name: e.name
    }
      , l = we(o, e, r, a, He, Ke) || !r;
    return l || n ? o : void 0
}
  , Ye = ["active", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "error", "errors", "hasSubmitErrors", "hasValidationErrors", "initialValues", "invalid", "modified", "modifiedSinceLastSubmit", "pristine", "submitting", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "touched", "valid", "validating", "values", "visited"]
  , We = ["touched", "visited"];
function ye(s, e, r, a) {
    var n = {}
      , o = we(n, s, e, r, Ye, We) || !e;
    return o || a ? n : void 0
}
var pe = function(e) {
    var r, a;
    return function() {
        for (var n = arguments.length, o = new Array(n), l = 0; l < n; l++)
            o[l] = arguments[l];
        return (!r || o.length !== r.length || o.some(function(c, v) {
            return !K(r[v], c)
        })) && (r = o,
        a = e.apply(void 0, o)),
        a
    }
}
  , be = function(s) {
    return !!s && (typeof s == "object" || typeof s == "function") && typeof s.then == "function"
}
  , Xe = function(e, r) {
    return e === r
}
  , ee = function s(e) {
    return Object.keys(e).some(function(r) {
        var a = e[r];
        return a && typeof a == "object" && !(a instanceof Error) ? s(a) : typeof a < "u"
    })
};
function Ce(s) {
    var e = s.active
      , r = s.dirtySinceLastSubmit
      , a = s.modifiedSinceLastSubmit
      , n = s.error
      , o = s.errors
      , l = s.initialValues
      , c = s.pristine
      , v = s.submitting
      , i = s.submitFailed
      , y = s.submitSucceeded
      , m = s.submitError
      , V = s.submitErrors
      , F = s.valid
      , g = s.validating
      , b = s.values;
    return {
        active: e,
        dirty: !c,
        dirtySinceLastSubmit: r,
        modifiedSinceLastSubmit: a,
        error: n,
        errors: o,
        hasSubmitErrors: !!(m || V && ee(V)),
        hasValidationErrors: !!(n || ee(o)),
        invalid: !F,
        initialValues: l,
        pristine: c,
        submitting: v,
        submitFailed: i,
        submitSucceeded: y,
        submitError: m,
        submitErrors: V,
        valid: F,
        validating: g > 0,
        values: b
    }
}
function Ve(s, e, r, a, n, o) {
    var l = n(r, a, e, o);
    return l ? (s(l),
    !0) : !1
}
function Fe(s, e, r, a, n) {
    var o = s.entries;
    Object.keys(o).forEach(function(l) {
        var c = o[Number(l)];
        if (c) {
            var v = c.subscription
              , i = c.subscriber
              , y = c.notified;
            Ve(i, v, e, r, a, n || !y) && (c.notified = !0)
        }
    })
}
function Ze(s) {
    if (!s)
        throw new Error("No config specified");
    var e = s.debug
      , r = s.destroyOnUnregister
      , a = s.keepDirtyOnReinitialize
      , n = s.initialValues
      , o = s.mutators
      , l = s.onSubmit
      , c = s.validate
      , v = s.validateOnBlur;
    if (!l)
        throw new Error("No onSubmit function specified");
    var i = {
        subscribers: {
            index: 0,
            entries: {}
        },
        fieldSubscribers: {},
        fields: {},
        formState: {
            asyncErrors: {},
            dirtySinceLastSubmit: !1,
            modifiedSinceLastSubmit: !1,
            errors: {},
            initialValues: n && I({}, n),
            invalid: !1,
            pristine: !0,
            submitting: !1,
            submitFailed: !1,
            submitSucceeded: !1,
            resetWhileSubmitting: !1,
            valid: !0,
            validating: 0,
            values: n ? I({}, n) : {}
        },
        lastFormState: void 0
    }
      , y = 0
      , m = !1
      , V = !1
      , F = !1
      , g = 0
      , b = {}
      , U = function(t) {
        return function(u) {
            return delete b[t],
            u
        }
    }
      , D = function(t, u, f) {
        var d = L(t.formState.values, u)
          , h = f(d);
        t.formState.values = z(t.formState.values, u, h) || {}
    }
      , k = function(t, u, f) {
        if (t.fields[u]) {
            var d, h;
            t.fields = I({}, t.fields, (d = {},
            d[f] = I({}, t.fields[u], {
                name: f,
                blur: function() {
                    return T.blur(f)
                },
                change: function(w) {
                    return T.change(f, w)
                },
                focus: function() {
                    return T.focus(f)
                },
                lastFieldState: void 0
            }),
            d)),
            delete t.fields[u],
            t.fieldSubscribers = I({}, t.fieldSubscribers, (h = {},
            h[f] = t.fieldSubscribers[u],
            h)),
            delete t.fieldSubscribers[u];
            var E = L(t.formState.values, u);
            t.formState.values = z(t.formState.values, u, void 0) || {},
            t.formState.values = z(t.formState.values, f, E),
            delete t.lastFormState
        }
    }
      , ae = function(t) {
        return function() {
            if (o) {
                for (var u = {
                    formState: i.formState,
                    fields: i.fields,
                    fieldSubscribers: i.fieldSubscribers,
                    lastFormState: i.lastFormState
                }, f = arguments.length, d = new Array(f), h = 0; h < f; h++)
                    d[h] = arguments[h];
                var E = o[t](d, u, {
                    changeValue: D,
                    getIn: L,
                    renameField: k,
                    resetFieldState: T.resetFieldState,
                    setIn: z,
                    shallowEqual: K
                });
                return i.formState = u.formState,
                i.fields = u.fields,
                i.fieldSubscribers = u.fieldSubscribers,
                i.lastFormState = u.lastFormState,
                M(void 0, function() {
                    A(),
                    R()
                }),
                E
            }
        }
    }
      , Y = o ? Object.keys(o).reduce(function(S, t) {
        return S[t] = ae(t),
        S
    }, {}) : {}
      , Z = function(t) {
        var u = [];
        if (c) {
            var f = c(I({}, i.formState.values));
            be(f) ? u.push(f.then(function(d) {
                return t(d, !0)
            })) : t(f, !1)
        }
        return u
    }
      , G = function(t) {
        return Object.keys(t.validators).reduce(function(u, f) {
            var d = t.validators[Number(f)]();
            return d && u.push(d),
            u
        }, [])
    }
      , se = function(t, u) {
        var f = []
          , d = G(t);
        if (d.length) {
            var h;
            d.forEach(function(E) {
                var O = E(L(i.formState.values, t.name), i.formState.values, E.length === 0 || E.length === 3 ? Ee(i.formState, i.fields[t.name]) : void 0);
                if (O && be(O)) {
                    t.validating = !0;
                    var w = O.then(function(p) {
                        i.fields[t.name] && (i.fields[t.name].validating = !1,
                        u(p))
                    });
                    f.push(w)
                } else
                    h || (h = O)
            }),
            u(h)
        }
        return f
    }
      , M = function(t, u) {
        if (m) {
            V = !0,
            u();
            return
        }
        var f = i.fields
          , d = i.formState
          , h = I({}, f)
          , E = Object.keys(h);
        if (!c && !E.some(function(X) {
            return G(h[X]).length
        })) {
            u();
            return
        }
        var O = !1;
        if (t) {
            var w = h[t];
            if (w) {
                var p = w.validateFields;
                p && (O = !0,
                E = p.length ? p.concat(t) : [t])
            }
        }
        var P = {}
          , $ = {}
          , B = {}
          , W = [].concat(Z(function(X, _) {
            _ ? $ = X || {} : P = X || {}
        }), E.reduce(function(X, _) {
            return X.concat(se(f[_], function(H) {
                B[_] = H
            }))
        }, []))
          , j = W.length > 0
          , N = ++g
          , Q = Promise.all(W).then(U(N));
        j && (b[N] = Q);
        var me = function(_) {
            var H = I({}, O ? d.errors : {}, P, _ ? $ : d.asyncErrors)
              , Se = function(J) {
                E.forEach(function(C) {
                    if (f[C]) {
                        var ie = L(P, C)
                          , Ne = L(H, C)
                          , Ie = G(h[C]).length
                          , Pe = B[C];
                        J(C, Ie && Pe || c && ie || (!ie && !O ? Ne : void 0))
                    }
                })
            };
            Se(function(te, J) {
                H = z(H, te, J) || {}
            }),
            Se(function(te, J) {
                if (J && J[re]) {
                    var C = L(H, te)
                      , ie = [].concat(C);
                    ie[re] = J[re],
                    H = z(H, te, ie)
                }
            }),
            K(d.errors, H) || (d.errors = H),
            _ && (d.asyncErrors = $),
            d.error = P[ge]
        };
        if (j && (i.formState.validating++,
        u()),
        me(!1),
        u(),
        j) {
            var he = function() {
                i.formState.validating--,
                u(),
                i.formState.validating === 0 && i.lastFormState.validating && R()
            };
            Q.then(function() {
                g > N || me(!0)
            }).then(he, he)
        }
    }
      , A = function(t) {
        if (!y) {
            var u = i.fields
              , f = i.fieldSubscribers
              , d = i.formState
              , h = I({}, u)
              , E = function(w) {
                var p = h[w]
                  , P = Ee(d, p)
                  , $ = p.lastFieldState;
                p.lastFieldState = P;
                var B = f[w];
                B && Fe(B, P, $, Ue, $ === void 0)
            };
            t ? E(t) : Object.keys(h).forEach(E)
        }
    }
      , ne = function() {
        Object.keys(i.fields).forEach(function(t) {
            i.fields[t].touched = !0
        })
    }
      , ue = function() {
        return !!(i.formState.error || ee(i.formState.errors))
    }
      , oe = function() {
        var t = i.fields
          , u = i.formState
          , f = i.lastFormState
          , d = I({}, t)
          , h = Object.keys(d)
          , E = !1
          , O = h.reduce(function(j, N) {
            var Q = !d[N].isEqual(L(u.values, N), L(u.initialValues || {}, N));
            return Q && (E = !0,
            j[N] = !0),
            j
        }, {})
          , w = h.reduce(function(j, N) {
            var Q = u.lastSubmittedValues || {};
            return d[N].isEqual(L(u.values, N), L(Q, N)) || (j[N] = !0),
            j
        }, {});
        u.pristine = !E,
        u.dirtySinceLastSubmit = !!(u.lastSubmittedValues && Object.values(w).some(function(j) {
            return j
        })),
        u.modifiedSinceLastSubmit = !!(u.lastSubmittedValues && Object.keys(d).some(function(j) {
            return d[j].modifiedSinceLastSubmit
        })),
        u.valid = !u.error && !u.submitError && !ee(u.errors) && !(u.submitErrors && ee(u.submitErrors));
        var p = Ce(u)
          , P = h.reduce(function(j, N) {
            return j.modified[N] = d[N].modified,
            j.touched[N] = d[N].touched,
            j.visited[N] = d[N].visited,
            j
        }, {
            modified: {},
            touched: {},
            visited: {}
        })
          , $ = P.modified
          , B = P.touched
          , W = P.visited;
        return p.dirtyFields = f && K(f.dirtyFields, O) ? f.dirtyFields : O,
        p.dirtyFieldsSinceLastSubmit = f && K(f.dirtyFieldsSinceLastSubmit, w) ? f.dirtyFieldsSinceLastSubmit : w,
        p.modified = f && K(f.modified, $) ? f.modified : $,
        p.touched = f && K(f.touched, B) ? f.touched : B,
        p.visited = f && K(f.visited, W) ? f.visited : W,
        f && K(f, p) ? f : p
    }
      , Le = function() {
        return e && !0 && e(oe(), Object.keys(i.fields).reduce(function(t, u) {
            return t[u] = i.fields[u],
            t
        }, {}))
    }
      , de = !1
      , ce = !1
      , R = function S() {
        if (de)
            ce = !0;
        else {
            if (de = !0,
            Le(),
            !y && !(m && F)) {
                var t = i.lastFormState
                  , u = oe();
                u !== t && (i.lastFormState = u,
                Fe(i.subscribers, u, t, ye))
            }
            de = !1,
            ce && (ce = !1,
            S())
        }
    }
      , Ae = function() {
        return Object.keys(i.fields).some(function(t) {
            return i.fields[t].beforeSubmit && i.fields[t].beforeSubmit() === !1
        })
    }
      , Re = function() {
        return Object.keys(i.fields).forEach(function(t) {
            return i.fields[t].afterSubmit && i.fields[t].afterSubmit()
        })
    }
      , ve = function() {
        return Object.keys(i.fields).forEach(function(t) {
            return i.fields[t].modifiedSinceLastSubmit = !1
        })
    };
    M(void 0, function() {
        R()
    });
    var T = {
        batch: function(t) {
            y++,
            t(),
            y--,
            A(),
            R()
        },
        blur: function(t) {
            var u = i.fields
              , f = i.formState
              , d = u[t];
            d && (delete f.active,
            u[t] = I({}, d, {
                active: !1,
                touched: !0
            }),
            v ? M(t, function() {
                A(),
                R()
            }) : (A(),
            R()))
        },
        change: function(t, u) {
            var f = i.fields
              , d = i.formState;
            if (L(d.values, t) !== u) {
                D(i, t, function() {
                    return u
                });
                var h = f[t];
                h && (f[t] = I({}, h, {
                    modified: !0,
                    modifiedSinceLastSubmit: !!d.lastSubmittedValues
                })),
                v ? (A(),
                R()) : M(t, function() {
                    A(),
                    R()
                })
            }
        },
        get destroyOnUnregister() {
            return !!r
        },
        set destroyOnUnregister(S) {
            r = S
        },
        focus: function(t) {
            var u = i.fields[t];
            u && !u.active && (i.formState.active = t,
            u.active = !0,
            u.visited = !0,
            A(),
            R())
        },
        mutators: Y,
        getFieldState: function(t) {
            var u = i.fields[t];
            return u && u.lastFieldState
        },
        getRegisteredFields: function() {
            return Object.keys(i.fields)
        },
        getState: function() {
            return oe()
        },
        initialize: function(t) {
            var u = i.fields
              , f = i.formState
              , d = I({}, u)
              , h = typeof t == "function" ? t(f.values) : t;
            a || (f.values = h);
            var E = a ? Object.keys(d).reduce(function(O, w) {
                var p = d[w]
                  , P = p.isEqual(L(f.values, w), L(f.initialValues || {}, w));
                return P || (O[w] = L(f.values, w)),
                O
            }, {}) : {};
            f.initialValues = h,
            f.values = h,
            Object.keys(E).forEach(function(O) {
                f.values = z(f.values, O, E[O]) || {}
            }),
            M(void 0, function() {
                A(),
                R()
            })
        },
        isValidationPaused: function() {
            return m
        },
        pauseValidation: function(t) {
            t === void 0 && (t = !0),
            m = !0,
            F = t
        },
        registerField: function(t, u, f, d) {
            f === void 0 && (f = {}),
            i.fieldSubscribers[t] || (i.fieldSubscribers[t] = {
                index: 0,
                entries: {}
            });
            var h = i.fieldSubscribers[t].index++;
            i.fieldSubscribers[t].entries[h] = {
                subscriber: pe(u),
                subscription: f,
                notified: !1
            };
            var E = i.fields[t] || {
                active: !1,
                afterSubmit: d && d.afterSubmit,
                beforeSubmit: d && d.beforeSubmit,
                data: d && d.data || {},
                isEqual: d && d.isEqual || Xe,
                lastFieldState: void 0,
                modified: !1,
                modifiedSinceLastSubmit: !1,
                name: t,
                touched: !1,
                valid: !0,
                validateFields: d && d.validateFields,
                validators: {},
                validating: !1,
                visited: !1
            };
            E.blur = E.blur || function() {
                return T.blur(t)
            }
            ,
            E.change = E.change || function($) {
                return T.change(t, $)
            }
            ,
            E.focus = E.focus || function() {
                return T.focus(t)
            }
            ,
            i.fields[t] = E;
            var O = !1
              , w = d && d.silent
              , p = function() {
                w && i.fields[t] ? A(t) : (R(),
                A())
            };
            if (d) {
                O = !!(d.getValidator && d.getValidator()),
                d.getValidator && (i.fields[t].validators[h] = d.getValidator);
                var P = L(i.formState.values, t) === void 0;
                d.initialValue !== void 0 && (P || L(i.formState.values, t) === L(i.formState.initialValues, t)) && (i.formState.initialValues = z(i.formState.initialValues || {}, t, d.initialValue),
                i.formState.values = z(i.formState.values, t, d.initialValue),
                M(void 0, p)),
                d.defaultValue !== void 0 && d.initialValue === void 0 && L(i.formState.initialValues, t) === void 0 && P && (i.formState.values = z(i.formState.values, t, d.defaultValue))
            }
            return O ? M(void 0, p) : p(),
            function() {
                var $ = !1;
                i.fields[t] && ($ = !!(i.fields[t].validators[h] && i.fields[t].validators[h]()),
                delete i.fields[t].validators[h]);
                var B = !!i.fieldSubscribers[t];
                B && delete i.fieldSubscribers[t].entries[h];
                var W = B && !Object.keys(i.fieldSubscribers[t].entries).length;
                W && (delete i.fieldSubscribers[t],
                delete i.fields[t],
                $ && (i.formState.errors = z(i.formState.errors, t, void 0) || {}),
                r && (i.formState.values = z(i.formState.values, t, void 0, !0) || {})),
                w || ($ ? M(void 0, function() {
                    R(),
                    A()
                }) : W && R())
            }
        },
        reset: function(t) {
            t === void 0 && (t = i.formState.initialValues),
            i.formState.submitting && (i.formState.resetWhileSubmitting = !0),
            i.formState.submitFailed = !1,
            i.formState.submitSucceeded = !1,
            delete i.formState.submitError,
            delete i.formState.submitErrors,
            delete i.formState.lastSubmittedValues,
            T.initialize(t || {})
        },
        resetFieldState: function(t) {
            i.fields[t] = I({}, i.fields[t], {
                active: !1,
                lastFieldState: void 0,
                modified: !1,
                touched: !1,
                valid: !0,
                validating: !1,
                visited: !1
            }),
            M(void 0, function() {
                A(),
                R()
            })
        },
        restart: function(t) {
            t === void 0 && (t = i.formState.initialValues),
            T.batch(function() {
                for (var u in i.fields)
                    T.resetFieldState(u),
                    i.fields[u] = I({}, i.fields[u], {
                        active: !1,
                        lastFieldState: void 0,
                        modified: !1,
                        modifiedSinceLastSubmit: !1,
                        touched: !1,
                        valid: !0,
                        validating: !1,
                        visited: !1
                    });
                T.reset(t)
            })
        },
        resumeValidation: function() {
            m = !1,
            F = !1,
            V && M(void 0, function() {
                A(),
                R()
            }),
            V = !1
        },
        setConfig: function(t, u) {
            switch (t) {
            case "debug":
                e = u;
                break;
            case "destroyOnUnregister":
                r = u;
                break;
            case "initialValues":
                T.initialize(u);
                break;
            case "keepDirtyOnReinitialize":
                a = u;
                break;
            case "mutators":
                o = u,
                u ? (Object.keys(Y).forEach(function(f) {
                    f in u || delete Y[f]
                }),
                Object.keys(u).forEach(function(f) {
                    Y[f] = ae(f)
                })) : Object.keys(Y).forEach(function(f) {
                    delete Y[f]
                });
                break;
            case "onSubmit":
                l = u;
                break;
            case "validate":
                c = u,
                M(void 0, function() {
                    A(),
                    R()
                });
                break;
            case "validateOnBlur":
                v = u;
                break;
            default:
                throw new Error("Unrecognised option " + t)
            }
        },
        submit: function() {
            var t = i.formState;
            if (!t.submitting) {
                if (delete t.submitErrors,
                delete t.submitError,
                t.lastSubmittedValues = I({}, t.values),
                ue()) {
                    ne(),
                    ve(),
                    i.formState.submitFailed = !0,
                    R(),
                    A();
                    return
                }
                var u = Object.keys(b);
                if (u.length) {
                    Promise.all(u.map(function(w) {
                        return b[Number(w)]
                    })).then(T.submit, console.error);
                    return
                }
                var f = Ae();
                if (!f) {
                    var d, h = !1, E = function(p) {
                        t.submitting = !1;
                        var P = t.resetWhileSubmitting;
                        return P && (t.resetWhileSubmitting = !1),
                        p && ee(p) ? (t.submitFailed = !0,
                        t.submitSucceeded = !1,
                        t.submitErrors = p,
                        t.submitError = p[ge],
                        ne()) : (P || (t.submitFailed = !1,
                        t.submitSucceeded = !0),
                        Re()),
                        R(),
                        A(),
                        h = !0,
                        d && d(p),
                        p
                    };
                    t.submitting = !0,
                    t.submitFailed = !1,
                    t.submitSucceeded = !1,
                    t.lastSubmittedValues = I({}, t.values),
                    ve();
                    var O = l(t.values, T, E);
                    if (!h) {
                        if (O && be(O))
                            return R(),
                            A(),
                            O.then(E, function(w) {
                                throw E(),
                                w
                            });
                        if (l.length >= 3)
                            return R(),
                            A(),
                            new Promise(function(w) {
                                d = w
                            }
                            );
                        E(O)
                    }
                }
            }
        },
        subscribe: function(t, u) {
            if (!t)
                throw new Error("No callback given.");
            if (!u)
                throw new Error("No subscription provided. What values do you want to listen to?");
            var f = pe(t)
              , d = i.subscribers
              , h = d.index++;
            d.entries[h] = {
                subscriber: f,
                subscription: u,
                notified: !1
            };
            var E = oe();
            return Ve(f, u, E, E, ye, !0),
            function() {
                delete d.entries[h]
            }
        }
    };
    return T
}
const _e = /^[0-9,A-Z,a-z][0-9,a-z,A-Z,_,\.,\-,\+]+@[0-9,A-Z,a-z][0-9,a-z,A-Z,\.,\-]+\.[a-z]+$/
  , Je = /^[a-zA-Z]+$/
  , Qe = /^[0-9A-Za-z]+$/
  , et = /^[^\x01-\x7E\xA1-\xDF]+$/
  , tt = /^[ァ-ヶー　]*$/
  , it = /^ぁ-ん/
  , rt = /^0\d{1,3}-?\d{2,4}-?\d{3,4}$/
  , at = /^0\d{1,3}-\d{2,4}-\d{3,4}$/
  , st = /^〒?(\s*?)(\d{7}|\d{3}-\d{4})$/;
function nt(s, e) {
    const r = String(s).length;
    return Number(e) <= r
}
function ut(s, e) {
    return String(s).length <= Number(e)
}
function ot(s) {
    return typeof s == "string" ? s === "" : s instanceof Array ? s.length === 0 : s instanceof Object ? Object.keys(s).length === 0 : !s
}
class x {
    constructor({customValidations: e=[], config: r}) {
        q(this, "config", {
            ENDPOINT: "/wp-json/matsuo/contact",
            FIELD: "data-field",
            FIELD_CONTROL: "data-field-control",
            FIELD_REGISTRATION: "data-field-registration",
            FIELD_ERROR: "data-field-error",
            FIELD_LABEL: "data-field-label",
            AUTO_REPLY_TARGET: "email"
        });
        q(this, "fieldItemsCollection", new Map);
        q(this, "$root");
        q(this, "controls", []);
        q(this, "hiddenItemNamesForInit", []);
        q(this, "unsubscribing", {});
        q(this, "unsubscribes", {});
        q(this, "_fieldValuesCollection", new Map);
        q(this, "fieldData", {
            dependedItems: [],
            initialValues: {},
            errorMessages: {
                base: {}
            },
            validations: {}
        });
        q(this, "patternValidations", [["email", _e], ["phone", rt], ["phone:hyphen", at], ["alphabet", Je], ["alphanumeric", Qe], ["zenkaku", et], ["katakana", tt], ["hiragana", it], ["zipcode", st]]);
        q(this, "token", "");
        q(this, "formApi", null);
        Object.assign(this.config, r),
        Object.freeze(this.config),
        this.patternValidations.push(...e)
    }
    static async getFieldData(e) {
        try {
            return await (await fetch(e, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch(a => {
                throw new Error(a)
            }
            )).json()
        } catch {
            return {
                message: "ng"
            }
        }
    }
    static getCheckBoxRawValues(e, r) {
        return r.filter( (a, n) => e[n])
    }
    static formatHiddenItems(e, r) {
        return r.map(a => {
            const n = e.find( ({name: o}) => o === a);
            return n && n.type === "checkbox" ? n.options.data.map( (o, l) => `${a}[${l}]`) : n && n.type === "radio" ? n.options.data.map( () => `${a}`) : a
        }
        )
    }
    static setUnsubscribing(e) {
        return [...new Set(e)].reduce( (r, a, n) => (r[a] = !0,
        r), {})
    }
    static getCustomErrorMessage(e) {
        return function(r, a) {
            return /:/.test(a) ? e[`${r}.${a}`] || e[`${r}.${a.substring(0, a.indexOf(":"))}`] || e.base[a] || e.base[a.substring(0, a.indexOf(":"))] || e.base["*"] : e[`${r}.${a}`] || e.base[a] || e.base["*"]
        }
    }
    static setHiddenItemNames(e, r) {
        return e.map(a => {
            const n = r[a.controller];
            if (n) {
                if (a.show && a.show.indexOf(n) === -1 || a.hide && a.hide.indexOf(n) !== -1)
                    return a.targets
            } else {
                if (a.show)
                    return a.targets;
                if (a.hide)
                    return []
            }
        }
        ).filter(Boolean).flat()
    }
    static handleErrorMessage(e, r, a, n) {
        r && (a ? (e.setAttribute("aria-invalid", "true"),
        r.innerHTML = n,
        r.style.display = "block") : (e.removeAttribute("aria-invalid"),
        r.innerHTML = "",
        r.style.display = "none"))
    }
    static getOrderedValues(e, r) {
        return e.filter(a => !!r[a.name]).map(a => ({
            label: a.label,
            value: x.getValue(r[a.name], a)
        }))
    }
    static getValue(e, r) {
        var n;
        const a = (n = r == null ? void 0 : r.options) == null ? void 0 : n.data;
        return a ? r.type === "checkbox" ? x.getCheckBoxRawValues(e, a).map(o => o.value).join(", ") : a.filter(o => o.value === e).map(o => o.value).join(", ") : e
    }
    static getRawName(e) {
        return e.replace(/\[.*?]/g, "")
    }
    setEndPoint(e) {
        return `${this.config.ENDPOINT}/${e}`
    }
    validation(e, r) {
        const {validations: a, errorMessages: n} = r
          , o = {};
        return Object.keys(a).forEach(l => {
            if (this.unsubscribing[x.getRawName(l)] || !this.fieldItemsCollection.has(l))
                return;
            const c = this.fieldItemsCollection.get(l)
              , v = a[l]
              , i = e[l]
              , y = x.getCustomErrorMessage(n);
            if (v.indexOf("required") !== -1) {
                const g = y(l, "required");
                c.type === "checkbox" ? (!i || Array.isArray(i) && !i.some(b => b)) && (o[l] = [g]) : (!i || i && ot(String(i).trim())) && (o[l] = [g])
            }
            this.patternValidations.forEach(g => {
                if (!(!i || v.indexOf(g[0]) === -1) && !g[1].test(i)) {
                    const b = y(l, g[0]);
                    o[l] = [b]
                }
            }
            );
            const m = v.find(g => /^min/.test(g));
            if (i && m) {
                const g = m.substring(m.indexOf(":") + 1)
                  , b = y(l, m);
                nt(i, g) || (o[l] = [b])
            }
            const V = v.find(g => /^max/.test(g));
            if (i && V) {
                const g = V.substring(V.indexOf(":") + 1)
                  , b = y(l, V);
                ut(i, g) || (o[l] = [b])
            }
            const F = v.find(g => /^same/.test(g));
            if (i && F) {
                const g = F.substring(F.indexOf(":") + 1)
                  , b = y(l, F);
                i !== e[g] && (o[l] = [b])
            }
        }
        ),
        o
    }
    getFieldItemsData(e, r) {
        return [...e].map(a => {
            const n = a.dataset.field
              , o = a.querySelector(`[${this.config.FIELD_LABEL}]`).textContent
              , l = a.querySelector(`[${this.config.FIELD_CONTROL}]`)
              , c = l.tagName.toLowerCase()
              , v = c !== "input" ? c : l.type
              , i = {}
              , y = r.validations[n] ? r.validations[n] : [];
            return ["radio", "checkbox"].indexOf(v) !== -1 && (i.data = [...a.querySelectorAll(`[${this.config.FIELD_CONTROL}]`)].map(m => ({
                label: m.value,
                value: m.value
            }))),
            v === "select" && (i.data = [...l.querySelectorAll("option")].map(m => ({
                label: m.textContent,
                value: m.value
            }))),
            {
                name: n,
                validations: y,
                label: o,
                type: v,
                options: i
            }
        }
        )
    }
    registerField(e) {
        const {name: r, type: a} = e
          , n = x.getRawName(r)
          , o = e.closest(`[${this.config.FIELD}]`)
          , l = this.hiddenItemNamesForInit.indexOf(n);
        if (this.unsubscribing[n] || l !== -1) {
            this.unsubscribing[n] = !0,
            o.style.display = "none",
            this.hiddenItemNamesForInit.splice(l, 1);
            return
        }
        o.style.display = "";
        const c = (m, V) => {
            const {blur: F, change: g, focus: b} = V;
            m.getAttribute(this.config.FIELD_REGISTRATION) || (m.addEventListener("blur", () => F()),
            m.addEventListener("change", D => {
                const k = D.target;
                g(a === "checkbox" ? !!k.checked : k.value)
            }
            ),
            m.addEventListener("focus", () => b()),
            m.setAttribute(this.config.FIELD_REGISTRATION, "registered"))
        }
          , v = (m, V) => {
            const {value: F} = V;
            if (a === "checkbox") {
                const g = this.fieldData.initialValues[n];
                if (Array.isArray(g)) {
                    const b = parseInt(r.match(/\[(\d+)\]/)[1], 10);
                    m.checked = g[b] || !1
                } else
                    m.checked = !!g
            } else
                a === "radio" ? m.checked = F === m.value : m.value = F === void 0 ? "" : F
        }
          , i = {
            value: !0,
            error: !0,
            touched: !0
        }
          , y = this.formApi.registerField(r, m => {
            const {error: V, touched: F} = m;
            this.fieldData.initialValues[n] && v(e, m),
            c(e, m),
            x.handleErrorMessage(this.$root.querySelector(`[${this.config.FIELD}="${n}"] [${this.config.FIELD_CONTROL}]`), this.$root.querySelector(`[${this.config.FIELD_ERROR}="${n}"]`), F && V, !!V && V)
        }
        , i);
        this.unsubscribes[r] = () => {
            this.formApi.change(r, null),
            o.style.display = "none",
            e.removeAttribute(this.config.FIELD_REGISTRATION),
            y()
        }
    }
    toggleSubscription(e) {
        const r = Object.keys(e.values)
          , {dependedItems: a} = this.fieldData
          , n = (l, c, v) => {
            const i = a.filter( ({show: b}) => !!b).map( ({show: b}) => b).flat()
              , y = a.filter( ({hide: b}) => !!b).map( ({hide: b}) => b).flat()
              , V = [...this.$root.querySelector(`[${this.config.FIELD}="${v}"]`).querySelectorAll(`[${this.config.FIELD_CONTROL}]`)].map(b => ({
                label: "",
                value: b.value
            }))
              , F = x.getCheckBoxRawValues(l, V).map(b => b.value);
            let g = null;
            i.length ? g = F.some(b => i.indexOf(b) !== -1) : y.length && (g = !F.some(b => y.indexOf(b) !== -1)),
            g ? this.controls.filter( ({name: b}) => c.targets.indexOf(x.getRawName(b)) !== -1).forEach(b => {
                this.unsubscribing[x.getRawName(b.name)] = !1,
                this.registerField(b)
            }
            ) : c.targets.forEach(b => {
                const U = this.fieldItemsCollection.get(b);
                if (this.unsubscribing[x.getRawName(b)] = !0,
                U.type === "checkbox") {
                    U.options.data.forEach( (D, k) => {
                        this.unsubscribes[`${b}[${k}]`] && this.unsubscribes[`${b}[${k}]`]()
                    }
                    );
                    return
                }
                this.unsubscribes[b] && this.unsubscribes[b]()
            }
            )
        }
          , o = l => {
            function c(v, i) {
                return v.show ? v.show.indexOf(i) !== -1 : v.hide ? v.hide.indexOf(i) === -1 : !1
            }
            a.forEach(v => {
                if (v.show && v.hide)
                    throw "Duplicate shown and hide";
                c(v, l) ? this.controls.filter( ({name: m}) => v.targets.indexOf(m) !== -1).forEach(m => {
                    this.unsubscribing[x.getRawName(m.name)] = !1,
                    this.registerField(m)
                }
                ) : Object.keys(this.unsubscribes).filter(y => v.targets.indexOf(y) !== -1).forEach(y => {
                    this.unsubscribing[x.getRawName(y)] = !0,
                    this.unsubscribes[y] && this.unsubscribes[y]()
                }
                )
            }
            )
        }
        ;
        a.filter( ({controller: l}) => r.indexOf(l) !== -1).forEach(l => {
            const c = l.controller
              , v = e.values[c];
            Array.isArray(v) ? n(v, l, c) : o(v)
        }
        )
    }
    async send(e) {
        this.formatValues(e);
        const r = JSON.stringify({
            token: this.token,
            user_email: this._fieldValuesCollection.get(this.config.AUTO_REPLY_TARGET).value,
            values: Array.from(this._fieldValuesCollection).map(a => a[1]).filter(a => !!a.value)
        });
        return fetch(this.setEndPoint("send"), {
            method: "POST",
            headers: {
                "Content-Type": "Content-Type: application/json"
            },
            body: r
        })
    }
    get fieldValuesCollection() {
        return this._fieldValuesCollection
    }
    formatValues(e) {
        this.fieldItemsCollection.forEach( (r, a) => {
            let n = e[a];
            r.type === "checkbox" && (n = r.options.data.filter( (o, l) => e[a][l]).map( ({value: o}) => o).join(", ")),
            r.validations.some(o => o.indexOf("same") !== -1) || this.fieldValuesCollection.set(a, {
                label: r.label,
                value: n
            })
        }
        )
    }
    async build(e, {customInitialValues: r, onError: a, onValidate: n}) {
        try {
            const o = await x.getFieldData(this.setEndPoint("field_data"));
            if (!o.fieldData)
                throw new Error(o.message);
            Object.assign(this.fieldData, o.fieldData),
            this.token = o.token,
            this.$root = e,
            this.getFieldItemsData(this.$root.querySelectorAll(`[${this.config.FIELD}]`), this.fieldData).forEach(c => {
                this.fieldItemsCollection.set(c.name, c)
            }
            );
            const l = x.setHiddenItemNames(this.fieldData.dependedItems, this.fieldData.initialValues);
            this.hiddenItemNamesForInit.push(...l),
            Object.assign(this.unsubscribing, x.setUnsubscribing(l)),
            this.formApi = Ze({
                initialValues: (c => r ? (this.fieldData.initialValues = r(c),
                this.fieldData.initialValues) : c)(this.fieldData.initialValues),
                validateOnBlur: !0,
                onSubmit: c => this.send(c),
                validate: c => {
                    const v = this.validation(c, this.fieldData);
                    return n(v),
                    v
                }
            }),
            this.controls.push(...this.$root.querySelectorAll(`[${this.config.FIELD_CONTROL}]`)),
            this.controls.forEach(c => {
                this.registerField(c)
            }
            ),
            this.formApi.subscribe(c => {
                this.toggleSubscription(c)
            }
            , {
                dirty: !0,
                valid: !0,
                values: !0,
                submitSucceeded: !0
            })
        } catch (o) {
            a(o)
        }
    }
}
fe.data("formFields", () => {
    const s = new x({});
    return {
        fieldMode: "input",
        formattedValues: [],
        invalid: !1,
        disabled: !0,
        agreement: !1,
        processing: !1,
        async updateFieldMode(e) {
            this.fieldMode = e
        },
        async onConfirm() {
            const {invalid: e, values: r, errors: a} = s.formApi.getState();
            this.invalid = e,
            e || (s.formatValues(r),
            this.formattedValues = Array.from(s.fieldValuesCollection).map(n => n[1]).filter(n => !!n.value),
            this.updateFieldMode("confirm"))
        },
        async onSubmit() {
            this.processing = !0;
            try {
                const e = await s.formApi.submit()
                  , {invalid: r} = s.formApi.getState();
                if (this.invalid = r,
                !e || !e.ok) {
                    this.processing = !1;
                    return
                }
                (await e.json()).message === "ok" ? this.updateFieldMode("complete") : this.updateFieldMode("error")
            } catch {
                this.updateFieldMode("error")
            }
        },
        async init() {
            await s.build(this.$root, {
                customInitialValues(e) {
                    return {
                        ...e,
                        select: "Select1",
                        checkbox: [!0, !1, !0],
                        radio: "radio1",
                        name: "john doe",
                        email: "foo@example.com",
                        email_re: "foo@example.com",
                        tel: "09012341234",
                        message: `彼品質ニュース彼。戦略的屋根裏残るダイヤモンド細かいコミュニティニュース。
パーセント意図隠す拡張デッド。`
                    }
                },
                onError: e => {
                    this.updateFieldMode("error")
                }
                ,
                onValidate: e => {
                    this.invalid = Object.keys(e).length !== 0
                }
            })
        }
    }
}
);
