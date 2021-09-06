A- Groupomania
7th project in Openclassrooms junior webdeveloper course.

Project's goal was to create a social meda application for a company.
A choice had to be made between to features. Here the 9gag-like feature has been chosen.

B- Features:
Users will be able to create an account with their company email, share gifs, comment it.
They also can delete their own gifs or comments.
They will have the possibility to update their profile's avatar. They can suppress their account at will.
Admins can modify or delete member accounts, gifs or comments depending on the rules decided with the company.
Admins can also set other membres as Admins.

C- How to run the project:

Pre-requisites: Node.JS

    1° Clone this repository
    2° In terminal, place yourself in the backend folder and:
        - run "npm install"
        - create folder "images"
        - create folder "gifs"
        - then run "nodemon server"

    Server will run on port: 3001


    3° Then, go to frontend folder in terminal, and:
        - run "npm install"
        - run " npm run dev" after going in the folder: "frontend/my-vue-app"

    Server will run on localhost:3000

    4° To set database :

    Download and install MAMP: https://www.mamp.info/fr/mamp/windows/
    Then in terminal run:

        - /Applications/MAMP/Library/bin/mysql -u root -p 

    in backend folder, run:
    
        - npm install --save sequelize 
        - npm install mysql2

        - sequelize db:create
        - sequelize db:migrate

    5° You are ready to use the application.
