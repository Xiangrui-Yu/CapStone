import { loadAllTweets } from "./tweets"
import { getUserTweets } from "./tweets"
import { loadDetailsOfTweet } from "./tweets"

const LIKE_OBJ = 'likes/LIKE_OBJ'


const loadLikes = (data) =>({
    type:LIKE_OBJ,
    data
})

export const handleLikes = (object_type,object_id) => async dispatch => {
    const res = await fetch(`/api/likes/${object_type}/${object_id}`,{
        method:'post'
    })

    const data = await res.json()
    dispatch(loadLikes(data))
    // dispatch(loadDetailsOfTweet(object_id))
    // dispatch(loadAllTweets())
    return data
}



const likeReducer = (state ={}, action) => {
    switch(action.type) {

        case 'LIKE_OBJ':{
            const newState ={...state}
            newState[action.data.id] = action.data
            return newState
        }

        default:{
            return state
        }
    }
}

export default likeReducer

