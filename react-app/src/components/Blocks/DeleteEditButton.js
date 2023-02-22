import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DeleteT } from "../Tweets/DeleteT";
import OpenModalButton from "../OpenModalButton";

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

        const closeMenu = (e) => {
            // TODO what does below code mean?
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="delete-edit-button-container">
          <button onClick={openMenu}>
            <i className="fa-solid fa-ellipsis" />
            {showMenu && (
              <ul className={ulClassName} ref={ulRef}>
                <li>
                  <DeleteT />
                </li>
              </ul>
            )}
          </button>
        </div>
      );




}
