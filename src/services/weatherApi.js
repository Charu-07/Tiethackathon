const API_KEY = "354ea78ee5647bff1a890efb39f17dbc";

export async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Weather fetch failed");

  return res.json();
}

