# Node Js Web app with express and mysql 
### folder structure for the firebase functions and hosting.
# (Mysql + Express js + Node js)

**version 1.0.0**

its a api service .Its using mysql database , express js and node js and firebase hosting.

## end points

### 1: db operation (create databse, create table)
##### 1.1: op: create db method: GET url: http://localhost:2727/api/db/createdb
##### 1.2: op: create table method: GET url: http://localhost:2727/api/db/table/[your table name]

### 2: crud operation (create ,read, update,delete)
##### 2.1: op: create : POST url: http://localhost:2727/api/v1/post/:table
##### 2.2: op: update : PUT url: http://localhost:2727/api/v1/put/:table/:id
##### 2.2: op: get all row : GET url: http://localhost:2727/api/v1//get/:table
##### 2.2: op: get single row : GET url: http://localhost:2727/api/v1//get/:table/:id

### 3: auth operation(user login,registration)
##### 3.1: op: Register : POST url: http://localhost:2727/api/user/post/
##### 3.2: op: login : POST url: http://localhost:2727/api/user/post/login

## how to use

### setp 1: clone the repository 
### setp 2: run : npm install (to install all the packages required)
### step 3: rename .env copy file to .env and fill up your information
### step 4: use as your requirement
### step 5: run : npm start (by default it will run on http://localhost:2727/)


# ok now you are good to go....

---
## Author
Md jahidul Islam\
IUBAT-CSE\
https://milon27.web.app/
