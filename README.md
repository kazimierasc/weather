Simple weather application
==========================

This repo contains a simple weather app built with Angular.js.

A distribution of this app is available at [kaz.lt/weather](http://kaz.lt/weather).

##Features

1. Uses external APIs to retrieve weather data and timezone data.

1. Allows the user to search by location name.

1. Can find weather information for the current geographic coordinates of the user.

1. Allows the user to select a default location. Allows the user to create a list of bookmarked locations that are saved in a browser cookie.

1. Supports a number of breakpoints, for usability on handheld devices.

##Running the application

In order to build and run the application on the local computer a developer needs to have this setup:

* [node.js](https://nodejs.org/)
* [Grunt CLI](http://gruntjs.com/)
* [Git](https://git-scm.com/)
* [Bower CLI](http://bower.io/)

The following tasks are available:

* **grunt serve** - starts a local server that serves the application.
* **grunt build** - builds a distribution of the application for external hosting.

##Notes

This repository does not include external API keys. To reach the external APIs user accounts are required.
Please put the necessary API keys [Open Weather Map](http://www.openweathermap.com/) to the *app/scripts/services/apikey.js* and [Geonames](http://www.geonames.org/) to the *app/sceipts/services/timezoneapikey.js* files.