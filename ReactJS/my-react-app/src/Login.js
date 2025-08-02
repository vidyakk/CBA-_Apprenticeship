import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Login() {

  const [formData ,setFormData]=useState({
    userName:'',
    password:''
  });

  const handleChange=(e)=>{
      console.log(e.target.name);
      console.log(e.target.value);
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      });
  };


  return (
    <div style={{maxWidth:'400px',margin:'auto'}}>
      <h2>Login Page</h2>
        <form>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              name="userName" 
              onChange={handleChange}
              value={formData.userName}
              required
              />

          </div>

          <div>
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange}
              value={formData.password}
              required
              />

          </div>
          <button type="submit">Login</button>
        </form>
    </div>
  );
}

export default Login;
