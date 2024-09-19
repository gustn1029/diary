import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Singup from "./pages/signup/Singup";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { appAuth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./hooks/useReduxToolkitHook";
import { login, setIsLoading, AuthUserData } from "./store/authSlice";
import Logout from "./pages/Logout";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkLoginState = onAuthStateChanged(appAuth, (user) => {
      if (user) {
        const userData: AuthUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(login(userData));
      } 
      dispatch(setIsLoading(false));

    });

    return () => checkLoginState();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="signup" element={<Singup />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
