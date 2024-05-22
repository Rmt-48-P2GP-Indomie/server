# Ngobrol - Group Project

## Description
Ngobrol is a real-time, chat-based social media application for Group Project. Users can register, chat with everyone or between users in real-time.

## Ngobrol API Documentation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /user`

- `GET /profile`
- `GET /profile/:username`
- `POST /profile`

- `GET /:username/message`
- `POST /:username/message`

### 1. POST /register

#### Description:

Register for user

- Body

```json

  {
  "email": "menyala@gmail.com",
  "username": "menyala",
  "password": "menyala123",
  "phoneNumber": "48651654",
  "address": "jl. menyala sejahtera"
  },

```

#### Response (200 - OK)

```json
{
  "id": 5,
  "username": "menyala",
  "email": "menyala@gmail.com"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Validation error"
}
```

### 2. POST /login

#### Description:

Login for user

- Body

```json

  {
    "username": "menyala",
    "password": "menyala123"
  },

```

#### Response (200 - OK)

```json
{
  "message": "Login Success!",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzE2MzU3NDQyfQ.zIzk6naLYzoCojSCCkPGLTmvqMHNoBqIvjRoIh2gGgs"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Error Invalid Username or Email or Password"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Error Invalid Username or Email or Password"
}
```
### 3. GET /user

#### Description:

Get info of currently logged user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json

{
    "id": 5,
    "email": "menyala@gmail.com",
    "username": "menyala",
    "phoneNumber": "48651654",
    "address": "jl. menyala sejahtera",
    "createdAt": "2024-05-22T05:56:55.710Z",
    "updatedAt": "2024-05-22T05:56:55.710Z",
    "Profile": {
        "id": 5,
        "UserId": 5,
        "fullname": null,
        "profileImageUrl": null,
        "bio": null,
        "createdAt": "2024-05-22T05:56:55.979Z",
        "updatedAt": "2024-05-22T05:56:55.979Z"
    }
},

```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthenticated!"
}
```

### 5. GET /profile

#### Description:

Get info of all profiles

Request:

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json
[
    {
        "id": 1,
        "UserId": 1,
        "fullname": "Alexander Duterte",
        "profileImageUrl": "https://media.vanityfair.com/photos/6258742267f4b24bbe87221a/3:2/w_1788,h_1192,c_limit/alexander-skarsgard-2022-portrait-lede.png",
        "bio": "Hello, My Friend !",
        "createdAt": "2024-05-22T05:55:40.974Z",
        "updatedAt": "2024-05-22T05:55:40.974Z",
        "User": {
            "id": 1,
            "email": "alexander@email.com",
            "username": "alexander",
            "createdAt": "2024-05-22T05:55:40.719Z",
            "updatedAt": "2024-05-22T05:55:40.719Z"
        }
    },
    {
        "id": 2,
        "UserId": 2,
        "fullname": "Graham Jhon",
        "profileImageUrl": "https://mbnconsulting.id/wp-content/uploads/2023/04/7-Tips-Efektif-Yang-Wajib-Dilakukan-Para-CEO-Dalam-Mengelola-Bisnisnya-1.jpg",
        "bio": "Sok atuh, gaskeun !",
        "createdAt": "2024-05-22T05:55:40.974Z",
        "updatedAt": "2024-05-22T05:55:40.974Z",
        "User": {
            "id": 2,
            "email": "graham@email.com",
            "username": "graham",
            "createdAt": "2024-05-22T05:55:40.786Z",
            "updatedAt": "2024-05-22T05:55:40.786Z"
        }
    },
]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthenticated!"
}
```

### 6. GET /profile/:username

#### Description:

Get info of profile based on username

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "username": "string"
}
```

#### Response (200 - OK)

```json
[
  {
    "id": 1,
    "UserId": 1,
    "fullname": "Alexander Duterte",
    "profileImageUrl": "https://media.vanityfair.com/photos/6258742267f4b24bbe87221a/3:2/w_1788,h_1192,c_limit/alexander-skarsgard-2022-portrait-lede.png",
    "bio": "Hello, My Friend !",
    "createdAt": "2024-05-22T05:55:40.974Z",
    "updatedAt": "2024-05-22T05:55:40.974Z"
  }
]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthenticated!"
}
```

### 7. POST /profile

#### Description:

Create new profile for new user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- Body

```json

  {
    "profileImgUrl": "string",
    "fullName": "string",
    "bio": "string",
  },

```

#### Response (200 - OK)

```json
[{ "message": "Profile created Succesfully." }]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthenticated!"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Validation error"
}
```
### 8. GET /:username/message

#### Description:

Get chat messages between two user (the currently logged one) and other user based on username

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "username": "string"
}
```

#### Response (200 - OK)

```json
    {
        "id": 5,
        "SenderId": 5,
        "ReceiverId": 1,
        "text": "from menyala to alexander",
        "createdAt": "2024-05-22T06:01:33.657Z",
        "updatedAt": "2024-05-22T06:01:33.657Z",
        "Sender": {
            "username": "menyala",
            "Profile": {
                "profileImageUrl": null,
                "fullname": null
            }
        },
        "messageBelongsToLoggedUser": true
    },
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthenticated!"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "User not found."
}
```

### 9. POST /:username/message

#### Description:

Send a private message between a user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "text": "string"
}
```

- params:

```json
{
  "username": "string"
}
```

#### Response (200 - OK)

```json
{
  "id": 5,
  "text": "from menyala to alexander",
  "SenderId": 5,
  "ReceiverId": 1,
  "updatedAt": "2024-05-22T06:01:33.657Z",
  "createdAt": "2024-05-22T06:01:33.657Z"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthenticated!"
}
```