import React, { useState, useEffect} from 'react'
import './style.css'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode';


const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
 const dispatch = useDispatch();
 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    console.log(user)


    const logout = () => {
      dispatch({type: 'LOGOUT'})
      history.push('/')
      setUser(null)
    }
    
    useEffect(() => {
      const token = user?.token;

      if(token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem("profile")))

      //when location changes...set the user
    }, [location])

   
  //  <img alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</img>
  return (
    <div>
   
    <header className="header" component={Link} to='/'>
    
    <div className="logo-div"></div>
   
    <nav>
    {user ? (
        <div className='login-div'>
         <h4>{user.result.name}</h4>
         <button onClick={logout}>Logout</button>
        </div>

    ) : (
        <button><Link to='/auth' >Sign In</Link></button>
    )}
     
    </nav>
    </header>
    </div>
  )
}

export default Navbar