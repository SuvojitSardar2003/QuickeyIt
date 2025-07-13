import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./route/index.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";


// Create the portal root if it doesn't exist
const portalRootId = "portal-root";
let portalRoot = document.getElementById(portalRootId);
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.id = portalRootId;
  document.body.appendChild(portalRoot);
}

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  /*<App />*/
  //</StrictMode>
);
