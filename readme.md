## USER ENDPOINTS

[POST] /users/register -> register an user and save in database
STATUS: 201

[POST] /users/login -> user starts session and token will be created
STATUS: 200

## EXERCISES ENDPOINTS

[GET] /exercises -> it returns an array with all the database exercises
STATUS: 200

[POST*] /exercise/create -> it receives an exercise, and post it in database, and return the created exercise
STATUS: 201

[PUT*] /exercise/modify -> it receives an exercise and modify it in database, and returns the exercise modified
STATUS: 201

[DELETE*] /exercise/delete/ -> it deletes an exercise of the database, and returns an object with the same id
STATUS: 201

STATUS ERRORS=

- 400: Bad Request
- 404: Not found
- 409: Conflicts
- 500: Internal Server Error
