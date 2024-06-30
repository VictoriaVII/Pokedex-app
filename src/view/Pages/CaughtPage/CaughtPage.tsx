import { useEffect, useState } from "react";
import { PokemonService } from "@/service/PokemonService";
import PokemonCard from "@/view/Card/Card";
import styles from "./CaughtPage.module.scss";
import Loader from "../Loader/Loader";
import ReactPaginate from "react-paginate";
import PokemonStates from "@/store/PokemonStates";
import { observer } from "mobx-react-lite";

const CaughtPage = observer(() => {
  const pokemonService = PokemonService.getInstance();
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const limit = PokemonStates.limit;
  const [currentCards, setCurrentCards] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (cards !== null && cards.length !== 0) {
      const endOffset = itemOffset + limit;
      setCurrentCards(cards.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(cards.length / limit));
    }
  }, [itemOffset, limit, cards]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * limit) % cards.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const pokemonList = Array.from(pokemonService.getCaughtPokemons());
    if (pokemonList !== null) {
      try {
        setIsLoading(true);
        const cardsPromises = pokemonList.map((pokemonData) =>
          pokemonService.getOnePokemon(
            `https://pokeapi.co/api/v2/pokemon/${pokemonData}`
          )
        );

        const responses = Promise.all(cardsPromises);

        responses
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
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {cards === null || cards.length === 0 ? (
            <div className={styles.empty}>
              <h1 className={styles.empty__text}>
                You haven't caught any Pokemon yet!
              </h1>
              <img
                className={styles.empty__img}
                src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG03YzdvY2oxd29mejJpNndyOWRqMnNuYXVsZ2I0YmZtZjR0dXlmeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HluqguCBcvwCvBu/giphy.gif"
              ></img>
            </div>
          ) : (
            <>
              <ul className={styles.page}>{currentCards}</ul>
              <div className={styles.pagination__container}>
                <ReactPaginate
                  className={styles.pagination}
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
});

export { CaughtPage };
