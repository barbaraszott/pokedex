import React from "react";

import PaginationLink from "./PaginationLink/PaginationLink";

import "./Pagination.scss";

function findFirstPageToShow(currentPage, lastPage, pageNeighboursCount) {
  if (currentPage - pageNeighboursCount <= 0) {
    return 0;
  }

  if (currentPage + pageNeighboursCount >= lastPage) {
    return lastPage - 2 * pageNeighboursCount;
  }

  return currentPage - pageNeighboursCount;
}

function Pagination(props) {
  const { currentPage, count, limit, onPageClick } = props;
  const totalPagesCount = Math.ceil(count / limit);
  const lastPage = totalPagesCount - 1;
  const pageNeighboursCount = 2;
  const pagesToShowCount = 2 * pageNeighboursCount + 1;
  const paginationPagesCount = Math.min(pagesToShowCount, totalPagesCount);
  const firstShownPageIdx = findFirstPageToShow(currentPage, lastPage, pageNeighboursCount);
  const previousPageIdx = currentPage - 1;
  const goPrevious =
    previousPageIdx >= 0 ? (
      <PaginationLink onPageClick={onPageClick} pageIndex={previousPageIdx} isPrevious={true} />
    ) : null;
  const nextPageIdx = currentPage + 1;
  const goNext =
    nextPageIdx < totalPagesCount ? (
      <PaginationLink onPageClick={onPageClick} pageIndex={nextPageIdx} isNext={true} />
    ) : null;
  const goToFirst = <PaginationLink onPageClick={onPageClick} pageIndex={0} isLinkToStart={true} />;
  const goToLast = <PaginationLink onPageClick={onPageClick} pageIndex={lastPage} isLinkToEnd={true} />;
  const paginationPages = Array.from({ length: paginationPagesCount }, (_, i) => {
    const pageIndex = i + firstShownPageIdx;
    return (
      <PaginationLink
        onPageClick={onPageClick}
        pageIndex={pageIndex}
        currentPageIndex={currentPage}
        key={`page-${pageIndex}`}
      />
    );
  });

  return (
    <nav className="pagination">
      {goPrevious}
      {currentPage > pageNeighboursCount && totalPagesCount > pagesToShowCount && goToFirst}
      {paginationPages}
      {currentPage < totalPagesCount - 2 && totalPagesCount > pagesToShowCount && goToLast}
      {goNext}
    </nav>
  );
}

export default Pagination;
