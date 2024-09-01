function ei(t) {
  return Object.keys(t).reduce((r, n) => {
    const s = t[n];
    return r[n] = Object.assign({}, s), rs(s.value) && !ii(s.value) && !Array.isArray(s.value) && (r[n].value = Object.assign({}, s.value)), Array.isArray(s.value) && (r[n].value = s.value.slice(0)), r;
  }, {});
}
function ti(t) {
  return t ? Object.keys(t).reduce((r, n) => {
    const s = t[n];
    return r[n] = rs(s) && "value" in s ? s : {
      value: s
    }, r[n].attribute || (r[n].attribute = si(n)), r[n].parse = "parse" in r[n] ? r[n].parse : typeof r[n].value != "string", r;
  }, {}) : {};
}
function ri(t) {
  return Object.keys(t).reduce((r, n) => (r[n] = t[n].value, r), {});
}
function ni(t, e) {
  const r = ei(e);
  return Object.keys(e).forEach((s) => {
    const i = r[s], a = t.getAttribute(i.attribute), o = t[s];
    a && (i.value = i.parse ? ts(a) : a), o != null && (i.value = Array.isArray(o) ? o.slice(0) : o), i.reflect && nn(t, i.attribute, i.value, !!i.parse), Object.defineProperty(t, s, {
      get() {
        return i.value;
      },
      set(c) {
        const l = i.value;
        i.value = c, i.reflect && nn(this, i.attribute, i.value, !!i.parse);
        for (let u = 0, d = this.__propertyChangedCallbacks.length; u < d; u++)
          this.__propertyChangedCallbacks[u](s, c, l);
      },
      enumerable: !0,
      configurable: !0
    });
  }), r;
}
function ts(t) {
  if (!!t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function nn(t, e, r, n) {
  if (r == null || r === !1)
    return t.removeAttribute(e);
  let s = n ? JSON.stringify(r) : r;
  t.__updating[e] = !0, s === "true" && (s = ""), t.setAttribute(e, s), Promise.resolve().then(() => delete t.__updating[e]);
}
function si(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, r) => "-" + r.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function rs(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function ii(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function ai(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let vr;
function oi(t, e) {
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
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = ni(this, e);
      const s = ri(this.props), i = this.Component, a = vr;
      try {
        vr = this, this.__initialized = !0, ai(i) ? new i(s, {
          element: this
        }) : i(s, {
          element: this
        });
      } finally {
        vr = a;
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
        this[s] = e[s].parse ? ts(a) : a;
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
function ci(t, e = {}, r = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: s,
    customElements: i = window.customElements
  } = r;
  return (a) => {
    if (!t)
      throw new Error("tag is required to register a Component");
    let o = i.get(t);
    return o ? (o.prototype.Component = a, o) : (o = oi(n, ti(e)), o.prototype.Component = a, o.prototype.registeredTag = t, i.define(t, o, s), o);
  };
}
const E = {
  context: void 0,
  registry: void 0,
  done: !1,
  getContextId() {
    return sn(this.context.count);
  },
  getNextContextId() {
    return sn(this.context.count++);
  }
};
function sn(t) {
  const e = String(t), r = e.length - 1;
  return E.context.id + (r ? String.fromCharCode(96 + r) : "") + e;
}
function He(t) {
  E.context = t;
}
const li = (t, e) => t === e, ie = Symbol("solid-proxy"), Cr = Symbol("solid-track"), Gt = {
  equals: li
};
let rt = null, ns = cs;
const de = 1, zt = 2, ss = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, wr = {};
var T = null;
let Le = null, ui = null, P = null, K = null, q = null, lr = 0;
function nt(t, e) {
  const r = P, n = T, s = t.length === 0, i = e === void 0 ? n : e, a = s ? ss : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, o = s ? t : () => t(() => re(() => ur(a)));
  T = a, P = null;
  try {
    return we(o, !0);
  } finally {
    P = r, T = n;
  }
}
function I(t, e) {
  e = e ? Object.assign({}, Gt, e) : Gt;
  const r = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, n = (s) => (typeof s == "function" && (s = s(r.value)), os(r, s));
  return [as.bind(r), n];
}
function an(t, e, r) {
  const n = Et(t, e, !0, de);
  Je(n);
}
function H(t, e, r) {
  const n = Et(t, e, !1, de);
  Je(n);
}
function st(t, e, r) {
  ns = bi;
  const n = Et(t, e, !1, de), s = Ve && Ke(Ve);
  s && (n.suspense = s), (!r || !r.render) && (n.user = !0), q ? q.push(n) : Je(n);
}
function F(t, e, r) {
  r = r ? Object.assign({}, Gt, r) : Gt;
  const n = Et(t, e, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, Je(n), as.bind(n);
}
function di(t) {
  return t && typeof t == "object" && "then" in t;
}
function te(t, e, r) {
  let n, s, i;
  arguments.length === 2 && typeof e == "object" || arguments.length === 1 ? (n = !0, s = t, i = e || {}) : (n = t, s = e, i = r || {});
  let a = null, o = wr, c = null, l = !1, u = !1, d = "initialValue" in i, _ = typeof n == "function" && F(n);
  const m = /* @__PURE__ */ new Set(), [S, C] = (i.storage || I)(i.initialValue), [L, $] = I(void 0), [O, U] = I(void 0, {
    equals: !1
  }), [W, fe] = I(d ? "ready" : "unresolved");
  E.context && (c = E.getNextContextId(), i.ssrLoadFrom === "initial" ? o = i.initialValue : E.load && E.has(c) && (o = E.load(c)));
  function ye(Z, V, B, je) {
    return a === Z && (a = null, je !== void 0 && (d = !0), (Z === o || V === o) && i.onHydrated && queueMicrotask(
      () => i.onHydrated(je, {
        value: V
      })
    ), o = wr, Qs(V, B)), V;
  }
  function Qs(Z, V) {
    we(() => {
      V === void 0 && C(() => Z), fe(V !== void 0 ? "errored" : d ? "ready" : "unresolved"), $(V);
      for (const B of m.keys())
        B.decrement();
      m.clear();
    }, !1);
  }
  function yr() {
    const Z = Ve && Ke(Ve), V = S(), B = L();
    if (B !== void 0 && !a)
      throw B;
    return P && !P.user && Z && an(() => {
      O(), a && (Z.resolved && Le && l ? Le.promises.add(a) : m.has(Z) || (Z.increment(), m.add(Z)));
    }), V;
  }
  function br(Z = !0) {
    if (Z !== !1 && u)
      return;
    u = !1;
    const V = _ ? _() : n;
    if (l = Le, V == null || V === !1) {
      ye(a, re(S));
      return;
    }
    const B = o !== wr ? o : re(
      () => s(V, {
        value: S(),
        refetching: Z
      })
    );
    return di(B) ? (a = B, "value" in B ? (B.status === "success" ? ye(a, B.value, void 0, V) : ye(a, void 0, Tr(B.value), V), B) : (u = !0, queueMicrotask(() => u = !1), we(() => {
      fe(d ? "refreshing" : "pending"), U();
    }, !1), B.then(
      (je) => ye(B, je, void 0, V),
      (je) => ye(B, void 0, Tr(je), V)
    ))) : (ye(a, B, void 0, V), B);
  }
  return Object.defineProperties(yr, {
    state: {
      get: () => W()
    },
    error: {
      get: () => L()
    },
    loading: {
      get() {
        const Z = W();
        return Z === "pending" || Z === "refreshing";
      }
    },
    latest: {
      get() {
        if (!d)
          return yr();
        const Z = L();
        if (Z && !a)
          throw Z;
        return S();
      }
    }
  }), _ ? an(() => br(!1)) : br(!1), [
    yr,
    {
      refetch: br,
      mutate: C
    }
  ];
}
function fi(t) {
  return we(t, !1);
}
function re(t) {
  if (P === null)
    return t();
  const e = P;
  P = null;
  try {
    return t();
  } finally {
    P = e;
  }
}
function it(t) {
  return T === null || (T.cleanups === null ? T.cleanups = [t] : T.cleanups.push(t)), t;
}
function is(t, e) {
  rt || (rt = Symbol("error")), T = Et(void 0, void 0, !0), T.context = {
    ...T.context,
    [rt]: [e]
  };
  try {
    return t();
  } catch (r) {
    dr(r);
  } finally {
    T = T.owner;
  }
}
function Ar() {
  return P;
}
function D() {
  return T;
}
function hi(t) {
  q.push.apply(q, t), t.length = 0;
}
function St(t, e) {
  const r = Symbol("context");
  return {
    id: r,
    Provider: vi(r),
    defaultValue: t
  };
}
function Ke(t) {
  let e;
  return T && T.context && (e = T.context[t.id]) !== void 0 ? e : t.defaultValue;
}
function pi(t) {
  const e = F(t), r = F(() => $r(e()));
  return r.toArray = () => {
    const n = r();
    return Array.isArray(n) ? n : n != null ? [n] : [];
  }, r;
}
let Ve;
function mi() {
  return Ve || (Ve = St());
}
function as() {
  if (this.sources && this.state)
    if (this.state === de)
      Je(this);
    else {
      const t = K;
      K = null, we(() => Wt(this), !1), K = t;
    }
  if (P) {
    const t = this.observers ? this.observers.length : 0;
    P.sources ? (P.sources.push(this), P.sourceSlots.push(t)) : (P.sources = [this], P.sourceSlots = [t]), this.observers ? (this.observers.push(P), this.observerSlots.push(P.sources.length - 1)) : (this.observers = [P], this.observerSlots = [P.sources.length - 1]);
  }
  return this.value;
}
function os(t, e, r) {
  let n = t.value;
  return (!t.comparator || !t.comparator(n, e)) && (t.value = e, t.observers && t.observers.length && we(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const i = t.observers[s], a = Le && Le.running;
      a && Le.disposed.has(i), (a ? !i.tState : !i.state) && (i.pure ? K.push(i) : q.push(i), i.observers && ls(i)), a || (i.state = de);
    }
    if (K.length > 1e6)
      throw K = [], new Error();
  }, !1)), e;
}
function Je(t) {
  if (!t.fn)
    return;
  ur(t);
  const e = lr;
  gi(
    t,
    t.value,
    e
  );
}
function gi(t, e, r) {
  let n;
  const s = T, i = P;
  P = T = t;
  try {
    n = t.fn(e);
  } catch (a) {
    return t.pure && (t.state = de, t.owned && t.owned.forEach(ur), t.owned = null), t.updatedAt = r + 1, dr(a);
  } finally {
    P = i, T = s;
  }
  (!t.updatedAt || t.updatedAt <= r) && (t.updatedAt != null && "observers" in t ? os(t, n) : t.value = n, t.updatedAt = r);
}
function Et(t, e, r, n = de, s) {
  const i = {
    fn: t,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: T,
    context: T ? T.context : null,
    pure: r
  };
  return T === null || T !== ss && (T.owned ? T.owned.push(i) : T.owned = [i]), i;
}
function Ft(t) {
  if (t.state === 0)
    return;
  if (t.state === zt)
    return Wt(t);
  if (t.suspense && re(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < lr); )
    t.state && e.push(t);
  for (let r = e.length - 1; r >= 0; r--)
    if (t = e[r], t.state === de)
      Je(t);
    else if (t.state === zt) {
      const n = K;
      K = null, we(() => Wt(t, e[0]), !1), K = n;
    }
}
function we(t, e) {
  if (K)
    return t();
  let r = !1;
  e || (K = []), q ? r = !0 : q = [], lr++;
  try {
    const n = t();
    return yi(r), n;
  } catch (n) {
    r || (q = null), K = null, dr(n);
  }
}
function yi(t) {
  if (K && (cs(K), K = null), t)
    return;
  const e = q;
  q = null, e.length && we(() => ns(e), !1);
}
function cs(t) {
  for (let e = 0; e < t.length; e++)
    Ft(t[e]);
}
function bi(t) {
  let e, r = 0;
  for (e = 0; e < t.length; e++) {
    const n = t[e];
    n.user ? t[r++] = n : Ft(n);
  }
  if (E.context) {
    if (E.count) {
      E.effects || (E.effects = []), E.effects.push(...t.slice(0, r));
      return;
    } else
      E.effects && (t = [...E.effects, ...t], r += E.effects.length, delete E.effects);
    He();
  }
  for (e = 0; e < r; e++)
    Ft(t[e]);
}
function Wt(t, e) {
  t.state = 0;
  for (let r = 0; r < t.sources.length; r += 1) {
    const n = t.sources[r];
    if (n.sources) {
      const s = n.state;
      s === de ? n !== e && (!n.updatedAt || n.updatedAt < lr) && Ft(n) : s === zt && Wt(n, e);
    }
  }
}
function ls(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const r = t.observers[e];
    r.state || (r.state = zt, r.pure ? K.push(r) : q.push(r), r.observers && ls(r));
  }
}
function ur(t) {
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
    for (e = t.owned.length - 1; e >= 0; e--)
      ur(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--)
      t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0;
}
function Tr(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function on(t, e, r) {
  try {
    for (const n of e)
      n(t);
  } catch (n) {
    dr(n, r && r.owner || null);
  }
}
function dr(t, e = T) {
  const r = rt && e && e.context && e.context[rt], n = Tr(t);
  if (!r)
    throw n;
  q ? q.push({
    fn() {
      on(n, r, e);
    },
    state: de
  }) : on(n, r, e);
}
function $r(t) {
  if (typeof t == "function" && !t.length)
    return $r(t());
  if (Array.isArray(t)) {
    const e = [];
    for (let r = 0; r < t.length; r++) {
      const n = $r(t[r]);
      Array.isArray(n) ? e.push.apply(e, n) : e.push(n);
    }
    return e;
  }
  return t;
}
function vi(t, e) {
  return function(n) {
    let s;
    return H(
      () => s = re(() => (T.context = {
        ...T.context,
        [t]: n.value
      }, pi(() => n.children))),
      void 0
    ), s;
  };
}
function at(t) {
  const [e, r] = I(void 0, {
    equals: !1
  });
  if ("subscribe" in t) {
    const n = t.subscribe((s) => r(() => s));
    it(() => "unsubscribe" in n ? n.unsubscribe() : n());
  } else {
    const n = t(r);
    it(n);
  }
  return e;
}
const wi = Symbol("fallback");
function cn(t) {
  for (let e = 0; e < t.length; e++)
    t[e]();
}
function _i(t, e, r = {}) {
  let n = [], s = [], i = [], a = 0, o = e.length > 1 ? [] : null;
  return it(() => cn(i)), () => {
    let c = t() || [], l = c.length, u, d;
    return c[Cr], re(() => {
      let m, S, C, L, $, O, U, W, fe;
      if (l === 0)
        a !== 0 && (cn(i), i = [], n = [], s = [], a = 0, o && (o = [])), r.fallback && (n = [wi], s[0] = nt((ye) => (i[0] = ye, r.fallback())), a = 1);
      else if (a === 0) {
        for (s = new Array(l), d = 0; d < l; d++)
          n[d] = c[d], s[d] = nt(_);
        a = l;
      } else {
        for (C = new Array(l), L = new Array(l), o && ($ = new Array(l)), O = 0, U = Math.min(a, l); O < U && n[O] === c[O]; O++)
          ;
        for (U = a - 1, W = l - 1; U >= O && W >= O && n[U] === c[W]; U--, W--)
          C[W] = s[U], L[W] = i[U], o && ($[W] = o[U]);
        for (m = /* @__PURE__ */ new Map(), S = new Array(W + 1), d = W; d >= O; d--)
          fe = c[d], u = m.get(fe), S[d] = u === void 0 ? -1 : u, m.set(fe, d);
        for (u = O; u <= U; u++)
          fe = n[u], d = m.get(fe), d !== void 0 && d !== -1 ? (C[d] = s[u], L[d] = i[u], o && ($[d] = o[u]), d = S[d], m.set(fe, d)) : i[u]();
        for (d = O; d < l; d++)
          d in C ? (s[d] = C[d], i[d] = L[d], o && (o[d] = $[d], o[d](d))) : s[d] = nt(_);
        s = s.slice(0, a = l), n = c.slice(0);
      }
      return s;
    });
    function _(m) {
      if (i[d] = m, o) {
        const [S, C] = I(d);
        return o[d] = C, e(c[d], S);
      }
      return e(c[d]);
    }
  };
}
function g(t, e) {
  return re(() => t(e || {}));
}
function Nt() {
  return !0;
}
const Or = {
  get(t, e, r) {
    return e === ie ? r : t.get(e);
  },
  has(t, e) {
    return e === ie ? !0 : t.has(e);
  },
  set: Nt,
  deleteProperty: Nt,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: Nt,
      deleteProperty: Nt
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function _r(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function xi() {
  for (let t = 0, e = this.length; t < e; ++t) {
    const r = this[t]();
    if (r !== void 0)
      return r;
  }
}
function fr(...t) {
  let e = !1;
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    e = e || !!o && ie in o, t[a] = typeof o == "function" ? (e = !0, F(o)) : o;
  }
  if (e)
    return new Proxy(
      {
        get(a) {
          for (let o = t.length - 1; o >= 0; o--) {
            const c = _r(t[o])[a];
            if (c !== void 0)
              return c;
          }
        },
        has(a) {
          for (let o = t.length - 1; o >= 0; o--)
            if (a in _r(t[o]))
              return !0;
          return !1;
        },
        keys() {
          const a = [];
          for (let o = 0; o < t.length; o++)
            a.push(...Object.keys(_r(t[o])));
          return [...new Set(a)];
        }
      },
      Or
    );
  const r = {}, n = /* @__PURE__ */ Object.create(null);
  for (let a = t.length - 1; a >= 0; a--) {
    const o = t[a];
    if (!o)
      continue;
    const c = Object.getOwnPropertyNames(o);
    for (let l = c.length - 1; l >= 0; l--) {
      const u = c[l];
      if (u === "__proto__" || u === "constructor")
        continue;
      const d = Object.getOwnPropertyDescriptor(o, u);
      if (!n[u])
        n[u] = d.get ? {
          enumerable: !0,
          configurable: !0,
          get: xi.bind(r[u] = [d.get.bind(o)])
        } : d.value !== void 0 ? d : void 0;
      else {
        const _ = r[u];
        _ && (d.get ? _.push(d.get.bind(o)) : d.value !== void 0 && _.push(() => d.value));
      }
    }
  }
  const s = {}, i = Object.keys(n);
  for (let a = i.length - 1; a >= 0; a--) {
    const o = i[a], c = n[o];
    c && c.get ? Object.defineProperty(s, o, c) : s[o] = c ? c.value : void 0;
  }
  return s;
}
function Fr(t, ...e) {
  if (ie in t) {
    const s = new Set(e.length > 1 ? e.flat() : e[0]), i = e.map((a) => new Proxy(
      {
        get(o) {
          return a.includes(o) ? t[o] : void 0;
        },
        has(o) {
          return a.includes(o) && o in t;
        },
        keys() {
          return a.filter((o) => o in t);
        }
      },
      Or
    ));
    return i.push(
      new Proxy(
        {
          get(a) {
            return s.has(a) ? void 0 : t[a];
          },
          has(a) {
            return s.has(a) ? !1 : a in t;
          },
          keys() {
            return Object.keys(t).filter((a) => !s.has(a));
          }
        },
        Or
      )
    ), i;
  }
  const r = {}, n = e.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(t)) {
    const i = Object.getOwnPropertyDescriptor(t, s), a = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let o = !1, c = 0;
    for (const l of e)
      l.includes(s) && (o = !0, a ? n[c][s] = i.value : Object.defineProperty(n[c], s, i)), ++c;
    o || (a ? r[s] = i.value : Object.defineProperty(r, s, i));
  }
  return [...n, r];
}
const ki = (t) => `Stale read from <${t}>.`;
function us(t) {
  const e = "fallback" in t && {
    fallback: () => t.fallback
  };
  return F(_i(() => t.each, t.children, e || void 0));
}
function _e(t) {
  const e = t.keyed, r = F(() => t.when, void 0, {
    equals: (n, s) => e ? n === s : !n == !s
  });
  return F(
    () => {
      const n = r();
      if (n) {
        const s = t.children;
        return typeof s == "function" && s.length > 0 ? re(
          () => s(
            e ? n : () => {
              if (!re(r))
                throw ki("Show");
              return t.when;
            }
          )
        ) : s;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
let jt;
function Si(t) {
  let e;
  E.context && E.load && (e = E.load(E.getContextId()));
  const [r, n] = I(e, void 0);
  return jt || (jt = /* @__PURE__ */ new Set()), jt.add(n), it(() => jt.delete(n)), F(
    () => {
      let s;
      if (s = r()) {
        const i = t.fallback;
        return typeof i == "function" && i.length ? re(() => i(s, () => n())) : i;
      }
      return is(() => t.children, n);
    },
    void 0,
    void 0
  );
}
const Ei = /* @__PURE__ */ St();
function Ct(t) {
  let e = 0, r, n, s, i, a;
  const [o, c] = I(!1), l = mi(), u = {
    increment: () => {
      ++e === 1 && c(!0);
    },
    decrement: () => {
      --e === 0 && c(!1);
    },
    inFallback: o,
    effects: [],
    resolved: !1
  }, d = D();
  if (E.context && E.load) {
    const S = E.getContextId();
    let C = E.load(S);
    if (C && (typeof C != "object" || C.status !== "success" ? s = C : E.gather(S)), s && s !== "$$f") {
      const [L, $] = I(void 0, {
        equals: !1
      });
      i = L, s.then(
        () => {
          if (E.done)
            return $();
          E.gather(S), He(n), $(), He();
        },
        (O) => {
          a = O, $();
        }
      );
    }
  }
  const _ = Ke(Ei);
  _ && (r = _.register(u.inFallback));
  let m;
  return it(() => m && m()), g(l.Provider, {
    value: u,
    get children() {
      return F(() => {
        if (a)
          throw a;
        if (n = E.context, i)
          return i(), i = void 0;
        n && s === "$$f" && He();
        const S = F(() => t.children);
        return F((C) => {
          const L = u.inFallback(), { showContent: $ = !0, showFallback: O = !0 } = r ? r() : {};
          if ((!L || s && s !== "$$f") && $)
            return u.resolved = !0, m && m(), m = n = s = void 0, hi(u.effects), S();
          if (!!O)
            return m ? C : nt((U) => (m = U, n && (He({
              id: n.id + "F",
              count: 0
            }), n = void 0), t.fallback), d);
        });
      });
    }
  });
}
const Ci = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected"
], Ai = /* @__PURE__ */ new Set([
  "className",
  "value",
  "readOnly",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  ...Ci
]), Ti = /* @__PURE__ */ new Set([
  "innerHTML",
  "textContent",
  "innerText",
  "children"
]), $i = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Oi = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});
function Ni(t, e) {
  const r = Oi[t];
  return typeof r == "object" ? r[e] ? r.$ : void 0 : r;
}
const ji = /* @__PURE__ */ new Set([
  "beforeinput",
  "click",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
]), Pi = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function Ri(t, e, r) {
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
        let d = o;
        for (; d < i; )
          l.set(r[d], d++);
      }
      const u = l.get(e[a]);
      if (u != null)
        if (o < u && u < i) {
          let d = a, _ = 1, m;
          for (; ++d < s && d < i && !((m = l.get(e[d])) == null || m !== u + _); )
            _++;
          if (_ > u - o) {
            const S = e[a];
            for (; o < u; )
              t.insertBefore(r[o++], S);
          } else
            t.replaceChild(r[o++], e[a++]);
        } else
          a++;
      else
        e[a++].remove();
    }
  }
}
const ln = "_$DX_DELEGATE";
function j(t, e, r) {
  let n;
  const s = () => {
    const a = document.createElement("template");
    return a.innerHTML = t, r ? a.content.firstChild.firstChild : a.content.firstChild;
  }, i = e ? () => re(() => document.importNode(n || (n = s()), !0)) : () => (n || (n = s())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function Ii(t, e = window.document) {
  const r = e[ln] || (e[ln] = /* @__PURE__ */ new Set());
  for (let n = 0, s = t.length; n < s; n++) {
    const i = t[n];
    r.has(i) || (r.add(i), e.addEventListener(i, Gi));
  }
}
function z(t, e, r) {
  At(t) || (r == null ? t.removeAttribute(e) : t.setAttribute(e, r));
}
function Mi(t, e, r, n) {
  At(t) || (n == null ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, n));
}
function Li(t, e) {
  At(t) || (e == null ? t.removeAttribute("class") : t.className = e);
}
function Di(t, e, r, n) {
  if (n)
    Array.isArray(r) ? (t[`$$${e}`] = r[0], t[`$$${e}Data`] = r[1]) : t[`$$${e}`] = r;
  else if (Array.isArray(r)) {
    const s = r[0];
    t.addEventListener(e, r[0] = (i) => s.call(t, r[1], i));
  } else
    t.addEventListener(e, r);
}
function Ui(t, e, r = {}) {
  const n = Object.keys(e || {}), s = Object.keys(r);
  let i, a;
  for (i = 0, a = s.length; i < a; i++) {
    const o = s[i];
    !o || o === "undefined" || e[o] || (un(t, o, !1), delete r[o]);
  }
  for (i = 0, a = n.length; i < a; i++) {
    const o = n[i], c = !!e[o];
    !o || o === "undefined" || r[o] === c || !c || (un(t, o, !0), r[o] = c);
  }
  return r;
}
function Zi(t, e, r) {
  if (!e)
    return r ? z(t, "style") : e;
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
function Wr(t, e = {}, r, n) {
  const s = {};
  return n || H(
    () => s.children = Be(t, e.children, s.children)
  ), H(() => typeof e.ref == "function" && ds(e.ref, t)), H(() => Vi(t, e, r, !0, s, !0)), s;
}
function ds(t, e, r) {
  return re(() => t(e, r));
}
function w(t, e, r, n) {
  if (r !== void 0 && !n && (n = []), typeof e != "function")
    return Be(t, e, n, r);
  H((s) => Be(t, e(), s, r), n);
}
function Vi(t, e, r, n, s = {}, i = !1) {
  e || (e = {});
  for (const a in s)
    if (!(a in e)) {
      if (a === "children")
        continue;
      s[a] = dn(t, a, null, s[a], r, i);
    }
  for (const a in e) {
    if (a === "children") {
      n || Be(t, e.children);
      continue;
    }
    const o = e[a];
    s[a] = dn(t, a, o, s[a], r, i);
  }
}
function At(t) {
  return !!E.context && !E.done && (!t || t.isConnected);
}
function Bi(t) {
  return t.toLowerCase().replace(/-([a-z])/g, (e, r) => r.toUpperCase());
}
function un(t, e, r) {
  const n = e.trim().split(/\s+/);
  for (let s = 0, i = n.length; s < i; s++)
    t.classList.toggle(n[s], r);
}
function dn(t, e, r, n, s, i) {
  let a, o, c, l, u;
  if (e === "style")
    return Zi(t, r, n);
  if (e === "classList")
    return Ui(t, r, n);
  if (r === n)
    return n;
  if (e === "ref")
    i || r(t);
  else if (e.slice(0, 3) === "on:") {
    const d = e.slice(3);
    n && t.removeEventListener(d, n), r && t.addEventListener(d, r);
  } else if (e.slice(0, 10) === "oncapture:") {
    const d = e.slice(10);
    n && t.removeEventListener(d, n, !0), r && t.addEventListener(d, r, !0);
  } else if (e.slice(0, 2) === "on") {
    const d = e.slice(2).toLowerCase(), _ = ji.has(d);
    if (!_ && n) {
      const m = Array.isArray(n) ? n[0] : n;
      t.removeEventListener(d, m);
    }
    (_ || r) && (Di(t, d, r, _), _ && Ii([d]));
  } else if (e.slice(0, 5) === "attr:")
    z(t, e.slice(5), r);
  else if ((u = e.slice(0, 5) === "prop:") || (c = Ti.has(e)) || !s && ((l = Ni(e, t.tagName)) || (o = Ai.has(e))) || (a = t.nodeName.includes("-"))) {
    if (u)
      e = e.slice(5), o = !0;
    else if (At(t))
      return r;
    e === "class" || e === "className" ? Li(t, r) : a && !o && !c ? t[Bi(e)] = r : t[l || e] = r;
  } else {
    const d = s && e.indexOf(":") > -1 && Pi[e.split(":")[0]];
    d ? Mi(t, d, e, r) : z(t, $i[e] || e, r);
  }
  return r;
}
function Gi(t) {
  if (E.registry && E.events && E.events.find(([n, s]) => s === t))
    return;
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
  }), E.registry && !E.done && (E.done = _$HY.done = !0); r; ) {
    const n = r[e];
    if (n && !r.disabled) {
      const s = r[`${e}Data`];
      if (s !== void 0 ? n.call(r, s, t) : n.call(r, t), t.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function Be(t, e, r, n, s) {
  const i = At(t);
  if (i) {
    !r && (r = [...t.childNodes]);
    let c = [];
    for (let l = 0; l < r.length; l++) {
      const u = r[l];
      u.nodeType === 8 && u.data.slice(0, 2) === "!$" ? u.remove() : c.push(u);
    }
    r = c;
  }
  for (; typeof r == "function"; )
    r = r();
  if (e === r)
    return r;
  const a = typeof e, o = n !== void 0;
  if (t = o && r[0] && r[0].parentNode || t, a === "string" || a === "number") {
    if (i || a === "number" && (e = e.toString(), e === r))
      return r;
    if (o) {
      let c = r[0];
      c && c.nodeType === 3 ? c.data !== e && (c.data = e) : c = document.createTextNode(e), r = Pe(t, r, n, c);
    } else
      r !== "" && typeof r == "string" ? r = t.firstChild.data = e : r = t.textContent = e;
  } else if (e == null || a === "boolean") {
    if (i)
      return r;
    r = Pe(t, r, n);
  } else {
    if (a === "function")
      return H(() => {
        let c = e();
        for (; typeof c == "function"; )
          c = c();
        r = Be(t, c, r, n);
      }), () => r;
    if (Array.isArray(e)) {
      const c = [], l = r && Array.isArray(r);
      if (Nr(c, e, r, s))
        return H(() => r = Be(t, c, r, n, !0)), () => r;
      if (i) {
        if (!c.length)
          return r;
        if (n === void 0)
          return r = [...t.childNodes];
        let u = c[0];
        if (u.parentNode !== t)
          return r;
        const d = [u];
        for (; (u = u.nextSibling) !== n; )
          d.push(u);
        return r = d;
      }
      if (c.length === 0) {
        if (r = Pe(t, r, n), o)
          return r;
      } else
        l ? r.length === 0 ? fn(t, c, n) : Ri(t, r, c) : (r && Pe(t), fn(t, c));
      r = c;
    } else if (e.nodeType) {
      if (i && e.parentNode)
        return r = o ? [e] : e;
      if (Array.isArray(r)) {
        if (o)
          return r = Pe(t, r, n, e);
        Pe(t, r, null, e);
      } else
        r == null || r === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      r = e;
    }
  }
  return r;
}
function Nr(t, e, r, n) {
  let s = !1;
  for (let i = 0, a = e.length; i < a; i++) {
    let o = e[i], c = r && r[t.length], l;
    if (!(o == null || o === !0 || o === !1))
      if ((l = typeof o) == "object" && o.nodeType)
        t.push(o);
      else if (Array.isArray(o))
        s = Nr(t, o, c) || s;
      else if (l === "function")
        if (n) {
          for (; typeof o == "function"; )
            o = o();
          s = Nr(
            t,
            Array.isArray(o) ? o : [o],
            Array.isArray(c) ? c : [c]
          ) || s;
        } else
          t.push(o), s = !0;
      else {
        const u = String(o);
        c && c.nodeType === 3 && c.data === u ? t.push(c) : t.push(document.createTextNode(u));
      }
  }
  return s;
}
function fn(t, e, r = null) {
  for (let n = 0, s = e.length; n < s; n++)
    t.insertBefore(e[n], r);
}
function Pe(t, e, r, n) {
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
function zi(t) {
  const e = Object.keys(t), r = {};
  for (let n = 0; n < e.length; n++) {
    const [s, i] = I(t[e[n]]);
    Object.defineProperty(r, e[n], {
      get: s,
      set(a) {
        i(() => a);
      }
    });
  }
  return r;
}
function Fi(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function Wi(t) {
  return (e, r) => {
    const { element: n } = r;
    return nt((s) => {
      const i = zi(e);
      n.addPropertyChangedCallback((o, c) => i[o] = c), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", s();
      });
      const a = t(i, r);
      return w(n.renderRoot, a);
    }, Fi(n));
  };
}
function fs(t, e, r) {
  return arguments.length === 2 && (r = e, e = {}), ci(t, e)(Wi(r));
}
const Ki = `main.app{background-color:var(--bg-color);border-color:var(--border-color);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.top-bar h1{text-align:center}.top-bar menu{display:flex;justify-content:space-around;column-gap:10px}.loading{text-align:center}sl-icon.rotate{animation:turn 1s infinite linear}@keyframes turn{0%{transform:rotate(0)}to{transform:rotate(180deg)}}sl-button{margin-right:1rem}sl-tab>sl-icon{margin-right:.5rem}form [data-invalid]::part(base){border-color:var(--sl-color-danger-600)}form .field,form sl-alert{margin:0rem .2rem 1rem}form .field>.error{display:flex;column-gap:.2rem;padding:.5rem 0;color:var(--sl-color-danger-600)}
`;
var Ji = (t) => t;
function Yi(t, e = Ji) {
  return (r, ...n) => {
    r[0] === "." && (r = r.slice(1));
    const s = t()?.[r];
    switch (typeof s) {
      case "function":
        return s(...n);
      case "string":
        return e(s, n[0]);
      default:
        return s;
    }
  };
}
const qi = "E-post adresse", Hi = "Passord", Xi = "Profil", Qi = "Konto", ea = "Kontakt", ta = "Lagre", ra = "Adresse", na = "Telefonnummer", sa = "Avtale", hn = {
  "Member Portal": "Medlemsportal",
  "Sign up": "Opprett konto",
  "Sign in": "Logg inn",
  "Sign out": "Logg ut",
  Email: qi,
  Password: Hi,
  Profile: Xi,
  Account: Qi,
  Contact: ea,
  Save: ta,
  "First name": "Fornavn",
  "Last name": "Etternavn",
  Address: ra,
  Phone: na,
  "My membership": "Mitt medlemskap",
  Subscription: sa,
  "Failed signing up": "Kunne ikke opprette konto",
  "Failed signing in": "Kunne ikke logge inn",
  "Did you type your password and email correct?": "Har du skrevet riktig passord og e-post-adresse?",
  "Did you already sign up?": "Har du allerede registrert deg?",
  "Error saving": "Kunne ikke lagre",
  "Must be a valid email address": "Ugyldig adresse",
  "Must be a valid name": "Ugyldig navn",
  "Must be a valid street address": "Ugyldig adresse",
  "Must be 3-16 charcters and contain one digit and a special char": "M\xE5 v\xE6re 3-16 tegn langt og inneha ett tall og et tegn"
}, hs = [{
  code: "no",
  name: "norsk",
  dict: hn
}, {
  code: "en",
  name: "english",
  dict: Object.keys(hn).reduce((t, e) => ({
    ...t,
    [e]: e
  }), [])
}], ia = hs.reduce((t, {
  code: e,
  dict: r
}) => ({
  ...t,
  [e]: r
}), {}), ps = St(), pn = hs.map(({
  code: t,
  name: e
}) => ({
  code: t,
  name: e
})), aa = (t) => {
  const [e, r] = I("en"), [n] = te(e, (a) => (console.log({
    langCode: a
  }), ia[a])), i = {
    t: (a) => {
      const c = Yi(n)(a);
      return c || console.info(`i18nProvider: Missing text for '${a}'(${e()})`), c;
    },
    setLocale: r,
    locale: e
  };
  return g(ps.Provider, {
    value: i,
    get children() {
      return t.children;
    }
  });
}, ge = () => Ke(ps);
var oa = Object.defineProperty, ca = (t, e) => {
  for (var r in e)
    oa(t, r, { get: e[r], enumerable: !0 });
}, la = class {
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
}, ua = {};
ca(ua, { CborBreak: () => Rt, CborError: () => Oe, CborFillMissing: () => bs, CborInvalidMajorError: () => hr, CborNumberError: () => Pr, CborPartialDisabled: () => ys, CborRangeError: () => oe, Encoded: () => Kr, Gap: () => vs, POW_2_53: () => da, POW_2_64: () => jr, PartiallyEncoded: () => Jr, Reader: () => Rr, Tagged: () => G, Writer: () => pr, decode: () => ws, encode: () => Ge, infiniteBytes: () => Ir, partiallyEncodeObject: () => Yr });
var da = 9007199254740992, jr = BigInt(18446744073709552e3), Kr = class {
  constructor(t) {
    this.encoded = t;
  }
}, M = class extends Error {
}, Ce = class extends M {
  name = "NoActiveSocket";
  message = "No socket is currently connected to a SurrealDB instance. Please call the .connect() method first!";
}, ms = class extends M {
  name = "EngineDisconnected";
  message = "The engine reported the connection to SurrealDB has dropped";
}, mn = class extends M {
  constructor(t) {
    super(), this.response = t, this.message = `${t}`;
  }
  name = "UnexpectedServerResponse";
}, fa = class extends M {
  constructor(t) {
    super(), this.error = t, this.message = `${t}`;
  }
  name = "UnexpectedConnectionError";
}, ha = class extends M {
  constructor(t) {
    super(), this.engine = t;
  }
  name = "UnsupportedEngine";
  message = "The engine you are trying to connect to is not supported or configured.";
}, gs = class extends M {
  name = "ConnectionUnavailable";
  message = "There is no connection available at this moment.";
}, pa = class extends M {
  name = "MissingNamespaceDatabase";
  message = "There are no namespace and/or database configured.";
}, ma = class extends M {
  constructor(t, e, r, n) {
    super(), this.message = t, this.status = e, this.statusText = r, this.buffer = n;
  }
  name = "HttpConnectionError";
}, N = class extends M {
  constructor(t) {
    super(), this.message = t;
  }
  name = "ResponseError";
}, ga = class extends M {
  name = "NoNamespaceSpecified";
  message = "Please specify a namespace to use.";
}, ya = class extends M {
  name = "NoDatabaseSpecified";
  message = "Please specify a database to use.";
}, gn = class extends M {
  name = "NoTokenReturned";
  message = "Did not receive an authentication token.";
}, ba = class extends M {
  name = "UnsupportedVersion";
  version;
  supportedRange;
  constructor(t, e) {
    super(), this.version = t, this.supportedRange = e, this.message = `The version "${t}" reported by the engine is not supported by this library, expected a version that satisfies "${e}".`;
  }
}, yn = class extends M {
  constructor(t) {
    super(), this.error = t;
  }
  name = "VersionRetrievalFailure";
  message = "Failed to retrieve remote version. If the server is behind a proxy, make sure it's configured correctly.";
}, Oe = class extends M {
  message;
  constructor(t) {
    super(), this.message = t;
  }
}, Pr = class extends Oe {
  name = "CborNumberError";
}, oe = class extends Oe {
  name = "CborRangeError";
}, hr = class extends Oe {
  name = "CborInvalidMajorError";
}, Rt = class extends Oe {
  name = "CborBreak";
  constructor() {
    super("Came across a break which was not intercepted by the decoder");
  }
}, ys = class extends Oe {
  name = "CborPartialDisabled";
  constructor() {
    super("Tried to insert a Gap into a CBOR value, while partial mode is not enabled");
  }
}, bs = class extends Oe {
  name = "CborFillMissing";
  constructor() {
    super("Fill for a gap is missing, and gap has no default");
  }
}, vs = class {
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
}, pr = class {
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
    return t ? new Jr(this._chunks, this.buffer, e) : this.buffer;
  }
}, Jr = class {
  constructor(t, e, r) {
    this.chunks = t, this.end = e, this.replacer = r;
  }
  build(t, e) {
    let r = new pr(), n = new Map(t);
    for (let [s, i] of this.chunks) {
      let a = n.has(i) || i.hasDefault();
      if (!e && !a)
        throw new bs();
      if (r.writeArrayBuffer(s), a) {
        let o = n.get(i) ?? i.default;
        Ge(o, { writer: r, replacer: this.replacer });
      } else
        r.chunk(i);
    }
    return r.writeArrayBuffer(this.end), r.output(!!e, this.replacer);
  }
};
function Yr(t, e) {
  return Object.fromEntries(Object.entries(t).map(([r, n]) => [r, Ge(n, { ...e, partial: !0 })]));
}
var G = class {
  constructor(t, e) {
    this.tag = t, this.value = e;
  }
}, bn;
function Ge(t, e = {}) {
  let r = e.writer ?? new pr(), n = new Map(e.fills ?? []);
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
            throw new Pr("Number too big to be encoded");
        else
          r.writeUint8(251), r.writeFloat64(a);
        return;
      }
      case "bigint": {
        if (a >= 0 && a < jr)
          r.writeMajor(0, a);
        else if (a <= 0 && a >= -jr)
          r.writeMajor(1, -(a + 1n));
        else
          throw new Pr("BigInt too big to be encoded");
        return;
      }
      case "string": {
        bn ??= new TextEncoder();
        let o = bn.encode(a);
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
        if (a instanceof G) {
          r.writeMajor(6, a.tag), s(a.value);
          return;
        }
        if (a instanceof Kr) {
          r.writeArrayBuffer(a.encoded);
          return;
        }
        if (a instanceof vs) {
          if (n.has(a))
            s(n.get(a));
          else {
            if (!e.partial)
              throw new ys();
            r.chunk(a);
          }
          return;
        }
        if (a instanceof Jr) {
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
var Rr = class {
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
      throw t instanceof RangeError ? new oe(t.message) : t;
    }
  }
  readUint16() {
    try {
      return this.read(2, this._view.getUint16(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new oe(t.message) : t;
    }
  }
  readUint32() {
    try {
      return this.read(4, this._view.getUint32(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new oe(t.message) : t;
    }
  }
  readUint64() {
    try {
      return this.read(8, this._view.getBigUint64(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new oe(t.message) : t;
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
      throw t instanceof RangeError ? new oe(t.message) : t;
    }
  }
  readFloat64() {
    try {
      return this.read(8, this._view.getFloat64(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new oe(t.message) : t;
    }
  }
  readBytes(t) {
    let e = this._byte.length - this._pos;
    if (e < t)
      throw new oe(`The argument must be between 0 and ${e}`);
    return this.read(t, this._byte.slice(this._pos, this._pos + t));
  }
  readMajor() {
    let t = this.readUint8(), e = t >> 5;
    if (e < 0 || e > 7)
      throw new hr("Received invalid major type");
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
    throw new oe("Expected a final length");
  }
};
function Ir(t, e) {
  let r = new pr();
  for (; ; ) {
    let [n, s] = t.readMajor();
    if (n === 7 && s === 31)
      break;
    if (n !== e)
      throw new hr(`Expected a resource of the same major (${e}) while processing an infinite resource`);
    if (s === 31)
      throw new oe("Expected a finite resource while processing an infinite resource");
    r.writeUint8Array(t.readBytes(Number(t.readMajorLength(s))));
  }
  return r.buffer;
}
var vn;
function ws(t, e = {}) {
  let r = t instanceof Rr ? t : new Rr(t);
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
        return a === 31 ? Ir(r, 2) : r.readBytes(Number(r.readMajorLength(a))).buffer;
      case 3: {
        let o = a === 31 ? Ir(r, 3) : r.readBytes(Number(r.readMajorLength(a)));
        return vn ??= new TextDecoder(), vn.decode(o);
      }
      case 4: {
        if (a === 31) {
          let l = [];
          for (; ; )
            try {
              l.push(s());
            } catch (u) {
              if (u instanceof Rt)
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
              if (u instanceof Rt)
                break;
              throw u;
            }
            let l = s();
            o.push([c, l]);
          }
        else {
          let c = r.readMajorLength(a);
          for (let l = 0; l < c; l++) {
            let u = s(), d = s();
            o[l] = [u, d];
          }
        }
        return e.map === "map" ? new Map(o) : Object.fromEntries(o);
      }
      case 6: {
        let o = r.readMajorLength(a), c = s();
        return new G(o, c);
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
            throw new Rt();
        }
    }
    throw new hr(`Unable to decode value with major tag ${i}`);
  }
  function s() {
    return e.replacer ? e.replacer(n()) : n();
  }
  return s();
}
function va(t) {
  let e = Math.floor(t.getTime() / 1e3), r = t.getTime() - e * 1e3;
  return [e, r * 1e6];
}
function wa([t, e]) {
  let r = new Date(0);
  return r.setUTCSeconds(Number(t)), r.setMilliseconds(Math.floor(Number(e) / 1e6)), r;
}
var Mr = class {
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
}, qr = 1, De = qr / 1e3, Lr = De / 1e3, Kt = 1e3 * qr, Jt = 60 * Kt, Yt = 60 * Jt, qt = 24 * Yt, Dr = 7 * qt, Hr = /* @__PURE__ */ new Map([["ns", Lr], ["\xB5s", De], ["\u03BCs", De], ["us", De], ["ms", qr], ["s", Kt], ["m", Jt], ["h", Yt], ["d", qt], ["w", Dr]]), _a = Array.from(Hr).reduce((t, [e, r]) => (t.set(r, e), t), /* @__PURE__ */ new Map()), xa = new RegExp(`^(\\d+)(${Array.from(Hr.keys()).join("|")})`), xr = class ee {
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
    for (let [s, i] of Array.from(_a).reverse()) {
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
      let s = n.match(xa);
      if (s) {
        let i = Number.parseInt(s[1]), a = Hr.get(s[2]);
        if (a === void 0)
          throw new M(`Invalid duration unit: ${s[2]}`);
        r += i * a, n = n.slice(s[0].length);
        continue;
      }
      throw new M("Could not match a next duration part");
    }
    return r;
  }
  static nanoseconds(e) {
    return new ee(Math.floor(e * Lr));
  }
  static microseconds(e) {
    return new ee(Math.floor(e * De));
  }
  static milliseconds(e) {
    return new ee(e);
  }
  static seconds(e) {
    return new ee(e * Kt);
  }
  static minutes(e) {
    return new ee(e * Jt);
  }
  static hours(e) {
    return new ee(e * Yt);
  }
  static days(e) {
    return new ee(e * qt);
  }
  static weeks(e) {
    return new ee(e * Dr);
  }
  get microseconds() {
    return Math.floor(this._milliseconds / De);
  }
  get nanoseconds() {
    return Math.floor(this._milliseconds / Lr);
  }
  get milliseconds() {
    return Math.floor(this._milliseconds);
  }
  get seconds() {
    return Math.floor(this._milliseconds / Kt);
  }
  get minutes() {
    return Math.floor(this._milliseconds / Jt);
  }
  get hours() {
    return Math.floor(this._milliseconds / Yt);
  }
  get days() {
    return Math.floor(this._milliseconds / qt);
  }
  get weeks() {
    return Math.floor(this._milliseconds / Dr);
  }
}, Ne = class {
};
function wn(t) {
  return t instanceof Mr ? Number.parseFloat(t.decimal) : t;
}
var _n = class It extends Ne {
  point;
  constructor(e) {
    super(), e instanceof It ? this.point = e.clone().point : this.point = [wn(e[0]), wn(e[1])];
  }
  toJSON() {
    return { type: "Point", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.point;
  }
  is(e) {
    return e instanceof It ? this.point[0] === e.point[0] && this.point[1] === e.point[1] : !1;
  }
  clone() {
    return new It([...this.point]);
  }
}, xn = class Mt extends Ne {
  line;
  constructor(e) {
    super(), this.line = e instanceof Mt ? e.clone().line : e;
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
    if (!(e instanceof Mt) || this.line.length !== e.line.length)
      return !1;
    for (let r = 0; r < this.line.length; r++)
      if (!this.line[r].is(e.line[r]))
        return !1;
    return !0;
  }
  clone() {
    return new Mt(this.line.map((e) => e.clone()));
  }
}, kn = class Lt extends Ne {
  polygon;
  constructor(e) {
    super(), this.polygon = e instanceof Lt ? e.clone().polygon : e.map((r) => {
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
    if (!(e instanceof Lt) || this.polygon.length !== e.polygon.length)
      return !1;
    for (let r = 0; r < this.polygon.length; r++)
      if (!this.polygon[r].is(e.polygon[r]))
        return !1;
    return !0;
  }
  clone() {
    return new Lt(this.polygon.map((e) => e.clone()));
  }
}, Sn = class Dt extends Ne {
  points;
  constructor(e) {
    super(), this.points = e instanceof Dt ? e.points : e;
  }
  toJSON() {
    return { type: "MultiPoint", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.points.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof Dt) || this.points.length !== e.points.length)
      return !1;
    for (let r = 0; r < this.points.length; r++)
      if (!this.points[r].is(e.points[r]))
        return !1;
    return !0;
  }
  clone() {
    return new Dt(this.points.map((e) => e.clone()));
  }
}, En = class Ut extends Ne {
  lines;
  constructor(e) {
    super(), this.lines = e instanceof Ut ? e.lines : e;
  }
  toJSON() {
    return { type: "MultiLineString", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.lines.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof Ut) || this.lines.length !== e.lines.length)
      return !1;
    for (let r = 0; r < this.lines.length; r++)
      if (!this.lines[r].is(e.lines[r]))
        return !1;
    return !0;
  }
  clone() {
    return new Ut(this.lines.map((e) => e.clone()));
  }
}, Cn = class Zt extends Ne {
  polygons;
  constructor(e) {
    super(), this.polygons = e instanceof Zt ? e.polygons : e;
  }
  toJSON() {
    return { type: "MultiPolygon", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.polygons.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof Zt) || this.polygons.length !== e.polygons.length)
      return !1;
    for (let r = 0; r < this.polygons.length; r++)
      if (!this.polygons[r].is(e.polygons[r]))
        return !1;
    return !0;
  }
  clone() {
    return new Zt(this.polygons.map((e) => e.clone()));
  }
}, An = class Vt extends Ne {
  collection;
  constructor(e) {
    super(), this.collection = e instanceof Vt ? e.collection : e;
  }
  toJSON() {
    return { type: "GeometryCollection", geometries: this.geometries };
  }
  get geometries() {
    return this.collection.map((e) => e.toJSON());
  }
  is(e) {
    if (!(e instanceof Vt) || this.collection.length !== e.collection.length)
      return !1;
    for (let r = 0; r < this.collection.length; r++)
      if (!this.collection[r].is(e.collection[r]))
        return !1;
    return !0;
  }
  clone() {
    return new Vt(this.collection.map((e) => e.clone()));
  }
}, ka = 9223372036854775807n, Tn = class {
  tb;
  id;
  constructor(t, e) {
    if (typeof t != "string")
      throw new M("TB part is not valid");
    if (!Aa(e))
      throw new M("ID part is not valid");
    this.tb = t, this.id = e;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    let t = $n(this.tb), e = typeof this.id == "string" ? $n(this.id) : typeof this.id == "bigint" || typeof this.id == "number" ? Ea(this.id) : JSON.stringify(this.id);
    return `${t}:${e}`;
  }
}, Sa = class {
  rid;
  constructor(t) {
    if (typeof t != "string")
      throw new M("String Record ID must be a string");
    this.rid = t;
  }
  toJSON() {
    return this.rid;
  }
  toString() {
    return this.rid;
  }
};
function Ea(t) {
  return t <= ka ? t.toString() : `\u27E8${t}\u27E9`;
}
function $n(t) {
  if (Ca(t))
    return `\u27E8${t}\u27E9`;
  let e, r, n;
  for (r = 0, n = t.length; r < n; r++)
    if (e = t.charCodeAt(r), !(e > 47 && e < 58) && !(e > 64 && e < 91) && !(e > 96 && e < 123) && e !== 95)
      return `\u27E8${t.replaceAll("\u27E9", "\u27E9")}\u27E9`;
  return t;
}
function Ca(t) {
  let e = Number.parseInt(t);
  return !Number.isNaN(e) && e.toString() === t;
}
function Aa(t) {
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
var On = class {
  tb;
  constructor(t) {
    if (typeof t != "string")
      throw new M("Table must be a string");
    this.tb = t;
  }
  toJSON() {
    return this.tb;
  }
  toString() {
    return this.tb;
  }
}, Pt = "0123456789abcdef", Ie = class Xe {
  constructor(e) {
    this.bytes = e;
  }
  static ofInner(e) {
    if (e.length !== 16)
      throw new TypeError("not 128-bit length");
    return new Xe(e);
  }
  static fromFieldsV7(e, r, n, s) {
    if (!Number.isInteger(e) || !Number.isInteger(r) || !Number.isInteger(n) || !Number.isInteger(s) || e < 0 || r < 0 || n < 0 || s < 0 || e > 281474976710655 || r > 4095 || n > 1073741823 || s > 4294967295)
      throw new RangeError("invalid field value");
    let i = new Uint8Array(16);
    return i[0] = e / 2 ** 40, i[1] = e / 2 ** 32, i[2] = e / 2 ** 24, i[3] = e / 2 ** 16, i[4] = e / 2 ** 8, i[5] = e, i[6] = 112 | r >>> 8, i[7] = r, i[8] = 128 | n >>> 24, i[9] = n >>> 16, i[10] = n >>> 8, i[11] = n, i[12] = s >>> 24, i[13] = s >>> 16, i[14] = s >>> 8, i[15] = s, new Xe(i);
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
      return new Xe(o);
    } else
      throw new SyntaxError("could not parse UUID string");
  }
  toString() {
    let e = "";
    for (let r = 0; r < this.bytes.length; r++)
      e += Pt.charAt(this.bytes[r] >>> 4), e += Pt.charAt(this.bytes[r] & 15), (r === 3 || r === 5 || r === 7 || r === 9) && (e += "-");
    return e;
  }
  toHex() {
    let e = "";
    for (let r = 0; r < this.bytes.length; r++)
      e += Pt.charAt(this.bytes[r] >>> 4), e += Pt.charAt(this.bytes[r] & 15);
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
    return new Xe(this.bytes.slice(0));
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
}, _s = class {
  constructor(t) {
    this.timestamp = 0, this.counter = 0, this.random = t ?? Ta();
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
    return Ie.fromFieldsV7(this.timestamp, Math.trunc(this.counter / 2 ** 30), this.counter & 2 ** 30 - 1, this.random.nextUint32());
  }
  resetCounter() {
    this.counter = this.random.nextUint32() * 1024 + (this.random.nextUint32() & 1023);
  }
  generateV4() {
    let t = new Uint8Array(Uint32Array.of(this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32()).buffer);
    return t[6] = 64 | t[6] >>> 4, t[8] = 128 | t[8] >>> 2, Ie.ofInner(t);
  }
}, Ta = () => {
  if (typeof crypto < "u" && typeof crypto.getRandomValues < "u")
    return new $a();
  if (typeof UUIDV7_DENY_WEAK_RNG < "u" && UUIDV7_DENY_WEAK_RNG)
    throw new Error("no cryptographically strong RNG available");
  return { nextUint32: () => Math.trunc(Math.random() * 65536) * 65536 + Math.trunc(Math.random() * 65536) };
}, $a = class {
  constructor() {
    this.buffer = new Uint32Array(8), this.cursor = 65535;
  }
  nextUint32() {
    return this.cursor >= this.buffer.length && (crypto.getRandomValues(this.buffer), this.cursor = 0), this.buffer[this.cursor++];
  }
}, Ht, Oa = () => (Ht || (Ht = new _s())).generate(), Na = () => (Ht || (Ht = new _s())).generateV4(), Ur = class Bt {
  inner;
  constructor(e) {
    e instanceof ArrayBuffer ? this.inner = Ie.ofInner(new Uint8Array(e)) : e instanceof Uint8Array ? this.inner = Ie.ofInner(e) : e instanceof Bt ? this.inner = e.inner : e instanceof Ie ? this.inner = e : this.inner = Ie.parse(e);
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
    return new Bt(Na());
  }
  static v7() {
    return new Bt(Oa());
  }
}, ja = 0, Nn = 37, jn = 6, Pn = 7, kr = 8, Pa = 9, Rn = 10, In = 12, Ra = 13, Mn = 14, Ln = 88, Dn = 89, Un = 90, Zn = 91, Vn = 92, Bn = 93, Gn = 94, Tt = { encode(t) {
  return t instanceof Date ? new G(In, va(t)) : t === void 0 ? new G(jn, null) : t instanceof Ur ? new G(Nn, t.toBuffer()) : t instanceof Mr ? new G(Rn, t.toString()) : t instanceof xr ? new G(Mn, t.toCompact()) : t instanceof Tn ? new G(kr, [t.tb, t.id]) : t instanceof Sa ? new G(kr, t.rid) : t instanceof On ? new G(Pn, t.tb) : t instanceof _n ? new G(Ln, t.point) : t instanceof xn ? new G(Dn, t.line) : t instanceof kn ? new G(Un, t.polygon) : t instanceof Sn ? new G(Zn, t.points) : t instanceof En ? new G(Vn, t.lines) : t instanceof Cn ? new G(Bn, t.polygons) : t instanceof An ? new G(Gn, t.collection) : t;
}, decode(t) {
  if (!(t instanceof G))
    return t;
  switch (t.tag) {
    case ja:
      return new Date(t.value);
    case Nn:
    case Pa:
      return new Ur(t.value);
    case In:
      return wa(t.value);
    case jn:
      return;
    case Rn:
      return new Mr(t.value);
    case Ra:
      return new xr(t.value);
    case Mn:
      return xr.fromCompact(t.value);
    case Pn:
      return new On(t.value);
    case kr:
      return new Tn(t.value[0], t.value[1]);
    case Ln:
      return new _n(t.value);
    case Dn:
      return new xn(t.value);
    case Un:
      return new kn(t.value);
    case Zn:
      return new Sn(t.value);
    case Vn:
      return new En(t.value);
    case Bn:
      return new Cn(t.value);
    case Gn:
      return new An(t.value);
  }
} };
Object.freeze(Tt);
function Ia(t) {
  return Ge(t, { replacer: Tt.encode });
}
function Ma(t) {
  return ws(t, { replacer: Tt.decode });
}
var La = class {
  query;
  bindings;
  constructor(t, e, r) {
    this.query = new Kr(Ge(t)), this.bindings = Yr(e ?? {}, { replacer: Tt.encode });
  }
  build(t) {
    return Ge([this.query, this.bindings]);
  }
};
function zn(t) {
  let e = {}, r = (n, s, i) => {
    if (n in t)
      e[s] = `${t[n]}`, delete e[n];
    else if (i !== !0)
      throw new M(`Key ${n} is missing from the authentication parameters`);
  };
  return "scope" in t ? (e = { ...t }, r("scope", "sc"), r("namespace", "ns"), r("database", "db")) : "variables" in t ? (e = { ...t.variables }, r("access", "ac"), r("namespace", "ns"), r("database", "db")) : (r("access", "ac", !0), r("database", "db", !0), r("namespace", "ns", !("database" in t)), r("username", "user"), r("password", "pass")), e;
}
var Da = ["CREATE", "UPDATE", "DELETE"];
function Ua(t) {
  return !(typeof t != "object" || t === null || !("id" in t && "action" in t && "result" in t) || !(t.id instanceof Ur) || !Da.includes(t.action) || typeof t.result != "object" || t.result === null);
}
var Za = 5e3, xs = "1.4.2", ks = "3.0.0";
function Va(t, e = xs, r = ks) {
  if (!Ba(t, e, r))
    throw new ba(t, `>= ${e} < ${r}`);
  return !0;
}
function Ba(t, e = xs, r = ks) {
  return e.localeCompare(t, void 0, { numeric: !0 }) <= 0 && r.localeCompare(t, void 0, { numeric: !0 }) === 1;
}
async function Ss(t, e) {
  let r = { "ws:": "http:", "wss:": "https:", "http:": "http:", "https:": "https:" }[t.protocol];
  if (r) {
    let n = t.pathname.slice(0, -4);
    t = new URL(t), t.pathname = `${n}/version`, t.protocol = r;
    let s = new AbortController(), i = setTimeout(() => s.abort(), e ?? Za), a = "surrealdb-";
    return await fetch(t, { signal: s.signal }).then((o) => o.text()).then((o) => o.slice(a.length)).catch((o) => {
      throw new yn(o);
    }).finally(() => {
      clearTimeout(i);
    });
  }
  throw new yn();
}
var Sr = 0;
function Es() {
  return Sr = (Sr + 1) % Number.MAX_SAFE_INTEGER, Sr.toString();
}
var Ga = ((t) => (t.Disconnected = "disconnected", t.Connecting = "connecting", t.Connected = "connected", t.Error = "error", t))(Ga || {}), za = class {
  emitter;
  encodeCbor;
  decodeCbor;
  constructor({ emitter: t, encodeCbor: e, decodeCbor: r }) {
    this.emitter = t, this.encodeCbor = e, this.decodeCbor = r;
  }
}, Cs = class {
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
function Fn(t, e) {
  if ("scope" in t || "access" in t && "variables" in t && t.variables) {
    if (!t.namespace) {
      if (!e?.namespace)
        throw new ga();
      t.namespace = e.namespace;
    }
    if (!t.database) {
      if (!e?.database)
        throw new ya();
      t.database = e.database;
    }
  }
  return t;
}
var Wn = class extends Cs {
  connection = { url: void 0, namespace: void 0, database: void 0, token: void 0, variables: {} };
  setStatus(t, ...e) {
    this.status = t, this.emitter.emit(t, e);
  }
  version(t, e) {
    return Ss(t, e);
  }
  connect(t) {
    return this.setStatus("connecting"), this.connection.url = t, this.setStatus("connected"), this.ready = new Promise((e) => e()), this.ready;
  }
  disconnect() {
    return this.connection = { url: void 0, namespace: void 0, database: void 0, token: void 0, variables: {} }, this.ready = void 0, this.setStatus("disconnected"), new Promise((t) => t());
  }
  async rpc(t) {
    if (await this.ready, !this.connection.url)
      throw new gs();
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
      throw new pa();
    let e = Es(), r = await fetch(`${this.connection.url}`, { method: "POST", headers: { "Content-Type": "application/cbor", Accept: "application/cbor", "Surreal-NS": this.connection.namespace, "Surreal-DB": this.connection.database, ...this.connection.token ? { Authorization: `Bearer ${this.connection.token}` } : {} }, body: this.encodeCbor({ id: e, ...t }) }), n = await r.arrayBuffer();
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
    throw new ma(s.decode(n), r.status, r.statusText, n);
  }
  get connected() {
    return !!this.connection.url;
  }
};
function Fa() {
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
var Wa = Fa(), Kn = class extends Cs {
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
    return Ss(t, e);
  }
  async connect(t) {
    this.connection.url = t, this.setStatus("connecting");
    let e = new Wa(t.toString(), "cbor"), r = new Promise((n, s) => {
      e.addEventListener("open", () => {
        this.setStatus("connected"), n();
      }), e.addEventListener("error", (i) => {
        let a = new fa("error" in i ? i.error : "An unexpected error occurred");
        this.setStatus("error", a), s(a);
      }), e.addEventListener("close", () => {
        this.setStatus("disconnected");
      }), e.addEventListener("message", async ({ data: i }) => {
        try {
          let a = this.decodeCbor(i instanceof Blob ? await i.arrayBuffer() : i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength));
          if (typeof a == "object" && a != null && Object.getPrototypeOf(a) === Object.prototype)
            this.handleRpcResponse(a);
          else
            throw new mn(a);
        } catch (a) {
          e.dispatchEvent(new CustomEvent("error", { detail: a }));
        }
      });
    });
    return this.ready = r, await r.then(() => {
      this.socket = e, this.pinger?.stop(), this.pinger = new Ka(3e4), this.pinger.start(() => this.rpc({ method: "ping" }));
    });
  }
  async disconnect() {
    this.connection = { url: void 0, namespace: void 0, database: void 0, token: void 0 }, await this.ready?.catch(() => {
    }), this.socket?.close(), this.ready = void 0, this.socket = void 0, await Promise.any([this.requireStatus("disconnected"), this.requireStatus("error")]);
  }
  async rpc(t) {
    if (await this.ready, !this.socket)
      throw new gs();
    let e = Es(), r = this.emitter.subscribeOnce(`rpc-${e}`);
    this.socket.send(this.encodeCbor({ id: e, ...t }));
    let [n] = await r;
    if (n instanceof ms)
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
    else if (Ua(e.result)) {
      let { id: r, action: n, result: s } = e.result;
      this.emitter.emit(`live-${r}`, [n, s], !0);
    } else
      this.setStatus("error", new mn({ id: t, ...e }));
  }
  get connected() {
    return !!this.socket;
  }
}, Ka = class {
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
}, Ja = class {
  connection;
  ready;
  emitter;
  engines = { ws: Kn, wss: Kn, http: Wn, https: Wn };
  constructor({ engines: t } = {}) {
    this.emitter = new la(), this.emitter.subscribe("disconnected", () => this.clean()), this.emitter.subscribe("error", () => this.close()), t && (this.engines = { ...this.engines, ...t });
  }
  async connect(t, e = {}) {
    t = new URL(t), t.pathname.endsWith("/rpc") || (t.pathname.endsWith("/") || (t.pathname += "/"), t.pathname += "rpc");
    let r = t.protocol.slice(0, -1), n = this.engines[r];
    if (!n)
      throw new ha(r);
    let { prepare: s, auth: i, namespace: a, database: o } = e;
    await this.close();
    let c = new za({ emitter: this.emitter, encodeCbor: Ia, decodeCbor: Ma }), l = new n(c);
    if (e.versionCheck !== !1) {
      let u = await l.version(t, e.versionCheckTimeout);
      Va(u);
    }
    return this.connection = l, this.ready = new Promise((u, d) => l.connect(t).then(async () => {
      (a || o) && await this.use({ namespace: a, database: o }), typeof i == "string" ? await this.authenticate(i) : i && await this.signin(i), await s?.(this), u();
    }).catch(d)), await this.ready, !0;
  }
  async close() {
    return this.clean(), await this.connection?.disconnect(), !0;
  }
  clean() {
    let t = this.emitter.scanListeners((r) => r.startsWith("rpc-"));
    t.map((r) => this.emitter.emit(r, [new ms()]));
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
      throw new Ce();
    if (t === null && e !== null)
      throw new M("Cannot unset namespace without unsetting database");
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
      throw new Ce();
    let e = Fn(t, this.connection.connection), r = zn(e), n = await this.rpc("signup", [r]);
    if (n.error)
      throw new N(n.error.message);
    if (!n.result)
      throw new gn();
    return n.result;
  }
  async signin(t) {
    if (!this.connection)
      throw new Ce();
    let e = Fn(t, this.connection.connection), r = zn(e), n = await this.rpc("signin", [r]);
    if (n.error)
      throw new N(n.error.message);
    if (!n.result)
      throw new gn();
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
      throw new Ce();
    this.connection.emitter.subscribe(`live-${t}`, e, !0);
  }
  async unSubscribeLive(t, e) {
    if (await this.ready, !this.connection)
      throw new Ce();
    this.connection.emitter.unSubscribe(`live-${t}`, e);
  }
  async kill(t) {
    if (await this.ready, !this.connection)
      throw new Ce();
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
    let r = t instanceof La ? [t.query, Yr(t.bindings, { fills: e, replacer: Tt.encode })] : [t, e];
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
      throw new Ce();
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
const Ye = (t) => {
};
I(void 0, {
  equals: !1
});
const Jn = (t) => t.pop().pop(), Xr = (t) => {
  const e = [t.name, t.message].filter((r) => r).join("::");
  console.warn(e, t);
}, Ya = async (t, e = 10) => {
  for (; !t(); )
    await new Promise((r) => setTimeout(r, e));
};
class As {
  #e;
  #t;
  #r;
  #n;
  #s;
  constructor(e, r, n) {
    this.#e = new Ja(), this.#t = new URL(`${e}/rpc`).toString(), this.#r = r, this.#n = n, this.#s = !1;
  }
  async connect() {
    try {
      console.info("Connecting Surrealdb..."), await this.#e.connect(this.#t, {
        namespace: this.#r,
        database: this.#n
      });
    } catch (e) {
      throw Xr(e), e;
    }
    return this.#s = !0, console.info(`DbService connected: ${this.#n}@${this.#r}:${this.#t}`), console.log(this.#e), this;
  }
  async disconnect() {
    this.#e.status === "connected" && await this.#e.close(), this.#s = !1;
  }
  async getDb() {
    return await Ya(() => this.#s && this.#e.status === "connected"), this.#e;
  }
  get isConnected() {
    return this.#s;
  }
  async getAccountDetails() {
    try {
      const e = await this.#e.query("SELECT email FROM account;");
      return Jn(e);
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
      return Jn(e);
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
var Zr;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
  });
})(Zr || (Zr = {}));
const p = A.arrayToEnum([
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
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return isNaN(t) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(t) ? p.array : t === null ? p.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? p.promise : typeof Map < "u" && t instanceof Map ? p.map : typeof Set < "u" && t instanceof Set ? p.set : typeof Date < "u" && t instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, f = A.arrayToEnum([
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
]), qa = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class X extends Error {
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
  static assert(e) {
    if (!(e instanceof X))
      throw new Error(`Not a ZodError: ${e}`);
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
X.create = (t) => new X(t);
const ze = (t, e) => {
  let r;
  switch (t.code) {
    case f.invalid_type:
      t.received === p.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case f.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, A.jsonStringifyReplacer)}`;
      break;
    case f.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${A.joinValues(t.keys, ", ")}`;
      break;
    case f.invalid_union:
      r = "Invalid input";
      break;
    case f.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${A.joinValues(t.options)}`;
      break;
    case f.invalid_enum_value:
      r = `Invalid enum value. Expected ${A.joinValues(t.options)}, received '${t.received}'`;
      break;
    case f.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case f.invalid_return_type:
      r = "Invalid function return type";
      break;
    case f.invalid_date:
      r = "Invalid date";
      break;
    case f.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : A.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case f.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case f.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case f.custom:
      r = "Invalid input";
      break;
    case f.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case f.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case f.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, A.assertNever(t);
  }
  return { message: r };
};
let Ts = ze;
function Ha(t) {
  Ts = t;
}
function Xt() {
  return Ts;
}
const Qt = (t) => {
  const { data: e, path: r, errorMaps: n, issueData: s } = t, i = [...r, ...s.path || []], a = {
    ...s,
    path: i
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: i,
      message: s.message
    };
  let o = "";
  const c = n.filter((l) => !!l).slice().reverse();
  for (const l of c)
    o = l(a, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: i,
    message: o
  };
}, Xa = [];
function h(t, e) {
  const r = Xt(), n = Qt({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      r,
      r === ze ? void 0 : ze
    ].filter((s) => !!s)
  });
  t.common.issues.push(n);
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
        return v;
      s.status === "dirty" && e.dirty(), n.push(s.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, r) {
    const n = [];
    for (const s of r) {
      const i = await s.key, a = await s.value;
      n.push({
        key: i,
        value: a
      });
    }
    return J.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const s of r) {
      const { key: i, value: a } = s;
      if (i.status === "aborted" || a.status === "aborted")
        return v;
      i.status === "dirty" && e.dirty(), a.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof a.value < "u" || s.alwaysSet) && (n[i.value] = a.value);
    }
    return { status: e.value, value: n };
  }
}
const v = Object.freeze({
  status: "aborted"
}), Me = (t) => ({ status: "dirty", value: t }), Y = (t) => ({ status: "valid", value: t }), Vr = (t) => t.status === "aborted", Br = (t) => t.status === "dirty", ot = (t) => t.status === "valid", ct = (t) => typeof Promise < "u" && t instanceof Promise;
function er(t, e, r, n) {
  if (r === "a" && !n)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !n : !e.has(t))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
}
function $s(t, e, r, n, s) {
  if (n === "m")
    throw new TypeError("Private method is not writable");
  if (n === "a" && !s)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? t !== e || !s : !e.has(t))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? s.call(t, r) : s ? s.value = r : e.set(t, r), r;
}
var y;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
})(y || (y = {}));
var Qe, et;
class le {
  constructor(e, r, n, s) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Yn = (t, e) => {
  if (ot(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new X(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function x(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: n, description: s } = t;
  if (e && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (a, o) => {
    var c, l;
    const { message: u } = t;
    return a.code === "invalid_enum_value" ? { message: u ?? o.defaultError } : typeof o.data > "u" ? { message: (c = u ?? n) !== null && c !== void 0 ? c : o.defaultError } : a.code !== "invalid_type" ? { message: o.defaultError } : { message: (l = u ?? r) !== null && l !== void 0 ? l : o.defaultError };
  }, description: s };
}
class k {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
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
    if (ct(r))
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
    return Yn(s, i);
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
    }, s = this._parse({ data: e, path: n.path, parent: n }), i = await (ct(s) ? s : Promise.resolve(s));
    return Yn(n, i);
  }
  refine(e, r) {
    const n = (s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r;
    return this._refinement((s, i) => {
      const a = e(s), o = () => i.addIssue({
        code: f.custom,
        ...n(s)
      });
      return typeof Promise < "u" && a instanceof Promise ? a.then((c) => c ? !0 : (o(), !1)) : a ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
  }
  _refinement(e) {
    return new ae({
      schema: this,
      typeName: b.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return ce.create(this, this._def);
  }
  nullable() {
    return Ee.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return se.create(this, this._def);
  }
  promise() {
    return We.create(this, this._def);
  }
  or(e) {
    return ft.create([this, e], this._def);
  }
  and(e) {
    return ht.create(this, e, this._def);
  }
  transform(e) {
    return new ae({
      ...x(this._def),
      schema: this,
      typeName: b.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new bt({
      ...x(this._def),
      innerType: this,
      defaultValue: r,
      typeName: b.ZodDefault
    });
  }
  brand() {
    return new Qr({
      typeName: b.ZodBranded,
      type: this,
      ...x(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new vt({
      ...x(this._def),
      innerType: this,
      catchValue: r,
      typeName: b.ZodCatch
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
    return $t.create(this, e);
  }
  readonly() {
    return wt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Qa = /^c[^\s-]{8,}$/i, eo = /^[0-9a-z]+$/, to = /^[0-9A-HJKMNP-TV-Z]{26}$/, ro = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, no = /^[a-z0-9_-]{21}$/i, so = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, io = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, ao = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Er;
const oo = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, co = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, lo = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Os = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", uo = new RegExp(`^${Os}$`);
function Ns(t) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function fo(t) {
  return new RegExp(`^${Ns(t)}$`);
}
function js(t) {
  let e = `${Os}T${Ns(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function ho(t, e) {
  return !!((e === "v4" || !e) && oo.test(t) || (e === "v6" || !e) && co.test(t));
}
class ne extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const i = this._getOrReturnCtx(e);
      return h(i, {
        code: f.invalid_type,
        expected: p.string,
        received: i.parsedType
      }), v;
    }
    const n = new J();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), n.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), n.dirty());
      else if (i.kind === "length") {
        const a = e.data.length > i.value, o = e.data.length < i.value;
        (a || o) && (s = this._getOrReturnCtx(e, s), a ? h(s, {
          code: f.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : o && h(s, {
          code: f.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), n.dirty());
      } else if (i.kind === "email")
        io.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "email",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "emoji")
        Er || (Er = new RegExp(ao, "u")), Er.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "emoji",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "uuid")
        ro.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "uuid",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "nanoid")
        no.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "nanoid",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "cuid")
        Qa.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "cuid2")
        eo.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid2",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "ulid")
        to.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "ulid",
          code: f.invalid_string,
          message: i.message
        }), n.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), h(s, {
            validation: "url",
            code: f.invalid_string,
            message: i.message
          }), n.dirty();
        }
      else
        i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "regex",
          code: f.invalid_string,
          message: i.message
        }), n.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.invalid_string,
          validation: { includes: i.value, position: i.position },
          message: i.message
        }), n.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.invalid_string,
          validation: { startsWith: i.value },
          message: i.message
        }), n.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.invalid_string,
          validation: { endsWith: i.value },
          message: i.message
        }), n.dirty()) : i.kind === "datetime" ? js(i).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.invalid_string,
          validation: "datetime",
          message: i.message
        }), n.dirty()) : i.kind === "date" ? uo.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.invalid_string,
          validation: "date",
          message: i.message
        }), n.dirty()) : i.kind === "time" ? fo(i).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          code: f.invalid_string,
          validation: "time",
          message: i.message
        }), n.dirty()) : i.kind === "duration" ? so.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "duration",
          code: f.invalid_string,
          message: i.message
        }), n.dirty()) : i.kind === "ip" ? ho(e.data, i.version) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "ip",
          code: f.invalid_string,
          message: i.message
        }), n.dirty()) : i.kind === "base64" ? lo.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "base64",
          code: f.invalid_string,
          message: i.message
        }), n.dirty()) : A.assertNever(i);
    return { status: n.value, value: e.data };
  }
  _regex(e, r, n) {
    return this.refinement((s) => e.test(s), {
      validation: r,
      code: f.invalid_string,
      ...y.errToObj(n)
    });
  }
  _addCheck(e) {
    return new ne({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...y.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...y.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...y.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...y.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...y.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...y.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...y.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...y.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...y.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...y.errToObj(e) });
  }
  datetime(e) {
    var r, n;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      offset: (r = e?.offset) !== null && r !== void 0 ? r : !1,
      local: (n = e?.local) !== null && n !== void 0 ? n : !1,
      ...y.errToObj(e?.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      ...y.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...y.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...y.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r?.position,
      ...y.errToObj(r?.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...y.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...y.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...y.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...y.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...y.errToObj(r)
    });
  }
  nonempty(e) {
    return this.min(1, y.errToObj(e));
  }
  trim() {
    return new ne({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ne({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ne({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
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
ne.create = (t) => {
  var e;
  return new ne({
    checks: [],
    typeName: b.ZodString,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...x(t)
  });
};
function po(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, i = parseInt(t.toFixed(s).replace(".", "")), a = parseInt(e.toFixed(s).replace(".", ""));
  return i % a / Math.pow(10, s);
}
class xe extends k {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const i = this._getOrReturnCtx(e);
      return h(i, {
        code: f.invalid_type,
        expected: p.number,
        received: i.parsedType
      }), v;
    }
    let n;
    const s = new J();
    for (const i of this._def.checks)
      i.kind === "int" ? A.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), s.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? po(e.data, i.value) !== 0 && (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.not_finite,
        message: i.message
      }), s.dirty()) : A.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, y.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, y.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, y.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, y.toString(r));
  }
  setLimit(e, r, n, s) {
    return new xe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: y.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new xe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: y.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: y.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: y.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: y.toString(e)
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
xe.create = (t) => new xe({
  checks: [],
  typeName: b.ZodNumber,
  coerce: t?.coerce || !1,
  ...x(t)
});
class ke extends k {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== p.bigint) {
      const i = this._getOrReturnCtx(e);
      return h(i, {
        code: f.invalid_type,
        expected: p.bigint,
        received: i.parsedType
      }), v;
    }
    let n;
    const s = new J();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: f.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : A.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, y.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, y.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, y.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, y.toString(r));
  }
  setLimit(e, r, n, s) {
    return new ke({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: y.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ke({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(r)
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
}
ke.create = (t) => {
  var e;
  return new ke({
    checks: [],
    typeName: b.ZodBigInt,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...x(t)
  });
};
class lt extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = Boolean(e.data)), this._getType(e) !== p.boolean) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: f.invalid_type,
        expected: p.boolean,
        received: n.parsedType
      }), v;
    }
    return Y(e.data);
  }
}
lt.create = (t) => new lt({
  typeName: b.ZodBoolean,
  coerce: t?.coerce || !1,
  ...x(t)
});
class Te extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const i = this._getOrReturnCtx(e);
      return h(i, {
        code: f.invalid_type,
        expected: p.date,
        received: i.parsedType
      }), v;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return h(i, {
        code: f.invalid_date
      }), v;
    }
    const n = new J();
    let s;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: f.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), n.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: f.too_big,
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
    return new Te({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: y.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: y.toString(r)
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
Te.create = (t) => new Te({
  checks: [],
  coerce: t?.coerce || !1,
  typeName: b.ZodDate,
  ...x(t)
});
class tr extends k {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: f.invalid_type,
        expected: p.symbol,
        received: n.parsedType
      }), v;
    }
    return Y(e.data);
  }
}
tr.create = (t) => new tr({
  typeName: b.ZodSymbol,
  ...x(t)
});
class ut extends k {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: f.invalid_type,
        expected: p.undefined,
        received: n.parsedType
      }), v;
    }
    return Y(e.data);
  }
}
ut.create = (t) => new ut({
  typeName: b.ZodUndefined,
  ...x(t)
});
class dt extends k {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: f.invalid_type,
        expected: p.null,
        received: n.parsedType
      }), v;
    }
    return Y(e.data);
  }
}
dt.create = (t) => new dt({
  typeName: b.ZodNull,
  ...x(t)
});
class Fe extends k {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Y(e.data);
  }
}
Fe.create = (t) => new Fe({
  typeName: b.ZodAny,
  ...x(t)
});
class Ae extends k {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Y(e.data);
  }
}
Ae.create = (t) => new Ae({
  typeName: b.ZodUnknown,
  ...x(t)
});
class me extends k {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return h(r, {
      code: f.invalid_type,
      expected: p.never,
      received: r.parsedType
    }), v;
  }
}
me.create = (t) => new me({
  typeName: b.ZodNever,
  ...x(t)
});
class rr extends k {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: f.invalid_type,
        expected: p.void,
        received: n.parsedType
      }), v;
    }
    return Y(e.data);
  }
}
rr.create = (t) => new rr({
  typeName: b.ZodVoid,
  ...x(t)
});
class se extends k {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), s = this._def;
    if (r.parsedType !== p.array)
      return h(r, {
        code: f.invalid_type,
        expected: p.array,
        received: r.parsedType
      }), v;
    if (s.exactLength !== null) {
      const a = r.data.length > s.exactLength.value, o = r.data.length < s.exactLength.value;
      (a || o) && (h(r, {
        code: a ? f.too_big : f.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: a ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && r.data.length < s.minLength.value && (h(r, {
      code: f.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && (h(r, {
      code: f.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((a, o) => s.type._parseAsync(new le(r, a, r.path, o)))).then((a) => J.mergeArray(n, a));
    const i = [...r.data].map((a, o) => s.type._parseSync(new le(r, a, r.path, o)));
    return J.mergeArray(n, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new se({
      ...this._def,
      minLength: { value: e, message: y.toString(r) }
    });
  }
  max(e, r) {
    return new se({
      ...this._def,
      maxLength: { value: e, message: y.toString(r) }
    });
  }
  length(e, r) {
    return new se({
      ...this._def,
      exactLength: { value: e, message: y.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
se.create = (t, e) => new se({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: b.ZodArray,
  ...x(e)
});
function Re(t) {
  if (t instanceof R) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = ce.create(Re(n));
    }
    return new R({
      ...t._def,
      shape: () => e
    });
  } else
    return t instanceof se ? new se({
      ...t._def,
      type: Re(t.element)
    }) : t instanceof ce ? ce.create(Re(t.unwrap())) : t instanceof Ee ? Ee.create(Re(t.unwrap())) : t instanceof ue ? ue.create(t.items.map((e) => Re(e))) : t;
}
class R extends k {
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
    if (this._getType(e) !== p.object) {
      const l = this._getOrReturnCtx(e);
      return h(l, {
        code: f.invalid_type,
        expected: p.object,
        received: l.parsedType
      }), v;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: i, keys: a } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof me && this._def.unknownKeys === "strip"))
      for (const l in s.data)
        a.includes(l) || o.push(l);
    const c = [];
    for (const l of a) {
      const u = i[l], d = s.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: u._parse(new le(s, d, s.path, l)),
        alwaysSet: l in s.data
      });
    }
    if (this._def.catchall instanceof me) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const u of o)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] }
          });
      else if (l === "strict")
        o.length > 0 && (h(s, {
          code: f.unrecognized_keys,
          keys: o
        }), n.dirty());
      else if (l !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const u of o) {
        const d = s.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: l._parse(
            new le(s, d, s.path, u)
          ),
          alwaysSet: u in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const u of c) {
        const d = await u.key, _ = await u.value;
        l.push({
          key: d,
          value: _,
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
    return y.errToObj, new R({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          var s, i, a, o;
          const c = (a = (i = (s = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(s, r, n).message) !== null && a !== void 0 ? a : n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (o = y.errToObj(e).message) !== null && o !== void 0 ? o : c
          } : {
            message: c
          };
        }
      } : {}
    });
  }
  strip() {
    return new R({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new R({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(e) {
    return new R({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  merge(e) {
    return new R({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: b.ZodObject
    });
  }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  catchall(e) {
    return new R({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return A.objectKeys(e).forEach((n) => {
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    }), new R({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return A.objectKeys(this.shape).forEach((n) => {
      e[n] || (r[n] = this.shape[n]);
    }), new R({
      ...this._def,
      shape: () => r
    });
  }
  deepPartial() {
    return Re(this);
  }
  partial(e) {
    const r = {};
    return A.objectKeys(this.shape).forEach((n) => {
      const s = this.shape[n];
      e && !e[n] ? r[n] = s : r[n] = s.optional();
    }), new R({
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
        for (; i instanceof ce; )
          i = i._def.innerType;
        r[n] = i;
      }
    }), new R({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Ps(A.objectKeys(this.shape));
  }
}
R.create = (t, e) => new R({
  shape: () => t,
  unknownKeys: "strip",
  catchall: me.create(),
  typeName: b.ZodObject,
  ...x(e)
});
R.strictCreate = (t, e) => new R({
  shape: () => t,
  unknownKeys: "strict",
  catchall: me.create(),
  typeName: b.ZodObject,
  ...x(e)
});
R.lazycreate = (t, e) => new R({
  shape: t,
  unknownKeys: "strip",
  catchall: me.create(),
  typeName: b.ZodObject,
  ...x(e)
});
class ft extends k {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function s(i) {
      for (const o of i)
        if (o.result.status === "valid")
          return o.result;
      for (const o of i)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((o) => new X(o.ctx.common.issues));
      return h(r, {
        code: f.invalid_union,
        unionErrors: a
      }), v;
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
      const o = a.map((c) => new X(c));
      return h(r, {
        code: f.invalid_union,
        unionErrors: o
      }), v;
    }
  }
  get options() {
    return this._def.options;
  }
}
ft.create = (t, e) => new ft({
  options: t,
  typeName: b.ZodUnion,
  ...x(e)
});
const he = (t) => t instanceof mt ? he(t.schema) : t instanceof ae ? he(t.innerType()) : t instanceof gt ? [t.value] : t instanceof Se ? t.options : t instanceof yt ? A.objectValues(t.enum) : t instanceof bt ? he(t._def.innerType) : t instanceof ut ? [void 0] : t instanceof dt ? [null] : t instanceof ce ? [void 0, ...he(t.unwrap())] : t instanceof Ee ? [null, ...he(t.unwrap())] : t instanceof Qr || t instanceof wt ? he(t.unwrap()) : t instanceof vt ? he(t._def.innerType) : [];
class mr extends k {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.object)
      return h(r, {
        code: f.invalid_type,
        expected: p.object,
        received: r.parsedType
      }), v;
    const n = this.discriminator, s = r.data[n], i = this.optionsMap.get(s);
    return i ? r.common.async ? i._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : i._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (h(r, {
      code: f.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), v);
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
      const a = he(i.shape[e]);
      if (!a.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of a) {
        if (s.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        s.set(o, i);
      }
    }
    return new mr({
      typeName: b.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: s,
      ...x(n)
    });
  }
}
function Gr(t, e) {
  const r = be(t), n = be(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === p.object && n === p.object) {
    const s = A.objectKeys(e), i = A.objectKeys(t).filter((o) => s.indexOf(o) !== -1), a = { ...t, ...e };
    for (const o of i) {
      const c = Gr(t[o], e[o]);
      if (!c.valid)
        return { valid: !1 };
      a[o] = c.data;
    }
    return { valid: !0, data: a };
  } else if (r === p.array && n === p.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const a = t[i], o = e[i], c = Gr(a, o);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else
    return r === p.date && n === p.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class ht extends k {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = (i, a) => {
      if (Vr(i) || Vr(a))
        return v;
      const o = Gr(i.value, a.value);
      return o.valid ? ((Br(i) || Br(a)) && r.dirty(), { status: r.value, value: o.data }) : (h(n, {
        code: f.invalid_intersection_types
      }), v);
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
ht.create = (t, e, r) => new ht({
  left: t,
  right: e,
  typeName: b.ZodIntersection,
  ...x(r)
});
class ue extends k {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.array)
      return h(n, {
        code: f.invalid_type,
        expected: p.array,
        received: n.parsedType
      }), v;
    if (n.data.length < this._def.items.length)
      return h(n, {
        code: f.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), v;
    !this._def.rest && n.data.length > this._def.items.length && (h(n, {
      code: f.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const i = [...n.data].map((a, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new le(n, a, n.path, o)) : null;
    }).filter((a) => !!a);
    return n.common.async ? Promise.all(i).then((a) => J.mergeArray(r, a)) : J.mergeArray(r, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new ue({
      ...this._def,
      rest: e
    });
  }
}
ue.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ue({
    items: t,
    typeName: b.ZodTuple,
    rest: null,
    ...x(e)
  });
};
class pt extends k {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.object)
      return h(n, {
        code: f.invalid_type,
        expected: p.object,
        received: n.parsedType
      }), v;
    const s = [], i = this._def.keyType, a = this._def.valueType;
    for (const o in n.data)
      s.push({
        key: i._parse(new le(n, o, n.path, o)),
        value: a._parse(new le(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data
      });
    return n.common.async ? J.mergeObjectAsync(r, s) : J.mergeObjectSync(r, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof k ? new pt({
      keyType: e,
      valueType: r,
      typeName: b.ZodRecord,
      ...x(n)
    }) : new pt({
      keyType: ne.create(),
      valueType: e,
      typeName: b.ZodRecord,
      ...x(r)
    });
  }
}
class nr extends k {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.map)
      return h(n, {
        code: f.invalid_type,
        expected: p.map,
        received: n.parsedType
      }), v;
    const s = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([o, c], l) => ({
      key: s._parse(new le(n, o, n.path, [l, "key"])),
      value: i._parse(new le(n, c, n.path, [l, "value"]))
    }));
    if (n.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of a) {
          const l = await c.key, u = await c.value;
          if (l.status === "aborted" || u.status === "aborted")
            return v;
          (l.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(l.value, u.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of a) {
        const l = c.key, u = c.value;
        if (l.status === "aborted" || u.status === "aborted")
          return v;
        (l.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(l.value, u.value);
      }
      return { status: r.value, value: o };
    }
  }
}
nr.create = (t, e, r) => new nr({
  valueType: e,
  keyType: t,
  typeName: b.ZodMap,
  ...x(r)
});
class $e extends k {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.set)
      return h(n, {
        code: f.invalid_type,
        expected: p.set,
        received: n.parsedType
      }), v;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (h(n, {
      code: f.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (h(n, {
      code: f.too_big,
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
          return v;
        u.status === "dirty" && r.dirty(), l.add(u.value);
      }
      return { status: r.value, value: l };
    }
    const o = [...n.data.values()].map((c, l) => i._parse(new le(n, c, n.path, l)));
    return n.common.async ? Promise.all(o).then((c) => a(c)) : a(o);
  }
  min(e, r) {
    return new $e({
      ...this._def,
      minSize: { value: e, message: y.toString(r) }
    });
  }
  max(e, r) {
    return new $e({
      ...this._def,
      maxSize: { value: e, message: y.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
$e.create = (t, e) => new $e({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: b.ZodSet,
  ...x(e)
});
class Ue extends k {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.function)
      return h(r, {
        code: f.invalid_type,
        expected: p.function,
        received: r.parsedType
      }), v;
    function n(o, c) {
      return Qt({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Xt(),
          ze
        ].filter((l) => !!l),
        issueData: {
          code: f.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function s(o, c) {
      return Qt({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Xt(),
          ze
        ].filter((l) => !!l),
        issueData: {
          code: f.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const i = { errorMap: r.common.contextualErrorMap }, a = r.data;
    if (this._def.returns instanceof We) {
      const o = this;
      return Y(async function(...c) {
        const l = new X([]), u = await o._def.args.parseAsync(c, i).catch((m) => {
          throw l.addIssue(n(c, m)), l;
        }), d = await Reflect.apply(a, this, u);
        return await o._def.returns._def.type.parseAsync(d, i).catch((m) => {
          throw l.addIssue(s(d, m)), l;
        });
      });
    } else {
      const o = this;
      return Y(function(...c) {
        const l = o._def.args.safeParse(c, i);
        if (!l.success)
          throw new X([n(c, l.error)]);
        const u = Reflect.apply(a, this, l.data), d = o._def.returns.safeParse(u, i);
        if (!d.success)
          throw new X([s(u, d.error)]);
        return d.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Ue({
      ...this._def,
      args: ue.create(e).rest(Ae.create())
    });
  }
  returns(e) {
    return new Ue({
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
    return new Ue({
      args: e || ue.create([]).rest(Ae.create()),
      returns: r || Ae.create(),
      typeName: b.ZodFunction,
      ...x(n)
    });
  }
}
class mt extends k {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
mt.create = (t, e) => new mt({
  getter: t,
  typeName: b.ZodLazy,
  ...x(e)
});
class gt extends k {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        received: r.data,
        code: f.invalid_literal,
        expected: this._def.value
      }), v;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
gt.create = (t, e) => new gt({
  value: t,
  typeName: b.ZodLiteral,
  ...x(e)
});
function Ps(t, e) {
  return new Se({
    values: t,
    typeName: b.ZodEnum,
    ...x(e)
  });
}
class Se extends k {
  constructor() {
    super(...arguments), Qe.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return h(r, {
        expected: A.joinValues(n),
        received: r.parsedType,
        code: f.invalid_type
      }), v;
    }
    if (er(this, Qe, "f") || $s(this, Qe, new Set(this._def.values), "f"), !er(this, Qe, "f").has(e.data)) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return h(r, {
        received: r.data,
        code: f.invalid_enum_value,
        options: n
      }), v;
    }
    return Y(e.data);
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
  extract(e, r = this._def) {
    return Se.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return Se.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
Qe = /* @__PURE__ */ new WeakMap();
Se.create = Ps;
class yt extends k {
  constructor() {
    super(...arguments), et.set(this, void 0);
  }
  _parse(e) {
    const r = A.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== p.string && n.parsedType !== p.number) {
      const s = A.objectValues(r);
      return h(n, {
        expected: A.joinValues(s),
        received: n.parsedType,
        code: f.invalid_type
      }), v;
    }
    if (er(this, et, "f") || $s(this, et, new Set(A.getValidEnumValues(this._def.values)), "f"), !er(this, et, "f").has(e.data)) {
      const s = A.objectValues(r);
      return h(n, {
        received: n.data,
        code: f.invalid_enum_value,
        options: s
      }), v;
    }
    return Y(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
et = /* @__PURE__ */ new WeakMap();
yt.create = (t, e) => new yt({
  values: t,
  typeName: b.ZodNativeEnum,
  ...x(e)
});
class We extends k {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.promise && r.common.async === !1)
      return h(r, {
        code: f.invalid_type,
        expected: p.promise,
        received: r.parsedType
      }), v;
    const n = r.parsedType === p.promise ? r.data : Promise.resolve(r.data);
    return Y(n.then((s) => this._def.type.parseAsync(s, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
We.create = (t, e) => new We({
  type: t,
  typeName: b.ZodPromise,
  ...x(e)
});
class ae extends k {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === b.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null, i = {
      addIssue: (a) => {
        h(n, a), a.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), s.type === "preprocess") {
      const a = s.transform(n.data, i);
      if (n.common.async)
        return Promise.resolve(a).then(async (o) => {
          if (r.value === "aborted")
            return v;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n
          });
          return c.status === "aborted" ? v : c.status === "dirty" || r.value === "dirty" ? Me(c.value) : c;
        });
      {
        if (r.value === "aborted")
          return v;
        const o = this._def.schema._parseSync({
          data: a,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? v : o.status === "dirty" || r.value === "dirty" ? Me(o.value) : o;
      }
    }
    if (s.type === "refinement") {
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
        return o.status === "aborted" ? v : (o.status === "dirty" && r.dirty(), a(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => o.status === "aborted" ? v : (o.status === "dirty" && r.dirty(), a(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!ot(a))
          return a;
        const o = s.transform(a.value, i);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((a) => ot(a) ? Promise.resolve(s.transform(a.value, i)).then((o) => ({ status: r.value, value: o })) : a);
    A.assertNever(s);
  }
}
ae.create = (t, e, r) => new ae({
  schema: t,
  typeName: b.ZodEffects,
  effect: e,
  ...x(r)
});
ae.createWithPreprocess = (t, e, r) => new ae({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: b.ZodEffects,
  ...x(r)
});
class ce extends k {
  _parse(e) {
    return this._getType(e) === p.undefined ? Y(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ce.create = (t, e) => new ce({
  innerType: t,
  typeName: b.ZodOptional,
  ...x(e)
});
class Ee extends k {
  _parse(e) {
    return this._getType(e) === p.null ? Y(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ee.create = (t, e) => new Ee({
  innerType: t,
  typeName: b.ZodNullable,
  ...x(e)
});
class bt extends k {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === p.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
bt.create = (t, e) => new bt({
  innerType: t,
  typeName: b.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...x(e)
});
class vt extends k {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return ct(s) ? s.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new X(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new X(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
vt.create = (t, e) => new vt({
  innerType: t,
  typeName: b.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...x(e)
});
class sr extends k {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: f.invalid_type,
        expected: p.nan,
        received: n.parsedType
      }), v;
    }
    return { status: "valid", value: e.data };
  }
}
sr.create = (t) => new sr({
  typeName: b.ZodNaN,
  ...x(t)
});
const mo = Symbol("zod_brand");
class Qr extends k {
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
class $t extends k {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? v : i.status === "dirty" ? (r.dirty(), Me(i.value)) : this._def.out._parseAsync({
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
      return s.status === "aborted" ? v : s.status === "dirty" ? (r.dirty(), {
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
    return new $t({
      in: e,
      out: r,
      typeName: b.ZodPipeline
    });
  }
}
class wt extends k {
  _parse(e) {
    const r = this._def.innerType._parse(e), n = (s) => (ot(s) && (s.value = Object.freeze(s.value)), s);
    return ct(r) ? r.then((s) => n(s)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
wt.create = (t, e) => new wt({
  innerType: t,
  typeName: b.ZodReadonly,
  ...x(e)
});
function Rs(t, e = {}, r) {
  return t ? Fe.create().superRefine((n, s) => {
    var i, a;
    if (!t(n)) {
      const o = typeof e == "function" ? e(n) : typeof e == "string" ? { message: e } : e, c = (a = (i = o.fatal) !== null && i !== void 0 ? i : r) !== null && a !== void 0 ? a : !0, l = typeof o == "string" ? { message: o } : o;
      s.addIssue({ code: "custom", ...l, fatal: c });
    }
  }) : Fe.create();
}
const go = {
  object: R.lazycreate
};
var b;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(b || (b = {}));
const yo = (t, e = {
  message: `Input not instance of ${t.name}`
}) => Rs((r) => r instanceof t, e), Is = ne.create, Ms = xe.create, bo = sr.create, vo = ke.create, Ls = lt.create, wo = Te.create, _o = tr.create, xo = ut.create, ko = dt.create, So = Fe.create, Eo = Ae.create, Co = me.create, Ao = rr.create, To = se.create, $o = R.create, Oo = R.strictCreate, No = ft.create, jo = mr.create, Po = ht.create, Ro = ue.create, Io = pt.create, Mo = nr.create, Lo = $e.create, Do = Ue.create, Uo = mt.create, Zo = gt.create, Vo = Se.create, Bo = yt.create, Go = We.create, qn = ae.create, zo = ce.create, Fo = Ee.create, Wo = ae.createWithPreprocess, Ko = $t.create, Jo = () => Is().optional(), Yo = () => Ms().optional(), qo = () => Ls().optional(), Ho = {
  string: (t) => ne.create({ ...t, coerce: !0 }),
  number: (t) => xe.create({ ...t, coerce: !0 }),
  boolean: (t) => lt.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => ke.create({ ...t, coerce: !0 }),
  date: (t) => Te.create({ ...t, coerce: !0 })
}, Xo = v;
var Q = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: ze,
  setErrorMap: Ha,
  getErrorMap: Xt,
  makeIssue: Qt,
  EMPTY_PATH: Xa,
  addIssueToContext: h,
  ParseStatus: J,
  INVALID: v,
  DIRTY: Me,
  OK: Y,
  isAborted: Vr,
  isDirty: Br,
  isValid: ot,
  isAsync: ct,
  get util() {
    return A;
  },
  get objectUtil() {
    return Zr;
  },
  ZodParsedType: p,
  getParsedType: be,
  ZodType: k,
  datetimeRegex: js,
  ZodString: ne,
  ZodNumber: xe,
  ZodBigInt: ke,
  ZodBoolean: lt,
  ZodDate: Te,
  ZodSymbol: tr,
  ZodUndefined: ut,
  ZodNull: dt,
  ZodAny: Fe,
  ZodUnknown: Ae,
  ZodNever: me,
  ZodVoid: rr,
  ZodArray: se,
  ZodObject: R,
  ZodUnion: ft,
  ZodDiscriminatedUnion: mr,
  ZodIntersection: ht,
  ZodTuple: ue,
  ZodRecord: pt,
  ZodMap: nr,
  ZodSet: $e,
  ZodFunction: Ue,
  ZodLazy: mt,
  ZodLiteral: gt,
  ZodEnum: Se,
  ZodNativeEnum: yt,
  ZodPromise: We,
  ZodEffects: ae,
  ZodTransformer: ae,
  ZodOptional: ce,
  ZodNullable: Ee,
  ZodDefault: bt,
  ZodCatch: vt,
  ZodNaN: sr,
  BRAND: mo,
  ZodBranded: Qr,
  ZodPipeline: $t,
  ZodReadonly: wt,
  custom: Rs,
  Schema: k,
  ZodSchema: k,
  late: go,
  get ZodFirstPartyTypeKind() {
    return b;
  },
  coerce: Ho,
  any: So,
  array: To,
  bigint: vo,
  boolean: Ls,
  date: wo,
  discriminatedUnion: jo,
  effect: qn,
  enum: Vo,
  function: Do,
  instanceof: yo,
  intersection: Po,
  lazy: Uo,
  literal: Zo,
  map: Mo,
  nan: bo,
  nativeEnum: Bo,
  never: Co,
  null: ko,
  nullable: Fo,
  number: Ms,
  object: $o,
  oboolean: qo,
  onumber: Yo,
  optional: zo,
  ostring: Jo,
  pipeline: Ko,
  preprocess: Wo,
  promise: Go,
  record: Io,
  set: Lo,
  strictObject: Oo,
  string: Is,
  symbol: _o,
  transformer: qn,
  tuple: Ro,
  undefined: xo,
  union: No,
  unknown: Eo,
  void: Ao,
  NEVER: Xo,
  ZodIssueCode: f,
  quotelessJson: qa,
  ZodError: X
});
class en {
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
const Qo = () => ({
  isAuthenticated: !1
});
class Ds extends en {
  #e;
  #t;
  #r;
  constructor(e, r) {
    super(Qo()), this.#e = e, this.#t = r, this.#r = "";
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
        return Xr(r), this.signout();
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
const ec = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u), tc = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/), rc = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u), nc = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?!.* ).{3,16}$/), Us = Q.string().trim().email("Must be a valid email address"), Hn = Q.string().trim().regex(ec, "Must be a valid name"), Zs = Q.string().trim().regex(nc, "Must be 3-16 charcters and contain one digit and a special char"), sc = Q.string().trim().regex(rc, "Must be a valid street address").or(Q.literal("")), ic = Q.preprocess(
  (t) => t.split(" ").join(""),
  Q.string().trim().regex(tc, "Must be a valid phone number").or(Q.literal(""))
), ir = (t, e, r) => {
  const n = t.safeParse(e);
  if (n.success)
    return r({}), n.data;
  r(n.error.flatten());
}, Vs = (t, e) => {
  const r = t.safeParse(e);
  r.success || console.warn("Incompatible data loaded:", r.error.flatten());
}, Bs = Q.object({
  email: Us,
  pass: Zs
}), ac = Bs.omit({ pass: !0 }), oc = () => ({
  email: "",
  pass: ""
});
class cc extends en {
  #e;
  constructor(e) {
    super(oc()), this.#e = e;
  }
  async loadData() {
    const e = await this.#e.getAccountDetails();
    Vs(ac, e), this.setState(e);
  }
  async saveData(e) {
    await this.#e.setAccountDetails(e), this.setState(e);
  }
}
const Gs = Q.object({
  firstName: Hn,
  lastName: Hn,
  address: sc,
  phone: ic
}), lc = Gs, uc = () => ({
  firstName: "",
  lastName: "",
  address: "",
  phone: ""
});
class dc extends en {
  #e;
  constructor(e) {
    super(uc()), this.#e = e;
  }
  async loadData() {
    const e = await this.#e.getProfileDetails();
    Vs(lc, e), this.setState(e);
  }
  async saveData(e) {
    await this.#e.setProfileDetails(e), this.setState(e);
  }
}
var fc = /* @__PURE__ */ j("<div class=loading><sl-spinner style=font-size:50px;--track-width:10px;></sl-spinner><div>", !0, !1);
const Ot = (t) => (() => {
  var e = fc(), r = e.firstChild, n = r.nextSibling;
  return r._$owner = D(), w(n, () => t.children), e;
})(), zs = St(), hc = (t) => {
  const e = new As(t.datapoint, t.namespace, t.database), r = new Ds(e, {
    namespace: t.namespace,
    database: t.database,
    scope: t.scope
  }), n = new cc(e), s = new dc(e), i = {
    auth: r,
    account: n,
    profile: s
  };
  return te(() => !e.isConnected, async () => {
    await e.connect();
  }), g(Ct, {
    get fallback() {
      return g(Ot, {});
    },
    get children() {
      return [F(() => Ye()), g(zs.Provider, {
        value: i,
        get children() {
          return t.children;
        }
      })];
    }
  });
}, qe = () => Ke(zs), zr = Symbol("store-raw"), Ze = Symbol("store-node"), pe = Symbol("store-has"), Fs = Symbol("store-self");
function Ws(t) {
  let e = t[ie];
  if (!e && (Object.defineProperty(t, ie, {
    value: e = new Proxy(t, gc)
  }), !Array.isArray(t))) {
    const r = Object.keys(t), n = Object.getOwnPropertyDescriptors(t);
    for (let s = 0, i = r.length; s < i; s++) {
      const a = r[s];
      n[a].get && Object.defineProperty(t, a, {
        enumerable: n[a].enumerable,
        get: n[a].get.bind(e)
      });
    }
  }
  return e;
}
function ar(t) {
  let e;
  return t != null && typeof t == "object" && (t[ie] || !(e = Object.getPrototypeOf(t)) || e === Object.prototype || Array.isArray(t));
}
function _t(t, e = /* @__PURE__ */ new Set()) {
  let r, n, s, i;
  if (r = t != null && t[zr])
    return r;
  if (!ar(t) || e.has(t))
    return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? t = t.slice(0) : e.add(t);
    for (let a = 0, o = t.length; a < o; a++)
      s = t[a], (n = _t(s, e)) !== s && (t[a] = n);
  } else {
    Object.isFrozen(t) ? t = Object.assign({}, t) : e.add(t);
    const a = Object.keys(t), o = Object.getOwnPropertyDescriptors(t);
    for (let c = 0, l = a.length; c < l; c++)
      i = a[c], !o[i].get && (s = t[i], (n = _t(s, e)) !== s && (t[i] = n));
  }
  return t;
}
function or(t, e) {
  let r = t[e];
  return r || Object.defineProperty(t, e, {
    value: r = /* @__PURE__ */ Object.create(null)
  }), r;
}
function xt(t, e, r) {
  if (t[e])
    return t[e];
  const [n, s] = I(r, {
    equals: !1,
    internal: !0
  });
  return n.$ = s, t[e] = n;
}
function pc(t, e) {
  const r = Reflect.getOwnPropertyDescriptor(t, e);
  return !r || r.get || !r.configurable || e === ie || e === Ze || (delete r.value, delete r.writable, r.get = () => t[ie][e]), r;
}
function Ks(t) {
  Ar() && xt(or(t, Ze), Fs)();
}
function mc(t) {
  return Ks(t), Reflect.ownKeys(t);
}
const gc = {
  get(t, e, r) {
    if (e === zr)
      return t;
    if (e === ie)
      return r;
    if (e === Cr)
      return Ks(t), r;
    const n = or(t, Ze), s = n[e];
    let i = s ? s() : t[e];
    if (e === Ze || e === pe || e === "__proto__")
      return i;
    if (!s) {
      const a = Object.getOwnPropertyDescriptor(t, e);
      Ar() && (typeof i != "function" || t.hasOwnProperty(e)) && !(a && a.get) && (i = xt(n, e, i)());
    }
    return ar(i) ? Ws(i) : i;
  },
  has(t, e) {
    return e === zr || e === ie || e === Cr || e === Ze || e === pe || e === "__proto__" ? !0 : (Ar() && xt(or(t, pe), e)(), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: mc,
  getOwnPropertyDescriptor: pc
};
function cr(t, e, r, n = !1) {
  if (!n && t[e] === r)
    return;
  const s = t[e], i = t.length;
  r === void 0 ? (delete t[e], t[pe] && t[pe][e] && s !== void 0 && t[pe][e].$()) : (t[e] = r, t[pe] && t[pe][e] && s === void 0 && t[pe][e].$());
  let a = or(t, Ze), o;
  if ((o = xt(a, e, s)) && o.$(() => r), Array.isArray(t) && t.length !== i) {
    for (let c = t.length; c < i; c++)
      (o = a[c]) && o.$();
    (o = xt(a, "length", i)) && o.$(t.length);
  }
  (o = a[Fs]) && o.$();
}
function Js(t, e) {
  const r = Object.keys(e);
  for (let n = 0; n < r.length; n += 1) {
    const s = r[n];
    cr(t, s, e[s]);
  }
}
function yc(t, e) {
  if (typeof e == "function" && (e = e(t)), e = _t(e), Array.isArray(e)) {
    if (t === e)
      return;
    let r = 0, n = e.length;
    for (; r < n; r++) {
      const s = e[r];
      t[r] !== s && cr(t, r, s);
    }
    cr(t, "length", n);
  } else
    Js(t, e);
}
function tt(t, e, r = []) {
  let n, s = t;
  if (e.length > 1) {
    n = e.shift();
    const a = typeof n, o = Array.isArray(t);
    if (Array.isArray(n)) {
      for (let c = 0; c < n.length; c++)
        tt(t, [n[c]].concat(e), r);
      return;
    } else if (o && a === "function") {
      for (let c = 0; c < t.length; c++)
        n(t[c], c) && tt(t, [c].concat(e), r);
      return;
    } else if (o && a === "object") {
      const { from: c = 0, to: l = t.length - 1, by: u = 1 } = n;
      for (let d = c; d <= l; d += u)
        tt(t, [d].concat(e), r);
      return;
    } else if (e.length > 1) {
      tt(t[n], e, [n].concat(r));
      return;
    }
    s = t[n], r = [n].concat(r);
  }
  let i = e[0];
  typeof i == "function" && (i = i(s, r), i === s) || n === void 0 && i == null || (i = _t(i), n === void 0 || ar(s) && ar(i) && !Array.isArray(i) ? Js(s, i) : cr(t, n, i));
}
function gr(...[t, e]) {
  const r = _t(t || {}), n = Array.isArray(r), s = Ws(r);
  function i(...a) {
    fi(() => {
      n && a.length === 1 ? yc(r, a[0]) : tt(r, a);
    });
  }
  return [s, i];
}
var bc = /* @__PURE__ */ j("<sl-alert>", !0, !1), Ys = /* @__PURE__ */ j("<sl-icon slot=icon>", !0, !1), vc = /* @__PURE__ */ j("<div class=error><sl-icon class=icon name=exclamation-circle></sl-icon><span>.", !0, !1), wc = /* @__PURE__ */ j("<div class=field><sl-input>", !0, !1), _c = /* @__PURE__ */ j("<sl-icon class=rotate slot=suffix name=arrow-repeat>", !0, !1), xc = /* @__PURE__ */ j("<sl-button>", !0, !1), kc = /* @__PURE__ */ j("<form>");
const qs = (t) => {
  ge();
  const [e, r] = Fr(t, ["isOpen"]);
  return (() => {
    var n = bc();
    return Wr(n, r, !1, !0), n._$owner = D(), w(n, () => t.children, null), w(n, () => t.message, null), H(() => z(n, "open", e.isOpen)), n;
  })();
}, Hs = (t) => g(qs, fr(t, {
  variant: "success",
  get children() {
    var e = Ys();
    return z(e, "name", "info-circle"), e._$owner = D(), e;
  }
})), tn = (t) => g(qs, fr(t, {
  variant: "warning",
  get children() {
    var e = Ys();
    return z(e, "name", "exclamation-triangle"), e._$owner = D(), e;
  }
})), ve = (t) => {
  const {
    t: e
  } = ge(), [r, n] = Fr(t, ["isSubmiting", "errors"]);
  return (() => {
    var s = wc(), i = s.firstChild;
    return Wr(i, fr(n, {
      get disabled() {
        return r.isSubmiting;
      }
    }), !1, !1), i._$owner = D(), w(s, g(_e, {
      get when() {
        return r.errors;
      },
      get children() {
        var a = vc(), o = a.firstChild, c = o.nextSibling, l = c.firstChild;
        return o._$owner = D(), w(c, () => r.errors?.map((u) => e(u) || u).join(". "), l), a;
      }
    }), null), s;
  })();
}, kt = (t) => {
  const [e, r] = Fr(t, ["isSubmiting", "children"]);
  return (() => {
    var n = xc();
    return Wr(n, fr(r, {
      get disabled() {
        return e.isSubmiting;
      }
    }), !1, !0), n._$owner = D(), w(n, g(_e, {
      get when() {
        return e.isSubmiting;
      },
      get children() {
        var s = _c();
        return s._$owner = D(), s;
      }
    }), null), w(n, () => e.children, null), n;
  })();
}, rn = (t) => {
  const e = (r) => {
    r.preventDefault(), t.onSubmit();
  };
  return (() => {
    var r = kc();
    return r.addEventListener("submit", e), w(r, () => t.children), r;
  })();
};
var Sc = /* @__PURE__ */ j("<div>"), Ec = /* @__PURE__ */ j("<section><h2>");
const Xn = Q.object({
  email: Us,
  pass: Zs
}), Cc = {
  email: "flemming8@intergate.io",
  pass: "flemming8"
}, Ac = () => {
  const {
    t
  } = ge(), {
    auth: e
  } = qe(), [r, n] = gr(Cc), [s, i] = I(), [a, o] = I(), [c, l] = I({}), [u] = te(() => !0, async () => await e.authenticate()), [d] = te(a, (C) => e.signin(C)), [_] = te(s, (C) => e.signup(C));
  st(async () => {
    d.error && (console.warn(d.error?.message), l({
      formErrors: [t("Failed signing in"), t("Did you type your password and email correct?")]
    })), _.error && (console.warn(_.error?.message), l({
      formErrors: [t("Failed signing up"), t("Did you already sign up?")]
    }));
  });
  const m = (C) => (L) => {
    n(C, L.target.value);
  }, S = () => d.loading || _.loading;
  return (() => {
    var C = Ec(), L = C.firstChild;
    return w(L, () => t("Sign in")), w(C, g(Ct, {
      get fallback() {
        return g(Ot, {});
      },
      get children() {
        return [F(() => Ye(u())), g(rn, {
          onSubmit: () => o(ir(Xn, r, l)),
          get children() {
            return [g(ve, {
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
                return S();
              }
            }), g(ve, {
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
                return S();
              }
            }), g(tn, {
              get open() {
                return !!c().formErrors?.length;
              },
              get message() {
                return c().formErrors?.join(". ");
              }
            }), (() => {
              var $ = Sc();
              return w($, g(kt, {
                onClick: () => i(ir(Xn, r, l)),
                get isSubmiting() {
                  return S();
                },
                variant: "neutral",
                get children() {
                  return t("Sign up");
                }
              }), null), w($, g(kt, {
                type: "submit",
                variant: "primary",
                get isSubmiting() {
                  return S();
                },
                get children() {
                  return t("Sign in");
                }
              }), null), $;
            })()];
          }
        })];
      }
    }), null), C;
  })();
}, Tc = () => {
  const {
    t
  } = ge(), {
    auth: e
  } = qe(), [r, n] = I(), [s] = te(r, () => e.signout());
  return g(kt, {
    get isSubmiting() {
      return s.loading;
    },
    onClick: () => n(!0),
    variant: "primary",
    get children() {
      return t("Sign out");
    }
  });
};
var $c = /* @__PURE__ */ j("<div><sl-select>", !0, !1), Oc = /* @__PURE__ */ j("<sl-option>", !0, !1);
const Nc = (t = {}) => {
  const r = {
    ...{
      languageCodeOnly: !0
    },
    ...t
  }, n = navigator.languages === void 0 ? [navigator.language] : navigator.languages;
  return n ? n.map((s) => {
    const i = s.trim();
    return r.languageCodeOnly ? i.split(/-|_/)[0] : i;
  }) : [];
}, jc = (t) => {
  const {
    locale: e,
    setLocale: r
  } = ge(), n = (a) => {
    localStorage.langCode = a, r(a);
  };
  let s = localStorage.langCode;
  s || (s = Nc()[0] ?? e()), s !== e() && n(s);
  const i = F(() => pn.find(({
    code: a
  }) => a === e()));
  return (() => {
    var a = $c(), o = a.firstChild;
    return o.addEventListener("sl-change", (c) => n(c.target.value)), o._$owner = D(), w(o, g(us, {
      each: pn,
      children: (c) => (() => {
        var l = Oc();
        return l._$owner = D(), w(l, () => c.name), H(() => z(l, "value", c.code)), l;
      })()
    })), H(() => z(o, "value", i()?.code)), a;
  })();
};
var Pc = /* @__PURE__ */ j("<sl-avatar>", !0, !1), Rc = /* @__PURE__ */ j("<div class=top-bar><menu></menu><h1>");
const Ic = ({
  firstName: t,
  lastName: e
}) => [t, e].reduce((r, n) => (r = r + (n.length ? n[0] : ""), r), ""), Mc = (t) => {
  const {
    t: e
  } = ge(), {
    profile: r,
    auth: n
  } = qe(), s = at(n), i = at(r), a = () => s()?.isAuthenticated, o = F(() => i() && Ic(i()));
  return (() => {
    var c = Rc(), l = c.firstChild, u = l.nextSibling;
    return w(l, g(_e, {
      get when() {
        return a();
      },
      get children() {
        var d = Pc();
        return d._$owner = D(), H(() => z(d, "initials", o())), d;
      }
    }), null), w(l, g(jc, {}), null), w(l, g(_e, {
      get when() {
        return a();
      },
      get children() {
        return g(Tc, {});
      }
    }), null), w(u, () => e(t.title)), c;
  })();
};
var Lc = /* @__PURE__ */ j("<section><h2></h2><p>Not implemented!");
const Qn = (t) => (() => {
  var e = Lc(), r = e.firstChild;
  return w(r, () => t.title), e;
})();
var Dc = /* @__PURE__ */ j("<section><h2>");
const Uc = () => {
  const {
    t
  } = ge(), {
    auth: e,
    profile: r
  } = qe(), [n, s] = I(), [i, a] = gr(r.state), [o, c] = I({}), l = at(r);
  H(() => {
    const m = l();
    m && a(m);
  });
  const [u] = te(() => e.isAuthenticated, () => r.loadData()), [d] = te(n, (m) => {
    r.saveData(m);
  });
  st(async () => {
    d.loading && c({}), d.error && c({
      formErrors: [t("Error saving")]
    }), d.state === "ready" && console.log("!");
  });
  const _ = (m) => (S) => {
    a(m, S.target.value);
  };
  return (() => {
    var m = Dc(), S = m.firstChild;
    return w(S, () => t("Profile")), w(m, g(Ct, {
      get fallback() {
        return g(Ot, {});
      },
      get children() {
        return [F(() => Ye(u())), g(rn, {
          onSubmit: () => s(ir(Gs, i, c)),
          get children() {
            return [g(ve, {
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
                return _("firstName");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.firstName;
              },
              get isSubmiting() {
                return d.loading;
              },
              get errors() {
                return o().fieldErrors?.firstName;
              }
            }), g(ve, {
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
                return _("lastName");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.lastName;
              },
              get isSubmiting() {
                return d.loading;
              },
              get errors() {
                return o().fieldErrors?.lastName;
              }
            }), g(ve, {
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
                return _("address");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.address;
              },
              get isSubmiting() {
                return d.loading;
              },
              get errors() {
                return o().fieldErrors?.address;
              }
            }), g(ve, {
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
                return _("phone");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.phone;
              },
              get isSubmiting() {
                return d.loading;
              },
              get errors() {
                return o().fieldErrors?.phone;
              }
            }), g(tn, {
              get open() {
                return !!o().formErrors?.length;
              },
              get message() {
                return o().formErrors?.join(". ");
              }
            }), g(Hs, {
              get open() {
                return d.state === "ready";
              },
              message: `Succesfulluy saved at ${new Date()}`
            }), g(kt, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return d.loading;
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
var Zc = /* @__PURE__ */ j("<section><h2>");
const Vc = () => {
  const {
    t
  } = ge(), {
    auth: e,
    account: r
  } = qe(), [n, s] = I(), [i, a] = gr(r.state), [o, c] = I({}), l = at(r);
  H(() => {
    const m = l();
    m && a(m);
  });
  const [u] = te(() => e.isAuthenticated, () => r.loadData());
  st(() => {
    e.isAuthenticated || console.log("clear accountData");
  });
  const [d] = te(n, (m) => r.saveData(m));
  st(async () => {
    d.error && c({
      formErrors: [t("Error saving")]
    }), d.state === "ready" && a("pass", "");
  });
  const _ = (m) => (S) => {
    a(m, S.target.value);
  };
  return (() => {
    var m = Zc(), S = m.firstChild;
    return w(S, () => t("Account")), w(m, g(Ct, {
      get fallback() {
        return g(Ot, {});
      },
      get children() {
        return [F(() => Ye(u())), g(rn, {
          onSubmit: () => s(ir(Bs, i, c)),
          get children() {
            return [g(ve, {
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
                return _("email");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.email;
              },
              get isSubmiting() {
                return d.loading;
              },
              get errors() {
                return o().fieldErrors?.email;
              }
            }), g(ve, {
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
                return _("pass");
              },
              get ["data-invalid"]() {
                return !!o().fieldErrors?.pass;
              },
              get isSubmiting() {
                return d.loading;
              },
              get errors() {
                return o().fieldErrors?.pass;
              }
            }), g(tn, {
              get open() {
                return !!o().formErrors?.length;
              },
              get message() {
                return o().formErrors?.join(". ");
              }
            }), g(Hs, {
              get open() {
                return d.state === "ready";
              },
              message: `Succesfulluy saved at ${new Date()}`
            }), g(kt, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return d.loading;
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
class Bc extends Error {
  name = "AuthenticationError";
}
var Gc = /* @__PURE__ */ j("<h1>Fail <!>!"), es = /* @__PURE__ */ j("<p>"), zc = /* @__PURE__ */ j("<pre>");
const Fc = (t) => [(() => {
  var e = Gc(), r = e.firstChild, n = r.nextSibling;
  return n.nextSibling, w(e, () => t.moduleName, n), e;
})(), g(_e, {
  get when() {
    return t.error.name;
  },
  get children() {
    var e = es();
    return w(e, () => t.error.name), e;
  }
}), g(_e, {
  get when() {
    return t.error.message;
  },
  get children() {
    var e = es();
    return w(e, () => t.error.message), e;
  }
}), (() => {
  var e = zc();
  return w(e, () => JSON.stringify(t.error, null, 2)), e;
})()];
var Wc = /* @__PURE__ */ j("<sl-tab-group><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel><sl-tab-panel>", !0, !1), Kc = /* @__PURE__ */ j("<main class=app><style data-name=custom></style><div>");
const Jc = (t) => {
  const {
    t: e
  } = ge(), {
    auth: r
  } = qe(), [n, s] = I(), i = at(r), a = () => i()?.isAuthenticated;
  return st(() => {
    const {
      activePanel: o
    } = localStorage, c = n();
    o && c && c.updateComplete.then(() => {
      c.show(o);
    });
  }), is(() => {
  }, (o) => {
    if (o instanceof Bc)
      Xr(o), r.signout();
    else
      throw o;
  }), (() => {
    var o = Kc(), c = o.firstChild, l = c.nextSibling;
    return w(c, Ki), w(l, g(Mc, {
      get title() {
        return t.title;
      }
    }), null), w(l, g(_e, {
      get when() {
        return !a();
      },
      get children() {
        return g(Ac, {
          title: "Login"
        });
      }
    }), null), w(l, g(_e, {
      get when() {
        return a();
      },
      get children() {
        var u = Wc(), d = u.firstChild, _ = d.firstChild, m = d.nextSibling, S = m.firstChild, C = m.nextSibling, L = C.firstChild, $ = C.nextSibling, O = $.nextSibling, U = O.nextSibling;
        return ds((W) => s(W), u), u.addEventListener("sl-tab-show", ({
          detail: W
        }) => {
          localStorage.activePanel = W.name;
        }), u._$owner = D(), z(d, "panel", "account"), d._$owner = D(), z(_, "name", "person-lock"), _._$owner = D(), w(d, () => e("Account"), null), z(m, "panel", "subscription"), m._$owner = D(), z(S, "name", "journal"), S._$owner = D(), w(m, () => e("Subscription"), null), z(C, "panel", "contact"), C._$owner = D(), z(L, "name", "person-hearts"), L._$owner = D(), w(C, () => e("Contact"), null), z($, "name", "account"), $._$owner = D(), w($, g(Vc, {}), null), w($, g(Uc, {}), null), z(O, "name", "subscription"), O._$owner = D(), w(O, g(Qn, {
          get title() {
            return e("Subscription");
          }
        })), z(U, "name", "contact"), U._$owner = D(), w(U, g(Qn, {
          get title() {
            return e("Contact");
          }
        })), u;
      }
    }), null), o;
  })();
}, Yc = (t) => g(Si, {
  fallback: (e) => g(Fc, {
    get moduleName() {
      return t.title;
    },
    error: e
  }),
  get children() {
    return g(aa, {
      get children() {
        return g(hc, {
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
            return g(Jc, {
              get title() {
                return t.title;
              }
            });
          }
        });
      }
    });
  }
}), qc = `.heading{text-align:center}main.app table{margin:auto}
`, Xs = St(), Hc = (t) => {
  console.log({
    props: t
  });
  const e = new As(t.datapoint, t.namespace, t.database), r = new Ds(e, {
    namespace: t.namespace,
    database: t.database,
    scope: ""
  }), n = {
    db: e,
    auth: r
  };
  return te(() => !e.isConnected, async () => {
    await e.connect();
  }), g(Ct, {
    get fallback() {
      return g(Ot, {});
    },
    get children() {
      return [F(() => Ye()), g(Xs.Provider, {
        value: n,
        get children() {
          return t.children;
        }
      })];
    }
  });
}, Xc = () => Ke(Xs);
var Qc = /* @__PURE__ */ j("<main class=app><style data-name=custom></style><section><div class=heading><h1></h1></div><table><caption>Available logins</caption><thead><tr><th>Email</th><th>pass</th></tr></thead><tbody>"), el = /* @__PURE__ */ j("<tr><td></td><td>");
const tl = "demo_accounts", rl = (t) => {
  const {
    db: e
  } = Xc(), [r, n] = I(), [s, i] = gr({
    accounts: {}
  }), a = async () => {
    const c = await (await e.getDb()).select(tl);
    i("accounts", c.reduce((l, u) => ({
      ...l,
      [u.id]: u
    }), {}));
  };
  return te(async () => !0, async () => {
    await e.getDb();
    const o = a();
    n(o);
  }), (() => {
    var o = Qc(), c = o.firstChild, l = c.nextSibling, u = l.firstChild, d = u.firstChild, _ = u.nextSibling, m = _.firstChild, S = m.nextSibling, C = S.nextSibling;
    return w(o, () => Ye(), c), w(c, qc), w(d, () => t.title), w(C, g(us, {
      get each() {
        return Object.values(s.accounts);
      },
      children: (L) => (() => {
        var $ = el(), O = $.firstChild, U = O.nextSibling;
        return w(O, () => L.email), w(U, () => L.pass), $;
      })()
    })), o;
  })();
}, nl = (t) => g(Hc, {
  get namespace() {
    return t.namespace;
  },
  get database() {
    return t.database;
  },
  get datapoint() {
    return t.datapoint;
  },
  get children() {
    return g(rl, {
      get title() {
        return t.title;
      }
    });
  }
});
fs(
  "membership-portal",
  {
    title: "Membership portal",
    datapoint: "wss://localhost:8055/",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  Yc
);
fs(
  "demoaccounts-widget",
  {
    title: "Demo accounts portal",
    datapoint: "wss://localhost:8055/",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  nl
);
