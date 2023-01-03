var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?appid=5c0678461c6c91d2c88ed62ed1b01c32&units=metric&q=';

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var searchInput = $("#search-input").val();
    var errMessage = $("#err-message");
    if (searchInput.trim() === "") {
        // city name is empty, show an error message        
        errMessage.text("Please enter a city name");
    } else if (!/^[a-zA-Z\s]+$/.test(searchInput)) {
        // city name is not in the correct format, show an error message
        errMessage.text("Please enter a valid city name (only letters and spaces allowed)");
    } else {
        // city name is not empty and is in the correct format, call the API
        errMessage.text("");
        callWeatherAPI(searchInput);
        
    }
});

function callWeatherAPI(cityName) {
    $.ajax({
        url: queryURL + cityName,
        method: "GET",
    }).then(function (response) {
        catchHistory(cityName);
        response.list.forEach(function (eachThreeHour, index) {
            //index % 8 will manage to take each 24h forecast from the array to show for the user as each position in the array is 3h gap.
            if (index % 8 === 0 || index === 39) {
                //create object "day" to pass to fillDashboard function
                var day = {};
                day.date = moment.unix(eachThreeHour.dt).format('DD-MM-YYYY');
                day.icon = eachThreeHour.weather[0].icon;
                day.temp = eachThreeHour.main.temp;
                day.humidity = eachThreeHour.main.humidity;
                day.wind = eachThreeHour.wind.speed;
                fillDashboard(day, index, cityName);
            }
        });
    }).catch(function(error) {
        $("#err-message").text("City not Found!");        
    });
}

function fillDashboard(day, index, cityName) {
    var forecast = $("#forecast");
    if (index === 0) {
        //clean then add header to forecast section
        forecast.empty();
        forecast.append(`
            <div class="col-sm-12">
                <h2 class="m-2">5 Days Forecast:</h2>
            </div>
        `);
        var today = $("#today");
        //clean then add todays section weather information
        today.empty();
        today.append(`
            <div class="card border-dark p-0">
                <div class="card-body text-dark">
                    <h5 class="card-title h3">`+ cityName + ` (` + day.date + `)</h5>
                    <img src="https://openweathermap.org/img/wn/`+ day.icon + `@2x.png" alt="weather icon">
                    <p class="card-text">Temperature: `+ day.temp + ` &#8451;</p>
                    <p class="card-text">Wind: `+ day.wind + ` KPH</p>
                    <p class="card-text">humidity: `+ day.humidity + ` %</p>
                </div>
            </div>
        `);
    } else {
        //add next 5 days forecast
        forecast.append(`
            <div class="card text-white bg-dark m-1 p-0 col-sm">
                <div class="card-body">
                    <h5 class="card-title h3">`+ day.date + `</h5>
                    <img src="https://openweathermap.org/img/wn/`+ day.icon + `@2x.png" alt="weather icon">
                    <p class="card-text">Temperature: `+ day.temp + ` &#8451;</p>
                    <p class="card-text">Wind: `+ day.wind + ` KPH</p>
                    <p class="card-text">humidity: `+ day.humidity + ` %</p>
                </div>
            </div>
        `);
    }
}

//Init first time opening the application it will initialise with a search on London. The next time opening the application your last seach will be the initial
callWeatherAPI(catchHistory());

function catchHistory(city) {
    //get searchHistory from localstorage
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    //Init when first open the application setting some placeholders for searchHistory
    if (!searchHistory) {
        searchHistory = ["London", "Manchester", "Liverpool", "Oxford", "Brighton"];
    }
    //if a city name was passed...
    if (city) {
        //check if city is already in the searchHistory to remove it...
        if (searchHistory.includes(city)) {
            searchHistory.splice(searchHistory.indexOf(city), 1);
        }
        //add city as first in the searchHistory array and limit to 5 History items then localStore
        searchHistory.unshift(city);
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
    //create buttons for searchHistory items
    var history = $("#history");
    history.empty();
    for (var i = 0; i < searchHistory.length; i++) {
        history.append(`
            <button type="button" class="btn btn-secondary btn-block" data-city="`+ searchHistory[i] + `">` + searchHistory[i] + `</button>
        `);
    }
    return searchHistory[0];//Init
}

$(document).on("click", ".btn-secondary", function () {
    callWeatherAPI($(this).data("city"));
});
