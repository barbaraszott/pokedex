import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import "./Pagination.scss";

// function createLink(pageIndex, type = null) {
//   const specialContent = {
//     next: <FontAwesomeIcon icon={faChevronRight} />,
//     previous: <FontAwesomeIcon icon={faChevronLeft} />,
//   };

//   const content = specialContent[type] || pageIndex + 1;
//   const classes = type ? `pagination__page pagination__page--${type}` : "pagination__page";
//   const uniqueKey = type ? `page-${pageIndex}-${type}` : `page-${pageIndex}`;

//   return (
//     <div key={uniqueKey} className={classes}>
//       {content}
//     </div>
//   );
// }

function showPageNumber(pageIdx) {
  return pageIdx + 1;
}

function createPageLink(page, currentPage, onPageClick) {
  const isCurrentPage = page === currentPage;
  return (
    <div
      key={`page-${page}`}
      data-page={page}
      className={`pagination__page${isCurrentPage ? " pagination__page--current" : ""}`}
      onClick={() => onPageClick(page)}
    >
      {showPageNumber(page)}
    </div>
  );
}

function createPageLinkToStart(page, onPageClick) {
  return (
    <>
      <div
        key={`page-${page}--start`}
        data-page={page}
        className="pagination__page pagination__page--start"
        onClick={() => onPageClick(page)}
      >
        {showPageNumber(page)}
      </div>
      <FontAwesomeIcon icon={faEllipsisH} className="dots" />
    </>
  );
}

function createPageLinkToEnd(page, onPageClick) {
  return (
    <>
      <FontAwesomeIcon icon={faEllipsisH} className="dots" />
      <div
        key={`page-${page}--end`}
        data-page={page}
        className="pagination__page pagination__page--end"
        onClick={() => onPageClick(page)}
      >
        {showPageNumber(page)}
      </div>
    </>
  );
}

function createPreviousLink(previousPageIdx, onPageClick) {
  return (
    <div
      key={`page-${previousPageIdx}`}
      data-page={previousPageIdx}
      className="pagination__page pagination__page--previous"
      onClick={() => onPageClick(previousPageIdx)}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
}

function createNextLink(nextPageIdx, onPageClick) {
  return (
    <div
      key={`page-${nextPageIdx}`}
      data-page={nextPageIdx}
      className="pagination__page pagination__page--next"
      onClick={() => onPageClick(nextPageIdx)}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
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
  const goPrevious = previousPageIdx >= 0 ? createPreviousLink(previousPageIdx, onPageClick) : null;
  const nextPageIdx = currentPage + 1;
  const goNext = nextPageIdx < totalPagesCount ? createNextLink(nextPageIdx, onPageClick) : null;
  const goToFirst = createPageLinkToStart(0, onPageClick);
  const goToLast = createPageLinkToEnd(lastPage, onPageClick);
  const paginationPages = Array.from({ length: paginationPagesCount }, (_, i) =>
    createPageLink(i + firstShownPageIdx, currentPage, onPageClick)
  );

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
