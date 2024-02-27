import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
      setIsLoaded(true);
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 720px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e) => {
        setIsMobile(e.matches);
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, [isMobile]);
  
  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser])

    const fetchData = async () => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${getUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    
  useEffect(() => {
    fetchData();
  }, [fetchData, currentUser]);

  const handleChatChange = (chat) => {
     setCurrentChat(chat);
  }

  const back = () => {
    setCurrentChat(undefined);
  }

  return (
      <Container>
      { isMobile ? (
        <div className='container-mob'>
        {(isLoaded && (currentChat === undefined)) ? (
        <Contacts className="contacts" contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        ) : (
          <ChatContainer className="chatcontainer" currentChat={currentChat} currentUser={currentUser} socket={socket} back={back}/>
        )
        }
        </div>
      ) : (
        <div className="container">
          <Contacts className="contacts" contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {
            (isLoaded && (currentChat === undefined)) ? (
              <Welcome className="welcome" currentUser={currentUser}/>
            ) : (
              (isLoaded && (currentChat !== undefined) && currentUser !== undefined) && (
              <ChatContainer className="chatcontainer" currentChat={currentChat} currentUser={currentUser} socket={socket}/>
              )
            )
          }
        </div>
      )
      }
      </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 720px) {
      
    }
  }
  .container-mob {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
  }
  .contacts {
    height: 100%;
  }
`;



export default Chat;