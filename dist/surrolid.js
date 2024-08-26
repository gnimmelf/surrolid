function Ps(t) {
  return Object.keys(t).reduce((r, n) => {
    const s = t[n];
    return r[n] = Object.assign({}, s), Un(s.value) && !Ds(s.value) && !Array.isArray(s.value) && (r[n].value = Object.assign({}, s.value)), Array.isArray(s.value) && (r[n].value = s.value.slice(0)), r;
  }, {});
}
function js(t) {
  return t ? Object.keys(t).reduce((r, n) => {
    const s = t[n];
    return r[n] = Un(s) && "value" in s ? s : {
      value: s
    }, r[n].attribute || (r[n].attribute = Ms(n)), r[n].parse = "parse" in r[n] ? r[n].parse : typeof r[n].value != "string", r;
  }, {}) : {};
}
function Rs(t) {
  return Object.keys(t).reduce((r, n) => (r[n] = t[n].value, r), {});
}
function Is(t, e) {
  const r = Ps(e);
  return Object.keys(e).forEach((s) => {
    const i = r[s], a = t.getAttribute(i.attribute), o = t[s];
    a && (i.value = i.parse ? Ln(a) : a), o != null && (i.value = Array.isArray(o) ? o.slice(0) : o), i.reflect && Vr(t, i.attribute, i.value), Object.defineProperty(t, s, {
      get() {
        return i.value;
      },
      set(c) {
        const l = i.value;
        i.value = c, i.reflect && Vr(this, i.attribute, i.value);
        for (let u = 0, h = this.__propertyChangedCallbacks.length; u < h; u++)
          this.__propertyChangedCallbacks[u](s, c, l);
      },
      enumerable: !0,
      configurable: !0
    });
  }), r;
}
function Ln(t) {
  if (!!t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function Vr(t, e, r) {
  if (r == null || r === !1)
    return t.removeAttribute(e);
  let n = JSON.stringify(r);
  t.__updating[e] = !0, n === "true" && (n = ""), t.setAttribute(e, n), Promise.resolve().then(() => delete t.__updating[e]);
}
function Ms(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, r) => "-" + r.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Un(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function Ds(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function Ls(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let or;
function Us(t, e) {
  const r = Object.keys(e);
  return class extends t {
    static get observedAttributes() {
      return r.map((s) => e[s].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Is(this, e);
      const s = Rs(this.props), i = this.Component, a = or;
      try {
        or = this, this.__initialized = !0, Ls(i) ? new i(s, {
          element: this
        }) : i(s, {
          element: this
        });
      } finally {
        or = a;
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
    attributeChangedCallback(s, i, a) {
      if (!!this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in e)) {
        if (a == null && !this[s])
          return;
        this[s] = e[s].parse ? Ln(a) : a;
      }
    }
    lookupProp(s) {
      if (!!e)
        return r.find((i) => s === i || s === e[i].attribute);
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
function Zs(t, e = {}, r = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: s
  } = r;
  return (i) => {
    if (!t)
      throw new Error("tag is required to register a Component");
    let a = customElements.get(t);
    return a ? (a.prototype.Component = i, a) : (a = Us(n, js(e)), a.prototype.Component = i, a.prototype.registeredTag = t, customElements.define(t, a, s), a);
  };
}
const j = {};
function Ge(t) {
  j.context = t;
}
const Vs = (t, e) => t === e, ne = Symbol("solid-proxy"), hr = Symbol("solid-track"), Et = {
  equals: Vs
};
let ye = null, Zn = Fn;
const ue = 1, At = 2, Vn = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, cr = {};
var C = null;
let oe = null, $ = null, F = null, X = null, $r = 0;
function Ke(t, e) {
  const r = $, n = C, s = t.length === 0, i = s ? Vn : {
    owned: null,
    cleanups: null,
    context: null,
    owner: e === void 0 ? n : e
  }, a = s ? t : () => t(() => z(() => Ht(i)));
  C = i, $ = null;
  try {
    return ve(a, !0);
  } finally {
    $ = r, C = n;
  }
}
function D(t, e) {
  e = e ? Object.assign({}, Et, e) : Et;
  const r = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, n = (s) => (typeof s == "function" && (s = s(r.value)), Wn(r, s));
  return [Gn.bind(r), n];
}
function zr(t, e, r) {
  const n = Yt(t, e, !0, ue);
  Ve(n);
}
function te(t, e, r) {
  const n = Yt(t, e, !1, ue);
  Ve(n);
}
function qt(t, e, r) {
  Zn = qs;
  const n = Yt(t, e, !1, ue), s = Me && ut(C, Me.id);
  s && (n.suspense = s), n.user = !0, X ? X.push(n) : Ve(n);
}
function K(t, e, r) {
  r = r ? Object.assign({}, Et, r) : Et;
  const n = Yt(t, e, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, Ve(n), Gn.bind(n);
}
function de(t, e, r) {
  let n, s, i;
  arguments.length === 2 && typeof e == "object" || arguments.length === 1 ? (n = !0, s = t, i = e || {}) : (n = t, s = e, i = r || {});
  let a = null, o = cr, c = null, l = !1, u = !1, h = "initialValue" in i, b = typeof n == "function" && K(n);
  const m = /* @__PURE__ */ new Set(), [E, x] = (i.storage || D)(i.initialValue), [O, T] = D(void 0), [M, L] = D(void 0, {
    equals: !1
  }), [B, H] = D(h ? "ready" : "unresolved");
  if (j.context) {
    c = `${j.context.id}${j.context.count++}`;
    let I;
    i.ssrLoadFrom === "initial" ? o = i.initialValue : j.load && (I = j.load(c)) && (o = I[0]);
  }
  function ie(I, G, W, Be) {
    return a === I && (a = null, h = !0, (I === o || G === o) && i.onHydrated && queueMicrotask(() => i.onHydrated(Be, {
      value: G
    })), o = cr, $s(G, W)), G;
  }
  function $s(I, G) {
    ve(() => {
      G === void 0 && x(() => I), H(G !== void 0 ? "errored" : "ready"), T(G);
      for (const W of m.keys())
        W.decrement();
      m.clear();
    }, !1);
  }
  function ir() {
    const I = Me && ut(C, Me.id), G = E(), W = O();
    if (W !== void 0 && !a)
      throw W;
    return $ && !$.user && I && zr(() => {
      M(), a && (I.resolved && oe && l ? oe.promises.add(a) : m.has(I) || (I.increment(), m.add(I)));
    }), G;
  }
  function ar(I = !0) {
    if (I !== !1 && u)
      return;
    u = !1;
    const G = b ? b() : n;
    if (l = oe, G == null || G === !1) {
      ie(a, z(E));
      return;
    }
    const W = o !== cr ? o : z(() => s(G, {
      value: E(),
      refetching: I
    }));
    return typeof W != "object" || !(W && "then" in W) ? (ie(a, W, void 0, G), W) : (a = W, u = !0, queueMicrotask(() => u = !1), ve(() => {
      H(h ? "refreshing" : "pending"), L();
    }, !1), W.then((Be) => ie(W, Be, void 0, G), (Be) => ie(W, void 0, qn(Be), G)));
  }
  return Object.defineProperties(ir, {
    state: {
      get: () => B()
    },
    error: {
      get: () => O()
    },
    loading: {
      get() {
        const I = B();
        return I === "pending" || I === "refreshing";
      }
    },
    latest: {
      get() {
        if (!h)
          return ir();
        const I = O();
        if (I && !a)
          throw I;
        return E();
      }
    }
  }), b ? zr(() => ar(!1)) : ar(!1), [ir, {
    refetch: ar,
    mutate: x
  }];
}
function zs(t) {
  return ve(t, !1);
}
function z(t) {
  if ($ === null)
    return t();
  const e = $;
  $ = null;
  try {
    return t();
  } finally {
    $ = e;
  }
}
function Ct(t) {
  return C === null || (C.cleanups === null ? C.cleanups = [t] : C.cleanups.push(t)), t;
}
function zn(t) {
  ye || (ye = Symbol("error")), C === null || (C.context === null ? C.context = {
    [ye]: [t]
  } : C.context[ye] ? C.context[ye].push(t) : C.context[ye] = [t]);
}
function Bn() {
  return $;
}
function V() {
  return C;
}
function Bs(t) {
  X.push.apply(X, t), t.length = 0;
}
function Jt(t, e) {
  const r = Symbol("context");
  return {
    id: r,
    Provider: Js(r),
    defaultValue: t
  };
}
function Pr(t) {
  let e;
  return (e = ut(C, t.id)) !== void 0 ? e : t.defaultValue;
}
function Gs(t) {
  const e = K(t), r = K(() => pr(e()));
  return r.toArray = () => {
    const n = r();
    return Array.isArray(n) ? n : n != null ? [n] : [];
  }, r;
}
let Me;
function Ws() {
  return Me || (Me = Jt({}));
}
function Gn() {
  const t = oe;
  if (this.sources && (this.state || t))
    if (this.state === ue || t)
      Ve(this);
    else {
      const e = F;
      F = null, ve(() => Nt(this), !1), F = e;
    }
  if ($) {
    const e = this.observers ? this.observers.length : 0;
    $.sources ? ($.sources.push(this), $.sourceSlots.push(e)) : ($.sources = [this], $.sourceSlots = [e]), this.observers ? (this.observers.push($), this.observerSlots.push($.sources.length - 1)) : (this.observers = [$], this.observerSlots = [$.sources.length - 1]);
  }
  return this.value;
}
function Wn(t, e, r) {
  let n = t.value;
  return (!t.comparator || !t.comparator(n, e)) && (t.value = e, t.observers && t.observers.length && ve(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const i = t.observers[s], a = oe && oe.running;
      a && oe.disposed.has(i), (a && !i.tState || !a && !i.state) && (i.pure ? F.push(i) : X.push(i), i.observers && Kn(i)), a || (i.state = ue);
    }
    if (F.length > 1e6)
      throw F = [], new Error();
  }, !1)), e;
}
function Ve(t) {
  if (!t.fn)
    return;
  Ht(t);
  const e = C, r = $, n = $r;
  $ = C = t, Fs(t, t.value, n), $ = r, C = e;
}
function Fs(t, e, r) {
  let n;
  try {
    n = t.fn(e);
  } catch (s) {
    t.pure && (t.state = ue, t.owned && t.owned.forEach(Ht), t.owned = null), Jn(s);
  }
  (!t.updatedAt || t.updatedAt <= r) && (t.updatedAt != null && "observers" in t ? Wn(t, n) : t.value = n, t.updatedAt = r);
}
function Yt(t, e, r, n = ue, s) {
  const i = {
    fn: t,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: C,
    context: null,
    pure: r
  };
  return C === null || C !== Vn && (C.owned ? C.owned.push(i) : C.owned = [i]), i;
}
function Tt(t) {
  const e = oe;
  if (t.state === 0 || e)
    return;
  if (t.state === At || e)
    return Nt(t);
  if (t.suspense && z(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const r = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < $r); )
    (t.state || e) && r.push(t);
  for (let n = r.length - 1; n >= 0; n--)
    if (t = r[n], t.state === ue || e)
      Ve(t);
    else if (t.state === At || e) {
      const s = F;
      F = null, ve(() => Nt(t, r[0]), !1), F = s;
    }
}
function ve(t, e) {
  if (F)
    return t();
  let r = !1;
  e || (F = []), X ? r = !0 : X = [], $r++;
  try {
    const n = t();
    return Ks(r), n;
  } catch (n) {
    r || (X = null), F = null, Jn(n);
  }
}
function Ks(t) {
  if (F && (Fn(F), F = null), t)
    return;
  const e = X;
  X = null, e.length && ve(() => Zn(e), !1);
}
function Fn(t) {
  for (let e = 0; e < t.length; e++)
    Tt(t[e]);
}
function qs(t) {
  let e, r = 0;
  for (e = 0; e < t.length; e++) {
    const n = t[e];
    n.user ? t[r++] = n : Tt(n);
  }
  for (j.context && Ge(), e = 0; e < r; e++)
    Tt(t[e]);
}
function Nt(t, e) {
  const r = oe;
  t.state = 0;
  for (let n = 0; n < t.sources.length; n += 1) {
    const s = t.sources[n];
    s.sources && (s.state === ue || r ? s !== e && Tt(s) : (s.state === At || r) && Nt(s, e));
  }
}
function Kn(t) {
  const e = oe;
  for (let r = 0; r < t.observers.length; r += 1) {
    const n = t.observers[r];
    (!n.state || e) && (n.state = At, n.pure ? F.push(n) : X.push(n), n.observers && Kn(n));
  }
}
function Ht(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const r = t.sources.pop(), n = t.sourceSlots.pop(), s = r.observers;
      if (s && s.length) {
        const i = s.pop(), a = r.observerSlots.pop();
        n < s.length && (i.sourceSlots[a] = n, s[n] = i, r.observerSlots[n] = a);
      }
    }
  if (t.owned) {
    for (e = 0; e < t.owned.length; e++)
      Ht(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = 0; e < t.cleanups.length; e++)
      t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0, t.context = null;
}
function qn(t) {
  return t instanceof Error || typeof t == "string" ? t : new Error("Unknown error");
}
function Br(t, e) {
  for (const r of t)
    r(e);
}
function Jn(t) {
  t = qn(t);
  const e = ye && ut(C, ye);
  if (!e)
    throw t;
  X ? X.push({
    fn() {
      Br(e, t);
    },
    state: ue
  }) : Br(e, t);
}
function ut(t, e) {
  return t ? t.context && t.context[e] !== void 0 ? t.context[e] : ut(t.owner, e) : void 0;
}
function pr(t) {
  if (typeof t == "function" && !t.length)
    return pr(t());
  if (Array.isArray(t)) {
    const e = [];
    for (let r = 0; r < t.length; r++) {
      const n = pr(t[r]);
      Array.isArray(n) ? e.push.apply(e, n) : e.push(n);
    }
    return e;
  }
  return t;
}
function Js(t, e) {
  return function(n) {
    let s;
    return te(() => s = z(() => (C.context = {
      [t]: n.value
    }, Gs(() => n.children))), void 0), s;
  };
}
function qe(t) {
  const [e, r] = D(void 0, {
    equals: !1
  });
  if ("subscribe" in t) {
    const n = t.subscribe((s) => r(() => s));
    Ct(() => "unsubscribe" in n ? n.unsubscribe() : n());
  } else {
    const n = t(r);
    Ct(n);
  }
  return e;
}
const Ys = Symbol("fallback");
function Gr(t) {
  for (let e = 0; e < t.length; e++)
    t[e]();
}
function Hs(t, e, r = {}) {
  let n = [], s = [], i = [], a = 0, o = e.length > 1 ? [] : null;
  return Ct(() => Gr(i)), () => {
    let c = t() || [], l, u;
    return c[hr], z(() => {
      let b = c.length, m, E, x, O, T, M, L, B, H;
      if (b === 0)
        a !== 0 && (Gr(i), i = [], n = [], s = [], a = 0, o && (o = [])), r.fallback && (n = [Ys], s[0] = Ke((ie) => (i[0] = ie, r.fallback())), a = 1);
      else if (a === 0) {
        for (s = new Array(b), u = 0; u < b; u++)
          n[u] = c[u], s[u] = Ke(h);
        a = b;
      } else {
        for (x = new Array(b), O = new Array(b), o && (T = new Array(b)), M = 0, L = Math.min(a, b); M < L && n[M] === c[M]; M++)
          ;
        for (L = a - 1, B = b - 1; L >= M && B >= M && n[L] === c[B]; L--, B--)
          x[B] = s[L], O[B] = i[L], o && (T[B] = o[L]);
        for (m = /* @__PURE__ */ new Map(), E = new Array(B + 1), u = B; u >= M; u--)
          H = c[u], l = m.get(H), E[u] = l === void 0 ? -1 : l, m.set(H, u);
        for (l = M; l <= L; l++)
          H = n[l], u = m.get(H), u !== void 0 && u !== -1 ? (x[u] = s[l], O[u] = i[l], o && (T[u] = o[l]), u = E[u], m.set(H, u)) : i[l]();
        for (u = M; u < b; u++)
          u in x ? (s[u] = x[u], i[u] = O[u], o && (o[u] = T[u], o[u](u))) : s[u] = Ke(h);
        s = s.slice(0, a = b), n = c.slice(0);
      }
      return s;
    });
    function h(b) {
      if (i[u] = b, o) {
        const [m, E] = D(u);
        return o[u] = E, e(c[u], m);
      }
      return e(c[u]);
    }
  };
}
function g(t, e) {
  return z(() => t(e || {}));
}
function ht() {
  return !0;
}
const mr = {
  get(t, e, r) {
    return e === ne ? r : t.get(e);
  },
  has(t, e) {
    return e === ne ? !0 : t.has(e);
  },
  set: ht,
  deleteProperty: ht,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: ht,
      deleteProperty: ht
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function lr(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function Yn(...t) {
  let e = !1;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    e = e || !!s && ne in s, t[n] = typeof s == "function" ? (e = !0, K(s)) : s;
  }
  if (e)
    return new Proxy({
      get(n) {
        for (let s = t.length - 1; s >= 0; s--) {
          const i = lr(t[s])[n];
          if (i !== void 0)
            return i;
        }
      },
      has(n) {
        for (let s = t.length - 1; s >= 0; s--)
          if (n in lr(t[s]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let s = 0; s < t.length; s++)
          n.push(...Object.keys(lr(t[s])));
        return [...new Set(n)];
      }
    }, mr);
  const r = {};
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n]) {
      const s = Object.getOwnPropertyDescriptors(t[n]);
      for (const i in s)
        i in r || Object.defineProperty(r, i, {
          enumerable: !0,
          get() {
            for (let a = t.length - 1; a >= 0; a--) {
              const o = (t[a] || {})[i];
              if (o !== void 0)
                return o;
            }
          }
        });
    }
  return r;
}
function Hn(t, ...e) {
  const r = new Set(e.flat());
  if (ne in t) {
    const s = e.map((i) => new Proxy({
      get(a) {
        return i.includes(a) ? t[a] : void 0;
      },
      has(a) {
        return i.includes(a) && a in t;
      },
      keys() {
        return i.filter((a) => a in t);
      }
    }, mr));
    return s.push(new Proxy({
      get(i) {
        return r.has(i) ? void 0 : t[i];
      },
      has(i) {
        return r.has(i) ? !1 : i in t;
      },
      keys() {
        return Object.keys(t).filter((i) => !r.has(i));
      }
    }, mr)), s;
  }
  const n = Object.getOwnPropertyDescriptors(t);
  return e.push(Object.keys(n).filter((s) => !r.has(s))), e.map((s) => {
    const i = {};
    for (let a = 0; a < s.length; a++) {
      const o = s[a];
      o in t && Object.defineProperty(i, o, n[o] ? n[o] : {
        get() {
          return t[o];
        },
        set() {
          return !0;
        },
        enumerable: !0
      });
    }
    return i;
  });
}
function Xs(t) {
  const e = "fallback" in t && {
    fallback: () => t.fallback
  };
  return K(Hs(() => t.each, t.children, e || void 0));
}
function pe(t) {
  let e = !1;
  const r = t.keyed, n = K(() => t.when, void 0, {
    equals: (s, i) => e ? s === i : !s == !i
  });
  return K(() => {
    const s = n();
    if (s) {
      const i = t.children, a = typeof i == "function" && i.length > 0;
      return e = r || a, a ? z(() => i(s)) : i;
    }
    return t.fallback;
  }, void 0, void 0);
}
const Qs = Jt();
function Xt(t) {
  let e = 0, r, n, s, i, a;
  const [o, c] = D(!1), l = Ws(), u = {
    increment: () => {
      ++e === 1 && c(!0);
    },
    decrement: () => {
      --e === 0 && c(!1);
    },
    inFallback: o,
    effects: [],
    resolved: !1
  }, h = V();
  if (j.context && j.load) {
    const E = j.context.id + j.context.count;
    let x = j.load(E);
    if (x && (s = x[0]) && s !== "$$f") {
      (typeof s != "object" || !("then" in s)) && (s = Promise.resolve(s));
      const [O, T] = D(void 0, {
        equals: !1
      });
      i = O, s.then((M) => {
        if (M || j.done)
          return M && (a = M), T();
        j.gather(E), Ge(n), T(), Ge();
      });
    }
  }
  const b = Pr(Qs);
  b && (r = b.register(u.inFallback));
  let m;
  return Ct(() => m && m()), g(l.Provider, {
    value: u,
    get children() {
      return K(() => {
        if (a)
          throw a;
        if (n = j.context, i)
          return i(), i = void 0;
        n && s === "$$f" && Ge();
        const E = K(() => t.children);
        return K((x) => {
          const O = u.inFallback(), {
            showContent: T = !0,
            showFallback: M = !0
          } = r ? r() : {};
          if ((!O || s && s !== "$$f") && T)
            return u.resolved = !0, m && m(), m = n = s = void 0, Bs(u.effects), E();
          if (!!M)
            return m ? x : Ke((L) => (m = L, n && (Ge({
              id: n.id + "f",
              count: 0
            }), n = void 0), t.fallback), h);
        });
      });
    }
  });
}
const ei = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], ti = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...ei]), ri = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), ni = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Wr = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly"
}), si = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), ii = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function ai(t, e, r) {
  let n = r.length, s = e.length, i = n, a = 0, o = 0, c = e[s - 1].nextSibling, l = null;
  for (; a < s || o < i; ) {
    if (e[a] === r[o]) {
      a++, o++;
      continue;
    }
    for (; e[s - 1] === r[i - 1]; )
      s--, i--;
    if (s === a) {
      const u = i < n ? o ? r[o - 1].nextSibling : r[i - o] : c;
      for (; o < i; )
        t.insertBefore(r[o++], u);
    } else if (i === o)
      for (; a < s; )
        (!l || !l.has(e[a])) && e[a].remove(), a++;
    else if (e[a] === r[i - 1] && r[o] === e[s - 1]) {
      const u = e[--s].nextSibling;
      t.insertBefore(r[o++], e[a++].nextSibling), t.insertBefore(r[--i], u), e[s] = r[i];
    } else {
      if (!l) {
        l = /* @__PURE__ */ new Map();
        let h = o;
        for (; h < i; )
          l.set(r[h], h++);
      }
      const u = l.get(e[a]);
      if (u != null)
        if (o < u && u < i) {
          let h = a, b = 1, m;
          for (; ++h < s && h < i && !((m = l.get(e[h])) == null || m !== u + b); )
            b++;
          if (b > u - o) {
            const E = e[a];
            for (; o < u; )
              t.insertBefore(r[o++], E);
          } else
            t.replaceChild(r[o++], e[a++]);
        } else
          a++;
      else
        e[a++].remove();
    }
  }
}
const Fr = "_$DX_DELEGATE";
function U(t, e, r) {
  const n = document.createElement("template");
  n.innerHTML = t;
  let s = n.content.firstChild;
  return r && (s = s.firstChild), s;
}
function oi(t, e = window.document) {
  const r = e[Fr] || (e[Fr] = /* @__PURE__ */ new Set());
  for (let n = 0, s = t.length; n < s; n++) {
    const i = t[n];
    r.has(i) || (r.add(i), e.addEventListener(i, gi));
  }
}
function Y(t, e, r) {
  r == null ? t.removeAttribute(e) : t.setAttribute(e, r);
}
function ci(t, e, r, n) {
  n == null ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, n);
}
function li(t, e) {
  e == null ? t.removeAttribute("class") : t.className = e;
}
function ui(t, e, r, n) {
  if (n)
    Array.isArray(r) ? (t[`$$${e}`] = r[0], t[`$$${e}Data`] = r[1]) : t[`$$${e}`] = r;
  else if (Array.isArray(r)) {
    const s = r[0];
    t.addEventListener(e, r[0] = (i) => s.call(t, r[1], i));
  } else
    t.addEventListener(e, r);
}
function di(t, e, r = {}) {
  const n = Object.keys(e || {}), s = Object.keys(r);
  let i, a;
  for (i = 0, a = s.length; i < a; i++) {
    const o = s[i];
    !o || o === "undefined" || e[o] || (Kr(t, o, !1), delete r[o]);
  }
  for (i = 0, a = n.length; i < a; i++) {
    const o = n[i], c = !!e[o];
    !o || o === "undefined" || r[o] === c || !c || (Kr(t, o, !0), r[o] = c);
  }
  return r;
}
function fi(t, e, r) {
  if (!e)
    return r ? Y(t, "style") : e;
  const n = t.style;
  if (typeof e == "string")
    return n.cssText = e;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), e || (e = {});
  let s, i;
  for (i in r)
    e[i] == null && n.removeProperty(i), delete r[i];
  for (i in e)
    s = e[i], s !== r[i] && (n.setProperty(i, s), r[i] = s);
  return r;
}
function Xn(t, e = {}, r, n) {
  const s = {};
  return n || te(() => s.children = De(t, e.children, s.children)), te(() => e.ref && e.ref(t)), te(() => pi(t, e, r, !0, s, !0)), s;
}
function hi(t, e, r) {
  return z(() => t(e, r));
}
function k(t, e, r, n) {
  if (r !== void 0 && !n && (n = []), typeof e != "function")
    return De(t, e, n, r);
  te((s) => De(t, e(), s, r), n);
}
function pi(t, e, r, n, s = {}, i = !1) {
  e || (e = {});
  for (const a in s)
    if (!(a in e)) {
      if (a === "children")
        continue;
      s[a] = qr(t, a, null, s[a], r, i);
    }
  for (const a in e) {
    if (a === "children") {
      n || De(t, e.children);
      continue;
    }
    const o = e[a];
    s[a] = qr(t, a, o, s[a], r, i);
  }
}
function mi(t) {
  return t.toLowerCase().replace(/-([a-z])/g, (e, r) => r.toUpperCase());
}
function Kr(t, e, r) {
  const n = e.trim().split(/\s+/);
  for (let s = 0, i = n.length; s < i; s++)
    t.classList.toggle(n[s], r);
}
function qr(t, e, r, n, s, i) {
  let a, o, c;
  if (e === "style")
    return fi(t, r, n);
  if (e === "classList")
    return di(t, r, n);
  if (r === n)
    return n;
  if (e === "ref")
    i || r(t);
  else if (e.slice(0, 3) === "on:") {
    const l = e.slice(3);
    n && t.removeEventListener(l, n), r && t.addEventListener(l, r);
  } else if (e.slice(0, 10) === "oncapture:") {
    const l = e.slice(10);
    n && t.removeEventListener(l, n, !0), r && t.addEventListener(l, r, !0);
  } else if (e.slice(0, 2) === "on") {
    const l = e.slice(2).toLowerCase(), u = si.has(l);
    if (!u && n) {
      const h = Array.isArray(n) ? n[0] : n;
      t.removeEventListener(l, h);
    }
    (u || r) && (ui(t, l, r, u), u && oi([l]));
  } else if ((c = ri.has(e)) || !s && (Wr[e] || (o = ti.has(e))) || (a = t.nodeName.includes("-")))
    e === "class" || e === "className" ? li(t, r) : a && !o && !c ? t[mi(e)] = r : t[Wr[e] || e] = r;
  else {
    const l = s && e.indexOf(":") > -1 && ii[e.split(":")[0]];
    l ? ci(t, l, e, r) : Y(t, ni[e] || e, r);
  }
  return r;
}
function gi(t) {
  const e = `$$${t.type}`;
  let r = t.composedPath && t.composedPath()[0] || t.target;
  for (t.target !== r && Object.defineProperty(t, "target", {
    configurable: !0,
    value: r
  }), Object.defineProperty(t, "currentTarget", {
    configurable: !0,
    get() {
      return r || document;
    }
  }), j.registry && !j.done && (j.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
    for (; n && n.nodeType !== 8 && n.nodeValue !== "pl-" + t; ) {
      let s = n.nextSibling;
      n.remove(), n = s;
    }
    n && n.remove();
  })); r; ) {
    const n = r[e];
    if (n && !r.disabled) {
      const s = r[`${e}Data`];
      if (s !== void 0 ? n.call(r, s, t) : n.call(r, t), t.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function De(t, e, r, n, s) {
  for (j.context && !r && (r = [...t.childNodes]); typeof r == "function"; )
    r = r();
  if (e === r)
    return r;
  const i = typeof e, a = n !== void 0;
  if (t = a && r[0] && r[0].parentNode || t, i === "string" || i === "number") {
    if (j.context)
      return r;
    if (i === "number" && (e = e.toString()), a) {
      let o = r[0];
      o && o.nodeType === 3 ? o.data = e : o = document.createTextNode(e), r = $e(t, r, n, o);
    } else
      r !== "" && typeof r == "string" ? r = t.firstChild.data = e : r = t.textContent = e;
  } else if (e == null || i === "boolean") {
    if (j.context)
      return r;
    r = $e(t, r, n);
  } else {
    if (i === "function")
      return te(() => {
        let o = e();
        for (; typeof o == "function"; )
          o = o();
        r = De(t, o, r, n);
      }), () => r;
    if (Array.isArray(e)) {
      const o = [], c = r && Array.isArray(r);
      if (gr(o, e, r, s))
        return te(() => r = De(t, o, r, n, !0)), () => r;
      if (j.context) {
        if (!o.length)
          return r;
        for (let l = 0; l < o.length; l++)
          if (o[l].parentNode)
            return r = o;
      }
      if (o.length === 0) {
        if (r = $e(t, r, n), a)
          return r;
      } else
        c ? r.length === 0 ? Jr(t, o, n) : ai(t, r, o) : (r && $e(t), Jr(t, o));
      r = o;
    } else if (e instanceof Node) {
      if (j.context && e.parentNode)
        return r = a ? [e] : e;
      if (Array.isArray(r)) {
        if (a)
          return r = $e(t, r, n, e);
        $e(t, r, null, e);
      } else
        r == null || r === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      r = e;
    }
  }
  return r;
}
function gr(t, e, r, n) {
  let s = !1;
  for (let i = 0, a = e.length; i < a; i++) {
    let o = e[i], c = r && r[i];
    if (o instanceof Node)
      t.push(o);
    else if (!(o == null || o === !0 || o === !1))
      if (Array.isArray(o))
        s = gr(t, o, c) || s;
      else if (typeof o == "function")
        if (n) {
          for (; typeof o == "function"; )
            o = o();
          s = gr(t, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || s;
        } else
          t.push(o), s = !0;
      else {
        const l = String(o);
        c && c.nodeType === 3 && c.data === l ? t.push(c) : t.push(document.createTextNode(l));
      }
  }
  return s;
}
function Jr(t, e, r = null) {
  for (let n = 0, s = e.length; n < s; n++)
    t.insertBefore(e[n], r);
}
function $e(t, e, r, n) {
  if (r === void 0)
    return t.textContent = "";
  const s = n || document.createTextNode("");
  if (e.length) {
    let i = !1;
    for (let a = e.length - 1; a >= 0; a--) {
      const o = e[a];
      if (s !== o) {
        const c = o.parentNode === t;
        !i && !a ? c ? t.replaceChild(s, o) : t.insertBefore(s, r) : c && o.remove();
      } else
        i = !0;
    }
  } else
    t.insertBefore(s, r);
  return [s];
}
function yi(t) {
  const e = Object.keys(t), r = {};
  for (let n = 0; n < e.length; n++) {
    const [s, i] = D(t[e[n]]);
    Object.defineProperty(r, e[n], {
      get: s,
      set(a) {
        i(() => a);
      }
    });
  }
  return r;
}
function bi(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function wi(t) {
  return (e, r) => {
    const { element: n } = r;
    return Ke((s) => {
      const i = yi(e);
      n.addPropertyChangedCallback((o, c) => i[o] = c), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", s();
      });
      const a = t(i, r);
      return k(n.renderRoot, a);
    }, bi(n));
  };
}
function vi(t, e, r) {
  return arguments.length === 2 && (r = e, e = {}), Zs(t, e)(wi(r));
}
const yr = Symbol("store-raw"), Je = Symbol("store-node"), _i = Symbol("store-name");
function Qn(t, e) {
  let r = t[ne];
  if (!r && (Object.defineProperty(t, ne, {
    value: r = new Proxy(t, ki)
  }), !Array.isArray(t))) {
    const n = Object.keys(t), s = Object.getOwnPropertyDescriptors(t);
    for (let i = 0, a = n.length; i < a; i++) {
      const o = n[i];
      s[o].get && Object.defineProperty(t, o, {
        enumerable: s[o].enumerable,
        get: s[o].get.bind(r)
      });
    }
  }
  return r;
}
function Ot(t) {
  let e;
  return t != null && typeof t == "object" && (t[ne] || !(e = Object.getPrototypeOf(t)) || e === Object.prototype || Array.isArray(t));
}
function Ye(t, e = /* @__PURE__ */ new Set()) {
  let r, n, s, i;
  if (r = t != null && t[yr])
    return r;
  if (!Ot(t) || e.has(t))
    return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? t = t.slice(0) : e.add(t);
    for (let a = 0, o = t.length; a < o; a++)
      s = t[a], (n = Ye(s, e)) !== s && (t[a] = n);
  } else {
    Object.isFrozen(t) ? t = Object.assign({}, t) : e.add(t);
    const a = Object.keys(t), o = Object.getOwnPropertyDescriptors(t);
    for (let c = 0, l = a.length; c < l; c++)
      i = a[c], !o[i].get && (s = t[i], (n = Ye(s, e)) !== s && (t[i] = n));
  }
  return t;
}
function jr(t) {
  let e = t[Je];
  return e || Object.defineProperty(t, Je, {
    value: e = {}
  }), e;
}
function br(t, e, r) {
  return t[e] || (t[e] = ts(r));
}
function xi(t, e) {
  const r = Reflect.getOwnPropertyDescriptor(t, e);
  return !r || r.get || !r.configurable || e === ne || e === Je || e === _i || (delete r.value, delete r.writable, r.get = () => t[ne][e]), r;
}
function es(t) {
  if (Bn()) {
    const e = jr(t);
    (e._ || (e._ = ts()))();
  }
}
function Si(t) {
  return es(t), Reflect.ownKeys(t);
}
function ts(t) {
  const [e, r] = D(t, {
    equals: !1,
    internal: !0
  });
  return e.$ = r, e;
}
const ki = {
  get(t, e, r) {
    if (e === yr)
      return t;
    if (e === ne)
      return r;
    if (e === hr)
      return es(t), r;
    const n = jr(t), s = n.hasOwnProperty(e);
    let i = s ? n[e]() : t[e];
    if (e === Je || e === "__proto__")
      return i;
    if (!s) {
      const a = Object.getOwnPropertyDescriptor(t, e);
      Bn() && (typeof i != "function" || t.hasOwnProperty(e)) && !(a && a.get) && (i = br(n, e, i)());
    }
    return Ot(i) ? Qn(i) : i;
  },
  has(t, e) {
    return e === yr || e === ne || e === hr || e === Je || e === "__proto__" ? !0 : (this.get(t, e, t), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Si,
  getOwnPropertyDescriptor: xi
};
function $t(t, e, r, n = !1) {
  if (!n && t[e] === r)
    return;
  const s = t[e], i = t.length;
  r === void 0 ? delete t[e] : t[e] = r;
  let a = jr(t), o;
  (o = br(a, e, s)) && o.$(() => r), Array.isArray(t) && t.length !== i && (o = br(a, "length", i)) && o.$(t.length), (o = a._) && o.$();
}
function rs(t, e) {
  const r = Object.keys(e);
  for (let n = 0; n < r.length; n += 1) {
    const s = r[n];
    $t(t, s, e[s]);
  }
}
function Ei(t, e) {
  if (typeof e == "function" && (e = e(t)), e = Ye(e), Array.isArray(e)) {
    if (t === e)
      return;
    let r = 0, n = e.length;
    for (; r < n; r++) {
      const s = e[r];
      t[r] !== s && $t(t, r, s);
    }
    $t(t, "length", n);
  } else
    rs(t, e);
}
function We(t, e, r = []) {
  let n, s = t;
  if (e.length > 1) {
    n = e.shift();
    const a = typeof n, o = Array.isArray(t);
    if (Array.isArray(n)) {
      for (let c = 0; c < n.length; c++)
        We(t, [n[c]].concat(e), r);
      return;
    } else if (o && a === "function") {
      for (let c = 0; c < t.length; c++)
        n(t[c], c) && We(t, [c].concat(e), r);
      return;
    } else if (o && a === "object") {
      const {
        from: c = 0,
        to: l = t.length - 1,
        by: u = 1
      } = n;
      for (let h = c; h <= l; h += u)
        We(t, [h].concat(e), r);
      return;
    } else if (e.length > 1) {
      We(t[n], e, [n].concat(r));
      return;
    }
    s = t[n], r = [n].concat(r);
  }
  let i = e[0];
  typeof i == "function" && (i = i(s, r), i === s) || n === void 0 && i == null || (i = Ye(i), n === void 0 || Ot(s) && Ot(i) && !Array.isArray(i) ? rs(s, i) : $t(t, n, i));
}
function Qt(...[t, e]) {
  const r = Ye(t || {}), n = Array.isArray(r), s = Qn(r);
  function i(...a) {
    zs(() => {
      n && a.length === 1 ? Ei(r, a[0]) : We(r, a);
    });
  }
  return [s, i];
}
var wr = (t, e, r) => {
  const n = e.trim().split(".").reduce((s, i) => s ? s[i] : void 0, t);
  return n !== void 0 ? n : r;
}, Ai = (t, e, r = /{{(.*?)}}/g) => t.replace(r, (n, s) => wr(e, s, "")), Ci = (t = {}, e = navigator.language in t ? navigator.language : Object.keys(t)[0]) => {
  const [r, n] = D(e), [s, i] = Qt(t);
  return [(c, l, u) => {
    const h = wr(s[r()], c, u || "");
    return typeof h == "function" ? h(l) : typeof h == "string" ? Ai(h, l || {}) : h;
  }, {
    add(c, l) {
      i(c, (u) => Object.assign(u || {}, l));
    },
    locale: (c) => c ? n(c) : r(),
    dict: (c) => wr(s, c)
  }];
}, ns = Jt({}), Se = () => Pr(ns);
const Ti = `:where(html){line-height:1.15}:where(h1){font-size:2em;margin-block-end:.67em;margin-block-start:.67em}:where(dl,ol,ul) :where(dl,ol,ul){margin-block-end:0;margin-block-start:0}:where(hr){box-sizing:content-box;color:inherit;height:0}:where(pre){font-family:monospace,monospace;font-size:1em}:where(abbr[title]){text-decoration:underline;text-decoration:underline dotted}:where(b,strong){font-weight:bolder}:where(code,kbd,samp){font-family:monospace,monospace;font-size:1em}:where(small){font-size:80%}:where(table){border-color:currentColor;text-indent:0}:where(button,input,select){margin:0}:where(button){text-transform:none}:where(button,input:is([type="button" i],[type="reset" i],[type="submit" i])){-webkit-appearance:button}:where(progress){vertical-align:baseline}:where(select){text-transform:none}:where(textarea){margin:0}:where(input[type="search" i]){-webkit-appearance:textfield;outline-offset:-2px}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}:where(button,input:is([type="button" i],[type="color" i],[type="reset" i],[type="submit" i]))::-moz-focus-inner{border-style:none;padding:0}:where(button,input:is([type="button" i],[type="color" i],[type="reset" i],[type="submit" i]))::-moz-focusring{outline:1px dotted ButtonText}:where(:-moz-ui-invalid){box-shadow:none}:where(dialog){background-color:#fff;border:solid;color:#000;height:-moz-fit-content;height:fit-content;left:0;margin:auto;padding:1em;position:absolute;right:0;width:-moz-fit-content;width:fit-content}:where(dialog:not([open])){display:none}:where(summary){display:list-item}
`, Ni = `main.app{border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.top-bar h1{text-align:center}.top-bar menu{display:flex;justify-content:space-around;column-gap:10px}.loading{text-align:center}sl-icon.rotate{animation:turn 1s infinite linear}@keyframes turn{0%{transform:rotate(0)}to{transform:rotate(180deg)}}sl-button{margin-right:1rem}sl-tab>sl-icon{margin-right:.5rem}form [data-invalid]::part(base){border-color:var(--sl-color-danger-600)}form .form-error{padding:1rem;margin-bottom:1rem;color:#000;background-color:var(--sl-color-orange-50);border-color:var(--sl-color-orange-200);border-radius:10px;border-style:solid;border-width:2px}form .field{margin:0rem .2rem 1rem}form .field>.error{display:flex;column-gap:.2rem;padding:.5rem 0;color:var(--sl-color-danger-600)}
`, Oi = "E-post adresse", $i = "Passord", Pi = "Profil", ji = "Konto", Ri = "Kontakt", Ii = "Lagre", Mi = "Adresse", Di = "Telefonnummer", Li = "Avtale", Yr = {
  "Sign up": "Opprett konto",
  "Sign in": "Logg inn",
  "Sign out": "Logg ut",
  Email: Oi,
  Password: $i,
  Profile: Pi,
  Account: ji,
  Contact: Ri,
  Save: Ii,
  "First name": "Fornavn",
  "Last name": "Etternavn",
  Address: Mi,
  Phone: Di,
  "My membership": "Mitt medlemskap",
  Subscription: Li,
  "Failed signing up": "Kunne ikke opprette konto",
  "Failed signing in": "Kunne ikke logge inn",
  "Did you type your password and email correct?": "Har du skrevet riktig passord og e-post-adresse?",
  "Did you already sign up?": "Har du allerede registrert deg?",
  "Error saving": "Kunne ikke lagre",
  "Must be a valid email address": "Ugyldig adresse",
  "Must be a valid name": "Ugyldig navn",
  "Must be a valid street address": "Ugyldig adresse",
  "Must be 3-16 charcters and contain one digit and a special char": "M\xE5 v\xE6re 3-16 tegn langt og inneha ett tall og et tegn"
}, ss = [{
  code: "no",
  name: "norsk",
  dict: Yr
}, {
  code: "en",
  name: "english",
  dict: Object.keys(Yr).reduce((t, e) => ({
    ...t,
    [e]: e
  }), [])
}], Ui = ss.reduce((t, {
  code: e,
  dict: r
}) => ({
  ...t,
  [e]: r
}), {}), Hr = ss.map(({
  code: t,
  name: e
}) => ({
  code: t,
  name: e
})), Zi = (t) => g(ns.Provider, {
  get value() {
    return Ci(Ui);
  },
  get children() {
    return t.children;
  }
});
var Vi = Object.defineProperty, zi = (t, e) => {
  for (var r in e)
    Vi(t, r, { get: e[r], enumerable: !0 });
}, Bi = class {
  collectable = {};
  listeners = {};
  interceptors;
  constructor({ interceptors: t } = {}) {
    this.interceptors = t ?? {};
  }
  subscribe(t, e, r = !1) {
    if (this.listeners[t] || (this.listeners[t] = []), !this.isSubscribed(t, e) && (this.listeners[t]?.push(e), r && this.collectable[t])) {
      let n = this.collectable[t];
      this.collectable[t] = [];
      for (let s of n)
        e(...s);
    }
  }
  subscribeOnce(t, e = !1) {
    return new Promise((r) => {
      let n = !1, s = (...i) => {
        n || (n = !0, this.unSubscribe(t, s), r(i));
      };
      this.subscribe(t, s, e);
    });
  }
  unSubscribe(t, e) {
    if (this.listeners[t]) {
      let r = this.listeners[t]?.findIndex((n) => n === e);
      r && this.listeners[t]?.splice(r, 1);
    }
  }
  isSubscribed(t, e) {
    return !!this.listeners[t]?.includes(e);
  }
  async emit(t, e, r = !1) {
    let n = this.interceptors[t], s = n ? await n(...e) : e;
    this.listeners[t]?.length === 0 && r && (this.collectable[t] || (this.collectable[t] = []), this.collectable[t]?.push(e));
    for (let i of this.listeners[t] ?? [])
      i(...s);
  }
  reset({ collectable: t, listeners: e }) {
    if (Array.isArray(t))
      for (let r of t)
        delete this.collectable[r];
    else
      typeof t == "string" ? delete this.collectable[t] : t !== !1 && (this.collectable = {});
    if (Array.isArray(e))
      for (let r of e)
        delete this.listeners[r];
    else
      typeof e == "string" ? delete this.listeners[e] : e !== !1 && (this.listeners = {});
  }
  scanListeners(t) {
    let e = Object.keys(this.listeners);
    return t && (e = e.filter(t)), e;
  }
}, Gi = {};
zi(Gi, { CborBreak: () => mt, CborError: () => Ne, CborFillMissing: () => cs, CborInvalidMajorError: () => er, CborNumberError: () => _r, CborPartialDisabled: () => os, CborRangeError: () => ae, Encoded: () => Rr, Gap: () => ls, POW_2_53: () => Wi, POW_2_64: () => vr, PartiallyEncoded: () => Ir, Reader: () => xr, Tagged: () => Z, Writer: () => tr, decode: () => us, encode: () => Le, infiniteBytes: () => Sr, partiallyEncodeObject: () => Mr });
var Wi = 9007199254740992, vr = BigInt(18446744073709552e3), Rr = class {
  constructor(t) {
    this.encoded = t;
  }
}, R = class extends Error {
}, ke = class extends R {
  name = "NoActiveSocket";
  message = "No socket is currently connected to a SurrealDB instance. Please call the .connect() method first!";
}, is = class extends R {
  name = "EngineDisconnected";
  message = "The engine reported the connection to SurrealDB has dropped";
}, Xr = class extends R {
  constructor(t) {
    super(), this.response = t, this.message = `${t}`;
  }
  name = "UnexpectedServerResponse";
}, Fi = class extends R {
  constructor(t) {
    super(), this.error = t, this.message = `${t}`;
  }
  name = "UnexpectedConnectionError";
}, Ki = class extends R {
  constructor(t) {
    super(), this.engine = t;
  }
  name = "UnsupportedEngine";
  message = "The engine you are trying to connect to is not supported or configured.";
}, as = class extends R {
  name = "ConnectionUnavailable";
  message = "There is no connection available at this moment.";
}, qi = class extends R {
  name = "MissingNamespaceDatabase";
  message = "There are no namespace and/or database configured.";
}, Ji = class extends R {
  constructor(t, e, r, n) {
    super(), this.message = t, this.status = e, this.statusText = r, this.buffer = n;
  }
  name = "HttpConnectionError";
}, N = class extends R {
  constructor(t) {
    super(), this.message = t;
  }
  name = "ResponseError";
}, Yi = class extends R {
  name = "NoNamespaceSpecified";
  message = "Please specify a namespace to use.";
}, Hi = class extends R {
  name = "NoDatabaseSpecified";
  message = "Please specify a database to use.";
}, Qr = class extends R {
  name = "NoTokenReturned";
  message = "Did not receive an authentication token.";
}, Xi = class extends R {
  name = "UnsupportedVersion";
  version;
  supportedRange;
  constructor(t, e) {
    super(), this.version = t, this.supportedRange = e, this.message = `The version "${t}" reported by the engine is not supported by this library, expected a version that satisfies "${e}".`;
  }
}, en = class extends R {
  constructor(t) {
    super(), this.error = t;
  }
  name = "VersionRetrievalFailure";
  message = "Failed to retrieve remote version. If the server is behind a proxy, make sure it's configured correctly.";
}, Ne = class extends R {
  message;
  constructor(t) {
    super(), this.message = t;
  }
}, _r = class extends Ne {
  name = "CborNumberError";
}, ae = class extends Ne {
  name = "CborRangeError";
}, er = class extends Ne {
  name = "CborInvalidMajorError";
}, mt = class extends Ne {
  name = "CborBreak";
  constructor() {
    super("Came across a break which was not intercepted by the decoder");
  }
}, os = class extends Ne {
  name = "CborPartialDisabled";
  constructor() {
    super("Tried to insert a Gap into a CBOR value, while partial mode is not enabled");
  }
}, cs = class extends Ne {
  name = "CborFillMissing";
  constructor() {
    super("Fill for a gap is missing, and gap has no default");
  }
}, ls = class {
  args = [];
  constructor(...t) {
    this.args = t;
  }
  fill(t) {
    return [this, t];
  }
  hasDefault() {
    return this.args.length === 1;
  }
  get default() {
    return this.args[0];
  }
}, tr = class {
  constructor(t = 256) {
    this.byteLength = t, this._buf = new ArrayBuffer(this.byteLength), this._view = new DataView(this._buf), this._byte = new Uint8Array(this._buf);
  }
  _chunks = [];
  _pos = 0;
  _buf;
  _view;
  _byte;
  chunk(t) {
    this._chunks.push([this._buf.slice(0, this._pos), t]), this._buf = new ArrayBuffer(this.byteLength), this._view = new DataView(this._buf), this._byte = new Uint8Array(this._buf), this._pos = 0;
  }
  get chunks() {
    return this._chunks;
  }
  get buffer() {
    return this._buf.slice(0, this._pos);
  }
  claim(t) {
    let e = this._pos;
    if (this._pos += t, this._pos <= this._buf.byteLength)
      return e;
    let r = this._buf.byteLength << 1;
    for (; r < this._pos; )
      r <<= 1;
    if (r > this._buf.byteLength) {
      let n = this._byte;
      this._buf = new ArrayBuffer(r), this._view = new DataView(this._buf), this._byte = new Uint8Array(this._buf), this._byte.set(n);
    }
    return e;
  }
  writeUint8(t) {
    let e = this.claim(1);
    this._view.setUint8(e, t);
  }
  writeUint16(t) {
    let e = this.claim(2);
    this._view.setUint16(e, t);
  }
  writeUint32(t) {
    let e = this.claim(4);
    this._view.setUint32(e, t);
  }
  writeUint64(t) {
    let e = this.claim(8);
    this._view.setBigUint64(e, t);
  }
  writeUint8Array(t) {
    if (t.byteLength === 0)
      return;
    let e = this.claim(t.byteLength);
    this._byte.set(t, e);
  }
  writeArrayBuffer(t) {
    t.byteLength !== 0 && this.writeUint8Array(new Uint8Array(t));
  }
  writePartiallyEncoded(t) {
    for (let [e, r] of t.chunks)
      this.writeArrayBuffer(e), this.chunk(r);
    this.writeArrayBuffer(t.end);
  }
  writeFloat32(t) {
    let e = this.claim(4);
    this._view.setFloat32(e, t);
  }
  writeFloat64(t) {
    let e = this.claim(8);
    this._view.setFloat64(e, t);
  }
  writeMajor(t, e) {
    let r = t << 5;
    e < 24 ? this.writeUint8(r + Number(e)) : e < 256 ? (this.writeUint8(r + 24), this.writeUint8(Number(e))) : e < 65536 ? (this.writeUint8(r + 25), this.writeUint16(Number(e))) : e < 4294967296 ? (this.writeUint8(r + 26), this.writeUint32(Number(e))) : (this.writeUint8(r + 27), this.writeUint64(BigInt(e)));
  }
  output(t, e) {
    return t ? new Ir(this._chunks, this.buffer, e) : this.buffer;
  }
}, Ir = class {
  constructor(t, e, r) {
    this.chunks = t, this.end = e, this.replacer = r;
  }
  build(t, e) {
    let r = new tr(), n = new Map(t);
    for (let [s, i] of this.chunks) {
      let a = n.has(i) || i.hasDefault();
      if (!e && !a)
        throw new cs();
      if (r.writeArrayBuffer(s), a) {
        let o = n.get(i) ?? i.default;
        Le(o, { writer: r, replacer: this.replacer });
      } else
        r.chunk(i);
    }
    return r.writeArrayBuffer(this.end), r.output(!!e, this.replacer);
  }
};
function Mr(t, e) {
  return Object.fromEntries(Object.entries(t).map(([r, n]) => [r, Le(n, { ...e, partial: !0 })]));
}
var Z = class {
  constructor(t, e) {
    this.tag = t, this.value = e;
  }
}, tn;
function Le(t, e = {}) {
  let r = e.writer ?? new tr(), n = new Map(e.fills ?? []);
  function s(i) {
    let a = e.replacer ? e.replacer(i) : i;
    if (a === void 0)
      return r.writeUint8(247);
    if (a === null)
      return r.writeUint8(246);
    if (a === !0)
      return r.writeUint8(245);
    if (a === !1)
      return r.writeUint8(244);
    switch (typeof a) {
      case "number": {
        if (Number.isInteger(a))
          if (a >= 0 && a <= 9007199254740992)
            r.writeMajor(0, a);
          else if (a < 0 && a >= -9007199254740992)
            r.writeMajor(1, -(a + 1));
          else
            throw new _r("Number too big to be encoded");
        else
          r.writeUint8(251), r.writeFloat64(a);
        return;
      }
      case "bigint": {
        if (a >= 0 && a < vr)
          r.writeMajor(0, a);
        else if (a <= 0 && a >= -vr)
          r.writeMajor(1, -(a + 1n));
        else
          throw new _r("BigInt too big to be encoded");
        return;
      }
      case "string": {
        tn ??= new TextEncoder();
        let o = tn.encode(a);
        r.writeMajor(3, o.byteLength), r.writeUint8Array(o);
        return;
      }
      default: {
        if (Array.isArray(a)) {
          r.writeMajor(4, a.length);
          for (let c of a)
            s(c);
          return;
        }
        if (a instanceof Z) {
          r.writeMajor(6, a.tag), s(a.value);
          return;
        }
        if (a instanceof Rr) {
          r.writeArrayBuffer(a.encoded);
          return;
        }
        if (a instanceof ls) {
          if (n.has(a))
            s(n.get(a));
          else {
            if (!e.partial)
              throw new os();
            r.chunk(a);
          }
          return;
        }
        if (a instanceof Ir) {
          let c = a.build(e.fills ?? [], e.partial);
          e.partial ? r.writePartiallyEncoded(c) : r.writeArrayBuffer(c);
          return;
        }
        if (a instanceof Uint8Array || a instanceof Uint16Array || a instanceof Uint32Array || a instanceof Int8Array || a instanceof Int16Array || a instanceof Int32Array || a instanceof Float32Array || a instanceof Float64Array || a instanceof ArrayBuffer) {
          let c = new Uint8Array(a);
          r.writeMajor(2, c.byteLength), r.writeUint8Array(c);
          return;
        }
        let o = a instanceof Map ? Array.from(a.entries()) : Object.entries(a);
        r.writeMajor(5, o.length);
        for (let c of o.flat())
          s(c);
      }
    }
  }
  return s(t), r.output(!!e.partial, e.replacer);
}
var xr = class {
  _buf;
  _view;
  _byte;
  _pos = 0;
  constructor(t) {
    this._buf = new ArrayBuffer(t.byteLength), this._view = new DataView(this._buf), this._byte = new Uint8Array(this._buf), this._byte.set(new Uint8Array(t));
  }
  read(t, e) {
    return this._pos += t, e;
  }
  readUint8() {
    try {
      return this.read(1, this._view.getUint8(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new ae(t.message) : t;
    }
  }
  readUint16() {
    try {
      return this.read(2, this._view.getUint16(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new ae(t.message) : t;
    }
  }
  readUint32() {
    try {
      return this.read(4, this._view.getUint32(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new ae(t.message) : t;
    }
  }
  readUint64() {
    try {
      return this.read(8, this._view.getBigUint64(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new ae(t.message) : t;
    }
  }
  readFloat16() {
    let t = this.readUint16(), e = (t & 32768) >> 15, r = (t & 31744) >> 10, n = t & 1023;
    return r === 0 ? (e ? -1 : 1) * 2 ** -14 * (n / 2 ** 10) : r === 31 ? n ? Number.NaN : (e ? -1 : 1) * Number.POSITIVE_INFINITY : (e ? -1 : 1) * 2 ** (r - 15) * (1 + n / 2 ** 10);
  }
  readFloat32() {
    try {
      return this.read(4, this._view.getFloat32(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new ae(t.message) : t;
    }
  }
  readFloat64() {
    try {
      return this.read(8, this._view.getFloat64(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new ae(t.message) : t;
    }
  }
  readBytes(t) {
    let e = this._byte.length - this._pos;
    if (e < t)
      throw new ae(`The argument must be between 0 and ${e}`);
    return this.read(t, this._byte.slice(this._pos, this._pos + t));
  }
  readMajor() {
    let t = this.readUint8(), e = t >> 5;
    if (e < 0 || e > 7)
      throw new er("Received invalid major type");
    return [e, t & 31];
  }
  readMajorLength(t) {
    if (t <= 23)
      return t;
    switch (t) {
      case 24:
        return this.readUint8();
      case 25:
        return this.readUint16();
      case 26:
        return this.readUint32();
      case 27: {
        let e = this.readUint64();
        return e > 9007199254740992 ? e : Number(e);
      }
    }
    throw new ae("Expected a final length");
  }
};
function Sr(t, e) {
  let r = new tr();
  for (; ; ) {
    let [n, s] = t.readMajor();
    if (n === 7 && s === 31)
      break;
    if (n !== e)
      throw new er(`Expected a resource of the same major (${e}) while processing an infinite resource`);
    if (s === 31)
      throw new ae("Expected a finite resource while processing an infinite resource");
    r.writeUint8Array(t.readBytes(Number(t.readMajorLength(s))));
  }
  return r.buffer;
}
var rn;
function us(t, e = {}) {
  let r = t instanceof xr ? t : new xr(t);
  function n() {
    let [i, a] = r.readMajor();
    switch (i) {
      case 0:
        return r.readMajorLength(a);
      case 1: {
        let o = r.readMajorLength(a);
        return typeof o == "bigint" ? -(o + 1n) : -(o + 1);
      }
      case 2:
        return a === 31 ? Sr(r, 2) : r.readBytes(Number(r.readMajorLength(a))).buffer;
      case 3: {
        let o = a === 31 ? Sr(r, 3) : r.readBytes(Number(r.readMajorLength(a)));
        return rn ??= new TextDecoder(), rn.decode(o);
      }
      case 4: {
        if (a === 31) {
          let l = [];
          for (; ; )
            try {
              l.push(s());
            } catch (u) {
              if (u instanceof mt)
                break;
              throw u;
            }
          return l;
        }
        let o = r.readMajorLength(a), c = Array(o);
        for (let l = 0; l < o; l++)
          c[l] = s();
        return c;
      }
      case 5: {
        let o = [];
        if (a === 31)
          for (; ; ) {
            let c;
            try {
              c = s();
            } catch (u) {
              if (u instanceof mt)
                break;
              throw u;
            }
            let l = s();
            o.push([c, l]);
          }
        else {
          let c = r.readMajorLength(a);
          for (let l = 0; l < c; l++) {
            let u = s(), h = s();
            o[l] = [u, h];
          }
        }
        return e.map === "map" ? new Map(o) : Object.fromEntries(o);
      }
      case 6: {
        let o = r.readMajorLength(a), c = s();
        return new Z(o, c);
      }
      case 7:
        switch (a) {
          case 20:
            return !1;
          case 21:
            return !0;
          case 22:
            return null;
          case 23:
            return;
          case 25:
            return r.readFloat16();
          case 26:
            return r.readFloat32();
          case 27:
            return r.readFloat64();
          case 31:
            throw new mt();
        }
    }
    throw new er(`Unable to decode value with major tag ${i}`);
  }
  function s() {
    return e.replacer ? e.replacer(n()) : n();
  }
  return s();
}
function Qi(t) {
  let e = Math.floor(t.getTime() / 1e3), r = t.getTime() - e * 1e3;
  return [e, r * 1e6];
}
function ea([t, e]) {
  let r = new Date(0);
  return r.setUTCSeconds(Number(t)), r.setMilliseconds(Math.floor(Number(e) / 1e6)), r;
}
var kr = class {
  decimal;
  constructor(t) {
    this.decimal = t.toString();
  }
  toString() {
    return this.decimal;
  }
  toJSON() {
    return this.decimal;
  }
}, Dr = 1, Re = Dr / 1e3, Er = Re / 1e3, Pt = 1e3 * Dr, jt = 60 * Pt, Rt = 60 * jt, It = 24 * Rt, Ar = 7 * It, Lr = /* @__PURE__ */ new Map([["ns", Er], ["\xB5s", Re], ["\u03BCs", Re], ["us", Re], ["ms", Dr], ["s", Pt], ["m", jt], ["h", Rt], ["d", It], ["w", Ar]]), ta = Array.from(Lr).reduce((t, [e, r]) => (t.set(r, e), t), /* @__PURE__ */ new Map()), ra = new RegExp(`^(\\d+)(${Array.from(Lr.keys()).join("|")})`), ur = class ee {
  _milliseconds;
  constructor(e) {
    e instanceof ee ? this._milliseconds = e._milliseconds : typeof e == "string" ? this._milliseconds = ee.parseString(e) : this._milliseconds = e;
  }
  static fromCompact([e, r]) {
    e = e ?? 0, r = r ?? 0;
    let n = e * 1e3 + r / 1e6;
    return new ee(n);
  }
  toCompact() {
    let e = Math.floor(this._milliseconds / 1e3), r = Math.floor((this._milliseconds - e * 1e3) * 1e6);
    return r > 0 ? [e, r] : e > 0 ? [e] : [];
  }
  toString() {
    let e = this._milliseconds, r = "";
    function n(s) {
      let i = Math.floor(e / s);
      return i > 0 && (e = e % s), i;
    }
    for (let [s, i] of Array.from(ta).reverse()) {
      let a = n(s);
      a > 0 && (r += `${a}${i}`);
    }
    return r;
  }
  toJSON() {
    return this.toString();
  }
  static parseString(e) {
    let r = 0, n = e;
    for (; n !== ""; ) {
      let s = n.match(ra);
      if (s) {
        let i = Number.parseInt(s[1]), a = Lr.get(s[2]);
        if (a === void 0)
          throw new R(`Invalid duration unit: ${s[2]}`);
        r += i * a, n = n.slice(s[0].length);
        continue;
      }
      throw new R("Could not match a next duration part");
    }
    return r;
  }
  static nanoseconds(e) {
    return new ee(Math.floor(e * Er));
  }
  static microseconds(e) {
    return new ee(Math.floor(e * Re));
  }
  static milliseconds(e) {
    return new ee(e);
  }
  static seconds(e) {
    return new ee(e * Pt);
  }
  static minutes(e) {
    return new ee(e * jt);
  }
  static hours(e) {
    return new ee(e * Rt);
  }
  static days(e) {
    return new ee(e * It);
  }
  static weeks(e) {
    return new ee(e * Ar);
  }
  get microseconds() {
    return Math.floor(this._milliseconds / Re);
  }
  get nanoseconds() {
    return Math.floor(this._milliseconds / Er);
  }
  get milliseconds() {
    return Math.floor(this._milliseconds);
  }
  get seconds() {
    return Math.floor(this._milliseconds / Pt);
  }
  get minutes() {
    return Math.floor(this._milliseconds / jt);
  }
  get hours() {
    return Math.floor(this._milliseconds / Rt);
  }
  get days() {
    return Math.floor(this._milliseconds / It);
  }
  get weeks() {
    return Math.floor(this._milliseconds / Ar);
  }
}, Oe = class {
};
function nn(t) {
  return t instanceof kr ? Number.parseFloat(t.decimal) : t;
}
var sn = class gt extends Oe {
  point;
  constructor(e) {
    super(), e instanceof gt ? this.point = e.clone().point : this.point = [nn(e[0]), nn(e[1])];
  }
  toJSON() {
    return { type: "Point", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.point;
  }
  is(e) {
    return e instanceof gt ? this.point[0] === e.point[0] && this.point[1] === e.point[1] : !1;
  }
  clone() {
    return new gt([...this.point]);
  }
}, an = class yt extends Oe {
  line;
  constructor(e) {
    super(), this.line = e instanceof yt ? e.clone().line : e;
  }
  toJSON() {
    return { type: "LineString", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.line.map((e) => e.coordinates);
  }
  close() {
    this.line[0].is(this.line.at(-1)) || this.line.push(this.line[0]);
  }
  is(e) {
    if (!(e instanceof yt) || this.line.length !== e.line.length)
      return !1;
    for (let r = 0; r < this.line.length; r++)
      if (!this.line[r].is(e.line[r]))
        return !1;
    return !0;
  }
  clone() {
    return new yt(this.line.map((e) => e.clone()));
  }
}, on = class bt extends Oe {
  polygon;
  constructor(e) {
    super(), this.polygon = e instanceof bt ? e.clone().polygon : e.map((r) => {
      let n = r.clone();
      return n.close(), n;
    });
  }
  toJSON() {
    return { type: "Polygon", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.polygon.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof bt) || this.polygon.length !== e.polygon.length)
      return !1;
    for (let r = 0; r < this.polygon.length; r++)
      if (!this.polygon[r].is(e.polygon[r]))
        return !1;
    return !0;
  }
  clone() {
    return new bt(this.polygon.map((e) => e.clone()));
  }
}, cn = class wt extends Oe {
  points;
  constructor(e) {
    super(), this.points = e instanceof wt ? e.points : e;
  }
  toJSON() {
    return { type: "MultiPoint", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.points.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof wt) || this.points.length !== e.points.length)
      return !1;
    for (let r = 0; r < this.points.length; r++)
      if (!this.points[r].is(e.points[r]))
        return !1;
    return !0;
  }
  clone() {
    return new wt(this.points.map((e) => e.clone()));
  }
}, ln = class vt extends Oe {
  lines;
  constructor(e) {
    super(), this.lines = e instanceof vt ? e.lines : e;
  }
  toJSON() {
    return { type: "MultiLineString", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.lines.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof vt) || this.lines.length !== e.lines.length)
      return !1;
    for (let r = 0; r < this.lines.length; r++)
      if (!this.lines[r].is(e.lines[r]))
        return !1;
    return !0;
  }
  clone() {
    return new vt(this.lines.map((e) => e.clone()));
  }
}, un = class _t extends Oe {
  polygons;
  constructor(e) {
    super(), this.polygons = e instanceof _t ? e.polygons : e;
  }
  toJSON() {
    return { type: "MultiPolygon", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.polygons.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof _t) || this.polygons.length !== e.polygons.length)
      return !1;
    for (let r = 0; r < this.polygons.length; r++)
      if (!this.polygons[r].is(e.polygons[r]))
        return !1;
    return !0;
  }
  clone() {
    return new _t(this.polygons.map((e) => e.clone()));
  }
}, dn = class xt extends Oe {
  collection;
  constructor(e) {
    super(), this.collection = e instanceof xt ? e.collection : e;
  }
  toJSON() {
    return { type: "GeometryCollection", geometries: this.geometries };
  }
  get geometries() {
    return this.collection.map((e) => e.toJSON());
  }
  is(e) {
    if (!(e instanceof xt) || this.collection.length !== e.collection.length)
      return !1;
    for (let r = 0; r < this.collection.length; r++)
      if (!this.collection[r].is(e.collection[r]))
        return !1;
    return !0;
  }
  clone() {
    return new xt(this.collection.map((e) => e.clone()));
  }
}, na = 9223372036854775807n, fn = class {
  tb;
  id;
  constructor(t, e) {
    if (typeof t != "string")
      throw new R("TB part is not valid");
    if (!oa(e))
      throw new R("ID part is not valid");
    this.tb = t, this.id = e;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    let t = hn(this.tb), e = typeof this.id == "string" ? hn(this.id) : typeof this.id == "bigint" || typeof this.id == "number" ? ia(this.id) : JSON.stringify(this.id);
    return `${t}:${e}`;
  }
}, sa = class {
  rid;
  constructor(t) {
    if (typeof t != "string")
      throw new R("String Record ID must be a string");
    this.rid = t;
  }
  toJSON() {
    return this.rid;
  }
  toString() {
    return this.rid;
  }
};
function ia(t) {
  return t <= na ? t.toString() : `\u27E8${t}\u27E9`;
}
function hn(t) {
  if (aa(t))
    return `\u27E8${t}\u27E9`;
  let e, r, n;
  for (r = 0, n = t.length; r < n; r++)
    if (e = t.charCodeAt(r), !(e > 47 && e < 58) && !(e > 64 && e < 91) && !(e > 96 && e < 123) && e !== 95)
      return `\u27E8${t.replaceAll("\u27E9", "\u27E9")}\u27E9`;
  return t;
}
function aa(t) {
  let e = Number.parseInt(t);
  return !Number.isNaN(e) && e.toString() === t;
}
function oa(t) {
  switch (typeof t) {
    case "string":
    case "number":
    case "bigint":
      return !0;
    case "object":
      return Array.isArray(t) || t !== null;
    default:
      return !1;
  }
}
var pn = class {
  tb;
  constructor(t) {
    if (typeof t != "string")
      throw new R("Table must be a string");
    this.tb = t;
  }
  toJSON() {
    return this.tb;
  }
  toString() {
    return this.tb;
  }
}, pt = "0123456789abcdef", je = class Fe {
  constructor(e) {
    this.bytes = e;
  }
  static ofInner(e) {
    if (e.length !== 16)
      throw new TypeError("not 128-bit length");
    return new Fe(e);
  }
  static fromFieldsV7(e, r, n, s) {
    if (!Number.isInteger(e) || !Number.isInteger(r) || !Number.isInteger(n) || !Number.isInteger(s) || e < 0 || r < 0 || n < 0 || s < 0 || e > 281474976710655 || r > 4095 || n > 1073741823 || s > 4294967295)
      throw new RangeError("invalid field value");
    let i = new Uint8Array(16);
    return i[0] = e / 2 ** 40, i[1] = e / 2 ** 32, i[2] = e / 2 ** 24, i[3] = e / 2 ** 16, i[4] = e / 2 ** 8, i[5] = e, i[6] = 112 | r >>> 8, i[7] = r, i[8] = 128 | n >>> 24, i[9] = n >>> 16, i[10] = n >>> 8, i[11] = n, i[12] = s >>> 24, i[13] = s >>> 16, i[14] = s >>> 8, i[15] = s, new Fe(i);
  }
  static parse(e) {
    var r, n, s, i;
    let a;
    switch (e.length) {
      case 32:
        a = (r = /^[0-9a-f]{32}$/i.exec(e)) === null || r === void 0 ? void 0 : r[0];
        break;
      case 36:
        a = (n = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(e)) === null || n === void 0 ? void 0 : n.slice(1, 6).join("");
        break;
      case 38:
        a = (s = /^\{([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})\}$/i.exec(e)) === null || s === void 0 ? void 0 : s.slice(1, 6).join("");
        break;
      case 45:
        a = (i = /^urn:uuid:([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(e)) === null || i === void 0 ? void 0 : i.slice(1, 6).join("");
        break;
    }
    if (a) {
      let o = new Uint8Array(16);
      for (let c = 0; c < 16; c += 4) {
        let l = parseInt(a.substring(2 * c, 2 * c + 8), 16);
        o[c + 0] = l >>> 24, o[c + 1] = l >>> 16, o[c + 2] = l >>> 8, o[c + 3] = l;
      }
      return new Fe(o);
    } else
      throw new SyntaxError("could not parse UUID string");
  }
  toString() {
    let e = "";
    for (let r = 0; r < this.bytes.length; r++)
      e += pt.charAt(this.bytes[r] >>> 4), e += pt.charAt(this.bytes[r] & 15), (r === 3 || r === 5 || r === 7 || r === 9) && (e += "-");
    return e;
  }
  toHex() {
    let e = "";
    for (let r = 0; r < this.bytes.length; r++)
      e += pt.charAt(this.bytes[r] >>> 4), e += pt.charAt(this.bytes[r] & 15);
    return e;
  }
  toJSON() {
    return this.toString();
  }
  getVariant() {
    let e = this.bytes[8] >>> 4;
    if (e < 0)
      throw new Error("unreachable");
    if (e <= 7)
      return this.bytes.every((r) => r === 0) ? "NIL" : "VAR_0";
    if (e <= 11)
      return "VAR_10";
    if (e <= 13)
      return "VAR_110";
    if (e <= 15)
      return this.bytes.every((r) => r === 255) ? "MAX" : "VAR_RESERVED";
    throw new Error("unreachable");
  }
  getVersion() {
    return this.getVariant() === "VAR_10" ? this.bytes[6] >>> 4 : void 0;
  }
  clone() {
    return new Fe(this.bytes.slice(0));
  }
  equals(e) {
    return this.compareTo(e) === 0;
  }
  compareTo(e) {
    for (let r = 0; r < 16; r++) {
      let n = this.bytes[r] - e.bytes[r];
      if (n !== 0)
        return Math.sign(n);
    }
    return 0;
  }
}, ds = class {
  constructor(t) {
    this.timestamp = 0, this.counter = 0, this.random = t ?? ca();
  }
  generate() {
    return this.generateOrResetCore(Date.now(), 1e4);
  }
  generateOrAbort() {
    return this.generateOrAbortCore(Date.now(), 1e4);
  }
  generateOrResetCore(t, e) {
    let r = this.generateOrAbortCore(t, e);
    return r === void 0 && (this.timestamp = 0, r = this.generateOrAbortCore(t, e)), r;
  }
  generateOrAbortCore(t, e) {
    if (!Number.isInteger(t) || t < 1 || t > 281474976710655)
      throw new RangeError("`unixTsMs` must be a 48-bit positive integer");
    if (e < 0 || e > 281474976710655)
      throw new RangeError("`rollbackAllowance` out of reasonable range");
    if (t > this.timestamp)
      this.timestamp = t, this.resetCounter();
    else if (t + e >= this.timestamp)
      this.counter++, this.counter > 4398046511103 && (this.timestamp++, this.resetCounter());
    else
      return;
    return je.fromFieldsV7(this.timestamp, Math.trunc(this.counter / 2 ** 30), this.counter & 2 ** 30 - 1, this.random.nextUint32());
  }
  resetCounter() {
    this.counter = this.random.nextUint32() * 1024 + (this.random.nextUint32() & 1023);
  }
  generateV4() {
    let t = new Uint8Array(Uint32Array.of(this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32()).buffer);
    return t[6] = 64 | t[6] >>> 4, t[8] = 128 | t[8] >>> 2, je.ofInner(t);
  }
}, ca = () => {
  if (typeof crypto < "u" && typeof crypto.getRandomValues < "u")
    return new la();
  if (typeof UUIDV7_DENY_WEAK_RNG < "u" && UUIDV7_DENY_WEAK_RNG)
    throw new Error("no cryptographically strong RNG available");
  return { nextUint32: () => Math.trunc(Math.random() * 65536) * 65536 + Math.trunc(Math.random() * 65536) };
}, la = class {
  constructor() {
    this.buffer = new Uint32Array(8), this.cursor = 65535;
  }
  nextUint32() {
    return this.cursor >= this.buffer.length && (crypto.getRandomValues(this.buffer), this.cursor = 0), this.buffer[this.cursor++];
  }
}, Mt, ua = () => (Mt || (Mt = new ds())).generate(), da = () => (Mt || (Mt = new ds())).generateV4(), Cr = class St {
  inner;
  constructor(e) {
    e instanceof ArrayBuffer ? this.inner = je.ofInner(new Uint8Array(e)) : e instanceof Uint8Array ? this.inner = je.ofInner(e) : e instanceof St ? this.inner = e.inner : e instanceof je ? this.inner = e : this.inner = je.parse(e);
  }
  toString() {
    return this.inner.toString();
  }
  toJSON() {
    return this.inner.toString();
  }
  toUint8Array() {
    return this.inner.bytes;
  }
  toBuffer() {
    return this.inner.bytes.buffer;
  }
  static v4() {
    return new St(da());
  }
  static v7() {
    return new St(ua());
  }
}, fa = 0, mn = 37, gn = 6, yn = 7, dr = 8, ha = 9, bn = 10, wn = 12, pa = 13, vn = 14, _n = 88, xn = 89, Sn = 90, kn = 91, En = 92, An = 93, Cn = 94, dt = { encode(t) {
  return t instanceof Date ? new Z(wn, Qi(t)) : t === void 0 ? new Z(gn, null) : t instanceof Cr ? new Z(mn, t.toBuffer()) : t instanceof kr ? new Z(bn, t.toString()) : t instanceof ur ? new Z(vn, t.toCompact()) : t instanceof fn ? new Z(dr, [t.tb, t.id]) : t instanceof sa ? new Z(dr, t.rid) : t instanceof pn ? new Z(yn, t.tb) : t instanceof sn ? new Z(_n, t.point) : t instanceof an ? new Z(xn, t.line) : t instanceof on ? new Z(Sn, t.polygon) : t instanceof cn ? new Z(kn, t.points) : t instanceof ln ? new Z(En, t.lines) : t instanceof un ? new Z(An, t.polygons) : t instanceof dn ? new Z(Cn, t.collection) : t;
}, decode(t) {
  if (!(t instanceof Z))
    return t;
  switch (t.tag) {
    case fa:
      return new Date(t.value);
    case mn:
    case ha:
      return new Cr(t.value);
    case wn:
      return ea(t.value);
    case gn:
      return;
    case bn:
      return new kr(t.value);
    case pa:
      return new ur(t.value);
    case vn:
      return ur.fromCompact(t.value);
    case yn:
      return new pn(t.value);
    case dr:
      return new fn(t.value[0], t.value[1]);
    case _n:
      return new sn(t.value);
    case xn:
      return new an(t.value);
    case Sn:
      return new on(t.value);
    case kn:
      return new cn(t.value);
    case En:
      return new ln(t.value);
    case An:
      return new un(t.value);
    case Cn:
      return new dn(t.value);
  }
} };
Object.freeze(dt);
function ma(t) {
  return Le(t, { replacer: dt.encode });
}
function ga(t) {
  return us(t, { replacer: dt.decode });
}
var ya = class {
  query;
  bindings;
  constructor(t, e, r) {
    this.query = new Rr(Le(t)), this.bindings = Mr(e ?? {}, { replacer: dt.encode });
  }
  build(t) {
    return Le([this.query, this.bindings]);
  }
};
function Tn(t) {
  let e = {}, r = (n, s, i) => {
    if (n in t)
      e[s] = `${t[n]}`, delete e[n];
    else if (i !== !0)
      throw new R(`Key ${n} is missing from the authentication parameters`);
  };
  return "scope" in t ? (e = { ...t }, r("scope", "sc"), r("namespace", "ns"), r("database", "db")) : "variables" in t ? (e = { ...t.variables }, r("access", "ac"), r("namespace", "ns"), r("database", "db")) : (r("access", "ac", !0), r("database", "db", !0), r("namespace", "ns", !("database" in t)), r("username", "user"), r("password", "pass")), e;
}
var ba = ["CREATE", "UPDATE", "DELETE"];
function wa(t) {
  return !(typeof t != "object" || t === null || !("id" in t && "action" in t && "result" in t) || !(t.id instanceof Cr) || !ba.includes(t.action) || typeof t.result != "object" || t.result === null);
}
var va = 5e3, fs = "1.4.2", hs = "3.0.0";
function _a(t, e = fs, r = hs) {
  if (!xa(t, e, r))
    throw new Xi(t, `>= ${e} < ${r}`);
  return !0;
}
function xa(t, e = fs, r = hs) {
  return e.localeCompare(t, void 0, { numeric: !0 }) <= 0 && r.localeCompare(t, void 0, { numeric: !0 }) === 1;
}
async function ps(t, e) {
  let r = { "ws:": "http:", "wss:": "https:", "http:": "http:", "https:": "https:" }[t.protocol];
  if (r) {
    let n = t.pathname.slice(0, -4);
    t = new URL(t), t.pathname = `${n}/version`, t.protocol = r;
    let s = new AbortController(), i = setTimeout(() => s.abort(), e ?? va), a = "surrealdb-";
    return await fetch(t, { signal: s.signal }).then((o) => o.text()).then((o) => o.slice(a.length)).catch((o) => {
      throw new en(o);
    }).finally(() => {
      clearTimeout(i);
    });
  }
  throw new en();
}
var fr = 0;
function ms() {
  return fr = (fr + 1) % Number.MAX_SAFE_INTEGER, fr.toString();
}
var Sa = ((t) => (t.Disconnected = "disconnected", t.Connecting = "connecting", t.Connected = "connected", t.Error = "error", t))(Sa || {}), ka = class {
  emitter;
  encodeCbor;
  decodeCbor;
  constructor({ emitter: t, encodeCbor: e, decodeCbor: r }) {
    this.emitter = t, this.encodeCbor = e, this.decodeCbor = r;
  }
}, gs = class {
  context;
  ready;
  status = "disconnected";
  connection = { url: void 0, namespace: void 0, database: void 0, token: void 0 };
  constructor(t) {
    this.context = t;
  }
  get emitter() {
    return this.context.emitter;
  }
  get encodeCbor() {
    return this.context.encodeCbor;
  }
  get decodeCbor() {
    return this.context.decodeCbor;
  }
};
function Nn(t, e) {
  if ("scope" in t || "access" in t && "variables" in t && t.variables) {
    if (!t.namespace) {
      if (!e?.namespace)
        throw new Yi();
      t.namespace = e.namespace;
    }
    if (!t.database) {
      if (!e?.database)
        throw new Hi();
      t.database = e.database;
    }
  }
  return t;
}
var On = class extends gs {
  connection = { url: void 0, namespace: void 0, database: void 0, token: void 0, variables: {} };
  setStatus(t, ...e) {
    this.status = t, this.emitter.emit(t, e);
  }
  version(t, e) {
    return ps(t, e);
  }
  connect(t) {
    return this.setStatus("connecting"), this.connection.url = t, this.setStatus("connected"), this.ready = new Promise((e) => e()), this.ready;
  }
  disconnect() {
    return this.connection = { url: void 0, namespace: void 0, database: void 0, token: void 0, variables: {} }, this.ready = void 0, this.setStatus("disconnected"), new Promise((t) => t());
  }
  async rpc(t) {
    if (await this.ready, !this.connection.url)
      throw new as();
    if (t.method === "use") {
      let [i, a] = t.params;
      return i === null && (this.connection.namespace = void 0), a === null && (this.connection.database = void 0), i && (this.connection.namespace = i), a && (this.connection.database = a), { result: !0 };
    }
    if (t.method === "let") {
      let [i, a] = t.params;
      return this.connection.variables[i] = a, { result: !0 };
    }
    if (t.method === "unset") {
      let [i] = t.params;
      return delete this.connection.variables[i], { result: !0 };
    }
    if (t.method === "query" && (t.params = [t.params?.[0], { ...this.connection.variables, ...t.params?.[1] ?? {} }]), !this.connection.namespace || !this.connection.database)
      throw new qi();
    let e = ms(), r = await fetch(`${this.connection.url}`, { method: "POST", headers: { "Content-Type": "application/cbor", Accept: "application/cbor", "Surreal-NS": this.connection.namespace, "Surreal-DB": this.connection.database, ...this.connection.token ? { Authorization: `Bearer ${this.connection.token}` } : {} }, body: this.encodeCbor({ id: e, ...t }) }), n = await r.arrayBuffer();
    if (r.status === 200) {
      let i = this.decodeCbor(n);
      if ("result" in i)
        switch (t.method) {
          case "signin":
          case "signup": {
            this.connection.token = i.result;
            break;
          }
          case "authenticate": {
            let [a] = t.params;
            this.connection.token = a;
            break;
          }
          case "invalidate": {
            this.connection.token = void 0;
            break;
          }
        }
      return this.emitter.emit(`rpc-${e}`, [i]), i;
    }
    let s = new TextDecoder("utf-8");
    throw new Ji(s.decode(n), r.status, r.statusText, n);
  }
  get connected() {
    return !!this.connection.url;
  }
};
function Ea() {
  if (typeof WebSocket < "u")
    return WebSocket;
  if (typeof global.WebSocket < "u")
    return global.WebSocket;
  if (typeof window.WebSocket < "u")
    return window.WebSocket;
  if (typeof self.WebSocket < "u")
    return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}
var Aa = Ea(), $n = class extends gs {
  pinger;
  socket;
  constructor(t) {
    super(t), this.emitter.subscribe("disconnected", () => this.pinger?.stop());
  }
  setStatus(t, ...e) {
    this.status = t, this.emitter.emit(t, e);
  }
  async requireStatus(t) {
    return this.status !== t && await this.emitter.subscribeOnce(t), !0;
  }
  version(t, e) {
    return ps(t, e);
  }
  async connect(t) {
    this.connection.url = t, this.setStatus("connecting");
    let e = new Aa(t.toString(), "cbor"), r = new Promise((n, s) => {
      e.addEventListener("open", () => {
        this.setStatus("connected"), n();
      }), e.addEventListener("error", (i) => {
        let a = new Fi("error" in i ? i.error : "An unexpected error occurred");
        this.setStatus("error", a), s(a);
      }), e.addEventListener("close", () => {
        this.setStatus("disconnected");
      }), e.addEventListener("message", async ({ data: i }) => {
        try {
          let a = this.decodeCbor(i instanceof Blob ? await i.arrayBuffer() : i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength));
          if (typeof a == "object" && a != null && Object.getPrototypeOf(a) === Object.prototype)
            this.handleRpcResponse(a);
          else
            throw new Xr(a);
        } catch (a) {
          e.dispatchEvent(new CustomEvent("error", { detail: a }));
        }
      });
    });
    return this.ready = r, await r.then(() => {
      this.socket = e, this.pinger?.stop(), this.pinger = new Ca(3e4), this.pinger.start(() => this.rpc({ method: "ping" }));
    });
  }
  async disconnect() {
    this.connection = { url: void 0, namespace: void 0, database: void 0, token: void 0 }, await this.ready?.catch(() => {
    }), this.socket?.close(), this.ready = void 0, this.socket = void 0, await Promise.any([this.requireStatus("disconnected"), this.requireStatus("error")]);
  }
  async rpc(t) {
    if (await this.ready, !this.socket)
      throw new as();
    let e = ms(), r = this.emitter.subscribeOnce(`rpc-${e}`);
    this.socket.send(this.encodeCbor({ id: e, ...t }));
    let [n] = await r;
    if (n instanceof is)
      throw n;
    if ("result" in n)
      switch (t.method) {
        case "use": {
          let [s, i] = t.params;
          s === null && (this.connection.namespace = void 0), i === null && (this.connection.database = void 0), s && (this.connection.namespace = s), i && (this.connection.database = i);
          break;
        }
        case "signin":
        case "signup": {
          this.connection.token = n.result;
          break;
        }
        case "authenticate": {
          let [s] = t.params;
          this.connection.token = s;
          break;
        }
        case "invalidate": {
          this.connection.token = void 0;
          break;
        }
      }
    return n;
  }
  handleRpcResponse({ id: t, ...e }) {
    if (t)
      this.emitter.emit(`rpc-${t}`, [e]);
    else if (e.error)
      this.setStatus("error", new N(e.error));
    else if (wa(e.result)) {
      let { id: r, action: n, result: s } = e.result;
      this.emitter.emit(`live-${r}`, [n, s], !0);
    } else
      this.setStatus("error", new Xr({ id: t, ...e }));
  }
  get connected() {
    return !!this.socket;
  }
}, Ca = class {
  pinger;
  interval;
  constructor(t = 3e4) {
    this.interval = t;
  }
  start(t) {
    this.pinger = setInterval(t, this.interval);
  }
  stop() {
    clearInterval(this.pinger);
  }
}, Ta = class {
  connection;
  ready;
  emitter;
  engines = { ws: $n, wss: $n, http: On, https: On };
  constructor({ engines: t } = {}) {
    this.emitter = new Bi(), this.emitter.subscribe("disconnected", () => this.clean()), this.emitter.subscribe("error", () => this.close()), t && (this.engines = { ...this.engines, ...t });
  }
  async connect(t, e = {}) {
    t = new URL(t), t.pathname.endsWith("/rpc") || (t.pathname.endsWith("/") || (t.pathname += "/"), t.pathname += "rpc");
    let r = t.protocol.slice(0, -1), n = this.engines[r];
    if (!n)
      throw new Ki(r);
    let { prepare: s, auth: i, namespace: a, database: o } = e;
    await this.close();
    let c = new ka({ emitter: this.emitter, encodeCbor: ma, decodeCbor: ga }), l = new n(c);
    if (e.versionCheck !== !1) {
      let u = await l.version(t, e.versionCheckTimeout);
      _a(u);
    }
    return this.connection = l, this.ready = new Promise((u, h) => l.connect(t).then(async () => {
      (a || o) && await this.use({ namespace: a, database: o }), typeof i == "string" ? await this.authenticate(i) : i && await this.signin(i), await s?.(this), u();
    }).catch(h)), await this.ready, !0;
  }
  async close() {
    return this.clean(), await this.connection?.disconnect(), !0;
  }
  clean() {
    let t = this.emitter.scanListeners((r) => r.startsWith("rpc-"));
    t.map((r) => this.emitter.emit(r, [new is()]));
    let e = this.emitter.scanListeners((r) => r.startsWith("live-"));
    e.map((r) => this.emitter.emit(r, ["CLOSE", "disconnected"])), this.emitter.reset({ collectable: !0, listeners: [...t, ...e] });
  }
  get status() {
    return this.connection?.status ?? "disconnected";
  }
  async ping() {
    let { error: t } = await this.rpc("ping");
    if (t)
      throw new N(t.message);
    return !0;
  }
  async use({ namespace: t, database: e }) {
    if (!this.connection)
      throw new ke();
    if (t === null && e !== null)
      throw new R("Cannot unset namespace without unsetting database");
    let { error: r } = await this.rpc("use", [t, e]);
    if (r)
      throw new N(r.message);
    return !0;
  }
  async info() {
    await this.ready;
    let t = await this.rpc("info");
    if (t.error)
      throw new N(t.error.message);
    return t.result ?? void 0;
  }
  async signup(t) {
    if (!this.connection)
      throw new ke();
    let e = Nn(t, this.connection.connection), r = Tn(e), n = await this.rpc("signup", [r]);
    if (n.error)
      throw new N(n.error.message);
    if (!n.result)
      throw new Qr();
    return n.result;
  }
  async signin(t) {
    if (!this.connection)
      throw new ke();
    let e = Nn(t, this.connection.connection), r = Tn(e), n = await this.rpc("signin", [r]);
    if (n.error)
      throw new N(n.error.message);
    if (!n.result)
      throw new Qr();
    return n.result;
  }
  async authenticate(t) {
    let e = await this.rpc("authenticate", [t]);
    if (e.error)
      throw new N(e.error.message);
    return !0;
  }
  async invalidate() {
    let t = await this.rpc("invalidate");
    if (t.error)
      throw new N(t.error.message);
    return !0;
  }
  async let(t, e) {
    let r = await this.rpc("let", [t, e]);
    if (r.error)
      throw new N(r.error.message);
    return !0;
  }
  async unset(t) {
    let e = await this.rpc("unset", [t]);
    if (e.error)
      throw new N(e.error.message);
    return !0;
  }
  async live(t, e, r) {
    await this.ready;
    let n = await this.rpc("live", [t, r]);
    if (n.error)
      throw new N(n.error.message);
    return e && this.subscribeLive(n.result, e), n.result;
  }
  async subscribeLive(t, e) {
    if (await this.ready, !this.connection)
      throw new ke();
    this.connection.emitter.subscribe(`live-${t}`, e, !0);
  }
  async unSubscribeLive(t, e) {
    if (await this.ready, !this.connection)
      throw new ke();
    this.connection.emitter.unSubscribe(`live-${t}`, e);
  }
  async kill(t) {
    if (await this.ready, !this.connection)
      throw new ke();
    if (Array.isArray(t)) {
      await Promise.all(t.map((r) => this.rpc("kill", [r])));
      let e = t.map((r) => `live-${r}`);
      e.map((r) => this.emitter.emit(r, ["CLOSE", "killed"])), this.connection.emitter.reset({ collectable: e, listeners: e });
    } else
      await this.rpc("kill", [t]), this.emitter.emit(`live-${t}`, ["CLOSE", "killed"]), this.connection.emitter.reset({ collectable: `live-${t}`, listeners: `live-${t}` });
  }
  async query(...t) {
    return (await this.query_raw(...t)).map(({ status: e, result: r }) => {
      if (e === "ERR")
        throw new N(r);
      return r;
    });
  }
  async query_raw(...[t, e]) {
    let r = t instanceof ya ? [t.query, Mr(t.bindings, { fills: e, replacer: dt.encode })] : [t, e];
    await this.ready;
    let n = await this.rpc("query", r);
    if (n.error)
      throw new N(n.error.message);
    return n.result;
  }
  async select(t) {
    await this.ready;
    let e = await this.rpc("select", [t]);
    if (e.error)
      throw new N(e.error.message);
    return e.result;
  }
  async create(t, e) {
    await this.ready;
    let r = await this.rpc("create", [t, e]);
    if (r.error)
      throw new N(r.error.message);
    return r.result;
  }
  async insert(t, e) {
    await this.ready;
    let r = await this.rpc("insert", [t, e]);
    if (r.error)
      throw new N(r.error.message);
    return r.result;
  }
  async update(t, e) {
    await this.ready;
    let r = await this.rpc("update", [t, e]);
    if (r.error)
      throw new N(r.error.message);
    return r.result;
  }
  async upsert(t, e) {
    await this.ready;
    let r = await this.rpc("upsert", [t, e]);
    if (r.error)
      throw new N(r.error.message);
    return r.result;
  }
  async merge(t, e) {
    await this.ready;
    let r = await this.rpc("merge", [t, e]);
    if (r.error)
      throw new N(r.error.message);
    return r.result;
  }
  async patch(t, e, r) {
    await this.ready;
    let n = await this.rpc("patch", [t, e, r]);
    if (n.error)
      throw new N(n.error.message);
    return n.result;
  }
  async delete(t) {
    await this.ready;
    let e = await this.rpc("delete", [t]);
    if (e.error)
      throw new N(e.error.message);
    return e.result;
  }
  async version() {
    await this.ready;
    let t = await this.rpc("version");
    if (t.error)
      throw new N(t.error.message);
    return t.result;
  }
  async run(t, e, r) {
    await this.ready;
    let [n, s] = Array.isArray(e) ? [void 0, e] : [e, r], i = await this.rpc("run", [t, n, s]);
    if (i.error)
      throw new N(i.error.message);
    return i.result;
  }
  async relate(t, e, r, n) {
    await this.ready;
    let s = await this.rpc("relate", [t, e, r, n]);
    if (s.error)
      throw new N(s.error.message);
    return s.result;
  }
  rpc(t, e) {
    if (!this.connection)
      throw new ke();
    return this.connection.rpc({ method: t, params: e });
  }
};
/*! Bundled license information:

uuidv7/dist/index.js:
  (**
   * uuidv7: A JavaScript implementation of UUID version 7
   *
   * @license Apache-2.0
   * @copyright 2021-2024 LiosK
   * @packageDocumentation
   *)
*/
const rr = (t) => {
};
D(void 0, {
  equals: !1
});
const Pn = (t) => t.pop().pop(), Na = async (t, e = 10) => {
  for (; !t(); )
    await new Promise((r) => setTimeout(r, e));
};
class Oa {
  #e;
  #t;
  #r;
  #n;
  #s;
  constructor(e, r, n) {
    this.#e = new Ta(), this.#t = new URL(`${e}/rpc`).toString(), this.#r = r, this.#n = n, this.#s = !1;
  }
  async connect() {
    try {
      console.info("Connecting Surrealdb..."), await this.#e.connect(this.#t, {
        namespace: this.#r,
        database: this.#n
      });
    } catch (e) {
      throw console.error(e), e;
    }
    return this.#s = !0, console.info(`DbService connected: ${this.#n}@${this.#r}:${this.#t}`), this;
  }
  async disconnect() {
    this.#e.status === "connected" && await this.#e.close(), this.#s = !1;
  }
  async getDb() {
    return await Na(() => this.#e.status === "connected"), this.#e;
  }
  get isConnected() {
    return this.#s;
  }
  async getAccountDetails() {
    try {
      const e = await this.#e.query("SELECT email FROM account;");
      return Pn(e);
    } catch (e) {
      throw e;
    }
  }
  async setAccountDetails(e) {
    try {
      await this.#e.merge("account", e);
    } catch (r) {
      throw r;
    }
  }
  async getProfileDetails() {
    try {
      const e = await this.#e.query("SELECT firstName, lastName, address, phone  FROM profile;");
      return Pn(e);
    } catch (e) {
      throw e;
    }
  }
  async setProfileDetails(e) {
    try {
      await this.#e.merge("profile", e);
    } catch (r) {
      throw r;
    }
  }
}
var A;
(function(t) {
  t.assertEqual = (s) => s;
  function e(s) {
  }
  t.assertIs = e;
  function r(s) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (s) => {
    const i = {};
    for (const a of s)
      i[a] = a;
    return i;
  }, t.getValidEnumValues = (s) => {
    const i = t.objectKeys(s).filter((o) => typeof s[s[o]] != "number"), a = {};
    for (const o of i)
      a[o] = s[o];
    return t.objectValues(a);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(i) {
    return s[i];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const i = [];
    for (const a in s)
      Object.prototype.hasOwnProperty.call(s, a) && i.push(a);
    return i;
  }, t.find = (s, i) => {
    for (const a of s)
      if (i(a))
        return a;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function n(s, i = " | ") {
    return s.map((a) => typeof a == "string" ? `'${a}'` : a).join(i);
  }
  t.joinValues = n, t.jsonStringifyReplacer = (s, i) => typeof i == "bigint" ? i.toString() : i;
})(A || (A = {}));
const f = A.arrayToEnum([
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
]), be = (t) => {
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
}, d = A.arrayToEnum([
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
]), $a = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class fe extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const r = e || function(i) {
      return i.message;
    }, n = { _errors: [] }, s = (i) => {
      for (const a of i.issues)
        if (a.code === "invalid_union")
          a.unionErrors.map(s);
        else if (a.code === "invalid_return_type")
          s(a.returnTypeError);
        else if (a.code === "invalid_arguments")
          s(a.argumentsError);
        else if (a.path.length === 0)
          n._errors.push(r(a));
        else {
          let o = n, c = 0;
          for (; c < a.path.length; ) {
            const l = a.path[c];
            c === a.path.length - 1 ? (o[l] = o[l] || { _errors: [] }, o[l]._errors.push(r(a))) : o[l] = o[l] || { _errors: [] }, o = o[l], c++;
          }
        }
    };
    return s(this), n;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, n = [];
    for (const s of this.issues)
      s.path.length > 0 ? (r[s.path[0]] = r[s.path[0]] || [], r[s.path[0]].push(e(s))) : n.push(e(s));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
fe.create = (t) => new fe(t);
const He = (t, e) => {
  let r;
  switch (t.code) {
    case d.invalid_type:
      t.received === f.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case d.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, A.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${A.joinValues(t.keys, ", ")}`;
      break;
    case d.invalid_union:
      r = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${A.joinValues(t.options)}`;
      break;
    case d.invalid_enum_value:
      r = `Invalid enum value. Expected ${A.joinValues(t.options)}, received '${t.received}'`;
      break;
    case d.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      r = "Invalid function return type";
      break;
    case d.invalid_date:
      r = "Invalid date";
      break;
    case d.invalid_string:
      typeof t.validation == "object" ? "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : A.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case d.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(t.minimum)}` : r = "Invalid input";
      break;
    case d.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(t.maximum)}` : r = "Invalid input";
      break;
    case d.custom:
      r = "Invalid input";
      break;
    case d.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case d.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, A.assertNever(t);
  }
  return { message: r };
};
let ys = He;
function Pa(t) {
  ys = t;
}
function Dt() {
  return ys;
}
const Lt = (t) => {
  const { data: e, path: r, errorMaps: n, issueData: s } = t, i = [...r, ...s.path || []], a = {
    ...s,
    path: i
  };
  let o = "";
  const c = n.filter((l) => !!l).slice().reverse();
  for (const l of c)
    o = l(a, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: i,
    message: s.message || o
  };
}, ja = [];
function p(t, e) {
  const r = Lt({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      Dt(),
      He
    ].filter((n) => !!n)
  });
  t.common.issues.push(r);
}
class J {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const n = [];
    for (const s of r) {
      if (s.status === "aborted")
        return w;
      s.status === "dirty" && e.dirty(), n.push(s.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, r) {
    const n = [];
    for (const s of r)
      n.push({
        key: await s.key,
        value: await s.value
      });
    return J.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const s of r) {
      const { key: i, value: a } = s;
      if (i.status === "aborted" || a.status === "aborted")
        return w;
      i.status === "dirty" && e.dirty(), a.status === "dirty" && e.dirty(), (typeof a.value < "u" || s.alwaysSet) && (n[i.value] = a.value);
    }
    return { status: e.value, value: n };
  }
}
const w = Object.freeze({
  status: "aborted"
}), bs = (t) => ({ status: "dirty", value: t }), q = (t) => ({ status: "valid", value: t }), Tr = (t) => t.status === "aborted", Nr = (t) => t.status === "dirty", Ut = (t) => t.status === "valid", Zt = (t) => typeof Promise < "u" && t instanceof Promise;
var S;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
})(S || (S = {}));
class ce {
  constructor(e, r, n, s) {
    this.parent = e, this.data = r, this._path = n, this._key = s;
  }
  get path() {
    return this._path.concat(this._key);
  }
}
const jn = (t, e) => {
  if (Ut(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return { success: !1, error: new fe(t.common.issues) };
};
function v(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: n, description: s } = t;
  if (e && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (a, o) => a.code !== "invalid_type" ? { message: o.defaultError } : typeof o.data > "u" ? { message: n ?? o.defaultError } : { message: r ?? o.defaultError }, description: s };
}
class _ {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return be(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: be(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new J(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: be(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (Zt(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const n = this.safeParse(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(e, r) {
    var n;
    const s = {
      common: {
        issues: [],
        async: (n = r?.async) !== null && n !== void 0 ? n : !1,
        contextualErrorMap: r?.errorMap
      },
      path: r?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: be(e)
    }, i = this._parseSync({ data: e, path: s.path, parent: s });
    return jn(s, i);
  }
  async parseAsync(e, r) {
    const n = await this.safeParseAsync(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(e, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r?.errorMap,
        async: !0
      },
      path: r?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: be(e)
    }, s = this._parse({ data: e, path: n.path, parent: n }), i = await (Zt(s) ? s : Promise.resolve(s));
    return jn(n, i);
  }
  refine(e, r) {
    const n = (s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r;
    return this._refinement((s, i) => {
      const a = e(s), o = () => i.addIssue({
        code: d.custom,
        ...n(s)
      });
      return typeof Promise < "u" && a instanceof Promise ? a.then((c) => c ? !0 : (o(), !1)) : a ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
  }
  _refinement(e) {
    return new se({
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return he.create(this, this._def);
  }
  nullable() {
    return Te.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return re.create(this, this._def);
  }
  promise() {
    return Ze.create(this, this._def);
  }
  or(e) {
    return rt.create([this, e], this._def);
  }
  and(e) {
    return nt.create(this, e, this._def);
  }
  transform(e) {
    return new se({
      ...v(this._def),
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new ct({
      ...v(this._def),
      innerType: this,
      defaultValue: r,
      typeName: y.ZodDefault
    });
  }
  brand() {
    return new vs({
      typeName: y.ZodBranded,
      type: this,
      ...v(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Wt({
      ...v(this._def),
      innerType: this,
      catchValue: r,
      typeName: y.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ft.create(this, e);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Ra = /^c[^\s-]{8,}$/i, Ia = /^[a-z][a-z0-9]*$/, Ma = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, Da = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([^-]([a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}))$/, La = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
class me extends _ {
  constructor() {
    super(...arguments), this._regex = (e, r, n) => this.refinement((s) => e.test(s), {
      validation: r,
      code: d.invalid_string,
      ...S.errToObj(n)
    }), this.nonempty = (e) => this.min(1, S.errToObj(e)), this.trim = () => new me({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
      const i = this._getOrReturnCtx(e);
      return p(
        i,
        {
          code: d.invalid_type,
          expected: f.string,
          received: i.parsedType
        }
      ), w;
    }
    const n = new J();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), n.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), n.dirty());
      else if (i.kind === "length") {
        const a = e.data.length > i.value, o = e.data.length < i.value;
        (a || o) && (s = this._getOrReturnCtx(e, s), a ? p(s, {
          code: d.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : o && p(s, {
          code: d.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), n.dirty());
      } else if (i.kind === "email")
        Da.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "email",
          code: d.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "uuid")
        Ma.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "cuid")
        Ra.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "cuid2")
        Ia.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), p(s, {
            validation: "url",
            code: d.invalid_string,
            message: i.message
          }), n.dirty();
        }
      else
        i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "regex",
          code: d.invalid_string,
          message: i.message
        }), n.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.invalid_string,
          validation: { startsWith: i.value },
          message: i.message
        }), n.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.invalid_string,
          validation: { endsWith: i.value },
          message: i.message
        }), n.dirty()) : i.kind === "datetime" ? La(i).test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          code: d.invalid_string,
          validation: "datetime",
          message: i.message
        }), n.dirty()) : A.assertNever(i);
    return { status: n.value, value: e.data };
  }
  _addCheck(e) {
    return new me({
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
    var r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      offset: (r = e?.offset) !== null && r !== void 0 ? r : !1,
      ...S.errToObj(e?.message)
    });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...S.errToObj(r)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...S.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...S.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...S.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...S.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...S.errToObj(r)
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
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
me.create = (t) => {
  var e;
  return new me({
    checks: [],
    typeName: y.ZodString,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...v(t)
  });
};
function Ua(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, i = parseInt(t.toFixed(s).replace(".", "")), a = parseInt(e.toFixed(s).replace(".", ""));
  return i % a / Math.pow(10, s);
}
class _e extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
      const i = this._getOrReturnCtx(e);
      return p(i, {
        code: d.invalid_type,
        expected: f.number,
        received: i.parsedType
      }), w;
    }
    let n;
    const s = new J();
    for (const i of this._def.checks)
      i.kind === "int" ? A.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), s.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: d.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: d.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? Ua(e.data, i.value) !== 0 && (n = this._getOrReturnCtx(e, n), p(n, {
        code: d.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: d.not_finite,
        message: i.message
      }), s.dirty()) : A.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, S.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, S.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, S.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, S.toString(r));
  }
  setLimit(e, r, n, s) {
    return new _e({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: S.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new _e({
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
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: S.toString(r)
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
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && A.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
_e.create = (t) => new _e({
  checks: [],
  typeName: y.ZodNumber,
  coerce: t?.coerce || !1,
  ...v(t)
});
class Xe extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== f.bigint) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.bigint,
        received: n.parsedType
      }), w;
    }
    return q(e.data);
  }
}
Xe.create = (t) => {
  var e;
  return new Xe({
    typeName: y.ZodBigInt,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...v(t)
  });
};
class Qe extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = Boolean(e.data)), this._getType(e) !== f.boolean) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.boolean,
        received: n.parsedType
      }), w;
    }
    return q(e.data);
  }
}
Qe.create = (t) => new Qe({
  typeName: y.ZodBoolean,
  coerce: t?.coerce || !1,
  ...v(t)
});
class Ae extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
      const i = this._getOrReturnCtx(e);
      return p(i, {
        code: d.invalid_type,
        expected: f.date,
        received: i.parsedType
      }), w;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return p(i, {
        code: d.invalid_date
      }), w;
    }
    const n = new J();
    let s;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (s = this._getOrReturnCtx(e, s), p(s, {
        code: d.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), n.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (s = this._getOrReturnCtx(e, s), p(s, {
        code: d.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), n.dirty()) : A.assertNever(i);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: S.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: S.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
Ae.create = (t) => new Ae({
  checks: [],
  coerce: t?.coerce || !1,
  typeName: y.ZodDate,
  ...v(t)
});
class Vt extends _ {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.symbol,
        received: n.parsedType
      }), w;
    }
    return q(e.data);
  }
}
Vt.create = (t) => new Vt({
  typeName: y.ZodSymbol,
  ...v(t)
});
class et extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.undefined,
        received: n.parsedType
      }), w;
    }
    return q(e.data);
  }
}
et.create = (t) => new et({
  typeName: y.ZodUndefined,
  ...v(t)
});
class tt extends _ {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.null,
        received: n.parsedType
      }), w;
    }
    return q(e.data);
  }
}
tt.create = (t) => new tt({
  typeName: y.ZodNull,
  ...v(t)
});
class Ue extends _ {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return q(e.data);
  }
}
Ue.create = (t) => new Ue({
  typeName: y.ZodAny,
  ...v(t)
});
class Ee extends _ {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return q(e.data);
  }
}
Ee.create = (t) => new Ee({
  typeName: y.ZodUnknown,
  ...v(t)
});
class ge extends _ {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return p(r, {
      code: d.invalid_type,
      expected: f.never,
      received: r.parsedType
    }), w;
  }
}
ge.create = (t) => new ge({
  typeName: y.ZodNever,
  ...v(t)
});
class zt extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.void,
        received: n.parsedType
      }), w;
    }
    return q(e.data);
  }
}
zt.create = (t) => new zt({
  typeName: y.ZodVoid,
  ...v(t)
});
class re extends _ {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), s = this._def;
    if (r.parsedType !== f.array)
      return p(r, {
        code: d.invalid_type,
        expected: f.array,
        received: r.parsedType
      }), w;
    if (s.exactLength !== null) {
      const a = r.data.length > s.exactLength.value, o = r.data.length < s.exactLength.value;
      (a || o) && (p(r, {
        code: a ? d.too_big : d.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: a ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && r.data.length < s.minLength.value && (p(r, {
      code: d.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && (p(r, {
      code: d.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((a, o) => s.type._parseAsync(new ce(r, a, r.path, o)))).then((a) => J.mergeArray(n, a));
    const i = [...r.data].map((a, o) => s.type._parseSync(new ce(r, a, r.path, o)));
    return J.mergeArray(n, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new re({
      ...this._def,
      minLength: { value: e, message: S.toString(r) }
    });
  }
  max(e, r) {
    return new re({
      ...this._def,
      maxLength: { value: e, message: S.toString(r) }
    });
  }
  length(e, r) {
    return new re({
      ...this._def,
      exactLength: { value: e, message: S.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
re.create = (t, e) => new re({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: y.ZodArray,
  ...v(e)
});
var Bt;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
  });
})(Bt || (Bt = {}));
function Pe(t) {
  if (t instanceof P) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = he.create(Pe(n));
    }
    return new P({
      ...t._def,
      shape: () => e
    });
  } else
    return t instanceof re ? re.create(Pe(t.element)) : t instanceof he ? he.create(Pe(t.unwrap())) : t instanceof Te ? Te.create(Pe(t.unwrap())) : t instanceof le ? le.create(t.items.map((e) => Pe(e))) : t;
}
class P extends _ {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = A.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      const l = this._getOrReturnCtx(e);
      return p(l, {
        code: d.invalid_type,
        expected: f.object,
        received: l.parsedType
      }), w;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: i, keys: a } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof ge && this._def.unknownKeys === "strip"))
      for (const l in s.data)
        a.includes(l) || o.push(l);
    const c = [];
    for (const l of a) {
      const u = i[l], h = s.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: u._parse(new ce(s, h, s.path, l)),
        alwaysSet: l in s.data
      });
    }
    if (this._def.catchall instanceof ge) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const u of o)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] }
          });
      else if (l === "strict")
        o.length > 0 && (p(s, {
          code: d.unrecognized_keys,
          keys: o
        }), n.dirty());
      else if (l !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const u of o) {
        const h = s.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: l._parse(
            new ce(s, h, s.path, u)
          ),
          alwaysSet: u in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const u of c) {
        const h = await u.key;
        l.push({
          key: h,
          value: await u.value,
          alwaysSet: u.alwaysSet
        });
      }
      return l;
    }).then((l) => J.mergeObjectSync(n, l)) : J.mergeObjectSync(n, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return S.errToObj, new P({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          var s, i, a, o;
          const c = (a = (i = (s = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(s, r, n).message) !== null && a !== void 0 ? a : n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (o = S.errToObj(e).message) !== null && o !== void 0 ? o : c
          } : {
            message: c
          };
        }
      } : {}
    });
  }
  strip() {
    return new P({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new P({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(e) {
    return new P({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  merge(e) {
    return new P({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => Bt.mergeShapes(this._def.shape(), e._def.shape()),
      typeName: y.ZodObject
    });
  }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  catchall(e) {
    return new P({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return A.objectKeys(e).forEach((n) => {
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    }), new P({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return A.objectKeys(this.shape).forEach((n) => {
      e[n] || (r[n] = this.shape[n]);
    }), new P({
      ...this._def,
      shape: () => r
    });
  }
  deepPartial() {
    return Pe(this);
  }
  partial(e) {
    const r = {};
    return A.objectKeys(this.shape).forEach((n) => {
      const s = this.shape[n];
      e && !e[n] ? r[n] = s : r[n] = s.optional();
    }), new P({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    return A.objectKeys(this.shape).forEach((n) => {
      if (e && !e[n])
        r[n] = this.shape[n];
      else {
        let i = this.shape[n];
        for (; i instanceof he; )
          i = i._def.innerType;
        r[n] = i;
      }
    }), new P({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return ws(A.objectKeys(this.shape));
  }
}
P.create = (t, e) => new P({
  shape: () => t,
  unknownKeys: "strip",
  catchall: ge.create(),
  typeName: y.ZodObject,
  ...v(e)
});
P.strictCreate = (t, e) => new P({
  shape: () => t,
  unknownKeys: "strict",
  catchall: ge.create(),
  typeName: y.ZodObject,
  ...v(e)
});
P.lazycreate = (t, e) => new P({
  shape: t,
  unknownKeys: "strip",
  catchall: ge.create(),
  typeName: y.ZodObject,
  ...v(e)
});
class rt extends _ {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function s(i) {
      for (const o of i)
        if (o.result.status === "valid")
          return o.result;
      for (const o of i)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((o) => new fe(o.ctx.common.issues));
      return p(r, {
        code: d.invalid_union,
        unionErrors: a
      }), w;
    }
    if (r.common.async)
      return Promise.all(n.map(async (i) => {
        const a = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: r.data,
            path: r.path,
            parent: a
          }),
          ctx: a
        };
      })).then(s);
    {
      let i;
      const a = [];
      for (const c of n) {
        const l = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, u = c._parseSync({
          data: r.data,
          path: r.path,
          parent: l
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !i && (i = { result: u, ctx: l }), l.common.issues.length && a.push(l.common.issues);
      }
      if (i)
        return r.common.issues.push(...i.ctx.common.issues), i.result;
      const o = a.map((c) => new fe(c));
      return p(r, {
        code: d.invalid_union,
        unionErrors: o
      }), w;
    }
  }
  get options() {
    return this._def.options;
  }
}
rt.create = (t, e) => new rt({
  options: t,
  typeName: y.ZodUnion,
  ...v(e)
});
const kt = (t) => t instanceof it ? kt(t.schema) : t instanceof se ? kt(t.innerType()) : t instanceof at ? [t.value] : t instanceof xe ? t.options : t instanceof ot ? Object.keys(t.enum) : t instanceof ct ? kt(t._def.innerType) : t instanceof et ? [void 0] : t instanceof tt ? [null] : null;
class nr extends _ {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.object)
      return p(r, {
        code: d.invalid_type,
        expected: f.object,
        received: r.parsedType
      }), w;
    const n = this.discriminator, s = r.data[n], i = this.optionsMap.get(s);
    return i ? r.common.async ? i._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : i._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (p(r, {
      code: d.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), w);
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
  static create(e, r, n) {
    const s = /* @__PURE__ */ new Map();
    for (const i of r) {
      const a = kt(i.shape[e]);
      if (!a)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of a) {
        if (s.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        s.set(o, i);
      }
    }
    return new nr({
      typeName: y.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: s,
      ...v(n)
    });
  }
}
function Or(t, e) {
  const r = be(t), n = be(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === f.object && n === f.object) {
    const s = A.objectKeys(e), i = A.objectKeys(t).filter((o) => s.indexOf(o) !== -1), a = { ...t, ...e };
    for (const o of i) {
      const c = Or(t[o], e[o]);
      if (!c.valid)
        return { valid: !1 };
      a[o] = c.data;
    }
    return { valid: !0, data: a };
  } else if (r === f.array && n === f.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const a = t[i], o = e[i], c = Or(a, o);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else
    return r === f.date && n === f.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class nt extends _ {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = (i, a) => {
      if (Tr(i) || Tr(a))
        return w;
      const o = Or(i.value, a.value);
      return o.valid ? ((Nr(i) || Nr(a)) && r.dirty(), { status: r.value, value: o.data }) : (p(n, {
        code: d.invalid_intersection_types
      }), w);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([i, a]) => s(i, a)) : s(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
nt.create = (t, e, r) => new nt({
  left: t,
  right: e,
  typeName: y.ZodIntersection,
  ...v(r)
});
class le extends _ {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.array)
      return p(n, {
        code: d.invalid_type,
        expected: f.array,
        received: n.parsedType
      }), w;
    if (n.data.length < this._def.items.length)
      return p(n, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), w;
    !this._def.rest && n.data.length > this._def.items.length && (p(n, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const i = [...n.data].map((a, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new ce(n, a, n.path, o)) : null;
    }).filter((a) => !!a);
    return n.common.async ? Promise.all(i).then((a) => J.mergeArray(r, a)) : J.mergeArray(r, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new le({
      ...this._def,
      rest: e
    });
  }
}
le.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new le({
    items: t,
    typeName: y.ZodTuple,
    rest: null,
    ...v(e)
  });
};
class st extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.object)
      return p(n, {
        code: d.invalid_type,
        expected: f.object,
        received: n.parsedType
      }), w;
    const s = [], i = this._def.keyType, a = this._def.valueType;
    for (const o in n.data)
      s.push({
        key: i._parse(new ce(n, o, n.path, o)),
        value: a._parse(new ce(n, n.data[o], n.path, o))
      });
    return n.common.async ? J.mergeObjectAsync(r, s) : J.mergeObjectSync(r, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof _ ? new st({
      keyType: e,
      valueType: r,
      typeName: y.ZodRecord,
      ...v(n)
    }) : new st({
      keyType: me.create(),
      valueType: e,
      typeName: y.ZodRecord,
      ...v(r)
    });
  }
}
class Gt extends _ {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.map)
      return p(n, {
        code: d.invalid_type,
        expected: f.map,
        received: n.parsedType
      }), w;
    const s = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([o, c], l) => ({
      key: s._parse(new ce(n, o, n.path, [l, "key"])),
      value: i._parse(new ce(n, c, n.path, [l, "value"]))
    }));
    if (n.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of a) {
          const l = await c.key, u = await c.value;
          if (l.status === "aborted" || u.status === "aborted")
            return w;
          (l.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(l.value, u.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of a) {
        const l = c.key, u = c.value;
        if (l.status === "aborted" || u.status === "aborted")
          return w;
        (l.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(l.value, u.value);
      }
      return { status: r.value, value: o };
    }
  }
}
Gt.create = (t, e, r) => new Gt({
  valueType: e,
  keyType: t,
  typeName: y.ZodMap,
  ...v(r)
});
class Ce extends _ {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== f.set)
      return p(n, {
        code: d.invalid_type,
        expected: f.set,
        received: n.parsedType
      }), w;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (p(n, {
      code: d.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (p(n, {
      code: d.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), r.dirty());
    const i = this._def.valueType;
    function a(c) {
      const l = /* @__PURE__ */ new Set();
      for (const u of c) {
        if (u.status === "aborted")
          return w;
        u.status === "dirty" && r.dirty(), l.add(u.value);
      }
      return { status: r.value, value: l };
    }
    const o = [...n.data.values()].map((c, l) => i._parse(new ce(n, c, n.path, l)));
    return n.common.async ? Promise.all(o).then((c) => a(c)) : a(o);
  }
  min(e, r) {
    return new Ce({
      ...this._def,
      minSize: { value: e, message: S.toString(r) }
    });
  }
  max(e, r) {
    return new Ce({
      ...this._def,
      maxSize: { value: e, message: S.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Ce.create = (t, e) => new Ce({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: y.ZodSet,
  ...v(e)
});
class Ie extends _ {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.function)
      return p(r, {
        code: d.invalid_type,
        expected: f.function,
        received: r.parsedType
      }), w;
    function n(o, c) {
      return Lt({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Dt(),
          He
        ].filter((l) => !!l),
        issueData: {
          code: d.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function s(o, c) {
      return Lt({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Dt(),
          He
        ].filter((l) => !!l),
        issueData: {
          code: d.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const i = { errorMap: r.common.contextualErrorMap }, a = r.data;
    return this._def.returns instanceof Ze ? q(async (...o) => {
      const c = new fe([]), l = await this._def.args.parseAsync(o, i).catch((b) => {
        throw c.addIssue(n(o, b)), c;
      }), u = await a(...l);
      return await this._def.returns._def.type.parseAsync(u, i).catch((b) => {
        throw c.addIssue(s(u, b)), c;
      });
    }) : q((...o) => {
      const c = this._def.args.safeParse(o, i);
      if (!c.success)
        throw new fe([n(o, c.error)]);
      const l = a(...c.data), u = this._def.returns.safeParse(l, i);
      if (!u.success)
        throw new fe([s(l, u.error)]);
      return u.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Ie({
      ...this._def,
      args: le.create(e).rest(Ee.create())
    });
  }
  returns(e) {
    return new Ie({
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
  static create(e, r, n) {
    return new Ie({
      args: e || le.create([]).rest(Ee.create()),
      returns: r || Ee.create(),
      typeName: y.ZodFunction,
      ...v(n)
    });
  }
}
class it extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
it.create = (t, e) => new it({
  getter: t,
  typeName: y.ZodLazy,
  ...v(e)
});
class at extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        received: r.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), w;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
at.create = (t, e) => new at({
  value: t,
  typeName: y.ZodLiteral,
  ...v(e)
});
function ws(t, e) {
  return new xe({
    values: t,
    typeName: y.ZodEnum,
    ...v(e)
  });
}
class xe extends _ {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return p(r, {
        expected: A.joinValues(n),
        received: r.parsedType,
        code: d.invalid_type
      }), w;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return p(r, {
        received: r.data,
        code: d.invalid_enum_value,
        options: n
      }), w;
    }
    return q(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e) {
    return xe.create(e);
  }
  exclude(e) {
    return xe.create(this.options.filter((r) => !e.includes(r)));
  }
}
xe.create = ws;
class ot extends _ {
  _parse(e) {
    const r = A.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== f.string && n.parsedType !== f.number) {
      const s = A.objectValues(r);
      return p(n, {
        expected: A.joinValues(s),
        received: n.parsedType,
        code: d.invalid_type
      }), w;
    }
    if (r.indexOf(e.data) === -1) {
      const s = A.objectValues(r);
      return p(n, {
        received: n.data,
        code: d.invalid_enum_value,
        options: s
      }), w;
    }
    return q(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
ot.create = (t, e) => new ot({
  values: t,
  typeName: y.ZodNativeEnum,
  ...v(e)
});
class Ze extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.promise && r.common.async === !1)
      return p(r, {
        code: d.invalid_type,
        expected: f.promise,
        received: r.parsedType
      }), w;
    const n = r.parsedType === f.promise ? r.data : Promise.resolve(r.data);
    return q(n.then((s) => this._def.type.parseAsync(s, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
Ze.create = (t, e) => new Ze({
  type: t,
  typeName: y.ZodPromise,
  ...v(e)
});
class se extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null;
    if (s.type === "preprocess") {
      const a = s.transform(n.data);
      return n.common.async ? Promise.resolve(a).then((o) => this._def.schema._parseAsync({
        data: o,
        path: n.path,
        parent: n
      })) : this._def.schema._parseSync({
        data: a,
        path: n.path,
        parent: n
      });
    }
    const i = {
      addIssue: (a) => {
        p(n, a), a.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), s.type === "refinement") {
      const a = (o) => {
        const c = s.refinement(o, i);
        if (n.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? w : (o.status === "dirty" && r.dirty(), a(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => o.status === "aborted" ? w : (o.status === "dirty" && r.dirty(), a(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Ut(a))
          return a;
        const o = s.transform(a.value, i);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((a) => Ut(a) ? Promise.resolve(s.transform(a.value, i)).then((o) => ({ status: r.value, value: o })) : a);
    A.assertNever(s);
  }
}
se.create = (t, e, r) => new se({
  schema: t,
  typeName: y.ZodEffects,
  effect: e,
  ...v(r)
});
se.createWithPreprocess = (t, e, r) => new se({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: y.ZodEffects,
  ...v(r)
});
class he extends _ {
  _parse(e) {
    return this._getType(e) === f.undefined ? q(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
he.create = (t, e) => new he({
  innerType: t,
  typeName: y.ZodOptional,
  ...v(e)
});
class Te extends _ {
  _parse(e) {
    return this._getType(e) === f.null ? q(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Te.create = (t, e) => new Te({
  innerType: t,
  typeName: y.ZodNullable,
  ...v(e)
});
class ct extends _ {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === f.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ct.create = (t, e) => new ct({
  innerType: t,
  typeName: y.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...v(e)
});
class Wt extends _ {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r,
        common: {
          ...r.common,
          issues: []
        }
      }
    });
    return Zt(n) ? n.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue()
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue()
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Wt.create = (t, e) => new Wt({
  innerType: t,
  typeName: y.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...v(e)
});
class Ft extends _ {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: d.invalid_type,
        expected: f.nan,
        received: n.parsedType
      }), w;
    }
    return { status: "valid", value: e.data };
  }
}
Ft.create = (t) => new Ft({
  typeName: y.ZodNaN,
  ...v(t)
});
const Za = Symbol("zod_brand");
class vs extends _ {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ft extends _ {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? w : i.status === "dirty" ? (r.dirty(), bs(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return s.status === "aborted" ? w : s.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, r) {
    return new ft({
      in: e,
      out: r,
      typeName: y.ZodPipeline
    });
  }
}
const _s = (t, e = {}, r) => t ? Ue.create().superRefine((n, s) => {
  if (!t(n)) {
    const i = typeof e == "function" ? e(n) : e, a = typeof i == "string" ? { message: i } : i;
    s.addIssue({ code: "custom", ...a, fatal: r });
  }
}) : Ue.create(), Va = {
  object: P.lazycreate
};
var y;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline";
})(y || (y = {}));
const za = (t, e = {
  message: `Input not instance of ${t.name}`
}) => _s((r) => r instanceof t, e, !0), xs = me.create, Ss = _e.create, Ba = Ft.create, Ga = Xe.create, ks = Qe.create, Wa = Ae.create, Fa = Vt.create, Ka = et.create, qa = tt.create, Ja = Ue.create, Ya = Ee.create, Ha = ge.create, Xa = zt.create, Qa = re.create, eo = P.create, to = P.strictCreate, ro = rt.create, no = nr.create, so = nt.create, io = le.create, ao = st.create, oo = Gt.create, co = Ce.create, lo = Ie.create, uo = it.create, fo = at.create, ho = xe.create, po = ot.create, mo = Ze.create, Rn = se.create, go = he.create, yo = Te.create, bo = se.createWithPreprocess, wo = ft.create, vo = () => xs().optional(), _o = () => Ss().optional(), xo = () => ks().optional(), So = {
  string: (t) => me.create({ ...t, coerce: !0 }),
  number: (t) => _e.create({ ...t, coerce: !0 }),
  boolean: (t) => Qe.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => Xe.create({ ...t, coerce: !0 }),
  date: (t) => Ae.create({ ...t, coerce: !0 })
}, ko = w;
var Q = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: He,
  setErrorMap: Pa,
  getErrorMap: Dt,
  makeIssue: Lt,
  EMPTY_PATH: ja,
  addIssueToContext: p,
  ParseStatus: J,
  INVALID: w,
  DIRTY: bs,
  OK: q,
  isAborted: Tr,
  isDirty: Nr,
  isValid: Ut,
  isAsync: Zt,
  get util() {
    return A;
  },
  ZodParsedType: f,
  getParsedType: be,
  ZodType: _,
  ZodString: me,
  ZodNumber: _e,
  ZodBigInt: Xe,
  ZodBoolean: Qe,
  ZodDate: Ae,
  ZodSymbol: Vt,
  ZodUndefined: et,
  ZodNull: tt,
  ZodAny: Ue,
  ZodUnknown: Ee,
  ZodNever: ge,
  ZodVoid: zt,
  ZodArray: re,
  get objectUtil() {
    return Bt;
  },
  ZodObject: P,
  ZodUnion: rt,
  ZodDiscriminatedUnion: nr,
  ZodIntersection: nt,
  ZodTuple: le,
  ZodRecord: st,
  ZodMap: Gt,
  ZodSet: Ce,
  ZodFunction: Ie,
  ZodLazy: it,
  ZodLiteral: at,
  ZodEnum: xe,
  ZodNativeEnum: ot,
  ZodPromise: Ze,
  ZodEffects: se,
  ZodTransformer: se,
  ZodOptional: he,
  ZodNullable: Te,
  ZodDefault: ct,
  ZodCatch: Wt,
  ZodNaN: Ft,
  BRAND: Za,
  ZodBranded: vs,
  ZodPipeline: ft,
  custom: _s,
  Schema: _,
  ZodSchema: _,
  late: Va,
  get ZodFirstPartyTypeKind() {
    return y;
  },
  coerce: So,
  any: Ja,
  array: Qa,
  bigint: Ga,
  boolean: ks,
  date: Wa,
  discriminatedUnion: no,
  effect: Rn,
  enum: ho,
  function: lo,
  instanceof: za,
  intersection: so,
  lazy: uo,
  literal: fo,
  map: oo,
  nan: Ba,
  nativeEnum: po,
  never: Ha,
  null: qa,
  nullable: yo,
  number: Ss,
  object: eo,
  oboolean: xo,
  onumber: _o,
  optional: go,
  ostring: vo,
  pipeline: wo,
  preprocess: bo,
  promise: mo,
  record: ao,
  set: co,
  strictObject: to,
  string: xs,
  symbol: Fa,
  transformer: Rn,
  tuple: io,
  undefined: Ka,
  union: ro,
  unknown: Ya,
  void: Xa,
  NEVER: ko,
  ZodIssueCode: d,
  quotelessJson: $a,
  ZodError: fe
});
class Ur {
  #e;
  _state;
  constructor(e) {
    this.#e = [], this._state = e;
  }
  subscribe(e) {
    return this.#e.push(e), () => this.unsubscribe(e);
  }
  unsubscribe(e) {
    this.#e = this.#e.filter((r) => r !== e);
  }
  #t(e) {
    this.#e.forEach((r) => r(e));
  }
  setState(e) {
    this._state = e, this.#t(e);
  }
  get state() {
    return structuredClone(this._state);
  }
}
Q.object({
  isAuthenticated: Q.boolean()
});
const Eo = () => ({
  isAuthenticated: !1
});
class Ao extends Ur {
  #e;
  #t;
  #r;
  constructor(e, r) {
    super(Eo()), this.#e = e, this.#t = r, this.#r = "";
  }
  #n() {
    localStorage.accessToken = this.#r;
  }
  async authenticate() {
    if (localStorage.accessToken) {
      const e = await this.#e.getDb();
      this.#r = localStorage.accessToken;
      try {
        console.info("Authenticating token from localStorage..."), await e.authenticate(this.#r);
      } catch (r) {
        return console.error(r), this.signout();
      }
      this.setState({
        isAuthenticated: this.isAuthenticated
      });
    }
  }
  async signup(e) {
    const r = await this.#e.getDb();
    try {
      this.#r = await r.signup({
        namespace: this.#t.namespace,
        database: this.#t.database,
        scope: this.#t.scope,
        email: e.email,
        pass: e.pass
      });
    } catch (n) {
      throw n;
    }
    this.#n(), this.setState({
      isAuthenticated: this.isAuthenticated
    });
  }
  async signin(e) {
    const r = await this.#e.getDb();
    try {
      this.#r = await r.signin({
        namespace: this.#t.namespace,
        database: this.#t.database,
        scope: this.#t.scope,
        email: e.email,
        pass: e.pass
      });
    } catch (n) {
      throw n;
    }
    this.#n(), this.setState({
      isAuthenticated: this.isAuthenticated
    });
  }
  async signout() {
    this.#r = "", this.#n(), await (await this.#e.getDb()).invalidate(), this.setState({
      isAuthenticated: this.isAuthenticated
    });
  }
  get isAuthenticated() {
    return !!this.#r && this.#e.isConnected;
  }
}
const Co = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u), To = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/), No = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u), Oo = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?!.* ).{3,16}$/), Es = Q.string().trim().email("Must be a valid email address"), In = Q.string().trim().regex(Co, "Must be a valid name"), As = Q.string().trim().regex(Oo, "Must be 3-16 charcters and contain one digit and a special char"), $o = Q.string().trim().regex(No, "Must be a valid street address").or(Q.literal("")), Po = Q.preprocess(
  (t) => t.split(" ").join(""),
  Q.string().trim().regex(To, "Must be a valid phone number").or(Q.literal(""))
), Kt = (t, e, r) => {
  const n = t.safeParse(e);
  if (n.success)
    return r({}), n.data;
  r(n.error.flatten());
}, Cs = (t, e) => {
  const r = t.safeParse(e);
  r.success || console.warn("Incompatible data loaded:", r.error.flatten());
}, Ts = Q.object({
  email: Es,
  pass: As
}), jo = Ts.omit({ pass: !0 }), Ro = () => ({
  email: "",
  pass: ""
});
class Io extends Ur {
  #e;
  constructor(e) {
    super(Ro()), this.#e = e;
  }
  async loadData() {
    const e = await this.#e.getAccountDetails();
    Cs(jo, e), this.setState(e);
  }
  async saveData(e) {
    await this.#e.setAccountDetails(e), this.setState(e);
  }
}
const Ns = Q.object({
  firstName: In,
  lastName: In,
  address: $o,
  phone: Po
}), Mo = Ns, Do = () => ({
  firstName: "",
  lastName: "",
  address: "",
  phone: ""
});
class Lo extends Ur {
  #e;
  constructor(e) {
    super(Do()), this.#e = e;
  }
  async loadData() {
    const e = await this.#e.getProfileDetails();
    Cs(Mo, e), this.setState(e);
  }
  async saveData(e) {
    await this.#e.setProfileDetails(e), this.setState(e);
  }
}
const Uo = /* @__PURE__ */ U('<div class="loading"><sl-spinner style="font-size: 50px; --track-width: 10px;"></sl-spinner><div></div></div>'), sr = (t) => (() => {
  const e = z(() => document.importNode(Uo, !0)), r = e.firstChild, n = r.nextSibling;
  return r._$owner = V(), k(n, () => t.children), e;
})(), Os = Jt(), Zo = (t) => {
  const e = new Oa(t.datapoint, t.namespace, t.database), r = new Ao(e, {
    namespace: t.namespace,
    database: t.database,
    scope: t.scope
  }), n = new Io(e), s = new Lo(e), i = {
    auth: r,
    account: n,
    profile: s
  };
  return de(() => !e.isConnected, async () => {
    await e.connect();
  }), g(Xt, {
    get fallback() {
      return g(sr, {});
    },
    get children() {
      return [K(() => rr()), g(Os.Provider, {
        value: i,
        get children() {
          return t.children;
        }
      })];
    }
  });
}, ze = () => Pr(Os), Vo = /* @__PURE__ */ U('<div class="error"><sl-icon class="icon" name="exclamation-circle"></sl-icon><span>.</span></div>'), zo = /* @__PURE__ */ U('<div class="field"><sl-input></sl-input></div>'), Bo = /* @__PURE__ */ U('<sl-icon class="rotate" slot="suffix" name="arrow-repeat"></sl-icon>'), Go = /* @__PURE__ */ U("<sl-button></sl-button>"), Wo = /* @__PURE__ */ U("<form></form>"), we = (t) => {
  const [e] = Se(), [r, n] = Hn(t, ["isSubmiting", "errors"]);
  return (() => {
    const s = z(() => document.importNode(zo, !0)), i = s.firstChild;
    return Xn(i, Yn(n, {
      get disabled() {
        return r.isSubmiting;
      }
    }), !1, !1), i._$owner = V(), k(s, g(pe, {
      get when() {
        return r.errors;
      },
      get children() {
        const a = z(() => document.importNode(Vo, !0)), o = a.firstChild, c = o.nextSibling, l = c.firstChild;
        return o._$owner = V(), k(c, () => r.errors?.map((u) => e(u) || u).join(". "), l), a;
      }
    }), null), s;
  })();
}, lt = (t) => {
  const [e, r] = Hn(t, ["isSubmiting", "children"]);
  return (() => {
    const n = z(() => document.importNode(Go, !0));
    return Xn(n, Yn(r, {
      get disabled() {
        return e.isSubmiting;
      }
    }), !1, !0), n._$owner = V(), k(n, g(pe, {
      get when() {
        return e.isSubmiting;
      },
      get children() {
        const s = z(() => document.importNode(Bo, !0));
        return s._$owner = V(), s;
      }
    }), null), k(n, () => e.children, null), n;
  })();
}, Zr = (t) => {
  const e = (r) => {
    r.preventDefault(), t.onSubmit();
  };
  return (() => {
    const r = Wo.cloneNode(!0);
    return r.addEventListener("submit", e), k(r, () => t.children), r;
  })();
}, Fo = /* @__PURE__ */ U('<div class="form-error"></div>'), Ko = /* @__PURE__ */ U("<div></div>"), qo = /* @__PURE__ */ U("<section><h2></h2></section>"), Mn = Q.object({
  email: Es,
  pass: As
}), Jo = {
  email: "flemming@intergate.io",
  pass: "flemming8"
}, Yo = () => {
  const [t] = Se(), {
    auth: e
  } = ze(), [r, n] = Qt(Jo), [s, i] = D(), [a, o] = D(), [c, l] = D({}), [u] = de(() => !0, async () => await e.authenticate()), [h] = de(a, (x) => e.signin(x)), [b] = de(s, (x) => e.signup(x));
  qt(async () => {
    h.error && l({
      formErrors: [t("Failed signing in"), t("Did you type your password and email correct?")]
    }), b.error && l({
      formErrors: [t("Failed signing up"), t("Did you already sign up?")]
    });
  });
  const m = (x) => (O) => {
    n(x, O.target.value);
  }, E = () => h.loading || b.loading;
  return (() => {
    const x = qo.cloneNode(!0), O = x.firstChild;
    return k(O, () => t("Sign in")), k(x, g(Xt, {
      get fallback() {
        return g(sr, {});
      },
      get children() {
        return [K(() => rr(u())), g(Zr, {
          onSubmit: () => o(Kt(Mn, r, l)),
          get children() {
            return [g(we, {
              get label() {
                return t("Email");
              },
              type: "text",
              inputmode: "email",
              clearable: !0,
              required: !0,
              get value() {
                return r.email;
              },
              get errors() {
                return c().fieldErrors?.email;
              },
              get ["data-invalid"]() {
                return !!c().fieldErrors?.email || c().formErrors;
              },
              get ["on:sl-change"]() {
                return m("email");
              },
              get isSubmiting() {
                return E();
              }
            }), g(we, {
              get label() {
                return t("Password");
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
                return c().fieldErrors?.pass;
              },
              get ["on:sl-change"]() {
                return m("pass");
              },
              get ["data-invalid"]() {
                return !!c().fieldErrors?.pass || c().formErrors;
              },
              get isSubmiting() {
                return E();
              }
            }), g(pe, {
              get when() {
                return c().formErrors?.length;
              },
              get children() {
                const T = Fo.cloneNode(!0);
                return k(T, () => c().formErrors?.join(". ")), T;
              }
            }), (() => {
              const T = Ko.cloneNode(!0);
              return k(T, g(lt, {
                onClick: () => i(Kt(Mn, r, l)),
                get isSubmiting() {
                  return E();
                },
                variant: "neutral",
                get children() {
                  return t("Sign up");
                }
              }), null), k(T, g(lt, {
                type: "submit",
                variant: "primary",
                get isSubmiting() {
                  return E();
                },
                get children() {
                  return t("Sign in");
                }
              }), null), T;
            })()];
          }
        })];
      }
    }), null), x;
  })();
}, Ho = () => {
  const [t] = Se(), {
    auth: e
  } = ze(), [r, n] = D(), [s] = de(r, () => e.signout());
  return g(lt, {
    get isSubmiting() {
      return s.loading;
    },
    onClick: () => n(!0),
    variant: "primary",
    get children() {
      return t("Sign out");
    }
  });
}, Xo = /* @__PURE__ */ U("<div><sl-select></sl-select></div>"), Qo = /* @__PURE__ */ U("<sl-option></sl-option>"), ec = (t = {}) => {
  const r = {
    ...{
      languageCodeOnly: !1
    },
    ...t
  }, n = navigator.languages === void 0 ? [navigator.language] : navigator.languages;
  return n ? n.map((s) => {
    const i = s.trim();
    return r.languageCodeOnly ? i.split(/-|_/)[0] : i;
  }) : [];
}, tc = (t) => {
  const [e, {
    locale: r,
    dict: n
  }] = Se(), s = (o) => {
    localStorage.langCode = o, r(o);
  };
  let i = localStorage.langCode;
  if (!i) {
    const o = ec({
      languageCodeOnly: !0
    });
    i = n(o[0] || "") ? o[0] : "no";
  }
  s(i);
  const a = K(() => Hr.find(({
    code: o
  }) => o === r()));
  return (() => {
    const o = z(() => document.importNode(Xo, !0)), c = o.firstChild;
    return c.addEventListener("sl-change", (l) => s(l.target.value)), c._$owner = V(), k(c, g(Xs, {
      each: Hr,
      children: (l) => (() => {
        const u = z(() => document.importNode(Qo, !0));
        return u._$owner = V(), k(u, () => l.name), te(() => Y(u, "value", l.code)), u;
      })()
    })), te(() => Y(c, "value", a()?.code)), o;
  })();
}, rc = /* @__PURE__ */ U("<sl-avatar></sl-avatar>"), nc = /* @__PURE__ */ U('<div class="top-bar"><menu></menu><h1></h1></div>'), sc = ({
  firstName: t,
  lastName: e
}) => [t, e].reduce((r, n) => (r = r + (n.length ? n[0] : ""), r), ""), ic = (t) => {
  const [e] = Se(), {
    profile: r,
    auth: n
  } = ze(), s = qe(n), i = qe(r), a = () => s()?.isAuthenticated, o = K(() => i() && sc(i()));
  return (() => {
    const c = nc.cloneNode(!0), l = c.firstChild, u = l.nextSibling;
    return k(l, g(pe, {
      get when() {
        return a();
      },
      get children() {
        const h = z(() => document.importNode(rc, !0));
        return h._$owner = V(), te(() => Y(h, "initials", o())), h;
      }
    }), null), k(l, g(tc, {}), null), k(l, g(pe, {
      get when() {
        return a();
      },
      get children() {
        return g(Ho, {});
      }
    }), null), k(u, () => e(t.title)), c;
  })();
}, ac = /* @__PURE__ */ U("<section><h2></h2><p>Not implemented!</p></section>"), Dn = (t) => (() => {
  const e = ac.cloneNode(!0), r = e.firstChild;
  return k(r, () => t.title), e;
})(), oc = /* @__PURE__ */ U('<div class="form-error">.</div>'), cc = /* @__PURE__ */ U("<section><h2></h2></section>"), lc = () => {
  const [t] = Se(), {
    auth: e,
    profile: r
  } = ze(), [n, s] = D(), [i, a] = Qt(r.state), [o, c] = D({}), l = qe(r);
  te(() => {
    const m = l();
    m && a(m);
  });
  const [u] = de(() => e.isAuthenticated, () => r.loadData()), [h] = de(n, (m) => {
    r.saveData(m);
  });
  qt(async () => {
    h.error && c({
      formErrors: [t("Error saving")]
    });
  });
  const b = (m) => (E) => {
    a(m, E.target.value);
  };
  return (() => {
    const m = cc.cloneNode(!0), E = m.firstChild;
    return k(E, () => t("Profile")), k(m, g(Xt, {
      get fallback() {
        return g(sr, {});
      },
      get children() {
        return [K(() => rr(u())), g(Zr, {
          onSubmit: () => s(Kt(Ns, i, c)),
          get children() {
            return [g(we, {
              get label() {
                return t("First name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return i.firstName;
              },
              get ["on:sl-change"]() {
                return b("firstName");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.firstName;
              },
              get isSubmiting() {
                return h.loading;
              },
              get errors() {
                return o().fieldErrors?.firstName;
              }
            }), g(we, {
              get label() {
                return t("Last name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return i.lastName;
              },
              get ["on:sl-change"]() {
                return b("lastName");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.lastName;
              },
              get isSubmiting() {
                return h.loading;
              },
              get errors() {
                return o().fieldErrors?.lastName;
              }
            }), g(we, {
              get label() {
                return t("Address");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !1,
              get value() {
                return i.address;
              },
              get ["on:sl-change"]() {
                return b("address");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.address;
              },
              get isSubmiting() {
                return h.loading;
              },
              get errors() {
                return o().fieldErrors?.address;
              }
            }), g(we, {
              get label() {
                return t("Phone");
              },
              inputmode: "numeric",
              spellcheck: !1,
              clearable: !0,
              get value() {
                return i.phone;
              },
              get ["on:sl-change"]() {
                return b("phone");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.phone;
              },
              get isSubmiting() {
                return h.loading;
              },
              get errors() {
                return o().fieldErrors?.phone;
              }
            }), g(pe, {
              get when() {
                return o().formErrors?.length;
              },
              get children() {
                const x = oc.cloneNode(!0), O = x.firstChild;
                return k(x, () => o().formErrors?.join(". "), O), x;
              }
            }), g(lt, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return h.loading;
              },
              get children() {
                return t("Save");
              }
            })];
          }
        })];
      }
    }), null), m;
  })();
}, uc = /* @__PURE__ */ U('<div class="form-error">.</div>'), dc = /* @__PURE__ */ U("<section><h2></h2></section>"), fc = () => {
  const [t] = Se(), {
    auth: e,
    account: r
  } = ze(), [n, s] = D(), [i, a] = Qt(r.state), [o, c] = D({}), l = qe(r);
  te(() => {
    const m = l();
    m && a(m);
  });
  const [u] = de(() => e.isAuthenticated, () => r.loadData()), [h] = de(n, (m) => r.saveData(m));
  qt(async () => {
    h.error && c({
      formErrors: [t("Error saving")]
    }), h.state === "ready" && a("pass", "");
  });
  const b = (m) => (E) => {
    a(m, E.target.value);
  };
  return (() => {
    const m = dc.cloneNode(!0), E = m.firstChild;
    return k(E, () => t("Account")), k(m, g(Xt, {
      get fallback() {
        return g(sr, {});
      },
      get children() {
        return [K(() => rr(u())), g(Zr, {
          onSubmit: () => s(Kt(Ts, i, c)),
          get children() {
            return [g(we, {
              get label() {
                return t("Email");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return i.email;
              },
              get ["on:sl-change"]() {
                return b("email");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.email;
              },
              get isSubmiting() {
                return h.loading;
              },
              get errors() {
                return o().fieldErrors?.email;
              }
            }), g(we, {
              get label() {
                return t("Password");
              },
              inputmode: "text",
              clearable: !0,
              type: "password",
              "password-toggle": !0,
              get value() {
                return i.pass;
              },
              get ["on:sl-change"]() {
                return b("pass");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.pass;
              },
              get isSubmiting() {
                return h.loading;
              },
              get errors() {
                return o().fieldErrors?.pass;
              }
            }), g(pe, {
              get when() {
                return o().formErrors?.length;
              },
              get children() {
                const x = uc.cloneNode(!0), O = x.firstChild;
                return k(x, () => o().formErrors?.join(". "), O), x;
              }
            }), g(lt, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return h.loading;
              },
              get children() {
                return t("Save");
              }
            })];
          }
        })];
      }
    }), null), m;
  })();
};
class hc extends Error {
  name = "AuthenticationError";
}
const pc = /* @__PURE__ */ U('<sl-tab-group><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel></sl-tab-group>'), mc = /* @__PURE__ */ U(`<main class="app"><style data-name="reset"></style><style data-name="unocss">/* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}</style><style data-name="custom"></style><div></div></main>`), gc = (t) => {
  const [e] = Se(), {
    auth: r
  } = ze(), [n, s] = D(), i = qe(r), a = () => i()?.isAuthenticated;
  return qt(() => {
    const {
      activePanel: o
    } = localStorage, c = n();
    o && c && c.updateComplete.then(() => {
      c.show(o);
    });
  }), zn((o) => {
    if (o instanceof hc)
      console.warn("Session expired, signing out"), r.signout();
    else
      throw o;
  }), (() => {
    const o = mc.cloneNode(!0), c = o.firstChild, l = c.nextSibling, u = l.nextSibling, h = u.nextSibling;
    return k(c, Ti), k(u, Ni), k(h, g(ic, {
      get title() {
        return t.title;
      }
    }), null), k(h, g(pe, {
      get when() {
        return !a();
      },
      get children() {
        return g(Yo, {
          title: "Login"
        });
      }
    }), null), k(h, g(pe, {
      get when() {
        return a();
      },
      get children() {
        const b = z(() => document.importNode(pc, !0)), m = b.firstChild, E = m.firstChild, x = m.nextSibling, O = x.firstChild, T = x.nextSibling, M = T.firstChild, L = T.nextSibling, B = L.nextSibling, H = B.nextSibling;
        return hi((ie) => s(ie), b), b.addEventListener("sl-tab-show", ({
          detail: ie
        }) => {
          localStorage.activePanel = ie.name;
        }), b._$owner = V(), Y(m, "panel", "account"), m._$owner = V(), Y(E, "name", "person-lock"), E._$owner = V(), k(m, () => e("Account"), null), Y(x, "panel", "subscription"), x._$owner = V(), Y(O, "name", "journal"), O._$owner = V(), k(x, () => e("Subscription"), null), Y(T, "panel", "contact"), T._$owner = V(), Y(M, "name", "person-hearts"), M._$owner = V(), k(T, () => e("Contact"), null), Y(L, "name", "account"), L._$owner = V(), k(L, g(fc, {}), null), k(L, g(lc, {}), null), Y(B, "name", "subscription"), B._$owner = V(), k(B, g(Dn, {
          get title() {
            return e("Subscription");
          }
        })), Y(H, "name", "contact"), H._$owner = V(), k(H, g(Dn, {
          get title() {
            return e("Contact");
          }
        })), b;
      }
    }), null), o;
  })();
}, yc = (t) => (zn((e) => console.error(`App::onError: ${e}`)), g(Zi, {
  get children() {
    return g(Zo, {
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
        return g(gc, {
          get title() {
            return t.title;
          }
        });
      }
    });
  }
}));
vi(
  "membership-widget",
  {
    datapoint: "wss://localhost:8055/",
    title: "Membership portal",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  yc
);
