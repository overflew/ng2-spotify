# Building an Angular 2 app

## Project setup

After doing some research I discovered that there are quite a few ways to get started with an Angular 2 project. In the 
list below you'll find some of the available options:
* The [Quickstart](https://angular.io/docs/ts/latest/quickstart.html) example at [angular.io](https://angular.io/) will 
give you a setup using [SystemJS](https://github.com/systemjs/systemjs).
* The [Webpack: An introduction](https://angular.io/docs/ts/latest/guide/webpack.html) guide at [angular.io](https://angular.io/)
will get you setup using the [Webpack module bundler](https://webpack.github.io/).
* [Angular CLI](https://cli.angular.io/) will enable a powerful command-line tool that allows you to generate, test and 
build your project using a set of simple commands.
* Googling "Angular 2 starter" will also give you a bunch of projects with an starter pack that will allow you to get 
started immediately.

After experimenting a bit with the first three options I've found that using Webpack gave me the most mature and elegant
 solution while leaving me in control of the build process. Webpack also feels a little more familiar than SystemJS when
used to working with grunt and gulp scripts. Angular CLI also seems like a nice solution that takes away most of the 
pain of setting up a new project. At the time of writing however Angular CLI doesn't come with the latest version of 
Angular 2 and also sets up the project using SystemJS.

To get a good feeling of the several ways to setup your project I suggest you just try all of the solutions. For this
tutorial however we'll stick with Webpack.

To get started you can follow allong with the [Webpack: An introduction](https://angular.io/docs/ts/latest/guide/webpack.html)
guide at [angular.io](https://angular.io/) or you can just checkout the following branch: TODO

Run `npm install` from the root of the project after you've got the files in place. This will do 2 things:
* Install all dependencies defined in `package.json`
* Install the typescript definition files using the `typings install` command as defined in the `postinstall` script in
`package.json`
