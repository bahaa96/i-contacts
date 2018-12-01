import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [thunk, logger];
  // compose enhancers
  const enhancer = compose(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
