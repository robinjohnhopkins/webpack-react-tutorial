// src/js/reducers/index.js
import { ADD_ARTICLE, FOUND_BAD_WORD } from "../constants/action-types";
const initialState = {
  articles: [],
  remoteArticles: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === FOUND_BAD_WORD) {
    return Object.assign({}, state, {
      status: "Found bad word"
    });
  }
  if (action.type === "DATA_LOADED") {
    console.log('DATA_LOADED sweet', action.payload);
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  return state;
}
export default rootReducer;