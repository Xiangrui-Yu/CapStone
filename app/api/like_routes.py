from flask import Blueprint, jsonify, session, request
from app.models import User, Tweet, Reply, Like, Retweet, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

like_routes = Blueprint('like', __name__)


@like_routes.route('/<string:object_type>/<int:object_id>', methods =['POST'])
def like_object (object_type, object_id):
    object = None
    like_object = None

    if current_user.is_authenticated:

        if object_type == 'tweets':
            object = Tweet.query.get(object_id)
            like_object = Like.query.filter(Like.user_id == current_user.id, Like.tweet_id == object_id).first()


        elif object_type == "replies":
            object = Reply.query.get(object_id)
            like_object = Like.query.filter(Like.user_id == current_user.id, Like.reply_id == object_id).first()


        
        if not object:
            return {'errors': [f'{object_type} does not exist']}, 404
        

        if like_object:
            db.session.delete(like_object)
            db.session.commit()
            
            return {'message': 'Like removed successfully'}    
        else:

            new_like = Like(user_id = current_user.id, like_count =1)

            if object_type == 'tweets':
                new_like.tweet_id = object_id

            elif object_type == 'replies':
                new_like.reply_id = object_id
                
            db.session.add(new_like)
            db.session.commit()

            return new_like.to_dict()
        
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401
