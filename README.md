## React, webpack, and Babel

https://www.valentinog.com/blog/react-webpack-babel/

`mkdir webpack-react-tutorial && cd $_`

`mkdir -p src`

`npm init -y`

`npm i webpack --save-dev`

`npm i webpack-cli --save-dev`

Next up add the webpackcommand inside package.json:

```
"scripts": {
  "build": "webpack --mode production"
}
```

At this point there is no need to define a configuration file for webpack.
Older webpack’s version did automatically look for a configuration file.
Since version 4 that is no longer the case: you can start developing straigh away.
In the next section we’ll install and configure Babel for transpiling our code.

`npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`

Don’t forget to configure Babel! Create a new file named .babelrc inside the project folder:

```
{
   "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Create a file named webpack.config.js and fill it like the following:
```
 module.exports = {
   module: {
     rules: [
       {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: {
          loader: "babel-loader"
         }
       }
     ]
   }
 };
```

`npm i react react-dom --save-dev`

`mkdir -p src/js/components/{container,presentational}`

`touch src/js/components/container/FormContainer.jsx`

```
import React, { Component } from "react";
import ReactDOM from "react-dom";

class FormContainer extends Component {
  constructor() {
    super();

    this.state = {
      title: ""
    };
  }

  render() {
    return (
      <form id="article-form">
      </form>
    );
  }
}

export default FormContainer;
```

`touch src/js/components/presentational/Input.jsx`

`npm i prop-types --save-dev`

```
import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;
```

At this point we’re ready to update our container component to include the text input:

```
 import React, { Component } from "react";
 import ReactDOM from "react-dom";
 import Input from "../presentational/Input.jsx";

class FormContainer extends Component {
  constructor() {
    super();

    this.state = {
      seo_title: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}

export default FormContainer;
```

And now it’s time to wire things up! webpack expects the entry point to be ./src/index.js. Create the file and place an import directive into it for requiring the container component:

`import FormContainer from "./js/components/container/FormContainer.jsx";`

With this in place we’re ready to create our bundle by running:

`npm run build`

Give Webpack a second and see the bundle come to life!
The bundle will be placed into

`./dist/main.js`

Now let’s bring our React experiment to life by including the bundle into an HTML page.

`npm i html-webpack-plugin html-loader --save-dev`

Then update the webpack configuration:

```
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

Next up create an HTML file into ./src/index.html (feel free to use whichever CSS library you prefer):

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>

<body>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-4 offset-md-1">
                <p>Create a new article</p>
                <div id="create-article-form">
                    <!-- form -->
                </div>

            </div>

        </div>
    </div>
</body>

</html>
```

One last thing is missing! We must tell our React component to hook itself into the id create-article-form
Open up `./src/js/components/container/FormContainer.jsx` and add the following at the bottom of the file:

```
 const wrapper = document.getElementById("create-article-form");
 wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
```

Close and save the file.
Now run the build again with:


`npm run build`

`npm i webpack-dev-server --save-dev`

Open up package.json to add the start script:

```
 "scripts": {
   "start": "webpack-dev-server --open --mode development",
   "build": "webpack --mode production"
 }
```

save and close the file.
Now, by running:

`npm start`

##How to set up React, webpack, and Babel: wrapping up
create-react-app is the way to go for starting off a new React project. Almost everything is configured out of the box. But sooner or later you may want to extend or tweak webpack a bit.
And if you learn how to set up React, webpack, and Babel by hand you’ll be able to scratch your own itch, or even configure a frontend project from zero.
This knowledge is also valuable for situations where you don’t need a full blown SPA but you still want to build and distributed your ES6 code. By combining webpack and Babel it is possible to transform a bunch of React components into a bundle suitable for being distributed.
In the above guide we’ve seen:
* how to install and configure webpack
* how to install and configure Babel
* how to install React
* how to create two React components with the Container / Presentational principle
* how to include the resulting bundle into an HTML page
* how to install and configure webpack dev server
By the end you should be able to start from scratch with React, webpack and Babel.
For learning more about webpack check out webpack 4 tutorial, from zero conf to production mode.

##Redux

`npm i redux --save-dev`

`mkdir -p src/js/store`

Create a new file named index.jsin src/js/storeand finally initialize the store:

```
// src/js/store/index.js

import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;
```

`mkdir -p src/js/reducers`

Then create a new file named index.jsin the src/js/reducers:

```
// src/js/reducers/index.js

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  return state;
};

export default rootReducer;
```

`mkdir -p src/js/actions`


Then create a new file named index.jsin src/js/actions:

```
// src/js/actions/index.js

export function addArticle(payload) {
  return { type: "ADD_ARTICLE", payload }
};
```

`mkdir -p src/js/constants`


Then create a new file named action-types.jsinto the src/js/constants:

```
// src/js/constants/action-types.js

export const ADD_ARTICLE = "ADD_ARTICLE";
```

Now open up again src/js/actions/index.jsand update the action to use action types:

```
// src/js/actions/index.js

import { ADD_ARTICLE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
```

We’re one step closer to have a working Redux application. Let’s refactor our reducer!

##React Redux tutorial: refactoring the reducer

Open up src/js/reducers/index.js and update the reducer as follow:

```
// src/js/reducers/index.js

import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    state.articles.push(action.payload);
  }
  return state;
}

export default rootReducer;
```

Although it’s valid code the above reducer breaks the main Redux principle: immutability.
Array.prototype.push is an impure function: it alters the original array. But there’s more! Do you rememeber the third principle of Redux? The state is immutable and cannot change in place. Instead in our reducer we’re mutating the original object!
We need a fix. First we can return a new state, ie a new JavaScript object with Object.assign. This way we keep the original state immutable. Then we can use Array.prototype.concat in place of Array.prototype.push for keeping the initial array immutable:

```
import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
```

In the example above the initial state is left utterly untouched.
The initial articles array doesn’t change in place.
The initial state object doesn’t change as well. The resulting state is a copy of the initial state.
There are two key points for avoiding mutations in Redux:

* Using concat(), slice(), and …spread for arrays
* Using Object.assign() and …spread for objects

Redux protip: the reducer will grow as your app will become bigger. You can split a big reducer into separate functions and combine them with combineReducers

Redux itself is a small library (2KB). The Redux store exposes a simple API for managing the state. The most important methods are:
* getState for accessing the current state of the application
* dispatch for dispatching an action
* subscribe for listening on state changes

##Play
We will play in the brower’s console with the above methods.
To do so we have to export as global variables the store and the action we created earlier.
Create a new file named src/js/index.js and update the file with the following code:

```
import store from "../js/store/index";
import { addArticle } from "../js/actions/index";

window.store = store;
window.addArticle = addArticle;
```

Now open up src/index.js as well, clean up its content and update it as follows:
* import index from "./js/index"
Now run webpack dev server (or Parcel) with:

`npm start`

head over http://localhost:8080/ and open up the console with F12.
Since we’ve exported the store as a global variable we can access its methods. Give it a try!
Start off by accessing the current state:

`store.getState()`

output:
 
`{articles: Array(0)}`

Zero articles. In fact we haven’t update the initial state yet.
To make things interesting we can listen for state updates with subscribe.
The subscribe method accepts a callback that will fire whenever an action is dispatched. Dispatching an action means notifying the store that we want to change the state.
Register the callback with:

`store.subscribe(() => console.log('Look ma, Redux!!'))`

To change the state in Redux we need to dispatch an action. To dispatch an action you have to call the dispatch method.
We have one action at our disposal: addArticle for adding a new item to the state.
Let’s dispatch the action with:

`store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) )`

Right after running the above code you should see:
`Look ma, Redux!!`

To verify that the state changed run again:
`store.getState()`

The output should be:
`{articles: Array(1)}`

And that’s it. This is Redux in its simplest form.
Was that difficult?
Take your time to explore these three Redux methods as an exercise. Play with them from the console:
* getState for accessing the current state of the application
* dispatch for dispatching an action
* subscribe for listening on state changes
That’s everything you need to know for getting started with Redux.
Once you feel confident head over the next section. We’ll go straight to connecting React with Redux!


##React Redux tutorial: connecting React with Redux

Redux on its own is framework agnostic. You can use it with vanilla Javascript. Or with Angular. Or with React. There are bindings for joining together Redux with your favorite framework/library.
For React there is react-redux.
Before moving forward install react-redux by running:

`npm i react-redux --save-dev`

You will use connect with two or three arguments depending on the use case. The fundamental things to know are:
* the mapStateToProps function
* the mapDispatchToProps function

What does mapStateToProps do in react-redux? mapStateToProps does exactly what its name suggests: it connects a part of the Redux state to the props of a React component. By doing so a connected React component will have access to the exact part of the store it needs.
And what about mapDispatchToProps? mapDispatchToProps does something similar, but for actions. mapDispatchToProps connects Redux actions to React props. This way a connected React component will be able to dispatch actions.


##React Redux tutorial: App component and Redux store

We saw that mapStateToProps connects a portion of the Redux state to the props of a React component. You may wonder: is this enough for connecting Redux with React? No, it’s not.
To start off connecting Redux with React we’re going to use Provider.
Provider is an high order component coming from react-redux.
Using layman’s terms, Provider wraps up your React application and makes it aware of the entire Redux’s store.
Why so? We saw that in Redux the store manages everything. React must talk to the store for accessing the state and dispatching actions.
Enough theory.
Open up src/js/index.js, wipe out everything and update the file with the following code (if you’re in create-react-app modify src/index.js instead):

```
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/App.jsx";
// if you're in create-react-app import the files as:
// import store from "./js/store/index";
// import App from "./js/components/App.jsx";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  // The target element might be either root or app,
  // depending on your development environment
  // document.getElementById("app")
  document.getElementById("root")
);
```

You see? Provider wraps up your entire React application. Moreover it gets the store as a prop.
Now let’s create the App component since we’re requiring it. It’s nothing special: App should import a List component and render itself.
Create a directory for holding the components:

`mkdir -p src/js/components`

and a new file named App.jsx inside src/js/components:

```
// src/js/components/App.jsx
import React from "react";
import List from "./List";

const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Articles</h2>
      <List />
    </div>
  </div>
);

export default App;

React Redux tutorial: List component and Redux state
Create a new file named List.jsx inside src/js/components. It should look like the following:
// src/js/components/List.jsx

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { articles: state.articles };
};

const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
```


The List component receives the prop articles which is a copy of the articles array we saw in the Redux state. It comes from the reducer:
```
const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}
```

React protip: take the habit of validating props with PropTypes or even better, use TypeScript


##React Redux tutorial: Form component and Redux actions

Create a new file named Form.jsx inside src/js/components. It should look like the following:

```
// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}

class ConnectedForm extends Component {
  constructor() {
    super();

    this.state = {
      title: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
```

mapDispatchToProps connects Redux actions to React props. This way a connected component is able to dispatch actions.

Finally the component gets exported as Form. Form is the result of connecting ConnectedForm with the Redux store.
Side note: the first argument for connect must be null when mapStateToProps is absent like in the Form example. Otherwise you’ll get TypeError: dispatch is not a function.
Our components are all set!
Update App to include the Form component:

```
import React from "react";
import List from "./List.jsx";
import Form from "./Form.jsx";

const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
      <h2>Articles</h2>
      <List />
    </div>
    <div className="col-md-4 offset-md-1">
      <h2>Add a new article</h2>
      <Form />
    </div>
  </div>
);

export default App;
```


make sure that document.getElementById(“app”) in src/js/index.js matches a real element inside the page:

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>

<body>
    <div class="container">
        <div id="root">
        </div>
    </div>
</body>

</html>
```

Install uuid with:

`npm i uuid --save-dev`

Now run webpack (or Parcel) with:

`npm start`

and head over to http://localhost:8080


##React Redux tutorial: what is a Redux middleware?

`mkdir -p src/js/middleware`

Now create a new file named index.js in src/js/middleware. The structure of our first middleware should match the following:

```
function forbiddenWordsMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      // do your stuff
      return next(action);
    }
  }
}
```

For now we don’t need getState, we just get dispatch as the first parameter. Nice. Let’s implement the logic now. We need to check the action payload, namely the title property. If the title matches one or more bad words we stop the user from adding the article.
Also, the check should fire up only when the action is of type ADD_ARTICLE. It makes sense. How about this one?

```
import { ADD_ARTICLE } from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === ADD_ARTICLE) {
        
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );

        if (foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}
```

Here’s what the middleware does: when action type is ADD_ARTICLE check if action.payload.title contains a bad word. If it does then dispatch an action of type “FOUND_BAD_WORD”, otherwise let the next action pass.
And this last point is really important: you should always return next(action) in your middlewares. If you forget to return next(action) the application will stop, and no other action will reach the reducer.
Now, time to wire up forbiddenWordsMiddleware to the Redux store. For that we need to import our middleware, another utility from Redux (applyMiddleware) and then cook everything together.
Open up  src/js/store/index.js and modify the file like so:

```
// src/js/store/index.js

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";

const store = createStore(
  rootReducer,
  applyMiddleware(forbiddenWordsMiddleware)
);

export default store;
```

Oh, and for using Redux Dev Tools together with other middlewares here’s what you should do (notice the use of compose):

```
// src/js/store/index.js

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
);

export default store;
```

Save and close the file, run npm start and check if the middleware works. Try to add an article with “money” in its title:


##React Redux tutorial: asynchronous actions in Redux with Redux Thunk

`npm i redux-thunk --save-dev`

Now let’s load the middleware in src/js/store/index.js:

```
// src/js/store/index.js

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, thunk))
);

export default store;
```

At this point we need to refactor getData to use redux-thunk. Open up src/js/actions/index.jsand update the action creator like so:

```
// src/js/actions/index.js

// ...

export function getData() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}
```

That’s redux-thunk!

##React Redux tutorial: asynchronous actions in Redux with Redux Thunk

We just learned that calling fetch from an action creator does not work. That’s because Redux is expecting objects as actions but we’re trying to return a Promise. With redux-thunk we can overcome the problem and return functions from action creators. Inside that function we can call APIs, delay the dispatch of an action, and so on.
First we need to install the middleware with:

`npm i redux-thunk --save-dev`

Now let’s load the middleware in src/js/store/index.js:

```
// src/js/store/index.js

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, thunk))
);

export default store;
```

At this point we need to refactor getData to use redux-thunk. Open up src/js/actions/index.jsand update the action creator like so:

```
// src/js/actions/index.js

// ...

export function getData() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });			// notice dispatch!
      });
  };
}
```

That’s redux-thunk!

A few things worth noting in the new version of getData: the fetch call gets returned from an outer function and the outer function has dispatch as a parameter. If you want to access the state inside the action creator you can add getState in the parameter’s list.
Also, notice the use of dispatch inside then. We need to explicitly call dispatch inside the async function for dispatching the action.
With that in place we’re ready to update our reducer with the new action type. Open up src/js/reducers/index.js and add a new if statement. We can also add a new key inside initialState for saving the articles from the API:

```
// src/js/reducers/index.js
import { ADD_ARTICLE } from "../constants/action-types";

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

  if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
```

(I know, I didn’t put DATA_LOADED inside its own named costant. I’d left as an exercise for you. Hope you don’t mind!)
Finally we’re ready to update our Post component for displaying our “remote” posts. We will use mapStateToProps for selecting ten posts:

```
import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";

export class Post extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.articles.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.title}
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.remoteArticles.slice(0, 10)
  };
}

export default connect(
  mapStateToProps,
  { getData }
)(Post);
```

Save and close the files, and everything should work fine:

To recap: Redux does not understand other types of action than a plain object. If you want to move asynchronous logic from React to Redux and being able to return functions instead of plain objects you have to use a custom middleware.
redux-thunk is a middleware for Redux. With redux-thunk you can return functions from action creators, not only objects. You can do asynchronous work inside your actions and dispatch other actions in response to AJAX calls.
When to use redux-thunk? redux-thunk is a nice middleware that works very well for simpler use cases. But if your asynchronous logic involves more complex scenarios then redux saga might be a better fit.
And in the next section we’ll finally take a look at Redux Saga. Hold tight!

##Stop Right There
I have stopped here and not done the next bit which is convert redux-thunk to reac-redux-saga. I have played around a bit to get used to the code.
But in case the original blog is removed the conversion is here.

##React Redux tutorial: introducing Redux Saga
redux thunk makes perfect sense for a lot of project. In fact I encourage starting with redux thunk when you feel the need to manage async flow in Redux. No need to overcomplicate things. You can also entirely skip redux thunk and move your asynchronous logic to a custom middleware. But in reality asynchronous actions can be trickier to test and organize.

For this reason most developers prefer an alternative approach: redux saga.

What is redux saga? redux saga is a Redux middleware for managing side effects. The idea with redux saga is that of having a separate thread in your application for dealing with impure actions: API calls, storage access.

redux saga is different from an async action in terms of both syntax and code organization. With redux thunk you can put an API call directly inside an action creator while in redux saga you can have clear separation between synchronous and asynchronous logic. And that logic will be totally separated from your Redux code.

Moreover redux saga does not use regular JavaScript function. You will see a lot of asterisks and yield in your sagas.

Before moving further let’s look for a moment at what those asterisks mean!

React Redux tutorial: Redux Saga and generator functions
What is a saga? In terms of JavaScript code a redux saga could be a single file containing:

a worker function
a watcher function

We will see what they do in the next section but for now take note: those functions are called sagas and the main difference from regular functions is that sagas are based on generator functions.

Generator functions in JavaScript had been added in ES6 (2015). In brief, a generator function is a JavaScript function which can be paused and resumed during its execution. Regular JavaScript function cannot be paused. Consider this loop:

```
function classicLoop() {
    for (var i = 0; i < 15; i++) {
        console.log(i)
    }
}
```

If you run the function the output of this code will be 1,2,3,4,5 … 15. There is no way to stop the loop from the outside. A generator function on the other hand makes possibile to control the loop “on demand”.

The main difference between regular functions and generator functions in JavaScript is in the syntax too. Generator functions are denoted with an asterisk and make use of the yield keyword. Let’s rewrite our code to use a generator function:

```
function* generatorLoop() {
    for (var i = 0; i < 15; i++) {
        yield console.log(i)
    }
}
```

First thing first I cannot run this function with generatorLoop(). For using the generator I must capture it in a variable and from there I can access the loop step after step with next():

```
var myGenerator = generatorLoop()
myGenerator.next()
myGenerator.next()
myGenerator.next()
myGenerator.next()
```

It’s easy to imagine what the output will be: first call to next 1, second call to next 2 and so on.

So generator functions in JavaScript are function which can be paused and resumed on demand. redux saga relies heavily on generator functions but the good thing is that you won’t need to call next() in your code. redux saga handles that for you under the hood.

And in the next section we’ll finally implement our first redux saga!

For learning more about generator functions take a look at function* on MDN.

React Redux tutorial: writing your first Redux Saga
In the previous sections we built a Post component which calls this.props.getData upon mounting to the DOM. getData is an asynchronous Redux action based on Redux thunk. That action is in charge for getting data from the remote API.

In this section we will refactor our code to use a Redux saga instead of a thunk. I won’t cover the entire Saga API in this post so please bear with me. We’ll just take a look at a bunch of methods.

Before getting started install redux saga with:

`npm i redux-saga --save-dev`

Now we can refactor our async action and remove the fetch call. From now on our action creator will just dispatch a plain action. Open up src/js/actions/index.js and modify getData to return a plain action named DATA_REQUESTED:

```
export function getData() {
  return { type: "DATA_REQUESTED" };
}
```

This very DATA_REQUESTED action will be “intercepted” by Redux saga with the takeEvery method. You can imagine takeEvery “taking” every DATA_REQUESTED action passing inside our app and starting some work in response to that action.

Earlier we saw that a redux saga could be a single file containing:

a watcher function
a worker function

The watcher is basically a generator function “watching” for every action we are interested in. In response to that action, the watcher will call a worker saga, which is another generator function for doing the actual API call.

The worker saga will call the remote API with the call method from redux-saga/effects. When the data is loaded we can dispatch another action from our saga with the put method, again, from redux-saga/effects. Makes sense?

Armed with this knowledge we can lay down our first redux saga! First create a new folder for holding your sagas:

`mkdir -p src/js/sagas`

and then create a new file named api-saga.js in src/js/sagas. And here’s our saga:

```
import { takeEvery, call, put } from "redux-saga/effects";
export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}
function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: "DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
```

Let’s break down the logic flow of our saga. We can read the code like so:

take every action named DATA_REQUESTED and for each action of that type spin a worker saga
inside the worker saga call a function named getData
if the function does not result in any error then dispatch (put) a new action named DATA_LOADED, alongside with a payload
if the function results in an error then dispatch (put) a new action named API_ERRORED, alongside with a payload (the error)
The only thing we’re missing in our code is the getData function. Open up src/js/sagas/api-saga.js again and add the function:

```
import { takeEvery, call, put } from "redux-saga/effects";
export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}
function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: "DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function getData() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
    response.json()
  );
}
```

And finally we can wire up redux saga to our redux store. Open up src/js/store/index.js and update the store as follows:

```
// src/js/store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";
const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware)
  )
);
initialiseSagaMiddleware.run(apiSaga);
export default store;
```

Worth noting in this file the createSagaMiddleware method and initialiseSagaMiddleware.run for running our saga.

Now close and save the file. Run npm start and ta-da! You should see the exact same output again with the remote posts correctly displaying in the browser.

Congratulations! You created your first redux saga!

An exercise for you: our reducer was ready for handling DATA_LOADED alonside with its payload. Complete the reducer for dealing with API_ERRORED.

An exercise for you: move DATA_LOADED, API_ERRORED, and DATA_REQUESTED inside named constants.

An exercise for you: do we need to better account for fetch errors inside getData?

CODE: you can access the complete example at react-redux-tutorial on Github. Clone the repo and checkout the most recent branch:

```
git clone https://github.com/valentinogagliardi/react-redux-tutorial
cd react-redux-tutorial
git checkout your-first-redux-saga
```
