import { getUserReplies } from "./replies"
import { loadAllTweets } from "./tweets"
import { getUserTweets } from "./tweets"
import { loadDetailsOfTweet } from "./tweets"
import { getReplies } from "./replies"
const LIKE_OBJ = 'likes/LIKE_OBJ'


const loadLikes = (data) =>({
    type:LIKE_OBJ,
    data
})

export const handleLikes = (object_type,object_id) => async (dispatch,getState) => {
    const res = await fetch(`/api/likes/${object_type}/${object_id}`,{
        method:'post'
    })

    const data = await res.json();
    if (object_type === 'tweets') {
        dispatch(loadDetailsOfTweet(object_id))
        dispatch(getReplies(object_id))
      } else if (object_type === 'replies') {
        const state = getState()
        const reply = state.replies[object_id]
        dispatch(getUserReplies(reply.user_id))
      }
    
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

