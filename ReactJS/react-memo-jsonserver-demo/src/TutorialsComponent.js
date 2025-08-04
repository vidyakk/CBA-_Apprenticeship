import React, { useReducer, useEffect, useState } from 'react';
import tutorialsService from './services/tutorials.service';

const ACTIONS = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  ADD_TUTORIAL: 'ADD_TUTORIAL',
  UPDATE_TUTORIAL: 'UPDATE_TUTORIAL',
  DELETE_TUTORIAL: 'DELETE_TUTORIAL',
  DELETE_ALL: 'DELETE_ALL',
  SEARCH_BY_TITLE: 'SEARCH_BY_TITLE',
};

const initialState = {
  tutorials: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, tutorials: action.payload, loading: false };
    case ACTIONS.ADD_TUTORIAL:
      return { ...state, tutorials: [...state.tutorials, action.payload] };
    case ACTIONS.UPDATE_TUTORIAL:
      return {
        ...state,
        tutorials: state.tutorials.map((tut) =>
          tut.id === action.payload.id ? action.payload : tut
        ),
      };
    case ACTIONS.DELETE_TUTORIAL:
      return {
        ...state,
        tutorials: state.tutorials.filter((tut) => tut.id !== action.payload),
      };
    case ACTIONS.DELETE_ALL:
      return { ...state, tutorials: [] };
    case ACTIONS.SEARCH_BY_TITLE:
      return { ...state, tutorials: action.payload };
    default:
      return state;
  }
}

const TutorialsComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    tutorialsService.getAll()
      .then((res) => {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: res.data });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => {
    if (!title || !description) return;
    tutorialsService.create({ title, description })
      .then((res) => {
        dispatch({ type: ACTIONS.ADD_TUTORIAL, payload: res.data });
        setTitle('');
        setDescription('');
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = () => {
    if (!updateId || !title || !description) return;
    tutorialsService.update(updateId, { title, description })
      .then((res) => {
        dispatch({ type: ACTIONS.UPDATE_TUTORIAL, payload: res.data });
        setUpdateId(null);
        setTitle('');
        setDescription('');
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    tutorialsService.delete(id)
      .then(() => {
        dispatch({ type: ACTIONS.DELETE_TUTORIAL, payload: id });
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteAll = () => {
    tutorialsService.deleteAll()
      .then(() => {
        dispatch({ type: ACTIONS.DELETE_ALL });
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = () => {
    tutorialsService.findByTitle(searchTitle)
      .then((res) => {
        dispatch({ type: ACTIONS.SEARCH_BY_TITLE, payload: res.data });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tutorials CRUD (useReducer + Bootstrap)</h2>

      <div className="card p-3 mb-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            className="form-control"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            className="form-control"
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary me-2" onClick={updateId ? handleUpdate : handleAdd}>
            {updateId ? 'Update' : 'Add'}
          </button>
          {updateId && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setUpdateId(null);
                setTitle('');
                setDescription('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
        <button className="btn btn-outline-danger" onClick={handleDeleteAll}>Delete All</button>
      </div>

      {state.loading ? (
        <div className="alert alert-info">Loading tutorials...</div>
      ) : (
        <ul className="list-group">
          {state.tutorials.map((tut) => (
            <li key={tut.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{tut.title}</strong><br />
                <small>{tut.description}</small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-warning me-2"
                  onClick={() => {
                    setTitle(tut.title);
                    setDescription(tut.description);
                    setUpdateId(tut.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(tut.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TutorialsComponent;
