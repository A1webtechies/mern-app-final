import React from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";

// Helpers
import * as posts from "../../api/posts";

// Components
import List from "./List/List";
import EditForm from "./Form/Edit.Form";
import NewForm from "./Form/New.Form";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postError: false
    };
    this.createPost = this.createPost.bind(this);
    this.destroyPost = this.destroyPost.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  async createPost(post) {
    const { currentUserId, history, refreshUsers } = this.props;

    await posts.createPost({ user: { _id: currentUserId }, post });
    await refreshUsers();

    history.push(`/users/${currentUserId}/posts`);
  }

  async destroyPost(post) {
    const { currentUserId, history, refreshUsers } = this.props;

    const response = await posts.destroyPost({
      user: { _id: currentUserId },
      post
    });
    if (response.status === 401) {
      this.setState({ postError: true });
      return;
    } else {
      this.setState({ postError: false });
      await refreshUsers();

      history.push(`/users/${currentUserId}/posts`);
    }
  }

  async editPost(post) {
    const { currentUserId, history, refreshUsers } = this.props;

    const response = await posts.updatePost({
      user: { _id: currentUserId },
      post
    });
    if (response.status === 401) {
      this.setState({ postError: true });
      return;
    } else {
      this.setState({ postError: false });
      await refreshUsers();

      history.push(`/users/${currentUserId}/posts/`);
    }
  }

  render() {
    const { currentUserId, users, postError } = this.props;
    return (
      <>
        <Route
          path="/users/:userId/posts"
          exact
          component={({ match }) => {
            const user = users.find(user => user._id === match.params.userId);
            if (user.assignments < 1)
              return <h3>You have no assignment yet</h3>;
            return (
              <List
                currentUserId={currentUserId}
                destroyPost={this.destroyPost}
                user={user}
              />
            );
          }}
        />
        <Route
          path="/users/:userId/posts/new"
          exact
          component={() => {
            return <NewForm onSubmit={this.createPost} postError={postError} />;
          }}
        />
        <Route
          path="/users/:userId/posts/:postId/edit"
          exact
          component={({ match }) => {
            const user = users.find(user => user._id === match.params.userId);
            const assignment = user.assignments.find(
              user => user._id === match.params.postId
            );
            return (
              <EditForm
                onSubmit={this.editPost}
                assignment={assignment}
                postError={postError}
              />
            );
          }}
        />
      </>
    );
  }
}

export default withRouter(Container);
