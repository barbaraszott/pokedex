import React from "react";

import PaginationLink from "./PaginationLink/PaginationLink";

import "./Pagination.scss";

function findFirstPaginationLinkIndex(currentPageIndex, lastPageIndex, pageNeighboursCount) {
  const isNotEnoughPagesToShow = lastPageIndex <= 2 * pageNeighboursCount;
  const isNotEnoughLeftNeighbours = currentPageIndex - pageNeighboursCount <= 0;
  const isNotEnoughRightNeighbours = currentPageIndex + pageNeighboursCount >= lastPageIndex;

  if (isNotEnoughPagesToShow || isNotEnoughLeftNeighbours) {
    return 0;
  }

  if (isNotEnoughRightNeighbours) {
    return lastPageIndex - 2 * pageNeighboursCount;
  }

  return currentPageIndex - pageNeighboursCount;
}

function Pagination(props) {
  const { currentPageIndex, count, limit, onPageClick } = props;
  const totalPagesCount = Math.ceil(count / limit);
  const lastPageIndex = totalPagesCount - 1;
  const pageNeighboursCount = window.innerWidth < 768 ? 1 : 2;
  const pagesToShowCount = 2 * pageNeighboursCount + 1;
  const paginationPagesCount = Math.min(pagesToShowCount, totalPagesCount);
  const firstShownPageIndex = findFirstPaginationLinkIndex(
    currentPageIndex,
    lastPageIndex,
    pageNeighboursCount,
    totalPagesCount
  );
  const previousPageIdx = currentPageIndex - 1;
  const goPrevious =
    previousPageIdx >= 0 ? (
      <PaginationLink onPageClick={onPageClick} pageIndex={previousPageIdx} isPrevious={true} />
    ) : null;
  const nextPageIdx = currentPageIndex + 1;
  const goNext =
    nextPageIdx < totalPagesCount ? (
      <PaginationLink onPageClick={onPageClick} pageIndex={nextPageIdx} isNext={true} />
    ) : null;
  const goToFirst = <PaginationLink onPageClick={onPageClick} pageIndex={0} isLinkToStart={true} />;
  const goToLast = <PaginationLink onPageClick={onPageClick} pageIndex={lastPageIndex} isLinkToEnd={true} />;
  const paginationPages = Array.from({ length: paginationPagesCount }, (_, i) => {
    const pageIndex = i + firstShownPageIndex;
    return (
      <PaginationLink
        onPageClick={onPageClick}
        pageIndex={pageIndex}
        currentPageIndex={currentPageIndex}
        key={`page-${pageIndex}`}
      />
    );
  });

  return (
    <nav className="pagination">
      {goPrevious}
      {currentPageIndex > pageNeighboursCount && totalPagesCount > paginationPagesCount && goToFirst}
      {paginationPages}
      {currentPageIndex < totalPagesCount - pageNeighboursCount - 1 &&
        totalPagesCount > paginationPagesCount &&
        goToLast}
      {goNext}
    </nav>
  );
}

export default Pagination;
