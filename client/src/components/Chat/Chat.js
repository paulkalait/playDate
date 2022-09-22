import React, { useEffect, useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ChatBox from "../ChatBox/ChatBox";
import Conversation from "../Conversation/Conversation";
import { io } from "socket.io-client";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import NOCHATS from "../../assets/images/create-chat.svg";
import { getUserBySearch } from "../../actions/user";
import SearchResults from "../SearchResults/SearchResults";

const Chat = () => {
  const dispatch = useDispatch();
  //search user state
  const [searchUser, setSearchUser] = useState("");
  const { user } = useSelector((state) => state.user);
  console.log(user);
  //chat logic
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const userFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  //socket IO
  const [onlineUsers, setOnlineUsers] = useState([]);
  let userId = userFromLocalStorage?.result?._id;

  const getChats = async () => {
    const response = await fetch(`http://localhost:3001/chat/${userId}`);
    const newData = await response.json();
    console.log(newData);
    setChats(newData);
  };
  useEffect(() => {
    getChats();
  }, [userId]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [userId]);

  //receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  //send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchUserFunction();
    }
  };

  const searchUserFunction = (e) => {
    setSearchUser(e.target.value)
    //if there is a value in the search user state then proceed to call the dispatch
    if (searchUser.trim()) {
      dispatch(getUserBySearch({ searchUser }));
    }
  };

  const checkOnlineStatus = (chat) => {
    //extract out the other member
    const chatMembers = chat.members.find((member) => member !== userId);
    //is this other member in the online users array?
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="chat">
      {/* LEFT SIDE */}
      <div className="left-side">
        {/* {console.log(chats)} */}
        <div className="search-user">
          {/* input for search */}
          <input
            value={searchUser}
            onChange={searchUserFunction}
            onKeyDown={handleKeyPress}
            className="search-userInput"
          />
          <button onClick={searchUserFunction}>
            {" "}
            <SearchIcon />
          </button>
          {searchUser?.length > 0 && (
            <div className="search-results-container">
              <SearchResults
                inputValue={searchUser}
                //  results={bestMatch}
                results={user}
                setChats={setChats}
                userId={userId}
                setSearchUser={setSearchUser}
                getChats={getChats}
              />
            </div>
          )}
        </div>

        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats?.length > 0 ? (
              <>
                {chats?.map((chat) => (
                  <div
                    onClick={() => setCurrentChat(chat)}
                    className="other-user"
                  >
                    <Conversation
                      data={chat}
                      currentUserId={userId}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="no-chats-yet-div">
                <img src={NOCHATS} />
                <span>No chats yet. Search a user to start a chat.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="right-side">
        {/* chat  body */}
        <ChatBox
          chat={currentChat}
          currentUser={userId}
          setSearchUser={setSearchUser}
          getChats={getChats}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
