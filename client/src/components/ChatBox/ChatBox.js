import moment from 'moment';
import React, { useEffect, useState } from 'react'
import  InputEmoji from 'react-input-emoji'
import { addMessages } from '../../api';
import AVATAR from "../../assets/images/account-logo.svg";

const ChatBox = ({chat, currentUser}) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState("")
    //fetching data for header
    useEffect(() => {
        console.log("Chat", chat)
        const userId = chat?.members?.find((id) => id!== currentUser)
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
         if(chat !== null){
            getUserData()
         }

    }, [chat, currentUser])


const handleChange = (newMessages) => {
    setNewMessages(newMessages)
}

const handleSend = async(e) => {
    e.preventDefault()
    const message = {
        senderId: currentUser,
        text: newMessages,
        chatId: chat._id
    }

    //send message to DB
    try {
        const {data} = await addMessages(message);
        setMessages([...messages, data])
        setNewMessages("")
    } catch (error) {
        console.log(error)
    }
}
    // fetch data for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:3001/message/${chat._id}`)
                const data = await response.json()
                console.log(data)
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(chat !== null) fetchMessages()
    }, [chat])
  return (
    <>
    <div className='chatbox-container'>
        {chat? (<>
        <div className='chat-header'>
        <div>
          <img src={userData?.userImage ? userData?.userImage : AVATAR } alt="" />
          <div style={{fontSize: ".8rem"}}>
            <span>{userData?.name}</span>
          </div>
        </div>
        </div>

        {/* CHAT BOX MESSAGES */}
        <div className='chat-body'>
        {messages.map((message) => (
            <>
            <div className={message.senderId === currentUser ? "own-message" : "message-received"}>
                <span>
                    {message.text}

                </span>
                <span>
                    {moment(message.createdAt).fromNow()}
                </span>
            </div>
            </>
        ))}
        </div>

        {/* CHAT SENDER */}
        <div className='chat-sender'>
            <InputEmoji
            value={newMessages}
            onChange={handleChange}/>
        </div>
        <div>
            <button onClick={handleSend}>
Send
            </button>
        </div>
        </>) : (
            <span>
                Tap on a Chat to start Conversation...
            </span>
        )}
        
    </div>
    </>
  )
}

export default ChatBox