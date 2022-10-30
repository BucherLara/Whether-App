import { useEffect, useState } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import SelectWeather from "./components/SelectWeather";
import TodoList from "./components/TodoList";
import initialTodos from "./data";
import Done from "./components/Done";

//const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

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
        console.log(getWeatherData);
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

  function resolve(pos) {
    const crd = pos.coords;
    return crd;
  }

  navigator.geolocation.getCurrentPosition(resolve, reject);
  function reject(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
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
    console.log(crd);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!response.ok) {
        throw new Error(response.status + "error you dummy");
      }
      const { longitude, latitude } = await response.json();
    } catch (error) {
      console.error(error);
    }
    return 0;
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
      case "good":
      case "bad":
        return todos.filter((todo) => todo.weather === currentFilter);
      case "all":
      default:
        return todos;
    }
  }
  function toggleCheckTodo(todoId) {
    console.log(todoId);

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
  console.log(todos.isChecked);
  console.log(todos);

  const filteredTodos = [];

  return (
    <>
      <Header />
      <main>
        <InfoBox emoji={weatherStatus.emoji} />
        {/* <SelectWeather handleChange={handleWeatherSelect} /> */}
        <TodoList
          toggleCheckTodo={toggleCheckTodo}
          todos={todos.filter((todoChecked) => !todoChecked.isChecked)}
        />

        <Done
          toggleCheckTodo={toggleCheckTodo}
          todos={todos.filter((todoChecked) => todoChecked.isChecked)}
          checked={"checked"}
        />
      </main>
    </>
  );
}

export default App;
