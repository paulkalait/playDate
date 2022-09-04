import React, { useEffect } from 'react'
import './SearchResults.css'
const SearchResults = ({results, userId, searchUser, setSearchUser}) => {


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
  console.log(newChat)
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
        <span value={eachUser._id} key={eachUser._id}  onClick={() => createChat(eachUser._id)} className='choose-user'>{eachUser.name}</span>
    ))}
    </>
  )
}

export default SearchResults