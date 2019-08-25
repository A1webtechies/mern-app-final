import React from "react";
import Form from "./Form";

export default ({ onSubmit, postError }) => (
  <section className="container">
    <h1>Create a New Assginment</h1>

    <hr />
    <Form onSubmit={onSubmit} />
  </section>
);
