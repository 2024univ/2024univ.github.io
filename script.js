let markers = [];
let markersMap = {}; // 마커 참조를 저장할 객체

function fetchAndDisplayData(region, clickedButton) {
  fetch("https://2024univ.github.io/대학정보.json")
    .then((response) => response.json())
    .then((jsonData) => {
      let filteredData = jsonData.filter((item) => {
        let regionValue = (item.지역 || "").trim().toLowerCase();
        return regionValue === region.toLowerCase();
      });

      displayMarkers(filteredData);
      createUniversityButtons(filteredData, clickedButton);
    })
    .catch((error) => console.error("Error fetching JSON file:", error));
}

function createUniversityButtons(data, clickedButton) {
  let existingContainer = document.querySelector(
    ".university-buttons-container"
  );
  if (existingContainer) {
    existingContainer.remove();
  }

  let buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("university-buttons-container");

  data.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.대학명;
    button.onclick = () => openPopup(item["성적확인용 웹페이지"]);
    button.style.backgroundColor = "#b3d6f7";
    button.style.color = "black";
    buttonsContainer.appendChild(button);
  });

  clickedButton.insertAdjacentElement("afterend", buttonsContainer);
}

function displayMarkers(data) {
  clearMarkers();
  markersMap = {}; // 마커 참조 리셋

  data.forEach(function (item) {
    let lat = parseFloat(item.위도);
    let lng = parseFloat(item.경도);

    let marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      title: item.대학명,
    });

    marker.addListener("click", function () {
      openPopup(item["성적확인용 웹페이지"]);
    });

    markers.push(marker);
  });

  // 지도 중심 재조정 코드 (필요한 경우 추가)
}

function openPopup(url) {
  const popupWidth = 800;
  const popupHeight = 600;
  const windowLeft = window.screenLeft + (window.outerWidth - popupWidth) / 2;
  const windowTop = window.screenTop + (window.outerHeight - popupHeight) / 2;
  window.open(
    url,
    "_blank",
    `width=${popupWidth}, height=${popupHeight}, top=${windowTop}, left=${windowLeft}`
  );
}

function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

// 초기화 함수 (필요한 경우 추가)
initMap();
