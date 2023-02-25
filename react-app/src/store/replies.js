const POST_REPLY = 'reply/POST_REPLY'

const newReply = (reply) => ({
    type: POST_REPLY,
    reply
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






const replyReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_REPLY:{
            const newState = {...state}
            newState[action.reply.id] = action.reply
            return newState
        }

        default: {
            return state
        }
    }
}

export default replyReducer