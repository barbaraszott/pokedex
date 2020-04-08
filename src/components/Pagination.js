import React from "react";

function createPageLink(page) {
  return (
    <span key={`page-${page}`} data-page={page}>
      [{++page}]
    </span>
  );
}

function createPreviousLink(previousPageIdx) {
  return (
    <span key={`page-${previousPageIdx}`} data-page={previousPageIdx}>
      [previous]
    </span>
  );
}

function createNextLink(nextPageIdx) {
  return (
    <span key={`page-${nextPageIdx}`} data-page={nextPageIdx}>
      [next]
    </span>
  );
}

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
  const goPrevious = previousPageIdx >= 0 ? createPreviousLink(previousPageIdx) : null;
  const nextPageIdx = currentPage + 1;
  const goNext = nextPageIdx < totalPagesCount ? createNextLink(nextPageIdx) : null;
  const goToFirst = createPageLink(0);
  const goToLast = createPageLink(lastPage);
  const paginationPages = Array.from({ length: paginationPagesCount }, (_, i) => createPageLink(i + firstShownPageIdx));

  return (
    <nav onClick={onPageClick}>
      {currentPage > pageNeighboursCount + 1 && goToFirst}
      {goPrevious}
      {paginationPages}
      {goNext}
      {currentPage < totalPagesCount - 2 && goToLast}
    </nav>
  );
}

export default Pagination;
