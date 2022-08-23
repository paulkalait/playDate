import React, { useState, useEffect} from 'react'
import { getUsers } from '../../api'


const Conversation = ({data, currentUserId}) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        //grab the other user that isnt the current user logged in (in the member array in chatModel)
        const userId = data.members.find((id) => id!== currentUserId)
        const getUserData = async() => {
            const response = await fetch(`http://localhost:3001/user/${userId}`)
            const otherUser = await response.json()
            console.log(otherUser)
            setUserData(otherUser)
        }
        getUserData()
    }, [])
  return (
    <div>Conversation</div>
  )
}

export default Conversation