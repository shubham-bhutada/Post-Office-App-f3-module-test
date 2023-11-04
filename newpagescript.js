const map = document.getElementById("map");
const cards = document.getElementById("cards");

window.addEventListener("load", loadData);

let storedData = localStorage.getItem("myIp");
IP = "";

if (storedData) {
  let IP = JSON.parse(storedData);
}

function loadMap(lat, long) {
  map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>`;
}

async function loadData() {
  const endpoint = `https://ipapi.co/${IP}/json/`;
  try {
    let response = await fetch(endpoint);
    let result = await response.json();
    console.log(result);
    // loadMap(result.latitude, result.longitude);
    fillInfo(result);
  } catch (error) {
    console.log(error);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  loadMap(latitude, longitude);
}

window.addEventListener("load", getLocation);

async function numberOfPincodes(pincode) {
  const endpoint = `https://api.postalpincode.in/pincode/${pincode}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

function renderCards(data) {
  data.forEach((element) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <p>${element.Name}</p>
      <p>${element.BranchType}</p>
      <p>${element.DeliveryStatus}</p>
      <p>${element.District}</p>
      <p>${element.Division}</p>
      `;
    //   console.log(card);
    cards.appendChild(card);
  });
}

function fillInfo(result) {
  const IPAddress = document.getElementById("ip");
  const lat = document.getElementById("lat");
  const long = document.getElementById("long");
  const city = document.getElementById("city");
  const region = document.getElementById("region");
  const org = document.getElementById("org");
  const host = document.getElementById("host");

  IPAddress.innerText = result.ip;
  lat.innerText = result.latitude;
  long.innerText = result.longitude;
  city.innerText = result.city;
  region.innerText = result.region;
  org.innerText = result.org;
  host.innerText = result.network;

  const timezone = document.getElementById("time-zone");
  const dateAndTime = document.getElementById("dateAndTime");
  const pincode = document.getElementById("pincode");
  const pincodes = document.getElementById("pincodes");
  let user_datetime_str = new Date().toLocaleString("en-US", {
    timeZone: result.timezone,
  });

  timezone.innerText = result.timezone;
  dateAndTime.innerText = user_datetime_str;
  pincode.innerText = result.postal;
  let num = numberOfPincodes(result.postal);
  num.then((result) => {
    // console.log(result);
    let pins = result[0].PostOffice;
    pincodes.innerText = pins.length;
    renderCards(result[0].PostOffice);
  });
}

