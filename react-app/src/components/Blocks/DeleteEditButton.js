import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DeleteT } from "../Tweets/DeleteT";
import { EditT } from "../Tweets/EditT";
import './DeleteEditButton.css'



export const DeleteEditButton = ({ tweetId }) => {
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
  


    return (
        <div className="delete-edit-button-container">
          <button style={{border:'none'}}onClick={openMenu}>
            <i className="fa-solid fa-ellipsis" />
            {showMenu && (
              <ul className="delete-edit-buttons" ref={ulRef}>
                <li>
                  <DeleteT tweetId={tweetId}/>
                </li>
                <li>
                  <EditT tweetId={tweetId}/>
                </li>


              </ul>
            )}
          </button>
        </div>
      );




}
