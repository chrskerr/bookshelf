import {
  useLoaderData
} from "/build/_shared/chunk-RQYYAQ6G.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-6BO74FWO.js";

// empty-module:~/utils/cookies.server
var require_cookies = __commonJS({
  "empty-module:~/utils/cookies.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// empty-module:~/utils/db.server
var require_db = __commonJS({
  "empty-module:~/utils/db.server"(exports, module) {
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
var import_cookies = __toESM(require_cookies());
var import_db = __toESM(require_db());
function Index() {
  const loaderData = useLoaderData();
  return /* @__PURE__ */ React.createElement(Books, {
    loaderData
  });
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-ZGVMLENO.js.map
