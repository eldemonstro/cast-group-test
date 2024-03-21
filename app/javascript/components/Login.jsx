import React, { useState } from "react";
import Form from './login/Form'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    const token = document.querySelector('meta[name="csrf-token"]').content
    event.preventDefault()

    const loginData = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    await fetch('/login', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    }).then((data) => {
      if (data.ok) {
        return navigate('/')
      }

      return Promise.reject(data)
    }).catch((data) => {
      data.json().then((json) => {
        setErrors(json)
      })
    })
  }


  return(
    <>
      <h1>Login</h1>
      <Form handleLogin={ handleLogin } errors={ errors } />
    </>
  )
};