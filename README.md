# Setup and Installation (Windows)
1. Install node.js server 
  - Download node.js from https://nodejs.org/en/
  - Run the installer (.msi) file
  - Save the node setup to appropriate directory
2. Install Mysql datbase 
  - Download mysql installer from https://dev.mysql.com/downloads/installer
  - Select installer for appropriate version of windows
3. Import  database
  - From mysql workbench, Server-> Data Import
  - Import 'Databse/kqed_data.sql' to populate datbase
4. Change databse credentials username,password in 'Back-End/db_connection.js'.

#How to run the Application:
1. To start sever : go to directory where app.js exists
and run command : node app.js
2. To load webpage enter url: localhost:3000/index.html

#Current Application is available at :
http://ec2-54-244-109-55.us-west-2.compute.amazonaws.com:3000/index.html

#detailed information is available in README.pdf
