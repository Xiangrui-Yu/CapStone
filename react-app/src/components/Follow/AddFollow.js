import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewFollow } from '../../store/follows'


export const AddFollow = ({userId}) => {
    const dispatch = useDispatch()


    const handleAddUser = async () => {
        const addUser = await dispatch(addNewFollow(userId))
    }

    return (
        <div className='add-follower'>
          <button 
                className='add-follower-button' 
                type='submit'
                onClick={() =>handleAddUser()}
            >
            <i className="fa-solid fa-user-plus"></i>
          </button>
        </div>
      );
}