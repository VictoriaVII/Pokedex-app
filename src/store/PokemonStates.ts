import { PokemonsListInterface } from "@/model/transport/Transport";
import { makeAutoObservable } from "mobx";

class PokemonStates {
  pokemonList: PokemonsListInterface = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
  page: number = 1;
  limit = 20;
  offset = 0;
  url = "https://pokeapi.co/api/v2/pokemon/";

  constructor() {
    makeAutoObservable(this);
  }
  setPokemonList = (pokemonList: PokemonsListInterface) => {
    this.pokemonList = pokemonList;
  };
  setPage = (page: number) => {
    this.page = page;
  };
  setLimit = (limit: number) => {
    this.limit = limit;
  };
  setOffset = (offset: number) => {
    this.offset = offset;
  };
  setURL = (url: string) => {
    this.url = url;
  };
}

export default new PokemonStates();
