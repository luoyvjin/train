let map = new AMap.Map('container');
map.setZoom(15);
map.plugin(['AMap.Scale'],() =>{
    let scale = new AMap.Scale({});
    map.addControl(scale);
}
);

map.plugin('AMap.Geolocation', ()=>{
    let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        convert:true,
        showMarker:true,
        panToLocation:true,
        timeout: 10000
    });

geolocation.getCurrentPosition();
map.addControl(geolocation);
})