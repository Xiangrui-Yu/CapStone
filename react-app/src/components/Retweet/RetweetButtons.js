import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { HandleRetweet } from "./HandleRetweet";
import OpenModalButton from "../OpenModalButton";


export const RetweetButtons = ({ object_type, object_id }) =>{
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
  
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = () => {
        if (document.activeElement.tagName === "INPUT") {
          return;
        }
        setShowMenu(false);
      };
      document.addEventListener("click", closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])
  
    const closeMenu = () => setShowMenu(false);
    
    return (
        <div className="retweet-button-container">
          <button style={{ border: 'none' }} onClick={openMenu}>
            <i className="fa-solid fa-retweet" />
            {showMenu && (
              <ul ref={ulRef}>
                <li>
                  <OpenModalButton
                    buttonText="Retweet"
                    onItemClick={closeMenu}
                    modalComponent={<HandleRetweet object_type ={object_type} object_id={object_id} />}
                  />
                </li>
              </ul>
            )}
          </button>
        </div>
      );
    




}
