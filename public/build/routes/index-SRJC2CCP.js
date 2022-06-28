import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-IYRIQ6PI.js";

// browser-route-module:/Users/chris/Projects/bookshelf/app/routes/index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();
var import_react = __toESM(require_react());
function Index() {
  const [who, setWho] = (0, import_react.useState)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-8"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "flex justify-between"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl text-emerald-600 font-mono font-medium"
  }, "Bookshelf"), /* @__PURE__ */ React.createElement("label", null, "Who are you?", /* @__PURE__ */ React.createElement("select", {
    value: who,
    onChange: (e) => setWho(e.target.value)
  }, /* @__PURE__ */ React.createElement("option", {
    disabled: true,
    value: void 0
  }), /* @__PURE__ */ React.createElement("option", {
    value: "kate"
  }, "Kate"), /* @__PURE__ */ React.createElement("option", {
    value: "chris"
  }, "Chris")))));
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-SRJC2CCP.js.map
