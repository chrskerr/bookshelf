import {
  require_cookies,
  require_db
} from "/build/_shared/chunk-GHW7X2DV.js";
import {
  useLoaderData
} from "/build/_shared/chunk-NCXCWTWC.js";
import {
  AddEditBook
} from "/build/_shared/chunk-4SPE75VC.js";
import {
  React,
  __toESM,
  init_react
} from "/build/_shared/chunk-6BO74FWO.js";

// browser-route-module:/Users/chris/Projects/bookshelf/app/routes/edit/$bookId.tsx?browser
init_react();

// app/routes/edit/$bookId.tsx
init_react();
var import_db = __toESM(require_db());
var import_cookies = __toESM(require_cookies());
function Update() {
  const book = useLoaderData();
  return /* @__PURE__ */ React.createElement(AddEditBook, {
    book
  });
}
export {
  Update as default
};
//# sourceMappingURL=/build/routes/edit/$bookId-YZCR3LAR.js.map
