# meetups-organizer-app

> Meetup organizing app with Vue + Vuetify + Firebase

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

Firebase project details:
https://console.firebase.google.com/u/1/project/meetupsorganizer-7d7d7/ml

Deploy:
To publish to firebase hosting do the following:

1. Install firebase cli: `npm install -g firebase-tools`
2. Once its installed - sign in: `firebase login`
3. Initate a project:
  a. Created new folder and go into it: `mkdir deploy; cd deploy`
  b. Run: `firebase init`
  c. Followed the instructions from there:
    - select the firebase project
    - when you asked what folder you want to deploy (default its 'public') - use it

  Once everything is finished you might see folder and files:
  -functions (if checked)
  -public
  .firebaserc
  database.rules.json (if checked)
  firebase.json

4. Copy all of them except public folder into the meetup project
5. Edit firebase.json file to contain: `hosting:{ public: "dist" }` (public->dist)
6. Run on the meetup project: `npm run build`
7. Once 6 is done, publish the project to firebase by running: `firebase deploy`
