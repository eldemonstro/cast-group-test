import React, { useEffect } from "react"

export default function Form({ handleLogin, errors }) {  
  return(
    <form method="post" onSubmit={ handleLogin } className="d-grid">
      <label htmlFor="username" className="form-label">
        Usuário
      </label>
      <input type="text" placeholder="username" name="username" id="username" className="form-control" />
      <label htmlFor="password" className="form-label mt-2">
        Senha
      </label>
      <input type="password" placeholder="password" name="password" id="password" className="form-control" />

      <button type="submit" className="btn btn-primary mt-2">Login</button>

      { errors ? <span className="text-danger">{ errors.errors }</span> : '' }
    </form>
  )
}