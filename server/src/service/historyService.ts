import fs from 'fs';

class City {
  constructor(public name: string, public id: string) {}
}

class HistoryService {
  saveCity(_cityName: any) {
    throw new Error('Method not implemented.');
  }
  getSearchHistory() {
    throw new Error('Method not implemented.');
  }
  deleteCity(_id: string) {
    throw new Error('Method not implemented.');
  }
  private filePath = '/Users/ivanadrover/bootcamp/WeatherChallenge/server/src/service/searchHistory.json';

  // Read the search history from the file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // Write the search history to the file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(cities), 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // Get the list of cities from the search history
  async getCities(): Promise<City[]> {
    return this.read();
  }

  // Add a new city to the search history
  async addCity(city: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(city, Date.now().toString());
    cities.push(newCity);
    await this.write(cities);
  }

  // Remove a city from the search history by its ID
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const index = cities.findIndex(city => city.id === id);
    if (index !== -1) {
      cities.splice(index, 1);
      await this.write(cities);
    }
  }
}

export default new HistoryService();
