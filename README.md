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
