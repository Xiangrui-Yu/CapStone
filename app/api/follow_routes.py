from flask import Blueprint, jsonify, session, request
from app.models import User, Tweet, Reply, Like, Retweet, Follow,db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

follow_routes = Blueprint('follow', __name__)

# add following


@follow_routes.route('/<int:userId>', methods=['POST'])
def follow(userId):
    if current_user.is_authenticated:
        follower = current_user
        following = User.query.get(userId)

        if following is None:
            return {'error': ['user doesn\'t exit']}, 404
        
        existing_follow = Follow.query.filter(Follow.follower_id == follower.id, Follow.following_id == userId).first()

        if existing_follow:
            return {'error':['you are already following this user']}, 404

        follow = Follow(follower_id = follower.id, following_id = userId)
        db.session.add(follow)
        db.session.commit()

        return follow.to_dict()

    return {'errors': ['Unauthorized'], "statusCode": 401}, 401

# remove following


@follow_routes.route('/<int:userId>', methods=['DELETE'])
def remove(userId):
    if current_user.is_authenticated:
        follower = current_user
        following = User.query.get(userId)

        if following is None:
            return {'error':['user doesn\'t exit']},404
        
        existing_follow = Follow.query.filter(Follow.follower_id == follower.id, Follow.following_id == userId).first()

        if not existing_follow:
            return {'error':['you are not following this user']}, 404

        db.session.delete(existing_follow)
        db.session.commit()
        return "successfully"

    return {'errors': ['Unauthorized'], "statusCode": 401}, 401


@follow_routes.route('/unfollows', methods =['GET'])
def get_unfollowed_users():
    if current_user.is_authenticated:
        followed_ids = [follow.following_id for follow in current_user.following]
        unfollowed_users = User.query.filter(User.id.notin_(followed_ids), User.id != current_user.id).all()
        return {"unfollowed_users":[user.to_dict() for user in unfollowed_users]}
    
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401



# @follow_routes.route('/following', methods=['GET'])
# def get_following_users():
#     if current_user.is_authenticated:
#         followed_ids = [follow.following_id for follow in current_user.following]
#         followed_users = User.query.filter(User.id.in_(followed_ids), User.id != current_user.id).all()
#         return {"following_users": }

#     return {'errors': ['Unauthorized'], "statusCode": 401}, 401