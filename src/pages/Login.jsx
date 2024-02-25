import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.svg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { LoginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const toastOpt = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
      if(localStorage.getItem('chat-app-user')){
        navigate("/");
      }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
          const { username, password } = values;
          const {data} = await axios.post(LoginRoute, {
            username,
            password,
          });
          
    
          if (data.status === false) {
            toast.error(data.msg, toastOpt);
          }
          if (data.status === true) {
            localStorage.setItem('chat-app-user', JSON.stringify(data.user));
            navigate("/");
          }
        }
      };

    const handleValidation = () => {
        const { username, password } = values;
         
        if (username.length === ""){
            toast.error("Username and password is required!", toastOpt);
            return false;
        }
        else if (password.length === ""){
            toast.error("Username and password is required!", toastOpt);
            return false;
        }
        
        return true;
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(handleSubmit)} >
                <div className="brand">
                    <img src={logo} alt="Logo" />
                    <h1>jetchat</h1>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e) } min="3"/>
                <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}/>
                <button type='submit'>Login</button>
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        img {
            width: 50px;
            height: 50px;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid grey;
            border-radius: 0.5rem;
            color: white;
            width: 100%;
            font-size: 1rem;
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.5rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            a {
                color: #997af0;
                font-weight: bold;
                text-decoration: none;;
            }
        } 
    }
`;

export default Login;