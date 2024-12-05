import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;

  try {
    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherData(cityName);

    // Save city to search history
    await HistoryService.saveCity(cityName);

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const searchHistory = await HistoryService.getSearchHistory();
    res.status(200).json(searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await HistoryService.deleteCity(id);
    res.status(200).json({ message: 'City deleted from search history' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
