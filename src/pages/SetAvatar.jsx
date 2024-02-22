import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import loader from "../assets/loader.gif";
import { Buffer } from 'buffer';


export default function SetAvatar() {
    const api = "https://api.multiavatar.com/45678942";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOpt = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const setProfilePicture = async () => {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar]
        });

        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem('chat-app-user', JSON.stringify(user));
            navigate("/");
        } else {
            toast.error("Failed to set Avatar!", toastOpt);
        }
    };

    async function fetchData() {
        const data = [];
        for(let i=0; i<4; i++){
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}?apikey=${process.env.AVATAR_API_KEY}`);
            
            const buffer = Buffer.from(image.data);
            data.push(buffer.toString('base64'));
        }
        setAvatars(data);
        setIsLoading(false);
        }
    
    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login");
        }else {
        fetchData();
        }
    }, []);

  return (
    <>
    {
        isLoading ? <Container>
        <div className='loader-container'>
            <img src={loader} alt="loader" className="loader"/>
        </div>
        </Container> : (

    <Container>
        <div className="title-container">
            <h1>Pick an Avatar for your profile</h1>
        </div>
        <div className="avatars">{
            avatars.map((avatar, index) => {
                return (
                    <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} key={index} >
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)}/>
                    </div>
                )
            })
        }
            
        </div>
        <div className='btn-container'>
        <button className="submit-btn" onClick={() => {
            if(selectedAvatar === undefined){
                toast.error("Please select an avatar!", toastOpt);
            }else{
                setProfilePicture();
            }
        }}>Set as Avatar</button>
        <button className='submit-btn' onClick={() => {
            setIsLoading(true);
            fetchData()
            setSelectedAvatar(undefined);
            }}>Reroll</button>
        </div>
    </Container>
    )
    }
    <ToastContainer />
    </>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;    
        }
    }
    .avatars {
        gap: 2rem;
        display: flex;
        img{
            height: 6rem;
        }
        .avatar {
            border: 0.3rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
        }
        .selected {
            border: 0.3rem solid white;
        }
    }
    .btn-container {
        display: flex;
        flex-direction: row-reverse;
        gap: 2rem;
    }
    .submit-btn {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
        
    }

`;
