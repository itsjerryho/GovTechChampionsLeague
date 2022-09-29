# GovTechChampionsLeague

## Background
This project was developed as part of GovTech's GDS ACE Tech Assessment, over a span of two evenings. The User Interface isn't the best at the moment, but the main requirements were met.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
- Have Node installed
  - To install Node, go to https://nodejs.org/en/

## To run this project
1. Open 2 terminals, one for client (frontend) and one for server.
2. For the **first terminal**, navigate to `server/` folder.
    - Run `npm install` to install the relevant packages.
    - Obtain the `password` from owner and edit the `config.env` file located in `server/config.env`
    - Replace `admin:<password>` with the actual password 
    - Once done, run `node server.js`
    - You should be able to see `Server is running on port: 5000`
3. For the **second terminal**, navigate to `client/` folder
    - Run `npm install` to install the relevant packages.
    - Once done, run `npm start`
    - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Assumptions made for this project
- For simplicity, I have assumed that the 12 teams competing in this football championship have *distinct names*.
- Due to time constraints, I have also assumed that the input provided for `Team Information` and `Match Results` are correct and are given in the form as shown in the test cases.

## Tech Stack Used
- MongoDB
- Express
- React
- Nodejs
