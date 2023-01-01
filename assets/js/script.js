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
        catchHistory(cityName);
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
                    <h5 class="card-title h3">`+ cityName + ` (` + day.date + `) [weather icon here]</h5>
                    <p class="card-text">Temperature: `+ day.temp + ` &#8451;</p>
                    <p class="card-text">Wind: `+ day.wind + ` KPH</p>
                    <p class="card-text">humidity: `+ day.humidity + ` %</p>
                </div>
            </div>
        `);
    } else {
        forecast.append(`
            <div class="card text-white bg-dark m-1 p-0 col-sm">
                <div class="card-body">
                    <h5 class="card-title h3">`+ day.date + `</h5>
                    <p class="card-text">Temperature: `+ day.temp + ` &#8451;</p>
                    <p class="card-text">Wind: `+ day.wind + ` KPH</p>
                    <p class="card-text">humidity: `+ day.humidity + ` %</p>
                </div>
            </div>
        `)
    }
}

catchHistory();

function catchHistory(city) {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (!searchHistory) {
        searchHistory = ["London", "Manchester", "Liverpool","Oxford","Brighton"];
    }
    if (city) {
        if(searchHistory.includes(city)){
            searchHistory.splice(searchHistory.indexOf(city),1);
        }        
        searchHistory.unshift(city);
        console.log(searchHistory);
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
    var history = $("#history");
    history.empty();
    for (var i = 0; i < searchHistory.length; i++) {         
        history.append(`
            <button type="button" class="btn btn-secondary btn-block" data-city="`+searchHistory[i]+`">`+searchHistory[i]+`</button>
        `);   
    } 
}

$(document).on("click", ".btn-secondary", function() {
    callWeatherAPI($(this).data("city"));
});
