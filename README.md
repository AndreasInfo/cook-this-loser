# Cook this, loser!

The goal was to create a place to store my mom's and grandma's recipies. While creating this app, I made it possible for them to insert the recipies themselves by implementing user accounts with authentification. Furthermore I made it possible to export single recipies as PDFs via a print button.

The current version is published on https://apps.handy-solutions.de/cook-this-loser/dist/index.html#/. It's pretty basic, but it does what it's designed for :).

Some more ideas to improve the app are:

- make the project multilingual
- beautify the main page, e.g. with images
- store the images on the server, not in the db (I know, that was a horrible idea!)
- mark multiple recepies to extract and/or share a combined shopping list
- more ideas are welcome!

Some known bugs are:

- error on refreshing page during editing recipie
- clean up server
- prevent page-break in pdf/switch to better solution?
- improve security

Technically speaking I used Vue.js (https://vuejs.org/) for frontend dev an Express.js (https://expressjs.com/) for backend dev. To ensure responsive design I chose Bulma (https://bulma.io/) and for fancy reasons I even discovered Sass (https://sass-lang.com/) ;).

Personally speaking, I don't have time anymore to contribute to the frontend, but would be more than happy to provide the server maintaining and extending the API (and hopefully db). The backend is no mystery, but right now I can not publish it because of crosslinks with other projects. I am working on seperation...

Feel free to join or ask/suggest/propose!

For liscence check LISCENCE.md.

### Setup for development

- install dependencies: **npm install**
- configure baseURL in .env: **VUE_APP_BASE_URL=http://localhost:5000/api/cook-this-loser/**
- provide local backend: **TODO**
- start Vue-server: **vue-cli-service serve**
