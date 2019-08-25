import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Error from "../shared/Error";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fname: "",
      lname: "",
      errors: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  handleErrors = () => {
    const arr = [];

    if (this.state.fname === "") {
      arr.push("First Name is required");
    }
    if (this.state.lname === "") {
      arr.push("Last Name is required");
    }

    if (this.state.password === "") {
      arr.push("Password is required");
    } else if (this.state.password.length < 8) {
      arr.push("Password must contain atleast 8 characters");
    }
    if (this.state.username === "") {
      arr.push("Email is required");
    } else if (this.state.username) {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.username)) {
        arr.push("Email is not valid");
      }
    }
    this.setState({ errors: arr });
  };
  handleSubmit(e) {
    e.preventDefault();
    this.handleErrors();
    if (this.state.errors.length === 0) {
      this.props
        .onSubmit(this.state)
        .then(() => this.props.history.push("/assignments"));
    }
  }

  render() {
    return (
      <div>
        <main className="container">
          <section className="row justify-content-md-center">
            <div className="col col-lg-5">
              <h1>Signup</h1>
            </div>
          </section>
          {this.state.errors.length === 0 ? (
            ""
          ) : (
            <Error error={this.state.errors} />
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                className="form-control"
                id="username"
                onChange={this.handleChange}
                name="username"
                type="text"
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                onChange={this.handleChange}
                name="password"
                type="password"
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                className="form-control"
                id="fname"
                onChange={this.handleChange}
                name="fname"
                type="text"
                value={this.state.fname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input
                className="form-control"
                id="lname"
                onChange={this.handleChange}
                name="lname"
                type="text"
                value={this.state.lname}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </main>
      </div>
    );
  }
}
export default withRouter(Signup);
