import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import "./index.css";
import App from "./App";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as projectActions from "./store/projects";
import * as memberActions from "./store/members";
import * as sectionActions from "./store/sections";
import * as commentActions from "./store/comments";
import * as memberProjectActions from "./store/memberProjects";
import * as userCardActions from "./store/userCards";

import { ModalProvider } from "./context/Modal";
import { InfoProvider } from "./context/InfoContext";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.projectActions = projectActions;
  window.memberActions = memberActions;
  window.sectionActions = sectionActions;
  window.commentActions = commentActions;
  window.memberProjectActions = memberProjectActions;
  window.userCardActions = userCardActions;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <DragDropContext>
        <InfoProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </InfoProvider>
      </DragDropContext>
    </ReduxProvider>
  );
}

ReactDOM.render(
    <Root />,
  document.getElementById("root")
);
