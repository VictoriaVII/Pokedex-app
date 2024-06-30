import axios from "axios";
import { TransportInterface } from "@/model/transport/Transport";

class Transport implements TransportInterface {
  public static instance: TransportInterface;

  public static getInstance(): TransportInterface {
    if (!Transport.instance) {
      Transport.instance = new Transport();
    }
    return Transport.instance;
  }

  public async getPokemonList(URL: string, offset: number, limit: number) {
    try {
      const response = await axios.get(`${URL}`, {
        params: {
          offset: offset,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при запросе списка покемонов - ${error}`);
      return null;
    }
  }
  public async getPokemon(URL: string) {
    try {
      const response = await axios.get(`${URL}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при запросе покемона - ${error}`);
      return null;
    }
  }

  public async getSelectList(URL: string) {
    try {
      const response = await axios.get(`${URL}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при запросе покемона - ${error}`);
      return null;
    }
  }
}

export { Transport };
