var Xn = Object.defineProperty;
var er = (t, e, n) => e in t ? Xn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var tt = (t, e, n) => (er(t, typeof e != "symbol" ? e + "" : e, n), n);
function tr(t) {
  return Object.keys(t).reduce((n, r) => {
    const s = t[r];
    return n[r] = Object.assign({}, s), vn(s.value) && !ir(s.value) && !Array.isArray(s.value) && (n[r].value = Object.assign({}, s.value)), Array.isArray(s.value) && (n[r].value = s.value.slice(0)), n;
  }, {});
}
function nr(t) {
  return t ? Object.keys(t).reduce((n, r) => {
    const s = t[r];
    return n[r] = vn(s) && "value" in s ? s : {
      value: s
    }, n[r].attribute || (n[r].attribute = ar(r)), n[r].parse = "parse" in n[r] ? n[r].parse : typeof n[r].value != "string", n;
  }, {}) : {};
}
function rr(t) {
  return Object.keys(t).reduce((n, r) => (n[r] = t[r].value, n), {});
}
function sr(t, e) {
  const n = tr(e);
  return Object.keys(e).forEach((s) => {
    const a = n[s], i = t.getAttribute(a.attribute), o = t[s];
    i && (a.value = a.parse ? yn(i) : i), o != null && (a.value = Array.isArray(o) ? o.slice(0) : o), a.reflect && Ht(t, a.attribute, a.value), Object.defineProperty(t, s, {
      get() {
        return a.value;
      },
      set(l) {
        const u = a.value;
        a.value = l, a.reflect && Ht(this, a.attribute, a.value);
        for (let c = 0, m = this.__propertyChangedCallbacks.length; c < m; c++)
          this.__propertyChangedCallbacks[c](s, l, u);
      },
      enumerable: !0,
      configurable: !0
    });
  }), n;
}
function yn(t) {
  if (!!t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function Ht(t, e, n) {
  if (n == null || n === !1)
    return t.removeAttribute(e);
  let r = JSON.stringify(n);
  t.__updating[e] = !0, r === "true" && (r = ""), t.setAttribute(e, r), Promise.resolve().then(() => delete t.__updating[e]);
}
function ar(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, n) => "-" + n.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function vn(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function ir(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function or(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let $t;
function lr(t, e) {
  const n = Object.keys(e);
  return class extends t {
    static get observedAttributes() {
      return n.map((s) => e[s].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = sr(this, e);
      const s = rr(this.props), a = this.Component, i = $t;
      try {
        $t = this, this.__initialized = !0, or(a) ? new a(s, {
          element: this
        }) : a(s, {
          element: this
        });
      } finally {
        $t = i;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let s = null;
      for (; s = this.__releaseCallbacks.pop(); )
        s(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(s, a, i) {
      if (!!this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in e)) {
        if (i == null && !this[s])
          return;
        this[s] = e[s].parse ? yn(i) : i;
      }
    }
    lookupProp(s) {
      if (!!e)
        return n.find((a) => s === a || s === e[a].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(s) {
      this.__releaseCallbacks.push(s);
    }
    addPropertyChangedCallback(s) {
      this.__propertyChangedCallbacks.push(s);
    }
  };
}
function cr(t, e = {}, n = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: s
  } = n;
  return (a) => {
    if (!t)
      throw new Error("tag is required to register a Component");
    let i = customElements.get(t);
    return i ? (i.prototype.Component = a, i) : (i = lr(r, nr(e)), i.prototype.Component = a, i.prototype.registeredTag = t, customElements.define(t, i, s), i);
  };
}
const Z = {};
function Re(t) {
  Z.context = t;
}
const ur = (t, e) => t === e, G = Symbol("solid-proxy"), Ot = Symbol("solid-track"), st = {
  equals: ur
};
let ue = null, _n = Tn;
const re = 1, at = 2, bn = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Ct = {};
var C = null;
let X = null, O = null, B = null, H = null, Vt = 0;
function Le(t, e) {
  const n = O, r = C, s = t.length === 0, a = s ? bn : {
    owned: null,
    cleanups: null,
    context: null,
    owner: e === void 0 ? r : e
  }, i = s ? t : () => t(() => D(() => kt(a)));
  C = a, O = null;
  try {
    return pe(i, !0);
  } finally {
    O = n, C = r;
  }
}
function I(t, e) {
  e = e ? Object.assign({}, st, e) : st;
  const n = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, r = (s) => (typeof s == "function" && (s = s(n.value)), En(n, s));
  return [Sn.bind(n), r];
}
function Jt(t, e, n) {
  const r = xt(t, e, !0, re);
  Ze(r);
}
function ee(t, e, n) {
  const r = xt(t, e, !1, re);
  Ze(r);
}
function Ae(t, e, n) {
  _n = vr;
  const r = xt(t, e, !1, re), s = $e && Xe(C, $e.id);
  s && (r.suspense = s), r.user = !0, H ? H.push(r) : Ze(r);
}
function K(t, e, n) {
  n = n ? Object.assign({}, st, n) : st;
  const r = xt(t, e, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, Ze(r), Sn.bind(r);
}
function he(t, e, n) {
  let r, s, a;
  arguments.length === 2 && typeof e == "object" || arguments.length === 1 ? (r = !0, s = t, a = e || {}) : (r = t, s = e, a = n || {});
  let i = null, o = Ct, l = null, u = !1, c = !1, m = "initialValue" in a, y = typeof r == "function" && K(r);
  const x = /* @__PURE__ */ new Set(), [h, $] = (a.storage || I)(a.initialValue), [N, P] = I(void 0), [_, R] = I(void 0, {
    equals: !1
  }), [z, se] = I(m ? "ready" : "unresolved");
  if (Z.context) {
    l = `${Z.context.id}${Z.context.count++}`;
    let j;
    a.ssrLoadFrom === "initial" ? o = a.initialValue : Z.load && (j = Z.load(l)) && (o = j[0]);
  }
  function ke(j, V, U, Pe) {
    return i === j && (i = null, m = !0, (j === o || V === o) && a.onHydrated && queueMicrotask(() => a.onHydrated(Pe, {
      value: V
    })), o = Ct, Qn(V, U)), V;
  }
  function Qn(j, V) {
    pe(() => {
      V === void 0 && $(() => j), se(V !== void 0 ? "errored" : "ready"), P(V);
      for (const U of x.keys())
        U.decrement();
      x.clear();
    }, !1);
  }
  function Et() {
    const j = $e && Xe(C, $e.id), V = h(), U = N();
    if (U !== void 0 && !i)
      throw U;
    return O && !O.user && j && Jt(() => {
      _(), i && (j.resolved && X && u ? X.promises.add(i) : x.has(j) || (j.increment(), x.add(j)));
    }), V;
  }
  function Tt(j = !0) {
    if (j !== !1 && c)
      return;
    c = !1;
    const V = y ? y() : r;
    if (u = X, V == null || V === !1) {
      ke(i, D(h));
      return;
    }
    const U = o !== Ct ? o : D(() => s(V, {
      value: h(),
      refetching: j
    }));
    return typeof U != "object" || !(U && "then" in U) ? (ke(i, U, void 0, V), U) : (i = U, c = !0, queueMicrotask(() => c = !1), pe(() => {
      se(m ? "refreshing" : "pending"), R();
    }, !1), U.then((Pe) => ke(U, Pe, void 0, V), (Pe) => ke(U, void 0, Cn(Pe), V)));
  }
  return Object.defineProperties(Et, {
    state: {
      get: () => z()
    },
    error: {
      get: () => N()
    },
    loading: {
      get() {
        const j = z();
        return j === "pending" || j === "refreshing";
      }
    },
    latest: {
      get() {
        if (!m)
          return Et();
        const j = N();
        if (j && !i)
          throw j;
        return h();
      }
    }
  }), y ? Jt(() => Tt(!1)) : Tt(!1), [Et, {
    refetch: Tt,
    mutate: $
  }];
}
function dr(t) {
  return pe(t, !1);
}
function D(t) {
  if (O === null)
    return t();
  const e = O;
  O = null;
  try {
    return t();
  } finally {
    O = e;
  }
}
function fr(t) {
  Ae(() => D(t));
}
function wn(t) {
  return C === null || (C.cleanups === null ? C.cleanups = [t] : C.cleanups.push(t)), t;
}
function xn(t) {
  ue || (ue = Symbol("error")), C === null || (C.context === null ? C.context = {
    [ue]: [t]
  } : C.context[ue] ? C.context[ue].push(t) : C.context[ue] = [t]);
}
function kn() {
  return O;
}
function M() {
  return C;
}
function hr(t) {
  H.push.apply(H, t), t.length = 0;
}
function wt(t, e) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: _r(n),
    defaultValue: t
  };
}
function zt(t) {
  let e;
  return (e = Xe(C, t.id)) !== void 0 ? e : t.defaultValue;
}
function pr(t) {
  const e = K(t), n = K(() => At(e()));
  return n.toArray = () => {
    const r = n();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, n;
}
let $e;
function mr() {
  return $e || ($e = wt({}));
}
function Sn() {
  const t = X;
  if (this.sources && (this.state || t))
    if (this.state === re || t)
      Ze(this);
    else {
      const e = B;
      B = null, pe(() => ot(this), !1), B = e;
    }
  if (O) {
    const e = this.observers ? this.observers.length : 0;
    O.sources ? (O.sources.push(this), O.sourceSlots.push(e)) : (O.sources = [this], O.sourceSlots = [e]), this.observers ? (this.observers.push(O), this.observerSlots.push(O.sources.length - 1)) : (this.observers = [O], this.observerSlots = [O.sources.length - 1]);
  }
  return this.value;
}
function En(t, e, n) {
  let r = t.value;
  return (!t.comparator || !t.comparator(r, e)) && (t.value = e, t.observers && t.observers.length && pe(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const a = t.observers[s], i = X && X.running;
      i && X.disposed.has(a), (i && !a.tState || !i && !a.state) && (a.pure ? B.push(a) : H.push(a), a.observers && $n(a)), i || (a.state = re);
    }
    if (B.length > 1e6)
      throw B = [], new Error();
  }, !1)), e;
}
function Ze(t) {
  if (!t.fn)
    return;
  kt(t);
  const e = C, n = O, r = Vt;
  O = C = t, gr(t, t.value, r), O = n, C = e;
}
function gr(t, e, n) {
  let r;
  try {
    r = t.fn(e);
  } catch (s) {
    t.pure && (t.state = re, t.owned && t.owned.forEach(kt), t.owned = null), Nn(s);
  }
  (!t.updatedAt || t.updatedAt <= n) && (t.updatedAt != null && "observers" in t ? En(t, r) : t.value = r, t.updatedAt = n);
}
function xt(t, e, n, r = re, s) {
  const a = {
    fn: t,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: C,
    context: null,
    pure: n
  };
  return C === null || C !== bn && (C.owned ? C.owned.push(a) : C.owned = [a]), a;
}
function it(t) {
  const e = X;
  if (t.state === 0 || e)
    return;
  if (t.state === at || e)
    return ot(t);
  if (t.suspense && D(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const n = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < Vt); )
    (t.state || e) && n.push(t);
  for (let r = n.length - 1; r >= 0; r--)
    if (t = n[r], t.state === re || e)
      Ze(t);
    else if (t.state === at || e) {
      const s = B;
      B = null, pe(() => ot(t, n[0]), !1), B = s;
    }
}
function pe(t, e) {
  if (B)
    return t();
  let n = !1;
  e || (B = []), H ? n = !0 : H = [], Vt++;
  try {
    const r = t();
    return yr(n), r;
  } catch (r) {
    n || (H = null), B = null, Nn(r);
  }
}
function yr(t) {
  if (B && (Tn(B), B = null), t)
    return;
  const e = H;
  H = null, e.length && pe(() => _n(e), !1);
}
function Tn(t) {
  for (let e = 0; e < t.length; e++)
    it(t[e]);
}
function vr(t) {
  let e, n = 0;
  for (e = 0; e < t.length; e++) {
    const r = t[e];
    r.user ? t[n++] = r : it(r);
  }
  for (Z.context && Re(), e = 0; e < n; e++)
    it(t[e]);
}
function ot(t, e) {
  const n = X;
  t.state = 0;
  for (let r = 0; r < t.sources.length; r += 1) {
    const s = t.sources[r];
    s.sources && (s.state === re || n ? s !== e && it(s) : (s.state === at || n) && ot(s, e));
  }
}
function $n(t) {
  const e = X;
  for (let n = 0; n < t.observers.length; n += 1) {
    const r = t.observers[n];
    (!r.state || e) && (r.state = at, r.pure ? B.push(r) : H.push(r), r.observers && $n(r));
  }
}
function kt(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const n = t.sources.pop(), r = t.sourceSlots.pop(), s = n.observers;
      if (s && s.length) {
        const a = s.pop(), i = n.observerSlots.pop();
        r < s.length && (a.sourceSlots[i] = r, s[r] = a, n.observerSlots[r] = i);
      }
    }
  if (t.owned) {
    for (e = 0; e < t.owned.length; e++)
      kt(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = 0; e < t.cleanups.length; e++)
      t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0, t.context = null;
}
function Cn(t) {
  return t instanceof Error || typeof t == "string" ? t : new Error("Unknown error");
}
function Yt(t, e) {
  for (const n of t)
    n(e);
}
function Nn(t) {
  t = Cn(t);
  const e = ue && Xe(C, ue);
  if (!e)
    throw t;
  H ? H.push({
    fn() {
      Yt(e, t);
    },
    state: re
  }) : Yt(e, t);
}
function Xe(t, e) {
  return t ? t.context && t.context[e] !== void 0 ? t.context[e] : Xe(t.owner, e) : void 0;
}
function At(t) {
  if (typeof t == "function" && !t.length)
    return At(t());
  if (Array.isArray(t)) {
    const e = [];
    for (let n = 0; n < t.length; n++) {
      const r = At(t[n]);
      Array.isArray(r) ? e.push.apply(e, r) : e.push(r);
    }
    return e;
  }
  return t;
}
function _r(t, e) {
  return function(r) {
    let s;
    return ee(() => s = D(() => (C.context = {
      [t]: r.value
    }, pr(() => r.children))), void 0), s;
  };
}
const br = Symbol("fallback");
function Gt(t) {
  for (let e = 0; e < t.length; e++)
    t[e]();
}
function wr(t, e, n = {}) {
  let r = [], s = [], a = [], i = 0, o = e.length > 1 ? [] : null;
  return wn(() => Gt(a)), () => {
    let l = t() || [], u, c;
    return l[Ot], D(() => {
      let y = l.length, x, h, $, N, P, _, R, z, se;
      if (y === 0)
        i !== 0 && (Gt(a), a = [], r = [], s = [], i = 0, o && (o = [])), n.fallback && (r = [br], s[0] = Le((ke) => (a[0] = ke, n.fallback())), i = 1);
      else if (i === 0) {
        for (s = new Array(y), c = 0; c < y; c++)
          r[c] = l[c], s[c] = Le(m);
        i = y;
      } else {
        for ($ = new Array(y), N = new Array(y), o && (P = new Array(y)), _ = 0, R = Math.min(i, y); _ < R && r[_] === l[_]; _++)
          ;
        for (R = i - 1, z = y - 1; R >= _ && z >= _ && r[R] === l[z]; R--, z--)
          $[z] = s[R], N[z] = a[R], o && (P[z] = o[R]);
        for (x = /* @__PURE__ */ new Map(), h = new Array(z + 1), c = z; c >= _; c--)
          se = l[c], u = x.get(se), h[c] = u === void 0 ? -1 : u, x.set(se, c);
        for (u = _; u <= R; u++)
          se = r[u], c = x.get(se), c !== void 0 && c !== -1 ? ($[c] = s[u], N[c] = a[u], o && (P[c] = o[u]), c = h[c], x.set(se, c)) : a[u]();
        for (c = _; c < y; c++)
          c in $ ? (s[c] = $[c], a[c] = N[c], o && (o[c] = P[c], o[c](c))) : s[c] = Le(m);
        s = s.slice(0, i = y), r = l.slice(0);
      }
      return s;
    });
    function m(y) {
      if (a[c] = y, o) {
        const [x, h] = I(c);
        return o[c] = h, e(l[c], x);
      }
      return e(l[c]);
    }
  };
}
function v(t, e) {
  return D(() => t(e || {}));
}
function nt() {
  return !0;
}
const Zt = {
  get(t, e, n) {
    return e === G ? n : t.get(e);
  },
  has(t, e) {
    return e === G ? !0 : t.has(e);
  },
  set: nt,
  deleteProperty: nt,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: nt,
      deleteProperty: nt
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function Nt(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function On(...t) {
  let e = !1;
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    e = e || !!s && G in s, t[r] = typeof s == "function" ? (e = !0, K(s)) : s;
  }
  if (e)
    return new Proxy({
      get(r) {
        for (let s = t.length - 1; s >= 0; s--) {
          const a = Nt(t[s])[r];
          if (a !== void 0)
            return a;
        }
      },
      has(r) {
        for (let s = t.length - 1; s >= 0; s--)
          if (r in Nt(t[s]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let s = 0; s < t.length; s++)
          r.push(...Object.keys(Nt(t[s])));
        return [...new Set(r)];
      }
    }, Zt);
  const n = {};
  for (let r = t.length - 1; r >= 0; r--)
    if (t[r]) {
      const s = Object.getOwnPropertyDescriptors(t[r]);
      for (const a in s)
        a in n || Object.defineProperty(n, a, {
          enumerable: !0,
          get() {
            for (let i = t.length - 1; i >= 0; i--) {
              const o = (t[i] || {})[a];
              if (o !== void 0)
                return o;
            }
          }
        });
    }
  return n;
}
function An(t, ...e) {
  const n = new Set(e.flat());
  if (G in t) {
    const s = e.map((a) => new Proxy({
      get(i) {
        return a.includes(i) ? t[i] : void 0;
      },
      has(i) {
        return a.includes(i) && i in t;
      },
      keys() {
        return a.filter((i) => i in t);
      }
    }, Zt));
    return s.push(new Proxy({
      get(a) {
        return n.has(a) ? void 0 : t[a];
      },
      has(a) {
        return n.has(a) ? !1 : a in t;
      },
      keys() {
        return Object.keys(t).filter((a) => !n.has(a));
      }
    }, Zt)), s;
  }
  const r = Object.getOwnPropertyDescriptors(t);
  return e.push(Object.keys(r).filter((s) => !n.has(s))), e.map((s) => {
    const a = {};
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      o in t && Object.defineProperty(a, o, r[o] ? r[o] : {
        get() {
          return t[o];
        },
        set() {
          return !0;
        },
        enumerable: !0
      });
    }
    return a;
  });
}
function xr(t) {
  const e = "fallback" in t && {
    fallback: () => t.fallback
  };
  return K(wr(() => t.each, t.children, e || void 0));
}
function oe(t) {
  let e = !1;
  const n = t.keyed, r = K(() => t.when, void 0, {
    equals: (s, a) => e ? s === a : !s == !a
  });
  return K(() => {
    const s = r();
    if (s) {
      const a = t.children, i = typeof a == "function" && a.length > 0;
      return e = n || i, i ? D(() => a(s)) : a;
    }
    return t.fallback;
  }, void 0, void 0);
}
const kr = wt();
function Ut(t) {
  let e = 0, n, r, s, a, i;
  const [o, l] = I(!1), u = mr(), c = {
    increment: () => {
      ++e === 1 && l(!0);
    },
    decrement: () => {
      --e === 0 && l(!1);
    },
    inFallback: o,
    effects: [],
    resolved: !1
  }, m = M();
  if (Z.context && Z.load) {
    const h = Z.context.id + Z.context.count;
    let $ = Z.load(h);
    if ($ && (s = $[0]) && s !== "$$f") {
      (typeof s != "object" || !("then" in s)) && (s = Promise.resolve(s));
      const [N, P] = I(void 0, {
        equals: !1
      });
      a = N, s.then((_) => {
        if (_ || Z.done)
          return _ && (i = _), P();
        Z.gather(h), Re(r), P(), Re();
      });
    }
  }
  const y = zt(kr);
  y && (n = y.register(c.inFallback));
  let x;
  return wn(() => x && x()), v(u.Provider, {
    value: c,
    get children() {
      return K(() => {
        if (i)
          throw i;
        if (r = Z.context, a)
          return a(), a = void 0;
        r && s === "$$f" && Re();
        const h = K(() => t.children);
        return K(($) => {
          const N = c.inFallback(), {
            showContent: P = !0,
            showFallback: _ = !0
          } = n ? n() : {};
          if ((!N || s && s !== "$$f") && P)
            return c.resolved = !0, x && x(), x = r = s = void 0, hr(c.effects), h();
          if (!!_)
            return x ? $ : Le((R) => (x = R, r && (Re({
              id: r.id + "f",
              count: 0
            }), r = void 0), t.fallback), m);
        });
      });
    }
  });
}
const Sr = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], Er = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Sr]), Tr = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), $r = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Qt = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly"
}), Cr = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), Nr = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function Or(t, e, n) {
  let r = n.length, s = e.length, a = r, i = 0, o = 0, l = e[s - 1].nextSibling, u = null;
  for (; i < s || o < a; ) {
    if (e[i] === n[o]) {
      i++, o++;
      continue;
    }
    for (; e[s - 1] === n[a - 1]; )
      s--, a--;
    if (s === i) {
      const c = a < r ? o ? n[o - 1].nextSibling : n[a - o] : l;
      for (; o < a; )
        t.insertBefore(n[o++], c);
    } else if (a === o)
      for (; i < s; )
        (!u || !u.has(e[i])) && e[i].remove(), i++;
    else if (e[i] === n[a - 1] && n[o] === e[s - 1]) {
      const c = e[--s].nextSibling;
      t.insertBefore(n[o++], e[i++].nextSibling), t.insertBefore(n[--a], c), e[s] = n[a];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let m = o;
        for (; m < a; )
          u.set(n[m], m++);
      }
      const c = u.get(e[i]);
      if (c != null)
        if (o < c && c < a) {
          let m = i, y = 1, x;
          for (; ++m < s && m < a && !((x = u.get(e[m])) == null || x !== c + y); )
            y++;
          if (y > c - o) {
            const h = e[i];
            for (; o < c; )
              t.insertBefore(n[o++], h);
          } else
            t.replaceChild(n[o++], e[i++]);
        } else
          i++;
      else
        e[i++].remove();
    }
  }
}
const Xt = "_$DX_DELEGATE";
function L(t, e, n) {
  const r = document.createElement("template");
  r.innerHTML = t;
  let s = r.content.firstChild;
  return n && (s = s.firstChild), s;
}
function Ar(t, e = window.document) {
  const n = e[Xt] || (e[Xt] = /* @__PURE__ */ new Set());
  for (let r = 0, s = t.length; r < s; r++) {
    const a = t[r];
    n.has(a) || (n.add(a), e.addEventListener(a, Vr));
  }
}
function F(t, e, n) {
  n == null ? t.removeAttribute(e) : t.setAttribute(e, n);
}
function Zr(t, e, n, r) {
  r == null ? t.removeAttributeNS(e, n) : t.setAttributeNS(e, n, r);
}
function jr(t, e) {
  e == null ? t.removeAttribute("class") : t.className = e;
}
function Pr(t, e, n, r) {
  if (r)
    Array.isArray(n) ? (t[`$$${e}`] = n[0], t[`$$${e}Data`] = n[1]) : t[`$$${e}`] = n;
  else if (Array.isArray(n)) {
    const s = n[0];
    t.addEventListener(e, n[0] = (a) => s.call(t, n[1], a));
  } else
    t.addEventListener(e, n);
}
function Rr(t, e, n = {}) {
  const r = Object.keys(e || {}), s = Object.keys(n);
  let a, i;
  for (a = 0, i = s.length; a < i; a++) {
    const o = s[a];
    !o || o === "undefined" || e[o] || (en(t, o, !1), delete n[o]);
  }
  for (a = 0, i = r.length; a < i; a++) {
    const o = r[a], l = !!e[o];
    !o || o === "undefined" || n[o] === l || !l || (en(t, o, !0), n[o] = l);
  }
  return n;
}
function Ir(t, e, n) {
  if (!e)
    return n ? F(t, "style") : e;
  const r = t.style;
  if (typeof e == "string")
    return r.cssText = e;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), e || (e = {});
  let s, a;
  for (a in n)
    e[a] == null && r.removeProperty(a), delete n[a];
  for (a in e)
    s = e[a], s !== n[a] && (r.setProperty(a, s), n[a] = s);
  return n;
}
function Zn(t, e = {}, n, r) {
  const s = {};
  return r || ee(() => s.children = Ce(t, e.children, s.children)), ee(() => e.ref && e.ref(t)), ee(() => Mr(t, e, n, !0, s, !0)), s;
}
function Lr(t, e, n) {
  return D(() => t(e, n));
}
function E(t, e, n, r) {
  if (n !== void 0 && !r && (r = []), typeof e != "function")
    return Ce(t, e, r, n);
  ee((s) => Ce(t, e(), s, n), r);
}
function Mr(t, e, n, r, s = {}, a = !1) {
  e || (e = {});
  for (const i in s)
    if (!(i in e)) {
      if (i === "children")
        continue;
      s[i] = tn(t, i, null, s[i], n, a);
    }
  for (const i in e) {
    if (i === "children") {
      r || Ce(t, e.children);
      continue;
    }
    const o = e[i];
    s[i] = tn(t, i, o, s[i], n, a);
  }
}
function Dr(t) {
  return t.toLowerCase().replace(/-([a-z])/g, (e, n) => n.toUpperCase());
}
function en(t, e, n) {
  const r = e.trim().split(/\s+/);
  for (let s = 0, a = r.length; s < a; s++)
    t.classList.toggle(r[s], n);
}
function tn(t, e, n, r, s, a) {
  let i, o, l;
  if (e === "style")
    return Ir(t, n, r);
  if (e === "classList")
    return Rr(t, n, r);
  if (n === r)
    return r;
  if (e === "ref")
    a || n(t);
  else if (e.slice(0, 3) === "on:") {
    const u = e.slice(3);
    r && t.removeEventListener(u, r), n && t.addEventListener(u, n);
  } else if (e.slice(0, 10) === "oncapture:") {
    const u = e.slice(10);
    r && t.removeEventListener(u, r, !0), n && t.addEventListener(u, n, !0);
  } else if (e.slice(0, 2) === "on") {
    const u = e.slice(2).toLowerCase(), c = Cr.has(u);
    if (!c && r) {
      const m = Array.isArray(r) ? r[0] : r;
      t.removeEventListener(u, m);
    }
    (c || n) && (Pr(t, u, n, c), c && Ar([u]));
  } else if ((l = Tr.has(e)) || !s && (Qt[e] || (o = Er.has(e))) || (i = t.nodeName.includes("-")))
    e === "class" || e === "className" ? jr(t, n) : i && !o && !l ? t[Dr(e)] = n : t[Qt[e] || e] = n;
  else {
    const u = s && e.indexOf(":") > -1 && Nr[e.split(":")[0]];
    u ? Zr(t, u, e, n) : F(t, $r[e] || e, n);
  }
  return n;
}
function Vr(t) {
  const e = `$$${t.type}`;
  let n = t.composedPath && t.composedPath()[0] || t.target;
  for (t.target !== n && Object.defineProperty(t, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(t, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), Z.registry && !Z.done && (Z.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
    for (; r && r.nodeType !== 8 && r.nodeValue !== "pl-" + t; ) {
      let s = r.nextSibling;
      r.remove(), r = s;
    }
    r && r.remove();
  })); n; ) {
    const r = n[e];
    if (r && !n.disabled) {
      const s = n[`${e}Data`];
      if (s !== void 0 ? r.call(n, s, t) : r.call(n, t), t.cancelBubble)
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function Ce(t, e, n, r, s) {
  for (Z.context && !n && (n = [...t.childNodes]); typeof n == "function"; )
    n = n();
  if (e === n)
    return n;
  const a = typeof e, i = r !== void 0;
  if (t = i && n[0] && n[0].parentNode || t, a === "string" || a === "number") {
    if (Z.context)
      return n;
    if (a === "number" && (e = e.toString()), i) {
      let o = n[0];
      o && o.nodeType === 3 ? o.data = e : o = document.createTextNode(e), n = Se(t, n, r, o);
    } else
      n !== "" && typeof n == "string" ? n = t.firstChild.data = e : n = t.textContent = e;
  } else if (e == null || a === "boolean") {
    if (Z.context)
      return n;
    n = Se(t, n, r);
  } else {
    if (a === "function")
      return ee(() => {
        let o = e();
        for (; typeof o == "function"; )
          o = o();
        n = Ce(t, o, n, r);
      }), () => n;
    if (Array.isArray(e)) {
      const o = [], l = n && Array.isArray(n);
      if (jt(o, e, n, s))
        return ee(() => n = Ce(t, o, n, r, !0)), () => n;
      if (Z.context) {
        if (!o.length)
          return n;
        for (let u = 0; u < o.length; u++)
          if (o[u].parentNode)
            return n = o;
      }
      if (o.length === 0) {
        if (n = Se(t, n, r), i)
          return n;
      } else
        l ? n.length === 0 ? nn(t, o, r) : Or(t, n, o) : (n && Se(t), nn(t, o));
      n = o;
    } else if (e instanceof Node) {
      if (Z.context && e.parentNode)
        return n = i ? [e] : e;
      if (Array.isArray(n)) {
        if (i)
          return n = Se(t, n, r, e);
        Se(t, n, null, e);
      } else
        n == null || n === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      n = e;
    }
  }
  return n;
}
function jt(t, e, n, r) {
  let s = !1;
  for (let a = 0, i = e.length; a < i; a++) {
    let o = e[a], l = n && n[a];
    if (o instanceof Node)
      t.push(o);
    else if (!(o == null || o === !0 || o === !1))
      if (Array.isArray(o))
        s = jt(t, o, l) || s;
      else if (typeof o == "function")
        if (r) {
          for (; typeof o == "function"; )
            o = o();
          s = jt(t, Array.isArray(o) ? o : [o], Array.isArray(l) ? l : [l]) || s;
        } else
          t.push(o), s = !0;
      else {
        const u = String(o);
        l && l.nodeType === 3 && l.data === u ? t.push(l) : t.push(document.createTextNode(u));
      }
  }
  return s;
}
function nn(t, e, n = null) {
  for (let r = 0, s = e.length; r < s; r++)
    t.insertBefore(e[r], n);
}
function Se(t, e, n, r) {
  if (n === void 0)
    return t.textContent = "";
  const s = r || document.createTextNode("");
  if (e.length) {
    let a = !1;
    for (let i = e.length - 1; i >= 0; i--) {
      const o = e[i];
      if (s !== o) {
        const l = o.parentNode === t;
        !a && !i ? l ? t.replaceChild(s, o) : t.insertBefore(s, n) : l && o.remove();
      } else
        a = !0;
    }
  } else
    t.insertBefore(s, n);
  return [s];
}
function zr(t) {
  const e = Object.keys(t), n = {};
  for (let r = 0; r < e.length; r++) {
    const [s, a] = I(t[e[r]]);
    Object.defineProperty(n, e[r], {
      get: s,
      set(i) {
        a(() => i);
      }
    });
  }
  return n;
}
function Ur(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function Br(t) {
  return (e, n) => {
    const { element: r } = n;
    return Le((s) => {
      const a = zr(e);
      r.addPropertyChangedCallback((o, l) => a[o] = l), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", s();
      });
      const i = t(a, n);
      return E(r.renderRoot, i);
    }, Ur(r));
  };
}
function qr(t, e, n) {
  return arguments.length === 2 && (n = e, e = {}), cr(t, e)(Br(n));
}
const Pt = Symbol("store-raw"), Me = Symbol("store-node"), Kr = Symbol("store-name");
function jn(t, e) {
  let n = t[G];
  if (!n && (Object.defineProperty(t, G, {
    value: n = new Proxy(t, Hr)
  }), !Array.isArray(t))) {
    const r = Object.keys(t), s = Object.getOwnPropertyDescriptors(t);
    for (let a = 0, i = r.length; a < i; a++) {
      const o = r[a];
      s[o].get && Object.defineProperty(t, o, {
        enumerable: s[o].enumerable,
        get: s[o].get.bind(n)
      });
    }
  }
  return n;
}
function lt(t) {
  let e;
  return t != null && typeof t == "object" && (t[G] || !(e = Object.getPrototypeOf(t)) || e === Object.prototype || Array.isArray(t));
}
function De(t, e = /* @__PURE__ */ new Set()) {
  let n, r, s, a;
  if (n = t != null && t[Pt])
    return n;
  if (!lt(t) || e.has(t))
    return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? t = t.slice(0) : e.add(t);
    for (let i = 0, o = t.length; i < o; i++)
      s = t[i], (r = De(s, e)) !== s && (t[i] = r);
  } else {
    Object.isFrozen(t) ? t = Object.assign({}, t) : e.add(t);
    const i = Object.keys(t), o = Object.getOwnPropertyDescriptors(t);
    for (let l = 0, u = i.length; l < u; l++)
      a = i[l], !o[a].get && (s = t[a], (r = De(s, e)) !== s && (t[a] = r));
  }
  return t;
}
function Bt(t) {
  let e = t[Me];
  return e || Object.defineProperty(t, Me, {
    value: e = {}
  }), e;
}
function Rt(t, e, n) {
  return t[e] || (t[e] = Rn(n));
}
function Wr(t, e) {
  const n = Reflect.getOwnPropertyDescriptor(t, e);
  return !n || n.get || !n.configurable || e === G || e === Me || e === Kr || (delete n.value, delete n.writable, n.get = () => t[G][e]), n;
}
function Pn(t) {
  if (kn()) {
    const e = Bt(t);
    (e._ || (e._ = Rn()))();
  }
}
function Fr(t) {
  return Pn(t), Reflect.ownKeys(t);
}
function Rn(t) {
  const [e, n] = I(t, {
    equals: !1,
    internal: !0
  });
  return e.$ = n, e;
}
const Hr = {
  get(t, e, n) {
    if (e === Pt)
      return t;
    if (e === G)
      return n;
    if (e === Ot)
      return Pn(t), n;
    const r = Bt(t), s = r.hasOwnProperty(e);
    let a = s ? r[e]() : t[e];
    if (e === Me || e === "__proto__")
      return a;
    if (!s) {
      const i = Object.getOwnPropertyDescriptor(t, e);
      kn() && (typeof a != "function" || t.hasOwnProperty(e)) && !(i && i.get) && (a = Rt(r, e, a)());
    }
    return lt(a) ? jn(a) : a;
  },
  has(t, e) {
    return e === Pt || e === G || e === Ot || e === Me || e === "__proto__" ? !0 : (this.get(t, e, t), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Fr,
  getOwnPropertyDescriptor: Wr
};
function ct(t, e, n, r = !1) {
  if (!r && t[e] === n)
    return;
  const s = t[e], a = t.length;
  n === void 0 ? delete t[e] : t[e] = n;
  let i = Bt(t), o;
  (o = Rt(i, e, s)) && o.$(() => n), Array.isArray(t) && t.length !== a && (o = Rt(i, "length", a)) && o.$(t.length), (o = i._) && o.$();
}
function In(t, e) {
  const n = Object.keys(e);
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    ct(t, s, e[s]);
  }
}
function Jr(t, e) {
  if (typeof e == "function" && (e = e(t)), e = De(e), Array.isArray(e)) {
    if (t === e)
      return;
    let n = 0, r = e.length;
    for (; n < r; n++) {
      const s = e[n];
      t[n] !== s && ct(t, n, s);
    }
    ct(t, "length", r);
  } else
    In(t, e);
}
function Ie(t, e, n = []) {
  let r, s = t;
  if (e.length > 1) {
    r = e.shift();
    const i = typeof r, o = Array.isArray(t);
    if (Array.isArray(r)) {
      for (let l = 0; l < r.length; l++)
        Ie(t, [r[l]].concat(e), n);
      return;
    } else if (o && i === "function") {
      for (let l = 0; l < t.length; l++)
        r(t[l], l) && Ie(t, [l].concat(e), n);
      return;
    } else if (o && i === "object") {
      const {
        from: l = 0,
        to: u = t.length - 1,
        by: c = 1
      } = r;
      for (let m = l; m <= u; m += c)
        Ie(t, [m].concat(e), n);
      return;
    } else if (e.length > 1) {
      Ie(t[r], e, [r].concat(n));
      return;
    }
    s = t[r], n = [r].concat(n);
  }
  let a = e[0];
  typeof a == "function" && (a = a(s, n), a === s) || r === void 0 && a == null || (a = De(a), r === void 0 || lt(s) && lt(a) && !Array.isArray(a) ? In(s, a) : ct(t, r, a));
}
function xe(...[t, e]) {
  const n = De(t || {}), r = Array.isArray(n), s = jn(n);
  function a(...i) {
    dr(() => {
      r && i.length === 1 ? Jr(n, i[0]) : Ie(n, i);
    });
  }
  return [s, a];
}
var It = (t, e, n) => {
  const r = e.trim().split(".").reduce((s, a) => s ? s[a] : void 0, t);
  return r !== void 0 ? r : n;
}, Yr = (t, e, n = /{{(.*?)}}/g) => t.replace(n, (r, s) => It(e, s, "")), Gr = (t = {}, e = navigator.language in t ? navigator.language : Object.keys(t)[0]) => {
  const [n, r] = I(e), [s, a] = xe(t);
  return [(l, u, c) => {
    const m = It(s[n()], l, c || "");
    return typeof m == "function" ? m(u) : typeof m == "string" ? Yr(m, u || {}) : m;
  }, {
    add(l, u) {
      a(l, (c) => Object.assign(c || {}, u));
    },
    locale: (l) => l ? r(l) : n(),
    dict: (l) => It(s, l)
  }];
}, Ln = wt({}), ye = () => zt(Ln);
const Qr = `:where(html){line-height:1.15}:where(h1){font-size:2em;margin-block-end:.67em;margin-block-start:.67em}:where(dl,ol,ul) :where(dl,ol,ul){margin-block-end:0;margin-block-start:0}:where(hr){box-sizing:content-box;color:inherit;height:0}:where(pre){font-family:monospace,monospace;font-size:1em}:where(abbr[title]){text-decoration:underline;text-decoration:underline dotted}:where(b,strong){font-weight:bolder}:where(code,kbd,samp){font-family:monospace,monospace;font-size:1em}:where(small){font-size:80%}:where(table){border-color:currentColor;text-indent:0}:where(button,input,select){margin:0}:where(button){text-transform:none}:where(button,input:is([type="button" i],[type="reset" i],[type="submit" i])){-webkit-appearance:button}:where(progress){vertical-align:baseline}:where(select){text-transform:none}:where(textarea){margin:0}:where(input[type="search" i]){-webkit-appearance:textfield;outline-offset:-2px}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}:where(button,input:is([type="button" i],[type="color" i],[type="reset" i],[type="submit" i]))::-moz-focus-inner{border-style:none;padding:0}:where(button,input:is([type="button" i],[type="color" i],[type="reset" i],[type="submit" i]))::-moz-focusring{outline:1px dotted ButtonText}:where(:-moz-ui-invalid){box-shadow:none}:where(dialog){background-color:#fff;border:solid;color:#000;height:-moz-fit-content;height:fit-content;left:0;margin:auto;padding:1em;position:absolute;right:0;width:-moz-fit-content;width:fit-content}:where(dialog:not([open])){display:none}:where(summary){display:list-item}
`, Xr = `main.app{background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-200);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.top-bar h1{text-align:center}.top-bar menu{display:flex;justify-content:space-around;column-gap:10px}.loading{text-align:center}sl-icon.rotate{animation:turn 1s infinite linear}@keyframes turn{0%{transform:rotate(0)}to{transform:rotate(180deg)}}sl-button{margin-right:1rem}sl-tab>sl-icon{margin-right:.5rem}form [data-invalid]::part(base){border-color:var(--sl-color-danger-600)}form .form-error{padding:1rem;margin-bottom:1rem;background-color:var(--sl-color-orange-50);border-color:var(--sl-color-orange-200);border-radius:10px;border-style:solid;border-width:2px}form .field{margin:0rem .2rem 1rem}form .field>.error{display:flex;column-gap:.2rem;padding:.5rem 0;color:var(--sl-color-danger-600)}
`, es = "E-post adresse", ts = "Passord", ns = "Profil", rs = "Konto", ss = "Kontakt", as = "Lagre", is = "Adresse", os = "Telefonnummer", ls = "Avtale", rn = {
  "Sign up": "Opprett konto",
  "Sign in": "Logg inn",
  "Sign out": "Logg ut",
  Email: es,
  Password: ts,
  Profile: ns,
  Account: rs,
  Contact: ss,
  Save: as,
  "First name": "Fornavn",
  "Last name": "Etternavn",
  Address: is,
  Phone: os,
  "My membership": "Mitt medlemskap",
  Subscription: ls,
  "Failed signing up": "Kunne ikke opprette konto",
  "Failed signing in": "Kunne ikke logge inn",
  "Did you type your password and email correct?": "Har du skrevet riktig passord og e-post-adresse?",
  "Did you already sign up?": "Har du allerede registrert deg?",
  "Error saving": "Kunne ikke lagre",
  "Must be a valid email address": "Ugyldig adresse",
  "Must be a valid name": "Ugyldig navn",
  "Must be a valid street address": "Ugyldig adresse"
}, Mn = [{
  code: "no",
  name: "norsk",
  dict: rn
}, {
  code: "en",
  name: "english",
  dict: Object.keys(rn).reduce((t, e) => ({
    ...t,
    [e]: e
  }), [])
}], cs = Mn.reduce((t, {
  code: e,
  dict: n
}) => ({
  ...t,
  [e]: n
}), {}), sn = Mn.map(({
  code: t,
  name: e
}) => ({
  code: t,
  name: e
})), us = (t) => v(Ln.Provider, {
  get value() {
    return Gr(cs);
  },
  get children() {
    return t.children;
  }
}), ds = (t) => {
  let e = t;
  for (; e.length === 1; )
    e = e[0];
  return e;
}, qt = (...t) => {
};
I(void 0, {
  equals: !1
});
class Kt extends Error {
  constructor() {
    super(...arguments);
    tt(this, "name", "AuthenticationError");
  }
}
class an extends Error {
  constructor() {
    super(...arguments);
    tt(this, "name", "RecordError");
  }
}
class fs extends Error {
  constructor() {
    super(...arguments);
    tt(this, "name", "ServiceError");
  }
}
const Dn = (t, e) => {
  const { headers: n, ok: r, redirected: s, status: a, statusText: i, type: o, url: l } = t;
  return {
    headers: n,
    ok: r,
    redirected: s,
    status: a,
    statusText: i,
    type: o,
    url: l,
    ...e
  };
}, Vn = async (t, e, { headers: n = {}, body: r = {} } = {}) => {
  const s = new URL(`${t}/${e}`);
  s.pathname = s.pathname.replace("//", "/");
  const a = await fetch(s, {
    method: "POST",
    headers: {
      ...n,
      Accept: "application/json"
    },
    body: typeof r == "string" ? r : JSON.stringify(r)
  });
  if (a.status >= 500)
    throw new fs(
      `Error fetching ${a.url}: ${a.status} - ${a.statusText}`
    );
  return a;
}, on = async (t, e) => {
  const n = await Vn(t.datapoint, e.method, {
    body: {
      email: e.email,
      pass: e.pass,
      ns: t.namespace,
      db: t.database,
      sc: t.scope
    }
  }), r = await n.json();
  if (!n.ok)
    throw new Kt(r.details);
  return {
    meta: Dn(n),
    data: r
  };
}, ln = async (t, e, n) => {
  const r = await Vn(t.datapoint, "sql", {
    headers: {
      NS: t.namespace,
      DB: t.database,
      Authorization: `Bearer ${n}`
    },
    body: e
  }), s = await r.json();
  if (!r.ok)
    throw r.status === 403 ? new Kt(s.details) : new an(s.details);
  const a = s.map((i) => {
    if (i.status === "ERR")
      throw new an(i.detail);
    return i.result;
  });
  return console.log("Awaiting", e), new Promise(
    (i) => setTimeout(() => {
      console.log("Resovled", e), i({
        meta: Dn(r, { query: e }),
        data: ds(a)
      });
    }, 500)
  );
}, cn = () => ({
  token: "",
  userId: ""
}), hs = ({ conn: t }) => {
  const [e, n] = xe(cn()), r = ({ token: a }) => {
    n("token", a), console.log("Writing token to localStorage:", a), localStorage.accessToken = a;
  };
  return fr(() => {
    const a = localStorage.accessToken;
    a && (console.log("Reading token from localStorage:", a), n("token", a));
  }), {
    state: e,
    authenticated: () => !!e.userId,
    async signup(a) {
      const { data: i } = await on(t, {
        ...a,
        method: "signup"
      });
      r(i);
    },
    async signin(a) {
      const { data: i } = await on(t, {
        ...a,
        method: "signin"
      });
      r(i);
    },
    async loadDetails() {
      const { data: a } = await ln(
        t,
        "SELECT id FROM account;",
        e.token
      );
      n("userId", a.id);
    },
    async signout() {
      delete localStorage.accessToken, delete localStorage.activePanel, n(cn());
    },
    query: (a) => ln(t, a, e.token)
  };
}, un = () => ({
  email: ""
}), ps = ({ auth: t }) => {
  const [e, n] = xe(un());
  return {
    state: e,
    async resetState() {
      n(un());
    },
    async loadDetails() {
      const { data: r } = await t.query("SELECT email FROM account;");
      n("email", r.email);
    },
    async updateDetails(r) {
      await t.query(
        `UPDATE ${t.state.userId} MERGE ${JSON.stringify(r)} RETURN NONE`
      ), n(r);
    }
  };
}, dn = () => ({
  firstName: "",
  lastName: "",
  address: "",
  phone: ""
}), ms = ({ auth: t }) => {
  const [e, n] = xe(dn());
  return {
    state: e,
    resetState() {
      n(dn());
    },
    async loadDetails() {
      const { data: r } = await t.query(
        "SELECT owner, firstName, lastName, address, phone FROM profile;"
      );
      n(r);
    },
    async updateDetails(r) {
      await t.query(
        `UPDATE profile MERGE ${JSON.stringify(r)} RETURN NONE`
      ), n(r);
    }
  };
}, zn = wt(), gs = (t) => {
  const e = hs({
    conn: {
      namespace: t.namespace,
      database: t.database,
      scope: t.scope,
      datapoint: t.datapoint
    }
  }), n = ps({
    auth: e
  }), r = ms({
    auth: e
  }), s = {
    auth: e,
    account: n,
    profile: r
  };
  return Ae(() => {
    e.authenticated() || (n.resetState(), r.resetState());
  }), v(zn.Provider, {
    value: s,
    get children() {
      return t.children;
    }
  });
}, je = () => zt(zn);
var T;
(function(t) {
  t.assertEqual = (s) => s;
  function e(s) {
  }
  t.assertIs = e;
  function n(s) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (s) => {
    const a = {};
    for (const i of s)
      a[i] = i;
    return a;
  }, t.getValidEnumValues = (s) => {
    const a = t.objectKeys(s).filter((o) => typeof s[s[o]] != "number"), i = {};
    for (const o of a)
      i[o] = s[o];
    return t.objectValues(i);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(a) {
    return s[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && a.push(i);
    return a;
  }, t.find = (s, a) => {
    for (const i of s)
      if (a(i))
        return i;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function r(s, a = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(T || (T = {}));
const f = T.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), de = (t) => {
  switch (typeof t) {
    case "undefined":
      return f.undefined;
    case "string":
      return f.string;
    case "number":
      return isNaN(t) ? f.nan : f.number;
    case "boolean":
      return f.boolean;
    case "function":
      return f.function;
    case "bigint":
      return f.bigint;
    case "symbol":
      return f.symbol;
    case "object":
      return Array.isArray(t) ? f.array : t === null ? f.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? f.promise : typeof Map < "u" && t instanceof Map ? f.map : typeof Set < "u" && t instanceof Set ? f.set : typeof Date < "u" && t instanceof Date ? f.date : f.object;
    default:
      return f.unknown;
  }
}, d = T.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), ys = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class ae extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const n = e || function(a) {
      return a.message;
    }, r = { _errors: [] }, s = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(s);
        else if (i.code === "invalid_return_type")
          s(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          s(i.argumentsError);
        else if (i.path.length === 0)
          r._errors.push(n(i));
        else {
          let o = r, l = 0;
          for (; l < i.path.length; ) {
            const u = i.path[l];
            l === i.path.length - 1 ? (o[u] = o[u] || { _errors: [] }, o[u]._errors.push(n(i))) : o[u] = o[u] || { _errors: [] }, o = o[u], l++;
          }
        }
    };
    return s(this), r;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, T.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const s of this.issues)
      s.path.length > 0 ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(e(s))) : r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
ae.create = (t) => new ae(t);
const Ve = (t, e) => {
  let n;
  switch (t.code) {
    case d.invalid_type:
      t.received === f.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case d.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, T.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${T.joinValues(t.keys, ", ")}`;
      break;
    case d.invalid_union:
      n = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${T.joinValues(t.options)}`;
      break;
    case d.invalid_enum_value:
      n = `Invalid enum value. Expected ${T.joinValues(t.options)}, received '${t.received}'`;
      break;
    case d.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      n = "Invalid function return type";
      break;
    case d.invalid_date:
      n = "Invalid date";
      break;
    case d.invalid_string:
      typeof t.validation == "object" ? "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : T.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case d.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(t.minimum)}` : n = "Invalid input";
      break;
    case d.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(t.maximum)}` : n = "Invalid input";
      break;
    case d.custom:
      n = "Invalid input";
      break;
    case d.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case d.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, T.assertNever(t);
  }
  return { message: n };
};
let Un = Ve;
function vs(t) {
  Un = t;
}
function ut() {
  return Un;
}
const dt = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: s } = t, a = [...n, ...s.path || []], i = {
    ...s,
    path: a
  };
  let o = "";
  const l = r.filter((u) => !!u).slice().reverse();
  for (const u of l)
    o = u(i, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: a,
    message: s.message || o
  };
}, _s = [];
function p(t, e) {
  const n = dt({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      ut(),
      Ve
    ].filter((r) => !!r)
  });
  t.common.issues.push(n);
}
class W {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted")
        return b;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n)
      r.push({
        key: await s.key,
        value: await s.value
      });
    return W.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: a, value: i } = s;
      if (a.status === "aborted" || i.status === "aborted")
        return b;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), (typeof i.value < "u" || s.alwaysSet) && (r[a.value] = i.value);
    }
    return { status: e.value, value: r };
  }
}
const b = Object.freeze({
  status: "aborted"
}), Bn = (t) => ({ status: "dirty", value: t }), q = (t) => ({ status: "valid", value: t }), Lt = (t) => t.status === "aborted", Mt = (t) => t.status === "dirty", ft = (t) => t.status === "valid", ht = (t) => typeof Promise < "u" && t instanceof Promise;
var S;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(S || (S = {}));
class te {
  constructor(e, n, r, s) {
    this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._path.concat(this._key);
  }
}
const fn = (t, e) => {
  if (ft(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return { success: !1, error: new ae(t.common.issues) };
};
function w(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: s } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, o) => i.code !== "invalid_type" ? { message: o.defaultError } : typeof o.data > "u" ? { message: r != null ? r : o.defaultError } : { message: n != null ? n : o.defaultError }, description: s };
}
class k {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return de(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: de(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new W(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: de(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (ht(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    var r;
    const s = {
      common: {
        issues: [],
        async: (r = n == null ? void 0 : n.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: de(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return fn(s, a);
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: de(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), a = await (ht(s) ? s : Promise.resolve(s));
    return fn(r, a);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, a) => {
      const i = e(s), o = () => a.addIssue({
        code: d.custom,
        ...r(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((l) => l ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new Q({
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return ie.create(this, this._def);
  }
  nullable() {
    return we.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Y.create(this, this._def);
  }
  promise() {
    return Oe.create(this, this._def);
  }
  or(e) {
    return Ke.create([this, e], this._def);
  }
  and(e) {
    return We.create(this, e, this._def);
  }
  transform(e) {
    return new Q({
      ...w(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Ge({
      ...w(this._def),
      innerType: this,
      defaultValue: n,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new Kn({
      typeName: g.ZodBranded,
      type: this,
      ...w(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new vt({
      ...w(this._def),
      innerType: this,
      catchValue: n,
      typeName: g.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return et.create(this, e);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const bs = /^c[^\s-]{8,}$/i, ws = /^[a-z][a-z0-9]*$/, xs = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, ks = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([^-]([a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}))$/, Ss = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
class le extends k {
  constructor() {
    super(...arguments), this._regex = (e, n, r) => this.refinement((s) => e.test(s), {
      validation: n,
      code: d.invalid_string,
      ...S.errToObj(r)
    }), this.nonempty = (e) => this.min(1, S.errToObj(e)), this.trim = () => new le({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
      const a = this._getOrReturnCtx(e);
      return p(
        a,
        {
          code: d.invalid_type,
          expected: f.string,
          received: a.parsedType
        }
      ), b;
    }
    const r = new W();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? p(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && p(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        ks.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "email",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        xs.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        bs.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        ws.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), p(s, {
            validation: "url",
            code: d.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "regex",
          code: d.invalid_string,
          message: a.message
        }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), r.dirty()) : a.kind === "datetime" ? Ss(a).test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.invalid_string,
          validation: "datetime",
          message: a.message
        }), r.dirty()) : T.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _addCheck(e) {
    return new le({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...S.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...S.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...S.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...S.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...S.errToObj(e) });
  }
  datetime(e) {
    var n;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (n = e == null ? void 0 : e.offset) !== null && n !== void 0 ? n : !1,
      ...S.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...S.errToObj(n)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...S.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...S.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...S.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...S.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...S.errToObj(n)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get minLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
le.create = (t) => {
  var e;
  return new le({
    checks: [],
    typeName: g.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...w(t)
  });
};
function Es(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, a = parseInt(t.toFixed(s).replace(".", "")), i = parseInt(e.toFixed(s).replace(".", ""));
  return a % i / Math.pow(10, s);
}
class me extends k {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: d.invalid_type,
        expected: f.number,
        received: a.parsedType
      }), b;
    }
    let r;
    const s = new W();
    for (const a of this._def.checks)
      a.kind === "int" ? T.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), p(r, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: d.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: d.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? Es(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), p(r, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), p(r, {
        code: d.not_finite,
        message: a.message
      }), s.dirty()) : T.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, S.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, S.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, S.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, S.toString(n));
  }
  setLimit(e, n, r, s) {
    return new me({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: S.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new me({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: S.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: S.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: S.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: S.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: S.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: S.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: S.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && T.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
me.create = (t) => new me({
  checks: [],
  typeName: g.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...w(t)
});
class ze extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== f.bigint) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.bigint,
        received: r.parsedType
      }), b;
    }
    return q(e.data);
  }
}
ze.create = (t) => {
  var e;
  return new ze({
    typeName: g.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...w(t)
  });
};
class Ue extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = Boolean(e.data)), this._getType(e) !== f.boolean) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.boolean,
        received: r.parsedType
      }), b;
    }
    return q(e.data);
  }
}
Ue.create = (t) => new Ue({
  typeName: g.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...w(t)
});
class _e extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: d.invalid_type,
        expected: f.date,
        received: a.parsedType
      }), b;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: d.invalid_date
      }), b;
    }
    const r = new W();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), p(s, {
        code: d.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), p(s, {
        code: d.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : T.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new _e({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: S.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: S.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
_e.create = (t) => new _e({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: g.ZodDate,
  ...w(t)
});
class pt extends k {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.symbol,
        received: r.parsedType
      }), b;
    }
    return q(e.data);
  }
}
pt.create = (t) => new pt({
  typeName: g.ZodSymbol,
  ...w(t)
});
class Be extends k {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.undefined,
        received: r.parsedType
      }), b;
    }
    return q(e.data);
  }
}
Be.create = (t) => new Be({
  typeName: g.ZodUndefined,
  ...w(t)
});
class qe extends k {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.null,
        received: r.parsedType
      }), b;
    }
    return q(e.data);
  }
}
qe.create = (t) => new qe({
  typeName: g.ZodNull,
  ...w(t)
});
class Ne extends k {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return q(e.data);
  }
}
Ne.create = (t) => new Ne({
  typeName: g.ZodAny,
  ...w(t)
});
class ve extends k {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return q(e.data);
  }
}
ve.create = (t) => new ve({
  typeName: g.ZodUnknown,
  ...w(t)
});
class ce extends k {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return p(n, {
      code: d.invalid_type,
      expected: f.never,
      received: n.parsedType
    }), b;
  }
}
ce.create = (t) => new ce({
  typeName: g.ZodNever,
  ...w(t)
});
class mt extends k {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.void,
        received: r.parsedType
      }), b;
    }
    return q(e.data);
  }
}
mt.create = (t) => new mt({
  typeName: g.ZodVoid,
  ...w(t)
});
class Y extends k {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== f.array)
      return p(n, {
        code: d.invalid_type,
        expected: f.array,
        received: n.parsedType
      }), b;
    if (s.exactLength !== null) {
      const i = n.data.length > s.exactLength.value, o = n.data.length < s.exactLength.value;
      (i || o) && (p(n, {
        code: i ? d.too_big : d.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (p(n, {
      code: d.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (p(n, {
      code: d.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((i, o) => s.type._parseAsync(new te(n, i, n.path, o)))).then((i) => W.mergeArray(r, i));
    const a = [...n.data].map((i, o) => s.type._parseSync(new te(n, i, n.path, o)));
    return W.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Y({
      ...this._def,
      minLength: { value: e, message: S.toString(n) }
    });
  }
  max(e, n) {
    return new Y({
      ...this._def,
      maxLength: { value: e, message: S.toString(n) }
    });
  }
  length(e, n) {
    return new Y({
      ...this._def,
      exactLength: { value: e, message: S.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Y.create = (t, e) => new Y({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...w(e)
});
var gt;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
  });
})(gt || (gt = {}));
function Ee(t) {
  if (t instanceof A) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = ie.create(Ee(r));
    }
    return new A({
      ...t._def,
      shape: () => e
    });
  } else
    return t instanceof Y ? Y.create(Ee(t.element)) : t instanceof ie ? ie.create(Ee(t.unwrap())) : t instanceof we ? we.create(Ee(t.unwrap())) : t instanceof ne ? ne.create(t.items.map((e) => Ee(e))) : t;
}
class A extends k {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = T.objectKeys(e);
    return this._cached = { shape: e, keys: n };
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      const u = this._getOrReturnCtx(e);
      return p(u, {
        code: d.invalid_type,
        expected: f.object,
        received: u.parsedType
      }), b;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof ce && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        i.includes(u) || o.push(u);
    const l = [];
    for (const u of i) {
      const c = a[u], m = s.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: c._parse(new te(s, m, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof ce) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const c of o)
          l.push({
            key: { status: "valid", value: c },
            value: { status: "valid", value: s.data[c] }
          });
      else if (u === "strict")
        o.length > 0 && (p(s, {
          code: d.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (u !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const c of o) {
        const m = s.data[c];
        l.push({
          key: { status: "valid", value: c },
          value: u._parse(
            new te(s, m, s.path, c)
          ),
          alwaysSet: c in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const c of l) {
        const m = await c.key;
        u.push({
          key: m,
          value: await c.value,
          alwaysSet: c.alwaysSet
        });
      }
      return u;
    }).then((u) => W.mergeObjectSync(r, u)) : W.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return S.errToObj, new A({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var s, a, i, o;
          const l = (i = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, n, r).message) !== null && i !== void 0 ? i : r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: (o = S.errToObj(e).message) !== null && o !== void 0 ? o : l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new A({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new A({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(e) {
    return new A({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  merge(e) {
    return new A({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => gt.mergeShapes(this._def.shape(), e._def.shape()),
      typeName: g.ZodObject
    });
  }
  setKey(e, n) {
    return this.augment({ [e]: n });
  }
  catchall(e) {
    return new A({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    return T.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    }), new A({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    return T.objectKeys(this.shape).forEach((r) => {
      e[r] || (n[r] = this.shape[r]);
    }), new A({
      ...this._def,
      shape: () => n
    });
  }
  deepPartial() {
    return Ee(this);
  }
  partial(e) {
    const n = {};
    return T.objectKeys(this.shape).forEach((r) => {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }), new A({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    return T.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof ie; )
          a = a._def.innerType;
        n[r] = a;
      }
    }), new A({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return qn(T.objectKeys(this.shape));
  }
}
A.create = (t, e) => new A({
  shape: () => t,
  unknownKeys: "strip",
  catchall: ce.create(),
  typeName: g.ZodObject,
  ...w(e)
});
A.strictCreate = (t, e) => new A({
  shape: () => t,
  unknownKeys: "strict",
  catchall: ce.create(),
  typeName: g.ZodObject,
  ...w(e)
});
A.lazycreate = (t, e) => new A({
  shape: t,
  unknownKeys: "strip",
  catchall: ce.create(),
  typeName: g.ZodObject,
  ...w(e)
});
class Ke extends k {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return n.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new ae(o.ctx.common.issues));
      return p(n, {
        code: d.invalid_union,
        unionErrors: i
      }), b;
    }
    if (n.common.async)
      return Promise.all(r.map(async (a) => {
        const i = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: n.data,
            path: n.path,
            parent: i
          }),
          ctx: i
        };
      })).then(s);
    {
      let a;
      const i = [];
      for (const l of r) {
        const u = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, c = l._parseSync({
          data: n.data,
          path: n.path,
          parent: u
        });
        if (c.status === "valid")
          return c;
        c.status === "dirty" && !a && (a = { result: c, ctx: u }), u.common.issues.length && i.push(u.common.issues);
      }
      if (a)
        return n.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((l) => new ae(l));
      return p(n, {
        code: d.invalid_union,
        unionErrors: o
      }), b;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ke.create = (t, e) => new Ke({
  options: t,
  typeName: g.ZodUnion,
  ...w(e)
});
const rt = (t) => t instanceof He ? rt(t.schema) : t instanceof Q ? rt(t.innerType()) : t instanceof Je ? [t.value] : t instanceof ge ? t.options : t instanceof Ye ? Object.keys(t.enum) : t instanceof Ge ? rt(t._def.innerType) : t instanceof Be ? [void 0] : t instanceof qe ? [null] : null;
class St extends k {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.object)
      return p(n, {
        code: d.invalid_type,
        expected: f.object,
        received: n.parsedType
      }), b;
    const r = this.discriminator, s = n.data[r], a = this.optionsMap.get(s);
    return a ? n.common.async ? a._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }) : a._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }) : (p(n, {
      code: d.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), b);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, n, r) {
    const s = /* @__PURE__ */ new Map();
    for (const a of n) {
      const i = rt(a.shape[e]);
      if (!i)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of i) {
        if (s.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        s.set(o, a);
      }
    }
    return new St({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: n,
      optionsMap: s,
      ...w(r)
    });
  }
}
function Dt(t, e) {
  const n = de(t), r = de(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === f.object && r === f.object) {
    const s = T.objectKeys(e), a = T.objectKeys(t).filter((o) => s.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of a) {
      const l = Dt(t[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (n === f.array && r === f.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = e[a], l = Dt(i, o);
      if (!l.valid)
        return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else
    return n === f.date && r === f.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class We extends k {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (a, i) => {
      if (Lt(a) || Lt(i))
        return b;
      const o = Dt(a.value, i.value);
      return o.valid ? ((Mt(a) || Mt(i)) && n.dirty(), { status: n.value, value: o.data }) : (p(r, {
        code: d.invalid_intersection_types
      }), b);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([a, i]) => s(a, i)) : s(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
We.create = (t, e, n) => new We({
  left: t,
  right: e,
  typeName: g.ZodIntersection,
  ...w(n)
});
class ne extends k {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.array)
      return p(r, {
        code: d.invalid_type,
        expected: f.array,
        received: r.parsedType
      }), b;
    if (r.data.length < this._def.items.length)
      return p(r, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), b;
    !this._def.rest && r.data.length > this._def.items.length && (p(r, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...r.data].map((i, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new te(r, i, r.path, o)) : null;
    }).filter((i) => !!i);
    return r.common.async ? Promise.all(a).then((i) => W.mergeArray(n, i)) : W.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new ne({
      ...this._def,
      rest: e
    });
  }
}
ne.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ne({
    items: t,
    typeName: g.ZodTuple,
    rest: null,
    ...w(e)
  });
};
class Fe extends k {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.object)
      return p(r, {
        code: d.invalid_type,
        expected: f.object,
        received: r.parsedType
      }), b;
    const s = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in r.data)
      s.push({
        key: a._parse(new te(r, o, r.path, o)),
        value: i._parse(new te(r, r.data[o], r.path, o))
      });
    return r.common.async ? W.mergeObjectAsync(n, s) : W.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof k ? new Fe({
      keyType: e,
      valueType: n,
      typeName: g.ZodRecord,
      ...w(r)
    }) : new Fe({
      keyType: le.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ...w(n)
    });
  }
}
class yt extends k {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.map)
      return p(r, {
        code: d.invalid_type,
        expected: f.map,
        received: r.parsedType
      }), b;
    const s = this._def.keyType, a = this._def.valueType, i = [...r.data.entries()].map(([o, l], u) => ({
      key: s._parse(new te(r, o, r.path, [u, "key"])),
      value: a._parse(new te(r, l, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const u = await l.key, c = await l.value;
          if (u.status === "aborted" || c.status === "aborted")
            return b;
          (u.status === "dirty" || c.status === "dirty") && n.dirty(), o.set(u.value, c.value);
        }
        return { status: n.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of i) {
        const u = l.key, c = l.value;
        if (u.status === "aborted" || c.status === "aborted")
          return b;
        (u.status === "dirty" || c.status === "dirty") && n.dirty(), o.set(u.value, c.value);
      }
      return { status: n.value, value: o };
    }
  }
}
yt.create = (t, e, n) => new yt({
  valueType: e,
  keyType: t,
  typeName: g.ZodMap,
  ...w(n)
});
class be extends k {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.set)
      return p(r, {
        code: d.invalid_type,
        expected: f.set,
        received: r.parsedType
      }), b;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (p(r, {
      code: d.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (p(r, {
      code: d.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const a = this._def.valueType;
    function i(l) {
      const u = /* @__PURE__ */ new Set();
      for (const c of l) {
        if (c.status === "aborted")
          return b;
        c.status === "dirty" && n.dirty(), u.add(c.value);
      }
      return { status: n.value, value: u };
    }
    const o = [...r.data.values()].map((l, u) => a._parse(new te(r, l, r.path, u)));
    return r.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(e, n) {
    return new be({
      ...this._def,
      minSize: { value: e, message: S.toString(n) }
    });
  }
  max(e, n) {
    return new be({
      ...this._def,
      maxSize: { value: e, message: S.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
be.create = (t, e) => new be({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...w(e)
});
class Te extends k {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.function)
      return p(n, {
        code: d.invalid_type,
        expected: f.function,
        received: n.parsedType
      }), b;
    function r(o, l) {
      return dt({
        data: o,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          ut(),
          Ve
        ].filter((u) => !!u),
        issueData: {
          code: d.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function s(o, l) {
      return dt({
        data: o,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          ut(),
          Ve
        ].filter((u) => !!u),
        issueData: {
          code: d.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const a = { errorMap: n.common.contextualErrorMap }, i = n.data;
    return this._def.returns instanceof Oe ? q(async (...o) => {
      const l = new ae([]), u = await this._def.args.parseAsync(o, a).catch((y) => {
        throw l.addIssue(r(o, y)), l;
      }), c = await i(...u);
      return await this._def.returns._def.type.parseAsync(c, a).catch((y) => {
        throw l.addIssue(s(c, y)), l;
      });
    }) : q((...o) => {
      const l = this._def.args.safeParse(o, a);
      if (!l.success)
        throw new ae([r(o, l.error)]);
      const u = i(...l.data), c = this._def.returns.safeParse(u, a);
      if (!c.success)
        throw new ae([s(u, c.error)]);
      return c.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Te({
      ...this._def,
      args: ne.create(e).rest(ve.create())
    });
  }
  returns(e) {
    return new Te({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, n, r) {
    return new Te({
      args: e || ne.create([]).rest(ve.create()),
      returns: n || ve.create(),
      typeName: g.ZodFunction,
      ...w(r)
    });
  }
}
class He extends k {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
He.create = (t, e) => new He({
  getter: t,
  typeName: g.ZodLazy,
  ...w(e)
});
class Je extends k {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        received: n.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), b;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Je.create = (t, e) => new Je({
  value: t,
  typeName: g.ZodLiteral,
  ...w(e)
});
function qn(t, e) {
  return new ge({
    values: t,
    typeName: g.ZodEnum,
    ...w(e)
  });
}
class ge extends k {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return p(n, {
        expected: T.joinValues(r),
        received: n.parsedType,
        code: d.invalid_type
      }), b;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return p(n, {
        received: n.data,
        code: d.invalid_enum_value,
        options: r
      }), b;
    }
    return q(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e) {
    return ge.create(e);
  }
  exclude(e) {
    return ge.create(this.options.filter((n) => !e.includes(n)));
  }
}
ge.create = qn;
class Ye extends k {
  _parse(e) {
    const n = T.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== f.string && r.parsedType !== f.number) {
      const s = T.objectValues(n);
      return p(r, {
        expected: T.joinValues(s),
        received: r.parsedType,
        code: d.invalid_type
      }), b;
    }
    if (n.indexOf(e.data) === -1) {
      const s = T.objectValues(n);
      return p(r, {
        received: r.data,
        code: d.invalid_enum_value,
        options: s
      }), b;
    }
    return q(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Ye.create = (t, e) => new Ye({
  values: t,
  typeName: g.ZodNativeEnum,
  ...w(e)
});
class Oe extends k {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.promise && n.common.async === !1)
      return p(n, {
        code: d.invalid_type,
        expected: f.promise,
        received: n.parsedType
      }), b;
    const r = n.parsedType === f.promise ? n.data : Promise.resolve(n.data);
    return q(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
Oe.create = (t, e) => new Oe({
  type: t,
  typeName: g.ZodPromise,
  ...w(e)
});
class Q extends k {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null;
    if (s.type === "preprocess") {
      const i = s.transform(r.data);
      return r.common.async ? Promise.resolve(i).then((o) => this._def.schema._parseAsync({
        data: o,
        path: r.path,
        parent: r
      })) : this._def.schema._parseSync({
        data: i,
        path: r.path,
        parent: r
      });
    }
    const a = {
      addIssue: (i) => {
        p(r, i), i.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "refinement") {
      const i = (o) => {
        const l = s.refinement(o, a);
        if (r.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? b : (o.status === "dirty" && n.dirty(), i(o.value), { status: n.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? b : (o.status === "dirty" && n.dirty(), i(o.value).then(() => ({ status: n.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!ft(i))
          return i;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => ft(i) ? Promise.resolve(s.transform(i.value, a)).then((o) => ({ status: n.value, value: o })) : i);
    T.assertNever(s);
  }
}
Q.create = (t, e, n) => new Q({
  schema: t,
  typeName: g.ZodEffects,
  effect: e,
  ...w(n)
});
Q.createWithPreprocess = (t, e, n) => new Q({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: g.ZodEffects,
  ...w(n)
});
class ie extends k {
  _parse(e) {
    return this._getType(e) === f.undefined ? q(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ie.create = (t, e) => new ie({
  innerType: t,
  typeName: g.ZodOptional,
  ...w(e)
});
class we extends k {
  _parse(e) {
    return this._getType(e) === f.null ? q(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
we.create = (t, e) => new we({
  innerType: t,
  typeName: g.ZodNullable,
  ...w(e)
});
class Ge extends k {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === f.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ge.create = (t, e) => new Ge({
  innerType: t,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...w(e)
});
class vt extends k {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n,
        common: {
          ...n.common,
          issues: []
        }
      }
    });
    return ht(r) ? r.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue()
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue()
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
vt.create = (t, e) => new vt({
  innerType: t,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...w(e)
});
class _t extends k {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: d.invalid_type,
        expected: f.nan,
        received: r.parsedType
      }), b;
    }
    return { status: "valid", value: e.data };
  }
}
_t.create = (t) => new _t({
  typeName: g.ZodNaN,
  ...w(t)
});
const Ts = Symbol("zod_brand");
class Kn extends k {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class et extends k {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? b : a.status === "dirty" ? (n.dirty(), Bn(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? b : s.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new et({
      in: e,
      out: n,
      typeName: g.ZodPipeline
    });
  }
}
const Wn = (t, e = {}, n) => t ? Ne.create().superRefine((r, s) => {
  if (!t(r)) {
    const a = typeof e == "function" ? e(r) : e, i = typeof a == "string" ? { message: a } : a;
    s.addIssue({ code: "custom", ...i, fatal: n });
  }
}) : Ne.create(), $s = {
  object: A.lazycreate
};
var g;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline";
})(g || (g = {}));
const Cs = (t, e = {
  message: `Input not instance of ${t.name}`
}) => Wn((n) => n instanceof t, e, !0), Fn = le.create, Hn = me.create, Ns = _t.create, Os = ze.create, Jn = Ue.create, As = _e.create, Zs = pt.create, js = Be.create, Ps = qe.create, Rs = Ne.create, Is = ve.create, Ls = ce.create, Ms = mt.create, Ds = Y.create, Vs = A.create, zs = A.strictCreate, Us = Ke.create, Bs = St.create, qs = We.create, Ks = ne.create, Ws = Fe.create, Fs = yt.create, Hs = be.create, Js = Te.create, Ys = He.create, Gs = Je.create, Qs = ge.create, Xs = Ye.create, ea = Oe.create, hn = Q.create, ta = ie.create, na = we.create, ra = Q.createWithPreprocess, sa = et.create, aa = () => Fn().optional(), ia = () => Hn().optional(), oa = () => Jn().optional(), la = {
  string: (t) => le.create({ ...t, coerce: !0 }),
  number: (t) => me.create({ ...t, coerce: !0 }),
  boolean: (t) => Ue.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => ze.create({ ...t, coerce: !0 }),
  date: (t) => _e.create({ ...t, coerce: !0 })
}, ca = b;
var J = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Ve,
  setErrorMap: vs,
  getErrorMap: ut,
  makeIssue: dt,
  EMPTY_PATH: _s,
  addIssueToContext: p,
  ParseStatus: W,
  INVALID: b,
  DIRTY: Bn,
  OK: q,
  isAborted: Lt,
  isDirty: Mt,
  isValid: ft,
  isAsync: ht,
  get util() {
    return T;
  },
  ZodParsedType: f,
  getParsedType: de,
  ZodType: k,
  ZodString: le,
  ZodNumber: me,
  ZodBigInt: ze,
  ZodBoolean: Ue,
  ZodDate: _e,
  ZodSymbol: pt,
  ZodUndefined: Be,
  ZodNull: qe,
  ZodAny: Ne,
  ZodUnknown: ve,
  ZodNever: ce,
  ZodVoid: mt,
  ZodArray: Y,
  get objectUtil() {
    return gt;
  },
  ZodObject: A,
  ZodUnion: Ke,
  ZodDiscriminatedUnion: St,
  ZodIntersection: We,
  ZodTuple: ne,
  ZodRecord: Fe,
  ZodMap: yt,
  ZodSet: be,
  ZodFunction: Te,
  ZodLazy: He,
  ZodLiteral: Je,
  ZodEnum: ge,
  ZodNativeEnum: Ye,
  ZodPromise: Oe,
  ZodEffects: Q,
  ZodTransformer: Q,
  ZodOptional: ie,
  ZodNullable: we,
  ZodDefault: Ge,
  ZodCatch: vt,
  ZodNaN: _t,
  BRAND: Ts,
  ZodBranded: Kn,
  ZodPipeline: et,
  custom: Wn,
  Schema: k,
  ZodSchema: k,
  late: $s,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: la,
  any: Rs,
  array: Ds,
  bigint: Os,
  boolean: Jn,
  date: As,
  discriminatedUnion: Bs,
  effect: hn,
  enum: Qs,
  function: Js,
  instanceof: Cs,
  intersection: qs,
  lazy: Ys,
  literal: Gs,
  map: Fs,
  nan: Ns,
  nativeEnum: Xs,
  never: Ls,
  null: Ps,
  nullable: na,
  number: Hn,
  object: Vs,
  oboolean: oa,
  onumber: ia,
  optional: ta,
  ostring: aa,
  pipeline: sa,
  preprocess: ra,
  promise: ea,
  record: Ws,
  set: Hs,
  strictObject: zs,
  string: Fn,
  symbol: Zs,
  transformer: hn,
  tuple: Ks,
  undefined: js,
  union: Us,
  unknown: Is,
  void: Ms,
  NEVER: ca,
  ZodIssueCode: d,
  quotelessJson: ys,
  ZodError: ae
});
const ua = /* @__PURE__ */ L('<div class="error"><sl-icon class="icon" name="exclamation-circle"></sl-icon><span>.</span></div>'), da = /* @__PURE__ */ L('<div class="field"><sl-input></sl-input></div>'), fa = /* @__PURE__ */ L('<sl-icon class="rotate" slot="suffix" name="arrow-repeat"></sl-icon>'), ha = /* @__PURE__ */ L("<sl-button></sl-button>"), pa = /* @__PURE__ */ L("<form></form>"), fe = (t) => {
  const [e] = ye(), [n, r] = An(t, ["isSubmiting", "errors"]);
  return (() => {
    const s = D(() => document.importNode(da, !0)), a = s.firstChild;
    return Zn(a, On(r, {
      get disabled() {
        return n.isSubmiting;
      }
    }), !1, !1), a._$owner = M(), E(s, v(oe, {
      get when() {
        return n.errors;
      },
      get children() {
        const i = D(() => document.importNode(ua, !0)), o = i.firstChild, l = o.nextSibling, u = l.firstChild;
        return o._$owner = M(), E(l, () => {
          var c;
          return (c = n.errors) == null ? void 0 : c.map((m) => e(m)).join(". ");
        }, u), i;
      }
    }), null), s;
  })();
}, Qe = (t) => {
  const [e, n] = An(t, ["isSubmiting", "children"]);
  return (() => {
    const r = D(() => document.importNode(ha, !0));
    return Zn(r, On(n, {
      get disabled() {
        return e.isSubmiting;
      }
    }), !1, !0), r._$owner = M(), E(r, v(oe, {
      get when() {
        return e.isSubmiting;
      },
      get children() {
        const s = D(() => document.importNode(fa, !0));
        return s._$owner = M(), s;
      }
    }), null), E(r, () => e.children, null), r;
  })();
}, Wt = (t) => {
  const e = (n) => {
    n.preventDefault(), t.onSubmit();
  };
  return (() => {
    const n = pa.cloneNode(!0);
    return n.addEventListener("submit", e), E(n, () => t.children), n;
  })();
}, ma = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u), ga = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/), ya = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u), Yn = J.string().trim().email("Must be a valid email address"), pn = J.string().trim().regex(ma, "Must be a valid name"), Gn = J.string().trim().min(3, "Minimum 3 charcters").or(J.literal("")), va = J.string().trim().regex(ya, "Must be a valid street address").or(J.literal("")), _a = J.preprocess(
  (t) => t.split(" ").join(""),
  J.string().trim().regex(ga, "Must be a valid phone number").or(J.literal(""))
), bt = (t, e, n) => {
  const r = t.safeParse(e);
  if (r.success)
    return n({}), r.data;
  n(r.error.flatten());
}, ba = /* @__PURE__ */ L('<div class="loading"><sl-spinner style="font-size: 50px; --track-width: 10px;"></sl-spinner><div></div></div>'), Ft = (t) => (() => {
  const e = D(() => document.importNode(ba, !0)), n = e.firstChild, r = n.nextSibling;
  return n._$owner = M(), E(r, () => t.children), e;
})(), wa = /* @__PURE__ */ L('<div class="form-error"></div>'), xa = /* @__PURE__ */ L("<div></div>"), ka = /* @__PURE__ */ L("<section><h2></h2></section>"), mn = J.object({
  email: Yn,
  pass: Gn
}), Sa = {
  email: "flemming@intergate.io",
  pass: "flemming8"
}, Ea = (t) => {
  const [e] = ye(), {
    auth: n
  } = je(), [r, s] = xe(Sa), [a, i] = I(), [o, l] = I(), [u, c] = I({}), [m] = he(o, n.signin), [y] = he(a, n.signup), [x] = he(() => !!n.state.token, n.loadDetails);
  Ae(async () => {
    m.error && c({
      formErrors: [e("Failed signing in"), e("Did you type your password and email correct?")]
    }), y.error && c({
      formErrors: [e("Failed signing up"), e("Did you already sign up?")]
    });
  });
  const h = (N) => (P) => {
    s(N, P.target.value);
  }, $ = () => m.loading || y.loading;
  return (() => {
    const N = ka.cloneNode(!0), P = N.firstChild;
    return E(P, () => e("Sign in")), E(N, v(Ut, {
      get fallback() {
        return v(Ft, {});
      },
      get children() {
        return [K(() => qt(x())), v(Wt, {
          onSubmit: () => l(bt(mn, r, c)),
          get children() {
            return [v(fe, {
              get label() {
                return e("Email");
              },
              type: "text",
              inputmode: "email",
              clearable: !0,
              required: !0,
              get value() {
                return r.email;
              },
              get errors() {
                var _;
                return (_ = u().fieldErrors) == null ? void 0 : _.email;
              },
              get ["data-invalid"]() {
                var _;
                return !!((_ = u().fieldErrors) != null && _.email) || u().formErrors;
              },
              get ["on:sl-change"]() {
                return h("email");
              },
              get isSubmiting() {
                return $();
              }
            }), v(fe, {
              get label() {
                return e("Password");
              },
              type: "password",
              inputmode: "text",
              "password-toggle": !0,
              clearable: !0,
              required: !0,
              get value() {
                return r.pass;
              },
              get errors() {
                var _;
                return (_ = u().fieldErrors) == null ? void 0 : _.pass;
              },
              get ["on:sl-change"]() {
                return h("pass");
              },
              get ["data-invalid"]() {
                var _;
                return !!((_ = u().fieldErrors) != null && _.pass) || u().formErrors;
              },
              get isSubmiting() {
                return $();
              }
            }), v(oe, {
              get when() {
                var _;
                return (_ = u().formErrors) == null ? void 0 : _.length;
              },
              get children() {
                const _ = wa.cloneNode(!0);
                return E(_, () => {
                  var R;
                  return (R = u().formErrors) == null ? void 0 : R.join(". ");
                }), _;
              }
            }), (() => {
              const _ = xa.cloneNode(!0);
              return E(_, v(Qe, {
                onClick: () => i(bt(mn, r, c)),
                get isSubmiting() {
                  return $();
                },
                variant: "neutral",
                get children() {
                  return e("Sign up");
                }
              }), null), E(_, v(Qe, {
                type: "submit",
                variant: "primary",
                get isSubmiting() {
                  return $();
                },
                get children() {
                  return e("Sign in");
                }
              }), null), _;
            })()];
          }
        })];
      }
    }), null), N;
  })();
}, Ta = () => {
  const [t] = ye(), {
    auth: e
  } = je(), [n, r] = I(), [s] = he(n, () => e.signout());
  return v(Qe, {
    get isSubmiting() {
      return s.loading;
    },
    onClick: () => r(!0),
    variant: "primary",
    get children() {
      return t("Sign out");
    }
  });
}, $a = /* @__PURE__ */ L("<div><sl-select></sl-select></div>"), Ca = /* @__PURE__ */ L("<sl-option></sl-option>"), Na = (t = {}) => {
  const n = {
    ...{
      languageCodeOnly: !1
    },
    ...t
  }, r = navigator.languages === void 0 ? [navigator.language] : navigator.languages;
  return r ? r.map((s) => {
    const a = s.trim();
    return n.languageCodeOnly ? a.split(/-|_/)[0] : a;
  }) : [];
}, Oa = (t) => {
  const [e, {
    locale: n,
    dict: r
  }] = ye(), s = (o) => {
    localStorage.langCode = o, n(o);
  };
  let a = localStorage.langCode;
  if (!a) {
    const o = Na({
      languageCodeOnly: !0
    });
    a = r(o[0] || "") ? o[0] : "no";
  }
  s(a);
  const i = K(() => sn.find(({
    code: o
  }) => o === n()));
  return (() => {
    const o = D(() => document.importNode($a, !0)), l = o.firstChild;
    return l.addEventListener("sl-change", (u) => s(u.target.value)), l._$owner = M(), E(l, v(xr, {
      each: sn,
      children: (u) => (() => {
        const c = D(() => document.importNode(Ca, !0));
        return c._$owner = M(), E(c, () => u.name), ee(() => F(c, "value", u.code)), c;
      })()
    })), ee(() => {
      var u;
      return F(l, "value", (u = i()) == null ? void 0 : u.code);
    }), o;
  })();
}, Aa = /* @__PURE__ */ L("<sl-avatar></sl-avatar>"), Za = /* @__PURE__ */ L('<div class="top-bar"><menu></menu><h1></h1></div>'), ja = ({
  firstName: t,
  lastName: e
}) => [t, e].reduce((n, r) => (n = n + (r.length ? r[0] : ""), n), ""), Pa = (t) => {
  const [e] = ye(), {
    profile: n,
    auth: r
  } = je(), s = K(() => ja(n.state));
  return (() => {
    const a = Za.cloneNode(!0), i = a.firstChild, o = i.nextSibling;
    return E(i, v(oe, {
      get when() {
        return r.authenticated();
      },
      get children() {
        const l = D(() => document.importNode(Aa, !0));
        return l._$owner = M(), ee(() => F(l, "initials", s())), l;
      }
    }), null), E(i, v(Oa, {}), null), E(i, v(oe, {
      get when() {
        return r.authenticated();
      },
      get children() {
        return v(Ta, {});
      }
    }), null), E(o, () => e(t.title)), a;
  })();
}, Ra = /* @__PURE__ */ L("<section><h2></h2><p>Not implemented!</p></section>"), gn = (t) => (() => {
  const e = Ra.cloneNode(!0), n = e.firstChild;
  return E(n, () => t.title), e;
})(), Ia = /* @__PURE__ */ L('<div class="form-error">.</div>'), La = /* @__PURE__ */ L("<section><h2></h2></section>"), Ma = J.object({
  firstName: pn,
  lastName: pn,
  address: va,
  phone: _a
}), Da = () => {
  const [t] = ye(), {
    auth: e,
    profile: n
  } = je(), [r, s] = I(), [a, i] = xe({
    ...n.state
  }), [o, l] = I({}), [u] = he(e.authenticated(), async () => {
    await n.loadDetails(), i(n.state);
  }), [c] = he(r, n.updateDetails);
  Ae(async () => {
    c.error && l({
      formErrors: [t("Error saving")]
    });
  });
  const m = (y) => (x) => {
    i(y, x.target.value);
  };
  return (() => {
    const y = La.cloneNode(!0), x = y.firstChild;
    return E(x, () => t("Profile")), E(y, v(Ut, {
      get fallback() {
        return v(Ft, {});
      },
      get children() {
        return [K(() => qt(u())), v(Wt, {
          onSubmit: () => s(bt(Ma, a, l)),
          get children() {
            return [v(fe, {
              get label() {
                return t("First name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return a.firstName;
              },
              get ["on:sl-change"]() {
                return m("firstName");
              },
              get ["data-invalid"]() {
                var h;
                return !!((h = o().fieldErrors) != null && h.firstName);
              },
              get isSubmiting() {
                return c.loading;
              },
              get errors() {
                var h;
                return (h = o().fieldErrors) == null ? void 0 : h.firstName;
              }
            }), v(fe, {
              get label() {
                return t("Last name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return a.lastName;
              },
              get ["on:sl-change"]() {
                return m("lastName");
              },
              get ["data-invalid"]() {
                var h;
                return !!((h = o().fieldErrors) != null && h.lastName);
              },
              get isSubmiting() {
                return c.loading;
              },
              get errors() {
                var h;
                return (h = o().fieldErrors) == null ? void 0 : h.lastName;
              }
            }), v(fe, {
              get label() {
                return t("Address");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !1,
              get value() {
                return a.address;
              },
              get ["on:sl-change"]() {
                return m("address");
              },
              get ["data-invalid"]() {
                var h;
                return !!((h = o().fieldErrors) != null && h.address);
              },
              get isSubmiting() {
                return c.loading;
              },
              get errors() {
                var h;
                return (h = o().fieldErrors) == null ? void 0 : h.address;
              }
            }), v(fe, {
              get label() {
                return t("Phone");
              },
              inputmode: "numeric",
              spellcheck: !1,
              clearable: !0,
              get value() {
                return a.phone;
              },
              get ["on:sl-change"]() {
                return m("phone");
              },
              get ["data-invalid"]() {
                var h;
                return !!((h = o().fieldErrors) != null && h.phone);
              },
              get isSubmiting() {
                return c.loading;
              },
              get errors() {
                var h;
                return (h = o().fieldErrors) == null ? void 0 : h.phone;
              }
            }), v(oe, {
              get when() {
                var h;
                return (h = o().formErrors) == null ? void 0 : h.length;
              },
              get children() {
                const h = Ia.cloneNode(!0), $ = h.firstChild;
                return E(h, () => {
                  var N;
                  return (N = o().formErrors) == null ? void 0 : N.join(". ");
                }, $), h;
              }
            }), v(Qe, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return c.loading;
              },
              get children() {
                return t("Save");
              }
            })];
          }
        })];
      }
    }), null), y;
  })();
}, Va = /* @__PURE__ */ L('<div class="form-error">.</div>'), za = /* @__PURE__ */ L("<section><h2></h2></section>"), Ua = J.object({
  email: Yn,
  pass: Gn
}), Ba = () => {
  const [t] = ye(), {
    auth: e,
    account: n
  } = je(), [r, s] = I(), [a, i] = xe({
    email: n.state.email,
    pass: ""
  }), [o, l] = I({}), [u] = he(e.authenticated(), async () => {
    await n.loadDetails(), i(n.state);
  }), [c] = he(r, n.updateDetails);
  Ae(async () => {
    c.error && (console.log(c.error), l({
      formErrors: [t("Error saving")]
    })), c.state === "ready" && i("pass", "");
  });
  const m = (y) => (x) => {
    i(y, x.target.value);
  };
  return (() => {
    const y = za.cloneNode(!0), x = y.firstChild;
    return E(x, () => t("Account")), E(y, v(Ut, {
      get fallback() {
        return v(Ft, {});
      },
      get children() {
        return [K(() => qt(u())), v(Wt, {
          onSubmit: () => s(bt(Ua, a, l)),
          get children() {
            return [v(fe, {
              get label() {
                return t("Email");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return a.email;
              },
              get ["on:sl-change"]() {
                return m("email");
              },
              get isSubmiting() {
                return c.loading;
              },
              get errors() {
                var h;
                return (h = o().fieldErrors) == null ? void 0 : h.email;
              }
            }), v(fe, {
              get label() {
                return t("Password");
              },
              inputmode: "text",
              clearable: !0,
              type: "password",
              "password-toggle": !0,
              get value() {
                return a.pass;
              },
              get ["on:sl-change"]() {
                return m("pass");
              },
              get isSubmiting() {
                return c.loading;
              },
              get errors() {
                var h;
                return (h = o().fieldErrors) == null ? void 0 : h.pass;
              }
            }), v(oe, {
              get when() {
                var h;
                return (h = o().formErrors) == null ? void 0 : h.length;
              },
              get children() {
                const h = Va.cloneNode(!0), $ = h.firstChild;
                return E(h, () => {
                  var N;
                  return (N = o().formErrors) == null ? void 0 : N.join(". ");
                }, $), h;
              }
            }), v(Qe, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return c.loading;
              },
              get children() {
                return t("Save");
              }
            })];
          }
        })];
      }
    }), null), y;
  })();
}, qa = /* @__PURE__ */ L('<sl-tab-group><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel></sl-tab-group>'), Ka = /* @__PURE__ */ L(`<main class="app"><style data-name="reset"></style><style data-name="unocss">/* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}</style><style data-name="custom"></style><div></div></main>`), Wa = (t) => {
  const [e] = ye(), {
    auth: n
  } = je(), [r, s] = I();
  return Ae(() => {
    const {
      activePanel: a
    } = localStorage, i = r();
    a && i && i.updateComplete.then(() => {
      i.show(a);
    });
  }), xn((a) => {
    if (a instanceof Kt)
      console.warn("Session expired, signing out"), n.signout();
    else
      throw a;
  }), (() => {
    const a = Ka.cloneNode(!0), i = a.firstChild, o = i.nextSibling, l = o.nextSibling, u = l.nextSibling;
    return E(i, Qr), E(l, Xr), E(u, v(Pa, {
      get title() {
        return t.title;
      }
    }), null), E(u, v(oe, {
      get when() {
        return !n.authenticated();
      },
      get children() {
        return v(Ea, {
          title: "Login"
        });
      }
    }), null), E(u, v(oe, {
      get when() {
        return n.authenticated();
      },
      get children() {
        const c = D(() => document.importNode(qa, !0)), m = c.firstChild, y = m.firstChild, x = m.nextSibling, h = x.firstChild, $ = x.nextSibling, N = $.firstChild, P = $.nextSibling, _ = P.nextSibling, R = _.nextSibling;
        return Lr((z) => s(z), c), c.addEventListener("sl-tab-show", ({
          detail: z
        }) => {
          localStorage.activePanel = z.name;
        }), c._$owner = M(), F(m, "panel", "account"), m._$owner = M(), F(y, "name", "person-lock"), y._$owner = M(), E(m, () => e("Account"), null), F(x, "panel", "subscription"), x._$owner = M(), F(h, "name", "journal"), h._$owner = M(), E(x, () => e("Subscription"), null), F($, "panel", "contact"), $._$owner = M(), F(N, "name", "person-hearts"), N._$owner = M(), E($, () => e("Contact"), null), F(P, "name", "account"), P._$owner = M(), E(P, v(Ba, {}), null), E(P, v(Da, {}), null), F(_, "name", "subscription"), _._$owner = M(), E(_, v(gn, {
          get title() {
            return e("Subscription");
          }
        })), F(R, "name", "contact"), R._$owner = M(), E(R, v(gn, {
          get title() {
            return e("Contact");
          }
        })), c;
      }
    }), null), a;
  })();
}, Fa = (t) => (xn((e) => console.error(`App::onError: ${e}`)), v(us, {
  get children() {
    return v(gs, {
      get namespace() {
        return t.namespace;
      },
      get database() {
        return t.database;
      },
      get scope() {
        return t.scope;
      },
      get datapoint() {
        return t.datapoint;
      },
      get children() {
        return v(Wa, {
          get title() {
            return t.title;
          }
        });
      }
    });
  }
}));
qr(
  "membership-widget",
  {
    datapoint: "http://localhost:8055/",
    title: "Membership portal",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  Fa
);
