import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import projectReducer from './projects';
import memberReducer from './members'
import sectionReducer from "./sections";
import cardReducer from './cards'
import commentReducer from "./comments";
import memberProjectReducer from './memberProjects'
import userCardsReducer from "./userCards";

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectReducer,
  members: memberReducer,
  sections: sectionReducer,
  cards: cardReducer,
  comments: commentReducer,
  memberProjects: memberProjectReducer,
  userCards: userCardsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
