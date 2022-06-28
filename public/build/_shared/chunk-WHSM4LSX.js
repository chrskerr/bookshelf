import {
  Nav
} from "/build/_shared/chunk-YL4WOXWM.js";
import {
  React,
  __commonJS,
  init_react
} from "/build/_shared/chunk-IYRIQ6PI.js";

// empty-module:~/loaders/books.server
var require_books = __commonJS({
  "empty-module:~/loaders/books.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// app/components/books.tsx
init_react();
function Books({ loaderData }) {
  const { books } = loaderData;
  console.log(loaderData);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-8 w-full"
  }, /* @__PURE__ */ React.createElement(Nav, null), books.length > 0 && /* @__PURE__ */ React.createElement("div", null, "Books!"));
}

export {
  Books,
  require_books
};
//# sourceMappingURL=/build/_shared/chunk-WHSM4LSX.js.map
