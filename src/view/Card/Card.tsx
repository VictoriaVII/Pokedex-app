import React, { useState, FC, useEffect } from "react";
import Swal from "sweetalert2";
import { PokemonInterface } from "@/model/transport/Transport";
import { PokemonServiceInterface } from "@/model/service/PokemonService";
import { cardsColors } from "./CardColors";
import styles from "./Card.module.scss";
import { NavLink } from "react-router-dom";

interface Props {
  pokemon: PokemonInterface;
  pokemonService: PokemonServiceInterface;
}

const PokemonCard: FC<Props> = ({ pokemon, pokemonService }: Props) => {
  const [isCaught, setIsCaught] = useState(false);

  useEffect(() => {
    pokemonService.isPokemonCatched(pokemon.id) && setIsCaught(true);
  }, [pokemon]);

  const handleCatch = () => {
    setIsCaught(true);
    pokemonService.catchPokemon(pokemon.id, new Date().toLocaleString());
    const imgURL =
      pokemon.sprites.other.showdown.front_default === null
        ? "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdmMGlsM3B5dHhpeDBlNDNvdnNzOWJ1OXpranFpOWNpd2w5eXQ2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/DJM88aCmEeaNG/giphy.gif"
        : pokemon.sprites.other.showdown.front_default;
    Swal.fire({
      title: "Success!",
      text: "The Pokemon has been caught!",
      imageUrl: `${imgURL}`,
      imageAlt: "Pokemon image",
      confirmButtonText: "Continue",
    });
  };
  return (
    <li className={styles.card}>
      <div
        className={styles.card__body}
        style={{ background: cardsColors[pokemon.types[0].type.name] }}
      >
        <NavLink to={`pokemon/:${pokemon.id}`} className={styles.card__name}>
          {pokemon.name}
        </NavLink>
        <div className={styles.card__id}>{pokemon.id}</div>
        <div className={styles.card__img_wrapper}>
          <img
            className={styles.card__img}
            src={
              pokemon.sprites.other.home.front_default === null
                ? pokemon.sprites.other.showdown.front_default === null
                  ? "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXU4eDN5M3dnYzYycTR6azJ5N2VmYXZlanJoM3ZqdmEyd3p5YmsydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/eJ3mWeALMqorzzI7Ze/giphy.gif"
                  : pokemon.sprites.other.showdown.front_default
                : pokemon.sprites.other.home.front_default
            }
            alt={pokemon.name}
          />
        </div>
        <button
          className={styles.card__btn}
          onClick={() => handleCatch()}
          disabled={isCaught}
        >
          {isCaught ? "Caught" : "Catch"}
        </button>
      </div>
    </li>
  );
};

export default PokemonCard;
