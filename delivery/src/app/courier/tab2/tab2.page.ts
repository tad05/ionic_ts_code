
import { Component, OnInit } from '@angular/core';
//import { title } from 'node:process';
declare var kakao;



@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})



export class Tab2Page implements OnInit {
  map: any;
  marker: any;
  // 마커들

  places = [
    {
      title: '카카오',
      latlng: new kakao.maps.LatLng(33.450705, 126.570677)
    },
    {
      title: '생태연못',
      latlng: new kakao.maps.LatLng(33.450936, 126.569477)
    },
    {
      title: '텃밭',
      latlng: new kakao.maps.LatLng(33.450879, 126.56994)
    },
    {
      title: '근린공원',
      latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    }
  ];

  constructor() { }

  ngOnInit() {


    // 살짝 딜레이 줘야 화면에 맵에 쪽바로 그려진다.
    setTimeout(() => {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption);
      var iwPosition = new kakao.maps.LatLng(33.450701, 126.570667);

      var imageSrc = 'assets/icon/favicon.png';
      for (var i = 0; i < this.places.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
          offset: new kakao.maps.Point(15, 0)
        });

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: this.places[i].latlng, // 마커를 표시할 위치,
          title: this.places[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage // 마커 이미지
        });
        var infowindow = new kakao.maps.InfoWindow({
          map: map,
          zIndex: 4,
          position: this.places[i].latlng,
          content: this.places[i].title,
          removable: false
        });
      }
    }, 300);
  }
}
