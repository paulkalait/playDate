import React, { useState, useEffect} from 'react'
import AVATAR from "../../assets/images/account-logo.svg";
import './Conversation.css'


const Conversation = ({data, currentUserId, online}) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        //grab the other user that isnt the current user logged in (in the member array in chatModel)
        const userId = data.members.find((id) => id!== currentUserId)
        const getUserData = async() => {
          try {
            const response = await fetch(`http://localhost:3001/user/${userId}`)
            const otherUser = await response.json()
            console.log("Other users", otherUser)
            setUserData(otherUser)
          } catch (error) {
            console.log(error)
          }
           
        }
        getUserData()
    }, [])
  return (
    <>
    <div className='each-conversation-container'>
      <div>
        <div className='each-conversations'>
          <img src={userData?.userImage ? userData?.userImage : AVATAR } alt="" className='chat-image' />
          <div style={{fontSize: ".8rem"}} className="username-online-div">
            <span>{userData?.name} </span>
           {online ? (<span className='online'>online</span>): (<span className='offline'>offline</span>)}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Conversation