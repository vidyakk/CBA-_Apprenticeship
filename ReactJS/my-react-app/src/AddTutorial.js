import React, { useState } from "react";
import tutorialsService from "./services/tutorials.service";

const AddTutorial = () => {
  const [tutorial, setTutorial] = useState({
    id: null,
    title: "",
    description: "",
    published: false
  });

  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = (e) => {
    setTutorial({ ...tutorial, title: e.target.value });
  };

  const onChangeDescription = (e) => {
    setTutorial({ ...tutorial, description: e.target.value });
  };

  const saveTutorial = () => {
    const data = {
      title: tutorial.title,
      description: tutorial.description
    };

    tutorialsService.create(data)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial({
      id: null,
      title: "",
      description: "",
      published: false
    });
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
