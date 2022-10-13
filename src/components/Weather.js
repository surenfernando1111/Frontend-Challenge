import React, { Component } from 'react';
import { BsClouds, BsCloudRain, BsSun, BsCloudDrizzle, BsCloudSnow } from 'react-icons/bs';
import { API_KEY, days } from '../Utils/Utils';
import './Weather.css';
import { IoThunderstormOutline } from 'react-icons/io5'
class Weather extends Component {
    // initial state
    state = {
        weatherData: [],
        lat: '42.3149',
        lon: '-83.0364'
    }

    // fetching data initially
    componentDidMount() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=${API_KEY}`)
            .then((response) => response.json())
            .then(data => this.setState({ weatherData: data.list }));
    }

    // changing data by navbar
    changeLocation = (lat, lon) => {
        this.setState({ lat: lat, lon: lon });
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            .then((response) => response.json())
            .then(data => this.setState({ weatherData: data.list }));
    }
    render() {
        return (
            <div>
                {/* navbar */}
                <div className='navigation'>
                    <p onClick={() => this.changeLocation("42.3149", "-83.0364")} className={this.state.lat === '42.3149' ? 'nav-para-active' : 'nav-para'}>WINDSOR</p>
                    <p onClick={() => this.changeLocation("43.2557", "-79.8711")} className={this.state.lat === '43.2557' ? 'nav-para-active' : 'nav-para'}>HAMILTON</p>
                    <p onClick={() => this.changeLocation("45.4215", "-75.6972")} className={this.state.lat === '45.4215' ? 'nav-para-active' : 'nav-para'}>TORONTO</p>
                </div>

                {/* main weather card */}
                <div className='weather-div'>

                    {/* checking the data is loading or not */}
                    {
                        this.state.weatherData.length < 1 ?
                            <h2 className='loading'>Loading...</h2>
                            :
                            <>
                            {/* today section section */}
                                <div className='today-section'>
                                    <p className='today-para'>Today</p>
                                    <div className='today-div'>

                                        {/* conditional rendering of icons based on weather condition */}
                                        <div className='icon-today'>
                                            {this.state.weatherData[0]?.weather[0].main === 'Clouds' && <BsClouds className='today-icon'></BsClouds>}
                                            {this.state.weatherData[0]?.weather[0].main === 'Rain' && <BsCloudRain className='today-icon'></BsCloudRain>}
                                            {this.state.weatherData[0]?.weather[0].main === 'Clear' && <BsSun className='today-icon'></BsSun>}
                                            {this.state.weatherData[0]?.weather[0].main === 'Thunderstorm' && <IoThunderstormOutline className='today-icon'></IoThunderstormOutline>}
                                            {this.state.weatherData[0]?.weather[0].main === 'Drizzle' && <BsCloudDrizzle className='today-icon'></BsCloudDrizzle>}
                                            {this.state.weatherData[0]?.weather[0].main === 'Snow' && <BsCloudSnow className='today-icon'></BsCloudSnow>}
                                        </div>

                                        {/* weather today description */}
                                        <div className='desc-today'>
                                            <h1 className='today-temp'><b><span className='only-temp'>{parseInt(this.state.weatherData[0]?.main?.temp - 273)}</span><sup>o</sup></b></h1>
                                            <p className='today-weather'>{this.state.weatherData[0]?.weather[0].main}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* next days forecasts */}
                                <div className='next-day-section'>
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        this.state.weatherData.slice(8, -1).map(((weather, i) => {
                                            if (i === 0 || i === 6 || i === 14 || i === 22) {
                                                return <div className='day-div'>
                                                    <p className='next-day-name'>{days[new Date(weather?.dt_txt).getDay()]}</p>
                                                    <p>
                                                        {weather?.weather[0].main === 'Clouds' && <BsClouds className='next-day-icon'></BsClouds>}
                                                        {weather?.weather[0].main === 'Rain' && <BsCloudRain className='next-day-icon'></BsCloudRain>}
                                                        {weather?.weather[0].main === 'Clear' && <BsSun className='next-day-icon'></BsSun>}
                                                        {weather?.weather[0].main === 'Thunderstorm' && <IoThunderstormOutline className='next-day-icon'></IoThunderstormOutline>}
                                                        {weather?.weather[0].main === 'Drizzle' && <BsCloudDrizzle className='next-day-icon'></BsCloudDrizzle>}
                                                        {weather?.weather[0].main === 'Snow' && <BsCloudSnow className='next-day-icon'></BsCloudSnow>}
                                                    </p>
                                                    <p className='next-day-temp'>{parseInt(weather?.main?.temp - 273)}<sup><small>o</small></sup></p>
                                                </div>
                                            }
                                        }))
                                    }



                                </div>
                            </>
                    }
                </div>

            </div>
        );
    }
}

export default Weather;

