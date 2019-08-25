import React from "react";

import Actions from "./List.Actions";

export default ({ currentUserId, destroyPost, user }) => {
  const posts = user.assignments.map(assignment => (
    <div key={assignment._id} className="card">
      <div className="card-body">
        <h5 className="card-title">
          {assignment.title}{" "}
          <span className="badge">
            {assignment.grades === undefined ? "To Be Done" : <div>g</div>}
          </span>
        </h5>
        <p className="card-text">{assignment.desc}</p>
        <a className="card-link" href={assignment.proLink} target="_blank">
          Project Link
        </a>
      </div>
      <Actions
        currentUserId={currentUserId}
        destroyPost={destroyPost}
        assignment={assignment}
        user={user}
      />
    </div>
  ));

  return <>{posts}</>;
};
