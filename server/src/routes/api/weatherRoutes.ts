import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const filePath = path.join(__dirname, '../../../data/searchHistory.json');

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required.' });
  }

  try {
    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherData(cityName);

    // Save city to search history
    await HistoryService.saveCity(cityName);

    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET search history
// Helper function to read `searchHistory.json`
const readSearchHistory = async (): Promise<any[]> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // Return an empty array if the file doesn't exist
      return [];
    }
    throw err;
  }
};

// // Helper function to write to `searchHistory.json`
const writeSearchHistory = async (cities: any[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(cities, null, 2), 'utf-8');
};

// GET /api/weather/history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await readSearchHistory();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history.' });
  }
});

// // POST /api/weather
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required.' });
  }
  try {
    // Fetch weather data using WeatherService
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Read current history
    const cities = await readSearchHistory();

    // Check for duplicate cities
    if (cities.some((entry: any) => entry.name.toLowerCase() === city.toLowerCase())) {
      return res.status(400).json({ error: 'City already exists in history.' });
    }

    // Add city with a unique ID
    const newCity = { id: uuidv4(), name: city };
    cities.push(newCity);

    // Save updated history
    await writeSearchHistory(cities);

    // Return the weather data
    res.status(201).json({ city: newCity, weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data.' });
  } 
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    HistoryService.deleteCity(id);
    res.status(200).json({ message: 'City deleted from search history' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
