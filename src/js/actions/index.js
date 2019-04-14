// src/js/actions/index.js
import { ADD_ARTICLE } from "../constants/action-types";
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
// our new action creator. Will it work?
export function getData() {
  return function(dispatch){
    console.log('fetching posts');
    return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
      console.log('fetched posts', json);
      dispatch({ type: "DATA_LOADED", payload: json });
    });
  }
}