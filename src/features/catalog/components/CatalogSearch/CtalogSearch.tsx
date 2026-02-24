import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./CatalogSearch.css";
import { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import { queryBooks } from "../../../../reducx/slices/BookSlices";
import { BookCard } from "../../../book";
import { CatalogAdvancedSearch } from "../CatalogAdvancedSearch/CatalogAdvancedSearch";

export const CatalogSearch: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [location.search]);

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-search-section">
        <CatalogAdvancedSearch />
      </div>
      {!bookState.loading ? (
        <>
          <h2>
            Displaying {bookState.pagingInformation?.pageCount} books out of{" "}
            {bookState.pagingInformation?.totalCount}
          </h2>
          <div className="catalog-search-item-area">
            {bookState.books.map((book) => (
              <BookCard key={book.barcode} book={book} />
            ))}
          </div>
          <div className="catalog-search-pages"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
