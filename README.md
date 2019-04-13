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

How to set up React, webpack, and Babel: wrapping up
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

