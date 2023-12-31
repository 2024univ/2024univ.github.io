let markers = [];

function fetchAndDisplayData(region) {
  console.log("fetchAndDisplayData called with region: " + region); // 디버깅 로그
  fetch(
    "http://127.0.0.1:5500/univ_map/대학정보.json?timestamp=" +
      new Date().getTime()
  )
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("All data:", jsonData); // 전체 데이터 출력

      // 데이터 필터링
      let filteredData = jsonData.filter((item) => {
        let regionValue = (item.지역 || "").trim().toLowerCase();
        return regionValue === region.toLowerCase();
      });

      console.log("Filtered data:", filteredData); // 필터링된 데이터 출력
      displayMarkers(filteredData);
    })
    .catch((error) => console.error("Error fetching JSON file:", error));
}

// 지도에 마커를 표시하는 함수
function displayMarkers(data) {
  clearMarkers();

  if (data.length > 0) {
    let totalLat = 0;
    let totalLng = 0;

    data.forEach(function (item) {
      let lat = parseFloat(item.위도);
      let lng = parseFloat(item.경도);

      totalLat += lat;
      totalLng += lng;

      let marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: item.대학명,
      });

      marker.addListener("click", function () {
        alert(item.대학명 + " (" + item["캠퍼스 구분"] + ")");
      });

      markers.push(marker);
    });

    // 평균 위도와 경도 계산
    let avgLat = totalLat / data.length;
    let avgLng = totalLng / data.length;

    // 지도의 중심을 평균 위치로 이동
    map.setCenter({ lat: avgLat, lng: avgLng });
  }
}

// 마커를 지우는 함수
function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

// 초기화 함수
initMap();
