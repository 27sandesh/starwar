import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title"></input>
      </div>
      <div className="form-group">
        <label htmlFor="opening">Opening text</label>
        <input type="text" className="form-control" id="opening"></input>
      </div>
      <div className="form-group">
        <label htmlFor="date">Release Date</label>
        <input type="date" className="form-control" id="date"></input>
      </div>
    </form>
  );
};

export default Form;
