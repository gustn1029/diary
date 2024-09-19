import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useReduxToolkitHook";

const Header = () => {
  const { user, isLogin, isAuthLoading } = useAppSelector((state) => state.auth);
  return (
    <header>
      <div className="header-wrap">
        <h1>
          <Link to="/">
            <img className="logo" src="/img/logo.svg" alt="두근두근 비밀일기" />
          </Link>
        </h1>
        <div>
          {isAuthLoading ? (
            <p>Loading...</p>
          ) : !isLogin ? (
            <>
              <Link to="/login" className="btn-login">
                로그인
              </Link>
              <Link to="/signup" className="btn-join">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <p className="hello">환영합니다. <strong>{user?.displayName}</strong> 님!</p>
              <Link to="/logout" className="btn-logout">
                로그아웃
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
