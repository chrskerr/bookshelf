import {
  useNavigate,
  useParams
} from "/build/_shared/chunk-SLAPJZIQ.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-IYRIQ6PI.js";

// app/components/nav.tsx
init_react();
var import_react2 = __toESM(require_react());

// app/utils/helpers.ts
init_react();
function getUserIdFromParams(params) {
  return params.userId === "chris" || params.userId === "kate" ? params.userId : null;
}

// app/components/nav.tsx
var localStorageKey = "previous-who";
var desiredUserIds = ["kate", "chris"];
function Nav() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = getUserIdFromParams(params);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    if (userId === "chris" || userId === "kate") {
      localStorage.setItem(localStorageKey, userId);
    }
  }, [userId]);
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

export {
  Nav
};
//# sourceMappingURL=/build/_shared/chunk-3KMM74LJ.js.map
