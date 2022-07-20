import React from 'react'
import './style.css'

import { Link} from 'react-router-dom'


const Navbar = () => {
    const user = null

  return (
    <div>
    <header className="header" component={Link} to='/'>
    <div className="logo-div"></div>
   
    <nav>
    {user ? (
        <div>
         <img alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</img>
         <h4>{user.result.name}</h4>
         <button>logout</button>
        </div>

    ) : (
        <button component={Link} to="/auth">Sign In</button>
    )}
     
    </nav>
    </header>
    </div>
  )
}

export default Navbar