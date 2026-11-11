
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");


const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

async function getWeather(city) {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    try {
        showLoading();
        hideError();
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) throw new Error("City not found");
            if (response.status === 401) throw new Error("API key not valid yet — new keys can take an hour to activate");
            throw new Error("Failed to fetch weather data");
        }
        
        const data = await response.json();
        displayWeather(data);
        saveToHistory(city);
        
    } catch (err) {
        
        showError(err.name === "TypeError" ? "Network error — check your connection" : err.message);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    weatherDisplay.classList.remove("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function saveToHistory(city) {
    const seriaLizedData = json.stringify(data);
    localStorage.setItem(Key, seriaLizedData);

}
}

function loadHistory() {
   const rawData = localStorage.getItem("weatherHistory");
    const historyList =document.getElementById("historyList");

    historyList.innerHTML = "";

    const savedCities =rawData ? JSON.parse(rawData) : {}

    savedCities.forEach(city) => {
        const list = document.createElement(("li");
        list.textContent = city;
        
    } 
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

loadHistory();
