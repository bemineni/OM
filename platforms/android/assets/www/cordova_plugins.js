cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins\\org.apache.cordova.core.device\\www\\device.js",
        "id": "org.apache.cordova.core.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.network-information\\www\\network.js",
        "id": "org.apache.cordova.core.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.network-information\\www\\Connection.js",
        "id": "org.apache.cordova.core.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.geolocation\\www\\Coordinates.js",
        "id": "org.apache.cordova.core.geolocation.Coordinates",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.geolocation\\www\\PositionError.js",
        "id": "org.apache.cordova.core.geolocation.PositionError",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.geolocation\\www\\Position.js",
        "id": "org.apache.cordova.core.geolocation.Position",
        "clobbers": [
            "Position"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.geolocation\\www\\geolocation.js",
        "id": "org.apache.cordova.core.geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.battery-status\\www\\battery.js",
        "id": "org.apache.cordova.core.battery-status.battery",
        "clobbers": [
            "navigator.battery"
        ]
    }
]
});