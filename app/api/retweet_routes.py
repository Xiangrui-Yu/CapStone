from flask import Blueprint, jsonify, session, request
from app.models import User, Tweet, Reply, Like, Retweet, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

retweet_routes = Blueprint('retweet', __name__)

# @retweet_routes.route('/<string:object_type>/<int:object_id>', methods =['POST'])
# def retweet_object(object_type, object_id):
