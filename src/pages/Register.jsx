import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.svg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { RegRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toastOpt = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
          const { email, username, password } = values;
          const {data} = await axios.post(RegRoute, {
            username,
            email,
            password,
          });
          console.log(data);
    
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
        const { username, email, password, confirmPassword } = values;
        if(password!==confirmPassword){
            toast.error("Password and Confirm password should match!", toastOpt);
            return false;
        } 
        else if (username.length<3){
            toast.error("Username should be greater than 3 characters", toastOpt);
            return false;
        }
        else if (password.length<8){
            toast.error("Password must be equal or greater than 8 characters!", toastOpt);
            return false;
        }
        else if (!email){
            toast.error("Email is required!", toastOpt);
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
                <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)}/>
                <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)}/>
                <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleChange(e)}/>
                <button type='submit'>Register</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
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

export default Register