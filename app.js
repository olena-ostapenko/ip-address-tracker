ipData()

var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false
});



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function ipData(ip){

    let apiUrl = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_nzVLmspwZiDGaSvylmQr8Ihri4EuS";
if (ip){
    apiUrl = apiUrl + "&ipAddress="+ip
}

    fetch(apiUrl)


    .then((response)=>{
        return response.json();
    })
    .then((data)=> {
        map.setView([data.location.lat, data.location.lng], 16 )

        var myIcon = L.icon({
            iconUrl: "./image/icon-location.svg"
        
        });
        L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map);

        // var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
        // console.log(data);


        let ip =document.getElementById("ipAd")
        ip.innerHTML = data.ip

        let adress = document.getElementById("address")
        adress.innerHTML = data.location.region+", " + data.location.city+ ", " + data.location.geonameId
        
        let time = document.getElementById("time")
        time.innerHTML = data.location.timezone

        let isp = document.getElementById("isp")
        isp.innerHTML = data.isp

    })
}


let form = document.getElementById("form-valid")

form.addEventListener("submit", function (e){
    e.preventDefault()

    let regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/
    let inputIp = document.querySelector(".input")
    let errorText = document.querySelector(".error-text")
   if(inputIp.value.match(regex)){
ipData(inputIp.value)


   }
   else if(inputIp.value == ""){
    ipData()
    errorText.classList.add("hidden")
    inputIp.classList.remove("error")
   }
   else {
    inputIp.classList.add("error")
   
    errorText.classList.remove("hidden")

   }


})
