import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/auth.css'
import { useAuth } from "../context/auth-context";

export default function SignIn() {
    const [loggedIn, changeLogIn] = useState(false);
    const [loginForm, UpdateForm] = useState({
      username: "",
      password: "",
    })
    const { login } = useAuth();
    return (
       
            <div className='login'>
              <h1>Login</h1>
              <form className='login-form'>
                <input type='text' onChange={(e) => UpdateForm(old =>  old = {
                  ...old,
                  username: e.target.value,
                })} placeholder='Username' />
                <input type='password' onChange={(e) => UpdateForm(old => old = {
                  ...old,
                  password: e.target.value,
                })} placeholder='Password' />
              </form>
              <div className="button-wrapper">
                <button onClick={async () => {
                    await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(loginForm),  
                    })
                    .then(res => res.json())
                    .then(data => {
                      login(data)
                    })
                    .catch(err => console.error(err));
                  }}>Login</button>
                <button >Reigster</button>
              </div>
            </div>
          
    )
}