// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      alertId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccessAlert = this.showSuccessAlert.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }
  showSuccessAlert(title) {
    const alertId = StatusAlertService.showSuccess(title + ' submitted');
    this.setState({ alertId });
  }
  
  removeAlert() {
    StatusAlertService.removeAlert(this.state.alertId);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    if (title.length <= 0){
      return;
    }
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.showSuccessAlert(title);
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
        <StatusAlert/>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;