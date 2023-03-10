import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './HomePage.css'
import DefaultAvatar from '../../DefaultAvatar.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button">
      <button onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" />
        ) : (
          <img src={DefaultAvatar} alt="Default avatar" />
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>

        <>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={handleLogout} className="logout">Log Out</button>
          </li>
        </>

        {/* : (
          <>
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
          </>
        ) */}
      </ul>
    </div>
  );
}

export default ProfileButton;
