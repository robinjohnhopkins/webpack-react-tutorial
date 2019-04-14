// src/js/store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";

// first middleware e.g.
// const store = createStore(
//   rootReducer,
//   applyMiddleware(forbiddenWordsMiddleware)
// );

// Redux Dev Tools together with other middlewares 
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
);

export default store;