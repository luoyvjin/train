var map, geolocation;
var lng, lat;
//加载地图，调用浏览器定位服务
map = new AMap.Map("container", {
  resizeEnable: true,
});

map.plugin("AMap.Geolocation", function () {
  geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, //是否使用高精度定位，默认:true
    timeout: 10000, //超过10秒后停止定位，默认：无穷大
    maximumAge: 0, //定位结果缓存0毫秒，默认：0
    convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    showButton: true, //显示定位按钮，默认：true
    buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
    buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
    showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
    panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  });

  // ios环境切换到使用远程https定位
  if (AMap.UA.ios && document.location.protocol !== "https:") {
    //使用远程定位，见 remogeo.js
    var remoGeo = new RemoGeoLocation();

    //替换方法
    navigator.geolocation.getCurrentPosition = function () {
      return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
    };

    //替换方法
    navigator.geolocation.watchPosition = function () {
      return remoGeo.watchPosition.apply(remoGeo, arguments);
    };
  }

  map.addControl(geolocation);
  geolocation.getCurrentPosition();
  AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
});
//解析定位结果
function onComplete(data) {
  lng = data.position.getLng();
  lat = data.position.getLat();
  console.log(lng, lat);
  geocoder2();
}

//获取用户所在城市信息
function showCityInfo() {
  //实例化城市查询类
  var citysearch = new AMap.CitySearch();
  console.log(AMap);
  //自动获取用户IP，返回当前城市
  citysearch.getLocalCity(function (status, result) {
    console.log(result);
    if (status === "complete" && result.info === "OK") {
      if (result && result.city && result.bounds) {
        var cityinfo = result.city;
        alert(result.country);
        var citybounds = result.bounds;
        document.getElementById("tip").innerHTML =
          "您当前所在城市：" + result.province + cityinfo;
        //地图显示当前城市
        map.setBounds(citybounds);
      }
    } else {
      document.getElementById("tip").innerHTML = result.info;
    }
  });
}

var MGeocoder;
var key_11;
var key_12;
var key_2;
function geocoder2() {
  //POI搜索，关键字查询
  key_11 = lng;
  key_12 = lat;
  var lnglatXY = new AMap.LngLat(key_11, key_12);
  //document.getElementById('result').innerHTML = "您输入的是：" + key_1;
  //加载地理编码插件
  map.plugin(["AMap.Geocoder"], function () {
    MGeocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: "all",
    });
    //返回地理编码结果
    AMap.event.addListener(MGeocoder, "complete", geocoder_CallBack2);
    //逆地理编码
    MGeocoder.getAddress(lnglatXY);
  });
  //加点
  var marker = new AMap.Marker({
    map: map,
    icon: new AMap.Icon({
      image: "http://api.amap.com/Public/images/js/mark.png",
      size: new AMap.Size(58, 30),
      imageOffset: new AMap.Pixel(-32, -0),
    }),
    position: lnglatXY,
    offset: new AMap.Pixel(-5, -30),
  });
  map.setFitView();
}
function geocoder_CallBack2(data) {
  //回调函数
  var resultStr = "";
  var roadinfo = "";
  var poiinfo = "";
  var address;
  //返回地址描述
  address = data.regeocode.formattedAddress;
  //返回周边道路信息
  roadinfo += "<table style='width:600px'>";
  for (var i = 0; i < data.regeocode.roads.length; i++) {
    var color = i % 2 === 0 ? "#fff" : "#eee";
    roadinfo +=
      "<tr style='background-color:" +
      color +
      "; margin:0; padding:0;'><td>道路：" +
      data.regeocode.roads[i].name +
      "</td><td>方向：" +
      data.regeocode.roads[i].direction +
      "</td><td>距离：" +
      data.regeocode.roads[i].distance +
      "米</td></tr>";
  }
  roadinfo += "</table>";
  //返回周边兴趣点信息
  poiinfo += "<table style='width:600px;cursor:pointer;'>";
  for (var j = 0; j < data.regeocode.pois.length; j++) {
    var color = j % 2 === 0 ? "#fff" : "#eee";
    poiinfo +=
      "<tr οnmοuseοver='onMouseOver(\"" +
      data.regeocode.pois[j].location.toString() +
      "\")' style='background-color:" +
      color +
      "; margin:0; padding:0;'><td>兴趣点：" +
      data.regeocode.pois[j].name +
      "</td><td>类型：" +
      data.regeocode.pois[j].type +
      "</td><td>距离：" +
      data.regeocode.pois[j].distance +
      "米</td></tr>";
  }
  poiinfo += "</table>";
  //返回结果拼接输出
  resultStr =
    '<div style="font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;">' +
    "<b>地址</b>：" +
    address +
    "</div>";
  document.getElementById("result").innerHTML = resultStr;
  console.log(resultStr);
}
var options = {};

map.setZoom(15);
// 同时引入工具条插件，比例尺插件和鹰眼插件
AMap.plugin(
  [
    "AMap.ToolBar",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.MapType",
    "AMap.Geolocation",
  ],
  function () {
    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    map.addControl(new AMap.ToolBar());

    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    map.addControl(new AMap.Scale());

    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    map.addControl(new AMap.Geolocation());
  }
);
AMap.plugin(["AMap.Geolocation"], function () {
  var geolocation = new AMap.Geolocation(options);
  map.addControl(geolocation);
  geolocation.getCurrentPosition();
});
