import { useEffect, useState } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import SelectWeather from "./components/SelectWeather";
import TodoList from "./components/TodoList";
import initialTodos from "./data";
import Done from "./components/Done";

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [weatherStatus, setWeatherStatus] = useState({});
  const [currentFilter, setCurrentFilter] = useState("current");

  useEffect(() => {
    // You do not need to change anything in this useEffect
    async function determineCurrentWeather() {
      try {
        const location = await getUserLocation();
        const weatherCode = await getWeatherData(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeatherStatus(convertWeatherCodeToEmoji(weatherCode));
      } catch (error) {
        console.error(error);
      }
    }
    determineCurrentWeather();
  }, []);

  // Function to get the current location of the user
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // Function to convert the fetched weather code to our weather status object
  function convertWeatherCodeToEmoji(weatherCode) {
    switch (weatherCode) {
      case 0:
        return { emoji: "☀️", weather: "good" };
      case 1:
        return { emoji: "🌤", weather: "good" };
      case 2:
        return { emoji: "🌥", weather: "good" };
      case 3:
        return { emoji: "☁️", weather: "good" };
      default:
        return { emoji: "💩", weather: "bad" };
    }
  }

  // Function to fetch the weather data for the user's location
  async function getWeatherData(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!response.ok) {
        throw new Error("wiubwieufb");
      }
      const data = await response.json();
      console.log(data.current_weather.weathercode);
      const weatherCodeNumber = data.current_weather.weathercode;
      return weatherCodeNumber;
    } catch (error) {
      console.error(error);
    }
  }

  // Function to save the selected weather filter
  function handleWeatherSelect(event) {
    setCurrentFilter(event.target.value);
  }

  // Function to filter the ToDos according to the selected filter
  function filterTodos(currentFilter) {
    switch (currentFilter) {
      case "current":
        return todos.filter(
          (todo) =>
            todo.weather === weatherStatus.weather || todo.weather === "always"
        );
      case "always":
        return todos.filter((todo) => todo.weather === "always");
      case "good":
        return todos.filter((todo) => todo.weather === "good");
      case "bad":
        return todos.filter((todo) => todo.weather === "bad");

      case "all":
        return todos;
      default:
        return todos;
    }
  }
  // console.log(filterTodos(currentFilter));
  function toggleCheckTodo(todoId) {
    // console.log(todoId);

    setTodos((oldTodos) => {
      const newTodo = oldTodos.map((oldTodo) => {
        if (oldTodo.id === todoId) {
          return { ...oldTodo, isChecked: !oldTodo.isChecked };
        }
        //console.log(oldTodo.isChecked);
        return oldTodo;
      });

      return newTodo;
    });
  }
  // console.log(todos.isChecked);
  // console.log(todos);

  const filteredTodos = filterTodos(currentFilter);
  console.log(filteredTodos);

  return (
    <>
      <Header />
      <main>
        <InfoBox emoji={weatherStatus.emoji} />
        <SelectWeather handleChange={handleWeatherSelect} />
        <TodoList
          toggleCheckTodo={toggleCheckTodo}
          todos={filteredTodos.filter((todoChecked) => !todoChecked.isChecked)}
        />

        <Done
          toggleCheckTodo={toggleCheckTodo}
          todos={filteredTodos.filter((todoChecked) => todoChecked.isChecked)}
          checked={"checked"}
        />
      </main>
    </>
  );
}

export default App;
