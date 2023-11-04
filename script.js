const ipAddress = document.getElementById("ip");
const startBtn = document.getElementById("startBtn");

function getIpAddress() {
  $.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (data) {
    // console.log(JSON.stringify(data, null, 2));
    // console.log(data.ip);
    let ipAdd = data.ip;
    ipAddress.innerText = ipAdd;
    localStorage.setItem('myIP', JSON.stringify(ipAdd));
  });
}

window.addEventListener("load", getIpAddress);

document.getElementById("startBtn").addEventListener("click", function() {
    // Redirect to another HTML page
    window.location.href = "newpage.html";
});