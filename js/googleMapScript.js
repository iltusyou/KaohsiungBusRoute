var busRouteApi = 'http://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City/Kaohsiung?$format=json'; //公車路線
var busSstopApi = 'http://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Kaohsiung?$format=json'; //公車站牌

//地圖初始化
function initMap() {
    var kaohsiungStation = { lat: 22.6380367279053, lng: 120.301826477051 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: kaohsiungStation
    });
}

//顯示地圖
function showMap() {
    clearMap();
    var busStopShowList = $.grep(busStopList, function (e) { return e.show == true });
    $.each(busStopShowList, function (index, value) {
        $.each(value.markerList, function (i, marker) {
            marker.setMap(map);
        });
    });
    var busRouteShowList = $.grep(busRouteList, function (e) { return e.show == true });
    $.each(busRouteShowList, function (index, value) {
        var polyline = value.polyline;
        polyline.setMap(map);
    });

}

//重設地圖
function clearMap() {
    $.each(busStopList, function (index, value) {
        $.each(value.markerList, function (i, marker) {
            marker.setMap(null);
        });
    });
    $.each(busRouteList, function (index, value) {
        var polyline = value.polyline;
        polyline.setMap(null);
    });
}

//取得公車路線
function getBusRoute() {
    return $.getJSON(busRouteApi, function (data) {
        return data;
    });
}

//取得公車站牌
function getBusStop() {
    return $.getJSON(busSstopApi, function (data) {
        return data;
    });
}