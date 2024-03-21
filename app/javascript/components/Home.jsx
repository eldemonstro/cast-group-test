import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState()

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

      setSecondsLeft(session.seconds_remaining)})
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
        return navigate('/login')
      }
    })
  }

  return(
    <div>
      <h1>Home { secondsLeft > 0 ? secondsLeft : "No more time" }</h1>
      <button onClick={ handleLogout }>Logout</button>
    </div>
  )
};