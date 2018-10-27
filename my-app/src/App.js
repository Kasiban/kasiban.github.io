import React from "react";
import Titles from "./components/Titles";
import Forms from "./components/Forms";
import Weather from "./components/Weather";


const API_KEY = 'a75f9bda52993e2dcfe7c7e0e1aa6a95';

class App extends React.Component {
    state = {
        temperature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : undefined
    }
    getWeather = async (e)=> {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
        const data = await api_call.json();
        if (city && country){
        console.log(data);
        this.setState({
            temperature : data.main.temp,
            city : data.name,
            country : data.sys.country,
            humidity : data.main.humidity,
            description : data.weather[0].description,
            error : ""
        })
        } else {
            this.setState({
            temperature : undefined,
            city : undefined,
            country : undefined,
            humidity : undefined,
            description : undefined,
            error : "Please enter the value"
        })
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-xs-7 form-container">
                                <Forms getWeather={this.getWeather}/>
                                <Weather 
                                    temperature = {this.state.temperature}
                                    city = {this.state.city}
                                    country = {this.state.country}
                                    humidity = {this.state.humidity}
                                    description = {this.state.description}
                                    error = {this.state.error}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        );
        
    }
}

export default App;


