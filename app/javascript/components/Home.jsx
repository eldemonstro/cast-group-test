import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()

  const [secondsLeft, setSecondsLeft] = useState()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchSession = async () => {
      return await fetch('/session').then((data) => {
        if(data.ok) {
          return data.json()
        }
  
        return false
      })
    }

    fetchSession().then((session) => {
      if(!session) navigate('/login')

      setSecondsLeft(session.seconds_remaining)
      setUsername(session.username)
    })
  }, [])

  useEffect(() => {
    const timer = secondsLeft > 0 && setInterval(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft])

  const handleLogout = async () => {
    const token = document.querySelector('meta[name="csrf-token"]').content

    await fetch('/logout', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      }
    }).then((data) => {
      if (data.ok) {
        return navigate('/login', { state: { message: 'Deslogado com sucesso' } })
      }
    })
  }

  return(
    <div className="container col-6 mx-auto d-flex align-items-center h-100">
      <div className="align-items-center d-flex flex-column mx-auto">
        <h1>Olá {username}</h1>
        { location.state && <span>{location.state.message}</span>  }
        <span>Tempo restante na sessão: <br /> { secondsLeft > 0 ? secondsLeft + " segundos" : "Tempo de sessão encerrada!" }</span>
        <button onClick={ handleLogout } className="btn btn-primary mt-2">Logout</button>
      </div>
    </div>
  )
};