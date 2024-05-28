/**
 * @property {Integer} x x-coordinate for the map origin
 * @property {Integer} y y-coordinate for the map origin
 * @property {Integer} w width of the map rect
 * @property {Integer} h height of the map rect
 * @class
 * @name MapRect
 */
function MapRect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

/**
 * @property {Double} lat latitude of the center of the map region
 * @property {Double} lon longitude of the center of the map region
 * @property {Double} latDelta latitude span of the map region
 * @property {Double} lonDelta longitude span of the map region
 * @class
 * @name MapRegion
 */
function MapRegion(lat, lon, latDelta, lonDelta) {
    this.latitude = lat;
    this.longitude = lon;
    this.latitudeDelta = latDelta;
    this.longitudeDelta = lonDelta;
}

MapRegion.prototype.toString = function() {
    return "{("+this.latitude+", "+this.longitude+"), ("+this.latitudeDelta+", "+this.longitudeDelta+")}";
};

/**
 * @property {Double} latitude latitude of the annotation
 * @property {Double} longitude longitude of the annotation
 * @property {String} title title string shown in the callout for the annotation
 * @property {String} subtitle subtitle string shown in the callout for the annotation
 * @property {String} identifier identifier unique identifier for the annotation
 * @property {ADAnnotationListener} listener listener object
 * @property {String} imageURL URL of image to be used as a custom annotation view
 * @property {Number} xOffset x position offset for custom annotation images
 * @property {Number} yOffset y position offset for custom annotation images
 * @class
 * @name MapAnnotation
 */
function MapAnnotation(latitude, longitude, title, subtitle, identifier, listener, imageURL) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.title = title;
    this.subtitle = subtitle;
    this.identifier = identifier;
    this.listener = listener;
    this.imageURL = imageURL;
    this.xOffset = 0;
    this.yOffset = 0;
}

MapAnnotation.prototype.setCenterOffset = function(x, y) {
    this.xOffset = x;
    this.yOffset = y;
};

/**
 * @property {Double} latitude latitude of the coordinate
 * @property {Double} longitude longitude of the coordinate
 * @class
 * @name MapLocationCoordinate
 */
function MapLocationCoordinate(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
}
