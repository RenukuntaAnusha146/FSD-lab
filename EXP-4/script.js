const city=document.getElementById("citySelect");
const weather=document.getElementById("weather");
const message=document.getElementById("message");

document.getElementById("searchBtn").onclick=async()=>{

    if(city.value==""){
        message.innerHTML="Enter city name";
        return;
    }

    try{

        // Get city location
        let geo=await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city.value}&count=1`
        );

        let place=(await geo.json()).results[0];

        // Get weather
        let res=await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=10`
        );

        let data=await res.json();

        document.getElementById("location").innerHTML=
            `${place.name}, ${place.country}`;

        document.getElementById("temperature").innerHTML=
            Math.round(data.current.temperature_2m);

        document.getElementById("humidity").innerHTML=
            data.current.relative_humidity_2m;

        document.getElementById("wind").innerHTML=
            data.current.wind_speed_10m;

        document.getElementById("description").innerHTML=
            getWeather(data.current.weather_code);

        let forecast=document.getElementById("forecast");

        forecast.innerHTML="";

        // Create 10 cards
        for(let i=0;i<10;i++){

            let day=new Date(data.daily.time[i])
                .toLocaleDateString("en-US",{weekday:"short"});

            forecast.innerHTML+=`
                <div class="forecast-card">
                    <h3>${day}</h3>
                    <p>${getWeather(data.daily.weather_code[i])}</p>
                    <b>${Math.round(data.daily.temperature_2m_max[i])}°C</b>
                    <p>Min: ${Math.round(data.daily.temperature_2m_min[i])}°C</p>
                </div>
            `;
        }

        message.innerHTML="";
        weather.classList.remove("hidden");

    }catch(error){

        message.innerHTML="City not found";

    }

};

function getWeather(code){

    if(code==0) return "Clear";

    if(code<=3) return "Cloudy";

    if(code>=51 && code<=67) return "Rain";

    if(code>=71 && code<=77) return "Snow";

    if(code>=80 && code<=82) return "Showers";

    if(code>=95) return "Thunderstorm";

    return "Unknown";
}