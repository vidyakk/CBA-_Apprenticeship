import React, { useReducer, useState } from 'react';

// Initial state
const initialState = [];


// Reducer function
function userReducer(state, action) {
    
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    case 'UPDATE_USER':
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
}

function AppUsingReducer() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const [form, setForm] = useState({ id: '', name: '', email: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch({ type: 'UPDATE_USER', payload: form });
      setIsEditMode(false);
    } else {
      const newUser = {
        ...form,
        id: Date.now(), // generate unique id
      };
      dispatch({ type: 'ADD_USER', payload: newUser });
    }

    setForm({ id: '', name: '', email: '' });
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React useReducer CRUD Example</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">{isEditMode ? 'Update' : 'Add'} User</button>
      </form>

      <hr />

      <h3>User List</h3>
      {state.length === 0 ? (
        <p>No users added.</p>
      ) : (
        <ul>
          {state.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> ({user.email})
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppUsingReducer;
