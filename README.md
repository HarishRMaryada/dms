# dms

## Installation

Use the package manager [node](https://github.com/nodejs/node).

```bash
git clone https://github.com/HarishRMaryada/dms.git
cd dev_test/
npm install
```
Inside that directory, project structure is as.,

```
dms
├── config 
├── src
    ├──controllers
       ├──v1
       | documents
       | users
       |
       ├──v2
       |
       | index.js      
    ├── middleware
       ├──error
       ├──success
       ├──auth
       ├──tryCatch.js
    ├── models
       ├──documents
       ├──users
    ├── utils
       ├──initdb.js
    ├── app.js
├── index.js 
├── .gitignore
└── README.md

```

## Usage

If running in machine without docker update src/config/default mongo.host:localhost 

```node
node .
```

## Docker scripts

```
docker-compose up
docker-compose down
```
## environment variables
```
jwtPrivateKey
```
## documentation url
https://documenter.getpostman.com/view/12189737/T1Ds9bRY?version=latest

## endpoints
```
Post - /api/v1/users/signup - creates user
Post - /api/v1/users/token  - user login
Post - /api/v1/documents - create folder
Get - /api/v1/documents - get list of folders and files
Post - /api/v1/documents/:id/files - insert file into folder with folder id
Post - /api/v1/documents/files - insert file into root folder
Get - /api/v1/documents/:fromId/to/:toId - move file from one folder to another folder

```

## test credentails/seed user
```
{"email" : "test@test.com", "password": "test"}
{"email" : "user@user.com", "password": "user"}
```



## License
[MIT](https://choosealicense.com/licenses/mit/)