let markers = [];
let markersMap = {}; // 마커 참조를 저장할 객체

function fetchAndDisplayData(region, clickedButton) {
  console.log("fetchAndDisplayData called with region: " + region);
  fetch("/대학정보.json")
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("All data:", jsonData);

      let filteredData = jsonData.filter((item) => {
        let regionValue = (item.지역 || "").trim().toLowerCase();
        return regionValue === region.toLowerCase();
      });

      console.log("Filtered data:", filteredData);
      displayMarkers(filteredData);
      createUniversityButtons(filteredData, clickedButton);
    })
    .catch((error) => console.error("Error fetching JSON file:", error));
}

function createUniversityButtons(data, clickedButton) {
  // 기존 대학명 버튼 컨테이너 제거
  let existingContainer = document.querySelector(
    ".university-buttons-container"
  );
  if (existingContainer) {
    existingContainer.remove();
  }

  // 새로운 대학명 버튼 컨테이너 생성
  let buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("university-buttons-container");

  data.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.대학명;
    button.onclick = () => focusOnMarker(item);
    buttonsContainer.appendChild(button);
  });

  // 클릭된 버튼의 바로 다음 위치에 새 컨테이너 삽입
  clickedButton.insertAdjacentElement("afterend", buttonsContainer);
}

function focusOnMarker(item) {
  const latLng = new google.maps.LatLng(
    parseFloat(item.위도),
    parseFloat(item.경도)
  );
  map.setCenter(latLng);
  map.setZoom(12);
}

// 지역 버튼의 onclick 이벤트 수정
// 예시: <button onclick="fetchAndDisplayData('경기', this)">경기</button>

// 지도에 마커를 표시하는 함수
function displayMarkers(data) {
  clearMarkers();
  markersMap = {}; // 마커 참조를 리셋

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
