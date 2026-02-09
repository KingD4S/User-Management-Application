import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../redux/actions/authAction';

const Login = () => {

  const [loginData, setLoginData] = React.useState({email: "", password: ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    const newLoginData = {...loginData};
    newLoginData[name] = value;
    setLoginData(newLoginData);
  }

  const handleLogin = (e) => {
      e.preventDefault();
      const {email, password} = loginData;
      if(!email || !password) {
        return handleError("All fields are required");
      }
      dispatch(loginRequest(loginData,navigate))
    }
    
  return (
    <div className='auth-wrapper '>
      <div className='container '>
        <h1>Login</h1>
        <form onSubmit={handleLogin} >
           <div>
              <label htmlFor="email">Email:</label>
              <input 
                onChange={handleChange}
                type="email"
                name='email'
                required
                autoFocus
                placeholder='Enter your email'
                value={loginData.email}
                />
           </div>
           <div>
              <label htmlFor="password">Password:</label>
              <input 
                onChange={handleChange}
                type="password"
                name='password'
                required
                autoFocus
                placeholder='Enter your password'
                value={loginData.password}
              />
           </div>
           <button type="submit">Login</button>
           <span>
            Don't have an account? <Link to="/signup" className='login-span'>Signup</Link>
           </span>
        </form>
        <ToastContainer />
    </div>
    </div>
  )
}

export default Login