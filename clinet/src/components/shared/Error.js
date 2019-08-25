import React from "react";

const Error = props => {
  return (
    <div className="alert alert-danger ">
      {props.error.map((err, index) => (
        <li key={index}>{err}</li>
      ))}
    </div>
  );
};
export default Error;
