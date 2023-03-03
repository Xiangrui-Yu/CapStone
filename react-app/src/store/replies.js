const POST_REPLY = 'reply/POST_REPLY'
const DELETE_REPLY ='reply/DELETE_REPLY'
const EDIT_REPLY ='reply/EDIT_REPLY'
const LOAD_REPLIES = 'reply/LOAD_REPLIES'
const USER_R ='replies/USER'


const loadReplies = (reply) => ({
    type: LOAD_REPLIES,
    reply
  })
  

const newReply = (reply) => ({
    type: POST_REPLY,
    reply
})

const DeleteReply = (replyId) => ({
    type:DELETE_REPLY,
    replyId
})

const EditReply =(body) => ({
    type:EDIT_REPLY,
    body
})

const UserReply = (replies) => ({
    type:USER_R,
    replies
})

export const getUserReplies = (userId) => async dispatch =>{
    const res = await fetch(`/api/users/${userId}/replies`)
    if (res.ok){
        const replies = await res.json()
        dispatch(UserReply(replies))
    }
}

export const getReplies = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${tweetId}/replies`)
    if(res.ok){
        const reply = await res.json()
        dispatch(loadReplies(reply))
    }
}

export const addReply = (tweetId, reply) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${tweetId}/reply`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reply)
    })
    if(res.ok){
        const reply = await res.json()
        dispatch(newReply(reply))
        console.log(reply,'this is the reply')
        return reply
    }
}

export const deleteTheReply = (replyId) => async dispatch => {
    const res = await fetch(`/api/replies/${replyId}`,{
        method:'delete'
    })
    if(res.ok){
        dispatch(DeleteReply(replyId))
    }
}


export const editTheReply = (replyId,body) => async dispatch => {
    const res = await fetch(`/api/replies/${replyId}`,{
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)

    })
    if(res.ok){
        const body = await res.json()
        dispatch(EditReply(body))
        return body
    }

}


const replyReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_REPLY:{
            const newState = {...state}
            newState[action.reply.id] = action.reply
            return newState
        }
        case USER_R:{
            const newState = {}
            action.replies.replies.forEach(reply => {
                newState[reply.id] = reply
            })
            // console.log(newState, "this is newState on reply by user ")
            return newState
        }

        case DELETE_REPLY:{
            const newState = {...state}
            delete newState[action.replyId]
            return newState
        }

        case EDIT_REPLY:{
            const newState = {...state}
            newState[action.body.id] = action.body
            return newState
        }
        case LOAD_REPLIES:{
            const newState = {...state}
            action.reply.replies.forEach(reply => {
                newState[reply.id] = reply
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default replyReducer