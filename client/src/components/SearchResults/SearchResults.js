import React, { useEffect} from 'react'
import './SearchResults.css'
import AVATAR from "../../assets/images/account-logo.svg";
const SearchResults = ({results, userId, searchUser,getChats, setSearchUser}) => {

const createChat = async (param) => {
  // POST request using fetch inside useEffect React hook

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ senderId: userId, receiverId: param})
}
//then fetch the chats for the current user logged in again
const response = await fetch(`http://localhost:3001/chat/`, requestOptions)
 const newChat = await response.json()
  console.log("new chat sequence", newChat)
  //create a chat then call chats again to update chat list
  getChats()
  setSearchUser("")
}

useEffect(() => {
  if(searchUser?.length > 0 ){
    createChat()

  }
}, []
)

// onClick={() => createChat(eachUser._id)}
  return (
    <>
    {results?.map((eachUser) => (
      //the list of other users that the current user can click on
      <div className='each-conversations'>
      <img src={eachUser?.userImage ? eachUser?.userImage : AVATAR } alt="" className='chat-image' />
        <span value={eachUser._id} key={eachUser._id}  onClick={() => createChat(eachUser._id)} className='choose-user'>{eachUser.name}</span>
      </div>
    
    ))}
    </>
  )
}

export default SearchResults