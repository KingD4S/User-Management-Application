import React from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../redux/actions/authAction';

const Signup = () => {

  const [signupData, setSignupData] = React.useState({name: "", email: "", password: ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    const newSignupData = {...signupData};
    newSignupData[name] = value;
    setSignupData(newSignupData);
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();
    const {name, email, password} = signupData;
    if(!name || !email || !password) {
      return handleError("All fields are required");
    }
    dispatch(signupRequest(signupData, navigate));

    // console.log(signupData);
  }
  return (
    <div className='auth-wrapper '>
      <div className='container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup} >
           <div>
              <label htmlFor="name">Name:</label>
              <input 
                onChange={handleChange}
                type="text"
                name='name'
                required
                autoFocus
                placeholder='Enter your name'
                value={signupData.name}
                />
           </div>
           <div>
              <label htmlFor="email">Email:</label>
              <input 
                onChange={handleChange}
                type="email"
                name='email'
                required
                autoFocus
                placeholder='Enter your email'
                value={signupData.email}
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
                value={signupData.password}
              />
           </div>
           <button >Sign Up</button>
           <span> Already have an account?  
              <Link to="/login" className="login-span">Login</Link>
           </span>
        </form>
        <ToastContainer />
    </div>
    </div>
  )
}

export default Signup