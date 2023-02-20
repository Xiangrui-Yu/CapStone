from flask import Blueprint, jsonify, session, request
from app.models import User, Tweet, Reply, Like, Retweet, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
tweet_routes = Blueprint('tweet', __name__)
from .user_routes import user_routes


# GET ALL TWEETS
@tweet_routes.route('', methods=['GET'])
def get_all_routes():
    allTweets = Tweet.query.options(joinedload(Tweet.users), joinedload(
        Tweet.likes), joinedload(Tweet.retweets), joinedload(Tweet.replies)).all()

    TweetObj = [tweet.to_dict() for tweet in allTweets]

    return {'Tweets': TweetObj}

# GET ALL TWEETS BY CURRENT USER


@tweet_routes.route("/current", methods=['GET'])
def get_all_current():
    if current_user.is_authenticated:
        allTweets = Tweet.query.options(joinedload(Tweet.users), joinedload(Tweet.likes), joinedload(
            Tweet.retweets), joinedload(Tweet.replies)).filter(Tweet.user_id == current_user.id).all()

        if not allTweets:
            return {'no tweet yet'}

        TweetObj = [tweet.to_dict() for tweet in allTweets]

        return {'Tweets': TweetObj}
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401

# GET ALL Tweets by user Id


@user_routes.route('/<int:id>/tweets', methods=['GET'])
def get_all_userId(id):
    user = User.query.get(id)
    if not user:
        return {'error': ["user doesn't exit"]}

    allTweets = Tweet.query.options(joinedload(Tweet.users), joinedload(Tweet.likes), joinedload(
        Tweet.retweets), joinedload(Tweet.replies)).filter(Tweet.user_id == id).all()
    TweetObj = [tweet.to_dict() for tweet in allTweets]

    return {'Tweets': TweetObj}


# GET A TWEET BY ID
@tweet_routes.route('/<int:id>')
def get_tweet_id(id):

    tweet = Tweet.query.get(id)

    if not tweet:
        return {'error':['tweet doesn\'t exit']},404
    
    return tweet.to_dict()
    
    

# POST A TWEET


@tweet_routes.route('', methods=['POST'])
def create_tweet():
    if current_user.is_authenticated:

        data = request.json
        body = data['body']

    # body length cannot exceed 255 characters
    if not 1 <= len(body) <= 255:
        return {'error': ['body length must be between 1 and 255 characters']}, 400

    newTweet = Tweet(
        body = body,
        user_id = current_user.id
    )
    db.session.add(newTweet)
    db.session.commit()

    return newTweet.to_dict()

# Edit A TWEET

@tweet_routes.route('/<int:id>', methods =['PUT'])
def edit_tweet(id):
    tweet = Tweet.query.get(id)

    if not tweet:
        return {'error':['tweet doesn\'t exit']},404
    
    data = request.json

    tweet.body = data['body']

    db.session.commit()

    return tweet.to_dict()


# DELETE A TWEET
@tweet_routes.route('/<int:id>', methods =['DELETE'])
def delete_tweet(id):
    if current_user.is_authenticated:
        tweet = Tweet.query.get(id)

        if not tweet:
            return {'error':['tweet doesn\'t exit']},404
    
        db.session.delete(tweet)
        db.session.commit()
        return "successfully"
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401
