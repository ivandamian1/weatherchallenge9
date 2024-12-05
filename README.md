# Weather Dashboard Application

## Description

The **Weather Dashboard Application** allows users to search for current and future weather conditions for multiple cities using the OpenWeather API. Users can view a 5-day forecast and current conditions, including temperature, humidity, wind speed, and an icon representing weather conditions. Additionally, the application saves a search history, enabling users to quickly revisit previously searched cities.

This application is built with Node.js and Express for the back end, integrated with the OpenWeather API, and deployed on Render.

---

## Features

1. **Search for Weather by City**  
   - Retrieves current weather and a 5-day forecast for a specified city.  

2. **View Weather Details**  
   - Includes city name, date, temperature, wind speed, humidity, and weather condition icons.  

3. **Search History**  
   - Stores previous city searches for easy access.  

4. **Delete Search History** *(Bonus)*  
   - Allows users to delete specific cities from the search history.

5. **Responsive UI**  
   - A polished, user-friendly front-end interface.

---

## Technologies Used

- **Front End**: HTML, CSS, JavaScript  
- **Back End**: Node.js, Express.js  
- **API**: OpenWeather API (5-Day Weather Forecast)  
- **Database**: JSON File for storing search history  
- **Deployment**: Render  

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd WeatherChallenge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   API_KEY=your_openweather_api_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

---


## Deployment

The application is deployed on Render. You can access it via the following URL:  
[Live Application Link](https://your-deployment-url)

---

## Screenshots

![Weather Dashboard](https://via.placeholder.com/600x400)  
*Example of the weather dashboard interface.*

---

## Future Enhancements

- Add user authentication to save individual user histories.
- Support for multiple languages and units of measurement.
- Real-time weather updates without manual refreshing.

---

## License

This project is licensed under the MIT License. 

---

### Developer Notes

For questions, suggestions, or collaboration, feel free to reach out via the repository's Issues tab or submit a pull request!