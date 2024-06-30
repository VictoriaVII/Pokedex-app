import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { PokemonService } from "@/service/PokemonService";
import PokemonCard from "@/view/Card/Card";

import styles from "./HomePage.module.scss";
import Loader from "../Loader/Loader";
import PokemonStates from "@/store/PokemonStates";
import { observer } from "mobx-react-lite";
import { PaginationService } from "@/service/PaginationService";
import ReactPaginate from "react-paginate";

const HomePage = observer(() => {
  const [pokemonList, setPokemonList] = useState(null);
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const limit = PokemonStates.limit;
  const [offset, setOffset] = useState(0);
  const url = PokemonStates.url;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonService = PokemonService.getInstance();
  const paginationService = PaginationService.getInstance();

  useEffect(() => {
    pokemonService.getPokemonList(url, offset, limit).then((data) => {
      setPokemonList(data);
      setTotalPages(paginationService.getPageCount(data.count, limit));
    });
  }, [limit, offset, url]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * limit;
    setCurrentPage(event.selected);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  };

  useEffect(() => {
    if (pokemonList !== null) {
      try {
        setCards(null);
        setIsLoading(true);
        const pokemonService = PokemonService.getInstance();
        const cardsPromises = pokemonList.results.map(
          (pokemonData: { name: string; url: string }) =>
            pokemonService.getOnePokemon(pokemonData.url)
        );

        const temp = Promise.all(cardsPromises);
        temp
          .then((data) => {
            const cardsElements = data.map((item) => (
              <PokemonCard
                pokemon={item}
                pokemonService={pokemonService}
                key={item.id}
              />
            ));
            setIsLoading(false);
            setCards(cardsElements);
          })
          .finally(() => setIsLoading(false));
      } catch (err) {
        console.log(err.message || "Failed to load Pokémon pokemonList.");
      }
    }
  }, [pokemonList]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className={styles.page}>{cards}</ul>
          <div className={styles.pagination__wrapper}>
            <ReactPaginate
              className={styles.pagination}
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              forcePage={currentPage}
              disableInitialCallback={true}
              previousLabel="< prev"
              breakLabel="..."
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      )}
    </>
  );
});

export { HomePage };
