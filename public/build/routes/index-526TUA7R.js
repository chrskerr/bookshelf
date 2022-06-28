import {
  useLoaderData
} from "/build/_shared/chunk-KQBDOYUF.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-IYRIQ6PI.js";

// empty-module:~/loaders/books.server
var require_books = __commonJS({
  "empty-module:~/loaders/books.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:/Users/chris/Projects/bookshelf/app/routes/index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();

// app/components/books.tsx
init_react();
function Books({ loaderData }) {
  const { books } = loaderData;
  console.log(loaderData);
  return /* @__PURE__ */ React.createElement("div", null, books.length > 0 && /* @__PURE__ */ React.createElement("div", null, "Books!"));
}

// app/routes/index.tsx
var import_books2 = __toESM(require_books());
function Index() {
  const loaderData = useLoaderData();
  return /* @__PURE__ */ React.createElement(Books, {
    loaderData
  });
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-526TUA7R.js.map
