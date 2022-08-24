import React, { useState, useEffect} from 'react'
import AVATAR from "../../assets/images/account-logo.svg";


const Conversation = ({data, currentUserId}) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        //grab the other user that isnt the current user logged in (in the member array in chatModel)
        const userId = data.members.find((id) => id!== currentUserId)
        const getUserData = async() => {
          try {
            const response = await fetch(`http://localhost:3001/user/${userId}`)
            const otherUser = await response.json()
            console.log(otherUser)
            setUserData(otherUser)
          } catch (error) {
            console.log(error)
          }
           
        }
        getUserData()
    }, [])
  return (
    <>
    <div>
      <div>
        <div>
          <img src={userData?.userImage ? userData?.userImage : AVATAR } alt="" />
          <div style={{fontSize: ".8rem"}}>
            <span>{userData?.name}</span>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Conversation