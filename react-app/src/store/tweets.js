const ALL_TWEETS = 'tweets/GET_ALL_TWEETS'
const POST_T = 'tweets/POST_T'

const getAllTweets = (tweets) => ({
    type: ALL_TWEETS,
    tweets
})

const newT = (data) => ({
    type: POST_T,
    data
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
        default: {
            return state
        }
    }
}

export default tweetReducer