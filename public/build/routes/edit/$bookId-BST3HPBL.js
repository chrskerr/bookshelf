import {
  require_db
} from "/build/_shared/chunk-36JN244Y.js";
import {
  useParams
} from "/build/_shared/chunk-RQYYAQ6G.js";
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
function Update() {
  const { bookId } = useParams();
  return /* @__PURE__ */ React.createElement("div", null, bookId);
}
export {
  Update as default
};
//# sourceMappingURL=/build/routes/edit/$bookId-BST3HPBL.js.map
