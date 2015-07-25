Weather app notes
=================

## General flow of app

1. Initializes with a fair default location (Vilnius, London or the like).
2. Requests the location of the device.
3. If device provides location data immediately, make the API call for this location, otherwise make the API call for any location.
4. Wait for response from the server. If response is received - continue, otherwise bring up a popup message, that informs the user of an API failure.
5. Populate the current weather information.
6. Populate the default forecast.

## Components

### Views

* **Index** - the main view that ties everything together.

### Controllers

* **Prefferences controller** - controls the page elements that modify the settings and options of the application. This can include:
	* Units (metric/imperial and that sort of stuff)
	* Favorite cities (may need to be moved to a new one)
	* Geek mode (whether more data should be provided)

* **Single city (or otherwise location) controller** - controls the page elements that provide information about the current location.

* **Search menu** - searches for a city

### Services

* **Api Key** (value) - stores the opeanweathermap.org api key
* **Timezone Api Key** (value) - stores the geonames api key
* **Prefferences**
* **Units**

### Filters

* **Temperature** - presents temperatures in a nice and structured way.

### Directives

None available as of this moment.

### Comming up:

1. Additional forecast options

1. Graphs (cause graphs are great and can be made with d3)

1. A good design