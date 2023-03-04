from flask import Blueprint, jsonify, session, request
from app.models import User, Tweet, Reply, Like, Retweet, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

retweet_routes = Blueprint('retweet', __name__)


@retweet_routes.route('/<string:object_type>/<int:object_id>', methods=['POST', 'DELETE'])
def retweet_object(object_type, object_id):
    object = None
    retweet_object = None

    if current_user.is_authenticated:
        if object_type == 'tweets':
            object = Tweet.query.get(object_id)
            retweet_object = Retweet.query.filter(
                Retweet.user_id == current_user.id, Retweet.tweet_id == object_id).first()

        elif object_type == "replies":
            object = Reply.query.get(object_id)
            retweet_object = Retweet.query.filter(
                Retweet.user_id == current_user.id, Retweet.reply_id == object.id).first()

        if not object:
            return {'errors': [f'{object_type} does not exist']}, 404

        # if retweet_object:
        #     db.session.delete(retweet_object)
        #     db.session.commit()
        #     return {'message': 'Retweet removed successfully'}

        # else:

        data = request.json
        body = data['body']

        new_retweet = Retweet(user_id=current_user.id,
                                retweet_count=1, body=body)

        if object_type == 'tweets':
            new_retweet.tweet_id = object_id

        elif object_type == "replies":
            new_retweet.reply_id = object_id

        db.session.add(new_retweet)
        db.session.commit()

        return new_retweet.to_dict()

    return {'errors': ['Unauthorized'], "statusCode": 401}, 401
