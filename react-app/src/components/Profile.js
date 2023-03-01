import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { UserBlock } from './Blocks/UserBlock'
import { FooterBlock } from './Blocks/FooterBlock'
import './UserPage.css'

export const Profile = () => {

    const user = useSelector(state => state.session.user)
    console.log(user, " this is user on the profile page")
    const history = useHistory()

    const handleProfileClick = () => {
        history.push(`/users/${user.id}`)
    }


    return (
        <button className='show-current-tweets'
            onClick={() => handleProfileClick()}
        >
            Profile
        </button>
    )
}