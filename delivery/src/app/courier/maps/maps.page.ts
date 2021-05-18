import { Component, OnInit } from '@angular/core';
declare var kakao;
const places = [
  {
    title: '장소1',
    addr: '서울시 마포구 공덕동 106-23번지'
  },
  {
    title: '장소2',
    addr: '서울시 마포구 동교동 179-27번지'
  },
  {
    title: '장소3',
    addr: '서울시 마포구 마포대로 69'
  },
  {
    title: '장소4',
    addr: '서울시 마포구 도화동 570'
  }
];
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss']
})
export class MapsPage implements OnInit {
  map: any;
  marker: any;
  coords: any;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      // 살짝 딜레이 줘야 화면에 맵에 쪽바로 그려진다.

      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.5421183825596, 126.948522081226), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption);

      var center = map.getCenter();
      console.log(center.getLat()); // 37.542118382559
      console.log(center.getLng()); // 126.57066121198349
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();
      var imageSrc = '../../assets/icon/favicon.png';
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
        offset: new kakao.maps.Point(15, 0)
      });

      for (let i = 0; i < places.length; i++) {
        setTimeout(() => {
          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(places[i].addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              console.log(i);
              console.log(coords);
              console.log(result);
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: coords, // 마커를 표시할 위치,
                title: places[i].addr,
                image: markerImage // 마커 이미지
              });
              marker.setMap(map);
              var infowindow = new kakao.maps.InfoWindow({
                map: map,
                zIndex: 4,
                position: coords,
                content: places[i].title,
                removable: false
              });
            }
          });
        }, 1000 * i);
      }
    }, 300);
  } //ng
} //on
