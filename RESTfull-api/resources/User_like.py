from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.user_like import User_like_Model


# define how a user like a recipe
class User_like(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True)

    @jwt_required()
    def get(self):
        data = self.parser.parse_args()
        recipeIDs = []
        for x in User_like_Model.find_by_username():
            recipeIDs.append(x.recipe_id)
        return {"msg": "Success!",
                "total_likes_by_user": User_like_Model.user_like_count(data['username']),
                "data": recipeIDs}

# define how many likes a recipe have
class Recipe_liked_byUsers(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('recipeid',
                        type=int,
                        required=True)

    def get(self):
        data = self.parser.parse_args()
        if User_like_Model.find_by_recipeid(data['recipeid']):
            return {"msg": "Success!",
                    "total_recipe_liked": User_like_Model.recipe_like_count(data['recipe_id'])}, 200
        else:
            return {"msg": "no such recipe!"}, 404

# define the method: 'like' a recipe
class Like_a_recipe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True)
    parser.add_argument('recipe_id',
                        type=int,
                        required=True)

    @jwt_required
    def post(self):
        data = self.parser.parse_args()

        rec = User_like_Model(username=data['username'],
                              recipe_id=data['recipe_id'])
        if (User_like_Model.find_by_username(data['username'])) and (User_like_Model.find_by_recipeid(data['recipe_id'])):
            return {'msg': 'Repeat like!'}, 200
        else:
            rec.save_to_db()
            return {'msg': "liked!"}, 200

# define the method: 'Unlike' a recipe
class Unlike_a_recipe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True)
    parser.add_argument('recipe_id',
                        type=int,
                        required=True)

    @jwt_required
    def delete(self):
        data = self.parser.parse_args()
        rec = User_like_Model.find_by_username_and_recipeid(
            data['username'], data['recipeid'])
        try:
            rec.delete_from_db()
            return {"msg": "Unliked!"}, 200
        except:
            return {"msg": "Something went wrong!"}, 404
