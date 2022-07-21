import React, { useState, useEffect} from 'react'
import './style.css'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'


const Navbar = () => {
  const history = useHistory();
  const location = useLocation()
 const dispatch = useDispatch()
 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    console.log(user)

    useEffect(() => {
      const token = user?.token;

      setUser(JSON.parse(localStorage.getItem('profile')))

      //when location changes...set the user
    }, [location])

    const logout = () => {
      dispatch({type: 'LOGOUT'})
      history.push('/')
      setUser(null)
    }

  return (
    <div>
    <header className="header" component={Link} to='/'>
    <div className="logo-div"></div>
   
    <nav>
    {user ? (
        <div>
         <img alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</img>
         <h4>{user.result.name}</h4>
         <button onClick={logout}>Logout</button>
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