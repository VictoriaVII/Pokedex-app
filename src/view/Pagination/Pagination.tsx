import { PokemonService } from "@/service/PokemonService";
import { PaginationService } from "@/service/PaginationService";

import styles from "./Pagination.module.scss";
import { useEffect, useState } from "react";
import PokemonStates from "@/store/PokemonStates";
import { observer } from "mobx-react-lite";
import ReactPaginate from "react-paginate";

const Pagination = observer(() => {
  const setPokemonList = PokemonStates.setPokemonList;
  const limit = PokemonStates.limit;
  const { offset, setOffset } = PokemonStates;
  const url = PokemonStates.url;
  const [totalPages, setTotalPages] = useState(0);
  const pokemonService = PokemonService.getInstance();
  const paginationService = PaginationService.getInstance();

  const handlePageClick = (event: { selected: number }) => {
    setOffset(event.selected * limit);
  };

  useEffect(() => {
    const fetchPosts = async (offset: number, limit: number) => {
      const pokemonList = await pokemonService.getPokemonList(
        url,
        offset,
        limit
      );
      setPokemonList(pokemonList);
      setTotalPages(paginationService.getPageCount(pokemonList.count, limit));
    };

    fetchPosts(offset, limit);
  }, [limit, offset]);

  return (
    <div className={styles.pagination__wrapper}>
      <ReactPaginate
        className={styles.pagination}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
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
  );
});

export { Pagination };
