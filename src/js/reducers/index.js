// src/js/reducers/index.js
import { ADD_ARTICLE, FOUND_BAD_WORD, CLEAR_STATUS } from "../constants/action-types";
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
    console.log('Found bad word');
    return Object.assign({}, state, {
      status: "Found bad word: " + action.payload
    });
  }
  if (action.type === "DATA_LOADED") {
    console.log('DATA_LOADED sweet', action.payload);
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  if (action.type === CLEAR_STATUS) {

    // How to use spread operator to remove item from list OR object
    // var seasons = ['winter', 'spring', 'summer', 'autumn'];  
    // var headx, restArrayx;  
    // [headx, ...restArrayx] = seasons;
    // console.log(headx);      // => 'winter'  
    // console.log(restArrayx); // => ['spring', 'summer', 'autumn']  

    // var months = {j: 'jan',f: 'feb',m: 'mar'};  
    // var {j, ...restArrayy} = months; 
    // console.log(restArrayy); // => ['spring', 'summer', 'autumn']  

    const {status, ...restState} = state;
    //console.log('CLEAR_STATUS restState', restState);
    return Object.assign({}, restState);
  }
  

  return state;
}
export default rootReducer;