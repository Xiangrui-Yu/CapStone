import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { ReplyEdit } from "./ReplyEdit";
import { ReplyDelete } from "./ReplyDelete";



export const ReplyEditDelete = ({ id }) => {
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
    <div className="delete-edit-button-container">
      <button style={{ border: 'none' }} onClick={openMenu}>
        <i className="fa-solid fa-ellipsis" />
        {showMenu && (
          <ul className="delete-edit-buttons" ref={ulRef}>
            <li>
              <ReplyDelete ReplyId={id} />
            </li>
            <li>
              <OpenModalButton
                buttonText="Edit"
                onItemClick={closeMenu}
                modalComponent={<ReplyEdit replyId={id} />}
              />
            </li>
          </ul>
        )}
      </button>
    </div>
  );
}
