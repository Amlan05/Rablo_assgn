import React from "react";
import { useState, useEffect } from "react";
import "../Components.css"
import axios from 'axios'
import { useNavigate } from 'react-router'

const Auth = () => {
  const navigate = useNavigate()

    const [isLogIn, setIsLogIn] = useState(false)
    const [error, setError] =useState()
    const [userData, setUserData] = useState({})
    const [status, setStatus] = useState()

    const registration = async(data) => {
    try{
      let regData = await axios.post('http://localhost:5000/user/signup', data)
      const setId = regData.data.newUser
      localStorage.setItem('userId', setId._id)
      setStatus(regData.data.message)
      setTimeout( () => {
      navigate('/')
      },1000)
    }
    catch(err){
      console.log(err)
      setError(err.response.data.message)
    }
  }
     
    
    const loggingIn = async(data) => {
      try{
        let logData = await axios.post('http://localhost:5000/user/login', data)
        const setId = logData.data.existingUser
        localStorage.setItem('userId', setId._id)
        setStatus(logData.data.message)
        setTimeout( () => {
        navigate('/')
        },1000)
      }
      catch(err){
        console.log(err)
        setError(err.response.data.message)
      }
      
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const gettingData = (e) => {
        e.preventDefault()
        if(isLogIn){
          loggingIn(userData)
        }
        else{
          registration(userData)
        }
        
    }

  return (
    <div className="container fliud">
      <div className="row justify-content-center">
        <div className="col-4 mt-5">
          <form onSubmit={gettingData}>
            <h1 className="h3 mb-3 fw-normal">{isLogIn ? "Login": "Signup"}</h1>
            {!isLogIn ? <div className="form-floating mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                id="floatingInput"
                required
                 pattern="^[a-zA-Z\s]+$"
                minLength="3"
                onChange={handleChange}
              />
              <label for="floatingInput">Name</label>
            </div> : ''}
            

            <div className="form-floating mb-2">
              <input
              name="email"
                type="email"
                className="form-control"
                id="floatingInput"
                required
                onChange={handleChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-2">
              <input
              name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                required
                minLength="5"
                onChange={handleChange}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              {isLogIn ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="choose" onClick={()=> setIsLogIn(!isLogIn)}>{isLogIn ? "New user, Signup" : "Already a user? Login Instead"}</p>
        </div>
       
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <h3 className="text-danger">{error}</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <h3 className="text-success">{status}</h3>
        </div>
      </div>
    </div>
  );
};

export default Auth;
