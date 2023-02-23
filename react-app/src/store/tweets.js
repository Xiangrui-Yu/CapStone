const ALL_TWEETS = 'tweets/GET_ALL_TWEETS'
const POST_T = 'tweets/POST_T'
const DELETE_T ='tweets/DELETE_T'
const EDIT_T='tweets/EDIT_T'

const getAllTweets = (tweets) => ({
    type: ALL_TWEETS,
    tweets
})

const newT = (tweets) => ({
    type: POST_T,
    tweets
})

const deleteT = (tweetId) => ({
    type:DELETE_T,
    tweetId
})

const editT= (body) =>({
    type:EDIT_T,
    body
})


export const loadAllTweets = () => async dispatch => {
    const res = await fetch('/api/tweets')
    if (res.ok) {
        const tweets = await res.json();
        dispatch(getAllTweets(tweets))
    }
}

export const postNewT = (tweets) => async dispatch => {
    const res = await fetch('/api/tweets', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweets)

    })
    if (res.ok){
        const tweets = await res.json()
        dispatch(newT(tweets))
        return tweets
    }

}

export const deleteTweet = (tweetId) => async dispatch =>{
    const res = await fetch(`/api/tweets/${tweetId}`,{
        method:'delete'
    });
    
    if(res.ok){
        dispatch(deleteT(tweetId))
    }
}

export const editTweet = (tweetId,body) => async dispatch => {
    const res = await fetch(`/api/tweets/${tweetId}`,{
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });

    if(res.ok){
        const body = await res.json();
        console.log(body, " this is body on the editTweet")
        dispatch(editT(body));
        return body
    }
}

const tweetReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_TWEETS: {
            const newState = {}
            action.tweets.Tweets.forEach(tweet => {
                newState[tweet.id] = tweet
            })
            return newState
        }
        
        case POST_T:{
            const newState = {...state}
            newState[action.tweets.id] = action.tweets
            return newState
        }
        case DELETE_T:{
            const newState = {...state}
            delete newState[action.tweetId]
            return newState
        }
        case EDIT_T:{
            const newState = {...state}
            newState[action.body.id] = action.body
            console.log(action.body.id, "hello check here")
            return newState
        }
        default: {
            return state
        }
    }
}

export default tweetReducer