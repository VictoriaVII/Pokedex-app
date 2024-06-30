import { PokemonServiceInterface } from "@/model/service/PokemonService";
import { Transport } from "@/transport/Transport";
import { Store } from "@/store/Store";
import {
  SelectListInterface,
  TransportInterface,
} from "@/model/transport/Transport";
import { StoreInterface } from "@/model/store/Store";

import {
  PokemonsListInterface,
  PokemonInterface,
} from "@/model/transport/Transport";

class PokemonService implements PokemonServiceInterface {
  private static instance: PokemonServiceInterface;
  private transport: TransportInterface;
  private store: StoreInterface;

  constructor(transport: TransportInterface, store: StoreInterface) {
    this.transport = transport ?? Transport.getInstance();
    this.store = store ?? Store.getInstance();
  }

  public static getInstance(
    transport?: TransportInterface,
    store?: StoreInterface
  ): PokemonServiceInterface {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService(transport, store);
    }
    return PokemonService.instance;
  }

  public async getPokemonList(
    url: string,
    offset: number,
    limit: number
  ): Promise<PokemonsListInterface | null> {
    return await this.transport.getPokemonList(url, offset, limit);
  }

  public async getOnePokemon(url: string): Promise<PokemonInterface | null> {
    return await this.transport.getPokemon(url);
  }

  public async getSelectList(URL: string): Promise<SelectListInterface | null> {
    return await this.transport.getSelectList(URL);
  }

  public catchPokemon(id: number, date: string): void {
    this.store.catchPokemon(id, date);
  }

  public getCaughtPokemons(): Set<number> {
    return this.store.getCaughtPokemons();
  }

  public isPokemonCatched(id: number): boolean {
    return this.store.isPokemonCatched(id);
  }

  public getOneDateOfCapture(id: number): string {
    return this.store.getOneDateOfCapture(id);
  }
}

export { PokemonService };
