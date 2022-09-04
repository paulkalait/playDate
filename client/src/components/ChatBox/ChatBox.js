import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { addMessages } from "../../api";
import { useHistory } from "react-router-dom";
import AVATAR from "../../assets/images/account-logo.svg";
import "./ChatBox.css";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const history = useHistory()
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const scroll = useRef()
  const userId = chat?.members?.find((id) => id !== currentUser);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  //fetching data for header
  useEffect(() => {
    console.log("Chat", chat);
    const getUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        const otherUser = await response.json();
        console.log(otherUser);
        setUserData(otherUser);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUser]);

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessages,
      chatId: chat._id,
    };
    //send message to DB
    try {
      const { data } = await addMessages(message);
      setMessages([...messages, data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }

    //send message to socket server
    const receiverId = chat?.members?.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // fetch data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/message/${chat._id}`
        );
        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);


  //scroll to last message 
  useEffect(() => {
    return scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const getProfile = () => {
    history.push(`/user/${userId}`)
  }

  return (
    <>
      <div className="chatbox-container">
        {chat ? (
          <>
            <div>
              <div className="chat-header-container">
                <img
                className='chat-image'
                  src={userData?.userImage ? userData?.userImage : AVATAR}
                  alt=""
                />
                <div style={{ fontSize: "1.2rem" }} className="chat-header-username">
                  <span onClick={getProfile}>{userData?.name}</span>
                </div>
              </div>
            </div>

            {/* CHAT BOX MESSAGES */}
            <div className="chat-body">
              {messages.map((message) => (
                <div
                  className={
                    message.senderId === currentUser && "own-message-container"
                  }
                >
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "own-message"
                        : "message-received"
                    }
                  >
                    <span>{message.text}</span>
                    <span className="text-date">{moment(message.createdAt).fromNow()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CHAT SENDER */}
            <div className="chat-sender">
              <InputEmoji value={newMessages} onChange={handleChange} />
              <button onClick={handleSend}>Send</button>
            </div>
     
            
          
          </>
        ) : (
          <div className="chat-not-selected">
               <span>Tap on a chat to start a conversation...</span>
         </div>
       
        )}
      </div>
    </>
  );
};

export default ChatBox;
