# **APIs**


## **Like a recipe**

### description
Like a recipe when it hasn't been liked by the user.

#### Request address  
```http
POST {apiAddress}/recipes/likes
```
### Headers  
Content-Type: application/json

### Parameters

| **Name** | **Type** | **Example** | **Description**      |
| -------- | -------- | ----------- | -------------------- |
| username | string   | FrankFoodie | Registered user name |
| recipeid       | number   | 69095       | The recipe ID.       |



```json
{
    "msg":"Liked!"
}
```
## **Unlike a recipe**
### description
Cancel like of a recipe when it has been liked by the user.


#### Request address  
```http
DELETE {apiAddress}/recipes/likes
```

#### Parameters

| **Name** | **Type** | **Example** | **Description**      |
| -------- | -------- | ----------- | -------------------- |
| username | string   | FrankFoodie | Registered user name |
| recipeid       | number   | 69095       | The recipe ID        |

```json
{
    "msg":"Unliked!"
}
```
## **A User's Like**

### API description
Resturn recipe IDs liked by the exact user

### Request Address

```http
GET {apiAddress}/user/likes
```
### Headers

Content-Type: application/json

### Parameters

| **Name** | **Type** | **Example** | **Description**      |
| -------- | -------- | ----------- | -------------------- |
| username    | string   | x@a.b       | The user ID          |

```json
{
    "msg":"Success!",
    "total_likes_by_user":3,
    "data":[
        12345,
        22345,
        26511
    ]
}
```


## **Total Like** 

### API description
Returns how many likes a recipe has
### Request Address

```http
GET {apiAddress}/recipes/likes
```
### Headers

Content-Type: application/json

### Parameters

| **Name** | **Type** | **Example** | **Description**      |
| -------- | -------- | ----------- | -------------------- |
| recipeid       | int      | 69095       | The recipe ID        |

```json
{
    "msg":"Success!",
    "total_recipe_liked":25
}
```


## **Sign up**

#### API description  
Users' information sign up

Users can sign up with email address

Only one account can be registered per email  


#### Request address  
```http
POST {apiAddress}/user/signup
```

### Headers  
Content-Type: application/json

### Parameters

|parameter|necessary|datatype|example|description|  
|---|---|---|---|---|  
|username|YES|string|xyz@ab.c|User registration email|


```json 
{
    "msg":"Success!"
}
```


## **Log in**

### API description
*  Users can log in with email address and password
*  Use HASH to encrypt the password.  
### Request address  
```http
Post {apiAddress}/user/login  
```
 
### Headers  
Content-Type:application/json  
Authorization  
### Parameters

 |parameter|necessary|datatype|example|description|  
 |---|---|---|---|---|  
 |username|YES|string|xyz@ab.c|User registration email| 
 |password|YES|string|P@ssw0rd|User password encrypted with MD5|

```json
{
    "msg":"log in success!",
    "access_token":251651,
    "refresh_token":18564
}
```



