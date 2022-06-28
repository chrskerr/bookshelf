import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "/build/_shared/chunk-KQBDOYUF.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react
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
var import_react2 = __toESM(require_react());

// app/components/nav.tsx
init_react();
function Nav({ userId, updateUserId }) {
  async function handleChange(e) {
    updateUserId(e.target.value);
  }
  return /* @__PURE__ */ React.createElement("header", {
    className: "w-full border-b-2 border-b-emerald-600 pb-8 mb-8"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-4xl text-emerald-600 font-mono font-medium pb-4"
  }, "Bookshelf"), /* @__PURE__ */ React.createElement("div", {
    className: "text-xl"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "userId"
  }, "Who are you?"), /* @__PURE__ */ React.createElement("select", {
    id: "userId",
    value: userId != null ? userId : "none",
    onChange: (e) => navigate(`/${e.target.value}`),
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement("option", {
    disabled: true,
    value: "none"
  }, "Please choose"), /* @__PURE__ */ React.createElement("option", {
    value: "kate"
  }, "Kate"), /* @__PURE__ */ React.createElement("option", {
    value: "chris"
  }, "Chris"))));
}

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
function isWho(input) {
  return input === "chris" || input === "kate";
}
function App() {
  const userId = useLoaderData();
  const [context, setContext] = (0, import_react2.useState)({
    isAuthed: false,
    userId: null
  });
  (0, import_react2.useEffect)(() => {
    setContext((c) => ({ ...c, userId }));
  }, [userId]);
  async function updateUserId(newUserId) {
    if (!isWho(newUserId))
      return;
    setContext((c) => ({ ...c, userId: newUserId }));
    await fetch(`/api/set-user/${newUserId}`);
  }
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("div", {
    className: "p-8 w-full"
  }, /* @__PURE__ */ React.createElement(Nav, {
    userId: context.userId,
    updateUserId
  }), /* @__PURE__ */ React.createElement(Outlet, null)), /* @__PURE__ */ React.createElement(ScrollRestoration, null), /* @__PURE__ */ React.createElement(Scripts, null), /* @__PURE__ */ React.createElement(LiveReload, null)));
}
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-G75GMZVB.js.map
