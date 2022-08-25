import Search from "@material-ui/icons/Search";
import React, { useEffect, useState, useRef } from "react";
import ChatBox from "../ChatBox/ChatBox";
import Conversation from "../Conversation/Conversation";
import {io} from 'socket.io-client'


const Chat = () => {
  const [chats, setChats] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentChat, setCurrentChat] =  useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()
  let userId = user.result._id;

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', userId)
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users)
      console.log(onlineUsers)
    })
  }, [user])
  console.log(user.result._id);




  useEffect(() => {
    const getChats = async () => {
     const response = await fetch(`http://localhost:3001/chat/${userId}`)
     const newData = await response.json()
     console.log(newData)
     setChats(newData)
    
    };
    getChats();
  }, [userId]);

  return (
    <div className="chat">
      {/* LEFT SIDE */}
      <div className="left-side">
          {console.log(chats)}
        <Search />
        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
              {chats.map((chat) => (
                <div  onClick={() => setCurrentChat(chat)}>
                    <Conversation data={chat} currentUserId={userId} />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="right-side">
        {/* chat  body */}
        <ChatBox chat={currentChat} currentUser={userId}/>
      </div>
    </div>
  );
};

export default Chat;
