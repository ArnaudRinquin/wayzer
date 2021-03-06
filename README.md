# Wayzer

##Yet another (AngularJS) weather app

[ ![Codeship Status for ArnaudRinquin/wayzer](https://www.codeship.io/projects/7ae36440-ae06-0132-b077-526b9a410e37/status)](https://www.codeship.io/projects/68768)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/ArnaudRinquin/wayzer)

Try me on [Heroku](https://wayzer.herokuapp.com/)

---

### Install

```
git clone git@github.com:ArnaudRinquin/wayzer.git
cd weazer
npm install
```

### Build

```
npm run client:build
```

### Serve

```
npm run server:start
```

### Test

```
npm run test:unit
npm run test:e2e
```

### Dev

In separate shells
```
npm run client:dev
npm run server:dev
npm run test:unit:dev
```

## How it's built

### Stack

Client

* AngularJS
  * ui-router
* leaflet
* browserify (+ watchify)

Server

* express
  * static file serving
  * proxy to OpenWeather HTTP API

### Flow chart

![App flow chart](/docs/flowchart.png)
