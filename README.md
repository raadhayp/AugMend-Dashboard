Based on the instructions, this was my plan of attack:
Login/Homepage --> use third-party login service (chose Firebase)
Once logged in, have button to go to Form Page
Form Page --> users would fill out form completely, press submit, and information would be sent to my MongoDB Atlas database 
                                                                    (would not have to worry about SQL injection attacks by using NoSQL database management program)

Thus,
in my frontend:
index.html (login page)
styles.css (styling for login page)
app.js (javascript to handle login and firebase authentication)
form.html (form page)
form.css (styling for form page)
form.js (javascript to handle form and form submissions)

in my backend:
server.js (javascript to handle requests from frontend to backend with Express.js, chose Express.js as backend framework for easy routing)
surveryModel.js (the schema for my MongoDB database)