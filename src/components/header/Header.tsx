import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
    <div className="header-wrap">
      <h1><Link to="/"><img className="logo" src="/img/logo.svg" alt="두근두근 비밀일기" /></Link></h1>
      <div>
        <Link to="/login" className="btn-login">로그인</Link>
        <Link to="/signup" className="btn-join">회원가입</Link>
      </div>
    </div>
  </header>
  )
}

export default Header