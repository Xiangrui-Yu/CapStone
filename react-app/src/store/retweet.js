const RETWEET_OBJ = 'retweets/RETWEET_OBJ'

const handleRetweet = (body) => ({
  type: RETWEET_OBJ,
  body
})


export const retweetObj = (object_type, object_id, body) => async (dispatch) => {
  const res = await fetch(`/api/retweets/${object_type}/${object_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    const body = await res.json()
    dispatch(handleRetweet(body))
    return body
  }

}



const retweetReducer = (state = {}, action) => {
  switch (action.type) {
    case RETWEET_OBJ: {
      return {
        ...state,
        [action.body.id]: action.body
      }
    }
      
    default: {
      return state
    }
  }
}

export default retweetReducer