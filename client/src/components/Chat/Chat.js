import Search from "@material-ui/icons/Search";

import React, { useEffect, useState, useRef } from "react";
import ChatBox from "../ChatBox/ChatBox";
import Conversation from "../Conversation/Conversation";
import {io} from 'socket.io-client'
import './Chat.css'


const Chat = () => {
  const socket = useRef()
  const [chats, setChats] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentChat, setCurrentChat] =  useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  //socket IO
  const [onlineUsers, setOnlineUsers] = useState([])
  let userId = user?.result?._id;

  useEffect(() => {
    const getChats = async () => {
     const response = await fetch(`http://localhost:3001/chat/${userId}`)
     const newData = await response.json()
     console.log(newData)
     setChats(newData)
    
    };
    getChats();
  }, [userId]);
       
  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users) => {
     
      setOnlineUsers(users);
      console.log(onlineUsers)
    });
  }, [userId]);

  //receive message from socket server
  useEffect(() => {
socket.current.on("receive-message", (data) => 
{
  setReceiveMessage(data)
})
  }, [])

    //send message to the socket server
    useEffect(() => {
      if(sendMessage !==null){
        socket.current.emit('send-message', sendMessage)
      }
        }, [sendMessage])
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
                <div  onClick={() => setCurrentChat(chat)} className="other-user">
                    <Conversation data={chat} currentUserId={userId} />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="right-side">
        {/* chat  body */}
        <ChatBox chat={currentChat} currentUser={userId} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
      </div>
    </div>
  );
};

export default Chat;
