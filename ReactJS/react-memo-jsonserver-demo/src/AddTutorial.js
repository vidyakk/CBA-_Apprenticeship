import React, { useState } from "react";
import tutorialsService from "./services/tutorials.service";

const AddTutorial = () => {
  const [tutorial, setTutorial] = useState({
    id: null,
    title: "",
    description: "",
    published: false
  });

  const [submitted,setSubmitted]=useState(false);
  
  const onChangeTitle=(e)=>{

      setTutorial({...tutorial,title: e.target.value});

  };

  
  const onChangedescription=(e)=>{

      setTutorial({...tutorial,description: e.target.value});

  };

  const saveTutorial=(e)=>{

        const data={
            title :tutorial.title,
            description : tutorial.description
        };

        tutorialsService.create(data)
        .then((response)=>{
          setSubmitted(true);
          console.log(response);
            setTutorial({
                id:response.data.id,
                title:response.data.title,
                description:response.data.description,
                published:response.data.published

            })
        });

     
  };


     const newTutorial=(e)=>{

              setTutorial({
                id:0,
                title:'',
                description:'',
                published:false
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
              onChange={onChangedescription}
              name="description"
            />
          </div>

          <button  className="btn btn-success" onClick={saveTutorial}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
