# back-end

ALL API REQUESTS WILL BEGIN WITH 
        https://secret-family-backend.herokuapp.com/api

REGISTER, "/auth/register"
    `req.body` must be 
        {
            "username": [required]
            "password": [required]
            "email": [optional]
            "name": [optional]
        }

    Database is empty, create your own testing account

LOGIN, "/auth/login"
    `req.body` must be 
        {
            "username": [required]
            "password": [required]
        }

===================================================
ALL REQUESTS BELOW NEED AUTHENTICATION TOKEN IN THE HEADER

GET USER, `get`, "/users/user"
    - Returns the logged in user

GET ALL RECIPES/INSTRUCTIONS/INGREDIENTS FOR LOGGED IN USER, `get`, "/users/:id/recipes"

ADD A NEW RECIPE, `post`, "/users/recipes"
    `req.body` must be 
        {
            "title": [string],
            "category": [string],
            "source": [string],
            
            "user_id": [integer],
            
            "instructions": [
                {
                    "user_id": [number],
                    "step_number": [number],
                    "step_description: [string]
                },
                {
                    "user_id": [number],
                    "step_number": [number],
                    "step_description: [string]
                }
                ...as many instructions as you have
            ],

            "ingredients": [
                {
                    "name": [string],
                    "measurement": [string]
                },
                {
                    "name": [string],
                    "measurement": [string]
                },
                ...as many ingredients as you have
            ],

            "category": [string],

            "source": [string]

        }

EDIT A RECIPE, `put`, "/users/recipes/:id" ==> :id represents the recipe ID
    - `req.body` follows same structure as ADD A NEW RECIPE
    - ONLY add key:value pairs that you need changed
    - ANY change to `instructions` or `ingredients` REQUIRES that you submit all information for that particular key
        (previous data on instructions or ingredients will be deleted and rewritten with data from `req.body`)

DELETE A RECIPE, `delete`, "users/recipes/:id" ==> :id represents the recipe ID
    - will delete recipe and all associated instructions and ingredients