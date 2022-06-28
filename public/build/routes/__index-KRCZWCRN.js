import {
  useLoaderData
} from "/build/_shared/chunk-SLAPJZIQ.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-IYRIQ6PI.js";

// empty-module:~/utils/cookies.server
var require_cookies = __commonJS({
  "empty-module:~/utils/cookies.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:/Users/chris/Projects/bookshelf/app/routes/__index.tsx?browser
init_react();

// app/routes/__index.tsx
init_react();
var import_react2 = __toESM(require_react());
var import_cookies = __toESM(require_cookies());
var Context = (0, import_react2.createContext)({
  isAuthed: false,
  userId: null,
  updateContext: () => {
  }
});
function Layout({ children }) {
  const userId = useLoaderData();
  const [context, setContext] = (0, import_react2.useState)({
    isAuthed: false,
    userId: null,
    updateContext: (data) => setContext((c) => ({ ...c, ...data }))
  });
  (0, import_react2.useEffect)(() => {
    context.updateContext({ userId });
    console.log("sdf");
  }, [userId]);
  return /* @__PURE__ */ React.createElement(Context.Provider, {
    value: context
  }, children);
}
export {
  Layout as default
};
//# sourceMappingURL=/build/routes/__index-KRCZWCRN.js.map
