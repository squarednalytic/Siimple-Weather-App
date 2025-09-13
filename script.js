async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");
    const apiKey = "3f02cf5a7ab539f97389fd56357d2b08"; // your API key

    const city = cityInput.value.trim(); // remove extra spaces
    if (!city) {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        // Check if API returns an error code (e.g. 404)
        if (data.cod !== 200) {
            weatherResult.innerHTML = `<p style="color: yellow;">${data.message || "City not found"}</p>`;
            return;
        }

        const temp = data.main.temp;
        const description = data.weather[0].description;

        weatherResult.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡 Temperature: <strong>${temp}°C</strong></p>
            <p>🌤 Condition: <strong>${description}</strong></p>
        `;
    } catch (error) {
        console.error(error);
        weatherResult.innerHTML = `<p style="color: yellow;">Unable to fetch weather data. Please try again later.</p>`;
    }
}
