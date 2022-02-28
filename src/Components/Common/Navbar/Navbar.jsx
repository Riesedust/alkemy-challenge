import React from 'react'
import { useSelector } from 'react-redux'
import './Navbar.css'

function Navbar() {

  const menu = useSelector(state => state.menu)
  function handleClick() {
    window.localStorage.removeItem('logged')
    window.localStorage.setItem('myMenu', JSON.stringify(menu))
    window.location.href = "http://localhost:3000/"
  }

  return (
    <nav class="nav justify-content-center|justify-content-end">
      {localStorage.getItem('logged') && <button class="nav-link active" onClick={() => handleClick()}>Log out</button>}
    </nav>
  )
}

export default Navbar