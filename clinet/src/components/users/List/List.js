import React from "react";

export default ({ users }) => {
  const lis = users.map(user => (
    <li key={user._id}>
      {user.fname} {user.lname} {}
      <a href="#">{user.username}</a>
    </li>
  ));

  return (
    <>
      <h1>All Students</h1>
      <ul>{lis}</ul>
    </>
  );
};
