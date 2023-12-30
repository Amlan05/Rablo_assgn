import React from 'react'
import './Components.css'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logOut = () => {
        console.log('amlan')
        if(localStorage.getItem("userId")){
            localStorage.removeItem('userId')
            props.data = false
        }
    }

    const checkLog = () => {
        if(localStorage.getItem("userId")){
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }

  return (
    <div>
      <nav className='container-fluid bg-secondary'>
        <div className='row'>
            <div className='col-10'>
                <Link to='/' className="nav-link active"><h1>Rablo</h1></Link>
            </div>
            <div className='col-2 text-center'>
            <Link to='/auth' className="nav-link active" onClick={() => logOut()}><h2 className='auth'>Auth</h2></Link>
            </div>
        </div>

      </nav>
    </div>
  )
}

export default Header
