import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUnfollowed } from '../../store/follows'
import { AddFollow } from './AddFollow'
import "./follow.css"
import DefaultAvatar from '../../DefaultAvatar.png'




export const GetAllUnfollowed = () => {
    const dispatch = useDispatch();

    const usersObj = useSelector(state => state?.follows?.unfollowed)
    const users = usersObj ? Object.values(usersObj) : []


    useEffect(() => {
        dispatch(getAllUnfollowed())
    }, [dispatch])

    return (
        <div className='follow-users-details'>
            <div className='Who-to-follow'>Who to follow</div>
            {users && users.map(user => {
                return (
                    <div className='add-user-holder'>
                        <Link to={`/users/${user.id}`} className='follow-users-link'>

                            <div className="user_avatar">
                                {user.avatar ? (<img src={user.avatar} alt="User avatar"></img>) : (<img src={DefaultAvatar} alt="Default avatar" />
                                )}
                            </div>
                            <div className="follow-user_info">
                                {user.name}{" "}
                                <span className="follow-user_info2">
                                    {user.verified && <i className="fa-duotone fa-badge-check"></i>}
                                    @{user.username}
                                </span>
                            </div>
                        </Link>
                        <div className='add-user-button'>
                            <AddFollow userId={user.id} />
                        </div>



                    </div>
                )
            })}

        </div>
    )
}   