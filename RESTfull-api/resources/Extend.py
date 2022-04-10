from flask_restful import Resource
from flask  import jsonify
import requests

# get information from extend api
class Get_info_from_extend(Resource):
    def get(self,query):
        
        url_template='https://api.spoonacular.com/recipes/complexSearch?query={qu}'
        api_key='c9a5b25602844ea59b39f862677cf81a'
        
        url=url_template.format(qu=query)+"?apiKey="+api_key
        
        resp=requests.get(url)
        
        if resp.ok:
            return jsonify(resp.json())
        else:
            print(resp.reason)
        