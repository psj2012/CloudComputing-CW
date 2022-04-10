from flask import current_app
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from models.user import UserModel


class Signup(Resource):
    # Get the parameters from front-end
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True)
    parser.add_argument('password',
                        type=str,
                        required=True)
    # Define the post method to save the user info to database
    def post(self):
        data = self.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"msg": "Username used!"}, 100

        user = UserModel(
            username=data['username'], password=UserModel.generate_hash(data['password']))
        user.save_to_db()

        return { "msg": "Success!"}, 201


class Login(Resource):
    # Get the parameters from front-end
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True)
    parser.add_argument('password',
                        type=str,
                        required=True)

    # Define the post method to verify the user's password
    def post(self):
        data = Login.parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])
        if not current_user:
            return {
                "msg": 'User {} doesn\'t exist'.format(data['username'])}, 401
        if UserModel.verify_hash(UserModel.generate_hash(data['password']), current_user.password):
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'msg': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token}, 200
        else:
            return {'msg': 'Wrong credentials'}, 401

# Refresh the token to prevent users from needing to log in frequently
class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token=create_access_token(identity=current_user)
        return{'access_token':access_token}