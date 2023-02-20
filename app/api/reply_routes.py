from flask import Blueprint, jsonify, session, request
from app.models import User, Tweet, Reply, Like, Retweet, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
from .user_routes import user_routes
from .tweet_routes import tweet_routes


reply_routes = Blueprint('reply', __name__)


# GET ALL REPLIES BY CURRENT USER

@reply_routes.route('/current', methods=['GET'])
def get_reply_current():

    if current_user.is_authenticated:
        replies = Reply.query.options(joinedload(Reply.users), joinedload(Reply.likes), joinedload(
            Reply.retweets)). filter(Reply.user_id == current_user.id). all()

        repliesObj = [reply.to_dict() for reply in replies]

        return {'replies': repliesObj}
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401

# GET ALL REPLIES BY USER ID


@user_routes.route('/<int:id>/replies', methods=['GET'])
def get_all_replies(id):
    user = User.query.get(id)
    if not user:
        return {'error': ["user doesn't exit"]}, 404

    replies = Reply.query.options(joinedload(Reply.users), joinedload(Reply.likes), joinedload(Reply.retweets)). filter(Reply.user_id == id). all()

    repliesObj = [reply.to_dict() for reply in replies]

    return {'replies': repliesObj}

# GET A REPLY BY ID
@reply_routes.route('/<int:id>', methods=['GET'])
def get_reply_id(id):

    reply = Reply.query.get(id)

    if not reply:
        return {'error':['reply doesn\'t exit']},404
    return reply.to_dict()

# POST A REPLY

@tweet_routes.route('/<int:id>/reply', methods =['POST'])
def post_reply(id):

    if current_user.is_authenticated:

        data = request.json
        body = data['body']

        # body length cannot exceed 255 characters
        if not 1 <= len(body) <= 255:
            return {'error': ['body length must be between 1 and 255    characters']}, 400

        newReply = Reply(
            body = body,
            user_id = current_user.id,
            tweet_id = id
        )
        db.session.add(newReply)
        db.session.commit()

        return newReply.to_dict()
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401

# Edit A REPLY
@reply_routes.route('/<int:id>', methods=['PUT'])
def edit_reply(id):
    if current_user.is_authenticated:
        reply = Reply.query.get(id)

        if not reply:
            return {'error':['reply doesn\'t exit']},404
        
        if current_user.id is not reply.user_id:
            return {'errors': ['Unauthorized'], "statusCode": 401}, 401
        
        data = request.json

        reply.body = data['body']

        db.session.commit()

        return reply.to_dict()

    return {'errors': ['Unauthorized'], "statusCode": 401}, 401


# DELETE A TWEET
@reply_routes.route('/<int:id>', methods =['DELETE'])
def delete_reply(id):
    if current_user.is_authenticated:
        reply = Reply.query.get(id)

        if not reply:
            return {'error':['reply doesn\'t exit']},404
        db.session.delete(reply)
        db.session.commit()
        return "successfully"


    return {'errors': ['Unauthorized'], "statusCode": 401}, 401
