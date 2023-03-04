import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import likeReducer from './likes';
import replyReducer from './replies';
import retweetReducer from './retweet';
import session from './session'
import tweetReducer from './tweets';
const rootReducer = combineReducers({
  session,
  tweets:tweetReducer,
  replies: replyReducer,
  likes:likeReducer,
  retweets:retweetReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
