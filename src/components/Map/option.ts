import echarts from 'echarts/lib/echarts';

export type ICoord = [number, number];

function createMapStyle() {
    return {
        styleJson: [
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            },
            {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#004981"
                }
            },
            {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            },
            {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981"
                }
            },
            {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1
                }
            },
            {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            },
            {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            },
            {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            },
            {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }
        ]
    };
}

function renderPolygon(coords: ICoord[]) {
    return function renderItem(params, api) {
        var points = [];
        for (var i = 0; i < coords.length; i++) {
            points.push(api.coord(coords[i]));
        }
        var color = api.visual('color');

        return {
            type: 'polygon',
            shape: {
                points
            },
            style: api.style({
                fill: color,
                stroke: color
            })
        };
    }
}

export function createOption(data, polygon) {
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: 'map',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            // mapStyle: createMapStyle()
        },
        series: [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: data,
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    formatter: '{b}',
                    position: 'right'
                },
                itemStyle: {
                    color: '#ddb926'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            {
                type: 'custom',
                coordinateSystem: 'bmap',
                renderItem: renderPolygon(polygon),
                itemStyle: {
                    opacity: 0.5
                },
                animation: false,
                silent: true,
                data: [0],
                z: -10
            }
        ]
    };
    return option;
}