import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "./OpenModalButton";
import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SignupFormModal";
import { useDispatch, useSelector } from "react-redux";
import './LoginPage.css'
import TwitterPic from "../Twitter.png"

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
  
    const openMenu = () => {
      if (showMenu) return
      setShowMenu(true);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener("click", closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);
  
    return (
        <div className="login-page">
            <div>
                <img className="login-page-img" src={TwitterPic} alt="Twitter Logo"></img>
            </div>
            <div className="login-page-buttons">
                <h1>Happending now</h1>
                <h2> Join Tweeting today.</h2>
                <i className="fa-brands fa-twitter"></i>
                <OpenModalButton
                    buttonText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                    
                />

                <OpenModalButton
                    buttonText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                />

            </div>

        </div>
    )
}
