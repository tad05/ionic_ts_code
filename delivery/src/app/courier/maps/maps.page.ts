import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Content } from '@angular/compiler/src/render3/r3_ast';
declare var kakao;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss']
})
export class MapsPage implements OnInit {
  map: any;
  marker: any;
  coords: any;
  items?: Item[];
  geocoder: any;
  findID: any;
  phone: any;
  closeButton = false;
  constructor(public itemService: ItemService) {}
  ngOnInit() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.5421183825596, 126.948522081226), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var geocoder = new kakao.maps.services.Geocoder();
    this.renderMap(map, geocoder);
  }

  renderMap(map, geocoder) {
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
      length = this.items.length;
      console.log(Object.keys(items));
    });
    map.relayout();
    setTimeout(() => {
      // 살짝 딜레이 줘야 화면에 맵에 쪽바로 그려진다.
      var center = map.getCenter();
      console.log(center.getLat()); // 37.542118382559
      console.log(center.getLng()); // 126.57066121198349
      // 주소-좌표 변환 객체를 생성합니다
      var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
        offset: new kakao.maps.Point(15, 0)
      });
      for (let i = 0; i < length; i++) {
        setTimeout(() => {
          // 주소로 좌표를 검색합니다
          var name = this.items[i].Name;
          var phone_int = this.items[i].PhoneNumber;
          var address = this.items[i].Address;
          var phone = String(phone_int);
          console.log(name);
          geocoder.addressSearch(this.items[i].Address, function(
            result,
            status
          ) {
            // 정상적으로 검색이 완료됐으면
            console.log('ok');
            if (status === kakao.maps.services.Status.OK) {
              console.log(result);
              var addr = result[0].road_address.address_name;
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              var iwcontent =
                '<div class="customoverlay" style=" position: relative;width: auto;height: auto;background: #ccc;padding: 15px 10px;">' +
                '<div class="title" style=" overflow: hidden;color: #fff;font-size: 16px;font-weight: bold;background: url("../../../assets/icon/png") no-repeat right 20px center;margin-bottom: 8px;">' +
                addr +
                '</div>' +
                '</div>';
              var l_box = document.createElement('div');
              var new_con = '<div> 이름:' + l_box + '</div>';
              var how_con = new_con + l_box;

              /*
              var l_box = document.createElement('div');
              var s_box = document.createElement('div');
              l_box.className = 'l_box';
              s_box.className = 's_box';*/
              var closeBtn = document.createElement('div');
              closeBtn.className = 'close';
              closeBtn.innerHTML = 'x';
              closeBtn.setAttribute(
                'src',
                '../../../assets/icon/overlay_close.png'
              );
              console.log(closeBtn);
              closeBtn.onclick = function closeOverlay() {};
              /*var content_ul = document.createElement('ul');
              content_ul.className = 'c_ul';
              var li_add = document.createElement('li');
              var li_name = document.createElement('li');
              var li_phone = document.createElement('li');
              li_add.className = 'li_add';
              li_name.className = 'li_name';
              li_phone.className = 'li_phone';
              var content_span1 = document.createElement('span');
              var content_span2 = document.createElement('span');
              var content_span3 = document.createElement('span');
              content_span1.textContent = '주소:' + addr;
              content_span2.textContent = '이름:' + name;
              content_span3.textContent = '번호:' + phone;
              content_span1.className = 'c_span';
              content_span2.className = 'c_span';
              content_span3.className = 'c_span';
              li_add.append(content_span1);
              li_name.append(content_span2);
              li_phone.append(content_span3);
              l_box.appendChild(s_box).appendChild(closeBtn);
              s_box.appendChild(content_ul);
              content_ul.appendChild(li_add);
              li_add.after(li_name);
              li_name.after(li_phone);
              document.body.after(l_box);
              var contents = l_box;
              console.log(contents);
              */
              var moreContent =
                '<div class="info" style="width: auto;height:auto;overflow:hidden;border-radius: 5px;border-bottom: 2px solid #fff;border-right: 1px solid #fff;overflow: hidden;background: #fff;">' +
                '<div class="desc" style="position: relative;margin: 3px 10px 0 3px;">' +
                closeBtn +
                '<ul style="width:auto; height:auto;overflow:hidden;margin:0;padding:0;">' +
                '<li style="position:relative;background:#ccc;margin-bottom:2px;margin-right:3px;line-height: 1;padding:5px 10px;>' +
                '<span style="display:inline-block;">주소 :' +
                address +
                '</li>' +
                '<li style="position:relative;background:#ccc;margin-bottom:2px;margin-right:3px;line-height: 1;padding:5px 10px;>' +
                '<span style="display:inline-block;">이름 :' +
                name +
                '</li>' +
                '<li style="position:relative;background:#ccc;margin-bottom:2px;margin-right:3px;line-height: 1;padding:5px 10px;>' +
                '<span style="display:inline-block;">번호 :' +
                phone +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>';
              var hoo = moreContent + closeBtn;
              var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: coords // 마커를 표시할 위치,
              });
              marker.setMap(map);
              var customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                zIndex: 4,
                position: coords,
                content: iwcontent,
                removable: false,
                xAnchor: 0.5,
                yAnchor: 1.7
              });
              customOverlay.setContent(iwcontent);
              customOverlay.setMap(map);
            }
            kakao.maps.event.addListener(marker, 'click', function() {
              // 마커 위에 인포윈도우를 표시합니다
              var overlay = new kakao.maps.CustomOverlay({
                map: map,
                position: marker.getPosition(),
                xAnchor: -0.5,
                yAnchor: 1.2,
                removable: true
              });
              overlay.setContent(moreContent);
              overlay.setMap(map);
              //console.log('ok');
            });
            function closeOverlay() {
              console.log('remove');
              this.overlay.setMap(null);
            }
          });
        }, 1000 * i);
      }
    }, 300);
  } //renderMap
  move() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.5421183825596, 126.948522081226), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var geocoder = new kakao.maps.services.Geocoder();
    var findID = this.findID;
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
      length = this.items.length;
    });
    var search_result = this.items.find(value => value.Name === findID);
    console.log(search_result.Address);
    // 이동할 위도 경도 위치를 생성합니다
    geocoder.addressSearch(search_result.Address, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log('들어옴');
        var moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(moveLatLon);
      }
    });
    this.renderMap(map, geocoder);
  }
} //on
