import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const AdminAuthenticatedLinks = ({ currentUserId, history, logoutUser }) => {
  const logout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link" to="admin/users">
          All Students
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/ungraded">
          Ungraded Assignment
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/graded">
          Graded Assignment
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn btn-link" onClick={logout}>
          Logout
        </button>
      </li>
      <li className="nav-item ">Welcome Admin</li>
    </ul>
  );
};

export default withRouter(AdminAuthenticatedLinks);
