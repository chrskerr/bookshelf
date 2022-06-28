import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "/build/_shared/chunk-SLAPJZIQ.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-IYRIQ6PI.js";

// empty-module:./utils/cookies.server
var require_cookies = __commonJS({
  "empty-module:./utils/cookies.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:/Users/chris/Projects/bookshelf/app/root.tsx?browser
init_react();

// app/root.tsx
init_react();

// app/styles/app.css
var app_default = "/build/_assets/app-2XX2WPSM.css";

// app/root.tsx
var import_cookies = __toESM(require_cookies());
var meta = () => ({
  charset: "utf-8",
  title: "Bookshelf",
  viewport: "width=device-width,initial-scale=1"
});
function links() {
  return [{ rel: "stylesheet", href: app_default }];
}
function App() {
  const userId = useLoaderData();
  console.log(userId);
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(Outlet, null), /* @__PURE__ */ React.createElement(ScrollRestoration, null), /* @__PURE__ */ React.createElement(Scripts, null), /* @__PURE__ */ React.createElement(LiveReload, null)));
}
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-726HPK3U.js.map
