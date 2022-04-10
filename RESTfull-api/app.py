from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from resources.User import Signup
from resources.User import Login
from resources.User_like import Recipe_liked_byUsers, User_like, Like_a_recipe, Unlike_a_recipe
from resources.Extend import Get_info_from_extend


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///data.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['PROPAGATE_EXCEPTIONS']=True
app.secret_key='sijia'
api=Api(app)

jwt=JWTManager(app)

api.add_resource(Signup,'/user/signup')
api.add_resource(Login,'/user/login')
api.add_resource(User_like,'/user/likes')
api.add_resource(Recipe_liked_byUsers,'/recipes/like')
api.add_resource(Like_a_recipe,'/recipes/likes')
api.add_resource(Unlike_a_recipe,'/recipes/likes')
api.add_resource(Get_info_from_extend,'/recipes')
cors = CORS(app, resources={r"/*": {"origins": "*"}})
@app.before_first_request
def creat_tables():
    db.create_all()

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000,debug=True)
