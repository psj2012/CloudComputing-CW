# Restful API

This API can provide the services required by Smart Cook. It has the functions of user registration, login and likes and collections

This API is mainly written using the flask_restful framework. This API uses JWTs to control access and uses hashes to protect the user's password. The data is stored in a sqlite database and accessed using flask_sqlalchemy.

The function of this API can seen in the 'API document.md' file.