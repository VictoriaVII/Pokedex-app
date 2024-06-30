import {
  PokemonInterface,
  PokemonsListInterface,
  SelectListInterface,
} from "../transport/Transport";

interface PokemonServiceInterface {
  getPokemonList(
    url: string,
    offset: number,
    limit: number
  ): Promise<PokemonsListInterface | null>;
  getOnePokemon(url: string): Promise<PokemonInterface | null>;
  catchPokemon(id: number, date: string): void;
  getCaughtPokemons(): Set<number>;
  isPokemonCatched(id: number): boolean;
  getOneDateOfCapture(id: number): string;
  getSelectList(URL: string): Promise<SelectListInterface | null>;
}

export { PokemonServiceInterface };
