# API Documentation

## Endpoint: `/api/users/register`

### Description
This endpoint is used to register a new user. It validates the input data and creates a new user in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `email` (string): The email of the user. It must be a valid email address.
- `fullname` (object): An object containing the user's first name and last name.
  - `firstname` (string): The first name of the user. It must be at least 3 characters long.
  - `lastname` (string): The last name of the user. It must be at least 3 characters long.
- `password` (string): The password of the user. It must be at least 6 characters long.

### Example Request
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

### Success - Status Code: 201 Created
### Example Response
```json
{
  "token": "jwt_token",
  "user": {    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },

    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

### Error - Status Code: 400 Bad Request
### Example Response
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Error - Status Code: 500 Internal Server Error
### Example Response
```json
{
  "error": "Internal Server Error"
}
```


The password is hashed before being stored in the database.
A JWT token is generated and returned upon successful registration.


## Endpoint: `/api/users/login`

### Description
This endpoint is used to login a user.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `email` (string): The email of the user. It must be a valid email address.
- `password` (string): The password of the user. It must be at least 6 characters long.

### Example Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success - Status Code: 200 OK
### Example Response
```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

### Error - Status Code: 400 Bad Request
### Example Response
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Endpoint: `/api/users/profile`

### Description
This endpoint is used to get the profile of the logged-in user.
### Method
`GET`

### Headers
Authorization (string): The JWT token of the logged-in user.

### Success - Status Code: 200 OK
### Example Response
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

### Error - Status Code: 401 Unauthorized
### Example Response
```json
{
  "message": "Unauthorized"
}
```

## Endpoint: `/api/users/logout`

### Description
This endpoint is used to log out the logged-in user.

### Method
`GET`

### Headers
Authorization (string): The JWT token of the logged-in user.

### Success - Status Code: 200 OK
### Example Response
```json
{
  "message": "Logged out successfully"
}
```

### Error - Status Code: 401 Unauthorized
### Example Response
```json
{
  "message": "Unauthorized"
}
```

# API Documentation

## Endpoint: `/api/captains/register`

### Description
This endpoint is used to register a new captain. It validates the input data and creates a new captain in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `email` (string): The email of the captain. It must be a valid email address.
- `fullname` (object): An object containing the captain's first name and last name.
  - `firstname` (string): The first name of the captain. It must be at least 3 characters long.
  - `lastname` (string): The last name of the captain. It must be at least 3 characters long.
- `password` (string): The password of the captain. It must be at least 6 characters long.
- `vehicle` (object): An object containing the vehicle details.
  - `color` (string): The color of the vehicle. It must be at least 3 characters long.
  - `plate` (string): The plate number of the vehicle. It must be at least 3 characters long.
  - `capacity` (number): The capacity of the vehicle. It must be at least 1.
  - `vehicleType` (string): The type of the vehicle. It must be one of `car`, `motorcycle`, or `auto`.

### Example Request
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}

### Success - Status Code: 201 Created
### Example Response

{
  "token": "jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}

### Error - Status Code: 400 Bad Request
### Example Response

{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Vehicle type must be at least 3 characters long",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}