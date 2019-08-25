import React from "react";
import { Link } from "react-router-dom";

export default ({ currentUserId, destroyPost, assignment, user }) => (
  <div className="card-footer text-muted d-flex justify-content-around">
    {currentUserId === user._id && (
      <>
        <Link
          className="btn btn-link"
          to={`/users/${user._id}/posts/${assignment._id}/edit`}
        >
          Edit Post
        </Link>
        <button
          className="btn btn-link text-danger"
          onClick={() => destroyPost(assignment)}
        >
          Delete Post
        </button>
      </>
    )}
  </div>
);
