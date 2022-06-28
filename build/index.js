var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/chris/Projects/bookshelf/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");
var import_react3 = require("react");

// app/components/nav.tsx
function Nav({ userId, updateUserId }) {
  async function handleChange(e) {
    updateUserId(e.target.value);
  }
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
    value: userId ?? "none",
    onChange: handleChange,
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

// app/styles/app.css
var app_default = "/build/_assets/app-2XX2WPSM.css";

// app/utils/cookies.server.ts
var import_node = require("@remix-run/node");
var cookieSigningKey = process.env.COOKIE_SIGNING_KEY;
var cookieSettings = {
  secrets: cookieSigningKey ? [cookieSigningKey] : void 0,
  httpOnly: true,
  maxAge: 10 * 24 * 60 * 60,
  sameSite: "strict"
};
var userIdCookie = (0, import_node.createCookie)("user-id", cookieSettings);
async function getUserIdFromRequest(request) {
  const cookieHeader = request.headers.get("Cookie");
  return cookieHeader ? await userIdCookie.parse(cookieHeader) : null;
}

// route:/Users/chris/Projects/bookshelf/app/root.tsx
var meta = () => ({
  charset: "utf-8",
  title: "Bookshelf",
  viewport: "width=device-width,initial-scale=1"
});
function links() {
  return [{ rel: "stylesheet", href: app_default }];
}
function isWho(input) {
  return input === "chris" || input === "kate";
}
function App() {
  const userId = (0, import_react2.useLoaderData)();
  const [context, setContext] = (0, import_react3.useState)({
    isAuthed: false,
    userId: null
  });
  (0, import_react3.useEffect)(() => {
    setContext((c) => __spreadProps(__spreadValues({}, c), { userId }));
  }, [userId]);
  async function updateUserId(newUserId) {
    if (!isWho(newUserId))
      return;
    setContext((c) => __spreadProps(__spreadValues({}, c), { userId: newUserId }));
    await fetch(`/api/set-user/${newUserId}`);
  }
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("div", {
    className: "p-8 w-full"
  }, /* @__PURE__ */ React.createElement(Nav, {
    userId: context.userId,
    updateUserId
  }), /* @__PURE__ */ React.createElement(import_react2.Outlet, null)), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}
var loader = async ({ request }) => {
  return await getUserIdFromRequest(request);
};

// route:/Users/chris/Projects/bookshelf/app/routes/api/set-user/$userId.ts
var userId_exports = {};
__export(userId_exports, {
  loader: () => loader2
});

// app/utils/helpers.ts
function getUserIdFromParams(params) {
  return params.userId === "chris" || params.userId === "kate" ? params.userId : null;
}

// route:/Users/chris/Projects/bookshelf/app/routes/api/set-user/$userId.ts
var loader2 = async ({ params }) => {
  const userId = getUserIdFromParams(params);
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": await userIdCookie.serialize(userId)
    }
  });
};

// route:/Users/chris/Projects/bookshelf/app/routes/edit/$bookId.tsx
var bookId_exports = {};
__export(bookId_exports, {
  default: () => Update,
  loader: () => loader3
});
var import_node2 = require("@remix-run/node");
var import_react4 = require("@remix-run/react");

// app/utils/db.server.ts
var import_client = require("@prisma/client");
var db;
if (false) {
  db = new import_client.PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new import_client.PrismaClient();
  }
  db = global.__db;
}

// app/components/add-edit.tsx
function AddEditBook({ book }) {
  return /* @__PURE__ */ React.createElement("div", null);
}

// route:/Users/chris/Projects/bookshelf/app/routes/edit/$bookId.tsx
var loader3 = async ({ params, request }) => {
  const bookId = params.bookId;
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return void 0;
  }
  const book = await db.book.findFirst({
    where: { id: bookId },
    select: {
      id: true,
      title: true,
      users: {
        where: { userId },
        select: {
          readAt: true,
          readingOrder: true
        },
        take: 1
      },
      authors: {
        select: {
          author: { select: { id: true, name: true } }
        }
      },
      series: {
        select: {
          name: true
        }
      }
    }
  });
  return (0, import_node2.json)(book);
};
function Update() {
  const book = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ React.createElement(AddEditBook, {
    book
  });
}

// route:/Users/chris/Projects/bookshelf/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader4
});
var import_react5 = require("@remix-run/react");

// app/components/books.tsx
function Books({ loaderData }) {
  const { books } = loaderData;
  console.log(loaderData);
  return /* @__PURE__ */ React.createElement("div", null, books.length > 0 && /* @__PURE__ */ React.createElement("div", null, "Books!"));
}

// route:/Users/chris/Projects/bookshelf/app/routes/index.tsx
var import_node3 = require("@remix-run/node");
var loader4 = async ({ request }) => {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    const emptyData = {
      books: []
    };
    return (0, import_node3.json)(emptyData);
  }
  const data = {
    books: await db.book.findMany({
      select: {
        id: true,
        title: true,
        users: {
          where: { userId },
          select: {
            readAt: true,
            readingOrder: true
          },
          take: 1
        },
        authors: {
          select: {
            author: { select: { id: true, name: true } }
          }
        },
        series: {
          select: {
            name: true
          }
        }
      }
    })
  };
  return (0, import_node3.json)(data);
};
function Index() {
  const loaderData = (0, import_react5.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Books, {
    loaderData
  });
}

// route:/Users/chris/Projects/bookshelf/app/routes/add.tsx
var add_exports = {};
__export(add_exports, {
  default: () => Add
});
function Add() {
  return /* @__PURE__ */ React.createElement(AddEditBook, {
    book: null
  });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "7e211ff4", "entry": { "module": "/build/entry.client-B2PBNT26.js", "imports": ["/build/_shared/chunk-NCXCWTWC.js", "/build/_shared/chunk-6BO74FWO.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-5LJUWFIW.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/add": { "id": "routes/add", "parentId": "root", "path": "add", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/add-NBIX3BD7.js", "imports": ["/build/_shared/chunk-4SPE75VC.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/api/set-user/$userId": { "id": "routes/api/set-user/$userId", "parentId": "root", "path": "api/set-user/:userId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/api/set-user/$userId-CDCDO2K7.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/edit/$bookId": { "id": "routes/edit/$bookId", "parentId": "root", "path": "edit/:bookId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/edit/$bookId-OH6BVM6N.js", "imports": ["/build/_shared/chunk-GHW7X2DV.js", "/build/_shared/chunk-4SPE75VC.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-U4H5QPRA.js", "imports": ["/build/_shared/chunk-GHW7X2DV.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-7E211FF4.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api/set-user/$userId": {
    id: "routes/api/set-user/$userId",
    parentId: "root",
    path: "api/set-user/:userId",
    index: void 0,
    caseSensitive: void 0,
    module: userId_exports
  },
  "routes/edit/$bookId": {
    id: "routes/edit/$bookId",
    parentId: "root",
    path: "edit/:bookId",
    index: void 0,
    caseSensitive: void 0,
    module: bookId_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/add": {
    id: "routes/add",
    parentId: "root",
    path: "add",
    index: void 0,
    caseSensitive: void 0,
    module: add_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
