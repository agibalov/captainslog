# captainslog

A dummy Spring Boot 1.5.x / Angular 5.x notepad application.

Prerequisites:

* JDK 8
* Node v8.6.0 and NPM v5.5.1

### Development

The development ecosystem relies on [PM2](http://pm2.keymetrics.io/), so before running any of the following commands, please make sure to install the dependencies with `npm i`.

* `./tool start` to launch both the frontend and the backend. The frontend is going to be available at `http://localhost:4200/` and the backend at `http://localhost:8080/`.
* `./tool restart` to restart both the frontend and the backend.
* `./tool restart:fe` to restart the frontend.
* `./tool restart:be` to restart the backend.
* `./tool stop` to stop both the frontend and the backend.
* `./tool logs` to show logs in tail mode.

### Release builds

* There is no script to produce release builds yet.
* To run the app in "release mode", do `./gradlew clean app:run`. The entire app will be available at `http://localhost:8080/`.
