

const GET_UNFOLLOWED = 'follow/GET_UNFOLLOWED'
const GET_FOLLOWED='follow/GET_FOLLOWED'
const FOLLOW='follow/FOLLOW'
const UNFOLLOW ='unfollow/UNFOLLOW'

const getUnfollowed = (usersUnfollowing) => ({
    type: GET_UNFOLLOWED,
    usersUnfollowing
})

const getFollowed = (usersFollowing) => ({
    type:GET_FOLLOWED,
    usersFollowing
})

const addFollow = (user) =>({
    type:FOLLOW,
    user
})

const UndoFollow = (userId) =>({
    type:UNFOLLOW,
    userId
})


export const getAllUnfollowed = () => async dispatch =>{
    const res = await fetch('/api/follows/unfollows')
    if(res.ok) {
        const usersUnfollowing = await res.json()
        dispatch(getUnfollowed(usersUnfollowing))
    }
}

export const getAllFollowed = () => async dispatch =>{
    const res = await fetch('/api/follows/following')
    if (res.ok){
        const usersFollowing = await res.json()
        dispatch(getFollowed(usersFollowing))
    }
}

export const addNewFollow = (userId) => async dispatch =>{
    const res = await fetch(`/api/follows/${userId}`,{
        method:'post',
    })
    if(res.ok){
        const user = await res.json()
        dispatch(addFollow(user))
        dispatch(getAllFollowed())
        dispatch(getAllUnfollowed())
        return user
    }
}


export const UndoTheFollow = (userId) => async dispatch =>{
    const res = await fetch(`/api/follows/${userId}`,{
        method:'delete'
    })

    if(res.ok){
        dispatch(UndoFollow(userId))
        dispatch(getAllFollowed())
        dispatch(getAllUnfollowed())

    }
}



const followReducer = (state ={}, action) => {
    switch(action.type){

        case GET_UNFOLLOWED:{
            const unfollowed = {}
            action.usersUnfollowing.unfollowed_users.forEach(user =>{
                unfollowed[user.id] = user
            })
            return {...state, unfollowed}
        }
        case GET_FOLLOWED:{
            const followed = {}
            action.usersFollowing.following_users.forEach(user =>{
                followed[user.id] = user
            })
            return {...state, followed}
        }

        case FOLLOW:{
            const newState = {...state}
            newState[action.user.id] = action.user
            return newState
        }
        case UNFOLLOW:{
            const newState = {...state}
            delete newState[action.userId]
            return newState
        }

        default:{
            return state
        }
    }
}

export default followReducer