function pl(t) {
  return Object.keys(t).reduce((r, s) => {
    const n = t[s];
    return r[s] = Object.assign({}, n), Ko(n.value) && !yl(n.value) && !Array.isArray(n.value) && (r[s].value = Object.assign({}, n.value)), Array.isArray(n.value) && (r[s].value = n.value.slice(0)), r;
  }, {});
}
function ml(t) {
  return t ? Object.keys(t).reduce((r, s) => {
    const n = t[s];
    return r[s] = Ko(n) && "value" in n ? n : {
      value: n
    }, r[s].attribute || (r[s].attribute = vl(s)), r[s].parse = "parse" in r[s] ? r[s].parse : typeof r[s].value != "string", r;
  }, {}) : {};
}
function gl(t) {
  return Object.keys(t).reduce((r, s) => (r[s] = t[s].value, r), {});
}
function bl(t, e) {
  const r = pl(e);
  return Object.keys(e).forEach((n) => {
    const i = r[n], o = t.getAttribute(i.attribute), a = t[n];
    o && (i.value = i.parse ? qo(o) : o), a != null && (i.value = Array.isArray(a) ? a.slice(0) : a), i.reflect && Ti(t, i.attribute, i.value, !!i.parse), Object.defineProperty(t, n, {
      get() {
        return i.value;
      },
      set(l) {
        const c = i.value;
        i.value = l, i.reflect && Ti(this, i.attribute, i.value, !!i.parse);
        for (let u = 0, d = this.__propertyChangedCallbacks.length; u < d; u++)
          this.__propertyChangedCallbacks[u](n, l, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), r;
}
function qo(t) {
  if (!!t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function Ti(t, e, r, s) {
  if (r == null || r === !1)
    return t.removeAttribute(e);
  let n = s ? JSON.stringify(r) : r;
  t.__updating[e] = !0, n === "true" && (n = ""), t.setAttribute(e, n), Promise.resolve().then(() => delete t.__updating[e]);
}
function vl(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, r) => "-" + r.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Ko(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function yl(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function wl(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let cn;
function _l(t, e) {
  const r = Object.keys(e);
  return class extends t {
    static get observedAttributes() {
      return r.map((n) => e[n].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = bl(this, e);
      const n = gl(this.props), i = this.Component, o = cn;
      try {
        cn = this, this.__initialized = !0, wl(i) ? new i(n, {
          element: this
        }) : i(n, {
          element: this
        });
      } finally {
        cn = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let n = null;
      for (; n = this.__releaseCallbacks.pop(); )
        n(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(n, i, o) {
      if (!!this.__initialized && !this.__updating[n] && (n = this.lookupProp(n), n in e)) {
        if (o == null && !this[n])
          return;
        this[n] = e[n].parse ? qo(o) : o;
      }
    }
    lookupProp(n) {
      if (!!e)
        return r.find((i) => n === i || n === e[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(n) {
      this.__releaseCallbacks.push(n);
    }
    addPropertyChangedCallback(n) {
      this.__propertyChangedCallbacks.push(n);
    }
  };
}
function xl(t, e = {}, r = {}) {
  const {
    BaseElement: s = HTMLElement,
    extension: n,
    customElements: i = window.customElements
  } = r;
  return (o) => {
    if (!t)
      throw new Error("tag is required to register a Component");
    let a = i.get(t);
    return a ? (a.prototype.Component = o, a) : (a = _l(s, ml(e)), a.prototype.Component = o, a.prototype.registeredTag = t, i.define(t, a, n), a);
  };
}
const R = {
  context: void 0,
  registry: void 0,
  done: !1,
  getContextId() {
    return Oi(this.context.count);
  },
  getNextContextId() {
    return Oi(this.context.count++);
  }
};
function Oi(t) {
  const e = String(t), r = e.length - 1;
  return R.context.id + (r ? String.fromCharCode(96 + r) : "") + e;
}
function hr(t) {
  R.context = t;
}
const kl = (t, e) => t === e, Ie = Symbol("solid-proxy"), kn = Symbol("solid-track"), bs = {
  equals: kl
};
let br = null, Yo = ta;
const Ge = 1, vs = 2, Jo = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, un = {};
var V = null;
let Ut = null, Sl = null, Y = null, le = null, _e = null, Ws = 0;
function vr(t, e) {
  const r = Y, s = V, n = t.length === 0, i = e === void 0 ? s : e, o = n ? Jo : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, a = n ? t : () => t(() => Pe(() => qs(o)));
  V = o, Y = null;
  try {
    return ct(a, !0);
  } finally {
    Y = r, V = s;
  }
}
function Z(t, e) {
  e = e ? Object.assign({}, bs, e) : bs;
  const r = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, s = (n) => (typeof n == "function" && (n = n(r.value)), ea(r, n));
  return [Qo.bind(r), s];
}
function Pi(t, e, r) {
  const s = Fr(t, e, !0, Ge);
  tr(s);
}
function be(t, e, r) {
  const s = Fr(t, e, !1, Ge);
  tr(s);
}
function Gs(t, e, r) {
  Yo = Nl;
  const s = Fr(t, e, !1, Ge), n = Ht && er(Ht);
  n && (s.suspense = n), (!r || !r.render) && (s.user = !0), _e ? _e.push(s) : tr(s);
}
function oe(t, e, r) {
  r = r ? Object.assign({}, bs, r) : bs;
  const s = Fr(t, e, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = r.equals || void 0, tr(s), Qo.bind(s);
}
function $l(t) {
  return t && typeof t == "object" && "then" in t;
}
function Oe(t, e, r) {
  let s, n, i;
  arguments.length === 2 && typeof e == "object" || arguments.length === 1 ? (s = !0, n = t, i = e || {}) : (s = t, n = e, i = r || {});
  let o = null, a = un, l = null, c = !1, u = !1, d = "initialValue" in i, m = typeof s == "function" && oe(s);
  const p = /* @__PURE__ */ new Set(), [b, v] = (i.storage || Z)(i.initialValue), [k, x] = Z(void 0), [$, T] = Z(void 0, {
    equals: !1
  }), [M, L] = Z(d ? "ready" : "unresolved");
  R.context && (l = R.getNextContextId(), i.ssrLoadFrom === "initial" ? a = i.initialValue : R.load && R.has(l) && (a = R.load(l)));
  function K(U, F, H, Ae) {
    return o === U && (o = null, Ae !== void 0 && (d = !0), (U === a || F === a) && i.onHydrated && queueMicrotask(
      () => i.onHydrated(Ae, {
        value: F
      })
    ), a = un, $e(F, H)), F;
  }
  function $e(U, F) {
    ct(() => {
      F === void 0 && v(() => U), L(F !== void 0 ? "errored" : d ? "ready" : "unresolved"), x(F);
      for (const H of p.keys())
        H.decrement();
      p.clear();
    }, !1);
  }
  function Ce() {
    const U = Ht && er(Ht), F = b(), H = k();
    if (H !== void 0 && !o)
      throw H;
    return Y && !Y.user && U && Pi(() => {
      $(), o && (U.resolved && Ut && c ? Ut.promises.add(o) : p.has(U) || (U.increment(), p.add(U)));
    }), F;
  }
  function ge(U = !0) {
    if (U !== !1 && u)
      return;
    u = !1;
    const F = m ? m() : s;
    if (c = Ut, F == null || F === !1) {
      K(o, Pe(b));
      return;
    }
    const H = a !== un ? a : Pe(
      () => n(F, {
        value: b(),
        refetching: U
      })
    );
    return $l(H) ? (o = H, "value" in H ? (H.status === "success" ? K(o, H.value, void 0, F) : K(o, void 0, $n(H.value), F), H) : (u = !0, queueMicrotask(() => u = !1), ct(() => {
      L(d ? "refreshing" : "pending"), T();
    }, !1), H.then(
      (Ae) => K(H, Ae, void 0, F),
      (Ae) => K(H, void 0, $n(Ae), F)
    ))) : (K(o, H, void 0, F), H);
  }
  return Object.defineProperties(Ce, {
    state: {
      get: () => M()
    },
    error: {
      get: () => k()
    },
    loading: {
      get() {
        const U = M();
        return U === "pending" || U === "refreshing";
      }
    },
    latest: {
      get() {
        if (!d)
          return Ce();
        const U = k();
        if (U && !o)
          throw U;
        return b();
      }
    }
  }), m ? Pi(() => ge(!1)) : ge(!1), [
    Ce,
    {
      refetch: ge,
      mutate: v
    }
  ];
}
function Cl(t) {
  return ct(t, !1);
}
function Pe(t) {
  if (Y === null)
    return t();
  const e = Y;
  Y = null;
  try {
    return t();
  } finally {
    Y = e;
  }
}
function Jn(t) {
  return V === null || (V.cleanups === null ? V.cleanups = [t] : V.cleanups.push(t)), t;
}
function Xo(t, e) {
  br || (br = Symbol("error")), V = Fr(void 0, void 0, !0), V.context = {
    ...V.context,
    [br]: [e]
  };
  try {
    return t();
  } catch (r) {
    Ks(r);
  } finally {
    V = V.owner;
  }
}
function Sn() {
  return Y;
}
function J() {
  return V;
}
function Al(t) {
  _e.push.apply(_e, t), t.length = 0;
}
function Br(t, e) {
  const r = Symbol("context");
  return {
    id: r,
    Provider: Rl(r),
    defaultValue: t
  };
}
function er(t) {
  let e;
  return V && V.context && (e = V.context[t.id]) !== void 0 ? e : t.defaultValue;
}
function El(t) {
  const e = oe(t), r = oe(() => Cn(e()));
  return r.toArray = () => {
    const s = r();
    return Array.isArray(s) ? s : s != null ? [s] : [];
  }, r;
}
let Ht;
function Tl() {
  return Ht || (Ht = Br());
}
function Qo() {
  if (this.sources && this.state)
    if (this.state === Ge)
      tr(this);
    else {
      const t = le;
      le = null, ct(() => ws(this), !1), le = t;
    }
  if (Y) {
    const t = this.observers ? this.observers.length : 0;
    Y.sources ? (Y.sources.push(this), Y.sourceSlots.push(t)) : (Y.sources = [this], Y.sourceSlots = [t]), this.observers ? (this.observers.push(Y), this.observerSlots.push(Y.sources.length - 1)) : (this.observers = [Y], this.observerSlots = [Y.sources.length - 1]);
  }
  return this.value;
}
function ea(t, e, r) {
  let s = t.value;
  return (!t.comparator || !t.comparator(s, e)) && (t.value = e, t.observers && t.observers.length && ct(() => {
    for (let n = 0; n < t.observers.length; n += 1) {
      const i = t.observers[n], o = Ut && Ut.running;
      o && Ut.disposed.has(i), (o ? !i.tState : !i.state) && (i.pure ? le.push(i) : _e.push(i), i.observers && ra(i)), o || (i.state = Ge);
    }
    if (le.length > 1e6)
      throw le = [], new Error();
  }, !1)), e;
}
function tr(t) {
  if (!t.fn)
    return;
  qs(t);
  const e = Ws;
  Ol(
    t,
    t.value,
    e
  );
}
function Ol(t, e, r) {
  let s;
  const n = V, i = Y;
  Y = V = t;
  try {
    s = t.fn(e);
  } catch (o) {
    return t.pure && (t.state = Ge, t.owned && t.owned.forEach(qs), t.owned = null), t.updatedAt = r + 1, Ks(o);
  } finally {
    Y = i, V = n;
  }
  (!t.updatedAt || t.updatedAt <= r) && (t.updatedAt != null && "observers" in t ? ea(t, s) : t.value = s, t.updatedAt = r);
}
function Fr(t, e, r, s = Ge, n) {
  const i = {
    fn: t,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: V,
    context: V ? V.context : null,
    pure: r
  };
  return V === null || V !== Jo && (V.owned ? V.owned.push(i) : V.owned = [i]), i;
}
function ys(t) {
  if (t.state === 0)
    return;
  if (t.state === vs)
    return ws(t);
  if (t.suspense && Pe(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < Ws); )
    t.state && e.push(t);
  for (let r = e.length - 1; r >= 0; r--)
    if (t = e[r], t.state === Ge)
      tr(t);
    else if (t.state === vs) {
      const s = le;
      le = null, ct(() => ws(t, e[0]), !1), le = s;
    }
}
function ct(t, e) {
  if (le)
    return t();
  let r = !1;
  e || (le = []), _e ? r = !0 : _e = [], Ws++;
  try {
    const s = t();
    return Pl(r), s;
  } catch (s) {
    r || (_e = null), le = null, Ks(s);
  }
}
function Pl(t) {
  if (le && (ta(le), le = null), t)
    return;
  const e = _e;
  _e = null, e.length && ct(() => Yo(e), !1);
}
function ta(t) {
  for (let e = 0; e < t.length; e++)
    ys(t[e]);
}
function Nl(t) {
  let e, r = 0;
  for (e = 0; e < t.length; e++) {
    const s = t[e];
    s.user ? t[r++] = s : ys(s);
  }
  if (R.context) {
    if (R.count) {
      R.effects || (R.effects = []), R.effects.push(...t.slice(0, r));
      return;
    } else
      R.effects && (t = [...R.effects, ...t], r += R.effects.length, delete R.effects);
    hr();
  }
  for (e = 0; e < r; e++)
    ys(t[e]);
}
function ws(t, e) {
  t.state = 0;
  for (let r = 0; r < t.sources.length; r += 1) {
    const s = t.sources[r];
    if (s.sources) {
      const n = s.state;
      n === Ge ? s !== e && (!s.updatedAt || s.updatedAt < Ws) && ys(s) : n === vs && ws(s, e);
    }
  }
}
function ra(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const r = t.observers[e];
    r.state || (r.state = vs, r.pure ? le.push(r) : _e.push(r), r.observers && ra(r));
  }
}
function qs(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const r = t.sources.pop(), s = t.sourceSlots.pop(), n = r.observers;
      if (n && n.length) {
        const i = n.pop(), o = r.observerSlots.pop();
        s < n.length && (i.sourceSlots[o] = s, n[s] = i, r.observerSlots[s] = o);
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--)
      qs(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--)
      t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0;
}
function $n(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function Ni(t, e, r) {
  try {
    for (const s of e)
      s(t);
  } catch (s) {
    Ks(s, r && r.owner || null);
  }
}
function Ks(t, e = V) {
  const r = br && e && e.context && e.context[br], s = $n(t);
  if (!r)
    throw s;
  _e ? _e.push({
    fn() {
      Ni(s, r, e);
    },
    state: Ge
  }) : Ni(s, r, e);
}
function Cn(t) {
  if (typeof t == "function" && !t.length)
    return Cn(t());
  if (Array.isArray(t)) {
    const e = [];
    for (let r = 0; r < t.length; r++) {
      const s = Cn(t[r]);
      Array.isArray(s) ? e.push.apply(e, s) : e.push(s);
    }
    return e;
  }
  return t;
}
function Rl(t, e) {
  return function(s) {
    let n;
    return be(
      () => n = Pe(() => (V.context = {
        ...V.context,
        [t]: s.value
      }, El(() => s.children))),
      void 0
    ), n;
  };
}
const Ll = Symbol("fallback");
function Ri(t) {
  for (let e = 0; e < t.length; e++)
    t[e]();
}
function Il(t, e, r = {}) {
  let s = [], n = [], i = [], o = 0, a = e.length > 1 ? [] : null;
  return Jn(() => Ri(i)), () => {
    let l = t() || [], c = l.length, u, d;
    return l[kn], Pe(() => {
      let p, b, v, k, x, $, T, M, L;
      if (c === 0)
        o !== 0 && (Ri(i), i = [], s = [], n = [], o = 0, a && (a = [])), r.fallback && (s = [Ll], n[0] = vr((K) => (i[0] = K, r.fallback())), o = 1);
      else if (o === 0) {
        for (n = new Array(c), d = 0; d < c; d++)
          s[d] = l[d], n[d] = vr(m);
        o = c;
      } else {
        for (v = new Array(c), k = new Array(c), a && (x = new Array(c)), $ = 0, T = Math.min(o, c); $ < T && s[$] === l[$]; $++)
          ;
        for (T = o - 1, M = c - 1; T >= $ && M >= $ && s[T] === l[M]; T--, M--)
          v[M] = n[T], k[M] = i[T], a && (x[M] = a[T]);
        for (p = /* @__PURE__ */ new Map(), b = new Array(M + 1), d = M; d >= $; d--)
          L = l[d], u = p.get(L), b[d] = u === void 0 ? -1 : u, p.set(L, d);
        for (u = $; u <= T; u++)
          L = s[u], d = p.get(L), d !== void 0 && d !== -1 ? (v[d] = n[u], k[d] = i[u], a && (x[d] = a[u]), d = b[d], p.set(L, d)) : i[u]();
        for (d = $; d < c; d++)
          d in v ? (n[d] = v[d], i[d] = k[d], a && (a[d] = x[d], a[d](d))) : n[d] = vr(m);
        n = n.slice(0, o = c), s = l.slice(0);
      }
      return n;
    });
    function m(p) {
      if (i[d] = p, a) {
        const [b, v] = Z(d);
        return a[d] = v, e(l[d], b);
      }
      return e(l[d]);
    }
  };
}
function _(t, e) {
  return Pe(() => t(e || {}));
}
function Qr() {
  return !0;
}
const An = {
  get(t, e, r) {
    return e === Ie ? r : t.get(e);
  },
  has(t, e) {
    return e === Ie ? !0 : t.has(e);
  },
  set: Qr,
  deleteProperty: Qr,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: Qr,
      deleteProperty: Qr
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function dn(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function Dl() {
  for (let t = 0, e = this.length; t < e; ++t) {
    const r = this[t]();
    if (r !== void 0)
      return r;
  }
}
function Ys(...t) {
  let e = !1;
  for (let o = 0; o < t.length; o++) {
    const a = t[o];
    e = e || !!a && Ie in a, t[o] = typeof a == "function" ? (e = !0, oe(a)) : a;
  }
  if (e)
    return new Proxy(
      {
        get(o) {
          for (let a = t.length - 1; a >= 0; a--) {
            const l = dn(t[a])[o];
            if (l !== void 0)
              return l;
          }
        },
        has(o) {
          for (let a = t.length - 1; a >= 0; a--)
            if (o in dn(t[a]))
              return !0;
          return !1;
        },
        keys() {
          const o = [];
          for (let a = 0; a < t.length; a++)
            o.push(...Object.keys(dn(t[a])));
          return [...new Set(o)];
        }
      },
      An
    );
  const r = {}, s = /* @__PURE__ */ Object.create(null);
  for (let o = t.length - 1; o >= 0; o--) {
    const a = t[o];
    if (!a)
      continue;
    const l = Object.getOwnPropertyNames(a);
    for (let c = l.length - 1; c >= 0; c--) {
      const u = l[c];
      if (u === "__proto__" || u === "constructor")
        continue;
      const d = Object.getOwnPropertyDescriptor(a, u);
      if (!s[u])
        s[u] = d.get ? {
          enumerable: !0,
          configurable: !0,
          get: Dl.bind(r[u] = [d.get.bind(a)])
        } : d.value !== void 0 ? d : void 0;
      else {
        const m = r[u];
        m && (d.get ? m.push(d.get.bind(a)) : d.value !== void 0 && m.push(() => d.value));
      }
    }
  }
  const n = {}, i = Object.keys(s);
  for (let o = i.length - 1; o >= 0; o--) {
    const a = i[o], l = s[a];
    l && l.get ? Object.defineProperty(n, a, l) : n[a] = l ? l.value : void 0;
  }
  return n;
}
function Xn(t, ...e) {
  if (Ie in t) {
    const n = new Set(e.length > 1 ? e.flat() : e[0]), i = e.map((o) => new Proxy(
      {
        get(a) {
          return o.includes(a) ? t[a] : void 0;
        },
        has(a) {
          return o.includes(a) && a in t;
        },
        keys() {
          return o.filter((a) => a in t);
        }
      },
      An
    ));
    return i.push(
      new Proxy(
        {
          get(o) {
            return n.has(o) ? void 0 : t[o];
          },
          has(o) {
            return n.has(o) ? !1 : o in t;
          },
          keys() {
            return Object.keys(t).filter((o) => !n.has(o));
          }
        },
        An
      )
    ), i;
  }
  const r = {}, s = e.map(() => ({}));
  for (const n of Object.getOwnPropertyNames(t)) {
    const i = Object.getOwnPropertyDescriptor(t, n), o = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let a = !1, l = 0;
    for (const c of e)
      c.includes(n) && (a = !0, o ? s[l][n] = i.value : Object.defineProperty(s[l], n, i)), ++l;
    a || (o ? r[n] = i.value : Object.defineProperty(r, n, i));
  }
  return [...s, r];
}
const Ml = (t) => `Stale read from <${t}>.`;
function sa(t) {
  const e = "fallback" in t && {
    fallback: () => t.fallback
  };
  return oe(Il(() => t.each, t.children, e || void 0));
}
function ut(t) {
  const e = t.keyed, r = oe(() => t.when, void 0, {
    equals: (s, n) => e ? s === n : !s == !n
  });
  return oe(
    () => {
      const s = r();
      if (s) {
        const n = t.children;
        return typeof n == "function" && n.length > 0 ? Pe(
          () => n(
            e ? s : () => {
              if (!Pe(r))
                throw Ml("Show");
              return t.when;
            }
          )
        ) : n;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
let es;
function zl(t) {
  let e;
  R.context && R.load && (e = R.load(R.getContextId()));
  const [r, s] = Z(e, void 0);
  return es || (es = /* @__PURE__ */ new Set()), es.add(s), Jn(() => es.delete(s)), oe(
    () => {
      let n;
      if (n = r()) {
        const i = t.fallback;
        return typeof i == "function" && i.length ? Pe(() => i(n, () => s())) : i;
      }
      return Xo(() => t.children, s);
    },
    void 0,
    void 0
  );
}
const jl = /* @__PURE__ */ Br();
function Zr(t) {
  let e = 0, r, s, n, i, o;
  const [a, l] = Z(!1), c = Tl(), u = {
    increment: () => {
      ++e === 1 && l(!0);
    },
    decrement: () => {
      --e === 0 && l(!1);
    },
    inFallback: a,
    effects: [],
    resolved: !1
  }, d = J();
  if (R.context && R.load) {
    const b = R.getContextId();
    let v = R.load(b);
    if (v && (typeof v != "object" || v.status !== "success" ? n = v : R.gather(b)), n && n !== "$$f") {
      const [k, x] = Z(void 0, {
        equals: !1
      });
      i = k, n.then(
        () => {
          if (R.done)
            return x();
          R.gather(b), hr(s), x(), hr();
        },
        ($) => {
          o = $, x();
        }
      );
    }
  }
  const m = er(jl);
  m && (r = m.register(u.inFallback));
  let p;
  return Jn(() => p && p()), _(c.Provider, {
    value: u,
    get children() {
      return oe(() => {
        if (o)
          throw o;
        if (s = R.context, i)
          return i(), i = void 0;
        s && n === "$$f" && hr();
        const b = oe(() => t.children);
        return oe((v) => {
          const k = u.inFallback(), { showContent: x = !0, showFallback: $ = !0 } = r ? r() : {};
          if ((!k || n && n !== "$$f") && x)
            return u.resolved = !0, p && p(), p = s = n = void 0, Al(u.effects), b();
          if (!!$)
            return p ? v : vr((T) => (p = T, s && (hr({
              id: s.id + "F",
              count: 0
            }), s = void 0), t.fallback), d);
        });
      });
    }
  });
}
const Ul = [
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
], Vl = /* @__PURE__ */ new Set([
  "className",
  "value",
  "readOnly",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  ...Ul
]), Bl = /* @__PURE__ */ new Set([
  "innerHTML",
  "textContent",
  "innerText",
  "children"
]), Fl = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Zl = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function Hl(t, e) {
  const r = Zl[t];
  return typeof r == "object" ? r[e] ? r.$ : void 0 : r;
}
const Wl = /* @__PURE__ */ new Set([
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
]), Gl = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function ql(t, e, r) {
  let s = r.length, n = e.length, i = s, o = 0, a = 0, l = e[n - 1].nextSibling, c = null;
  for (; o < n || a < i; ) {
    if (e[o] === r[a]) {
      o++, a++;
      continue;
    }
    for (; e[n - 1] === r[i - 1]; )
      n--, i--;
    if (n === o) {
      const u = i < s ? a ? r[a - 1].nextSibling : r[i - a] : l;
      for (; a < i; )
        t.insertBefore(r[a++], u);
    } else if (i === a)
      for (; o < n; )
        (!c || !c.has(e[o])) && e[o].remove(), o++;
    else if (e[o] === r[i - 1] && r[a] === e[n - 1]) {
      const u = e[--n].nextSibling;
      t.insertBefore(r[a++], e[o++].nextSibling), t.insertBefore(r[--i], u), e[n] = r[i];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let d = a;
        for (; d < i; )
          c.set(r[d], d++);
      }
      const u = c.get(e[o]);
      if (u != null)
        if (a < u && u < i) {
          let d = o, m = 1, p;
          for (; ++d < n && d < i && !((p = c.get(e[d])) == null || p !== u + m); )
            m++;
          if (m > u - a) {
            const b = e[o];
            for (; a < u; )
              t.insertBefore(r[a++], b);
          } else
            t.replaceChild(r[a++], e[o++]);
        } else
          o++;
      else
        e[o++].remove();
    }
  }
}
const Li = "_$DX_DELEGATE";
function G(t, e, r) {
  let s;
  const n = () => {
    const o = document.createElement("template");
    return o.innerHTML = t, r ? o.content.firstChild.firstChild : o.content.firstChild;
  }, i = e ? () => Pe(() => document.importNode(s || (s = n()), !0)) : () => (s || (s = n())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function Kl(t, e = window.document) {
  const r = e[Li] || (e[Li] = /* @__PURE__ */ new Set());
  for (let s = 0, n = t.length; s < n; s++) {
    const i = t[s];
    r.has(i) || (r.add(i), e.addEventListener(i, sc));
  }
}
function ne(t, e, r) {
  Hr(t) || (r == null ? t.removeAttribute(e) : t.setAttribute(e, r));
}
function Yl(t, e, r, s) {
  Hr(t) || (s == null ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, s));
}
function Jl(t, e) {
  Hr(t) || (e == null ? t.removeAttribute("class") : t.className = e);
}
function Xl(t, e, r, s) {
  if (s)
    Array.isArray(r) ? (t[`$$${e}`] = r[0], t[`$$${e}Data`] = r[1]) : t[`$$${e}`] = r;
  else if (Array.isArray(r)) {
    const n = r[0];
    t.addEventListener(e, r[0] = (i) => n.call(t, r[1], i));
  } else
    t.addEventListener(e, r);
}
function Ql(t, e, r = {}) {
  const s = Object.keys(e || {}), n = Object.keys(r);
  let i, o;
  for (i = 0, o = n.length; i < o; i++) {
    const a = n[i];
    !a || a === "undefined" || e[a] || (Ii(t, a, !1), delete r[a]);
  }
  for (i = 0, o = s.length; i < o; i++) {
    const a = s[i], l = !!e[a];
    !a || a === "undefined" || r[a] === l || !l || (Ii(t, a, !0), r[a] = l);
  }
  return r;
}
function ec(t, e, r) {
  if (!e)
    return r ? ne(t, "style") : e;
  const s = t.style;
  if (typeof e == "string")
    return s.cssText = e;
  typeof r == "string" && (s.cssText = r = void 0), r || (r = {}), e || (e = {});
  let n, i;
  for (i in r)
    e[i] == null && s.removeProperty(i), delete r[i];
  for (i in e)
    n = e[i], n !== r[i] && (s.setProperty(i, n), r[i] = n);
  return r;
}
function Qn(t, e = {}, r, s) {
  const n = {};
  return s || be(
    () => n.children = Wt(t, e.children, n.children)
  ), be(() => typeof e.ref == "function" && na(e.ref, t)), be(() => tc(t, e, r, !0, n, !0)), n;
}
function na(t, e, r) {
  return Pe(() => t(e, r));
}
function E(t, e, r, s) {
  if (r !== void 0 && !s && (s = []), typeof e != "function")
    return Wt(t, e, s, r);
  be((n) => Wt(t, e(), n, r), s);
}
function tc(t, e, r, s, n = {}, i = !1) {
  e || (e = {});
  for (const o in n)
    if (!(o in e)) {
      if (o === "children")
        continue;
      n[o] = Di(t, o, null, n[o], r, i);
    }
  for (const o in e) {
    if (o === "children") {
      s || Wt(t, e.children);
      continue;
    }
    const a = e[o];
    n[o] = Di(t, o, a, n[o], r, i);
  }
}
function Hr(t) {
  return !!R.context && !R.done && (!t || t.isConnected);
}
function rc(t) {
  return t.toLowerCase().replace(/-([a-z])/g, (e, r) => r.toUpperCase());
}
function Ii(t, e, r) {
  const s = e.trim().split(/\s+/);
  for (let n = 0, i = s.length; n < i; n++)
    t.classList.toggle(s[n], r);
}
function Di(t, e, r, s, n, i) {
  let o, a, l, c, u;
  if (e === "style")
    return ec(t, r, s);
  if (e === "classList")
    return Ql(t, r, s);
  if (r === s)
    return s;
  if (e === "ref")
    i || r(t);
  else if (e.slice(0, 3) === "on:") {
    const d = e.slice(3);
    s && t.removeEventListener(d, s), r && t.addEventListener(d, r);
  } else if (e.slice(0, 10) === "oncapture:") {
    const d = e.slice(10);
    s && t.removeEventListener(d, s, !0), r && t.addEventListener(d, r, !0);
  } else if (e.slice(0, 2) === "on") {
    const d = e.slice(2).toLowerCase(), m = Wl.has(d);
    if (!m && s) {
      const p = Array.isArray(s) ? s[0] : s;
      t.removeEventListener(d, p);
    }
    (m || r) && (Xl(t, d, r, m), m && Kl([d]));
  } else if (e.slice(0, 5) === "attr:")
    ne(t, e.slice(5), r);
  else if ((u = e.slice(0, 5) === "prop:") || (l = Bl.has(e)) || !n && ((c = Hl(e, t.tagName)) || (a = Vl.has(e))) || (o = t.nodeName.includes("-"))) {
    if (u)
      e = e.slice(5), a = !0;
    else if (Hr(t))
      return r;
    e === "class" || e === "className" ? Jl(t, r) : o && !a && !l ? t[rc(e)] = r : t[c || e] = r;
  } else {
    const d = n && e.indexOf(":") > -1 && Gl[e.split(":")[0]];
    d ? Yl(t, d, e, r) : ne(t, Fl[e] || e, r);
  }
  return r;
}
function sc(t) {
  if (R.registry && R.events && R.events.find(([s, n]) => n === t))
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
  }), R.registry && !R.done && (R.done = _$HY.done = !0); r; ) {
    const s = r[e];
    if (s && !r.disabled) {
      const n = r[`${e}Data`];
      if (n !== void 0 ? s.call(r, n, t) : s.call(r, t), t.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function Wt(t, e, r, s, n) {
  const i = Hr(t);
  if (i) {
    !r && (r = [...t.childNodes]);
    let l = [];
    for (let c = 0; c < r.length; c++) {
      const u = r[c];
      u.nodeType === 8 && u.data.slice(0, 2) === "!$" ? u.remove() : l.push(u);
    }
    r = l;
  }
  for (; typeof r == "function"; )
    r = r();
  if (e === r)
    return r;
  const o = typeof e, a = s !== void 0;
  if (t = a && r[0] && r[0].parentNode || t, o === "string" || o === "number") {
    if (i || o === "number" && (e = e.toString(), e === r))
      return r;
    if (a) {
      let l = r[0];
      l && l.nodeType === 3 ? l.data !== e && (l.data = e) : l = document.createTextNode(e), r = Rt(t, r, s, l);
    } else
      r !== "" && typeof r == "string" ? r = t.firstChild.data = e : r = t.textContent = e;
  } else if (e == null || o === "boolean") {
    if (i)
      return r;
    r = Rt(t, r, s);
  } else {
    if (o === "function")
      return be(() => {
        let l = e();
        for (; typeof l == "function"; )
          l = l();
        r = Wt(t, l, r, s);
      }), () => r;
    if (Array.isArray(e)) {
      const l = [], c = r && Array.isArray(r);
      if (En(l, e, r, n))
        return be(() => r = Wt(t, l, r, s, !0)), () => r;
      if (i) {
        if (!l.length)
          return r;
        if (s === void 0)
          return r = [...t.childNodes];
        let u = l[0];
        if (u.parentNode !== t)
          return r;
        const d = [u];
        for (; (u = u.nextSibling) !== s; )
          d.push(u);
        return r = d;
      }
      if (l.length === 0) {
        if (r = Rt(t, r, s), a)
          return r;
      } else
        c ? r.length === 0 ? Mi(t, l, s) : ql(t, r, l) : (r && Rt(t), Mi(t, l));
      r = l;
    } else if (e.nodeType) {
      if (i && e.parentNode)
        return r = a ? [e] : e;
      if (Array.isArray(r)) {
        if (a)
          return r = Rt(t, r, s, e);
        Rt(t, r, null, e);
      } else
        r == null || r === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      r = e;
    }
  }
  return r;
}
function En(t, e, r, s) {
  let n = !1;
  for (let i = 0, o = e.length; i < o; i++) {
    let a = e[i], l = r && r[t.length], c;
    if (!(a == null || a === !0 || a === !1))
      if ((c = typeof a) == "object" && a.nodeType)
        t.push(a);
      else if (Array.isArray(a))
        n = En(t, a, l) || n;
      else if (c === "function")
        if (s) {
          for (; typeof a == "function"; )
            a = a();
          n = En(
            t,
            Array.isArray(a) ? a : [a],
            Array.isArray(l) ? l : [l]
          ) || n;
        } else
          t.push(a), n = !0;
      else {
        const u = String(a);
        l && l.nodeType === 3 && l.data === u ? t.push(l) : t.push(document.createTextNode(u));
      }
  }
  return n;
}
function Mi(t, e, r = null) {
  for (let s = 0, n = e.length; s < n; s++)
    t.insertBefore(e[s], r);
}
function Rt(t, e, r, s) {
  if (r === void 0)
    return t.textContent = "";
  const n = s || document.createTextNode("");
  if (e.length) {
    let i = !1;
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o];
      if (n !== a) {
        const l = a.parentNode === t;
        !i && !o ? l ? t.replaceChild(n, a) : t.insertBefore(n, r) : l && a.remove();
      } else
        i = !0;
    }
  } else
    t.insertBefore(n, r);
  return [n];
}
function nc(t) {
  const e = Object.keys(t), r = {};
  for (let s = 0; s < e.length; s++) {
    const [n, i] = Z(t[e[s]]);
    Object.defineProperty(r, e[s], {
      get: n,
      set(o) {
        i(() => o);
      }
    });
  }
  return r;
}
function ic(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function oc(t) {
  return (e, r) => {
    const { element: s } = r;
    return vr((n) => {
      const i = nc(e);
      s.addPropertyChangedCallback((a, l) => i[a] = l), s.addReleaseCallback(() => {
        s.renderRoot.textContent = "", n();
      });
      const o = t(i, r);
      return E(s.renderRoot, o);
    }, ic(s));
  };
}
function ia(t, e, r) {
  return arguments.length === 2 && (r = e, e = {}), xl(t, e)(oc(r));
}
var Tn = "";
function On(t) {
  Tn = t;
}
function ac(t = "") {
  if (!Tn) {
    const e = [...document.getElementsByTagName("script")], r = e.find((s) => s.hasAttribute("data-shoelace"));
    if (r)
      On(r.getAttribute("data-shoelace"));
    else {
      const s = e.find((i) => /shoelace(\.min)?\.js($|\?)/.test(i.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(i.src));
      let n = "";
      s && (n = s.getAttribute("src")), On(n.split("/").slice(0, -1).join("/"));
    }
  }
  return Tn.replace(/\/$/, "") + (t ? `/${t.replace(/^\//, "")}` : "");
}
var lc = {
  name: "default",
  resolver: (t) => ac(`assets/icons/${t}.svg`)
}, cc = lc, zi = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
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
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
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
}, uc = {
  name: "system",
  resolver: (t) => t in zi ? `data:image/svg+xml,${encodeURIComponent(zi[t])}` : ""
}, dc = uc, hc = [cc, dc], Pn = [];
function fc(t) {
  Pn.push(t);
}
function pc(t) {
  Pn = Pn.filter((e) => e !== t);
}
function ji(t) {
  return hc.find((e) => e.name === t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const is = globalThis, ei = is.ShadowRoot && (is.ShadyCSS === void 0 || is.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ti = Symbol(), Ui = /* @__PURE__ */ new WeakMap();
class oa {
  constructor(e, r, s) {
    if (this._$cssResult$ = !0, s !== ti)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (ei && e === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (e = Ui.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ui.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const mc = (t) => new oa(typeof t == "string" ? t : t + "", void 0, ti), ue = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((s, n, i) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[i + 1], t[0]);
  return new oa(r, t, ti);
}, gc = (t, e) => {
  if (ei)
    t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else
    for (const r of e) {
      const s = document.createElement("style"), n = is.litNonce;
      n !== void 0 && s.setAttribute("nonce", n), s.textContent = r.cssText, t.appendChild(s);
    }
}, Vi = ei ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const s of e.cssRules)
    r += s.cssText;
  return mc(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bc, defineProperty: vc, getOwnPropertyDescriptor: yc, getOwnPropertyNames: wc, getOwnPropertySymbols: _c, getPrototypeOf: xc } = Object, Js = globalThis, Bi = Js.trustedTypes, kc = Bi ? Bi.emptyScript : "", Sc = Js.reactiveElementPolyfillSupport, yr = (t, e) => t, Gt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? kc : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, ri = (t, e) => !bc(t, e), Fi = { attribute: !0, type: String, converter: Gt, reflect: !1, hasChanged: ri };
Symbol.metadata ??= Symbol("metadata"), Js.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class It extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Fi) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.elementProperties.set(e, r), !r.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, r);
      n !== void 0 && vc(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, s) {
    const { get: n, set: i } = yc(this.prototype, e) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get() {
      return n?.call(this);
    }, set(o) {
      const a = n?.call(this);
      i.call(this, o), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Fi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(yr("elementProperties")))
      return;
    const e = xc(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(yr("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(yr("properties"))) {
      const r = this.properties, s = [...wc(r), ..._c(r)];
      for (const n of s)
        this.createProperty(n, r[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0)
        for (const [s, n] of r)
          this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, s] of this.elementProperties) {
      const n = this._$Eu(r, s);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s)
        r.unshift(Vi(n));
    } else
      e !== void 0 && r.push(Vi(e));
    return r;
  }
  static _$Eu(e, r) {
    const s = r.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const s of r.keys())
      this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return gc(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, r, s) {
    this._$AK(e, s);
  }
  _$EC(e, r) {
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : Gt).toAttribute(r, s.type);
      this._$Em = e, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(e, r) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const i = s.getPropertyOptions(n), o = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Gt;
      this._$Em = n, this[n] = o.fromAttribute(r, i.type), this._$Em = null;
    }
  }
  requestUpdate(e, r, s) {
    if (e !== void 0) {
      if (s ??= this.constructor.getPropertyOptions(e), !(s.hasChanged ?? ri)(this[e], r))
        return;
      this.P(e, r, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, r, s) {
    this._$AL.has(e) || this._$AL.set(e, r), s.reflect === !0 && this._$Em !== e && (this._$Ej ??= /* @__PURE__ */ new Set()).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, i] of this._$Ep)
          this[n] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0)
        for (const [n, i] of s)
          i.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.P(n, this[n], i);
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(r)) : this._$EU();
    } catch (s) {
      throw e = !1, this._$EU(), s;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej &&= this._$Ej.forEach((r) => this._$EC(r, this[r])), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
It.elementStyles = [], It.shadowRootOptions = { mode: "open" }, It[yr("elementProperties")] = /* @__PURE__ */ new Map(), It[yr("finalized")] = /* @__PURE__ */ new Map(), Sc?.({ ReactiveElement: It }), (Js.reactiveElementVersions ??= []).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const si = globalThis, _s = si.trustedTypes, Zi = _s ? _s.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, aa = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, la = "?" + ot, $c = `<${la}>`, St = document, _r = () => St.createComment(""), xr = (t) => t === null || typeof t != "object" && typeof t != "function", ni = Array.isArray, Cc = (t) => ni(t) || typeof t?.[Symbol.iterator] == "function", hn = `[ 	
\f\r]`, ar = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Hi = /-->/g, Wi = />/g, yt = RegExp(`>|${hn}(?:([^\\s"'>=/]+)(${hn}*=${hn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gi = /'/g, qi = /"/g, ca = /^(?:script|style|textarea|title)$/i, Ac = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), z = Ac(1), Te = Symbol.for("lit-noChange"), te = Symbol.for("lit-nothing"), Ki = /* @__PURE__ */ new WeakMap(), xt = St.createTreeWalker(St, 129);
function ua(t, e) {
  if (!ni(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Zi !== void 0 ? Zi.createHTML(e) : e;
}
const Ec = (t, e) => {
  const r = t.length - 1, s = [];
  let n, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = ar;
  for (let a = 0; a < r; a++) {
    const l = t[a];
    let c, u, d = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, u = o.exec(l), u !== null); )
      m = o.lastIndex, o === ar ? u[1] === "!--" ? o = Hi : u[1] !== void 0 ? o = Wi : u[2] !== void 0 ? (ca.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = yt) : u[3] !== void 0 && (o = yt) : o === yt ? u[0] === ">" ? (o = n ?? ar, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? yt : u[3] === '"' ? qi : Gi) : o === qi || o === Gi ? o = yt : o === Hi || o === Wi ? o = ar : (o = yt, n = void 0);
    const p = o === yt && t[a + 1].startsWith("/>") ? " " : "";
    i += o === ar ? l + $c : d >= 0 ? (s.push(c), l.slice(0, d) + aa + l.slice(d) + ot + p) : l + ot + (d === -2 ? a : p);
  }
  return [ua(t, i + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class kr {
  constructor({ strings: e, _$litType$: r }, s) {
    let n;
    this.parts = [];
    let i = 0, o = 0;
    const a = e.length - 1, l = this.parts, [c, u] = Ec(e, r);
    if (this.el = kr.createElement(c, s), xt.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = xt.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(aa)) {
              const m = u[o++], p = n.getAttribute(d).split(ot), b = /([.?@])?(.*)/.exec(m);
              l.push({ type: 1, index: i, name: b[2], strings: p, ctor: b[1] === "." ? Oc : b[1] === "?" ? Pc : b[1] === "@" ? Nc : Xs }), n.removeAttribute(d);
            } else
              d.startsWith(ot) && (l.push({ type: 6, index: i }), n.removeAttribute(d));
        if (ca.test(n.tagName)) {
          const d = n.textContent.split(ot), m = d.length - 1;
          if (m > 0) {
            n.textContent = _s ? _s.emptyScript : "";
            for (let p = 0; p < m; p++)
              n.append(d[p], _r()), xt.nextNode(), l.push({ type: 2, index: ++i });
            n.append(d[m], _r());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === la)
          l.push({ type: 2, index: i });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(ot, d + 1)) !== -1; )
            l.push({ type: 7, index: i }), d += ot.length - 1;
        }
      i++;
    }
  }
  static createElement(e, r) {
    const s = St.createElement("template");
    return s.innerHTML = e, s;
  }
}
function qt(t, e, r = t, s) {
  if (e === Te)
    return e;
  let n = s !== void 0 ? r.o?.[s] : r.l;
  const i = xr(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== i && (n?._$AO?.(!1), i === void 0 ? n = void 0 : (n = new i(t), n._$AT(t, r, s)), s !== void 0 ? (r.o ??= [])[s] = n : r.l = n), n !== void 0 && (e = qt(t, n._$AS(t, e.values), n, s)), e;
}
class Tc {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: s } = this._$AD, n = (e?.creationScope ?? St).importNode(r, !0);
    xt.currentNode = n;
    let i = xt.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Wr(i, i.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (c = new Rc(i, this, e)), this._$AV.push(c), l = s[++a];
      }
      o !== l?.index && (i = xt.nextNode(), o++);
    }
    return xt.currentNode = St, n;
  }
  p(e) {
    let r = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, r), r += s.strings.length - 2) : s._$AI(e[r])), r++;
  }
}
class Wr {
  get _$AU() {
    return this._$AM?._$AU ?? this.v;
  }
  constructor(e, r, s, n) {
    this.type = 2, this._$AH = te, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = s, this.options = n, this.v = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && e?.nodeType === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = qt(this, e, r), xr(e) ? e === te || e == null || e === "" ? (this._$AH !== te && this._$AR(), this._$AH = te) : e !== this._$AH && e !== Te && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Cc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== te && xr(this._$AH) ? this._$AA.nextSibling.data = e : this.T(St.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: r, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = kr.createElement(ua(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n)
      this._$AH.p(r);
    else {
      const i = new Tc(n, this), o = i.u(this.options);
      i.p(r), this.T(o), this._$AH = i;
    }
  }
  _$AC(e) {
    let r = Ki.get(e.strings);
    return r === void 0 && Ki.set(e.strings, r = new kr(e)), r;
  }
  k(e) {
    ni(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let s, n = 0;
    for (const i of e)
      n === r.length ? r.push(s = new Wr(this.O(_r()), this.O(_r()), this, this.options)) : s = r[n], s._$AI(i), n++;
    n < r.length && (this._$AR(s && s._$AB.nextSibling, n), r.length = n);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this.v = e, this._$AP?.(e));
  }
}
class Xs {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, s, n, i) {
    this.type = 1, this._$AH = te, this._$AN = void 0, this.element = e, this.name = r, this._$AM = n, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = te;
  }
  _$AI(e, r = this, s, n) {
    const i = this.strings;
    let o = !1;
    if (i === void 0)
      e = qt(this, e, r, 0), o = !xr(e) || e !== this._$AH && e !== Te, o && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = i[0], l = 0; l < i.length - 1; l++)
        c = qt(this, a[s + l], r, l), c === Te && (c = this._$AH[l]), o ||= !xr(c) || c !== this._$AH[l], c === te ? e = te : e !== te && (e += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === te ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Oc extends Xs {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === te ? void 0 : e;
  }
}
class Pc extends Xs {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== te);
  }
}
class Nc extends Xs {
  constructor(e, r, s, n, i) {
    super(e, r, s, n, i), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = qt(this, e, r, 0) ?? te) === Te)
      return;
    const s = this._$AH, n = e === te && s !== te || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, i = e !== te && (s === te || n);
    n && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Rc {
  constructor(e, r, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    qt(this, e);
  }
}
const Lc = si.litHtmlPolyfillSupport;
Lc?.(kr, Wr), (si.litHtmlVersions ??= []).push("3.2.0");
const Ic = (t, e, r) => {
  const s = r?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const i = r?.renderBefore ?? null;
    s._$litPart$ = n = new Wr(e.insertBefore(_r(), i), i, void 0, r ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class wr extends It {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.o = Ic(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this.o?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.o?.setConnected(!1);
  }
  render() {
    return Te;
  }
}
wr._$litElement$ = !0, wr.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: wr });
const Dc = globalThis.litElementPolyfillSupport;
Dc?.({ LitElement: wr });
(globalThis.litElementVersions ??= []).push("4.1.0");
var Mc = ue`
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
`, da = Object.defineProperty, zc = Object.defineProperties, jc = Object.getOwnPropertyDescriptor, Uc = Object.getOwnPropertyDescriptors, Yi = Object.getOwnPropertySymbols, Vc = Object.prototype.hasOwnProperty, Bc = Object.prototype.propertyIsEnumerable, Ji = (t, e, r) => e in t ? da(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, vt = (t, e) => {
  for (var r in e || (e = {}))
    Vc.call(e, r) && Ji(t, r, e[r]);
  if (Yi)
    for (var r of Yi(e))
      Bc.call(e, r) && Ji(t, r, e[r]);
  return t;
}, Qs = (t, e) => zc(t, Uc(e)), h = (t, e, r, s) => {
  for (var n = s > 1 ? void 0 : s ? jc(e, r) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (n = (s ? o(e, r, n) : o(n)) || n);
  return s && n && da(e, r, n), n;
};
function re(t, e) {
  const r = vt({
    waitUntilFirstUpdate: !1
  }, e);
  return (s, n) => {
    const { update: i } = s, o = Array.isArray(t) ? t : [t];
    s.update = function(a) {
      o.forEach((l) => {
        const c = l;
        if (a.has(c)) {
          const u = a.get(c), d = this[c];
          u !== d && (!r.waitUntilFirstUpdate || this.hasUpdated) && this[n](u, d);
        }
      }), i.call(this, a);
    };
  };
}
var ve = ue`
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
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fc = { attribute: !0, type: String, converter: Gt, reflect: !1, hasChanged: ri }, Zc = (t = Fc, e, r) => {
  const { kind: s, metadata: n } = r;
  let i = globalThis.litPropertyMetadata.get(n);
  if (i === void 0 && globalThis.litPropertyMetadata.set(n, i = /* @__PURE__ */ new Map()), i.set(r.name, t), s === "accessor") {
    const { name: o } = r;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, t);
    }, init(a) {
      return a !== void 0 && this.P(o, void 0, t), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = r;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function f(t) {
  return (e, r) => typeof r == "object" ? Zc(t, e, r) : ((s, n, i) => {
    const o = n.hasOwnProperty(i);
    return n.constructor.createProperty(i, o ? { ...s, wrapped: !0 } : s), o ? Object.getOwnPropertyDescriptor(n, i) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ye(t) {
  return f({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xi = (t, e, r) => (r.configurable = !0, r.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, r), r);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ae(t, e) {
  return (r, s, n) => {
    const i = (o) => o.renderRoot?.querySelector(t) ?? null;
    if (e) {
      const { get: o, set: a } = typeof s == "object" ? r : n ?? (() => {
        const l = Symbol();
        return { get() {
          return this[l];
        }, set(c) {
          this[l] = c;
        } };
      })();
      return Xi(r, s, { get() {
        let l = o.call(this);
        return l === void 0 && (l = i(this), (l !== null || this.hasUpdated) && a.call(this, l)), l;
      } });
    }
    return Xi(r, s, { get() {
      return i(this);
    } });
  };
}
var ie = class extends wr {
  constructor() {
    super(), Object.entries(this.constructor.dependencies).forEach(([t, e]) => {
      this.constructor.define(t, e);
    });
  }
  emit(t, e) {
    const r = new CustomEvent(t, vt({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, e));
    return this.dispatchEvent(r), r;
  }
  static define(t, e = this, r = {}) {
    const s = customElements.get(t);
    if (!s) {
      try {
        customElements.define(t, e, r);
      } catch {
        customElements.define(t, class extends e {
        }, r);
      }
      return;
    }
    let n = " (unknown version)", i = n;
    "version" in e && e.version && (n = " v" + e.version), "version" in s && s.version && (i = " v" + s.version), !(n && i && n === i) && console.warn(
      `Attempted to register <${t}>${n}, but <${t}>${i} has already been registered.`
    );
  }
};
ie.version = "2.16.0";
ie.dependencies = {};
h([
  f()
], ie.prototype, "dir", 2);
h([
  f()
], ie.prototype, "lang", 2);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hc = (t, e) => e === void 0 ? t?._$litType$ !== void 0 : t?._$litType$ === e, Wc = (t) => t.strings === void 0, Gc = {}, qc = (t, e = Gc) => t._$AH = e;
var lr = Symbol(), ts = Symbol(), fn, pn = /* @__PURE__ */ new Map(), me = class extends ie {
  constructor() {
    super(...arguments), this.initialRender = !1, this.svg = null, this.label = "", this.library = "default";
  }
  async resolveIcon(t, e) {
    var r;
    let s;
    if (e?.spriteSheet) {
      this.svg = z`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`, await this.updateComplete;
      const n = this.shadowRoot.querySelector("[part='svg']");
      return typeof e.mutator == "function" && e.mutator(n), this.svg;
    }
    try {
      if (s = await fetch(t, { mode: "cors" }), !s.ok)
        return s.status === 410 ? lr : ts;
    } catch {
      return ts;
    }
    try {
      const n = document.createElement("div");
      n.innerHTML = await s.text();
      const i = n.firstElementChild;
      if (((r = i?.tagName) == null ? void 0 : r.toLowerCase()) !== "svg")
        return lr;
      fn || (fn = new DOMParser());
      const a = fn.parseFromString(i.outerHTML, "text/html").body.querySelector("svg");
      return a ? (a.part.add("svg"), document.adoptNode(a)) : lr;
    } catch {
      return lr;
    }
  }
  connectedCallback() {
    super.connectedCallback(), fc(this);
  }
  firstUpdated() {
    this.initialRender = !0, this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), pc(this);
  }
  getIconSource() {
    const t = ji(this.library);
    return this.name && t ? {
      url: t.resolver(this.name),
      fromLibrary: !0
    } : {
      url: this.src,
      fromLibrary: !1
    };
  }
  handleLabelChange() {
    typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
  }
  async setIcon() {
    var t;
    const { url: e, fromLibrary: r } = this.getIconSource(), s = r ? ji(this.library) : void 0;
    if (!e) {
      this.svg = null;
      return;
    }
    let n = pn.get(e);
    if (n || (n = this.resolveIcon(e, s), pn.set(e, n)), !this.initialRender)
      return;
    const i = await n;
    if (i === ts && pn.delete(e), e === this.getIconSource().url) {
      if (Hc(i)) {
        this.svg = i;
        return;
      }
      switch (i) {
        case ts:
        case lr:
          this.svg = null, this.emit("sl-error");
          break;
        default:
          this.svg = i.cloneNode(!0), (t = s?.mutator) == null || t.call(s, this.svg), this.emit("sl-load");
      }
    }
  }
  render() {
    return this.svg;
  }
};
me.styles = [ve, Mc];
h([
  ye()
], me.prototype, "svg", 2);
h([
  f({ reflect: !0 })
], me.prototype, "name", 2);
h([
  f()
], me.prototype, "src", 2);
h([
  f()
], me.prototype, "label", 2);
h([
  f({ reflect: !0 })
], me.prototype, "library", 2);
h([
  re("label")
], me.prototype, "handleLabelChange", 1);
h([
  re(["name", "src", "library"])
], me.prototype, "setIcon", 1);
me.define("sl-icon");
var Kc = ue`
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
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ii = (t) => (...e) => ({ _$litDirective$: t, values: e });
class oi {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, r, s) {
    this.t = e, this._$AM = r, this.i = s;
  }
  _$AS(e, r) {
    return this.update(e, r);
  }
  update(e, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = ii(class extends oi {
  constructor(t) {
    if (super(t), t.type !== it.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((s) => s !== "")));
      for (const s in e)
        e[s] && !this.nt?.has(s) && this.st.add(s);
      return this.render(e);
    }
    const r = t.element.classList;
    for (const s of this.st)
      s in e || (r.remove(s), this.st.delete(s));
    for (const s in e) {
      const n = !!e[s];
      n === this.st.has(s) || this.nt?.has(s) || (n ? (r.add(s), this.st.add(s)) : (r.remove(s), this.st.delete(s)));
    }
    return Te;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ha = Symbol.for(""), Yc = (t) => {
  if (t?.r === ha)
    return t?._$litStatic$;
}, xs = (t, ...e) => ({ _$litStatic$: e.reduce((r, s, n) => r + ((i) => {
  if (i._$litStatic$ !== void 0)
    return i._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(s) + t[n + 1], t[0]), r: ha }), Qi = /* @__PURE__ */ new Map(), Jc = (t) => (e, ...r) => {
  const s = r.length;
  let n, i;
  const o = [], a = [];
  let l, c = 0, u = !1;
  for (; c < s; ) {
    for (l = e[c]; c < s && (i = r[c], (n = Yc(i)) !== void 0); )
      l += n + e[++c], u = !0;
    c !== s && a.push(i), o.push(l), c++;
  }
  if (c === s && o.push(e[s]), u) {
    const d = o.join("$$lit$$");
    (e = Qi.get(d)) === void 0 && (o.raw = o, Qi.set(d, e = o)), r = a;
  }
  return t(e, ...r);
}, os = Jc(z);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = (t) => t ?? te;
var de = class extends ie {
  constructor() {
    super(...arguments), this.hasFocus = !1, this.label = "", this.disabled = !1;
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleClick(t) {
    this.disabled && (t.preventDefault(), t.stopPropagation());
  }
  click() {
    this.button.click();
  }
  focus(t) {
    this.button.focus(t);
  }
  blur() {
    this.button.blur();
  }
  render() {
    const t = !!this.href, e = t ? xs`a` : xs`button`;
    return os`
      <${e}
        part="base"
        class=${fe({
      "icon-button": !0,
      "icon-button--disabled": !t && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${j(t ? void 0 : this.disabled)}
        type=${j(t ? void 0 : "button")}
        href=${j(t ? this.href : void 0)}
        target=${j(t ? this.target : void 0)}
        download=${j(t ? this.download : void 0)}
        rel=${j(t && this.target ? "noreferrer noopener" : void 0)}
        role=${j(t ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${j(this.name)}
          library=${j(this.library)}
          src=${j(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `;
  }
};
de.styles = [ve, Kc];
de.dependencies = { "sl-icon": me };
h([
  ae(".icon-button")
], de.prototype, "button", 2);
h([
  ye()
], de.prototype, "hasFocus", 2);
h([
  f()
], de.prototype, "name", 2);
h([
  f()
], de.prototype, "library", 2);
h([
  f()
], de.prototype, "src", 2);
h([
  f()
], de.prototype, "href", 2);
h([
  f()
], de.prototype, "target", 2);
h([
  f()
], de.prototype, "download", 2);
h([
  f()
], de.prototype, "label", 2);
h([
  f({ type: Boolean, reflect: !0 })
], de.prototype, "disabled", 2);
var fa = /* @__PURE__ */ new Map(), Xc = /* @__PURE__ */ new WeakMap();
function Qc(t) {
  return t ?? { keyframes: [], options: { duration: 0 } };
}
function eo(t, e) {
  return e.toLowerCase() === "rtl" ? {
    keyframes: t.rtlKeyframes || t.keyframes,
    options: t.options
  } : t;
}
function en(t, e) {
  fa.set(t, Qc(e));
}
function ks(t, e, r) {
  const s = Xc.get(t);
  if (s?.[e])
    return eo(s[e], r.dir);
  const n = fa.get(e);
  return n ? eo(n, r.dir) : {
    keyframes: [],
    options: { duration: 0 }
  };
}
function Ss(t, e) {
  return new Promise((r) => {
    function s(n) {
      n.target === t && (t.removeEventListener(e, s), r());
    }
    t.addEventListener(e, s);
  });
}
function $s(t, e, r) {
  return new Promise((s) => {
    if (r?.duration === 1 / 0)
      throw new Error("Promise-based animations must be finite.");
    const n = t.animate(e, Qs(vt({}, r), {
      duration: eu() ? 0 : r.duration
    }));
    n.addEventListener("cancel", s, { once: !0 }), n.addEventListener("finish", s, { once: !0 });
  });
}
function eu() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Cs(t) {
  return Promise.all(
    t.getAnimations().map((e) => new Promise((r) => {
      e.cancel(), requestAnimationFrame(r);
    }))
  );
}
var tn = class {
  constructor(t, ...e) {
    this.slotNames = [], this.handleSlotChange = (r) => {
      const s = r.target;
      (this.slotNames.includes("[default]") && !s.name || s.name && this.slotNames.includes(s.name)) && this.host.requestUpdate();
    }, (this.host = t).addController(this), this.slotNames = e;
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((t) => {
      if (t.nodeType === t.TEXT_NODE && t.textContent.trim() !== "")
        return !0;
      if (t.nodeType === t.ELEMENT_NODE) {
        const e = t;
        if (e.tagName.toLowerCase() === "sl-visually-hidden")
          return !1;
        if (!e.hasAttribute("slot"))
          return !0;
      }
      return !1;
    });
  }
  hasNamedSlot(t) {
    return this.host.querySelector(`:scope > [slot="${t}"]`) !== null;
  }
  test(t) {
    return t === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(t);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
};
const Nn = /* @__PURE__ */ new Set(), Mt = /* @__PURE__ */ new Map();
let _t, ai = "ltr", li = "en";
const pa = typeof MutationObserver < "u" && typeof document < "u" && typeof document.documentElement < "u";
if (pa) {
  const t = new MutationObserver(ga);
  ai = document.documentElement.dir || "ltr", li = document.documentElement.lang || navigator.language, t.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["dir", "lang"]
  });
}
function ma(...t) {
  t.map((e) => {
    const r = e.$code.toLowerCase();
    Mt.has(r) ? Mt.set(r, Object.assign(Object.assign({}, Mt.get(r)), e)) : Mt.set(r, e), _t || (_t = e);
  }), ga();
}
function ga() {
  pa && (ai = document.documentElement.dir || "ltr", li = document.documentElement.lang || navigator.language), [...Nn.keys()].map((t) => {
    typeof t.requestUpdate == "function" && t.requestUpdate();
  });
}
class tu {
  constructor(e) {
    this.host = e, this.host.addController(this);
  }
  hostConnected() {
    Nn.add(this.host);
  }
  hostDisconnected() {
    Nn.delete(this.host);
  }
  dir() {
    return `${this.host.dir || ai}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || li}`.toLowerCase();
  }
  getTranslationData(e) {
    var r, s;
    const n = new Intl.Locale(e.replace(/_/g, "-")), i = n?.language.toLowerCase(), o = (s = (r = n?.region) === null || r === void 0 ? void 0 : r.toLowerCase()) !== null && s !== void 0 ? s : "", a = Mt.get(`${i}-${o}`), l = Mt.get(i);
    return { locale: n, language: i, region: o, primary: a, secondary: l };
  }
  exists(e, r) {
    var s;
    const { primary: n, secondary: i } = this.getTranslationData((s = r.lang) !== null && s !== void 0 ? s : this.lang());
    return r = Object.assign({ includeFallback: !1 }, r), !!(n && n[e] || i && i[e] || r.includeFallback && _t && _t[e]);
  }
  term(e, ...r) {
    const { primary: s, secondary: n } = this.getTranslationData(this.lang());
    let i;
    if (s && s[e])
      i = s[e];
    else if (n && n[e])
      i = n[e];
    else if (_t && _t[e])
      i = _t[e];
    else
      return console.error(`No translation found for: ${String(e)}`), String(e);
    return typeof i == "function" ? i(...r) : i;
  }
  date(e, r) {
    return e = new Date(e), new Intl.DateTimeFormat(this.lang(), r).format(e);
  }
  number(e, r) {
    return e = Number(e), isNaN(e) ? "" : new Intl.NumberFormat(this.lang(), r).format(e);
  }
  relativeTime(e, r, s) {
    return new Intl.RelativeTimeFormat(this.lang(), s).format(e, r);
  }
}
var ba = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (t, e) => `Go to slide ${t} of ${e}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (t) => t === 0 ? "No options selected" : t === 1 ? "1 option selected" : `${t} options selected`,
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (t) => `Slide ${t}`,
  toggleColorFormat: "Toggle color format"
};
ma(ba);
var ru = ba, tt = class extends tu {
};
ma(ru);
var su = ue`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`, Lt = Object.assign(document.createElement("div"), { className: "sl-toast-stack" }), qe = class extends ie {
  constructor() {
    super(...arguments), this.hasSlotController = new tn(this, "icon", "suffix"), this.localize = new tt(this), this.open = !1, this.closable = !1, this.variant = "primary", this.duration = 1 / 0;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout), this.open && this.duration < 1 / 0 && (this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration));
  }
  handleCloseClick() {
    this.hide();
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show"), this.duration < 1 / 0 && this.restartAutoHide(), await Cs(this.base), this.base.hidden = !1;
      const { keyframes: t, options: e } = ks(this, "alert.show", { dir: this.localize.dir() });
      await $s(this.base, t, e), this.emit("sl-after-show");
    } else {
      this.emit("sl-hide"), clearTimeout(this.autoHideTimeout), await Cs(this.base);
      const { keyframes: t, options: e } = ks(this, "alert.hide", { dir: this.localize.dir() });
      await $s(this.base, t, e), this.base.hidden = !0, this.emit("sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  async show() {
    if (!this.open)
      return this.open = !0, Ss(this, "sl-after-show");
  }
  async hide() {
    if (!!this.open)
      return this.open = !1, Ss(this, "sl-after-hide");
  }
  async toast() {
    return new Promise((t) => {
      Lt.parentElement === null && document.body.append(Lt), Lt.appendChild(this), requestAnimationFrame(() => {
        this.clientWidth, this.show();
      }), this.addEventListener(
        "sl-after-hide",
        () => {
          Lt.removeChild(this), t(), Lt.querySelector("sl-alert") === null && Lt.remove();
        },
        { once: !0 }
      );
    });
  }
  render() {
    return z`
      <div
        part="base"
        class=${fe({
      alert: !0,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--has-icon": this.hasSlotController.test("icon"),
      "alert--primary": this.variant === "primary",
      "alert--success": this.variant === "success",
      "alert--neutral": this.variant === "neutral",
      "alert--warning": this.variant === "warning",
      "alert--danger": this.variant === "danger"
    })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable ? z`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
qe.styles = [ve, su];
qe.dependencies = { "sl-icon-button": de };
h([
  ae('[part~="base"]')
], qe.prototype, "base", 2);
h([
  f({ type: Boolean, reflect: !0 })
], qe.prototype, "open", 2);
h([
  f({ type: Boolean, reflect: !0 })
], qe.prototype, "closable", 2);
h([
  f({ reflect: !0 })
], qe.prototype, "variant", 2);
h([
  f({ type: Number })
], qe.prototype, "duration", 2);
h([
  re("open", { waitUntilFirstUpdate: !0 })
], qe.prototype, "handleOpenChange", 1);
h([
  re("duration")
], qe.prototype, "handleDurationChange", 1);
en("alert.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
en("alert.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});
qe.define("sl-alert");
var nu = ue`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
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
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`, ci = class extends ie {
  constructor() {
    super(...arguments), this.localize = new tt(this);
  }
  render() {
    return z`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
ci.styles = [ve, nu];
var cr = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakSet(), rs = /* @__PURE__ */ new WeakMap(), ui = class {
  constructor(t, e) {
    this.handleFormData = (r) => {
      const s = this.options.disabled(this.host), n = this.options.name(this.host), i = this.options.value(this.host), o = this.host.tagName.toLowerCase() === "sl-button";
      this.host.isConnected && !s && !o && typeof n == "string" && n.length > 0 && typeof i < "u" && (Array.isArray(i) ? i.forEach((a) => {
        r.formData.append(n, a.toString());
      }) : r.formData.append(n, i.toString()));
    }, this.handleFormSubmit = (r) => {
      var s;
      const n = this.options.disabled(this.host), i = this.options.reportValidity;
      this.form && !this.form.noValidate && ((s = cr.get(this.form)) == null || s.forEach((o) => {
        this.setUserInteracted(o, !0);
      })), this.form && !this.form.noValidate && !n && !i(this.host) && (r.preventDefault(), r.stopImmediatePropagation());
    }, this.handleFormReset = () => {
      this.options.setValue(this.host, this.options.defaultValue(this.host)), this.setUserInteracted(this.host, !1), rs.set(this.host, []);
    }, this.handleInteraction = (r) => {
      const s = rs.get(this.host);
      s.includes(r.type) || s.push(r.type), s.length === this.options.assumeInteractionOn.length && this.setUserInteracted(this.host, !0);
    }, this.checkFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const r = this.form.querySelectorAll("*");
        for (const s of r)
          if (typeof s.checkValidity == "function" && !s.checkValidity())
            return !1;
      }
      return !0;
    }, this.reportFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const r = this.form.querySelectorAll("*");
        for (const s of r)
          if (typeof s.reportValidity == "function" && !s.reportValidity())
            return !1;
      }
      return !0;
    }, (this.host = t).addController(this), this.options = vt({
      form: (r) => {
        const s = r.form;
        if (s) {
          const i = r.getRootNode().querySelector(`#${s}`);
          if (i)
            return i;
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
      checkValidity: (r) => typeof r.checkValidity == "function" ? r.checkValidity() : !0,
      setValue: (r, s) => r.value = s,
      assumeInteractionOn: ["sl-input"]
    }, e);
  }
  hostConnected() {
    const t = this.options.form(this.host);
    t && this.attachForm(t), rs.set(this.host, []), this.options.assumeInteractionOn.forEach((e) => {
      this.host.addEventListener(e, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm(), rs.delete(this.host), this.options.assumeInteractionOn.forEach((t) => {
      this.host.removeEventListener(t, this.handleInteraction);
    });
  }
  hostUpdated() {
    const t = this.options.form(this.host);
    t || this.detachForm(), t && this.form !== t && (this.detachForm(), this.attachForm(t)), this.host.hasUpdated && this.setValidity(this.host.validity.valid);
  }
  attachForm(t) {
    t ? (this.form = t, cr.has(this.form) ? cr.get(this.form).add(this.host) : cr.set(this.form, /* @__PURE__ */ new Set([this.host])), this.form.addEventListener("formdata", this.handleFormData), this.form.addEventListener("submit", this.handleFormSubmit), this.form.addEventListener("reset", this.handleFormReset), ur.has(this.form) || (ur.set(this.form, this.form.reportValidity), this.form.reportValidity = () => this.reportFormValidity()), dr.has(this.form) || (dr.set(this.form, this.form.checkValidity), this.form.checkValidity = () => this.checkFormValidity())) : this.form = void 0;
  }
  detachForm() {
    if (!this.form)
      return;
    const t = cr.get(this.form);
    !t || (t.delete(this.host), t.size <= 0 && (this.form.removeEventListener("formdata", this.handleFormData), this.form.removeEventListener("submit", this.handleFormSubmit), this.form.removeEventListener("reset", this.handleFormReset), ur.has(this.form) && (this.form.reportValidity = ur.get(this.form), ur.delete(this.form)), dr.has(this.form) && (this.form.checkValidity = dr.get(this.form), dr.delete(this.form)), this.form = void 0));
  }
  setUserInteracted(t, e) {
    e ? mn.add(t) : mn.delete(t), t.requestUpdate();
  }
  doAction(t, e) {
    if (this.form) {
      const r = document.createElement("button");
      r.type = t, r.style.position = "absolute", r.style.width = "0", r.style.height = "0", r.style.clipPath = "inset(50%)", r.style.overflow = "hidden", r.style.whiteSpace = "nowrap", e && (r.name = e.name, r.value = e.value, ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((s) => {
        e.hasAttribute(s) && r.setAttribute(s, e.getAttribute(s));
      })), this.form.append(r), r.click(), r.remove();
    }
  }
  getForm() {
    var t;
    return (t = this.form) != null ? t : null;
  }
  reset(t) {
    this.doAction("reset", t);
  }
  submit(t) {
    this.doAction("submit", t);
  }
  setValidity(t) {
    const e = this.host, r = Boolean(mn.has(e)), s = Boolean(e.required);
    e.toggleAttribute("data-required", s), e.toggleAttribute("data-optional", !s), e.toggleAttribute("data-invalid", !t), e.toggleAttribute("data-valid", t), e.toggleAttribute("data-user-invalid", !t && r), e.toggleAttribute("data-user-valid", t && r);
  }
  updateValidity() {
    const t = this.host;
    this.setValidity(t.validity.valid);
  }
  emitInvalidEvent(t) {
    const e = new CustomEvent("sl-invalid", {
      bubbles: !1,
      composed: !1,
      cancelable: !0,
      detail: {}
    });
    t || e.preventDefault(), this.host.dispatchEvent(e) || t?.preventDefault();
  }
}, di = Object.freeze({
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
Object.freeze(Qs(vt({}, di), {
  valid: !1,
  valueMissing: !0
}));
Object.freeze(Qs(vt({}, di), {
  valid: !1,
  customError: !0
}));
var iu = ue`
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
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
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
    border-color: var(--sl-input-border-color);
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
    border-color: var(--sl-input-border-color);
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
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
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

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
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
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`, B = class extends ie {
  constructor() {
    super(...arguments), this.formControlController = new ui(this, {
      assumeInteractionOn: ["click"]
    }), this.hasSlotController = new tn(this, "[default]", "prefix", "suffix"), this.localize = new tt(this), this.hasFocus = !1, this.invalid = !1, this.title = "", this.variant = "default", this.size = "medium", this.caret = !1, this.disabled = !1, this.loading = !1, this.outline = !1, this.pill = !1, this.circle = !1, this.type = "button", this.name = "", this.value = "", this.href = "", this.rel = "noreferrer noopener";
  }
  get validity() {
    return this.isButton() ? this.button.validity : di;
  }
  get validationMessage() {
    return this.isButton() ? this.button.validationMessage : "";
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
  handleInvalid(t) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(t);
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
  focus(t) {
    this.button.focus(t);
  }
  blur() {
    this.button.blur();
  }
  checkValidity() {
    return this.isButton() ? this.button.checkValidity() : !0;
  }
  getForm() {
    return this.formControlController.getForm();
  }
  reportValidity() {
    return this.isButton() ? this.button.reportValidity() : !0;
  }
  setCustomValidity(t) {
    this.isButton() && (this.button.setCustomValidity(t), this.formControlController.updateValidity());
  }
  render() {
    const t = this.isLink(), e = t ? xs`a` : xs`button`;
    return os`
      <${e}
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
        ?disabled=${j(t ? void 0 : this.disabled)}
        type=${j(t ? void 0 : this.type)}
        title=${this.title}
        name=${j(t ? void 0 : this.name)}
        value=${j(t ? void 0 : this.value)}
        href=${j(t ? this.href : void 0)}
        target=${j(t ? this.target : void 0)}
        download=${j(t ? this.download : void 0)}
        rel=${j(t ? this.rel : void 0)}
        role=${j(t ? void 0 : "button")}
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
        ${this.caret ? os` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? os`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${e}>
    `;
  }
};
B.styles = [ve, iu];
B.dependencies = {
  "sl-icon": me,
  "sl-spinner": ci
};
h([
  ae(".button")
], B.prototype, "button", 2);
h([
  ye()
], B.prototype, "hasFocus", 2);
h([
  ye()
], B.prototype, "invalid", 2);
h([
  f()
], B.prototype, "title", 2);
h([
  f({ reflect: !0 })
], B.prototype, "variant", 2);
h([
  f({ reflect: !0 })
], B.prototype, "size", 2);
h([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "caret", 2);
h([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "disabled", 2);
h([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "loading", 2);
h([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "outline", 2);
h([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "pill", 2);
h([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "circle", 2);
h([
  f()
], B.prototype, "type", 2);
h([
  f()
], B.prototype, "name", 2);
h([
  f()
], B.prototype, "value", 2);
h([
  f()
], B.prototype, "href", 2);
h([
  f()
], B.prototype, "target", 2);
h([
  f()
], B.prototype, "rel", 2);
h([
  f()
], B.prototype, "download", 2);
h([
  f()
], B.prototype, "form", 2);
h([
  f({ attribute: "formaction" })
], B.prototype, "formAction", 2);
h([
  f({ attribute: "formenctype" })
], B.prototype, "formEnctype", 2);
h([
  f({ attribute: "formmethod" })
], B.prototype, "formMethod", 2);
h([
  f({ attribute: "formnovalidate", type: Boolean })
], B.prototype, "formNoValidate", 2);
h([
  f({ attribute: "formtarget" })
], B.prototype, "formTarget", 2);
h([
  re("disabled", { waitUntilFirstUpdate: !0 })
], B.prototype, "handleDisabledChange", 1);
B.define("sl-button");
var ou = ue`
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
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
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
    background: inherit;
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
    -webkit-user-select: none;
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

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
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

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
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

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
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

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
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

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
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
`, va = (t = "value") => (e, r) => {
  const s = e.constructor, n = s.prototype.attributeChangedCallback;
  s.prototype.attributeChangedCallback = function(i, o, a) {
    var l;
    const c = s.getPropertyOptions(t), u = typeof c.attribute == "string" ? c.attribute : t;
    if (i === u) {
      const d = c.converter || Gt, p = (typeof d == "function" ? d : (l = d?.fromAttribute) != null ? l : Gt.fromAttribute)(a, c.type);
      this[t] !== p && (this[r] = p);
    }
    n.call(this, i, o, a);
  };
}, ya = ue`
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
`;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const au = ii(class extends oi {
  constructor(t) {
    if (super(t), t.type !== it.PROPERTY && t.type !== it.ATTRIBUTE && t.type !== it.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Wc(t))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(t) {
    return t;
  }
  update(t, [e]) {
    if (e === Te || e === te)
      return e;
    const r = t.element, s = t.name;
    if (t.type === it.PROPERTY) {
      if (e === r[s])
        return Te;
    } else if (t.type === it.BOOLEAN_ATTRIBUTE) {
      if (!!e === r.hasAttribute(s))
        return Te;
    } else if (t.type === it.ATTRIBUTE && r.getAttribute(s) === e + "")
      return Te;
    return qc(t), e;
  }
});
var N = class extends ie {
  constructor() {
    super(...arguments), this.formControlController = new ui(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    }), this.hasSlotController = new tn(this, "help-text", "label"), this.localize = new tt(this), this.hasFocus = !1, this.title = "", this.__numberInput = Object.assign(document.createElement("input"), { type: "number" }), this.__dateInput = Object.assign(document.createElement("input"), { type: "date" }), this.type = "text", this.name = "", this.value = "", this.defaultValue = "", this.size = "medium", this.filled = !1, this.pill = !1, this.label = "", this.helpText = "", this.clearable = !1, this.disabled = !1, this.placeholder = "", this.readonly = !1, this.passwordToggle = !1, this.passwordVisible = !1, this.noSpinButtons = !1, this.form = "", this.required = !1, this.spellcheck = !0;
  }
  get valueAsDate() {
    var t;
    return this.__dateInput.type = this.type, this.__dateInput.value = this.value, ((t = this.input) == null ? void 0 : t.valueAsDate) || this.__dateInput.valueAsDate;
  }
  set valueAsDate(t) {
    this.__dateInput.type = this.type, this.__dateInput.valueAsDate = t, this.value = this.__dateInput.value;
  }
  get valueAsNumber() {
    var t;
    return this.__numberInput.value = this.value, ((t = this.input) == null ? void 0 : t.valueAsNumber) || this.__numberInput.valueAsNumber;
  }
  set valueAsNumber(t) {
    this.__numberInput.valueAsNumber = t, this.value = this.__numberInput.value;
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
  handleClearClick(t) {
    t.preventDefault(), this.value !== "" && (this.value = "", this.emit("sl-clear"), this.emit("sl-input"), this.emit("sl-change")), this.input.focus();
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value, this.formControlController.updateValidity(), this.emit("sl-input");
  }
  handleInvalid(t) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(t);
  }
  handleKeyDown(t) {
    const e = t.metaKey || t.ctrlKey || t.shiftKey || t.altKey;
    t.key === "Enter" && !e && setTimeout(() => {
      !t.defaultPrevented && !t.isComposing && this.formControlController.submit();
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
  focus(t) {
    this.input.focus(t);
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  setSelectionRange(t, e, r = "none") {
    this.input.setSelectionRange(t, e, r);
  }
  setRangeText(t, e, r, s = "preserve") {
    const n = e ?? this.input.selectionStart, i = r ?? this.input.selectionEnd;
    this.input.setRangeText(t, n, i, s), this.value !== this.input.value && (this.value = this.input.value);
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
  getForm() {
    return this.formControlController.getForm();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(t) {
    this.input.setCustomValidity(t), this.formControlController.updateValidity();
  }
  render() {
    const t = this.hasSlotController.test("label"), e = this.hasSlotController.test("help-text"), r = this.label ? !0 : !!t, s = this.helpText ? !0 : !!e, i = this.clearable && !this.disabled && !this.readonly && (typeof this.value == "number" || this.value.length > 0);
    return z`
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
      "input--no-spin-buttons": this.noSpinButtons
    })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${j(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${j(this.placeholder)}
              minlength=${j(this.minlength)}
              maxlength=${j(this.maxlength)}
              min=${j(this.min)}
              max=${j(this.max)}
              step=${j(this.step)}
              .value=${au(this.value)}
              autocapitalize=${j(this.autocapitalize)}
              autocomplete=${j(this.autocomplete)}
              autocorrect=${j(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${j(this.pattern)}
              enterkeyhint=${j(this.enterkeyhint)}
              inputmode=${j(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i ? z`
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
            ${this.passwordToggle && !this.disabled ? z`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? z`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : z`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
N.styles = [ve, ya, ou];
N.dependencies = { "sl-icon": me };
h([
  ae(".input__control")
], N.prototype, "input", 2);
h([
  ye()
], N.prototype, "hasFocus", 2);
h([
  f()
], N.prototype, "title", 2);
h([
  f({ reflect: !0 })
], N.prototype, "type", 2);
h([
  f()
], N.prototype, "name", 2);
h([
  f()
], N.prototype, "value", 2);
h([
  va()
], N.prototype, "defaultValue", 2);
h([
  f({ reflect: !0 })
], N.prototype, "size", 2);
h([
  f({ type: Boolean, reflect: !0 })
], N.prototype, "filled", 2);
h([
  f({ type: Boolean, reflect: !0 })
], N.prototype, "pill", 2);
h([
  f()
], N.prototype, "label", 2);
h([
  f({ attribute: "help-text" })
], N.prototype, "helpText", 2);
h([
  f({ type: Boolean })
], N.prototype, "clearable", 2);
h([
  f({ type: Boolean, reflect: !0 })
], N.prototype, "disabled", 2);
h([
  f()
], N.prototype, "placeholder", 2);
h([
  f({ type: Boolean, reflect: !0 })
], N.prototype, "readonly", 2);
h([
  f({ attribute: "password-toggle", type: Boolean })
], N.prototype, "passwordToggle", 2);
h([
  f({ attribute: "password-visible", type: Boolean })
], N.prototype, "passwordVisible", 2);
h([
  f({ attribute: "no-spin-buttons", type: Boolean })
], N.prototype, "noSpinButtons", 2);
h([
  f({ reflect: !0 })
], N.prototype, "form", 2);
h([
  f({ type: Boolean, reflect: !0 })
], N.prototype, "required", 2);
h([
  f()
], N.prototype, "pattern", 2);
h([
  f({ type: Number })
], N.prototype, "minlength", 2);
h([
  f({ type: Number })
], N.prototype, "maxlength", 2);
h([
  f()
], N.prototype, "min", 2);
h([
  f()
], N.prototype, "max", 2);
h([
  f()
], N.prototype, "step", 2);
h([
  f()
], N.prototype, "autocapitalize", 2);
h([
  f()
], N.prototype, "autocorrect", 2);
h([
  f()
], N.prototype, "autocomplete", 2);
h([
  f({ type: Boolean })
], N.prototype, "autofocus", 2);
h([
  f()
], N.prototype, "enterkeyhint", 2);
h([
  f({
    type: Boolean,
    converter: {
      fromAttribute: (t) => !(!t || t === "false"),
      toAttribute: (t) => t ? "true" : "false"
    }
  })
], N.prototype, "spellcheck", 2);
h([
  f()
], N.prototype, "inputmode", 2);
h([
  re("disabled", { waitUntilFirstUpdate: !0 })
], N.prototype, "handleDisabledChange", 1);
h([
  re("step", { waitUntilFirstUpdate: !0 })
], N.prototype, "handleStepChange", 1);
h([
  re("value", { waitUntilFirstUpdate: !0 })
], N.prototype, "handleValueChange", 1);
N.define("sl-input");
var lu = ue`
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
    -webkit-user-select: none;
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
`, Ke = class extends ie {
  constructor() {
    super(...arguments), this.hasError = !1, this.image = "", this.label = "", this.initials = "", this.loading = "eager", this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = !1;
  }
  handleImageLoadError() {
    this.hasError = !0, this.emit("sl-error");
  }
  render() {
    const t = z`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;
    let e = z``;
    return this.initials ? e = z`<div part="initials" class="avatar__initials">${this.initials}</div>` : e = z`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `, z`
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
        ${this.image && !this.hasError ? t : e}
      </div>
    `;
  }
};
Ke.styles = [ve, lu];
Ke.dependencies = {
  "sl-icon": me
};
h([
  ye()
], Ke.prototype, "hasError", 2);
h([
  f()
], Ke.prototype, "image", 2);
h([
  f()
], Ke.prototype, "label", 2);
h([
  f()
], Ke.prototype, "initials", 2);
h([
  f()
], Ke.prototype, "loading", 2);
h([
  f({ reflect: !0 })
], Ke.prototype, "shape", 2);
h([
  re("image")
], Ke.prototype, "handleImageChange", 1);
Ke.define("sl-avatar");
ci.define("sl-spinner");
var cu = ue`
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
    -webkit-user-select: none;
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
`, Tt = class extends ie {
  constructor() {
    super(...arguments), this.localize = new tt(this), this.variant = "neutral", this.size = "medium", this.pill = !1, this.removable = !1;
  }
  handleRemoveClick() {
    this.emit("sl-remove");
  }
  render() {
    return z`
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

        ${this.removable ? z`
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
Tt.styles = [ve, cu];
Tt.dependencies = { "sl-icon-button": de };
h([
  f({ reflect: !0 })
], Tt.prototype, "variant", 2);
h([
  f({ reflect: !0 })
], Tt.prototype, "size", 2);
h([
  f({ type: Boolean, reflect: !0 })
], Tt.prototype, "pill", 2);
h([
  f({ type: Boolean })
], Tt.prototype, "removable", 2);
var uu = ue`
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
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
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

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
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
    top: 0;
    left: 0;
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

  /* Suffix */
  .select__suffix {
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

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;
function du(t, e) {
  return {
    top: Math.round(t.getBoundingClientRect().top - e.getBoundingClientRect().top),
    left: Math.round(t.getBoundingClientRect().left - e.getBoundingClientRect().left)
  };
}
function Rn(t, e, r = "vertical", s = "smooth") {
  const n = du(t, e), i = n.top + e.scrollTop, o = n.left + e.scrollLeft, a = e.scrollLeft, l = e.scrollLeft + e.offsetWidth, c = e.scrollTop, u = e.scrollTop + e.offsetHeight;
  (r === "horizontal" || r === "both") && (o < a ? e.scrollTo({ left: o, behavior: s }) : o + t.clientWidth > l && e.scrollTo({ left: o - e.offsetWidth + t.clientWidth, behavior: s })), (r === "vertical" || r === "both") && (i < c ? e.scrollTo({ top: i, behavior: s }) : i + t.clientHeight > u && e.scrollTo({ top: i - e.offsetHeight + t.clientHeight, behavior: s }));
}
var hu = ue`
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

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;
const Be = Math.min, we = Math.max, As = Math.round, ss = Math.floor, dt = (t) => ({
  x: t,
  y: t
}), fu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, pu = {
  start: "end",
  end: "start"
};
function Ln(t, e, r) {
  return we(t, Be(e, r));
}
function rr(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ht(t) {
  return t.split("-")[0];
}
function sr(t) {
  return t.split("-")[1];
}
function wa(t) {
  return t === "x" ? "y" : "x";
}
function hi(t) {
  return t === "y" ? "height" : "width";
}
function $t(t) {
  return ["top", "bottom"].includes(ht(t)) ? "y" : "x";
}
function fi(t) {
  return wa($t(t));
}
function mu(t, e, r) {
  r === void 0 && (r = !1);
  const s = sr(t), n = fi(t), i = hi(n);
  let o = n === "x" ? s === (r ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (o = Es(o)), [o, Es(o)];
}
function gu(t) {
  const e = Es(t);
  return [In(t), e, In(e)];
}
function In(t) {
  return t.replace(/start|end/g, (e) => pu[e]);
}
function bu(t, e, r) {
  const s = ["left", "right"], n = ["right", "left"], i = ["top", "bottom"], o = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return r ? e ? n : s : e ? s : n;
    case "left":
    case "right":
      return e ? i : o;
    default:
      return [];
  }
}
function vu(t, e, r, s) {
  const n = sr(t);
  let i = bu(ht(t), r === "start", s);
  return n && (i = i.map((o) => o + "-" + n), e && (i = i.concat(i.map(In)))), i;
}
function Es(t) {
  return t.replace(/left|right|bottom|top/g, (e) => fu[e]);
}
function yu(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function _a(t) {
  return typeof t != "number" ? yu(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ts(t) {
  const {
    x: e,
    y: r,
    width: s,
    height: n
  } = t;
  return {
    width: s,
    height: n,
    top: r,
    left: e,
    right: e + s,
    bottom: r + n,
    x: e,
    y: r
  };
}
function to(t, e, r) {
  let {
    reference: s,
    floating: n
  } = t;
  const i = $t(e), o = fi(e), a = hi(o), l = ht(e), c = i === "y", u = s.x + s.width / 2 - n.width / 2, d = s.y + s.height / 2 - n.height / 2, m = s[a] / 2 - n[a] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: u,
        y: s.y - n.height
      };
      break;
    case "bottom":
      p = {
        x: u,
        y: s.y + s.height
      };
      break;
    case "right":
      p = {
        x: s.x + s.width,
        y: d
      };
      break;
    case "left":
      p = {
        x: s.x - n.width,
        y: d
      };
      break;
    default:
      p = {
        x: s.x,
        y: s.y
      };
  }
  switch (sr(e)) {
    case "start":
      p[o] -= m * (r && c ? -1 : 1);
      break;
    case "end":
      p[o] += m * (r && c ? -1 : 1);
      break;
  }
  return p;
}
const wu = async (t, e, r) => {
  const {
    placement: s = "bottom",
    strategy: n = "absolute",
    middleware: i = [],
    platform: o
  } = r, a = i.filter(Boolean), l = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let c = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: n
  }), {
    x: u,
    y: d
  } = to(c, s, l), m = s, p = {}, b = 0;
  for (let v = 0; v < a.length; v++) {
    const {
      name: k,
      fn: x
    } = a[v], {
      x: $,
      y: T,
      data: M,
      reset: L
    } = await x({
      x: u,
      y: d,
      initialPlacement: s,
      placement: m,
      strategy: n,
      middlewareData: p,
      rects: c,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = $ ?? u, d = T ?? d, p = {
      ...p,
      [k]: {
        ...p[k],
        ...M
      }
    }, L && b <= 50 && (b++, typeof L == "object" && (L.placement && (m = L.placement), L.rects && (c = L.rects === !0 ? await o.getElementRects({
      reference: t,
      floating: e,
      strategy: n
    }) : L.rects), {
      x: u,
      y: d
    } = to(c, m, l)), v = -1);
  }
  return {
    x: u,
    y: d,
    placement: m,
    strategy: n,
    middlewareData: p
  };
};
async function pi(t, e) {
  var r;
  e === void 0 && (e = {});
  const {
    x: s,
    y: n,
    platform: i,
    rects: o,
    elements: a,
    strategy: l
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: p = 0
  } = rr(e, t), b = _a(p), k = a[m ? d === "floating" ? "reference" : "floating" : d], x = Ts(await i.getClippingRect({
    element: (r = await (i.isElement == null ? void 0 : i.isElement(k))) == null || r ? k : k.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), $ = d === "floating" ? {
    x: s,
    y: n,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, T = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), M = await (i.isElement == null ? void 0 : i.isElement(T)) ? await (i.getScale == null ? void 0 : i.getScale(T)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, L = Ts(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: $,
    offsetParent: T,
    strategy: l
  }) : $);
  return {
    top: (x.top - L.top + b.top) / M.y,
    bottom: (L.bottom - x.bottom + b.bottom) / M.y,
    left: (x.left - L.left + b.left) / M.x,
    right: (L.right - x.right + b.right) / M.x
  };
}
const _u = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: r,
      y: s,
      placement: n,
      rects: i,
      platform: o,
      elements: a,
      middlewareData: l
    } = e, {
      element: c,
      padding: u = 0
    } = rr(t, e) || {};
    if (c == null)
      return {};
    const d = _a(u), m = {
      x: r,
      y: s
    }, p = fi(n), b = hi(p), v = await o.getDimensions(c), k = p === "y", x = k ? "top" : "left", $ = k ? "bottom" : "right", T = k ? "clientHeight" : "clientWidth", M = i.reference[b] + i.reference[p] - m[p] - i.floating[b], L = m[p] - i.reference[p], K = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c));
    let $e = K ? K[T] : 0;
    (!$e || !await (o.isElement == null ? void 0 : o.isElement(K))) && ($e = a.floating[T] || i.floating[b]);
    const Ce = M / 2 - L / 2, ge = $e / 2 - v[b] / 2 - 1, U = Be(d[x], ge), F = Be(d[$], ge), H = U, Ae = $e - v[b] - F, he = $e / 2 - v[b] / 2 + Ce, Nt = Ln(H, he, Ae), Je = !l.arrow && sr(n) != null && he !== Nt && i.reference[b] / 2 - (he < H ? U : F) - v[b] / 2 < 0, Ue = Je ? he < H ? he - H : he - Ae : 0;
    return {
      [p]: m[p] + Ue,
      data: {
        [p]: Nt,
        centerOffset: he - Nt - Ue,
        ...Je && {
          alignmentOffset: Ue
        }
      },
      reset: Je
    };
  }
});
const xu = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var r, s;
      const {
        placement: n,
        middlewareData: i,
        rects: o,
        initialPlacement: a,
        platform: l,
        elements: c
      } = e, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: v = !0,
        ...k
      } = rr(t, e);
      if ((r = i.arrow) != null && r.alignmentOffset)
        return {};
      const x = ht(n), $ = $t(a), T = ht(a) === a, M = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), L = m || (T || !v ? [Es(a)] : gu(a)), K = b !== "none";
      !m && K && L.push(...vu(a, v, b, M));
      const $e = [a, ...L], Ce = await pi(e, k), ge = [];
      let U = ((s = i.flip) == null ? void 0 : s.overflows) || [];
      if (u && ge.push(Ce[x]), d) {
        const he = mu(n, o, M);
        ge.push(Ce[he[0]], Ce[he[1]]);
      }
      if (U = [...U, {
        placement: n,
        overflows: ge
      }], !ge.every((he) => he <= 0)) {
        var F, H;
        const he = (((F = i.flip) == null ? void 0 : F.index) || 0) + 1, Nt = $e[he];
        if (Nt)
          return {
            data: {
              index: he,
              overflows: U
            },
            reset: {
              placement: Nt
            }
          };
        let Je = (H = U.filter((Ue) => Ue.overflows[0] <= 0).sort((Ue, st) => Ue.overflows[1] - st.overflows[1])[0]) == null ? void 0 : H.placement;
        if (!Je)
          switch (p) {
            case "bestFit": {
              var Ae;
              const Ue = (Ae = U.filter((st) => {
                if (K) {
                  const nt = $t(st.placement);
                  return nt === $ || nt === "y";
                }
                return !0;
              }).map((st) => [st.placement, st.overflows.filter((nt) => nt > 0).reduce((nt, fl) => nt + fl, 0)]).sort((st, nt) => st[1] - nt[1])[0]) == null ? void 0 : Ae[0];
              Ue && (Je = Ue);
              break;
            }
            case "initialPlacement":
              Je = a;
              break;
          }
        if (n !== Je)
          return {
            reset: {
              placement: Je
            }
          };
      }
      return {};
    }
  };
};
async function ku(t, e) {
  const {
    placement: r,
    platform: s,
    elements: n
  } = t, i = await (s.isRTL == null ? void 0 : s.isRTL(n.floating)), o = ht(r), a = sr(r), l = $t(r) === "y", c = ["left", "top"].includes(o) ? -1 : 1, u = i && l ? -1 : 1, d = rr(e, t);
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: b
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return a && typeof b == "number" && (p = a === "end" ? b * -1 : b), l ? {
    x: p * u,
    y: m * c
  } : {
    x: m * c,
    y: p * u
  };
}
const Su = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var r, s;
      const {
        x: n,
        y: i,
        placement: o,
        middlewareData: a
      } = e, l = await ku(e, t);
      return o === ((r = a.offset) == null ? void 0 : r.placement) && (s = a.arrow) != null && s.alignmentOffset ? {} : {
        x: n + l.x,
        y: i + l.y,
        data: {
          ...l,
          placement: o
        }
      };
    }
  };
}, $u = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: r,
        y: s,
        placement: n
      } = e, {
        mainAxis: i = !0,
        crossAxis: o = !1,
        limiter: a = {
          fn: (k) => {
            let {
              x,
              y: $
            } = k;
            return {
              x,
              y: $
            };
          }
        },
        ...l
      } = rr(t, e), c = {
        x: r,
        y: s
      }, u = await pi(e, l), d = $t(ht(n)), m = wa(d);
      let p = c[m], b = c[d];
      if (i) {
        const k = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", $ = p + u[k], T = p - u[x];
        p = Ln($, p, T);
      }
      if (o) {
        const k = d === "y" ? "top" : "left", x = d === "y" ? "bottom" : "right", $ = b + u[k], T = b - u[x];
        b = Ln($, b, T);
      }
      const v = a.fn({
        ...e,
        [m]: p,
        [d]: b
      });
      return {
        ...v,
        data: {
          x: v.x - r,
          y: v.y - s
        }
      };
    }
  };
};
const Cu = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      const {
        placement: r,
        rects: s,
        platform: n,
        elements: i
      } = e, {
        apply: o = () => {
        },
        ...a
      } = rr(t, e), l = await pi(e, a), c = ht(r), u = sr(r), d = $t(r) === "y", {
        width: m,
        height: p
      } = s.floating;
      let b, v;
      c === "top" || c === "bottom" ? (b = c, v = u === (await (n.isRTL == null ? void 0 : n.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = c, b = u === "end" ? "top" : "bottom");
      const k = p - l.top - l.bottom, x = m - l.left - l.right, $ = Be(p - l[b], k), T = Be(m - l[v], x), M = !e.middlewareData.shift;
      let L = $, K = T;
      if (d ? K = u || M ? Be(T, x) : x : L = u || M ? Be($, k) : k, M && !u) {
        const Ce = we(l.left, 0), ge = we(l.right, 0), U = we(l.top, 0), F = we(l.bottom, 0);
        d ? K = m - 2 * (Ce !== 0 || ge !== 0 ? Ce + ge : we(l.left, l.right)) : L = p - 2 * (U !== 0 || F !== 0 ? U + F : we(l.top, l.bottom));
      }
      await o({
        ...e,
        availableWidth: K,
        availableHeight: L
      });
      const $e = await n.getDimensions(i.floating);
      return m !== $e.width || p !== $e.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function nr(t) {
  return xa(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function xe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function rt(t) {
  var e;
  return (e = (xa(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function xa(t) {
  return t instanceof Node || t instanceof xe(t).Node;
}
function De(t) {
  return t instanceof Element || t instanceof xe(t).Element;
}
function Ze(t) {
  return t instanceof HTMLElement || t instanceof xe(t).HTMLElement;
}
function ro(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof xe(t).ShadowRoot;
}
function Gr(t) {
  const {
    overflow: e,
    overflowX: r,
    overflowY: s,
    display: n
  } = Me(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + s + r) && !["inline", "contents"].includes(n);
}
function Au(t) {
  return ["table", "td", "th"].includes(nr(t));
}
function rn(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function mi(t) {
  const e = gi(), r = De(t) ? Me(t) : t;
  return r.transform !== "none" || r.perspective !== "none" || (r.containerType ? r.containerType !== "normal" : !1) || !e && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !e && (r.filter ? r.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((s) => (r.willChange || "").includes(s)) || ["paint", "layout", "strict", "content"].some((s) => (r.contain || "").includes(s));
}
function Eu(t) {
  let e = ft(t);
  for (; Ze(e) && !Kt(e); ) {
    if (mi(e))
      return e;
    if (rn(e))
      return null;
    e = ft(e);
  }
  return null;
}
function gi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Kt(t) {
  return ["html", "body", "#document"].includes(nr(t));
}
function Me(t) {
  return xe(t).getComputedStyle(t);
}
function sn(t) {
  return De(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function ft(t) {
  if (nr(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || ro(t) && t.host || rt(t);
  return ro(e) ? e.host : e;
}
function ka(t) {
  const e = ft(t);
  return Kt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ze(e) && Gr(e) ? e : ka(e);
}
function Sr(t, e, r) {
  var s;
  e === void 0 && (e = []), r === void 0 && (r = !0);
  const n = ka(t), i = n === ((s = t.ownerDocument) == null ? void 0 : s.body), o = xe(n);
  if (i) {
    const a = Dn(o);
    return e.concat(o, o.visualViewport || [], Gr(n) ? n : [], a && r ? Sr(a) : []);
  }
  return e.concat(n, Sr(n, [], r));
}
function Dn(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Sa(t) {
  const e = Me(t);
  let r = parseFloat(e.width) || 0, s = parseFloat(e.height) || 0;
  const n = Ze(t), i = n ? t.offsetWidth : r, o = n ? t.offsetHeight : s, a = As(r) !== i || As(s) !== o;
  return a && (r = i, s = o), {
    width: r,
    height: s,
    $: a
  };
}
function bi(t) {
  return De(t) ? t : t.contextElement;
}
function Vt(t) {
  const e = bi(t);
  if (!Ze(e))
    return dt(1);
  const r = e.getBoundingClientRect(), {
    width: s,
    height: n,
    $: i
  } = Sa(e);
  let o = (i ? As(r.width) : r.width) / s, a = (i ? As(r.height) : r.height) / n;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const Tu = /* @__PURE__ */ dt(0);
function $a(t) {
  const e = xe(t);
  return !gi() || !e.visualViewport ? Tu : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Ou(t, e, r) {
  return e === void 0 && (e = !1), !r || e && r !== xe(t) ? !1 : e;
}
function Ct(t, e, r, s) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  const n = t.getBoundingClientRect(), i = bi(t);
  let o = dt(1);
  e && (s ? De(s) && (o = Vt(s)) : o = Vt(t));
  const a = Ou(i, r, s) ? $a(i) : dt(0);
  let l = (n.left + a.x) / o.x, c = (n.top + a.y) / o.y, u = n.width / o.x, d = n.height / o.y;
  if (i) {
    const m = xe(i), p = s && De(s) ? xe(s) : s;
    let b = m, v = Dn(b);
    for (; v && s && p !== b; ) {
      const k = Vt(v), x = v.getBoundingClientRect(), $ = Me(v), T = x.left + (v.clientLeft + parseFloat($.paddingLeft)) * k.x, M = x.top + (v.clientTop + parseFloat($.paddingTop)) * k.y;
      l *= k.x, c *= k.y, u *= k.x, d *= k.y, l += T, c += M, b = xe(v), v = Dn(b);
    }
  }
  return Ts({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function Pu(t) {
  let {
    elements: e,
    rect: r,
    offsetParent: s,
    strategy: n
  } = t;
  const i = n === "fixed", o = rt(s), a = e ? rn(e.floating) : !1;
  if (s === o || a && i)
    return r;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = dt(1);
  const u = dt(0), d = Ze(s);
  if ((d || !d && !i) && ((nr(s) !== "body" || Gr(o)) && (l = sn(s)), Ze(s))) {
    const m = Ct(s);
    c = Vt(s), u.x = m.x + s.clientLeft, u.y = m.y + s.clientTop;
  }
  return {
    width: r.width * c.x,
    height: r.height * c.y,
    x: r.x * c.x - l.scrollLeft * c.x + u.x,
    y: r.y * c.y - l.scrollTop * c.y + u.y
  };
}
function Nu(t) {
  return Array.from(t.getClientRects());
}
function Ca(t) {
  return Ct(rt(t)).left + sn(t).scrollLeft;
}
function Ru(t) {
  const e = rt(t), r = sn(t), s = t.ownerDocument.body, n = we(e.scrollWidth, e.clientWidth, s.scrollWidth, s.clientWidth), i = we(e.scrollHeight, e.clientHeight, s.scrollHeight, s.clientHeight);
  let o = -r.scrollLeft + Ca(t);
  const a = -r.scrollTop;
  return Me(s).direction === "rtl" && (o += we(e.clientWidth, s.clientWidth) - n), {
    width: n,
    height: i,
    x: o,
    y: a
  };
}
function Lu(t, e) {
  const r = xe(t), s = rt(t), n = r.visualViewport;
  let i = s.clientWidth, o = s.clientHeight, a = 0, l = 0;
  if (n) {
    i = n.width, o = n.height;
    const c = gi();
    (!c || c && e === "fixed") && (a = n.offsetLeft, l = n.offsetTop);
  }
  return {
    width: i,
    height: o,
    x: a,
    y: l
  };
}
function Iu(t, e) {
  const r = Ct(t, !0, e === "fixed"), s = r.top + t.clientTop, n = r.left + t.clientLeft, i = Ze(t) ? Vt(t) : dt(1), o = t.clientWidth * i.x, a = t.clientHeight * i.y, l = n * i.x, c = s * i.y;
  return {
    width: o,
    height: a,
    x: l,
    y: c
  };
}
function so(t, e, r) {
  let s;
  if (e === "viewport")
    s = Lu(t, r);
  else if (e === "document")
    s = Ru(rt(t));
  else if (De(e))
    s = Iu(e, r);
  else {
    const n = $a(t);
    s = {
      ...e,
      x: e.x - n.x,
      y: e.y - n.y
    };
  }
  return Ts(s);
}
function Aa(t, e) {
  const r = ft(t);
  return r === e || !De(r) || Kt(r) ? !1 : Me(r).position === "fixed" || Aa(r, e);
}
function Du(t, e) {
  const r = e.get(t);
  if (r)
    return r;
  let s = Sr(t, [], !1).filter((a) => De(a) && nr(a) !== "body"), n = null;
  const i = Me(t).position === "fixed";
  let o = i ? ft(t) : t;
  for (; De(o) && !Kt(o); ) {
    const a = Me(o), l = mi(o);
    !l && a.position === "fixed" && (n = null), (i ? !l && !n : !l && a.position === "static" && !!n && ["absolute", "fixed"].includes(n.position) || Gr(o) && !l && Aa(t, o)) ? s = s.filter((u) => u !== o) : n = a, o = ft(o);
  }
  return e.set(t, s), s;
}
function Mu(t) {
  let {
    element: e,
    boundary: r,
    rootBoundary: s,
    strategy: n
  } = t;
  const o = [...r === "clippingAncestors" ? rn(e) ? [] : Du(e, this._c) : [].concat(r), s], a = o[0], l = o.reduce((c, u) => {
    const d = so(e, u, n);
    return c.top = we(d.top, c.top), c.right = Be(d.right, c.right), c.bottom = Be(d.bottom, c.bottom), c.left = we(d.left, c.left), c;
  }, so(e, a, n));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function zu(t) {
  const {
    width: e,
    height: r
  } = Sa(t);
  return {
    width: e,
    height: r
  };
}
function ju(t, e, r) {
  const s = Ze(e), n = rt(e), i = r === "fixed", o = Ct(t, !0, i, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = dt(0);
  if (s || !s && !i)
    if ((nr(e) !== "body" || Gr(n)) && (a = sn(e)), s) {
      const d = Ct(e, !0, i, e);
      l.x = d.x + e.clientLeft, l.y = d.y + e.clientTop;
    } else
      n && (l.x = Ca(n));
  const c = o.left + a.scrollLeft - l.x, u = o.top + a.scrollTop - l.y;
  return {
    x: c,
    y: u,
    width: o.width,
    height: o.height
  };
}
function gn(t) {
  return Me(t).position === "static";
}
function no(t, e) {
  return !Ze(t) || Me(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function Ea(t, e) {
  const r = xe(t);
  if (rn(t))
    return r;
  if (!Ze(t)) {
    let n = ft(t);
    for (; n && !Kt(n); ) {
      if (De(n) && !gn(n))
        return n;
      n = ft(n);
    }
    return r;
  }
  let s = no(t, e);
  for (; s && Au(s) && gn(s); )
    s = no(s, e);
  return s && Kt(s) && gn(s) && !mi(s) ? r : s || Eu(t) || r;
}
const Uu = async function(t) {
  const e = this.getOffsetParent || Ea, r = this.getDimensions, s = await r(t.floating);
  return {
    reference: ju(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }
  };
};
function Vu(t) {
  return Me(t).direction === "rtl";
}
const as = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Pu,
  getDocumentElement: rt,
  getClippingRect: Mu,
  getOffsetParent: Ea,
  getElementRects: Uu,
  getClientRects: Nu,
  getDimensions: zu,
  getScale: Vt,
  isElement: De,
  isRTL: Vu
};
function Bu(t, e) {
  let r = null, s;
  const n = rt(t);
  function i() {
    var a;
    clearTimeout(s), (a = r) == null || a.disconnect(), r = null;
  }
  function o(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), i();
    const {
      left: c,
      top: u,
      width: d,
      height: m
    } = t.getBoundingClientRect();
    if (a || e(), !d || !m)
      return;
    const p = ss(u), b = ss(n.clientWidth - (c + d)), v = ss(n.clientHeight - (u + m)), k = ss(c), $ = {
      rootMargin: -p + "px " + -b + "px " + -v + "px " + -k + "px",
      threshold: we(0, Be(1, l)) || 1
    };
    let T = !0;
    function M(L) {
      const K = L[0].intersectionRatio;
      if (K !== l) {
        if (!T)
          return o();
        K ? o(!1, K) : s = setTimeout(() => {
          o(!1, 1e-7);
        }, 1e3);
      }
      T = !1;
    }
    try {
      r = new IntersectionObserver(M, {
        ...$,
        root: n.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(M, $);
    }
    r.observe(t);
  }
  return o(!0), i;
}
function Fu(t, e, r, s) {
  s === void 0 && (s = {});
  const {
    ancestorScroll: n = !0,
    ancestorResize: i = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = s, c = bi(t), u = n || i ? [...c ? Sr(c) : [], ...Sr(e)] : [];
  u.forEach((x) => {
    n && x.addEventListener("scroll", r, {
      passive: !0
    }), i && x.addEventListener("resize", r);
  });
  const d = c && a ? Bu(c, r) : null;
  let m = -1, p = null;
  o && (p = new ResizeObserver((x) => {
    let [$] = x;
    $ && $.target === c && p && (p.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var T;
      (T = p) == null || T.observe(e);
    })), r();
  }), c && !l && p.observe(c), p.observe(e));
  let b, v = l ? Ct(t) : null;
  l && k();
  function k() {
    const x = Ct(t);
    v && (x.x !== v.x || x.y !== v.y || x.width !== v.width || x.height !== v.height) && r(), v = x, b = requestAnimationFrame(k);
  }
  return r(), () => {
    var x;
    u.forEach(($) => {
      n && $.removeEventListener("scroll", r), i && $.removeEventListener("resize", r);
    }), d?.(), (x = p) == null || x.disconnect(), p = null, l && cancelAnimationFrame(b);
  };
}
const Zu = Su, Hu = $u, Wu = xu, io = Cu, Gu = _u, qu = (t, e, r) => {
  const s = /* @__PURE__ */ new Map(), n = {
    platform: as,
    ...r
  }, i = {
    ...n.platform,
    _c: s
  };
  return wu(t, e, {
    ...n,
    platform: i
  });
};
function Ku(t) {
  return Yu(t);
}
function bn(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function Yu(t) {
  for (let e = t; e; e = bn(e))
    if (e instanceof Element && getComputedStyle(e).display === "none")
      return null;
  for (let e = bn(t); e; e = bn(e)) {
    if (!(e instanceof Element))
      continue;
    const r = getComputedStyle(e);
    if (r.display !== "contents" && (r.position !== "static" || r.filter !== "none" || e.tagName === "BODY"))
      return e;
  }
  return null;
}
function Ju(t) {
  return t !== null && typeof t == "object" && "getBoundingClientRect" in t && ("contextElement" in t ? t instanceof Element : !0);
}
var W = class extends ie {
  constructor() {
    super(...arguments), this.active = !1, this.placement = "top", this.strategy = "absolute", this.distance = 0, this.skidding = 0, this.arrow = !1, this.arrowPlacement = "anchor", this.arrowPadding = 10, this.flip = !1, this.flipFallbackPlacements = "", this.flipFallbackStrategy = "best-fit", this.flipPadding = 0, this.shift = !1, this.shiftPadding = 0, this.autoSizePadding = 0, this.hoverBridge = !1, this.updateHoverBridge = () => {
      if (this.hoverBridge && this.anchorEl) {
        const t = this.anchorEl.getBoundingClientRect(), e = this.popup.getBoundingClientRect(), r = this.placement.includes("top") || this.placement.includes("bottom");
        let s = 0, n = 0, i = 0, o = 0, a = 0, l = 0, c = 0, u = 0;
        r ? t.top < e.top ? (s = t.left, n = t.bottom, i = t.right, o = t.bottom, a = e.left, l = e.top, c = e.right, u = e.top) : (s = e.left, n = e.bottom, i = e.right, o = e.bottom, a = t.left, l = t.top, c = t.right, u = t.top) : t.left < e.left ? (s = t.right, n = t.top, i = e.left, o = e.top, a = t.right, l = t.bottom, c = e.left, u = e.bottom) : (s = e.right, n = e.top, i = t.left, o = t.top, a = e.right, l = e.bottom, c = t.left, u = t.bottom), this.style.setProperty("--hover-bridge-top-left-x", `${s}px`), this.style.setProperty("--hover-bridge-top-left-y", `${n}px`), this.style.setProperty("--hover-bridge-top-right-x", `${i}px`), this.style.setProperty("--hover-bridge-top-right-y", `${o}px`), this.style.setProperty("--hover-bridge-bottom-left-x", `${a}px`), this.style.setProperty("--hover-bridge-bottom-left-y", `${l}px`), this.style.setProperty("--hover-bridge-bottom-right-x", `${c}px`), this.style.setProperty("--hover-bridge-bottom-right-y", `${u}px`);
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stop();
  }
  async updated(t) {
    super.updated(t), t.has("active") && (this.active ? this.start() : this.stop()), t.has("anchor") && this.handleAnchorChange(), this.active && (await this.updateComplete, this.reposition());
  }
  async handleAnchorChange() {
    if (await this.stop(), this.anchor && typeof this.anchor == "string") {
      const t = this.getRootNode();
      this.anchorEl = t.getElementById(this.anchor);
    } else
      this.anchor instanceof Element || Ju(this.anchor) ? this.anchorEl = this.anchor : this.anchorEl = this.querySelector('[slot="anchor"]');
    this.anchorEl instanceof HTMLSlotElement && (this.anchorEl = this.anchorEl.assignedElements({ flatten: !0 })[0]), this.anchorEl && this.start();
  }
  start() {
    !this.anchorEl || (this.cleanup = Fu(this.anchorEl, this.popup, () => {
      this.reposition();
    }));
  }
  async stop() {
    return new Promise((t) => {
      this.cleanup ? (this.cleanup(), this.cleanup = void 0, this.removeAttribute("data-current-placement"), this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height"), requestAnimationFrame(() => t())) : t();
    });
  }
  reposition() {
    if (!this.active || !this.anchorEl)
      return;
    const t = [
      Zu({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    this.sync ? t.push(
      io({
        apply: ({ rects: r }) => {
          const s = this.sync === "width" || this.sync === "both", n = this.sync === "height" || this.sync === "both";
          this.popup.style.width = s ? `${r.reference.width}px` : "", this.popup.style.height = n ? `${r.reference.height}px` : "";
        }
      })
    ) : (this.popup.style.width = "", this.popup.style.height = ""), this.flip && t.push(
      Wu({
        boundary: this.flipBoundary,
        fallbackPlacements: this.flipFallbackPlacements,
        fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
        padding: this.flipPadding
      })
    ), this.shift && t.push(
      Hu({
        boundary: this.shiftBoundary,
        padding: this.shiftPadding
      })
    ), this.autoSize ? t.push(
      io({
        boundary: this.autoSizeBoundary,
        padding: this.autoSizePadding,
        apply: ({ availableWidth: r, availableHeight: s }) => {
          this.autoSize === "vertical" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-height", `${s}px`) : this.style.removeProperty("--auto-size-available-height"), this.autoSize === "horizontal" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-width", `${r}px`) : this.style.removeProperty("--auto-size-available-width");
        }
      })
    ) : (this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height")), this.arrow && t.push(
      Gu({
        element: this.arrowEl,
        padding: this.arrowPadding
      })
    );
    const e = this.strategy === "absolute" ? (r) => as.getOffsetParent(r, Ku) : as.getOffsetParent;
    qu(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware: t,
      strategy: this.strategy,
      platform: Qs(vt({}, as), {
        getOffsetParent: e
      })
    }).then(({ x: r, y: s, middlewareData: n, placement: i }) => {
      const o = this.matches(":dir(rtl)"), a = { top: "bottom", right: "left", bottom: "top", left: "right" }[i.split("-")[0]];
      if (this.setAttribute("data-current-placement", i), Object.assign(this.popup.style, {
        left: `${r}px`,
        top: `${s}px`
      }), this.arrow) {
        const l = n.arrow.x, c = n.arrow.y;
        let u = "", d = "", m = "", p = "";
        if (this.arrowPlacement === "start") {
          const b = typeof l == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          u = typeof c == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "", d = o ? b : "", p = o ? "" : b;
        } else if (this.arrowPlacement === "end") {
          const b = typeof l == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          d = o ? "" : b, p = o ? b : "", m = typeof c == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else
          this.arrowPlacement === "center" ? (p = typeof l == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "", u = typeof c == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "") : (p = typeof l == "number" ? `${l}px` : "", u = typeof c == "number" ? `${c}px` : "");
        Object.assign(this.arrowEl.style, {
          top: u,
          right: d,
          bottom: m,
          left: p,
          [a]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    }), requestAnimationFrame(() => this.updateHoverBridge()), this.emit("sl-reposition");
  }
  render() {
    return z`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${fe({
      "popup-hover-bridge": !0,
      "popup-hover-bridge--visible": this.hoverBridge && this.active
    })}
      ></span>

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
        ${this.arrow ? z`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
W.styles = [ve, hu];
h([
  ae(".popup")
], W.prototype, "popup", 2);
h([
  ae(".popup__arrow")
], W.prototype, "arrowEl", 2);
h([
  f()
], W.prototype, "anchor", 2);
h([
  f({ type: Boolean, reflect: !0 })
], W.prototype, "active", 2);
h([
  f({ reflect: !0 })
], W.prototype, "placement", 2);
h([
  f({ reflect: !0 })
], W.prototype, "strategy", 2);
h([
  f({ type: Number })
], W.prototype, "distance", 2);
h([
  f({ type: Number })
], W.prototype, "skidding", 2);
h([
  f({ type: Boolean })
], W.prototype, "arrow", 2);
h([
  f({ attribute: "arrow-placement" })
], W.prototype, "arrowPlacement", 2);
h([
  f({ attribute: "arrow-padding", type: Number })
], W.prototype, "arrowPadding", 2);
h([
  f({ type: Boolean })
], W.prototype, "flip", 2);
h([
  f({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (t) => t.split(" ").map((e) => e.trim()).filter((e) => e !== ""),
      toAttribute: (t) => t.join(" ")
    }
  })
], W.prototype, "flipFallbackPlacements", 2);
h([
  f({ attribute: "flip-fallback-strategy" })
], W.prototype, "flipFallbackStrategy", 2);
h([
  f({ type: Object })
], W.prototype, "flipBoundary", 2);
h([
  f({ attribute: "flip-padding", type: Number })
], W.prototype, "flipPadding", 2);
h([
  f({ type: Boolean })
], W.prototype, "shift", 2);
h([
  f({ type: Object })
], W.prototype, "shiftBoundary", 2);
h([
  f({ attribute: "shift-padding", type: Number })
], W.prototype, "shiftPadding", 2);
h([
  f({ attribute: "auto-size" })
], W.prototype, "autoSize", 2);
h([
  f()
], W.prototype, "sync", 2);
h([
  f({ type: Object })
], W.prototype, "autoSizeBoundary", 2);
h([
  f({ attribute: "auto-size-padding", type: Number })
], W.prototype, "autoSizePadding", 2);
h([
  f({ attribute: "hover-bridge", type: Boolean })
], W.prototype, "hoverBridge", 2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Mn extends oi {
  constructor(e) {
    if (super(e), this.it = te, e.type !== it.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === te || e == null)
      return this._t = void 0, this.it = e;
    if (e === Te)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it)
      return this._t;
    this.it = e;
    const r = [e];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
Mn.directiveName = "unsafeHTML", Mn.resultType = 1;
const Xu = ii(Mn);
var D = class extends ie {
  constructor() {
    super(...arguments), this.formControlController = new ui(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    }), this.hasSlotController = new tn(this, "help-text", "label"), this.localize = new tt(this), this.typeToSelectString = "", this.hasFocus = !1, this.displayLabel = "", this.selectedOptions = [], this.name = "", this.value = "", this.defaultValue = "", this.size = "medium", this.placeholder = "", this.multiple = !1, this.maxOptionsVisible = 3, this.disabled = !1, this.clearable = !1, this.open = !1, this.hoist = !1, this.filled = !1, this.pill = !1, this.label = "", this.placement = "bottom", this.helpText = "", this.form = "", this.required = !1, this.getTag = (t) => z`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${(e) => this.handleTagRemove(e, t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `, this.handleDocumentFocusIn = (t) => {
      const e = t.composedPath();
      this && !e.includes(this) && this.hide();
    }, this.handleDocumentKeyDown = (t) => {
      const e = t.target, r = e.closest(".select__clear") !== null, s = e.closest("sl-icon-button") !== null;
      if (!(r || s)) {
        if (t.key === "Escape" && this.open && !this.closeWatcher && (t.preventDefault(), t.stopPropagation(), this.hide(), this.displayInput.focus({ preventScroll: !0 })), t.key === "Enter" || t.key === " " && this.typeToSelectString === "") {
          if (t.preventDefault(), t.stopImmediatePropagation(), !this.open) {
            this.show();
            return;
          }
          this.currentOption && !this.currentOption.disabled && (this.multiple ? this.toggleOptionSelection(this.currentOption) : this.setSelectedOptions(this.currentOption), this.updateComplete.then(() => {
            this.emit("sl-input"), this.emit("sl-change");
          }), this.multiple || (this.hide(), this.displayInput.focus({ preventScroll: !0 })));
          return;
        }
        if (["ArrowUp", "ArrowDown", "Home", "End"].includes(t.key)) {
          const n = this.getAllOptions(), i = n.indexOf(this.currentOption);
          let o = Math.max(0, i);
          if (t.preventDefault(), !this.open && (this.show(), this.currentOption))
            return;
          t.key === "ArrowDown" ? (o = i + 1, o > n.length - 1 && (o = 0)) : t.key === "ArrowUp" ? (o = i - 1, o < 0 && (o = n.length - 1)) : t.key === "Home" ? o = 0 : t.key === "End" && (o = n.length - 1), this.setCurrentOption(n[o]);
        }
        if (t.key.length === 1 || t.key === "Backspace") {
          const n = this.getAllOptions();
          if (t.metaKey || t.ctrlKey || t.altKey)
            return;
          if (!this.open) {
            if (t.key === "Backspace")
              return;
            this.show();
          }
          t.stopPropagation(), t.preventDefault(), clearTimeout(this.typeToSelectTimeout), this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3), t.key === "Backspace" ? this.typeToSelectString = this.typeToSelectString.slice(0, -1) : this.typeToSelectString += t.key.toLowerCase();
          for (const i of n)
            if (i.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)) {
              this.setCurrentOption(i);
              break;
            }
        }
      }
    }, this.handleDocumentMouseDown = (t) => {
      const e = t.composedPath();
      this && !e.includes(this) && this.hide();
    };
  }
  get validity() {
    return this.valueInput.validity;
  }
  get validationMessage() {
    return this.valueInput.validationMessage;
  }
  connectedCallback() {
    super.connectedCallback(), this.open = !1;
  }
  addOpenListeners() {
    var t;
    document.addEventListener("focusin", this.handleDocumentFocusIn), document.addEventListener("keydown", this.handleDocumentKeyDown), document.addEventListener("mousedown", this.handleDocumentMouseDown), this.getRootNode() !== document && this.getRootNode().addEventListener("focusin", this.handleDocumentFocusIn), "CloseWatcher" in window && ((t = this.closeWatcher) == null || t.destroy(), this.closeWatcher = new CloseWatcher(), this.closeWatcher.onclose = () => {
      this.open && (this.hide(), this.displayInput.focus({ preventScroll: !0 }));
    });
  }
  removeOpenListeners() {
    var t;
    document.removeEventListener("focusin", this.handleDocumentFocusIn), document.removeEventListener("keydown", this.handleDocumentKeyDown), document.removeEventListener("mousedown", this.handleDocumentMouseDown), this.getRootNode() !== document && this.getRootNode().removeEventListener("focusin", this.handleDocumentFocusIn), (t = this.closeWatcher) == null || t.destroy();
  }
  handleFocus() {
    this.hasFocus = !0, this.displayInput.setSelectionRange(0, 0), this.emit("sl-focus");
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleLabelClick() {
    this.displayInput.focus();
  }
  handleComboboxMouseDown(t) {
    const r = t.composedPath().some((s) => s instanceof Element && s.tagName.toLowerCase() === "sl-icon-button");
    this.disabled || r || (t.preventDefault(), this.displayInput.focus({ preventScroll: !0 }), this.open = !this.open);
  }
  handleComboboxKeyDown(t) {
    t.key !== "Tab" && (t.stopPropagation(), this.handleDocumentKeyDown(t));
  }
  handleClearClick(t) {
    t.stopPropagation(), this.value !== "" && (this.setSelectedOptions([]), this.displayInput.focus({ preventScroll: !0 }), this.updateComplete.then(() => {
      this.emit("sl-clear"), this.emit("sl-input"), this.emit("sl-change");
    }));
  }
  handleClearMouseDown(t) {
    t.stopPropagation(), t.preventDefault();
  }
  handleOptionClick(t) {
    const r = t.target.closest("sl-option"), s = this.value;
    r && !r.disabled && (this.multiple ? this.toggleOptionSelection(r) : this.setSelectedOptions(r), this.updateComplete.then(() => this.displayInput.focus({ preventScroll: !0 })), this.value !== s && this.updateComplete.then(() => {
      this.emit("sl-input"), this.emit("sl-change");
    }), this.multiple || (this.hide(), this.displayInput.focus({ preventScroll: !0 })));
  }
  handleDefaultSlotChange() {
    const t = this.getAllOptions(), e = Array.isArray(this.value) ? this.value : [this.value], r = [];
    customElements.get("sl-option") ? (t.forEach((s) => r.push(s.value)), this.setSelectedOptions(t.filter((s) => e.includes(s.value)))) : customElements.whenDefined("sl-option").then(() => this.handleDefaultSlotChange());
  }
  handleTagRemove(t, e) {
    t.stopPropagation(), this.disabled || (this.toggleOptionSelection(e, !1), this.updateComplete.then(() => {
      this.emit("sl-input"), this.emit("sl-change");
    }));
  }
  getAllOptions() {
    return [...this.querySelectorAll("sl-option")];
  }
  getFirstOption() {
    return this.querySelector("sl-option");
  }
  setCurrentOption(t) {
    this.getAllOptions().forEach((r) => {
      r.current = !1, r.tabIndex = -1;
    }), t && (this.currentOption = t, t.current = !0, t.tabIndex = 0, t.focus());
  }
  setSelectedOptions(t) {
    const e = this.getAllOptions(), r = Array.isArray(t) ? t : [t];
    e.forEach((s) => s.selected = !1), r.length && r.forEach((s) => s.selected = !0), this.selectionChanged();
  }
  toggleOptionSelection(t, e) {
    e === !0 || e === !1 ? t.selected = e : t.selected = !t.selected, this.selectionChanged();
  }
  selectionChanged() {
    var t, e, r, s;
    this.selectedOptions = this.getAllOptions().filter((n) => n.selected), this.multiple ? (this.value = this.selectedOptions.map((n) => n.value), this.placeholder && this.value.length === 0 ? this.displayLabel = "" : this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length)) : (this.value = (e = (t = this.selectedOptions[0]) == null ? void 0 : t.value) != null ? e : "", this.displayLabel = (s = (r = this.selectedOptions[0]) == null ? void 0 : r.getTextLabel()) != null ? s : ""), this.updateComplete.then(() => {
      this.formControlController.updateValidity();
    });
  }
  get tags() {
    return this.selectedOptions.map((t, e) => {
      if (e < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        const r = this.getTag(t, e);
        return z`<div @sl-remove=${(s) => this.handleTagRemove(s, t)}>
          ${typeof r == "string" ? Xu(r) : r}
        </div>`;
      } else if (e === this.maxOptionsVisible)
        return z`<sl-tag size=${this.size}>+${this.selectedOptions.length - e}</sl-tag>`;
      return z``;
    });
  }
  handleInvalid(t) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(t);
  }
  handleDisabledChange() {
    this.disabled && (this.open = !1, this.handleOpenChange());
  }
  handleValueChange() {
    const t = this.getAllOptions(), e = Array.isArray(this.value) ? this.value : [this.value];
    this.setSelectedOptions(t.filter((r) => e.includes(r.value)));
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption()), this.emit("sl-show"), this.addOpenListeners(), await Cs(this), this.listbox.hidden = !1, this.popup.active = !0, requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      const { keyframes: t, options: e } = ks(this, "select.show", { dir: this.localize.dir() });
      await $s(this.popup.popup, t, e), this.currentOption && Rn(this.currentOption, this.listbox, "vertical", "auto"), this.emit("sl-after-show");
    } else {
      this.emit("sl-hide"), this.removeOpenListeners(), await Cs(this);
      const { keyframes: t, options: e } = ks(this, "select.hide", { dir: this.localize.dir() });
      await $s(this.popup.popup, t, e), this.listbox.hidden = !0, this.popup.active = !1, this.emit("sl-after-hide");
    }
  }
  async show() {
    if (this.open || this.disabled) {
      this.open = !1;
      return;
    }
    return this.open = !0, Ss(this, "sl-after-show");
  }
  async hide() {
    if (!this.open || this.disabled) {
      this.open = !1;
      return;
    }
    return this.open = !1, Ss(this, "sl-after-hide");
  }
  checkValidity() {
    return this.valueInput.checkValidity();
  }
  getForm() {
    return this.formControlController.getForm();
  }
  reportValidity() {
    return this.valueInput.reportValidity();
  }
  setCustomValidity(t) {
    this.valueInput.setCustomValidity(t), this.formControlController.updateValidity();
  }
  focus(t) {
    this.displayInput.focus(t);
  }
  blur() {
    this.displayInput.blur();
  }
  render() {
    const t = this.hasSlotController.test("label"), e = this.hasSlotController.test("help-text"), r = this.label ? !0 : !!t, s = this.helpText ? !0 : !!e, n = this.clearable && !this.disabled && this.value.length > 0, i = this.placeholder && this.value.length === 0;
    return z`
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
      "select--placeholder-visible": i,
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

              ${this.multiple ? z`<div part="tags" class="select__tags">${this.tags}</div>` : ""}

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

              ${n ? z`
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

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
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
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
D.styles = [ve, ya, uu];
D.dependencies = {
  "sl-icon": me,
  "sl-popup": W,
  "sl-tag": Tt
};
h([
  ae(".select")
], D.prototype, "popup", 2);
h([
  ae(".select__combobox")
], D.prototype, "combobox", 2);
h([
  ae(".select__display-input")
], D.prototype, "displayInput", 2);
h([
  ae(".select__value-input")
], D.prototype, "valueInput", 2);
h([
  ae(".select__listbox")
], D.prototype, "listbox", 2);
h([
  ye()
], D.prototype, "hasFocus", 2);
h([
  ye()
], D.prototype, "displayLabel", 2);
h([
  ye()
], D.prototype, "currentOption", 2);
h([
  ye()
], D.prototype, "selectedOptions", 2);
h([
  f()
], D.prototype, "name", 2);
h([
  f({
    converter: {
      fromAttribute: (t) => t.split(" "),
      toAttribute: (t) => t.join(" ")
    }
  })
], D.prototype, "value", 2);
h([
  va()
], D.prototype, "defaultValue", 2);
h([
  f({ reflect: !0 })
], D.prototype, "size", 2);
h([
  f()
], D.prototype, "placeholder", 2);
h([
  f({ type: Boolean, reflect: !0 })
], D.prototype, "multiple", 2);
h([
  f({ attribute: "max-options-visible", type: Number })
], D.prototype, "maxOptionsVisible", 2);
h([
  f({ type: Boolean, reflect: !0 })
], D.prototype, "disabled", 2);
h([
  f({ type: Boolean })
], D.prototype, "clearable", 2);
h([
  f({ type: Boolean, reflect: !0 })
], D.prototype, "open", 2);
h([
  f({ type: Boolean })
], D.prototype, "hoist", 2);
h([
  f({ type: Boolean, reflect: !0 })
], D.prototype, "filled", 2);
h([
  f({ type: Boolean, reflect: !0 })
], D.prototype, "pill", 2);
h([
  f()
], D.prototype, "label", 2);
h([
  f({ reflect: !0 })
], D.prototype, "placement", 2);
h([
  f({ attribute: "help-text" })
], D.prototype, "helpText", 2);
h([
  f({ reflect: !0 })
], D.prototype, "form", 2);
h([
  f({ type: Boolean, reflect: !0 })
], D.prototype, "required", 2);
h([
  f()
], D.prototype, "getTag", 2);
h([
  re("disabled", { waitUntilFirstUpdate: !0 })
], D.prototype, "handleDisabledChange", 1);
h([
  re("value", { waitUntilFirstUpdate: !0 })
], D.prototype, "handleValueChange", 1);
h([
  re("open", { waitUntilFirstUpdate: !0 })
], D.prototype, "handleOpenChange", 1);
en("select.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
en("select.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});
D.define("sl-select");
var Qu = ue`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
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
`, Ne = class extends ie {
  constructor() {
    super(...arguments), this.localize = new tt(this), this.current = !1, this.selected = !1, this.hasHover = !1, this.value = "", this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "option"), this.setAttribute("aria-selected", "false");
  }
  handleDefaultSlotChange() {
    const t = this.getTextLabel();
    if (typeof this.cachedTextLabel > "u") {
      this.cachedTextLabel = t;
      return;
    }
    t !== this.cachedTextLabel && (this.cachedTextLabel = t, this.emit("slotchange", { bubbles: !0, composed: !1, cancelable: !1 }));
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
    typeof this.value != "string" && (this.value = String(this.value)), this.value.includes(" ") && (console.error("Option values cannot include a space. All spaces have been replaced with underscores.", this), this.value = this.value.replace(/ /g, "_"));
  }
  getTextLabel() {
    const t = this.childNodes;
    let e = "";
    return [...t].forEach((r) => {
      r.nodeType === Node.ELEMENT_NODE && (r.hasAttribute("slot") || (e += r.textContent)), r.nodeType === Node.TEXT_NODE && (e += r.textContent);
    }), e.trim();
  }
  render() {
    return z`
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
Ne.styles = [ve, Qu];
Ne.dependencies = { "sl-icon": me };
h([
  ae(".option__label")
], Ne.prototype, "defaultSlot", 2);
h([
  ye()
], Ne.prototype, "current", 2);
h([
  ye()
], Ne.prototype, "selected", 2);
h([
  ye()
], Ne.prototype, "hasHover", 2);
h([
  f({ reflect: !0 })
], Ne.prototype, "value", 2);
h([
  f({ type: Boolean, reflect: !0 })
], Ne.prototype, "disabled", 2);
h([
  re("disabled")
], Ne.prototype, "handleDisabledChange", 1);
h([
  re("selected")
], Ne.prototype, "handleSelectedChange", 1);
h([
  re("value")
], Ne.prototype, "handleValueChange", 1);
Ne.define("sl-option");
var ed = ue`
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
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
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
`, Se = class extends ie {
  constructor() {
    super(...arguments), this.localize = new tt(this), this.tabs = [], this.focusableTabs = [], this.panels = [], this.hasScrollControls = !1, this.placement = "top", this.activation = "auto", this.noScrollControls = !1;
  }
  connectedCallback() {
    const t = Promise.all([
      customElements.whenDefined("sl-tab"),
      customElements.whenDefined("sl-tab-panel")
    ]);
    super.connectedCallback(), this.resizeObserver = new ResizeObserver(() => {
      this.repositionIndicator(), this.updateScrollControls();
    }), this.mutationObserver = new MutationObserver((e) => {
      e.some((r) => !["aria-labelledby", "aria-controls"].includes(r.attributeName)) && setTimeout(() => this.setAriaLabels()), e.some((r) => r.attributeName === "disabled") && this.syncTabsAndPanels();
    }), this.updateComplete.then(() => {
      this.syncTabsAndPanels(), this.mutationObserver.observe(this, { attributes: !0, childList: !0, subtree: !0 }), this.resizeObserver.observe(this.nav), t.then(() => {
        new IntersectionObserver((r, s) => {
          var n;
          r[0].intersectionRatio > 0 && (this.setAriaLabels(), this.setActiveTab((n = this.getActiveTab()) != null ? n : this.tabs[0], { emitEvents: !1 }), s.unobserve(r[0].target));
        }).observe(this.tabGroup);
      });
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver.disconnect(), this.resizeObserver.unobserve(this.nav);
  }
  getAllTabs() {
    return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements();
  }
  getAllPanels() {
    return [...this.body.assignedElements()].filter((t) => t.tagName.toLowerCase() === "sl-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((t) => t.active);
  }
  handleClick(t) {
    const r = t.target.closest("sl-tab");
    r?.closest("sl-tab-group") === this && r !== null && this.setActiveTab(r, { scrollBehavior: "smooth" });
  }
  handleKeyDown(t) {
    const r = t.target.closest("sl-tab");
    if (r?.closest("sl-tab-group") === this && (["Enter", " "].includes(t.key) && r !== null && (this.setActiveTab(r, { scrollBehavior: "smooth" }), t.preventDefault()), ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(t.key))) {
      const n = this.tabs.find((a) => a.matches(":focus")), i = this.matches(":dir(rtl)");
      let o = null;
      if (n?.tagName.toLowerCase() === "sl-tab") {
        if (t.key === "Home")
          o = this.focusableTabs[0];
        else if (t.key === "End")
          o = this.focusableTabs[this.focusableTabs.length - 1];
        else if (["top", "bottom"].includes(this.placement) && t.key === (i ? "ArrowRight" : "ArrowLeft") || ["start", "end"].includes(this.placement) && t.key === "ArrowUp") {
          const a = this.tabs.findIndex((l) => l === n);
          o = this.findNextFocusableTab(a, "backward");
        } else if (["top", "bottom"].includes(this.placement) && t.key === (i ? "ArrowLeft" : "ArrowRight") || ["start", "end"].includes(this.placement) && t.key === "ArrowDown") {
          const a = this.tabs.findIndex((l) => l === n);
          o = this.findNextFocusableTab(a, "forward");
        }
        if (!o)
          return;
        o.tabIndex = 0, o.focus({ preventScroll: !0 }), this.activation === "auto" ? this.setActiveTab(o, { scrollBehavior: "smooth" }) : this.tabs.forEach((a) => {
          a.tabIndex = a === o ? 0 : -1;
        }), ["top", "bottom"].includes(this.placement) && Rn(o, this.nav, "horizontal"), t.preventDefault();
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
  setActiveTab(t, e) {
    if (e = vt({
      emitEvents: !0,
      scrollBehavior: "auto"
    }, e), t !== this.activeTab && !t.disabled) {
      const r = this.activeTab;
      this.activeTab = t, this.tabs.forEach((s) => {
        s.active = s === this.activeTab, s.tabIndex = s === this.activeTab ? 0 : -1;
      }), this.panels.forEach((s) => {
        var n;
        return s.active = s.name === ((n = this.activeTab) == null ? void 0 : n.panel);
      }), this.syncIndicator(), ["top", "bottom"].includes(this.placement) && Rn(this.activeTab, this.nav, "horizontal", e.scrollBehavior), e.emitEvents && (r && this.emit("sl-tab-hide", { detail: { name: r.panel } }), this.emit("sl-tab-show", { detail: { name: this.activeTab.panel } }));
    }
  }
  setAriaLabels() {
    this.tabs.forEach((t) => {
      const e = this.panels.find((r) => r.name === t.panel);
      e && (t.setAttribute("aria-controls", e.getAttribute("id")), e.setAttribute("aria-labelledby", t.getAttribute("id")));
    });
  }
  repositionIndicator() {
    const t = this.getActiveTab();
    if (!t)
      return;
    const e = t.clientWidth, r = t.clientHeight, s = this.matches(":dir(rtl)"), n = this.getAllTabs(), o = n.slice(0, n.indexOf(t)).reduce(
      (a, l) => ({
        left: a.left + l.clientWidth,
        top: a.top + l.clientHeight
      }),
      { left: 0, top: 0 }
    );
    switch (this.placement) {
      case "top":
      case "bottom":
        this.indicator.style.width = `${e}px`, this.indicator.style.height = "auto", this.indicator.style.translate = s ? `${-1 * o.left}px` : `${o.left}px`;
        break;
      case "start":
      case "end":
        this.indicator.style.width = "auto", this.indicator.style.height = `${r}px`, this.indicator.style.translate = `0 ${o.top}px`;
        break;
    }
  }
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs(), this.focusableTabs = this.tabs.filter((t) => !t.disabled), this.panels = this.getAllPanels(), this.syncIndicator(), this.updateComplete.then(() => this.updateScrollControls());
  }
  findNextFocusableTab(t, e) {
    let r = null;
    const s = e === "forward" ? 1 : -1;
    let n = t + s;
    for (; t < this.tabs.length; ) {
      if (r = this.tabs[n] || null, r === null) {
        e === "forward" ? r = this.focusableTabs[0] : r = this.focusableTabs[this.focusableTabs.length - 1];
        break;
      }
      if (!r.disabled)
        break;
      n += s;
    }
    return r;
  }
  updateScrollControls() {
    this.noScrollControls ? this.hasScrollControls = !1 : this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth + 1;
  }
  syncIndicator() {
    this.getActiveTab() ? (this.indicator.style.display = "block", this.repositionIndicator()) : this.indicator.style.display = "none";
  }
  show(t) {
    const e = this.tabs.find((r) => r.panel === t);
    e && this.setActiveTab(e, { scrollBehavior: "smooth" });
  }
  render() {
    const t = this.matches(":dir(rtl)");
    return z`
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
          ${this.hasScrollControls ? z`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${t ? "chevron-right" : "chevron-left"}
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

          ${this.hasScrollControls ? z`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${t ? "chevron-left" : "chevron-right"}
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
Se.styles = [ve, ed];
Se.dependencies = { "sl-icon-button": de };
h([
  ae(".tab-group")
], Se.prototype, "tabGroup", 2);
h([
  ae(".tab-group__body")
], Se.prototype, "body", 2);
h([
  ae(".tab-group__nav")
], Se.prototype, "nav", 2);
h([
  ae(".tab-group__indicator")
], Se.prototype, "indicator", 2);
h([
  ye()
], Se.prototype, "hasScrollControls", 2);
h([
  f()
], Se.prototype, "placement", 2);
h([
  f()
], Se.prototype, "activation", 2);
h([
  f({ attribute: "no-scroll-controls", type: Boolean })
], Se.prototype, "noScrollControls", 2);
h([
  re("noScrollControls", { waitUntilFirstUpdate: !0 })
], Se.prototype, "updateScrollControls", 1);
h([
  re("placement", { waitUntilFirstUpdate: !0 })
], Se.prototype, "syncIndicator", 1);
Se.define("sl-tab-group");
var td = ue`
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
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible):not([disabled]) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus-visible) {
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
`, rd = 0, je = class extends ie {
  constructor() {
    super(...arguments), this.localize = new tt(this), this.attrId = ++rd, this.componentId = `sl-tab-${this.attrId}`, this.panel = "", this.active = !1, this.closable = !1, this.disabled = !1, this.tabIndex = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "tab");
  }
  handleCloseClick(t) {
    t.stopPropagation(), this.emit("sl-close");
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false"), this.disabled && !this.active ? this.tabIndex = -1 : this.tabIndex = 0;
  }
  render() {
    return this.id = this.id.length > 0 ? this.id : this.componentId, z`
      <div
        part="base"
        class=${fe({
      tab: !0,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
      >
        <slot></slot>
        ${this.closable ? z`
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
je.styles = [ve, td];
je.dependencies = { "sl-icon-button": de };
h([
  ae(".tab")
], je.prototype, "tab", 2);
h([
  f({ reflect: !0 })
], je.prototype, "panel", 2);
h([
  f({ type: Boolean, reflect: !0 })
], je.prototype, "active", 2);
h([
  f({ type: Boolean, reflect: !0 })
], je.prototype, "closable", 2);
h([
  f({ type: Boolean, reflect: !0 })
], je.prototype, "disabled", 2);
h([
  f({ type: Number, reflect: !0 })
], je.prototype, "tabIndex", 2);
h([
  re("active")
], je.prototype, "handleActiveChange", 1);
h([
  re("disabled")
], je.prototype, "handleDisabledChange", 1);
je.define("sl-tab");
var sd = ue`
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
`, nd = 0, qr = class extends ie {
  constructor() {
    super(...arguments), this.attrId = ++nd, this.componentId = `sl-tab-panel-${this.attrId}`, this.name = "", this.active = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.id = this.id.length > 0 ? this.id : this.componentId, this.setAttribute("role", "tabpanel");
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return z`
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
qr.styles = [ve, sd];
h([
  f({ reflect: !0 })
], qr.prototype, "name", 2);
h([
  f({ type: Boolean, reflect: !0 })
], qr.prototype, "active", 2);
h([
  re("active")
], qr.prototype, "handleActiveChange", 1);
qr.define("sl-tab-panel");
On("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/dist");
const id = `main.app{background-color:var(--bg-color);border-color:var(--border-color);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.top-bar h1{text-align:center}.top-bar menu{display:flex;justify-content:space-around;column-gap:10px}.loading{text-align:center}sl-icon.rotate{animation:turn 1s infinite linear}@keyframes turn{0%{transform:rotate(0)}to{transform:rotate(180deg)}}sl-button{margin-right:1rem}sl-tab>sl-icon{margin-right:.5rem}form [data-invalid]::part(base){border-color:var(--sl-color-danger-600)}form .field,form sl-alert{margin:0rem .2rem 1rem}form .field>.error{display:flex;column-gap:.2rem;padding:.5rem 0;color:var(--sl-color-danger-600)}small.app-version{float:right}
`;
var od = (t) => t;
function ad(t, e = od) {
  return (r, ...s) => {
    r[0] === "." && (r = r.slice(1));
    const n = t()?.[r];
    switch (typeof n) {
      case "function":
        return n(...s);
      case "string":
        return e(n, s[0]);
      default:
        return n;
    }
  };
}
const ld = "E-post adresse", cd = "Passord", ud = "Profil", dd = "Konto", hd = "Kontakt", fd = "Lagre", pd = "Adresse", md = "Telefonnummer", gd = "Avtale", oo = {
  "Member Portal": "Medlemsportal",
  "Sign up": "Opprett konto",
  "Sign in": "Logg inn",
  "Sign out": "Logg ut",
  Email: ld,
  Password: cd,
  Profile: ud,
  Account: dd,
  Contact: hd,
  Save: fd,
  "First name": "Fornavn",
  "Last name": "Etternavn",
  Address: pd,
  Phone: md,
  "My membership": "Mitt medlemskap",
  Subscription: gd,
  "Failed signing up": "Kunne ikke opprette konto",
  "Failed signing in": "Kunne ikke logge inn",
  "Not implemented": "Ikke implementert",
  "Did you type your password and email correct?": "Har du skrevet riktig passord og e-post-adresse?",
  "Did you already sign up?": "Har du allerede registrert deg?",
  "Error saving": "Kunne ikke lagre",
  "Must be a valid email address": "Ugyldig adresse",
  "Must be a valid name": "Ugyldig navn",
  "Must be a valid street address": "Ugyldig adresse",
  "Must be 3-16 charcters and contain one digit and a special char": "M\xE5 v\xE6re 3-16 tegn langt og inneha ett tall og et tegn"
}, Ta = [{
  code: "no",
  name: "norsk",
  dict: oo
}, {
  code: "en",
  name: "english",
  dict: Object.keys(oo).reduce((t, e) => ({
    ...t,
    [e]: e
  }), [])
}], bd = Ta.reduce((t, {
  code: e,
  dict: r
}) => ({
  ...t,
  [e]: r
}), {}), Oa = Br(), ao = Ta.map(({
  code: t,
  name: e
}) => ({
  code: t,
  name: e
})), vd = (t) => {
  const [e, r] = Z("en"), [s] = Oe(e, (o) => (console.log({
    langCode: o
  }), bd[o])), i = {
    t: (o) => {
      const l = ad(s)(o);
      return l || (console.info(`i18nProvider: Missing text for '${o}'(${e()})`), o);
    },
    setLocale: r,
    locale: e
  };
  return _(Oa.Provider, {
    value: i,
    get children() {
      return t.children;
    }
  });
}, Ye = () => er(Oa);
var I;
(function(t) {
  t.assertEqual = (n) => n;
  function e(n) {
  }
  t.assertIs = e;
  function r(n) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (n) => {
    const i = {};
    for (const o of n)
      i[o] = o;
    return i;
  }, t.getValidEnumValues = (n) => {
    const i = t.objectKeys(n).filter((a) => typeof n[n[a]] != "number"), o = {};
    for (const a of i)
      o[a] = n[a];
    return t.objectValues(o);
  }, t.objectValues = (n) => t.objectKeys(n).map(function(i) {
    return n[i];
  }), t.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const i = [];
    for (const o in n)
      Object.prototype.hasOwnProperty.call(n, o) && i.push(o);
    return i;
  }, t.find = (n, i) => {
    for (const o of n)
      if (i(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, i = " | ") {
    return n.map((o) => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  t.joinValues = s, t.jsonStringifyReplacer = (n, i) => typeof i == "bigint" ? i.toString() : i;
})(I || (I = {}));
var zn;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
  });
})(zn || (zn = {}));
const w = I.arrayToEnum([
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
]), at = (t) => {
  switch (typeof t) {
    case "undefined":
      return w.undefined;
    case "string":
      return w.string;
    case "number":
      return isNaN(t) ? w.nan : w.number;
    case "boolean":
      return w.boolean;
    case "function":
      return w.function;
    case "bigint":
      return w.bigint;
    case "symbol":
      return w.symbol;
    case "object":
      return Array.isArray(t) ? w.array : t === null ? w.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? w.promise : typeof Map < "u" && t instanceof Map ? w.map : typeof Set < "u" && t instanceof Set ? w.set : typeof Date < "u" && t instanceof Date ? w.date : w.object;
    default:
      return w.unknown;
  }
}, g = I.arrayToEnum([
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
]), yd = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class ke extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
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
    }, s = { _errors: [] }, n = (i) => {
      for (const o of i.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(n);
        else if (o.code === "invalid_return_type")
          n(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          n(o.argumentsError);
        else if (o.path.length === 0)
          s._errors.push(r(o));
        else {
          let a = s, l = 0;
          for (; l < o.path.length; ) {
            const c = o.path[l];
            l === o.path.length - 1 ? (a[c] = a[c] || { _errors: [] }, a[c]._errors.push(r(o))) : a[c] = a[c] || { _errors: [] }, a = a[c], l++;
          }
        }
    };
    return n(this), s;
  }
  static assert(e) {
    if (!(e instanceof ke))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, I.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, s = [];
    for (const n of this.issues)
      n.path.length > 0 ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(e(n))) : s.push(e(n));
    return { formErrors: s, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
ke.create = (t) => new ke(t);
const Yt = (t, e) => {
  let r;
  switch (t.code) {
    case g.invalid_type:
      t.received === w.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case g.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, I.jsonStringifyReplacer)}`;
      break;
    case g.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${I.joinValues(t.keys, ", ")}`;
      break;
    case g.invalid_union:
      r = "Invalid input";
      break;
    case g.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${I.joinValues(t.options)}`;
      break;
    case g.invalid_enum_value:
      r = `Invalid enum value. Expected ${I.joinValues(t.options)}, received '${t.received}'`;
      break;
    case g.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case g.invalid_return_type:
      r = "Invalid function return type";
      break;
    case g.invalid_date:
      r = "Invalid date";
      break;
    case g.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : I.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case g.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case g.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case g.custom:
      r = "Invalid input";
      break;
    case g.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case g.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case g.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, I.assertNever(t);
  }
  return { message: r };
};
let Pa = Yt;
function wd(t) {
  Pa = t;
}
function Os() {
  return Pa;
}
const Ps = (t) => {
  const { data: e, path: r, errorMaps: s, issueData: n } = t, i = [...r, ...n.path || []], o = {
    ...n,
    path: i
  };
  if (n.message !== void 0)
    return {
      ...n,
      path: i,
      message: n.message
    };
  let a = "";
  const l = s.filter((c) => !!c).slice().reverse();
  for (const c of l)
    a = c(o, { data: e, defaultError: a }).message;
  return {
    ...n,
    path: i,
    message: a
  };
}, _d = [];
function y(t, e) {
  const r = Os(), s = Ps({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      r,
      r === Yt ? void 0 : Yt
    ].filter((n) => !!n)
  });
  t.common.issues.push(s);
}
class ce {
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
    const s = [];
    for (const n of r) {
      if (n.status === "aborted")
        return A;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, r) {
    const s = [];
    for (const n of r) {
      const i = await n.key, o = await n.value;
      s.push({
        key: i,
        value: o
      });
    }
    return ce.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, r) {
    const s = {};
    for (const n of r) {
      const { key: i, value: o } = n;
      if (i.status === "aborted" || o.status === "aborted")
        return A;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof o.value < "u" || n.alwaysSet) && (s[i.value] = o.value);
    }
    return { status: e.value, value: s };
  }
}
const A = Object.freeze({
  status: "aborted"
}), zt = (t) => ({ status: "dirty", value: t }), pe = (t) => ({ status: "valid", value: t }), jn = (t) => t.status === "aborted", Un = (t) => t.status === "dirty", $r = (t) => t.status === "valid", Cr = (t) => typeof Promise < "u" && t instanceof Promise;
function Ns(t, e, r, s) {
  if (r === "a" && !s)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !s : !e.has(t))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? s : r === "a" ? s.call(t) : s ? s.value : e.get(t);
}
function Na(t, e, r, s, n) {
  if (s === "m")
    throw new TypeError("Private method is not writable");
  if (s === "a" && !n)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? t !== e || !n : !e.has(t))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return s === "a" ? n.call(t, r) : n ? n.value = r : e.set(t, r), r;
}
var S;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
})(S || (S = {}));
var fr, pr;
class He {
  constructor(e, r, s, n) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = s, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const lo = (t, e) => {
  if ($r(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new ke(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function O(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: s, description: n } = t;
  if (e && (r || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (o, a) => {
    var l, c;
    const { message: u } = t;
    return o.code === "invalid_enum_value" ? { message: u ?? a.defaultError } : typeof a.data > "u" ? { message: (l = u ?? s) !== null && l !== void 0 ? l : a.defaultError } : o.code !== "invalid_type" ? { message: a.defaultError } : { message: (c = u ?? r) !== null && c !== void 0 ? c : a.defaultError };
  }, description: n };
}
class P {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return at(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: at(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ce(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: at(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (Cr(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const s = this.safeParse(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, r) {
    var s;
    const n = {
      common: {
        issues: [],
        async: (s = r?.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: r?.errorMap
      },
      path: r?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: at(e)
    }, i = this._parseSync({ data: e, path: n.path, parent: n });
    return lo(n, i);
  }
  async parseAsync(e, r) {
    const s = await this.safeParseAsync(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, r) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: r?.errorMap,
        async: !0
      },
      path: r?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: at(e)
    }, n = this._parse({ data: e, path: s.path, parent: s }), i = await (Cr(n) ? n : Promise.resolve(n));
    return lo(s, i);
  }
  refine(e, r) {
    const s = (n) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(n) : r;
    return this._refinement((n, i) => {
      const o = e(n), a = () => i.addIssue({
        code: g.custom,
        ...s(n)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((l) => l ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((s, n) => e(s) ? !0 : (n.addIssue(typeof r == "function" ? r(s, n) : r), !1));
  }
  _refinement(e) {
    return new ze({
      schema: this,
      typeName: C.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return Fe.create(this, this._def);
  }
  nullable() {
    return bt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Le.create(this, this._def);
  }
  promise() {
    return Xt.create(this, this._def);
  }
  or(e) {
    return Or.create([this, e], this._def);
  }
  and(e) {
    return Pr.create(this, e, this._def);
  }
  transform(e) {
    return new ze({
      ...O(this._def),
      schema: this,
      typeName: C.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Dr({
      ...O(this._def),
      innerType: this,
      defaultValue: r,
      typeName: C.ZodDefault
    });
  }
  brand() {
    return new vi({
      typeName: C.ZodBranded,
      type: this,
      ...O(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Mr({
      ...O(this._def),
      innerType: this,
      catchValue: r,
      typeName: C.ZodCatch
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
    return Kr.create(this, e);
  }
  readonly() {
    return zr.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const xd = /^c[^\s-]{8,}$/i, kd = /^[0-9a-z]+$/, Sd = /^[0-9A-HJKMNP-TV-Z]{26}$/, $d = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Cd = /^[a-z0-9_-]{21}$/i, Ad = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Ed = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Td = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let vn;
const Od = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Pd = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Nd = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Ra = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Rd = new RegExp(`^${Ra}$`);
function La(t) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Ld(t) {
  return new RegExp(`^${La(t)}$`);
}
function Ia(t) {
  let e = `${Ra}T${La(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function Id(t, e) {
  return !!((e === "v4" || !e) && Od.test(t) || (e === "v6" || !e) && Pd.test(t));
}
class Re extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== w.string) {
      const i = this._getOrReturnCtx(e);
      return y(i, {
        code: g.invalid_type,
        expected: w.string,
        received: i.parsedType
      }), A;
    }
    const s = new ce();
    let n;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), s.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), s.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, a = e.data.length < i.value;
        (o || a) && (n = this._getOrReturnCtx(e, n), o ? y(n, {
          code: g.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && y(n, {
          code: g.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), s.dirty());
      } else if (i.kind === "email")
        Ed.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "email",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "emoji")
        vn || (vn = new RegExp(Td, "u")), vn.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "emoji",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "uuid")
        $d.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "uuid",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "nanoid")
        Cd.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "nanoid",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "cuid")
        xd.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "cuid",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "cuid2")
        kd.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "cuid2",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "ulid")
        Sd.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "ulid",
          code: g.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), y(n, {
            validation: "url",
            code: g.invalid_string,
            message: i.message
          }), s.dirty();
        }
      else
        i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "regex",
          code: g.invalid_string,
          message: i.message
        }), s.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.invalid_string,
          validation: { includes: i.value, position: i.position },
          message: i.message
        }), s.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.invalid_string,
          validation: { startsWith: i.value },
          message: i.message
        }), s.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.invalid_string,
          validation: { endsWith: i.value },
          message: i.message
        }), s.dirty()) : i.kind === "datetime" ? Ia(i).test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.invalid_string,
          validation: "datetime",
          message: i.message
        }), s.dirty()) : i.kind === "date" ? Rd.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.invalid_string,
          validation: "date",
          message: i.message
        }), s.dirty()) : i.kind === "time" ? Ld(i).test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          code: g.invalid_string,
          validation: "time",
          message: i.message
        }), s.dirty()) : i.kind === "duration" ? Ad.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "duration",
          code: g.invalid_string,
          message: i.message
        }), s.dirty()) : i.kind === "ip" ? Id(e.data, i.version) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "ip",
          code: g.invalid_string,
          message: i.message
        }), s.dirty()) : i.kind === "base64" ? Nd.test(e.data) || (n = this._getOrReturnCtx(e, n), y(n, {
          validation: "base64",
          code: g.invalid_string,
          message: i.message
        }), s.dirty()) : I.assertNever(i);
    return { status: s.value, value: e.data };
  }
  _regex(e, r, s) {
    return this.refinement((n) => e.test(n), {
      validation: r,
      code: g.invalid_string,
      ...S.errToObj(s)
    });
  }
  _addCheck(e) {
    return new Re({
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
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...S.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...S.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...S.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...S.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...S.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...S.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...S.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...S.errToObj(e) });
  }
  datetime(e) {
    var r, s;
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
      local: (s = e?.local) !== null && s !== void 0 ? s : !1,
      ...S.errToObj(e?.message)
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
      ...S.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...S.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...S.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r?.position,
      ...S.errToObj(r?.message)
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
  nonempty(e) {
    return this.min(1, S.errToObj(e));
  }
  trim() {
    return new Re({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Re({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Re({
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
Re.create = (t) => {
  var e;
  return new Re({
    checks: [],
    typeName: C.ZodString,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...O(t)
  });
};
function Dd(t, e) {
  const r = (t.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, n = r > s ? r : s, i = parseInt(t.toFixed(n).replace(".", "")), o = parseInt(e.toFixed(n).replace(".", ""));
  return i % o / Math.pow(10, n);
}
class pt extends P {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== w.number) {
      const i = this._getOrReturnCtx(e);
      return y(i, {
        code: g.invalid_type,
        expected: w.number,
        received: i.parsedType
      }), A;
    }
    let s;
    const n = new ce();
    for (const i of this._def.checks)
      i.kind === "int" ? I.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), n.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? Dd(e.data, i.value) !== 0 && (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.not_finite,
        message: i.message
      }), n.dirty()) : I.assertNever(i);
    return { status: n.value, value: e.data };
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
  setLimit(e, r, s, n) {
    return new pt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: S.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new pt({
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
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: S.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && I.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
pt.create = (t) => new pt({
  checks: [],
  typeName: C.ZodNumber,
  coerce: t?.coerce || !1,
  ...O(t)
});
class mt extends P {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== w.bigint) {
      const i = this._getOrReturnCtx(e);
      return y(i, {
        code: g.invalid_type,
        expected: w.bigint,
        received: i.parsedType
      }), A;
    }
    let s;
    const n = new ce();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), y(s, {
        code: g.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : I.assertNever(i);
    return { status: n.value, value: e.data };
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
  setLimit(e, r, s, n) {
    return new mt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: S.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new mt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
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
mt.create = (t) => {
  var e;
  return new mt({
    checks: [],
    typeName: C.ZodBigInt,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...O(t)
  });
};
class Ar extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = Boolean(e.data)), this._getType(e) !== w.boolean) {
      const s = this._getOrReturnCtx(e);
      return y(s, {
        code: g.invalid_type,
        expected: w.boolean,
        received: s.parsedType
      }), A;
    }
    return pe(e.data);
  }
}
Ar.create = (t) => new Ar({
  typeName: C.ZodBoolean,
  coerce: t?.coerce || !1,
  ...O(t)
});
class At extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== w.date) {
      const i = this._getOrReturnCtx(e);
      return y(i, {
        code: g.invalid_type,
        expected: w.date,
        received: i.parsedType
      }), A;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return y(i, {
        code: g.invalid_date
      }), A;
    }
    const s = new ce();
    let n;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (n = this._getOrReturnCtx(e, n), y(n, {
        code: g.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), s.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (n = this._getOrReturnCtx(e, n), y(n, {
        code: g.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), s.dirty()) : I.assertNever(i);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new At({
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
At.create = (t) => new At({
  checks: [],
  coerce: t?.coerce || !1,
  typeName: C.ZodDate,
  ...O(t)
});
class Rs extends P {
  _parse(e) {
    if (this._getType(e) !== w.symbol) {
      const s = this._getOrReturnCtx(e);
      return y(s, {
        code: g.invalid_type,
        expected: w.symbol,
        received: s.parsedType
      }), A;
    }
    return pe(e.data);
  }
}
Rs.create = (t) => new Rs({
  typeName: C.ZodSymbol,
  ...O(t)
});
class Er extends P {
  _parse(e) {
    if (this._getType(e) !== w.undefined) {
      const s = this._getOrReturnCtx(e);
      return y(s, {
        code: g.invalid_type,
        expected: w.undefined,
        received: s.parsedType
      }), A;
    }
    return pe(e.data);
  }
}
Er.create = (t) => new Er({
  typeName: C.ZodUndefined,
  ...O(t)
});
class Tr extends P {
  _parse(e) {
    if (this._getType(e) !== w.null) {
      const s = this._getOrReturnCtx(e);
      return y(s, {
        code: g.invalid_type,
        expected: w.null,
        received: s.parsedType
      }), A;
    }
    return pe(e.data);
  }
}
Tr.create = (t) => new Tr({
  typeName: C.ZodNull,
  ...O(t)
});
class Jt extends P {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return pe(e.data);
  }
}
Jt.create = (t) => new Jt({
  typeName: C.ZodAny,
  ...O(t)
});
class kt extends P {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return pe(e.data);
  }
}
kt.create = (t) => new kt({
  typeName: C.ZodUnknown,
  ...O(t)
});
class et extends P {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return y(r, {
      code: g.invalid_type,
      expected: w.never,
      received: r.parsedType
    }), A;
  }
}
et.create = (t) => new et({
  typeName: C.ZodNever,
  ...O(t)
});
class Ls extends P {
  _parse(e) {
    if (this._getType(e) !== w.undefined) {
      const s = this._getOrReturnCtx(e);
      return y(s, {
        code: g.invalid_type,
        expected: w.void,
        received: s.parsedType
      }), A;
    }
    return pe(e.data);
  }
}
Ls.create = (t) => new Ls({
  typeName: C.ZodVoid,
  ...O(t)
});
class Le extends P {
  _parse(e) {
    const { ctx: r, status: s } = this._processInputParams(e), n = this._def;
    if (r.parsedType !== w.array)
      return y(r, {
        code: g.invalid_type,
        expected: w.array,
        received: r.parsedType
      }), A;
    if (n.exactLength !== null) {
      const o = r.data.length > n.exactLength.value, a = r.data.length < n.exactLength.value;
      (o || a) && (y(r, {
        code: o ? g.too_big : g.too_small,
        minimum: a ? n.exactLength.value : void 0,
        maximum: o ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), s.dirty());
    }
    if (n.minLength !== null && r.data.length < n.minLength.value && (y(r, {
      code: g.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), s.dirty()), n.maxLength !== null && r.data.length > n.maxLength.value && (y(r, {
      code: g.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), s.dirty()), r.common.async)
      return Promise.all([...r.data].map((o, a) => n.type._parseAsync(new He(r, o, r.path, a)))).then((o) => ce.mergeArray(s, o));
    const i = [...r.data].map((o, a) => n.type._parseSync(new He(r, o, r.path, a)));
    return ce.mergeArray(s, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new Le({
      ...this._def,
      minLength: { value: e, message: S.toString(r) }
    });
  }
  max(e, r) {
    return new Le({
      ...this._def,
      maxLength: { value: e, message: S.toString(r) }
    });
  }
  length(e, r) {
    return new Le({
      ...this._def,
      exactLength: { value: e, message: S.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Le.create = (t, e) => new Le({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: C.ZodArray,
  ...O(e)
});
function Dt(t) {
  if (t instanceof X) {
    const e = {};
    for (const r in t.shape) {
      const s = t.shape[r];
      e[r] = Fe.create(Dt(s));
    }
    return new X({
      ...t._def,
      shape: () => e
    });
  } else
    return t instanceof Le ? new Le({
      ...t._def,
      type: Dt(t.element)
    }) : t instanceof Fe ? Fe.create(Dt(t.unwrap())) : t instanceof bt ? bt.create(Dt(t.unwrap())) : t instanceof We ? We.create(t.items.map((e) => Dt(e))) : t;
}
class X extends P {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = I.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== w.object) {
      const c = this._getOrReturnCtx(e);
      return y(c, {
        code: g.invalid_type,
        expected: w.object,
        received: c.parsedType
      }), A;
    }
    const { status: s, ctx: n } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof et && this._def.unknownKeys === "strip"))
      for (const c in n.data)
        o.includes(c) || a.push(c);
    const l = [];
    for (const c of o) {
      const u = i[c], d = n.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: u._parse(new He(n, d, n.path, c)),
        alwaysSet: c in n.data
      });
    }
    if (this._def.catchall instanceof et) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const u of a)
          l.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: n.data[u] }
          });
      else if (c === "strict")
        a.length > 0 && (y(n, {
          code: g.unrecognized_keys,
          keys: a
        }), s.dirty());
      else if (c !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const u of a) {
        const d = n.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: c._parse(
            new He(n, d, n.path, u)
          ),
          alwaysSet: u in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const u of l) {
        const d = await u.key, m = await u.value;
        c.push({
          key: d,
          value: m,
          alwaysSet: u.alwaysSet
        });
      }
      return c;
    }).then((c) => ce.mergeObjectSync(s, c)) : ce.mergeObjectSync(s, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return S.errToObj, new X({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, s) => {
          var n, i, o, a;
          const l = (o = (i = (n = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(n, r, s).message) !== null && o !== void 0 ? o : s.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (a = S.errToObj(e).message) !== null && a !== void 0 ? a : l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new X({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new X({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(e) {
    return new X({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  merge(e) {
    return new X({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: C.ZodObject
    });
  }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  catchall(e) {
    return new X({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return I.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (r[s] = this.shape[s]);
    }), new X({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return I.objectKeys(this.shape).forEach((s) => {
      e[s] || (r[s] = this.shape[s]);
    }), new X({
      ...this._def,
      shape: () => r
    });
  }
  deepPartial() {
    return Dt(this);
  }
  partial(e) {
    const r = {};
    return I.objectKeys(this.shape).forEach((s) => {
      const n = this.shape[s];
      e && !e[s] ? r[s] = n : r[s] = n.optional();
    }), new X({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    return I.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        r[s] = this.shape[s];
      else {
        let i = this.shape[s];
        for (; i instanceof Fe; )
          i = i._def.innerType;
        r[s] = i;
      }
    }), new X({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Da(I.objectKeys(this.shape));
  }
}
X.create = (t, e) => new X({
  shape: () => t,
  unknownKeys: "strip",
  catchall: et.create(),
  typeName: C.ZodObject,
  ...O(e)
});
X.strictCreate = (t, e) => new X({
  shape: () => t,
  unknownKeys: "strict",
  catchall: et.create(),
  typeName: C.ZodObject,
  ...O(e)
});
X.lazycreate = (t, e) => new X({
  shape: t,
  unknownKeys: "strip",
  catchall: et.create(),
  typeName: C.ZodObject,
  ...O(e)
});
class Or extends P {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = this._def.options;
    function n(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((a) => new ke(a.ctx.common.issues));
      return y(r, {
        code: g.invalid_union,
        unionErrors: o
      }), A;
    }
    if (r.common.async)
      return Promise.all(s.map(async (i) => {
        const o = {
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
            parent: o
          }),
          ctx: o
        };
      })).then(n);
    {
      let i;
      const o = [];
      for (const l of s) {
        const c = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, u = l._parseSync({
          data: r.data,
          path: r.path,
          parent: c
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !i && (i = { result: u, ctx: c }), c.common.issues.length && o.push(c.common.issues);
      }
      if (i)
        return r.common.issues.push(...i.ctx.common.issues), i.result;
      const a = o.map((l) => new ke(l));
      return y(r, {
        code: g.invalid_union,
        unionErrors: a
      }), A;
    }
  }
  get options() {
    return this._def.options;
  }
}
Or.create = (t, e) => new Or({
  options: t,
  typeName: C.ZodUnion,
  ...O(e)
});
const Xe = (t) => t instanceof Rr ? Xe(t.schema) : t instanceof ze ? Xe(t.innerType()) : t instanceof Lr ? [t.value] : t instanceof gt ? t.options : t instanceof Ir ? I.objectValues(t.enum) : t instanceof Dr ? Xe(t._def.innerType) : t instanceof Er ? [void 0] : t instanceof Tr ? [null] : t instanceof Fe ? [void 0, ...Xe(t.unwrap())] : t instanceof bt ? [null, ...Xe(t.unwrap())] : t instanceof vi || t instanceof zr ? Xe(t.unwrap()) : t instanceof Mr ? Xe(t._def.innerType) : [];
class nn extends P {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.object)
      return y(r, {
        code: g.invalid_type,
        expected: w.object,
        received: r.parsedType
      }), A;
    const s = this.discriminator, n = r.data[s], i = this.optionsMap.get(n);
    return i ? r.common.async ? i._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : i._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (y(r, {
      code: g.invalid_union_discriminator,
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
  static create(e, r, s) {
    const n = /* @__PURE__ */ new Map();
    for (const i of r) {
      const o = Xe(i.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const a of o) {
        if (n.has(a))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
        n.set(a, i);
      }
    }
    return new nn({
      typeName: C.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: n,
      ...O(s)
    });
  }
}
function Vn(t, e) {
  const r = at(t), s = at(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === w.object && s === w.object) {
    const n = I.objectKeys(e), i = I.objectKeys(t).filter((a) => n.indexOf(a) !== -1), o = { ...t, ...e };
    for (const a of i) {
      const l = Vn(t[a], e[a]);
      if (!l.valid)
        return { valid: !1 };
      o[a] = l.data;
    }
    return { valid: !0, data: o };
  } else if (r === w.array && s === w.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], a = e[i], l = Vn(o, a);
      if (!l.valid)
        return { valid: !1 };
      n.push(l.data);
    }
    return { valid: !0, data: n };
  } else
    return r === w.date && s === w.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Pr extends P {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = (i, o) => {
      if (jn(i) || jn(o))
        return A;
      const a = Vn(i.value, o.value);
      return a.valid ? ((Un(i) || Un(o)) && r.dirty(), { status: r.value, value: a.data }) : (y(s, {
        code: g.invalid_intersection_types
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
    ]).then(([i, o]) => n(i, o)) : n(this._def.left._parseSync({
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
Pr.create = (t, e, r) => new Pr({
  left: t,
  right: e,
  typeName: C.ZodIntersection,
  ...O(r)
});
class We extends P {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.array)
      return y(s, {
        code: g.invalid_type,
        expected: w.array,
        received: s.parsedType
      }), A;
    if (s.data.length < this._def.items.length)
      return y(s, {
        code: g.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), A;
    !this._def.rest && s.data.length > this._def.items.length && (y(s, {
      code: g.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const i = [...s.data].map((o, a) => {
      const l = this._def.items[a] || this._def.rest;
      return l ? l._parse(new He(s, o, s.path, a)) : null;
    }).filter((o) => !!o);
    return s.common.async ? Promise.all(i).then((o) => ce.mergeArray(r, o)) : ce.mergeArray(r, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new We({
      ...this._def,
      rest: e
    });
  }
}
We.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new We({
    items: t,
    typeName: C.ZodTuple,
    rest: null,
    ...O(e)
  });
};
class Nr extends P {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.object)
      return y(s, {
        code: g.invalid_type,
        expected: w.object,
        received: s.parsedType
      }), A;
    const n = [], i = this._def.keyType, o = this._def.valueType;
    for (const a in s.data)
      n.push({
        key: i._parse(new He(s, a, s.path, a)),
        value: o._parse(new He(s, s.data[a], s.path, a)),
        alwaysSet: a in s.data
      });
    return s.common.async ? ce.mergeObjectAsync(r, n) : ce.mergeObjectSync(r, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, s) {
    return r instanceof P ? new Nr({
      keyType: e,
      valueType: r,
      typeName: C.ZodRecord,
      ...O(s)
    }) : new Nr({
      keyType: Re.create(),
      valueType: e,
      typeName: C.ZodRecord,
      ...O(r)
    });
  }
}
class Is extends P {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.map)
      return y(s, {
        code: g.invalid_type,
        expected: w.map,
        received: s.parsedType
      }), A;
    const n = this._def.keyType, i = this._def.valueType, o = [...s.data.entries()].map(([a, l], c) => ({
      key: n._parse(new He(s, a, s.path, [c, "key"])),
      value: i._parse(new He(s, l, s.path, [c, "value"]))
    }));
    if (s.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of o) {
          const c = await l.key, u = await l.value;
          if (c.status === "aborted" || u.status === "aborted")
            return A;
          (c.status === "dirty" || u.status === "dirty") && r.dirty(), a.set(c.value, u.value);
        }
        return { status: r.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const l of o) {
        const c = l.key, u = l.value;
        if (c.status === "aborted" || u.status === "aborted")
          return A;
        (c.status === "dirty" || u.status === "dirty") && r.dirty(), a.set(c.value, u.value);
      }
      return { status: r.value, value: a };
    }
  }
}
Is.create = (t, e, r) => new Is({
  valueType: e,
  keyType: t,
  typeName: C.ZodMap,
  ...O(r)
});
class Et extends P {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.set)
      return y(s, {
        code: g.invalid_type,
        expected: w.set,
        received: s.parsedType
      }), A;
    const n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value && (y(s, {
      code: g.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), r.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (y(s, {
      code: g.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), r.dirty());
    const i = this._def.valueType;
    function o(l) {
      const c = /* @__PURE__ */ new Set();
      for (const u of l) {
        if (u.status === "aborted")
          return A;
        u.status === "dirty" && r.dirty(), c.add(u.value);
      }
      return { status: r.value, value: c };
    }
    const a = [...s.data.values()].map((l, c) => i._parse(new He(s, l, s.path, c)));
    return s.common.async ? Promise.all(a).then((l) => o(l)) : o(a);
  }
  min(e, r) {
    return new Et({
      ...this._def,
      minSize: { value: e, message: S.toString(r) }
    });
  }
  max(e, r) {
    return new Et({
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
Et.create = (t, e) => new Et({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: C.ZodSet,
  ...O(e)
});
class Bt extends P {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.function)
      return y(r, {
        code: g.invalid_type,
        expected: w.function,
        received: r.parsedType
      }), A;
    function s(a, l) {
      return Ps({
        data: a,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Os(),
          Yt
        ].filter((c) => !!c),
        issueData: {
          code: g.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function n(a, l) {
      return Ps({
        data: a,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Os(),
          Yt
        ].filter((c) => !!c),
        issueData: {
          code: g.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const i = { errorMap: r.common.contextualErrorMap }, o = r.data;
    if (this._def.returns instanceof Xt) {
      const a = this;
      return pe(async function(...l) {
        const c = new ke([]), u = await a._def.args.parseAsync(l, i).catch((p) => {
          throw c.addIssue(s(l, p)), c;
        }), d = await Reflect.apply(o, this, u);
        return await a._def.returns._def.type.parseAsync(d, i).catch((p) => {
          throw c.addIssue(n(d, p)), c;
        });
      });
    } else {
      const a = this;
      return pe(function(...l) {
        const c = a._def.args.safeParse(l, i);
        if (!c.success)
          throw new ke([s(l, c.error)]);
        const u = Reflect.apply(o, this, c.data), d = a._def.returns.safeParse(u, i);
        if (!d.success)
          throw new ke([n(u, d.error)]);
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
    return new Bt({
      ...this._def,
      args: We.create(e).rest(kt.create())
    });
  }
  returns(e) {
    return new Bt({
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
  static create(e, r, s) {
    return new Bt({
      args: e || We.create([]).rest(kt.create()),
      returns: r || kt.create(),
      typeName: C.ZodFunction,
      ...O(s)
    });
  }
}
class Rr extends P {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Rr.create = (t, e) => new Rr({
  getter: t,
  typeName: C.ZodLazy,
  ...O(e)
});
class Lr extends P {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return y(r, {
        received: r.data,
        code: g.invalid_literal,
        expected: this._def.value
      }), A;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Lr.create = (t, e) => new Lr({
  value: t,
  typeName: C.ZodLiteral,
  ...O(e)
});
function Da(t, e) {
  return new gt({
    values: t,
    typeName: C.ZodEnum,
    ...O(e)
  });
}
class gt extends P {
  constructor() {
    super(...arguments), fr.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return y(r, {
        expected: I.joinValues(s),
        received: r.parsedType,
        code: g.invalid_type
      }), A;
    }
    if (Ns(this, fr, "f") || Na(this, fr, new Set(this._def.values), "f"), !Ns(this, fr, "f").has(e.data)) {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return y(r, {
        received: r.data,
        code: g.invalid_enum_value,
        options: s
      }), A;
    }
    return pe(e.data);
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
    return gt.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return gt.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...r
    });
  }
}
fr = /* @__PURE__ */ new WeakMap();
gt.create = Da;
class Ir extends P {
  constructor() {
    super(...arguments), pr.set(this, void 0);
  }
  _parse(e) {
    const r = I.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== w.string && s.parsedType !== w.number) {
      const n = I.objectValues(r);
      return y(s, {
        expected: I.joinValues(n),
        received: s.parsedType,
        code: g.invalid_type
      }), A;
    }
    if (Ns(this, pr, "f") || Na(this, pr, new Set(I.getValidEnumValues(this._def.values)), "f"), !Ns(this, pr, "f").has(e.data)) {
      const n = I.objectValues(r);
      return y(s, {
        received: s.data,
        code: g.invalid_enum_value,
        options: n
      }), A;
    }
    return pe(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
pr = /* @__PURE__ */ new WeakMap();
Ir.create = (t, e) => new Ir({
  values: t,
  typeName: C.ZodNativeEnum,
  ...O(e)
});
class Xt extends P {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.promise && r.common.async === !1)
      return y(r, {
        code: g.invalid_type,
        expected: w.promise,
        received: r.parsedType
      }), A;
    const s = r.parsedType === w.promise ? r.data : Promise.resolve(r.data);
    return pe(s.then((n) => this._def.type.parseAsync(n, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
Xt.create = (t, e) => new Xt({
  type: t,
  typeName: C.ZodPromise,
  ...O(e)
});
class ze extends P {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === C.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = this._def.effect || null, i = {
      addIssue: (o) => {
        y(s, o), o.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), n.type === "preprocess") {
      const o = n.transform(s.data, i);
      if (s.common.async)
        return Promise.resolve(o).then(async (a) => {
          if (r.value === "aborted")
            return A;
          const l = await this._def.schema._parseAsync({
            data: a,
            path: s.path,
            parent: s
          });
          return l.status === "aborted" ? A : l.status === "dirty" || r.value === "dirty" ? zt(l.value) : l;
        });
      {
        if (r.value === "aborted")
          return A;
        const a = this._def.schema._parseSync({
          data: o,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? A : a.status === "dirty" || r.value === "dirty" ? zt(a.value) : a;
      }
    }
    if (n.type === "refinement") {
      const o = (a) => {
        const l = n.refinement(a, i);
        if (s.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (s.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? A : (a.status === "dirty" && r.dirty(), o(a.value), { status: r.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((a) => a.status === "aborted" ? A : (a.status === "dirty" && r.dirty(), o(a.value).then(() => ({ status: r.value, value: a.value }))));
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!$r(o))
          return o;
        const a = n.transform(o.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => $r(o) ? Promise.resolve(n.transform(o.value, i)).then((a) => ({ status: r.value, value: a })) : o);
    I.assertNever(n);
  }
}
ze.create = (t, e, r) => new ze({
  schema: t,
  typeName: C.ZodEffects,
  effect: e,
  ...O(r)
});
ze.createWithPreprocess = (t, e, r) => new ze({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: C.ZodEffects,
  ...O(r)
});
class Fe extends P {
  _parse(e) {
    return this._getType(e) === w.undefined ? pe(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Fe.create = (t, e) => new Fe({
  innerType: t,
  typeName: C.ZodOptional,
  ...O(e)
});
class bt extends P {
  _parse(e) {
    return this._getType(e) === w.null ? pe(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
bt.create = (t, e) => new bt({
  innerType: t,
  typeName: C.ZodNullable,
  ...O(e)
});
class Dr extends P {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let s = r.data;
    return r.parsedType === w.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Dr.create = (t, e) => new Dr({
  innerType: t,
  typeName: C.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...O(e)
});
class Mr extends P {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return Cr(n) ? n.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new ke(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new ke(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Mr.create = (t, e) => new Mr({
  innerType: t,
  typeName: C.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...O(e)
});
class Ds extends P {
  _parse(e) {
    if (this._getType(e) !== w.nan) {
      const s = this._getOrReturnCtx(e);
      return y(s, {
        code: g.invalid_type,
        expected: w.nan,
        received: s.parsedType
      }), A;
    }
    return { status: "valid", value: e.data };
  }
}
Ds.create = (t) => new Ds({
  typeName: C.ZodNaN,
  ...O(t)
});
const Md = Symbol("zod_brand");
class vi extends P {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = r.data;
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
class Kr extends P {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return i.status === "aborted" ? A : i.status === "dirty" ? (r.dirty(), zt(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return n.status === "aborted" ? A : n.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, r) {
    return new Kr({
      in: e,
      out: r,
      typeName: C.ZodPipeline
    });
  }
}
class zr extends P {
  _parse(e) {
    const r = this._def.innerType._parse(e), s = (n) => ($r(n) && (n.value = Object.freeze(n.value)), n);
    return Cr(r) ? r.then((n) => s(n)) : s(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
zr.create = (t, e) => new zr({
  innerType: t,
  typeName: C.ZodReadonly,
  ...O(e)
});
function Ma(t, e = {}, r) {
  return t ? Jt.create().superRefine((s, n) => {
    var i, o;
    if (!t(s)) {
      const a = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, l = (o = (i = a.fatal) !== null && i !== void 0 ? i : r) !== null && o !== void 0 ? o : !0, c = typeof a == "string" ? { message: a } : a;
      n.addIssue({ code: "custom", ...c, fatal: l });
    }
  }) : Jt.create();
}
const zd = {
  object: X.lazycreate
};
var C;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(C || (C = {}));
const jd = (t, e = {
  message: `Input not instance of ${t.name}`
}) => Ma((r) => r instanceof t, e), za = Re.create, ja = pt.create, Ud = Ds.create, Vd = mt.create, Ua = Ar.create, Bd = At.create, Fd = Rs.create, Zd = Er.create, Hd = Tr.create, Wd = Jt.create, Gd = kt.create, qd = et.create, Kd = Ls.create, Yd = Le.create, Jd = X.create, Xd = X.strictCreate, Qd = Or.create, eh = nn.create, th = Pr.create, rh = We.create, sh = Nr.create, nh = Is.create, ih = Et.create, oh = Bt.create, ah = Rr.create, lh = Lr.create, ch = gt.create, uh = Ir.create, dh = Xt.create, co = ze.create, hh = Fe.create, fh = bt.create, ph = ze.createWithPreprocess, mh = Kr.create, gh = () => za().optional(), bh = () => ja().optional(), vh = () => Ua().optional(), yh = {
  string: (t) => Re.create({ ...t, coerce: !0 }),
  number: (t) => pt.create({ ...t, coerce: !0 }),
  boolean: (t) => Ar.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => mt.create({ ...t, coerce: !0 }),
  date: (t) => At.create({ ...t, coerce: !0 })
}, wh = A;
var ee = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Yt,
  setErrorMap: wd,
  getErrorMap: Os,
  makeIssue: Ps,
  EMPTY_PATH: _d,
  addIssueToContext: y,
  ParseStatus: ce,
  INVALID: A,
  DIRTY: zt,
  OK: pe,
  isAborted: jn,
  isDirty: Un,
  isValid: $r,
  isAsync: Cr,
  get util() {
    return I;
  },
  get objectUtil() {
    return zn;
  },
  ZodParsedType: w,
  getParsedType: at,
  ZodType: P,
  datetimeRegex: Ia,
  ZodString: Re,
  ZodNumber: pt,
  ZodBigInt: mt,
  ZodBoolean: Ar,
  ZodDate: At,
  ZodSymbol: Rs,
  ZodUndefined: Er,
  ZodNull: Tr,
  ZodAny: Jt,
  ZodUnknown: kt,
  ZodNever: et,
  ZodVoid: Ls,
  ZodArray: Le,
  ZodObject: X,
  ZodUnion: Or,
  ZodDiscriminatedUnion: nn,
  ZodIntersection: Pr,
  ZodTuple: We,
  ZodRecord: Nr,
  ZodMap: Is,
  ZodSet: Et,
  ZodFunction: Bt,
  ZodLazy: Rr,
  ZodLiteral: Lr,
  ZodEnum: gt,
  ZodNativeEnum: Ir,
  ZodPromise: Xt,
  ZodEffects: ze,
  ZodTransformer: ze,
  ZodOptional: Fe,
  ZodNullable: bt,
  ZodDefault: Dr,
  ZodCatch: Mr,
  ZodNaN: Ds,
  BRAND: Md,
  ZodBranded: vi,
  ZodPipeline: Kr,
  ZodReadonly: zr,
  custom: Ma,
  Schema: P,
  ZodSchema: P,
  late: zd,
  get ZodFirstPartyTypeKind() {
    return C;
  },
  coerce: yh,
  any: Wd,
  array: Yd,
  bigint: Vd,
  boolean: Ua,
  date: Bd,
  discriminatedUnion: eh,
  effect: co,
  enum: ch,
  function: oh,
  instanceof: jd,
  intersection: th,
  lazy: ah,
  literal: lh,
  map: nh,
  nan: Ud,
  nativeEnum: uh,
  never: qd,
  null: Hd,
  nullable: fh,
  number: ja,
  object: Jd,
  oboolean: vh,
  onumber: bh,
  optional: hh,
  ostring: gh,
  pipeline: mh,
  preprocess: ph,
  promise: dh,
  record: sh,
  set: ih,
  strictObject: Xd,
  string: za,
  symbol: Fd,
  transformer: co,
  tuple: rh,
  undefined: Zd,
  union: Qd,
  unknown: Gd,
  void: Kd,
  NEVER: wh,
  ZodIssueCode: g,
  quotelessJson: yd,
  ZodError: ke
}), _h = Object.defineProperty, xh = (t, e) => {
  for (var r in e)
    _h(t, r, { get: e[r], enumerable: !0 });
}, kh = class {
  collectable = {};
  listeners = {};
  interceptors;
  constructor({ interceptors: t } = {}) {
    this.interceptors = t ?? {};
  }
  subscribe(t, e, r = !1) {
    if (this.listeners[t] || (this.listeners[t] = []), !this.isSubscribed(t, e) && (this.listeners[t]?.push(e), r && this.collectable[t])) {
      let s = this.collectable[t];
      this.collectable[t] = [];
      for (let n of s)
        e(...n);
    }
  }
  subscribeOnce(t, e = !1) {
    return new Promise((r) => {
      let s = !1, n = (...i) => {
        s || (s = !0, this.unSubscribe(t, n), r(i));
      };
      this.subscribe(t, n, e);
    });
  }
  unSubscribe(t, e) {
    if (this.listeners[t]) {
      let r = this.listeners[t]?.findIndex((s) => s === e);
      r && this.listeners[t]?.splice(r, 1);
    }
  }
  isSubscribed(t, e) {
    return !!this.listeners[t]?.includes(e);
  }
  async emit(t, e, r = !1) {
    let s = this.interceptors[t], n = s ? await s(...e) : e;
    this.listeners[t]?.length === 0 && r && (this.collectable[t] || (this.collectable[t] = []), this.collectable[t]?.push(e));
    for (let i of this.listeners[t] ?? [])
      i(...n);
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
}, Sh = {};
xh(Sh, { CborBreak: () => ls, CborError: () => Ot, CborFillMissing: () => Za, CborInvalidMajorError: () => on, CborNumberError: () => Fn, CborPartialDisabled: () => Fa, CborRangeError: () => Ve, Encoded: () => yi, Gap: () => Ha, POW_2_53: () => $h, POW_2_64: () => Bn, PartiallyEncoded: () => wi, Reader: () => Zn, Tagged: () => se, Writer: () => an, decode: () => Wa, encode: () => Qt, infiniteBytes: () => Hn, partiallyEncodeObject: () => _i });
var $h = 9007199254740992, Bn = BigInt(18446744073709552e3), yi = class {
  constructor(t) {
    this.encoded = t;
  }
}, Q = class extends Error {
}, wt = class extends Q {
  name = "NoActiveSocket";
  message = "No socket is currently connected to a SurrealDB instance. Please call the .connect() method first!";
}, Va = class extends Q {
  name = "EngineDisconnected";
  message = "The engine reported the connection to SurrealDB has dropped";
}, uo = class extends Q {
  constructor(t) {
    super(), this.response = t, this.message = `${t}`;
  }
  name = "UnexpectedServerResponse";
}, Ch = class extends Q {
  constructor(t) {
    super(), this.error = t, this.message = `${t}`;
  }
  name = "UnexpectedConnectionError";
}, Ah = class extends Q {
  constructor(t) {
    super(), this.engine = t;
  }
  name = "UnsupportedEngine";
  message = "The engine you are trying to connect to is not supported or configured.";
}, Ba = class extends Q {
  name = "ConnectionUnavailable";
  message = "There is no connection available at this moment.";
}, Eh = class extends Q {
  name = "MissingNamespaceDatabase";
  message = "There are no namespace and/or database configured.";
}, Th = class extends Q {
  constructor(t, e, r, s) {
    super(), this.message = t, this.status = e, this.statusText = r, this.buffer = s;
  }
  name = "HttpConnectionError";
}, q = class extends Q {
  constructor(t) {
    super(), this.message = t;
  }
  name = "ResponseError";
}, Oh = class extends Q {
  name = "NoNamespaceSpecified";
  message = "Please specify a namespace to use.";
}, Ph = class extends Q {
  name = "NoDatabaseSpecified";
  message = "Please specify a database to use.";
}, ho = class extends Q {
  name = "NoTokenReturned";
  message = "Did not receive an authentication token.";
}, Nh = class extends Q {
  name = "UnsupportedVersion";
  version;
  supportedRange;
  constructor(t, e) {
    super(), this.version = t, this.supportedRange = e, this.message = `The version "${t}" reported by the engine is not supported by this library, expected a version that satisfies "${e}".`;
  }
}, fo = class extends Q {
  constructor(t) {
    super(), this.error = t;
  }
  name = "VersionRetrievalFailure";
  message = "Failed to retrieve remote version. If the server is behind a proxy, make sure it's configured correctly.";
}, Ot = class extends Q {
  message;
  constructor(t) {
    super(), this.message = t;
  }
}, Fn = class extends Ot {
  name = "CborNumberError";
}, Ve = class extends Ot {
  name = "CborRangeError";
}, on = class extends Ot {
  name = "CborInvalidMajorError";
}, ls = class extends Ot {
  name = "CborBreak";
  constructor() {
    super("Came across a break which was not intercepted by the decoder");
  }
}, Fa = class extends Ot {
  name = "CborPartialDisabled";
  constructor() {
    super("Tried to insert a Gap into a CBOR value, while partial mode is not enabled");
  }
}, Za = class extends Ot {
  name = "CborFillMissing";
  constructor() {
    super("Fill for a gap is missing, and gap has no default");
  }
}, Ha = class {
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
}, an = class {
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
      let s = this._byte;
      this._buf = new ArrayBuffer(r), this._view = new DataView(this._buf), this._byte = new Uint8Array(this._buf), this._byte.set(s);
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
    return t ? new wi(this._chunks, this.buffer, e) : this.buffer;
  }
}, wi = class {
  constructor(t, e, r) {
    this.chunks = t, this.end = e, this.replacer = r;
  }
  build(t, e) {
    let r = new an(), s = new Map(t);
    for (let [n, i] of this.chunks) {
      let o = s.has(i) || i.hasDefault();
      if (!e && !o)
        throw new Za();
      if (r.writeArrayBuffer(n), o) {
        let a = s.get(i) ?? i.default;
        Qt(a, { writer: r, replacer: this.replacer });
      } else
        r.chunk(i);
    }
    return r.writeArrayBuffer(this.end), r.output(!!e, this.replacer);
  }
};
function _i(t, e) {
  return Object.fromEntries(Object.entries(t).map(([r, s]) => [r, Qt(s, { ...e, partial: !0 })]));
}
var se = class {
  constructor(t, e) {
    this.tag = t, this.value = e;
  }
}, po;
function Qt(t, e = {}) {
  let r = e.writer ?? new an(), s = new Map(e.fills ?? []);
  function n(i) {
    let o = e.replacer ? e.replacer(i) : i;
    if (o === void 0)
      return r.writeUint8(247);
    if (o === null)
      return r.writeUint8(246);
    if (o === !0)
      return r.writeUint8(245);
    if (o === !1)
      return r.writeUint8(244);
    switch (typeof o) {
      case "number": {
        if (Number.isInteger(o))
          if (o >= 0 && o <= 9007199254740992)
            r.writeMajor(0, o);
          else if (o < 0 && o >= -9007199254740992)
            r.writeMajor(1, -(o + 1));
          else
            throw new Fn("Number too big to be encoded");
        else
          r.writeUint8(251), r.writeFloat64(o);
        return;
      }
      case "bigint": {
        if (o >= 0 && o < Bn)
          r.writeMajor(0, o);
        else if (o <= 0 && o >= -Bn)
          r.writeMajor(1, -(o + 1n));
        else
          throw new Fn("BigInt too big to be encoded");
        return;
      }
      case "string": {
        po ??= new TextEncoder();
        let a = po.encode(o);
        r.writeMajor(3, a.byteLength), r.writeUint8Array(a);
        return;
      }
      default: {
        if (Array.isArray(o)) {
          r.writeMajor(4, o.length);
          for (let l of o)
            n(l);
          return;
        }
        if (o instanceof se) {
          r.writeMajor(6, o.tag), n(o.value);
          return;
        }
        if (o instanceof yi) {
          r.writeArrayBuffer(o.encoded);
          return;
        }
        if (o instanceof Ha) {
          if (s.has(o))
            n(s.get(o));
          else {
            if (!e.partial)
              throw new Fa();
            r.chunk(o);
          }
          return;
        }
        if (o instanceof wi) {
          let l = o.build(e.fills ?? [], e.partial);
          e.partial ? r.writePartiallyEncoded(l) : r.writeArrayBuffer(l);
          return;
        }
        if (o instanceof Uint8Array || o instanceof Uint16Array || o instanceof Uint32Array || o instanceof Int8Array || o instanceof Int16Array || o instanceof Int32Array || o instanceof Float32Array || o instanceof Float64Array || o instanceof ArrayBuffer) {
          let l = new Uint8Array(o);
          r.writeMajor(2, l.byteLength), r.writeUint8Array(l);
          return;
        }
        let a = o instanceof Map ? Array.from(o.entries()) : Object.entries(o);
        r.writeMajor(5, a.length);
        for (let l of a.flat())
          n(l);
      }
    }
  }
  return n(t), r.output(!!e.partial, e.replacer);
}
var Zn = class {
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
      throw t instanceof RangeError ? new Ve(t.message) : t;
    }
  }
  readUint16() {
    try {
      return this.read(2, this._view.getUint16(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new Ve(t.message) : t;
    }
  }
  readUint32() {
    try {
      return this.read(4, this._view.getUint32(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new Ve(t.message) : t;
    }
  }
  readUint64() {
    try {
      return this.read(8, this._view.getBigUint64(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new Ve(t.message) : t;
    }
  }
  readFloat16() {
    let t = this.readUint16(), e = (t & 32768) >> 15, r = (t & 31744) >> 10, s = t & 1023;
    return r === 0 ? (e ? -1 : 1) * 2 ** -14 * (s / 2 ** 10) : r === 31 ? s ? Number.NaN : (e ? -1 : 1) * Number.POSITIVE_INFINITY : (e ? -1 : 1) * 2 ** (r - 15) * (1 + s / 2 ** 10);
  }
  readFloat32() {
    try {
      return this.read(4, this._view.getFloat32(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new Ve(t.message) : t;
    }
  }
  readFloat64() {
    try {
      return this.read(8, this._view.getFloat64(this._pos));
    } catch (t) {
      throw t instanceof RangeError ? new Ve(t.message) : t;
    }
  }
  readBytes(t) {
    let e = this._byte.length - this._pos;
    if (e < t)
      throw new Ve(`The argument must be between 0 and ${e}`);
    return this.read(t, this._byte.slice(this._pos, this._pos + t));
  }
  readMajor() {
    let t = this.readUint8(), e = t >> 5;
    if (e < 0 || e > 7)
      throw new on("Received invalid major type");
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
    throw new Ve("Expected a final length");
  }
};
function Hn(t, e) {
  let r = new an();
  for (; ; ) {
    let [s, n] = t.readMajor();
    if (s === 7 && n === 31)
      break;
    if (s !== e)
      throw new on(`Expected a resource of the same major (${e}) while processing an infinite resource`);
    if (n === 31)
      throw new Ve("Expected a finite resource while processing an infinite resource");
    r.writeUint8Array(t.readBytes(Number(t.readMajorLength(n))));
  }
  return r.buffer;
}
var mo;
function Wa(t, e = {}) {
  let r = t instanceof Zn ? t : new Zn(t);
  function s() {
    let [i, o] = r.readMajor();
    switch (i) {
      case 0:
        return r.readMajorLength(o);
      case 1: {
        let a = r.readMajorLength(o);
        return typeof a == "bigint" ? -(a + 1n) : -(a + 1);
      }
      case 2:
        return o === 31 ? Hn(r, 2) : r.readBytes(Number(r.readMajorLength(o))).buffer;
      case 3: {
        let a = o === 31 ? Hn(r, 3) : r.readBytes(Number(r.readMajorLength(o)));
        return mo ??= new TextDecoder(), mo.decode(a);
      }
      case 4: {
        if (o === 31) {
          let c = [];
          for (; ; )
            try {
              c.push(n());
            } catch (u) {
              if (u instanceof ls)
                break;
              throw u;
            }
          return c;
        }
        let a = r.readMajorLength(o), l = Array(a);
        for (let c = 0; c < a; c++)
          l[c] = n();
        return l;
      }
      case 5: {
        let a = [];
        if (o === 31)
          for (; ; ) {
            let l;
            try {
              l = n();
            } catch (u) {
              if (u instanceof ls)
                break;
              throw u;
            }
            let c = n();
            a.push([l, c]);
          }
        else {
          let l = r.readMajorLength(o);
          for (let c = 0; c < l; c++) {
            let u = n(), d = n();
            a[c] = [u, d];
          }
        }
        return e.map === "map" ? new Map(a) : Object.fromEntries(a);
      }
      case 6: {
        let a = r.readMajorLength(o), l = n();
        return new se(a, l);
      }
      case 7:
        switch (o) {
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
            throw new ls();
        }
    }
    throw new on(`Unable to decode value with major tag ${i}`);
  }
  function n() {
    return e.replacer ? e.replacer(s()) : s();
  }
  return n();
}
function Rh(t) {
  let e = Math.floor(t.getTime() / 1e3), r = t.getTime() - e * 1e3;
  return [e, r * 1e6];
}
function Lh([t, e]) {
  let r = new Date(0);
  return r.setUTCSeconds(Number(t)), r.setMilliseconds(Math.floor(Number(e) / 1e6)), r;
}
var Wn = class {
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
}, xi = 1, Ft = xi / 1e3, Gn = Ft / 1e3, Ms = 1e3 * xi, zs = 60 * Ms, js = 60 * zs, Us = 24 * js, qn = 7 * Us, ki = /* @__PURE__ */ new Map([["ns", Gn], ["\xB5s", Ft], ["\u03BCs", Ft], ["us", Ft], ["ms", xi], ["s", Ms], ["m", zs], ["h", js], ["d", Us], ["w", qn]]), Ih = Array.from(ki).reduce((t, [e, r]) => (t.set(r, e), t), /* @__PURE__ */ new Map()), Dh = new RegExp(`^(\\d+)(${Array.from(ki.keys()).join("|")})`), yn = class Ee {
  _milliseconds;
  constructor(e) {
    e instanceof Ee ? this._milliseconds = e._milliseconds : typeof e == "string" ? this._milliseconds = Ee.parseString(e) : this._milliseconds = e;
  }
  static fromCompact([e, r]) {
    e = e ?? 0, r = r ?? 0;
    let s = e * 1e3 + r / 1e6;
    return new Ee(s);
  }
  toCompact() {
    let e = Math.floor(this._milliseconds / 1e3), r = Math.floor((this._milliseconds - e * 1e3) * 1e6);
    return r > 0 ? [e, r] : e > 0 ? [e] : [];
  }
  toString() {
    let e = this._milliseconds, r = "";
    function s(n) {
      let i = Math.floor(e / n);
      return i > 0 && (e = e % n), i;
    }
    for (let [n, i] of Array.from(Ih).reverse()) {
      let o = s(n);
      o > 0 && (r += `${o}${i}`);
    }
    return r;
  }
  toJSON() {
    return this.toString();
  }
  static parseString(e) {
    let r = 0, s = e;
    for (; s !== ""; ) {
      let n = s.match(Dh);
      if (n) {
        let i = Number.parseInt(n[1]), o = ki.get(n[2]);
        if (o === void 0)
          throw new Q(`Invalid duration unit: ${n[2]}`);
        r += i * o, s = s.slice(n[0].length);
        continue;
      }
      throw new Q("Could not match a next duration part");
    }
    return r;
  }
  static nanoseconds(e) {
    return new Ee(Math.floor(e * Gn));
  }
  static microseconds(e) {
    return new Ee(Math.floor(e * Ft));
  }
  static milliseconds(e) {
    return new Ee(e);
  }
  static seconds(e) {
    return new Ee(e * Ms);
  }
  static minutes(e) {
    return new Ee(e * zs);
  }
  static hours(e) {
    return new Ee(e * js);
  }
  static days(e) {
    return new Ee(e * Us);
  }
  static weeks(e) {
    return new Ee(e * qn);
  }
  get microseconds() {
    return Math.floor(this._milliseconds / Ft);
  }
  get nanoseconds() {
    return Math.floor(this._milliseconds / Gn);
  }
  get milliseconds() {
    return Math.floor(this._milliseconds);
  }
  get seconds() {
    return Math.floor(this._milliseconds / Ms);
  }
  get minutes() {
    return Math.floor(this._milliseconds / zs);
  }
  get hours() {
    return Math.floor(this._milliseconds / js);
  }
  get days() {
    return Math.floor(this._milliseconds / Us);
  }
  get weeks() {
    return Math.floor(this._milliseconds / qn);
  }
}, Pt = class {
};
function go(t) {
  return t instanceof Wn ? Number.parseFloat(t.decimal) : t;
}
var bo = class cs extends Pt {
  point;
  constructor(e) {
    super(), e instanceof cs ? this.point = e.clone().point : this.point = [go(e[0]), go(e[1])];
  }
  toJSON() {
    return { type: "Point", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.point;
  }
  is(e) {
    return e instanceof cs ? this.point[0] === e.point[0] && this.point[1] === e.point[1] : !1;
  }
  clone() {
    return new cs([...this.point]);
  }
}, vo = class us extends Pt {
  line;
  constructor(e) {
    super(), this.line = e instanceof us ? e.clone().line : e;
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
    if (!(e instanceof us) || this.line.length !== e.line.length)
      return !1;
    for (let r = 0; r < this.line.length; r++)
      if (!this.line[r].is(e.line[r]))
        return !1;
    return !0;
  }
  clone() {
    return new us(this.line.map((e) => e.clone()));
  }
}, yo = class ds extends Pt {
  polygon;
  constructor(e) {
    super(), this.polygon = e instanceof ds ? e.clone().polygon : e.map((r) => {
      let s = r.clone();
      return s.close(), s;
    });
  }
  toJSON() {
    return { type: "Polygon", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.polygon.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof ds) || this.polygon.length !== e.polygon.length)
      return !1;
    for (let r = 0; r < this.polygon.length; r++)
      if (!this.polygon[r].is(e.polygon[r]))
        return !1;
    return !0;
  }
  clone() {
    return new ds(this.polygon.map((e) => e.clone()));
  }
}, wo = class hs extends Pt {
  points;
  constructor(e) {
    super(), this.points = e instanceof hs ? e.points : e;
  }
  toJSON() {
    return { type: "MultiPoint", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.points.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof hs) || this.points.length !== e.points.length)
      return !1;
    for (let r = 0; r < this.points.length; r++)
      if (!this.points[r].is(e.points[r]))
        return !1;
    return !0;
  }
  clone() {
    return new hs(this.points.map((e) => e.clone()));
  }
}, _o = class fs extends Pt {
  lines;
  constructor(e) {
    super(), this.lines = e instanceof fs ? e.lines : e;
  }
  toJSON() {
    return { type: "MultiLineString", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.lines.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof fs) || this.lines.length !== e.lines.length)
      return !1;
    for (let r = 0; r < this.lines.length; r++)
      if (!this.lines[r].is(e.lines[r]))
        return !1;
    return !0;
  }
  clone() {
    return new fs(this.lines.map((e) => e.clone()));
  }
}, xo = class ps extends Pt {
  polygons;
  constructor(e) {
    super(), this.polygons = e instanceof ps ? e.polygons : e;
  }
  toJSON() {
    return { type: "MultiPolygon", coordinates: this.coordinates };
  }
  get coordinates() {
    return this.polygons.map((e) => e.coordinates);
  }
  is(e) {
    if (!(e instanceof ps) || this.polygons.length !== e.polygons.length)
      return !1;
    for (let r = 0; r < this.polygons.length; r++)
      if (!this.polygons[r].is(e.polygons[r]))
        return !1;
    return !0;
  }
  clone() {
    return new ps(this.polygons.map((e) => e.clone()));
  }
}, ko = class ms extends Pt {
  collection;
  constructor(e) {
    super(), this.collection = e instanceof ms ? e.collection : e;
  }
  toJSON() {
    return { type: "GeometryCollection", geometries: this.geometries };
  }
  get geometries() {
    return this.collection.map((e) => e.toJSON());
  }
  is(e) {
    if (!(e instanceof ms) || this.collection.length !== e.collection.length)
      return !1;
    for (let r = 0; r < this.collection.length; r++)
      if (!this.collection[r].is(e.collection[r]))
        return !1;
    return !0;
  }
  clone() {
    return new ms(this.collection.map((e) => e.clone()));
  }
}, Mh = 9223372036854775807n, So = class {
  tb;
  id;
  constructor(t, e) {
    if (typeof t != "string")
      throw new Q("TB part is not valid");
    if (!Vh(e))
      throw new Q("ID part is not valid");
    this.tb = t, this.id = e;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    let t = $o(this.tb), e = typeof this.id == "string" ? $o(this.id) : typeof this.id == "bigint" || typeof this.id == "number" ? jh(this.id) : JSON.stringify(this.id);
    return `${t}:${e}`;
  }
}, zh = class {
  rid;
  constructor(t) {
    if (typeof t != "string")
      throw new Q("String Record ID must be a string");
    this.rid = t;
  }
  toJSON() {
    return this.rid;
  }
  toString() {
    return this.rid;
  }
};
function jh(t) {
  return t <= Mh ? t.toString() : `\u27E8${t}\u27E9`;
}
function $o(t) {
  if (Uh(t))
    return `\u27E8${t}\u27E9`;
  let e, r, s;
  for (r = 0, s = t.length; r < s; r++)
    if (e = t.charCodeAt(r), !(e > 47 && e < 58) && !(e > 64 && e < 91) && !(e > 96 && e < 123) && e !== 95)
      return `\u27E8${t.replaceAll("\u27E9", "\u27E9")}\u27E9`;
  return t;
}
function Uh(t) {
  let e = Number.parseInt(t);
  return !Number.isNaN(e) && e.toString() === t;
}
function Vh(t) {
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
var Co = class {
  tb;
  constructor(t) {
    if (typeof t != "string")
      throw new Q("Table must be a string");
    this.tb = t;
  }
  toJSON() {
    return this.tb;
  }
  toString() {
    return this.tb;
  }
}, ns = "0123456789abcdef", jt = class mr {
  constructor(e) {
    this.bytes = e;
  }
  static ofInner(e) {
    if (e.length !== 16)
      throw new TypeError("not 128-bit length");
    return new mr(e);
  }
  static fromFieldsV7(e, r, s, n) {
    if (!Number.isInteger(e) || !Number.isInteger(r) || !Number.isInteger(s) || !Number.isInteger(n) || e < 0 || r < 0 || s < 0 || n < 0 || e > 281474976710655 || r > 4095 || s > 1073741823 || n > 4294967295)
      throw new RangeError("invalid field value");
    let i = new Uint8Array(16);
    return i[0] = e / 2 ** 40, i[1] = e / 2 ** 32, i[2] = e / 2 ** 24, i[3] = e / 2 ** 16, i[4] = e / 2 ** 8, i[5] = e, i[6] = 112 | r >>> 8, i[7] = r, i[8] = 128 | s >>> 24, i[9] = s >>> 16, i[10] = s >>> 8, i[11] = s, i[12] = n >>> 24, i[13] = n >>> 16, i[14] = n >>> 8, i[15] = n, new mr(i);
  }
  static parse(e) {
    var r, s, n, i;
    let o;
    switch (e.length) {
      case 32:
        o = (r = /^[0-9a-f]{32}$/i.exec(e)) === null || r === void 0 ? void 0 : r[0];
        break;
      case 36:
        o = (s = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(e)) === null || s === void 0 ? void 0 : s.slice(1, 6).join("");
        break;
      case 38:
        o = (n = /^\{([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})\}$/i.exec(e)) === null || n === void 0 ? void 0 : n.slice(1, 6).join("");
        break;
      case 45:
        o = (i = /^urn:uuid:([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(e)) === null || i === void 0 ? void 0 : i.slice(1, 6).join("");
        break;
    }
    if (o) {
      let a = new Uint8Array(16);
      for (let l = 0; l < 16; l += 4) {
        let c = parseInt(o.substring(2 * l, 2 * l + 8), 16);
        a[l + 0] = c >>> 24, a[l + 1] = c >>> 16, a[l + 2] = c >>> 8, a[l + 3] = c;
      }
      return new mr(a);
    } else
      throw new SyntaxError("could not parse UUID string");
  }
  toString() {
    let e = "";
    for (let r = 0; r < this.bytes.length; r++)
      e += ns.charAt(this.bytes[r] >>> 4), e += ns.charAt(this.bytes[r] & 15), (r === 3 || r === 5 || r === 7 || r === 9) && (e += "-");
    return e;
  }
  toHex() {
    let e = "";
    for (let r = 0; r < this.bytes.length; r++)
      e += ns.charAt(this.bytes[r] >>> 4), e += ns.charAt(this.bytes[r] & 15);
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
    return new mr(this.bytes.slice(0));
  }
  equals(e) {
    return this.compareTo(e) === 0;
  }
  compareTo(e) {
    for (let r = 0; r < 16; r++) {
      let s = this.bytes[r] - e.bytes[r];
      if (s !== 0)
        return Math.sign(s);
    }
    return 0;
  }
}, Ga = class {
  constructor(t) {
    this.timestamp = 0, this.counter = 0, this.random = t ?? Bh();
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
    return jt.fromFieldsV7(this.timestamp, Math.trunc(this.counter / 2 ** 30), this.counter & 2 ** 30 - 1, this.random.nextUint32());
  }
  resetCounter() {
    this.counter = this.random.nextUint32() * 1024 + (this.random.nextUint32() & 1023);
  }
  generateV4() {
    let t = new Uint8Array(Uint32Array.of(this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32()).buffer);
    return t[6] = 64 | t[6] >>> 4, t[8] = 128 | t[8] >>> 2, jt.ofInner(t);
  }
}, Bh = () => {
  if (typeof crypto < "u" && typeof crypto.getRandomValues < "u")
    return new Fh();
  if (typeof UUIDV7_DENY_WEAK_RNG < "u" && UUIDV7_DENY_WEAK_RNG)
    throw new Error("no cryptographically strong RNG available");
  return { nextUint32: () => Math.trunc(Math.random() * 65536) * 65536 + Math.trunc(Math.random() * 65536) };
}, Fh = class {
  constructor() {
    this.buffer = new Uint32Array(8), this.cursor = 65535;
  }
  nextUint32() {
    return this.cursor >= this.buffer.length && (crypto.getRandomValues(this.buffer), this.cursor = 0), this.buffer[this.cursor++];
  }
}, Vs, Zh = () => (Vs || (Vs = new Ga())).generate(), Hh = () => (Vs || (Vs = new Ga())).generateV4(), Kn = class gs {
  inner;
  constructor(e) {
    e instanceof ArrayBuffer ? this.inner = jt.ofInner(new Uint8Array(e)) : e instanceof Uint8Array ? this.inner = jt.ofInner(e) : e instanceof gs ? this.inner = e.inner : e instanceof jt ? this.inner = e : this.inner = jt.parse(e);
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
    return new gs(Hh());
  }
  static v7() {
    return new gs(Zh());
  }
}, Wh = 0, Ao = 37, Eo = 6, To = 7, wn = 8, Gh = 9, Oo = 10, Po = 12, qh = 13, No = 14, Ro = 88, Lo = 89, Io = 90, Do = 91, Mo = 92, zo = 93, jo = 94, Yr = { encode(t) {
  return t instanceof Date ? new se(Po, Rh(t)) : t === void 0 ? new se(Eo, null) : t instanceof Kn ? new se(Ao, t.toBuffer()) : t instanceof Wn ? new se(Oo, t.toString()) : t instanceof yn ? new se(No, t.toCompact()) : t instanceof So ? new se(wn, [t.tb, t.id]) : t instanceof zh ? new se(wn, t.rid) : t instanceof Co ? new se(To, t.tb) : t instanceof bo ? new se(Ro, t.point) : t instanceof vo ? new se(Lo, t.line) : t instanceof yo ? new se(Io, t.polygon) : t instanceof wo ? new se(Do, t.points) : t instanceof _o ? new se(Mo, t.lines) : t instanceof xo ? new se(zo, t.polygons) : t instanceof ko ? new se(jo, t.collection) : t;
}, decode(t) {
  if (!(t instanceof se))
    return t;
  switch (t.tag) {
    case Wh:
      return new Date(t.value);
    case Ao:
    case Gh:
      return new Kn(t.value);
    case Po:
      return Lh(t.value);
    case Eo:
      return;
    case Oo:
      return new Wn(t.value);
    case qh:
      return new yn(t.value);
    case No:
      return yn.fromCompact(t.value);
    case To:
      return new Co(t.value);
    case wn:
      return new So(t.value[0], t.value[1]);
    case Ro:
      return new bo(t.value);
    case Lo:
      return new vo(t.value);
    case Io:
      return new yo(t.value);
    case Do:
      return new wo(t.value);
    case Mo:
      return new _o(t.value);
    case zo:
      return new xo(t.value);
    case jo:
      return new ko(t.value);
  }
} };
Object.freeze(Yr);
function Kh(t) {
  return Qt(t, { replacer: Yr.encode });
}
function Yh(t) {
  return Wa(t, { replacer: Yr.decode });
}
var Jh = class {
  query;
  bindings;
  constructor(t, e, r) {
    this.query = new yi(Qt(t)), this.bindings = _i(e ?? {}, { replacer: Yr.encode });
  }
  build(t) {
    return Qt([this.query, this.bindings]);
  }
};
function Uo(t) {
  let e = {}, r = (s, n, i) => {
    if (s in t)
      e[n] = `${t[s]}`, delete e[s];
    else if (i !== !0)
      throw new Q(`Key ${s} is missing from the authentication parameters`);
  };
  return "scope" in t ? (e = { ...t }, r("scope", "sc"), r("namespace", "ns"), r("database", "db")) : "variables" in t ? (e = { ...t.variables }, r("access", "ac"), r("namespace", "ns"), r("database", "db")) : (r("access", "ac", !0), r("database", "db", !0), r("namespace", "ns", !("database" in t)), r("username", "user"), r("password", "pass")), e;
}
var Xh = ["CREATE", "UPDATE", "DELETE"];
function Qh(t) {
  return !(typeof t != "object" || t === null || !("id" in t && "action" in t && "result" in t) || !(t.id instanceof Kn) || !Xh.includes(t.action) || typeof t.result != "object" || t.result === null);
}
var ef = 5e3, qa = "1.4.2", Ka = "3.0.0";
function tf(t, e = qa, r = Ka) {
  if (!rf(t, e, r))
    throw new Nh(t, `>= ${e} < ${r}`);
  return !0;
}
function rf(t, e = qa, r = Ka) {
  return e.localeCompare(t, void 0, { numeric: !0 }) <= 0 && r.localeCompare(t, void 0, { numeric: !0 }) === 1;
}
async function Ya(t, e) {
  let r = { "ws:": "http:", "wss:": "https:", "http:": "http:", "https:": "https:" }[t.protocol];
  if (r) {
    let s = t.pathname.slice(0, -4);
    t = new URL(t), t.pathname = `${s}/version`, t.protocol = r;
    let n = new AbortController(), i = setTimeout(() => n.abort(), e ?? ef), o = "surrealdb-";
    return await fetch(t, { signal: n.signal }).then((a) => a.text()).then((a) => a.slice(o.length)).catch((a) => {
      throw new fo(a);
    }).finally(() => {
      clearTimeout(i);
    });
  }
  throw new fo();
}
var _n = 0;
function Ja() {
  return _n = (_n + 1) % Number.MAX_SAFE_INTEGER, _n.toString();
}
var sf = ((t) => (t.Disconnected = "disconnected", t.Connecting = "connecting", t.Connected = "connected", t.Error = "error", t))(sf || {}), nf = class {
  emitter;
  encodeCbor;
  decodeCbor;
  constructor({ emitter: t, encodeCbor: e, decodeCbor: r }) {
    this.emitter = t, this.encodeCbor = e, this.decodeCbor = r;
  }
}, Xa = class {
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
function Vo(t, e) {
  if ("scope" in t || "access" in t && "variables" in t && t.variables) {
    if (!t.namespace) {
      if (!e?.namespace)
        throw new Oh();
      t.namespace = e.namespace;
    }
    if (!t.database) {
      if (!e?.database)
        throw new Ph();
      t.database = e.database;
    }
  }
  return t;
}
var Bo = class extends Xa {
  connection = { url: void 0, namespace: void 0, database: void 0, token: void 0, variables: {} };
  setStatus(t, ...e) {
    this.status = t, this.emitter.emit(t, e);
  }
  version(t, e) {
    return Ya(t, e);
  }
  connect(t) {
    return this.setStatus("connecting"), this.connection.url = t, this.setStatus("connected"), this.ready = new Promise((e) => e()), this.ready;
  }
  disconnect() {
    return this.connection = { url: void 0, namespace: void 0, database: void 0, token: void 0, variables: {} }, this.ready = void 0, this.setStatus("disconnected"), new Promise((t) => t());
  }
  async rpc(t) {
    if (await this.ready, !this.connection.url)
      throw new Ba();
    if (t.method === "use") {
      let [i, o] = t.params;
      return i === null && (this.connection.namespace = void 0), o === null && (this.connection.database = void 0), i && (this.connection.namespace = i), o && (this.connection.database = o), { result: !0 };
    }
    if (t.method === "let") {
      let [i, o] = t.params;
      return this.connection.variables[i] = o, { result: !0 };
    }
    if (t.method === "unset") {
      let [i] = t.params;
      return delete this.connection.variables[i], { result: !0 };
    }
    if (t.method === "query" && (t.params = [t.params?.[0], { ...this.connection.variables, ...t.params?.[1] ?? {} }]), !this.connection.namespace || !this.connection.database)
      throw new Eh();
    let e = Ja(), r = await fetch(`${this.connection.url}`, { method: "POST", headers: { "Content-Type": "application/cbor", Accept: "application/cbor", "Surreal-NS": this.connection.namespace, "Surreal-DB": this.connection.database, ...this.connection.token ? { Authorization: `Bearer ${this.connection.token}` } : {} }, body: this.encodeCbor({ id: e, ...t }) }), s = await r.arrayBuffer();
    if (r.status === 200) {
      let i = this.decodeCbor(s);
      if ("result" in i)
        switch (t.method) {
          case "signin":
          case "signup": {
            this.connection.token = i.result;
            break;
          }
          case "authenticate": {
            let [o] = t.params;
            this.connection.token = o;
            break;
          }
          case "invalidate": {
            this.connection.token = void 0;
            break;
          }
        }
      return this.emitter.emit(`rpc-${e}`, [i]), i;
    }
    let n = new TextDecoder("utf-8");
    throw new Th(n.decode(s), r.status, r.statusText, s);
  }
  get connected() {
    return !!this.connection.url;
  }
};
function of() {
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
var af = of(), Fo = class extends Xa {
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
    return Ya(t, e);
  }
  async connect(t) {
    this.connection.url = t, this.setStatus("connecting");
    let e = new af(t.toString(), "cbor"), r = new Promise((s, n) => {
      e.addEventListener("open", () => {
        this.setStatus("connected"), s();
      }), e.addEventListener("error", (i) => {
        let o = new Ch("error" in i ? i.error : "An unexpected error occurred");
        this.setStatus("error", o), n(o);
      }), e.addEventListener("close", () => {
        this.setStatus("disconnected");
      }), e.addEventListener("message", async ({ data: i }) => {
        try {
          let o = this.decodeCbor(i instanceof Blob ? await i.arrayBuffer() : i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength));
          if (typeof o == "object" && o != null && Object.getPrototypeOf(o) === Object.prototype)
            this.handleRpcResponse(o);
          else
            throw new uo(o);
        } catch (o) {
          e.dispatchEvent(new CustomEvent("error", { detail: o }));
        }
      });
    });
    return this.ready = r, await r.then(() => {
      this.socket = e, this.pinger?.stop(), this.pinger = new lf(3e4), this.pinger.start(() => this.rpc({ method: "ping" }));
    });
  }
  async disconnect() {
    this.connection = { url: void 0, namespace: void 0, database: void 0, token: void 0 }, await this.ready?.catch(() => {
    }), this.socket?.close(), this.ready = void 0, this.socket = void 0, await Promise.any([this.requireStatus("disconnected"), this.requireStatus("error")]);
  }
  async rpc(t) {
    if (await this.ready, !this.socket)
      throw new Ba();
    let e = Ja(), r = this.emitter.subscribeOnce(`rpc-${e}`);
    this.socket.send(this.encodeCbor({ id: e, ...t }));
    let [s] = await r;
    if (s instanceof Va)
      throw s;
    if ("result" in s)
      switch (t.method) {
        case "use": {
          let [n, i] = t.params;
          n === null && (this.connection.namespace = void 0), i === null && (this.connection.database = void 0), n && (this.connection.namespace = n), i && (this.connection.database = i);
          break;
        }
        case "signin":
        case "signup": {
          this.connection.token = s.result;
          break;
        }
        case "authenticate": {
          let [n] = t.params;
          this.connection.token = n;
          break;
        }
        case "invalidate": {
          this.connection.token = void 0;
          break;
        }
      }
    return s;
  }
  handleRpcResponse({ id: t, ...e }) {
    if (t)
      this.emitter.emit(`rpc-${t}`, [e]);
    else if (e.error)
      this.setStatus("error", new q(e.error));
    else if (Qh(e.result)) {
      let { id: r, action: s, result: n } = e.result;
      this.emitter.emit(`live-${r}`, [s, n], !0);
    } else
      this.setStatus("error", new uo({ id: t, ...e }));
  }
  get connected() {
    return !!this.socket;
  }
}, lf = class {
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
}, cf = class {
  connection;
  ready;
  emitter;
  engines = { ws: Fo, wss: Fo, http: Bo, https: Bo };
  constructor({ engines: t } = {}) {
    this.emitter = new kh(), this.emitter.subscribe("disconnected", () => this.clean()), this.emitter.subscribe("error", () => this.close()), t && (this.engines = { ...this.engines, ...t });
  }
  async connect(t, e = {}) {
    t = new URL(t), t.pathname.endsWith("/rpc") || (t.pathname.endsWith("/") || (t.pathname += "/"), t.pathname += "rpc");
    let r = t.protocol.slice(0, -1), s = this.engines[r];
    if (!s)
      throw new Ah(r);
    let { prepare: n, auth: i, namespace: o, database: a } = e;
    await this.close();
    let l = new nf({ emitter: this.emitter, encodeCbor: Kh, decodeCbor: Yh }), c = new s(l);
    if (e.versionCheck !== !1) {
      let u = await c.version(t, e.versionCheckTimeout);
      tf(u);
    }
    return this.connection = c, this.ready = new Promise((u, d) => c.connect(t).then(async () => {
      (o || a) && await this.use({ namespace: o, database: a }), typeof i == "string" ? await this.authenticate(i) : i && await this.signin(i), await n?.(this), u();
    }).catch(d)), await this.ready, !0;
  }
  async close() {
    return this.clean(), await this.connection?.disconnect(), !0;
  }
  clean() {
    let t = this.emitter.scanListeners((r) => r.startsWith("rpc-"));
    t.map((r) => this.emitter.emit(r, [new Va()]));
    let e = this.emitter.scanListeners((r) => r.startsWith("live-"));
    e.map((r) => this.emitter.emit(r, ["CLOSE", "disconnected"])), this.emitter.reset({ collectable: !0, listeners: [...t, ...e] });
  }
  get status() {
    return this.connection?.status ?? "disconnected";
  }
  async ping() {
    let { error: t } = await this.rpc("ping");
    if (t)
      throw new q(t.message);
    return !0;
  }
  async use({ namespace: t, database: e }) {
    if (!this.connection)
      throw new wt();
    if (t === null && e !== null)
      throw new Q("Cannot unset namespace without unsetting database");
    let { error: r } = await this.rpc("use", [t, e]);
    if (r)
      throw new q(r.message);
    return !0;
  }
  async info() {
    await this.ready;
    let t = await this.rpc("info");
    if (t.error)
      throw new q(t.error.message);
    return t.result ?? void 0;
  }
  async signup(t) {
    if (!this.connection)
      throw new wt();
    let e = Vo(t, this.connection.connection), r = Uo(e), s = await this.rpc("signup", [r]);
    if (s.error)
      throw new q(s.error.message);
    if (!s.result)
      throw new ho();
    return s.result;
  }
  async signin(t) {
    if (!this.connection)
      throw new wt();
    let e = Vo(t, this.connection.connection), r = Uo(e), s = await this.rpc("signin", [r]);
    if (s.error)
      throw new q(s.error.message);
    if (!s.result)
      throw new ho();
    return s.result;
  }
  async authenticate(t) {
    let e = await this.rpc("authenticate", [t]);
    if (e.error)
      throw new q(e.error.message);
    return !0;
  }
  async invalidate() {
    let t = await this.rpc("invalidate");
    if (t.error)
      throw new q(t.error.message);
    return !0;
  }
  async let(t, e) {
    let r = await this.rpc("let", [t, e]);
    if (r.error)
      throw new q(r.error.message);
    return !0;
  }
  async unset(t) {
    let e = await this.rpc("unset", [t]);
    if (e.error)
      throw new q(e.error.message);
    return !0;
  }
  async live(t, e, r) {
    await this.ready;
    let s = await this.rpc("live", [t, r]);
    if (s.error)
      throw new q(s.error.message);
    return e && this.subscribeLive(s.result, e), s.result;
  }
  async subscribeLive(t, e) {
    if (await this.ready, !this.connection)
      throw new wt();
    this.connection.emitter.subscribe(`live-${t}`, e, !0);
  }
  async unSubscribeLive(t, e) {
    if (await this.ready, !this.connection)
      throw new wt();
    this.connection.emitter.unSubscribe(`live-${t}`, e);
  }
  async kill(t) {
    if (await this.ready, !this.connection)
      throw new wt();
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
        throw new q(r);
      return r;
    });
  }
  async query_raw(...[t, e]) {
    let r = t instanceof Jh ? [t.query, _i(t.bindings, { fills: e, replacer: Yr.encode })] : [t, e];
    await this.ready;
    let s = await this.rpc("query", r);
    if (s.error)
      throw new q(s.error.message);
    return s.result;
  }
  async select(t) {
    await this.ready;
    let e = await this.rpc("select", [t]);
    if (e.error)
      throw new q(e.error.message);
    return e.result;
  }
  async create(t, e) {
    await this.ready;
    let r = await this.rpc("create", [t, e]);
    if (r.error)
      throw new q(r.error.message);
    return r.result;
  }
  async insert(t, e) {
    await this.ready;
    let r = await this.rpc("insert", [t, e]);
    if (r.error)
      throw new q(r.error.message);
    return r.result;
  }
  async update(t, e) {
    await this.ready;
    let r = await this.rpc("update", [t, e]);
    if (r.error)
      throw new q(r.error.message);
    return r.result;
  }
  async upsert(t, e) {
    await this.ready;
    let r = await this.rpc("upsert", [t, e]);
    if (r.error)
      throw new q(r.error.message);
    return r.result;
  }
  async merge(t, e) {
    await this.ready;
    let r = await this.rpc("merge", [t, e]);
    if (r.error)
      throw new q(r.error.message);
    return r.result;
  }
  async patch(t, e, r) {
    await this.ready;
    let s = await this.rpc("patch", [t, e, r]);
    if (s.error)
      throw new q(s.error.message);
    return s.result;
  }
  async delete(t) {
    await this.ready;
    let e = await this.rpc("delete", [t]);
    if (e.error)
      throw new q(e.error.message);
    return e.result;
  }
  async version() {
    await this.ready;
    let t = await this.rpc("version");
    if (t.error)
      throw new q(t.error.message);
    return t.result;
  }
  async run(t, e, r) {
    await this.ready;
    let [s, n] = Array.isArray(e) ? [void 0, e] : [e, r], i = await this.rpc("run", [t, s, n]);
    if (i.error)
      throw new q(i.error.message);
    return i.result;
  }
  async relate(t, e, r, s) {
    await this.ready;
    let n = await this.rpc("relate", [t, e, r, s]);
    if (n.error)
      throw new q(n.error.message);
    return n.result;
  }
  rpc(t, e) {
    if (!this.connection)
      throw new wt();
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
const ir = (t) => {
};
Z(void 0, {
  equals: !1
});
const Zo = (t) => t.pop().pop(), Si = (t) => {
  const e = [t.name, t.message].filter((r) => r).join("::");
  console.warn(e, t);
}, uf = async (t, e = 10) => {
  for (; !t(); )
    await new Promise((r) => setTimeout(r, e));
};
function Jr(t) {
  if (t instanceof ee.ZodEffects)
    return t.innerType() instanceof ee.ZodEffects ? getDefaults(t.innerType()) : getDefaults(ee.ZodObject.create(t.innerType().shape));
  function e(r) {
    if (r instanceof ee.ZodDefault)
      return r._def.defaultValue();
    if (r instanceof ee.ZodArray)
      return [];
    if (r instanceof ee.ZodString)
      return "";
    if (r instanceof ee.ZodObject)
      return getDefaults(r);
    if ("innerType" in r._def)
      return e(r._def.innerType);
  }
  return Object.fromEntries(
    Object.entries(t.shape).map(([r, s]) => [r, e(s)])
  );
}
const df = ee.object({
  isConnected: ee.boolean().default(!1)
});
class Qa {
  #e;
  #t;
  #r;
  #s;
  #n;
  state;
  constructor(e, r) {
    this.#e = new cf(), this.#t = new URL(`${e.datapoint}/rpc`).toString(), this.#r = e.namespace, this.#s = e.database;
    const [s, n] = r(Jr(df));
    this.#n = n, this.state = s;
  }
  async connect() {
    try {
      console.info("Connecting Surrealdb..."), await this.#e.connect(this.#t, {
        namespace: this.#r,
        database: this.#s
      });
    } catch (e) {
      throw Si(e), e;
    }
    return this.#n((e) => ({
      ...e,
      isConnected: !0
    })), console.info(`DbService connected: ${this.#s}@${this.#r}:${this.#t}`), console.log(this.#e), this;
  }
  async disconnect() {
    this.#e.status === "connected" && await this.#e.close(), this.#n((e) => ({
      ...e,
      isConnected: !1
    }));
  }
  async getDb() {
    return await uf(() => this.state().isConnected && this.#e.status === "connected"), this.#e;
  }
  async getAccountDetails() {
    try {
      const e = await this.#e.query("SELECT email FROM account;");
      return Zo(e);
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
      return Zo(e);
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
const hf = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u), ff = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/), pf = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u), mf = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?!.* ).{3,16}$/), el = ee.string().trim().email("Must be a valid email address"), Ho = ee.string().trim().regex(hf, "Must be a valid name"), tl = ee.string().trim().regex(mf, "Must be 3-16 charcters and contain one digit and a special char"), gf = ee.string().trim().regex(pf, "Must be a valid street address").or(ee.literal("")), bf = ee.preprocess(
  (t) => t.split(" ").join(""),
  ee.string().trim().regex(ff, "Must be a valid phone number").or(ee.literal(""))
), Bs = (t, e, r) => {
  const s = t.safeParse(e);
  if (s.success)
    return r({}), s.data;
  r(s.error.flatten());
}, rl = (t, e) => {
  const r = t.safeParse(e);
  r.success || console.warn("Incompatible data loaded:", r.error.flatten());
}, vf = ee.object({
  isAuthenticated: ee.boolean().default(!1)
}), xn = ee.object({
  email: el.default(""),
  pass: tl.default("")
});
class sl {
  #e;
  #t;
  #r;
  #s;
  state;
  constructor(e, r, s) {
    this.#e = e, this.#t = r, this.#r = "";
    const [n, i] = s(Jr(vf));
    this.#s = i, this.state = n;
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
        return Si(r), this.signout();
      }
      this.#s((r) => ({
        ...r,
        isAuthenticated: this.#i
      }));
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
    } catch (s) {
      throw s;
    }
    this.#n(), this.#s((s) => ({
      ...s,
      isAuthenticated: this.#i
    }));
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
    } catch (s) {
      throw s;
    }
    this.#n(), this.#s((s) => ({
      ...s,
      isAuthenticated: this.#i
    }));
  }
  async signout() {
    this.#r = "", this.#n(), await (await this.#e.getDb()).invalidate(), this.#s((r) => ({
      ...r,
      isAuthenticated: this.#i
    }));
  }
  get #i() {
    return !!this.#r && this.#e.state().isConnected;
  }
}
const $i = ee.object({
  email: el.default(""),
  pass: tl.default("")
}), yf = $i.omit({ pass: !0 });
class wf {
  #e;
  #t;
  state;
  constructor(e, r) {
    this.#e = e;
    const [s, n] = r(Jr($i));
    this.#t = n, this.state = s;
  }
  async loadData() {
    const e = await this.#e.getAccountDetails();
    rl(yf, e), this.#t(e);
  }
  async saveData(e) {
    await this.#e.setAccountDetails(e), this.#t(e);
  }
}
const Ci = ee.object({
  firstName: Ho.default(""),
  lastName: Ho.default(""),
  address: gf.default(""),
  phone: bf.default("")
}), _f = Ci;
class xf {
  #e;
  #t;
  state;
  constructor(e, r) {
    this.#e = e;
    const [s, n] = r(Jr(Ci));
    this.#t = n, this.state = s;
  }
  async loadData() {
    const e = await this.#e.getProfileDetails();
    rl(_f, e), this.#t(e);
  }
  async saveData(e) {
    await this.#e.setProfileDetails(e), this.#t(e);
  }
}
var kf = /* @__PURE__ */ G("<div class=loading><sl-spinner style=font-size:50px;--track-width:10px;></sl-spinner><div>", !0, !1);
const Xr = (t) => (() => {
  var e = kf(), r = e.firstChild, s = r.nextSibling;
  return r._$owner = J(), E(s, () => t.children), e;
})(), nl = Br(), Sf = (t) => {
  const e = new Qa({
    datapoint: t.datapoint,
    namespace: t.namespace,
    database: t.database
  }, Z), r = new sl(e, {
    namespace: t.namespace,
    database: t.database,
    scope: t.scope
  }, Z), s = new wf(e, Z), n = new xf(e, Z), i = {
    auth: r,
    account: s,
    profile: n
  };
  return Oe(() => !e.state().isConnected, async () => {
    await e.connect();
  }), _(Zr, {
    get fallback() {
      return _(Xr, {});
    },
    get children() {
      return [oe(() => ir()), _(nl.Provider, {
        value: i,
        get children() {
          return t.children;
        }
      })];
    }
  });
}, or = () => er(nl), Yn = Symbol("store-raw"), Zt = Symbol("store-node"), Qe = Symbol("store-has"), il = Symbol("store-self");
function ol(t) {
  let e = t[Ie];
  if (!e && (Object.defineProperty(t, Ie, {
    value: e = new Proxy(t, Af)
  }), !Array.isArray(t))) {
    const r = Object.keys(t), s = Object.getOwnPropertyDescriptors(t);
    for (let n = 0, i = r.length; n < i; n++) {
      const o = r[n];
      s[o].get && Object.defineProperty(t, o, {
        enumerable: s[o].enumerable,
        get: s[o].get.bind(e)
      });
    }
  }
  return e;
}
function Fs(t) {
  let e;
  return t != null && typeof t == "object" && (t[Ie] || !(e = Object.getPrototypeOf(t)) || e === Object.prototype || Array.isArray(t));
}
function jr(t, e = /* @__PURE__ */ new Set()) {
  let r, s, n, i;
  if (r = t != null && t[Yn])
    return r;
  if (!Fs(t) || e.has(t))
    return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? t = t.slice(0) : e.add(t);
    for (let o = 0, a = t.length; o < a; o++)
      n = t[o], (s = jr(n, e)) !== n && (t[o] = s);
  } else {
    Object.isFrozen(t) ? t = Object.assign({}, t) : e.add(t);
    const o = Object.keys(t), a = Object.getOwnPropertyDescriptors(t);
    for (let l = 0, c = o.length; l < c; l++)
      i = o[l], !a[i].get && (n = t[i], (s = jr(n, e)) !== n && (t[i] = s));
  }
  return t;
}
function Zs(t, e) {
  let r = t[e];
  return r || Object.defineProperty(t, e, {
    value: r = /* @__PURE__ */ Object.create(null)
  }), r;
}
function Ur(t, e, r) {
  if (t[e])
    return t[e];
  const [s, n] = Z(r, {
    equals: !1,
    internal: !0
  });
  return s.$ = n, t[e] = s;
}
function $f(t, e) {
  const r = Reflect.getOwnPropertyDescriptor(t, e);
  return !r || r.get || !r.configurable || e === Ie || e === Zt || (delete r.value, delete r.writable, r.get = () => t[Ie][e]), r;
}
function al(t) {
  Sn() && Ur(Zs(t, Zt), il)();
}
function Cf(t) {
  return al(t), Reflect.ownKeys(t);
}
const Af = {
  get(t, e, r) {
    if (e === Yn)
      return t;
    if (e === Ie)
      return r;
    if (e === kn)
      return al(t), r;
    const s = Zs(t, Zt), n = s[e];
    let i = n ? n() : t[e];
    if (e === Zt || e === Qe || e === "__proto__")
      return i;
    if (!n) {
      const o = Object.getOwnPropertyDescriptor(t, e);
      Sn() && (typeof i != "function" || t.hasOwnProperty(e)) && !(o && o.get) && (i = Ur(s, e, i)());
    }
    return Fs(i) ? ol(i) : i;
  },
  has(t, e) {
    return e === Yn || e === Ie || e === kn || e === Zt || e === Qe || e === "__proto__" ? !0 : (Sn() && Ur(Zs(t, Qe), e)(), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Cf,
  getOwnPropertyDescriptor: $f
};
function Hs(t, e, r, s = !1) {
  if (!s && t[e] === r)
    return;
  const n = t[e], i = t.length;
  r === void 0 ? (delete t[e], t[Qe] && t[Qe][e] && n !== void 0 && t[Qe][e].$()) : (t[e] = r, t[Qe] && t[Qe][e] && n === void 0 && t[Qe][e].$());
  let o = Zs(t, Zt), a;
  if ((a = Ur(o, e, n)) && a.$(() => r), Array.isArray(t) && t.length !== i) {
    for (let l = t.length; l < i; l++)
      (a = o[l]) && a.$();
    (a = Ur(o, "length", i)) && a.$(t.length);
  }
  (a = o[il]) && a.$();
}
function ll(t, e) {
  const r = Object.keys(e);
  for (let s = 0; s < r.length; s += 1) {
    const n = r[s];
    Hs(t, n, e[n]);
  }
}
function Ef(t, e) {
  if (typeof e == "function" && (e = e(t)), e = jr(e), Array.isArray(e)) {
    if (t === e)
      return;
    let r = 0, s = e.length;
    for (; r < s; r++) {
      const n = e[r];
      t[r] !== n && Hs(t, r, n);
    }
    Hs(t, "length", s);
  } else
    ll(t, e);
}
function gr(t, e, r = []) {
  let s, n = t;
  if (e.length > 1) {
    s = e.shift();
    const o = typeof s, a = Array.isArray(t);
    if (Array.isArray(s)) {
      for (let l = 0; l < s.length; l++)
        gr(t, [s[l]].concat(e), r);
      return;
    } else if (a && o === "function") {
      for (let l = 0; l < t.length; l++)
        s(t[l], l) && gr(t, [l].concat(e), r);
      return;
    } else if (a && o === "object") {
      const { from: l = 0, to: c = t.length - 1, by: u = 1 } = s;
      for (let d = l; d <= c; d += u)
        gr(t, [d].concat(e), r);
      return;
    } else if (e.length > 1) {
      gr(t[s], e, [s].concat(r));
      return;
    }
    n = t[s], r = [s].concat(r);
  }
  let i = e[0];
  typeof i == "function" && (i = i(n, r), i === n) || s === void 0 && i == null || (i = jr(i), s === void 0 || Fs(n) && Fs(i) && !Array.isArray(i) ? ll(n, i) : Hs(t, s, i));
}
function ln(...[t, e]) {
  const r = jr(t || {}), s = Array.isArray(r), n = ol(r);
  function i(...o) {
    Cl(() => {
      s && o.length === 1 ? Ef(r, o[0]) : gr(r, o);
    });
  }
  return [n, i];
}
var Tf = /* @__PURE__ */ G("<sl-alert>", !0, !1), cl = /* @__PURE__ */ G("<sl-icon slot=icon>", !0, !1), Of = /* @__PURE__ */ G("<div class=error><sl-icon class=icon name=exclamation-circle></sl-icon><span>.", !0, !1), Pf = /* @__PURE__ */ G("<div class=field><sl-input>", !0, !1), Nf = /* @__PURE__ */ G("<sl-icon class=rotate slot=suffix name=arrow-repeat>", !0, !1), Rf = /* @__PURE__ */ G("<sl-button>", !0, !1), Lf = /* @__PURE__ */ G("<form>");
const ul = (t) => {
  Ye();
  const [e, r] = Xn(t, ["isOpen"]);
  return (() => {
    var s = Tf();
    return Qn(s, r, !1, !0), s._$owner = J(), E(s, () => t.children, null), E(s, () => t.message, null), be(() => ne(s, "open", e.isOpen)), s;
  })();
}, dl = (t) => _(ul, Ys(t, {
  variant: "success",
  get children() {
    var e = cl();
    return ne(e, "name", "info-circle"), e._$owner = J(), e;
  }
})), Ai = (t) => _(ul, Ys(t, {
  variant: "warning",
  get children() {
    var e = cl();
    return ne(e, "name", "exclamation-triangle"), e._$owner = J(), e;
  }
})), lt = (t) => {
  const {
    t: e
  } = Ye(), [r, s] = Xn(t, ["isSubmiting", "errors"]);
  return (() => {
    var n = Pf(), i = n.firstChild;
    return Qn(i, Ys(s, {
      get disabled() {
        return r.isSubmiting;
      }
    }), !1, !1), i._$owner = J(), E(n, _(ut, {
      get when() {
        return r.errors;
      },
      get children() {
        var o = Of(), a = o.firstChild, l = a.nextSibling, c = l.firstChild;
        return a._$owner = J(), E(l, () => r.errors?.map((u) => e(u) || u).join(". "), c), o;
      }
    }), null), n;
  })();
}, Vr = (t) => {
  const [e, r] = Xn(t, ["isSubmiting", "children"]);
  return (() => {
    var s = Rf();
    return Qn(s, Ys(r, {
      get disabled() {
        return e.isSubmiting;
      }
    }), !1, !0), s._$owner = J(), E(s, _(ut, {
      get when() {
        return e.isSubmiting;
      },
      get children() {
        var n = Nf();
        return n._$owner = J(), n;
      }
    }), null), E(s, () => e.children, null), s;
  })();
}, Ei = (t) => {
  const e = (r) => {
    r.preventDefault(), t.onSubmit();
  };
  return (() => {
    var r = Lf();
    return r.addEventListener("submit", e), E(r, () => t.children), r;
  })();
};
var If = /* @__PURE__ */ G("<div>"), Df = /* @__PURE__ */ G("<section><h2>");
const Mf = () => {
  const {
    t
  } = Ye(), {
    auth: e
  } = or(), [r, s] = ln(Jr(xn)), [n, i] = Z(), [o, a] = Z(), [l, c] = Z({}), [u] = Oe(() => !0, async () => await e.authenticate()), [d] = Oe(o, (v) => e.signin(v)), [m] = Oe(n, (v) => e.signup(v));
  Gs(async () => {
    d.error && (console.warn(d.error?.message), c({
      formErrors: [t("Failed signing in"), t("Did you type your password and email correct?")]
    })), m.error && (console.warn(m.error?.message), c({
      formErrors: [t("Failed signing up"), t("Did you already sign up?")]
    }));
  });
  const p = (v) => (k) => {
    s(v, k.target.value);
  }, b = () => d.loading || m.loading;
  return (() => {
    var v = Df(), k = v.firstChild;
    return E(k, () => t("Sign in")), E(v, _(Zr, {
      get fallback() {
        return _(Xr, {});
      },
      get children() {
        return [oe(() => ir(u())), _(Ei, {
          onSubmit: () => a(Bs(xn, r, c)),
          get children() {
            return [_(lt, {
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
                return l().fieldErrors?.email;
              },
              get ["data-invalid"]() {
                return !!l().fieldErrors?.email || l().formErrors;
              },
              get ["on:sl-change"]() {
                return p("email");
              },
              get isSubmiting() {
                return b();
              }
            }), _(lt, {
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
                return l().fieldErrors?.pass;
              },
              get ["on:sl-change"]() {
                return p("pass");
              },
              get ["data-invalid"]() {
                return !!l().fieldErrors?.pass || l().formErrors;
              },
              get isSubmiting() {
                return b();
              }
            }), _(Ai, {
              get open() {
                return !!l().formErrors?.length;
              },
              get message() {
                return l().formErrors?.join(". ");
              }
            }), (() => {
              var x = If();
              return E(x, _(Vr, {
                onClick: () => i(Bs(xn, r, c)),
                get isSubmiting() {
                  return b();
                },
                variant: "neutral",
                get children() {
                  return t("Sign up");
                }
              }), null), E(x, _(Vr, {
                type: "submit",
                variant: "primary",
                get isSubmiting() {
                  return b();
                },
                get children() {
                  return t("Sign in");
                }
              }), null), x;
            })()];
          }
        })];
      }
    }), null), v;
  })();
}, zf = () => {
  const {
    t
  } = Ye(), {
    auth: e
  } = or(), [r, s] = Z(), [n] = Oe(r, () => e.signout());
  return _(Vr, {
    get isSubmiting() {
      return n.loading;
    },
    onClick: () => s(!0),
    variant: "primary",
    get children() {
      return t("Sign out");
    }
  });
};
var jf = /* @__PURE__ */ G("<div><sl-select>", !0, !1), Uf = /* @__PURE__ */ G("<sl-option>", !0, !1);
const Vf = (t = {}) => {
  const r = {
    ...{
      languageCodeOnly: !0
    },
    ...t
  }, s = navigator.languages === void 0 ? [navigator.language] : navigator.languages;
  return s ? s.map((n) => {
    const i = n.trim();
    return r.languageCodeOnly ? i.split(/-|_/)[0] : i;
  }) : [];
}, Bf = (t) => {
  const {
    locale: e,
    setLocale: r
  } = Ye(), s = (o) => {
    localStorage.langCode = o, r(o);
  };
  let n = localStorage.langCode;
  n || (n = Vf()[0] ?? e()), n !== e() && s(n);
  const i = oe(() => ao.find(({
    code: o
  }) => o === e()));
  return (() => {
    var o = jf(), a = o.firstChild;
    return a.addEventListener("sl-change", (l) => s(l.target.value)), a._$owner = J(), E(a, _(sa, {
      each: ao,
      children: (l) => (() => {
        var c = Uf();
        return c._$owner = J(), E(c, () => l.name), be(() => ne(c, "value", l.code)), c;
      })()
    })), be(() => ne(a, "value", i()?.code)), o;
  })();
};
var Ff = /* @__PURE__ */ G("<sl-avatar>", !0, !1), Zf = /* @__PURE__ */ G("<div class=top-bar><menu></menu><h1>");
const Hf = ({
  firstName: t,
  lastName: e
}) => [t, e].reduce((r, s) => (r = r + (s.length ? s[0] : ""), r), ""), Wf = (t) => {
  const {
    t: e
  } = Ye(), {
    profile: r,
    auth: s
  } = or();
  return (() => {
    var n = Zf(), i = n.firstChild, o = i.nextSibling;
    return E(i, _(ut, {
      get when() {
        return s.state().isAuthenticated;
      },
      get children() {
        var a = Ff();
        return a._$owner = J(), be(() => ne(a, "initials", Hf(r.state()))), a;
      }
    }), null), E(i, _(Bf, {}), null), E(i, _(ut, {
      get when() {
        return s.state().isAuthenticated;
      },
      get children() {
        return _(zf, {});
      }
    }), null), E(o, () => e(t.title)), n;
  })();
};
var Gf = /* @__PURE__ */ G("<section><h2></h2><p>!");
const Wo = (t) => {
  const {
    t: e
  } = Ye();
  return (() => {
    var r = Gf(), s = r.firstChild, n = s.nextSibling, i = n.firstChild;
    return E(s, () => t.title), E(n, () => e("Not implemented"), i), r;
  })();
};
var qf = /* @__PURE__ */ G("<section><h2>");
const Kf = () => {
  const {
    t
  } = Ye(), {
    auth: e,
    profile: r
  } = or(), [s, n] = ln(r.state()), [i, o] = Z(), [a, l] = Z({});
  be(() => {
    n(r.state());
  });
  const [c] = Oe(() => e.state().isAuthenticated, () => r.loadData()), [u] = Oe(() => i(), (m) => r.saveData(m));
  Gs(async () => {
    u.loading && l({}), u.error && l({
      formErrors: [t("Error saving")]
    }), u.state === "ready" && console.log("!");
  });
  const d = (m) => (p) => {
    n(m, p.target.value);
  };
  return (() => {
    var m = qf(), p = m.firstChild;
    return E(p, () => t("Profile")), E(m, _(Zr, {
      get fallback() {
        return _(Xr, {});
      },
      get children() {
        return [oe(() => ir(c())), _(Ei, {
          onSubmit: () => o(Bs(Ci, s, l)),
          get children() {
            return [_(lt, {
              get label() {
                return t("First name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return s.firstName;
              },
              get ["on:sl-change"]() {
                return d("firstName");
              },
              get ["data-invalid"]() {
                return !!a().fieldErrors?.firstName;
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                return a().fieldErrors?.firstName;
              }
            }), _(lt, {
              get label() {
                return t("Last name");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return s.lastName;
              },
              get ["on:sl-change"]() {
                return d("lastName");
              },
              get ["data-invalid"]() {
                return !!a().fieldErrors?.lastName;
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                return a().fieldErrors?.lastName;
              }
            }), _(lt, {
              get label() {
                return t("Address");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !1,
              get value() {
                return s.address;
              },
              get ["on:sl-change"]() {
                return d("address");
              },
              get ["data-invalid"]() {
                return !!a().fieldErrors?.address;
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                return a().fieldErrors?.address;
              }
            }), _(lt, {
              get label() {
                return t("Phone");
              },
              inputmode: "numeric",
              spellcheck: !1,
              clearable: !0,
              get value() {
                return s.phone;
              },
              get ["on:sl-change"]() {
                return d("phone");
              },
              get ["data-invalid"]() {
                return !!a().fieldErrors?.phone;
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                return a().fieldErrors?.phone;
              }
            }), _(Ai, {
              get open() {
                return !!a().formErrors?.length;
              },
              get message() {
                return a().formErrors?.join(". ");
              }
            }), _(dl, {
              get open() {
                return u.state === "ready";
              },
              message: `Succesfulluy saved at ${new Date()}`
            }), _(Vr, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return u.loading;
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
var Yf = /* @__PURE__ */ G("<section><h2>");
const Jf = () => {
  const {
    t
  } = Ye(), {
    auth: e,
    account: r
  } = or(), [s, n] = ln(r.state()), [i, o] = Z(), [a, l] = Z({});
  be(() => {
    n(r.state());
  });
  const [c] = Oe(() => e.state().isAuthenticated, () => r.loadData()), [u] = Oe(() => i(), (m) => r.saveData(m));
  Gs(async () => {
    u.error && l({
      formErrors: [t("Error saving")]
    }), u.state === "ready" && n("pass", "");
  });
  const d = (m) => (p) => {
    n(m, p.target.value);
  };
  return (() => {
    var m = Yf(), p = m.firstChild;
    return E(p, () => t("Account")), E(m, _(Zr, {
      get fallback() {
        return _(Xr, {});
      },
      get children() {
        return [oe(() => ir(c())), _(Ei, {
          onSubmit: () => o(Bs($i, s, l)),
          get children() {
            return [_(lt, {
              get label() {
                return t("Email");
              },
              inputmode: "text",
              autocapitalize: "words",
              spellcheck: !1,
              clearable: !0,
              required: !0,
              get value() {
                return s.email;
              },
              get ["on:sl-change"]() {
                return d("email");
              },
              get ["data-invalid"]() {
                return !!a().fieldErrors?.email;
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                return a().fieldErrors?.email;
              }
            }), _(lt, {
              get label() {
                return t("Password");
              },
              inputmode: "text",
              clearable: !0,
              type: "password",
              "password-toggle": !0,
              get value() {
                return s.pass;
              },
              get ["on:sl-change"]() {
                return d("pass");
              },
              get ["data-invalid"]() {
                return !!a().fieldErrors?.pass;
              },
              get isSubmiting() {
                return u.loading;
              },
              get errors() {
                return a().fieldErrors?.pass;
              }
            }), _(Ai, {
              get open() {
                return !!a().formErrors?.length;
              },
              get message() {
                return a().formErrors?.join(". ");
              }
            }), _(dl, {
              get open() {
                return u.state === "ready";
              },
              message: `Succesfulluy saved at ${new Date()}`
            }), _(Vr, {
              type: "submit",
              variant: "primary",
              get isSubmiting() {
                return u.loading;
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
class Xf extends Error {
  name = "AuthenticationError";
}
var Qf = /* @__PURE__ */ G("<h1>Fail <!>!"), Go = /* @__PURE__ */ G("<p>"), ep = /* @__PURE__ */ G("<pre>");
const tp = (t) => (console.error(t.error), [(() => {
  var e = Qf(), r = e.firstChild, s = r.nextSibling;
  return s.nextSibling, E(e, () => t.moduleName, s), e;
})(), _(ut, {
  get when() {
    return t.error.name;
  },
  get children() {
    var e = Go();
    return E(e, () => t.error.name), e;
  }
}), _(ut, {
  get when() {
    return t.error.message;
  },
  get children() {
    var e = Go();
    return E(e, () => t.error.message), e;
  }
}), (() => {
  var e = ep();
  return E(e, () => JSON.stringify(t.error, null, 2)), e;
})()]);
var rp = /* @__PURE__ */ G("<small class=app-version>v");
const sp = (t) => (() => {
  var e = rp();
  return e.firstChild, E(e, "1.0.0", null), e;
})();
var np = /* @__PURE__ */ G("<sl-tab-group><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel><sl-tab-panel>", !0, !1), ip = /* @__PURE__ */ G("<main class=app><style data-name=custom></style><div>");
const op = (t) => {
  const {
    t: e
  } = Ye(), {
    auth: r
  } = or(), [s, n] = Z();
  return Gs(() => {
    const {
      activePanel: i
    } = localStorage, o = s();
    i && o && o.updateComplete.then(() => {
      o.show(i);
    });
  }), Xo(() => {
  }, (i) => {
    if (i instanceof Xf)
      Si(i), r.signout();
    else
      throw i;
  }), (() => {
    var i = ip(), o = i.firstChild, a = o.nextSibling;
    return E(o, id), E(a, _(Wf, {
      get title() {
        return t.title;
      }
    }), null), E(a, _(ut, {
      get when() {
        return !r.state().isAuthenticated;
      },
      get children() {
        return _(Mf, {
          title: "Login"
        });
      }
    }), null), E(a, _(ut, {
      get when() {
        return r.state().isAuthenticated;
      },
      get children() {
        var l = np(), c = l.firstChild, u = c.firstChild, d = c.nextSibling, m = d.firstChild, p = d.nextSibling, b = p.firstChild, v = p.nextSibling, k = v.nextSibling, x = k.nextSibling;
        return na(($) => n($), l), l.addEventListener("sl-tab-show", ({
          detail: $
        }) => {
          localStorage.activePanel = $.name;
        }), l._$owner = J(), ne(c, "panel", "account"), c._$owner = J(), ne(u, "name", "person-lock"), u._$owner = J(), E(c, () => e("Account"), null), ne(d, "panel", "subscription"), d._$owner = J(), ne(m, "name", "journal"), m._$owner = J(), E(d, () => e("Subscription"), null), ne(p, "panel", "contact"), p._$owner = J(), ne(b, "name", "person-hearts"), b._$owner = J(), E(p, () => e("Contact"), null), ne(v, "name", "account"), v._$owner = J(), E(v, _(Jf, {}), null), E(v, _(Kf, {}), null), ne(k, "name", "subscription"), k._$owner = J(), E(k, _(Wo, {
          get title() {
            return e("Subscription");
          }
        })), ne(x, "name", "contact"), x._$owner = J(), E(x, _(Wo, {
          get title() {
            return e("Contact");
          }
        })), l;
      }
    }), null), E(i, _(sp, {}), null), i;
  })();
}, ap = (t) => _(zl, {
  fallback: (e) => _(tp, {
    get moduleName() {
      return t.title;
    },
    error: e
  }),
  get children() {
    return _(vd, {
      get children() {
        return _(Sf, {
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
            return _(op, {
              get title() {
                return t.title;
              }
            });
          }
        });
      }
    });
  }
}), lp = `main.app{background-color:var(--bg-color);border-color:var(--border-color);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.heading{text-align:center}main.app table{max-width:500px;margin:auto}
`, hl = Br(), cp = (t) => {
  const e = new Qa({
    datapoint: t.datapoint,
    namespace: t.namespace,
    database: t.database
  }, Z), r = new sl(e, {
    namespace: t.namespace,
    database: t.database,
    scope: ""
  }, Z), s = {
    db: e,
    auth: r
  };
  return Oe(() => !e.state().isConnected, async () => {
    await e.connect();
  }), _(Zr, {
    get fallback() {
      return _(Xr, {});
    },
    get children() {
      return [oe(() => ir()), _(hl.Provider, {
        value: s,
        get children() {
          return t.children;
        }
      })];
    }
  });
}, up = () => er(hl);
var dp = /* @__PURE__ */ G("<main class=app><style data-name=custom></style><section><div class=heading><h1></h1></div><table><thead><tr><th>Email</th><th>pass</th></tr></thead><tbody>"), hp = /* @__PURE__ */ G(`<tr><td><sl-copy-button copy-label="Click to copy"success-label="Copied to clipboard!"error-label="Whoops, your browser doesn't support this!"></sl-copy-button></td><td>`, !0, !1);
const fp = "demo_accounts", pp = (t) => {
  const {
    db: e
  } = up(), [r, s] = Z(), [n, i] = ln({
    accounts: {}
  }), o = async () => {
    const l = await (await e.getDb()).select(fp);
    i("accounts", l.reduce((c, u) => ({
      ...c,
      [u.id]: u
    }), {}));
  };
  return Oe(async () => !0, async () => {
    await e.getDb();
    const a = o();
    s(a);
  }), (() => {
    var a = dp(), l = a.firstChild, c = l.nextSibling, u = c.firstChild, d = u.firstChild, m = u.nextSibling, p = m.firstChild, b = p.nextSibling;
    return E(a, () => ir(), l), E(l, lp), E(d, () => t.title), E(b, _(sa, {
      get each() {
        return Object.values(n.accounts);
      },
      children: (v) => (() => {
        var k = hp(), x = k.firstChild, $ = x.firstChild, T = x.nextSibling;
        return $._$owner = J(), E(T, () => v.pass), be(() => $.value = v.email), k;
      })()
    })), a;
  })();
}, mp = (t) => _(cp, {
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
    return _(pp, {
      get title() {
        return t.title;
      }
    });
  }
});
ia(
  "membership-portal",
  {
    title: "Membership portal",
    datapoint: "wss://localhost:8055/",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  ap
);
ia(
  "demo-accounts",
  {
    title: "Demo accounts portal",
    datapoint: "wss://localhost:8055/",
    namespace: "test",
    database: "test",
    scope: "test"
  },
  mp
);
