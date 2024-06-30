import { useEffect, useState } from "react";
import { PokemonService } from "@/service/PokemonService";
import Swal from "sweetalert2";
import styles from "./PokemonPage.module.scss";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { cardsColors } from "@/view/Card/CardColors";
import { observer } from "mobx-react-lite";

const PokemonPage = observer(() => {
  let { id } = useParams();
  const navigate = useNavigate();
  let idPokemon = +id.slice(1);
  const pokemonCount = 10277;
  const isValidId = (idPokemon: number) => {
    if (!Number.isNaN(idPokemon)) {
      if (idPokemon > 0 && idPokemon <= pokemonCount) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pokemonService = PokemonService.getInstance();
  const [isCaught, setIsCaught] = useState(
    pokemonService.isPokemonCatched(idPokemon)
  );

  useEffect(() => {
    if (!isValidId(idPokemon)) {
      navigate("/not-found");
    } else {
      setIsLoading(true);
      pokemonService
        .getOnePokemon(`https://pokeapi.co/api/v2/pokemon/${id.slice(1)}`)
        .then((data) => {
          setPokemon(data);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleCatch = () => {
    setIsCaught(true);
    pokemonService.catchPokemon(pokemon.id, new Date().toLocaleString());
    Swal.fire({
      title: "Success!",
      text: "The Pokemon has been caught!",
      imageUrl: `${pokemon.sprites.other.showdown.front_default}`,
      imageAlt: "Pokemon image",
      confirmButtonText: "Continue",
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        pokemon && (
          <ul className={styles.page}>
            <li
              className={styles.card}
              style={{
                background:
                  cardsColors[
                    pokemon.types[0].type.name as keyof typeof cardsColors
                  ],
              }}
            >
              <div className={styles.card__header}>
                <div className={styles.card__name_id_button}>
                  <button
                    className={styles.card__arrow}
                    style={{
                      background:
                        cardsColors[
                          pokemon.types[0].type.name as keyof typeof cardsColors
                        ],
                    }}
                    onClick={() => window.history.back()}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.23048 17.5117L10.0039 16.7383C10.1869 16.5553 10.1869 16.2585 10.0039 16.0754L3.94411 10.0157H17.2813C17.5401 10.0157 17.75 9.80578 17.75 9.54691V8.45316C17.75 8.1943 17.5401 7.98441 17.2813 7.98441H3.94411L10.0039 1.92465C10.1869 1.7416 10.1869 1.4448 10.0039 1.26172L9.23048 0.488359C9.04744 0.305312 8.75064 0.305312 8.56755 0.488359L0.387316 8.66859C0.204269 8.85164 0.204269 9.14844 0.387316 9.33152L8.56755 17.5118C8.7506 17.6948 9.0474 17.6948 9.23048 17.5117Z"
                        fill="#212121"
                      />
                    </svg>
                  </button>
                  <h2 className={styles.card__name}>{pokemon.name}</h2>
                  <div className={styles.card__id}>{pokemon.id}</div>
                </div>
                <div className={styles.card__pokeball}>
                  <svg
                    width="206"
                    height="208"
                    viewBox="0 0 206 208"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z"
                      fill="#212121"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M103 208C155.393 208 198.738 169.257 205.947 118.857H145.035C138.917 136.169 122.407 148.571 103 148.571C83.5933 148.571 67.0835 136.169 60.9648 118.857H0.0532056C7.26233 169.257 50.6067 208 103 208ZM60.9648 89.1429H0.0532056C7.26233 38.7431 50.6067 0 103 0C155.393 0 198.738 38.7431 205.947 89.1429H145.035C138.917 71.8314 122.407 59.4286 103 59.4286C83.5933 59.4286 67.0835 71.8314 60.9648 89.1429ZM127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z"
                      fill="#212121"
                    />
                  </svg>
                </div>
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
              <div className={styles.card__info}>
                <h3
                  className={styles.card__abilities}
                  style={{
                    color:
                      cardsColors[
                        pokemon.types[0].type.name as keyof typeof cardsColors
                      ],
                  }}
                >
                  Abilities:
                </h3>
                <div className={styles.card__abilities_body}>
                  {pokemon.abilities.map(
                    (ability: { ability: { name: string; url: string } }) => {
                      return (
                        <h3 className={styles.card__ability}>
                          {ability.ability.name}
                        </h3>
                      );
                    }
                  )}
                </div>
                <div className={styles.card__caught}>
                  <button
                    className={styles.card__btn}
                    onClick={() => handleCatch()}
                    disabled={isCaught}
                  >
                    {isCaught ? "Caught" : "Catch"}
                  </button>
                  {isCaught && (
                    <h3
                      className={styles.card__date}
                    >{`Date: ${pokemonService.getOneDateOfCapture(
                      pokemon.id
                    )}`}</h3>
                  )}
                </div>
              </div>
            </li>
          </ul>
        )
      )}
    </>
  );
});

export { PokemonPage };
