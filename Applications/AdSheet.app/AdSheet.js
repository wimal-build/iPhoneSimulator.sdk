function MapRect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

function MapRegion(lat, lon, latDelta, lonDelta) {
    this.latitude = lat;
    this.longitude = lon;
    this.latitudeDelta = latDelta;
    this.longitudeDelta = lonDelta;
    this.prototype.toString = function() {
        return "{("+latitude+", "+longitude+"), ("+latitudeDelta+", "+longitudeDelta+")}";
    }
}

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
    this.setCenterOffset = function(x, y) {
        this.xOffset = x;
        this.yOffset = y;
    };
}
