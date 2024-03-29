import React, {useState, useEffect,useRef} from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';

import axios from 'axios';
import { getAllMsgsRoute, sendMsgRoute } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({currentChat, currentUser, socket, back}) {
    const [messages, setMessages] = useState([]);
    const [arrivedMsg, setArrivedMsg] = useState(null);
    const [isMobile, setIsMobile] = useState(false)
    const scrollRef = useRef();

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
        if(currentChat){
            async function handleChatSwitch(){
                const response = await axios.post(getAllMsgsRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                })
                setMessages(response.data);
            }
            handleChatSwitch();
        }
    }, [currentChat])

    const handleSendMsg = async (msg) => {
        await axios.post(sendMsgRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        })

        const msgs = [...messages];
        msgs.push({ message: msg, fromSelf: true });
        setMessages(msgs);
    };

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-receive", (msg)=>{
                setArrivedMsg({fromSelf: false, message: msg});
            })
        }
    }, [currentChat, messages])

    useEffect(() => {
        arrivedMsg && setMessages((prev)=>[...prev, arrivedMsg]);
    }, [arrivedMsg])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    

  return (
    <>
    {
    currentChat && (
        <Container>
        
            <div className="chatheader">
            <button onClick={back} className='back-btn'><h3>BACK</h3></button>
                <div className="userdetails">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                
            </div>
            <div className="chat-msgs">
                {
                    messages.map((msg, index) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${msg.fromSelf ? 'sent' : 'received'}`} key={index}>
                                    <div className="content">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>    
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
        )
    }
    </>
  )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    height: 100%;
    
    .chatheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        width: 100%;
        .back-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: #9a86f3;
            border: none;
            color: white;
            cursor: pointer;
        }
        .userdetails {
            display:flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
    .chat-msgs {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
            .message {
                display: flex;
                align-items: center;
                .content {
                    max-width: 40%;
                    overflow-wrap: break-word;
                    padding: 1rem;
                    font-size: 1.1rem;
                    border-radius: 1rem;
                    color: wheat;
                    
                }
            }
            .sent {
                justify-content: flex-end;
                .content{
                    background-color: #4f04ff21;
                }
            }
            .received {
                justify-content: flex-start;
                .content{
                    background-color: #9900ff20;
                }
            }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-rows: 15% 70% 15%;
    }
    @media screen and (max-width: 720px) {
        
    }
`;