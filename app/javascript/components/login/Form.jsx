import React, { useEffect } from "react"

export default function Form({ handleLogin, errors }) {  
  return(
    <form method="post" onSubmit={ handleLogin }>
      <label htmlFor="username">
        <span>Usuário</span>
      </label>
      <input type="text" placeholder="username" name="username" id="username" />
      <label htmlFor="password">
        <span>Senha</span>
      </label>
      <input type="password" placeholder="password" name="password" id="password" />

      <button type="submit">Login</button>

      { errors ? <span>{ errors.errors }</span> : '' }
    </form>
  )
}