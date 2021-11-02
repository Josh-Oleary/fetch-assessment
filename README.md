# fetch-assessment
NodeJS transaction microservice
This project is a tech assessment for Fetch Rewards. It was built using Node and Express. 

# Install
Download zip file to computer. Extract folder into desired location. Open up the project in your local editor. Open up command line and run `npm install`.

# Run
Once dependencies are installed, type `node index.js` to run application. To test application open up Postman and use the following endpoints.

Add Transaction - localhost:3000/addTransaction
                  keys: payer (string)- name of payer
                        points (integer)- amount of points spent
                        
Spend Points - localhost:3000/spend
               keys: spend (integer)- amount of points spent

Balance - localhost:3000/balance

If you prefer to use the UI to test the application, keep in mind that you will have to use the broswers back button to navigate the site as the routes render data instead of an HTML page. The application works to add transactions, view all transactions, spend points, and get balance. 
