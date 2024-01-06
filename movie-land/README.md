# MovieLand using MongoDB, Express, React and Node

"Welcome to MovieLand, where cinematic dreams come to life! Immerse yourself in a world of entertainment with our vast collection of blockbuster hits, timeless classics, and hidden gems. From heartwarming dramas to pulse-pounding thrillers, we have something for every movie lover. Explore, discover, and bring the magic of the silver screen into your home. Your journey into the world of movies begins here at MovieLand – where every film is a new adventure!"

## Prerequisites

- [create-react-app](https://github.com/facebookincubator/create-react-app)

## Installing

```bash
git clone 'this-repo-url' app-name
cd app-name
npm install
```

## Running The App

The template can be run in development, or in production. For development, use the following workflow.

### Start the React App

```
npm start
```

### Start the Express Server

```bash
cd server
npm start
```

![Imgur](https://i.imgur.com/62fQTfJ.png)

This will start both the frontend and API. Both will be reloaded automatically when you make changes.

### What Is Happening Here?

Create React App and the Express server are running on different processes. This is so that React can still use in memory Webpack to do hot reloads really fast.

All AJAX/fetch requests to `/api` are sent back to the Express server which is serving all `/api` routes from the `routes/index.js` file. This is done via a proxy setup in the `package.json` file.

## Building For Production

In production, you want Express to serve up your app.

### Build React App

```bash
npm build
```

This will build the entire app into the "build" folder. This is the folder that you would deploy to your server. The entrypoint is `server.js`. You can test the production build locally by running...

```bash
npm start
```

Now simply visit the Express app at 'http://localhost:3000' and you will see your app served from the 'build' folder. That's all there is to it!
