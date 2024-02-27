import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import axios from 'axios'
import { getSavedChatsRoute } from '../utils/APIRoutes'
import Logout from './Logout'


function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [selectedUser, setSelectedUser] = useState(undefined)
    const [searchUser, setSearchUser] = useState('')
    const [savedContacts, setSavedContacts] = useState([])
    useEffect(() => {
        if(currentUser){
            setCurrentUserName(currentUser.username)
            setCurrentUserImage(currentUser.avatarImage)
            getSavedContacts();
        }
    }, [currentUser, savedContacts]);

    

    const changeCurrentChat = (index, contact) => {
        setSelectedUser(index)
        changeChat(contact)
        
    }

    const filteredContacts = contacts.filter(contact => 
        contact.username.toLowerCase().includes(searchUser.toLowerCase()))

    const getSavedContacts = async () => {
        const data = await axios.post(getSavedChatsRoute, {from: currentUser._id})
        setSavedContacts(data.data)
    }

  return <>
    {
        currentUserImage && currentUserName && (
            <Container> 
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>jetchat</h3>
                    <button className='logout-btn'><Logout /></button>
                </div>
                <input className="username-inp" type="text" placeholder="Search username..." value={searchUser} onChange={e => setSearchUser(e.target.value)}/>
                <div className="contacts">
                    {
                        searchUser === '' ? 
                        (
                          savedContacts.map((contact, index) => {
                            return (<div className={`contact ${index === selectedUser ? 'selected' : ''}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" /> 
                                </div>
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>)
                          })
                        ) : (
                        filteredContacts.map((contact, index) => {
                            return (<div className={`contact ${index === selectedUser ? 'selected' : ''}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" /> 
                                </div>
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>)
                        })
                        )
                    }
                </div>
                <div className="currentuser">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" /> 
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div>

            </Container>
        )
    
    }
  </>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 10% 65% 15%;
    overflow: hidden;
    background-color: #080420;
    height: 100%;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
        .logout-btn {
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
    }
    .username-inp {
        background-color: #ffffff39;
        border: none;
        outline: none;
        padding: 0.5rem;
        color: white;
        font-size: 1.2rem;
        text-align: center;
        border-radius: 0.2rem;
        margin-bottom: 0.5rem;
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
    }
    .contact {
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        .avatar {
            img{
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
    .selected {
        background-color: #9186f3;
        .username {
            h3 {
                color: white;
            }
        }
    }
    .currentuser{
        display: flex;
        background-color: #0d0d30;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
        
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {

                font-size: 1rem;
            }
    }
    @media screen and (max-width: 720px) {
        
    }

`;

export default Contacts;
