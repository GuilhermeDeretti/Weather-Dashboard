var querryURL = 'https://api.openweathermap.org/data/2.5/forecast/daily?'; 
var API_KEY = 'appid=2971c2572c93d5d984b8639fff993a46';
var city = '&q=';
var units = '&units=metric'; //measurement units
var forecast = '&cnt=6'; //quantity of days to be returned by the API
        
//use "city" on the api to get 5 days forecast
// * The city name

response.city.name;
response.list.forEach(day => {

    day.dt;// The date as Unix Timestamp(must convert)
    day.weather.icon;//weather conditions icon
    day.main.temp//temperature
    day.main.humidity//humidity
    day.wind.speed;//wind speed    
});


