AngularJS Base Application Boilerplate
======================================

A Powerful boilerplate for AngularJS applications, created for easily start new projects.

Prepared for REST API, front-end powered by Bootstrap Sass and it's fully automated with Grunt.

- - -

Requirements
------------

Before start, verify if all the requirements listed in [dependencies.md](docs/markdown/install/dependencies.md) are met.


Installing
----------

This application uses [npm](https://www.npmjs.com/) for installing
[Bower](http://bower.io/) and [Grunt](http://gruntjs.com/) with it's extensions.
I use Bower for dependency management for the application like Angular and
Bootstrap, and Grunt for automation some tasks, like compiling the application
itself.

To install all the development dependencies, run:

    npm install

This will isntall Bower, Grunt and it's extensions locally.

With Bower already installed, for download the application dependencies, run:

    bower install

And then, to compile the application in production environment, run `grunt build-prod`
or just:

    grunt build

After the build, the whole application will be at `/dist` folder.


Development
-----------

While developing, it will occur the need to update the compiled files in `/dist`.
Or just update the styles and then recompile Sass, or adding new svg icons.

To avoid running Grunt again after every change in the source, there's the `dev`
task, that after detect some changes in the folder or the code, recompiles that
part again. To use, just open the terminal and run:

    grunt dev

If you just need to build the app in development environment, run `grunt build-dev`

In this build, it will be used all the constants from the dev environment.


Documentation
-------------

All the docs for this boilerplate will be contained in `/docs` folder.
