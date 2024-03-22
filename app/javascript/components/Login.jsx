import React, { useState } from "react";
import Form from './login/Form'
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [errors, setErrors] = useState({})

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
        return navigate('/', { state: { message: 'Logado com sucesso!' } })
      }

      return Promise.reject(data)
    }).catch((data) => {
      data.json().then((json) => {
        setErrors(json)
      })
    })
  }


  return(
    <div className="container col-4 mx-auto d-flex align-items-center h-100">
      <div className="align-items-center d-flex flex-column">
        <h1>Login</h1>
        { location.state && <span>{location.state.message}</span> }
        <Form handleLogin={ handleLogin } errors={ errors } />
      </div>
    </div>
  )
};