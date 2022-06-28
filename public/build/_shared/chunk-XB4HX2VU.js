import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react,
  useParams
} from "/build/_shared/chunk-K2KMI5SI.js";

// empty-module:~/utils/db.server
var require_db = __commonJS({
  "empty-module:~/utils/db.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// app/components/index.tsx
init_react();
var import_react = __toESM(require_react());

// app/components/books.tsx
init_react();
var import_db = __toESM(require_db());
function Books({ who: who2 }) {
  return /* @__PURE__ */ React.createElement("div", null);
}

// app/components/nav.tsx
init_react();
function Nav({ who: who2, setWho }) {
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
    value: who2,
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

// app/components/index.tsx
var localStorageKey = "previous-who";
function Index() {
  const { userId } = useParams();
  console.log(params, userId);
  (0, import_react.useEffect)(() => {
    const previousUserId = localStorage.getItem(localStorageKey);
    for (const desiredUserId of ["kate", "chris"]) {
      if (previousUserId === desiredUserId && userId !== desiredUserId) {
      }
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (userId === "chris" || userId === "kate") {
      localStorage.setItem(localStorageKey, userId);
    }
  }, [userId]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-8 w-full"
  }, /* @__PURE__ */ React.createElement(Nav, {
    userId
  }), (userId === "chris" || userId === "kate") && /* @__PURE__ */ React.createElement(Books, {
    who
  }));
}

export {
  Index
};
//# sourceMappingURL=/build/_shared/chunk-XB4HX2VU.js.map
