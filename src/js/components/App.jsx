// src/js/components/App.jsx
import React from "react";
import List from "./List.jsx";
import Form from "./Form.jsx";
import Post from './Posts.jsx';

const App = () => (
    <div>
        <div className="header">My App</div>
        <div className="row mt-5">
            <div className="col-md-4 offset-md-1">
            <h2>Articles</h2>
            <List />
            </div>
            <div className="col-md-4 offset-md-1">
            <h2>Add a new article</h2>
            <Form />
            </div>
            <div className="col-md-4 offset-md-1">
            <h2>API Posts</h2>
            <Post />
            </div>
        </div>
    </div>
);
export default App;