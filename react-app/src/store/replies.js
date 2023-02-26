const POST_REPLY = 'reply/POST_REPLY'
const DELETE_REPLY ='reply/DELETE_REPLY'
const newReply = (reply) => ({
    type: POST_REPLY,
    reply
})

export const DeleteReply = (replyId) => ({
    type:DELETE_REPLY,
    replyId
})



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





const replyReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_REPLY:{
            const newState = {...state}
            newState[action.reply.id] = action.reply
            return newState
        }

        case DELETE_REPLY:{
            const newState = {...state}
            delete newState[action.replyId]
            return newState
        }

        default: {
            return state
        }
    }
}

export default replyReducer