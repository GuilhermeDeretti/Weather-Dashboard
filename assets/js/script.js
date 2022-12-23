var querryURL = 'https://api.openweathermap.org/data/2.5/forecast/daily?'; 
var API_KEY = 'appid=2971c2572c93d5d984b8639fff993a46';
var city = '&q=';
var units = '&units=metric'; //measurement units
var forecast = '&cnt=6'; //quantity of days to be returned by the API

/*
function1 to clear screen then create the html and info to the screen
function2 to store response data
function3 to get stored data

init{
    function3
}
search an wait for response{
function2
}
*/

// * Use localstorage
// * Create a weather dashboard with form inputs. search-input
//   * When a user searches for a city that city is added to the search history
//   * When a user views the current weather conditions for that city they are presented with:
response.city.name;// City Name
response.list.forEach(day => {

    day.dt;// The date as Unix Timestamp(must convert)
    day.weather.icon;//weather conditions icon
    day.main.temp//temperature
    day.main.humidity//humidity
    day.wind.speed;//wind speed    
});

//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city