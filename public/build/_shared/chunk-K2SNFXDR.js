import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react,
  useLoaderData,
  useNavigate,
  useParams
} from "/build/_shared/chunk-HJ4EK2VK.js";

// empty-module:~/utils/db.server
var require_db = __commonJS({
  "empty-module:~/utils/db.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// app/components/index.tsx
init_react();
var import_react3 = __toESM(require_react());

// app/components/books.tsx
init_react();
var import_db = __toESM(require_db());

// app/utils/helpers.ts
init_react();
function getUserIdFromParams(params) {
  return params.userId === "chris" || params.userId === "kate" ? params.userId : null;
}

// app/components/books.tsx
function Books() {
  const data = useLoaderData();
  console.log(data);
  return /* @__PURE__ */ React.createElement("div", null);
}

// app/components/nav.tsx
init_react();
function Nav({ userId }) {
  const navigate = useNavigate();
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

// app/components/index.tsx
var localStorageKey = "previous-who";
var desiredUserIds = ["kate", "chris"];
function Index() {
  const params = useParams();
  const navigate = useNavigate();
  const userId = getUserIdFromParams(params);
  (0, import_react3.useEffect)(() => {
    if (userId && !desiredUserIds.includes(userId)) {
      navigate("/");
      return;
    }
    const previousUserId = localStorage.getItem(localStorageKey);
    for (const desiredUserId of desiredUserIds) {
      if (previousUserId === desiredUserId && userId !== desiredUserId) {
        navigate(`/${previousUserId}`);
        return;
      }
    }
  }, []);
  (0, import_react3.useEffect)(() => {
    if (userId === "chris" || userId === "kate") {
      localStorage.setItem(localStorageKey, userId);
    }
  }, [userId]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-8 w-full"
  }, /* @__PURE__ */ React.createElement(Nav, {
    userId
  }), userId && /* @__PURE__ */ React.createElement(Books, null));
}

export {
  Index
};
//# sourceMappingURL=/build/_shared/chunk-K2SNFXDR.js.map
