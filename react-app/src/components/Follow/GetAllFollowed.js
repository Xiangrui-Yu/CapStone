import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllFollowed } from '../../store/follows'
import "./follow.css"
import TwitterPic from '../../Twitter.png'


export const GetAllFollowed = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const usersObj = useSelector(state => state?.follows?.followed)
    const users = usersObj ? Object.values(usersObj) : []

    useEffect(() => {
        dispatch(getAllFollowed())
    }, [dispatch])


    const handleRepliesClick = () => {
        history.push(`/users/${userId}/replies`);
    };

    const handleTweetsClick = () => {
        history.push(`/users/${userId}`)
    }

    const handleFollowClick = () => {
        history.push(`/follows/following`)
    }

    return (

        <div className='following-holder'>
            <img className="userpage-img" src={TwitterPic} alt="Twitter Logo"></img>

            <div className='replyByUser-holder'>
                <div className='two-buttons'>
                    <button className='show-replies-user'
                        onClick={() => handleTweetsClick()}
                    >
                        Tweets
                    </button>


                    <button className='show-replies-user'
                        onClick={() => handleRepliesClick()}
                    >
                        Replies
                    </button>
                    <button className='show-follow-user'
                        onClick={() => handleFollowClick()}
                    >
                        Following
                    </button>


                </div>
            </div>



            <div className='follow-users-details'>
                {users && users.map(user => {
                    return (
                        <Link to={`/users/${user.id}`} className='follow-users-link'>

                            <div className="user_avatar">
                                <img src={user.avatar} alt="User avatar"></img>
                            </div>
                            <div className="follow-user_info">
                                {user.name}{" "}
                                <span className="follow-user_info2">
                                    {user.verified && <i className="fa-duotone fa-badge-check"></i>}
                                    @{user.username}
                                </span>
                            </div>
                        </Link>
                    )
                })}

            </div>


        </div>
    )
}