import {
  useParams
} from "/build/_shared/chunk-DXWZ23SO.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-6BO74FWO.js";

// empty-module:~/utils/db.server
var require_db = __commonJS({
  "empty-module:~/utils/db.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:/Users/chris/Projects/bookshelf/app/routes/$userId.tsx?browser
init_react();

// app/routes/$userId.tsx
init_react();
var import_react = __toESM(require_react());

// app/components/books.tsx
init_react();
var import_db = __toESM(require_db());
function Books({ who }) {
  return /* @__PURE__ */ React.createElement("div", null);
}

// app/components/nav.tsx
init_react();
function Nav({ who, setWho }) {
  return /* @__PURE__ */ React.createElement("header", {
    className: "w-full border-b-2 border-b-emerald-600 pb-8 mb-8"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-4xl text-emerald-600 font-mono font-medium pb-4"
  }, "Bookshelf"), /* @__PURE__ */ React.createElement("div", {
    className: "text-xl"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "who"
  }, "Who are you?"), /* @__PURE__ */ React.createElement("select", {
    id: "who",
    value: who,
    onChange: (e) => setWho(e.target.value),
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

// app/routes/$userId.tsx
var localStorageKey = "previous-who";
function Index() {
  const params = useParams();
  const userId = params["*"];
  const [who, setWho] = (0, import_react.useState)("none");
  console.log(userId);
  (0, import_react.useEffect)(() => {
    const previousWho = localStorage.getItem(localStorageKey);
    if (previousWho === "chris" || previousWho === "kate") {
      setWho(previousWho);
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (who === "chris" || who === "kate") {
      localStorage.setItem(localStorageKey, who);
    }
  }, [who]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-8 w-full"
  }, /* @__PURE__ */ React.createElement(Nav, {
    who,
    setWho
  }), who !== "none" && /* @__PURE__ */ React.createElement(Books, {
    who
  }));
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/$userId-QQZ2C64R.js.map
