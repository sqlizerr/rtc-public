import React from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

export default function ChatInput({handleSendMsg}) {
    //const [showPicker, setShowPicker] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    // const handlePicker = () => {
    //     setShowPicker(!showPicker);
    // }

    // const handleEmojiClick = (e, emojiObject) => {
    //     let message = msg;
    //     message += emojiObject.emoji;
    //     setMsg(message);
    // }

    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

  return (
    <Container>
        <div className="btn-container">
            {/* <div className="emoji">
                <BsEmojiSmileFill onClick={handlePicker}/>
                {showPicker && <Picker onClick={handleEmojiClick}/>}
            </div> */}
        </div>
        <form className='input-container' onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder="Message" value={msg} onChange={(e) => setMsg(e.target.value)}/>
            <button type="submit" className='submit'>
                <IoMdSend />
            </button>
        </form>

    </Container>
  )
}

const Container = styled.div`
    
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .btn-container {
        display: flex;
        justify-content: center;
        color: white;
        gap: 1rem;
        align-items: center;
        .emoji {
            position: fixed;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        background-color: #ffffff34;
        input{
            width: 90%;
            
            background-color: transparent;
            color: white;
            border: none;
            padding: 1rem 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding-right: 1rem;
            padding-left: 1rem;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            background-color: transparent;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            border: none;
            transition: 0.3s ease-in-out;
            &:hover {
                color: #713deb;
            }
            svg {
                font-size: 2rem;
            }
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg{
                    font-size: 1rem;
                }
            }
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0 1rem;
      gap: 1rem;
    }
    
`;