var httpRequest= new XMLHttpRequest();
var searchTerm =document.getElementById('searchTerm')

if (searchTerm.value==""){
httpRequest.open('GET',`https://api.weatherapi.com/v1/forecast.json?key=00bbee1dbf464c30804143857222210&q=cairo&days=3`);    
httpRequest.send();
httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
        weather= JSON.parse(httpRequest.response);
        displayData();
    }
});
}
searchTerm.addEventListener("keyup", searchInput)
function searchInput(){
    httpRequest.open("Get",`https://api.weatherapi.com/v1/forecast.json?key=00bbee1dbf464c30804143857222210&q=${searchTerm.value}&days=3`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
        weather= JSON.parse(httpRequest.response);
        console.log(weather);
        displayData();
    }
});
}
var week= ["Sunday","Monday","Teusday","Wednesday","Thursday","Friday","Saturday"];
var year = ["January","February","Mars","April","May","June","July","August","Septempre", "October", "November", "December"];
var day=new Date;
var weather=[];

function displayData(){
    var tom=0;
    var aftertom=0;

    if(day.getDay()==6){
    tom=0
    aftertom=1
    }
    else{
    tom=day.getDay()+1;
    aftertom=day.getDay()+2;
    
    }
   document.getElementById('weatherData').innerHTML= 
   `
   <div class="col-md-4  rounded-start section1">
   <div class="head d-flex justify-content-between py-2">
     <p>${week[day.getDay()]}</p>
     <p>${day.getDate()+year[day.getMonth()]}</p>
   </div>
   <div class="body">
     <p >${weather.location.name}</p>
     <h2 class="first-day-temp">${weather.current.temp_c +"&degC"}</h2>
     <img class="main-icon" src="http:${weather.current.condition.icon}">
     <p><span>${weather.current.condition.text}</span></p>
     <div class="details d-flex">
     <p><i class="fa-solid fa-umbrella"></i> 20%</p>
     <p><i class="fa-solid fa-wind"></i> 18km/h</p>
     <p><i class="fa-solid fa-compass"></i> East</p>
     </div>
   </div>
 </div>
 <div class="col-md-4  section2">
   <div class="head text-center py-2">
     <p class='tomorrow'>${week[tom]}</p>
     
   </div>
   <div class="body text-center">
    <img src="http:${weather.forecast.forecastday[1].day.condition.icon}">
     <h2 class="">${weather.forecast.forecastday[1].day.maxtemp_c +"&degC"}</h2>
     <p class="">${weather.forecast.forecastday[1].day.mintemp_c +"&degC"}</p>
     <p class=""><span>${weather.forecast.forecastday[1].day.condition.text}</span></p>

   </div>
 </div>
 <div class="col-md-4 section3 rounded-end">
   <div class="head text-center py-2">
     <p class='afterTomorrow'>${week[aftertom]}</p>
     
   </div>
   <div class="body text-center">
   <img src="http:${weather.forecast.forecastday[2].day.condition.icon}">
   <h2 class="">${weather.forecast.forecastday[2].day.maxtemp_c +"&degC"}</h2>
   <p class="">${weather.forecast.forecastday[2].day.mintemp_c +"&degC"}</p>
   <p class=""><span>${weather.forecast.forecastday[2].day.condition.text}</span></p>
   </div>
 </div>
   `

    ;
}