import { StoreInterface } from "@/model/store/Store";

class Store implements StoreInterface {
  private static instance: StoreInterface;
  private catchedPokemons: Set<number>;
  private dateOfCapture: Array<{ id: number; date: string }>;

  constructor() {
    if (localStorage.getItem("catchedPokemons")) {
      this.catchedPokemons = new Set(
        localStorage
          .getItem("catchedPokemons")
          .split(",")
          .map((item) => +item)
      );
    } else {
      this.catchedPokemons = new Set();
    }
    if (localStorage.getItem("dateOfCapture")) {
      this.dateOfCapture = JSON.parse(localStorage.getItem("dateOfCapture"));
    } else {
      this.dateOfCapture = new Array();
    }
    return this;
  }

  public static getInstance(): StoreInterface {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public getCaughtPokemons(): Set<number> {
    return this.catchedPokemons;
  }

  public catchPokemon(id: number, date: string): void {
    this.catchedPokemons.add(id);
    this.dateOfCapture.push({ id: id, date: date });
    localStorage.setItem(
      "catchedPokemons",
      Array.from(this.catchedPokemons).join(",")
    );
    localStorage.setItem("dateOfCapture", JSON.stringify(this.dateOfCapture));
  }

  public getOneDateOfCapture(id: number): string {
    return this.dateOfCapture.find((item) => item.id === id).date;
  }

  public isPokemonCatched(id: number): boolean {
    return this.catchedPokemons.has(id);
  }
}

export { Store };
