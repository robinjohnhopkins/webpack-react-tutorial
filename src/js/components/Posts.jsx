import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";
export class Post extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // calling the new action creator
    console.log('Post componentDidMount');
    this.props.getData();
  }
// first stab renders null
//   render() {
//     console.log('Post render null');
//     return null;
//   }
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
    console.log('Post mapStateToProps');
    return {
      articles: state.remoteArticles.slice(0, 10)
    };
}

export default connect(
  mapStateToProps,          // null if mapStateToProps not required
  { getData }
)(Post);