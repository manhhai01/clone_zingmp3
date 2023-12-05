import React from "react";
import ReactDOM from "react-dom/client";

// setup redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/configStore";
import App from "./App";

// redux persist
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
