import { cardsColors } from "@/view/Card/CardColors";

interface PokemonsListInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface SelectListInterface {
  pokemon: Array<{ pokemon: { name: string; url: string } }>;
}

interface PokemonInterface {
  name: string;
  id: number;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
  types: Array<{ type: { name: keyof typeof cardsColors } }>;
}

interface TransportInterface {
  getPokemonList(
    URL: string,
    offset: number,
    limit: number
  ): Promise<PokemonsListInterface | null>;
  getPokemon(URL: string): Promise<PokemonInterface | null>;
  getSelectList(URL: string): Promise<SelectListInterface | null>;
}

export {
  PokemonsListInterface,
  PokemonInterface,
  TransportInterface,
  SelectListInterface,
};
