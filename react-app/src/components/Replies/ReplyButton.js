import React, { useState, useEffect, useRef } from "react";
import { PostRelyNoButton } from "./PostReplyNoButton";


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



  return (
    <div className="reply-button-container">
      <button style={{ border: 'none' }} onClick={openMenu}>
        <i class="fa-regular fa-comment"></i>
        {showMenu && (
          <div className="reply-button" >
              <PostRelyNoButton tweetId={tweetId} />
     
          </div>
        )}
      </button>
    </div>
  );

}
