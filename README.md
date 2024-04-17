# Setup Instructions

### 1. Install Node.js
Node.js can be downloaded from the official website: [https://nodejs.org/](https://nodejs.org/).

### 2. Open the Terminal
Open the terminal in the project folder

### 3. Install Dependencies
Run the following command in the terminal to install the packages listed in `package.json`:

```bash
npm install
```

# Running the website
## 1. After setup, run the following command in the terminal:
```bash
node server.js
```

## 2. Open 'http://localhost:8080/' in a browser to acess the website

## 3. Open 'http://localhost:8080/contacts-monitor' to acess the ***firebase admin page***

*Implementation details
**Backend:
The backend was built with the Express.js framework, which was used to implement the routes to the pages and provide access to additional files.
**Frontend:
The structure of the pages was created using EJS templating. The website was divided into partials (header and footer), which are displayed on every page, and views (index, about, contact) that are directed by the routes upon clicking.
**Additional Libraries:
    Typed.js: Used for animating text on the homepage.
    AOS (Animate On Scroll): Triggers fade animations on scroll.
    PureCounter: Animates the counting on the about page.
**Bootstrap Components:
Bootstrap was utilized for its responsive features and embedded quick CSS classes for rapid styling.
