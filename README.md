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
    ├── app.js
├── index.js 
├── .gitignore
└── README.md

```

## Usage

```node
npm start
```
## environment variables
```
jwtPrivateKey
```
## License
[MIT](https://choosealicense.com/licenses/mit/)