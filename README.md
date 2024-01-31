# Sample project

Application 1: Web application (single page UI) with one input field, one
output field and one Icon named ‘status’ that changes according to the system
status.

Application 2: Web Server that receives messages/requests from Application 1


Workflow:
1/ When both applications start, the status icon on App1 should be ‘idle’.

2/ Then (e.g. after 5 seconds), App1 sends a greeting message to App2 informing that
is in ready state. On OK response of App2 to the greeting, the status icon on App1 is
'online'.

3/ When the status is online, the user can introduce text on App1 input field. This text
is then received in App2 and printed on the console.

4/ The App2 during its online time sends a timestamp message with the format
YYYY-MM DDTHH:MM:SS every 3 seconds which is printed in the output field on App 1.

5/ The App2 should exit after sending 10 timestamp messages to App1 or after
receiving 40 characters as a sum of all characters received from App1. On exit,
App1 icon is ‘finished’.

--------------------------------------------------------------------------------------------------------------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




6/ On workflow point 4, the timestamp message to be sent from App2 to App1 should also contain the input received from App1 until, then but in reverse order: YYYY-MM DDTHH:MM:SS + [reverse input messages]

Techstack:
Angular, C#, .NET Core Web API, SignalR
