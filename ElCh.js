//==================================================
// custom Func

// 임시
document.getElementById("click1").addEventListener("click", function(){
    InfoShowOn();
},false)

// 충전소 정보 업데이트
function UpdateInfo(){

}
// 충전소 정보 인터페이스 스윕
function InfoShowOn(){
    document.getElementById("info").style.width = "38vw";
    // document.getElementById("info").style.border = "0.5vw solid blueviolet";
    document.getElementById("map").style.width = "62vw";
}
function InfoShowOff(){
    document.getElementById("info").style.width = "0vw";
    // document.getElementById("info").style.border = "";
    document.getElementById("map").style.width = "100vw";
}
// 충전소 정보 인터페이스 닫기 이벤트
document.getElementById("close").addEventListener("click", function(){
    InfoShowOff();
},false)



//==================================================
// map Func

//지도생성
var mapContainer = document.getElementById('map'), // 지도의 중심좌표
    mapOption = { 
        center: new kakao.maps.LatLng(33.451475, 126.570528), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    }; 
var map = new kakao.maps.Map(mapContainer, mapOption);// 지도를 생성합니다

//현재위치
navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도

    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다
    pointMarker(locPosition, message);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
});

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function pointMarker(locPosition, message) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, 
        position: locPosition
    }); 

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable,
        maxWidth: 140,
        backgroundColor: "#eee",
        borderColor: "#2db400",
        borderWidth: 5,
        anchorSize: new kakao.maps.Size(30, 30),
        anchorSkew: true,
        anchorColor: "#eee",
        pixelOffset: new kakao.maps.Point(20, -20)
    });

    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);

}

// 마커를 표시할 위치와 title 객체 배열입니다 
var positions = [
    {
        title: '도서관 충전소', 
        latlng: new kakao.maps.LatLng(36.145980, 128.394388)
    },
    {
        title: '주차장 충전소', 
        latlng: new kakao.maps.LatLng(36.142434, 128.394081)
    },
    {
        title: '본관 충전소',
        latlng: new kakao.maps.LatLng(36.145122, 128.393061)
    },
    {
        title: '디관 충전소', 
        latlng: new kakao.maps.LatLng(36.145346, 128.392459)
    }
];

//디스플레이 제어함수
function updateDisplay(){
    //디스플레이 제거하는 구문

    //디스플레이 하는 구문
    for(let i=0; i < positions.length; i++){
        var data = positions[i];
        displayMarker(data);
    }
}

window.addEventListener('load', function() {
    updateDisplay();
});

// 지도에 마커를 표시하는 함수입니다    
function displayMarker(data) { 
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    //마커 이미지 크기 표시
    var imageSize = new kakao.maps.Size(24, 35);
    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    var marker = new kakao.maps.Marker({
        map: map,
        position: data.latlng,
        image : markerImage // 마커 이미지 
    });
    var overlay = new kakao.maps.CustomOverlay({
        yAnchor: 3,
        position: marker.getPosition()
    });
    
    var content = document.createElement('div');
    content.onclick = function(){
        InfoShowOn();
    }
    content.innerHTML =  data.title;
    content.style.cssText = 'background: white; border: 1px solid black';
    
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '닫기';
    closeBtn.onclick = function () {
        overlay.setMap(null);
    };
    content.appendChild(closeBtn);
    overlay.setContent(content);

    kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(map);
    });
}

var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            카카오 스페이스닷원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

//==================================================

//거래 계산 함수
//현위치, 마커들 거리 위치 차이 계산
click2.addEventListener("click",function(){
    sortByDistace()//가까운순 거리별 솔트
    //포인트마커표시

    //포인트마커제거
    
    //디스플레이제거
    
    //5순위 디스플레이 표시

},false)

function sortByDistace(){

    //현재위치 받아오기
    navigator.geolocation.getCurrentPosition(succes)
    console.log("가까운거리순서배열정리")
}


function succes(position){
    var mylat = position.coords.latitude, // 위도
        mylon = position.coords.longitude; // 경도

    var mylocPosition = new kakao.maps.LatLng(mylat, mylon)

    //거리별 솔트 
    positions.sort((a,b)=>(distanceFirst(mylocPosition,a)) - distanceFirst(mylocPosition,b))
}

function distanceFirst(mylocPosition,a){
        var polygon1 = new kakao.maps.Polygon({
            path: [
            ]
        });
    //path배열 추가
    var path = polygon1.getPath();
    // 좌표 배열에 클릭한 위치를 추가합니다
    path.push(mylocPosition);
    path.push(a.latlng);
    polygon1.setPath(path);

    var distance = Math.round(polygon1.getLength()) // 선의 총 거리를 계산합니다
    return distance
}

click3.addEventListener("click",function(){
    //빈칸우선순위
    //포인트마커표시

    //포인트마커제거
    
    //디스플레이제거
    
    //5순위 디스플레이 표시
},false)

click4.addEventListener("click",function(){
    sortByDistace()//가격 우선 순위
    //포인트마커표시

    //포인트마커제거
    
    //디스플레이제거
    
    //5순위 디스플레이 표시
},false)

click5.addEventListener("click",function(){
    sortByDistace()//고속 우선
    //포인트마커표시

    //포인트마커제거
    
    //디스플레이제거
    
    //5순위 디스플레이 표시
},false)

//마커 전부 표시
//마커 클러스터 적용

