import dotenv from 'dotenv';

dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define a class for the Weather object
class Weather {
  // Define properties for the Weather object
  temperature: number;
  humidity: number;
  description: string;

  constructor(temperature: number, humidity: number, description: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
  }
}

// Complete the WeatherService class
class WeatherService {
  getWeatherData(_cityName: any) {
    throw new Error('Method not implemented.');
  }
  // Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';

  // Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(`${this.baseURL}/geocode?query=${query}&apiKey=${this.apiKey}`);
    const data = await response.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude
    };
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.cityName}`;
  }

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=${this.apiKey}`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    return await response.json();
  }

  // Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.current.temperature;
    const humidity = response.current.humidity;
    const description = response.current.weather_descriptions[0];
    return new Weather(temperature, humidity, description);
  }

  // Complete buildForecastArray method
  private buildForecastArray(_: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = [];
    for (let i = 1; i < weatherData.length; i++) {
      const temperature = weatherData[i].temperature;
      const humidity = weatherData[i].humidity;
      const description = weatherData[i].weather_descriptions[0];
      const forecastWeather = new Weather(temperature, humidity, description);
      forecastArray.push(forecastWeather);
    }
    return forecastArray;
  }

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.forecast);
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
