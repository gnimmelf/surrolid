var pi = Object.defineProperty;
var fi = (e, t, r) => t in e ? pi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var mr = (e, t, r) => (fi(e, typeof t != "symbol" ? t + "" : t, r), r);
function mi(e) {
  return Object.keys(e).reduce((r, s) => {
    const o = e[s];
    return r[s] = Object.assign({}, o), sn(o.value) && !_i(o.value) && !Array.isArray(o.value) && (r[s].value = Object.assign({}, o.value)), Array.isArray(o.value) && (r[s].value = o.value.slice(0)), r;
  }, {});
}
function gi(e) {
  return e ? Object.keys(e).reduce((r, s) => {
    const o = e[s];
    return r[s] = sn(o) && "value" in o ? o : {
      value: o
    }, r[s].attribute || (r[s].attribute = yi(s)), r[s].parse = "parse" in r[s] ? r[s].parse : typeof r[s].value != "string", r;
  }, {}) : {};
}
function bi(e) {
  return Object.keys(e).reduce((r, s) => (r[s] = e[s].value, r), {});
}
function vi(e, t) {
  const r = mi(t);
  return Object.keys(t).forEach((o) => {
    const n = r[o], i = e.getAttribute(n.attribute), l = e[o];
    i && (n.value = n.parse ? rn(i) : i), l != null && (n.value = Array.isArray(l) ? l.slice(0) : l), n.reflect && oo(e, n.attribute, n.value), Object.defineProperty(e, o, {
      get() {
        return n.value;
      },
      set(a) {
        const c = n.value;
        n.value = a, n.reflect && oo(this, n.attribute, n.value);
        for (let u = 0, h = this.__propertyChangedCallbacks.length; u < h; u++)
          this.__propertyChangedCallbacks[u](o, a, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), r;
}
function rn(e) {
  if (!!e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function oo(e, t, r) {
  if (r == null || r === !1)
    return e.removeAttribute(t);
  let s = JSON.stringify(r);
  e.__updating[t] = !0, s === "true" && (s = ""), e.setAttribute(t, s), Promise.resolve().then(() => delete e.__updating[t]);
}
function yi(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, r) => "-" + r.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function sn(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function _i(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function wi(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let os;
function xi(e, t) {
  const r = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return r.map((o) => t[o].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = vi(this, t);
      const o = bi(this.props), n = this.Component, i = os;
      try {
        os = this, this.__initialized = !0, wi(n) ? new n(o, {
          element: this
        }) : n(o, {
          element: this
        });
      } finally {
        os = i;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let o = null;
      for (; o = this.__releaseCallbacks.pop(); )
        o(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(o, n, i) {
      if (!!this.__initialized && !this.__updating[o] && (o = this.lookupProp(o), o in t)) {
        if (i == null && !this[o])
          return;
        this[o] = t[o].parse ? rn(i) : i;
      }
    }
    lookupProp(o) {
      if (!!t)
        return r.find((n) => o === n || o === t[n].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(o) {
      this.__releaseCallbacks.push(o);
    }
    addPropertyChangedCallback(o) {
      this.__propertyChangedCallbacks.push(o);
    }
  };
}
function ki(e, t = {}, r = {}) {
  const {
    BaseElement: s = HTMLElement,
    extension: o
  } = r;
  return (n) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let i = customElements.get(e);
    return i ? (i.prototype.Component = n, i) : (i = xi(s, gi(t)), i.prototype.Component = n, i.prototype.registeredTag = e, customElements.define(e, i, o), i);
  };
}
const K = {};
function jt(e) {
  K.context = e;
}
const $i = (e, t) => e === t, Ee = Symbol("solid-proxy"), vs = Symbol("solid-track"), xr = {
  equals: $i
};
let qe = null, on = hn;
const Me = 1, kr = 2, nn = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, ns = {};
var B = null;
let Oe = null, q = null, te = null, he = null, Ds = 0;
function Vt(e, t) {
  const r = q, s = B, o = e.length === 0, n = o ? nn : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? s : t
  }, i = o ? e : () => e(() => Q(() => Jr(n)));
  B = n, q = null;
  try {
    return et(i, !0);
  } finally {
    q = r, B = s;
  }
}
function Y(e, t) {
  t = t ? Object.assign({}, xr, t) : xr;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, s = (o) => (typeof o == "function" && (o = o(r.value)), dn(r, o));
  return [un.bind(r), s];
}
function no(e, t, r) {
  const s = Yr(e, t, !0, Me);
  Pt(s);
}
function ze(e, t, r) {
  const s = Yr(e, t, !1, Me);
  Pt(s);
}
function zt(e, t, r) {
  on = Pi;
  const s = Yr(e, t, !1, Me), o = kt && dr(B, kt.id);
  o && (s.suspense = o), s.user = !0, he ? he.push(s) : Pt(s);
}
function ne(e, t, r) {
  r = r ? Object.assign({}, xr, r) : xr;
  const s = Yr(e, t, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = r.equals || void 0, Pt(s), un.bind(s);
}
function Je(e, t, r) {
  let s, o, n;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (s = !0, o = e, n = t || {}) : (s = e, o = t, n = r || {});
  let i = null, l = ns, a = null, c = !1, u = !1, h = "initialValue" in n, p = typeof s == "function" && ne(s);
  const g = /* @__PURE__ */ new Set(), [m, _] = (n.storage || Y)(n.initialValue), [w, $] = Y(void 0), [v, k] = Y(void 0, {
    equals: !1
  }), [I, j] = Y(h ? "ready" : "unresolved");
  if (K.context) {
    a = `${K.context.id}${K.context.count++}`;
    let F;
    n.ssrLoadFrom === "initial" ? l = n.initialValue : K.load && (F = K.load(a)) && (l = F[0]);
  }
  function de(F, D, U, _e) {
    return i === F && (i = null, h = !0, (F === l || D === l) && n.onHydrated && queueMicrotask(() => n.onHydrated(_e, {
      value: D
    })), l = ns, ce(D, U)), D;
  }
  function ce(F, D) {
    et(() => {
      D === void 0 && _(() => F), j(D !== void 0 ? "errored" : "ready"), $(D);
      for (const U of g.keys())
        U.decrement();
      g.clear();
    }, !1);
  }
  function ye() {
    const F = kt && dr(B, kt.id), D = m(), U = w();
    if (U !== void 0 && !i)
      throw U;
    return q && !q.user && F && no(() => {
      v(), i && (F.resolved && Oe && c ? Oe.promises.add(i) : g.has(F) || (F.increment(), g.add(F)));
    }), D;
  }
  function He(F = !0) {
    if (F !== !1 && u)
      return;
    u = !1;
    const D = p ? p() : s;
    if (c = Oe, D == null || D === !1) {
      de(i, Q(m));
      return;
    }
    const U = l !== ns ? l : Q(() => o(D, {
      value: m(),
      refetching: F
    }));
    return typeof U != "object" || !(U && "then" in U) ? (de(i, U, void 0, D), U) : (i = U, u = !0, queueMicrotask(() => u = !1), et(() => {
      j(h ? "refreshing" : "pending"), k();
    }, !1), U.then((_e) => de(U, _e, void 0, D), (_e) => de(U, void 0, fn(_e), D)));
  }
  return Object.defineProperties(ye, {
    state: {
      get: () => I()
    },
    error: {
      get: () => w()
    },
    loading: {
      get() {
        const F = I();
        return F === "pending" || F === "refreshing";
      }
    },
    latest: {
      get() {
        if (!h)
          return ye();
        const F = w();
        if (F && !i)
          throw F;
        return m();
      }
    }
  }), p ? no(() => He(!1)) : He(!1), [ye, {
    refetch: He,
    mutate: _
  }];
}
function Si(e) {
  return et(e, !1);
}
function Q(e) {
  if (q === null)
    return e();
  const t = q;
  q = null;
  try {
    return e();
  } finally {
    q = t;
  }
}
function Ci(e) {
  zt(() => Q(e));
}
function ln(e) {
  return B === null || (B.cleanups === null ? B.cleanups = [e] : B.cleanups.push(e)), e;
}
function an(e) {
  qe || (qe = Symbol("error")), B === null || (B.context === null ? B.context = {
    [qe]: [e]
  } : B.context[qe] ? B.context[qe].push(e) : B.context[qe] = [e]);
}
function cn() {
  return q;
}
function X() {
  return B;
}
function Ai(e) {
  he.push.apply(he, e), e.length = 0;
}
function Gr(e, t) {
  const r = Symbol("context");
  return {
    id: r,
    Provider: Li(r),
    defaultValue: e
  };
}
function Ms(e) {
  let t;
  return (t = dr(B, e.id)) !== void 0 ? t : e.defaultValue;
}
function Ei(e) {
  const t = ne(e), r = ne(() => ys(t()));
  return r.toArray = () => {
    const s = r();
    return Array.isArray(s) ? s : s != null ? [s] : [];
  }, r;
}
let kt;
function Ti() {
  return kt || (kt = Gr({}));
}
function un() {
  const e = Oe;
  if (this.sources && (this.state || e))
    if (this.state === Me || e)
      Pt(this);
    else {
      const t = te;
      te = null, et(() => Sr(this), !1), te = t;
    }
  if (q) {
    const t = this.observers ? this.observers.length : 0;
    q.sources ? (q.sources.push(this), q.sourceSlots.push(t)) : (q.sources = [this], q.sourceSlots = [t]), this.observers ? (this.observers.push(q), this.observerSlots.push(q.sources.length - 1)) : (this.observers = [q], this.observerSlots = [q.sources.length - 1]);
  }
  return this.value;
}
function dn(e, t, r) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, t)) && (e.value = t, e.observers && e.observers.length && et(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const n = e.observers[o], i = Oe && Oe.running;
      i && Oe.disposed.has(n), (i && !n.tState || !i && !n.state) && (n.pure ? te.push(n) : he.push(n), n.observers && pn(n)), i || (n.state = Me);
    }
    if (te.length > 1e6)
      throw te = [], new Error();
  }, !1)), t;
}
function Pt(e) {
  if (!e.fn)
    return;
  Jr(e);
  const t = B, r = q, s = Ds;
  q = B = e, Oi(e, e.value, s), q = r, B = t;
}
function Oi(e, t, r) {
  let s;
  try {
    s = e.fn(t);
  } catch (o) {
    e.pure && (e.state = Me, e.owned && e.owned.forEach(Jr), e.owned = null), mn(o);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? dn(e, s) : e.value = s, e.updatedAt = r);
}
function Yr(e, t, r, s = Me, o) {
  const n = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: B,
    context: null,
    pure: r
  };
  return B === null || B !== nn && (B.owned ? B.owned.push(n) : B.owned = [n]), n;
}
function $r(e) {
  const t = Oe;
  if (e.state === 0 || t)
    return;
  if (e.state === kr || t)
    return Sr(e);
  if (e.suspense && Q(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Ds); )
    (e.state || t) && r.push(e);
  for (let s = r.length - 1; s >= 0; s--)
    if (e = r[s], e.state === Me || t)
      Pt(e);
    else if (e.state === kr || t) {
      const o = te;
      te = null, et(() => Sr(e, r[0]), !1), te = o;
    }
}
function et(e, t) {
  if (te)
    return e();
  let r = !1;
  t || (te = []), he ? r = !0 : he = [], Ds++;
  try {
    const s = e();
    return zi(r), s;
  } catch (s) {
    r || (he = null), te = null, mn(s);
  }
}
function zi(e) {
  if (te && (hn(te), te = null), e)
    return;
  const t = he;
  he = null, t.length && et(() => on(t), !1);
}
function hn(e) {
  for (let t = 0; t < e.length; t++)
    $r(e[t]);
}
function Pi(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? e[r++] = s : $r(s);
  }
  for (K.context && jt(), t = 0; t < r; t++)
    $r(e[t]);
}
function Sr(e, t) {
  const r = Oe;
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const o = e.sources[s];
    o.sources && (o.state === Me || r ? o !== t && $r(o) : (o.state === kr || r) && Sr(o, t));
  }
}
function pn(e) {
  const t = Oe;
  for (let r = 0; r < e.observers.length; r += 1) {
    const s = e.observers[r];
    (!s.state || t) && (s.state = kr, s.pure ? te.push(s) : he.push(s), s.observers && pn(s));
  }
}
function Jr(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), s = e.sourceSlots.pop(), o = r.observers;
      if (o && o.length) {
        const n = o.pop(), i = r.observerSlots.pop();
        s < o.length && (n.sourceSlots[i] = s, o[s] = n, r.observerSlots[s] = i);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Jr(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function fn(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function io(e, t) {
  for (const r of e)
    r(t);
}
function mn(e) {
  e = fn(e);
  const t = qe && dr(B, qe);
  if (!t)
    throw e;
  he ? he.push({
    fn() {
      io(t, e);
    },
    state: Me
  }) : io(t, e);
}
function dr(e, t) {
  return e ? e.context && e.context[t] !== void 0 ? e.context[t] : dr(e.owner, t) : void 0;
}
function ys(e) {
  if (typeof e == "function" && !e.length)
    return ys(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let r = 0; r < e.length; r++) {
      const s = ys(e[r]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function Li(e, t) {
  return function(s) {
    let o;
    return ze(() => o = Q(() => (B.context = {
      [e]: s.value
    }, Ei(() => s.children))), void 0), o;
  };
}
const Ni = Symbol("fallback");
function lo(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function Ii(e, t, r = {}) {
  let s = [], o = [], n = [], i = 0, l = t.length > 1 ? [] : null;
  return ln(() => lo(n)), () => {
    let a = e() || [], c, u;
    return a[vs], Q(() => {
      let p = a.length, g, m, _, w, $, v, k, I, j;
      if (p === 0)
        i !== 0 && (lo(n), n = [], s = [], o = [], i = 0, l && (l = [])), r.fallback && (s = [Ni], o[0] = Vt((de) => (n[0] = de, r.fallback())), i = 1);
      else if (i === 0) {
        for (o = new Array(p), u = 0; u < p; u++)
          s[u] = a[u], o[u] = Vt(h);
        i = p;
      } else {
        for (_ = new Array(p), w = new Array(p), l && ($ = new Array(p)), v = 0, k = Math.min(i, p); v < k && s[v] === a[v]; v++)
          ;
        for (k = i - 1, I = p - 1; k >= v && I >= v && s[k] === a[I]; k--, I--)
          _[I] = o[k], w[I] = n[k], l && ($[I] = l[k]);
        for (g = /* @__PURE__ */ new Map(), m = new Array(I + 1), u = I; u >= v; u--)
          j = a[u], c = g.get(j), m[u] = c === void 0 ? -1 : c, g.set(j, u);
        for (c = v; c <= k; c++)
          j = s[c], u = g.get(j), u !== void 0 && u !== -1 ? (_[u] = o[c], w[u] = n[c], l && ($[u] = l[c]), u = m[u], g.set(j, u)) : n[c]();
        for (u = v; u < p; u++)
          u in _ ? (o[u] = _[u], n[u] = w[u], l && (l[u] = $[u], l[u](u))) : o[u] = Vt(h);
        o = o.slice(0, i = p), s = a.slice(0);
      }
      return o;
    });
    function h(p) {
      if (n[u] = p, l) {
        const [g, m] = Y(u);
        return l[u] = m, t(a[u], g);
      }
      return t(a[u]);
    }
  };
}
function C(e, t) {
  return Q(() => e(t || {}));
}
function gr() {
  return !0;
}
const _s = {
  get(e, t, r) {
    return t === Ee ? r : e.get(t);
  },
  has(e, t) {
    return t === Ee ? !0 : e.has(t);
  },
  set: gr,
  deleteProperty: gr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: gr,
      deleteProperty: gr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function is(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function gn(...e) {
  let t = !1;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    t = t || !!o && Ee in o, e[s] = typeof o == "function" ? (t = !0, ne(o)) : o;
  }
  if (t)
    return new Proxy({
      get(s) {
        for (let o = e.length - 1; o >= 0; o--) {
          const n = is(e[o])[s];
          if (n !== void 0)
            return n;
        }
      },
      has(s) {
        for (let o = e.length - 1; o >= 0; o--)
          if (s in is(e[o]))
            return !0;
        return !1;
      },
      keys() {
        const s = [];
        for (let o = 0; o < e.length; o++)
          s.push(...Object.keys(is(e[o])));
        return [...new Set(s)];
      }
    }, _s);
  const r = {};
  for (let s = e.length - 1; s >= 0; s--)
    if (e[s]) {
      const o = Object.getOwnPropertyDescriptors(e[s]);
      for (const n in o)
        n in r || Object.defineProperty(r, n, {
          enumerable: !0,
          get() {
            for (let i = e.length - 1; i >= 0; i--) {
              const l = (e[i] || {})[n];
              if (l !== void 0)
                return l;
            }
          }
        });
    }
  return r;
}
function bn(e, ...t) {
  const r = new Set(t.flat());
  if (Ee in e) {
    const o = t.map((n) => new Proxy({
      get(i) {
        return n.includes(i) ? e[i] : void 0;
      },
      has(i) {
        return n.includes(i) && i in e;
      },
      keys() {
        return n.filter((i) => i in e);
      }
    }, _s));
    return o.push(new Proxy({
      get(n) {
        return r.has(n) ? void 0 : e[n];
      },
      has(n) {
        return r.has(n) ? !1 : n in e;
      },
      keys() {
        return Object.keys(e).filter((n) => !r.has(n));
      }
    }, _s)), o;
  }
  const s = Object.getOwnPropertyDescriptors(e);
  return t.push(Object.keys(s).filter((o) => !r.has(o))), t.map((o) => {
    const n = {};
    for (let i = 0; i < o.length; i++) {
      const l = o[i];
      l in e && Object.defineProperty(n, l, s[l] ? s[l] : {
        get() {
          return e[l];
        },
        set() {
          return !0;
        },
        enumerable: !0
      });
    }
    return n;
  });
}
function Ri(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return ne(Ii(() => e.each, e.children, t || void 0));
}
function Ve(e) {
  let t = !1;
  const r = e.keyed, s = ne(() => e.when, void 0, {
    equals: (o, n) => t ? o === n : !o == !n
  });
  return ne(() => {
    const o = s();
    if (o) {
      const n = e.children, i = typeof n == "function" && n.length > 0;
      return t = r || i, i ? Q(() => n(o)) : n;
    }
    return e.fallback;
  }, void 0, void 0);
}
const Di = Gr();
function js(e) {
  let t = 0, r, s, o, n, i;
  const [l, a] = Y(!1), c = Ti(), u = {
    increment: () => {
      ++t === 1 && a(!0);
    },
    decrement: () => {
      --t === 0 && a(!1);
    },
    inFallback: l,
    effects: [],
    resolved: !1
  }, h = X();
  if (K.context && K.load) {
    const m = K.context.id + K.context.count;
    let _ = K.load(m);
    if (_ && (o = _[0]) && o !== "$$f") {
      (typeof o != "object" || !("then" in o)) && (o = Promise.resolve(o));
      const [w, $] = Y(void 0, {
        equals: !1
      });
      n = w, o.then((v) => {
        if (v || K.done)
          return v && (i = v), $();
        K.gather(m), jt(s), $(), jt();
      });
    }
  }
  const p = Ms(Di);
  p && (r = p.register(u.inFallback));
  let g;
  return ln(() => g && g()), C(c.Provider, {
    value: u,
    get children() {
      return ne(() => {
        if (i)
          throw i;
        if (s = K.context, n)
          return n(), n = void 0;
        s && o === "$$f" && jt();
        const m = ne(() => e.children);
        return ne((_) => {
          const w = u.inFallback(), {
            showContent: $ = !0,
            showFallback: v = !0
          } = r ? r() : {};
          if ((!w || o && o !== "$$f") && $)
            return u.resolved = !0, g && g(), g = s = o = void 0, Ai(u.effects), m();
          if (!!v)
            return g ? _ : Vt((k) => (g = k, s && (jt({
              id: s.id + "f",
              count: 0
            }), s = void 0), e.fallback), h);
        });
      });
    }
  });
}
const Mi = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], ji = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Mi]), Bi = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), Vi = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), ao = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly"
}), Ui = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), Zi = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function Fi(e, t, r) {
  let s = r.length, o = t.length, n = s, i = 0, l = 0, a = t[o - 1].nextSibling, c = null;
  for (; i < o || l < n; ) {
    if (t[i] === r[l]) {
      i++, l++;
      continue;
    }
    for (; t[o - 1] === r[n - 1]; )
      o--, n--;
    if (o === i) {
      const u = n < s ? l ? r[l - 1].nextSibling : r[n - l] : a;
      for (; l < n; )
        e.insertBefore(r[l++], u);
    } else if (n === l)
      for (; i < o; )
        (!c || !c.has(t[i])) && t[i].remove(), i++;
    else if (t[i] === r[n - 1] && r[l] === t[o - 1]) {
      const u = t[--o].nextSibling;
      e.insertBefore(r[l++], t[i++].nextSibling), e.insertBefore(r[--n], u), t[o] = r[n];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let h = l;
        for (; h < n; )
          c.set(r[h], h++);
      }
      const u = c.get(t[i]);
      if (u != null)
        if (l < u && u < n) {
          let h = i, p = 1, g;
          for (; ++h < o && h < n && !((g = c.get(t[h])) == null || g !== u + p); )
            p++;
          if (p > u - l) {
            const m = t[i];
            for (; l < u; )
              e.insertBefore(r[l++], m);
          } else
            e.replaceChild(r[l++], t[i++]);
        } else
          i++;
      else
        t[i++].remove();
    }
  }
}
const co = "_$DX_DELEGATE";
function J(e, t, r) {
  const s = document.createElement("template");
  s.innerHTML = e;
  let o = s.content.firstChild;
  return r && (o = o.firstChild), o;
}
function Hi(e, t = window.document) {
  const r = t[co] || (t[co] = /* @__PURE__ */ new Set());
  for (let s = 0, o = e.length; s < o; s++) {
    const n = e[s];
    r.has(n) || (r.add(n), t.addEventListener(n, el));
  }
}
function oe(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function qi(e, t, r, s) {
  s == null ? e.removeAttributeNS(t, r) : e.setAttributeNS(t, r, s);
}
function Wi(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function Ki(e, t, r, s) {
  if (s)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const o = r[0];
    e.addEventListener(t, r[0] = (n) => o.call(e, r[1], n));
  } else
    e.addEventListener(t, r);
}
function Gi(e, t, r = {}) {
  const s = Object.keys(t || {}), o = Object.keys(r);
  let n, i;
  for (n = 0, i = o.length; n < i; n++) {
    const l = o[n];
    !l || l === "undefined" || t[l] || (uo(e, l, !1), delete r[l]);
  }
  for (n = 0, i = s.length; n < i; n++) {
    const l = s[n], a = !!t[l];
    !l || l === "undefined" || r[l] === a || !a || (uo(e, l, !0), r[l] = a);
  }
  return r;
}
function Yi(e, t, r) {
  if (!t)
    return r ? oe(e, "style") : t;
  const s = e.style;
  if (typeof t == "string")
    return s.cssText = t;
  typeof r == "string" && (s.cssText = r = void 0), r || (r = {}), t || (t = {});
  let o, n;
  for (n in r)
    t[n] == null && s.removeProperty(n), delete r[n];
  for (n in t)
    o = t[n], o !== r[n] && (s.setProperty(n, o), r[n] = o);
  return r;
}
function vn(e, t = {}, r, s) {
  const o = {};
  return s || ze(() => o.children = $t(e, t.children, o.children)), ze(() => t.ref && t.ref(e)), ze(() => Xi(e, t, r, !0, o, !0)), o;
}
function Ji(e, t, r) {
  return Q(() => e(t, r));
}
function z(e, t, r, s) {
  if (r !== void 0 && !s && (s = []), typeof t != "function")
    return $t(e, t, s, r);
  ze((o) => $t(e, t(), o, r), s);
}
function Xi(e, t, r, s, o = {}, n = !1) {
  t || (t = {});
  for (const i in o)
    if (!(i in t)) {
      if (i === "children")
        continue;
      o[i] = ho(e, i, null, o[i], r, n);
    }
  for (const i in t) {
    if (i === "children") {
      s || $t(e, t.children);
      continue;
    }
    const l = t[i];
    o[i] = ho(e, i, l, o[i], r, n);
  }
}
function Qi(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function uo(e, t, r) {
  const s = t.trim().split(/\s+/);
  for (let o = 0, n = s.length; o < n; o++)
    e.classList.toggle(s[o], r);
}
function ho(e, t, r, s, o, n) {
  let i, l, a;
  if (t === "style")
    return Yi(e, r, s);
  if (t === "classList")
    return Gi(e, r, s);
  if (r === s)
    return s;
  if (t === "ref")
    n || r(e);
  else if (t.slice(0, 3) === "on:") {
    const c = t.slice(3);
    s && e.removeEventListener(c, s), r && e.addEventListener(c, r);
  } else if (t.slice(0, 10) === "oncapture:") {
    const c = t.slice(10);
    s && e.removeEventListener(c, s, !0), r && e.addEventListener(c, r, !0);
  } else if (t.slice(0, 2) === "on") {
    const c = t.slice(2).toLowerCase(), u = Ui.has(c);
    if (!u && s) {
      const h = Array.isArray(s) ? s[0] : s;
      e.removeEventListener(c, h);
    }
    (u || r) && (Ki(e, c, r, u), u && Hi([c]));
  } else if ((a = Bi.has(t)) || !o && (ao[t] || (l = ji.has(t))) || (i = e.nodeName.includes("-")))
    t === "class" || t === "className" ? Wi(e, r) : i && !l && !a ? e[Qi(t)] = r : e[ao[t] || t] = r;
  else {
    const c = o && t.indexOf(":") > -1 && Zi[t.split(":")[0]];
    c ? qi(e, c, t, r) : oe(e, Vi[t] || t, r);
  }
  return r;
}
function el(e) {
  const t = `$$${e.type}`;
  let r = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== r && Object.defineProperty(e, "target", {
    configurable: !0,
    value: r
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return r || document;
    }
  }), K.registry && !K.done && (K.done = !0, document.querySelectorAll("[id^=pl-]").forEach((s) => {
    for (; s && s.nodeType !== 8 && s.nodeValue !== "pl-" + e; ) {
      let o = s.nextSibling;
      s.remove(), s = o;
    }
    s && s.remove();
  })); r; ) {
    const s = r[t];
    if (s && !r.disabled) {
      const o = r[`${t}Data`];
      if (o !== void 0 ? s.call(r, o, e) : s.call(r, e), e.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function $t(e, t, r, s, o) {
  for (K.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const n = typeof t, i = s !== void 0;
  if (e = i && r[0] && r[0].parentNode || e, n === "string" || n === "number") {
    if (K.context)
      return r;
    if (n === "number" && (t = t.toString()), i) {
      let l = r[0];
      l && l.nodeType === 3 ? l.data = t : l = document.createTextNode(t), r = gt(e, r, s, l);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || n === "boolean") {
    if (K.context)
      return r;
    r = gt(e, r, s);
  } else {
    if (n === "function")
      return ze(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        r = $t(e, l, r, s);
      }), () => r;
    if (Array.isArray(t)) {
      const l = [], a = r && Array.isArray(r);
      if (ws(l, t, r, o))
        return ze(() => r = $t(e, l, r, s, !0)), () => r;
      if (K.context) {
        if (!l.length)
          return r;
        for (let c = 0; c < l.length; c++)
          if (l[c].parentNode)
            return r = l;
      }
      if (l.length === 0) {
        if (r = gt(e, r, s), i)
          return r;
      } else
        a ? r.length === 0 ? po(e, l, s) : Fi(e, r, l) : (r && gt(e), po(e, l));
      r = l;
    } else if (t instanceof Node) {
      if (K.context && t.parentNode)
        return r = i ? [t] : t;
      if (Array.isArray(r)) {
        if (i)
          return r = gt(e, r, s, t);
        gt(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function ws(e, t, r, s) {
  let o = !1;
  for (let n = 0, i = t.length; n < i; n++) {
    let l = t[n], a = r && r[n];
    if (l instanceof Node)
      e.push(l);
    else if (!(l == null || l === !0 || l === !1))
      if (Array.isArray(l))
        o = ws(e, l, a) || o;
      else if (typeof l == "function")
        if (s) {
          for (; typeof l == "function"; )
            l = l();
          o = ws(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || o;
        } else
          e.push(l), o = !0;
      else {
        const c = String(l);
        a && a.nodeType === 3 && a.data === c ? e.push(a) : e.push(document.createTextNode(c));
      }
  }
  return o;
}
function po(e, t, r = null) {
  for (let s = 0, o = t.length; s < o; s++)
    e.insertBefore(t[s], r);
}
function gt(e, t, r, s) {
  if (r === void 0)
    return e.textContent = "";
  const o = s || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const l = t[i];
      if (o !== l) {
        const a = l.parentNode === e;
        !n && !i ? a ? e.replaceChild(o, l) : e.insertBefore(o, r) : a && l.remove();
      } else
        n = !0;
    }
  } else
    e.insertBefore(o, r);
  return [o];
}
function tl(e) {
  const t = Object.keys(e), r = {};
  for (let s = 0; s < t.length; s++) {
    const [o, n] = Y(e[t[s]]);
    Object.defineProperty(r, t[s], {
      get: o,
      set(i) {
        n(() => i);
      }
    });
  }
  return r;
}
function rl(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function sl(e) {
  return (t, r) => {
    const { element: s } = r;
    return Vt((o) => {
      const n = tl(t);
      s.addPropertyChangedCallback((l, a) => n[l] = a), s.addReleaseCallback(() => {
        s.renderRoot.textContent = "", o();
      });
      const i = e(n, r);
      return z(s.renderRoot, i);
    }, rl(s));
  };
}
function yn(e, t, r) {
  return arguments.length === 2 && (r = t, t = {}), ki(e, t)(sl(r));
}
const xs = Symbol("store-raw"), qt = Symbol("store-node"), ol = Symbol("store-name");
function _n(e, t) {
  let r = e[Ee];
  if (!r && (Object.defineProperty(e, Ee, {
    value: r = new Proxy(e, ll)
  }), !Array.isArray(e))) {
    const s = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
    for (let n = 0, i = s.length; n < i; n++) {
      const l = s[n];
      o[l].get && Object.defineProperty(e, l, {
        enumerable: o[l].enumerable,
        get: o[l].get.bind(r)
      });
    }
  }
  return r;
}
function Cr(e) {
  let t;
  return e != null && typeof e == "object" && (e[Ee] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function Wt(e, t = /* @__PURE__ */ new Set()) {
  let r, s, o, n;
  if (r = e != null && e[xs])
    return r;
  if (!Cr(e) || t.has(e))
    return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let i = 0, l = e.length; i < l; i++)
      o = e[i], (s = Wt(o, t)) !== o && (e[i] = s);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const i = Object.keys(e), l = Object.getOwnPropertyDescriptors(e);
    for (let a = 0, c = i.length; a < c; a++)
      n = i[a], !l[n].get && (o = e[n], (s = Wt(o, t)) !== o && (e[n] = s));
  }
  return e;
}
function Bs(e) {
  let t = e[qt];
  return t || Object.defineProperty(e, qt, {
    value: t = {}
  }), t;
}
function ks(e, t, r) {
  return e[t] || (e[t] = xn(r));
}
function nl(e, t) {
  const r = Reflect.getOwnPropertyDescriptor(e, t);
  return !r || r.get || !r.configurable || t === Ee || t === qt || t === ol || (delete r.value, delete r.writable, r.get = () => e[Ee][t]), r;
}
function wn(e) {
  if (cn()) {
    const t = Bs(e);
    (t._ || (t._ = xn()))();
  }
}
function il(e) {
  return wn(e), Reflect.ownKeys(e);
}
function xn(e) {
  const [t, r] = Y(e, {
    equals: !1,
    internal: !0
  });
  return t.$ = r, t;
}
const ll = {
  get(e, t, r) {
    if (t === xs)
      return e;
    if (t === Ee)
      return r;
    if (t === vs)
      return wn(e), r;
    const s = Bs(e), o = s.hasOwnProperty(t);
    let n = o ? s[t]() : e[t];
    if (t === qt || t === "__proto__")
      return n;
    if (!o) {
      const i = Object.getOwnPropertyDescriptor(e, t);
      cn() && (typeof n != "function" || e.hasOwnProperty(t)) && !(i && i.get) && (n = ks(s, t, n)());
    }
    return Cr(n) ? _n(n) : n;
  },
  has(e, t) {
    return t === xs || t === Ee || t === vs || t === qt || t === "__proto__" ? !0 : (this.get(e, t, e), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: il,
  getOwnPropertyDescriptor: nl
};
function Ar(e, t, r, s = !1) {
  if (!s && e[t] === r)
    return;
  const o = e[t], n = e.length;
  r === void 0 ? delete e[t] : e[t] = r;
  let i = Bs(e), l;
  (l = ks(i, t, o)) && l.$(() => r), Array.isArray(e) && e.length !== n && (l = ks(i, "length", n)) && l.$(e.length), (l = i._) && l.$();
}
function kn(e, t) {
  const r = Object.keys(t);
  for (let s = 0; s < r.length; s += 1) {
    const o = r[s];
    Ar(e, o, t[o]);
  }
}
function al(e, t) {
  if (typeof t == "function" && (t = t(e)), t = Wt(t), Array.isArray(t)) {
    if (e === t)
      return;
    let r = 0, s = t.length;
    for (; r < s; r++) {
      const o = t[r];
      e[r] !== o && Ar(e, r, o);
    }
    Ar(e, "length", s);
  } else
    kn(e, t);
}
function Bt(e, t, r = []) {
  let s, o = e;
  if (t.length > 1) {
    s = t.shift();
    const i = typeof s, l = Array.isArray(e);
    if (Array.isArray(s)) {
      for (let a = 0; a < s.length; a++)
        Bt(e, [s[a]].concat(t), r);
      return;
    } else if (l && i === "function") {
      for (let a = 0; a < e.length; a++)
        s(e[a], a) && Bt(e, [a].concat(t), r);
      return;
    } else if (l && i === "object") {
      const {
        from: a = 0,
        to: c = e.length - 1,
        by: u = 1
      } = s;
      for (let h = a; h <= c; h += u)
        Bt(e, [h].concat(t), r);
      return;
    } else if (t.length > 1) {
      Bt(e[s], t, [s].concat(r));
      return;
    }
    o = e[s], r = [s].concat(r);
  }
  let n = t[0];
  typeof n == "function" && (n = n(o, r), n === o) || s === void 0 && n == null || (n = Wt(n), s === void 0 || Cr(o) && Cr(n) && !Array.isArray(n) ? kn(o, n) : Ar(e, s, n));
}
function mt(...[e, t]) {
  const r = Wt(e || {}), s = Array.isArray(r), o = _n(r);
  function n(...i) {
    Si(() => {
      s && i.length === 1 ? al(r, i[0]) : Bt(r, i);
    });
  }
  return [o, n];
}
var $s = (e, t, r) => {
  const s = t.trim().split(".").reduce((o, n) => o ? o[n] : void 0, e);
  return s !== void 0 ? s : r;
}, cl = (e, t, r = /{{(.*?)}}/g) => e.replace(r, (s, o) => $s(t, o, "")), ul = (e = {}, t = navigator.language in e ? navigator.language : Object.keys(e)[0]) => {
  const [r, s] = Y(t), [o, n] = mt(e);
  return [(a, c, u) => {
    const h = $s(o[r()], a, u || "");
    return typeof h == "function" ? h(c) : typeof h == "string" ? cl(h, c || {}) : h;
  }, {
    add(a, c) {
      n(a, (u) => Object.assign(u || {}, c));
    },
    locale: (a) => a ? s(a) : r(),
    dict: (a) => $s(o, a)
  }];
}, $n = Gr({}), ot = () => Ms($n), Ss = "";
function fo(e) {
  Ss = e;
}
function dl() {
  if (!Ss) {
    const e = [...document.getElementsByTagName("script")], t = e.find((r) => r.hasAttribute("data-shoelace"));
    if (t)
      fo(t.getAttribute("data-shoelace"));
    else {
      const r = e.find((o) => /shoelace(\.min)?\.js($|\?)/.test(o.src));
      let s = "";
      r && (s = r.getAttribute("src")), fo(s.split("/").slice(0, -1).join("/"));
    }
  }
  return Ss.replace(/\/$/, "");
}
var hl = {
  name: "default",
  resolver: (e) => `${dl()}/assets/icons/${e}.svg`
}, pl = hl, mo = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
}, fl = {
  name: "system",
  resolver: (e) => e in mo ? `data:image/svg+xml,${encodeURIComponent(mo[e])}` : ""
}, ml = fl, Er = [pl, ml], Tr = [];
function gl(e) {
  Tr.push(e);
}
function bl(e) {
  Tr = Tr.filter((t) => t !== e);
}
function go(e) {
  return Er.find((t) => t.name === e);
}
function vl(e, t) {
  yl(e), Er.push({
    name: e,
    resolver: t.resolver,
    mutator: t.mutator
  }), Tr.forEach((r) => {
    r.library === e && r.setIcon();
  });
}
function yl(e) {
  Er = Er.filter((t) => t.name !== e);
}
var Sn = Object.defineProperty, _l = Object.defineProperties, wl = Object.getOwnPropertyDescriptor, xl = Object.getOwnPropertyDescriptors, Or = Object.getOwnPropertySymbols, Cn = Object.prototype.hasOwnProperty, An = Object.prototype.propertyIsEnumerable, bo = (e, t, r) => t in e ? Sn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, H = (e, t) => {
  for (var r in t || (t = {}))
    Cn.call(t, r) && bo(e, r, t[r]);
  if (Or)
    for (var r of Or(t))
      An.call(t, r) && bo(e, r, t[r]);
  return e;
}, pe = (e, t) => _l(e, xl(t)), Vs = (e, t) => {
  var r = {};
  for (var s in e)
    Cn.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
  if (e != null && Or)
    for (var s of Or(e))
      t.indexOf(s) < 0 && An.call(e, s) && (r[s] = e[s]);
  return r;
}, d = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? wl(t, r) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (o = (s ? i(t, r, o) : i(o)) || o);
  return s && o && Sn(t, r, o), o;
}, yr = window, Us = yr.ShadowRoot && (yr.ShadyCSS === void 0 || yr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zs = Symbol(), vo = /* @__PURE__ */ new WeakMap(), En = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Zs)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Us && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = vo.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && vo.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, kl = (e) => new En(typeof e == "string" ? e : e + "", void 0, Zs), le = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((s, o, n) => s + ((i) => {
    if (i._$cssResult$ === !0)
      return i.cssText;
    if (typeof i == "number")
      return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new En(r, e, Zs);
}, $l = (e, t) => {
  Us ? e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet) : t.forEach((r) => {
    const s = document.createElement("style"), o = yr.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = r.cssText, e.appendChild(s);
  });
}, yo = Us ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const s of t.cssRules)
    r += s.cssText;
  return kl(r);
})(e) : e, ls, zr = window, _o = zr.trustedTypes, Sl = _o ? _o.emptyScript : "", wo = zr.reactiveElementPolyfillSupport, Kt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Sl : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, Tn = (e, t) => t !== e && (t == t || e == e), as = { attribute: !0, type: String, converter: Kt, reflect: !1, hasChanged: Tn }, bt = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, r) => {
      const s = this._$Ep(r, t);
      s !== void 0 && (this._$Ev.set(s, r), e.push(s));
    }), e;
  }
  static createProperty(e, t = as) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const r = typeof e == "symbol" ? Symbol() : "__" + e, s = this.getPropertyDescriptor(e, r, t);
      s !== void 0 && Object.defineProperty(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    return { get() {
      return this[t];
    }, set(s) {
      const o = this[e];
      this[t] = s, this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || as;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, r = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of r)
        this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r)
        t.unshift(yo(s));
    } else
      e !== void 0 && t.push(yo(e));
    return t;
  }
  static _$Ep(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, r;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) === null || r === void 0 || r.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return $l(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) === null || r === void 0 ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) === null || r === void 0 ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$EO(e, t, r = as) {
    var s;
    const o = this.constructor._$Ep(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const n = (((s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? r.converter : Kt).toAttribute(t, r.type);
      this._$El = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(e, t) {
    var r;
    const s = this.constructor, o = s._$Ev.get(e);
    if (o !== void 0 && this._$El !== o) {
      const n = s.getPropertyOptions(o), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? n.converter : Kt;
      this._$El = o, this[o] = i.fromAttribute(t, n.type), this._$El = null;
    }
  }
  requestUpdate(e, t, r) {
    let s = !0;
    e !== void 0 && (((r = r || this.constructor.getPropertyOptions(e)).hasChanged || Tn)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), r.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(r)) : this._$Ek();
    } catch (s) {
      throw t = !1, this._$Ek(), s;
    }
    t && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
      var s;
      return (s = r.hostUpdated) === null || s === void 0 ? void 0 : s.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, r) => this._$EO(r, this[r], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
bt.finalized = !0, bt.elementProperties = /* @__PURE__ */ new Map(), bt.elementStyles = [], bt.shadowRootOptions = { mode: "open" }, wo == null || wo({ ReactiveElement: bt }), ((ls = zr.reactiveElementVersions) !== null && ls !== void 0 ? ls : zr.reactiveElementVersions = []).push("1.6.1");
var cs, Pr = window, St = Pr.trustedTypes, xo = St ? St.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ke = `lit$${(Math.random() + "").slice(9)}$`, On = "?" + Ke, Cl = `<${On}>`, Ct = document, Gt = (e = "") => Ct.createComment(e), Yt = (e) => e === null || typeof e != "object" && typeof e != "function", zn = Array.isArray, Al = (e) => zn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ko = /-->/g, $o = />/g, lt = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), So = /'/g, Co = /"/g, Pn = /^(?:script|style|textarea|title)$/i, El = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), V = El(1), xe = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), Ao = /* @__PURE__ */ new WeakMap(), _t = Ct.createTreeWalker(Ct, 129, null, !1), Tl = (e, t) => {
  const r = e.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : "", i = Rt;
  for (let a = 0; a < r; a++) {
    const c = e[a];
    let u, h, p = -1, g = 0;
    for (; g < c.length && (i.lastIndex = g, h = i.exec(c), h !== null); )
      g = i.lastIndex, i === Rt ? h[1] === "!--" ? i = ko : h[1] !== void 0 ? i = $o : h[2] !== void 0 ? (Pn.test(h[2]) && (o = RegExp("</" + h[2], "g")), i = lt) : h[3] !== void 0 && (i = lt) : i === lt ? h[0] === ">" ? (i = o != null ? o : Rt, p = -1) : h[1] === void 0 ? p = -2 : (p = i.lastIndex - h[2].length, u = h[1], i = h[3] === void 0 ? lt : h[3] === '"' ? Co : So) : i === Co || i === So ? i = lt : i === ko || i === $o ? i = Rt : (i = lt, o = void 0);
    const m = i === lt && e[a + 1].startsWith("/>") ? " " : "";
    n += i === Rt ? c + Cl : p >= 0 ? (s.push(u), c.slice(0, p) + "$lit$" + c.slice(p) + Ke + m) : c + Ke + (p === -2 ? (s.push(void 0), a) : m);
  }
  const l = n + (e[r] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [xo !== void 0 ? xo.createHTML(l) : l, s];
}, Lr = class {
  constructor({ strings: e, _$litType$: t }, r) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const i = e.length - 1, l = this.parts, [a, c] = Tl(e, t);
    if (this.el = Lr.createElement(a, r), _t.currentNode = this.el.content, t === 2) {
      const u = this.el.content, h = u.firstChild;
      h.remove(), u.append(...h.childNodes);
    }
    for (; (s = _t.nextNode()) !== null && l.length < i; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const u = [];
          for (const h of s.getAttributeNames())
            if (h.endsWith("$lit$") || h.startsWith(Ke)) {
              const p = c[n++];
              if (u.push(h), p !== void 0) {
                const g = s.getAttribute(p.toLowerCase() + "$lit$").split(Ke), m = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: o, name: m[2], strings: g, ctor: m[1] === "." ? zl : m[1] === "?" ? Ll : m[1] === "@" ? Nl : Qr });
              } else
                l.push({ type: 6, index: o });
            }
          for (const h of u)
            s.removeAttribute(h);
        }
        if (Pn.test(s.tagName)) {
          const u = s.textContent.split(Ke), h = u.length - 1;
          if (h > 0) {
            s.textContent = St ? St.emptyScript : "";
            for (let p = 0; p < h; p++)
              s.append(u[p], Gt()), _t.nextNode(), l.push({ type: 2, index: ++o });
            s.append(u[h], Gt());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === On)
          l.push({ type: 2, index: o });
        else {
          let u = -1;
          for (; (u = s.data.indexOf(Ke, u + 1)) !== -1; )
            l.push({ type: 7, index: o }), u += Ke.length - 1;
        }
      o++;
    }
  }
  static createElement(e, t) {
    const r = Ct.createElement("template");
    return r.innerHTML = e, r;
  }
};
function At(e, t, r = e, s) {
  var o, n, i, l;
  if (t === xe)
    return t;
  let a = s !== void 0 ? (o = r._$Co) === null || o === void 0 ? void 0 : o[s] : r._$Cl;
  const c = Yt(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== c && ((n = a == null ? void 0 : a._$AO) === null || n === void 0 || n.call(a, !1), c === void 0 ? a = void 0 : (a = new c(e), a._$AT(e, r, s)), s !== void 0 ? ((i = (l = r)._$Co) !== null && i !== void 0 ? i : l._$Co = [])[s] = a : r._$Cl = a), a !== void 0 && (t = At(e, a._$AS(e, t.values), a, s)), t;
}
var Ol = class {
  constructor(e, t) {
    this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(e) {
    var t;
    const { el: { content: r }, parts: s } = this._$AD, o = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : Ct).importNode(r, !0);
    _t.currentNode = o;
    let n = _t.nextNode(), i = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (i === a.index) {
        let c;
        a.type === 2 ? c = new Xr(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new Il(n, this, e)), this.u.push(c), a = s[++l];
      }
      i !== (a == null ? void 0 : a.index) && (n = _t.nextNode(), i++);
    }
    return o;
  }
  p(e) {
    let t = 0;
    for (const r of this.u)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}, Xr = class {
  constructor(e, t, r, s) {
    var o;
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = s, this._$Cm = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cm;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = At(this, e, t), Yt(e) ? e === G || e == null || e === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : e !== this._$AH && e !== xe && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Al(e) ? this.k(e) : this.g(e);
  }
  O(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  g(e) {
    this._$AH !== G && Yt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ct.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var t;
    const { values: r, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Lr.createElement(s.h, this.options)), s);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === o)
      this._$AH.p(r);
    else {
      const n = new Ol(o, this), i = n.v(this.options);
      n.p(r), this.T(i), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Ao.get(e.strings);
    return t === void 0 && Ao.set(e.strings, t = new Lr(e)), t;
  }
  k(e) {
    zn(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, s = 0;
    for (const o of e)
      s === t.length ? t.push(r = new Xr(this.O(Gt()), this.O(Gt()), this, this.options)) : r = t[s], r._$AI(o), s++;
    s < t.length && (this._$AR(r && r._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cm = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}, Qr = class {
  constructor(e, t, r, s, o) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = G;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, r, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      e = At(this, e, t, 0), n = !Yt(e) || e !== this._$AH && e !== xe, n && (this._$AH = e);
    else {
      const i = e;
      let l, a;
      for (e = o[0], l = 0; l < o.length - 1; l++)
        a = At(this, i[r + l], t, l), a === xe && (a = this._$AH[l]), n || (n = !Yt(a) || a !== this._$AH[l]), a === G ? e = G : e !== G && (e += (a != null ? a : "") + o[l + 1]), this._$AH[l] = a;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}, zl = class extends Qr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === G ? void 0 : e;
  }
}, Pl = St ? St.emptyScript : "", Ll = class extends Qr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== G ? this.element.setAttribute(this.name, Pl) : this.element.removeAttribute(this.name);
  }
}, Nl = class extends Qr {
  constructor(e, t, r, s, o) {
    super(e, t, r, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var r;
    if ((e = (r = At(this, e, t, 0)) !== null && r !== void 0 ? r : G) === xe)
      return;
    const s = this._$AH, o = e === G && s !== G || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== G && (s === G || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && r !== void 0 ? r : this.element, e) : this._$AH.handleEvent(e);
  }
}, Il = class {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    At(this, e);
  }
}, Eo = Pr.litHtmlPolyfillSupport;
Eo == null || Eo(Lr, Xr), ((cs = Pr.litHtmlVersions) !== null && cs !== void 0 ? cs : Pr.litHtmlVersions = []).push("2.6.1");
var Rl = (e, t, r) => {
  var s, o;
  const n = (s = r == null ? void 0 : r.renderBefore) !== null && s !== void 0 ? s : t;
  let i = n._$litPart$;
  if (i === void 0) {
    const l = (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0 ? o : null;
    n._$litPart$ = i = new Xr(t.insertBefore(Gt(), l), l, void 0, r != null ? r : {});
  }
  return i._$AI(e), i;
}, us, ds, Ut = class extends bt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var e, t;
    const r = super.createRenderRoot();
    return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = r.firstChild), r;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Dt = Rl(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Dt) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Dt) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return xe;
  }
};
Ut.finalized = !0, Ut._$litElement$ = !0, (us = globalThis.litElementHydrateSupport) === null || us === void 0 || us.call(globalThis, { LitElement: Ut });
var To = globalThis.litElementPolyfillSupport;
To == null || To({ LitElement: Ut });
((ds = globalThis.litElementVersions) !== null && ds !== void 0 ? ds : globalThis.litElementVersions = []).push("3.2.0");
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var be = le`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`, Dl = le`
  ${be}

  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;
function Ml(e, t) {
  return {
    top: Math.round(e.getBoundingClientRect().top - t.getBoundingClientRect().top),
    left: Math.round(e.getBoundingClientRect().left - t.getBoundingClientRect().left)
  };
}
function Cs(e, t, r = "vertical", s = "smooth") {
  const o = Ml(e, t), n = o.top + t.scrollTop, i = o.left + t.scrollLeft, l = t.scrollLeft, a = t.scrollLeft + t.offsetWidth, c = t.scrollTop, u = t.scrollTop + t.offsetHeight;
  (r === "horizontal" || r === "both") && (i < l ? t.scrollTo({ left: i, behavior: s }) : i + e.clientWidth > a && t.scrollTo({ left: i - t.offsetWidth + e.clientWidth, behavior: s })), (r === "vertical" || r === "both") && (n < c ? t.scrollTo({ top: n, behavior: s }) : n + e.clientHeight > u && t.scrollTo({ top: n - t.offsetHeight + e.clientHeight, behavior: s }));
}
var As = /* @__PURE__ */ new Set(), jl = new MutationObserver(In), yt = /* @__PURE__ */ new Map(), Ln = document.documentElement.dir || "ltr", Nn = document.documentElement.lang || navigator.language, Zt;
jl.observe(document.documentElement, {
  attributes: !0,
  attributeFilter: ["dir", "lang"]
});
function Bl(...e) {
  e.map((t) => {
    const r = t.$code.toLowerCase();
    yt.has(r) ? yt.set(r, Object.assign(Object.assign({}, yt.get(r)), t)) : yt.set(r, t), Zt || (Zt = t);
  }), In();
}
function In() {
  Ln = document.documentElement.dir || "ltr", Nn = document.documentElement.lang || navigator.language, [...As.keys()].map((e) => {
    typeof e.requestUpdate == "function" && e.requestUpdate();
  });
}
var Vl = class {
  constructor(e) {
    this.host = e, this.host.addController(this);
  }
  hostConnected() {
    As.add(this.host);
  }
  hostDisconnected() {
    As.delete(this.host);
  }
  dir() {
    return `${this.host.dir || Ln}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || Nn}`.toLowerCase();
  }
  term(e, ...t) {
    var r, s;
    const o = new Intl.Locale(this.lang()), n = o == null ? void 0 : o.language.toLowerCase(), i = (s = (r = o == null ? void 0 : o.region) === null || r === void 0 ? void 0 : r.toLowerCase()) !== null && s !== void 0 ? s : "", l = yt.get(`${n}-${i}`), a = yt.get(n);
    let c;
    if (l && l[e])
      c = l[e];
    else if (a && a[e])
      c = a[e];
    else if (Zt && Zt[e])
      c = Zt[e];
    else
      return console.error(`No translation found for: ${String(e)}`), String(e);
    return typeof c == "function" ? c(...t) : c;
  }
  date(e, t) {
    return e = new Date(e), new Intl.DateTimeFormat(this.lang(), t).format(e);
  }
  number(e, t) {
    return e = Number(e), isNaN(e) ? "" : new Intl.NumberFormat(this.lang(), t).format(e);
  }
  relativeTime(e, t, r) {
    return new Intl.RelativeTimeFormat(this.lang(), r).format(e, t);
  }
}, nt = class extends Vl {
}, Ul = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  clearEntry: "Clear entry",
  close: "Close",
  copy: "Copy",
  numOptionsSelected: (e) => e === 0 ? "No options selected" : e === 1 ? "1 option selected" : `${e} options selected`,
  currentValue: "Current value",
  hidePassword: "Hide password",
  loading: "Loading",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  toggleColorFormat: "Toggle color format"
};
Bl(Ul);
var We = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Fs = (e) => (...t) => ({ _$litDirective$: e, values: t }), Hs = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var fe = Fs(class extends Hs {
  constructor(e) {
    var t;
    if (super(e), e.type !== We.ATTRIBUTE || e.name !== "class" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    var r, s;
    if (this.nt === void 0) {
      this.nt = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.st = new Set(e.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t)
        t[n] && !(!((r = this.st) === null || r === void 0) && r.has(n)) && this.nt.add(n);
      return this.render(t);
    }
    const o = e.element.classList;
    this.nt.forEach((n) => {
      n in t || (o.remove(n), this.nt.delete(n));
    });
    for (const n in t) {
      const i = !!t[n];
      i === this.nt.has(n) || ((s = this.st) === null || s === void 0 ? void 0 : s.has(n)) || (i ? (o.add(n), this.nt.add(n)) : (o.remove(n), this.nt.delete(n)));
    }
    return xe;
  }
});
/*! Bundled license information:

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
function ee(e, t) {
  const r = H({
    waitUntilFirstUpdate: !1
  }, t);
  return (s, o) => {
    const { update: n } = s, i = Array.isArray(e) ? e : [e];
    s.update = function(l) {
      i.forEach((a) => {
        const c = a;
        if (l.has(c)) {
          const u = l.get(c), h = this[c];
          u !== h && (!r.waitUntilFirstUpdate || this.hasUpdated) && this[o](u, h);
        }
      }), n.call(this, l);
    };
  };
}
var ve = (e) => (t) => typeof t == "function" ? ((r, s) => (customElements.define(r, s), s))(e, t) : ((r, s) => {
  const { kind: o, elements: n } = s;
  return { kind: o, elements: n, finisher(i) {
    customElements.define(r, i);
  } };
})(e, t), Zl = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? pe(H({}, t), { finisher(r) {
  r.createProperty(t.key, e);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(r) {
  r.createProperty(t.key, e);
} };
function f(e) {
  return (t, r) => r !== void 0 ? ((s, o, n) => {
    o.constructor.createProperty(n, s);
  })(e, t, r) : Zl(e, t);
}
function ue(e) {
  return f(pe(H({}, e), { state: !0 }));
}
var Fl = ({ finisher: e, descriptor: t }) => (r, s) => {
  var o;
  if (s === void 0) {
    const n = (o = r.originalKey) !== null && o !== void 0 ? o : r.key, i = t != null ? { kind: "method", placement: "prototype", key: n, descriptor: t(r.key) } : pe(H({}, r), { key: n });
    return e != null && (i.finisher = function(l) {
      e(l, n);
    }), i;
  }
  {
    const n = r.constructor;
    t !== void 0 && Object.defineProperty(r, s, t(s)), e == null || e(n, s);
  }
};
function se(e, t) {
  return Fl({ descriptor: (r) => {
    const s = { get() {
      var o, n;
      return (n = (o = this.renderRoot) === null || o === void 0 ? void 0 : o.querySelector(e)) !== null && n !== void 0 ? n : null;
    }, enumerable: !0, configurable: !0 };
    if (t) {
      const o = typeof r == "symbol" ? Symbol() : "__" + r;
      s.get = function() {
        var n, i;
        return this[o] === void 0 && (this[o] = (i = (n = this.renderRoot) === null || n === void 0 ? void 0 : n.querySelector(e)) !== null && i !== void 0 ? i : null), this[o];
      };
    }
    return s;
  } });
}
var hs;
((hs = window.HTMLSlotElement) === null || hs === void 0 ? void 0 : hs.prototype.assignedElements) != null;
var ae = class extends Ut {
  emit(e, t) {
    const r = new CustomEvent(e, H({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, t));
    return this.dispatchEvent(r), r;
  }
};
d([
  f()
], ae.prototype, "dir", 2);
d([
  f()
], ae.prototype, "lang", 2);
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var me = class extends ae {
  constructor() {
    super(...arguments), this.localize = new nt(this), this.tabs = [], this.panels = [], this.hasScrollControls = !1, this.placement = "top", this.activation = "auto", this.noScrollControls = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver = new ResizeObserver(() => {
      this.repositionIndicator(), this.updateScrollControls();
    }), this.mutationObserver = new MutationObserver((e) => {
      e.some((t) => !["aria-labelledby", "aria-controls"].includes(t.attributeName)) && setTimeout(() => this.setAriaLabels()), e.some((t) => t.attributeName === "disabled") && this.syncTabsAndPanels();
    }), this.updateComplete.then(() => {
      this.syncTabsAndPanels(), this.mutationObserver.observe(this, { attributes: !0, childList: !0, subtree: !0 }), this.resizeObserver.observe(this.nav), new IntersectionObserver((t, r) => {
        var s;
        t[0].intersectionRatio > 0 && (this.setAriaLabels(), this.setActiveTab((s = this.getActiveTab()) != null ? s : this.tabs[0], { emitEvents: !1 }), r.unobserve(t[0].target));
      }).observe(this.tabGroup);
    });
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect(), this.resizeObserver.unobserve(this.nav);
  }
  getAllTabs(e = { includeDisabled: !0 }) {
    return [...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter((r) => e.includeDisabled ? r.tagName.toLowerCase() === "sl-tab" : r.tagName.toLowerCase() === "sl-tab" && !r.disabled);
  }
  getAllPanels() {
    return [...this.body.assignedElements()].filter((e) => e.tagName.toLowerCase() === "sl-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((e) => e.active);
  }
  handleClick(e) {
    const r = e.target.closest("sl-tab");
    (r == null ? void 0 : r.closest("sl-tab-group")) === this && r !== null && this.setActiveTab(r, { scrollBehavior: "smooth" });
  }
  handleKeyDown(e) {
    const r = e.target.closest("sl-tab");
    if ((r == null ? void 0 : r.closest("sl-tab-group")) === this && (["Enter", " "].includes(e.key) && r !== null && (this.setActiveTab(r, { scrollBehavior: "smooth" }), e.preventDefault()), ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key))) {
      const o = this.tabs.find((i) => i.matches(":focus")), n = this.localize.dir() === "rtl";
      if ((o == null ? void 0 : o.tagName.toLowerCase()) === "sl-tab") {
        let i = this.tabs.indexOf(o);
        e.key === "Home" ? i = 0 : e.key === "End" ? i = this.tabs.length - 1 : ["top", "bottom"].includes(this.placement) && e.key === (n ? "ArrowRight" : "ArrowLeft") || ["start", "end"].includes(this.placement) && e.key === "ArrowUp" ? i-- : (["top", "bottom"].includes(this.placement) && e.key === (n ? "ArrowLeft" : "ArrowRight") || ["start", "end"].includes(this.placement) && e.key === "ArrowDown") && i++, i < 0 && (i = this.tabs.length - 1), i > this.tabs.length - 1 && (i = 0), this.tabs[i].focus({ preventScroll: !0 }), this.activation === "auto" && this.setActiveTab(this.tabs[i], { scrollBehavior: "smooth" }), ["top", "bottom"].includes(this.placement) && Cs(this.tabs[i], this.nav, "horizontal"), e.preventDefault();
      }
    }
  }
  handleScrollToStart() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft + this.nav.clientWidth : this.nav.scrollLeft - this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  handleScrollToEnd() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft - this.nav.clientWidth : this.nav.scrollLeft + this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  setActiveTab(e, t) {
    if (t = H({
      emitEvents: !0,
      scrollBehavior: "auto"
    }, t), e !== this.activeTab && !e.disabled) {
      const r = this.activeTab;
      this.activeTab = e, this.tabs.map((s) => s.active = s === this.activeTab), this.panels.map((s) => {
        var o;
        return s.active = s.name === ((o = this.activeTab) == null ? void 0 : o.panel);
      }), this.syncIndicator(), ["top", "bottom"].includes(this.placement) && Cs(this.activeTab, this.nav, "horizontal", t.scrollBehavior), t.emitEvents && (r && this.emit("sl-tab-hide", { detail: { name: r.panel } }), this.emit("sl-tab-show", { detail: { name: this.activeTab.panel } }));
    }
  }
  setAriaLabels() {
    this.tabs.forEach((e) => {
      const t = this.panels.find((r) => r.name === e.panel);
      t && (e.setAttribute("aria-controls", t.getAttribute("id")), t.setAttribute("aria-labelledby", e.getAttribute("id")));
    });
  }
  repositionIndicator() {
    const e = this.getActiveTab();
    if (!e)
      return;
    const t = e.clientWidth, r = e.clientHeight, s = this.localize.dir() === "rtl", o = this.getAllTabs(), i = o.slice(0, o.indexOf(e)).reduce(
      (l, a) => ({
        left: l.left + a.clientWidth,
        top: l.top + a.clientHeight
      }),
      { left: 0, top: 0 }
    );
    switch (this.placement) {
      case "top":
      case "bottom":
        this.indicator.style.width = `${t}px`, this.indicator.style.height = "auto", this.indicator.style.translate = s ? `${-1 * i.left}px` : `${i.left}px`;
        break;
      case "start":
      case "end":
        this.indicator.style.width = "auto", this.indicator.style.height = `${r}px`, this.indicator.style.translate = `0 ${i.top}px`;
        break;
    }
  }
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs({ includeDisabled: !1 }), this.panels = this.getAllPanels(), this.syncIndicator();
  }
  updateScrollControls() {
    this.noScrollControls ? this.hasScrollControls = !1 : this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
  }
  syncIndicator() {
    this.getActiveTab() ? (this.indicator.style.display = "block", this.repositionIndicator()) : this.indicator.style.display = "none";
  }
  show(e) {
    const t = this.tabs.find((r) => r.panel === e);
    t && this.setActiveTab(t, { scrollBehavior: "smooth" });
  }
  render() {
    const e = this.localize.dir() === "rtl";
    return V`
      <div
        part="base"
        class=${fe({
      "tab-group": !0,
      "tab-group--top": this.placement === "top",
      "tab-group--bottom": this.placement === "bottom",
      "tab-group--start": this.placement === "start",
      "tab-group--end": this.placement === "end",
      "tab-group--rtl": this.localize.dir() === "rtl",
      "tab-group--has-scroll-controls": this.hasScrollControls
    })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls ? V`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${e ? "chevron-right" : "chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              ` : ""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls ? V`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${e ? "chevron-left" : "chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              ` : ""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `;
  }
};
me.styles = Dl;
d([
  se(".tab-group")
], me.prototype, "tabGroup", 2);
d([
  se(".tab-group__body")
], me.prototype, "body", 2);
d([
  se(".tab-group__nav")
], me.prototype, "nav", 2);
d([
  se(".tab-group__indicator")
], me.prototype, "indicator", 2);
d([
  ue()
], me.prototype, "hasScrollControls", 2);
d([
  f()
], me.prototype, "placement", 2);
d([
  f()
], me.prototype, "activation", 2);
d([
  f({ attribute: "no-scroll-controls", type: Boolean })
], me.prototype, "noScrollControls", 2);
d([
  ee("noScrollControls", { waitUntilFirstUpdate: !0 })
], me.prototype, "updateScrollControls", 1);
d([
  ee("placement", { waitUntilFirstUpdate: !0 })
], me.prototype, "syncIndicator", 1);
me = d([
  ve("sl-tab-group")
], me);
var Hl = le`
  ${be}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`, Rn = Symbol.for(""), ql = (e) => {
  if ((e == null ? void 0 : e.r) === Rn)
    return e == null ? void 0 : e._$litStatic$;
}, Nr = (e, ...t) => ({ _$litStatic$: t.reduce((r, s, o) => r + ((n) => {
  if (n._$litStatic$ !== void 0)
    return n._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${n}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(s) + e[o + 1], e[0]), r: Rn }), Oo = /* @__PURE__ */ new Map(), Wl = (e) => (t, ...r) => {
  const s = r.length;
  let o, n;
  const i = [], l = [];
  let a, c = 0, u = !1;
  for (; c < s; ) {
    for (a = t[c]; c < s && (n = r[c], (o = ql(n)) !== void 0); )
      a += o + t[++c], u = !0;
    l.push(n), i.push(a), c++;
  }
  if (c === s && i.push(t[s]), u) {
    const h = i.join("$$lit$$");
    (t = Oo.get(h)) === void 0 && (i.raw = i, Oo.set(h, t = i)), r = l;
  }
  return e(t, ...r);
}, _r = Wl(V);
/*! Bundled license information:

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var N = (e) => e != null ? e : G;
/*! Bundled license information:

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var ge = class extends ae {
  constructor() {
    super(...arguments), this.hasFocus = !1, this.label = "", this.disabled = !1;
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleClick(e) {
    this.disabled && (e.preventDefault(), e.stopPropagation());
  }
  click() {
    this.button.click();
  }
  focus(e) {
    this.button.focus(e);
  }
  blur() {
    this.button.blur();
  }
  render() {
    const e = !!this.href, t = e ? Nr`a` : Nr`button`;
    return _r`
      <${t}
        part="base"
        class=${fe({
      "icon-button": !0,
      "icon-button--disabled": !e && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${N(e ? void 0 : this.disabled)}
        type=${N(e ? void 0 : "button")}
        href=${N(e ? this.href : void 0)}
        target=${N(e ? this.target : void 0)}
        download=${N(e ? this.download : void 0)}
        rel=${N(e && this.target ? "noreferrer noopener" : void 0)}
        role=${N(e ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${N(this.name)}
          library=${N(this.library)}
          src=${N(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `;
  }
};
ge.styles = Hl;
d([
  se(".icon-button")
], ge.prototype, "button", 2);
d([
  ue()
], ge.prototype, "hasFocus", 2);
d([
  f()
], ge.prototype, "name", 2);
d([
  f()
], ge.prototype, "library", 2);
d([
  f()
], ge.prototype, "src", 2);
d([
  f()
], ge.prototype, "href", 2);
d([
  f()
], ge.prototype, "target", 2);
d([
  f()
], ge.prototype, "download", 2);
d([
  f()
], ge.prototype, "label", 2);
d([
  f({ type: Boolean, reflect: !0 })
], ge.prototype, "disabled", 2);
ge = d([
  ve("sl-icon-button")
], ge);
var ps = /* @__PURE__ */ new Map();
function Kl(e, t = "cors") {
  if (ps.has(e))
    return ps.get(e);
  const r = fetch(e, { mode: t }).then(async (s) => ({
    ok: s.ok,
    status: s.status,
    html: await s.text()
  }));
  return ps.set(e, r), r;
}
var fs = /* @__PURE__ */ new Map();
async function Gl(e) {
  if (fs.has(e))
    return fs.get(e);
  const t = await Kl(e), r = {
    ok: t.ok,
    status: t.status,
    svg: null
  };
  if (t.ok) {
    const s = document.createElement("div");
    s.innerHTML = t.html;
    const o = s.firstElementChild;
    r.svg = (o == null ? void 0 : o.tagName.toLowerCase()) === "svg" ? o.outerHTML : "";
  }
  return fs.set(e, r), r;
}
var Yl = le`
  ${be}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`, Es = class extends Hs {
  constructor(e) {
    if (super(e), this.it = G, e.type !== We.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === G || e == null)
      return this._t = void 0, this.it = e;
    if (e === xe)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it)
      return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
};
Es.directiveName = "unsafeHTML", Es.resultType = 1;
var Ts = class extends Es {
};
Ts.directiveName = "unsafeSVG", Ts.resultType = 2;
var Jl = Fs(Ts), ms, Le = class extends ae {
  constructor() {
    super(...arguments), this.svg = "", this.label = "", this.library = "default";
  }
  connectedCallback() {
    super.connectedCallback(), gl(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), bl(this);
  }
  getUrl() {
    const e = go(this.library);
    return this.name && e ? e.resolver(this.name) : this.src;
  }
  handleLabelChange() {
    typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
  }
  async setIcon() {
    var e;
    const t = go(this.library), r = this.getUrl();
    if (ms || (ms = new DOMParser()), r)
      try {
        const s = await Gl(r);
        if (r !== this.getUrl())
          return;
        if (s.ok) {
          const n = ms.parseFromString(s.svg, "text/html").body.querySelector("svg");
          n !== null ? ((e = t == null ? void 0 : t.mutator) == null || e.call(t, n), this.svg = n.outerHTML, this.emit("sl-load")) : (this.svg = "", this.emit("sl-error"));
        } else
          this.svg = "", this.emit("sl-error");
      } catch {
        this.emit("sl-error");
      }
    else
      this.svg.length > 0 && (this.svg = "");
  }
  render() {
    return V` ${Jl(this.svg)} `;
  }
};
Le.styles = Yl;
d([
  ue()
], Le.prototype, "svg", 2);
d([
  f({ reflect: !0 })
], Le.prototype, "name", 2);
d([
  f()
], Le.prototype, "src", 2);
d([
  f()
], Le.prototype, "label", 2);
d([
  f({ reflect: !0 })
], Le.prototype, "library", 2);
d([
  ee("label")
], Le.prototype, "handleLabelChange", 1);
d([
  ee(["name", "src", "library"])
], Le.prototype, "setIcon", 1);
Le = d([
  ve("sl-icon")
], Le);
/*! Bundled license information:

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var Xl = le`
  ${be}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`, Ql = 0, Ne = class extends ae {
  constructor() {
    super(...arguments), this.localize = new nt(this), this.attrId = ++Ql, this.componentId = `sl-tab-${this.attrId}`, this.panel = "", this.active = !1, this.closable = !1, this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "tab");
  }
  handleCloseClick() {
    this.emit("sl-close");
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  focus(e) {
    this.tab.focus(e);
  }
  blur() {
    this.tab.blur();
  }
  render() {
    return this.id = this.id.length > 0 ? this.id : this.componentId, V`
      <div
        part="base"
        class=${fe({
      tab: !0,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? V`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
Ne.styles = Xl;
d([
  se(".tab")
], Ne.prototype, "tab", 2);
d([
  f({ reflect: !0 })
], Ne.prototype, "panel", 2);
d([
  f({ type: Boolean, reflect: !0 })
], Ne.prototype, "active", 2);
d([
  f({ type: Boolean })
], Ne.prototype, "closable", 2);
d([
  f({ type: Boolean, reflect: !0 })
], Ne.prototype, "disabled", 2);
d([
  ee("active")
], Ne.prototype, "handleActiveChange", 1);
d([
  ee("disabled")
], Ne.prototype, "handleDisabledChange", 1);
Ne = d([
  ve("sl-tab")
], Ne);
var ea = le`
  ${be}

  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`, ta = 0, Et = class extends ae {
  constructor() {
    super(...arguments), this.attrId = ++ta, this.componentId = `sl-tab-panel-${this.attrId}`, this.name = "", this.active = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.id = this.id.length > 0 ? this.id : this.componentId, this.setAttribute("role", "tabpanel");
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return V`
      <slot
        part="base"
        class=${fe({
      "tab-panel": !0,
      "tab-panel--active": this.active
    })}
      ></slot>
    `;
  }
};
Et.styles = ea;
d([
  f({ reflect: !0 })
], Et.prototype, "name", 2);
d([
  f({ type: Boolean, reflect: !0 })
], Et.prototype, "active", 2);
d([
  ee("active")
], Et.prototype, "handleActiveChange", 1);
Et = d([
  ve("sl-tab-panel")
], Et);
const ra = `:where(html){line-height:1.15}:where(h1){font-size:2em;margin-block-end:.67em;margin-block-start:.67em}:where(dl,ol,ul) :where(dl,ol,ul){margin-block-end:0;margin-block-start:0}:where(hr){box-sizing:content-box;color:inherit;height:0}:where(pre){font-family:monospace,monospace;font-size:1em}:where(abbr[title]){text-decoration:underline;text-decoration:underline dotted}:where(b,strong){font-weight:bolder}:where(code,kbd,samp){font-family:monospace,monospace;font-size:1em}:where(small){font-size:80%}:where(table){border-color:currentColor;text-indent:0}:where(button,input,select){margin:0}:where(button){text-transform:none}:where(button,input:is([type="button" i],[type="reset" i],[type="submit" i])){-webkit-appearance:button}:where(progress){vertical-align:baseline}:where(select){text-transform:none}:where(textarea){margin:0}:where(input[type="search" i]){-webkit-appearance:textfield;outline-offset:-2px}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}:where(button,input:is([type="button" i],[type="color" i],[type="reset" i],[type="submit" i]))::-moz-focus-inner{border-style:none;padding:0}:where(button,input:is([type="button" i],[type="color" i],[type="reset" i],[type="submit" i]))::-moz-focusring{outline:1px dotted ButtonText}:where(:-moz-ui-invalid){box-shadow:none}:where(dialog){background-color:#fff;border:solid;color:#000;height:-moz-fit-content;height:fit-content;left:0;margin:auto;padding:1em;position:absolute;right:0;width:-moz-fit-content;width:fit-content}:where(dialog:not([open])){display:none}:where(summary){display:list-item}
`, sa = `:root,:host,.sl-theme-light{color-scheme:light;--sl-color-gray-50: hsl(0 0% 97.5%);--sl-color-gray-100: hsl(240 4.8% 95.9%);--sl-color-gray-200: hsl(240 5.9% 90%);--sl-color-gray-300: hsl(240 4.9% 83.9%);--sl-color-gray-400: hsl(240 5% 64.9%);--sl-color-gray-500: hsl(240 3.8% 46.1%);--sl-color-gray-600: hsl(240 5.2% 33.9%);--sl-color-gray-700: hsl(240 5.3% 26.1%);--sl-color-gray-800: hsl(240 3.7% 15.9%);--sl-color-gray-900: hsl(240 5.9% 10%);--sl-color-gray-950: hsl(240 7.3% 8%);--sl-color-red-50: hsl(0 85.7% 97.3%);--sl-color-red-100: hsl(0 93.3% 94.1%);--sl-color-red-200: hsl(0 96.3% 89.4%);--sl-color-red-300: hsl(0 93.5% 81.8%);--sl-color-red-400: hsl(0 90.6% 70.8%);--sl-color-red-500: hsl(0 84.2% 60.2%);--sl-color-red-600: hsl(0 72.2% 50.6%);--sl-color-red-700: hsl(0 73.7% 41.8%);--sl-color-red-800: hsl(0 70% 35.3%);--sl-color-red-900: hsl(0 62.8% 30.6%);--sl-color-red-950: hsl(0 60% 19.6%);--sl-color-orange-50: hsl(33.3 100% 96.5%);--sl-color-orange-100: hsl(34.3 100% 91.8%);--sl-color-orange-200: hsl(32.1 97.7% 83.1%);--sl-color-orange-300: hsl(30.7 97.2% 72.4%);--sl-color-orange-400: hsl(27 96% 61%);--sl-color-orange-500: hsl(24.6 95% 53.1%);--sl-color-orange-600: hsl(20.5 90.2% 48.2%);--sl-color-orange-700: hsl(17.5 88.3% 40.4%);--sl-color-orange-800: hsl(15 79.1% 33.7%);--sl-color-orange-900: hsl(15.3 74.6% 27.8%);--sl-color-orange-950: hsl(15.2 69.1% 19%);--sl-color-amber-50: hsl(48 100% 96.1%);--sl-color-amber-100: hsl(48 96.5% 88.8%);--sl-color-amber-200: hsl(48 96.6% 76.7%);--sl-color-amber-300: hsl(45.9 96.7% 64.5%);--sl-color-amber-400: hsl(43.3 96.4% 56.3%);--sl-color-amber-500: hsl(37.7 92.1% 50.2%);--sl-color-amber-600: hsl(32.1 94.6% 43.7%);--sl-color-amber-700: hsl(26 90.5% 37.1%);--sl-color-amber-800: hsl(22.7 82.5% 31.4%);--sl-color-amber-900: hsl(21.7 77.8% 26.5%);--sl-color-amber-950: hsl(22.9 74.1% 16.7%);--sl-color-yellow-50: hsl(54.5 91.7% 95.3%);--sl-color-yellow-100: hsl(54.9 96.7% 88%);--sl-color-yellow-200: hsl(52.8 98.3% 76.9%);--sl-color-yellow-300: hsl(50.4 97.8% 63.5%);--sl-color-yellow-400: hsl(47.9 95.8% 53.1%);--sl-color-yellow-500: hsl(45.4 93.4% 47.5%);--sl-color-yellow-600: hsl(40.6 96.1% 40.4%);--sl-color-yellow-700: hsl(35.5 91.7% 32.9%);--sl-color-yellow-800: hsl(31.8 81% 28.8%);--sl-color-yellow-900: hsl(28.4 72.5% 25.7%);--sl-color-yellow-950: hsl(33.1 69% 13.9%);--sl-color-lime-50: hsl(78.3 92% 95.1%);--sl-color-lime-100: hsl(79.6 89.1% 89.2%);--sl-color-lime-200: hsl(80.9 88.5% 79.6%);--sl-color-lime-300: hsl(82 84.5% 67.1%);--sl-color-lime-400: hsl(82.7 78% 55.5%);--sl-color-lime-500: hsl(83.7 80.5% 44.3%);--sl-color-lime-600: hsl(84.8 85.2% 34.5%);--sl-color-lime-700: hsl(85.9 78.4% 27.3%);--sl-color-lime-800: hsl(86.3 69% 22.7%);--sl-color-lime-900: hsl(87.6 61.2% 20.2%);--sl-color-lime-950: hsl(86.5 60.6% 13.9%);--sl-color-green-50: hsl(138.5 76.5% 96.7%);--sl-color-green-100: hsl(140.6 84.2% 92.5%);--sl-color-green-200: hsl(141 78.9% 85.1%);--sl-color-green-300: hsl(141.7 76.6% 73.1%);--sl-color-green-400: hsl(141.9 69.2% 58%);--sl-color-green-500: hsl(142.1 70.6% 45.3%);--sl-color-green-600: hsl(142.1 76.2% 36.3%);--sl-color-green-700: hsl(142.4 71.8% 29.2%);--sl-color-green-800: hsl(142.8 64.2% 24.1%);--sl-color-green-900: hsl(143.8 61.2% 20.2%);--sl-color-green-950: hsl(144.3 60.7% 12%);--sl-color-emerald-50: hsl(151.8 81% 95.9%);--sl-color-emerald-100: hsl(149.3 80.4% 90%);--sl-color-emerald-200: hsl(152.4 76% 80.4%);--sl-color-emerald-300: hsl(156.2 71.6% 66.9%);--sl-color-emerald-400: hsl(158.1 64.4% 51.6%);--sl-color-emerald-500: hsl(160.1 84.1% 39.4%);--sl-color-emerald-600: hsl(161.4 93.5% 30.4%);--sl-color-emerald-700: hsl(162.9 93.5% 24.3%);--sl-color-emerald-800: hsl(163.1 88.1% 19.8%);--sl-color-emerald-900: hsl(164.2 85.7% 16.5%);--sl-color-emerald-950: hsl(164.3 87.5% 9.4%);--sl-color-teal-50: hsl(166.2 76.5% 96.7%);--sl-color-teal-100: hsl(167.2 85.5% 89.2%);--sl-color-teal-200: hsl(168.4 83.8% 78.2%);--sl-color-teal-300: hsl(170.6 76.9% 64.3%);--sl-color-teal-400: hsl(172.5 66% 50.4%);--sl-color-teal-500: hsl(173.4 80.4% 40%);--sl-color-teal-600: hsl(174.7 83.9% 31.6%);--sl-color-teal-700: hsl(175.3 77.4% 26.1%);--sl-color-teal-800: hsl(176.1 69.4% 21.8%);--sl-color-teal-900: hsl(175.9 60.8% 19%);--sl-color-teal-950: hsl(176.5 58.6% 11.4%);--sl-color-cyan-50: hsl(183.2 100% 96.3%);--sl-color-cyan-100: hsl(185.1 95.9% 90.4%);--sl-color-cyan-200: hsl(186.2 93.5% 81.8%);--sl-color-cyan-300: hsl(187 92.4% 69%);--sl-color-cyan-400: hsl(187.9 85.7% 53.3%);--sl-color-cyan-500: hsl(188.7 94.5% 42.7%);--sl-color-cyan-600: hsl(191.6 91.4% 36.5%);--sl-color-cyan-700: hsl(192.9 82.3% 31%);--sl-color-cyan-800: hsl(194.4 69.6% 27.1%);--sl-color-cyan-900: hsl(196.4 63.6% 23.7%);--sl-color-cyan-950: hsl(196.8 61% 16.1%);--sl-color-sky-50: hsl(204 100% 97.1%);--sl-color-sky-100: hsl(204 93.8% 93.7%);--sl-color-sky-200: hsl(200.6 94.4% 86.1%);--sl-color-sky-300: hsl(199.4 95.5% 73.9%);--sl-color-sky-400: hsl(198.4 93.2% 59.6%);--sl-color-sky-500: hsl(198.6 88.7% 48.4%);--sl-color-sky-600: hsl(200.4 98% 39.4%);--sl-color-sky-700: hsl(201.3 96.3% 32.2%);--sl-color-sky-800: hsl(201 90% 27.5%);--sl-color-sky-900: hsl(202 80.3% 23.9%);--sl-color-sky-950: hsl(202.3 73.8% 16.5%);--sl-color-blue-50: hsl(213.8 100% 96.9%);--sl-color-blue-100: hsl(214.3 94.6% 92.7%);--sl-color-blue-200: hsl(213.3 96.9% 87.3%);--sl-color-blue-300: hsl(211.7 96.4% 78.4%);--sl-color-blue-400: hsl(213.1 93.9% 67.8%);--sl-color-blue-500: hsl(217.2 91.2% 59.8%);--sl-color-blue-600: hsl(221.2 83.2% 53.3%);--sl-color-blue-700: hsl(224.3 76.3% 48%);--sl-color-blue-800: hsl(225.9 70.7% 40.2%);--sl-color-blue-900: hsl(224.4 64.3% 32.9%);--sl-color-blue-950: hsl(226.2 55.3% 18.4%);--sl-color-indigo-50: hsl(225.9 100% 96.7%);--sl-color-indigo-100: hsl(226.5 100% 93.9%);--sl-color-indigo-200: hsl(228 96.5% 88.8%);--sl-color-indigo-300: hsl(229.7 93.5% 81.8%);--sl-color-indigo-400: hsl(234.5 89.5% 73.9%);--sl-color-indigo-500: hsl(238.7 83.5% 66.7%);--sl-color-indigo-600: hsl(243.4 75.4% 58.6%);--sl-color-indigo-700: hsl(244.5 57.9% 50.6%);--sl-color-indigo-800: hsl(243.7 54.5% 41.4%);--sl-color-indigo-900: hsl(242.2 47.4% 34.3%);--sl-color-indigo-950: hsl(243.5 43.6% 22.9%);--sl-color-violet-50: hsl(250 100% 97.6%);--sl-color-violet-100: hsl(251.4 91.3% 95.5%);--sl-color-violet-200: hsl(250.5 95.2% 91.8%);--sl-color-violet-300: hsl(252.5 94.7% 85.1%);--sl-color-violet-400: hsl(255.1 91.7% 76.3%);--sl-color-violet-500: hsl(258.3 89.5% 66.3%);--sl-color-violet-600: hsl(262.1 83.3% 57.8%);--sl-color-violet-700: hsl(263.4 70% 50.4%);--sl-color-violet-800: hsl(263.4 69.3% 42.2%);--sl-color-violet-900: hsl(263.5 67.4% 34.9%);--sl-color-violet-950: hsl(265.1 61.5% 21.4%);--sl-color-purple-50: hsl(270 100% 98%);--sl-color-purple-100: hsl(268.7 100% 95.5%);--sl-color-purple-200: hsl(268.6 100% 91.8%);--sl-color-purple-300: hsl(269.2 97.4% 85.1%);--sl-color-purple-400: hsl(270 95.2% 75.3%);--sl-color-purple-500: hsl(270.7 91% 65.1%);--sl-color-purple-600: hsl(271.5 81.3% 55.9%);--sl-color-purple-700: hsl(272.1 71.7% 47.1%);--sl-color-purple-800: hsl(272.9 67.2% 39.4%);--sl-color-purple-900: hsl(273.6 65.6% 32%);--sl-color-purple-950: hsl(276 59.5% 16.5%);--sl-color-fuchsia-50: hsl(289.1 100% 97.8%);--sl-color-fuchsia-100: hsl(287 100% 95.5%);--sl-color-fuchsia-200: hsl(288.3 95.8% 90.6%);--sl-color-fuchsia-300: hsl(291.1 93.1% 82.9%);--sl-color-fuchsia-400: hsl(292 91.4% 72.5%);--sl-color-fuchsia-500: hsl(292.2 84.1% 60.6%);--sl-color-fuchsia-600: hsl(293.4 69.5% 48.8%);--sl-color-fuchsia-700: hsl(294.7 72.4% 39.8%);--sl-color-fuchsia-800: hsl(295.4 70.2% 32.9%);--sl-color-fuchsia-900: hsl(296.7 63.6% 28%);--sl-color-fuchsia-950: hsl(297.1 56.8% 14.5%);--sl-color-pink-50: hsl(327.3 73.3% 97.1%);--sl-color-pink-100: hsl(325.7 77.8% 94.7%);--sl-color-pink-200: hsl(325.9 84.6% 89.8%);--sl-color-pink-300: hsl(327.4 87.1% 81.8%);--sl-color-pink-400: hsl(328.6 85.5% 70.2%);--sl-color-pink-500: hsl(330.4 81.2% 60.4%);--sl-color-pink-600: hsl(333.3 71.4% 50.6%);--sl-color-pink-700: hsl(335.1 77.6% 42%);--sl-color-pink-800: hsl(335.8 74.4% 35.3%);--sl-color-pink-900: hsl(335.9 69% 30.4%);--sl-color-pink-950: hsl(336.2 65.4% 15.9%);--sl-color-rose-50: hsl(355.7 100% 97.3%);--sl-color-rose-100: hsl(355.6 100% 94.7%);--sl-color-rose-200: hsl(352.7 96.1% 90%);--sl-color-rose-300: hsl(352.6 95.7% 81.8%);--sl-color-rose-400: hsl(351.3 94.5% 71.4%);--sl-color-rose-500: hsl(349.7 89.2% 60.2%);--sl-color-rose-600: hsl(346.8 77.2% 49.8%);--sl-color-rose-700: hsl(345.3 82.7% 40.8%);--sl-color-rose-800: hsl(343.4 79.7% 34.7%);--sl-color-rose-900: hsl(341.5 75.5% 30.4%);--sl-color-rose-950: hsl(341.3 70.1% 17.1%);--sl-color-primary-50: var(--sl-color-sky-50);--sl-color-primary-100: var(--sl-color-sky-100);--sl-color-primary-200: var(--sl-color-sky-200);--sl-color-primary-300: var(--sl-color-sky-300);--sl-color-primary-400: var(--sl-color-sky-400);--sl-color-primary-500: var(--sl-color-sky-500);--sl-color-primary-600: var(--sl-color-sky-600);--sl-color-primary-700: var(--sl-color-sky-700);--sl-color-primary-800: var(--sl-color-sky-800);--sl-color-primary-900: var(--sl-color-sky-900);--sl-color-primary-950: var(--sl-color-sky-950);--sl-color-success-50: var(--sl-color-green-50);--sl-color-success-100: var(--sl-color-green-100);--sl-color-success-200: var(--sl-color-green-200);--sl-color-success-300: var(--sl-color-green-300);--sl-color-success-400: var(--sl-color-green-400);--sl-color-success-500: var(--sl-color-green-500);--sl-color-success-600: var(--sl-color-green-600);--sl-color-success-700: var(--sl-color-green-700);--sl-color-success-800: var(--sl-color-green-800);--sl-color-success-900: var(--sl-color-green-900);--sl-color-success-950: var(--sl-color-green-950);--sl-color-warning-50: var(--sl-color-amber-50);--sl-color-warning-100: var(--sl-color-amber-100);--sl-color-warning-200: var(--sl-color-amber-200);--sl-color-warning-300: var(--sl-color-amber-300);--sl-color-warning-400: var(--sl-color-amber-400);--sl-color-warning-500: var(--sl-color-amber-500);--sl-color-warning-600: var(--sl-color-amber-600);--sl-color-warning-700: var(--sl-color-amber-700);--sl-color-warning-800: var(--sl-color-amber-800);--sl-color-warning-900: var(--sl-color-amber-900);--sl-color-warning-950: var(--sl-color-amber-950);--sl-color-danger-50: var(--sl-color-red-50);--sl-color-danger-100: var(--sl-color-red-100);--sl-color-danger-200: var(--sl-color-red-200);--sl-color-danger-300: var(--sl-color-red-300);--sl-color-danger-400: var(--sl-color-red-400);--sl-color-danger-500: var(--sl-color-red-500);--sl-color-danger-600: var(--sl-color-red-600);--sl-color-danger-700: var(--sl-color-red-700);--sl-color-danger-800: var(--sl-color-red-800);--sl-color-danger-900: var(--sl-color-red-900);--sl-color-danger-950: var(--sl-color-red-950);--sl-color-neutral-50: var(--sl-color-gray-50);--sl-color-neutral-100: var(--sl-color-gray-100);--sl-color-neutral-200: var(--sl-color-gray-200);--sl-color-neutral-300: var(--sl-color-gray-300);--sl-color-neutral-400: var(--sl-color-gray-400);--sl-color-neutral-500: var(--sl-color-gray-500);--sl-color-neutral-600: var(--sl-color-gray-600);--sl-color-neutral-700: var(--sl-color-gray-700);--sl-color-neutral-800: var(--sl-color-gray-800);--sl-color-neutral-900: var(--sl-color-gray-900);--sl-color-neutral-950: var(--sl-color-gray-950);--sl-color-neutral-0: hsl(0, 0%, 100%);--sl-color-neutral-1000: hsl(0, 0%, 0%);--sl-border-radius-small: .1875rem;--sl-border-radius-medium: .25rem;--sl-border-radius-large: .5rem;--sl-border-radius-x-large: 1rem;--sl-border-radius-circle: 50%;--sl-border-radius-pill: 9999px;--sl-shadow-x-small: 0 1px 2px hsl(240 3.8% 46.1% / 6%);--sl-shadow-small: 0 1px 2px hsl(240 3.8% 46.1% / 12%);--sl-shadow-medium: 0 2px 4px hsl(240 3.8% 46.1% / 12%);--sl-shadow-large: 0 2px 8px hsl(240 3.8% 46.1% / 12%);--sl-shadow-x-large: 0 4px 16px hsl(240 3.8% 46.1% / 12%);--sl-spacing-3x-small: .125rem;--sl-spacing-2x-small: .25rem;--sl-spacing-x-small: .5rem;--sl-spacing-small: .75rem;--sl-spacing-medium: 1rem;--sl-spacing-large: 1.25rem;--sl-spacing-x-large: 1.75rem;--sl-spacing-2x-large: 2.25rem;--sl-spacing-3x-large: 3rem;--sl-spacing-4x-large: 4.5rem;--sl-transition-x-slow: 1s;--sl-transition-slow: .5s;--sl-transition-medium: .25s;--sl-transition-fast: .15s;--sl-transition-x-fast: 50ms;--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--sl-font-serif: Georgia, "Times New Roman", serif;--sl-font-size-2x-small: .625rem;--sl-font-size-x-small: .75rem;--sl-font-size-small: .875rem;--sl-font-size-medium: 1rem;--sl-font-size-large: 1.25rem;--sl-font-size-x-large: 1.5rem;--sl-font-size-2x-large: 2.25rem;--sl-font-size-3x-large: 3rem;--sl-font-size-4x-large: 4.5rem;--sl-font-weight-light: 300;--sl-font-weight-normal: 400;--sl-font-weight-semibold: 500;--sl-font-weight-bold: 700;--sl-letter-spacing-denser: -.03em;--sl-letter-spacing-dense: -.015em;--sl-letter-spacing-normal: normal;--sl-letter-spacing-loose: .075em;--sl-letter-spacing-looser: .15em;--sl-line-height-denser: 1;--sl-line-height-dense: 1.4;--sl-line-height-normal: 1.8;--sl-line-height-loose: 2.2;--sl-line-height-looser: 2.6;--sl-focus-ring-color: var(--sl-color-primary-600);--sl-focus-ring-style: solid;--sl-focus-ring-width: 3px;--sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);--sl-focus-ring-offset: 1px;--sl-button-font-size-small: var(--sl-font-size-x-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-large: var(--sl-font-size-medium);--sl-input-height-small: 1.875rem;--sl-input-height-medium: 2.5rem;--sl-input-height-large: 3.125rem;--sl-input-background-color: var(--sl-color-neutral-0);--sl-input-background-color-hover: var(--sl-input-background-color);--sl-input-background-color-focus: var(--sl-input-background-color);--sl-input-background-color-disabled: var(--sl-color-neutral-100);--sl-input-border-color: var(--sl-color-neutral-300);--sl-input-border-color-hover: var(--sl-color-neutral-400);--sl-input-border-color-focus: var(--sl-color-primary-500);--sl-input-border-color-disabled: var(--sl-color-neutral-300);--sl-input-border-width: 1px;--sl-input-required-content: "*";--sl-input-required-content-offset: -2px;--sl-input-required-content-color: var(--sl-input-label-color);--sl-input-border-radius-small: var(--sl-border-radius-medium);--sl-input-border-radius-medium: var(--sl-border-radius-medium);--sl-input-border-radius-large: var(--sl-border-radius-medium);--sl-input-font-family: var(--sl-font-sans);--sl-input-font-weight: var(--sl-font-weight-normal);--sl-input-font-size-small: var(--sl-font-size-small);--sl-input-font-size-medium: var(--sl-font-size-medium);--sl-input-font-size-large: var(--sl-font-size-large);--sl-input-letter-spacing: var(--sl-letter-spacing-normal);--sl-input-color: var(--sl-color-neutral-700);--sl-input-color-hover: var(--sl-color-neutral-700);--sl-input-color-focus: var(--sl-color-neutral-700);--sl-input-color-disabled: var(--sl-color-neutral-900);--sl-input-icon-color: var(--sl-color-neutral-500);--sl-input-icon-color-hover: var(--sl-color-neutral-600);--sl-input-icon-color-focus: var(--sl-color-neutral-600);--sl-input-placeholder-color: var(--sl-color-neutral-500);--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);--sl-input-spacing-small: var(--sl-spacing-small);--sl-input-spacing-medium: var(--sl-spacing-medium);--sl-input-spacing-large: var(--sl-spacing-large);--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);--sl-input-focus-ring-offset: 0;--sl-input-filled-background-color: var(--sl-color-neutral-100);--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);--sl-input-filled-color: var(--sl-color-neutral-800);--sl-input-filled-color-hover: var(--sl-color-neutral-800);--sl-input-filled-color-focus: var(--sl-color-neutral-700);--sl-input-filled-color-disabled: var(--sl-color-neutral-800);--sl-input-label-font-size-small: var(--sl-font-size-small);--sl-input-label-font-size-medium: var(--sl-font-size-medium);--sl-input-label-font-size-large: var(--sl-font-size-large);--sl-input-label-color: inherit;--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);--sl-input-help-text-font-size-medium: var(--sl-font-size-small);--sl-input-help-text-font-size-large: var(--sl-font-size-medium);--sl-input-help-text-color: var(--sl-color-neutral-500);--sl-toggle-size-small: .875rem;--sl-toggle-size-medium: 1.125rem;--sl-toggle-size-large: 1.375rem;--sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);--sl-panel-background-color: var(--sl-color-neutral-0);--sl-panel-border-color: var(--sl-color-neutral-200);--sl-panel-border-width: 1px;--sl-tooltip-border-radius: var(--sl-border-radius-medium);--sl-tooltip-background-color: var(--sl-color-neutral-800);--sl-tooltip-color: var(--sl-color-neutral-0);--sl-tooltip-font-family: var(--sl-font-sans);--sl-tooltip-font-weight: var(--sl-font-weight-normal);--sl-tooltip-font-size: var(--sl-font-size-small);--sl-tooltip-line-height: var(--sl-line-height-dense);--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);--sl-tooltip-arrow-size: 6px;--sl-z-index-drawer: 700;--sl-z-index-dialog: 800;--sl-z-index-dropdown: 900;--sl-z-index-toast: 950;--sl-z-index-tooltip: 1000}.sl-scroll-lock{padding-right:var(--sl-scroll-lock-size)!important;overflow:hidden!important}.sl-toast-stack{position:fixed;top:0;inset-inline-end:0;z-index:var(--sl-z-index-toast);width:28rem;max-width:100%;max-height:100%;overflow:auto}.sl-toast-stack sl-alert{margin:var(--sl-spacing-medium)}.sl-toast-stack sl-alert::part(base){box-shadow:var(--sl-shadow-large)}
`, oa = `main.app{background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-200);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.top-bar h1{text-align:center}.top-bar menu{display:flex;justify-content:space-around;column-gap:10px}.loading{text-align:center}sl-icon.rotate{animation:turn 1s infinite linear}@keyframes turn{0%{transform:rotate(0)}to{transform:rotate(180deg)}}sl-button{margin-right:1rem}sl-tab>sl-icon{margin-right:.5rem}form [data-invalid]::part(base){border-color:var(--sl-color-danger-600)}form .form-error{padding:1rem;margin-bottom:1rem;background-color:var(--sl-color-orange-50);border-color:var(--sl-color-orange-200);border-radius:10px;border-style:solid;border-width:2px}form .field{margin:0rem .2rem 1rem}form .field>.error{display:flex;column-gap:.2rem;padding:.5rem 0;color:var(--sl-color-danger-600)}
`, na = "E-post adresse", ia = "Passord", la = "Profil", aa = "Konto", ca = "Kontakt", ua = "Lagre", da = "Adresse", ha = "Telefonnummer", pa = "Avtale", zo = {
  "Sign up": "Opprett konto",
  "Sign in": "Logg inn",
  "Sign out": "Logg ut",
  Email: na,
  Password: ia,
  Profile: la,
  Account: aa,
  Contact: ca,
  Save: ua,
  "First name": "Fornavn",
  "Last name": "Etternavn",
  Address: da,
  Phone: ha,
  "My membership": "Mitt medlemskap",
  Subscription: pa,
  "Failed signing up": "Kunne ikke opprette konto",
  "Failed signing in": "Kunne ikke logge inn",
  "Did you type your password and email correct?": "Har du skrevet riktig passord og e-post-adresse?",
  "Did you already sign up?": "Har du allerede registrert deg?",
  "Error saving": "Kunne ikke lagre",
  "Must be a valid email address": "Ugyldig adresse",
  "Must be a valid name": "Ugyldig navn",
  "Must be a valid street address": "Ugyldig adresse"
}, Dn = [{
  code: "no",
  name: "norsk",
  dict: zo
}, {
  code: "en",
  name: "english",
  dict: Object.keys(zo).reduce((e, t) => ({
    ...e,
    [t]: t
  }), [])
}], fa = Dn.reduce((e, {
  code: t,
  dict: r
}) => ({
  ...e,
  [t]: r
}), {}), Po = Dn.map(({
  code: e,
  name: t
}) => ({
  code: e,
  name: t
})), ma = (e) => C($n.Provider, {
  get value() {
    return ul(fa);
  },
  get children() {
    return e.children;
  }
}), ga = (e) => {
  let t = e;
  for (; t.length === 1; )
    t = t[0];
  return t;
}, qs = (...e) => {
};
Y(void 0, {
  equals: !1
});
class Ws extends Error {
  constructor() {
    super(...arguments);
    mr(this, "name", "AuthenticationError");
  }
}
class Lo extends Error {
  constructor() {
    super(...arguments);
    mr(this, "name", "RecordError");
  }
}
class ba extends Error {
  constructor() {
    super(...arguments);
    mr(this, "name", "ServiceError");
  }
}
const Mn = (e, t) => {
  const { headers: r, ok: s, redirected: o, status: n, statusText: i, type: l, url: a } = e;
  return {
    headers: r,
    ok: s,
    redirected: o,
    status: n,
    statusText: i,
    type: l,
    url: a,
    ...t
  };
}, jn = async (e, t, { headers: r = {}, body: s = {} } = {}) => {
  const o = new URL(`${e}/${t}`);
  o.pathname = o.pathname.replace("//", "/");
  const n = await fetch(o, {
    method: "POST",
    headers: {
      ...r,
      Accept: "application/json"
    },
    body: typeof s == "string" ? s : JSON.stringify(s)
  });
  if (n.status >= 500)
    throw new ba(
      `Error fetching ${n.url}: ${n.status} - ${n.statusText}`
    );
  return n;
}, No = async (e, t) => {
  const r = await jn(e.apibaseurl, t.method, {
    body: {
      email: t.email,
      pass: t.pass,
      ns: e.namespace,
      db: e.database,
      sc: e.scope
    }
  }), s = await r.json();
  if (!r.ok)
    throw new Ws(s.details);
  return {
    meta: Mn(r),
    data: s
  };
}, Io = async (e, t, r) => {
  const s = await jn(e.apibaseurl, "sql", {
    headers: {
      NS: e.namespace,
      DB: e.database,
      Authorization: `Bearer ${r}`
    },
    body: t
  }), o = await s.json();
  if (!s.ok)
    throw s.status === 403 ? new Ws(o.details) : new Lo(o.details);
  const n = o.map((i) => {
    if (i.status === "ERR")
      throw new Lo(i.detail);
    return i.result;
  });
  return console.log("Awaiting", t), new Promise(
    (i) => setTimeout(() => {
      console.log("Resovled", t), i({
        meta: Mn(s, { query: t }),
        data: ga(n)
      });
    }, 500)
  );
}, Ro = () => ({
  token: "",
  userId: ""
}), va = ({ conn: e }) => {
  const [t, r] = mt(Ro()), s = ({ token: n }) => {
    r("token", n), console.log("Writing token to localStorage:", n), localStorage.accessToken = n;
  };
  return Ci(() => {
    const n = localStorage.accessToken;
    n && (console.log("Reading token from localStorage:", n), r("token", n));
  }), {
    state: t,
    authenticated: () => !!t.userId,
    async signup(n) {
      const { data: i } = await No(e, {
        ...n,
        method: "signup"
      });
      s(i);
    },
    async signin(n) {
      const { data: i } = await No(e, {
        ...n,
        method: "signin"
      });
      s(i);
    },
    async loadDetails() {
      const { data: n } = await Io(
        e,
        "SELECT id FROM account;",
        t.token
      );
      r("userId", n.id);
    },
    async signout() {
      delete localStorage.accessToken, delete localStorage.activePanel, r(Ro());
    },
    query: (n) => Io(e, n, t.token)
  };
}, Do = () => ({
  email: ""
}), ya = ({ auth: e }) => {
  const [t, r] = mt(Do());
  return {
    state: t,
    async resetState() {
      r(Do());
    },
    async loadDetails() {
      const { data: s } = await e.query("SELECT email FROM account;");
      r("email", s.email);
    },
    async updateDetails(s) {
      await e.query(
        `UPDATE ${e.state.userId} MERGE ${JSON.stringify(s)} RETURN NONE`
      ), r(s);
    }
  };
}, Mo = () => ({
  firstName: "",
  lastName: "",
  address: "",
  phone: ""
}), _a = ({ auth: e }) => {
  const [t, r] = mt(Mo());
  return {
    state: t,
    resetState() {
      r(Mo());
    },
    async loadDetails() {
      const { data: s } = await e.query(
        "SELECT owner, firstName, lastName, address, phone FROM profile;"
      );
      r(s);
    },
    async updateDetails(s) {
      await e.query(
        `UPDATE profile MERGE ${JSON.stringify(s)} RETURN NONE`
      ), r(s);
    }
  };
}, Bn = Gr(), wa = (e) => {
  const t = va({
    conn: {
      namespace: e.namespace,
      database: e.database,
      scope: e.scope,
      apibaseurl: e.apibaseurl
    }
  }), r = ya({
    auth: t
  }), s = _a({
    auth: t
  }), o = {
    auth: t,
    account: r,
    profile: s
  };
  return zt(() => {
    t.authenticated() || (r.resetState(), s.resetState());
  }), C(Bn.Provider, {
    value: o,
    get children() {
      return e.children;
    }
  });
}, Lt = () => Ms(Bn);
var R;
(function(e) {
  e.assertEqual = (o) => o;
  function t(o) {
  }
  e.assertIs = t;
  function r(o) {
    throw new Error();
  }
  e.assertNever = r, e.arrayToEnum = (o) => {
    const n = {};
    for (const i of o)
      n[i] = i;
    return n;
  }, e.getValidEnumValues = (o) => {
    const n = e.objectKeys(o).filter((l) => typeof o[o[l]] != "number"), i = {};
    for (const l of n)
      i[l] = o[l];
    return e.objectValues(i);
  }, e.objectValues = (o) => e.objectKeys(o).map(function(n) {
    return o[n];
  }), e.objectKeys = typeof Object.keys == "function" ? (o) => Object.keys(o) : (o) => {
    const n = [];
    for (const i in o)
      Object.prototype.hasOwnProperty.call(o, i) && n.push(i);
    return n;
  }, e.find = (o, n) => {
    for (const i of o)
      if (n(i))
        return i;
  }, e.isInteger = typeof Number.isInteger == "function" ? (o) => Number.isInteger(o) : (o) => typeof o == "number" && isFinite(o) && Math.floor(o) === o;
  function s(o, n = " | ") {
    return o.map((i) => typeof i == "string" ? `'${i}'` : i).join(n);
  }
  e.joinValues = s, e.jsonStringifyReplacer = (o, n) => typeof n == "bigint" ? n.toString() : n;
})(R || (R = {}));
const y = R.arrayToEnum([
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
]), Ge = (e) => {
  switch (typeof e) {
    case "undefined":
      return y.undefined;
    case "string":
      return y.string;
    case "number":
      return isNaN(e) ? y.nan : y.number;
    case "boolean":
      return y.boolean;
    case "function":
      return y.function;
    case "bigint":
      return y.bigint;
    case "symbol":
      return y.symbol;
    case "object":
      return Array.isArray(e) ? y.array : e === null ? y.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? y.promise : typeof Map < "u" && e instanceof Map ? y.map : typeof Set < "u" && e instanceof Set ? y.set : typeof Date < "u" && e instanceof Date ? y.date : y.object;
    default:
      return y.unknown;
  }
}, b = R.arrayToEnum([
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
]), xa = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class je extends Error {
  constructor(t) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = t;
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const r = t || function(n) {
      return n.message;
    }, s = { _errors: [] }, o = (n) => {
      for (const i of n.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(o);
        else if (i.code === "invalid_return_type")
          o(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          o(i.argumentsError);
        else if (i.path.length === 0)
          s._errors.push(r(i));
        else {
          let l = s, a = 0;
          for (; a < i.path.length; ) {
            const c = i.path[a];
            a === i.path.length - 1 ? (l[c] = l[c] || { _errors: [] }, l[c]._errors.push(r(i))) : l[c] = l[c] || { _errors: [] }, l = l[c], a++;
          }
        }
    };
    return o(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, R.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (r) => r.message) {
    const r = {}, s = [];
    for (const o of this.issues)
      o.path.length > 0 ? (r[o.path[0]] = r[o.path[0]] || [], r[o.path[0]].push(t(o))) : s.push(t(o));
    return { formErrors: s, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
je.create = (e) => new je(e);
const Jt = (e, t) => {
  let r;
  switch (e.code) {
    case b.invalid_type:
      e.received === y.undefined ? r = "Required" : r = `Expected ${e.expected}, received ${e.received}`;
      break;
    case b.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(e.expected, R.jsonStringifyReplacer)}`;
      break;
    case b.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${R.joinValues(e.keys, ", ")}`;
      break;
    case b.invalid_union:
      r = "Invalid input";
      break;
    case b.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${R.joinValues(e.options)}`;
      break;
    case b.invalid_enum_value:
      r = `Invalid enum value. Expected ${R.joinValues(e.options)}, received '${e.received}'`;
      break;
    case b.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case b.invalid_return_type:
      r = "Invalid function return type";
      break;
    case b.invalid_date:
      r = "Invalid date";
      break;
    case b.invalid_string:
      typeof e.validation == "object" ? "startsWith" in e.validation ? r = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? r = `Invalid input: must end with "${e.validation.endsWith}"` : R.assertNever(e.validation) : e.validation !== "regex" ? r = `Invalid ${e.validation}` : r = "Invalid";
      break;
    case b.too_small:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(e.minimum)}` : r = "Invalid input";
      break;
    case b.too_big:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(e.maximum)}` : r = "Invalid input";
      break;
    case b.custom:
      r = "Invalid input";
      break;
    case b.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case b.not_multiple_of:
      r = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case b.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = t.defaultError, R.assertNever(e);
  }
  return { message: r };
};
let Vn = Jt;
function ka(e) {
  Vn = e;
}
function Ir() {
  return Vn;
}
const Rr = (e) => {
  const { data: t, path: r, errorMaps: s, issueData: o } = e, n = [...r, ...o.path || []], i = {
    ...o,
    path: n
  };
  let l = "";
  const a = s.filter((c) => !!c).slice().reverse();
  for (const c of a)
    l = c(i, { data: t, defaultError: l }).message;
  return {
    ...o,
    path: n,
    message: o.message || l
  };
}, $a = [];
function x(e, t) {
  const r = Rr({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [
      e.common.contextualErrorMap,
      e.schemaErrorMap,
      Ir(),
      Jt
    ].filter((s) => !!s)
  });
  e.common.issues.push(r);
}
class ie {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, r) {
    const s = [];
    for (const o of r) {
      if (o.status === "aborted")
        return A;
      o.status === "dirty" && t.dirty(), s.push(o.value);
    }
    return { status: t.value, value: s };
  }
  static async mergeObjectAsync(t, r) {
    const s = [];
    for (const o of r)
      s.push({
        key: await o.key,
        value: await o.value
      });
    return ie.mergeObjectSync(t, s);
  }
  static mergeObjectSync(t, r) {
    const s = {};
    for (const o of r) {
      const { key: n, value: i } = o;
      if (n.status === "aborted" || i.status === "aborted")
        return A;
      n.status === "dirty" && t.dirty(), i.status === "dirty" && t.dirty(), (typeof i.value < "u" || o.alwaysSet) && (s[n.value] = i.value);
    }
    return { status: t.value, value: s };
  }
}
const A = Object.freeze({
  status: "aborted"
}), Un = (e) => ({ status: "dirty", value: e }), re = (e) => ({ status: "valid", value: e }), Os = (e) => e.status === "aborted", zs = (e) => e.status === "dirty", Dr = (e) => e.status === "valid", Mr = (e) => typeof Promise < "u" && e instanceof Promise;
var P;
(function(e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(P || (P = {}));
class Ie {
  constructor(t, r, s, o) {
    this.parent = t, this.data = r, this._path = s, this._key = o;
  }
  get path() {
    return this._path.concat(this._key);
  }
}
const jo = (e, t) => {
  if (Dr(t))
    return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return { success: !1, error: new je(e.common.issues) };
};
function E(e) {
  if (!e)
    return {};
  const { errorMap: t, invalid_type_error: r, required_error: s, description: o } = e;
  if (t && (r || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: o } : { errorMap: (i, l) => i.code !== "invalid_type" ? { message: l.defaultError } : typeof l.data > "u" ? { message: s != null ? s : l.defaultError } : { message: r != null ? r : l.defaultError }, description: o };
}
class O {
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Ge(t.data);
  }
  _getOrReturnCtx(t, r) {
    return r || {
      common: t.parent.common,
      data: t.data,
      parsedType: Ge(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new ie(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Ge(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const r = this._parse(t);
    if (Mr(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(t) {
    const r = this._parse(t);
    return Promise.resolve(r);
  }
  parse(t, r) {
    const s = this.safeParse(t, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(t, r) {
    var s;
    const o = {
      common: {
        issues: [],
        async: (s = r == null ? void 0 : r.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Ge(t)
    }, n = this._parseSync({ data: t, path: o.path, parent: o });
    return jo(o, n);
  }
  async parseAsync(t, r) {
    const s = await this.safeParseAsync(t, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(t, r) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Ge(t)
    }, o = this._parse({ data: t, path: s.path, parent: s }), n = await (Mr(o) ? o : Promise.resolve(o));
    return jo(s, n);
  }
  refine(t, r) {
    const s = (o) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(o) : r;
    return this._refinement((o, n) => {
      const i = t(o), l = () => n.addIssue({
        code: b.custom,
        ...s(o)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((a) => a ? !0 : (l(), !1)) : i ? !0 : (l(), !1);
    });
  }
  refinement(t, r) {
    return this._refinement((s, o) => t(s) ? !0 : (o.addIssue(typeof r == "function" ? r(s, o) : r), !1));
  }
  _refinement(t) {
    return new Te({
      schema: this,
      typeName: S.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  optional() {
    return Be.create(this, this._def);
  }
  nullable() {
    return ht.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Ce.create(this, this._def);
  }
  promise() {
    return Ot.create(this, this._def);
  }
  or(t) {
    return rr.create([this, t], this._def);
  }
  and(t) {
    return sr.create(this, t, this._def);
  }
  transform(t) {
    return new Te({
      ...E(this._def),
      schema: this,
      typeName: S.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const r = typeof t == "function" ? t : () => t;
    return new ar({
      ...E(this._def),
      innerType: this,
      defaultValue: r,
      typeName: S.ZodDefault
    });
  }
  brand() {
    return new Fn({
      typeName: S.ZodBranded,
      type: this,
      ...E(this._def)
    });
  }
  catch(t) {
    const r = typeof t == "function" ? t : () => t;
    return new Zr({
      ...E(this._def),
      innerType: this,
      catchValue: r,
      typeName: S.ZodCatch
    });
  }
  describe(t) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return hr.create(this, t);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Sa = /^c[^\s-]{8,}$/i, Ca = /^[a-z][a-z0-9]*$/, Aa = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, Ea = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([^-]([a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}))$/, Ta = (e) => e.precision ? e.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}Z$`) : e.precision === 0 ? e.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : e.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
class Ue extends O {
  constructor() {
    super(...arguments), this._regex = (t, r, s) => this.refinement((o) => t.test(o), {
      validation: r,
      code: b.invalid_string,
      ...P.errToObj(s)
    }), this.nonempty = (t) => this.min(1, P.errToObj(t)), this.trim = () => new Ue({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== y.string) {
      const n = this._getOrReturnCtx(t);
      return x(
        n,
        {
          code: b.invalid_type,
          expected: y.string,
          received: n.parsedType
        }
      ), A;
    }
    const s = new ie();
    let o;
    for (const n of this._def.checks)
      if (n.kind === "min")
        t.data.length < n.value && (o = this._getOrReturnCtx(t, o), x(o, {
          code: b.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), s.dirty());
      else if (n.kind === "max")
        t.data.length > n.value && (o = this._getOrReturnCtx(t, o), x(o, {
          code: b.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), s.dirty());
      else if (n.kind === "length") {
        const i = t.data.length > n.value, l = t.data.length < n.value;
        (i || l) && (o = this._getOrReturnCtx(t, o), i ? x(o, {
          code: b.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }) : l && x(o, {
          code: b.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }), s.dirty());
      } else if (n.kind === "email")
        Ea.test(t.data) || (o = this._getOrReturnCtx(t, o), x(o, {
          validation: "email",
          code: b.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "uuid")
        Aa.test(t.data) || (o = this._getOrReturnCtx(t, o), x(o, {
          validation: "uuid",
          code: b.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "cuid")
        Sa.test(t.data) || (o = this._getOrReturnCtx(t, o), x(o, {
          validation: "cuid",
          code: b.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "cuid2")
        Ca.test(t.data) || (o = this._getOrReturnCtx(t, o), x(o, {
          validation: "cuid2",
          code: b.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "url")
        try {
          new URL(t.data);
        } catch {
          o = this._getOrReturnCtx(t, o), x(o, {
            validation: "url",
            code: b.invalid_string,
            message: n.message
          }), s.dirty();
        }
      else
        n.kind === "regex" ? (n.regex.lastIndex = 0, n.regex.test(t.data) || (o = this._getOrReturnCtx(t, o), x(o, {
          validation: "regex",
          code: b.invalid_string,
          message: n.message
        }), s.dirty())) : n.kind === "trim" ? t.data = t.data.trim() : n.kind === "startsWith" ? t.data.startsWith(n.value) || (o = this._getOrReturnCtx(t, o), x(o, {
          code: b.invalid_string,
          validation: { startsWith: n.value },
          message: n.message
        }), s.dirty()) : n.kind === "endsWith" ? t.data.endsWith(n.value) || (o = this._getOrReturnCtx(t, o), x(o, {
          code: b.invalid_string,
          validation: { endsWith: n.value },
          message: n.message
        }), s.dirty()) : n.kind === "datetime" ? Ta(n).test(t.data) || (o = this._getOrReturnCtx(t, o), x(o, {
          code: b.invalid_string,
          validation: "datetime",
          message: n.message
        }), s.dirty()) : R.assertNever(n);
    return { status: s.value, value: t.data };
  }
  _addCheck(t) {
    return new Ue({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...P.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...P.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...P.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...P.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...P.errToObj(t) });
  }
  datetime(t) {
    var r;
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (r = t == null ? void 0 : t.offset) !== null && r !== void 0 ? r : !1,
      ...P.errToObj(t == null ? void 0 : t.message)
    });
  }
  regex(t, r) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...P.errToObj(r)
    });
  }
  startsWith(t, r) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...P.errToObj(r)
    });
  }
  endsWith(t, r) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...P.errToObj(r)
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...P.errToObj(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...P.errToObj(r)
    });
  }
  length(t, r) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...P.errToObj(r)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get minLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
Ue.create = (e) => {
  var t;
  return new Ue({
    checks: [],
    typeName: S.ZodString,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...E(e)
  });
};
function Oa(e, t) {
  const r = (e.toString().split(".")[1] || "").length, s = (t.toString().split(".")[1] || "").length, o = r > s ? r : s, n = parseInt(e.toFixed(o).replace(".", "")), i = parseInt(t.toFixed(o).replace(".", ""));
  return n % i / Math.pow(10, o);
}
class tt extends O {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== y.number) {
      const n = this._getOrReturnCtx(t);
      return x(n, {
        code: b.invalid_type,
        expected: y.number,
        received: n.parsedType
      }), A;
    }
    let s;
    const o = new ie();
    for (const n of this._def.checks)
      n.kind === "int" ? R.isInteger(t.data) || (s = this._getOrReturnCtx(t, s), x(s, {
        code: b.invalid_type,
        expected: "integer",
        received: "float",
        message: n.message
      }), o.dirty()) : n.kind === "min" ? (n.inclusive ? t.data < n.value : t.data <= n.value) && (s = this._getOrReturnCtx(t, s), x(s, {
        code: b.too_small,
        minimum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), o.dirty()) : n.kind === "max" ? (n.inclusive ? t.data > n.value : t.data >= n.value) && (s = this._getOrReturnCtx(t, s), x(s, {
        code: b.too_big,
        maximum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), o.dirty()) : n.kind === "multipleOf" ? Oa(t.data, n.value) !== 0 && (s = this._getOrReturnCtx(t, s), x(s, {
        code: b.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), o.dirty()) : n.kind === "finite" ? Number.isFinite(t.data) || (s = this._getOrReturnCtx(t, s), x(s, {
        code: b.not_finite,
        message: n.message
      }), o.dirty()) : R.assertNever(n);
    return { status: o.value, value: t.data };
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, P.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, P.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, P.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, P.toString(r));
  }
  setLimit(t, r, s, o) {
    return new tt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: s,
          message: P.toString(o)
        }
      ]
    });
  }
  _addCheck(t) {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: P.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: P.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: P.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: P.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: P.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: P.toString(r)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: P.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && R.isInteger(t.value));
  }
  get isFinite() {
    let t = null, r = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (t === null || s.value < t) && (t = s.value);
    }
    return Number.isFinite(r) && Number.isFinite(t);
  }
}
tt.create = (e) => new tt({
  checks: [],
  typeName: S.ZodNumber,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...E(e)
});
class Xt extends O {
  _parse(t) {
    if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== y.bigint) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.bigint,
        received: s.parsedType
      }), A;
    }
    return re(t.data);
  }
}
Xt.create = (e) => {
  var t;
  return new Xt({
    typeName: S.ZodBigInt,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...E(e)
  });
};
class Qt extends O {
  _parse(t) {
    if (this._def.coerce && (t.data = Boolean(t.data)), this._getType(t) !== y.boolean) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.boolean,
        received: s.parsedType
      }), A;
    }
    return re(t.data);
  }
}
Qt.create = (e) => new Qt({
  typeName: S.ZodBoolean,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...E(e)
});
class ut extends O {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== y.date) {
      const n = this._getOrReturnCtx(t);
      return x(n, {
        code: b.invalid_type,
        expected: y.date,
        received: n.parsedType
      }), A;
    }
    if (isNaN(t.data.getTime())) {
      const n = this._getOrReturnCtx(t);
      return x(n, {
        code: b.invalid_date
      }), A;
    }
    const s = new ie();
    let o;
    for (const n of this._def.checks)
      n.kind === "min" ? t.data.getTime() < n.value && (o = this._getOrReturnCtx(t, o), x(o, {
        code: b.too_small,
        message: n.message,
        inclusive: !0,
        exact: !1,
        minimum: n.value,
        type: "date"
      }), s.dirty()) : n.kind === "max" ? t.data.getTime() > n.value && (o = this._getOrReturnCtx(t, o), x(o, {
        code: b.too_big,
        message: n.message,
        inclusive: !0,
        exact: !1,
        maximum: n.value,
        type: "date"
      }), s.dirty()) : R.assertNever(n);
    return {
      status: s.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new ut({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: P.toString(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: P.toString(r)
    });
  }
  get minDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
}
ut.create = (e) => new ut({
  checks: [],
  coerce: (e == null ? void 0 : e.coerce) || !1,
  typeName: S.ZodDate,
  ...E(e)
});
class jr extends O {
  _parse(t) {
    if (this._getType(t) !== y.symbol) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.symbol,
        received: s.parsedType
      }), A;
    }
    return re(t.data);
  }
}
jr.create = (e) => new jr({
  typeName: S.ZodSymbol,
  ...E(e)
});
class er extends O {
  _parse(t) {
    if (this._getType(t) !== y.undefined) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.undefined,
        received: s.parsedType
      }), A;
    }
    return re(t.data);
  }
}
er.create = (e) => new er({
  typeName: S.ZodUndefined,
  ...E(e)
});
class tr extends O {
  _parse(t) {
    if (this._getType(t) !== y.null) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.null,
        received: s.parsedType
      }), A;
    }
    return re(t.data);
  }
}
tr.create = (e) => new tr({
  typeName: S.ZodNull,
  ...E(e)
});
class Tt extends O {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return re(t.data);
  }
}
Tt.create = (e) => new Tt({
  typeName: S.ZodAny,
  ...E(e)
});
class ct extends O {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return re(t.data);
  }
}
ct.create = (e) => new ct({
  typeName: S.ZodUnknown,
  ...E(e)
});
class Ze extends O {
  _parse(t) {
    const r = this._getOrReturnCtx(t);
    return x(r, {
      code: b.invalid_type,
      expected: y.never,
      received: r.parsedType
    }), A;
  }
}
Ze.create = (e) => new Ze({
  typeName: S.ZodNever,
  ...E(e)
});
class Br extends O {
  _parse(t) {
    if (this._getType(t) !== y.undefined) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.void,
        received: s.parsedType
      }), A;
    }
    return re(t.data);
  }
}
Br.create = (e) => new Br({
  typeName: S.ZodVoid,
  ...E(e)
});
class Ce extends O {
  _parse(t) {
    const { ctx: r, status: s } = this._processInputParams(t), o = this._def;
    if (r.parsedType !== y.array)
      return x(r, {
        code: b.invalid_type,
        expected: y.array,
        received: r.parsedType
      }), A;
    if (o.exactLength !== null) {
      const i = r.data.length > o.exactLength.value, l = r.data.length < o.exactLength.value;
      (i || l) && (x(r, {
        code: i ? b.too_big : b.too_small,
        minimum: l ? o.exactLength.value : void 0,
        maximum: i ? o.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: o.exactLength.message
      }), s.dirty());
    }
    if (o.minLength !== null && r.data.length < o.minLength.value && (x(r, {
      code: b.too_small,
      minimum: o.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.minLength.message
    }), s.dirty()), o.maxLength !== null && r.data.length > o.maxLength.value && (x(r, {
      code: b.too_big,
      maximum: o.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.maxLength.message
    }), s.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, l) => o.type._parseAsync(new Ie(r, i, r.path, l)))).then((i) => ie.mergeArray(s, i));
    const n = [...r.data].map((i, l) => o.type._parseSync(new Ie(r, i, r.path, l)));
    return ie.mergeArray(s, n);
  }
  get element() {
    return this._def.type;
  }
  min(t, r) {
    return new Ce({
      ...this._def,
      minLength: { value: t, message: P.toString(r) }
    });
  }
  max(t, r) {
    return new Ce({
      ...this._def,
      maxLength: { value: t, message: P.toString(r) }
    });
  }
  length(t, r) {
    return new Ce({
      ...this._def,
      exactLength: { value: t, message: P.toString(r) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Ce.create = (e, t) => new Ce({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: S.ZodArray,
  ...E(t)
});
var Vr;
(function(e) {
  e.mergeShapes = (t, r) => ({
    ...t,
    ...r
  });
})(Vr || (Vr = {}));
function vt(e) {
  if (e instanceof W) {
    const t = {};
    for (const r in e.shape) {
      const s = e.shape[r];
      t[r] = Be.create(vt(s));
    }
    return new W({
      ...e._def,
      shape: () => t
    });
  } else
    return e instanceof Ce ? Ce.create(vt(e.element)) : e instanceof Be ? Be.create(vt(e.unwrap())) : e instanceof ht ? ht.create(vt(e.unwrap())) : e instanceof Re ? Re.create(e.items.map((t) => vt(t))) : e;
}
class W extends O {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), r = R.objectKeys(t);
    return this._cached = { shape: t, keys: r };
  }
  _parse(t) {
    if (this._getType(t) !== y.object) {
      const c = this._getOrReturnCtx(t);
      return x(c, {
        code: b.invalid_type,
        expected: y.object,
        received: c.parsedType
      }), A;
    }
    const { status: s, ctx: o } = this._processInputParams(t), { shape: n, keys: i } = this._getCached(), l = [];
    if (!(this._def.catchall instanceof Ze && this._def.unknownKeys === "strip"))
      for (const c in o.data)
        i.includes(c) || l.push(c);
    const a = [];
    for (const c of i) {
      const u = n[c], h = o.data[c];
      a.push({
        key: { status: "valid", value: c },
        value: u._parse(new Ie(o, h, o.path, c)),
        alwaysSet: c in o.data
      });
    }
    if (this._def.catchall instanceof Ze) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const u of l)
          a.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: o.data[u] }
          });
      else if (c === "strict")
        l.length > 0 && (x(o, {
          code: b.unrecognized_keys,
          keys: l
        }), s.dirty());
      else if (c !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const u of l) {
        const h = o.data[u];
        a.push({
          key: { status: "valid", value: u },
          value: c._parse(
            new Ie(o, h, o.path, u)
          ),
          alwaysSet: u in o.data
        });
      }
    }
    return o.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const u of a) {
        const h = await u.key;
        c.push({
          key: h,
          value: await u.value,
          alwaysSet: u.alwaysSet
        });
      }
      return c;
    }).then((c) => ie.mergeObjectSync(s, c)) : ie.mergeObjectSync(s, a);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return P.errToObj, new W({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (r, s) => {
          var o, n, i, l;
          const a = (i = (n = (o = this._def).errorMap) === null || n === void 0 ? void 0 : n.call(o, r, s).message) !== null && i !== void 0 ? i : s.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (l = P.errToObj(t).message) !== null && l !== void 0 ? l : a
          } : {
            message: a
          };
        }
      } : {}
    });
  }
  strip() {
    return new W({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new W({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(t) {
    return new W({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  merge(t) {
    return new W({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => Vr.mergeShapes(this._def.shape(), t._def.shape()),
      typeName: S.ZodObject
    });
  }
  setKey(t, r) {
    return this.augment({ [t]: r });
  }
  catchall(t) {
    return new W({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const r = {};
    return R.objectKeys(t).forEach((s) => {
      t[s] && this.shape[s] && (r[s] = this.shape[s]);
    }), new W({
      ...this._def,
      shape: () => r
    });
  }
  omit(t) {
    const r = {};
    return R.objectKeys(this.shape).forEach((s) => {
      t[s] || (r[s] = this.shape[s]);
    }), new W({
      ...this._def,
      shape: () => r
    });
  }
  deepPartial() {
    return vt(this);
  }
  partial(t) {
    const r = {};
    return R.objectKeys(this.shape).forEach((s) => {
      const o = this.shape[s];
      t && !t[s] ? r[s] = o : r[s] = o.optional();
    }), new W({
      ...this._def,
      shape: () => r
    });
  }
  required(t) {
    const r = {};
    return R.objectKeys(this.shape).forEach((s) => {
      if (t && !t[s])
        r[s] = this.shape[s];
      else {
        let n = this.shape[s];
        for (; n instanceof Be; )
          n = n._def.innerType;
        r[s] = n;
      }
    }), new W({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Zn(R.objectKeys(this.shape));
  }
}
W.create = (e, t) => new W({
  shape: () => e,
  unknownKeys: "strip",
  catchall: Ze.create(),
  typeName: S.ZodObject,
  ...E(t)
});
W.strictCreate = (e, t) => new W({
  shape: () => e,
  unknownKeys: "strict",
  catchall: Ze.create(),
  typeName: S.ZodObject,
  ...E(t)
});
W.lazycreate = (e, t) => new W({
  shape: e,
  unknownKeys: "strip",
  catchall: Ze.create(),
  typeName: S.ZodObject,
  ...E(t)
});
class rr extends O {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), s = this._def.options;
    function o(n) {
      for (const l of n)
        if (l.result.status === "valid")
          return l.result;
      for (const l of n)
        if (l.result.status === "dirty")
          return r.common.issues.push(...l.ctx.common.issues), l.result;
      const i = n.map((l) => new je(l.ctx.common.issues));
      return x(r, {
        code: b.invalid_union,
        unionErrors: i
      }), A;
    }
    if (r.common.async)
      return Promise.all(s.map(async (n) => {
        const i = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await n._parseAsync({
            data: r.data,
            path: r.path,
            parent: i
          }),
          ctx: i
        };
      })).then(o);
    {
      let n;
      const i = [];
      for (const a of s) {
        const c = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, u = a._parseSync({
          data: r.data,
          path: r.path,
          parent: c
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !n && (n = { result: u, ctx: c }), c.common.issues.length && i.push(c.common.issues);
      }
      if (n)
        return r.common.issues.push(...n.ctx.common.issues), n.result;
      const l = i.map((a) => new je(a));
      return x(r, {
        code: b.invalid_union,
        unionErrors: l
      }), A;
    }
  }
  get options() {
    return this._def.options;
  }
}
rr.create = (e, t) => new rr({
  options: e,
  typeName: S.ZodUnion,
  ...E(t)
});
const wr = (e) => e instanceof nr ? wr(e.schema) : e instanceof Te ? wr(e.innerType()) : e instanceof ir ? [e.value] : e instanceof rt ? e.options : e instanceof lr ? Object.keys(e.enum) : e instanceof ar ? wr(e._def.innerType) : e instanceof er ? [void 0] : e instanceof tr ? [null] : null;
class es extends O {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== y.object)
      return x(r, {
        code: b.invalid_type,
        expected: y.object,
        received: r.parsedType
      }), A;
    const s = this.discriminator, o = r.data[s], n = this.optionsMap.get(o);
    return n ? r.common.async ? n._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : n._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (x(r, {
      code: b.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), A);
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
  static create(t, r, s) {
    const o = /* @__PURE__ */ new Map();
    for (const n of r) {
      const i = wr(n.shape[t]);
      if (!i)
        throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
      for (const l of i) {
        if (o.has(l))
          throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(l)}`);
        o.set(l, n);
      }
    }
    return new es({
      typeName: S.ZodDiscriminatedUnion,
      discriminator: t,
      options: r,
      optionsMap: o,
      ...E(s)
    });
  }
}
function Ps(e, t) {
  const r = Ge(e), s = Ge(t);
  if (e === t)
    return { valid: !0, data: e };
  if (r === y.object && s === y.object) {
    const o = R.objectKeys(t), n = R.objectKeys(e).filter((l) => o.indexOf(l) !== -1), i = { ...e, ...t };
    for (const l of n) {
      const a = Ps(e[l], t[l]);
      if (!a.valid)
        return { valid: !1 };
      i[l] = a.data;
    }
    return { valid: !0, data: i };
  } else if (r === y.array && s === y.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const o = [];
    for (let n = 0; n < e.length; n++) {
      const i = e[n], l = t[n], a = Ps(i, l);
      if (!a.valid)
        return { valid: !1 };
      o.push(a.data);
    }
    return { valid: !0, data: o };
  } else
    return r === y.date && s === y.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class sr extends O {
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t), o = (n, i) => {
      if (Os(n) || Os(i))
        return A;
      const l = Ps(n.value, i.value);
      return l.valid ? ((zs(n) || zs(i)) && r.dirty(), { status: r.value, value: l.data }) : (x(s, {
        code: b.invalid_intersection_types
      }), A);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([n, i]) => o(n, i)) : o(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
sr.create = (e, t, r) => new sr({
  left: e,
  right: t,
  typeName: S.ZodIntersection,
  ...E(r)
});
class Re extends O {
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== y.array)
      return x(s, {
        code: b.invalid_type,
        expected: y.array,
        received: s.parsedType
      }), A;
    if (s.data.length < this._def.items.length)
      return x(s, {
        code: b.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), A;
    !this._def.rest && s.data.length > this._def.items.length && (x(s, {
      code: b.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const n = [...s.data].map((i, l) => {
      const a = this._def.items[l] || this._def.rest;
      return a ? a._parse(new Ie(s, i, s.path, l)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(n).then((i) => ie.mergeArray(r, i)) : ie.mergeArray(r, n);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new Re({
      ...this._def,
      rest: t
    });
  }
}
Re.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Re({
    items: e,
    typeName: S.ZodTuple,
    rest: null,
    ...E(t)
  });
};
class or extends O {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== y.object)
      return x(s, {
        code: b.invalid_type,
        expected: y.object,
        received: s.parsedType
      }), A;
    const o = [], n = this._def.keyType, i = this._def.valueType;
    for (const l in s.data)
      o.push({
        key: n._parse(new Ie(s, l, s.path, l)),
        value: i._parse(new Ie(s, s.data[l], s.path, l))
      });
    return s.common.async ? ie.mergeObjectAsync(r, o) : ie.mergeObjectSync(r, o);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, r, s) {
    return r instanceof O ? new or({
      keyType: t,
      valueType: r,
      typeName: S.ZodRecord,
      ...E(s)
    }) : new or({
      keyType: Ue.create(),
      valueType: t,
      typeName: S.ZodRecord,
      ...E(r)
    });
  }
}
class Ur extends O {
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== y.map)
      return x(s, {
        code: b.invalid_type,
        expected: y.map,
        received: s.parsedType
      }), A;
    const o = this._def.keyType, n = this._def.valueType, i = [...s.data.entries()].map(([l, a], c) => ({
      key: o._parse(new Ie(s, l, s.path, [c, "key"])),
      value: n._parse(new Ie(s, a, s.path, [c, "value"]))
    }));
    if (s.common.async) {
      const l = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const a of i) {
          const c = await a.key, u = await a.value;
          if (c.status === "aborted" || u.status === "aborted")
            return A;
          (c.status === "dirty" || u.status === "dirty") && r.dirty(), l.set(c.value, u.value);
        }
        return { status: r.value, value: l };
      });
    } else {
      const l = /* @__PURE__ */ new Map();
      for (const a of i) {
        const c = a.key, u = a.value;
        if (c.status === "aborted" || u.status === "aborted")
          return A;
        (c.status === "dirty" || u.status === "dirty") && r.dirty(), l.set(c.value, u.value);
      }
      return { status: r.value, value: l };
    }
  }
}
Ur.create = (e, t, r) => new Ur({
  valueType: t,
  keyType: e,
  typeName: S.ZodMap,
  ...E(r)
});
class dt extends O {
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== y.set)
      return x(s, {
        code: b.invalid_type,
        expected: y.set,
        received: s.parsedType
      }), A;
    const o = this._def;
    o.minSize !== null && s.data.size < o.minSize.value && (x(s, {
      code: b.too_small,
      minimum: o.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.minSize.message
    }), r.dirty()), o.maxSize !== null && s.data.size > o.maxSize.value && (x(s, {
      code: b.too_big,
      maximum: o.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.maxSize.message
    }), r.dirty());
    const n = this._def.valueType;
    function i(a) {
      const c = /* @__PURE__ */ new Set();
      for (const u of a) {
        if (u.status === "aborted")
          return A;
        u.status === "dirty" && r.dirty(), c.add(u.value);
      }
      return { status: r.value, value: c };
    }
    const l = [...s.data.values()].map((a, c) => n._parse(new Ie(s, a, s.path, c)));
    return s.common.async ? Promise.all(l).then((a) => i(a)) : i(l);
  }
  min(t, r) {
    return new dt({
      ...this._def,
      minSize: { value: t, message: P.toString(r) }
    });
  }
  max(t, r) {
    return new dt({
      ...this._def,
      maxSize: { value: t, message: P.toString(r) }
    });
  }
  size(t, r) {
    return this.min(t, r).max(t, r);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
dt.create = (e, t) => new dt({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: S.ZodSet,
  ...E(t)
});
class wt extends O {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== y.function)
      return x(r, {
        code: b.invalid_type,
        expected: y.function,
        received: r.parsedType
      }), A;
    function s(l, a) {
      return Rr({
        data: l,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Ir(),
          Jt
        ].filter((c) => !!c),
        issueData: {
          code: b.invalid_arguments,
          argumentsError: a
        }
      });
    }
    function o(l, a) {
      return Rr({
        data: l,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Ir(),
          Jt
        ].filter((c) => !!c),
        issueData: {
          code: b.invalid_return_type,
          returnTypeError: a
        }
      });
    }
    const n = { errorMap: r.common.contextualErrorMap }, i = r.data;
    return this._def.returns instanceof Ot ? re(async (...l) => {
      const a = new je([]), c = await this._def.args.parseAsync(l, n).catch((p) => {
        throw a.addIssue(s(l, p)), a;
      }), u = await i(...c);
      return await this._def.returns._def.type.parseAsync(u, n).catch((p) => {
        throw a.addIssue(o(u, p)), a;
      });
    }) : re((...l) => {
      const a = this._def.args.safeParse(l, n);
      if (!a.success)
        throw new je([s(l, a.error)]);
      const c = i(...a.data), u = this._def.returns.safeParse(c, n);
      if (!u.success)
        throw new je([o(c, u.error)]);
      return u.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new wt({
      ...this._def,
      args: Re.create(t).rest(ct.create())
    });
  }
  returns(t) {
    return new wt({
      ...this._def,
      returns: t
    });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, r, s) {
    return new wt({
      args: t || Re.create([]).rest(ct.create()),
      returns: r || ct.create(),
      typeName: S.ZodFunction,
      ...E(s)
    });
  }
}
class nr extends O {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
nr.create = (e, t) => new nr({
  getter: e,
  typeName: S.ZodLazy,
  ...E(t)
});
class ir extends O {
  _parse(t) {
    if (t.data !== this._def.value) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        received: r.data,
        code: b.invalid_literal,
        expected: this._def.value
      }), A;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
ir.create = (e, t) => new ir({
  value: e,
  typeName: S.ZodLiteral,
  ...E(t)
});
function Zn(e, t) {
  return new rt({
    values: e,
    typeName: S.ZodEnum,
    ...E(t)
  });
}
class rt extends O {
  _parse(t) {
    if (typeof t.data != "string") {
      const r = this._getOrReturnCtx(t), s = this._def.values;
      return x(r, {
        expected: R.joinValues(s),
        received: r.parsedType,
        code: b.invalid_type
      }), A;
    }
    if (this._def.values.indexOf(t.data) === -1) {
      const r = this._getOrReturnCtx(t), s = this._def.values;
      return x(r, {
        received: r.data,
        code: b.invalid_enum_value,
        options: s
      }), A;
    }
    return re(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Values() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  extract(t) {
    return rt.create(t);
  }
  exclude(t) {
    return rt.create(this.options.filter((r) => !t.includes(r)));
  }
}
rt.create = Zn;
class lr extends O {
  _parse(t) {
    const r = R.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(t);
    if (s.parsedType !== y.string && s.parsedType !== y.number) {
      const o = R.objectValues(r);
      return x(s, {
        expected: R.joinValues(o),
        received: s.parsedType,
        code: b.invalid_type
      }), A;
    }
    if (r.indexOf(t.data) === -1) {
      const o = R.objectValues(r);
      return x(s, {
        received: s.data,
        code: b.invalid_enum_value,
        options: o
      }), A;
    }
    return re(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
lr.create = (e, t) => new lr({
  values: e,
  typeName: S.ZodNativeEnum,
  ...E(t)
});
class Ot extends O {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== y.promise && r.common.async === !1)
      return x(r, {
        code: b.invalid_type,
        expected: y.promise,
        received: r.parsedType
      }), A;
    const s = r.parsedType === y.promise ? r.data : Promise.resolve(r.data);
    return re(s.then((o) => this._def.type.parseAsync(o, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
Ot.create = (e, t) => new Ot({
  type: e,
  typeName: S.ZodPromise,
  ...E(t)
});
class Te extends O {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === S.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t), o = this._def.effect || null;
    if (o.type === "preprocess") {
      const i = o.transform(s.data);
      return s.common.async ? Promise.resolve(i).then((l) => this._def.schema._parseAsync({
        data: l,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: i,
        path: s.path,
        parent: s
      });
    }
    const n = {
      addIssue: (i) => {
        x(s, i), i.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (n.addIssue = n.addIssue.bind(n), o.type === "refinement") {
      const i = (l) => {
        const a = o.refinement(l, n);
        if (s.common.async)
          return Promise.resolve(a);
        if (a instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return l;
      };
      if (s.common.async === !1) {
        const l = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return l.status === "aborted" ? A : (l.status === "dirty" && r.dirty(), i(l.value), { status: r.value, value: l.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((l) => l.status === "aborted" ? A : (l.status === "dirty" && r.dirty(), i(l.value).then(() => ({ status: r.value, value: l.value }))));
    }
    if (o.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!Dr(i))
          return i;
        const l = o.transform(i.value, n);
        if (l instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: l };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => Dr(i) ? Promise.resolve(o.transform(i.value, n)).then((l) => ({ status: r.value, value: l })) : i);
    R.assertNever(o);
  }
}
Te.create = (e, t, r) => new Te({
  schema: e,
  typeName: S.ZodEffects,
  effect: t,
  ...E(r)
});
Te.createWithPreprocess = (e, t, r) => new Te({
  schema: t,
  effect: { type: "preprocess", transform: e },
  typeName: S.ZodEffects,
  ...E(r)
});
class Be extends O {
  _parse(t) {
    return this._getType(t) === y.undefined ? re(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Be.create = (e, t) => new Be({
  innerType: e,
  typeName: S.ZodOptional,
  ...E(t)
});
class ht extends O {
  _parse(t) {
    return this._getType(t) === y.null ? re(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ht.create = (e, t) => new ht({
  innerType: e,
  typeName: S.ZodNullable,
  ...E(t)
});
class ar extends O {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    let s = r.data;
    return r.parsedType === y.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ar.create = (e, t) => new ar({
  innerType: e,
  typeName: S.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...E(t)
});
class Zr extends O {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), s = this._def.innerType._parse({
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
    return Mr(s) ? s.then((o) => ({
      status: "valid",
      value: o.status === "valid" ? o.value : this._def.catchValue()
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue()
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Zr.create = (e, t) => new Zr({
  innerType: e,
  typeName: S.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...E(t)
});
class Fr extends O {
  _parse(t) {
    if (this._getType(t) !== y.nan) {
      const s = this._getOrReturnCtx(t);
      return x(s, {
        code: b.invalid_type,
        expected: y.nan,
        received: s.parsedType
      }), A;
    }
    return { status: "valid", value: t.data };
  }
}
Fr.create = (e) => new Fr({
  typeName: S.ZodNaN,
  ...E(e)
});
const za = Symbol("zod_brand");
class Fn extends O {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), s = r.data;
    return this._def.type._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class hr extends O {
  _parse(t) {
    const { status: r, ctx: s } = this._processInputParams(t);
    if (s.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return n.status === "aborted" ? A : n.status === "dirty" ? (r.dirty(), Un(n.value)) : this._def.out._parseAsync({
          data: n.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const o = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return o.status === "aborted" ? A : o.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: o.value
      }) : this._def.out._parseSync({
        data: o.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(t, r) {
    return new hr({
      in: t,
      out: r,
      typeName: S.ZodPipeline
    });
  }
}
const Hn = (e, t = {}, r) => e ? Tt.create().superRefine((s, o) => {
  if (!e(s)) {
    const n = typeof t == "function" ? t(s) : t, i = typeof n == "string" ? { message: n } : n;
    o.addIssue({ code: "custom", ...i, fatal: r });
  }
}) : Tt.create(), Pa = {
  object: W.lazycreate
};
var S;
(function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline";
})(S || (S = {}));
const La = (e, t = {
  message: `Input not instance of ${e.name}`
}) => Hn((r) => r instanceof e, t, !0), qn = Ue.create, Wn = tt.create, Na = Fr.create, Ia = Xt.create, Kn = Qt.create, Ra = ut.create, Da = jr.create, Ma = er.create, ja = tr.create, Ba = Tt.create, Va = ct.create, Ua = Ze.create, Za = Br.create, Fa = Ce.create, Ha = W.create, qa = W.strictCreate, Wa = rr.create, Ka = es.create, Ga = sr.create, Ya = Re.create, Ja = or.create, Xa = Ur.create, Qa = dt.create, ec = wt.create, tc = nr.create, rc = ir.create, sc = rt.create, oc = lr.create, nc = Ot.create, Bo = Te.create, ic = Be.create, lc = ht.create, ac = Te.createWithPreprocess, cc = hr.create, uc = () => qn().optional(), dc = () => Wn().optional(), hc = () => Kn().optional(), pc = {
  string: (e) => Ue.create({ ...e, coerce: !0 }),
  number: (e) => tt.create({ ...e, coerce: !0 }),
  boolean: (e) => Qt.create({
    ...e,
    coerce: !0
  }),
  bigint: (e) => Xt.create({ ...e, coerce: !0 }),
  date: (e) => ut.create({ ...e, coerce: !0 })
}, fc = A;
var $e = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Jt,
  setErrorMap: ka,
  getErrorMap: Ir,
  makeIssue: Rr,
  EMPTY_PATH: $a,
  addIssueToContext: x,
  ParseStatus: ie,
  INVALID: A,
  DIRTY: Un,
  OK: re,
  isAborted: Os,
  isDirty: zs,
  isValid: Dr,
  isAsync: Mr,
  get util() {
    return R;
  },
  ZodParsedType: y,
  getParsedType: Ge,
  ZodType: O,
  ZodString: Ue,
  ZodNumber: tt,
  ZodBigInt: Xt,
  ZodBoolean: Qt,
  ZodDate: ut,
  ZodSymbol: jr,
  ZodUndefined: er,
  ZodNull: tr,
  ZodAny: Tt,
  ZodUnknown: ct,
  ZodNever: Ze,
  ZodVoid: Br,
  ZodArray: Ce,
  get objectUtil() {
    return Vr;
  },
  ZodObject: W,
  ZodUnion: rr,
  ZodDiscriminatedUnion: es,
  ZodIntersection: sr,
  ZodTuple: Re,
  ZodRecord: or,
  ZodMap: Ur,
  ZodSet: dt,
  ZodFunction: wt,
  ZodLazy: nr,
  ZodLiteral: ir,
  ZodEnum: rt,
  ZodNativeEnum: lr,
  ZodPromise: Ot,
  ZodEffects: Te,
  ZodTransformer: Te,
  ZodOptional: Be,
  ZodNullable: ht,
  ZodDefault: ar,
  ZodCatch: Zr,
  ZodNaN: Fr,
  BRAND: za,
  ZodBranded: Fn,
  ZodPipeline: hr,
  custom: Hn,
  Schema: O,
  ZodSchema: O,
  late: Pa,
  get ZodFirstPartyTypeKind() {
    return S;
  },
  coerce: pc,
  any: Ba,
  array: Fa,
  bigint: Ia,
  boolean: Kn,
  date: Ra,
  discriminatedUnion: Ka,
  effect: Bo,
  enum: sc,
  function: ec,
  instanceof: La,
  intersection: Ga,
  lazy: tc,
  literal: rc,
  map: Xa,
  nan: Na,
  nativeEnum: oc,
  never: Ua,
  null: ja,
  nullable: lc,
  number: Wn,
  object: Ha,
  oboolean: hc,
  onumber: dc,
  optional: ic,
  ostring: uc,
  pipeline: cc,
  preprocess: ac,
  promise: nc,
  record: Ja,
  set: Qa,
  strictObject: qa,
  string: qn,
  symbol: Da,
  transformer: Bo,
  tuple: Ya,
  undefined: Ma,
  union: Wa,
  unknown: Va,
  void: Za,
  NEVER: fc,
  ZodIssueCode: b,
  quotelessJson: xa,
  ZodError: je
}), mc = le`
  ${be}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`, Dt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), gs = /* @__PURE__ */ new Set(), br = /* @__PURE__ */ new WeakMap(), Ks = class {
  constructor(e, t) {
    (this.host = e).addController(this), this.options = H({
      form: (r) => {
        if (r.hasAttribute("form") && r.getAttribute("form") !== "") {
          const s = r.getRootNode(), o = r.getAttribute("form");
          if (o)
            return s.getElementById(o);
        }
        return r.closest("form");
      },
      name: (r) => r.name,
      value: (r) => r.value,
      defaultValue: (r) => r.defaultValue,
      disabled: (r) => {
        var s;
        return (s = r.disabled) != null ? s : !1;
      },
      reportValidity: (r) => typeof r.reportValidity == "function" ? r.reportValidity() : !0,
      setValue: (r, s) => r.value = s,
      assumeInteractionOn: ["sl-input"]
    }, t), this.handleFormData = this.handleFormData.bind(this), this.handleFormSubmit = this.handleFormSubmit.bind(this), this.handleFormReset = this.handleFormReset.bind(this), this.reportFormValidity = this.reportFormValidity.bind(this), this.handleInteraction = this.handleInteraction.bind(this);
  }
  hostConnected() {
    const e = this.options.form(this.host);
    e && this.attachForm(e), br.set(this.host, []), this.options.assumeInteractionOn.forEach((t) => {
      this.host.addEventListener(t, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm(), br.delete(this.host), this.options.assumeInteractionOn.forEach((e) => {
      this.host.removeEventListener(e, this.handleInteraction);
    });
  }
  hostUpdated() {
    const e = this.options.form(this.host);
    e || this.detachForm(), e && this.form !== e && (this.detachForm(), this.attachForm(e)), this.host.hasUpdated && this.setValidity(this.host.validity.valid);
  }
  attachForm(e) {
    e ? (this.form = e, Dt.has(this.form) ? Dt.get(this.form).add(this.host) : Dt.set(this.form, /* @__PURE__ */ new Set([this.host])), this.form.addEventListener("formdata", this.handleFormData), this.form.addEventListener("submit", this.handleFormSubmit), this.form.addEventListener("reset", this.handleFormReset), Mt.has(this.form) || (Mt.set(this.form, this.form.reportValidity), this.form.reportValidity = () => this.reportFormValidity())) : this.form = void 0;
  }
  detachForm() {
    var e;
    this.form && ((e = Dt.get(this.form)) == null || e.delete(this.host), this.form.removeEventListener("formdata", this.handleFormData), this.form.removeEventListener("submit", this.handleFormSubmit), this.form.removeEventListener("reset", this.handleFormReset), Mt.has(this.form) && (this.form.reportValidity = Mt.get(this.form), Mt.delete(this.form))), this.form = void 0;
  }
  handleFormData(e) {
    const t = this.options.disabled(this.host), r = this.options.name(this.host), s = this.options.value(this.host), o = this.host.tagName.toLowerCase() === "sl-button";
    !t && !o && typeof r == "string" && r.length > 0 && typeof s < "u" && (Array.isArray(s) ? s.forEach((n) => {
      e.formData.append(r, n.toString());
    }) : e.formData.append(r, s.toString()));
  }
  handleFormSubmit(e) {
    var t;
    const r = this.options.disabled(this.host), s = this.options.reportValidity;
    this.form && !this.form.noValidate && ((t = Dt.get(this.form)) == null || t.forEach((o) => {
      this.setUserInteracted(o, !0);
    })), this.form && !this.form.noValidate && !r && !s(this.host) && (e.preventDefault(), e.stopImmediatePropagation());
  }
  handleFormReset() {
    this.options.setValue(this.host, this.options.defaultValue(this.host)), this.setUserInteracted(this.host, !1), br.set(this.host, []);
  }
  handleInteraction(e) {
    const t = br.get(this.host);
    t.includes(e.type) || t.push(e.type), t.length === this.options.assumeInteractionOn.length && this.setUserInteracted(this.host, !0);
  }
  reportFormValidity() {
    if (this.form && !this.form.noValidate) {
      const e = this.form.querySelectorAll("*");
      for (const t of e)
        if (typeof t.reportValidity == "function" && !t.reportValidity())
          return !1;
    }
    return !0;
  }
  setUserInteracted(e, t) {
    t ? gs.add(e) : gs.delete(e), e.requestUpdate();
  }
  doAction(e, t) {
    if (this.form) {
      const r = document.createElement("button");
      r.type = e, r.style.position = "absolute", r.style.width = "0", r.style.height = "0", r.style.clipPath = "inset(50%)", r.style.overflow = "hidden", r.style.whiteSpace = "nowrap", t && (r.name = t.name, r.value = t.value, ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((s) => {
        t.hasAttribute(s) && r.setAttribute(s, t.getAttribute(s));
      })), this.form.append(r), r.click(), r.remove();
    }
  }
  getForm() {
    var e;
    return (e = this.form) != null ? e : null;
  }
  reset(e) {
    this.doAction("reset", e);
  }
  submit(e) {
    this.doAction("submit", e);
  }
  setValidity(e) {
    const t = this.host, r = Boolean(gs.has(t)), s = Boolean(t.required);
    t.toggleAttribute("data-required", s), t.toggleAttribute("data-optional", !s), t.toggleAttribute("data-invalid", !e), t.toggleAttribute("data-valid", e), t.toggleAttribute("data-user-invalid", !e && r), t.toggleAttribute("data-user-valid", e && r);
  }
  updateValidity() {
    const e = this.host;
    this.setValidity(e.validity.valid);
  }
  emitInvalidEvent(e) {
    const t = new CustomEvent("sl-invalid", {
      bubbles: !1,
      composed: !1,
      cancelable: !0
    });
    e || t.preventDefault(), this.host.dispatchEvent(t) || e == null || e.preventDefault();
  }
}, Gs = Object.freeze({
  badInput: !1,
  customError: !1,
  patternMismatch: !1,
  rangeOverflow: !1,
  rangeUnderflow: !1,
  stepMismatch: !1,
  tooLong: !1,
  tooShort: !1,
  typeMismatch: !1,
  valid: !0,
  valueMissing: !1
});
Object.freeze(pe(H({}, Gs), {
  valid: !1,
  valueMissing: !0
}));
Object.freeze(pe(H({}, Gs), {
  valid: !1,
  customError: !0
}));
var Ys = class {
  constructor(e, ...t) {
    this.slotNames = [], (this.host = e).addController(this), this.slotNames = t, this.handleSlotChange = this.handleSlotChange.bind(this);
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((e) => {
      if (e.nodeType === e.TEXT_NODE && e.textContent.trim() !== "")
        return !0;
      if (e.nodeType === e.ELEMENT_NODE) {
        const t = e;
        if (t.tagName.toLowerCase() === "sl-visually-hidden")
          return !1;
        if (!t.hasAttribute("slot"))
          return !0;
      }
      return !1;
    });
  }
  hasNamedSlot(e) {
    return this.host.querySelector(`:scope > [slot="${e}"]`) !== null;
  }
  test(e) {
    return e === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(e);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  handleSlotChange(e) {
    const t = e.target;
    (this.slotNames.includes("[default]") && !t.name || t.name && this.slotNames.includes(t.name)) && this.host.requestUpdate();
  }
}, M = class extends ae {
  constructor() {
    super(...arguments), this.formControlController = new Ks(this, {
      form: (e) => {
        if (e.hasAttribute("form")) {
          const t = e.getRootNode(), r = e.getAttribute("form");
          return t.getElementById(r);
        }
        return e.closest("form");
      },
      assumeInteractionOn: ["click"]
    }), this.hasSlotController = new Ys(this, "[default]", "prefix", "suffix"), this.localize = new nt(this), this.hasFocus = !1, this.invalid = !1, this.title = "", this.variant = "default", this.size = "medium", this.caret = !1, this.disabled = !1, this.loading = !1, this.outline = !1, this.pill = !1, this.circle = !1, this.type = "button", this.name = "", this.value = "", this.href = "", this.rel = "noreferrer noopener";
  }
  get validity() {
    return this.isButton() ? this.button.validity : Gs;
  }
  get validationMessage() {
    return this.isButton() ? this.button.validationMessage : "";
  }
  connectedCallback() {
    super.connectedCallback(), this.handleHostClick = this.handleHostClick.bind(this), this.addEventListener("click", this.handleHostClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.handleHostClick);
  }
  firstUpdated() {
    this.isButton() && this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleClick() {
    this.type === "submit" && this.formControlController.submit(this), this.type === "reset" && this.formControlController.reset(this);
  }
  handleHostClick(e) {
    (this.disabled || this.loading) && (e.preventDefault(), e.stopImmediatePropagation());
  }
  handleInvalid(e) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(e);
  }
  isButton() {
    return !this.href;
  }
  isLink() {
    return !!this.href;
  }
  handleDisabledChange() {
    this.isButton() && this.formControlController.setValidity(this.disabled);
  }
  click() {
    this.button.click();
  }
  focus(e) {
    this.button.focus(e);
  }
  blur() {
    this.button.blur();
  }
  checkValidity() {
    return this.isButton() ? this.button.checkValidity() : !0;
  }
  reportValidity() {
    return this.isButton() ? this.button.reportValidity() : !0;
  }
  setCustomValidity(e) {
    this.isButton() && (this.button.setCustomValidity(e), this.formControlController.updateValidity());
  }
  render() {
    const e = this.isLink(), t = e ? Nr`a` : Nr`button`;
    return _r`
      <${t}
        part="base"
        class=${fe({
      button: !0,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${N(e ? void 0 : this.disabled)}
        type=${N(e ? void 0 : this.type)}
        title=${this.title}
        name=${N(e ? void 0 : this.name)}
        value=${N(e ? void 0 : this.value)}
        href=${N(e ? this.href : void 0)}
        target=${N(e ? this.target : void 0)}
        download=${N(e ? this.download : void 0)}
        rel=${N(e ? this.rel : void 0)}
        role=${N(e ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? _r` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? _r`<sl-spinner></sl-spinner>` : ""}
      </${t}>
    `;
  }
};
M.styles = mc;
d([
  se(".button")
], M.prototype, "button", 2);
d([
  ue()
], M.prototype, "hasFocus", 2);
d([
  ue()
], M.prototype, "invalid", 2);
d([
  f()
], M.prototype, "title", 2);
d([
  f({ reflect: !0 })
], M.prototype, "variant", 2);
d([
  f({ reflect: !0 })
], M.prototype, "size", 2);
d([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "caret", 2);
d([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", 2);
d([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "loading", 2);
d([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "outline", 2);
d([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "pill", 2);
d([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "circle", 2);
d([
  f()
], M.prototype, "type", 2);
d([
  f()
], M.prototype, "name", 2);
d([
  f()
], M.prototype, "value", 2);
d([
  f()
], M.prototype, "href", 2);
d([
  f()
], M.prototype, "target", 2);
d([
  f()
], M.prototype, "rel", 2);
d([
  f()
], M.prototype, "download", 2);
d([
  f()
], M.prototype, "form", 2);
d([
  f({ attribute: "formaction" })
], M.prototype, "formAction", 2);
d([
  f({ attribute: "formenctype" })
], M.prototype, "formEnctype", 2);
d([
  f({ attribute: "formmethod" })
], M.prototype, "formMethod", 2);
d([
  f({ attribute: "formnovalidate", type: Boolean })
], M.prototype, "formNoValidate", 2);
d([
  f({ attribute: "formtarget" })
], M.prototype, "formTarget", 2);
d([
  ee("disabled", { waitUntilFirstUpdate: !0 })
], M.prototype, "handleDisabledChange", 1);
M = d([
  ve("sl-button")
], M);
var gc = le`
  ${be}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`, Ls = class extends ae {
  constructor() {
    super(...arguments), this.localize = new nt(this);
  }
  render() {
    return V`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
Ls.styles = gc;
Ls = d([
  ve("sl-spinner")
], Ls);
var Gn = le`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`, bc = le`
  ${be}
  ${Gn}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix::slotted(sl-icon),
  .input__suffix::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide Firefox's clear button on date and time inputs */
  .input--is-firefox input[type='date'],
  .input--is-firefox input[type='time'] {
    clip-path: inset(0 2em 0 0);
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`, vc = (e) => e.strings === void 0, yc = {}, _c = (e, t = yc) => e._$AH = t, wc = Fs(class extends Hs {
  constructor(e) {
    if (super(e), e.type !== We.PROPERTY && e.type !== We.ATTRIBUTE && e.type !== We.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!vc(e))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === xe || t === G)
      return t;
    const r = e.element, s = e.name;
    if (e.type === We.PROPERTY) {
      if (t === r[s])
        return xe;
    } else if (e.type === We.BOOLEAN_ATTRIBUTE) {
      if (!!t === r.hasAttribute(s))
        return xe;
    } else if (e.type === We.ATTRIBUTE && r.getAttribute(s) === t + "")
      return xe;
    return _c(e), t;
  }
});
/*! Bundled license information:

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
var Yn = (e = "value") => (t, r) => {
  const s = t.constructor, o = s.prototype.attributeChangedCallback;
  s.prototype.attributeChangedCallback = function(n, i, l) {
    var a;
    const c = s.getPropertyOptions(e), u = typeof c.attribute == "string" ? c.attribute : e;
    if (n === u) {
      const h = c.converter || Kt, g = (typeof h == "function" ? h : (a = h == null ? void 0 : h.fromAttribute) != null ? a : Kt.fromAttribute)(l, c.type);
      this[e] !== g && (this[r] = g);
    }
    o.call(this, n, i, l);
  };
}, Vo, xc = (Vo = navigator.userAgentData) == null ? void 0 : Vo.brands.some((e) => e.brand.includes("Chromium")), kc = xc ? !1 : navigator.userAgent.includes("Firefox"), T = class extends ae {
  constructor() {
    super(...arguments), this.formControlController = new Ks(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    }), this.hasSlotController = new Ys(this, "help-text", "label"), this.localize = new nt(this), this.hasFocus = !1, this.title = "", this.type = "text", this.name = "", this.value = "", this.defaultValue = "", this.size = "medium", this.filled = !1, this.pill = !1, this.label = "", this.helpText = "", this.clearable = !1, this.disabled = !1, this.placeholder = "", this.readonly = !1, this.passwordToggle = !1, this.passwordVisible = !1, this.noSpinButtons = !1, this.form = "", this.required = !1, this.spellcheck = !0;
  }
  get valueAsDate() {
    var e, t;
    return (t = (e = this.input) == null ? void 0 : e.valueAsDate) != null ? t : null;
  }
  set valueAsDate(e) {
    const t = document.createElement("input");
    t.type = "date", t.valueAsDate = e, this.value = t.value;
  }
  get valueAsNumber() {
    var e, t;
    return (t = (e = this.input) == null ? void 0 : e.valueAsNumber) != null ? t : parseFloat(this.value);
  }
  set valueAsNumber(e) {
    const t = document.createElement("input");
    t.type = "number", t.valueAsNumber = e, this.value = t.value;
  }
  get validity() {
    return this.input.validity;
  }
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value, this.emit("sl-change");
  }
  handleClearClick(e) {
    this.value = "", this.emit("sl-clear"), this.emit("sl-input"), this.emit("sl-change"), this.input.focus(), e.stopPropagation();
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value, this.formControlController.updateValidity(), this.emit("sl-input");
  }
  handleInvalid(e) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(e);
  }
  handleKeyDown(e) {
    const t = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    e.key === "Enter" && !t && setTimeout(() => {
      !e.defaultPrevented && !e.isComposing && this.formControlController.submit();
    });
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStepChange() {
    this.input.step = String(this.step), this.formControlController.updateValidity();
  }
  async handleValueChange() {
    await this.updateComplete, this.formControlController.updateValidity();
  }
  focus(e) {
    this.input.focus(e);
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  setSelectionRange(e, t, r = "none") {
    this.input.setSelectionRange(e, t, r);
  }
  setRangeText(e, t, r, s) {
    this.input.setRangeText(e, t, r, s), this.value !== this.input.value && (this.value = this.input.value);
  }
  showPicker() {
    "showPicker" in HTMLInputElement.prototype && this.input.showPicker();
  }
  stepUp() {
    this.input.stepUp(), this.value !== this.input.value && (this.value = this.input.value);
  }
  stepDown() {
    this.input.stepDown(), this.value !== this.input.value && (this.value = this.input.value);
  }
  checkValidity() {
    return this.input.checkValidity();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(e) {
    this.input.setCustomValidity(e), this.formControlController.updateValidity();
  }
  render() {
    const e = this.hasSlotController.test("label"), t = this.hasSlotController.test("help-text"), r = this.label ? !0 : !!e, s = this.helpText ? !0 : !!t, o = this.clearable && !this.disabled && !this.readonly && (typeof this.value == "number" || this.value.length > 0);
    return V`
      <div
        part="form-control"
        class=${fe({
      "form-control": !0,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": r,
      "form-control--has-help-text": s
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${fe({
      input: !0,
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons,
      "input--is-firefox": kc
    })}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${N(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${N(this.placeholder)}
              minlength=${N(this.minlength)}
              maxlength=${N(this.maxlength)}
              min=${N(this.min)}
              max=${N(this.max)}
              step=${N(this.step)}
              .value=${wc(this.value)}
              autocapitalize=${N(this.type === "password" ? "off" : this.autocapitalize)}
              autocomplete=${N(this.type === "password" ? "off" : this.autocomplete)}
              autocorrect=${N(this.type === "password" ? "off" : this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${N(this.pattern)}
              enterkeyhint=${N(this.enterkeyhint)}
              inputmode=${N(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${o ? V`
                    <button
                      part="clear-button"
                      class="input__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}
            ${this.passwordToggle && !this.disabled ? V`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible ? V`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          ` : V`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  ` : ""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `;
  }
};
T.styles = bc;
d([
  se(".input__control")
], T.prototype, "input", 2);
d([
  ue()
], T.prototype, "hasFocus", 2);
d([
  f()
], T.prototype, "title", 2);
d([
  f({ reflect: !0 })
], T.prototype, "type", 2);
d([
  f()
], T.prototype, "name", 2);
d([
  f()
], T.prototype, "value", 2);
d([
  Yn()
], T.prototype, "defaultValue", 2);
d([
  f({ reflect: !0 })
], T.prototype, "size", 2);
d([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "filled", 2);
d([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "pill", 2);
d([
  f()
], T.prototype, "label", 2);
d([
  f({ attribute: "help-text" })
], T.prototype, "helpText", 2);
d([
  f({ type: Boolean })
], T.prototype, "clearable", 2);
d([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "disabled", 2);
d([
  f()
], T.prototype, "placeholder", 2);
d([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "readonly", 2);
d([
  f({ attribute: "password-toggle", type: Boolean })
], T.prototype, "passwordToggle", 2);
d([
  f({ attribute: "password-visible", type: Boolean })
], T.prototype, "passwordVisible", 2);
d([
  f({ attribute: "no-spin-buttons", type: Boolean })
], T.prototype, "noSpinButtons", 2);
d([
  f({ reflect: !0 })
], T.prototype, "form", 2);
d([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "required", 2);
d([
  f()
], T.prototype, "pattern", 2);
d([
  f({ type: Number })
], T.prototype, "minlength", 2);
d([
  f({ type: Number })
], T.prototype, "maxlength", 2);
d([
  f({ type: Number })
], T.prototype, "min", 2);
d([
  f({ type: Number })
], T.prototype, "max", 2);
d([
  f()
], T.prototype, "step", 2);
d([
  f()
], T.prototype, "autocapitalize", 2);
d([
  f()
], T.prototype, "autocorrect", 2);
d([
  f()
], T.prototype, "autocomplete", 2);
d([
  f({ type: Boolean })
], T.prototype, "autofocus", 2);
d([
  f()
], T.prototype, "enterkeyhint", 2);
d([
  f({
    type: Boolean,
    converter: {
      fromAttribute: (e) => !(!e || e === "false"),
      toAttribute: (e) => e ? "true" : "false"
    }
  })
], T.prototype, "spellcheck", 2);
d([
  f()
], T.prototype, "inputmode", 2);
d([
  ee("disabled", { waitUntilFirstUpdate: !0 })
], T.prototype, "handleDisabledChange", 1);
d([
  ee("step", { waitUntilFirstUpdate: !0 })
], T.prototype, "handleStepChange", 1);
d([
  ee("value", { waitUntilFirstUpdate: !0 })
], T.prototype, "handleValueChange", 1);
T = d([
  ve("sl-input")
], T);
const $c = /* @__PURE__ */ J('<div class="error"><sl-icon class="icon"></sl-icon><span>.</span></div>'), Sc = /* @__PURE__ */ J('<div class="field"><sl-input></sl-input></div>'), Cc = /* @__PURE__ */ J('<sl-icon class="rotate" slot="suffix" name="arrow-repeat"></sl-icon>'), Ac = /* @__PURE__ */ J("<sl-button></sl-button>"), Ec = /* @__PURE__ */ J("<form></form>"), Ye = (e) => {
  const [t] = ot(), [r, s] = bn(e, ["isSubmiting", "errors"]);
  return (() => {
    const o = Q(() => document.importNode(Sc, !0)), n = o.firstChild;
    return vn(n, gn(s, {
      get disabled() {
        return r.isSubmiting;
      }
    }), !1, !1), n._$owner = X(), z(o, C(Ve, {
      get when() {
        return r.errors;
      },
      get children() {
        const i = Q(() => document.importNode($c, !0)), l = i.firstChild, a = l.nextSibling, c = a.firstChild;
        return oe(l, "name", "exclamation-circle"), l._$owner = X(), z(a, () => {
          var u;
          return (u = r.errors) == null ? void 0 : u.map((h) => t(h)).join(". ");
        }, c), i;
      }
    }), null), o;
  })();
}, cr = (e) => {
  const [t, r] = bn(e, ["isSubmiting", "children"]);
  return (() => {
    const s = Q(() => document.importNode(Ac, !0));
    return vn(s, gn(r, {
      get disabled() {
        return t.isSubmiting;
      }
    }), !1, !0), s._$owner = X(), z(s, C(Ve, {
      get when() {
        return t.isSubmiting;
      },
      get children() {
        const o = Q(() => document.importNode(Cc, !0));
        return o._$owner = X(), o;
      }
    }), null), z(s, () => t.children, null), s;
  })();
}, Js = (e) => {
  const t = (r) => {
    r.preventDefault(), e.onSubmit();
  };
  return (() => {
    const r = Ec.cloneNode(!0);
    return r.addEventListener("submit", t), z(r, () => e.children), r;
  })();
}, Tc = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u), Oc = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/), zc = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u), Jn = $e.string().trim().email("Must be a valid email address"), Uo = $e.string().trim().regex(Tc, "Must be a valid name"), Xn = $e.string().trim().min(3, "Minimum 3 charcters").or($e.literal("")), Pc = $e.string().trim().regex(zc, "Must be a valid street address").or($e.literal("")), Lc = $e.preprocess(
  (e) => e.split(" ").join(""),
  $e.string().trim().regex(Oc, "Must be a valid phone number").or($e.literal(""))
), Hr = (e, t, r) => {
  const s = e.safeParse(t);
  if (s.success)
    return r({}), s.data;
  r(s.error.flatten());
}, Nc = /* @__PURE__ */ J('<div class="loading"><sl-spinner style="font-size: 50px; --track-width: 10px;"></sl-spinner><div></div></div>'), Xs = (e) => (() => {
  const t = Q(() => document.importNode(Nc, !0)), r = t.firstChild, s = r.nextSibling;
  return r._$owner = X(), z(s, () => e.children), t;
})(), Ic = /* @__PURE__ */ J('<div class="form-error"></div>'), Rc = /* @__PURE__ */ J("<div></div>"), Dc = /* @__PURE__ */ J("<section><h2></h2></section>"), Zo = $e.object({
  email: Jn,
  pass: Xn
}), Mc = {
  email: "flemming@intergate.io",
  pass: "flemming8"
}, jc = (e) => {
  const [t] = ot(), {
    auth: r
  } = Lt(), [s, o] = mt(Mc), [n, i] = Y(), [l, a] = Y(), [c, u] = Y({}), [h] = Je(l, r.signin), [p] = Je(n, r.signup), [g] = Je(() => !!r.state.token, r.loadDetails);
  zt(async () => {
    h.error && u({
      formErrors: [t("Failed signing in"), t("Did you type your password and email correct?")]
    }), p.error && u({
      formErrors: [t("Failed signing up"), t("Did you already sign up?")]
    });
  });
  const m = (w) => ($) => {
    o(w, $.target.value);
  }, _ = () => h.loading || p.loading;
  return (() => {
    const w = Dc.cloneNode(!0), $ = w.firstChild;
    return z($, () => t("Sign in")), z(w, C(js, {
      get fallback() {
        return C(Xs, {});
      },
      get children() {
        return [ne(() => qs(g())), C(Js, {
          onSubmit: () => a(Hr(Zo, s, u)),
          get children() {
            return [C(Ye, {
              get label() {
                return t("Email");
              },
              type: "text",
              inputmode: "email",
              clearable: !0,
              required: !0,
              get value() {
                return s.email;
              },
              get errors() {
                var v;
                return (v = c().fieldErrors) == null ? void 0 : v.email;
              },
              get ["data-invalid"]() {
                var v;
                return !!((v = c().fieldErrors) != null && v.email) || c().formErrors;
              },
              get ["on:sl-change"]() {
                return m("email");
              },
              get isSubmiting() {
                return _();
              }
            }), C(Ye, {
              get label() {
                return t("Password");
              },
              type: "password",
              inputmode: "text",
              "password-toggle": !0,
              clearable: !0,
              required: !0,
              get value() {
                return s.pass;
              },
              get errors() {
                var v;
                return (v = c().fieldErrors) == null ? void 0 : v.pass;
              },
              get ["on:sl-change"]() {
                return m("pass");
              },
              get ["data-invalid"]() {
                var v;
                return !!((v = c().fieldErrors) != null && v.pass) || c().formErrors;
              },
              get isSubmiting() {
                return _();
              }
            }), C(Ve, {
              get when() {
                var v;
                return (v = c().formErrors) == null ? void 0 : v.length;
              },
              get children() {
                const v = Ic.cloneNode(!0);
                return z(v, () => {
                  var k;
                  return (k = c().formErrors) == null ? void 0 : k.join(". ");
                }), v;
              }
            }), (() => {
              const v = Rc.cloneNode(!0);
              return z(v, C(cr, {
                onClick: () => i(Hr(Zo, s, u)),
                get isSubmiting() {
                  return _();
                },
                variant: "neutral",
                get children() {
                  return t("Sign up");
                }
              }), null), z(v, C(cr, {
                type: "submit",
                variant: "primary",
                get isSubmiting() {
                  return _();
                },
                get children() {
                  return t("Sign in");
                }
              }), null), v;
            })()];
          }
        })];
      }
    }), null), w;
  })();
};
var Bc = le`
  ${be}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`, De = class extends ae {
  constructor() {
    super(...arguments), this.hasError = !1, this.image = "", this.label = "", this.initials = "", this.loading = "eager", this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = !1;
  }
  render() {
    return V`
      <div
        part="base"
        class=${fe({
      avatar: !0,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials ? V` <div part="initials" class="avatar__initials">${this.initials}</div> ` : V`
              <slot name="icon" part="icon" class="avatar__icon" aria-hidden="true">
                <sl-icon name="person-fill" library="system"></sl-icon>
              </slot>
            `}
        ${this.image && !this.hasError ? V`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                loading="${this.loading}"
                alt=""
                @error="${() => this.hasError = !0}"
              />
            ` : ""}
      </div>
    `;
  }
};
De.styles = Bc;
d([
  ue()
], De.prototype, "hasError", 2);
d([
  f()
], De.prototype, "image", 2);
d([
  f()
], De.prototype, "label", 2);
d([
  f()
], De.prototype, "initials", 2);
d([
  f()
], De.prototype, "loading", 2);
d([
  f({ reflect: !0 })
], De.prototype, "shape", 2);
d([
  ee("image")
], De.prototype, "handleImageChange", 1);
De = d([
  ve("sl-avatar")
], De);
const Vc = () => {
  const [e] = ot(), {
    auth: t
  } = Lt(), [r, s] = Y(), [o] = Je(r, () => t.signout());
  return C(cr, {
    get isSubmiting() {
      return o.loading;
    },
    onClick: () => s(!0),
    variant: "primary",
    get children() {
      return e("Sign out");
    }
  });
};
var Uc = le`
  ${be}
  ${Gn}

  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox::slotted(small) {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;
function Fo(e, t) {
  return new Promise((r) => {
    function s(o) {
      o.target === e && (e.removeEventListener(t, s), r());
    }
    e.addEventListener(t, s);
  });
}
function Ho(e, t, r) {
  return new Promise((s) => {
    if ((r == null ? void 0 : r.duration) === 1 / 0)
      throw new Error("Promise-based animations must be finite.");
    const o = e.animate(t, pe(H({}, r), {
      duration: Zc() ? 0 : r.duration
    }));
    o.addEventListener("cancel", s, { once: !0 }), o.addEventListener("finish", s, { once: !0 });
  });
}
function Zc() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function qo(e) {
  return Promise.all(
    e.getAnimations().map((t) => new Promise((r) => {
      const s = requestAnimationFrame(r);
      t.addEventListener("cancel", () => s, { once: !0 }), t.addEventListener("finish", () => s, { once: !0 }), t.cancel();
    }))
  );
}
var Qn = /* @__PURE__ */ new Map(), Fc = /* @__PURE__ */ new WeakMap();
function Hc(e) {
  return e != null ? e : { keyframes: [], options: { duration: 0 } };
}
function Wo(e, t) {
  return t.toLowerCase() === "rtl" ? {
    keyframes: e.rtlKeyframes || e.keyframes,
    options: e.options
  } : e;
}
function ei(e, t) {
  Qn.set(e, Hc(t));
}
function Ko(e, t, r) {
  const s = Fc.get(e);
  if (s != null && s[t])
    return Wo(s[t], r.dir);
  const o = Qn.get(t);
  return o ? Wo(o, r.dir) : {
    keyframes: [],
    options: { duration: 0 }
  };
}
var L = class extends ae {
  constructor() {
    super(...arguments), this.formControlController = new Ks(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    }), this.hasSlotController = new Ys(this, "help-text", "label"), this.localize = new nt(this), this.typeToSelectString = "", this.hasFocus = !1, this.displayLabel = "", this.selectedOptions = [], this.name = "", this.value = "", this.defaultValue = "", this.size = "medium", this.placeholder = "", this.multiple = !1, this.maxOptionsVisible = 3, this.disabled = !1, this.clearable = !1, this.open = !1, this.hoist = !1, this.filled = !1, this.pill = !1, this.label = "", this.placement = "bottom", this.helpText = "", this.form = "", this.required = !1;
  }
  get validity() {
    return this.valueInput.validity;
  }
  get validationMessage() {
    return this.valueInput.validationMessage;
  }
  connectedCallback() {
    super.connectedCallback(), this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this), this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this), this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this), this.open = !1;
  }
  addOpenListeners() {
    document.addEventListener("focusin", this.handleDocumentFocusIn), document.addEventListener("keydown", this.handleDocumentKeyDown), document.addEventListener("mousedown", this.handleDocumentMouseDown);
  }
  removeOpenListeners() {
    document.removeEventListener("focusin", this.handleDocumentFocusIn), document.removeEventListener("keydown", this.handleDocumentKeyDown), document.removeEventListener("mousedown", this.handleDocumentMouseDown);
  }
  handleFocus() {
    this.hasFocus = !0, this.displayInput.setSelectionRange(0, 0), this.emit("sl-focus");
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleDocumentFocusIn(e) {
    const t = e.composedPath();
    this && !t.includes(this) && this.hide();
  }
  handleDocumentKeyDown(e) {
    const t = e.target, r = t.closest(".select__clear") !== null, s = t.closest("sl-icon-button") !== null;
    if (!(r || s)) {
      if (e.key === "Escape" && this.open && (e.preventDefault(), e.stopPropagation(), this.hide(), this.displayInput.focus({ preventScroll: !0 })), e.key === "Enter" || e.key === " " && this.typeToSelectString === "") {
        if (e.preventDefault(), e.stopImmediatePropagation(), !this.open) {
          this.show();
          return;
        }
        this.currentOption && !this.currentOption.disabled && (this.multiple ? this.toggleOptionSelection(this.currentOption) : this.setSelectedOptions(this.currentOption), this.emit("sl-input"), this.emit("sl-change"), this.multiple || (this.hide(), this.displayInput.focus({ preventScroll: !0 })));
        return;
      }
      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
        const o = this.getAllOptions(), n = o.indexOf(this.currentOption);
        let i = Math.max(0, n);
        if (e.preventDefault(), !this.open && (this.show(), this.currentOption))
          return;
        e.key === "ArrowDown" ? (i = n + 1, i > o.length - 1 && (i = 0)) : e.key === "ArrowUp" ? (i = n - 1, i < 0 && (i = o.length - 1)) : e.key === "Home" ? i = 0 : e.key === "End" && (i = o.length - 1), this.setCurrentOption(o[i]);
      }
      if (e.key.length === 1 || e.key === "Backspace") {
        const o = this.getAllOptions();
        if (e.metaKey || e.ctrlKey || e.altKey)
          return;
        if (!this.open) {
          if (e.key === "Backspace")
            return;
          this.show();
        }
        e.stopPropagation(), e.preventDefault(), clearTimeout(this.typeToSelectTimeout), this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3), e.key === "Backspace" ? this.typeToSelectString = this.typeToSelectString.slice(0, -1) : this.typeToSelectString += e.key.toLowerCase();
        for (const n of o)
          if (n.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)) {
            this.setCurrentOption(n);
            break;
          }
      }
    }
  }
  handleDocumentMouseDown(e) {
    const t = e.composedPath();
    this && !t.includes(this) && this.hide();
  }
  handleLabelClick() {
    this.displayInput.focus();
  }
  handleComboboxMouseDown(e) {
    const r = e.composedPath().some((s) => s instanceof Element && s.tagName.toLowerCase() === "sl-icon-button");
    this.disabled || r || (e.preventDefault(), this.displayInput.focus({ preventScroll: !0 }), this.open = !this.open);
  }
  handleComboboxKeyDown(e) {
    e.stopPropagation(), this.handleDocumentKeyDown(e);
  }
  handleClearClick(e) {
    e.stopPropagation(), this.value !== "" && (this.setSelectedOptions([]), this.displayInput.focus({ preventScroll: !0 }), this.emit("sl-clear"), this.emit("sl-input"), this.emit("sl-change"));
  }
  handleClearMouseDown(e) {
    e.stopPropagation(), e.preventDefault();
  }
  handleOptionClick(e) {
    const r = e.target.closest("sl-option"), s = this.value;
    r && !r.disabled && (this.multiple ? this.toggleOptionSelection(r) : this.setSelectedOptions(r), this.updateComplete.then(() => this.displayInput.focus({ preventScroll: !0 })), this.value !== s && (this.emit("sl-input"), this.emit("sl-change")), this.multiple || (this.hide(), this.displayInput.focus({ preventScroll: !0 })));
  }
  handleDefaultSlotChange() {
    const e = this.getAllOptions(), t = Array.isArray(this.value) ? this.value : [this.value], r = [];
    e.forEach((s) => {
      r.includes(s.value) && console.error(
        `An option with a duplicate value of "${s.value}" has been found in <sl-select>. All options must have unique values.`,
        s
      ), r.push(s.value);
    }), this.setSelectedOptions(e.filter((s) => t.includes(s.value)));
  }
  handleTagRemove(e, t) {
    e.stopPropagation(), this.disabled || (this.toggleOptionSelection(t, !1), this.emit("sl-input"), this.emit("sl-change"));
  }
  getAllOptions() {
    return [...this.querySelectorAll("sl-option")];
  }
  getFirstOption() {
    return this.querySelector("sl-option");
  }
  setCurrentOption(e) {
    this.getAllOptions().forEach((r) => {
      r.current = !1, r.tabIndex = -1;
    }), e && (this.currentOption = e, e.current = !0, e.tabIndex = 0, e.focus());
  }
  setSelectedOptions(e) {
    const t = this.getAllOptions(), r = Array.isArray(e) ? e : [e];
    t.forEach((s) => s.selected = !1), r.length && r.forEach((s) => s.selected = !0), this.selectionChanged();
  }
  toggleOptionSelection(e, t) {
    t === !0 || t === !1 ? e.selected = t : e.selected = !e.selected, this.selectionChanged();
  }
  selectionChanged() {
    var e, t, r, s;
    this.selectedOptions = this.getAllOptions().filter((o) => o.selected), this.multiple ? (this.value = this.selectedOptions.map((o) => o.value), this.placeholder && this.value.length === 0 ? this.displayLabel = "" : this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length)) : (this.value = (t = (e = this.selectedOptions[0]) == null ? void 0 : e.value) != null ? t : "", this.displayLabel = (s = (r = this.selectedOptions[0]) == null ? void 0 : r.getTextLabel()) != null ? s : ""), this.updateComplete.then(() => {
      this.formControlController.updateValidity();
    });
  }
  handleInvalid(e) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(e);
  }
  handleDisabledChange() {
    this.disabled && (this.open = !1, this.handleOpenChange());
  }
  handleValueChange() {
    const e = this.getAllOptions(), t = Array.isArray(this.value) ? this.value : [this.value];
    this.setSelectedOptions(e.filter((r) => t.includes(r.value)));
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption()), this.emit("sl-show"), this.addOpenListeners(), await qo(this), this.listbox.hidden = !1, this.popup.active = !0, requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      const { keyframes: e, options: t } = Ko(this, "select.show", { dir: this.localize.dir() });
      await Ho(this.popup.popup, e, t), this.currentOption && Cs(this.currentOption, this.listbox, "vertical", "auto"), this.emit("sl-after-show");
    } else {
      this.emit("sl-hide"), this.removeOpenListeners(), await qo(this);
      const { keyframes: e, options: t } = Ko(this, "select.hide", { dir: this.localize.dir() });
      await Ho(this.popup.popup, e, t), this.listbox.hidden = !0, this.popup.active = !1, this.emit("sl-after-hide");
    }
  }
  async show() {
    if (this.open || this.disabled) {
      this.open = !1;
      return;
    }
    return this.open = !0, Fo(this, "sl-after-show");
  }
  async hide() {
    if (!this.open || this.disabled) {
      this.open = !1;
      return;
    }
    return this.open = !1, Fo(this, "sl-after-hide");
  }
  checkValidity() {
    return this.valueInput.checkValidity();
  }
  reportValidity() {
    return this.valueInput.reportValidity();
  }
  setCustomValidity(e) {
    this.valueInput.setCustomValidity(e), this.formControlController.updateValidity();
  }
  focus(e) {
    this.displayInput.focus(e);
  }
  blur() {
    this.displayInput.blur();
  }
  render() {
    const e = this.hasSlotController.test("label"), t = this.hasSlotController.test("help-text"), r = this.label ? !0 : !!e, s = this.helpText ? !0 : !!t, o = this.clearable && !this.disabled && this.value.length > 0, n = this.placeholder && this.value.length === 0;
    return V`
      <div
        part="form-control"
        class=${fe({
      "form-control": !0,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": r,
      "form-control--has-help-text": s
    })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${r ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${fe({
      select: !0,
      "select--standard": !0,
      "select--filled": this.filled,
      "select--pill": this.pill,
      "select--open": this.open,
      "select--disabled": this.disabled,
      "select--multiple": this.multiple,
      "select--focused": this.hasFocus,
      "select--placeholder-visible": n,
      "select--top": this.placement === "top",
      "select--bottom": this.placement === "bottom",
      "select--small": this.size === "small",
      "select--medium": this.size === "medium",
      "select--large": this.size === "large"
    })}
            placement=${this.placement}
            strategy=${this.hoist ? "fixed" : "absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple ? V`
                    <div part="tags" class="select__tags">
                      ${this.selectedOptions.map((i, l) => l < this.maxOptionsVisible || this.maxOptionsVisible <= 0 ? V`
                            <sl-tag
                              part="tag"
                              ?pill=${this.pill}
                              size=${this.size}
                              removable
                              @sl-remove=${(a) => this.handleTagRemove(a, i)}
                            >
                              ${i.getTextLabel()}
                            </sl-tag>
                          ` : l === this.maxOptionsVisible ? V` <sl-tag size=${this.size}> +${this.selectedOptions.length - l} </sl-tag> ` : null)}
                    </div>
                  ` : ""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${o ? V`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <slot
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            ></slot>
          </sl-popup>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
      </div>
    `;
  }
};
L.styles = Uc;
d([
  se(".select")
], L.prototype, "popup", 2);
d([
  se(".select__combobox")
], L.prototype, "combobox", 2);
d([
  se(".select__display-input")
], L.prototype, "displayInput", 2);
d([
  se(".select__value-input")
], L.prototype, "valueInput", 2);
d([
  se(".select__listbox")
], L.prototype, "listbox", 2);
d([
  ue()
], L.prototype, "hasFocus", 2);
d([
  ue()
], L.prototype, "displayLabel", 2);
d([
  ue()
], L.prototype, "currentOption", 2);
d([
  ue()
], L.prototype, "selectedOptions", 2);
d([
  f()
], L.prototype, "name", 2);
d([
  f({
    converter: {
      fromAttribute: (e) => e.split(" "),
      toAttribute: (e) => e.join(" ")
    }
  })
], L.prototype, "value", 2);
d([
  Yn()
], L.prototype, "defaultValue", 2);
d([
  f()
], L.prototype, "size", 2);
d([
  f()
], L.prototype, "placeholder", 2);
d([
  f({ type: Boolean, reflect: !0 })
], L.prototype, "multiple", 2);
d([
  f({ attribute: "max-options-visible", type: Number })
], L.prototype, "maxOptionsVisible", 2);
d([
  f({ type: Boolean, reflect: !0 })
], L.prototype, "disabled", 2);
d([
  f({ type: Boolean })
], L.prototype, "clearable", 2);
d([
  f({ type: Boolean, reflect: !0 })
], L.prototype, "open", 2);
d([
  f({ type: Boolean })
], L.prototype, "hoist", 2);
d([
  f({ type: Boolean, reflect: !0 })
], L.prototype, "filled", 2);
d([
  f({ type: Boolean, reflect: !0 })
], L.prototype, "pill", 2);
d([
  f()
], L.prototype, "label", 2);
d([
  f({ reflect: !0 })
], L.prototype, "placement", 2);
d([
  f({ attribute: "help-text" })
], L.prototype, "helpText", 2);
d([
  f({ reflect: !0 })
], L.prototype, "form", 2);
d([
  f({ type: Boolean, reflect: !0 })
], L.prototype, "required", 2);
d([
  ee("disabled", { waitUntilFirstUpdate: !0 })
], L.prototype, "handleDisabledChange", 1);
d([
  ee("value", { waitUntilFirstUpdate: !0 })
], L.prototype, "handleValueChange", 1);
d([
  ee("open", { waitUntilFirstUpdate: !0 })
], L.prototype, "handleOpenChange", 1);
L = d([
  ve("sl-select")
], L);
ei("select.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
ei("select.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});
var qc = le`
  ${be}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`, pt = class extends ae {
  constructor() {
    super(...arguments), this.localize = new nt(this), this.variant = "neutral", this.size = "medium", this.pill = !1, this.removable = !1;
  }
  handleRemoveClick() {
    this.emit("sl-remove");
  }
  render() {
    return V`
      <span
        part="base"
        class=${fe({
      tag: !0,
      "tag--primary": this.variant === "primary",
      "tag--success": this.variant === "success",
      "tag--neutral": this.variant === "neutral",
      "tag--warning": this.variant === "warning",
      "tag--danger": this.variant === "danger",
      "tag--text": this.variant === "text",
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? V`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
pt.styles = qc;
d([
  f({ reflect: !0 })
], pt.prototype, "variant", 2);
d([
  f({ reflect: !0 })
], pt.prototype, "size", 2);
d([
  f({ type: Boolean, reflect: !0 })
], pt.prototype, "pill", 2);
d([
  f({ type: Boolean })
], pt.prototype, "removable", 2);
pt = d([
  ve("sl-tag")
], pt);
var Wc = le`
  ${be}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }
`;
function Nt(e) {
  return e.split("-")[1];
}
function Qs(e) {
  return e === "y" ? "height" : "width";
}
function Xe(e) {
  return e.split("-")[0];
}
function pr(e) {
  return ["top", "bottom"].includes(Xe(e)) ? "x" : "y";
}
function Go(e, t, r) {
  let { reference: s, floating: o } = e;
  const n = s.x + s.width / 2 - o.width / 2, i = s.y + s.height / 2 - o.height / 2, l = pr(t), a = Qs(l), c = s[a] / 2 - o[a] / 2, u = l === "x";
  let h;
  switch (Xe(t)) {
    case "top":
      h = { x: n, y: s.y - o.height };
      break;
    case "bottom":
      h = { x: n, y: s.y + s.height };
      break;
    case "right":
      h = { x: s.x + s.width, y: i };
      break;
    case "left":
      h = { x: s.x - o.width, y: i };
      break;
    default:
      h = { x: s.x, y: s.y };
  }
  switch (Nt(t)) {
    case "start":
      h[l] -= c * (r && u ? -1 : 1);
      break;
    case "end":
      h[l] += c * (r && u ? -1 : 1);
  }
  return h;
}
var Kc = async (e, t, r) => {
  const { placement: s = "bottom", strategy: o = "absolute", middleware: n = [], platform: i } = r, l = n.filter(Boolean), a = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({ reference: e, floating: t, strategy: o }), { x: u, y: h } = Go(c, s, a), p = s, g = {}, m = 0;
  for (let _ = 0; _ < l.length; _++) {
    const { name: w, fn: $ } = l[_], { x: v, y: k, data: I, reset: j } = await $({ x: u, y: h, initialPlacement: s, placement: p, strategy: o, middlewareData: g, rects: c, platform: i, elements: { reference: e, floating: t } });
    u = v != null ? v : u, h = k != null ? k : h, g = pe(H({}, g), { [w]: H(H({}, g[w]), I) }), j && m <= 50 && (m++, typeof j == "object" && (j.placement && (p = j.placement), j.rects && (c = j.rects === !0 ? await i.getElementRects({ reference: e, floating: t, strategy: o }) : j.rects), { x: u, y: h } = Go(c, p, a)), _ = -1);
  }
  return { x: u, y: h, placement: p, strategy: o, middlewareData: g };
};
function ti(e) {
  return typeof e != "number" ? function(t) {
    return H({ top: 0, right: 0, bottom: 0, left: 0 }, t);
  }(e) : { top: e, right: e, bottom: e, left: e };
}
function qr(e) {
  return pe(H({}, e), { top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height });
}
async function eo(e, t) {
  var r;
  t === void 0 && (t = {});
  const { x: s, y: o, platform: n, rects: i, elements: l, strategy: a } = e, { boundary: c = "clippingAncestors", rootBoundary: u = "viewport", elementContext: h = "floating", altBoundary: p = !1, padding: g = 0 } = t, m = ti(g), _ = l[p ? h === "floating" ? "reference" : "floating" : h], w = qr(await n.getClippingRect({ element: (r = await (n.isElement == null ? void 0 : n.isElement(_))) == null || r ? _ : _.contextElement || await (n.getDocumentElement == null ? void 0 : n.getDocumentElement(l.floating)), boundary: c, rootBoundary: u, strategy: a })), $ = h === "floating" ? pe(H({}, i.floating), { x: s, y: o }) : i.reference, v = await (n.getOffsetParent == null ? void 0 : n.getOffsetParent(l.floating)), k = await (n.isElement == null ? void 0 : n.isElement(v)) && await (n.getScale == null ? void 0 : n.getScale(v)) || { x: 1, y: 1 }, I = qr(n.convertOffsetParentRelativeRectToViewportRelativeRect ? await n.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: $, offsetParent: v, strategy: a }) : $);
  return { top: (w.top - I.top + m.top) / k.y, bottom: (I.bottom - w.bottom + m.bottom) / k.y, left: (w.left - I.left + m.left) / k.x, right: (I.right - w.right + m.right) / k.x };
}
var Gc = Math.min, at = Math.max;
function Ns(e, t, r) {
  return at(e, Gc(t, r));
}
var Yc = (e) => ({ name: "arrow", options: e, async fn(t) {
  const { element: r, padding: s = 0 } = e || {}, { x: o, y: n, placement: i, rects: l, platform: a } = t;
  if (r == null)
    return {};
  const c = ti(s), u = { x: o, y: n }, h = pr(i), p = Qs(h), g = await a.getDimensions(r), m = h === "y" ? "top" : "left", _ = h === "y" ? "bottom" : "right", w = l.reference[p] + l.reference[h] - u[h] - l.floating[p], $ = u[h] - l.reference[h], v = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(r));
  let k = v ? h === "y" ? v.clientHeight || 0 : v.clientWidth || 0 : 0;
  k === 0 && (k = l.floating[p]);
  const I = w / 2 - $ / 2, j = c[m], de = k - g[p] - c[_], ce = k / 2 - g[p] / 2 + I, ye = Ns(j, ce, de), He = Nt(i) != null && ce != ye && l.reference[p] / 2 - (ce < j ? c[m] : c[_]) - g[p] / 2 < 0;
  return { [h]: u[h] - (He ? ce < j ? j - ce : de - ce : 0), data: { [h]: ye, centerOffset: ce - ye } };
} }), Jc = ["top", "right", "bottom", "left"];
Jc.reduce((e, t) => e.concat(t, t + "-start", t + "-end"), []);
var Xc = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Wr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Xc[t]);
}
function Qc(e, t, r) {
  r === void 0 && (r = !1);
  const s = Nt(e), o = pr(e), n = Qs(o);
  let i = o === "x" ? s === (r ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return t.reference[n] > t.floating[n] && (i = Wr(i)), { main: i, cross: Wr(i) };
}
var eu = { start: "end", end: "start" };
function bs(e) {
  return e.replace(/start|end/g, (t) => eu[t]);
}
var tu = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(t) {
    var r;
    const { placement: s, middlewareData: o, rects: n, initialPlacement: i, platform: l, elements: a } = t, c = e, { mainAxis: u = !0, crossAxis: h = !0, fallbackPlacements: p, fallbackStrategy: g = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: _ = !0 } = c, w = Vs(c, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"]), $ = Xe(s), v = Xe(i) === i, k = await (l.isRTL == null ? void 0 : l.isRTL(a.floating)), I = p || (v || !_ ? [Wr(i)] : function(D) {
      const U = Wr(D);
      return [bs(D), U, bs(U)];
    }(i));
    p || m === "none" || I.push(...function(D, U, _e, fr) {
      const it = Nt(D);
      let we = function(It, ss, ui) {
        const ro = ["left", "right"], so = ["right", "left"], di = ["top", "bottom"], hi = ["bottom", "top"];
        switch (It) {
          case "top":
          case "bottom":
            return ui ? ss ? so : ro : ss ? ro : so;
          case "left":
          case "right":
            return ss ? di : hi;
          default:
            return [];
        }
      }(Xe(D), _e === "start", fr);
      return it && (we = we.map((It) => It + "-" + it), U && (we = we.concat(we.map(bs)))), we;
    }(i, _, m, k));
    const j = [i, ...I], de = await eo(t, w), ce = [];
    let ye = ((r = o.flip) == null ? void 0 : r.overflows) || [];
    if (u && ce.push(de[$]), h) {
      const { main: D, cross: U } = Qc(s, n, k);
      ce.push(de[D], de[U]);
    }
    if (ye = [...ye, { placement: s, overflows: ce }], !ce.every((D) => D <= 0)) {
      var He;
      const D = (((He = o.flip) == null ? void 0 : He.index) || 0) + 1, U = j[D];
      if (U)
        return { data: { index: D, overflows: ye }, reset: { placement: U } };
      let _e = "bottom";
      switch (g) {
        case "bestFit": {
          var F;
          const fr = (F = ye.map((it) => [it, it.overflows.filter((we) => we > 0).reduce((we, It) => we + It, 0)]).sort((it, we) => it[1] - we[1])[0]) == null ? void 0 : F[0].placement;
          fr && (_e = fr);
          break;
        }
        case "initialPlacement":
          _e = i;
      }
      if (s !== _e)
        return { reset: { placement: _e } };
    }
    return {};
  } };
}, ru = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(t) {
    const { x: r, y: s } = t, o = await async function(n, i) {
      const { placement: l, platform: a, elements: c } = n, u = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), h = Xe(l), p = Nt(l), g = pr(l) === "x", m = ["left", "top"].includes(h) ? -1 : 1, _ = u && g ? -1 : 1, w = typeof i == "function" ? i(n) : i;
      let { mainAxis: $, crossAxis: v, alignmentAxis: k } = typeof w == "number" ? { mainAxis: w, crossAxis: 0, alignmentAxis: null } : H({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, w);
      return p && typeof k == "number" && (v = p === "end" ? -1 * k : k), g ? { x: v * _, y: $ * m } : { x: $ * m, y: v * _ };
    }(t, e);
    return { x: r + o.x, y: s + o.y, data: o };
  } };
};
function su(e) {
  return e === "x" ? "y" : "x";
}
var ou = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: r, y: s, placement: o } = t, n = e, { mainAxis: i = !0, crossAxis: l = !1, limiter: a = { fn: ($) => {
      let { x: v, y: k } = $;
      return { x: v, y: k };
    } } } = n, c = Vs(n, ["mainAxis", "crossAxis", "limiter"]), u = { x: r, y: s }, h = await eo(t, c), p = pr(Xe(o)), g = su(p);
    let m = u[p], _ = u[g];
    if (i) {
      const $ = p === "y" ? "bottom" : "right";
      m = Ns(m + h[p === "y" ? "top" : "left"], m, m - h[$]);
    }
    if (l) {
      const $ = g === "y" ? "bottom" : "right";
      _ = Ns(_ + h[g === "y" ? "top" : "left"], _, _ - h[$]);
    }
    const w = a.fn(pe(H({}, t), { [p]: m, [g]: _ }));
    return pe(H({}, w), { data: { x: w.x - r, y: w.y - s } });
  } };
}, Yo = function(e) {
  return e === void 0 && (e = {}), { name: "size", options: e, async fn(t) {
    const { placement: r, rects: s, platform: o, elements: n } = t, i = e, { apply: l = () => {
    } } = i, a = Vs(i, ["apply"]), c = await eo(t, a), u = Xe(r), h = Nt(r);
    let p, g;
    u === "top" || u === "bottom" ? (p = u, g = h === (await (o.isRTL == null ? void 0 : o.isRTL(n.floating)) ? "start" : "end") ? "left" : "right") : (g = u, p = h === "end" ? "top" : "bottom");
    const m = at(c.left, 0), _ = at(c.right, 0), w = at(c.top, 0), $ = at(c.bottom, 0), v = { availableHeight: s.floating.height - (["left", "right"].includes(r) ? 2 * (w !== 0 || $ !== 0 ? w + $ : at(c.top, c.bottom)) : c[p]), availableWidth: s.floating.width - (["top", "bottom"].includes(r) ? 2 * (m !== 0 || _ !== 0 ? m + _ : at(c.left, c.right)) : c[g]) };
    await l(H(H({}, t), v));
    const k = await o.getDimensions(n.floating);
    return s.floating.width !== k.width || s.floating.height !== k.height ? { reset: { rects: !0 } } : {};
  } };
};
function ke(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Pe(e) {
  return ke(e).getComputedStyle(e);
}
function st(e) {
  return si(e) ? (e.nodeName || "").toLowerCase() : "";
}
var vr;
function ri() {
  if (vr)
    return vr;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (vr = e.brands.map((t) => t.brand + "/" + t.version).join(" "), vr) : navigator.userAgent;
}
function Fe(e) {
  return e instanceof ke(e).HTMLElement;
}
function Ae(e) {
  return e instanceof ke(e).Element;
}
function si(e) {
  return e instanceof ke(e).Node;
}
function Jo(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ke(e).ShadowRoot || e instanceof ShadowRoot;
}
function ts(e) {
  const { overflow: t, overflowX: r, overflowY: s, display: o } = Pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + s + r) && !["inline", "contents"].includes(o);
}
function nu(e) {
  return ["table", "td", "th"].includes(st(e));
}
function Is(e) {
  const t = /firefox/i.test(ri()), r = Pe(e), s = r.backdropFilter || r.WebkitBackdropFilter;
  return r.transform !== "none" || r.perspective !== "none" || !!s && s !== "none" || t && r.willChange === "filter" || t && !!r.filter && r.filter !== "none" || ["transform", "perspective"].some((o) => r.willChange.includes(o)) || ["paint", "layout", "strict", "content"].some((o) => {
    const n = r.contain;
    return n != null && n.includes(o);
  });
}
function oi() {
  return !/^((?!chrome|android).)*safari/i.test(ri());
}
function to(e) {
  return ["html", "body", "#document"].includes(st(e));
}
var Xo = Math.min, Ft = Math.max, Kr = Math.round;
function ni(e) {
  const t = Pe(e);
  let r = parseFloat(t.width), s = parseFloat(t.height);
  const o = e.offsetWidth, n = e.offsetHeight, i = Kr(r) !== o || Kr(s) !== n;
  return i && (r = o, s = n), { width: r, height: s, fallback: i };
}
function ii(e) {
  return Ae(e) ? e : e.contextElement;
}
var li = { x: 1, y: 1 };
function xt(e) {
  const t = ii(e);
  if (!Fe(t))
    return li;
  const r = t.getBoundingClientRect(), { width: s, height: o, fallback: n } = ni(t);
  let i = (n ? Kr(r.width) : r.width) / s, l = (n ? Kr(r.height) : r.height) / o;
  return i && Number.isFinite(i) || (i = 1), l && Number.isFinite(l) || (l = 1), { x: i, y: l };
}
function ft(e, t, r, s) {
  var o, n;
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const i = e.getBoundingClientRect(), l = ii(e);
  let a = li;
  t && (s ? Ae(s) && (a = xt(s)) : a = xt(e));
  const c = l ? ke(l) : window, u = !oi() && r;
  let h = (i.left + (u && ((o = c.visualViewport) == null ? void 0 : o.offsetLeft) || 0)) / a.x, p = (i.top + (u && ((n = c.visualViewport) == null ? void 0 : n.offsetTop) || 0)) / a.y, g = i.width / a.x, m = i.height / a.y;
  if (l) {
    const _ = ke(l), w = s && Ae(s) ? ke(s) : s;
    let $ = _.frameElement;
    for (; $ && s && w !== _; ) {
      const v = xt($), k = $.getBoundingClientRect(), I = getComputedStyle($);
      k.x += ($.clientLeft + parseFloat(I.paddingLeft)) * v.x, k.y += ($.clientTop + parseFloat(I.paddingTop)) * v.y, h *= v.x, p *= v.y, g *= v.x, m *= v.y, h += k.x, p += k.y, $ = ke($).frameElement;
    }
  }
  return { width: g, height: m, top: p, right: h + g, bottom: p + m, left: h, x: h, y: p };
}
function Qe(e) {
  return ((si(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function rs(e) {
  return Ae(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function ai(e) {
  return ft(Qe(e)).left + rs(e).scrollLeft;
}
function iu(e, t, r) {
  const s = Fe(t), o = Qe(t), n = ft(e, !0, r === "fixed", t);
  let i = { scrollLeft: 0, scrollTop: 0 };
  const l = { x: 0, y: 0 };
  if (s || !s && r !== "fixed")
    if ((st(t) !== "body" || ts(o)) && (i = rs(t)), Fe(t)) {
      const a = ft(t, !0);
      l.x = a.x + t.clientLeft, l.y = a.y + t.clientTop;
    } else
      o && (l.x = ai(o));
  return { x: n.left + i.scrollLeft - l.x, y: n.top + i.scrollTop - l.y, width: n.width, height: n.height };
}
function ur(e) {
  if (st(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || (Jo(e) ? e.host : null) || Qe(e);
  return Jo(t) ? t.host : t;
}
function Qo(e) {
  return Fe(e) && Pe(e).position !== "fixed" ? e.offsetParent : null;
}
function en(e) {
  const t = ke(e);
  let r = Qo(e);
  for (; r && nu(r) && Pe(r).position === "static"; )
    r = Qo(r);
  return r && (st(r) === "html" || st(r) === "body" && Pe(r).position === "static" && !Is(r)) ? t : r || function(s) {
    let o = ur(s);
    for (; Fe(o) && !to(o); ) {
      if (Is(o))
        return o;
      o = ur(o);
    }
    return null;
  }(e) || t;
}
function ci(e) {
  const t = ur(e);
  return to(t) ? e.ownerDocument.body : Fe(t) && ts(t) ? t : ci(t);
}
function Ht(e, t) {
  var r;
  t === void 0 && (t = []);
  const s = ci(e), o = s === ((r = e.ownerDocument) == null ? void 0 : r.body), n = ke(s);
  return o ? t.concat(n, n.visualViewport || [], ts(s) ? s : []) : t.concat(s, Ht(s));
}
function tn(e, t, r) {
  return t === "viewport" ? qr(function(s, o) {
    const n = ke(s), i = Qe(s), l = n.visualViewport;
    let a = i.clientWidth, c = i.clientHeight, u = 0, h = 0;
    if (l) {
      a = l.width, c = l.height;
      const p = oi();
      (p || !p && o === "fixed") && (u = l.offsetLeft, h = l.offsetTop);
    }
    return { width: a, height: c, x: u, y: h };
  }(e, r)) : Ae(t) ? function(s, o) {
    const n = ft(s, !0, o === "fixed"), i = n.top + s.clientTop, l = n.left + s.clientLeft, a = Fe(s) ? xt(s) : { x: 1, y: 1 }, c = s.clientWidth * a.x, u = s.clientHeight * a.y, h = l * a.x, p = i * a.y;
    return { top: p, left: h, right: h + c, bottom: p + u, x: h, y: p, width: c, height: u };
  }(t, r) : qr(function(s) {
    var o;
    const n = Qe(s), i = rs(s), l = (o = s.ownerDocument) == null ? void 0 : o.body, a = Ft(n.scrollWidth, n.clientWidth, l ? l.scrollWidth : 0, l ? l.clientWidth : 0), c = Ft(n.scrollHeight, n.clientHeight, l ? l.scrollHeight : 0, l ? l.clientHeight : 0);
    let u = -i.scrollLeft + ai(s);
    const h = -i.scrollTop;
    return Pe(l || n).direction === "rtl" && (u += Ft(n.clientWidth, l ? l.clientWidth : 0) - a), { width: a, height: c, x: u, y: h };
  }(Qe(e)));
}
var lu = { getClippingRect: function(e) {
  let { element: t, boundary: r, rootBoundary: s, strategy: o } = e;
  const n = r === "clippingAncestors" ? function(c, u) {
    const h = u.get(c);
    if (h)
      return h;
    let p = Ht(c).filter((w) => Ae(w) && st(w) !== "body"), g = null;
    const m = Pe(c).position === "fixed";
    let _ = m ? ur(c) : c;
    for (; Ae(_) && !to(_); ) {
      const w = Pe(_), $ = Is(_);
      (m ? $ || g : $ || w.position !== "static" || !g || !["absolute", "fixed"].includes(g.position)) ? g = w : p = p.filter((v) => v !== _), _ = ur(_);
    }
    return u.set(c, p), p;
  }(t, this._c) : [].concat(r), i = [...n, s], l = i[0], a = i.reduce((c, u) => {
    const h = tn(t, u, o);
    return c.top = Ft(h.top, c.top), c.right = Xo(h.right, c.right), c.bottom = Xo(h.bottom, c.bottom), c.left = Ft(h.left, c.left), c;
  }, tn(t, l, o));
  return { width: a.right - a.left, height: a.bottom - a.top, x: a.left, y: a.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: r, strategy: s } = e;
  const o = Fe(r), n = Qe(r);
  if (r === n)
    return t;
  let i = { scrollLeft: 0, scrollTop: 0 }, l = { x: 1, y: 1 };
  const a = { x: 0, y: 0 };
  if ((o || !o && s !== "fixed") && ((st(r) !== "body" || ts(n)) && (i = rs(r)), Fe(r))) {
    const c = ft(r);
    l = xt(r), a.x = c.x + r.clientLeft, a.y = c.y + r.clientTop;
  }
  return { width: t.width * l.x, height: t.height * l.y, x: t.x * l.x - i.scrollLeft * l.x + a.x, y: t.y * l.y - i.scrollTop * l.y + a.y };
}, isElement: Ae, getDimensions: function(e) {
  return ni(e);
}, getOffsetParent: en, getDocumentElement: Qe, getScale: xt, async getElementRects(e) {
  let { reference: t, floating: r, strategy: s } = e;
  const o = this.getOffsetParent || en, n = this.getDimensions;
  return { reference: iu(t, await o(r), s), floating: H({ x: 0, y: 0 }, await n(r)) };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => Pe(e).direction === "rtl" };
function au(e, t, r, s) {
  s === void 0 && (s = {});
  const { ancestorScroll: o = !0, ancestorResize: n = !0, elementResize: i = !0, animationFrame: l = !1 } = s, a = o && !l, c = a || n ? [...Ae(e) ? Ht(e) : e.contextElement ? Ht(e.contextElement) : [], ...Ht(t)] : [];
  c.forEach((g) => {
    a && g.addEventListener("scroll", r, { passive: !0 }), n && g.addEventListener("resize", r);
  });
  let u, h = null;
  if (i) {
    let g = !0;
    h = new ResizeObserver(() => {
      g || r(), g = !1;
    }), Ae(e) && !l && h.observe(e), Ae(e) || !e.contextElement || l || h.observe(e.contextElement), h.observe(t);
  }
  let p = l ? ft(e) : null;
  return l && function g() {
    const m = ft(e);
    !p || m.x === p.x && m.y === p.y && m.width === p.width && m.height === p.height || r(), p = m, u = requestAnimationFrame(g);
  }(), r(), () => {
    var g;
    c.forEach((m) => {
      a && m.removeEventListener("scroll", r), n && m.removeEventListener("resize", r);
    }), (g = h) == null || g.disconnect(), h = null, l && cancelAnimationFrame(u);
  };
}
var cu = (e, t, r) => {
  const s = /* @__PURE__ */ new Map(), o = H({ platform: lu }, r), n = pe(H({}, o.platform), { _c: s });
  return Kc(e, t, pe(H({}, o), { platform: n }));
}, Z = class extends ae {
  constructor() {
    super(...arguments), this.active = !1, this.placement = "top", this.strategy = "absolute", this.distance = 0, this.skidding = 0, this.arrow = !1, this.arrowPlacement = "anchor", this.arrowPadding = 10, this.flip = !1, this.flipFallbackPlacements = "", this.flipFallbackStrategy = "best-fit", this.flipPadding = 0, this.shift = !1, this.shiftPadding = 0, this.autoSizePadding = 0;
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this.start();
  }
  disconnectedCallback() {
    this.stop();
  }
  async updated(e) {
    super.updated(e), e.has("active") && (this.active ? this.start() : this.stop()), e.has("anchor") && this.handleAnchorChange(), this.active && (await this.updateComplete, this.reposition());
  }
  async handleAnchorChange() {
    if (await this.stop(), this.anchor && typeof this.anchor == "string") {
      const e = this.getRootNode();
      this.anchorEl = e.getElementById(this.anchor);
    } else
      this.anchor instanceof Element ? this.anchorEl = this.anchor : this.anchorEl = this.querySelector('[slot="anchor"]');
    if (this.anchorEl instanceof HTMLSlotElement && (this.anchorEl = this.anchorEl.assignedElements({ flatten: !0 })[0]), !this.anchorEl)
      throw new Error(
        "Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute."
      );
    this.start();
  }
  start() {
    !this.anchorEl || (this.cleanup = au(this.anchorEl, this.popup, () => {
      this.reposition();
    }));
  }
  async stop() {
    return new Promise((e) => {
      this.cleanup ? (this.cleanup(), this.cleanup = void 0, this.removeAttribute("data-current-placement"), this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height"), requestAnimationFrame(() => e())) : e();
    });
  }
  reposition() {
    if (!this.active || !this.anchorEl)
      return;
    const e = [
      ru({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    this.sync ? e.push(
      Yo({
        apply: ({ rects: t }) => {
          const r = this.sync === "width" || this.sync === "both", s = this.sync === "height" || this.sync === "both";
          this.popup.style.width = r ? `${t.reference.width}px` : "", this.popup.style.height = s ? `${t.reference.height}px` : "";
        }
      })
    ) : (this.popup.style.width = "", this.popup.style.height = ""), this.flip && e.push(
      tu({
        boundary: this.flipBoundary,
        fallbackPlacements: this.flipFallbackPlacements,
        fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
        padding: this.flipPadding
      })
    ), this.shift && e.push(
      ou({
        boundary: this.shiftBoundary,
        padding: this.shiftPadding
      })
    ), this.autoSize ? e.push(
      Yo({
        boundary: this.autoSizeBoundary,
        padding: this.autoSizePadding,
        apply: ({ availableWidth: t, availableHeight: r }) => {
          this.autoSize === "vertical" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-height", `${r}px`) : this.style.removeProperty("--auto-size-available-height"), this.autoSize === "horizontal" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-width", `${t}px`) : this.style.removeProperty("--auto-size-available-width");
        }
      })
    ) : (this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height")), this.arrow && e.push(
      Yc({
        element: this.arrowEl,
        padding: this.arrowPadding
      })
    ), cu(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware: e,
      strategy: this.strategy
    }).then(({ x: t, y: r, middlewareData: s, placement: o }) => {
      const n = getComputedStyle(this).direction === "rtl", i = { top: "bottom", right: "left", bottom: "top", left: "right" }[o.split("-")[0]];
      if (this.setAttribute("data-current-placement", o), Object.assign(this.popup.style, {
        left: `${t}px`,
        top: `${r}px`
      }), this.arrow) {
        const l = s.arrow.x, a = s.arrow.y;
        let c = "", u = "", h = "", p = "";
        if (this.arrowPlacement === "start") {
          const g = typeof l == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          c = typeof a == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "", u = n ? g : "", p = n ? "" : g;
        } else if (this.arrowPlacement === "end") {
          const g = typeof l == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          u = n ? "" : g, p = n ? g : "", h = typeof a == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else
          this.arrowPlacement === "center" ? (p = typeof l == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "", c = typeof a == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "") : (p = typeof l == "number" ? `${l}px` : "", c = typeof a == "number" ? `${a}px` : "");
        Object.assign(this.arrowEl.style, {
          top: c,
          right: u,
          bottom: h,
          left: p,
          [i]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    }), this.emit("sl-reposition");
  }
  render() {
    return V`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${fe({
      popup: !0,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? V`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
Z.styles = Wc;
d([
  se(".popup")
], Z.prototype, "popup", 2);
d([
  se(".popup__arrow")
], Z.prototype, "arrowEl", 2);
d([
  f()
], Z.prototype, "anchor", 2);
d([
  f({ type: Boolean, reflect: !0 })
], Z.prototype, "active", 2);
d([
  f({ reflect: !0 })
], Z.prototype, "placement", 2);
d([
  f({ reflect: !0 })
], Z.prototype, "strategy", 2);
d([
  f({ type: Number })
], Z.prototype, "distance", 2);
d([
  f({ type: Number })
], Z.prototype, "skidding", 2);
d([
  f({ type: Boolean })
], Z.prototype, "arrow", 2);
d([
  f({ attribute: "arrow-placement" })
], Z.prototype, "arrowPlacement", 2);
d([
  f({ attribute: "arrow-padding", type: Number })
], Z.prototype, "arrowPadding", 2);
d([
  f({ type: Boolean })
], Z.prototype, "flip", 2);
d([
  f({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (e) => e.split(" ").map((t) => t.trim()).filter((t) => t !== ""),
      toAttribute: (e) => e.join(" ")
    }
  })
], Z.prototype, "flipFallbackPlacements", 2);
d([
  f({ attribute: "flip-fallback-strategy" })
], Z.prototype, "flipFallbackStrategy", 2);
d([
  f({ type: Object })
], Z.prototype, "flipBoundary", 2);
d([
  f({ attribute: "flip-padding", type: Number })
], Z.prototype, "flipPadding", 2);
d([
  f({ type: Boolean })
], Z.prototype, "shift", 2);
d([
  f({ type: Object })
], Z.prototype, "shiftBoundary", 2);
d([
  f({ attribute: "shift-padding", type: Number })
], Z.prototype, "shiftPadding", 2);
d([
  f({ attribute: "auto-size" })
], Z.prototype, "autoSize", 2);
d([
  f()
], Z.prototype, "sync", 2);
d([
  f({ type: Object })
], Z.prototype, "autoSizeBoundary", 2);
d([
  f({ attribute: "auto-size-padding", type: Number })
], Z.prototype, "autoSizePadding", 2);
Z = d([
  ve("sl-popup")
], Z);
var uu = le`
  ${be}

  :host {
    display: block;
    user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`, Se = class extends ae {
  constructor() {
    super(...arguments), this.localize = new nt(this), this.current = !1, this.selected = !1, this.hasHover = !1, this.value = "", this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "option"), this.setAttribute("aria-selected", "false");
  }
  handleDefaultSlotChange() {
    const e = this.getTextLabel();
    if (typeof this.cachedTextLabel > "u") {
      this.cachedTextLabel = e;
      return;
    }
    e !== this.cachedTextLabel && (this.cachedTextLabel = e, this.emit("slotchange", { bubbles: !0, composed: !1, cancelable: !1 }));
  }
  handleMouseEnter() {
    this.hasHover = !0;
  }
  handleMouseLeave() {
    this.hasHover = !1;
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleSelectedChange() {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleValueChange() {
    this.value.includes(" ") && (console.error("Option values cannot include a space. All spaces have been replaced with underscores.", this), this.value = this.value.replace(/ /g, "_"));
  }
  getTextLabel() {
    var e;
    return ((e = this.textContent) != null ? e : "").trim();
  }
  render() {
    return V`
      <div
        part="base"
        class=${fe({
      option: !0,
      "option--current": this.current,
      "option--disabled": this.disabled,
      "option--selected": this.selected,
      "option--hover": this.hasHover
    })}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
};
Se.styles = uu;
d([
  se(".option__label")
], Se.prototype, "defaultSlot", 2);
d([
  ue()
], Se.prototype, "current", 2);
d([
  ue()
], Se.prototype, "selected", 2);
d([
  ue()
], Se.prototype, "hasHover", 2);
d([
  f({ reflect: !0 })
], Se.prototype, "value", 2);
d([
  f({ type: Boolean, reflect: !0 })
], Se.prototype, "disabled", 2);
d([
  ee("disabled")
], Se.prototype, "handleDisabledChange", 1);
d([
  ee("selected")
], Se.prototype, "handleSelectedChange", 1);
d([
  ee("value")
], Se.prototype, "handleValueChange", 1);
Se = d([
  ve("sl-option")
], Se);
const du = /* @__PURE__ */ J("<div><sl-select></sl-select></div>"), hu = /* @__PURE__ */ J("<sl-option></sl-option>"), pu = (e = {}) => {
  const r = {
    ...{
      languageCodeOnly: !1
    },
    ...e
  }, s = navigator.languages === void 0 ? [navigator.language] : navigator.languages;
  return s ? s.map((o) => {
    const n = o.trim();
    return r.languageCodeOnly ? n.split(/-|_/)[0] : n;
  }) : [];
}, fu = (e) => {
  const [t, {
    locale: r,
    dict: s
  }] = ot(), o = (l) => {
    localStorage.langCode = l, r(l);
  };
  let n = localStorage.langCode;
  if (!n) {
    const l = pu({
      languageCodeOnly: !0
    });
    n = s(l[0] || "") ? l[0] : "no";
  }
  o(n);
  const i = ne(() => Po.find(({
    code: l
  }) => l === r()));
  return (() => {
    const l = Q(() => document.importNode(du, !0)), a = l.firstChild;
    return a.addEventListener("sl-change", (c) => o(c.target.value)), a._$owner = X(), z(a, C(Ri, {
      each: Po,
      children: (c) => (() => {
        const u = Q(() => document.importNode(hu, !0));
        return u._$owner = X(), z(u, () => c.name), ze(() => oe(u, "value", c.code)), u;
      })()
    })), ze(() => {
      var c;
      return oe(a, "value", (c = i()) == null ? void 0 : c.code);
    }), l;
  })();
}, mu = /* @__PURE__ */ J("<sl-avatar></sl-avatar>"), gu = /* @__PURE__ */ J('<div class="top-bar"><menu></menu><h1></h1></div>'), bu = ({
  firstName: e,
  lastName: t
}) => [e, t].reduce((r, s) => (r = r + (s.length ? s[0] : ""), r), ""), vu = (e) => {
  const [t] = ot(), {
    profile: r,
    auth: s
  } = Lt(), o = ne(() => bu(r.state));
  return (() => {
    const n = gu.cloneNode(!0), i = n.firstChild, l = i.nextSibling;
    return z(i, C(Ve, {
      get when() {
        return s.authenticated();
      },
      get children() {
        const a = Q(() => document.importNode(mu, !0));
        return a._$owner = X(), ze(() => oe(a, "initials", o())), a;
      }
    }), null), z(i, C(fu, {}), null), z(i, C(Ve, {
      get when() {
        return s.authenticated();
      },
      get children() {
        return C(Vc, {});
      }
    }), null), z(l, () => t(e.title)), n;
  })();
}, yu = /* @__PURE__ */ J("<section><h2></h2><p>Not implemented!</p></section>"), Rs = (e) => (() => {
  const t = yu.cloneNode(!0), r = t.firstChild;
  return z(r, () => e.title), t;
})(), _u = /* @__PURE__ */ J('<div class="form-error">.</div>'), wu = /* @__PURE__ */ J("<section><h2></h2></section>"), xu = $e.object({
  firstName: Uo,
  lastName: Uo,
  address: Pc,
  phone: Lc
}), ku = () => {
  const [e] = ot(), {
    auth: t,
    profile: r
  } = Lt(), [s, o] = Y(), [n, i] = mt({
    ...r.state
  }), [l, a] = Y({}), [c] = Je(t.authenticated(), async () => {
    await r.loadDetails(), i(r.state);
  }), [u] = Je(s, r.updateDetails);
  zt(async () => {
    u.error && a({
      formErrors: [e("Error saving")]
    });
  });
  const h = (p) => (g) => {
    i(p, g.target.value);
  };
  return (() => {
    const p = wu.cloneNode(!0), g = p.firstChild;
    return z(g, () => e("Profile")), z(p, C(js, {
      get fallback() {
        return C(Xs, {});
      },
      get children() {
        return [ne(() => qs(c())), C(Js, {
          onSubmit: () => o(Hr(xu, n, a)),
          get children() {
            return [C(Ye, {
              get label() {
                return e("First name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return n.firstName;
              },
              get ["on:sl-change"]() {
                return h("firstName");
              },
              get ["data-invalid"]() {
                var m;
                return !!((m = l().fieldErrors) != null && m.firstName);
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                var m;
                return (m = l().fieldErrors) == null ? void 0 : m.firstName;
              }
            }), C(Ye, {
              get label() {
                return e("Last name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return n.lastName;
              },
              get ["on:sl-change"]() {
                return h("lastName");
              },
              get ["data-invalid"]() {
                var m;
                return !!((m = l().fieldErrors) != null && m.lastName);
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                var m;
                return (m = l().fieldErrors) == null ? void 0 : m.lastName;
              }
            }), C(Ye, {
              get label() {
                return e("Address");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !1,
              get value() {
                return n.address;
              },
              get ["on:sl-change"]() {
                return h("address");
              },
              get ["data-invalid"]() {
                var m;
                return !!((m = l().fieldErrors) != null && m.address);
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                var m;
                return (m = l().fieldErrors) == null ? void 0 : m.address;
              }
            }), C(Ye, {
              get label() {
                return e("Phone");
              },
              inputmode: "numeric",
              spellcheck: !1,
              clearable: !0,
              get value() {
                return n.phone;
              },
              get ["on:sl-change"]() {
                return h("phone");
              },
              get ["data-invalid"]() {
                var m;
                return !!((m = l().fieldErrors) != null && m.phone);
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                var m;
                return (m = l().fieldErrors) == null ? void 0 : m.phone;
              }
            }), C(Ve, {
              get when() {
                var m;
                return (m = l().formErrors) == null ? void 0 : m.length;
              },
              get children() {
                const m = _u.cloneNode(!0), _ = m.firstChild;
                return z(m, () => {
                  var w;
                  return (w = l().formErrors) == null ? void 0 : w.join(". ");
                }, _), m;
              }
            }), C(cr, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return u.loading;
              },
              get children() {
                return e("Save");
              }
            })];
          }
        })];
      }
    }), null), p;
  })();
}, $u = /* @__PURE__ */ J('<div class="form-error">.</div>'), Su = /* @__PURE__ */ J("<section><h2></h2></section>"), Cu = $e.object({
  email: Jn,
  pass: Xn
}), Au = () => {
  const [e] = ot(), {
    auth: t,
    account: r
  } = Lt(), [s, o] = Y(), [n, i] = mt({
    email: r.state.email,
    pass: ""
  }), [l, a] = Y({}), [c] = Je(t.authenticated(), async () => {
    await r.loadDetails(), i(r.state);
  }), [u] = Je(s, r.updateDetails);
  zt(async () => {
    u.error && (console.log(u.error), a({
      formErrors: [e("Error saving")]
    })), u.state === "ready" && i("pass", "");
  });
  const h = (p) => (g) => {
    i(p, g.target.value);
  };
  return (() => {
    const p = Su.cloneNode(!0), g = p.firstChild;
    return z(g, () => e("Account")), z(p, C(js, {
      get fallback() {
        return C(Xs, {});
      },
      get children() {
        return [ne(() => qs(c())), C(Js, {
          onSubmit: () => o(Hr(Cu, n, a)),
          get children() {
            return [C(Ye, {
              get label() {
                return e("Email");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return n.email;
              },
              get ["on:sl-change"]() {
                return h("email");
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                var m;
                return (m = l().fieldErrors) == null ? void 0 : m.email;
              }
            }), C(Ye, {
              get label() {
                return e("Password");
              },
              inputmode: "text",
              clearable: !0,
              type: "password",
              "password-toggle": !0,
              get value() {
                return n.pass;
              },
              get ["on:sl-change"]() {
                return h("pass");
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                var m;
                return (m = l().fieldErrors) == null ? void 0 : m.pass;
              }
            }), C(Ve, {
              get when() {
                var m;
                return (m = l().formErrors) == null ? void 0 : m.length;
              },
              get children() {
                const m = $u.cloneNode(!0), _ = m.firstChild;
                return z(m, () => {
                  var w;
                  return (w = l().formErrors) == null ? void 0 : w.join(". ");
                }, _), m;
              }
            }), C(cr, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return u.loading;
              },
              get children() {
                return e("Save");
              }
            })];
          }
        })];
      }
    }), null), p;
  })();
}, Eu = /* @__PURE__ */ J('<sl-tab-group><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab slot="nav"><sl-icon></sl-icon></sl-tab><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel></sl-tab-group>'), Tu = /* @__PURE__ */ J(`<main class="app"><style data-name="reset"></style><style data-name="theme"></style><style data-name="unocss">/* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}</style><style data-name="custom"></style><div></div></main>`);
vl("default", {
  resolver: (e) => `https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/icons/${e}.svg`
});
const Ou = (e) => {
  const [t] = ot(), {
    auth: r
  } = Lt(), [s, o] = Y();
  return zt(() => {
    const {
      activePanel: n
    } = localStorage, i = s();
    n && i && i.updateComplete.then(() => {
      i.show(n);
    });
  }), an((n) => {
    if (n instanceof Ws)
      console.warn("Session expired, signing out"), r.signout();
    else
      throw n;
  }), (() => {
    const n = Tu.cloneNode(!0), i = n.firstChild, l = i.nextSibling, a = l.nextSibling, c = a.nextSibling, u = c.nextSibling;
    return z(i, ra), z(l, sa), z(c, oa), z(u, C(vu, {
      get title() {
        return e.title;
      }
    }), null), z(u, C(Ve, {
      get when() {
        return !r.authenticated();
      },
      get children() {
        return C(jc, {
          title: "Login"
        });
      }
    }), null), z(u, C(Ve, {
      get when() {
        return r.authenticated();
      },
      get children() {
        const h = Q(() => document.importNode(Eu, !0)), p = h.firstChild, g = p.firstChild, m = p.nextSibling, _ = m.firstChild, w = m.nextSibling, $ = w.firstChild, v = w.nextSibling, k = v.nextSibling, I = k.nextSibling;
        return Ji((j) => o(j), h), h.addEventListener("sl-tab-show", ({
          detail: j
        }) => {
          localStorage.activePanel = j.name;
        }), h._$owner = X(), oe(p, "panel", "account"), p._$owner = X(), oe(g, "name", "person-lock"), g._$owner = X(), z(p, () => t("Account"), null), oe(m, "panel", "subscription"), m._$owner = X(), oe(_, "name", "journal"), _._$owner = X(), z(m, () => t("Subscription"), null), oe(w, "panel", "contact"), w._$owner = X(), oe($, "name", "person-hearts"), $._$owner = X(), z(w, () => t("Contact"), null), oe(v, "name", "account"), v._$owner = X(), z(v, C(Au, {}), null), z(v, C(ku, {}), null), oe(k, "name", "subscription"), k._$owner = X(), z(k, C(Rs, {
          get title() {
            return t("Subscription");
          }
        })), oe(I, "name", "contact"), I._$owner = X(), z(I, C(Rs, {
          get title() {
            return t("Contact");
          }
        })), h;
      }
    }), null), n;
  })();
}, zu = (e) => (an((t) => console.error(`App::onError: ${t}`)), C(ma, {
  get children() {
    return C(wa, {
      get namespace() {
        return e.namespace;
      },
      get database() {
        return e.database;
      },
      get scope() {
        return e.scope;
      },
      get apibaseurl() {
        return e.apibaseurl;
      },
      get children() {
        return C(Ou, {
          get title() {
            return e.title;
          }
        });
      }
    });
  }
}));
yn(
  "membership-widget",
  {
    apibaseurl: "http://localhost:8055/",
    title: "Membership portal",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  zu
);
yn("admin-widget", { title: "Admin widget" }, Rs);
