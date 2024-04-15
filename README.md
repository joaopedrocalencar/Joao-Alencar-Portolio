Setup
1. Install Node.js in the computer. It can be downloaded from https://nodejs.org/.
2. Open the terminal in the project folder
3. Run "npm install" to install the packages listed in 'package.json'.

Running the website
1.After setup, run in the terminal 'node server.js'
2.Open 'http://localhost:8080/' in a broser to acess the website

Implementation
The backend was built with Express.js framework, which was used to implement the routes to the pages and give acess to adicional files.
The structure of the pages were done with tempating ejs. The website was divided in partials (header and footer), which were shown on every page, and views (index,about,contact) that were directed by the routes upon clicking.
On the frontend, Bootstrap componentes were helpful with it's responsive features and embeded quick css classes implementation.
As aditional libraries, there were used Typed.js for moving text in the home page and purecounter for the counting, animated on scroll (AOS) for triggering fade on scroll and PureCounter to animate the counting on the about page.
