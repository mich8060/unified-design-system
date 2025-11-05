import te, { forwardRef as ne, useState as Z } from "react";
var K = { exports: {} }, V = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Q;
function se() {
  if (Q) return V;
  Q = 1;
  var c = Symbol.for("react.transitional.element"), _ = Symbol.for("react.fragment");
  function b(d, a, n) {
    var f = null;
    if (n !== void 0 && (f = "" + n), a.key !== void 0 && (f = "" + a.key), "key" in a) {
      n = {};
      for (var i in a)
        i !== "key" && (n[i] = a[i]);
    } else n = a;
    return a = n.ref, {
      $$typeof: c,
      type: d,
      key: f,
      ref: a !== void 0 ? a : null,
      props: n
    };
  }
  return V.Fragment = _, V.jsx = b, V.jsxs = b, V;
}
var q = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var X;
function ae() {
  return X || (X = 1, process.env.NODE_ENV !== "production" && (function() {
    function c(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === D ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case R:
          return "Fragment";
        case y:
          return "Profiler";
        case P:
          return "StrictMode";
        case B:
          return "Suspense";
        case S:
          return "SuspenseList";
        case M:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case p:
            return "Portal";
          case N:
            return (e.displayName || "Context") + ".Provider";
          case E:
            return (e._context.displayName || "Context") + ".Consumer";
          case Y:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case C:
            return r = e.displayName || null, r !== null ? r : c(e.type) || "Memo";
          case I:
            r = e._payload, e = e._init;
            try {
              return c(e(r));
            } catch {
            }
        }
      return null;
    }
    function _(e) {
      return "" + e;
    }
    function b(e) {
      try {
        _(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var o = r.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          u
        ), _(e);
      }
    }
    function d(e) {
      if (e === R) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === I)
        return "<...>";
      try {
        var r = c(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var e = $.A;
      return e === null ? null : e.getOwner();
    }
    function n() {
      return Error("react-stack-top-frame");
    }
    function f(e) {
      if (k.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function i(e, r) {
      function o() {
        W || (W = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      o.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: o,
        configurable: !0
      });
    }
    function v() {
      var e = c(this.type);
      return U[e] || (U[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function T(e, r, o, u, w, h, m, l) {
      return o = h.ref, e = {
        $$typeof: A,
        type: e,
        key: r,
        props: h,
        _owner: w
      }, (o !== void 0 ? o : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: v
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: m
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: l
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function x(e, r, o, u, w, h, m, l) {
      var s = r.children;
      if (s !== void 0)
        if (u)
          if (G(s)) {
            for (u = 0; u < s.length; u++)
              g(s[u]);
            Object.freeze && Object.freeze(s);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else g(s);
      if (k.call(r, "key")) {
        s = c(e);
        var O = Object.keys(r).filter(function(re) {
          return re !== "key";
        });
        u = 0 < O.length ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}", H[s + u] || (O = 0 < O.length ? "{" + O.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          u,
          s,
          O,
          s
        ), H[s + u] = !0);
      }
      if (s = null, o !== void 0 && (b(o), s = "" + o), f(r) && (b(r.key), s = "" + r.key), "key" in r) {
        o = {};
        for (var F in r)
          F !== "key" && (o[F] = r[F]);
      } else o = r;
      return s && i(
        o,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), T(
        e,
        s,
        h,
        w,
        a(),
        o,
        m,
        l
      );
    }
    function g(e) {
      typeof e == "object" && e !== null && e.$$typeof === A && e._store && (e._store.validated = 1);
    }
    var j = te, A = Symbol.for("react.transitional.element"), p = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), N = Symbol.for("react.context"), Y = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), S = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), D = Symbol.for("react.client.reference"), $ = j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = Object.prototype.hasOwnProperty, G = Array.isArray, L = console.createTask ? console.createTask : function() {
      return null;
    };
    j = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var W, U = {}, J = j.react_stack_bottom_frame.bind(
      j,
      n
    )(), z = L(d(n)), H = {};
    q.Fragment = R, q.jsx = function(e, r, o, u, w) {
      var h = 1e4 > $.recentlyCreatedOwnerStacks++;
      return x(
        e,
        r,
        o,
        !1,
        u,
        w,
        h ? Error("react-stack-top-frame") : J,
        h ? L(d(e)) : z
      );
    }, q.jsxs = function(e, r, o, u, w) {
      var h = 1e4 > $.recentlyCreatedOwnerStacks++;
      return x(
        e,
        r,
        o,
        !0,
        u,
        w,
        h ? Error("react-stack-top-frame") : J,
        h ? L(d(e)) : z
      );
    };
  })()), q;
}
var ee;
function oe() {
  return ee || (ee = 1, process.env.NODE_ENV === "production" ? K.exports = se() : K.exports = ae()), K.exports;
}
var t = oe();
function ue({
  children: c,
  icon: _,
  iconPlacement: b = "leading",
  iconOnly: d = !1,
  size: a,
  // "xs" | "sm" | "lg" | undefined
  variant: n = "default",
  // "default" | "ghost" | "soft" | "outline"
  className: f = "",
  ...i
}) {
  const v = !!_, T = b === "tailing" ? "trailing" : b, x = d && v, {
    onClick: g,
    onKeyDown: j,
    className: A,
    title: p,
    ["aria-label"]: R,
    tabIndex: P,
    type: y,
    ...E
  } = i;
  x && !R && !p && console.warn("Button (iconOnly) requires aria-label or title for accessibility.");
  const N = E["aria-disabled"] === !0 || E["aria-disabled"] === "true", Y = N ? void 0 : g, B = N ? -1 : P, S = ["ghost", "soft", "outline", "default"], C = ["xs", "sm", "lg"], I = n && S.includes(n) && n !== "default" ? `uds-btn--${n}` : null, M = a && C.includes(a) ? `uds-btn-${a}` : null;
  n && !S.includes(n) && console.warn(`Button: invalid variant "${n}". Allowed: ${S.join(", ")}`), a && !C.includes(a) && console.warn(`Button: invalid size "${a}". Allowed: ${C.join(", ")}`);
  const D = [
    "uds-btn",
    M,
    I,
    x ? "uds-btn--icon-only" : v ? T === "trailing" ? "uds-btn--icon-trailing" : "uds-btn--icon-leading" : null,
    f
  ].filter(Boolean).join(" ");
  function $(k) {
    if (N && (k.key === "Enter" || k.key === " ")) {
      k.preventDefault(), k.stopPropagation();
      return;
    }
    j?.(k);
  }
  return /* @__PURE__ */ t.jsx(
    "button",
    {
      ...E,
      type: y || "button",
      className: D,
      disabled: E.disabled,
      "aria-disabled": N || void 0,
      onClick: Y,
      onKeyDown: $,
      tabIndex: B,
      "aria-label": x ? R || p : void 0,
      title: p,
      children: x ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("span", { className: "uds-btn__icon", "aria-hidden": "true", children: _ }),
        /* @__PURE__ */ t.jsx("span", { className: "uds-btn__label", children: c })
      ] }) : v ? T === "trailing" ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("span", { className: "uds-btn__label", children: c }),
        /* @__PURE__ */ t.jsx("span", { className: "uds-btn__icon", "aria-hidden": "true", children: _ })
      ] }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("span", { className: "uds-btn__icon", "aria-hidden": "true", children: _ }),
        /* @__PURE__ */ t.jsx("span", { className: "uds-btn__label", children: c })
      ] }) : /* @__PURE__ */ t.jsx("span", { className: "uds-btn__label", children: c })
    }
  );
}
function ce({
  as: c = "div",
  direction: _ = "row",
  justify: b,
  align: d,
  wrap: a = "nowrap",
  gap: n,
  gapX: f,
  gapY: i,
  inline: v = !1,
  fullWidth: T = !1,
  className: x = "",
  style: g,
  children: j,
  ...A
}) {
  const p = (E) => typeof E == "number" || /^\d+$/.test(String(E)), R = {
    "data-dir": _ === "column" ? "column" : "row",
    "data-inline": v ? "true" : void 0,
    "data-justify": b || void 0,
    "data-align": d || void 0,
    "data-wrap": typeof a == "boolean" ? a ? "wrap" : "nowrap" : a,
    "data-gap": p(n) ? String(n) : void 0,
    "data-gap-x": p(f) ? String(f) : void 0,
    "data-gap-y": p(i) ? String(i) : void 0
  }, P = {
    ...T ? { width: "100%" } : {},
    ...g || {},
    ...n && !p(n) ? { gap: n } : {},
    ...f && !p(f) ? { columnGap: f } : {},
    ...i && !p(i) ? { rowGap: i } : {}
  }, y = ["uds-flex", x].filter(Boolean).join(" ");
  return /* @__PURE__ */ t.jsx(c, { className: y, style: P, ...R, ...A, children: j });
}
const le = ne(({
  label: c,
  placeholder: _ = "Placeholder",
  value: b,
  onChange: d,
  type: a = "text",
  variant: n = "default",
  // default, search, password, date, number, select
  size: f = "default",
  // default, sm, lg
  state: i = "default",
  // default, error, disabled
  theme: v = "light",
  // light, dark
  helperText: T,
  errorMessage: x,
  characterCount: g,
  maxLength: j,
  prefix: A,
  suffix: p,
  leadingIcon: R,
  trailingIcon: P,
  showClearButton: y = !1,
  showPasswordToggle: E = !1,
  className: N = "",
  id: Y,
  name: B,
  required: S = !1,
  autoComplete: C,
  ...I
}, M) => {
  const [D, $] = Z(!1), [k, G] = Z(!1), L = Y || `input-${Math.random().toString(36).substr(2, 9)}`, W = () => {
    $(!D);
  }, U = () => {
    d && d({
      target: { value: "" },
      currentTarget: { value: "" }
    });
  }, J = a === "password" && D ? "text" : a, z = [
    "uds-input",
    f !== "default" && `uds-input--${f}`,
    n !== "default" && `uds-input--${n}`,
    i !== "default" && `uds-input--${i}`,
    v !== "light" && `uds-input--${v}`,
    k && "uds-input--focused",
    N
  ].filter(Boolean).join(" "), H = [
    "uds-input-container",
    v !== "light" && `uds-input-container--${v}`
  ].filter(Boolean).join(" "), e = (m, l, s = !1) => {
    if (!m) return null;
    const O = [
      "uds-input__icon",
      `uds-input__icon--${l}`,
      s && "uds-input__icon--clickable"
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ t.jsx(
      "span",
      {
        className: O,
        onClick: s ? l === "trailing" && y ? U : l === "trailing" && E ? W : null : void 0,
        role: s ? "button" : void 0,
        tabIndex: s ? 0 : void 0,
        onKeyDown: s ? (F) => {
          (F.key === "Enter" || F.key === " ") && (F.preventDefault(), l === "trailing" && y && U(), l === "trailing" && E && W());
        } : void 0,
        children: m
      }
    );
  }, r = (m, l) => m ? /* @__PURE__ */ t.jsx("span", { className: `uds-input__${l}`, children: m }) : null, o = () => {
    if (!g && !j) return null;
    const m = b?.length || 0, l = j || g;
    return /* @__PURE__ */ t.jsxs("span", { className: "uds-input__character-count", children: [
      m,
      "/",
      l
    ] });
  }, u = () => i === "error" && x ? /* @__PURE__ */ t.jsx("div", { className: "uds-input__error-message", children: x }) : T ? /* @__PURE__ */ t.jsx("div", { className: "uds-input__helper-text", children: T }) : null, w = () => n !== "select" ? null : /* @__PURE__ */ t.jsx("span", { className: "uds-input__select-arrow", children: /* @__PURE__ */ t.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ t.jsx("path", { d: "M4 6L8 10L12 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), h = () => n !== "number" ? null : /* @__PURE__ */ t.jsxs("div", { className: "uds-input__number-controls", children: [
    /* @__PURE__ */ t.jsx(
      "button",
      {
        type: "button",
        className: "uds-input__number-btn uds-input__number-btn--up",
        onClick: (m) => {
          if (m.preventDefault(), d) {
            const l = parseFloat(b) || 0, s = {
              target: { value: String(l + 1) },
              currentTarget: { value: String(l + 1) }
            };
            d(s);
          }
        },
        children: /* @__PURE__ */ t.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ t.jsx("path", { d: "M4 10L8 6L12 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
      }
    ),
    /* @__PURE__ */ t.jsx(
      "button",
      {
        type: "button",
        className: "uds-input__number-btn uds-input__number-btn--down",
        onClick: (m) => {
          if (m.preventDefault(), d) {
            const l = parseFloat(b) || 0, s = {
              target: { value: String(l - 1) },
              currentTarget: { value: String(l - 1) }
            };
            d(s);
          }
        },
        children: /* @__PURE__ */ t.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ t.jsx("path", { d: "M4 6L8 10L12 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
      }
    )
  ] });
  return /* @__PURE__ */ t.jsxs("div", { className: H, children: [
    c && /* @__PURE__ */ t.jsxs("label", { htmlFor: L, className: "uds-input__label", children: [
      c,
      S && /* @__PURE__ */ t.jsx("span", { className: "uds-input__required", children: "*" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "uds-input__wrapper", children: [
      r(A, "prefix"),
      e(R, "leading"),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          ref: M,
          id: L,
          name: B,
          type: J,
          value: b,
          onChange: d,
          placeholder: _,
          disabled: i === "disabled",
          required: S,
          autoComplete: C,
          maxLength: j,
          className: z,
          onFocus: () => G(!0),
          onBlur: () => G(!1),
          ...I
        }
      ),
      e(P, "trailing"),
      w(),
      h(),
      r(p, "suffix"),
      o()
    ] }),
    u()
  ] });
});
le.displayName = "Input";
export {
  ue as Button,
  ce as Flex,
  le as Input
};
//# sourceMappingURL=chg-uds.es.js.map
