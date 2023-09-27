import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import visibility from "./../src/visibility.png";
import wind from "./cloudy-day.png";
import thunder from "./thunder.png";
import rain from "./rain.png";
import cloud from "./storm.png";


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Pune");
  const [weatherDescription, setWeatherDescription] = useState("");

  async function loadWeatherData() {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`)
      setWeatherData(response.data);
    }
    catch (error) {
      console.log(error);
    }

  }

 

  useEffect(() => {
    loadWeatherData();
  }, [city])


  useEffect(() => {

    setWeatherDescription(
      `${weatherData?.weather?.[0]?.main} (${weatherData?.weather?.[0]?.description})`)
  }, [weatherData])

  return (
    <div className="app">

      <h1 className='text'>Weather App</h1>
      <h2 className='caption '>"Weather.. whenever.. whenever...!"</h2>

      <input type='text' className='box' value={city} onChange={(e) => {
        setCity(e.target.value);
      }} />

      <div className='bg-color'>
        <p className='city'>City : {weatherData?.name}</p>
        <p className='temp'>Tempreture <br /><span className='font'> {(weatherData?.main?.temp - 273).toFixed(2)}°C</span></p>
      </div>


      <div className='flex'>
        <div className='visibility'>
          <p className='center'>Humidity <br />
            <img src={visibility} className='img' /><br />

            {weatherData?.main?.humidity} %
          </p>
        </div>

        <div className='visibility'>
          <p className='center'>Visibility <br />
            <img src={thunder} className='img' /><br />{weatherData?.visibility}
            &nbsp;M</p>
        </div>

        <div className='visibility'>
          <p className='center'>Wind <br />
            <img src={wind} className='img' /><br /> {weatherData?.wind?.speed} </p>
        </div>

        <div className='visibility'>
          <p className='center'>Main <br />
            <img src={rain} className='img' /><br /> {weatherData?.weather?.main} </p>
        </div>

        <div className='visibility'>
          <p className='center'>clouds <br />
            <img src={cloud} className='img' /><br /> {weatherData?.clouds?.all} </p>
        </div>
      </div>
      </div>



      );
}

