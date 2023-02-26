import React, { useState, useEffect, useRef } from "react";
import { PostRelyNoButton } from "./PostReplyNoButton";
import OpenModalButton from "../OpenModalButton";

export const ReplyButton = ({ tweetId }) => {
  const [showMenu, setShowMenu] = useState(false);

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
    <div className="reply-button-container">
        <div className="reply-button"  style={{border:"none",ourline:"none"}}>
          <OpenModalButton
            buttonText={<i className="fa-regular fa-comment"></i>}
            onItemClick={closeMenu}
            modalComponent={<PostRelyNoButton tweetId={tweetId} />}
          />
        </div>
    </div>
  );

}
