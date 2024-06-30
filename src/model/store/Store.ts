interface StoreInterface {
  catchPokemon(id: number, date: string): void;
  getCaughtPokemons(): Set<number>;
  isPokemonCatched(id: number): boolean;
  getOneDateOfCapture(id: number): string;
}

export { StoreInterface };
