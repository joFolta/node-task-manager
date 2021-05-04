# Node Task Manager App

https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13729122

## Setup

1. - Download MongoDB Community Server (https://www.mongodb.com/try/download/community), unzip, rename to `mongodb` and move to your <USER> directory
   - Also, create `mongodb-data` folder in your <USER> directory
   - `cd ~` (go to your root directory)
   - `pwd`
   - Start local database with: `/Users/<USER>/mongodb/bin/mongod --dbpath=/Users/<USER>/mongodb-data`
   - (newer Macs may need to right click open `mongod` first to accept security risks before the above command will work)

1. - Download Robo 3T (https://robomongo.org/), unzip, run robo3tXXXXX.dmg file, drag Robo 3T to applications folder
   - Create Connection on the default localhost:27017 (click Test to confirm connection)
   - Connect

1. - `npm install`
   - `npm run dev`

1. - Perform CRUD operations on localhost:3000 via Postman
