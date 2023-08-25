import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import projectReducer from './projects';
import memberReducer from './members'
import sectionReducer from "./sections";
import cardReducer from './cards'

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectReducer,
  members: memberReducer,
  sections: sectionReducer,
  cards: cardReducer

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
