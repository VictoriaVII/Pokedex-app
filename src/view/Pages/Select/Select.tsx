import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import { PokemonService } from "@/service/PokemonService";
import { SelectListInterface } from "@/model/transport/Transport";
import PokemonCard from "@/view/Card/Card";
import Loader from "../Loader/Loader";
import ReactPaginate from "react-paginate";
import PokemonStates from "@/store/PokemonStates";
import { observer } from "mobx-react-lite";

const Select = observer(() => {
  const [isShown, setIsShown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filter, setFilter] = useState("type");
  const [option, setOption] = useState(null);
  const [cards, setCards] = useState(null);
  const [showPagination, setShowPagination] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const pokemonService = PokemonService.getInstance();

  const limit = PokemonStates.limit;
  const [currentCards, setCurrentCards] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (cards !== null && cards.length !== 0) {
      const endOffset = itemOffset + limit;
      setCurrentCards(cards.slice(itemOffset, endOffset));
      setShowPagination(true);
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

  const createCards = (data: SelectListInterface) => {
    if (data.pokemon.length === 0) {
      setCards([
        <div className={styles.empty}>
          <h1>There are no such Pokemon!</h1>
          <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW8zbjd0dXh6aXNpOWZyb3V6cWlkMjN3bzBnbTNlMnJ1OTFxcW5xeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uWPGqy4rkgllS/giphy.gif"></img>
        </div>,
      ]);
    } else {
      setIsLoading(true);
      const cardsPromises = data.pokemon.map((pokemonData) =>
        pokemonService.getOnePokemon(pokemonData.pokemon.url)
      );
      const responses = Promise.all(cardsPromises);
      responses
        .then((data) => {
          const cardsElements = data.map((item) => {
            return (
              <PokemonCard
                pokemon={item}
                pokemonService={pokemonService}
                key={item.id}
              />
            );
          });
          setIsLoading(false);
          setCards(cardsElements);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    let data = null;
    filter === "type"
      ? (data = await pokemonService.getSelectList(
          `https://pokeapi.co/api/v2/type/${e.target.value}`
        ))
      : (data = await pokemonService.getSelectList(
          `https://pokeapi.co/api/v2/ability/${e.target.value}`
        ));
    createCards(data);
  };

  const displaySelect = async (filter: string) => {
    setIsShown(true);
    const data = await pokemonService.getPokemonList(
      `https://pokeapi.co/api/v2/${filter}/?limit=22`,
      0,
      22
    );

    const optionElement = data.results.map((item) => {
      return (
        <option value={item.name} selected={false} disabled={false}>
          {item.name}
        </option>
      );
    });
    setOption(optionElement);
  };

  const reset = (radio__reset = true) => {
    setIsShown(false);
    setSelectedOption(null);
    setCards(null);
    setCurrentCards(null);
    setShowPagination(false);
  };

  const handleRadioBtn = (item: string) => {
    switch (item) {
      case "type": {
        reset(false);
        setFilter("type");
        displaySelect("type");
        break;
      }
      case "ability": {
        reset(false);
        setFilter("ability");
        displaySelect("ability");
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className={styles.header__body}>
        <div className={styles.header__radio}>
          <div>
            <input
              type="radio"
              id="type"
              value="type"
              name="radio"
              onClick={() => handleRadioBtn("type")}
            />
            <label>Type</label>
          </div>
          <div>
            <input
              type="radio"
              id="ability"
              value="ability"
              name="radio"
              onClick={() => handleRadioBtn("ability")}
            />
            <label>Ability</label>
          </div>
        </div>
        <div className={styles.header__select__wrapper}>
          <select
            name="select"
            id="select"
            className={`${styles.header__select} ${
              isShown && styles.header__select_shown
            }`}
            value={selectedOption}
            onChange={handleSelect}
          >
            <option
              value={`Select ${filter}`}
              selected={selectedOption === null}
              disabled={true}
            >{`Select ${filter}`}</option>
            {option}
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className={styles.page}>{currentCards}</ul>
          {showPagination && (
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
          )}
        </>
      )}
    </>
  );
});

export default Select;
