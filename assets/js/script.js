var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?';
var API_KEY = '&appid=5c0678461c6c91d2c88ed62ed1b01c32';
var city = 'q=';
var units = '&units=metric'; //measurement units

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var searchInput = $("#search-input").val();
    callWeatherAPI(searchInput);
});

function callWeatherAPI(cityName) {
    $.ajax({
        url: queryURL + city + cityName + units + API_KEY,
        method: "GET"
    }).then(function (response) {
        response.list.forEach(function (eachThreeHour, index) {
            if (index % 7 === 0) {

                var day = {};
                day.date = moment.unix(eachThreeHour.dt).format('DD-MM-YYYY');
                day.icon = eachThreeHour.weather[0].icon;
                day.temp = eachThreeHour.main.temp;
                day.humidity = eachThreeHour.main.humidity;
                day.wind = eachThreeHour.wind.speed;
                fillDashboard(day, index, cityName);
            }
        });
    });
}

function fillDashboard(day, index, cityName) {
    var forecast = $("#forecast");
    if (index === 0) {
        forecast.empty();
        forecast.append(`
            <div class="col-sm-12">
                <h2 class="m-2">5 Days Forecast:</h2>
            </div>
        `);
        var today = $("#today");        
        today.empty();
        today.append(`
            <div class="card border-dark p-0">
                <div class="card-body text-dark">
                    <h5 class="card-title h3">`+cityName+` (`+day.date+`) [weather icon here]</h5>
                    <p class="card-text">Temperature: `+day.temp+` &#8451;</p>
                    <p class="card-text">Wind: `+day.wind+` KPH</p>
                    <p class="card-text">humidity: `+day.humidity+` %</p>
                </div>
            </div>
        `);
    }else{
        forecast.append(`
            <div class="card text-white bg-dark m-1 p-0 col-sm">
                <div class="card-body">
                    <h5 class="card-title h3">`+day.date+`</h5>
                    <p class="card-text">Temperature: `+day.temp+` &#8451;</p>
                    <p class="card-text">Wind: `+day.wind+` KPH</p>
                    <p class="card-text">humidity: `+day.humidity+` %</p>
                </div>
            </div>
        `)
    }
}

//document.$(".last-searched-btn").on("click", function() {

/*
function1 to clear screen then create the html and info to the screen
function2 to store search
function3 to get stored search

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

//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city