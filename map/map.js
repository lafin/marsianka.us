/* global ymaps:false, $:false */
var map, placemark, bounds;

function getRandomCoords(min, max) {
    return Math.random() * (max - min) + min;
}

ymaps.ready(function () {
    map = new ymaps.Map('map', {
        center: [0, 0],
        zoom: 6,
        controls: ['zoomControl']
    });
    map.container.fitToViewport();

    ymaps.geocode('Ростов-на-Дону', {
        results: 1
    }).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        bounds = firstGeoObject.properties.get('boundedBy');
        map.setBounds(bounds, {
            checkZoomRange: true
        });
    });
});

$('#point').on('click', function () {
    if (placemark) {
        map.geoObjects.remove(placemark);
    }
    placemark = new ymaps.Placemark([getRandomCoords(bounds[0][0], bounds[1][0]), getRandomCoords(bounds[0][1], bounds[1][1])], {});
    map.geoObjects.add(placemark);
});