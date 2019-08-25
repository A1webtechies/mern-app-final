import React from "react";
import Error from "../../shared/Error";
import { withRouter } from "react-router-dom";
class Form extends React.Component {
  constructor(props) {
    super(props);
    const { assignment = {} } = this.props;
    const errors = [];
    const { title = "", desc = "", proLink = "" } = assignment;
    this.state = { title, desc, proLink, errors };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { assignment } = this.props;
    const arr = [];
    if (this.state.title === "") {
      arr.push("Title is required ");
    }
    if (this.state.desc === "") {
      arr.push("Description is required ");
    }
    if (this.state.proLink === "") {
      arr.push("Project Link is required ");
    }
    this.setState({ errors: arr });

    if (assignment && assignment._id && arr.length === 0) {
      const body = Object.assign({}, this.state, { _id: assignment._id });
      this.props.onSubmit(body);
    } else if (arr.length === 0) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <div>
        {this.state.errors.length !== 0 ? (
          <Error error={this.state.errors} />
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              onChange={this.handleChange}
              name="title"
              type="text"
              value={this.state.title}
            />
          </div>
          <div className="form-group  ">
            <label htmlFor="desc">Description</label>
            <textarea
              className="form-control"
              id="desc"
              onChange={this.handleChange}
              name="desc"
              type="text"
              value={this.state.desc}
            />
          </div>

          <div className="form-group">
            <label htmlFor="proLink">Project Link</label>
            <input
              className="form-control"
              id="proLink"
              onChange={this.handleChange}
              name="proLink"
              type="text"
              value={this.state.proLink}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Form);
